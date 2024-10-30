<script lang="ts">
	import MyUl from './MyUl.svelte';
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
					<li>
						<a href="https://f3d.app/">f3d</a>
						<small>Fast and minimalist 3D viewer</small>
					</li>
				</MyUl>
			</li>
			<li>
				<MyUl checkboxId="toggle_cgal" labelText="CGAL">
					{#snippet top1()}
						<a href="https://www.cgal.org/">CGAL.org</a>
					{/snippet}
					{#snippet top2()}
						<small
							>The C++ Computational Geometry Algorithms Library founded by European
							research instituts</small
						>
					{/snippet}
					<li>
						<MyUl checkboxId="toggle_openscad" labelText="OpenSCAD">
							{#snippet top1()}
								<a href="https://openscad.org/">OpenSCAD.org</a>
							{/snippet}
							{#snippet top2()}
								<small>A pioneer scripting tool for 3D modeling</small>
							{/snippet}
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
					{#snippet top1()}
						<a href="https://dev.opencascade.org/">OpenCascade.org</a>
					{/snippet}
					{#snippet top2()}
						<small
							>The world famous open source 3D modeling library. Originated from
							France defense industry</small
						>
					{/snippet}
					<li>
						<a href="https://www.freecad.org/">FreeCAD</a>
						<small>Powerful GUI based on Qt</small>
					</li>
					<li>
						<a href="https://solvespace.com/">SolveSpace</a>
						<small>Light weight GUI based on GTK</small>
					</li>
					<li>
						<a href="https://github.com/fougue/mayo">Mayo</a>
						<small>3D CAD viewer and converter based on Qt + OpenCascade</small>
					</li>
					<li>
						<MyUl checkboxId="toggle_pythonocc" labelText="pythonOCC">
							{#snippet top1()}
								<a href="https://github.com/tpaviot/pythonocc-core">pythonOCC</a>
							{/snippet}
							{#snippet top2()}
								<small>Python binding of OpenCascade based on SWIG</small>
							{/snippet}
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
							{#snippet top1()}
								<a href="https://github.com/trelau/pyOCCT">pyOCCT</a>
							{/snippet}
							{#snippet top2()}
								<small>Python binding of OpenCascade based on pybind11</small>
							{/snippet}
							<li>
								<a href="https://declaracad.com/docs/introduction/">DeclaraCAD</a>
								<small>CAD Qt-GUI based on pyOCCT using enaml scripts</small>
							</li>
						</MyUl>
					</li>
					<li>
						<MyUl checkboxId="toggle_cq" labelText="CadQuery">
							{#snippet top1()}
								<a href="https://cadquery.readthedocs.io">CQ</a>
							{/snippet}
							{#snippet top2()}
								<small
									>Python module based on OpenCascade for building parametric 3D
									CAD models</small
								>
							{/snippet}
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
							{#snippet top1()}
								<a href="https://ocjs.org/">OCJS</a>
							{/snippet}
							{#snippet top2()}
								<small
									>Port of the OpenCascade CAD library to JavaScript and
									WebAssembly via Emscripten</small
								>
							{/snippet}
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
							{#snippet top1()}
								<a href="https://github.com/kovacsv/occt-import-js"
									>occt-import-js</a
								>
							{/snippet}
							{#snippet top2()}
								<small>js-library for OpenCascade import functionalities</small>
							{/snippet}
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
					{#snippet top1()}
						<a href="https://github.com/jscad/OpenJSCAD.org">OpenJSCAD.org</a>
					{/snippet}
					{#snippet top2()}
						<small>Web based solid modeling in Javascript</small>
					{/snippet}
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
					{#snippet top1()}
						<a href="https://libfive.com/">libfive</a>
					{/snippet}
					{#snippet top2()}
						<small>A library for parametric solid modeling and generative design</small>
					{/snippet}
					<li>
						<a href="https://github.com/mkeeter/antimony">Antimony</a>
						<small>CAD from a parallel universe</small>
					</li>
				</MyUl>
			</li>
			<li>
				<MyUl checkboxId="toggle_ifc" labelText="BIM-IFC">
					{#snippet top1()}
						<a
							href="https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/"
							>IFC</a
						>
					{/snippet}
					{#snippet top2()}
						<small
							>Industry Foundation Classes (IFC), the open standard for Building
							Information Modelling (BIM)</small
						>
					{/snippet}
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
	@use './style/colors.scss';

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
