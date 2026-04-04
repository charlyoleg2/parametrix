// point.ts
// point.ts deals with points
// point.ts depends on canvas_utils.ts

import type { tCanvasAdjust } from './canvas_utils';
//import { colorCanvasPoint } from '$lib/style/colors.scss';
import { colors, point2canvas } from './canvas_utils';
import { roundZero, withinPiPi } from './angle_utils';

type tPolar = [number, number]; // angle, distance
enum ShapePoint {
	eDefault,
	eCircle,
	eCross,
	eSquare,
	eBigSquare,
	eTwoTri,
	eTri1,
	eTri2,
	eTri3,
	eTri4
}

/* Base classes */
class Point {
	cx: number;
	cy: number;
	shape: ShapePoint;
	constructor(ix: number, iy: number, ishape = ShapePoint.eDefault) {
		this.cx = ix;
		this.cy = iy;
		this.shape = ishape;
	}
	draw(
		ctx: CanvasRenderingContext2D,
		cAdjust: tCanvasAdjust,
		color: string = colors.point,
		ishape = ShapePoint.eDefault
	) {
		if (isFinite(this.cx) && isFinite(this.cy)) {
			const radius = ctx.canvas.width * (0.7 / 100);
			const radius2 = 2 * radius;
			const [cx2, cy2] = point2canvas(this.cx, this.cy, cAdjust);
			//console.log(`dbg493: ${cx2} ${cy2}`);
			let shape = ishape;
			if (shape === ShapePoint.eDefault) {
				shape = this.shape;
			}
			ctx.beginPath();
			switch (shape) {
				case ShapePoint.eCross:
					ctx.moveTo(cx2 - radius2, cy2);
					ctx.lineTo(cx2 + radius2, cy2);
					ctx.moveTo(cx2, cy2 - radius2);
					ctx.lineTo(cx2, cy2 + radius2);
					break;
				case ShapePoint.eSquare:
					ctx.rect(cx2 - radius, cy2 - radius, 2 * radius, 2 * radius);
					break;
				case ShapePoint.eBigSquare:
					ctx.rect(cx2 - 2 * radius, cy2 - 2 * radius, 4 * radius, 4 * radius);
					break;
				case ShapePoint.eTwoTri:
					ctx.moveTo(cx2 - radius2, cy2);
					ctx.lineTo(cx2 + radius2, cy2);
					ctx.lineTo(cx2, cy2 + radius2);
					ctx.lineTo(cx2, cy2 - radius2);
					ctx.lineTo(cx2 - radius2, cy2);
					break;
				case ShapePoint.eTri1:
					ctx.moveTo(cx2 - radius2, cy2);
					ctx.lineTo(cx2 + radius2, cy2);
					ctx.lineTo(cx2, cy2 - radius2);
					ctx.lineTo(cx2, cy2 + radius2);
					break;
				case ShapePoint.eTri2:
					ctx.moveTo(cx2 + radius2, cy2);
					ctx.lineTo(cx2 - radius2, cy2);
					ctx.lineTo(cx2, cy2 - radius2);
					ctx.lineTo(cx2, cy2 + radius2);
					break;
				case ShapePoint.eTri3:
					ctx.moveTo(cx2 + radius2, cy2);
					ctx.lineTo(cx2 - radius2, cy2);
					ctx.lineTo(cx2, cy2 + radius2);
					ctx.lineTo(cx2, cy2 - radius2);
					break;
				case ShapePoint.eTri4:
					ctx.moveTo(cx2 - radius2, cy2);
					ctx.lineTo(cx2 + radius2, cy2);
					ctx.lineTo(cx2, cy2 + radius2);
					ctx.lineTo(cx2, cy2 - radius2);
					break;
				case ShapePoint.eCircle:
				default:
					ctx.arc(cx2, cy2, radius, 0, 2 * Math.PI);
			}
			ctx.strokeStyle = color;
			ctx.stroke();
		} else {
			console.log(`INFO489: point not draw because of infinity ${this.cx} ${this.cy}`);
		}
	}
	distanceOrig(): number {
		return Math.sqrt(this.cx ** 2 + this.cy ** 2);
	}
	angleOrig(): number {
		return Math.atan2(this.cy, this.cx);
	}
	getPolar(): tPolar {
		return [this.angleOrig(), this.distanceOrig()];
	}
	setPolar(ia: number, il: number): Point {
		return new Point(il * Math.cos(ia), il * Math.sin(ia));
	}
	translate(ix: number, iy: number): Point {
		return new Point(this.cx + ix, this.cy + iy);
	}
	translatePolar(ia: number, il: number): Point {
		return new Point(this.cx + il * Math.cos(ia), this.cy + il * Math.sin(ia));
	}
	clone(ishape = ShapePoint.eDefault): Point {
		return new Point(this.cx, this.cy, ishape);
	}
	rotateOrig(ia: number): Point {
		// rotation with the origin as center
		const polar = this.getPolar();
		return this.setPolar(polar[0] + ia, polar[1]);
	}
	scaleOrig(ir: number): Point {
		const polar = this.getPolar();
		return this.setPolar(polar[0], polar[1] * ir);
	}
	rotate(ic: Point, ia: number): Point {
		const p1 = this.translate(-1 * ic.cx, -1 * ic.cy);
		const polar = p1.getPolar();
		const p2 = this.setPolar(polar[0] + ia, polar[1]);
		return p2.translate(ic.cx, ic.cy);
	}
	scale(ic: Point, ir: number): Point {
		const p1 = this.translate(-1 * ic.cx, -1 * ic.cy);
		const polar = p1.getPolar();
		const p2 = this.setPolar(polar[0], polar[1] * ir);
		return p2.translate(ic.cx, ic.cy);
	}
	// point comparison
	isEqual(ic: Point): boolean {
		const rb = roundZero(this.cx - ic.cx) === 0 && roundZero(this.cy - ic.cy) === 0;
		return rb;
	}
	// measurement
	distanceToPoint(p2: Point): number {
		const rd = Math.sqrt((p2.cx - this.cx) ** 2 + (p2.cy - this.cy) ** 2);
		return rd;
	}
	angleToPoint(p2: Point): number {
		if (roundZero(this.distanceToPoint(p2)) === 0) {
			throw `err434: no angle because points identical ${this.cx} ${p2.cx} ${this.cy} ${p2.cy}`;
		}
		const ra = Math.atan2(p2.cy - this.cy, p2.cx - this.cx);
		return ra;
	}
	angleFromToPoints(p2: Point, p3: Point): number {
		const ap2 = this.angleToPoint(p2);
		const ap3 = this.angleToPoint(p3);
		const ra = withinPiPi(ap3 - ap2);
		return ra;
	}
	// from 2 points create a new point
	middlePoint(p2: Point): Point {
		const rx = (this.cx + p2.cx) / 2;
		const ry = (this.cy + p2.cy) / 2;
		return new Point(rx, ry);
	}
	equidistantPoint(p2: Point, dist: number, p3: Point): Point {
		const lp1p2h = this.distanceToPoint(p2) / 2;
		if (this.isEqual(p2)) {
			throw `err633: no equidistance because identical point ${this.cx} ${this.cy}`;
		}
		if (dist < lp1p2h) {
			throw `err392: equidistance ${dist} smaller than lp1p2h ${lp1p2h}`;
		}
		const pbi = this.middlePoint(p2);
		const abi = this.angleToPoint(p2) + Math.PI / 2;
		const oppos = Math.sqrt(dist ** 2 - lp1p2h ** 2);
		const rp1 = pbi.translatePolar(abi, oppos);
		const rp2 = pbi.translatePolar(abi + Math.PI, oppos);
		const dp1 = p3.distanceToPoint(rp1);
		const dp2 = p3.distanceToPoint(rp2);
		if (oppos !== 0 && dp1 === dp2) {
			throw `err284: magnet point p3 is on line p1p2. cx ${p3.cx} cy: ${p3.cy}`;
		}
		let rp = rp1;
		if (dp2 < dp1) {
			rp = rp2;
		}
		return rp;
	}
}

function point(ix: number, iy: number, ishape = ShapePoint.eDefault): Point {
	return new Point(ix, iy, ishape);
}

function pointMinMax(aPoint: Point[]): [number, number, number, number] {
	let xMin = 0;
	let xMax = 0;
	let yMin = 0;
	let yMax = 0;
	if (aPoint.length > 0) {
		// the first point of the list should not contain infinity
		const p0 = aPoint[0];
		if (
			p0.cx === Number.NEGATIVE_INFINITY ||
			p0.cx === Number.POSITIVE_INFINITY ||
			p0.cy === Number.NEGATIVE_INFINITY ||
			p0.cy === Number.POSITIVE_INFINITY
		) {
			throw `err292: pointMinMax first point with infinity: ${p0.cx} ${p0.cy}`;
		}
		xMin = aPoint[0].cx;
		xMax = aPoint[0].cx;
		yMin = aPoint[0].cy;
		yMax = aPoint[0].cy;
		for (const p of aPoint) {
			if (p.cx !== Number.NEGATIVE_INFINITY) {
				xMin = Math.min(xMin, p.cx);
			}
			if (p.cx !== Number.POSITIVE_INFINITY) {
				xMax = Math.max(xMax, p.cx);
			}
			if (p.cy !== Number.NEGATIVE_INFINITY) {
				yMin = Math.min(yMin, p.cy);
			}
			if (p.cy !== Number.POSITIVE_INFINITY) {
				yMax = Math.max(yMax, p.cy);
			}
		}
	}
	return [xMin, xMax, yMin, yMax];
}

/* export */

export type { tPolar };
export { ShapePoint, Point, point, pointMinMax };
