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
		const v1: tVec3 = [1, 0, 0]; // x,y,z
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
	});
	it('One Z-rotation', () => {
		const v1: tVec3 = [1, 0, 0]; // x,y,z
		const m1 = t3dRotate(0, 0, Math.PI / 2);
		const v2 = t3dApply(m1, v1);
		expect(v2[0]).toBeCloseTo(0);
		expect(v2[1]).toBeCloseTo(1);
		expect(v2[2]).toBeCloseTo(0);
	});
	it('One Y-rotation', () => {
		const v1: tVec3 = [1, 0, 0]; // x,y,z
		const m1 = t3dRotate(0, Math.PI / 2, 0);
		const v2 = t3dApply(m1, v1);
		expect(v2[0]).toBeCloseTo(0);
		expect(v2[1]).toBeCloseTo(0);
		expect(v2[2]).toBeCloseTo(-1);
	});
	it('One X-rotation', () => {
		const v1: tVec3 = [1, 0, 0]; // x,y,z
		const m1 = t3dRotate(Math.PI / 2, 0, 0);
		const v2 = t3dApply(m1, v1);
		expect(v2[0]).toBeCloseTo(1);
		expect(v2[1]).toBeCloseTo(0);
		expect(v2[2]).toBeCloseTo(0);
	});
	it('translation combination', () => {
		const m1 = t3dTranslate(-1, 1, 0);
		const m2 = t3dTranslate(0, 2, 0);
		const m3 = t3dCombine([m1, m2]);
		const vT = t3dGetTranslation(m3);
		expect(vT[0]).toBeCloseTo(-1);
		expect(vT[1]).toBeCloseTo(3);
		expect(vT[2]).toBeCloseTo(0);
	});
	it('rotation combination', () => {
		const m1 = t3dRotate(Math.PI / 4, 0, 0);
		const m2 = t3dRotate(0, Math.PI / 3, 0);
		const m3 = t3dRotate(0, 0, -Math.PI / 5);
		const mC = t3dCombine([m1, m2, m3]);
		const vR = t3dGetRotation(mC);
		expect(vR[0]).toBeCloseTo(Math.PI / 4);
		expect(vR[1]).toBeCloseTo(Math.PI / 3);
		expect(vR[2]).toBeCloseTo(-Math.PI / 5);
	});
	it('rotation combination special case', () => {
		const m1 = t3dRotate(0, 0, Math.PI / 2);
		const m2 = t3dRotate(Math.PI / 2, 0, 0);
		const mC = t3dCombine([m1, m2]);
		const vR = t3dGetRotation(mC);
		expect(vR[0]).toBeCloseTo(Math.PI / 2);
		expect(vR[1]).toBeCloseTo(-Math.PI / 2);
		expect(vR[2]).toBeCloseTo(0);
	});
});
