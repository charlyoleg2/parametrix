// common_contours.ts
// Some common contour functions that are needed in many designs

import type { tContour } from './contour';
import { contour } from './contour';

/**
 * The rectangle-origin is bottom-left.
 */
function ctrRectangle(
	ox: number,
	oy: number,
	width: number,
	height: number,
	cornerRounded = 0
): tContour {
	const rCtr = contour(ox, oy)
		.addCornerRounded(cornerRounded)
		.addSegStrokeR(width, 0)
		.addCornerRounded(cornerRounded)
		.addSegStrokeR(0, height)
		.addCornerRounded(cornerRounded)
		.addSegStrokeR(-width, 0)
		.addCornerRounded(cornerRounded)
		.closeSegStroke();
	return rCtr;
}

/**
 * The rectangle-origin is bottom-left.
 */
function ctrRectRot(
	ox: number,
	oy: number,
	width: number,
	height: number,
	angle: number,
	cornerRounded = 0
): tContour {
	const rCtr = ctrRectangle(ox, oy, width, height, cornerRounded).rotate(ox, oy, angle);
	return rCtr;
}

/**
 * The rectangle-origin is middle-left.
 */
function ctrRectRot2(
	ox: number,
	oy: number,
	width: number,
	height: number,
	angle: number,
	cornerRounded = 0
): tContour {
	const dpx = (height / 2) * Math.sin(angle);
	const dpy = (-height / 2) * Math.cos(angle);
	const rCtr = ctrRectRot(ox + dpx, oy + dpy, width, height, angle, cornerRounded);
	return rCtr;
}

/**
 * The trapezoid-origin is bottom-left.
 */
function ctrTrapezoid(
	ox: number,
	oy: number,
	bottomWidth: number,
	topWidth: number,
	height: number,
	cornerRounded = 0
): tContour {
	const dw2 = (topWidth - bottomWidth) / 2;
	const rCtr = contour(ox, oy)
		.addCornerRounded(cornerRounded)
		.addSegStrokeR(bottomWidth, 0)
		.addCornerRounded(cornerRounded)
		.addSegStrokeR(dw2, height)
		.addCornerRounded(cornerRounded)
		.addSegStrokeR(-topWidth, 0)
		.addCornerRounded(cornerRounded)
		.closeSegStroke();
	return rCtr;
}

/**
 * The trapezoid-origin is middle-left.
 */
function ctrTrapezoidRot2(
	ox: number,
	oy: number,
	leftSide: number,
	rightSide: number,
	Hlength: number,
	angle: number,
	cornerRounded = 0
): tContour {
	const dw2 = (rightSide - leftSide) / 2;
	const dpx = (leftSide / 2) * Math.sin(angle);
	const dpy = (leftSide / 2) * Math.cos(angle);
	const ctr1 = contour(ox, oy)
		.addCornerRounded(cornerRounded)
		.addSegStrokeR(0, -leftSide)
		.addCornerRounded(cornerRounded)
		.addSegStrokeR(-dw2, Hlength)
		.addCornerRounded(cornerRounded)
		.addSegStrokeR(0, rightSide)
		.addCornerRounded(cornerRounded)
		.closeSegStroke();
	const rCtr = ctr1.rotate(ox, oy, angle).translate(-dpx, dpy);
	return rCtr;
}

/**
 * The oblong-origin is middle-left.
 */
function ctrOblong(
	ox: number,
	oy: number,
	Vwidth: number,
	Hlength: number,
	angle: number
): tContour {
	if (Hlength < Vwidth) {
		throw `err821: Hlength ${Hlength} is too small compare to Vwidth ${Vwidth}`;
	}
	const dpy = Vwidth / 2;
	const dpx = Hlength - Vwidth;
	const ctr1 = contour(dpy + dpx, -dpy)
		.addPointA(dpy + dpx, dpy)
		.addSegArc(dpy, false, true)
		.addSegStrokeA(dpy, dpy)
		.addPointA(dpy, -dpy)
		.addSegArc(dpy, false, true)
		.closeSegStroke();
	const rCtr = ctr1.rotate(0, 0, angle).translate(ox, oy);
	return rCtr;
}

export { ctrRectangle, ctrRectRot, ctrRectRot2, ctrTrapezoid, ctrTrapezoidRot2, ctrOblong };
