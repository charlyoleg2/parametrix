import{A as e,B as t,G as n,K as r,O as i,h as a,l as o,nt as s,ot as c,q as l,st as u,tt as d}from"../chunks/OUSbh2dG.js";import{l as f}from"../chunks/Df3csopA.js";import"../chunks/BFbU5qhn.js";import"../chunks/wXqC6qcH.js";import{n as p,t as m}from"../chunks/CnB4LK8F.js";var h=e(`<center><img style="width: 9em;" alt="Parametrix logo"/></center> <div><pre style="font-size:2.5em; margin:0;">Parametrix</pre> <center><i style="color: lightSkyBlue;">Geometrix</i>&nbsp;<i style="color: pink;">Designix</i></center></div>`,1),g=e(`<pre style="font-size:2.5em; margin:0;">Parametrix</pre> <pre style="margin:0;">CAD as code for open-hardware</pre> <pre style="margin:0;">a JavaScript solution for creating 3D shapes</pre>`,1),_=e(`<img style="width: 16em;" alt="screenshot of a gear"/> <img style="width: 16em;" alt="screenshot of the heliostat rake"/>`,1),v=e(`<p><img style="height: 9em;" alt="screenshot of a cabane"/> <img style="width: 9em;" alt="screenshot of a doorstop"/></p> <p><img style="width: 9em;" alt="screenshot of a trapeze"/> <img style="width: 9em;" alt="screenshot of a reinforced tube"/></p> <p></p>`,1),y=e(`<pre style="font-size:1.5em; margin:0;">Parametrix workflow</pre> <img style="height: 9em;" alt="prez_parametrix_vs_classic_workflow"/> <pre>
Simplistic approach:
- contour centric (i.e. 2.5D)
  - cost efficient manufacturing process are 2D
  - robust mechanisms are 2D
- no long workflow chain
		</pre>`,1),b=e(`<pre style="font-size:2em; margin:0;">Generate 3D files</pre> <img style="height: 9em;" alt="cad_flow_with_parametrix.svg"/> <pre style="margin:0;">&gt; a JavaScript solution for creating 3D shapes</pre> <pre style="margin:0;">&gt; a frontend that abstract the CAD solution</pre> <pre style="margin:0;">&gt; a generator of WebUI for parametrizing your designs</pre>`,1),x=e(`<pre class="smaller svelte-19pmhx1">
Parametrix main advantages:

1. Durability of your 3D modeling
    1.1. Parametrix is small (10k LoC)
    1.2. Parametrix is open-source
    1.3. An abstraction of several/many API of CAD-tools
        Keep your design agnostic to CAD vendors (no lock-in)

2. Guide your design for cost efficient digital manufacturing
    Generate contours made out of lines and arcs of circles
        as supported by G-code

3. Clear and structured interface between designer and manufacturer
    one HTML page with parametrization, 2D preview and 3D export

4. A javacript API
    Creating your 3D modelling recipes with javascript
		</pre>`),S=e(`<img style="width: 28em;" alt="Parametrix described in condensed"/> <p style="text-align:center; margin: 0.5rem">Parametrix in condensed</p>`,1),C=e(`/ <pre>
framework / eco-system : Parametrix

          core library : Geometrix

      design-libraries : Designix, Desi78, Desi82, ...
		</pre>`,1),w=e(`<pre>
Go through the design-UI
		</pre>`),T=e(`<img style="width: 28em;" alt="designer and maker"/>`),E=e(`<center><img style="width: 14em;" alt="3D shape subsets"/></center> <pre>
The Geometrix API for designing a 3D shape
		</pre>`,1),D=e(`<pre>
The Geometrix API in a nutshell
		</pre>`),O=e(`<p><span style="font-size:2em">Code example</span> <img style="height: 7em; vertical-align: middle" alt="codeExample1_contour.svg"/></p> <pre style="font-size:0.8em; padding-right: 5em">
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
3 types of parameters
- number
- checkbox (i.e. boolean)
- dropdown (i.e. enum)
		</pre>`),A=e(`<center><img style="width: 9em;" alt="stroke and arcs"/></center> <pre>
Create contour with:
- strokes
- arcs of circles

Optimal for generating G-code
		</pre>`,1),j=e(`<center><img style="width: 22em;" alt="absolute relative cartesian polar"/></center> <pre>
Next destination-point in contour-definition:
- Cartesian or Polar
- Relative or Absolute
		</pre>`,1),ee=e(`<center><img style="width: 22em;" alt="three ways for defining arcs"/></center> <pre>
3 options for defining an arc of circle:
- radius with large/small and ccw/cw
- intermediate point
- tangent at the begining or the end
		</pre>`,1),te=e(`<center><img style="width: 22em;" alt="curve approximation"/></center> <pre>
Complex curve approximation:
Double arcs defined with start and end tangents
		</pre>`,1),ne=e(`<center><img style="width: 15em;" alt="corner modifications"/></center> <pre>
Corner rework:
- Rounded
- Widened
- WideAcc
		</pre>`,1),re=e(`<center><img style="width: 14em;" alt="design structure"/>&nbsp;<img style="width: 10em;" alt="figure layers"/></center> <pre>
- Define a list of figures
- Attach the contours to figures
    - as main, second or dynamics
		</pre>`,1),ie=e(`<center><img style="width: 12em;" alt="extrudes"/></center> <pre style="margin: 0.5em;">
Define the 3D shape
- Extrude figures as LinearOrtho or Rotate
- Rotate, translate and combine sub-element
    - Union
    - Intersection
    - Substraction</pre> <center><img style="width: 16em;" alt="boolean operations"/></center>`,1),ae=e(`<pre>
Parametrix generates 3D scripts for:
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
   End of
     the
presentation
     of
 Parametrix
		</pre>`),se=e(`<pre style="color: orange">
Ready for creating your <i>own</i> design-library?
		</pre> <pre>
npm create parametrix@latest tom07
		</pre>`,1),ce=e(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),M=e(`<h1 class="svelte-19pmhx1">Prez of Parametrix</h1> <!>`,1);function N(e,N){s(N,!1),o();var P=M();p(l(r(P),2),{children:(e,o)=>{var s=ce(),d=r(s);m(d,{children:(e,o)=>{var s=h(),l=r(s),d=n(l);u(l),c(2),t(e=>a(d,`src`,e),[()=>f(`/favicon.svg`)]),i(e,s)},$$slots:{default:!0}});var p=l(d,2);m(p,{children:(e,t)=>{var n=g();c(4),i(e,n)},$$slots:{default:!0}});var M=l(p,2);m(M,{children:(e,n)=>{var o=_(),s=r(o),c=l(s,2);t((e,t)=>{a(s,`src`,e),a(c,`src`,t)},[()=>f(`/screen_gear.png`),()=>f(`/screen_helio_rake.png`)]),i(e,o)},$$slots:{default:!0}});var N=l(M,2);m(N,{children:(e,o)=>{var s=v(),d=r(s),p=n(d),m=l(p,2);u(d);var h=l(d,2),g=n(h),_=l(g,2);u(h),c(2),t((e,t,n,r)=>{a(p,`src`,e),a(m,`src`,t),a(g,`src`,n),a(_,`src`,r)},[()=>f(`/screen_cabane.png`),()=>f(`/screen_doorstop.png`),()=>f(`/screen_trapeze.png`),()=>f(`/screen_reinforced_tube.png`)]),i(e,s)},$$slots:{default:!0}});var P=l(N,2);m(P,{children:(e,n)=>{var o=y(),s=l(r(o),2);c(2),t(e=>a(s,`src`,e),[()=>f(`/puisvg/prez_parametrix_vs_classic_workflow.svg`)]),i(e,o)},$$slots:{default:!0}});var F=l(P,2);m(F,{children:(e,n)=>{var o=b(),s=l(r(o),2);c(6),t(e=>a(s,`src`,e),[()=>f(`/puisvg/cad_flow_with_parametrix.svg`)]),i(e,o)},$$slots:{default:!0}});var I=l(F,2);m(I,{children:(e,t)=>{i(e,x())},$$slots:{default:!0}});var L=l(I,2);m(L,{children:(e,n)=>{var o=S(),s=r(o);c(2),t(e=>a(s,`src`,e),[()=>f(`/puisvg/prez_parametrix_condensed.svg`)]),i(e,o)},$$slots:{default:!0}});var R=l(L,2);m(R,{children:(e,t)=>{c();var n=C();c(),i(e,n)},$$slots:{default:!0}});var z=l(R,2);m(z,{children:(e,t)=>{i(e,w())},$$slots:{default:!0}});var B=l(z,2);m(B,{children:(e,n)=>{var r=T();t(e=>a(r,`src`,e),[()=>f(`/puisvg/concept_of_webapp_generator.svg`)]),i(e,r)},$$slots:{default:!0}});var V=l(B,2);m(V,{children:(e,o)=>{var s=E(),l=r(s),d=n(l);u(l),c(2),t(e=>a(d,`src`,e),[()=>f(`/puisvg/parametrix_3D_shape_subset.svg`)]),i(e,s)},$$slots:{default:!0}});var H=l(V,2);m(H,{children:(e,t)=>{i(e,D())},$$slots:{default:!0}});var U=l(H,2);m(U,{children:(e,o)=>{var s=O(),d=r(s),p=l(n(d),2);u(d),c(2),t(e=>a(p,`src`,e),[()=>f(`/puisvg/codeExample1_contour.svg`)]),i(e,s)},$$slots:{default:!0}});var W=l(U,2);m(W,{children:(e,t)=>{i(e,k())},$$slots:{default:!0}});var G=l(W,2);m(G,{children:(e,o)=>{var s=A(),l=r(s),d=n(l);u(l),c(2),t(e=>a(d,`src`,e),[()=>f(`/puisvg/prez_stroke_and_arc.svg`)]),i(e,s)},$$slots:{default:!0}});var K=l(G,2);m(K,{children:(e,o)=>{var s=j(),l=r(s),d=n(l);u(l),c(2),t(e=>a(d,`src`,e),[()=>f(`/puisvg/prez_absolute_relative.svg`)]),i(e,s)},$$slots:{default:!0}});var q=l(K,2);m(q,{children:(e,o)=>{var s=ee(),l=r(s),d=n(l);u(l),c(2),t(e=>a(d,`src`,e),[()=>f(`/puisvg/prez_arcs.svg`)]),i(e,s)},$$slots:{default:!0}});var J=l(q,2);m(J,{children:(e,o)=>{var s=te(),l=r(s),d=n(l);u(l),c(2),t(e=>a(d,`src`,e),[()=>f(`/puisvg/prez_curve_approximation.svg`)]),i(e,s)},$$slots:{default:!0}});var Y=l(J,2);m(Y,{children:(e,o)=>{var s=ne(),l=r(s),d=n(l);u(l),c(2),t(e=>a(d,`src`,e),[()=>f(`/puisvg/prez_corner_modifications.svg`)]),i(e,s)},$$slots:{default:!0}});var X=l(Y,2);m(X,{children:(e,o)=>{var s=re(),d=r(s),p=n(d),m=l(p,2);u(d),c(2),t((e,t)=>{a(p,`src`,e),a(m,`src`,t)},[()=>f(`/puisvg/prez_design_structure.svg`),()=>f(`/puisvg/prez_figure_layers.svg`)]),i(e,s)},$$slots:{default:!0}});var Z=l(X,2);m(Z,{children:(e,o)=>{var s=ie(),c=r(s),d=n(c);u(c);var p=l(c,4),m=n(p);u(p),t((e,t)=>{a(d,`src`,e),a(m,`src`,t)},[()=>f(`/puisvg/prez_extrudes.svg`),()=>f(`/puisvg/prez_boolean_operations.svg`)]),i(e,s)},$$slots:{default:!0}});var Q=l(Z,2);m(Q,{children:(e,t)=>{i(e,ae())},$$slots:{default:!0}});var $=l(Q,2);m($,{children:(e,t)=>{i(e,oe())},$$slots:{default:!0}}),m(l($,2),{children:(e,t)=>{var n=se();c(2),i(e,n)},$$slots:{default:!0}}),i(e,s)},$$slots:{default:!0}}),i(e,P),d()}export{N as component};