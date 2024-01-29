import { describe, it, expect } from 'vitest';
import { degToRad, radToDeg, roundZero } from './angle_utils';
import { point } from './point';

describe('angle suit', () => {
	it('radian to degree', () => {
		expect(roundZero(radToDeg(Math.PI / 3) - 60)).toBe(0);
	});
	it('degree to radian', () => {
		expect(roundZero(degToRad(45) - Math.PI / 4)).toBe(0);
	});
});

describe('point suit', () => {
	it('coordinate cartesian to polar', () => {
		const cpolar = point(2, 2).getPolar();
		expect([
			roundZero(cpolar[0] - Math.PI / 4),
			roundZero(cpolar[1] - Math.sqrt(8))
		]).toStrictEqual([0, 0]);
	});
});
