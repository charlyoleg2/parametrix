// trapeze.ts

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
	radToDeg,
	ffix,
	pNumber,
	//pCheckbox,
	//pDropdown,
	pSectionSeparator,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

const pDef: tParamDef = {
	partName: 'trapeze',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('L1', 'mm', 1600, 10, 4000, 1),
		pNumber('L2', 'mm', 1000, 10, 4000, 1),
		pNumber('L3', 'mm', 400, 5, 800, 1),
		pNumber('L4', 'mm', 300, 5, 800, 1),
		pSectionSeparator('outer frame'),
		pNumber('N1', '', 7, 1, 20, 1),
		pNumber('N2', '', 4, 1, 20, 1),
		pNumber('D1', 'mm', 10, 1, 40, 1),
		pNumber('L5', 'mm', 100, 1, 400, 1),
		pNumber('L6', 'mm', 20, 1, 400, 1),
		pNumber('R1', 'mm', 60, 1, 400, 1),
		pNumber('R2', 'mm', 20, 1, 400, 1),
		pSectionSeparator('inner pad'),
		pNumber('N3', '', 2, 1, 20, 1),
		pNumber('N4', '', 2, 1, 20, 1),
		pNumber('D2', 'mm', 10, 1, 40, 1),
		pNumber('L7', 'mm', 20, 1, 400, 1),
		pNumber('R3', 'mm', 20, 1, 400, 1),
		pSectionSeparator('diagonal shaft'),
		pNumber('D3', 'mm', 30, 1, 100, 1),
		pNumber('D4', 'mm', 26, 1, 100, 1),
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

type tCtr1 = (px: number, py: number, angle: number) => tContour;

function pGeom(t: number, param: tParamVal, suffix = ''): tGeom {
	const rGeome = initGeom(pDef.partName + suffix);
	let ctrRodFootprint: tCtr1;
	let ctrRod: tCtr1;
	const figFrame = figure();
	const figPlate = figure();
	const figRod = figure();
	const figRodHollow = figure();
	const figCutRod = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
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
		const pad1 = param.R1 * (1 - 1 / Math.sqrt(2));
		const pad3 = param.R3 * (1 - 1 / Math.sqrt(2));
		const rod_x = param.L2 / 2 - pad1 - (param.L4 / 2 - pad3);
		const rod_y = param.L1 / 2 - pad1 - (param.L3 / 2 - pad3);
		const rod_xy = Math.sqrt(rod_x ** 2 + rod_y ** 2);
		const rod_z = param.H1 - param.H2 - param.H3;
		const rod_slope_length = Math.sqrt(rod_xy ** 2 + rod_z ** 2);
		const rod_slope_angle = Math.atan2(rod_z, rod_xy);
		const rod_xy_angle = Math.atan2(rod_y, rod_x);
		rGeome.logstr += `rod-slope:  length: ${ffix(rod_slope_length)} mm,  angle: ${ffix(
			radToDeg(rod_slope_angle)
		)} degree\n`;
		rGeome.logstr += `rod-xy-angle: ${ffix(radToDeg(rod_xy_angle))} degree\n`;
		const rodFootprintLength = param.D3 / Math.cos(Math.PI / 2 - rod_slope_angle);
		rGeome.logstr += `rod-footprint-length: ${ffix(rodFootprintLength)} mm\n`;
		const rodFPl = Math.sqrt((rodFootprintLength / 2) ** 2 + (param.D3 / 2) ** 2);
		const rodFPa = Math.atan2(param.D3, rodFootprintLength);
		ctrRodFootprint = function (px: number, py: number, angle: number): tContour {
			const rCtr = contour(px, py)
				.addPointRP(angle + Math.PI - rodFPa, rodFPl)
				.addSeg2Arcs(angle + Math.PI / 2, angle)
				.addPointRP(angle + Math.PI + rodFPa, rodFPl)
				.addSeg2Arcs(angle + Math.PI, angle + Math.PI / 2)
				.addPointRP(angle - rodFPa, rodFPl)
				.addSeg2Arcs(angle + (3 * Math.PI) / 2, angle + Math.PI)
				.addPointRP(angle + rodFPa, rodFPl)
				.addSeg2Arcs(angle, angle - Math.PI / 2);
			return rCtr;
		};
		ctrRod = function (px: number, py: number, angle: number): tContour {
			const px0 = px + rodFPl * Math.cos(angle + Math.PI - rodFPa);
			const py0 = py + rodFPl * Math.sin(angle + Math.PI - rodFPa);
			const rCtr = contour(px0, py0)
				.addSegStrokeRP(angle + Math.PI, rod_xy)
				.addSegStrokeRP(angle - Math.PI / 2, param.D3)
				.addSegStrokeRP(angle, rod_xy)
				.closeSegStroke();
			return rCtr;
		};
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
		if (param.L5 < param.D1 / 2 + param.L6) {
			throw `err658: L5 ${param.L5} too small compare to D1 ${param.D1} or L6 ${param.L6}`;
		}
		if (step3 < param.D2 / 2 + param.L7) {
			throw `err661: D2 ${param.D2} or L7 ${param.L7} too large compare to L3 ${param.l3}`;
		}
		if (step4 < param.D2 / 2 + param.L7) {
			throw `err664: D2 ${param.D2} or L7 ${param.L7} too large compare to L4 ${param.l4}`;
		}
		const lFrameHole: tContour[] = [];
		for (let i = 1; i < param.N1 + 1; i++) {
			lFrameHole.push(
				contourCircle(param.L2 / 2 - param.L6, -param.L1 / 2 + i * step1, param.D1 / 2)
			);
			lFrameHole.push(
				contourCircle(-param.L2 / 2 + param.L6, -param.L1 / 2 + i * step1, param.D1 / 2)
			);
		}
		for (let i = 1; i < param.N2 + 1; i++) {
			lFrameHole.push(
				contourCircle(-param.L2 / 2 + i * step2, param.L1 / 2 - param.L6, param.D1 / 2)
			);
			lFrameHole.push(
				contourCircle(-param.L2 / 2 + i * step2, -param.L1 / 2 + param.L6, param.D1 / 2)
			);
		}
		const lPlateHole: tContour[] = [];
		for (let i = 1; i < param.N3 + 1; i++) {
			lPlateHole.push(
				contourCircle(param.L4 / 2 - param.L7, -param.L3 / 2 + i * step3, param.D2 / 2)
			);
			lPlateHole.push(
				contourCircle(-param.L4 / 2 + param.L7, -param.L3 / 2 + i * step3, param.D2 / 2)
			);
		}
		for (let i = 1; i < param.N4 + 1; i++) {
			lPlateHole.push(
				contourCircle(-param.L4 / 2 + i * step4, param.L3 / 2 - param.L7, param.D2 / 2)
			);
			lPlateHole.push(
				contourCircle(-param.L4 / 2 + i * step4, -param.L3 / 2 + param.L7, param.D2 / 2)
			);
		}
		lFrameHole.forEach((ctr) => {
			figFrame.addMain(ctr);
		});
		lPlateHole.forEach((ctr) => {
			figFrame.addSecond(ctr);
		});
		const lRodFP: tContour[] = [];
		lRodFP.push(ctrRodFootprint(param.L2 / 2 - pad1, param.L1 / 2 - pad1, rod_xy_angle));
		lRodFP.push(ctrRodFootprint(param.L4 / 2 - pad3, param.L3 / 2 - pad3, rod_xy_angle));
		lRodFP.push(
			ctrRodFootprint(-param.L2 / 2 + pad1, param.L1 / 2 - pad1, Math.PI - rod_xy_angle)
		);
		lRodFP.push(
			ctrRodFootprint(-param.L4 / 2 + pad3, param.L3 / 2 - pad3, Math.PI - rod_xy_angle)
		);
		lRodFP.push(
			ctrRodFootprint(-param.L2 / 2 + pad1, -param.L1 / 2 + pad1, Math.PI + rod_xy_angle)
		);
		lRodFP.push(
			ctrRodFootprint(-param.L4 / 2 + pad3, -param.L3 / 2 + pad3, Math.PI + rod_xy_angle)
		);
		lRodFP.push(ctrRodFootprint(param.L2 / 2 - pad1, -param.L1 / 2 + pad1, -rod_xy_angle));
		lRodFP.push(ctrRodFootprint(param.L4 / 2 - pad3, -param.L3 / 2 + pad3, -rod_xy_angle));
		const lRod: tContour[] = [];
		lRod.push(ctrRod(param.L2 / 2 - pad1, param.L1 / 2 - pad1, rod_xy_angle));
		lRod.push(ctrRod(-param.L2 / 2 + pad1, param.L1 / 2 - pad1, Math.PI - rod_xy_angle));
		lRod.push(ctrRod(-param.L2 / 2 + pad1, -param.L1 / 2 + pad1, Math.PI + rod_xy_angle));
		lRod.push(ctrRod(param.L2 / 2 - pad1, -param.L1 / 2 + pad1, -rod_xy_angle));
		lRodFP.forEach((ctr) => {
			figFrame.addSecond(ctr);
		});
		lRod.forEach((ctr) => {
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
		lRodFP.forEach((ctr) => {
			figPlate.addSecond(ctr);
		});
		lRod.forEach((ctr) => {
			figPlate.addSecond(ctr);
		});
		// figRod
		if (param.D4 >= param.D3) {
			throw `err218: D4 ${param.D4} larger than D3 ${param.D3}`;
		}
		figRod.addMain(contourCircle(0, 0, param.D3 / 2));
		figRod.addSecond(contourCircle(0, 0, param.D4 / 2));
		// figRodHollow
		figRodHollow.addMain(contourCircle(0, 0, param.D4 / 2));
		figRodHollow.addSecond(contourCircle(0, 0, param.D3 / 2));
		// figCutRod
		const rodFootprintHeight = param.D3 * Math.cos(rod_slope_angle);
		const rodFootprintBack = rodFootprintHeight / Math.tan(rod_slope_angle);
		const pad3x = pad3 + (rodFootprintLength / 2 + rodFootprintBack) * Math.cos(rod_xy_angle);
		const pad3y = pad3 + (rodFootprintLength / 2 + rodFootprintBack) * Math.sin(rod_xy_angle);
		const rodExtrudeLength =
			rod_slope_length + 2 * (rodFootprintLength + rodFootprintBack + rodFootprintHeight);
		const cutL = rodExtrudeLength + param.L3 + param.L4 + rodFootprintHeight;
		const ctrCutRod = contour(cutL, cutL)
			.addSegStrokeA(-cutL, cutL)
			.addSegStrokeA(-cutL, -cutL)
			.addSegStrokeA(cutL, -cutL)
			.closeSegStroke();
		figCutRod.addMain(ctrCutRod);
		// final figure list
		rGeome.fig = {
			faceFrame: figFrame,
			facePlate: figPlate,
			faceRod: figRod,
			faceRodHollow: figRodHollow,
			faceCutRod: figCutRod
		};
		const designName = rGeome.partName;
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
					face: `${designName}_facePlate`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.H3,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_rod1`,
					face: `${designName}_faceRod`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: rodExtrudeLength,
					rotate: [0, Math.PI / 2 - rod_slope_angle, rod_xy_angle],
					translate: [
						param.L4 / 2 - pad3x,
						param.L3 / 2 - pad3y,
						param.H3 - rodFootprintHeight
					]
				},
				{
					outName: `subpax_${designName}_rod2`,
					face: `${designName}_faceRod`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: rodExtrudeLength,
					rotate: [0, Math.PI / 2 - rod_slope_angle, Math.PI - rod_xy_angle],
					translate: [
						-param.L4 / 2 + pad3x,
						param.L3 / 2 - pad3y,
						param.H3 - rodFootprintHeight
					]
				},
				{
					outName: `subpax_${designName}_rod3`,
					face: `${designName}_faceRod`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: rodExtrudeLength,
					rotate: [0, Math.PI / 2 - rod_slope_angle, Math.PI + rod_xy_angle],
					translate: [
						-param.L4 / 2 + pad3x,
						-param.L3 / 2 + pad3y,
						param.H3 - rodFootprintHeight
					]
				},
				{
					outName: `subpax_${designName}_rod4`,
					face: `${designName}_faceRod`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: rodExtrudeLength,
					rotate: [0, Math.PI / 2 - rod_slope_angle, -rod_xy_angle],
					translate: [
						param.L4 / 2 - pad3x,
						-param.L3 / 2 + pad3y,
						param.H3 - rodFootprintHeight
					]
				},
				{
					outName: `subpax_${designName}_rodH1`,
					face: `${designName}_faceRodHollow`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: rodExtrudeLength,
					rotate: [0, Math.PI / 2 - rod_slope_angle, rod_xy_angle],
					translate: [
						param.L4 / 2 - pad3x,
						param.L3 / 2 - pad3y,
						param.H3 - rodFootprintHeight
					]
				},
				{
					outName: `subpax_${designName}_rodH2`,
					face: `${designName}_faceRodHollow`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: rodExtrudeLength,
					rotate: [0, Math.PI / 2 - rod_slope_angle, Math.PI - rod_xy_angle],
					translate: [
						-param.L4 / 2 + pad3x,
						param.L3 / 2 - pad3y,
						param.H3 - rodFootprintHeight
					]
				},
				{
					outName: `subpax_${designName}_rodH3`,
					face: `${designName}_faceRodHollow`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: rodExtrudeLength,
					rotate: [0, Math.PI / 2 - rod_slope_angle, Math.PI + rod_xy_angle],
					translate: [
						-param.L4 / 2 + pad3x,
						-param.L3 / 2 + pad3y,
						param.H3 - rodFootprintHeight
					]
				},
				{
					outName: `subpax_${designName}_rodH4`,
					face: `${designName}_faceRodHollow`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: rodExtrudeLength,
					rotate: [0, Math.PI / 2 - rod_slope_angle, -rod_xy_angle],
					translate: [
						param.L4 / 2 - pad3x,
						-param.L3 / 2 + pad3y,
						param.H3 - rodFootprintHeight
					]
				},
				{
					outName: `subpax_${designName}_cut1`,
					face: `${designName}_faceCutRod`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: cutL,
					rotate: [0, 0, 0],
					translate: [0, 0, -cutL]
				},
				{
					outName: `subpax_${designName}_cut2`,
					face: `${designName}_faceCutRod`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: cutL,
					rotate: [0, 0, 0],
					translate: [0, 0, param.H1]
				}
			],
			volumes: [
				{
					outName: `ipax_${designName}_rawRod`,
					boolMethod: EBVolume.eUnion,
					inList: [
						`subpax_${designName}_rod1`,
						`subpax_${designName}_rod2`,
						`subpax_${designName}_rod3`,
						`subpax_${designName}_rod4`
					]
				},
				{
					outName: `ipax_${designName}_rodHollow`,
					boolMethod: EBVolume.eUnion,
					inList: [
						`subpax_${designName}_rodH1`,
						`subpax_${designName}_rodH2`,
						`subpax_${designName}_rodH3`,
						`subpax_${designName}_rodH4`
					]
				},
				{
					outName: `ipax_${designName}_halfRods`,
					boolMethod: EBVolume.eSubstraction,
					inList: [`ipax_${designName}_rawRod`, `subpax_${designName}_cut1`]
				},
				{
					outName: `ipax_${designName}_rods`,
					boolMethod: EBVolume.eSubstraction,
					inList: [`ipax_${designName}_halfRods`, `subpax_${designName}_cut2`]
				},
				{
					outName: `ipax_${designName}_plus`,
					boolMethod: EBVolume.eUnion,
					inList: [
						`subpax_${designName}_frame`,
						`subpax_${designName}_plate`,
						`ipax_${designName}_rods`
					]
				},
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eSubstraction,
					inList: [`ipax_${designName}_plus`, `ipax_${designName}_rodHollow`]
				}
			]
		};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'trapeze drawn successfully!\n';
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
