// make_surface.ts

import type { tGeom } from 'geometrix';
import { EFormat, designParam, checkGeom, prefixLog } from 'geometrix';
import { write_geom } from 'geomcli';
import { surfaceDef } from 'designix';

const simtime = 0;

async function make_surface(iOutDir: string, iPrintLog: boolean): Promise<tGeom> {
	let logstr = '';
	const surfaceParam = designParam(surfaceDef.pDef);
	surfaceParam.setVal('L1', 12500); // 12500 mm
	surfaceParam.setVal('LH', 1600); // 1600 mm
	surfaceParam.setVal('LV', 1000); // 1000 mm
	surfaceParam.setVal('LZ', 40); // 40 mm
	surfaceParam.setVal('nx', 9); // 9 N
	surfaceParam.setVal('ny', 9); // 9 N
	surfaceParam.setVal('main_direction', 0); // 0:horizontal 1:vertical
	surfaceParam.setVal('crenel', 0); // 0:false
	surfaceParam.setVal('first_row', 9); // 9 N
	surfaceParam.setVal('second_row', 9); // 9 N
	surfaceParam.setVal('EH', 10); // 10 mm
	surfaceParam.setVal('EH_gradient', 0); // 0:false
	surfaceParam.setVal('EH_sup', 500); // 500 mm
	surfaceParam.setVal('EH_cycle', 1); // 1 0-3
	surfaceParam.setVal('EH_start', 0); // 0 0-1
	surfaceParam.setVal('EH_shape', 0); // 0:sinusoid 1:triangle 2:sawUp 3:sawDown
	surfaceParam.setVal('EV', 10); // 10mm
	surfaceParam.setVal('EV_gradient', 0); // 0:false
	surfaceParam.setVal('EV_sup', 500); // 500 mm
	surfaceParam.setVal('EV_cycle', 1); // 1 0-3
	surfaceParam.setVal('EV_start', 0); // 0 0-1
	surfaceParam.setVal('EV_shape', 0); // 0:sinusoid 1:triangle 2:sawUp 3:sawDown
	surfaceParam.setVal('power_efficiency', 16); // 16%
	surfaceParam.setVal('solar_power', 816); // 816 W/m2 // 1361*0.6=816 W/m2
	// surface_flavour_A
	const surfaceGeom_A = surfaceDef.pGeom(simtime, surfaceParam.getParamVal());
	checkGeom(surfaceGeom_A);
	logstr += prefixLog(surfaceGeom_A.logstr, surfaceParam.partName);
	if (iOutDir !== '') {
		logstr += await write_geom(
			surfaceParam.partName,
			surfaceDef.pGeom,
			simtime,
			surfaceParam.getParamVal(),
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
			'surface_flavour_A' // output-filename
		);
	}
	// surface_flavour_B
	surfaceParam.setVal('L1', 10500); // 12500 mm
	surfaceParam.setVal('LH', 1400); // 1600 mm
	surfaceParam.setVal('LV', 900); // 1000 mm
	const surfaceGeom_B = surfaceDef.pGeom(simtime, surfaceParam.getParamVal());
	checkGeom(surfaceGeom_B);
	logstr += prefixLog(surfaceGeom_B.logstr, surfaceParam.partName);
	if (iOutDir !== '') {
		logstr += await write_geom(
			surfaceParam.partName,
			surfaceDef.pGeom,
			simtime,
			surfaceParam.getParamVal(),
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
			'surface_flavour_B' // output-filename
		);
	}
	if (iPrintLog) {
		console.log(logstr);
	}
	return surfaceGeom_B;
}

export { make_surface };
