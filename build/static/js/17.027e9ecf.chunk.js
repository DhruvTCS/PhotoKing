(()=>{"use strict";var e={2017:(e,r,o)=>{var t=o(1641);self.onmessage=async e=>{const r=e.data.files;console.log(e.data.work,"started");try{const t=[];for(const e of r)try{let r;if(e.size/1024/1024>3){const o=await a(e);r=s(o,e.name)}else r=e;t.push(r),self.postMessage({type:"progress",completedFiles:1})}catch(o){console.error("Error compressing file:",o)}console.log(e.data.work,"end"),self.postMessage({type:"complete",files:t})}catch(o){console.error("Error in worker:",o)}};const s=(e,r)=>new File([e],r,{type:e.type}),a=async e=>{const r={maxSizeMB:2,maxWidthOrHeight:1920,useWebWorker:!1};try{return await(0,t.A)(e,r)}catch(o){throw console.error("Error compressing image:",o),o}}}},r={};function o(t){var s=r[t];if(void 0!==s)return s.exports;var a=r[t]={exports:{}};return e[t](a,a.exports,o),a.exports}o.m=e,o.x=()=>{var e=o.O(void 0,[641],(()=>o(2017)));return e=o.O(e)},(()=>{var e=[];o.O=(r,t,s,a)=>{if(!t){var n=1/0;for(p=0;p<e.length;p++){t=e[p][0],s=e[p][1],a=e[p][2];for(var i=!0,c=0;c<t.length;c++)(!1&a||n>=a)&&Object.keys(o.O).every((e=>o.O[e](t[c])))?t.splice(c--,1):(i=!1,a<n&&(n=a));if(i){e.splice(p--,1);var l=s();void 0!==l&&(r=l)}}return r}a=a||0;for(var p=e.length;p>0&&e[p-1][2]>a;p--)e[p]=e[p-1];e[p]=[t,s,a]}})(),o.d=(e,r)=>{for(var t in r)o.o(r,t)&&!o.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},o.f={},o.e=e=>Promise.all(Object.keys(o.f).reduce(((r,t)=>(o.f[t](e,r),r)),[])),o.u=e=>"static/js/"+e+".1ec861c5.chunk.js",o.miniCssF=e=>{},o.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),o.p="/",(()=>{var e={17:1};o.f.i=(r,t)=>{e[r]||importScripts(o.p+o.u(r))};var r=self.webpackChunkPhotoKing=self.webpackChunkPhotoKing||[],t=r.push.bind(r);r.push=r=>{var s=r[0],a=r[1],n=r[2];for(var i in a)o.o(a,i)&&(o.m[i]=a[i]);for(n&&n(o);s.length;)e[s.pop()]=1;t(r)}})(),(()=>{var e=o.x;o.x=()=>o.e(641).then(e)})();o.x()})();
//# sourceMappingURL=17.027e9ecf.chunk.js.map