<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>Motorized axis</h1>
<article>
	This page sizes the gears and motors for reaching the requirements of a motorized axis.
</article>
<h2>Parameter description</h2>
<article>
	<img src="{base}/torque_requirements.svg" alt="torque requirements" />
	<img src="{base}/axis_param_1.svg" alt="top-level axis parameters" />
	<img src="{base}/gear_ring_overview.svg" alt="gear-ring overview" />
	<img src="{base}/gear_module.svg" alt="gear module" />
	<img src="{base}/epicyclic_gearing.svg" alt="epicyclic gearing" />
</article>
<h2>Theory</h2>
<article></article>
<h2>Numerical application</h2>
<article></article>

<style lang="scss">
	@use '$lib/style/colors.scss';

	h1 {
		margin: 1rem;
		margin-bottom: 0.2rem;
	}
	article {
		margin: 1rem;
		margin-top: 0.2rem;
	}
</style>
