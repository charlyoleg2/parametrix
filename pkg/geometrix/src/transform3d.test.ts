// transform3d.test.ts

import { describe, it, expect } from 'vitest';
import type { tVec3 } from './transform3d';
import {
	t3dRotate,
	t3dTranslate,
	t3dCombine,
	t3dApply,
	t3dGetTranslation,
	t3dGetRotation
} from './transform3d';

describe('Transform-3D suit', () => {
	it('simple transform', () => {
		const v1 = [1, 0, 0] as tVec3; // x,y,z
		const m1 = t3dTranslate(2, 0, 0);
		const v2 = t3dApply(m1, v1);
		expect(v2[0]).toBe(3);
		expect(v2[1]).toBe(0);
		expect(v2[2]).toBe(0);
	});
	it('simple combination', () => {
		const m1 = t3dRotate(0, 0, 0);
		const m2 = t3dTranslate(0, 2, 0);
		const m3 = t3dCombine([m1, m2]);
		const vT = t3dGetTranslation(m3);
		expect(vT[0]).toBe(0);
		expect(vT[1]).toBe(2);
		expect(vT[2]).toBe(0);
		const vR = t3dGetRotation(m3);
		expect(vR[0]).toBe(0);
	});
});
