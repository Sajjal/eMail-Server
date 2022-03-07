"use strict";(self["webpackChunkemail_server"]=self["webpackChunkemail_server"]||[]).push([[121],{482:(a,t,e)=>{e.d(t,{Z:()=>p});var s=e(1959),l=e(52),u=e.n(l),n=e(9582),o=e(4584);const d=()=>{const a=(0,s.iH)(""),t=(0,s.iH)(null),e="/",l=(0,n.tv)(),d=async(a,s)=>{try{const l=await u().post(`${e}${a}`,s);o["default"].dispatch("updateEmails",{emails:l.data.data,count:l.data.count}),t.value=null,l.data||(t.value="No Data Available!")}catch(n){"401"!=n.response.status&&"429"!=n.response.status||(o["default"].dispatch("updateLoginStatus",!1),l.push({name:"Login"})),t.value="No Data Available!"}},p=async a=>{try{await u().post(`${e}toTrash`,a),l.push({name:"Login"})}catch(t){"401"!=t.response.status&&"429"!=t.response.status||(o["default"].dispatch("updateLoginStatus",!1),l.push({name:"Login"}))}},i=async a=>{try{await u().post(`${e}addStar`,a),l.push({name:"Login"})}catch(t){"401"!=t.response.status&&"429"!=t.response.status||(o["default"].dispatch("updateLoginStatus",!1),l.push({name:"Login"}))}},r=async a=>{try{await u().post(`${e}removeStar`,a),l.push({name:"Login"})}catch(t){"401"!=t.response.status&&"429"!=t.response.status||(o["default"].dispatch("updateLoginStatus",!1),l.push({name:"Login"}))}},m=async a=>{try{await u().post(`${e}markAsRead`,a),l.push({name:"Login"})}catch(t){"401"!=t.response.status&&"429"!=t.response.status||(o["default"].dispatch("updateLoginStatus",!1),l.push({name:"Login"}))}},c=async a=>{try{const s=await u().post(`${e}search`,a);t.value=null,o["default"].dispatch("updateCurrentMessage",s.data.data[0]),s.data||(t.value="No Data Available!")}catch(s){"401"!=s.response.status&&"429"!=s.response.status||(o["default"].dispatch("updateLoginStatus",!1),l.push({name:"Login"})),t.value="No Data Available!"}},h=async a=>{try{await u().post(`${e}sent`,a),o["default"].dispatch("updateCurrentPage","Sent"),l.push({name:"Index"})}catch(t){"401"!=t.response.status&&"429"!=t.response.status||(o["default"].dispatch("updateLoginStatus",!1),l.push({name:"Login"}))}},f=async t=>{try{await u().post(`${e}login`,t);a.value="",o["default"].dispatch("updateLoginStatus",!0),l.push({name:"Index"})}catch(s){a.value=s.response.data.Error}},g=async()=>{try{await u().post(`${e}logout`,{});o["default"].dispatch("updateLoginStatus",!1),l.push({name:"Login"})}catch(a){o["default"].dispatch("updateLoginStatus",!1),l.push({name:"Login"})}};return{error:t,loginError:a,load:d,fullEmail:c,addStar:i,removeStar:r,markAsRead:m,toTrash:p,sendMail:h,login:f,logout:g}},p=d},2121:(a,t,e)=>{e.r(t),e.d(t,{default:()=>V});var s=e(3673),l=e(1959),u=e(9582),n=e(3617),o=e(482);const d={class:"q-pa-sm text-bold bg-grey-3 text-grey-7 q-pl-lg",style:{"font-size":"16px"}},p=(0,s.Uk)(" CATEGORIES"),i=(0,s.Uk)("Inbox"),r=(0,s.Uk)("Starred"),m=(0,s.Uk)("Sent"),c=(0,s.Uk)("Trash"),h=(0,s.Uk)("Logout"),f={setup(a){const t=(0,n.oR)(),e=(0,u.tv)(),{logout:f}=(0,o.Z)();function g(a){if(a!=t.state.currentPage){if(t.dispatch("updateCurrentPage",a),t.dispatch("updateSkipLimit",{skip:0,limit:10}),t.dispatch("updateCurrentMessage",{}),t.dispatch("updateEditMode","Compose"),t.dispatch("openCloseSidebar",!1),"Compose"==a)return e.push({name:"Compose"});e.push({name:"Index"})}}return(a,t)=>{const e=(0,s.up)("q-item-label"),u=(0,s.up)("q-item-section"),n=(0,s.up)("q-btn"),o=(0,s.up)("q-item"),w=(0,s.up)("q-icon"),W=(0,s.up)("q-separator"),v=(0,s.up)("q-list");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("div",d,[(0,s.Wm)(o,null,{default:(0,s.w5)((()=>[(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[(0,s.Wm)(e,null,{default:(0,s.w5)((()=>[p])),_:1})])),_:1}),(0,s.Wm)(u,{side:""},{default:(0,s.w5)((()=>[(0,s.Wm)(n,{round:"",color:"grey-10",icon:"edit",size:"sm",onClick:t[0]||(t[0]=a=>g("Compose"))})])),_:1})])),_:1})]),(0,s._)("div",null,[(0,s.Wm)(v,{class:"text-bold q-mt-sm",style:{"font-size":"16px"}},{default:(0,s.w5)((()=>[(0,s.Wm)(o,{clickable:"",onClick:t[1]||(t[1]=a=>g("Inbox"))},{default:(0,s.w5)((()=>[(0,s.Wm)(u,{avatar:"",class:"q-ml-lg"},{default:(0,s.w5)((()=>[(0,s.Wm)(w,{name:"mail",size:"sm"})])),_:1}),(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[i])),_:1})])),_:1}),(0,s.Wm)(W,{spaced:""}),(0,s.Wm)(o,{clickable:"",onClick:t[2]||(t[2]=a=>g("Starred"))},{default:(0,s.w5)((()=>[(0,s.Wm)(u,{avatar:"",class:"q-ml-lg"},{default:(0,s.w5)((()=>[(0,s.Wm)(w,{name:"star",size:"sm"})])),_:1}),(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[r])),_:1})])),_:1}),(0,s.Wm)(W,{spaced:""}),(0,s.Wm)(o,{clickable:"",onClick:t[3]||(t[3]=a=>g("Sent"))},{default:(0,s.w5)((()=>[(0,s.Wm)(u,{avatar:"",class:"q-ml-lg"},{default:(0,s.w5)((()=>[(0,s.Wm)(w,{name:"send",size:"sm"})])),_:1}),(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[m])),_:1})])),_:1}),(0,s.Wm)(W,{spaced:""}),(0,s.Wm)(o,{clickable:"",onClick:t[4]||(t[4]=a=>g("Trash"))},{default:(0,s.w5)((()=>[(0,s.Wm)(u,{avatar:"",class:"q-ml-lg"},{default:(0,s.w5)((()=>[(0,s.Wm)(w,{name:"delete",size:"sm"})])),_:1}),(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[c])),_:1})])),_:1}),(0,s.Wm)(W,{spaced:""}),(0,s.Wm)(o,{clickable:"",onClick:(0,l.SU)(f)},{default:(0,s.w5)((()=>[(0,s.Wm)(u,{avatar:"",class:"q-ml-lg"},{default:(0,s.w5)((()=>[(0,s.Wm)(w,{name:"logout",size:"sm"})])),_:1}),(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[h])),_:1})])),_:1},8,["onClick"]),(0,s.Wm)(W,{spaced:""})])),_:1})])],64)}}};var g=e(3414),w=e(2035),W=e(2350),v=e(6819),q=e(7011),_=e(4554),b=e(5869),y=e(7518),S=e.n(y);const k=f,L=k;S()(f,"components",{QItem:g.Z,QItemSection:w.Z,QItemLabel:W.Z,QBtn:v.Z,QList:q.Z,QIcon:_.Z,QSeparator:b.Z});const Q={class:"q-py-sm"};function C(a,t){const e=(0,s.up)("q-skeleton"),l=(0,s.up)("q-item-section"),u=(0,s.up)("q-item"),n=(0,s.up)("q-separator");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("div",Q,[(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[(0,s.Wm)(l,null,{default:(0,s.w5)((()=>[(0,s.Wm)(e,{type:"QToolbar"})])),_:1}),(0,s.Wm)(l,{side:""},{default:(0,s.w5)((()=>[(0,s.Wm)(e,{type:"QRadio",height:"50px",width:"50px"})])),_:1})])),_:1})]),(0,s.Wm)(n,{spaced:""}),(0,s._)("div",null,[(0,s.Wm)(e,{type:"QToolbar",class:"q-mx-md"}),(0,s.Wm)(n,{spaced:""}),(0,s.Wm)(e,{type:"QToolbar",class:"q-mx-md"}),(0,s.Wm)(n,{spaced:""}),(0,s.Wm)(e,{type:"QToolbar",class:"q-mx-md"}),(0,s.Wm)(n,{spaced:""}),(0,s.Wm)(e,{type:"QToolbar",class:"q-mx-md"}),(0,s.Wm)(n,{spaced:""}),(0,s.Wm)(e,{type:"QToolbar",class:"q-mx-md"})])],64)}var x=e(4260),Z=e(4103);const I={},T=(0,x.Z)(I,[["render",C]]),D=T;S()(I,"components",{QItem:g.Z,QItemSection:w.Z,QSkeleton:Z.ZP,QSeparator:b.Z});const $=(0,s._)("img",{src:"logo.png"},null,-1),z=(0,s._)("div",{class:"text-center q-pa-sm"},[(0,s._)("span",{class:"q-ml-md"}," S & D Email Server | github.com/Sajjal ")],-1),E={setup(a){(0,l.iH)(!1);const t=(0,u.tv)(),e=(0,n.oR)(),o=(0,l.iH)(!1);function d(){o.value=!o.value,e.dispatch("openCloseSidebar",o.value)}function p(){e.dispatch("updateCurrentPage","Inbox"),t.push({name:"Index"})}return(0,s.YP)((()=>e.state.leftDrawerOpen),(function(){o.value=e.state.leftDrawerOpen})),(a,t)=>{const u=(0,s.up)("q-btn"),n=(0,s.up)("q-avatar"),i=(0,s.up)("q-toolbar-title"),r=(0,s.up)("q-toolbar"),m=(0,s.up)("q-header"),c=(0,s.up)("q-drawer"),h=(0,s.up)("router-view"),f=(0,s.up)("q-page-container"),g=(0,s.up)("q-footer"),w=(0,s.up)("q-layout");return(0,s.wg)(),(0,s.j4)(w,{view:"hHh lpR fFf"},{default:(0,s.w5)((()=>[(0,s.Wm)(m,{class:"bg-accent text-white"},{default:(0,s.w5)((()=>[(0,s.Wm)(r,null,{default:(0,s.w5)((()=>[(0,s.Wm)(u,{dense:"",flat:"",round:"",icon:"menu",onClick:d,class:"lt-md"}),(0,s.Wm)(i,{class:"q-pa-md"},{default:(0,s.w5)((()=>[(0,s.Wm)(n,{class:"q-mb-sm q-mr-md",square:"",size:"30px",style:{cursor:"pointer"},onClick:p},{default:(0,s.w5)((()=>[$])),_:1}),(0,s._)("span",{style:{cursor:"pointer"},onClick:p}," S & D Email Server ")])),_:1})])),_:1})])),_:1}),(0,s.Wm)(c,{"show-if-above":"",width:300,modelValue:o.value,"onUpdate:modelValue":t[0]||(t[0]=a=>o.value=a),side:"left",bordered:""},{default:(0,s.w5)((()=>[(0,l.SU)(e).state.isLoggedIn?((0,s.wg)(),(0,s.j4)(L,{key:0})):((0,s.wg)(),(0,s.j4)(D,{key:1}))])),_:1},8,["modelValue"]),(0,s.Wm)(f,{class:"q-px-sm q-mb-md"},{default:(0,s.w5)((()=>[(0,s.Wm)(h)])),_:1}),(0,s.Wm)(g,{class:"bg-grey-8 text-white"},{default:(0,s.w5)((()=>[z])),_:1})])),_:1})}}};var U=e(9214),A=e(3812),H=e(9570),P=e(3747),R=e(5096),j=e(2901),M=e(2652),N=e(1762);const O=E,V=O;S()(E,"components",{QLayout:U.Z,QHeader:A.Z,QToolbar:H.Z,QBtn:v.Z,QToolbarTitle:P.Z,QAvatar:R.Z,QDrawer:j.Z,QPageContainer:M.Z,QFooter:N.Z})}}]);