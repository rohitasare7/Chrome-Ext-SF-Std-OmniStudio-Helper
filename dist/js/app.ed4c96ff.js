(function(){"use strict";var e={606:function(e,t,a){var r=a(5130),o=a(6768);const s={class:"p-5 w-11/12 dark:bg-gray-900 antialiased mx-auto my-6"};function n(e,t,a,r,n,l){const i=(0,o.g2)("ToggleLightDarkMode"),c=(0,o.g2)("SecondaryComp");return(0,o.uX)(),(0,o.CE)("div",s,[(0,o.bF)(i),(0,o.bF)(c)])}a(4603),a(7566),a(8721);var l=a(4232),i=a(144);a(4114);let c,d=null==localStorage.getItem("apiVersion")?"60.0":localStorage.getItem("apiVersion"),u={async getSession(e){e=p(e);const t="access_token",a=window.location.href.includes(t),r=localStorage.getItem(e+"_"+t);if(this.instanceHostname=e,a){if(window.location.href.includes(t)){const a=new URL(window.location.href),r=new URLSearchParams(a.hash.substring(1)),o=decodeURI(r.get(t));e=decodeURI(r.get("instance_url")).replace(/^https?:\/\//i,""),this.sessionId=o,localStorage.setItem(e+"_"+t,o)}}else if(r)this.sessionId=r;else{let t=await new Promise((t=>chrome.runtime.sendMessage({message:"getSession",sfHost:e},t)));t&&(this.instanceHostname=p(t.hostname),this.sessionId=t.key)}const o="isSandbox";null==localStorage.getItem(e+"_"+o)&&u.rest("/services/data/v"+d+"/query/?q=SELECT+IsSandbox,+InstanceName+FROM+Organization").then((t=>{localStorage.setItem(e+"_"+o,t.records[0].IsSandbox),localStorage.setItem(e+"_orgInstance",t.records[0].InstanceName)}))},async rest(e,{logErrors:t=!0,method:a="GET",api:r="normal",body:o,bodyType:s="json",responseType:n="json",headers:l={},progressHandler:i=null}={}){if(!this.instanceHostname)throw new Error("Instance Hostname not found");let d=new XMLHttpRequest;e+=(e.includes("?")?"&":"?")+"cache="+Math.random();const u="https://"+this.instanceHostname;if(d.open(a,u+e,!0),d.setRequestHeader("Accept","application/json; charset=UTF-8"),"bulk"==r)d.setRequestHeader("X-SFDC-Session",this.sessionId);else{if("normal"!=r)throw new Error("Unknown api");d.setRequestHeader("Authorization","Bearer "+this.sessionId)}if(void 0!==o)if("json"==s)o=JSON.stringify(o),d.setRequestHeader("Content-Type","application/json; charset=UTF-8");else if("raw"!=s)throw new Error("Unknown bodyType");for(let[c,p]of Object.entries(l))d.setRequestHeader(c,p);if(d.responseType=n,await new Promise(((e,t)=>{i&&(i.abort=()=>{let e=new Error("The request was aborted.");e.name="AbortError",t(e),d.abort()}),d.onreadystatechange=()=>{4==d.readyState&&e()},d.send(o)})),d.status>=200&&d.status<300)return d.response;if(0==d.status){t||console.error("Received no response from Salesforce REST API",d);let e=new Error;throw e.name="SalesforceRestError",e.message="Network error, offline or timeout",e}if(401==d.status){let e=d.response.length>0?d.response[0].message:"New access token needed";localStorage.getItem(this.instanceHostname+"_access_token")&&(c=e,f());let t=new Error;throw t.name="Unauthorized",t.message=e,t}{t||console.error("Received error response from Salesforce REST API",d);let e=new Error;e.name="SalesforceRestError",e.detail=d.response;try{e.message=e.detail.map((e=>`${e.errorCode}: ${e.message}${e.fields&&e.fields.length>0?` [${e.fields.join(", ")}]`:""}`)).join("\n")}catch(m){e.message=JSON.stringify(d.response)}throw e.message||(e.message="HTTP error "+d.status+" "+d.statusText),e}},wsdl(e,t){let a={Enterprise:{servicePortAddress:"/services/Soap/c/"+e,targetNamespaces:' xmlns="urn:enterprise.soap.sforce.com" xmlns:sf="urn:sobject.enterprise.soap.sforce.com"',apiName:"Enterprise"},Partner:{servicePortAddress:"/services/Soap/u/"+e,targetNamespaces:' xmlns="urn:partner.soap.sforce.com" xmlns:sf="urn:sobject.partner.soap.sforce.com"',apiName:"Partner"},Apex:{servicePortAddress:"/services/Soap/s/"+e,targetNamespaces:' xmlns="http://soap.sforce.com/2006/08/apex"',apiName:"Apex"},Metadata:{servicePortAddress:"/services/Soap/m/"+e,targetNamespaces:' xmlns="http://soap.sforce.com/2006/04/metadata"',apiName:"Metadata"},Tooling:{servicePortAddress:"/services/Soap/T/"+e,targetNamespaces:' xmlns="urn:tooling.soap.sforce.com" xmlns:sf="urn:sobject.tooling.soap.sforce.com" xmlns:mns="urn:metadata.tooling.soap.sforce.com"',apiName:"Tooling"}};return t&&(a=a[t]),a},async soap(e,t,a,{headers:r}={}){if(!this.instanceHostname||!this.sessionId)throw new Error("Session not found");let o=new XMLHttpRequest;o.open("POST","https://"+this.instanceHostname+e.servicePortAddress+"?cache="+Math.random(),!0),o.setRequestHeader("Content-Type","text/xml"),o.setRequestHeader("SOAPAction",'""');let s="Metadata"==e.apiName?"met:SessionHeader":"SessionHeader",n="Metadata"==e.apiName?"met:sessionId":"sessionId",l="Metadata"==e.apiName?`met:${t}`:t,i=['xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"','xmlns:xsd="http://www.w3.org/2001/XMLSchema"','xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'];"Metadata"==e.apiName&&i.push('xmlns:met="http://soap.sforce.com/2006/04/metadata"');let c=m.stringify({name:"soapenv:Envelope",attributes:` ${i.join(" ")}${e.targetNamespaces}`,value:{"soapenv:Header":Object.assign({},{[s]:{[n]:this.sessionId}},r),"soapenv:Body":{[l]:a}}});if(o.responseType="document",await new Promise((e=>{o.onreadystatechange=()=>{4==o.readyState&&e(o)},o.send(c)})),200==o.status){let e=o.response.querySelector(t+"Response"),a=m.parse(e).result;return a}{console.error("Received error response from Salesforce SOAP API",o);let e=new Error;e.name="SalesforceSoapError",e.detail=o.response;try{e.message=o.response.querySelector("faultstring").textContent}catch(d){e.message="HTTP error "+o.status+" "+o.statusText}throw e}},asArray(e){return e?e instanceof Array?e:[e]:[]}};class m{static stringify({name:e,attributes:t,value:a}){function r(e,t){if(null==t)e.setAttribute("xsi:nil","true");else if("object"==typeof t)for(let[a,s]of Object.entries(t))if("_"==a)null==s?e.setAttribute("xsi:nil","true"):e.textContent=s;else if("$xsi:type"==a)e.setAttribute("xsi:type",s);else if(void 0===s);else if(Array.isArray(s))for(let t of s){let s=o.createElement(a);r(s,t),e.appendChild(s)}else{let t=o.createElement(a);r(t,s),e.appendChild(t)}else e.textContent=t}let o=(new DOMParser).parseFromString("<"+e+t+"/>","text/xml");return r(o.documentElement,a),'<?xml version="1.0" encoding="UTF-8"?>'+(new XMLSerializer).serializeToString(o).replace(/ xmlns=""/g,"")}static parse(e){function t(e){let a="",r=null;if("true"==e.getAttribute("xsi:nil"))return null;let o=e.getAttribute("xsi:type");o&&(r={"$xsi:type":o});for(let s=e.firstChild;null!=s;s=s.nextSibling)if(s instanceof CharacterData)a+=s.data;else{if(!(s instanceof Element))throw new Error("Unknown child node type");{null==r&&(r={});let e=s.localName,a=t(s);e in r?r[e]instanceof Array?r[e].push(a):r[e]=[r[e],a]:r[e]=a}}return r||a}return t(e)}}function p(e){if(e){const t=e.replace(/\.lightning\.force\./,".my.salesforce.").replace(/\.mcas\.ms$/,"");return t}return e}function f(){const e=document.getElementById("invalidTokenBanner");e&&e.classList.remove("hide");const t=document.getElementById("mainTabs");t&&t.classList.add("mask")}const v=e=>{const t=new Date(e),a={day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0};return t.toLocaleString("en-IN",a)};const g=async(e,t)=>{const a=await new Promise(((e,a)=>{chrome.storage.local.get({[t]:[]},(a=>{const r=a[t];e(r)}))})),r=a.some((t=>t.items.some((t=>t.id===e.id))));if(r)return console.log("Item already exists:",e),!1;{let r=a.find((t=>t.type===e.type));return r?r.items.push({id:e.id,name:e.name}):(r={type:e.type,items:[{id:e.id,name:e.name}]},a.push(r)),chrome.storage.local.set({[t]:a},(()=>{console.log("Record list updated for domain:",t)})),!0}};const h=async e=>new Promise(((t,a)=>{chrome.storage.local.get({[e]:[]},(a=>{const r=a[e];t(r)}))})),y=async(e,t)=>{const a=await new Promise(((e,a)=>{chrome.storage.local.get({[t]:[]},(a=>{const r=a[t];e(r)}))})),r=a.findIndex((t=>t.items.some((t=>t.id===e))));return-1!==r?(a[r].items=a[r].items.filter((t=>t.id!==e)),chrome.storage.local.set({[t]:a},(()=>{console.log("Record with ID",e,"deleted for domain:",t)})),!0):(console.log("Item with ID",e,"not found for domain:",t),!1)},b=e=>{const t=/https:\/\/([^.]+)\.(lightning\.force\.com|my\.salesforce\.com|vf\.force\.com|my\.site\.com)$/,a=e.match(t);if(a)return a[1];const r=/https:\/\/([^.]+)\.sandbox\.(lightning\.force\.com|my\.salesforce\.com|vf\.force\.com|my\.site\.com)$/,o=e.match(r);if(o)return o[1];const s=/https:\/\/([^.]+)\.develop\.(lightning\.force\.com|my\.salesforce\.com|vf\.force\.com|my\.site\.com)$/,n=e.match(s);if(n)return n[1];const l=/https:\/\/([^-]+)-([^.]+)\.trailblaze\.(lightning\.force\.com|my\.salesforce\.com|vf\.force\.com|my\.site\.com)$/,i=e.match(l);return i?i[2]:null},_=(e,t,a)=>{switch(a){case"DataRaptor":return`https://${e}--vlocity-cmt.vf.force.com/apex/vlocity_cmt__drmapper?id=${t}`;case"IntegrationProcedure":return`https://${e}--vlocity-cmt.vf.force.com/apex/vlocity_cmt__integrationproceduredesigner?id=${t}`;default:return null}},w=(e,t,a,r)=>{const o=`https://${t}/lightning`;switch(r){case"OmniScript":return`${o}/cmp/vlocity_cmt__OmniDesignerAuraWrapper?c__recordId=${a}`;case"FlexCard":return`${o}/r/vlocity_cmt__VlocityCard__c/${a}/view`;case"IntegrationProcedure":case"DataRaptor":return _(e,a,r);default:return null}},x=["type"];var k={__name:"PrimaryButton",props:{type:{type:String,default:"submit"},isRed:Boolean},setup(e){return(t,a)=>((0,o.uX)(),(0,o.CE)("button",{type:e.type,class:(0,l.C4)({"bg-gray-800 dark:text-gray-800 dark:hover:bg-white":!e.isRed,"bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 dark:text-gray-100 focus:bg-red-700 focus:ring-red-500":e.isRed,"inline-flex items-center px-4 py-2 dark:bg-gray-200 border border-transparent rounded-2xl font-semibold text-xs text-white  uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150":!0})},[(0,o.RG)(t.$slots,"default")],10,x))}};const S=k;var R=S;const L=["value"];var E={__name:"TextInput",props:{modelValue:String},emits:["update:modelValue"],setup(e,{expose:t}){const a=(0,i.KR)(null);return(0,o.sV)((()=>{a.value.hasAttribute("autofocus")&&a.value.focus()})),t({focus:()=>a.value.focus()}),(t,r)=>((0,o.uX)(),(0,o.CE)("input",{ref_key:"input",ref:a,class:"text-base border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm py-1 px-2 border outline-indigo-500 dark:outline-none",value:e.modelValue,onInput:r[0]||(r[0]=e=>t.$emit("update:modelValue",e.target.value))},null,40,L))}};const C=E;var I=C;const T=(0,o.Lk)("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"},null,-1),O=(0,o.Lk)("path",{class:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"},null,-1),A=[T,O];var M={__name:"LoadingCircle",props:{cssStyle:{type:String}},setup(e){return(t,a)=>((0,o.uX)(),(0,o.CE)(o.FK,null,[((0,o.uX)(),(0,o.CE)("svg",{class:(0,l.C4)(["animate-spin",e.cssStyle]),xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},A,2)),(0,o.RG)(t.$slots,"default")],64))}};const F=M;var D=F;const N={class:"block font-normal text-sm text-gray-600 dark:text-gray-300"};var H={__name:"TextDesc",props:{},setup(e){return(e,t)=>((0,o.uX)(),(0,o.CE)("p",N,[(0,o.RG)(e.$slots,"default")]))}};const P=H;var j=P;const V={class:"block font-semibold text-xl text-gray-600 dark:text-gray-300"};var $={__name:"PrimaryHeading",props:{},setup(e){return(e,t)=>((0,o.uX)(),(0,o.CE)("p",V,[(0,o.RG)(e.$slots,"default")]))}};const q=$;var K=q;const X=["type"];var B={__name:"SVGIconButton",props:{type:{type:String,default:"button"},icon:{type:String,default:""},color:{type:String,default:""},isSquare:{type:Boolean,default:!1}},setup(e){return(t,a)=>((0,o.uX)(),(0,o.CE)("button",{type:e.type,class:(0,l.C4)(["inline-flex items-center p-1.5 border shadow-md rounded-full font-semibold text-xs focus:outline-none disabled:opacity-25 transition ease-in-out duration-300",{"bg-rose-100 hover:bg-rose-200 border-rose-300/50 dark:bg-rose-700 dark:hover:bg-rose-600 dark:border-rose-900 ":"red"==e.color,"bg-green-100 hover:bg-green-200 border-green-300 dark:bg-green-700 dark:hover:bg-green-600 dark:border-green-900 ":"green"==e.color,"bg-blue-100 hover:bg-blue-200 border-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600 dark:border-blue-900 ":"blue"==e.color,"bg-gray-100 hover:bg-gray-200 border-gray-300 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:border-gray-800 ":"gray"==e.color,"!rounded-md":e.isSquare}])},[((0,o.uX)(),(0,o.Wv)((0,o.$y)(e.icon),{class:(0,l.C4)(["w-6 h-6 stroke-2 transition duration-75",{"fill-red-700 hover:fill-red-800 dark:fill-red-100":"red"==e.color,"fill-green-700 hover:fill-green-800 dark:fill-green-100":"green"==e.color,"fill-blue-700 hover:fill-blue-800 dark:fill-blue-100":"blue"==e.color,"fill-gray-600 hover:fill-gray-700 dark:fill-gray-100":"gray"==e.color}])},null,8,["class"])),(0,o.RG)(t.$slots,"default")],10,X))}};const U=B;var W=U;const z={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},G=(0,o.Lk)("path",{d:"m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7z"},null,-1),Q=[G];function J(e,t){return(0,o.uX)(),(0,o.CE)("svg",z,Q)}var Y=a(1241);const Z={},ee=(0,Y.A)(Z,[["render",J]]);var te=ee;const ae={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},re=(0,o.Lk)("path",{d:"M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"},null,-1),oe=[re];function se(e,t){return(0,o.uX)(),(0,o.CE)("svg",ae,oe)}const ne={},le=(0,Y.A)(ne,[["render",se]]);var ie=le,ce=a(772);const de={key:0},ue={key:1},me={key:0,class:"mt-4 mb-2"},pe={class:"text-blue-600"},fe={key:1},ve={class:"text-left ml-2"},ge={class:"text-center flex items-center my-1.5"},he=["href"],ye={name:"favoriteTableComp"};var be=Object.assign(ye,{props:{sfHost:String,currenObject:String},setup(e,{expose:t}){const a=e,r=(0,i.KR)([]),s=(0,i.KR)([]),n=(0,i.KR)(["Name"]),c=(0,i.KR)(""),d=(0,i.KR)("LastModifiedDate"),u="desc",m=(0,i.KR)([{text:"Id",value:"id"},{text:"Name",value:"name",sortable:!0},{text:"Actions",value:"Actions",width:200}]),p=((0,i.KR)(""),(0,i.KR)(!1)),f=((0,i.KR)(a?.sfHost??""),(0,i.KR)("")),v=(0,i.KR)(""),g=()=>{f.value=a?.currenObject},_=async(e=!1)=>{e&&await new Promise((e=>setTimeout(e,1e3))),r.value=await h(a?.sfHost),g(),s.value=[];for(const t of r.value)t.type===a?.currenObject&&s.value.push(...t.items);return console.log("inside filterItemsByType and obj --\x3e "+a?.currenObject),console.log("itemList --\x3e "+JSON.stringify(s.value)),s},x=async e=>{let t=await y(e,a?.sfHost);t&&(s.value=s.value.filter((t=>t.id!==e)),console.log("Item with ID",e,"removed from itemList"))},k=async()=>{await _(!0),console.log("inside getLatestFavItemList")};return(0,o.wB)((()=>a.currenObject),(async e=>{e&&(console.log("inside watch"),await _(!1))}),{immediate:!0}),(0,o.sV)((async()=>{r.value=await h(a?.sfHost),f.value=a?.currenObject,g(),v.value=b(`https://${a?.sfHost}`)})),t({getLatestFavItemList:k}),(e,t)=>{const r=(0,o.g2)("LoadingCircle");return p.value?((0,o.uX)(),(0,o.CE)("div",de,[(0,o.bF)(R,null,{default:(0,o.k6)((()=>[(0,o.bF)(r,{cssStyle:"h-4 w-4 mr-2"},{default:(0,o.k6)((()=>[(0,o.eW)("Data is loading...")])),_:1})])),_:1})])):((0,o.uX)(),(0,o.CE)("div",ue,[s.value.length>0?((0,o.uX)(),(0,o.CE)("div",me,[(0,o.bF)(K,null,{default:(0,o.k6)((()=>[(0,o.eW)("Favorite Records for "),(0,o.Lk)("span",pe,(0,l.v_)(a?.currenObject),1)])),_:1}),(0,o.bF)(j,null,{default:(0,o.k6)((()=>[(0,o.eW)("Please note, there might be newer versions so please refer latest data from above table. ")])),_:1})])):(0,o.Q3)("",!0),s.value.length>0?((0,o.uX)(),(0,o.CE)("div",fe,[(0,o.bF)(I,{modelValue:c.value,"onUpdate:modelValue":t[0]||(t[0]=e=>c.value=e),type:"text",class:"!px-2 !py-1 my-2",placeholder:"Filter records.."},null,8,["modelValue"]),(0,o.bF)((0,i.R1)(ce.A),{headers:m.value,items:s.value,"search-field":n.value,"rows-per-page":10,"header-text-direction":"center","body-text-direction":"center","search-value":c.value,"sort-by":d.value,"sort-type":u,"no-hover":!0,"theme-color":"#312e3d","table-class-name":"tableCSS mt-4 mb-8 rounded-lg border dark:border-gray-600 shadow-md"},{loading:(0,o.k6)((()=>[(0,o.bF)(j,{class:"font-semibold my-4"},{default:(0,o.k6)((()=>[(0,o.eW)("Data loading, please wait...")])),_:1})])),"item-Name":(0,o.k6)((({name:e})=>[(0,o.Lk)("p",ve,(0,l.v_)(e),1)])),"item-Actions":(0,o.k6)((({id:e})=>[(0,o.Lk)("div",ge,[(0,o.Lk)("a",{href:(0,i.R1)(w)(v.value,a?.sfHost,e,a?.currenObject),target:"_blank"},[(0,o.bF)(R,null,{default:(0,o.k6)((()=>[(0,o.eW)("Open in SF")])),_:1})],8,he),(0,o.bF)(W,{onClick:t=>x(e),icon:ie,isSquare:!1,color:"red",class:"!p-1.5 ml-2",title:"Remove from Favorite"},null,8,["onClick"])])])),_:1},8,["headers","items","search-field","search-value","sort-by"])])):(0,o.Q3)("",!0)]))}}});const _e=be;var we=_e;const xe={key:1},ke={key:2},Se={key:0,class:"mt-4 mb-2"},Re={class:"text-blue-600"},Le={key:1},Ee={class:"text-left ml-2"},Ce={class:"text-center flex items-center my-1.5"},Ie=["href"],Te={name:"indexComp"};var Oe=Object.assign(Te,{setup(e){const t=(0,i.KR)([]),a=(0,i.KR)(["Name","LastModifiedBy.Name","LastModifiedDate"]),r=(0,i.KR)(""),s=(0,i.KR)("LastModifiedDate"),n="desc",c=(0,i.KR)([{text:"Id",value:"Id"},{text:"Name",value:"Name",sortable:!0},{text:"Version",value:"vlocity_cmt__Version__c"},{text:"LastModified By",value:"LastModifiedBy.Name"},{text:"LastModified Date",value:"LastModifiedDateNew",sortable:!0},{text:"Actions",value:"Actions",width:200}]),m=(0,i.KR)(""),p=(0,i.KR)(!1),f=(0,i.KR)(""),h=(0,i.KR)(""),y=(0,i.KR)(""),_=(0,i.KR)("OmniScripts Loaded"),x=(0,i.KR)("FlexCards Loaded"),k=(0,i.KR)("Integration Procedures Loaded"),S=(0,i.KR)("DataRaptors Loaded"),L=e=>new Promise(((t,a)=>{u.getSession(f.value).then((()=>{let r=u.rest(e);r.then((e=>{t(e)})).catch((e=>{console.error("Error fetching limits: ",e),a(e)}))})).catch((e=>{console.error("Error getting session: ",e),a(e)}))})),E=()=>{const e={text:"Version",value:"vlocity_cmt__Version__c"},t=c.value.some((t=>t.value===e.value));t||c.value.splice(2,0,e)},C=async e=>{p.value=!0,h.value="OmniScript";let a="OmniScript";e&&(h.value="IntegrationProcedure",a="Integration Procedure");let r="/services/data/v"+d+`/query/?q=SELECT+Id,Name,vlocity_cmt__Version__c,LastModifiedBy.Name,LastModifiedDate+FROM+vlocity_cmt__OmniScript__c+WHERE+vlocity_cmt__IsActive__c=TRUE+AND+vlocity_cmt__OmniProcessType__c='${a}'+ORDER+BY+LastModifiedDate+DESC`;try{const a=await L(r);a?.records.forEach((e=>{e.LastModifiedDateNew=v(e.LastModifiedDate)})),t.value=a?.records,m.value=e?k.value:_.value,E()}catch(o){console.error("Error fetching OmniScript list: ",o)}p.value=!1,document.title=e?k.value:_.value},T=async()=>{p.value=!0,h.value="FlexCard";let e="/services/data/v"+d+"/query/?q=SELECT+Id,Name,vlocity_cmt__Version__c,LastModifiedBy.Name,LastModifiedDate+FROM+vlocity_cmt__VlocityCard__c+WHERE+vlocity_cmt__Active__c=TRUE+ORDER+BY+LastModifiedDate+DESC";try{const a=await L(e);a?.records.forEach((e=>{e.LastModifiedDateNew=v(e.LastModifiedDate)})),t.value=a?.records,m.value=x.value,E()}catch(a){console.error("Error fetching getFlexCardList: ",a)}p.value=!1,document.title=x.value},O=async()=>{p.value=!0,h.value="DataRaptor";let e="/services/data/v"+d+"/query/?q=SELECT+Id,Name,vlocity_cmt__Type__c,LastModifiedBy.Name,LastModifiedDate+FROM+vlocity_cmt__DRBundle__c+ORDER+BY+LastModifiedDate";try{const a=await L(e);a?.records.forEach((e=>{e.LastModifiedDateNew=v(e.LastModifiedDate)})),t.value=a?.records,m.value=S.value,c.value=c.value.filter((e=>"vlocity_cmt__Version__c"!==e.value))}catch(a){console.error("Error fetching getDataRaptorList: ",a)}p.value=!1,document.title=S.value},A=(0,i.KR)(null),M=(e,t)=>{let a={type:h.value,id:e,name:t},r=g(a,f.value);r&&(console.log("inside result"),A.value.getLatestFavItemList())};return(0,o.sV)((()=>{let e=new URLSearchParams(location.search.slice(1)),t=e.get("host");f.value=t,y.value=b(`https://${f.value}`)})),(e,d)=>((0,o.uX)(),(0,o.CE)(o.FK,null,[f.value?((0,o.uX)(),(0,o.Wv)(j,{key:0,class:"my-2"},{default:(0,o.k6)((()=>[(0,o.eW)("Current Org : "+(0,l.v_)(f.value),1)])),_:1})):(0,o.Q3)("",!0),(0,o.Lk)("button",{onClick:d[0]||(d[0]=e=>C(!1)),class:"bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md mr-2 my-2"}," Load OmniScript "),(0,o.Lk)("button",{onClick:T,class:"bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md mr-2 my-2"}," Load FlexCard "),(0,o.Lk)("button",{onClick:d[1]||(d[1]=e=>C(!0)),class:"bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md mr-2 my-2"}," Load Integration Procedure "),(0,o.Lk)("button",{onClick:O,class:"bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md mr-2 my-2"}," Load DataRaptor "),p.value?((0,o.uX)(),(0,o.CE)("div",xe,[(0,o.bF)(R,null,{default:(0,o.k6)((()=>[(0,o.bF)(D,{cssStyle:"h-4 w-4 mr-2"},{default:(0,o.k6)((()=>[(0,o.eW)("Data is loading...")])),_:1})])),_:1})])):((0,o.uX)(),(0,o.CE)("div",ke,[m.value?((0,o.uX)(),(0,o.CE)("div",Se,[(0,o.bF)(K,null,{default:(0,o.k6)((()=>[(0,o.eW)("Records loaded for "),(0,o.Lk)("span",Re,(0,l.v_)(h.value),1)])),_:1}),(0,o.bF)(j,null,{default:(0,o.k6)((()=>[(0,o.eW)("All records are active records")])),_:1})])):(0,o.Q3)("",!0),t.value.length>0?((0,o.uX)(),(0,o.CE)("div",Le,[(0,o.bF)(I,{modelValue:r.value,"onUpdate:modelValue":d[2]||(d[2]=e=>r.value=e),type:"text",class:"!px-2 !py-1 my-2",placeholder:"Filter records.."},null,8,["modelValue"]),(0,o.bF)((0,i.R1)(ce.A),{headers:c.value,items:t.value,"search-field":a.value,"rows-per-page":10,"header-text-direction":"center","body-text-direction":"center","search-value":r.value,"sort-by":s.value,"sort-type":n,"no-hover":!0,"theme-color":"#312e3d","table-class-name":"tableCSS mt-4 mb-8 rounded-lg border dark:border-gray-600 shadow-md"},{loading:(0,o.k6)((()=>[(0,o.bF)(j,{class:"font-semibold my-4"},{default:(0,o.k6)((()=>[(0,o.eW)("Data loading, please wait...")])),_:1})])),"item-Name":(0,o.k6)((({Name:e})=>[(0,o.Lk)("p",Ee,(0,l.v_)(e),1)])),"item-Actions":(0,o.k6)((({Id:e,Name:t})=>[(0,o.Lk)("div",Ce,[(0,o.Lk)("a",{href:(0,i.R1)(w)(y.value,f.value,e,h.value),target:"_blank"},[(0,o.bF)(R,null,{default:(0,o.k6)((()=>[(0,o.eW)("Open in SF")])),_:1})],8,Ie),(0,o.bF)(W,{onClick:a=>M(e,t),icon:te,isSquare:!1,color:"gray",class:"!p-1.5 ml-2",title:"Add to Favorite"},null,8,["onClick"])])])),_:1},8,["headers","items","search-field","search-value","sort-by"])])):(0,o.Q3)("",!0)])),f.value?((0,o.uX)(),(0,o.Wv)(we,{key:3,sfHost:f.value,currenObject:h.value,ref_key:"childComponentRef",ref:A},null,8,["sfHost","currenObject"])):(0,o.Q3)("",!0)],64))}});const Ae=Oe;var Me=Ae;const Fe={for:"theme",class:"theme md:top-6 md:right-6 z-40 rounded-2xl dark:shadow-xl absolute top-1 right-1"},De={class:"theme__toggle-wrap"},Ne=(0,o.Fv)('<span class="theme__icon" data-v-76a18a32><span class="theme__icon-part" data-v-76a18a32></span><span class="theme__icon-part" data-v-76a18a32></span><span class="theme__icon-part" data-v-76a18a32></span><span class="theme__icon-part" data-v-76a18a32></span><span class="theme__icon-part" data-v-76a18a32></span><span class="theme__icon-part" data-v-76a18a32></span><span class="theme__icon-part" data-v-76a18a32></span><span class="theme__icon-part" data-v-76a18a32></span><span class="theme__icon-part" data-v-76a18a32></span></span>',1);var He={__name:"ToggleLightDarkMode",setup(e){const t=(0,i.KR)(!1);(0,o.sV)((()=>{const e=localStorage.getItem("color-theme");("dark"===e||!e&&window.matchMedia("(prefers-color-scheme: dark)").matches)&&(t.value=!0,document.documentElement.classList.add("dark"))}));const a=()=>{t.value=!t.value,t.value?(document.documentElement.classList.add("dark"),localStorage.setItem("color-theme","dark")):(document.documentElement.classList.remove("dark"),localStorage.setItem("color-theme","light"))};return(e,s)=>((0,o.uX)(),(0,o.CE)("label",Fe,[(0,o.Lk)("span",De,[(0,o.bo)((0,o.Lk)("input",{id:"theme",class:"theme__toggle",type:"checkbox",role:"switch",name:"theme",value:"dark",onClick:a,"onUpdate:modelValue":s[0]||(s[0]=e=>t.value=e)},null,512),[[r.lH,t.value]]),Ne])]))}};const Pe=(0,Y.A)(He,[["__scopeId","data-v-76a18a32"]]);var je=Pe,Ve={name:"App",components:{SecondaryComp:Me,ToggleLightDarkMode:je}};const $e=(0,Y.A)(Ve,[["render",n]]);var qe=$e;(0,r.Ef)(qe).mount("#secondaryApp")}},t={};function a(r){var o=t[r];if(void 0!==o)return o.exports;var s=t[r]={exports:{}};return e[r].call(s.exports,s,s.exports,a),s.exports}a.m=e,function(){var e=[];a.O=function(t,r,o,s){if(!r){var n=1/0;for(d=0;d<e.length;d++){r=e[d][0],o=e[d][1],s=e[d][2];for(var l=!0,i=0;i<r.length;i++)(!1&s||n>=s)&&Object.keys(a.O).every((function(e){return a.O[e](r[i])}))?r.splice(i--,1):(l=!1,s<n&&(n=s));if(l){e.splice(d--,1);var c=o();void 0!==c&&(t=c)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[r,o,s]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={524:0,996:0};a.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,s,n=r[0],l=r[1],i=r[2],c=0;if(n.some((function(t){return 0!==e[t]}))){for(o in l)a.o(l,o)&&(a.m[o]=l[o]);if(i)var d=i(a)}for(t&&t(r);c<n.length;c++)s=n[c],a.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return a.O(d)},r=self["webpackChunkmy_chrome_extension"]=self["webpackChunkmy_chrome_extension"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=a.O(void 0,[504,996],(function(){return a(606)}));r=a.O(r)})();
//# sourceMappingURL=app.ed4c96ff.js.map