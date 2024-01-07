// heliostat_2.ts

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
	//oneDesignParam
} from 'geometrix';
import {
	heliostat_overview_svg,
	heliostat_side_svg,
	heliostat2_side_sizing_svg,
	heliostat2_face_sizing_svg
} from './svg_heliostat';

// design import
import { poleStaticDef } from './pole_static';
import { rakeStopperDef } from './rake_stopper';
import { swingDef } from './swing';

const pDef: tParamDef = {
	partName: 'heliostat_2',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('H1', 'mm', 3000, 100, 40000, 10),
		pNumber('H2', 'mm', 2500, 100, 40000, 10),
		pNumber('H3', 'mm', 200, 10, 500, 10),
		pNumber('H4', 'mm', 800, 100, 4000, 10),
		pNumber('H5', 'mm', 3000, 100, 6000, 10),
		pNumber('H6', 'mm', 200, 100, 4000, 10),
		pNumber('H7', 'mm', 400, 100, 4000, 10),
		pNumber('H9', 'mm', 100, 10, 400, 10),
		pNumber('D1', 'mm', 1000, 100, 4000, 10),
		pNumber('D2', 'mm', 700, 100, 4000, 10),
		pNumber('D3', 'mm', 900, 100, 4000, 10),
		pNumber('D4', 'mm', 400, 100, 4000, 10),
		pNumber('D5', 'mm', 300, 100, 1000, 10),
		pNumber('D6', 'mm', 200, 100, 1000, 10),
		pNumber('D7', 'mm', 400, 100, 1000, 10),
		pNumber('D9', 'mm', 100, 10, 1000, 10),
		pNumber('E1', 'mm', 30, 1, 80, 1),
		pNumber('L1', 'mm', 12500, 1000, 40000, 10),
		pNumber('L2', 'mm', 6000, 1000, 40000, 10),
		pNumber('L3', 'mm', 100, 10, 500, 10),
		pNumber('L4', 'mm', 600, 100, 4000, 10),
		pNumber('L5', 'mm', 2000, 100, 6000, 10),
		pNumber('L6', 'mm', 2000, 100, 6000, 10),
		pNumber('L7', 'mm', 100, 10, 1000, 10),
		pNumber('L8', 'mm', 200, 10, 1000, 10),
		pNumber('al', 'degree', 80, 0, 95, 1),
		pNumber('S1', 'mm', 100, 10, 800, 1)
	],
	paramSvg: {
		H1: heliostat_overview_svg,
		H2: heliostat_side_svg,
		H3: heliostat2_side_sizing_svg,
		H4: heliostat2_side_sizing_svg,
		H5: heliostat2_side_sizing_svg,
		H6: heliostat2_side_sizing_svg,
		H7: heliostat2_side_sizing_svg,
		H9: heliostat2_side_sizing_svg,
		D1: heliostat2_side_sizing_svg,
		D2: heliostat2_side_sizing_svg,
		D3: heliostat2_side_sizing_svg,
		D4: heliostat2_side_sizing_svg,
		D5: heliostat2_side_sizing_svg,
		D6: heliostat2_side_sizing_svg,
		D7: heliostat2_side_sizing_svg,
		D9: heliostat2_face_sizing_svg,
		E1: heliostat2_side_sizing_svg,
		L1: heliostat2_face_sizing_svg,
		L2: heliostat2_side_sizing_svg,
		L3: heliostat2_face_sizing_svg,
		L4: heliostat2_face_sizing_svg,
		L5: heliostat2_face_sizing_svg,
		L6: heliostat2_face_sizing_svg,
		L7: heliostat2_face_sizing_svg,
		L8: heliostat2_face_sizing_svg,
		al: heliostat2_side_sizing_svg,
		S1: heliostat2_side_sizing_svg
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal): tGeom {
	const rGeome = initGeom(pDef.partName);
	const figSide = figure();
	const figFace = figure();
	const figTop = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		const helioHeight =
			param.H1 + param.H2 - param.H3 + param.H4 + param.H5 - param.H6 + param.H7;
		rGeome.logstr += `heliostat-height: ${ffix(helioHeight)}, diameter ${ffix(param.D1)} m\n`;
		rGeome.logstr += `heliostat-swing-length: ${ffix(param.L1)}, width ${ffix(param.L2)} m\n`;
		const posAngleDegree = (param.al * t) / pDef.sim.tMax;
		const posAngle = degToRad(posAngleDegree);
		rGeome.logstr += `swing position angle: ${ffix(radToDeg(posAngle))} degree\n`;
		const rakePosY = param.H1 + param.H2 - param.H3;
		const swingPosY = rakePosY + param.H4 + param.H5 - param.H6 + param.H7;
		// sub-designs
		const poleStaticParam = designParam(poleStaticDef.pDef);
		const rakeParam = designParam(rakeStopperDef.pDef);
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
		rakeParam.setVal('H5', param.H7);
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
		rakeParam.setVal('S1', param.S1);
		rakeParam.setVal('S2', param.L2 / 2);
		swingParam.setVal('L2', param.L2);
		swingParam.setVal('D1', param.D6);
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
		const poleStaticGeom = poleStaticDef.pGeom(0, poleStaticParam.getParamVal());
		checkGeom(poleStaticGeom);
		rGeome.logstr += prefixLog(poleStaticGeom.logstr, poleStaticParam.partName);
		const rakeGeom = rakeStopperDef.pGeom(0, rakeParam.getParamVal());
		checkGeom(rakeGeom);
		rGeome.logstr += prefixLog(rakeGeom.logstr, rakeParam.partName);
		const swingGeom = swingDef.pGeom(0, swingParam.getParamVal());
		checkGeom(swingGeom);
		rGeome.logstr += prefixLog(swingGeom.logstr, swingParam.partName);
		// figSide
		figSide.mergeFigure(poleStaticGeom.fig.poleCut);
		figSide.mergeFigure(rakeGeom.fig.faceStopperSide.translate(0, rakePosY));
		figSide.mergeFigure(
			swingGeom.fig.faceSide.translate(0, swingPosY).rotate(0, swingPosY, posAngle)
		);
		// figFace
		figFace.mergeFigure(poleStaticGeom.fig.poleCut);
		figFace.mergeFigure(rakeGeom.fig.faceStopperFaceT.translate(0, rakePosY));
		figFace.mergeFigure(swingGeom.fig.faceFace.translate(0, swingPosY));
		// figTop
		figTop.mergeFigure(poleStaticGeom.fig.poleBottom.translate(0, 0));
		figTop.mergeFigure(rakeGeom.fig.faceStopperTop.translate(0, 0));
		figTop.mergeFigure(swingGeom.fig.faceTop.rotate(0, 0, Math.PI / 2));
		// final figure list
		rGeome.fig = {
			faceSide: figSide,
			faceFace: figFace,
			faceTop: figTop
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
					subdesign: 'pax_rake_stopper',
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
						`inpax_${designName}_swing`
					]
				}
			]
		};
		// sub-design
		const poleDesignParamList = poleStaticParam.getDesignParamList();
		//poleDesignParamList.gaga = oneDesignParam(5, 6, true); // testing adding a wring param
		const subPoleStatic: tSubInst = {
			partName: poleStaticParam.getPartName(),
			dparam: poleDesignParamList,
			orientation: [0, 0, 0],
			position: [0, 0, 0]
		};
		const subRake: tSubInst = {
			partName: rakeParam.getPartName(),
			dparam: rakeParam.getDesignParamList(),
			orientation: [0, 0, 0],
			position: [0, 0, rakePosY]
		};
		const subSwing: tSubInst = {
			partName: swingParam.getPartName(),
			dparam: swingParam.getDesignParamList(),
			orientation: [0, 0, 0],
			position: [0, 0, swingPosY]
		};
		rGeome.sub = {
			pole_static_1: subPoleStatic,
			rake_1: subRake,
			swing_1: subSwing
		};
		// finalize
		rGeome.logstr += 'heliostat-2-overview draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const heliostat_2Def: tPageDef = {
	pTitle: 'Heliostat-2 overview',
	pDescription: 'The heliostat-2 inclination mechanism',
	pDef: pDef,
	pGeom: pGeom
};

export { heliostat_2Def };
