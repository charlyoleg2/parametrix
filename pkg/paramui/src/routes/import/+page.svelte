<script lang="ts">
	import type { tPageDef, tAllPageDef } from 'geometrix';
	import { checkImpPages } from 'geometrix';
	//import type { ComponentType } from 'svelte';
	import { OneDesign } from 'geomui';
	import { allLink } from '$lib/makeMenu';

	let step1 = true;
	let step2 = false;
	let step3 = false;
	let loadMsg = '';
	let objK: string[] = [];
	let impPages: tAllPageDef = {};
	let dPageDef: tPageDef;

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
				rMsg += `import the design from ${firstFile.name}\n`;
				try {
					// import code
					impPages = await import(objURL);
					//rMsg += `${impPages.abc1()}\n`;
					const [cErr, cMsg] = checkImpPages(impPages);
					rMsg += cMsg;
					if (cErr) {
						objK = [];
						rMsg += `err672: Error by loading ${firstFile.name}\n`;
					} else {
						objK = Object.keys(impPages);
						step2 = true;
					}
					//for (const [idx, k] of objK.entries()) {
					//	rMsg += `${idx + 1} : ${k}\n`;
					//}
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
		loadMsg = await loadDesignFile2(eve);
	}
	function startDesign(aDesign: string) {
		dPageDef = impPages[aDesign];
		step1 = false;
		step2 = false;
		step3 = true;
	}
	function resetDesign() {
		loadMsg = '';
		objK = [];
		step1 = true;
		step2 = false;
		step3 = false;
	}
</script>

<h1>Dynamic import of geometrix-design</h1>
<article class:step1>
	<h3>Load a javascript-geometrix-design-library-file</h3>
	<p>
		To generate the javascript embedding its dependencies, use:<br /><code
			>npx esbuild src/myGroup1/myPartA.ts --bundle --format=esm --outfile=dist2/myPartA.js</code
		>
	</p>
	<label for="loadDLib" class="fileUpload">Load design-file</label>
	<input type="file" id="loadDLib" accept="text/javascript" on:change={loadDesignFile} />
	<textarea rows="3" cols="80" readonly wrap="off" value={loadMsg} />
</article>
<article class:step2>
	<h3>Select a design-page</h3>
	<ol>
		{#each objK as iDesign}
			<li>
				<button on:click={() => startDesign(iDesign)}>{iDesign}</button>
				- {impPages[iDesign].pTitle}
			</li>
		{/each}
	</ol>
</article>
<article class:step3>
	<button class="higher" on:click={resetDesign}>Reset dynamic design</button>
</article>
<svelte:component this={step3 ? OneDesign : null} pageDef={dPageDef} pLink={allLink} />

<style lang="scss">
	@use '$lib/style/colors.scss';

	h1 {
		margin: 1rem;
	}
	article {
		margin: 1rem;
		display: none;
	}
	article.step1 {
		display: block;
	}
	article.step2 {
		display: block;
	}
	article.step3 {
		display: block;
	}
	article > h3,
	article > p {
		margin-top: 0;
		margin-bottom: 0;
	}
	article > label.fileUpload,
	button {
		display: inline-block;
		height: 1.2rem;
		/*height: 1.6rem;*/
		color: colors.$button-sign;
		font-size: 0.8rem;
		font-weight: 400;
		padding: 0.1rem 0.4rem 0.1rem;
		border-style: solid;
		border-width: 0.1rem;
		border-radius: 0.2rem;
		border-color: colors.$button-sign;
		margin: 0.5rem;
		background-color: colors.$button-bg;
	}
	article > input[type='file'] {
		display: none;
	}
	article > textarea {
		display: block;
	}
	article > button.higher {
		height: 1.6rem;
	}
	li > button {
		margin-top: 0.2rem;
		margin-bottom: 0.2rem;
	}
</style>
