// make_heliostat_2.ts

import { EFormat, designParam, checkGeom, prefixLog } from 'geometrix';
import { heliostat_2Def } from 'designix';
import { write_geom } from 'geomcli';

const simtime = 0;

async function make_heliostat_2() {
	let logstr = '';
	const helioParam = designParam(heliostat_2Def.pDef);
	helioParam.setVal('H1', 3000); // 3000 mm
	helioParam.setVal('H2', 2500); // 2500 mm
	helioParam.setVal('H3', 200); // 200 mm
	helioParam.setVal('H4', 800); // 800 mm
	helioParam.setVal('H5', 3000); // 3000 mm
	helioParam.setVal('H6', 200); // 200 mm
	helioParam.setVal('H7', 400); // 400 mm
	helioParam.setVal('H9', 100); // 100 mm
	helioParam.setVal('D1', 1000); // 1000 mm
	helioParam.setVal('D2', 700); // 700 mm
	helioParam.setVal('D3', 900); // 900 mm
	helioParam.setVal('D4', 400); // 400 mm
	helioParam.setVal('D5', 300); // 300 mm
	helioParam.setVal('D6', 200); // 200 mm
	helioParam.setVal('D7', 400); // 400 mm
	helioParam.setVal('D9', 100); // 100 mm
	helioParam.setVal('E1', 30); // 30 mm
	helioParam.setVal('L1', 12500); // 12500 mm
	helioParam.setVal('L2', 6000); // 6000 mm
	helioParam.setVal('L3', 100); // 100 mm
	helioParam.setVal('L4', 600); // 600 mm
	helioParam.setVal('L5', 2000); // 2000 mm
	helioParam.setVal('L6', 2000); // 2000 mm
	helioParam.setVal('L7', 100); // 100 mm
	helioParam.setVal('L8', 200); // 200 mm
	helioParam.setVal('al', 80); // 80 degree
	helioParam.setVal('S1', 100); // 100 mm
	//helioParam.setVal('S1wrong', 100); // checking if not existing parameter generates an error
	const helioGeom = heliostat_2Def.pGeom(simtime, helioParam.getParamVal());
	checkGeom(helioGeom);
	logstr += prefixLog(helioGeom.logstr, helioParam.partName);
	logstr += await write_geom(
		helioGeom.partName,
		heliostat_2Def.pGeom,
		simtime,
		helioParam.getParamVal(),
		//EFormat.ePARAMS,
		//EFormat.eSVG,
		//EFormat.eDXF,
		//EFormat.ePAX,
		//EFormat.eOPENSCAD,
		EFormat.eJSCAD,
		//EFormat.eZIP,
		'',
		//'faceSide',
		//'faceFace',
		//'faceTop',
		'output',
		''
	);
	console.log(logstr);
}

export { make_heliostat_2 };
