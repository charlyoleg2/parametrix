// geom_cli.ts

import type { tSubDesign, tPageDef, tAllPageDef } from 'geometrix';
import { PType, EFormat, designParam, checkGeom, prefixLog } from 'geometrix';
import { geom_write } from './geom_write';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { version } from '../package.json';

function list_designs(dList: tAllPageDef, detail: boolean) {
	let rlog = 'List of available designs:\n';
	for (const [idx, dname] of Object.keys(dList).entries()) {
		rlog += `${idx.toString().padStart(4, ' ')} : ${dname}\n`;
		if (detail) {
			rlog += `        ${dList[dname].pDef.partName}\n`;
			rlog += `        ${dList[dname].pTitle}\n`;
			rlog += `        ${dList[dname].pDescription}\n`;
		}
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

function selectDesignN(dList: tAllPageDef, selD: string): string {
	const theD = selectDesign(dList, selD);
	const dName = theD.pDef.partName;
	return dName;
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

function get_figure_array(dList: tAllPageDef, selD: string): string[] {
	//let rlog = `Get figure array of the design ${selD} (${theD.pDef.partName}):\n`;
	const theD = selectDesign(dList, selD);
	const dParam = designParam(theD.pDef);
	const simtime = 0;
	const dGeom = theD.pGeom(simtime, dParam.getParamVal());
	checkGeom(dGeom);
	//rlog += prefixLog(dGeom.logstr, dParam.partName);
	const rfigN = Object.keys(dGeom.fig);
	//console.log(rlog);
	return rfigN;
}

function get_subdesign_array(dList: tAllPageDef, selD: string): tSubDesign {
	const theD = selectDesign(dList, selD);
	//let rlog = `Get sub-design  array of the design ${selD} (${theD.pDef.partName}):\n`;
	const dParam = designParam(theD.pDef);
	const simtime = 0;
	const dGeom = theD.pGeom(simtime, dParam.getParamVal());
	checkGeom(dGeom);
	//rlog += prefixLog(dGeom.logstr, dParam.partName);
	const subd = dGeom.sub;
	//console.log(rlog);
	return subd;
}

function list_figures(dList: tAllPageDef, selD: string) {
	const dPartName = selectDesignN(dList, selD);
	const figN = get_figure_array(dList, selD);
	let rlog = `List of figures of the design ${selD} (${dPartName}):\n`;
	for (const [idx, figNi] of figN.entries()) {
		const idx2 = idx.toString().padStart(4, ' ');
		rlog += `${idx2} : ${figNi}\n`;
	}
	console.log(rlog);
}

function list_subdesigns(dList: tAllPageDef, selD: string) {
	const dPartName = selectDesignN(dList, selD);
	const subdA = get_subdesign_array(dList, selD);
	const subdN = Object.keys(subdA);
	let rlog = `List of sub-designs of the design ${selD} (${dPartName}):\n`;
	for (const [idx, subdNi] of subdN.entries()) {
		const idx2 = idx.toString().padStart(4, ' ');
		const subd = subdA[subdNi];
		const ori = `[ ${subd.orientation[0]}, ${subd.orientation[1]}, ${subd.orientation[2]}]`;
		const pos = `[ ${subd.position[0]}, ${subd.position[1]}, ${subd.position[2]}]`;
		const subdNp = subdNi.padEnd(15, ' ');
		const subdPp = subd.partName.padEnd(15, ' ');
		rlog += `${idx2} : ${subdNp} ${subdPp}   orientation: ${ori}  position: ${pos}\n`;
	}
	console.log(rlog);
}

function list_subd_parameters(dList: tAllPageDef, selD: string, subdN: string) {
	const theD = selectDesign(dList, selD);
	let rlog = `Subdesign ${subdN} of ${selD} (${theD.pDef.partName}):\n`;
	rlog += 'TODO\n';
	console.log(rlog);
}

function compute_log(dList: tAllPageDef, selD: string) {
	const theD = selectDesign(dList, selD);
	let rlog = `Compute design ${selD} (${theD.pDef.partName}):\n`;
	const dParam = designParam(theD.pDef);
	const simtime = 0;
	const dGeom = theD.pGeom(simtime, dParam.getParamVal());
	//checkGeom(dGeom);
	rlog += prefixLog(dGeom.logstr, dParam.partName);
	if (dGeom.calcErr) {
		rlog += `err907: Error while computing ${theD.pDef.partName}\n`;
	} else {
		rlog += `${theD.pDef.partName} successfully computed\n`;
	}
	console.log(rlog);
}

function lS(idx: number): string {
	const idx2 = idx.toString().padStart(4, ' ');
	const rStr = `${idx2} : `;
	return rStr;
}

function list_outputs(dList: tAllPageDef, selD: string) {
	const dPartName = selectDesignN(dList, selD);
	const figN = get_figure_array(dList, selD);
	const subdN = Object.keys(get_subdesign_array(dList, selD));
	let rlog = `List of outputs of the design ${selD} (${dPartName}):\n`;
	let idx = 0;
	for (const figNi of figN) {
		idx += 1;
		rlog += `${lS(idx)}svg_${figNi}\n`;
	}
	for (const figNi of figN) {
		idx += 1;
		rlog += `${lS(idx)}dxf_${figNi}\n`;
	}
	for (const subdNi of subdN) {
		idx += 1;
		rlog += `${lS(idx)}json_sub_param_${subdNi}\n`;
	}
	const fileFormat = [
		'json_param',
		'svg_all_figures',
		'dxf_all_figures',
		'pax_all',
		'scad_3d_openscad',
		'js_3d_openjscad',
		'zip_all'
	];
	for (const ffi of fileFormat) {
		idx += 1;
		rlog += `${lS(idx)}${ffi}\n`;
	}
	console.log(rlog);
}

let cmd_write = false;
async function geom_cli(iArgs: string[], dList: tAllPageDef, outDir = 'output') {
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
		.option('outFileName', {
			type: 'string',
			description: 'Rename the output filename',
			default: ''
		})
		.command(['list-designs', 'list'], 'list the available designs', {}, () => {
			list_designs(dList, false);
		})
		.command('list-designs-detailed', 'list the available designs with details', {}, () => {
			list_designs(dList, true);
		})
		.command('list-parameters', 'list the parameters of the selected design', {}, (argv) => {
			//console.log(argv)
			list_parameters(dList, argv.design as string);
		})
		.command('list-figures', 'list the figures of the selected design', {}, (argv) => {
			list_figures(dList, argv.design as string);
		})
		.command('list-subdesigns', 'list the subdesigns of the selected design', {}, (argv) => {
			list_subdesigns(dList, argv.design as string);
		})
		.command(
			'list-subd-parameters <subdN>',
			'list the parameters of subdesigns',
			{},
			(argv) => {
				list_subd_parameters(dList, argv.design as string, argv.subdN as string);
			}
		)
		.command('compute-log', 'Compute and print the log without writing file', {}, (argv) => {
			compute_log(dList, argv.design as string);
		})
		.command(
			'list-oformat',
			'list the possible output formats of the selected design',
			{},
			(argv) => {
				list_outputs(dList, argv.design as string);
			}
		)
		.command('write <oformat>', 'write the output format file', {}, () => {
			cmd_write = true;
		})
		.strict()
		.parseSync();
	//console.log(argv.$0);
	//console.log(argv.design);
	//console.log(argv.outDir);
	//console.log(argv);
	if (cmd_write) {
		const iOutDir = argv.outDir;
		if (iOutDir !== '') {
			const selD = argv.design;
			const oformat = argv.oformat as string;
			const theD = selectDesign(dList, selD);
			let rlog = `Write ${oformat} of ${selD} (${theD.pDef.partName}):\n`;
			const dParam = designParam(theD.pDef);
			const simtime = 0;
			const dGeom = theD.pGeom(simtime, dParam.getParamVal());
			checkGeom(dGeom);
			rlog += prefixLog(dGeom.logstr, dParam.partName);
			rlog += await geom_write(
				dParam.partName,
				theD.pGeom,
				simtime,
				dParam.getParamVal(),
				//EFormat.ePARAMS, // output-format
				//EFormat.eSVG,
				//EFormat.eDXF,
				//EFormat.ePAX,
				//EFormat.eOPENSCAD,
				//EFormat.eJSCAD,
				EFormat.eZIP,
				'', // selected-2d-face
				//'faceSide',
				//'faceFace',
				//'faceTop',
				iOutDir, // output-directory
				argv.outFileName // output-filename
			);
			console.log(rlog);
		} else {
			console.log("err638: option 'outDir' is set to empty string. Nothing written!");
		}
	}
}

export { geom_cli };
