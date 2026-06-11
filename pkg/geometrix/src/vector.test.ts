import { describe, it, expect } from 'vitest';
//import type { tPolar } from './point.ts';
import { point } from './point.ts';
//import type { tCartesian } from './vector.ts';
import { vector } from './vector.ts';
import { degToRad } from './angle_utils.ts';

describe('vector module', () => {
	const p1 = point(50, 50);
	const p2 = point(30, -15);
	const p3 = point(80, -25);
	const v1 = vector(degToRad(0), 100, p1);
	const v2 = vector(degToRad(-90), 20, p1);
	const v3 = vector(degToRad(135), 20, p1);
	it('Vector translate', () => {
		expect(v1.translatePoint(p1).isEqual(point(150, 50))).toBeTruthy();
		expect(v2.translatePoint(p2).isEqual(point(30, -35))).toBeTruthy();
		expect(v3.translatePoint(p3).isEqual(point(65.8578643, -10.857864))).toBeTruthy();
	});
	it('Vector dot product', () => {
		expect(v1.dotProduct(v2)).toBeCloseTo(0, 5);
		expect(v1.dotProduct(v3)).toBeCloseTo(-1414.213562, 5);
	});
	it('Vector cross product', () => {
		expect(v1.crossProduct(v2)).toBeCloseTo(-2000, 5);
		expect(v1.crossProduct(v3)).toBeCloseTo(1414.213562, 5);
	});
});
