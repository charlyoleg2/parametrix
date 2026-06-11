import { describe, it, expect } from 'vitest';
//import { roundZero } from './angle_utils.ts';
import {
	rightTriLaFromLbLc,
	rightTriLbFromLaLc,
	lcFromLaLbAc,
	aCFromLaLbLc,
	aCFromAaAb,
	lbFromLaAaAb,
	aBFromLaLbAa
} from './triangle_utils.ts';

describe('triangle suit', () => {
	it('right triangle hypothenuse 1', () => {
		expect(rightTriLaFromLbLc(3, 4)).toBeCloseTo(5, 5);
	});
	it('right triangle hypothenuse 2', () => {
		expect(rightTriLaFromLbLc(2, 2)).toBeCloseTo(2.828427, 5);
	});
	it('right triangle side 1', () => {
		expect(rightTriLbFromLaLc(5, 4)).toBeCloseTo(3, 5);
	});
	it('any triangle lc 1', () => {
		expect(lcFromLaLbAc(3, 4, Math.PI / 2)).toBeCloseTo(5, 5);
	});
	it('any triangle aC 1', () => {
		expect(aCFromLaLbLc(3, 4, 5)).toBeCloseTo(Math.PI / 2, 5);
	});
	it('any triangle aC angle only 1', () => {
		expect(aCFromAaAb(Math.PI / 7, (4 * Math.PI) / 7)).toBeCloseTo((2 * Math.PI) / 7, 5);
	});
	it('any triangle lb 1', () => {
		expect(lbFromLaAaAb(1, Math.PI / 2, Math.PI / 6)).toBeCloseTo(0.5, 5);
	});
	it('any triangle aB 1', () => {
		expect(aBFromLaLbAa(2, 1, Math.PI / 2)).toBeCloseTo(Math.PI / 6, 5);
	});
});
