// verify_line_3.ts

import type { tParamDef, tParamVal, tGeom, tPageDef } from 'geometrix';
import { point, bisector, circleCenter, figure, pNumber, initGeom } from 'geometrix';

const pDef: tParamDef = {
	partName: 'verify_line_3',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('p1x', 'mm', 30, -200, 200, 1),
		pNumber('p1y', 'mm', 50, -200, 200, 1),
		pNumber('p2x', 'mm', 40, -200, 200, 1),
		pNumber('p2y', 'mm', -20, -200, 200, 1),
		pNumber('p3x', 'mm', -30, -200, 200, 1),
		pNumber('p3y', 'mm', 30, -200, 200, 1)
	],
	paramSvg: {
		p1x: 'verify_line_p1x.svg',
		p1y: 'verify_line_p1x.svg',
		p2x: 'verify_line_p1x.svg',
		p2y: 'verify_line_p1x.svg',
		p3x: 'verify_line_p1x.svg',
		p3y: 'verify_line_p1x.svg'
	},
	sim: {
		tMax: 10,
		tStep: 0.1,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal): tGeom {
	const rGeome = initGeom();
	rGeome.logstr += `simTime: ${t}\n`;
	try {
		const figOne = figure();
		const p1 = point(param.p1x, param.p1y + t);
		const p2 = point(param.p2x, param.p2y);
		const p3 = point(param.p3x, param.p3y);
		figOne.addPoint(p1);
		figOne.addPoint(p2);
		figOne.addPoint(p3);
		const l1 = bisector(p1, p2);
		figOne.addLine(l1);
		const pCenter = circleCenter(p1, p2, p3);
		figOne.addPoint(pCenter);
		rGeome.fig = { one: figOne };
		rGeome.logstr += 'verify_line_3 draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const verifyLine3Def: tPageDef = {
	pTitle: 'Verify line 3',
	pDescription: 'Debugging more more line.ts',
	pDef: pDef,
	pGeom: pGeom
};

export { verifyLine3Def };
