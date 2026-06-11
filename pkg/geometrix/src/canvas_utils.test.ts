import { describe, it, expect } from 'vitest';
//import type { tCanvasAdjust };
import {
	colors,
	point2canvas,
	canvas2point,
	//adjustZero,
	adjustInit
	//adjustCenter,
	//adjustRect,
	//adjustScale,
	//adjustTranslate
} from './canvas_utils.ts';

const cAdjust = adjustInit(0, 200, 0, 200, 200, 200);

describe('canvas_utils', () => {
	it('colors object', () => {
		expect(colors).toHaveProperty('point');
		expect(colors).not.toHaveProperty('blabla');
	});
	it('point2canvas function', () => {
		expect(point2canvas(10, 20, cAdjust)).toEqual([19, 172]);
	});
	it('canvas2point function', () => {
		expect(canvas2point(19, 172, cAdjust)).toEqual([10, 20]);
	});
});
