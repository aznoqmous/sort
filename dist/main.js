!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);class i{constructor(e,t={}){for(let e in t)this[e]=t[e];this.container=e,this.container.style.userSelect="none",this.currentTarget=null,this.init(),this.buildHr(),this.bind();new MutationObserver((e,t)=>{for(let t of e)(t.addedNodes.length||t.removedNodes.length)&&this.elements.length!=this.container.children.length-1&&(this.unbind(),this.init(),this.bind())}).observe(this.container,{childList:!0})}init(){this.elements=[...this.container.querySelectorAll(":scope > *:not(hr)")],this.elements.map((e,t)=>{if(e.setAttribute("data-index",t),!e.querySelector("span.sort")){let t=document.createElement("span");e.appendChild(t),t.className="sort",t.innerHTML="&#11205;&#11206;";let n={"font-size":"0.8rem","letter-spacing":"-0.8em",transform:"translate(0, -0.4em)","writing-mode":"vertical-lr",cursor:"n-resize"};for(let e in n)t.style[e]=n[e]}})}buildHr(){this.hr=document.createElement("hr");let e={opacity:0,width:"100%",height:"1px",background:"blue",padding:0,margin:0};for(let t in e)this.hr.style[t]=e[t];this.container.appendChild(this.hr)}unbind(){let e=e=>{this.currentTarget=e.currentTarget.parentElement,this.initialPos=e.currentTarget.parentElement.getBoundingClientRect(),this.initialCursorPos={x:e.pageX,y:e.pageY},this.container.addEventListener("mousemove",move),document.body.addEventListener("mouseup",mouseup)};this.elements.map(t=>{t.querySelector("span.sort").removeEventListener("mousedown",e)})}bind(){let e=e=>{this.move(e,this.currentTarget)},t=()=>{this.currentTarget=null,this.container.removeEventListener("mousemove",e),document.body.removeEventListener("mouseup",t),this.applyMove()},n=n=>{this.currentTarget=n.currentTarget.parentElement,this.initialPos=n.currentTarget.parentElement.getBoundingClientRect(),this.initialCursorPos={x:n.pageX,y:n.pageY},this.container.addEventListener("mousemove",e),document.body.addEventListener("mouseup",t)};this.elements.map(e=>{e.querySelector("span.sort").addEventListener("mousedown",n)})}move(e,t){let n=e.pageX,i=e.pageY,r={x:n-this.initialCursorPos.x,y:i-this.initialCursorPos.y};t.style.transform=`translate(${r.x}px, ${r.y}px)`,t.transformedX=r.x,t.transformedY=r.y,t.style.zIndex=1e4,t.style.opacity=.8,t.setAttribute("data-active",!0);let s=this.getHrPosition();null!==s?(s<this.elements.length-1?(t.getAttribute("data-index")<s&&(s+=1),this.container.insertBefore(this.hr,this.elements[s])):this.container.appendChild(this.hr),this.hr.style.opacity=1):this.hr.style.opacity=0}applyMove(){this.elements=this.getSortedElements(),this.elements.map((e,t)=>{e.setAttribute("data-index",t),e.style.transform="",e.style.opacity=1,e.removeAttribute("data-active"),this.container.appendChild(e)}),this.onSort&&this.onSort(this.elements),this.hr.style.opacity=0}getSortedElements(){return this.elements.map(e=>e).sort((e,t)=>{return e.getBoundingClientRect().y+e.getBoundingClientRect().height/2>t.getBoundingClientRect().y+t.getBoundingClientRect().height/2?1:-1})}getHrPosition(){let e=this.elements.filter(e=>e.getAttribute("data-active"))[0].getAttribute("data-index"),t=this.getSortedElements().map(e=>e.getAttribute("data-index")),n=this.elements.map(e=>e.getAttribute("data-index"));if(t.join()===n.join())return null;for(let n of t)if(t[n]===e)return parseInt(n)}}t.default=i;window.Sort=i}]);