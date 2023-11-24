// figure.ts
// a minimalistic 2D euclid geometry calculation library
// figure.ts deals with points, lines, vectors, contours
// figure.ts gather all other modules of geom

import type { tCanvasAdjust } from './canvas_utils';
//import { colorCanvasPoint } from '$lib/style/colors.scss';
import { colors, adjustZero, adjustInit } from './canvas_utils';
import { withinZero2Pi, withinPiPi, degToRad, radToDeg, roundZero, ffix } from './angle_utils';
import { lcFromLaLbAc, aCFromLaLbLc, lbFromLaAaAb, aBFromLaLbAa } from './triangle_utils';
import { ShapePoint, Point, point, pointMinMax } from './point';
import { Line, line, linePP, bisector, circleCenter } from './line';
import { Vector, vector } from './vector';
import type { tContour } from './contour';
import { contour, contourCircle } from './contour';

interface tLayers {
	points: boolean;
	lines: boolean;
	vectors: boolean;
	main: boolean;
	mainB: boolean;
	second: boolean;
	secondB: boolean;
	dynamics: boolean;
	ruler: boolean;
	refframe: boolean;
}

class Figure {
	pointList: Point[];
	lineList: Line[];
	vectorList: Vector[];
	mainList: tContour[];
	mainBList: tContour[];
	secondList: tContour[];
	secondBList: tContour[];
	dynamicsList: tContour[];
	xMin: number;
	xMax: number;
	yMin: number;
	yMax: number;
	constructor() {
		this.pointList = [];
		this.lineList = [];
		this.vectorList = [];
		this.mainList = [];
		this.mainBList = [];
		this.secondList = [];
		this.secondBList = [];
		this.dynamicsList = [];
		this.xMin = 0;
		this.xMax = 0;
		this.yMin = 0;
		this.yMax = 0;
	}
	addPoint(ipoint: Point) {
		this.pointList.push(ipoint);
	}
	addPoints(ipoints: Point[]) {
		//for (const ipt of ipoints) {
		//	this.pointList.push(ipt);
		//}
		this.pointList.push(...ipoints);
	}
	addLine(iline: Line) {
		this.lineList.push(iline);
	}
	addLines(ilines: Line[]) {
		for (const iline of ilines) {
			this.lineList.push(iline);
		}
	}
	addVector(ivector: Vector) {
		this.vectorList.push(ivector);
	}
	addMain(icontour: tContour) {
		const roundedContour = icontour.generateContour();
		this.addPoints(roundedContour.generatePoints());
		//this.addPoints(icontour.generatePoints()); // points of the skeleton
		this.addLines(roundedContour.generateLines());
		this.mainList.push(roundedContour);
		this.mainBList.push(icontour.extractSkeleton());
	}
	addSecond(icontour: tContour) {
		const roundedContour = icontour.generateContour();
		this.addPoints(roundedContour.generatePoints());
		//this.addPoints(icontour.generatePoints()); // points of the skeleton
		this.addLines(roundedContour.generateLines());
		this.secondList.push(roundedContour);
		this.secondBList.push(icontour.extractSkeleton());
	}
	addDynamics(icontour: tContour) {
		this.addPoints(icontour.generatePoints());
		this.addLines(icontour.generateLines());
		this.dynamicsList.push(icontour);
	}
	translate(ix: number, iy: number): Figure {
		const rfig = new Figure();
		for (const pt of this.pointList) {
			rfig.addPoint(pt.translate(ix, iy));
		}
		for (const li of this.lineList) {
			rfig.addLine(li.translate(ix, iy));
		}
		for (const vec of this.vectorList) {
			rfig.addVector(vec.translate(ix, iy));
		}
		for (const ctr of this.mainList) {
			rfig.addMain(ctr.translate(ix, iy));
		}
		for (const ctr of this.secondList) {
			rfig.addSecond(ctr.translate(ix, iy));
		}
		for (const ctr of this.dynamicsList) {
			rfig.addDynamics(ctr.translate(ix, iy));
		}
		return rfig;
	}
	translatePolar(ia: number, il: number): Figure {
		return this.translate(il * Math.cos(ia), il * Math.sin(ia));
	}
	rotate(ix: number, iy: number, ia: number): Figure {
		const rfig = new Figure();
		const pt0 = point(ix, iy);
		for (const pt of this.pointList) {
			rfig.addPoint(pt.rotate(pt0, ia));
		}
		for (const li of this.lineList) {
			rfig.addLine(li.rotate(pt0, ia));
		}
		for (const vec of this.vectorList) {
			rfig.addVector(vec.rotate(pt0, ia));
		}
		for (const ctr of this.mainList) {
			rfig.addMain(ctr.rotate(ix, iy, ia));
		}
		for (const ctr of this.secondList) {
			rfig.addSecond(ctr.rotate(ix, iy, ia));
		}
		for (const ctr of this.dynamicsList) {
			rfig.addDynamics(ctr.rotate(ix, iy, ia));
		}
		return rfig;
	}
	mergeFigure(ifig: Figure) {
		for (const pt of ifig.pointList) {
			this.addPoint(pt.clone());
		}
		for (const li of ifig.lineList) {
			this.addLine(li.clone());
		}
		for (const vec of ifig.vectorList) {
			this.addVector(vec.clone());
		}
		for (const ctr of ifig.mainList) {
			this.addMain(ctr.clone());
		}
		for (const ctr of ifig.secondList) {
			this.addSecond(ctr.clone());
		}
		for (const ctr of ifig.dynamicsList) {
			this.addDynamics(ctr.clone());
		}
	}
	clear() {
		this.pointList = [];
		this.lineList = [];
		this.vectorList = [];
		this.mainList = [];
		this.mainBList = [];
		this.secondList = [];
		this.secondBList = [];
		this.dynamicsList = [];
	}
	getMinMax() {
		[this.xMin, this.xMax, this.yMin, this.yMax] = pointMinMax(this.pointList);
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
	quantifyRuler(canvasWidth: number, adjust: tCanvasAdjust) {
		const minWidth = canvasWidth / 10;
		const lsizep = minWidth / adjust.scaleX;
		let lref = 0.0001;
		while (lref < lsizep) {
			lref *= 10;
		}
		if (lref / 5 > lsizep) {
			lref /= 5;
		} else if (lref / 2 > lsizep) {
			lref /= 2;
		}
		const lsize = lref * adjust.scaleX; // radius2canvas
		return [lref, lsize];
	}
	drawRuler(ctx: CanvasRenderingContext2D, adjust: tCanvasAdjust, color: string) {
		const [lref, lsize] = this.quantifyRuler(ctx.canvas.width, adjust);
		const xpos = ctx.canvas.width - 10 - lsize;
		//ctx.clearRect(xpos, 5, 100, 25);
		ctx.font = '15px Arial';
		ctx.fillStyle = color;
		ctx.fillText(`${lref.toFixed(4)}`, xpos, 20);
		ctx.beginPath();
		ctx.moveTo(xpos, 25);
		ctx.lineTo(xpos + lsize, 25);
		ctx.lineTo(xpos + lsize, 25 + lsize);
		ctx.strokeStyle = color;
		ctx.stroke();
	}
	draw(ctx: CanvasRenderingContext2D, adjust: tCanvasAdjust, layers: tLayers) {
		if (layers.points) {
			for (const p of this.pointList) {
				p.draw(ctx, adjust);
			}
		}
		if (layers.lines) {
			for (const li of this.lineList) {
				li.draw(ctx, adjust);
			}
		}
		if (layers.vectors) {
			for (const li of this.vectorList) {
				li.draw(ctx, adjust);
			}
		}
		if (layers.main) {
			for (const li of this.mainList) {
				li.draw(ctx, adjust, colors.main);
			}
		}
		if (layers.mainB) {
			for (const li of this.mainBList) {
				li.draw(ctx, adjust, colors.mainB);
			}
		}
		if (layers.second) {
			for (const li of this.secondList) {
				li.draw(ctx, adjust, colors.second);
			}
		}
		if (layers.secondB) {
			for (const li of this.secondBList) {
				li.draw(ctx, adjust, colors.secondB);
			}
		}
		if (layers.dynamics) {
			for (const li of this.dynamicsList) {
				li.draw(ctx, adjust, colors.dynamics);
			}
		}
		if (layers.ruler) {
			this.drawRuler(ctx, adjust, colors.ruler);
		}
		if (layers.refframe) {
			for (const i of [10, 100, 200]) {
				point(i, 0).draw(ctx, adjust, colors.reference, ShapePoint.eCross);
				point(-i, 0).draw(ctx, adjust, colors.reference, ShapePoint.eCross);
				point(0, i).draw(ctx, adjust, colors.reference, ShapePoint.eCross);
				point(0, -i).draw(ctx, adjust, colors.reference, ShapePoint.eCross);
			}
			point(0, 0).draw(ctx, adjust, colors.origin, ShapePoint.eCross);
		}
	}
}

function figure() {
	return new Figure();
}

const c_ParametrixAll = 'ParametrixAll';
type tFaces = Record<string, Figure>;
function mergeFaces(iFaces: tFaces): Figure {
	const rfig = figure();
	for (const face in iFaces) {
		const fig = iFaces[face];
		for (const ipoint of fig.pointList) {
			rfig.pointList.push(ipoint);
		}
		for (const iline of fig.lineList) {
			rfig.lineList.push(iline);
		}
		for (const ivector of fig.vectorList) {
			rfig.vectorList.push(ivector);
		}
		for (const ctr of fig.mainList) {
			rfig.mainList.push(ctr);
		}
		for (const ctr of fig.mainBList) {
			rfig.mainBList.push(ctr);
		}
		for (const ctr of fig.secondList) {
			rfig.secondList.push(ctr);
		}
		for (const ctr of fig.secondBList) {
			rfig.secondBList.push(ctr);
		}
		for (const ctr of fig.dynamicsList) {
			rfig.dynamicsList.push(ctr);
		}
	}
	return rfig;
}

function initLayers(): tLayers {
	const layers: tLayers = {
		points: false,
		lines: false,
		vectors: false,
		main: true,
		mainB: false,
		second: true,
		secondB: false,
		dynamics: false,
		ruler: true,
		refframe: false
	};
	return layers;
}
function copyLayers(iLayers: tLayers): tLayers {
	const layers: tLayers = {
		points: iLayers.points,
		lines: iLayers.lines,
		vectors: iLayers.vectors,
		main: iLayers.main,
		mainB: iLayers.mainB,
		second: iLayers.second,
		secondB: iLayers.secondB,
		dynamics: iLayers.dynamics,
		ruler: iLayers.ruler,
		refframe: iLayers.refframe
	};
	return layers;
}

/* export */

export type { Point, tContour, tLayers, Figure, tFaces };
export {
	ShapePoint,
	withinZero2Pi,
	withinPiPi,
	degToRad,
	radToDeg,
	roundZero,
	ffix,
	lcFromLaLbAc,
	aCFromLaLbLc,
	lbFromLaAaAb,
	aBFromLaLbAa,
	point,
	line,
	linePP,
	bisector,
	circleCenter,
	vector,
	contour,
	contourCircle,
	figure,
	c_ParametrixAll,
	mergeFaces,
	initLayers,
	copyLayers
};
