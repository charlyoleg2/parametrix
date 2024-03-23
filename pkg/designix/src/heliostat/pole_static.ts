// pole_static.ts

import type {
	tContour,
	tParamDef,
	tParamVal,
	tGeom,
	tPageDef
	//tSubInst
	//tSubDesign
} from 'geometrix';
import {
	designParam,
	checkGeom,
	prefixLog,
	contour,
	contourCircle,
	figure,
	//degToRad,
	radToDeg,
	ffix,
	pNumber,
	pCheckbox,
	//pDropdown,
	pSectionSeparator,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

// design import
import { vaxisHolderDef } from './vaxis_holder';

const pDef: tParamDef = {
	partName: 'pole_static',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 1000, 20, 4000, 1),
		pNumber('D2', 'mm', 700, 10, 4000, 1),
		pNumber('D3', 'mm', 800, 10, 4000, 1),
		pNumber('H1', 'mm', 3000, 10, 40000, 10),
		pNumber('H2', 'mm', 7000, 50, 40000, 10),
		pSectionSeparator('thickness'),
		pNumber('E1', 'mm', 30, 1, 80, 1),
		pNumber('E2', 'mm', 5, 1, 80, 1),
		pSectionSeparator('base holes'),
		pNumber('N1', '', 32, 3, 100, 1),
		pNumber('D5', 'mm', 40, 1, 100, 1),
		pNumber('L1', 'mm', 45, 1, 300, 1),
		pSectionSeparator('door'),
		pNumber('D4', 'mm', 600, 1, 1200, 1),
		pNumber('H3', 'mm', 300, 5, 1200, 1),
		pNumber('H4', 'mm', 1800, 10, 2500, 1),
		pNumber('L2', 'mm', 30, 1, 100, 1),
		pNumber('E3', 'mm', 40, 1, 100, 1),
		pSectionSeparator('holders'),
		pCheckbox('holders', true),
		pNumber('PHL1A', 'mm', 400, 10, 1000, 1),
		pNumber('PHL1B', 'mm', 400, 10, 1000, 1),
		pNumber('PHB', 'mm', 2000, 10, 20000, 1),
		pNumber('PHD1A', 'mm', 600, 10, 4000, 1),
		pNumber('PHD1B', 'mm', 380, 10, 4000, 1),
		pNumber('PHN1AB', 'petal', 6, 1, 24, 1),
		pSectionSeparator('holder-B'),
		pNumber('PHD5B', 'mm', 600, 10, 4000, 1),
		pNumber('PHR4B', 'mm', 30, 3, 400, 1),
		pNumber('PHD3B', 'mm', 40, 3, 400, 1),
		pNumber('PHL2B', 'mm', 140, 3, 400, 1),
		pNumber('PHE3B', 'mm', 10, 1, 50, 1),
		pNumber('PHR6B', 'mm', 20, 0, 400, 1),
		pNumber('PHE1B', 'mm', 10, 1, 50, 1),
		pNumber('PHH1B', 'mm', 10, 1, 50, 1),
		pSectionSeparator('holder-A'),
		pNumber('PHD5A', 'mm', 600, 10, 4000, 1),
		pNumber('PHR4A', 'mm', 30, 3, 400, 1),
		pNumber('PHD3A', 'mm', 40, 3, 400, 1),
		pNumber('PHL2A', 'mm', 140, 3, 400, 1),
		pNumber('PHE3A', 'mm', 10, 1, 50, 1),
		pNumber('PHR6A', 'mm', 20, 0, 400, 1),
		pNumber('PHE1A', 'mm', 10, 1, 50, 1),
		pNumber('PHH1A', 'mm', 10, 1, 50, 1)
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
		E3: 'pole_stator_right.svg',
		holders: 'pole_stator_holders.svg',
		PHL1A: 'pole_stator_holders.svg',
		PHL1B: 'pole_stator_holders.svg',
		PHB: 'pole_stator_holders.svg',
		PHD1A: 'pole_stator_holders.svg',
		PHD1B: 'pole_stator_holders.svg',
		PHN1AB: 'pole_stator_holders.svg',
		PHD5A: 'pole_stator_holderB_top.svg',
		PHR4A: 'pole_stator_holderB_top.svg',
		PHD3A: 'pole_stator_holderB_top.svg',
		PHL2A: 'pole_stator_holderB_top.svg',
		PHE3A: 'pole_stator_holderB_top.svg',
		PHR6A: 'pole_stator_holderB_top.svg',
		PHE1A: 'pole_stator_holderB_section.svg',
		PHH1A: 'pole_stator_holderB_section.svg',
		PHD5B: 'pole_stator_holderB_top.svg',
		PHR4B: 'pole_stator_holderB_top.svg',
		PHD3B: 'pole_stator_holderB_top.svg',
		PHL2B: 'pole_stator_holderB_top.svg',
		PHE3B: 'pole_stator_holderB_top.svg',
		PHR6B: 'pole_stator_holderB_top.svg',
		PHE1B: 'pole_stator_holderB_section.svg',
		PHH1B: 'pole_stator_holderB_section.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

type tCtr1 = (orient: number, withR3: boolean) => tContour;
type tCtr2 = (pL2: number) => tContour;

function pGeom(t: number, param: tParamVal, suffix = ''): tGeom {
	const rGeome = initGeom(pDef.partName + suffix);
	let ctrPoleProfile: tCtr1;
	let ctrDoorFace: tCtr2;
	const figCut = figure();
	const figFace = figure();
	const figBottom = figure();
	const figEmptyPole = figure();
	const figEmptyDoor = figure();
	const figHolderBSection = figure();
	const figHolderBTop = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const R1 = param.D1 / 2;
		const R2 = param.D2 / 2;
		const R3 = param.D3 / 2;
		const poleHeight = param.H1 + param.H2;
		const coneAngle = Math.atan2(R1 - R2, param.H2);
		const H1bminus = param.E2 * Math.tan(coneAngle / 2);
		const H1b = param.H1 - H1bminus;
		const phl1b = param.PHL1B / Math.cos(coneAngle);
		const hb2R2 = R2 + (param.PHL1B / 2) * Math.tan(coneAngle);
		const hb2PosH = param.H1 + param.H2 - param.PHL1B / 2;
		// step-5 : checks on the parameter values
		if (R2 > R1) {
			throw `err091: D2 ${param.D2} is larger than D1 ${param.D1}`;
		}
		if (R3 + param.E2 > R1) {
			throw `err095: D3 ${param.D3} and E2 ${param.E2} are too large compare to D1 ${param.D1}`;
		}
		// step-6 : any logs
		rGeome.logstr += `pole-height: ${ffix(poleHeight)} mm\n`;
		rGeome.logstr += `cone-half-angle: ${ffix(radToDeg(coneAngle))} degree\n`;
		rGeome.logstr += `holder position: B2: ${ffix(hb2PosH)} mm\n`;
		// step-7 : drawing of the figures
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
		// holders
		if (param.holders) {
			const vaxisHolderBParam = designParam(vaxisHolderDef.pDef, 'B2');
			vaxisHolderBParam.setVal('PHD1', param.PHD1B);
			vaxisHolderBParam.setVal('PHD2', 2 * hb2R2);
			vaxisHolderBParam.setVal('PHD5', param.PHD5B);
			vaxisHolderBParam.setVal('PHN1', param.PHN1AB);
			vaxisHolderBParam.setVal('PHD3', param.PHD3B);
			vaxisHolderBParam.setVal('PHR4', param.PHR4B);
			vaxisHolderBParam.setVal('PHL2', param.PHL2B);
			vaxisHolderBParam.setVal('PHR6', param.PHR6);
			vaxisHolderBParam.setVal('PHE1', param.PHE1B);
			vaxisHolderBParam.setVal('PHH1', param.PHH1B);
			vaxisHolderBParam.setVal('PHA', coneAngle);
			vaxisHolderBParam.setVal('PHL1', phl1b);
			vaxisHolderBParam.setVal('PHE2', param.E2);
			vaxisHolderBParam.setVal('PHE3', param.PHE3B);
			const vaxisHolderBGeom = vaxisHolderDef.pGeom(
				0,
				vaxisHolderBParam.getParamVal(),
				vaxisHolderBParam.getSuffix()
			);
			checkGeom(vaxisHolderBGeom);
			rGeome.logstr += prefixLog(
				vaxisHolderBGeom.logstr,
				vaxisHolderBParam.getPartNameSuffix()
			);
			figHolderBSection.mergeFigure(vaxisHolderBGeom.fig.faceOuter);
			figHolderBTop.mergeFigure(vaxisHolderBGeom.fig.facePetal);
		}
		// final figure list
		rGeome.fig = {
			poleCut: figCut,
			poleFace: figFace,
			poleBottom: figBottom,
			emptyPole: figEmptyPole,
			emptyDoor: figEmptyDoor,
			holderBSection: figHolderBSection,
			holderBTop: figHolderBTop
		};
		const designName = rGeome.partName;
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
		rGeome.logstr += 'pole_static drawn successfully!\n';
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
