// make_rake_stopper.ts

import { EFormat, designParam, checkGeom, prefixLog } from 'geometrix';
import { geom_write } from 'geomcli';
import { rakeStopperDef } from 'designix';
import { make_heliostat_2 } from './make_heliostat_2.js';

const simtime = 0;

async function make_rake_stopper(iOutDir, iPrintLog) {
	let logstr = '';
	const rakeParam = designParam(rakeStopperDef.pDef);
	const helioGeom = await make_heliostat_2('', false);
	logstr += rakeParam.applyParams(helioGeom.sub.rake_1.dparam);
	rakeParam.setVal('D1', 600); // 600 mm
	rakeParam.setVal('D2', 400); // 400 mm
	rakeParam.setVal('D3', 400); // 400 mm
	rakeParam.setVal('H1', 800); // 800 mm
	rakeParam.setVal('H2', 3000); // 3000 mm
	rakeParam.setVal('H3', 400); // 400 mm
	rakeParam.setVal('E1', 20); // 20 mm
	rakeParam.setVal('E3', 30); // 30 mm
	rakeParam.setVal('H4', 200); // 200 mm
	rakeParam.setVal('D4', 300); // 300 mm
	rakeParam.setVal('E4', 20); // 20 mm
	rakeParam.setVal('H5', 400); // 400 mm
	rakeParam.setVal('D5', 200); // 200 mm
	rakeParam.setVal('L4', 300); // 300 mm
	rakeParam.setVal('L5', 2000); // 2000 mm
	rakeParam.setVal('L6', 2000); // 2000 mm
	rakeParam.setVal('D6', 100); // 100 mm
	rakeParam.setVal('E6', 10); // 10 mm
	rakeParam.setVal('L7', 100); // 100 mm
	rakeParam.setVal('L8', 200); // 200 mm
	rakeParam.setVal('N1', 24); // 24 N
	rakeParam.setVal('D7', 40); // 40 mm
	rakeParam.setVal('L1', 30); // 30 mm
	rakeParam.setVal('D8', 400); // 400 mm
	rakeParam.setVal('H6', 100); // 100 mm
	rakeParam.setVal('H7', 600); // 600 mm
	rakeParam.setVal('L9', 300); // 300 mm
	rakeParam.setVal('R9', 50); // 50 mm
	rakeParam.setVal('S1', 100); // 100 mm
	rakeParam.setVal('S2', 2000); // 2000 mm
	rakeParam.setVal('E7', 5); // 5 mm
	const rakeGeom = rakeStopperDef.pGeom(simtime, rakeParam.getParamVal());
	checkGeom(rakeGeom);
	logstr += prefixLog(rakeGeom.logstr, rakeParam.partName);
	if (iOutDir !== '') {
		logstr += await geom_write(
			rakeParam.partName,
			rakeStopperDef.pGeom,
			simtime,
			rakeParam.getParamVal(),
			//EFormat.ePARAMS, // output-format
			//EFormat.eSVG,
			//EFormat.eDXF,
			//EFormat.ePAX,
			//EFormat.eOPENSCAD,
			//EFormat.eJSCAD,
			EFormat.eZIP,
			'', // selected-2d-face
			//'faceCone',
			//'faceBeam',
			//'faceBeamHollow',
			//'faceDisc',
			//'faceHand',
			//'faceWing',
			//'faceWingHollow',
			//'faceDoor',
			//'faceStopperTop',
			//'faceStopperSide',
			//'faceStopperSideH',
			//'faceStopperFaceT',
			//'faceStopperFaceTH',
			//'faceStopperFaceB',
			//'faceStopperFaceBH',
			iOutDir, // output-directory
			'' // output-filename
		);
	}
	if (iPrintLog) {
		console.log(logstr);
	}
	return rakeGeom;
}

export { make_rake_stopper };
