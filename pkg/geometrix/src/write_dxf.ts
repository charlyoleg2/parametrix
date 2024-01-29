// write_dxf.ts

import { radToDeg, withinZero2Pi } from './angle_utils';

// floating precision for dxf export
function ff(ifloat: number): string {
	return ifloat.toFixed(4);
}

class DxfSeg {
	arc: boolean;
	p1x: number;
	p1y: number;
	radius: number;
	a1: number;
	a2: number;
	p2x: number;
	p2y: number;
	constructor(
		arc: boolean,
		p1x: number,
		p1y: number,
		radius: number,
		a1: number,
		a2: number,
		p2x: number,
		p2y: number
	) {
		this.arc = arc;
		this.p1x = p1x;
		this.p1y = p1y;
		this.radius = radius;
		this.a1 = a1;
		this.a2 = a2;
		this.p2x = p2x;
		this.p2y = p2y;
	}
}
function dxfSegLine(p1x: number, p1y: number, p2x: number, p2y: number): DxfSeg {
	const rDxfSeg = new DxfSeg(false, p1x, p1y, 0, 0, 0, p2x, p2y);
	return rDxfSeg;
}
function dxfSegArc(
	p1x: number,
	p1y: number,
	radius: number,
	aa1: number,
	aa2: number,
	arcCcw: boolean
): DxfSeg {
	//const a1 = aa1;
	//const a2 = aa2;
	const a1 = arcCcw ? aa1 : aa2;
	const a2 = arcCcw ? aa2 : aa1;
	// DXF angles are in degree and preferably positive
	const b1 = radToDeg(withinZero2Pi(a1));
	const b2 = radToDeg(withinZero2Pi(a2));
	const rDxfSeg = new DxfSeg(true, p1x, p1y, radius, b1, b2, 0, 0);
	return rDxfSeg;
}
function dxfSegCircle(p1x: number, p1y: number, radius: number): DxfSeg {
	const rDxfSeg = new DxfSeg(false, p1x, p1y, radius, 0, 0, 0, 0);
	return rDxfSeg;
}

class DxfWrite {
	dxfStr: string;
	constructor() {
		this.dxfStr = '0\nSECTION\n2\nENTITIES\n';
	}
	addCircle(cx: number, cy: number, radius: number) {
		this.dxfStr += '0\nCIRCLE\n8\nPARAMETRIX\n';
		this.dxfStr += `10\n${ff(cx)}\n20\n${ff(cy)}\n40\n${ff(radius)}\n`;
	}
	addLine(p1x: number, p1y: number, p2x: number, p2y: number) {
		this.dxfStr += '0\nLINE\n8\nPARAMETRIX\n';
		this.dxfStr += `10\n${ff(p1x)}\n20\n${ff(p1y)}\n11\n${ff(p2x)}\n21\n${ff(p2y)}\n`;
	}
	addArc(cx: number, cy: number, ra: number, a1: number, a2: number) {
		this.dxfStr += '0\nARC\n8\nPARAMETRIX\n';
		this.dxfStr += `10\n${ff(cx)}\n20\n${ff(cy)}\n40\n${ff(ra)}\n50\n${ff(a1)}\n51\n${ff(
			a2
		)}\n`;
	}
	close() {
		this.dxfStr += '0\nENDSEC\n0\nEOF\n';
	}
	stringify(): string {
		this.close();
		return this.dxfStr;
	}
}

function dxfWriter() {
	const rDxfWrite = new DxfWrite();
	return rDxfWrite;
}

export type { DxfSeg, DxfWrite };
export { dxfSegLine, dxfSegArc, dxfSegCircle, dxfWriter };
