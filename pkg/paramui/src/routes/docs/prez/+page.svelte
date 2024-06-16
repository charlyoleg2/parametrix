<script lang="ts">
	import { base } from '$app/paths';
	import Carousel from '$lib/Carousel.svelte';
	import OneSlide from '$lib/OneSlide.svelte';
</script>

<h1>Prez of Parametrix</h1>
<Carousel>
	<OneSlide>
		<center><img src="{base}/favicon.svg" style="width: 9em;" alt="Parametrix logo" /></center>
		<div>
			<pre style="font-size:2.5em; margin:0;">Parametrix</pre>
			<center
				><i style="color: lightSkyBlue;">Geometrix</i>&nbsp;<i style="color: pink;"
					>Designix</i
				></center
			>
		</div>
	</OneSlide>
	<OneSlide>
		<pre style="font-size:2.5em; margin:0;">Parametrix</pre>
		<pre style="margin:0;">a JavaScript solution for creating 3D shapes</pre>
	</OneSlide>
	<OneSlide>
		<img src="{base}/screen_gear.png" style="width: 16em;" alt="screenshot of a gear" />
		<img
			src="{base}/screen_helio_rake.png"
			style="width: 16em;"
			alt="screenshot of the heliostat rake"
		/>
	</OneSlide>
	<OneSlide>
		<p>
			<img src="{base}/screen_cabane.png" style="height: 9em;" alt="screenshot of a cabane" />
			<img
				src="{base}/screen_doorstop.png"
				style="width: 9em;"
				alt="screenshot of a doorstop"
			/>
		</p>
		<p>
			<img
				src="{base}/screen_trapeze.png"
				style="width: 9em;"
				alt="screenshot of a trapeze"
			/>
			<img
				src="{base}/screen_reinforced_tube.png"
				style="width: 9em;"
				alt="screenshot of a reinforced tube"
			/>
		</p>
		<p></p></OneSlide
	>
	<OneSlide>
		<pre style="font-size:2.5em; margin:0;">Parametrix</pre>
		<img
			src="{base}/puisvg/cad_flow_with_parametrix.svg"
			style="height: 9em;"
			alt="cad_flow_with_parametrix.svg"
		/>
		<pre style="margin:0;">&gt; a JavaScript solution for creating 3D shapes</pre>
		<pre style="margin:0;">&gt; a frontend that abstract the CAD solution</pre>
		<pre style="margin:0;">&gt; a generator of WebUI for parametrizing your designs</pre>
	</OneSlide>
	<OneSlide>
		<pre>
Parametrix main characteristics:

1. free and open-source
    (like Freecad or SolveSpace)

2. JavaScript
    for designing 3D shapes (similar to OpenSCAD)

3. CAD tool abstraction
    for keeping your 3D-shapes agnostic to CAD vendors

4. HTML page
    for parametrization and generating the 3D scripts
		</pre>
	</OneSlide>
	<OneSlide>
		<pre>
framework / eco-system : Parametrix

          core library : Geometrix

      design-libraries : Designix, Desi78, Desi82, ...
		</pre>
	</OneSlide>
	<OneSlide>
		<pre>
Go through the design-UI
		</pre>
	</OneSlide>
	<OneSlide>
		<img
			src="{base}/puisvg/concept_of_webapp_generator.svg"
			style="width: 28em;"
			alt="designer and maker"
		/>
	</OneSlide>
	<OneSlide>
		<center
			><img
				src="{base}/puisvg/parametrix_3D_shape_subset.svg"
				style="width: 14em;"
				alt="3D shape subsets"
			/></center
		>
		<pre>
The Geometrix API for designing a 3D shape
		</pre>
	</OneSlide>
	<OneSlide>
		<pre>
The Geometrix API in a nutshell
		</pre>
	</OneSlide>
	<OneSlide>
		<pre>
3 types of parameters
- number
- checkbox (i.e. boolean)
- dropdown (i.e. enum)
		</pre>
	</OneSlide>
	<OneSlide>
		<center
			><img
				src="{base}/puisvg/prez_stroke_and_arc.svg"
				style="width: 9em;"
				alt="stroke and arcs"
			/></center
		>
		<pre>
Create contour with:
- strokes
- arcs of circles

Optimal for generating G-code
		</pre>
	</OneSlide>
	<OneSlide>
		<center
			><img
				src="{base}/puisvg/prez_absolute_relative.svg"
				style="width: 22em;"
				alt="absolute relative cartesian polar"
			/></center
		>
		<pre>
Next destination-point in contour-definition:
- Cartesian or Polar
- Relative or Absolute
		</pre>
	</OneSlide>
	<OneSlide>
		<center
			><img
				src="{base}/puisvg/prez_arcs.svg"
				style="width: 22em;"
				alt="three ways for defining arcs"
			/></center
		>
		<pre>
3 options for defining an arc of circle:
- radius with large/small and ccw/cw
- intermediate point
- tangent at the begining or the end
		</pre>
	</OneSlide>
	<OneSlide>
		<center
			><img
				src="{base}/puisvg/prez_curve_approximation.svg"
				style="width: 22em;"
				alt="curve approximation"
			/></center
		>
		<pre>
Complex curve approximation:
Double arcs defined with start and end tangents
		</pre>
	</OneSlide>
	<OneSlide>
		<center
			><img
				src="{base}/puisvg/prez_corner_modifications.svg"
				style="width: 15em;"
				alt="corner modifications"
			/></center
		>
		<pre>
Corner rework:
- Rounded
- Widened
- WideAcc
		</pre>
	</OneSlide>
	<OneSlide>
		<center
			><img
				src="{base}/puisvg/prez_design_structure.svg"
				style="width: 14em;"
				alt="design structure"
			/>&nbsp;<img
				src="{base}/puisvg/prez_figure_layers.svg"
				style="width: 10em;"
				alt="figure layers"
			/></center
		>
		<pre>
- Define a list of figures
- Attach the contours to figures
    - as main, second or dynamics
		</pre>
	</OneSlide>
	<OneSlide>
		<center
			><img
				src="{base}/puisvg/prez_extrudes.svg"
				style="width: 12em;"
				alt="extrudes"
			/></center
		>
		<pre style="margin: 0.5em;">
Define the 3D shape
- Extrude figures as LinearOrtho or Rotate
- Rotate, translate and combine sub-element
    - Union
    - Intersection
    - Substraction</pre>
		<center
			><img
				src="{base}/puisvg/prez_boolean_operations.svg"
				style="width: 16em;"
				alt="boolean operations"
			/></center
		>
	</OneSlide>
	<OneSlide>
		<pre>
Parametrix generates 3D scripts for:
- OpenSCAD <span style="color: green;">&#10004;</span>
- OpenJsCad <span style="color: green;">&#10004;</span>
- Freecad <span style="color: green;">&#10004;</span>
- SolveSpace
- pythonOCC
- CadQuery
- OpenCascade.js
- Three.js
- glTF
- X3D
		</pre>
	</OneSlide>
	<OneSlide>
		<pre>
   End of
     the
presentation
     of
 Parametrix
		</pre>
	</OneSlide>
	<OneSlide>
		<pre>
Ready for creating your <i>own</i> design-library?
		</pre>
	</OneSlide>
</Carousel>

<style lang="scss">
	@use '$lib/style/colors.scss';

	h1 {
		margin: 1rem;
	}
</style>
