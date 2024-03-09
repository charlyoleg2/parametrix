// spider.ts

import type {
	tContour,
	tParamDef,
	tParamVal,
	tGeom,
	tExtrude,
	tPageDef
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
	pSectionSeparator,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

const pDef: tParamDef = {
	partName: 'spider',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 100, 1, 400, 1),
		pNumber('L1', 'mm', 400, 1, 1000, 1),
		pNumber('L2', 'mm', 400, 1, 1000, 1),
		pNumber('L3', 'mm', 100, 1, 400, 1),
		pNumber('L4', 'mm', 3000, 10, 8000, 10),
		pSectionSeparator('longitude'),
		pNumber('L5', 'mm', 2000, 1, 8000, 1),
		pNumber('N1', '', 6, 1, 20, 1),
		pNumber('L6', 'mm', 30, 1, 100, 1),
		pSectionSeparator('thickness'),
		pNumber('E1', 'mm', 3, 1, 80, 1),
		pNumber('E2', 'mm', 50, 1, 200, 1),
		pNumber('E3', 'mm', 3, 1, 80, 1),
		pNumber('R2', 'mm', 100, 0, 400, 10)
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
		tMax: 360,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

type tCtr1 = (sx: number, sy: number, sl: number) => tContour;
type tCtr2 = (width: number, height: number, xpos: number, ypos: number) => tContour;

function pGeom(t: number, param: tParamVal, suffix = ''): tGeom {
	const rGeome = initGeom(pDef.partName + suffix);
	let ctrSquare: tCtr1;
	let ctrRect: tCtr2;
	const figLegs = figure();
	const figTube = figure();
	const figBody = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
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
		if (param.L3 < param.E2) {
			throw `err994: L3 ${param.L3} smaller than E2 ${param.E2}`;
		}
		if (param.L3 < 2 * param.E3) {
			throw `err997: L3 ${param.L3} too small compare to E3 ${param.E3}`;
		}
		const squareD = ((param.L3 - param.E2) / 2) * Math.cos(Math.PI / 4);
		const squareX = legL2 + legL4x + squareD;
		const squareY = -param.L1 - legL4y + squareD;
		const squareY2 = squareY - param.E3 * Math.sqrt(2);
		if (param.L5 < param.N1 * param.L6) {
			throw `err110: L5 ${param.L5} too small compare to N1 ${param.N1} and L6 ${param.L6}`;
		}
		let legStep = 1;
		if (param.N1 > 1) {
			legStep = (param.L5 - param.L6) / (param.N1 - 1);
		}
		const legPos = [...Array(param.N1).keys()].map((i) => i * legStep);
		ctrSquare = function (sx: number, sy: number, sl: number): tContour {
			const rCtr = contour(sx, sy)
				.addSegStrokeA(sx + sl * Math.cos(Math.PI / 4), sy - sl * Math.sin(Math.PI / 4))
				.addSegStrokeA(sx, sy - 2 * sl * Math.sin(Math.PI / 4))
				.addSegStrokeA(sx - sl * Math.cos(Math.PI / 4), sy - sl * Math.sin(Math.PI / 4))
				.closeSegStroke();
			return rCtr;
		};
		ctrRect = function (width: number, height: number, xpos: number, ypos: number): tContour {
			const rCtr = contour(xpos, ypos)
				.addSegStrokeA(xpos + width, ypos)
				.addSegStrokeA(xpos + width, ypos + height)
				.addSegStrokeA(xpos, ypos + height)
				.closeSegStroke();
			return rCtr;
		};
		const posAngle = (Math.sin((2 * Math.PI * t) / pDef.sim.tMax) * Math.PI) / 2;
		rGeome.logstr += `spide leg number: ${param.N1}\n`;
		rGeome.logstr += `spide position angle: ${ffix(radToDeg(posAngle))} degree\n`;
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
		figLegs.addMain(contourCircle(0, 0, R1 - param.E1));
		figLegs.addSecond(ctrSquare(squareX, squareY, param.L3));
		figLegs.addSecond(ctrSquare(squareX, squareY2, param.L3 - 2 * param.E3));
		figLegs.addSecond(ctrSquare(-squareX, squareY, param.L3));
		figLegs.addSecond(ctrSquare(-squareX, squareY2, param.L3 - 2 * param.E3));
		// figTube
		figTube.addMain(contourCircle(0, 0, R1));
		figTube.addMain(contourCircle(0, 0, R1 - param.E1));
		figTube.addMain(ctrSquare(squareX, squareY, param.L3));
		figTube.addMain(ctrSquare(squareX, squareY2, param.L3 - 2 * param.E3));
		figTube.addMain(ctrSquare(-squareX, squareY, param.L3));
		figTube.addMain(ctrSquare(-squareX, squareY2, param.L3 - 2 * param.E3));
		figTube.addSecond(ctrLeg);
		// figBody
		figBody.addSecond(ctrRect(param.L5, param.D1, 0, -param.D1 / 2));
		figBody.addSecond(ctrRect(param.L5, param.L3, 0, -param.L4 - param.L3));
		for (const posx of legPos) {
			figBody.addSecond(ctrRect(param.L6, param.L4, posx, -param.L4));
		}
		// final figure list
		rGeome.fig = {
			faceLegs: figLegs.rotate(0, 0, posAngle),
			faceTube: figTube.rotate(0, 0, posAngle),
			faceBody: figBody
		};
		const designName = rGeome.partName;
		const preExtrude = legPos.map((posX, idx) => {
			const rElem: tExtrude = {
				outName: `subpax_${designName}_leg_${idx}`,
				face: `${designName}_faceLegs`,
				extrudeMethod: EExtrude.eLinearOrtho,
				length: param.L6,
				rotate: [0, 0, 0],
				translate: [0, 0, posX]
			};
			return rElem;
		});
		const legList = legPos.map((elem, idx) => {
			const subElem = `subpax_${designName}_leg_${idx}`;
			return subElem;
		});
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_tube`,
					face: `${designName}_faceTube`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.L5,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				...preExtrude
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: [`subpax_${designName}_tube`, ...legList]
				}
			]
		};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'heliostat-spider drawn successfully!\n';
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
