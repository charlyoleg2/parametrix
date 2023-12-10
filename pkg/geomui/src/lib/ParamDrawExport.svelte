<script lang="ts">
	import type { tParamDef, tGeomFunc, tSubDesign, tAllLink } from 'geometrix';
	import {
		c_ParametrixAll,
		EFormat,
		fileBinContent,
		fileTextContent,
		fileSuffix,
		fileMime,
		fileBin
	} from 'geometrix';
	import InputParams from './InputParams.svelte';
	import Drawing from './Drawing.svelte';
	import SubDesign from './SubDesign.svelte';
	import { storePV } from './storePVal';

	export let pDef: tParamDef;
	export let fgeom: tGeomFunc;
	export let pLink: tAllLink;

	function checkWarn(txt: string) {
		let rWarn = true;
		const re = /warn/i;
		if (txt.search(re) < 0) {
			rWarn = false;
		}
		return rWarn;
	}
	let optFaces: string[] = [];
	let exportFace: string;
	let selFace: string;
	let simTime = 0;
	// log and paramChange
	let logValue = 'Dummy initial\nWill be replaced during onMount\n';
	let calcErr = false;
	let calcWarn = false;
	let subD: tSubDesign = {};
	function paramChange2(iPageName: string) {
		const mydate = new Date().toLocaleTimeString();
		logValue = `Geometry ${iPageName} computed at ${mydate}\n`;
		const geome = fgeom(simTime, $storePV[pDef.partName]);
		logValue += geome.logstr;
		calcErr = geome.calcErr;
		calcWarn = checkWarn(geome.logstr);
		optFaces = Object.keys(geome.fig);
		exportFace = 'zip';
		//geomRedraw(simTime);
		subD = geome.sub;
	}
	function paramChange() {
		paramChange2(pDef.partName);
	}
	$: paramChange2(pDef.partName); // for reactivity on page change
	// export drawings
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
	async function downloadExport(iExportFace: string) {
		//console.log(`dbg883: exportFace ${exportFace}`);
		const reSvg = /^svg_/;
		const reDxf = /^dxf_/;
		let iExportFormat = EFormat.eSVG;
		let eFace = '';
		let nFace = 'all';
		if (exportFace.match(reSvg)) {
			iExportFormat = EFormat.eSVG;
			eFace = exportFace.replace(reSvg, '');
			nFace = eFace;
		} else if (exportFace.match(reDxf)) {
			iExportFormat = EFormat.eDXF;
			eFace = exportFace.replace(reDxf, '');
			nFace = eFace;
		} else if (exportFace === 'allsvg') {
			iExportFormat = EFormat.eSVG;
			eFace = c_ParametrixAll;
		} else if (exportFace === 'alldxf') {
			iExportFormat = EFormat.eDXF;
			eFace = c_ParametrixAll;
		} else if (exportFace === 'pax') {
			iExportFormat = EFormat.ePAX;
			eFace = c_ParametrixAll;
		} else if (exportFace === 'oscad') {
			iExportFormat = EFormat.eOPENSCAD;
			eFace = c_ParametrixAll;
		} else if (exportFace === 'ojscad') {
			iExportFormat = EFormat.eJSCAD;
			eFace = c_ParametrixAll;
		} else if (exportFace === 'zip') {
			iExportFormat = EFormat.eZIP;
			eFace = c_ParametrixAll;
		} else {
			console.log(`err883: downloadExport exportFace ${exportFace} invalid`);
		}
		//console.log(`iExportFormat ${iExportFormat}`);
		const fSuffix = fileSuffix(iExportFormat);
		const fMime = fileMime(iExportFormat);
		const fBin = fileBin(iExportFormat);
		const fName = pDef.partName + '_' + nFace + '_' + dateString() + fSuffix;
		if (fBin) {
			const fContent = await fileBinContent(
				fgeom,
				simTime,
				$storePV[pDef.partName],
				iExportFormat
			);
			download_binFile(fName, fContent);
		} else {
			const fContent = fileTextContent(fgeom, $storePV[pDef.partName], eFace, iExportFormat);
			download_textFile(fName, fContent, fMime);
		}
	}
	async function downloadExport2() {
		await downloadExport(exportFace);
	}
</script>

<InputParams {pDef} on:paramChg={paramChange} {fgeom} {selFace} {simTime} />
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
<Drawing {pDef} {fgeom} {optFaces} bind:selFace bind:simTime />
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
	<button on:click={downloadExport2}>Save to File</button>
	<SubDesign {subD} origPartName={pDef.partName} {pLink} />
</section>

<style lang="scss">
	@use './style/colors.scss';
	@use './style/styling.scss';

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
