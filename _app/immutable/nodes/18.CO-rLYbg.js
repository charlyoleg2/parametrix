import{A as e,H as t,J as n,K as r,M as i,Y as a,ct as o,g as s,it as c,lt as l,q as u,rt as d,u as f}from"../chunks/BtB4LYEH.js";import{s as p}from"../chunks/pCjhCps3.js";import"../chunks/xihTtKlq.js";import"../chunks/C8eL4QHK.js";import{n as m,t as h}from"../chunks/CsIYTNEP.js";var g=i(`<center><img style="width: 9em;" alt="Parametrix logo"/></center> <div><pre style="font-size:2.5em; margin:0;">Parametrix</pre> <center><i style="color: lightSkyBlue;">Geometrix</i>&nbsp;<i style="color: pink;">Designix</i></center></div>`,1),_=i(`<pre style="font-size:2.5em; margin:0;">Parametrix</pre> <pre style="margin:0;">CAD as code for open-hardware</pre> <pre style="margin:0;">a JavaScript solution for creating 3D shapes</pre>`,1),v=i(`<img style="width: 16em;" alt="screenshot of a gear"/> <img style="width: 16em;" alt="screenshot of the heliostat rake"/>`,1),y=i(`<p><img style="height: 9em;" alt="screenshot of a cabane"/> <img style="width: 9em;" alt="screenshot of a doorstop"/></p> <p><img style="width: 9em;" alt="screenshot of a trapeze"/> <img style="width: 9em;" alt="screenshot of a reinforced tube"/></p> <p></p>`,1),b=i(`<pre style="font-size:1.5em; margin:0;">Parametrix workflow</pre> <img style="height: 9em;" alt="prez_parametrix_vs_classic_workflow"/> <pre>
Simplistic approach:
- contour centric (i.e. 2.5D)
  - cost efficient manufacturing process are 2D
  - robust mechanisms are 2D
- no long workflow chain
		</pre>`,1),ee=i(`<pre style="font-size:2em; margin:0;">Generate 3D files</pre> <img style="height: 9em;" alt="cad_flow_with_parametrix.svg"/> <pre style="margin:0;">&gt; a JavaScript solution for creating 3D shapes</pre> <pre style="margin:0;">&gt; a frontend that abstract the CAD solution</pre> <pre style="margin:0;">&gt; a generator of WebUI for parametrizing your designs</pre>`,1),x=i(`<pre class="smaller svelte-19pmhx1">
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
		</pre>`),S=i(`<img style="width: 28em;" alt="Parametrix described in condensed"/> <p style="text-align:center; margin: 0.5rem">Parametrix in condensed</p>`,1),C=i(`/ <pre>
framework / eco-system : Parametrix

          core library : Geometrix

      design-libraries : Designix, Desi78, Desi82, ...
		</pre>`,1),w=i(`<pre>
Go through the design-UI
		</pre>`),T=i(`<img style="width: 28em;" alt="designer and maker"/>`),E=i(`<center><img style="width: 14em;" alt="3D shape subsets"/></center> <pre>
The Geometrix API for designing a 3D shape
		</pre>`,1),D=i(`<pre>
The Geometrix API in a nutshell
		</pre>`),O=i(`<p><span style="font-size:2em">Code example</span> <img style="height: 7em; vertical-align: middle" alt="codeExample1_contour.svg"/></p> <pre style="font-size:0.8em; padding-right: 5em">
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
3 types of parameters
- number
- checkbox (i.e. boolean)
- dropdown (i.e. enum)
		</pre>`),A=i(`<center><img style="width: 9em;" alt="stroke and arcs"/></center> <pre>
Create contour with:
- strokes
- arcs of circles

Optimal for generating G-code
		</pre>`,1),te=i(`<center><img style="width: 22em;" alt="absolute relative cartesian polar"/></center> <pre>
Next destination-point in contour-definition:
- Cartesian or Polar
- Relative or Absolute
		</pre>`,1),ne=i(`<center><img style="width: 22em;" alt="three ways for defining arcs"/></center> <pre>
3 options for defining an arc of circle:
- radius with large/small and ccw/cw
- intermediate point
- tangent at the begining or the end
		</pre>`,1),re=i(`<center><img style="width: 22em;" alt="curve approximation"/></center> <pre>
Complex curve approximation:
Double arcs defined with start and end tangents
		</pre>`,1),ie=i(`<center><img style="width: 15em;" alt="corner modifications"/></center> <pre>
Corner rework:
- Rounded
- Widened
- WideAcc
		</pre>`,1),ae=i(`<center><img style="width: 14em;" alt="design structure"/>&nbsp;<img style="width: 10em;" alt="figure layers"/></center> <pre>
- Define a list of figures
- Attach the contours to figures
    - as main, second or dynamics
		</pre>`,1),oe=i(`<center><img style="width: 12em;" alt="extrudes"/></center> <pre style="margin: 0.5em;">
Define the 3D shape
- Extrude figures as LinearOrtho or Rotate
- Rotate, translate and combine sub-element
    - Union
    - Intersection
    - Substraction</pre> <center><img style="width: 16em;" alt="boolean operations"/></center>`,1),se=i(`<pre>
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
		</pre>`),ce=i(`<pre>
   End of
     the
presentation
     of
 Parametrix
		</pre>`),le=i(`<pre style="color: orange">
Ready for creating your <i>own</i> design-library?
		</pre> <pre>
npm create parametrix@latest tom07
		</pre>`,1),j=i(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),M=i(`<h1 class="svelte-19pmhx1">Prez of Parametrix</h1> <!>`,1);function N(i,N){c(N,!1),f();var P=M(),F=a(u(P),2);m(F,{children:(i,c)=>{var d=j(),f=u(d);h(f,{children:(r,i)=>{var a=g(),c=u(a),l=n(c);o(2),t(e=>s(l,`src`,e),[()=>p(`/favicon.svg`)]),e(r,a)},$$slots:{default:!0}});var m=a(f,2);h(m,{children:(t,n)=>{var r=_();o(4),e(t,r)},$$slots:{default:!0}});var M=a(m,2);h(M,{children:(n,r)=>{var i=v(),o=u(i),c=a(o,2);t((e,t)=>{s(o,`src`,e),s(c,`src`,t)},[()=>p(`/screen_gear.png`),()=>p(`/screen_helio_rake.png`)]),e(n,i)},$$slots:{default:!0}});var N=a(M,2);h(N,{children:(n,i)=>{var c=y(),d=u(c),f=r(d),m=a(f,2);l(d);var h=a(d,2),g=r(h),_=a(g,2);l(h),o(2),t((e,t,n,r)=>{s(f,`src`,e),s(m,`src`,t),s(g,`src`,n),s(_,`src`,r)},[()=>p(`/screen_cabane.png`),()=>p(`/screen_doorstop.png`),()=>p(`/screen_trapeze.png`),()=>p(`/screen_reinforced_tube.png`)]),e(n,c)},$$slots:{default:!0}});var P=a(N,2);h(P,{children:(n,r)=>{var i=b(),c=a(u(i),2);o(2),t(e=>s(c,`src`,e),[()=>p(`/puisvg/prez_parametrix_vs_classic_workflow.svg`)]),e(n,i)},$$slots:{default:!0}});var F=a(P,2);h(F,{children:(n,r)=>{var i=ee(),c=a(u(i),2);o(6),t(e=>s(c,`src`,e),[()=>p(`/puisvg/cad_flow_with_parametrix.svg`)]),e(n,i)},$$slots:{default:!0}});var I=a(F,2);h(I,{children:(t,n)=>{var r=x();e(t,r)},$$slots:{default:!0}});var L=a(I,2);h(L,{children:(n,r)=>{var i=S(),a=u(i);o(2),t(e=>s(a,`src`,e),[()=>p(`/puisvg/prez_parametrix_condensed.svg`)]),e(n,i)},$$slots:{default:!0}});var R=a(L,2);h(R,{children:(t,n)=>{o();var r=C();o(),e(t,r)},$$slots:{default:!0}});var z=a(R,2);h(z,{children:(t,n)=>{var r=w();e(t,r)},$$slots:{default:!0}});var B=a(z,2);h(B,{children:(n,r)=>{var i=T();t(e=>s(i,`src`,e),[()=>p(`/puisvg/concept_of_webapp_generator.svg`)]),e(n,i)},$$slots:{default:!0}});var V=a(B,2);h(V,{children:(r,i)=>{var a=E(),c=u(a),l=n(c);o(2),t(e=>s(l,`src`,e),[()=>p(`/puisvg/parametrix_3D_shape_subset.svg`)]),e(r,a)},$$slots:{default:!0}});var H=a(V,2);h(H,{children:(t,n)=>{var r=D();e(t,r)},$$slots:{default:!0}});var U=a(H,2);h(U,{children:(n,i)=>{var c=O(),d=u(c),f=a(r(d),2);l(d),o(2),t(e=>s(f,`src`,e),[()=>p(`/puisvg/codeExample1_contour.svg`)]),e(n,c)},$$slots:{default:!0}});var W=a(U,2);h(W,{children:(t,n)=>{var r=k();e(t,r)},$$slots:{default:!0}});var G=a(W,2);h(G,{children:(r,i)=>{var a=A(),c=u(a),l=n(c);o(2),t(e=>s(l,`src`,e),[()=>p(`/puisvg/prez_stroke_and_arc.svg`)]),e(r,a)},$$slots:{default:!0}});var K=a(G,2);h(K,{children:(r,i)=>{var a=te(),c=u(a),l=n(c);o(2),t(e=>s(l,`src`,e),[()=>p(`/puisvg/prez_absolute_relative.svg`)]),e(r,a)},$$slots:{default:!0}});var q=a(K,2);h(q,{children:(r,i)=>{var a=ne(),c=u(a),l=n(c);o(2),t(e=>s(l,`src`,e),[()=>p(`/puisvg/prez_arcs.svg`)]),e(r,a)},$$slots:{default:!0}});var J=a(q,2);h(J,{children:(r,i)=>{var a=re(),c=u(a),l=n(c);o(2),t(e=>s(l,`src`,e),[()=>p(`/puisvg/prez_curve_approximation.svg`)]),e(r,a)},$$slots:{default:!0}});var Y=a(J,2);h(Y,{children:(r,i)=>{var a=ie(),c=u(a),l=n(c);o(2),t(e=>s(l,`src`,e),[()=>p(`/puisvg/prez_corner_modifications.svg`)]),e(r,a)},$$slots:{default:!0}});var X=a(Y,2);h(X,{children:(n,i)=>{var c=ae(),d=u(c),f=r(d),m=a(f,2);l(d),o(2),t((e,t)=>{s(f,`src`,e),s(m,`src`,t)},[()=>p(`/puisvg/prez_design_structure.svg`),()=>p(`/puisvg/prez_figure_layers.svg`)]),e(n,c)},$$slots:{default:!0}});var Z=a(X,2);h(Z,{children:(r,i)=>{var o=oe(),c=u(o),l=n(c),d=a(c,4),f=n(d);t((e,t)=>{s(l,`src`,e),s(f,`src`,t)},[()=>p(`/puisvg/prez_extrudes.svg`),()=>p(`/puisvg/prez_boolean_operations.svg`)]),e(r,o)},$$slots:{default:!0}});var Q=a(Z,2);h(Q,{children:(t,n)=>{var r=se();e(t,r)},$$slots:{default:!0}});var $=a(Q,2);h($,{children:(t,n)=>{var r=ce();e(t,r)},$$slots:{default:!0}});var ue=a($,2);h(ue,{children:(t,n)=>{var r=le();o(2),e(t,r)},$$slots:{default:!0}}),e(i,d)},$$slots:{default:!0}}),e(i,P),d()}export{N as component};