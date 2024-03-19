// transform3d.test.ts

import { describe, it, expect } from 'vitest';
import type { tVec3 } from './transform3d';
import { transform3d } from './transform3d';

describe('Transform-3D suit', () => {
	it('simple transform', () => {
		const v1: tVec3 = [1, 0, 0]; // x,y,z
		const tm = transform3d();
		tm.addTranslation(2, 0, 0);
		const v2 = tm.transform(v1);
		expect(v2[0]).toBe(3);
		expect(v2[1]).toBe(0);
		expect(v2[2]).toBe(0);
	});
	it('simple combination', () => {
		const tm = transform3d();
		tm.addRotation(0, 0, 0);
		tm.addTranslation(0, 2, 0);
		const vT = tm.getTranslation();
		expect(vT[0]).toBe(0);
		expect(vT[1]).toBe(2);
		expect(vT[2]).toBe(0);
	});
	it('One Z-rotation', () => {
		const v1: tVec3 = [1, 0, 0]; // x,y,z
		const tm = transform3d();
		tm.addRotation(0, 0, Math.PI / 2);
		const v2 = tm.transform(v1);
		expect(v2[0]).toBeCloseTo(0);
		expect(v2[1]).toBeCloseTo(1);
		expect(v2[2]).toBeCloseTo(0);
	});
	it('One Y-rotation', () => {
		const v1: tVec3 = [1, 0, 0]; // x,y,z
		const tm = transform3d();
		tm.addRotation(0, Math.PI / 2, 0);
		const v2 = tm.transform(v1);
		expect(v2[0]).toBeCloseTo(0);
		expect(v2[1]).toBeCloseTo(0);
		expect(v2[2]).toBeCloseTo(-1);
	});
	it('One X-rotation', () => {
		const v1: tVec3 = [1, 0, 0]; // x,y,z
		const tm = transform3d();
		tm.addRotation(Math.PI / 2, 0, 0);
		const v2 = tm.transform(v1);
		expect(v2[0]).toBeCloseTo(1);
		expect(v2[1]).toBeCloseTo(0);
		expect(v2[2]).toBeCloseTo(0);
	});
	it('translation combination', () => {
		const tm = transform3d();
		tm.addTranslation(-1, 1, 0);
		tm.addTranslation(0, 2, 0);
		const vT = tm.getTranslation();
		expect(vT[0]).toBeCloseTo(-1);
		expect(vT[1]).toBeCloseTo(3);
		expect(vT[2]).toBeCloseTo(0);
	});
	it('rotation combination', () => {
		const tm = transform3d();
		tm.addRotation(Math.PI / 4, 0, 0);
		tm.addRotation(0, Math.PI / 3, 0);
		tm.addRotation(0, 0, -Math.PI / 5);
		const vR = tm.getRotation();
		expect(vR[0]).toBeCloseTo(Math.PI / 4);
		expect(vR[1]).toBeCloseTo(Math.PI / 3);
		expect(vR[2]).toBeCloseTo(-Math.PI / 5);
	});
	it('rotation combination special case', () => {
		const tm = transform3d();
		tm.addRotation(0, 0, Math.PI / 2);
		tm.addRotation(Math.PI / 2, 0, 0);
		const vR = tm.getRotation();
		expect(vR[0]).toBeCloseTo(Math.PI / 2); // weird
		expect(vR[1]).toBeCloseTo(-Math.PI / 2);
		expect(vR[2]).toBeCloseTo(0);
	});
});
