import{a as s,t as o}from"../chunks/disclose-version.hZQnVkuN.js";import"../chunks/legacy.B1JD2d31.js";import{s as a,f as d,c as g,r as u,n as m}from"../chunks/runtime.DOqqfq0t.js";import{s as p}from"../chunks/attributes.CrYaOd-D.js";import{b as c}from"../chunks/paths.CqTI6goE.js";import{C as X,O as n}from"../chunks/OneSlide.ZS06EmhD.js";var K=o('<center><img style="width: 9em;" alt="Parametrix logo"></center> <div><pre style="font-size:2.5em; margin:0;">Parametrix</pre> <center><i style="color: lightSkyBlue;">Geometrix</i>&nbsp;<i style="color: pink;">Designix</i></center></div>',1),N=o(`<pre style="font-size:2.5em; margin:0;">Parametrix</pre> <pre style="margin:0;">CAO en code pour l'open-hardware</pre> <pre style="margin:0;">Une solution JavaScript pour cr&eacute;er des formes 3D</pre>`,1),V=o('<img style="width: 16em;" alt="screenshot of a gear"> <img style="width: 16em;" alt="screenshot of the heliostat rake">',1),Y=o('<p><img style="height: 9em;" alt="screenshot of a cabane"> <img style="width: 9em;" alt="screenshot of a doorstop"></p> <p><img style="width: 9em;" alt="screenshot of a trapeze"> <img style="width: 9em;" alt="screenshot of a reinforced tube"></p> <p></p>',1),Z=o(`<pre style="font-size:1.5em; margin:0;">Parametrix workflow</pre> <img style="height: 9em;" alt="prez_parametrix_vs_classic_workflow"> <pre>
Approche simplifi&eacute;e:
- centr&eacute;e sur la notion de contour (c.a.d 2.5D)
  - les proc&eacute;d&eacute;s de fabrication efficaces sont 2D
  - les m&eacute;canismes robustes sont 2D
- chaine d'outils CAO/FAO mieux controll&eacute;e
		</pre>`,1),ee=o('<pre style="font-size:2em; margin:0;">G&eacute;n&eacute;ration de fichiers 3D </pre> <img style="height: 9em;" alt="cad_flow_with_parametrix.svg"> <pre style="margin:0;">&gt; Des formes 3D décrites en JavaScript</pre> <pre style="margin:0;">&gt; Un frontend qui abstrait les outils de CAD</pre> <pre style="margin:0;">&gt; Un générateur de siteweb pour paramétriser les designs</pre>',1),re=o(`<pre>
Les caractéristiques principales de Parametrix:

1. Logiciel libre
    (comme Freecad ou SolveSpace)

2. JavaScript
    pour designer les formes 3D (comme avec OpenSCAD)

3. Une abstraction des outil de CAD
    Pour assurer la pérénité de ses designs 3D

4. Génère des pages HTML
    pour paramétriser et générer des scripts 3D
		</pre>`),te=o(`<pre>
framework / éco-système : Parametrix

   librairie principale : Geometrix

  librairies de designs : Designix, Desi78, Desi82, ...
		</pre>`),ae=o(`<pre>
Passage en revue de l'interface graphique
		</pre>`),se=o('<img style="width: 28em;" alt="designer and maker">'),oe=o(`<center><img style="width: 14em;" alt="3D shape subsets"></center> <pre>
L'API de Geometrix pour designer des formes 3D
		</pre>`,1),ie=o(`<pre>
L'API de Geometrix en bref
		</pre>`),ne=o(`<p><span style="font-size:2em">Example de code</span> <img style="height: 7em; vertical-align: middle" alt="codeExample1_contour.svg"></p> <pre style="font-size:0.8em; padding-right: 5em">
const ctr1 = contour(0, 0)
	.addSegStrokeR(param.L2, 0)
	.addSegStrokeRP(a3, param.L3)
	.addPointAP(a4, param.L4)
	.addSegArc(param.R34, true, true)
	.addCornerRounded(param.R4)
	.addPointA(0, param.L5)
	.addSegArc3(a5, false)
	.closeSegStroke();
		</pre>`,1),le=o(`<pre>
3 types de paramètres
- nombre
- checkbox (i.e. boolean)
- dropdown (i.e. enum)
		</pre>`),pe=o(`<center><img style="width: 9em;" alt="stroke and arcs"></center> <pre>
Les contours sont composées exclusivement de:
- segments de droite
- arcs de cercle

Idéal pour générer le G-code
		</pre>`,1),ce=o(`<center><img style="width: 22em;" alt="absolute relative cartesian polar"></center> <pre>
Options possibles pour définir le prochain point
                   dans la définition d'un contour:
- Cartésien ou Polair
- Relative ou Absolue
		</pre>`,1),de=o(`<center><img style="width: 22em;" alt="three ways for defining arcs"></center> <pre>
3 possibilités pour définir un arc de cercle:
- le rayon avec les booléens large/small et ccw/cw
- un point intermédiaire
- l'angle de la tangente au début ou à la fin de l'arc
		</pre>`,1),me=o(`<center><img style="width: 22em;" alt="curve approximation"></center> <pre>
Approximation des courbes quelconques:

double arcs de cercles définis avec
  leur angles de tangentes de début
  et de fin de segment de courbe
		</pre>`,1),ge=o(`<center><img style="width: 15em;" alt="corner modifications"></center> <pre>
Modifications des angles d'un contour:
- Arrondi [Rounded]
- Elargissement [Widened]
- Elargissement avec l'accès [WideAcc]
		</pre>`,1),ue=o(`<center><img style="width: 14em;" alt="design structure">&nbsp;<img style="width: 10em;" alt="figure layers"></center> <pre>
- Définition d'une liste de figures
- Attacher chaque contour à une figure en tant que:
    - principal [main]
    - secondaire [second]
    - ou dynamique [dynamics]
		</pre>`,1),ve=o(`<center><img style="width: 12em;" alt="extrudes"></center> <pre style="margin: 0.5em;">
Définition  d'une forme 3D
- Extrusion d'une figure orthogonalement ou en révolution
- Pivoter, translater puis combiner les sous-éléments
    - Union
    - Intersection
    - Soustraction</pre> <center><img style="width: 16em;" alt="boolean operations"></center>`,1),_e=o(`<pre>
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
		</pre>`),$e=o(`<pre>
   Fin de
     la
présentation
     de
 Parametrix
		</pre>`),fe=o(`<pre style="color: orange">
Prêt pour créer votre <i>propre</i> librairie de designs?
		</pre> <pre>
npm create parametrix@latest tom07
		</pre>`,1),he=o("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1),ye=o('<h1 class="svelte-1vccleq">La prèz de Paramétrix</h1> <!>',1);function Se(j){var $=ye(),W=a(d($),2);X(W,{children:(B,Pe)=>{var f=he(),h=d(f);n(h,{children:(r,l)=>{var e=K(),t=d(e),i=g(t);p(i,"src",`${c??""}/favicon.svg`),u(t),m(2),s(r,e)},$$slots:{default:!0}});var y=a(h,2);n(y,{children:(r,l)=>{var e=N();m(4),s(r,e)},$$slots:{default:!0}});var P=a(y,2);n(P,{children:(r,l)=>{var e=V(),t=d(e);p(t,"src",`${c??""}/screen_gear.png`);var i=a(t,2);p(i,"src",`${c??""}/screen_helio_rake.png`),s(r,e)},$$slots:{default:!0}});var b=a(P,2);n(b,{children:(r,l)=>{var e=Y(),t=d(e),i=g(t);p(i,"src",`${c??""}/screen_cabane.png`);var v=a(i,2);p(v,"src",`${c??""}/screen_doorstop.png`),u(t);var _=a(t,2),T=g(_);p(T,"src",`${c??""}/screen_trapeze.png`);var Q=a(T,2);p(Q,"src",`${c??""}/screen_reinforced_tube.png`),u(_),m(2),s(r,e)},$$slots:{default:!0}});var w=a(b,2);n(w,{children:(r,l)=>{var e=Z(),t=a(d(e),2);p(t,"src",`${c??""}/puisvg/prez_parametrix_vs_classic_workflow.svg`),m(2),s(r,e)},$$slots:{default:!0}});var x=a(w,2);n(x,{children:(r,l)=>{var e=ee(),t=a(d(e),2);p(t,"src",`${c??""}/puisvg/cad_flow_with_parametrix.svg`),m(6),s(r,e)},$$slots:{default:!0}});var D=a(x,2);n(D,{children:(r,l)=>{var e=re();s(r,e)},$$slots:{default:!0}});var z=a(D,2);n(z,{children:(r,l)=>{var e=te();s(r,e)},$$slots:{default:!0}});var A=a(z,2);n(A,{children:(r,l)=>{var e=ae();s(r,e)},$$slots:{default:!0}});var S=a(A,2);n(S,{children:(r,l)=>{var e=se();p(e,"src",`${c??""}/puisvg/concept_of_webapp_generator.svg`),s(r,e)},$$slots:{default:!0}});var C=a(S,2);n(C,{children:(r,l)=>{var e=oe(),t=d(e),i=g(t);p(i,"src",`${c??""}/puisvg/parametrix_3D_shape_subset.svg`),u(t),m(2),s(r,e)},$$slots:{default:!0}});var k=a(C,2);n(k,{children:(r,l)=>{var e=ie();s(r,e)},$$slots:{default:!0}});var L=a(k,2);n(L,{children:(r,l)=>{var e=ne(),t=d(e),i=a(g(t),2);p(i,"src",`${c??""}/puisvg/codeExample1_contour.svg`),u(t),m(2),s(r,e)},$$slots:{default:!0}});var O=a(L,2);n(O,{children:(r,l)=>{var e=le();s(r,e)},$$slots:{default:!0}});var q=a(O,2);n(q,{children:(r,l)=>{var e=pe(),t=d(e),i=g(t);p(i,"src",`${c??""}/puisvg/prez_stroke_and_arc.svg`),u(t),m(2),s(r,e)},$$slots:{default:!0}});var G=a(q,2);n(G,{children:(r,l)=>{var e=ce(),t=d(e),i=g(t);p(i,"src",`${c??""}/puisvg/prez_absolute_relative.svg`),u(t),m(2),s(r,e)},$$slots:{default:!0}});var R=a(G,2);n(R,{children:(r,l)=>{var e=de(),t=d(e),i=g(t);p(i,"src",`${c??""}/puisvg/prez_arcs.svg`),u(t),m(2),s(r,e)},$$slots:{default:!0}});var E=a(R,2);n(E,{children:(r,l)=>{var e=me(),t=d(e),i=g(t);p(i,"src",`${c??""}/puisvg/prez_curve_approximation.svg`),u(t),m(2),s(r,e)},$$slots:{default:!0}});var F=a(E,2);n(F,{children:(r,l)=>{var e=ge(),t=d(e),i=g(t);p(i,"src",`${c??""}/puisvg/prez_corner_modifications.svg`),u(t),m(2),s(r,e)},$$slots:{default:!0}});var U=a(F,2);n(U,{children:(r,l)=>{var e=ue(),t=d(e),i=g(t);p(i,"src",`${c??""}/puisvg/prez_design_structure.svg`);var v=a(i,2);p(v,"src",`${c??""}/puisvg/prez_figure_layers.svg`),u(t),m(2),s(r,e)},$$slots:{default:!0}});var I=a(U,2);n(I,{children:(r,l)=>{var e=ve(),t=d(e),i=g(t);p(i,"src",`${c??""}/puisvg/prez_extrudes.svg`),u(t);var v=a(t,4),_=g(v);p(_,"src",`${c??""}/puisvg/prez_boolean_operations.svg`),u(v),s(r,e)},$$slots:{default:!0}});var J=a(I,2);n(J,{children:(r,l)=>{var e=_e();s(r,e)},$$slots:{default:!0}});var M=a(J,2);n(M,{children:(r,l)=>{var e=$e();s(r,e)},$$slots:{default:!0}});var H=a(M,2);n(H,{children:(r,l)=>{var e=fe();m(2),s(r,e)},$$slots:{default:!0}}),s(B,f)},$$slots:{default:!0}}),s(j,$)}export{Se as component};
