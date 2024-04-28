<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>Prez of Parametrix</h1>
<div class="container">
	<section>
		<pre>
	- Parametrix framework
	- Geometrix library
	- design-library
		</pre>
	</section>
	<section>
		<pre>
	Pictures of 3D shapes
		</pre>
	</section>
	<section>
		<pre>
	Parametrix main characteristics:
	- free and open-source (like Freecad or SolveSpace)
	- HTML page for parametrization and generating the 3D scripts
	- Create the design with Javascript (similar to OpenSCAD)
		</pre>
	</section>
	<section>
		<pre>
	Go through the design-UI
		</pre>
	</section>
	<section>
		<img
			src="{base}/puisvg/concept_of_webapp_generator.svg"
			width="450"
			alt="designer and maker"
		/>
	</section>
	<section>
		<pre>
	Design of 3D shape created with the Geometrix API

	The Geometrix API in a nutshell
		</pre>
	</section>
	<section>
		<pre>
	3 types of parameters
	- number
	- checkbox (i.e. boolean)
	- dropdown (i.e. enum)
		</pre>
	</section>
	<section>
		<pre>
	Create contour with:
	- strokes
	- arcs of circles
	Optimal for generating G-code
		</pre>
	</section>
	<section>
		<pre>
	Next destination-point in contour-definition:
	- Cartesian or Polar
	- Relative or Absolute
		</pre>
	</section>
	<section>
		<pre>
	3 options for defining an arc of circle:
	- radius with large/small and ccw/cw
	- intermediate point
	- tangent at the begining or the end
		</pre>
	</section>
	<section>
		<pre>
	Complex curve approximation:
	Double arcs defined with start and end tangents
		</pre>
	</section>
	<section>
		<pre>
	Corner rework:
	- Rounded
	- Widened
	- WideAcc
		</pre>
	</section>
	<section>
		<pre>
	- Define a list of figures
	- Attach the contours to figures
		- as main, second or dynamics
		</pre>
	</section>
	<section>
		<pre>
	Define the 3D shape
	- Extrude figures as LinearOrtho or Rotate
	- Rotate, translate and combine sub-element
		- Union
		- Intersection
		- Substraction
		</pre>
	</section>
	<section>
		<pre></pre>
	</section>
	<section>
		<pre></pre>
	</section>
</div>

<style lang="scss">
	@use '$lib/style/colors.scss';

	h1 {
		margin: 1rem;
	}
	div.container {
		display: flex;
		flex-wrap: wrap;
	}
	section {
		height: 18rem;
		width: 30rem;
		margin: 2rem;
		color: grey;
		background-color: black;
	}
</style>
