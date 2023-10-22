// pole_static.ts

import type {
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
	contour,
	//contourCircle,
	figure,
	//degToRad,
	radToDeg,
	//ffix,
	pNumber,
	//pCheckbox,
	//pDropdown,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

const pDef: tParamDef = {
	partName: 'pole_static',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 1000, 100, 4000, 10),
		pNumber('D2', 'mm', 600, 100, 4000, 10),
		pNumber('D3', 'mm', 700, 100, 4000, 10),
		pNumber('H1', 'mm', 3000, 100, 40000, 10),
		pNumber('H2', 'mm', 7000, 100, 40000, 10),
		pNumber('E1', 'mm', 30, 1, 80, 1),
		pNumber('E2', 'mm', 5, 1, 80, 1),
		pNumber('N1', '', 16, 3, 100, 1),
		pNumber('D5', 'mm', 20, 1, 100, 1),
		pNumber('L1', 'mm', 50, 1, 300, 1),
		pNumber('D4', 'mm', 600, 200, 1200, 1),
		pNumber('H3', 'mm', 300, 50, 1200, 1),
		pNumber('H4', 'mm', 1800, 200, 2500, 1)
	],
	paramSvg: {
		D1: 'pole_stator_cut.svg',
		D2: 'pole_stator_cut.svg',
		D3: 'pole_stator_cut.svg',
		H1: 'pole_stator_cut.svg',
		H2: 'pole_stator_cut.svg',
		E1: 'pole_stator_cut.svg',
		E2: 'pole_stator_cut.svg',
		N1: 'pole_stator_bottom.svg',
		D5: 'pole_stator_bottom.svg',
		L1: 'pole_stator_bottom.svg',
		D4: 'pole_stator_face.svg',
		H3: 'pole_stator_face.svg',
		H4: 'pole_stator_face.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal): tGeom {
	const rGeome = initGeom();
	const figCut = figure();
	//const figFace = figure();
	//const figBottom = figure();
	rGeome.logstr += `simTime: ${t}\n`;
	try {
		const R1 = param.D1 / 2;
		const R2 = param.D2 / 2;
		const R3 = param.D3 / 2;
		const angleCone = Math.atan2(R1 - R2, param.H2);
		rGeome.logstr += `angleCone: ${radToDeg(angleCone)}\n`;
		const H1bminus = param.E2 * Math.tan(angleCone / 2);
		const H1b = param.H1 - H1bminus;
		// figCut
		const poleProfile = contour(R3, 0)
			.addSegStrokeA(R1, 0)
			.addSegStrokeA(R1, param.H1)
			.addSegStrokeR(R2 - R1, param.H2)
			.addSegStrokeRP(Math.PI / 2, param.E2)
			.addSegStrokeA(R1 - param.E2, H1b)
			.addSegStrokeA(R1 - param.E2, param.E1)
			.addSegStrokeA(R3, param.E1)
			.closeSegStroke();
		figCut.addMain(poleProfile);
		// figFace
		// figBottom
		// final figure list
		//rGeome.fig = { poleCut: figCut, poleFace: figFace, poleBottom: figBottom };
		rGeome.fig = { poleCut: figCut };
		const designName = pDef.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_pole`,
					face: `${designName}_poleCute`,
					extrudeMethod: EExtrude.eRotate,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eIdentity,
					inList: [`subpax_${designName}_pole`]
				}
			]
		};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'pole_static draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const poleStaticDef: tPageDef = {
	pTitle: 'Heliostat pole static',
	pDescription: 'The vertical pole of an heliostat',
	pDef: pDef,
	pGeom: pGeom
};

export { poleStaticDef };
