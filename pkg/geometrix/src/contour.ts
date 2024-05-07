// contour.ts
// contour.ts deals with open and closed path composed of segments and arcs
// contour.ts depends on point.ts, line.ts, vector.ts and segment.ts
// contour.ts is used by figure.ts

import type { tCanvasAdjust } from './canvas_utils';
//import type { tPolar } from './point';
//import { colorCanvasPoint } from '$lib/style/colors.scss';
import {
	//degToRad,
	//radToDeg,
	roundZero,
	withinZero2Pi,
	withinPiPi,
	//withinZeroPi,
	//withinHPiHPi,
	ffix
} from './angle_utils';
import { colors, point2canvas, radius2canvas } from './canvas_utils';
//import {
//	//rightTriLaFromLbLc,
//	rightTriLbFromLaLc
//	//lcFromLaLbAc,
//	//aCFromLaLbLc,
//	//aCFromAaAb,
//	//lbFromLaAaAb,
//	//aBFromLaLbAa
//} from './triangle_utils';
import { point, Point } from './point';
import { line, Line, bisector, circleCenter } from './line';
//import { vector, Vector } from './vector';
import * as segLib from './segment';
import { svgPath, svgCircleString } from './write_svg';
import type { DxfSeg } from './write_dxf';
import { dxfSegLine, dxfSegArc, dxfSegCircle } from './write_dxf';
import type { tPaxContourPath, tPaxContourCircle, tPaxContour } from './prepare_pax';
import { paxPath, paxCircle } from './prepare_pax';

/* AContour abstract class */

abstract class AContour {
	abstract circle: boolean;
	abstract imposedColor: string;
	abstract draw(ctx: CanvasRenderingContext2D, cAdjust: tCanvasAdjust, color: string): void;
	abstract extractSkeleton(): AContour;
	abstract generateContour(): AContour;
	abstract generatePoints(): Point[];
	abstract generateLines(): Line[];
	abstract check(): string;
	abstract toSvg(yCeiling: number, color?: string): string;
	abstract toDxfSeg(): DxfSeg[];
	abstract toPax(): tPaxContour;
	abstract getPerimeter(): number;
}

/**
 * class `Contour`
 *
 */

class Contour extends AContour {
	/** @internal */
	circle = false;
	segments: segLib.Segment1[];
	points: Point[];
	debugPoints: Point[];
	debugLines: Line[];
	lastPoint: Point;
	imposedColor: string;
	/**
	 *	@param ix - the X absolute coordinate of the first point of the contour
	 *	@param iy - the Y absolute coordinate of the first point of the contour
	 *	@param icolor - an optional color name to be used instead of the default color
	 */
	constructor(ix: number, iy: number, icolor = '') {
		super();
		this.segments = [new segLib.Segment1(segLib.SegEnum.eStart, ix, iy, 0)];
		this.points = [];
		this.debugPoints = [];
		this.debugLines = [];
		this.lastPoint = point(ix, iy);
		this.imposedColor = icolor;
	}
	/** @internal */
	setLastPoint(ix: number, iy: number) {
		this.lastPoint = point(ix, iy);
	}
	/** @internal */
	getLastPoint(): Point {
		return this.lastPoint;
	}
	getFirstPoint(): Point {
		const rpfirst = point(this.segments[0].px, this.segments[0].py);
		return rpfirst;
	}
	addPointA(ax: number, ay: number): Contour {
		if (this.points.length > 2) {
			throw `err311: contour add too much point ${ax} ${ay}`;
		}
		this.points.push(point(ax, ay));
		return this;
	}
	addPointAP(aa: number, al: number): Contour {
		const p1 = point(0, 0).translatePolar(aa, al);
		this.addPointA(p1.cx, p1.cy);
		return this;
	}
	addPointR(rx: number, ry: number): Contour {
		const plast = this.getLastPoint();
		const p1 = plast.translate(rx, ry);
		this.addPointA(p1.cx, p1.cy);
		return this;
	}
	addPointRP(ra: number, rl: number): Contour {
		const plast = this.getLastPoint();
		const p1 = plast.translatePolar(ra, rl);
		this.addPointA(p1.cx, p1.cy);
		return this;
	}
	/** @internal */
	addSeg(iSeg: segLib.Segment1): Contour {
		this.segments.push(iSeg);
		return this;
	}
	/** @internal */
	addSegStroke(): Contour {
		if (this.points.length !== 1) {
			throw `err554: contour addSegStroke with unexpected points.length ${this.points.length}`;
		}
		const p1 = this.points.pop();
		if (p1 !== undefined) {
			const seg = new segLib.Segment1(segLib.SegEnum.eStroke, p1.cx, p1.cy, 0);
			if (!p1.isEqual(this.getLastPoint())) {
				this.addSeg(seg);
				this.setLastPoint(p1.cx, p1.cy);
			}
			// TODO : check this weirdness!
			// else no warning in order to avoid warning in gears
		} else {
			throw `err284: contour p1 is undefined`;
		}
		return this;
	}
	addSegStrokeA(ax: number, ay: number): Contour {
		this.addPointA(ax, ay).addSegStroke();
		return this;
	}
	addSegStrokeAP(aa: number, al: number): Contour {
		this.addPointAP(aa, al).addSegStroke();
		return this;
	}
	addSegStrokeR(rx: number, ry: number): Contour {
		this.addPointR(rx, ry).addSegStroke();
		return this;
	}
	addSegStrokeRP(ra: number, rl: number): Contour {
		this.addPointRP(ra, rl).addSegStroke();
		return this;
	}
	addSegArc(iRadius: number, iLarge: boolean, iCcw: boolean): Contour {
		if (this.points.length !== 1) {
			throw `err954: contour addSegArc with unexpected points.length ${this.points.length}`;
		}
		const p1 = this.points.pop();
		if (p1 !== undefined) {
			const seg = new segLib.Segment1(
				segLib.SegEnum.eArc,
				p1.cx,
				p1.cy,
				iRadius,
				iLarge,
				iCcw
			);
			if (!p1.isEqual(this.getLastPoint())) {
				this.addSeg(seg);
				this.setLastPoint(p1.cx, p1.cy);
			} else {
				console.log(
					`warn144: addSegArc last and new point identical ${ffix(p1.cx)} ${ffix(p1.cy)}`
				);
			}
			//this.debugPoints.push(p1);
		} else {
			throw `err482: contour p1 is undefined`;
		}
		return this;
	}
	addSegArc2(): Contour {
		if (this.points.length !== 2) {
			throw `err958: contour addSegArc2 with unexpected points.length ${this.points.length}`;
		}
		const p2 = this.points.pop();
		const p1 = this.points.pop();
		if (p1 !== undefined && p2 !== undefined) {
			const p0 = this.getLastPoint();
			const p3 = circleCenter(p0, p1, p2);
			const radius = p3.distanceToPoint(p0);
			const p0p2middle = p0.middlePoint(p2);
			const a0 = p0p2middle.angleToPoint(p0);
			const a1 = p0p2middle.angleToPoint(p1);
			const a01 = withinPiPi(a1 - a0);
			let large = false;
			let ccw = false;
			if (!p0p2middle.isEqual(p3)) {
				const a3 = p0p2middle.angleToPoint(p3);
				const a03 = withinPiPi(a3 - a0);
				if (Math.sign(a03) * Math.sign(a01) > 0) {
					large = true;
				}
			}
			if (Math.sign(a01) > 0) {
				ccw = true;
			}
			//console.log(`dbg437: ${radius.toFixed(2)} ${large} ${ccw}`);
			this.addPointA(p2.cx, p2.cy).addSegArc(radius, large, ccw);
			this.debugPoints.push(p1);
			//this.debugPoints.push(p2);
		} else {
			throw `err488: contour p1 or p2 or seg is undefined`;
		}
		return this;
	}
	addSegArc3(iTangentAngle1: number, firstNlast: boolean): Contour {
		if (this.points.length !== 1) {
			throw `err914: contour addSegArc3 with unexpected points.length ${this.points.length}`;
		}
		const p1 = this.points.pop();
		if (p1 !== undefined) {
			const p0 = this.getLastPoint();
			const lbi = bisector(p0, p1);
			let pref = p1;
			if (firstNlast) {
				pref = p0;
			}
			const lradial = line(pref.cx, pref.cy, iTangentAngle1 + Math.PI / 2);
			const pArcCenter = lbi.intersection(lradial);
			const radius = pArcCenter.distanceToPoint(p0);
			const pmid = p0.middlePoint(p1);
			const amid = pref.angleToPoint(pmid);
			const aref = withinPiPi(iTangentAngle1 - amid);
			let large = false;
			if (Math.abs(aref) > Math.PI / 2) {
				large = true;
			}
			let ccw = false;
			if (aref < 0) {
				ccw = true;
			}
			if (!firstNlast) {
				ccw = !ccw;
			}
			this.addPointA(p1.cx, p1.cy).addSegArc(radius, large, ccw);
			this.debugPoints.push(pmid);
			this.debugPoints.push(pArcCenter);
		} else {
			throw `err282: contour p1 is undefined`;
		}
		return this;
	}
	addSeg2Arcs(ita1: number, ita2: number): Contour {
		if (this.points.length !== 1) {
			throw `err214: contour addSeg2Arcs with unexpected points.length ${this.points.length}`;
		}
		const p1 = this.points.pop();
		if (p1 !== undefined) {
			const p0 = this.getLastPoint();
			const l01 = p0.distanceToPoint(p1);
			const a01 = p0.angleToPoint(p1);
			const a10 = p1.angleToPoint(p0);
			const au = withinPiPi(ita1 - a01);
			const av = -1 * withinPiPi(ita2 - a10);
			//console.log(`dbg998: addSeg2Arcs au ${au} av ${av}`);
			if (Math.abs(au) >= Math.PI / 2) {
				throw `err545: addSeg2Arcs with too large au ${au}`;
			}
			if (Math.abs(av) >= Math.PI / 2) {
				throw `err546: addSeg2Arcs with too large av ${av}`;
			}
			if (roundZero(au) === 0) {
				throw `err765: addSeg2Arcs with almost zero au ${au}`;
			}
			if (roundZero(av) === 0) {
				throw `err766: addSeg2Arcs with almost zero av ${av}`;
			}
			if (Math.sign(au) * Math.sign(av) < 1) {
				throw `err767: addSeg2Arcs with au/av bad orientation ${au} ${av}`;
			}
			// l01=BH+HC
			// HG=BH*tan(au/2)=HC*tan(av/2)
			// l01=HG*(1/tan(au/2)+1/tan(av/2))
			// l01*tan(au/2)*tan(av/2)=HG*tan(av/2)+HG*tan(au/2)
			// HG=l01*tan(au/2)*tan(av/2)/(tan(av/2)+tan(au/2))
			// trigonometry half-angle formula: tan(a/2)=(1-cos(a))/sin(a)
			// trigonometry tan(a+b)=(tan(a)+tan(b))/(1-tan(a)*tan(b))
			const tanu2 = Math.tan(au / 2);
			const tanv2 = Math.tan(av / 2);
			//const lHG = (l01 * tanu2 * tanv2) / (tanv2 + tanu2); // only for console.log()
			//const lBH = lHG/tanu2;
			const lBH = (l01 * tanv2) / (tanv2 + tanu2);
			// cos(PI/2-au)=sin(u)=lBH/lJB
			// lJB=lBH/sin(au)
			const lJB = Math.abs(lBH / Math.sin(au));
			//const lJH = lBH / Math.cotan(au);
			const lBG = lBH / Math.cos(au / 2);
			const lHC = (l01 * tanu2) / (tanv2 + tanu2);
			const lIC = Math.abs(lHC / Math.sin(av));
			//const lCG = lHC / Math.cos(av / 2); // only for console.log()
			const p2 = p0.translatePolar(a01 + au / 2, lBG);
			let ccw = false;
			if (Math.sign(au) < 0) {
				ccw = true;
			}
			//console.log(`dbg401: addSeg2Arcs l01 ${l01} lHG ${lHG}`);
			//console.log(`dbg409: addSeg2Arcs lBH ${lBH} lBG ${lBG} lJB ${lJB}`);
			//console.log(`dbg408: addSeg2Arcs lHC ${lHC} lCG ${lCG} lIC ${lIC}`);
			this.addPointA(p2.cx, p2.cy).addSegArc(lJB, false, ccw);
			this.addPointA(p1.cx, p1.cy).addSegArc(lIC, false, ccw);
			//this.debugPoints.push(p2);
			this.debugPoints.push(p0.translatePolar(a01, lBH)); // H
			this.debugPoints.push(p0.translatePolar(a01 + au - (Math.sign(au) * Math.PI) / 2, lJB)); // J
			//this.debugPoints.push(p1.translatePolar(a10, lHC)); // H
			this.debugPoints.push(p1.translatePolar(a10 - av + (Math.sign(au) * Math.PI) / 2, lIC)); // I
		} else {
			throw `err182: contour p1 is undefined`;
		}
		return this;
	}
	addCornerPointed(): Contour {
		const seg = new segLib.Segment1(segLib.SegEnum.ePointed, 0, 0, 0);
		this.addSeg(seg);
		return this;
	}
	addCornerRounded(iRadius: number): Contour {
		const seg = new segLib.Segment1(segLib.SegEnum.eRounded, 0, 0, iRadius);
		this.addSeg(seg);
		return this;
	}
	addCornerWidened(iRadius: number): Contour {
		const seg = new segLib.Segment1(segLib.SegEnum.eWidened, 0, 0, iRadius);
		this.addSeg(seg);
		return this;
	}
	addCornerWideAcc(iRadius: number): Contour {
		const seg = new segLib.Segment1(segLib.SegEnum.eWideAcc, 0, 0, iRadius);
		this.addSeg(seg);
		return this;
	}
	closeSegStroke(): Contour {
		const px = this.segments[0].px;
		const py = this.segments[0].py;
		this.addSegStrokeA(px, py);
		return this;
	}
	closeSegArc(iRadius: number, iLarge: boolean, iCcw: boolean): Contour {
		const px = this.segments[0].px;
		const py = this.segments[0].py;
		this.addPointA(px, py).addSegArc(iRadius, iLarge, iCcw);
		return this;
	}
	/** @internal */
	clone(): Contour {
		const rctr = new Contour(this.segments[0].px, this.segments[0].py);
		for (const seg of this.segments) {
			const nseg = seg.clone();
			if (nseg.sType !== segLib.SegEnum.eStart) {
				rctr.addSeg(nseg);
				if (segLib.isSeg(nseg.sType)) {
					rctr.setLastPoint(nseg.px, nseg.py);
				}
			}
		}
		return rctr;
	}
	translate(ix: number, iy: number): Contour {
		const p0x = this.segments[0].px + ix;
		const p0y = this.segments[0].py + iy;
		const rctr = new Contour(p0x, p0y);
		for (const seg of this.segments) {
			const nseg = seg.clone();
			if (segLib.isSeg(seg.sType)) {
				nseg.px += ix;
				nseg.py += iy;
			}
			if (nseg.sType !== segLib.SegEnum.eStart) {
				rctr.addSeg(nseg);
				if (segLib.isSeg(nseg.sType)) {
					rctr.setLastPoint(nseg.px, nseg.py);
				}
			}
		}
		return rctr;
	}
	translatePolar(ia: number, il: number): Contour {
		return this.translate(il * Math.cos(ia), il * Math.sin(ia));
	}
	rotate(ix: number, iy: number, ia: number): Contour {
		const ic = point(ix, iy);
		const pStart = point(this.segments[0].px, this.segments[0].py);
		const pStartRot = pStart.rotate(ic, ia);
		const rctr = new Contour(pStartRot.cx, pStartRot.cy);
		for (const seg of this.segments) {
			const nseg = seg.clone();
			if (segLib.isSeg(seg.sType)) {
				const pt = point(nseg.px, nseg.py);
				const ptRot = pt.rotate(ic, ia);
				nseg.px = ptRot.cx;
				nseg.py = ptRot.cy;
			}
			if (nseg.sType !== segLib.SegEnum.eStart) {
				rctr.addSeg(nseg);
				if (segLib.isSeg(nseg.sType)) {
					rctr.setLastPoint(nseg.px, nseg.py);
				}
			}
		}
		return rctr;
	}
	scale(ix: number, iy: number, ir: number, scaleCorner = false): Contour {
		const ic = point(ix, iy);
		const pStart = point(this.segments[0].px, this.segments[0].py);
		const pStartScale = pStart.scale(ic, ir);
		const rctr = new Contour(pStartScale.cx, pStartScale.cy);
		for (const seg of this.segments) {
			const nseg = seg.clone();
			if (segLib.isSeg(seg.sType)) {
				const pt = point(nseg.px, nseg.py);
				const ptScale = pt.scale(ic, ir);
				nseg.px = ptScale.cx;
				nseg.py = ptScale.cy;
			}
			if (seg.sType === segLib.SegEnum.eArc) {
				nseg.radius *= ir;
			}
			if (segLib.isActiveCorner(seg.sType) && scaleCorner) {
				nseg.radius *= ir;
			}
			if (nseg.sType !== segLib.SegEnum.eStart) {
				rctr.addSeg(nseg);
				if (segLib.isSeg(nseg.sType)) {
					rctr.setLastPoint(nseg.px, nseg.py);
				}
			}
		}
		return rctr;
	}
	addPartial(iContour: Contour): Contour {
		if (this.points.length > 0) {
			throw `err911: addPartial, points should be used ${this.points.length}`;
		}
		let iCtr = iContour;
		if (iContour.segments.length > 0) {
			const p0 = iContour.segments[0];
			const pLast = this.getLastPoint();
			const dx = p0.px - pLast.cx;
			const dy = p0.py - pLast.cy;
			if (p0.sType === segLib.SegEnum.eStart) {
				iCtr = iContour.translate(-dx, -dy);
			}
		}
		for (const seg of iCtr.segments) {
			if (seg.sType !== segLib.SegEnum.eStart) {
				this.addSeg(seg);
				if (segLib.isSeg(seg.sType)) {
					this.setLastPoint(seg.px, seg.py);
				}
			}
		}
		return this;
	}
	draw(ctx: CanvasRenderingContext2D, cAdjust: tCanvasAdjust, color: string = colors.contour) {
		const theColor = this.imposedColor === '' ? color : this.imposedColor;
		let px1 = 0;
		let py1 = 0;
		for (const seg of this.segments) {
			if (seg.sType === segLib.SegEnum.eStroke) {
				const [cx1, cy1] = point2canvas(px1, py1, cAdjust);
				const [cx2, cy2] = point2canvas(seg.px, seg.py, cAdjust);
				ctx.beginPath();
				ctx.moveTo(cx1, cy1);
				ctx.lineTo(cx2, cy2);
				ctx.strokeStyle = theColor;
				ctx.stroke();
			}
			if (seg.sType === segLib.SegEnum.eArc) {
				try {
					const seg2 = segLib.arcSeg1To2(px1, py1, seg);
					const [cx3, cy3] = point2canvas(seg2.pc.cx, seg2.pc.cy, cAdjust);
					const cRadius = radius2canvas(seg.radius, cAdjust);
					ctx.beginPath();
					ctx.arc(cx3, cy3, cRadius, -seg2.a1, -seg2.a2, seg.arcCcw);
					ctx.strokeStyle = theColor;
					ctx.stroke();
				} catch (emsg) {
					console.log('err413: ' + (emsg as string));
				}
			}
			if (segLib.isAddPoint(seg.sType)) {
				px1 = seg.px;
				py1 = seg.py;
			}
		}
	}
	extractSkeleton(): Contour {
		const seg0 = this.segments[0];
		const rContour = new Contour(seg0.px, seg0.py);
		for (const seg of this.segments) {
			if (segLib.isSeg(seg.sType)) {
				rContour.addSeg(seg);
			}
		}
		return rContour;
	}
	generateContour(): Contour {
		segLib.gSegDbg.clearPoints();
		segLib.gSegDbg.clearLines();
		const segStack: segLib.Segment2[] = [];
		const segStackEnd: segLib.Segment2[] = [];
		let coType = 0;
		let px1 = 0;
		let py1 = 0;
		for (const seg of this.segments) {
			if (seg.sType === segLib.SegEnum.eStroke) {
				const p1 = point(px1, py1);
				const p2 = point(seg.px, seg.py);
				const p0 = point(0, 0);
				segStack.push(new segLib.Segment2(seg.sType, p1, p2, p0, 0, 0, 0, false));
				coType = 1;
			}
			if (seg.sType === segLib.SegEnum.eArc) {
				const seg2 = segLib.arcSeg1To2(px1, py1, seg);
				segStack.push(seg2);
				coType = 1;
			}
			const segz1 = segStack.at(-1);
			const segz2 = segStack.at(-2);
			if (segz1 !== undefined && segz2 !== undefined) {
				if (segLib.isSeg(segz1.sType) && segLib.isCorner(segz2.sType)) {
					const s3 = segStack.pop();
					const s2 = segStack.pop();
					const s1 = segStack.pop();
					if (s1 !== undefined && s2 !== undefined && s3 !== undefined) {
						const segs = segLib.makeCorner(s1, s2, s3);
						segStack.push(...segs);
					} else {
						throw `err603: contour generateContour internal error`;
					}
				}
			}
			if (segLib.isCorner(seg.sType)) {
				if (coType === 2) {
					throw `err419: generateContour with two consecutive corners ${seg.sType}`;
				}
				if (coType === 0 && segLib.isActiveCorner(seg.sType) && seg.radius > 0) {
					const p0 = point(0, 0);
					segStackEnd.push(
						new segLib.Segment2(seg.sType, p0, p0, p0, seg.radius, 0, 0, false)
					);
				}
				if (coType === 1 && segLib.isActiveCorner(seg.sType) && seg.radius > 0) {
					const p0 = point(0, 0);
					segStack.push(
						new segLib.Segment2(seg.sType, p0, p0, p0, seg.radius, 0, 0, false)
					);
				}
				coType = 2;
			}
			if (segLib.isAddPoint(seg.sType)) {
				px1 = seg.px;
				py1 = seg.py;
			}
		}
		if (segStackEnd.length > 0) {
			if (coType === 1) {
				segStack.push(...segStackEnd);
			} else {
				throw `err397: contour generateContour Corners defined at end and begining`;
			}
		}
		const segz1 = segStack.at(-1);
		if (segz1 !== undefined) {
			if (segLib.isCorner(segz1.sType)) {
				const s3 = segStack[0];
				const s2 = segStack.pop();
				const s1 = segStack.pop();
				if (s1 !== undefined && s2 !== undefined && s3 !== undefined) {
					const segs = segLib.makeCorner(s1, s2, s3);
					segStack.push(...segs.slice(0, -1));
					const s4 = segs.at(-1);
					if (s4 !== undefined) {
						segStack[0] = s4;
					} else {
						throw `err606: contour generateContour internal error`;
					}
				} else {
					throw `err602: contour generateContour internal error`;
				}
			}
		}
		const seg0 = segStack[0];
		const rContour = new Contour(seg0.p1.cx, seg0.p1.cy, this.imposedColor);
		rContour.debugPoints.push(...segLib.gSegDbg.getPoints());
		rContour.debugLines.push(...segLib.gSegDbg.getLines());
		//console.log(`dbg290: ${segLib.gSegDbg.debugPoints.length}`);
		for (const seg2 of segStack) {
			if (seg2.sType === segLib.SegEnum.eStroke) {
				rContour.addSegStrokeA(seg2.p2.cx, seg2.p2.cy);
			} else if (seg2.sType === segLib.SegEnum.eArc) {
				const seg1 = segLib.arcSeg2To1(seg2);
				rContour
					.addPointA(seg2.p2.cx, seg2.p2.cy)
					.addSegArc(seg1.radius, seg1.arcLarge, seg1.arcCcw);
			} else {
				throw `err986: contour generateContour unexpected in seg2 Enum ${seg2.sType}`;
			}
		}
		return rContour;
	}
	generatePoints(): Point[] {
		const rPoints = [];
		rPoints.push(...this.debugPoints);
		const seg0 = this.segments[0];
		rPoints.push(point(seg0.px, seg0.py));
		let px1 = 0;
		let py1 = 0;
		for (const seg of this.segments) {
			if (seg.sType === segLib.SegEnum.eArc) {
				try {
					const seg2 = segLib.arcSeg1To2(px1, py1, seg);
					const p3 = point(seg2.pc.cx, seg2.pc.cy);
					const a12h = withinPiPi((seg2.a2 - seg2.a1) / 2);
					let a3 = seg2.a1 + a12h;
					if (
						(Math.sign(a12h) > 0 && !seg.arcCcw) ||
						(Math.sign(a12h) < 0 && seg.arcCcw)
					) {
						a3 += Math.PI;
					}
					const p4 = p3.translatePolar(a3, seg.radius);
					rPoints.push(p4);
				} catch (emsg) {
					console.log('err453: ' + (emsg as string));
				}
			}
			if (segLib.isAddPoint(seg.sType)) {
				px1 = seg.px;
				py1 = seg.py;
				rPoints.push(point(px1, py1));
			}
		}
		return rPoints;
	}
	generateLines(): Line[] {
		const rLines = [];
		rLines.push(...this.debugLines);
		return rLines;
	}
	/** @internal */
	checkContour(ctr: Contour) {
		if (ctr.segments[0].sType !== segLib.SegEnum.eStart) {
			throw `err412: contour check first seg is not eStart ${ctr.segments[0].sType}`;
		}
		let px1 = 0;
		let py1 = 0;
		for (const seg of ctr.segments) {
			if (seg.sType === segLib.SegEnum.eArc) {
				try {
					segLib.arcSeg1To2(px1, py1, seg);
				} catch (emsg) {
					throw `err778: ${emsg as string}`;
				}
			}
			if (segLib.isAddPoint(seg.sType)) {
				px1 = seg.px;
				py1 = seg.py;
			}
		}
		const px0 = ctr.segments[0].px;
		const py0 = ctr.segments[0].py;
		if (roundZero(px1 - px0) !== 0 || roundZero(py1 - py0) !== 0) {
			throw `err414: contour check, contour is not closed px ${px0} ${px1} py ${px0} ${py0}`;
		}
	}
	check(): string {
		segLib.gSegDbg.clearMsg();
		this.checkContour(this);
		const ctrG = this.generateContour();
		this.checkContour(ctrG);
		return segLib.gSegDbg.getMsg();
	}
	toSvg(yCeiling: number, color = ''): string {
		const sPath = svgPath();
		for (const seg of this.segments) {
			if (seg.sType === segLib.SegEnum.eStart) {
				sPath.addStart(seg.px, yCeiling - seg.py);
			} else if (seg.sType === segLib.SegEnum.eStroke) {
				sPath.addStroke(seg.px, yCeiling - seg.py);
			} else if (seg.sType === segLib.SegEnum.eArc) {
				sPath.addArc(seg.px, yCeiling - seg.py, seg.radius, seg.arcLarge, !seg.arcCcw);
			} else {
				console.log(`err631: contour.toSvg has unknown segment type ${seg.sType}`);
			}
		}
		const rSvg = sPath.stringify(color);
		return rSvg;
	}
	toDxfSeg(): DxfSeg[] {
		const rDxfSeg: DxfSeg[] = [];
		let px1 = 0;
		let py1 = 0;
		for (const seg of this.segments) {
			if (seg.sType === segLib.SegEnum.eStroke) {
				rDxfSeg.push(dxfSegLine(px1, py1, seg.px, seg.py));
			} else if (seg.sType === segLib.SegEnum.eArc) {
				try {
					const seg2 = segLib.arcSeg1To2(px1, py1, seg);
					rDxfSeg.push(
						dxfSegArc(seg2.pc.cx, seg2.pc.cy, seg.radius, seg2.a1, seg2.a2, seg2.arcCcw)
					);
				} catch (emsg) {
					console.log('err413: ' + (emsg as string));
				}
			}
			if (segLib.isAddPoint(seg.sType)) {
				px1 = seg.px;
				py1 = seg.py;
			}
		}
		return rDxfSeg;
	}
	toPax(): tPaxContourPath {
		const pPath = paxPath();
		for (const seg of this.segments) {
			if (seg.sType === segLib.SegEnum.eStart) {
				pPath.addStart(seg.px, seg.py);
			} else if (seg.sType === segLib.SegEnum.eStroke) {
				pPath.addStroke(seg.px, seg.py);
			} else if (seg.sType === segLib.SegEnum.eArc) {
				pPath.addArc(seg.px, seg.py, seg.radius, seg.arcLarge, seg.arcCcw);
			} else {
				console.log(`err709: contour.toPax has unknown segment type ${seg.sType}`);
			}
		}
		const rPaxC = pPath.toJson();
		return rPaxC;
	}
	getPerimeter(): number {
		let rPerimeter = 0;
		const ctrG = this.generateContour();
		let plx = 0;
		let ply = 0;
		for (const seg of ctrG.segments) {
			if (seg.sType === segLib.SegEnum.eStart) {
				plx = seg.px;
				ply = seg.py;
			} else if (seg.sType === segLib.SegEnum.eStroke) {
				const segLen = Math.sqrt((seg.px - plx) ** 2 + (seg.py - ply) ** 2);
				plx = seg.px;
				ply = seg.py;
				rPerimeter += segLen;
			} else if (seg.sType === segLib.SegEnum.eArc) {
				const seg2 = segLib.arcSeg1To2(plx, ply, seg);
				const daCcw = withinZero2Pi(seg2.a2 - seg2.a1);
				const da = seg2.arcCcw ? daCcw : withinZero2Pi(2 * Math.PI - daCcw);
				const segLen = seg.radius * da;
				plx = seg.px;
				ply = seg.py;
				rPerimeter += segLen;
			} else {
				console.log(`err760: contour.getPerimeter has unknown segment type ${seg.sType}`);
			}
		}
		return rPerimeter;
	}
}

/**
 * class `ContourCircle`
 *
 */

class ContourCircle extends AContour {
	circle = true;
	px: number;
	py: number;
	radius: number;
	imposedColor: string;
	constructor(ix: number, iy: number, iRadius: number, icolor = '') {
		super();
		this.px = ix;
		this.py = iy;
		this.radius = iRadius;
		this.imposedColor = icolor;
		if (iRadius < 0) {
			throw `err432: iRadius ${iRadius} is negative at circle ix ${ix}, iy ${iy}`;
		}
	}
	/** @internal */
	clone(): ContourCircle {
		const rctr = new ContourCircle(this.px, this.py, this.radius, this.imposedColor);
		return rctr;
	}
	translate(ix: number, iy: number): ContourCircle {
		const rctr = new ContourCircle(this.px + ix, this.py + iy, this.radius, this.imposedColor);
		return rctr;
	}
	translatePolar(ia: number, il: number): ContourCircle {
		return this.translate(il * Math.cos(ia), il * Math.sin(ia));
	}
	rotate(ix: number, iy: number, ia: number): ContourCircle {
		const ic = point(ix, iy);
		const nCenter = point(this.px, this.py).rotate(ic, ia);
		const rctr = new ContourCircle(nCenter.cx, nCenter.cy, this.radius, this.imposedColor);
		return rctr;
	}
	draw(ctx: CanvasRenderingContext2D, cAdjust: tCanvasAdjust, color: string = colors.contour) {
		const [cx3, cy3] = point2canvas(this.px, this.py, cAdjust);
		const cRadius = radius2canvas(this.radius, cAdjust);
		const theColor = this.imposedColor === '' ? color : this.imposedColor;
		ctx.beginPath();
		ctx.arc(cx3, cy3, cRadius, 0, 2 * Math.PI, true);
		ctx.strokeStyle = theColor;
		ctx.stroke();
	}
	extractSkeleton(): ContourCircle {
		const rContour = new ContourCircle(this.px, this.py, this.radius);
		return rContour;
	}
	generateContour(): ContourCircle {
		const rContour = new ContourCircle(this.px, this.py, this.radius, this.imposedColor);
		return rContour;
	}
	generatePoints(): Point[] {
		const rPoints = [];
		const p1 = point(this.px, this.py);
		rPoints.push(p1);
		for (let i = 0; i < 4; i++) {
			const p2 = p1.translatePolar((i * Math.PI) / 2, this.radius);
			rPoints.push(p2);
		}
		return rPoints;
	}
	generateLines(): Line[] {
		return [];
	}
	check(): string {
		return '';
	}
	toSvg(yCeiling: number, color = ''): string {
		const rSvg = svgCircleString(this.px, yCeiling - this.py, this.radius, color);
		return rSvg;
	}
	toDxfSeg(): DxfSeg[] {
		const rDxfSeg: DxfSeg[] = [];
		rDxfSeg.push(dxfSegCircle(this.px, this.py, this.radius));
		return rDxfSeg;
	}
	toPax(): tPaxContourCircle {
		const rPaxC = paxCircle(this.px, this.py, this.radius);
		return rPaxC;
	}
	getPerimeter(): number {
		const rPerimeter = 2 * Math.PI * this.radius;
		return rPerimeter;
	}
}

// instantiation functions
function contour(ix: number, iy: number, icolor = ''): Contour {
	return new Contour(ix, iy, icolor);
}
function contourCircle(ix: number, iy: number, iRadius: number, icolor = ''): ContourCircle {
	return new ContourCircle(ix, iy, iRadius, icolor);
}

type tContour = Contour | ContourCircle;

export type { tContour };
export { Contour, ContourCircle, contour, contourCircle };
