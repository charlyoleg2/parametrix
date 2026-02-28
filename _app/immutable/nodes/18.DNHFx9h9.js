import"../chunks/DsnmJJEf.js";import"../chunks/B0yeDSe9.js";import{p as re,s as t,f as g,a as s,b as ae,c as i,d as _,r as h,n as d,t as v}from"../chunks/BbPHKYFl.js";import{s as l}from"../chunks/B32sI_Hj.js";import{i as te}from"../chunks/HuASpZhE.js";import{a as m}from"../chunks/DJ0mkbHa.js";import{C as oe,O as n}from"../chunks/D0RAwLpz.js";var se=i('<center><img style="width: 9em;" alt="Parametrix logo"/></center> <div><pre style="font-size:2.5em; margin:0;">Parametrix</pre> <center><i style="color: lightSkyBlue;">Geometrix</i>&nbsp;<i style="color: pink;">Designix</i></center></div>',1),ie=i('<pre style="font-size:2.5em; margin:0;">Parametrix</pre> <pre style="margin:0;">CAD as code for open-hardware</pre> <pre style="margin:0;">a JavaScript solution for creating 3D shapes</pre>',1),ne=i('<img style="width: 16em;" alt="screenshot of a gear"/> <img style="width: 16em;" alt="screenshot of the heliostat rake"/>',1),pe=i('<p><img style="height: 9em;" alt="screenshot of a cabane"/> <img style="width: 9em;" alt="screenshot of a doorstop"/></p> <p><img style="width: 9em;" alt="screenshot of a trapeze"/> <img style="width: 9em;" alt="screenshot of a reinforced tube"/></p> <p></p>',1),ce=i(`<pre style="font-size:1.5em; margin:0;">Parametrix workflow</pre> <img style="height: 9em;" alt="prez_parametrix_vs_classic_workflow"/> <pre>
Simplistic approach:
- contour centric (i.e. 2.5D)
  - cost efficient manufacturing process are 2D
  - robust mechanisms are 2D
- no long workflow chain
		</pre>`,1),le=i('<pre style="font-size:2em; margin:0;">Generate 3D files</pre> <img style="height: 9em;" alt="cad_flow_with_parametrix.svg"/> <pre style="margin:0;">&gt; a JavaScript solution for creating 3D shapes</pre> <pre style="margin:0;">&gt; a frontend that abstract the CAD solution</pre> <pre style="margin:0;">&gt; a generator of WebUI for parametrizing your designs</pre>',1),me=i(`<pre class="smaller svelte-19pmhx1">
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
		</pre>`),ge=i('<img style="width: 28em;" alt="Parametrix described in condensed"/> <p style="text-align:center; margin: 0.5rem">Parametrix in condensed</p>',1),de=i(`/ <pre>
framework / eco-system : Parametrix

          core library : Geometrix

      design-libraries : Designix, Desi78, Desi82, ...
		</pre>`,1),ve=i(`<pre>
Go through the design-UI
		</pre>`),_e=i('<img style="width: 28em;" alt="designer and maker"/>'),he=i(`<center><img style="width: 14em;" alt="3D shape subsets"/></center> <pre>
The Geometrix API for designing a 3D shape
		</pre>`,1),fe=i(`<pre>
The Geometrix API in a nutshell
		</pre>`),ue=i(`<p><span style="font-size:2em">Code example</span> <img style="height: 7em; vertical-align: middle" alt="codeExample1_contour.svg"/></p> <pre style="font-size:0.8em; padding-right: 5em">
const ctr1 = contour(0, 0)
	.addSegStrokeR(param.L2, 0)
	.addSegStrokeRP(a3, param.L3)
	.addPointAP(a4, param.L4)
	.addSegArc(param.R34, true, true)
	.addCornerRounded(param.R4)
	.addPointA(0, param.L5)
	.addSegArc3(a5, false)
	.closeSegStroke();
		</pre>`,1),ye=i(`<pre>
3 types of parameters
- number
- checkbox (i.e. boolean)
- dropdown (i.e. enum)
		</pre>`),$e=i(`<center><img style="width: 9em;" alt="stroke and arcs"/></center> <pre>
Create contour with:
- strokes
- arcs of circles

Optimal for generating G-code
		</pre>`,1),Pe=i(`<center><img style="width: 22em;" alt="absolute relative cartesian polar"/></center> <pre>
Next destination-point in contour-definition:
- Cartesian or Polar
- Relative or Absolute
		</pre>`,1),we=i(`<center><img style="width: 22em;" alt="three ways for defining arcs"/></center> <pre>
3 options for defining an arc of circle:
- radius with large/small and ccw/cw
- intermediate point
- tangent at the begining or the end
		</pre>`,1),xe=i(`<center><img style="width: 22em;" alt="curve approximation"/></center> <pre>
Complex curve approximation:
Double arcs defined with start and end tangents
		</pre>`,1),be=i(`<center><img style="width: 15em;" alt="corner modifications"/></center> <pre>
Corner rework:
- Rounded
- Widened
- WideAcc
		</pre>`,1),De=i(`<center><img style="width: 14em;" alt="design structure"/>&nbsp;<img style="width: 10em;" alt="figure layers"/></center> <pre>
- Define a list of figures
- Attach the contours to figures
    - as main, second or dynamics
		</pre>`,1),ze=i(`<center><img style="width: 12em;" alt="extrudes"/></center> <pre style="margin: 0.5em;">
Define the 3D shape
- Extrude figures as LinearOrtho or Rotate
- Rotate, translate and combine sub-element
    - Union
    - Intersection
    - Substraction</pre> <center><img style="width: 16em;" alt="boolean operations"/></center>`,1),Ce=i(`<pre>
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
		</pre>`),ke=i(`<pre>
   End of
     the
presentation
     of
 Parametrix
		</pre>`),Ae=i(`<pre style="color: orange">
Ready for creating your <i>own</i> design-library?
		</pre> <pre>
npm create parametrix@latest tom07
		</pre>`,1),Se=i("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1),Ge=i('<h1 class="svelte-19pmhx1">Prez of Parametrix</h1> <!>',1);function Ue(K,N){re(N,!1),te();var $=Ge(),Q=t(g($),2);oe(Q,{children:(X,Re)=>{var P=Se(),w=g(P);n(w,{children:(r,p)=>{var e=se(),a=g(e),o=_(a);h(a),d(2),v(c=>l(o,"src",c),[()=>m("/favicon.svg")]),s(r,e)}});var x=t(w,2);n(x,{children:(r,p)=>{var e=ie();d(4),s(r,e)}});var b=t(x,2);n(b,{children:(r,p)=>{var e=ne(),a=g(e),o=t(a,2);v((c,f)=>{l(a,"src",c),l(o,"src",f)},[()=>m("/screen_gear.png"),()=>m("/screen_helio_rake.png")]),s(r,e)}});var D=t(b,2);n(D,{children:(r,p)=>{var e=pe(),a=g(e),o=_(a),c=t(o,2);h(a);var f=t(a,2),u=_(f),y=t(u,2);h(f),d(2),v((V,Y,Z,ee)=>{l(o,"src",V),l(c,"src",Y),l(u,"src",Z),l(y,"src",ee)},[()=>m("/screen_cabane.png"),()=>m("/screen_doorstop.png"),()=>m("/screen_trapeze.png"),()=>m("/screen_reinforced_tube.png")]),s(r,e)}});var z=t(D,2);n(z,{children:(r,p)=>{var e=ce(),a=t(g(e),2);d(2),v(o=>l(a,"src",o),[()=>m("/puisvg/prez_parametrix_vs_classic_workflow.svg")]),s(r,e)}});var C=t(z,2);n(C,{children:(r,p)=>{var e=le(),a=t(g(e),2);d(6),v(o=>l(a,"src",o),[()=>m("/puisvg/cad_flow_with_parametrix.svg")]),s(r,e)}});var k=t(C,2);n(k,{children:(r,p)=>{var e=me();s(r,e)}});var A=t(k,2);n(A,{children:(r,p)=>{var e=ge(),a=g(e);d(2),v(o=>l(a,"src",o),[()=>m("/puisvg/prez_parametrix_condensed.svg")]),s(r,e)}});var S=t(A,2);n(S,{children:(r,p)=>{d();var e=de();d(),s(r,e)}});var G=t(S,2);n(G,{children:(r,p)=>{var e=ve();s(r,e)}});var R=t(G,2);n(R,{children:(r,p)=>{var e=_e();v(a=>l(e,"src",a),[()=>m("/puisvg/concept_of_webapp_generator.svg")]),s(r,e)}});var O=t(R,2);n(O,{children:(r,p)=>{var e=he(),a=g(e),o=_(a);h(a),d(2),v(c=>l(o,"src",c),[()=>m("/puisvg/parametrix_3D_shape_subset.svg")]),s(r,e)}});var I=t(O,2);n(I,{children:(r,p)=>{var e=fe();s(r,e)}});var L=t(I,2);n(L,{children:(r,p)=>{var e=ue(),a=g(e),o=t(_(a),2);h(a),d(2),v(c=>l(o,"src",c),[()=>m("/puisvg/codeExample1_contour.svg")]),s(r,e)}});var T=t(L,2);n(T,{children:(r,p)=>{var e=ye();s(r,e)}});var j=t(T,2);n(j,{children:(r,p)=>{var e=$e(),a=g(e),o=_(a);h(a),d(2),v(c=>l(o,"src",c),[()=>m("/puisvg/prez_stroke_and_arc.svg")]),s(r,e)}});var E=t(j,2);n(E,{children:(r,p)=>{var e=Pe(),a=g(e),o=_(a);h(a),d(2),v(c=>l(o,"src",c),[()=>m("/puisvg/prez_absolute_relative.svg")]),s(r,e)}});var J=t(E,2);n(J,{children:(r,p)=>{var e=we(),a=g(e),o=_(a);h(a),d(2),v(c=>l(o,"src",c),[()=>m("/puisvg/prez_arcs.svg")]),s(r,e)}});var U=t(J,2);n(U,{children:(r,p)=>{var e=xe(),a=g(e),o=_(a);h(a),d(2),v(c=>l(o,"src",c),[()=>m("/puisvg/prez_curve_approximation.svg")]),s(r,e)}});var W=t(U,2);n(W,{children:(r,p)=>{var e=be(),a=g(e),o=_(a);h(a),d(2),v(c=>l(o,"src",c),[()=>m("/puisvg/prez_corner_modifications.svg")]),s(r,e)}});var F=t(W,2);n(F,{children:(r,p)=>{var e=De(),a=g(e),o=_(a),c=t(o,2);h(a),d(2),v((f,u)=>{l(o,"src",f),l(c,"src",u)},[()=>m("/puisvg/prez_design_structure.svg"),()=>m("/puisvg/prez_figure_layers.svg")]),s(r,e)}});var M=t(F,2);n(M,{children:(r,p)=>{var e=ze(),a=g(e),o=_(a);h(a);var c=t(a,4),f=_(c);h(c),v((u,y)=>{l(o,"src",u),l(f,"src",y)},[()=>m("/puisvg/prez_extrudes.svg"),()=>m("/puisvg/prez_boolean_operations.svg")]),s(r,e)}});var B=t(M,2);n(B,{children:(r,p)=>{var e=Ce();s(r,e)}});var H=t(B,2);n(H,{children:(r,p)=>{var e=ke();s(r,e)}});var q=t(H,2);n(q,{children:(r,p)=>{var e=Ae();d(2),s(r,e)}}),s(X,P)},$$slots:{default:!0}}),s(K,$),ae()}export{Ue as component};
