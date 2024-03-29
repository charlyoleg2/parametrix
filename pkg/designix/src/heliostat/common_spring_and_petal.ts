// common_spring_and_petal.ts

import type { tParamVal, tContour } from 'geometrix';
import { point, contour, degToRad, radToDeg, ffix, Contour } from 'geometrix';

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

// used in haxis_guidance
function ctrSpring(param: tParamVal, startOuter: boolean): [string, Contour] {
	let rLog = '';
	// step-4 : some preparation calculation
	const SR2 = param.SD2 / 2;
	const SR2l = SR2 + param.SE1;
	const SD2l = 2 * SR2l;
	let ticCCW = false;
	let ticR = -SR2;
	let tocR = -SR2l;
	if (startOuter) {
		ticCCW = true;
		ticR = SR2l;
		tocR = SR2;
	}
	// step-5 : checks on the parameter values
	if (param.SL2 < SR2l) {
		throw `err421: SL2 ${param.SL2} is too small compare to SD2 ${param.SD2} and SE1 ${param.SE1}`;
	}
	// step-6 : any logs
	rLog += `info309: spring height: ${ffix(param.SL1 + SD2l)} length: ${ffix(param.SN1 * 2 * (param.SD2 + param.SE1))}\n`;
	// step-7 : drawing of the figures
	const rCtr = contour(0, 0);
	for (let i = 0; i < param.SN1; i++) {
		rCtr.addSegStrokeR(0, -param.SL1)
			.addPointR(2 * ticR, 0)
			.addSegArc(Math.abs(ticR), false, ticCCW);
		if (i < param.SN1 - 1) {
			// last turn
			rCtr.addSegStrokeR(0, param.SL1)
				.addPointR(2 * tocR, 0)
				.addSegArc(Math.abs(tocR), false, !ticCCW);
		} else if (param.Send === 1) {
			// pike
			rCtr.addSegStrokeR(0, param.SL2);
		} else {
			// round
			rCtr.addSegStrokeR(0, param.SL2 - SR2l)
				.addPointR(2 * tocR, 0)
				.addSegArc(Math.abs(tocR), false, !ticCCW);
		}
	}
	if (param.Send === 1) {
		// pike
		rCtr.addSegStrokeR(-param.SE1, 0);
	} else {
		// round
		rCtr.addSegStrokeR(param.SE1, 0);
	}
	for (let i = 0; i < param.SN1; i++) {
		if (i > 0) {
			rCtr.addPointR(-2 * ticR, 0)
				.addSegArc(Math.abs(ticR), false, ticCCW)
				.addSegStrokeR(0, -param.SL1);
		} else if (param.Send === 1) {
			// pike
			rCtr.addSegStrokeR(0, -param.SL2);
		} else {
			// round
			rCtr.addPointR(-2 * ticR, 0)
				.addSegArc(Math.abs(ticR), false, ticCCW)
				.addSegStrokeR(0, -param.SL2 + SR2l);
		}
		rCtr.addPointR(-2 * tocR, 0)
			.addSegArc(Math.abs(tocR), false, !ticCCW)
			.addSegStrokeR(0, param.SL1);
	}
	return [rLog, rCtr];
}

// used in vaxis_guidance
function ctrGuidanceInner(param: tParamVal): [string, tContour] {
	let rLog = '';
	// step-4 : some preparation calculation
	const R6 = param.D6 / 2;
	// spring base
	const stepA2 = (2 * Math.PI) / param.N2;
	const E22 = param.E2 / 2;
	const aE2 = 2 * Math.asin(E22 / R6);
	const iarcA2 = (stepA2 - aE2) / 2;
	const a1Plus = param.N2 < 3 ? 0 : Math.PI / param.N2;
	const ar1 = a1Plus + degToRad(param.SA1);
	const ab1 = Math.PI / 2 - ar1;
	const ab2 = -Math.PI / 2 + ar1;
	// spring top
	const SR1 = param.SD1 / 2;
	// step-5 : checks on the parameter values
	if (iarcA2 < 0) {
		throw `err564: N2 ${param.N2} is too large compare to D6 ${param.D6}, E2 ${param.E2}`;
	}
	if (param.orientation === 2 && param.N2 % 2 === 1) {
		throw `err565: N2 ${param.N2} is odd and orientation is alt`;
	}
	// step-6 : any logs
	// step-7 : drawing of the figures
	//figTop.addMain(contourCircle(0, 0, R6));
	const [spring1Log, spring1Ctr] = ctrSpring(param, false);
	const [, spring2Ctr] = ctrSpring(param, true);
	rLog += spring1Log;
	const pF = point(0, -R6);
	const pO = point(0, 0);
	const pG = pF.rotate(pO, aE2);
	const pH = pF.translate(0, param.L2);
	const pIc = pH.translate(-SR1, 0);
	const pJ = pIc.translate(0, SR1);
	//const pK = pJ.rotate(pIc, ab1);
	const pM = pIc.translate(0, SR1 + param.SE1);
	const pL = pM.rotate(pIc, ab1);
	const pN = pH.translate(0, SR1 + param.SE1).translate(param.SE1, 0);
	// orientation-2
	const pG2 = pF.rotate(pO, -aE2);
	const pIc2 = pH.translate(SR1, 0);
	const pJ2 = pIc2.translate(0, SR1);
	const pK2 = pJ2.rotate(pIc2, ab2);
	const pM2 = pIc2.translate(0, SR1 + param.SE1);
	//const pL2 = pM2.rotate(pIc2, ab2);
	const pN2 = pH.translate(0, SR1 + param.SE1).translate(-param.SE1, 0);
	// ctrSpringBase1
	const ctrSpringBase1 = contour(pG.cx, pG.cy)
		.addSegStrokeA(pN.cx, pN.cy)
		.addSegStrokeA(pM.cx, pM.cy);
	const ctrSpringBase1b = contour(pM.cx, pM.cy)
		.addPointA(pL.cx, pL.cy)
		.addSegArc(SR1 + param.SE1, false, true);
	//ctrSpringBase1b.addSegStrokeA(pK.cx, pK.cy);
	ctrSpringBase1b.addPartial(spring1Ctr.rotate(0, 0, -ar1).translate(pL.cx, pL.cy));
	ctrSpringBase1b
		.addPointA(pJ.cx, pJ.cy)
		.addPointA(pH.cx, pH.cy)
		.addSegArc2()
		.addSegStrokeA(pF.cx, pF.cy);
	ctrSpringBase1.addPartial(ctrSpringBase1b);
	// ctrSpringBase2
	const ctrSpringBase2a = contour(pF.cx, pF.cy)
		.addSegStrokeA(pH.cx, pH.cy)
		.addPointA(pJ2.cx, pJ2.cy)
		.addPointA(pK2.cx, pK2.cy)
		.addSegArc2();
	//ctrSpringBase2a.addSegStrokeA(pL2.cx, pL2.cy);
	ctrSpringBase2a.addPartial(spring2Ctr.rotate(0, 0, ar1).translate(pK2.cx, pK2.cy));
	ctrSpringBase2a.addPointA(pM2.cx, pM2.cy).addSegArc(SR1 + param.SE1, false, true);
	const ctrSpringBase2b = contour(pM2.cx, pM2.cy)
		.addSegStrokeA(pN2.cx, pN2.cy)
		.addSegStrokeA(pG2.cx, pG2.cy);
	const ctrSpringBase2 = contour(pF.cx, pF.cy)
		.addPartial(ctrSpringBase2a)
		.addPartial(ctrSpringBase2b);
	const rCtr = contour(R6, 0);
	if (param.orientation === 2) {
		for (let i = 0; i < param.N2 / 2; i++) {
			rCtr.addPointAP(-2 * i * stepA2 - 2 * iarcA2, R6)
				.addPointAP(-2 * i * stepA2 - 4 * iarcA2, R6)
				.addSegArc2();
			rCtr.addCornerRounded(param.R7);
			const ar1b = Math.PI / 2 - (2 * i + 2) * stepA2;
			const ar2a = ar1b + 2 * aE2;
			rCtr.addPartial(ctrSpringBase2a.rotate(0, 0, ar2a));
			const ctrSB1 = ctrSpringBase1b.rotate(0, 0, ar1b);
			const pt1 = ctrSB1.getFirstPoint();
			rCtr.addCornerRounded(param.R7);
			rCtr.addSegStrokeA(pt1.cx, pt1.cy);
			rCtr.addCornerRounded(param.R7);
			rCtr.addPartial(ctrSB1);
			rCtr.addCornerRounded(param.R7);
		}
	} else {
		for (let i = 0; i < param.N2; i++) {
			rCtr.addPointAP(-i * stepA2 - iarcA2, R6)
				.addPointAP(-i * stepA2 - 2 * iarcA2, R6)
				.addSegArc2()
				.addCornerRounded(param.R7);
			if (param.orientation === 0) {
				rCtr.addPartial(ctrSpringBase2.rotate(0, 0, Math.PI / 2 - (i + 1) * stepA2 + aE2));
			} else if (param.orientation === 1) {
				rCtr.addPartial(ctrSpringBase1.rotate(0, 0, Math.PI / 2 - (i + 1) * stepA2));
			}
			rCtr.addCornerRounded(param.R7);
		}
	}
	return [rLog, rCtr];
}

export { ctrHolderPetal, ctrGuidanceOuter, ctrGuidanceInner, ctrSpring };
