import{t as s,a as o}from"../chunks/CgUf_VYr.js";import"../chunks/DGNNm5iU.js";import{s as t,f as m,c as d,r as v,n as g}from"../chunks/BPkFIFRv.js";import{s as c}from"../chunks/zRrU-lnv.js";import{b as l}from"../chunks/BAWUjBHS.js";import{C as X,O as i}from"../chunks/BS_1G-H3.js";var q=s('<center><img style="width: 9em;" alt="Parametrix logo"></center> <div><pre style="font-size:2.5em; margin:0;">Parametrix</pre> <center><i style="color: lightSkyBlue;">Geometrix</i>&nbsp;<i style="color: pink;">Designix</i></center></div>',1),V=s('<pre style="font-size:2.5em; margin:0;">Parametrix</pre> <pre style="margin:0;">CAD as code for open-hardware</pre> <pre style="margin:0;">a JavaScript solution for creating 3D shapes</pre>',1),Y=s('<img style="width: 16em;" alt="screenshot of a gear"> <img style="width: 16em;" alt="screenshot of the heliostat rake">',1),Z=s('<p><img style="height: 9em;" alt="screenshot of a cabane"> <img style="width: 9em;" alt="screenshot of a doorstop"></p> <p><img style="width: 9em;" alt="screenshot of a trapeze"> <img style="width: 9em;" alt="screenshot of a reinforced tube"></p> <p></p>',1),ee=s(`<pre style="font-size:1.5em; margin:0;">Parametrix workflow</pre> <img style="height: 9em;" alt="prez_parametrix_vs_classic_workflow"> <pre>Simplistic approach:
- contour centric (i.e. 2.5D)
  - cost efficient manufacturing process are 2D
  - robust mechanisms are 2D
- no long workflow chain
		</pre>`,1),re=s('<pre style="font-size:2em; margin:0;">Generate 3D files</pre> <img style="height: 9em;" alt="cad_flow_with_parametrix.svg"> <pre style="margin:0;">&gt; a JavaScript solution for creating 3D shapes</pre> <pre style="margin:0;">&gt; a frontend that abstract the CAD solution</pre> <pre style="margin:0;">&gt; a generator of WebUI for parametrizing your designs</pre>',1),ae=s(`<pre class="smaller svelte-7e5ith">Parametrix main advantages:

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
		</pre>`),te=s('<img style="width: 28em;" alt="Parametrix described in condensed"> <p style="text-align:center; margin: 0.5rem">Parametrix in condensed</p>',1),oe=s(`/ <pre>framework / eco-system : Parametrix

          core library : Geometrix

      design-libraries : Designix, Desi78, Desi82, ...
		</pre>`,1),se=s(`<pre>Go through the design-UI
		</pre>`),ne=s('<img style="width: 28em;" alt="designer and maker">'),ie=s(`<center><img style="width: 14em;" alt="3D shape subsets"></center> <pre>The Geometrix API for designing a 3D shape
		</pre>`,1),pe=s(`<pre>The Geometrix API in a nutshell
		</pre>`),ce=s(`<p><span style="font-size:2em">Code example</span> <img style="height: 7em; vertical-align: middle" alt="codeExample1_contour.svg"></p> <pre style="font-size:0.8em; padding-right: 5em">const ctr1 = contour(0, 0)
	.addSegStrokeR(param.L2, 0)
	.addSegStrokeRP(a3, param.L3)
	.addPointAP(a4, param.L4)
	.addSegArc(param.R34, true, true)
	.addCornerRounded(param.R4)
	.addPointA(0, param.L5)
	.addSegArc3(a5, false)
	.closeSegStroke();
		</pre>`,1),le=s(`<pre>3 types of parameters
- number
- checkbox (i.e. boolean)
- dropdown (i.e. enum)
		</pre>`),me=s(`<center><img style="width: 9em;" alt="stroke and arcs"></center> <pre>Create contour with:
- strokes
- arcs of circles

Optimal for generating G-code
		</pre>`,1),ge=s(`<center><img style="width: 22em;" alt="absolute relative cartesian polar"></center> <pre>Next destination-point in contour-definition:
- Cartesian or Polar
- Relative or Absolute
		</pre>`,1),de=s(`<center><img style="width: 22em;" alt="three ways for defining arcs"></center> <pre>3 options for defining an arc of circle:
- radius with large/small and ccw/cw
- intermediate point
- tangent at the begining or the end
		</pre>`,1),ve=s(`<center><img style="width: 22em;" alt="curve approximation"></center> <pre>Complex curve approximation:
Double arcs defined with start and end tangents
		</pre>`,1),_e=s(`<center><img style="width: 15em;" alt="corner modifications"></center> <pre>Corner rework:
- Rounded
- Widened
- WideAcc
		</pre>`,1),he=s(`<center><img style="width: 14em;" alt="design structure">&nbsp;<img style="width: 10em;" alt="figure layers"></center> <pre>- Define a list of figures
- Attach the contours to figures
    - as main, second or dynamics
		</pre>`,1),fe=s(`<center><img style="width: 12em;" alt="extrudes"></center> <pre style="margin: 0.5em;">Define the 3D shape
- Extrude figures as LinearOrtho or Rotate
- Rotate, translate and combine sub-element
    - Union
    - Intersection
    - Substraction</pre> <center><img style="width: 16em;" alt="boolean operations"></center>`,1),ue=s(`<pre>Parametrix generates 3D scripts for:
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
		</pre>`),$e=s(`<pre>   End of
     the
presentation
     of
 Parametrix
		</pre>`),ye=s(`<pre style="color: orange">Ready for creating your <i>own</i> design-library?
		</pre> <pre>npm create parametrix@latest tom07
		</pre>`,1),Pe=s("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1),we=s('<h1 class="svelte-7e5ith">Prez of Parametrix</h1> <!>',1);function Se(B){var f=we(),H=t(m(f),2);X(H,{children:(K,xe)=>{var u=Pe(),$=m(u);i($,{children:(r,p)=>{var e=q(),a=m(e),n=d(a);c(n,"src",`${l??""}/favicon.svg`),v(a),g(2),o(r,e)}});var y=t($,2);i(y,{children:(r,p)=>{var e=V();g(4),o(r,e)}});var P=t(y,2);i(P,{children:(r,p)=>{var e=Y(),a=m(e);c(a,"src",`${l??""}/screen_gear.png`);var n=t(a,2);c(n,"src",`${l??""}/screen_helio_rake.png`),o(r,e)}});var w=t(P,2);i(w,{children:(r,p)=>{var e=Z(),a=m(e),n=d(a);c(n,"src",`${l??""}/screen_cabane.png`);var _=t(n,2);c(_,"src",`${l??""}/screen_doorstop.png`),v(a);var h=t(a,2),M=d(h);c(M,"src",`${l??""}/screen_trapeze.png`);var Q=t(M,2);c(Q,"src",`${l??""}/screen_reinforced_tube.png`),v(h),g(2),o(r,e)}});var x=t(w,2);i(x,{children:(r,p)=>{var e=ee(),a=t(m(e),2);c(a,"src",`${l??""}/puisvg/prez_parametrix_vs_classic_workflow.svg`),g(2),o(r,e)}});var b=t(x,2);i(b,{children:(r,p)=>{var e=re(),a=t(m(e),2);c(a,"src",`${l??""}/puisvg/cad_flow_with_parametrix.svg`),g(6),o(r,e)}});var D=t(b,2);i(D,{children:(r,p)=>{var e=ae();o(r,e)}});var z=t(D,2);i(z,{children:(r,p)=>{var e=te(),a=m(e);c(a,"src",`${l??""}/puisvg/prez_parametrix_condensed.svg`),g(2),o(r,e)}});var C=t(z,2);i(C,{children:(r,p)=>{g();var e=oe();g(),o(r,e)}});var k=t(C,2);i(k,{children:(r,p)=>{var e=se();o(r,e)}});var A=t(k,2);i(A,{children:(r,p)=>{var e=ne();c(e,"src",`${l??""}/puisvg/concept_of_webapp_generator.svg`),o(r,e)}});var S=t(A,2);i(S,{children:(r,p)=>{var e=ie(),a=m(e),n=d(a);c(n,"src",`${l??""}/puisvg/parametrix_3D_shape_subset.svg`),v(a),g(2),o(r,e)}});var G=t(S,2);i(G,{children:(r,p)=>{var e=pe();o(r,e)}});var R=t(G,2);i(R,{children:(r,p)=>{var e=ce(),a=m(e),n=t(d(a),2);c(n,"src",`${l??""}/puisvg/codeExample1_contour.svg`),v(a),g(2),o(r,e)}});var O=t(R,2);i(O,{children:(r,p)=>{var e=le();o(r,e)}});var I=t(O,2);i(I,{children:(r,p)=>{var e=me(),a=m(e),n=d(a);c(n,"src",`${l??""}/puisvg/prez_stroke_and_arc.svg`),v(a),g(2),o(r,e)}});var L=t(I,2);i(L,{children:(r,p)=>{var e=ge(),a=m(e),n=d(a);c(n,"src",`${l??""}/puisvg/prez_absolute_relative.svg`),v(a),g(2),o(r,e)}});var T=t(L,2);i(T,{children:(r,p)=>{var e=de(),a=m(e),n=d(a);c(n,"src",`${l??""}/puisvg/prez_arcs.svg`),v(a),g(2),o(r,e)}});var j=t(T,2);i(j,{children:(r,p)=>{var e=ve(),a=m(e),n=d(a);c(n,"src",`${l??""}/puisvg/prez_curve_approximation.svg`),v(a),g(2),o(r,e)}});var E=t(j,2);i(E,{children:(r,p)=>{var e=_e(),a=m(e),n=d(a);c(n,"src",`${l??""}/puisvg/prez_corner_modifications.svg`),v(a),g(2),o(r,e)}});var J=t(E,2);i(J,{children:(r,p)=>{var e=he(),a=m(e),n=d(a);c(n,"src",`${l??""}/puisvg/prez_design_structure.svg`);var _=t(n,2);c(_,"src",`${l??""}/puisvg/prez_figure_layers.svg`),v(a),g(2),o(r,e)}});var U=t(J,2);i(U,{children:(r,p)=>{var e=fe(),a=m(e),n=d(a);c(n,"src",`${l??""}/puisvg/prez_extrudes.svg`),v(a);var _=t(a,4),h=d(_);c(h,"src",`${l??""}/puisvg/prez_boolean_operations.svg`),v(_),o(r,e)}});var W=t(U,2);i(W,{children:(r,p)=>{var e=ue();o(r,e)}});var F=t(W,2);i(F,{children:(r,p)=>{var e=$e();o(r,e)}});var N=t(F,2);i(N,{children:(r,p)=>{var e=ye();g(2),o(r,e)}}),o(K,u)},$$slots:{default:!0}}),o(B,f)}export{Se as component};
