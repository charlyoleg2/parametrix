// angle_utils.ts
// some useful functions manipulating angles
// angle_utils.ts has no dependency

const tolerance = 10 ** -4;

/* utils for angles */

function degToRad(degrees: number): number {
	return (degrees * Math.PI) / 180;
}

function radToDeg(rad: number): number {
	return (180 * rad) / Math.PI;
}

function roundZero(ix: number): number {
	let rx = ix;
	if (Math.abs(rx) < tolerance) {
		rx = 0;
	}
	return rx;
}

function withinZero2Pi(ia: number): number {
	let ra = ia % (2 * Math.PI);
	if (ra < 0) {
		//console.log(`dbg026: ${ra}`);
		ra += 2 * Math.PI;
	}
	return ra;
}

function withinPiPi(ia: number): number {
	let ra = withinZero2Pi(ia);
	if (ra > Math.PI) {
		ra -= 2 * Math.PI;
	}
	return ra;
}

function withinZeroPi(ia: number): number {
	let ra = ia % Math.PI;
	if (ra < 0) {
		ra += Math.PI;
	}
	return ra;
}

function withinHPiHPi(ia: number): number {
	let ra = withinZeroPi(ia);
	if (ra > Math.PI / 2) {
		ra -= Math.PI;
	}
	return ra;
}

function orientedArc(aStart: number, aStop: number, ccw: boolean): number {
	const arc = withinPiPi(aStop) - withinPiPi(aStart);
	const arc2 = ccw ? withinZero2Pi(arc) : withinZero2Pi(arc) - 2 * Math.PI;
	return arc2;
}

function isWithin(aNew: number, aStart: number, aStop: number, ccw: boolean): boolean {
	let rYes = false;
	if (roundZero(withinPiPi(aNew - aStart)) === 0) {
		rYes = true;
	} else if (roundZero(withinPiPi(aNew - aStop)) === 0) {
		rYes = true;
	} else {
		const arcOrig = orientedArc(aStart, aStop, ccw);
		const arcNew = orientedArc(aStart, aNew, ccw);
		if (Math.abs(arcNew) < Math.abs(arcOrig)) {
			rYes = true;
		}
	}
	return rYes;
}

/**
 * Calculate the coordiantes [X,Y] of B, starting from A[x,y] and translate with angle aAB and length lAB
 *
 *  @param ax: X-coordiante of point A
 *  @param ay: Y-coordiante of point A
 *  @param aAB: angle of translation vector AB in radian
 *  @param lAB: length of translation vector AB
 *  @returns [Bx, By] coordinates of point B
 */
function pointCoord(ax: number, ay: number, aAB: number, lAB: number): [number, number] {
	const rBx = ax + lAB * Math.cos(aAB);
	const rBy = ay + lAB * Math.sin(aAB);
	return [rBx, rBy];
}

function ffix(ifloat: number): string {
	return ifloat.toFixed(2);
}

/* export */

export {
	tolerance,
	degToRad,
	radToDeg,
	roundZero,
	withinZero2Pi,
	withinPiPi,
	withinZeroPi,
	withinHPiHPi,
	orientedArc,
	isWithin,
	pointCoord,
	ffix
};
