// surface.ts

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
	//contourCircle,
	figure,
	//degToRad,
	//radToDeg,
	ffix,
	pNumber,
	pCheckbox,
	pDropdown,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

const pDef: tParamDef = {
	partName: 'surface',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('LH', 'mm', 1000, 100, 4000, 1),
		pNumber('LV', 'mm', 1600, 100, 4000, 1),
		pNumber('LZ', 'mm', 40, 0, 100, 1),
		pNumber('EH', 'mm', 10, 0, 1000, 1),
		pNumber('EV', 'mm', 10, 0, 1000, 1),
		pNumber('nx', '', 11, 1, 40, 1),
		pNumber('ny', '', 7, 1, 40, 1),
		pDropdown('main_direction', ['horizontal', 'vertical']),
		pCheckbox('crenel', true),
		pNumber('first_row', '', 5, 1, 40, 1),
		pNumber('second_row', '', 6, 1, 40, 1),
		pCheckbox('EH_gradient', false),
		pNumber('EH_sup', 'mm', 100, 0, 1000, 1),
		pNumber('EH_cycle', '', 1, 0, 3, 0.05),
		pNumber('EH_start', '', 1, 0, 3, 0.05),
		pDropdown('EH_shape', ['sinusoid', 'triangle', 'sawUp', 'sawDown']),
		pCheckbox('EV_gradient', false),
		pNumber('EV_sup', 'mm', 100, 0, 1000, 1),
		pNumber('EV_cycle', '', 1, 0, 3, 0.05),
		pNumber('EV_start', '', 1, 0, 3, 0.05),
		pDropdown('EV_shape', ['sinusoid', 'triangle', 'sawUp', 'sawDown']),
		pNumber('power_efficiency', '%', 16, 0, 100, 0.1),
		pNumber('solar_power', 'W/m2', 816, 100, 2000, 1) // 1361*0.6=816 W/m2
	],
	paramSvg: {
		LH: 'surface_main.svg',
		LV: 'surface_main.svg',
		LZ: 'surface_lz.svg',
		EH: 'surface_main.svg',
		EV: 'surface_main.svg',
		nx: 'surface_main.svg',
		ny: 'surface_main.svg',
		main_direction: 'surface_crenel.svg',
		crenel: 'surface_crenel.svg',
		first_row: 'surface_extremities.svg',
		second_row: 'surface_extremities.svg',
		EH_gradient: 'surface_space_evolution.svg',
		EH_sup: 'surface_space_evolution.svg',
		EH_cycle: 'surface_space_evolution.svg',
		EH_start: 'surface_space_evolution.svg',
		EH_shape: 'surface_space_shape.svg',
		EV_gradient: 'surface_space_evolution.svg',
		EV_sup: 'surface_space_evolution.svg',
		EV_cycle: 'surface_space_evolution.svg',
		EV_start: 'surface_space_evolution.svg',
		power_efficiency: 'surface_power.svg',
		solar_power: 'surface_power.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

// (px, py) coordinates of bottom-left of the panel in mm
type tCtr1 = (px: number, py: number) => tContour;

function pGeom(t: number, param: tParamVal): tGeom {
	let ctrPanelProfile: tCtr1;
	const rGeome = initGeom();
	const figSurface = figure();
	rGeome.logstr += `simTime: ${t}\n`;
	try {
		const ox = 0;
		const oy = 0;
		const panel_surface = (param.LH * param.LV) / 10 ** 6;
		const panel_power = param.solar_power * panel_surface * param.power_efficiency;
		rGeome.logstr += `panel surface: ${ffix(panel_surface)} m2\n`;
		rGeome.logstr += `panel power: ${ffix(panel_power)} W\n`;
		ctrPanelProfile = function (px: number, py: number): tContour {
			const rPanelProfile = contour(px, py)
				.addSegStrokeA(px + param.LH, py)
				.addSegStrokeA(px + param.LH, py + param.LV)
				.addSegStrokeA(px, py + param.LV)
				.closeSegStroke();
			return rPanelProfile;
		};
		// figSurface
		figSurface.addMain(ctrPanelProfile(ox, oy));
		// final figure list
		rGeome.fig = {
			faceSurface: figSurface
		};
		const designName = pDef.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_surface`,
					face: `${designName}_faceSurface`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.LZ,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eIdentity,
					inList: [`subpax_${designName}_surface`]
				}
			]
		};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'panel-surface draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const surfaceDef: tPageDef = {
	pTitle: 'Heliostat panel-surface',
	pDescription: 'The surface collecting the solar power made of solar-panels',
	pDef: pDef,
	pGeom: pGeom
};

export { surfaceDef };
