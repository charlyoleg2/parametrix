// heliostat.ts

import type {
	//tContour,
	tParamDef,
	tParamVal,
	tGeom,
	tPageDef
	//tMParams,
	//tRParams,
	//tSubInst
	//tSubDesign
} from 'geometrix';
import {
	designParam,
	checkGeom,
	prefixLog,
	//contour,
	//contourCircle,
	figure,
	degToRad,
	radToDeg,
	ffix,
	pNumber,
	//pCheckbox,
	//pDropdown,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

// design import
import { poleStaticDef } from './pole_static';
import { rakeDef } from './rake';
import { spiderDef } from './spider';
import { swingDef } from './swing';

const pDef: tParamDef = {
	partName: 'heliostat',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('H1', 'mm', 3000, 100, 40000, 10),
		pNumber('H2', 'mm', 7000, 100, 40000, 10),
		pNumber('H3', 'mm', 200, 10, 500, 10),
		pNumber('H4', 'mm', 800, 100, 4000, 10),
		pNumber('H5', 'mm', 3000, 100, 6000, 10),
		pNumber('H6', 'mm', 400, 100, 4000, 10),
		pNumber('H7', 'mm', 800, 100, 4000, 10),
		pNumber('H8', 'mm', 200, 100, 4000, 10),
		pNumber('H9', 'mm', 100, 10, 400, 10),
		pNumber('D1', 'mm', 1000, 100, 4000, 10),
		pNumber('D2', 'mm', 700, 100, 4000, 10),
		pNumber('D3', 'mm', 900, 100, 4000, 10),
		pNumber('D4', 'mm', 400, 100, 4000, 10),
		pNumber('D5', 'mm', 300, 100, 1000, 10),
		pNumber('D6', 'mm', 200, 100, 1000, 10),
		pNumber('D7', 'mm', 400, 100, 1000, 10),
		pNumber('D8', 'mm', 100, 10, 1000, 10),
		pNumber('D9', 'mm', 100, 10, 1000, 10),
		pNumber('S1', 'mm', 250, 10, 800, 10),
		pNumber('S2', 'mm', 200, 10, 800, 10),
		pNumber('E1', 'mm', 30, 1, 80, 1),
		pNumber('E2', 'mm', 50, 1, 80, 1),
		pNumber('L1', 'mm', 12500, 1000, 40000, 10),
		pNumber('L2', 'mm', 6000, 1000, 40000, 10),
		pNumber('L3', 'mm', 100, 10, 500, 10),
		pNumber('L4', 'mm', 600, 100, 4000, 10),
		pNumber('L5', 'mm', 2000, 100, 6000, 10),
		pNumber('L6', 'mm', 2000, 100, 6000, 10),
		pNumber('L7', 'mm', 100, 10, 1000, 10),
		pNumber('L8', 'mm', 200, 10, 1000, 10),
		pNumber('al', 'degree', 80, 0, 95, 1),
		pNumber('ar', 'degree', 80, 0, 95, 1)
	],
	paramSvg: {
		H1: 'heliostat_overview.svg',
		H2: 'heliostat_side.svg',
		H3: 'heliostat_side_sizing.svg',
		H4: 'heliostat_side_sizing.svg',
		H5: 'heliostat_side_sizing.svg',
		H6: 'heliostat_side_sizing.svg',
		H7: 'heliostat_side_sizing.svg',
		H8: 'heliostat_side_sizing.svg',
		H9: 'heliostat_side_sizing.svg',
		D1: 'heliostat_side_sizing.svg',
		D2: 'heliostat_side_sizing.svg',
		D3: 'heliostat_side_sizing.svg',
		D4: 'heliostat_side_sizing.svg',
		D5: 'heliostat_side_sizing.svg',
		D6: 'heliostat_side_sizing.svg',
		D7: 'heliostat_side_sizing.svg',
		D8: 'heliostat_side_sizing.svg',
		D9: 'heliostat_face_sizing.svg',
		S1: 'heliostat_side_sizing.svg',
		S2: 'heliostat_side_sizing.svg',
		E1: 'heliostat_side_sizing.svg',
		E2: 'heliostat_side_sizing.svg',
		L1: 'heliostat_face_sizing.svg',
		L2: 'heliostat_side_sizing.svg',
		L3: 'heliostat_face_sizing.svg',
		L4: 'heliostat_face_sizing.svg',
		L5: 'heliostat_face_sizing.svg',
		L6: 'heliostat_face_sizing.svg',
		L7: 'heliostat_face_sizing.svg',
		L8: 'heliostat_face_sizing.svg',
		al: 'heliostat_side_sizing.svg',
		ar: 'heliostat_side_sizing.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal): tGeom {
	const rGeome = initGeom();
	const figSide = figure();
	const figFace = figure();
	rGeome.logstr += `simTime: ${t}\n`;
	try {
		rGeome.logstr += `heliostat-height: ${ffix(param.H1)}, diameter ${ffix(param.H1)} m\n`;
		rGeome.logstr += `heliostat-swing-length: ${ffix(param.H1)}, width ${ffix(param.H1)} m\n`;
		rGeome.logstr += `heliostat-surface-length: ${ffix(param.H1)}, width ${ffix(param.H1)} m\n`;
		const posAngleMid = (param.al - param.ar) / 2;
		const posAngleDegree =
			posAngleMid - (Math.sin((2 * Math.PI * t) / pDef.sim.tMax) * (param.al + param.ar)) / 2;
		const posAngle = degToRad(posAngleDegree);
		rGeome.logstr += `swing position angle: ${ffix(radToDeg(posAngle))} degree\n`;
		const rakePosY = param.H1 + param.H2 - param.H3;
		const spiderPosY = rakePosY + param.H4 + param.H5 - param.H6 + param.H7;
		const swingPosY = spiderPosY + param.H8;
		// sub-designs
		const poleStaticParam = designParam(poleStaticDef.pDef);
		const rakeParam = designParam(rakeDef.pDef);
		const spiderParam = designParam(spiderDef.pDef);
		const swingParam = designParam(swingDef.pDef);
		poleStaticParam.setVal('H1', param.H1);
		poleStaticParam.setVal('H2', param.H2);
		poleStaticParam.setVal('D1', param.D1);
		poleStaticParam.setVal('D2', param.D2);
		poleStaticParam.setVal('E1', param.E1);
		poleStaticParam.setVal('E2', param.E1);
		rakeParam.setVal('H1', param.H4);
		rakeParam.setVal('H2', param.H5);
		rakeParam.setVal('D1', param.D3);
		rakeParam.setVal('D2', param.D4);
		rakeParam.setVal('L9', param.D3 / 2);
		rakeParam.setVal('E1', param.E1);
		rakeParam.setVal('E3', param.E1);
		rakeParam.setVal('D3', param.D2 * 0.6);
		if (param.D2 > param.D3 - 2 * param.E1) {
			throw `err153: D2 ${param.D2} too large compare to D3 ${param.D3} and E1 ${param.E1}`;
		}
		rakeParam.setVal('H4', param.H6);
		rakeParam.setVal('D4', param.D5);
		rakeParam.setVal('L7', param.L7);
		rakeParam.setVal('L8', param.L8);
		rakeParam.setVal('D6', param.D9);
		rakeParam.setVal('H5', param.H7 + param.H8);
		rakeParam.setVal('D5', param.D6);
		rakeParam.setVal('D8', param.D7);
		if (param.D6 >= param.D7) {
			throw `err164: D6 ${param.D6} too large compare to D7 ${param.D7}`;
		}
		const rakeL4 = param.L4 - 2 * param.L3;
		rakeParam.setVal('L4', rakeL4);
		if (rakeL4 <= 0) {
			throw `err169: L3 ${param.L3} too large compare to L4 ${param.L4}`;
		}
		rakeParam.setVal('L5', param.L5 + 2 * rakeL4);
		rakeParam.setVal('L6', param.L6 + 2 * rakeL4);
		const spiderL5 = param.L5 * 0.96;
		spiderParam.setVal('L5', spiderL5);
		spiderParam.setVal('D1', param.D8);
		spiderParam.setVal('L1', param.S1);
		spiderParam.setVal('L2', param.S2);
		spiderParam.setVal('E2', param.E2);
		spiderParam.setVal('L4', param.L2 / 2 - param.H8);
		swingParam.setVal('L2', param.L2);
		swingParam.setVal('D1', param.D6);
		swingParam.setVal('H4', param.H9);
		swingParam.setVal('L1', param.L1);
		swingParam.setVal('H1', param.L3);
		swingParam.setVal('L4', param.L4);
		swingParam.setVal('L5', param.L5);
		swingParam.setVal('L6', param.L6);
		swingParam.setVal('L3', param.D6);
		const poleStaticGeom = poleStaticDef.pGeom(0, poleStaticParam.getParamVal());
		checkGeom(poleStaticGeom, poleStaticParam.designName);
		rGeome.logstr += prefixLog(poleStaticGeom.logstr, poleStaticParam.designName);
		const rakeGeom = rakeDef.pGeom(0, rakeParam.getParamVal());
		checkGeom(rakeGeom, rakeParam.designName);
		rGeome.logstr += prefixLog(rakeGeom.logstr, rakeParam.designName);
		const spiderGeom = spiderDef.pGeom(0, spiderParam.getParamVal());
		checkGeom(spiderGeom, spiderParam.designName);
		rGeome.logstr += prefixLog(spiderGeom.logstr, spiderParam.designName);
		const swingGeom = swingDef.pGeom(0, swingParam.getParamVal());
		checkGeom(swingGeom, swingParam.designName);
		rGeome.logstr += prefixLog(swingGeom.logstr, swingParam.designName);
		// figSide
		figSide.mergeFigure(poleStaticGeom.fig.poleCut);
		figSide.mergeFigure(rakeGeom.fig.faceBeam.translate(0, rakePosY));
		figSide.mergeFigure(
			spiderGeom.fig.faceLegs.translate(0, spiderPosY).rotate(0, spiderPosY, posAngle / 2)
		);
		figSide.mergeFigure(
			swingGeom.fig.faceSide.translate(0, swingPosY).rotate(0, swingPosY, posAngle)
		);
		// figFace
		figFace.mergeFigure(poleStaticGeom.fig.poleCut);
		figFace.mergeFigure(rakeGeom.fig.faceCone.translate(0, rakePosY));
		figFace.mergeFigure(spiderGeom.fig.faceBody.translate(-spiderL5 / 2, spiderPosY));
		figFace.mergeFigure(swingGeom.fig.faceFace.translate(0, swingPosY));
		// final figure list
		rGeome.fig = {
			faceSide: figSide,
			faceFace: figFace
		};
		const designName = pDef.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_pole`,
					face: `${designName}_faceCut`,
					extrudeMethod: EExtrude.eRotate,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_bottom`,
					face: `${designName}_faceBottom`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.E2,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_top`,
					face: `${designName}_faceBottom`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.E2,
					rotate: [0, 0, 0],
					translate: [0, 0, param.H1 - param.E2]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: [
						`subpax_${designName}_pole`,
						`subpax_${designName}_bottom`,
						`subpax_${designName}_top`
					]
				}
			]
		};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'heliostat-overview draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const heliostatDef: tPageDef = {
	pTitle: 'Heliostat overview',
	pDescription: 'The heliostat inclination mechanism',
	pDef: pDef,
	pGeom: pGeom
};

export { heliostatDef };
