// write_openscad.ts

//import type { tContour } from './contour';
//import type { tFaces } from './figure';
import * as segLib from './segment';
import type {
	tPaxContour,
	tPaxContourCircle,
	tPaxContourPath,
	tPaxSeg,
	tPaxSegArc
} from './prepare_pax';
import { PSeg } from './prepare_pax';
import type { tPaxFaces, tPaxJson } from './write_pax';
import { convTypePaxToSeg1, paxWrite } from './write_pax';
import { zeroPDef } from './designParams';
import type { tGeom } from './aaParamGeom';
import type { tVolume, tInherit, tExtrude, tBVolume } from './volume';
import { EExtrude, EBVolume } from './volume';
//import { withinZero2Pi, radToDeg } from './angle_utils';
import { radToDeg } from './angle_utils';
import type { tAtsPoints } from './arc_to_stroke';
import { circle_to_stroke, arc_to_stroke } from './arc_to_stroke';

type tOpenscadSeg = tAtsPoints;

const approxMaxAngle = Math.PI / 100;
const approxMaxLength = 0.5;

function oscadSegLine(p2x: number, p2y: number): tOpenscadSeg {
	const rSeg: tOpenscadSeg = [[p2x, p2y]];
	return rSeg;
}
function oscadSegArc(
	cx: number,
	cy: number,
	radius: number,
	aa1: number,
	aa2: number,
	arcCcw: boolean
): tOpenscadSeg {
	const rSeg = arc_to_stroke(cx, cy, radius, aa1, aa2, arcCcw, approxMaxAngle, approxMaxLength);
	return rSeg;
}
function oscadSegCircle(cx: number, cy: number, radius: number): tOpenscadSeg {
	const rSeg = circle_to_stroke(cx, cy, radius, approxMaxAngle, approxMaxLength);
	return rSeg;
}

function toOpenscadSeg(paxCtr: tPaxSeg[]): tOpenscadSeg {
	const rOscadSeg: tOpenscadSeg = [];
	let px1 = 0;
	let py1 = 0;
	for (const seg of paxCtr) {
		if (seg.typ === PSeg.eStart) {
			rOscadSeg.push(...oscadSegLine(seg.px, seg.py));
		} else if (seg.typ === PSeg.eStroke) {
			rOscadSeg.push(...oscadSegLine(seg.px, seg.py));
		} else if (seg.typ === PSeg.eArc) {
			try {
				const sega = seg as tPaxSegArc;
				const seg1 = new segLib.Segment1(
					convTypePaxToSeg1(sega.typ),
					sega.px,
					sega.py,
					sega.radius,
					sega.large,
					sega.ccw
				);
				const seg2 = segLib.arcSeg1To2(px1, py1, seg1);
				rOscadSeg.push(
					...oscadSegArc(
						seg2.pc.cx,
						seg2.pc.cy,
						seg1.radius,
						seg2.a1,
						seg2.a2,
						seg2.arcCcw
					)
				);
			} catch (emsg) {
				console.log('err730: ' + (emsg as string));
			}
			//} else {
			//	console.log(`err725: write_openscad toOpenscadSeg has unknown segment type ${seg.typ}`);
		}
		// all segements of Pax must update the last point
		px1 = seg.px;
		py1 = seg.py;
	}
	return rOscadSeg;
}

// floating precision for OpenScad export
function ff(ifloat: number): string {
	return ifloat.toFixed(10);
}

class OpenscadWriteFigure {
	pts: string[];
	ptIdx: string[];
	idx: number;
	constructor() {
		this.pts = [];
		this.ptIdx = [];
		this.idx = 0;
	}
	addContour(ictr: tOpenscadSeg) {
		const pts2: string[] = [];
		const ptIdx2: string[] = [];
		for (const pt of ictr) {
			const [px, py] = pt;
			pts2.push(`[ ${ff(px)}, ${ff(py)} ]`);
			ptIdx2.push(` ${this.idx}`);
			this.idx += 1;
		}
		const ptStr = `[ ${pts2.join(',')} ]`;
		const ptIdxStr = `[ ${ptIdx2.join(',')} ]`;
		this.pts.push(ptStr);
		this.ptIdx.push(ptIdxStr);
	}
	getFigure(faceId: string): string {
		let rStr = '';
		const aList: string[] = [];
		const bList: string[] = [];
		for (const idx of this.pts.keys()) {
			const aId = `ca_${faceId}_${idx}`;
			const bId = `cb_${faceId}_${idx}`;
			rStr += `${aId} = ${this.pts[idx]};\n`;
			rStr += `${bId} = ${this.ptIdx[idx]};\n`;
			aList.push(aId);
			bList.push(bId);
		}
		const aListStr = aList.join(', ');
		const bListStr = bList.join(', ');
		rStr += `a_${faceId} = concat(${aListStr});\n`;
		rStr += `b_${faceId} = [${bListStr}];\n`;
		return rStr;
	}
}

class OpenscadWrite {
	//constructor() {}
	getHeader(): string {
		const rStr = '// Generated by Parametrix\n';
		return rStr;
	}
	getOneFigure(aCtr: tPaxContour[], faceId: string): string {
		const oscadWF = new OpenscadWriteFigure();
		for (const paxCtr of aCtr) {
			if (paxCtr.circle === true) {
				const paxCircle = paxCtr as tPaxContourCircle;
				const oscadSeg = oscadSegCircle(paxCircle.cx, paxCircle.cy, paxCircle.radius);
				oscadWF.addContour(oscadSeg);
			} else {
				const paxPath = paxCtr as tPaxContourPath;
				const oscadSeg = toOpenscadSeg(paxPath.seg);
				oscadWF.addContour(oscadSeg);
			}
		}
		const rOscadF = oscadWF.getFigure(faceId);
		return rOscadF;
	}
	getAllFigures(faces: tPaxFaces, partName: string): string {
		let rStr = '';
		for (const face in faces) {
			const figu = this.getOneFigure(faces[face], `${partName}_${face}`);
			rStr += figu;
		}
		return rStr;
	}
	getOneExtrude(extrud: tExtrude): string {
		let extrudMethod = 'rotate_extrude';
		let extrudOption = '';
		if (extrud.extrudeMethod === EExtrude.eLinearOrtho) {
			if (extrud.length === undefined) {
				console.log('err103: design error: scad-linear_extrude length undefined!');
			}
			extrudMethod = 'linear_extrude';
			extrudOption = `height = ${extrud.length}`;
		}
		const rStr = `
module ${extrud.outName} () {
	translate( [ ${extrud.translate[0]}, ${extrud.translate[1]}, ${extrud.translate[2]} ])
		rotate( [ ${radToDeg(extrud.rotate[0])}, ${radToDeg(extrud.rotate[1])}, ${radToDeg(
			extrud.rotate[2]
		)} ])
			   ${extrudMethod}(${extrudOption}) polygon(a_${extrud.face}, b_${extrud.face});
}
`;
		return rStr;
	}
	getAllExtrudes(extrudes: tExtrude[]): string {
		let rStr = '';
		for (const extrud of extrudes) {
			const subp = this.getOneExtrude(extrud);
			rStr += subp;
		}
		return rStr;
	}
	getOneVolume(volum: tBVolume): string {
		let vMethod = 'identity';
		switch (volum.boolMethod) {
			case EBVolume.eIntersection:
				vMethod = 'intersection';
				break;
			case EBVolume.eUnion:
				vMethod = 'union';
				break;
			case EBVolume.eSubstraction:
				vMethod = 'difference';
				break;
		}
		const inList2 = [];
		for (const elem of volum.inList) {
			inList2.push(`${elem}();`);
		}
		const inList3 = inList2.join('\n');
		let rStr = `
module ${volum.outName} () {
	${vMethod} () {
		${inList3}
	}
}
`;
		if (volum.boolMethod === EBVolume.eIdentity) {
			rStr = `
module ${volum.outName} () {
	${inList3}
}
`;
		}
		return rStr;
	}
	getAllVolumes(volumes: tBVolume[]): string {
		let rStr = '';
		for (const volum of volumes) {
			const subp = this.getOneVolume(volum);
			rStr += subp;
		}
		return rStr;
	}
	getAllSubGeoms(inherits: tInherit[]): tGeom[] {
		const rGeoms: tGeom[] = [];
		for (const inher of inherits) {
			if (!rGeoms.includes(inher.subgeom)) {
				rGeoms.push(inher.subgeom);
			}
		}
		return rGeoms;
	}
	getOneInherit(inherit: tInherit): string {
		const rStr = `
module ${inherit.outName} () {
	translate( [ ${inherit.translate[0]}, ${inherit.translate[1]}, ${inherit.translate[2]} ])
		rotate( [ ${radToDeg(inherit.rotate[0])}, ${radToDeg(inherit.rotate[1])}, ${radToDeg(
			inherit.rotate[2]
		)} ])
			   ${inherit.subdesign}();
}
`;
		return rStr;
	}
	getAllInherits(inherits: tInherit[]): string {
		let rStr = '';
		for (const inher of inherits) {
			const subinhe = this.getOneInherit(inher);
			rStr += subinhe;
		}
		return rStr;
	}
	getVolume(vol: tVolume): string {
		let rStr = '';
		if (vol.inherits !== undefined) {
			const subGeoms = this.getAllSubGeoms(vol.inherits);
			for (const oneGeom of subGeoms) {
				const paxJson = paxWrite().getPaxJson({}, oneGeom, zeroPDef);
				rStr += this.getAllFigures(paxJson.faces, paxJson.partName);
				rStr += this.getVolume(oneGeom.vol);
			}
			rStr += this.getAllInherits(vol.inherits);
		}
		rStr += this.getAllExtrudes(vol.extrudes);
		rStr += this.getAllVolumes(vol.volumes);
		return rStr;
	}
	getFooter(partName: string): string {
		const rStr = `
pax_${partName}();
`;
		return rStr;
	}
	getExportFile(pax: tPaxJson) {
		let rStr = this.getHeader();
		rStr += this.getAllFigures(pax.faces, pax.partName);
		rStr += this.getVolume(pax.volume);
		rStr += this.getFooter(pax.partName);
		return rStr;
	}
}

function oscadWrite() {
	const rOscadWrite = new OpenscadWrite();
	return rOscadWrite;
}

export { oscadWrite };
