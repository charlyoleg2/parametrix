// geom_write.ts

import type { tGeomFunc, tParamVal } from 'geometrix';
import {
	c_ParametrixAll,
	EFormat,
	fileBinContent,
	fileTextContent,
	fileSuffix,
	fileBin
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
		fs.mkdirSync(iDir);
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

function write_textFile2(iDir: string, fName: string, fContent: string): string {
	let rlog = '';
	rlog += createDir(iDir);
	const fName2 = `${iDir}/${fName}`;
	rlog += write_textFile(fName2, fContent);
	return rlog;
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
	let eFace = c_ParametrixAll;
	let nFace = 'all';
	if (iFace !== '') {
		eFace = iFace;
		nFace = iFace;
	}
	let fName = iFname;
	if (fName === '') {
		fName = iPartName + '_' + nFace + '_' + dateString() + fSuffix;
	}
	const reSlash = /\//;
	if (reSlash.test(fName)) {
		throw `err932: the filename ${fName} contains a slash '/'`;
	}
	if (iDir === '') {
		throw `err074: geom_write output-directory is an empty string!`;
	}
	rlog += createDir(iDir);
	const fName2 = `${iDir}/${fName}`;
	if (fBin) {
		const fContent = await fileBinContent(fgeom, simTime, iParam, iFormat);
		rlog += await write_binFile(fName2, fContent);
	} else {
		const fContent = fileTextContent(fgeom, iParam, eFace, iFormat);
		rlog += write_textFile(fName2, fContent);
	}
	return rlog;
}

export { geom_write, write_textFile2 };
