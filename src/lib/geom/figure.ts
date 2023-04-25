// figure.ts
// a minimalistic 2D euclid geometry calculation library
// figure.ts deals with points, lines, vectors, segments, contours
// figure.ts gather all other modules of geom

import type { tCanvasAdjust } from '$lib/geom/canvas_utils';
//import { colorCanvasPoint } from '$lib/style/colors.scss';
import { adjustZero, adjustInit } from '$lib/geom/canvas_utils';
import { degToRad, radToDeg, roundZero } from '$lib/geom/angle_utils';
import { Point, point } from '$lib/geom/point';
import { Line, line } from '$lib/geom/line';

class Figure {
	pointList: Array<Point>;
	lineList: Array<Line>;
	xMin: number;
	xMax: number;
	yMin: number;
	yMax: number;
	constructor() {
		this.pointList = [];
		this.lineList = [];
		this.xMin = 0;
		this.xMax = 0;
		this.yMin = 0;
		this.yMax = 0;
	}
	addPoint(ipoint: Point) {
		this.pointList.push(ipoint);
	}
	addLine(iline: Line) {
		this.lineList.push(iline);
	}
	clear() {
		this.pointList = [];
		this.lineList = [];
	}
	getMinMax() {
		if (this.pointList.length > 0) {
			this.xMin = this.pointList[0].cx;
			this.xMax = this.pointList[0].cx;
			this.yMin = this.pointList[0].cy;
			this.yMax = this.pointList[0].cy;
			for (const p of this.pointList) {
				this.xMin = Math.min(this.xMin, p.cx);
				this.xMax = Math.max(this.xMax, p.cx);
				this.yMin = Math.min(this.yMin, p.cy);
				this.yMax = Math.max(this.yMax, p.cy);
			}
		}
		//console.log(`dbg137: ${this.xMin}, ${this.xMax}, ${this.yMin}, ${this.yMax}`);
	}
	getAdjustFull(iCanvasWidth: number, iCanvasHeight: number): tCanvasAdjust {
		//console.log(`dbg140: ${iCanvasWidth}, ${iCanvasHeight}`);
		let rCanvasAdjust: tCanvasAdjust = adjustZero();
		if (this.pointList.length > 0) {
			this.getMinMax();
			rCanvasAdjust = adjustInit(
				this.xMin,
				this.xMax,
				this.yMin,
				this.yMax,
				iCanvasWidth,
				iCanvasHeight
			);
		}
		//console.log(`dbg150: ${rCanvasAdjust.shiftX}, ${rCanvasAdjust.scaleX}`);
		return rCanvasAdjust;
	}
	getAdjustZoom(iCanvasWidth: number, iCanvasHeight: number): tCanvasAdjust {
		//console.log(`dbg140: ${iCanvasWidth}, ${iCanvasHeight}`);
		let rCanvasAdjust: tCanvasAdjust = adjustZero();
		if (this.pointList.length > 0) {
			this.getMinMax();
			const xMin = (this.xMin + this.xMax) / 2;
			const yMin = (this.yMin + this.yMax) / 2;
			rCanvasAdjust = adjustInit(
				xMin,
				this.xMax,
				yMin,
				this.yMax,
				iCanvasWidth,
				iCanvasHeight
			);
		}
		//console.log(`dbg150: ${rCanvasAdjust.shiftX}, ${rCanvasAdjust.scaleX}`);
		return rCanvasAdjust;
	}
	draw(ctx: CanvasRenderingContext2D, adjust: tCanvasAdjust) {
		for (const p of this.pointList) {
			p.draw(ctx, adjust);
		}
		for (const li of this.lineList) {
			li.draw(ctx, adjust);
		}
	}
}

function figure() {
	return new Figure();
}

/* export */

export { degToRad, radToDeg, roundZero, Point, point, Line, line, Figure, figure };