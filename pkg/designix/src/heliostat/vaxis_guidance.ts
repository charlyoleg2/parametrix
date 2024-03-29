// vaxis_guidance.ts
// guidance-part for supporting the V-Axis of the heliostat

// step-1 : import from geometrix
import type {
	//tContour,
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
	//contour,
	contourCircle,
	ctrRectangle,
	figure,
	//degToRad,
	//radToDeg,
	ffix,
	pNumber,
	//pCheckbox,
	pDropdown,
	pSectionSeparator,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

import { ctrGuidanceOuter, ctrGuidanceInner } from './common_spring_and_petal'; // externalized contour

// step-2 : definition of the parameters and more (part-name, svg associated to each parameter, simulation parameters)
const pDef: tParamDef = {
	partName: 'vaxis_guidance',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 700, 100, 2500, 1),
		pNumber('N1', 'legs', 6, 1, 24, 1),
		pNumber('D2', 'mm', 600, 100, 2000, 1),
		pSectionSeparator('leg details'),
		pNumber('D3', 'mm', 30, 1, 200, 1),
		pNumber('D4', 'mm', 50, 1, 200, 1),
		pNumber('L1', 'mm', 90, 1, 900, 1),
		pNumber('R5', 'mm', 20, 0, 500, 1),
		pSectionSeparator('inner'),
		pNumber('D6', 'mm', 540, 1, 1000, 1),
		pNumber('N2', 'springs', 6, 1, 24, 1),
		pDropdown('orientation', ['ccw', 'cw', 'alt']),
		pNumber('R7', 'mm', 10, 0, 100, 1),
		pNumber('L2', 'mm', 100, 1, 900, 1),
		pNumber('E2', 'mm', 50, 1, 200, 1),
		pSectionSeparator('spring'),
		pNumber('SA1', 'degree', 0, -45, 45, 1),
		pNumber('SE1', 'mm', 10, 1, 200, 1),
		pNumber('SD1', 'mm', 20, 1, 200, 1),
		pNumber('SD2', 'mm', 10, 1, 200, 1),
		pNumber('SN1', 'loops', 2, 0, 8, 1),
		pNumber('SL1', 'mm', 40, 1, 900, 1),
		pNumber('SL2', 'mm', 70, 0, 900, 1),
		pDropdown('Send', ['round', 'pike']),
		pSectionSeparator('thickness'),
		pNumber('T1', 'mm', 10, 1, 200, 1),
		pNumber('Dvaxis', 'mm', 260, 5, 1000, 1)
	],
	paramSvg: {
		D1: 'vaxis_guidance_top.svg',
		N1: 'vaxis_guidance_top.svg',
		D2: 'vaxis_guidance_top.svg',
		D3: 'vaxis_guidance_top.svg',
		D4: 'vaxis_guidance_top.svg',
		L1: 'vaxis_guidance_top.svg',
		R5: 'vaxis_guidance_top.svg',
		D6: 'vaxis_guidance_top.svg',
		N2: 'vaxis_guidance_top.svg',
		orientation: 'vaxis_guidance_top.svg',
		R7: 'vaxis_guidance_top.svg',
		L2: 'vaxis_guidance_spring.svg',
		E2: 'vaxis_guidance_spring.svg',
		SA1: 'vaxis_guidance_spring.svg',
		SE1: 'vaxis_guidance_spring.svg',
		SD1: 'vaxis_guidance_spring.svg',
		SD2: 'vaxis_guidance_spring.svg',
		SN1: 'vaxis_guidance_spring.svg',
		SL1: 'vaxis_guidance_spring.svg',
		SL2: 'vaxis_guidance_spring.svg',
		Send: 'vaxis_guidance_spring.svg',
		T1: 'vaxis_guidance_top.svg',
		Dvaxis: 'vaxis_guidance_top.svg'
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
		const R2 = param.D2 / 2;
		const R3 = param.D3 / 2;
		const R4 = param.D4 / 2;
		const R6 = param.D6 / 2;
		// step-5 : checks on the parameter values
		if (R2 < R6) {
			throw `err466: D6 ${param.D6} is too large compare to D2 ${param.D2}`;
		}
		// step-6 : any logs
		rGeome.logstr += `vaxis_guidance: Dmax ${ffix(param.D1 + 2 * R4)} mm\n`;
		// step-7 : drawing of the figures
		// figTop
		//figTop.addMain(contourCircle(0, 0, R2));
		const [outerLog, outerCtr, stepA1] = ctrGuidanceOuter(param);
		rGeome.logstr += outerLog;
		figTop.addMain(outerCtr);
		for (let i = 0; i < param.N1; i++) {
			figTop.addMain(contourCircle(R1, 0, R3).rotate(0, 0, i * stepA1));
		}
		//figTop.addMain(contourCircle(0, 0, R6));
		const [innerLog, innerCtr] = ctrGuidanceInner(param);
		rGeome.logstr += innerLog;
		figTop.addMain(innerCtr);
		figTop.addSecond(contourCircle(0, 0, param.Dvaxis / 2));
		// figSection
		const w1 = R1 - R6 + R4;
		figSection.addMain(ctrRectangle(R6, 0, w1, param.T1));
		figSection.addMain(ctrRectangle(-R6 - w1, 0, w1, param.T1));
		figSection.addSecond(ctrRectangle(R1 - R3, 0, 2 * R3, param.T1));
		figSection.addSecond(ctrRectangle(-R1 - R3, 0, 2 * R3, param.T1));
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
		rGeome.logstr += 'vaxis_guidance drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const vaxisGuidanceDef: tPageDef = {
	pTitle: 'Vaxis-guidance',
	pDescription: 'The guidance of the V-Axis for the heliostat azimuth',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { vaxisGuidanceDef };
