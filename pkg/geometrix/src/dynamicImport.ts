// dynamicImport.ts

import type { tAllPageDef } from './aaParamGeom';

function checkImpPages(pages: tAllPageDef): [boolean, string] {
	let rMsg = '';
	let rError = false;
	const pageNames = Object.keys(pages);
	rMsg += `found ${pageNames.length} designs\n`;
	if (pageNames.length === 0) {
		rError = true;
	}
	const props = ['pTitle', 'pDescription', 'pDef', 'pGeom'];
	for (const pagN of pageNames) {
		//rMsg += `${pagN}\n`;
		const pag = pages[pagN];
		//for (const prop of Object.keys(pag)) {
		//	rMsg += `${prop}\n`;
		//}
		for (const prop of props) {
			if (!(prop in pag)) {
				rMsg += `err323: ${pagN} has no property ${prop}\n`;
				rError = true;
			}
		}
	}
	return [rError, rMsg];
}

export { checkImpPages };
