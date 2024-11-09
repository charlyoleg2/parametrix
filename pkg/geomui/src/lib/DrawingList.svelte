<script lang="ts">
	import type { tParamDef } from 'geometrix';
	import ModalImg from './ModalImg.svelte';
	import { base } from '$app/paths';

	// props
	interface Props {
		pDef: tParamDef;
	}
	let { pDef }: Props = $props();

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

	// state
	let sModalImg: boolean = $state(false);
	let sSvgPath: string = $state('');

	// derived
	let dSvgList: string[] = $derived(getSvgList(pDef).map((iSvg) => `${base}/pgdsvg/${iSvg}`));

	// actions
	function showSvg(iSvgPath: string) {
		sSvgPath = iSvgPath;
		//console.log(`dbg231: sSvgPath: ${sSvgPath}`);
		sModalImg = true;
	}
</script>

<section>
	<ModalImg bind:modalOpen={sModalImg} svgPath={sSvgPath} />
	{#each dSvgList as iSvg}
		<button onclick={() => showSvg(iSvg)}>
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
