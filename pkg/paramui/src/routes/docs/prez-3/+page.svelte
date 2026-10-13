<script lang="ts">
	import { asset } from '$app/paths';
	import Carousel from '#lib/Carousel.svelte';
	import OneSlide from '#lib/OneSlide.svelte';
</script>

<h1>Presentation of Parametrix</h1>
<Carousel>
	<OneSlide>
		<center>
			<img
				src={asset('favicon.svg')}
				style="width: 9em;"
				alt="Parametrix logo"
			/>
		</center>

		<div><pre style="font-size:2.5em; margin:0;">Parametrix</pre></div>
	</OneSlide>
	<OneSlide>
		<pre style="font-size:2.5em; margin:0;">Parametrix</pre>
		<pre style="font-size:2em; margin:1em;">For modeling 3D shapes</pre>
		<pre class="nomar">Run in the browser</pre>
	</OneSlide>
	<OneSlide>
		<img
			src={asset('puisvg/prez3_3d_modelling_approaches.svg')}
			style="height: 17em;"
			alt="prez3_3d_modelling_approaches.svg"
		/>
		<!--pre style="font-size:1.2em; margin:0;">The Parametrix workflow</pre-->
	</OneSlide>
	<OneSlide>
		<img
			src={asset('puisvg/prez3_parametrix_support.svg')}
			style="height: 17em;"
			alt="prez3_parametrix_support.svg"
		/>
		<!--pre style="font-size:1.2em; margin:0;">The Parametrix workflow</pre-->
	</OneSlide>
	<OneSlide>
		<img
			src={asset('puisvg/prez3_unified_api.svg')}
			style="height: 17em;"
			alt="prez3_unified_api.svg"
		/>
		<!--pre style="font-size:1.2em; margin:0;">The Parametrix workflow</pre-->
	</OneSlide>
	<OneSlide>
		<img
			src={asset('puisvg/prez3_debug_workflow.svg')}
			style="height: 17em;"
			alt="prez3_debug_workflow.svg"
		/>
		<!--pre style="font-size:1.2em; margin:0;">The Parametrix workflow</pre-->
	</OneSlide>
	<OneSlide>
		<img
			src={asset('puisvg/prez3_generate_gcode.svg')}
			style="height: 12em;"
			alt="prez3_generate_gcode.svg"
		/>
		<pre style="font-size:1.2em; margin:0;"><> Less processing</pre>
		<pre style="font-size:1.2em; margin:0;"><> More accurate outputs</pre>
		<pre style="font-size:1.2em; margin:0;"><> Responsive 2D UI</pre>
	</OneSlide>
	<OneSlide>
		<pre class="point">3D models for makers</pre>
		<img
			src={asset('puisvg/prez3_parametrix_versus.svg')}
			style="height: 5em;"
			alt="prez3_parametrix_versus.svg"
		/>
		<pre class="point2">1- 3D modeling tools</pre>
		<pre class="nomar2">1.1- Open-source: Blender, FreeCAD, OpenSCAD, JsCAD</pre>
		<pre class="nomar2">1.2- Professional: Catia, SolidWorks, OnShape</pre>
		<pre class="nomar2">1.3- Online: Fusion360, SketchUp, TinkerCAD</pre>
		<pre class="point2">2- Predefined & parametrizable 3D shapes</pre>
		<pre class="nomar2">2.1- Parametrix</pre>
		<pre class="point2">3- Sharing platform for 3D models</pre>
		<pre class="nomar2">3.1- makerworld.com</pre>
		<pre class="nomar2">3.2- thingiverse.com</pre>
		<pre class="nomar2">3.3- printables.com</pre>
	</OneSlide>
	<OneSlide>
		<pre class="point">Parametrix, a 3D tool for makers</pre>
		<pre class="nomar"><1> Predefined designs, visit the catalog <i>parametrix.fr</i></pre>
		<pre class="nomar"><2> Easy parametrization in few clicks</pre>
		<pre class="nomar"><3> Modifying without starting from scratch</pre>
		<pre class="nomar"><4> Responsive UI</pre>
		<pre class="nomar"><5> Output coherent design files without bug</pre>
		<pre class="nomar"><6> High quality CAM with arcs</pre>
		<pre class="nomar"><7> No installation</pre>
		<pre class="nomar"><8> No programming skill required</pre>
	</OneSlide>
	<OneSlide>
		<pre class="point">Parametrix, a 3D tool for designer-coder</pre>
		<pre class="nomar"><1> CAD as code : software defined CAD</pre>
		<pre class="nomar"><2> Generate CLI and UI</pre>
		<pre class="nomar"><3> Deploy via <i>npm</i> or <i>static website</i></pre>
		<pre class="nomar"><4> Powerfull Javascript-API</pre>
		<pre class="blabla">  (typically one file of 500 lines per design)</pre>
		<pre class="nomar"><5> Extendable API</pre>
		<pre class="blabla">  (e.g. sheetFold)</pre>
	</OneSlide>
	<OneSlide>
		<pre class="point">Parametrix for system engineering</pre>
		<pre class="nomar2"><F1> Illustration of requirements</pre>
		<pre class="nomar2"><F2> Exploration of system parameters</pre>
		<pre class="nomar2"><F3> Verification of formula</pre>
		<pre class="nomar2"><F4> Simplified 3D model</pre>
		<pre class="blabla2">  Enable the verification of detailed 3D models</pre>
		<img
			src={asset('puisvg/prez3_V_cycle.svg')}
			style="height: 10em; margin: 0.5em 6em 0;"
			alt="prez3_V_cycle.svg"
		/>
		<pre class="nomar2"><R1> CAD as code for traceability</pre>
		<pre class="nomar2"><R2> Light weight / auditable solution</pre>
		<pre class="nomar2"><R3> Simple usage for viewers</pre>
		<pre class="nomar2"><R4> Easy sharing of work products across the origanization</pre>
	</OneSlide>
	<OneSlide>
		<pre class="point">Parametrix, for distributing 3D shapes</pre>
		<pre class="nomar"><1> lightweight encoding of 3D shapes</pre>
		<pre class="nomar"><2> UI for maker</pre>
		<pre class="blabla"><2.1>   Parametrization of the 3D shapes</pre>
		<pre class="blabla"><2.2>   Visualization of the 2D figures</pre>
		<pre class="blabla"><2.3>   Generation of the CAD files</pre>
		<pre class="nomar"><3> Distribution via multi channels</pre>
		<pre class="blabla"><3.1>   HTML page</pre>
		<pre class="blabla"><3.2>   CLI</pre>
		<pre class="blabla"><3.3>   NPM package</pre>
		<pre class="blabla"><3.4>   source code</pre>
		<pre class="nomar"><4> High quality CAM files with arcs</pre>
		<pre class="nomar"><5> No processing on server</pre>
		<pre class="nomar"><6> Ideal for Open-hardware</pre>
	</OneSlide>
	<OneSlide>
		<pre class="point">One HTML page = one 3D design</pre>
		<pre class="nomar">The 3D design is encoded in the <i>javascript</i> of the page</pre>
		<pre class="nomar">Easy to share 3D design</pre>
		<pre class="nomar">No installation</pre>
		<pre class="nomar">No processing on server (i.e. green IT)</pre>
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
		<pre class="point">Parametrix = overlay over 3D and 2D API</pre>
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
	<OneSlide>
		<pre class="point">3D design in JS with parameters</pre>
		<pre class="nomar">Parametrisable</pre>
		<pre class="nomar">Reduce the number 3D designs</pre>
		<pre class="nomar">Less 3D modeling error</pre>
		<pre class="nomar">Easing scaling</pre>
		<pre class="nomar">More autonomy for the makers</pre>
		<pre class="nomar">Better interaction between designer and maker</pre>
	</OneSlide>
</Carousel>

<style lang="scss">
	@use '../../../lib/style/colors.scss';

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
	pre.point2 {
		font-size: 0.7em;
		margin: 0.6em 0 0.2em;
	}
	pre.blabla {
		color: grey;
		font-size: 1em;
		margin: 0 3em 0;
	}
	pre.nomar2 {
		font-size: 0.5em;
		margin: 0;
	}
	pre.blabla2 {
		color: grey;
		font-size: 0.4em;
		margin: 0 3em 0;
	}
</style>
