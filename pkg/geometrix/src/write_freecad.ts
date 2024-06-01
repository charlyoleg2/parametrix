// write_freecad.ts

//import type { tContour } from './contour';
//import type { tOuterInner } from './figure';
//import * as segLib from './segment';
import { midArcPoint } from './contour';
import type {
	//tPaxContour,
	tPaxFace,
	tPaxContourCircle,
	tPaxContourPath,
	tPaxSeg,
	tPaxSegArc
} from './prepare_pax';
import { PSeg } from './prepare_pax';
import type { tPaxFigures, tPaxJson } from './write_pax';
import { convPaxToSeg1, paxWrite } from './write_pax';
import { zeroPDef } from './designParams';
import type { tGeom } from './aaParamGeom';
import type { tVolume, tInherit, tExtrude, tBVolume } from './volume';
import { EExtrude, EBVolume } from './volume';
//import { withinZero2Pi, radToDeg } from './angle_utils';
//import { radToDeg } from './angle_utils';
//import type { tAtsPoints } from './arc_to_stroke';
//import { circle_to_stroke, arc_to_stroke } from './arc_to_stroke';

// format floating for export precision
function ff(ifloat: number): string {
	return ifloat.toFixed(4);
}
// format index
function fid(iIdx: number): string {
	return iIdx.toString().padStart(3, '0');
}

function fcFaceCircle(cx: number, cy: number, radius: number, outName: string): string {
	const rStr = `def ${outName}():
	# Radius, XYZ-position, orientation
	aCircle = Part.makeCircle(${ff(radius)}, App.Vector(${ff(cx)}, ${ff(cy)}, 0), App.Vector(0, 0, 1))
	aWire = Part.Wire(aCircle)
	rFace = Part.Face(aWire)
	return rFace
\n`;
	return rStr;
}

function fcFaceContour(paxCtr: tPaxSeg[], outName: string): string {
	let rStr = `def ${outName}():\n`;
	let px1 = 0;
	let py1 = 0;
	let pIdx = 0;
	let sIdx = 0;
	for (const seg of paxCtr) {
		if (seg.typ === PSeg.eStart) {
			rStr += `	P${fid(pIdx)} = App.Vector(${ff(seg.px)}, ${ff(seg.py)}, 0)\n`;
			pIdx += 1;
		} else if (seg.typ === PSeg.eStroke) {
			rStr += `	P${fid(pIdx)} = App.Vector(${ff(seg.px)}, ${ff(seg.py)}, 0)\n`;
			rStr += `	S${fid(sIdx)} = Part.LineSegment(P${fid(pIdx - 1)}, P${fid(pIdx)})\n`;
			pIdx += 1;
			sIdx += 1;
		} else if (seg.typ === PSeg.eArc) {
			try {
				const seg1 = convPaxToSeg1(seg as tPaxSegArc);
				const p4 = midArcPoint(px1, py1, seg1);
				rStr += `	P${fid(pIdx)} = App.Vector(${ff(p4.cx)}, ${ff(p4.cy)}, 0)\n`;
				pIdx += 1;
			} catch (emsg) {
				console.log('err730: ' + (emsg as string));
			}
			rStr += `	P${fid(pIdx)} = App.Vector(${ff(seg.px)}, ${ff(seg.py)}, 0)\n`;
			rStr += `	S${fid(sIdx)} = Part.Arc(P${fid(pIdx - 2)}, P${fid(pIdx - 1)}), P${fid(pIdx)})\n`;
			pIdx += 1;
			sIdx += 1;
			//} else {
			//	throw `err725: write_freecad has unknown segment type ${seg.typ}`;
		}
		// all segements of Pax must update the last point
		px1 = seg.px;
		py1 = seg.py;
	}
	const segList = Array.from({ length: sIdx }, (v, i) => `S${fid(i)}`);
	rStr += `	aShape = Part.Shape([${segList.join(', ')}])
	aWire = Part.Wire(aShape.Edges)
	subFace = Part.Face(aWire)
	subFace.check()
	return subFace
\n`;
	return rStr;
}

function fcOneFace(ctrNames: string[], outName: string): string {
	let rStr = `def ${outName}():\n`;
	const ctrShorts: string[] = [];
	for (const [idx, ctr] of ctrNames.entries()) {
		const short = `FC${fid(idx)}`;
		rStr += `	${short} = ${ctr}()\n`;
		ctrShorts.push(short);
	}
	const outer = ctrShorts[0];
	const inner = ctrShorts.slice(1);
	if (inner.length > 0) {
		rStr += `	rOneFace = ${outer}.cut(${inner.join(', ')})\n`;
	} else {
		rStr += `	rOneFace = ${outer}\n`;
	}
	rStr += `	rOneFace.check()
	return rOneFace
\n`;
	return rStr;
}

function fcOneFig(faceNames: string[], outName: string): string {
	let rStr = `def ${outName}():\n`;
	const faceShorts: string[] = [];
	for (const [idx, face] of faceNames.entries()) {
		const short = `FA${fid(idx)}`;
		rStr += `	${short} = ${face}()\n`;
		faceShorts.push(short);
	}
	const firstFace = faceShorts[0];
	const otherFace = faceShorts.slice(1);
	if (otherFace.length > 0) {
		rStr += `	rOneFig = ${firstFace}.fuse(${otherFace.join(', ')})\n`;
	} else {
		rStr += `	rOneFig = ${firstFace}\n`;
	}
	rStr += `	rOneFig.check()
	return rOneFig
\n`;
	return rStr;
}

class FreecadWrite {
	//constructor() {}
	getHeader(): string {
		const rStr = `# freecad-python generated by Parametrix
# run the script with:
# freecad.cmd myScript.py

import FreeCAD as App
import Part
\n`;
		return rStr;
	}
	getOneFigure(aFaces: tPaxFace[], figName: string): string {
		let rStr = '';
		const figFaceList: string[] = [];
		for (const [faceIdx, paxFace] of aFaces.entries()) {
			const faceName = `face_${figName}_Fa${faceIdx}`;
			const faceCtrList: string[] = [];
			for (const [ctrIdx, paxCtr] of paxFace.entries()) {
				const subFaceName = `ctr_${faceName}_Ctr${ctrIdx}`;
				if (paxCtr.circle === true) {
					const paxCircle = paxCtr as tPaxContourCircle;
					rStr += fcFaceCircle(paxCircle.cx, paxCircle.cy, paxCircle.radius, subFaceName);
				} else {
					const paxPath = paxCtr as tPaxContourPath;
					rStr += fcFaceContour(paxPath.seg, subFaceName);
				}
				faceCtrList.push(subFaceName);
			}
			rStr += fcOneFace(faceCtrList, faceName);
			figFaceList.push(faceName);
		}
		rStr += fcOneFig(figFaceList, figName);
		return rStr;
	}
	getAllFigures(figs: tPaxFigures, partName: string): string {
		let rStr = '';
		for (const ifig in figs) {
			const figu = this.getOneFigure(figs[ifig], `${partName}_${ifig}`);
			rStr += figu;
		}
		return rStr;
	}
	getOneExtrude(extrud: tExtrude): string {
		let rStr = `FIG_${extrud.face} = ${extrud.face}()\n`;
		if (extrud.extrudeMethod === EExtrude.eLinearOrtho) {
			if (extrud.length === undefined) {
				throw `err103: ${extrud.face} ${extrud.outName} design error: eLinearOrtho length undefined!`;
			}
			rStr += `VEX_${extrud.face} = FIG_${extrud.face}.extrude(App.Vector(0, 0, ${extrud.length}))\n`;
		} else if (extrud.extrudeMethod === EExtrude.eRotate) {
			rStr += `VEX_${extrud.face} = FIG_${extrud.face}.rotate(App.Vector(0, 0, 0), App.Vector(1, 0, 0), 90).revolve(App.Vector(0, 0, 0), App.Vector(0, 0, 1), 360)\n`;
			//} else {
			//	throw `err185: unknown extrude-method ${extrud.extrudeMethod}`;
		}
		rStr += `
VR1_${extrud.face} = VEX_${extrud.face}.rotate(App.Vector(0, 0, 0), App.Vector(1, 0, 0), ${extrud.rotate[0]})
VR2_${extrud.face} = VR1_${extrud.face}.rotate(App.Vector(0, 0, 0), App.Vector(0, 1, 0), ${extrud.rotate[1]})
VR3_${extrud.face} = VR2_${extrud.face}.rotate(App.Vector(0, 0, 0), App.Vector(0, 0, 1), ${extrud.rotate[2]})
${extrud.outName} = VR3_${extrud.face}.translate(App.Vector(${extrud.translate[0]}, ${extrud.translate[1]}, ${extrud.translate[2]}))
\n`;
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
		let rStr = '';
		if (volum.inList.length === 0) {
			throw `err215: ${volum.outName} has an empty inList`;
		} else if (volum.inList.length === 1) {
			rStr += `${volum.outName} = ${volum.inList[0]}\n`;
		} else {
			const firstV = volum.inList[0];
			const othersV = volum.inList.slice(1);
			switch (volum.boolMethod) {
				case EBVolume.eIdentity:
					rStr += `${volum.outName} = ${firstV}\n`;
					break;
				case EBVolume.eIntersection:
					rStr += `${volum.outName} = ${firstV}.common(${othersV.join(', ')})\n`;
					break;
				case EBVolume.eUnion:
					rStr += `${volum.outName} = ${firstV}.fuse(${othersV.join(', ')})\n`;
					break;
				case EBVolume.eSubstraction:
					rStr += `${volum.outName} = ${firstV}.cut(${othersV.join(', ')})\n`;
					break;
			}
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
IVR1_${inherit.subdesign} = ${inherit.subdesign}.rotate(App.Vector(0, 0, 0), App.Vector(1, 0, 0), ${inherit.rotate[0]})
IVR2_${inherit.subdesign} = IVR1_${inherit.subdesign}.rotate(App.Vector(0, 0, 0), App.Vector(0, 1, 0), ${inherit.rotate[1]})
IVR3_${inherit.subdesign} = IVR2_${inherit.subdesign}.rotate(App.Vector(0, 0, 0), App.Vector(0, 0, 1), ${inherit.rotate[2]})
${inherit.outName} = IVR3_${inherit.subdesign}.translate(App.Vector(${inherit.translate[0]}, ${inherit.translate[1]}, ${inherit.translate[2]}))
\n`;
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
				rStr += this.getAllFigures(paxJson.figures, paxJson.partName);
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
pax_${partName}.check()
#pax_${partName}.exportBrep("${partName}.brep")
#pax_${partName}.exportIges("${partName}.igs")
#pax_${partName}.exportStep("${partName}.stp")
pax_${partName}.exportStl("${partName}.stl")
\n`;
		return rStr;
	}
	getExportFile(pax: tPaxJson) {
		let rStr = this.getHeader();
		rStr += this.getAllFigures(pax.figures, pax.partName);
		rStr += this.getVolume(pax.volume);
		rStr += this.getFooter(pax.partName);
		return rStr;
	}
}

function freecadWrite() {
	const rFreecadWrite = new FreecadWrite();
	return rFreecadWrite;
}

export { freecadWrite };
