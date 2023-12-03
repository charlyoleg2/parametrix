// downloadParams.ts

import type { tParamVal } from 'geometrix';
//import { ffix } from 'geometrix';

function download_file(file_name: string, file_content: string) {
	//create temporary an invisible element
	const elem_a_download = document.createElement('a');
	elem_a_download.setAttribute(
		'href',
		'data:text/plain;charset=utf-8,' + encodeURIComponent(file_content)
	);
	elem_a_download.setAttribute('download', file_name);
	//document.body.appendChild(elem_a_download); // it does not seem required to append the element to the DOM to use it
	elem_a_download.click();
	//document.body.removeChild(elem_a_download);
	elem_a_download.remove(); // Is this really required?
}

function downloadParams(iPartName: string, idparams: tParamVal, iComment: string) {
	const re1 = /[-:]/g;
	const re2 = /\..*$/;
	const datestr = new Date().toISOString().replace(re1, '').replace(re2, '').replace('T', '_');
	const file_name = `px_${iPartName}_${datestr}.json`;
	const allVal = { lastModif: datestr, pVal: idparams, comment: iComment };
	const file_content = JSON.stringify(allVal, null, '  ');
	download_file(file_name, file_content);
	//console.log(`dbg343: ${file_name}`);
}

function generateUrl(ihref: string, idparams: tParamVal, iLenghtLimit: boolean): string {
	const url1 = new URL(ihref);
	const strLengthLimit = 2000;
	let strLength = url1.toString().length;
	for (const ky of Object.keys(idparams)) {
		//const val = ffix(idparams[ky]);
		const val = idparams[ky].toString();
		const nLen = 2 + ky.length + val.length;
		if (iLenghtLimit && strLength + nLen < strLengthLimit) {
			url1.searchParams.append(encodeURIComponent(ky), encodeURIComponent(val));
		}
		//strLength += nLen;
		strLength = url1.toString().length;
		//console.log(`dbg546: strLength ${strLength} and strLengthLimit ${strLengthLimit}`);
	}
	console.log(`dbg547: strLength ${strLength} and strLengthLimit ${strLengthLimit}`);
	return url1.toString();
}

export { downloadParams, generateUrl };
