// surface.ts

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
	//contourCircle,
	figure,
	//degToRad,
	//radToDeg,
	ffix,
	pNumber,
	pCheckbox,
	pDropdown,
	pSectionSeparator,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

const pDef: tParamDef = {
	// partName is used in URL. Choose a name without slash, backslash and space.
	partName: 'surface',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('LH', 'mm', 1600, 10, 4000, 1),
		pNumber('LV', 'mm', 1000, 10, 4000, 1),
		pNumber('LZ', 'mm', 40, 0, 100, 1),
		pNumber('nx', '', 9, 1, 40, 1),
		pNumber('ny', '', 9, 1, 40, 1),
		pSectionSeparator('main fantasia'),
		pDropdown('main_direction', ['horizontal', 'vertical']),
		pCheckbox('crenel', false),
		pNumber('first_row', '', 9, 1, 40, 1),
		pNumber('second_row', '', 9, 1, 40, 1),
		pSectionSeparator('horizontal spacing'),
		pNumber('EH', 'mm', 10, 0, 1000, 1),
		pCheckbox('EH_gradient', false),
		pNumber('EH_sup', 'mm', 500, 0, 1000, 1),
		pNumber('EH_cycle', '', 1, 0, 3, 0.05),
		pNumber('EH_start', '', 0, 0, 1, 0.05),
		pDropdown('EH_shape', ['sinusoid', 'triangle', 'sawUp', 'sawDown']),
		pSectionSeparator('vertical spacing'),
		pNumber('EV', 'mm', 10, 0, 1000, 1),
		pCheckbox('EV_gradient', false),
		pNumber('EV_sup', 'mm', 500, 0, 1000, 1),
		pNumber('EV_cycle', '', 1, 0, 3, 0.05),
		pNumber('EV_start', '', 0, 0, 1, 0.05),
		pDropdown('EV_shape', ['sinusoid', 'triangle', 'sawUp', 'sawDown']),
		pSectionSeparator('solar power'),
		pNumber('power_efficiency', '%', 16, 0, 100, 0.1),
		pNumber('solar_power', 'W/m2', 816, 100, 2000, 1) // 1361*0.6=816 W/m2
	],
	paramSvg: {
		LH: 'surface_main.svg',
		LV: 'surface_main.svg',
		LZ: 'surface_lz.svg',
		nx: 'surface_main.svg',
		ny: 'surface_main.svg',
		main_direction: 'surface_crenel.svg',
		crenel: 'surface_crenel.svg',
		first_row: 'surface_extremities.svg',
		second_row: 'surface_extremities.svg',
		EH: 'surface_main.svg',
		EH_gradient: 'surface_space_evolution.svg',
		EH_sup: 'surface_space_evolution.svg',
		EH_cycle: 'surface_space_evolution.svg',
		EH_start: 'surface_space_evolution.svg',
		EH_shape: 'surface_space_shape.svg',
		EV: 'surface_main.svg',
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

function pGeom(t: number, param: tParamVal, suffix = ''): tGeom {
	const rGeome = initGeom(pDef.partName + suffix);
	let ctrPanelProfile: tCtr1;
	const figSurface = figure();
	const figOnePanel = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
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
		const EMain = param.main_direction === 1 ? param.EV : param.EH;
		const EMainGradient = param.main_direction === 1 ? param.EV_gradient : param.EH_gradient;
		const EMainSup = param.main_direction === 1 ? param.EV_sup : param.EH_sup;
		const EMainCycle = param.main_direction === 1 ? param.EV_cycle : param.EH_cycle;
		const EMainStart = param.main_direction === 1 ? param.EV_start : param.EH_start;
		const EMainShape = param.main_direction === 1 ? param.EV_shape : param.EH_shape;
		const ELateral = param.main_direction === 0 ? param.EV : param.EH;
		const ELateralGradient = param.main_direction === 0 ? param.EV_gradient : param.EH_gradient;
		const ELateralSup = param.main_direction === 0 ? param.EV_sup : param.EH_sup;
		const ELateralCycle = param.main_direction === 0 ? param.EV_cycle : param.EH_cycle;
		const ELateralStart = param.main_direction === 0 ? param.EV_start : param.EH_start;
		const ELateralShape = param.main_direction === 0 ? param.EV_shape : param.EH_shape;
		const lenLateralMax = Math.max(lenLateral, param.first_row, param.second_row);
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
		rGeome.logstr += `actual panel number: ${panelNb} (${ffix(
			(100 * panelNb) / max_panel_nb
		)} %)\n`;
		rGeome.logstr += `actual panel surface: ${ffix(panelNb * panel_surface)} m2\n`;
		rGeome.logstr += `actual panel power: ${ffix(panelNb * panel_power)} W\n`;
		const eMain: number[] = [];
		for (let i = 0; i < lenMain - 1; i++) {
			let eSpace = EMain;
			if (EMainGradient === 1) {
				const gapNb = lenMain > 2 ? lenMain - 2 : 1; // -2 to get a complete cycle
				const phase = (EMainStart + (i * EMainCycle) / gapNb) % 1;
				switch (EMainShape) {
					case 0: // sinusoid
						eSpace += (EMainSup * (1 - Math.cos(phase * 2 * Math.PI))) / 2;
						break;
					case 1: // triangle
						eSpace += EMainSup * (1 - 2 * Math.abs(phase - 0.5));
						break;
					case 2: // sawUp
						eSpace += EMainSup * phase;
						break;
					case 3: // sawDown
						eSpace += EMainSup * (1 - phase);
						break;
					default:
						eSpace += EMainSup;
				}
			}
			eMain.push(eSpace);
		}
		let eMainTotal = 0;
		const eMainCumul: number[] = [];
		eMainCumul.push(0);
		eMain.forEach((eSpace) => {
			eMainTotal += eSpace;
			eMainCumul.push(eMainTotal);
		});
		const eLateral: number[] = [];
		for (let i = 0; i < lenLateralMax - 1; i++) {
			let eSpace = ELateral;
			if (ELateralGradient === 1) {
				const gapNb = lenLateralMax > 2 ? lenLateralMax - 2 : 1; // -2 to get a complete cycle
				const phase = (ELateralStart + (i * ELateralCycle) / gapNb) % 1;
				switch (ELateralShape) {
					case 0: // sinusoid
						eSpace += (ELateralSup * (1 - Math.cos(phase * 2 * Math.PI))) / 2;
						break;
					case 1: // triangle
						eSpace += ELateralSup * (1 - 2 * Math.abs(phase - 0.5));
						break;
					case 2: // sawUp
						eSpace += ELateralSup * phase;
						break;
					case 3: // sawDown
						eSpace += ELateralSup * (1 - phase);
						break;
					default:
						eSpace += ELateralSup;
				}
			}
			eLateral.push(eSpace);
		}
		let eLateralTotal = 0;
		const eLateralCumul: number[] = [];
		eLateralCumul.push(0);
		eLateral.forEach((eSpace) => {
			eLateralTotal += eSpace;
			eLateralCumul.push(eLateralTotal);
		});
		let gLenHorizontal = 0; // mm
		let gLenVertical = 0; // mm
		if (param.main_direction === 0) {
			// horizontal
			gLenHorizontal = lenMain * param.LH + eMainTotal;
			gLenVertical = lenLateralMax * param.LV + eLateralTotal;
		} else {
			// vertical
			gLenHorizontal = lenLateralMax * param.LH + eLateralTotal;
			gLenVertical = lenMain * param.LV + eMainTotal;
		}
		const gArea = (gLenHorizontal * gLenVertical) / 10 ** 6; // m2
		rGeome.logstr += `global horizontal width: ${ffix(gLenHorizontal / 1000)} m\n`;
		rGeome.logstr += `global vertical height: ${ffix(gLenVertical / 1000)} m\n`;
		rGeome.logstr += `global area: ${ffix(gArea)} m2\n`;
		rGeome.logstr += `area efficiency: ${ffix((100 * panelNb * panel_surface) / gArea)} %\n`;
		const ox = -gLenHorizontal / 2;
		const oy = -gLenVertical / 2;
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
			const half = (lenLateralMax - oneRow) % 2;
			const offset = Math.floor((lenLateralMax - oneRow) / 2);
			for (let pIdx = 0; pIdx < oneRow; pIdx++) {
				let dx = 0;
				let dy = 0;
				if (param.main_direction === 0) {
					// horizontal
					dx = ox + rowIdx * param.LH + eMainCumul[rowIdx];
					dy = oy + (offset + pIdx) * param.LV + eLateralCumul[offset + pIdx];
					if (half === 1) {
						dy +=
							(param.LV +
								eLateralCumul[offset + pIdx + 1] -
								eLateralCumul[offset + pIdx]) /
							2;
					}
				} else {
					// vertical
					dy = oy + rowIdx * param.LV + eMainCumul[rowIdx];
					dx = ox + (offset + pIdx) * param.LH + eLateralCumul[offset + pIdx];
					if (half === 1) {
						dx +=
							(param.LH +
								eLateralCumul[offset + pIdx + 1] -
								eLateralCumul[offset + pIdx]) /
							2;
					}
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
		const designName = rGeome.partName;
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
		rGeome.logstr += 'panel-surface drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const surfaceDef: tPageDef = {
	pTitle: 'Heliostat panel-surface',
	pDescription: 'The surface collecting the solar power',
	pDef: pDef,
	pGeom: pGeom
};

export { surfaceDef };
