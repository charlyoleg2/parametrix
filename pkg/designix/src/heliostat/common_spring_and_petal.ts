// common_spring_and_petal.ts

import type { tParamVal, tContour } from 'geometrix';
import { point, contour, degToRad, radToDeg, ffix } from 'geometrix';

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

// used invaxis_guidance
function ctrGuidanceInner(param: tParamVal): [string, tContour] {
	const rLog = '';
	// step-4 : some preparation calculation
	const R6 = param.D6 / 2;
	// spring base
	const stepA2 = (2 * Math.PI) / param.N2;
	const E22 = param.E2 / 2;
	const aE2 = 2 * Math.asin(E22 / R6);
	const iarcA2 = (stepA2 - aE2) / 2;
	const a1Plus = param.N2 < 3 ? 0 : Math.PI / (2 * param.N2);
	const a1 = Math.PI / 2 + a1Plus + degToRad(param.a1);
	// step-5 : checks on the parameter values
	if (iarcA2 < 0) {
		throw `err564: N2 ${param.N2} is too large compare to D6 ${param.D6}, E2 ${param.E2}`;
	}
	// step-6 : any logs
	// step-7 : drawing of the figures
	//figTop.addMain(contourCircle(0, 0, R6));
	const rCtr = contour(R6, 0);
	const pF = point(0, -R6);
	const pO = point(0, 0);
	const pG = pF.rotate(pO, -aE2);
	const pH = pF.translatePolar(a1, param.L2);
	const pI = pH.translatePolar(a1 + Math.PI / 2, param.E1);
	const pH2 = pF.translatePolar(a1, param.L2 + param.L4);
	const pI2 = pH2.translatePolar(a1 + Math.PI / 2, param.E1);
	const ctrSpring = contour(pG.cx, pG.cy).addSegStrokeA(pI.cx, pI.cy);
	if (param.N3 > 0) {
		//ctrSpring.addSegStrokeA(pH.cx, pH.cy).addSegStrokeA(pF.cx, pF.cy);
		let pK1 = pI;
		const W12 = param.W1 / 2;
		const E1W12 = param.E1 + W12;
		for (let i = 0; i < param.N3; i++) {
			const pK1b = pK1.translatePolar(a1 - Math.PI / 2, E1W12);
			const pK2 = pK1b.translatePolar(a1, E1W12);
			const pK3 = pK1.translatePolar(a1 - Math.PI / 2, 2 * E1W12);
			const pK4 = pK3.translatePolar(a1 + Math.PI, param.L3);
			const pK4b = pK4.translatePolar(a1 - Math.PI / 2, W12);
			const pK5 = pK4b.translatePolar(a1 + Math.PI, W12);
			const pK6 = pK4.translatePolar(a1 - Math.PI / 2, 2 * W12);
			let L4end = 0;
			if (i === param.N3 - 1) {
				L4end = param.L4;
			}
			const pK7 = pK6.translatePolar(a1, param.L3 + L4end);
			ctrSpring
				.addPointA(pK2.cx, pK2.cy)
				.addPointA(pK3.cx, pK3.cy)
				.addSegArc2()
				.addSegStrokeA(pK4.cx, pK4.cy)
				.addPointA(pK5.cx, pK5.cy)
				.addPointA(pK6.cx, pK6.cy)
				.addSegArc2()
				.addSegStrokeA(pK7.cx, pK7.cy);
			pK1 = pK7;
		}
		const pK8 = pK1.translatePolar(a1 - Math.PI / 2, param.E1);
		ctrSpring.addSegStrokeA(pK8.cx, pK8.cy);
		pK1 = pK8;
		for (let i = 0; i < param.N3; i++) {
			let L4end = 0;
			if (i === 0) {
				L4end = param.L4;
			}
			const pK2 = pK1.translatePolar(a1 + Math.PI, param.L3 + L4end);
			const pK2b = pK2.translatePolar(a1 + Math.PI / 2, E1W12);
			const pK3 = pK2b.translatePolar(a1 + Math.PI, E1W12);
			const pK4 = pK2.translatePolar(a1 + Math.PI / 2, 2 * E1W12);
			const pK5 = pK4.translatePolar(a1, param.L3);
			const pK5b = pK5.translatePolar(a1 + Math.PI / 2, W12);
			const pK6 = pK5b.translatePolar(a1, W12);
			const pK7 = pK5.translatePolar(a1 + Math.PI / 2, 2 * W12);
			ctrSpring
				.addSegStrokeA(pK2.cx, pK2.cy)
				.addPointA(pK3.cx, pK3.cy)
				.addPointA(pK4.cx, pK4.cy)
				.addSegArc2()
				.addSegStrokeA(pK5.cx, pK5.cy)
				.addPointA(pK6.cx, pK6.cy)
				.addPointA(pK7.cx, pK7.cy)
				.addSegArc2();
			pK1 = pK7;
		}
	} else {
		ctrSpring.addSegStrokeA(pI2.cx, pI2.cy).addSegStrokeA(pH2.cx, pH2.cy);
	}
	ctrSpring.addSegStrokeA(pF.cx, pF.cy);
	for (let i = 0; i < param.N2; i++) {
		rCtr.addPointAP(i * stepA2 + iarcA2, R6)
			.addPointAP(i * stepA2 + 2 * iarcA2, R6)
			.addSegArc2()
			.addCornerRounded(param.R7)
			.addPartial(ctrSpring.rotate(0, 0, Math.PI / 2 + (i + 1) * stepA2))
			.addCornerRounded(param.R7);
	}
	return [rLog, rCtr];
}

export { ctrHolderPetal, ctrGuidanceOuter, ctrGuidanceInner };
