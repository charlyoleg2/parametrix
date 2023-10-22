// wheelElements.ts

import type { tContour } from 'geometrix';
import { contour, contourCircle, point, ffix } from 'geometrix';

function axisTorque(
	cx: number,
	cy: number,
	axisRadius: number,
	ribNb: number,
	ribWidth: number,
	ribHeight: number,
	ribRound1: number,
	ribRound2: number,
	initAngle: number
): tContour {
	let rCtr: tContour = contourCircle(cx, cy, axisRadius);
	if (ribNb > 0) {
		if (ribWidth > 2 * axisRadius) {
			throw `err383: axisTorque ribWidth ${ffix(ribWidth)} larger than 2x axisRadius ${ffix(
				axisRadius
			)}`;
		}
		const aRibW2 = Math.asin(ribWidth / (2 * axisRadius));
		const aPeriod = (2 * Math.PI) / ribNb;
		if (aPeriod - 2.5 * aRibW2 < 0) {
			throw `err384: axisTorque ribWidth ${ffix(ribWidth)} or ribNb ${ribNb} are too large`;
		}
		if (ribRound1 > ribWidth / 2) {
			throw `err385: axisTorque ribRound1 ${ffix(
				ribRound1
			)} too large compare to ribWidth ${ffix(ribWidth)}`;
		}
		if (ribRound1 + ribRound2 > ribHeight) {
			throw `err386: axisTorque ribRound12 ${ffix(ribRound1)} ${ffix(
				ribRound2
			)} too large compare to ribHeight ${ffix(ribWidth)}`;
		}
		const arcLarge = aPeriod - 2 * aRibW2 > Math.PI ? true : false;
		const pt0 = point(cx, cy);
		const pt0z = pt0.translatePolar(initAngle, axisRadius + ribHeight);
		const pt0b = pt0z.translatePolar(initAngle + Math.PI / 2, ribWidth / 2);
		rCtr = contour(pt0b.cx, pt0b.cy);
		for (let i = 0; i < ribNb; i++) {
			const ribDir1 = initAngle + i * aPeriod;
			const ribDir2 = ribDir1 + aPeriod;
			const pt2 = pt0.translatePolar(ribDir1 + aRibW2, axisRadius);
			const pt3 = pt0.translatePolar(ribDir2 - aRibW2, axisRadius);
			const pt1z = pt0.translatePolar(ribDir1, axisRadius + ribHeight);
			const pt1 = pt1z.translatePolar(ribDir1 + Math.PI / 2, ribWidth / 2);
			const pt4z = pt0.translatePolar(ribDir2, axisRadius + ribHeight);
			const pt4 = pt4z.translatePolar(ribDir2 - Math.PI / 2, ribWidth / 2);
			rCtr.addSegStrokeA(pt1.cx, pt1.cy).addCornerRounded(ribRound1);
			rCtr.addSegStrokeA(pt2.cx, pt2.cy).addCornerRounded(ribRound2);
			rCtr.addPointA(pt3.cx, pt3.cy)
				.addSegArc(axisRadius, arcLarge, true)
				.addCornerRounded(ribRound2);
			rCtr.addSegStrokeA(pt4.cx, pt4.cy).addCornerRounded(ribRound1);
		}
		rCtr.closeSegStroke();
	}
	return rCtr;
}

function hollowStraight(
	cx: number,
	cy: number,
	hollowExt: number,
	hollowInt: number,
	spokeNb: number,
	spokeWidth: number,
	spokeRound: number,
	initAngle: number
): tContour[] {
	const aPeriod = (2 * Math.PI) / spokeNb;
	const aW2Int = Math.asin(spokeWidth / (2 * hollowInt));
	const aW2Ext = Math.asin(spokeWidth / (2 * hollowExt));
	if (spokeWidth > 2 * hollowInt) {
		throw `err905: hollowStraight spokeWidth ${ffix(spokeWidth)} too large for hollowInt ${ffix(
			hollowInt
		)}`;
	}
	if (hollowExt - hollowInt < 2.1 * spokeRound) {
		throw `err906: hollowStraight hollowExt ${ffix(hollowExt)}, hollowInt ${ffix(
			hollowInt
		)} and spokeRound ${ffix(spokeRound)} do not fit`;
	}
	// the formula of the following condition is approximate
	if (aPeriod - 2 * aW2Ext < 2.5 * Math.asin(spokeRound / hollowExt)) {
		throw `err907: hollowStraight spokeNb ${spokeNb}, spokeWidth ${ffix(
			spokeWidth
		)} or spokeRound ${ffix(spokeRound)} are too large`;
	}
	const dist5 = spokeWidth / (2 * Math.sin(aPeriod / 2));
	const triangle = aPeriod - 2 * aW2Int < 2.1 * Math.asin(spokeRound / hollowInt) ? true : false;
	const arcLarge = aPeriod - 2 * aW2Ext > Math.PI ? true : false;
	//console.log(`dbg908: triangle ${triangle}`);
	const pt0 = point(cx, cy);
	const rACtr: tContour[] = [];
	for (let i = 0; i < spokeNb; i++) {
		const aSpoke1 = initAngle + i * aPeriod;
		const aSpoke2 = aSpoke1 + aPeriod;
		const aSpoke5 = aSpoke1 + aPeriod / 2;
		const pt1 = pt0.translatePolar(aSpoke1 + aW2Ext, hollowExt);
		const pt2 = pt0.translatePolar(aSpoke2 - aW2Ext, hollowExt);
		const pt3 = pt0.translatePolar(aSpoke2 - aW2Int, hollowInt);
		const pt4 = pt0.translatePolar(aSpoke1 + aW2Int, hollowInt);
		const pt5 = pt0.translatePolar(aSpoke5, dist5);
		const ctr = contour(pt1.cx, pt1.cy);
		ctr.addCornerRounded(spokeRound);
		ctr.addPointA(pt2.cx, pt2.cy)
			.addSegArc(hollowExt, arcLarge, true)
			.addCornerRounded(spokeRound);
		if (triangle) {
			ctr.addSegStrokeA(pt5.cx, pt5.cy).addCornerRounded(spokeRound);
		} else {
			ctr.addSegStrokeA(pt3.cx, pt3.cy).addCornerRounded(spokeRound);
			ctr.addPointA(pt4.cx, pt4.cy)
				.addSegArc(hollowInt, arcLarge, false)
				.addCornerRounded(spokeRound);
		}
		ctr.closeSegStroke();
		rACtr.push(ctr);
	}
	return rACtr;
}
function hollowStraightArea(
	cx: number,
	cy: number,
	hollowExt: number,
	hollowInt: number,
	spokeNb: number,
	spokeWidth: number,
	spokeRound: number
): number {
	const rArea = cx + cy + hollowExt + hollowInt + spokeNb + spokeWidth + spokeRound;
	return rArea;
}

function axisProfile(
	wheelHeight: number,
	wheelMidExtra: number,
	wheelAxisLength: number,
	wheelAxisRadius: number,
	wheelMidRadius: number,
	wheelRadius: number,
	wheelAxisExtRound: number,
	wheelAxisIntRound: number,
	wheelExtraRound: number,
	rightNLeft: boolean
): tContour {
	const rln = rightNLeft ? 1 : -1;
	const wheelHeightHalf = wheelHeight / 2;
	const wheelHalfLength = wheelHeightHalf + wheelMidExtra;
	const axisHalfLength = wheelHalfLength + wheelAxisLength;
	const rCtr = contour(0, -axisHalfLength);
	rCtr.addSegStrokeA(rln * wheelAxisRadius, -axisHalfLength)
		.addCornerRounded(wheelAxisExtRound)
		.addSegStrokeA(rln * wheelAxisRadius, -wheelHalfLength)
		.addCornerRounded(wheelAxisIntRound)
		.addSegStrokeA(rln * wheelMidRadius, -wheelHalfLength)
		.addSegStrokeA(rln * wheelRadius, -wheelHeightHalf)
		.addCornerRounded(wheelExtraRound)
		.addSegStrokeA(rln * wheelRadius, wheelHeightHalf)
		.addCornerRounded(wheelExtraRound)
		.addSegStrokeA(rln * wheelMidRadius, wheelHalfLength)
		.addSegStrokeA(rln * wheelAxisRadius, wheelHalfLength)
		.addCornerRounded(wheelAxisIntRound)
		.addSegStrokeA(rln * wheelAxisRadius, axisHalfLength)
		.addCornerRounded(wheelAxisExtRound)
		.addSegStrokeA(0, axisHalfLength)
		.closeSegStroke();
	return rCtr;
}

export { axisTorque, hollowStraight, hollowStraightArea, axisProfile };
