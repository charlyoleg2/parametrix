// surface.ts

import type {
	tContour,
	tParamDef,
	tParamVal,
	tGeom,
	tExtrude,
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
		pNumber('LH', 'mm', 1600, 100, 4000, 1),
		pNumber('LV', 'mm', 1000, 100, 4000, 1),
		pNumber('LZ', 'mm', 40, 0, 100, 1),
		pNumber('EH', 'mm', 10, 0, 1000, 1),
		pNumber('EV', 'mm', 10, 0, 1000, 1),
		pNumber('nx', '', 9, 1, 40, 1),
		pNumber('ny', '', 9, 1, 40, 1),
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
		EV_shape: 'surface_space_shape.svg',
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
type tPositions = [number, number][];

function pGeom(t: number, param: tParamVal): tGeom {
	let ctrPanelProfile: tCtr1;
	const rGeome = initGeom();
	const figSurface = figure();
	const figOnePanel = figure();
	rGeome.logstr += `simTime: ${t}\n`;
	try {
		const ox = -50;
		const oy = -50;
		const panel_surface = (param.LH * param.LV) / 10 ** 6;
		const panel_power = (param.solar_power * panel_surface * param.power_efficiency) / 100;
		rGeome.logstr += `panel surface: ${ffix(panel_surface)} m2\n`;
		rGeome.logstr += `panel power: ${ffix(panel_power)} W\n`;
		const max_panel_nb = param.nx * param.ny;
		rGeome.logstr += `max panel number: ${max_panel_nb}\n`;
		rGeome.logstr += `max panel surface: ${ffix(max_panel_nb * panel_surface)} m2\n`;
		rGeome.logstr += `max panel power: ${ffix(max_panel_nb * panel_power)} W\n`;
		const lenMain = param.main_direction === 1 ? param.ny : param.nx;
		const lenLateral = param.main_direction === 1 ? param.nx : param.ny;
		const lenRow: number[] = [];
		for (let i = 0; i < lenMain; i++) {
			const iEven = (i + 1) % 2; // 0 or 1
			const elemNb = param.crenel ? lenLateral - iEven : lenLateral;
			lenRow.push(elemNb);
		}
		lenRow[0] = param.first_row;
		lenRow[lenRow.length - 1] = param.first_row;
		if (lenMain > 2) {
			lenRow[1] = param.second_row;
			lenRow[lenRow.length - 2] = param.second_row;
		}
		let panelNb = 0;
		lenRow.forEach((oneRow) => {
			panelNb += oneRow;
		});
		rGeome.logstr += `actual panel number: ${panelNb}\n`;
		rGeome.logstr += `actual panel surface: ${ffix(panelNb * panel_surface)} m2\n`;
		rGeome.logstr += `actual panel power: ${ffix(panelNb * panel_power)} W\n`;
		ctrPanelProfile = function (px: number, py: number): tContour {
			const rPanelProfile = contour(px, py)
				.addSegStrokeA(px + param.LH, py)
				.addSegStrokeA(px + param.LH, py + param.LV)
				.addSegStrokeA(px, py + param.LV)
				.closeSegStroke();
			return rPanelProfile;
		};
		// figSurface
		const panelPositions: tPositions = [];
		lenRow.forEach((oneRow, rowIdx) => {
			for (let pIdx = 0; pIdx < oneRow; pIdx++) {
				let dx = 0;
				let dy = 0;
				const offset = (lenLateral - oneRow) / 2;
				if (param.main_direction === 0) {
					// horizontal
					dx = ox + rowIdx * (param.LH + param.EH);
					dy = oy + pIdx * (param.LV + param.EV) + offset * param.LV;
				} else {
					// vertical
					dx = ox + pIdx * (param.LH + param.EH) + offset * param.LH;
					dy = oy + rowIdx * (param.LV + param.EV);
				}
				panelPositions.push([dx, dy]);
			}
		});
		for (const pos of panelPositions) {
			figSurface.addMain(ctrPanelProfile(pos[0], pos[1]));
		}
		// figOnePanel
		figOnePanel.addMain(ctrPanelProfile(0, 0));
		// final figure list
		rGeome.fig = {
			faceSurface: figSurface,
			faceOnePanel: figOnePanel
		};
		const designName = pDef.partName;
		rGeome.vol = {
			extrudes: panelPositions.map((elem, idx) => {
				const rElem: tExtrude = {
					outName: `subpax_${designName}_panel_${idx}`,
					face: `${designName}_faceOnePanel`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.LZ,
					rotate: [0, 0, 0],
					translate: [elem[0], elem[1], 0]
				};
				return rElem;
			}),
			volumes: [
				{
					outName: `pax_${designName}`,
					//boolMethod: EBVolume.eIdentity,
					boolMethod: EBVolume.eUnion,
					inList: panelPositions.map((elem, idx) => {
						const subElem = `subpax_${designName}_panel_${idx}`;
						return subElem;
					})
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
