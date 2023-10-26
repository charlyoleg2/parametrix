<script lang="ts">
	import MyUl from '$lib/MyUl.svelte';
</script>

<ul class="list-top">
	<li class="list-header">Open CAD Ecosystem</li>
	<li>
		<MyUl checkboxId="toggle_2d" labelText="2D drawing">
			<li>
				<a href="https://librecad.org/">LibreCAD</a>
				<small>A community fork of QCAD 2.0</small>
			</li>
			<li>
				<a href="https://github.com/qcad/qcad">QCAD</a>
				<small>QCAD 3.0, also available as a commercial product</small>
			</li>
			<li>
				<a href="https://inkscape.org/">Inkscape</a>
				<small>Vector drawing for artists, but can be hacked for technical drawing</small>
			</li>
			<li>
				<a href="https://github.com/VVS1864/SAMoCAD">SAMoCAD</a>
				<small>An unmaintained python2/OpenGL tool</small>
			</li>
			<li>
				<a href="https://github.com/zecruel/CadZinho">CadZinho</a>
				<small>A minimalist 2D CAD. Run also in the browser</small>
			</li>
		</MyUl>
	</li>
	<li>
		<MyUl checkboxId="toggle_3d" labelText="3D drawing">
			<li>Classified by 3D geometry libraries</li>
			<li>
				<MyUl checkboxId="toggle_inhouse" labelText="In-house solutions">
					<li>
						<a href="https://www.gcad3d.org/">gCAD3D</a>
						<small>The lightweight 3D modeling based on GTK and OpenGL</small>
					</li>
					<li>
						<a href="https://github.com/BRL-CAD/brlcad">BRL-CAD</a>
						<small
							>An open source cross-platform solid modeling system. Originated from
							American defense industry</small
						>
					</li>
					<li>
						<a href="https://github.com/Haskell-Things/ImplicitCAD">ImplicitCAD</a>
						<small>Programmatic CAD program, implemented in Haskell</small>
					</li>
				</MyUl>
			</li>
			<li>
				<MyUl checkboxId="toggle_cgal" labelText="CGAL">
					<a slot="top1" href="https://www.cgal.org/">CGAL.org</a>
					<small slot="top2"
						>The C++ Computational Geometry Algorithms Library founded by European
						research instituts</small
					>
					<li>
						<MyUl checkboxId="toggle_openscad" labelText="OpenSCAD">
							<a slot="top1" href="https://openscad.org/">OpenSCAD.org</a>
							<small slot="top2">A pioneer scripting tool for 3D modeling</small>
							<li>
								<a href="https://github.com/janssen86/OpenSCAD-Getriebebibliothek"
									>OpenSCAD Gear</a
								>
								<small>Gear generator based on OpenSCAD</small>
							</li>
						</MyUl>
					</li>
				</MyUl>
			</li>
			<li>
				<MyUl checkboxId="toggle_occ" labelText="OpenCascade">
					<a slot="top1" href="https://dev.opencascade.org/">OpenCascade.org</a>
					<small slot="top2"
						>The world famous open source 3D modeling library. Originated from France
						defense industry</small
					>
					<li>
						<a href="https://www.freecad.org/">FreeCAD</a>
						<small>Powerful GUI based on Qt</small>
					</li>
					<li>
						<a href="https://solvespace.com/">SolveSpace</a>
						<small>Light weight GUI based on GTK</small>
					</li>
					<li>
						<MyUl checkboxId="toggle_pythonocc" labelText="pythonOCC">
							<a slot="top1" href="https://github.com/tpaviot/pythonocc-core"
								>pythonOCC</a
							>
							<small slot="top2">Python binding of OpenCascade based on SWIG</small>
							<li>
								<a href="https://github.com/e-dub/pygear">pythonOCC Gear</a>
								<small>Gear generator based on pythonOCC</small>
							</li>
							<li>
								<a href="https://mirmik.github.io/zencad/en/index.html">ZenCAD</a>
								<small
									>A python library for parametric 3D modeling based on pythonOCC</small
								>
							</li>
						</MyUl>
					</li>
					<li>
						<MyUl checkboxId="toggle_pyocct" labelText="pyOCCT">
							<a slot="top1" href="https://github.com/trelau/pyOCCT">pyOCCT</a>
							<small slot="top2"
								>Python binding of OpenCascade based on pybind11</small
							>
							<li>
								<a href="https://declaracad.com/docs/introduction/">DeclaraCAD</a>
								<small>CAD Qt-GUI based on pyOCCT using enaml scripts</small>
							</li>
						</MyUl>
					</li>
					<li>
						<MyUl checkboxId="toggle_cq" labelText="CadQuery">
							<a slot="top1" href="https://cadquery.readthedocs.io">CQ</a>
							<small slot="top2"
								>Python module based on OpenCascade for building parametric 3D CAD
								models</small
							>
							<li>
								<a href="https://github.com/meadiode/cq_gears">CQ Gear</a>
								<small>Gear generator based on CadQuery</small>
							</li>
							<li>
								<a href="https://github.com/michaelgale/cq-kit">CQ Kit</a>
								<small>Helper python library for CadQuery</small>
							</li>
							<li>
								<a href="https://github.com/7BIndustries/Semblage">Semblage</a>
								<small>CAD GUI backed by CadQuery</small>
							</li>
						</MyUl>
					</li>
					<li>
						<MyUl checkboxId="toggle_ocjs" labelText="OpenCascade.js">
							<a slot="top1" href="https://ocjs.org/">OCJS</a>
							<small slot="top2"
								>Port of the OpenCascade CAD library to JavaScript and WebAssembly
								via Emscripten</small
							>
							<li>
								<a href="https://github.com/sgenoud/replicad">Replicad</a>
								<small>A js-scripting library for 3D modeling</small>
							</li>
							<li>
								<a href="https://github.com/zalo/CascadeStudio">CascadeStudio</a>
								<small>A web UI for 3D modeling</small>
							</li>
							<li>
								<a href="https://github.com/ArchiyouApp/archiyou-core"
									>Archiyou-core</a
								>
								<small>An other js-scripting library for 3D modeling</small>
							</li>
						</MyUl>
					</li>
					<li>
						<MyUl checkboxId="toggle_occt_import_js" labelText="occt-import-js">
							<a slot="top1" href="https://github.com/kovacsv/occt-import-js"
								>occt-import-js</a
							>
							<small slot="top2"
								>js-library for OpenCascade import functionalities</small
							>
							<li>
								<a href="https://github.com/kovacsv/Online3DViewer">3dviewer.net</a>
								<small>visualize and explore 3D models in your browser</small>
							</li>
						</MyUl>
					</li>
				</MyUl>
			</li>
			<li>
				<MyUl checkboxId="toggle_jscad" labelText="OpenJsCAD">
					<a slot="top1" href="https://github.com/jscad/OpenJSCAD.org">OpenJSCAD.org</a>
					<small slot="top2">Web based solid modeling in Javascript</small>
					<li>
						<a href="https://joostn.github.io/OpenJsCad/">OpenJsCAD predecessor</a>
						<small>The unmaintained original version of OpenJsCAD</small>
					</li>
					<li>
						<a href="https://garyhodgson.github.io/openscad.net/">OpenSCAD.net</a>
						<small>Partial port of OpenSCAD for the web. Powered by OpenJsCad</small>
					</li>
				</MyUl>
			</li>
			<li>
				<MyUl checkboxId="toggle_libfive" labelText="libfive">
					<a slot="top1" href="https://libfive.com/">libfive</a>
					<small slot="top2"
						>A library for parametric solid modeling and generative design</small
					>
					<li>
						<a href="https://github.com/mkeeter/antimony">Antimony</a>
						<small>CAD from a parallel universe</small>
					</li>
				</MyUl>
			</li>
			<li>
				<MyUl checkboxId="toggle_ifc" labelText="BIM-IFC">
					<a
						slot="top1"
						href="https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/"
						>IFC</a
					>
					<small slot="top2"
						>Industry Foundation Classes (IFC), the open standard for Building
						Information Modelling (BIM)</small
					>
					<li>
						<a href="https://ifcjs.github.io/info/">IFC.js</a>
						<small>Reading and writing IFC files with Javascript</small>
					</li>
					<li>
						<a href="https://github.com/opensourceBIM/BIMsurfer">BIMSurfer</a>
						<small>WebGL-based IFC model viewer for BIMServer</small>
					</li>
					<li>
						<a href="https://github.com/IfcOpenShell/IfcOpenShell">IfcOpenShell</a>
						<small>IFC library and geometry engine</small>
					</li>
				</MyUl>
			</li>
		</MyUl>
	</li>
</ul>

<style lang="scss">
	@use '$lib/style/colors.scss';

	ul.list-top {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
	li.list-header {
		font-size: 1rem;
		font-weight: bold;
		margin-top: 0.2rem;
		margin-bottom: 0.2rem;
	}
	li > a {
		color: colors.$link;
		text-decoration: none;
	}
	li > small {
		font-size: 0.8rem;
		margin-left: 0.8rem;
	}
</style>
