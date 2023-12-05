// makeMenu.ts

import type { tAllPageDef } from 'geometrix';
import type { tPageOne, tCategoryOne, tMenuList } from './menuListType';
import { menuList } from './menuList';
//import { get, writable } from 'svelte/store';

function pathToLabel(ipath: string): string {
	const re = /^.*\//g;
	const rLabel = ipath.replace(re, '');
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
			}
		}
	}
	return rDesignDefs;
}

function checkEmptyPath(iPath: string): string {
	let rPath = iPath;
	if (rPath === '') {
		rPath = '/';
	}
	return rPath;
}

function findTheCategorySub(iMenu: tMenuList, ipath: string): tCategoryOne {
	let categIdx = 0;
	for (const [idx, categ] of iMenu.entries()) {
		for (const pag of categ.pages) {
			if (ipath === pag.path) {
				categIdx = idx;
			}
		}
	}
	const categ1 = iMenu[categIdx];
	const rCateg: tCategoryOne = { category: categ1.category, pages: [] };
	for (const pag of categ1.pages) {
		const pag2: tPageOne = {
			path: pag.path,
			page: pag.page,
			svg: pag.svg,
			label: pathToLabel(pag.path)
		};
		rCateg.pages.push(pag2);
	}
	return rCateg;
}

function findTheCategory(ipath: string): tCategoryOne {
	const rCateg = findTheCategorySub(menuList, ipath);
	return rCateg;
}

const menuList2 = makeMenuList2(menuList);
const designDefs = makeDesignDefs(menuList);

export { checkEmptyPath, findTheCategory, menuList2, designDefs };
