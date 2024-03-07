<script lang="ts">
	//import type { tOkFunc } from './ModalDiag.svelte';
	import ModalDiag from './ModalDiag.svelte';
	import ModalImg from './ModalImg.svelte';
	import LocStorWrite from './LocStorWrite.svelte';
	import LocStorRead from './LocStorRead.svelte';
	import SimpleDrawing from './SimpleDrawing.svelte';
	import type { tParam, tParamDef, tParamVal, tGeomFunc } from 'geometrix';
	import { PType, parseParamFile, createParamFile } from 'geometrix';
	import { storePV } from './storePVal';
	import { downloadParams, generateUrl } from './downloadParams';
	import { onMount, createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	const dispatch = createEventDispatcher();

	export let pDef: tParamDef;
	export let fgeom: tGeomFunc;
	export let selFace: string;
	export let simTime = 0;

	let inputComment = '';

	// initialization
	function paramChange() {
		dispatch('paramChg', { foo: 'bla' });
	}
	// tolerant applyParamVal
	function tolerantApply(iPartName: string, ipVal: tParamVal): [string, boolean] {
		let rMsg = '';
		// partName
		let applyWarn1 = false;
		if (iPartName !== pDef.partName) {
			rMsg += `warn361: read partName: '${iPartName}'  expected partName: '${pDef.partName}'\n`;
			applyWarn1 = true;
		}
		// forward
		let cover = 0;
		let uncover = 0;
		let equal = 0;
		const pNameList: string[] = [];
		for (const p of pDef.params) {
			pNameList.push(p.name);
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
		// backward
		let notInScope = 0;
		for (const pa of Object.keys(ipVal)) {
			if (!pNameList.includes(pa)) {
				notInScope += 1;
				rMsg += `warn363: parameter ${pa} not in the scope of the design (${notInScope})\n`;
			}
		}
		const applyWarn2 = notInScope > 0 ? true : false;
		const loadDate = new Date().toLocaleTimeString();
		rMsg += `Params loaded at ${loadDate} :`;
		rMsg += ` def-nb: ${Object.keys(pDef.params).length}`;
		rMsg += `, cover-nb: ${cover}, uncover-nb: ${uncover}\n`;
		rMsg += ` load-nb: ${Object.keys(ipVal).length}`;
		rMsg += `, equal-nb: ${equal}, changed-nb: ${cover - equal}`;
		rMsg += `, out-of-scope: ${notInScope}`;
		const rApplyWarn = applyWarn1 || applyWarn2;
		return [rMsg, rApplyWarn];
	}
	//function initParams1() {
	//	for (const p of pDef.params) {
	//		$storePV[pDef.partName][p.name] = p.init;
	//	}
	//}
	// load parameters
	let loadMsg = '';
	let applyWarn = false;
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
			//console.log(`dbg072: pVal2.length ${Object.keys(pVal2).length}`);
			if (Object.keys(pVal2).length > 0) {
				[loadMsg, applyWarn] = tolerantApply(pDef.partName, pVal2);
			}
		}
	}
	// Bug? No initialization when loading page! Keep the previous values!
	//initParams1();
	function forceInit() {
		initParams2();
		paramChange();
	}
	onMount(() => {
		forceInit();
	});
	// workaround because $page.url.searchParams contains the new value with some delay
	//function delay(milliseconds: number) {
	//	return new Promise((resolve) => {
	//		setTimeout(resolve, milliseconds);
	//	});
	//}
	//async function forceInit2(partName: string) {
	//	await delay(1000);
	//	console.log(`dbg081: forceInit: partName ${partName} url ${$page.url}`);
	//	forceInit(partName);
	//}
	//$: forceInit2(pDef.partName);
	// end of the workaround
	function loadParams(iStr: string) {
		try {
			const [paramJson] = parseParamFile(iStr);
			[loadMsg, applyWarn] = tolerantApply(paramJson.partName, paramJson.pVal);
			inputComment = paramJson.comment;
			paramChange();
		} catch (emsg) {
			let errMsg = 'err723: error by parsing parameter file\n';
			errMsg += emsg as string;
			loadMsg = errMsg;
			applyWarn = true;
		}
	}
	// load from file
	async function loadFile(fileP: File) {
		const fText = await fileP.text();
		loadParams(fText);
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
	function downloadParams2() {
		downloadParams(pDef.partName, $storePV[pDef.partName], inputComment);
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
		[loadMsg, applyWarn] = tolerantApply(pDef.partName, pInit);
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
					loadMsg = `Warn157: localStorage key ${storeKey} is null`;
					applyWarn = true;
				} else {
					loadParams(storeStr);
				}
			}
		} else {
			loadMsg = 'Warn239: No valid name for loading from localStorage!';
			applyWarn = true;
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
			const storeAllStr = createParamFile(
				lastModif,
				pDef.partName,
				$storePV[pDef.partName],
				inputComment
			);
			//console.log(`save in localStorage ${storeKey}`);
			if (browser) {
				window.localStorage.setItem(storeKey, storeAllStr);
			}
		} else {
			console.log('Warn639: No valid name for writing to localStorage!');
		}
	}
	// Save as URL
	let pUrl = '';
	function generateUrl2(): string {
		const url1 = generateUrl($page.url.href, $storePV[pDef.partName], false);
		return url1.toString();
	}
	function openModalUrl() {
		pUrl = generateUrl2();
		modalSaveUrl = true;
	}
	function saveAsUrl() {
		//console.log(`dbg244: voila`);
	}
	// parameter picture
	let paramSvg = `${base}/pgdsvg/default_param_blank.svg`;
	function paramPict(keyName: string) {
		//console.log(`dbg783: ${keyName}`);
		// convention for the file-names of the parameter description
		//paramSvg = `${base}/pgdsvg/${pDef.partName}_${keyName}.svg`;
		paramSvg = `${base}/pgdsvg/default_param_blank.svg`;
		if (Object.keys(pDef.paramSvg).includes(keyName)) {
			paramSvg = `${base}/pgdsvg/${pDef.paramSvg[keyName]}`;
		}
	}
	function paramPict2(idx: number, pDef_page: string) {
		const paramNb = Object.keys($storePV[pDef_page]).length;
		if (idx < paramNb) {
			paramPict(Object.keys($storePV[pDef_page])[idx]);
		}
	}
	$: paramPict2(0, pDef.partName);
	let modalImg = false;
	function showSvg() {
		//console.log(`dbg231: svgPath: ${svgPath}`);
		modalImg = true;
	}
	// hierarchical table
	interface tHTableSection {
		sectionName: string;
		sectionID: string;
		sectionVisible: boolean;
		params: tParam[];
	}
	type tHTableVis = Record<string, boolean>;
	function makeHTable(iParams: tParam[]): tHTableSection[] {
		const rHTable: tHTableSection[] = [];
		const sectionMain: tHTableSection = {
			sectionName: 'main',
			sectionID: 'g0main',
			sectionVisible: true,
			params: []
		};
		let section = sectionMain;
		let sectionID = 0;
		for (const param of iParams) {
			if (param.pType === PType.eSectionSeparator) {
				rHTable.push(section);
				sectionID += 1;
				const sectionNew: tHTableSection = {
					sectionName: param.name,
					sectionID: `g${sectionID}${param.name}`,
					sectionVisible: false,
					params: []
				};
				section = sectionNew;
			} else {
				section.params.push(param);
			}
		}
		rHTable.push(section);
		return rHTable;
	}
	function makeHTableVis(iHTable: tHTableSection[]): tHTableVis {
		const rVis: tHTableVis = {};
		for (const section of iHTable) {
			rVis[section.sectionID] = section.sectionVisible;
		}
		return rVis;
	}
	let htable = makeHTable(pDef.params);
	let htableVis = makeHTableVis(htable);
	$: {
		htable = makeHTable(pDef.params);
		htableVis = makeHTableVis(htable);
	}
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
		<textarea
			rows="3"
			cols="80"
			readonly
			wrap="off"
			value={loadMsg}
			class:colorWarn={applyWarn}
		/>
		<table>
			<thead>
				<tr>
					<td>&#35;</td>
					<td>Parameter name</td>
					<td>Value</td>
					<td>Unit</td>
					<td>Default</td>
					<td>Min</td>
					<td>Max</td>
					<td>Step</td>
				</tr>
			</thead>
			{#each htable as sect, sidx}
				<tr class="separator">
					<td>{sidx + 1}</td>
					<td colspan="5">{sect.sectionName}</td>
					<td colspan="2">
						<select bind:value={htableVis[sect.sectionID]}>
							{#each ['Off', 'On'] as one, idx}
								<option value={idx}>{one}</option>
							{/each}
						</select>
					</td>
				</tr>
				<tbody>
					{#each sect.params as param, pidx}
						<tr class:changed={$storePV[pDef.partName][param.name] !== param.init}>
							<td>{sidx + 1}.{pidx + 1}</td>
							<td
								><button on:click={() => paramPict(param.name)}>{param.name}</button
								></td
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
								{:else if param.pType === PType.eDropdown}
									<select bind:value={$storePV[pDef.partName][param.name]}>
										{#each param.dropdown as one, idx}
											<option value={idx}>{one}</option>
										{/each}
									</select>
								{:else}
									unknown
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
			{/each}
		</table>
		<div class="comment">
			<label for="inComment">Comment:</label>
			<input type="text" id="inComment" bind:value={inputComment} maxlength="150" size="70" />
		</div>
		<button on:click={downloadParams2}>Save Parameters to File</button>
		<button on:click={openModalUrl}>Save Parameters as URL</button>
		<button
			on:click={() => {
				modalSaveLocal = true;
			}}>Save Parameters to localStorage</button
		>
		<ModalDiag bind:modalOpen={modalSaveUrl} okName="Done" okFunc={saveAsUrl} sizeLarge={true}
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
	<ModalImg bind:modalOpen={modalImg} svgPath={paramSvg} />
	<button on:click={showSvg} class="side-img">
		<img src={paramSvg} alt={paramSvg} />
	</button>
	<div class="mini-canvas">
		<SimpleDrawing pageName={pDef.partName} {fgeom} {selFace} {simTime} />
	</div>
</section>

<style lang="scss">
	@use './style/colors.scss';
	@use './style/styling.scss';

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
	section > main > textarea {
		display: block;
		/*resize: horizontal;*/
		font-size: 0.8rem;
		font-weight: 400;
		margin: 0.2rem;
		margin-left: 0.5rem;
	}
	section > main > textarea.colorWarn {
		background-color: colors.$warn-calc-warning;
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
	section > main > table > tbody > tr.changed {
		background-color: colors.$table-line-changed;
	}
	section > main > table > tr.separator {
		background-color: colors.$table-line-separator;
	}
	section > main > table > thead > tr > td,
	section > main > table > tr > td,
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
	section > button.side-img {
		margin: 0.2rem;
		border: none;
		padding: 0;
		font-size: 0.6rem;
		background-color: colors.$mini-picture;
		vertical-align: top;
		position: sticky;
		z-index: 1;
		top: 0.5rem;
	}
	section > button.side-img > img {
		max-width: 200px;
		max-height: 200px;
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
