// wheelElements.ts

import type { tContour } from '$lib/geom/figure';
//import { contour, contourCircle, point } from '$lib/geom/figure';
import { contourCircle } from '$lib/geom/figure';

function axisTorque(cx: number, cy: number, axisRadius: number): tContour {
	const rCtr = contourCircle(cx, cy, axisRadius);
	return rCtr;
}

function hollowStraight(
	cx: number,
	cy: number,
	hollowExt: number,
	hollowInt: number
): Array<tContour> {
	const rACtr = [contourCircle(cx, cy, hollowExt), contourCircle(cx, cy, hollowInt)];
	return rACtr;
}
function hollowStraightArea(cx: number, cy: number, hollowExt: number, hollowInt: number): number {
	const rArea = cx + cy + hollowExt + hollowInt;
	return rArea;
}

export { axisTorque, hollowStraight, hollowStraightArea };
