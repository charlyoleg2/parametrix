// spider.ts

import type {
	//tContour,
	tParamDef,
	tParamVal,
	tGeom,
	tPageDef
	//tMParams,
	//tRParams,
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
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

const pDef: tParamDef = {
	partName: 'spider',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 100, 10, 400, 1),
		pNumber('L1', 'mm', 400, 100, 1000, 10),
		pNumber('L2', 'mm', 400, 100, 1000, 10),
		pNumber('L3', 'mm', 100, 10, 400, 1),
		pNumber('L4', 'mm', 3000, 500, 8000, 10),
		pNumber('L5', 'mm', 2000, 100, 8000, 10),
		pNumber('L6', 'mm', 30, 1, 100, 1),
		pNumber('E1', 'mm', 3, 1, 80, 1),
		pNumber('E2', 'mm', 50, 1, 200, 1),
		pNumber('E3', 'mm', 3, 1, 80, 1),
		pNumber('R2', 'mm', 100, 10, 400, 10),
		pNumber('N1', '', 6, 1, 20, 1)
	],
	paramSvg: {
		D1: 'spider_profile.svg',
		L1: 'spider_profile.svg',
		L2: 'spider_profile.svg',
		L3: 'spider_profile.svg',
		L4: 'spider_profile.svg',
		L5: 'spider_lateral.svg',
		L6: 'spider_lateral.svg',
		E1: 'spider_profile.svg',
		E2: 'spider_profile.svg',
		E3: 'spider_profile.svg',
		R2: 'spider_profile.svg',
		N1: 'spider_lateral.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal): tGeom {
	const rGeome = initGeom();
	const figLegs = figure();
	const figTube = figure();
	rGeome.logstr += `simTime: ${t}\n`;
	try {
		const R1 = param.D1 / 2;
		if (param.D1 < param.E2) {
			throw `err476: D1 ${param.D1} smaller then E2 ${param.E2}`;
		}
		const legE2 = param.E2 / 2;
		const legStartY = Math.sqrt(R1 ** 2 - legE2 ** 2);
		const legL2 = param.L1 + param.L2 * Math.sqrt(2);
		const legL3 = param.L2 + param.L1 * Math.sqrt(2);
		const legL4 = param.L4 - legL3;
		if (legL4 < param.R2) {
			throw `err984: L4 ${param.L4} too small compare to R2 ${param.R2}`;
		}
		const legL4x = legL4 * Math.cos(Math.PI / 4);
		const legL4y = legL4 * Math.sin(Math.PI / 4);
		const E2x = param.E2 * Math.cos(Math.PI / 4);
		const E2y = param.E2 * Math.sin(Math.PI / 4);
		const elbowx = param.E2 * Math.tan(Math.PI / 8);
		if (R1 < param.E1) {
			throw `err092: D1 ${param.D1} too small compare to E1 ${param.E1}`;
		}
		rGeome.logstr += `spide leg number: ${param.N1}\n`;
		// figLegs
		const ctrLeg = contour(legE2, -legStartY)
			.addCornerRounded(param.R2)
			.addSegStrokeA(legE2, -param.L1)
			.addCornerRounded(param.R2)
			.addSegStrokeA(legL2, -param.L1)
			.addCornerRounded(param.R2 + param.E2)
			.addSegStrokeA(legL2 + legL4x, -param.L1 - legL4y)
			.addSegStrokeA(legL2 + legL4x - E2x, -param.L1 - legL4y - E2y)
			.addSegStrokeA(legL2 - elbowx, -param.L1 - param.E2)
			.addCornerRounded(param.R2)
			.addSegStrokeA(-legL2 + elbowx, -param.L1 - param.E2)
			.addCornerRounded(param.R2)
			.addSegStrokeA(-legL2 - legL4x + E2x, -param.L1 - legL4y - E2y)
			.addSegStrokeA(-legL2 - legL4x, -param.L1 - legL4y)
			.addSegStrokeA(-legL2, -param.L1)
			.addCornerRounded(param.R2 + param.E2)
			.addSegStrokeA(-legE2, -param.L1)
			.addCornerRounded(param.R2)
			.addSegStrokeA(-legE2, -legStartY)
			.addCornerRounded(param.R2)
			.closeSegArc(R1, true, false);
		figLegs.addMain(ctrLeg);
		// figTube
		figTube.addMain(contourCircle(0, 0, R1));
		figTube.addMain(contourCircle(0, 0, R1 - param.E1));
		// final figure list
		rGeome.fig = {
			faceLegs: figLegs,
			faceTube: figTube
		};
		const designName = pDef.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_pole`,
					face: `${designName}_faceCut`,
					extrudeMethod: EExtrude.eRotate,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_bottom`,
					face: `${designName}_faceBottom`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.E2,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_top`,
					face: `${designName}_faceBottom`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.E2,
					rotate: [0, 0, 0],
					translate: [0, 0, param.H1 - param.E2]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: [
						`subpax_${designName}_pole`,
						`subpax_${designName}_bottom`,
						`subpax_${designName}_top`
					]
				}
			]
		};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'heliostat-spider draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const spiderDef: tPageDef = {
	pTitle: 'Heliostat spider',
	pDescription: 'The spider part for the control of the inclination of the heliostat',
	pDef: pDef,
	pGeom: pGeom
};

export { spiderDef };
