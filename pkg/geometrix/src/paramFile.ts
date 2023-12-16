// paramFile.ts

import type { tParamVal } from './designParams';

interface tParamValInFile {
	lastModif: string;
	pVal: tParamVal;
	comment: string;
}

function createParamFile(lastModif: string, idparams: tParamVal, comment: string): string {
	const allVal: tParamValInFile = {
		lastModif: lastModif,
		pVal: idparams,
		comment: comment
	};
	const fContentStr = JSON.stringify(allVal, null, '  ');
	return fContentStr;
}

function parseParamFile(fContentStr: string): [tParamValInFile, string] {
	const wholeJson = JSON.parse(fContentStr) as tParamValInFile;
	const lastModifKey = 'lastModif';
	const pValKey = 'pVal';
	const commentKey = 'comment';
	let rlog = '';
	const rObj: tParamValInFile = { lastModif: '', pVal: {}, comment: '' };
	if (Object.hasOwn(wholeJson, lastModifKey)) {
		rObj[lastModifKey] = wholeJson[lastModifKey];
	}
	if (Object.hasOwn(wholeJson, pValKey)) {
		rObj[pValKey] = wholeJson[pValKey];
		rlog += `info398: parsing file has found ${Object.keys(rObj[pValKey]).length} parameters\n`;
	} else {
		rlog += `err489: parameter-json-file has no key ${pValKey}\n`;
	}
	if (Object.hasOwn(wholeJson, commentKey)) {
		rObj[commentKey] = wholeJson[commentKey];
	}
	return [rObj, rlog];
}

export type { tParamValInFile };
export { createParamFile, parseParamFile };
