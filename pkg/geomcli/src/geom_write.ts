// geom_write.ts

import type { tGeomFunc, tParamVal } from 'geometrix';
import {
	EFormat,
	fileBinContent,
	fileTextContent,
	fileSuffix,
	fileBin,
	createParamFile,
	parseParamFile
} from 'geometrix';
import fs from 'fs';

function dateString(): string {
	const re1 = /[-:]/g;
	const re2 = /\..*$/;
	const rDateStr = new Date().toISOString().replace(re1, '').replace(re2, '').replace('T', '_');
	return rDateStr;
}

function createDir(iDir: string): string {
	let rlog = '';
	if (!fs.existsSync(iDir)) {
		fs.mkdirSync(iDir, { recursive: true });
		rlog += `info203: mkdir ${iDir}\n`;
	}
	return rlog;
}

async function write_binFile(fName: string, fContent: Blob): Promise<string> {
	let rlog = '';
	const buffer = await fContent.arrayBuffer();
	const arrBufView = new DataView(buffer);
	fs.writeFileSync(fName, arrBufView);
	rlog += `info304: bin-file ${fName} has been written\n`;
	return rlog;
}

function write_textFile(fName: string, fContent: string): string {
	let rlog = '';
	fs.writeFileSync(fName, fContent);
	rlog += `info405: text-file ${fName} has been written\n`;
	return rlog;
}

function checkDirFName(iDir: string, fName: string): string {
	const reSlash = /\//;
	if (reSlash.test(fName)) {
		throw `err932: the filename ${fName} contains a slash '/'`;
	}
	if (iDir === '') {
		throw `err074: geom_write output-directory is an empty string!`;
	}
	const fName2 = `${iDir}/${fName}`;
	return fName2;
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
	const fName2 = checkDirFName(oDir, file_name);
	let rlog = `Write ${paramNb} parameters in file ${fName2}\n`;
	const file_content = createParamFile(datestr, iPartName, idparams, 'Written by geom_cli');
	rlog += createDir(oDir);
	write_textFile(fName2, file_content);
	return rlog;
}

function readParams(paramPath: string, expectedPartName: string, printLog: boolean): tParamVal {
	let rParamVal: tParamVal = {};
	if (paramPath !== '') {
		let rlog = `Read parameter file ${paramPath}\n`;
		if (!fs.existsSync(paramPath)) {
			throw `err533: file ${paramPath} doesn't exist!`;
		}
		const fContentStr = fs.readFileSync(paramPath, 'utf8');
		const [obj] = parseParamFile(fContentStr);
		//const [obj, tlog] = parseParamFile(fContentStr);
		//rlog += tlog;
		if (obj.partName !== expectedPartName) {
			rlog += `warn329: file partName: '${obj.partName}'  expected partName: '${expectedPartName}'\n`;
		} else {
			rlog += `file partName: ${obj.partName}\n`;
		}
		rlog += `file lastModif: ${obj.lastModif}\n`;
		rlog += `file comment: ${obj.comment}\n`;
		rlog += `info307: ${Object.keys(obj.pVal).length} parameters from file`;
		rParamVal = obj.pVal;
		if (printLog) {
			console.log(rlog);
		}
	}
	return rParamVal;
}

async function geom_write(
	iPartName: string,
	fgeom: tGeomFunc,
	simTime: number,
	iParam: tParamVal,
	iFormat: EFormat,
	iFace = '',
	iDir = '.',
	iFname = ''
): Promise<string> {
	let rlog = '';
	const fSuffix = fileSuffix(iFormat);
	const fBin = fileBin(iFormat);
	let nFace = 'all';
	if (iFace !== '') {
		nFace = iFace;
	}
	let fName = iFname;
	if (fName === '') {
		fName = iPartName + '_' + nFace + '_' + dateString() + fSuffix;
	}
	const fName2 = checkDirFName(iDir, fName);
	rlog += createDir(iDir);
	if (fBin) {
		const fContent = await fileBinContent(fgeom, simTime, iParam, iFormat);
		rlog += await write_binFile(fName2, fContent);
	} else {
		const fContent = fileTextContent(fgeom, iParam, nFace, iFormat);
		rlog += write_textFile(fName2, fContent);
	}
	return rlog;
}

export { geom_write, writeParams, readParams };
