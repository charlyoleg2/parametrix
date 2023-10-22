// verify_line_2.ts

import type { tParamDef, tParamVal, tGeom, tPageDef } from 'geometrix';
import { degToRad, point, line, figure, pNumber, initGeom } from 'geometrix';

const pDef: tParamDef = {
	partName: 'verify_line_2',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('l1cx', 'mm', 10, -200, 200, 1),
		pNumber('l1cy', 'mm', 20, -200, 200, 1),
		pNumber('l1ca', 'degree', 15, -200, 200, 1),
		pNumber('l2cx', 'mm', 30, -200, 200, 1),
		pNumber('l2cy', 'mm', 50, -200, 200, 1),
		pNumber('l2ca', 'degree', 35, -200, 200, 1),
		pNumber('p3x', 'mm', -30, -200, 200, 1),
		pNumber('p3y', 'mm', 30, -200, 200, 1)
	],
	paramSvg: {
		l1cx: 'verify_line_2_l1cx.svg',
		l1cy: 'verify_line_2_l1cx.svg',
		l1ca: 'verify_line_2_l1cx.svg',
		l2cx: 'verify_line_2_l1cx.svg',
		l2cy: 'verify_line_2_l1cx.svg',
		l2ca: 'verify_line_2_l1cx.svg',
		p3x: 'verify_line_2_l1cx.svg',
		p3y: 'verify_line_2_l1cx.svg'
	},
	sim: {
		tMax: 100,
		tStep: 0.1,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal): tGeom {
	const rGeome = initGeom();
	rGeome.logstr += `simTime: ${t}\n`;
	try {
		const figOne = figure();
		const p1 = point(param.l1cx, param.l1cy);
		const p2 = point(param.l2cx, param.l2cy);
		const p3 = point(param.p3x, param.p3y);
		figOne.addPoint(p1);
		figOne.addPoint(p2);
		figOne.addPoint(p3);
		const l1 = line(param.l1cx, param.l1cy, degToRad(param.l1ca + t));
		const l2 = line(param.l2cx, param.l2cy, degToRad(param.l2ca));
		figOne.addLine(l1);
		figOne.addLine(l2);
		figOne.addPoint(l1.intersection(l2));
		figOne.addPoint(l1.projectPoint(p3));
		rGeome.logstr += `dist(l1, p3) = ${l1.distanceToPoint(p3)}\n`;
		figOne.addPoint(l2.projectPoint(p3));
		rGeome.logstr += `dist(l2, p3) = ${l2.distanceToPoint(p3)}\n`;
		const bisector = l1.bisector(l2, p3);
		const pBisec = point(bisector.cx, bisector.cy).translatePolar(bisector.ca, 30);
		figOne.addPoint(pBisec);
		rGeome.fig = { one: figOne };
		rGeome.logstr += 'verify_line_2 draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const verifyLine2Def: tPageDef = {
	pTitle: 'Verify line 2',
	pDescription: 'Debugging more line.ts',
	pDef: pDef,
	pGeom: pGeom
};

export { verifyLine2Def };
