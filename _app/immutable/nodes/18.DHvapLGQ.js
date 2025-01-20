import{a as o,t as s}from"../chunks/o_T6vob4.js";import"../chunks/DQ-Mpi_-.js";import{s as a,f as d,c as g,r as v,n as m}from"../chunks/BGrkO9XG.js";import{s as p}from"../chunks/B5kygR-2.js";import{b as c}from"../chunks/Ca6g9LxO.js";import{C as X,O as i}from"../chunks/CmAoctIl.js";var q=s('<center><img style="width: 9em;" alt="Parametrix logo"></center> <div><pre style="font-size:2.5em; margin:0;">Parametrix</pre> <center><i style="color: lightSkyBlue;">Geometrix</i>&nbsp;<i style="color: pink;">Designix</i></center></div>',1),V=s('<pre style="font-size:2.5em; margin:0;">Parametrix</pre> <pre style="margin:0;">CAD as code for open-hardware</pre> <pre style="margin:0;">a JavaScript solution for creating 3D shapes</pre>',1),Y=s('<img style="width: 16em;" alt="screenshot of a gear"> <img style="width: 16em;" alt="screenshot of the heliostat rake">',1),Z=s('<p><img style="height: 9em;" alt="screenshot of a cabane"> <img style="width: 9em;" alt="screenshot of a doorstop"></p> <p><img style="width: 9em;" alt="screenshot of a trapeze"> <img style="width: 9em;" alt="screenshot of a reinforced tube"></p> <p></p>',1),ee=s(`<pre style="font-size:1.5em; margin:0;">Parametrix workflow</pre> <img style="height: 9em;" alt="prez_parametrix_vs_classic_workflow"> <pre>Simplistic approach:
- contour centric (i.e. 2.5D)
  - cost efficient manufacturing process are 2D
  - robust mechanisms are 2D
- no long workflow chain
		</pre>`,1),re=s('<pre style="font-size:2em; margin:0;">Generate 3D files</pre> <img style="height: 9em;" alt="cad_flow_with_parametrix.svg"> <pre style="margin:0;">&gt; a JavaScript solution for creating 3D shapes</pre> <pre style="margin:0;">&gt; a frontend that abstract the CAD solution</pre> <pre style="margin:0;">&gt; a generator of WebUI for parametrizing your designs</pre>',1),te=s(`<pre class="smaller svelte-7e5ith">Parametrix main advantages:

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
		</pre>`),ae=s('<img style="width: 28em;" alt="Parametrix described in condensed"> <p style="text-align:center; margin: 0.5rem">Parametrix in condensed</p>',1),oe=s(`/ <pre>framework / eco-system : Parametrix

          core library : Geometrix

      design-libraries : Designix, Desi78, Desi82, ...
		</pre>`,1),se=s(`<pre>Go through the design-UI
		</pre>`),ne=s('<img style="width: 28em;" alt="designer and maker">'),ie=s(`<center><img style="width: 14em;" alt="3D shape subsets"></center> <pre>The Geometrix API for designing a 3D shape
		</pre>`,1),le=s(`<pre>The Geometrix API in a nutshell
		</pre>`),pe=s(`<p><span style="font-size:2em">Code example</span> <img style="height: 7em; vertical-align: middle" alt="codeExample1_contour.svg"></p> <pre style="font-size:0.8em; padding-right: 5em">const ctr1 = contour(0, 0)
	.addSegStrokeR(param.L2, 0)
	.addSegStrokeRP(a3, param.L3)
	.addPointAP(a4, param.L4)
	.addSegArc(param.R34, true, true)
	.addCornerRounded(param.R4)
	.addPointA(0, param.L5)
	.addSegArc3(a5, false)
	.closeSegStroke();
		</pre>`,1),ce=s(`<pre>3 types of parameters
- number
- checkbox (i.e. boolean)
- dropdown (i.e. enum)
		</pre>`),de=s(`<center><img style="width: 9em;" alt="stroke and arcs"></center> <pre>Create contour with:
- strokes
- arcs of circles

Optimal for generating G-code
		</pre>`,1),me=s(`<center><img style="width: 22em;" alt="absolute relative cartesian polar"></center> <pre>Next destination-point in contour-definition:
- Cartesian or Polar
- Relative or Absolute
		</pre>`,1),ge=s(`<center><img style="width: 22em;" alt="three ways for defining arcs"></center> <pre>3 options for defining an arc of circle:
- radius with large/small and ccw/cw
- intermediate point
- tangent at the begining or the end
		</pre>`,1),ve=s(`<center><img style="width: 22em;" alt="curve approximation"></center> <pre>Complex curve approximation:
Double arcs defined with start and end tangents
		</pre>`,1),_e=s(`<center><img style="width: 15em;" alt="corner modifications"></center> <pre>Corner rework:
- Rounded
- Widened
- WideAcc
		</pre>`,1),ue=s(`<center><img style="width: 14em;" alt="design structure">&nbsp;<img style="width: 10em;" alt="figure layers"></center> <pre>- Define a list of figures
- Attach the contours to figures
    - as main, second or dynamics
		</pre>`,1),fe=s(`<center><img style="width: 12em;" alt="extrudes"></center> <pre style="margin: 0.5em;">Define the 3D shape
- Extrude figures as LinearOrtho or Rotate
- Rotate, translate and combine sub-element
    - Union
    - Intersection
    - Substraction</pre> <center><img style="width: 16em;" alt="boolean operations"></center>`,1),$e=s(`<pre>Parametrix generates 3D scripts for:
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
		</pre>`),he=s(`<pre>   End of
     the
presentation
     of
 Parametrix
		</pre>`),ye=s(`<pre style="color: orange">Ready for creating your <i>own</i> design-library?
		</pre> <pre>npm create parametrix@latest tom07
		</pre>`,1),Pe=s("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1),we=s('<h1 class="svelte-7e5ith">Prez of Parametrix</h1> <!>',1);function Se(B){var f=we(),H=a(d(f),2);X(H,{children:(K,xe)=>{var $=Pe(),h=d($);i(h,{children:(r,l)=>{var e=q(),t=d(e),n=g(t);p(n,"src",`${c??""}/favicon.svg`),v(t),m(2),o(r,e)},$$slots:{default:!0}});var y=a(h,2);i(y,{children:(r,l)=>{var e=V();m(4),o(r,e)},$$slots:{default:!0}});var P=a(y,2);i(P,{children:(r,l)=>{var e=Y(),t=d(e);p(t,"src",`${c??""}/screen_gear.png`);var n=a(t,2);p(n,"src",`${c??""}/screen_helio_rake.png`),o(r,e)},$$slots:{default:!0}});var w=a(P,2);i(w,{children:(r,l)=>{var e=Z(),t=d(e),n=g(t);p(n,"src",`${c??""}/screen_cabane.png`);var _=a(n,2);p(_,"src",`${c??""}/screen_doorstop.png`),v(t);var u=a(t,2),M=g(u);p(M,"src",`${c??""}/screen_trapeze.png`);var Q=a(M,2);p(Q,"src",`${c??""}/screen_reinforced_tube.png`),v(u),m(2),o(r,e)},$$slots:{default:!0}});var x=a(w,2);i(x,{children:(r,l)=>{var e=ee(),t=a(d(e),2);p(t,"src",`${c??""}/puisvg/prez_parametrix_vs_classic_workflow.svg`),m(2),o(r,e)},$$slots:{default:!0}});var b=a(x,2);i(b,{children:(r,l)=>{var e=re(),t=a(d(e),2);p(t,"src",`${c??""}/puisvg/cad_flow_with_parametrix.svg`),m(6),o(r,e)},$$slots:{default:!0}});var D=a(b,2);i(D,{children:(r,l)=>{var e=te();o(r,e)},$$slots:{default:!0}});var z=a(D,2);i(z,{children:(r,l)=>{var e=ae(),t=d(e);p(t,"src",`${c??""}/puisvg/prez_parametrix_condensed.svg`),m(2),o(r,e)},$$slots:{default:!0}});var C=a(z,2);i(C,{children:(r,l)=>{m();var e=oe();m(),o(r,e)},$$slots:{default:!0}});var k=a(C,2);i(k,{children:(r,l)=>{var e=se();o(r,e)},$$slots:{default:!0}});var A=a(k,2);i(A,{children:(r,l)=>{var e=ne();p(e,"src",`${c??""}/puisvg/concept_of_webapp_generator.svg`),o(r,e)},$$slots:{default:!0}});var S=a(A,2);i(S,{children:(r,l)=>{var e=ie(),t=d(e),n=g(t);p(n,"src",`${c??""}/puisvg/parametrix_3D_shape_subset.svg`),v(t),m(2),o(r,e)},$$slots:{default:!0}});var G=a(S,2);i(G,{children:(r,l)=>{var e=le();o(r,e)},$$slots:{default:!0}});var R=a(G,2);i(R,{children:(r,l)=>{var e=pe(),t=d(e),n=a(g(t),2);p(n,"src",`${c??""}/puisvg/codeExample1_contour.svg`),v(t),m(2),o(r,e)},$$slots:{default:!0}});var O=a(R,2);i(O,{children:(r,l)=>{var e=ce();o(r,e)},$$slots:{default:!0}});var I=a(O,2);i(I,{children:(r,l)=>{var e=de(),t=d(e),n=g(t);p(n,"src",`${c??""}/puisvg/prez_stroke_and_arc.svg`),v(t),m(2),o(r,e)},$$slots:{default:!0}});var L=a(I,2);i(L,{children:(r,l)=>{var e=me(),t=d(e),n=g(t);p(n,"src",`${c??""}/puisvg/prez_absolute_relative.svg`),v(t),m(2),o(r,e)},$$slots:{default:!0}});var T=a(L,2);i(T,{children:(r,l)=>{var e=ge(),t=d(e),n=g(t);p(n,"src",`${c??""}/puisvg/prez_arcs.svg`),v(t),m(2),o(r,e)},$$slots:{default:!0}});var j=a(T,2);i(j,{children:(r,l)=>{var e=ve(),t=d(e),n=g(t);p(n,"src",`${c??""}/puisvg/prez_curve_approximation.svg`),v(t),m(2),o(r,e)},$$slots:{default:!0}});var E=a(j,2);i(E,{children:(r,l)=>{var e=_e(),t=d(e),n=g(t);p(n,"src",`${c??""}/puisvg/prez_corner_modifications.svg`),v(t),m(2),o(r,e)},$$slots:{default:!0}});var J=a(E,2);i(J,{children:(r,l)=>{var e=ue(),t=d(e),n=g(t);p(n,"src",`${c??""}/puisvg/prez_design_structure.svg`);var _=a(n,2);p(_,"src",`${c??""}/puisvg/prez_figure_layers.svg`),v(t),m(2),o(r,e)},$$slots:{default:!0}});var U=a(J,2);i(U,{children:(r,l)=>{var e=fe(),t=d(e),n=g(t);p(n,"src",`${c??""}/puisvg/prez_extrudes.svg`),v(t);var _=a(t,4),u=g(_);p(u,"src",`${c??""}/puisvg/prez_boolean_operations.svg`),v(_),o(r,e)},$$slots:{default:!0}});var W=a(U,2);i(W,{children:(r,l)=>{var e=$e();o(r,e)},$$slots:{default:!0}});var F=a(W,2);i(F,{children:(r,l)=>{var e=he();o(r,e)},$$slots:{default:!0}});var N=a(F,2);i(N,{children:(r,l)=>{var e=ye();m(2),o(r,e)},$$slots:{default:!0}}),o(K,$)},$$slots:{default:!0}}),o(B,f)}export{Se as component};
