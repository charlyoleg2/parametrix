// write_pax.ts

import * as segLib from './segment';
import type { tFaces } from './figure';
import type { tVolume } from './volume';
import type { tSubDesign } from './sub_design';
import type { tGeom, tParamVal } from './aaParamGeom';
import type { tPaxContour } from './prepare_pax';
import { PSeg } from './prepare_pax';
import type { tContour } from './contour';

type tPaxFaces = Record<string, tPaxContour[]>;
interface tPaxJson {
	partName: string;
	params: tParamVal;
	faces: tPaxFaces;
	volume: tVolume;
	subs: tSubDesign;
	log: string;
}

class PaxWrite {
	//constructor() {}
	figureToPaxF(aCtr: tContour[]): tPaxContour[] {
		const rPaxF: tPaxContour[] = [];
		for (const ctr of aCtr) {
			rPaxF.push(ctr.toPax());
		}
		return rPaxF;
	}
	getFigures(figs: tFaces): tPaxFaces {
		const figFaces: tPaxFaces = {};
		for (const face in figs) {
			const figu = this.figureToPaxF(figs[face].mainList);
			figFaces[face] = figu;
		}
		return figFaces;
	}
	getPaxJson(paramVal: tParamVal, geome0: tGeom): tPaxJson {
		const rPaxJson = {
			partName: geom0.partName,
			params: paramVal,
			faces: this.getFigures(geome0.fig),
			volume: geome0.vol,
			subs: geome0.sub,
			log: geome0.logstr
		};
		return rPaxJson;
	}
	getPaxStr(paramVal: tParamVal, geome0: tGeom): string {
		const paxJson = this.getPaxJson(paramVal, geome0);
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

export type { tPaxFaces, tPaxJson };
export { paxWrite, convTypePaxToSeg1 };
