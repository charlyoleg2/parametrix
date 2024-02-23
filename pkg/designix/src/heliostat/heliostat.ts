// heliostat.ts

import type {
	//tContour,
	tParamDef,
	tParamVal,
	tGeom,
	tPageDef,
	tSubInst
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
	//EExtrude,
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
		pNumber('H1', 'mm', 3000, 10, 40000, 10),
		pNumber('H2', 'mm', 2500, 50, 40000, 10),
		pNumber('H3', 'mm', 200, 1, 500, 1),
		pNumber('H4', 'mm', 800, 1, 4000, 1),
		pNumber('H5', 'mm', 3000, 50, 6000, 10),
		pNumber('H6', 'mm', 200, 1, 4000, 1),
		pNumber('H7', 'mm', 800, 1, 4000, 1),
		pNumber('H8', 'mm', 200, 1, 4000, 1),
		pNumber('H9', 'mm', 100, 1, 400, 1),
		pNumber('D1', 'mm', 1000, 20, 4000, 10),
		pNumber('D2', 'mm', 700, 20, 4000, 10),
		pNumber('D3', 'mm', 900, 20, 4000, 10),
		pNumber('D4', 'mm', 400, 20, 4000, 10),
		pNumber('D5', 'mm', 300, 20, 1000, 10),
		pNumber('D6', 'mm', 200, 10, 1000, 10),
		pNumber('D7', 'mm', 400, 10, 1000, 10),
		pNumber('D8', 'mm', 100, 1, 1000, 1),
		pNumber('D9', 'mm', 100, 1, 1000, 1),
		pNumber('S1', 'mm', 250, 1, 800, 1),
		pNumber('S2', 'mm', 200, 1, 800, 1),
		pNumber('E1', 'mm', 30, 1, 80, 1),
		pNumber('E2', 'mm', 50, 1, 80, 1),
		pNumber('L1', 'mm', 12500, 100, 40000, 10),
		pNumber('L2', 'mm', 6000, 100, 40000, 10),
		pNumber('L3', 'mm', 100, 1, 500, 1),
		pNumber('L4', 'mm', 600, 1, 4000, 1),
		pNumber('L5', 'mm', 2000, 10, 6000, 1),
		pNumber('L6', 'mm', 2000, 1, 6000, 1),
		pNumber('L7', 'mm', 100, 1, 1000, 1),
		pNumber('L8', 'mm', 200, 1, 1000, 1),
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
		tMax: 100,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal, suffix = ''): tGeom {
	const rGeome = initGeom(pDef.partName + suffix);
	const figSide = figure();
	const figFace = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		const helioHeight =
			param.H1 + param.H2 - param.H3 + param.H4 + param.H5 - param.H6 + param.H7;
		rGeome.logstr += `heliostat-height: ${ffix(helioHeight)}, diameter ${ffix(param.D1)} m\n`;
		rGeome.logstr += `heliostat-swing-length: ${ffix(param.L1)}, width ${ffix(param.L2)} m\n`;
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
		poleStaticParam.setVal('D3', param.D1 - 6 * param.E1);
		poleStaticParam.setVal('E1', param.E1);
		poleStaticParam.setVal('E2', param.E1);
		const poleStaticN1 = 32;
		const poleStaticD5 = (param.D1 - 6 * param.E1) / (poleStaticN1 * 4);
		poleStaticParam.setVal('N1', poleStaticN1);
		poleStaticParam.setVal('D5', poleStaticD5);
		poleStaticParam.setVal('L1', param.E1 + poleStaticD5 / 2);
		poleStaticParam.setVal('H3', param.H1 / 4);
		poleStaticParam.setVal('H4', param.H1 / 2);
		poleStaticParam.setVal('D4', param.H1 / 4);
		poleStaticParam.setVal('L2', param.H1 / 80);
		poleStaticParam.setVal('E3', param.H1 / 80);
		rakeParam.setVal('H1', param.H4);
		rakeParam.setVal('H2', param.H5);
		rakeParam.setVal('H3', param.H4 - 2 * param.E1);
		rakeParam.setVal('D1', param.D3);
		rakeParam.setVal('D2', param.D4);
		rakeParam.setVal('L9', param.D3 / 2);
		rakeParam.setVal('H7', (param.D3 / 2) * 1.6);
		rakeParam.setVal('H6', param.D3 / 20);
		rakeParam.setVal('R9', param.D3 / 20);
		rakeParam.setVal('E1', param.E1);
		rakeParam.setVal('E3', param.E1);
		rakeParam.setVal('E4', param.E1);
		const rakeD3 = param.D2 * 0.6;
		const rakeN1 = 24;
		const rakeD7 = rakeD3 / (rakeN1 * 4);
		rakeParam.setVal('D3', rakeD3);
		if (param.D2 > param.D3 - 2 * param.E1) {
			throw `err153: D2 ${param.D2} too large compare to D3 ${param.D3} and E1 ${param.E1}`;
		}
		rakeParam.setVal('N1', rakeN1);
		rakeParam.setVal('D7', rakeD7);
		rakeParam.setVal('L1', rakeD7);
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
		rakeParam.setVal('L5', param.L5 + 2 * param.L3);
		rakeParam.setVal('L6', param.L6 + 2 * param.L3);
		const spiderL5 = param.L5 * 0.96;
		const spiderN1 = 6;
		spiderParam.setVal('L5', spiderL5);
		spiderParam.setVal('D1', param.D8);
		spiderParam.setVal('L1', param.S1);
		spiderParam.setVal('L2', param.S2);
		spiderParam.setVal('L3', param.E2 * 2);
		spiderParam.setVal('E1', param.E1);
		spiderParam.setVal('E2', param.E2);
		spiderParam.setVal('E3', param.E1);
		spiderParam.setVal('L4', param.L2 / 2 - param.H8);
		spiderParam.setVal('R2', 0);
		spiderParam.setVal('N1', spiderN1);
		spiderParam.setVal('L6', spiderL5 / (spiderN1 * 10));
		swingParam.setVal('L2', param.L2);
		swingParam.setVal('D1', param.D6);
		swingParam.setVal('H3', param.H9);
		swingParam.setVal('H4', param.H9);
		swingParam.setVal('L1', param.L1);
		if (param.L1 < 4 * param.L4 + 2 * param.L6 + param.L5 + 2 * param.L3) {
			throw `err185: L1 ${param.L1} too small compare to L4 ${param.L4}, L5 ${param.L5}, L6 ${param.L6}`;
		}
		swingParam.setVal('H1', param.L3);
		swingParam.setVal('H2', param.L3);
		swingParam.setVal('L4', param.L4);
		swingParam.setVal('L5', param.L5);
		swingParam.setVal('L6', param.L6);
		swingParam.setVal('L3', param.D7);
		const poleStaticGeom = poleStaticDef.pGeom(0, poleStaticParam.getParamVal(), poleStaticParam.getSuffix());
		checkGeom(poleStaticGeom);
		rGeome.logstr += prefixLog(poleStaticGeom.logstr, poleStaticParam.getPartNameSuffix());
		const rakeGeom = rakeDef.pGeom(0, rakeParam.getParamVal(), rakeParam.getSuffix());
		checkGeom(rakeGeom);
		rGeome.logstr += prefixLog(rakeGeom.logstr, rakeParam.getPartNameSuffix());
		const spiderGeom = spiderDef.pGeom(0, spiderParam.getParamVal(), spiderParam.getSuffix());
		checkGeom(spiderGeom);
		rGeome.logstr += prefixLog(spiderGeom.logstr, spiderParam.getPartNameSuffix());
		const swingGeom = swingDef.pGeom(0, swingParam.getParamVal(), swingParam.getSuffix());
		checkGeom(swingGeom);
		rGeome.logstr += prefixLog(swingGeom.logstr, swingParam.getPartNameSuffix());
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
		const designName = rGeome.partName;
		rGeome.vol = {
			inherits: [
				{
					outName: `inpax_${designName}_poleStatic`,
					subdesign: 'pax_pole_static',
					subgeom: poleStaticGeom,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `inpax_${designName}_rake`,
					subdesign: 'pax_rake',
					subgeom: rakeGeom,
					rotate: [0, 0, 0],
					translate: [0, 0, rakePosY]
				},
				{
					outName: `inpax_${designName}_swing`,
					subdesign: 'pax_swing',
					subgeom: swingGeom,
					rotate: [Math.PI / 2, 0, 0],
					translate: [0, 0, swingPosY]
				},
				{
					outName: `inpax_${designName}_spider`,
					subdesign: 'pax_spider',
					subgeom: spiderGeom,
					rotate: [Math.PI / 2, 0, 0],
					translate: [0, spiderL5 / 2, spiderPosY]
				}
			],
			extrudes: [],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: [
						`inpax_${designName}_poleStatic`,
						`inpax_${designName}_rake`,
						`inpax_${designName}_swing`,
						`inpax_${designName}_spider`
					]
				}
			]
		};
		// sub-design
		const subPoleStatic: tSubInst = {
			partName: poleStaticParam.getPartName(),
			dparam: poleStaticParam.getDesignParamList(),
			orientation: [0, 0, 0],
			position: [0, 0, 0]
		};
		const subRake: tSubInst = {
			partName: rakeParam.getPartName(),
			dparam: rakeParam.getDesignParamList(),
			orientation: [0, 0, 0],
			position: [0, 0, rakePosY]
		};
		const subSpider: tSubInst = {
			partName: spiderParam.getPartName(),
			dparam: spiderParam.getDesignParamList(),
			orientation: [Math.PI / 2, 0, 0],
			position: [0, spiderL5 / 2, spiderPosY]
		};
		const subSwing: tSubInst = {
			partName: swingParam.getPartName(),
			dparam: swingParam.getDesignParamList(),
			orientation: [Math.PI / 2, 0, 0],
			position: [0, 0, swingPosY]
		};
		rGeome.sub = {
			pole_static_1: subPoleStatic,
			rake_1: subRake,
			spider_1: subSpider,
			swing_1: subSwing
		};
		// finalize
		rGeome.logstr += 'heliostat-overview drawn successfully!\n';
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
