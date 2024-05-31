// write_pax.ts

import * as segLib from './segment';
import type { tOuterInner, tFigures } from './figure';
import type { tVolume } from './volume';
import type { tSubDesign } from './sub_design';
import type { tParamDef, tParamVal } from './designParams';
import type { tGeom } from './aaParamGeom';
import type { tPaxFace } from './prepare_pax';
import { PSeg } from './prepare_pax';
//import type { tContour } from './contour';

type tPaxFigures = Record<string, tPaxFace[]>;
interface tPaxJson {
	partName: string;
	pDef: tParamDef;
	params: tParamVal;
	figures: tPaxFigures;
	volume: tVolume;
	subs: tSubDesign;
	log: string;
}

class PaxWrite {
	//constructor() {}
	figureToPaxF(aFaces: tOuterInner[]): tPaxFace[] {
		const rPaxF: tPaxFace[] = [];
		for (const face of aFaces) {
			const oneFace: tPaxFace = [];
			for (const ctr of face) {
				oneFace.push(ctr.toPax());
			}
			rPaxF.push(oneFace);
		}
		return rPaxF;
	}
	getFigures(figs: tFigures): tPaxFigures {
		const figFaces: tPaxFigures = {};
		for (const face in figs) {
			const figu = this.figureToPaxF(figs[face].mainList);
			figFaces[face] = figu;
		}
		return figFaces;
	}
	getPaxJson(paramVal: tParamVal, geome0: tGeom, ipDef: tParamDef): tPaxJson {
		const rPaxJson = {
			partName: geome0.partName,
			pDef: ipDef,
			params: paramVal,
			figures: this.getFigures(geome0.fig),
			volume: geome0.vol,
			subs: geome0.sub,
			log: geome0.logstr
		};
		return rPaxJson;
	}
	getPaxStr(paramVal: tParamVal, geome0: tGeom, ipDef: tParamDef): string {
		const paxJson = this.getPaxJson(paramVal, geome0, ipDef);
		const rStr = JSON.stringify(paxJson, null, 2);
		return rStr;
	}
}
function paxWrite(): PaxWrite {
	const rPaxWrite = new PaxWrite();
	return rPaxWrite;
}

function convTypePaxToSeg1(paxType: PSeg): segLib.SegEnum {
	let rType: segLib.SegEnum = segLib.SegEnum.eStart;
	if (paxType === PSeg.eStroke) {
		rType = segLib.SegEnum.eStroke;
	} else if (paxType === PSeg.eArc) {
		rType = segLib.SegEnum.eArc;
	}
	return rType;
}

export type { tPaxFigures, tPaxJson };
export { paxWrite, convTypePaxToSeg1 };
