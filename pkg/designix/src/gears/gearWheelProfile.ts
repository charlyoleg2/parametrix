// gearWheelProfile.ts

import type { Point, tContour } from 'geometrix';
import {
	contour,
	contourCircle,
	point,
	ShapePoint,
	lcFromLaLbAc,
	aBFromLaLbAa,
	withinZero2Pi,
	withinPiPi,
	radToDeg,
	roundZero,
	ffix
} from 'geometrix';
import type { Involute } from './involute';
import { involute } from './involute';

class GearWheelProfile {
	mod = 1;
	TN = 23;
	as = 1;
	cx = 0;
	cy = 0;
	brr = 50;
	blr = 50;
	ar = 54;
	pr = 53;
	dr = 52;
	br = 51;
	bRound = 1;
	adt = 0.5;
	initAngle = 0;
	axisAngle = 0;
	involArcPairs = 1;
	skinThickness = 0;
	involuteR = involute(0, 0, 50, 0, true);
	involuteL = involute(0, 0, 50, 0, false);
	rud = 0;
	rup = 0;
	rua = 0;
	rwd = 0;
	rwp = 0;
	rwa = 0;
	lud = 0;
	lup = 0;
	lua = 0;
	lwd = 0;
	lwp = 0;
	lwa = 0;
	msg: string;
	initStep = 0;
	constructor() {
		this.mod = 1;
		this.msg = '';
		this.initStep = 0;
	}
	incInitStep(target: number) {
		if (this.initStep + 1 !== target) {
			throw `err834: incInitStep initStep ${this.initStep} and target ${target} are not compatible`;
		}
		this.initStep = target;
	}
	checkInitStep(targetMin: number, msg: string) {
		if (this.initStep < targetMin) {
			throw `err835: checkInitStep for ${msg} initStep ${this.initStep} is too small compare to targetMin ${targetMin}`;
		}
	}
	set1ModuleToothNumber(iMod: number, iTN: number) {
		this.incInitStep(1);
		this.mod = iMod;
		this.TN = iTN;
		this.pr = (this.mod * this.TN) / 2;
		this.as = (2 * Math.PI) / this.TN;
	}
	set2CenterPosition(icx: number, icy: number) {
		this.incInitStep(2);
		this.cx = icx;
		this.cy = icy;
	}
	set3CircleRadius(iah: number, idh: number, ibh: number, ibRound: number) {
		this.incInitStep(3);
		this.ar = this.pr + this.mod * iah;
		this.dr = this.pr - this.mod * idh;
		this.br = this.dr - this.mod * ibh;
		this.bRound = ibRound;
	}
	set4BaseCircles(baseRight: number, baseLeft: number) {
		this.incInitStep(4);
		this.brr = baseRight;
		this.blr = baseLeft;
	}
	set5AddendumThickness(iat: number) {
		this.incInitStep(5);
		this.adt = iat / 100;
	}
	set6Angles(initAng: number, axisAng: number) {
		this.incInitStep(6);
		this.initAngle = initAng;
		this.axisAngle = axisAng;
	}
	set7InvoluteDetails(iInvolArcPairs: number, iSkinThickness: number) {
		this.incInitStep(7);
		this.involArcPairs = iInvolArcPairs;
		this.skinThickness = iSkinThickness;
	}
	getRefCircles(): tContour[] {
		this.checkInitStep(4, 'getRefCircles');
		const rRefCircles = [
			contourCircle(this.cx, this.cy, this.ar, 'Azure'),
			contourCircle(this.cx, this.cy, this.pr, 'Azure'),
			contourCircle(this.cx, this.cy, this.dr, 'Azure'),
			contourCircle(this.cx, this.cy, this.br, 'Azure'),
			contourCircle(this.cx, this.cy, this.brr, 'CornFlowerBlue'),
			contourCircle(this.cx, this.cy, this.blr, 'Crimson')
		];
		return rRefCircles;
	}
	calcInvoluteAngles() {
		this.checkInitStep(4, 'calcInvoluteAngles');
		this.involuteR = involute(this.cx, this.cy, this.brr, 0, true);
		if (this.dr > this.brr) {
			this.rud = this.involuteR.uFromL(this.dr);
		} else {
			this.rud = 0;
		}
		this.rup = this.involuteR.uFromL(this.pr);
		this.rua = this.involuteR.uFromL(this.ar);
		this.rwd = this.involuteR.wFromU(this.rud);
		this.rwp = this.involuteR.wFromU(this.rup);
		this.rwa = this.involuteR.wFromU(this.rua);
		this.involuteL = involute(this.cx, this.cy, this.blr, 0, false);
		if (this.dr > this.blr) {
			this.lud = this.involuteL.uFromL(this.dr);
		} else {
			this.rud = 0;
		}
		this.lup = this.involuteL.uFromL(this.pr);
		this.lua = this.involuteL.uFromL(this.ar);
		this.lwd = this.involuteL.wFromU(this.lud);
		this.lwp = this.involuteL.wFromU(this.lup);
		this.lwa = this.involuteL.wFromU(this.lua);
	}
	checkProfileConditions() {
		const aas = this.as * this.adt;
		const rwpa = this.rwa - this.rwp;
		const lwpa = Math.abs(this.lwa - this.lwp);
		//this.msg += `dbg10_: rwa ${ffix(this.rwa)} rwp ${ffix(this.rwp)}\n`;
		//this.msg += `dbg109: lwa ${ffix(this.lwa)} lwp ${ffix(this.lwp)}\n`;
		//this.msg += `dbg110: aas ${ffix(aas)} rwpa ${ffix(rwpa)} lwpa ${ffix(lwpa)}\n`;
		const aAddendum = aas - rwpa - lwpa;
		if (aAddendum < 0) {
			throw `err554: No remaining Addendum reserve ${ffix(aAddendum)}\n`;
		}
		const ads = this.as * (1 - this.adt);
		const rwpd = this.rwp - this.rwd;
		const lwpd = Math.abs(this.lwp - this.lwd);
		const aDedendum = ads - rwpd - lwpd;
		if (aDedendum < 2 * Math.atan2(this.bRound, this.br)) {
			throw `err555: No remaining Dedendum reserve ${ffix(
				aDedendum
			)} compare to bRound ${ffix(this.bRound)}\n`;
		}
	}
	getToothRef(): tContour {
		const ptnb = 6 * this.involArcPairs;
		const toothID = 0;
		this.checkInitStep(7, 'getProfile');
		this.calcInvoluteAngles();
		const uPeriodR = (this.rua - this.rud) / ptnb;
		const uPeriodL = (this.lua - this.lud) / ptnb;
		const refA = this.initAngle + toothID * this.as;
		const invoR = involute(this.cx, this.cy, this.brr, refA - this.rwp, true);
		const [p1x, p1y] = invoR.ptc(this.rud + 0 * uPeriodR);
		const rCtr = contour(p1x, p1y, 'Gold');
		for (let j = 0; j < ptnb; j++) {
			const [px, py] = invoR.ptc(this.rud + (j + 1) * uPeriodR);
			rCtr.addSegStrokeA(px, py);
		}
		const refAl = refA + this.as * this.adt;
		const invoL = involute(this.cx, this.cy, this.blr, refAl - this.lwp, false);
		for (let j = 0; j < ptnb + 1; j++) {
			const [px, py] = invoL.ptc(this.lud + (ptnb - j) * uPeriodL);
			rCtr.addSegStrokeA(px, py);
		}
		rCtr.closeSegStroke();
		return rCtr;
	}
	getProfile(): tContour {
		this.checkInitStep(7, 'getProfile');
		this.calcInvoluteAngles();
		this.checkProfileConditions();
		const aDiffRd = this.rwd - this.rwp;
		//const aDiffRa = this.rwa - this.rwp;
		const aDiffLd = this.lwd - this.lwp;
		//const aDiffLa = this.lwa - this.lwp;
		const erdr = this.dr > this.brr ? this.dr : this.brr;
		const eldr = this.dr > this.blr ? this.dr : this.blr;
		if (this.bRound > erdr - this.br) {
			throw `err409: getProfile bRound ${ffix(this.bRound)} too large for erdr ${ffix(
				erdr
			)} and br ${ffix(this.br)}`;
		}
		if (this.bRound > eldr - this.br) {
			throw `err408: getProfile bRound ${ffix(this.bRound)} too large for eldr ${ffix(
				eldr
			)} and br ${ffix(this.br)}`;
		}
		const uPeriodR = (this.rua - this.rud) / this.involArcPairs;
		const uPeriodL = (this.lua - this.lud) / this.involArcPairs;
		const center = point(this.cx, this.cy);
		// this first point is equal to the first stroke of the loop.
		// Contour will remove it because last and new points are identical
		const first = center.translatePolar(this.initAngle + aDiffRd, this.br);
		const rProfile = contour(first.cx, first.cy);
		for (let i = 0; i < this.TN; i++) {
			const refA = this.initAngle + i * this.as;
			const ptrb = center.translatePolar(refA + aDiffRd, this.br);
			rProfile.addSegStrokeA(ptrb.cx, ptrb.cy).addCornerRounded(this.bRound);
			const invoR = involute(this.cx, this.cy, this.brr, refA - this.rwp, true);
			//const ptrd = center.translatePolar(refA + aDiffRd, erdr);
			const [px1, py1] = invoR.ptc(this.rud);
			const ta11 = invoR.ptcta(this.rud);
			const ptrd = point(px1, py1).translatePolar(ta11 - Math.PI / 2, this.skinThickness);
			rProfile.addSegStrokeA(ptrd.cx, ptrd.cy);
			//const ptrp = center.translatePolar(refA, this.pr);
			//rProfile.addSegStrokeA(ptrp.cx, ptrp.cy);
			//const ptra = center.translatePolar(refA + aDiffRa, this.ar);
			//rProfile.addSegStrokeA(ptra.cx, ptra.cy);
			for (let j = 0; j < this.involArcPairs; j++) {
				const uu1 = this.rud + j * uPeriodR;
				const [px, py] = invoR.ptc(uu1 + uPeriodR);
				const ta1 = invoR.ptcta(uu1);
				const ta2 = invoR.ptcta(uu1 + uPeriodR) + Math.PI;
				const pn = point(px, py).translatePolar(ta1 - Math.PI / 2, this.skinThickness);
				//rProfile.addSegStrokeA(px, py);
				rProfile.addPointA(pn.cx, pn.cy).addSeg2Arcs(ta1, ta2);
			}
			const refAl = refA + this.as * this.adt;
			const invoL = involute(this.cx, this.cy, this.blr, refAl - this.lwp, false);
			//const ptla = center.translatePolar(refAl + aDiffLa, this.ar);
			const uu2 = this.lud + this.involArcPairs * uPeriodL;
			const [px2, py2] = invoL.ptc(uu2);
			const ta12 = invoL.ptcta(uu2) + Math.PI;
			const ptla = point(px2, py2).translatePolar(ta12 - Math.PI / 2, this.skinThickness);
			rProfile.addSegStrokeA(ptla.cx, ptla.cy);
			//const ptlp = center.translatePolar(refAl, this.pr);
			//rProfile.addSegStrokeA(ptlp.cx, ptlp.cy);
			//const ptld = center.translatePolar(refAl + aDiffLd, eldr);
			//rProfile.addSegStrokeA(ptld.cx, ptld.cy);
			for (let j = 0; j < this.involArcPairs; j++) {
				const uu1 = this.lud + (this.involArcPairs - j) * uPeriodL;
				const [px, py] = invoL.ptc(uu1 - uPeriodL);
				const ta1 = invoL.ptcta(uu1) + Math.PI;
				const ta2 = invoL.ptcta(uu1 - uPeriodL);
				const pn = point(px, py).translatePolar(ta1 - Math.PI / 2, this.skinThickness);
				//rProfile.addSegStrokeA(px, py);
				rProfile.addPointA(pn.cx, pn.cy).addSeg2Arcs(ta1, ta2);
			}
			const ptlb = center.translatePolar(refAl + aDiffLd, this.br);
			rProfile.addSegStrokeA(ptlb.cx, ptlb.cy).addCornerRounded(this.bRound);
		}
		rProfile.closeSegStroke();
		return rProfile;
	}
	getMsg(): string {
		return this.msg;
	}
}

function gwProfile(): GearWheelProfile {
	const rgwp = new GearWheelProfile();
	return rgwp;
}

enum EInvolOpt {
	Optimum = 0,
	BaseCircle1,
	BaseCircle2,
	PressionAngle,
	DisfunctioningTwoCircles
}

// helper functions
function gw2center(
	gw1: GearWheelProfile,
	gw2: GearWheelProfile,
	angleCenterCenter: number,
	addInterAxis: number
): number[] {
	gw1.checkInitStep(1, 'helper.gw2center-1');
	gw2.checkInitStep(1, 'helper.gw2center-2');
	const interAxis = gw1.pr + gw2.pr + addInterAxis;
	const c2x = gw1.cx + interAxis * Math.cos(angleCenterCenter);
	const c2y = gw1.cy + interAxis * Math.sin(angleCenterCenter);
	return [c2x, c2y, interAxis];
}
function baseCircles(
	gw1: GearWheelProfile,
	gw2: GearWheelProfile,
	ibrr1: number,
	iblr1: number,
	ibrr2: number,
	iblr2: number,
	involSym: number,
	involROpt: number,
	involLOpt: number
): number[] {
	gw1.checkInitStep(3, 'helper.baseCircles-1');
	gw2.checkInitStep(3, 'helper.baseCircles-2');
	let brr1 = ibrr1;
	let brr2 = ibrr2;
	let blr1 = iblr1;
	let blr2 = iblr2;
	const involROpt2: EInvolOpt = involROpt as EInvolOpt;
	const involLOpt2: EInvolOpt = involLOpt as EInvolOpt;
	if (involROpt2 === EInvolOpt.Optimum) {
		if (gw2.TN > gw1.TN) {
			brr1 = gw1.dr;
			brr2 = (brr1 * gw2.TN) / gw1.TN;
		} else {
			brr2 = gw2.dr;
			brr1 = (brr2 * gw1.TN) / gw2.TN;
		}
	}
	if (involLOpt2 === EInvolOpt.Optimum) {
		if (gw2.TN > gw1.TN) {
			blr1 = gw1.dr;
			blr2 = (blr1 * gw2.TN) / gw1.TN;
		} else {
			blr2 = gw2.dr;
			blr1 = (blr2 * gw1.TN) / gw2.TN;
		}
	}
	if (involSym === 1) {
		blr1 = brr1;
		blr2 = brr2;
	}
	return [brr1, blr1, brr2, blr2];
}

class ActionLine {
	gw1: GearWheelProfile;
	gw2: GearWheelProfile;
	initAngle1: number;
	angleCenterCenter: number;
	interAxis: number;
	rightLeftCenter2: number;
	msg: string;
	apr: number; // angle pressure right
	apl: number; // angle pressure left
	lBDr = 0;
	lBDl = 0;
	laStartRr1 = 0;
	laStartRr2 = 0;
	laStartRl1 = 0;
	laStartRl2 = 0;
	aFODr1 = 0;
	aFODr2 = 0;
	aFODl1 = 0;
	aFODl2 = 0;
	lasr1 = 0;
	lasr2 = 0;
	lasl1 = 0;
	lasl2 = 0;
	firstToothUr1 = 0;
	firstToothUl1 = 0;
	ftdr1 = 0;
	ftdl1 = 0;
	constructor(
		gw1: GearWheelProfile,
		gw2: GearWheelProfile,
		initAngle1: number,
		angleCenterCenter: number,
		interAxis: number,
		rightLeftCenter2: number
	) {
		// initialized members
		this.gw1 = gw1;
		this.gw2 = gw2;
		this.initAngle1 = initAngle1;
		this.angleCenterCenter = angleCenterCenter;
		this.interAxis = interAxis;
		this.rightLeftCenter2 = rightLeftCenter2;
		// computed members
		this.msg = '';
		this.apr = 0;
		this.apl = 0;
	}
	check1() {
		this.gw1.checkInitStep(4, 'ActionLine.check1-1');
		this.gw2.checkInitStep(4, 'ActionLine.check1-2');
		if (this.interAxis > this.gw1.ar + this.gw2.ar) {
			this.msg += `warn333: initAngle2 interAxis ${ffix(
				this.interAxis
			)} is too large compare to gw1.ar ${ffix(this.gw1.ar)} and gw2.ar ${ffix(
				this.gw2.ar
			)}\n`;
		}
		if (roundZero(this.gw1.brr * this.gw2.TN - this.gw2.brr * this.gw1.TN) !== 0) {
			this.msg += `warn407: right ratios differ N1/N2 = ${this.gw1.TN} / ${
				this.gw2.TN
			} = ${ffix(this.gw1.TN / this.gw2.TN)} and brr1/brr2 = ${ffix(this.gw1.brr)}/${ffix(
				this.gw2.brr
			)} = ${ffix(this.gw1.brr / this.gw2.brr)}\n`;
		}
		if (roundZero(this.gw1.blr * this.gw2.TN - this.gw2.blr * this.gw1.TN) !== 0) {
			this.msg += `warn408: left ratios differ N1/N2 = ${this.gw1.TN} / ${
				this.gw2.TN
			} = ${ffix(this.gw1.TN / this.gw2.TN)} and blr1/blr2 = ${ffix(this.gw1.blr)}/${ffix(
				this.gw2.blr
			)} = ${ffix(this.gw1.blr / this.gw2.blr)}\n`;
		}
	}
	check2() {
		this.gw1.checkInitStep(5, 'ActionLine.check2-1');
		this.gw2.checkInitStep(5, 'ActionLine.check2-2');
		if (roundZero(this.gw1.adt + this.gw2.adt - 1) > 0) {
			this.msg += `warn281: addendum thickness too large: adt1 ${ffix(
				this.gw1.adt
			)} adt2 ${ffix(this.gw2.adt)}\n`;
		}
		const a1 = this.gw1.ar - this.gw1.pr;
		const d1 = this.gw1.pr - this.gw1.dr;
		const a2 = this.gw2.ar - this.gw2.pr;
		const d2 = this.gw2.pr - this.gw2.dr;
		if (roundZero(d2 - a1) < 0) {
			this.msg += `warn282: addendum-1 ${ffix(a1)} larger than dedendum-2 ${ffix(d2)}\n`;
		}
		if (roundZero(d1 - a2) < 0) {
			this.msg += `warn283: addendum-2 ${ffix(a2)} larger than dedendum-1 ${ffix(d1)}\n`;
		}
	}
	calcActionLine() {
		this.gw1.checkInitStep(4, 'ActionLine.calcActionLine-1');
		this.gw2.checkInitStep(4, 'ActionLine.calcActionLine-2');
		this.gw1.calcInvoluteAngles();
		this.gw2.calcInvoluteAngles();
		const dOFr1 = (this.interAxis * this.gw1.brr) / (this.gw1.brr + this.gw2.brr);
		const dOFl1 = (this.interAxis * this.gw1.blr) / (this.gw1.blr + this.gw2.blr);
		const dOFr2 = this.interAxis - dOFr1;
		const dOFl2 = this.interAxis - dOFl1;
		//const apr = Math.acos(gw1.brr / dOFr);
		//const apl = Math.acos(gw1.blr / dOFl);
		this.apr = Math.acos((this.gw1.brr + this.gw2.brr) / this.interAxis);
		this.apl = Math.acos((this.gw1.blr + this.gw2.blr) / this.interAxis);
		this.msg += `Pressure angular: right: ${ffix(radToDeg(this.apr))} left: ${ffix(
			radToDeg(this.apl)
		)} degree\n`;
		this.lBDr = this.interAxis * Math.sin(this.apr);
		this.lBDl = this.interAxis * Math.sin(this.apl);
		this.msg += `Line of Action Maximum length: right: ${ffix(this.lBDr)} left: ${ffix(
			this.lBDl
		)} mm\n`;
		// effective line of action right
		const aOFDr1 = Math.PI / 2 + this.apr;
		const aFDOr1 = aBFromLaLbAa(this.gw1.ar, dOFr1, aOFDr1);
		this.aFODr1 = Math.PI - aOFDr1 - aFDOr1;
		//const aBODr1 = this.gw1.involuteR.uFromL(this.gw1.ar); // this.gw1.rua
		const aFODr1Alt = this.gw1.rua - this.apr - this.gw1.rwa;
		//this.aFODr1 = aFODr1Alt;
		if (roundZero(this.aFODr1 - aFODr1Alt) !== 0) {
			throw `dbg378: aFODr1 ${this.aFODr1} and aFODr1Alt ${aFODr1Alt} differ`;
		}
		const lDFr1 = lcFromLaLbAc(dOFr1, this.gw1.ar, this.aFODr1);
		const aOFDr2 = aOFDr1;
		const aFDOr2 = aBFromLaLbAa(this.gw2.ar, dOFr2, aOFDr2);
		this.aFODr2 = Math.PI - aOFDr2 - aFDOr2;
		const aFODr2Alt = this.gw2.rua - this.apr - this.gw2.rwa;
		//this.aFODr2 = aFODr2Alt;
		if (roundZero(this.aFODr2 - aFODr2Alt) !== 0) {
			throw `dbg379: aFODr2 ${this.aFODr2} and aFODr2Alt ${aFODr2Alt} differ`;
		}
		const lDFr2 = lcFromLaLbAc(dOFr2, this.gw2.ar, this.aFODr2);
		const lalr = lDFr1 + lDFr2;
		const laUr1 = lalr / this.gw1.brr;
		const laUr2 = lalr / this.gw2.brr;
		const laStartUr1 = this.gw1.rua - laUr1;
		const laStartUr2 = this.gw2.rua - laUr2;
		this.laStartRr1 = this.gw1.involuteR.lFromU(laStartUr1);
		this.laStartRr2 = this.gw2.involuteR.lFromU(laStartUr2);
		// effective line of action left
		const aOFDl1 = Math.PI / 2 + this.apl;
		const aFDOl1 = aBFromLaLbAa(this.gw1.ar, dOFl1, aOFDl1);
		this.aFODl1 = Math.PI - aOFDl1 - aFDOl1;
		const aFODl1Alt = this.gw1.lua - this.apl + this.gw1.lwa;
		//this.aFODl1 = aFODl1Alt;
		if (roundZero(this.aFODl1 - aFODl1Alt) !== 0) {
			throw `dbg388: aFODl1 ${this.aFODl1} and aFODl1Alt ${aFODl1Alt} differ`;
		}
		const lDFl1 = lcFromLaLbAc(dOFl1, this.gw1.ar, this.aFODl1);
		const aOFDl2 = aOFDr1;
		const aFDOl2 = aBFromLaLbAa(this.gw2.ar, dOFl2, aOFDl2);
		this.aFODl2 = Math.PI - aOFDl2 - aFDOl2;
		const aFODl2Alt = this.gw2.lua - this.apl + this.gw2.lwa;
		//this.aFODl2 = aFODl2Alt;
		if (roundZero(this.aFODl2 - aFODl2Alt) !== 0) {
			throw `dbg389: aFODl2 ${this.aFODl2} and aFODl2Alt ${aFODl2Alt} differ`;
		}
		const lDFl2 = lcFromLaLbAc(dOFl2, this.gw2.ar, this.aFODl2);
		const lall = lDFl1 + lDFl2;
		const laUl1 = lall / this.gw1.blr;
		const laUl2 = lall / this.gw2.blr;
		const laStartUl1 = this.gw1.lua - laUl1;
		const laStartUl2 = this.gw2.lua - laUl2;
		this.laStartRl1 = this.gw1.involuteL.lFromU(laStartUl1);
		this.laStartRl2 = this.gw2.involuteL.lFromU(laStartUl2);
		this.msg += `Line of Action Effective length: right: ${ffix(lalr)} left: ${ffix(
			lall
		)} mm\n`;
		this.msg += `Line of Action Effective rotation angle: right-1: ${ffix(
			radToDeg(laUr1)
		)} right-2: ${ffix(radToDeg(laUr2))} left-1: ${ffix(radToDeg(laUl1))} left-2: ${ffix(
			radToDeg(laUl2)
		)} degree\n`;
		this.msg += `Line of Action Effective height: right-1: ${ffix(
			this.gw1.ar - this.laStartRr1
		)} right-2: ${ffix(this.gw2.ar - this.laStartRr2)} left-1: ${ffix(
			this.gw1.ar - this.laStartRl1
		)} left-2: ${ffix(this.gw2.ar - this.laStartRl2)} mm\n`;
		this.lasr1 = ((2 * Math.PI) / this.gw1.TN) * this.gw1.brr;
		this.lasr2 = ((2 * Math.PI) / this.gw2.TN) * this.gw2.brr;
		this.msg += `Line of Action right: step length: 1: ${ffix(this.lasr1)} 2: ${ffix(
			this.lasr2
		)} mm\n`;
		this.msg += `Line of Action right: nb of contact point: 1: ${ffix(
			lalr / this.lasr1
		)} 2: ${ffix(lalr / this.lasr2)}\n`;
		this.lasl1 = ((2 * Math.PI) / this.gw1.TN) * this.gw1.blr;
		this.lasl2 = ((2 * Math.PI) / this.gw2.TN) * this.gw2.blr;
		this.msg += `Line of Action left: step length: 1: ${ffix(this.lasl1)} 2: ${ffix(
			this.lasl2
		)} mm\n`;
		this.msg += `Line of Action left: nb of contact point: 1: ${ffix(
			lall / this.lasl1
		)} 2: ${ffix(lall / this.lasl2)}\n`;
	}
	calcContactPoint1() {
		this.gw1.checkInitStep(5, 'ActionLine.calcContactPoint1');
		this.firstToothUr1 = withinZero2Pi(
			this.apr - (this.initAngle1 - this.angleCenterCenter) + this.gw1.rwp
		);
		//this.msg += `dbg625: apr ${ffix(this.apr)} initAngle1 ${ffix(this.initAngle1)} rwp ${ffix(this.gw1.rwp)} rad\n`;
		//this.msg += `dbg626: firstToothUr1 ${ffix(this.firstToothUr1)} as ${ffix(this.gw1.as)} rad\n`;
		while (roundZero(this.firstToothUr1 - this.gw1.as) >= 0) {
			this.firstToothUr1 = roundZero(this.firstToothUr1 - this.gw1.as);
		}
		//this.msg += `dbg627: firstToothUr1 ${ffix(this.firstToothUr1)} rad\n`;
		this.firstToothUl1 = withinZero2Pi(
			this.apl +
				(this.initAngle1 - this.angleCenterCenter) +
				this.gw1.as * this.gw1.adt -
				this.gw1.lwp
		);
		while (roundZero(this.firstToothUl1 - this.gw1.as) >= 0) {
			this.firstToothUl1 = roundZero(this.firstToothUl1 - this.gw1.as);
		}
		this.ftdr1 = this.gw1.brr * this.firstToothUr1;
		this.ftdl1 = this.gw1.blr * this.firstToothUl1;
		//this.msg += `dbg112: right: ${ffix(this.ftdr1)} left: ${ffix(this.ftdl1)} mm\n`;
	}
	prepare() {
		this.check1();
		this.check2();
		this.calcActionLine();
		this.calcContactPoint1();
	}
	oneContactSpeed(
		rnl: boolean,
		lBD: number,
		las: number,
		ftd: number,
		baser: number,
		invo: Involute,
		acc: number,
		ap: number,
		label: string,
		color: string
	): tContour {
		const speed = 0.4;
		const larStepNb = Math.floor(lBD / (2 * las));
		const ptu = (ftd + larStepNb * las) / baser;
		const sign = rnl ? 1 : -1;
		const [px, py, vx, vy] = invo.laptc(acc, sign * ap, ptu, speed);
		this.msg += `speed ${label}: vx ${ffix(vx)} vy: ${ffix(vy)} m/s\n`;
		const pt0 = point(px, py);
		const aa = acc + sign * ap;
		const rCtr = contour(px, py, color);
		const pt1 = pt0.translatePolar(aa, -vy);
		rCtr.addSegStrokeA(pt1.cx, pt1.cy);
		const pt2 = pt1.translatePolar(aa - (sign * Math.PI) / 2, vx);
		rCtr.addSegStrokeA(pt2.cx, pt2.cy);
		rCtr.closeSegStroke();
		return rCtr;
	}
	getContactSpeed(): tContour[] {
		const ctrR1 = this.oneContactSpeed(
			true,
			this.lBDr,
			this.lasr1,
			this.ftdr1,
			this.gw1.brr,
			this.gw1.involuteR,
			this.angleCenterCenter,
			this.apr,
			'R1',
			'Black'
		);
		const ctrL1 = this.oneContactSpeed(
			false,
			this.lBDl,
			this.lasl1,
			this.ftdl1,
			this.gw1.blr,
			this.gw1.involuteL,
			this.angleCenterCenter,
			this.apl,
			'L1',
			'Black'
		);
		const rACtr: tContour[] = [];
		rACtr.push(ctrR1);
		rACtr.push(ctrL1);
		return rACtr;
	}
	getContours(): tContour[] {
		const rACtr: tContour[] = [];
		rACtr.push(contourCircle(this.gw1.cx, this.gw1.cy, this.laStartRr1, 'SkyBlue'));
		rACtr.push(contourCircle(this.gw1.cx, this.gw1.cy, this.laStartRl1, 'SlateBlue'));
		rACtr.push(contourCircle(this.gw2.cx, this.gw2.cy, this.laStartRr2, 'SkyBlue'));
		rACtr.push(contourCircle(this.gw2.cx, this.gw2.cy, this.laStartRl2, 'SlateBlue'));
		const c1 = point(this.gw1.cx, this.gw1.cy);
		const c2 = point(this.gw2.cx, this.gw2.cy);
		const pr1 = c1.translatePolar(this.angleCenterCenter + this.apr, this.gw1.brr);
		const pr4 = c2.translatePolar(this.angleCenterCenter + Math.PI + this.apr, this.gw2.brr);
		const ctrLaFullR = contour(pr1.cx, pr1.cy, 'YellowGreen');
		ctrLaFullR.addSegStrokeA(pr4.cx, pr4.cy);
		ctrLaFullR.closeSegStroke();
		rACtr.push(ctrLaFullR);
		const pr2 = c1.translatePolar(this.angleCenterCenter - this.aFODr1, this.gw1.ar);
		const pr3 = c2.translatePolar(this.angleCenterCenter + Math.PI - this.aFODr2, this.gw2.ar);
		const ctrLaEffectiveR = contour(pr2.cx, pr2.cy, 'Yellow');
		ctrLaEffectiveR.addSegStrokeA(pr3.cx, pr3.cy);
		ctrLaEffectiveR.closeSegStroke();
		rACtr.push(ctrLaEffectiveR);
		const pl1 = c1.translatePolar(this.angleCenterCenter - this.apl, this.gw1.blr);
		const pl4 = c2.translatePolar(this.angleCenterCenter + Math.PI - this.apl, this.gw2.blr);
		const ctrLaFullL = contour(pl1.cx, pl1.cy, 'YellowGreen');
		ctrLaFullL.addSegStrokeA(pl4.cx, pl4.cy);
		ctrLaFullL.closeSegStroke();
		rACtr.push(ctrLaFullL);
		const pl2 = c1.translatePolar(this.angleCenterCenter + this.aFODl1, this.gw1.ar);
		const pl3 = c2.translatePolar(this.angleCenterCenter + Math.PI + this.aFODl2, this.gw2.ar);
		const ctrLaEffectiveL = contour(pl2.cx, pl2.cy, 'Yellow');
		ctrLaEffectiveL.addSegStrokeA(pl3.cx, pl3.cy);
		ctrLaEffectiveL.closeSegStroke();
		rACtr.push(ctrLaEffectiveL);
		rACtr.push(...this.getContactSpeed());
		return rACtr;
	}
	getContactPoint(): Point[] {
		const rApt: Point[] = [];
		const c1 = point(this.gw1.cx, this.gw1.cy);
		const cop1r0 = c1.translatePolar(this.angleCenterCenter + this.apr, this.gw1.brr);
		const cop1l0 = c1.translatePolar(this.angleCenterCenter - this.apl, this.gw1.blr);
		rApt.push(point(cop1r0.cx, cop1r0.cy, ShapePoint.eBigSquare));
		rApt.push(point(cop1l0.cx, cop1l0.cy, ShapePoint.eBigSquare));
		const cop1ra = this.angleCenterCenter + this.apr - Math.PI / 2;
		const cop1la = this.angleCenterCenter - this.apl + Math.PI / 2;
		const cop1r1 = cop1r0.translatePolar(cop1ra, this.ftdr1);
		const cop1l1 = cop1l0.translatePolar(cop1la, this.ftdl1);
		rApt.push(point(cop1r1.cx, cop1r1.cy, ShapePoint.eBigSquare));
		rApt.push(point(cop1l1.cx, cop1l1.cy, ShapePoint.eBigSquare));
		let cop1rdn = this.ftdr1;
		while (cop1rdn + this.lasr1 < this.lBDr) {
			cop1rdn += this.lasr1;
			const cop1rn = cop1r0.translatePolar(cop1ra, cop1rdn);
			rApt.push(point(cop1rn.cx, cop1rn.cy, ShapePoint.eBigSquare));
		}
		let cop1ldn = this.ftdl1;
		while (cop1ldn + this.lasl1 < this.lBDl) {
			cop1ldn += this.lasl1;
			const cop1ln = cop1l0.translatePolar(cop1la, cop1ldn);
			rApt.push(point(cop1ln.cx, cop1ln.cy, ShapePoint.eBigSquare));
		}
		return rApt;
	}
	getMsg(): string {
		return this.msg;
	}
	getInitAngle2(): number {
		let ftdr2 = this.lBDr - this.ftdr1;
		while (roundZero(ftdr2 - this.lasr2) >= 0) {
			ftdr2 = roundZero(ftdr2 - this.lasr2);
		}
		let ftdl2 = this.lBDl - this.ftdl1;
		while (roundZero(ftdl2 - this.lasl2) >= 0) {
			ftdl2 = roundZero(ftdl2 - this.lasl2);
		}
		const ftur2 = ftdr2 / this.gw2.brr;
		const ftul2 = ftdl2 / this.gw2.blr;
		const ftar2 = this.angleCenterCenter + Math.PI + this.apr - ftur2 + this.gw2.rwp;
		const ftal2 = this.angleCenterCenter + Math.PI - this.apl + ftul2 + this.gw2.lwp;
		const ftal2b = ftal2 - this.gw2.as * this.gw2.adt;
		let angleL2 = 2 * Math.PI + withinZero2Pi(ftal2b);
		while (roundZero(angleL2 - this.gw2.as - ftar2) >= 0) {
			angleL2 = roundZero(angleL2 - this.gw2.as);
		}
		const angleDiff2 = angleL2 - ftar2;
		const angleDiff1 = (angleDiff2 * this.gw2.brr) / this.gw1.brr;
		const laDiffr2 = angleDiff2 * this.gw2.brr;
		const laDiffl2 = angleDiff2 * this.gw2.blr;
		this.msg += `slack angle: 1: ${ffix(radToDeg(angleDiff1))} 2: ${ffix(
			radToDeg(angleDiff2)
		)} degree\n`;
		this.msg += `slack on action line: right-2: ${ffix(laDiffr2)} left-2: ${ffix(
			laDiffl2
		)} mm\n`;
		let rInitAngle2 = 0;
		if (this.rightLeftCenter2 === 0) {
			rInitAngle2 = ftar2;
		} else if (this.rightLeftCenter2 === 1) {
			rInitAngle2 = ftal2b;
		} else if (this.rightLeftCenter2 === 2) {
			rInitAngle2 = ftar2 + angleDiff2 / 2;
		} else {
			throw `err221: initAngle2 rightLeftCenter2 ${this.rightLeftCenter2} has an unkown value`;
		}
		return withinPiPi(rInitAngle2);
	}
}

function actionLine(
	gw1: GearWheelProfile,
	gw2: GearWheelProfile,
	initAngle1: number,
	angleCenterCenter: number,
	interAxis: number,
	rightLeftCenter2: number
): ActionLine {
	const rAL = new ActionLine(
		gw1,
		gw2,
		initAngle1,
		angleCenterCenter,
		interAxis,
		rightLeftCenter2
	);
	return rAL;
}

export { gwProfile, gw2center, baseCircles, actionLine };
