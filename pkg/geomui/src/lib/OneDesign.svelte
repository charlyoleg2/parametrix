<script lang="ts">
	import type { tPageDef, tAllLink } from 'geometrix';

	import { incrStore } from './initStore';
	import DrawingList from './DrawingList.svelte';
	import ParamDrawExport from './ParamDrawExport.svelte';

	interface Props {
		pageDef: tPageDef;
		pLink: tAllLink;
	}

	let { pageDef, pLink }: Props = $props();

	incrStore(pageDef); // TODO5 do we need $derived or $effect
</script>

<h1>{pageDef.pTitle}</h1>
<article>[{pageDef.pDef.partName}]: {pageDef.pDescription}</article>
<DrawingList pDef={pageDef.pDef} />
<ParamDrawExport pDef={pageDef.pDef} fgeom={pageDef.pGeom} {pLink} />

<style lang="scss">
	@use './style/colors.scss';

	h1 {
		margin: 1rem 1rem 0;
	}
	article {
		font-size: 1rem;
		font-weight: 400;
		font-style: italic;
		margin: 0 1rem 2rem;
	}
</style>
