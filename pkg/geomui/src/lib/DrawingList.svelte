<script lang="ts">
	import type { tParamDef } from 'geometrix';
	import ModalImg from './ModalImg.svelte';
	//import { onMount } from 'svelte';
	//import { browser } from '$app/environment';
	//import { base } from '$app/paths';

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
		//const lList = getSvgList(pDef);
		//const rList2: string[] = [];
		//for (const svg of lList) {
		//	rList2.push(`${base}/${svg}`);
		//}
		const rList2 = getSvgList(pDef);
		return rList2;
	}
	// initialization
	let lSvg: string[] = [];
	// reactivity
	$: lSvg = getSvgList2(pDef.partName);
	// modalImg
	let modalImg = false;
	let svgInline: string;
	function showSvg(iSvg: string) {
		svgInline = iSvg;
		modalImg = true;
	}
	/* eslint svelte/no-at-html-tags: "off" */
</script>

<section>
	<ModalImg bind:modalOpen={modalImg} {svgInline} />
	{#each lSvg as iSvg}
		<button on:click={() => showSvg(iSvg)}>
			<!--img src={iSvg} alt={iSvg} /-->
			{#if modalImg}
				<svg height="100" width="100">
					<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
				</svg>
			{:else}
				{@html iSvg}
			{/if}
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
	section > button > svg {
		max-width: 200px;
		max-height: 200px;
	}
</style>
