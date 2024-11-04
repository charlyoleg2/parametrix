// initStore

import type { tParamVal, tPageDef, tAllPageDef } from 'geometrix';
//import { PType } from 'geometrix';
//import type { tStateParams } from './stateParams.svelte';
import { sParams } from './stateParams.svelte';
//import { get } from 'svelte/store';

function initStore(designDefs: tAllPageDef) {
	//const iniPV: tStateParams = {};
	for (const design of Object.keys(designDefs)) {
		const designParam: tParamVal = {};
		for (const param of designDefs[design].pDef.params) {
			//if (param.pType !== PType.eSectionSeparator) {
			designParam[param.name] = param.init;
			//}
		}
		sParams[design] = designParam;
	}
	//sParams = iniPV;
}

function updateStore(iPartName: string, dParams: tParamVal, overwrite: boolean) {
	//const iniPV = sParams;
	const designNames = Object.keys(sParams);
	if (designNames.includes(iPartName)) {
		const inidParams = sParams[iPartName];
		const inidParamNames = Object.keys(inidParams);
		for (const pa of Object.keys(dParams)) {
			if (!inidParamNames.includes(pa)) {
				inidParams[pa] = dParams[pa];
			} else if (overwrite) {
				inidParams[pa] = dParams[pa];
			}
		}
		sParams[iPartName] = inidParams;
		//console.log(`dbg781: updateStore of ${iPartName}`);
	} else {
		sParams[iPartName] = dParams;
		//console.log(`dbg782: updateStore of new ${iPartName}`);
	}
	//sParams = iniPV;
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
