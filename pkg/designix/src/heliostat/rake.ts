// rake.ts

// step-1 : import from geometrix
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
	ctrRectangle,
	ctrRectRot,
	figure,
	//degToRad,
	radToDeg,
	ffix,
	pNumber,
	//pCheckbox,
	//pDropdown,
	pSectionSeparator,
	initGeom,
	//transform3d,
	EExtrude,
	EBVolume
} from 'geometrix';

// step-2 : definition of the parameters and more (part-name, svg associated to each parameter, simulation parameters)
const pDef: tParamDef = {
	partName: 'rake',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 600, 10, 4000, 10),
		pNumber('D2', 'mm', 400, 10, 4000, 10),
		pNumber('D3', 'mm', 400, 10, 4000, 10),
		pNumber('H1', 'mm', 800, 1, 4000, 10),
		pNumber('H2', 'mm', 3000, 20, 6000, 10),
		pNumber('H3', 'mm', 400, 0, 4000, 10),
		pNumber('E1', 'mm', 20, 1, 80, 1),
		pNumber('E3', 'mm', 30, 1, 80, 1),
		pSectionSeparator('transversal'),
		pNumber('H4', 'mm', 400, 10, 1000, 10),
		pNumber('D4', 'mm', 300, 10, 1000, 10),
		pNumber('E4', 'mm', 20, 1, 80, 1),
		pNumber('H5', 'mm', 1000, 10, 2000, 10),
		pNumber('D5', 'mm', 200, 1, 1000, 10),
		pNumber('L4', 'mm', 300, 1, 1000, 10),
		pNumber('L5', 'mm', 2000, 10, 4000, 10),
		pNumber('L6', 'mm', 2000, 1, 4000, 10),
		pNumber('D8', 'mm', 400, 1, 1000, 10),
		pSectionSeparator('diagonal'),
		pNumber('D6', 'mm', 100, 1, 600, 10),
		pNumber('E6', 'mm', 10, 1, 80, 1),
		pNumber('L7', 'mm', 100, 1, 1000, 1),
		pNumber('L8', 'mm', 200, 1, 1000, 1),
		pSectionSeparator('base'),
		pNumber('N1', '', 24, 3, 100, 1),
		pNumber('D7', 'mm', 40, 1, 100, 1),
		pNumber('L1', 'mm', 30, 1, 300, 1),
		pSectionSeparator('door'),
		pNumber('H6', 'mm', 100, 1, 1000, 10),
		pNumber('H7', 'mm', 600, 10, 2000, 10),
		pNumber('L9', 'mm', 300, 1, 1000, 10),
		pNumber('R9', 'mm', 50, 0, 300, 1),
		pNumber('doorOrientation', 'degree', 0, -180, 180, 1)
	],
	paramSvg: {
		D1: 'rake_face.svg',
		D2: 'rake_face.svg',
		D3: 'rake_face.svg',
		H1: 'rake_face.svg',
		H2: 'rake_face.svg',
		H3: 'rake_face.svg',
		E1: 'rake_face.svg',
		E3: 'rake_face.svg',
		H4: 'rake_side.svg',
		D4: 'rake_side.svg',
		E4: 'rake_side.svg',
		H5: 'rake_side.svg',
		D5: 'rake_side.svg',
		L4: 'rake_face.svg',
		L5: 'rake_face.svg',
		L6: 'rake_face.svg',
		D6: 'rake_face.svg',
		E6: 'rake_face.svg',
		L7: 'rake_face.svg',
		L8: 'rake_face.svg',
		N1: 'rake_top.svg',
		D7: 'rake_top.svg',
		L1: 'rake_top.svg',
		D8: 'rake_side.svg',
		H6: 'rake_door.svg',
		H7: 'rake_door.svg',
		L9: 'rake_door.svg',
		R9: 'rake_door.svg',
		doorOrientation: 'rake_door.svg',
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

// step-3 : definition of the function that creates from the parameter-values the figures and construct the 3D
function pGeom(t: number, param: tParamVal, suffix = ''): tGeom {
	const rGeome = initGeom(pDef.partName + suffix);
	const figCone = figure();
	const figBeam = figure();
	const figBeamHollow = figure();
	const figDisc = figure();
	const figHand = figure();
	const figWing = figure();
	const figWingHollow = figure();
	const figDoor = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const R1 = param.D1 / 2;
		const R2 = param.D2 / 2;
		const R3 = param.D3 / 2;
		const R4 = param.D4 / 2;
		const R5 = param.D5 / 2;
		const R6 = param.D6 / 2;
		const R7 = param.D7 / 2;
		const R8 = param.D8 / 2;
		const H1H2 = param.H1 + param.H2;
		const H1H5 = H1H2 - param.H4 + param.H5;
		const beamL = 4 * param.L4 + param.L5 + 2 * param.L6;
		const beamH = param.H1 + param.H2 - param.H4;
		const handLowX = R4 * Math.cos(Math.PI / 6);
		const handLowY = R4 * Math.sin(Math.PI / 6);
		const handHighXint = R5 * Math.cos(Math.PI / 6);
		const handHighYint = R5 * Math.sin(Math.PI / 6);
		const handHighXext = R8 * Math.cos(Math.PI / 6);
		const handHighYext = R8 * Math.sin(Math.PI / 6);
		const handPos = [-beamL / 2, -param.L5 / 2 - param.L4, param.L5 / 2, beamL / 2 - param.L4];
		const wingLy = param.H2 - param.L8 - param.H4 - R4;
		const coneAngle = Math.atan2(R1 - R2, param.H2);
		const wingLx = beamL / 2 - param.L7 - R1 + param.L8 * Math.tan(coneAngle);
		const wingL = Math.sqrt(wingLx ** 2 + wingLy ** 2);
		const wingAngle = Math.atan2(wingLx, wingLy);
		const wingLPre = param.E1 / Math.sin(wingAngle + coneAngle);
		const wingL2 = wingL + param.E4 / Math.cos(wingAngle) + wingLPre;
		const wingPosX = R1 - param.L8 * Math.tan(coneAngle) - wingLPre * Math.sin(wingAngle);
		const wingPosY = param.H1 + param.L8 - wingLPre * Math.cos(wingAngle);
		const wingCPosX = wingPosX - R6 * Math.cos(wingAngle);
		const wingCPosY = wingPosY + R6 * Math.sin(wingAngle);
		const wingHR = R6 - param.E6;
		const wingHPosX = wingPosX - param.E6 * Math.cos(wingAngle);
		const wingHPosY = wingPosY + param.E6 * Math.sin(wingAngle);
		const wingAngleC = Math.PI / 2 - wingAngle;
		const doorLowX = param.L9 / 2;
		const doorHighX = doorLowX - param.H7 * Math.tan(coneAngle);
		// step-5 : checks on the parameter values
		if (param.D2 > param.D1) {
			throw `err110: D2 ${param.D2} is larger than D1 ${param.D1}`;
		}
		if (param.D3 + param.E1 > param.D1) {
			throw `err113: D3 ${param.D3} is too large compare to D1 ${param.D1} and E1 ${param.E1}`;
		}
		if (param.H3 + param.E3 > param.H1) {
			throw `err116: H3 ${param.H3} is too large compare to H1 ${param.H1} and E3 ${param.E3}`;
		}
		if (param.H4 + R4 > param.H2) {
			throw `err119: H4 ${param.H4} is too large compare to H2 ${param.H2} and D4 ${param.D4}`;
		}
		if (param.E4 > R4) {
			throw `err122: E4 ${param.E4} is too large compare to D4 ${param.D4}`;
		}
		if (param.D8 <= param.D5) {
			throw `err146: D8 ${param.D8} is too small compare to D5 ${param.D5}`;
		}
		if (wingLy < 0) {
			throw `err140: H2 ${param.H2} too small compare to L8 ${param.L8}, H4 ${param.H4} and D4 ${param.D4}`;
		}
		if (doorHighX < param.R9) {
			throw `err177: R9 ${param.R9} too large compare to doorHighX ${doorHighX} and L9 ${param.L9}`;
		}
		if (param.L9 > param.D1) {
			throw `err180: L9 ${param.L9} too large compare to D1 ${param.D1}`;
		}
		// step-6 : any logs
		rGeome.logstr += `cone-height: ${ffix(H1H2)} mm\n`;
		rGeome.logstr += `cone-height total: ${ffix(H1H5)} mm\n`;
		rGeome.logstr += `cone-angle: ${ffix(radToDeg(coneAngle))} degree\n`;
		rGeome.logstr += `wing-angle: ${ffix(radToDeg(wingAngle))} degree\n`;
		// step-7 : drawing of the figures
		// figCone
		const coneSlopeX = param.E1 * Math.cos(coneAngle);
		const coneSlopeY = param.E1 * Math.sin(coneAngle);
		const coneFC = param.E1 * Math.tan(coneAngle / 2);
		const ctrCone = function (orient: number): tContour {
			const rCtr = contour(orient * R1, 0)
				.addSegStrokeA(orient * R1, param.H1)
				.addSegStrokeA(orient * R2, H1H2)
				.addSegStrokeA(orient * (R2 - coneSlopeX), H1H2 - coneSlopeY)
				.addSegStrokeA(orient * (R1 - param.E1), param.H1 - coneFC)
				.addSegStrokeA(orient * (R1 - param.E1), 0)
				.closeSegStroke();
			return rCtr;
		};
		const ctrConePlus = function (orient: number): tContour {
			const rCtr = contour(orient * R1, 0)
				.addSegStrokeA(orient * R1, param.H1)
				.addSegStrokeA(orient * R2, H1H2)
				.addSegStrokeA(orient * (R2 - coneSlopeX), H1H2 - coneSlopeY)
				.addSegStrokeA(orient * (R1 - param.E1), param.H1 - coneFC)
				.addSegStrokeA(orient * (R1 - param.E1), param.H1 - param.H3)
				.addSegStrokeA(orient * R3, param.H1 - param.H3)
				.addSegStrokeA(orient * R3, param.H1 - param.H3 - param.E3)
				.addSegStrokeA(orient * (R1 - param.E1), param.H1 - param.H3 - param.E3)
				.addSegStrokeA(orient * (R1 - param.E1), 0)
				.closeSegStroke();
			return rCtr;
		};
		const ctrDoor = contour(doorLowX, param.H1 + param.H6)
			.addCornerRounded(param.R9)
			.addSegStrokeA(doorHighX, param.H1 + param.H6 + param.H7)
			.addCornerRounded(param.R9)
			.addSegStrokeA(-doorHighX, param.H1 + param.H6 + param.H7)
			.addCornerRounded(param.R9)
			.addSegStrokeA(-doorLowX, param.H1 + param.H6)
			.addCornerRounded(param.R9)
			.closeSegStroke();
		figCone.addMain(ctrCone(1));
		figCone.addSecond(ctrConePlus(1));
		figCone.addSecond(ctrConePlus(-1));
		//figCone.addSecond(contourCircle(0, beamH, R4));
		//figCone.addSecond(contourCircle(0, beamH, R4 - param.E4));
		figCone.addSecond(ctrRectangle(-beamL / 2, beamH - R4, beamL, param.D4)); // beam-ext
		figCone.addSecond(
			ctrRectangle(-beamL / 2, beamH - R4 + param.E4, beamL, param.D4 - 2 * param.E4)
		); // beam-int
		for (const posX of handPos) {
			figCone.addSecond(
				ctrRectangle(posX, beamH + handLowY, param.L4, param.H5 - handLowY - handHighYint)
			);
		}
		figCone.addSecond(ctrRectRot(wingPosX, wingPosY, wingL2, 2 * R6, wingAngleC)); // wing-right
		figCone.addSecond(ctrRectRot(wingHPosX, wingHPosY, wingL2, 2 * wingHR, wingAngleC));
		figCone.addSecond(ctrRectRot(-wingPosX, wingPosY, 2 * R6, wingL2, wingAngle)); // wing-left
		figCone.addSecond(ctrRectRot(-wingHPosX, wingHPosY, 2 * wingHR, wingL2, wingAngle));
		figCone.addSecond(ctrDoor);
		// figBeam
		const ctrHand = contour(handLowX, beamH + handLowY)
			.addSegStrokeA(handHighXext, beamH + param.H5 - handHighYext)
			.addSegStrokeA(handHighXint, beamH + param.H5 - handHighYint)
			.addPointA(-handHighXint, beamH + param.H5 - handHighYint)
			.addSegArc(R5, false, false)
			.addSegStrokeA(-handHighXext, beamH + param.H5 - handHighYext)
			.addSegStrokeA(-handLowX, beamH + handLowY)
			.closeSegArc(R4, false, false);
		figBeam.addMain(contourCircle(0, beamH, R4));
		figBeam.addMain(contourCircle(0, beamH, R4 - param.E4));
		figBeam.addSecond(ctrConePlus(1));
		figBeam.addSecond(ctrConePlus(-1));
		figBeam.addSecond(ctrHand);
		figBeam.addSecond(contourCircle(0, beamH + param.H5, R5));
		figBeam.addSecond(ctrRectangle(-R6, param.H1 + param.L8, 2 * R6, wingLy)); // wing
		figBeam.addSecond(ctrRectangle(-wingHR, param.H1 + param.L8, 2 * wingHR, wingLy));
		figBeam.addSecond(ctrDoor);
		// figBeamHollow
		figBeamHollow.addMain(contourCircle(0, beamH, R4 - param.E4));
		figBeamHollow.addSecond(contourCircle(0, beamH, R4));
		figBeamHollow.addSecond(ctrHand);
		// figDisc
		figDisc.addMain(contourCircle(0, 0, R1));
		figDisc.addMain(contourCircle(0, 0, R3));
		const posR = R3 + param.L1;
		const posA = (2 * Math.PI) / param.N1;
		for (let i = 0; i < param.N1; i++) {
			const posX = posR * Math.cos(i * posA);
			const posY = posR * Math.sin(i * posA);
			figDisc.addMain(contourCircle(posX, posY, R7));
		}
		figDisc.addSecond(contourCircle(0, 0, R1 - param.E1));
		figDisc.addSecond(contourCircle(0, 0, R2));
		figDisc.addSecond(ctrRectangle(-R4, -beamL / 2, param.D4, beamL)); // beam-ext
		figDisc.addSecond(ctrRectangle(-R4 + param.E4, -beamL / 2, param.D4 - 2 * param.E4, beamL)); // beam-int
		for (const posX of handPos) {
			figDisc.addSecond(ctrRectangle(-handLowX, posX, 2 * handLowX, param.L4));
			figDisc.addSecond(ctrRectangle(-handHighXint, posX, 2 * handHighXint, param.L4));
			figDisc.addSecond(ctrRectangle(-handHighXext, posX, 2 * handHighXext, param.L4));
		}
		figDisc.addSecond(ctrRectangle(-R6, R1 - param.L8 * Math.tan(coneAngle), 2 * R6, wingLx)); // wing-right
		figDisc.addSecond(
			ctrRectangle(-wingHR, R1 - param.L8 * Math.tan(coneAngle), 2 * wingHR, wingLx)
		);
		figDisc.addSecond(
			ctrRectangle(-R6, -R1 + param.L8 * Math.tan(coneAngle) - wingLx, 2 * R6, wingLx)
		); // wing-left
		figDisc.addSecond(
			ctrRectangle(-wingHR, -R1 + param.L8 * Math.tan(coneAngle) - wingLx, 2 * wingHR, wingLx)
		);
		// figHand
		figHand.addMain(ctrHand);
		figHand.addSecond(contourCircle(0, beamH, R4));
		figHand.addSecond(contourCircle(0, beamH, R4 - param.E4));
		figHand.addSecond(contourCircle(0, beamH + param.H5, R5));
		// figWing
		figWing.addMain(contourCircle(0, 0, R6));
		figWing.addMain(contourCircle(0, 0, wingHR));
		// figWingHollow
		figWingHollow.addSecond(contourCircle(0, 0, R6));
		figWingHollow.addMain(contourCircle(0, 0, wingHR));
		// figDoor
		figDoor.addMain(ctrDoor);
		figDoor.addSecond(ctrConePlus(1));
		figDoor.addSecond(ctrConePlus(-1));
		figDoor.addSecond(ctrRectangle(-beamL / 2, beamH - R4, beamL, param.D4)); // beam-ext
		figDoor.addSecond(
			ctrRectangle(-beamL / 2, beamH - R4 + param.E4, beamL, param.D4 - 2 * param.E4)
		); // beam-int
		for (const posX of handPos) {
			figDoor.addSecond(
				ctrRectangle(posX, beamH + handLowY, param.L4, param.H5 - handLowY - handHighYint)
			);
		}
		figDoor.addSecond(ctrRectRot(wingPosX, wingPosY, wingL2, 2 * R6, wingAngleC)); // wing-right
		figDoor.addSecond(ctrRectRot(wingHPosX, wingHPosY, wingL2, 2 * wingHR, wingAngleC));
		figDoor.addSecond(ctrRectRot(-wingPosX, wingPosY, 2 * R6, wingL2, wingAngle)); // wing-left
		figDoor.addSecond(ctrRectRot(-wingHPosX, wingHPosY, 2 * wingHR, wingL2, wingAngle));
		// final figure list
		rGeome.fig = {
			faceCone: figCone,
			faceBeam: figBeam,
			faceBeamHollow: figBeamHollow,
			faceDisc: figDisc,
			faceHand: figHand,
			faceWing: figWing,
			faceWingHollow: figWingHollow,
			faceDoor: figDoor
		};
		// step-8 : recipes of the 3D construction
		const designName = rGeome.partName;
		const preExtrude = handPos.map((posX, idx) => {
			const rHand: tExtrude = {
				outName: `subpax_${designName}_hand_${idx}`,
				face: `${designName}_faceHand`,
				extrudeMethod: EExtrude.eLinearOrtho,
				length: param.L4,
				rotate: [Math.PI / 2, 0, 0],
				translate: [0, -posX, 0]
			};
			return rHand;
		});
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_cone`,
					face: `${designName}_faceCone`,
					extrudeMethod: EExtrude.eRotate,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_beam`,
					face: `${designName}_faceBeam`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: beamL,
					rotate: [Math.PI / 2, 0, 0],
					translate: [0, beamL / 2, 0]
				},
				{
					outName: `subpax_${designName}_beamHollow`,
					face: `${designName}_faceBeamHollow`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: beamL,
					rotate: [Math.PI / 2, 0, 0],
					translate: [0, beamL / 2, 0]
				},
				{
					outName: `subpax_${designName}_disc`,
					face: `${designName}_faceDisc`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.E3,
					rotate: [0, 0, 0],
					translate: [0, 0, param.H1 - param.H3 - param.E3]
				},
				{
					outName: `subpax_${designName}_wing_right`,
					face: `${designName}_faceWing`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: wingL2,
					rotate: [-wingAngle, 0, 0],
					translate: [0, wingCPosX, wingCPosY]
				},
				{
					outName: `subpax_${designName}_wing_left`,
					face: `${designName}_faceWing`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: wingL2,
					rotate: [wingAngle, 0, 0],
					translate: [0, -wingCPosX, wingCPosY]
				},
				{
					outName: `subpax_${designName}_wing_hollow_right`,
					face: `${designName}_faceWingHollow`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: wingL2,
					rotate: [-wingAngle, 0, 0],
					translate: [0, wingCPosX, wingCPosY]
				},
				{
					outName: `subpax_${designName}_wing_hollow_left`,
					face: `${designName}_faceWingHollow`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: wingL2,
					rotate: [wingAngle, 0, 0],
					translate: [0, -wingCPosX, wingCPosY]
				},
				{
					outName: `subpax_${designName}_door`,
					face: `${designName}_faceDoor`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.D1,
					rotate: [Math.PI / 2, 0, -Math.PI / 2 + degToRad(param.doorOrientation)],
					translate: [0, 0, 0]
				},
				...preExtrude
			],
			volumes: [
				{
					outName: `ipax_${designName}_plus`,
					boolMethod: EBVolume.eUnion,
					inList: [
						`subpax_${designName}_cone`,
						`subpax_${designName}_beam`,
						`subpax_${designName}_disc`,
						`subpax_${designName}_hand_0`,
						`subpax_${designName}_hand_1`,
						`subpax_${designName}_hand_2`,
						`subpax_${designName}_hand_3`,
						`subpax_${designName}_wing_right`,
						`subpax_${designName}_wing_left`
					]
				},
				{
					outName: `ipax_${designName}_hollow`,
					boolMethod: EBVolume.eUnion,
					inList: [
						`subpax_${designName}_beamHollow`,
						`subpax_${designName}_wing_hollow_right`,
						`subpax_${designName}_wing_hollow_left`,
						`subpax_${designName}_door`
					]
				},
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eSubstraction,
					inList: [`ipax_${designName}_plus`, `ipax_${designName}_hollow`]
				}
			]
		};
		// step-9 : optional sub-design parameter export
		// sub-design
		rGeome.sub = {};
		// step-10 : final log message
		// finalize
		rGeome.logstr += 'heliostat-rake drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const rakeDef: tPageDef = {
	pTitle: 'Heliostat rake',
	pDescription: 'The rake on top of the V-Axis of the heliostat',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { rakeDef };
