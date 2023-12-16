// aaExportFile.ts

import type { tParamVal } from './designParams';
import type { tGeomFunc } from './aaParamGeom';
import {
	figureToSvg,
	figureToDxf,
	makePax,
	makeOpenscad,
	makeOpenjscad,
	makeZip
} from './aaExportContent';
import { mergeFaces } from './figure';

enum EFormat {
	eSVG,
	eSVGALL,
	eDXF,
	eDXFALL,
	ePAX,
	eOPENSCAD,
	eJSCAD,
	eZIP
}

function fileTextContent(
	fgeom: tGeomFunc,
	paramVal: tParamVal,
	eFace: string,
	exportFormat: EFormat
): string {
	const geome0 = fgeom(0, paramVal);
	let rFileContent = '';
	if (!geome0.calcErr) {
		const figList = Object.keys(geome0.fig);
		if (exportFormat === EFormat.eSVG) {
			if (figList.includes(eFace)) {
				const figu = geome0.fig[eFace];
				rFileContent = figureToSvg(figu.mainList);
			} else {
				console.log(`err749: fileTextContent eFace ${eFace} invalid`);
			}
		} else if (exportFormat === EFormat.eSVGALL) {
			const figu = mergeFaces(geome0.fig);
			rFileContent = figureToSvg(figu.mainList);
		} else if (exportFormat === EFormat.eDXF) {
			if (figList.includes(eFace)) {
				const figu = geome0.fig[eFace];
				rFileContent = figureToDxf(figu.mainList);
			} else {
				console.log(`err759: fileTextContent eFace ${eFace} invalid`);
			}
		} else if (exportFormat === EFormat.eDXFALL) {
			const figu = mergeFaces(geome0.fig);
			rFileContent = figureToDxf(figu.mainList);
		} else if (exportFormat === EFormat.ePAX) {
			rFileContent = makePax(paramVal, geome0);
		} else if (exportFormat === EFormat.eOPENSCAD) {
			rFileContent = makeOpenscad(geome0);
		} else if (exportFormat === EFormat.eJSCAD) {
			rFileContent = makeOpenjscad(geome0);
		} else {
			console.log(`err912: unknown exportFormat ${exportFormat}`);
		}
	} else {
		console.log('err931: error by calling geome ${geome0.calcErr}');
	}
	return rFileContent;
}

async function fileBinContent(
	fgeom: tGeomFunc,
	tSim: number,
	paramVal: tParamVal,
	exportFormat: EFormat
): Promise<Blob> {
	const geome0 = fgeom(0, paramVal);
	const geome1 = fgeom(tSim, paramVal);
	let rFileContent = new Blob();
	if (!geome0.calcErr && !geome1.calcErr) {
		if (exportFormat === EFormat.eZIP) {
			rFileContent = await makeZip(paramVal, geome0, tSim, geome1);
		} else {
			console.log(`err913: unknown exportFormat ${exportFormat}`);
		}
	} else {
		console.log('err932: error by calling geome ${geome0.calcErr} ${geome1.calcErr}');
	}
	return rFileContent;
}

function fileMime(exportFormat: EFormat): string {
	let rMime = '';
	if (exportFormat === EFormat.eSVG) {
		rMime = 'image/svg+xml';
	} else if (exportFormat === EFormat.eDXF) {
		rMime = 'application/dxf';
	} else if (exportFormat === EFormat.ePAX) {
		rMime = 'application/json';
		//rMime = 'text/plain';
	} else if (exportFormat === EFormat.eOPENSCAD) {
		rMime = 'text/plain';
	} else if (exportFormat === EFormat.eJSCAD) {
		rMime = 'text/plain';
	} else if (exportFormat === EFormat.eZIP) {
		rMime = 'application/zip';
		//} else {
		//	console.log(`err903: unknown exportFormat ${exportFormat}`);
	}
	return rMime;
}

function fileSuffix(exportFormat: EFormat): string {
	let rSuffix = '';
	if (exportFormat === EFormat.eSVG) {
		rSuffix = '.svg';
	} else if (exportFormat === EFormat.eDXF) {
		rSuffix = '.dxf';
	} else if (exportFormat === EFormat.ePAX) {
		rSuffix = '.pax.json';
	} else if (exportFormat === EFormat.eOPENSCAD) {
		rSuffix = '_noarc_openscad.scad';
	} else if (exportFormat === EFormat.eJSCAD) {
		rSuffix = '_noarc_jscad.js';
	} else if (exportFormat === EFormat.eZIP) {
		rSuffix = '.zip';
		//} else {
		//	console.log(`err904: unknown exportFormat ${exportFormat}`);
	}
	return rSuffix;
}

function fileBin(exportFormat: EFormat): boolean {
	let rBin = false;
	if (exportFormat === EFormat.eZIP) {
		rBin = true;
	}
	return rBin;
}

export { EFormat, fileBinContent, fileTextContent, fileMime, fileSuffix, fileBin };
