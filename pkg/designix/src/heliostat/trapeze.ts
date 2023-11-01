// trapeze.ts

import type {
	tContour,
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
	contourCircle,
	figure,
	//degToRad,
	radToDeg,
	ffix,
	pNumber,
	//pCheckbox,
	//pDropdown,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

const pDef: tParamDef = {
	partName: 'trapeze',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('L1', 'mm', 1600, 100, 4000, 10),
		pNumber('L2', 'mm', 1000, 100, 4000, 10),
		pNumber('L3', 'mm', 400, 100, 800, 10),
		pNumber('L4', 'mm', 300, 100, 800, 10),
		pNumber('N1', '', 7, 1, 20, 1),
		pNumber('N2', '', 4, 1, 20, 1),
		pNumber('N3', '', 2, 1, 20, 1),
		pNumber('N4', '', 2, 1, 20, 1),
		pNumber('L5', 'mm', 100, 1, 400, 1),
		pNumber('L6', 'mm', 50, 1, 400, 1),
		pNumber('L7', 'mm', 50, 1, 400, 1),
		pNumber('D1', 'mm', 10, 1, 40, 10),
		pNumber('D2', 'mm', 10, 1, 40, 10),
		pNumber('D3', 'mm', 30, 1, 100, 10),
		pNumber('D4', 'mm', 26, 1, 100, 10),
		pNumber('R1', 'mm', 60, 1, 400, 1),
		pNumber('R2', 'mm', 20, 1, 400, 1),
		pNumber('R3', 'mm', 20, 1, 400, 1),
		pNumber('H1', 'mm', 300, 0.5, 800, 0.5),
		pNumber('H2', 'mm', 2, 0.5, 800, 0.5),
		pNumber('H3', 'mm', 5, 0.5, 800, 0.5)
	],
	paramSvg: {
		L1: 'trapeze_top.svg',
		L2: 'trapeze_top.svg',
		L3: 'trapeze_top.svg',
		L4: 'trapeze_top.svg',
		N1: 'trapeze_top.svg',
		N2: 'trapeze_top.svg',
		N3: 'trapeze_top.svg',
		N4: 'trapeze_top.svg',
		L5: 'trapeze_top.svg',
		L6: 'trapeze_top.svg',
		L7: 'trapeze_top.svg',
		D1: 'trapeze_top.svg',
		D2: 'trapeze_top.svg',
		D3: 'trapeze_rod.svg',
		D4: 'trapeze_rod.svg',
		R1: 'trapeze_top.svg',
		R2: 'trapeze_top.svg',
		R3: 'trapeze_top.svg',
		H1: 'trapeze_side.svg',
		H2: 'trapeze_side.svg',
		H3: 'trapeze_side.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal): tGeom {
	const rGeome = initGeom();
	const figFrame = figure();
	const figPlate = figure();
	//const figRod = figure();
	//const figRodHollow = figure();
	rGeome.logstr += `simTime: ${t}\n`;
	try {
		if (param.L3 > param.L1 - param.L5) {
			throw `err595: L3 ${param.L3} too large compare to L1 ${param.L1} and L5 ${param.L5}`;
		}
		if (param.L4 > param.L2 - param.L5) {
			throw `err596: L4 ${param.L4} too large compare to L2 ${param.L2} and L5 ${param.L5}`;
		}
		if (param.H1 - param.H2 - param.H3 < 4 * param.D3) {
			throw `err597: H1 ${param.H1} too small compare to H2 ${param.H2}, H3 ${param.H3} and D3 ${param.D3}`;
		}
		const rod_x = (param.L2 - param.L4) / 2;
		const rod_y = (param.L1 - param.L3) / 2;
		const rod_xy = Math.sqrt(rod_x ** 2 + rod_y ** 2);
		const rod_z = param.H1 - param.H2 - param.H3;
		const rod_slope_length = Math.sqrt(rod_xy ** 2 + rod_z ** 2);
		const rod_slope_angle = Math.atan2(rod_z, rod_xy);
		const rod_xy_angle = Math.atan2(rod_x, rod_y);
		rGeome.logstr += `rod-slope:  length: ${ffix(rod_slope_length)} mm,  angle: ${ffix(
			radToDeg(rod_slope_angle)
		)} degree\n`;
		rGeome.logstr += `rod-xy-angle: ${ffix(radToDeg(rod_xy_angle))} degree\n`;
		// figFrame
		if (param.R1 > param.L1 / 4 || param.R1 > param.L2 / 4) {
			throw `err614: R1 ${param.R1} too large compare to L1 ${param.L1} or L2 ${param.L2}`;
		}
		const ctrFrameExt = contour(param.L2 / 2, param.L1 / 2)
			.addSegStrokeA(-param.L2 / 2, param.L1 / 2)
			.addCornerRounded(param.R1)
			.addSegStrokeA(-param.L2 / 2, -param.L1 / 2)
			.addCornerRounded(param.R1)
			.addSegStrokeA(param.L2 / 2, -param.L1 / 2)
			.addCornerRounded(param.R1)
			.closeSegStroke()
			.addCornerRounded(param.R1);
		if (param.R2 > (param.L1 - 2 * param.L5) / 4 || param.R2 > (param.L2 - 2 * param.L5) / 4) {
			throw `err627: R2 ${param.R2} too large compare to L1 ${param.L1}, L2 ${param.L2} and L5 ${param.L5}`;
		}
		const ctrFrameInt = contour(param.L2 / 2 - param.L5, param.L1 / 2 - param.L5)
			.addSegStrokeA(-param.L2 / 2 + param.L5, param.L1 / 2 - param.L5)
			.addCornerRounded(param.R2)
			.addSegStrokeA(-param.L2 / 2 + param.L5, -param.L1 / 2 + param.L5)
			.addCornerRounded(param.R2)
			.addSegStrokeA(param.L2 / 2 - param.L5, -param.L1 / 2 + param.L5)
			.addCornerRounded(param.R2)
			.closeSegStroke()
			.addCornerRounded(param.R2);
		if (param.R3 > param.L3 / 4 || param.R3 > param.L4 / 4) {
			throw `err639: R3 ${param.R3} too large compare to L3 ${param.L3} or L4 ${param.L4}`;
		}
		const ctrPlate = contour(param.L4 / 2, param.L3 / 2)
			.addSegStrokeA(-param.L4 / 2, param.L3 / 2)
			.addCornerRounded(param.R3)
			.addSegStrokeA(-param.L4 / 2, -param.L3 / 2)
			.addCornerRounded(param.R3)
			.addSegStrokeA(param.L4 / 2, -param.L3 / 2)
			.addCornerRounded(param.R3)
			.closeSegStroke()
			.addCornerRounded(param.R3);
		figFrame.addMain(ctrFrameExt);
		figFrame.addMain(ctrFrameInt);
		figFrame.addSecond(ctrPlate);
		const step1 = param.L1 / (param.N1 + 1);
		const step2 = param.L2 / (param.N2 + 1);
		const step3 = param.L3 / (param.N3 + 1);
		const step4 = param.L4 / (param.N4 + 1);
		if (param.L5 < param.D1 + param.L6) {
			throw `err658: L5 ${param.L5} too small compare to D1 ${param.D1} or L6 ${param.L6}`;
		}
		if (step3 < param.D2 + param.L7) {
			throw `err661: D2 ${param.D2} or L7 ${param.L7} too large compare to L3 ${param.l3}`;
		}
		if (step4 < param.D2 + param.L7) {
			throw `err664: D2 ${param.D2} or L7 ${param.L7} too large compare to L4 ${param.l4}`;
		}
		const lFrameHole: tContour[] = [];
		for (let i = 1; i < param.N1 + 1; i++) {
			lFrameHole.push(
				contourCircle(param.L2 / 2 - param.L6, -param.L1 / 2 + i * step1, param.D1)
			);
			lFrameHole.push(
				contourCircle(-param.L2 / 2 + param.L6, -param.L1 / 2 + i * step1, param.D1)
			);
		}
		for (let i = 1; i < param.N2 + 1; i++) {
			lFrameHole.push(
				contourCircle(-param.L2 / 2 + i * step2, param.L1 / 2 - param.L6, param.D1)
			);
			lFrameHole.push(
				contourCircle(-param.L2 / 2 + i * step2, -param.L1 / 2 + param.L6, param.D1)
			);
		}
		const lPlateHole: tContour[] = [];
		for (let i = 1; i < param.N3 + 1; i++) {
			lPlateHole.push(
				contourCircle(param.L4 / 2 - param.L7, -param.L3 / 2 + i * step3, param.D2)
			);
			lPlateHole.push(
				contourCircle(-param.L4 / 2 + param.L7, -param.L3 / 2 + i * step3, param.D2)
			);
		}
		for (let i = 1; i < param.N4 + 1; i++) {
			lPlateHole.push(
				contourCircle(-param.L4 / 2 + i * step4, param.L3 / 2 - param.L7, param.D2)
			);
			lPlateHole.push(
				contourCircle(-param.L4 / 2 + i * step4, -param.L3 / 2 + param.L7, param.D2)
			);
		}
		lFrameHole.forEach((ctr) => {
			figFrame.addMain(ctr);
		});
		lPlateHole.forEach((ctr) => {
			figFrame.addSecond(ctr);
		});
		// figPlate
		figPlate.addMain(ctrPlate);
		lPlateHole.forEach((ctr) => {
			figPlate.addMain(ctr);
		});
		figPlate.addSecond(ctrFrameExt);
		figPlate.addSecond(ctrFrameInt);
		lFrameHole.forEach((ctr) => {
			figPlate.addSecond(ctr);
		});
		// final figure list
		rGeome.fig = {
			faceFrame: figFrame,
			facePlate: figPlate
		};
		const designName = pDef.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_frame`,
					face: `${designName}_faceFrame`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.H2,
					rotate: [0, 0, 0],
					translate: [0, 0, param.H1 - param.H2]
				},
				{
					outName: `subpax_${designName}_plate`,
					face: `${designName}_facePalte`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.H3,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: [`subpax_${designName}_frame`, `subpax_${designName}_plate`]
				}
			]
		};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'trapeze draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const trapezeDef: tPageDef = {
	pTitle: 'Heliostat trapeze',
	pDescription: 'The support of one solar panel. Made out of aluminium for lightness and cooling',
	pDef: pDef,
	pGeom: pGeom
};

export { trapezeDef };
