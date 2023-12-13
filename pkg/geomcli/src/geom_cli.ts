// geom_cli.ts

import type { tAllPageDef } from 'geometrix';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

function geom_cli(iArgs: string[], dList: tAllPageDef, outDir = 'output') {
	const argv = yargs(hideBin(iArgs))
		.scriptName('geom_cli')
		.usage('Usage: $0 options')
		.option('discoverDir', {
			alias: 'd',
			type: 'string',
			description: 'directory-path for searching git-repositories.',
			default: '.'
		})
		.strict()
		.parseSync();
	console.log(argv.discoverDir);
	console.log(Object.keys(dList)[0]);
	console.log(outDir);
}

export { geom_cli };
