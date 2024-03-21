// vaxis_holder.ts

import type {
	tContour,
	tParamDef,
	tParamVal,
	tGeom,
	tExtrude,
	//tSubInst,
	//tSubDesign,
	//tVec3,
	tPageDef
} from 'geometrix';
import {
	point,
	contour,
	contourCircle,
	figure,
	degToRad,
	//radToDeg,
	ffix,
	pNumber,
	//pCheckbox,
	//pDropdown,
	pSectionSeparator,
	initGeom,
	transform3d,
	EExtrude,
	EBVolume
} from 'geometrix';

import { ctrHolderPetal } from './common_spring_and_petal'; // externalized contour

const pDef: tParamDef = {
	partName: 'vaxis_holder',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('PHD1', 'mm', 700, 1, 2000, 1),
		pNumber('PHD2', 'mm', 900, 1, 4000, 1),
		pNumber('PHD5', 'mm', 800, 1, 4000, 1),
		pNumber('PHN1', 'holes', 6, 1, 24, 1),
		pSectionSeparator('screw holes'),
		pNumber('PHD3', 'mm', 40, 2, 100, 1),
		pNumber('PHR4', 'mm', 40, 2, 100, 1),
		pNumber('PHL2', 'mm', 120, 5, 400, 1),
		pNumber('PHR6', 'mm', 20, 0, 400, 1),
		pSectionSeparator('section'),
		pNumber('PHE1', 'mm', 10, 1, 80, 1),
		pNumber('PHH1', 'mm', 50, 1, 200, 1),
		pNumber('PHA', 'degree', 5, -45, 45, 0.1),
		pNumber('PHL1', 'mm', 300, 1, 500, 1),
		pNumber('PHE2', 'mm', 10, 1, 80, 1),
		pNumber('PHE3', 'mm', 10, 1, 80, 1)
	],
	paramSvg: {
		PHD1: 'vaxis_holder_top.svg',
		PHD2: 'vaxis_holder_top.svg',
		PHD5: 'vaxis_holder_top.svg',
		PHD3: 'vaxis_holder_top.svg',
		PHR4: 'vaxis_holder_top.svg',
		PHN1: 'vaxis_holder_top.svg',
		PHL2: 'vaxis_holder_top.svg',
		PHR6: 'vaxis_holder_top.svg',
		PHE1: 'vaxis_holder_section.svg',
		PHH1: 'vaxis_holder_section.svg',
		PHA: 'vaxis_holder_section.svg',
		PHL1: 'vaxis_holder_section.svg',
		PHE2: 'vaxis_holder_section.svg',
		PHE3: 'vaxis_holder_top.svg'
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
	const figButtress1 = figure();
	const figButtress2 = figure();
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
		const vaxisHolderHeight = param.PHL1 * Math.cos(outerA);
		const innerR1 = R2 - param.PHE2 / Math.cos(outerA) + (param.PHE1 / 2) * Math.tan(outerA);
		const innerR2 = R2 - param.PHE2 / Math.cos(outerA) - (param.PHE1 / 2) * Math.tan(outerA);
		const innerR = Math.min(innerR1, innerR2);
		const innerL2 = (param.PHL1 - param.PHE1 / Math.cos(outerA)) / 2;
		const R2next = R2 - param.PHE2 / Math.cos(outerA);
		// step-5 : checks on the parameter values
		if (innerR < R5) {
			throw `err210: PHD5 ${param.PHD5} too large compare to PHE2 ${param.PHE2} or PHA ${param.PHA}`;
		}
		// step-6 : any logs
		rGeome.logstr += `vaxis_holder's height: ${ffix(vaxisHolderHeight)} mm\n`;
		rGeome.logstr += `vaxis_holder outerD1: ${ffix(2 * outerR1)} mm\n`;
		rGeome.logstr += `vaxis_holder outerD2: ${ffix(2 * outerR2)} mm\n`;
		rGeome.logstr += `vaxis_holder innerD: ${ffix(param.PHD1 - 2 * param.PHR4)} mm\n`;
		rGeome.logstr += `vaxis_holder D2-next: ${ffix(2 * R2next)} mm\n`;
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
		const ctrButtress1 = function (rnl: number): tContour {
			const rCtr = contour(rnl * (R1 + param.PHR4), -param.PHE1 / 2)
				.addSegStrokeA(rnl * innerR1, -param.PHE1 / 2)
				.addSegStrokeRP(-Math.PI / 2 + rnl * outerA, innerL2)
				.closeSegStroke();
			return rCtr;
		};
		const ctrButtress2 = function (rnl: number): tContour {
			const rCtr = contour(rnl * (R1 + param.PHR4), param.PHE1 / 2)
				.addSegStrokeA(rnl * innerR2, param.PHE1 / 2)
				.addSegStrokeRP(Math.PI / 2 + rnl * outerA, innerL2)
				.addSegStrokeA(rnl * (R1 + param.PHR4), param.PHE1 + param.PHH1)
				.closeSegStroke();
			return rCtr;
		};
		figOuter.addSecond(ctrButtress1(-1));
		figOuter.addSecond(ctrButtress2(-1));
		// create figButtress1 and figButtress2 from figOuter
		figButtress1.mergeFigure(figOuter, true);
		figButtress2.mergeFigure(figOuter, true);
		// complete figOuter
		figOuter.addSecond(ctrButtress1(1));
		figOuter.addSecond(ctrButtress2(1));
		// figButtress1
		figButtress1.addMain(ctrButtress1(1));
		figButtress1.addSecond(ctrButtress2(1));
		// figButtress2
		figButtress2.addSecond(ctrButtress1(1));
		figButtress2.addMain(ctrButtress2(1));
		// figPetal
		figPetal.addMain(contourCircle(0, 0, innerR));
		figPetal.addSecond(contourCircle(0, 0, R2));
		figPetal.addSecond(contourCircle(0, 0, Math.max(outerR1, outerR2)));
		const [petalLog, petalCtr, petalAngles] = ctrHolderPetal(param); // using the externalized contour
		rGeome.logstr += petalLog;
		figPetal.addMain(petalCtr);
		for (const rota of petalAngles) {
			const p4 = point(0, 0).translatePolar(rota, R1);
			figPetal.addMain(contourCircle(p4.cx, p4.cy, param.PHD3 / 2));
		}
		const ctrButtress = contour(R1 + param.PHR4, -param.PHE3)
			.addSegStrokeA(innerR, -param.PHE3)
			.addSegStrokeA(innerR, param.PHE3)
			.addSegStrokeA(R1 + param.PHR4, param.PHE3)
			.closeSegStroke();
		for (const rota of petalAngles) {
			figPetal.addSecond(ctrButtress.rotate(0, 0, rota));
		}
		// final figure list
		rGeome.fig = {
			facePetal: figPetal,
			faceOuter: figOuter,
			faceButtress1: figButtress1,
			faceButtress2: figButtress2
		};
		const designName = rGeome.partName;
		// 3D preparations
		const tm = transform3d();
		tm.addRotation(Math.PI / 2, 0, 0);
		tm.addTranslation(0, param.PHE3 / 2, 0);
		const preExtrude1 = petalAngles.map((rota, idx) => {
			const tm1 = transform3d(tm.getMatrix());
			tm1.addRotation(0, 0, rota);
			const rElem: tExtrude = {
				outName: `subpax_${designName}_b1_${idx}`,
				face: `${designName}_faceButtress1`,
				extrudeMethod: EExtrude.eLinearOrtho,
				length: param.PHE3,
				rotate: tm1.getRotation(),
				translate: tm1.getTranslation()
			};
			return rElem;
		});
		const preExtrude2 = petalAngles.map((rota, idx) => {
			const tm2 = transform3d(tm.getMatrix());
			tm2.addRotation(0, 0, rota);
			const rElem: tExtrude = {
				outName: `subpax_${designName}_b2_${idx}`,
				face: `${designName}_faceButtress2`,
				extrudeMethod: EExtrude.eLinearOrtho,
				length: param.PHE3,
				rotate: tm2.getRotation(),
				translate: tm2.getTranslation()
			};
			return rElem;
		});
		const b1List = petalAngles.map((elem, idx) => {
			const subElem = `subpax_${designName}_b1_${idx}`;
			return subElem;
		});
		const b2List = petalAngles.map((elem, idx) => {
			const subElem = `subpax_${designName}_b2_${idx}`;
			return subElem;
		});
		// 3D definition
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
				},
				...preExtrude1,
				...preExtrude2
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: [
						`subpax_${designName}_petal`,
						`subpax_${designName}_outer`,
						...b1List,
						...b2List
					]
				}
			]
		};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'vaxis_holder drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const vaxisHolderDef: tPageDef = {
	pTitle: 'Heliostat vaxis_holder',
	pDescription: 'The holders of the guidance mechanism for azimuth motion',
	pDef: pDef,
	pGeom: pGeom
};

export { vaxisHolderDef };
