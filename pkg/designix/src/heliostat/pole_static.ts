// pole_static.ts

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
	radToDeg,
	ffix,
	pNumber,
	//pCheckbox,
	//pDropdown,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

const pDef: tParamDef = {
	partName: 'pole_static',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 1000, 100, 4000, 10),
		pNumber('D2', 'mm', 700, 100, 4000, 10),
		pNumber('D3', 'mm', 800, 100, 4000, 10),
		pNumber('H1', 'mm', 3000, 100, 40000, 10),
		pNumber('H2', 'mm', 7000, 100, 40000, 10),
		pNumber('E1', 'mm', 30, 1, 80, 1),
		pNumber('E2', 'mm', 5, 1, 80, 1),
		pNumber('N1', '', 32, 3, 100, 1),
		pNumber('D5', 'mm', 40, 1, 100, 1),
		pNumber('L1', 'mm', 45, 1, 300, 1),
		pNumber('D4', 'mm', 600, 200, 1200, 1),
		pNumber('H3', 'mm', 300, 50, 1200, 1),
		pNumber('H4', 'mm', 1800, 200, 2500, 1),
		pNumber('L2', 'mm', 30, 1, 100, 1),
		pNumber('E3', 'mm', 40, 1, 100, 1)
	],
	paramSvg: {
		D1: 'pole_stator_cut.svg',
		D2: 'pole_stator_cut.svg',
		D3: 'pole_stator_cut.svg',
		H1: 'pole_stator_cut.svg',
		H2: 'pole_stator_cut.svg',
		E1: 'pole_stator_cut.svg',
		E2: 'pole_stator_E2.svg',
		N1: 'pole_stator_bottom.svg',
		D5: 'pole_stator_bottom.svg',
		L1: 'pole_stator_bottom.svg',
		D4: 'pole_stator_face.svg',
		H3: 'pole_stator_face.svg',
		H4: 'pole_stator_face.svg',
		L2: 'pole_stator_face.svg',
		E3: 'pole_stator_right.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

type tCtr1 = (orient: number, withR3: boolean) => tContour;
type tCtr2 = (pL2: number) => tContour;

function pGeom(t: number, param: tParamVal): tGeom {
	let ctrPoleProfile: tCtr1;
	let ctrDoorFace: tCtr2;
	const rGeome = initGeom();
	const figCut = figure();
	const figFace = figure();
	const figBottom = figure();
	const figEmptyPole = figure();
	const figEmptyDoor = figure();
	rGeome.logstr += `simTime: ${t}\n`;
	try {
		const R1 = param.D1 / 2;
		const R2 = param.D2 / 2;
		const R3 = param.D3 / 2;
		if (R2 > R1) {
			throw `err091: D2 ${param.D2} is larger than D1 ${param.D1}`;
		}
		if (R3 + param.E2 > R1) {
			throw `err095: D3 ${param.D3} and E2 ${param.E2} are too large compare to D1 ${param.D1}`;
		}
		const poleHeight = param.H1 + param.H2;
		rGeome.logstr += `pole-height: ${ffix(poleHeight)} mm\n`;
		const coneAngle = Math.atan2(R1 - R2, param.H2);
		rGeome.logstr += `cone-half-angle: ${ffix(radToDeg(coneAngle))} degree\n`;
		const H1bminus = param.E2 * Math.tan(coneAngle / 2);
		const H1b = param.H1 - H1bminus;
		// figCut
		ctrPoleProfile = function (orient: number, withR3: boolean): tContour {
			const rPoleProfile = contour(orient * R1, 0)
				.addSegStrokeA(orient * R1, param.H1)
				.addSegStrokeA(orient * R2, poleHeight)
				.addSegStrokeR(
					-orient * param.E2 * Math.cos(coneAngle),
					-param.E2 * Math.sin(coneAngle)
				)
				.addSegStrokeA(orient * (R1 - param.E2), H1b);
			if (withR3) {
				rPoleProfile
					.addSegStrokeA(orient * (R1 - param.E2), param.E1)
					.addSegStrokeA(orient * R3, param.E1)
					.addSegStrokeA(orient * R3, 0);
			} else {
				rPoleProfile.addSegStrokeA(orient * (R1 - param.E2), 0);
			}
			rPoleProfile.closeSegStroke();
			return rPoleProfile;
		};
		figCut.addMain(ctrPoleProfile(1, false));
		figCut.addSecond(ctrPoleProfile(1, true));
		figCut.addSecond(ctrPoleProfile(-1, true));
		// figFace
		const R4 = param.D4 / 2;
		const doorStraightLenght = param.H4 - 2 * R4;
		if (doorStraightLenght < 0) {
			throw `err121: H4 ${param.H4} is too small compare to D4 ${param.D4}`;
		}
		if (R4 - param.L2 < 0) {
			throw `err121: D4 ${param.D4} is too small compare to L2 ${param.L2}`;
		}
		ctrDoorFace = function (pL2: number): tContour {
			const R4b = R4 - pL2;
			const H3b = param.H3 + R4;
			const rCtrDoorFace = contour(R4b, H3b + doorStraightLenght)
				.addPointR(-R4b, R4b)
				.addSegArc(R4b, false, true)
				.addPointR(-R4b, -R4b)
				.addSegArc(R4b, false, true)
				.addSegStrokeR(0, -doorStraightLenght)
				.addPointR(R4b, -R4b)
				.addSegArc(R4b, false, true)
				.addPointR(R4b, R4b)
				.addSegArc(R4b, false, true)
				.closeSegStroke();
			return rCtrDoorFace;
		};
		figFace.addMain(ctrDoorFace(0));
		figFace.addMain(ctrDoorFace(param.L2));
		const ctrPoleFace = contour(R1, 0)
			.addSegStrokeA(R1, param.H1)
			.addSegStrokeA(R2, poleHeight)
			.addSegStrokeA(-R2, poleHeight)
			.addSegStrokeA(-R1, param.H1)
			.addSegStrokeA(-R1, 0)
			.closeSegStroke();
		figFace.addSecond(ctrPoleFace);
		const ctrDoorSide = contour(-R1, param.H3)
			.addSegStrokeR(0, param.H4)
			.addSegStrokeR(-param.E3, 0)
			.addSegStrokeR(0, -param.H4)
			.closeSegStroke();
		figFace.addSecond(ctrDoorSide);
		// figBottom
		figBottom.addMain(contourCircle(0, 0, R1));
		figBottom.addMain(contourCircle(0, 0, R3));
		const posR = R3 + param.L1;
		const posA = (2 * Math.PI) / param.N1;
		for (let i = 0; i < param.N1; i++) {
			const posX = posR * Math.cos(i * posA);
			const posY = posR * Math.sin(i * posA);
			figBottom.addMain(contourCircle(posX, posY, param.D5 / 2));
		}
		figBottom.addSecond(contourCircle(0, 0, R2));
		figBottom.addSecond(contourCircle(0, 0, R1 - param.E2));
		// figEmptyPole
		figEmptyPole.addMain(contourCircle(0, 0, R1 + param.E3));
		figEmptyPole.addMain(contourCircle(0, 0, R1 - param.E2));
		// figEmptyDoor
		figEmptyDoor.addMain(ctrDoorFace(param.L2));
		// final figure list
		rGeome.fig = {
			poleCut: figCut,
			poleFace: figFace,
			poleBottom: figBottom,
			emptyPole: figEmptyPole,
			emptyDoor: figEmptyDoor
		};
		const designName = pDef.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_pole`,
					face: `${designName}_poleCut`,
					extrudeMethod: EExtrude.eRotate,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_bottom`,
					face: `${designName}_poleBottom`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.E1,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_door`,
					face: `${designName}_poleFace`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: R1 + param.E3,
					rotate: [Math.PI / 2, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_emptyPole`,
					face: `${designName}_emptyPole`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.H1,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_emptyDoor`,
					face: `${designName}_emptyDoor`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: R1 + param.E3 + 10,
					rotate: [Math.PI / 2, 0, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `ipax_${designName}_door`,
					//boolMethod: EBVolume.eSubstraction,
					boolMethod: EBVolume.eIntersection,
					inList: [`subpax_${designName}_door`, `subpax_${designName}_emptyPole`]
				},
				{
					outName: `ipax_${designName}_pole`,
					boolMethod: EBVolume.eSubstraction,
					inList: [`subpax_${designName}_pole`, `subpax_${designName}_emptyDoor`]
				},
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: [
						`ipax_${designName}_pole`,
						`subpax_${designName}_bottom`,
						`ipax_${designName}_door`
					]
				}
			]
		};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'pole_static draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const poleStaticDef: tPageDef = {
	pTitle: 'Heliostat pole static',
	pDescription: 'The vertical pole of an heliostat',
	pDef: pDef,
	pGeom: pGeom
};

export { poleStaticDef };
