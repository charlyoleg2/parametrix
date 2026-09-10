import{G as e,J as t,K as n,V as r,ct as i,h as a,it as o,j as s,k as c,l,lt as u,q as d,rt as f}from"../chunks/Dl6DBB2N.js";import{s as p}from"../chunks/CjnMTFQV.js";import"../chunks/xihTtKlq.js";import"../chunks/B9fsiUnv.js";import{n as m,t as h}from"../chunks/BUVJNcQ-.js";var g=s(`<center><img style="width: 9em;" alt="Parametrix logo"/></center> <div><pre style="font-size:2.5em; margin:0;">Parametrix</pre> <center><i style="color: lightSkyBlue;">Geometrix</i>&nbsp;<i style="color: pink;">Designix</i></center></div>`,1),_=s(`<pre style="font-size:2.5em; margin:0;">Parametrix</pre> <pre style="margin:0;">CAO en code pour l'open-hardware</pre> <pre style="margin:0;">Une solution JavaScript pour cr&eacute;er des formes 3D</pre>`,1),v=s(`<img style="width: 16em;" alt="screenshot of a gear"/> <img style="width: 16em;" alt="screenshot of the heliostat rake"/>`,1),y=s(`<p><img style="height: 9em;" alt="screenshot of a cabane"/> <img style="width: 9em;" alt="screenshot of a doorstop"/></p> <p><img style="width: 9em;" alt="screenshot of a trapeze"/> <img style="width: 9em;" alt="screenshot of a reinforced tube"/></p> <p></p>`,1),b=s(`<pre style="font-size:1.5em; margin:0;">Parametrix workflow</pre> <img style="height: 9em;" alt="prez_parametrix_vs_classic_workflow"/> <pre>
Approche simplifi&eacute;e:
- centr&eacute;e sur la notion de contour (c.a.d 2.5D)
  - les proc&eacute;d&eacute;s de fabrication efficaces sont 2D
  - les m&eacute;canismes robustes sont 2D
- chaine d'outils CAO/FAO mieux controll&eacute;e
		</pre>`,1),ee=s(`<pre style="font-size:2em; margin:0;">G&eacute;n&eacute;ration de fichiers 3D </pre> <img style="height: 9em;" alt="cad_flow_with_parametrix.svg"/> <pre style="margin:0;">&gt; Des formes 3D décrites en JavaScript</pre> <pre style="margin:0;">&gt; Un frontend qui abstrait les outils de CAD</pre> <pre style="margin:0;">&gt; Un générateur de siteweb pour paramétriser les designs</pre>`,1),x=s(`<pre class="smaller svelte-196l2va">
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
		</pre>`),S=s(`<img style="width: 28em;" alt="Parametrix described in condensed"/> <p style="text-align:center; margin: 0.5rem">Parametrix en condens&eacute;</p>`,1),C=s(`<pre>
framework / éco-système : Parametrix

   librairie principale : Geometrix

  librairies de designs : Designix, Desi78, Desi82, ...
		</pre>`),w=s(`<pre>
Passage en revue de l'interface graphique
		</pre>`),T=s(`<img style="width: 28em;" alt="designer and maker"/>`),E=s(`<center><img style="width: 14em;" alt="3D shape subsets"/></center> <pre>
L'API de Geometrix pour designer des formes 3D
		</pre>`,1),D=s(`<pre>
L'API de Geometrix en bref
		</pre>`),O=s(`<p><span style="font-size:2em">Example de code</span> <img style="height: 7em; vertical-align: middle" alt="codeExample1_contour.svg"/></p> <pre style="font-size:0.8em; padding-right: 5em">
const ctr1 = contour(0, 0)
	.addSegStrokeR(param.L2, 0)
	.addSegStrokeRP(a3, param.L3)
	.addPointAP(a4, param.L4)
	.addSegArc(param.R34, true, true)
	.addCornerRounded(param.R4)
	.addPointA(0, param.L5)
	.addSegArc3(a5, false)
	.closeSegStroke();
		</pre>`,1),k=s(`<pre>
3 types de paramètres
- nombre
- checkbox (i.e. boolean)
- dropdown (i.e. enum)
		</pre>`),A=s(`<center><img style="width: 9em;" alt="stroke and arcs"/></center> <pre>
Les contours sont composées exclusivement de:
- segments de droite
- arcs de cercle

Idéal pour générer le G-code
		</pre>`,1),te=s(`<center><img style="width: 22em;" alt="absolute relative cartesian polar"/></center> <pre>
Options possibles pour définir le prochain point
                   dans la définition d'un contour:
- Cartésien ou Polair
- Relative ou Absolue
		</pre>`,1),ne=s(`<center><img style="width: 22em;" alt="three ways for defining arcs"/></center> <pre>
3 possibilités pour définir un arc de cercle:
- le rayon avec les booléens large/small et ccw/cw
- un point intermédiaire
- l'angle de la tangente au début ou à la fin de l'arc
		</pre>`,1),re=s(`<center><img style="width: 22em;" alt="curve approximation"/></center> <pre>
Approximation des courbes quelconques:

double arcs de cercles définis avec
  leur angles de tangentes de début
  et de fin de segment de courbe
		</pre>`,1),ie=s(`<center><img style="width: 15em;" alt="corner modifications"/></center> <pre>
Modifications des angles d'un contour:
- Arrondi [Rounded]
- Elargissement [Widened]
- Elargissement avec l'accès [WideAcc]
		</pre>`,1),ae=s(`<center><img style="width: 14em;" alt="design structure"/>&nbsp;<img style="width: 10em;" alt="figure layers"/></center> <pre>
- Définition d'une liste de figures
- Attacher chaque contour à une figure en tant que:
    - principal [main]
    - secondaire [second]
    - ou dynamique [dynamics]
		</pre>`,1),oe=s(`<center><img style="width: 12em;" alt="extrudes"/></center> <pre style="margin: 0.5em;">
Définition  d'une forme 3D
- Extrusion d'une figure orthogonalement ou en révolution
- Pivoter, translater puis combiner les sous-éléments
    - Union
    - Intersection
    - Soustraction</pre> <center><img style="width: 16em;" alt="boolean operations"/></center>`,1),se=s(`<pre>
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
		</pre>`),ce=s(`<pre>
   Fin de
     la
présentation
     de
 Parametrix
		</pre>`),le=s(`<pre style="color: orange">
Prêt pour créer votre <i>propre</i> librairie de designs?
		</pre> <pre>
npm create parametrix@latest tom07
		</pre>`,1),j=s(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),M=s(`<h1 class="svelte-196l2va">La prèz de Paramétrix</h1> <!>`,1);function N(s,N){o(N,!1),l();var P=M(),F=t(n(P),2);m(F,{children:(o,s)=>{var l=j(),f=n(l);h(f,{children:(e,t)=>{var o=g(),s=n(o),l=d(s);i(2),r(e=>a(l,`src`,e),[()=>p(`/favicon.svg`)]),c(e,o)},$$slots:{default:!0}});var m=t(f,2);h(m,{children:(e,t)=>{var n=_();i(4),c(e,n)},$$slots:{default:!0}});var M=t(m,2);h(M,{children:(e,i)=>{var o=v(),s=n(o),l=t(s,2);r((e,t)=>{a(s,`src`,e),a(l,`src`,t)},[()=>p(`/screen_gear.png`),()=>p(`/screen_helio_rake.png`)]),c(e,o)},$$slots:{default:!0}});var N=t(M,2);h(N,{children:(o,s)=>{var l=y(),d=n(l),f=e(d),m=t(f,2);u(d);var h=t(d,2),g=e(h),_=t(g,2);u(h),i(2),r((e,t,n,r)=>{a(f,`src`,e),a(m,`src`,t),a(g,`src`,n),a(_,`src`,r)},[()=>p(`/screen_cabane.png`),()=>p(`/screen_doorstop.png`),()=>p(`/screen_trapeze.png`),()=>p(`/screen_reinforced_tube.png`)]),c(o,l)},$$slots:{default:!0}});var P=t(N,2);h(P,{children:(e,o)=>{var s=b(),l=t(n(s),2);i(2),r(e=>a(l,`src`,e),[()=>p(`/puisvg/prez_parametrix_vs_classic_workflow.svg`)]),c(e,s)},$$slots:{default:!0}});var F=t(P,2);h(F,{children:(e,o)=>{var s=ee(),l=t(n(s),2);i(6),r(e=>a(l,`src`,e),[()=>p(`/puisvg/cad_flow_with_parametrix.svg`)]),c(e,s)},$$slots:{default:!0}});var I=t(F,2);h(I,{children:(e,t)=>{var n=x();c(e,n)},$$slots:{default:!0}});var L=t(I,2);h(L,{children:(e,t)=>{var o=S(),s=n(o);i(2),r(e=>a(s,`src`,e),[()=>p(`/puisvg/prez_parametrix_condensed.svg`)]),c(e,o)},$$slots:{default:!0}});var R=t(L,2);h(R,{children:(e,t)=>{var n=C();c(e,n)},$$slots:{default:!0}});var z=t(R,2);h(z,{children:(e,t)=>{var n=w();c(e,n)},$$slots:{default:!0}});var B=t(z,2);h(B,{children:(e,t)=>{var n=T();r(e=>a(n,`src`,e),[()=>p(`/puisvg/concept_of_webapp_generator.svg`)]),c(e,n)},$$slots:{default:!0}});var V=t(B,2);h(V,{children:(e,t)=>{var o=E(),s=n(o),l=d(s);i(2),r(e=>a(l,`src`,e),[()=>p(`/puisvg/parametrix_3D_shape_subset.svg`)]),c(e,o)},$$slots:{default:!0}});var H=t(V,2);h(H,{children:(e,t)=>{var n=D();c(e,n)},$$slots:{default:!0}});var U=t(H,2);h(U,{children:(o,s)=>{var l=O(),d=n(l),f=t(e(d),2);u(d),i(2),r(e=>a(f,`src`,e),[()=>p(`/puisvg/codeExample1_contour.svg`)]),c(o,l)},$$slots:{default:!0}});var W=t(U,2);h(W,{children:(e,t)=>{var n=k();c(e,n)},$$slots:{default:!0}});var G=t(W,2);h(G,{children:(e,t)=>{var o=A(),s=n(o),l=d(s);i(2),r(e=>a(l,`src`,e),[()=>p(`/puisvg/prez_stroke_and_arc.svg`)]),c(e,o)},$$slots:{default:!0}});var K=t(G,2);h(K,{children:(e,t)=>{var o=te(),s=n(o),l=d(s);i(2),r(e=>a(l,`src`,e),[()=>p(`/puisvg/prez_absolute_relative.svg`)]),c(e,o)},$$slots:{default:!0}});var q=t(K,2);h(q,{children:(e,t)=>{var o=ne(),s=n(o),l=d(s);i(2),r(e=>a(l,`src`,e),[()=>p(`/puisvg/prez_arcs.svg`)]),c(e,o)},$$slots:{default:!0}});var J=t(q,2);h(J,{children:(e,t)=>{var o=re(),s=n(o),l=d(s);i(2),r(e=>a(l,`src`,e),[()=>p(`/puisvg/prez_curve_approximation.svg`)]),c(e,o)},$$slots:{default:!0}});var Y=t(J,2);h(Y,{children:(e,t)=>{var o=ie(),s=n(o),l=d(s);i(2),r(e=>a(l,`src`,e),[()=>p(`/puisvg/prez_corner_modifications.svg`)]),c(e,o)},$$slots:{default:!0}});var X=t(Y,2);h(X,{children:(o,s)=>{var l=ae(),d=n(l),f=e(d),m=t(f,2);u(d),i(2),r((e,t)=>{a(f,`src`,e),a(m,`src`,t)},[()=>p(`/puisvg/prez_design_structure.svg`),()=>p(`/puisvg/prez_figure_layers.svg`)]),c(o,l)},$$slots:{default:!0}});var Z=t(X,2);h(Z,{children:(e,i)=>{var o=oe(),s=n(o),l=d(s),u=t(s,4),f=d(u);r((e,t)=>{a(l,`src`,e),a(f,`src`,t)},[()=>p(`/puisvg/prez_extrudes.svg`),()=>p(`/puisvg/prez_boolean_operations.svg`)]),c(e,o)},$$slots:{default:!0}});var Q=t(Z,2);h(Q,{children:(e,t)=>{var n=se();c(e,n)},$$slots:{default:!0}});var $=t(Q,2);h($,{children:(e,t)=>{var n=ce();c(e,n)},$$slots:{default:!0}});var ue=t($,2);h(ue,{children:(e,t)=>{var n=le();i(2),c(e,n)},$$slots:{default:!0}}),c(o,l)},$$slots:{default:!0}}),c(s,P),f()}export{N as component};