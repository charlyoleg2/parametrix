<script lang="ts">
	import type { tPageDef } from 'geometrix';

	import DrawingList from '$lib/DrawingList.svelte';
	import ParamDrawExport from '$lib/ParamDrawExport.svelte';

	export let pageDef: tPageDef;
</script>

<h1>{pageDef.pTitle}</h1>
<article>{pageDef.pDescription}</article>
<DrawingList pDef={pageDef.pDef} />
<ParamDrawExport pDef={pageDef.pDef} fgeom={pageDef.pGeom} />

<style lang="scss">
	@use '$lib/style/colors.scss';

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
