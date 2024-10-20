import { describe, it, expect } from 'vitest';
import {
	degToRad,
	radToDeg,
	roundZero,
	withinZero2Pi,
	withinPiPi,
	withinZeroPi,
	withinHPiHPi,
	pointCoord
} from './angle_utils';

describe('angle suit', () => {
	it('radian to degree', () => {
		expect(radToDeg(Math.PI / 6)).toBeCloseTo(30, 5);
	});
	it('degree to radian', () => {
		expect(degToRad(-45)).toBeCloseTo(-Math.PI / 4, 5);
	});
	it('roundZero', () => {
		expect(roundZero(degToRad(90) - Math.PI / 2)).toBe(0);
	});
	// withinZero2Pi
	it('withinZero2Pi 1', () => {
		expect(withinZero2Pi(Math.PI / 3)).toBeCloseTo(Math.PI / 3, 5);
	});
	it('withinZero2Pi 2', () => {
		expect(withinZero2Pi((-2 * Math.PI) / 3)).toBeCloseTo((4 * Math.PI) / 3, 5);
	});
	it('withinZero2Pi 3', () => {
		expect(withinZero2Pi(-Math.PI / 3)).toBeCloseTo((5 * Math.PI) / 3, 5);
	});
	it('withinZero2Pi 4', () => {
		expect(withinZero2Pi((8 * Math.PI) / 3)).toBeCloseTo((2 * Math.PI) / 3, 5);
	});
	it('withinZero2Pi 5', () => {
		expect(withinZero2Pi((-14 * Math.PI) / 3)).toBeCloseTo((4 * Math.PI) / 3, 5);
	});
	// withinPiPi
	it('withinPiPi 1', () => {
		expect(withinPiPi((3 * Math.PI) / 8)).toBeCloseTo((3 * Math.PI) / 8, 5);
	});
	it('withinPiPi 2', () => {
		expect(withinPiPi((7 * Math.PI) / 8)).toBeCloseTo((7 * Math.PI) / 8, 5);
	});
	it('withinPiPi 3', () => {
		expect(withinPiPi((9 * Math.PI) / 8)).toBeCloseTo((-7 * Math.PI) / 8, 5);
	});
	it('withinPiPi 4', () => {
		expect(withinPiPi((15 * Math.PI) / 8)).toBeCloseTo(-Math.PI / 8, 5);
	});
	it('withinPiPi 5', () => {
		expect(withinPiPi((-13 * Math.PI) / 8)).toBeCloseTo((3 * Math.PI) / 8, 5);
	});
	// withinZeroPi
	it('withinZeroPi 1', () => {
		expect(withinZeroPi((2 * Math.PI) / 7)).toBeCloseTo((2 * Math.PI) / 7, 5);
	});
	it('withinZeroPi 2', () => {
		expect(withinZeroPi((6 * Math.PI) / 7)).toBeCloseTo((6 * Math.PI) / 7, 5);
	});
	it('withinZeroPi 3', () => {
		expect(withinZeroPi((9 * Math.PI) / 7)).toBeCloseTo((2 * Math.PI) / 7, 5);
	});
	it('withinZeroPi 4', () => {
		expect(withinZeroPi(-Math.PI / 7)).toBeCloseTo((6 * Math.PI) / 7, 5);
	});
	it('withinZeroPi 5', () => {
		expect(withinZeroPi((-4 * Math.PI) / 7)).toBeCloseTo((3 * Math.PI) / 7, 5);
	});
	// withinHPiHPi
	it('withinHPiHPi 1', () => {
		expect(withinHPiHPi((2 * Math.PI) / 7)).toBeCloseTo((2 * Math.PI) / 7, 5);
	});
	it('withinHPiHPi 2', () => {
		expect(withinHPiHPi((5 * Math.PI) / 9)).toBeCloseTo((-4 * Math.PI) / 9, 5);
	});
	it('withinHPiHPi 3', () => {
		expect(withinHPiHPi((-8 * Math.PI) / 9)).toBeCloseTo(Math.PI / 9, 5);
	});
	it('withinHPiHPi 4', () => {
		expect(withinHPiHPi((17 * Math.PI) / 9)).toBeCloseTo(-Math.PI / 9, 5);
	});
	it('pointCoord', () => {
		expect(pointCoord(10, 20, Math.PI / 3, 40)).toEqual([
			expect.closeTo(30, 4),
			expect.closeTo(20 + 40 * 0.866025, 4)
		]);
	});
});
