// vector.ts
// vector.ts deals with vectors
// vector.ts depends on canvas_utils.ts, angle_utils.ts, points.ts and line.ts
// vector.ts id used by figure.ts

import type { tCanvasAdjust } from './canvas_utils';
//import { colorCanvasPoint } from '$lib/style/colors.scss';
import { colors, point2canvas, canvasTranslatePolar } from './canvas_utils';
import {
	//degToRad,
	//radToDeg,
	roundZero,
	//withinZero2Pi,
	withinPiPi
	//withinZeroPi,
	//withinHPiHPi
} from './angle_utils';
//import {
//rightTriLaFromLbLc,
//rightTriLbFromLaLc,
//lcFromLaLbAc,
//aCFromLaLbLc,
//aCFromAaAb,
//lbFromLaAaAb,
//aBFromLaLbAa
//} from './triangle_utils';
//import type { tPolar } from './point';
import type { Point } from './point';

type tCartesian = [number, number]; // angle, distance

/* Base classes */
class Vector {
	ca: number;
	cl: number;
	drawPoint: Point;
	constructor(ia: number, il: number, iDrawPoint: Point) {
		this.ca = ia;
		this.cl = il;
		this.drawPoint = iDrawPoint;
	}
	draw(ctx: CanvasRenderingContext2D, cAdjust: tCanvasAdjust, color: string = colors.vector) {
		const radius = ctx.canvas.width * (0.7 / 100);
		const [cx2, cy2] = point2canvas(this.drawPoint.cx, this.drawPoint.cy, cAdjust);
		const [cx3, cy3] = canvasTranslatePolar(cx2, cy2, this.ca + Math.PI / 2, 2 * radius);
		const [cx4, cy4] = canvasTranslatePolar(cx2, cy2, this.ca - Math.PI / 2, 2 * radius);
		const p3 = this.drawPoint.translatePolar(this.ca, this.cl);
		const [cx5, cy5] = point2canvas(p3.cx, p3.cy, cAdjust);
		const [cx6, cy6] = canvasTranslatePolar(cx5, cy5, this.ca + (3 * Math.PI) / 4, 4 * radius);
		const [cx7, cy7] = canvasTranslatePolar(cx5, cy5, this.ca + (5 * Math.PI) / 4, 4 * radius);
		ctx.beginPath();
		ctx.moveTo(cx3, cy3);
		ctx.lineTo(cx4, cy4);
		ctx.moveTo(cx2, cy2);
		ctx.lineTo(cx5, cy5);
		ctx.lineTo(cx6, cy6);
		ctx.moveTo(cx5, cy5);
		ctx.lineTo(cx7, cy7);
		ctx.strokeStyle = color;
		ctx.stroke();
	}
	getCartesian(): tCartesian {
		return [this.cl * Math.cos(this.ca), this.cl * Math.sin(this.ca)];
	}
	setCartesian(ix: number, iy: number): Vector {
		return new Vector(Math.atan2(iy, ix), Math.sqrt(ix ** 2 + iy ** 2), this.drawPoint);
	}
	translatePoint(ip: Point): Point {
		const [x1, y1] = this.getCartesian();
		return ip.translate(x1, y1);
	}
	add(iVect: Vector): Vector {
		const [x1, y1] = this.getCartesian();
		const [x2, y2] = iVect.getCartesian();
		const rVect = this.setCartesian(x1 + x2, y1 + y2);
		return rVect;
	}
	addCart(ix: number, iy: number): Vector {
		const [x1, y1] = this.getCartesian();
		const rVect = this.setCartesian(x1 + ix, y1 + iy);
		return rVect;
	}
	// transforms
	translate(ix: number, iy: number): Vector {
		const rVec = new Vector(this.ca, this.cl, this.drawPoint.translate(ix, iy));
		return rVec;
	}
	rotate(ic: Point, ia: number): Vector {
		const rVec = new Vector(this.ca + ia, this.cl, this.drawPoint.rotate(ic, ia));
		return rVec;
	}
	// point comparison
	isEqual(iVect: Vector): boolean {
		const [x1, y1] = this.getCartesian();
		const [x2, y2] = iVect.getCartesian();
		const rb = roundZero(x2 - x1) === 0 && roundZero(y2 - y1) === 0;
		return rb;
	}
	// dot product
	dotProduct(iVect: Vector): number {
		const angle = withinPiPi(iVect.ca - this.ca);
		return this.cl * iVect.cl * Math.cos(angle);
	}
	// cross product
	crossProduct(iVect: Vector): number {
		const angle = withinPiPi(iVect.ca - this.ca);
		return this.cl * iVect.cl * Math.sin(angle);
	}
}

function vector(ia: number, il: number, iDrawPoint: Point) {
	return new Vector(ia, il, iDrawPoint);
}

/* export */

export type { tCartesian };
export { Vector, vector };
