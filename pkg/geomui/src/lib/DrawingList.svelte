<script lang="ts">
	import type { tParamDef } from 'geometrix';
	import ModalImg from './ModalImg.svelte';
	//import { onMount } from 'svelte';
	//import { browser } from '$app/environment';
	import { base } from '$app/paths';

	export let pDef: tParamDef;

	// helper function
	function getSvgList(ipDef: tParamDef): string[] {
		const rList: string[] = [];
		for (const value of Object.values(ipDef.paramSvg)) {
			if (!rList.includes(value)) {
				rList.push(value);
			}
		}
		return rList;
	}
	function getSvgList2(partName: string): string[] {
		// fake using partName. partName is needed for the reactivity
		if (partName === 'impossible_part_name') {
			//console.log(`dummy022: partName ${partName}`);
		}
		const lList = getSvgList(pDef);
		const rList2: string[] = [];
		for (const svg of lList) {
			rList2.push(`${base}/pgdsvg/${svg}`);
		}
		return rList2;
	}
	// initialization
	let lSvg: string[] = [];
	// reactivity
	$: lSvg = getSvgList2(pDef.partName);
	// modalImg
	let modalImg = false;
	let svgPath: string;
	function showSvg(iSvgPath: string) {
		svgPath = iSvgPath;
		//console.log(`dbg231: svgPath: ${svgPath}`);
		modalImg = true;
	}
</script>

<section>
	<ModalImg bind:modalOpen={modalImg} {svgPath} />
	{#each lSvg as iSvg}
		<button on:click={() => showSvg(iSvg)}>
			<img src={iSvg} alt={iSvg} />
		</button>
	{/each}
</section>

<style lang="scss">
	@use './style/colors.scss';
	@use './style/styling.scss';

	section {
		margin: 1rem;
	}
	section > button {
		margin: 0.2rem;
		border: none;
		padding: 0;
		font-size: 0.6rem;
		background-color: colors.$mini-picture;
	}
	section > button > img {
		max-width: 200px;
		max-height: 200px;
	}
</style>
