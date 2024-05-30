// voila.ts

import type {
	//tContour,
	tFace,
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
	EExtrude,
	EBVolume,
	initGeom
} from 'geometrix';

const pDef: tParamDef = {
	partName: 'voila',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('H1', 'mm', 4000, 100, 40000, 10),
		pNumber('H2', 'mm', 5000, 100, 40000, 10),
		pNumber('radius', 'mm', 1000, 100, 40000, 10)
	],
	paramSvg: {
		H1: 'dummy_pole_static_face.svg',
		H2: 'dummy_pole_static_face.svg',
		radius: 'dummy_pole_static_face.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal, suffix = ''): tGeom {
	const rGeome = initGeom(pDef.partName + suffix);
	const figFace = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// figFace
		const face1: tFace = [];
		const ctrPoleFace = contour(-param.H1 / 2, -param.H2 / 2)
			.addSegStrokeA(param.H1 / 2, -param.H2 / 2)
			.addSegStrokeA(param.H1 / 2, param.H2 / 2)
			.addSegStrokeA(-param.H1 / 2, param.H2 / 2)
			.closeSegStroke();
		face1.push(ctrPoleFace);
		face1.push(contourCircle(0, 0, param.radius));
		figFace.addMainOI(face1);
		// final figure list
		rGeome.fig = {
			faceVoila: figFace
		};
		// volume
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_top`,
					face: `${designName}_faceVoila`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: 10,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eIdentity,
					inList: [`subpax_${designName}_top`]
				}
			]
		};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'voila drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const voilaDef: tPageDef = {
	pTitle: 'voila',
	pDescription: 'A simple design for testing exports',
	pDef: pDef,
	pGeom: pGeom
};

export { voilaDef };