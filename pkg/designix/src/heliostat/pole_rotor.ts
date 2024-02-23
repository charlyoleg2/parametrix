// pole_rotor.ts

import type {
	tContour,
	tParamDef,
	tParamVal,
	tGeom,
	tPageDef
	//tSubInst
	//tSubDesign
} from 'geometrix';
import {
	contour,
	contourCircle,
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

const pDef: tParamDef = {
	partName: 'pole_rotor',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 600, 1, 4000, 1),
		pNumber('D2', 'mm', 400, 1, 4000, 1),
		pNumber('H1', 'mm', 8000, 10, 40000, 10),
		pNumber('E1', 'mm', 5, 1, 80, 1),
		pNumber('E2', 'mm', 30, 1, 80, 1),
		pNumber('N1', '', 24, 3, 100, 1),
		pNumber('D3', 'mm', 40, 1, 100, 1),
		pNumber('L1', 'mm', 45, 1, 300, 1)
	],
	paramSvg: {
		D1: 'pole_rotor_cut.svg',
		D2: 'pole_rotor_cut.svg',
		H1: 'pole_rotor_cut.svg',
		E1: 'pole_rotor_cut.svg',
		E2: 'pole_rotor_cut.svg',
		N1: 'pole_rotor_ends.svg',
		D3: 'pole_rotor_ends.svg',
		L1: 'pole_rotor_ends.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

type tCtr1 = (orient: number) => tContour;

function pGeom(t: number, param: tParamVal, suffix = ''): tGeom {
	const rGeome = initGeom(pDef.partName + suffix);
	let ctrPoleProfile: tCtr1;
	const figCut = figure();
	const figBottom = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		const R1 = param.D1 / 2;
		const R2 = param.D2 / 2;
		const R3 = param.D3 / 2;
		rGeome.logstr += `pole-height: ${ffix(param.H1)} mm\n`;
		// figCut
		const ctrCylinder = contour(R1, 0)
			.addSegStrokeA(R1, param.H1)
			.addSegStrokeA(R1 - param.E1, param.H1)
			.addSegStrokeA(R1 - param.E1, 0)
			.closeSegStroke();
		figCut.addMain(ctrCylinder);
		ctrPoleProfile = function (orient: number): tContour {
			const rPoleProfile = contour(orient * R1, 0)
				.addSegStrokeA(orient * R1, param.H1)
				.addSegStrokeA(orient * R2, param.H1)
				.addSegStrokeA(orient * R2, param.H1 - param.E2)
				.addSegStrokeA(orient * (R1 - param.E1), param.H1 - param.E2)
				.addSegStrokeA(orient * (R1 - param.E1), param.E2)
				.addSegStrokeA(orient * R2, param.E2)
				.addSegStrokeA(orient * R2, 0)
				.closeSegStroke();
			return rPoleProfile;
		};
		figCut.addSecond(ctrPoleProfile(1));
		figCut.addSecond(ctrPoleProfile(-1));
		// figBottom
		figBottom.addMain(contourCircle(0, 0, R1));
		figBottom.addMain(contourCircle(0, 0, R2));
		const posR = R2 + param.L1;
		const posA = (2 * Math.PI) / param.N1;
		for (let i = 0; i < param.N1; i++) {
			const posX = posR * Math.cos(i * posA);
			const posY = posR * Math.sin(i * posA);
			figBottom.addMain(contourCircle(posX, posY, R3));
		}
		figBottom.addSecond(contourCircle(0, 0, R1 - param.E1));
		// final figure list
		rGeome.fig = {
			faceCut: figCut,
			faceBottom: figBottom
		};
		const designName = rGeome.partName;
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
		rGeome.logstr += 'pole_rotor drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const poleRotorDef: tPageDef = {
	pTitle: 'Heliostat pole rotor',
	pDescription: 'The vertical axis inside the pole of an heliostat',
	pDef: pDef,
	pGeom: pGeom
};

export { poleRotorDef };
