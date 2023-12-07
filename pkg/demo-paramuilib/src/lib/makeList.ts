// makeList.ts

import type { tAllLink } from 'geometrix';
import type { tDesignList } from './designListType';
import { designList } from '$lib/designList';

function pathToLabel(ipath: string): string {
	const re = /^.*\//g;
	let rLabel = ipath.replace(re, '');
	return rLabel;
}

function makeAllLink(iDesignList: tDesignList): tAllLink {
	const rLink: tAllLink = {};
	for (const onePath of Object.keys(iDesignList)) {
		const partName = pathToLabel(onePath);
		rLink[partName] = onePath;
	}
	return rLink;
}

function makeDesingNameList(iDesignList: tDesignList): string[] {
	const rDesignName: string[] = [];
	for (const onePath of Object.keys(iDesignList)) {
		rDesignName.push(onePath);
	}
	return rDesignName;
}

const allLink = makeAllLink(designList);
const designNameList = makeDesingNameList(designList);

export { allLink, designNameList };
