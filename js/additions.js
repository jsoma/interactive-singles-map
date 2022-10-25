/* http://keith-wood.name/svg.html
   SVG for jQuery v1.4.5.
   Written by Keith Wood (kbwood{at}iinet.com.au) August 2007.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */
(function($){function SVGManager(){this._settings=[];this._extensions=[];this.regional=[];this.regional['']={errorLoadingText:'Error loading',notSupportedText:'This browser does not support SVG'};this.local=this.regional[''];this._uuid=new Date().getTime();this._renesis=detectActiveX('RenesisX.RenesisCtrl')}function detectActiveX(a){try{return!!(window.ActiveXObject&&new ActiveXObject(a))}catch(e){return false}}var q='svgwrapper';$.extend(SVGManager.prototype,{markerClassName:'hasSVG',svgNS:'http://www.w3.org/2000/svg',xlinkNS:'http://www.w3.org/1999/xlink',_wrapperClass:SVGWrapper,_attrNames:{class_:'class',in_:'in',alignmentBaseline:'alignment-baseline',baselineShift:'baseline-shift',clipPath:'clip-path',clipRule:'clip-rule',colorInterpolation:'color-interpolation',colorInterpolationFilters:'color-interpolation-filters',colorRendering:'color-rendering',dominantBaseline:'dominant-baseline',enableBackground:'enable-background',fillOpacity:'fill-opacity',fillRule:'fill-rule',floodColor:'flood-color',floodOpacity:'flood-opacity',fontFamily:'font-family',fontSize:'font-size',fontSizeAdjust:'font-size-adjust',fontStretch:'font-stretch',fontStyle:'font-style',fontVariant:'font-variant',fontWeight:'font-weight',glyphOrientationHorizontal:'glyph-orientation-horizontal',glyphOrientationVertical:'glyph-orientation-vertical',horizAdvX:'horiz-adv-x',horizOriginX:'horiz-origin-x',imageRendering:'image-rendering',letterSpacing:'letter-spacing',lightingColor:'lighting-color',markerEnd:'marker-end',markerMid:'marker-mid',markerStart:'marker-start',stopColor:'stop-color',stopOpacity:'stop-opacity',strikethroughPosition:'strikethrough-position',strikethroughThickness:'strikethrough-thickness',strokeDashArray:'stroke-dasharray',strokeDashOffset:'stroke-dashoffset',strokeLineCap:'stroke-linecap',strokeLineJoin:'stroke-linejoin',strokeMiterLimit:'stroke-miterlimit',strokeOpacity:'stroke-opacity',strokeWidth:'stroke-width',textAnchor:'text-anchor',textDecoration:'text-decoration',textRendering:'text-rendering',underlinePosition:'underline-position',underlineThickness:'underline-thickness',vertAdvY:'vert-adv-y',vertOriginY:'vert-origin-y',wordSpacing:'word-spacing',writingMode:'writing-mode'},_attachSVG:function(a,b){var c=(a.namespaceURI==this.svgNS?a:null);var a=(c?null:a);if($(a||c).hasClass(this.markerClassName)){return}if(typeof b=='string'){b={loadURL:b}}else if(typeof b=='function'){b={onLoad:b}}$(a||c).addClass(this.markerClassName);try{if(!c){c=document.createElementNS(this.svgNS,'svg');c.setAttribute('version','1.1');if(a.clientWidth>0){c.setAttribute('width',a.clientWidth)}if(a.clientHeight>0){c.setAttribute('height',a.clientHeight)}a.appendChild(c)}this._afterLoad(a,c,b||{})}catch(e){if($.browser.msie){if(!a.id){a.id='svg'+(this._uuid++)}this._settings[a.id]=b;a.innerHTML='<embed type="image/svg+xml" width="100%" '+'height="100%" src="'+(b.initPath||'')+'blank.svg" '+'pluginspage="http://www.adobe.com/svg/viewer/install/main.html"/>'}else{a.innerHTML='<p class="svg_error">'+this.local.notSupportedText+'</p>'}}},_registerSVG:function(){for(var i=0;i<document.embeds.length;i++){var a=document.embeds[i].parentNode;if(!$(a).hasClass($.svg.markerClassName)||$.data(a,q)){continue}var b=null;try{b=document.embeds[i].getSVGDocument()}catch(e){setTimeout($.svg._registerSVG,250);return}b=(b?b.documentElement:null);if(b){$.svg._afterLoad(a,b)}}},_afterLoad:function(a,b,c){var c=c||this._settings[a.id];this._settings[a?a.id:'']=null;var d=new this._wrapperClass(b,a);$.data(a||b,q,d);try{if(c.loadURL){d.load(c.loadURL,c)}if(c.settings){d.configure(c.settings)}if(c.onLoad&&!c.loadURL){c.onLoad.apply(a||b,[d])}}catch(e){alert(e)}},_getSVG:function(a){a=(typeof a=='string'?$(a)[0]:(a.jquery?a[0]:a));return $.data(a,q)},_destroySVG:function(a){var b=$(a);if(!b.hasClass(this.markerClassName)){return}b.removeClass(this.markerClassName);if(a.namespaceURI!=this.svgNS){b.empty()}$.removeData(a,q)},addExtension:function(a,b){this._extensions.push([a,b])},isSVGElem:function(a){return(a.nodeType==1&&a.namespaceURI==$.svg.svgNS)}});function SVGWrapper(a,b){this._svg=a;this._container=b;for(var i=0;i<$.svg._extensions.length;i++){var c=$.svg._extensions[i];this[c[0]]=new c[1](this)}}$.extend(SVGWrapper.prototype,{_width:function(){return(this._container?this._container.clientWidth:this._svg.width)},_height:function(){return(this._container?this._container.clientHeight:this._svg.height)},root:function(){return this._svg},configure:function(a,b,c){if(!a.nodeName){c=b;b=a;a=this._svg}if(c){for(var i=a.attributes.length-1;i>=0;i--){var d=a.attributes.item(i);if(!(d.nodeName=='onload'||d.nodeName=='version'||d.nodeName.substring(0,5)=='xmlns')){a.attributes.removeNamedItem(d.nodeName)}}}for(var e in b){a.setAttribute($.svg._attrNames[e]||e,b[e])}return this},getElementById:function(a){return this._svg.ownerDocument.getElementById(a)},change:function(a,b){if(a){for(var c in b){if(b[c]==null){a.removeAttribute($.svg._attrNames[c]||c)}else{a.setAttribute($.svg._attrNames[c]||c,b[c])}}}return this},_args:function(b,c,d){c.splice(0,0,'parent');c.splice(c.length,0,'settings');var e={};var f=0;if(b[0]!=null&&b[0].jquery){b[0]=b[0][0]}if(b[0]!=null&&!(typeof b[0]=='object'&&b[0].nodeName)){e['parent']=null;f=1}for(var i=0;i<b.length;i++){e[c[i+f]]=b[i]}if(d){$.each(d,function(i,a){if(typeof e[a]=='object'){e.settings=e[a];e[a]=null}})}return e},title:function(a,b,c){var d=this._args(arguments,['text']);var e=this._makeNode(d.parent,'title',d.settings||{});e.appendChild(this._svg.ownerDocument.createTextNode(d.text));return e},describe:function(a,b,c){var d=this._args(arguments,['text']);var e=this._makeNode(d.parent,'desc',d.settings||{});e.appendChild(this._svg.ownerDocument.createTextNode(d.text));return e},defs:function(a,b,c){var d=this._args(arguments,['id'],['id']);return this._makeNode(d.parent,'defs',$.extend((d.id?{id:d.id}:{}),d.settings||{}))},symbol:function(a,b,c,d,e,f,g){var h=this._args(arguments,['id','x1','y1','width','height']);return this._makeNode(h.parent,'symbol',$.extend({id:h.id,viewBox:h.x1+' '+h.y1+' '+h.width+' '+h.height},h.settings||{}))},marker:function(a,b,c,d,e,f,g,h){var i=this._args(arguments,['id','refX','refY','mWidth','mHeight','orient'],['orient']);return this._makeNode(i.parent,'marker',$.extend({id:i.id,refX:i.refX,refY:i.refY,markerWidth:i.mWidth,markerHeight:i.mHeight,orient:i.orient||'auto'},i.settings||{}))},style:function(a,b,c){var d=this._args(arguments,['styles']);var e=this._makeNode(d.parent,'style',$.extend({type:'text/css'},d.settings||{}));e.appendChild(this._svg.ownerDocument.createTextNode(d.styles));if($.browser.opera){$('head').append('<style type="text/css">'+d.styles+'</style>')}return e},script:function(a,b,c,d){var e=this._args(arguments,['script','type'],['type']);var f=this._makeNode(e.parent,'script',$.extend({type:e.type||'text/javascript'},e.settings||{}));f.appendChild(this._svg.ownerDocument.createTextNode(e.script));if(!$.browser.mozilla){$.globalEval(e.script)}return f},linearGradient:function(a,b,c,d,e,f,g,h){var i=this._args(arguments,['id','stops','x1','y1','x2','y2'],['x1']);var j=$.extend({id:i.id},(i.x1!=null?{x1:i.x1,y1:i.y1,x2:i.x2,y2:i.y2}:{}));return this._gradient(i.parent,'linearGradient',$.extend(j,i.settings||{}),i.stops)},radialGradient:function(a,b,c,d,e,r,f,g,h){var i=this._args(arguments,['id','stops','cx','cy','r','fx','fy'],['cx']);var j=$.extend({id:i.id},(i.cx!=null?{cx:i.cx,cy:i.cy,r:i.r,fx:i.fx,fy:i.fy}:{}));return this._gradient(i.parent,'radialGradient',$.extend(j,i.settings||{}),i.stops)},_gradient:function(a,b,c,d){var e=this._makeNode(a,b,c);for(var i=0;i<d.length;i++){var f=d[i];this._makeNode(e,'stop',$.extend({offset:f[0],stopColor:f[1]},(f[2]!=null?{stopOpacity:f[2]}:{})))}return e},pattern:function(a,b,x,y,c,d,e,f,g,h,i){var j=this._args(arguments,['id','x','y','width','height','vx','vy','vwidth','vheight'],['vx']);var k=$.extend({id:j.id,x:j.x,y:j.y,width:j.width,height:j.height},(j.vx!=null?{viewBox:j.vx+' '+j.vy+' '+j.vwidth+' '+j.vheight}:{}));return this._makeNode(j.parent,'pattern',$.extend(k,j.settings||{}))},clipPath:function(a,b,c,d){var e=this._args(arguments,['id','units']);e.units=e.units||'userSpaceOnUse';return this._makeNode(e.parent,'clipPath',$.extend({id:e.id,clipPathUnits:e.units},e.settings||{}))},mask:function(a,b,x,y,c,d,e){var f=this._args(arguments,['id','x','y','width','height']);return this._makeNode(f.parent,'mask',$.extend({id:f.id,x:f.x,y:f.y,width:f.width,height:f.height},f.settings||{}))},createPath:function(){return new SVGPath()},createText:function(){return new SVGText()},svg:function(a,x,y,b,c,d,e,f,g,h){var i=this._args(arguments,['x','y','width','height','vx','vy','vwidth','vheight'],['vx']);var j=$.extend({x:i.x,y:i.y,width:i.width,height:i.height},(i.vx!=null?{viewBox:i.vx+' '+i.vy+' '+i.vwidth+' '+i.vheight}:{}));return this._makeNode(i.parent,'svg',$.extend(j,i.settings||{}))},group:function(a,b,c){var d=this._args(arguments,['id'],['id']);return this._makeNode(d.parent,'g',$.extend({id:d.id},d.settings||{}))},use:function(a,x,y,b,c,d,e){var f=this._args(arguments,['x','y','width','height','ref']);if(typeof f.x=='string'){f.ref=f.x;f.settings=f.y;f.x=f.y=f.width=f.height=null}var g=this._makeNode(f.parent,'use',$.extend({x:f.x,y:f.y,width:f.width,height:f.height},f.settings||{}));g.setAttributeNS($.svg.xlinkNS,'href',f.ref);return g},link:function(a,b,c){var d=this._args(arguments,['ref']);var e=this._makeNode(d.parent,'a',d.settings);e.setAttributeNS($.svg.xlinkNS,'href',d.ref);return e},image:function(a,x,y,b,c,d,e){var f=this._args(arguments,['x','y','width','height','ref']);var g=this._makeNode(f.parent,'image',$.extend({x:f.x,y:f.y,width:f.width,height:f.height},f.settings||{}));g.setAttributeNS($.svg.xlinkNS,'href',f.ref);return g},path:function(a,b,c){var d=this._args(arguments,['path']);return this._makeNode(d.parent,'path',$.extend({d:(d.path.path?d.path.path():d.path)},d.settings||{}))},rect:function(a,x,y,b,c,d,e,f){var g=this._args(arguments,['x','y','width','height','rx','ry'],['rx']);return this._makeNode(g.parent,'rect',$.extend({x:g.x,y:g.y,width:g.width,height:g.height},(g.rx?{rx:g.rx,ry:g.ry}:{}),g.settings||{}))},circle:function(a,b,c,r,d){var e=this._args(arguments,['cx','cy','r']);return this._makeNode(e.parent,'circle',$.extend({cx:e.cx,cy:e.cy,r:e.r},e.settings||{}))},ellipse:function(a,b,c,d,e,f){var g=this._args(arguments,['cx','cy','rx','ry']);return this._makeNode(g.parent,'ellipse',$.extend({cx:g.cx,cy:g.cy,rx:g.rx,ry:g.ry},g.settings||{}))},line:function(a,b,c,d,e,f){var g=this._args(arguments,['x1','y1','x2','y2']);return this._makeNode(g.parent,'line',$.extend({x1:g.x1,y1:g.y1,x2:g.x2,y2:g.y2},g.settings||{}))},polyline:function(a,b,c){var d=this._args(arguments,['points']);return this._poly(d.parent,'polyline',d.points,d.settings)},polygon:function(a,b,c){var d=this._args(arguments,['points']);return this._poly(d.parent,'polygon',d.points,d.settings)},_poly:function(a,b,c,d){var e='';for(var i=0;i<c.length;i++){e+=c[i].join()+' '}return this._makeNode(a,b,$.extend({points:$.trim(e)},d||{}))},text:function(a,x,y,b,c){var d=this._args(arguments,['x','y','value']);if(typeof d.x=='string'&&arguments.length<4){d.value=d.x;d.settings=d.y;d.x=d.y=null}return this._text(d.parent,'text',d.value,$.extend({x:(d.x&&isArray(d.x)?d.x.join(' '):d.x),y:(d.y&&isArray(d.y)?d.y.join(' '):d.y)},d.settings||{}))},textpath:function(a,b,c,d){var e=this._args(arguments,['path','value']);var f=this._text(e.parent,'textPath',e.value,e.settings||{});f.setAttributeNS($.svg.xlinkNS,'href',e.path);return f},_text:function(a,b,c,d){var e=this._makeNode(a,b,d);if(typeof c=='string'){e.appendChild(e.ownerDocument.createTextNode(c))}else{for(var i=0;i<c._parts.length;i++){var f=c._parts[i];if(f[0]=='tspan'){var g=this._makeNode(e,f[0],f[2]);g.appendChild(e.ownerDocument.createTextNode(f[1]));e.appendChild(g)}else if(f[0]=='tref'){var g=this._makeNode(e,f[0],f[2]);g.setAttributeNS($.svg.xlinkNS,'href',f[1]);e.appendChild(g)}else if(f[0]=='textpath'){var h=$.extend({},f[2]);h.href=null;var g=this._makeNode(e,f[0],h);g.setAttributeNS($.svg.xlinkNS,'href',f[2].href);g.appendChild(e.ownerDocument.createTextNode(f[1]));e.appendChild(g)}else{e.appendChild(e.ownerDocument.createTextNode(f[1]))}}}return e},other:function(a,b,c){var d=this._args(arguments,['name']);return this._makeNode(d.parent,d.name,d.settings||{})},_makeNode:function(a,b,c){a=a||this._svg;var d=this._svg.ownerDocument.createElementNS($.svg.svgNS,b);for(var b in c){var e=c[b];if(e!=null&&e!=null&&(typeof e!='string'||e!='')){d.setAttribute($.svg._attrNames[b]||b,e)}}a.appendChild(d);return d},add:function(b,c){var d=this._args((arguments.length==1?[null,b]:arguments),['node']);var f=this;d.parent=d.parent||this._svg;d.node=(d.node.jquery?d.node:$(d.node));try{if($.svg._renesis){throw'Force traversal';}d.parent.appendChild(d.node.cloneNode(true))}catch(e){d.node.each(function(){var a=f._cloneAsSVG(this);if(a){d.parent.appendChild(a)}})}return this},clone:function(b,c){var d=this;var e=this._args((arguments.length==1?[null,b]:arguments),['node']);e.parent=e.parent||this._svg;e.node=(e.node.jquery?e.node:$(e.node));var f=[];e.node.each(function(){var a=d._cloneAsSVG(this);if(a){a.id='';e.parent.appendChild(a);f.push(a)}});return f},_cloneAsSVG:function(a){var b=null;if(a.nodeType==1){b=this._svg.ownerDocument.createElementNS($.svg.svgNS,this._checkName(a.nodeName));for(var i=0;i<a.attributes.length;i++){var c=a.attributes.item(i);if(c.nodeName!='xmlns'&&c.nodeValue){if(c.prefix=='xlink'){b.setAttributeNS($.svg.xlinkNS,c.localName||c.baseName,c.nodeValue)}else{b.setAttribute(this._checkName(c.nodeName),c.nodeValue)}}}for(var i=0;i<a.childNodes.length;i++){var d=this._cloneAsSVG(a.childNodes[i]);if(d){b.appendChild(d)}}}else if(a.nodeType==3){if($.trim(a.nodeValue)){b=this._svg.ownerDocument.createTextNode(a.nodeValue)}}else if(a.nodeType==4){if($.trim(a.nodeValue)){try{b=this._svg.ownerDocument.createCDATASection(a.nodeValue)}catch(e){b=this._svg.ownerDocument.createTextNode(a.nodeValue.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'))}}}return b},_checkName:function(a){a=(a.substring(0,1)>='A'&&a.substring(0,1)<='Z'?a.toLowerCase():a);return(a.substring(0,4)=='svg:'?a.substring(4):a)},load:function(j,k){k=(typeof k=='boolean'?{addTo:k}:(typeof k=='function'?{onLoad:k}:(typeof k=='string'?{parent:k}:(typeof k=='object'&&k.nodeName?{parent:k}:(typeof k=='object'&&k.jquery?{parent:k}:k||{})))));if(!k.parent&&!k.addTo){this.clear(false)}var l=[this._svg.getAttribute('width'),this._svg.getAttribute('height')];var m=this;var n=function(a){a=$.svg.local.errorLoadingText+': '+a;if(k.onLoad){k.onLoad.apply(m._container||m._svg,[m,a])}else{m.text(null,10,20,a)}};var o=function(a){var b=new ActiveXObject('Microsoft.XMLDOM');b.validateOnParse=false;b.resolveExternals=false;b.async=false;b.loadXML(a);if(b.parseError.errorCode!=0){n(b.parseError.reason);return null}return b};var p=function(a){if(!a){return}if(a.documentElement.nodeName!='svg'){var b=a.getElementsByTagName('parsererror');var c=(b.length?b[0].getElementsByTagName('div'):[]);n(!b.length?'???':(c.length?c[0]:b[0]).firstChild.nodeValue);return}var d=(k.parent?$(k.parent)[0]:m._svg);var f={};for(var i=0;i<a.documentElement.attributes.length;i++){var g=a.documentElement.attributes.item(i);if(!(g.nodeName=='version'||g.nodeName.substring(0,5)=='xmlns')){f[g.nodeName]=g.nodeValue}}m.configure(d,f,!k.parent);var h=a.documentElement.childNodes;for(var i=0;i<h.length;i++){try{if($.svg._renesis){throw'Force traversal';}d.appendChild(m._svg.ownerDocument.importNode(h[i],true));if(h[i].nodeName=='script'){$.globalEval(h[i].textContent)}}catch(e){m.add(d,h[i])}}if(!k.changeSize){m.configure(d,{width:l[0],height:l[1]})}if(k.onLoad){k.onLoad.apply(m._container||m._svg,[m])}};if(j.match('<svg')){p($.browser.msie?o(j):new DOMParser().parseFromString(j,'text/xml'))}else{$.ajax({url:j,dataType:($.browser.msie?'text':'xml'),success:function(a){p($.browser.msie?o(a):a)},error:function(a,b,c){n(b+(c?' '+c.message:''))}})}return this},remove:function(a){a=(a.jquery?a[0]:a);a.parentNode.removeChild(a);return this},clear:function(a){if(a){this.configure({},true)}while(this._svg.firstChild){this._svg.removeChild(this._svg.firstChild)}return this},toSVG:function(a){a=a||this._svg;return(typeof XMLSerializer=='undefined'?this._toSVG(a):new XMLSerializer().serializeToString(a))},_toSVG:function(a){var b='';if(!a){return b}if(a.nodeType==3){b=a.nodeValue}else if(a.nodeType==4){b='<![CDATA['+a.nodeValue+']]>'}else{b='<'+a.nodeName;if(a.attributes){for(var i=0;i<a.attributes.length;i++){var c=a.attributes.item(i);if(!($.trim(c.nodeValue)==''||c.nodeValue.match(/^\[object/)||c.nodeValue.match(/^function/))){b+=' '+(c.namespaceURI==$.svg.xlinkNS?'xlink:':'')+c.nodeName+'="'+c.nodeValue+'"'}}}if(a.firstChild){b+='>';var d=a.firstChild;while(d){b+=this._toSVG(d);d=d.nextSibling}b+='</'+a.nodeName+'>'}else{b+='/>'}}return b}});function SVGPath(){this._path=''}$.extend(SVGPath.prototype,{reset:function(){this._path='';return this},move:function(x,y,a){a=(isArray(x)?y:a);return this._coords((a?'m':'M'),x,y)},line:function(x,y,a){a=(isArray(x)?y:a);return this._coords((a?'l':'L'),x,y)},horiz:function(x,a){this._path+=(a?'h':'H')+(isArray(x)?x.join(' '):x);return this},vert:function(y,a){this._path+=(a?'v':'V')+(isArray(y)?y.join(' '):y);return this},curveC:function(a,b,c,d,x,y,e){e=(isArray(a)?b:e);return this._coords((e?'c':'C'),a,b,c,d,x,y)},smoothC:function(a,b,x,y,c){c=(isArray(a)?b:c);return this._coords((c?'s':'S'),a,b,x,y)},curveQ:function(a,b,x,y,c){c=(isArray(a)?b:c);return this._coords((c?'q':'Q'),a,b,x,y)},smoothQ:function(x,y,a){a=(isArray(x)?y:a);return this._coords((a?'t':'T'),x,y)},_coords:function(a,b,c,d,e,f,g){if(isArray(b)){for(var i=0;i<b.length;i++){var h=b[i];this._path+=(i==0?a:' ')+h[0]+','+h[1]+(h.length<4?'':' '+h[2]+','+h[3]+(h.length<6?'':' '+h[4]+','+h[5]))}}else{this._path+=a+b+','+c+(d==null?'':' '+d+','+e+(f==null?'':' '+f+','+g))}return this},arc:function(a,b,c,d,e,x,y,f){f=(isArray(a)?b:f);this._path+=(f?'a':'A');if(isArray(a)){for(var i=0;i<a.length;i++){var g=a[i];this._path+=(i==0?'':' ')+g[0]+','+g[1]+' '+g[2]+' '+(g[3]?'1':'0')+','+(g[4]?'1':'0')+' '+g[5]+','+g[6]}}else{this._path+=a+','+b+' '+c+' '+(d?'1':'0')+','+(e?'1':'0')+' '+x+','+y}return this},close:function(){this._path+='z';return this},path:function(){return this._path}});SVGPath.prototype.moveTo=SVGPath.prototype.move;SVGPath.prototype.lineTo=SVGPath.prototype.line;SVGPath.prototype.horizTo=SVGPath.prototype.horiz;SVGPath.prototype.vertTo=SVGPath.prototype.vert;SVGPath.prototype.curveCTo=SVGPath.prototype.curveC;SVGPath.prototype.smoothCTo=SVGPath.prototype.smoothC;SVGPath.prototype.curveQTo=SVGPath.prototype.curveQ;SVGPath.prototype.smoothQTo=SVGPath.prototype.smoothQ;SVGPath.prototype.arcTo=SVGPath.prototype.arc;function SVGText(){this._parts=[]}$.extend(SVGText.prototype,{reset:function(){this._parts=[];return this},string:function(a){this._parts[this._parts.length]=['text',a];return this},span:function(a,b){this._parts[this._parts.length]=['tspan',a,b];return this},ref:function(a,b){this._parts[this._parts.length]=['tref',a,b];return this},path:function(a,b,c){this._parts[this._parts.length]=['textpath',b,$.extend({href:a},c||{})];return this}});$.fn.svg=function(a){var b=Array.prototype.slice.call(arguments,1);if(typeof a=='string'&&a=='get'){return $.svg['_'+a+'SVG'].apply($.svg,[this[0]].concat(b))}return this.each(function(){if(typeof a=='string'){$.svg['_'+a+'SVG'].apply($.svg,[this].concat(b))}else{$.svg._attachSVG(this,a||{})}})};function isArray(a){return(a&&a.constructor==Array)}$.svg=new SVGManager()})(jQuery);
/* http://keith-wood.name/svg.html
   jQuery DOM compatibility for jQuery SVG v1.4.5.
   Written by Keith Wood (kbwood{at}iinet.com.au) April 2009.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses.
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

    var rclass = /[\t\r\n]/g,
        rspace = /\s+/,
        rwhitespace = "[\\x20\\t\\r\\n\\f]";

/* Support adding class names to SVG nodes. */
$.fn.addClass = function(origAddClass) {
	return function(value) {
        var classNames, i, l, elem,
            setClass, c, cl;

        if ( jQuery.isFunction( value ) ) {
            return this.each(function( j ) {
                jQuery( this ).addClass( value.call(this, j, this.className) );
            });
        }

        if ( value && typeof value === "string" ) {
            classNames = value.split( rspace );

            for ( i = 0, l = this.length; i < l; i++ ) {
                elem = this[ i ];

                if ( elem.nodeType === 1 ) {
                    if ( !(elem.className && elem.getAttribute('class')) && classNames.length === 1 ) {
                        if ($.svg.isSVGElem(elem)) {
                            (elem.className ? elem.className.baseVal = value
                                : elem.setAttribute('class',  value));
                        } else {
                            elem.className = value;
                        }
                    } else {
                        setClass = !$.svg.isSVGElem(elem) ? elem.className :
                                   elem.className ? elem.className.baseVal :
                                   elem.getAttribute('class');

                        setClass = (" " + setClass + " ");
                        for ( c = 0, cl = classNames.length; c < cl; c++ ) {
                            if ( setClass.indexOf( " " + classNames[ c ] + " " ) < 0 ) {
                                setClass += classNames[ c ] + " ";
                            }
                        }

                        setClass = jQuery.trim(setClass);
                        if ($.svg.isSVGElem(elem)) {

                            (elem.className ? elem.className.baseVal = setClass
                                : elem.setAttribute('class',  setClass));
                        } else {
                            elem.className = setClass;
                        }
                    }
                }
            }
        }

        return this;
	};
}($.fn.addClass);

/* Support removing class names from SVG nodes. */
$.fn.removeClass = function(origRemoveClass) {
	return function(value) {
        var classNames, i, l, elem, className, c, cl;

        if ( jQuery.isFunction( value ) ) {
            return this.each(function( j ) {
                jQuery( this ).removeClass( value.call(this, j, this.className) );
            });
        }

        if ( (value && typeof value === "string") || value === undefined ) {
            classNames = ( value || "" ).split( rspace );

            for ( i = 0, l = this.length; i < l; i++ ) {
                elem = this[ i ];

                if ( elem.nodeType === 1 && (elem.className || elem.getAttribute('class')) ) {
                    if ( value ) {
                        className =  !$.svg.isSVGElem(elem) ? elem.className :
                                     elem.className ? elem.className.baseVal :
                                     elem.getAttribute('class');

                        className = (" " + className + " ").replace( rclass, " " );

                        for ( c = 0, cl = classNames.length; c < cl; c++ ) {
                            // Remove until there is nothing to remove,
                            while ( className.indexOf(" " + classNames[ c ] + " ") >= 0 ) {
                                className = className.replace( " " + classNames[ c ] + " " , " " );
                            }
                        }

                        className = jQuery.trim( className );
                    } else {
                        className = "";
                    }

                    if ($.svg.isSVGElem(elem)) {
                        (elem.className ? elem.className.baseVal = className
                            : elem.setAttribute('class',  className));
                    } else {
                        elem.className = className;
                    }
                }
            }
        }

        return this;
	};
}($.fn.removeClass);

/* Support toggling class names on SVG nodes. */
$.fn.toggleClass = function(origToggleClass) {
	return function(className, state) {
		return this.each(function() {
			if ($.svg.isSVGElem(this)) {
				if (typeof state !== 'boolean') {
					state = !$(this).hasClass(className);
				}
				$(this)[(state ? 'add' : 'remove') + 'Class'](className);
			}
			else {
				origToggleClass.apply($(this), [className, state]);
			}
		});
	};
}($.fn.toggleClass);

/* Support checking class names on SVG nodes. */
$.fn.hasClass = function(origHasClass) {
	return function(selector) {

        var className = " " + selector + " ",
            i = 0,
            l = this.length,
            elem, classes;

        for ( ; i < l; i++ ) {
            elem = this[i];
            if ( elem.nodeType === 1) {
                classes = !$.svg.isSVGElem(elem) ? elem.className :
                          elem.className ? elem.className.baseVal :
                          elem.getAttribute('class');
                if ((" " + classes + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
                    return true;
                }
            }
        }

        return false;
	};
}($.fn.hasClass);

/* Support attributes on SVG nodes. */
$.fn.attr = function(origAttr) {
	return function(name, value, type) {
        var origArgs = arguments;
		if (typeof name === 'string' && value === undefined) {
			var val = origAttr.apply(this, origArgs);
			if (val && val.baseVal && val.baseVal.numberOfItems != null) { // Multiple values
				value = '';
				val = val.baseVal;
				if (name == 'transform') {
					for (var i = 0; i < val.numberOfItems; i++) {
						var item = val.getItem(i);
						switch (item.type) {
							case 1: value += ' matrix(' + item.matrix.a + ',' + item.matrix.b + ',' +
										item.matrix.c + ',' + item.matrix.d + ',' +
										item.matrix.e + ',' + item.matrix.f + ')';
									break;
							case 2: value += ' translate(' + item.matrix.e + ',' + item.matrix.f + ')'; break;
							case 3: value += ' scale(' + item.matrix.a + ',' + item.matrix.d + ')'; break;
							case 4: value += ' rotate(' + item.angle + ')'; break; // Doesn't handle new origin
							case 5: value += ' skewX(' + item.angle + ')'; break;
							case 6: value += ' skewY(' + item.angle + ')'; break;
						}
					}
					val = value.substring(1);
				}
				else {
					val = val.getItem(0).valueAsString;
				}
			}
			return (val && val.baseVal ? val.baseVal.valueAsString : val);
		}

		var options = name;
		if (typeof name === 'string') {
			options = {};
			options[name] = value;
		}
		return $(this).each(function() {
			if ($.svg.isSVGElem(this)) {
				for (var n in options) {
					var val = ($.isFunction(options[n]) ? options[n]() : options[n]);
					(type ? this.style[n] = val : this.setAttribute(n, val));
				}
			}
			else {
				origAttr.apply($(this), origArgs);
			}
		});
	};
}($.fn.attr);

/* Support removing attributes on SVG nodes. */
$.fn.removeAttr = function(origRemoveAttr) {
	return function(name) {
		return this.each(function() {
			if ($.svg.isSVGElem(this)) {
				(this[name] && this[name].baseVal ? this[name].baseVal.value = '' :
					this.setAttribute(name, ''));
			}
			else {
				origRemoveAttr.apply($(this), [name]);
			}
		});
	};
}($.fn.removeAttr);

/* Add numeric only properties. */
$.extend($.cssNumber, {
	'stopOpacity': true,
	'strokeMitrelimit': true,
	'strokeOpacity': true
});

/* Support retrieving CSS/attribute values on SVG nodes. */
if ($.cssProps) {
	$.css = function(origCSS) {
		return function(elem, name, numeric, extra) {
			var value = (name.match(/^svg.*/) ? $(elem).attr($.cssProps[name] || name) : '');
			return value || origCSS(elem, name, numeric, extra);
		};
	}($.css);
}

$.find.isXML = function(origIsXml) {
    return function(elem) {
        return $.svg.isSVGElem(elem) || origIsXml(elem);
    }
}($.find.isXML)

var div = document.createElement('div');
div.appendChild(document.createComment(''));
if (div.getElementsByTagName('*').length > 0) { // Make sure no comments are found
	$.expr.find.TAG = function(match, context) {
		var results = context.getElementsByTagName(match[1]);
		if (match[1] === '*') { // Filter out possible comments
			var tmp = [];
			for (var i = 0; results[i] || results.item(i); i++) {
				if ((results[i] || results.item(i)).nodeType === 1) {
					tmp.push(results[i] || results.item(i));
				}
			}
			results = tmp;
		}
		return results;
	};
}

$.expr.filter.CLASS = function(className) {
    var pattern = new RegExp("(^|" + rwhitespace + ")" + className + "(" + rwhitespace + "|$)");
    return function( elem ) {
        var elemClass = (!$.svg.isSVGElem(elem) ? elem.className || (typeof elem.getAttribute !== "undefined" && elem.getAttribute("class")) || ""  :
            (elem.className ? elem.className.baseVal : elem.getAttribute('class')));

        return pattern.test( elemClass );
    };
};

/*
	In the removeData function (line 1881, v1.7.2):

				if ( jQuery.support.deleteExpando ) {
					delete elem[ internalKey ];
				} else {
					try { // SVG
						elem.removeAttribute( internalKey );
					} catch (e) {
						elem[ internalKey ] = null;
					}
				}

	In the event.add function (line 2985, v1.7.2):

				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					try { // SVG
						elem.addEventListener( type, eventHandle, false );
					} catch(e) {
						if ( elem.attachEvent ) {
							elem.attachEvent( "on" + type, eventHandle );
						}
					}
				}

	In the event.remove function (line 3074, v1.7.2):

			if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
				try { // SVG
					elem.removeEventListener(type, elemData.handle, false);
				}
				catch (e) {
					if (elem.detachEvent) {
						elem.detachEvent("on" + type, elemData.handle);
					}
				}
			}

	In the event.fix function (line 3394, v1.7.2):

		if (event.target.namespaceURI == 'http://www.w3.org/2000/svg') { // SVG
			event.button = [1, 4, 2][event.button];
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		// Note: button is not normalized, so don't use it
		if ( !event.which && button !== undefined ) {
			event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
		}

	In the Sizzle function (line 4083, v1.7.2):

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );

		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
				results.push( set[i] || set.item(i) ); // SVG
				}
			}

		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] || set.item(i) ); // SVG
				}
			}
		}
	} else {...

	In the fallback for the Sizzle makeArray function (line 4877, v1.7.2):

	if ( toString.call(array) === "[object Array]" ) {
		Array.prototype.push.apply( ret, array );

	} else {
		if ( typeof array.length === "number" ) {
			for ( var l = array.length; i &lt; l; i++ ) {
				ret.push( array[i] || array.item(i) ); // SVG
			}

		} else {
			for ( ; array[i]; i++ ) {
				ret.push( array[i] );
			}
		}
	}

	In the jQuery.cleandata function (line 6538, v1.7.2):

				if ( deleteExpando ) {
					delete elem[ jQuery.expando ];

				} else {
					try { // SVG
						elem.removeAttribute( jQuery.expando );
					} catch (e) {
						// Ignore
					}
				}

	In the fallback getComputedStyle function (line 6727, v1.7.2):

		defaultView = (elem.ownerDocument ? elem.ownerDocument.defaultView : elem.defaultView); // SVG
		if ( defaultView &&
		(computedStyle = defaultView.getComputedStyle( elem, null )) ) {

			ret = computedStyle.getPropertyValue( name );
			...

*/

})(jQuery);/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

;(function($){$.fn.unveil=function(threshold){var $w=$(window),th=threshold||0,retina=window.devicePixelRatio>1,attrib=retina?"data-src-retina":"data-src",images=this,loaded,inview,source;this.one("unveil",function(){source=this.getAttribute(attrib);source=source||this.getAttribute("data-src");if(source)this.setAttribute("src",source);});function unveil(){inview=images.filter(function(){var $e=$(this),wt=$w.scrollTop(),wb=wt+$w.height(),et=$e.offset().top,eb=et+$e.height();return eb>=wt-th&&et<=wb+th;});loaded=inview.trigger("unveil");images=images.not(loaded);}$w.scroll(unveil);$w.resize(unveil);unveil();return this;};})(jQuery);// tipsy, facebook style tooltips for jquery
// version 1.0.0a
// (c) 2008-2010 jason frame [jason@onehackoranother.com]
// released under the MIT license
// Modified by Justin Donaldson [donaldson@bigml.com]
// Added:
// 1) Correctly handle svg elements (title children and/or xlink:title attr)
// 2) Add some new dynamic gravity placement functions autoNWNE and autoSWSE
// 3) z-index override for tipsies on top of tipsies
// 4) Custom className argument that allows adding classes to the tipsy popup
// 5) Add custom cancelHide function argument that can override a tipsy hide
//    behavior. This is useful when you wish to keep a parent tipsy open while
//    its child is still active.
(function($) {

    function maybeCall(thing, ctx) {
        return (typeof thing == 'function') ? (thing.call(ctx)) : thing;
    }

    // CAUTION the current implementation does not allow for tipsied elements to stay out of DOM (in between events)
    // i.e. don't remove, store, then re-insert tipsied elements (and why would you want to do that anyway?)
    var garbageCollect = (function() {
        var currentInterval;
        var to = null;
        var tipsies = [];

        function _do() {
            for (var i = 0; i < tipsies.length;) {
                var t = tipsies[i];
                // FIXME? the 2nd (non-paranoid) check is from the link below, it should be replaced if a better way is found
                // http://stackoverflow.com/questions/4040715/check-if-cached-jquery-object-is-still-in-dom
                if (t.options.gcInterval === 0 || t.$element.closest('body').length === 0) {
                    t.hoverState = 'out';
                    t.hide();
                    tipsies.splice(i,1);
                } else {
                    i++;
                }
            }
        }
        function _loop() {
            to = setTimeout(function() { _do(); _loop(); }, currentInterval);
        }

        return function(t) {
            if (t.options.gcInterval === 0) return;

            if (to && t.options.gcInterval < currentInterval) {
                clearTimeout(to); to = null;
                currentInterval = t.options.gcInterval;
            }
            tipsies.push(t);
            if (!to) _loop();
        };
    })();

    function Tipsy(element, options) {
        this.$element = $(element);
        this.options = options;
        this.enabled = true;
        this.fixTitle();
        garbageCollect(this);
    }


    Tipsy.prototype = {
        show: function() {
            var title = this.getTitle();
            if (title && this.enabled) {
                var $tip = this.tip();

                $tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](title);
                $tip[0].className = 'tipsy'; // reset classname in case of dynamic gravity
                $tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).prependTo(document.body);

                var pos = $.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth || 0,
                    height: this.$element[0].offsetHeight || 0
                });

                if (typeof this.$element[0].nearestViewportElement == 'object') {
                    // SVG
					var el = this.$element[0];
                    var rect = el.getBoundingClientRect();
					pos.width = rect.width;
					pos.height = rect.height;
                }


                var actualWidth = $tip[0].offsetWidth,
                    actualHeight = $tip[0].offsetHeight,
                    gravity = maybeCall(this.options.gravity, this.$element[0]);

                var tp;
                switch (gravity.charAt(0)) {
                    case 'n':
                        tp = {top: pos.top + pos.height + this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 's':
                        tp = {top: pos.top - actualHeight - this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 'e':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - this.options.offset};
                        break;
                    case 'w':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + this.options.offset};
                        break;
                }

                if (gravity.length == 2) {
                    if (gravity.charAt(1) == 'w') {
                        tp.left = pos.left + pos.width / 2 - 15;
                    } else {
                        tp.left = pos.left + pos.width / 2 - actualWidth + 15;
                    }
                }

                $tip.css(tp).addClass('tipsy-' + gravity);
                $tip.find('.tipsy-arrow')[0].className = 'tipsy-arrow tipsy-arrow-' + gravity.charAt(0);
                if (this.options.className) {
                    $tip.addClass(maybeCall(this.options.className, this.$element[0]));
                }

                if (this.options.fade) {
                    $tip.stop().css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: this.options.opacity});
                } else {
                    $tip.css({visibility: 'visible', opacity: this.options.opacity});
                }

                $tip.css({'z-index':this.options.zIndex});

                var t = this;
                var set_hovered  = function(set_hover){
                    return function(){
                        t.$tip.stop();
                        t.tipHovered = set_hover;
                        if (!set_hover){
                            if (t.options.delayOut === 0 && t.options.trigger != 'manual') {
                                t.hide();
                            } else {
                                setTimeout(function() {
                                    if (t.hoverState == 'out') t.hide(); }, t.options.delayOut);
                            }
                        }
                    };
                };
               $tip.hover(set_hovered(true), set_hovered(false));
            }
        },

        hide: function() {
            if (this.options.fade) {
                this.tip().stop().fadeOut(function() { $(this).remove(); });
            } else {
                if (this.options.cancelHide == null || !this.options.cancelHide()){
                        this.tip().remove();
                }
            }
        },

        fixTitle: function() {
            var $e = this.$element;

            if ($e.attr('title') || typeof($e.attr('original-title')) != 'string') {
                $e.attr('original-title', $e.attr('title') || '').removeAttr('title');
            }
            if (typeof $e.context.nearestViewportElement == 'object'){
                if ($e.children('title').length){
                    $e.append('<original-title>' + ($e.children('title').text() || '') + '</original-title>')
                        .children('title').remove();
                }
            }
        },

        getTitle: function() {

            var title, $e = this.$element, o = this.options;
            this.fixTitle();

            if (typeof o.title == 'string') {
                var title_name = o.title == 'title' ? 'original-title' : o.title;
                if ($e.children(title_name).length){
                    title = $e.children(title_name).html();
                } else{
                    title = $e.attr(title_name);
                    if (typeof title == 'undefined') title = ''
                }

            } else if (typeof o.title == 'function') {
                title = o.title.call($e[0]);
            }
            title = ('' + title).replace(/(^\s*|\s*$)/, "");
            return title || o.fallback;
        },

        tip: function() {
            if (!this.$tip) {
                this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>');
            }
            return this.$tip;
        },

        validate: function() {
            if (!this.$element[0].parentNode) {
                this.hide();
                this.$element = null;
                this.options = null;
            }
        },

        enable: function() { this.enabled = true; },
        disable: function() { this.enabled = false; },
        toggleEnabled: function() { this.enabled = !this.enabled; }
    };

    $.fn.tipsy = function(options) {

        if (options === true) {
            return this.data('tipsy');
        } else if (typeof options == 'string') {
            $(this).each(function(i,el){
              if ($(el).data('tipsy')) {
                  tipsy = $(el).data('tipsy')
                  tipsy[options]();
              }
            });
            return this;
        }

        options = $.extend({}, $.fn.tipsy.defaults, options);

        if (options.hoverlock && options.delayOut === 0) {
            options.delayOut = 100;
        }

        function get(ele) {
            var tipsy = $.data(ele, 'tipsy');
            if (!tipsy) {
                tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
                $.data(ele, 'tipsy', tipsy);
            }
            return tipsy;
        }

        function enter() {
            var tipsy = get(this);
            tipsy.hoverState = 'in';
            if (options.delayIn === 0) {
                tipsy.show();
            } else {
                tipsy.fixTitle();
                setTimeout(function() { if (tipsy.hoverState == 'in') tipsy.show(); }, options.delayIn);
            }
        }

        function leave() {
            var tipsy = get(this);
            tipsy.hoverState = 'out';
            if (options.delayOut === 0) {
                tipsy.hide();
            } else {
                var to = function() {
                    if (!tipsy.tipHovered || !options.hoverlock){
                        if (tipsy.hoverState == 'out') tipsy.hide();
                    }
                };
                setTimeout(to, options.delayOut);
            }
        }

        if (!options.live) this.each(function() { get(this); });

        if (options.trigger != 'manual') {
            var binder = options.live ? 'live' : 'bind',
                eventIn = options.trigger == 'hover' ? 'mouseenter' : 'focus',
                eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur';
            this[binder](eventIn, enter)[binder](eventOut, leave);
        }

        return this;

    };

    $.fn.tipsy.defaults = {
        className: null,
        delayIn: 0,
        delayOut: 0,
        fade: false,
        'zIndex': 100000,
        fallback: '',
        cancelHide: null,
        gcInterval: 0,
        gravity: 'n',
        html: false,
        live: false,
        offset: 0,
        opacity: 0.8,
        title: 'title',
        trigger: 'hover',
        hoverlock: false
    };

    // Overwrite this method to provide options on a per-element basis.
    // For example, you could store the gravity in a 'tipsy-gravity' attribute:
    // return $.extend({}, options, {gravity: $(ele).attr('tipsy-gravity') || 'n' });
    // (remember - do not modify 'options' in place!)
    $.fn.tipsy.elementOptions = function(ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };

    $.fn.tipsy.autoNS = function() {
        return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
    };

    $.fn.tipsy.autoWE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
    };
    $.fn.tipsy.autoNWNE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'ne' : 'nw';
    };
    $.fn.tipsy.autoSWSE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'se' : 'sw';
    };


    /**
     * yields a closure of the supplied parameters, producing a function that takes
     * no arguments and is suitable for use as an autogravity function like so:
     *
     * @param margin (int) - distance from the viewable region edge that an
     *        element should be before setting its tooltip's gravity to be away
     *        from that edge.
     * @param prefer (string, e.g. 'n', 'sw', 'w') - the direction to prefer
     *        if there are no viewable region edges effecting the tooltip's
     *        gravity. It will try to vary from this minimally, for example,
     *        if 'sw' is preferred and an element is near the right viewable
     *        region edge, but not the top edge, it will set the gravity for
     *        that element's tooltip to be 'se', preserving the southern
     *        component.
     */
     $.fn.tipsy.autoBounds = function(margin, prefer) {
		return function() {
			var dir = {ns: prefer[0], ew: (prefer.length > 1 ? prefer[1] : false)},
                boundTop = $(document).scrollTop() + margin,
                boundLeft = $(document).scrollLeft() + margin,
                $this = $(this);

			if ($this.offset().top < boundTop) dir.ns = 'n';
			if ($this.offset().left < boundLeft) dir.ew = 'w';
			if ($(window).width() + $(document).scrollLeft() - $this.offset().left < margin) dir.ew = 'e';
			if ($(window).height() + $(document).scrollTop() - $this.offset().top < margin) dir.ns = 's';

			return dir.ns + (dir.ew ? dir.ew : '');
		};
    };
})(jQuery);
var Hashtable = function() {
    function n(t) {
      var r;
      if (typeof t == "string") return t;
      if (typeof t.hashCode == e) return r = t.hashCode(), typeof r == "string" ? r : n(r);
      if (typeof t.toString == e) return t.toString();
      try {
        return String(t)
      } catch (i) {
        return Object.prototype.toString.call(t)
      }
    }
    function r(e, t) {
      return e.equals(t)
    }
    function i(t, n) {
      return typeof n.equals == e ? n.equals(t) : t === n
    }
    function s(e) {
      return function(t) {
        if (t === null) throw new Error("null is not a valid " + e);
        if (typeof t == "undefined") throw new Error(e + " must not be undefined")
      }
    }
    function a(e, t, n, r) {
      this[0] = e, this.entries = [], this.addEntry(t, n), r !== null && (this.getEqualityFunction = function() {
        return r
      })
    }
    function h(e) {
      return function(t) {
        var n = this.entries.length,
            r, i = this.getEqualityFunction(t);
        while (n--) {
          r = this.entries[n];
          if (i(t, r[0])) switch (e) {
          case f:
            return !0;
          case l:
            return r;
          case c:
            return [n, r[1]]
          }
        }
        return !1
      }
    }
    function p(e) {
      return function(t) {
        var n = t.length;
        for (var r = 0, i = this.entries.length; r < i; ++r) t[n + r] = this.entries[r][e]
      }
    }
    function d(e, t) {
      var n = e.length,
          r;
      while (n--) {
        r = e[n];
        if (t === r[0]) return n
      }
      return null
    }
    function v(e, t) {
      var n = e[t];
      return n && n instanceof a ? n : null
    }
    function m(r, i) {
      var s = this,
          f = [],
          l = {},
          c = typeof r == e ? r : n,
          h = typeof i == e ? i : null;
      this.put = function(e, t) {
        o(e), u(t);
        var n = c(e),
            r, i, s = null;
        return r = v(l, n), r ? (i = r.getEntryForKey(e), i ? (s = i[1], i[1] = t) : r.addEntry(e, t)) : (r = new a(n, e, t, h), f[f.length] = r, l[n] = r), s
      }, this.get = function(e) {
        o(e);
        var t = c(e),
            n = v(l, t);
        if (n) {
          var r = n.getEntryForKey(e);
          if (r) return r[1]
        }
        return null
      }, this.containsKey = function(e) {
        o(e);
        var t = c(e),
            n = v(l, t);
        return n ? n.containsKey(e) : !1
      }, this.containsValue = function(e) {
        u(e);
        var t = f.length;
        while (t--) if (f[t].containsValue(e)) return !0;
        return !1
      }, this.clear = function() {
        f.length = 0, l = {}
      }, this.isEmpty = function() {
        return !f.length
      };
      var p = function(e) {
          return function() {
            var t = [],
                n = f.length;
            while (n--) f[n][e](t);
            return t
          }
          };
      this.keys = p("keys"), this.values = p("values"), this.entries = p("getEntries"), this.remove = function(e) {
        o(e);
        var n = c(e),
            r, i = null,
            s = v(l, n);
        return s && (i = s.removeEntryForKey(e), i !== null && (s.entries.length || (r = d(f, n), t(f, r), delete l[n]))), i
      }, this.size = function() {
        var e = 0,
            t = f.length;
        while (t--) e += f[t].entries.length;
        return e
      }, this.each = function(e) {
        var t = s.entries(),
            n = t.length,
            r;
        while (n--) r = t[n], e(r[0], r[1])
      }, this.putAll = function(t, n) {
        var r = t.entries(),
            i, o, u, a, f = r.length,
            l = typeof n == e;
        while (f--) i = r[f], o = i[0], u = i[1], l && (a = s.get(o)) && (u = n(o, a, u)), s.put(o, u)
      }, this.clone = function() {
        var e = new m(r, i);
        return e.putAll(s), e
      }
    }
    var e = "function",
        t = typeof Array.prototype.splice == e ?
    function(e, t) {
      e.splice(t, 1)
    } : function(e, t) {
      var n, r, i;
      if (t === e.length - 1) e.length = t;
      else {
        n = e.slice(t + 1), e.length = t;
        for (r = 0, i = n.length; r < i; ++r) e[t + r] = n[r]
      }
    }, o = s("key"), u = s("value"), f = 0, l = 1, c = 2;
    return a.prototype = {
      getEqualityFunction: function(t) {
        return typeof t.equals == e ? r : i
      },
      getEntryForKey: h(l),
      getEntryAndIndexForKey: h(c),
      removeEntryForKey: function(e) {
        var n = this.getEntryAndIndexForKey(e);
        return n ? (t(this.entries, n[0]), n[1]) : null
      },
      addEntry: function(e, t) {
        this.entries[this.entries.length] = [e, t]
      },
      keys: p(0),
      values: p(1),
      getEntries: function(e) {
        var t = e.length;
        for (var n = 0, r = this.entries.length; n < r; ++n) e[t + n] = this.entries[n].slice(0)
      },
      containsKey: h(f),
      containsValue: function(e) {
        var t = this.entries.length;
        while (t--) if (e === this.entries[t][1]) return !0;
        return !1
      }
    }, m
    }();
(function(e) {
  function a(e, t, n) {
    this.dec = e, this.group = t, this.neg = n
  }
  function f() {
    for (var e = 0; e < u.length; e++) {
      localeGroup = u[e];
      for (var n = 0; n < localeGroup.length; n++) t.put(localeGroup[n], e)
    }
  }
  function l(e, n) {
    t.size() == 0 && f();
    var r = ".",
        i = ",",
        s = "-";
    n == 0 && (e.indexOf("_") != -1 ? e = e.split("_")[1].toLowerCase() : e.indexOf("-") != -1 && (e = e.split("-")[1].toLowerCase()));
    var u = t.get(e);
    if (u) {
      var l = o[u];
      l && (r = l[0], i = l[1])
    }
    return new a(r, i, s)
  }
  var t = new Hashtable,
      n = ["ae", "au", "ca", "cn", "eg", "gb", "hk", "il", "in", "jp", "sk", "th", "tw", "us"],
      r = ["at", "br", "de", "dk", "es", "gr", "it", "nl", "pt", "tr", "vn"],
      i = ["cz", "fi", "fr", "ru", "se", "pl"],
      s = ["ch"],
      o = [
      [".", ","],
      [",", "."],
      [",", " "],
      [".", "'"]
      ],
      u = [n, r, i, s];
  e.fn.formatNumber = function(t, n, r) {
    return this.each(function() {
      n == null && (n = !0), r == null && (r = !0);
      var i;
      e(this).is(":input") ? i = new String(e(this).val()) : i = new String(e(this).text());
      var s = e.formatNumber(i, t);
      n && (e(this).is(":input") ? e(this).val(s) : e(this).text(s));
      if (r) return s
    })
  }, e.formatNumber = function(t, n) {
    var n = e.extend({}, e.fn.formatNumber.defaults, n),
        r = l(n.locale.toLowerCase(), n.isFullLocale),
        i = r.dec,
        s = r.group,
        o = r.neg,
        u = "0#-,.",
        a = "",
        f = !1;
    for (var c = 0; c < n.format.length; c++) {
      if (u.indexOf(n.format.charAt(c)) != -1) {
        if (c == 0 && n.format.charAt(c) == "-") {
          f = !0;
          continue
        }
        break
      }
      a += n.format.charAt(c)
    }
    var h = "";
    for (var c = n.format.length - 1; c >= 0; c--) {
      if (u.indexOf(n.format.charAt(c)) != -1) break;
      h = n.format.charAt(c) + h
    }
    n.format = n.format.substring(a.length), n.format = n.format.substring(0, n.format.length - h.length);
    var p = new Number(t);
    return e._formatNumber(p, n, h, a, f)
  }, e._formatNumber = function(t, n, r, i, s) {
    var n = e.extend({}, e.fn.formatNumber.defaults, n),
        o = l(n.locale.toLowerCase(), n.isFullLocale),
        u = o.dec,
        a = o.group,
        f = o.neg,
        c = !1;
    if (isNaN(t)) {
      if (n.nanForceZero != 1) return null;
      t = 0, c = !0
    }
    r == "%" && (t *= 100);
    var h = "";
    if (n.format.indexOf(".") > -1) {
      var p = u,
          d = n.format.substring(n.format.lastIndexOf(".") + 1);
      if (n.round == 1) t = new Number(t.toFixed(d.length));
      else {
        var v = t.toString();
        v = v.substring(0, v.lastIndexOf(".") + d.length + 1), t = new Number(v)
      }
      var m = t % 1,
          g = new String(m.toFixed(d.length));
      g = g.substring(g.lastIndexOf(".") + 1);
      for (var y = 0; y < d.length; y++) {
        if (d.charAt(y) == "#" && g.charAt(y) != "0") {
          p += g.charAt(y);
          continue
        }
        if (d.charAt(y) == "#" && g.charAt(y) == "0") {
          var b = g.substring(y);
          if (b.match("[1-9]")) {
            p += g.charAt(y);
            continue
          }
          break
        }
        d.charAt(y) == "0" && (p += g.charAt(y))
      }
      h += p
    } else t = Math.round(t);
    var w = Math.floor(t);
    t < 0 && (w = Math.ceil(t));
    var E = "";
    n.format.indexOf(".") == -1 ? E = n.format : E = n.format.substring(0, n.format.indexOf("."));
    var S = "";
    if (w != 0 || E.substr(E.length - 1) != "#" || c) {
      var x = new String(Math.abs(w)),
          T = 9999;
      E.lastIndexOf(",") != -1 && (T = E.length - E.lastIndexOf(",") - 1);
      var N = 0;
      for (var y = x.length - 1; y > -1; y--) S = x.charAt(y) + S, N++, N == T && y != 0 && (S = a + S, N = 0);
      if (E.length > S.length) {
        var C = E.indexOf("0");
        if (C != -1) {
          var k = E.length - C,
              L = E.length - S.length - 1;
          while (S.length < k) {
            var A = E.charAt(L);
            A == "," && (A = a), S = A + S, L--
          }
        }
      }
    }
    return !S && E.indexOf("0", E.length - 1) !== -1 && (S = "0"), h = S + h, t < 0 && s && i.length > 0 ? i = f + i : t < 0 && (h = f + h), n.decimalSeparatorAlwaysShown || h.lastIndexOf(u) == h.length - 1 && (h = h.substring(0, h.length - 1)), h = i + h + r, h
  }, e.fn.parseNumber = function(t, n, r) {
    n == null && (n = !0), r == null && (r = !0);
    var i;
    e(this).is(":input") ? i = new String(e(this).val()) : i = new String(e(this).text());
    var s = e.parseNumber(i, t);
    if (s) {
      n && (e(this).is(":input") ? e(this).val(s.toString()) : e(this).text(s.toString()));
      if (r) return s
    }
  }, e.parseNumber = function(t, n) {
    var n = e.extend({}, e.fn.parseNumber.defaults, n),
        r = l(n.locale.toLowerCase(), n.isFullLocale),
        i = r.dec,
        s = r.group,
        o = r.neg,
        u = "1234567890.-";
    while (t.indexOf(s) > -1) t = t.replace(s, "");
    t = t.replace(i, ".").replace(o, "-");
    var a = "",
        f = !1;
    if (t.charAt(t.length - 1) == "%" || n.isPercentage == 1) f = !0;
    for (var c = 0; c < t.length; c++) u.indexOf(t.charAt(c)) > -1 && (a += t.charAt(c));
    var h = new Number(a);
    if (f) {
      h /= 100;
      var p = a.indexOf(".");
      if (p != -1) {
        var d = a.length - p - 1;
        h = h.toFixed(d + 2)
      } else h = h.toFixed(a.length - 1)
    }
    return h
  }, e.fn.parseNumber.defaults = {
    locale: "us",
    decimalSeparatorAlwaysShown: !1,
    isPercentage: !1,
    isFullLocale: !1
  }, e.fn.formatNumber.defaults = {
    format: "#,###.00",
    locale: "us",
    decimalSeparatorAlwaysShown: !1,
    nanForceZero: !0,
    round: !0,
    isFullLocale: !1
  }, Number.prototype.toFixed = function(t) {
    return e._roundNumber(this, t)
  }, e._roundNumber = function(e, t) {
    var n = Math.pow(10, t || 0),
        r = String(Math.round(e * n) / n);
    if (t > 0) {
      var i = r.indexOf(".");
      i == -1 ? (r += ".", i = 0) : i = r.length - (i + 1);
      while (i < t) r += "0", i++
    }
    return r
  }
})(jQuery), function() {
  var e = {};
  this.tmpl = function t(n, r) {
    var i = /\W/.test(n) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + n.replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');") : e[n] = e[n] || t(document.getElementById(n).innerHTML);
    return r ? i(r) : i
  }
}(), function(e) {
  e.baseClass = function(t) {
    return t = e(t), t.get(0).className.match(/([^ ]+)/)[1]
  }, e.fn.addDependClass = function(t, n) {
    var r = {
      delimiter: n ? n : "-"
    };
    return this.each(function() {
      var n = e.baseClass(this);
      n && e(this).addClass(n + r.delimiter + t)
    })
  }, e.fn.removeDependClass = function(t, n) {
    var r = {
      delimiter: n ? n : "-"
    };
    return this.each(function() {
      var n = e.baseClass(this);
      n && e(this).removeClass(n + r.delimiter + t)
    })
  }, e.fn.toggleDependClass = function(t, n) {
    var r = {
      delimiter: n ? n : "-"
    };
    return this.each(function() {
      var n = e.baseClass(this);
      n && (e(this).is("." + n + r.delimiter + t) ? e(this).removeClass(n + r.delimiter + t) : e(this).addClass(n + r.delimiter + t))
    })
  }
}(jQuery), function(e) {
  function t() {
    this._init.apply(this, arguments)
  }
  t.prototype.oninit = function() {}, t.prototype.events = function() {}, t.prototype.onmousedown = function() {
    this.ptr.css({
      position: "absolute"
    })
  }, t.prototype.onmousemove = function(e, t, n) {
    this.ptr.css({
      left: t,
      top: n
    })
  }, t.prototype.onmouseup = function() {}, t.prototype.isDefault = {
    drag: !1,
    clicked: !1,
    toclick: !0,
    mouseup: !1
  }, t.prototype._init = function() {
    if (arguments.length > 0) {
      this.ptr = e(arguments[0]), this.outer = e(".draggable-outer"), this.is = {}, e.extend(this.is, this.isDefault);
      var t = this.ptr.offset();
      this.d = {
        left: t.left,
        top: t.top,
        width: this.ptr.width(),
        height: this.ptr.height()
      }, this.oninit.apply(this, arguments), this._events()
    }
  }, t.prototype._getPageCoords = function(e) {
    return e.targetTouches && e.targetTouches[0] ? {
      x: e.targetTouches[0].pageX,
      y: e.targetTouches[0].pageY
    } : {
      x: e.pageX,
      y: e.pageY
    }
  }, t.prototype._bindEvent = function(e, t, n) {
    var r = this;
    this.supportTouches_ ? e.get(0).addEventListener(this.events_[t], n, !1) : e.bind(this.events_[t], n)
  }, t.prototype._events = function() {
    var t = this;
    this.supportTouches_ = e.browser.webkit && navigator.userAgent.indexOf("Mobile") != -1, this.events_ = {
      click: this.supportTouches_ ? "touchstart" : "click",
      down: this.supportTouches_ ? "touchstart" : "mousedown",
      move: this.supportTouches_ ? "touchmove" : "mousemove",
      up: this.supportTouches_ ? "touchend" : "mouseup"
    }, this._bindEvent(e(document), "move", function(e) {
      t.is.drag && (e.stopPropagation(), e.preventDefault(), t._mousemove(e))
    }), this._bindEvent(e(document), "down", function(e) {
      t.is.drag && (e.stopPropagation(), e.preventDefault())
    }), this._bindEvent(e(document), "up", function(e) {
      t._mouseup(e)
    }), this._bindEvent(this.ptr, "down", function(e) {
      return t._mousedown(e), !1
    }), this._bindEvent(this.ptr, "up", function(e) {
      t._mouseup(e)
    }), this.ptr.find("a").click(function() {
      t.is.clicked = !0;
      if (!t.is.toclick) return t.is.toclick = !0, !1
    }).mousedown(function(e) {
      return t._mousedown(e), !1
    }), this.events()
  }, t.prototype._mousedown = function(t) {
    this.is.drag = !0, this.is.clicked = !1, this.is.mouseup = !1;
    var n = this.ptr.offset(),
        r = this._getPageCoords(t);
    this.cx = r.x - n.left, this.cy = r.y - n.top, e.extend(this.d, {
      left: n.left,
      top: n.top,
      width: this.ptr.width(),
      height: this.ptr.height()
    }), this.outer && this.outer.get(0) && this.outer.css({
      height: Math.max(this.outer.height(), e(document.body).height()),
      overflow: "hidden"
    }), this.onmousedown(t)
  }, t.prototype._mousemove = function(e) {
    this.is.toclick = !1;
    var t = this._getPageCoords(e);
    this.onmousemove(e, t.x - this.cx, t.y - this.cy)
  }, t.prototype._mouseup = function(t) {
    var n = this;
    this.is.drag && (this.is.drag = !1, this.outer && this.outer.get(0) && (e.browser.mozilla ? this.outer.css({
      overflow: "hidden"
    }) : this.outer.css({
      overflow: "visible"
    }), e.browser.msie && e.browser.version == "6.0" ? this.outer.css({
      height: "100%"
    }) : this.outer.css({
      height: "auto"
    })), this.onmouseup(t))
  }, window.Draggable = t
}(jQuery), function(e) {
  function t(e) {
    return typeof e == "undefined" ? !1 : e instanceof Array || !(e instanceof Object) && Object.prototype.toString.call(e) == "[object Array]" || typeof e.length == "number" && typeof e.splice != "undefined" && typeof e.propertyIsEnumerable != "undefined" && !e.propertyIsEnumerable("splice") ? !0 : !1
  }
  function r() {
    return this.init.apply(this, arguments)
  }
  function i() {
    Draggable.apply(this, arguments)
  }
  e.slider = function(t, n) {
    var i = e(t);
    return i.data("jslider") || i.data("jslider", new r(t, n)), i.data("jslider")
  }, e.fn.slider = function(n, r) {
    function o(e) {
      return e !== undefined
    }
    function u(e) {
      return e != null
    }
    var i, s = arguments;
    return this.each(function() {
      var a = e.slider(this, n);
      if (typeof n == "string") switch (n) {
      case "value":
        if (o(s[1]) && o(s[2])) {
          var f = a.getPointers();
          u(f[0]) && u(s[1]) && (f[0].set(s[1]), f[0].setIndexOver()), u(f[1]) && u(s[2]) && (f[1].set(s[2]), f[1].setIndexOver())
        } else if (o(s[1])) {
          var f = a.getPointers();
          u(f[0]) && u(s[1]) && (f[0].set(s[1]), f[0].setIndexOver())
        } else i = a.getValue();
        break;
      case "prc":
        if (o(s[1]) && o(s[2])) {
          var f = a.getPointers();
          u(f[0]) && u(s[1]) && (f[0]._set(s[1]), f[0].setIndexOver()), u(f[1]) && u(s[2]) && (f[1]._set(s[2]), f[1].setIndexOver())
        } else if (o(s[1])) {
          var f = a.getPointers();
          u(f[0]) && u(s[1]) && (f[0]._set(s[1]), f[0].setIndexOver())
        } else i = a.getPrcValue();
        break;
      case "calculatedValue":
        var l = a.getValue().split(";");
        i = "";
        for (var c = 0; c < l.length; c++) i += (c > 0 ? ";" : "") + a.nice(l[c]);
        break;
      case "skin":
        a.setSkin(s[1])
      } else!n && !r && (t(i) || (i = []), i.push(a))
    }), t(i) && i.length == 1 && (i = i[0]), i || this
  };
  var n = {
    settings: {
      from: 1,
      to: 10,
      step: 1,
      smooth: !0,
      limits: !0,
      labels: !0,
      round: 0,
      format: {
        format: "#,##0.##"
      },
      value: "5;7",
      dimension: ""
    },
    className: "jslider",
    selector: ".jslider-",
    template: tmpl('<span class="<%=className%>"><table><tr><td><div class="<%=className%>-bg"><i class="l"></i><i class="f"></i><i class="r"></i><i class="v"></i></div><div class="<%=className%>-pointer  <%=className%>-pointer-from"></div><div class="<%=className%>-pointer <%=className%>-pointer-to"></div><div class="<%=className%>-pointer <%=className%>-pointer-mid"></div><div class="<%=className%>-label"><span><%=settings.from%></span></div><div class="<%=className%>-label <%=className%>-label-mid"><span><%=settings.mid%></span><%=settings.dimension%></div><div class="<%=className%>-label <%=className%>-label-to"><span><%=settings.to%></span><%=settings.dimension%></div><div class="<%=className%>-value"><span></span><%=settings.dimension%></div><div class="<%=className%>-value <%=className%>-value-mid"><span></span><%=settings.dimension%></div><div class="<%=className%>-value <%=className%>-value-to"><span></span><%=settings.dimension%></div><div class="<%=className%>-scale"><%=scale%></div></td></tr></table></span>')
  };
  r.prototype.init = function(t, r) {
    this.settings = e.extend(!0, {}, n.settings, r ? r : {}), this.inputNode = e(t).hide(), this.settings.interval = this.settings.to - this.settings.from, this.settings.value = this.inputNode.attr("value"), this.settings.calculate && e.isFunction(this.settings.calculate) && (this.nice = this.settings.calculate), this.settings.onstatechange && e.isFunction(this.settings.onstatechange) && (this.onstatechange = this.settings.onstatechange), this.is = {
      init: !1
    }, this.o = {}, this.create()
  }, r.prototype.onstatechange = function() {}, r.prototype.create = function() {
    window.what = this;
    var t = this;
    this.domNode = e(n.template({
      className: n.className,
      settings: {
        from: this.nice(this.settings.from),
        to: this.nice(this.settings.to),
        dimension: this.settings.dimension
      },
      scale: this.generateScale()
    })), this.inputNode.after(this.domNode), this.drawScale(), this.settings.skin && this.settings.skin.length > 0 && this.setSkin(this.settings.skin), this.sizes = {
      domWidth: this.domNode.width(),
      domOffset: this.domNode.offset()
    }, e.extend(this.o, {
      pointers: {},
      labels: {
        0: {
          o: this.domNode.find(n.selector + "value").not(n.selector + "value-to")
        },
        1: {
          o: this.domNode.find(n.selector + "value").filter(n.selector + "value-to")
        },
        2: {
          o: this.domNode.find(n.selector + "value").filter(n.selector + "value-mid")
        }
      },
      limits: {
        0: this.domNode.find(n.selector + "label").not(n.selector + "label-to"),
        1: this.domNode.find(n.selector + "label").filter(n.selector + "label-to"),
        2: this.domNode.find(n.selector + "label").filter(n.selector + "label-mid")
      }
    }), e.extend(this.o.labels[0], {
      value: this.o.labels[0].o.find("span")
    }), e.extend(this.o.labels[1], {
      value: this.o.labels[1].o.find("span")
    }), e.extend(this.o.labels[2], {
      value: this.o.labels[2].o.find("span")
    }), t.settings.value.split(";")[1] || (this.settings.single = !0, this.domNode.addDependClass("single")), t.settings.limits || this.domNode.addDependClass("limitless"), this.domNode.find(n.selector + "pointer").each(function(e) {
      var n = t.settings.value.split(";")[e];
      if (n) {
        t.o.pointers[e] = new i(this, e, t);
        var r = t.settings.value.split(";")[e - 1];
        r && new Number(n) < new Number(r) && (n = r), n = n < t.settings.from ? t.settings.from : n, n = n > t.settings.to ? t.settings.to : n, t.o.pointers[e].set(n, !0)
      } else if (e == 2) {
        n = ( t.settings.value.split(";")[0] + t.settings.value.split(";")[1] ) / 2;
        t.o.pointers[e] = new i(this, e, t);
        var r = t.settings.value.split(";")[0];
        r && new Number(n) < new Number(r) && (n = r), n = n < t.settings.from ? t.settings.from : n, n = n > t.settings.to ? t.settings.to : n, t.o.pointers[e].set(n, !0)
      }
    }), this.o.value = this.domNode.find(".v"), this.is.init = !0, e.each(this.o.pointers, function(e) {
      t.redraw(this)
    }), function(t) {
      e(window).resize(function() {
        t.onresize()
      })
    }(this)
  }, r.prototype.setSkin = function(e) {
    this.skin_ && this.domNode.removeDependClass(this.skin_, "_"), this.domNode.addDependClass(this.skin_ = e, "_")
  }, r.prototype.setPointersIndex = function(t) {
    e.each(this.getPointers(), function(e) {
      this.index(e > 1 ? 2 : e);
    })
  }, r.prototype.getPointers = function() {
    return this.o.pointers
  }, r.prototype.generateScale = function() {
    if (this.settings.scale && this.settings.scale.length > 0) {
      var e = "",
          t = this.settings.scale,
          n = Math.round(100 / (t.length - 1) * 10) / 10;
      for (var r = 0; r < t.length; r++) e += '<span style="left: ' + r * n + '%">' + (t[r] != "|" ? "<ins>" + t[r] + "</ins>" : "") + "</span>";
      return e
    }
    return ""
  }, r.prototype.drawScale = function() {
    this.domNode.find(n.selector + "scale span ins").each(function() {
      e(this).css({
        marginLeft: -e(this).outerWidth() / 2
      })
    })
  }, r.prototype.onresize = function() {
    var t = this;
    this.sizes = {
      domWidth: this.domNode.width(),
      domOffset: this.domNode.offset()
    }, e.each(this.o.pointers, function(e) {
      t.redraw(this)
    })
  }, r.prototype.update = function() {
    this.onresize(), this.drawScale()
  }, r.prototype.limits = function(e, t) {
    if (!this.settings.smooth) {
      var n = this.settings.step * 100 / this.settings.interval;
      e = Math.round(e / n) * n
    }
    var r = this.o.pointers[1 - t.uid];
    return r && t.uid && e < r.value.prc && (e = r.value.prc), r && !t.uid && e > r.value.prc && (e = r.value.prc), e < 0 && (e = 0), e > 100 && (e = 100), Math.round(e * 10) / 10
  }, r.prototype.redraw = function(e) {
    if (!this.is.init) return !1;
      var halfway = (this.o.pointers[0].value.prc + this.o.pointers[1].value.prc) / 2;
      this.o.pointers[2].ptr.css({ left: halfway + "%" });
      this.o.pointers[2].value.origin = this.prcToValue( halfway );
      this.o.pointers[2].value.prc = halfway;
      
      this.setValue(), this.o.pointers[0] && this.o.pointers[1] && this.o.value.css({
        left: this.o.pointers[0].value.prc + "%",
        width: this.o.pointers[1].value.prc - this.o.pointers[0].value.prc + "%"
      });
      
      if(this.settings.labels) {
        this.o.labels[e.uid].value.html(this.nice(e.value.origin));
        this.redrawLabels(e);
      }
  }, r.prototype.redrawLabels = function(e) {
    function t(e, t, r) {
      return t.margin = -t.label / 2, label_left = t.border + t.margin, label_left < 0 && (t.margin -= label_left), t.border + t.label / 2 > n.sizes.domWidth ? (t.margin = 0, t.right = !0) : t.right = !1, e.o.css({
        left: r + "%",
        marginLeft: t.margin,
        right: "auto"
      }), t.right && e.o.css({
        left: "auto",
        right: 0
      }), t
    }
    var n = this,
        r = this.o.labels[e.uid],
        i = e.value.prc,
        s = {
        label: r.o.outerWidth(),
        right: !1,
        border: i * this.sizes.domWidth / 100
        };
    if (!this.settings.single) {
      var o, u;
      if(e.uid < 2) {
        o = this.o.pointers[1 - e.uid];
        u = this.o.labels[o.uid];
      }
      switch (e.uid) {
      case 2:
        // Doesn't need a label
        break;
      case 0:
        s.border + s.label / 2 > u.o.offset().left - this.sizes.domOffset.left ? (u.o.css({
          visibility: "hidden"
        }), u.value.html(this.nice(o.value.origin)), r.o.css({
          visibility: "visible"
        }), i = (o.value.prc - i) / 2 + i, o.value.prc != e.value.prc && (r.value.html(this.nice(e.value.origin) + "&nbsp;&ndash;&nbsp;" + this.nice(o.value.origin)), s.label = r.o.outerWidth(), s.border = i * this.sizes.domWidth / 100)) : u.o.css({
          visibility: "visible"
        });
        break;
      case 1:
        s.border - s.label / 2 < u.o.offset().left - this.sizes.domOffset.left + u.o.outerWidth() ? (u.o.css({
          visibility: "hidden"
        }), u.value.html(this.nice(o.value.origin)), r.o.css({
          visibility: "visible"
        }), i = (i - o.value.prc) / 2 + o.value.prc, o.value.prc != e.value.prc && (r.value.html(this.nice(o.value.origin) + "&nbsp;&ndash;&nbsp;" + this.nice(e.value.origin)), s.label = r.o.outerWidth(), s.border = i * this.sizes.domWidth / 100)) : u.o.css({
          visibility: "visible"
        })
      }
    }
    s = t(r, s, i);
    if (u) {
      var s = {
        label: u.o.outerWidth(),
        right: !1,
        border: o.value.prc * this.sizes.domWidth / 100
      };
      s = t(u, s, o.value.prc)
    }
    this.redrawLimits()
  }, r.prototype.redrawLimits = function() {
    if (this.settings.limits) {
      var e = [!0, !0];
      for (key in this.o.pointers) if (!this.settings.single || key == 0) {
        var t = this.o.pointers[key],
            n = this.o.labels[t.uid],
            r = n.o.offset().left - this.sizes.domOffset.left,
            i = this.o.limits[0];
        r < i.outerWidth() && (e[0] = !1);
        var i = this.o.limits[1];
        r + n.o.outerWidth() > this.sizes.domWidth - i.outerWidth() && (e[1] = !1)
      }
      for (var s = 0; s < e.length; s++) e[s] ? this.o.limits[s].fadeIn("fast") : this.o.limits[s].fadeOut("fast")
    }
  }, r.prototype.setValue = function() {
    var e = this.getValue();
    this.inputNode.attr("value", e), this.onstatechange.call(this, e)
  }, r.prototype.getValue = function() {
    if (!this.is.init) return !1;
    var t = this,
        n = "";
    return e.each(this.o.pointers, function(e) {
      this.value.prc != undefined && !isNaN(this.value.prc) && (n += (e > 0 ? ";" : "") + t.prcToValue(this.value.prc))
    }), n
  }, r.prototype.getPrcValue = function() {
    if (!this.is.init) return !1;
    var t = this,
        n = "";
    return e.each(this.o.pointers, function(e) {
      this.value.prc != undefined && !isNaN(this.value.prc) && (n += (e > 0 ? ";" : "") + this.value.prc)
    }), n
  }, r.prototype.prcToValue = function(e) {
    if (this.settings.heterogeneity && this.settings.heterogeneity.length > 0) {
      var t = this.settings.heterogeneity,
          n = 0,
          r = this.settings.from;
      for (var i = 0; i <= t.length; i++) {
        if (t[i]) var s = t[i].split("/");
        else var s = [100, this.settings.to];
        s[0] = new Number(s[0]), s[1] = new Number(s[1]);
        if (e >= n && e <= s[0]) var o = r + (e - n) * (s[1] - r) / (s[0] - n);
        n = s[0], r = s[1]
      }
    } else var o = this.settings.from + e * this.settings.interval / 100;
    return this.round(o)
  }, r.prototype.valueToPrc = function(e, t) {
    if (this.settings.heterogeneity && this.settings.heterogeneity.length > 0) {
      var n = this.settings.heterogeneity,
          r = 0,
          i = this.settings.from;
      for (var s = 0; s <= n.length; s++) {
        if (n[s]) var o = n[s].split("/");
        else var o = [100, this.settings.to];
        o[0] = new Number(o[0]), o[1] = new Number(o[1]);
        if (e >= i && e <= o[1]) var u = t.limits(r + (e - i) * (o[0] - r) / (o[1] - i));
        r = o[0], i = o[1]
      }
    } else var u = t.limits((e - this.settings.from) * 100 / this.settings.interval);
    return u
  }, r.prototype.round = function(e) {
    return e = Math.round(e / this.settings.step) * this.settings.step, this.settings.round ? e = Math.round(e * Math.pow(10, this.settings.round)) / Math.pow(10, this.settings.round) : e = Math.round(e), e
  }, r.prototype.nice = function(t) {
    return t = t.toString().replace(/,/gi, ".").replace(/ /gi, ""), e.formatNumber ? e.formatNumber(new Number(t), this.settings.format || {}).replace(/-/gi, "&minus;") : new Number(t)
  }, i.prototype = new Draggable, i.prototype.oninit = function(e, t, n) {
    this.uid = t, this.parent = n, this.value = {}, this.settings = this.parent.settings
  }, i.prototype.onmousedown = function(e) {
    this._parent = {
      offset: this.parent.domNode.offset(),
      width: this.parent.domNode.width()
    }, this.ptr.addDependClass("hover"), this.setIndexOver()
  }, i.prototype.onmousemove = function(e, t) {
    var n = this._getPageCoords(e);
    this._set(this.calc(n.x))
  }, i.prototype.onmouseup = function(t) {
    this.parent.settings.callback && e.isFunction(this.parent.settings.callback) && this.parent.settings.callback.call(this.parent, this.parent.getValue()), this.ptr.removeDependClass("hover")
  }, i.prototype.setIndexOver = function() {
    this.parent.setPointersIndex(1), this.index(2)
  }, i.prototype.index = function(e) {
    if( e == 2) {
      this.ptr.css({ zIndex: 0 })
    } else {
      this.ptr.css({ zIndex: e })
    }
  }, i.prototype.limits = function(e) {
    return this.parent.limits(e, this)
  }, i.prototype.calc = function(e) {
    var t = this.limits((e - this._parent.offset.left) * 100 / this._parent.width);
    return t
  }, i.prototype.set = function(e, t) {
    this.value.origin = this.parent.round(e), this._set(this.parent.valueToPrc(e, this), t)
  }, i.prototype._add = function(percent) {
    this._set(this.value.prc + percent);
  }, i.prototype._set = function(e, t) {
    var diff = e - this.value.prc;

    t || (this.value.origin = this.parent.prcToValue(e, this)), this.value.prc = e, this.ptr.css({
      left: e + "%"
    });
    this.parent.redraw(this);

    var pointers = this.parent.getPointers();
    
    if(this.uid == 2 && this.parent.is.init) {
      if(pointers[0].value.prc + diff < 0) {
        diff = 0 - pointers[0].value.prc;
      } else if (pointers[1].value.prc + diff > 100) {
        diff = 100 - pointers[1].value.prc;
      }
      pointers[0]._add(diff);
      pointers[1]._add(diff);      
    }

  }
}(jQuery);
