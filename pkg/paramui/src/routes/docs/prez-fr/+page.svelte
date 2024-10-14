<script lang="ts">
	import { base } from '$app/paths';
	import Carousel from '$lib/Carousel.svelte';
	import OneSlide from '$lib/OneSlide.svelte';
</script>

<h1>La prèz de Paramétrix</h1>
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
		<pre style="margin:0;">Une solution JavaScript pour cr&eacute;er des formes 3D</pre>
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
		<pre style="font-size:1.5em; margin:0;">Parametrix workflow</pre>
		<img
			src="{base}/puisvg/prez_parametrix_vs_classic_workflow.svg"
			style="height: 9em;"
			alt="prez_parametrix_vs_classic_workflow"
		/>
		<pre>
Approche simplifi&eacute;e:
- centr&eacute;e sur la notion de contour (c.a.d 2.5D)
  - les proc&eacute;d&eacute;s de fabrication efficaces sont 2D
  - les m&eacute;canismes robustes sont 2D
- chaine d'outils CAO/FAO mieux controll&eacute;e
		</pre>
	</OneSlide>
	<OneSlide>
		<pre style="font-size:2em; margin:0;">G&eacute;n&eacute;ration de fichiers 3D </pre>
		<img
			src="{base}/puisvg/cad_flow_with_parametrix.svg"
			style="height: 9em;"
			alt="cad_flow_with_parametrix.svg"
		/>
		<pre style="margin:0;">&gt; Des formes 3D décrites en JavaScript</pre>
		<pre style="margin:0;">&gt; Un frontend qui abstrait les outils de CAD</pre>
		<pre style="margin:0;">&gt; Un générateur de siteweb pour paramétriser les designs</pre>
	</OneSlide>
	<OneSlide>
		<pre>
Les caractéristiques principales de Parametrix:

1. Logiciel libre
    (comme Freecad ou SolveSpace)

2. JavaScript
    pour designer les formes 3D (comme avec OpenSCAD)

3. Une abstraction des outil de CAD
    Pour assurer la pérénité de ses designs 3D

4. Génère des pages HTML
    pour paramétriser et générer des scripts 3D
		</pre>
	</OneSlide>
	<OneSlide>
		<pre>
framework / éco-système : Parametrix

   librairie principale : Geometrix

  librairies de designs : Designix, Desi78, Desi82, ...
		</pre>
	</OneSlide>
	<OneSlide>
		<pre>
Passage en revue de l'interface graphique
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
L'API de Geometrix pour designer des formes 3D
		</pre>
	</OneSlide>
	<OneSlide>
		<pre>
L'API de Geometrix en bref
		</pre>
	</OneSlide>
	<OneSlide>
		<p>
			<span style="font-size:2em">Example de code</span>
			<img
				src="{base}/puisvg/codeExample1_contour.svg"
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
3 types de paramètres
- nombre
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
Les contours sont composées exclusivement de:
- segments de droite
- arcs de cercle

Idéal pour générer le G-code
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
Options possibles pour définir le prochain point
                   dans la définition d'un contour:
- Cartésien ou Polair
- Relative ou Absolue
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
3 possibilités pour définir un arc de cercle:
- le rayon avec les booléens large/small et ccw/cw
- un point intermédiaire
- l'angle de la tangente au début ou à la fin de l'arc
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
Approximation des courbes quelconques:

double arcs de cercles définis avec
  leur angles de tangentes de début
  et de fin de segment de courbe
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
Modifications des angles d'un contour:
- Arrondi [Rounded]
- Elargissement [Widened]
- Elargissement avec l'accès [WideAcc]
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
- Définition d'une liste de figures
- Attacher chaque contour à une figure en tant que:
    - principal [main]
    - secondaire [second]
    - ou dynamique [dynamics]
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
Définition  d'une forme 3D
- Extrusion d'une figure orthogonalement ou en révolution
- Pivoter, translater puis combiner les sous-éléments
    - Union
    - Intersection
    - Soustraction</pre>
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
Parametrix génère des scripts 3D pour:
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
   Fin de
     la
présentation
     de
 Parametrix
		</pre>
	</OneSlide>
	<OneSlide>
		<pre style="color: orange">
Prêt pour créer votre <i>propre</i> librairie de designs?
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
</style>
