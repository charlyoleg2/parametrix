// common_spring_and_petal.ts

import type { tParamVal, tContour } from 'geometrix';
import {
	point,
	contour,
	//degToRad,
	radToDeg,
	ffix
} from 'geometrix';

// used in vaxis_holder
function ctrHolderPetal(param: tParamVal): [string, tContour, number[]] {
	let rLog = '';
	// step-4 : some preparation calculation
	const R1 = param.PHD1 / 2;
	const R5 = param.PHD5 / 2;
	const petalA1 = 2 * Math.asin(param.PHR4 / R1);
	const petalA2 = 2 * Math.asin(param.PHL2 / (2 * R5));
	const hollowA = (2 * Math.PI) / param.PHN1 - petalA2;
	const lCD = param.PHL2 / 2;
	const lAD = Math.sqrt(R5 ** 2 - lCD ** 2) - R1;
	const lAC = Math.sqrt(lCD ** 2 + lAD ** 2);
	const aDAC = Math.acos(lAD / lAC);
	const aCAB = Math.acos(param.PHR4 / lAC);
	const aTan = Math.PI - aDAC - aCAB;
	// step-5 : checks on the parameter values
	if (R5 < R1 + param.PHR4) {
		throw `err211: PHD5 ${param.PHD5} too small compare to PHD1 ${param.PHD1} or PHR4 ${param.PHR4}`;
	}
	if (hollowA < petalA2) {
		throw `err212: PHL2 ${param.PHL2} too large compare to PHN1 ${param.PHN1}`;
	}
	if (param.PHD3 > 2 * param.PHR4) {
		throw `err213: PHD3 ${param.PHD3} too large compare to PHR4 ${param.PHR4}`;
	}
	if (aTan > Math.PI / 2 - petalA1) {
		rLog += `warn345: PHL2 is quiet small ${ffix(param.PHL2)} mm\n`;
	}
	// step-6 : any logs
	rLog += `petal angle: ${ffix(radToDeg(petalA2))} degree\n`;
	rLog += `hollow angle: ${ffix(radToDeg(hollowA))} degree\n`;
	// step-7 : drawing of the figures
	// figPetal
	const p0 = point(0, 0);
	const p1 = point(R5, 0);
	const p2 = p1.rotate(p0, -petalA2 / 2);
	const p10 = point(R1, 0);
	const p11 = point(R1 - param.PHR4, 0);
	//const p12 = p11.rotate(p10, Math.PI / 2 - petalA1);
	//const p13 = p11.rotate(p10, -Math.PI / 2 + petalA1);
	const p12 = p11.rotate(p10, aTan);
	const p13 = p11.rotate(p10, -aTan);
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
	const rCtr = contour(p2.cx, p2.cy);
	const petalAngles = [...Array(param.PHN1).keys()].map((i) => i * (petalA2 + hollowA));
	for (const rota of petalAngles) {
		rCtr.addPartial(ctrPetalPartial.rotate(0, 0, rota));
	}
	return [rLog, rCtr, petalAngles];
}

// used in ring_guidance and vaxis_guidance
function ctrGuidanceOuter(param: tParamVal): [string, tContour, number] {
	const rLog = '';
	// step-4 : some preparation calculation
	const R1 = param.D1 / 2;
	const R2 = param.D2 / 2;
	const R4 = param.D4 / 2;
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
	// step-5 : checks on the parameter values
	if (larcA2 < 0) {
		throw `err464: N1 ${param.N1} is too large compare to D2 ${param.D2}, L1 ${param.L1}`;
	}
	if (R1 < R2) {
		throw `err465: D2 ${param.D2} is too large compare to D1 ${param.D1}`;
	}
	// step-6 : any logs
	// step-7 : drawing of the figures
	const rCtr = contour(L3b, -L12);
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
		rCtr.addPartial(ctrOuterPartial.rotate(0, 0, i * stepA1));
	}
	return [rLog, rCtr, stepA1];
}

export { ctrHolderPetal, ctrGuidanceOuter };
