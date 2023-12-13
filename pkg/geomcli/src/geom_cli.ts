// geom_cli.ts

import type { tAllPageDef } from 'geometrix';

function geom_cli(iArgs: string[], dList: tAllPageDef, outDir = 'output') {
	console.log(iArgs[0]);
	console.log(Object.keys(dList)[0]);
	console.log(outDir);
}

export { geom_cli };
