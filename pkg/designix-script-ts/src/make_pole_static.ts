// make_pole_static.ts

import { EFormat, designParam, checkGeom, prefixLog } from 'geometrix';
import { write_geom } from 'geomcli';
import { poleStaticDef } from 'designix';
import { make_heliostat_2 } from './make_heliostat_2';

const simtime = 0;

async function make_pole_static(iOutDir: string, iPrintLog: boolean) {
	let logstr = '';
	const poleParam = designParam(poleStaticDef.pDef);
	const helioSub = await make_heliostat_2('', false);
	logstr += poleParam.applyParams(helioSub.pole_static_1.dparam);
	poleParam.setVal('H1', 3000); // 3000 mm
	const poleGeom = poleStaticDef.pGeom(simtime, poleParam.getParamVal());
	checkGeom(poleGeom);
	logstr += prefixLog(poleGeom.logstr, poleParam.partName);
	if (iOutDir !== '') {
		logstr += await write_geom(
			poleParam.partName,
			poleStaticDef.pGeom,
			simtime,
			poleParam.getParamVal(),
			//EFormat.ePARAMS, // output-format
			//EFormat.eSVG,
			//EFormat.eDXF,
			//EFormat.ePAX,
			//EFormat.eOPENSCAD,
			//EFormat.eJSCAD,
			EFormat.eZIP,
			'', // selected-2d-face
			//'faceSide',
			//'faceFace',
			//'faceTop',
			iOutDir, // output-directory
			'' // output-filename
		);
	}
	if (iPrintLog) {
		console.log(logstr);
	}
}

export { make_pole_static };
