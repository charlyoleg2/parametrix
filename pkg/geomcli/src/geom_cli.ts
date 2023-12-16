// geom_cli.ts

import type {
	tSubDesign,
	tPageDef,
	tAllPageDef,
	tDesignParamList,
	tParamVal,
	tParamValInFile
} from 'geometrix';
import { c_ParametrixAll, PType, EFormat, designParam, checkGeom, prefixLog } from 'geometrix';
import { geom_write, write_textFile2 } from './geom_write';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { version } from '../package.json';

function get_design_array(dList: tAllPageDef): string[] {
	const rDesignArray = Object.keys(dList);
	return rDesignArray;
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

function get_subd_parameters(
	dList: tAllPageDef,
	selD: string,
	subdN: string,
	printLog: boolean
): tDesignParamList {
	const theD = selectDesign(dList, selD);
	let rlog = `Subdesign ${subdN} of ${selD} (${theD.pDef.partName}):\n`;
	const dParam = designParam(theD.pDef);
	const simtime = 0;
	const dGeom = theD.pGeom(simtime, dParam.getParamVal());
	checkGeom(dGeom);
	rlog += prefixLog(dGeom.logstr, dParam.partName);
	if (!Object.keys(dGeom.sub).includes(subdN)) {
		console.log(`err207: sub-design ${subdN} not defined in partName ${theD.pDef.partName}`);
		process.exit(1);
	}
	const rSubdParams = dGeom.sub[subdN].dparam;
	if (printLog) {
		console.log(rlog);
	}
	return rSubdParams;
}

const c_fileFormat = [
	'json_param',
	'svg_all_figures',
	'dxf_all_figures',
	'pax_all',
	'scad_3d_openscad',
	'js_3d_openjscad',
	'zip_all'
];

function get_outopt_array(dList: tAllPageDef, selD: string): string[] {
	const rOutOpt: string[] = [];
	const figN = get_figure_array(dList, selD);
	const subdN = Object.keys(get_subdesign_array(dList, selD));
	for (const figNi of figN) {
		rOutOpt.push(`svg_${figNi}`);
	}
	for (const figNi of figN) {
		rOutOpt.push(`dxf_${figNi}`);
	}
	for (const subdNi of subdN) {
		rOutOpt.push(`json_sub_param_${subdNi}`);
	}
	for (const ffi of c_fileFormat) {
		rOutOpt.push(`${ffi}`);
	}
	return rOutOpt;
}

enum EWrite {
	eEGOPARAMS,
	eSUBDPARAMS,
	eOTHERS
}

interface tEFormat {
	eWrite: EWrite;
	eFormat: EFormat;
	eFace: string;
	eSubdesign: string;
}

function decompose_outopt(outopt: string): tEFormat {
	let rWrite = EWrite.eOTHERS;
	let rFormat = EFormat.ePAX;
	let rFace = c_ParametrixAll;
	let rSubD = '';
	const reSvg = /^svg_/;
	const reDxf = /^dxf_/;
	const reSubP = /^json_sub_param_/;
	if (outopt.match(reSvg)) {
		rFace = outopt.replace(reSvg, '');
		rFormat = EFormat.eSVG;
		rWrite = EWrite.eOTHERS;
	} else if (outopt.match(reDxf)) {
		rFace = outopt.replace(reDxf, '');
		rFormat = EFormat.eDXF;
		rWrite = EWrite.eOTHERS;
	} else if (outopt.match(reSubP)) {
		rSubD = outopt.replace(reSubP, '');
		rWrite = EWrite.eSUBDPARAMS;
	} else {
		switch (outopt) {
			case 'json_param':
				rWrite = EWrite.eEGOPARAMS;
				break;
			case 'svg_all_figures':
				rFace = c_ParametrixAll;
				rFormat = EFormat.eSVG;
				rWrite = EWrite.eOTHERS;
				break;
			case 'dxf_all_figures':
				rFace = c_ParametrixAll;
				rFormat = EFormat.eDXF;
				rWrite = EWrite.eOTHERS;
				break;
			case 'pax_all':
				rFormat = EFormat.ePAX;
				rWrite = EWrite.eOTHERS;
				break;
			case 'scad_3d_openscad':
				rFormat = EFormat.eOPENSCAD;
				rWrite = EWrite.eOTHERS;
				break;
			case 'js_3d_openjscad':
				rFormat = EFormat.eJSCAD;
				rWrite = EWrite.eOTHERS;
				break;
			case 'zip_all':
				rFormat = EFormat.eZIP;
				rWrite = EWrite.eOTHERS;
				break;
			default:
				rFormat = EFormat.ePAX;
				rWrite = EWrite.eOTHERS;
		}
	}
	const eFormat: tEFormat = { eWrite: rWrite, eFormat: rFormat, eFace: rFace, eSubdesign: rSubD };
	return eFormat;
}

function list_designs(dList: tAllPageDef, detail: boolean) {
	let rlog = 'List of available designs:\n';
	for (const [idx, dname] of get_design_array(dList).entries()) {
		rlog += `${idx.toString().padStart(4, ' ')} : ${dname}\n`;
		if (detail) {
			rlog += `        ${dList[dname].pDef.partName}\n`;
			rlog += `        ${dList[dname].pTitle}\n`;
			rlog += `        ${dList[dname].pDescription}\n`;
		}
	}
	console.log(rlog);
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
				rlog += `${idx2} : ${pname} checkbox ${pa.init}   ${pa.init}\n`;
				break;
			case PType.eDropdown:
				rlog += `${idx2} : ${pname} ${pa.init}   ${pa.init}`;
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
	const subdParam = get_subd_parameters(dList, selD, subdN, true);
	const nameLength = 20;
	const nameLabel = 'name'.padEnd(nameLength, ' ');
	let rlog = `   # : ${nameLabel} value init changed\n`;
	for (const [idx, ipaN] of Object.keys(subdParam).entries()) {
		const idx2 = idx.toString().padStart(4, ' ');
		const paN = ipaN.padEnd(nameLength, ' ');
		const pa = subdParam[ipaN];
		const paVal = pa.val.toString().padStart(6, ' ');
		const paInit = pa.init.toString().padStart(6, ' ');
		rlog += `${idx2} : ${paN} ${paVal} ${paInit} ${pa.chg ? 'changed' : ''}\n`;
	}
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

function list_outopt(dList: tAllPageDef, selD: string) {
	const dPartName = selectDesignN(dList, selD);
	let rlog = `List of outputs of the design ${selD} (${dPartName}):\n`;
	const outOpt = get_outopt_array(dList, selD);
	for (const [idx, oneOpt] of outOpt.entries()) {
		const idx2 = idx.toString().padStart(4, ' ');
		rlog += `${idx2} : ${oneOpt}\n`;
	}
	console.log(rlog);
}

function writeParams(
	iPartName: string,
	idparams: tParamVal,
	oDir: string,
	oFileName: string
): string {
	const re1 = /[-:]/g;
	const re2 = /\..*$/;
	const datestr = new Date().toISOString().replace(re1, '').replace(re2, '').replace('T', '_');
	let file_name = `px_${iPartName}_${datestr}.json`;
	if (oFileName !== '') {
		file_name = oFileName;
	}
	const paramNb = Object.keys(idparams).length;
	let rlog = `Write file ${file_name} in directory ${oDir} containing ${paramNb} params\n`;
	const allVal: tParamValInFile = { lastModif: datestr, pVal: idparams, comment: 'Written by geom_cli' };
	const file_content = JSON.stringify(allVal, null, '  ');
	rlog += write_textFile2(oDir, file_name, file_content);
	return rlog;
}

let cmd_write = false;
async function geom_cli(iArgs: string[], dList: tAllPageDef, outDir = 'output') {
	const argv = yargs(hideBin(iArgs))
		.scriptName('geom_cli')
		.version(version)
		.usage('Usage: $0 <global-options> command <command-argument>')
		.example([
			['$0 list-designs', 'list the available designs'],
			['$0 list-designs-detailed', 'list the available designs with detailed information'],
			['$0 -d heliostat/rake compute-log', 'compute and print the log'],
			['$0 -d heliostat/swing list-outopt', 'list possible output-format-options'],
			['$0 -d heliostat/rod write zip_all', 'write a zip file']
		])
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
			'list-outopt',
			'list the possible output format options of the selected design',
			{},
			(argv) => {
				list_outopt(dList, argv.design as string);
			}
		)
		.command('write <outopt>', 'write the output format file', {}, () => {
			cmd_write = true;
		})
		.demandCommand(1)
		.help()
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
			const outopt = argv.outopt as string;
			const theD = selectDesign(dList, selD);
			// check if outopt is valid
			const outOpt = get_outopt_array(dList, selD);
			if (!outOpt.includes(outopt)) {
				console.log(`err639: outopt ${outopt} is not a valid option`);
				process.exit(1);
			}
			// end of check of outopt
			let rlog = `Write ${outopt} of ${selD} (${theD.pDef.partName}):\n`;
			const oOpt = decompose_outopt(outopt);
			const dParam = designParam(theD.pDef);
			const simtime = 0;
			const dGeom = theD.pGeom(simtime, dParam.getParamVal());
			checkGeom(dGeom);
			rlog += prefixLog(dGeom.logstr, dParam.partName);
			if (oOpt.eWrite === EWrite.eEGOPARAMS) {
				rlog += writeParams(
					dParam.partName,
					dParam.getParamVal(),
					iOutDir,
					argv.outFileName
				);
			} else if (oOpt.eWrite === EWrite.eSUBDPARAMS) {
				rlog += `Write subd-params of ${oOpt.eSubdesign}`;
			} else {
				rlog += await geom_write(
					dParam.partName,
					theD.pGeom,
					simtime,
					dParam.getParamVal(),
					oOpt.eFormat, // output-format
					//EFormat.eSVG,
					//EFormat.eDXF,
					//EFormat.ePAX,
					//EFormat.eOPENSCAD,
					//EFormat.eJSCAD,
					//EFormat.eZIP,
					oOpt.eFace, // selected-2d-face
					iOutDir, // output-directory
					argv.outFileName // output-filename
				);
			}
			console.log(rlog);
		} else {
			console.log("err638: option 'outDir' is set to empty string. Nothing written!");
		}
	}
}

export { geom_cli };