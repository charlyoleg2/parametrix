// rod.ts

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
	partName: 'rod',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('L1', 'mm', 10000, 1000, 40000, 10),
		pNumber('L2', 'mm', 100, 10, 400, 1),
		pNumber('L3', 'mm', 400, 100, 1000, 1),
		pNumber('L4', 'mm', 600, 100, 1000, 1),
		pNumber('H1', 'mm', 200, 10, 4000, 1),
		pNumber('E1', 'mm', 2, 1, 80, 1),
		pNumber('E2', 'mm', 10, 1, 80, 1),
		pNumber('N1', '', 10, 2, 50, 1),
		pNumber('N3', '', 2, 1, 20, 1),
		pNumber('N4', '', 4, 1, 20, 1),
		pNumber('R3', 'mm', 100, 1, 500, 1),
		pNumber('D2', 'mm', 10, 5, 100, 1),
		pNumber('L7', 'mm', 10, 1, 300, 1)
	],
	paramSvg: {
		L1: 'rod_top.svg',
		L2: 'rod_top.svg',
		L3: 'rod_top.svg',
		L4: 'rod_top.svg',
		H1: 'rod_cut.svg',
		E1: 'rod_cut.svg',
		E2: 'rod_cut.svg',
		N1: 'rod_top.svg',
		N3: 'rod_top.svg',
		N4: 'rod_top.svg',
		R3: 'rod_top.svg',
		D2: 'rod_plate.svg',
		L7: 'rod_plate.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

type tCtr1 = (py: number) => tContour[];
type tCtr2 = (py: number, ly: number) => tContour;

function pGeom(t: number, param: tParamVal): tGeom {
	let ctrPlate: tCtr1;
	let ctrRod: tCtr2;
	const rGeome = initGeom(pDef.partName);
	const figCut = figure();
	const figPlate = figure();
	const figTop = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		const R2 = param.D2 / 2;
		const n3step = param.L3 / (param.N3 + 1);
		const n4step = param.L4 / (param.N4 + 1);
		rGeome.logstr += `rod-length: ${ffix(param.L1)} mm\n`;
		ctrPlate = function (py: number): tContour[] {
			const rPlate: tContour[] = [];
			const plateExt = contour(param.L4 / 2, py)
				.addCornerRounded(param.R3)
				.addSegStrokeA(param.L4 / 2, py + param.L3)
				.addCornerRounded(param.R3)
				.addSegStrokeA(-param.L4 / 2, py + param.L3)
				.addCornerRounded(param.R3)
				.addSegStrokeA(-param.L4 / 2, py)
				.addCornerRounded(param.R3)
				.closeSegStroke();
			rPlate.push(plateExt);
			for (let i = 1; i < param.N3 + 1; i++) {
				rPlate.push(contourCircle(param.L4 / 2 - param.L7, py + i * n3step, R2));
				rPlate.push(contourCircle(-param.L4 / 2 + param.L7, py + i * n3step, R2));
			}
			for (let i = 1; i < param.N4 + 1; i++) {
				rPlate.push(contourCircle(-param.L4 / 2 + i * n4step, py + param.L7, R2));
				rPlate.push(
					contourCircle(-param.L4 / 2 + i * n4step, py + param.L3 - param.L7, R2)
				);
			}
			return rPlate;
		};
		ctrRod = function (py: number, ly: number): tContour {
			const rRod = contour(param.L2 / 2, py)
				.addSegStrokeA(param.L2 / 2, py + ly)
				.addSegStrokeA(-param.L2 / 2, py + ly)
				.addSegStrokeA(-param.L2 / 2, py)
				.closeSegStroke();
			return rRod;
		};
		// figCut
		const L2h = param.L2 / 2;
		const L4h = param.L4 / 2;
		const L2hi = (param.L2 - 2 * param.E1) / 2;
		const H1i = param.H1 - param.E1;
		const ctrRodExt = contour(L2h, 0)
			.addSegStrokeA(L2h, param.H1)
			.addSegStrokeA(-L2h, param.H1)
			.addSegStrokeA(-L2h, 0)
			.closeSegStroke();
		const ctrRodInt = contour(L2hi, param.E1)
			.addSegStrokeA(L2hi, H1i)
			.addSegStrokeA(-L2hi, H1i)
			.addSegStrokeA(-L2h, param.E1)
			.closeSegStroke();
		const ctrPlateSide = contour(L4h, param.H1)
			.addSegStrokeA(L4h, param.H1 + param.E2)
			.addSegStrokeA(-L4h, param.H1 + param.E2)
			.addSegStrokeA(-L4h, param.H1)
			.closeSegStroke();
		figCut.addMain(ctrRodExt);
		figCut.addMain(ctrRodInt);
		figCut.addSecond(ctrPlateSide);
		// figPlate
		ctrPlate(0).forEach((ctr) => figPlate.addMain(ctr));
		figPlate.addSecond(ctrRod(-param.L3 / 2, 2 * param.L3));
		// figTop
		const plateStep = (param.L1 - param.L3) / (param.N1 - 1);
		for (let i = 0; i < param.N1; i++) {
			ctrPlate(i * plateStep).forEach((ctr) => figTop.addMain(ctr));
		}
		figTop.addSecond(ctrRod(0, param.L1));
		// final figure list
		rGeome.fig = {
			faceCut: figCut,
			facePlate: figPlate,
			faceTop: figTop
		};
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_rod`,
					face: `${designName}_faceCut`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.L1,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_plates`,
					face: `${designName}_faceTop`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.E2,
					rotate: [Math.PI / 2, 0, 0],
					translate: [0, param.E2 + param.H1, 0]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: [`subpax_${designName}_rod`, `subpax_${designName}_plates`]
				}
			]
		};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'heliostat-rod drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const rodDef: tPageDef = {
	pTitle: 'Heliostat rod',
	pDescription: 'The rod of an heliostat-surface',
	pDef: pDef,
	pGeom: pGeom
};

export { rodDef };
