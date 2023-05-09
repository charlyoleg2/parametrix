// verify_contour_1.ts

import { contour, contourCircle, figure } from '$lib/geom/figure';
import type { tParamDef, tParamVal, tGeom, tPageDef } from './aaParamGeom';

const pDef: tParamDef = {
	page: 'verify_contour_1',
	params: [
		{ name: 'r1', unit: 'mm', init: 30, min: 10, max: 200, step: 1 },
		{ name: 'd1', unit: 'mm', init: 20, min: 10, max: 200, step: 1 },
		{ name: 'w1', unit: 'mm', init: 100, min: 10, max: 200, step: 1 },
		{ name: 'r2', unit: 'mm', init: 60, min: 10, max: 200, step: 1 }
	],
	paramSvg: {
		r1: 'verify_contour_1_r1.svg',
		d1: 'verify_contour_1_r1.svg',
		w1: 'verify_contour_1_r1.svg',
		r2: 'verify_contour_1_r1.svg'
	},
	sim: {
		tMax: 10,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal): tGeom {
	const rGeome: tGeom = { fig: figure(), logstr: '', calcErr: true };
	rGeome.logstr += `simTime: ${t}\n`;
	try {
		const r1 = param['r1'];
		const d1 = param['d1'];
		const w1 = param['w1'];
		const r2 = param['r2'];
		const h1 = 3 * r1 + 4 * d1;
		const w12 = w1 / 2;
		const c1 = d1 + r1;
		const c12 = 2 * r1 + d1;
		const c2 = c1 + c12;
		const c3 = c1 + 2 * c12;
		const ctr1 = contour(0, 0);
		ctr1.addSegStroke(w1, 0);
		ctr1.addSegStroke(w1, h1);
		ctr1.addSegStroke(0, h1);
		ctr1.closeSegStroke();
		rGeome.fig.addMain(ctr1);
		rGeome.fig.addMain(contourCircle(w12, c1, r1));
		rGeome.fig.addMain(contourCircle(w12, c2, r1));
		rGeome.fig.addMain(contourCircle(w12, c3, r1));
		const ctr2 = contourCircle(w1 + r2, 3 * c1, r2);
		rGeome.fig.addSecond(ctr2);
		rGeome.logstr += 'verify_contour_1 draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg;
		console.log(emsg);
	}
	return rGeome;
}

const pageDef: tPageDef = {
	pTitle: 'Verify contour 1',
	pDescription: 'Debugging line.ts',
	pDef: pDef,
	pGeom: pGeom
};

export { pageDef };
