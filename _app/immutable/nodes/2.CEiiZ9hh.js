var ar=Object.defineProperty;var ir=(n,e,t)=>e in n?ar(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var C=(n,e,t)=>ir(n,typeof e!="symbol"?e+"":e,t);import{a as N,t as q}from"../chunks/disclose-version.qsgaW5vm.js";import"../chunks/legacy.D9xuhFao.js";import{x as or,ak as lr,at as Vt,v as L,A as qe,z as ur,J as cr,ah as Mt,al as hr,am as ct,ac as Be,w as xe,au as Fe,an as Ct,aj as Nt,ao as fr,M as dr,y as ht,av as et,aw as ft,ax as tt,ay as pr,ag as mr,az as _r,aA as gr,o as yr,ad as xr,a5 as vr,aB as wr,a2 as kr,D as dt,aC as br,aa as Sr,aD as Tr,I as pt,aE as Ar,aF as zr,aG as Er,L as qt,K as Bt,p as me,j as _e,g as w,aH as $,F as H,t as J,aI as Ir,m as z,k as E,l as T,aJ as Ye,b as R,aK as Pe,i as Fr}from"../chunks/runtime.CnSOjh2c.js";import{i as Pr,o as Ur,b as Vr,p as Rt}from"../chunks/index-client.NmoDlnGE.js";import{i as ge}from"../chunks/lifecycle.Cg5HP38S.js";import{d as Mr,l as rt,s as Ne,e as nt,b as de,f as j,a as $e,g as ce}from"../chunks/store.BNwb5E5Z.js";import{w as Se}from"../chunks/index.ZHgrirAJ.js";function He(n,e){return e}function Cr(n,e,t,r){for(var s=[],i=e.length,o=0;o<i;o++)pr(e[o].e,s,!0);var h=i>0&&s.length===0&&t!==null;if(h){var f=t.parentNode;mr(f),f.append(t),r.clear(),ee(n,e[0].prev,e[i-1].next)}_r(s,()=>{for(var d=0;d<i;d++){var p=e[d];h||(r.delete(p.k),ee(n,p.prev,p.next)),gr(p.e,!h)}})}function Xe(n,e,t,r,s,i=null){var o=n,h={flags:e,items:new Map,first:null},f=(e&Vt)!==0;if(f){var d=n;o=L?qe(yr(d)):d.appendChild(or())}L&&ur();var p=null,_=!1;lr(()=>{var m=t(),y=cr(m)?m:m==null?[]:Mt(m),g=y.length;if(_&&g===0)return;_=g===0;let S=!1;if(L){var v=o.data===hr;v!==(g===0)&&(o=ct(),qe(o),Be(!1),S=!0)}if(L){for(var I=null,U,P=0;P<g;P++){if(xe.nodeType===8&&xe.data===xr){o=xe,S=!0,Be(!1);break}var k=y[P],x=r(k,P);U=Lt(xe,h,I,null,k,x,P,s,e),h.items.set(x,U),I=U}g>0&&qe(ct())}if(!L){var X=vr;Nr(y,h,o,s,e,(X.f&Fe)!==0,r)}i!==null&&(g===0?p?Ct(p):p=Nt(()=>i(o)):p!==null&&fr(p,()=>{p=null})),S&&Be(!0),t()}),L&&(o=xe)}function Nr(n,e,t,r,s,i,o){var B,re,Ae,lt;var h=(s&wr)!==0,f=(s&(et|tt))!==0,d=n.length,p=e.items,_=e.first,m=_,y,g=null,S,v=[],I=[],U,P,k,x;if(h)for(x=0;x<d;x+=1)U=n[x],P=o(U,x),k=p.get(P),k!==void 0&&((B=k.a)==null||B.measure(),(S??(S=new Set)).add(k));for(x=0;x<d;x+=1){if(U=n[x],P=o(U,x),k=p.get(P),k===void 0){var X=m?m.e.nodes_start:t;g=Lt(X,e,g,g===null?e.first:g.next,U,P,x,r,s),p.set(P,g),v=[],I=[],m=g.next;continue}if(f&&qr(k,U,x,s),k.e.f&Fe&&(Ct(k.e),h&&((re=k.a)==null||re.unfix(),(S??(S=new Set)).delete(k))),k!==m){if(y!==void 0&&y.has(k)){if(v.length<I.length){var ie=I[0],W;g=ie.prev;var Te=v[0],oe=v[v.length-1];for(W=0;W<v.length;W+=1)mt(v[W],ie,t);for(W=0;W<I.length;W+=1)y.delete(I[W]);ee(e,Te.prev,oe.next),ee(e,g,Te),ee(e,oe,ie),m=ie,g=oe,x-=1,v=[],I=[]}else y.delete(k),mt(k,m,t),ee(e,k.prev,k.next),ee(e,k,g===null?e.first:g.next),ee(e,g,k),g=k;continue}for(v=[],I=[];m!==null&&m.k!==P;)(i||!(m.e.f&Fe))&&(y??(y=new Set)).add(m),I.push(m),m=m.next;if(m===null)continue;k=m}v.push(k),g=k,m=k.next}if(m!==null||y!==void 0){for(var A=y===void 0?[]:Mt(y);m!==null;)(i||!(m.e.f&Fe))&&A.push(m),m=m.next;var M=A.length;if(M>0){var D=s&Vt&&d===0?t:null;if(h){for(x=0;x<M;x+=1)(Ae=A[x].a)==null||Ae.measure();for(x=0;x<M;x+=1)(lt=A[x].a)==null||lt.fix()}Cr(e,A,D,p)}}h&&dr(()=>{var ut;if(S!==void 0)for(k of S)(ut=k.a)==null||ut.apply()}),ht.first=e.first&&e.first.e,ht.last=g&&g.e}function qr(n,e,t,r){r&et&&ft(n.v,e),r&tt?ft(n.i,t):n.i=t}function Lt(n,e,t,r,s,i,o,h,f){var d=(f&et)!==0,p=(f&br)===0,_=d?p?kr(s):dt(s):s,m=f&tt?dt(o):o,y={i:m,v:_,k:i,a:null,e:null,prev:t,next:r};try{return y.e=Nt(()=>h(n,_,m),L),y.e.prev=t&&t.e,y.e.next=r&&r.e,t===null?e.first=y:(t.next=y,t.e.next=y.e),r!==null&&(r.prev=y,r.e.prev=y.e),y}finally{}}function mt(n,e,t){for(var r=n.next?n.next.e.nodes_start:t,s=e?e.e.nodes_start:t,i=n.e.nodes_start;i!==r;){var o=Sr(i);s.before(i),i=o}}function ee(n,e,t){e===null?n.first=t:(e.next=t,e.e.next=t&&t.e),t!==null&&(t.prev=e,t.e.prev=e&&e.e)}function K(n){if(L){var e=!1,t=()=>{if(!e){if(e=!0,n.hasAttribute("value")){var r=n.value;te(n,"value",null),n.value=r}if(n.hasAttribute("checked")){var s=n.checked;te(n,"checked",null),n.checked=s}}};n.__on_r=t,zr(t),Mr()}}function te(n,e,t,r){var s=n.__attributes??(n.__attributes={});L&&(s[e]=n.getAttribute(e),e==="src"||e==="srcset"||e==="href"&&n.nodeName==="LINK")||s[e]!==(s[e]=t)&&(e==="style"&&"__styles"in n&&(n.__styles={}),e==="loading"&&(n[Tr]=t),t==null?n.removeAttribute(e):typeof t!="string"&&Br(n).includes(e)?n[e]=t:n.setAttribute(e,t))}var _t=new Map;function Br(n){var e=_t.get(n.nodeName);if(e)return e;_t.set(n.nodeName,e=[]);for(var t,r=pt(n),s=Element.prototype;s!==r;){t=Ar(r);for(var i in t)t[i].set&&e.push(i);r=pt(r)}return e}function gt(n,e){var t=n.__className,r=e;L&&n.className===r?n.__className=r:(t!==r||L&&n.className!==r)&&(n.className=r,n.__className=r)}function Ue(n,e,t){if(t){if(n.classList.contains(e))return;n.classList.add(e)}else{if(!n.classList.contains(e))return;n.classList.remove(e)}}function we(n,e,t=e){var r=Er();rt(n,"input",()=>{var s=Re(n)?Le(n.value):n.value;t(s),r&&s!==(s=e())&&(n.value=s??"")}),qt(()=>{var s=e();if(L&&n.defaultValue!==n.value){t(Re(n)?Le(n.value):n.value);return}Re(n)&&s===Le(n.value)||n.type==="date"&&!s&&!n.value||s!==n.value&&(n.value=s??"")})}function Ve(n,e,t=e){rt(n,"change",()=>{var r=n.checked;t(r)}),e()==null&&t(!1),qt(()=>{var r=e();n.checked=!!r})}function Re(n){var e=n.type;return e==="number"||e==="range"}function Le(n){return n===""?null:+n}function Ot(n,e,t){if(n.multiple)return Lr(n,e);for(var r of n.options){var s=ke(r);if(Pr(s,e)){r.selected=!0;return}}(!t||e!==void 0)&&(n.selectedIndex=-1)}function Rr(n,e){Bt(()=>{var t=new MutationObserver(()=>{var r=n.__value;Ot(n,r)});return t.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),()=>{t.disconnect()}})}function yt(n,e,t=e){var r=!0;rt(n,"change",()=>{var s;if(n.multiple)s=[].map.call(n.querySelectorAll(":checked"),ke);else{var i=n.querySelector(":checked");s=i&&ke(i)}t(s)}),Bt(()=>{var s=e();if(Ot(n,s,r),r&&s===void 0){var i=n.querySelector(":checked");i!==null&&(s=ke(i),t(s))}n.__value=s,r=!1}),Rr(n)}function Lr(n,e){for(var t of n.options)t.selected=~e.indexOf(ke(t))}function ke(n){return"__value"in n?n.__value:n.value}var Or=q('<div class="absolute bottom-0 right-0 flex gap-4 mb-4 mr-4"><a aria-label="Fractal Gallery" href="https://reimua.github.io/FractalGallery/" target="_blank" class="fa-solid fa-images text-4xl"></a> <a aria-label="Flames Algorithm" href="https://flam3.com/flame_draves.pdf" target="_blank" class="fa-solid fa-question text-4xl"></a> <a aria-label="Source Code" href="https://github.com/ReimuA/Fractured" target="_blank" class="fa-brands fa-github text-4xl"></a></div>');function Dr(n){var e=Or();N(n,e)}const Gr={id:0,name:"Linear"},Wr={id:1,name:"Sinusoidal"},Yr={id:2,name:"Spherical"},$r={id:3,name:"Swirl"},Hr={id:4,name:"Horseshoe"},Xr={id:5,name:"Polar"},jr={id:6,name:"Handkerchief"},Kr={id:7,name:"Heart"},Jr={id:8,name:"Disc"},Zr={id:9,name:"Spiral"},Qr={id:10,name:"Hyperbolic"},en={id:11,name:"Diamond"},tn={id:12,name:"Ex"},rn={id:13,name:"Julia"},nn={id:14,name:"Bent"},sn={id:15,name:"Waves"},an={id:16,name:"Fishe eye"},on={id:17,name:"Exponential"},ln={id:18,name:"Power"},un={id:19,name:"Fan"},cn={id:20,name:"Square"},st=[Gr,Wr,Yr,$r,Hr,Xr,jr,Kr,Jr,Zr,Qr,en,tn,rn,nn,sn,an,on,ln,un,cn],hn=n=>st.find(e=>e.name==n),at="Heatmap",fn="Structural",dn="Structural (Palette)",pn="Structural (Palette index)",mn=[at,fn,dn,pn];function _n(n){switch(n){case"Heatmap":return 0;case"Structural":return 1;case"Structural (Palette)":return 2;case"Structural (Palette index)":return 3}}function gn(n,e,t,r,s,i){return{a:n,b:e,c:t,d:r,e:s,f:i}}const yn={a:{x:.5,y:.5,z:.5},b:{x:.5,y:.5,z:.5},c:{x:1,y:1,z:1},d:{x:0,y:.333,z:.667}},xn={a:{x:0,y:.5,z:.5},b:{x:0,y:.5,z:.5},c:{x:0,y:.5,z:.333},d:{x:0,y:.5,z:.667}},vn={a:{x:0,y:.5,z:.5},b:{x:0,y:.5,z:.5},c:{x:0,y:.333,z:.5},d:{x:0,y:.667,z:.5}},wn={a:{x:.667,y:.5,z:.5},b:{x:.5,y:.667,z:.5},c:{x:.667,y:.666,z:.5},d:{x:.2,y:0,z:.5}},kn={a:{x:.5,y:.5,z:0},b:{x:.5,y:.5,z:0},c:{x:.5,y:.5,z:0},d:{x:.5,y:0,z:0}},bn={a:{x:.5,y:.5,z:.5},b:{x:.5,y:.5,z:.5},c:{x:.8,y:.8,z:.5},d:{x:0,y:.2,z:.5}},Sn={a:{x:.5,y:0,z:.5},b:{x:.5,y:0,z:.5},c:{x:.5,y:0,z:.5},d:{x:0,y:0,z:.5}},Tn={a:{x:1,y:.5,z:.5},b:{x:.5,y:.5,z:.5},c:{x:.75,y:1,z:.667},d:{x:.8,y:1,z:.333}},An={a:{x:.5,y:.5,z:0},b:{x:.5,y:.5,z:0},c:{x:.1,y:.5,z:0},d:{x:0,y:0,z:0}},zn={a:{x:.5,y:0,z:.5},b:{x:.5,y:0,z:.5},c:{x:.5,y:0,z:.333},d:{x:.5,y:0,z:.667}},En={a:{x:.168,y:-.002,z:0},b:{x:.918,y:.968,z:0},c:{x:.338,y:.5,z:0},d:{x:-.252,y:.468,z:0}},In={a:{x:.518,y:.558,z:.108},b:{x:.408,y:.628,z:.048},c:{x:.288,y:.288,z:-.562},d:{x:.448,y:-.312,z:-1.342}},Dt=[{name:"Rainbow",palette:yn},{name:"Blue-Cyan",palette:xn},{name:"Blue-Magenta",palette:zn},{name:"Green",palette:In},{name:"Green-Cyan",palette:vn},{name:"Green-Magenta",palette:wn},{name:"Green-Red",palette:kn},{name:"Orange-Blue",palette:bn},{name:"Fire",palette:En},{name:"Red-Blue",palette:Sn},{name:"Yellow-Magenta-Cyan",palette:Tn},{name:"Yellow-Red",palette:An}];function Oe(n){return function(){n|=0,n=n+2654435769|0;let e=n^n>>>16;return e=Math.imul(e,569420461),e=e^e>>>15,e=Math.imul(e,1935289751),((e=e^e>>>15)>>>0)/4294967296}}class Gt{constructor(){C(this,"resolution",{x:1920,y:1080});C(this,"antialiasing",!1);C(this,"gammaCorrection",.454545);C(this,"densityEstimation",null);C(this,"renderMode",at);C(this,"colorPalette",Dt[1]);C(this,"spaceWarp",{rotationalSymmetry:3,mirrorX:!1,mirrorY:!1,zoom:1});C(this,"seed",0);C(this,"prng",Oe(0));C(this,"componentsNumberRange",{min:4,max:4});C(this,"variationsNumberRange",{min:4,max:14});C(this,"variationsPools",[])}withResolution(e){return this.resolution=e,this}withVariations(e){return this.variationsPools=e,this}withRendermode(e){return this.renderMode=e,this}withNamedPalette(e){return this.colorPalette=e,this}withSpaceWarp(e){return this.spaceWarp=e,this}withSuperSampleRatio(e){return this.antialiasing=e,this}withComponentsNumberRange(e){return this.componentsNumberRange=e,this}withDensityEstimation(e){return this.densityEstimation=e,this}withVariationsNumberRange(e){return this.variationsNumberRange=e,this}withgammaCorrection(e){return this.gammaCorrection=e,this}inferParameterFromFlames(e){return this.resolution=e.resolution,this.antialiasing=e.antialiasing,this.gammaCorrection=e.gammaCorrection,this.densityEstimation=e.densityEstimation,this.renderMode=e.renderMode,this.colorPalette=e.namedPalette,this.spaceWarp=e.spaceWarp,this}iRandom(e){return e.min===e.max?e.max:Math.floor(this.prng()*(e.max-e.min+1)+e.min)}createRandomTransform(){const e=()=>this.prng()*3-1.5;return gn(e(),e(),e(),e(),e(),e())}createRandomVariations(e,t){const r=[];for(let i=0;i<e;i++){const o=this.prng(),h=t[Math.floor(this.prng()*t.length)];r.some(f=>f.variation.name===h.name)||r.push({weight:o,variation:h})}const s=r.reduce((i,o)=>i+o.weight,0);for(const i of r)i.weight/=s;return r}createRandomFlamesComponent(e){const t=this.prng(),r=this.createRandomTransform(),s=this.iRandom(this.variationsNumberRange),i=this.createRandomVariations(s,e);return{enabled:!0,color:{r:this.prng(),g:this.prng(),b:this.prng()},colorPaletteIndex:this.prng(),weight:t,transform:r,weightedVariations:i}}createRandomFlamesComponents(e){const t=this.iRandom(this.componentsNumberRange),r=new Array(t);for(let i=0;i<t;i++)r[i]=this.createRandomFlamesComponent(e);const s=r.reduce((i,o)=>i+o.weight,0);for(const i of r)i.weight/=s;return r}buildInternal(){let e=this.variationsPools.map(t=>hn(t)).filter(t=>t!=null);return e.length===0&&(e=st),{gammaCorrection:this.gammaCorrection,densityEstimation:this.densityEstimation,resolution:this.resolution,antialiasing:this.antialiasing,renderMode:this.renderMode,namedPalette:this.colorPalette,spaceWarp:this.spaceWarp,final:this.createRandomFlamesComponent(e),components:this.createRandomFlamesComponents(e)}}pureBuild(){return this.prng=Oe(this.seed),this.buildInternal()}build(){return this.seed=Math.random()*1e7,this.prng=Oe(this.seed),this.buildInternal()}}const Wt=Se(new Gt),O=Se({flames:new Gt().build(),resetType:"full"});Wt.subscribe(n=>{const e=n.build();O.set({flames:e,resetType:"full"})});const Yt=Se(),Fn=`@group(0) @binding(0) var<storage, read_write> heatmap: array<u32>;\r
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;\r
@group(0) @binding(2) var<storage, read_write> output: array<u32>;\r
@group(0) @binding(3) var<storage, read_write> heatmapMax: u32;\r
\r
@group(1) @binding(0) var<uniform> gamma: f32;\r
@group(1) @binding(1) var<uniform> logDensity: u32;\r
\r
fn downsamplePixels(x: u32, y: u32, rowsize: u32) -> vec4<u32> {\r
    const hOffset = 1920u * 1080u;\r
    let cIdx = 3 * x + 3 * y * rowsize + hOffset;\r
\r
    let c1 = pixels[cIdx];\r
    let c2 = pixels[cIdx + 1];\r
    let c3 = pixels[cIdx + 2];\r
    let c4 = pixels[cIdx + rowsize + 0];\r
    let c5 = pixels[cIdx + rowsize + 1];\r
    let c6 = pixels[cIdx + rowsize + 2];\r
    let c7 = pixels[cIdx + 2 * rowsize + 0];\r
    let c8 = pixels[cIdx + 2 * rowsize + 1];\r
    let c9 = pixels[cIdx + 2 * rowsize + 2];\r
\r
    let arr = array<u32, 9>(c1, c2, c3, c4, c5, c6, c7, c8, c9);\r
    var res = vec4<u32>(0);\r
\r
    for (var i = 0; i < 9; i++) {\r
        res.x += (arr[i] >> 24) & 0xFF;\r
        res.y += (arr[i] >> 16) & 0xFF;\r
        res.z += (arr[i] >> 8) & 0xFF;\r
        res.w += (arr[i]) & 0xFF;\r
    }\r
\r
    res /= 9;\r
\r
    return res;\r
}\r
\r
fn downsampleHeatmap(x: u32, y: u32, rowsize: u32) -> u32 {\r
    const hOffset = 1920u * 1080u;\r
\r
    let cIdx = 3 * x + 3 * y * rowsize + hOffset;\r
\r
    return (heatmap[cIdx] + heatmap[cIdx + 1] + heatmap[cIdx + 2] + heatmap[cIdx + rowsize + 0] + heatmap[cIdx + rowsize + 1] + heatmap[cIdx + rowsize + 2] + heatmap[cIdx + 2 * rowsize + 0] + heatmap[cIdx + 2 * rowsize + 1] + heatmap[cIdx + 2 * rowsize + 2]) / 9;\r
}\r
\r
// return a rgba color, 8 bit per channel.\r
fn gammaCorrection(col: vec4<u32>, hvalue: f32) -> u32 {\r
    var fres = vec4<f32>(col);\r
    var fAlpha = 1.;\r
    var logmax = log2(f32(heatmapMax)) / log2(10.);\r
\r
    if (logDensity != 0 && hvalue != 0.) {\r
        fAlpha = clamp((log2(10. * hvalue) / log2(10.)) / logmax, 0, 1);\r
    }\r
\r
    fres /= 255.;\r
\r
    fres.w = clamp(pow(fAlpha * fres.w, gamma), 0, 1);\r
    fres.z = clamp(pow(fAlpha * fres.z, gamma), 0, 1);\r
    fres.y = clamp(pow(fAlpha * fres.y, gamma), 0, 1);\r
    fres.x = clamp(pow(fAlpha * fres.x, gamma), 0, 1);\r
\r
    fres *= 255.;\r
\r
    let res = vec4<u32>(fres);\r
    return (0xFF << 24) | (res.y << 16) | (res.z << 8) | res.w;\r
}\r
\r
@compute @workgroup_size(8, 8)\r
fn main(\r
    @builtin(workgroup_id) workgroup_id: vec3<u32>,\r
    @builtin(local_invocation_id) local_invocation_id: vec3<u32>,\r
    @builtin(global_invocation_id) global_invocation_id: vec3<u32>,\r
    @builtin(local_invocation_index) local_invocation_index: u32,\r
    @builtin(num_workgroups) num_workgroups: vec3<u32>\r
) {\r
    let x = global_invocation_id.x;\r
    let y = global_invocation_id.y;\r
    let rowsize = 3u * 1920u;\r
\r
    let res = downsamplePixels(x, y, rowsize);\r
    let hvalue = downsampleHeatmap(x, y, rowsize);\r
\r
    output[x + y * (rowsize / 3)] = gammaCorrection(res, f32(hvalue));\r
}`,$t=`@group(0) @binding(0) var<storage, read_write> heatmap: array<u32>;\r
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;\r
@group(0) @binding(2) var<storage, read_write> image: array<u32>;\r
@group(0) @binding(3) var<storage, read_write> heatmapMax: f32;\r
@group(0) @binding(4) var<storage, read_write> blurredImage: array<u32>;\r
\r
struct DensityEstimation {\r
    enabled: f32,\r
    minsigma: f32,\r
    maxsigma: f32,\r
}\r
\r
struct Rgb {\r
    r: f32,\r
    g: f32,\r
    b: f32,\r
}\r
\r
// Cosine gradient procedural palette\r
struct ColorPalette {\r
    a: vec3<f32>,\r
    b: vec3<f32>,\r
    c: vec3<f32>,\r
    d: vec3<f32>,\r
}\r
\r
// Rotation and translation matrices\r
struct IFSTransform {\r
    a: f32,\r
    b: f32,\r
    c: f32,\r
	d: f32,\r
    e: f32,\r
    f: f32,\r
}\r
\r
struct WeightedVariation {\r
    variation: u32,\r
    @size(12) weight: f32,\r
}\r
\r
struct FlamesComponent {\r
	  enabled: u32,\r
    colorPaletteIdx: f32,\r
    @size(8) weight: f32,\r
    color: Rgb,\r
    @align(16) transform: IFSTransform,\r
    @align(16) variations: array<WeightedVariation, 16>,\r
}\r
\r
struct SpaceWarp {\r
    zoom: f32,\r
    rotationalSymmetry: u32,\r
    mirrorX: u32,\r
    mirrorY: u32,\r
}\r
\r
struct Flames {\r
    resolution: vec2<u32>,\r
    gammaCorrection: f32,\r
    antialiasing: u32,\r
    renderMode: u32,\r
    @align(16) palette: ColorPalette,\r
    @align(16) spaceWarp: SpaceWarp,\r
    @align(16) densityEstimation: DensityEstimation,\r
    @align(16) finalComponent: FlamesComponent,\r
    components: array<FlamesComponent, 16>,\r
};\r
\r
@group(1) @binding(4) var<uniform> flames: Flames;\r
\r
var<private> gaussKern = array<f32, 729>();\r
\r
const e = 2.718;\r
const pi = 3.14;\r
\r
fn createKernel(sigma: f32) -> i32 {\r
    const gausskern = 3.0;\r
    let correctedSigma = max(sigma, 1e-6);\r
    var len = i32(floor(max(3.0, gausskern * correctedSigma)));\r
    if len % 2 == 0 {\r
        len += 1;\r
    }\r
\r
    let half = i32(floor(f32(len) / 2.));\r
    var total = 0.;\r
\r
    let gaussKernTotalLength = len * len;\r
\r
    for (var i = 0; i < gaussKernTotalLength; i++) {\r
        let x = i % len - half;\r
        let y = i / len - half;\r
        let exponent = pow(e, -f32(x * x + y * y) / (2. * correctedSigma * correctedSigma));\r
        let value = exponent / (2 * pi * correctedSigma * correctedSigma);\r
        gaussKern[i] = value;\r
        total += value;\r
    }\r
\r
    for (var i = 0; i < gaussKernTotalLength; i++) {\r
        gaussKern[i] /= total;\r
    }\r
\r
    return len;\r
}\r
\r
fn blur(x: i32, y: i32, len: i32) {\r
    var r = 0.;\r
    var g = 0.;\r
    var b = 0.;\r
    var ml = len / 2;\r
\r
    for (var i = 0; i < len; i++) {\r
        for (var j = 0; j < len; j++) {\r
            let current: f32 = gaussKern[i + j * len];\r
            let xOffset = (i - ml);\r
            let yOffset = j - ml;\r
\r
            if x + xOffset >= 0 && y + yOffset >= 0 {\r
                let idx = x + xOffset + (yOffset + y) * 1920;\r
                r += current * f32((image[idx] >> 0) & 0xFF);\r
                g += current * f32((image[idx] >> 8) & 0xFF);\r
                b += current * f32((image[idx] >> 16) & 0xFF);\r
            };\r
        }\r
    }\r
\r
    blurredImage[x + y * 1920] = (0xFF << 24) | (u32(b) << 16) | (u32(g) << 8) | u32(r);\r
}\r
\r
fn downsampleHeatmap(x: u32, y: u32, rowsize: u32) -> u32 {\r
    const hOffset = 1920u * 1080u;\r
    let cIdx = 3 * x + 3 * y * rowsize + hOffset;\r
\r
    return (heatmap[cIdx] + heatmap[cIdx + 1] + heatmap[cIdx + 2] + heatmap[cIdx + rowsize + 0] + heatmap[cIdx + rowsize + 1] + heatmap[cIdx + rowsize + 2] + heatmap[cIdx + 2 * rowsize + 0] + heatmap[cIdx + 2 * rowsize + 1] + heatmap[cIdx + 2 * rowsize + 2]) / 9;\r
}\r
\r
@compute @workgroup_size(8, 8)\r
fn main(\r
    @builtin(workgroup_id) workgroup_id: vec3<u32>,\r
    @builtin(local_invocation_id) local_invocation_id: vec3<u32>,\r
    @builtin(global_invocation_id) global_invocation_id: vec3<u32>,\r
    @builtin(local_invocation_index) local_invocation_index: u32,\r
    @builtin(num_workgroups) num_workgroups: vec3<u32>\r
) {\r
    let x = global_invocation_id.x;\r
    let y = global_invocation_id.y;\r
    var hvalue = heatmap[x + y * 1920u];\r
    if flames.antialiasing != 0 {\r
        hvalue = downsampleHeatmap(x, y, 1920u * 3u);\r
    }\r
\r
    let logmax = log2(heatmapMax) / log2(10.);\r
    let logcurrent = log2(f32(hvalue + 1)) / log2(10.);\r
    let t = 1 - smoothstep(0., 1., f32(hvalue) / heatmapMax); \r
    let sigma = mix(flames.densityEstimation.minsigma, flames.densityEstimation.maxsigma, t);\r
\r
    // Short circuit sigma value leading to the default gaussian kernel.\r
    if sigma < 1e-2 {\r
        blurredImage[x + y * 1920] = image[x + y * 1920u];\r
        return;\r
    }\r
\r
    let len = createKernel(flames.densityEstimation.maxsigma);\r
\r
    blur(i32(x), i32(y), len);\r
}  `,Pn=`@group(0) @binding(0) var<storage, read_write> heatmap: array<u32>;\r
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;\r
@group(0) @binding(2) var<storage, read_write> image: array<u32>;\r
@group(0) @binding(3) var<storage, read_write> heatmapMax: u32;\r
@group(0) @binding(4) var<storage, read_write> blurredImage: array<u32>;\r
\r
@group(0) @binding(5) var<storage, read_write> paletteIndexAccumulator: array<u32>;\r
@group(0) @binding(6) var<storage, read_write> colorAccumulator: array<u32>;\r
@group(0) @binding(7) var<storage, read_write> paletteAccumulator: array<u32>;\r
\r
struct DensityEstimation {\r
    enabled: f32,\r
    minsigma: f32,\r
    maxsigma: f32,\r
}\r
\r
struct Rgb {\r
    r: f32,\r
    g: f32,\r
    b: f32,\r
}\r
\r
// Cosine gradient procedural palette\r
struct ColorPalette {\r
    a: vec3<f32>,\r
    b: vec3<f32>,\r
    c: vec3<f32>,\r
    d: vec3<f32>,\r
}\r
\r
// Rotation and translation matrices\r
struct IFSTransform {\r
    a: f32,\r
    b: f32,\r
    c: f32,\r
	d: f32,\r
    e: f32,\r
    f: f32,\r
}\r
\r
struct WeightedVariation {\r
    variation: u32,\r
    @size(12) weight: f32,\r
}\r
\r
struct FlamesComponent {\r
	enabled: u32,\r
    colorPaletteIdx: f32,\r
    @size(8) weight: f32,\r
    color: Rgb,\r
    @align(16) transform: IFSTransform,\r
    @align(16) variations: array<WeightedVariation, 16>,\r
}\r
\r
struct SpaceWarp {\r
    zoom: f32,\r
    rotationalSymmetry: u32,\r
    mirrorX: u32,\r
    mirrorY: u32,\r
}\r
\r
struct Flames {\r
    resolution: vec2<u32>,\r
    gammaCorrection: f32,\r
    antialiasing: u32,\r
    renderMode: u32,\r
    @align(16) palette: ColorPalette,\r
    @align(16) spaceWarp: SpaceWarp,\r
    @align(16) densityEstimation: DensityEstimation,\r
    @align(16) finalComponent: FlamesComponent,\r
    components: array<FlamesComponent, 16>,\r
};\r
\r
@group(1) @binding(4) var<uniform> flames: Flames;\r
\r
const HEATMAP = 0u;\r
const STRUCTURAL = 1u;\r
const STRUCTURAL_PALETTE = 2u;\r
const STRUCTURAL_PALETTE_INDEX = 3u;\r
\r
fn c01(x: f32) -> f32 {\r
    return clamp(x, 0, 1);\r
}\r
\r
fn log10(n: f32) -> f32 {\r
    const log2_10: f32 = 3.321928094887362;\r
    return log2(n) / log2_10;\r
}\r
\r
fn palette(t: f32) -> vec3<f32> {\r
    let p = flames.palette;\r
    return vec3<f32>(\r
        c01(p.a.x + p.b.x * cos(6.28318 * (p.c.x * t + p.d.x))),\r
        c01(p.a.y + p.b.y * cos(6.28318 * (p.c.y * t + p.d.y))),\r
        c01(p.a.z + p.b.z * cos(6.28318 * (p.c.z * t + p.d.z))),\r
    );\r
}\r
\r
fn heatmapColoring(idx: u32) -> vec3<f32> {\r
    let hValue = heatmap[idx];\r
    if hValue == 0 {\r
        return vec3(0);\r
    }\r
\r
    let maxDensity = log2(f32(heatmapMax));\r
    let density = log2(f32(hValue));\r
    let colorIdx = density / maxDensity;\r
    return palette(colorIdx);\r
}\r
\r
fn structural(color: u32) -> vec3<f32> {\r
    let r = (color >> 16) & 0xFF;\r
    let g = (color >> 8) & 0xFF;\r
    let b = (color) & 0xFF;\r
    \r
    return vec3<f32>(\r
        f32(r),\r
        f32(g),\r
        f32(b)\r
    ).zyx;\r
}\r
\r
fn coloring(pIdx: u32, hIdx: u32) -> u32 {\r
    if (heatmap[hIdx] < 1) {\r
        return 0;\r
    }\r
\r
    let renderMode = flames.renderMode;\r
    var c: vec3<f32>;\r
    if renderMode == HEATMAP {\r
        c = heatmapColoring(hIdx) * 255.;\r
    }\r
    if renderMode == STRUCTURAL_PALETTE_INDEX {\r
        c = palette(f32(paletteIndexAccumulator[hIdx]) / 1e4)  * 255.;\r
    }\r
    if renderMode == STRUCTURAL {\r
        c = structural(colorAccumulator[hIdx]);\r
    }\r
    if renderMode == STRUCTURAL_PALETTE {\r
        c = structural(paletteAccumulator[hIdx]);\r
    }\r
\r
    let previousColor = pixels[pIdx];\r
    let c2 = vec3<f32>(\r
        f32((previousColor) & 0xFF),\r
        f32((previousColor >> 8) & 0xFF),\r
        f32((previousColor >> 16) & 0xFF)\r
    );\r
\r
    // Pixels Interpolation isn't working correctly when switching from/to antialising. Could be due to a single buffer being used now.\r
    c = mix(c2 , c, 0.15);\r
    var c255 = vec3<u32>(c);\r
\r
    return (0xFF << 24) | (u32(c255.z & 0xFF) << 16) | (u32(c255.y & 0xFF) << 8) | (u32(c255.x & 0xFF));\r
}\r
\r
@compute @workgroup_size(8, 8)\r
fn main(\r
    @builtin(workgroup_id) workgroup_id: vec3<u32>,\r
    @builtin(local_invocation_id) local_invocation_id: vec3<u32>,\r
    @builtin(global_invocation_id) global_invocation_id: vec3<u32>,\r
    @builtin(local_invocation_index) local_invocation_index: u32,\r
    @builtin(num_workgroups) num_workgroups: vec3<u32>\r
) {\r
    let x = global_invocation_id.x;\r
    let y = global_invocation_id.y;\r
\r
    if flames.antialiasing == 0 {\r
        let idx = x + y * flames.resolution.x;\r
        pixels[idx] = coloring(idx, idx);\r
        return;\r
    }\r
\r
    const hOffset = 1920u * 1080u;\r
    let rowsize = flames.resolution.x * 3u;\r
\r
    let pIdx = (x + y * rowsize) * 3u + hOffset;\r
    let hIdx = (x + y * rowsize) * 3u + hOffset;\r
\r
\r
    pixels[pIdx] = coloring(pIdx, hIdx);\r
    pixels[pIdx + 1] = coloring(pIdx + 1, hIdx + 1);\r
    pixels[pIdx + 2] = coloring(pIdx + 2, hIdx + 2);\r
    pixels[pIdx + rowsize + 0] = coloring(pIdx + rowsize + 0, hIdx + rowsize + 0);\r
    pixels[pIdx + rowsize + 1] = coloring(pIdx + rowsize + 1, hIdx + rowsize + 1);\r
    pixels[pIdx + rowsize + 2] = coloring(pIdx + rowsize + 2, hIdx + rowsize + 2);\r
    pixels[pIdx + 2 * rowsize + 0] = coloring(pIdx + 2 * rowsize + 0, hIdx + 2 * rowsize + 0);\r
    pixels[pIdx + 2 * rowsize + 1] = coloring(pIdx + 2 * rowsize + 1, hIdx + 2 * rowsize + 1);\r
    pixels[pIdx + 2 * rowsize + 2] = coloring(pIdx + 2 * rowsize + 2, hIdx + 2 * rowsize + 2);\r
}  `,Un=`@group(0) @binding(0) var<storage, read_write> heatmap: array<u32>;\r
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;\r
@group(0) @binding(2) var<storage, read_write> output: array<u32>;\r
@group(0) @binding(3) var<storage, read_write> heatmapMax: u32;\r
\r
@group(1) @binding(0) var<uniform> gamma: f32;\r
@group(1) @binding(1) var<uniform> logDensity: u32;\r
\r
// return a rgba color, 8 bit per channel.\r
fn gammaCorrection(col: vec4<u32>, hvalue: f32) -> u32 {\r
    var fres = vec4<f32>(col);\r
    var fAlpha = 1.;\r
    var logmax = log2(f32(heatmapMax)) / log2(10.);\r
\r
    if (logDensity != 0 && hvalue != 0.) {\r
        fAlpha = clamp((log2(10. * hvalue) / log2(10.)) / logmax, 0, 1);\r
    }\r
\r
    fres /= 255.;\r
\r
    fres.w = clamp(pow(fAlpha * fres.w, gamma), 0, 1);\r
    fres.z = clamp(pow(fAlpha * fres.z, gamma), 0, 1);\r
    fres.y = clamp(pow(fAlpha * fres.y, gamma), 0, 1);\r
    fres.x = clamp(pow(fAlpha * fres.x, gamma), 0, 1);\r
\r
    fres *= 255.;\r
\r
    let res = vec4<u32>(fres);\r
    return (0xFF << 24) | (res.y << 16) | (res.z << 8) | res.w;\r
}\r
\r
@compute @workgroup_size(8, 8)\r
fn main(\r
    @builtin(workgroup_id) workgroup_id: vec3<u32>,\r
    @builtin(local_invocation_id) local_invocation_id: vec3<u32>,\r
    @builtin(global_invocation_id) global_invocation_id: vec3<u32>,\r
    @builtin(local_invocation_index) local_invocation_index: u32,\r
    @builtin(num_workgroups) num_workgroups: vec3<u32>\r
) {\r
    let x = global_invocation_id.x;\r
    let y = global_invocation_id.y;\r
    let rowsize = 1920u;\r
\r
    var res = vec4<u32>(0);\r
    let pixel = pixels[x + y * rowsize];\r
    let hvalue = heatmap[x + y * rowsize];\r
\r
    res.x += (pixel >> 24) & 0xFF;\r
    res.y += (pixel >> 16) & 0xFF;\r
    res.z += (pixel >> 8) & 0xFF;\r
    res.w += (pixel) & 0xFF;\r
    \r
    output[x + y * rowsize] = gammaCorrection(res, f32(hvalue));\r
}`,Vn=`@group(0) @binding(0) var<storage, read_write> heatmap: array<atomic<u32>>;\r
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;\r
@group(0) @binding(2) var<storage, read_write> image: array<u32>;\r
@group(0) @binding(3) var<storage, read_write> heatmapMax: atomic<u32>;\r
@group(0) @binding(4) var<storage, read_write> blurredImage: array<u32>;\r
\r
@group(0) @binding(5) var<storage, read_write> paletteIndexAccumulator: array<atomic<u32>>;\r
@group(0) @binding(6) var<storage, read_write> colorAccumulator: array<atomic<u32>>;\r
@group(0) @binding(7) var<storage, read_write> paletteAccumulator: array<atomic<u32>>;\r
\r
struct DensityEstimation {\r
    enabled: f32,\r
    minsigma: f32,\r
    maxsigma: f32,\r
}\r
\r
struct Rgb {\r
    r: f32,\r
    g: f32,\r
    b: f32,\r
}\r
\r
// Cosine gradient procedural palette\r
struct ColorPalette {\r
    a: vec3<f32>,\r
    b: vec3<f32>,\r
    c: vec3<f32>,\r
    d: vec3<f32>,\r
}\r
\r
// Rotation and translation matrices\r
struct IFSTransform {\r
    a: f32,\r
    b: f32,\r
    c: f32,\r
	d: f32,\r
    e: f32,\r
    f: f32,\r
}\r
\r
struct WeightedVariation {\r
    variation: u32,\r
    @size(12) weight: f32,\r
}\r
\r
struct FlamesComponent {\r
	enabled: u32,\r
    colorPaletteIdx: f32,\r
    @size(8) weight: f32,\r
    color: Rgb,\r
    @align(16) transform: IFSTransform,\r
    @align(16) variations: array<WeightedVariation, 16>,\r
}\r
\r
struct SpaceWarp {\r
    zoom: f32,\r
    rotationalSymmetry: u32,\r
    mirrorX: u32,\r
    mirrorY: u32,\r
}\r
\r
struct Flames {\r
    resolution: vec2<u32>,\r
    gammaCorrection: f32,\r
    antialiasing: u32,\r
    renderMode: u32,\r
    @align(16) palette: ColorPalette,\r
    @align(16) spaceWarp: SpaceWarp,\r
    @align(16) densityEstimation: DensityEstimation,\r
    @align(16) finalComponent: FlamesComponent,\r
    components: array<FlamesComponent, 16>,\r
};\r
\r
@group(1) @binding(4) var<uniform> flames: Flames;\r
@group(1) @binding(5) var<uniform> timeElapsed: u32;\r
\r
const maxVariationPerComponent = 16;\r
const maxComponentPerFlames = 16;\r
const iterationPerInvocation = 1000;\r
\r
const pi = 3.1415926;\r
\r
// Local heatmap cached value, to avoid using atomic operation until the end.\r
var<private> localHeatmapMax = 0u;\r
\r
// State of the random number generator\r
var<private> seed: u32 = 0;\r
\r
// Initialize the random number generator with a seed\r
fn initRandom(newSeed: u32) {\r
    seed = newSeed;\r
}\r
\r
fn smu32() -> u32 {\r
    seed = seed + 0x9e3779b9u;\r
    var z: u32 = seed;\r
    z = (z ^ (z >> 15)) * 0x85ebca6bu;\r
    z = (z ^ (z >> 13)) * 0xc2b2ae35u;\r
    return z ^ (z >> 16);\r
}\r
\r
fn smf32() -> f32 {\r
    return abs(f32(smu32())) / abs(f32(4294967296.0));\r
}\r
\r
fn c01(x: f32) -> f32 {\r
    return clamp(x, 0, 1);\r
}\r
\r
fn rotate2d(p: vec2<f32>, offset: vec2<f32>, angle: f32) -> vec2<f32> {\r
	let x = p.x - offset.x;\r
	let y = p.y - offset.y;\r
\r
	let s = sin(angle);\r
	let c = cos(angle);\r
\r
	return vec2<f32>(\r
		x * c - s * y + offset.x,\r
		x * s + c * y + offset.y\r
    );\r
}\r
\r
fn updatePaletteAccumulator(index: u32, colorPaletteIdx: f32) {\r
    var paletteColor = palette(colorPaletteIdx);\r
    var c255 = vec3<u32>(paletteColor * 255);\r
    var colorU32 = atomicLoad(&paletteAccumulator[index]);\r
\r
    var color = vec3<u32>(\r
        colorU32 & 0xFF,\r
        (colorU32 >> 8) & 0xFF,\r
        (colorU32 >> 16) & 0xFF\r
    );\r
\r
    color += c255;\r
    color /= 2;\r
    colorU32 = (0xFF << 24) | (u32(color.z & 0xFF) << 16) | (u32(color.y & 0xFF) << 8) | (u32(color.x & 0xFF));\r
    atomicStore(&paletteAccumulator[index], colorU32);\r
}\r
\r
fn updateColorAccumulator(index: u32, newColor: vec3<f32>) {\r
    var colorU32 = atomicLoad(&colorAccumulator[index]);\r
\r
    var color = vec3<u32>(\r
        colorU32 & 0xFF,\r
        (colorU32 >> 8) & 0xFF,\r
        (colorU32 >> 16) & 0xFF\r
    );\r
\r
    color += vec3<u32>(newColor * 255);\r
    color /= 2;\r
    colorU32 = (0xFF << 24) | (u32(color.z & 0xFF) << 16) | (u32(color.y & 0xFF) << 8) | (u32(color.x & 0xFF));\r
    atomicStore(&colorAccumulator[index], colorU32);\r
}\r
\r
// Since atomic<f32> isn't allowed, we increase the range of the accumulator from 0-1 to 0-1e4 to keep some precision as a u32.\r
fn updatePaletteIndexAccumulator(index: u32, paletteIndex: f32) {\r
    var palletteIndexU32 = u32(paletteIndex * 1e4);\r
\r
    var newValue = (atomicLoad(&paletteIndexAccumulator[index]) + palletteIndexU32) / 2;\r
    atomicStore(&paletteIndexAccumulator[index], newValue);\r
}\r
\r
// See https://flam3.com/flame_draves.pdf - Appendix: Catalog of Variations\r
fn theta(p: vec2<f32>) -> f32 {\r
    return atan2(p.y, p.x);\r
}\r
\r
fn phi(p: vec2<f32>) -> f32 {\r
    return atan2(p.x, p.y);\r
}\r
\r
fn r(p: vec2<f32>) -> f32 {\r
    return length(p);\r
}\r
\r
fn omega() -> f32 {\r
     if (smf32() < 0.5) {\r
        return 0.;\r
    }\r
\r
    return pi;\r
}\r
\r
fn lambda() -> f32 {\r
    if (smf32() < 0.5) {\r
        return -1.;\r
    }\r
\r
    return 1.;\r
}\r
\r
fn psi() -> f32 {\r
    return smf32();\r
}\r
\r
fn modn(n: f32, m: f32) -> f32 {\r
	return ((n % m) + m) % m;\r
}\r
\r
fn sinusoidalVariation(p: vec2<f32>) -> vec2<f32> {\r
    return sin(p);\r
}\r
\r
fn sphericalVariation(tp: vec2<f32>) -> vec2<f32> {\r
    let r = length(tp);\r
    let r2 = r * r;\r
    return vec2<f32>(tp.x / r2, tp.y / r2);\r
}\r
\r
fn swirlVariation(tp: vec2<f32>) -> vec2<f32> {\r
    let r = length(tp);\r
    let r2 = r * r;\r
    let cos = cos(r2);\r
    let sin = sin(r2);\r
    return vec2<f32>(tp.x * sin - tp.y * cos, tp.x * cos + tp.y * sin);\r
}\r
\r
fn horseshoeVariation(p: vec2<f32>) -> vec2<f32> {\r
		let r = length(p);\r
		let invR = 1. / r;\r
		return vec2<f32>(\r
			invR * (p.x + p.y) * (p.x - p.y),\r
			invR * 2. * p.x * p.y\r
    );\r
}\r
\r
fn polarVariation(p: vec2<f32>) -> vec2<f32> {\r
    return vec2<f32>(\r
        theta(p) / pi,\r
        length(p) - 1.\r
    );\r
}\r
\r
fn handkerchieVariation(p: vec2<f32>) -> vec2<f32> {\r
    let r = length(p);\r
    let theta = theta(p);\r
    return vec2<f32>(\r
        r * sin(theta + r),\r
        r * cos(theta - r)\r
    );\r
}\r
\r
fn heartVariation(p: vec2<f32>) -> vec2<f32> {\r
    let r = length(p);\r
    let theta = theta(p);\r
    return vec2<f32>(\r
        r * sin(theta * r),\r
        r * -cos(theta * r)\r
    );\r
}\r
\r
fn discVariation(p: vec2<f32>) -> vec2<f32> {\r
    let r = length(p);\r
    let theta = theta(p);\r
    let f = theta / pi;\r
    return vec2<f32>(\r
        f * sin(pi * r),\r
        f * cos(pi * r)\r
    );\r
}\r
\r
fn spiralVariation(p: vec2<f32>) -> vec2<f32> {\r
    let r = length(p);\r
    let theta = theta(p);\r
    let invR = 1. / r;\r
    return vec2<f32>(\r
            invR * (cos(theta) + sin(r)),\r
            invR * (sin(theta) - cos(r))\r
    );\r
}\r
\r
\r
fn hyperbolicVariation(p: vec2<f32>) -> vec2<f32> {\r
    let r = length(p);\r
    let theta = theta(p);\r
    return vec2<f32>(\r
        sin(theta) / r,\r
        r * cos(theta)\r
    );\r
}\r
\r
fn diamondVariation(p: vec2<f32>) -> vec2<f32> {\r
    let r = length(p);\r
    let theta = theta(p);\r
    return vec2<f32>(\r
        sin(theta) * cos(r),\r
        sin(r) * cos(theta)\r
    );\r
}\r
\r
fn exVariation(p: vec2<f32>) -> vec2<f32> {\r
    let r = length(p);\r
    let theta = theta(p);\r
    let p0 = sin(theta + r);\r
    let p1 = cos(theta - r);\r
    let p03 = p0 * p0 * p0;\r
    let p13 = p1 * p1 * p1;\r
\r
    return vec2<f32>(\r
        r * (p03 + p13),\r
        r * (p03 - p13)\r
    );\r
}\r
\r
fn juliaVariation(tp: vec2<f32>) -> vec2<f32> {\r
    let r = r(tp);\r
    let theta = theta(tp);\r
    let omega = omega();\r
    let rSqrt = sqrt(r);\r
\r
    return vec2(\r
        rSqrt * cos(theta / 2. + omega),\r
        rSqrt * sin(theta / 2. + omega)\r
    );\r
}\r
\r
fn bentVariation(p: vec2<f32>) -> vec2<f32> {\r
    if (p.x >= 0 && p.y >= 0) {\r
        return p;\r
    }\r
    if (p.x < 0 && p.y >= 0) {\r
        return vec2<f32>(2 * p.x, p.y);\r
    }\r
    if (p.x >= 0 && p.y < 0)  {\r
        return vec2<f32>(p.x, p.y / 2);\r
    }\r
    return vec2<f32>(2 * p.x, p.y / 2);\r
}\r
\r
fn wavesVariation(p: vec2<f32>, transform: IFSTransform) -> vec2<f32> {\r
    return vec2<f32>(\r
        p.x * transform.b * sin(p.y / (transform.c * transform.c)),\r
        p.y + transform.e * sin(p.x / (transform.f * transform.f))\r
    );\r
}\r
\r
fn fisheyeVariation(p: vec2<f32>) -> vec2<f32> {\r
    let r = length(p);\r
    let f = 2. / (r + 1.);\r
    return vec2<f32>(\r
        f * p.x,\r
        f * p.y\r
    );\r
}\r
\r
fn exponentialVariation(p: vec2<f32>) -> vec2<f32> {\r
    let f = exp(p.x - 1);\r
    return vec2<f32>(\r
        f * cos(pi * p.y),\r
        f * sin(pi * p.y)\r
    );\r
}\r
\r
fn powerVariation(p: vec2<f32>) -> vec2<f32> {\r
    let r = length(p);\r
    let theta = theta(p);\r
    let f = pow(r, sin(theta));\r
\r
    return vec2<f32>(\r
        f * cos(theta),\r
        f * sin(theta)\r
    );\r
}\r
\r
\r
fn fanVariation(p: vec2<f32>, transform: IFSTransform) -> vec2<f32> {\r
    let r = length(p);\r
    let theta = theta(p);\r
    let t = pi * transform.c * transform.c;\r
    let f = transform.f;\r
\r
    if (modn(theta + f, t) > t / 2) {\r
        return vec2<f32>(\r
            cos(theta - t / 2),\r
            sin(theta - t / 2)\r
        );\r
    }\r
\r
    return vec2<f32>(\r
        r * cos(theta + t / 2),\r
        r * sin(theta + t / 2)\r
    );\r
}\r
\r
fn squareVariation() -> vec2<f32> {\r
    return vec2<f32>(psi() - 0.5, psi() - 0.5);\r
}\r
\r
fn applyVariation(tp: vec2<f32>, variation: WeightedVariation, transform: IFSTransform) -> vec2<f32> {\r
    var result = vec2(0.);\r
\r
    switch (variation.variation) {\r
        case 0: {\r
            result = tp;\r
        }\r
        case 1: {\r
            result = sinusoidalVariation(tp);\r
        }\r
        case 2: {\r
            result = sphericalVariation(tp);\r
        }\r
        case 3: {\r
            result = swirlVariation(tp);\r
        }\r
        case 4: {\r
            result = horseshoeVariation(tp);\r
        }\r
        case 5: {\r
            result = polarVariation(tp);\r
        }\r
        case 6: {\r
            result = handkerchieVariation(tp);\r
        }\r
        case 7: {\r
            result = heartVariation(tp);\r
        }\r
        case 8: {\r
            result = discVariation(tp);\r
        }\r
        case 9: {\r
            result = spiralVariation(tp);\r
        }\r
        case 10: {\r
            result = hyperbolicVariation(tp);\r
        }\r
        case 11: {\r
            result = diamondVariation(tp);\r
        }\r
        case 12: {\r
            result = exVariation(tp);\r
        }\r
        case 13: {\r
            result = juliaVariation(tp);\r
        }\r
        case 14: {\r
            result = bentVariation(tp);\r
        }\r
        case 15: {\r
            result = wavesVariation(tp, transform);\r
        }\r
        case 16: {\r
            result = fisheyeVariation(tp);\r
        }\r
        case 17: {\r
            result = exponentialVariation(tp);\r
        }\r
        case 18: {\r
            result = powerVariation(tp);\r
        }\r
        case 19: {\r
            result = fanVariation(tp, transform);\r
        }\r
        case 20: {\r
            result = squareVariation();\r
        }\r
        default: {\r
            result = tp; \r
        }\r
    }\r
    return result;\r
}\r
\r
fn palette(t: f32) -> vec3<f32> {\r
    let p = flames.palette;\r
    return vec3<f32>(\r
        c01(p.a.x + p.b.x * cos(6.28318 * (p.c.x * t + p.d.x))),\r
        c01(p.a.y + p.b.y * cos(6.28318 * (p.c.y * t + p.d.y))),\r
        c01(p.a.z + p.b.z * cos(6.28318 * (p.c.z * t + p.d.z))),\r
    );\r
}\r
\r
fn randomComponentIdx() -> u32 {\r
    let r = smf32();\r
    var accumulator = 0.;\r
    var i = 0u;\r
\r
    for (; i < maxComponentPerFlames; i++) {\r
        if flames.components[i].enabled == 0 {\r
            break;\r
        }\r
\r
        accumulator += flames.components[i].weight;\r
        if accumulator >= r {\r
            return i;\r
        }\r
    }\r
\r
    return i - 1;\r
}\r
\r
fn applyComponent(p: vec2<f32>, component: FlamesComponent) -> vec2<f32> {\r
    var newP = vec2(0.);\r
    let transform = component.transform;\r
    let tp = vec2<f32>(\r
        transform.a * p.x + transform.b * p.y + transform.c,\r
        transform.d * p.x + transform.e * p.y + transform.f\r
    );\r
\r
    for (var i = 0; i < maxVariationPerComponent; i++) {\r
        let vp = applyVariation(tp, component.variations[i], transform);\r
\r
        newP += vp * component.variations[i].weight;\r
    }\r
\r
    return newP;\r
}\r
\r
fn applyFlames(p: vec2<f32>, componentIdx: u32) -> vec2<f32> {\r
    let newP = applyComponent(p, flames.components[componentIdx]);\r
    return newP;\r
    return applyComponent(p, flames.finalComponent);\r
}\r
\r
fn applyMirror(p: vec2<f32>, localIteration: u32) -> vec2<f32> {\r
    let mX = flames.spaceWarp.mirrorX;\r
	let mY = flames.spaceWarp.mirrorY;\r
\r
	if (mX == 0 && mY == 0) {\r
        return p;\r
    }\r
\r
    if (mY == 0 && mX == 1) {\r
        if (localIteration % 2 == 0) {\r
            return vec2<f32>(p.x, p.y);\r
        }\r
        return vec2<f32>(p.x, -p.y);\r
    }\r
\r
    if (mY == 1 && mX == 0) {\r
         if (localIteration % 2 == 0) {\r
            return vec2<f32>(p.x, p.y);\r
        }\r
        return vec2<f32>(-p.x, p.y);\r
    }\r
\r
    if (localIteration % 4 == 0) {\r
        return vec2<f32>(-p.x, p.y);\r
    }\r
\r
    if (localIteration % 3 == 0) {\r
        return vec2<f32>(-p.x, -p.y);\r
    }\r
\r
    if (localIteration % 2 == 0) {\r
        return vec2<f32>(p.x, -p.y);\r
    }\r
\r
    return p;\r
}\r
\r
fn worldCoordinatesToPixels(p: vec2<f32>, resolution: vec2<u32>, rotation: f32) -> vec2<u32> {\r
    let pixel = vec2<f32>(\r
        (p.x + 2. * (f32(resolution.x) / f32(resolution.y))) * (f32(resolution.y) / 4.),\r
        (p.y + 2.) * (f32(resolution.y) / 4.)\r
    );\r
\r
    if (flames.spaceWarp.rotationalSymmetry == 1) {\r
		return vec2<u32>(round(pixel));\r
    }\r
\r
	let rPixel = rotate2d(pixel, vec2<f32>(resolution) / 2., rotation);\r
\r
    return vec2<u32>(round(rPixel));\r
}\r
\r
fn updateRenderData(pixel: vec2<u32>, componentIdx: u32) {\r
    let component = flames.components[componentIdx];\r
    let colorPaletteIdx = component.colorPaletteIdx;\r
    let idx = pixel.y * flames.resolution.x + pixel.x;\r
    var bucketValue = atomicAdd(&heatmap[idx], 1) + 1;\r
    \r
    updatePaletteAccumulator(idx, colorPaletteIdx);\r
    updateColorAccumulator(idx, vec3<f32>(component.color.r, component.color.g, component.color.b));\r
    updatePaletteIndexAccumulator(idx, colorPaletteIdx);\r
\r
    if flames.antialiasing == 0 && localHeatmapMax < bucketValue {\r
        localHeatmapMax = bucketValue;\r
    }\r
}\r
\r
fn updateRenderData3x(pixel: vec2<u32>, componentIdx: u32) {\r
    let component = flames.components[componentIdx];\r
    let colorPaletteIdx = component.colorPaletteIdx;\r
    const hOffset = 1920u * 1080u;\r
\r
    let idx = pixel.y * flames.resolution.x * 3u + pixel.x + hOffset;\r
    var bucketValue = atomicAdd(&heatmap[idx], 1) + 1;\r
\r
    updatePaletteAccumulator(idx, colorPaletteIdx);\r
    updateColorAccumulator(idx, vec3<f32>(component.color.r, component.color.g, component.color.b));\r
    updatePaletteIndexAccumulator(idx, colorPaletteIdx);\r
   \r
    if flames.antialiasing != 0 {\r
        let bucketX = (pixel.x - pixel.x % 3) / 3;\r
        let bucketY = (pixel.y - pixel.y % 3) / 3;\r
        let hidx = 3 * bucketX + 3 * bucketY * flames.resolution.x * 3 + hOffset;\r
\r
        bucketValue = (atomicLoad(&heatmap[hidx]) + atomicLoad(&heatmap[hidx + 1]) + atomicLoad(&heatmap[hidx + 2]) + atomicLoad(&heatmap[hidx + flames.resolution.x * 3]) + atomicLoad(&heatmap[hidx + flames.resolution.x * 3 + 1]) + atomicLoad(&heatmap[hidx + flames.resolution.x * 3 + 2]) + atomicLoad(&heatmap[hidx + flames.resolution.x * 3 * 2]) + atomicLoad(&heatmap[hidx + flames.resolution.x * 3 * 2 + 1]) + atomicLoad(&heatmap[hidx + flames.resolution.x * 3 * 2 + 2])) / 9;\r
    \r
        if localHeatmapMax < bucketValue {\r
            localHeatmapMax = bucketValue;\r
        }\r
    }\r
}\r
\r
\r
@compute @workgroup_size(8, 8)\r
fn main(\r
    @builtin(workgroup_id) workgroup_id: vec3<u32>,\r
    @builtin(local_invocation_id) local_invocation_id: vec3<u32>,\r
    @builtin(global_invocation_id) global_invocation_id: vec3<u32>,\r
    @builtin(local_invocation_index) local_invocation_index: u32,\r
    @builtin(num_workgroups) num_workgroups: vec3<u32>\r
) {\r
    initRandom(timeElapsed * ((global_invocation_id.x << 16) | global_invocation_id.y));\r
\r
    var rotation = 1.;\r
\r
    // With current implementation, only up to 64 rotation can be enabled\r
    if (flames.spaceWarp.rotationalSymmetry != 1) {\r
        let localId = f32(8 * local_invocation_id.x + local_invocation_id.y + 1);\r
        rotation = localId * (2. * pi) / f32(flames.spaceWarp.rotationalSymmetry);\r
        rotation = rotation % (2. * pi);\r
    }\r
\r
    let res3x = 3 * flames.resolution;\r
    var p = vec2(0.);\r
\r
    for (var i = 0u; i < iterationPerInvocation; i++) {\r
        var componentIdx = randomComponentIdx();\r
\r
        p = applyFlames(p, componentIdx);\r
\r
        p *= flames.spaceWarp.zoom;\r
        p = applyMirror(p, i);\r
\r
        let pixel3x = worldCoordinatesToPixels(p, res3x, rotation);\r
        let pixel = worldCoordinatesToPixels(p, flames.resolution, rotation);\r
\r
        if i > 20 && pixel3x.x > 0 && pixel3x.x < res3x.x && pixel3x.y > 0 && pixel3x.y < res3x.y {\r
           updateRenderData3x(pixel3x, componentIdx);\r
        }\r
\r
        if i > 20 && pixel.x > 0 && pixel.x < flames.resolution.x && pixel.y > 0 && pixel.y < flames.resolution.y {\r
            updateRenderData(pixel, componentIdx);\r
        }\r
    }\r
\r
    atomicMax(&heatmapMax, localHeatmapMax);\r
}  `,Mn=`@group(0) @binding(0) var<storage, read_write> heatmap: array<u32>;\r
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;\r
@group(0) @binding(2) var<storage, read_write> image: array<u32>;\r
@group(0) @binding(3) var<storage, read_write> heatmapMax: u32;\r
@group(0) @binding(4) var<storage, read_write> blurredImage: array<u32>;\r
\r
@group(0) @binding(5) var<storage, read_write> paletteIndexAccumulator: array<u32>;\r
@group(0) @binding(6) var<storage, read_write> colorAccumulator: array<u32>;\r
@group(0) @binding(7) var<storage, read_write> paletteAccumulator: array<u32>;\r
\r
@compute @workgroup_size(8, 8)\r
fn main(\r
    @builtin(workgroup_id) workgroup_id: vec3<u32>,\r
    @builtin(local_invocation_id) local_invocation_id: vec3<u32>,\r
    @builtin(global_invocation_id) global_invocation_id: vec3<u32>,\r
    @builtin(local_invocation_index) local_invocation_index: u32,\r
    @builtin(num_workgroups) num_workgroups: vec3<u32>\r
) {\r
    heatmapMax = 0;\r
    let x = global_invocation_id.x;\r
    let y = global_invocation_id.y;\r
    let idx = (x + y * 1920u) * 10;\r
\r
    for (var i = 0u; i < 10; i++) {\r
        pixels[idx + i] = 0;\r
        heatmap[idx + i] = 0;\r
        colorAccumulator[idx + i] = 0;\r
        paletteAccumulator[idx + i] = 0;\r
        paletteIndexAccumulator[idx + i] = 0;\r
    }\r
}  `,Cn=n=>n.createBindGroupLayout({entries:Array.from({length:8},(e,t)=>({binding:t,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}))});function Nn(n){const e=Cn(n),t=n.createBuffer({size:4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),r=n.createBuffer({size:1920*1080*4*10,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),s=n.createBuffer({size:1920*1080*4*10,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),i=n.createBuffer({size:1920*1080*4*10,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),o=n.createBuffer({size:1920*1080*4*10,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),h=n.createBuffer({size:1920*1080*4*10,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),f=n.createBuffer({size:1920*1080*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),d=n.createBuffer({size:1920*1080*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),p=n.createBindGroup({layout:e,entries:[{binding:0,resource:{buffer:s}},{binding:1,resource:{buffer:r}},{binding:2,resource:{buffer:f}},{binding:3,resource:{buffer:t}},{binding:4,resource:{buffer:d}},{binding:5,resource:{buffer:i}},{binding:6,resource:{buffer:o}},{binding:7,resource:{buffer:h}}]});return{bindgroupLayout:e,bindgroup:p,buffers:{pixels:r,heatmap:s,heatmapMax:t,finalImage:f,blurredImage:d,paletteIndexAccumulator:i,colorAccumulator:o,colorPaletteAccumulator:h}}}const it=(n,e)=>((n+e-1)/e|0)*e;function qn(n){return Object.keys(n)}function Bn(n,e){return new Array(n).fill(0).map((t,r)=>e(r))}const xt=n=>n&&typeof n.length=="number"&&n.buffer instanceof ArrayBuffer&&typeof n.byteLength=="number",Ht=n=>n,b=Ht({i32:{numElements:1,align:4,size:4,type:"i32",View:Int32Array},u32:{numElements:1,align:4,size:4,type:"u32",View:Uint32Array},f32:{numElements:1,align:4,size:4,type:"f32",View:Float32Array},f16:{numElements:1,align:2,size:2,type:"u16",View:Uint16Array},vec2f:{numElements:2,align:8,size:8,type:"f32",View:Float32Array},vec2i:{numElements:2,align:8,size:8,type:"i32",View:Int32Array},vec2u:{numElements:2,align:8,size:8,type:"u32",View:Uint32Array},vec2h:{numElements:2,align:4,size:4,type:"u16",View:Uint16Array},vec3i:{numElements:3,align:16,size:12,type:"i32",View:Int32Array},vec3u:{numElements:3,align:16,size:12,type:"u32",View:Uint32Array},vec3f:{numElements:3,align:16,size:12,type:"f32",View:Float32Array},vec3h:{numElements:3,align:8,size:6,type:"u16",View:Uint16Array},vec4i:{numElements:4,align:16,size:16,type:"i32",View:Int32Array},vec4u:{numElements:4,align:16,size:16,type:"u32",View:Uint32Array},vec4f:{numElements:4,align:16,size:16,type:"f32",View:Float32Array},vec4h:{numElements:4,align:8,size:8,type:"u16",View:Uint16Array},mat2x2f:{numElements:4,align:8,size:16,type:"f32",View:Float32Array},mat2x2h:{numElements:4,align:4,size:8,type:"u16",View:Uint16Array},mat3x2f:{numElements:6,align:8,size:24,type:"f32",View:Float32Array},mat3x2h:{numElements:6,align:4,size:12,type:"u16",View:Uint16Array},mat4x2f:{numElements:8,align:8,size:32,type:"f32",View:Float32Array},mat4x2h:{numElements:8,align:4,size:16,type:"u16",View:Uint16Array},mat2x3f:{numElements:8,align:16,size:32,pad:[3,1],type:"f32",View:Float32Array},mat2x3h:{numElements:8,align:8,size:16,pad:[3,1],type:"u16",View:Uint16Array},mat3x3f:{numElements:12,align:16,size:48,pad:[3,1],type:"f32",View:Float32Array},mat3x3h:{numElements:12,align:8,size:24,pad:[3,1],type:"u16",View:Uint16Array},mat4x3f:{numElements:16,align:16,size:64,pad:[3,1],type:"f32",View:Float32Array},mat4x3h:{numElements:16,align:8,size:32,pad:[3,1],type:"u16",View:Uint16Array},mat2x4f:{numElements:8,align:16,size:32,type:"f32",View:Float32Array},mat2x4h:{numElements:8,align:8,size:16,type:"u16",View:Uint16Array},mat3x4f:{numElements:12,align:16,size:48,pad:[3,1],type:"f32",View:Float32Array},mat3x4h:{numElements:12,align:8,size:24,pad:[3,1],type:"u16",View:Uint16Array},mat4x4f:{numElements:16,align:16,size:64,type:"f32",View:Float32Array},mat4x4h:{numElements:16,align:8,size:32,type:"u16",View:Uint16Array},bool:{numElements:0,align:1,size:0,type:"bool",View:Uint32Array}}),ye=Ht({...b,"atomic<i32>":b.i32,"atomic<u32>":b.u32,"vec2<i32>":b.vec2i,"vec2<u32>":b.vec2u,"vec2<f32>":b.vec2f,"vec2<f16>":b.vec2h,"vec3<i32>":b.vec3i,"vec3<u32>":b.vec3u,"vec3<f32>":b.vec3f,"vec3<f16>":b.vec3h,"vec4<i32>":b.vec4i,"vec4<u32>":b.vec4u,"vec4<f32>":b.vec4f,"vec4<f16>":b.vec4h,"mat2x2<f32>":b.mat2x2f,"mat2x2<f16>":b.mat2x2h,"mat3x2<f32>":b.mat3x2f,"mat3x2<f16>":b.mat3x2h,"mat4x2<f32>":b.mat4x2f,"mat4x2<f16>":b.mat4x2h,"mat2x3<f32>":b.mat2x3f,"mat2x3<f16>":b.mat2x3h,"mat3x3<f32>":b.mat3x3f,"mat3x3<f16>":b.mat3x3h,"mat4x3<f32>":b.mat4x3f,"mat4x3<f16>":b.mat4x3h,"mat2x4<f32>":b.mat2x4f,"mat2x4<f16>":b.mat2x4h,"mat3x4<f32>":b.mat3x4f,"mat3x4<f16>":b.mat3x4h,"mat4x4<f32>":b.mat4x4f,"mat4x4<f16>":b.mat4x4h}),Rn=qn(ye);function Ln(n=[],e){const t=new Set;for(const r of Rn){const s=ye[r];t.has(s)||(t.add(s),s.flatten=n.includes(r)?e:!e)}}Ln();function On(n){const e=n;if(e.elementType)return e.size;{const r=n,s=e.numElements||1;if(r.fields)return n.size*s;{const i=n,{align:o}=ye[i.type];return s>1?it(n.size,o)*s:n.size}}}function vt(n,e,t,r){const{size:s,type:i}=n;try{const{View:o,align:h}=ye[i],f=r!==void 0,d=f?it(s,h):s,p=d/o.BYTES_PER_ELEMENT,_=f?r===0?(e.byteLength-t)/d:r:1;return new o(e,t,p*_)}catch{throw new Error(`unknown type: ${i}`)}}function Dn(n){return!n.fields&&!n.elementType}function Gn(n,e,t){const r=t||0,s=new ArrayBuffer(On(n)),i=(o,h)=>{const f=o,d=f.elementType;if(d){if(Dn(d)&&ye[d.type].flatten)return vt(d,s,h,f.numElements);{const{size:p}=jt(o),_=f.numElements===0?(s.byteLength-h)/p:f.numElements;return Bn(_,m=>i(d,h+p*m))}}else{if(typeof o=="string")throw Error("unreachable");{const p=o.fields;if(p){const _={};for(const[m,{type:y,offset:g}]of Object.entries(p))_[m]=i(y,h+g);return _}else return vt(o,s,h)}}};return{views:i(n,r),arrayBuffer:s}}function je(n,e){if(n!==void 0)if(xt(e)){const t=e;if(t.length===1&&typeof n=="number")t[0]=n;else if(Array.isArray(n[0])||xt(n[0])){const r=n[0].length,s=r===3?4:r;for(let i=0;i<n.length;++i){const o=i*s;t.set(n[i],o)}}else t.set(n)}else if(Array.isArray(e)){const t=e;n.forEach((r,s)=>{je(r,t[s])})}else{const t=e;for(const[r,s]of Object.entries(n)){const i=t[r];i&&je(s,i)}}}function Xt(n,e,t=0){const r=n,s=r.group===void 0?n:r.typeDefinition,i=Gn(s,e,t);return{...i,set(o){je(o,i.views)}}}function Ke(n){const t=n.elementType;if(t)return Ke(t);const s=n.fields;if(s)return Object.values(s).reduce((h,{type:f})=>Math.max(h,Ke(f)),0);const{type:i}=n,{align:o}=ye[i];return o}function jt(n){const t=n.elementType;if(t){const i=t.size,o=Ke(t);return{unalignedSize:i,align:o,size:it(i,o)}}const s=n.fields;if(s){const i=Object.values(s).pop();if(i.type.size===0)return jt(i.type)}return{size:0,unalignedSize:0,align:1}}class Wn{constructor(){this.constants=new Map,this.aliases=new Map,this.structs=new Map}}class Q{constructor(){}get isAstNode(){return!0}get astNodeType(){return""}evaluate(e){throw new Error("Cannot evaluate node")}evaluateString(e){return this.evaluate(e).toString()}search(e){}searchBlock(e,t){if(e){t(Me.instance);for(const r of e)r instanceof Array?this.searchBlock(r,t):r.search(t);t(Ce.instance)}}}class Me extends Q{}Me.instance=new Me;class Ce extends Q{}Ce.instance=new Ce;class F extends Q{constructor(){super()}}class Je extends F{constructor(e,t,r,s,i,o){super(),this.calls=new Set,this.name=e,this.args=t,this.returnType=r,this.body=s,this.startLine=i,this.endLine=o}get astNodeType(){return"function"}search(e){this.searchBlock(this.body,e)}}class Yn extends F{constructor(e){super(),this.expression=e}get astNodeType(){return"staticAssert"}search(e){this.expression.search(e)}}class $n extends F{constructor(e,t){super(),this.condition=e,this.body=t}get astNodeType(){return"while"}search(e){this.condition.search(e),this.searchBlock(this.body,e)}}class Hn extends F{constructor(e){super(),this.body=e}get astNodeType(){return"continuing"}search(e){this.searchBlock(this.body,e)}}class Xn extends F{constructor(e,t,r,s){super(),this.init=e,this.condition=t,this.increment=r,this.body=s}get astNodeType(){return"for"}search(e){var t,r,s;(t=this.init)===null||t===void 0||t.search(e),(r=this.condition)===null||r===void 0||r.search(e),(s=this.increment)===null||s===void 0||s.search(e),this.searchBlock(this.body,e)}}class se extends F{constructor(e,t,r,s,i){super(),this.name=e,this.type=t,this.storage=r,this.access=s,this.value=i}get astNodeType(){return"var"}search(e){var t;e(this),(t=this.value)===null||t===void 0||t.search(e)}}class Kt extends F{constructor(e,t,r){super(),this.name=e,this.type=t,this.value=r}get astNodeType(){return"override"}search(e){var t;(t=this.value)===null||t===void 0||t.search(e)}}class Ze extends F{constructor(e,t,r,s,i){super(),this.name=e,this.type=t,this.storage=r,this.access=s,this.value=i}get astNodeType(){return"let"}search(e){var t;e(this),(t=this.value)===null||t===void 0||t.search(e)}}class wt extends F{constructor(e,t,r,s,i){super(),this.name=e,this.type=t,this.storage=r,this.access=s,this.value=i}get astNodeType(){return"const"}evaluate(e){return this.value.evaluate(e)}search(e){var t;e(this),(t=this.value)===null||t===void 0||t.search(e)}}var pe;(function(n){n.increment="++",n.decrement="--"})(pe||(pe={}));(function(n){function e(t){const r=t;if(r=="parse")throw new Error("Invalid value for IncrementOperator");return n[r]}n.parse=e})(pe||(pe={}));class jn extends F{constructor(e,t){super(),this.operator=e,this.variable=t}get astNodeType(){return"increment"}search(e){this.variable.search(e)}}var be;(function(n){n.assign="=",n.addAssign="+=",n.subtractAssin="-=",n.multiplyAssign="*=",n.divideAssign="/=",n.moduloAssign="%=",n.andAssign="&=",n.orAssign="|=",n.xorAssign="^=",n.shiftLeftAssign="<<=",n.shiftRightAssign=">>="})(be||(be={}));(function(n){function e(t){const r=t;if(r=="parse")throw new Error("Invalid value for AssignOperator");return r}n.parse=e})(be||(be={}));class Kn extends F{constructor(e,t,r){super(),this.operator=e,this.variable=t,this.value=r}get astNodeType(){return"assign"}search(e){this.variable.search(e),this.value.search(e)}}class Jt extends F{constructor(e,t){super(),this.name=e,this.args=t}get astNodeType(){return"call"}search(e){for(const t of this.args)t.search(e);e(this)}}class Jn extends F{constructor(e,t){super(),this.body=e,this.continuing=t}get astNodeType(){return"loop"}}class Zn extends F{constructor(e,t){super(),this.condition=e,this.body=t}get astNodeType(){return"body"}}class Qn extends F{constructor(e,t,r,s){super(),this.condition=e,this.body=t,this.elseif=r,this.else=s}get astNodeType(){return"if"}search(e){this.condition.search(e),this.searchBlock(this.body,e),this.searchBlock(this.elseif,e),this.searchBlock(this.else,e)}}class es extends F{constructor(e){super(),this.value=e}get astNodeType(){return"return"}search(e){var t;(t=this.value)===null||t===void 0||t.search(e)}}class ts extends F{constructor(e){super(),this.name=e}get astNodeType(){return"enable"}}class rs extends F{constructor(e){super(),this.extensions=e}get astNodeType(){return"requires"}}class ns extends F{constructor(e,t){super(),this.severity=e,this.rule=t}get astNodeType(){return"diagnostic"}}class Zt extends F{constructor(e,t){super(),this.name=e,this.type=t}get astNodeType(){return"alias"}}class ss extends F{constructor(){super()}get astNodeType(){return"discard"}}class as extends F{constructor(){super()}get astNodeType(){return"break"}}class is extends F{constructor(){super()}get astNodeType(){return"continue"}}class ae extends F{constructor(e){super(),this.name=e}get astNodeType(){return"type"}get isStruct(){return!1}get isArray(){return!1}}class ne extends ae{constructor(e,t,r,s){super(e),this.members=t,this.startLine=r,this.endLine=s}get astNodeType(){return"struct"}get isStruct(){return!0}getMemberIndex(e){for(let t=0;t<this.members.length;t++)if(this.members[t].name==e)return t;return-1}}class Qt extends ae{constructor(e,t,r){super(e),this.format=t,this.access=r}get astNodeType(){return"template"}}class os extends ae{constructor(e,t,r,s){super(e),this.storage=t,this.type=r,this.access=s}get astNodeType(){return"pointer"}}class er extends ae{constructor(e,t,r,s){super(e),this.attributes=t,this.format=r,this.count=s}get astNodeType(){return"array"}get isArray(){return!0}}class ve extends ae{constructor(e,t,r){super(e),this.format=t,this.access=r}get astNodeType(){return"sampler"}}class G extends Q{constructor(){super()}}class kt extends G{constructor(e){super(),this.value=e}get astNodeType(){return"stringExpr"}toString(){return this.value}evaluateString(){return this.value}}class he extends G{constructor(e,t){super(),this.type=e,this.args=t}get astNodeType(){return"createExpr"}search(e){e(this);for(const t of this.args)t.search(e)}}class tr extends G{constructor(e,t){super(),this.name=e,this.args=t}get astNodeType(){return"callExpr"}evaluate(e){switch(this.name){case"abs":return Math.abs(this.args[0].evaluate(e));case"acos":return Math.acos(this.args[0].evaluate(e));case"acosh":return Math.acosh(this.args[0].evaluate(e));case"asin":return Math.asin(this.args[0].evaluate(e));case"asinh":return Math.asinh(this.args[0].evaluate(e));case"atan":return Math.atan(this.args[0].evaluate(e));case"atan2":return Math.atan2(this.args[0].evaluate(e),this.args[1].evaluate(e));case"atanh":return Math.atanh(this.args[0].evaluate(e));case"ceil":return Math.ceil(this.args[0].evaluate(e));case"clamp":return Math.min(Math.max(this.args[0].evaluate(e),this.args[1].evaluate(e)),this.args[2].evaluate(e));case"cos":return Math.cos(this.args[0].evaluate(e));case"degrees":return this.args[0].evaluate(e)*180/Math.PI;case"distance":return Math.sqrt(Math.pow(this.args[0].evaluate(e)-this.args[1].evaluate(e),2));case"dot":case"exp":return Math.exp(this.args[0].evaluate(e));case"exp2":return Math.pow(2,this.args[0].evaluate(e));case"floor":return Math.floor(this.args[0].evaluate(e));case"fma":return this.args[0].evaluate(e)*this.args[1].evaluate(e)+this.args[2].evaluate(e);case"fract":return this.args[0].evaluate(e)-Math.floor(this.args[0].evaluate(e));case"inverseSqrt":return 1/Math.sqrt(this.args[0].evaluate(e));case"log":return Math.log(this.args[0].evaluate(e));case"log2":return Math.log2(this.args[0].evaluate(e));case"max":return Math.max(this.args[0].evaluate(e),this.args[1].evaluate(e));case"min":return Math.min(this.args[0].evaluate(e),this.args[1].evaluate(e));case"mix":return this.args[0].evaluate(e)*(1-this.args[2].evaluate(e))+this.args[1].evaluate(e)*this.args[2].evaluate(e);case"modf":return this.args[0].evaluate(e)-Math.floor(this.args[0].evaluate(e));case"pow":return Math.pow(this.args[0].evaluate(e),this.args[1].evaluate(e));case"radians":return this.args[0].evaluate(e)*Math.PI/180;case"round":return Math.round(this.args[0].evaluate(e));case"sign":return Math.sign(this.args[0].evaluate(e));case"sin":return Math.sin(this.args[0].evaluate(e));case"sinh":return Math.sinh(this.args[0].evaluate(e));case"saturate":return Math.min(Math.max(this.args[0].evaluate(e),0),1);case"smoothstep":return this.args[0].evaluate(e)*this.args[0].evaluate(e)*(3-2*this.args[0].evaluate(e));case"sqrt":return Math.sqrt(this.args[0].evaluate(e));case"step":return this.args[0].evaluate(e)<this.args[1].evaluate(e)?0:1;case"tan":return Math.tan(this.args[0].evaluate(e));case"tanh":return Math.tanh(this.args[0].evaluate(e));case"trunc":return Math.trunc(this.args[0].evaluate(e));default:throw new Error("Non const function: "+this.name)}}search(e){for(const t of this.args)t.search(e);e(this)}}class Qe extends G{constructor(e){super(),this.name=e}get astNodeType(){return"varExpr"}search(e){e(this),this.postfix&&this.postfix.search(e)}evaluate(e){const t=e.constants.get(this.name);if(!t)throw new Error("Cannot evaluate node");return t.evaluate(e)}}class bt extends G{constructor(e,t){super(),this.name=e,this.initializer=t}get astNodeType(){return"constExpr"}evaluate(e){var t,r;if(this.initializer instanceof he){const s=(t=this.postfix)===null||t===void 0?void 0:t.evaluateString(e),i=(r=this.initializer.type)===null||r===void 0?void 0:r.name,o=e.structs.get(i),h=o==null?void 0:o.getMemberIndex(s);if(h!=-1)return this.initializer.args[h].evaluate(e);console.log(h)}return this.initializer.evaluate(e)}search(e){this.initializer.search(e)}}class St extends G{constructor(e){super(),this.value=e}get astNodeType(){return"literalExpr"}evaluate(){return this.value}}class ls extends G{constructor(e,t){super(),this.type=e,this.value=t}get astNodeType(){return"bitcastExpr"}search(e){this.value.search(e)}}class us extends G{constructor(e,t){super(),this.type=e,this.args=t}get astNodeType(){return"typecastExpr"}evaluate(e){return this.args[0].evaluate(e)}search(e){this.searchBlock(this.args,e)}}class Tt extends G{constructor(e){super(),this.contents=e}get astNodeType(){return"groupExpr"}evaluate(e){return this.contents[0].evaluate(e)}search(e){this.searchBlock(this.contents,e)}}class cs extends G{constructor(e){super(),this.index=e}search(e){this.index.search(e)}}class rr extends G{constructor(){super()}}class hs extends rr{constructor(e,t){super(),this.operator=e,this.right=t}get astNodeType(){return"unaryOp"}evaluate(e){switch(this.operator){case"+":return this.right.evaluate(e);case"-":return-this.right.evaluate(e);case"!":return this.right.evaluate(e)?0:1;case"~":return~this.right.evaluate(e);default:throw new Error("Unknown unary operator: "+this.operator)}}search(e){this.right.search(e)}}class Y extends rr{constructor(e,t,r){super(),this.operator=e,this.left=t,this.right=r}get astNodeType(){return"binaryOp"}evaluate(e){switch(this.operator){case"+":return this.left.evaluate(e)+this.right.evaluate(e);case"-":return this.left.evaluate(e)-this.right.evaluate(e);case"*":return this.left.evaluate(e)*this.right.evaluate(e);case"/":return this.left.evaluate(e)/this.right.evaluate(e);case"%":return this.left.evaluate(e)%this.right.evaluate(e);case"==":return this.left.evaluate(e)==this.right.evaluate(e)?1:0;case"!=":return this.left.evaluate(e)!=this.right.evaluate(e)?1:0;case"<":return this.left.evaluate(e)<this.right.evaluate(e)?1:0;case">":return this.left.evaluate(e)>this.right.evaluate(e)?1:0;case"<=":return this.left.evaluate(e)<=this.right.evaluate(e)?1:0;case">=":return this.left.evaluate(e)>=this.right.evaluate(e)?1:0;case"&&":return this.left.evaluate(e)&&this.right.evaluate(e)?1:0;case"||":return this.left.evaluate(e)||this.right.evaluate(e)?1:0;default:throw new Error(`Unknown operator ${this.operator}`)}}search(e){this.left.search(e),this.right.search(e)}}class nr extends Q{constructor(){super()}}class fs extends nr{constructor(e,t){super(),this.selector=e,this.body=t}get astNodeType(){return"case"}search(e){this.searchBlock(this.body,e)}}class ds extends nr{constructor(e){super(),this.body=e}get astNodeType(){return"default"}search(e){this.searchBlock(this.body,e)}}class ps extends Q{constructor(e,t,r){super(),this.name=e,this.type=t,this.attributes=r}get astNodeType(){return"argument"}}class ms extends Q{constructor(e,t){super(),this.condition=e,this.body=t}get astNodeType(){return"elseif"}search(e){this.condition.search(e),this.searchBlock(this.body,e)}}class _s extends Q{constructor(e,t,r){super(),this.name=e,this.type=t,this.attributes=r}get astNodeType(){return"member"}}class At extends Q{constructor(e,t){super(),this.name=e,this.value=t}get astNodeType(){return"attribute"}}var c,l;(function(n){n[n.token=0]="token",n[n.keyword=1]="keyword",n[n.reserved=2]="reserved"})(l||(l={}));class u{constructor(e,t,r){this.name=e,this.type=t,this.rule=r}toString(){return this.name}}class a{}c=a;a.none=new u("",l.reserved,"");a.eof=new u("EOF",l.token,"");a.reserved={asm:new u("asm",l.reserved,"asm"),bf16:new u("bf16",l.reserved,"bf16"),do:new u("do",l.reserved,"do"),enum:new u("enum",l.reserved,"enum"),f16:new u("f16",l.reserved,"f16"),f64:new u("f64",l.reserved,"f64"),handle:new u("handle",l.reserved,"handle"),i8:new u("i8",l.reserved,"i8"),i16:new u("i16",l.reserved,"i16"),i64:new u("i64",l.reserved,"i64"),mat:new u("mat",l.reserved,"mat"),premerge:new u("premerge",l.reserved,"premerge"),regardless:new u("regardless",l.reserved,"regardless"),typedef:new u("typedef",l.reserved,"typedef"),u8:new u("u8",l.reserved,"u8"),u16:new u("u16",l.reserved,"u16"),u64:new u("u64",l.reserved,"u64"),unless:new u("unless",l.reserved,"unless"),using:new u("using",l.reserved,"using"),vec:new u("vec",l.reserved,"vec"),void:new u("void",l.reserved,"void")};a.keywords={array:new u("array",l.keyword,"array"),atomic:new u("atomic",l.keyword,"atomic"),bool:new u("bool",l.keyword,"bool"),f32:new u("f32",l.keyword,"f32"),i32:new u("i32",l.keyword,"i32"),mat2x2:new u("mat2x2",l.keyword,"mat2x2"),mat2x3:new u("mat2x3",l.keyword,"mat2x3"),mat2x4:new u("mat2x4",l.keyword,"mat2x4"),mat3x2:new u("mat3x2",l.keyword,"mat3x2"),mat3x3:new u("mat3x3",l.keyword,"mat3x3"),mat3x4:new u("mat3x4",l.keyword,"mat3x4"),mat4x2:new u("mat4x2",l.keyword,"mat4x2"),mat4x3:new u("mat4x3",l.keyword,"mat4x3"),mat4x4:new u("mat4x4",l.keyword,"mat4x4"),ptr:new u("ptr",l.keyword,"ptr"),sampler:new u("sampler",l.keyword,"sampler"),sampler_comparison:new u("sampler_comparison",l.keyword,"sampler_comparison"),struct:new u("struct",l.keyword,"struct"),texture_1d:new u("texture_1d",l.keyword,"texture_1d"),texture_2d:new u("texture_2d",l.keyword,"texture_2d"),texture_2d_array:new u("texture_2d_array",l.keyword,"texture_2d_array"),texture_3d:new u("texture_3d",l.keyword,"texture_3d"),texture_cube:new u("texture_cube",l.keyword,"texture_cube"),texture_cube_array:new u("texture_cube_array",l.keyword,"texture_cube_array"),texture_multisampled_2d:new u("texture_multisampled_2d",l.keyword,"texture_multisampled_2d"),texture_storage_1d:new u("texture_storage_1d",l.keyword,"texture_storage_1d"),texture_storage_2d:new u("texture_storage_2d",l.keyword,"texture_storage_2d"),texture_storage_2d_array:new u("texture_storage_2d_array",l.keyword,"texture_storage_2d_array"),texture_storage_3d:new u("texture_storage_3d",l.keyword,"texture_storage_3d"),texture_depth_2d:new u("texture_depth_2d",l.keyword,"texture_depth_2d"),texture_depth_2d_array:new u("texture_depth_2d_array",l.keyword,"texture_depth_2d_array"),texture_depth_cube:new u("texture_depth_cube",l.keyword,"texture_depth_cube"),texture_depth_cube_array:new u("texture_depth_cube_array",l.keyword,"texture_depth_cube_array"),texture_depth_multisampled_2d:new u("texture_depth_multisampled_2d",l.keyword,"texture_depth_multisampled_2d"),texture_external:new u("texture_external",l.keyword,"texture_external"),u32:new u("u32",l.keyword,"u32"),vec2:new u("vec2",l.keyword,"vec2"),vec3:new u("vec3",l.keyword,"vec3"),vec4:new u("vec4",l.keyword,"vec4"),bitcast:new u("bitcast",l.keyword,"bitcast"),block:new u("block",l.keyword,"block"),break:new u("break",l.keyword,"break"),case:new u("case",l.keyword,"case"),continue:new u("continue",l.keyword,"continue"),continuing:new u("continuing",l.keyword,"continuing"),default:new u("default",l.keyword,"default"),diagnostic:new u("diagnostic",l.keyword,"diagnostic"),discard:new u("discard",l.keyword,"discard"),else:new u("else",l.keyword,"else"),enable:new u("enable",l.keyword,"enable"),fallthrough:new u("fallthrough",l.keyword,"fallthrough"),false:new u("false",l.keyword,"false"),fn:new u("fn",l.keyword,"fn"),for:new u("for",l.keyword,"for"),function:new u("function",l.keyword,"function"),if:new u("if",l.keyword,"if"),let:new u("let",l.keyword,"let"),const:new u("const",l.keyword,"const"),loop:new u("loop",l.keyword,"loop"),while:new u("while",l.keyword,"while"),private:new u("private",l.keyword,"private"),read:new u("read",l.keyword,"read"),read_write:new u("read_write",l.keyword,"read_write"),return:new u("return",l.keyword,"return"),requires:new u("requires",l.keyword,"requires"),storage:new u("storage",l.keyword,"storage"),switch:new u("switch",l.keyword,"switch"),true:new u("true",l.keyword,"true"),alias:new u("alias",l.keyword,"alias"),type:new u("type",l.keyword,"type"),uniform:new u("uniform",l.keyword,"uniform"),var:new u("var",l.keyword,"var"),override:new u("override",l.keyword,"override"),workgroup:new u("workgroup",l.keyword,"workgroup"),write:new u("write",l.keyword,"write"),r8unorm:new u("r8unorm",l.keyword,"r8unorm"),r8snorm:new u("r8snorm",l.keyword,"r8snorm"),r8uint:new u("r8uint",l.keyword,"r8uint"),r8sint:new u("r8sint",l.keyword,"r8sint"),r16uint:new u("r16uint",l.keyword,"r16uint"),r16sint:new u("r16sint",l.keyword,"r16sint"),r16float:new u("r16float",l.keyword,"r16float"),rg8unorm:new u("rg8unorm",l.keyword,"rg8unorm"),rg8snorm:new u("rg8snorm",l.keyword,"rg8snorm"),rg8uint:new u("rg8uint",l.keyword,"rg8uint"),rg8sint:new u("rg8sint",l.keyword,"rg8sint"),r32uint:new u("r32uint",l.keyword,"r32uint"),r32sint:new u("r32sint",l.keyword,"r32sint"),r32float:new u("r32float",l.keyword,"r32float"),rg16uint:new u("rg16uint",l.keyword,"rg16uint"),rg16sint:new u("rg16sint",l.keyword,"rg16sint"),rg16float:new u("rg16float",l.keyword,"rg16float"),rgba8unorm:new u("rgba8unorm",l.keyword,"rgba8unorm"),rgba8unorm_srgb:new u("rgba8unorm_srgb",l.keyword,"rgba8unorm_srgb"),rgba8snorm:new u("rgba8snorm",l.keyword,"rgba8snorm"),rgba8uint:new u("rgba8uint",l.keyword,"rgba8uint"),rgba8sint:new u("rgba8sint",l.keyword,"rgba8sint"),bgra8unorm:new u("bgra8unorm",l.keyword,"bgra8unorm"),bgra8unorm_srgb:new u("bgra8unorm_srgb",l.keyword,"bgra8unorm_srgb"),rgb10a2unorm:new u("rgb10a2unorm",l.keyword,"rgb10a2unorm"),rg11b10float:new u("rg11b10float",l.keyword,"rg11b10float"),rg32uint:new u("rg32uint",l.keyword,"rg32uint"),rg32sint:new u("rg32sint",l.keyword,"rg32sint"),rg32float:new u("rg32float",l.keyword,"rg32float"),rgba16uint:new u("rgba16uint",l.keyword,"rgba16uint"),rgba16sint:new u("rgba16sint",l.keyword,"rgba16sint"),rgba16float:new u("rgba16float",l.keyword,"rgba16float"),rgba32uint:new u("rgba32uint",l.keyword,"rgba32uint"),rgba32sint:new u("rgba32sint",l.keyword,"rgba32sint"),rgba32float:new u("rgba32float",l.keyword,"rgba32float"),static_assert:new u("static_assert",l.keyword,"static_assert")};a.tokens={decimal_float_literal:new u("decimal_float_literal",l.token,/((-?[0-9]*\.[0-9]+|-?[0-9]+\.[0-9]*)((e|E)(\+|-)?[0-9]+)?f?)|(-?[0-9]+(e|E)(\+|-)?[0-9]+f?)|([0-9]+f)/),hex_float_literal:new u("hex_float_literal",l.token,/-?0x((([0-9a-fA-F]*\.[0-9a-fA-F]+|[0-9a-fA-F]+\.[0-9a-fA-F]*)((p|P)(\+|-)?[0-9]+f?)?)|([0-9a-fA-F]+(p|P)(\+|-)?[0-9]+f?))/),int_literal:new u("int_literal",l.token,/-?0x[0-9a-fA-F]+|0i?|-?[1-9][0-9]*i?/),uint_literal:new u("uint_literal",l.token,/0x[0-9a-fA-F]+u|0u|[1-9][0-9]*u/),ident:new u("ident",l.token,/[_a-zA-Z][0-9a-zA-Z_]*/),and:new u("and",l.token,"&"),and_and:new u("and_and",l.token,"&&"),arrow:new u("arrow ",l.token,"->"),attr:new u("attr",l.token,"@"),attr_left:new u("attr_left",l.token,"[["),attr_right:new u("attr_right",l.token,"]]"),forward_slash:new u("forward_slash",l.token,"/"),bang:new u("bang",l.token,"!"),bracket_left:new u("bracket_left",l.token,"["),bracket_right:new u("bracket_right",l.token,"]"),brace_left:new u("brace_left",l.token,"{"),brace_right:new u("brace_right",l.token,"}"),colon:new u("colon",l.token,":"),comma:new u("comma",l.token,","),equal:new u("equal",l.token,"="),equal_equal:new u("equal_equal",l.token,"=="),not_equal:new u("not_equal",l.token,"!="),greater_than:new u("greater_than",l.token,">"),greater_than_equal:new u("greater_than_equal",l.token,">="),shift_right:new u("shift_right",l.token,">>"),less_than:new u("less_than",l.token,"<"),less_than_equal:new u("less_than_equal",l.token,"<="),shift_left:new u("shift_left",l.token,"<<"),modulo:new u("modulo",l.token,"%"),minus:new u("minus",l.token,"-"),minus_minus:new u("minus_minus",l.token,"--"),period:new u("period",l.token,"."),plus:new u("plus",l.token,"+"),plus_plus:new u("plus_plus",l.token,"++"),or:new u("or",l.token,"|"),or_or:new u("or_or",l.token,"||"),paren_left:new u("paren_left",l.token,"("),paren_right:new u("paren_right",l.token,")"),semicolon:new u("semicolon",l.token,";"),star:new u("star",l.token,"*"),tilde:new u("tilde",l.token,"~"),underscore:new u("underscore",l.token,"_"),xor:new u("xor",l.token,"^"),plus_equal:new u("plus_equal",l.token,"+="),minus_equal:new u("minus_equal",l.token,"-="),times_equal:new u("times_equal",l.token,"*="),division_equal:new u("division_equal",l.token,"/="),modulo_equal:new u("modulo_equal",l.token,"%="),and_equal:new u("and_equal",l.token,"&="),or_equal:new u("or_equal",l.token,"|="),xor_equal:new u("xor_equal",l.token,"^="),shift_right_equal:new u("shift_right_equal",l.token,">>="),shift_left_equal:new u("shift_left_equal",l.token,"<<=")};a.simpleTokens={"@":c.tokens.attr,"{":c.tokens.brace_left,"}":c.tokens.brace_right,":":c.tokens.colon,",":c.tokens.comma,"(":c.tokens.paren_left,")":c.tokens.paren_right,";":c.tokens.semicolon};a.literalTokens={"&":c.tokens.and,"&&":c.tokens.and_and,"->":c.tokens.arrow,"[[":c.tokens.attr_left,"]]":c.tokens.attr_right,"/":c.tokens.forward_slash,"!":c.tokens.bang,"[":c.tokens.bracket_left,"]":c.tokens.bracket_right,"=":c.tokens.equal,"==":c.tokens.equal_equal,"!=":c.tokens.not_equal,">":c.tokens.greater_than,">=":c.tokens.greater_than_equal,">>":c.tokens.shift_right,"<":c.tokens.less_than,"<=":c.tokens.less_than_equal,"<<":c.tokens.shift_left,"%":c.tokens.modulo,"-":c.tokens.minus,"--":c.tokens.minus_minus,".":c.tokens.period,"+":c.tokens.plus,"++":c.tokens.plus_plus,"|":c.tokens.or,"||":c.tokens.or_or,"*":c.tokens.star,"~":c.tokens.tilde,_:c.tokens.underscore,"^":c.tokens.xor,"+=":c.tokens.plus_equal,"-=":c.tokens.minus_equal,"*=":c.tokens.times_equal,"/=":c.tokens.division_equal,"%=":c.tokens.modulo_equal,"&=":c.tokens.and_equal,"|=":c.tokens.or_equal,"^=":c.tokens.xor_equal,">>=":c.tokens.shift_right_equal,"<<=":c.tokens.shift_left_equal};a.regexTokens={decimal_float_literal:c.tokens.decimal_float_literal,hex_float_literal:c.tokens.hex_float_literal,int_literal:c.tokens.int_literal,uint_literal:c.tokens.uint_literal,ident:c.tokens.ident};a.storage_class=[c.keywords.function,c.keywords.private,c.keywords.workgroup,c.keywords.uniform,c.keywords.storage];a.access_mode=[c.keywords.read,c.keywords.write,c.keywords.read_write];a.sampler_type=[c.keywords.sampler,c.keywords.sampler_comparison];a.sampled_texture_type=[c.keywords.texture_1d,c.keywords.texture_2d,c.keywords.texture_2d_array,c.keywords.texture_3d,c.keywords.texture_cube,c.keywords.texture_cube_array];a.multisampled_texture_type=[c.keywords.texture_multisampled_2d];a.storage_texture_type=[c.keywords.texture_storage_1d,c.keywords.texture_storage_2d,c.keywords.texture_storage_2d_array,c.keywords.texture_storage_3d];a.depth_texture_type=[c.keywords.texture_depth_2d,c.keywords.texture_depth_2d_array,c.keywords.texture_depth_cube,c.keywords.texture_depth_cube_array,c.keywords.texture_depth_multisampled_2d];a.texture_external_type=[c.keywords.texture_external];a.any_texture_type=[...c.sampled_texture_type,...c.multisampled_texture_type,...c.storage_texture_type,...c.depth_texture_type,...c.texture_external_type];a.texel_format=[c.keywords.r8unorm,c.keywords.r8snorm,c.keywords.r8uint,c.keywords.r8sint,c.keywords.r16uint,c.keywords.r16sint,c.keywords.r16float,c.keywords.rg8unorm,c.keywords.rg8snorm,c.keywords.rg8uint,c.keywords.rg8sint,c.keywords.r32uint,c.keywords.r32sint,c.keywords.r32float,c.keywords.rg16uint,c.keywords.rg16sint,c.keywords.rg16float,c.keywords.rgba8unorm,c.keywords.rgba8unorm_srgb,c.keywords.rgba8snorm,c.keywords.rgba8uint,c.keywords.rgba8sint,c.keywords.bgra8unorm,c.keywords.bgra8unorm_srgb,c.keywords.rgb10a2unorm,c.keywords.rg11b10float,c.keywords.rg32uint,c.keywords.rg32sint,c.keywords.rg32float,c.keywords.rgba16uint,c.keywords.rgba16sint,c.keywords.rgba16float,c.keywords.rgba32uint,c.keywords.rgba32sint,c.keywords.rgba32float];a.const_literal=[c.tokens.int_literal,c.tokens.uint_literal,c.tokens.decimal_float_literal,c.tokens.hex_float_literal,c.keywords.true,c.keywords.false];a.literal_or_ident=[c.tokens.ident,c.tokens.int_literal,c.tokens.uint_literal,c.tokens.decimal_float_literal,c.tokens.hex_float_literal];a.element_count_expression=[c.tokens.int_literal,c.tokens.uint_literal,c.tokens.ident];a.template_types=[c.keywords.vec2,c.keywords.vec3,c.keywords.vec4,c.keywords.mat2x2,c.keywords.mat2x3,c.keywords.mat2x4,c.keywords.mat3x2,c.keywords.mat3x3,c.keywords.mat3x4,c.keywords.mat4x2,c.keywords.mat4x3,c.keywords.mat4x4,c.keywords.atomic,c.keywords.bitcast,...c.any_texture_type];a.attribute_name=[c.tokens.ident,c.keywords.block,c.keywords.diagnostic];a.assignment_operators=[c.tokens.equal,c.tokens.plus_equal,c.tokens.minus_equal,c.tokens.times_equal,c.tokens.division_equal,c.tokens.modulo_equal,c.tokens.and_equal,c.tokens.or_equal,c.tokens.xor_equal,c.tokens.shift_right_equal,c.tokens.shift_left_equal];a.increment_operators=[c.tokens.plus_plus,c.tokens.minus_minus];class zt{constructor(e,t,r){this.type=e,this.lexeme=t,this.line=r}toString(){return this.lexeme}isTemplateType(){return a.template_types.indexOf(this.type)!=-1}isArrayType(){return this.type==a.keywords.array}isArrayOrTemplateType(){return this.isArrayType()||this.isTemplateType()}}class gs{constructor(e){this._tokens=[],this._start=0,this._current=0,this._line=1,this._source=e??""}scanTokens(){for(;!this._isAtEnd();)if(this._start=this._current,!this.scanToken())throw`Invalid syntax at line ${this._line}`;return this._tokens.push(new zt(a.eof,"",this._line)),this._tokens}scanToken(){let e=this._advance();if(e==`
`)return this._line++,!0;if(this._isWhitespace(e))return!0;if(e=="/"){if(this._peekAhead()=="/"){for(;e!=`
`;){if(this._isAtEnd())return!0;e=this._advance()}return this._line++,!0}else if(this._peekAhead()=="*"){this._advance();let o=1;for(;o>0;){if(this._isAtEnd())return!0;if(e=this._advance(),e==`
`)this._line++;else if(e=="*"){if(this._peekAhead()=="/"&&(this._advance(),o--,o==0))return!0}else e=="/"&&this._peekAhead()=="*"&&(this._advance(),o++)}return!0}}const t=a.simpleTokens[e];if(t)return this._addToken(t),!0;let r=a.none;const s=this._isAlpha(e),i=e==="_";if(this._isAlphaNumeric(e)){let o=this._peekAhead();for(;this._isAlphaNumeric(o);)e+=this._advance(),o=this._peekAhead()}if(s){const o=a.keywords[e];if(o)return this._addToken(o),!0}if(s||i)return this._addToken(a.tokens.ident),!0;for(;;){let o=this._findType(e);const h=this._peekAhead();if(e==">"&&(h==">"||h=="=")){let f=!1,d=this._tokens.length-1;for(let p=0;p<5&&d>=0;++p,--d)if(this._tokens[d].type===a.tokens.less_than){d>0&&this._tokens[d-1].isArrayOrTemplateType()&&(f=!0);break}if(f)return this._addToken(o),!0}if(o===a.none){let f=e,d=0;const p=2;for(let _=0;_<p;++_)if(f+=this._peekAhead(_),o=this._findType(f),o!==a.none){d=_;break}if(o===a.none)return r===a.none?!1:(this._current--,this._addToken(r),!0);e=f,this._current+=d+1}if(r=o,this._isAtEnd())break;e+=this._advance()}return r===a.none?!1:(this._addToken(r),!0)}_findType(e){for(const r in a.regexTokens){const s=a.regexTokens[r];if(this._match(e,s.rule))return s}const t=a.literalTokens[e];return t||a.none}_match(e,t){const r=t.exec(e);return r&&r.index==0&&r[0]==e}_isAtEnd(){return this._current>=this._source.length}_isAlpha(e){return e>="a"&&e<="z"||e>="A"&&e<="Z"}_isAlphaNumeric(e){return e>="a"&&e<="z"||e>="A"&&e<="Z"||e=="_"||e>="0"&&e<="9"}_isWhitespace(e){return e==" "||e=="	"||e=="\r"}_advance(e=0){let t=this._source[this._current];return e=e||0,e++,this._current+=e,t}_peekAhead(e=0){return e=e||0,this._current+e>=this._source.length?"\0":this._source[this._current+e]}_addToken(e){const t=this._source.substring(this._start,this._current);this._tokens.push(new zt(e,t,this._line))}}class ys{constructor(){this._tokens=[],this._current=0,this._currentLine=0,this._context=new Wn,this._deferArrayCountEval=[]}parse(e){this._initialize(e),this._deferArrayCountEval.length=0;const t=[];for(;!this._isAtEnd();){const r=this._global_decl_or_directive();if(!r)break;t.push(r)}if(this._deferArrayCountEval.length>0){for(const r of this._deferArrayCountEval){const s=r.arrayType,i=r.countNode;if(i instanceof Qe){const h=i.name,f=this._context.constants.get(h);if(f)try{const d=f.evaluate(this._context);s.count=d}catch{}}}this._deferArrayCountEval.length=0}return t}_initialize(e){if(e)if(typeof e=="string"){const t=new gs(e);this._tokens=t.scanTokens()}else this._tokens=e;else this._tokens=[];this._current=0}_error(e,t){return{token:e,message:t,toString:function(){return`${t}`}}}_isAtEnd(){return this._current>=this._tokens.length||this._peek().type==a.eof}_match(e){if(e instanceof u)return this._check(e)?(this._advance(),!0):!1;for(let t=0,r=e.length;t<r;++t){const s=e[t];if(this._check(s))return this._advance(),!0}return!1}_consume(e,t){if(this._check(e))return this._advance();throw this._error(this._peek(),t)}_check(e){if(this._isAtEnd())return!1;const t=this._peek();if(e instanceof Array){const r=t.type;return e.indexOf(r)!=-1}return t.type==e}_advance(){var e,t;return this._currentLine=(t=(e=this._peek())===null||e===void 0?void 0:e.line)!==null&&t!==void 0?t:-1,this._isAtEnd()||this._current++,this._previous()}_peek(){return this._tokens[this._current]}_previous(){return this._tokens[this._current-1]}_global_decl_or_directive(){for(;this._match(a.tokens.semicolon)&&!this._isAtEnd(););if(this._match(a.keywords.alias)){const t=this._type_alias();return this._consume(a.tokens.semicolon,"Expected ';'"),t}if(this._match(a.keywords.diagnostic)){const t=this._diagnostic();return this._consume(a.tokens.semicolon,"Expected ';'"),t}if(this._match(a.keywords.requires)){const t=this._requires_directive();return this._consume(a.tokens.semicolon,"Expected ';'"),t}if(this._match(a.keywords.enable)){const t=this._enable_directive();return this._consume(a.tokens.semicolon,"Expected ';'"),t}const e=this._attribute();if(this._check(a.keywords.var)){const t=this._global_variable_decl();return t!=null&&(t.attributes=e),this._consume(a.tokens.semicolon,"Expected ';'."),t}if(this._check(a.keywords.override)){const t=this._override_variable_decl();return t!=null&&(t.attributes=e),this._consume(a.tokens.semicolon,"Expected ';'."),t}if(this._check(a.keywords.let)){const t=this._global_let_decl();return t!=null&&(t.attributes=e),this._consume(a.tokens.semicolon,"Expected ';'."),t}if(this._check(a.keywords.const)){const t=this._global_const_decl();return t!=null&&(t.attributes=e),this._consume(a.tokens.semicolon,"Expected ';'."),t}if(this._check(a.keywords.struct)){const t=this._struct_decl();return t!=null&&(t.attributes=e),t}if(this._check(a.keywords.fn)){const t=this._function_decl();return t!=null&&(t.attributes=e),t}return null}_function_decl(){if(!this._match(a.keywords.fn))return null;const e=this._currentLine,t=this._consume(a.tokens.ident,"Expected function name.").toString();this._consume(a.tokens.paren_left,"Expected '(' for function arguments.");const r=[];if(!this._check(a.tokens.paren_right))do{if(this._check(a.tokens.paren_right))break;const h=this._attribute(),f=this._consume(a.tokens.ident,"Expected argument name.").toString();this._consume(a.tokens.colon,"Expected ':' for argument type.");const d=this._attribute(),p=this._type_decl();p!=null&&(p.attributes=d,r.push(new ps(f,p,h)))}while(this._match(a.tokens.comma));this._consume(a.tokens.paren_right,"Expected ')' after function arguments.");let s=null;if(this._match(a.tokens.arrow)){const h=this._attribute();s=this._type_decl(),s!=null&&(s.attributes=h)}const i=this._compound_statement(),o=this._currentLine;return new Je(t,r,s,i,e,o)}_compound_statement(){const e=[];for(this._consume(a.tokens.brace_left,"Expected '{' for block.");!this._check(a.tokens.brace_right);){const t=this._statement();t!==null&&e.push(t)}return this._consume(a.tokens.brace_right,"Expected '}' for block."),e}_statement(){for(;this._match(a.tokens.semicolon)&&!this._isAtEnd(););if(this._check(a.tokens.attr)&&this._attribute(),this._check(a.keywords.if))return this._if_statement();if(this._check(a.keywords.switch))return this._switch_statement();if(this._check(a.keywords.loop))return this._loop_statement();if(this._check(a.keywords.for))return this._for_statement();if(this._check(a.keywords.while))return this._while_statement();if(this._check(a.keywords.continuing))return this._continuing_statement();if(this._check(a.keywords.static_assert))return this._static_assert_statement();if(this._check(a.tokens.brace_left))return this._compound_statement();let e=null;return this._check(a.keywords.return)?e=this._return_statement():this._check([a.keywords.var,a.keywords.let,a.keywords.const])?e=this._variable_statement():this._match(a.keywords.discard)?e=new ss:this._match(a.keywords.break)?e=new as:this._match(a.keywords.continue)?e=new is:e=this._increment_decrement_statement()||this._func_call_statement()||this._assignment_statement(),e!=null&&this._consume(a.tokens.semicolon,"Expected ';' after statement."),e}_static_assert_statement(){if(!this._match(a.keywords.static_assert))return null;const e=this._optional_paren_expression();return new Yn(e)}_while_statement(){if(!this._match(a.keywords.while))return null;const e=this._optional_paren_expression();this._check(a.tokens.attr)&&this._attribute();const t=this._compound_statement();return new $n(e,t)}_continuing_statement(){if(!this._match(a.keywords.continuing))return null;const e=this._compound_statement();return new Hn(e)}_for_statement(){if(!this._match(a.keywords.for))return null;this._consume(a.tokens.paren_left,"Expected '('.");const e=this._check(a.tokens.semicolon)?null:this._for_init();this._consume(a.tokens.semicolon,"Expected ';'.");const t=this._check(a.tokens.semicolon)?null:this._short_circuit_or_expression();this._consume(a.tokens.semicolon,"Expected ';'.");const r=this._check(a.tokens.paren_right)?null:this._for_increment();this._consume(a.tokens.paren_right,"Expected ')'."),this._check(a.tokens.attr)&&this._attribute();const s=this._compound_statement();return new Xn(e,t,r,s)}_for_init(){return this._variable_statement()||this._func_call_statement()||this._assignment_statement()}_for_increment(){return this._func_call_statement()||this._increment_decrement_statement()||this._assignment_statement()}_variable_statement(){if(this._check(a.keywords.var)){const e=this._variable_decl();if(e===null)throw this._error(this._peek(),"Variable declaration expected.");let t=null;return this._match(a.tokens.equal)&&(t=this._short_circuit_or_expression()),new se(e.name,e.type,e.storage,e.access,t)}if(this._match(a.keywords.let)){const e=this._consume(a.tokens.ident,"Expected name for let.").toString();let t=null;if(this._match(a.tokens.colon)){const s=this._attribute();t=this._type_decl(),t!=null&&(t.attributes=s)}this._consume(a.tokens.equal,"Expected '=' for let.");const r=this._short_circuit_or_expression();return new Ze(e,t,null,null,r)}if(this._match(a.keywords.const)){const e=this._consume(a.tokens.ident,"Expected name for const.").toString();let t=null;if(this._match(a.tokens.colon)){const s=this._attribute();t=this._type_decl(),t!=null&&(t.attributes=s)}this._consume(a.tokens.equal,"Expected '=' for const.");const r=this._short_circuit_or_expression();return new wt(e,t,null,null,r)}return null}_increment_decrement_statement(){const e=this._current,t=this._unary_expression();if(t==null)return null;if(!this._check(a.increment_operators))return this._current=e,null;const r=this._consume(a.increment_operators,"Expected increment operator");return new jn(r.type===a.tokens.plus_plus?pe.increment:pe.decrement,t)}_assignment_statement(){let e=null;if(this._check(a.tokens.brace_right))return null;let t=this._match(a.tokens.underscore);if(t||(e=this._unary_expression()),!t&&e==null)return null;const r=this._consume(a.assignment_operators,"Expected assignment operator."),s=this._short_circuit_or_expression();return new Kn(be.parse(r.lexeme),e,s)}_func_call_statement(){if(!this._check(a.tokens.ident))return null;const e=this._current,t=this._consume(a.tokens.ident,"Expected function name."),r=this._argument_expression_list();return r===null?(this._current=e,null):new Jt(t.lexeme,r)}_loop_statement(){if(!this._match(a.keywords.loop))return null;this._check(a.tokens.attr)&&this._attribute(),this._consume(a.tokens.brace_left,"Expected '{' for loop.");const e=[];let t=this._statement();for(;t!==null;){if(Array.isArray(t))for(let s of t)e.push(s);else e.push(t);t=this._statement()}let r=null;return this._match(a.keywords.continuing)&&(r=this._compound_statement()),this._consume(a.tokens.brace_right,"Expected '}' for loop."),new Jn(e,r)}_switch_statement(){if(!this._match(a.keywords.switch))return null;const e=this._optional_paren_expression();this._check(a.tokens.attr)&&this._attribute(),this._consume(a.tokens.brace_left,"Expected '{' for switch.");const t=this._switch_body();if(t==null||t.length==0)throw this._error(this._previous(),"Expected 'case' or 'default'.");return this._consume(a.tokens.brace_right,"Expected '}' for switch."),new Zn(e,t)}_switch_body(){const e=[];if(this._match(a.keywords.case)){const t=this._case_selectors();this._match(a.tokens.colon),this._check(a.tokens.attr)&&this._attribute(),this._consume(a.tokens.brace_left,"Exected '{' for switch case.");const r=this._case_body();this._consume(a.tokens.brace_right,"Exected '}' for switch case."),e.push(new fs(t,r))}if(this._match(a.keywords.default)){this._match(a.tokens.colon),this._check(a.tokens.attr)&&this._attribute(),this._consume(a.tokens.brace_left,"Exected '{' for switch default.");const t=this._case_body();this._consume(a.tokens.brace_right,"Exected '}' for switch default."),e.push(new ds(t))}if(this._check([a.keywords.default,a.keywords.case])){const t=this._switch_body();e.push(t[0])}return e}_case_selectors(){const e=[this._shift_expression()];for(;this._match(a.tokens.comma);)e.push(this._shift_expression());return e}_case_body(){if(this._match(a.keywords.fallthrough))return this._consume(a.tokens.semicolon,"Expected ';'"),[];let e=this._statement();if(e==null)return[];e instanceof Array||(e=[e]);const t=this._case_body();return t.length==0?e:[...e,t[0]]}_if_statement(){if(!this._match(a.keywords.if))return null;const e=this._optional_paren_expression();this._check(a.tokens.attr)&&this._attribute();const t=this._compound_statement();let r=[];this._match_elseif()&&(this._check(a.tokens.attr)&&this._attribute(),r=this._elseif_statement(r));let s=null;return this._match(a.keywords.else)&&(this._check(a.tokens.attr)&&this._attribute(),s=this._compound_statement()),new Qn(e,t,r,s)}_match_elseif(){return this._tokens[this._current].type===a.keywords.else&&this._tokens[this._current+1].type===a.keywords.if?(this._advance(),this._advance(),!0):!1}_elseif_statement(e=[]){const t=this._optional_paren_expression(),r=this._compound_statement();return e.push(new ms(t,r)),this._match_elseif()&&(this._check(a.tokens.attr)&&this._attribute(),this._elseif_statement(e)),e}_return_statement(){if(!this._match(a.keywords.return))return null;const e=this._short_circuit_or_expression();return new es(e)}_short_circuit_or_expression(){let e=this._short_circuit_and_expr();for(;this._match(a.tokens.or_or);)e=new Y(this._previous().toString(),e,this._short_circuit_and_expr());return e}_short_circuit_and_expr(){let e=this._inclusive_or_expression();for(;this._match(a.tokens.and_and);)e=new Y(this._previous().toString(),e,this._inclusive_or_expression());return e}_inclusive_or_expression(){let e=this._exclusive_or_expression();for(;this._match(a.tokens.or);)e=new Y(this._previous().toString(),e,this._exclusive_or_expression());return e}_exclusive_or_expression(){let e=this._and_expression();for(;this._match(a.tokens.xor);)e=new Y(this._previous().toString(),e,this._and_expression());return e}_and_expression(){let e=this._equality_expression();for(;this._match(a.tokens.and);)e=new Y(this._previous().toString(),e,this._equality_expression());return e}_equality_expression(){const e=this._relational_expression();return this._match([a.tokens.equal_equal,a.tokens.not_equal])?new Y(this._previous().toString(),e,this._relational_expression()):e}_relational_expression(){let e=this._shift_expression();for(;this._match([a.tokens.less_than,a.tokens.greater_than,a.tokens.less_than_equal,a.tokens.greater_than_equal]);)e=new Y(this._previous().toString(),e,this._shift_expression());return e}_shift_expression(){let e=this._additive_expression();for(;this._match([a.tokens.shift_left,a.tokens.shift_right]);)e=new Y(this._previous().toString(),e,this._additive_expression());return e}_additive_expression(){let e=this._multiplicative_expression();for(;this._match([a.tokens.plus,a.tokens.minus]);)e=new Y(this._previous().toString(),e,this._multiplicative_expression());return e}_multiplicative_expression(){let e=this._unary_expression();for(;this._match([a.tokens.star,a.tokens.forward_slash,a.tokens.modulo]);)e=new Y(this._previous().toString(),e,this._unary_expression());return e}_unary_expression(){return this._match([a.tokens.minus,a.tokens.bang,a.tokens.tilde,a.tokens.star,a.tokens.and])?new hs(this._previous().toString(),this._unary_expression()):this._singular_expression()}_singular_expression(){const e=this._primary_expression(),t=this._postfix_expression();return t&&(e.postfix=t),e}_postfix_expression(){if(this._match(a.tokens.bracket_left)){const e=this._short_circuit_or_expression();this._consume(a.tokens.bracket_right,"Expected ']'.");const t=new cs(e),r=this._postfix_expression();return r&&(t.postfix=r),t}if(this._match(a.tokens.period)){const e=this._consume(a.tokens.ident,"Expected member name."),t=this._postfix_expression(),r=new kt(e.lexeme);return t&&(r.postfix=t),r}return null}_getStruct(e){return this._context.aliases.has(e)?this._context.aliases.get(e).type:this._context.structs.has(e)?this._context.structs.get(e):null}_primary_expression(){if(this._match(a.tokens.ident)){const r=this._previous().toString();if(this._check(a.tokens.paren_left)){const s=this._argument_expression_list(),i=this._getStruct(r);return i!=null?new he(i,s):new tr(r,s)}if(this._context.constants.has(r)){const s=this._context.constants.get(r);return new bt(r,s.value)}return new Qe(r)}if(this._match(a.const_literal))return new St(parseFloat(this._previous().toString()));if(this._check(a.tokens.paren_left))return this._paren_expression();if(this._match(a.keywords.bitcast)){this._consume(a.tokens.less_than,"Expected '<'.");const r=this._type_decl();this._consume(a.tokens.greater_than,"Expected '>'.");const s=this._paren_expression();return new ls(r,s)}const e=this._type_decl(),t=this._argument_expression_list();return new us(e,t)}_argument_expression_list(){if(!this._match(a.tokens.paren_left))return null;const e=[];do{if(this._check(a.tokens.paren_right))break;const t=this._short_circuit_or_expression();e.push(t)}while(this._match(a.tokens.comma));return this._consume(a.tokens.paren_right,"Expected ')' for agument list"),e}_optional_paren_expression(){this._match(a.tokens.paren_left);const e=this._short_circuit_or_expression();return this._match(a.tokens.paren_right),new Tt([e])}_paren_expression(){this._consume(a.tokens.paren_left,"Expected '('.");const e=this._short_circuit_or_expression();return this._consume(a.tokens.paren_right,"Expected ')'."),new Tt([e])}_struct_decl(){if(!this._match(a.keywords.struct))return null;const e=this._currentLine,t=this._consume(a.tokens.ident,"Expected name for struct.").toString();this._consume(a.tokens.brace_left,"Expected '{' for struct body.");const r=[];for(;!this._check(a.tokens.brace_right);){const o=this._attribute(),h=this._consume(a.tokens.ident,"Expected variable name.").toString();this._consume(a.tokens.colon,"Expected ':' for struct member type.");const f=this._attribute(),d=this._type_decl();d!=null&&(d.attributes=f),this._check(a.tokens.brace_right)?this._match(a.tokens.comma):this._consume(a.tokens.comma,"Expected ',' for struct member."),r.push(new _s(h,d,o))}this._consume(a.tokens.brace_right,"Expected '}' after struct body.");const s=this._currentLine,i=new ne(t,r,e,s);return this._context.structs.set(t,i),i}_global_variable_decl(){const e=this._variable_decl();return e&&this._match(a.tokens.equal)&&(e.value=this._const_expression()),e}_override_variable_decl(){const e=this._override_decl();return e&&this._match(a.tokens.equal)&&(e.value=this._const_expression()),e}_global_const_decl(){if(!this._match(a.keywords.const))return null;const e=this._consume(a.tokens.ident,"Expected variable name");let t=null;if(this._match(a.tokens.colon)){const i=this._attribute();t=this._type_decl(),t!=null&&(t.attributes=i)}let r=null;if(this._match(a.tokens.equal)){const i=this._short_circuit_or_expression();if(i instanceof he)r=i;else if(i instanceof bt&&i.initializer instanceof he)r=i.initializer;else try{const o=i.evaluate(this._context);r=new St(o)}catch{r=i}}const s=new wt(e.toString(),t,"","",r);return this._context.constants.set(s.name,s),s}_global_let_decl(){if(!this._match(a.keywords.let))return null;const e=this._consume(a.tokens.ident,"Expected variable name");let t=null;if(this._match(a.tokens.colon)){const s=this._attribute();t=this._type_decl(),t!=null&&(t.attributes=s)}let r=null;return this._match(a.tokens.equal)&&(r=this._const_expression()),new Ze(e.toString(),t,"","",r)}_const_expression(){if(this._match(a.const_literal))return new kt(this._previous().toString());const e=this._type_decl();this._consume(a.tokens.paren_left,"Expected '('.");let t=[];for(;!this._check(a.tokens.paren_right)&&(t.push(this._const_expression()),!!this._check(a.tokens.comma));)this._advance();return this._consume(a.tokens.paren_right,"Expected ')'."),new he(e,t)}_variable_decl(){if(!this._match(a.keywords.var))return null;let e="",t="";this._match(a.tokens.less_than)&&(e=this._consume(a.storage_class,"Expected storage_class.").toString(),this._match(a.tokens.comma)&&(t=this._consume(a.access_mode,"Expected access_mode.").toString()),this._consume(a.tokens.greater_than,"Expected '>'."));const r=this._consume(a.tokens.ident,"Expected variable name");let s=null;if(this._match(a.tokens.colon)){const i=this._attribute();s=this._type_decl(),s!=null&&(s.attributes=i)}return new se(r.toString(),s,e,t,null)}_override_decl(){if(!this._match(a.keywords.override))return null;const e=this._consume(a.tokens.ident,"Expected variable name");let t=null;if(this._match(a.tokens.colon)){const r=this._attribute();t=this._type_decl(),t!=null&&(t.attributes=r)}return new Kt(e.toString(),t,null)}_diagnostic(){this._consume(a.tokens.paren_left,"Expected '('");const e=this._consume(a.tokens.ident,"Expected severity control name.");this._consume(a.tokens.comma,"Expected ','");const t=this._consume(a.tokens.ident,"Expected diagnostic rule name.");return this._consume(a.tokens.paren_right,"Expected ')'"),new ns(e.toString(),t.toString())}_enable_directive(){const e=this._consume(a.tokens.ident,"identity expected.");return new ts(e.toString())}_requires_directive(){const e=[this._consume(a.tokens.ident,"identity expected.").toString()];for(;this._match(a.tokens.comma);){const t=this._consume(a.tokens.ident,"identity expected.");e.push(t.toString())}return new rs(e)}_type_alias(){const e=this._consume(a.tokens.ident,"identity expected.");this._consume(a.tokens.equal,"Expected '=' for type alias.");let t=this._type_decl();if(t===null)throw this._error(this._peek(),"Expected Type for Alias.");this._context.aliases.has(t.name)&&(t=this._context.aliases.get(t.name).type);const r=new Zt(e.toString(),t);return this._context.aliases.set(r.name,r),r}_type_decl(){if(this._check([a.tokens.ident,...a.texel_format,a.keywords.bool,a.keywords.f32,a.keywords.i32,a.keywords.u32])){const r=this._advance(),s=r.toString();return this._context.structs.has(s)?this._context.structs.get(s):this._context.aliases.has(s)?this._context.aliases.get(s).type:new ae(r.toString())}let e=this._texture_sampler_types();if(e)return e;if(this._check(a.template_types)){let r=this._advance().toString(),s=null,i=null;return this._match(a.tokens.less_than)&&(s=this._type_decl(),i=null,this._match(a.tokens.comma)&&(i=this._consume(a.access_mode,"Expected access_mode for pointer").toString()),this._consume(a.tokens.greater_than,"Expected '>' for type.")),new Qt(r,s,i)}if(this._match(a.keywords.ptr)){let r=this._previous().toString();this._consume(a.tokens.less_than,"Expected '<' for pointer.");const s=this._consume(a.storage_class,"Expected storage_class for pointer");this._consume(a.tokens.comma,"Expected ',' for pointer.");const i=this._type_decl();let o=null;return this._match(a.tokens.comma)&&(o=this._consume(a.access_mode,"Expected access_mode for pointer").toString()),this._consume(a.tokens.greater_than,"Expected '>' for pointer."),new os(r,s.toString(),i,o)}const t=this._attribute();if(this._match(a.keywords.array)){let r=null,s=-1;const i=this._previous();let o=null;if(this._match(a.tokens.less_than)){r=this._type_decl(),this._context.aliases.has(r.name)&&(r=this._context.aliases.get(r.name).type);let f="";if(this._match(a.tokens.comma)){o=this._shift_expression();try{f=o.evaluate(this._context).toString(),o=null}catch{f="1"}}this._consume(a.tokens.greater_than,"Expected '>' for array."),s=f?parseInt(f):0}const h=new er(i.toString(),t,r,s);return o&&this._deferArrayCountEval.push({arrayType:h,countNode:o}),h}return null}_texture_sampler_types(){if(this._match(a.sampler_type))return new ve(this._previous().toString(),null,null);if(this._match(a.depth_texture_type))return new ve(this._previous().toString(),null,null);if(this._match(a.sampled_texture_type)||this._match(a.multisampled_texture_type)){const e=this._previous();this._consume(a.tokens.less_than,"Expected '<' for sampler type.");const t=this._type_decl();return this._consume(a.tokens.greater_than,"Expected '>' for sampler type."),new ve(e.toString(),t,null)}if(this._match(a.storage_texture_type)){const e=this._previous();this._consume(a.tokens.less_than,"Expected '<' for sampler type.");const t=this._consume(a.texel_format,"Invalid texel format.").toString();this._consume(a.tokens.comma,"Expected ',' after texel format.");const r=this._consume(a.access_mode,"Expected access mode for storage texture type.").toString();return this._consume(a.tokens.greater_than,"Expected '>' for sampler type."),new ve(e.toString(),t,r)}return null}_attribute(){let e=[];for(;this._match(a.tokens.attr);){const t=this._consume(a.attribute_name,"Expected attribute name"),r=new At(t.toString(),null);if(this._match(a.tokens.paren_left)){if(r.value=this._consume(a.literal_or_ident,"Expected attribute value").toString(),this._check(a.tokens.comma)){this._advance();do{const s=this._consume(a.literal_or_ident,"Expected attribute value").toString();r.value instanceof Array||(r.value=[r.value]),r.value.push(s)}while(this._match(a.tokens.comma))}this._consume(a.tokens.paren_right,"Expected ')'")}e.push(r)}for(;this._match(a.tokens.attr_left);){if(!this._check(a.tokens.attr_right))do{const t=this._consume(a.attribute_name,"Expected attribute name"),r=new At(t.toString(),null);if(this._match(a.tokens.paren_left)){if(r.value=[this._consume(a.literal_or_ident,"Expected attribute value").toString()],this._check(a.tokens.comma)){this._advance();do{const s=this._consume(a.literal_or_ident,"Expected attribute value").toString();r.value.push(s)}while(this._match(a.tokens.comma))}this._consume(a.tokens.paren_right,"Expected ')'")}e.push(r)}while(this._match(a.tokens.comma));this._consume(a.tokens.attr_right,"Expected ']]' after attribute declarations")}return e.length==0?null:e}}class fe{constructor(e,t){this.name=e,this.attributes=t,this.size=0}get isArray(){return!1}get isStruct(){return!1}get isTemplate(){return!1}}class Et{constructor(e,t,r){this.name=e,this.type=t,this.attributes=r,this.offset=0,this.size=0}get isArray(){return this.type.isArray}get isStruct(){return this.type.isStruct}get isTemplate(){return this.type.isTemplate}get align(){return this.type.isStruct?this.type.align:0}get members(){return this.type.isStruct?this.type.members:null}get format(){return this.type.isArray?this.type.format:this.type.isTemplate?this.type.format:null}get count(){return this.type.isArray?this.type.count:0}get stride(){return this.type.isArray?this.type.stride:this.size}}class ze extends fe{constructor(e,t){super(e,t),this.members=[],this.align=0,this.startLine=-1,this.endLine=-1,this.inUse=!1}get isStruct(){return!0}}class De extends fe{constructor(e,t){super(e,t),this.count=0,this.stride=0}get isArray(){return!0}}class It extends fe{constructor(e,t,r,s){super(e,r),this.format=t,this.access=s}get isTemplate(){return!0}}var V;(function(n){n[n.Uniform=0]="Uniform",n[n.Storage=1]="Storage",n[n.Texture=2]="Texture",n[n.Sampler=3]="Sampler",n[n.StorageTexture=4]="StorageTexture"})(V||(V={}));class Ee{constructor(e,t,r,s,i,o,h){this.name=e,this.type=t,this.group=r,this.binding=s,this.attributes=i,this.resourceType=o,this.access=h}get isArray(){return this.type.isArray}get isStruct(){return this.type.isStruct}get isTemplate(){return this.type.isTemplate}get size(){return this.type.size}get align(){return this.type.isStruct?this.type.align:0}get members(){return this.type.isStruct?this.type.members:null}get format(){return this.type.isArray?this.type.format:this.type.isTemplate?this.type.format:null}get count(){return this.type.isArray?this.type.count:0}get stride(){return this.type.isArray?this.type.stride:this.size}}class xs{constructor(e,t){this.name=e,this.type=t}}class Ie{constructor(e,t){this.align=e,this.size=t}}class vs{constructor(e,t,r,s){this.name=e,this.type=t,this.locationType=r,this.location=s,this.interpolation=null}}class Ft{constructor(e,t,r,s){this.name=e,this.type=t,this.locationType=r,this.location=s}}class ws{constructor(e,t=null){this.stage=null,this.inputs=[],this.outputs=[],this.resources=[],this.startLine=-1,this.endLine=-1,this.inUse=!1,this.calls=new Set,this.name=e,this.stage=t}}class ks{constructor(){this.vertex=[],this.fragment=[],this.compute=[]}}class bs{constructor(e,t,r,s){this.name=e,this.type=t,this.attributes=r,this.id=s}}class Ss{constructor(e){this.resources=null,this.inUse=!1,this.info=null,this.node=e}}class Z{constructor(e){this.uniforms=[],this.storage=[],this.textures=[],this.samplers=[],this.aliases=[],this.overrides=[],this.structs=[],this.entry=new ks,this.functions=[],this._types=new Map,this._functions=new Map,e&&this.update(e)}_isStorageTexture(e){return e.name=="texture_storage_1d"||e.name=="texture_storage_2d"||e.name=="texture_storage_2d_array"||e.name=="texture_storage_3d"}update(e){const r=new ys().parse(e);for(const s of r)s instanceof Je&&this._functions.set(s.name,new Ss(s));for(const s of r)if(s instanceof ne){const i=this._getTypeInfo(s,null);i instanceof ze&&this.structs.push(i)}for(const s of r){if(s instanceof Zt){this.aliases.push(this._getAliasInfo(s));continue}if(s instanceof Kt){const i=s,o=this._getAttributeNum(i.attributes,"id",0),h=i.type!=null?this._getTypeInfo(i.type,i.attributes):null;this.overrides.push(new bs(i.name,h,i.attributes,o));continue}if(this._isUniformVar(s)){const i=s,o=this._getAttributeNum(i.attributes,"group",0),h=this._getAttributeNum(i.attributes,"binding",0),f=this._getTypeInfo(i.type,i.attributes),d=new Ee(i.name,f,o,h,i.attributes,V.Uniform,i.access);this.uniforms.push(d);continue}if(this._isStorageVar(s)){const i=s,o=this._getAttributeNum(i.attributes,"group",0),h=this._getAttributeNum(i.attributes,"binding",0),f=this._getTypeInfo(i.type,i.attributes),d=this._isStorageTexture(f),p=new Ee(i.name,f,o,h,i.attributes,d?V.StorageTexture:V.Storage,i.access);this.storage.push(p);continue}if(this._isTextureVar(s)){const i=s,o=this._getAttributeNum(i.attributes,"group",0),h=this._getAttributeNum(i.attributes,"binding",0),f=this._getTypeInfo(i.type,i.attributes),d=this._isStorageTexture(f),p=new Ee(i.name,f,o,h,i.attributes,d?V.StorageTexture:V.Texture,i.access);d?this.storage.push(p):this.textures.push(p);continue}if(this._isSamplerVar(s)){const i=s,o=this._getAttributeNum(i.attributes,"group",0),h=this._getAttributeNum(i.attributes,"binding",0),f=this._getTypeInfo(i.type,i.attributes),d=new Ee(i.name,f,o,h,i.attributes,V.Sampler,i.access);this.samplers.push(d);continue}if(s instanceof Je){const i=this._getAttribute(s,"vertex"),o=this._getAttribute(s,"fragment"),h=this._getAttribute(s,"compute"),f=i||o||h,d=new ws(s.name,f==null?void 0:f.name);d.startLine=s.startLine,d.endLine=s.endLine,this.functions.push(d),this._functions.get(s.name).info=d,f&&(this._functions.get(s.name).inUse=!0,d.inUse=!0,d.resources=this._findResources(s,!!f),d.inputs=this._getInputs(s.args),d.outputs=this._getOutputs(s.returnType),this.entry[f.name].push(d));continue}}for(const s of this._functions.values())s.info&&(s.info.inUse=s.inUse,this._addCalls(s.node,s.info.calls));for(const s of this.uniforms)this._markStructsInUse(s.type);for(const s of this.storage)this._markStructsInUse(s.type)}_markStructsInUse(e){if(e.isStruct){e.inUse=!0;for(const t of e.members)this._markStructsInUse(t.type)}else if(e.isArray)this._markStructsInUse(e.format);else if(e.isTemplate)this._markStructsInUse(e.format);else{const t=this._getAlias(e.name);t&&this._markStructsInUse(t)}}_addCalls(e,t){var r;for(const s of e.calls){const i=(r=this._functions.get(s.name))===null||r===void 0?void 0:r.info;i&&t.add(i)}}findResource(e,t){for(const r of this.uniforms)if(r.group==e&&r.binding==t)return r;for(const r of this.storage)if(r.group==e&&r.binding==t)return r;for(const r of this.textures)if(r.group==e&&r.binding==t)return r;for(const r of this.samplers)if(r.group==e&&r.binding==t)return r;return null}_findResource(e){for(const t of this.uniforms)if(t.name==e)return t;for(const t of this.storage)if(t.name==e)return t;for(const t of this.textures)if(t.name==e)return t;for(const t of this.samplers)if(t.name==e)return t;return null}_markStructsFromAST(e){const t=this._getTypeInfo(e,null);this._markStructsInUse(t)}_findResources(e,t){const r=[],s=this,i=[];return e.search(o=>{if(o instanceof Me)i.push({});else if(o instanceof Ce)i.pop();else if(o instanceof se){const h=o;t&&h.type!==null&&this._markStructsFromAST(h.type),i.length>0&&(i[i.length-1][h.name]=h)}else if(o instanceof he){const h=o;t&&h.type!==null&&this._markStructsFromAST(h.type)}else if(o instanceof Ze){const h=o;t&&h.type!==null&&this._markStructsFromAST(h.type),i.length>0&&(i[i.length-1][h.name]=h)}else if(o instanceof Qe){const h=o;if(i.length>0&&i[i.length-1][h.name])return;const f=s._findResource(h.name);f&&r.push(f)}else if(o instanceof tr){const h=o,f=s._functions.get(h.name);f&&(t&&(f.inUse=!0),e.calls.add(f.node),f.resources===null&&(f.resources=s._findResources(f.node,t)),r.push(...f.resources))}else if(o instanceof Jt){const h=o,f=s._functions.get(h.name);f&&(t&&(f.inUse=!0),e.calls.add(f.node),f.resources===null&&(f.resources=s._findResources(f.node,t)),r.push(...f.resources))}}),[...new Map(r.map(o=>[o.name,o])).values()]}getBindGroups(){const e=[];function t(r,s){r>=e.length&&(e.length=r+1),e[r]===void 0&&(e[r]=[]),s>=e[r].length&&(e[r].length=s+1)}for(const r of this.uniforms){t(r.group,r.binding);const s=e[r.group];s[r.binding]=r}for(const r of this.storage){t(r.group,r.binding);const s=e[r.group];s[r.binding]=r}for(const r of this.textures){t(r.group,r.binding);const s=e[r.group];s[r.binding]=r}for(const r of this.samplers){t(r.group,r.binding);const s=e[r.group];s[r.binding]=r}return e}_getOutputs(e,t=void 0){if(t===void 0&&(t=[]),e instanceof ne)this._getStructOutputs(e,t);else{const r=this._getOutputInfo(e);r!==null&&t.push(r)}return t}_getStructOutputs(e,t){for(const r of e.members)if(r.type instanceof ne)this._getStructOutputs(r.type,t);else{const s=this._getAttribute(r,"location")||this._getAttribute(r,"builtin");if(s!==null){const i=this._getTypeInfo(r.type,r.type.attributes),o=this._parseInt(s.value),h=new Ft(r.name,i,s.name,o);t.push(h)}}}_getOutputInfo(e){const t=this._getAttribute(e,"location")||this._getAttribute(e,"builtin");if(t!==null){const r=this._getTypeInfo(e,e.attributes),s=this._parseInt(t.value);return new Ft("",r,t.name,s)}return null}_getInputs(e,t=void 0){t===void 0&&(t=[]);for(const r of e)if(r.type instanceof ne)this._getStructInputs(r.type,t);else{const s=this._getInputInfo(r);s!==null&&t.push(s)}return t}_getStructInputs(e,t){for(const r of e.members)if(r.type instanceof ne)this._getStructInputs(r.type,t);else{const s=this._getInputInfo(r);s!==null&&t.push(s)}}_getInputInfo(e){const t=this._getAttribute(e,"location")||this._getAttribute(e,"builtin");if(t!==null){const r=this._getAttribute(e,"interpolation"),s=this._getTypeInfo(e.type,e.attributes),i=this._parseInt(t.value),o=new vs(e.name,s,t.name,i);return r!==null&&(o.interpolation=this._parseString(r.value)),o}return null}_parseString(e){return e instanceof Array&&(e=e[0]),e}_parseInt(e){e instanceof Array&&(e=e[0]);const t=parseInt(e);return isNaN(t)?e:t}_getAlias(e){for(const t of this.aliases)if(t.name==e)return t.type;return null}_getAliasInfo(e){return new xs(e.name,this._getTypeInfo(e.type,null))}_getTypeInfo(e,t){if(this._types.has(e))return this._types.get(e);if(e instanceof er){const s=e,i=this._getTypeInfo(s.format,s.attributes),o=new De(s.name,t);return o.format=i,o.count=s.count,this._types.set(e,o),this._updateTypeInfo(o),o}if(e instanceof ne){const s=e,i=new ze(s.name,t);i.startLine=s.startLine,i.endLine=s.endLine;for(const o of s.members){const h=this._getTypeInfo(o.type,o.attributes);i.members.push(new Et(o.name,h,o.attributes))}return this._types.set(e,i),this._updateTypeInfo(i),i}if(e instanceof ve){const s=e,i=s.format instanceof ae,o=s.format?i?this._getTypeInfo(s.format,null):new fe(s.format,null):null,h=new It(s.name,o,t,s.access);return this._types.set(e,h),this._updateTypeInfo(h),h}if(e instanceof Qt){const s=e,i=s.format?this._getTypeInfo(s.format,null):null,o=new It(s.name,i,t,s.access);return this._types.set(e,o),this._updateTypeInfo(o),o}const r=new fe(e.name,t);return this._types.set(e,r),this._updateTypeInfo(r),r}_updateTypeInfo(e){var t,r;const s=this._getTypeSize(e);if(e.size=(t=s==null?void 0:s.size)!==null&&t!==void 0?t:0,e instanceof De){const i=this._getTypeSize(e.format);e.stride=(r=i==null?void 0:i.size)!==null&&r!==void 0?r:0,this._updateTypeInfo(e.format)}e instanceof ze&&this._updateStructInfo(e)}_updateStructInfo(e){var t;let r=0,s=0,i=0,o=0;for(let h=0,f=e.members.length;h<f;++h){const d=e.members[h],p=this._getTypeSize(d);if(!p)continue;(t=this._getAlias(d.type.name))!==null&&t!==void 0||d.type;const _=p.align,m=p.size;r=this._roundUp(_,r+s),s=m,i=r,o=Math.max(o,_),d.offset=r,d.size=m,this._updateTypeInfo(d.type)}e.size=this._roundUp(o,i+s),e.align=o}_getTypeSize(e){var t;if(e==null)return null;const r=this._getAttributeNum(e.attributes,"size",0),s=this._getAttributeNum(e.attributes,"align",0);if(e instanceof Et&&(e=e.type),e instanceof fe){const i=this._getAlias(e.name);i!==null&&(e=i)}{const i=Z._typeInfo[e.name];if(i!==void 0){const o=e.format==="f16"?2:1;return new Ie(Math.max(s,i.align/o),Math.max(r,i.size/o))}}{const i=Z._typeInfo[e.name.substring(0,e.name.length-1)];if(i){const o=e.name[e.name.length-1]==="h"?2:1;return new Ie(Math.max(s,i.align/o),Math.max(r,i.size/o))}}if(e instanceof De){let i=e,o=8,h=8;const f=this._getTypeSize(i.format);f!==null&&(h=f.size,o=f.align);const d=i.count,p=this._getAttributeNum((t=e==null?void 0:e.attributes)!==null&&t!==void 0?t:null,"stride",this._roundUp(o,h));return h=d*p,r&&(h=r),new Ie(Math.max(s,o),Math.max(r,h))}if(e instanceof ze){let i=0,o=0,h=0,f=0,d=0;for(const p of e.members){const _=this._getTypeSize(p.type);_!==null&&(i=Math.max(_.align,i),h=this._roundUp(_.align,h+f),f=_.size,d=h)}return o=this._roundUp(i,d+f),new Ie(Math.max(s,i),Math.max(r,o))}return null}_isUniformVar(e){return e instanceof se&&e.storage=="uniform"}_isStorageVar(e){return e instanceof se&&e.storage=="storage"}_isTextureVar(e){return e instanceof se&&e.type!==null&&Z._textureTypes.indexOf(e.type.name)!=-1}_isSamplerVar(e){return e instanceof se&&e.type!==null&&Z._samplerTypes.indexOf(e.type.name)!=-1}_getAttribute(e,t){const r=e;if(!r||!r.attributes)return null;const s=r.attributes;for(let i of s)if(i.name==t)return i;return null}_getAttributeNum(e,t,r){if(e===null)return r;for(let s of e)if(s.name==t){let i=s!==null&&s.value!==null?s.value:r;return i instanceof Array&&(i=i[0]),typeof i=="number"?i:typeof i=="string"?parseInt(i):r}return r}_roundUp(e,t){return Math.ceil(t/e)*e}}Z._typeInfo={f16:{align:2,size:2},i32:{align:4,size:4},u32:{align:4,size:4},f32:{align:4,size:4},atomic:{align:4,size:4},vec2:{align:8,size:8},vec3:{align:16,size:12},vec4:{align:16,size:16},mat2x2:{align:8,size:16},mat3x2:{align:8,size:24},mat4x2:{align:8,size:32},mat2x3:{align:16,size:32},mat3x3:{align:16,size:48},mat4x3:{align:16,size:64},mat2x4:{align:16,size:32},mat3x4:{align:16,size:48},mat4x4:{align:16,size:64}};Z._textureTypes=a.any_texture_type.map(n=>n.name);Z._samplerTypes=a.sampler_type.map(n=>n.name);function le(n,e){return Object.fromEntries(e.map(t=>{const r=Fs(n,t,0);return[t.name,{typeDefinition:r,group:t.group,binding:t.binding,size:r.size}]}))}function sr(n,e,t){return{fields:Object.fromEntries(e.members.map(s=>[s.name,{offset:s.offset,type:ot(n,s.type,0)}])),size:e.size,offset:t}}function Ts(n){var e;if(n.name.includes("depth"))return"depth";switch((e=n.format)==null?void 0:e.name){case"f32":return"float";case"i32":return"sint";case"u32":return"uint";default:throw new Error("unknown texture sample type")}}function Pt(n){return n.name.includes("2d_array")?"2d-array":n.name.includes("cube_array")?"cube-array":n.name.includes("3d")?"3d":n.name.includes("1d")?"1d":n.name.includes("cube")?"cube":"2d"}function As(n){switch(n.access){case"read":return"read-only";case"write":return"write-only";case"read_write":return"read-write";default:throw new Error("unknonw storage texture access")}}function zs(n){return n.name.endsWith("_comparison")?"comparison":"filtering"}function Es(n,e){const{binding:t,access:r,type:s}=n;switch(n.resourceType){case V.Uniform:return{binding:t,visibility:e,buffer:{...n.size&&{minBindingSize:n.size}}};case V.Storage:return{binding:t,visibility:e,buffer:{type:r===""||r==="read"?"read-only-storage":"storage",...n.size&&{minBindingSize:n.size}}};case V.Texture:{if(s.name==="texture_external")return{binding:t,visibility:e,externalTexture:{}};const i=s.name.includes("multisampled");return{binding:t,visibility:e,texture:{sampleType:Ts(s),viewDimension:Pt(s),multisampled:i}}}case V.Sampler:return{binding:t,visibility:e,sampler:{type:zs(s)}};case V.StorageTexture:return{binding:t,visibility:e,storageTexture:{access:As(s),format:s.format.name,viewDimension:Pt(s)}};default:throw new Error("unknown resource type")}}function Ge(n,e){const t={};for(const r of n)t[r.name]={stage:e,resources:r.resources.map(s=>{const{name:i,group:o}=s;return{name:i,group:o,entry:Es(s,e)}})};return t}function Is(n){const e=new Z(n),t=Object.fromEntries(e.structs.map(p=>[p.name,sr(e,p,0)])),r=le(e,e.uniforms),s=le(e,e.storage.filter(p=>p.resourceType===V.Storage)),i=le(e,e.storage.filter(p=>p.resourceType===V.StorageTexture)),o=le(e,e.textures.filter(p=>p.type.name!=="texture_external")),h=le(e,e.textures.filter(p=>p.type.name==="texture_external")),f=le(e,e.samplers),d={...Ge(e.entry.vertex,GPUShaderStage.VERTEX),...Ge(e.entry.fragment,GPUShaderStage.FRAGMENT),...Ge(e.entry.compute,GPUShaderStage.COMPUTE)};return{externalTextures:h,samplers:f,structs:t,storages:s,storageTextures:i,textures:o,uniforms:r,entryPoints:d}}function We(n,e=""){if(!n)throw new Error(e)}function Fs(n,e,t){switch(e.resourceType){case V.Uniform:case V.Storage:case V.StorageTexture:return ot(n,e.type,t);default:return{size:0,type:e.type.name}}}function ot(n,e,t){if(e.isArray){We(!e.isStruct,"struct array is invalid"),We(!e.isStruct,"template array is invalid");const r=e;return{size:r.size,elementType:ot(n,r.format,t),numElements:r.count}}else{if(e.isStruct)return We(!e.isTemplate,"template struct is invalid"),sr(n,e,t);{const r=e,s=e.isTemplate?`${r.name}<${r.format.name}>`:e.name;return{size:e.size,type:s}}}}const Ps=new Map([[Int8Array,{formats:["sint8","snorm8"],defaultForType:1}],[Uint8Array,{formats:["uint8","unorm8"],defaultForType:1}],[Int16Array,{formats:["sint16","snorm16"],defaultForType:1}],[Uint16Array,{formats:["uint16","unorm16"],defaultForType:1}],[Int32Array,{formats:["sint32","snorm32"],defaultForType:0}],[Uint32Array,{formats:["uint32","unorm32"],defaultForType:0}],[Float32Array,{formats:["float32","float32"],defaultForType:0}]]);new Map([...Ps.entries()].map(([n,{formats:[e,t]}])=>[[e,n],[t,n]]).flat());const Us=n=>n.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]});function Vs(n){const e=Is($t),t=Xt(e.uniforms.flames),r=Us(n),s=n.createBuffer({size:4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),i=n.createBuffer({size:4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),o=n.createBuffer({size:4*3,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),h=n.createBuffer({size:4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),f=n.createBuffer({size:t.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),d=n.createBuffer({size:4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});return{bindgroup:n.createBindGroup({layout:r,entries:[{binding:0,resource:{buffer:s}},{binding:1,resource:{buffer:i}},{binding:2,resource:{buffer:o}},{binding:3,resource:{buffer:h}},{binding:4,resource:{buffer:f}},{binding:5,resource:{buffer:d}}]}),bindgroupLayout:r,flamesVariableDefinition:e.uniforms.flames,buffers:{gamma:s,logDensity:i,densityEstimation:o,antialiasing:h,flames:f,timeElapsed:d}}}function Ut(n){return{enabled:[n.enabled],color:{r:[n.color.r],g:[n.color.g],b:[n.color.b]},colorPaletteIdx:[n.colorPaletteIndex],weight:[n.weight],transform:{a:[n.transform.a],b:[n.transform.b],c:[n.transform.c],d:[n.transform.d],e:[n.transform.e],f:[n.transform.f]},variations:n.weightedVariations.map(e=>({weight:[e.weight],variation:[e.variation.id]}))}}function Ms(n,e,t,r){var i,o,h,f;const s=Xt(r.flamesVariableDefinition);s.set({resolution:[1920,1080],palette:{a:[e.namedPalette.palette.a.x,e.namedPalette.palette.a.y,e.namedPalette.palette.a.z],b:[e.namedPalette.palette.b.x,e.namedPalette.palette.b.y,e.namedPalette.palette.b.z],c:[e.namedPalette.palette.c.x,e.namedPalette.palette.c.y,e.namedPalette.palette.c.z],d:[e.namedPalette.palette.d.x,e.namedPalette.palette.d.y,e.namedPalette.palette.d.z]},gammaCorrection:e.gammaCorrection,densityEstimation:{enabled:[e.densityEstimation!=null],minsigma:[((i=e.densityEstimation)==null?void 0:i.minSigma)??0],maxsigma:[((o=e.densityEstimation)==null?void 0:o.maxSigma)??0]},antialiasing:[e.antialiasing?1:0],renderMode:[_n(e.renderMode)],spaceWarp:{zoom:[e.spaceWarp.zoom],rotationalSymmetry:[e.spaceWarp.rotationalSymmetry],mirrorX:[e.spaceWarp.mirrorX],mirrorY:[e.spaceWarp.mirrorY]},finalComponent:Ut(e.final),components:e.components.map(Ut)}),n.queue.writeBuffer(r.buffers.flames,0,s.arrayBuffer),n.queue.writeBuffer(r.buffers.timeElapsed,0,new Uint32Array([Date.now()])),n.queue.writeBuffer(t.buffers.heatmapMax,0,new Uint32Array([0])),n.queue.writeBuffer(r.buffers.gamma,0,new Float32Array([e.gammaCorrection])),n.queue.writeBuffer(r.buffers.logDensity,0,new Float32Array([+(e.renderMode!=at)])),n.queue.writeBuffer(r.buffers.densityEstimation,0,new Float32Array([e!=null&&e.densityEstimation?1:0,((h=e==null?void 0:e.densityEstimation)==null?void 0:h.minSigma)??0,((f=e==null?void 0:e.densityEstimation)==null?void 0:f.maxSigma)??0])),n.queue.writeBuffer(r.buffers.antialiasing,0,new Float32Array([e.antialiasing?1:0]))}function ue(n,e,t){return n.createComputePipeline({layout:e,compute:{module:n.createShaderModule({code:t}),entryPoint:"main"}})}var Cs=q('<canvas width="1920" height="1080" class="h-screen w-screen bg-black absolute top-0 left-0 -z-10"></canvas>');function Ns(n,e){me(e,!1);const t=Ne(),r=()=>de(O,"$flamesStore",t);let s,i={x:0,y:0},o,h,f,d,p,_,m,y,g,S,v,I,U=$();function P(A,M,D=1920,B=1080){A.setPipeline(M),A.setBindGroup(0,f.bindgroup),A.setBindGroup(1,d.bindgroup),A.dispatchWorkgroups(D/8,B/8)}async function k(A){Ms(p,s,f,d);let M=f.buffers.finalImage,D=p.createCommandEncoder({label:"Compute encoder"}),B=D.beginComputePass();P(B,m,16,16),P(B,y),s!=null&&s.antialiasing?P(B,S):P(B,g),s!=null&&s.densityEstimation&&(P(B,_),M=f.buffers.blurredImage),B.end(),D.copyBufferToBuffer(M,0,h,0,h.size),p.queue.submit([D.finish()]),await h.mapAsync(GPUMapMode.READ);const re=new Uint8ClampedArray(h.getMappedRange()),Ae=new ImageData(re,1920,1080);A.putImageData(Ae,0,0),h.unmap()}function x(){let A=p.createCommandEncoder({label:"Reset render data encoder"}),M=A.beginComputePass();P(M,I),M.end(),p.queue.submit([A.finish()])}async function X(A){!o||!s||await k(A)}async function ie(A,M){const D=M.getContext("2d");if(D===null){console.error("Failure to initialize the flames worker due to invaldie canvas context");return}p=await(await navigator.gpu.requestAdapter()).requestDevice(),f=Nn(p),d=Vs(p),h=p.createBuffer({size:1920*1080*4,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),v=p.createPipelineLayout({bindGroupLayouts:[f.bindgroupLayout,d.bindgroupLayout]}),m=ue(p,v,Vn),y=ue(p,v,Pn),S=ue(p,v,Fn),g=ue(p,v,Un),_=ue(p,v,$t),I=ue(p,v,Mn),i={x:M.width,y:M.height},s=A,o??(o=new Uint8ClampedArray(i.x*i.y*4)),requestAnimationFrame(re);async function re(){s!==void 0&&D&&await X(D),setTimeout(()=>requestAnimationFrame(re),1e3/60)}}function W(A){s=A,I&&x()}function Te(A){s=A}Ur(()=>{O.subscribe(A=>{switch(A.resetType){case"full":case"soft":W(A.flames);break;case"none":Te(A.flames);break}}),nt(Yt,w(U)),ie(r().flames,w(U))}),ge();var oe=Cs();Vr(oe,A=>H(U,A),()=>w(U)),N(n,oe),_e()}var qs=q('<button aria-label="Side panel On/Off" class="absolute top-0 left-0 pl-2 pt-4 hover:text-gray-700 cursor-pointer mr-4 border-none focus:outline-none svelte-1iolgnf"><svg width="32" height="24" class="svelte-1iolgnf"><line id="top" x1="0" y1="2" x2="32" y2="2" class="svelte-1iolgnf"></line><line id="middle" x1="0" y1="12" x2="24" y2="12" class="svelte-1iolgnf"></line><line id="bottom" x1="0" y1="22" x2="32" y2="22" class="svelte-1iolgnf"></line></svg></button>');function Bs(n,e){let t=Rt(e,"open",12,!1);var r=qs();J(()=>Ue(r,"open",t())),j("click",r,()=>t(!t())),N(n,r)}var Rs=q('<button class="block"><p> </p></button>'),Ls=q('<div><h2>Variations</h2> <div class="pl-6"><!> <div class="flex justify-center w-full my-6"><button class="block"><p class="bg-slate-700 py-1 px-4 rounded">NEW</p></button></div></div></div>');function Os(n,e){me(e,!1);const t=Ne(),r=()=>de(O,"$flamesStore",t);let s=$(st.map(_=>({variation:_,selected:Math.random()<.2})));w(s).some(_=>_.selected)||Ir(s,w(s)[0].selected=!0),i();function i(){Wt.update(_=>_.inferParameterFromFlames(r().flames).withVariations(w(s).filter(m=>m.selected).map(m=>m.variation.name)))}ge();var o=Ls(),h=z(E(o),2),f=E(h);Xe(f,1,()=>w(s),He,(_,m)=>{var y=Rs(),g=E(y),S=E(g,!0);T(g),T(y),J(()=>{Ue(g,"text-white",w(m).selected),Ue(g,"text-slate-600",!w(m).selected),$e(S,w(m).variation.name)}),j("click",y,()=>{w(m).selected=!w(m).selected,Ye(()=>w(s))}),N(_,y)});var d=z(f,2),p=E(d);T(d),T(h),T(o),j("click",p,()=>i()),N(n,o),_e()}var Ds=q("<option> </option>"),Gs=q("<option> </option>"),Ws=q('<div class="flex flex-col gap-2"><h2>Color</h2> <div class="flex flex-col gap-2 pl-6"><div class="flex"><span class="w-16">Palette</span> <select></select></div> <div class="flex"><span class="w-16">Mode</span> <select></select></div></div></div>');function Ys(n,e){me(e,!1);const t=Ne(),r=()=>de(O,"$flamesStore",t),s=()=>de(o,"$localStore",t);let i="w-32",o=Se({palette:r().flames.namedPalette,renderMode:r().flames.renderMode});o.subscribe(y=>{const g=r().flames;g.namedPalette=y.palette,g.renderMode=y.renderMode,nt(O,{flames:g,resetType:"none"})}),ge();var h=Ws(),f=z(E(h),2),d=E(f),p=z(E(d),2);J(()=>{s().palette,Ye(()=>{})}),gt(p,i),Xe(p,5,()=>Dt,He,(y,g)=>{var S=Ds(),v={},I=E(S,!0);T(S),J(()=>{v!==(v=w(g))&&(S.value=(S.__value=w(g))==null?"":w(g)),$e(I,w(g).name)}),N(y,S)}),T(p),T(d);var _=z(d,2),m=z(E(_),2);J(()=>{s().renderMode,Ye(()=>{})}),gt(m,i),Xe(m,5,()=>mn,He,(y,g)=>{var S=Gs(),v={},I=E(S,!0);T(S),J(()=>{v!==(v=w(g))&&(S.value=(S.__value=w(g))==null?"":w(g)),$e(I,w(g))}),N(y,S)}),T(m),T(_),T(f),T(h),yt(p,()=>s().palette,y=>ce(o,R(s).palette=y,R(s))),yt(m,()=>s().renderMode,y=>ce(o,R(s).renderMode=y,R(s))),N(n,h),_e()}var $s=q('<div class="flex flex-col gap-2"><h2>Space warping</h2> <div class="pl-6 flex flex-col gap-2"><div class="flex"><span class="w-28">Zoom</span> <input type="number" min="0" class="w-16"></div> <div class="flex"><span class="w-28">Space warping</span> <input type="number" min="1" class="w-16"></div> <label class="block"><input type="checkbox"> <span>Mirror X Axis</span></label> <label class="block"><input type="checkbox"> <span>Mirror Y Axis</span></label></div></div>');function Hs(n,e){me(e,!1);const t=Ne(),r=()=>de(O,"$flamesStore",t),s=()=>de(i,"$localStore",t);let i=Se({mirrorY:r().flames.spaceWarp.mirrorY,mirrorX:r().flames.spaceWarp.mirrorX,rotationalSymmetry:r().flames.spaceWarp.rotationalSymmetry,zoom:r().flames.spaceWarp.zoom});i.subscribe(v=>{const I=r().flames;I.spaceWarp={mirrorX:v.mirrorX,mirrorY:v.mirrorY,rotationalSymmetry:v.rotationalSymmetry,zoom:v.zoom},nt(O,{resetType:"soft",flames:I})}),ge();var o=$s(),h=z(E(o),2),f=E(h),d=z(E(f),2);K(d),T(f);var p=z(f,2),_=z(E(p),2);K(_),T(p);var m=z(p,2),y=E(m);K(y),Pe(2),T(m);var g=z(m,2),S=E(g);K(S),Pe(2),T(g),T(h),T(o),we(d,()=>s().zoom,v=>ce(i,R(s).zoom=v,R(s))),we(_,()=>s().rotationalSymmetry,v=>ce(i,R(s).rotationalSymmetry=v,R(s))),Ve(y,()=>s().mirrorX,v=>ce(i,R(s).mirrorX=v,R(s))),Ve(S,()=>s().mirrorY,v=>ce(i,R(s).mirrorY=v,R(s))),N(n,o),_e()}var Xs=q('<div class="flex flex-col gap-2"><h2>Quality enhancement</h2> <div class="flex flex-col gap-2 pl-6"><label class="block"><span>Gamma correction</span> <input type="number" class="w-16"></label> <label class="block"><input type="checkbox"> <span>Anti aliasing</span></label> <label class="block"><input type="checkbox"> <span>Density estimation</span></label> <div class="flex flex-col gap-2 pl-6"><div class="flex"><span class="w-24">Min sigma</span> <input type="number" min="0" class="w-16"></div> <div class="flex"><span class="w-24">Max sigma</span> <input type="number" class="w-16"></div></div></div></div>');function js(n,e){me(e,!1);let t=$(.454545),r=$(!1),s=$(!1),i=$(0),o=$(.7);function h(){let x=null;w(r)&&(x={minSigma:w(i),maxSigma:w(o)}),O.update(X=>(X.flames.densityEstimation=x,X.resetType="none",X))}ge();var f=Xs(),d=z(E(f),2),p=E(d),_=z(E(p),2);K(_),te(_,"min",.1),te(_,"step",.1),T(p);var m=z(p,2),y=E(m);K(y),Pe(2),T(m);var g=z(m,2),S=E(g);K(S),Pe(2),T(g);var v=z(g,2),I=E(v),U=z(E(I),2);K(U),T(I);var P=z(I,2),k=z(E(P),2);K(k),T(P),T(v),T(d),T(f),J(()=>{te(U,"max",w(o)-1),te(k,"min",w(i)+1)}),we(_,()=>w(t),x=>H(t,x)),j("change",_,()=>O.update(x=>(x.flames.gammaCorrection=w(t),x.resetType="none",x))),Ve(y,()=>w(s),x=>H(s,x)),j("change",y,()=>O.update(x=>(x.flames.antialiasing=w(s),x.resetType="none",x))),Ve(S,()=>w(r),x=>H(r,x)),j("change",S,h),we(U,()=>w(i),x=>H(i,x)),j("change",U,h),we(k,()=>w(o),x=>H(o,x)),j("change",k,h),N(n,f),_e()}var Ks=q('<div><h2>Download</h2> <div class="flex flex-col gap-2 pl-6"><a class="w-min">Metadata</a> <button class="w-min">Image</button></div></div>');function Js(n,e){me(e,!1);let t=$(""),r=$("flames.metadata.json"),s;Yt.subscribe(_=>s=_),O.subscribe(_=>{i(_.flames)});function i(_){const m=new Blob([JSON.stringify(_,null,4)],{type:"application/json"});H(t,URL.createObjectURL(m)),H(r,"flames.metadata.json")}function o(){if(!s)return;const _=document.createElement("a");_.download="flames.png",_.href=s.toDataURL(),_.click()}ge();var h=Ks(),f=z(E(h),2),d=E(f),p=z(d,2);T(f),T(h),J(()=>{te(d,"href",w(t)),te(d,"download",w(r))}),j("click",p,()=>o()),N(n,h),_e()}var Zs=q('<aside class="absolute top-0 w-72 h-full bg-slate-700/25 shadow-lg scroll-smooth overflow-y-auto svelte-1oyje6d"><div class="flex flex-col gap-4 pl-6 pt-12"><!> <!> <!> <!> <!></div></aside>');function Qs(n,e){let t=Rt(e,"open",8,!1);var r=Zs(),s=E(r),i=E(s);Js(i,{});var o=z(i,2);js(o,{});var h=z(o,2);Hs(h,{});var f=z(h,2);Ys(f,{});var d=z(f,2);Os(d,{}),T(s),T(r),J(()=>Ue(r,"open",t())),N(n,r)}var ea=q("<!> <!> <!> <!>",1);function ua(n){let e=$(!0);var t=ea(),r=Fr(t);Ns(r,{});var s=z(r,2);Qs(s,{get open(){return w(e)},set open(h){H(e,h)},$$legacy:!0});var i=z(s,2);Bs(i,{get open(){return w(e)},set open(h){H(e,h)},$$legacy:!0});var o=z(i,2);Dr(o),N(n,t)}export{ua as component};
