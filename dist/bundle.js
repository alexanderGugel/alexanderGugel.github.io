!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),DIRECTIONS={UP:1,RIGHT:2,DOWN:-1,LEFT:-2},KEY_TO_DIRECTION={37:DIRECTIONS.LEFT,38:DIRECTIONS.UP,39:DIRECTIONS.RIGHT,40:DIRECTIONS.DOWN},Game=function(){function Game(context,options){_classCallCheck(this,Game),options=options||{},this.context=context,this.canvas=context.canvas,this.cellSize=options.cellSize||30,this.initialLength=options.initialLength||10,this.reset()}return _createClass(Game,[{key:"reset",value:function(){this.direction=DIRECTIONS.RIGHT,this.food=this.createFood(),this.snake=this.createSnake()}},{key:"createFood",value:function(){return{x:~~(Math.random()*this.maxX),y:~~(Math.random()*this.maxY)}}},{key:"createSnake",value:function(){return Array.apply(null,Array(this.initialLength)).map(function(_,i){return{x:i,y:10}}).reverse()}},{key:"step",value:function(){this.food.x>this.maxX&&(this.food.x=this.maxX),this.food.y>this.maxX&&(this.food.y=this.maxX),this.context.clearRect(0,0,this.canvas.width,this.canvas.height);var nx=this.snake[0].x,ny=this.snake[0].y;switch(this.direction){case DIRECTIONS.RIGHT:nx++;break;case DIRECTIONS.LEFT:nx--;break;case DIRECTIONS.UP:ny--;break;case DIRECTIONS.DOWN:ny++}if(-1>=nx||nx>=this.maxX||-1>=ny||ny>=this.maxY||this.checkCollision(nx,ny,this.snake))return this.reset();var tail=void 0;nx===this.food.x&&ny===this.food.y?(tail={x:nx,y:ny},this.food=this.createFood()):(tail=this.snake.pop(),tail.x=nx,tail.y=ny),this.snake.unshift(tail),this.paintSnake(),this.paintFood()}},{key:"paintSnake",value:function(x,y){var _this=this;this.snake.forEach(function(cell){_this.context.fillStyle="#333",_this.context.fillRect(cell.x*_this.cellSize,cell.y*_this.cellSize,_this.cellSize,_this.cellSize)})}},{key:"paintFood",value:function(){this.context.fillStyle="#3D9970",this.context.fillRect(this.food.x*this.cellSize,this.food.y*this.cellSize,this.cellSize,this.cellSize)}},{key:"checkCollision",value:function(x,y,array){for(var i=0;i<array.length;i++)if(array[i].x===x&&array[i].y===y)return!0;return!1}},{key:"onKeydown",value:function(e){KEY_TO_DIRECTION[e.which]&&KEY_TO_DIRECTION[e.which]!==-this.direction&&(this.direction=KEY_TO_DIRECTION[e.which])}},{key:"maxX",get:function(){return~~(this.canvas.width/this.cellSize)}},{key:"maxY",get:function(){return~~(this.canvas.height/this.cellSize)}},{key:"score",get:function(){return this.snake.length-this.initialLength}}]),Game}();exports["default"]=Game,module.exports=exports["default"]},{}],2:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _Game=require("./Game"),_Game2=_interopRequireDefault(_Game),_canvasFit=require("canvas-fit"),_canvasFit2=_interopRequireDefault(_canvasFit),_rafLoop=require("raf-loop"),_rafLoop2=_interopRequireDefault(_rafLoop),isTouchDevice="ontouchstart"in document.documentElement;isTouchDevice||!function(){var canvas=document.createElement("canvas"),context=canvas.getContext("2d");document.body.appendChild(canvas);var resize=_canvasFit2["default"](canvas);resize.scale=window.devicePixelRatio||1,resize(),window.addEventListener("resize",resize,!1),document.addEventListener("keydown",function(e){return game.onKeydown(e)});var game=new _Game2["default"](context),frame=0;_rafLoop2["default"](function(){frame++%2||game.step()}).start()}()},{"./Game":1,"canvas-fit":5,"raf-loop":7}],3:[function(require,module,exports){function EventEmitter(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function isFunction(arg){return"function"==typeof arg}function isNumber(arg){return"number"==typeof arg}function isObject(arg){return"object"==typeof arg&&null!==arg}function isUndefined(arg){return void 0===arg}module.exports=EventEmitter,EventEmitter.EventEmitter=EventEmitter,EventEmitter.prototype._events=void 0,EventEmitter.prototype._maxListeners=void 0,EventEmitter.defaultMaxListeners=10,EventEmitter.prototype.setMaxListeners=function(n){if(!isNumber(n)||0>n||isNaN(n))throw TypeError("n must be a positive number");return this._maxListeners=n,this},EventEmitter.prototype.emit=function(type){var er,handler,len,args,i,listeners;if(this._events||(this._events={}),"error"===type&&(!this._events.error||isObject(this._events.error)&&!this._events.error.length)){if(er=arguments[1],er instanceof Error)throw er;throw TypeError('Uncaught, unspecified "error" event.')}if(handler=this._events[type],isUndefined(handler))return!1;if(isFunction(handler))switch(arguments.length){case 1:handler.call(this);break;case 2:handler.call(this,arguments[1]);break;case 3:handler.call(this,arguments[1],arguments[2]);break;default:for(len=arguments.length,args=new Array(len-1),i=1;len>i;i++)args[i-1]=arguments[i];handler.apply(this,args)}else if(isObject(handler)){for(len=arguments.length,args=new Array(len-1),i=1;len>i;i++)args[i-1]=arguments[i];for(listeners=handler.slice(),len=listeners.length,i=0;len>i;i++)listeners[i].apply(this,args)}return!0},EventEmitter.prototype.addListener=function(type,listener){var m;if(!isFunction(listener))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",type,isFunction(listener.listener)?listener.listener:listener),this._events[type]?isObject(this._events[type])?this._events[type].push(listener):this._events[type]=[this._events[type],listener]:this._events[type]=listener,isObject(this._events[type])&&!this._events[type].warned){var m;m=isUndefined(this._maxListeners)?EventEmitter.defaultMaxListeners:this._maxListeners,m&&m>0&&this._events[type].length>m&&(this._events[type].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[type].length),"function"==typeof console.trace&&console.trace())}return this},EventEmitter.prototype.on=EventEmitter.prototype.addListener,EventEmitter.prototype.once=function(type,listener){function g(){this.removeListener(type,g),fired||(fired=!0,listener.apply(this,arguments))}if(!isFunction(listener))throw TypeError("listener must be a function");var fired=!1;return g.listener=listener,this.on(type,g),this},EventEmitter.prototype.removeListener=function(type,listener){var list,position,length,i;if(!isFunction(listener))throw TypeError("listener must be a function");if(!this._events||!this._events[type])return this;if(list=this._events[type],length=list.length,position=-1,list===listener||isFunction(list.listener)&&list.listener===listener)delete this._events[type],this._events.removeListener&&this.emit("removeListener",type,listener);else if(isObject(list)){for(i=length;i-->0;)if(list[i]===listener||list[i].listener&&list[i].listener===listener){position=i;break}if(0>position)return this;1===list.length?(list.length=0,delete this._events[type]):list.splice(position,1),this._events.removeListener&&this.emit("removeListener",type,listener)}return this},EventEmitter.prototype.removeAllListeners=function(type){var key,listeners;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[type]&&delete this._events[type],this;if(0===arguments.length){for(key in this._events)"removeListener"!==key&&this.removeAllListeners(key);return this.removeAllListeners("removeListener"),this._events={},this}if(listeners=this._events[type],isFunction(listeners))this.removeListener(type,listeners);else for(;listeners.length;)this.removeListener(type,listeners[listeners.length-1]);return delete this._events[type],this},EventEmitter.prototype.listeners=function(type){var ret;return ret=this._events&&this._events[type]?isFunction(this._events[type])?[this._events[type]]:this._events[type].slice():[]},EventEmitter.listenerCount=function(emitter,type){var ret;return ret=emitter._events&&emitter._events[type]?isFunction(emitter._events[type])?1:emitter._events[type].length:0}},{}],4:[function(require,module,exports){function cleanUpNextTick(){draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue()}function drainQueue(){if(!draining){var timeout=setTimeout(cleanUpNextTick);draining=!0;for(var len=queue.length;len;){for(currentQueue=queue,queue=[];++queueIndex<len;)currentQueue[queueIndex].run();queueIndex=-1,len=queue.length}currentQueue=null,draining=!1,clearTimeout(timeout)}}function Item(fun,array){this.fun=fun,this.array=array}function noop(){}var currentQueue,process=module.exports={},queue=[],draining=!1,queueIndex=-1;process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1)for(var i=1;i<arguments.length;i++)args[i-1]=arguments[i];queue.push(new Item(fun,args)),1!==queue.length||draining||setTimeout(drainQueue,0)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.binding=function(name){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(dir){throw new Error("process.chdir is not supported")},process.umask=function(){return 0}},{}],5:[function(require,module,exports){function fit(canvas,parent,scale){function resize(){var p=resize.parent||canvas.parentNode;if("function"==typeof p)var dims=p(scratch)||scratch,width=dims[0],height=dims[1];else if(p&&p!==document.body)var psize=size(p),width=0|psize[0],height=0|psize[1];else var width=window.innerWidth,height=window.innerHeight;return canvas.width=width*resize.scale,canvas.height=height*resize.scale,canvas.style.width=width+"px",canvas.style.height=height+"px",resize}return canvas.style.position=canvas.style.position||"absolute",canvas.style.top=0,canvas.style.left=0,resize.scale=parseFloat(scale||1),resize.parent=parent,resize()}var size=require("element-size");module.exports=fit;var scratch=new Float32Array(2)},{"element-size":6}],6:[function(require,module,exports){function getSize(element){if(element===window||element===document.body)return[window.innerWidth,window.innerHeight];if(!element.parentNode){var temporary=!0;document.body.appendChild(element)}var bounds=element.getBoundingClientRect(),styles=getComputedStyle(element),height=(0|bounds.height)+parse(styles.getPropertyValue("margin-top"))+parse(styles.getPropertyValue("margin-bottom")),width=(0|bounds.width)+parse(styles.getPropertyValue("margin-left"))+parse(styles.getPropertyValue("margin-right"));return temporary&&document.body.removeChild(element),[width,height]}function parse(prop){return parseFloat(prop)||0}module.exports=getSize},{}],7:[function(require,module,exports){function Engine(fn){return this instanceof Engine?(this.running=!1,this.last=now(),this._frame=0,this._tick=this.tick.bind(this),void(fn&&this.on("tick",fn))):new Engine(fn)}var inherits=require("inherits"),EventEmitter=require("events").EventEmitter,now=require("right-now"),raf=require("raf");module.exports=Engine,inherits(Engine,EventEmitter),Engine.prototype.start=function(){return this.running?void 0:(this.running=!0,this.last=now(),this._frame=raf(this._tick),this)},Engine.prototype.stop=function(){return this.running=!1,0!==this._frame&&raf.cancel(this._frame),this._frame=0,this},Engine.prototype.tick=function(){this._frame=raf(this._tick);var time=now(),dt=time-this.last;this.emit("tick",dt),this.last=time}},{events:3,inherits:8,raf:9,"right-now":11}],8:[function(require,module,exports){"function"==typeof Object.create?module.exports=function(ctor,superCtor){ctor.super_=superCtor,ctor.prototype=Object.create(superCtor.prototype,{constructor:{value:ctor,enumerable:!1,writable:!0,configurable:!0}})}:module.exports=function(ctor,superCtor){ctor.super_=superCtor;var TempCtor=function(){};TempCtor.prototype=superCtor.prototype,ctor.prototype=new TempCtor,ctor.prototype.constructor=ctor}},{}],9:[function(require,module,exports){for(var now=require("performance-now"),global="undefined"==typeof window?{}:window,vendors=["moz","webkit"],suffix="AnimationFrame",raf=global["request"+suffix],caf=global["cancel"+suffix]||global["cancelRequest"+suffix],i=0;i<vendors.length&&!raf;i++)raf=global[vendors[i]+"Request"+suffix],caf=global[vendors[i]+"Cancel"+suffix]||global[vendors[i]+"CancelRequest"+suffix];if(!raf||!caf){var last=0,id=0,queue=[],frameDuration=1e3/60;raf=function(callback){if(0===queue.length){var _now=now(),next=Math.max(0,frameDuration-(_now-last));last=next+_now,setTimeout(function(){var cp=queue.slice(0);queue.length=0;for(var i=0;i<cp.length;i++)if(!cp[i].cancelled)try{cp[i].callback(last)}catch(e){setTimeout(function(){throw e},0)}},Math.round(next))}return queue.push({handle:++id,callback:callback,cancelled:!1}),id},caf=function(handle){for(var i=0;i<queue.length;i++)queue[i].handle===handle&&(queue[i].cancelled=!0)}}module.exports=function(fn){return raf.call(global,fn)},module.exports.cancel=function(){caf.apply(global,arguments)}},{"performance-now":10}],10:[function(require,module,exports){(function(process){(function(){var getNanoSeconds,hrtime,loadTime;"undefined"!=typeof performance&&null!==performance&&performance.now?module.exports=function(){return performance.now()}:"undefined"!=typeof process&&null!==process&&process.hrtime?(module.exports=function(){return(getNanoSeconds()-loadTime)/1e6},hrtime=process.hrtime,getNanoSeconds=function(){var hr;return hr=hrtime(),1e9*hr[0]+hr[1]},loadTime=getNanoSeconds()):Date.now?(module.exports=function(){return Date.now()-loadTime},loadTime=Date.now()):(module.exports=function(){return(new Date).getTime()-loadTime},loadTime=(new Date).getTime())}).call(this)}).call(this,require("_process"))},{_process:4}],11:[function(require,module,exports){(function(global){module.exports=global.performance&&global.performance.now?function(){return performance.now()}:Date.now||function(){return+new Date}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[2]);
