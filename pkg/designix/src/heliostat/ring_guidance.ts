// ring_guidance.ts
// guidance-part for supporting the azimuth-gear-ring of the heliostat

// step-1 : import from geometrix
import type {
	tContour,
	tParamDef,
	tParamVal,
	tGeom,
	//tExtrude,
	tPageDef
	//tSubInst
	//tSubDesign
} from 'geometrix';
import {
	//designParam,
	//checkGeom,
	//prefixLog,
	//point,
	//ShapePoint,
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

import { ctrGuidanceOuter } from './common_spring_and_petal'; // externalized contour

// step-2 : definition of the parameters and more (part-name, svg associated to each parameter, simulation parameters)
const pDef: tParamDef = {
	partName: 'ring_guidance',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 700, 5, 2500, 1),
		pNumber('N1', 'legs', 6, 1, 24, 1),
		pNumber('D2', 'mm', 600, 5, 2000, 1),
		pSectionSeparator('leg details'),
		pNumber('D3', 'mm', 30, 1, 200, 1),
		pNumber('D4', 'mm', 50, 1, 200, 1),
		pNumber('L1', 'mm', 90, 1, 900, 1),
		pNumber('R5', 'mm', 20, 0, 500, 1),
		pSectionSeparator('inner'),
		pNumber('D6', 'mm', 300, 1, 1000, 1),
		pNumber('N2', 'motors', 8, 1, 200, 1),
		pNumber('L2', 'mm', 50, 1, 200, 1),
		pNumber('D7', 'mm', 80, 1, 200, 1),
		pSectionSeparator('thickness'),
		pNumber('T1', 'mm', 10, 1, 200, 1)
	],
	paramSvg: {
		D1: 'ring_guidance_top.svg',
		D2: 'ring_guidance_top.svg',
		D3: 'ring_guidance_top.svg',
		D4: 'ring_guidance_top.svg',
		R5: 'ring_guidance_top.svg',
		D6: 'ring_guidance_top.svg',
		D7: 'ring_guidance_top.svg',
		N1: 'ring_guidance_top.svg',
		N2: 'ring_guidance_top.svg',
		L1: 'ring_guidance_top.svg',
		L2: 'ring_guidance_top.svg',
		T1: 'ring_guidance_top.svg'
	},
	sim: {
		tMax: 100,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

// step-3 : definition of the function that creates from the parameter-values the figures and construct the 3D
function pGeom(t: number, param: tParamVal, suffix = ''): tGeom {
	const rGeome = initGeom(pDef.partName + suffix);
	const figTop = figure();
	const figSection = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const R1 = param.D1 / 2;
		const R3 = param.D3 / 2;
		const R4 = param.D4 / 2;
		const R6 = param.D6 / 2;
		const R7 = param.D7 / 2;
		const stepA2 = (2 * Math.PI) / param.N2;
		// step-5 : checks on the parameter values
		if (R7 > param.L2) {
			throw `err461: D7 ${param.D7} is too large compare to L2 ${param.L2}`;
		}
		if (param.N2 * param.D7 > (param.D6 + 2 * param.L2) * Math.PI) {
			throw `err462: N2 ${param.N2} is too large compare to D6 ${param.D6}, D7 ${param.D7} and L2 ${param.L2}`;
		}
		if (param.D2 < param.D6 + 2 * param.L2 + 2 * R7) {
			throw `err463: D2 ${param.D2} is too small compare to D6 ${param.D6}, L2 ${param.L2} and D7 ${param.D7}`;
		}
		// step-6 : any logs
		rGeome.logstr += `ring_guidance: Dmax ${ffix(param.D1 + 2 * R4)} mm\n`;
		// step-7 : drawing of the figures
		// figTop
		//figTop.addMain(contourCircle(0, 0, R2));
		const [outerLog, outerCtr, stepA1] = ctrGuidanceOuter(param);
		rGeome.logstr += outerLog;
		figTop.addMain(outerCtr);
		figTop.addMain(contourCircle(0, 0, R6));
		for (let i = 0; i < param.N2; i++) {
			figTop.addMain(contourCircle(R6 + param.L2, 0, R7).rotate(0, 0, i * stepA2));
		}
		for (let i = 0; i < param.N1; i++) {
			figTop.addMain(contourCircle(R1, 0, R3).rotate(0, 0, i * stepA1));
		}
		// figSection
		const rect = function (xbl: number, ybl: number, width: number, height: number): tContour {
			const rCtr = contour(xbl, ybl)
				.addSegStrokeR(width, 0)
				.addSegStrokeR(0, height)
				.addSegStrokeR(-width, 0)
				.closeSegStroke();
			return rCtr;
		};
		const w1 = R1 - R6 + R4;
		figSection.addMain(rect(R6, 0, w1, param.T1));
		figSection.addMain(rect(-R6 - w1, 0, w1, param.T1));
		figSection.addSecond(rect(R1 - R3, 0, 2 * R3, param.T1));
		figSection.addSecond(rect(-R1 - R3, 0, 2 * R3, param.T1));
		const px2 = R6 + param.L2;
		figSection.addSecond(rect(px2 - R7, 0, 2 * R7, param.T1));
		figSection.addSecond(rect(-px2 - R7, 0, 2 * R7, param.T1));
		// final figure list
		rGeome.fig = {
			faceTop: figTop,
			faceSection: figSection
		};
		// step-8 : recipes of the 3D construction
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_top`,
					face: `${designName}_faceTop`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.T1,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eIdentity,
					inList: [`subpax_${designName}_top`]
				}
			]
		};
		// step-9 : optional sub-design parameter export
		// sub-design
		rGeome.sub = {};
		// step-10 : final log message
		// finalize
		rGeome.logstr += 'ring_guidance drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const ringGuidanceDef: tPageDef = {
	pTitle: 'Ring-guidance',
	pDescription: 'The guidance of the gear-ring for the heliostat azimuth',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { ringGuidanceDef };
