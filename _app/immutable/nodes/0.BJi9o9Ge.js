import{s as U,n as G,c as Q,e as W,u as X,g as Y,f as ee}from"../chunks/scheduler.B5UvdKru.js";import{S as F,i as J,e as _,s as C,y as z,c as p,a as v,d as c,f as L,z as H,A as V,o as a,g as K,h as r,u as te,v as ae,w as se,n as P,l as R,x as re}from"../chunks/index.BR0z87oj.js";import{p as le}from"../chunks/stores.DPWVulto.js";const ne=!0,_e=Object.freeze(Object.defineProperty({__proto__:null,prerender:ne},Symbol.toStringTag,{value:"Module"}));function oe(u){let e,o,d,s,l,m,i,t,n,f,j="Home",A,B,g,y,T="Gallery",I,D,$,E,S,w,N='<a href="https://github.com/sveltejs/kit" class="svelte-1wabylr"></a>';return{c(){e=_("header"),o=_("div"),d=C(),s=_("nav"),l=z("svg"),m=z("path"),i=C(),t=_("ul"),n=_("li"),f=_("a"),f.textContent=j,B=C(),g=_("li"),y=_("a"),y.textContent=T,D=C(),$=z("svg"),E=z("path"),S=C(),w=_("div"),w.innerHTML=N,this.h()},l(b){e=p(b,"HEADER",{class:!0});var h=v(e);o=p(h,"DIV",{class:!0}),v(o).forEach(c),d=L(h),s=p(h,"NAV",{class:!0});var x=v(s);l=H(x,"svg",{viewBox:!0,"aria-hidden":!0,class:!0});var O=v(l);m=H(O,"path",{d:!0,class:!0}),v(m).forEach(c),O.forEach(c),i=L(x),t=p(x,"UL",{class:!0});var M=v(t);n=p(M,"LI",{class:!0,"aria-current":!0});var Z=v(n);f=p(Z,"A",{href:!0,class:!0,"data-svelte-h":!0}),V(f)!=="svelte-5a0zws"&&(f.textContent=j),Z.forEach(c),B=L(M),g=p(M,"LI",{class:!0,"aria-current":!0});var k=v(g);y=p(k,"A",{href:!0,class:!0,"data-svelte-h":!0}),V(y)!=="svelte-1fe9zfn"&&(y.textContent=T),k.forEach(c),M.forEach(c),D=L(x),$=H(x,"svg",{viewBox:!0,"aria-hidden":!0,class:!0});var q=v($);E=H(q,"path",{d:!0,class:!0}),v(E).forEach(c),q.forEach(c),x.forEach(c),S=L(h),w=p(h,"DIV",{class:!0,"data-svelte-h":!0}),V(w)!=="svelte-nzvnes"&&(w.innerHTML=N),h.forEach(c),this.h()},h(){a(o,"class","corner svelte-1wabylr"),a(m,"d","M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"),a(m,"class","svelte-1wabylr"),a(l,"viewBox","0 0 2 3"),a(l,"aria-hidden","true"),a(l,"class","svelte-1wabylr"),a(f,"href","/"),a(f,"class","svelte-1wabylr"),a(n,"class","hover:text-red-500"),a(n,"aria-current",A=u[0].url.pathname==="/"?"page":void 0),a(y,"href","/gallery"),a(y,"class","svelte-1wabylr"),a(g,"class","hover:text-red-500"),a(g,"aria-current",I=u[0].url.pathname==="/gallery"?"page":void 0),a(t,"class","svelte-1wabylr"),a(E,"d","M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"),a(E,"class","svelte-1wabylr"),a($,"viewBox","0 0 2 3"),a($,"aria-hidden","true"),a($,"class","svelte-1wabylr"),a(s,"class","svelte-1wabylr"),a(w,"class","corner svelte-1wabylr"),a(e,"class","svelte-1wabylr")},m(b,h){K(b,e,h),r(e,o),r(e,d),r(e,s),r(s,l),r(l,m),r(s,i),r(s,t),r(t,n),r(n,f),r(t,B),r(t,g),r(g,y),r(s,D),r(s,$),r($,E),r(e,S),r(e,w)},p(b,[h]){h&1&&A!==(A=b[0].url.pathname==="/"?"page":void 0)&&a(n,"aria-current",A),h&1&&I!==(I=b[0].url.pathname==="/gallery"?"page":void 0)&&a(g,"aria-current",I)},i:G,o:G,d(b){b&&c(e)}}}function ie(u,e,o){let d;return Q(u,le,s=>o(0,d=s)),[d]}class ce extends F{constructor(e){super(),J(this,e,ie,oe,U,{})}}function ue(u){let e,o,d,s,l;o=new ce({});const m=u[1].default,i=W(m,u,u[0],null);return{c(){e=_("div"),te(o.$$.fragment),d=C(),s=_("main"),i&&i.c(),this.h()},l(t){e=p(t,"DIV",{class:!0});var n=v(e);ae(o.$$.fragment,n),d=L(n),s=p(n,"MAIN",{});var f=v(s);i&&i.l(f),f.forEach(c),n.forEach(c),this.h()},h(){a(e,"class","app h-screen")},m(t,n){K(t,e,n),se(o,e,null),r(e,d),r(e,s),i&&i.m(s,null),l=!0},p(t,[n]){i&&i.p&&(!l||n&1)&&X(i,m,t,t[0],l?ee(m,t[0],n,null):Y(t[0]),null)},i(t){l||(P(o.$$.fragment,t),P(i,t),l=!0)},o(t){R(o.$$.fragment,t),R(i,t),l=!1},d(t){t&&c(e),re(o),i&&i.d(t)}}}function de(u,e,o){let{$$slots:d={},$$scope:s}=e;return u.$$set=l=>{"$$scope"in l&&o(0,s=l.$$scope)},[s,d]}class pe extends F{constructor(e){super(),J(this,e,de,ue,U,{})}}export{pe as component,_e as universal};
