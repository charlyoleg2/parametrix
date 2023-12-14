// geom_cli.ts

import type { tPageDef, tAllPageDef } from 'geometrix';
//import { EFormat, designParam, checkGeom, prefixLog } from 'geometrix';
import { PType, designParam, checkGeom } from 'geometrix';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { version } from '../package.json';

function list_designs(dList: tAllPageDef) {
	let rlog = 'List of available designs:\n';
	for (const [idx, dname] of Object.keys(dList).entries()) {
		rlog += `${idx.toString().padStart(4, ' ')} : ${dname}\n`;
	}
	console.log(rlog);
}

function selectDesign(dList: tAllPageDef, selD: string): tPageDef {
	if (!Object.keys(dList).includes(selD)) {
		console.log(`err918: design ${selD} is not defined`);
		process.exit(1);
	}
	return dList[selD];
}

function list_parameters(dList: tAllPageDef, selD: string) {
	const theD = selectDesign(dList, selD);
	let rlog = `List of parameters of the design ${selD} (${theD.pDef.partName}):\n`;
	const nameLength = 20;
	const unitLength = 8;
	const nameLabel = 'name'.padEnd(nameLength, ' ');
	const unitLabel = 'unit'.padEnd(unitLength, ' ');
	rlog += `   # : ${nameLabel} current ${unitLabel} init   min max step\n`;
	for (const [idx, pa] of theD.pDef.params.entries()) {
		const idx2 = idx.toString().padStart(4, ' ');
		const pname = pa.name.padEnd(nameLength, ' ');
		const punit = pa.unit.padEnd(unitLength, ' ');
		const pinit = pa.init.toString().padStart(6, ' ');
		switch (pa.pType) {
			case PType.eCheckbox:
				rlog += `${idx2} : ${pname} checkbox ${pa.init}\n`;
				break;
			case PType.eDropdown:
				rlog += `${idx2} : ${pname}`;
				for (const [optI, optN] of pa.dropdown.entries()) {
					rlog += ` ${optI}:${optN}`;
				}
				rlog += '\n';
				break;
			default:
				rlog += `${idx2} : ${pname} ${pinit} ${punit} ${pinit}   ${pa.min} ${pa.max} ${pa.step}\n`;
		}
	}
	console.log(rlog);
}

function list_figures(dList: tAllPageDef, selD: string) {
	const theD = selectDesign(dList, selD);
	let rlog = `List of figures of the design ${selD} (${theD.pDef.partName}):\n`;
	const dParam = designParam(theD.pDef);
	const simtime = 0;
	const dGeom = theD.pGeom(simtime, dParam.getParamVal());
	checkGeom(dGeom);
	//rlog += prefixLog(dGeom.logstr, dParam.partName);
	for (const [idx, figN] of Object.keys(dGeom.fig).entries()) {
		const idx2 = idx.toString().padStart(4, ' ');
		rlog += `${idx2} : ${figN}\n`;
	}
	console.log(rlog);
}

function list_subdesigns(dList: tAllPageDef, selD: string) {
	const theD = selectDesign(dList, selD);
	let rlog = `List of sub-designs of the design ${selD} (${theD.pDef.partName}):\n`;
	const dParam = designParam(theD.pDef);
	const simtime = 0;
	const dGeom = theD.pGeom(simtime, dParam.getParamVal());
	checkGeom(dGeom);
	//rlog += prefixLog(dGeom.logstr, dParam.partName);
	for (const [idx, subdN] of Object.keys(dGeom.sub).entries()) {
		const idx2 = idx.toString().padStart(4, ' ');
		const subd = dGeom.sub[subdN];
		const ori = `[ ${subd.orientation[0]}, ${subd.orientation[1]}, ${subd.orientation[2]}]`;
		const pos = `[ ${subd.position[0]}, ${subd.position[1]}, ${subd.position[2]}]`;
		const subdNp = subdN.padEnd(15, ' ');
		const subdPp = subd.partName.padEnd(15, ' ');
		rlog += `${idx2} : ${subdNp} ${subdPp}   orientation: ${ori}  position: ${pos}\n`;
	}
	console.log(rlog);
}

function geom_cli(iArgs: string[], dList: tAllPageDef, outDir = 'output') {
	const argv = yargs(hideBin(iArgs))
		.scriptName('geom_cli')
		.version(version)
		.usage('Usage: $0 <global-options> command <command-options>')
		.option('design', {
			alias: 'd',
			type: 'string',
			description: 'design to be used by the command',
			default: ''
		})
		.option('outDir', {
			alias: 'o',
			type: 'string',
			description: 'the path of the directory where to write the output files',
			default: outDir
		})
		.command(['list', 'list-designs'], 'list the available designs', {}, () => {
			list_designs(dList);
		})
		.command('list-parameters', 'list the parameters of the selected design', {}, (argv) => {
			//console.log(argv)
			list_parameters(dList, argv.design as string);
		})
		.command('list-figures', 'list the figures of the selected design', {}, (argv) => {
			//console.log(argv)
			list_figures(dList, argv.design as string);
		})
		.command('list-subdesigns', 'list the subdesigns of the selected design', {}, (argv) => {
			//console.log(argv)
			list_subdesigns(dList, argv.design as string);
		})
		.strict()
		.parseSync();
	//console.log(argv.$0);
	//console.log(argv.design);
	console.log(argv.outDir);
	//console.log(argv);
}

export { geom_cli };
