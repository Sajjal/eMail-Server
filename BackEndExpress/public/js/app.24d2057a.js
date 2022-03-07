(()=>{"use strict";var e={2318:(e,t,r)=>{r(5363),r(71);var o=r(8880),n=r(8834),a=r(3673);function i(e,t,r,o,n,i){const s=(0,a.up)("router-view");return(0,a.wg)(),(0,a.j4)(s)}const s=(0,a.aZ)({name:"App"});var u=r(4260);const l=(0,u.Z)(s,[["render",i]]),c=l;var d=r(4584),p=r(7083),m=r(9582),f=r(52),h=r.n(f);const b="/",g=async(e,t,r)=>{try{await h().post(`${b}authorize`,{});d["default"].dispatch("updateLoginStatus",!0),r()}catch(o){d["default"].dispatch("updateLoginStatus",!1),r({name:"Login"})}},v=(e,t,r)=>{d["default"].state.isLoggedIn?r({name:"Index"}):r()},y=[{path:"/",component:()=>Promise.all([r.e(736),r.e(121)]).then(r.bind(r,2121)),children:[{path:"",name:"Index",beforeEnter:g,component:()=>Promise.all([r.e(736),r.e(472)]).then(r.bind(r,4472))},{path:"/login",name:"Login",beforeEnter:v,component:()=>Promise.all([r.e(736),r.e(949)]).then(r.bind(r,3949))},{path:"/compose",name:"Compose",beforeEnter:g,component:()=>Promise.all([r.e(736),r.e(297)]).then(r.bind(r,2297))}]},{path:"/:catchAll(.*)*",component:()=>Promise.all([r.e(736),r.e(472)]).then(r.bind(r,4472))}],w=y,P=(0,p.BC)((function(){const e=m.PO,t=(0,m.p7)({scrollBehavior:()=>({left:0,top:0}),routes:w,history:e("/")});return t}));async function C(e,t){const o="function"===typeof d["default"]?await(0,d["default"])({}):d["default"],{storeKey:a}=await Promise.resolve().then(r.bind(r,4584)),i="function"===typeof P?await P({store:o}):P;o.$router=i;const s=e(c);return s.use(n.Z,t),{app:s,store:o,storeKey:a,router:i}}const k={config:{}},O="/";async function L({app:e,router:t,store:r,storeKey:o},n){let a=!1;const i=e=>{try{return t.resolve(e).href}catch(r){}return Object(e)===e?null:e},s=e=>{if(a=!0,"string"===typeof e&&/^https?:\/\//.test(e))return void(window.location.href=e);const t=i(e);null!==t&&(window.location.href=t)},u=window.location.href.replace(window.location.origin,"");for(let c=0;!1===a&&c<n.length;c++)try{await n[c]({app:e,router:t,store:r,ssrContext:null,redirect:s,urlPath:u,publicPath:O})}catch(l){return l&&l.url?void s(l.url):void console.error("[Quasar] boot error:",l)}!0!==a&&(e.use(t),e.use(r,o),e.mount("#q-app"))}C(o.ri,k).then((e=>Promise.all([Promise.resolve().then(r.bind(r,5474))]).then((t=>{const r=t.map((e=>e.default)).filter((e=>"function"===typeof e));L(e,r)}))))},5474:(e,t,r)=>{r.r(t),r.d(t,{api:()=>i,default:()=>s});var o=r(7083),n=r(52),a=r.n(n);const i=a().create({baseURL:"https://api.example.com"}),s=(0,o.xr)((({app:e})=>{e.config.globalProperties.$axios=a(),e.config.globalProperties.$api=i}))},4584:(e,t,r)=>{r.r(t),r.d(t,{default:()=>n});var o=r(3617);const n=(0,o.MT)({state:{leftDrawerOpen:!1,count:0,emails:[],isLoggedIn:!1,currentPage:"Inbox",editMode:"Compose",currentMessage:{},skip:0,limit:10},mutations:{openCloseSidebar(e,t){e.leftDrawerOpen=t},updateLoginStatus(e,t){e.isLoggedIn=t},updateEmails(e,t){e.emails=t.emails,e.count=t.count},updateSkipLimit(e,t){e.skip=t.skip,e.limit=t.limit},updateCurrentMessage(e,t){e.currentMessage=t},updateEditMode(e,t){e.editMode=t},updateCurrentPage(e,t){e.currentPage=t}},actions:{openCloseSidebar({commit:e},t){e("openCloseSidebar",t)},updateLoginStatus({commit:e},t){e("updateLoginStatus",t)},updateEmails({commit:e},t){e("updateEmails",t)},updateSkipLimit({commit:e},t){e("updateSkipLimit",t)},updateCurrentMessage({commit:e},t){e("updateCurrentMessage",t)},updateEditMode({commit:e},t){e("updateEditMode",t)},updateCurrentPage({commit:e},t){e("updateCurrentPage",t)}},strict:!1})}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var a=t[o]={exports:{}};return e[o].call(a.exports,a,a.exports,r),a.exports}r.m=e,(()=>{var e=[];r.O=(t,o,n,a)=>{if(!o){var i=1/0;for(c=0;c<e.length;c++){for(var[o,n,a]=e[c],s=!0,u=0;u<o.length;u++)(!1&a||i>=a)&&Object.keys(r.O).every((e=>r.O[e](o[u])))?o.splice(u--,1):(s=!1,a<i&&(i=a));if(s){e.splice(c--,1);var l=n();void 0!==l&&(t=l)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[o,n,a]}})(),(()=>{r.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return r.d(t,{a:t}),t}})(),(()=>{r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}})(),(()=>{r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,o)=>(r.f[o](e,t),t)),[]))})(),(()=>{r.u=e=>"js/"+e+"."+{121:"42956779",297:"7a3c4e7b",472:"16eb3fa3",949:"96fbb235"}[e]+".js"})(),(()=>{r.miniCssF=e=>"css/"+{143:"app",736:"vendor"}[e]+"."+{143:"31d6cfe0",736:"9add3052"}[e]+".css"})(),(()=>{r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="email-server:";r.l=(o,n,a,i)=>{if(e[o])e[o].push(n);else{var s,u;if(void 0!==a)for(var l=document.getElementsByTagName("script"),c=0;c<l.length;c++){var d=l[c];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==t+a){s=d;break}}s||(u=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,r.nc&&s.setAttribute("nonce",r.nc),s.setAttribute("data-webpack",t+a),s.src=o),e[o]=[n];var p=(t,r)=>{s.onerror=s.onload=null,clearTimeout(m);var n=e[o];if(delete e[o],s.parentNode&&s.parentNode.removeChild(s),n&&n.forEach((e=>e(r))),t)return t(r)},m=setTimeout(p.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=p.bind(null,s.onerror),s.onload=p.bind(null,s.onload),u&&document.head.appendChild(s)}}})(),(()=>{r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{r.p="/"})(),(()=>{var e={143:0};r.f.j=(t,o)=>{var n=r.o(e,t)?e[t]:void 0;if(0!==n)if(n)o.push(n[2]);else{var a=new Promise(((r,o)=>n=e[t]=[r,o]));o.push(n[2]=a);var i=r.p+r.u(t),s=new Error,u=o=>{if(r.o(e,t)&&(n=e[t],0!==n&&(e[t]=void 0),n)){var a=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",s.name="ChunkLoadError",s.type=a,s.request=i,n[1](s)}};r.l(i,u,"chunk-"+t,t)}},r.O.j=t=>0===e[t];var t=(t,o)=>{var n,a,[i,s,u]=o,l=0;if(i.some((t=>0!==e[t]))){for(n in s)r.o(s,n)&&(r.m[n]=s[n]);if(u)var c=u(r)}for(t&&t(o);l<i.length;l++)a=i[l],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(c)},o=self["webpackChunkemail_server"]=self["webpackChunkemail_server"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var o=r.O(void 0,[736],(()=>r(2318)));o=r.O(o)})();