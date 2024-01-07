// simplified_gear_wheel.ts

import type {
	tParamDef,
	tParamVal,
	tGeom,
	tPageDef,
	tSubInst
	//tSubDesign
} from 'geometrix';
//import { contour, contourCircle, figure, degToRad } from 'geometrix';
import {
	designParam,
	checkGeom,
	prefixLog,
	//contour,
	figure,
	//degToRad,
	//ffix,
	pNumber,
	pCheckbox,
	//pDropdown,
	initGeom,
	//EExtrude,
	EBVolume
} from 'geometrix';
//import * as gwHelper from './gearWheelProfile';
//import * as welem from './wheelElements';

// design import
import { gearWheelWheelDef } from './gear_wheel_wheel';

const pDef: tParamDef = {
	partName: 'simplified_gear_wheel',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('module', 'mm', 10, 0.1, 100, 0.1),
		pNumber('N1', 'scalar', 23, 3, 1000, 1),
		//pNumber('N2', 'scalar', 19, 3, 1000, 1),
		//pNumber('angleCenterCenter', 'degree', 0, -180, 180, 1),
		//pNumber('addInterAxis', 'mm', 0, 0, 100, 0.05),
		pNumber('c1x', 'mm', 0, -200, 200, 1),
		pNumber('c1y', 'mm', 0, -200, 200, 1),
		//pNumber('ah1', 'scalar', 1, 0.1, 2, 0.05),
		//pNumber('dh1', 'scalar', 1, 0.1, 2, 0.05),
		//pNumber('bh1', 'scalar', 0.25, 0.1, 2, 0.05),
		//pNumber('bRound1', 'mm', 2, 0, 50, 0.1),
		//pNumber('ah2', 'scalar', 1, 0.1, 2, 0.05),
		//pNumber('dh2', 'scalar', 1, 0.1, 2, 0.05),
		//pNumber('bh2', 'scalar', 0.25, 0.1, 2, 0.05),
		//pNumber('bRound2', 'mm', 2, 0, 50, 0.1),
		//pNumber('at1', '%', 50, 10, 90, 0.5),
		//pNumber('at2', '%', 50, 10, 90, 0.5),
		//pCheckbox('involSym', true),
		//pDropdown('involROpt', ['Optimum', 'Base-1', 'Base-2', 'PressureAngle', 'FreeBase-12']),
		//pDropdown('involLOpt', ['Optimum', 'Base-1', 'Base-2', 'PressureAngle', 'FreeBase-12']),
		//pNumber('brr1', 'mm', 50, 10, 2000, 0.05),
		//pNumber('brr2', 'mm', 50, 10, 2000, 0.05),
		//pNumber('blr1', 'mm', 50, 10, 2000, 0.05),
		//pNumber('blr2', 'mm', 50, 10, 2000, 0.05),
		//pNumber('involArcPairs1', 'scalar', 2, 1, 40, 1),
		//pNumber('involArcPairs2', 'scalar', 2, 1, 40, 1),
		//pNumber('skinThickness1', 'mm', 0, -3, 3, 0.01),
		//pNumber('skinThickness2', 'mm', 0, -3, 3, 0.01),
		//pNumber('initAngle1', 'degree', 0, -180, 180, 1),
		//pDropdown('gw2Position', ['right', 'left', 'center']),
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
		module: 'default_param_blank.svg',
		N1: 'default_param_blank.svg',
		//N2: 'default_param_blank.svg',
		//angleCenterCenter: 'default_param_blank.svg',
		//addInterAxis: 'default_param_blank.svg',
		c1x: 'default_param_blank.svg',
		c1y: 'default_param_blank.svg',
		//ah1: 'default_param_blank.svg',
		//dh1: 'default_param_blank.svg',
		//bh1: 'default_param_blank.svg',
		//bRound1: 'default_param_blank.svg',
		//ah2: 'default_param_blank.svg',
		//dh2: 'default_param_blank.svg',
		//bh2: 'default_param_blank.svg',
		//bRound2: 'default_param_blank.svg',
		//at1: 'default_param_blank.svg',
		//at2: 'default_param_blank.svg',
		//involSym: 'default_param_blank.svg',
		//involROpt: 'default_param_blank.svg',
		//involLOpt: 'default_param_blank.svg',
		//brr1: 'default_param_blank.svg',
		//brr2: 'default_param_blank.svg',
		//blr1: 'default_param_blank.svg',
		//blr2: 'default_param_blank.svg',
		//involArcPairs1: 'default_param_blank.svg',
		//skinThickness1: 'default_param_blank.svg',
		//involArcPairs2: 'default_param_blank.svg',
		//skinThickness2: 'default_param_blank.svg',
		//initAngle1: 'default_param_blank.svg',
		//gw2Position: 'default_param_blank.svg',
		centralAxis: 'default_param_blank.svg',
		axisRadius: 'default_param_blank.svg',
		ribNb: 'default_param_blank.svg',
		ribWidth: 'default_param_blank.svg',
		ribHeight: 'default_param_blank.svg',
		ribRound1: 'default_param_blank.svg',
		ribRound2: 'default_param_blank.svg',
		hollow: 'default_param_blank.svg',
		materialHeightExt: 'default_param_blank.svg',
		materialHeightInt: 'default_param_blank.svg',
		spokeNb: 'default_param_blank.svg',
		spokeWidth: 'default_param_blank.svg',
		spokeRound: 'default_param_blank.svg',
		wheelAxis: 'default_param_blank.svg',
		wheelHeight: 'default_param_blank.svg',
		wheelMidExtra: 'default_param_blank.svg',
		wheelAxisLength: 'default_param_blank.svg',
		wheelAxisRadius: 'default_param_blank.svg',
		wheelMidRadius: 'default_param_blank.svg',
		wheelRadiusExtra: 'default_param_blank.svg',
		wheelAxisExtRound: 'default_param_blank.svg',
		wheelAxisIntRound: 'default_param_blank.svg',
		wheelExtraRound: 'default_param_blank.svg'
	},
	sim: {
		tMax: 100,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal): tGeom {
	const rGeome = initGeom(pDef.partName);
	const figOne = figure();
	const figTwo = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// sub-design gear_wheel_wheel
		const gearWWParam = designParam(gearWheelWheelDef.pDef);
		gearWWParam.setVal('module', param.module);
		gearWWParam.setVal('N1', param.N1);
		gearWWParam.setVal('c1x', param.c1x);
		gearWWParam.setVal('c1y', param.c1y);
		gearWWParam.setVal('centralAxis', param.centralAxis);
		gearWWParam.setVal('axisRadius', param.axisRadius);
		gearWWParam.setVal('ribNb', param.ribNb);
		gearWWParam.setVal('ribWidth', param.ribWidth);
		gearWWParam.setVal('ribHeight', param.ribHeight);
		gearWWParam.setVal('ribRound1', param.ribRound1);
		gearWWParam.setVal('ribRound2', param.ribRound2);
		gearWWParam.setVal('hollow', param.hollow);
		gearWWParam.setVal('materialHeightExt', param.materialHeightExt);
		gearWWParam.setVal('materialHeightInt', param.materialHeightInt);
		gearWWParam.setVal('spokeNb', param.spokeNb);
		gearWWParam.setVal('spokeWidth', param.spokeWidth);
		gearWWParam.setVal('spokeRound', param.spokeRound);
		gearWWParam.setVal('wheelAxis', param.wheelAxis);
		gearWWParam.setVal('wheelHeight', param.wheelHeight);
		gearWWParam.setVal('wheelMidExtra', param.wheelMidExtra);
		gearWWParam.setVal('wheelAxisLength', param.wheelAxisLength);
		gearWWParam.setVal('wheelAxisRadius', param.wheelAxisRadius);
		gearWWParam.setVal('wheelMidRadius', param.wheelMidRadius);
		gearWWParam.setVal('wheelRadiusExtra', param.wheelRadiusExtra);
		gearWWParam.setVal('wheelAxisExtRound', param.wheelAxisExtRound);
		gearWWParam.setVal('wheelAxisIntRound', param.wheelAxisIntRound);
		gearWWParam.setVal('wheelExtraRound', param.wheelExtraRound);
		const gearWWGeom = gearWheelWheelDef.pGeom(t, gearWWParam.getParamVal());
		checkGeom(gearWWGeom);
		rGeome.logstr += prefixLog(gearWWGeom.logstr, gearWWParam.partName);
		// figures
		figOne.mergeFigure(gearWWGeom.fig.teethProfile);
		figTwo.mergeFigure(gearWWGeom.fig.axisProfile);
		// final figure list
		rGeome.fig = { teethProfile: figOne, axisProfile: figTwo };
		const designName = rGeome.partName;
		rGeome.vol = {
			inherits: [
				{
					outName: `inpax_${designName}_gearWW`,
					subdesign: 'pax_gear_wheel_wheel',
					subgeom: gearWWGeom,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			extrudes: [],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eIdentity,
					inList: [`inpax_${designName}_gearWW`]
				}
			]
		};
		// sub-design
		const subGearWW: tSubInst = {
			partName: gearWWParam.getPartName(),
			dparam: gearWWParam.getDesignParamList(),
			orientation: [0, 0, 0],
			position: [0, 0, 0]
		};
		//console.log(subGearWW);
		rGeome.sub = { gear_wheel_wheel_1: subGearWW };
		// finalize
		rGeome.logstr += 'simplified_gear_wheel draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const simplifiedGearWheelDef: tPageDef = {
	pTitle: 'Simplified gearwheel',
	pDescription: 'One simplified gearwheel without details on teeth-profile',
	pDef: pDef,
	pGeom: pGeom
};

export { simplifiedGearWheelDef };
