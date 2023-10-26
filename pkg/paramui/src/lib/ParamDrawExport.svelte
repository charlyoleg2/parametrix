<script lang="ts">
	import type { tParamDef, tGeomFunc, tSubDesign } from 'geometrix';
	import {
		c_ParametrixAll,
		EFormat,
		fileBinContent,
		fileTextContent,
		fileSuffix,
		fileMime,
		fileBin
	} from 'geometrix';
	import InputParams from '$lib/InputParams.svelte';
	import Drawing from '$lib/Drawing.svelte';
	import SubDesign from '$lib/SubDesign.svelte';
	import { storePV } from '$lib/storePVal';

	export let pDef: tParamDef;
	export let geom: tGeomFunc;

	function checkWarn(txt: string) {
		let rWarn = true;
		const re = /warn/i;
		if (txt.search(re) < 0) {
			rWarn = false;
		}
		return rWarn;
	}
	let optFaces: string[] = [];
	let face: string;
	let simTime = 0;
	// log and paramChange
	let logValue = 'Dummy initial\nWill be replaced during onMount\n';
	let calcErr = false;
	let calcWarn = false;
	let subD: tSubDesign = {};
	function paramChange2(iPageName: string) {
		const mydate = new Date().toLocaleTimeString();
		logValue = `Geometry ${iPageName} computed at ${mydate}\n`;
		const geome = geom(simTime, $storePV[pDef.partName]);
		logValue += geome.logstr;
		calcErr = geome.calcErr;
		calcWarn = checkWarn(geome.logstr);
		optFaces = Object.keys(geome.fig);
		//geomRedraw(simTime);
		subD = geome.sub;
	}
	function paramChange() {
		paramChange2(pDef.partName);
	}
	$: paramChange2(pDef.partName); // for reactivity on page change
	// export drawings
	let exportFace: string;
	function download_binFile(fName: string, fContent: Blob) {
		//create temporary an invisible element
		const elem_a_download = document.createElement('a');
		//const payload = 'data:' + fMime + ';base64,' + fContent;
		const payload = URL.createObjectURL(fContent);
		elem_a_download.setAttribute('href', payload);
		elem_a_download.setAttribute('download', fName);
		//document.body.appendChild(elem_a_download); // it does not seem required to append the element to the DOM to use it
		elem_a_download.click();
		//document.body.removeChild(elem_a_download);
		elem_a_download.remove(); // Is this really required?
		URL.revokeObjectURL(payload);
	}
	function download_textFile(fName: string, fContent: string, fMime: string) {
		//create temporary an invisible element
		const elem_a_download = document.createElement('a');
		const payload = 'data:' + fMime + ';utf-8,' + encodeURIComponent(fContent);
		elem_a_download.setAttribute('href', payload);
		elem_a_download.setAttribute('download', fName);
		//document.body.appendChild(elem_a_download); // it does not seem required to append the element to the DOM to use it
		elem_a_download.click();
		//document.body.removeChild(elem_a_download);
		elem_a_download.remove(); // Is this really required?
	}
	function dateString(): string {
		const re1 = /[-:]/g;
		const re2 = /\..*$/;
		const rDateStr = new Date()
			.toISOString()
			.replace(re1, '')
			.replace(re2, '')
			.replace('T', '_');
		return rDateStr;
	}
	async function downloadExport() {
		//console.log(`dbg883: exportFace ${exportFace}`);
		const reSvg = /^svg_/;
		const reDxf = /^dxf_/;
		let exportFormat = EFormat.eSVG;
		let eFace = '';
		let nFace = 'all';
		if (exportFace.match(reSvg)) {
			exportFormat = EFormat.eSVG;
			eFace = exportFace.replace(reSvg, '');
			nFace = eFace;
		} else if (exportFace.match(reDxf)) {
			exportFormat = EFormat.eDXF;
			eFace = exportFace.replace(reDxf, '');
			nFace = eFace;
		} else if (exportFace === 'allsvg') {
			exportFormat = EFormat.eSVG;
			eFace = c_ParametrixAll;
		} else if (exportFace === 'alldxf') {
			exportFormat = EFormat.eDXF;
			eFace = c_ParametrixAll;
		} else if (exportFace === 'pax') {
			exportFormat = EFormat.ePAX;
			eFace = c_ParametrixAll;
		} else if (exportFace === 'oscad') {
			exportFormat = EFormat.eOPENSCAD;
			eFace = c_ParametrixAll;
		} else if (exportFace === 'ojscad') {
			exportFormat = EFormat.eJSCAD;
			eFace = c_ParametrixAll;
		} else if (exportFace === 'zip') {
			exportFormat = EFormat.eZIP;
			eFace = c_ParametrixAll;
		} else {
			console.log(`err883: downloadExport exportFace ${exportFace} invalid`);
		}
		//console.log(`exportFormat ${exportFormat}`);
		const fSuffix = fileSuffix(exportFormat);
		const fMime = fileMime(exportFormat);
		const fBin = fileBin(exportFormat);
		const fName = pDef.partName + '_' + nFace + '_' + dateString() + fSuffix;
		if (fBin) {
			const fContent = await fileBinContent(
				geom,
				simTime,
				$storePV[pDef.partName],
				pDef.partName,
				exportFormat
			);
			download_binFile(fName, fContent);
		} else {
			const fContent = fileTextContent(
				geom,
				$storePV[pDef.partName],
				pDef.partName,
				eFace,
				exportFormat
			);
			download_textFile(fName, fContent, fMime);
		}
	}
</script>

<InputParams {pDef} on:paramChg={paramChange} {geom} {face} {simTime} />
<section>
	<h2>Log</h2>
	<textarea
		rows="5"
		cols="94"
		readonly
		wrap="off"
		value={logValue}
		class:colorErr={calcErr}
		class:colorWarn={calcWarn}
	/>
</section>
<Drawing {pDef} {geom} {optFaces} bind:face bind:simTime />
<section>
	<h2>Export</h2>
	<select bind:value={exportFace}>
		{#each optFaces as optFace}
			<option value="svg_{optFace}">face {optFace} as svg</option>
		{/each}
		<option value="allsvg">all faces merged as svg</option>
		{#each optFaces as optFace}
			<option value="dxf_{optFace}">face {optFace} as dxf</option>
		{/each}
		<option value="alldxf">all faces merged as dxf</option>
		<option value="pax">all faces as pax.json</option>
		<option value="oscad">all faces as openscad.scad</option>
		<option value="ojscad">all faces as OpenJScad.js</option>
		<option value="zip">all faces and more as zip</option>
	</select>
	<button on:click={downloadExport}>Save to File</button>
	<SubDesign {subD} />
</section>

<style lang="scss">
	@use '$lib/style/colors.scss';
	@use '$lib/style/styling.scss';

	section > h2 {
		@include styling.mix-h2;
	}
	section > textarea {
		/*resize: horizontal;*/
		margin-left: 0.5rem;
	}
	section > textarea.colorWarn {
		background-color: colors.$warn-calc-warning;
	}
	section > textarea.colorErr {
		background-color: colors.$warn-calc-error;
	}
	section > button,
	section > select {
		@include styling.mix-button;
	}
</style>
