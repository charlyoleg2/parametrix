// verify_contour_5.ts

import type { tParamDef, tParamVal, tGeom, tPageDef } from 'geometrix';
import { contour, figure, pNumber, initGeom } from 'geometrix';

const pDef: tParamDef = {
	partName: 'verify_contour_5',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('L1', 'mm', 100, 10, 200, 1),
		pNumber('L2', 'mm', 100, 10, 200, 1),
		pNumber('R1', 'mm', 10, 0, 100, 1),
		pNumber('R2', 'mm', 10, 0, 100, 1)
	],
	paramSvg: {
		L1: 'verify_contour_1_r1.svg',
		L2: 'verify_contour_1_r1.svg',
		R1: 'verify_contour_1_r1.svg',
		R2: 'verify_contour_1_r1.svg'
	},
	sim: {
		tMax: 10,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal, suffix = ''): tGeom {
	const rGeome = initGeom(pDef.partName + suffix);
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		const figOne = figure();
		const ctr1a = contour(0, 0)
			.addSegStrokeR(param.L1, 0)
			.addCornerRounded(param.R1)
			.addSegStrokeR(0, param.L2)
			.addCornerRounded(param.R2)
			.closeSegStroke();
		rGeome.logstr += ctr1a.check();
		figOne.addMainO(ctr1a);
		const ctr1b = ctr1a.generateRevertOrientation().translate(300, 0);
		rGeome.logstr += ctr1b.check();
		figOne.addMainO(ctr1b);
		rGeome.fig = { one: figOne };
		rGeome.logstr += 'verify_contour_5 drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const verifyContour5Def: tPageDef = {
	pTitle: 'Verify contour 5',
	pDescription: 'Debugging contour.ts for revert-contour',
	pDef: pDef,
	pGeom: pGeom
};

export { verifyContour5Def };
