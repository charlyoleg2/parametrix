<script lang="ts">
	import ParamDrawExport from '$lib/ParamDrawExport.svelte';
	export let data;
</script>

<h1>{data.pageDef.pTitle}</h1>
<article>{data.pageDef.pDescription}</article>
<!--article>Category: {data.category}</article-->
<ParamDrawExport pDef={data.pageDef.pDef} geom={data.pageDef.pGeom} />

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
