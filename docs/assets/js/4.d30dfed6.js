(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{169:function(t,e,n){},170:function(t,e,n){},172:function(t,e,n){t.exports=function(){"use strict";var t="minute",e=/[+-]\d\d(?::?\d\d)?/g,n=/([+-]|\d\d)/g;return function(i,r,s){var o=r.prototype;s.utc=function(t){var e={date:t,utc:!0,args:arguments};return new r(e)},o.utc=function(e){var n=s(this.toDate(),{locale:this.$L,utc:!0});return e?n.add(this.utcOffset(),t):n},o.local=function(){return s(this.toDate(),{locale:this.$L,utc:!1})};var a=o.parse;o.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),a.call(this,t)};var u=o.init;o.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds()}else u.call(this)};var c=o.utcOffset;o.utcOffset=function(i,r){var s=this.$utils().u;if(s(i))return this.$u?0:s(this.$offset)?c.call(this):this.$offset;if("string"==typeof i&&null===(i=function(t){void 0===t&&(t="");var i=t.match(e);if(!i)return null;var r=(""+i[0]).match(n)||["-",0,0],s=r[0],o=60*+r[1]+ +r[2];return 0===o?0:"+"===s?o:-o}(i)))return this;var o=Math.abs(i)<=16?60*i:i,a=this;if(r)return a.$offset=o,a.$u=0===i,a;if(0!==i){var u=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(a=this.local().add(o+u,t)).$offset=o,a.$x.$localOffset=u}else a=this.utc();return a};var p=o.format;o.format=function(t){var e=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return p.call(this,e)},o.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||(new Date).getTimezoneOffset());return this.$d.valueOf()-6e4*t},o.isUTC=function(){return!!this.$u},o.toISOString=function(){return this.toDate().toISOString()},o.toString=function(){return this.toDate().toUTCString()};var l=o.toDate;o.toDate=function(t){return"s"===t&&this.$offset?s(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():l.call(this)};var f=o.diff;o.diff=function(t,e,n){if(t&&this.$u===t.$u)return f.call(this,t,e,n);var i=this.local(),r=s(t).local();return f.call(i,r,e,n)}}}()},173:function(t,e,n){"use strict";n(169)},174:function(t,e,n){"use strict";n(170)},175:function(t,e,n){var i=n(67),r=n(60),s=n(176),o=n(180);t.exports=function(t,e){if(null==t)return{};var n=i(o(t),(function(t){return[t]}));return e=r(e),s(t,n,(function(t,n){return e(t,n[0])}))}},176:function(t,e,n){var i=n(33),r=n(177),s=n(28);t.exports=function(t,e,n){for(var o=-1,a=e.length,u={};++o<a;){var c=e[o],p=i(t,c);n(p,c)&&r(u,s(c,t),p)}return u}},177:function(t,e,n){var i=n(178),r=n(28),s=n(31),o=n(19),a=n(12);t.exports=function(t,e,n,u){if(!o(t))return t;for(var c=-1,p=(e=r(e,t)).length,l=p-1,f=t;null!=f&&++c<p;){var h=a(e[c]),m=n;if("__proto__"===h||"constructor"===h||"prototype"===h)return t;if(c!=l){var v=f[h];void 0===(m=u?u(v,h,f):void 0)&&(m=o(v)?v:s(e[c+1])?[]:{})}i(f,h,m),f=f[h]}return t}},178:function(t,e,n){var i=n(179),r=n(30),s=Object.prototype.hasOwnProperty;t.exports=function(t,e,n){var o=t[e];s.call(t,e)&&r(o,n)&&(void 0!==n||e in t)||i(t,e,n)}},179:function(t,e,n){var i=n(68);t.exports=function(t,e,n){"__proto__"==e&&i?i(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n}},180:function(t,e,n){var i=n(61),r=n(181),s=n(183);t.exports=function(t){return i(t,s,r)}},181:function(t,e,n){var i=n(29),r=n(182),s=n(62),o=n(63),a=Object.getOwnPropertySymbols?function(t){for(var e=[];t;)i(e,s(t)),t=r(t);return e}:o;t.exports=a},182:function(t,e,n){var i=n(66)(Object.getPrototypeOf,Object);t.exports=i},183:function(t,e,n){var i=n(64),r=n(184),s=n(32);t.exports=function(t){return s(t)?i(t,!0):r(t)}},184:function(t,e,n){var i=n(19),r=n(65),s=n(185),o=Object.prototype.hasOwnProperty;t.exports=function(t){if(!i(t))return s(t);var e=r(t),n=[];for(var a in t)("constructor"!=a||!e&&o.call(t,a))&&n.push(a);return n}},185:function(t,e){t.exports=function(t){var e=[];if(null!=t)for(var n in Object(t))e.push(n);return e}},186:function(t,e,n){"use strict";n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return f}));var i={data:()=>({comp:null}),computed:{page(){return this.$pagination.paginationIndex+1}},mounted(){n.e(2).then(n.t.bind(null,214,7)).then(t=>{this.comp=t.default})},methods:{clickCallback(t){const e=this.$pagination.getSpecificPageLink(t-1);this.$router.push(e)}}},r=(n(173),n(4)),s=Object(r.a)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.comp?n(t.comp,{tag:"component",attrs:{value:t.page,"page-count":t.$pagination.length,"click-handler":t.clickCallback,"prev-text":t.$pagination.prevText,"next-text":t.$pagination.nextText,"container-class":"pagination","page-class":"page-item"}}):t._e()}),[],!1,null,null,null).exports,o=(n(174),Object(r.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pagination simple-pagination"},[t.$pagination.hasPrev?n("router-link",{attrs:{to:t.$pagination.prevLink}},[t._v("\n    "+t._s(t.$pagination.prevText)+"\n  ")]):t._e(),t._v(" "),t.$pagination.hasNext?n("router-link",{attrs:{to:t.$pagination.nextLink}},[t._v("\n    "+t._s(t.$pagination.nextText)+"\n  ")]):t._e()],1)}),[],!1,null,null,null).exports),a=n(20),u=n.n(a),c=n(175),p=n.n(c),l={props:{title:{type:[String,Function],required:!1},issueId:{type:[String,Number],required:!1},options:{type:Object,required:!1},shortname:{type:String,required:!1},identifier:{type:String,required:!1},url:{type:String,required:!1},remote_auth_s3:{type:String,required:!1},api_key:{type:String,required:!1},sso_config:{type:Object,required:!1},language:{type:String,required:!1}},computed:{propsWithoutEmptyProperties(){return p()(this.$props,u.a)},commentProps(){return Object.assign({},this.propsWithoutEmptyProperties,this.$frontmatter.comment)},vssueProps(){return Object.assign({title:this.$page.title},this.commentProps)},disqusProps(){return Object.assign({identifier:this.$page.key},this.commentProps)}}},f=Object(r.a)(l,(function(){var t=this.$createElement,e=this._self._c||t;return"vssue"===this.$service.comment.service?e("Vssue",this._b({},"Vssue",this.vssueProps,!1)):"disqus"===this.$service.comment.service?e("Disqus",this._b({},"Disqus",this.disqusProps,!1)):this._e()}),[],!1,null,null,null).exports},192:function(t,e,n){},203:function(t,e,n){"use strict";n(192)},218:function(t,e,n){"use strict";n.r(e);n(1);var i=n(34),r=n.n(i),s=n(172),o=n.n(s),a=n(3),u=n(186);r.a.extend(o.a);var c={components:{NavigationIcon:a.n,ClockIcon:a.a,TagIcon:a.q},data:()=>({paginationComponent:null}),computed:{pages(){return this.$pagination.pages}},created(){this.paginationComponent=this.getPaginationComponent()},methods:{getPaginationComponent:()=>u.b,resolvePostDate(t){return r.a.utc(t).format(this.$themeConfig.dateFormat||"ddd MMM DD YYYY")},resolvePostTags:t=>!t||Array.isArray(t)?t:[t]}},p=(n(203),n(4)),l=Object(p.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"base-list-layout"}},[n("div",{staticClass:"ui-posts",attrs:{itemscope:"",itemtype:"http://schema.org/Blog"}},t._l(t.pages,(function(e){return n("article",{key:e.key,staticClass:"ui-post",attrs:{itemprop:"blogPost",itemscope:"",itemtype:"https://schema.org/BlogPosting"}},[n("meta",{attrs:{itemprop:"mainEntityOfPage",content:e.path}}),t._v(" "),n("header",{staticClass:"ui-post-title",attrs:{itemprop:"name headline"}},[n("NavLink",{attrs:{link:e.path}},[t._v(t._s(e.title))])],1),t._v(" "),e.excerpt?n("client-only",[n("p",{staticClass:"ui-post-summary",attrs:{itemprop:"description"},domProps:{innerHTML:t._s(e.excerpt)}})]):n("p",{staticClass:"ui-post-summary",attrs:{itemprop:"description"}},[t._v("\n        "+t._s(e.frontmatter.summary||e.summary)+"\n      ")]),t._v(" "),n("footer",[e.frontmatter.author?n("div",{staticClass:"ui-post-meta ui-post-author",attrs:{itemprop:"publisher author",itemtype:"http://schema.org/Person",itemscope:""}},[n("NavigationIcon"),t._v(" "),n("span",{attrs:{itemprop:"name"}},[t._v(t._s(e.frontmatter.author))]),t._v(" "),e.frontmatter.location?n("span",{attrs:{itemprop:"address"}},[t._v("\n              in "+t._s(e.frontmatter.location)+"\n          ")]):t._e()],1):t._e(),t._v(" "),e.frontmatter.date?n("div",{staticClass:"ui-post-meta ui-post-date"},[n("ClockIcon"),t._v(" "),n("time",{attrs:{pubdate:"",itemprop:"datePublished",datetime:e.frontmatter.date}},[t._v("\n            "+t._s(t.resolvePostDate(e.frontmatter.date))+"\n          ")])],1):t._e(),t._v(" "),e.frontmatter.tags?n("div",{staticClass:"ui-post-meta ui-post-tag",attrs:{itemprop:"keywords"}},[n("TagIcon"),t._v(" "),t._l(t.resolvePostTags(e.frontmatter.tags),(function(e){return n("router-link",{key:e,attrs:{to:"/tag/"+e}},[t._v("\n            "+t._s(e)+"\n          ")])}))],2):t._e()])],1)})),0),t._v(" "),t.$pagination.length>1&&t.paginationComponent?n(t.paginationComponent,{tag:"component"}):t._e()],1)}),[],!1,null,null,null);e.default=l.exports}}]);