<script lang="ts">
	import CadEcosystem from '$lib/CadEcosystem.svelte';
</script>

<h1>CAD ecosystem</h1>
<article>
	Below a list of open-source CAD software sorted by family of technologies.
	<CadEcosystem />
</article>

<style lang="scss">
	@use '$lib/style/colors.scss';

	h1 {
		margin: 1rem;
	}
	article {
		margin: 1rem;
	}
</style>
