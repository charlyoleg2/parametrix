// makeMenu.ts

import type { tAllPageDef } from 'geometrix';
import type { tPageOne, tCategoryOne, tMenuList } from './menuListType';
import { menuList } from './menuList';
//import { get, writable } from 'svelte/store';

function pathToLabel(ipath: string): string {
	const re = /^.*\//g;
	let rLabel = ipath.replace(re, '');
	if (rLabel === '') {
		rLabel = 'index';
	}
	return rLabel;
}

function makeMenuList2(iMenu: tMenuList): tMenuList {
	const rMenu: tMenuList = [];
	for (const categ of iMenu) {
		const categ2: tCategoryOne = { category: categ.category, pages: [] };
		for (const pag of categ.pages) {
			const pag2: tPageOne = {
				path: pag.path,
				page: pag.page,
				svg: pag.svg,
				label: pathToLabel(pag.path)
			};
			categ2.pages.push(pag2);
		}
		rMenu.push(categ2);
	}
	return rMenu;
}

function makeDesignDefs(iMenu: tMenuList): tAllPageDef {
	const rDesignDefs: tAllPageDef = {};
	for (const categ of iMenu) {
		for (const pag of categ.pages) {
			if (pag.page != null) {
				const label = pathToLabel(pag.path);
				rDesignDefs[label] = pag.page;
				//console.log(`dbg939: label: ${label}`);
			}
		}
	}
	return rDesignDefs;
}

function checkIndexPath(iPath: string): string {
	//console.log(`dbg518: ${iPath}`);
	let rpath = iPath;
	if ((rpath === '/index') || (rpath === '/index.html')) {
		rpath = '/';
		//console.log(`dbg565: ${rpath}`);
	}
	return rpath;
}
function checkEmptyPath(iPath: string): string {
	let rPath = iPath;
	if (rPath === '') {
		rPath = '/';
	}
	return rPath;
}
function checkPath(iPath: string): string {
	let rPath = iPath;
	rPath = checkEmptyPath(rPath);
	rPath = checkIndexPath(rPath);
	return rPath;
}

// create contextual-top-menu
const pageIndex: tPageOne = { path: '/', page: null, svg: 'page_index.svg', label: 'index' };
const pageAbout: tPageOne = { path: '/about', page: null, svg: 'page_about.svg', label: 'about' };
const categ0: tCategoryOne = { category: '', pages: [pageIndex, pageAbout] };
function listOneCategorySub(iMenu: tMenuList, ipath: string): tCategoryOne {
	//console.log(`dbg572: ${ipath}`);
	let spath = checkIndexPath(ipath);
	let categIdx = 0;
	lookForCategory:
	for (const [idx, categ] of iMenu.entries()) {
		for (const pag of categ.pages) {
			if (spath === pag.path) {
				categIdx = idx;
				break lookForCategory;
			}
		}
	}
	// exception index and about
	let rCateg = categ0;
	if ((categIdx > 0) && (categIdx < iMenu.length - 1)) {
		const categ1 = iMenu[categIdx];
		rCateg = { category: categ1.category, pages: [] };
		rCateg.pages.push(pageIndex);
		for (const pag of categ1.pages) {
			const pag2: tPageOne = {
				path: pag.path,
				page: pag.page,
				svg: pag.svg,
				label: pathToLabel(pag.path)
			};
			rCateg.pages.push(pag2);
		}
		//rCateg.pages.push(pageAbout);
	}
	return rCateg;
}

function listOneCategory(ipath: string): tCategoryOne {
	const rCateg = listOneCategorySub(menuList, ipath);
	return rCateg;
}

const menuList2 = makeMenuList2(menuList);
const designDefs = makeDesignDefs(menuList);

export { checkPath, listOneCategory, menuList2, designDefs };
