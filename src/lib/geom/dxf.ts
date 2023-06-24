// dxf.ts

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
function dxfSeg(
	arc: boolean,
	p1x: number,
	p1y: number,
	radius: number,
	a1: number,
	a2: number,
	p2x: number,
	p2y: number
) {
	const rDxfSeg = new DxfSeg(arc, p1x, p1y, radius, a1, a2, p2x, p2y);
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

export type { DxfSeg };
export { dxfSeg, dxfWriter };
