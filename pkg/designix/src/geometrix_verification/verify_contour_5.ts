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
		const ctr2a = contour(0, 300)
			.addSegStrokeR(param.L1, 0)
			.addCornerRounded(param.R1)
			.addSegStrokeR(0, param.L2)
			.closeSegStroke()
			.addCornerRounded(param.R2);
		rGeome.logstr += ctr2a.check();
		figOne.addMainO(ctr2a);
		const ctr2b = ctr2a.generateRevertOrientation().translate(300, 0);
		rGeome.logstr += ctr2b.check();
		figOne.addMainO(ctr2b);
		const ctr3a = contour(0, 600)
			.addCornerRounded(param.R2)
			.addSegStrokeR(param.L1, 0)
			.addCornerRounded(param.R1)
			.addSegStrokeR(0, param.L2)
			.closeSegStroke();
		rGeome.logstr += ctr3a.check();
		figOne.addMainO(ctr3a);
		const ctr3b = ctr3a.generateRevertOrientation().translate(300, 0);
		rGeome.logstr += ctr3b.check();
		figOne.addMainO(ctr3b);
		const ctr4a = contour(0, 900)
			.addSegStrokeR(param.L1, 0)
			.addCornerRounded(param.R1)
			.addPointR(0, param.L2)
			.addSegArc(param.L2, false, false)
			.addCornerRounded(param.R2)
			.closeSegStroke();
		rGeome.logstr += ctr4a.check();
		figOne.addMainO(ctr4a);
		const ctr4b = ctr4a.generateRevertOrientation().translate(300, 0);
		rGeome.logstr += ctr4b.check();
		figOne.addMainO(ctr4b);
		const ctr5a = contour(0, 1200)
			.addSegStrokeR(param.L1, 0)
			.addCornerRounded(param.R1)
			.addPointR(0, param.L2)
			.addSegArc(param.L2, false, false)
			.closeSegArc(param.L1 + param.L2, false, true)
			.addCornerRounded(param.R2);
		rGeome.logstr += ctr5a.check();
		figOne.addMainO(ctr5a);
		const ctr5b = ctr5a.generateRevertOrientation().translate(300, 0);
		rGeome.logstr += ctr5b.check();
		figOne.addMainO(ctr5b);
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
