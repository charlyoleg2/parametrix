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
	poleParam.setVal('D1', 1000); // 1000 mm
	poleParam.setVal('D2', 700); // 700 mm
	poleParam.setVal('D3', 800); // 800 mm
	poleParam.setVal('H1', 3000); // 3000 mm
	poleParam.setVal('H2', 7000); // 7000 mm
	poleParam.setVal('E1', 30); // 30 mm
	poleParam.setVal('E2', 5); // 5 mm
	poleParam.setVal('N1', 32); // 32 N
	poleParam.setVal('D5', 40); // 40 mm
	poleParam.setVal('L1', 45); // 45 mm
	poleParam.setVal('D4', 600); // 600 mm
	poleParam.setVal('H3', 300); // 300 mm
	poleParam.setVal('H4', 1800); // 1800 mm
	poleParam.setVal('L2', 30); // 30 mm
	poleParam.setVal('E3', 40); // 40 mm
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
			//'poleCut',
			//'poleFace',
			//'poleBottom',
			//'emptyPole',
			//'emptyDoor',
			iOutDir, // output-directory
			'' // output-filename
		);
	}
	if (iPrintLog) {
		console.log(logstr);
	}
}

export { make_pole_static };
