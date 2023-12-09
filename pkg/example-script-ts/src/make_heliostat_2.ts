// make_heliostat_2.ts

import { designParam, checkGeom, prefixLog } from 'geometrix';
import { heliostat_2Def } from 'designix';

const simtime = 0;

make_heliostat_2() {
	let logstr = "";
	try {
		const helioParam = designParam(heliostat_2Def.pDef);
		helioParam.setVal('H1', 2000);
		helioParam.setVal('H2', 2000);
		const helioGeom = heliostat_2Def.pGeom(simtime, helioParam.getParamVal());
		checkGeom(helioGeom);
		logstr += prefixLog(helioGeom.logstr, helioParam.partName);

		console.log(logstr);
	} catch (emsg) {
		console.log('err909: error while making heliostat_2');
		console.log(emsg as string);
	}

}

export { make_heliostat_2 };
