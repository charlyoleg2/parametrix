// rake_stopper.ts

// step-1 : import from geometrix
import type {
	//tContour,
	tParamDef,
	tParamVal,
	tGeom,
	//tExtrude,
	//tSubInst,
	//tSubDesign,
	tPageDef
} from 'geometrix';
import {
	designParam,
	checkGeom,
	prefixLog,
	//contour,
	contourCircle,
	//ctrRectangle,
	ctrRectRot2,
	//ctrTrapezoid,
	//ctrTrapezoidRot2,
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

// design import
import { rakeDef } from './rake';

// step-2 : definition of the parameters and more (part-name, svg associated to each parameter, simulation parameters)
const pDef: tParamDef = {
	partName: 'rake_stopper',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 600, 10, 4000, 1),
		pNumber('D2', 'mm', 400, 10, 4000, 1),
		pNumber('D3', 'mm', 400, 1, 4000, 1),
		pNumber('H1', 'mm', 800, 1, 4000, 1),
		pNumber('H2', 'mm', 3000, 20, 6000, 1),
		pNumber('H3', 'mm', 400, 0, 4000, 1),
		pNumber('E1', 'mm', 20, 1, 80, 1),
		pNumber('E3', 'mm', 30, 1, 80, 1),
		pSectionSeparator('transversal'),
		pNumber('H4', 'mm', 200, 1, 1000, 1),
		pNumber('D4', 'mm', 300, 1, 1000, 1),
		pNumber('E4', 'mm', 20, 1, 80, 1),
		pNumber('H5', 'mm', 400, 1, 2000, 1),
		pNumber('D5', 'mm', 200, 1, 1000, 1),
		pNumber('L4', 'mm', 300, 1, 1000, 1),
		pNumber('L5', 'mm', 2000, 1, 4000, 1),
		pNumber('L6', 'mm', 2000, 1, 4000, 1),
		pNumber('D8', 'mm', 400, 1, 1000, 1),
		pSectionSeparator('diagonal'),
		pNumber('D6', 'mm', 100, 1, 600, 1),
		pNumber('E6', 'mm', 10, 1, 80, 1),
		pNumber('L7', 'mm', 100, 1, 1000, 1),
		pNumber('L8', 'mm', 200, 1, 1000, 1),
		pSectionSeparator('base'),
		pNumber('N1', '', 24, 3, 100, 1),
		pNumber('D7', 'mm', 40, 1, 100, 1),
		pNumber('L1', 'mm', 30, 1, 300, 1),
		pSectionSeparator('door'),
		pNumber('H6', 'mm', 100, 1, 1000, 1),
		pNumber('H7', 'mm', 600, 1, 2000, 1),
		pNumber('L9', 'mm', 300, 1, 1000, 1),
		pNumber('R9', 'mm', 50, 0, 300, 1),
		pNumber('doorOrientation', 'degree', 0, -180, 180, 1),
		pSectionSeparator('stoppers'),
		pNumber('S1', 'mm', 100, 1, 300, 1),
		pNumber('S2', 'mm', 2000, 1, 8000, 1),
		pNumber('S3', 'mm', 100, 0, 8000, 1),
		pNumber('E7', 'mm', 5, 1, 80, 1),
		pSectionSeparator('low stopper'),
		pNumber('JD1', 'mm', 200, 1, 500, 1),
		pNumber('JE1', 'mm', 5, 1, 80, 1),
		pNumber('JL1', 'mm', 260, 1, 2000, 1),
		pNumber('JH1', 'mm', 20, -500, 500, 1),
		pNumber('JS1', 'mm', 100, 1, 500, 1),
		pNumber('JS2', 'mm', 200, 1, 500, 1),
		pSectionSeparator('high stopper'),
		pNumber('JD3', 'mm', 200, 1, 500, 1),
		pNumber('JE3', 'mm', 5, 1, 80, 1),
		pNumber('JS3', 'mm', 120, 1, 500, 1),
		pNumber('JD4', 'mm', 200, 1, 500, 1),
		pNumber('JE4', 'mm', 5, 1, 80, 1),
		pNumber('JS4', 'mm', 120, 1, 500, 1)
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
		S1: 'rake_side_stopper.svg',
		S2: 'rake_top_stopper.svg',
		S3: 'rake_side_stopper.svg',
		E7: 'rake_side_stopper.svg',
		JD1: 'rake_low_stopper_holder.svg',
		JE1: 'rake_low_stopper_holder.svg',
		JL1: 'rake_low_stopper_holder.svg',
		JH1: 'rake_low_stopper_holder.svg',
		JS1: 'rake_side_stopper.svg',
		JS2: 'rake_top_stopper.svg',
		JD3: 'rake_side_stopper.svg',
		JE3: 'rake_side_stopper.svg',
		JS3: 'rake_top_stopper.svg',
		JD4: 'rake_top_stopper.svg',
		JE4: 'rake_top_stopper.svg',
		JS4: 'rake_side_stopper.svg'
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
	const figStopperTop = figure();
	const figStopperSide = figure();
	const figStopperSideH = figure();
	const figStopperFaceT = figure();
	const figStopperFaceTH = figure();
	const figStopperFaceB = figure();
	const figStopperFaceBH = figure();
	const figLowStopperHolderPre = figure();
	const figLowStopperHolder = figure();
	const figHi1StopperHolder = figure();
	const figHi2StopperHolder = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const horiR = 0;
		const horiL = Math.PI;
		const vertiT = Math.PI / 2;
		const vertiB = -Math.PI / 2;
		const R1 = param.D1 / 2;
		const H1H2 = param.H1 + param.H2;
		const H1H5 = H1H2 - param.H4 + param.H5;
		const stopper1H = H1H5 - param.S2;
		const Hi2SHpz = param.H1 + param.H2 - param.H4;
		const stopper2H = Hi2SHpz + param.D4 / 2;
		const stopper3H = param.H1 + param.S3;
		const L5h = param.L5 / 2;
		const S1r = param.S1 / 2;
		const S1h = param.S1 - 2 * param.E7;
		const S1hr = S1h / 2;
		const S2s = param.S2 - S1r;
		const lowSHPosZ = stopper1H - param.JH1;
		const JR1 = param.JD1 / 2;
		const JR1H = JR1 - param.JE1;
		const lowSHL = R1 + param.JS2;
		const Hi2SHpy = L5h - S1r;
		const Hi1SHL = R1 + param.JS3;
		const Hi1SHW = param.JD3 - 2 * param.JE3;
		const Hi2SHL = param.D4 / 2 + param.JS4;
		const Hi2SHW = param.JD4 - 2 * param.JE4;
		// step-5 : checks on the parameter values
		if (2 * param.E7 >= param.S1) {
			throw `err135: E7 ${param.E7} too large compare to S1 ${param.S1}`;
		}
		if (param.L5 < param.D2) {
			throw `err138: L5 ${param.L5} too small compare to D2 ${param.D2}`;
		}
		if (stopper1H - param.JH1 - param.JD1 / 2 < 0) {
			throw `err143: S2 ${param.S2} too large compare to H1H5 ${ffix(H1H5)}`;
		}
		if (param.JS1 < param.S1 / 2) {
			throw `err144: JS1 ${param.JS1} too small compare to S1 ${param.S1}`;
		}
		if (param.JE1 > param.JD1 / 2) {
			throw `err145: JE1 ${param.JE1} too large compare to JD1 ${param.JD1}`;
		}
		if (param.JL1 > param.D1) {
			throw `err146: JL1 ${param.JL1} too large compare to D1 ${param.D1}`;
		}
		if (param.JL1 < param.JD1) {
			throw `err147: JL1 ${param.JL1} too small compare to JD1 ${param.JD1}`;
		}
		if (Math.abs(param.JH1) > param.JD1 / 2 + S1r) {
			throw `err148: JH1 ${param.JH1} too large compare to JD1 ${param.JD1} and S1 ${param.S1}`;
		}
		if (param.JS2 < param.JS1 - S1r) {
			throw `err149: JS2 ${param.JS2} too small compare to JS1 ${param.JS1} and S1 ${param.S1}`;
		}
		if (param.S3 > param.H2 - param.H4) {
			throw `err150: S3 ${param.S3} too large compare to H2 ${param.H2} and H4 ${param.H4}`;
		}
		if (param.JE3 > param.JD3 / 2) {
			throw `err151: JE3 ${param.JE3} too large compare to JD3 ${param.JD3}`;
		}
		if (param.JE4 > param.JD4 / 2) {
			throw `err152: JE4 ${param.JE4} too large compare to JD4 ${param.JD4}`;
		}
		// step-6 : any logs
		rGeome.logstr += `cone-height: ${ffix(H1H2)} mm\n`;
		rGeome.logstr += `cone-height total: ${ffix(H1H5)} mm\n`;
		// step-7 : drawing of the figures
		//figLowStopperHolderPre
		figLowStopperHolderPre.addSecond(ctrRectRot2(-L5h, stopper1H, param.L5, param.S1, horiR));
		figLowStopperHolderPre.addSecond(ctrRectRot2(-L5h, stopper1H, param.L5, S1h, horiR));
		figLowStopperHolderPre.addMain(contourCircle(-param.JL1 / 2, lowSHPosZ, JR1));
		figLowStopperHolderPre.addMain(contourCircle(-param.JL1 / 2, lowSHPosZ, JR1H));
		figLowStopperHolderPre.addMain(contourCircle(param.JL1 / 2, lowSHPosZ, JR1));
		figLowStopperHolderPre.addMain(contourCircle(param.JL1 / 2, lowSHPosZ, JR1H));
		// sub-design rake
		const rakeParam = designParam(rakeDef.pDef);
		rakeParam.setVal('D1', param.D1);
		rakeParam.setVal('D2', param.D2);
		rakeParam.setVal('D3', param.D3);
		rakeParam.setVal('H1', param.H1);
		rakeParam.setVal('H2', param.H2);
		rakeParam.setVal('H3', param.H3);
		rakeParam.setVal('E1', param.E1);
		rakeParam.setVal('E3', param.E3);
		rakeParam.setVal('H4', param.H4);
		rakeParam.setVal('D4', param.D4);
		rakeParam.setVal('E4', param.E4);
		rakeParam.setVal('H5', param.H5);
		rakeParam.setVal('D5', param.D5);
		rakeParam.setVal('L4', param.L4);
		rakeParam.setVal('L5', param.L5);
		rakeParam.setVal('L6', param.L6);
		rakeParam.setVal('D6', param.D6);
		rakeParam.setVal('E6', param.E6);
		rakeParam.setVal('L7', param.L7);
		rakeParam.setVal('L8', param.L8);
		rakeParam.setVal('N1', param.N1);
		rakeParam.setVal('D7', param.D7);
		rakeParam.setVal('L1', param.L1);
		rakeParam.setVal('D8', param.D8);
		rakeParam.setVal('H6', param.H6);
		rakeParam.setVal('H7', param.H7);
		rakeParam.setVal('L9', param.L9);
		rakeParam.setVal('R9', param.R9);
		rakeParam.setVal('doorOrientation', param.doorOrientation);
		const rakeGeom = rakeDef.pGeom(0, rakeParam.getParamVal(), rakeParam.getSuffix());
		checkGeom(rakeGeom);
		rGeome.logstr += prefixLog(rakeGeom.logstr, rakeParam.getPartNameSuffix());
		// figures
		figCone.mergeFigure(rakeGeom.fig.faceCone);
		figCone.mergeFigure(figLowStopperHolderPre, true);
		figBeam.mergeFigure(rakeGeom.fig.faceBeam);
		figBeamHollow.mergeFigure(rakeGeom.fig.faceBeamHollow);
		figDisc.mergeFigure(rakeGeom.fig.faceDisc);
		figHand.mergeFigure(rakeGeom.fig.faceHand);
		figWing.mergeFigure(rakeGeom.fig.faceWing);
		figWingHollow.mergeFigure(rakeGeom.fig.faceWingHollow);
		figDoor.mergeFigure(rakeGeom.fig.faceDoor);
		figDoor.mergeFigure(figLowStopperHolderPre, true);
		// figStopperTop
		figStopperTop.mergeFigure(rakeGeom.fig.faceDisc, true);
		figStopperTop.addMain(ctrRectRot2(-R1 - param.JS1, -L5h, param.L5, param.S1, vertiT));
		figStopperTop.addMain(ctrRectRot2(-R1 - param.JS1, -L5h, param.L5, S1h, vertiT));
		figStopperTop.addMain(ctrRectRot2(S2s, -L5h, param.L5, param.S1, vertiT));
		figStopperTop.addMain(ctrRectRot2(S2s, -L5h, param.L5, S1h, vertiT));
		figStopperTop.addMain(ctrRectRot2(0, -L5h + S1r, S2s, param.S1, horiR));
		figStopperTop.addMain(ctrRectRot2(0, -L5h + S1r, S2s, S1h, horiR));
		figStopperTop.addMain(ctrRectRot2(0, L5h - S1r, S2s, param.S1, horiR));
		figStopperTop.addMain(ctrRectRot2(0, L5h - S1r, S2s, S1h, horiR));
		figStopperTop.addMain(ctrRectRot2(0, -R1 - S1r, S2s, param.S1, horiR));
		figStopperTop.addMain(ctrRectRot2(0, -R1 - S1r, S2s, S1h, horiR));
		figStopperTop.addMain(ctrRectRot2(0, R1 + S1r, S2s, param.S1, horiR));
		figStopperTop.addMain(ctrRectRot2(0, R1 + S1r, S2s, S1h, horiR));
		figStopperTop.addSecond(ctrRectRot2(0, -param.JL1 / 2, lowSHL, 2 * JR1, horiL));
		figStopperTop.addSecond(ctrRectRot2(0, -param.JL1 / 2, lowSHL, 2 * JR1H, horiL));
		figStopperTop.addSecond(ctrRectRot2(0, param.JL1 / 2, lowSHL, 2 * JR1, horiL));
		figStopperTop.addSecond(ctrRectRot2(0, param.JL1 / 2, lowSHL, 2 * JR1H, horiL));
		figStopperTop.addSecond(ctrRectRot2(0, 0, Hi1SHL, param.JD3, vertiB));
		figStopperTop.addSecond(ctrRectRot2(0, 0, Hi1SHL, Hi1SHW, vertiB));
		figStopperTop.addSecond(ctrRectRot2(0, 0, Hi1SHL, param.JD3, vertiT));
		figStopperTop.addSecond(ctrRectRot2(0, 0, Hi1SHL, Hi1SHW, vertiT));
		// figStopperSide
		figStopperSide.mergeFigure(rakeGeom.fig.faceBeam, true);
		figStopperSide.addMain(contourCircle(-R1 - param.JS1, stopper1H, S1r));
		figStopperSide.addMain(contourCircle(-R1 - param.JS1, stopper1H, S1hr));
		figStopperSide.addMain(contourCircle(S2s, stopper2H + S1r, S1r));
		figStopperSide.addMain(contourCircle(S2s, stopper2H + S1r, S1hr));
		figStopperSide.addSecond(ctrRectRot2(0, stopper2H + S1r, S2s, param.S1, horiR));
		figStopperSide.addSecond(ctrRectRot2(0, stopper2H + S1r, S2s, S1h, horiR));
		const stopper3Ly = stopper2H + S1r - stopper3H;
		const stp3L = Math.sqrt(S2s ** 2 + stopper3Ly ** 2);
		const stp3A = Math.atan2(stopper3Ly, S2s);
		rGeome.logstr += `stopper-rod: L ${ffix(stp3L)} mm, A ${ffix(radToDeg(stp3A))} degree\n`;
		figStopperSide.addSecond(ctrRectRot2(0, stopper3H, stp3L, param.S1, stp3A));
		figStopperSide.addSecond(ctrRectRot2(0, stopper3H, stp3L, S1h, stp3A));
		figStopperSide.addSecond(ctrRectRot2(0, lowSHPosZ, lowSHL, 2 * JR1, horiL));
		figStopperSide.addSecond(ctrRectRot2(0, lowSHPosZ, lowSHL, 2 * JR1H, horiL));
		figStopperSide.addSecond(contourCircle(0, stopper3H, param.JD3 / 2));
		figStopperSide.addSecond(contourCircle(0, stopper3H, param.JD3 / 2 - param.JE3));
		figStopperSide.addSecond(ctrRectRot2(0, Hi2SHpz, Hi2SHL, param.JD4, vertiT));
		figStopperSide.addSecond(ctrRectRot2(0, Hi2SHpz, Hi2SHL, Hi2SHW, vertiT));
		// figStopperSideH
		figStopperSideH.mergeFigure(figStopperSide, true);
		figStopperSideH.addMain(contourCircle(-R1 - param.JS1, stopper1H, S1hr));
		figStopperSideH.addMain(contourCircle(param.S2 - S1r, stopper2H + S1r, S1hr));
		// figStopperFaceT
		figStopperFaceT.mergeFigure(rakeGeom.fig.faceCone, true);
		figStopperFaceT.mergeFigure(figLowStopperHolderPre, true);
		figStopperFaceT.addMain(contourCircle(-param.L5 / 2 + S1r, stopper2H + S1r, S1r));
		figStopperFaceT.addMain(contourCircle(-param.L5 / 2 + S1r, stopper2H + S1r, S1hr));
		figStopperFaceT.addMain(contourCircle(param.L5 / 2 - S1r, stopper2H + S1r, S1r));
		figStopperFaceT.addMain(contourCircle(param.L5 / 2 - S1r, stopper2H + S1r, S1hr));
		// figStopperFaceTH
		figStopperFaceTH.mergeFigure(rakeGeom.fig.faceCone, true);
		figStopperFaceTH.mergeFigure(figLowStopperHolderPre, true);
		figStopperFaceTH.addSecond(contourCircle(-param.L5 / 2 + S1r, stopper2H + S1r, S1r));
		figStopperFaceTH.addMain(contourCircle(-param.L5 / 2 + S1r, stopper2H + S1r, S1hr));
		figStopperFaceTH.addSecond(contourCircle(param.L5 / 2 - S1r, stopper2H + S1r, S1r));
		figStopperFaceTH.addMain(contourCircle(param.L5 / 2 - S1r, stopper2H + S1r, S1hr));
		// figStopperFaceB
		figStopperFaceB.mergeFigure(rakeGeom.fig.faceCone, true);
		figStopperFaceB.mergeFigure(figLowStopperHolderPre, true);
		figStopperFaceB.addMain(contourCircle(-R1 - S1r, 0, S1r));
		figStopperFaceB.addMain(contourCircle(-R1 - S1r, 0, S1hr));
		figStopperFaceB.addMain(contourCircle(R1 + S1r, 0, S1r));
		figStopperFaceB.addMain(contourCircle(R1 + S1r, 0, S1hr));
		// figStopperFaceBH
		figStopperFaceBH.mergeFigure(rakeGeom.fig.faceCone, true);
		figStopperFaceBH.mergeFigure(figLowStopperHolderPre, true);
		figStopperFaceBH.addSecond(contourCircle(-R1 - S1r, 0, S1r));
		figStopperFaceBH.addMain(contourCircle(-R1 - S1r, 0, S1hr));
		figStopperFaceBH.addSecond(contourCircle(R1 + S1r, 0, S1r));
		figStopperFaceBH.addMain(contourCircle(R1 + S1r, 0, S1hr));
		// figLowStopperHolder
		figLowStopperHolder.mergeFigure(rakeGeom.fig.faceCone, true);
		figLowStopperHolder.mergeFigure(figLowStopperHolderPre);
		figLowStopperHolder.addSecond(ctrRectRot2(-Hi2SHpy, Hi2SHpz, Hi2SHL, param.JD4, vertiT));
		figLowStopperHolder.addSecond(ctrRectRot2(-Hi2SHpy, Hi2SHpz, Hi2SHL, Hi2SHW, vertiT));
		figLowStopperHolder.addSecond(ctrRectRot2(Hi2SHpy, Hi2SHpz, Hi2SHL, param.JD4, vertiT));
		figLowStopperHolder.addSecond(ctrRectRot2(Hi2SHpy, Hi2SHpz, Hi2SHL, Hi2SHW, vertiT));
		figLowStopperHolder.addSecond(ctrRectRot2(0, stopper3H, Hi1SHL, param.JD3, horiL));
		figLowStopperHolder.addSecond(ctrRectRot2(0, stopper3H, Hi1SHL, Hi1SHW, horiL));
		figLowStopperHolder.addSecond(ctrRectRot2(0, stopper3H, Hi1SHL, param.JD3, horiR));
		figLowStopperHolder.addSecond(ctrRectRot2(0, stopper3H, Hi1SHL, Hi1SHW, horiR));
		// figHi1StopperHolder
		figHi1StopperHolder.mergeFigure(figStopperSide, true);
		figHi1StopperHolder.addMain(contourCircle(0, stopper3H, param.JD3 / 2));
		figHi1StopperHolder.addMain(contourCircle(0, stopper3H, param.JD3 / 2 - param.JE3));
		// figHi2StopperHolder
		figHi2StopperHolder.mergeFigure(figStopperTop, true);
		figHi2StopperHolder.addMain(contourCircle(0, -Hi2SHpy, param.JD4 / 2));
		figHi2StopperHolder.addMain(contourCircle(0, -Hi2SHpy, param.JD4 / 2 - param.JE4));
		figHi2StopperHolder.addMain(contourCircle(0, Hi2SHpy, param.JD4 / 2));
		figHi2StopperHolder.addMain(contourCircle(0, Hi2SHpy, param.JD4 / 2 - param.JE4));
		// final figure list
		rGeome.fig = {
			faceCone: figCone,
			faceBeam: figBeam,
			faceBeamHollow: figBeamHollow,
			faceDisc: figDisc,
			faceHand: figHand,
			faceWing: figWing,
			faceWingHollow: figWingHollow,
			faceDoor: figDoor,
			faceStopperTop: figStopperTop,
			faceStopperSide: figStopperSide,
			faceStopperSideH: figStopperSideH,
			faceStopperFaceT: figStopperFaceT,
			faceStopperFaceTH: figStopperFaceTH,
			faceStopperFaceB: figStopperFaceB,
			faceStopperFaceBH: figStopperFaceBH,
			faceLowStopperHolder: figLowStopperHolder,
			faceHi1StopperHolder: figHi1StopperHolder,
			faceHi2StopperHolder: figHi2StopperHolder
		};
		// step-8 : recipes of the 3D construction
		const designName = rGeome.partName;
		rGeome.vol = {
			inherits: [
				{
					outName: `inpax_${designName}_rake`,
					subdesign: 'pax_rake',
					subgeom: rakeGeom,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `inpax_${designName}_coneHollow`,
					subdesign: 'subpax_rake_coneHollow',
					subgeom: rakeGeom,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `inpax_${designName}_beamHollow`,
					subdesign: 'subpax_rake_beamHollow',
					subgeom: rakeGeom,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			extrudes: [
				{
					outName: `subpax_${designName}_stpSide`,
					face: `${designName}_faceStopperSide`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.L5,
					rotate: [Math.PI / 2, 0, 0],
					translate: [0, param.L5 / 2, 0]
				},
				{
					outName: `subpax_${designName}_stpSideH`,
					face: `${designName}_faceStopperSideH`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.L5,
					rotate: [Math.PI / 2, 0, 0],
					translate: [0, param.L5 / 2, 0]
				},
				{
					outName: `subpax_${designName}_stpFaceT`,
					face: `${designName}_faceStopperFaceT`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: S2s,
					rotate: [Math.PI / 2, 0, Math.PI / 2],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_stpFaceTH`,
					face: `${designName}_faceStopperFaceTH`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: S2s,
					rotate: [Math.PI / 2, 0, Math.PI / 2],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_stpFaceB`,
					face: `${designName}_faceStopperFaceB`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: stp3L,
					rotate: [Math.PI / 2 - stp3A, 0, Math.PI / 2],
					translate: [0, 0, stopper3H]
				},
				{
					outName: `subpax_${designName}_stpFaceBH`,
					face: `${designName}_faceStopperFaceBH`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: stp3L,
					rotate: [Math.PI / 2 - stp3A, 0, Math.PI / 2],
					translate: [0, 0, stopper3H]
				},
				{
					outName: `subpax_${designName}_lowSH`,
					face: `${designName}_faceLowStopperHolder`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: lowSHL,
					rotate: [Math.PI / 2, 0, -Math.PI / 2],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_Hi1SH1`,
					face: `${designName}_faceHi1StopperHolder`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: Hi1SHL,
					rotate: [Math.PI / 2, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_Hi1SH2`,
					face: `${designName}_faceHi1StopperHolder`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: Hi1SHL,
					rotate: [Math.PI / 2, 0, Math.PI],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_Hi2SH`,
					face: `${designName}_faceHi2StopperHolder`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: Hi2SHL,
					rotate: [0, 0, 0],
					translate: [0, 0, Hi2SHpz]
				}
			],
			volumes: [
				{
					outName: `ipax_${designName}_plus`,
					boolMethod: EBVolume.eUnion,
					inList: [
						`subpax_${designName}_stpSide`,
						`subpax_${designName}_stpFaceT`,
						`subpax_${designName}_stpFaceB`,
						`subpax_${designName}_lowSH`,
						`subpax_${designName}_Hi1SH1`,
						`subpax_${designName}_Hi1SH2`,
						`subpax_${designName}_Hi2SH`
					]
				},
				{
					outName: `ipax_${designName}_hollow`,
					boolMethod: EBVolume.eUnion,
					inList: [
						`inpax_${designName}_coneHollow`,
						`inpax_${designName}_beamHollow`,
						`subpax_${designName}_stpSideH`,
						`subpax_${designName}_stpFaceTH`,
						`subpax_${designName}_stpFaceBH`
					]
				},
				{
					outName: `ipax_${designName}_stopper`,
					boolMethod: EBVolume.eSubstraction,
					inList: [`ipax_${designName}_plus`, `ipax_${designName}_hollow`]
				},
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: [`inpax_${designName}_rake`, `ipax_${designName}_stopper`]
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
const rakeStopperDef: tPageDef = {
	pTitle: 'Heliostat rake with stopper',
	pDescription: 'The rake-stopper on top of the V-Axis of the heliostat',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { rakeStopperDef };
