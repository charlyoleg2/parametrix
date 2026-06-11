// arc_to_stroke.ts

import { orientedArc } from './angle_utils.ts';

type tAtsPoints = [number, number][];

function calcAngleStep(
	max_angle: number,
	max_length: number,
	radius: number,
	arc_angle: number
): [number, number] {
	let max_angle2 = Math.PI / 2;
	if (max_length < 2 * radius) {
		max_angle2 = 2 * Math.asin(max_length / (2 * radius));
	}
	const angleStepMax = Math.min(max_angle, max_angle2);
	//const angleNb = Math.floor(arc_angle / angleStepMax) + 1;
	const angleNb = Math.ceil(arc_angle / angleStepMax);
	const angleStep = arc_angle / angleNb;
	//console.log(`dbg783: ${arc_angle} ${angleStepMax} ${angleNb}`);
	return [angleNb, angleStep];
}

function circle_to_stroke(
	cx: number,
	cy: number,
	radius: number,
	max_angle = Math.PI / 6,
	max_length = 2.0
): tAtsPoints {
	const [angleNb, angleStep] = calcAngleStep(max_angle, max_length, radius, 2 * Math.PI);
	const rPoints: tAtsPoints = [];
	for (let i = 0; i < angleNb; i++) {
		const px = cx + radius * Math.cos(i * angleStep);
		const py = cy + radius * Math.sin(i * angleStep);
		rPoints.push([px, py]);
	}
	// close the contour
	const p0x = rPoints[0][0];
	const p0y = rPoints[0][1];
	rPoints.push([p0x, p0y]);
	return rPoints;
}

function arc_to_stroke(
	cx: number,
	cy: number,
	radius: number,
	a1: number,
	a2: number,
	ccw: boolean,
	max_angle = Math.PI / 6,
	max_length = 2.0
): tAtsPoints {
	const arc_angle = orientedArc(a1, a2, ccw);
	const [angleNb, angleStep] = calcAngleStep(max_angle, max_length, radius, Math.abs(arc_angle));
	//console.log(`dbg054: ${angleNb} ${angleStep}`);
	const angleStepSigned = ccw ? angleStep : -angleStep;
	const angleNb2 = angleNb + 1; // pole and fence
	const rPoints: tAtsPoints = [];
	// skip first point
	for (let i = 1; i < angleNb2; i++) {
		const angle = a1 + i * angleStepSigned;
		const px = cx + radius * Math.cos(angle);
		const py = cy + radius * Math.sin(angle);
		rPoints.push([px, py]);
	}
	return rPoints;
}

export type { tAtsPoints };
export { circle_to_stroke, arc_to_stroke };
