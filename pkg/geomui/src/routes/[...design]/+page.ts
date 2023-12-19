// [design]/+page.js

import { designList, allLink } from '../makeList';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	//console.log(params);
	const designPath = params.design;
	//console.log(`dbg398: designPath ${designPath}`);
	if (Object.keys(designList).includes(designPath)) {
		const pageDef = designList[designPath];
		return {
			pageDef: pageDef,
			allLink: allLink
		};
	}
	error(404, 'Design undefined!');
}
