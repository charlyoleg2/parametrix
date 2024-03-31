// canvas_utils.ts
// helper interfaces and functions to work with HtmlCanvas
// used by point.ts, line.ts, vector.ts, contour.ts and figure.ts

import { roundZero } from './angle_utils';

const colors = {
	point: 'grey',
	line: 'grey',
	vector: 'DarkTurquoise',
	contour: 'green',
	main: 'SteelBlue',
	mainB: 'SlateGrey',
	second: 'Violet',
	secondB: 'SlateGrey',
	dynamics: 'Tomato',
	ruler: 'blue',
	origin: 'red',
	reference: 'blue',
	mouse: 'yellow'
};

interface tCanvasAdjust {
	init: number;
	xMin: number;
	yMin: number;
	xyDiff: number;
	shiftX: number;
	shiftY: number;
	scaleX: number;
	scaleY: number;
}

function point2canvas(px: number, py: number, iAdjust: tCanvasAdjust): [number, number] {
	const cx2 = iAdjust.shiftX + (px - iAdjust.xMin) * iAdjust.scaleX;
	const cy2 = iAdjust.shiftY + (py - iAdjust.yMin) * iAdjust.scaleY;
	return [cx2, cy2];
}
function canvas2point(cx: number, cy: number, iAdjust: tCanvasAdjust): [number, number] {
	const px2 = (cx - iAdjust.shiftX) / iAdjust.scaleX + iAdjust.xMin;
	const py2 = (cy - iAdjust.shiftY) / iAdjust.scaleY + iAdjust.yMin;
	return [px2, py2];
}
function canvasTranslatePolar(cx: number, cy: number, ia: number, il: number): [number, number] {
	const cx2 = cx + il * Math.cos(ia);
	const cy2 = cy - il * Math.sin(ia);
	return [cx2, cy2];
}
function radius2canvas(iRadius: number, iAdjust: tCanvasAdjust): number {
	if (roundZero(iAdjust.scaleX - Math.abs(iAdjust.scaleY)) !== 0) {
		throw `err683: iAdjust.scaleX and scaleY differ ${iAdjust.scaleX} ${iAdjust.scaleY}`;
	}
	if (iAdjust.scaleX < 0) {
		throw `err684: iAdjust.scaleX ${iAdjust.scaleX} is negative`;
	}
	const rRadius = iRadius * iAdjust.scaleX;
	if (rRadius < 0) {
		throw `err685: rRadius for canvas ${rRadius} is negative`;
	}
	return rRadius;
}

function adjustZero(): tCanvasAdjust {
	const rAdjustZero = {
		init: 0,
		xMin: 0,
		yMin: 0,
		xyDiff: 1,
		shiftX: 0,
		shiftY: 0,
		scaleX: 1,
		scaleY: 1
	};
	return rAdjustZero;
}
function adjustInit(
	xMin: number,
	xMax: number,
	yMin: number,
	yMax: number,
	cWidth: number,
	cHeight: number
): tCanvasAdjust {
	const rAdjust: tCanvasAdjust = adjustZero();
	const xDiff = Math.max(xMax - xMin, 1);
	const yDiff = Math.max(yMax - yMin, 1);
	const xScale = cWidth / xDiff;
	const yScale = cHeight / yDiff;
	let xyScale = 0.9 * xScale;
	let xyDiff = xDiff;
	if (yScale < xScale) {
		xyScale = 0.9 * yScale;
		xyDiff = yDiff;
	}
	rAdjust.init = 1;
	rAdjust.xMin = xMin;
	rAdjust.yMin = yMin;
	rAdjust.xyDiff = xyDiff;
	rAdjust.shiftX = 0.05 * cWidth;
	rAdjust.scaleX = xyScale;
	rAdjust.shiftY = cHeight - 0.05 * cHeight;
	rAdjust.scaleY = -1 * xyScale;
	return rAdjust;
}
function adjustCenter(px: number, py: number, iAdjust: tCanvasAdjust): tCanvasAdjust {
	const rAdjust: tCanvasAdjust = structuredClone(iAdjust);
	rAdjust.xMin = px - rAdjust.xyDiff / 2;
	rAdjust.yMin = py - rAdjust.xyDiff / 2;
	return rAdjust;
}
function adjustRect(
	p1x: number,
	p1y: number,
	p2x: number,
	p2y: number,
	cWidth: number,
	cHeight: number
): tCanvasAdjust {
	const xMin = Math.min(p1x, p2x);
	const xMax = Math.max(p1x, p2x);
	const yMin = Math.min(p1y, p2y);
	const yMax = Math.max(p1y, p2y);
	const rAdjust = adjustInit(xMin, xMax, yMin, yMax, cWidth, cHeight);
	return rAdjust;
}
function adjustScale(iFactor: number, iAdjust: tCanvasAdjust): tCanvasAdjust {
	const rAdjust: tCanvasAdjust = structuredClone(iAdjust);
	const shift = (1 - iFactor) / 2;
	rAdjust.xMin += shift * iAdjust.xyDiff;
	rAdjust.yMin += shift * iAdjust.xyDiff;
	rAdjust.xyDiff *= iFactor;
	rAdjust.scaleX *= 1.0 / iFactor;
	rAdjust.scaleY *= 1.0 / iFactor;
	return rAdjust;
}
function adjustTranslate(
	p1x: number,
	p1y: number,
	p2x: number,
	p2y: number,
	iAdjust: tCanvasAdjust
): tCanvasAdjust {
	const rAdjust: tCanvasAdjust = structuredClone(iAdjust);
	const xDiff = p2x - p1x;
	const yDiff = p2y - p1y;
	//console.log(`dbg118: ${xDiff} ${yDiff}`);
	rAdjust.xMin += -xDiff;
	rAdjust.yMin += -yDiff;
	return rAdjust;
}

export type { tCanvasAdjust };
export {
	colors,
	point2canvas,
	canvas2point,
	canvasTranslatePolar,
	radius2canvas,
	adjustZero,
	adjustInit,
	adjustCenter,
	adjustRect,
	adjustScale,
	adjustTranslate
};
