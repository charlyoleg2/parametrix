// gear_wheel_wheel.ts

import type { tOuterInner, tParamDef, tParamVal, tGeom, tPageDef } from 'geometrix';
//import { contour, contourCircle, figure, degToRad } from 'geometrix';
import {
	contour,
	figure,
	degToRad,
	ffix,
	pNumber,
	pCheckbox,
	pDropdown,
	pSectionSeparator,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';
import * as gwHelper from './gearWheelProfile';
import * as welem from './wheelElements';

const pDef: tParamDef = {
	partName: 'gear_wheel_wheel',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('module', 'mm', 10, 0.1, 100, 0.1),
		pNumber('N1', 'scalar', 23, 3, 1000, 1),
		pNumber('N2', 'scalar', 19, 3, 1000, 1),
		pNumber('angleCenterCenter', 'degree', 0, -180, 180, 1),
		pNumber('addInterAxis', 'mm', 0, 0, 100, 0.05),
		pNumber('c1x', 'mm', 0, -200, 200, 1),
		pNumber('c1y', 'mm', 0, -200, 200, 1),
		pSectionSeparator('Tooth Profile'),
		pNumber('ah1', 'scalar', 1, 0.1, 2, 0.05),
		pNumber('dh1', 'scalar', 1, 0.1, 2, 0.05),
		pNumber('bh1', 'scalar', 0.25, 0.1, 2, 0.05),
		pNumber('bRound1', 'mm', 2, 0, 50, 0.1),
		pNumber('ah2', 'scalar', 1, 0.1, 2, 0.05),
		pNumber('dh2', 'scalar', 1, 0.1, 2, 0.05),
		pNumber('bh2', 'scalar', 0.25, 0.1, 2, 0.05),
		pNumber('bRound2', 'mm', 2, 0, 50, 0.1),
		pNumber('at1', '%', 50, 10, 90, 0.5),
		pNumber('at2', '%', 50, 10, 90, 0.5),
		pCheckbox('involSym', true),
		pDropdown('involROpt', ['Optimum', 'Base-1', 'Base-2', 'PressureAngle', 'FreeBase-12']),
		pDropdown('involLOpt', ['Optimum', 'Base-1', 'Base-2', 'PressureAngle', 'FreeBase-12']),
		pNumber('brr1', 'mm', 50, 10, 2000, 0.05),
		pNumber('brr2', 'mm', 50, 10, 2000, 0.05),
		pNumber('blr1', 'mm', 50, 10, 2000, 0.05),
		pNumber('blr2', 'mm', 50, 10, 2000, 0.05),
		pNumber('involArcPairs1', 'scalar', 2, 1, 40, 1),
		pNumber('involArcPairs2', 'scalar', 2, 1, 40, 1),
		pNumber('skinThickness1', 'mm', 0, -3, 3, 0.01),
		pNumber('skinThickness2', 'mm', 0, -3, 3, 0.01),
		pNumber('initAngle1', 'degree', 0, -180, 180, 1),
		pDropdown('gw2Position', ['right', 'left', 'center']),
		pSectionSeparator('Inner'),
		pCheckbox('centralAxis', true),
		pNumber('axisRadius', 'mm', 10, 0.1, 200, 0.1),
		pNumber('ribNb', 'scalar', 5, 0, 32, 1),
		pNumber('ribWidth', 'mm', 8, 1, 100, 0.1),
		pNumber('ribHeight', 'mm', 8, 1, 100, 0.1),
		pNumber('ribRound1', 'mm', 2, 0, 20, 0.1),
		pNumber('ribRound2', 'mm', 2, 0, 20, 0.1),
		pCheckbox('hollow', true),
		pNumber('materialHeightExt', 'mm', 20, 1, 200, 0.5),
		pNumber('materialHeightInt', 'mm', 15, 1, 200, 0.5),
		pNumber('spokeNb', 'scalar', 5, 1, 18, 1),
		pNumber('spokeWidth', 'mm', 15, 1, 200, 0.1),
		pNumber('spokeRound', 'mm', 10, 0, 20, 0.1),
		pSectionSeparator('Axis'),
		pCheckbox('centralAxis', true),
		pCheckbox('wheelAxis', true),
		pNumber('wheelHeight', 'mm', 40, 0.1, 400, 0.1),
		pNumber('wheelMidExtra', 'mm', 6, 0, 10, 0.1),
		pNumber('wheelAxisLength', 'mm', 40, 0, 400, 0.1),
		pNumber('wheelAxisRadius', 'mm', 20, 0, 200, 0.1),
		pNumber('wheelMidRadius', 'mm', 60, 0, 200, 0.1),
		pNumber('wheelRadiusExtra', 'mm', 1, 0, 20, 0.1),
		pNumber('wheelAxisExtRound', 'mm', 4, 0, 20, 0.1),
		pNumber('wheelAxisIntRound', 'mm', 0, 0, 20, 0.1),
		pNumber('wheelExtraRound', 'mm', 4, 0, 20, 0.1)
	],
	paramSvg: {
		module: 'gearwheel_params_main.svg',
		N1: 'gearwheel_params_main.svg',
		N2: 'gearwheel_params_main.svg',
		angleCenterCenter: 'gearwheel_params_interaxis.svg',
		addInterAxis: 'gearwheel_params_interaxis.svg',
		c1x: 'gearwheel_params_main.svg',
		c1y: 'gearwheel_params_main.svg',
		ah1: 'gearwheel_params_main.svg',
		dh1: 'gearwheel_params_main.svg',
		bh1: 'gearwheel_params_main.svg',
		bRound1: 'gearwheel_params_main.svg',
		ah2: 'gearwheel_params_main.svg',
		dh2: 'gearwheel_params_main.svg',
		bh2: 'gearwheel_params_main.svg',
		bRound2: 'gearwheel_params_main.svg',
		at1: 'gearwheel_params_main.svg',
		at2: 'gearwheel_params_main.svg',
		involSym: 'gearwheel_params_main.svg',
		involROpt: 'gearwheel_params_main.svg',
		involLOpt: 'gearwheel_params_main.svg',
		brr1: 'gearwheel_params_main.svg',
		brr2: 'gearwheel_params_main.svg',
		blr1: 'gearwheel_params_main.svg',
		blr2: 'gearwheel_params_main.svg',
		involArcPairs1: 'gearwheel_params_main.svg',
		skinThickness1: 'gearwheel_params_main.svg',
		involArcPairs2: 'gearwheel_params_main.svg',
		skinThickness2: 'gearwheel_params_main.svg',
		initAngle1: 'gearwheel_params_main.svg',
		gw2Position: 'gearwheel_params_main.svg',
		centralAxis: 'gearwheel_params_main.svg',
		axisRadius: 'gearwheel_params_main.svg',
		ribNb: 'gearwheel_params_main.svg',
		ribWidth: 'gearwheel_params_main.svg',
		ribHeight: 'gearwheel_params_main.svg',
		ribRound1: 'gearwheel_params_main.svg',
		ribRound2: 'gearwheel_params_main.svg',
		hollow: 'gearwheel_params_main.svg',
		materialHeightExt: 'gearwheel_params_main.svg',
		materialHeightInt: 'gearwheel_params_main.svg',
		spokeNb: 'gearwheel_params_main.svg',
		spokeWidth: 'gearwheel_params_main.svg',
		spokeRound: 'gearwheel_params_main.svg',
		wheelAxis: 'gearwheel_params_main.svg',
		wheelHeight: 'gearwheel_params_main.svg',
		wheelMidExtra: 'gearwheel_params_main.svg',
		wheelAxisLength: 'gearwheel_params_main.svg',
		wheelAxisRadius: 'gearwheel_params_main.svg',
		wheelMidRadius: 'gearwheel_params_main.svg',
		wheelRadiusExtra: 'gearwheel_params_main.svg',
		wheelAxisExtRound: 'gearwheel_params_main.svg',
		wheelAxisIntRound: 'gearwheel_params_main.svg',
		wheelExtraRound: 'gearwheel_params_main.svg'
	},
	sim: {
		tMax: 100,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal, suffix = ''): tGeom {
	const rGeome = initGeom(pDef.partName + suffix);
	const figOne = figure();
	const figTwo = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// Figure One
		const fOne: tOuterInner = [];
		// re-arrange parameters
		const gp1 = gwHelper.gwProfile();
		const gp2 = gwHelper.gwProfile();
		gp1.set1ModuleToothNumber(param.module, param.N1);
		gp2.set1ModuleToothNumber(param.module, param.N2);
		gp1.set2CenterPosition(param.c1x, param.c1y);
		const acc = degToRad(param.angleCenterCenter);
		const [c2x, c2y, d12] = gwHelper.gw2center(gp1, gp2, acc, param.addInterAxis);
		gp2.set2CenterPosition(c2x, c2y);
		gp1.set3CircleRadius(param.ah1, param.dh1, param.bh1, param.bRound1);
		gp2.set3CircleRadius(param.ah2, param.dh2, param.bh2, param.bRound2);
		// base circles
		const [brr1, blr1, brr2, blr2] = gwHelper.baseCircles(
			gp1,
			gp2,
			param.brr1,
			param.blr1,
			param.brr2,
			param.blr2,
			param.involSym,
			param.involROpt,
			param.involROpt
		);
		gp1.set4BaseCircles(brr1, blr1);
		gp2.set4BaseCircles(brr2, blr2);
		gp1.set5AddendumThickness(param.at1);
		gp2.set5AddendumThickness(param.at2);
		const initAngle1 = degToRad(param.initAngle1) + (t * 3 * gp1.as) / 100; // sim.tMax=100
		gp1.set6Angles(initAngle1, acc);
		const gearAL = gwHelper.actionLine(gp1, gp2, initAngle1, acc, d12, param.gw2Position);
		gearAL.prepare();
		for (const laCtr of gearAL.getContours()) {
			figOne.addDynamics(laCtr);
		}
		figOne.addPoints(gearAL.getContactPoint());
		gp2.set6Angles(gearAL.getInitAngle2(), acc + Math.PI);
		rGeome.logstr += gearAL.getMsg();
		gp1.set7InvoluteDetails(param.involArcPairs1, param.skinThickness1);
		gp2.set7InvoluteDetails(param.involArcPairs2, param.skinThickness2);
		// construction lines and circles
		for (const refCircle of gp1.getRefCircles()) {
			figOne.addDynamics(refCircle);
		}
		for (const refCircle of gp2.getRefCircles()) {
			figOne.addDynamics(refCircle);
		}
		figOne.addDynamics(gp1.getToothRef());
		figOne.addDynamics(gp2.getToothRef());
		// gearwheel-1
		const gp1p = gp1.getProfile();
		rGeome.logstr += gp1.getMsg();
		rGeome.logstr += gp1p.check();
		fOne.push(gp1p);
		if (param.centralAxis === 1) {
			const g1axis = welem.axisTorque(
				gp1.cx,
				gp1.cy,
				param.axisRadius,
				param.ribNb,
				param.ribWidth,
				param.ribHeight,
				param.ribRound1,
				param.ribRound2,
				initAngle1
			);
			rGeome.logstr += g1axis.check();
			fOne.push(g1axis);
		}
		if (param.hollow === 1) {
			const materialHeightExtMax = gp1.br;
			const materialHeightIntMin = param.axisRadius + param.ribHeight;
			const hollowMaterialExt = materialHeightExtMax - param.materialHeightExt;
			const hollowMaterialInt = materialHeightIntMin + param.materialHeightInt;
			if (hollowMaterialInt > hollowMaterialExt) {
				throw `err902: hollowMaterialInt ${ffix(
					hollowMaterialInt
				)} bigger than hollowMaterialExt ${ffix(hollowMaterialExt)}`;
			}
			const g1hollow = welem.hollowStraight(
				gp1.cx,
				gp1.cy,
				hollowMaterialExt,
				hollowMaterialInt,
				param.spokeNb,
				param.spokeWidth,
				param.spokeRound,
				initAngle1
			);
			for (const g1hollowE of g1hollow) {
				rGeome.logstr += g1hollowE.check();
				fOne.push(g1hollowE);
			}
		}
		figOne.addMainOI(fOne);
		const gp2p = gp2.getProfile();
		rGeome.logstr += gp2p.check();
		figOne.addSecond(gp2p);
		// Figure Two
		const fTwo: tOuterInner = [];
		const wheelRadius = gp1.ar + param.wheelRadiusExtra;
		if (param.wheelAxis === 1) {
			const ctrAxisProfile_right = welem.axisProfile(
				param.wheelHeight,
				param.wheelMidExtra,
				param.wheelAxisLength,
				param.wheelAxisRadius,
				param.wheelMidRadius,
				wheelRadius,
				param.wheelAxisExtRound,
				param.wheelAxisIntRound,
				param.wheelExtraRound,
				true
			);
			const ctrAxisProfile_left = welem.axisProfile(
				param.wheelHeight,
				param.wheelMidExtra,
				param.wheelAxisLength,
				param.wheelAxisRadius,
				param.wheelMidRadius,
				wheelRadius,
				param.wheelAxisExtRound,
				param.wheelAxisIntRound,
				param.wheelExtraRound,
				false
			);
			fTwo.push(ctrAxisProfile_right);
			figTwo.addSecond(ctrAxisProfile_left);
		} else {
			const ctrAxisProfile_right = contour(0, -param.wheelHeight / 2)
				.addSegStrokeR(0, param.wheelHeight)
				.addSegStrokeR(wheelRadius, 0)
				.addSegStrokeR(0, -param.wheelHeight)
				.closeSegStroke();
			const ctrAxisProfile_left = contour(0, -param.wheelHeight / 2)
				.addSegStrokeR(0, param.wheelHeight)
				.addSegStrokeR(-wheelRadius, 0)
				.addSegStrokeR(0, -param.wheelHeight)
				.closeSegStroke();
			fTwo.push(ctrAxisProfile_right);
			figTwo.addSecond(ctrAxisProfile_left);
		}
		figTwo.addMainOI(fTwo);
		rGeome.fig = { teethProfile: figOne, axisProfile: figTwo };
		const designName = rGeome.partName;
		const axisHLength =
			param.wheelHeight / 2 + param.wheelMidExtra + param.wheelAxisLength + 10;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_teethProfile`,
					face: `${designName}_teethProfile`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: 2 * axisHLength,
					rotate: [0, 0, 0],
					translate: [0, 0, -axisHLength]
				},
				{
					outName: `subpax_${designName}_axisProfile`,
					face: `${designName}_axisProfile`,
					extrudeMethod: EExtrude.eRotate,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eIntersection,
					inList: [
						`subpax_${designName}_teethProfile`,
						`subpax_${designName}_axisProfile`
					]
				}
			]
		};
		rGeome.logstr += 'gear_wheel_wheel drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const gearWheelWheelDef: tPageDef = {
	pTitle: 'Gearwheel-gearwheel',
	pDescription: 'Gear-system with two wheels',
	pDef: pDef,
	pGeom: pGeom
};

export { gearWheelWheelDef };
