// spider.ts

import type {
	tContour,
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
	ffix,
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

type tCtr1 = (orient: number) => tContour;

function pGeom(t: number, param: tParamVal): tGeom {
	let ctrPoleProfile: tCtr1;
	const rGeome = initGeom();
	const figCut = figure();
	const figBottom = figure();
	rGeome.logstr += `simTime: ${t}\n`;
	try {
		const R1 = param.D1 / 2;
		const R2 = param.D2 / 2;
		const R3 = param.D3 / 2;
		rGeome.logstr += `pole-height: ${ffix(param.H1)} mm\n`;
		// figCut
		const ctrCylinder = contour(R1, 0)
			.addSegStrokeA(R1, param.H1)
			.addSegStrokeA(R1 - param.E1, param.H1)
			.addSegStrokeA(R1 - param.E1, 0)
			.closeSegStroke();
		figCut.addMain(ctrCylinder);
		ctrPoleProfile = function (orient: number): tContour {
			const rPoleProfile = contour(orient * R1, 0)
				.addSegStrokeA(orient * R1, param.H1)
				.addSegStrokeA(orient * R2, param.H1)
				.addSegStrokeA(orient * R2, param.H1 - param.E2)
				.addSegStrokeA(orient * (R1 - param.E1), param.H1 - param.E2)
				.addSegStrokeA(orient * (R1 - param.E1), param.E2)
				.addSegStrokeA(orient * R2, param.E2)
				.addSegStrokeA(orient * R2, 0)
				.closeSegStroke();
			return rPoleProfile;
		};
		figCut.addSecond(ctrPoleProfile(1));
		figCut.addSecond(ctrPoleProfile(-1));
		// figBottom
		figBottom.addMain(contourCircle(0, 0, R1));
		figBottom.addMain(contourCircle(0, 0, R2));
		const posR = R2 + param.L1;
		const posA = (2 * Math.PI) / param.N1;
		for (let i = 0; i < param.N1; i++) {
			const posX = posR * Math.cos(i * posA);
			const posY = posR * Math.sin(i * posA);
			figBottom.addMain(contourCircle(posX, posY, R3));
		}
		figBottom.addSecond(contourCircle(0, 0, R1 - param.E1));
		// final figure list
		rGeome.fig = {
			faceCut: figCut,
			faceBottom: figBottom
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
