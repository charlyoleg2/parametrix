// verify_exports_1.ts

import type { tParamDef, tParamVal, tGeom, tPageDef } from 'geometrix';
import {
	contour,
	contourCircle,
	figure,
	pNumber,
	pCheckbox,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

const pDef: tParamDef = {
	partName: 'verify_exports_1',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pCheckbox('circle', true),
		pNumber('circle-size', 'mm', 100, 1, 1000, 1),
		pCheckbox('contour', true),
		pNumber('contour-size', 'mm', 30, 1, 1000, 1),
		pCheckbox('contour-arc-large', false)
	],
	paramSvg: {
		circle: 'default_param_blank.svg',
		'circle-size': 'default_param_blank.svg',
		contour: 'default_param_blank.svg',
		'contour-size': 'default_param_blank.svg',
		'contour-arc-large': 'default_param_blank.svg'
	},
	sim: {
		tMax: 10,
		tStep: 0.1,
		tUpdate: 500
	}
};

function pGeom(t: number, param: tParamVal): tGeom {
	const rGeome = initGeom();
	rGeome.logstr += `simTime: ${t}\n`;
	try {
		const figOne = figure();
		if (param.circle === 1) {
			const theCircle = contourCircle(0, 0, param['circle-size']);
			figOne.addMain(theCircle);
		}
		if (param.contour === 1) {
			const csize = param['contour-size'];
			const carcl = param['contour-arc-large'] === 1 ? true : false;
			const ctr1 = contour(0, 0)
				.addSegStrokeA(csize, 0)
				.addPointA(csize, csize)
				.addSegArc(csize * 0.8, carcl, true)
				.closeSegStroke();
			figOne.addMain(ctr1);
		}
		rGeome.fig = { one: figOne };
		const designName = pDef.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_one`,
					face: `${designName}_one`,
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
					inList: [`subpax_${designName}_one`]
				}
			]
		};
		rGeome.logstr += 'verify_exports_1 draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const verifyExports1Def: tPageDef = {
	pTitle: 'Verify exports 1',
	pDescription: 'For dev & debug of Openscad export',
	pDef: pDef,
	pGeom: pGeom
};

export { verifyExports1Def };
