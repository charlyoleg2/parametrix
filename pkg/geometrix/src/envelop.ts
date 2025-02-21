// envelop.ts

interface tEnvelop {
	xMin: number;
	xMax: number;
	yMin: number;
	yMax: number;
	orientation: boolean;
}

class Envelop {
	/** @internal */
	pEnvelop: tEnvelop = { xMin: 0, xMax: 0, yMin: 0, yMax: 0, orientation: true };
	constructor(iEnvelop: tEnvelop) {
		this.pEnvelop.xMin = iEnvelop.xMin;
		this.pEnvelop.xMax = iEnvelop.xMax;
		this.pEnvelop.yMin = iEnvelop.yMin;
		this.pEnvelop.yMax = iEnvelop.yMax;
		this.pEnvelop.orientation = iEnvelop.orientation;
	}
	add(iEnvelop: tEnvelop): boolean {
		let rChange = false;
		if (iEnvelop.xMin < this.pEnvelop.xMin) {
			rChange = true;
			this.pEnvelop.xMin = iEnvelop.xMin;
			this.pEnvelop.orientation = iEnvelop.orientation;
		}
		if (iEnvelop.xMax > this.pEnvelop.xMax) {
			this.pEnvelop.xMax = iEnvelop.xMax;
		}
		if (iEnvelop.yMin < this.pEnvelop.yMin) {
			this.pEnvelop.yMin = iEnvelop.yMin;
		}
		if (iEnvelop.yMax > this.pEnvelop.yMax) {
			this.pEnvelop.yMax = iEnvelop.yMax;
		}
		return rChange;
	}
	check(iEnvelop: tEnvelop): boolean {
		let rOk = false;
		const epsilon = 10 ** -2;
		if (
			iEnvelop.xMin < this.pEnvelop.xMin + epsilon &&
			iEnvelop.xMax > this.pEnvelop.xMax - epsilon &&
			iEnvelop.yMin < this.pEnvelop.yMin + epsilon &&
			iEnvelop.yMax > this.pEnvelop.yMax - epsilon
		) {
			rOk = true;
		}
		return rOk;
	}
}

function envelop(iEnvelop: tEnvelop): Envelop {
	return new Envelop(iEnvelop);
}

export type { tEnvelop, Envelop };
export { envelop };
