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
		pNumber('H1', 'mm', 8000, 100, 40000, 10),
		pNumber('H2', 'mm', 8000, 100, 40000, 10),
		pNumber('E1', 'mm', 5, 1, 80, 1),
		pNumber('E2', 'mm', 30, 1, 80, 1),
		pNumber('E3', 'mm', 30, 1, 80, 1),
		pNumber('H4', 'mm', 8000, 100, 40000, 10),
		pNumber('D4', 'mm', 8000, 100, 40000, 10),
		pNumber('E4', 'mm', 8000, 100, 40000, 10),
		pNumber('H5', 'mm', 8000, 100, 40000, 10),
		pNumber('D5', 'mm', 8000, 100, 40000, 10),
		pNumber('L4', 'mm', 8000, 100, 40000, 10),
		pNumber('L5', 'mm', 8000, 100, 40000, 10),
		pNumber('L6', 'mm', 8000, 100, 40000, 10),
		pNumber('D6', 'mm', 8000, 100, 40000, 10),
		pNumber('E6', 'mm', 8000, 100, 40000, 10),
		pNumber('L7', 'mm', 8000, 100, 40000, 10),
		pNumber('L8', 'mm', 8000, 100, 40000, 10),
		pNumber('N1', '', 24, 3, 100, 1),
		pNumber('D7', 'mm', 40, 1, 100, 1),
		pNumber('L1', 'mm', 45, 1, 300, 1)
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
