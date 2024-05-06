// paramFile.ts

import type { tParamVal } from './designParams';
import JSON5 from 'json5';

interface tParamValInFile {
	lastModif: string;
	partName: string;
	pVal: tParamVal;
	comment: string;
}

function createParamFile(
	lastModif: string,
	iPartName: string,
	idparams: tParamVal,
	comment: string
): string {
	const allVal: tParamValInFile = {
		lastModif: lastModif,
		partName: iPartName,
		pVal: idparams,
		comment: comment
	};
	const fContentStr = JSON.stringify(allVal, null, '  ');
	return fContentStr;
}

function parseParamFile(fContentStr: string): [tParamValInFile, string] {
	//const wholeJson = JSON.parse(fContentStr) as tParamValInFile;
	const wholeJson = JSON5.parse(fContentStr) as tParamValInFile;
	const lastModifKey = 'lastModif';
	const partNameKey = 'partName';
	const pValKey = 'pVal';
	const commentKey = 'comment';
	let rlog = '';
	const rObj: tParamValInFile = { lastModif: '', partName: '', pVal: {}, comment: '' };
	if (Object.hasOwn(wholeJson, lastModifKey)) {
		rObj[lastModifKey] = wholeJson[lastModifKey];
	}
	if (Object.hasOwn(wholeJson, partNameKey)) {
		rObj[partNameKey] = wholeJson[partNameKey];
	}
	if (Object.hasOwn(wholeJson, pValKey)) {
		const paNaVa = wholeJson[pValKey];
		for (const paNa of Object.keys(paNaVa)) {
			const paVa = paNaVa[paNa];
			//const paVa = parseFloat(paVaStr);
			if (isNaN(paVa)) {
				throw `err905: ${paVa} is not a number!`;
			}
			rObj[pValKey][paNa] = paVa;
		}
		rlog += `info398: parsing file has found ${Object.keys(rObj[pValKey]).length} parameters\n`;
	} else {
		throw `err489: parameter-json-file has no key ${pValKey}\n`;
	}
	if (Object.hasOwn(wholeJson, commentKey)) {
		rObj[commentKey] = wholeJson[commentKey];
	}
	return [rObj, rlog];
}

export type { tParamValInFile };
export { createParamFile, parseParamFile };
