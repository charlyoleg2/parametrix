// geom_cli.ts

import type {
	tParamVal,
	tGeom,
	tSubDesign,
	tPageDef,
	tAllPageDef,
	tSubInst,
	tPackage
} from 'geometrix';
import { PType, EFormat, designParam, prefixLog, paramListToVal, version_details } from 'geometrix';
import { geom_write, writeParams, readParams } from './geom_write';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
//import { version } from '../package.json';

function print_version_details(appPackage: tPackage) {
	const rStr = version_details(appPackage);
	console.log(rStr);
}

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

function parseModif(modif: string[], printLog: boolean): tParamVal {
	const pVal: tParamVal = {};
	const arrayLen = modif.length;
	if (arrayLen % 2 === 1) {
		throw `err903: length ${arrayLen} of modif string array is odd!`;
	}
	for (let i = 0; i < arrayLen / 2; i++) {
		const valStr = modif[2 * i + 1];
		const val = parseFloat(valStr);
		if (isNaN(val)) {
			throw `err908: ${valStr} is not a number!`;
		}
		pVal[modif[2 * i]] = val;
	}
	const pValLen = Object.keys(pVal).length;
	if (printLog && pValLen > 0) {
		const rlog = `info308: ${pValLen} parameters of modifier`;
		console.log(rlog);
	}
	return pVal;
}

function computeGeom(
	dList: tAllPageDef,
	selD: string,
	paramPath: string,
	modif: string[],
	printLog: boolean
): tGeom {
	const theD = selectDesign(dList, selD);
	let rlog = `Compute design ${selD} (${theD.pDef.partName}):\n`;
	const dParam = designParam(theD.pDef);
	try {
		dParam.applyParamVal(readParams(paramPath, printLog));
		dParam.applyParamVal(parseModif(modif, printLog));
	} catch (emsg) {
		console.log('err271: error while applying new parameters');
		console.log(emsg);
		process.exit(1);
	}
	const simtime = 0;
	const dGeom = theD.pGeom(simtime, dParam.getParamVal());
	//checkGeom(dGeom);
	rlog += prefixLog(dGeom.logstr, dParam.partName);
	if (dGeom.calcErr) {
		rlog += `err907: Error while computing ${theD.pDef.partName}\n`;
		console.log(rlog);
		process.exit(1);
	} else {
		rlog += `${theD.pDef.partName} successfully computed\n`;
	}
	if (printLog) {
		console.log(rlog);
	}
	return dGeom;
}

function get_figure_array(
	dList: tAllPageDef,
	selD: string,
	paramPath: string,
	modif: string[]
): string[] {
	const dGeom = computeGeom(dList, selD, paramPath, modif, false);
	const rfigN = Object.keys(dGeom.fig);
	return rfigN;
}

function get_subdesign_array(
	dList: tAllPageDef,
	selD: string,
	paramPath: string,
	modif: string[]
): tSubDesign {
	const dGeom = computeGeom(dList, selD, paramPath, modif, false);
	const subd = dGeom.sub;
	return subd;
}

function get_subd(
	dList: tAllPageDef,
	selD: string,
	subdN: string,
	paramPath: string,
	modif: string[],
	printLog: boolean
): tSubInst {
	const theD = selectDesign(dList, selD);
	const dGeom = computeGeom(dList, selD, paramPath, modif, printLog);
	if (!Object.keys(dGeom.sub).includes(subdN)) {
		console.log(`err207: sub-design ${subdN} not defined in partName ${theD.pDef.partName}`);
		process.exit(1);
	}
	const rSubd = dGeom.sub[subdN];
	if (printLog) {
		const rlog = `Subdesign ${subdN} (${rSubd.partName}) of ${selD} (${theD.pDef.partName}):\n`;
		console.log(rlog);
	}
	return rSubd;
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

function get_outopt_array(
	dList: tAllPageDef,
	selD: string,
	paramPath: string,
	modif: string[]
): string[] {
	const rOutOpt: string[] = [];
	const figN = get_figure_array(dList, selD, paramPath, modif);
	const subdN = Object.keys(get_subdesign_array(dList, selD, paramPath, modif));
	for (const figNi of figN) {
		rOutOpt.push(`svg__${figNi}`);
	}
	for (const figNi of figN) {
		rOutOpt.push(`dxf__${figNi}`);
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
	let rFace = 'all';
	let rSubD = '';
	const reSvg = /^svg__/;
	const reDxf = /^dxf__/;
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
				rFormat = EFormat.eSVGALL;
				rWrite = EWrite.eOTHERS;
				break;
			case 'dxf_all_figures':
				rFormat = EFormat.eDXFALL;
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
		rlog += `${(idx + 1).toString().padStart(4, ' ')} : ${dname}\n`;
		if (detail) {
			rlog += `        ${dList[dname].pDef.partName}\n`;
			rlog += `        ${dList[dname].pTitle}\n`;
			rlog += `        ${dList[dname].pDescription}\n`;
		}
	}
	console.log(rlog);
}

function list_parameters(dList: tAllPageDef, selD: string, paramPath: string, modif: string[]) {
	const theD = selectDesign(dList, selD);
	let rlog = `List of parameters of the design ${selD} (${theD.pDef.partName}):\n`;
	const dParam = designParam(theD.pDef);
	try {
		dParam.applyParamVal(readParams(paramPath, true));
		dParam.applyParamVal(parseModif(modif, true));
	} catch (emsg) {
		console.log('err272: error while applying new parameters');
		console.log(emsg);
		process.exit(1);
	}
	const paramVal = dParam.getParamVal();
	const nameLength = 20;
	const unitLength = 8;
	const nameLabel = 'name'.padEnd(nameLength, ' ');
	const unitLabel = 'unit'.padEnd(unitLength, ' ');
	rlog += `   # : ${nameLabel} current ${unitLabel} init   min max step\n`;
	for (const [idx, pa] of theD.pDef.params.entries()) {
		const idx2 = (idx + 1).toString().padStart(4, ' ');
		const pname = pa.name.padEnd(nameLength, ' ');
		const pcurr = paramVal[pa.name];
		const pcurrP = pcurr.toString().padStart(6, ' ');
		const punit = pa.unit.padEnd(unitLength, ' ');
		const pinit = pa.init.toString().padStart(6, ' ');
		switch (pa.pType) {
			case PType.eCheckbox:
				rlog += `${idx2} : ${pname} checkbox ${pcurr}   ${pa.init}\n`;
				break;
			case PType.eDropdown:
				rlog += `${idx2} : ${pname} ${pcurr}   ${pa.init}`;
				for (const [optI, optN] of pa.dropdown.entries()) {
					rlog += ` ${optI}:${optN}`;
				}
				rlog += '\n';
				break;
			default:
				rlog += `${idx2} : ${pname} ${pcurrP} ${punit} ${pinit}   ${pa.min} ${pa.max} ${pa.step}\n`;
		}
	}
	console.log(rlog);
}

function list_figures(dList: tAllPageDef, selD: string, paramPath: string, modif: string[]) {
	const dPartName = selectDesignN(dList, selD);
	const figN = get_figure_array(dList, selD, paramPath, modif);
	let rlog = `List of figures of the design ${selD} (${dPartName}):\n`;
	for (const [idx, figNi] of figN.entries()) {
		const idx2 = (idx + 1).toString().padStart(4, ' ');
		rlog += `${idx2} : ${figNi}\n`;
	}
	console.log(rlog);
}

function list_subdesigns(dList: tAllPageDef, selD: string, paramPath: string, modif: string[]) {
	const dPartName = selectDesignN(dList, selD);
	const subdA = get_subdesign_array(dList, selD, paramPath, modif);
	const subdN = Object.keys(subdA);
	let rlog = `List of sub-designs of the design ${selD} (${dPartName}):\n`;
	for (const [idx, subdNi] of subdN.entries()) {
		const idx2 = (idx + 1).toString().padStart(4, ' ');
		const subd = subdA[subdNi];
		const ori = `[ ${subd.orientation[0]}, ${subd.orientation[1]}, ${subd.orientation[2]}]`;
		const pos = `[ ${subd.position[0]}, ${subd.position[1]}, ${subd.position[2]}]`;
		const subdNp = subdNi.padEnd(15, ' ');
		const subdPp = subd.partName.padEnd(15, ' ');
		rlog += `${idx2} : ${subdNp} ${subdPp}   orientation: ${ori}  position: ${pos}\n`;
	}
	console.log(rlog);
}

function list_subd_parameters(
	dList: tAllPageDef,
	selD: string,
	subdN: string,
	paramPath: string,
	modif: string[]
) {
	const subdParam = get_subd(dList, selD, subdN, paramPath, modif, true).dparam;
	const nameLength = 20;
	const nameLabel = 'name'.padEnd(nameLength, ' ');
	let rlog = `   # : ${nameLabel} value init changed\n`;
	for (const [idx, ipaN] of Object.keys(subdParam).entries()) {
		const idx2 = (idx + 1).toString().padStart(4, ' ');
		const paN = ipaN.padEnd(nameLength, ' ');
		const pa = subdParam[ipaN];
		const paVal = pa.val.toString().padStart(6, ' ');
		const paInit = pa.init.toString().padStart(6, ' ');
		rlog += `${idx2} : ${paN} ${paVal} ${paInit} ${pa.chg ? 'changed' : ''}\n`;
	}
	console.log(rlog);
}

function list_outopt(dList: tAllPageDef, selD: string, paramPath: string, modif: string[]) {
	const dPartName = selectDesignN(dList, selD);
	let rlog = `List of outputs of the design ${selD} (${dPartName}):\n`;
	const outOpt = get_outopt_array(dList, selD, paramPath, modif);
	for (const [idx, oneOpt] of outOpt.entries()) {
		const idx2 = (idx + 1).toString().padStart(4, ' ');
		rlog += `${idx2} : ${oneOpt}\n`;
	}
	console.log(rlog);
}

let cmd_write = false;
async function geom_cli(
	iArgs: string[],
	dList: tAllPageDef,
	appPackage: tPackage,
	outDir = 'output'
) {
	const argv = yargs(hideBin(iArgs))
		.scriptName('geom_cli')
		.version(appPackage.version)
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
		.option('param', {
			alias: 'p',
			type: 'string',
			array: false,
			description: 'path to the input parameter file',
			default: ''
		})
		.option('modif', {
			alias: 'm',
			nargs: 2,
			type: 'string',
			description: 'modify parameter values <paramName> <paramValue>',
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
		.command('versions', 'print details about the app version and its dependencies', {}, () => {
			print_version_details(appPackage);
		})
		.command(['list-designs', 'list'], 'list the available designs', {}, () => {
			list_designs(dList, false);
		})
		.command('list-designs-detailed', 'list the available designs with details', {}, () => {
			list_designs(dList, true);
		})
		.command('list-parameters', 'list the parameters of the selected design', {}, (argv) => {
			//console.log(argv)
			list_parameters(
				dList,
				argv.design as string,
				argv.param as string,
				argv.modif as string[]
			);
		})
		.command('list-figures', 'list the figures of the selected design', {}, (argv) => {
			list_figures(
				dList,
				argv.design as string,
				argv.param as string,
				argv.modif as string[]
			);
		})
		.command('list-subdesigns', 'list the subdesigns of the selected design', {}, (argv) => {
			list_subdesigns(
				dList,
				argv.design as string,
				argv.param as string,
				argv.modif as string[]
			);
		})
		.command(
			'list-subd-parameters <subdN>',
			'list the parameters of subdesigns',
			{},
			(argv) => {
				list_subd_parameters(
					dList,
					argv.design as string,
					argv.subdN as string,
					argv.param as string,
					argv.modif as string[]
				);
			}
		)
		.command('compute-log', 'Compute and print the log without writing file', {}, (argv) => {
			computeGeom(
				dList,
				argv.design as string,
				argv.param as string,
				argv.modif as string[],
				true
			);
		})
		.command(
			'list-outopt',
			'list the possible output format options of the selected design',
			{},
			(argv) => {
				list_outopt(
					dList,
					argv.design as string,
					argv.param as string,
					argv.modif as string[]
				);
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
	//console.log(argv.param);
	//console.log(argv.modif);
	//console.log(argv.outDir);
	//console.log(argv);
	if (cmd_write) {
		const iOutDir = argv.outDir;
		if (iOutDir === '') {
			console.log("err638: option 'outDir' is set to empty string. Nothing written!");
			process.exit(1);
		}
		const selD = argv.design;
		const outopt = argv.outopt as string;
		const paramPath = argv.param;
		const paramModif = argv.modif as unknown as string[];
		const theD = selectDesign(dList, selD);
		// check if outopt is valid
		const outOpt = get_outopt_array(dList, selD, paramPath, paramModif);
		if (!outOpt.includes(outopt)) {
			console.log(`err639: outopt ${outopt} is not a valid option`);
			process.exit(1);
		}
		// end of check of outopt
		//let rlog = `Write ${outopt} of ${selD} (${theD.pDef.partName}):\n`;
		let rlog = '';
		const oOpt = decompose_outopt(outopt);
		const dParam = designParam(theD.pDef);
		try {
			dParam.applyParamVal(readParams(paramPath, false));
			dParam.applyParamVal(parseModif(paramModif, false));
		} catch (emsg) {
			console.log('err273: error while applying new parameters');
			console.log(emsg);
			process.exit(1);
		}
		computeGeom(dList, selD, paramPath, paramModif, true);
		try {
			if (oOpt.eWrite === EWrite.eEGOPARAMS) {
				rlog += writeParams(
					dParam.partName,
					dParam.getParamVal(),
					iOutDir,
					argv.outFileName
				);
			} else if (oOpt.eWrite === EWrite.eSUBDPARAMS) {
				const subD = get_subd(dList, selD, oOpt.eSubdesign, paramPath, paramModif, false);
				rlog += writeParams(
					subD.partName,
					paramListToVal(subD.dparam),
					iOutDir,
					argv.outFileName
				);
			} else {
				const simtime = 0;
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
		} catch (emsg) {
			console.log('err279: error while writing file');
			console.log(emsg);
			process.exit(1);
		}
		console.log(rlog);
	}
}

export { geom_cli };
