// sub_design.ts

import type { tDesignParamList } from './designParams';

type tPosiOrien = [number, number, number];

interface tSubInst {
	partName: string;
	dparam: tDesignParamList;
	orientation: tPosiOrien;
	position: tPosiOrien;
}

type tSubDesign = Record<string, tSubInst>;

export type { tPosiOrien, tSubInst, tSubDesign };
