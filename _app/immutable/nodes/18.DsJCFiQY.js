import{A as e,G as t,H as n,J as r,K as i,M as a,a as o,at as s,d as c,nt as l,ot as u,q as d,tt as f}from"../chunks/wHjrq2fJ.js";import"../chunks/w21Sci9-.js";import{t as p}from"../chunks/DV4r2iTk.js";import"../chunks/B8dPtS_a.js";import{n as m,t as h}from"../chunks/CY14PbQY.js";var g=a(`<center><img style="width: 9em;" alt="Parametrix logo"/></center> <div><pre style="font-size:2.5em; margin:0;">Parametrix</pre> <center><i style="color: lightSkyBlue;">Geometrix</i> <i style="color: pink;">Designix</i></center></div>`,1),_=a(`<pre style="font-size:2.5em; margin:0;">Parametrix</pre> <pre style="margin:0;">CAD as code for open-hardware</pre> <pre style="margin:0;">a JavaScript solution for creating 3D shapes</pre>`,1),v=a(`<img style="width: 16em;" alt="screenshot of a gear"/> <img style="width: 16em;" alt="screenshot of the heliostat rake"/>`,1),y=a(`<p><img style="height: 9em;" alt="screenshot of a cabane"/> <img style="width: 9em;" alt="screenshot of a doorstop"/></p> <p><img style="width: 9em;" alt="screenshot of a trapeze"/> <img style="width: 9em;" alt="screenshot of a reinforced tube"/></p> <p></p>`,1),b=a(`<pre style="font-size:1.5em; margin:0;">Parametrix workflow</pre> <img style="height: 9em;" alt="prez_parametrix_vs_classic_workflow"/> <pre>
Simplistic approach:
- contour centric (i.e. 2.5D)
  - cost efficient manufacturing process are 2D
  - robust mechanisms are 2D
- no long workflow chain
		</pre>`,1),ee=a(`<pre style="font-size:2em; margin:0;">Generate 3D files</pre> <img style="height: 9em;" alt="cad_flow_with_parametrix.svg"/> <pre style="margin:0;">> a JavaScript solution for creating 3D shapes</pre> <pre style="margin:0;">> a frontend that abstract the CAD solution</pre> <pre style="margin:0;">> a generator of WebUI for parametrizing your designs</pre>`,1),x=a(`<pre class="smaller svelte-19pmhx1">
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
		</pre>`),S=a(`<img style="width: 28em;" alt="Parametrix described in condensed"/> <p style="text-align:center; margin: 0.5rem">Parametrix in condensed</p>`,1),C=a(`<pre>
framework / eco-system : Parametrix

          core library : Geometrix

      design-libraries : Designix, Desi78, Desi82, ...
		</pre>`),w=a(`<pre>
Go through the design-UI
		</pre>`),T=a(`<img style="width: 28em;" alt="designer and maker"/>`),E=a(`<center><img style="width: 14em;" alt="3D shape subsets"/></center> <pre>
The Geometrix API for designing a 3D shape
		</pre>`,1),D=a(`<pre>
The Geometrix API in a nutshell
		</pre>`),O=a(`<p><span style="font-size:2em">Code example</span> <img style="height: 7em; vertical-align: middle" alt="codeExample1_contour.svg"/></p> <pre style="font-size:0.8em; padding-right: 5em">
const ctr1 = contour(0, 0)
	.addSegStrokeR(param.L2, 0)
	.addSegStrokeRP(a3, param.L3)
	.addPointAP(a4, param.L4)
	.addSegArc(param.R34, true, true)
	.addCornerRounded(param.R4)
	.addPointA(0, param.L5)
	.addSegArc3(a5, false)
	.closeSegStroke();
		</pre>`,1),k=a(`<pre>
3 types of parameters
- number
- checkbox (i.e. boolean)
- dropdown (i.e. enum)
		</pre>`),A=a(`<center><img style="width: 9em;" alt="stroke and arcs"/></center> <pre>
Create contour with:
- strokes
- arcs of circles

Optimal for generating G-code
		</pre>`,1),te=a(`<center><img style="width: 22em;" alt="absolute relative cartesian polar"/></center> <pre>
Next destination-point in contour-definition:
- Cartesian or Polar
- Relative or Absolute
		</pre>`,1),ne=a(`<center><img style="width: 22em;" alt="three ways for defining arcs"/></center> <pre>
3 options for defining an arc of circle:
- radius with large/small and ccw/cw
- intermediate point
- tangent at the begining or the end
		</pre>`,1),re=a(`<center><img style="width: 22em;" alt="curve approximation"/></center> <pre>
Complex curve approximation:
Double arcs defined with start and end tangents
		</pre>`,1),ie=a(`<center><img style="width: 15em;" alt="corner modifications"/></center> <pre>
Corner rework:
- Rounded
- Widened
- WideAcc
		</pre>`,1),ae=a(`<center><img style="width: 14em;" alt="design structure"/> <img style="width: 10em;" alt="figure layers"/></center> <pre>
- Define a list of figures
- Attach the contours to figures
    - as main, second or dynamics
		</pre>`,1),oe=a(`<center><img style="width: 12em;" alt="extrudes"/></center> <pre style="margin: 0.5em;">
Define the 3D shape
- Extrude figures as LinearOrtho or Rotate
- Rotate, translate and combine sub-element
    - Union
    - Intersection
    - Substraction</pre> <center><img style="width: 16em;" alt="boolean operations"/></center>`,1),se=a(`<pre>
Parametrix generates 3D scripts for:
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
		</pre>`),ce=a(`<pre>
   End of
     the
presentation
     of
 Parametrix
		</pre>`),le=a(`<pre style="color: orange">
Ready for creating your <i>own</i> design-library?
		</pre> <pre>
npm create parametrix@latest tom07
		</pre>`,1),j=a(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),M=a(`<h1 class="svelte-19pmhx1">Prez of Parametrix</h1> <!>`,1);function N(a,N){l(N,!1),o();var P=M(),F=r(i(P),2);m(F,{children:(a,o)=>{var l=j(),f=i(l);h(f,{children:(t,r)=>{var a=g(),o=i(a),l=d(o);s(2),n(e=>c(l,`src`,e),[()=>p(`favicon.svg`)]),e(t,a)},$$slots:{default:!0}});var m=r(f,2);h(m,{children:(t,n)=>{var r=_();s(4),e(t,r)},$$slots:{default:!0}});var M=r(m,2);h(M,{children:(t,a)=>{var o=v(),s=i(o),l=r(s,2);n((e,t)=>{c(s,`src`,e),c(l,`src`,t)},[()=>p(`screen_gear.png`),()=>p(`screen_helio_rake.png`)]),e(t,o)},$$slots:{default:!0}});var N=r(M,2);h(N,{children:(a,o)=>{var l=y(),d=i(l),f=t(d),m=r(f,2);u(d);var h=r(d,2),g=t(h),_=r(g,2);u(h),s(2),n((e,t,n,r)=>{c(f,`src`,e),c(m,`src`,t),c(g,`src`,n),c(_,`src`,r)},[()=>p(`screen_cabane.png`),()=>p(`screen_doorstop.png`),()=>p(`screen_trapeze.png`),()=>p(`screen_reinforced_tube.png`)]),e(a,l)},$$slots:{default:!0}});var P=r(N,2);h(P,{children:(t,a)=>{var o=b(),l=r(i(o),2);s(2),n(e=>c(l,`src`,e),[()=>p(`puisvg/prez_parametrix_vs_classic_workflow.svg`)]),e(t,o)},$$slots:{default:!0}});var F=r(P,2);h(F,{children:(t,a)=>{var o=ee(),l=r(i(o),2);s(6),n(e=>c(l,`src`,e),[()=>p(`puisvg/cad_flow_with_parametrix.svg`)]),e(t,o)},$$slots:{default:!0}});var I=r(F,2);h(I,{children:(t,n)=>{var r=x();e(t,r)},$$slots:{default:!0}});var L=r(I,2);h(L,{children:(t,r)=>{var a=S(),o=i(a);s(2),n(e=>c(o,`src`,e),[()=>p(`puisvg/prez_parametrix_condensed.svg`)]),e(t,a)},$$slots:{default:!0}});var R=r(L,2);h(R,{children:(t,n)=>{var r=C();e(t,r)},$$slots:{default:!0}});var z=r(R,2);h(z,{children:(t,n)=>{var r=w();e(t,r)},$$slots:{default:!0}});var B=r(z,2);h(B,{children:(t,r)=>{var i=T();n(e=>c(i,`src`,e),[()=>p(`puisvg/concept_of_webapp_generator.svg`)]),e(t,i)},$$slots:{default:!0}});var V=r(B,2);h(V,{children:(t,r)=>{var a=E(),o=i(a),l=d(o);s(2),n(e=>c(l,`src`,e),[()=>p(`puisvg/parametrix_3D_shape_subset.svg`)]),e(t,a)},$$slots:{default:!0}});var H=r(V,2);h(H,{children:(t,n)=>{var r=D();e(t,r)},$$slots:{default:!0}});var U=r(H,2);h(U,{children:(a,o)=>{var l=O(),d=i(l),f=r(t(d),2);u(d),s(2),n(e=>c(f,`src`,e),[()=>p(`puisvg/codeExample1_contour.svg`)]),e(a,l)},$$slots:{default:!0}});var W=r(U,2);h(W,{children:(t,n)=>{var r=k();e(t,r)},$$slots:{default:!0}});var G=r(W,2);h(G,{children:(t,r)=>{var a=A(),o=i(a),l=d(o);s(2),n(e=>c(l,`src`,e),[()=>p(`puisvg/prez_stroke_and_arc.svg`)]),e(t,a)},$$slots:{default:!0}});var K=r(G,2);h(K,{children:(t,r)=>{var a=te(),o=i(a),l=d(o);s(2),n(e=>c(l,`src`,e),[()=>p(`puisvg/prez_absolute_relative.svg`)]),e(t,a)},$$slots:{default:!0}});var q=r(K,2);h(q,{children:(t,r)=>{var a=ne(),o=i(a),l=d(o);s(2),n(e=>c(l,`src`,e),[()=>p(`puisvg/prez_arcs.svg`)]),e(t,a)},$$slots:{default:!0}});var J=r(q,2);h(J,{children:(t,r)=>{var a=re(),o=i(a),l=d(o);s(2),n(e=>c(l,`src`,e),[()=>p(`puisvg/prez_curve_approximation.svg`)]),e(t,a)},$$slots:{default:!0}});var Y=r(J,2);h(Y,{children:(t,r)=>{var a=ie(),o=i(a),l=d(o);s(2),n(e=>c(l,`src`,e),[()=>p(`puisvg/prez_corner_modifications.svg`)]),e(t,a)},$$slots:{default:!0}});var X=r(Y,2);h(X,{children:(a,o)=>{var l=ae(),d=i(l),f=t(d),m=r(f,2);u(d),s(2),n((e,t)=>{c(f,`src`,e),c(m,`src`,t)},[()=>p(`puisvg/prez_design_structure.svg`),()=>p(`puisvg/prez_figure_layers.svg`)]),e(a,l)},$$slots:{default:!0}});var Z=r(X,2);h(Z,{children:(t,a)=>{var o=oe(),s=i(o),l=d(s),u=r(s,4),f=d(u);n((e,t)=>{c(l,`src`,e),c(f,`src`,t)},[()=>p(`puisvg/prez_extrudes.svg`),()=>p(`puisvg/prez_boolean_operations.svg`)]),e(t,o)},$$slots:{default:!0}});var Q=r(Z,2);h(Q,{children:(t,n)=>{var r=se();e(t,r)},$$slots:{default:!0}});var $=r(Q,2);h($,{children:(t,n)=>{var r=ce();e(t,r)},$$slots:{default:!0}});var ue=r($,2);h(ue,{children:(t,n)=>{var r=le();s(2),e(t,r)},$$slots:{default:!0}}),e(a,l)},$$slots:{default:!0}}),e(a,P),f()}export{N as component};