// rectangle.ts

import type { tParamDef, tParamVal, tGeom, tPageDef } from 'geometrix';
import { point, figure, pNumber, initGeom } from 'geometrix';

const pDef: tParamDef = {
	partName: 'rectangle',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('width', 'mm', 15, 3, 40, 0.5),
		pNumber('height', 'mm', 10, 3, 40, 0.5)
	],
	paramSvg: {
		width: 'rectangle_width.svg',
		height: 'rectangle_height.svg'
	},
	sim: {
		tMax: 120,
		tStep: 1,
		tUpdate: 500
	}
};

function pGeom(t: number, param: tParamVal): tGeom {
	const rGeome = initGeom();
	rGeome.logstr += `simTime: ${t}\n`;
	try {
		const figOne = figure();
		const p1 = point(10, 10);
		const p2 = point(10 + param.width, 10);
		const p3 = point(10 + param.width, 10 + param.height);
		const p4 = point(10, 10 + param.height);
		const angle = (t * Math.PI) / 180;
		figOne.addPoint(p1);
		figOne.addPoint(p2.rotate(p1, angle));
		figOne.addPoint(p3.rotate(p1, angle));
		figOne.addPoint(p4.rotate(p1, angle));
		rGeome.fig = { one: figOne };
		rGeome.logstr += 'Rectangle draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const rectangleDef: tPageDef = {
	pTitle: 'Rectangle',
	pDescription: 'Just a rectangle.',
	pDef: pDef,
	pGeom: pGeom
};

export { rectangleDef };
