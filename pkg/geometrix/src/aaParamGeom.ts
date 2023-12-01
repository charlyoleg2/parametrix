// aaParamGeom.ts

import type { tParamDef, tParamVal } from './designParams';
import type { tFaces } from './figure';
import type { tVolume } from './volume';
import type { tSubDesign } from './sub_design';

interface tAllVal {
	lastModif: string;
	pVal: tParamVal;
	comment: string;
}
interface tGeom {
	partName: string;
	calcErr: boolean;
	logstr: string;
	fig: tFaces;
	vol: tVolume;
	sub: tSubDesign;
}
type tGeomFunc = (t: number, ipVal: tParamVal) => tGeom;

interface tPageDef {
	pTitle: string;
	pDescription: string;
	pDef: tParamDef;
	pGeom: tGeomFunc;
}

function fround(ireal: number, iprecision = 1000.0): number {
	return Math.floor(ireal * iprecision) / iprecision;
}

function initGeom(partName: string): tGeom {
	const rGeom: tGeom = {
		partName: partName,
		calcErr: true,
		logstr: '',
		fig: {},
		vol: { extrudes: [], volumes: [] },
		sub: {}
	};
	return rGeom;
}

function checkGeom(iGeom: tGeom) {
	if (iGeom.calcErr) {
		let errMsg = `err182: Error in sub-design ${iGeom.partName}\n`;
		errMsg += prefixLog(iGeom.logstr, iGeom.partName);
		throw errMsg;
	}
}

function prefixLog(iLog: string, iPartName: string): string {
	let rLog = '';
	for (const oneline of iLog.split('\n')) {
		if (oneline !== '') {
			rLog += `[${iPartName}]: ${oneline}\n`;
		}
	}
	return rLog;
}

export type { tAllVal, tGeom, tGeomFunc, tPageDef };
export { fround, initGeom, checkGeom, prefixLog };
