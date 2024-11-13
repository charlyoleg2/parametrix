// transform3d.ts
// A minimalist 3D-transform library

type tVec3 = [number, number, number];
type tVec4 = [number, number, number, number];
type tT3dMatrix = [tVec4, tVec4, tVec4, tVec4];

function t3dInitNull(): tT3dMatrix {
	const rM: tT3dMatrix = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
	return rM;
}

function t3dInitIdentity(): tT3dMatrix {
	const rM: tT3dMatrix = [
		[1, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1]
	];
	return rM;
}

function t3dRotateX(ax: number): tT3dMatrix {
	const rM = t3dInitIdentity();
	const cos = Math.cos(ax);
	const sin = Math.sin(ax);
	//rM[0][0] = 1;
	rM[1][1] = cos;
	rM[2][2] = cos;
	rM[2][1] = sin;
	rM[1][2] = -sin;
	return rM;
}

function t3dRotateY(ay: number): tT3dMatrix {
	const rM = t3dInitIdentity();
	const cos = Math.cos(ay);
	const sin = Math.sin(ay);
	//rM[1][1] = 1;
	rM[0][0] = cos;
	rM[2][2] = cos;
	rM[0][2] = sin;
	rM[2][0] = -sin;
	return rM;
}

function t3dRotateZ(az: number): tT3dMatrix {
	const rM = t3dInitIdentity();
	const cos = Math.cos(az);
	const sin = Math.sin(az);
	//rM[2][2] = 1;
	rM[0][0] = cos;
	rM[1][1] = cos;
	rM[0][1] = -sin;
	rM[1][0] = sin;
	return rM;
}

function t3dMatMultiply(ma: tT3dMatrix, mb: tT3dMatrix): tT3dMatrix {
	const rM = t3dInitNull();
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			let t = 0;
			for (let k = 0; k < 4; k++) {
				t += ma[i][k] * mb[k][j];
			}
			rM[i][j] = t;
		}
	}
	return rM;
}

function t3dCombine(tM: tT3dMatrix[]): tT3dMatrix {
	let rM = t3dInitIdentity();
	for (const tmi of tM) {
		rM = t3dMatMultiply(tmi, rM);
	}
	return rM;
}

function t3dRotate(ax: number, ay: number, az: number): tT3dMatrix {
	const rM = t3dCombine([t3dRotateX(ax), t3dRotateY(ay), t3dRotateZ(az)]);
	return rM;
}

function t3dTranslate(ax: number, ay: number, az: number): tT3dMatrix {
	const rM = t3dInitIdentity();
	rM[0][3] = ax;
	rM[1][3] = ay;
	rM[2][3] = az;
	return rM;
}

function t3dCopyMatrix(tm: tT3dMatrix): tT3dMatrix {
	const rM = t3dInitNull();
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			rM[i][j] = tm[i][j];
		}
	}
	return rM;
}

function t3dApply(ma: tT3dMatrix, va: tVec3): tVec3 {
	const vb: tVec4 = [va[0], va[1], va[2], 1];
	const rV: tVec3 = [0, 0, 0];
	for (let i = 0; i < 3; i++) {
		let t = 0;
		for (let k = 0; k < 4; k++) {
			t += ma[i][k] * vb[k];
		}
		rV[i] = t;
	}
	return rV;
}

function t3dGetTranslation(tm: tT3dMatrix): tVec3 {
	const rVT: tVec3 = [tm[0][3], tm[1][3], tm[2][3]];
	return rVT;
}

function t3dGetRotation(tm: tT3dMatrix): tVec3 {
	// found on stackOverflow and baeldung
	let ax = 0;
	let ay = 0;
	let az = 0;
	const tm20 = tm[2][0];
	const yota = 10 ** -5;
	if (Math.abs(tm20 - 1) < yota) {
		az = 0; // arbitrary set to 0, could be any number
		ay = -Math.PI / 2;
		ax = -az + Math.atan2(-tm[0][1], -tm[0][2]);
	} else if (Math.abs(tm20 + 1) < yota) {
		az = 0; // arbitray set to 0
		ay = Math.PI / 2;
		ax = az + Math.atan2(tm[0][1], tm[0][2]);
	} else {
		ax = Math.atan2(tm[2][1], tm[2][2]);
		ay = Math.atan2(-tm[2][0], Math.sqrt(tm[2][1] ** 2 + tm[2][2] ** 2));
		az = Math.atan2(tm[1][0], tm[0][0]);
	}
	const rVR: tVec3 = [ax, ay, az];
	return rVR;
}

class Transform3d {
	mmat: tT3dMatrix;
	constructor(iMat: tT3dMatrix) {
		this.mmat = t3dCopyMatrix(iMat);
	}
	addRotation(ax: number, ay: number, az: number): Transform3d {
		const mR = t3dRotate(ax, ay, az);
		this.mmat = t3dCombine([this.mmat, mR]);
		return this;
	}
	addTranslation(ax: number, ay: number, az: number): Transform3d {
		const mT = t3dTranslate(ax, ay, az);
		this.mmat = t3dCombine([this.mmat, mT]);
		return this;
	}
	getMatrix(): tT3dMatrix {
		return this.mmat;
	}
	getRotation(): tVec3 {
		const rVR = t3dGetRotation(this.mmat);
		return rVR;
	}
	getTranslation(): tVec3 {
		const rVT = t3dGetTranslation(this.mmat);
		return rVT;
	}
	transform(iv: tVec3): tVec3 {
		const rV = t3dApply(this.mmat, iv);
		return rV;
	}
}

const initMid = t3dInitIdentity();
function transform3d(initM = initMid): Transform3d {
	return new Transform3d(initM);
}

export type { tT3dMatrix, tVec4, tVec3 };
export { Transform3d, transform3d };
