<script lang="ts">
	import { version_details } from 'geometrix';
	import appPackage from '../../../package.json';

	const detailed_versions = version_details(appPackage);
</script>

<h1>About Parametrix</h1>
<article>
	Parametrix is a library for programmatic CAD including a web-ui. It displays two dimentional
	graphics for adjusting parameters. It runs a simple programmatic 2D simulation. And it exports
	the design as <a href="https://www.w3.org/Graphics/SVG/">SVG</a> or
	<a href="https://en.wikipedia.org/wiki/AutoCAD_DXF">DXF</a>. After extruding the 2D face into a
	3D model, the solid can be exported as
	<a href="https://en.wikipedia.org/wiki/ISO_10303-21">STEP</a>,
	<a href="https://dev.opencascade.org/doc/overview/html/specification__brep_format.html">BRep</a>
	or <a href="https://en.wikipedia.org/wiki/STL_(file_format)">STL</a>. Those files can then be
	used in CAD applications, like
	<a href="https://wiki.freecad.org/Manual:Import_and_export_to_other_filetypes">FreeCAD</a>.
</article>
<article>
	Parametrix is a lightweight programmatic CAD solution like
	<a href="https://maker.js.org">maker.js</a>, <a href="https://openscad.org/">OpenSCAD</a>
	or <a href="https://mirmik.github.io/zencad/en/index.html">ZenCAD</a> but with the following
	particularities:
	<ul>
		<li>
			Only 2D engine but with a preparation of 3D scripts for futur extrapolation with other
			tools
		</li>
		<li>
			Limited on purpose to strokes and arcs to ease the integration with CAM tools and
			numeric fabrication
		</li>
		<li>Programmatic 2D simulation for early feedback</li>
		<li>Rework of cornes (rounded, widened and wide-access)</li>
	</ul>
</article>
<article>
	Discover further <i>Parametrix</i> with those following links:
	<ul>
		<li><a href="https://github.com/charlyoleg2/parametrix">Source code</a></li>
		<li><a href="https://charlyoleg2.github.io/parametrix/">Public instance</a></li>
		<li>
			<a href="https://charlyoleg2.github.io/parametrix/docs/readme"
				>Installation instructions</a
			>
		</li>
		<li><a href="https://charlyoleg2.github.io/parametrix/docs/concept">Documentation</a></li>
	</ul>
</article>
<article>
	<h3>Parametrix versions</h3>
	<code>
		{#each detailed_versions as dversion}
			{dversion}<br />
		{/each}
	</code>
</article>

<style lang="scss">
	@use '$lib/style/colors.scss';

	h1,
	h3 {
		margin: 1rem;
	}
	article {
		margin: 1rem;
	}
</style>
