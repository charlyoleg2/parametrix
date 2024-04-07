// swing.ts

import type {
	//tContour,
	tParamDef,
	tParamVal,
	tGeom,
	tExtrude,
	//tSubInst,
	//tSubDesign,
	tPageDef
} from 'geometrix';
import {
	point,
	contour,
	contourCircle,
	ctrRectangle,
	figure,
	//degToRad,
	//radToDeg,
	ffix,
	pNumber,
	//pCheckbox,
	//pDropdown,
	pSectionSeparator,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

const pDef: tParamDef = {
	partName: 'swing',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('L1', 'mm', 12500, 100, 40000, 1),
		pNumber('L2', 'mm', 6000, 100, 40000, 1),
		pSectionSeparator('radial'),
		pNumber('D1', 'mm', 400, 1, 1000, 1),
		pNumber('E1', 'mm', 5, 1, 80, 1),
		pNumber('H2', 'mm', 100, 1, 400, 1),
		pNumber('H4', 'mm', 100, 1, 400, 1),
		pNumber('E2', 'mm', 3, 1, 80, 1),
		pNumber('L3', 'mm', 500, 1, 4000, 1),
		pSectionSeparator('longitudinal'),
		pNumber('L4', 'mm', 600, 1, 4000, 1),
		pNumber('L5', 'mm', 2000, 1, 10000, 1),
		pNumber('L6', 'mm', 2000, 1, 10000, 1),
		pNumber('H1', 'mm', 100, 1, 400, 1),
		pNumber('H3', 'mm', 100, 1, 400, 1),
		pNumber('E3', 'mm', 3, 1, 80, 1),
		pSectionSeparator('buttress'),
		pNumber('S1', 'mm', 300, 0, 3000, 1),
		pNumber('S2', 'mm', 10, 0, 2000, 1),
		pNumber('R2', 'mm', 100, 0, 1000, 1),
		pSectionSeparator('rod overlay'),
		pNumber('rod1', '', 10, 1, 40, 1),
		pNumber('rod2', 'mm', 1300, 10, 4000, 1),
		pNumber('rod3', 'mm', 400, 10, 1000, 1),
		pNumber('rod4', 'mm', 100, 1, 400, 1)
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
		E3: 'swing_face.svg',
		S1: 'swing_buttress.svg',
		S2: 'swing_buttress.svg',
		R2: 'swing_buttress.svg',
		rod1: 'swing_with_rod.svg',
		rod2: 'swing_with_rod.svg',
		rod3: 'swing_with_rod.svg',
		rod4: 'swing_with_rod.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal, suffix = ''): tGeom {
	const rGeome = initGeom(pDef.partName + suffix);
	const figSide = figure();
	const figFace = figure();
	const figTop = figure();
	const figButtress = figure();
	const figTopWithRod = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const R1 = param.D1 / 2;
		const lAE = R1 + param.S2;
		const rakeBeamL = 4 * param.L4 + param.L5 + 2 * param.L6 - 2 * param.H1;
		const rakeL4 = param.L4 - 2 * param.H1;
		const rakeL5 = param.L5 + 2 * param.H1;
		const rakeL6 = param.L6 + 2 * param.H1;
		// step-5 : checks on the parameter values
		// step-6 : any logs
		rGeome.logstr += `swing size: L1 ${ffix(param.L1)} x L2 ${ffix(param.L2)} mm\n`;
		rGeome.logstr += `rake-L4: ${ffix(rakeL4)} mm (compare with rake)\n`;
		rGeome.logstr += `rake-L5: ${ffix(rakeL5)} mm (compare with rake)\n`;
		rGeome.logstr += `rake-L6: ${ffix(rakeL6)} mm (compare with rake)\n`;
		rGeome.logstr += `rake-beamL: (4*L4+L5+2*L6-2*H1) ${ffix(rakeBeamL)} mm (compare with rake)\n`;
		// step-7 : drawing of the figures
		// figSide
		figSide.addMain(contourCircle(0, 0, R1));
		figSide.addMain(contourCircle(0, 0, R1 - param.E1));
		const sidePx = [-param.L2 / 2, -param.L3 - param.H2, param.L3, param.L2 / 2 - param.H2];
		for (const px of sidePx) {
			figSide.addMain(ctrRectangle(px, lAE - param.H4, param.H2, param.H4));
			figSide.addMain(
				ctrRectangle(
					px + param.E2,
					lAE - param.H4 + param.E2,
					param.H2 - 2 * param.E2,
					param.H4 - 2 * param.E2
				)
			);
		}
		figSide.addSecond(ctrRectangle(-param.L2 / 2, lAE, param.L2, param.H3));
		// figFace
		const facePx: number[] = [];
		facePx.push(-param.L1 / 2);
		facePx.push(param.L1 / 2 - param.H1);
		for (const px of [
			-param.L5 / 2 - 2 * param.L4 - param.L6,
			-param.L5 / 2 - param.L4,
			param.L5 / 2,
			param.L5 / 2 + param.L4 + param.L6
		]) {
			for (const pxp of [0, param.L4 - param.H1]) {
				facePx.push(px + pxp);
			}
		}
		for (const px of facePx) {
			figFace.addMain(ctrRectangle(px, lAE, param.H1, param.H3));
			figFace.addMain(
				ctrRectangle(
					px + param.E3,
					lAE + param.E3,
					param.H1 - 2 * param.E3,
					param.H3 - 2 * param.E3
				)
			);
		}
		figFace.addSecond(ctrRectangle(-param.L1 / 2, -R1, param.L1, param.D1));
		figFace.addSecond(ctrRectangle(-param.L1 / 2, lAE - param.H4, param.L1, param.H4));
		// figTop
		for (const px of facePx) {
			figTop.addSecond(ctrRectangle(px, -param.L2 / 2, param.H1, param.L2));
		}
		for (const py of sidePx) {
			figTop.addSecond(ctrRectangle(-param.L1 / 2, py, param.L1, param.H2));
		}
		figTop.addSecond(ctrRectangle(-param.L1 / 2, -R1, param.L1, param.D1));
		// figButtress
		const lAC = Math.sqrt(lAE ** 2 + param.S1 ** 2);
		const aBAC = Math.acos(R1 / lAC);
		const aEAC = Math.atan2(param.S1, lAE);
		const pA = point(0, 0);
		const pF = pA.translatePolar(Math.PI / 2 + aEAC, R1);
		const pD = pF.rotate(pA, aBAC);
		const ctrButtress = contour(-param.L3, lAE)
			.addSegStrokeA(-param.S1, lAE)
			.addCornerRounded(param.R2)
			.addSegStrokeA(pD.cx, pD.cy)
			.addPointA(0, -R1)
			.addPointA(-pD.cx, pD.cy)
			.addSegArc2()
			.addSegStrokeA(param.S1, lAE)
			.addCornerRounded(param.R2)
			.addSegStrokeA(param.L3, lAE)
			.addSegStrokeA(param.L3, lAE + param.E3)
			.addSegStrokeA(-param.L3, lAE + param.E3)
			.closeSegStroke();
		figButtress.addMain(ctrButtress);
		figButtress.addMain(contourCircle(0, 0, R1 - param.E1));
		figSide.addSecond(ctrButtress);
		// figTopWithRod
		for (const px of facePx) {
			figTopWithRod.addMain(ctrRectangle(px, -param.L2 / 2, param.H1, param.L2));
		}
		for (const py of sidePx) {
			figTopWithRod.addMain(ctrRectangle(-param.L1 / 2, py, param.L1, param.H2));
		}
		figTopWithRod.addMain(ctrRectangle(-param.L1 / 2, -R1, param.L1, param.D1));
		const rodPx0 = -((param.rod1 - 1) * param.rod2 + param.rod3) / 2;
		const rodOffset = (param.rod3 - param.rod4) / 2;
		const rodPlateH = param.rod3 / 2;
		const rodLength = 1.2 * param.L2;
		const rodPyStep = (rodLength - rodPlateH) / (4 - 1);
		const rodPy0 = -rodLength / 2;
		for (let i = 0; i < param.rod1; i++) {
			const px = rodPx0 + i * param.rod2;
			figTopWithRod.addSecond(ctrRectangle(px + rodOffset, rodPy0, param.rod4, rodLength));
			for (let j = 0; j < 4; j++) {
				figTopWithRod.addSecond(
					ctrRectangle(px, rodPy0 + j * rodPyStep, param.rod3, rodPlateH, rodPlateH / 4)
				);
			}
		}
		// final figure list
		rGeome.fig = {
			faceSide: figSide,
			faceFace: figFace,
			faceTop: figTop,
			faceButtress: figButtress,
			faceTopWithRods: figTopWithRod
		};
		const designName = rGeome.partName;
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
				},
				...facePx.map((pz, idx) => {
					const rElem: tExtrude = {
						outName: `subpax_${designName}_buttress_${idx}`,
						face: `${designName}_faceButtress`,
						extrudeMethod: EExtrude.eLinearOrtho,
						length: param.H1,
						rotate: [0, 0, 0],
						translate: [0, 0, pz]
					};
					return rElem;
				})
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: [
						`subpax_${designName}_side`,
						`subpax_${designName}_face`,
						...facePx.map((pz, idx) => {
							const subElem = `subpax_${designName}_buttress_${idx}`;
							return subElem;
						})
					]
				}
			]
		};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'heliostat-swing drawn successfully!\n';
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
