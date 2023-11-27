// rake_stopper.ts

import type {
	//tContour,
	tParamDef,
	tParamVal,
	tGeom,
	//tExtrude,
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
	//degToRad,
	//radToDeg,
	ffix,
	pNumber,
	//pCheckbox,
	//pDropdown,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

// design import
import { rakeDef } from './rake';

const pDef: tParamDef = {
	partName: 'rake_stopper',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 600, 100, 4000, 10),
		pNumber('D2', 'mm', 400, 100, 4000, 10),
		pNumber('D3', 'mm', 400, 100, 4000, 10),
		pNumber('H1', 'mm', 800, 100, 4000, 10),
		pNumber('H2', 'mm', 3000, 100, 6000, 10),
		pNumber('H3', 'mm', 400, 0, 4000, 10),
		pNumber('E1', 'mm', 20, 1, 80, 1),
		pNumber('E3', 'mm', 30, 1, 80, 1),
		pNumber('H4', 'mm', 400, 100, 1000, 10),
		pNumber('D4', 'mm', 300, 100, 1000, 10),
		pNumber('E4', 'mm', 20, 1, 80, 1),
		pNumber('H5', 'mm', 1000, 100, 2000, 10),
		pNumber('D5', 'mm', 200, 10, 1000, 10),
		pNumber('L4', 'mm', 300, 10, 1000, 10),
		pNumber('L5', 'mm', 2000, 100, 4000, 10),
		pNumber('L6', 'mm', 2000, 100, 4000, 10),
		pNumber('D6', 'mm', 100, 10, 600, 10),
		pNumber('E6', 'mm', 10, 1, 80, 1),
		pNumber('L7', 'mm', 100, 10, 1000, 1),
		pNumber('L8', 'mm', 200, 10, 1000, 1),
		pNumber('N1', '', 24, 3, 100, 1),
		pNumber('D7', 'mm', 40, 1, 100, 1),
		pNumber('L1', 'mm', 30, 1, 300, 1),
		pNumber('D8', 'mm', 400, 100, 1000, 10),
		pNumber('H6', 'mm', 100, 50, 1000, 10),
		pNumber('H7', 'mm', 600, 100, 2000, 10),
		pNumber('L9', 'mm', 300, 100, 1000, 10),
		pNumber('R9', 'mm', 50, 0, 300, 1),
		pNumber('S1', 'mm', 100, 10, 300, 1),
		pNumber('S2', 'mm', 2000, 300, 8000, 10),
		pNumber('E7', 'mm', 5, 1, 80, 1)
	],
	paramSvg: {
		D1: 'rake_face.svg',
		D2: 'rake_face.svg',
		D3: 'rake_face.svg',
		H1: 'rake_face.svg',
		H2: 'rake_face.svg',
		H3: 'rake_face.svg',
		E1: 'rake_face.svg',
		E3: 'rake_face.svg',
		H4: 'rake_side.svg',
		D4: 'rake_side.svg',
		E4: 'rake_side.svg',
		H5: 'rake_side.svg',
		D5: 'rake_side.svg',
		L4: 'rake_face.svg',
		L5: 'rake_face.svg',
		L6: 'rake_face.svg',
		D6: 'rake_face.svg',
		E6: 'rake_face.svg',
		L7: 'rake_face.svg',
		L8: 'rake_face.svg',
		N1: 'rake_top.svg',
		D7: 'rake_top.svg',
		L1: 'rake_top.svg',
		D8: 'rake_side.svg',
		H6: 'rake_door.svg',
		H7: 'rake_door.svg',
		L9: 'rake_door.svg',
		R9: 'rake_door.svg',
		S1: 'rake_side_stopper.svg',
		S2: 'rake_top_stopper.svg',
		E7: 'rake_side_stopper.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal): tGeom {
	const rGeome = initGeom();
	const figCone = figure();
	const figBeam = figure();
	const figBeamHollow = figure();
	const figDisc = figure();
	const figHand = figure();
	const figWing = figure();
	const figWingHollow = figure();
	const figDoor = figure();
	rGeome.logstr += `simTime: ${t}\n`;
	try {
		const H1H2 = param.H1 + param.H2;
		const H1H5 = H1H2 - param.H4 + param.H5;
		rGeome.logstr += `cone-height: ${ffix(H1H2)} mm\n`;
		rGeome.logstr += `cone-height total: ${ffix(H1H5)} mm\n`;
		// sub-design rake
		const rakeParam = designParam(rakeDef.pDef);
		rakeParam.setVal('D1', param.D1);
		rakeParam.setVal('D2', param.D2);
		rakeParam.setVal('D3', param.D3);
		rakeParam.setVal('H1', param.H1);
		rakeParam.setVal('H2', param.H2);
		rakeParam.setVal('H3', param.H3);
		rakeParam.setVal('E1', param.E1);
		rakeParam.setVal('E3', param.E3);
		rakeParam.setVal('H4', param.H4);
		rakeParam.setVal('D4', param.D4);
		rakeParam.setVal('E4', param.E4);
		rakeParam.setVal('H5', param.H5);
		rakeParam.setVal('D5', param.D5);
		rakeParam.setVal('L4', param.L4);
		rakeParam.setVal('L5', param.L5);
		rakeParam.setVal('L6', param.L6);
		rakeParam.setVal('D6', param.D6);
		rakeParam.setVal('E6', param.E6);
		rakeParam.setVal('L7', param.L7);
		rakeParam.setVal('L8', param.L8);
		rakeParam.setVal('N1', param.N1);
		rakeParam.setVal('D7', param.D7);
		rakeParam.setVal('L1', param.L1);
		rakeParam.setVal('D8', param.D8);
		rakeParam.setVal('H6', param.H6);
		rakeParam.setVal('H7', param.H7);
		rakeParam.setVal('L9', param.L9);
		rakeParam.setVal('R9', param.R9);
		const rakeGeom = rakeDef.pGeom(0, rakeParam.getParamVal());
		checkGeom(rakeGeom, rakeParam.designName);
		rGeome.logstr += prefixLog(rakeGeom.logstr, rakeParam.designName);
		// figures
		figCone.mergeFigure(rakeGeom.fig.faceCone);
		figBeam.mergeFigure(rakeGeom.fig.faceBeam);
		figBeamHollow.mergeFigure(rakeGeom.fig.faceBeamHollow);
		figDisc.mergeFigure(rakeGeom.fig.faceDisc);
		figHand.mergeFigure(rakeGeom.fig.faceHand);
		figWing.mergeFigure(rakeGeom.fig.faceWing);
		figWingHollow.mergeFigure(rakeGeom.fig.faceWingHollow);
		figDoor.mergeFigure(rakeGeom.fig.faceDoor);
		// final figure list
		rGeome.fig = {
			faceCone: figCone,
			faceBeam: figBeam,
			faceBeamHollow: figBeamHollow,
			faceDisc: figDisc,
			faceHand: figHand,
			faceWing: figWing,
			faceWingHollow: figWingHollow,
			faceDoor: figDoor
		};
		const designName = pDef.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_door`,
					face: `${designName}_faceDoor`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.D1,
					rotate: [Math.PI / 2, 0, Math.PI / 2],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `ipax_${designName}_plus`,
					boolMethod: EBVolume.eUnion,
					inList: [
						`subpax_${designName}_cone`,
						`subpax_${designName}_beam`,
						`subpax_${designName}_disc`,
						`subpax_${designName}_hand_0`,
						`subpax_${designName}_hand_1`,
						`subpax_${designName}_hand_2`,
						`subpax_${designName}_hand_3`,
						`subpax_${designName}_wing_right`,
						`subpax_${designName}_wing_left`
					]
				},
				{
					outName: `ipax_${designName}_hollow`,
					boolMethod: EBVolume.eUnion,
					inList: [
						`subpax_${designName}_beamHollow`,
						`subpax_${designName}_wing_hollow_right`,
						`subpax_${designName}_wing_hollow_left`,
						`subpax_${designName}_door`
					]
				},
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eSubstraction,
					inList: [`ipax_${designName}_plus`, `ipax_${designName}_hollow`]
				}
			]
		};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'heliostat-rake draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const rakeStopperDef: tPageDef = {
	pTitle: 'Heliostat rake with stopper',
	pDescription: 'The rake-stopper on top of the pole-rotor of the heliostat',
	pDef: pDef,
	pGeom: pGeom
};

export { rakeStopperDef };
