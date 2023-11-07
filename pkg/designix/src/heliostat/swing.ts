// swing.ts

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
	partName: 'swing',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('L1', 'mm', 12000, 1000, 40000, 10),
		pNumber('L2', 'mm', 6000, 1000, 40000, 10),
		pNumber('L3', 'mm', 500, 100, 4000, 10),
		pNumber('L4', 'mm', 600, 100, 4000, 10),
		pNumber('L5', 'mm', 2000, 100, 10000, 10),
		pNumber('L6', 'mm', 2000, 100, 10000, 10),
		pNumber('D1', 'mm', 400, 50, 1000, 1),
		pNumber('H1', 'mm', 100, 10, 400, 1),
		pNumber('H2', 'mm', 100, 10, 400, 1),
		pNumber('H3', 'mm', 100, 10, 400, 1),
		pNumber('H4', 'mm', 100, 10, 400, 1),
		pNumber('E1', 'mm', 5, 1, 80, 1),
		pNumber('E2', 'mm', 3, 1, 80, 1),
		pNumber('E3', 'mm', 3, 1, 80, 1)
	],
	paramSvg: {
		L1: 'swing_top.svg',
		L2: 'swing_top.svg',
		L3: 'swing_top.svg',
		L4: 'swing_top.svg',
		L5: 'swing_top.svg',
		L6: 'swing_top.svg',
		D1: 'swing_top.svg',
		H1: 'swing_top.svg',
		H2: 'swing_top.svg',
		H3: 'swing_side.svg',
		H4: 'swing_side.svg',
		E1: 'swing_side.svg',
		E2: 'swing_side.svg',
		E3: 'swing_face.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

type tCtr1 = (px: number, py: number, lx: number, ly: number) => tContour;

function pGeom(t: number, param: tParamVal): tGeom {
	let ctrRectangle: tCtr1;
	const rGeome = initGeom();
	const figSide = figure();
	const figFace = figure();
	const figTop = figure();
	rGeome.logstr += `simTime: ${t}\n`;
	try {
		const R1 = param.D1 / 2;
		rGeome.logstr += `swing size: L1 ${ffix(param.L1)} x L2 ${ffix(param.L1)} mm\n`;
		ctrRectangle = function (px: number, py: number, lx: number, ly: number): tContour {
			const rRect = contour(px, py)
				.addSegStrokeA(px + lx, py)
				.addSegStrokeA(px + lx, py + ly)
				.addSegStrokeA(px, py + ly)
				.closeSegStroke();
			return rRect;
		};
		// figSide
		figSide.addMain(contourCircle(0, 0, R1));
		figSide.addMain(contourCircle(0, 0, R1 - param.E1));
		const sidePx = [
			-param.L2 / 2,
			-param.L3 / 2 - param.H2,
			param.L3 / 2,
			param.L2 / 2 - param.H2
		];
		for (const px of sidePx) {
			figSide.addMain(ctrRectangle(px, R1 - param.H1, param.H2, param.H4));
			figSide.addMain(
				ctrRectangle(
					px + param.E2,
					R1 - param.H1 + param.E2,
					param.H2 - 2 * param.E2,
					param.H4 - 2 * param.E2
				)
			);
		}
		figSide.addSecond(ctrRectangle(-param.L2 / 2, R1, param.L2, param.H3));
		// figFace
		const facePx: number[] = [];
		facePx.push(-param.L1 / 2);
		facePx.push(param.L1 / 2 - param.H1);
		for (const px of [
			-param.L5 / 2 - 2 * param.L4 - param.L6,
			-param.L5 / 2 - param.L4,
			param.L5 / 3,
			param.L5 / 2 + param.L4 + param.L6
		]) {
			for (const pxp of [0, param.L4 - param.H1]) {
				facePx.push(px + pxp);
			}
		}
		for (const px of facePx) {
			figFace.addMain(ctrRectangle(px, R1, param.H1, param.H3));
			figFace.addMain(
				ctrRectangle(
					px + param.E3,
					R1 + param.E3,
					param.H1 - 2 * param.E3,
					param.H3 - 2 * param.E3
				)
			);
		}
		figFace.addSecond(ctrRectangle(-param.L1 / 2, -R1, param.L1, param.D1));
		figFace.addSecond(ctrRectangle(-param.L1 / 2, R1 - param.H4, param.L1, param.H4));
		// figTop
		for (const px of facePx) {
			figTop.addSecond(ctrRectangle(px, -param.L2 / 2, param.H1, param.L2));
		}
		for (const py of sidePx) {
			figTop.addSecond(ctrRectangle(-param.L1 / 2, py, param.L1, param.H2));
		}
		figTop.addSecond(ctrRectangle(-param.L1 / 2, -R1, param.L1, param.D1));
		// final figure list
		rGeome.fig = {
			faceSide: figSide,
			faceFace: figFace,
			faceTop: figTop
		};
		const designName = pDef.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_side`,
					face: `${designName}_faceSide`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.L1,
					rotate: [0, 0, 0],
					translate: [0, 0, -param.L1 / 2]
				},
				{
					outName: `subpax_${designName}_face`,
					face: `${designName}_faceFace`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.L2,
					rotate: [0, Math.PI / 2, 0],
					translate: [-param.L2 / 2, 0, 0]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: [`subpax_${designName}_side`, `subpax_${designName}_face`]
				}
			]
		};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'heliostat-swing draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const swingDef: tPageDef = {
	pTitle: 'Heliostat swing',
	pDescription: 'The swing for the heliostat inclination',
	pDef: pDef,
	pGeom: pGeom
};

export { swingDef };
