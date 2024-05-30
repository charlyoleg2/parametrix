// aaExportContent.ts

import type { tParamDef, tParamVal } from './designParams';
import type { tGeom } from './aaParamGeom';
import { colors } from './canvas_utils';
import { Point, point, pointMinMax } from './point';
import type { tContour } from './contour';
import type { Figure } from './figure';
import { mergeFaces } from './figure';
import type { SvgWriter } from './write_svg';
import { zeroPDef } from './designParams';
import { svgWriter } from './write_svg';
import { dxfWriter } from './write_dxf';
import { paxWrite } from './write_pax';
import { oscadWrite } from './write_openscad';
import { ojscadWrite } from './write_openjscad';
import { freecadWrite } from './write_freecad';
import * as zip from '@zip.js/zip.js';

// SVG
class MinMaxPoint {
	xMin: number;
	xMax: number;
	yMin: number;
	yMax: number;
	firstDone: boolean;
	constructor() {
		this.firstDone = false;
		this.xMin = 0;
		this.xMax = 0;
		this.yMin = 0;
		this.yMax = 0;
	}
	addAContour(aCtr: tContour[]) {
		if (aCtr.length > 0) {
			const pts: Point[] = [];
			if (this.firstDone) {
				pts.push(point(this.xMin, this.yMin));
				pts.push(point(this.xMax, this.yMax));
			}
			for (const ctr of aCtr) {
				pts.push(...ctr.generatePoints());
			}
			const [Xmin, Xmax, Ymin, Ymax] = pointMinMax(pts);
			this.xMin = Xmin;
			this.xMax = Xmax;
			this.yMin = Ymin;
			this.yMax = Ymax;
		}
	}
	getViewBox() {
		const Xdelta = Math.round((this.xMax - this.xMin) * 1.1) + 10;
		const Ydelta = Math.round((this.yMax - this.yMin) * 1.1) + 10;
		const Xmin2 = Math.round(this.xMin - Xdelta * 0.05);
		const Ymin2 = Math.round(this.yMin - Ydelta * 0.05);
		return [Xmin2, Xdelta, Ymin2, Ydelta];
	}
}

interface tGroup {
	gpName: string;
	gpColor: string;
	ctrs: tContour[];
}

class SvgWriter2 {
	minMax: MinMaxPoint;
	groups: tGroup[];
	svg: SvgWriter;
	constructor() {
		this.minMax = new MinMaxPoint();
		this.groups = [];
		this.svg = svgWriter();
	}
	addAContour(aCtrs: tContour[], groupId = '', icolor = colors.contour) {
		this.minMax.addAContour(aCtrs);
		const grp: tGroup = { gpName: groupId, gpColor: icolor, ctrs: aCtrs };
		this.groups.push(grp);
	}
	makeSvg(yCeiling: number) {
		for (const grp of this.groups) {
			if (grp.gpName !== '') {
				this.svg.addGroup(grp.gpName);
			}
			for (const ctr of grp.ctrs) {
				let ctrColor = ctr.imposedColor;
				if (ctrColor === '') {
					ctrColor = grp.gpColor;
				}
				this.svg.addSvgString(ctr.toSvg(yCeiling, ctrColor));
			}
			if (grp.gpName !== '') {
				this.svg.closeGroup();
			}
		}
	}
	stringify() {
		const [Xmin2, Xdelta, Ymin2, Ydelta] = this.minMax.getViewBox();
		this.svg.addHeader(Xmin2, Xdelta, Ymin2, Ydelta);
		this.makeSvg(this.minMax.yMax + this.minMax.yMin);
		return this.svg.stringify();
	}
}
function svgWriter2(): SvgWriter2 {
	const rSvgWriter2 = new SvgWriter2();
	return rSvgWriter2;
}
function figureToSvg(aCtr: tContour[]): string {
	const sw2 = svgWriter2();
	sw2.addAContour(aCtr);
	return sw2.stringify();
}
function figureToSvgDeco(fig: Figure) {
	const sw2 = svgWriter2();
	sw2.addAContour(fig.mainList, 'main', colors.main);
	sw2.addAContour(fig.mainBList, 'mainB', colors.mainB);
	sw2.addAContour(fig.secondList, 'second', colors.second);
	sw2.addAContour(fig.secondBList, 'secondB', colors.secondB);
	sw2.addAContour(fig.dynamicsList, 'dynamics', colors.dynamics);
	const rSvgDeco = sw2.stringify();
	return rSvgDeco;
}

// DXF
function figureToDxf(aCtr: tContour[]): string {
	const dxf = dxfWriter();
	//const firstDxfLayer = dxf.addLayer('first');
	for (const ctr of aCtr) {
		if (ctr.circle) {
			const seg = ctr.toDxfSeg()[0];
			dxf.addCircle(seg.p1x, seg.p1y, seg.radius);
		} else {
			for (const seg of ctr.toDxfSeg()) {
				if (seg.arc) {
					dxf.addArc(seg.p1x, seg.p1y, seg.radius, seg.a1, seg.a2);
				} else {
					dxf.addLine(seg.p1x, seg.p1y, seg.p2x, seg.p2y);
				}
			}
		}
	}
	const rDxf = dxf.stringify();
	return rDxf;
}

// TXTLOG
function makeLog(geome0: tGeom): string {
	let rStr = '';
	rStr += geome0.logstr;
	return rStr;
}

// PAX
function makePax(paramVal: tParamVal, geome0: tGeom, ipDef: tParamDef): string {
	const rStr = paxWrite().getPaxStr(paramVal, geome0, ipDef);
	return rStr;
}

// OpenSCad
function makeOpenscad(geome0: tGeom): string {
	const paxJson = paxWrite().getPaxJson({}, geome0, zeroPDef);
	const rStr = oscadWrite().getExportFile(paxJson);
	return rStr;
}

// OpenJSCAD
function makeOpenjscad(geome0: tGeom): string {
	const paxJson = paxWrite().getPaxJson({}, geome0, zeroPDef);
	const rStr = ojscadWrite().getExportFile(paxJson);
	return rStr;
}

// Freecad
function makeFreecad(geome0: tGeom): string {
	const paxJson = paxWrite().getPaxJson({}, geome0, zeroPDef);
	const rStr = freecadWrite().getExportFile(paxJson);
	return rStr;
}

// ZIP
async function makeZip(
	paramVal: tParamVal,
	geome0: tGeom,
	tSim: number,
	geome1: tGeom,
	ipDef: tParamDef
): Promise<Blob> {
	// zip writer preparation
	const zipFileWriter = new zip.BlobWriter('application/zip');
	const zipWriter = new zip.ZipWriter(zipFileWriter);
	const partName = geome0.partName;
	// zip payload
	const zParam = new zip.TextReader(JSON.stringify(paramVal, null, 2));
	await zipWriter.add(`param_${partName}.json`, zParam);
	const zLog0 = new zip.TextReader(geome0.logstr);
	await zipWriter.add(`geom_${partName}_log.txt`, zLog0);
	const zLog1 = new zip.TextReader(geome1.logstr);
	await zipWriter.add(`geom_${partName}_t${tSim}_log.txt`, zLog1);
	for (const face in geome0.fig) {
		const svgOne = new zip.TextReader(figureToSvg(geome0.fig[face].mainList));
		await zipWriter.add(`face_${partName}_${face}.svg`, svgOne);
		const dxfOne = new zip.TextReader(figureToDxf(geome0.fig[face].mainList));
		await zipWriter.add(`face_${partName}_${face}.dxf`, dxfOne);
		const svgOneDeco = new zip.TextReader(figureToSvgDeco(geome0.fig[face]));
		await zipWriter.add(`deco_${partName}_${face}.svg`, svgOneDeco);
		const svgOneDecoT = new zip.TextReader(figureToSvgDeco(geome1.fig[face]));
		await zipWriter.add(`deco_${partName}_${face}_t${tSim}.svg`, svgOneDecoT);
	}
	const mergedFace = mergeFaces(geome0.fig);
	const svgMerged = new zip.TextReader(figureToSvg(mergedFace.mainList));
	await zipWriter.add(`face_${partName}_all_merged.svg`, svgMerged);
	const dxfMerged = new zip.TextReader(figureToDxf(mergedFace.mainList));
	await zipWriter.add(`face_${partName}_all_merged.dxf`, dxfMerged);
	const svgMergedDeco = new zip.TextReader(figureToSvgDeco(mergedFace));
	await zipWriter.add(`deco_${partName}_all_merged.svg`, svgMergedDeco);
	const svgMergedDecoT = new zip.TextReader(figureToSvgDeco(mergedFace));
	await zipWriter.add(`deco_${partName}_all_merged_t${tSim}.svg`, svgMergedDecoT);
	const zPax = new zip.TextReader(makePax(paramVal, geome0, ipDef));
	await zipWriter.add(`${partName}.pax.json`, zPax);
	const zSCad = new zip.TextReader(makeOpenscad(geome0));
	await zipWriter.add(`${partName}_noarc_openscad.scad`, zSCad);
	const zJScad = new zip.TextReader(makeOpenjscad(geome0));
	await zipWriter.add(`${partName}_noarc_jscad.js`, zJScad);
	const zFreecad = new zip.TextReader(makeFreecad(geome0));
	await zipWriter.add(`${partName}_freecad.py`, zFreecad);
	// zip writer finalization
	await zipWriter.close();
	const rFileContent = await zipFileWriter.getData();
	return rFileContent;
}

export {
	figureToSvg,
	figureToDxf,
	makeLog,
	makePax,
	makeOpenscad,
	makeOpenjscad,
	makeFreecad,
	makeZip
};
