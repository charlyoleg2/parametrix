// initStore

import type { tParamVal, tPageDef, tAllPageDef } from 'geometrix';
//import { PType } from 'geometrix';
import type { tStorePVal } from './storePVal';
import { storePV } from './storePVal';
import { get } from 'svelte/store';

function initStore(designDefs: tAllPageDef) {
	const iniPV: tStorePVal = {};
	for (const design of Object.keys(designDefs)) {
		const designParam: tParamVal = {};
		for (const param of designDefs[design].pDef.params) {
			//if (param.pType !== PType.eSectionSeparator) {
			designParam[param.name] = param.init;
			//}
		}
		iniPV[design] = designParam;
	}
	storePV.set(iniPV);
}

function updateStore(iPartName: string, dParams: tParamVal, overwrite: boolean) {
	const iniPV = get(storePV);
	const designNames = Object.keys(iniPV);
	if (designNames.includes(iPartName)) {
		const inidParams = iniPV[iPartName];
		const inidParamNames = Object.keys(inidParams);
		for (const pa of Object.keys(dParams)) {
			if (!inidParamNames.includes(pa)) {
				inidParams[pa] = dParams[pa];
			} else if (overwrite) {
				inidParams[pa] = dParams[pa];
			}
		}
		iniPV[iPartName] = inidParams;
		//console.log(`dbg781: updateStore of ${iPartName}`);
	} else {
		iniPV[iPartName] = dParams;
		//console.log(`dbg782: updateStore of new ${iPartName}`);
	}
	storePV.set(iniPV);
}

function incrStore(oneDesignDef: tPageDef) {
	const dName = oneDesignDef.pDef.partName;
	const dParams: tParamVal = {};
	for (const param of oneDesignDef.pDef.params) {
		//if (param.pType !== PType.eSectionSeparator) {
		dParams[param.name] = param.init;
		//}
	}
	updateStore(dName, dParams, false);
}

export { initStore, incrStore, updateStore };
