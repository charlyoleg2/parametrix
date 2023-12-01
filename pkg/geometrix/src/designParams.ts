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

type tParamVal = Record<string, number>;
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

export type { tParamDef, tParamVal, DesignParam };
export { PType, pNumber, pCheckbox, pDropdown, designParam };
