// storePVal_init

import type { tStorePVal } from './storePVal';
import { storePV } from './storePVal';

function storePVal_init() {
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

export { storePVal_init };
