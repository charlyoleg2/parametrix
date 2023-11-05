// base.ts

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
	partName: 'base',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 600, 100, 4000, 10),
		pNumber('D2', 'mm', 700, 100, 4000, 10),
		pNumber('D3', 'mm', 400, 100, 4000, 10),
		pNumber('D4', 'mm', 500, 100, 4000, 10),
		pNumber('E1', 'mm', 30, 1, 80, 1),
		pNumber('E2', 'mm', 30, 1, 80, 1),
		pNumber('E3', 'mm', 30, 1, 80, 1),
		pNumber('H1', 'mm', 800, 10, 4000, 10),
		pNumber('H2', 'mm', 50, 10, 4000, 10),
		pNumber('H3', 'mm', 400, 10, 4000, 10),
		pNumber('N1', '', 24, 3, 100, 1),
		pNumber('D5', 'mm', 40, 1, 100, 1),
		pNumber('L1', 'mm', 34, 1, 300, 1),
		pNumber('L2', 'mm', 100, 1, 400, 1)
	],
	paramSvg: {
		D1: 'base_cut.svg',
		D2: 'base_cut.svg',
		D3: 'base_cut.svg',
		D4: 'base_cut.svg',
		E1: 'base_cut.svg',
		E2: 'base_cut.svg',
		E3: 'base_cut.svg',
		H1: 'base_cut.svg',
		H2: 'base_hollow.svg',
		H3: 'base_hollow.svg',
		N1: 'base_top.svg',
		D5: 'base_top.svg',
		L1: 'base_top.svg',
		L2: 'base_hollow.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

type tCtr1 = (orient: number) => tContour;

function pGeom(t: number, param: tParamVal): tGeom {
	let ctrBaseCut1: tCtr1;
	let ctrBaseCut2: tCtr1;
	let ctrHollow: tCtr1;
	const rGeome = initGeom();
	const figCut = figure();
	const figTop = figure();
	const figHollow = figure();
	rGeome.logstr += `simTime: ${t}\n`;
	try {
		const R1 = param.D1 / 2;
		const R2 = param.D2 / 2;
		const R3 = param.D3 / 2;
		const R4 = param.D4 / 2;
		const R5 = param.D5 / 2;
		const RL2 = param.L2 / 2;
		if (R2 < R1) {
			throw `err089: D2 ${param.D2} too small compare to D1 ${param.D1}`;
		}
		if (R4 > R1 - param.E2) {
			throw `err189: D4 ${param.D4} too large compare to D1 ${param.D1} and E2 ${param.E2}`;
		}
		rGeome.logstr += `base-height: ${ffix(param.H1)} mm\n`;
		rGeome.logstr += `base-external-diameter: ${ffix(param.D2)} mm\n`;
		// figCut
		ctrBaseCut1 = function (orient: number): tContour {
			const rBaseCut1 = contour(orient * R2, 0)
				.addSegStrokeA(orient * R2, param.E3)
				.addSegStrokeA(orient * R1, param.E3)
				.addSegStrokeA(orient * R1, param.H1)
				.addSegStrokeA(orient * (R1 - param.E2), param.H1)
				.addSegStrokeA(orient * (R1 - param.E2), param.E3)
				.addSegStrokeA(orient * R4, param.E3)
				.addSegStrokeA(orient * R4, 0)
				.closeSegStroke();
			return rBaseCut1;
		};
		ctrBaseCut2 = function (orient: number): tContour {
			const rBaseCut2 = contour(orient * R2, 0)
				.addSegStrokeA(orient * R2, param.E3)
				.addSegStrokeA(orient * R1, param.E3)
				.addSegStrokeA(orient * R1, param.H1)
				.addSegStrokeA(orient * R3, param.H1)
				.addSegStrokeA(orient * R3, param.H1 - param.E1)
				.addSegStrokeA(orient * (R1 - param.E2), param.H1 - param.E1)
				.addSegStrokeA(orient * (R1 - param.E2), param.E3)
				.addSegStrokeA(orient * R4, param.E3)
				.addSegStrokeA(orient * R4, 0)
				.closeSegStroke();
			return rBaseCut2;
		};
		if (param.H1 < param.E3 + param.H2 + param.H3 + param.E1) {
			throw `err125: H1 ${param.H1} too small compare to E3 ${param.H3}, H2 ${param.H2}, H3 ${param.H3}, E1 ${param.E1}`;
		}
		if (param.D5 > param.H3) {
			throw `err128: D5 ${param.D5} too large compare to H3 ${param.H3}`;
		}
		const hollowAngle = 2 * Math.asin(RL2 / (R1 - param.E2));
		if (param.N2 * hollowAngle > 2 * Math.PI) {
			throw `err132: N2 ${param.N2} too large compare to L2 ${param.L2}, D1 ${param.D1}, E2 ${param.E2}`;
		}
		const hollowH = param.E3 + param.H2 + RL2;
		ctrHollow = function (orient: number): tContour {
			const rHollow = contour(orient * RL2, hollowH)
				.addSegStrokeA(orient * RL2, hollowH + param.H3 - param.L2)
				.addPointA(-orient * RL2, hollowH + param.H3 - param.L2)
				.addSegArc(RL2, false, true)
				.addSegStrokeA(-orient * RL2, hollowH)
				//.addPointA(orient * RL2, hollowH)
				.closeSegArc(RL2, false, true);
			return rHollow;
		};
		figCut.addMain(ctrBaseCut1(1));
		figCut.addSecond(ctrBaseCut2(1));
		figCut.addSecond(ctrBaseCut2(-1));
		figCut.addSecond(ctrHollow(1));
		// figTop
		if (R3 + param.L1 + R5 > R1 - param.E2) {
			throw `err127: D3 ${param.D3} too large compare to D1 ${param.D1}, E2 ${param.E2}, L1 ${param.L1}, R5 ${param.D5}`;
		}
		if (R5 > param.L1) {
			throw `err130: D5 ${param.D5} too large compare to L1 ${param.L1}`;
		}
		const holeAngle = 2 * Math.asin(R5 / (R2 + param.L1));
		if (param.N1 * holeAngle > 2 * Math.PI) {
			throw `err134: N1 ${param.N1} too large compare to D5 ${param.D5}, L1 ${param.L1}, D2 ${param.D2}`;
		}
		figTop.addMain(contourCircle(0, 0, R1));
		figTop.addMain(contourCircle(0, 0, R3));
		const posR = R3 + param.L1;
		const posA = (2 * Math.PI) / param.N1;
		for (let i = 0; i < param.N1; i++) {
			const posX = posR * Math.cos(i * posA);
			const posY = posR * Math.sin(i * posA);
			figTop.addMain(contourCircle(posX, posY, R5));
		}
		figTop.addSecond(contourCircle(0, 0, R1 - param.E1));
		figTop.addSecond(contourCircle(0, 0, R2));
		figTop.addSecond(contourCircle(0, 0, R4));
		// figHollow
		figHollow.addMain(ctrHollow(1));
		figHollow.addSecond(ctrBaseCut2(1));
		figHollow.addSecond(ctrBaseCut2(-1));
		// final figure list
		rGeome.fig = {
			faceCut: figCut,
			faceTop: figTop,
			faceHollow: figHollow
		};
		const designName = pDef.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_cut`,
					face: `${designName}_faceCut`,
					extrudeMethod: EExtrude.eRotate,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_top`,
					face: `${designName}_faceTop`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.E1,
					rotate: [0, 0, 0],
					translate: [0, 0, param.H1 - param.E1]
				},
				{
					outName: `subpax_${designName}_hollow`,
					face: `${designName}_faceBottom`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: R2 + param.E2,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: [
						`subpax_${designName}_cut`,
						`subpax_${designName}_top`,
						`subpax_${designName}_hollow`
					]
				}
			]
		};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'heliostat-base draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const baseDef: tPageDef = {
	pTitle: 'Heliostat base',
	pDescription: 'The base for the static-pole of the heliostat',
	pDef: pDef,
	pGeom: pGeom
};

export { baseDef };
