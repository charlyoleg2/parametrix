// designParams

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

const zeroPDef: tParamDef = {
	partName: '',
	params: [],
	paramSvg: {},
	sim: {
		tMax: 0,
		tStep: 0,
		tUpdate: 0
	}
};

type tParamVal = Record<string, number>;
type tParamChanged = Record<string, boolean>;

interface tDesignParamOne {
	val: number;
	init: number;
	chg: boolean;
}

function oneDesignParam(iVal: number, iInit: number, iChg: boolean): tDesignParamOne {
	const oneDP: tDesignParamOne = { val: iVal, init: iInit, chg: iChg };
	return oneDP;
}

type tDesignParamList = Record<string, tDesignParamOne>;

function paramListToVal(dpList: tDesignParamList): tParamVal {
	const rParamVal: tParamVal = {};
	for (const pa of Object.keys(dpList)) {
		rParamVal[pa] = dpList[pa].val;
	}
	return rParamVal;
}

class DesignParam {
	paramVal: tParamVal = {};
	paramInit: tParamVal = {};
	paramChanged: tParamChanged = {};
	partName: string;
	suffix: string;
	paramNames: string[];
	getParamName(): string[] {
		const rNames: string[] = [];
		for (const pName of Object.keys(this.paramVal)) {
			rNames.push(pName);
		}
		return rNames;
	}
	constructor(iparamDef: tParamDef, suffix = '') {
		for (const pi of iparamDef.params) {
			this.paramVal[pi.name] = pi.init;
			this.paramInit[pi.name] = pi.init;
			this.paramChanged[pi.name] = false;
		}
		this.suffix = suffix;
		this.partName = iparamDef.partName;
		this.paramNames = this.getParamName();
	}
	getPartName(): string {
		return this.partName;
	}
	getPartNameSuffix(): string {
		return this.partName + this.suffix;
	}
	getSuffix(): string {
		return this.suffix;
	}
	getParamVal(): tParamVal {
		return this.paramVal;
	}
	getVal(iname: string): number {
		if (this.paramNames.includes(iname)) {
			return this.paramVal[iname];
		} else {
			throw `err140: parameter ${iname} does not exist in design ${this.partName}`;
		}
	}
	getInit(iname: string): number {
		if (this.paramNames.includes(iname)) {
			return this.paramInit[iname];
		} else {
			throw `err149: parameter ${iname} does not exist in design ${this.partName}`;
		}
	}
	getChanged(iname: string): boolean {
		if (this.paramNames.includes(iname)) {
			return this.paramChanged[iname];
		} else {
			throw `err156: parameter ${iname} does not exist in design ${this.partName}`;
		}
	}
	setVal(iname: string, ival: number) {
		if (this.paramNames.includes(iname)) {
			this.paramVal[iname] = ival;
			this.paramChanged[iname] = true;
		} else {
			throw `err163: parameter ${iname} does not exist in design ${this.partName}`;
		}
	}
	applyParamVal(iValues: tParamVal): string {
		let rlog = '';
		for (const pa of Object.keys(iValues)) {
			this.setVal(pa, iValues[pa]);
		}
		rlog += `info104: apply ${Object.keys(iValues).length} parameters on ${this.partName}\n`;
		return rlog;
	}
	applyParamList(iValues: tDesignParamList): string {
		const rlog = this.applyParamVal(paramListToVal(iValues));
		return rlog;
	}
	getDesignParamList(): tDesignParamList {
		const rDPList: tDesignParamList = {};
		for (const pi of this.paramNames) {
			rDPList[pi] = oneDesignParam(this.getVal(pi), this.getInit(pi), this.getChanged(pi));
		}
		return rDPList;
	}
}

function designParam(iparamDef: tParamDef, suffix = ''): DesignParam {
	return new DesignParam(iparamDef, suffix);
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

export type {
	tParam,
	tSimTime,
	tParamDef,
	tParamChanged,
	tParamVal,
	tDesignParamOne,
	tDesignParamList,
	DesignParam
};
export {
	PType,
	pNumber,
	pCheckbox,
	pDropdown,
	designParam,
	paramListToVal,
	oneDesignParam,
	zeroPDef
};
