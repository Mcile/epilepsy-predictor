var G=Object.defineProperty;var I=(t,e,s)=>e in t?G(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var a=(t,e,s)=>I(t,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function s(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=s(i);fetch(i.href,r)}})();class A{constructor(e){a(this,"attr_subscribers",new Set);a(this,"class_subscribers",new Set);a(this,"style_subscribers",new Set);a(this,"prop_subscribers",new Set);a(this,"effect_subscribers",new Set);this.value=e}}var E=!1,b=[];function v(t){let e=[],s=b;b=e,E=!0;let n=t();return b=s,[e,n]}function k(t,e,s){t.getAttribute(e)!==s&&t.setAttribute(e,s)}function w(t,e,s){t.classList.contains(e)?!s&&t.classList.remove(e):t.classList.add(e)}function S(t,e,s){t.style[e]!==s&&(t.style[e]=s)}function j(t,e,s){t[e]!==s&&(t[e]=s)}let C={attr_subscribers:k,class_subscribers:w,style_subscribers:S,prop_subscribers:j,effect_subscribers:t=>t()};function L(t,e={}){e=Object.assign({},{alwaysUpdate:!1},e);let s=new A(t),n=i=>{if(i!=null){let r=i instanceof Function?i(s.value):i,l=e.alwaysUpdate||!e.alwaysUpdate&&s.value!=r;typeof s.value=="object"?(l=!0,r&&typeof r=="object"&&Object.assign(s.value,r)):s.value=r,l&&["attr_subscribers","class_subscribers","style_subscribers","prop_subscribers","effect_subscribers"].forEach(o=>s[o].forEach(([p,_,u])=>C[o](p,_,u==null?void 0:u())))}return E&&b.push(s),typeof s.value=="object"?Object.assign({},s.value):s.value};return n.signal_instance=s,n}function P(...t){t.length==1?requestIdleCallback(()=>{let e=t[0],[s,n]=v(e);s.forEach(i=>i.effect_subscribers.add([e]))}):requestIdleCallback(()=>{let e=t[0];t[1].forEach(n=>n.signal_instance.effect_subscribers.add([e])),e()})}function F(){let t={element:null},e=()=>t.element;return e.ref=t,e}class d{constructor(e){a(this,"element_name");a(this,"attrs_setting",{});a(this,"class_setting",{});a(this,"style_setting",{});a(this,"props_setting",{});a(this,"event_listeners",[]);a(this,"child_elements",[]);a(this,"ref");this.element_name=e}attrs(e){return Object.assign(this.attrs_setting,e),this}class(e){const s=n=>String(n).replace(/\s+/g," ").split(" ").forEach(i=>this.class_setting[i]=!0);return Array.isArray(e)?e.flat().forEach(n=>{if(typeof n=="object")for(let i in n){let r=n[i];this.class_setting[i]=typeof r=="function"?r:!!r}else s(n)}):s(e),this}style(e){const s=i=>{for(let r in i){let l=i[r];this.style_setting[r]=typeof l=="function"?l:String(l)}},n=i=>{String(i).split(";").forEach(r=>{let[l,o]=r.split(":");this.style_setting[l.replace(/\s+/g,"")]=o})};return typeof e=="object"?Array.isArray(e)?e.forEach(i=>typeof i=="object"?s(i):n(i)):s(e):n(e),this}props(e){return Object.assign(this.props_setting,e),this}$ref(e){return this.ref=e,this}on(e,s){return this.event_listeners.push([e,s]),this}append(...e){return this.child_elements=[...this.child_elements,...e],this}build(){let e=document.createElement(this.element_name);const s=(n,i,r)=>{Object.entries(n).forEach(([l,o])=>{let p=o;if(typeof o=="function"){let[_,u]=v(o);_.forEach(x=>i(x,e,l,o)),p=u}r(e,l,p)})};return s(this.attrs_setting,(n,i,r,l)=>n.attr_subscribers.add([i,r,l]),k),s(this.class_setting,(n,i,r,l)=>n.class_subscribers.add([i,r,l]),w),s(this.style_setting,(n,i,r,l)=>n.style_subscribers.add([i,r,l]),S),s(this.props_setting,(n,i,r,l)=>n.prop_subscribers.add([i,r,l]),j),this.event_listeners.forEach(([n,i])=>e.addEventListener(n,i)),e.append(...this.child_elements.map(n=>n instanceof d||n instanceof m?n.build():n)),this.ref&&(this.ref.ref.element=e),e}clone(){let e=new d(this.element_name);return e.attrs_setting=Object.assign({},this.attrs_setting),e.class_setting=Object.assign({},this.class_setting),e.style_setting=Object.assign({},this.style_setting),e.props_setting=Object.assign({},this.props_setting),e.event_listeners=this.event_listeners.slice(),e.child_elements=this.child_elements.slice(),e}}function c(t){return new d(t)}function M(t,...e){let s=e.map(n=>n instanceof d||n instanceof m||n instanceof O?n.build():n);t.append(...s),s.forEach(n=>n.onmount_hooks.forEach(i=>i()))}function R(t){for(let e in t){let s=t[e];typeof s!="function"&&(t[e]=()=>s)}return t}class O{constructor(e){a(this,"init_callback");this.init_callback=e}props(e){return new m(()=>this.init_callback(R(e)))}build(){return this.props({}).build()}}class m{constructor(e){a(this,"init_callback");a(this,"element_builder");a(this,"onmount_hooks",new Set);this.init_callback=s=>e(s)}build(){this.element_builder??(this.element_builder=this.init_callback());let e=this.element_builder.build();return e.onmount_hooks=this.onmount_hooks,e}}function y(t){return new O(t)}const T=y(t=>(t=t,c("div").style("padding:0.25em;border:1px solid gray").append(c("label").style("display:inline-block;width:100%").append(c("input").style("margin-right:0.5em").attrs({type:"checkbox"}).on("click",e=>h(s=>s[t.name()]=e.target.checked)),t.name())))),N=y(t=>(t=t,c("div").class("vbox").style("padding:0.5em;border:1px solid gray").append(t.name(),c("label").append(c("input").attrs({type:"radio",name:t.name(),checked:"true"}).on("change",()=>h(e=>e[t.name()]=!0)),t.optionA()),c("label").append(c("input").attrs({type:"radio",name:t.name()}).on("change",()=>h(e=>e[t.name()]=!1)),t.optionB())))),g={"Febrile convulsion in childhood":.58221562,"History of SGTC":-.597837001,"Positive MRI":.779324877,"Interictal EEG findings":.530628251,"Ictal EEG findings":.463734016,"EEG at 1 week":-2.995732274,"EEG at 3 months":-.994252273,"EEG at 1 year":-1.237874356,SE:2.405141681,"The consistency between VEEG and MR":1.137833002,"Hippocampal sclerosis":.530628251,FCD:-.356674944,Tumor:-.544727175},f={"Age at surgery":["<20 years old",">20 years old",1.199964783],Frequency:[">30 times/month","=<30 times/month",-1.386294361],"Side of surgery":["Right side","Left side",.412109651],"Site of surgery":["Temporal lobe","Extratemporal lobe",.598836501],"Extent of final resection":["Complete resection","Incomplete resection",.641853886]};let h=L({"Febrile convulsion in childhood":!1,"History of SGTC":!1,"Positive MRI":!1,"Interictal EEG findings":!1,"Ictal EEG findings":!1,"EEG at 1 week":!1,"EEG at 3 months":!1,"EEG at 1 year":!1,SE:!1,"The consistency between VEEG and MR":!1,"Hippocampal sclerosis":!1,FCD:!1,Tumor:!1,"Age at surgery":!0,Frequency:!0,"Side of surgery":!0,"Site of surgery":!0,"Extent of final resection":!0});const q=y(()=>{let t=F();return P(()=>{let e=h();const s=1.283;let n=0;for(let r in g)n+=g[r]*Number(e[r]);for(let r in f)n+=f[r][2]*Number(e[r]);let i=(Math.exp(s)+n)/(1+Math.exp(s+n))*100;i>100&&(i=100),i<0&&(i=0),t().parentElement.style.color=i>50?"green":"orange",t().textContent=i.toFixed(3)+"%"}),c("div").class(["vbox","center"]).style("width:980px;height:100vh").append(c("div").style("font-size:1.5em").append("A Novel Clinical Prediction Model for Sugical Efficacy in Epilepsy"),c("div").style("height:1em"),c("div").class("hbox").style("padding:0.5em;width:90%;border:2px solid black").append(c("div").append(...Object.keys(g).map(e=>T.props({name:e}))),c("div").style("margin-left:1em").append(...Object.keys(f).map(e=>N.props({name:e,optionA:f[e][0],optionB:f[e][1]}))),c("div").class(["vbox","expand"]).style("color:green;font-size:large;align-items:center;justify-content:center").append("Probability of Seizure-free",c("div").$ref(t))))});M(document.getElementById("app"),q);