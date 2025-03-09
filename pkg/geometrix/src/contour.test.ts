import { describe, it, expect } from 'vitest';
import { point } from './point';
import { contour, contourCircle } from './contour';

describe('Contour suit', () => {
	const ctr1 = contour(10, 10);
	ctr1.addPointA(20, 20).addSegStroke();
	ctr1.addPointA(20, 0).addSegStroke();
	ctr1.closeSegStroke();
	it('extractPoints', () => {
		expect(ctr1.generatePoints(2)[0].isEqual(point(10, 10))).toBeTruthy();
	});
	it('generateContour', () => {
		const ctr2 = ctr1.generateContour();
		expect(ctr2.generatePoints(2)[0].isEqual(point(10, 10))).toBeTruthy();
	});
	it('getEnvelop', () => {
		const ke = ctr1.getEnvelop();
		expect(ke.xMin).toBeCloseTo(10);
		expect(ke.xMax).toBeCloseTo(20);
		expect(ke.yMin).toBeCloseTo(0);
		expect(ke.yMax).toBeCloseTo(20);
		expect(ke.orientation).toBeFalsy();
	});
});

describe('Contour suit 2', () => {
	const ctr1 = contour(10, 10);
	ctr1.addSegStrokeR(30, 30);
	ctr1.addCornerPointed();
	ctr1.addCornerPointed();
	ctr1.addSegStrokeR(30, -30);
	ctr1.closeSegStroke();
	it('generateContour', () => {
		expect(() => ctr1.generateContour()).toThrowError(/err419/);
	});
});

describe('Contour suit 3', () => {
	const ctr1 = contour(0, 0)
		.addSegStrokeA(10, 0)
		.addSegStrokeA(10, 10)
		.addSegStrokeA(0, 10)
		.closeSegStroke();
	const ctr2 = contour(0, 0).addPointA(20, 0).addSegArc(10, true, false).closeSegStroke();
	const ctr3 = contour(0, 0).addPointA(10, 5).addPointA(20, 0).addSegArc2().closeSegStroke();
	const ctr4 = contour(0, 0).addPointA(10, 25).addPointA(20, 0).addSegArc2().closeSegStroke();
	const ctr5 = contour(0, 0).addPointA(10, -5).addPointA(20, 0).addSegArc2().closeSegStroke();
	const ctr6 = contour(0, 0).addPointA(10, -25).addPointA(20, 0).addSegArc2().closeSegStroke();
	const ctr7 = contour(0, 0)
		.addPointA(10, 5)
		.addPointA(20, 0)
		.addSegArc2()
		.addCornerRounded(2)
		.closeSegStroke();
	const ctr8 = contour(0, 0)
		.addCornerRounded(2)
		.addPointA(10, -4.01)
		.addPointA(20, 0)
		.addSegArc2()
		.addCornerRounded(2)
		.closeSegStroke();
	it('getPerimeter1', () => {
		expect(ctr1.getPerimeter()).toBeCloseTo(40);
	});
	it('getPerimeter2', () => {
		expect(ctr2.getPerimeter()).toBeCloseTo(Math.PI * 10 + 20);
	});
	it('getPerimeter3', () => {
		expect(ctr3.getPerimeter()).toBeCloseTo(43.18238);
	});
	it('getPerimeter4', () => {
		expect(ctr4.getPerimeter()).toBeCloseTo(89.036817);
	});
	it('getPerimeter5', () => {
		expect(ctr5.getPerimeter()).toBeCloseTo(43.18238);
	});
	it('getPerimeter6', () => {
		expect(ctr6.getPerimeter()).toBeCloseTo(89.036817);
	});
	it('getPerimeter7', () => {
		expect(ctr7.getPerimeter()).toBeCloseTo(36.966259);
	});
	it('getPerimeter8', () => {
		expect(ctr8.getPerimeter()).toBeCloseTo(14.56414);
	});
});

describe('Contour suit 4', () => {
	const ctr1 = contour(-10, -20);
	ctr1.addPointA(-30, 0).addPointA(0, 20).addSegArc2();
	ctr1.addPointA(-20, 0).addSegStroke();
	ctr1.closeSegStroke();
	it('getEnvelop', () => {
		const ke = ctr1.getEnvelop();
		expect(ke.xMin).toBeCloseTo(-30);
		expect(ke.xMax).toBeCloseTo(0);
		expect(ke.yMin).toBeCloseTo(-20);
		expect(ke.yMax).toBeCloseTo(22.023794922743047);
		expect(ke.orientation).toBeFalsy();
	});
});

describe('Contour suit 5', () => {
	const ctr1 = contour(-10, -20);
	ctr1.addPointA(-20, 0).addSegStroke();
	ctr1.addPointA(0, 20).addSegStroke();
	ctr1.addPointA(-30, 0).addPointA(-10, -20).addSegArc2();
	it('getEnvelop', () => {
		const ke = ctr1.getEnvelop();
		expect(ke.xMin).toBeCloseTo(-30);
		expect(ke.xMax).toBeCloseTo(0);
		expect(ke.yMin).toBeCloseTo(-20);
		expect(ke.yMax).toBeCloseTo(22.023794922743047);
		expect(ke.orientation).toBeTruthy();
	});
});

describe('Contour suit 6', () => {
	const ctr1 = contour(0, 0);
	ctr1.addSegStrokeA(200, 0);
	ctr1.addSegStrokeA(200, 100);
	//ctr1.addSegStrokeA(0, 100);
	ctr1.closeSegStroke();
	it('getEnvelop', () => {
		const ke = ctr1.getEnvelop();
		expect(ke.xMin).toBeCloseTo(0);
		expect(ke.orientation).toBeTruthy();
	});
});

describe('Contour suit 7', () => {
	const ctr1 = contour(0, 0);
	ctr1.addSegStrokeA(200, 0);
	ctr1.addSegStrokeA(200, 50);
	ctr1.addSegStrokeA(200, 100);
	ctr1.addSegStrokeA(0, 100);
	ctr1.addSegStrokeA(0, 50);
	ctr1.closeSegStroke();
	it('getEnvelop', () => {
		const ke = ctr1.getEnvelop();
		expect(ke.xMin).toBeCloseTo(0);
		expect(ke.orientation).toBeTruthy();
	});
});

describe('Contour suit 8a', () => {
	const ctr1 = contour(0, 0);
	ctr1.addSegStrokeA(200, 0);
	ctr1.addSegStrokeAifBig(200, 0.1, 0.5, false);
	ctr1.addSegStrokeA(200, 50);
	ctr1.closeSegStroke();
	it('addSegStrokeAifBig', () => {
		expect(ctr1.segments.length).toBeCloseTo(4);
	});
});

describe('Contour suit 8b', () => {
	const ctr1 = contour(0, 0);
	ctr1.addSegStrokeA(200, 0);
	ctr1.addCornerRounded(10);
	//ctr1.addSegStrokeAifBig(200, 0.1, 0.5, true);
	//ctr1.addSegStrokeA(200, 50);
	//ctr1.closeSegStroke();
	it('addSegStrokeAifBig error', () => {
		expect(() => ctr1.addSegStrokeAifBig(200, 0.1, 0.5, true)).toThrowError(/err186/);
	});
});

describe('Contour suit 8c', () => {
	const ctr1 = contour(0, 0);
	ctr1.addSegStrokeA(200, 0);
	ctr1.addSegStrokeAifBig(220, 20, 0.5, true);
	ctr1.addSegStrokeA(200, 50);
	ctr1.closeSegStroke();
	it('addSegStrokeAifBig', () => {
		expect(ctr1.segments.length).toBeCloseTo(5);
	});
});

describe('Contour suit 8d', () => {
	const ctr1 = contour(0, 0);
	ctr1.addPointA(100, -30).addPointA(200, 0).addSegArc2();
	ctr1.addSegStrokeAifBig(200, 0.1, 0.5, true);
	ctr1.addSegStrokeA(200, 50);
	ctr1.closeSegStroke();
	it('addSegStrokeAifBig', () => {
		expect(ctr1.segments.length).toBeCloseTo(4);
		expect(ctr1.segments[1].py).toBeCloseTo(0.1);
	});
});

describe('ContourCircle suit', () => {
	const ctr3 = contourCircle(50, 50, 20);
	it('extractPoints', () => {
		expect(ctr3.generatePoints(2)[0].isEqual(point(50, 50))).toBeTruthy();
		expect(ctr3.generatePoints(2)[1].isEqual(point(70, 50))).toBeTruthy();
	});
	it('getPerimeter', () => {
		expect(ctr3.getPerimeter()).toBeCloseTo(2 * Math.PI * 20);
	});
});
