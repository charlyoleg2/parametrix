<script lang="ts">
	//import type { tOkFunc } from '$lib/ModalDiag.svelte';
	import ModalDiag from '$lib/ModalDiag.svelte';
	import LocStorWrite from '$lib/LocStorWrite.svelte';
	import LocStorRead from '$lib/LocStorRead.svelte';
	import SimpleDrawing from '$lib/SimpleDrawing.svelte';
	import type { tParamDef, tParamVal, tAllVal, tGeomFunc } from 'geometrix';
	import { PType } from 'geometrix';
	import { storePV } from '$lib/storePVal';
	import { onMount, createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	const dispatch = createEventDispatcher();

	export let pDef: tParamDef;
	export let geom: tGeomFunc;
	export let face: string;
	export let simTime = 0;

	//const lastModifKey = 'lastModif';
	const pValKey = 'pVal';
	const commentKey = 'comment';
	let inputComment = '';

	// initialization
	function paramChange() {
		dispatch('paramChg', { foo: 'bla' });
	}
	function initpVal(ipVal: tParamVal) {
		let cover = 0;
		let uncover = 0;
		let equal = 0;
		for (const p of pDef.params) {
			if (Object.hasOwn(ipVal, p.name)) {
				cover += 1;
				if ($storePV[pDef.partName][p.name] === ipVal[p.name]) {
					equal += 1;
				} else {
					$storePV[pDef.partName][p.name] = ipVal[p.name];
				}
			} else {
				uncover += 1;
			}
		}
		const loadDate = new Date().toLocaleTimeString();
		loadMsg = `Parameters loaded at ${loadDate} :`;
		loadMsg += ` def-nb: ${Object.keys(pDef.params).length}`;
		loadMsg += `, load-nb: ${Object.keys(ipVal).length}`;
		loadMsg += `, cover-nb: ${cover}, uncover-nb: ${uncover}`;
		loadMsg += `, equal-nb: ${equal}, diff-nb: ${cover - equal}`;
	}
	//function initParams1() {
	//	for (const p of pDef.params) {
	//		$storePV[pDef.partName][p.name] = p.init;
	//	}
	//}
	function initParams2() {
		if (browser) {
			const searchParams = new URLSearchParams($page.url.search);
			const pVal2: tParamVal = {};
			for (const [kk, vv] of searchParams) {
				//console.log(`dbg638: ${kk} ${vv}`);
				const vvn = Number(vv);
				if (!isNaN(vvn)) {
					pVal2[kk] = vvn;
				}
			}
			if (Object.keys(pVal2).length > 0) {
				initpVal(pVal2);
			}
		}
	}
	// No initialization when loading page! Keep the previous values!
	//initParams1();
	onMount(() => {
		initParams2();
		paramChange();
	});
	// load parameters
	let loadMsg = '';
	function loadParams(iNew: tAllVal) {
		if (Object.hasOwn(iNew, pValKey)) {
			initpVal(iNew[pValKey]);
		}
		if (Object.hasOwn(iNew, commentKey)) {
			inputComment = iNew[commentKey];
		} else {
			inputComment = '';
		}
		paramChange();
	}
	// load from file
	function loadFile(fileP: File) {
		const reader = new FileReader();
		reader.addEventListener('loadend', () => {
			const allJson: tAllVal = JSON.parse(reader.result as string);
			//console.log(`dbg345`);
			loadParams(allJson);
		});
		reader.readAsText(fileP);
	}
	function loadParamFromFile(eve: Event) {
		if (eve.target) {
			type tEveFileList = FileList | null;
			const paramFiles: tEveFileList = (eve.target as HTMLInputElement).files;
			if (paramFiles) {
				loadFile(paramFiles[0]);
			}
		}
	}
	// download parameters
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
	function dowloadParams() {
		const re1 = /[-:]/g;
		const re2 = /\..*$/;
		const datestr = new Date()
			.toISOString()
			.replace(re1, '')
			.replace(re2, '')
			.replace('T', '_');
		const file_name = `px_${pDef.partName}_${datestr}.json`;
		const allVal = { lastModif: datestr, pVal: $storePV[pDef.partName], comment: inputComment };
		const file_content = JSON.stringify(allVal, null, '  ');
		download_file(file_name, file_content);
		//console.log(`dbg343: ${file_name}`);
	}
	// modal
	let modalLoadDefault = false;
	let modalLoadLocal = false;
	let modalSaveUrl = false;
	let modalSaveLocal = false;
	function loadDefaults() {
		const pInit: tParamVal = {};
		for (const p of pDef.params) {
			pInit[p.name] = p.init;
		}
		loadParams({ pVal: pInit } as tAllVal);
	}
	// load parameters from localStorage
	let locStorRname: string;
	function loadLocStor() {
		if (locStorRname !== undefined && locStorRname !== '') {
			const storeKey = `${pDef.partName}_${locStorRname}`;
			//console.log(`load from localStorage ${storeKey}`);
			if (browser) {
				const storeStr = window.localStorage.getItem(storeKey);
				if (storeStr === null) {
					console.log(`Warn157: localStorage key ${storeKey} is null`);
				} else {
					const storeAll = JSON.parse(storeStr);
					loadParams(storeAll);
				}
			}
		} else {
			console.log('Warn239: No valid name for loading from localStorage!');
		}
	}
	// save parameters into localStorage
	let locStorWname: string;
	//$: console.log(`dbg888: ${locStorWname}`);
	function saveInLocStor() {
		if (locStorWname !== undefined && locStorWname !== '') {
			const storeKey = `${pDef.partName}_${locStorWname}`;
			const re2 = /\..*$/;
			const lastModif = new Date().toISOString().replace(re2, '');
			const storeAll = JSON.stringify({
				lastModif: lastModif,
				pVal: $storePV[pDef.partName],
				comment: inputComment
			});
			//console.log(`save in localStorage ${storeKey}`);
			if (browser) {
				window.localStorage.setItem(storeKey, storeAll);
			}
		} else {
			console.log('Warn639: No valid name for writing to localStorage!');
		}
	}
	// Save as URL
	let pUrl = '';
	function generateUrl(): string {
		const url1 = new URL($page.url.href);
		for (const ky of Object.keys($storePV[pDef.partName])) {
			url1.searchParams.append(
				encodeURIComponent(ky),
				encodeURIComponent($storePV[pDef.partName][ky])
			);
		}
		return url1.toString();
	}
	function openModalUrl() {
		pUrl = generateUrl();
		modalSaveUrl = true;
	}
	function saveAsUrl() {
		//console.log(`dbg244: voila`);
	}
	// parameter picture
	let paramSvg = `${base}/default_param_blank.svg`;
	function paramPict(keyName: string) {
		//console.log(`dbg783: ${keyName}`);
		// convention for the file-names of the parameter description
		//paramSvg = `${base}/${pDef.partName}_${keyName}.svg`;
		paramSvg = `${base}/default_param_blank.svg`;
		if (Object.keys(pDef.paramSvg).includes(keyName)) {
			paramSvg = `${base}/${pDef.paramSvg[keyName]}`;
		}
	}
	function paramPict2(idx: number, pDef_page: string) {
		const paramNb = Object.keys($storePV[pDef_page]).length;
		if (idx < paramNb) {
			paramPict(Object.keys($storePV[pDef_page])[idx]);
		}
	}
	$: paramPict2(0, pDef.partName);
</script>

<section>
	<h2>Parameters</h2>
	<main>
		<label for="loadFParams" class="fileUpload">Load Params from File</label>
		<input
			id="loadFParams"
			type="file"
			accept="text/plain, application/json"
			on:change={loadParamFromFile}
		/>
		<button
			on:click={() => {
				modalLoadDefault = true;
			}}>Set Params Default</button
		>
		<button
			on:click={() => {
				modalLoadLocal = true;
			}}>Load Params from localStorage</button
		>
		<ModalDiag
			bind:modalOpen={modalLoadDefault}
			okName="Overwrite Parameters"
			okFunc={loadDefaults}>Load the default parameters ?</ModalDiag
		>
		<ModalDiag bind:modalOpen={modalLoadLocal} okName="Load Parameters" okFunc={loadLocStor}
			><LocStorRead pageName={pDef.partName} bind:storeName={locStorRname} /></ModalDiag
		>
		<p class="load-msg">{loadMsg}</p>
		<table>
			<thead>
				<tr>
					<td>Parameter name</td>
					<td>Value</td>
					<td>Unit</td>
					<td>Default</td>
					<td>Min</td>
					<td>Max</td>
					<td>Step</td>
				</tr>
			</thead>
			<tbody>
				{#each pDef.params as param}
					<tr>
						<td><button on:click={() => paramPict(param.name)}>{param.name}</button></td
						>
						<td>
							{#if param.pType === PType.eNumber}
								<input
									type="number"
									bind:value={$storePV[pDef.partName][param.name]}
									min={param.min}
									max={param.max}
									step={param.step}
									on:change={paramChange}
									class="input-number"
								/>
								<input
									type="range"
									bind:value={$storePV[pDef.partName][param.name]}
									min={param.min}
									max={param.max}
									step={param.step}
									on:change={paramChange}
								/>
							{:else if param.pType === PType.eCheckbox}
								<select bind:value={$storePV[pDef.partName][param.name]}>
									{#each ['Off', 'On'] as one, idx}
										<option value={idx}>{one}</option>
									{/each}
								</select>
							{:else}
								<select bind:value={$storePV[pDef.partName][param.name]}>
									{#each param.dropdown as one, idx}
										<option value={idx}>{one}</option>
									{/each}
								</select>
							{/if}
						</td>
						<td>{param.unit}</td>
						<td>{param.init}</td>
						<td>{param.min}</td>
						<td>{param.max}</td>
						<td>{param.step}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<div class="comment">
			<label for="inComment">Comment:</label>
			<input type="text" id="inComment" bind:value={inputComment} maxlength="150" size="70" />
		</div>
		<button on:click={dowloadParams}>Save Parameters to File</button>
		<button on:click={openModalUrl}>Save Parameters as URL</button>
		<button
			on:click={() => {
				modalSaveLocal = true;
			}}>Save Parameters to localStorage</button
		>
		<ModalDiag bind:modalOpen={modalSaveUrl} okName="Done" okFunc={saveAsUrl}
			><p>Copy this URL and send it to your friends!</p>
			<p class="cUrl">{pUrl}</p></ModalDiag
		>
		<ModalDiag
			bind:modalOpen={modalSaveLocal}
			okName="Save into localStorage"
			okFunc={saveInLocStor}
			><LocStorWrite pageName={pDef.partName} bind:storeName={locStorWname} /></ModalDiag
		>
	</main>
	<img src={paramSvg} alt={paramSvg} />
	<div class="mini-canvas">
		<SimpleDrawing pageName={pDef.partName} {geom} {face} {simTime} />
	</div>
</section>

<style lang="scss">
	@use '$lib/style/colors.scss';
	@use '$lib/style/styling.scss';

	section > h2 {
		@include styling.mix-h2;
	}
	section > main {
		display: inline-block;
	}
	section > main > label.fileUpload {
		display: inline-block;
		height: 1.2rem;
		/*width: 1.6rem;*/
		color: colors.$timectrl-sign;
		font-size: 0.8rem;
		font-weight: 400;
		padding: 0.1rem 0.4rem 0.1rem;
		border-style: solid;
		border-width: 0.1rem;
		border-radius: 0.2rem;
		border-color: colors.$timectrl-sign;
		margin: 0.5rem;
		background-color: colors.$timectrl-bg;
	}
	section > main > input[type='file'] {
		display: none;
	}
	section > main > p.load-msg {
		font-size: 0.8rem;
		font-weight: 400;
		margin: 0.2rem;
		margin-left: 0.5rem;
	}
	section > main > table {
		font-size: 0.8rem;
		font-weight: 400;
		margin: 0.2rem 0.5rem 0.2rem;
	}
	section > main > table > thead {
		background-color: colors.$table-head;
	}
	section > main > table > tbody {
		background-color: colors.$table-body;
	}
	section > main > table > thead > tr > td,
	section > main > table > tbody > tr > td {
		padding-left: 0.4rem;
		padding-right: 0.4rem;
	}
	section > main > table > tbody > tr > td > button {
		color: colors.$timectrl-sign;
		background-color: transparent;
		border: 0;
	}
	section > main > table > tbody > tr > td > input {
		height: 0.8rem;
	}
	section > main > table > tbody > tr > td > input.input-number {
		width: 5rem;
	}
	section > main > div.comment {
		font-size: 0.8rem;
		margin-left: 0.5rem;
	}
	section > main > button {
		@include styling.mix-button;
	}
	p.cUrl {
		margin: 0 1rem 0;
	}
	section > img {
		margin: 0.2rem;
		font-size: 0.6rem;
		background-color: colors.$mini-picture;
		vertical-align: top;
		position: sticky;
		z-index: 1;
		top: 0.5rem;
	}
	section > div.mini-canvas {
		display: inline-block;
		margin: 0.2rem;
		vertical-align: top;
		position: sticky;
		z-index: 1;
		top: 0.5rem;
	}
</style>
