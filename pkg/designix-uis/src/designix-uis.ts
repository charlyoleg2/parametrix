// localpoc.ts

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'node:fs';
import process from 'node:process';
import express from 'express';
import open from 'open';
import getport from 'get-port';

import packag from '../package.json';

const scrDir = import.meta.dirname;

// sub-routines
function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mini_server(aDirectory: string, aBrowser: boolean, aPort: number) {
	const chost = '127.0.0.1';

	// sanity checks for aDirectory
	if (aDirectory !== '') {
		if (!fs.existsSync(aDirectory)) {
			console.error(`ERR339: Error, the path ${aDirectory} doesn't exist!`);
			process.exit(-1);
		}
	}

	// port-number logic
	let portnumber = aPort;
	if (portnumber === 0) {
		portnumber = await getport();
	}

	// the main
	const app = express();

	// static content
	if (aDirectory !== '') {
		app.use(express.static(aDirectory));
	}

	// spin the http-server
	app.listen(portnumber, chost, () => {
		console.log(
			`${packag.name} serves on port ${portnumber} for host ${chost} the directory ${aDirectory} ...`
		);
	});

	// open the browser
	await sleep(1000);
	const url = `http://localhost:${portnumber}`;
	if (aBrowser) {
		console.log(`Your browser should open automatically at ${url}`);
		await open(url);
	} else {
		console.log(`Please, open the browser at ${url}`);
	}

	// final message
	console.log('Press ctrl-c to stop this http-server ...');
}

// cli
async function mini_cli(argv: string[]) {
	const args = await yargs(hideBin(argv))
		.version('0.2.0')
		.usage('Usage: $0 --port <port> --directoy <directory-path>')
		.example([
			[
				'$0 -p 2022 -d MyPublic',
				'run the webserver on port 2022 and serve the content of the folder MyPublic'
			]
		])
		.option('directory', {
			alias: 'd',
			type: 'string',
			description: 'path to the directory to be served.',
			//default: `${__dirname}/webui`,
			default: `${scrDir}/public`
		})
		.option('browser', {
			alias: 'b',
			type: 'boolean',
			description: 'Open the browser at the corresponding URL.',
			default: true
		})
		.option('port', {
			alias: 'p',
			type: 'number',
			description:
				'port-number used by this web-server. If set to 0 an available port-number is automatically selected',
			default: 0
		})
		.strict()
		.parseAsync();

	await mini_server(args.directory, args.browser, args.port);
}

console.log('designix-uis says Hello!');
mini_cli(process.argv);
console.log('designix-uis says Bye!');
