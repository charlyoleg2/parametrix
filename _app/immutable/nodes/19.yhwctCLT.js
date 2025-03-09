import{t as o,a as s}from"../chunks/BN3gVGOq.js";import"../chunks/Y9EiW8_u.js";import{s as t,f as d,c as v,r as g,n as m}from"../chunks/CPaosiGh.js";import{s as p}from"../chunks/DmnKEXwH.js";import{b as l}from"../chunks/kDyzhmXa.js";import{C as X,O as n}from"../chunks/CDbJ7SFy.js";var K=o('<center><img style="width: 9em;" alt="Parametrix logo"></center> <div><pre style="font-size:2.5em; margin:0;">Parametrix</pre> <center><i style="color: lightSkyBlue;">Geometrix</i>&nbsp;<i style="color: pink;">Designix</i></center></div>',1),N=o(`<pre style="font-size:2.5em; margin:0;">Parametrix</pre> <pre style="margin:0;">CAO en code pour l'open-hardware</pre> <pre style="margin:0;">Une solution JavaScript pour cr&eacute;er des formes 3D</pre>`,1),Y=o('<img style="width: 16em;" alt="screenshot of a gear"> <img style="width: 16em;" alt="screenshot of the heliostat rake">',1),Z=o('<p><img style="height: 9em;" alt="screenshot of a cabane"> <img style="width: 9em;" alt="screenshot of a doorstop"></p> <p><img style="width: 9em;" alt="screenshot of a trapeze"> <img style="width: 9em;" alt="screenshot of a reinforced tube"></p> <p></p>',1),ee=o(`<pre style="font-size:1.5em; margin:0;">Parametrix workflow</pre> <img style="height: 9em;" alt="prez_parametrix_vs_classic_workflow"> <pre>Approche simplifi&eacute;e:
- centr&eacute;e sur la notion de contour (c.a.d 2.5D)
  - les proc&eacute;d&eacute;s de fabrication efficaces sont 2D
  - les m&eacute;canismes robustes sont 2D
- chaine d'outils CAO/FAO mieux controll&eacute;e
		</pre>`,1),re=o('<pre style="font-size:2em; margin:0;">G&eacute;n&eacute;ration de fichiers 3D </pre> <img style="height: 9em;" alt="cad_flow_with_parametrix.svg"> <pre style="margin:0;">&gt; Des formes 3D décrites en JavaScript</pre> <pre style="margin:0;">&gt; Un frontend qui abstrait les outils de CAD</pre> <pre style="margin:0;">&gt; Un générateur de siteweb pour paramétriser les designs</pre>',1),ae=o(`<pre class="smaller svelte-7e5ith">Les principaux avantages de Parametrix:

1. Pérennité de vos modeles 3D
    1.1. Parametrix est petit (10k LoC)
    1.2. Parametrix est open-source
    1.3. Une abstraction de plusieurs API d'outils CAO
        Eviter les lock-in de vos designs 3D

2. Facilité la compatibilité avec les machines de fabrication digitales
    Des contours faits de segments et d'arcs de cercles
        comme le G-code

3. Une interface claire et structurée entre Designer et Maker
    Une page HTML pour paramétriser, visualiser en 2D et exporter en 3D

4. Une API javascript
    Votre mod&egrave;le 3D est une recette écrite dans un fichier javacript
		</pre>`),te=o('<img style="width: 28em;" alt="Parametrix described in condensed"> <p style="text-align:center; margin: 0.5rem">Parametrix en condens&eacute;</p>',1),se=o(`<pre>framework / éco-système : Parametrix

   librairie principale : Geometrix

  librairies de designs : Designix, Desi78, Desi82, ...
		</pre>`),oe=o(`<pre>Passage en revue de l'interface graphique
		</pre>`),ie=o('<img style="width: 28em;" alt="designer and maker">'),ne=o(`<center><img style="width: 14em;" alt="3D shape subsets"></center> <pre>L'API de Geometrix pour designer des formes 3D
		</pre>`,1),ce=o(`<pre>L'API de Geometrix en bref
		</pre>`),pe=o(`<p><span style="font-size:2em">Example de code</span> <img style="height: 7em; vertical-align: middle" alt="codeExample1_contour.svg"></p> <pre style="font-size:0.8em; padding-right: 5em">const ctr1 = contour(0, 0)
	.addSegStrokeR(param.L2, 0)
	.addSegStrokeRP(a3, param.L3)
	.addPointAP(a4, param.L4)
	.addSegArc(param.R34, true, true)
	.addCornerRounded(param.R4)
	.addPointA(0, param.L5)
	.addSegArc3(a5, false)
	.closeSegStroke();
		</pre>`,1),le=o(`<pre>3 types de paramètres
- nombre
- checkbox (i.e. boolean)
- dropdown (i.e. enum)
		</pre>`),de=o(`<center><img style="width: 9em;" alt="stroke and arcs"></center> <pre>Les contours sont composées exclusivement de:
- segments de droite
- arcs de cercle

Idéal pour générer le G-code
		</pre>`,1),me=o(`<center><img style="width: 22em;" alt="absolute relative cartesian polar"></center> <pre>Options possibles pour définir le prochain point
                   dans la définition d'un contour:
- Cartésien ou Polair
- Relative ou Absolue
		</pre>`,1),ve=o(`<center><img style="width: 22em;" alt="three ways for defining arcs"></center> <pre>3 possibilités pour définir un arc de cercle:
- le rayon avec les booléens large/small et ccw/cw
- un point intermédiaire
- l'angle de la tangente au début ou à la fin de l'arc
		</pre>`,1),ge=o(`<center><img style="width: 22em;" alt="curve approximation"></center> <pre>Approximation des courbes quelconques:

double arcs de cercles définis avec
  leur angles de tangentes de début
  et de fin de segment de courbe
		</pre>`,1),_e=o(`<center><img style="width: 15em;" alt="corner modifications"></center> <pre>Modifications des angles d'un contour:
- Arrondi [Rounded]
- Elargissement [Widened]
- Elargissement avec l'accès [WideAcc]
		</pre>`,1),ue=o(`<center><img style="width: 14em;" alt="design structure">&nbsp;<img style="width: 10em;" alt="figure layers"></center> <pre>- Définition d'une liste de figures
- Attacher chaque contour à une figure en tant que:
    - principal [main]
    - secondaire [second]
    - ou dynamique [dynamics]
		</pre>`,1),he=o(`<center><img style="width: 12em;" alt="extrudes"></center> <pre style="margin: 0.5em;">Définition  d'une forme 3D
- Extrusion d'une figure orthogonalement ou en révolution
- Pivoter, translater puis combiner les sous-éléments
    - Union
    - Intersection
    - Soustraction</pre> <center><img style="width: 16em;" alt="boolean operations"></center>`,1),fe=o(`<pre>Parametrix génère des scripts 3D pour:
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
		</pre>`),$e=o(`<pre>   Fin de
     la
présentation
     de
 Parametrix
		</pre>`),ye=o(`<pre style="color: orange">Prêt pour créer votre <i>propre</i> librairie de designs?
		</pre> <pre>npm create parametrix@latest tom07
		</pre>`,1),Pe=o("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1),xe=o('<h1 class="svelte-7e5ith">La prèz de Paramétrix</h1> <!>',1);function Se(W){var h=xe(),B=t(d(h),2);X(B,{children:(H,be)=>{var f=Pe(),$=d(f);n($,{children:(r,c)=>{var e=K(),a=d(e),i=v(a);p(i,"src",`${l??""}/favicon.svg`),g(a),m(2),s(r,e)}});var y=t($,2);n(y,{children:(r,c)=>{var e=N();m(4),s(r,e)}});var P=t(y,2);n(P,{children:(r,c)=>{var e=Y(),a=d(e);p(a,"src",`${l??""}/screen_gear.png`);var i=t(a,2);p(i,"src",`${l??""}/screen_helio_rake.png`),s(r,e)}});var x=t(P,2);n(x,{children:(r,c)=>{var e=Z(),a=d(e),i=v(a);p(i,"src",`${l??""}/screen_cabane.png`);var _=t(i,2);p(_,"src",`${l??""}/screen_doorstop.png`),g(a);var u=t(a,2),T=v(u);p(T,"src",`${l??""}/screen_trapeze.png`);var V=t(T,2);p(V,"src",`${l??""}/screen_reinforced_tube.png`),g(u),m(2),s(r,e)}});var b=t(x,2);n(b,{children:(r,c)=>{var e=ee(),a=t(d(e),2);p(a,"src",`${l??""}/puisvg/prez_parametrix_vs_classic_workflow.svg`),m(2),s(r,e)}});var w=t(b,2);n(w,{children:(r,c)=>{var e=re(),a=t(d(e),2);p(a,"src",`${l??""}/puisvg/cad_flow_with_parametrix.svg`),m(6),s(r,e)}});var D=t(w,2);n(D,{children:(r,c)=>{var e=ae();s(r,e)}});var z=t(D,2);n(z,{children:(r,c)=>{var e=te(),a=d(e);p(a,"src",`${l??""}/puisvg/prez_parametrix_condensed.svg`),m(2),s(r,e)}});var A=t(z,2);n(A,{children:(r,c)=>{var e=se();s(r,e)}});var k=t(A,2);n(k,{children:(r,c)=>{var e=oe();s(r,e)}});var C=t(k,2);n(C,{children:(r,c)=>{var e=ie();p(e,"src",`${l??""}/puisvg/concept_of_webapp_generator.svg`),s(r,e)}});var S=t(C,2);n(S,{children:(r,c)=>{var e=ne(),a=d(e),i=v(a);p(i,"src",`${l??""}/puisvg/parametrix_3D_shape_subset.svg`),g(a),m(2),s(r,e)}});var L=t(S,2);n(L,{children:(r,c)=>{var e=ce();s(r,e)}});var O=t(L,2);n(O,{children:(r,c)=>{var e=pe(),a=d(e),i=t(v(a),2);p(i,"src",`${l??""}/puisvg/codeExample1_contour.svg`),g(a),m(2),s(r,e)}});var U=t(O,2);n(U,{children:(r,c)=>{var e=le();s(r,e)}});var q=t(U,2);n(q,{children:(r,c)=>{var e=de(),a=d(e),i=v(a);p(i,"src",`${l??""}/puisvg/prez_stroke_and_arc.svg`),g(a),m(2),s(r,e)}});var E=t(q,2);n(E,{children:(r,c)=>{var e=me(),a=d(e),i=v(a);p(i,"src",`${l??""}/puisvg/prez_absolute_relative.svg`),g(a),m(2),s(r,e)}});var G=t(E,2);n(G,{children:(r,c)=>{var e=ve(),a=d(e),i=v(a);p(i,"src",`${l??""}/puisvg/prez_arcs.svg`),g(a),m(2),s(r,e)}});var R=t(G,2);n(R,{children:(r,c)=>{var e=ge(),a=d(e),i=v(a);p(i,"src",`${l??""}/puisvg/prez_curve_approximation.svg`),g(a),m(2),s(r,e)}});var I=t(R,2);n(I,{children:(r,c)=>{var e=_e(),a=d(e),i=v(a);p(i,"src",`${l??""}/puisvg/prez_corner_modifications.svg`),g(a),m(2),s(r,e)}});var F=t(I,2);n(F,{children:(r,c)=>{var e=ue(),a=d(e),i=v(a);p(i,"src",`${l??""}/puisvg/prez_design_structure.svg`);var _=t(i,2);p(_,"src",`${l??""}/puisvg/prez_figure_layers.svg`),g(a),m(2),s(r,e)}});var j=t(F,2);n(j,{children:(r,c)=>{var e=he(),a=d(e),i=v(a);p(i,"src",`${l??""}/puisvg/prez_extrudes.svg`),g(a);var _=t(a,4),u=v(_);p(u,"src",`${l??""}/puisvg/prez_boolean_operations.svg`),g(_),s(r,e)}});var M=t(j,2);n(M,{children:(r,c)=>{var e=fe();s(r,e)}});var J=t(M,2);n(J,{children:(r,c)=>{var e=$e();s(r,e)}});var Q=t(J,2);n(Q,{children:(r,c)=>{var e=ye();m(2),s(r,e)}}),s(H,f)},$$slots:{default:!0}}),s(W,h)}export{Se as component};
