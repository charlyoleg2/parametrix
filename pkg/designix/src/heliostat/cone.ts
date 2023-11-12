// cone.ts

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
	partName: 'cone',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 600, 100, 4000, 10),
		pNumber('D2', 'mm', 400, 100, 4000, 10),
		pNumber('D3', 'mm', 400, 100, 4000, 10),
		pNumber('H1', 'mm', 800, 100, 4000, 10),
		pNumber('H2', 'mm', 3000, 100, 6000, 10),
		pNumber('E1', 'mm', 20, 1, 80, 1),
		pNumber('E3', 'mm', 30, 1, 80, 1),
		pNumber('H4', 'mm', 400, 100, 1000, 10),
		pNumber('D4', 'mm', 500, 100, 1000, 10),
		pNumber('E4', 'mm', 20, 1, 80, 1),
		pNumber('H5', 'mm', 1000, 100, 2000, 10),
		pNumber('D5', 'mm', 300, 10, 1000, 10),
		pNumber('L4', 'mm', 300, 10, 1000, 10),
		pNumber('L5', 'mm', 2000, 100, 4000, 10),
		pNumber('L6', 'mm', 2000, 100, 4000, 10),
		pNumber('D6', 'mm', 100, 10, 600, 10),
		pNumber('E6', 'mm', 10, 1, 80, 1),
		pNumber('L7', 'mm', 100, 10, 1000, 1),
		pNumber('L8', 'mm', 200, 10, 1000, 1),
		pNumber('N1', '', 24, 3, 100, 1),
		pNumber('D7', 'mm', 40, 1, 100, 1),
		pNumber('L1', 'mm', 30, 1, 300, 1)
	],
	paramSvg: {
		D1: 'cone_face.svg',
		D2: 'cone_face.svg',
		D3: 'cone_face.svg',
		H1: 'cone_face.svg',
		H2: 'cone_face.svg',
		E1: 'cone_face.svg',
		E2: 'cone_face.svg',
		E3: 'cone_face.svg',
		H4: 'cone_side.svg',
		D4: 'cone_side.svg',
		E4: 'cone_side.svg',
		H5: 'cone_side.svg',
		D5: 'cone_side.svg',
		L4: 'cone_face.svg',
		L5: 'cone_face.svg',
		L6: 'cone_face.svg',
		D6: 'cone_face.svg',
		E6: 'cone_face.svg',
		L7: 'cone_face.svg',
		L8: 'cone_face.svg',
		N1: 'cone_top.svg',
		D7: 'cone_top.svg',
		L1: 'cone_top.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

type tCtr1 = (orient: number) => tContour;

function pGeom(t: number, param: tParamVal): tGeom {
	let ctrCone: tCtr1;
	const rGeome = initGeom();
	const figCut = figure();
	const figSide = figure();
	const figTop = figure();
	rGeome.logstr += `simTime: ${t}\n`;
	try {
		const R1 = param.D1 / 2;
		const R2 = param.D2 / 2;
		const R3 = param.D3 / 2;
		//const R4 = param.D4 / 2;
		//const R5 = param.D5 / 2;
		//const R6 = param.D6 / 2;
		//const R7 = param.D7 / 2;
		const H1H2 = param.H1 + param.H2;
		const H1H5 = H1H2 - param.H4 + param.H5;
		rGeome.logstr += `cone-height: ${ffix(H1H2)} mm\n`;
		rGeome.logstr += `cone-height total: ${ffix(H1H5)} mm\n`;
		if (param.D2 > param.D1) {
			throw `err110: D2 ${param.D2} is larger than D1 ${param.D1}`;
		}
		// figCut
		const coneAngle = Math.atan2(R1 - R2, param.H2);
		const coneSlopeX = param.E1 * Math.cos(coneAngle);
		const coneSlopeY = param.E1 * Math.sin(coneAngle);
		const coneFC = param.E1 * Math.tan(coneAngle / 2);
		ctrCone = function (orient: number): tContour {
			const rCtrCone = contour(orient * R1, 0)
				.addSegStrokeA(orient * R1, param.H1)
				.addSegStrokeA(orient * R2, H1H2)
				.addSegStrokeA(orient * (R2 - coneSlopeX), H1H2 - coneSlopeY)
				.addSegStrokeA(orient * (R1 - param.E1), param.H1 - coneFC)
				.addSegStrokeA(orient * (R1 - param.E1), 0)
				.closeSegStroke();
			return rCtrCone;
		};
		figCut.addMain(ctrCone(1));
		figCut.addSecond(ctrCone(-1));
		// figSide
		// figTop
		figTop.addMain(contourCircle(0, 0, R3));
		// final figure list
		rGeome.fig = {
			faceCut: figCut,
			faceSide: figSide,
			faceTop: figTop
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
		rGeome.logstr += 'heliostat-cone draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const coneDef: tPageDef = {
	pTitle: 'Heliostat cone',
	pDescription: 'The cone on top of the pole-rotor of the heliostat',
	pDef: pDef,
	pGeom: pGeom
};

export { coneDef };
