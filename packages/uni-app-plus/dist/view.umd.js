(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["uni"] = factory();
	else
		root["uni"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 122);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/core/view/mixins/emitter.js
// 暂不提供通知所有
// function broadcast (componentName, eventName, ...params) {
//   this.$children.forEach(child => {
//     const name = child.$options.name && child.$options.name.substr(1)
//     if (~componentName.indexOf(name)) {
//       child.$emit.apply(child, [eventName].concat(params))
//     } else {
//       broadcast.apply(child, [componentName, eventName].concat([params]))
//     }
//   })
// }
function broadcast(componentName, eventName) {
  var children = this.$children;
  var len = children.length;

  for (var _len = arguments.length, params = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    params[_key - 2] = arguments[_key];
  }

  for (var i = 0; i < len; i++) {
    var child = children[i];
    var name = child.$options.name && child.$options.name.substr(4);

    if (~componentName.indexOf(name)) {
      child.$emit.apply(child, [eventName].concat(params));
      return false;
    } else {
      if (broadcast.apply(child, [componentName, eventName].concat([params])) === false) {
        return false;
      }
    }
  }
}

/* harmony default export */ var emitter = ({
  methods: {
    $dispatch: function $dispatch(componentName, eventName) {
      if (typeof componentName === 'string') {
        componentName = [componentName];
      }

      var parent = this.$parent || this.$root;
      var name = parent.$options.name && parent.$options.name.substr(4);

      while (parent && (!name || !~componentName.indexOf(name))) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name && parent.$options.name.substr(4);
        }
      }

      if (parent) {
        for (var _len2 = arguments.length, params = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          params[_key2 - 2] = arguments[_key2];
        }

        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    $broadcast: function $broadcast(componentName, eventName) {
      if (typeof componentName === 'string') {
        componentName = [componentName];
      }

      for (var _len3 = arguments.length, params = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        params[_key3 - 2] = arguments[_key3];
      }

      broadcast.apply(this, [componentName, eventName].concat(params));
    }
  }
});
// EXTERNAL MODULE: ./src/core/view/mixins/listeners.js
var listeners = __webpack_require__(51);

// EXTERNAL MODULE: ./src/core/view/mixins/hover.js
var hover = __webpack_require__(12);

// EXTERNAL MODULE: ./src/core/view/mixins/subscriber.js
var subscriber = __webpack_require__(52);

// CONCATENATED MODULE: ./src/core/view/mixins/index.js
/* concated harmony reexport emitter */__webpack_require__.d(__webpack_exports__, "a", function() { return emitter; });
/* concated harmony reexport listeners */__webpack_require__.d(__webpack_exports__, "c", function() { return listeners["a" /* default */]; });
/* concated harmony reexport hover */__webpack_require__.d(__webpack_exports__, "b", function() { return hover["a" /* default */]; });
/* concated harmony reexport subscriber */__webpack_require__.d(__webpack_exports__, "d", function() { return subscriber["a" /* default */]; });





/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/shared/env.js
var supportsPassive = false;

try {
  var opts = {};
  Object.defineProperty(opts, 'passive', {
    get: function get() {
      /* istanbul ignore next */
      supportsPassive = true;
    }
  }); // https://github.com/facebook/flow/issues/285

  window.addEventListener('test-passive', null, opts);
} catch (e) {}
// CONCATENATED MODULE: ./src/shared/util.js
var _toString = Object.prototype.toString;
var util_hasOwnProperty = Object.prototype.hasOwnProperty;

var _completeValue = function _completeValue(value) {
  return value > 9 ? value : '0' + value;
};

function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return util_hasOwnProperty.call(obj, key);
}
function noop() {}
function toRawType(val) {
  return _toString.call(val).slice(8, -1);
}
/**
 * Create a cached version of a pure function.
 */

function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */

var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function setProperties(item, props, propsData) {
  props.forEach(function (name) {
    if (hasOwn(propsData, name)) {
      item[name] = propsData[name];
    }
  });
}
function getLen() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  /* eslint-disable no-control-regex */
  return ('' + str).replace(/[^\x00-\xff]/g, '**').length;
}
function formatDateTime(_ref) {
  var _ref$date = _ref.date,
      date = _ref$date === void 0 ? new Date() : _ref$date,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? 'date' : _ref$mode;

  if (mode === 'time') {
    return _completeValue(date.getHours()) + ':' + _completeValue(date.getMinutes());
  } else {
    return date.getFullYear() + '-' + _completeValue(date.getMonth() + 1) + '-' + _completeValue(date.getDate());
  }
}
function updateElementStyle(element, styles) {
  for (var attrName in styles) {
    element.style[attrName] = styles[attrName];
  }
}
function guid() {
  return Math.floor(4294967296 * (1 + Math.random())).toString(16).slice(1);
}
// CONCATENATED MODULE: ./src/shared/color.js
function hexToRgba(hex) {
  var r;
  var g;
  var b;
  hex = hex.replace('#', '');

  if (hex.length === 6) {
    r = hex.substring(0, 2);
    g = hex.substring(2, 4);
    b = hex.substring(4, 6);
  } else if (hex.length === 3) {
    r = hex.substring(0, 1);
    g = hex.substring(1, 2);
    b = hex.substring(2, 3);
  } else {
    return false;
  }

  if (r.length === 1) {
    r += r;
  }

  if (g.length === 1) {
    g += g;
  }

  if (b.length === 1) {
    b += b;
  }

  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);
  return {
    r: r,
    g: g,
    b: b
  };
}
// CONCATENATED MODULE: ./src/shared/query.js
var encodeReserveRE = /[!'()*]/g;

var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};

var commaRE = /%2C/g; // fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas

var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};

var decode = decodeURIComponent;
function parseQuery(query) {
  var res = {};
  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res;
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0 ? decode(parts.join('=')) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });
  return res;
}
function stringifyQuery(obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encode(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }

        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&');
    }

    return encode(key) + '=' + encode(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
// CONCATENATED MODULE: ./src/shared/index.js
/* concated harmony reexport supportsPassive */__webpack_require__.d(__webpack_exports__, "f", function() { return supportsPassive; });
/* concated harmony reexport isFn */__webpack_require__.d(__webpack_exports__, "d", function() { return isFn; });
/* unused concated harmony import isStr */
/* concated harmony reexport isPlainObject */__webpack_require__.d(__webpack_exports__, "e", function() { return isPlainObject; });
/* concated harmony reexport hasOwn */__webpack_require__.d(__webpack_exports__, "c", function() { return hasOwn; });
/* unused concated harmony import noop */
/* unused concated harmony import toRawType */
/* concated harmony reexport cached */__webpack_require__.d(__webpack_exports__, "a", function() { return cached; });
/* unused concated harmony import camelize */
/* unused concated harmony import setProperties */
/* unused concated harmony import getLen */
/* unused concated harmony import formatDateTime */
/* unused concated harmony import updateElementStyle */
/* concated harmony reexport guid */__webpack_require__.d(__webpack_exports__, "b", function() { return guid; });
/* unused concated harmony import hexToRgba */
/* unused concated harmony import parseQuery */
/* unused concated harmony import stringifyQuery */





/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./packages/uni-app-plus/dist/view.runtime.esm.js
var view_runtime_esm = __webpack_require__(8);

// EXTERNAL MODULE: ./src/shared/index.js + 4 modules
var shared = __webpack_require__(2);

// EXTERNAL MODULE: ./src/core/helpers/index.js
var helpers = __webpack_require__(4);

// CONCATENATED MODULE: ./src/core/helpers/constants.js
var NAVBAR_HEIGHT = 44;
var TABBAR_HEIGHT = 50;
// EXTERNAL MODULE: ./src/core/view/bridge/subscribe/scroll.js
var subscribe_scroll = __webpack_require__(54);

// EXTERNAL MODULE: ./src/core/view/bridge/subscribe/api/request-component-info.js
var request_component_info = __webpack_require__(55);

// EXTERNAL MODULE: ./src/core/view/bridge/subscribe/api/request-component-observer.js
var request_component_observer = __webpack_require__(48);

// CONCATENATED MODULE: ./src/core/view/bridge/subscribe/api/index.js


/* harmony default export */ var api = ({
  requestComponentInfo: request_component_info["a" /* requestComponentInfo */],
  requestComponentObserver: request_component_observer["b" /* requestComponentObserver */],
  destroyComponentObserver: request_component_observer["a" /* destroyComponentObserver */]
});
// CONCATENATED MODULE: ./src/core/view/bridge/subscribe/index.js





var passiveOptions = shared["f" /* supportsPassive */] ? {
  passive: false
} : false;

function updateCssVar(vm) {
  if (uni.canIUse('css.var')) {
    var pageVm = vm.$parent.$parent;
    var windowTop = pageVm.showNavigationBar && pageVm.navigationBar.type !== 'transparent' && pageVm.navigationBar.type !== 'float' ? NAVBAR_HEIGHT + 'px' : '0px';
    var windowBottom = getApp().$children[0].showTabBar ? TABBAR_HEIGHT + 'px' : '0px';
    var style = document.documentElement.style;
    style.setProperty('--window-top', windowTop);
    style.setProperty('--window-bottom', windowBottom);
    console.debug("".concat(vm.$page.route, "[").concat(vm.$page.id, "]\uFF1A--window-top=").concat(windowTop));
    console.debug("".concat(vm.$page.route, "[").concat(vm.$page.id, "]\uFF1A--window-bottom=").concat(windowBottom));
  }
}

function initSubscribe(subscribe) {
  Object.keys(api).forEach(function (name) {
    subscribe(name, api[name]);
  });
  subscribe('pageScrollTo', subscribe_scroll["a" /* pageScrollTo */]);

  if (false) { var disableScrollListener, scrollListener; }
}
// EXTERNAL MODULE: ./src/platforms/app-plus/view/bridge.js
var bridge = __webpack_require__(11);

// CONCATENATED MODULE: ./src/core/view/bridge/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "off", function() { return off; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "once", function() { return once; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emit", function() { return emit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribe", function() { return bridge_subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsubscribe", function() { return unsubscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeHandler", function() { return subscribeHandler; });
/* concated harmony reexport publishHandler */__webpack_require__.d(__webpack_exports__, "publishHandler", function() { return bridge["a" /* publishHandler */]; });


var Emitter = new view_runtime_esm["a" /* default */]();
var on = Emitter.$on.bind(Emitter);
var off = Emitter.$off.bind(Emitter);
var once = Emitter.$once.bind(Emitter);
var emit = Emitter.$emit.bind(Emitter);
function bridge_subscribe(event, callback) {
  return on('service.' + event, callback);
}
function unsubscribe(event, callback) {
  return off('service.' + event, callback);
}
function subscribeHandler(event, args, pageId) {
  if (true) {
    console.log("[subscribeHandler][".concat(Date.now(), "]:"), event, args, pageId);
  }

  emit('service.' + event, args, pageId);
}

initSubscribe(bridge_subscribe);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isPage; });
/* unused harmony export hasLifecycleHook */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return normalizeDataset; });
/* unused harmony export upx2px */
var components = ['SystemAsyncLoading', 'SystemAsyncError'];
function isPage(vm) {
  if (vm.$parent && vm.$parent.$options.name === 'PageBody') {
    if (components.indexOf(vm.$options.name) !== -1) {
      return false;
    }

    return true;
  }

  return false;
}
function hasLifecycleHook() {
  var vueOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var hook = arguments.length > 1 ? arguments[1] : undefined;
  return Array.isArray(vueOptions[hook]) && vueOptions[hook].length;
}
function normalizeDataset() {
  var dataset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // ios8.x,9.x Object.assign({},dataset) 始终返回 {}
  // http://ask.dcloud.net.cn/question/70246
  var result = JSON.parse(JSON.stringify(dataset));

  if (false) { var _len, key, i, len, keys; }

  return result;
}
function upx2px(str) {
  str = str + '';

  if (str.indexOf('upx') !== -1) {
    // upx转换
    return uni.upx2px(parseInt(str) || 0);
  }

  return parseInt(str) || 0;
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PAGE_CREATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MOUNTED_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return UPDATED_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return PAGE_CREATED; });
/* unused harmony export LAYOUT_READY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_SERVICE_ID; });
/* unused harmony export WEBVIEW_READY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return WEBVIEW_UI_EVENT; });
var PAGE_CREATE = 2;
var MOUNTED_DATA = 4;
var UPDATED_DATA = 6;
var PAGE_CREATED = 10;
var LAYOUT_READY = 30;
var APP_SERVICE_ID = '__uniapp__service';
var WEBVIEW_READY = 'webviewReady';
var WEBVIEW_UI_EVENT = 'webviewUIEvent';

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var attrs = ['top', 'left', 'right', 'bottom'];
var inited;
var elementComputedStyle = {};
var support;
function getSupport() {
    if (!('CSS' in window) || typeof CSS.supports != 'function') {
        support = '';
    }
    else if (CSS.supports('top: env(safe-area-inset-top)')) {
        support = 'env';
    }
    else if (CSS.supports('top: constant(safe-area-inset-top)')) {
        support = 'constant';
    }
    else {
        support = '';
    }
    return support;
}
function init() {
    support = typeof support === 'string' ? support : getSupport();
    if (!support) {
        attrs.forEach(function (attr) {
            elementComputedStyle[attr] = 0;
        });
        return;
    }
    function setStyle(el, style) {
        var elStyle = el.style;
        Object.keys(style).forEach(function (key) {
            var val = style[key];
            elStyle[key] = val;
        });
    }
    var cbs = [];
    function parentReady(callback) {
        if (callback) {
            cbs.push(callback);
        }
        else {
            cbs.forEach(function (cb) {
                cb();
            });
        }
    }
    var passiveEvents = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function () {
                passiveEvents = { passive: true };
            }
        });
        window.addEventListener('test', null, opts);
    }
    catch (e) {
    }
    function addChild(parent, attr) {
        var a1 = document.createElement('div');
        var a2 = document.createElement('div');
        var a1Children = document.createElement('div');
        var a2Children = document.createElement('div');
        var W = 100;
        var MAX = 10000;
        var aStyle = {
            position: 'absolute',
            width: W + 'px',
            height: '200px',
            boxSizing: 'border-box',
            overflow: 'hidden',
            paddingBottom: support + "(safe-area-inset-" + attr + ")"
        };
        setStyle(a1, aStyle);
        setStyle(a2, aStyle);
        setStyle(a1Children, {
            transition: '0s',
            animation: 'none',
            width: '400px',
            height: '400px'
        });
        setStyle(a2Children, {
            transition: '0s',
            animation: 'none',
            width: '250%',
            height: '250%'
        });
        a1.appendChild(a1Children);
        a2.appendChild(a2Children);
        parent.appendChild(a1);
        parent.appendChild(a2);
        parentReady(function () {
            a1.scrollTop = a2.scrollTop = MAX;
            var a1LastScrollTop = a1.scrollTop;
            var a2LastScrollTop = a2.scrollTop;
            function onScroll() {
                if (this.scrollTop === (this === a1 ? a1LastScrollTop : a2LastScrollTop)) {
                    return;
                }
                a1.scrollTop = a2.scrollTop = MAX;
                a1LastScrollTop = a1.scrollTop;
                a2LastScrollTop = a2.scrollTop;
                attrChange(attr);
            }
            a1.addEventListener('scroll', onScroll, passiveEvents);
            a2.addEventListener('scroll', onScroll, passiveEvents);
        });
        var computedStyle = getComputedStyle(a1);
        Object.defineProperty(elementComputedStyle, attr, {
            configurable: true,
            get: function () {
                return parseFloat(computedStyle.paddingBottom);
            }
        });
    }
    var parentDiv = document.createElement('div');
    setStyle(parentDiv, {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '0',
        height: '0',
        zIndex: '-1',
        overflow: 'hidden',
        visibility: 'hidden',
    });
    attrs.forEach(function (key) {
        addChild(parentDiv, key);
    });
    document.body.appendChild(parentDiv);
    parentReady();
    inited = true;
}
function getAttr(attr) {
    if (!inited) {
        init();
    }
    return elementComputedStyle[attr];
}
var changeAttrs = [];
function attrChange(attr) {
    if (!changeAttrs.length) {
        setTimeout(function () {
            var style = {};
            changeAttrs.forEach(function (attr) {
                style[attr] = elementComputedStyle[attr];
            });
            changeAttrs.length = 0;
            callbacks.forEach(function (callback) {
                callback(style);
            });
        }, 0);
    }
    changeAttrs.push(attr);
}
var callbacks = [];
function onChange(callback) {
    if (!getSupport()) {
        return;
    }
    if (!inited) {
        init();
    }
    if (typeof callback === 'function') {
        callbacks.push(callback);
    }
}
function offChange(callback) {
    var index = callbacks.indexOf(callback);
    if (index >= 0) {
        callbacks.splice(index, 1);
    }
}
var safeAreaInsets = {
    get support() {
        return (typeof support === 'string' ? support : getSupport()).length != 0;
    },
    get top() {
        return getAttr('top');
    },
    get left() {
        return getAttr('left');
    },
    get right() {
        return getAttr('right');
    },
    get bottom() {
        return getAttr('bottom');
    },
    onChange: onChange,
    offChange: offChange
};
module.exports = safeAreaInsets;
//# sourceMappingURL=index.js.map

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var addListenerToElement = function addListenerToElement(element, type, callback, r) {
  // 暂时忽略capture
  element.addEventListener(type, function ($event) {
    if (typeof callback === 'function') {
      if (callback($event) === false) {
        $event.preventDefault();
        $event.stopPropagation();
      }
    }
  }, {
    passive: false
  });
};

/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    touchtrack: function touchtrack(element, method, useCancel) {
      var self = this;
      var x0 = 0;
      var y0 = 0;
      var x1 = 0;
      var y1 = 0;

      var fn = function fn($event, state, x, y) {
        if (self[method]({
          target: $event.target,
          currentTarget: $event.currentTarget,
          preventDefault: $event.preventDefault.bind($event),
          stopPropagation: $event.stopPropagation.bind($event),
          touches: $event.touches,
          changedTouches: $event.changedTouches,
          detail: {
            state: state,
            x0: x,
            y0: y,
            dx: x - x0,
            dy: y - y0,
            ddx: x - x1,
            ddy: y - y1,
            timeStamp: $event.timeStamp
          }
        }) === false) {
          return false;
        }
      };

      var $eventOld = null;
      addListenerToElement(element, 'touchstart', function ($event) {
        if ($event.touches.length === 1 && !$eventOld) {
          $eventOld = $event;
          x0 = x1 = $event.touches[0].pageX;
          y0 = y1 = $event.touches[0].pageY;
          return fn($event, 'start', x0, y0);
        }
      });
      addListenerToElement(element, 'touchmove', function ($event) {
        if ($event.touches.length === 1 && $eventOld) {
          var res = fn($event, 'move', $event.touches[0].pageX, $event.touches[0].pageY);
          x1 = $event.touches[0].pageX;
          y1 = $event.touches[0].pageY;
          return res;
        }
      });
      addListenerToElement(element, 'touchend', function ($event) {
        if ($event.touches.length === 0 && $eventOld) {
          $eventOld = null;
          return fn($event, 'end', $event.changedTouches[0].pageX, $event.changedTouches[0].pageY);
        }
      });
      addListenerToElement(element, 'touchcancel', function ($event) {
        if ($eventOld) {
          var $eventTemp = $eventOld;
          $eventOld = null;
          return fn($event, useCancel ? 'cancel' : 'end', $eventTemp.touches[0].pageX, $eventTemp.touches[0].pageY);
        }
      });
    }
  }
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var isUsingMicroTask = false;

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ( true && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    // allow arbitrary string value for contenteditable
    : key === 'contenteditable' && isValidContentEditableValue(value)
      ? value
      : 'true'
};

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
       true && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (true) {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ( true && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (true) {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (true) {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (true) {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (true) {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ( true &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ( true &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (true) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && value !== '' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

/*  */

/*  */

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1 (event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1 (
  name,
  handler,
  capture,
  passive
) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;
    handler = original._wrapper = function (e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget ||
        // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp ||
        // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 ||
        // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original.apply(this, arguments)
      }
    };
  }
  target$1.addEventListener(
    name,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  name,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

var svgContainer;

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
      // skip the update if old and new VDOM state is the same.
      // `value` is handled separately because the DOM value may be temporarily
      // out of sync with VDOM state due to focus, composition and modifiers.
      // This  #4521 by skipping the unnecesarry `checked` update.
      cur !== oldProps[key]
    ) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;

// upx,rpx 正则匹配
var unitRE = /([+-]?\d+(\.\d+)?)[r|u]px/g;

var transformUnit = function (val) {
  if (typeof val === 'string') {
    return val.replace(unitRE, function (a, b) {
      /* eslint-disable no-undef */
      return uni.upx2px(b) + 'px'
    })
  }
  return val
};

var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = transformUnit(val[i]);
      }
    } else {
      el.style[normalizedName] = transformUnit(val);
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;
  var el = vnode.elm;
  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style) &&
    isUndef(el.__wxsStyle) // fixed by xxxxxx __wxsStyle
  ) {
    return
  }

  var cur, name;
  
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  // fixed by xxxxxx __wxsStyle
  if(el.__wxsStyle){
    Object.assign(vnode.data.normalizedStyle, el.__wxsStyle);
    Object.assign(newStyle, el.__wxsStyle);
  }

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ( true && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ( true && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
     true && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

var isVShowDirective = function (d) { return d.name === 'show'; };

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ( true && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ( true &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount () {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(
        this$1._vnode,
        this$1.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (true) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        true
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if ( true &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

/* harmony default export */ __webpack_exports__["a"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(47)))

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getWindowOffset; });
function getWindowOffset() {
  return {
    top: 0,
    bottom: 0
  };
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./src/shared/index.js + 4 modules
var shared = __webpack_require__(2);

// EXTERNAL MODULE: ./src/core/helpers/index.js
var helpers = __webpack_require__(4);

// CONCATENATED MODULE: ./src/core/helpers/patch.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


/**
 * mpvue event
 */

function wrapperMPEvent(event) {
  return Object.assign({
    mp: event,
    _processed: true
  }, event);
}
/**
 * app-plus titleNView
 */

function mergeTitleNView(navigationBar, titleNView) {
  if (Object(shared["e" /* isPlainObject */])(titleNView)) {
    if (Object(shared["c" /* hasOwn */])(titleNView, 'backgroundColor')) {
      navigationBar.backgroundColor = titleNView.backgroundColor;
    }

    if (Object(shared["c" /* hasOwn */])(titleNView, 'buttons')) {
      navigationBar.buttons = titleNView.buttons;
    }

    if (Object(shared["c" /* hasOwn */])(titleNView, 'titleColor')) {
      navigationBar.textColor = titleNView.titleColor;
    }

    if (Object(shared["c" /* hasOwn */])(titleNView, 'titleText')) {
      navigationBar.titleText = titleNView.titleText;
    }

    if (Object(shared["c" /* hasOwn */])(titleNView, 'titleSize')) {
      navigationBar.titleSize = titleNView.titleSize;
    }

    if (Object(shared["c" /* hasOwn */])(titleNView, 'type')) {
      navigationBar.type = titleNView.type;
    }

    if (Object(shared["c" /* hasOwn */])(titleNView, 'searchInput') && _typeof(titleNView.searchInput) === 'object') {
      navigationBar.searchInput = Object.assign({
        autoFocus: false,
        align: 'center',
        color: '#000000',
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: '0px',
        placeholder: '',
        placeholderColor: '#CCCCCC',
        disabled: false
      }, titleNView.searchInput);
    }
  }

  return navigationBar;
}
// EXTERNAL MODULE: ./src/platforms/app-plus/helpers/get-window-offset.js
var get_window_offset = __webpack_require__(9);

// CONCATENATED MODULE: ./src/core/view/plugins/events.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return processEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initEvents; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






function processTarget(target, detail) {
  var res = {
    id: target.id,
    offsetLeft: target.offsetLeft,
    offsetTop: target.offsetTop,
    dataset: Object(helpers["b" /* normalizeDataset */])(target.dataset)
  };

  if (detail) {
    Object.assign(res, detail);
  }

  return res;
}

function processTouches(touches) {
  if (touches) {
    var res = [];

    var _getWindowOffset = Object(get_window_offset["a" /* default */])(),
        top = _getWindowOffset.top;

    for (var i = 0; i < touches.length; i++) {
      var touch = touches[i];
      res.push({
        identifier: touch.identifier,
        pageX: touch.pageX,
        pageY: touch.pageY - top,
        clientX: touch.clientX,
        clientY: touch.clientY - top,
        force: touch.force || 0
      });
    }

    return res;
  }

  return [];
}

function processEvent(name) {
  var $event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var target = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var currentTarget = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  if ($event._processed) {
    $event.type = detail.type || name;
    return $event;
  } // fixed 针对小程序 click（tap）事件，补充事件详情


  if (name === 'click') {
    var _getWindowOffset2 = Object(get_window_offset["a" /* default */])(),
        top = _getWindowOffset2.top;

    detail = {
      x: $event.x,
      y: $event.y - top
    };
    $event.touches = $event.changedTouches = [{
      force: 1,
      identifier: 0,
      clientX: $event.clientX,
      clientY: $event.clientY,
      pageX: $event.pageX,
      pageY: $event.pageY
    }];
  } // fixed mp-vue


  var ret = wrapperMPEvent({
    type: detail.type || name,
    timeStamp: $event.timeStamp || 0,
    detail: detail,
    target: processTarget(target, detail),
    currentTarget: processTarget(currentTarget),
    // 只处理系统事件
    touches: $event instanceof Event || $event instanceof CustomEvent ? processTouches($event.touches) : $event.touches,
    changedTouches: $event instanceof Event || $event instanceof CustomEvent ? processTouches($event.changedTouches) : $event.changedTouches,
    preventDefault: function preventDefault() {},
    stopPropagation: function stopPropagation() {}
  });

  if (true) {
    var nid = currentTarget.getAttribute('_i');
    ret.options = {
      nid: nid
    };
  }

  return ret;
}
var LONGPRESS_TIMEOUT = 350;
var LONGPRESS_THRESHOLD = 10;
var passiveOptions = shared["f" /* supportsPassive */] ? {
  passive: true
} : false;
var longPressTimer = false;

function clearLongPressTimer() {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = false;
  }
}

var startPageX = 0;
var startPageY = 0;

function touchstart(evt) {
  clearLongPressTimer();

  if (evt.touches.length !== 1) {
    return;
  }

  var _evt$touches = _slicedToArray(evt.touches, 1),
      _evt$touches$ = _evt$touches[0],
      pageX = _evt$touches$.pageX,
      pageY = _evt$touches$.pageY;

  startPageX = pageX;
  startPageY = pageY;
  longPressTimer = setTimeout(function () {
    var customEvent = new CustomEvent('longpress', {
      bubbles: true,
      cancelable: true,
      target: evt.target,
      currentTarget: evt.currentTarget
    });
    customEvent.touches = evt.touches;
    customEvent.changedTouches = evt.changedTouches;
    evt.target.dispatchEvent(customEvent);
  }, LONGPRESS_TIMEOUT);
}

function touchmove(evt) {
  if (!longPressTimer) {
    return;
  }

  if (evt.touches.length !== 1) {
    return clearLongPressTimer();
  }

  var _evt$touches2 = _slicedToArray(evt.touches, 1),
      _evt$touches2$ = _evt$touches2[0],
      pageX = _evt$touches2$.pageX,
      pageY = _evt$touches2$.pageY;

  if (Math.abs(pageX - startPageX) > LONGPRESS_THRESHOLD || Math.abs(pageY - startPageY) > LONGPRESS_THRESHOLD) {
    return clearLongPressTimer();
  }
}

function initEvents() {
  window.addEventListener('touchstart', touchstart, passiveOptions);
  window.addEventListener('touchmove', touchmove, passiveOptions);
  window.addEventListener('touchend', clearLongPressTimer, passiveOptions);
  window.addEventListener('touchcancel', clearLongPressTimer, passiveOptions);
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return publishHandler; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


function plusReady(callback) {
  if (!callback) {
    return;
  }

  if (window.plus) {
    return callback();
  }

  document.addEventListener('plusready', callback);
}

function publishHandler(event) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  plusReady(function () {
    var pageId = plus.webview.currentWebview().id;

    if (true) {
      console.log("[VIEW][".concat(Date.now(), "]:"), event, args, pageId);
    }

    plus.webview.postMessageToUniNView({
      type: 'subscribeHandler',
      args: {
        type: event,
        data: args,
        pageId: pageId
      }
    }, _constants__WEBPACK_IMPORTED_MODULE_0__[/* APP_SERVICE_ID */ "a"]);
  });
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      hovering: false
    };
  },
  props: {
    hoverClass: {
      type: String,
      default: 'none'
    },
    hoverStopPropagation: {
      type: Boolean,
      default: false
    },
    hoverStartTime: {
      type: Number,
      default: 50
    },
    hoverStayTime: {
      type: Number,
      default: 400
    }
  },
  methods: {
    _hoverTouchStart: function _hoverTouchStart(evt) {
      var _this = this;

      // TODO detect scrolling
      if (evt._hoverPropagationStopped) {
        return;
      }

      if (!this.hoverClass || this.hoverClass === 'none' || this.disabled) {
        return;
      }

      if (evt.touches.length > 1) {
        return;
      }

      if (this.hoverStopPropagation) {
        evt._hoverPropagationStopped = true;
      }

      this._hoverTouch = true;
      this._hoverStartTimer = setTimeout(function () {
        _this.hovering = true;

        if (!_this._hoverTouch) {
          // 防止在hoverStartTime时间内触发了 touchend 或 touchcancel
          _this._hoverReset();
        }
      }, this.hoverStartTime);
    },
    _hoverTouchEnd: function _hoverTouchEnd(evt) {
      this._hoverTouch = false;

      if (this.hovering) {
        this._hoverReset();
      }
    },
    _hoverReset: function _hoverReset() {
      var _this2 = this;

      requestAnimationFrame(function () {
        clearTimeout(_this2._hoverStayTimer);
        _this2._hoverStayTimer = setTimeout(function () {
          _this2.hovering = false;
        }, _this2.hoverStayTime);
      });
    },
    _hoverTouchCancel: function _hoverTouchCancel(evt) {
      this._hoverTouch = false;
      this.hovering = false;
      clearTimeout(this._hoverStartTimer);
    }
  }
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony import */ var uni_mixins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var uni_helpers_hidpi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(46);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



function resolveColor(color) {
  color = color.slice(0);
  color[3] = color[3] / 255;
  return 'rgba(' + color.join(',') + ')';
}

function processTouches(target, touches) {
  return [].map.call(touches, function (touch) {
    var boundingClientRect = target.getBoundingClientRect();
    return {
      identifier: touch.identifier,
      x: touch.clientX - boundingClientRect.left,
      y: touch.clientY - boundingClientRect.top
    };
  });
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'Canvas',
  mixins: [uni_mixins__WEBPACK_IMPORTED_MODULE_0__[/* subscriber */ "d"]],
  props: {
    canvasId: {
      type: String,
      default: ''
    },
    disableScroll: {
      type: [Boolean, String],
      default: false
    }
  },
  data: function data() {
    return {
      actionsWaiting: false
    };
  },
  computed: {
    id: function id() {
      return this.canvasId;
    },
    _listeners: function _listeners() {
      var _this = this;

      var $listeners = Object.assign({}, this.$listeners);
      var events = ['touchstart', 'touchmove', 'touchend'];
      events.forEach(function (event) {
        var existing = $listeners[event];
        var eventHandler = [];

        if (existing) {
          eventHandler.push(function ($event) {
            _this.$trigger(event, Object.assign({}, $event, {
              touches: processTouches($event.currentTarget, $event.touches),
              changedTouches: processTouches($event.currentTarget, $event.changedTouches)
            }));
          });
        }

        if (_this.disableScroll && event === 'touchmove') {
          eventHandler.push(_this._touchmove);
        }

        $listeners[event] = eventHandler;
      });
      return $listeners;
    }
  },
  created: function created() {
    this._actionsDefer = [];
    this._images = {};
  },
  mounted: function mounted() {
    this._resize({
      width: this.$refs.sensor.$el.offsetWidth,
      height: this.$refs.sensor.$el.offsetHeight
    });
  },
  methods: {
    _handleSubscribe: function _handleSubscribe(_ref) {
      var type = _ref.type,
          _ref$data = _ref.data,
          data = _ref$data === void 0 ? {} : _ref$data;
      var method = this[type];

      if (type.indexOf('_') !== 0 && typeof method === 'function') {
        method(data);
      }
    },
    _resize: function _resize() {
      Object(uni_helpers_hidpi__WEBPACK_IMPORTED_MODULE_1__[/* wrapper */ "b"])(this.$refs.canvas);
    },
    _touchmove: function _touchmove(event) {
      event.preventDefault();
    },
    actionsChanged: function actionsChanged(_ref2) {
      var _this2 = this;

      var actions = _ref2.actions,
          reserve = _ref2.reserve,
          callbackId = _ref2.callbackId;
      var self = this;

      if (!actions) {
        return;
      }

      if (this.actionsWaiting) {
        this._actionsDefer.push([actions, reserve, callbackId]);

        return;
      }

      var canvas = this.$refs.canvas;
      var c2d = canvas.getContext('2d');

      if (!reserve) {
        c2d.fillStyle = '#000000';
        c2d.strokeStyle = '#000000';
        c2d.shadowColor = '#000000';
        c2d.shadowBlur = 0;
        c2d.shadowOffsetX = 0;
        c2d.shadowOffsetY = 0;
        c2d.setTransform(1, 0, 0, 1, 0, 0);
        c2d.clearRect(0, 0, canvas.width, canvas.height);
      }

      this.preloadImage(actions);

      var _loop2 = function _loop2(index) {
        var action = actions[index];
        var method = action.method;
        var data = action.data;

        if (/^set/.test(method) && method !== 'setTransform') {
          var method1 = method[3].toLowerCase() + method.slice(4);
          var color;

          if (method1 === 'fillStyle' || method1 === 'strokeStyle') {
            if (data[0] === 'normal') {
              color = resolveColor(data[1]);
            } else if (data[0] === 'linear') {
              var LinearGradient = c2d.createLinearGradient.apply(c2d, _toConsumableArray(data[1]));
              data[2].forEach(function (data2) {
                var offset = data2[0];
                var color = resolveColor(data2[1]);
                LinearGradient.addColorStop(offset, color);
              });
              color = LinearGradient;
            } else if (data[0] === 'radial') {
              var x = data[1][0];
              var y = data[1][1];
              var r = data[1][2];

              var _LinearGradient = c2d.createRadialGradient(x, y, 0, x, y, r);

              data[2].forEach(function (data2) {
                var offset = data2[0];
                var color = resolveColor(data2[1]);

                _LinearGradient.addColorStop(offset, color);
              });
              color = _LinearGradient;
            } else if (data[0] === 'pattern') {
              var loaded = _this2.checkImageLoaded(data[1], actions.slice(index + 1), callbackId, function (image) {
                if (image) {
                  c2d[method1] = c2d.createPattern(image, data[2]);
                }
              });

              if (!loaded) {
                return "break";
              }

              return "continue";
            }

            c2d[method1] = color;
          } else if (method1 === 'globalAlpha') {
            c2d[method1] = data[0] / 255;
          } else if (method1 === 'shadow') {
            _ = ['shadowOffsetX', 'shadowOffsetY', 'shadowBlur', 'shadowColor'];
            data.forEach(function (color_, method_) {
              c2d[_[method_]] = _[method_] === 'shadowColor' ? resolveColor(color_) : color_;
            });
          } else {
            if (method1 === 'fontSize') {
              c2d.font = c2d.font.replace(/\d+\.?\d*px/, data[0] + 'px');
            } else {
              if (method1 === 'lineDash') {
                c2d.setLineDash(data[0]);
                c2d.lineDashOffset = data[1] || 0;
              } else {
                if (method1 === 'textBaseline') {
                  if (data[0] === 'normal') {
                    data[0] = 'alphabetic';
                  }

                  c2d[method1] = data[0];
                } else {
                  c2d[method1] = data[0];
                }
              }
            }
          }
        } else if (method === 'fillPath' || method === 'strokePath') {
          method = method.replace(/Path/, '');
          c2d.beginPath();
          data.forEach(function (data_) {
            c2d[data_.method].apply(c2d, data_.data);
          });
          c2d[method]();
        } else if (method === 'fillText') {
          c2d.fillText.apply(c2d, data);
        } else if (method === 'drawImage') {
          A = function () {
            var dataArray = _toConsumableArray(data);

            var url = dataArray[0];
            var otherData = dataArray.slice(1);
            self._images = self._images || {};
            if (!self.checkImageLoaded(url, actions.slice(index + 1), callbackId, function (image) {
              if (image) {
                c2d.drawImage.apply(c2d, [image].concat(_toConsumableArray(otherData.slice(4, 8)), _toConsumableArray(otherData.slice(0, 4))));
              }
            })) return 'break';
          }();

          if (A === 'break') {
            return "break";
          }
        } else {
          if (method === 'clip') {
            data.forEach(function (data_) {
              c2d[data_.method].apply(c2d, data_.data);
            });
            c2d.clip();
          } else {
            c2d[method].apply(c2d, data);
          }
        }
      };

      _loop: for (var index = 0; index < actions.length; index++) {
        var _;

        var A;

        var _ret = _loop2(index);

        switch (_ret) {
          case "break":
            break _loop;

          case "continue":
            continue;
        }
      }

      if (!this.actionsWaiting && callbackId) {
        UniViewJSBridge.publishHandler('onDrawCanvas', {
          callbackId: callbackId,
          data: {
            errMsg: 'drawCanvas:ok'
          }
        }, this.$page.id);
      }
    },
    preloadImage: function preloadImage(actions) {
      var sefl = this;
      actions.forEach(function (action) {
        var method = action.method;
        var data = action.data;
        var src = '';

        if (method === 'drawImage') {
          src = data[0];
          src = sefl.$getRealPath(src);
          data[0] = src;
        } else if (method === 'setFillStyle' && data[0] === 'pattern') {
          src = data[1];
          src = sefl.$getRealPath(src);
          data[1] = src;
        }

        if (src && !sefl._images[src]) {
          loadImage();
        }
        /**
         * 加载图像
         */


        function loadImage() {
          sefl._images[src] = new Image();

          sefl._images[src].onload = function () {
            sefl._images[src].ready = true;
          };
          /**
           * 从Blob加载
           * @param {Blob} blob
           */


          function loadBlob(blob) {
            sefl._images[src].src = (window.URL || window.webkitURL).createObjectURL(blob);
          }
          /**
           * 从本地文件加载
           * @param {string} path 文件路径
           */


          function loadFile(path) {
            var bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now());
            bitmap.load(path, function () {
              sefl._images[src].src = bitmap.toBase64Data();
              bitmap.clear();
            }, function () {
              bitmap.clear();
              console.error('preloadImage error');
            });
          }
          /**
           * 从网络加载
           * @param {string} url 文件地址
           */


          function loadUrl(url) {
            function plusDownload() {
              plus.downloader.createDownload(url, {
                filename: '_doc/uniapp_temp/download/'
              }, function (d, status) {
                if (status === 200) {
                  loadFile(d.filename);
                } else {
                  sefl._images[src].src = src;
                }
              }).start();
            }

            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'blob';

            xhr.onload = function () {
              if (this.status === 200) {
                loadBlob(this.response);
              }
            };

            xhr.onerror = window.plus ? plusDownload : function () {
              sefl._images[src].src = src;
            };
            xhr.send();
          }

          if (window.plus && (!window.webkit || !window.webkit.messageHandlers)) {
            sefl._images[src].src = src;
          } else {
            // 解决 PLUS-APP（wkwebview）以及 H5 图像跨域问题（H5图像响应头需包含access-control-allow-origin）
            if (window.plus && src.indexOf('http://') !== 0 && src.indexOf('https://') !== 0) {
              loadFile(src);
            } else if (/^data:.*,.*/.test(src)) {
              sefl._images[src].src = src;
            } else {
              loadUrl(src);
            }
          }
        }
      });
    },
    checkImageLoaded: function checkImageLoaded(src, actions, callbackId, fn) {
      var self = this;
      var image = this._images[src];

      if (image.ready) {
        fn(image);
        return true;
      } else {
        this._actionsDefer.unshift([actions, true]);

        this.actionsWaiting = true;

        image.onload = function () {
          image.ready = true;
          fn(image);
          self.actionsWaiting = false;

          var actions = self._actionsDefer.slice(0);

          self._actionsDefer = [];

          for (var action = actions.shift(); action;) {
            self.actionsChanged({
              actions: action[0],
              reserve: action[1],
              callbackId: callbackId
            });
            action = actions.shift();
          }
        };

        return false;
      }
    },
    getImageData: function getImageData(_ref3) {
      var _ref3$x = _ref3.x,
          x = _ref3$x === void 0 ? 0 : _ref3$x,
          _ref3$y = _ref3.y,
          y = _ref3$y === void 0 ? 0 : _ref3$y,
          width = _ref3.width,
          height = _ref3.height,
          destWidth = _ref3.destWidth,
          destHeight = _ref3.destHeight,
          _ref3$hidpi = _ref3.hidpi,
          hidpi = _ref3$hidpi === void 0 ? true : _ref3$hidpi,
          callbackId = _ref3.callbackId;
      var imgData;
      var canvas = this.$refs.canvas;

      if (!width) {
        width = canvas.offsetWidth - x;
      }

      if (!height) {
        height = canvas.offsetHeight - y;
      }

      try {
        var newCanvas = document.createElement('canvas');

        if (!hidpi) {
          if (!destWidth && !destHeight) {
            destWidth = Math.round(width * uni_helpers_hidpi__WEBPACK_IMPORTED_MODULE_1__[/* pixelRatio */ "a"]);
            destHeight = Math.round(height * uni_helpers_hidpi__WEBPACK_IMPORTED_MODULE_1__[/* pixelRatio */ "a"]);
          } else if (!destWidth) {
            destWidth = Math.round(width / height * destHeight);
          } else if (!destHeight) {
            destHeight = Math.round(height / width * destWidth);
          }
        } else {
          destWidth = width;
          destHeight = height;
        }

        newCanvas.width = destWidth;
        newCanvas.height = destHeight;
        var context = newCanvas.getContext('2d');
        context.__hidpi__ = true;
        context.drawImageByCanvas(canvas, x, y, width, height, 0, 0, destWidth, destHeight, false);
        imgData = context.getImageData(0, 0, destWidth, destHeight);
      } catch (error) {
        UniViewJSBridge.publishHandler('onCanvasMethodCallback', {
          callbackId: callbackId,
          data: {
            errMsg: 'canvasGetImageData:fail'
          }
        }, this.$page.id);
        return;
      }

      UniViewJSBridge.publishHandler('onCanvasMethodCallback', {
        callbackId: callbackId,
        data: {
          errMsg: 'canvasGetImageData:ok',
          data: _toConsumableArray(imgData.data),
          width: destWidth,
          height: destHeight
        }
      }, this.$page.id);
    },
    putImageData: function putImageData(_ref4) {
      var data = _ref4.data,
          x = _ref4.x,
          y = _ref4.y,
          width = _ref4.width,
          height = _ref4.height,
          callbackId = _ref4.callbackId;

      try {
        if (!height) {
          height = Math.round(data.length / 4 / width);
        }

        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');
        context.putImageData(new ImageData(new Uint8ClampedArray(data), width, height), 0, 0);
        this.$refs.canvas.getContext('2d').drawImage(canvas, x, y, width, height);
      } catch (error) {
        UniViewJSBridge.publishHandler('onCanvasMethodCallback', {
          callbackId: callbackId,
          data: {
            errMsg: 'canvasPutImageData:fail'
          }
        }, this.$page.id);
        return;
      }

      UniViewJSBridge.publishHandler('onCanvasMethodCallback', {
        callbackId: callbackId,
        data: {
          errMsg: 'canvasPutImageData:ok'
        }
      }, this.$page.id);
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony import */ var uni_mixins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'Label',
  mixins: [uni_mixins__WEBPACK_IMPORTED_MODULE_0__[/* emitter */ "a"]],
  props: {
    for: {
      type: String,
      default: ''
    }
  },
  methods: {
    _onClick: function _onClick($event) {
      var stopPropagation = /^uni-(checkbox|radio|switch)-/.test($event.target.className);

      if (!stopPropagation) {
        stopPropagation = /^uni-(checkbox|radio|switch|button)$/i.test($event.target.tagName);
      }

      if (stopPropagation) {
        return;
      }

      if (this.for) {
        UniViewJSBridge.emit('uni-label-click-' + this.$page.id + '-' + this.for, $event, true);
      } else {
        this.$broadcast(['Checkbox', 'Radio', 'Switch', 'Button'], 'uni-label-click', $event, true);
      }
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony import */ var uni_mixins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//
//
//
//
//
//
//
//

var _UniViewJSBridge = UniViewJSBridge,
    subscribe = _UniViewJSBridge.subscribe,
    unsubscribe = _UniViewJSBridge.unsubscribe,
    publishHandler = _UniViewJSBridge.publishHandler;
var mode = {
  SELECTOR: 'selector',
  MULTISELECTOR: 'multiSelector',
  TIME: 'time',
  DATE: 'date' // 暂不支持城市选择
  // REGION: 'region'

};
var fields = {
  YEAR: 'year',
  MONTH: 'month',
  DAY: 'day'
};
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'Picker',
  mixins: [uni_mixins__WEBPACK_IMPORTED_MODULE_0__[/* emitter */ "a"]],
  props: {
    name: {
      type: String,
      default: ''
    },
    range: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    rangeKey: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String, Array],
      default: 0
    },
    mode: {
      type: String,
      default: mode.SELECTOR,
      validator: function validator(val) {
        return Object.values(mode).indexOf(val) >= 0;
      }
    },
    fields: {
      type: String,
      default: 'day',
      validator: function validator(val) {
        return Object.values(fields).indexOf(val) >= 0;
      }
    },
    start: {
      type: String,
      default: function _default() {
        if (this.mode === mode.TIME) {
          return '00:00';
        }

        if (this.mode === mode.DATE) {
          var year = new Date().getFullYear() - 100;

          switch (this.fields) {
            case fields.YEAR:
              return year;

            case fields.MONTH:
              return year + '-01';

            case fields.DAY:
              return year + '-01-01';
          }
        }

        return '';
      }
    },
    end: {
      type: String,
      default: function _default() {
        if (this.mode === mode.TIME) {
          return '23:59';
        }

        if (this.mode === mode.DATE) {
          var year = new Date().getFullYear() + 100;

          switch (this.fields) {
            case fields.YEAR:
              return year;

            case fields.MONTH:
              return year + '-12';

            case fields.DAY:
              return year + '-12-31';
          }
        }

        return '';
      }
    },
    disabled: {
      type: [Boolean, String],
      default: false
    }
  },
  data: function data() {
    return {
      valueSync: this.value || 0,
      visible: false,
      valueChangeSource: ''
    };
  },
  watch: {
    value: function value(val) {
      var _this = this;

      if (Array.isArray(val)) {
        if (!Array.isArray(this.valueSync)) {
          this.valueSync = [];
        }

        this.valueSync.length = val.length;
        val.forEach(function (val, index) {
          if (val !== _this.valueSync[index]) {
            _this.$set(_this.valueSync, index, val);
          }
        });
      } else if (_typeof(val) !== 'object') {
        this.valueSync = val;
      }
    },
    valueSync: function valueSync(val) {
      if (!this.valueChangeSource) {
        this._show();
      } else {
        this.$emit('update:value', val);
      }
    }
  },
  created: function created() {
    var _this2 = this;

    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'add',
      vm: this
    });
    Object.keys(this.$props).forEach(function (key) {
      if (key !== 'value' && key !== 'name') {
        _this2.$watch(key, _this2._show);
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    });
  },
  destroyed: function destroyed() {
    if (this.visible) {
      var id = this.$page.id;
      publishHandler('hidePicker', {}, id);
    }
  },
  methods: {
    _click: function _click() {
      if (this.disabled) {
        return;
      }

      var id = this.$page.id;
      subscribe("".concat(id, "-picker-change"), this.change);
      subscribe("".concat(id, "-picker-columnchange"), this.columnchange);
      subscribe("".concat(id, "-picker-cancel"), this.cancel);
      this.visible = true;

      this._show();
    },
    _show: function _show() {
      if (this.visible) {
        var id = this.$page.id;
        var options = Object.assign({}, this.$props);
        options.value = this.valueSync;
        publishHandler('showPicker', options, id);
      }
    },
    change: function change(args) {
      this.visible = false;
      var id = this.$page.id;
      unsubscribe("".concat(id, "-picker-change"));
      unsubscribe("".concat(id, "-picker-columnchange"));
      unsubscribe("".concat(id, "-picker-cancel"));

      if (!this.disabled) {
        this.valueChangeSource = 'click';
        var value = args.value;
        this.valueSync = Array.isArray(value) ? value.map(function (val) {
          return val;
        }) : value;
        this.$trigger('change', {}, {
          value: value
        });
      }
    },
    columnchange: function columnchange(args) {
      this.$trigger('columnchange', {}, args);
    },
    cancel: function cancel(args) {
      this.visible = false;
      var id = this.$page.id;
      unsubscribe("".concat(id, "-picker-change"));
      unsubscribe("".concat(id, "-picker-columnchange"));
      unsubscribe("".concat(id, "-picker-cancel"));
      this.$trigger('cancel', {}, {});
    },
    _getFormData: function _getFormData() {
      return {
        value: this.valueSync,
        key: this.name
      };
    },
    _resetFormData: function _resetFormData() {
      this.valueSync = '';
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return definePage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getPageVueComponent; });
/* unused harmony export createPage */
/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

var pageFactory = Object.create(null);
function definePage(name, createPageVueComponent) {
  pageFactory[name] = createPageVueComponent;
}
var getPageVueComponent = Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* cached */ "a"])(function (pagePath) {
  return pageFactory[pagePath]();
});
function createPage(pagePath, pageId) {
  if (!pageFactory[pagePath]) {
    console.error("".concat(pagePath, " not found"));
  }

  var startTime = Date.now();
  var pageVm = new (getPageVueComponent(pagePath))({
    mpType: 'page',
    pageId: pageId,
    pagePath: pagePath
  });

  if (true) {
    console.log("new ".concat(pagePath), Date.now() - startTime);
  }

  return pageVm;
}

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getCurrentPages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return setCurrentPage; });
var pages = [];
function getCurrentPages() {
  return pages;
}
function setCurrentPage(pageId, pagePath) {
  pages.length = 0;
  pages.push({
    $page: {
      id: pageId,
      route: pagePath
    }
  });
}

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Friction; });
function Friction(e) {
  this._drag = e;
  this._dragLog = Math.log(e);
  this._x = 0;
  this._v = 0;
  this._startTime = 0;
}

Friction.prototype.set = function (e, t) {
  this._x = e;
  this._v = t;
  this._startTime = new Date().getTime();
};

Friction.prototype.setVelocityByEnd = function (e) {
  this._v = (e - this._x) * this._dragLog / (Math.pow(this._drag, 100) - 1);
};

Friction.prototype.x = function (e) {
  if (e === undefined) {
    e = (new Date().getTime() - this._startTime) / 1e3;
  }

  var t;
  t = e === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e);
  this._dt = e;
  return this._x + this._v * t / this._dragLog - this._v / this._dragLog;
};

Friction.prototype.dx = function (e) {
  if (e === undefined) {
    e = (new Date().getTime() - this._startTime) / 1e3;
  }

  var t;
  t = e === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e);
  this._dt = e;
  return this._v * t;
};

Friction.prototype.done = function () {
  return Math.abs(this.dx()) < 3;
};

Friction.prototype.reconfigure = function (e) {
  var t = this.x();
  var n = this.dx();
  this._drag = e;
  this._dragLog = Math.log(e);
  this.set(t, n);
};

Friction.prototype.configuration = function () {
  var e = this;
  return [{
    label: 'Friction',
    read: function read() {
      return e._drag;
    },
    write: function write(t) {
      e.reconfigure(t);
    },
    min: 0.001,
    max: 0.1,
    step: 0.001
  }];
};

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Spring; });
function o(e, t, n) {
  return e > t - n && e < t + n;
}

function a(e, t) {
  return o(e, 0, t);
}

function Spring(e, t, n) {
  this._m = e;
  this._k = t;
  this._c = n;
  this._solution = null;
  this._endPosition = 0;
  this._startTime = 0;
}

Spring.prototype._solve = function (e, t) {
  var n = this._c;
  var i = this._m;
  var r = this._k;
  var o = n * n - 4 * i * r;

  if (o === 0) {
    var _a = -n / (2 * i);

    var _s = e;

    var _l = t / (_a * e);

    return {
      x: function x(e) {
        return (_s + _l * e) * Math.pow(Math.E, _a * e);
      },
      dx: function dx(e) {
        var t = Math.pow(Math.E, _a * e);
        return _a * (_s + _l * e) * t + _l * t;
      }
    };
  }

  if (o > 0) {
    var c = (-n - Math.sqrt(o)) / (2 * i);
    var u = (-n + Math.sqrt(o)) / (2 * i);

    var _l2 = (t - c * e) / (u - c);

    var _s2 = e - _l2;

    return {
      x: function x(e) {
        var t;
        var n;

        if (e === this._t) {
          t = this._powER1T;
          n = this._powER2T;
        }

        this._t = e;

        if (!t) {
          t = this._powER1T = Math.pow(Math.E, c * e);
        }

        if (!n) {
          n = this._powER2T = Math.pow(Math.E, u * e);
        }

        return _s2 * t + _l2 * n;
      },
      dx: function dx(e) {
        var t;
        var n;

        if (e === this._t) {
          t = this._powER1T;
          n = this._powER2T;
        }

        this._t = e;

        if (!t) {
          t = this._powER1T = Math.pow(Math.E, c * e);
        }

        if (!n) {
          n = this._powER2T = Math.pow(Math.E, u * e);
        }

        return _s2 * c * t + _l2 * u * n;
      }
    };
  }

  var d = Math.sqrt(4 * i * r - n * n) / (2 * i);
  var a = -n / 2 * i;
  var s = e;
  var l = (t - a * e) / d;
  return {
    x: function x(e) {
      return Math.pow(Math.E, a * e) * (s * Math.cos(d * e) + l * Math.sin(d * e));
    },
    dx: function dx(e) {
      var t = Math.pow(Math.E, a * e);
      var n = Math.cos(d * e);
      var i = Math.sin(d * e);
      return t * (l * d * n - s * d * i) + a * t * (l * i + s * n);
    }
  };
};

Spring.prototype.x = function (e) {
  if (e === undefined) {
    e = (new Date().getTime() - this._startTime) / 1e3;
  }

  return this._solution ? this._endPosition + this._solution.x(e) : 0;
};

Spring.prototype.dx = function (e) {
  if (e === undefined) {
    e = (new Date().getTime() - this._startTime) / 1e3;
  }

  return this._solution ? this._solution.dx(e) : 0;
};

Spring.prototype.setEnd = function (e, t, n) {
  if (!n) {
    n = new Date().getTime();
  }

  if (e !== this._endPosition || !a(t, 0.4)) {
    t = t || 0;
    var i = this._endPosition;

    if (this._solution) {
      if (a(t, 0.4)) {
        t = this._solution.dx((n - this._startTime) / 1e3);
      }

      i = this._solution.x((n - this._startTime) / 1e3);

      if (a(t, 0.4)) {
        t = 0;
      }

      if (a(i, 0.4)) {
        i = 0;
      }

      i += this._endPosition;
    }

    if (!(this._solution && a(i - e, 0.4) && a(t, 0.4))) {
      this._endPosition = e;
      this._solution = this._solve(i - this._endPosition, t);
      this._startTime = n;
    }
  }
};

Spring.prototype.snap = function (e) {
  this._startTime = new Date().getTime();
  this._endPosition = e;
  this._solution = {
    x: function x() {
      return 0;
    },
    dx: function dx() {
      return 0;
    }
  };
};

Spring.prototype.done = function (e) {
  if (!e) {
    e = new Date().getTime();
  }

  return o(this.x(), this._endPosition, 0.4) && a(this.dx(), 0.4);
};

Spring.prototype.reconfigure = function (e, t, n) {
  this._m = e;
  this._k = t;
  this._c = n;

  if (!this.done()) {
    this._solution = this._solve(this.x() - this._endPosition, this.dx());
    this._startTime = new Date().getTime();
  }
};

Spring.prototype.springConstant = function () {
  return this._k;
};

Spring.prototype.damping = function () {
  return this._c;
};

Spring.prototype.configuration = function () {
  function e(e, t) {
    e.reconfigure(1, t, e.damping());
  }

  function t(e, t) {
    e.reconfigure(1, e.springConstant(), t);
  }

  return [{
    label: 'Spring Constant',
    read: this.springConstant.bind(this),
    write: e.bind(this, this),
    min: 100,
    max: 1e3
  }, {
    label: 'Damping',
    read: this.damping.bind(this),
    write: t.bind(this, this),
    min: 1,
    max: 500
  }];
};

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./src/core/view/mixins/scroller/Friction.js
var Friction = __webpack_require__(43);

// EXTERNAL MODULE: ./src/core/view/mixins/scroller/Spring.js
var Spring = __webpack_require__(44);

// CONCATENATED MODULE: ./src/core/view/mixins/scroller/Scroll.js


function Scroll(extent, friction, spring) {
  this._extent = extent;
  this._friction = friction || new Friction["a" /* Friction */](0.01);
  this._spring = spring || new Spring["a" /* Spring */](1, 90, 20);
  this._startTime = 0;
  this._springing = false;
  this._springOffset = 0;
}

Scroll.prototype.snap = function (e, t) {
  this._springOffset = 0;
  this._springing = true;

  this._spring.snap(e);

  this._spring.setEnd(t);
};

Scroll.prototype.set = function (e, t) {
  this._friction.set(e, t);

  if (e > 0 && t >= 0) {
    this._springOffset = 0;
    this._springing = true;

    this._spring.snap(e);

    this._spring.setEnd(0);
  } else {
    if (e < -this._extent && t <= 0) {
      this._springOffset = 0;
      this._springing = true;

      this._spring.snap(e);

      this._spring.setEnd(-this._extent);
    } else {
      this._springing = false;
    }
  }

  this._startTime = new Date().getTime();
};

Scroll.prototype.x = function (e) {
  if (!this._startTime) {
    return 0;
  }

  if (!e) {
    e = (new Date().getTime() - this._startTime) / 1e3;
  }

  if (this._springing) {
    return this._spring.x() + this._springOffset;
  }

  var t = this._friction.x(e);

  var n = this.dx(e);

  if (t > 0 && n >= 0 || t < -this._extent && n <= 0) {
    this._springing = true;

    this._spring.setEnd(0, n);

    if (t < -this._extent) {
      this._springOffset = -this._extent;
    } else {
      this._springOffset = 0;
    }

    t = this._spring.x() + this._springOffset;
  }

  return t;
};

Scroll.prototype.dx = function (e) {
  var t = 0;
  t = this._lastTime === e ? this._lastDx : this._springing ? this._spring.dx(e) : this._friction.dx(e);
  this._lastTime = e;
  this._lastDx = t;
  return t;
};

Scroll.prototype.done = function () {
  return this._springing ? this._spring.done() : this._friction.done();
};

Scroll.prototype.setVelocityByEnd = function (e) {
  this._friction.setVelocityByEnd(e);
};

Scroll.prototype.configuration = function () {
  var e = this._friction.configuration();

  e.push.apply(e, this._spring.configuration());
  return e;
};
// CONCATENATED MODULE: ./src/core/view/mixins/scroller/Scroller.js


function i(scroll, t, n) {
  function i(t, scroll, r, o) {
    if (!t || !t.cancelled) {
      r(scroll);
      var a = scroll.done();

      if (!a) {
        if (!t.cancelled) {
          t.id = requestAnimationFrame(i.bind(null, t, scroll, r, o));
        }
      }

      if (a && o) {
        o(scroll);
      }
    }
  }

  function r(scroll) {
    if (scroll && scroll.id) {
      cancelAnimationFrame(scroll.id);
    }

    if (scroll) {
      scroll.cancelled = true;
    }
  }

  var o = {
    id: 0,
    cancelled: false
  };
  i(o, scroll, t, n);
  return {
    cancel: r.bind(null, o),
    model: scroll
  };
}

function Scroller(element, options) {
  options = options || {};
  this._element = element;
  this._options = options;
  this._enableSnap = options.enableSnap || false;
  this._itemSize = options.itemSize || 0;
  this._enableX = options.enableX || false;
  this._enableY = options.enableY || false;
  this._shouldDispatchScrollEvent = !!options.onScroll;

  if (this._enableX) {
    this._extent = (options.scrollWidth || this._element.offsetWidth) - this._element.parentElement.offsetWidth;
    this._scrollWidth = options.scrollWidth;
  } else {
    this._extent = (options.scrollHeight || this._element.offsetHeight) - this._element.parentElement.offsetHeight;
    this._scrollHeight = options.scrollHeight;
  }

  this._position = 0;
  this._scroll = new Scroll(this._extent, options.friction, options.spring);
  this._onTransitionEnd = this.onTransitionEnd.bind(this);
  this.updatePosition();
}

Scroller.prototype.onTouchStart = function () {
  this._startPosition = this._position;
  this._lastChangePos = this._startPosition;

  if (this._startPosition > 0) {
    this._startPosition /= 0.5;
  } else {
    if (this._startPosition < -this._extent) {
      this._startPosition = (this._startPosition + this._extent) / 0.5 - this._extent;
    }
  }

  if (this._animation) {
    this._animation.cancel();

    this._scrolling = false;
  }

  this.updatePosition();
};

Scroller.prototype.onTouchMove = function (x, y) {
  var startPosition = this._startPosition;

  if (this._enableX) {
    startPosition += x;
  } else if (this._enableY) {
    startPosition += y;
  }

  if (startPosition > 0) {
    startPosition *= 0.5;
  } else if (startPosition < -this._extent) {
    startPosition = 0.5 * (startPosition + this._extent) - this._extent;
  }

  this._position = startPosition;
  this.updatePosition();
  this.dispatchScroll();
};

Scroller.prototype.onTouchEnd = function (e, r, o) {
  var _this = this;

  if (this._enableSnap && this._position > -this._extent && this._position < 0) {
    if (this._enableY && (Math.abs(r) < this._itemSize && Math.abs(o.y) < 300 || Math.abs(o.y) < 150)) {
      this.snap();
      return;
    }

    if (this._enableX && (Math.abs(e) < this._itemSize && Math.abs(o.x) < 300 || Math.abs(o.x) < 150)) {
      this.snap();
      return;
    }
  }

  if (this._enableX) {
    this._scroll.set(this._position, o.x);
  } else if (this._enableY) {
    this._scroll.set(this._position, o.y);
  }

  if (this._enableSnap) {
    var s = this._scroll._friction.x(100);

    var l = s % this._itemSize;
    var c = Math.abs(l) > this._itemSize / 2 ? s - (this._itemSize - Math.abs(l)) : s - l;

    if (c <= 0 && c >= -this._extent) {
      this._scroll.setVelocityByEnd(c);
    }
  }

  this._lastTime = Date.now();
  this._lastDelay = 0;
  this._scrolling = true;
  this._lastChangePos = this._position;
  this._lastIdx = Math.floor(Math.abs(this._position / this._itemSize));
  this._animation = i(this._scroll, function () {
    var e = Date.now();
    var i = (e - _this._scroll._startTime) / 1e3;

    var r = _this._scroll.x(i);

    _this._position = r;

    _this.updatePosition();

    var o = _this._scroll.dx(i);

    if (_this._shouldDispatchScrollEvent && e - _this._lastTime > _this._lastDelay) {
      _this.dispatchScroll();

      _this._lastDelay = Math.abs(2e3 / o);
      _this._lastTime = e;
    }
  }, function () {
    if (_this._enableSnap) {
      if (c <= 0 && c >= -_this._extent) {
        _this._position = c;

        _this.updatePosition();
      }

      if (typeof _this._options.onSnap === 'function') {
        _this._options.onSnap(Math.floor(Math.abs(_this._position) / _this._itemSize));
      }
    }

    if (_this._shouldDispatchScrollEvent) {
      _this.dispatchScroll();
    }

    _this._scrolling = false;
  });
};

Scroller.prototype.onTransitionEnd = function () {
  this._element.style.transition = '';
  this._element.style.webkitTransition = '';

  this._element.removeEventListener('transitionend', this._onTransitionEnd);

  this._element.removeEventListener('webkitTransitionEnd', this._onTransitionEnd);

  if (this._snapping) {
    this._snapping = false;
  }

  this.dispatchScroll();
};

Scroller.prototype.snap = function () {
  var e = this._itemSize;
  var t = this._position % e;
  var i = Math.abs(t) > this._itemSize / 2 ? this._position - (e - Math.abs(t)) : this._position - t;

  if (this._position !== i) {
    this._snapping = true;
    this.scrollTo(-i);

    if (typeof this._options.onSnap === 'function') {
      this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize));
    }
  }
};

Scroller.prototype.scrollTo = function (e, t) {
  if (this._animation) {
    this._animation.cancel();

    this._scrolling = false;
  }

  if (typeof e === 'number') {
    this._position = -e;
  }

  if (this._position < -this._extent) {
    this._position = -this._extent;
  } else {
    if (this._position > 0) {
      this._position = 0;
    }
  }

  this._element.style.transition = 'transform ' + (t || 0.2) + 's ease-out';
  this._element.style.webkitTransition = '-webkit-transform ' + (t || 0.2) + 's ease-out';
  this.updatePosition();

  this._element.addEventListener('transitionend', this._onTransitionEnd);

  this._element.addEventListener('webkitTransitionEnd', this._onTransitionEnd);
};

Scroller.prototype.dispatchScroll = function () {
  if (typeof this._options.onScroll === 'function' && Math.round(this._lastPos) !== Math.round(this._position)) {
    this._lastPos = this._position;
    var e = {
      target: {
        scrollLeft: this._enableX ? -this._position : 0,
        scrollTop: this._enableY ? -this._position : 0,
        scrollHeight: this._scrollHeight || this._element.offsetHeight,
        scrollWidth: this._scrollWidth || this._element.offsetWidth,
        offsetHeight: this._element.parentElement.offsetHeight,
        offsetWidth: this._element.parentElement.offsetWidth
      }
    };

    this._options.onScroll(e);
  }
};

Scroller.prototype.update = function (e, t, n) {
  var i = 0;
  var r = this._position;

  if (this._enableX) {
    i = this._element.childNodes.length ? (t || this._element.offsetWidth) - this._element.parentElement.offsetWidth : 0;
    this._scrollWidth = t;
  } else {
    i = this._element.childNodes.length ? (t || this._element.offsetHeight) - this._element.parentElement.offsetHeight : 0;
    this._scrollHeight = t;
  }

  if (typeof e === 'number') {
    this._position = -e;
  }

  if (this._position < -i) {
    this._position = -i;
  } else {
    if (this._position > 0) {
      this._position = 0;
    }
  }

  this._itemSize = n || this._itemSize;
  this.updatePosition();

  if (r !== this._position) {
    this.dispatchScroll();

    if (typeof this._options.onSnap === 'function') {
      this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize));
    }
  }

  this._extent = i;
  this._scroll._extent = i;
};

Scroller.prototype.updatePosition = function () {
  var transform = '';

  if (this._enableX) {
    transform = 'translateX(' + this._position + 'px) translateZ(0)';
  } else {
    if (this._enableY) {
      transform = 'translateY(' + this._position + 'px) translateZ(0)';
    }
  }

  this._element.style.webkitTransform = transform;
  this._element.style.transform = transform;
};

Scroller.prototype.isScrolling = function () {
  return this._scrolling || this._snapping;
};
// CONCATENATED MODULE: ./src/core/view/mixins/scroller/index.js

/* harmony default export */ var scroller = __webpack_exports__["a"] = ({
  methods: {
    initScroller: function initScroller(element, options) {
      this._touchInfo = {
        trackingID: -1,
        maxDy: 0,
        maxDx: 0
      };
      this._scroller = new Scroller(element, options);
      this.__handleTouchStart = this._handleTouchStart.bind(this);
      this.__handleTouchMove = this._handleTouchMove.bind(this);
      this.__handleTouchEnd = this._handleTouchEnd.bind(this);
      this._initedScroller = true;
    },
    _findDelta: function _findDelta(event) {
      var touchInfo = this._touchInfo;
      return event.detail.state === 'move' || event.detail.state === 'end' ? {
        x: event.detail.dx,
        y: event.detail.dy
      } : {
        x: event.screenX - touchInfo.x,
        y: event.screenY - touchInfo.y
      };
    },
    _handleTouchStart: function _handleTouchStart(e) {
      var t = this._touchInfo;
      var n = this._scroller;

      if (n) {
        if (e.detail.state === 'start') {
          t.trackingID = 'touch';
          t.x = e.detail.x;
          t.y = e.detail.y;
        } else {
          t.trackingID = 'mouse';
          t.x = e.screenX;
          t.y = e.screenY;
        }

        t.maxDx = 0;
        t.maxDy = 0;
        t.historyX = [0];
        t.historyY = [0];
        t.historyTime = [e.detail.timeStamp];
        t.listener = n;

        if (n.onTouchStart) {
          n.onTouchStart();
        }
      }
    },
    _handleTouchMove: function _handleTouchMove(event) {
      var touchInfo = this._touchInfo;

      if (touchInfo.trackingID !== -1) {
        event.preventDefault();

        var delta = this._findDelta(event);

        if (delta) {
          for (touchInfo.maxDy = Math.max(touchInfo.maxDy, Math.abs(delta.y)), touchInfo.maxDx = Math.max(touchInfo.maxDx, Math.abs(delta.x)), touchInfo.historyX.push(delta.x), touchInfo.historyY.push(delta.y), touchInfo.historyTime.push(event.detail.timeStamp); touchInfo.historyTime.length > 10;) {
            touchInfo.historyTime.shift();
            touchInfo.historyX.shift();
            touchInfo.historyY.shift();
          }

          if (touchInfo.listener && touchInfo.listener.onTouchMove) {
            touchInfo.listener.onTouchMove(delta.x, delta.y, event.detail.timeStamp);
          }
        }
      }
    },
    _handleTouchEnd: function _handleTouchEnd(event) {
      var touchInfo = this._touchInfo;

      if (touchInfo.trackingID !== -1) {
        event.preventDefault();

        var delta = this._findDelta(event);

        if (delta) {
          var listener = touchInfo.listener;
          touchInfo.trackingID = -1;
          touchInfo.listener = null;
          var r = touchInfo.historyTime.length;
          var o = {
            x: 0,
            y: 0
          };

          if (r > 2) {
            for (var a = touchInfo.historyTime.length - 1, s = touchInfo.historyTime[a], l = touchInfo.historyX[a], c = touchInfo.historyY[a]; a > 0;) {
              a--;
              var u = touchInfo.historyTime[a];
              var d = s - u;

              if (d > 30 && d < 50) {
                o.x = (l - touchInfo.historyX[a]) / (d / 1e3);
                o.y = (c - touchInfo.historyY[a]) / (d / 1e3);
                break;
              }
            }
          }

          touchInfo.historyTime = [];
          touchInfo.historyX = [];
          touchInfo.historyY = [];

          if (listener && listener.onTouchEnd) {
            listener.onTouchEnd(delta.x, delta.y, o);
          }
        }
      }
    }
  }
});

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return pixelRatio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return wrapper; });
var pixelRatio = function () {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  var backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
  return (window.devicePixelRatio || 1) / backingStore;
}();

var forEach = function forEach(obj, func) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      func(obj[key], key);
    }
  }
};

var ratioArgs = {
  'fillRect': 'all',
  'clearRect': 'all',
  'strokeRect': 'all',
  'moveTo': 'all',
  'lineTo': 'all',
  'arc': [0, 1, 2],
  'arcTo': 'all',
  'bezierCurveTo': 'all',
  'isPointinPath': 'all',
  'isPointinStroke': 'all',
  'quadraticCurveTo': 'all',
  'rect': 'all',
  'translate': 'all',
  'createRadialGradient': 'all',
  'createLinearGradient': 'all',
  'setTransform': [4, 5]
};

if (pixelRatio !== 1) {
  var proto = CanvasRenderingContext2D.prototype;
  forEach(ratioArgs, function (value, key) {
    proto[key] = function (_super) {
      return function () {
        if (!this.__hidpi__) {
          return _super.apply(this, arguments);
        }

        var args = Array.prototype.slice.call(arguments);

        if (value === 'all') {
          args = args.map(function (a) {
            return a * pixelRatio;
          });
        } else if (Array.isArray(value)) {
          for (var i = 0; i < value.length; i++) {
            args[value[i]] *= pixelRatio;
          }
        }

        return _super.apply(this, args);
      };
    }(proto[key]);
  });

  proto.stroke = function (_super) {
    return function () {
      if (!this.__hidpi__) {
        return _super.apply(this, arguments);
      }

      this.lineWidth *= pixelRatio;

      _super.apply(this, arguments);

      this.lineWidth /= pixelRatio;
    };
  }(proto.stroke);

  proto.fillText = function (_super) {
    return function () {
      if (!this.__hidpi__) {
        return _super.apply(this, arguments);
      }

      var args = Array.prototype.slice.call(arguments);
      args[1] *= pixelRatio;
      args[2] *= pixelRatio;
      this.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function (w, m, u) {
        return m * pixelRatio + u;
      });

      _super.apply(this, args);

      this.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function (w, m, u) {
        return m / pixelRatio + u;
      });
    };
  }(proto.fillText);

  proto.strokeText = function (_super) {
    return function () {
      if (!this.__hidpi__) {
        return _super.apply(this, arguments);
      }

      var args = Array.prototype.slice.call(arguments);
      args[1] *= pixelRatio; // x

      args[2] *= pixelRatio; // y

      this.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function (w, m, u) {
        return m * pixelRatio + u;
      });

      _super.apply(this, args);

      this.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function (w, m, u) {
        return m / pixelRatio + u;
      });
    };
  }(proto.strokeText);

  proto.drawImageByCanvas = function (_super) {
    return function (canvas, srcx, srcy, srcw, srch, desx, desy, desw, desh, isScale) {
      if (!this.__hidpi__) {
        return _super.apply(this, arguments);
      }

      srcx *= pixelRatio;
      srcy *= pixelRatio;
      srcw *= pixelRatio;
      srch *= pixelRatio;
      desx *= pixelRatio;
      desy *= pixelRatio;
      desw = isScale ? desw * pixelRatio : desw;
      desh = isScale ? desh * pixelRatio : desh;

      _super.call(this, canvas, srcx, srcy, srcw, srch, desx, desy, desw, desh);
    };
  }(proto.drawImage);

  proto.drawImage = function (_super) {
    return function () {
      if (!this.__hidpi__) {
        return _super.apply(this, arguments);
      }

      this.scale(pixelRatio, pixelRatio);

      _super.apply(this, arguments);

      this.scale(1 / pixelRatio, 1 / pixelRatio);
    };
  }(proto.drawImage);
}

function wrapper(canvas) {
  canvas.width = canvas.offsetWidth * pixelRatio;
  canvas.height = canvas.offsetHeight * pixelRatio;
  canvas.getContext('2d').__hidpi__ = true;
}

/***/ }),
/* 47 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return requestComponentObserver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return destroyComponentObserver; });
/* harmony import */ var intersection_observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(64);
/* harmony import */ var intersection_observer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(intersection_observer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uni_helpers_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);



function getRect(rect) {
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width
  };
}

var intersectionObservers = {};
function requestComponentObserver(_ref, pageId) {
  var reqId = _ref.reqId,
      options = _ref.options;
  var pages = getCurrentPages();
  var pageVm = pages.find(function (page) {
    return page.$page.id === pageId;
  });

  if (!pageVm) {
    throw new Error("Not Found\uFF1APage[".concat(pageId, "]"));
  }

  var $el = pageVm.$el;
  var root = options.relativeToSelector ? $el.querySelector(options.relativeToSelector) : null;
  var intersectionObserver = intersectionObservers[reqId] = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entrie) {
      UniViewJSBridge.publishHandler('onRequestComponentObserver', {
        reqId: reqId,
        res: {
          intersectionRatio: entrie.intersectionRatio,
          intersectionRect: getRect(entrie.intersectionRect),
          boundingClientRect: getRect(entrie.boundingClientRect),
          relativeRect: getRect(entrie.rootBounds),
          time: Date.now(),
          dataset: Object(uni_helpers_index__WEBPACK_IMPORTED_MODULE_1__[/* normalizeDataset */ "b"])(entrie.target.dataset || {}),
          id: entrie.target.id
        }
      }, pageVm.$page.id);
    });
  }, {
    root: root,
    rootMargin: options.rootMargin,
    threshold: options.thresholds
  });

  if (options.observeAll) {
    intersectionObserver.USE_MUTATION_OBSERVER = true;
    Array.prototype.map.call($el.querySelectorAll(options.selector), function (el) {
      intersectionObserver.observe(el);
    });
  } else {
    intersectionObserver.USE_MUTATION_OBSERVER = false;
    intersectionObserver.observe($el.querySelector(options.selector));
  }
}
function destroyComponentObserver(_ref2) {
  var reqId = _ref2.reqId;
  var intersectionObserver = intersectionObservers[reqId];

  if (intersectionObserver) {
    intersectionObserver.disconnect();
    UniViewJSBridge.publishHandler('onRequestComponentObserver', {
      reqId: reqId,
      reqEnd: true
    });
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = ['uni-app', 'uni-tabbar', 'uni-page', 'uni-page-head', 'uni-page-wrapper', 'uni-page-body', 'uni-page-refresh', 'uni-actionsheet', 'uni-modal', 'uni-picker', 'uni-toast', 'uni-resize-sensor', 'uni-ad', 'uni-audio', 'uni-button', 'uni-camera', 'uni-canvas', 'uni-checkbox', 'uni-checkbox-group', 'uni-cover-image', 'uni-cover-view', 'uni-form', 'uni-functional-page-navigator', 'uni-icon', 'uni-image', 'uni-input', 'uni-label', 'uni-live-player', 'uni-live-pusher', 'uni-map', 'uni-movable-area', 'uni-movable-view', 'uni-navigator', 'uni-official-account', 'uni-open-data', 'uni-picker', 'uni-picker-view', 'uni-picker-view-column', 'uni-progress', 'uni-radio', 'uni-radio-group', 'uni-rich-text', 'uni-scroll-view', 'uni-slider', 'uni-swiper', 'uni-swiper-item', 'uni-switch', 'uni-text', 'uni-textarea', 'uni-video', 'uni-view', 'uni-web-view'];

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge, global) {/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var uni_core_view_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65);
/* harmony import */ var uni_core_view_index_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uni_core_view_index_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uni_platform_page_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41);
/* harmony import */ var uni_platform_view_framework_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42);
/* harmony import */ var uni_platform_view_framework_plugins_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(62);
/* harmony import */ var _view_api_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(53);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _view_api_js__WEBPACK_IMPORTED_MODULE_5__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _view_api_js__WEBPACK_IMPORTED_MODULE_5__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _view_api_js__WEBPACK_IMPORTED_MODULE_5__["c"]; });






global.UniViewJSBridge = {
  publishHandler: UniViewJSBridge.publishHandler,
  subscribeHandler: UniViewJSBridge.subscribeHandler
};
global.getCurrentPages = uni_platform_view_framework_page__WEBPACK_IMPORTED_MODULE_3__[/* getCurrentPages */ "a"];
global.__definePage = uni_platform_page_factory__WEBPACK_IMPORTED_MODULE_2__[/* definePage */ "a"];
global.Vue = vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"];
vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].use(uni_platform_view_framework_plugins_index__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]);

__webpack_require__(103);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3), __webpack_require__(47)))

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  created: function created() {
    var _this = this;

    this._addListeners(this.id); // 初始化监听


    this.$watch('id', function (newId, oldId) {
      // watch id
      _this._removeListeners(oldId, true);

      _this._addListeners(newId, true);
    });
  },
  beforeDestroy: function beforeDestroy() {
    // 销毁时移除
    this._removeListeners(this.id);
  },
  methods: {
    _addListeners: function _addListeners(id, watch) {
      var _this2 = this;

      if (watch && !id) {
        // id被置空
        return;
      }

      var listeners = this.$options.listeners;

      if (!Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isPlainObject */ "e"])(listeners)) {
        return;
      }

      Object.keys(listeners).forEach(function (name) {
        if (watch) {
          // watch id
          if (name.indexOf('@') !== 0 && name.indexOf('uni-') !== 0) {
            /* eslint-disable standard/computed-property-even-spacing */
            UniViewJSBridge.on("uni-".concat(name, "-").concat(_this2.$page.id, "-").concat(id), _this2[listeners[name]]);
          }
        } else {
          if (name.indexOf('@') === 0) {
            /* eslint-disable standard/computed-property-even-spacing */
            _this2.$on("uni-".concat(name.substr(1)), _this2[listeners[name]]);
          } else if (name.indexOf('uni-') === 0) {
            // 完全限定

            /* eslint-disable standard/computed-property-even-spacing */
            UniViewJSBridge.on(name, _this2[listeners[name]]);
          } else if (id) {
            // scoped

            /* eslint-disable standard/computed-property-even-spacing */
            UniViewJSBridge.on("uni-".concat(name, "-").concat(_this2.$page.id, "-").concat(id), _this2[listeners[name]]);
          }
        }
      });
    },
    _removeListeners: function _removeListeners(id, watch) {
      var _this3 = this;

      if (watch && !id) {
        // id之前不存在
        return;
      }

      var listeners = this.$options.listeners;

      if (!Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isPlainObject */ "e"])(listeners)) {
        return;
      }

      Object.keys(listeners).forEach(function (name) {
        if (watch) {
          // watch id
          if (name.indexOf('@') !== 0 && name.indexOf('uni-') !== 0) {
            /* eslint-disable standard/computed-property-even-spacing */
            UniViewJSBridge.off("uni-".concat(name, "-").concat(_this3.$page.id, "-").concat(id), _this3[listeners[name]]);
          }
        } else {
          if (name.indexOf('@') === 0) {
            /* eslint-disable standard/computed-property-even-spacing */
            _this3.$off("uni-".concat(name.substr(1)), _this3[listeners[name]]);
          } else if (name.indexOf('uni-') === 0) {
            // 完全限定

            /* eslint-disable standard/computed-property-even-spacing */
            UniViewJSBridge.off(name, _this3[listeners[name]]);
          } else if (id) {
            // scoped

            /* eslint-disable standard/computed-property-even-spacing */
            UniViewJSBridge.off("uni-".concat(name, "-").concat(_this3.$page.id, "-").concat(id), _this3[listeners[name]]);
          }
        }
      });
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = ({
  // 取消id的定义，某些组件（canvas）内不在props内定义id
  // props: {
  //   id: {
  //     type: String,
  //     default: ''
  //   }
  // },
  mounted: function mounted() {
    var _this = this;

    this._toggleListeners('subscribe', this.id); // 初始化监听


    this.$watch('id', function (newId, oldId) {
      // watch id
      _this._toggleListeners('unsubscribe', oldId, true);

      _this._toggleListeners('subscribe', newId, true);
    });
  },
  beforeDestroy: function beforeDestroy() {
    // 销毁时移除
    this._toggleListeners('unsubscribe', this.id);
  },
  methods: {
    _toggleListeners: function _toggleListeners(type, id, watch) {
      if (watch && !id) {
        // id被置空
        return;
      }

      if (!Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "d"])(this._handleSubscribe)) {
        return;
      } // 纠正VUniVideo等组件命名为Video


      UniViewJSBridge[type](this.$page.id + '-' + this.$options.name.replace(/VUni([A-Z])/, '$1').toLowerCase() + '-' + id, this._handleSubscribe);
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/core/service/api/base/upx2px.js
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {
  var _uni$getSystemInfoSyn = uni.getSystemInfoSync(),
      platform = _uni$getSystemInfoSyn.platform,
      pixelRatio = _uni$getSystemInfoSyn.pixelRatio,
      windowWidth = _uni$getSystemInfoSyn.windowWidth;

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);

  if (number === 0) {
    return 0;
  }

  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);

  if (result < 0) {
    result = -result;
  }

  result = Math.floor(result + EPS);

  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }

  return number < 0 ? -result : result;
}
// EXTERNAL MODULE: ./src/platforms/app-plus/helpers/get-window-offset.js
var get_window_offset = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/safe-area-insets/out/index.js
var out = __webpack_require__(6);
var out_default = /*#__PURE__*/__webpack_require__.n(out);

// CONCATENATED MODULE: ./src/platforms/h5/service/api/device/get-system-info.js


var ua = navigator.userAgent;
/**
 * 是否安卓设备
 */

var isAndroid = /android/i.test(ua);
/**
 * 是否iOS设备
 */

var get_system_info_isIOS = /iphone|ipad|ipod/i.test(ua);
/**
 * 获取系统信息-同步
 */

function getSystemInfoSync() {
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var screen = window.screen;
  var pixelRatio = window.devicePixelRatio;
  var screenWidth = screen.width;
  var screenHeight = screen.height;
  var language = navigator.language;
  var statusBarHeight = 0;
  var osname;
  var osversion;
  var model;

  if (get_system_info_isIOS) {
    osname = 'iOS';
    var osversionFind = ua.match(/OS\s([\w_]+)\slike/);

    if (osversionFind) {
      osversion = osversionFind[1].replace(/_/g, '.');
    }

    var modelFind = ua.match(/\(([a-zA-Z]+);/);

    if (modelFind) {
      model = modelFind[1];
    }
  } else if (isAndroid) {
    osname = 'Android'; // eslint-disable-next-line no-useless-escape

    var _osversionFind = ua.match(/Android[\s/]([\w\.]+)[;\s]/);

    if (_osversionFind) {
      osversion = _osversionFind[1];
    }

    var infoFind = ua.match(/\((.+?)\)/);
    var infos = infoFind ? infoFind[1].split(';') : ua.split(' '); // eslint-disable-next-line no-useless-escape

    var otherInfo = [/\bAndroid\b/i, /\bLinux\b/i, /\bU\b/i, /^\s?[a-z][a-z]$/i, /^\s?[a-z][a-z]-[a-z][a-z]$/i, /\bwv\b/i, /\/[\d\.,]+$/, /^\s?[\d\.,]+$/, /\bBrowser\b/i, /\bMobile\b/i];

    for (var i = 0; i < infos.length; i++) {
      var info = infos[i];

      if (info.indexOf('Build') > 0) {
        model = info.split('Build')[0].trim();
        break;
      }

      var other = void 0;

      for (var o = 0; o < otherInfo.length; o++) {
        if (otherInfo[o].test(info)) {
          other = true;
          break;
        }
      }

      if (!other) {
        model = info.trim();
        break;
      }
    }
  } else {
    osname = 'Other';
    osversion = '0';
  }

  var system = "".concat(osname, " ").concat(osversion);
  var platform = osname.toLocaleLowerCase();
  var safeArea = {
    left: out_default.a.left,
    right: windowWidth - out_default.a.right,
    top: out_default.a.top,
    bottom: windowHeight - out_default.a.bottom,
    width: windowWidth - out_default.a.left - out_default.a.right,
    height: windowHeight - out_default.a.top - out_default.a.bottom
  };

  var _getWindowOffset = Object(get_window_offset["a" /* default */])(),
      windowTop = _getWindowOffset.top,
      windowBottom = _getWindowOffset.bottom;

  windowHeight -= windowTop;
  windowHeight -= windowBottom;
  return {
    windowTop: windowTop,
    windowBottom: windowBottom,
    windowWidth: windowWidth,
    windowHeight: windowHeight,
    pixelRatio: pixelRatio,
    screenWidth: screenWidth,
    screenHeight: screenHeight,
    language: language,
    statusBarHeight: statusBarHeight,
    system: system,
    platform: platform,
    model: model,
    safeArea: safeArea
  };
}
/**
 * 获取系统信息-异步
 */

function getSystemInfo() {
  return getSystemInfoSync();
}
// CONCATENATED MODULE: ./lib/app-plus/view-api.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return canIUse; });
/* concated harmony reexport upx2px */__webpack_require__.d(__webpack_exports__, "c", function() { return upx2px; });
/* concated harmony reexport getSystemInfoSync */__webpack_require__.d(__webpack_exports__, "b", function() { return getSystemInfoSync; });


function canIUse(schema) {
  if (schema === 'css.var') {
    return window.CSS && window.CSS.supports && window.CSS.supports('--a', 0);
  }

  return true;
}

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* unused harmony export disableScroll */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return pageScrollTo; });
/* unused harmony export createScrollListener */
/* harmony import */ var uni_platform_view_bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);

function disableScroll(evt) {
  evt.preventDefault();
}
function pageScrollTo(_ref) {
  var scrollTop = _ref.scrollTop,
      duration = _ref.duration;
  var documentElement = document.documentElement;
  var clientHeight = documentElement.clientHeight,
      scrollHeight = documentElement.scrollHeight;
  scrollTop = Math.min(scrollTop, scrollHeight - clientHeight);

  if (duration === 0) {
    // 部分浏览器（比如微信）中 scrollTop 的值需要通过 document.body 来控制
    documentElement.scrollTop = document.body.scrollTop = scrollTop;
    return;
  }

  if (window.scrollY === scrollTop) {
    return;
  }

  function scrollTo(duration) {
    if (duration <= 0) {
      window.scrollTo(0, scrollTop);
      return;
    }

    var distaince = scrollTop - window.scrollY;
    requestAnimationFrame(function () {
      window.scrollTo(0, window.scrollY + distaince / duration * 10);
      scrollTo(duration - 10);
    });
  }

  scrollTo(duration); //  TODO 暂不使用 transform 会导致 fixed 元素不可见
  // 	const body = document.body
  // 	const bodyStyle = body.style
  //
  // 	function webkitTransitionEnd() {
  // 		bodyStyle.webkitTransition = ''
  // 		bodyStyle.webkitTransform = ''
  // 		documentElement.scrollTop = scrollTop
  // 		body.removeEventListener('webkitTransitionEnd', webkitTransitionEnd)
  // 	}
  //
  // 	body.addEventListener('webkitTransitionEnd', webkitTransitionEnd)
  // 	bodyStyle.webkitTransition = `-webkit-transform ${duration}ms ease-out`
  // 	bodyStyle.webkitTransform = `translateY(${documentElement.scrollTop}px) translateZ(0)`
}
function createScrollListener(pageId, _ref2) {
  var enablePageScroll = _ref2.enablePageScroll,
      enablePageReachBottom = _ref2.enablePageReachBottom,
      onReachBottomDistance = _ref2.onReachBottomDistance,
      enableTransparentTitleNView = _ref2.enableTransparentTitleNView;
  var ticking = false;
  var hasReachBottom = false;
  var onReachBottom = true;

  function isReachBottom() {
    var _document$documentEle = document.documentElement,
        clientHeight = _document$documentEle.clientHeight,
        scrollHeight = _document$documentEle.scrollHeight;
    var scrollY = window.scrollY;
    var isBottom = scrollY > 0 && scrollHeight > clientHeight && scrollY + clientHeight + onReachBottomDistance >= scrollHeight;

    if (isBottom && !hasReachBottom) {
      hasReachBottom = true;
      return true;
    }

    if (!isBottom && hasReachBottom) {
      hasReachBottom = false;
    }

    return false;
  }

  function trigger() {
    var pages = getCurrentPages();

    if (!pages.length || pages[pages.length - 1].$page.id !== pageId) {
      return;
    } // publish


    var scrollTop = window.pageYOffset;

    if (enablePageScroll) {
      // 向 Service 发送 onPageScroll 事件
      Object(uni_platform_view_bridge__WEBPACK_IMPORTED_MODULE_0__[/* publishHandler */ "a"])('onPageScroll', {
        scrollTop: scrollTop
      }, pageId);
    }

    if (enableTransparentTitleNView) {
      UniViewJSBridge.emit('onPageScroll', {
        scrollTop: scrollTop
      });
    }

    if (enablePageReachBottom && onReachBottom && isReachBottom()) {
      Object(uni_platform_view_bridge__WEBPACK_IMPORTED_MODULE_0__[/* publishHandler */ "a"])('onReachBottom', {}, pageId);
      onReachBottom = false;
      setTimeout(function () {
        onReachBottom = true;
      }, 350);
    }

    ticking = false;
  }

  return function onScroll() {
    if (!ticking) {
      requestAnimationFrame(trigger);
    }

    ticking = true;
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return requestComponentInfo; });
/* harmony import */ var uni_helpers_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var uni_platform_helpers_get_window_offset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);



function getRootInfo(fields) {
  var info = {};

  if (fields.id) {
    info.id = '';
  }

  if (fields.dataset) {
    info.dataset = {};
  }

  if (fields.rect) {
    info.left = 0;
    info.right = 0;
    info.top = 0;
    info.bottom = 0;
  }

  if (fields.size) {
    info.width = document.documentElement.clientWidth;
    info.height = document.documentElement.clientHeight;
  }

  if (fields.scrollOffset) {
    info.scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    info.scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  return info;
}

function getNodeInfo(el, fields) {
  var info = {};

  var _getWindowOffset = Object(uni_platform_helpers_get_window_offset__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(),
      top = _getWindowOffset.top;

  if (fields.id) {
    info.id = el.id;
  }

  if (fields.dataset) {
    info.dataset = Object(uni_helpers_index__WEBPACK_IMPORTED_MODULE_0__[/* normalizeDataset */ "b"])(el.dataset || {});
  }

  if (fields.rect || fields.size) {
    var rect = el.getBoundingClientRect();

    if (fields.rect) {
      info.left = rect.left;
      info.right = rect.right;
      info.top = rect.top - top;
      info.bottom = rect.bottom;
    }

    if (fields.size) {
      info.width = rect.width;
      info.height = rect.height;
    }
  } // TODO 组件 props


  if (fields.properties) {
    fields.properties.forEach(function (prop) {
      prop = prop.replace(/-([a-z])/g, function (e, t) {
        return t.toUpperCase();
      }); // props
    });
  }

  if (fields.scrollOffset) {
    if (el.tagName === 'UNI-SCROLL-VIEW' && el.__vue__ && el.__vue__.getScrollPosition) {
      Object.assign(info, el.__vue__.getScrollPosition());
    } else {
      info.scrollLeft = 0;
      info.scrollTop = 0;
    }
  }

  return info;
}

function getNodesInfo(pageVm, component, selector, single, fields) {
  /* eslint-disable no-mixed-operators */
  var $el = component && component.$el || pageVm.$el;

  if (single) {
    var node = $el && ($el.matches(selector) ? $el : $el.querySelector(selector));

    if (node) {
      return getNodeInfo(node, fields);
    }

    return null;
  } else if (!$el) {
    return [];
  } else {
    var infos = [];
    var nodeList = $el.querySelectorAll(selector);

    if (nodeList && nodeList.length) {
      infos = [].map.call(nodeList, function (node) {
        return getNodeInfo(node, fields);
      });
    }

    if ($el.matches(selector)) {
      infos.unshift($el);
    }

    return infos;
  }
}

function requestComponentInfo(_ref, pageId) {
  var reqId = _ref.reqId,
      reqs = _ref.reqs;
  var pages = getCurrentPages(); // 跨平台时，View 层也应该实现该方法，举例 App 上，View 层的 getCurrentPages 返回长度为1的当前页面数组

  var pageVm = pages.find(function (page) {
    return page.$page.id === pageId;
  });

  if (!pageVm) {
    // TODO 是否需要 defer
    throw new Error("Not Found\uFF1APage[".concat(pageId, "]"));
  }

  var result = [];
  reqs.forEach(function (_ref2) {
    var component = _ref2.component,
        selector = _ref2.selector,
        single = _ref2.single,
        fields = _ref2.fields;

    if (component === 0) {
      result.push(getRootInfo(fields));
    } else {
      result.push(getNodesInfo(pageVm, component, selector, single, fields));
    }
  });
  UniViewJSBridge.publishHandler('onRequestComponentInfo', {
    reqId: reqId,
    res: result
  }, pageVm.$page.id);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony import */ var uni_helpers_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _behaviors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61);
/* harmony import */ var _wxs_component_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(57);





function pageMounted() {
  // 通知 Service，View 层已 ready
  UniViewJSBridge.publishHandler('onPageReady', {}, this.$page.id);
}
/**
 * View 层 Vue 插件
 * 1.init events
 * 2.$trigger
 * 3.$handleProxy
 */


/* harmony default export */ __webpack_exports__["a"] = ({
  install: function install(Vue) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        routes = _ref.routes;

    Object(_events__WEBPACK_IMPORTED_MODULE_1__[/* initEvents */ "a"])();

    var findUniTarget = function findUniTarget($event, $el) {
      var target = $event.target;

      for (; target && target !== $el; target = target.parentNode) {
        if (target.tagName && target.tagName.indexOf('UNI-') === 0) {
          break;
        }
      }

      return target;
    };

    Vue.prototype.$handleEvent = function ($event) {
      if ($event instanceof Event) {
        // 未处理的 event 对象 需要对 target 校正及包装
        // 查找 uniTarget
        var target = findUniTarget($event, this.$el);
        $event = _events__WEBPACK_IMPORTED_MODULE_1__[/* processEvent */ "b"].call(this, $event.type, $event, {}, target || $event.target, $event.currentTarget);
      }

      return $event;
    };

    Vue.prototype.$getComponentDescriptor = function (vm) {
      return Object(_wxs_component_descriptor__WEBPACK_IMPORTED_MODULE_3__[/* createComponentDescriptor */ "a"])(vm || this);
    };

    Vue.prototype.$handleWxsEvent = function ($event) {
      if ($event instanceof Event) {
        // 未处理的 event 对象 需要对 target 校正及包装
        var currentTarget = $event.currentTarget;

        var instance = currentTarget && currentTarget.__vue__ && currentTarget.__vue__.$getComponentDescriptor();

        $event = _events__WEBPACK_IMPORTED_MODULE_1__[/* processEvent */ "b"].call(this, $event.type, $event, {}, findUniTarget($event, this.$el) || $event.target, $event.currentTarget);
        $event.instance = instance;
      }

      return $event;
    };

    Vue.mixin({
      beforeCreate: function beforeCreate() {
        var _this = this;

        var options = this.$options;
        var wxs = options.wxs;

        if (wxs) {
          Object.keys(wxs).forEach(function (module) {
            _this[module] = wxs[module];
          });
        }

        if (options.behaviors && options.behaviors.length) {
          Object(_behaviors__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(options, this);
        }

        if (Object(uni_helpers_index__WEBPACK_IMPORTED_MODULE_0__[/* isPage */ "a"])(this)) {
          options.mounted = options.mounted ? [].concat(pageMounted, options.mounted) : [pageMounted];
        }
      }
    }); // TODO 跨平台时，View 层需要注入$page属性
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createComponentDescriptor; });
/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var CLASS_RE = /^\s+|\s+$/g;
var WXS_CLASS_RE = /\s+/;

function getWxsClsArr(clsArr, classList, isAdd) {
  var wxsClsArr = [];

  var _checkClassList = function checkClassList(cls) {
    if (isAdd) {
      _checkClassList = function checkClassList(cls) {
        return !classList.contains(cls);
      };
    } else {
      _checkClassList = function checkClassList(cls) {
        return classList.contains(cls);
      };
    }

    return _checkClassList(cls);
  };

  clsArr.forEach(function (cls) {
    cls = cls.replace(CLASS_RE, '');
    _checkClassList(cls) && wxsClsArr.push(cls);
  });
  return wxsClsArr;
}

function parseStyleText(cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
}

var ComponentDescriptor =
/*#__PURE__*/
function () {
  function ComponentDescriptor(vm) {
    _classCallCheck(this, ComponentDescriptor);

    this.$vm = vm;
    this.$el = vm.$el;
  }

  _createClass(ComponentDescriptor, [{
    key: "selectComponent",
    value: function selectComponent(selector) {
      if (!this.$el || !selector) {
        return;
      }

      var el = this.$el.querySelector(selector);
      return el && el.__vue__ && createComponentDescriptor(el.__vue__);
    }
  }, {
    key: "selectAllComponents",
    value: function selectAllComponents(selector) {
      if (!this.$el || !selector) {
        return [];
      }

      var descriptors = [];
      this.$el.querySelectorAll(selector).forEach(function (el) {
        el.__vue__ && descriptors.push(createComponentDescriptor(el.__vue__));
      });
      return descriptors;
    }
  }, {
    key: "setStyle",
    value: function setStyle(style) {
      if (!this.$el || !style) {
        return this;
      }

      if (typeof style === 'string') {
        style = parseStyleText(style);
      }

      if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isPlainObject */ "e"])(style)) {
        this.$el.__wxsStyle = style;
        this.$vm.$forceUpdate();
      }

      return this;
    }
  }, {
    key: "addClass",
    value: function addClass() {
      for (var _len = arguments.length, clsArr = new Array(_len), _key = 0; _key < _len; _key++) {
        clsArr[_key] = arguments[_key];
      }

      if (!this.$el || !clsArr.length) {
        return this;
      }

      var wxsClsArr = getWxsClsArr(clsArr, this.$el.classList, true);

      if (wxsClsArr.length) {
        var wxsClass = this.$el.__wxsAddClass || '';
        this.$el.__wxsAddClass = wxsClass + (wxsClass ? ' ' : '') + wxsClsArr.join(' ');
        this.$vm.$forceUpdate();
      }

      return this;
    }
  }, {
    key: "removeClass",
    value: function removeClass() {
      for (var _len2 = arguments.length, clsArr = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        clsArr[_key2] = arguments[_key2];
      }

      if (!this.$el || !clsArr.length) {
        return this;
      }

      var classList = this.$el.classList;
      var addWxsClsArr = this.$el.__wxsAddClass ? this.$el.__wxsAddClass.split(WXS_CLASS_RE) : [];
      var wxsClsArr = getWxsClsArr(clsArr, classList, false);

      if (wxsClsArr.length) {
        var removeWxsClsArr = [];
        wxsClsArr.forEach(function (cls) {
          var clsIndex = addWxsClsArr.findIndex(function (oldCls) {
            return oldCls === cls;
          });

          if (clsIndex !== -1) {
            // 在 addWxsClass 中
            addWxsClsArr.splice(clsIndex, 1);
          }

          removeWxsClsArr.push(cls);
        });
        this.$el.__wxsRemoveClass = removeWxsClsArr;
        this.$el.__wxsAddClass = addWxsClsArr.join(' ');
        this.$vm.$forceUpdate();
      }

      return this;
    }
  }, {
    key: "hasClass",
    value: function hasClass(cls) {
      return this.$el && this.$el.classList.contains(cls);
    }
  }, {
    key: "getDataset",
    value: function getDataset() {
      return this.$el && this.$el.dataset;
    }
  }, {
    key: "callMethod",
    value: function callMethod(funcName) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // TODO 需跨平台
      return this.$vm[funcName] && this.$vm[funcName](JSON.parse(JSON.stringify(args))), this;
    }
  }, {
    key: "requestAnimationFrame",
    value: function requestAnimationFrame(callback) {
      return global.requestAnimationFrame(callback), this;
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.$el && (this.$el.__wxsState || (this.$el.__wxsState = {}));
    }
  }, {
    key: "triggerEvent",
    value: function triggerEvent(eventName) {
      var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      // TODO options
      return this.$vm.$emit(eventName, detail), this;
    }
  }]);

  return ComponentDescriptor;
}();

function createComponentDescriptor(vm) {
  if (vm && vm.$options.name && vm.$options.name.indexOf('VUni') === 0) {
    // 内置组件需要使用父 vm
    vm = vm.$parent;
  }

  if (vm && vm.$el) {
    if (!vm.$el.__wxsComponentDescriptor) {
      vm.$el.__wxsComponentDescriptor = new ComponentDescriptor(vm);
    }

    return vm.$el.__wxsComponentDescriptor;
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(47)))

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initData; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _vdom_sync__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(59);
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42);
/* harmony import */ var _page_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(41);
var _handleData;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var vd;
var PageVueComponent;
var handleData = (_handleData = {}, _defineProperty(_handleData, _constants__WEBPACK_IMPORTED_MODULE_0__[/* PAGE_CREATE */ "c"], function onPageCreate(data) {
  var _data = _slicedToArray(data, 2),
      pageId = _data[0],
      pagePath = _data[1]; // 设置当前页面伪对象，方便其他地方使用 getCurrentPages 获取当前页面 id，route


  Object(_page__WEBPACK_IMPORTED_MODULE_2__[/* setCurrentPage */ "b"])(pageId, pagePath); // 初始化当前页面 VueComponent（生成页面样式代码）

  PageVueComponent = Object(_page_factory__WEBPACK_IMPORTED_MODULE_3__[/* getPageVueComponent */ "b"])(pagePath); // 生成当前页面 vd

  vd = new _vdom_sync__WEBPACK_IMPORTED_MODULE_1__[/* VDomSync */ "a"](pageId);
}), _defineProperty(_handleData, _constants__WEBPACK_IMPORTED_MODULE_0__[/* MOUNTED_DATA */ "b"], function onMounted(data) {
  vd.addVData.apply(vd, data);
}), _defineProperty(_handleData, _constants__WEBPACK_IMPORTED_MODULE_0__[/* UPDATED_DATA */ "e"], function onUpdated(data) {
  vd.updateVData.apply(vd, data);
}), _defineProperty(_handleData, _constants__WEBPACK_IMPORTED_MODULE_0__[/* PAGE_CREATED */ "d"], function onPageCreated(data) {
  var _data2 = _slicedToArray(data, 2),
      pageId = _data2[0],
      pagePath = _data2[1];

  new PageVueComponent({
    mpType: 'page',
    pageId: pageId,
    pagePath: pagePath
  }).$mount('#app');
}), _handleData);

function vdSync(_ref) {
  var data = _ref.data,
      options = _ref.options;
  data.forEach(function (data) {
    handleData[data[0]](data[1]);
  });
  vd.flush();
}

function initData(Vue) {
  UniViewJSBridge.subscribe('vdSync', vdSync);
  Object.defineProperty(Vue.prototype, '_$vd', {
    get: function get() {
      return !this.$options.isReserved && vd;
    }
  });
  Vue.mixin({
    beforeCreate: function beforeCreate() {
      if (this.$options.mpType) {
        this.mpType = this.$options.mpType;
      }

      if (this._$vd) {
        this._$vd.initVm(this);

        console.log("[".concat(this._$id, "] beforeCreate ") + Date.now());
      }
    }
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VDomSync; });
/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var VDomSync =
/*#__PURE__*/
function () {
  function VDomSync(pageId) {
    _classCallCheck(this, VDomSync);

    this.pageId = pageId;
    this.addVDatas = [];
    this.updateVDatas = [];
    this.vms = Object.create(null);
  }

  _createClass(VDomSync, [{
    key: "addVData",
    value: function addVData(nodeId) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.addVDatas.push([nodeId, data]);
    }
  }, {
    key: "updateVData",
    value: function updateVData(nodeId) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.updateVDatas.push([nodeId, data]);
    }
  }, {
    key: "initVm",
    value: function initVm(vm) {
      var _this$addVDatas$pop = this.addVDatas.pop(),
          _this$addVDatas$pop2 = _slicedToArray(_this$addVDatas$pop, 2),
          nodeId = _this$addVDatas$pop2[0],
          data = _this$addVDatas$pop2[1];

      if (!nodeId) {
        vm._$id = Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* guid */ "b"])();
        console.error('nodeId unmatched', vm);
      } else {
        vm._$id = nodeId;
      }

      vm.$r = data || Object.create(null);
      this.vms[vm._$id] = vm;
    }
  }, {
    key: "flush",
    value: function flush() {
      var _this = this;

      console.log('update....', this.addVDatas, this.updateVDatas);
      this.updateVDatas.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            nodeId = _ref2[0],
            data = _ref2[1];

        var vm = _this.vms[nodeId];

        if (!vm) {
          return console.error("Not found ".concat(nodeId));
        }

        Object.assign(vm.$r, data);
        vm.$forceUpdate();
      });
      this.updateVDatas.length = 0;
    }
  }]);

  return VDomSync;
}();

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initEvent; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

function initEvent(Vue) {
  Vue.prototype.$handleViewEvent = function ($vueEvent, options) {
    var $event = this.$handleEvent($vueEvent);
    var cid = this._$id;
    var nid = $event.options.nid;

    if (!nid) {
      return console.error("[".concat(cid, "] nid not found"));
    } // 移除无用属性


    delete $event._processed;
    delete $event.mp;
    delete $event.preventDefault;
    delete $event.stopPropagation;
    delete $event.options;
    UniViewJSBridge.publishHandler(_constants__WEBPACK_IMPORTED_MODULE_0__[/* WEBVIEW_UI_EVENT */ "f"], {
      data: $event,
      options: {
        cid: cid,
        nid: nid
      }
    });
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./src/shared/index.js + 4 modules
var shared = __webpack_require__(2);

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__(1);

// CONCATENATED MODULE: ./src/core/view/plugins/behaviors/form-field.js
/**
 * uni://form-field
 */



function created() {
  this.$dispatch('Form', 'uni-form-group-update', {
    type: 'add',
    vm: this
  });
}

function beforeDestroy() {
  this.$dispatch('Form', 'uni-form-group-update', {
    type: 'remove',
    vm: this
  });
}

/* harmony default export */ var form_field = ({
  name: 'uni://form-field',
  init: function init(options, vm) {
    if (!vm.constructor.options.props || !vm.constructor.options.props.name || !vm.constructor.options.props.value) {
      // 未初始化 props
      if (!vm.constructor.options.props) {
        vm.constructor.options.props = {};
      }

      if (!vm.constructor.options.props.name) {
        vm.constructor.options.props.name = options.props.name = {
          type: String
        };
      }

      if (!vm.constructor.options.props.value) {
        vm.constructor.options.props.value = options.props.value = {
          type: null
        };
      }
    }

    if (!options.propsData) {
      options.propsData = {};
    }

    var $vnode = vm.$vnode;

    if ($vnode && $vnode.data && $vnode.data.attrs) {
      if (Object(shared["c" /* hasOwn */])($vnode.data.attrs, 'name')) {
        options.propsData.name = $vnode.data.attrs.name;
      }

      if (Object(shared["c" /* hasOwn */])($vnode.data.attrs, 'value')) {
        options.propsData.value = $vnode.data.attrs.value;
      }
    }

    if (!vm.constructor.options.methods || !vm.constructor.options.methods._getFormData) {
      // 未初始化 methods
      if (!vm.constructor.options.methods) {
        vm.constructor.options.methods = {};
      }

      if (!options.methods) {
        options.methods = {};
      }

      var formMethods = {
        _getFormData: function _getFormData() {
          return this.name ? {
            key: this.name,
            value: this.value
          } : {};
        },
        _resetFormData: function _resetFormData() {
          this.value = '';
        }
      };
      Object.assign(vm.constructor.options.methods, formMethods);
      Object.assign(options.methods, formMethods); // add $dispatch

      Object.assign(vm.constructor.options.methods, mixins["a" /* emitter */].methods);
      Object.assign(options.methods, mixins["a" /* emitter */].methods);
      var createdHooks = options['created'];
      vm.constructor.options['created'] = options['created'] = createdHooks ? [].concat(created, createdHooks) : [created];
      var beforeDestroyHooks = options['beforeDestroy'];
      vm.constructor.options['beforeDestroy'] = options['beforeDestroy'] = beforeDestroyHooks ? [].concat(beforeDestroy, beforeDestroyHooks) : [beforeDestroy];
    }
  }
});
// CONCATENATED MODULE: ./src/core/view/plugins/behaviors/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initBehaviors; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var behaviors = _defineProperty({}, form_field.name, form_field);

function initBehaviors(options, vm) {
  options.behaviors.forEach(function (name) {
    var behavior = behaviors[name];
    behavior && behavior.init(options, vm);
  });
}

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./src/core/helpers/tags.js
var tags = __webpack_require__(49);
var tags_default = /*#__PURE__*/__webpack_require__.n(tags);

// CONCATENATED MODULE: ./src/core/vue.js
// 使用白名单过滤（前期有一批自定义组件使用了 uni-）

function initVue(Vue) {
  var oldIsReservedTag = Vue.config.isReservedTag;

  Vue.config.isReservedTag = function (tag) {
    return tags_default.a.indexOf(tag) !== -1 || oldIsReservedTag(tag);
  };

  Vue.config.ignoredElements = tags_default.a;
  var oldGetTagNamespace = Vue.config.getTagNamespace;
  var conflictTags = ['switch', 'image', 'text', 'view'];

  Vue.config.getTagNamespace = function (tag) {
    if (~conflictTags.indexOf(tag)) {
      // svg 部分标签名称与 uni 标签冲突
      return false;
    }

    return oldGetTagNamespace(tag) || false;
  };
}
// EXTERNAL MODULE: ./src/core/view/plugins/index.js
var plugins = __webpack_require__(56);

// EXTERNAL MODULE: ./src/platforms/app-plus/view/framework/plugins/data.js
var data = __webpack_require__(58);

// EXTERNAL MODULE: ./src/platforms/app-plus/view/framework/plugins/event.js
var plugins_event = __webpack_require__(60);

// CONCATENATED MODULE: ./src/platforms/app-plus/view/framework/plugins/index.js




/* harmony default export */ var framework_plugins = __webpack_exports__["a"] = ({
  install: function install(Vue, options) {
    if (true) {
      Vue.config.performance = true;
    }

    initVue(Vue);
    plugins["a" /* default */].install(Vue, options);
    Object(data["a" /* initData */])(Vue);
    Object(plugins_event["a" /* initEvent */])(Vue);
  }
});

/***/ }),
/* 63 */
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),
/* 64 */
/***/ (function(module, exports) {

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */
(function() {
'use strict';

// Exit early if we're not running in a browser.
if (typeof window !== 'object') {
  return;
}

// Exit early if all IntersectionObserver and IntersectionObserverEntry
// features are natively supported.
if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

  // Minimal polyfill for Edge 15's lack of `isIntersecting`
  // See: https://github.com/w3c/IntersectionObserver/issues/211
  if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
    Object.defineProperty(window.IntersectionObserverEntry.prototype,
      'isIntersecting', {
      get: function () {
        return this.intersectionRatio > 0;
      }
    });
  }
  return;
}


/**
 * A local reference to the document.
 */
var document = window.document;


/**
 * An IntersectionObserver registry. This registry exists to hold a strong
 * reference to IntersectionObserver instances currently observing a target
 * element. Without this registry, instances without another reference may be
 * garbage collected.
 */
var registry = [];


/**
 * Creates the global IntersectionObserverEntry constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
 * @param {Object} entry A dictionary of instance properties.
 * @constructor
 */
function IntersectionObserverEntry(entry) {
  this.time = entry.time;
  this.target = entry.target;
  this.rootBounds = entry.rootBounds;
  this.boundingClientRect = entry.boundingClientRect;
  this.intersectionRect = entry.intersectionRect || getEmptyRect();
  this.isIntersecting = !!entry.intersectionRect;

  // Calculates the intersection ratio.
  var targetRect = this.boundingClientRect;
  var targetArea = targetRect.width * targetRect.height;
  var intersectionRect = this.intersectionRect;
  var intersectionArea = intersectionRect.width * intersectionRect.height;

  // Sets intersection ratio.
  if (targetArea) {
    // Round the intersection ratio to avoid floating point math issues:
    // https://github.com/w3c/IntersectionObserver/issues/324
    this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
  } else {
    // If area is zero and is intersecting, sets to 1, otherwise to 0
    this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
}


/**
 * Creates the global IntersectionObserver constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
 * @param {Function} callback The function to be invoked after intersection
 *     changes have queued. The function is not invoked if the queue has
 *     been emptied by calling the `takeRecords` method.
 * @param {Object=} opt_options Optional configuration options.
 * @constructor
 */
function IntersectionObserver(callback, opt_options) {

  var options = opt_options || {};

  if (typeof callback != 'function') {
    throw new Error('callback must be a function');
  }

  if (options.root && options.root.nodeType != 1) {
    throw new Error('root must be an Element');
  }

  // Binds and throttles `this._checkForIntersections`.
  this._checkForIntersections = throttle(
      this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

  // Private properties.
  this._callback = callback;
  this._observationTargets = [];
  this._queuedEntries = [];
  this._rootMarginValues = this._parseRootMargin(options.rootMargin);

  // Public properties.
  this.thresholds = this._initThresholds(options.threshold);
  this.root = options.root || null;
  this.rootMargin = this._rootMarginValues.map(function(margin) {
    return margin.value + margin.unit;
  }).join(' ');
}


/**
 * The minimum interval within which the document will be checked for
 * intersection changes.
 */
IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;


/**
 * The frequency in which the polyfill polls for intersection changes.
 * this can be updated on a per instance basis and must be set prior to
 * calling `observe` on the first target.
 */
IntersectionObserver.prototype.POLL_INTERVAL = null;

/**
 * Use a mutation observer on the root element
 * to detect intersection changes.
 */
IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;


/**
 * Starts observing a target element for intersection changes based on
 * the thresholds values.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.observe = function(target) {
  var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
    return item.element == target;
  });

  if (isTargetAlreadyObserved) {
    return;
  }

  if (!(target && target.nodeType == 1)) {
    throw new Error('target must be an Element');
  }

  this._registerInstance();
  this._observationTargets.push({element: target, entry: null});
  this._monitorIntersections();
  this._checkForIntersections();
};


/**
 * Stops observing a target element for intersection changes.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.unobserve = function(target) {
  this._observationTargets =
      this._observationTargets.filter(function(item) {

    return item.element != target;
  });
  if (!this._observationTargets.length) {
    this._unmonitorIntersections();
    this._unregisterInstance();
  }
};


/**
 * Stops observing all target elements for intersection changes.
 */
IntersectionObserver.prototype.disconnect = function() {
  this._observationTargets = [];
  this._unmonitorIntersections();
  this._unregisterInstance();
};


/**
 * Returns any queue entries that have not yet been reported to the
 * callback and clears the queue. This can be used in conjunction with the
 * callback to obtain the absolute most up-to-date intersection information.
 * @return {Array} The currently queued entries.
 */
IntersectionObserver.prototype.takeRecords = function() {
  var records = this._queuedEntries.slice();
  this._queuedEntries = [];
  return records;
};


/**
 * Accepts the threshold value from the user configuration object and
 * returns a sorted array of unique threshold values. If a value is not
 * between 0 and 1 and error is thrown.
 * @private
 * @param {Array|number=} opt_threshold An optional threshold value or
 *     a list of threshold values, defaulting to [0].
 * @return {Array} A sorted list of unique and valid threshold values.
 */
IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
  var threshold = opt_threshold || [0];
  if (!Array.isArray(threshold)) threshold = [threshold];

  return threshold.sort().filter(function(t, i, a) {
    if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
      throw new Error('threshold must be a number between 0 and 1 inclusively');
    }
    return t !== a[i - 1];
  });
};


/**
 * Accepts the rootMargin value from the user configuration object
 * and returns an array of the four margin values as an object containing
 * the value and unit properties. If any of the values are not properly
 * formatted or use a unit other than px or %, and error is thrown.
 * @private
 * @param {string=} opt_rootMargin An optional rootMargin value,
 *     defaulting to '0px'.
 * @return {Array<Object>} An array of margin objects with the keys
 *     value and unit.
 */
IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
  var marginString = opt_rootMargin || '0px';
  var margins = marginString.split(/\s+/).map(function(margin) {
    var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
    if (!parts) {
      throw new Error('rootMargin must be specified in pixels or percent');
    }
    return {value: parseFloat(parts[1]), unit: parts[2]};
  });

  // Handles shorthand.
  margins[1] = margins[1] || margins[0];
  margins[2] = margins[2] || margins[0];
  margins[3] = margins[3] || margins[1];

  return margins;
};


/**
 * Starts polling for intersection changes if the polling is not already
 * happening, and if the page's visibility state is visible.
 * @private
 */
IntersectionObserver.prototype._monitorIntersections = function() {
  if (!this._monitoringIntersections) {
    this._monitoringIntersections = true;

    // If a poll interval is set, use polling instead of listening to
    // resize and scroll events or DOM mutations.
    if (this.POLL_INTERVAL) {
      this._monitoringInterval = setInterval(
          this._checkForIntersections, this.POLL_INTERVAL);
    }
    else {
      addEvent(window, 'resize', this._checkForIntersections, true);
      addEvent(document, 'scroll', this._checkForIntersections, true);

      if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
        this._domObserver = new MutationObserver(this._checkForIntersections);
        this._domObserver.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      }
    }
  }
};


/**
 * Stops polling for intersection changes.
 * @private
 */
IntersectionObserver.prototype._unmonitorIntersections = function() {
  if (this._monitoringIntersections) {
    this._monitoringIntersections = false;

    clearInterval(this._monitoringInterval);
    this._monitoringInterval = null;

    removeEvent(window, 'resize', this._checkForIntersections, true);
    removeEvent(document, 'scroll', this._checkForIntersections, true);

    if (this._domObserver) {
      this._domObserver.disconnect();
      this._domObserver = null;
    }
  }
};


/**
 * Scans each observation target for intersection changes and adds them
 * to the internal entries queue. If new entries are found, it
 * schedules the callback to be invoked.
 * @private
 */
IntersectionObserver.prototype._checkForIntersections = function() {
  var rootIsInDom = this._rootIsInDom();
  var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

  this._observationTargets.forEach(function(item) {
    var target = item.element;
    var targetRect = getBoundingClientRect(target);
    var rootContainsTarget = this._rootContainsTarget(target);
    var oldEntry = item.entry;
    var intersectionRect = rootIsInDom && rootContainsTarget &&
        this._computeTargetAndRootIntersection(target, rootRect);

    var newEntry = item.entry = new IntersectionObserverEntry({
      time: now(),
      target: target,
      boundingClientRect: targetRect,
      rootBounds: rootRect,
      intersectionRect: intersectionRect
    });

    if (!oldEntry) {
      this._queuedEntries.push(newEntry);
    } else if (rootIsInDom && rootContainsTarget) {
      // If the new entry intersection ratio has crossed any of the
      // thresholds, add a new entry.
      if (this._hasCrossedThreshold(oldEntry, newEntry)) {
        this._queuedEntries.push(newEntry);
      }
    } else {
      // If the root is not in the DOM or target is not contained within
      // root but the previous entry for this target had an intersection,
      // add a new record indicating removal.
      if (oldEntry && oldEntry.isIntersecting) {
        this._queuedEntries.push(newEntry);
      }
    }
  }, this);

  if (this._queuedEntries.length) {
    this._callback(this.takeRecords(), this);
  }
};


/**
 * Accepts a target and root rect computes the intersection between then
 * following the algorithm in the spec.
 * TODO(philipwalton): at this time clip-path is not considered.
 * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
 * @param {Element} target The target DOM element
 * @param {Object} rootRect The bounding rect of the root after being
 *     expanded by the rootMargin value.
 * @return {?Object} The final intersection rect object or undefined if no
 *     intersection is found.
 * @private
 */
IntersectionObserver.prototype._computeTargetAndRootIntersection =
    function(target, rootRect) {

  // If the element isn't displayed, an intersection can't happen.
  if (window.getComputedStyle(target).display == 'none') return;

  var targetRect = getBoundingClientRect(target);
  var intersectionRect = targetRect;
  var parent = getParentNode(target);
  var atRoot = false;

  while (!atRoot) {
    var parentRect = null;
    var parentComputedStyle = parent.nodeType == 1 ?
        window.getComputedStyle(parent) : {};

    // If the parent isn't displayed, an intersection can't happen.
    if (parentComputedStyle.display == 'none') return;

    if (parent == this.root || parent == document) {
      atRoot = true;
      parentRect = rootRect;
    } else {
      // If the element has a non-visible overflow, and it's not the <body>
      // or <html> element, update the intersection rect.
      // Note: <body> and <html> cannot be clipped to a rect that's not also
      // the document rect, so no need to compute a new intersection.
      if (parent != document.body &&
          parent != document.documentElement &&
          parentComputedStyle.overflow != 'visible') {
        parentRect = getBoundingClientRect(parent);
      }
    }

    // If either of the above conditionals set a new parentRect,
    // calculate new intersection data.
    if (parentRect) {
      intersectionRect = computeRectIntersection(parentRect, intersectionRect);

      if (!intersectionRect) break;
    }
    parent = getParentNode(parent);
  }
  return intersectionRect;
};


/**
 * Returns the root rect after being expanded by the rootMargin value.
 * @return {Object} The expanded root rect.
 * @private
 */
IntersectionObserver.prototype._getRootRect = function() {
  var rootRect;
  if (this.root) {
    rootRect = getBoundingClientRect(this.root);
  } else {
    // Use <html>/<body> instead of window since scroll bars affect size.
    var html = document.documentElement;
    var body = document.body;
    rootRect = {
      top: 0,
      left: 0,
      right: html.clientWidth || body.clientWidth,
      width: html.clientWidth || body.clientWidth,
      bottom: html.clientHeight || body.clientHeight,
      height: html.clientHeight || body.clientHeight
    };
  }
  return this._expandRectByRootMargin(rootRect);
};


/**
 * Accepts a rect and expands it by the rootMargin value.
 * @param {Object} rect The rect object to expand.
 * @return {Object} The expanded rect.
 * @private
 */
IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
  var margins = this._rootMarginValues.map(function(margin, i) {
    return margin.unit == 'px' ? margin.value :
        margin.value * (i % 2 ? rect.width : rect.height) / 100;
  });
  var newRect = {
    top: rect.top - margins[0],
    right: rect.right + margins[1],
    bottom: rect.bottom + margins[2],
    left: rect.left - margins[3]
  };
  newRect.width = newRect.right - newRect.left;
  newRect.height = newRect.bottom - newRect.top;

  return newRect;
};


/**
 * Accepts an old and new entry and returns true if at least one of the
 * threshold values has been crossed.
 * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
 *    particular target element or null if no previous entry exists.
 * @param {IntersectionObserverEntry} newEntry The current entry for a
 *    particular target element.
 * @return {boolean} Returns true if a any threshold has been crossed.
 * @private
 */
IntersectionObserver.prototype._hasCrossedThreshold =
    function(oldEntry, newEntry) {

  // To make comparing easier, an entry that has a ratio of 0
  // but does not actually intersect is given a value of -1
  var oldRatio = oldEntry && oldEntry.isIntersecting ?
      oldEntry.intersectionRatio || 0 : -1;
  var newRatio = newEntry.isIntersecting ?
      newEntry.intersectionRatio || 0 : -1;

  // Ignore unchanged ratios
  if (oldRatio === newRatio) return;

  for (var i = 0; i < this.thresholds.length; i++) {
    var threshold = this.thresholds[i];

    // Return true if an entry matches a threshold or if the new ratio
    // and the old ratio are on the opposite sides of a threshold.
    if (threshold == oldRatio || threshold == newRatio ||
        threshold < oldRatio !== threshold < newRatio) {
      return true;
    }
  }
};


/**
 * Returns whether or not the root element is an element and is in the DOM.
 * @return {boolean} True if the root element is an element and is in the DOM.
 * @private
 */
IntersectionObserver.prototype._rootIsInDom = function() {
  return !this.root || containsDeep(document, this.root);
};


/**
 * Returns whether or not the target element is a child of root.
 * @param {Element} target The target element to check.
 * @return {boolean} True if the target element is a child of root.
 * @private
 */
IntersectionObserver.prototype._rootContainsTarget = function(target) {
  return containsDeep(this.root || document, target);
};


/**
 * Adds the instance to the global IntersectionObserver registry if it isn't
 * already present.
 * @private
 */
IntersectionObserver.prototype._registerInstance = function() {
  if (registry.indexOf(this) < 0) {
    registry.push(this);
  }
};


/**
 * Removes the instance from the global IntersectionObserver registry.
 * @private
 */
IntersectionObserver.prototype._unregisterInstance = function() {
  var index = registry.indexOf(this);
  if (index != -1) registry.splice(index, 1);
};


/**
 * Returns the result of the performance.now() method or null in browsers
 * that don't support the API.
 * @return {number} The elapsed time since the page was requested.
 */
function now() {
  return window.performance && performance.now && performance.now();
}


/**
 * Throttles a function and delays its execution, so it's only called at most
 * once within a given time period.
 * @param {Function} fn The function to throttle.
 * @param {number} timeout The amount of time that must pass before the
 *     function can be called again.
 * @return {Function} The throttled function.
 */
function throttle(fn, timeout) {
  var timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(function() {
        fn();
        timer = null;
      }, timeout);
    }
  };
}


/**
 * Adds an event handler to a DOM node ensuring cross-browser compatibility.
 * @param {Node} node The DOM node to add the event handler to.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to add.
 * @param {boolean} opt_useCapture Optionally adds the even to the capture
 *     phase. Note: this only works in modern browsers.
 */
function addEvent(node, event, fn, opt_useCapture) {
  if (typeof node.addEventListener == 'function') {
    node.addEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.attachEvent == 'function') {
    node.attachEvent('on' + event, fn);
  }
}


/**
 * Removes a previously added event handler from a DOM node.
 * @param {Node} node The DOM node to remove the event handler from.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to remove.
 * @param {boolean} opt_useCapture If the event handler was added with this
 *     flag set to true, it should be set to true here in order to remove it.
 */
function removeEvent(node, event, fn, opt_useCapture) {
  if (typeof node.removeEventListener == 'function') {
    node.removeEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.detatchEvent == 'function') {
    node.detatchEvent('on' + event, fn);
  }
}


/**
 * Returns the intersection between two rect objects.
 * @param {Object} rect1 The first rect.
 * @param {Object} rect2 The second rect.
 * @return {?Object} The intersection rect or undefined if no intersection
 *     is found.
 */
function computeRectIntersection(rect1, rect2) {
  var top = Math.max(rect1.top, rect2.top);
  var bottom = Math.min(rect1.bottom, rect2.bottom);
  var left = Math.max(rect1.left, rect2.left);
  var right = Math.min(rect1.right, rect2.right);
  var width = right - left;
  var height = bottom - top;

  return (width >= 0 && height >= 0) && {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    width: width,
    height: height
  };
}


/**
 * Shims the native getBoundingClientRect for compatibility with older IE.
 * @param {Element} el The element whose bounding rect to get.
 * @return {Object} The (possibly shimmed) rect of the element.
 */
function getBoundingClientRect(el) {
  var rect;

  try {
    rect = el.getBoundingClientRect();
  } catch (err) {
    // Ignore Windows 7 IE11 "Unspecified error"
    // https://github.com/w3c/IntersectionObserver/pull/205
  }

  if (!rect) return getEmptyRect();

  // Older IE
  if (!(rect.width && rect.height)) {
    rect = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
  }
  return rect;
}


/**
 * Returns an empty rect object. An empty rect is returned when an element
 * is not in the DOM.
 * @return {Object} The empty rect.
 */
function getEmptyRect() {
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0
  };
}

/**
 * Checks to see if a parent element contains a child element (including inside
 * shadow DOM).
 * @param {Node} parent The parent element.
 * @param {Node} child The child element.
 * @return {boolean} True if the parent node contains the child node.
 */
function containsDeep(parent, child) {
  var node = child;
  while (node) {
    if (node == parent) return true;

    node = getParentNode(node);
  }
  return false;
}


/**
 * Gets the parent node of an element or its host element if the parent node
 * is a shadow root.
 * @param {Node} node The node whose parent to get.
 * @return {Node|null} The parent node or null if no parent exists.
 */
function getParentNode(node) {
  var parent = node.parentNode;

  if (parent && parent.nodeType == 11 && parent.host) {
    // If the parent is a shadow root, return the host element.
    return parent.host;
  }

  if (parent && parent.assignedSlot) {
    // If the parent is distributed in a <slot>, return the parent of a slot.
    return parent.assignedSlot.parentNode;
  }

  return parent;
}


// Exposes the constructors globally.
window.IntersectionObserver = IntersectionObserver;
window.IntersectionObserverEntry = IntersectionObserverEntry;

}());


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./button/index.vue": 115,
	"./canvas/index.vue": 114,
	"./checkbox-group/index.vue": 106,
	"./checkbox/index.vue": 109,
	"./form/index.vue": 110,
	"./icon/index.vue": 102,
	"./image/index.vue": 96,
	"./input/index.vue": 97,
	"./label/index.vue": 112,
	"./movable-area/index.vue": 121,
	"./movable-view/index.vue": 94,
	"./navigator/index.vue": 95,
	"./picker-view-column/index.vue": 119,
	"./picker-view/index.vue": 117,
	"./picker/index.vue": 113,
	"./progress/index.vue": 108,
	"./radio-group/index.vue": 107,
	"./radio/index.vue": 105,
	"./resize-sensor/index.vue": 118,
	"./rich-text/index.vue": 93,
	"./scroll-view/index.vue": 104,
	"./slider/index.vue": 111,
	"./swiper-item/index.vue": 101,
	"./swiper/index.vue": 116,
	"./switch/index.vue": 100,
	"./text/index.vue": 120,
	"./textarea/index.vue": 99,
	"./view/index.vue": 98
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 66;

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40);
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 92 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 92;

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/rich-text/index.vue?vue&type=template&id=1447b4ca&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("uni-rich-text", _vm._g({}, _vm.$listeners), [_c("div")])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/rich-text/index.vue?vue&type=template&id=1447b4ca&

// CONCATENATED MODULE: ./src/core/helpers/html-parser.js
/*
 * HTML5 Parser By Sam Blowes
 *
 * Designed for HTML5 documents
 *
 * Original code by John Resig (ejohn.org)
 * http://ejohn.org/blog/pure-javascript-html-parser/
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 *
 * ----------------------------------------------------------------------------
 * License
 * ----------------------------------------------------------------------------
 *
 * This code is triple licensed using Apache Software License 2.0,
 * Mozilla Public License or GNU Public License
 *
 * ////////////////////////////////////////////////////////////////////////////
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.  You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * ////////////////////////////////////////////////////////////////////////////
 *
 * The contents of this file are subject to the Mozilla Public License
 * Version 1.1 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 *
 * The Original Code is Simple HTML Parser.
 *
 * The Initial Developer of the Original Code is Erik Arvidsson.
 * Portions created by Erik Arvidssson are Copyright (C) 2004. All Rights
 * Reserved.
 *
 * ////////////////////////////////////////////////////////////////////////////
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * ----------------------------------------------------------------------------
 * Usage
 * ----------------------------------------------------------------------------
 *
 * // Use like so:
 * HTMLParser(htmlString, {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *
 * // or to get an XML string:
 * HTMLtoXML(htmlString);
 *
 * // or to get an XML DOM Document
 * HTMLtoDOM(htmlString);
 *
 * // or to inject into an existing document/DOM node
 * HTMLtoDOM(htmlString, document);
 * HTMLtoDOM(htmlString, document.body);
 *
 */
// Regular Expressions for parsing tags and attributes
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g; // Empty Elements - HTML 5

var empty = makeMap('area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr'); // Block Elements - HTML 5
// fixed by xxx 将 ins 标签从块级名单中移除

var block = makeMap('a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video'); // Inline Elements - HTML 5

var inline = makeMap('abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var'); // Elements that you can, intentionally, leave open
// (and which close themselves)

var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr'); // Attributes that have their values filled in disabled="disabled"

var fillAttrs = makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected'); // Special Elements (can contain anything)

var special = makeMap('script,style');
function HTMLParser(html, handler) {
  var index;
  var chars;
  var match;
  var stack = [];
  var last = html;

  stack.last = function () {
    return this[this.length - 1];
  };

  while (html) {
    chars = true; // Make sure we're not in a script or style element

    if (!stack.last() || !special[stack.last()]) {
      // Comment
      if (html.indexOf('<!--') == 0) {
        index = html.indexOf('-->');

        if (index >= 0) {
          if (handler.comment) {
            handler.comment(html.substring(4, index));
          }

          html = html.substring(index + 3);
          chars = false;
        } // end tag

      } else if (html.indexOf('</') == 0) {
        match = html.match(endTag);

        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(endTag, parseEndTag);
          chars = false;
        } // start tag

      } else if (html.indexOf('<') == 0) {
        match = html.match(startTag);

        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(startTag, parseStartTag);
          chars = false;
        }
      }

      if (chars) {
        index = html.indexOf('<');
        var text = index < 0 ? html : html.substring(0, index);
        html = index < 0 ? '' : html.substring(index);

        if (handler.chars) {
          handler.chars(text);
        }
      }
    } else {
      html = html.replace(new RegExp('([\\s\\S]*?)<\/' + stack.last() + '[^>]*>'), function (all, text) {
        text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, '$1$2');

        if (handler.chars) {
          handler.chars(text);
        }

        return '';
      });
      parseEndTag('', stack.last());
    }

    if (html == last) {
      throw 'Parse Error: ' + html;
    }

    last = html;
  } // Clean up any remaining tags


  parseEndTag();

  function parseStartTag(tag, tagName, rest, unary) {
    tagName = tagName.toLowerCase();

    if (block[tagName]) {
      while (stack.last() && inline[stack.last()]) {
        parseEndTag('', stack.last());
      }
    }

    if (closeSelf[tagName] && stack.last() == tagName) {
      parseEndTag('', tagName);
    }

    unary = empty[tagName] || !!unary;

    if (!unary) {
      stack.push(tagName);
    }

    if (handler.start) {
      var attrs = [];
      rest.replace(attr, function (match, name) {
        var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : '';
        attrs.push({
          name: name,
          value: value,
          escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') // "

        });
      });

      if (handler.start) {
        handler.start(tagName, attrs, unary);
      }
    }
  }

  function parseEndTag(tag, tagName) {
    // If no tag name is provided, clean shop
    if (!tagName) {
      var pos = 0;
    } // Find the closest opened tag of the same type
    else {
        for (var pos = stack.length - 1; pos >= 0; pos--) {
          if (stack[pos] == tagName) {
            break;
          }
        }
      }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (handler.end) {
          handler.end(stack[i]);
        }
      } // Remove the open elements from the stack


      stack.length = pos;
    }
  }
}
;

function makeMap(str) {
  var obj = {};
  var items = str.split(',');

  for (var i = 0; i < items.length; i++) {
    obj[items[i]] = true;
  }

  return obj;
}
// CONCATENATED MODULE: ./src/core/view/components/rich-text/html-parser.js


function removeDOCTYPE(html) {
  return html.replace(/<\?xml.*\?>\n/, '').replace(/<!doctype.*>\n/, '').replace(/<!DOCTYPE.*>\n/, '');
}

function parseAttrs(attrs) {
  return attrs.reduce(function (pre, attr) {
    var value = attr.value;
    var name = attr.name;

    if (value.match(/ /) && name !== 'style') {
      value = value.split(' ');
    }

    if (pre[name]) {
      if (Array.isArray(pre[name])) {
        pre[name].push(value);
      } else {
        pre[name] = [pre[name], value];
      }
    } else {
      pre[name] = value;
    }

    return pre;
  }, {});
}

function parseHtml(html) {
  html = removeDOCTYPE(html);
  var stacks = [];
  var results = {
    node: 'root',
    children: []
  };
  HTMLParser(html, {
    start: function start(tag, attrs, unary) {
      var node = {
        name: tag
      };

      if (attrs.length !== 0) {
        node.attrs = parseAttrs(attrs);
      }

      if (unary) {
        var parent = stacks[0] || results;

        if (!parent.children) {
          parent.children = [];
        }

        parent.children.push(node);
      } else {
        stacks.unshift(node);
      }
    },
    end: function end(tag) {
      var node = stacks.shift();
      if (node.name !== tag) console.error('invalid state: mismatch end tag');

      if (stacks.length === 0) {
        results.children.push(node);
      } else {
        var parent = stacks[0];

        if (!parent.children) {
          parent.children = [];
        }

        parent.children.push(node);
      }
    },
    chars: function chars(text) {
      var node = {
        type: 'text',
        text: text
      };

      if (stacks.length === 0) {
        results.children.push(node);
      } else {
        var parent = stacks[0];

        if (!parent.children) {
          parent.children = [];
        }

        parent.children.push(node);
      }
    },
    comment: function comment(text) {
      var node = {
        node: 'comment',
        text: text
      };
      var parent = stacks[0];

      if (!parent.children) {
        parent.children = [];
      }

      parent.children.push(node);
    }
  });
  return results.children;
}
// EXTERNAL MODULE: ./src/shared/index.js + 4 modules
var shared = __webpack_require__(2);

// CONCATENATED MODULE: ./src/core/view/components/rich-text/nodes-parser.js

var TAGS = {
  'a': '',
  'abbr': '',
  'b': '',
  'blockquote': '',
  'br': '',
  'code': '',
  'col': ['span', 'width'],
  'colgroup': ['span', 'width'],
  'dd': '',
  'del': '',
  'div': '',
  'dl': '',
  'dt': '',
  'em': '',
  'fieldset': '',
  'h1': '',
  'h2': '',
  'h3': '',
  'h4': '',
  'h5': '',
  'h6': '',
  'hr': '',
  'i': '',
  'img': ['alt', 'src', 'height', 'width'],
  'ins': '',
  'label': '',
  'legend': '',
  'li': '',
  'ol': ['start', 'type'],
  'p': '',
  'q': '',
  'span': '',
  'strong': '',
  'sub': '',
  'sup': '',
  'table': ['width'],
  'tbody': '',
  'td': ['colspan', 'rowspan', 'height', 'width'],
  'tfoot': '',
  'th': ['colspan', 'rowspan', 'height', 'width'],
  'thead': '',
  'tr': '',
  'ul': ''
};
var CHARS = {
  'amp': '&',
  'gt': '>',
  'lt': '<',
  'nbsp': ' ',
  'quot': '"',
  'apos': "'"
};

function decodeEntities(htmlString) {
  return htmlString.replace(/&(([a-zA-Z]+)|(#x{0,1}[\da-zA-Z]+));/gi, function (match, stage) {
    if (Object(shared["c" /* hasOwn */])(CHARS, stage) && CHARS[stage]) {
      return CHARS[stage];
    }

    if (/^#[0-9]{1,4}$/.test(stage)) {
      return String.fromCharCode(stage.slice(1));
    }

    if (/^#x[0-9a-f]{1,4}$/i.test(stage)) {
      return String.fromCharCode('0' + stage.slice(1));
    }

    var wrap = document.createElement('div');
    wrap.innerHTML = match;
    return wrap.innerText || wrap.textContent;
  });
}

function parseNodes(nodes, parentNode) {
  nodes.forEach(function (node) {
    if (!Object(shared["e" /* isPlainObject */])(node)) {
      return;
    }

    if (!Object(shared["c" /* hasOwn */])(node, 'type') || node.type === 'node') {
      if (!(typeof node.name === 'string' && node.name)) {
        return;
      }

      var tagName = node.name.toLowerCase();

      if (!Object(shared["c" /* hasOwn */])(TAGS, tagName)) {
        return;
      }

      var elem = document.createElement(tagName);

      if (!elem) {
        return;
      }

      var attrs = node.attrs;

      if (Object(shared["e" /* isPlainObject */])(attrs)) {
        var tagAttrs = TAGS[tagName] || [];
        Object.keys(attrs).forEach(function (name) {
          var value = attrs[name];

          switch (name) {
            case 'class':
              /* eslint-disable no-fallthrough */
              Array.isArray(value) && (value = value.join(' '));

            case 'style':
              elem.setAttribute(name, value);
              break;

            default:
              if (tagAttrs.indexOf(name) !== -1) {
                elem.setAttribute(name, value);
              }

          }
        });
      }

      var children = node.children;

      if (Array.isArray(children) && children.length) {
        parseNodes(node.children, elem);
      }

      parentNode.appendChild(elem);
    } else {
      if (node.type === 'text' && typeof node.text === 'string' && node.text !== '') {
        parentNode.appendChild(document.createTextNode(decodeEntities(node.text)));
      }
    }
  });
  return parentNode;
}
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/rich-text/index.vue?vue&type=script&lang=js&
//
//
//
//
//


/* harmony default export */ var rich_textvue_type_script_lang_js_ = ({
  name: 'RichText',
  props: {
    nodes: {
      type: [Array, String],
      default: function _default() {
        return [];
      }
    }
  },
  watch: {
    nodes: function nodes(value) {
      this._renderNodes(value);
    }
  },
  mounted: function mounted() {
    this._renderNodes(this.nodes);
  },
  methods: {
    _renderNodes: function _renderNodes(nodes) {
      if (typeof nodes === 'string') {
        nodes = parseHtml(nodes);
      }

      var nodeList = parseNodes(nodes, document.createDocumentFragment());
      this.$el.firstChild.innerHTML = '';
      this.$el.firstChild.appendChild(nodeList);
    }
  }
});
// CONCATENATED MODULE: ./src/core/view/components/rich-text/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_rich_textvue_type_script_lang_js_ = (rich_textvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/rich-text/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_rich_textvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/rich-text/index.vue"
/* harmony default export */ var rich_text = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/movable-view/index.vue?vue&type=template&id=8de47606&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "uni-movable-view",
    _vm._g({}, _vm.$listeners),
    [
      _c("v-uni-resize-sensor", { on: { resize: _vm.setParent } }),
      _vm._t("default")
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/movable-view/index.vue?vue&type=template&id=8de47606&

// EXTERNAL MODULE: ./src/core/view/mixins/touchtrack.js
var touchtrack = __webpack_require__(7);

// CONCATENATED MODULE: ./src/core/view/components/movable-view/utils.js
function e(e, t, n) {
  return e > t - n && e < t + n;
}

function t(t, n) {
  return e(t, 0, n);
}

function Decline() {}

Decline.prototype.x = function (e) {
  return Math.sqrt(e);
};

function Friction(e, t) {
  this._m = e;
  this._f = 1e3 * t;
  this._startTime = 0;
  this._v = 0;
}

Friction.prototype.setV = function (x, y) {
  var n = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
  this._x_v = x;
  this._y_v = y;
  this._x_a = -this._f * this._x_v / n;
  this._y_a = -this._f * this._y_v / n;
  this._t = Math.abs(x / this._x_a) || Math.abs(y / this._y_a);
  this._lastDt = null;
  this._startTime = new Date().getTime();
};

Friction.prototype.setS = function (x, y) {
  this._x_s = x;
  this._y_s = y;
};

Friction.prototype.s = function (t) {
  if (undefined === t) {
    t = (new Date().getTime() - this._startTime) / 1e3;
  }

  if (t > this._t) {
    t = this._t;
    this._lastDt = t;
  }

  var x = this._x_v * t + 0.5 * this._x_a * Math.pow(t, 2) + this._x_s;

  var y = this._y_v * t + 0.5 * this._y_a * Math.pow(t, 2) + this._y_s;

  if (this._x_a > 0 && x < this._endPositionX || this._x_a < 0 && x > this._endPositionX) {
    x = this._endPositionX;
  }

  if (this._y_a > 0 && y < this._endPositionY || this._y_a < 0 && y > this._endPositionY) {
    y = this._endPositionY;
  }

  return {
    x: x,
    y: y
  };
};

Friction.prototype.ds = function (t) {
  if (undefined === t) {
    t = (new Date().getTime() - this._startTime) / 1e3;
  }

  if (t > this._t) {
    t = this._t;
  }

  return {
    dx: this._x_v + this._x_a * t,
    dy: this._y_v + this._y_a * t
  };
};

Friction.prototype.delta = function () {
  return {
    x: -1.5 * Math.pow(this._x_v, 2) / this._x_a || 0,
    y: -1.5 * Math.pow(this._y_v, 2) / this._y_a || 0
  };
};

Friction.prototype.dt = function () {
  return -this._x_v / this._x_a;
};

Friction.prototype.done = function () {
  var t = e(this.s().x, this._endPositionX) || e(this.s().y, this._endPositionY) || this._lastDt === this._t;

  this._lastDt = null;
  return t;
};

Friction.prototype.setEnd = function (x, y) {
  this._endPositionX = x;
  this._endPositionY = y;
};

Friction.prototype.reconfigure = function (m, f) {
  this._m = m;
  this._f = 1e3 * f;
};

function Spring(m, k, c) {
  this._m = m;
  this._k = k;
  this._c = c;
  this._solution = null;
  this._endPosition = 0;
  this._startTime = 0;
}

Spring.prototype._solve = function (e, t) {
  var n = this._c;
  var i = this._m;
  var r = this._k;
  var o = n * n - 4 * i * r;

  if (o === 0) {
    var a = -n / (2 * i);
    var s = e;
    var l = t / (a * e);
    return {
      x: function x(e) {
        return (s + l * e) * Math.pow(Math.E, a * e);
      },
      dx: function dx(e) {
        var t = Math.pow(Math.E, a * e);
        return a * (s + l * e) * t + l * t;
      }
    };
  }

  if (o > 0) {
    var c = (-n - Math.sqrt(o)) / (2 * i);
    var u = (-n + Math.sqrt(o)) / (2 * i);
    var d = (t - c * e) / (u - c);
    var h = e - d;
    return {
      x: function x(e) {
        var t;
        var n;

        if (e === this._t) {
          t = this._powER1T;
          n = this._powER2T;
        }

        this._t = e;

        if (!t) {
          t = this._powER1T = Math.pow(Math.E, c * e);
        }

        if (!n) {
          n = this._powER2T = Math.pow(Math.E, u * e);
        }

        return h * t + d * n;
      },
      dx: function dx(e) {
        var t;
        var n;

        if (e === this._t) {
          t = this._powER1T;
          n = this._powER2T;
        }

        this._t = e;

        if (!t) {
          t = this._powER1T = Math.pow(Math.E, c * e);
        }

        if (!n) {
          n = this._powER2T = Math.pow(Math.E, u * e);
        }

        return h * c * t + d * u * n;
      }
    };
  }

  var p = Math.sqrt(4 * i * r - n * n) / (2 * i);
  var f = -n / 2 * i;
  var v = e;
  var g = (t - f * e) / p;
  return {
    x: function x(e) {
      return Math.pow(Math.E, f * e) * (v * Math.cos(p * e) + g * Math.sin(p * e));
    },
    dx: function dx(e) {
      var t = Math.pow(Math.E, f * e);
      var n = Math.cos(p * e);
      var i = Math.sin(p * e);
      return t * (g * p * n - v * p * i) + f * t * (g * i + v * n);
    }
  };
};

Spring.prototype.x = function (e) {
  if (undefined === e) {
    e = (new Date().getTime() - this._startTime) / 1e3;
  }

  return this._solution ? this._endPosition + this._solution.x(e) : 0;
};

Spring.prototype.dx = function (e) {
  if (undefined === e) {
    e = (new Date().getTime() - this._startTime) / 1e3;
  }

  return this._solution ? this._solution.dx(e) : 0;
};

Spring.prototype.setEnd = function (e, n, i) {
  if (!i) {
    i = new Date().getTime();
  }

  if (e !== this._endPosition || !t(n, 0.1)) {
    n = n || 0;
    var r = this._endPosition;

    if (this._solution) {
      if (t(n, 0.1)) {
        n = this._solution.dx((i - this._startTime) / 1e3);
      }

      r = this._solution.x((i - this._startTime) / 1e3);

      if (t(n, 0.1)) {
        n = 0;
      }

      if (t(r, 0.1)) {
        r = 0;
      }

      r += this._endPosition;
    }

    if (!(this._solution && t(r - e, 0.1) && t(n, 0.1))) {
      this._endPosition = e;
      this._solution = this._solve(r - this._endPosition, n);
      this._startTime = i;
    }
  }
};

Spring.prototype.snap = function (e) {
  this._startTime = new Date().getTime();
  this._endPosition = e;
  this._solution = {
    x: function x() {
      return 0;
    },
    dx: function dx() {
      return 0;
    }
  };
};

Spring.prototype.done = function (n) {
  if (!n) {
    n = new Date().getTime();
  }

  return e(this.x(), this._endPosition, 0.1) && t(this.dx(), 0.1);
};

Spring.prototype.reconfigure = function (m, t, c) {
  this._m = m;
  this._k = t;
  this._c = c;

  if (!this.done()) {
    this._solution = this._solve(this.x() - this._endPosition, this.dx());
    this._startTime = new Date().getTime();
  }
};

Spring.prototype.springConstant = function () {
  return this._k;
};

Spring.prototype.damping = function () {
  return this._c;
};

Spring.prototype.configuration = function () {
  function e(e, t) {
    e.reconfigure(1, t, e.damping());
  }

  function t(e, t) {
    e.reconfigure(1, e.springConstant(), t);
  }

  return [{
    label: 'Spring Constant',
    read: this.springConstant.bind(this),
    write: e.bind(this, this),
    min: 100,
    max: 1e3
  }, {
    label: 'Damping',
    read: this.damping.bind(this),
    write: t.bind(this, this),
    min: 1,
    max: 500
  }];
};

function STD(e, t, n) {
  this._springX = new Spring(e, t, n);
  this._springY = new Spring(e, t, n);
  this._springScale = new Spring(e, t, n);
  this._startTime = 0;
}

STD.prototype.setEnd = function (e, t, n, i) {
  var r = new Date().getTime();

  this._springX.setEnd(e, i, r);

  this._springY.setEnd(t, i, r);

  this._springScale.setEnd(n, i, r);

  this._startTime = r;
};

STD.prototype.x = function () {
  var e = (new Date().getTime() - this._startTime) / 1e3;
  return {
    x: this._springX.x(e),
    y: this._springY.x(e),
    scale: this._springScale.x(e)
  };
};

STD.prototype.done = function () {
  var e = new Date().getTime();
  return this._springX.done(e) && this._springY.done(e) && this._springScale.done(e);
};

STD.prototype.reconfigure = function (e, t, n) {
  this._springX.reconfigure(e, t, n);

  this._springY.reconfigure(e, t, n);

  this._springScale.reconfigure(e, t, n);
};
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/movable-view/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//


var requesting = false;

function _requestAnimationFrame(e) {
  if (!requesting) {
    requesting = true;
    requestAnimationFrame(function () {
      e();
      requesting = false;
    });
  }
}

function p(t, n) {
  if (t === n) {
    return 0;
  }

  var i = t.offsetLeft;
  return t.offsetParent ? i += p(t.offsetParent, n) : 0;
}

function f(t, n) {
  if (t === n) {
    return 0;
  }

  var i = t.offsetTop;
  return t.offsetParent ? i += f(t.offsetParent, n) : 0;
}

function v(a, b) {
  return +((1000 * a - 1000 * b) / 1000).toFixed(1);
}

function g(e, t, n) {
  var i = function i(e) {
    if (e && e.id) {
      cancelAnimationFrame(e.id);
    }

    if (e) {
      e.cancelled = true;
    }
  };

  var r = {
    id: 0,
    cancelled: false
  };

  function fn(n, i, r, o) {
    if (!n || !n.cancelled) {
      r(i);
      var a = e.done();

      if (!a) {
        if (!n.cancelled) {
          n.id = requestAnimationFrame(fn.bind(null, n, i, r, o));
        }
      }

      if (a && o) {
        o(i);
      }
    }
  }

  fn(r, e, t, n);
  return {
    cancel: i.bind(null, r),
    model: e
  };
}

/* harmony default export */ var movable_viewvue_type_script_lang_js_ = ({
  name: 'MovableView',
  mixins: [touchtrack["a" /* default */]],
  props: {
    direction: {
      type: String,
      default: 'none'
    },
    inertia: {
      type: [Boolean, String],
      default: false
    },
    outOfBounds: {
      type: [Boolean, String],
      default: false
    },
    x: {
      type: [Number, String],
      default: 0
    },
    y: {
      type: [Number, String],
      default: 0
    },
    damping: {
      type: [Number, String],
      default: 20
    },
    friction: {
      type: [Number, String],
      default: 2
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    scale: {
      type: [Boolean, String],
      default: false
    },
    scaleMin: {
      type: [Number, String],
      default: 0.5
    },
    scaleMax: {
      type: [Number, String],
      default: 10
    },
    scaleValue: {
      type: [Number, String],
      default: 1
    },
    animation: {
      type: [Boolean, String],
      default: true
    }
  },
  data: function data() {
    return {
      xSync: this._getPx(this.x),
      ySync: this._getPx(this.y),
      scaleValueSync: Number(this.scaleValue) || 1,
      width: 0,
      height: 0,
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0
    };
  },
  computed: {
    dampingNumber: function dampingNumber() {
      var val = Number(this.damping);
      return isNaN(val) ? 20 : val;
    },
    frictionNumber: function frictionNumber() {
      var val = Number(this.friction);
      return isNaN(val) || val <= 0 ? 2 : val;
    },
    scaleMinNumber: function scaleMinNumber() {
      var val = Number(this.scaleMin);
      return isNaN(val) ? 0.5 : val;
    },
    scaleMaxNumber: function scaleMaxNumber() {
      var val = Number(this.scaleMax);
      return isNaN(val) ? 10 : val;
    },
    xMove: function xMove() {
      return this.direction === 'all' || this.direction === 'horizontal';
    },
    yMove: function yMove() {
      return this.direction === 'all' || this.direction === 'vertical';
    }
  },
  watch: {
    x: function x(val) {
      this.xSync = this._getPx(val);
    },
    xSync: function xSync(val) {
      this._setX(val);
    },
    y: function y(val) {
      this.ySync = this._getPx(val);
    },
    ySync: function ySync(val) {
      this._setY(val);
    },
    scaleValue: function scaleValue(val) {
      this.scaleValueSync = Number(val) || 0;
    },
    scaleValueSync: function scaleValueSync(val) {
      this._setScaleValue(val);
    },
    scaleMinNumber: function scaleMinNumber() {
      this._setScaleMinOrMax();
    },
    scaleMaxNumber: function scaleMaxNumber() {
      this._setScaleMinOrMax();
    }
  },
  created: function created() {
    this._offset = {
      x: 0,
      y: 0
    };
    this._scaleOffset = {
      x: 0,
      y: 0
    };
    this._translateX = 0;
    this._translateY = 0;
    this._scale = 1;
    this._oldScale = 1;
    this._STD = new STD(1, 9 * Math.pow(this.dampingNumber, 2) / 40, this.dampingNumber);
    this._friction = new Friction(1, this.frictionNumber);
    this._declineX = new Decline();
    this._declineY = new Decline();
    this.__touchInfo = {
      historyX: [0, 0],
      historyY: [0, 0],
      historyT: [0, 0]
    };
  },
  mounted: function mounted() {
    this.touchtrack(this.$el, '_onTrack');
    this.setParent();

    this._friction.reconfigure(1, this.frictionNumber);

    this._STD.reconfigure(1, 9 * Math.pow(this.dampingNumber, 2) / 40, this.dampingNumber);

    this.$el.style.transformOrigin = 'center';
  },
  methods: {
    _getPx: function _getPx(val) {
      if (/\d+[ur]px$/i.test(val)) {
        return uni.upx2px(parseFloat(val));
      }

      return Number(val) || 0;
    },
    _setX: function _setX(val) {
      if (this.xMove) {
        if (val + this._scaleOffset.x === this._translateX) {
          return this._translateX;
        } else {
          if (this._SFA) {
            this._SFA.cancel();
          }

          this._animationTo(val + this._scaleOffset.x, this.ySync + this._scaleOffset.y, this._scale);
        }
      }

      return val;
    },
    _setY: function _setY(val) {
      if (this.yMove) {
        if (val + this._scaleOffset.y === this._translateY) {
          return this._translateY;
        } else {
          if (this._SFA) {
            this._SFA.cancel();
          }

          this._animationTo(this.xSync + this._scaleOffset.x, val + this._scaleOffset.y, this._scale);
        }
      }

      return val;
    },
    _setScaleMinOrMax: function _setScaleMinOrMax() {
      if (!this.scale) {
        return false;
      }

      this._updateScale(this._scale, true);

      this._updateOldScale(this._scale);
    },
    _setScaleValue: function _setScaleValue(scale) {
      if (!this.scale) {
        return false;
      }

      scale = this._adjustScale(scale);

      this._updateScale(scale, true);

      this._updateOldScale(scale);

      return scale;
    },
    __handleTouchStart: function __handleTouchStart() {
      if (!this._isScaling) {
        if (!this.disabled) {
          if (this._FA) {
            this._FA.cancel();
          }

          if (this._SFA) {
            this._SFA.cancel();
          }

          this.__touchInfo.historyX = [0, 0];
          this.__touchInfo.historyY = [0, 0];
          this.__touchInfo.historyT = [0, 0];

          if (this.xMove) {
            this.__baseX = this._translateX;
          }

          if (this.yMove) {
            this.__baseY = this._translateY;
          }

          this.$el.style.willChange = 'transform';
          this._checkCanMove = null;
          this._firstMoveDirection = null;
          this._isTouching = true;
        }
      }
    },
    __handleTouchMove: function __handleTouchMove(event) {
      var self = this;

      if (!this._isScaling && !this.disabled && this._isTouching) {
        var x = this._translateX;
        var y = this._translateY;

        if (this._firstMoveDirection === null) {
          this._firstMoveDirection = Math.abs(event.detail.dx / event.detail.dy) > 1 ? 'htouchmove' : 'vtouchmove';
        }

        if (this.xMove) {
          x = event.detail.dx + this.__baseX;

          this.__touchInfo.historyX.shift();

          this.__touchInfo.historyX.push(x);

          if (!this.yMove) {
            if (!null !== this._checkCanMove) {
              if (Math.abs(event.detail.dx / event.detail.dy) > 1) {
                this._checkCanMove = false;
              } else {
                this._checkCanMove = true;
              }
            }
          }
        }

        if (this.yMove) {
          y = event.detail.dy + this.__baseY;

          this.__touchInfo.historyY.shift();

          this.__touchInfo.historyY.push(y);

          if (!this.xMove) {
            if (!null !== this._checkCanMove) {
              if (Math.abs(event.detail.dy / event.detail.dx) > 1) {
                this._checkCanMove = false;
              } else {
                this._checkCanMove = true;
              }
            }
          }
        }

        this.__touchInfo.historyT.shift();

        this.__touchInfo.historyT.push(event.detail.timeStamp);

        if (!this._checkCanMove) {
          event.preventDefault();
          var source = 'touch';

          if (x < this.minX) {
            if (this.outOfBounds) {
              source = 'touch-out-of-bounds';
              x = this.minX - this._declineX.x(this.minX - x);
            } else {
              x = this.minX;
            }
          } else if (x > this.maxX) {
            if (this.outOfBounds) {
              source = 'touch-out-of-bounds';
              x = this.maxX + this._declineX.x(x - this.maxX);
            } else {
              x = this.maxX;
            }
          }

          if (y < this.minY) {
            if (this.outOfBounds) {
              source = 'touch-out-of-bounds';
              y = this.minY - this._declineY.x(this.minY - y);
            } else {
              y = this.minY;
            }
          } else {
            if (y > this.maxY) {
              if (this.outOfBounds) {
                source = 'touch-out-of-bounds';
                y = this.maxY + this._declineY.x(y - this.maxY);
              } else {
                y = this.maxY;
              }
            }
          }

          _requestAnimationFrame(function () {
            self._setTransform(x, y, self._scale, source);
          });
        }
      }
    },
    __handleTouchEnd: function __handleTouchEnd() {
      var self = this;

      if (!this._isScaling && !this.disabled && this._isTouching) {
        this.$el.style.willChange = 'auto';
        this._isTouching = false;

        if (!this._checkCanMove && !this._revise('out-of-bounds') && this.inertia) {
          var xv = 1000 * (this.__touchInfo.historyX[1] - this.__touchInfo.historyX[0]) / (this.__touchInfo.historyT[1] - this.__touchInfo.historyT[0]);
          var yv = 1000 * (this.__touchInfo.historyY[1] - this.__touchInfo.historyY[0]) / (this.__touchInfo.historyT[1] - this.__touchInfo.historyT[0]);

          this._friction.setV(xv, yv);

          this._friction.setS(this._translateX, this._translateY);

          var x0 = this._friction.delta().x;

          var y0 = this._friction.delta().y;

          var x = x0 + this._translateX;
          var y = y0 + this._translateY;

          if (x < this.minX) {
            x = this.minX;
            y = this._translateY + (this.minX - this._translateX) * y0 / x0;
          } else {
            if (x > this.maxX) {
              x = this.maxX;
              y = this._translateY + (this.maxX - this._translateX) * y0 / x0;
            }
          }

          if (y < this.minY) {
            y = this.minY;
            x = this._translateX + (this.minY - this._translateY) * x0 / y0;
          } else {
            if (y > this.maxY) {
              y = this.maxY;
              x = this._translateX + (this.maxY - this._translateY) * x0 / y0;
            }
          }

          this._friction.setEnd(x, y);

          this._FA = g(this._friction, function () {
            var t = self._friction.s();

            var x = t.x;
            var y = t.y;

            self._setTransform(x, y, self._scale, 'friction');
          }, function () {
            self._FA.cancel();
          });
        }
      }
    },
    _onTrack: function _onTrack(event) {
      switch (event.detail.state) {
        case 'start':
          this.__handleTouchStart();

          break;

        case 'move':
          this.__handleTouchMove(event);

          break;

        case 'end':
          this.__handleTouchEnd();

      }
    },
    _getLimitXY: function _getLimitXY(x, y) {
      var outOfBounds = false;

      if (x > this.maxX) {
        x = this.maxX;
        outOfBounds = true;
      } else {
        if (x < this.minX) {
          x = this.minX;
          outOfBounds = true;
        }
      }

      if (y > this.maxY) {
        y = this.maxY;
        outOfBounds = true;
      } else {
        if (y < this.minY) {
          y = this.minY;
          outOfBounds = true;
        }
      }

      return {
        x: x,
        y: y,
        outOfBounds: outOfBounds
      };
    },
    setParent: function setParent() {
      if (!this.$parent._isMounted) {
        return;
      }

      if (this._FA) {
        this._FA.cancel();
      }

      if (this._SFA) {
        this._SFA.cancel();
      }

      var scale = this.scale ? this.scaleValueSync : 1;

      this._updateOffset();

      this._updateWH(scale);

      this._updateBoundary();

      this._translateX = this.xSync + this._scaleOffset.x;
      this._translateY = this.ySync + this._scaleOffset.y;

      var limitXY = this._getLimitXY(this._translateX, this._translateY);

      var x = limitXY.x;
      var y = limitXY.y;

      this._setTransform(x, y, scale, '', true);

      this._updateOldScale(scale);
    },
    _updateOffset: function _updateOffset() {
      this._offset.x = p(this.$el, this.$parent.$el);
      this._offset.y = f(this.$el, this.$parent.$el);
    },
    _updateWH: function _updateWH(scale) {
      scale = scale || this._scale;
      scale = this._adjustScale(scale);
      var rect = this.$el.getBoundingClientRect();
      this.height = rect.height / this._scale;
      this.width = rect.width / this._scale;
      var height = this.height * scale;
      var width = this.width * scale;
      this._scaleOffset.x = (width - this.width) / 2;
      this._scaleOffset.y = (height - this.height) / 2;
    },
    _updateBoundary: function _updateBoundary() {
      var x = 0 - this._offset.x + this._scaleOffset.x;
      var width = this.$parent.width - this.width - this._offset.x - this._scaleOffset.x;
      this.minX = Math.min(x, width);
      this.maxX = Math.max(x, width);
      var y = 0 - this._offset.y + this._scaleOffset.y;
      var height = this.$parent.height - this.height - this._offset.y - this._scaleOffset.y;
      this.minY = Math.min(y, height);
      this.maxY = Math.max(y, height);
    },
    _beginScale: function _beginScale() {
      this._isScaling = true;
    },
    _endScale: function _endScale() {
      this._isScaling = false;

      this._updateOldScale(this._scale);
    },
    _setScale: function _setScale(scale) {
      if (this.scale) {
        scale = this._adjustScale(scale);
        scale = this._oldScale * scale;

        this._beginScale();

        this._updateScale(scale);
      }
    },
    _updateScale: function _updateScale(scale, animat) {
      var self = this;

      if (this.scale) {
        scale = this._adjustScale(scale);

        this._updateWH(scale);

        this._updateBoundary();

        var limitXY = this._getLimitXY(this._translateX, this._translateY);

        var x = limitXY.x;
        var y = limitXY.y;

        if (animat) {
          this._animationTo(x, y, scale, '', true, true);
        } else {
          _requestAnimationFrame(function () {
            self._setTransform(x, y, scale, '', true, true);
          });
        }
      }
    },
    _updateOldScale: function _updateOldScale(scale) {
      this._oldScale = scale;
    },
    _adjustScale: function _adjustScale(scale) {
      scale = Math.max(0.5, this.scaleMinNumber, scale);
      scale = Math.min(10, this.scaleMaxNumber, scale);
      return scale;
    },
    _animationTo: function _animationTo(x, y, scale, source, r, o) {
      var self = this;

      if (this._FA) {
        this._FA.cancel();
      }

      if (this._SFA) {
        this._SFA.cancel();
      }

      if (!this.xMove) {
        x = this._translateX;
      }

      if (!this.yMove) {
        y = this._translateY;
      }

      if (!this.scale) {
        scale = this._scale;
      }

      var limitXY = this._getLimitXY(x, y);

      x = limitXY.x;
      y = limitXY.y;

      if (!this.animation) {
        this._setTransform(x, y, scale, source, r, o);

        return;
      }

      this._STD._springX._solution = null;
      this._STD._springY._solution = null;
      this._STD._springScale._solution = null;
      this._STD._springX._endPosition = this._translateX;
      this._STD._springY._endPosition = this._translateY;
      this._STD._springScale._endPosition = this._scale;

      this._STD.setEnd(x, y, scale, 1);

      this._SFA = g(this._STD, function () {
        var data = self._STD.x();

        var x = data.x;
        var y = data.y;
        var scale = data.scale;

        self._setTransform(x, y, scale, source, r, o);
      }, function () {
        self._SFA.cancel();
      });
    },
    _revise: function _revise(source) {
      var limitXY = this._getLimitXY(this._translateX, this._translateY);

      var x = limitXY.x;
      var y = limitXY.y;
      var outOfBounds = limitXY.outOfBounds;

      if (outOfBounds) {
        this._animationTo(x, y, this._scale, source);
      }

      return outOfBounds;
    },
    _setTransform: function _setTransform(x, y, scale) {
      var source = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var r = arguments.length > 4 ? arguments[4] : undefined;
      var o = arguments.length > 5 ? arguments[5] : undefined;

      if (!(x !== null && x.toString() !== 'NaN' && typeof x === 'number')) {
        x = this._translateX || 0;
      }

      if (!(y !== null && y.toString() !== 'NaN' && typeof y === 'number')) {
        y = this._translateY || 0;
      }

      x = Number(x.toFixed(1));
      y = Number(y.toFixed(1));
      scale = Number(scale.toFixed(1));

      if (!(this._translateX === x && this._translateY === y)) {
        if (!r) {
          this.$trigger('change', {}, {
            x: v(x, this._scaleOffset.x),
            y: v(y, this._scaleOffset.y),
            source: source
          });
        }
      }

      if (!this.scale) {
        scale = this._scale;
      }

      scale = this._adjustScale(scale);
      scale = +scale.toFixed(3);

      if (o && scale !== this._scale) {
        this.$trigger('scale', {}, {
          x: x,
          y: y,
          scale: scale
        });
      }

      var transform = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(0px) scale(' + scale + ')';
      this.$el.style.transform = transform;
      this.$el.style.webkitTransform = transform;
      this._translateX = x;
      this._translateY = y;
      this._scale = scale;
    }
  }
});
// CONCATENATED MODULE: ./src/core/view/components/movable-view/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_movable_viewvue_type_script_lang_js_ = (movable_viewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/movable-view/index.vue?vue&type=style&index=0&lang=css&
var movable_viewvue_type_style_index_0_lang_css_ = __webpack_require__(75);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/movable-view/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_movable_viewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/movable-view/index.vue"
/* harmony default export */ var movable_view = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/navigator/index.vue?vue&type=template&id=c893a598&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.hoverClass && _vm.hoverClass !== "none"
    ? _c(
        "uni-navigator",
        _vm._g(
          {
            class: [_vm.hovering ? _vm.hoverClass : ""],
            on: {
              touchstart: _vm._hoverTouchStart,
              touchend: _vm._hoverTouchEnd,
              touchcancel: _vm._hoverTouchCancel,
              click: _vm._onClick
            }
          },
          _vm.$listeners
        ),
        [_vm._t("default")],
        2
      )
    : _c(
        "uni-navigator",
        _vm._g({ on: { click: _vm._onClick } }, _vm.$listeners),
        [_vm._t("default")],
        2
      )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/navigator/index.vue?vue&type=template&id=c893a598&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/navigator/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var OPEN_TYPES = ['navigate', 'redirect', 'switchTab', 'reLaunch', 'navigateBack'];
/* harmony default export */ var navigatorvue_type_script_lang_js_ = ({
  name: 'Navigator',
  mixins: [mixins["b" /* hover */]],
  props: {
    hoverClass: {
      type: String,
      default: 'navigator-hover'
    },
    url: {
      type: String,
      default: ''
    },
    openType: {
      type: String,
      default: 'navigate',
      validator: function validator(value) {
        return ~OPEN_TYPES.indexOf(value);
      }
    },
    delta: {
      type: Number,
      default: 1
    },
    hoverStartTime: {
      type: Number,
      default: 20
    },
    hoverStayTime: {
      type: Number,
      default: 600
    }
  },
  methods: {
    _onClick: function _onClick($event) {
      if (this.openType !== 'navigateBack' && !this.url) {
        console.error("<navigator/> should have url attribute when using navigateTo, redirectTo, reLaunch or switchTab");
        return;
      }

      switch (this.openType) {
        case 'navigate':
          uni.navigateTo({
            url: this.url
          });
          break;

        case 'redirect':
          uni.redirectTo({
            url: this.url
          });
          break;

        case 'switchTab':
          uni.switchTab({
            url: this.url
          });
          break;

        case 'reLaunch':
          uni.reLaunch({
            url: this.url
          });
          break;

        case 'navigateBack':
          uni.navigateBack({
            delta: this.delta
          });
          break;

        default:
          break;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/core/view/components/navigator/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_navigatorvue_type_script_lang_js_ = (navigatorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/navigator/index.vue?vue&type=style&index=0&lang=css&
var navigatorvue_type_style_index_0_lang_css_ = __webpack_require__(76);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/navigator/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_navigatorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/navigator/index.vue"
/* harmony default export */ var components_navigator = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/image/index.vue?vue&type=template&id=c7af6f90&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "uni-image",
    _vm._g({}, _vm.$listeners),
    [
      _c("div", { ref: "content", style: _vm.modeStyle }),
      _c("img", { attrs: { src: _vm.realImagePath } }),
      _vm.mode === "widthFix"
        ? _c("v-uni-resize-sensor", {
            ref: "sensor",
            on: { resize: _vm._resize }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/image/index.vue?vue&type=template&id=c7af6f90&

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/image/index.vue?vue&type=script&lang=js&
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var imagevue_type_script_lang_js_ = ({
  name: 'Image',
  props: {
    src: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'scaleToFill'
    },
    // TODO 懒加载
    lazyLoad: {
      type: [Boolean, String],
      default: false
    }
  },
  data: function data() {
    return {
      originalWidth: 0,
      originalHeight: 0,
      availHeight: '',
      sizeFixed: false
    };
  },
  computed: {
    ratio: function ratio() {
      return this.originalWidth && this.originalHeight ? this.originalWidth / this.originalHeight : 0;
    },
    realImagePath: function realImagePath() {
      return this.src && this.$getRealPath(this.src);
    },
    modeStyle: function modeStyle() {
      var size = 'auto';
      var position = '';
      var repeat = 'no-repeat';

      switch (this.mode) {
        case 'aspectFit':
          size = 'contain';
          position = 'center center';
          break;

        case 'aspectFill':
          size = 'cover';
          position = 'center center';
          break;

        case 'widthFix':
          size = '100% 100%';
          break;

        case 'top':
          position = 'center top';
          break;

        case 'bottom':
          position = 'center bottom';
          break;

        case 'center':
          position = 'center center';
          break;

        case 'left':
          position = 'left center';
          break;

        case 'right':
          position = 'right center';
          break;

        case 'top left':
          position = 'left top';
          break;

        case 'top right':
          position = 'right top';
          break;

        case 'bottom left':
          position = 'left bottom';
          break;

        case 'bottom right':
          position = 'right bottom';
          break;

        default:
          size = '100% 100%';
          position = '0% 0%';
          break;
      }

      return "background-position:".concat(position, ";background-size:").concat(size, ";background-repeat:").concat(repeat, ";");
    }
  },
  watch: {
    src: function src(newValue, oldValue) {
      this._loadImage();
    },
    mode: function mode(newValue, oldValue) {
      if (oldValue === 'widthFix') {
        this.$el.style.height = this.availHeight;
        this.sizeFixed = false;
      }

      if (newValue === 'widthFix' && this.ratio) {
        this._fixSize();
      }
    }
  },
  mounted: function mounted() {
    this.availHeight = this.$el.style.height || '';

    this._loadImage();
  },
  methods: {
    _resize: function _resize() {
      if (this.mode === 'widthFix' && !this.sizeFixed) {
        this._fixSize();
      }
    },
    _fixSize: function _fixSize() {
      var elWidth = this._getWidth();

      if (elWidth) {
        var height = elWidth / this.ratio; // fix: 解决 Chrome 浏览器上某些情况下导致 1px 缝隙的问题

        if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) && navigator.vendor === 'Google Inc.' && height > 10) {
          height = Math.round(height / 2) * 2;
        }

        this.$el.style.height = height + 'px';
        this.sizeFixed = true;
      }
    },
    _loadImage: function _loadImage() {
      this.$refs.content.style.backgroundImage = this.src ? "url(".concat(this.realImagePath, ")") : 'none';

      var _self = this;

      var img = new Image();

      img.onload = function ($event) {
        _self.originalWidth = this.width;
        _self.originalHeight = this.height;

        if (_self.mode === 'widthFix') {
          _self._fixSize();
        }

        _self.$trigger('load', $event, {
          width: this.width,
          height: this.height
        });
      };

      img.onerror = function ($event) {
        _self.$trigger('error', $event, {
          errMsg: "GET ".concat(_self.src, " 404 (Not Found)")
        });
      };

      img.src = this.realImagePath;
    },
    _getWidth: function _getWidth() {
      var computedStyle = window.getComputedStyle(this.$el);
      var borderWidth = (parseFloat(computedStyle.borderLeftWidth, 10) || 0) + (parseFloat(computedStyle.borderRightWidth, 10) || 0);
      var paddingWidth = (parseFloat(computedStyle.paddingLeft, 10) || 0) + (parseFloat(computedStyle.paddingRight, 10) || 0);
      return this.$el.offsetWidth - borderWidth - paddingWidth;
    }
  }
});
// CONCATENATED MODULE: ./src/core/view/components/image/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_imagevue_type_script_lang_js_ = (imagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/image/index.vue?vue&type=style&index=0&lang=css&
var imagevue_type_style_index_0_lang_css_ = __webpack_require__(72);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/image/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_imagevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/image/index.vue"
/* harmony default export */ var components_image = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/input/index.vue?vue&type=template&id=c65e1032&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "uni-input",
    _vm._g(
      {
        on: {
          change: function($event) {
            $event.stopPropagation()
          }
        }
      },
      _vm.$listeners
    ),
    [
      _c("div", { ref: "wrapper", staticClass: "uni-input-wrapper" }, [
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: !(_vm.composing || _vm.inputValue.length),
                expression: "!(composing || inputValue.length)"
              }
            ],
            ref: "placeholder",
            staticClass: "uni-input-placeholder",
            class: _vm.placeholderClass,
            style: _vm.placeholderStyle
          },
          [_vm._v(_vm._s(_vm.placeholder))]
        ),
        _vm.inputType === "checkbox"
          ? _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.inputValue,
                  expression: "inputValue"
                }
              ],
              ref: "input",
              staticClass: "uni-input-input",
              attrs: {
                disabled: _vm.disabled,
                maxlength: _vm.maxlength,
                step: _vm.step,
                autocomplete: "off",
                type: "checkbox"
              },
              domProps: {
                checked: Array.isArray(_vm.inputValue)
                  ? _vm._i(_vm.inputValue, null) > -1
                  : _vm.inputValue
              },
              on: {
                focus: _vm._onFocus,
                blur: _vm._onBlur,
                input: function($event) {
                  $event.stopPropagation()
                  return _vm._onInput($event)
                },
                compositionstart: _vm._onComposition,
                compositionend: _vm._onComposition,
                keyup: function($event) {
                  $event.stopPropagation()
                  return _vm._onKeyup($event)
                },
                change: function($event) {
                  var $$a = _vm.inputValue,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false
                  if (Array.isArray($$a)) {
                    var $$v = null,
                      $$i = _vm._i($$a, $$v)
                    if ($$el.checked) {
                      $$i < 0 && (_vm.inputValue = $$a.concat([$$v]))
                    } else {
                      $$i > -1 &&
                        (_vm.inputValue = $$a
                          .slice(0, $$i)
                          .concat($$a.slice($$i + 1)))
                    }
                  } else {
                    _vm.inputValue = $$c
                  }
                }
              }
            })
          : _vm.inputType === "radio"
          ? _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.inputValue,
                  expression: "inputValue"
                }
              ],
              ref: "input",
              staticClass: "uni-input-input",
              attrs: {
                disabled: _vm.disabled,
                maxlength: _vm.maxlength,
                step: _vm.step,
                autocomplete: "off",
                type: "radio"
              },
              domProps: { checked: _vm._q(_vm.inputValue, null) },
              on: {
                focus: _vm._onFocus,
                blur: _vm._onBlur,
                input: function($event) {
                  $event.stopPropagation()
                  return _vm._onInput($event)
                },
                compositionstart: _vm._onComposition,
                compositionend: _vm._onComposition,
                keyup: function($event) {
                  $event.stopPropagation()
                  return _vm._onKeyup($event)
                },
                change: function($event) {
                  _vm.inputValue = null
                }
              }
            })
          : _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.inputValue,
                  expression: "inputValue"
                }
              ],
              ref: "input",
              staticClass: "uni-input-input",
              attrs: {
                disabled: _vm.disabled,
                maxlength: _vm.maxlength,
                step: _vm.step,
                autocomplete: "off",
                type: _vm.inputType
              },
              domProps: { value: _vm.inputValue },
              on: {
                focus: _vm._onFocus,
                blur: _vm._onBlur,
                input: [
                  function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.inputValue = $event.target.value
                  },
                  function($event) {
                    $event.stopPropagation()
                    return _vm._onInput($event)
                  }
                ],
                compositionstart: _vm._onComposition,
                compositionend: _vm._onComposition,
                keyup: function($event) {
                  $event.stopPropagation()
                  return _vm._onKeyup($event)
                }
              }
            })
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/input/index.vue?vue&type=template&id=c65e1032&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/input/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var INPUT_TYPES = ['text', 'number', 'idcard', 'digit', 'password'];
var NUMBER_TYPES = ['number', 'digit'];
/* harmony default export */ var inputvue_type_script_lang_js_ = ({
  name: 'Input',
  mixins: [mixins["a" /* emitter */]],
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    password: {
      type: [Boolean, String],
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    placeholderStyle: {
      type: String,
      default: ''
    },
    placeholderClass: {
      type: String,
      default: ''
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    maxlength: {
      type: [Number, String],
      default: 140
    },
    focus: {
      type: [Boolean, String],
      default: false
    },
    confirmType: {
      type: String,
      default: 'done'
    }
  },
  data: function data() {
    return {
      inputValue: this.value + '',
      composing: false,
      wrapperHeight: 0,
      cachedValue: ''
    };
  },
  computed: {
    inputType: function inputType() {
      var type = '';

      switch (this.type) {
        case 'text':
          this.confirmType === 'search' && (type = 'search');
          break;

        case 'idcard':
          // TODO 可能要根据不同平台进行区分处理
          type = 'text';
          break;

        case 'digit':
          type = 'number';
          break;

        default:
          type = ~INPUT_TYPES.indexOf(this.type) ? this.type : 'text';
          break;
      }

      return this.password ? 'password' : type;
    },
    step: function step() {
      // 处理部分设备中无法输入小数点的问题
      return ~NUMBER_TYPES.indexOf(this.type) ? '0.000000000000000001' : '';
    }
  },
  watch: {
    focus: function focus(value) {
      value && this._focusInput();
    },
    value: function value(_value) {
      this.inputValue = _value + '';
    },
    inputValue: function inputValue(value) {
      this.$emit('update:value', value);
    },
    maxlength: function maxlength(value) {
      var realValue = this.inputValue.slice(0, parseInt(value, 10));
      realValue !== this.inputValue && (this.inputValue = realValue);
    }
  },
  created: function created() {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'add',
      vm: this
    });
  },
  mounted: function mounted() {
    if (this.confirmType === 'search') {
      var formElem = document.createElement('form');
      formElem.action = '';

      formElem.onsubmit = function () {
        return false;
      };

      formElem.className = 'uni-input-form';
      formElem.appendChild(this.$refs.input);
      this.$refs.wrapper.appendChild(formElem);
    }

    var $vm = this;

    while ($vm) {
      var scopeId = $vm.$options._scopeId;

      if (scopeId) {
        this.$refs.placeholder.setAttribute(scopeId, '');
      }

      $vm = $vm.$parent;
    }

    this.focus && this._focusInput();
  },
  beforeDestroy: function beforeDestroy() {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    });
  },
  methods: {
    _onKeyup: function _onKeyup($event) {
      if ($event.keyCode === 13) {
        this.$trigger('confirm', $event, {
          value: $event.target.value
        });
      }
    },
    _onInput: function _onInput($event) {
      if (this.composing) {
        return;
      } // 处理部分输入法可以输入其它字符的情况


      if (~NUMBER_TYPES.indexOf(this.type)) {
        if (this.$refs.input.validity && !this.$refs.input.validity.valid) {
          $event.target.value = this.cachedValue;
          this.inputValue = $event.target.value; // 输入非法字符不触发 input 事件

          return;
        } else {
          this.cachedValue = this.inputValue;
        }
      } // type="number" 不支持 maxlength 属性，因此需要主动限制长度。


      if (this.inputType === 'number') {
        var maxlength = parseInt(this.maxlength, 10);

        if (maxlength > 0 && $event.target.value.length > maxlength) {
          $event.target.value = $event.target.value.slice(0, maxlength);
          this.inputValue = $event.target.value; // 字符长度超出范围不触发 input 事件

          return;
        }
      }

      this.$trigger('input', $event, {
        value: this.inputValue
      });
    },
    _onFocus: function _onFocus($event) {
      this.$trigger('focus', $event, {
        value: $event.target.value
      });
    },
    _onBlur: function _onBlur($event) {
      this.$trigger('blur', $event, {
        value: $event.target.value
      });
    },
    _focusInput: function _focusInput() {
      var _this = this;

      setTimeout(function () {
        _this.$refs.input.focus();
      }, 350);
    },
    _blurInput: function _blurInput() {
      var _this2 = this;

      setTimeout(function () {
        _this2.$refs.input.blur();
      }, 350);
    },
    _onComposition: function _onComposition($event) {
      if ($event.type === 'compositionstart') {
        this.composing = true;
      } else {
        this.composing = false;
      }
    },
    _resetFormData: function _resetFormData() {
      this.inputValue = '';
    },
    _getFormData: function _getFormData() {
      return this.name ? {
        value: this.inputValue,
        key: this.name
      } : {};
    }
  }
});
// CONCATENATED MODULE: ./src/core/view/components/input/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_inputvue_type_script_lang_js_ = (inputvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/input/index.vue?vue&type=style&index=0&lang=css&
var inputvue_type_style_index_0_lang_css_ = __webpack_require__(73);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/input/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_inputvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/input/index.vue"
/* harmony default export */ var input = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/view/index.vue?vue&type=template&id=6ae9b1be&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.hoverClass && _vm.hoverClass !== "none"
    ? _c(
        "uni-view",
        _vm._g(
          {
            class: [_vm.hovering ? _vm.hoverClass : ""],
            on: {
              touchstart: _vm._hoverTouchStart,
              touchend: _vm._hoverTouchEnd,
              touchcancel: _vm._hoverTouchCancel
            }
          },
          _vm.$listeners
        ),
        [_vm._t("default")],
        2
      )
    : _c("uni-view", _vm._g({}, _vm.$listeners), [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/view/index.vue?vue&type=template&id=6ae9b1be&

// EXTERNAL MODULE: ./src/core/view/mixins/hover.js
var hover = __webpack_require__(12);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/view/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var viewvue_type_script_lang_js_ = ({
  name: 'View',
  mixins: [hover["a" /* default */]],
  listeners: {
    'label-click': 'clickHandler'
  }
});
// CONCATENATED MODULE: ./src/core/view/components/view/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_viewvue_type_script_lang_js_ = (viewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/view/index.vue?vue&type=style&index=0&lang=css&
var viewvue_type_style_index_0_lang_css_ = __webpack_require__(91);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/view/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_viewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/view/index.vue"
/* harmony default export */ var view = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/textarea/index.vue?vue&type=template&id=33f82dda&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "uni-textarea",
    _vm._g(
      {
        attrs: {
          value: _vm._checkEmpty(_vm.value),
          maxlength: _vm.maxlengthNumber,
          placeholder: _vm._checkEmpty(_vm.placeholder),
          disabled: _vm.disabled,
          focus: _vm.focus,
          "auto-focus": _vm.autoFocus,
          "placeholder-class": _vm._checkEmpty(_vm.placeholderClass),
          "placeholder-style": _vm._checkEmpty(_vm.placeholderStyle),
          "auto-height": _vm.autoHeight,
          cursor: _vm.cursorNumber,
          "selection-start": _vm.selectionStartNumber,
          "selection-end": _vm.selectionEndNumber
        },
        on: {
          change: function($event) {
            $event.stopPropagation()
          }
        }
      },
      _vm.$listeners
    ),
    [
      _c("div", { staticClass: "uni-textarea-wrapper" }, [
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: !(_vm.composition || _vm.valueSync.length),
                expression: "!(composition||valueSync.length)"
              }
            ],
            ref: "placeholder",
            staticClass: "uni-textarea-placeholder",
            class: _vm.placeholderClass,
            style: _vm.placeholderStyle
          },
          [_vm._v(_vm._s(_vm.placeholder))]
        ),
        _c(
          "div",
          { staticClass: "uni-textarea-compute" },
          [
            _vm._l(_vm.valueCompute, function(item, index) {
              return _c("div", { key: index }, [
                _vm._v(_vm._s(item.trim() ? item : "."))
              ])
            }),
            _c("v-uni-resize-sensor", {
              ref: "sensor",
              on: { resize: _vm._resize }
            })
          ],
          2
        ),
        _c("textarea", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.valueSync,
              expression: "valueSync"
            }
          ],
          ref: "textarea",
          staticClass: "uni-textarea-textarea",
          class: { "uni-textarea-textarea-ios": _vm.isIOS },
          attrs: {
            disabled: _vm.disabled,
            maxlength: _vm.maxlengthNumber,
            autofocus: _vm.autoFocus
          },
          domProps: { value: _vm.valueSync },
          on: {
            compositionstart: _vm._compositionstart,
            compositionend: _vm._compositionend,
            input: [
              function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.valueSync = $event.target.value
              },
              function($event) {
                $event.stopPropagation()
                return _vm._input($event)
              }
            ],
            focus: _vm._focus,
            blur: _vm._blur,
            "&touchstart": function($event) {
              return _vm._touchstart($event)
            }
          }
        })
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/textarea/index.vue?vue&type=template&id=33f82dda&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/textarea/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var textareavue_type_script_lang_js_ = ({
  name: 'Textarea',
  mixins: [mixins["a" /* emitter */]],
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    maxlength: {
      type: [Number, String],
      default: 140
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    focus: {
      type: [Boolean, String],
      default: false
    },
    autoFocus: {
      type: [Boolean, String],
      default: false
    },
    placeholderClass: {
      type: String,
      default: ''
    },
    placeholderStyle: {
      type: String,
      default: ''
    },
    autoHeight: {
      type: [Boolean, String],
      default: false
    },
    cursor: {
      type: [Number, String],
      default: -1
    },
    selectionStart: {
      type: [Number, String],
      default: -1
    },
    selectionEnd: {
      type: [Number, String],
      default: -1
    }
  },
  data: function data() {
    return {
      valueSync: String(this.value),
      valueComposition: '',
      composition: false,
      focusSync: this.focus,
      height: 0,
      focusChangeSource: '',
      isIOS: String(navigator.platform).indexOf('iP') === 0 && String(navigator.vendor).indexOf('Apple') === 0
    };
  },
  computed: {
    maxlengthNumber: function maxlengthNumber() {
      var maxlength = Number(this.maxlength);
      return isNaN(maxlength) ? 140 : maxlength;
    },
    cursorNumber: function cursorNumber() {
      var cursor = Number(this.cursor);
      return isNaN(cursor) ? -1 : cursor;
    },
    selectionStartNumber: function selectionStartNumber() {
      var selectionStart = Number(this.selectionStart);
      return isNaN(selectionStart) ? -1 : selectionStart;
    },
    selectionEndNumber: function selectionEndNumber() {
      var selectionEnd = Number(this.selectionEnd);
      return isNaN(selectionEnd) ? -1 : selectionEnd;
    },
    valueCompute: function valueCompute() {
      return (this.composition ? this.valueComposition : this.valueSync).split('\n');
    }
  },
  watch: {
    value: function value(val) {
      this.valueSync = String(val);
    },
    valueSync: function valueSync(val) {
      if (val !== this._oldValue) {
        this._oldValue = val;
        this.$trigger('input', {}, {
          value: val,
          cursor: this.$refs.textarea.selectionEnd
        });
        this.$emit('update:value', val);
      }
    },
    focus: function focus(val) {
      if (val) {
        this.focusChangeSource = 'focus';

        if (this.$refs.textarea) {
          this.$refs.textarea.focus();
        }
      } else {
        if (this.$refs.textarea) {
          this.$refs.textarea.blur();
        }
      }
    },
    focusSync: function focusSync(val) {
      this.$emit('update:focus', val);

      this._checkSelection();

      this._checkCursor();
    },
    cursorNumber: function cursorNumber() {
      this._checkCursor();
    },
    selectionStartNumber: function selectionStartNumber() {
      this._checkSelection();
    },
    selectionEndNumber: function selectionEndNumber() {
      this._checkSelection();
    },
    height: function height(_height) {
      var lineHeight = getComputedStyle(this.$el).lineHeight.replace('px', '');
      var lineCount = Math.round(_height / lineHeight);
      this.$trigger('linechange', {}, {
        height: _height,
        heightRpx: 750 / window.innerWidth * _height,
        lineCount: lineCount
      });

      if (this.autoHeight) {
        this.$el.style.height = this.height + 'px';
      }
    }
  },
  created: function created() {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'add',
      vm: this
    });
  },
  mounted: function mounted() {
    this._oldValue = this.$refs.textarea.value = this.valueSync;

    this._resize({
      height: this.$refs.sensor.$el.offsetHeight
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    });
  },
  methods: {
    _focus: function _focus($event) {
      this.focusSync = true;
      this.$trigger('focus', $event, {
        value: this.valueSync
      });
    },
    _checkSelection: function _checkSelection() {
      if (this.focusSync && !this.focusChangeSource && this.selectionStartNumber > -1 && this.selectionEndNumber > -1) {
        this.$refs.textarea.selectionStart = this.selectionStartNumber;
        this.$refs.textarea.selectionEnd = this.selectionEndNumber;
      }
    },
    _checkCursor: function _checkCursor() {
      if (this.focusSync && (this.focusChangeSource === 'focus' || !this.focusChangeSource && this.selectionStartNumber < 0 && this.selectionEndNumber < 0) && this.cursorNumber > -1) {
        this.$refs.textarea.selectionEnd = this.$refs.textarea.selectionStart = this.cursorNumber;
      }
    },
    _blur: function _blur($event) {
      this.focusSync = false;
      this.$trigger('blur', $event, {
        value: this.valueSync,
        cursor: this.$refs.textarea.selectionEnd
      });
    },
    _compositionstart: function _compositionstart($event) {
      this.composition = true;
    },
    _compositionend: function _compositionend($event) {
      this.composition = false;
    },
    // 暂无完成按钮，此功能未实现
    _confirm: function _confirm($event) {
      this.$trigger('confirm', $event, {
        value: this.valueSync
      });
    },
    _linechange: function _linechange($event) {
      this.$trigger('linechange', $event, {
        value: this.valueSync
      });
    },
    _touchstart: function _touchstart() {
      this.focusChangeSource = 'touch';
    },
    _resize: function _resize(_ref) {
      var height = _ref.height;
      this.height = height;
    },
    _input: function _input($event) {
      if (this.composition) {
        this.valueComposition = $event.target.value;
      }
    },
    _getFormData: function _getFormData() {
      return {
        value: this.valueSync,
        key: this.name
      };
    },
    _resetFormData: function _resetFormData() {
      this.valueSync = '';
    },
    _checkEmpty: function _checkEmpty(str) {
      return str || false;
    }
  }
});
// CONCATENATED MODULE: ./src/core/view/components/textarea/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_textareavue_type_script_lang_js_ = (textareavue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/textarea/index.vue?vue&type=style&index=0&lang=css&
var textareavue_type_style_index_0_lang_css_ = __webpack_require__(90);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/textarea/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_textareavue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/textarea/index.vue"
/* harmony default export */ var components_textarea = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/switch/index.vue?vue&type=template&id=04951fe6&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "uni-switch",
    _vm._g({ on: { click: _vm._onClick } }, _vm.$listeners),
    [
      _c("div", { staticClass: "uni-switch-wrapper" }, [
        _c("div", {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.type === "switch",
              expression: "type === 'switch'"
            }
          ],
          staticClass: "uni-switch-input",
          class: [_vm.switchChecked ? "uni-switch-input-checked" : ""],
          style: {
            backgroundColor: _vm.switchChecked ? _vm.color : "#DFDFDF",
            borderColor: _vm.switchChecked ? _vm.color : "#DFDFDF"
          }
        }),
        _c("div", {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.type === "checkbox",
              expression: "type === 'checkbox'"
            }
          ],
          staticClass: "uni-checkbox-input",
          class: [_vm.switchChecked ? "uni-checkbox-input-checked" : ""],
          style: { color: _vm.color }
        })
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/switch/index.vue?vue&type=template&id=04951fe6&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/switch/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var switchvue_type_script_lang_js_ = ({
  name: 'Switch',
  mixins: [mixins["a" /* emitter */], mixins["c" /* listeners */]],
  props: {
    name: {
      type: String,
      default: ''
    },
    checked: {
      type: [Boolean, String],
      default: false
    },
    type: {
      type: String,
      default: 'switch'
    },
    id: {
      type: String,
      default: ''
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: '#007aff'
    }
  },
  data: function data() {
    return {
      switchChecked: this.checked
    };
  },
  watch: {
    checked: function checked(val) {
      this.switchChecked = val;
    }
  },
  created: function created() {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'add',
      vm: this
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    });
  },
  listeners: {
    'label-click': '_onClick',
    '@label-click': '_onClick'
  },
  methods: {
    _onClick: function _onClick($event) {
      if (this.disabled) {
        return;
      }

      this.switchChecked = !this.switchChecked;
      this.$trigger('change', $event, {
        value: this.switchChecked
      });
    },
    _resetFormData: function _resetFormData() {
      this.switchChecked = false;
    },
    _getFormData: function _getFormData() {
      var data = {};

      if (this.name !== '') {
        data['value'] = this.switchChecked;
        data['key'] = this.name;
      }

      return data;
    }
  }
});
// CONCATENATED MODULE: ./src/core/view/components/switch/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_switchvue_type_script_lang_js_ = (switchvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/switch/index.vue?vue&type=style&index=0&lang=css&
var switchvue_type_style_index_0_lang_css_ = __webpack_require__(88);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/switch/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_switchvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/switch/index.vue"
/* harmony default export */ var components_switch = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/swiper-item/index.vue?vue&type=template&id=3883b065&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "uni-swiper-item",
    _vm._g({}, _vm.$listeners),
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/swiper-item/index.vue?vue&type=template&id=3883b065&

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/swiper-item/index.vue?vue&type=script&lang=js&
//
//
//
//
//
/* harmony default export */ var swiper_itemvue_type_script_lang_js_ = ({
  name: 'SwiperItem',
  props: {
    itemId: {
      type: String,
      default: ''
    }
  },
  mounted: function mounted() {
    var $el = this.$el;
    $el.style.position = 'absolute';
    $el.style.width = '100%';
    $el.style.height = '100%';
    var callbacks = this.$vnode._callbacks;

    if (callbacks) {
      callbacks.forEach(function (callback) {
        callback();
      });
    }
  }
});
// CONCATENATED MODULE: ./src/core/view/components/swiper-item/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_swiper_itemvue_type_script_lang_js_ = (swiper_itemvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/swiper-item/index.vue?vue&type=style&index=0&lang=css&
var swiper_itemvue_type_style_index_0_lang_css_ = __webpack_require__(86);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/swiper-item/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_swiper_itemvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/swiper-item/index.vue"
/* harmony default export */ var swiper_item = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/icon/index.vue?vue&type=template&id=6c7a7a92&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("uni-icon", [
    _c("i", {
      class: "uni-icon-" + _vm.type,
      style: { "font-size": _vm._converPx(_vm.size), color: _vm.color },
      attrs: { role: "img" }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/icon/index.vue?vue&type=template&id=6c7a7a92&

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/icon/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var iconvue_type_script_lang_js_ = ({
  name: 'Icon',
  props: {
    type: {
      type: String,
      required: true,
      default: ''
    },
    size: {
      type: [String, Number],
      default: 23
    },
    color: {
      type: String,
      default: ''
    }
  },
  methods: {
    _converPx: function _converPx(value) {
      if (/\d+[ur]px$/i.test(value)) {
        value.replace(/\d+[ur]px$/i, function (text) {
          return "".concat(uni.upx2px(parseFloat(text)), "px");
        }); // eslint-disable-next-line no-useless-escape
      } else if (/^-?[\d\.]+$/.test(value)) {
        return "".concat(value, "px");
      }

      return value || '';
    }
  }
});
// CONCATENATED MODULE: ./src/core/view/components/icon/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_iconvue_type_script_lang_js_ = (iconvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/icon/index.vue?vue&type=style&index=0&lang=css&
var iconvue_type_style_index_0_lang_css_ = __webpack_require__(71);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/icon/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_iconvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/icon/index.vue"
/* harmony default export */ var icon = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./packages/uni-app-plus/dist/view.runtime.esm.js
var view_runtime_esm = __webpack_require__(8);

// CONCATENATED MODULE: ./src/core/helpers/get-real-route.js
function getRealRoute(fromRoute, toRoute) {
  if (!toRoute) {
    toRoute = fromRoute;

    if (toRoute.indexOf('/') === 0) {
      return toRoute;
    }

    var pages = getCurrentPages();

    if (pages.length) {
      fromRoute = pages[pages.length - 1].$page.route;
    } else {
      fromRoute = '';
    }
  } else {
    if (toRoute.indexOf('/') === 0) {
      return toRoute;
    }
  }

  if (toRoute.indexOf('./') === 0) {
    return getRealRoute(fromRoute, toRoute.substr(2));
  }

  var toRouteArray = toRoute.split('/');
  var toRouteLength = toRouteArray.length;
  var i = 0;

  for (; i < toRouteLength && toRouteArray[i] === '..'; i++) {// noop
  }

  toRouteArray.splice(0, i);
  toRoute = toRouteArray.join('/');
  var fromRouteArray = fromRoute.length > 0 ? fromRoute.split('/') : [];
  fromRouteArray.splice(fromRouteArray.length - i - 1, i + 1);
  return '/' + fromRouteArray.concat(toRouteArray).join('/');
}
// CONCATENATED MODULE: ./src/platforms/app-plus/helpers/get-real-path.js

var SCHEME_RE = /^([a-z-]+:)?\/\//i;
var DATA_RE = /^data:.*,.*/;

function addBase(filePath) {
  return filePath;
}

function getRealPath(filePath) {
  if (filePath.indexOf('/') === 0) {
    if (filePath.indexOf('//') === 0) {
      filePath = 'https:' + filePath;
    } else {
      return addBase(filePath.substr(1));
    }
  } // 网络资源或base64


  if (SCHEME_RE.test(filePath) || DATA_RE.test(filePath) || filePath.indexOf('blob:') === 0) {
    return filePath;
  }

  var pages = getCurrentPages();

  if (pages.length) {
    return addBase(getRealRoute(pages[pages.length - 1].$page.route, filePath).substr(1));
  }

  return filePath;
}
// EXTERNAL MODULE: ./src/core/view/plugins/events.js + 1 modules
var events = __webpack_require__(10);

// CONCATENATED MODULE: ./src/core/view/mixins/base.js


/* harmony default export */ var base = ({
  methods: {
    $getRealPath: function $getRealPath(src) {
      return getRealPath(src);
    },
    $trigger: function $trigger(name, $event, detail) {
      this.$emit(name, events["b" /* processEvent */].call(this, name, $event, detail, this.$el, this.$el));
    }
  }
});
// CONCATENATED MODULE: ./src/core/view/mixins/animation.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function converPx(value) {
  if (/\d+[ur]px$/i.test(value)) {
    value.replace(/\d+[ur]px$/i, function (text) {
      return "".concat(uni.upx2px(parseFloat(text)), "px");
    }); // eslint-disable-next-line no-useless-escape
  } else if (/^-?[\d\.]+$/.test(value)) {
    return "".concat(value, "px");
  }

  return value || '';
}

function converType(type) {
  return type.replace(/[A-Z]/g, function (text) {
    return "-".concat(text.toLowerCase());
  }).replace('webkit', '-webkit');
}

function getStyle(action) {
  var animateTypes1 = ['matrix', 'matrix3d', 'scale', 'scale3d', 'rotate3d', 'skew', 'translate', 'translate3d'];
  var animateTypes2 = ['scaleX', 'scaleY', 'scaleZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'skewX', 'skewY', 'translateX', 'translateY', 'translateZ'];
  var animateTypes3 = ['opacity', 'backgroundColor'];
  var animateTypes4 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
  var animates = action.animates;
  var option = action.option;
  var transition = option.transition;
  var style = {};
  var transform = [];
  animates.forEach(function (animate) {
    var type = animate.type;

    var args = _toConsumableArray(animate.args);

    if (animateTypes1.concat(animateTypes2).includes(type)) {
      if (type.startsWith('rotate') || type.startsWith('skew')) {
        args = args.map(function (value) {
          return parseFloat(value) + 'deg';
        });
      } else if (type.startsWith('translate')) {
        args = args.map(converPx);
      }

      if (animateTypes2.indexOf(type)) {
        args.length = 1;
      }

      transform.push("".concat(type, "(").concat(args.join(','), ")"));
    } else if (animateTypes3.concat(animateTypes4).includes(args[0])) {
      type = args[0];
      var value = args[1];
      style[type] = animateTypes4.includes(type) ? converPx(value) : value;
    }
  });
  style.transform = style.webkitTransform = transform.join(' ');
  style.transition = style.webkitTransition = Object.keys(style).map(function (type) {
    return "".concat(converType(type), " ").concat(transition.duration, "ms ").concat(transition.timingFunction, " ").concat(transition.delay, "ms");
  }).join(',');
  style.transformOrigin = style.webkitTransformOrigin = option.transformOrigin;
  return style;
}

function startAnimation(context) {
  var animation = context.animation;

  if (!animation || !animation.actions || !animation.actions.length) {
    return;
  }

  var index = 0;
  var actions = animation.actions;
  var length = animation.actions.length;

  function animate() {
    var action = actions[index];
    var transition = action.option.transition;
    var style = getStyle(action);
    Object.keys(style).forEach(function (key) {
      context.$el.style[key] = style[key];
    });
    index += 1;

    if (index < length) {
      setTimeout(animate, transition.duration + transition.delay);
    }
  }

  animate();
}

/* harmony default export */ var animation = ({
  props: ['animation'],
  watch: {
    animation: function animation() {
      startAnimation(this);
    }
  },
  mounted: function mounted() {
    startAnimation(this);
  }
});
// CONCATENATED MODULE: ./src/core/view/components/index.js



var requireComponents = [// baseComponents
__webpack_require__(66), __webpack_require__(92)];
requireComponents.forEach(function (components, index) {
  components.keys().forEach(function (fileName) {
    // 获取组件配置
    var componentModule = components(fileName);
    var componentConfig = componentModule.default || componentModule;
    componentConfig.mixins = componentConfig.mixins ? [].concat(base, componentConfig.mixins) : [base];
    componentConfig.mixins.push(animation);
    componentConfig.name = 'VUni' + componentConfig.name;
    componentConfig.isReserved = true; // 全局注册组件

    view_runtime_esm["a" /* default */].component(componentConfig.name, componentConfig);
  });
});

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/scroll-view/index.vue?vue&type=template&id=e9d562fc&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("uni-scroll-view", _vm._g({}, _vm.$listeners), [
    _c("div", { ref: "wrap", staticClass: "uni-scroll-view" }, [
      _c(
        "div",
        {
          ref: "main",
          staticClass: "uni-scroll-view",
          style: {
            "overflow-x": _vm.scrollX ? "auto" : "hidden",
            "overflow-y": _vm.scrollY ? "auto" : "hidden"
          }
        },
        [_c("div", { ref: "content" }, [_vm._t("default")], 2)]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/scroll-view/index.vue?vue&type=template&id=e9d562fc&

// EXTERNAL MODULE: ./src/core/view/mixins/scroller/index.js + 2 modules
var scroller = __webpack_require__(45);

// EXTERNAL MODULE: ./src/shared/index.js + 4 modules
var shared = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/scroll-view/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var passiveOptions = shared["f" /* supportsPassive */] ? {
  passive: true
} : false;
/* harmony default export */ var scroll_viewvue_type_script_lang_js_ = ({
  name: 'ScrollView',
  mixins: [scroller["a" /* default */]],
  props: {
    scrollX: {
      type: [Boolean, String],
      default: false
    },
    scrollY: {
      type: [Boolean, String],
      default: false
    },
    upperThreshold: {
      type: [Number, String],
      default: 50
    },
    lowerThreshold: {
      type: [Number, String],
      default: 50
    },
    scrollTop: {
      type: [Number, String],
      default: 0
    },
    scrollLeft: {
      type: [Number, String],
      default: 0
    },
    scrollIntoView: {
      type: String,
      default: ''
    },
    scrollWithAnimation: {
      type: [Boolean, String],
      default: false
    },
    enableBackToTop: {
      type: [Boolean, String],
      default: false
    }
  },
  data: function data() {
    return {
      lastScrollTop: this.scrollTopNumber,
      lastScrollLeft: this.scrollLeftNumber,
      lastScrollToUpperTime: 0,
      lastScrollToLowerTime: 0
    };
  },
  computed: {
    upperThresholdNumber: function upperThresholdNumber() {
      var val = Number(this.upperThreshold);
      return isNaN(val) ? 50 : val;
    },
    lowerThresholdNumber: function lowerThresholdNumber() {
      var val = Number(this.lowerThreshold);
      return isNaN(val) ? 50 : val;
    },
    scrollTopNumber: function scrollTopNumber() {
      return Number(this.scrollTop) || 0;
    },
    scrollLeftNumber: function scrollLeftNumber() {
      return Number(this.scrollLeft) || 0;
    }
  },
  watch: {
    scrollTopNumber: function scrollTopNumber(val) {
      this._scrollTopChanged(val);
    },
    scrollLeftNumber: function scrollLeftNumber(val) {
      this._scrollLeftChanged(val);
    },
    scrollIntoView: function scrollIntoView(val) {
      this._scrollIntoViewChanged(val);
    }
  },
  mounted: function mounted() {
    var self = this;
    this._attached = true;

    this._scrollTopChanged(this.scrollTopNumber);

    this._scrollLeftChanged(this.scrollLeftNumber);

    this._scrollIntoViewChanged(this.scrollIntoView);

    this.__handleScroll = function (e) {
      event.preventDefault();
      event.stopPropagation();

      self._handleScroll.bind(self, event)();
    };

    var touchStart = null;
    var needStop = null;

    this.__handleTouchMove = function (event) {
      var x = event.touches[0].pageX;
      var y = event.touches[0].pageY;
      var main = self.$refs.main;

      if (needStop === null) {
        if (Math.abs(x - touchStart.x) > Math.abs(y - touchStart.y)) {
          // 横向滑动
          if (self.scrollX) {
            if (main.scrollLeft === 0 && x > touchStart.x) {
              needStop = false;
              return;
            } else if (main.scrollWidth === main.offsetWidth + main.scrollLeft && x < touchStart.x) {
              needStop = false;
              return;
            }

            needStop = true;
          } else {
            needStop = false;
          }
        } else {
          // 纵向滑动
          if (self.scrollY) {
            if (main.scrollTop === 0 && y > touchStart.y) {
              needStop = false;
              return;
            } else if (main.scrollHeight === main.offsetHeight + main.scrollTop && y < touchStart.y) {
              needStop = false;
              return;
            }

            needStop = true;
          } else {
            needStop = false;
          }
        }
      }

      if (needStop) {
        event.stopPropagation();
      }
    };

    this.__handleTouchStart = function (event) {
      if (event.touches.length === 1) {
        needStop = null;
        touchStart = {
          x: event.touches[0].pageX,
          y: event.touches[0].pageY
        };
      }
    };

    this.$refs.main.addEventListener('touchstart', this.__handleTouchStart, passiveOptions);
    this.$refs.main.addEventListener('touchmove', this.__handleTouchMove, passiveOptions);
    this.$refs.main.addEventListener('scroll', this.__handleScroll, shared["f" /* supportsPassive */] ? {
      passive: false
    } : false);
  },
  activated: function activated() {
    // 还原 scroll-view 滚动位置
    this.scrollY && (this.$refs.main.scrollTop = this.lastScrollTop);
    this.scrollX && (this.$refs.main.scrollLeft = this.lastScrollLeft);
  },
  beforeDestroy: function beforeDestroy() {
    this.$refs.main.removeEventListener('touchstart', this.__handleTouchStart, passiveOptions);
    this.$refs.main.removeEventListener('touchmove', this.__handleTouchMove, passiveOptions);
    this.$refs.main.removeEventListener('scroll', this.__handleScroll, shared["f" /* supportsPassive */] ? {
      passive: false
    } : false);
  },
  methods: {
    scrollTo: function scrollTo(t, n) {
      var i = this.$refs.main;
      t < 0 ? t = 0 : n === 'x' && t > i.scrollWidth - i.offsetWidth ? t = i.scrollWidth - i.offsetWidth : n === 'y' && t > i.scrollHeight - i.offsetHeight && (t = i.scrollHeight - i.offsetHeight);
      var r = 0;
      var o = '';
      n === 'x' ? r = i.scrollLeft - t : n === 'y' && (r = i.scrollTop - t);

      if (r !== 0) {
        this.$refs.content.style.transition = 'transform .3s ease-out';
        this.$refs.content.style.webkitTransition = '-webkit-transform .3s ease-out';

        if (n === 'x') {
          o = 'translateX(' + r + 'px) translateZ(0)';
        } else {
          n === 'y' && (o = 'translateY(' + r + 'px) translateZ(0)');
        }

        this.$refs.content.removeEventListener('transitionend', this.__transitionEnd);
        this.$refs.content.removeEventListener('webkitTransitionEnd', this.__transitionEnd);
        this.__transitionEnd = this._transitionEnd.bind(this, t, n);
        this.$refs.content.addEventListener('transitionend', this.__transitionEnd);
        this.$refs.content.addEventListener('webkitTransitionEnd', this.__transitionEnd);

        if (n === 'x') {
          // if (e !== 'ios') {
          i.style.overflowX = 'hidden'; // }
        } else if (n === 'y') {
          i.style.overflowY = 'hidden';
        }

        this.$refs.content.style.transform = o;
        this.$refs.content.style.webkitTransform = o;
      }
    },
    _handleTrack: function _handleTrack($event) {
      if ($event.detail.state === 'start') {
        this._x = $event.detail.x;
        this._y = $event.detail.y;
        this._noBubble = null;
        return;
      }

      if ($event.detail.state === 'end') {
        this._noBubble = false;
      }

      if (this._noBubble === null && this.scrollY) {
        if (Math.abs(this._y - $event.detail.y) / Math.abs(this._x - $event.detail.x) > 1) {
          this._noBubble = true;
        } else {
          this._noBubble = false;
        }
      }

      if (this._noBubble === null && this.scrollX) {
        if (Math.abs(this._x - $event.detail.x) / Math.abs(this._y - $event.detail.y) > 1) {
          this._noBubble = true;
        } else {
          this._noBubble = false;
        }
      }

      this._x = $event.detail.x;
      this._y = $event.detail.y;

      if (this._noBubble) {
        $event.stopPropagation();
      }
    },
    _handleScroll: function _handleScroll($event) {
      if (!($event.timeStamp - this._lastScrollTime < 20)) {
        this._lastScrollTime = $event.timeStamp;
        var target = $event.target;
        this.$trigger('scroll', $event, {
          scrollLeft: target.scrollLeft,
          scrollTop: target.scrollTop,
          scrollHeight: target.scrollHeight,
          scrollWidth: target.scrollWidth,
          deltaX: this.lastScrollLeft - target.scrollLeft,
          deltaY: this.lastScrollTop - target.scrollTop
        });

        if (this.scrollY) {
          if (target.scrollTop <= this.upperThresholdNumber && this.lastScrollTop - target.scrollTop > 0 && $event.timeStamp - this.lastScrollToUpperTime > 200) {
            this.$trigger('scrolltoupper', $event, {
              direction: 'top'
            });
            this.lastScrollToUpperTime = $event.timeStamp;
          }

          if (target.scrollTop + target.offsetHeight + this.lowerThresholdNumber >= target.scrollHeight && this.lastScrollTop - target.scrollTop < 0 && $event.timeStamp - this.lastScrollToLowerTime > 200) {
            this.$trigger('scrolltolower', $event, {
              direction: 'bottom'
            });
            this.lastScrollToLowerTime = $event.timeStamp;
          }
        }

        if (this.scrollX) {
          if (target.scrollLeft <= this.upperThresholdNumber && this.lastScrollLeft - target.scrollLeft > 0 && $event.timeStamp - this.lastScrollToUpperTime > 200) {
            this.$trigger('scrolltoupper', $event, {
              direction: 'left'
            });
            this.lastScrollToUpperTime = $event.timeStamp;
          }

          if (target.scrollLeft + target.offsetWidth + this.lowerThresholdNumber >= target.scrollWidth && this.lastScrollLeft - target.scrollLeft < 0 && $event.timeStamp - this.lastScrollToLowerTime > 200) {
            this.$trigger('scrolltolower', $event, {
              direction: 'right'
            });
            this.lastScrollToLowerTime = $event.timeStamp;
          }
        }

        this.lastScrollTop = target.scrollTop;
        this.lastScrollLeft = target.scrollLeft;
      }
    },
    _scrollTopChanged: function _scrollTopChanged(val) {
      if (this.scrollY) {
        if (this._innerSetScrollTop) {
          this._innerSetScrollTop = false;
        } else {
          if (this.scrollWithAnimation) {
            this.scrollTo(val, 'y');
          } else {
            this.$refs.main.scrollTop = val;
          }
        }
      }
    },
    _scrollLeftChanged: function _scrollLeftChanged(val) {
      if (this.scrollX) {
        if (this._innerSetScrollLeft) {
          this._innerSetScrollLeft = false;
        } else {
          if (this.scrollWithAnimation) {
            this.scrollTo(val, 'x');
          } else {
            this.$refs.main.scrollLeft = val;
          }
        }
      }
    },
    _scrollIntoViewChanged: function _scrollIntoViewChanged(val) {
      if (val) {
        if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(val)) {
          console.group('scroll-into-view="' + val + '" 有误');
          console.error('id 属性值格式错误。如不能以数字开头。');
          console.groupEnd();
          return;
        }

        var element = this.$el.querySelector('#' + val);

        if (element) {
          var mainRect = this.$refs.main.getBoundingClientRect();
          var elRect = element.getBoundingClientRect();

          if (this.scrollX) {
            var left = elRect.left - mainRect.left;
            var scrollLeft = this.$refs.main.scrollLeft;
            var x = scrollLeft + left;

            if (this.scrollWithAnimation) {
              this.scrollTo(x, 'x');
            } else {
              this.$refs.main.scrollLeft = x;
            }
          }

          if (this.scrollY) {
            var top = elRect.top - mainRect.top;
            var scrollTop = this.$refs.main.scrollTop;
            var y = scrollTop + top;

            if (this.scrollWithAnimation) {
              this.scrollTo(y, 'y');
            } else {
              this.$refs.main.scrollTop = y;
            }
          }
        }
      }
    },
    _transitionEnd: function _transitionEnd(val, type) {
      this.$refs.content.style.transition = '';
      this.$refs.content.style.webkitTransition = '';
      this.$refs.content.style.transform = '';
      this.$refs.content.style.webkitTransform = '';
      var main = this.$refs.main;

      if (type === 'x') {
        main.style.overflowX = this.scrollX ? 'auto' : 'hidden';
        main.scrollLeft = val;
      } else if (type === 'y') {
        main.style.overflowY = this.scrollY ? 'auto' : 'hidden';
        main.scrollTop = val;
      }

      this.$refs.content.removeEventListener('transitionend', this.__transitionEnd);
      this.$refs.content.removeEventListener('webkitTransitionEnd', this.__transitionEnd);
    },
    getScrollPosition: function getScrollPosition() {
      var main = this.$refs.main;
      return {
        scrollLeft: main.scrollLeft,
        scrollTop: main.scrollTop
      };
    }
  }
});
// CONCATENATED MODULE: ./src/core/view/components/scroll-view/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_scroll_viewvue_type_script_lang_js_ = (scroll_viewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/scroll-view/index.vue?vue&type=style&index=0&lang=css&
var scroll_viewvue_type_style_index_0_lang_css_ = __webpack_require__(84);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/scroll-view/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_scroll_viewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/scroll-view/index.vue"
/* harmony default export */ var scroll_view = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/radio/index.vue?vue&type=template&id=4b562a50&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "uni-radio",
    _vm._g({ on: { click: _vm._onClick } }, _vm.$listeners),
    [
      _c(
        "div",
        { staticClass: "uni-radio-wrapper" },
        [
          _c("div", {
            staticClass: "uni-radio-input",
            class: _vm.radioChecked ? "uni-radio-input-checked" : "",
            style: _vm.radioChecked ? _vm.checkedStyle : ""
          }),
          _vm._t("default")
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/radio/index.vue?vue&type=template&id=4b562a50&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/radio/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var radiovue_type_script_lang_js_ = ({
  name: 'Radio',
  mixins: [mixins["a" /* emitter */], mixins["c" /* listeners */]],
  props: {
    checked: {
      type: [Boolean, String],
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: '#007AFF'
    },
    value: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      radioChecked: this.checked,
      radioValue: this.value
    };
  },
  computed: {
    checkedStyle: function checkedStyle() {
      return "background-color: ".concat(this.color, ";border-color: ").concat(this.color, ";");
    }
  },
  watch: {
    checked: function checked(val) {
      this.radioChecked = val;
    },
    value: function value(val) {
      this.radioValue = val;
    }
  },
  listeners: {
    'label-click': '_onClick',
    '@label-click': '_onClick'
  },
  created: function created() {
    this.$dispatch('RadioGroup', 'uni-radio-group-update', {
      type: 'add',
      vm: this
    });
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'add',
      vm: this
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.$dispatch('RadioGroup', 'uni-radio-group-update', {
      type: 'remove',
      vm: this
    });
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    });
  },
  methods: {
    _onClick: function _onClick($event) {
      if (this.disabled || this.radioChecked) {
        return;
      }

      this.radioChecked = true;
      this.$dispatch('RadioGroup', 'uni-radio-change', $event, this);
    },
    _resetFormData: function _resetFormData() {
      this.radioChecked = this.min;
    }
  }
});
// CONCATENATED MODULE: ./src/core/view/components/radio/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_radiovue_type_script_lang_js_ = (radiovue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/radio/index.vue?vue&type=style&index=0&lang=css&
var radiovue_type_style_index_0_lang_css_ = __webpack_require__(82);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/radio/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_radiovue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/radio/index.vue"
/* harmony default export */ var components_radio = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/checkbox-group/index.vue?vue&type=template&id=37cde58e&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "uni-checkbox-group",
    _vm._g({}, _vm.$listeners),
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/checkbox-group/index.vue?vue&type=template&id=37cde58e&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/checkbox-group/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//

/* harmony default export */ var checkbox_groupvue_type_script_lang_js_ = ({
  name: 'CheckboxGroup',
  mixins: [mixins["a" /* emitter */], mixins["c" /* listeners */]],
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      checkboxList: []
    };
  },
  listeners: {
    '@checkbox-change': '_changeHandler',
    '@checkbox-group-update': '_checkboxGroupUpdateHandler'
  },
  created: function created() {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'add',
      vm: this
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    });
  },
  methods: {
    _changeHandler: function _changeHandler($event) {
      var value = [];
      this.checkboxList.forEach(function (vm) {
        if (vm.checkboxChecked) {
          value.push(vm.value);
        }
      });
      this.$trigger('change', $event, {
        value: value
      });
    },
    _checkboxGroupUpdateHandler: function _checkboxGroupUpdateHandler($event) {
      if ($event.type === 'add') {
        this.checkboxList.push($event.vm);
      } else {
        var index = this.checkboxList.indexOf($event.vm);
        this.checkboxList.splice(index, 1);
      }
    },
    _getFormData: function _getFormData() {
      var data = {};

      if (this.name !== '') {
        var value = [];
        this.checkboxList.forEach(function (vm) {
          if (vm.checkboxChecked) {
            value.push(vm.value);
          }
        });
        data['value'] = value;
        data['key'] = this.name;
      }

      return data;
    }
  }
});
// CONCATENATED MODULE: ./src/core/view/components/checkbox-group/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_checkbox_groupvue_type_script_lang_js_ = (checkbox_groupvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/checkbox-group/index.vue?vue&type=style&index=0&lang=css&
var checkbox_groupvue_type_style_index_0_lang_css_ = __webpack_require__(69);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/checkbox-group/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_checkbox_groupvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/checkbox-group/index.vue"
/* harmony default export */ var checkbox_group = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/radio-group/index.vue?vue&type=template&id=17be8d0a&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "uni-radio-group",
    _vm._g({}, _vm.$listeners),
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/radio-group/index.vue?vue&type=template&id=17be8d0a&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/radio-group/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//

/* harmony default export */ var radio_groupvue_type_script_lang_js_ = ({
  name: 'RadioGroup',
  mixins: [mixins["a" /* emitter */], mixins["c" /* listeners */]],
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      radioList: []
    };
  },
  listeners: {
    '@radio-change': '_changeHandler',
    '@radio-group-update': '_radioGroupUpdateHandler'
  },
  mounted: function mounted() {
    this._resetRadioGroupValue(this.radioList.length - 1);
  },
  created: function created() {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'add',
      vm: this
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    });
  },
  methods: {
    _changeHandler: function _changeHandler($event, vm) {
      var index = this.radioList.indexOf(vm);

      this._resetRadioGroupValue(index, true);

      this.$trigger('change', $event, {
        value: vm.radioValue
      });
    },
    _radioGroupUpdateHandler: function _radioGroupUpdateHandler($event) {
      if ($event.type === 'add') {
        this.radioList.push($event.vm);
      } else {
        var index = this.radioList.indexOf($event.vm);
        this.radioList.splice(index, 1);
      }
    },
    _resetRadioGroupValue: function _resetRadioGroupValue(key, change) {
      var _this = this;

      this.radioList.forEach(function (value, index) {
        if (index === key) {
          return;
        }

        if (change) {
          _this.radioList[index].radioChecked = false;
        } else {
          _this.radioList.forEach(function (v, i) {
            if (index >= i) {
              return;
            }

            if (_this.radioList[i].radioChecked) {
              _this.radioList[index].radioChecked = false;
            }
          });
        }
      });
    },
    _getFormData: function _getFormData() {
      var data = {};

      if (this.name !== '') {
        var value = '';
        this.radioList.forEach(function (vm) {
          if (vm.radioChecked) {
            value = vm.value;
          }
        });
        data['value'] = value;
        data['key'] = this.name;
      }

      return data;
    }
  }
});
// CONCATENATED MODULE: ./src/core/view/components/radio-group/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_radio_groupvue_type_script_lang_js_ = (radio_groupvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/radio-group/index.vue?vue&type=style&index=0&lang=css&
var radio_groupvue_type_style_index_0_lang_css_ = __webpack_require__(81);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/radio-group/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_radio_groupvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/radio-group/index.vue"
/* harmony default export */ var radio_group = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/progress/index.vue?vue&type=template&id=34f62046&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "uni-progress",
    _vm._g({ staticClass: "uni-progress" }, _vm.$listeners),
    [
      _c("div", { staticClass: "uni-progress-bar", style: _vm.outerBarStyle }, [
        _c("div", {
          staticClass: "uni-progress-inner-bar",
          style: _vm.innerBarStyle
        })
      ]),
      _vm.showInfo
        ? [
            _c("p", { staticClass: "uni-progress-info" }, [
              _vm._v(_vm._s(_vm.currentPercent) + "%")
            ])
          ]
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/progress/index.vue?vue&type=template&id=34f62046&

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/progress/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var VALUES = {
  activeColor: '#007AFF',
  backgroundColor: '#EBEBEB',
  activeMode: 'backwards'
};
/* harmony default export */ var progressvue_type_script_lang_js_ = ({
  name: 'Progress',
  props: {
    percent: {
      type: [Number, String],
      default: 0,
      validator: function validator(value) {
        return !isNaN(parseFloat(value, 10));
      }
    },
    showInfo: {
      type: [Boolean, String],
      default: false
    },
    strokeWidth: {
      type: [Number, String],
      default: 6,
      validator: function validator(value) {
        return !isNaN(parseFloat(value, 10));
      }
    },
    color: {
      type: String,
      default: VALUES.activeColor
    },
    activeColor: {
      type: String,
      default: VALUES.activeColor
    },
    backgroundColor: {
      type: String,
      default: VALUES.backgroundColor
    },
    active: {
      type: [Boolean, String],
      default: false
    },
    activeMode: {
      type: String,
      default: VALUES.activeMode
    }
  },
  data: function data() {
    return {
      currentPercent: 0,
      strokeTimer: 0,
      lastPercent: 0
    };
  },
  computed: {
    outerBarStyle: function outerBarStyle() {
      return "background-color: ".concat(this.backgroundColor, "; height: ").concat(this.strokeWidth, "px;");
    },
    innerBarStyle: function innerBarStyle() {
      // 兼容下不推荐的属性，activeColor 优先级高于 color。
      var backgroundColor = '';

      if (this.color !== VALUES.activeColor && this.activeColor === VALUES.activeColor) {
        backgroundColor = this.color;
      } else {
        backgroundColor = this.activeColor;
      }

      return "width: ".concat(this.currentPercent, "%;background-color: ").concat(backgroundColor);
    },
    realPercent: function realPercent() {
      // 确保最终计算时使用的是 Number 类型的值，并且在有效范围内。
      var realValue = parseFloat(this.percent, 10);
      realValue < 0 && (realValue = 0);
      realValue > 100 && (realValue = 100);
      return realValue;
    }
  },
  watch: {
    realPercent: function realPercent(newValue, oldValue) {
      this.strokeTimer && clearInterval(this.strokeTimer);
      this.lastPercent = oldValue || 0;

      this._activeAnimation();
    }
  },
  created: function created() {
    this._activeAnimation();
  },
  methods: {
    _activeAnimation: function _activeAnimation() {
      var _this = this;

      if (this.active) {
        this.currentPercent = this.activeMode === VALUES.activeMode ? 0 : this.lastPercent;
        this.strokeTimer = setInterval(function () {
          if (_this.currentPercent + 1 > _this.realPercent) {
            _this.currentPercent = _this.realPercent;
            _this.strokeTimer && clearInterval(_this.strokeTimer);
          } else {
            _this.currentPercent += 1;
          }
        }, 30);
      } else {
        this.currentPercent = this.realPercent;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/core/view/components/progress/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_progressvue_type_script_lang_js_ = (progressvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/progress/index.vue?vue&type=style&index=0&lang=css&
var progressvue_type_style_index_0_lang_css_ = __webpack_require__(80);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/progress/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_progressvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/progress/index.vue"
/* harmony default export */ var progress = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/checkbox/index.vue?vue&type=template&id=a63c1348&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "uni-checkbox",
    _vm._g({ on: { click: _vm._onClick } }, _vm.$listeners),
    [
      _c(
        "div",
        { staticClass: "uni-checkbox-wrapper" },
        [
          _c("div", {
            staticClass: "uni-checkbox-input",
            class: [_vm.checkboxChecked ? "uni-checkbox-input-checked" : ""],
            style: { color: _vm.color }
          }),
          _vm._t("default")
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/checkbox/index.vue?vue&type=template&id=a63c1348&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/checkbox/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var checkboxvue_type_script_lang_js_ = ({
  name: 'Checkbox',
  mixins: [mixins["a" /* emitter */], mixins["c" /* listeners */]],
  props: {
    checked: {
      type: [Boolean, String],
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: '#007aff'
    },
    value: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      checkboxChecked: this.checked,
      checkboxValue: this.value
    };
  },
  watch: {
    checked: function checked(val) {
      this.checkboxChecked = val;
    },
    value: function value(val) {
      this.checkboxValue = val;
    }
  },
  listeners: {
    'label-click': '_onClick',
    '@label-click': '_onClick'
  },
  created: function created() {
    this.$dispatch('CheckboxGroup', 'uni-checkbox-group-update', {
      type: 'add',
      vm: this
    });
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'add',
      vm: this
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.$dispatch('CheckboxGroup', 'uni-checkbox-group-update', {
      type: 'remove',
      vm: this
    });
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    });
  },
  methods: {
    _onClick: function _onClick($event) {
      if (this.disabled) {
        return;
      }

      this.checkboxChecked = !this.checkboxChecked;
      this.$dispatch('CheckboxGroup', 'uni-checkbox-change', $event);
    },
    _resetFormData: function _resetFormData() {
      this.checkboxChecked = false;
    }
  }
});
// CONCATENATED MODULE: ./src/core/view/components/checkbox/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_checkboxvue_type_script_lang_js_ = (checkboxvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/checkbox/index.vue?vue&type=style&index=0&lang=css&
var checkboxvue_type_style_index_0_lang_css_ = __webpack_require__(70);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/checkbox/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_checkboxvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/checkbox/index.vue"
/* harmony default export */ var components_checkbox = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/form/index.vue?vue&type=template&id=7735a91d&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("uni-form", _vm._g({}, _vm.$listeners), [
    _c("span", [_vm._t("default")], 2)
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/form/index.vue?vue&type=template&id=7735a91d&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/form/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//

/* harmony default export */ var formvue_type_script_lang_js_ = ({
  name: 'Form',
  mixins: [mixins["c" /* listeners */]],
  data: function data() {
    return {
      childrenList: []
    };
  },
  listeners: {
    '@form-submit': '_onSubmit',
    '@form-reset': '_onReset',
    '@form-group-update': '_formGroupUpdateHandler'
  },
  methods: {
    _onSubmit: function _onSubmit($event) {
      var data = {};
      this.childrenList.forEach(function (vm) {
        if (vm._getFormData && vm._getFormData().key) {
          data[vm._getFormData().key] = vm._getFormData().value;
        }
      });
      this.$trigger('submit', $event, {
        value: data
      });
    },
    _onReset: function _onReset($event) {
      this.$trigger('reset', $event, {});
      this.childrenList.forEach(function (vm) {
        vm._resetFormData && vm._resetFormData();
      });
    },
    _formGroupUpdateHandler: function _formGroupUpdateHandler($event) {
      if ($event.type === 'add') {
        this.childrenList.push($event.vm);
      } else {
        var index = this.childrenList.indexOf($event.vm);
        this.childrenList.splice(index, 1);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/core/view/components/form/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_formvue_type_script_lang_js_ = (formvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/form/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_formvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/form/index.vue"
/* harmony default export */ var components_form = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/slider/index.vue?vue&type=template&id=1969bd7a&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "uni-slider",
    _vm._g({ ref: "uni-slider", on: { click: _vm._onClick } }, _vm.$listeners),
    [
      _c("div", { staticClass: "uni-slider-wrapper" }, [
        _c("div", { staticClass: "uni-slider-tap-area" }, [
          _c(
            "div",
            { staticClass: "uni-slider-handle-wrapper", style: _vm.setBgColor },
            [
              _c("div", {
                ref: "uni-slider-handle",
                staticClass: "uni-slider-handle",
                style: _vm.setBlockBg
              }),
              _c("div", {
                staticClass: "uni-slider-thumb",
                style: _vm.setBlockStyle
              }),
              _c("div", {
                staticClass: "uni-slider-track",
                style: _vm.setActiveColor
              })
            ]
          )
        ]),
        _c(
          "span",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.showValue,
                expression: "showValue"
              }
            ],
            staticClass: "uni-slider-value"
          },
          [_vm._v(_vm._s(_vm.sliderValue))]
        )
      ]),
      _vm._t("default")
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/slider/index.vue?vue&type=template&id=1969bd7a&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__(1);

// EXTERNAL MODULE: ./src/core/view/mixins/touchtrack.js
var touchtrack = __webpack_require__(7);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/slider/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var slidervue_type_script_lang_js_ = ({
  name: 'Slider',
  mixins: [mixins["a" /* emitter */], mixins["c" /* listeners */], touchtrack["a" /* default */]],
  props: {
    name: {
      type: String,
      default: ''
    },
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 100
    },
    value: {
      type: [Number, String],
      default: 0
    },
    step: {
      type: [Number, String],
      default: 1
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: '#e9e9e9'
    },
    backgroundColor: {
      type: String,
      default: '#e9e9e9'
    },
    activeColor: {
      type: String,
      default: '#007aff'
    },
    selectedColor: {
      type: String,
      default: '#007aff'
    },
    blockColor: {
      type: String,
      default: '#ffffff'
    },
    blockSize: {
      type: [Number, String],
      default: 28
    },
    showValue: {
      type: [Boolean, String],
      default: false
    }
  },
  data: function data() {
    return {
      sliderValue: Number(this.value)
    };
  },
  computed: {
    setBlockStyle: function setBlockStyle() {
      return {
        width: this.blockSize + 'px',
        height: this.blockSize + 'px',
        marginLeft: -this.blockSize / 2 + 'px',
        marginTop: -this.blockSize / 2 + 'px',
        left: this._getValueWidth(),
        backgroundColor: this.blockColor
      };
    },
    setBgColor: function setBgColor() {
      return {
        backgroundColor: this._getBgColor()
      };
    },
    setBlockBg: function setBlockBg() {
      return {
        left: this._getValueWidth()
      };
    },
    setActiveColor: function setActiveColor() {
      // 有问题，设置最大值最小值是有问题
      return {
        backgroundColor: this._getActiveColor(),
        width: this._getValueWidth()
      };
    }
  },
  watch: {
    value: function value(val) {
      this.sliderValue = Number(val);
    }
  },
  mounted: function mounted() {
    this.touchtrack(this.$refs['uni-slider-handle'], '_onTrack');
  },
  created: function created() {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'add',
      vm: this
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    });
  },
  methods: {
    _onUserChangedValue: function _onUserChangedValue(e) {
      var slider = this.$refs['uni-slider'];
      var offsetWidth = slider.offsetWidth;
      var boxLeft = slider.getBoundingClientRect().left;
      var value = (e.x - boxLeft) * (this.max - this.min) / offsetWidth + Number(this.min);
      this.sliderValue = this._filterValue(value);
    },
    _filterValue: function _filterValue(e) {
      return e < this.min ? this.min : e > this.max ? this.max : Math.round((e - this.min) / this.step) * this.step + Number(this.min);
    },
    _getValueWidth: function _getValueWidth() {
      return 100 * (this.sliderValue - this.min) / (this.max - this.min) + '%';
    },
    _getBgColor: function _getBgColor() {
      return this.backgroundColor !== '#e9e9e9' ? this.backgroundColor : this.color !== '#007aff' ? this.color : '#007aff';
    },
    _getActiveColor: function _getActiveColor() {
      return this.activeColor !== '#007aff' ? this.activeColor : this.selectedColor !== '#e9e9e9' ? this.selectedColor : '#e9e9e9';
    },
    _onTrack: function _onTrack(e) {
      if (!this.disabled) {
        return e.detail.state === 'move' ? (this._onUserChangedValue({
          x: e.detail.x0
        }), this.$trigger('changing', e, {
          value: this.sliderValue
        }), !1) : void (e.detail.state === 'end' && this.$trigger('change', e, {
          value: this.sliderValue
        }));
      }
    },
    _onClick: function _onClick($event) {
      if (this.disabled) {
        return;
      }

      this._onUserChangedValue($event);

      this.$trigger('change', $event, {
        value: this.sliderValue
      });
    },
    _resetFormData: function _resetFormData() {
      this.sliderValue = this.min;
    },
    _getFormData: function _getFormData() {
      var data = {};

      if (this.name !== '') {
        data['value'] = this.sliderValue;
        data['key'] = this.name;
      }

      return data;
    }
  }
});
// CONCATENATED MODULE: ./src/core/view/components/slider/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_slidervue_type_script_lang_js_ = (slidervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/slider/index.vue?vue&type=style&index=0&lang=css&
var slidervue_type_style_index_0_lang_css_ = __webpack_require__(85);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/slider/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_slidervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/slider/index.vue"
/* harmony default export */ var slider = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/label/index.vue?vue&type=template&id=04b5b291&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "uni-label",
    _vm._g({ on: { click: _vm._onClick } }, _vm.$listeners),
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/label/index.vue?vue&type=template&id=04b5b291&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/label/index.vue?vue&type=script&lang=js&
var labelvue_type_script_lang_js_ = __webpack_require__(21);

// CONCATENATED MODULE: ./src/core/view/components/label/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_labelvue_type_script_lang_js_ = (labelvue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/label/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_labelvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/label/index.vue"
/* harmony default export */ var label = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/picker/index.vue?vue&type=template&id=bcf74e32&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "uni-picker",
    {
      on: {
        click: function($event) {
          $event.stopPropagation()
          return _vm._click($event)
        }
      }
    },
    [_c("div", [_vm._t("default")], 2)]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/picker/index.vue?vue&type=template&id=bcf74e32&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/picker/index.vue?vue&type=script&lang=js&
var pickervue_type_script_lang_js_ = __webpack_require__(27);

// CONCATENATED MODULE: ./src/core/view/components/picker/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_pickervue_type_script_lang_js_ = (pickervue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./src/core/view/components/picker/index.vue?vue&type=style&index=0&lang=css&
var pickervue_type_style_index_0_lang_css_ = __webpack_require__(79);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/picker/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_pickervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/picker/index.vue"
/* harmony default export */ var picker = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"70784d34-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/canvas/index.vue?vue&type=template&id=6ef05d9e&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "uni-canvas",
    _vm._g(
      {
        attrs: {
          "canvas-id": _vm.canvasId,
          "disable-scroll": _vm.disableScroll
        }
      },
      _vm._listeners
    ),
    [
      _c("canvas", { ref: "canvas", attrs: { width: "300", height: "150" } }),
      _c(
        "div",
        {
          staticStyle: {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            overflow: "hidden"
          }
        },
        [_vm._t("default")],
        2
      ),
      _c("v-uni-resize-sensor", { ref: "sensor", on: { resize: _vm._resize } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/core/view/components/canvas/index.vue?vue&type=template&id=6ef05d9e&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/canvas/index.vue?vue&type=script&lang=js&
var canvasvue_type_script_lang_js_ = __webpack_require__(14);

// CONCATENATED MODULE: ./src/core/view/components/canvas/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_canvasvue_type_script_lang_js_ = (canvasvue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./src/core/view/components/canvas/index.vue?vue&type=style&index=0&lang=css&
var canvasvue_type_style_index_0_lang_css_ = __webpack_require__(68);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/canvas/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_canvasvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/canvas/index.vue"
/* harmony default export */ var canvas = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/button/index.vue?vue&type=script&lang=js&

/* harmony default export */ var buttonvue_type_script_lang_js_ = ({
  name: 'Button',
  mixins: [mixins["b" /* hover */], mixins["a" /* emitter */], mixins["c" /* listeners */]],
  props: {
    hoverClass: {
      type: String,
      default: 'button-hover'
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    hoverStopPropagation: {
      type: Boolean,
      default: false
    },
    hoverStartTime: {
      type: Number,
      default: 20
    },
    hoverStayTime: {
      type: Number,
      default: 70
    },
    formType: {
      type: String,
      default: '',
      validator: function validator(value) {
        // 只有这几个可取值，其它都是非法的。
        return ~['', 'submit', 'reset'].indexOf(value);
      }
    }
  },
  data: function data() {
    return {
      clickFunction: null
    };
  },
  methods: {
    _onClick: function _onClick($event, isLabelClick) {
      if (this.disabled) {
        return;
      }

      if (isLabelClick) {
        this.$el.click();
      } // TODO 通知父表单执行相应的行为


      if (this.formType) {
        this.$dispatch('Form', this.formType === 'submit' ? 'uni-form-submit' : 'uni-form-reset', {
          type: this.formType
        });
      }
    },
    _bindObjectListeners: function _bindObjectListeners(data, value) {
      if (value) {
        for (var key in value) {
          var existing = data.on[key];
          var ours = value[key];
          data.on[key] = existing ? [].concat(existing, ours) : ours;
        }
      }

      return data;
    }
  },
  render: function render(createElement) {
    var _this = this;

    var $listeners = Object.create(null);

    if (this.$listeners) {
      Object.keys(this.$listeners).forEach(function (e) {
        if (_this.disabled && (e === 'click' || e === 'tap')) {
          return;
        }

        $listeners[e] = _this.$listeners[e];
      });
    }

    if (this.hoverClass && this.hoverClass !== 'none') {
      return createElement('uni-button', this._bindObjectListeners({
        class: [this.hovering ? this.hoverClass : ''],
        attrs: {
          'disabled': this.disabled
        },
        on: {
          touchstart: this._hoverTouchStart,
          touchend: this._hoverTouchEnd,
          touchcancel: this._hoverTouchCancel,
          click: this._onClick
        }
      }, $listeners), this.$slots.default);
    } else {
      return createElement('uni-button', this._bindObjectListeners({
        class: [this.hovering ? this.hoverClass : ''],
        attrs: {
          'disabled': this.disabled
        },
        on: {
          click: this._onClick
        }
      }, $listeners), this.$slots.default);
    }
  },
  listeners: {
    'label-click': '_onClick',
    '@label-click': '_onClick'
  }
});
// CONCATENATED MODULE: ./src/core/view/components/button/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_buttonvue_type_script_lang_js_ = (buttonvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/button/index.vue?vue&type=style&index=0&lang=css&
var buttonvue_type_style_index_0_lang_css_ = __webpack_require__(67);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/button/index.vue
var render, staticRenderFns





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_buttonvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/button/index.vue"
/* harmony default export */ var components_button = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/core/view/mixins/touchtrack.js
var touchtrack = __webpack_require__(7);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/swiper/index.vue?vue&type=script&lang=js&
//

/* harmony default export */ var swipervue_type_script_lang_js_ = ({
  name: 'Swiper',
  mixins: [touchtrack["a" /* default */]],
  props: {
    indicatorDots: {
      type: [Boolean, String],
      default: false
    },
    vertical: {
      type: [Boolean, String],
      default: false
    },
    autoplay: {
      type: [Boolean, String],
      default: false
    },
    circular: {
      type: [Boolean, String],
      default: false
    },
    interval: {
      type: [Number, String],
      default: 5e3
    },
    duration: {
      type: [Number, String],
      default: 500
    },
    current: {
      type: [Number, String],
      default: 0
    },
    indicatorColor: {
      type: String,
      default: ''
    },
    indicatorActiveColor: {
      type: String,
      default: ''
    },
    previousMargin: {
      type: String,
      default: ''
    },
    nextMargin: {
      type: String,
      default: ''
    },
    currentItemId: {
      type: String,
      default: ''
    },
    skipHiddenItemLayout: {
      type: [Boolean, String],
      default: false
    },
    displayMultipleItems: {
      type: [Number, String],
      default: 1
    }
  },
  data: function data() {
    return {
      currentSync: Math.round(this.current) || 0,
      currentItemIdSync: this.currentItemId || '',
      userTracking: false,
      currentChangeSource: '',
      items: []
    };
  },
  computed: {
    intervalNumber: function intervalNumber() {
      var interval = Number(this.interval);
      return isNaN(interval) ? 5e3 : interval;
    },
    durationNumber: function durationNumber() {
      var duration = Number(this.duration);
      return isNaN(duration) ? 500 : duration;
    },
    displayMultipleItemsNumber: function displayMultipleItemsNumber() {
      var displayMultipleItems = Math.round(this.displayMultipleItems);
      return isNaN(displayMultipleItems) ? 1 : displayMultipleItems;
    },
    slidesStyle: function slidesStyle() {
      var style = {};

      if (this.nextMargin || this.previousMargin) {
        style = this.vertical ? {
          left: 0,
          right: 0,
          top: this._upx2px(this.previousMargin),
          bottom: this._upx2px(this.nextMargin)
        } : {
          top: 0,
          bottom: 0,
          left: this._upx2px(this.previousMargin),
          right: this._upx2px(this.nextMargin)
        };
      }

      return style;
    },
    slideFrameStyle: function slideFrameStyle() {
      var value = Math.abs(100 / this.displayMultipleItemsNumber) + '%';
      return {
        width: this.vertical ? '100%' : value,
        height: !this.vertical ? '100%' : value
      };
    },
    circularEnabled: function circularEnabled() {
      return this.circular && this.items.length > this.displayMultipleItemsNumber;
    }
  },
  watch: {
    vertical: function vertical() {
      this._resetLayout();
    },
    circular: function circular() {
      this._resetLayout();
    },
    intervalNumber: function intervalNumber(val) {
      if (this._timer) {
        this._cancelSchedule();

        this._scheduleAutoplay();
      }
    },
    current: function current(val) {
      this._currentCheck();
    },
    currentSync: function currentSync(val) {
      this._currentChanged(val);

      this.$emit('update:current', val);
    },
    currentItemId: function currentItemId(val) {
      this._currentCheck();
    },
    currentItemIdSync: function currentItemIdSync(val) {
      this.$emit('update:currentItemId', val);
    },
    displayMultipleItemsNumber: function displayMultipleItemsNumber() {
      this._resetLayout();
    }
  },
  created: function created() {
    this._invalid = true;
    this._viewportPosition = 0;
    this._viewportMoveRatio = 1;
    this._animating = null;
    this._requestedAnimation = false;
    this._userDirectionChecked = false;
    this._contentTrackViewport = 0;
    this._contentTrackSpeed = 0;
    this._contentTrackT = 0;
  },
  mounted: function mounted() {
    var _this = this;

    this._currentCheck();

    this.touchtrack(this.$refs.slidesWrapper, '_handleContentTrack', true);

    this._resetLayout();

    this.$watch(function () {
      return _this.autoplay && !_this.userTracking;
    }, this._inintAutoplay);

    this._inintAutoplay(this.autoplay && !this.userTracking);

    this.$watch('items.length', this._resetLayout);
  },
  beforeDestroy: function beforeDestroy() {
    this._cancelSchedule();
  },
  methods: {
    _inintAutoplay: function _inintAutoplay(enable) {
      if (enable) {
        this._scheduleAutoplay();
      } else {
        this._cancelSchedule();
      }
    },

    /**
     * 页面变更检查和同步
     */
    _currentCheck: function _currentCheck() {
      var current = -1;

      if (this.currentItemId) {
        for (var i = 0, items = this.items; i < items.length; i++) {
          var componentInstance = items[i].componentInstance;

          if (componentInstance && componentInstance.itemId === this.currentItemId) {
            current = i;
            break;
          }
        }
      }

      if (current < 0) {
        current = Math.round(this.current) || 0;
      }

      current = current < 0 ? 0 : current;

      if (this.currentSync !== current) {
        this.currentChangeSource = '';
        this.currentSync = current;
      }
    },
    _itemReady: function _itemReady(vnode, callback) {
      if (vnode.componentInstance && vnode.componentInstance._isMounted) {
        callback();
      } else {
        vnode._callbacks = vnode._callbacks || [];

        vnode._callbacks.push(callback);
      }
    },

    /**
     * 当前页面变更
     */
    _currentChanged: function _currentChanged(current) {
      var _this2 = this;

      var source = this.currentChangeSource;
      this.currentChangeSource = '';

      if (!source) {
        this._animateViewport(current, '', 0);
      }

      var item = this.items[current];

      if (item) {
        this._itemReady(item, function () {
          var currentItemId = _this2.currentItemIdSync = item.componentInstance.itemId || '';

          _this2.$trigger('change', {}, {
            current: _this2.currentSync,
            currentItemId: currentItemId,
            source: source
          });
        });
      }
    },

    /**
     * 自动播放
     */
    _scheduleAutoplay: function _scheduleAutoplay() {
      var self = this;

      this._cancelSchedule();

      function timer() {
        self._timer = null;
        self.currentChangeSource = 'autoplay';

        if (self.circularEnabled) {
          self.currentSync = self._normalizeCurrentValue(self.currentSync + 1);
        } else {
          self.currentSync = self.currentSync + self.displayMultipleItemsNumber < self.items.length ? self.currentSync + 1 : 0;
        }

        self._animateViewport(self.currentSync, 'autoplay', self.circularEnabled ? 1 : 0);

        self._timer = setTimeout(timer, self.intervalNumber);
      }

      if (!(!this._isMounted || this._invalid || this.items.length <= this.displayMultipleItemsNumber)) {
        this._timer = setTimeout(timer, this.intervalNumber);
      }
    },

    /**
     * 清除定时器
     */
    _cancelSchedule: function _cancelSchedule() {
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
    },

    /**
     * 检查当前页值
     */
    _normalizeCurrentValue: function _normalizeCurrentValue(current) {
      var length = this.items.length;

      if (!length) {
        return -1;
      }

      var index = (Math.round(current) % length + length) % length;

      if (this.circularEnabled) {
        if (length <= this.displayMultipleItemsNumber) {
          return 0;
        }
      } else if (index > length - this.displayMultipleItemsNumber) {
        return length - this.displayMultipleItemsNumber;
      }

      return index;
    },
    _upx2px: function _upx2px(val) {
      if (/\d+[ur]px$/i.test(val)) {
        val.replace(/\d+[ur]px$/i, function (text) {
          return "".concat(uni.upx2px(parseFloat(text)), "px");
        });
      }

      return val || '';
    },

    /**
     * 重新布局
     */
    _resetLayout: function _resetLayout() {
      if (this._isMounted) {
        this._cancelSchedule();

        this._endViewportAnimation();

        var items = this.items;

        for (var i = 0; i < items.length; i++) {
          this._updateItemPos(i, i);
        }

        this._viewportMoveRatio = 1;

        if (this.displayMultipleItemsNumber === 1 && items.length) {
          var itemRect = items[0].componentInstance.$el.getBoundingClientRect();
          var slideFrameRect = this.$refs.slideFrame.getBoundingClientRect();
          this._viewportMoveRatio = itemRect.width / slideFrameRect.width;

          if (!(this._viewportMoveRatio > 0 && this._viewportMoveRatio < 1)) {
            this._viewportMoveRatio = 1;
          }
        }

        var position = this._viewportPosition;
        this._viewportPosition = -2;
        var current = this.currentSync;

        if (current >= 0) {
          this._invalid = false;

          if (this.userTracking) {
            this._updateViewport(position + current - this._contentTrackViewport);

            this._contentTrackViewport = current;
          } else {
            this._updateViewport(current);

            if (this.autoplay) {
              this._scheduleAutoplay();
            }
          }
        } else {
          this._invalid = true;

          this._updateViewport(-this.displayMultipleItemsNumber - 1);
        }
      }
    },
    _checkCircularLayout: function _checkCircularLayout(e) {
      if (!this._invalid) {
        for (var items = this.items, n = items.length, i = e + this.displayMultipleItemsNumber, r = 0; r < n; r++) {
          var item = items[r];
          var _position = item._position;
          var s = Math.floor(e / n) * n + r;
          var l = s + n;
          var c = s - n;
          var u = Math.max(e - (s + 1), s - i, 0);
          var d = Math.max(e - (l + 1), l - i, 0);
          var h = Math.max(e - (c + 1), c - i, 0);
          var p = Math.min(u, d, h);
          var f = [s, l, c][[u, d, h].indexOf(p)];

          if (_position !== f) {
            this._updateItemPos(r, f);
          }
        }
      }
    },
    _updateItemPos: function _updateItemPos(current, position) {
      var x = this.vertical ? '0' : 100 * position + '%';
      var y = this.vertical ? 100 * position + '%' : '0';
      var transform = 'translate(' + x + ', ' + y + ') translateZ(0)';
      var item = this.items[current];

      this._itemReady(item, function () {
        var el = item.componentInstance.$el;
        el.style['-webkit-transform'] = transform;
        el.style.transform = transform;
        el._position = position;
      });
    },
    _updateViewport: function _updateViewport(index) {
      if (!(Math.floor(2 * this._viewportPosition) === Math.floor(2 * index) && Math.ceil(2 * this._viewportPosition) === Math.ceil(2 * index))) {
        if (this.circularEnabled) {
          this._checkCircularLayout(index);
        }
      }

      var x = this.vertical ? '0' : 100 * -index * this._viewportMoveRatio + '%';
      var y = this.vertical ? 100 * -index * this._viewportMoveRatio + '%' : '0';
      var transform = 'translate(' + x + ', ' + y + ') translateZ(0)';
      var slideFrame = this.$refs.slideFrame;

      if (slideFrame) {
        slideFrame.style['-webkit-transform'] = transform;
        slideFrame.style.transform = transform;
      }

      this._viewportPosition = index;

      if (!this._transitionStart) {
        if (index % 1 === 0) {
          return;
        }

        this._transitionStart = index;
      }

      index -= Math.floor(this._transitionStart);

      if (index <= -(this.items.length - 1)) {
        index += this.items.length;
      } else if (index >= this.items.length) {
        index -= this.items.length;
      }

      index = this._transitionStart % 1 > 0.5 || this._transitionStart < 0 ? index - 1 : index;
      this.$trigger('transition', {}, {
        dx: this.vertical ? 0 : index * slideFrame.offsetWidth,
        dy: this.vertical ? index * slideFrame.offsetHeight : 0
      });
    },
    _animateFrameFuncProto: function _animateFrameFuncProto() {
      var _this3 = this;

      if (!this._animating) {
        this._requestedAnimation = false;
        return;
      }

      var _animating = this._animating;
      var toPos = _animating.toPos;
      var acc = _animating.acc;
      var endTime = _animating.endTime;
      var source = _animating.source;
      var time = endTime - Date.now();

      if (time <= 0) {
        this._updateViewport(toPos);

        this._animating = null;
        this._requestedAnimation = false;
        this._transitionStart = null;
        var item = this.items[this.currentSync];

        if (item) {
          this._itemReady(item, function () {
            var currentItemId = item.componentInstance.itemId || '';

            _this3.$trigger('animationfinish', {}, {
              current: _this3.currentSync,
              currentItemId: currentItemId,
              source: source
            });
          });
        }

        return;
      }

      var s = acc * time * time / 2;
      var l = toPos + s;

      this._updateViewport(l);

      requestAnimationFrame(this._animateFrameFuncProto.bind(this));
    },
    _animateViewport: function _animateViewport(current, source, n) {
      this._cancelViewportAnimation();

      var duration = this.durationNumber;
      var length = this.items.length;
      var position = this._viewportPosition;

      if (this.circularEnabled) {
        if (n < 0) {
          for (; position < current;) {
            position += length;
          }

          for (; position - length > current;) {
            position -= length;
          }
        } else if (n > 0) {
          for (; position > current;) {
            position -= length;
          }

          for (; position + length < current;) {
            position += length;
          }
        } else {
          for (; position + length < current;) {
            position += length;
          }

          for (; position - length > current;) {
            position -= length;
          }

          if (position + length - current < current - position) {
            position += length;
          }
        }
      }

      this._animating = {
        toPos: current,
        acc: 2 * (position - current) / (duration * duration),
        endTime: Date.now() + duration,
        source: source
      };

      if (!this._requestedAnimation) {
        this._requestedAnimation = true;
        requestAnimationFrame(this._animateFrameFuncProto.bind(this));
      }
    },
    _cancelViewportAnimation: function _cancelViewportAnimation() {
      this._animating = null;
    },

    /**
     * 结束动画
     */
    _endViewportAnimation: function _endViewportAnimation() {
      if (this._animating) {
        this._updateViewport(this._animating.toPos);

        this._animating = null;
      }
    },
    _handleTrackStart: function _handleTrackStart() {
      this._cancelSchedule();

      this._contentTrackViewport = this._viewportPosition;
      this._contentTrackSpeed = 0;
      this._contentTrackT = Date.now();

      this._cancelViewportAnimation();
    },
    _handleTrackMove: function _handleTrackMove(data) {
      var self = this;
      var contentTrackT = this._contentTrackT;
      this._contentTrackT = Date.now();
      var length = this.items.length;
      var other = length - this.displayMultipleItemsNumber;

      function calc(val) {
        return 0.5 - 0.25 / (val + 0.5);
      }

      function move(oldVal, newVal) {
        var val = self._contentTrackViewport + oldVal;
        self._contentTrackSpeed = 0.6 * self._contentTrackSpeed + 0.4 * newVal;

        if (!self.circularEnabled) {
          if (val < 0 || val > other) {
            if (val < 0) {
              val = -calc(-val);
            } else {
              if (val > other) {
                val = other + calc(val - other);
              }
            }

            self._contentTrackSpeed = 0;
          }
        }

        self._updateViewport(val);
      }

      var time = this._contentTrackT - contentTrackT || 1;

      if (this.vertical) {
        move(-data.dy / this.$refs.slideFrame.offsetHeight, -data.ddy / time);
      } else {
        move(-data.dx / this.$refs.slideFrame.offsetWidth, -data.ddx / time);
      }
    },
    _handleTrackEnd: function _handleTrackEnd(isCancel) {
      this.userTracking = false;
      var t = this._contentTrackSpeed / Math.abs(this._contentTrackSpeed);
      var n = 0;

      if (!isCancel && Math.abs(this._contentTrackSpeed) > 0.2) {
        n = 0.5 * t;
      }

      var current = this._normalizeCurrentValue(this._viewportPosition + n);

      if (isCancel) {
        this._updateViewport(this._contentTrackViewport);
      } else {
        this.currentChangeSource = 'touch';
        this.currentSync = current;

        this._animateViewport(current, 'touch', n !== 0 ? n : current === 0 && this.circularEnabled && this._viewportPosition >= 1 ? 1 : 0);
      }
    },
    _handleContentTrack: function _handleContentTrack(e) {
      if (!this._invalid) {
        if (e.detail.state === 'start') {
          this.userTracking = true;
          this._userDirectionChecked = false;
          return this._handleTrackStart();
        } // fixed by xxxxxx


        if (e.detail.state === 'end') {
          return this._handleTrackEnd(false);
        }

        if (e.detail.state === 'cancel') {
          return this._handleTrackEnd(true);
        }

        if (this.userTracking) {
          if (!this._userDirectionChecked) {
            this._userDirectionChecked = true;
            var t = Math.abs(e.detail.dx);
            var n = Math.abs(e.detail.dy);

            if (t >= n && this.vertical) {
              this.userTracking = false;
            } else {
              if (t <= n && !this.vertical) {
                this.userTracking = false;
              }
            }

            if (!this.userTracking) {
              if (this.autoplay) {
                this._scheduleAutoplay();
              }

              return;
            }
          }

          this._handleTrackMove(e.detail);

          return false;
        }
      }
    }
  },
  render: function render(createElement) {
    var slidesDots = [];
    var swiperItems = [];

    if (this.$slots.default) {
      this.$slots.default.forEach(function (vnode) {
        if (vnode.componentOptions && vnode.componentOptions.tag === 'v-uni-swiper-item') {
          swiperItems.push(vnode);
        }
      });
    }

    for (var index = 0, length = swiperItems.length; index < length; index++) {
      var currentSync = this.currentSync;
      slidesDots.push(createElement('div', {
        class: {
          'uni-swiper-dot': true,
          'uni-swiper-dot-active': index < currentSync + this.displayMultipleItemsNumber && index >= currentSync || index < currentSync + this.displayMultipleItemsNumber - length
        },
        style: {
          'background': index === currentSync ? this.indicatorActiveColor : this.indicatorColor
        }
      }));
    }

    this.items = swiperItems;
    var slidesWrapperChild = [createElement('div', {
      ref: 'slides',
      style: this.slidesStyle,
      'class': 'uni-swiper-slides'
    }, [createElement('div', {
      ref: 'slideFrame',
      class: 'uni-swiper-slide-frame',
      style: this.slideFrameStyle
    }, swiperItems)])];

    if (this.indicatorDots) {
      slidesWrapperChild.push(createElement('div', {
        ref: 'slidesDots',
        'class': ['uni-swiper-dots', this.vertical ? 'uni-swiper-dots-vertical' : 'uni-swiper-dots-horizontal']
      }, slidesDots));
    }

    return createElement('uni-swiper', [createElement('div', {
      ref: 'slidesWrapper',
      'class': 'uni-swiper-wrapper',
      on: this.$listeners
    }, slidesWrapperChild)]);
  }
});
// CONCATENATED MODULE: ./src/core/view/components/swiper/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_swipervue_type_script_lang_js_ = (swipervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/swiper/index.vue?vue&type=style&index=0&lang=css&
var swipervue_type_style_index_0_lang_css_ = __webpack_require__(87);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/swiper/index.vue
var render, staticRenderFns





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_swipervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/swiper/index.vue"
/* harmony default export */ var swiper = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/picker-view/index.vue?vue&type=script&lang=js&
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/* harmony default export */ var picker_viewvue_type_script_lang_js_ = ({
  name: 'PickerView',
  props: {
    value: {
      type: Array,
      default: function _default() {
        return [];
      },
      validator: function validator(val) {
        return Array.isArray(val) && val.filter(function (val) {
          return typeof val === 'number';
        }).length === val.length;
      }
    },
    indicatorStyle: {
      type: String,
      default: ''
    },
    indicatorClass: {
      type: String,
      default: ''
    },
    maskStyle: {
      type: String,
      default: ''
    },
    maskClass: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      valueSync: _toConsumableArray(this.value),
      height: 34,
      items: [],
      changeSource: ''
    };
  },
  watch: {
    value: function value(val) {
      var _this = this;

      this.valueSync.length = val.length;
      val.forEach(function (val, index) {
        if (val !== _this.valueSync[index]) {
          _this.$set(_this.valueSync, index, val);
        }
      });
    },
    valueSync: {
      deep: true,
      handler: function handler(val, oldVal) {
        if (this.changeSource === '') {
          this._valueChanged(val);
        } else {
          this.changeSource = ''; // 避免外部直接对此值进行修改

          var value = val.map(function (val) {
            return val;
          });
          this.$emit('update:value', value);
          this.$trigger('change', {}, {
            value: value
          });
        }
      }
    }
  },
  methods: {
    getItemIndex: function getItemIndex(vnode) {
      return this.items.indexOf(vnode);
    },
    getItemValue: function getItemValue(vm) {
      return this.valueSync[this.getItemIndex(vm.$vnode)] || 0;
    },
    setItemValue: function setItemValue(vm, val) {
      var index = this.getItemIndex(vm.$vnode);
      var oldVal = this.valueSync[index];

      if (oldVal !== val) {
        this.changeSource = 'touch';
        this.$set(this.valueSync, index, val);
      }
    },
    _valueChanged: function _valueChanged(val) {
      this.items.forEach(function (item, index) {
        item.componentInstance.setCurrent(val[index] || 0);
      });
    },
    _resize: function _resize(_ref) {
      var height = _ref.height;
      this.height = height;
    }
  },
  render: function render(createElement) {
    var items = [];

    if (this.$slots.default) {
      this.$slots.default.forEach(function (vnode) {
        if (vnode.componentOptions && vnode.componentOptions.tag === 'v-uni-picker-view-column') {
          items.push(vnode);
        }
      });
    }

    this.items = items;
    return createElement('uni-picker-view', {
      on: this.$listeners
    }, [createElement('v-uni-resize-sensor', {
      attrs: {
        initial: true
      },
      on: {
        resize: this._resize
      }
    }), createElement('div', {
      ref: 'wrapper',
      'class': 'uni-picker-view-wrapper'
    }, items)]);
  }
});
// CONCATENATED MODULE: ./src/core/view/components/picker-view/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_picker_viewvue_type_script_lang_js_ = (picker_viewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/picker-view/index.vue?vue&type=style&index=0&lang=css&
var picker_viewvue_type_style_index_0_lang_css_ = __webpack_require__(78);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/picker-view/index.vue
var render, staticRenderFns





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_picker_viewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/picker-view/index.vue"
/* harmony default export */ var picker_view = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/resize-sensor/index.vue?vue&type=script&lang=js&
/* harmony default export */ var resize_sensorvue_type_script_lang_js_ = ({
  name: 'ResizeSensor',
  props: {
    initial: {
      type: [Boolean, String],
      default: false
    }
  },
  data: function data() {
    return {
      size: {
        width: -1,
        height: -1
      }
    };
  },
  watch: {
    size: {
      deep: true,
      handler: function handler(size) {
        this.$emit('resize', Object.assign({}, size));
      }
    }
  },
  mounted: function mounted() {
    if (this.initial === true) {
      this.$nextTick(this.update);
    }

    if (this.$el.offsetParent !== this.$el.parentNode) {
      this.$el.parentNode.style.position = 'relative';
    }

    if (!('AnimationEvent' in window)) {
      this.reset();
    }
  },
  methods: {
    reset: function reset() {
      var expand = this.$el.firstChild;
      var shrink = this.$el.lastChild;
      expand.scrollLeft = 100000;
      expand.scrollTop = 100000;
      shrink.scrollLeft = 100000;
      shrink.scrollTop = 100000;
    },
    update: function update() {
      this.size.width = this.$el.offsetWidth;
      this.size.height = this.$el.offsetHeight;
      this.reset();
    }
  },
  render: function render(create) {
    return create('uni-resize-sensor', {
      on: {
        '~animationstart': this.update
      }
    }, [create('div', {
      on: {
        scroll: this.update
      }
    }, [create('div')]), create('div', {
      on: {
        scroll: this.update
      }
    }, [create('div')])]);
  }
});
// CONCATENATED MODULE: ./src/core/view/components/resize-sensor/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_resize_sensorvue_type_script_lang_js_ = (resize_sensorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/resize-sensor/index.vue?vue&type=style&index=0&lang=css&
var resize_sensorvue_type_style_index_0_lang_css_ = __webpack_require__(83);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/resize-sensor/index.vue
var render, staticRenderFns





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_resize_sensorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/resize-sensor/index.vue"
/* harmony default export */ var resize_sensor = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/core/view/mixins/touchtrack.js
var touchtrack = __webpack_require__(7);

// EXTERNAL MODULE: ./src/core/view/mixins/scroller/index.js + 2 modules
var scroller = __webpack_require__(45);

// EXTERNAL MODULE: ./src/core/view/mixins/scroller/Friction.js
var Friction = __webpack_require__(43);

// EXTERNAL MODULE: ./src/core/view/mixins/scroller/Spring.js
var Spring = __webpack_require__(44);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/picker-view-column/index.vue?vue&type=script&lang=js&




/* harmony default export */ var picker_view_columnvue_type_script_lang_js_ = ({
  name: 'PickerViewColumn',
  mixins: [touchtrack["a" /* default */], scroller["a" /* default */]],
  data: function data() {
    return {
      scope: "picker-view-column-".concat(Date.now()),
      inited: false,
      indicatorStyle: '',
      indicatorClass: '',
      indicatorHeight: 34,
      maskStyle: '',
      maskClass: '',
      current: this.$parent.getItemValue(this),
      length: 0
    };
  },
  computed: {
    height: function height() {
      return this.$parent.height;
    },
    maskSize: function maskSize() {
      return (this.height - this.indicatorHeight) / 2;
    }
  },
  watch: {
    indicatorHeight: function indicatorHeight(val) {
      this._setItemHeight(val);

      if (this.inited) {
        this.update();
      }
    },
    current: function current(val) {
      this.$parent.setItemValue(this, val);
    },
    length: function length(val) {
      if (this.inited) {
        this.update(val);
      }
    }
  },
  created: function created() {
    var $parent = this.$parent;
    this.indicatorStyle = $parent.indicatorStyle;
    this.indicatorClass = $parent.indicatorClass;
    this.maskStyle = $parent.maskStyle;
    this.maskClass = $parent.maskClass; // this.__pageRerender = this._pageRerender.bind(this)
  },
  mounted: function mounted() {
    var _this = this;

    this.touchtrack(this.$refs.main, '_handleTrack', true);
    this.setCurrent(this.current);
    this.$nextTick(function () {
      _this.init();

      _this.update();
    });
  },
  methods: {
    _setItemHeight: function _setItemHeight(height) {
      var style = document.createElement('style');
      style.innerText = ".uni-picker-view-content.".concat(this.scope, ">*{height: ").concat(height, "px;overflow: hidden;}");
      document.head.appendChild(style);
    },
    _handleTrack: function _handleTrack(e) {
      if (this._scroller) {
        switch (e.detail.state) {
          case 'start':
            this._handleTouchStart(e);

            break;

          case 'move':
            this._handleTouchMove(e);

            break;

          case 'end':
          case 'cancel':
            this._handleTouchEnd(e);

        }
      }
    },
    _handleTap: function _handleTap(e) {
      if (e.target !== e.currentTarget && !this._scroller.isScrolling()) {
        var t = e.touches && e.touches[0] && e.touches[0].clientY;
        var n = typeof t === 'number' ? t : e.detail.y - document.body.scrollTop;
        var i = this.$el.getBoundingClientRect();
        var r = n - i.top - this._height / 2;
        var o = this.indicatorHeight / 2;

        if (!(Math.abs(r) <= o)) {
          var a = Math.ceil((Math.abs(r) - o) / this.indicatorHeight);
          var s = r < 0 ? -a : a;
          this.current += s;

          this._scroller.scrollTo(this.current * this.indicatorHeight);
        }
      }
    },
    setCurrent: function setCurrent(current) {
      if (current !== this.current) {
        this.current = current;

        if (this.inited) {
          this.update();
        }
      }
    },
    init: function init() {
      var _this2 = this;

      this.initScroller(this.$refs.content, {
        enableY: true,
        enableX: false,
        enableSnap: true,
        itemSize: this.indicatorHeight,
        friction: new Friction["a" /* Friction */](0.0001),
        spring: new Spring["a" /* Spring */](2, 90, 20),
        onSnap: function onSnap(index) {
          if (!isNaN(index) && index !== _this2.current) {
            _this2.current = index;
          }
        }
      });
      this.inited = true;
    },
    update: function update() {
      var _this3 = this;

      this.$nextTick(function () {
        var index = Math.max(_this3.length - 1, 0);
        var current = Math.min(_this3.current, index);

        _this3._scroller.update(current * _this3.indicatorHeight, undefined, _this3.indicatorHeight);
      });
    },
    _resize: function _resize(_ref) {
      var height = _ref.height;
      this.indicatorHeight = height;
    }
  },
  render: function render(createElement) {
    this.length = this.$slots.default && this.$slots.default.length || 0;
    return createElement('uni-picker-view-column', {
      on: {
        tap: this._handleTap
      }
    }, [createElement('div', {
      ref: 'main',
      staticClass: 'uni-picker-view-group'
    }, [createElement('div', {
      ref: 'mask',
      staticClass: 'uni-picker-view-mask',
      class: this.maskClass,
      style: "background-size: 100% ".concat(this.maskSize, "px;").concat(this.maskStyle)
    }), createElement('div', {
      ref: 'indicator',
      staticClass: 'uni-picker-view-indicator',
      class: this.indicatorClass,
      style: this.indicatorStyle
    }, [createElement('v-uni-resize-sensor', {
      attrs: {
        initial: true
      },
      on: {
        resize: this._resize
      }
    })]), createElement('div', {
      ref: 'content',
      staticClass: 'uni-picker-view-content',
      class: this.scope,
      style: "padding: ".concat(this.maskSize, "px 0;")
    }, [this.$slots.default])])]);
  }
});
// CONCATENATED MODULE: ./src/core/view/components/picker-view-column/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_picker_view_columnvue_type_script_lang_js_ = (picker_view_columnvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/picker-view-column/index.vue?vue&type=style&index=0&lang=css&
var picker_view_columnvue_type_style_index_0_lang_css_ = __webpack_require__(77);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/picker-view-column/index.vue
var render, staticRenderFns





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_picker_view_columnvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/picker-view-column/index.vue"
/* harmony default export */ var picker_view_column = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/text/index.vue?vue&type=script&lang=js&
var SPACE_UNICODE = {
  'ensp': "\u2002",
  'emsp': "\u2003",
  'nbsp': "\xA0"
};
/* harmony default export */ var textvue_type_script_lang_js_ = ({
  name: 'Text',
  props: {
    selectable: {
      type: [Boolean, String],
      default: false
    },
    space: {
      type: String,
      default: ''
    },
    decode: {
      type: [Boolean, String],
      default: false
    }
  },
  methods: {
    _decodeHtml: function _decodeHtml(htmlString) {
      if (this.space && SPACE_UNICODE[this.space]) {
        htmlString = htmlString.replace(/ /g, SPACE_UNICODE[this.space]);
      }

      if (this.decode) {
        htmlString = htmlString.replace(/&nbsp;/g, SPACE_UNICODE.nbsp).replace(/&ensp;/g, SPACE_UNICODE.ensp).replace(/&emsp;/g, SPACE_UNICODE.emsp).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'");
      }

      return htmlString;
    }
  },
  render: function render(createElement) {
    var _this = this;

    var nodeList = [];
    this.$slots.default && this.$slots.default.forEach(function (vnode) {
      if (vnode.text) {
        // 处理可能出现的多余的转义字符
        var nodeText = vnode.text.replace(/\\n/g, '\n');
        var texts = nodeText.split('\n');
        texts.forEach(function (text, index) {
          nodeList.push(_this._decodeHtml(text));

          if (index !== texts.length - 1) {
            nodeList.push(createElement('br'));
          }
        });
      } else {
        if (vnode.componentOptions && vnode.componentOptions.tag !== 'v-uni-text') {
          console.warn('<text> 组件内只支持嵌套 <text>，不支持其它组件或自定义组件，否则会引发在不同平台的渲染差异。');
        }

        nodeList.push(vnode);
      }
    });
    return createElement('uni-text', {
      on: this.$listeners,
      attrs: {
        selectable: !!this.selectable
      }
    }, [createElement('span', {}, nodeList)]);
  }
});
// CONCATENATED MODULE: ./src/core/view/components/text/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_textvue_type_script_lang_js_ = (textvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/text/index.vue?vue&type=style&index=0&lang=css&
var textvue_type_style_index_0_lang_css_ = __webpack_require__(89);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/text/index.vue
var render, staticRenderFns





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_textvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/text/index.vue"
/* harmony default export */ var components_text = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/movable-area/index.vue?vue&type=script&lang=js&
function calc(e) {
  return Math.sqrt(e.x * e.x + e.y * e.y);
}

/* harmony default export */ var movable_areavue_type_script_lang_js_ = ({
  name: 'MovableArea',
  props: {
    scaleArea: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      width: 0,
      height: 0,
      items: []
    };
  },
  created: function created() {
    this.gapV = {
      x: null,
      y: null
    };
    this.pinchStartLen = null;
  },
  mounted: function mounted() {
    this._resize();
  },
  methods: {
    _resize: function _resize() {
      this._getWH();

      this.items.forEach(function (item, index) {
        item.componentInstance.setParent();
      });
    },
    _find: function _find(target) {
      var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.items;
      var root = this.$el;

      function get(node) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];

          if (node === item.componentInstance.$el) {
            return item;
          }
        }

        if (node === root || node === document.body || node === document) {
          return null;
        }

        return get(node.parentNode);
      }

      return get(target);
    },
    _touchstart: function _touchstart(t) {
      var i = t.touches;

      if (i) {
        if (i.length > 1) {
          var r = {
            x: i[1].pageX - i[0].pageX,
            y: i[1].pageY - i[0].pageY
          };
          this.pinchStartLen = calc(r);
          this.gapV = r;

          if (!this.scaleArea) {
            var touch0 = this._find(i[0].target);

            var touch1 = this._find(i[1].target);

            this._scaleMovableView = touch0 && touch0 === touch1 ? touch0 : null;
          }
        }
      }
    },
    _touchmove: function _touchmove(t) {
      var n = t.touches;

      if (n) {
        if (n.length > 1) {
          t.preventDefault();
          var i = {
            x: n[1].pageX - n[0].pageX,
            y: n[1].pageY - n[0].pageY
          };

          if (this.gapV.x !== null && this.pinchStartLen > 0) {
            var r = calc(i) / this.pinchStartLen;

            this._updateScale(r);
          }

          this.gapV = i;
        }
      }
    },
    _touchend: function _touchend(e) {
      var t = e.touches;

      if (!(t && t.length)) {
        if (e.changedTouches) {
          this.gapV.x = 0;
          this.gapV.y = 0;
          this.pinchStartLen = null;

          if (this.scaleArea) {
            this.items.forEach(function (item) {
              item.componentInstance._endScale();
            });
          } else {
            if (this._scaleMovableView) {
              this._scaleMovableView.componentInstance._endScale();
            }
          }
        }
      }
    },
    _updateScale: function _updateScale(e) {
      if (e && e !== 1) {
        if (this.scaleArea) {
          this.items.forEach(function (item) {
            item.componentInstance._setScale(e);
          });
        } else {
          if (this._scaleMovableView) {
            this._scaleMovableView.componentInstance._setScale(e);
          }
        }
      }
    },
    _getWH: function _getWH() {
      var style = window.getComputedStyle(this.$el);
      var rect = this.$el.getBoundingClientRect();
      this.width = rect.width - ['Left', 'Right'].reduce(function (all, item) {
        return all + parseFloat(style['border' + item + 'Width']) + parseFloat(style['padding' + item]);
      }, 0);
      this.height = rect.height - ['Top', 'Bottom'].reduce(function (all, item) {
        return all + parseFloat(style['border' + item + 'Width']) + parseFloat(style['padding' + item]);
      }, 0);
    }
  },
  render: function render(createElement) {
    var _this = this;

    var items = [];

    if (this.$slots.default) {
      this.$slots.default.forEach(function (vnode) {
        if (vnode.componentOptions && vnode.componentOptions.tag === 'v-uni-movable-view') {
          items.push(vnode);
        }
      });
    }

    this.items = items;
    var $listeners = Object.assign({}, this.$listeners);
    var events = ['touchstart', 'touchmove', 'touchend'];
    events.forEach(function (event) {
      var existing = $listeners[event];

      var ours = _this["_".concat(event)];

      $listeners[event] = existing ? [].concat(existing, ours) : ours;
    });
    return createElement('uni-movable-area', {
      on: $listeners
    }, [createElement('v-uni-resize-sensor', {
      on: {
        resize: this._resize
      }
    })].concat(items));
  }
});
// CONCATENATED MODULE: ./src/core/view/components/movable-area/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_movable_areavue_type_script_lang_js_ = (movable_areavue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/core/view/components/movable-area/index.vue?vue&type=style&index=0&lang=css&
var movable_areavue_type_style_index_0_lang_css_ = __webpack_require__(74);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/core/view/components/movable-area/index.vue
var render, staticRenderFns





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_movable_areavue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/core/view/components/movable-area/index.vue"
/* harmony default export */ var movable_area = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__(63)
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./lib/app-plus/view.js
var view = __webpack_require__(50);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js
/* concated harmony reexport upx2px */__webpack_require__.d(__webpack_exports__, "upx2px", function() { return view["c" /* upx2px */]; });
/* concated harmony reexport getSystemInfoSync */__webpack_require__.d(__webpack_exports__, "getSystemInfoSync", function() { return view["b" /* getSystemInfoSync */]; });
/* concated harmony reexport canIUse */__webpack_require__.d(__webpack_exports__, "canIUse", function() { return view["a" /* canIUse */]; });




/***/ })
/******/ ]);
});