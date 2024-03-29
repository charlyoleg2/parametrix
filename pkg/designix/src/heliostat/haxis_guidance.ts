// haxis_guidance.ts
// guidance-part for supporting the H-Axis of the heliostat

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
	contour,
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

//import { ctrSpring } from './common_spring_and_petal'; // externalized contour

// step-2 : definition of the parameters and more (part-name, svg associated to each parameter, simulation parameters)
const pDef: tParamDef = {
	partName: 'haxis_guidance',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D5', 'mm', 600, 1, 2000, 1),
		pNumber('D8', 'mm', 1000, 1, 2000, 1),
		pSectionSeparator('outer details'),
		pNumber('E5', 'mm', 1, 0, 200, 1),
		pNumber('E8', 'mm', 20, 1, 200, 1),
		pNumber('L5', 'mm', 20, 1, 200, 1),
		pNumber('R9', 'mm', 20, 0, 500, 1),
		pSectionSeparator('inner spring'),
		pNumber('SA1', 'degree', 0, -45, 45, 1),
		pNumber('SE1', 'mm', 2, 0.1, 100, 0.1),
		pNumber('SD1', 'mm', 20, 1, 200, 1),
		pNumber('SD2', 'mm', 10, 1, 200, 1),
		pNumber('SN1', 'springs', 3, 1, 24, 1),
		pNumber('SL1', 'mm', 10, 0, 500, 1),
		pNumber('SL2', 'mm', 10, 0, 500, 1),
		pDropdown('Send', ['pike', 'round']),
		pSectionSeparator('thickness'),
		pNumber('L4', 'mm', 400, 1, 2000, 1)
	],
	paramSvg: {
		D5: 'haxis_guidance_outer.svg',
		D8: 'haxis_guidance_outer.svg',
		E5: 'haxis_guidance_outer.svg',
		E8: 'haxis_guidance_outer.svg',
		L5: 'haxis_guidance_outer.svg',
		R9: 'haxis_guidance_outer.svg',
		SA1: 'haxis_guidance_spring.svg',
		SE1: 'haxis_guidance_spring.svg',
		SD1: 'haxis_guidance_spring.svg',
		SD2: 'haxis_guidance_spring.svg',
		SN1: 'haxis_guidance_spring.svg',
		SL1: 'haxis_guidance_spring.svg',
		SL2: 'haxis_guidance_spring.svg',
		Send: 'haxis_guidance_spring.svg',
		L4: 'haxis_guidance_outer.svg'
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
	const figProfile = figure();
	const figSide = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const R5 = param.D5 / 2;
		const R8 = param.D8 / 2;
		const SR1 = param.SD1 / 2;
		const SR2 = param.SD2 / 2;
		const Rinner = R5 + param.E5;
		const Rinner2 = R8 - param.E8;
		const aLeg = 2 * Math.asin(param.L5 / (2 * Rinner));
		// step-5 : checks on the parameter values
		if (Rinner + SR1 + param.SE1 > Rinner2) {
			throw `err411: D8 ${param.D8} is too small compare to D5 ${param.D5}, E5 ${param.D5}, E8 ${param.E8}`;
		}
		if ((2 * Math.PI) / 3 - 2 * aLeg < param.R9 / Rinner2) {
			throw `err412: L5 ${param.L5} is too large compare to R9 ${param.R9}`;
		}
		if (param.SL2 < SR2 + param.SE1) {
			throw `err421: SL2 ${param.SL2} is too small compare to SD2 ${param.SD2} and SE1 ${param.SE1}`;
		}
		// step-6 : any logs
		rGeome.logstr += `haxis_guidance: Dinner ${ffix(2 * Rinner)} mm\n`;
		// step-7 : drawing of the figures
		// figProfile
		figProfile.addSecond(contourCircle(0, 0, R5));
		figProfile.addSecond(contourCircle(0, 0, R8));
		const ctrProfile = contour(0, Rinner)
			.addSegStrokeAP(Math.PI / 2 - aLeg, Rinner)
			.addSegStrokeAP(Math.PI / 2 - aLeg, Rinner2)
			.addCornerRounded(param.R9)
			.addPointAP(-Math.PI / 6 + aLeg, Rinner2)
			.addSegArc(Rinner2, false, false)
			.addCornerRounded(param.R9)
			.addSegStrokeAP(-Math.PI / 6 + aLeg, Rinner)
			.addSegStrokeAP(-Math.PI / 6, Rinner)
			.addSegStrokeAP(-Math.PI / 6, R8)
			.addPointAP(Math.PI / 2, R8)
			.addSegArc(R8, false, true)
			.closeSegStroke();
		figProfile.addMain(ctrProfile);
		//const [outerLog, outerCtr, stepA1] = ctrSpring(param);
		//rGeome.logstr += outerLog;
		//figProfile.addMain(outerCtr);
		// figSide
		const R8plus = R8 * Math.sin(Math.PI / 6);
		figSide.addMain(ctrRectangle(0, -R8plus, param.L4, R8 + R8plus));
		figSide.addSecond(ctrRectangle(0, -R8, param.L4, 2 * R8));
		figSide.addSecond(ctrRectangle(0, -R5, param.L4, 2 * R5));
		// final figure list
		rGeome.fig = {
			faceProfile: figProfile,
			faceSide: figSide
		};
		// step-8 : recipes of the 3D construction
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_profile`,
					face: `${designName}_faceProfile`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.L4,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eIdentity,
					inList: [`subpax_${designName}_profile`]
				}
			]
		};
		// step-9 : optional sub-design parameter export
		// sub-design
		rGeome.sub = {};
		// step-10 : final log message
		// finalize
		rGeome.logstr += 'haxis_guidance drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const haxisGuidanceDef: tPageDef = {
	pTitle: 'Haxis-guidance',
	pDescription: 'The guidance of the H-Axis for the heliostat inclination',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { haxisGuidanceDef };
