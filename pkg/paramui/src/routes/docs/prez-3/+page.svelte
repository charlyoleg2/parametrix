<script lang="ts">
	import { base } from '$app/paths';
	import Carousel from '$lib/Carousel.svelte';
	import OneSlide from '$lib/OneSlide.svelte';
</script>

<h1>Presentation of Parametrix</h1>
<Carousel>
	<OneSlide>
		<center><img src="{base}/favicon.svg" style="width: 9em;" alt="Parametrix logo" /></center>
		<div>
			<pre style="font-size:2.5em; margin:0;">Parametrix</pre>
		</div>
	</OneSlide>
	<OneSlide>
		<pre style="font-size:2.5em; margin:0;">Parametrix</pre>
		<pre style="font-size:2em; margin:1em;">For modeling 3D shapes</pre>
		<pre class="nomar">Run in the browser</pre>
	</OneSlide>
	<OneSlide>
		<pre class="point">One HTML page = one 3D design</pre>
		<pre class="nomar">The 3D design is encoded in the <i>javascript</i> of the page</pre>
		<pre class="nomar">Easy to share 3D design</pre>
		<pre class="nomar">No installation</pre>
		<pre class="nomar">Parametrisable</pre>
	</OneSlide>
	<OneSlide>
		<pre class="point">3D as 2D extrapolation</pre>
		<pre class="nomar">Small <i>javascript</i></pre>
		<pre class="nomar">Small processing</pre>
		<pre class="nomar">Small <i>generated</i> data</pre>
	</OneSlide>
	<OneSlide>
		<pre class="point">Externalisation of 3D visualisation</pre>
		<pre class="nomar">Smaller javascript</pre>
		<pre class="nomar">Faster loading</pre>
	</OneSlide>
	<OneSlide>
		<pre class="point">Externalisation of generation of 3D files</pre>
		<pre class="nomar">Smaller code</pre>
		<pre class="nomar">Simpler code</pre>
		<pre class="nomar">Code for 2D only</pre>
	</OneSlide>
	<OneSlide>
		<pre class="point">Traditional approach</pre>
		<pre class="nomar">Complex 3D boolean operations</pre>
		<pre class="nomar">Complex plan section calculation</pre>
		<pre class="nomar">Lost of arcs</pre>
	</OneSlide>
	<OneSlide>
		<pre class="point">Parametrix approach</pre>
		<pre class="nomar">CNC path derivated from 2D outlines</pre>
		<pre class="nomar">Keep arcs</pre>
		<pre class="nomar">Simple, direct, minimalist calculations</pre>
	</OneSlide>
	<OneSlide>
		<pre class="point">Also deployed with NPM</pre>
		<pre class="nomar">Immediate used with <i>npx</i></pre>
		<pre class="nomar">Installed with <i>npm</i> for offline usage</pre>
		<pre class="nomar">API, CLI and UI</pre>
	</OneSlide>
	<OneSlide>
		<pre class="point">Parametrix is an overlay over 3D and 2D API</pre>
		<pre class="nomar">1- [2D] web canvas</pre>
		<pre class="nomar">2- [2D] svg</pre>
		<pre class="nomar">3- [2D] dxf</pre>
		<pre class="nomar">4- [3D] OpenSCAD</pre>
		<pre class="nomar">5- [3D] FreeCAD</pre>
		<pre class="nomar">6- [3D] JsCAD</pre>
	</OneSlide>
	<OneSlide>
		<pre class="point">Parametrix ecosystem</pre>
		<pre class="nomar">Use 3D files</pre>
		<pre class="nomar">Parametrize existing designs and generate the 3D</pre>
		<pre class="nomar">Create new design</pre>
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
	//pre.minititle {
	//	font-size: 1em;
	//	color: Green;
	//	margin: 0;
	//}
	pre.point {
		font-size: 1.4em;
		margin: 1em 0 0.2em;
	}
	//pre.pointb {
	//	font-size: 1.2em;
	//	margin: 0.6em 0 0.2em;
	//}
	//pre.blabla {
	//	font-size: 1em;
	//	margin: 0 3em 0;
	//}
</style>
