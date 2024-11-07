<script lang="ts">
	//import type { tOkFunc } from './ModalDiag.svelte';
	import ModalDiag from './ModalDiag.svelte';
	import ModalImg from './ModalImg.svelte';
	import LocStorWrite from './LocStorWrite.svelte';
	import LocStorRead from './LocStorRead.svelte';
	import SimpleDrawing from './SimpleDrawing.svelte';
	import type { tParam, tParamDef, tParamVal, Figure } from 'geometrix';
	import { PType, parseParamFile, createParamFile, adjustZero } from 'geometrix';
	import { sParams } from './stateParams.svelte';
	import { sDraw } from './stateDrawing.svelte';
	import { downloadParams, generateUrl } from './downloadParams';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	// props
	interface Props {
		pDef: tParamDef;
		pFig: Figure;
	}
	let { pDef, pFig }: Props = $props();

	// const
	const cAdjustZero = adjustZero();
	// type
	type tHTableVis = Record<string, boolean>;

	// state
	let inputComment: string = $state('');
	let hideColumn: boolean = $state(false);
	let loadMsg: string = $state('');
	let applyWarn: boolean = $state(false);
	let modalLoadDefault: boolean = $state(false);
	let modalLoadLocal: boolean = $state(false);
	let modalSaveUrl: boolean = $state(false);
	let modalSaveLocal: boolean = $state(false);
	let locStorRname: string = $state('');
	let locStorWname: string = $state('');
	let pUrl: string = $state('');
	let paramSvg: string = $state(`${base}/pgdsvg/default_param_blank.svg`);
	let modalImg: boolean = $state(false);
	let htableVis: tHTableVis = $state({});

	// initialization
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
				if (sParams[pDef.partName][p.name] === ipVal[p.name]) {
					equal += 1;
				} else {
					sParams[pDef.partName][p.name] = ipVal[p.name];
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
	function forceInit() {
		initParams2();
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
		downloadParams(pDef.partName, sParams[pDef.partName], inputComment);
	}
	// modal
	function loadDefaults() {
		const pInit: tParamVal = {};
		for (const p of pDef.params) {
			pInit[p.name] = p.init;
		}
		[loadMsg, applyWarn] = tolerantApply(pDef.partName, pInit);
	}
	// load parameters from localStorage
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
	//$: console.log(`dbg888: ${locStorWname}`);
	function saveInLocStor() {
		if (locStorWname !== undefined && locStorWname !== '') {
			const storeKey = `${pDef.partName}_${locStorWname}`;
			const re2 = /\..*$/;
			const lastModif = new Date().toISOString().replace(re2, '');
			const storeAllStr = createParamFile(
				lastModif,
				pDef.partName,
				sParams[pDef.partName],
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
	function generateUrl2(): string {
		const url1 = generateUrl($page.url.href, sParams[pDef.partName], false);
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
	function paramPict(keyName: string) {
		//console.log(`dbg783: ${keyName}`);
		// convention for the file-names of the parameter description
		//paramSvg = `${base}/pgdsvg/${pDef.partName}_${keyName}.svg`;
		if (Object.keys(pDef.paramSvg).includes(keyName)) {
			paramSvg = `${base}/pgdsvg/${pDef.paramSvg[keyName]}`;
		} else {
			paramSvg = `${base}/pgdsvg/default_param_blank.svg`;
		}
	}
	$effect(() => {
		paramPict(pDef.params[0].name);
	});
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
	function makeHTable(iParams: tParam[]): tHTableSection[] {
		const rHTable: tHTableSection[] = [];
		const sectionMain: tHTableSection = {
			sectionName: 'main',
			sectionID: 'g0main',
			sectionVisible: false,
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
					sectionVisible: true,
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
	let htable: tHTableSection[] = $derived(makeHTable(pDef.params));
	// update htableVis when pDef change
	$effect(() => {
		htableVis = makeHTableVis(htable);
	});
	// actions
	function sizeSmall() {
		hideColumn = true;
	}
	function sizeBig() {
		hideColumn = false;
	}
	let dColspanHide1: number = $derived(hideColumn ? 2 : 4);
	let dColspanHide2: number = $derived(hideColumn ? 2 : 3);
	let dCommentSize: number = $derived(hideColumn ? 50 : 70);
</script>

<section>
	<h2>Parameters</h2>
	<main>
		<label for="loadFParams" class="fileUpload">Load Params from File</label>
		<input
			id="loadFParams"
			type="file"
			accept="text/plain, application/json"
			onchange={loadParamFromFile}
		/>
		<button
			onclick={() => {
				modalLoadDefault = true;
			}}>Set Params Default</button
		>
		<button
			onclick={() => {
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
			wrap="soft"
			value={loadMsg}
			class:colorWarn={applyWarn}
		></textarea>
		<table>
			<thead>
				<tr>
					<td>&#35;</td>
					<td>Parameter name</td>
					<td
						>Value<span
							><button onclick={sizeSmall}>&minus;</button><button onclick={sizeBig}
								>+</button
							></span
						></td
					>
					<td class:hideColumn>Unit</td>
					<td class:hideColumn>Default</td>
					<td>Min</td>
					<td>Max</td>
					<td class:hideColumn>Step</td>
				</tr>
			</thead>
			{#each htable as sect, sidx}
				<tbody>
					<tr class="separator">
						<td>{sidx + 1}</td>
						<td colspan={dColspanHide1}>{sect.sectionName}</td>
						<td colspan={dColspanHide2}>
							<label>
								<input type="checkbox" bind:checked={htableVis[sect.sectionID]} />
								<span> </span></label
							>
						</td>
					</tr>
				</tbody>
				<tbody class:collaps={htableVis[sect.sectionID]}>
					{#each sect.params as param, pidx}
						<tr class:changed={sParams[pDef.partName][param.name] !== param.init}>
							<td>{sidx + 1}.{pidx + 1}</td>
							<td
								><button onclick={() => paramPict(param.name)}>{param.name}</button
								></td
							>
							<td>
								{#if param.pType === PType.eNumber}
									<input
										type="number"
										bind:value={sParams[pDef.partName][param.name]}
										min={param.min}
										max={param.max}
										step={param.step}
										class="input-number"
									/>
									<input
										type="range"
										bind:value={sParams[pDef.partName][param.name]}
										min={param.min}
										max={param.max}
										step={param.step}
									/>
								{:else if param.pType === PType.eCheckbox}
									<select bind:value={sParams[pDef.partName][param.name]}>
										{#each ['Off', 'On'] as one, idx}
											<option value={idx}>{one}</option>
										{/each}
									</select>
								{:else if param.pType === PType.eDropdown}
									<select bind:value={sParams[pDef.partName][param.name]}>
										{#each param.dropdown as one, idx}
											<option value={idx}>{one}</option>
										{/each}
									</select>
								{:else}
									unknown
								{/if}
							</td>
							<td class:hideColumn>{param.unit}</td>
							<td class:hideColumn>{param.init}</td>
							<td>{param.min}</td>
							<td>{param.max}</td>
							<td class:hideColumn>{param.step}</td>
						</tr>
					{/each}
				</tbody>
			{/each}
		</table>
		<div class="comment">
			<label for="inComment">Comment:</label>
			<input
				type="text"
				id="inComment"
				bind:value={inputComment}
				maxlength="150"
				size={dCommentSize}
			/>
		</div>
		<button onclick={downloadParams2}>Save Parameters to File</button>
		<button onclick={openModalUrl}>Save Parameters as URL</button>
		<button
			onclick={() => {
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
	<button onclick={showSvg} class="side-img">
		<img src={paramSvg} alt={paramSvg} />
	</button>
	<div class="mini-canvas">
		<SimpleDrawing {pFig} zAdjust={cAdjustZero} />
	</div>
	<div class="mini-canvas">
		<SimpleDrawing {pFig} zAdjust={sDraw.zAdjust} />
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
	section > main > table > thead > tr > td > span {
		margin-left: 5rem;
	}
	section > main > table > thead > tr > td > span > button {
		border: 0;
		padding-left: 1rem;
		padding-right: 1rem;
		border-radius: 30%;
		font-weight: 700;
		color: Blue;
		background-color: LightBlue;
	}
	section > main > table > tbody {
		background-color: colors.$table-body;
	}
	section > main > table > tbody.collaps {
		visibility: collapse;
	}
	section > main > table > tbody > tr.changed {
		background-color: colors.$table-line-changed;
	}
	section > main > table > tbody > tr.separator {
		font-weight: 700;
		background-color: colors.$table-line-separator;
	}
	tr.separator > td {
		text-align: center;
	}
	tr.separator > td > label > input[type='checkbox'] {
		display: none;
	}
	tr.separator > td > label > span {
		height: 8px;
		width: 50px;
		border: 1px solid grey;
		border-radius: 6px;
		background-color: LightBlue;
		position: relative;
		display: inline-block;
	}
	tr.separator > td > label > span::after {
		content: '';
		position: absolute;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: grey;
		top: 0;
		left: 1px;
		display: inline-block;
	}
	tr.separator > td > label > input[type='checkbox']:checked + span {
		background: DarkBlue;
	}
	tr.separator > td > label > input[type='checkbox']:checked + span::after {
		left: 37px;
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
	section > main > table > thead > tr > td.hideColumn,
	section > main > table > tbody > tr > td.hideColumn {
		//visibility: collapse;
		display: none;
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
