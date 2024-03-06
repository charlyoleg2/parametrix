// make_swing.ts

import type { tGeom } from 'geometrix';
import { EFormat, designParam, checkGeom, prefixLog } from 'geometrix';
import { geom_write } from 'geomcli';
import { swingDef } from 'designix';
import { make_heliostat_2 } from './make_heliostat_2';

const simtime = 0;

async function make_swing(iOutDir: string, iPrintLog: boolean): Promise<tGeom> {
	let logstr = '';
	const swingParam = designParam(swingDef.pDef);
	const helioGeom = await make_heliostat_2('', false);
	logstr += swingParam.applyParamList(helioGeom.sub.swing_1.dparam);
	swingParam.setVal('L1', 12500); // 12500 mm
	swingParam.setVal('L2', 6000); // 6000 mm
	swingParam.setVal('L3', 500); // 500 mm
	swingParam.setVal('L4', 600); // 600 mm
	swingParam.setVal('L5', 2000); // 2000 mm
	swingParam.setVal('L6', 2000); // 2000 mm
	swingParam.setVal('D1', 400); // 400 mm
	swingParam.setVal('H1', 100); // 100 mm
	swingParam.setVal('H2', 100); // 100 mm
	swingParam.setVal('H3', 100); // 100 mm
	swingParam.setVal('H4', 100); // 100 mm
	swingParam.setVal('E1', 5); // 5 mm
	swingParam.setVal('E2', 3); // 3 mm
	swingParam.setVal('E3', 3); // 3 mm
	swingParam.setVal('rod1', 10); // 10 N
	swingParam.setVal('rod2', 1300); // 1300 mm
	swingParam.setVal('rod3', 400); // 400 mm
	swingParam.setVal('rod4', 100); // 100 mm
	const swingGeom = swingDef.pGeom(simtime, swingParam.getParamVal());
	checkGeom(swingGeom);
	logstr += prefixLog(swingGeom.logstr, swingParam.partName);
	if (iOutDir !== '') {
		logstr += await geom_write(
			swingParam.partName,
			swingDef.pGeom,
			simtime,
			swingParam.getParamVal(),
			swingDef.pDef,
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
			//'faceTopWithRods',
			iOutDir, // output-directory
			'' // output-filename
		);
	}
	if (iPrintLog) {
		console.log(logstr);
	}
	return swingGeom;
}

export { make_swing };
