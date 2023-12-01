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
type tGeomFunc = (t: number, ipVal: tParamVal) => tGeom;

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

export type { tParamDef, tParamVal, tAllVal, tGeom, tGeomFunc, tPageDef };
export { PType, pNumber, pCheckbox, pDropdown, fround, initGeom };
