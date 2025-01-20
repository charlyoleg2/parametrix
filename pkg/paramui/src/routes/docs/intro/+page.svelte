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
		<pre style="font-size:2.5em; margin:0;">Parametrix</pre>
		<pre style="font-size:2em; margin:1em;">CAD as code</pre>
		<pre class="nomar">&gt; Git friendly</pre>
		<pre class="nomar">&gt;&gt; traceability, history, versioning</pre>
		<pre class="nomar">&gt;&gt; collaboration, sharing, backup</pre>
		<pre class="nomar">&gt; CAD developed like software</pre>
		<pre class="nomar">&gt;&gt; CI/CD</pre>
	</OneSlide>
	<OneSlide>
		<pre style="font-size:2.5em; margin:0;">Parametrix</pre>
		<pre style="font-size:2em; margin:1em;">CAD as code</pre>
		<pre style="font-size:1.2em; color:Orange;">Yes, but all CAD tools have an API!</pre>
	</OneSlide>
	<OneSlide>
		<pre class="minititle">Indeed, but 3 main advantages with Parametrix</pre>
		<pre class="point">1- Written in Modern Javascript</pre>
		<pre class="blabla">Run in CLI and Browser</pre>
		<pre class="blabla">Design easy to share via websites and packages</pre>
		<pre class="point">2- Durability of your 3D modeling</pre>
		<pre class="blabla">Parametrix is Open source and lightweight</pre>
		<pre class="blabla">(geometrix: 6k, geomui: 3k, geomcli: 1k)</pre>
		<pre class="point">3- Independance from CAD tools</pre>
		<pre class="blabla">Model first then choose your CAD tool</pre>
	</OneSlide>
	<OneSlide>
		<pre class="minititle">And other benefits</pre>
		<pre class="pointb">4- Documented parameters</pre>
		<pre class="pointb">5- Make easily your Web-UI and CLI</pre>
		<pre class="blabla">Just in few lines of code</pre>
		<pre class="pointb">6- 2D simulations</pre>
		<pre class="blabla">Examples for kinetic and optic simulations</pre>
		<pre class="pointb">7- API optimized for manufacturing</pre>
		<pre class="pointb">8- Extendable API via npm-package</pre>
		<pre class="blabla">API for metal sheet, API for architecture</pre>
	</OneSlide>
	<OneSlide>
		<img
			src="{base}/puisvg/intro_workflow.svg"
			style="width: 28em;"
			alt="The parametrix workflow"
		/>
		<!--pre style="font-size:1.2em; margin:0;">The Parametrix workflow</pre-->
	</OneSlide>
	<OneSlide>
		<img
			src="{base}/puisvg/prez_parametrix_condensed.svg"
			style="width: 28em;"
			alt="Parametrix described in condensed"
		/>
		<p style="text-align:center; margin: 0.5rem">Parametrix in condensed</p>
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
	pre.nomar {
		margin: 0;
	}
	pre.minititle {
		font-size: 1em;
		color: Green;
		margin: 0;
	}
	pre.point {
		font-size: 1.4em;
		margin: 1em 0 0.2em;
	}
	pre.pointb {
		font-size: 1.2em;
		margin: 0.6em 0 0.2em;
	}
	pre.blabla {
		font-size: 1em;
		margin: 0 3em 0;
	}
</style>
