import{A as e,B as t,G as n,K as r,O as i,W as a,h as o,l as s,nt as c,ot as l,st as u,tt as d}from"../chunks/Hmk_MPkO.js";import{l as f}from"../chunks/HrPWD87P.js";import"../chunks/xihTtKlq.js";import"../chunks/C3bglqB5.js";import{n as p,t as m}from"../chunks/CsvwzpDI.js";var h=e(`<center><img style="width: 9em;" alt="Parametrix logo"/></center> <div><pre style="font-size:2.5em; margin:0;">Parametrix</pre> <center><i style="color: lightSkyBlue;">Geometrix</i>&nbsp;<i style="color: pink;">Designix</i></center></div>`,1),g=e(`<pre style="font-size:2.5em; margin:0;">Parametrix</pre> <pre style="margin:0;">CAD as code for open-hardware</pre> <pre style="margin:0;">a JavaScript solution for creating 3D shapes</pre>`,1),_=e(`<img style="width: 16em;" alt="screenshot of a gear"/> <img style="width: 16em;" alt="screenshot of the heliostat rake"/>`,1),v=e(`<p><img style="height: 9em;" alt="screenshot of a cabane"/> <img style="width: 9em;" alt="screenshot of a doorstop"/></p> <p><img style="width: 9em;" alt="screenshot of a trapeze"/> <img style="width: 9em;" alt="screenshot of a reinforced tube"/></p> <p></p>`,1),y=e(`<pre style="font-size:1.5em; margin:0;">Parametrix workflow</pre> <img style="height: 9em;" alt="prez_parametrix_vs_classic_workflow"/> <pre>
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
		</pre>`,1),ce=e(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),M=e(`<h1 class="svelte-19pmhx1">Prez of Parametrix</h1> <!>`,1);function N(e,N){c(N,!1),s();var P=M();p(r(n(P),2),{children:(e,s)=>{var c=ce(),d=n(c);m(d,{children:(e,r)=>{var s=h(),c=n(s),d=a(c);u(c),l(2),t(e=>o(d,`src`,e),[()=>f(`/favicon.svg`)]),i(e,s)},$$slots:{default:!0}});var p=r(d,2);m(p,{children:(e,t)=>{var n=g();l(4),i(e,n)},$$slots:{default:!0}});var M=r(p,2);m(M,{children:(e,a)=>{var s=_(),c=n(s),l=r(c,2);t((e,t)=>{o(c,`src`,e),o(l,`src`,t)},[()=>f(`/screen_gear.png`),()=>f(`/screen_helio_rake.png`)]),i(e,s)},$$slots:{default:!0}});var N=r(M,2);m(N,{children:(e,s)=>{var c=v(),d=n(c),p=a(d),m=r(p,2);u(d);var h=r(d,2),g=a(h),_=r(g,2);u(h),l(2),t((e,t,n,r)=>{o(p,`src`,e),o(m,`src`,t),o(g,`src`,n),o(_,`src`,r)},[()=>f(`/screen_cabane.png`),()=>f(`/screen_doorstop.png`),()=>f(`/screen_trapeze.png`),()=>f(`/screen_reinforced_tube.png`)]),i(e,c)},$$slots:{default:!0}});var P=r(N,2);m(P,{children:(e,a)=>{var s=y(),c=r(n(s),2);l(2),t(e=>o(c,`src`,e),[()=>f(`/puisvg/prez_parametrix_vs_classic_workflow.svg`)]),i(e,s)},$$slots:{default:!0}});var F=r(P,2);m(F,{children:(e,a)=>{var s=b(),c=r(n(s),2);l(6),t(e=>o(c,`src`,e),[()=>f(`/puisvg/cad_flow_with_parametrix.svg`)]),i(e,s)},$$slots:{default:!0}});var I=r(F,2);m(I,{children:(e,t)=>{i(e,x())},$$slots:{default:!0}});var L=r(I,2);m(L,{children:(e,r)=>{var a=S(),s=n(a);l(2),t(e=>o(s,`src`,e),[()=>f(`/puisvg/prez_parametrix_condensed.svg`)]),i(e,a)},$$slots:{default:!0}});var R=r(L,2);m(R,{children:(e,t)=>{l();var n=C();l(),i(e,n)},$$slots:{default:!0}});var z=r(R,2);m(z,{children:(e,t)=>{i(e,w())},$$slots:{default:!0}});var B=r(z,2);m(B,{children:(e,n)=>{var r=T();t(e=>o(r,`src`,e),[()=>f(`/puisvg/concept_of_webapp_generator.svg`)]),i(e,r)},$$slots:{default:!0}});var V=r(B,2);m(V,{children:(e,r)=>{var s=E(),c=n(s),d=a(c);u(c),l(2),t(e=>o(d,`src`,e),[()=>f(`/puisvg/parametrix_3D_shape_subset.svg`)]),i(e,s)},$$slots:{default:!0}});var H=r(V,2);m(H,{children:(e,t)=>{i(e,D())},$$slots:{default:!0}});var U=r(H,2);m(U,{children:(e,s)=>{var c=O(),d=n(c),p=r(a(d),2);u(d),l(2),t(e=>o(p,`src`,e),[()=>f(`/puisvg/codeExample1_contour.svg`)]),i(e,c)},$$slots:{default:!0}});var W=r(U,2);m(W,{children:(e,t)=>{i(e,k())},$$slots:{default:!0}});var G=r(W,2);m(G,{children:(e,r)=>{var s=A(),c=n(s),d=a(c);u(c),l(2),t(e=>o(d,`src`,e),[()=>f(`/puisvg/prez_stroke_and_arc.svg`)]),i(e,s)},$$slots:{default:!0}});var K=r(G,2);m(K,{children:(e,r)=>{var s=j(),c=n(s),d=a(c);u(c),l(2),t(e=>o(d,`src`,e),[()=>f(`/puisvg/prez_absolute_relative.svg`)]),i(e,s)},$$slots:{default:!0}});var q=r(K,2);m(q,{children:(e,r)=>{var s=ee(),c=n(s),d=a(c);u(c),l(2),t(e=>o(d,`src`,e),[()=>f(`/puisvg/prez_arcs.svg`)]),i(e,s)},$$slots:{default:!0}});var J=r(q,2);m(J,{children:(e,r)=>{var s=te(),c=n(s),d=a(c);u(c),l(2),t(e=>o(d,`src`,e),[()=>f(`/puisvg/prez_curve_approximation.svg`)]),i(e,s)},$$slots:{default:!0}});var Y=r(J,2);m(Y,{children:(e,r)=>{var s=ne(),c=n(s),d=a(c);u(c),l(2),t(e=>o(d,`src`,e),[()=>f(`/puisvg/prez_corner_modifications.svg`)]),i(e,s)},$$slots:{default:!0}});var X=r(Y,2);m(X,{children:(e,s)=>{var c=re(),d=n(c),p=a(d),m=r(p,2);u(d),l(2),t((e,t)=>{o(p,`src`,e),o(m,`src`,t)},[()=>f(`/puisvg/prez_design_structure.svg`),()=>f(`/puisvg/prez_figure_layers.svg`)]),i(e,c)},$$slots:{default:!0}});var Z=r(X,2);m(Z,{children:(e,s)=>{var c=ie(),l=n(c),d=a(l);u(l);var p=r(l,4),m=a(p);u(p),t((e,t)=>{o(d,`src`,e),o(m,`src`,t)},[()=>f(`/puisvg/prez_extrudes.svg`),()=>f(`/puisvg/prez_boolean_operations.svg`)]),i(e,c)},$$slots:{default:!0}});var Q=r(Z,2);m(Q,{children:(e,t)=>{i(e,ae())},$$slots:{default:!0}});var $=r(Q,2);m($,{children:(e,t)=>{i(e,oe())},$$slots:{default:!0}}),m(r($,2),{children:(e,t)=>{var n=se();l(2),i(e,n)},$$slots:{default:!0}}),i(e,c)},$$slots:{default:!0}}),i(e,P),d()}export{N as component};