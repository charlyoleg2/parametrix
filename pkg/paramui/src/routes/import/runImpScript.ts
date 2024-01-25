// runImpScript.ts

import { base } from '$app/paths';

// urls
const postUrl = `${base}/upload/design`;
const getUrl = `${base}/impDesign5432.js`;

// load design-file

async function loadDesignFile4(fName: string, fContent: string): Promise<string> {
	let rMsg = '';
	const fetchResp = await fetch(postUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'text/javascript;charset=utf-8'
		},
		body: fContent
	});
	rMsg += `dbg345: upload ${fName}\n`;
	//const fetchResult = await fetchResp.json();
	//rMsg += JSON.stringify(fetchResult, null, 2);
	rMsg += await fetchResp.text();
	return rMsg;
}

function loadDesignFile3(fName: string, fContent: string): string {
	let rMsg = '';
	let cnt = 0;
	rMsg += `dbg904: loadDesign ${fName}\n`;
	fContent.split('\n').forEach((line) => {
		if (cnt < 3) {
			rMsg += `${line}\n`;
		}
		cnt += 1;
	});
	return rMsg;
}

async function loadDesignFile2(fileP: File): Promise<string> {
	let rMsg = '';
	//const reader = new FileReader();
	//reader.onload = function () {
	//	loadDesignFile3(fileP.name, reader.result as string);
	//	loadDesignFile4(fileP.name, reader.result as string);
	//};
	//reader.onerror = function () {
	//	rMsg += `err702: Error while reading ${fileP.name}\n`;
	//	//rMsg += reader.error as string;
	//	//rMsg += '\n';
	//	console.log(reader.error);
	//};
	//reader.readAsText(fileP);
	const fileContent = await fileP.text();
	rMsg += loadDesignFile3(fileP.name, fileContent);
	rMsg += await loadDesignFile4(fileP.name, fileContent);
	return rMsg;
}

async function loadDesignFile1(eve: Event): Promise<string> {
	let rMsg = '';
	if (eve.target) {
		type tEveFileList = FileList | null;
		const paramFiles: tEveFileList = (eve.target as HTMLInputElement).files;
		if (paramFiles) {
			rMsg += await loadDesignFile2(paramFiles[0]);
		}
	}
	return rMsg;
}

// download and run design-file

function runDesignFile3(fName: string, fContent: string): string {
	let cnt = 0;
	let rMsg = `dbg805: loadDesign ${fName}\n`;
	fContent.split('\n').forEach((line) => {
		if (cnt < 3) {
			rMsg += `${line}\n`;
		}
		cnt += 1;
	});
	return rMsg;
}

async function runDesignFile2(): Promise<string> {
	let rMsg = '';
	const fetchResp = await fetch(getUrl);
	if (fetchResp.ok) {
		const downStr = await fetchResp.text();
		rMsg += runDesignFile3('blabla', downStr);
	} else {
		rMsg += 'err565: Error by downloading the design file\n';
	}
	return rMsg;
}

async function runDesignFile4(): Promise<string> {
	let rMsg = '';
	// import code
	const impObg = await import(getUrl);
	rMsg += `dbg320: import code\n`;
	rMsg += `${impObg.abc1()}\n`;
	return rMsg;
}

async function runDesignFile1(): Promise<string> {
	let rMsg = '';
	rMsg += await runDesignFile2();
	rMsg += await runDesignFile4();
	return rMsg;
}

export {
	loadDesignFile1,
	loadDesignFile2,
	loadDesignFile3,
	loadDesignFile4,
	runDesignFile1,
	runDesignFile2,
	runDesignFile3,
	runDesignFile4
};
