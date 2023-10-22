import { describe, it, expect, expectTypeOf } from 'vitest';
//import type { tContour } from 'geometrix';
import * as welem from './wheelElements';

describe('wheelElements module', () => {
	it('axisTorque', () => {
		expectTypeOf(welem.axisTorque(0, 0, 10, 2, 4, 3, 1, 1, 0)).toBeObject();
	});
	it('hollowStraight', () => {
		expect(welem.hollowStraightArea(0, 0, 20, 40, 1, 3, 1)).toBeCloseTo(65);
		expectTypeOf(welem.hollowStraight(0, 0, 40, 20, 1, 3, 1, 0)).toBeArray();
	});
});
