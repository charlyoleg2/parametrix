<script lang="ts">
	import Garland from '$lib/Garland.svelte';
</script>

<footer>
	<Garland />
	<ul>
		<li class="footer-title">Parametrix</li>
		<li><a href="https://github.com/charlyoleg2/parametrix">Github repo</a></li>
		<li><a href="https://charlyoleg2.github.io/parametrix/">Github page</a></li>
		<li><a href="https://parametrix.fr/">Parametrix catalog [Official]</a></li>
		<li><a href="https://catalos-catalui.vercel.app/">Parametrix catalog [Vercel]</a></li>
	</ul>
	<Garland />
	<ul>
		<li class="footer-title">Js Partners</li>
		<li><a href="https://ocjs.org/">OpenCascade.js</a></li>
		<li><a href="https://github.com/ArchiyouApp/archiyou-core">Archiyou-core</a></li>
		<li><a href="https://github.com/sgenoud/replicad">Replicad</a></li>
		<li><a href="https://github.com/zalo/CascadeStudio">CascadeStudio</a></li>
		<li><a href="https://github.com/jscad/OpenJSCAD.org">OpenJsCAD</a></li>
		<li><a href="https://manifoldcad.org/">ManifoldCAD</a></li>
	</ul>
	<Garland />
	<ul>
		<li class="footer-title">Py Partners</li>
		<li><a href="https://cadquery.readthedocs.io">CadQuery</a></li>
		<li><a href="https://github.com/tpaviot/pythonocc-core">PythonOCC</a></li>
		<li><a href="https://mirmik.github.io/zencad/en/index.html">ZenCAD</a></li>
	</ul>
	<Garland />
	<ul>
		<li class="footer-title">Other Partners</li>
		<li><a href="https://openscad.org/">OpenSCAD</a></li>
	</ul>
	<Garland />
	<ul>
		<li class="footer-title">Friends</li>
		<li><a href="https://www.freecad.org/">FreeCAD</a></li>
		<li><a href="https://solvespace.com/">SolveSpace</a></li>
		<li><a href="https://librecad.org/">LibreCAD</a></li>
		<li><a href="https://inkscape.org/">Inkscape</a></li>
	</ul>
	<Garland />
	<ul>
		<li class="footer-title">2D CAD Libraries</li>
		<li><a href="https://maker.js.org/docs/">Maker.js</a></li>
		<li><a href="https://github.com/sgenoud/pantograph">Pantograph.js</a></li>
	</ul>
	<Garland />
	<ul>
		<li class="footer-title">Inspirations</li>
		<li><a href="https://pythonhosted.org/Cnc25D/">cnc25D</a></li>
		<li><a href="https://github.com/meadiode/cq_gears">CadQuery Gear</a></li>
		<li><a href="https://github.com/e-dub/pygear">PythonOCC Gear</a></li>
		<li>
			<a href="https://github.com/janssen86/OpenSCAD-Getriebebibliothek">OpenSCAD Gear</a>
		</li>
	</ul>
	<Garland />
	<ul>
		<li class="footer-title">Reminder</li>
		<li>
			<a href="https://www.akselipalen.com/2021/06/10/2d-geometry-libraries-for-javascript/"
				>2D js libs</a
			>
		</li>
		<li><a href="https://github.com/michaelgale/cq-kit">CadQuery Kit</a></li>
		<li><a href="https://github.com/CadQuery/awesome-cadquery">CadQuery Awesome</a></li>
		<li><a href="https://github.com/occi-cad">Open CAD Component Interface</a></li>
	</ul>
	<Garland />
	<ul>
		<li class="footer-title">Miscellaneous</li>
		<li><a href="https://github.com/devbisme/skidl">SKiDL</a></li>
		<li><a href="https://www.myhdl.org/">MyHDL</a></li>
		<li><a href="https://phydemo.app/ray-optics/">Ray Optics Simulation</a></li>
		<li><a href="https://sonic-pi.net/">Sonic Pi</a></li>
		<li><a href="https://supercollider.github.io/">SuperCollider</a></li>
		<li><a href="https://mermaid.js.org/">Mermaid.js</a></li>
		<li><a href="https://opentoolchain.org/tools/">OpenToolchain.org</a></li>
		<li><a href="http://docs.ros.org/">ROS</a></li>
		<li><a href="https://micro.ros.org/">micro-ROS</a></li>
		<li><a href="https://github.com/mROS-base/mros2">mROS</a></li>
		<li><a href="https://github.com/simplefoc">Field Oriented Control</a></li>
	</ul>
	<Garland />
</footer>

<style lang="scss">
	@use '$lib/style/colors.scss';

	footer {
		background-color: colors.$footer-bg;
		margin-top: 7rem;
		padding-top: 1rem;
		padding-left: 5rem;
		padding-right: 5rem;
		padding-bottom: 5rem;
		min-height: 30vh;
		column-width: 16rem;
		column-gap: 2rem;
	}
	footer > ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
	footer > ul > li.footer-title {
		font-size: 1rem;
		font-weight: bold;
		margin-top: 1.2rem;
		margin-bottom: 0.2rem;
	}
	footer > ul > li > a {
		color: colors.$footer;
		text-decoration: none;
	}
</style>
