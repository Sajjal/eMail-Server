(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{ad50:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("q-list",{attrs:{dark:"",separator:""}},[t.emails.length<1?i("q-banner",{staticClass:"bg-grey-4 text-black",attrs:{dense:"",rounded:""},scopedSlots:t._u([{key:"avatar",fn:function(){return[i("q-icon",{attrs:{name:"report"}})]},proxy:!0}],null,!1,1502172075)},[t._v("\n      No Data Available.\n    ")]):i("div",[i("q-infinite-scroll",{attrs:{offset:250},on:{load:t.onLoad},scopedSlots:t._u([{key:"loading",fn:function(){return[i("div",{staticClass:"row justify-center q-my-md"},[i("q-spinner-dots",{attrs:{color:"primary",size:"40px"}})],1)]},proxy:!0}])},t._l(t.emails,(function(e){return i("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:e._id,attrs:{clickable:""}},[i("q-item-section",{on:{click:function(i){return t.handleClick(e._id)}}},[i("q-item-label",[t._v("\n              "+t._s(e.from)+"\n              "),t.$q.screen.width>450?i("span",{staticClass:"absolute-right q-pa-sm text-caption"},[t._v(" "+t._s(new Date(e.date).toLocaleString()))]):t._e()]),t.$q.screen.width<=450?i("q-item-label",{attrs:{caption:""}},[t._v(t._s(new Date(e.date).toLocaleString()))]):t._e(),i("q-item-label",{attrs:{caption:""}},[t._v(" "+t._s(e.subject))])],1)],1)})),1)],1)],1)],1)},s=[],r=(i("e6cf"),i("ddb0"),i("3299")),l={data(){return{emails:[],limit:20,skip:10}},mounted(){this.limit=20,this.skip=10,this.$store.state.emails.data&&(this.emails=this.$store.state.emails.data)},methods:{async handleClick(t){let e=this.$route.name;"Search"==e&&(e=this.$route.params.directory),await Object(r["a"])().getSingleEmail(e,t),this.$router.push({name:"Email"})},async onLoad(t,e){let i="",a="",s="",l="",n=this.$route.name,o=this.$store.state.search.searchTerm;return i=this.$store.state.emails.data.length,a=this.$store.state.emails.count,i<a?(o?(n=this.$store.state.search.directory,l=await Object(r["a"])().getEmails("search",{directory:n,searchTerm:o,skip:this.skip,limit:this.limit,scroll:!0}),s=[...this.$store.state.emails.data,...l.data.data],this.emails=s,this.$store.dispatch("updateEmailList",s),this.skip=this.limit,this.limit=this.limit+10):(l=await Object(r["a"])().getEmails("emails",{directory:n,skip:this.skip,limit:this.limit,scroll:!0}),s=[...this.$store.state.emails.data,...l.data],this.emails=s,this.$store.dispatch("updateEmailList",s),this.skip=this.limit,this.limit=this.limit+10),e()):e()}}},n=l,o=i("2877"),c=i("1c1c"),m=i("54e1"),d=i("0016"),h=i("ef35"),p=i("66e5"),u=i("4074"),b=i("0170"),f=i("8380"),k=i("714f"),_=i("eebe"),$=i.n(_),v=Object(o["a"])(n,a,s,!1,null,null,null);e["default"]=v.exports;$()(v,"components",{QList:c["a"],QBanner:m["a"],QIcon:d["a"],QInfiniteScroll:h["a"],QItem:p["a"],QItemSection:u["a"],QItemLabel:b["a"],QSpinnerDots:f["a"]}),$()(v,"directives",{Ripple:k["a"]})}}]);