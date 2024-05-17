<script lang="ts">
	import { base } from '$app/paths';
	import Carousel from './Carousel.svelte';
	import OneSlide from './OneSlide.svelte';
</script>

<h1>Prez of Parametrix</h1>
<Carousel>
	<OneSlide>
		<pre>
- Parametrix framework
- Geometrix library
- design-library
		</pre>
	</OneSlide>
	<OneSlide>
		<pre>
Pictures of 3D shapes
		</pre>
	</OneSlide>
	<OneSlide>
		<pre>
Parametrix main characteristics:
- free and open-source (like Freecad or SolveSpace)
- HTML page for parametrization and generating the 3D scripts
- Create the design with Javascript (similar to OpenSCAD)
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
			width="450"
			alt="designer and maker"
		/>
	</OneSlide>
	<OneSlide>
		<pre>
Design of 3D shape created with the Geometrix API

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
		<pre>
Create contour with:
- strokes
- arcs of circles
Optimal for generating G-code
		</pre>
	</OneSlide>
	<OneSlide>
		<pre>
Next destination-point in contour-definition:
- Cartesian or Polar
- Relative or Absolute
		</pre>
	</OneSlide>
	<OneSlide>
		<pre>
3 options for defining an arc of circle:
- radius with large/small and ccw/cw
- intermediate point
- tangent at the begining or the end
		</pre>
	</OneSlide>
	<OneSlide>
		<pre>
Complex curve approximation:
Double arcs defined with start and end tangents
		</pre>
	</OneSlide>
	<OneSlide>
		<pre>
Corner rework:
- Rounded
- Widened
- WideAcc
		</pre>
	</OneSlide>
	<OneSlide>
		<pre>
- Define a list of figures
- Attach the contours to figures
	- as main, second or dynamics
		</pre>
	</OneSlide>
	<OneSlide>
		<pre>
Define the 3D shape
- Extrude figures as LinearOrtho or Rotate
- Rotate, translate and combine sub-element
	- Union
	- InterOneSlide
	- Substraction
		</pre>
	</OneSlide>
	<OneSlide>
		<pre></pre>
	</OneSlide>
	<OneSlide>
		<pre></pre>
	</OneSlide>
</Carousel>

<style lang="scss">
	@use '$lib/style/colors.scss';

	h1 {
		margin: 1rem;
	}
</style>
