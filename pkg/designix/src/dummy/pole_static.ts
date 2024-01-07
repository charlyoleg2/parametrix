// pole_static.ts

import type {
	//tContour,
	tParamDef,
	tParamVal,
	tGeom,
	tPageDef
	//tSubInst
	//tSubDesign
} from 'geometrix';
import {
	contour,
	contourCircle,
	figure,
	//degToRad,
	//radToDeg,
	//ffix,
	pNumber,
	//pCheckbox,
	//pDropdown,
	initGeom
	//EExtrude,
	//EBVolume
} from 'geometrix';
import { dummy_pole_static_face_svg } from './svg_dummy';

const pDef: tParamDef = {
	partName: 'pole_static',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('H1', 'mm', 4000, 100, 40000, 10),
		pNumber('H2', 'mm', 5000, 100, 40000, 10),
		pNumber('radius', 'mm', 1000, 100, 40000, 10)
	],
	paramSvg: {
		H1: dummy_pole_static_face_svg,
		H2: dummy_pole_static_face_svg,
		radius: dummy_pole_static_face_svg
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal): tGeom {
	const rGeome = initGeom(pDef.partName);
	const figFace = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// figFace
		const ctrPoleFace = contour(-param.H1 / 2, -param.H2 / 2)
			.addSegStrokeA(param.H1 / 2, -param.H2 / 2)
			.addSegStrokeA(param.H1 / 2, param.H2 / 2)
			.addSegStrokeA(-param.H1 / 2, param.H2 / 2)
			.closeSegStroke();
		figFace.addMain(ctrPoleFace);
		figFace.addMain(contourCircle(0, 0, param.radius));
		// final figure list
		rGeome.fig = {
			poleFace: figFace
		};
		// volume
		//const designName = rGeome.partName;
		//rGeome.vol = {};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'dummy_pole_static draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const dummyPoleStaticDef: tPageDef = {
	pTitle: 'Dummy pole static',
	pDescription: 'Testing two design with identical name',
	pDef: pDef,
	pGeom: pGeom
};

export { dummyPoleStaticDef };
