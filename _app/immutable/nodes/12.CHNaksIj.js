import{t as x,a as L}from"../chunks/CdXdjEuC.js";import"../chunks/BQ5ZQWJk.js";import{f as N,s as e,c as o,r as n}from"../chunks/BpGvNLVx.js";import{h as g}from"../chunks/BjTlqUmQ.js";import{s as t}from"../chunks/BydJrRLx.js";import{l as j,s as q}from"../chunks/BQz2d4cT.js";import{D}from"../chunks/C2b0Tnvk.js";import{b as i}from"../chunks/DDl7jv9f.js";const b={title:"Involute of circle",category:"documentation"},{title:F,category:U}=b;var S=x('<h1></h1> <h2>Definition of an involute of circle</h2> <p>An <em>involute of circle</em> is the curve drawn by the extremity of a string rolled out from a <em>base circle</em>. The shape of an involute depends only on the size of the <em>base circle</em> (i.e. its radius). An <em>involute of circle</em> is completely defined with the radius of the <em>base circle</em> and the angle of the start position.</p> <p><img alt="involute_of_circle_R0.svg"> <img alt="negative_involute_of_circle_R0.svg"></p> <pre class="language-undefined"><!></pre> <p>So we can calculate directly (with a formula):</p> <ul><li>With u, we get L and w</li> <li>With L, we get u and then w</li> <li>With w, we can not get u directly. We can only approximate it iteratively</li></ul> <p>The curve of the <em>involute of circle</em> can be described with <em>polar coordinates</em> as a <em>parametric function</em>:</p> <pre class="language-undefined"><!></pre> <h2>Properties of an involute of circle</h2> <p><img alt="involute_of_circle_Ri1_u0.svg"> <img alt="involute_of_circle_Ri2_u2.svg"></p> <pre class="language-undefined"><!></pre> <p>For any initial angle i1 of an <em>involute of circle</em>, we construct the line called <em>line of action</em> or <em>line of pressure</em> going through B, the first point of the involute at the initial position i1 and the angle of inclination i1 - PI / 2. With those definitions we have those results:</p> <ul><li>The angle of inclination of the tangent of B is i1</li> <li>For any rotation of angle j, it exists a point C at the intersection of the involute and the <em>line of action</em></li> <li>The angle of inclination of the tangent of C is i1</li> <li>The distance BC is R*j</li></ul> <p>Conclusion, if we have a plan with an inclination angle i3, it will be pushed by an <em>involute of circle</em> with initial angle i3. The pressure of the involute on the plan is always along the line of inclination angle i3 - PI / 2. This line is called <em>line of pressure</em> or <em>line of action</em>. If the <em>base circle</em> of the involute rotates at a constanst <em>angular speed</em> J, then the plan is pushed at the <em>linear speed</em> RJ with R the radius of the <em>base circle</em>.</p> <h2>Contact point</h2> <p>The <em>position</em> and <em>instant speed</em> of the contact point C of an <em>involute of circle</em> with the virtual plan perpendicular to the <em>line of action</em>.</p> <p><img alt="point_c_position_and_speed_positive.svg"> <img alt="point_c_position_and_speed_negative.svg"></p> <h2>Speed ratio</h2> <p>If the first base circle rotates at the angular speed J1, the point of contact C moves at the linear speed <code>VC = J1*br1</code>. We also have <code>VC = J2*br2</code>. The counter gearwheel rotates then at the angular speed <code>J2 = VC/br2 = J1*br1/br2</code>. So the angular speed ratio is the inverse ratio of the radius of the base circles.</p> <p>In order to switch smoothly from one tooth to an other, this ratio must also be equal to <code>N1/N2</code>.</p> <p>Finaly we have <code>J2/J1 = br1/br2 = N1/N2</code>.</p> <h2>Calculation of initAngle2</h2> <p><img alt="calculation_of_initAngle2.svg"></p> <p>Recipe to calculate the initAngle2 for the right side:</p> <ul><li>Starting from <em>initAngle1</em>, the angle position of the primary point of the first tooth</li> <li>substract the angle <em>W-primary-1</em> to get the starting of the <em>involute of circle</em></li> <li>In a loop, substract the tooth angle period to get the first angle aBP for start of <em>involute of circle</em></li> <li>Compute the length lBD of the action line</li> <li>Compute the length on the action line between two contact points: <code>2*PI/N1*brr1 = 2*PI/N2*brr2</code></li> <li>Get the first start of <em>involute of circle</em> in the second gearwheel coordinate <code>lBD-aBP*brr1</code></li> <li>Get the first start of <em>involute of circle</em> of the second gearwheel</li> <li>Get the angle position of the primary point <em>initAngle2</em> of the <em>arbitrary</em> first tooth of the second gearwheel by adding the angle <em>W-primary-2</em></li></ul> <h2>Angle kitchen</h2> <p><img alt="right_side_angle_kitchen.svg"> <img alt="left_side_angle_kitchen.svg"></p>',1);function X(y,R){const $=j(R,["children","$$slots","$$events","$$legacy"]);D(y,q(()=>$,b,{children:(C,G)=>{var m=S(),d=N(m);d.textContent=F;var a=e(d,6),f=o(a);t(f,"src",`${i??""}/pgdsvg/involute_of_circle_R0.svg`);var B=e(f,2);t(B,"src",`${i??""}/pgdsvg/negative_involute_of_circle_R0.svg`),n(a);var l=e(a,2),I=o(l);g(I,()=>`<code class="language-undefined">OB=R
BC=arc(BA)=u*R
L=OC=sqrt(R**2+(u*R)**2)=R*sqrt(1+u**2)
u=v+w
v=atan(u*R/R)=atan(u) if u&lt;PI/2
w=u-v=u-atan(u)
u=sqrt((L/R)**2-1)
u=f(w)? [I don&#39;t know how to calculate analytically u from w]</code>`),n(l);var r=e(l,8),A=o(r);g(A,()=>'<code class="language-undefined">u -&gt; [L: R*sqrt(1+u**2), w: u-atan(u)]</code>'),n(r);var s=e(r,4),u=o(s);t(u,"src",`${i??""}/pgdsvg/involute_of_circle_Ri1_u0.svg`);var J=e(u,2);t(J,"src",`${i??""}/pgdsvg/involute_of_circle_Ri2_u2.svg`),n(s);var c=e(s,2),P=o(c);g(P,()=>`<code class="language-undefined">if we choose u2=-j=i1-i2, then
- C is on BF
- BC = R*u2 = -j*R = R*i1-R*i2
- dBC/dt = -R*di2/dt = R*dj/dt
- inclination of tangent in C = i1</code>`),n(c);var h=e(c,12),v=o(h);t(v,"src",`${i??""}/pgdsvg/point_c_position_and_speed_positive.svg`);var T=e(v,2);t(T,"src",`${i??""}/pgdsvg/point_c_position_and_speed_negative.svg`),n(h);var p=e(h,12),W=o(p);t(W,"src",`${i??""}/pgdsvg/calculation_of_initAngle2.svg`),n(p);var _=e(p,8),w=o(_);t(w,"src",`${i??""}/pgdsvg/right_side_angle_kitchen.svg`);var k=e(w,2);t(k,"src",`${i??""}/pgdsvg/left_side_angle_kitchen.svg`),n(_),L(C,m)},$$slots:{default:!0}}))}export{X as component};
