// triangle_utils.ts
// some functions around triangle
// triangle_utils.ts dependences on angle_utils.ts

//import { degToRad, radToDeg, roundZero, withinZero2Pi, withinPiPi, withinZeroPi, withinHPiHPi } from './angle_utils';
import { roundZero, withinZeroPi, withinPiPi } from './angle_utils';

/* right triangle
 *	sides: la [hypothenuse], lb, lc
 *	angles: aA [right angle], aB, aC
 * */

function rightTriLaFromLbLc(ilb: number, ilc: number): number {
	return Math.sqrt(ilb ** 2 + ilc ** 2);
}

function rightTriLbFromLaLc(ila: number, ilc: number): number {
	let rlb = 0;
	if (ilc > ila) {
		throw `err539: ila < ilc ${ila} ${ilc}`;
	} else {
		rlb = Math.sqrt(ila ** 2 - ilc ** 2);
	}
	return rlb;
}

/* any triangle
 * sides: la, lb, lc
 * angles: aA, aB, aC
 * */

function lcFromLaLbAc(la: number, lb: number, ac: number): number {
	const rlc = Math.sqrt(la ** 2 + lb ** 2 - 2 * la * lb * Math.cos(ac));
	return rlc;
}

function aCFromLaLbLc(la: number, lb: number, lc: number): number {
	let rac = 0;
	const l3 = [la, lb, lc];
	for (let i = 0; i < l3.length; i++) {
		if (l3[i] < 0) {
			throw `err209: l3[${i}] = ${l3[i]}`;
		}
	}
	const l3s = l3.sort(function (a, b) {
		return b - a;
	});
	//console.log(l3s);
	if (l3s[0] > l3s[1] + l3s[2]) {
		throw `err839: impossible triangle with length ${la}, ${lb} and ${lc}`;
	} else {
		rac = Math.acos((la ** 2 + lb ** 2 - lc ** 2) / (2 * la * lb));
	}
	return rac;
}

function aCFromAaAb(iaA: number, iaB: number): number {
	let rac = 0;
	const aA = Math.abs(withinPiPi(iaA));
	const aB = Math.abs(withinPiPi(iaB));
	const sum = aA + aB;
	if (sum > Math.PI) {
		throw `err739: impossible triangle with angles ${iaA} and ${iaB}`;
	} else {
		rac = Math.PI - sum;
	}
	return rac;
}

function lbFromLaAaAb(ila: number, iaA: number, iaB: number): number {
	let rlb = 0;
	const args = [ila, iaA, iaB];
	for (let i = 0; i < args.length; i++) {
		if (roundZero(args[i]) === 0 || args[i] < 0) {
			throw `err329: negative or zero triangle-args ${i} : ${args[i]}`;
		}
	}
	const aA = withinZeroPi(iaA);
	const aB = withinZeroPi(iaB);
	const sum = aA + aB;
	if (sum > Math.PI) {
		throw `err939: impossible triangle with angles ${iaA} and ${iaB}`;
	} else {
		rlb = (ila * Math.sin(iaB)) / Math.sin(iaA);
	}
	return rlb;
}

// it works only with angle within -PI/2 and PI/2 because arcsinus()
function aBFromLaLbAa(ila: number, ilb: number, iaA: number): number {
	let rab = 0;
	const args = [ila, ilb, iaA];
	for (let i = 0; i < args.length; i++) {
		if (args[i] <= 0) {
			throw `err429: negative or zero triangle-args ${i} : ${args[i]}`;
		}
	}
	rab = Math.asin((ilb * Math.sin(iaA)) / ila);
	return rab;
}

/* export */

export {
	rightTriLaFromLbLc,
	rightTriLbFromLaLc,
	lcFromLaLbAc,
	aCFromLaLbLc,
	aCFromAaAb,
	lbFromLaAaAb,
	aBFromLaLbAa
};
