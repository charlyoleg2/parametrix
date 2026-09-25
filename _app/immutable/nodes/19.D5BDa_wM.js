import{A as e,H as t,J as n,K as r,M as i,Y as a,ct as o,g as s,it as c,lt as l,q as u,rt as d,u as f}from"../chunks/BtB4LYEH.js";import{s as p}from"../chunks/pCjhCps3.js";import"../chunks/xihTtKlq.js";import"../chunks/C8eL4QHK.js";import{n as m,t as h}from"../chunks/CsIYTNEP.js";var g=i(`<center><img style="width: 9em;" alt="Parametrix logo"/></center> <div><pre style="font-size:2.5em; margin:0;">Parametrix</pre> <center><i style="color: lightSkyBlue;">Geometrix</i>&nbsp;<i style="color: pink;">Designix</i></center></div>`,1),_=i(`<pre style="font-size:2.5em; margin:0;">Parametrix</pre> <pre style="margin:0;">CAO en code pour l'open-hardware</pre> <pre style="margin:0;">Une solution JavaScript pour cr&eacute;er des formes 3D</pre>`,1),v=i(`<img style="width: 16em;" alt="screenshot of a gear"/> <img style="width: 16em;" alt="screenshot of the heliostat rake"/>`,1),y=i(`<p><img style="height: 9em;" alt="screenshot of a cabane"/> <img style="width: 9em;" alt="screenshot of a doorstop"/></p> <p><img style="width: 9em;" alt="screenshot of a trapeze"/> <img style="width: 9em;" alt="screenshot of a reinforced tube"/></p> <p></p>`,1),b=i(`<pre style="font-size:1.5em; margin:0;">Parametrix workflow</pre> <img style="height: 9em;" alt="prez_parametrix_vs_classic_workflow"/> <pre>
Approche simplifi&eacute;e:
- centr&eacute;e sur la notion de contour (c.a.d 2.5D)
  - les proc&eacute;d&eacute;s de fabrication efficaces sont 2D
  - les m&eacute;canismes robustes sont 2D
- chaine d'outils CAO/FAO mieux controll&eacute;e
		</pre>`,1),ee=i(`<pre style="font-size:2em; margin:0;">G&eacute;n&eacute;ration de fichiers 3D </pre> <img style="height: 9em;" alt="cad_flow_with_parametrix.svg"/> <pre style="margin:0;">&gt; Des formes 3D décrites en JavaScript</pre> <pre style="margin:0;">&gt; Un frontend qui abstrait les outils de CAD</pre> <pre style="margin:0;">&gt; Un générateur de siteweb pour paramétriser les designs</pre>`,1),x=i(`<pre class="smaller svelte-196l2va">
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
		</pre>`),S=i(`<img style="width: 28em;" alt="Parametrix described in condensed"/> <p style="text-align:center; margin: 0.5rem">Parametrix en condens&eacute;</p>`,1),C=i(`<pre>
framework / éco-système : Parametrix

   librairie principale : Geometrix

  librairies de designs : Designix, Desi78, Desi82, ...
		</pre>`),w=i(`<pre>
Passage en revue de l'interface graphique
		</pre>`),T=i(`<img style="width: 28em;" alt="designer and maker"/>`),E=i(`<center><img style="width: 14em;" alt="3D shape subsets"/></center> <pre>
L'API de Geometrix pour designer des formes 3D
		</pre>`,1),D=i(`<pre>
L'API de Geometrix en bref
		</pre>`),O=i(`<p><span style="font-size:2em">Example de code</span> <img style="height: 7em; vertical-align: middle" alt="codeExample1_contour.svg"/></p> <pre style="font-size:0.8em; padding-right: 5em">
const ctr1 = contour(0, 0)
	.addSegStrokeR(param.L2, 0)
	.addSegStrokeRP(a3, param.L3)
	.addPointAP(a4, param.L4)
	.addSegArc(param.R34, true, true)
	.addCornerRounded(param.R4)
	.addPointA(0, param.L5)
	.addSegArc3(a5, false)
	.closeSegStroke();
		</pre>`,1),k=i(`<pre>
3 types de paramètres
- nombre
- checkbox (i.e. boolean)
- dropdown (i.e. enum)
		</pre>`),A=i(`<center><img style="width: 9em;" alt="stroke and arcs"/></center> <pre>
Les contours sont composées exclusivement de:
- segments de droite
- arcs de cercle

Idéal pour générer le G-code
		</pre>`,1),te=i(`<center><img style="width: 22em;" alt="absolute relative cartesian polar"/></center> <pre>
Options possibles pour définir le prochain point
                   dans la définition d'un contour:
- Cartésien ou Polair
- Relative ou Absolue
		</pre>`,1),ne=i(`<center><img style="width: 22em;" alt="three ways for defining arcs"/></center> <pre>
3 possibilités pour définir un arc de cercle:
- le rayon avec les booléens large/small et ccw/cw
- un point intermédiaire
- l'angle de la tangente au début ou à la fin de l'arc
		</pre>`,1),re=i(`<center><img style="width: 22em;" alt="curve approximation"/></center> <pre>
Approximation des courbes quelconques:

double arcs de cercles définis avec
  leur angles de tangentes de début
  et de fin de segment de courbe
		</pre>`,1),ie=i(`<center><img style="width: 15em;" alt="corner modifications"/></center> <pre>
Modifications des angles d'un contour:
- Arrondi [Rounded]
- Elargissement [Widened]
- Elargissement avec l'accès [WideAcc]
		</pre>`,1),ae=i(`<center><img style="width: 14em;" alt="design structure"/>&nbsp;<img style="width: 10em;" alt="figure layers"/></center> <pre>
- Définition d'une liste de figures
- Attacher chaque contour à une figure en tant que:
    - principal [main]
    - secondaire [second]
    - ou dynamique [dynamics]
		</pre>`,1),oe=i(`<center><img style="width: 12em;" alt="extrudes"/></center> <pre style="margin: 0.5em;">
Définition  d'une forme 3D
- Extrusion d'une figure orthogonalement ou en révolution
- Pivoter, translater puis combiner les sous-éléments
    - Union
    - Intersection
    - Soustraction</pre> <center><img style="width: 16em;" alt="boolean operations"/></center>`,1),se=i(`<pre>
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
		</pre>`),ce=i(`<pre>
   Fin de
     la
présentation
     de
 Parametrix
		</pre>`),le=i(`<pre style="color: orange">
Prêt pour créer votre <i>propre</i> librairie de designs?
		</pre> <pre>
npm create parametrix@latest tom07
		</pre>`,1),j=i(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),M=i(`<h1 class="svelte-196l2va">La prèz de Paramétrix</h1> <!>`,1);function N(i,N){c(N,!1),f();var P=M(),F=a(u(P),2);m(F,{children:(i,c)=>{var d=j(),f=u(d);h(f,{children:(r,i)=>{var a=g(),c=u(a),l=n(c);o(2),t(e=>s(l,`src`,e),[()=>p(`/favicon.svg`)]),e(r,a)},$$slots:{default:!0}});var m=a(f,2);h(m,{children:(t,n)=>{var r=_();o(4),e(t,r)},$$slots:{default:!0}});var M=a(m,2);h(M,{children:(n,r)=>{var i=v(),o=u(i),c=a(o,2);t((e,t)=>{s(o,`src`,e),s(c,`src`,t)},[()=>p(`/screen_gear.png`),()=>p(`/screen_helio_rake.png`)]),e(n,i)},$$slots:{default:!0}});var N=a(M,2);h(N,{children:(n,i)=>{var c=y(),d=u(c),f=r(d),m=a(f,2);l(d);var h=a(d,2),g=r(h),_=a(g,2);l(h),o(2),t((e,t,n,r)=>{s(f,`src`,e),s(m,`src`,t),s(g,`src`,n),s(_,`src`,r)},[()=>p(`/screen_cabane.png`),()=>p(`/screen_doorstop.png`),()=>p(`/screen_trapeze.png`),()=>p(`/screen_reinforced_tube.png`)]),e(n,c)},$$slots:{default:!0}});var P=a(N,2);h(P,{children:(n,r)=>{var i=b(),c=a(u(i),2);o(2),t(e=>s(c,`src`,e),[()=>p(`/puisvg/prez_parametrix_vs_classic_workflow.svg`)]),e(n,i)},$$slots:{default:!0}});var F=a(P,2);h(F,{children:(n,r)=>{var i=ee(),c=a(u(i),2);o(6),t(e=>s(c,`src`,e),[()=>p(`/puisvg/cad_flow_with_parametrix.svg`)]),e(n,i)},$$slots:{default:!0}});var I=a(F,2);h(I,{children:(t,n)=>{var r=x();e(t,r)},$$slots:{default:!0}});var L=a(I,2);h(L,{children:(n,r)=>{var i=S(),a=u(i);o(2),t(e=>s(a,`src`,e),[()=>p(`/puisvg/prez_parametrix_condensed.svg`)]),e(n,i)},$$slots:{default:!0}});var R=a(L,2);h(R,{children:(t,n)=>{var r=C();e(t,r)},$$slots:{default:!0}});var z=a(R,2);h(z,{children:(t,n)=>{var r=w();e(t,r)},$$slots:{default:!0}});var B=a(z,2);h(B,{children:(n,r)=>{var i=T();t(e=>s(i,`src`,e),[()=>p(`/puisvg/concept_of_webapp_generator.svg`)]),e(n,i)},$$slots:{default:!0}});var V=a(B,2);h(V,{children:(r,i)=>{var a=E(),c=u(a),l=n(c);o(2),t(e=>s(l,`src`,e),[()=>p(`/puisvg/parametrix_3D_shape_subset.svg`)]),e(r,a)},$$slots:{default:!0}});var H=a(V,2);h(H,{children:(t,n)=>{var r=D();e(t,r)},$$slots:{default:!0}});var U=a(H,2);h(U,{children:(n,i)=>{var c=O(),d=u(c),f=a(r(d),2);l(d),o(2),t(e=>s(f,`src`,e),[()=>p(`/puisvg/codeExample1_contour.svg`)]),e(n,c)},$$slots:{default:!0}});var W=a(U,2);h(W,{children:(t,n)=>{var r=k();e(t,r)},$$slots:{default:!0}});var G=a(W,2);h(G,{children:(r,i)=>{var a=A(),c=u(a),l=n(c);o(2),t(e=>s(l,`src`,e),[()=>p(`/puisvg/prez_stroke_and_arc.svg`)]),e(r,a)},$$slots:{default:!0}});var K=a(G,2);h(K,{children:(r,i)=>{var a=te(),c=u(a),l=n(c);o(2),t(e=>s(l,`src`,e),[()=>p(`/puisvg/prez_absolute_relative.svg`)]),e(r,a)},$$slots:{default:!0}});var q=a(K,2);h(q,{children:(r,i)=>{var a=ne(),c=u(a),l=n(c);o(2),t(e=>s(l,`src`,e),[()=>p(`/puisvg/prez_arcs.svg`)]),e(r,a)},$$slots:{default:!0}});var J=a(q,2);h(J,{children:(r,i)=>{var a=re(),c=u(a),l=n(c);o(2),t(e=>s(l,`src`,e),[()=>p(`/puisvg/prez_curve_approximation.svg`)]),e(r,a)},$$slots:{default:!0}});var Y=a(J,2);h(Y,{children:(r,i)=>{var a=ie(),c=u(a),l=n(c);o(2),t(e=>s(l,`src`,e),[()=>p(`/puisvg/prez_corner_modifications.svg`)]),e(r,a)},$$slots:{default:!0}});var X=a(Y,2);h(X,{children:(n,i)=>{var c=ae(),d=u(c),f=r(d),m=a(f,2);l(d),o(2),t((e,t)=>{s(f,`src`,e),s(m,`src`,t)},[()=>p(`/puisvg/prez_design_structure.svg`),()=>p(`/puisvg/prez_figure_layers.svg`)]),e(n,c)},$$slots:{default:!0}});var Z=a(X,2);h(Z,{children:(r,i)=>{var o=oe(),c=u(o),l=n(c),d=a(c,4),f=n(d);t((e,t)=>{s(l,`src`,e),s(f,`src`,t)},[()=>p(`/puisvg/prez_extrudes.svg`),()=>p(`/puisvg/prez_boolean_operations.svg`)]),e(r,o)},$$slots:{default:!0}});var Q=a(Z,2);h(Q,{children:(t,n)=>{var r=se();e(t,r)},$$slots:{default:!0}});var $=a(Q,2);h($,{children:(t,n)=>{var r=ce();e(t,r)},$$slots:{default:!0}});var ue=a($,2);h(ue,{children:(t,n)=>{var r=le();o(2),e(t,r)},$$slots:{default:!0}}),e(i,d)},$$slots:{default:!0}}),e(i,P),d()}export{N as component};