import{A as e,B as t,G as n,K as r,O as i,h as a,l as o,nt as s,ot as c,q as l,st as u,tt as d}from"../chunks/DzG1r9-t.js";import{l as f}from"../chunks/CpfSEvmW.js";import"../chunks/BFbU5qhn.js";import"../chunks/CPKxJe9a.js";import{n as p,t as m}from"../chunks/D_t0oIRA.js";var h=e(`<center><img style="width: 9em;" alt="Parametrix logo"/></center> <div><pre style="font-size:2.5em; margin:0;">Parametrix</pre> <center><i style="color: lightSkyBlue;">Geometrix</i>&nbsp;<i style="color: pink;">Designix</i></center></div>`,1),g=e(`<pre style="font-size:2.5em; margin:0;">Parametrix</pre> <pre style="margin:0;">CAO en code pour l'open-hardware</pre> <pre style="margin:0;">Une solution JavaScript pour cr&eacute;er des formes 3D</pre>`,1),_=e(`<img style="width: 16em;" alt="screenshot of a gear"/> <img style="width: 16em;" alt="screenshot of the heliostat rake"/>`,1),v=e(`<p><img style="height: 9em;" alt="screenshot of a cabane"/> <img style="width: 9em;" alt="screenshot of a doorstop"/></p> <p><img style="width: 9em;" alt="screenshot of a trapeze"/> <img style="width: 9em;" alt="screenshot of a reinforced tube"/></p> <p></p>`,1),y=e(`<pre style="font-size:1.5em; margin:0;">Parametrix workflow</pre> <img style="height: 9em;" alt="prez_parametrix_vs_classic_workflow"/> <pre>
Approche simplifi&eacute;e:
- centr&eacute;e sur la notion de contour (c.a.d 2.5D)
  - les proc&eacute;d&eacute;s de fabrication efficaces sont 2D
  - les m&eacute;canismes robustes sont 2D
- chaine d'outils CAO/FAO mieux controll&eacute;e
		</pre>`,1),b=e(`<pre style="font-size:2em; margin:0;">G&eacute;n&eacute;ration de fichiers 3D </pre> <img style="height: 9em;" alt="cad_flow_with_parametrix.svg"/> <pre style="margin:0;">&gt; Des formes 3D décrites en JavaScript</pre> <pre style="margin:0;">&gt; Un frontend qui abstrait les outils de CAD</pre> <pre style="margin:0;">&gt; Un générateur de siteweb pour paramétriser les designs</pre>`,1),x=e(`<pre class="smaller svelte-196l2va">
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
		</pre>`),S=e(`<img style="width: 28em;" alt="Parametrix described in condensed"/> <p style="text-align:center; margin: 0.5rem">Parametrix en condens&eacute;</p>`,1),C=e(`<pre>
framework / éco-système : Parametrix

   librairie principale : Geometrix

  librairies de designs : Designix, Desi78, Desi82, ...
		</pre>`),w=e(`<pre>
Passage en revue de l'interface graphique
		</pre>`),T=e(`<img style="width: 28em;" alt="designer and maker"/>`),E=e(`<center><img style="width: 14em;" alt="3D shape subsets"/></center> <pre>
L'API de Geometrix pour designer des formes 3D
		</pre>`,1),D=e(`<pre>
L'API de Geometrix en bref
		</pre>`),O=e(`<p><span style="font-size:2em">Example de code</span> <img style="height: 7em; vertical-align: middle" alt="codeExample1_contour.svg"/></p> <pre style="font-size:0.8em; padding-right: 5em">
const ctr1 = contour(0, 0)
	.addSegStrokeR(param.L2, 0)
	.addSegStrokeRP(a3, param.L3)
	.addPointAP(a4, param.L4)
	.addSegArc(param.R34, true, true)
	.addCornerRounded(param.R4)
	.addPointA(0, param.L5)
	.addSegArc3(a5, false)
	.closeSegStroke();
		</pre>`,1),k=e(`<pre>
3 types de paramètres
- nombre
- checkbox (i.e. boolean)
- dropdown (i.e. enum)
		</pre>`),A=e(`<center><img style="width: 9em;" alt="stroke and arcs"/></center> <pre>
Les contours sont composées exclusivement de:
- segments de droite
- arcs de cercle

Idéal pour générer le G-code
		</pre>`,1),j=e(`<center><img style="width: 22em;" alt="absolute relative cartesian polar"/></center> <pre>
Options possibles pour définir le prochain point
                   dans la définition d'un contour:
- Cartésien ou Polair
- Relative ou Absolue
		</pre>`,1),ee=e(`<center><img style="width: 22em;" alt="three ways for defining arcs"/></center> <pre>
3 possibilités pour définir un arc de cercle:
- le rayon avec les booléens large/small et ccw/cw
- un point intermédiaire
- l'angle de la tangente au début ou à la fin de l'arc
		</pre>`,1),te=e(`<center><img style="width: 22em;" alt="curve approximation"/></center> <pre>
Approximation des courbes quelconques:

double arcs de cercles définis avec
  leur angles de tangentes de début
  et de fin de segment de courbe
		</pre>`,1),ne=e(`<center><img style="width: 15em;" alt="corner modifications"/></center> <pre>
Modifications des angles d'un contour:
- Arrondi [Rounded]
- Elargissement [Widened]
- Elargissement avec l'accès [WideAcc]
		</pre>`,1),re=e(`<center><img style="width: 14em;" alt="design structure"/>&nbsp;<img style="width: 10em;" alt="figure layers"/></center> <pre>
- Définition d'une liste de figures
- Attacher chaque contour à une figure en tant que:
    - principal [main]
    - secondaire [second]
    - ou dynamique [dynamics]
		</pre>`,1),ie=e(`<center><img style="width: 12em;" alt="extrudes"/></center> <pre style="margin: 0.5em;">
Définition  d'une forme 3D
- Extrusion d'une figure orthogonalement ou en révolution
- Pivoter, translater puis combiner les sous-éléments
    - Union
    - Intersection
    - Soustraction</pre> <center><img style="width: 16em;" alt="boolean operations"/></center>`,1),ae=e(`<pre>
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
		</pre>`),oe=e(`<pre>
   Fin de
     la
présentation
     de
 Parametrix
		</pre>`),se=e(`<pre style="color: orange">
Prêt pour créer votre <i>propre</i> librairie de designs?
		</pre> <pre>
npm create parametrix@latest tom07
		</pre>`,1),ce=e(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),M=e(`<h1 class="svelte-196l2va">La prèz de Paramétrix</h1> <!>`,1);function N(e,N){s(N,!1),o();var P=M();p(l(r(P),2),{children:(e,o)=>{var s=ce(),d=r(s);m(d,{children:(e,o)=>{var s=h(),l=r(s),d=n(l);u(l),c(2),t(e=>a(d,`src`,e),[()=>f(`/favicon.svg`)]),i(e,s)},$$slots:{default:!0}});var p=l(d,2);m(p,{children:(e,t)=>{var n=g();c(4),i(e,n)},$$slots:{default:!0}});var M=l(p,2);m(M,{children:(e,n)=>{var o=_(),s=r(o),c=l(s,2);t((e,t)=>{a(s,`src`,e),a(c,`src`,t)},[()=>f(`/screen_gear.png`),()=>f(`/screen_helio_rake.png`)]),i(e,o)},$$slots:{default:!0}});var N=l(M,2);m(N,{children:(e,o)=>{var s=v(),d=r(s),p=n(d),m=l(p,2);u(d);var h=l(d,2),g=n(h),_=l(g,2);u(h),c(2),t((e,t,n,r)=>{a(p,`src`,e),a(m,`src`,t),a(g,`src`,n),a(_,`src`,r)},[()=>f(`/screen_cabane.png`),()=>f(`/screen_doorstop.png`),()=>f(`/screen_trapeze.png`),()=>f(`/screen_reinforced_tube.png`)]),i(e,s)},$$slots:{default:!0}});var P=l(N,2);m(P,{children:(e,n)=>{var o=y(),s=l(r(o),2);c(2),t(e=>a(s,`src`,e),[()=>f(`/puisvg/prez_parametrix_vs_classic_workflow.svg`)]),i(e,o)},$$slots:{default:!0}});var F=l(P,2);m(F,{children:(e,n)=>{var o=b(),s=l(r(o),2);c(6),t(e=>a(s,`src`,e),[()=>f(`/puisvg/cad_flow_with_parametrix.svg`)]),i(e,o)},$$slots:{default:!0}});var I=l(F,2);m(I,{children:(e,t)=>{i(e,x())},$$slots:{default:!0}});var L=l(I,2);m(L,{children:(e,n)=>{var o=S(),s=r(o);c(2),t(e=>a(s,`src`,e),[()=>f(`/puisvg/prez_parametrix_condensed.svg`)]),i(e,o)},$$slots:{default:!0}});var R=l(L,2);m(R,{children:(e,t)=>{i(e,C())},$$slots:{default:!0}});var z=l(R,2);m(z,{children:(e,t)=>{i(e,w())},$$slots:{default:!0}});var B=l(z,2);m(B,{children:(e,n)=>{var r=T();t(e=>a(r,`src`,e),[()=>f(`/puisvg/concept_of_webapp_generator.svg`)]),i(e,r)},$$slots:{default:!0}});var V=l(B,2);m(V,{children:(e,o)=>{var s=E(),l=r(s),d=n(l);u(l),c(2),t(e=>a(d,`src`,e),[()=>f(`/puisvg/parametrix_3D_shape_subset.svg`)]),i(e,s)},$$slots:{default:!0}});var H=l(V,2);m(H,{children:(e,t)=>{i(e,D())},$$slots:{default:!0}});var U=l(H,2);m(U,{children:(e,o)=>{var s=O(),d=r(s),p=l(n(d),2);u(d),c(2),t(e=>a(p,`src`,e),[()=>f(`/puisvg/codeExample1_contour.svg`)]),i(e,s)},$$slots:{default:!0}});var W=l(U,2);m(W,{children:(e,t)=>{i(e,k())},$$slots:{default:!0}});var G=l(W,2);m(G,{children:(e,o)=>{var s=A(),l=r(s),d=n(l);u(l),c(2),t(e=>a(d,`src`,e),[()=>f(`/puisvg/prez_stroke_and_arc.svg`)]),i(e,s)},$$slots:{default:!0}});var K=l(G,2);m(K,{children:(e,o)=>{var s=j(),l=r(s),d=n(l);u(l),c(2),t(e=>a(d,`src`,e),[()=>f(`/puisvg/prez_absolute_relative.svg`)]),i(e,s)},$$slots:{default:!0}});var q=l(K,2);m(q,{children:(e,o)=>{var s=ee(),l=r(s),d=n(l);u(l),c(2),t(e=>a(d,`src`,e),[()=>f(`/puisvg/prez_arcs.svg`)]),i(e,s)},$$slots:{default:!0}});var J=l(q,2);m(J,{children:(e,o)=>{var s=te(),l=r(s),d=n(l);u(l),c(2),t(e=>a(d,`src`,e),[()=>f(`/puisvg/prez_curve_approximation.svg`)]),i(e,s)},$$slots:{default:!0}});var Y=l(J,2);m(Y,{children:(e,o)=>{var s=ne(),l=r(s),d=n(l);u(l),c(2),t(e=>a(d,`src`,e),[()=>f(`/puisvg/prez_corner_modifications.svg`)]),i(e,s)},$$slots:{default:!0}});var X=l(Y,2);m(X,{children:(e,o)=>{var s=re(),d=r(s),p=n(d),m=l(p,2);u(d),c(2),t((e,t)=>{a(p,`src`,e),a(m,`src`,t)},[()=>f(`/puisvg/prez_design_structure.svg`),()=>f(`/puisvg/prez_figure_layers.svg`)]),i(e,s)},$$slots:{default:!0}});var Z=l(X,2);m(Z,{children:(e,o)=>{var s=ie(),c=r(s),d=n(c);u(c);var p=l(c,4),m=n(p);u(p),t((e,t)=>{a(d,`src`,e),a(m,`src`,t)},[()=>f(`/puisvg/prez_extrudes.svg`),()=>f(`/puisvg/prez_boolean_operations.svg`)]),i(e,s)},$$slots:{default:!0}});var Q=l(Z,2);m(Q,{children:(e,t)=>{i(e,ae())},$$slots:{default:!0}});var $=l(Q,2);m($,{children:(e,t)=>{i(e,oe())},$$slots:{default:!0}}),m(l($,2),{children:(e,t)=>{var n=se();c(2),i(e,n)},$$slots:{default:!0}}),i(e,s)},$$slots:{default:!0}}),i(e,P),d()}export{N as component};