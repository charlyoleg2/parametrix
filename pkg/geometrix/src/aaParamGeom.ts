// aaParamGeom.ts

import type { tFaces } from './figure';
import type { tVolume } from './volume';
import type { tSubDesign } from './sub_design';

enum PType {
	eNumber,
	eCheckbox,
	eDropdown
}

interface tParam {
	name: string;
	unit: string;
	init: number;
	min: number;
	max: number;
	step: number;
	dropdown: string[];
	pType: PType;
}
interface tSimTime {
	tMax: number;
	tStep: number;
	tUpdate: number; // in ms
}
interface tParamDef {
	partName: string;
	params: tParam[];
	paramSvg: Record<string, string>;
	sim: tSimTime;
}

type tParamVal = Record<string, number>;
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
type tGeomFunc = (t: number, ipVal: tParamVal, partName: string) => tGeom;

interface tPageDef {
	pTitle: string;
	pDescription: string;
	pDef: tParamDef;
	pGeom: tGeomFunc;
}

function pNumber(name: string, unit: string, init: number, min = 0, max = 100, step = 1): tParam {
	const rParam: tParam = {
		name: name,
		unit: unit,
		init: init,
		min: min,
		max: max,
		step: step,
		dropdown: [],
		pType: PType.eNumber
	};
	return rParam;
}
function pCheckbox(name: string, init: boolean): tParam {
	const rParam: tParam = {
		name: name,
		unit: 'checkbox',
		init: init ? 1 : 0,
		min: 0,
		max: 1,
		step: 1,
		dropdown: [],
		pType: PType.eCheckbox
	};
	return rParam;
}
function pDropdown(name: string, values: string[]): tParam {
	const rParam: tParam = {
		name: name,
		unit: 'dropdown',
		init: 0,
		min: 0,
		max: values.length - 1,
		step: 1,
		dropdown: values,
		pType: PType.eDropdown
	};
	return rParam;
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

// DesignParamVal
type tParamChanged = Record<string, boolean>;

class DesignParam {
	paramVal: tParamVal = {};
	paramInit: tParamVal = {};
	paramChanged: tParamChanged = {};
	designName: string;
	paramNames: string[];
	getParamName(): string[] {
		const rNames: string[] = [];
		for (const pName of Object.keys(this.paramVal)) {
			rNames.push(pName);
		}
		return rNames;
	}
	constructor(iparamDef: tParamDef) {
		for (const pi of iparamDef.params) {
			this.paramVal[pi.name] = pi.init;
			this.paramInit[pi.name] = pi.init;
			this.paramChanged[pi.name] = false;
		}
		this.designName = iparamDef.partName;
		this.paramNames = this.getParamName();
	}
	getParamVal(): tParamVal {
		return this.paramVal;
	}
	getVal(iname: string): number {
		if (this.paramNames.includes(iname)) {
			return this.paramVal[iname];
		} else {
			throw `err140: parameter ${iname} does not exist in design ${this.designName}`;
		}
	}
	getInit(iname: string): number {
		if (this.paramNames.includes(iname)) {
			return this.paramInit[iname];
		} else {
			throw `err149: parameter ${iname} does not exist in design ${this.designName}`;
		}
	}
	getChanged(iname: string): boolean {
		if (this.paramNames.includes(iname)) {
			return this.paramChanged[iname];
		} else {
			throw `err156: parameter ${iname} does not exist in design ${this.designName}`;
		}
	}
	setVal(iname: string, ival: number) {
		if (this.paramNames.includes(iname)) {
			this.paramVal[iname] = ival;
			this.paramChanged[iname] = true;
		} else {
			throw `err163: parameter ${iname} does not exist in design ${this.designName}`;
		}
	}
}

function designParam(iparamDef: tParamDef): DesignParam {
	return new DesignParam(iparamDef);
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

function checkGeom(iGeom: tGeom) {
	if (iGeom.calcErr) {
		let errMsg = `err182: Error in sub-design ${iGeom.partName}\n`;
		errMsg += prefixLog(iGeom.logstr, iGeom.partName);
		throw errMsg;
	}
}

export type { tParamDef, tParamVal, tAllVal, tGeom, tGeomFunc, tPageDef, DesignParam };
export {
	PType,
	pNumber,
	pCheckbox,
	pDropdown,
	fround,
	initGeom,
	designParam,
	checkGeom,
	prefixLog
};
