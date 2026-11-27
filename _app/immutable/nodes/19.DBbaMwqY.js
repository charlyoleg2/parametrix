import{A as e,B as t,M as n,R as r,V as i,a,at as o,d as s,et as c,ot as l,q as u,tt as d,z as f}from"../chunks/ocvvlz9L.js";import"../chunks/DUV2dAR1.js";import{t as p}from"../chunks/L6VgFiAE.js";import"../chunks/DURrGsbg.js";import{n as m,t as h}from"../chunks/CYKTtZJ8.js";var g=n(`<center><img style="width: 9em;" alt="Parametrix logo"/></center> <div><pre style="font-size:2.5em; margin:0;">Parametrix</pre> <center><i style="color: lightSkyBlue;">Geometrix</i> <i style="color: pink;">Designix</i></center></div>`,1),_=n(`<pre style="font-size:2.5em; margin:0;">Parametrix</pre> <pre style="margin:0;">CAO en code pour l'open-hardware</pre> <pre style="margin:0;">Une solution JavaScript pour créer des formes 3D</pre>`,1),v=n(`<img style="width: 16em;" alt="screenshot of a gear"/> <img style="width: 16em;" alt="screenshot of the heliostat rake"/>`,1),y=n(`<p><img style="height: 9em;" alt="screenshot of a cabane"/> <img style="width: 9em;" alt="screenshot of a doorstop"/></p> <p><img style="width: 9em;" alt="screenshot of a trapeze"/> <img style="width: 9em;" alt="screenshot of a reinforced tube"/></p> <p></p>`,1),b=n(`<pre style="font-size:1.5em; margin:0;">Parametrix workflow</pre> <img style="height: 9em;" alt="prez_parametrix_vs_classic_workflow"/> <pre>
Approche simplifiée:
- centrée sur la notion de contour (c.a.d 2.5D)
  - les procédés de fabrication efficaces sont 2D
  - les mécanismes robustes sont 2D
- chaine d'outils CAO/FAO mieux controllée
		</pre>`,1),ee=n(`<pre style="font-size:2em; margin:0;">Génération de fichiers 3D </pre> <img style="height: 9em;" alt="cad_flow_with_parametrix.svg"/> <pre style="margin:0;">> Des formes 3D décrites en JavaScript</pre> <pre style="margin:0;">> Un frontend qui abstrait les outils de CAD</pre> <pre style="margin:0;">> Un générateur de siteweb pour paramétriser les designs</pre>`,1),x=n(`<pre class="smaller svelte-196l2va">
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
    Votre modèle 3D est une recette écrite dans un fichier javacript
		</pre>`),S=n(`<img style="width: 28em;" alt="Parametrix described in condensed"/> <p style="text-align:center; margin: 0.5rem">Parametrix en condensé</p>`,1),C=n(`<pre>
framework / éco-système : Parametrix

   librairie principale : Geometrix

  librairies de designs : Designix, Desi78, Desi82, ...
		</pre>`),w=n(`<pre>
Passage en revue de l'interface graphique
		</pre>`),T=n(`<img style="width: 28em;" alt="designer and maker"/>`),E=n(`<center><img style="width: 14em;" alt="3D shape subsets"/></center> <pre>
L'API de Geometrix pour designer des formes 3D
		</pre>`,1),D=n(`<pre>
L'API de Geometrix en bref
		</pre>`),O=n(`<p><span style="font-size:2em">Example de code</span> <img style="height: 7em; vertical-align: middle" alt="codeExample1_contour.svg"/></p> <pre style="font-size:0.8em; padding-right: 5em">
const ctr1 = contour(0, 0)
	.addSegStrokeR(param.L2, 0)
	.addSegStrokeRP(a3, param.L3)
	.addPointAP(a4, param.L4)
	.addSegArc(param.R34, true, true)
	.addCornerRounded(param.R4)
	.addPointA(0, param.L5)
	.addSegArc3(a5, false)
	.closeSegStroke();
		</pre>`,1),k=n(`<pre>
3 types de paramètres
- nombre
- checkbox (i.e. boolean)
- dropdown (i.e. enum)
		</pre>`),A=n(`<center><img style="width: 9em;" alt="stroke and arcs"/></center> <pre>
Les contours sont composées exclusivement de:
- segments de droite
- arcs de cercle

Idéal pour générer le G-code
		</pre>`,1),te=n(`<center><img style="width: 22em;" alt="absolute relative cartesian polar"/></center> <pre>
Options possibles pour définir le prochain point
                   dans la définition d'un contour:
- Cartésien ou Polair
- Relative ou Absolue
		</pre>`,1),ne=n(`<center><img style="width: 22em;" alt="three ways for defining arcs"/></center> <pre>
3 possibilités pour définir un arc de cercle:
- le rayon avec les booléens large/small et ccw/cw
- un point intermédiaire
- l'angle de la tangente au début ou à la fin de l'arc
		</pre>`,1),re=n(`<center><img style="width: 22em;" alt="curve approximation"/></center> <pre>
Approximation des courbes quelconques:

double arcs de cercles définis avec
  leur angles de tangentes de début
  et de fin de segment de courbe
		</pre>`,1),ie=n(`<center><img style="width: 15em;" alt="corner modifications"/></center> <pre>
Modifications des angles d'un contour:
- Arrondi [Rounded]
- Elargissement [Widened]
- Elargissement avec l'accès [WideAcc]
		</pre>`,1),ae=n(`<center><img style="width: 14em;" alt="design structure"/> <img style="width: 10em;" alt="figure layers"/></center> <pre>
- Définition d'une liste de figures
- Attacher chaque contour à une figure en tant que:
    - principal [main]
    - secondaire [second]
    - ou dynamique [dynamics]
		</pre>`,1),oe=n(`<center><img style="width: 12em;" alt="extrudes"/></center> <pre style="margin: 0.5em;">
Définition  d'une forme 3D
- Extrusion d'une figure orthogonalement ou en révolution
- Pivoter, translater puis combiner les sous-éléments
    - Union
    - Intersection
    - Soustraction</pre> <center><img style="width: 16em;" alt="boolean operations"/></center>`,1),se=n(`<pre>
Parametrix génère des scripts 3D pour:
- OpenSCAD <span style="color: green;">✔</span>
- OpenJsCad <span style="color: green;">✔</span>
- Freecad <span style="color: green;">✔</span>
- SolveSpace
- pythonOCC
- CadQuery
- OpenCascade.js
- Three.js
- glTF
- X3D
- ManifoldCAD
		</pre>`),ce=n(`<pre>
   Fin de
     la
présentation
     de
 Parametrix
		</pre>`),le=n(`<pre style="color: orange">
Prêt pour créer votre <i>propre</i> librairie de designs?
		</pre> <pre>
npm create parametrix@latest tom07
		</pre>`,1),j=n(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),M=n(`<h1 class="svelte-196l2va">La prèz de Paramétrix</h1> <!>`,1);function N(n,N){d(N,!1),a();var P=M(),F=i(f(P),2);m(F,{children:(n,a)=>{var c=j(),d=f(c);h(d,{children:(n,r)=>{var i=g(),a=f(i),c=t(a);o(2),u(e=>s(c,`src`,e),[()=>p(`favicon.svg`)]),e(n,i)},$$slots:{default:!0}});var m=i(d,2);h(m,{children:(t,n)=>{var r=_();o(4),e(t,r)},$$slots:{default:!0}});var M=i(m,2);h(M,{children:(t,n)=>{var r=v(),a=f(r),o=i(a,2);u((e,t)=>{s(a,`src`,e),s(o,`src`,t)},[()=>p(`screen_gear.png`),()=>p(`screen_helio_rake.png`)]),e(t,r)},$$slots:{default:!0}});var N=i(M,2);h(N,{children:(t,n)=>{var a=y(),c=f(a),d=r(c),m=i(d,2);l(c);var h=i(c,2),g=r(h),_=i(g,2);l(h),o(2),u((e,t,n,r)=>{s(d,`src`,e),s(m,`src`,t),s(g,`src`,n),s(_,`src`,r)},[()=>p(`screen_cabane.png`),()=>p(`screen_doorstop.png`),()=>p(`screen_trapeze.png`),()=>p(`screen_reinforced_tube.png`)]),e(t,a)},$$slots:{default:!0}});var P=i(N,2);h(P,{children:(t,n)=>{var r=b(),a=i(f(r),2);o(2),u(e=>s(a,`src`,e),[()=>p(`puisvg/prez_parametrix_vs_classic_workflow.svg`)]),e(t,r)},$$slots:{default:!0}});var F=i(P,2);h(F,{children:(t,n)=>{var r=ee(),a=i(f(r),2);o(6),u(e=>s(a,`src`,e),[()=>p(`puisvg/cad_flow_with_parametrix.svg`)]),e(t,r)},$$slots:{default:!0}});var I=i(F,2);h(I,{children:(t,n)=>{var r=x();e(t,r)},$$slots:{default:!0}});var L=i(I,2);h(L,{children:(t,n)=>{var r=S(),i=f(r);o(2),u(e=>s(i,`src`,e),[()=>p(`puisvg/prez_parametrix_condensed.svg`)]),e(t,r)},$$slots:{default:!0}});var R=i(L,2);h(R,{children:(t,n)=>{var r=C();e(t,r)},$$slots:{default:!0}});var z=i(R,2);h(z,{children:(t,n)=>{var r=w();e(t,r)},$$slots:{default:!0}});var B=i(z,2);h(B,{children:(t,n)=>{var r=T();u(e=>s(r,`src`,e),[()=>p(`puisvg/concept_of_webapp_generator.svg`)]),e(t,r)},$$slots:{default:!0}});var V=i(B,2);h(V,{children:(n,r)=>{var i=E(),a=f(i),c=t(a);o(2),u(e=>s(c,`src`,e),[()=>p(`puisvg/parametrix_3D_shape_subset.svg`)]),e(n,i)},$$slots:{default:!0}});var H=i(V,2);h(H,{children:(t,n)=>{var r=D();e(t,r)},$$slots:{default:!0}});var U=i(H,2);h(U,{children:(t,n)=>{var a=O(),c=f(a),d=i(r(c),2);l(c),o(2),u(e=>s(d,`src`,e),[()=>p(`puisvg/codeExample1_contour.svg`)]),e(t,a)},$$slots:{default:!0}});var W=i(U,2);h(W,{children:(t,n)=>{var r=k();e(t,r)},$$slots:{default:!0}});var G=i(W,2);h(G,{children:(n,r)=>{var i=A(),a=f(i),c=t(a);o(2),u(e=>s(c,`src`,e),[()=>p(`puisvg/prez_stroke_and_arc.svg`)]),e(n,i)},$$slots:{default:!0}});var K=i(G,2);h(K,{children:(n,r)=>{var i=te(),a=f(i),c=t(a);o(2),u(e=>s(c,`src`,e),[()=>p(`puisvg/prez_absolute_relative.svg`)]),e(n,i)},$$slots:{default:!0}});var q=i(K,2);h(q,{children:(n,r)=>{var i=ne(),a=f(i),c=t(a);o(2),u(e=>s(c,`src`,e),[()=>p(`puisvg/prez_arcs.svg`)]),e(n,i)},$$slots:{default:!0}});var J=i(q,2);h(J,{children:(n,r)=>{var i=re(),a=f(i),c=t(a);o(2),u(e=>s(c,`src`,e),[()=>p(`puisvg/prez_curve_approximation.svg`)]),e(n,i)},$$slots:{default:!0}});var Y=i(J,2);h(Y,{children:(n,r)=>{var i=ie(),a=f(i),c=t(a);o(2),u(e=>s(c,`src`,e),[()=>p(`puisvg/prez_corner_modifications.svg`)]),e(n,i)},$$slots:{default:!0}});var X=i(Y,2);h(X,{children:(t,n)=>{var a=ae(),c=f(a),d=r(c),m=i(d,2);l(c),o(2),u((e,t)=>{s(d,`src`,e),s(m,`src`,t)},[()=>p(`puisvg/prez_design_structure.svg`),()=>p(`puisvg/prez_figure_layers.svg`)]),e(t,a)},$$slots:{default:!0}});var Z=i(X,2);h(Z,{children:(n,r)=>{var a=oe(),o=f(a),c=t(o),l=i(o,4),d=t(l);u((e,t)=>{s(c,`src`,e),s(d,`src`,t)},[()=>p(`puisvg/prez_extrudes.svg`),()=>p(`puisvg/prez_boolean_operations.svg`)]),e(n,a)},$$slots:{default:!0}});var Q=i(Z,2);h(Q,{children:(t,n)=>{var r=se();e(t,r)},$$slots:{default:!0}});var $=i(Q,2);h($,{children:(t,n)=>{var r=ce();e(t,r)},$$slots:{default:!0}});var ue=i($,2);h(ue,{children:(t,n)=>{var r=le();o(2),e(t,r)},$$slots:{default:!0}}),e(n,c)},$$slots:{default:!0}}),e(n,P),c()}export{N as component};