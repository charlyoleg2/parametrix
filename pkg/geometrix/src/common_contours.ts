// common_contours.ts
// Some common contour functions that are needed in many designs

import type { tContour } from './contour';
import { contour } from './contour';

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

export { ctrRectangle, ctrRectRot };
