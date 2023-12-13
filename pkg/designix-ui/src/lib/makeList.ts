// makeList.ts

import type { tAllPageDef, tAllLink } from 'geometrix';
import { designList } from './designList';

function pathToLabel(ipath: string): string {
	const re = /^.*\//g;
	const rLabel = ipath.replace(re, '');
	return rLabel;
}

function makeAllLink(iDesignList: tAllPageDef): tAllLink {
	const rLink: tAllLink = {};
	for (const onePath of Object.keys(iDesignList)) {
		const partName = pathToLabel(onePath);
		rLink[partName] = `/${onePath}`;
	}
	return rLink;
}

function makeDesingNameList(iDesignList: tAllPageDef): string[] {
	const rDesignName: string[] = [];
	for (const onePath of Object.keys(iDesignList)) {
		rDesignName.push(onePath);
	}
	return rDesignName;
}

const allLink = makeAllLink(designList);
const designNameList = makeDesingNameList(designList);

export { designList, allLink, designNameList };
