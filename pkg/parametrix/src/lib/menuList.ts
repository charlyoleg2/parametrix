// menuList.ts

import {
	gearWheelWheelDef,
	simplifiedGearWheelDef,
	circlesDef,
	rectangleDef,
	verifyPoint1Def,
	verifyPoint2Def,
	verifyLine1Def,
	verifyLine2Def,
	verifyLine3Def,
	verifyVector1Def,
	verifyContour1Def,
	verifyContour2Def,
	verifyContour3Def,
	verifyContour4Def,
	verifyExports1Def
} from 'designix';
import type { tParamVal, tPageDef } from 'geometrix';
import type { tStorePVal } from '$lib/storePVal';
import { storePV } from '$lib/storePVal';
import { get, writable } from 'svelte/store';

type tAllPageDef = Record<string, tPageDef>;
type tIcon = Record<string, string>;
const designDefs: tAllPageDef = {
	gear_wheel_wheel: gearWheelWheelDef,
	simplified_gear_wheel: simplifiedGearWheelDef,
	circles: circlesDef,
	rectangle: rectangleDef,
	verify_point: verifyPoint1Def,
	verify_point_2: verifyPoint2Def,
	verify_line: verifyLine1Def,
	verify_line_2: verifyLine2Def,
	verify_line_3: verifyLine3Def,
	verify_vector: verifyVector1Def,
	verify_contour_1: verifyContour1Def,
	verify_contour_2: verifyContour2Def,
	verify_contour_3: verifyContour3Def,
	verify_contour_4: verifyContour4Def,
	verify_exports_1: verifyExports1Def
};

/* Create the Header Menu and Index Menu */
const mIndex = ['index'];
const mAbout = ['about'];
// to be updated when new pages are created
const mLabel = [
	{ category: 'Gears', pages: ['gear/gear_wheel_wheel', 'gear/simplified_gear_wheel'] },
	{ category: 'Junk designs', pages: ['junk/circles', 'junk/rectangle'] },
	{
		category: 'Geometrix verification',
		pages: [
			'dev/verify_point',
			'dev/verify_point_2',
			'dev/verify_line',
			'dev/verify_line_2',
			'dev/verify_line_3',
			'dev/verify_vector',
			'dev/verify_contour_1',
			'dev/verify_contour_2',
			'dev/verify_contour_3',
			'dev/verify_contour_4',
			'dev/verify_exports_1'
		]
	},
	{
		category: 'Docs',
		pages: [
			'docs/readme',
			'docs/concept',
			'docs/ui',
			'docs/geom_dev',
			'docs/geom_user',
			'docs/gears',
			'docs/involute',
			'docs/magnetic',
			'docs/axis',
			'docs/cad_ecosystem'
		]
	}
];
const mIcon: tIcon = {
	index: 'page_index.svg',
	gear_wheel_wheel: 'page_gears.svg',
	simplified_gear_wheel: 'page_gears.svg',
	circles: 'page_circles.svg',
	rectangle: 'page_rectangle.svg',
	verify_point: 'page_verify_point.svg',
	verify_point_2: 'page_verify_point.svg',
	verify_line: 'page_verify_line.svg',
	verify_line_2: 'page_verify_line.svg',
	verify_line_3: 'page_verify_line.svg',
	verify_vector: 'page_verify_line.svg',
	verify_contour_1: 'page_verify_line.svg',
	verify_contour_2: 'page_verify_line.svg',
	verify_contour_3: 'page_verify_line.svg',
	verify_contour_4: 'page_verify_line.svg',
	verify_exports_1: 'page_verify_line.svg',
	concept: 'page_concept.svg',
	ui: 'page_ui.svg',
	geom_dev: 'page_geom.svg',
	geom_user: 'page_geom.svg',
	gears: 'page_gears.svg',
	involute: 'page_gears.svg',
	magnetic: 'page_magnetic.svg',
	axis: 'page_axis.svg',
	cad_ecosystem: 'page_concept.svg',
	readme: 'page_readme.svg',
	about: 'page_about.svg'
};
// end of section to be updated

/* initialization storePV */
const iniPV: tStorePVal = {};
for (const design of Object.keys(designDefs)) {
	const designParam: tParamVal = {};
	for (const param of designDefs[design].pDef.params) {
		designParam[param.name] = param.init;
	}
	iniPV[design] = designParam;
}
storePV.set(iniPV);
/* end of initialization storePV */

type tPageList = string[];
interface tArrayLabel {
	category: string;
	pages: tPageList;
}
interface tMenuElem {
	path: string;
	label: string;
	svg: string;
}
type tMenu = tMenuElem[];
interface tMenuFull {
	menu: tMenu;
	category: string;
}
type tMenuFullList = tMenuFull[];

function oneMenu(menuName: string): tMenuElem {
	const re = /^.*\//g;
	const labelString = menuName.replace(re, '');
	//const svgString = menuName.replace(re, '');
	//const mSvg = `page_${svgString}.svg`; // svg file name convention
	const mSvg = mIcon[labelString]; // configured svg filename (i.e. no convention)
	let mPath = `/${menuName}`;
	if (mPath === '/index') {
		mPath = '/';
	}
	const rMenu: tMenuElem = {
		path: mPath,
		label: labelString,
		svg: mSvg
	};
	return rMenu;
}
class genMenu {
	memMenu: tPageList[];
	memCategory: string[];
	constructor(firstMenu: tArrayLabel) {
		this.memMenu = [];
		this.memMenu.push(firstMenu.pages);
		this.memCategory = [];
		this.memCategory.push(firstMenu.category);
	}
	push(iMenu: tArrayLabel) {
		this.memMenu.push(iMenu.pages);
		this.memCategory.push(iMenu.category);
	}
	makeMenuMenu(): tMenuFullList {
		const labelMenu: tPageList[] = [];
		for (const iMenu of this.memMenu) {
			labelMenu.push(mIndex.concat(iMenu, mAbout));
		}
		const rMenuMenu: tMenuFullList = [];
		for (const [idx, arr1] of labelMenu.entries()) {
			rMenuMenu.push({
				category: this.memCategory[idx],
				menu: arr1.map((menu: string) => oneMenu(menu))
			});
		}
		return rMenuMenu;
	}
	makeIndexMenu(): tMenuFullList {
		const labelMenu: tPageList[] = [];
		labelMenu.push(mIndex);
		for (const iMenu of this.memMenu) {
			labelMenu.push(iMenu);
		}
		labelMenu.push(mAbout);
		const rIndexMenu: tMenuFullList = [];
		for (const [idx, arr1] of labelMenu.entries()) {
			let category = '';
			if (idx > 0 && idx - 1 < this.memCategory.length) {
				category = this.memCategory[idx - 1];
			}
			rIndexMenu.push({
				category: category,
				menu: arr1.map((menu: string) => oneMenu(menu))
			});
		}
		return rIndexMenu;
	}
}

const oMenu = new genMenu(mLabel[0]);
for (let i = 1; i < mLabel.length; i++) {
	oMenu.push(mLabel[i]);
}

/* The Header Menu and Index Menu */
const menuMenu: tMenuFullList = oMenu.makeMenuMenu();
const indexMenu: tMenuFullList = oMenu.makeIndexMenu();

/* Managing the Header Menu */
// the variable to store the active menu
const storeMenu = writable(0);
function setMenu(iMenu: number): void {
	storeMenu.set(iMenu);
}
function getMenuMenu(): tMenuFull {
	const rMenuMenu = menuMenu[get(storeMenu)];
	//for (const menu of rMenuMenu) {
	//	console.log(`dbg065: ${menu.path}`);
	//}
	return rMenuMenu;
}
function getLabelPath(iMenu: tPageList): string[] {
	const rPath: string[] = [];
	for (const lItem of iMenu) {
		rPath.push(oneMenu(lItem).path);
	}
	return rPath;
}
function getMenuPath(iMenu: tMenu): string[] {
	const rPath: string[] = [];
	for (const lItem of iMenu) {
		rPath.push(lItem.path);
	}
	return rPath;
}
function findMenuMenu(iPath: string): tMenuFull {
	const univMenu = getLabelPath(mIndex.concat(mAbout)); // list of universal menus
	if (!univMenu.includes(iPath)) {
		for (const [lidx, lmenu] of menuMenu.entries()) {
			if (getMenuPath(lmenu.menu).includes(iPath)) {
				setMenu(lidx);
				//console.log(`dbg080: ${lidx}`);
				break;
			}
		}
	}
	return getMenuMenu();
}
function checkEmptyPath(iPath: string): string {
	let rPath = iPath;
	if (rPath === '') {
		rPath = '/';
	}
	return rPath;
}

export type { tMenuFull };
export { checkEmptyPath, findMenuMenu, indexMenu, designDefs };
