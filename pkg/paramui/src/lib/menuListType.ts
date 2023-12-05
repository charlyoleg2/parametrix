// menuListType.ts

import type { tPageDef } from 'geometrix';

interface tPageOne {
	path: string;
	page: tPageDef | null;
	svg: string;
	label?: string;
}

type tPageArray = tPageOne[];

interface tCategoryOne {
	category: string;
	pages: tPageArray;
}

type tMenuList = tCategoryOne[];

export type { tPageOne, tCategoryOne, tMenuList };
