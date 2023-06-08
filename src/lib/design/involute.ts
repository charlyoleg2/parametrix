// involute.ts
// the formula related to involute of circle

class Involute {
	base_center_x: number;
	base_center_y: number;
	base_radius: number;
	initial_angle: number;
	right_nleft: boolean;
	constructor(cx: number, cy: number, br: number, ia: number, rnl: boolean) {
		this.base_center_x = cx;
		this.base_center_y = cy;
		this.base_radius = br;
		this.initial_angle = ia;
		this.right_nleft = rnl;
	}
	// local polar coordinates (base circle center sets at x:0,y:0)
	angleSign(): number {
		const sign = this.right_nleft ? 1 : -1;
		return sign;
	}
	lFromU(au: number): number {
		const rl = this.base_radius * Math.sqrt(1 + au ** 2);
		return rl;
	}
	wFromU(au: number): number {
		if (au < 0) {
			throw `err729: involute parameter au ${au} is negative`;
		}
		if (Math.abs(au) > Math.PI / 2) {
			throw `err730: involute parameter au ${au} is larger than PI/2`;
		}
		const sign = this.angleSign();
		const rw = this.initial_angle + sign * (au - Math.atan(au));
		return rw;
	}
	// Point C of the involute in cartesian coordinates
	ptc(au: number): Array<number> {
		const lcl = this.lFromU(au);
		const lcw = this.wFromU(au);
		const ptcx = this.base_center_x + Math.cos(lcw) * lcl;
		const ptcy = this.base_center_y + Math.sin(lcw) * lcl;
		return [ptcx, ptcy];
	}
	// angle of the tangent inclination of the Point C of the involute
	ptcta(au: number): number {
		const rta = this.initial_angle + au;
		return rta;
	}
	// get u from L
	uFromL(ll: number): number {
		const ru = Math.sqrt(ll ** 2 / this.base_radius ** 2 - 1);
		return ru;
	}
	// get u from w
	uFromWslow(lw: number): number {
		const tolerance = 10 ** -4;
		let itu = Math.PI / 3;
		let itdu = itu / 2;
		let itw = this.wFromU(itu);
		let itcnt = 0;
		while (Math.abs(itw - lw) > tolerance) {
			if (itw < lw) {
				itu += itdu;
			} else {
				itu -= itdu;
			}
			itw = this.wFromU(itu);
			itdu = itdu / 2;
			itcnt += 1;
		}
		console.log(`dbg072: uFromWslow itcnt ${itcnt}`);
		return itu;
	}
	// line of action
	// acc: angle of center-center line
	// ap: angle of pressue relative to the center-center line
	// ar: angle of rotation from the start of the line of action
	// return
	// x,y of point C
	// vax, vay of speed vector of point C in line of action reference
	//laptc(acc: number, ap: number, ar: number): Array<number> {
	//
	//}
}

function involute(cx: number, cy: number, br: number, ia: number, rnl: boolean): Involute {
	const rinvolute = new Involute(cx, cy, br, ia, rnl);
	return rinvolute;
}

export { involute };