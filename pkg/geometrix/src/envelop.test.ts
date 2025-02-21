// envelop.test.ts
import { describe, it, expect } from 'vitest';
import type { tEnvelop } from './envelop';
import { envelop } from './envelop';

describe('Envelop suit 1', () => {
	const e1: tEnvelop = { xMin: -10, xMax: 30, yMin: 5, yMax: 25, orientation: true };
	const e2: tEnvelop = { xMin: -20, xMax: 50, yMin: -5, yMax: 15, orientation: false };
	const e3: tEnvelop = { xMin: 0, xMax: 25, yMin: 10, yMax: 15, orientation: false };
	it('getEnvelop', () => {
		const eTracker = envelop(e1);
		expect(eTracker.add(e2)).toBeTruthy();
		expect(eTracker.add(e3)).toBeFalsy();
		expect(eTracker.check(e3)).toBeFalsy();
	});
});
