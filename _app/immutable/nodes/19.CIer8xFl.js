import"../chunks/DsnmJJEf.js";import"../chunks/B0yeDSe9.js";import{p as re,s as t,f as m,a as o,b as ae,c as i,d as _,r as u,n as g,t as v}from"../chunks/BbPHKYFl.js";import{s as l}from"../chunks/B32sI_Hj.js";import{i as te}from"../chunks/HuASpZhE.js";import{a as d}from"../chunks/DJ0mkbHa.js";import{C as se,O as n}from"../chunks/D0RAwLpz.js";var oe=i('<center><img style="width: 9em;" alt="Parametrix logo"/></center> <div><pre style="font-size:2.5em; margin:0;">Parametrix</pre> <center><i style="color: lightSkyBlue;">Geometrix</i>&nbsp;<i style="color: pink;">Designix</i></center></div>',1),ie=i(`<pre style="font-size:2.5em; margin:0;">Parametrix</pre> <pre style="margin:0;">CAO en code pour l'open-hardware</pre> <pre style="margin:0;">Une solution JavaScript pour cr&eacute;er des formes 3D</pre>`,1),ne=i('<img style="width: 16em;" alt="screenshot of a gear"/> <img style="width: 16em;" alt="screenshot of the heliostat rake"/>',1),pe=i('<p><img style="height: 9em;" alt="screenshot of a cabane"/> <img style="width: 9em;" alt="screenshot of a doorstop"/></p> <p><img style="width: 9em;" alt="screenshot of a trapeze"/> <img style="width: 9em;" alt="screenshot of a reinforced tube"/></p> <p></p>',1),ce=i(`<pre style="font-size:1.5em; margin:0;">Parametrix workflow</pre> <img style="height: 9em;" alt="prez_parametrix_vs_classic_workflow"/> <pre>
Approche simplifi&eacute;e:
- centr&eacute;e sur la notion de contour (c.a.d 2.5D)
  - les proc&eacute;d&eacute;s de fabrication efficaces sont 2D
  - les m&eacute;canismes robustes sont 2D
- chaine d'outils CAO/FAO mieux controll&eacute;e
		</pre>`,1),le=i('<pre style="font-size:2em; margin:0;">G&eacute;n&eacute;ration de fichiers 3D </pre> <img style="height: 9em;" alt="cad_flow_with_parametrix.svg"/> <pre style="margin:0;">&gt; Des formes 3D décrites en JavaScript</pre> <pre style="margin:0;">&gt; Un frontend qui abstrait les outils de CAD</pre> <pre style="margin:0;">&gt; Un générateur de siteweb pour paramétriser les designs</pre>',1),de=i(`<pre class="smaller svelte-196l2va">
Les principaux avantages de Parametrix:

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
		</pre>`),me=i('<img style="width: 28em;" alt="Parametrix described in condensed"/> <p style="text-align:center; margin: 0.5rem">Parametrix en condens&eacute;</p>',1),ve=i(`<pre>
framework / éco-système : Parametrix

   librairie principale : Geometrix

  librairies de designs : Designix, Desi78, Desi82, ...
		</pre>`),ge=i(`<pre>
Passage en revue de l'interface graphique
		</pre>`),_e=i('<img style="width: 28em;" alt="designer and maker"/>'),ue=i(`<center><img style="width: 14em;" alt="3D shape subsets"/></center> <pre>
L'API de Geometrix pour designer des formes 3D
		</pre>`,1),fe=i(`<pre>
L'API de Geometrix en bref
		</pre>`),he=i(`<p><span style="font-size:2em">Example de code</span> <img style="height: 7em; vertical-align: middle" alt="codeExample1_contour.svg"/></p> <pre style="font-size:0.8em; padding-right: 5em">
const ctr1 = contour(0, 0)
	.addSegStrokeR(param.L2, 0)
	.addSegStrokeRP(a3, param.L3)
	.addPointAP(a4, param.L4)
	.addSegArc(param.R34, true, true)
	.addCornerRounded(param.R4)
	.addPointA(0, param.L5)
	.addSegArc3(a5, false)
	.closeSegStroke();
		</pre>`,1),$e=i(`<pre>
3 types de paramètres
- nombre
- checkbox (i.e. boolean)
- dropdown (i.e. enum)
		</pre>`),ye=i(`<center><img style="width: 9em;" alt="stroke and arcs"/></center> <pre>
Les contours sont composées exclusivement de:
- segments de droite
- arcs de cercle

Idéal pour générer le G-code
		</pre>`,1),Pe=i(`<center><img style="width: 22em;" alt="absolute relative cartesian polar"/></center> <pre>
Options possibles pour définir le prochain point
                   dans la définition d'un contour:
- Cartésien ou Polair
- Relative ou Absolue
		</pre>`,1),xe=i(`<center><img style="width: 22em;" alt="three ways for defining arcs"/></center> <pre>
3 possibilités pour définir un arc de cercle:
- le rayon avec les booléens large/small et ccw/cw
- un point intermédiaire
- l'angle de la tangente au début ou à la fin de l'arc
		</pre>`,1),be=i(`<center><img style="width: 22em;" alt="curve approximation"/></center> <pre>
Approximation des courbes quelconques:

double arcs de cercles définis avec
  leur angles de tangentes de début
  et de fin de segment de courbe
		</pre>`,1),we=i(`<center><img style="width: 15em;" alt="corner modifications"/></center> <pre>
Modifications des angles d'un contour:
- Arrondi [Rounded]
- Elargissement [Widened]
- Elargissement avec l'accès [WideAcc]
		</pre>`,1),De=i(`<center><img style="width: 14em;" alt="design structure"/>&nbsp;<img style="width: 10em;" alt="figure layers"/></center> <pre>
- Définition d'une liste de figures
- Attacher chaque contour à une figure en tant que:
    - principal [main]
    - secondaire [second]
    - ou dynamique [dynamics]
		</pre>`,1),ze=i(`<center><img style="width: 12em;" alt="extrudes"/></center> <pre style="margin: 0.5em;">
Définition  d'une forme 3D
- Extrusion d'une figure orthogonalement ou en révolution
- Pivoter, translater puis combiner les sous-éléments
    - Union
    - Intersection
    - Soustraction</pre> <center><img style="width: 16em;" alt="boolean operations"/></center>`,1),Ae=i(`<pre>
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
		</pre>`),ke=i(`<pre>
   Fin de
     la
présentation
     de
 Parametrix
		</pre>`),Ce=i(`<pre style="color: orange">
Prêt pour créer votre <i>propre</i> librairie de designs?
		</pre> <pre>
npm create parametrix@latest tom07
		</pre>`,1),Se=i("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1),Le=i('<h1 class="svelte-196l2va">La prèz de Paramétrix</h1> <!>',1);function je(H,Q){re(Q,!1),te();var y=Le(),V=t(m(y),2);se(V,{children:(X,Oe)=>{var P=Se(),x=m(P);n(x,{children:(r,p)=>{var e=oe(),a=m(e),s=_(a);u(a),g(2),v(c=>l(s,"src",c),[()=>d("/favicon.svg")]),o(r,e)}});var b=t(x,2);n(b,{children:(r,p)=>{var e=ie();g(4),o(r,e)}});var w=t(b,2);n(w,{children:(r,p)=>{var e=ne(),a=m(e),s=t(a,2);v((c,f)=>{l(a,"src",c),l(s,"src",f)},[()=>d("/screen_gear.png"),()=>d("/screen_helio_rake.png")]),o(r,e)}});var D=t(w,2);n(D,{children:(r,p)=>{var e=pe(),a=m(e),s=_(a),c=t(s,2);u(a);var f=t(a,2),h=_(f),$=t(h,2);u(f),g(2),v((N,Y,Z,ee)=>{l(s,"src",N),l(c,"src",Y),l(h,"src",Z),l($,"src",ee)},[()=>d("/screen_cabane.png"),()=>d("/screen_doorstop.png"),()=>d("/screen_trapeze.png"),()=>d("/screen_reinforced_tube.png")]),o(r,e)}});var z=t(D,2);n(z,{children:(r,p)=>{var e=ce(),a=t(m(e),2);g(2),v(s=>l(a,"src",s),[()=>d("/puisvg/prez_parametrix_vs_classic_workflow.svg")]),o(r,e)}});var A=t(z,2);n(A,{children:(r,p)=>{var e=le(),a=t(m(e),2);g(6),v(s=>l(a,"src",s),[()=>d("/puisvg/cad_flow_with_parametrix.svg")]),o(r,e)}});var k=t(A,2);n(k,{children:(r,p)=>{var e=de();o(r,e)}});var C=t(k,2);n(C,{children:(r,p)=>{var e=me(),a=m(e);g(2),v(s=>l(a,"src",s),[()=>d("/puisvg/prez_parametrix_condensed.svg")]),o(r,e)}});var S=t(C,2);n(S,{children:(r,p)=>{var e=ve();o(r,e)}});var L=t(S,2);n(L,{children:(r,p)=>{var e=ge();o(r,e)}});var O=t(L,2);n(O,{children:(r,p)=>{var e=_e();v(a=>l(e,"src",a),[()=>d("/puisvg/concept_of_webapp_generator.svg")]),o(r,e)}});var U=t(O,2);n(U,{children:(r,p)=>{var e=ue(),a=m(e),s=_(a);u(a),g(2),v(c=>l(s,"src",c),[()=>d("/puisvg/parametrix_3D_shape_subset.svg")]),o(r,e)}});var q=t(U,2);n(q,{children:(r,p)=>{var e=fe();o(r,e)}});var E=t(q,2);n(E,{children:(r,p)=>{var e=he(),a=m(e),s=t(_(a),2);u(a),g(2),v(c=>l(s,"src",c),[()=>d("/puisvg/codeExample1_contour.svg")]),o(r,e)}});var G=t(E,2);n(G,{children:(r,p)=>{var e=$e();o(r,e)}});var R=t(G,2);n(R,{children:(r,p)=>{var e=ye(),a=m(e),s=_(a);u(a),g(2),v(c=>l(s,"src",c),[()=>d("/puisvg/prez_stroke_and_arc.svg")]),o(r,e)}});var I=t(R,2);n(I,{children:(r,p)=>{var e=Pe(),a=m(e),s=_(a);u(a),g(2),v(c=>l(s,"src",c),[()=>d("/puisvg/prez_absolute_relative.svg")]),o(r,e)}});var F=t(I,2);n(F,{children:(r,p)=>{var e=xe(),a=m(e),s=_(a);u(a),g(2),v(c=>l(s,"src",c),[()=>d("/puisvg/prez_arcs.svg")]),o(r,e)}});var j=t(F,2);n(j,{children:(r,p)=>{var e=be(),a=m(e),s=_(a);u(a),g(2),v(c=>l(s,"src",c),[()=>d("/puisvg/prez_curve_approximation.svg")]),o(r,e)}});var M=t(j,2);n(M,{children:(r,p)=>{var e=we(),a=m(e),s=_(a);u(a),g(2),v(c=>l(s,"src",c),[()=>d("/puisvg/prez_corner_modifications.svg")]),o(r,e)}});var J=t(M,2);n(J,{children:(r,p)=>{var e=De(),a=m(e),s=_(a),c=t(s,2);u(a),g(2),v((f,h)=>{l(s,"src",f),l(c,"src",h)},[()=>d("/puisvg/prez_design_structure.svg"),()=>d("/puisvg/prez_figure_layers.svg")]),o(r,e)}});var T=t(J,2);n(T,{children:(r,p)=>{var e=ze(),a=m(e),s=_(a);u(a);var c=t(a,4),f=_(c);u(c),v((h,$)=>{l(s,"src",h),l(f,"src",$)},[()=>d("/puisvg/prez_extrudes.svg"),()=>d("/puisvg/prez_boolean_operations.svg")]),o(r,e)}});var W=t(T,2);n(W,{children:(r,p)=>{var e=Ae();o(r,e)}});var B=t(W,2);n(B,{children:(r,p)=>{var e=ke();o(r,e)}});var K=t(B,2);n(K,{children:(r,p)=>{var e=Ce();g(2),o(r,e)}}),o(X,P)},$$slots:{default:!0}}),o(H,y),ae()}export{je as component};
