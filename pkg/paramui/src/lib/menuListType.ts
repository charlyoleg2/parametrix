// menuListType.ts

import type { tPageDef } from 'geometrix';

interface tPageOne {
	path: string;
	page: tPageDef;
	svg: string;
	label?: string;
}

interface tPageArray {
	[index: number]: tPageOne;
}

interface tCategoryOne {
	category: string;
	pages: tPageArray;
}

interface tMenuList {
	[index: number]: tCategoryOne;
}

export type { tPageOne, tCategoryOne, tMenuList };
