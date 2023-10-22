import { describe, it, expect } from 'vitest';
import { involute } from './involute';

function degToRad(deg: number): number {
	return (deg / 180) * Math.PI;
}

describe('involute module', () => {
	it('lFromU', () => {
		expect(involute(0, 0, 50, degToRad(30), true).lFromU(0)).toBeCloseTo(50);
		expect(involute(0, 0, 50, degToRad(30), true).lFromU(degToRad(10))).toBeCloseTo(50.7558307);
	});
	it('ptcta', () => {
		expect(involute(0, 0, 50, degToRad(20), true).ptcta(degToRad(10))).toBeCloseTo(
			degToRad(30)
		);
		expect(involute(0, 0, 50, degToRad(20), true).ptcta(degToRad(15))).toBeCloseTo(
			degToRad(35)
		);
	});
});
