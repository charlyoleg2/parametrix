// vaxis_guidance.ts
// guidance-part for supporting the V-Axis of the heliostat

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
	point,
	//ShapePoint,
	contour,
	contourCircle,
	figure,
	degToRad,
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
		pSectionSeparator('inner spring'),
		pNumber('D6', 'mm', 540, 1, 1000, 1),
		pNumber('N2', 'springs', 6, 1, 24, 1),
		pNumber('R7', 'mm', 10, 0, 100, 1),
		pDropdown('orientation', ['cw', 'ccw', 'alt']),
		pNumber('a1', 'degree', 90, 45, 135, 1),
		pNumber('E2', 'mm', 50, 1, 200, 1),
		pNumber('E1', 'mm', 10, 1, 200, 1),
		pNumber('W1', 'mm', 50, 1, 200, 1),
		pNumber('L2', 'mm', 100, 1, 900, 1),
		pNumber('L3', 'mm', 60, 1, 900, 1),
		pNumber('N3', 'loops', 2, 0, 8, 1),
		pNumber('L4', 'mm', 100, 1, 900, 1),
		pSectionSeparator('thickness'),
		pNumber('T1', 'mm', 10, 1, 200, 1)
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
		R7: 'vaxis_guidance_top.svg',
		orientation: 'vaxis_guidance_top.svg',
		a1: 'vaxis_guidance_spring.svg',
		E2: 'vaxis_guidance_top.svg',
		E1: 'vaxis_guidance_spring.svg',
		W1: 'vaxis_guidance_spring.svg',
		L2: 'vaxis_guidance_spring.svg',
		L3: 'vaxis_guidance_spring.svg',
		N3: 'vaxis_guidance_spring.svg',
		L4: 'vaxis_guidance_spring.svg',
		T1: 'vaxis_guidance_top.svg'
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
		// petal-leg
		const stepA1 = (2 * Math.PI) / param.N1;
		const L12 = param.L1 / 2;
		const L3b = Math.sqrt(R2 ** 2 - L12 ** 2);
		const aAOD = Math.asin(L12 / R2);
		const L3 = R1 - L3b;
		const aABD = Math.atan2(L12, L3);
		const lBD = Math.sqrt(L12 ** 2 + L3 ** 2);
		const aDBC = Math.acos(R4 / lBD);
		const aABC = aABD + aDBC;
		const larcA2 = (stepA1 - 2 * aAOD) / 2;
		// spring base
		const stepA2 = (2 * Math.PI) / param.N2;
		const E22 = param.E2 / 2;
		const aE2 = 2 * Math.asin(E22 / R6);
		const iarcA2 = (stepA2 - aE2) / 2;
		const a1 = degToRad(param.a1);
		// step-5 : checks on the parameter values
		if (larcA2 < 0) {
			throw `err464: N1 ${param.N1} is too large compare to D2 ${param.D2}, L1 ${param.L1}`;
		}
		if (R1 < R2) {
			throw `err465: D2 ${param.D2} is too large compare to D1 ${param.D1}`;
		}
		if (R2 < R6) {
			throw `err466: D6 ${param.D6} is too large compare to D2 ${param.D2}`;
		}
		// step-6 : any logs
		rGeome.logstr += `vaxis_guidance: Dmax ${ffix(param.D1 + 2 * R4)} mm\n`;
		// step-7 : drawing of the figures
		// figTop
		//figTop.addMain(contourCircle(0, 0, R2));
		const ctrOuter = contour(L3b, -L12);
		const pO = point(0, 0);
		const pA = point(R2, 0);
		const pB = point(R1, 0);
		const pE = point(R1 - R4, 0);
		const pC = pE.rotate(pB, aABC);
		const pA2 = pA.rotate(pO, aAOD + larcA2);
		const pA3 = pA.rotate(pO, stepA1 - aAOD);
		const ctrOuterPartial = contour(L3b, -L12)
			.addCornerRounded(param.R5)
			.addSegStrokeA(pC.cx, pC.cy)
			.addPointA(R1 + R4, 0)
			.addPointA(pC.cx, -pC.cy)
			.addSegArc2()
			.addSegStrokeA(L3b, L12)
			.addCornerRounded(param.R5)
			.addPointA(pA2.cx, pA2.cy)
			.addPointA(pA3.cx, pA3.cy)
			.addSegArc2();
		for (let i = 0; i < param.N1; i++) {
			ctrOuter.addPartial(ctrOuterPartial.rotate(0, 0, i * stepA1));
		}
		figTop.addMain(ctrOuter);
		for (let i = 0; i < param.N1; i++) {
			figTop.addMain(contourCircle(R1, 0, R3).rotate(0, 0, i * stepA1));
		}
		//figTop.addMain(contourCircle(0, 0, R6));
		const ctrInner = contour(R6, 0);
		const pF = point(0, -R6);
		const pG = pF.rotate(pO, -aE2);
		const pH = pF.translatePolar(a1, param.L2);
		const pI = pH.translatePolar(a1 + Math.PI / 2, param.E1);
		const pH2 = pF.translatePolar(a1, param.L2 - param.L3 + param.L4);
		const pI2 = pH2.translatePolar(a1 + Math.PI / 2, param.E1);
		const ctrSpring = contour(pG.cx, pG.cy).addSegStrokeA(pI.cx, pI.cy);
		if (param.N3 > 0) {
			ctrSpring.addSegStrokeA(pH.cx, pH.cy).addSegStrokeA(pF.cx, pF.cy);
		} else {
			ctrSpring
				.addSegStrokeA(pI2.cx, pI2.cy)
				.addSegStrokeA(pH2.cx, pH2.cy)
				.addSegStrokeA(pF.cx, pF.cy);
		}
		for (let i = 0; i < param.N2; i++) {
			ctrInner
				.addPointAP(i * stepA2 + iarcA2, R6)
				.addPointAP(i * stepA2 + 2 * iarcA2, R6)
				.addSegArc2()
				.addCornerRounded(param.R7)
				.addPartial(ctrSpring.rotate(0, 0, Math.PI / 2 + (i + 1) * stepA2))
				.addCornerRounded(param.R7);
		}
		figTop.addMain(ctrInner);
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
