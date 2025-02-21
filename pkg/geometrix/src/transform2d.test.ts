// transform2d.test.ts

import { describe, it, expect } from 'vitest';
import type { tVec2 } from './transform2d';
import { transform2d } from './transform2d';

describe('Transform-2D suit', () => {
	it('simple transform', () => {
		const v1: tVec2 = [1, 0]; // x,y
		const tm = transform2d();
		tm.addTranslation(2, 0);
		const v2 = tm.transform(v1);
		expect(v2[0]).toBe(3);
		expect(v2[1]).toBe(0);
	});
	it('simple combination', () => {
		const tm = transform2d();
		tm.addRotation(0);
		tm.addTranslation(0, 2);
		const vT = tm.getTranslation();
		expect(vT[0]).toBe(0);
		expect(vT[1]).toBe(2);
	});
	it('One Z-rotation', () => {
		const v1: tVec2 = [1, 0]; // x,y
		const tm = transform2d();
		tm.addRotation(Math.PI / 2);
		const v2 = tm.transform(v1);
		expect(v2[0]).toBeCloseTo(0);
		expect(v2[1]).toBeCloseTo(1);
	});
	it('translation combination', () => {
		const tm = transform2d();
		tm.addTranslation(-1, 1);
		tm.addTranslation(0, 2);
		const vT = tm.getTranslation();
		expect(vT[0]).toBeCloseTo(-1);
		expect(vT[1]).toBeCloseTo(3);
	});
	it('rotation combination', () => {
		const tm = transform2d();
		tm.addRotation(-Math.PI / 4);
		tm.addRotation(Math.PI / 3);
		const az = tm.getRotation();
		expect(az).toBeCloseTo(Math.PI / 12);
	});
	it('combination rotation translation', () => {
		const tm = transform2d();
		tm.addRotation(0.4);
		tm.addTranslation(1, 2);
		const az = tm.getRotation();
		const vT = tm.getTranslation();
		expect(az).toBeCloseTo(0.4);
		expect(vT[0]).toBeCloseTo(1);
		expect(vT[1]).toBeCloseTo(2);
	});
	it('combination translation rotation', () => {
		const tm = transform2d();
		tm.addTranslation(1, 2);
		tm.addRotation(0.4);
		const az = tm.getRotation();
		const vT = tm.getTranslation();
		expect(az).toBeCloseTo(0.4);
		expect(vT[0]).toBeCloseTo(0.14222430938558406);
		expect(vT[1]).toBeCloseTo(2.2315403303144206);
	});
});
