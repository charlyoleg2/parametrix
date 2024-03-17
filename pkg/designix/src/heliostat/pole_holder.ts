// pole_holder.ts

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
	point,
	contour,
	contourCircle,
	figure,
	degToRad,
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
	partName: 'pole_holder',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('PHD1', 'mm', 700, 1, 2000, 1),
		pNumber('PHD2', 'mm', 900, 1, 4000, 1),
		pNumber('PHD5', 'mm', 800, 1, 4000, 1),
		pNumber('PHN1', 'holes', 6, 1, 24, 1),
		pSectionSeparator('screw holes'),
		pNumber('PHD3', 'mm', 40, 2, 100, 1),
		pNumber('PHR4', 'mm', 40, 2, 100, 1),
		pNumber('PHL2', 'mm', 60, 5, 200, 1),
		pNumber('PHR6', 'mm', 20, 1, 400, 1),
		pSectionSeparator('section'),
		pNumber('PHE1', 'mm', 10, 1, 80, 1),
		pNumber('PHH1', 'mm', 50, 1, 200, 1),
		pNumber('PHA', 'degree', 5, -45, 45, 0.1),
		pNumber('PHL1', 'mm', 300, 1, 500, 1),
		pNumber('PHE2', 'mm', 10, 1, 80, 1),
		pNumber('PHE3', 'mm', 10, 1, 80, 1)
	],
	paramSvg: {
		PHD1: 'pole_holder_top.svg',
		PHD2: 'pole_holder_top.svg',
		PHD5: 'pole_holder_top.svg',
		PHD3: 'pole_holder_top.svg',
		PHR4: 'pole_holder_top.svg',
		PHN1: 'pole_holder_top.svg',
		PHL2: 'pole_holder_top.svg',
		PHR6: 'pole_holder_top.svg',
		PHE1: 'pole_holder_section.svg',
		PHH1: 'pole_holder_section.svg',
		PHA: 'pole_holder_section.svg',
		PHL1: 'pole_holder_section.svg',
		PHE2: 'pole_holder_section.svg',
		PHE3: 'pole_holder_top.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal, suffix = ''): tGeom {
	const rGeome = initGeom(pDef.partName + suffix);
	const figOuter = figure();
	const figPetal = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const outerA = degToRad(param.PHA);
		const R1 = param.PHD1 / 2;
		const R2 = param.PHD2 / 2;
		const R3 = param.PHD3 / 2;
		const R5 = param.PHD5 / 2;
		const outerR1 = R2 + (param.PHL1 / 2) * Math.sin(outerA);
		const outerR2 = R2 - (param.PHL1 / 2) * Math.sin(outerA);
		const poleHolderHeight = param.PHL1 * Math.cos(outerA);
		const innerR1 = R2 - param.PHE2 / Math.cos(outerA) + (param.PHE1 / 2) * Math.tan(outerA);
		const innerR2 = R2 - param.PHE2 / Math.cos(outerA) - (param.PHE1 / 2) * Math.tan(outerA);
		const innerR = Math.min(innerR1, innerR2);
		const innerL2 = (param.PHL1 - param.PHE1 / Math.cos(outerA)) / 2;
		const petalA1 = 2 * Math.asin(param.PHR4 / R1);
		const petalA2 = 2 * Math.asin(param.PHL2 / (2 * R5));
		const hollowA = (2 * Math.PI) / param.PHN1 - petalA2;
		// step-5 : checks on the parameter values
		if (innerR < R5) {
			throw `err210: PHD5 ${param.PHD5} too large compare to PHE2 ${param.PHE2} or PHA ${param.PHA}`;
		}
		if (R5 < R1 + param.PHR4) {
			throw `err211: PHD5 ${param.PHD5} too small compare to PHD1 ${param.PHD1} or PHR4 ${param.PHR4}`;
		}
		if (hollowA < petalA2) {
			throw `err212: PHL2 ${param.PHL2} too large compare to PHN1 ${param.PHN1}`;
		}
		if (param.PHD3 > 2 * param.PHR4) {
			throw `err213: PHD3 ${param.PHD3} too large compare to PHR4 ${param.PHR4}`;
		}
		// step-6 : any logs
		rGeome.logstr += `pole_holder's height: ${ffix(poleHolderHeight)} mm\n`;
		rGeome.logstr += `pole_holder outerD1: ${ffix(2 * outerR1)} mm\n`;
		rGeome.logstr += `pole_holder outerD2: ${ffix(2 * outerR2)} mm\n`;
		rGeome.logstr += `pole_holder innerD: ${ffix(param.PHD1 - 2 * param.PHR4)} mm\n`;
		rGeome.logstr += `petal angle: ${ffix(radToDeg(petalA2))} degree\n`;
		rGeome.logstr += `hollow angle: ${ffix(radToDeg(hollowA))} degree\n`;
		// step-7 : drawing of the figures
		// figOuter
		const ctrOuter = function (rnl: number): tContour {
			const rCtr = contour(rnl * R5, -param.PHE1 / 2)
				.addSegStrokeR(rnl * (innerR1 - R5), 0)
				.addSegStrokeRP(-Math.PI / 2 + rnl * outerA, innerL2)
				.addSegStrokeRP(-Math.PI / 2 + rnl * (Math.PI / 2 + outerA), param.PHE2)
				.addSegStrokeRP(Math.PI / 2 + rnl * outerA, param.PHL1)
				.addSegStrokeRP(Math.PI / 2 + rnl * (Math.PI / 2 + outerA), param.PHE2)
				.addSegStrokeRP(-Math.PI / 2 + rnl * outerA, innerL2)
				.addSegStrokeA(rnl * R5, param.PHE1 / 2)
				.closeSegStroke();
			return rCtr;
		};
		const ctrLeg = function (rnl: number): tContour {
			const rCtr = contour(rnl * innerR, -param.PHE1 / 2)
				.addSegStrokeA(rnl * innerR, param.PHE1 / 2)
				.addSegStrokeA(rnl * (R1 - param.PHR4), param.PHE1 / 2)
				.addSegStrokeA(rnl * (R1 - param.PHR4), -param.PHE1 / 2)
				.closeSegStroke();
			return rCtr;
		};
		const ctrLegHole = function (rnl: number): tContour {
			const rCtr = contour(rnl * (R1 + R3), -param.PHE1 / 2)
				.addSegStrokeA(rnl * (R1 + R3), param.PHE1 / 2)
				.addSegStrokeA(rnl * (R1 - R3), param.PHE1 / 2)
				.addSegStrokeA(rnl * (R1 - R3), -param.PHE1 / 2)
				.closeSegStroke();
			return rCtr;
		};
		figOuter.addMain(ctrOuter(1));
		figOuter.addSecond(ctrOuter(-1));
		figOuter.addSecond(ctrLeg(1));
		figOuter.addSecond(ctrLegHole(1));
		figOuter.addSecond(ctrLeg(-1));
		figOuter.addSecond(ctrLegHole(-1));
		// figPetal
		figPetal.addMain(contourCircle(0, 0, innerR));
		figPetal.addSecond(contourCircle(0, 0, R2));
		figPetal.addSecond(contourCircle(0, 0, Math.max(outerR1, outerR2)));
		const p0 = point(0, 0);
		const p1 = point(R5, 0);
		const p2 = p1.rotate(p0, -petalA2 / 2);
		const p3 = point(R1, 0);
		const p10 = point(R1, 0);
		const p11 = point(R1 - param.PHR4, 0);
		const p12 = p11.rotate(p10, Math.PI / 2 - petalA1);
		const p13 = p11.rotate(p10, -Math.PI / 2 + petalA1);
		const ctrPetalPartial = contour(p2.cx, p2.cy)
			.addCornerRounded(param.PHR6)
			.addSegStrokeA(p12.cx, p12.cy)
			.addPointA(R1 - param.PHR4, 0)
			.addPointA(p13.cx, p13.cy)
			.addSegArc2()
			.addSegStrokeAP(petalA2 / 2, R5)
			.addCornerRounded(param.PHR6)
			.addPointAP(petalA2 / 2 + hollowA / 2, R5)
			.addPointAP(petalA2 / 2 + hollowA, R5)
			.addSegArc2();
		const ctrPetal = contour(p2.cx, p2.cy);
		for (let i = 0; i < param.PHN1; i++) {
			ctrPetal.addPartial(ctrPetalPartial.rotate(0, 0, i * (petalA2 + hollowA)));
		}
		figPetal.addMain(ctrPetal);
		for (let i = 0; i < param.PHN1; i++) {
			const p4 = p3.rotate(p0, i * (petalA2 + hollowA));
			figPetal.addMain(contourCircle(p4.cx, p4.cy, param.PHD3 / 2));
		}
		// final figure list
		rGeome.fig = {
			faceOuter: figOuter,
			facePetal: figPetal
		};
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_outer`,
					face: `${designName}_faceOuter`,
					extrudeMethod: EExtrude.eRotate,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_petal`,
					face: `${designName}_facePetal`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.PHE1,
					rotate: [0, 0, 0],
					translate: [0, 0, -param.PHE1 / 2]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: [`subpax_${designName}_outer`, `subpax_${designName}_petal`]
				}
			]
		};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'pole_holder drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const poleHolderDef: tPageDef = {
	pTitle: 'Heliostat pole_holder',
	pDescription: 'The holders of the guidance mechanism for azimuth motion',
	pDef: pDef,
	pGeom: pGeom
};

export { poleHolderDef };
