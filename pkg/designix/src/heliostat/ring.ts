// ring.ts

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
	pSectionSeparator,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

const pDef: tParamDef = {
	// partName is used in URL. Choose a name without slash, backslash and space.
	partName: 'ring',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 400, 1, 2000, 1),
		pNumber('D3', 'mm', 800, 1, 4000, 1),
		pNumber('H1', 'mm', 20, 1, 100, 1),
		pNumber('H2', 'mm', 100, 1, 600, 1),
		pSectionSeparator('ring holes'),
		pNumber('N2', '', 24, 3, 100, 1),
		pNumber('D2', 'mm', 40, 1, 100, 1),
		pNumber('L1', 'mm', 45, 1, 300, 1),
		pSectionSeparator('ring fake teeth'),
		pNumber('N1', '', 100, 3, 10000, 1),
		pNumber('L2', 'mm', 30, 1, 200, 1),
		pNumber('L3', 'mm', 30, 1, 200, 1)
	],
	paramSvg: {
		D1: 'ring_top.svg',
		D3: 'ring_top.svg',
		H1: 'ring_section.svg',
		H2: 'ring_section.svg',
		N2: 'ring_top.svg',
		D2: 'ring_top.svg',
		L1: 'ring_top.svg',
		N1: 'ring_top.svg',
		L2: 'ring_top.svg',
		L3: 'ring_top.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal, suffix = ''): tGeom {
	const rGeome = initGeom(pDef.partName + suffix);
	const figRingBase = figure();
	const figRingTeeth = figure();
	const figSection = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const R1 = param.D1 / 2;
		const R2 = param.D2 / 2;
		const R3 = param.D3 / 2;
		const ringHeight = param.H1 + param.H2;
		// step-5 : checks on the parameter values
		if (param.L1 < R2) {
			throw `err203: L1 ${param.L1} too small compare to D2 ${param.D2}`;
		}
		if (R1 + param.L1 + R2 > R3 - param.L2 - param.L3) {
			throw `err204: D3 ${param.D3} too small compare to D1 ${param.D1}, L1 ${param.L1}, L2 ${param.L2}, L3 ${param.L3}`;
		}
		if (2 * Math.atan2(R2, R1 + param.L1) > (2 * Math.PI) / param.N2) {
			throw `err205: D2 ${param.D2} too large compare to N2 ${param.N2}`;
		}
		// step-6 : any logs
		rGeome.logstr += `ring-height: ${ffix(ringHeight)} mm\n`;
		// step-7 : drawing of the figures
		// ctrTeeth
		const tR1 = R3 - param.L3;
		const tR2 = tR1 - param.L2;
		const tA = (2 * Math.PI) / (2 * param.N1);
		const ctrTeeth = contour(tR1, 0);
		for (let i = 0; i < param.N1; i++) {
			const ti1 = 2 * i + 1;
			const ti2 = 2 * i + 2;
			const p1X = tR2 * Math.cos(ti1 * tA);
			const p1Y = tR2 * Math.sin(ti1 * tA);
			const p2X = tR1 * Math.cos(ti2 * tA);
			const p2Y = tR1 * Math.sin(ti2 * tA);
			ctrTeeth.addSegStrokeA(p1X, p1Y).addSegStrokeA(p2X, p2Y);
		}
		// figRingBase
		figRingBase.addMain(contourCircle(0, 0, R3));
		figRingBase.addMain(contourCircle(0, 0, R1));
		const posR = R1 + param.L1;
		const posA = (2 * Math.PI) / param.N2;
		for (let i = 0; i < param.N2; i++) {
			const posX = posR * Math.cos(i * posA);
			const posY = posR * Math.sin(i * posA);
			figRingBase.addMain(contourCircle(posX, posY, R2));
			figRingTeeth.addSecond(contourCircle(posX, posY, R2));
		}
		figRingBase.addSecond(ctrTeeth);
		// figRingTeeth
		figRingTeeth.addMain(contourCircle(0, 0, R3));
		figRingTeeth.addMain(ctrTeeth);
		figRingTeeth.addSecond(contourCircle(0, 0, R1));
		// figSection
		const ctrInner = contour(R1, 0)
			.addSegStrokeA(-R1, 0)
			.addSegStrokeA(-R1, -param.H1)
			.addSegStrokeA(R1, -param.H1)
			.closeSegStroke();
		const ctrScrewHole = function (rnl: number): tContour {
			const rCtr = contour(rnl * (R1 + param.L1) + R2, 0)
				.addSegStrokeR(-2 * R2, 0)
				.addSegStrokeR(0, -param.H1)
				.addSegStrokeR(2 * R2, 0)
				.closeSegStroke();
			return rCtr;
		};
		const ctrGearTeeth = function (rnl: number): tContour {
			const rCtr = contour(rnl * (R3 - param.L3), -param.H1)
				.addSegStrokeR(-rnl * param.L2, 0)
				.addSegStrokeR(0, -param.H2)
				.addSegStrokeR(rnl * param.L2, 0)
				.closeSegStroke();
			return rCtr;
		};
		const ctrL = function (rnl: number): tContour {
			const rCtr = contour(rnl * R3, 0)
				.addSegStrokeR(-rnl * (R3 - R1), 0)
				.addSegStrokeR(0, -param.H1)
				.addSegStrokeR(rnl * (R3 - param.L2 - param.L3 - R1), 0)
				.addSegStrokeR(0, -param.H2)
				.addSegStrokeR(rnl * (param.L2 + param.L3), 0)
				.closeSegStroke();
			return rCtr;
		};
		figSection.addSecond(ctrInner);
		figSection.addSecond(ctrScrewHole(1));
		figSection.addSecond(ctrScrewHole(-1));
		figSection.addSecond(ctrGearTeeth(1));
		figSection.addSecond(ctrGearTeeth(-1));
		figSection.addMain(ctrL(1));
		figSection.addSecond(ctrL(-1));
		// final figure list
		rGeome.fig = {
			faceRingBase: figRingBase,
			faceRingTeeth: figRingTeeth,
			faceSection: figSection
		};
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_base`,
					face: `${designName}_faceRingBase`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.H1,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_teeth`,
					face: `${designName}_faceRingTeeth`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: ringHeight,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: [`subpax_${designName}_base`, `subpax_${designName}_teeth`]
				}
			]
		};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'ring drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const ringDef: tPageDef = {
	pTitle: 'Heliostat ring',
	pDescription: 'The gear ring for adjusting the azimuth of the heliostat',
	pDef: pDef,
	pGeom: pGeom
};

export { ringDef };
