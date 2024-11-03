<script lang="ts">
	//import type { tParamDef, tGeomFunc, tSubDesign, tAllLink, tCanvasAdjust } from 'geometrix';
	import type { tParamDef, tGeomFunc, tSubDesign, tAllLink, tGeom } from 'geometrix';
	import {
		EFormat,
		fileBinContent,
		fileTextContent,
		fileSuffix,
		fileMime,
		fileBin
		//adjustZero
	} from 'geometrix';
	//import InputParams from './InputParams.svelte';
	//import Drawing from './Drawing.svelte';
	import SubDesign from './SubDesign.svelte';
	import { storePV } from './storePVal.svelte';

	// properties
	interface Props {
		pDef: tParamDef;
		fgeom: tGeomFunc;
		pLink: tAllLink;
	}
	let { pDef, fgeom, pLink }: Props = $props();

	// helper function
	function checkWarn(txt: string) {
		let rWarn = true;
		const re = /warn/i;
		if (txt.search(re) < 0) {
			rWarn = false;
		}
		return rWarn;
	}

	// state
	let simTime: number = $state(0);
	let exportFace: string = $state('zip');
	//let selFace: string = $state('');
	//let zAdjust = $state(adjustZero());

	// derived
	let geome: tGeom = $derived(fgeom(simTime, storePV[pDef.partName]));
	let logValue: string = $derived.by(() => {
		const mydate = new Date().toLocaleTimeString();
		let rLogValue = `Geometry ${pDef.partName} computed at ${mydate}\n`;
		rLogValue += geome.logstr;
		return rLogValue;
	});
	let optFaces: string[] = $derived(Object.keys(geome.fig));
	let calcErr: boolean = $derived(geome.calcErr);
	let calcWarn: boolean = $derived(checkWarn(geome.logstr));
	let subD: tSubDesign = $derived(geome.sub);

	// actions: export drawings
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
		//console.log(`dbg883: iExportFace ${iExportFace}`);
		const reSvg = /^svg_/;
		const reDxf = /^dxf_/;
		let exportFormat = EFormat.eSVG;
		let nFace = 'all';
		if (iExportFace.match(reSvg)) {
			exportFormat = EFormat.eSVG;
			nFace = iExportFace.replace(reSvg, '');
		} else if (iExportFace.match(reDxf)) {
			exportFormat = EFormat.eDXF;
			nFace = iExportFace.replace(reDxf, '');
		} else if (iExportFace === 'allsvg') {
			exportFormat = EFormat.eSVGALL;
		} else if (iExportFace === 'alldxf') {
			exportFormat = EFormat.eDXFALL;
		} else if (iExportFace === 'compute_log') {
			exportFormat = EFormat.eTXTLOG;
		} else if (iExportFace === 'pax') {
			exportFormat = EFormat.ePAX;
		} else if (iExportFace === 'oscad') {
			exportFormat = EFormat.eOPENSCAD;
		} else if (iExportFace === 'ojscad') {
			exportFormat = EFormat.eJSCAD;
		} else if (iExportFace === 'freecad') {
			exportFormat = EFormat.eFREECAD;
		} else if (iExportFace === 'zip') {
			exportFormat = EFormat.eZIP;
		} else {
			console.log(`err883: downloadExport iExportFace ${iExportFace} invalid`);
		}
		//console.log(`exportFormat ${exportFormat}`);
		const fSuffix = fileSuffix(exportFormat);
		const fMime = fileMime(exportFormat);
		const fBin = fileBin(exportFormat);
		const fName = pDef.partName + '_' + nFace + '_' + dateString() + fSuffix;
		if (fBin) {
			const fContent = await fileBinContent(
				fgeom,
				simTime,
				storePV[pDef.partName],
				pDef,
				exportFormat
			);
			download_binFile(fName, fContent);
		} else {
			const fContent = fileTextContent(
				fgeom,
				storePV[pDef.partName],
				pDef,
				nFace,
				exportFormat
			);
			download_textFile(fName, fContent, fMime);
		}
	}
	async function downloadExport2() {
		await downloadExport(exportFace);
	}
</script>

<!--InputParams {pDef} {paramChange} {fgeom} {selFace} {zAdjust} {simTime} /-->
<section>
	<h2>Log</h2>
	<textarea
		rows="5"
		cols="94"
		readonly
		wrap="soft"
		value={logValue}
		class:colorErr={calcErr}
		class:colorWarn={calcWarn}
	></textarea>
</section>
<!--Drawing {pDef} {fgeom} {optFaces} bind:selFace bind:zAdjust bind:simTime /-->
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
		<option value="compute_log">compute.log as log-file</option>
		<option value="pax">all faces as pax.json</option>
		<option value="oscad">all faces as openscad.scad</option>
		<option value="ojscad">all faces as OpenJScad.js</option>
		<option value="freecad">all faces as Freecad.py</option>
		<option value="zip">all faces and more as zip</option>
	</select>
	<button onclick={downloadExport2}>Save to File</button>
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
