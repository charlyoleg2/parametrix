import { describe, it, expect } from 'vitest';
import { Line, line, bisector, circleCenter } from './line.ts';
import { point } from './point.ts';
import { degToRad } from './angle_utils.ts';

describe('line module', () => {
	const l1 = new Line(10, 10, Math.PI / 4);
	const l2 = line(20, 20, (3 / 4) * Math.PI);
	const p1 = point(30, 30);
	const p2 = point(30, -30);
	const lr1 = line(9, -3, degToRad(288));
	const lr2 = line(-15, -33, degToRad(-37));
	it('Line construction', () => {
		expect(() => new Line(0, 0, 0).setFromPoints(p1, p1)).toThrowError(/err434/);
		expect(new Line(0, 0, 0).setFromPoints(p2, p1).ca).toBeCloseTo(Math.PI / 2, 5);
	});
	it('Line Affine', () => {
		const l1Affine = l1.getAffine();
		const l1b = line(0, 0, 0).setAffine(l1Affine);
		expect(l1.isEqual(l1b)).toBeTruthy();
		const lr1Affine = lr1.getAffine();
		const lr1b = line(0, 0, 0).setAffine(lr1Affine);
		expect(lr1.isEqual(lr1b)).toBeTruthy();
	});
	it('Line Axis X and Y intersection', () => {
		expect(l1.getAxisXIntersection()).toBeCloseTo(0, 5);
		expect(l2.getAxisXIntersection()).toBeCloseTo(40, 5);
		expect(l1.getAxisYIntersection()).toBeCloseTo(0, 5);
		expect(l2.getAxisYIntersection()).toBeCloseTo(40, 5);
	});
	it('Line Axis X and Y intersection with triangulation', () => {
		expect(lr1.getAxisXIntersecTri()).toBeCloseTo(lr1.getAxisXIntersection(), 5);
		expect(lr2.getAxisXIntersecTri()).toBeCloseTo(lr2.getAxisXIntersection(), 5);
		expect(lr1.getAxisYIntersecTri()).toBeCloseTo(lr1.getAxisYIntersection(), 5);
		expect(lr2.getAxisYIntersecTri()).toBeCloseTo(lr2.getAxisYIntersection(), 5);
	});
	it('Line distance to Origine', () => {
		expect(l1.distanceOrig()).toBeCloseTo(0, 5);
		expect(l2.distanceOrig()).toBeCloseTo(20 * Math.sqrt(2), 5);
	});
	const l3 = line(50, 0, Math.PI / 2);
	const l4 = line(0, 60, 0);
	it('Line orthogonal projection', () => {
		expect(l1.distanceToPoint(point(10, 10))).toBeCloseTo(0, 5);
		expect(l1.distanceToPoint(point(0, 0))).toBeCloseTo(0, 5);
		expect(l1.distanceToPoint(point(10, -10))).toBeCloseTo(10 * Math.sqrt(2), 5);
		expect(l3.distanceToPoint(point(50, 10))).toBeCloseTo(0, 5);
		expect(l3.distanceToPoint(point(30, 10))).toBeCloseTo(20, 5);
		expect(l4.distanceToPoint(point(-10, 60))).toBeCloseTo(0, 5);
		expect(l4.distanceToPoint(point(20, 90))).toBeCloseTo(30, 5);
	});
	const l5 = line(-30, -30, -Math.PI / 2);
	const l6 = line(-30, 40, -Math.PI / 2);
	it('Line comparison', () => {
		expect(l1.isOrthogonal(l2)).toBeTruthy();
		expect(l1.isOrthogonal(l1)).toBeFalsy();
		expect(l1.isOrthogonal(l3)).toBeFalsy();
		expect(l1.isParallel(l2)).toBeFalsy();
		expect(l3.isParallel(l5)).toBeTruthy();
		expect(l3.isParallel(l3)).toBeTruthy();
		expect(l4.isParallel(l1)).toBeFalsy();
		expect(l1.isEqual(l1)).toBeTruthy();
		expect(l1.isEqual(l2)).toBeFalsy();
		expect(l5.isEqual(l6)).toBeTruthy();
	});
	it('Bisector of 2 points', () => {
		const lAxisX = line(0, 0, 0);
		expect(bisector(p1, p2).isEqual(lAxisX)).toBeTruthy();
	});
	it('Circle-center of 3 points', () => {
		const pA = point(38, 54);
		const pB = point(-5, 28);
		const pC = point(5, 79);
		expect(circleCenter(pA, pB, pC).isEqual(circleCenter(pA, pC, pB))).toBeTruthy();
		expect(circleCenter(pA, pB, pC).isEqual(circleCenter(pC, pA, pB))).toBeTruthy();
		expect(circleCenter(pA, pB, pC).isEqual(circleCenter(pB, pA, pC))).toBeTruthy();
	});
});
