// geom_cli.ts

import type { tAllPageDef } from 'geometrix';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

function display_design_list(dList: tAllPageDef) {
	console.log('List of available designs:');
	for (const [idx, dname] of Object.keys(dList).entries()) {
		console.log(`${idx.toString().padStart(4, ' ')} : ${dname}`);
	}
}

function geom_cli(iArgs: string[], dList: tAllPageDef, outDir = 'output') {
	const argv = yargs(hideBin(iArgs))
		.scriptName('geom_cli')
		.usage('Usage: $0 <global-options> command <command-options>')
		.option('design', {
			alias: 'd',
			type: 'string',
			description: 'design to be used by the command',
			default: 'aaa'
		})
		.command('list', 'list the available designs', {}, () => {
			display_design_list(dList);
		})
		.strict()
		.parseSync();
	console.log(argv.$0);
	console.log(argv.design);
	console.log(Object.keys(dList)[0]);
	console.log(outDir);
}

export { geom_cli };
