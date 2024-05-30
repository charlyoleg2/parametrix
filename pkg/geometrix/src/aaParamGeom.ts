// aaParamGeom.ts

import type { tParamDef, tParamVal } from './designParams';
import type { tFigures } from './figure';
import type { tVolume } from './volume';
import type { tSubDesign } from './sub_design';

interface tGeom {
	partName: string;
	calcErr: boolean;
	logstr: string;
	fig: tFigures;
	vol: tVolume;
	sub: tSubDesign;
}
type tGeomFunc = (t: number, ipVal: tParamVal, suffix?: string) => tGeom;

interface tPageDef {
	pTitle: string;
	pDescription: string;
	pDef: tParamDef;
	pGeom: tGeomFunc;
}
type tAllPageDef = Record<string, tPageDef>;
type tAllLink = Record<string, string>; // partName: its-link

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

export type { tGeom, tGeomFunc, tPageDef, tAllPageDef, tAllLink };
export { fround, initGeom, checkGeom, prefixLog };
