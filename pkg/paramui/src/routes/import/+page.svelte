<script lang="ts">
	import { base } from '$app/paths';

	let loadMsg = '';
	let downloadMsg = '';
	// load design-file
	function loadDesign(fName: string, fContent: string) {
		let cnt = 0;
		loadMsg += `dbg904: loadDesign ${fName}\n`;
		fContent.split('\n').forEach((line) => {
			if (cnt < 3) {
				loadMsg += `${line}\n`;
			}
			cnt += 1;
		});
	}
	function loadFile(fileP: File) {
		const reader = new FileReader();
		reader.onload = function () {
			loadDesign(fileP.name, reader.result as string);
		};
		reader.onerror = function () {
			loadMsg += `err702: Error while reading ${fileP.name}\n`;
			//loadMsg += reader.error as string;
			//loadMsg += '\n';
			console.log(reader.error);
		};
		reader.readAsText(fileP);
	}
	function loadDesignFile(eve: Event) {
		if (eve.target) {
			type tEveFileList = FileList | null;
			const paramFiles: tEveFileList = (eve.target as HTMLInputElement).files;
			if (paramFiles) {
				loadFile(paramFiles[0]);
			}
		}
	}
	// download design-file
	function downloadDesign(fName: string, fContent: string) {
		let cnt = 0;
		downloadMsg += `dbg805: loadDesign ${fName}\n`;
		fContent.split('\n').forEach((line) => {
			if (cnt < 3) {
				downloadMsg += `${line}\n`;
			}
			cnt += 1;
		});
	}
	async function downloadDesignFile() {
		const fetchResp = await fetch(`${base}/xyz.js`);
		if (fetchResp.ok) {
			const downStr = await fetchResp.text();
			downloadDesign('blabla', downStr);
		} else {
			downloadMsg += 'err565: Error by downloading\n';
		}
	}
</script>

<h1>Import a geometrix-design</h1>
<article>
	<h3>Upload a javascript-geometrix-design-library-file</h3>
	<label for="loadDLib" class="fileUpload">Load design-file</label>
	<input
		type="file"
		id="loadDLib"
		accept="text/plain, text/javascript"
		on:change={loadDesignFile}
	/>
	<textarea rows="10" cols="80" readonly wrap="off" value={loadMsg} />
	<button class="fileDownload" on:click={downloadDesignFile}>Download</button>
	<textarea rows="10" cols="80" readonly wrap="off" value={downloadMsg} />
</article>

<style lang="scss">
	@use '$lib/style/colors.scss';

	h1 {
		margin: 1rem;
	}
	article {
		margin: 1rem;
	}
	article > label.fileUpload,
	article > button.fileDownload {
		display: inline-block;
		height: 1.2rem;
		/*width: 1.6rem;*/
		color: blue;
		font-size: 0.8rem;
		font-weight: 400;
		padding: 0.1rem 0.4rem 0.1rem;
		border-style: solid;
		border-width: 0.1rem;
		border-radius: 0.2rem;
		border-color: yellow;
		margin: 0.5rem;
		background-color: green;
	}
	article > input[type='file'] {
		display: none;
	}
	article > textarea {
		display: block;
	}
</style>
