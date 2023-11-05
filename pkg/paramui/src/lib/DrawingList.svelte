<script lang="ts">
	import type { tParamDef } from 'geometrix';
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
			console.log(`dummy022: partName ${partName}`);
		}
		const lList = getSvgList(pDef);
		const rList2: string[] = [];
		for (const svg of lList) {
			rList2.push(`${base}/${svg}`);
		}
		return rList2;
	}
	// initialization
	let lSvg: string[] = [];
	// reactivity
	$: lSvg = getSvgList2(pDef.partName);
</script>

<section>
	{#each lSvg as iSvg}
		<img src={iSvg} alt={iSvg} />
	{/each}
</section>

<style lang="scss">
	@use '$lib/style/colors.scss';
	@use '$lib/style/styling.scss';

	section {
		margin: 1rem;
	}
	section > img {
		max-width: 200px;
		max-height: 200px;
		margin: 0.2rem;
		font-size: 0.6rem;
		background-color: colors.$mini-picture;
	}
</style>
