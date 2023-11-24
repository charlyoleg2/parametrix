// line.ts
// line.ts deals with lines
// line.ts depends on angle_utils.ts, triangle_utils.ts and point.ts

import type { tCanvasAdjust } from './canvas_utils';
//import type { tPolar } from './point';
//import { colorCanvasPoint } from '$lib/style/colors.scss';
import { colors, point2canvas } from './canvas_utils';
import {
	//degToRad,
	//radToDeg,
	roundZero,
	//withinZero2Pi,
	withinPiPi,
	withinZeroPi,
	withinHPiHPi
} from './angle_utils';
import {
	//rightTriLaFromLbLc,
	//rightTriLbFromLaLc,
	//lcFromLaLbAc,
	//aCFromLaLbLc,
	//aCFromAaAb
	lbFromLaAaAb
	//aBFromLaLbAa
} from './triangle_utils';
import { point, Point } from './point';

interface tAffine {
	quasiVertical: boolean;
	ha: number;
	hb: number;
	va: number;
	vb: number;
}

/* Base classes */

class Line {
	cx: number;
	cy: number;
	ca: number;
	constructor(ix: number, iy: number, ia: number) {
		this.cx = ix;
		this.cy = iy;
		this.ca = ia;
	}
	draw(ctx: CanvasRenderingContext2D, cAdjust: tCanvasAdjust, color: string = colors.line) {
		const display_length = ctx.canvas.width * 2;
		const [cx1, cy1] = point2canvas(
			this.cx - display_length * Math.cos(this.ca),
			this.cy - display_length * Math.sin(this.ca),
			cAdjust
		);
		const [cx2, cy2] = point2canvas(
			this.cx + 2 * display_length * Math.cos(this.ca),
			this.cy + 2 * display_length * Math.sin(this.ca),
			cAdjust
		);
		ctx.beginPath();
		ctx.moveTo(cx1, cy1);
		ctx.lineTo(cx2, cy2);
		ctx.strokeStyle = color;
		ctx.stroke();
	}
	setFromPoints(p1: Point, p2: Point) {
		this.cx = p1.cx;
		this.cy = p1.cy;
		this.ca = p1.angleToPoint(p2);
		return this;
	}
	getAffine(): tAffine {
		const rAffine: tAffine = { quasiVertical: false, ha: 0, hb: 0, va: 0, vb: 0 };
		const angleZeroHPi = Math.abs(withinHPiHPi(this.ca));
		if (angleZeroHPi > Math.PI / 4) {
			// x = va * y + vb
			rAffine.quasiVertical = true;
			rAffine.va = -1 * Math.tan(withinHPiHPi(this.ca - Math.PI / 2));
			rAffine.vb = this.cx - rAffine.va * this.cy;
		} else {
			// y = ha * x + hb
			rAffine.ha = Math.tan(withinHPiHPi(this.ca));
			rAffine.hb = this.cy - rAffine.ha * this.cx;
		}
		return rAffine;
	}
	setAffine(iAffine: tAffine): Line {
		const rLine = new Line(0, 0, 0);
		if (iAffine.quasiVertical) {
			rLine.ca = Math.PI / 2 - Math.atan(iAffine.va);
			rLine.cx = iAffine.vb;
			rLine.cy = 0;
		} else {
			rLine.ca = Math.atan(iAffine.ha);
			rLine.cx = 0;
			rLine.cy = iAffine.hb;
		}
		return rLine;
	}
	// intersection
	intersection(il: Line): Point {
		if (this.isParallel(il)) {
			throw `err902: no intersection, lines are parallel ca1: ${this.ca} ca2: ${il.ca}`;
		}
		let rx = 0;
		let ry = 0;
		const affin1 = this.getAffine();
		const affin2 = il.getAffine();
		if (affin1.quasiVertical) {
			if (affin2.quasiVertical) {
				// x = va1 * y + vb1; x = va2 * y + vb2
				// y = (vb1 - vb2) / (va2 - va1)
				ry = (affin1.vb - affin2.vb) / (affin2.va - affin1.va);
				rx = affin1.va * ry + affin1.vb;
			} else {
				// x = va1 * y + vb1; y = ha2 * x + hb2
				// x = va1 * (ha2 * x + hb2) + vb1; x = ((va1 * hb2) + vb1) / (1 - va1 * ha2)
				rx = (affin1.va * affin2.hb + affin1.vb) / (1 - affin1.va * affin2.ha);
				ry = affin2.ha * rx + affin2.hb;
			}
		} else {
			if (affin2.quasiVertical) {
				// y = ha1 * x + hb1; x = va2 * y + vb2
				// y = ha1 * (va2 * y + vb2) + hb1; y = ((ha1 * vb2) + hb1) / (1 - ha1 * va2)
				ry = (affin1.ha * affin2.vb + affin1.hb) / (1 - affin1.ha * affin2.va);
				rx = affin2.va * ry + affin2.vb;
			} else {
				// y = ha1 * x + hb1; y = ha2 * x + hb2
				// y = (hb1 - hb2) / (ha2 - ha1)
				rx = (affin1.hb - affin2.hb) / (affin2.ha - affin1.ha);
				ry = affin1.ha * rx + affin1.hb;
			}
		}
		const rp = point(rx, ry);
		return rp;
	}
	getAxisXIntersection(): number {
		const c_axisX = new Line(0, 0, 0);
		const rp = this.intersection(c_axisX);
		return rp.cx;
	}
	getAxisYIntersection(): number {
		const c_axisY = new Line(0, 0, Math.PI / 2);
		const rp = this.intersection(c_axisY);
		return rp.cy;
	}
	getAxisXIntersecTri(): number {
		let rX = Infinity;
		if (roundZero(withinHPiHPi(this.ca)) !== 0) {
			const p1 = new Point(this.cx, this.cy);
			const l1ca = withinZeroPi(this.ca);
			const aC = p1.angleOrig();
			const la = p1.distanceOrig();
			if (roundZero(la) === 0) {
				rX = 0;
			} else if (roundZero(withinHPiHPi(l1ca - aC)) === 0) {
				rX = 0;
			} else {
				const aA = Math.min(l1ca, Math.PI - l1ca);
				const aB = withinPiPi(l1ca - aC);
				const aB2 = Math.min(Math.abs(aB), Math.PI - Math.abs(aB));
				rX = Math.sign(aB) * lbFromLaAaAb(la, aA, aB2);
			}
		}
		return rX;
	}
	getAxisYIntersecTri(): number {
		let rY = Infinity;
		if (roundZero(withinHPiHPi(this.ca - Math.PI / 2)) !== 0) {
			const p1 = new Point(this.cx, this.cy);
			const l1ca = withinHPiHPi(this.ca);
			const aC = p1.angleOrig();
			const la = p1.distanceOrig();
			const angleDiff = withinHPiHPi(l1ca - aC);
			if (roundZero(la) === 0) {
				rY = 0;
			} else if (roundZero(angleDiff) === 0) {
				rY = 0;
			} else {
				const aA = withinZeroPi(l1ca - Math.PI / 2);
				const aB = -1 * withinPiPi(l1ca - aC);
				const aA2 = Math.min(aA, Math.PI - aA);
				const aB2 = Math.min(Math.abs(aB), Math.PI - Math.abs(aB));
				rY = Math.sign(aB) * lbFromLaAaAb(la, aA2, aB2);
			}
		}
		return rY;
	}
	angleOrig(): number {
		// compute direction, i.e. top-side or bottom-side
		const p1 = new Point(this.cx, this.cy);
		const aC = p1.angleOrig();
		const l1ca = withinHPiHPi(this.ca);
		const aB = -1 * withinPiPi(l1ca - aC);
		let direction = 0;
		if (aB < 0) {
			direction = -Math.PI;
		}
		// end of direction calculation
		const ra = withinZeroPi(Math.PI / 2 + this.ca) + direction;
		return ra;
	}
	distanceOrig(): number {
		const a1 = this.angleOrig();
		const p1 = new Point(this.cx, this.cy);
		const a2 = p1.angleOrig();
		const la = p1.distanceOrig();
		const a12 = withinHPiHPi(a2 - a1);
		const rd = la * Math.cos(a12);
		return rd;
	}
	projectOrig(): Point {
		const pa = this.angleOrig();
		const pl = this.distanceOrig();
		return point(0, 0).setPolar(pa, pl);
	}
	// methods inherited from point
	translate(ix: number, iy: number): Line {
		return new Line(this.cx + ix, this.cy + iy, this.ca);
	}
	rotateOrig(ia: number): Line {
		// rotation with the origin as center
		const lPoint2 = new Point(this.cx, this.cy).rotateOrig(ia);
		return new Line(lPoint2.cx, lPoint2.cy, withinPiPi(this.ca + ia));
	}
	scaleOrig(ir: number): Line {
		const lPoint2 = new Point(this.cx, this.cy).scaleOrig(ir);
		return new Line(lPoint2.cx, lPoint2.cy, this.ca);
	}
	rotate(ic: Point, ia: number): Line {
		const lPoint2 = new Point(this.cx, this.cy).rotate(ic, ia);
		return new Line(lPoint2.cx, lPoint2.cy, withinPiPi(this.ca + ia));
	}
	scale(ic: Point, ir: number): Line {
		const lPoint2 = new Point(this.cx, this.cy).scale(ic, ir);
		return new Line(lPoint2.cx, lPoint2.cy, this.ca);
	}
	clone(): Line {
		const lPoint2 = new Point(this.cx, this.cy);
		return new Line(lPoint2.cx, lPoint2.cy, this.ca);
	}
	// end of methods from point
	// line creation
	lineOrthogonal(ic: Point): Line {
		return new Line(ic.cx, ic.cy, this.ca + Math.PI / 2);
	}
	lineParallel(ic: Point): Line {
		return new Line(ic.cx, ic.cy, this.ca);
	}
	// orthogonal projection
	distanceToPoint(ic: Point): number {
		let rd = 0;
		const p1 = new Point(this.cx, this.cy);
		const lp1ic = p1.distanceToPoint(ic);
		if (roundZero(lp1ic) !== 0) {
			const aC = p1.angleToPoint(ic);
			const aB = withinHPiHPi(aC - this.ca);
			rd = lp1ic * Math.abs(Math.sin(aB));
		}
		return rd;
	}
	projectPoint(ic: Point): Point {
		let rd = 0;
		const p1 = new Point(this.cx, this.cy);
		const lp1ic = p1.distanceToPoint(ic);
		if (roundZero(lp1ic) !== 0) {
			const aC = p1.angleToPoint(ic);
			const aB = withinPiPi(aC - this.ca);
			rd = lp1ic * Math.cos(aB);
		}
		const rp = p1.translatePolar(this.ca, rd);
		return rp;
	}
	// line comparison
	isParallel(il: Line): boolean {
		const rb = roundZero(withinHPiHPi(this.ca - il.ca)) === 0;
		return rb;
	}
	isOrthogonal(il: Line): boolean {
		const rb = roundZero(withinHPiHPi(Math.PI / 2 + this.ca - il.ca)) === 0;
		return rb;
	}
	isEqual(il: Line): boolean {
		const p2 = point(il.cx, il.cy);
		const dist = this.distanceToPoint(p2);
		const rb = roundZero(dist) === 0 && this.isParallel(il);
		return rb;
	}
	// bisector
	bisector(il: Line, ip: Point): Line {
		const pInter = this.intersection(il);
		const a1t = withinZeroPi(this.ca);
		const a2t = withinZeroPi(il.ca);
		const a1 = Math.min(a1t, a2t);
		const a2 = Math.max(a1t, a2t);
		const aList = [a1, a2, a1 + Math.PI, a2 + Math.PI, a1];
		const aRef = pInter.angleToPoint(ip);
		let idx = 0;
		for (let i = 0; i < 4; i++) {
			const aDiff1 = withinPiPi(aList[i] - aRef);
			const aDiff2 = withinPiPi(aList[i + 1] - aRef);
			if (aDiff1 === 0 || aDiff2 === 0) {
				throw `err419: bad reference point for bisecor ${ip.cx} ${ip.cy}`;
			}
			if (aDiff1 < 0 && aDiff2 > 0) {
				idx = i;
			}
		}
		const a0 = withinZeroPi((a1 + a2) / 2);
		const ca = a0 + (idx * Math.PI) / 2;
		return new Line(pInter.cx, pInter.cy, ca);
	}
	// parallel distance
	lineParallelDistance(iDist: number, ipMagnet: Point, ipMagnet2: Point): Line {
		const p1 = point(this.cx, this.cy);
		const p2a = p1.translatePolar(this.ca + Math.PI / 2, iDist);
		const p2b = p1.translatePolar(this.ca - Math.PI / 2, iDist);
		let p2 = p2b;
		let pMagnet = ipMagnet;
		if (roundZero(this.distanceToPoint(pMagnet)) === 0) {
			pMagnet = ipMagnet2;
		}
		if (pMagnet.distanceToPoint(p2a) < pMagnet.distanceToPoint(p2b)) {
			p2 = p2a;
		}
		return new Line(p2.cx, p2.cy, this.ca);
	}
}

function line(ix: number, iy: number, ia: number): Line {
	return new Line(ix, iy, ia);
}

function linePP(ip1: Point, ip2: Point): Line {
	const rline = line(0, 0, 0).setFromPoints(ip1, ip2);
	return rline;
}

function bisector(ip1: Point, ip2: Point): Line {
	if (ip1.isEqual(ip2)) {
		throw `err546: no bisector with two same points cx: ${ip1.cx} cy: ${ip1.cy}`;
	}
	const pbi = ip1.middlePoint(ip2);
	const abi = withinZeroPi(ip1.angleToPoint(ip2) + Math.PI / 2);
	return line(pbi.cx, pbi.cy, abi);
}
function circleCenter(ip1: Point, ip2: Point, ip3: Point): Point {
	if (ip1.isEqual(ip2) || ip2.isEqual(ip3) || ip1.isEqual(ip3)) {
		throw `err833: no bisector with two same points cx: ${ip1.cx} cy: ${ip1.cy}`;
	}
	const bisec1 = bisector(ip1, ip2);
	const bisec2 = bisector(ip2, ip3);
	const rp = bisec1.intersection(bisec2);
	return rp;
}

/* export */

export { Line, line, linePP, bisector, circleCenter };
