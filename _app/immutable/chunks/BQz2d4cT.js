import{a1 as I,a2 as N,a3 as U,B as A,X as $,a4 as B,z as f,a5 as j,$ as z,_ as C,a6 as G,x as D,a7 as y,a8 as V,S as T,a9 as q,a0 as X,aa as Z,ab as F,ac as L,ad as d,ae as H}from"./BpGvNLVx.js";let P=!1;function J(e){var r=P;try{return P=!1,[e(),P]}finally{P=r}}const Q={get(e,r){if(!e.exclude.includes(r))return f(e.version),r in e.special?e.special[r]():e.props[r]},set(e,r,n){return r in e.special||(e.special[r]=k({get[r](){return e.props[r]}},r,B)),e.special[r](n),L(e.version),!0},getOwnPropertyDescriptor(e,r){if(!e.exclude.includes(r)&&r in e.props)return{enumerable:!0,configurable:!0,value:e.props[r]}},deleteProperty(e,r){return e.exclude.includes(r)||(e.exclude.push(r),L(e.version)),!0},has(e,r){return e.exclude.includes(r)?!1:r in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(r=>!e.exclude.includes(r))}};function re(e,r){return new Proxy({props:e,exclude:r,special:{},version:y(0)},Q)}const W={get(e,r){let n=e.props.length;for(;n--;){let s=e.props[n];if(d(s)&&(s=s()),typeof s=="object"&&s!==null&&r in s)return s[r]}},set(e,r,n){let s=e.props.length;for(;s--;){let u=e.props[s];d(u)&&(u=u());const t=I(u,r);if(t&&t.set)return t.set(n),!0}return!1},getOwnPropertyDescriptor(e,r){let n=e.props.length;for(;n--;){let s=e.props[n];if(d(s)&&(s=s()),typeof s=="object"&&s!==null&&r in s){const u=I(s,r);return u&&!u.configurable&&(u.configurable=!0),u}}},has(e,r){if(r===T||r===q)return!1;for(let n of e.props)if(d(n)&&(n=n()),n!=null&&r in n)return!0;return!1},ownKeys(e){const r=[];for(let n of e.props){d(n)&&(n=n());for(const s in n)r.includes(s)||r.push(s)}return r}};function ne(...e){return new Proxy({props:e},W)}function g(e){var r;return((r=e.ctx)==null?void 0:r.d)??!1}function k(e,r,n,s){var E;var u=(n&F)!==0,t=!X||(n&Z)!==0,v=(n&V)!==0,Y=(n&H)!==0,m=!1,o;v?[o,m]=J(()=>e[r]):o=e[r];var K=T in e||q in e,_=v&&(((E=I(e,r))==null?void 0:E.set)??(K&&r in e&&(i=>e[r]=i)))||void 0,l=s,h=!0,b=!1,O=()=>(b=!0,h&&(h=!1,Y?l=D(s):l=s),l);o===void 0&&s!==void 0&&(_&&t&&N(),o=O(),_&&_(o));var c;if(t)c=()=>{var i=e[r];return i===void 0?O():(h=!0,b=!1,i)};else{var R=(u?A:$)(()=>e[r]);R.f|=U,c=()=>{var i=f(R);return i!==void 0&&(l=void 0),i===void 0?l:i}}if((n&B)===0)return c;if(_){var M=e.$$legacy;return function(i,p){return arguments.length>0?((!t||!p||M||m)&&_(p?c():i),i):c()}}var S=!1,x=G(o),a=A(()=>{var i=c(),p=f(x);return S?(S=!1,p):x.v=i});return v&&f(a),u||(a.equals=j),function(i,p){if(arguments.length>0){const w=p?f(a):t&&v?z(i):i;if(!a.equals(w)){if(S=!0,C(x,w),b&&l!==void 0&&(l=w),g(a))return i;D(()=>f(a))}return i}return g(a)?a.v:f(a)}}export{re as l,k as p,ne as s};
