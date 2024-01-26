<script lang="ts">
	import type { tPageDef, tAllPageDef } from 'geometrix';
	import type { ComponentType } from 'svelte';
	import { OneDesign } from 'geomui';
	import { allLink } from '$lib/makeMenu';

	type tComponentTypeNull = ComponentType | null;
	type tPageDefNull = tPageDef | null;

	let booting = true;
	let running = false;
	let loadMsg = '';
	let objK: string[] = [];
	let impPages: tAllPageDef = {};
	let dOneDesign: tComponentTypeNull = null;
	let dPageDef: tPageDefNull = null;

	function checkImpPages(pages: tAllPageDef): [boolean, string] {
		let rMsg = '';
		let rError = false;
		const pageNames = Object.keys(pages);
		rMsg += `found ${pageNames.length} designs\n`;
		const props = ['pTitle', 'pDescription', 'pDef', 'pGeom'];
		for (const pagN of pageNames) {
			//rMsg += `${pagN}\n`;
			const pag = pages[pagN];
			//for (const prop of Object.keys(pag)) {
			//	rMsg += `${prop}\n`;
			//}
			for (const prop of props) {
				if (!(prop in pag)) {
					rMsg += `err323: ${pagN} has no property ${prop}\n`;
					rError = true;
				}
			}
		}
		return [rError, rMsg];
	}
	async function loadDesignFile2(eve: Event): Promise<string> {
		let rMsg = '';
		if (eve.target) {
			type tEveFileList = FileList | null;
			const paramFiles: tEveFileList = (eve.target as HTMLInputElement).files;
			if (paramFiles) {
				const firstFile = paramFiles[0];
				if (!firstFile.name.endsWith('.js')) {
					rMsg += `err308: ${firstFile.name} has an unexpected file extension!\n`;
					return rMsg;
				}
				const objURL = URL.createObjectURL(firstFile); // no await!
				try {
					// import code
					impPages = await import(objURL);
					rMsg += `import the design from ${firstFile.name}\n`;
					//rMsg += `${impPages.abc1()}\n`;
					objK = Object.keys(impPages);
					//for (const [idx, k] of objK.entries()) {
					//	rMsg += `${idx + 1} : ${k}\n`;
					//}
					const [cErr, cMsg] = checkImpPages(impPages);
					rMsg += cMsg;
					if (cErr) {
						objK = [];
						rMsg += `err672: Error by loading ${firstFile.name}\n`;
					}
				} catch (err) {
					const errMsg = `err739: Error by importing ${firstFile.name}\n`;
					rMsg += `${errMsg}\n`;
					console.log(errMsg);
					console.log(err);
				}
				// release object memory
				URL.revokeObjectURL(objURL);
			}
		}
		return rMsg;
	}
	async function loadDesignFile(eve: Event) {
		loadMsg += await loadDesignFile2(eve);
	}
	function startDesign(aDesign: string) {
		dPageDef = impPages[aDesign];
		dOneDesign = OneDesign;
		booting = false;
		running = true;
	}
	function resetDesign() {
		loadMsg = '';
		objK = [];
		dOneDesign = null;
		dPageDef = null;
		booting = true;
		running = false;
	}
</script>

<h1>Dynamic import of geometrix-design</h1>
<article class:booting>
	<h3>Upload a javascript-geometrix-design-library-file</h3>
	<p>
		To generate the javascript embedding its dependencies, use:<br /><code
			>npx esbuild src/myGroup1/myPartA.ts --bundle --format=esm --outfile=dist2/myPartA.js</code
		>
	</p>
	<label for="loadDLib" class="fileUpload">Load design-file</label>
	<input type="file" id="loadDLib" accept="text/javascript" on:change={loadDesignFile} />
	<textarea rows="5" cols="80" readonly wrap="off" value={loadMsg} />
</article>
<article class:booting>
	<ol>
		{#each objK as iDesign}
			<li><button on:click={() => startDesign(iDesign)}>{iDesign}</button></li>
		{/each}
	</ol>
</article>
<article class:running>
	<button on:click={resetDesign}>Reset dynamic design</button>
</article>
<svelte:component this={dOneDesign} pageDef={dPageDef} pLink={allLink} />

<style lang="scss">
	@use '$lib/style/colors.scss';

	h1 {
		margin: 1rem;
	}
	article {
		margin: 1rem;
		display: none;
	}
	article.booting {
		display: block;
	}
	article.running {
		display: block;
	}
	article > h3,
	article > p {
		margin-top: 0;
		margin-bottom: 0;
	}
	article > label.fileUpload {
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
