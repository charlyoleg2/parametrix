// designParamValues

import type { tParamDef, tParamVal, tGeom } from './aaParamGeom';

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

export type { DesignParam };
export { designParam, checkGeom, prefixLog };
