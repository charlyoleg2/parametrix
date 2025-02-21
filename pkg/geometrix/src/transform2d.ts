// transform2d.ts
// A minimalist 2D-transform library

type tVec2 = [number, number];
type tVec3b = [number, number, number];
type tT2dMatrix = [tVec3b, tVec3b, tVec3b];

function t2dInitNull(): tT2dMatrix {
	const rM: tT2dMatrix = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	];
	return rM;
}

function t2dInitIdentity(): tT2dMatrix {
	const rM: tT2dMatrix = [
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1]
	];
	return rM;
}

function t2dRotate(az: number): tT2dMatrix {
	const rM = t2dInitIdentity();
	const cos = Math.cos(az);
	const sin = Math.sin(az);
	//rM[2][2] = 1;
	rM[0][0] = cos;
	rM[1][1] = cos;
	rM[0][1] = -sin;
	rM[1][0] = sin;
	return rM;
}

function t2dMatMultiply(ma: tT2dMatrix, mb: tT2dMatrix): tT2dMatrix {
	const rM = t2dInitNull();
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			let t = 0;
			for (let k = 0; k < 3; k++) {
				t += ma[i][k] * mb[k][j];
			}
			rM[i][j] = t;
		}
	}
	return rM;
}

function t2dCombine(tM: tT2dMatrix[]): tT2dMatrix {
	let rM = t2dInitIdentity();
	for (const tmi of tM) {
		rM = t2dMatMultiply(tmi, rM);
	}
	return rM;
}

function t2dTranslate(ax: number, ay: number): tT2dMatrix {
	const rM = t2dInitIdentity();
	rM[0][2] = ax;
	rM[1][2] = ay;
	return rM;
}

function t2dCopyMatrix(tm: tT2dMatrix): tT2dMatrix {
	const rM = t2dInitNull();
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			rM[i][j] = tm[i][j];
		}
	}
	return rM;
}

function t2dApply(ma: tT2dMatrix, va: tVec2): tVec2 {
	const vb: tVec3b = [va[0], va[1], 1];
	const rV: tVec2 = [0, 0];
	for (let i = 0; i < 2; i++) {
		let t = 0;
		for (let k = 0; k < 3; k++) {
			t += ma[i][k] * vb[k];
		}
		rV[i] = t;
	}
	return rV;
}

function t2dGetTranslation(tm: tT2dMatrix): tVec2 {
	const rVT: tVec2 = [tm[0][2], tm[1][2]];
	return rVT;
}

function t2dGetRotation(tm: tT2dMatrix): number {
	const rAz = Math.atan2(tm[1][0], tm[0][0]);
	return rAz;
}

class Transform2d {
	mmat: tT2dMatrix;
	constructor(iMat: tT2dMatrix) {
		this.mmat = t2dCopyMatrix(iMat);
	}
	addRotation(az: number): this {
		const mR = t2dRotate(az);
		this.mmat = t2dCombine([this.mmat, mR]);
		return this;
	}
	addTranslation(ax: number, ay: number): this {
		const mT = t2dTranslate(ax, ay);
		this.mmat = t2dCombine([this.mmat, mT]);
		return this;
	}
	getMatrix(): tT2dMatrix {
		return this.mmat;
	}
	getRotation(): number {
		const rVR = t2dGetRotation(this.mmat);
		return rVR;
	}
	getTranslation(): tVec2 {
		const rVT = t2dGetTranslation(this.mmat);
		return rVT;
	}
	transform(iv: tVec2): tVec2 {
		const rV = t2dApply(this.mmat, iv);
		return rV;
	}
}

const initMid = t2dInitIdentity();
function transform2d(initM = initMid): Transform2d {
	return new Transform2d(initM);
}

export type { tT2dMatrix, tVec2, tVec3b };
export { Transform2d, transform2d };
