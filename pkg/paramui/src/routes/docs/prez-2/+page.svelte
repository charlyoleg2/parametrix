<script lang="ts">
	import { asset } from '$app/paths';
	import Carousel from '$lib/Carousel.svelte';
	import OneSlide from '$lib/OneSlide.svelte';
</script>

<h1>Prez of Parametrix</h1>
<Carousel>
	<OneSlide>
		<center
			><img src={asset('/favicon.svg')} style="width: 9em;" alt="Parametrix logo" /></center
		>
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
		<pre style="margin:0;">CAD as code for open-hardware</pre>
		<pre style="margin:0;">a JavaScript solution for creating 3D shapes</pre>
	</OneSlide>
	<OneSlide>
		<img src={asset('/screen_gear.png')} style="width: 16em;" alt="screenshot of a gear" />
		<img
			src={asset('/screen_helio_rake.png')}
			style="width: 16em;"
			alt="screenshot of the heliostat rake"
		/>
	</OneSlide>
	<OneSlide>
		<p>
			<img
				src={asset('/screen_cabane.png')}
				style="height: 9em;"
				alt="screenshot of a cabane"
			/>
			<img
				src={asset('/screen_doorstop.png')}
				style="width: 9em;"
				alt="screenshot of a doorstop"
			/>
		</p>
		<p>
			<img
				src={asset('/screen_trapeze.png')}
				style="width: 9em;"
				alt="screenshot of a trapeze"
			/>
			<img
				src={asset('/screen_reinforced_tube.png')}
				style="width: 9em;"
				alt="screenshot of a reinforced tube"
			/>
		</p>
		<p></p></OneSlide
	>
	<OneSlide>
		<pre style="font-size:1.5em; margin:0;">Parametrix workflow</pre>
		<img
			src={asset('/puisvg/prez_parametrix_vs_classic_workflow.svg')}
			style="height: 9em;"
			alt="prez_parametrix_vs_classic_workflow"
		/>
		<pre>
Simplistic approach:
- contour centric (i.e. 2.5D)
  - cost efficient manufacturing process are 2D
  - robust mechanisms are 2D
- no long workflow chain
		</pre>
	</OneSlide>
	<OneSlide>
		<pre style="font-size:2em; margin:0;">Generate 3D files</pre>
		<img
			src={asset('/puisvg/cad_flow_with_parametrix.svg')}
			style="height: 9em;"
			alt="cad_flow_with_parametrix.svg"
		/>
		<pre style="margin:0;">&gt; a JavaScript solution for creating 3D shapes</pre>
		<pre style="margin:0;">&gt; a frontend that abstract the CAD solution</pre>
		<pre style="margin:0;">&gt; a generator of WebUI for parametrizing your designs</pre>
	</OneSlide>
	<OneSlide>
		<pre class="smaller">
Parametrix main advantages:

1. Durability of your 3D modeling
    1.1. Parametrix is small (10k LoC)
    1.2. Parametrix is open-source
    1.3. An abstraction of several/many API of CAD-tools
        Keep your design agnostic to CAD vendors (no lock-in)

2. Guide your design for cost efficient digital manufacturing
    Generate contours made out of lines and arcs of circles
        as supported by G-code

3. Clear and structured interface between designer and manufacturer
    one HTML page with parametrization, 2D preview and 3D export

4. A javacript API
    Creating your 3D modelling recipes with javascript
		</pre>
	</OneSlide>
	<OneSlide>
		<img
			src={asset('/puisvg/prez_parametrix_condensed.svg')}
			style="width: 28em;"
			alt="Parametrix described in condensed"
		/>
		<p style="text-align:center; margin: 0.5rem">Parametrix in condensed</p>
	</OneSlide>
	<OneSlide
		>/
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
			src={asset('/puisvg/concept_of_webapp_generator.svg')}
			style="width: 28em;"
			alt="designer and maker"
		/>
	</OneSlide>
	<OneSlide>
		<center
			><img
				src={asset('/puisvg/parametrix_3D_shape_subset.svg')}
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
		<p>
			<span style="font-size:2em">Code example</span>
			<img
				src={asset('/puisvg/codeExample1_contour.svg')}
				style="height: 7em; vertical-align: middle"
				alt="codeExample1_contour.svg"
			/>
		</p>
		<pre style="font-size:0.8em; padding-right: 5em">
const ctr1 = contour(0, 0)
	.addSegStrokeR(param.L2, 0)
	.addSegStrokeRP(a3, param.L3)
	.addPointAP(a4, param.L4)
	.addSegArc(param.R34, true, true)
	.addCornerRounded(param.R4)
	.addPointA(0, param.L5)
	.addSegArc3(a5, false)
	.closeSegStroke();
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
				src={asset('/puisvg/prez_stroke_and_arc.svg')}
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
				src={asset('/puisvg/prez_absolute_relative.svg')}
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
				src={asset('/puisvg/prez_arcs.svg')}
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
				src={asset('/puisvg/prez_curve_approximation.svg')}
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
				src={asset('/puisvg/prez_corner_modifications.svg')}
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
				src={asset('/puisvg/prez_design_structure.svg')}
				style="width: 14em;"
				alt="design structure"
			/>&nbsp;<img
				src={asset('/puisvg/prez_figure_layers.svg')}
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
				src={asset('/puisvg/prez_extrudes.svg')}
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
				src={asset('/puisvg/prez_boolean_operations.svg')}
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
- ManifoldCAD
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
		<pre style="color: orange">
Ready for creating your <i>own</i> design-library?
		</pre>
		<pre>
npm create parametrix@latest tom07
		</pre>
	</OneSlide>
</Carousel>

<style lang="scss">
	@use '$lib/style/colors.scss';

	h1 {
		margin: 1rem;
	}
	pre.smaller {
		font-size: 0.8em;
	}
</style>
