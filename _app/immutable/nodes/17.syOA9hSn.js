import{a as o,t as s}from"../chunks/disclose-version.DvOiD1i3.js";import{s as a,f as d,c as m,r as v,n as g}from"../chunks/runtime.DvxED-OY.js";import{s as p}from"../chunks/attributes.CNMcroC5.js";import{b as c}from"../chunks/paths.Q4AA3qkY.js";import{C as Q,O as i}from"../chunks/OneSlide.DCNdzJrY.js";var X=s('<center><img style="width: 9em;" alt="Parametrix logo"></center> <div><pre style="font-size:2.5em; margin:0;">Parametrix</pre> <center><i style="color: lightSkyBlue;">Geometrix</i>&nbsp;<i style="color: pink;">Designix</i></center></div>',1),K=s('<pre style="font-size:2.5em; margin:0;">Parametrix</pre> <pre style="margin:0;">CAD as code for open-hardware</pre> <pre style="margin:0;">a JavaScript solution for creating 3D shapes</pre>',1),V=s('<img style="width: 16em;" alt="screenshot of a gear"> <img style="width: 16em;" alt="screenshot of the heliostat rake">',1),Y=s('<p><img style="height: 9em;" alt="screenshot of a cabane"> <img style="width: 9em;" alt="screenshot of a doorstop"></p> <p><img style="width: 9em;" alt="screenshot of a trapeze"> <img style="width: 9em;" alt="screenshot of a reinforced tube"></p> <p></p>',1),Z=s(`<pre style="font-size:1.5em; margin:0;">Parametrix workflow</pre> <img style="height: 9em;" alt="prez_parametrix_vs_classic_workflow"> <pre>
Simplistic approach:
- contour centric (i.e. 2.5D)
  - cost efficient manufacturing process are 2D
  - robust mechanisms are 2D
- no long workflow chain
		</pre>`,1),ee=s('<pre style="font-size:2em; margin:0;">Generate 3D files</pre> <img style="height: 9em;" alt="cad_flow_with_parametrix.svg"> <pre style="margin:0;">&gt; a JavaScript solution for creating 3D shapes</pre> <pre style="margin:0;">&gt; a frontend that abstract the CAD solution</pre> <pre style="margin:0;">&gt; a generator of WebUI for parametrizing your designs</pre>',1),re=s(`<pre>
Parametrix main characteristics:

1. free and open-source
    (like Freecad or SolveSpace)

2. JavaScript
    for designing 3D shapes (similar to OpenSCAD)

3. CAD tool abstraction
    for keeping your 3D-shapes agnostic to CAD vendors

4. HTML page
    for parametrization and generating the 3D scripts
		</pre>`),te=s(`<pre>
framework / eco-system : Parametrix

          core library : Geometrix

      design-libraries : Designix, Desi78, Desi82, ...
		</pre>`),ae=s(`<pre>
Go through the design-UI
		</pre>`),oe=s('<img style="width: 28em;" alt="designer and maker">'),se=s(`<center><img style="width: 14em;" alt="3D shape subsets"></center> <pre>
The Geometrix API for designing a 3D shape
		</pre>`,1),ne=s(`<pre>
The Geometrix API in a nutshell
		</pre>`),ie=s(`<p><span style="font-size:2em">Code example</span> <img style="height: 7em; vertical-align: middle" alt="codeExample1_contour.svg"></p> <pre style="font-size:0.8em; padding-right: 5em">
const ctr1 = contour(0, 0)
	.addSegStrokeR(param.L2, 0)
	.addSegStrokeRP(a3, param.L3)
	.addPointAP(a4, param.L4)
	.addSegArc(param.R34, true, true)
	.addCornerRounded(param.R4)
	.addPointA(0, param.L5)
	.addSegArc3(a5, false)
	.closeSegStroke();
		</pre>`,1),le=s(`<pre>
3 types of parameters
- number
- checkbox (i.e. boolean)
- dropdown (i.e. enum)
		</pre>`),pe=s(`<center><img style="width: 9em;" alt="stroke and arcs"></center> <pre>
Create contour with:
- strokes
- arcs of circles

Optimal for generating G-code
		</pre>`,1),ce=s(`<center><img style="width: 22em;" alt="absolute relative cartesian polar"></center> <pre>
Next destination-point in contour-definition:
- Cartesian or Polar
- Relative or Absolute
		</pre>`,1),de=s(`<center><img style="width: 22em;" alt="three ways for defining arcs"></center> <pre>
3 options for defining an arc of circle:
- radius with large/small and ccw/cw
- intermediate point
- tangent at the begining or the end
		</pre>`,1),ge=s(`<center><img style="width: 22em;" alt="curve approximation"></center> <pre>
Complex curve approximation:
Double arcs defined with start and end tangents
		</pre>`,1),me=s(`<center><img style="width: 15em;" alt="corner modifications"></center> <pre>
Corner rework:
- Rounded
- Widened
- WideAcc
		</pre>`,1),ve=s(`<center><img style="width: 14em;" alt="design structure">&nbsp;<img style="width: 10em;" alt="figure layers"></center> <pre>
- Define a list of figures
- Attach the contours to figures
    - as main, second or dynamics
		</pre>`,1),_e=s(`<center><img style="width: 12em;" alt="extrudes"></center> <pre style="margin: 0.5em;">
Define the 3D shape
- Extrude figures as LinearOrtho or Rotate
- Rotate, translate and combine sub-element
    - Union
    - Intersection
    - Substraction</pre> <center><img style="width: 16em;" alt="boolean operations"></center>`,1),$e=s(`<pre>
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
		</pre>`),ue=s(`<pre>
   End of
     the
presentation
     of
 Parametrix
		</pre>`),fe=s(`<pre style="color: orange">
Ready for creating your <i>own</i> design-library?
		</pre> <pre>
npm create parametrix@latest tom07
		</pre>`,1),he=s("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1),ye=s('<h1 class="svelte-1vccleq">Prez of Parametrix</h1> <!>',1);function Se(M){var u=ye(),q=a(d(u),2);Q(q,{children:(B,Pe)=>{var f=he(),h=d(f);i(h,{children:(r,l)=>{var e=X(),t=d(e),n=m(t);p(n,"src",`${c??""}/favicon.svg`),v(t),g(2),o(r,e)},$$slots:{default:!0}});var y=a(h,2);i(y,{children:(r,l)=>{var e=K();g(4),o(r,e)},$$slots:{default:!0}});var P=a(y,2);i(P,{children:(r,l)=>{var e=V(),t=d(e);p(t,"src",`${c??""}/screen_gear.png`);var n=a(t,2);p(n,"src",`${c??""}/screen_helio_rake.png`),o(r,e)},$$slots:{default:!0}});var w=a(P,2);i(w,{children:(r,l)=>{var e=Y(),t=d(e),n=m(t);p(n,"src",`${c??""}/screen_cabane.png`);var _=a(n,2);p(_,"src",`${c??""}/screen_doorstop.png`),v(t);var $=a(t,2),j=m($);p(j,"src",`${c??""}/screen_trapeze.png`);var N=a(j,2);p(N,"src",`${c??""}/screen_reinforced_tube.png`),v($),g(2),o(r,e)},$$slots:{default:!0}});var x=a(w,2);i(x,{children:(r,l)=>{var e=Z(),t=a(d(e),2);p(t,"src",`${c??""}/puisvg/prez_parametrix_vs_classic_workflow.svg`),g(2),o(r,e)},$$slots:{default:!0}});var b=a(x,2);i(b,{children:(r,l)=>{var e=ee(),t=a(d(e),2);p(t,"src",`${c??""}/puisvg/cad_flow_with_parametrix.svg`),g(6),o(r,e)},$$slots:{default:!0}});var D=a(b,2);i(D,{children:(r,l)=>{var e=re();o(r,e)},$$slots:{default:!0}});var z=a(D,2);i(z,{children:(r,l)=>{var e=te();o(r,e)},$$slots:{default:!0}});var S=a(z,2);i(S,{children:(r,l)=>{var e=ae();o(r,e)},$$slots:{default:!0}});var k=a(S,2);i(k,{children:(r,l)=>{var e=oe();p(e,"src",`${c??""}/puisvg/concept_of_webapp_generator.svg`),o(r,e)},$$slots:{default:!0}});var C=a(k,2);i(C,{children:(r,l)=>{var e=se(),t=d(e),n=m(t);p(n,"src",`${c??""}/puisvg/parametrix_3D_shape_subset.svg`),v(t),g(2),o(r,e)},$$slots:{default:!0}});var A=a(C,2);i(A,{children:(r,l)=>{var e=ne();o(r,e)},$$slots:{default:!0}});var R=a(A,2);i(R,{children:(r,l)=>{var e=ie(),t=d(e),n=a(m(t),2);p(n,"src",`${c??""}/puisvg/codeExample1_contour.svg`),v(t),g(2),o(r,e)},$$slots:{default:!0}});var O=a(R,2);i(O,{children:(r,l)=>{var e=le();o(r,e)},$$slots:{default:!0}});var G=a(O,2);i(G,{children:(r,l)=>{var e=pe(),t=d(e),n=m(t);p(n,"src",`${c??""}/puisvg/prez_stroke_and_arc.svg`),v(t),g(2),o(r,e)},$$slots:{default:!0}});var L=a(G,2);i(L,{children:(r,l)=>{var e=ce(),t=d(e),n=m(t);p(n,"src",`${c??""}/puisvg/prez_absolute_relative.svg`),v(t),g(2),o(r,e)},$$slots:{default:!0}});var I=a(L,2);i(I,{children:(r,l)=>{var e=de(),t=d(e),n=m(t);p(n,"src",`${c??""}/puisvg/prez_arcs.svg`),v(t),g(2),o(r,e)},$$slots:{default:!0}});var T=a(I,2);i(T,{children:(r,l)=>{var e=ge(),t=d(e),n=m(t);p(n,"src",`${c??""}/puisvg/prez_curve_approximation.svg`),v(t),g(2),o(r,e)},$$slots:{default:!0}});var E=a(T,2);i(E,{children:(r,l)=>{var e=me(),t=d(e),n=m(t);p(n,"src",`${c??""}/puisvg/prez_corner_modifications.svg`),v(t),g(2),o(r,e)},$$slots:{default:!0}});var J=a(E,2);i(J,{children:(r,l)=>{var e=ve(),t=d(e),n=m(t);p(n,"src",`${c??""}/puisvg/prez_design_structure.svg`);var _=a(n,2);p(_,"src",`${c??""}/puisvg/prez_figure_layers.svg`),v(t),g(2),o(r,e)},$$slots:{default:!0}});var F=a(J,2);i(F,{children:(r,l)=>{var e=_e(),t=d(e),n=m(t);p(n,"src",`${c??""}/puisvg/prez_extrudes.svg`),v(t);var _=a(t,4),$=m(_);p($,"src",`${c??""}/puisvg/prez_boolean_operations.svg`),v(_),o(r,e)},$$slots:{default:!0}});var U=a(F,2);i(U,{children:(r,l)=>{var e=$e();o(r,e)},$$slots:{default:!0}});var W=a(U,2);i(W,{children:(r,l)=>{var e=ue();o(r,e)},$$slots:{default:!0}});var H=a(W,2);i(H,{children:(r,l)=>{var e=fe();g(2),o(r,e)},$$slots:{default:!0}}),o(B,f)},$$slots:{default:!0}}),o(M,u)}export{Se as component};
