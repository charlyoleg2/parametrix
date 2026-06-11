import { describe, it, expect } from 'vitest';
//import { point } from './point.ts';
import * as segLib from './segment.ts';

describe('Segment type suit', () => {
	it('isSeg', () => {
		expect(segLib.isSeg(segLib.SegEnum.eStroke)).toBeTruthy();
	});
	it('isAddPoint', () => {
		expect(segLib.isAddPoint(segLib.SegEnum.eStart)).toBeTruthy();
	});
	it('isAddPoint', () => {
		expect(segLib.isAddPoint(segLib.SegEnum.ePointed)).toBeFalsy();
	});
});

describe('Segment suit', () => {
	const s1 = new segLib.Segment1(segLib.SegEnum.eStroke, 50, 20, 0, false, false);
	const s2 = new segLib.Segment1(segLib.SegEnum.eArc, 50, 50, 50, false, false);
	it('arcSeg1To2', () => {
		expect(() => segLib.arcSeg1To2(0, 0, s1)).toThrowError(/err202/);
		const sb2 = segLib.arcSeg1To2(0, 0, s2);
		expect(sb2.pc.cx).toBeCloseTo(50, 5);
		expect(sb2.pc.cy).toBeCloseTo(0, 0);
	});
});
