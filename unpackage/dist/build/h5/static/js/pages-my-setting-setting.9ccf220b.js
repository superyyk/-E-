(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-setting-setting"],{"35fb":function(t,n,e){"use strict";e.r(n);var i=e("ff68"),u=e.n(i);for(var c in i)"default"!==c&&function(t){e.d(n,t,(function(){return i[t]}))}(c);n["default"]=u.a},9985:function(t,n,e){"use strict";var i;e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return i}));var u=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",[e("v-uni-view",{staticClass:"u-f-dr u-f-jsb p-15 b-s-1 u-f-ac m-8",staticStyle:{"background-color":"#FFFFFF"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.login_out.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"u-f-ac"},[e("v-uni-image",{staticStyle:{width:"30px",height:"30px"},attrs:{src:t.getImgsrc("退出.png"),mode:"aspectFill"}}),e("v-uni-text",{staticClass:"m-l-10"},[t._v("退出登录")])],1),e("v-uni-view",[e("v-uni-image",{staticStyle:{width:"20px"},attrs:{src:t.getImgsrc("gengduo.png"),mode:"widthFix"}})],1)],1)],1)},c=[]},da43:function(t,n,e){"use strict";e.r(n);var i=e("9985"),u=e("35fb");for(var c in u)"default"!==c&&function(t){e.d(n,t,(function(){return u[t]}))}(c);var a,r=e("f0c5"),s=Object(r["a"])(u["default"],i["b"],i["c"],!1,null,"74eea630",null,!1,i["a"],a);n["default"]=s.exports},ff68:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{}},methods:{login_out:function(){uni.showModal({title:"提示",content:"确认退出登陆吗？",success:function(n){n.confirm&&uni.removeStorage({key:"user_uuid",success:function(n){t.log("退出成功"),uni.reLaunch({url:"../../index/index"})}})}})}}};n.default=e}).call(this,e("5a52")["default"])}}]);