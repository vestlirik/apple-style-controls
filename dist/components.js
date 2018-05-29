!function(){function a(){e.style.display="none",b()}function b(){document.getElementsByTagName("html")[0].removeEventListener("click",a)}function c(c,d){b(),e.style.display="flex";var f=(d||c.target).getBoundingClientRect().top-e.clientHeight-10;e.style.top=f+"px";var g=c.clientX-e.clientWidth/2;g<10&&(g=10),g+e.clientWidth>screen.availWidth&&(g=screen.availWidth-e.clientWidth-20),e.style.left=g+"px";var h=(c.clientX||0)-e.offsetLeft-5;h<5?h=5:h+10+14>=e.clientWidth&&(h=e.clientWidth-10-14);var i="left: "+h+"px;";asc.addStyle("div.asc-edit-menu:after{"+i+"}"),setTimeout(function(){document.getElementsByTagName("html")[0].addEventListener("click",a)},0)}function d(b){var d=document.all?document.selection.createRange().text:document.getSelection();if(d.toString().length>0){var e=d.baseNode.parentElement;e.classList.contains("asc-selectable-text")&&c(b,e)}else a(b)}var e;asc.component("#asc-edit-menu",function(){this.init=function(a){e=a}}),asc.component(".asc-selectable-text",function(){this.init=function(){document.addEventListener("mouseup",function(a){a.target.classList.contains("asc-edit-menu-button")||setTimeout(function(){d(a)},0)})}}),asc.component(".asc-edit-menu-button",function(){this.init=function(a){a.addEventListener("click",c)}})}(),asc.component(".asc-activity-indicator",function(){this.templateSrc="progress-indicator/template.html"}),asc.component(".asc-segmented-controls",function(){this.afterInit=function(a){function b(){for(var a=0;a<g.length;a++)g[a].classList.remove("active"),d.childNodes[a].classList.remove("active")}function c(a){b(),d.childNodes[a].classList.add("active"),g[a].classList.add("active")}for(var d,e,f=[],g=[],h=0;h<a.children.length;h++)a.children[h].classList.contains("asc-segmented-control")&&g.push(a.children[h]);if(0!==g.length){for(var i=0;i<g.length;i++)f.push(g[i].getAttribute("data-label")),g[i].classList.contains("active")&&(e=i);d=eDOM.el("div"),d.classList.add("asc-segmented-bar"),f.forEach(function(a,b){var e=eDOM.el("li");e.innerText=a,e.addEventListener("click",function(a){c(b)}),d.appendChild(e)}),void 0===e&&(e=0),function(){a.insertBefore(d,g[0])}(),c(e)}}}),asc.component("input",function(){this.init=function(a){if(!a.parentNode.classList.contains("input-container")){var b=eDOM.el(".input-container.asc");a.parentNode.insertBefore(b,a.nextSibling),b.appendChild(a);var c=eDOM.el("label.asc.asc-eraser");b.appendChild(c)}},this.afterInit=function(a){var b=a.attributes.icon;if(b){var c=eDOM.el("span.fa."+b.value);c.style.position="absolute",c.style.marginTop="10px",c.style.marginLeft="5px",c.style.color="#B3B3B3",a.style.textIndent="15px",a.parentNode.insertBefore(c,a)}}}),asc.component(".asc-eraser",function(){this.init=function(a){function b(a){a.target.previousElementSibling.value="",setTimeout(function(){a.target.previousElementSibling.focus()},0)}a.addEventListener("mousedown",b)}}),asc.component(".asc-search-input",function(){this.init=function(a){a.addEventListener("focus",function(a){a.currentTarget.parentNode.classList.add("asc-clicked")}),a.addEventListener("blur",function(a){a.currentTarget.parentNode.classList.remove("asc-clicked")})}}),asc.component(".asc-search-bar",function(){this.template='<div class="search"><div class="search__circle"></div><div class="search__rectangle"></div></div>\n<input class="asc asc-search-input" placeholder="Search">\n<button class="asc asc-search-cancel">Cancel</button>'}),asc.component(".asc-tab-bar-container",function(){this.init=function(a){function b(){for(var a=g,b=0;b<a.length;b++)a[b].classList.remove("active"),d.childNodes[b].classList.remove("active")}function c(a){var c=g;b(),d.childNodes[a].classList.add("active"),c[a].classList.add("active")}for(var d,e,f=[],g=[],h=0;h<a.children.length;h++)a.children[h].classList.contains("asc-tab")&&g.push(a.children[h]);for(var i=0;i<g.length;i++){"ASC-LABEL"===g[i].children[0].tagName?(f.push(g[i].children[0]),g[i].classList.contains("active")&&(e=i)):console.error("<asc-label> should be present in <asc-tab> on the first place")}d=eDOM.el("div"),d.classList.add("asc-tab-bar"),f.forEach(function(a,b){a.addEventListener("click",function(a){c(b)}),d.appendChild(a)}),void 0===e&&(e=0),function(){a.appendChild(d)}(),c(e)}}),asc.component("asc-toolbar",function(){this.afterInit=function(a){var b=document.querySelector("button[data-id="+a.id+"]");b&&function(a){var c=-a.offsetHeight+"px";a.style.bottom=c,b.addEventListener("click",function(){var b=eDOM.el("asc-backdrop");setTimeout(function(){var d=function(){a.style.bottom=c,b.remove(),document.body.removeEventListener("click",d)};document.body.addEventListener("click",d)},0),document.body.appendChild(b),setTimeout(function(){a.style.bottom="0"},0)})}(a)}}),asc.component("asc-action-sheet",function(){this.afterInit=function(a){var b=document.querySelector("button[data-id="+a.id+"]");b&&function(a){for(var c=eDOM.el("action-block");a.children[0];)c.appendChild(a.children[0]);a.appendChild(c);var d=eDOM.el("action-block");d.classList.add("cancel-block");var e=eDOM.el("action");e.innerText="Cancel",d.appendChild(e),a.appendChild(d);var f=-a.offsetHeight+"px";a.style.bottom=f,b.addEventListener("click",function(){var b=eDOM.el("asc-backdrop");setTimeout(function(){var c=function(){a.style.bottom=f,b.remove(),document.body.removeEventListener("click",c)};document.body.addEventListener("click",c)},0),document.body.appendChild(b),setTimeout(function(){a.style.bottom="15px"},0)})}(a)}}),function(){function a(a,b,c,d){var e=eDOM.el("asc-dialog#sample-alert"),f=eDOM.el("asc-dialog-header");f.innerText=a;var g=eDOM.el("asc-dialog-text");g.innerText=b;var h=eDOM.el("asc-content");h.appendChild(f),h.appendChild(g);var i=eDOM.el("asc-action-button[resolve]");i.innerText=c;var j=eDOM.el("asc-action-button[reject]");j.innerText=d;var k=eDOM.el("asc-actions");k.appendChild(j),k.appendChild(i),e.appendChild(h),e.appendChild(k),document.body.appendChild(e);var l=function(){e.remove()};return showDialog(e.id,l,l)}window.showAlert=a}(),function(){function a(a,b,c,d){var e=document.getElementById(a),f=document.createAttribute("shown");return e.attributes.setNamedItem(f),new Promise(function(a,f){e.addEventListener("click",function(a){"ASC-ACTION-BUTTON"!==a.target.tagName&&a.stopImmediatePropagation()});for(var g=function(){e.removeAttribute("shown"),j.remove(),document.body.classList.remove("no-scroll"),document.body.removeEventListener("click",h)},h=function(){f(),c&&c(),g()},i=0;i<e.children.length;i++)"ASC-ACTIONS"===e.children[i].tagName&&function(d){for(var h=e.children[d].children,i=0;i<h.length;i++)!function(d){h[d].hasAttribute("reject")&&h[d].addEventListener("click",function(){f(),c&&c(),g()}),h[d].hasAttribute("resolve")&&h[d].addEventListener("click",function(){var c;if(h[d].hasAttribute("return-value-id")){var e=h[d].getAttribute("return-value-id"),f=document.getElementById(e);if(f){var i=f.value;void 0!==i&&(c=i)}}a(c),b&&b(),g()})}(i)}(i);setTimeout(function(){document.body.addEventListener("click",h)},0);var j=eDOM.el("asc-backdrop");document.body.appendChild(j),document.body.classList.add("no-scroll"),d&&setTimeout(d,50)})}window.showDialog=a}(),function(){function a(a,c,d,e,f){function g(a){var b=this.getBoundingClientRect().left,c=this.getBoundingClientRect().top;if(!(a.clientX<b||a.clientY<c||a.clientY>b+300||a.clientY>c+50)){var d=a.clientX-b,e=a.clientY-c,f=h.lineCanvas.getContext("2d").getImageData(d,e,1,1).data;h.fillSelector(f[0],f[1],f[2])}}this.element=a,this.afterInit=function(){console.time("creating color picker");var b=this.element.offsetWidth,e=eDOM.el("canvas");e.height=b,e.width=b,this.canvas=e;var f=eDOM.el("canvas");f.height=c.offsetHeight,f.width=c.offsetWidth,this.lineCanvas=f,c.appendChild(this.lineCanvas);var g=eDOM.el("canvas");g.height=d.offsetHeight,g.width=d.offsetWidth,this.selectorCanvas=g,d.appendChild(this.selectorCanvas),this.renderColorMap(),a.appendChild(e),this.setupBindings()},this.finish=function(){console.timeEnd("creating color picker"),document.getElementById("color-loader").remove(),this.lineCanvas.parentElement.children[0].style.display="",document.getElementById("color-hr").style.display="block",document.getElementsByClassName("color-selector-line")[0].style.display="block";for(var a=document.getElementsByClassName("rgb-input-block"),b=0;b<a.length;b++)a[b].style.display="flex";this.fillColorLine(255,255,255)},this.renderColorMap=function(){var a=this.canvas,b=a.getContext("2d"),c=a.width/2,d=2*Math.PI/360,e=1/c;b.clearRect(0,0,a.width,a.height);for(var f=cy=c,g=0;g<360;g+=e){var h=g*d,i=c*Math.cos(h),j=c*Math.sin(h);b.strokeStyle="hsl("+g+", 100%, 50%)",b.beginPath(),b.moveTo(c,c),b.lineTo(f+i,cy+j),b.stroke()}var k=b.createRadialGradient(f,cy,0,f,f,c);k.addColorStop(0,"white"),k.addColorStop(1,"rgba(255, 255, 255, 0)"),b.fillStyle=k,b.beginPath(),b.arc(f,cy,c,0,2*Math.PI,!0),b.closePath(),b.fill()},this.fillColorLine=function(a,b,c){var d=this.lineCanvas.getContext("2d"),e=d.createLinearGradient(0,0,this.lineCanvas.offsetWidth,0);e.addColorStop(0,"rgb("+a+" ,"+b+" ,"+c+")"),e.addColorStop(1,"rgb(0, 0, 0)"),d.fillStyle=e,d.fillRect(0,0,this.lineCanvas.offsetWidth,this.lineCanvas.offsetHeight),this.element.nextElementSibling.children[0].style.marginLeft=0,this.fillSelector(a,b,c)};var h=this;this.setupBindings=function(){var a=this.canvas,b=a.getContext("2d"),c=this;a.addEventListener("click",function(a){var d=a.offsetX||a.clientX-this.offsetLeft,e=a.offsetY||a.clientY-this.offsetTop,f=b.getImageData(d,e,1,1).data;0===f[0]&&0===f[1]&&0===f[2]||c.fillColorLine(f[0],f[1],f[2])}),c.lineCanvas.addEventListener("click",g)},this.fillSelector=function(a,c,d){var g=this.selectorCanvas.getContext("2d");e.value=a+", "+c+", "+d,f.value="#"+b(a)+b(c)+b(d);var h="rgb("+e.value+")";g.fillStyle=h,g.fillRect(0,0,this.selectorCanvas.offsetWidth,this.selectorCanvas.offsetHeight),document.getElementById("selected-color-div").value=h},this.afterInit(),this.finish()}function b(a){var b=a.toString(16);return 1===b.length?"0"+b:b}function c(b,c){function d(){return d.cached||(d.cached=document.getElementsByClassName("color-line")[0].getBoundingClientRect()),d.cached}function e(a){var b=a.x-d().left;b>=0&&b<=300&&(m.style.marginLeft=b+"px");var c=new Event("click");c.clientX=a.clientX,c.clientY=a.clientY,l.children[1].dispatchEvent(c)}b=b||"OK",c=c||"Cancel";var f=eDOM.el("asc-dialog");f.id="sample-color-picker";var g=eDOM.el("asc-dialog-header");g.innerText="Color picker";var h=eDOM.el("div");h.id="color-loader",h.classList.add("asc"),h.classList.add("asc-activity-indicator"),h.classList.add("absolute-center");var i=eDOM.el("asc-content");i.appendChild(g);var j=eDOM.el("asc-actions");f.appendChild(i),f.appendChild(j),document.body.appendChild(f),i.appendChild(h);var k=eDOM.el("div");k.classList.add("color-circle"),i.appendChild(k);var l=eDOM.el("div");l.classList.add("color-line"),i.appendChild(l),l.addEventListener("click",e);var m=eDOM.el("div");m.classList.add("color-selector-line"),l.appendChild(m),m.addEventListener("mousedown",function(a){document.body.addEventListener("mouseup",function(a){console.log("mouseup"),l.removeAttribute("fill-on-move"),document.body.removeEventListener("mousemove",e)}),console.log("mousedown"),l.setAttribute("fill-on-move",""),document.body.addEventListener("mousemove",e)});var n=eDOM.el("hr");n.id="color-hr",i.appendChild(n);var o=eDOM.el("div");o.classList.add("selected-color-details");var p=eDOM.el("div");p.classList.add("color-selector"),o.appendChild(p);var q=eDOM.el("div");q.classList.add("detail-inputs-block"),o.appendChild(q);var r=eDOM.el("div");r.classList.add("rgb-input-block"),q.appendChild(r);var s=eDOM.el("div");s.classList.add("rgb-input-label"),s.innerHTML="RGB: ",r.appendChild(s);var t=eDOM.el("input");t.setAttribute("readonly",""),t.classList.add("asc"),t.value="0, 0, 0",r.appendChild(t);var u=eDOM.el("button");u.classList.add("asc"),u.classList.add("asc-icon-button");var v=eDOM.el("span");v.classList.add("fa"),v.classList.add("fa-copy"),u.appendChild(v),u.addEventListener("click",function(){t.select(),document.execCommand("copy"),t.selectionStart=t.selectionEnd}),r.appendChild(u);var w=eDOM.el("div");w.classList.add("rgb-input-block"),q.appendChild(w);var x=eDOM.el("div");x.classList.add("rgb-input-label"),x.innerHTML="Hex: ",w.appendChild(x);var y=eDOM.el("input");y.setAttribute("readonly",""),y.classList.add("asc"),y.value="#000000",w.appendChild(y);var z=eDOM.el("button");z.classList.add("asc"),z.classList.add("asc-icon-button");var A=eDOM.el("span");A.classList.add("fa"),A.classList.add("fa-copy"),z.appendChild(A),z.addEventListener("click",function(){y.select(),document.execCommand("copy"),y.selectionStart=y.selectionEnd}),w.appendChild(z),i.appendChild(o);var B=eDOM.el("input");B.setAttribute("hidden",""),B.id="selected-color-div",i.appendChild(B);var C=eDOM.el("asc-action-button");C.innerText=b,C.setAttribute("resolve",""),C.setAttribute("return-value-id",B.id);var D=eDOM.el("asc-action-button");D.innerText=c,D.setAttribute("reject",""),j.appendChild(D),j.appendChild(C);var E=function(){f.remove()};return showDialog(f.id,E,E,function(){new a(k,l,p,t,y)})}!function(){var a=eDOM.el("style");a.innerHTML+=".color-selector-line::before {content: '';\nposition: absolute;\nwidth: 0;\nheight: 0;\ntop: -7px;\nleft: -5px;\nborder-style: solid;\nborder-width: 7px 5px 0 5px;\nborder-color: #9e9e9e transparent transparent transparent;}",a.innerHTML+=".color-selector-line::after {content: '';\nposition: absolute;\nwidth: 0;\nheight: 0;\nbottom: -7px;\nleft: -5px;\nborder-style: solid;\nborder-width: 0 5px 7px 5px;\nborder-color: transparent transparent #9e9e9e transparent;}",a.innerHTML+=".color-circle {width: 300px;\ncursor: crosshair;\n}",a.innerHTML+=".color-line {width: 300px;\nheight: 50px;\ncursor: crosshair;\nposition: relative;\n}",a.innerHTML+=".color-line[fill-on-move] {cursor: pointer;\n}",a.innerHTML+=".color-selector-line {display: none;\nposition: absolute;\nwidth: 5px;\nheight: 50px;\ncursor: pointer;\nbackground: transparent;\nborder-left: 1px solid #fff;\n}",a.innerHTML+="#color-hr {height: 2px;\nwidth: 100%;\nborder: none;\nborder-top: 1px solid #949494;\ndisplay: none;\n}",a.innerHTML+=".selected-color-details {display: flex;\nalign-items: center;\n}",a.innerHTML+=".color-selector {height: 50px;\nwidth: 50px;\n}",a.innerHTML+=".detail-inputs-block {display: flex;\nflex: 1;\nflex-direction: column;\n}",a.innerHTML+=".rgb-input-block {display: none;\nalign-items: center;\n}",a.innerHTML+=".rgb-input-label {padding: 5px;\nflex: 1;\n}",a.innerHTML+=".color-circle canvas, .color-line canvas, .color-selector canvas {user-select: none;\n}",document.head.appendChild(a)}(),window.showColorPicker=c}(),asc.component("asc-popover",function(){this.init=function(a){var b=document.querySelector("button[data-id="+a.id+"]");b&&function(a){for(var c=eDOM.el("div.asc");a.children.length;)c.appendChild(a.children[0]);a.appendChild(c),a.addEventListener("click",function(a){a.stopImmediatePropagation()}),b.addEventListener("click",function(c){var d=eDOM.el("asc-backdrop");a.style.display="flex",a.style.top=b.offsetTop+b.offsetHeight+10+"px";var e,f=b.offsetLeft+b.offsetWidth/2-10;f+a.clientWidth>screen.availWidth?(f=screen.availWidth-a.clientWidth-20,e=b.offsetLeft-f+b.offsetWidth/2):e=0,a.style.left=f+"px",e<14?e=14:e+14>=a.clientWidth&&(e=a.clientWidth-24);var g="left: "+e+"px;";asc.addStyle("asc-popover:before{"+g+"}"),setTimeout(function(){var b=function(){d.remove(),a.style.display="none",document.body.removeEventListener("click",b)};document.body.addEventListener("click",b)},0),document.body.appendChild(d)})}(a)}}),asc.component("asc-combobox",function(){this.afterInit=function(a){for(var b=eDOM.el("div.dropdown-list");a.children.length;){var c=a.children[0];"ITEM"===c.tagName&&(c.innerText+=c.getAttribute("text"),b.appendChild(c))}a.appendChild(b);var d,e=eDOM.el("span"),f=a.getAttribute("data-selected-value");if(f)for(var g=0;g<b.children.length;g++){var h=b.children[g];if(h.getAttribute("value")===f){h.classList.add("selected"),d=h,e.innerHTML=h.getAttribute("text");break}}0===e.innerHTML.length&&(e.innerHTML=a.getAttribute("data-placeholder")),a.insertBefore(e,b),a.style.width=a.offsetWidth+"px",b.style.width=a.offsetWidth+14+"px";var i=function(){a.classList.remove("active"),document.body.removeEventListener("click",i)};a.addEventListener("click",function(b){a.classList.contains("active")?("ITEM"===b.target.tagName&&(d.classList.remove("selected"),d=b.target,b.target.classList.add("selected"),e.innerHTML=b.target.getAttribute("text"),a.setAttribute("data-selected-value",b.target.getAttribute("value"))),i()):(a.classList.add("active"),setTimeout(function(){document.body.addEventListener("click",i)},0))})}}),asc.component("asc-switch",function(){var a=this;this.init=function(){a.id=asc.getUniqueId()},this.checked=!1,this.afterInit=function(b){var c=b.getAttribute("checked");c&&(a.checked="true"===c)},this.onChecked=function(b){a.checked=!a.checked,a.events.change&&a.events.change(a.checked)},this.template='<input type="checkbox" id="{{id}}" checked="{{checked}}" (click)="onChecked(ev)">\n<label for="{{id}}"></label>',this.params=[{name:"checked",func:function(b,c){a.checked="true"===c}}],this.events=["change"]}),asc.component("asc-radio-group",function(){function a(a){for(var c=0;c<b.element.childNodes.length;c++){var d=b.element.childNodes[c];"ASC-RADIO-BUTTON"===d.tagName&&d.getAttribute("value")===a&&d.setAttribute("checked","true")}}var b=this,c=asc.getUniqueId();this.afterInit=function(d){b.element=d;for(var e=d.getAttribute("checked"),f=0;f<b.element.childNodes.length;f++){var g=b.element.childNodes[f];"ASC-RADIO-BUTTON"===g.tagName&&g.setAttribute("name",c)}a(e)},this.params=[{name:"checked",func:function(b,c){a(c)}}]}),asc.component("asc-radio-button",function(){var a=this;this.init=function(){a.id=asc.getUniqueId()},this.value="",this.displayText="",this.name="",this.afterInit=function(b){var c=b.getAttribute("value");c&&(a.value=c);var d=b.getAttribute("text");d&&(a.displayText=d);var e=b.getAttribute("name");e&&(a.name=e);var f=b.getAttribute("checked");if(f){var g=b.childNodes[0];g&&(g.checked="true"===f)}},this.template='<input type="radio" value="{{value}}" name="{{name}}" id="{{id}}">\n<label for="{{id}}">{{displayText}}</label>',this.params=[{name:"checked",func:function(a,b){var c=a.childNodes[0];c&&(c.checked="true"===b)}},{name:"text",func:function(b,c){c&&(a.displayText=c)}},{name:"value",func:function(b,c){c&&(a.value=c)}},{name:"name",func:function(b,c){c&&(a.name=c)}}]}),asc.component("asc-add-to-cart-button",function(){this.templateSrc="add-to-cart-button/template.html";var a=this;this.added=!1,this.afterInit=function(b){var c=b.getAttribute("added");c&&(a.added="true"===c)},this.params=[{name:"added",func:function(b,c){a.added="true"===c}}],this.toggleButton=function(){a.added=!a.added,a.updateEvents()},this.updateEvents=function(){a.added?a.events.add&&a.events.add():a.events.remove&&a.events.remove()},this.events=["add","remove"]}),asc.component("asc-checkbox",function(){var a=this;this.checked=!1,this.afterInit=function(b){a.element=b;var c=b.getAttribute("checked");c&&(a.checked="true"===c,a.checkItem()),a.element.addEventListener("click",function(){a.checked=!a.checked,a.checkItem()}),"ontouchstart"in window&&a.element.classList.add("touch")},this.params=[{name:"checked",func:function(b,c){var d="true"===c;a.checked!==d&&(a.checked=c,a.checkItem())}}],this.checkItem=function(){a.checked?a.element.classList.add("checked"):a.element.classList.remove("checked")},this.events=[{name:"checked-change",bindToProperty:"checked"}]});