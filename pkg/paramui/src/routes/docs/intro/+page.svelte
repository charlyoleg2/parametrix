<script lang="ts">
	import { base } from '$app/paths';
	import Carousel from '$lib/Carousel.svelte';
	import OneSlide from '$lib/OneSlide.svelte';
</script>

<h1>Intro of Parametrix</h1>
<Carousel>
	<OneSlide>
		<center><img src="{base}/favicon.svg" style="width: 9em;" alt="Parametrix logo" /></center>
		<div>
			<pre style="font-size:2.5em; margin:0;">Parametrix</pre>
		</div>
	</OneSlide>
	<OneSlide>
		<img
			src="{base}/puisvg/intro_ecosystem.svg"
			style="width: 28em;"
			alt="repositories and packages eco-system"
		/>
		<pre style="font-size:1.2em; margin:0;">Repo, packages, websites and more ...</pre>
	</OneSlide>
</Carousel>

<style lang="scss">
	@use '$lib/style/colors.scss';

	h1 {
		margin: 1rem;
	}
</style>
