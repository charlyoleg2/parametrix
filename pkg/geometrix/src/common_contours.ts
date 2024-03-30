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
	hlength: number,
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
		.addSegStrokeR(-dw2, hlength)
		.addCornerRounded(cornerRounded)
		.addSegStrokeR(0, rightSide)
		.addCornerRounded(cornerRounded)
		.closeSegStroke();
	const rCtr = ctr1.rotate(ox, oy, angle).translate(-dpx, dpy);
	return rCtr;
}

export { ctrRectangle, ctrRectRot, ctrRectRot2, ctrTrapezoid, ctrTrapezoidRot2 };
