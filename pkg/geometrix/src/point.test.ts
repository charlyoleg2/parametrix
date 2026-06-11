import { describe, it, expect } from 'vitest';
//import type { tPolar } from './point.ts';
import { Point, point } from './point.ts';

describe('point module', () => {
	const p1 = new Point(5, 5);
	const p2 = point(8, 9);
	const p3 = point(25, 25);
	it('Point class basic', () => {
		expect(p1.distanceOrig()).toBeCloseTo(5 * Math.sqrt(2), 5);
		expect(p1.isEqual(p1)).toBe(true);
		expect(p1.isEqual(p3)).toBeFalsy();
	});
	it('Point translate', () => {
		expect(p1.translate(1, 2).isEqual(point(6, 7))).toBeTruthy();
		expect(p1.translatePolar(Math.PI / 2, 10).isEqual(point(5, 15))).toBeTruthy();
	});
	it('distanceToPoint function', () => {
		expect(p1.distanceToPoint(p2)).toBeCloseTo(5);
	});
	it('angleToPoint function', () => {
		expect(p1.angleToPoint(p3)).toBeCloseTo(Math.PI / 4, 5);
	});
	const p4 = point(5, -1);
	const p5 = point(15, 5);
	it('point creation middle', () => {
		expect(p1.middlePoint(p4).isEqual(point(5, 2))).toBeTruthy();
	});
	it('point creation equidistance', () => {
		expect(() => p1.equidistantPoint(p4, 2, p2)).toThrowError(/err392/);
		expect(p1.equidistantPoint(p4, 5, p2).isEqual(point(9, 2))).toBeTruthy();
		expect(p1.equidistantPoint(p4, 10, p2).isEqual(point(9, 3))).toBeFalsy();
		expect(() => p1.equidistantPoint(p1, 10, p2)).toThrowError(/err633/);
		expect(p1.equidistantPoint(p5, 5, p2).isEqual(point(10, 5))).toBeTruthy();
	});
});
