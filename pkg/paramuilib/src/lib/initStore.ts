// initStore

import type { tParamVal, tPageDef, tAllPageDef } from 'geometrix';
import type { tStorePVal } from './storePVal';
import { storePV } from './storePVal';
import { get } from 'svelte/store';

function initStore(designDefs: tAllPageDef) {
	const iniPV: tStorePVal = {};
	for (const design of Object.keys(designDefs)) {
		const designParam: tParamVal = {};
		for (const param of designDefs[design].pDef.params) {
			designParam[param.name] = param.init;
		}
		iniPV[design] = designParam;
	}
	storePV.set(iniPV);
}

function incrStore(oneDesignDef: tPageDef) {
	const iniPV = get(storePV);
	const designNames = Object.keys(iniPV);
	const dName = oneDesignDef.pDef.partName;
	if (designNames.includes(dName)) {
		const designParam = iniPV[dName];
		const dParams = Object.keys(designParam);
		for (const param of oneDesignDef.pDef.params) {
			if (!dParams.includes(param.name)) {
				designParam[param.name] = param.init;
			}
		}
		iniPV[dName] = designParam;
		console.log(`dbg781: incrStore of ${dName}`);
	} else {
		const designParam: tParamVal = {};
		for (const param of oneDesignDef.pDef.params) {
			designParam[param.name] = param.init;
		}
		iniPV[dName] = designParam;
		console.log(`dbg782: incrStore of new ${dName}`);
	}
	storePV.set(iniPV);
}

export { initStore, incrStore };
