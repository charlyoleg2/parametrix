<script lang="ts">
	//import { loadRunDesign } from './runImpScript';

	let loadMsg = '';
	let objK: string[] = [];
	let sDesign = '';

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
					const impObg = await import(objURL);
					rMsg += `dbg320: import code from ${firstFile.name}\n`;
					//rMsg += `${impObg.abc1()}\n`;
					objK = Object.keys(impObg);
					for (const [idx, k] of objK.entries()) {
						rMsg += `${idx + 1} : ${k}\n`;
					}
				} catch (err) {
					const errMsg = `err739: Error by importing ${firstFile.name}`;
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
		sDesign = aDesign;
	}
	function resetDesign() {
		loadMsg = '';
		objK = [];
		sDesign = '';
	}
</script>

<h1>Dynamic import of geometrix-design</h1>
<article>
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
<article>
	<ol>
		{#each objK as iDesign}
			<li><button on:click={() => startDesign(iDesign)}>{iDesign}</button></li>
		{/each}
	</ol>
</article>
<article>
	<button on:click={resetDesign}>Reset dynamic design</button>
</article>
<article>
	{sDesign}
</article>

<style lang="scss">
	@use '$lib/style/colors.scss';

	h1 {
		margin: 1rem;
	}
	article {
		margin: 1rem;
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
