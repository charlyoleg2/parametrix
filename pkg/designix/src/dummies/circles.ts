// circles.ts

import type { tParamDef, tParamVal, tGeom, tPageDef } from 'geometrix';
import { degToRad, point, figure, pNumber, initGeom } from 'geometrix';

//const pi12 = fround(Math.PI / 12);
//const pi24 = fround(Math.PI / 24); // input-number min and step must be rounded to avoid UI issue
//const pi4 = fround(Math.PI / 4);
//const pi120 = fround(Math.PI / 120); // rounded to avoid UI issue

const pDef: tParamDef = {
	partName: 'circles',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('angle', 'degree', 15, 5, 45, 1),
		pNumber('amplitude-offset', 'mm', 1, 0.5, 4, 0.1),
		pNumber('amplitude-scale', 'scalar', 0.2, 0.1, 0.5, 0.01)
	],
	paramSvg: {
		angle: 'circles_angle.svg',
		'amplitude-offset': 'circles_amplitude-offset.svg',
		'amplitude-scale': 'circles_amplitude-scale.svg'
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
		//figOne.addPoint(point(0, 0));
		const p1 = point(10, 10);
		const p2 = point(10, 30);
		//figOne.addPoint(p1);
		figOne.addPoint(p2);
		for (let i = 0; i < 20; i++) {
			figOne.addPoint(
				p1
					.scale(p2, param['amplitude-offset'] + param['amplitude-scale'] * i)
					.rotate(p2, i * degToRad(param.angle) + (t * Math.PI) / 2 / pDef.sim.tMax)
			);
		}
		rGeome.fig = { one: figOne };
		rGeome.logstr += 'Circles draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const circlesDef: tPageDef = {
	pTitle: 'Circles',
	pDescription: 'A spiral made by points.',
	pDef: pDef,
	pGeom: pGeom
};

export { circlesDef };
