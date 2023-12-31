// volume.ts

import type { tGeom } from './aaParamGeom';

interface tInherit {
	outName: string;
	subdesign: string;
	subgeom: tGeom;
	rotate: [number, number, number];
	translate: [number, number, number];
}

enum EExtrude {
	eLinearOrtho,
	//eLinear,
	//eAlongPath,
	//eTwisted,
	eRotate
}

interface tExtrude {
	outName: string;
	face: string;
	extrudeMethod: EExtrude;
	length?: number;
	rotate: [number, number, number];
	translate: [number, number, number];
}

enum EBVolume {
	eIdentity,
	eIntersection,
	eUnion,
	eSubstraction
}

interface tBVolume {
	outName: string;
	boolMethod: EBVolume;
	inList: string[];
}

interface tVolume {
	inherits?: tInherit[];
	extrudes: tExtrude[];
	volumes: tBVolume[];
}

export type { tVolume, tInherit, tExtrude, tBVolume };
export { EExtrude, EBVolume };
