// [design]/+page.js

import { designDefs, allLink } from '$lib/makeMenu';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	//console.log(params);
	const re = /^.*\//g;
	const short = params.design.replace(re, '');
	//const re2 = new RegExp(`/*${short}/*`);
	//const category = params.design.replace(re2, '');
	if (Object.keys(designDefs).includes(short)) {
		const pDef_page = designDefs[short].pDef.partName;
		if (pDef_page !== short) {
			error(500, `pDef.partName ${pDef_page} does not fit with short ${short}`);
		}
		return {
			pageDef: designDefs[short],
			allLink: allLink
			//category: category
		};
	}
	error(404, 'Design undefined!');
}
