(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue-router"), require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([, ], factory);
	else if(typeof exports === 'object')
		exports["index"] = factory(require("vue-router"), require("vue"));
	else
		root["index"] = factory(root["VueRouter"], root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__6389__, __WEBPACK_EXTERNAL_MODULE__8bbf__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "fae3");
/******/ })
/************************************************************************/
/******/ ({

/***/ "052f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initOn; });
/* harmony import */ var _plugins_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a741");
/* harmony import */ var _api_page_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("9eba");


function initOn(on, _ref) {
  var getApp = _ref.getApp,
      getCurrentPages = _ref.getCurrentPages;

  function onError(err) {
    Object(_plugins_util__WEBPACK_IMPORTED_MODULE_0__[/* callAppHook */ "a"])(getApp(), 'onError', err);
  }

  function onPageNotFound(page) {
    Object(_plugins_util__WEBPACK_IMPORTED_MODULE_0__[/* callAppHook */ "a"])(getApp(), 'onPageNotFound', page);
  }

  function onPullDownRefresh(args, pageId) {
    var page = getCurrentPages().find(function (page) {
      return page.$page.id === pageId;
    });

    if (page) {
      Object(_api_page_event__WEBPACK_IMPORTED_MODULE_1__["setPullDownRefreshPageId"])(pageId);
      Object(_plugins_util__WEBPACK_IMPORTED_MODULE_0__[/* callPageHook */ "b"])(page, 'onPullDownRefresh');
    }
  }

  function callCurrentPageHook(hook, args) {
    var pages = getCurrentPages();

    if (pages.length) {
      Object(_plugins_util__WEBPACK_IMPORTED_MODULE_0__[/* callPageHook */ "b"])(pages[pages.length - 1], hook, args);
    }
  }

  function createCallCurrentPageHook(hook) {
    return function (args) {
      callCurrentPageHook(hook, args);
    };
  }

  function onAppEnterBackground() {
    Object(_plugins_util__WEBPACK_IMPORTED_MODULE_0__[/* callAppHook */ "a"])(getApp(), 'onHide');
    callCurrentPageHook('onHide');
  }

  function onAppEnterForeground() {
    Object(_plugins_util__WEBPACK_IMPORTED_MODULE_0__[/* callAppHook */ "a"])(getApp(), 'onShow');
    callCurrentPageHook('onShow');
  }

  function onWebInvokeAppService(_ref2, pageId) {
    var name = _ref2.name,
        arg = _ref2.arg;

    if (name === 'postMessage') {// TODO 小程序后退、组件销毁、分享时通知
    } else {
      uni[name](arg);
    }
  }

  var routeHooks = {
    navigateTo: function navigateTo() {
      callCurrentPageHook('onHide');
    },
    navigateBack: function navigateBack() {
      callCurrentPageHook('onShow');
    }
  };

  function onAppRoute(_ref3) {
    var type = _ref3.type;
    var routeHook = routeHooks[type];
    routeHook && routeHook();
  }

  on('onError', onError);
  on('onPageNotFound', onPageNotFound);

  if (false) {}

  on('onAppEnterBackground', onAppEnterBackground);
  on('onAppEnterForeground', onAppEnterForeground);
  on('onPullDownRefresh', onPullDownRefresh);
  on('onTabItemTap', createCallCurrentPageHook('onTabItemTap'));
  on('onNavigationBarButtonTap', createCallCurrentPageHook('onNavigationBarButtonTap'));
  on('onNavigationBarSearchInputChanged', createCallCurrentPageHook('onNavigationBarSearchInputChanged'));
  on('onNavigationBarSearchInputConfirmed', createCallCurrentPageHook('onNavigationBarSearchInputConfirmed'));
  on('onNavigationBarSearchInputClicked', createCallCurrentPageHook('onNavigationBarSearchInputClicked'));
  on('onWebInvokeAppService', onWebInvokeAppService);
}

/***/ }),

/***/ "0554":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocation", function() { return getLocation; });
/* harmony import */ var _helpers_get_jsonp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ffdc");

/**
 * wgs84坐标转Gcj02坐标
 * @param {object} coords
 * @param {Function} success
 * @param {Function} error
 */

function wgs84ToGcj02(coords, success, error) {
  /**
   * uniapp 内置key
   */
  var key = __uniConfig.qqMapKey;
  var url = "https://apis.map.qq.com/ws/coord/v1/translate?locations=".concat(coords.latitude, ",").concat(coords.longitude, "&type=1&key=").concat(key, "&output=jsonp");
  Object(_helpers_get_jsonp__WEBPACK_IMPORTED_MODULE_0__[/* getJSONP */ "a"])(url, {}, function (res) {
    if ('locations' in res && res.locations.length) {
      success({
        longitude: res.locations[0].lng,
        latitude: res.locations[0].lat
      });
    } else {
      error(res);
    }
  }, error);
}
/**
 * 获取定位信息
 * @param {*} param0
 * @param {*} callbackId
 */


function getLocation(_ref, callbackId) {
  var type = _ref.type,
      altitude = _ref.altitude;
  var _UniServiceJSBridge = UniServiceJSBridge,
      invoke = _UniServiceJSBridge.invokeCallbackHandler;

  function callback(coords) {
    invoke(callbackId, Object.assign(coords, {
      errMsg: 'getLocation:ok',
      verticalAccuracy: coords.altitudeAccuracy || 0,
      // 无专门水平精度，使用位置精度替代
      horizontalAccuracy: coords.accuracy
    }));
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var coords = position.coords;

      if (type === 'WGS84') {
        callback(coords);
      } else {
        wgs84ToGcj02(coords, callback, function (err) {
          invoke(callbackId, {
            errMsg: 'getLocation:fail ' + JSON.stringify(err)
          });
        });
      }
    }, function () {
      invoke(callbackId, {
        errMsg: 'getLocation:fail'
      });
    }, {
      enableHighAccuracy: altitude,
      timeout: 1000 * 60 * 5
    });
  } else {
    invoke(callbackId, {
      errMsg: 'getLocation:fail device nonsupport geolocation'
    });
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "066f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTabBarItem", function() { return setTabBarItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTabBarStyle", function() { return setTabBarStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideTabBar", function() { return hideTabBar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showTabBar", function() { return showTabBar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideTabBarRedDot", function() { return hideTabBarRedDot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showTabBarRedDot", function() { return showTabBarRedDot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeTabBarBadge", function() { return removeTabBarBadge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTabBarBadge", function() { return setTabBarBadge; });
/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f2b3");

var indexValidator = {
  type: Number,
  required: true
};
var setTabBarItem = {
  index: indexValidator,
  text: {
    type: String
  },
  iconPath: {
    type: String
  },
  selectedIconPath: {
    type: String
  }
};
var setTabBarStyle = {
  color: {
    type: String
  },
  selectedColor: {
    type: String
  },
  backgroundColor: {
    type: String
  },
  borderStyle: {
    type: String,
    validator: function validator(borderStyle, params) {
      if (borderStyle) {
        params.borderStyle = borderStyle === 'black' ? 'black' : 'white';
      }
    }
  }
};
var hideTabBar = {
  animation: {
    type: Boolean,
    default: false
  }
};
var showTabBar = {
  animation: {
    type: Boolean,
    default: false
  }
};
var hideTabBarRedDot = {
  index: indexValidator
};
var showTabBarRedDot = {
  index: indexValidator
};
var removeTabBarBadge = {
  index: indexValidator
};
var setTabBarBadge = {
  index: indexValidator,
  text: {
    type: String,
    required: true,
    validator: function validator(text, params) {
      if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* getLen */ "b"])(text) >= 4) {
        params.text = '...';
      }
    }
  }
};

/***/ }),

/***/ "0741":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9a72");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "0784":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./src/core/service/plugins/util.js
var util = __webpack_require__("a741");

// CONCATENATED MODULE: ./src/core/service/plugins/page/create-page.js
function createPage(pageVm) {
  var $route = pageVm.$route;
  pageVm.route = $route.meta.pagePath;
  pageVm.__page__ = {
    id: $route.params.__id__,
    path: $route.path,
    route: $route.meta.pagePath,
    meta: Object.assign({}, $route.meta) // 兼容 mpvue

  };
  pageVm.$vm = pageVm;
  pageVm.$root = pageVm;
  pageVm.$holder = pageVm.$parent.$parent; // 补充 mp 相关属性

  pageVm.$mp = {
    mpType: 'page',
    page: pageVm,
    query: {},
    // 暂不支持
    status: ''
  };
}
// CONCATENATED MODULE: ./src/core/service/plugins/page/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createPageMixin; });

 // 与小程序保持一致，尝试decodeURIComponent一次参数

function getDecodedQuery() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var decodedQuery = {};
  Object.keys(query).forEach(function (name) {
    try {
      decodedQuery[name] = decodeURIComponent(query[name]);
    } catch (e) {
      decodedQuery[name] = query[name];
    }
  });
  return decodedQuery;
}

function createPageMixin() {
  return {
    created: function pageCreated() {
      createPage(this);
      Object(util["b" /* callPageHook */])(this, 'onLoad', getDecodedQuery(this.$route.query));
      Object(util["b" /* callPageHook */])(this, 'onShow');
    }
  };
}

/***/ }),

/***/ "08c9":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "0950":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "0998":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4509");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "0a32":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_system_header_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("17ac");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_system_header_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_system_header_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_system_header_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "0c7c":
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

/***/ "0dba":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "0dd1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "off", function() { return off; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "once", function() { return once; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emit", function() { return emit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribe", function() { return subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsubscribe", function() { return unsubscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeHandler", function() { return subscribeHandler; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8bbf");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uni_helpers_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("27a7");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "invokeCallbackHandler", function() { return uni_helpers_api__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony import */ var uni_platform_service_bridge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("b865");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "publishHandler", function() { return uni_platform_service_bridge__WEBPACK_IMPORTED_MODULE_2__["a"]; });


var Emitter = new vue__WEBPACK_IMPORTED_MODULE_0___default.a();
var on = Emitter.$on.bind(Emitter);
var off = Emitter.$off.bind(Emitter);
var once = Emitter.$once.bind(Emitter);
var emit = Emitter.$emit.bind(Emitter);

function subscribe(event, callback) {
  return on('view.' + event, callback);
}
function unsubscribe(event, callback) {
  return off('view.' + event, callback);
}
function subscribeHandler(event, args, pageId) {
  return emit('view.' + event, args, pageId);
}


/***/ }),

/***/ "0f55":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("eaa4");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "0f74":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getRealRoute; });
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

/***/ }),

/***/ "1047":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1067":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1082":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/image/index.vue?vue&type=template&id=3d6bbdb4&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-image',_vm._g({},_vm.$listeners),[_c('div',{ref:"content",style:(_vm.modeStyle)}),_c('img',{attrs:{"src":_vm.realImagePath}}),(_vm.mode === 'widthFix')?_c('v-uni-resize-sensor',{ref:"sensor",on:{"resize":_vm._resize}}):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/image/index.vue?vue&type=template&id=3d6bbdb4&

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/image/index.vue?vue&type=script&lang=js&
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
        this.$el.style.height = elWidth / this.ratio + 'px';
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
var imagevue_type_style_index_0_lang_css_ = __webpack_require__("db18");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var components_image = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "1164":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getCurrentPages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createApp; });
/* harmony import */ var _router_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("23e5");

var appVm = false;
function getApp() {
  return appVm;
}
function getCurrentPages() {
  var isAll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var pages = [];
  var app = getApp();

  if (!app) {
    console.error('app is not ready');
    return [];
  }

  var childrenVm = app.$children[0];

  if (childrenVm && childrenVm.$children.length) {
    var tabBarVm = childrenVm.$children.find(function (vm) {
      return vm.$options.name === 'TabBar';
    });
    childrenVm.$children.forEach(function (vm) {
      if (tabBarVm !== vm && vm.$children.length && vm.$children[0].$options.name === 'Page' && vm.$children[0].$slots.page) {
        // vm.$children[0]=Page->PageBody->RealPage
        var pageVm = vm.$children[0].$children.find(function (vm) {
          return vm.$options.name === 'PageBody';
        }).$children.find(function (vm) {
          return !!vm.$page;
        });

        if (pageVm) {
          var isActive = true;

          if (!isAll && tabBarVm && pageVm.$page && pageVm.$page.meta.isTabBar) {
            // 选项卡仅列出活动的
            if (app.$route.meta && app.$route.meta.isTabBar) {
              // 当前页面路由是 tabBar
              if (app.$route.path !== pageVm.$page.path) {
                isActive = false;
              }
            } else {
              if (tabBarVm.__path__ !== pageVm.$page.path) {
                isActive = false;
              }
            }
          }

          if (isActive) {
            pages.push(pageVm);
          }
        } else {// TODO
          // console.error('pageVm is undefined')
        }
      }
    });
  } // 当页面返回过程中，请求 getCurrentPages 时，可能会获取到前一个已经准备销毁的 page


  var length = pages.length;

  if (length > 1) {
    var currentPage = pages[length - 1];

    if (currentPage.$page.path !== app.$route.path) {
      // 删除已经准备销毁的上个页面
      pages.splice(length - 1, 1);
    }
  }

  return pages;
}
function createApp(vm, routes) {
  appVm = vm;
  appVm.globalData = appVm.$options.globalData || {}; // initEvents(appVm)

  Object(_router_guard__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(appVm, routes);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3ad9")["default"]))

/***/ }),

/***/ "11fb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "previewImage", function() { return previewImage; });
/* harmony import */ var uni_platform_helpers_get_real_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cb0f");

var previewImage = {
  urls: {
    type: Array,
    required: true,
    validator: function validator(value, params) {
      var typeError;
      params.urls = value.map(function (url) {
        if (typeof url === 'string') {
          return Object(uni_platform_helpers_get_real_path__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(url);
        } else {
          typeError = true;
        }
      });

      if (typeError) {
        return 'url is not string';
      }
    }
  },
  current: {
    type: [String, Number],
    validator: function validator(value, params) {
      if (typeof value === 'number') {
        params.current = value > 0 && value < params.urls.length ? value : 0;
      } else if (typeof value === 'string' && value) {
        params.current = Object(uni_platform_helpers_get_real_path__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(value);
      }
    },
    default: 0
  }
};

/***/ }),

/***/ "1360":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "15bb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f2b3");

/* harmony default export */ __webpack_exports__["a"] = ({
  mounted: function mounted() {
    var _this = this;

    if (this.type === 'transparent') {
      var transparentElemStyle = this.$el.querySelector('.uni-page-head-transparent').style;
      var titleElem = this.$el.querySelector('.uni-page-head__title');
      var iconElems = this.$el.querySelectorAll('.uni-btn-icon');
      var iconElemsStyles = [];
      var textColor = this.textColor;

      for (var i = 0; i < iconElems.length; i++) {
        iconElemsStyles.push(iconElems[i].style);
      }

      var borderRadiusElems = this.$el.querySelectorAll('.uni-page-head-btn');
      var oldColors = [];
      var borderRadiusElemsStyles = [];

      for (var _i = 0; _i < borderRadiusElems.length; _i++) {
        var borderRadiusElem = borderRadiusElems[_i];
        oldColors.push(getComputedStyle(borderRadiusElem).backgroundColor);
        borderRadiusElemsStyles.push(borderRadiusElem.style);
      }

      this._A = 0;
      UniViewJSBridge.on('onPageScroll', function (_ref) {
        var scrollTop = _ref.scrollTop;
        var alpha = Math.min(scrollTop / _this.offset, 1);

        if (alpha === 1 && _this._A === 1) {
          return;
        }

        if (alpha > 0.5 && _this._A <= 0.5) {
          iconElemsStyles.forEach(function (iconElemStyle) {
            iconElemStyle.color = textColor;
          });
        } else if (alpha <= 0.5 && _this._A > 0.5) {
          iconElemsStyles.forEach(function (iconElemStyle) {
            iconElemStyle.color = '#fff';
          });
        }

        _this._A = alpha; // TODO 暂时仅处理背景色

        if (titleElem) {
          titleElem.style.opacity = alpha;
        }

        transparentElemStyle.backgroundColor = "rgba(".concat(_this._R, ",").concat(_this._G, ",").concat(_this._B, ",").concat(alpha, ")");
        borderRadiusElemsStyles.forEach(function (borderRadiusElemStyle, index) {
          var oldColor = oldColors[index]; // eslint-disable-next-line

          var rgba = oldColor.match(/[\d+\.]+/g);
          rgba[3] = (1 - alpha) * (rgba.length === 4 ? rgba[3] : 1);
          borderRadiusElemStyle.backgroundColor = "rgba(".concat(rgba, ")");
        });
      });
    }
  },
  computed: {
    color: function color() {
      return this.type === 'transparent' ? '#fff' : this.textColor;
    },
    offset: function offset() {
      return parseInt(this.coverage);
    },
    bgColor: function bgColor() {
      if (this.type === 'transparent') {
        var _hexToRgba = Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* hexToRgba */ "d"])(this.backgroundColor),
            r = _hexToRgba.r,
            g = _hexToRgba.g,
            b = _hexToRgba.b;

        this._R = r;
        this._G = g;
        this._B = b;
        return "rgba(".concat(r, ",").concat(g, ",").concat(b, ",0)");
      }

      return this.backgroundColor;
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("501c")))

/***/ }),

/***/ "167a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_pageBody_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("deaf");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_pageBody_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_pageBody_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_pageBody_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "17ac":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "17fd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/navigator/index.vue?vue&type=template&id=d8d61df6&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.hoverClass && _vm.hoverClass !== 'none')?_c('uni-navigator',_vm._g({class:[_vm.hovering ? _vm.hoverClass : ''],on:{"touchstart":_vm._hoverTouchStart,"touchend":_vm._hoverTouchEnd,"touchcancel":_vm._hoverTouchCancel,"click":_vm._onClick}},_vm.$listeners),[_vm._t("default")],2):_c('uni-navigator',_vm._g({on:{"click":_vm._onClick}},_vm.$listeners),[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/navigator/index.vue?vue&type=template&id=d8d61df6&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/navigator/index.vue?vue&type=script&lang=js&
var navigatorvue_type_script_lang_js_ = __webpack_require__("eecc");

// CONCATENATED MODULE: ./src/core/view/components/navigator/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_navigatorvue_type_script_lang_js_ = (navigatorvue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./src/core/view/components/navigator/index.vue?vue&type=style&index=0&lang=css&
var navigatorvue_type_style_index_0_lang_css_ = __webpack_require__("f7fd");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var components_navigator = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "18fd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HTMLParser; });
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

/***/ }),

/***/ "1955":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/core/view/mixins/touchtrack.js
var touchtrack = __webpack_require__("ba15");

// EXTERNAL MODULE: ./src/core/view/mixins/scroller/index.js + 2 modules
var scroller = __webpack_require__("8aec");

// EXTERNAL MODULE: ./src/core/view/mixins/scroller/Friction.js
var Friction = __webpack_require__("5363");

// EXTERNAL MODULE: ./src/core/view/mixins/scroller/Spring.js
var Spring = __webpack_require__("72b3");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/picker-view-column/index.vue?vue&type=script&lang=js&




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
var picker_view_columnvue_type_style_index_0_lang_css_ = __webpack_require__("edfa");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var picker_view_column = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "19c4":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./base.js": "22ec",
	"./base64.js": "a8fd",
	"./canvas.js": "a041",
	"./context.js": "9fef",
	"./device/make-phone-call.js": "f102",
	"./file/open-document.js": "2604",
	"./location.js": "c439",
	"./media/choose-image.js": "f1b2",
	"./media/choose-video.js": "ed9f",
	"./media/get-image-info.js": "b866",
	"./media/preview-image.js": "11fb",
	"./navigation-bar.js": "4043",
	"./network/download-file.js": "439a",
	"./network/request.js": "a201",
	"./network/socket.js": "abb2",
	"./network/upload-file.js": "9a3e",
	"./page-scroll-to.js": "e8e6",
	"./plugins.js": "cef5",
	"./popup.js": "d68b",
	"./route.js": "40ab",
	"./storage.js": "3858",
	"./tab-bar.js": "066f"
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
webpackContext.id = "19c4";

/***/ }),

/***/ "1a12":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "request", function() { return request; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 请求任务类
 */
var RequestTask =
/*#__PURE__*/
function () {
  function RequestTask(xhr) {
    _classCallCheck(this, RequestTask);

    _defineProperty(this, "_xhr", void 0);

    this._xhr = xhr;
  }

  _createClass(RequestTask, [{
    key: "abort",
    value: function abort() {
      if (this._xhr) {
        this._xhr.abort();

        delete this._xhr;
      }
    }
  }]);

  return RequestTask;
}();
/**
 * 拼接网址和参数
 * @param {string} url 网址
 * @param {any} data 参数
 * @return {string}
 */


function setUrl(url, data) {
  var str = url.split('#');
  var hash = str[1] || '';
  str = str[0].split('?');
  var query = str[1] || '';
  url = str[0];
  var search = query.split('&').filter(function (item) {
    return item;
  });
  query = {};
  search.forEach(function (item) {
    item = item.split('=');
    query[item[0]] = item[1];
  });

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      query[encodeURIComponent(key)] = encodeURIComponent(data[key]);
    }
  }

  query = Object.keys(query).map(function (item) {
    return "".concat(item, "=").concat(query[item]);
  }).join('&');
  return url + (query ? '?' + query : '') + (hash ? '#' + hash : '');
}
/**
 * 解析响应头
 * @param {string} headers
 * @return {object}
 */


function parseHeaders(headers) {
  var headersObject = {};
  var headersArray = headers.split('\n');
  headersArray.forEach(function (header) {
    var find = header.match(/(\S+\s*):\s*(.*)/);

    if (!find || find.length !== 3) {
      return;
    }

    var key = find[1];
    var val = find[2];
    headersObject[key] = val;
  });
  return headersObject;
}
/**
 * 发起网络请求
 * @param {object} param0
 * @param {string} callbackId
 * @return {RequestTask}
 */


function request(_ref, callbackId) {
  var url = _ref.url,
      data = _ref.data,
      header = _ref.header,
      method = _ref.method,
      dataType = _ref.dataType,
      responseType = _ref.responseType;
  var _UniServiceJSBridge = UniServiceJSBridge,
      invoke = _UniServiceJSBridge.invokeCallbackHandler;
  var body = null;
  var timeout = __uniConfig.networkTimeout && __uniConfig.networkTimeout.request || 60 * 1000; // 根据请求类型处理数据

  var contentType;

  for (var _key in header) {
    if (header.hasOwnProperty(_key)) {
      if (_key.toLowerCase() === 'content-type') {
        contentType = header[_key];

        if (contentType.indexOf('application/json') === 0) {
          contentType = 'json';
        } else if (contentType.indexOf('application/x-www-form-urlencoded') === 0) {
          contentType = 'urlencoded';
        } else {
          contentType = 'string';
        }

        break;
      }
    }
  }

  if (method === 'GET') {
    url = setUrl(url, data);
  } else {
    if (!contentType) {
      /**
       * 跨域时部分服务器OPTION响应头Access-Control-Allow-Headers未包含Content-Type会请求失败
       */
      header['Content-Type'] = 'application/json';
      contentType = 'json';
    }

    if (typeof data === 'string' || data instanceof ArrayBuffer) {
      body = data;
    } else {
      if (contentType === 'json') {
        try {
          body = JSON.stringify(data);
        } catch (error) {
          body = data.toString();
        }
      } else if (contentType === 'urlencoded') {
        var bodyArray = [];

        for (var _key2 in data) {
          if (data.hasOwnProperty(_key2)) {
            bodyArray.push(encodeURIComponent(_key2) + '=' + encodeURIComponent(data[_key2]));
          }
        }

        body = bodyArray.join('&');
      } else {
        body = data.toString();
      }
    }
  }

  var xhr = new XMLHttpRequest();
  var requestTask = new RequestTask(xhr);
  xhr.open(method, url);

  for (var key in header) {
    if (header.hasOwnProperty(key)) {
      xhr.setRequestHeader(key, header[key]);
    }
  }

  var timer = setTimeout(function () {
    xhr.onload = xhr.onabort = xhr.onerror = null;
    requestTask.abort();
    invoke(callbackId, {
      errMsg: 'request:fail timeout'
    });
  }, timeout);
  xhr.responseType = responseType.toLowerCase();

  xhr.onload = function () {
    clearTimeout(timer);
    var statusCode = xhr.status;
    var res = responseType === 'TEXT' ? xhr.responseText : xhr.response;

    if (responseType === 'TEXT' && dataType === 'JSON') {
      try {
        res = JSON.parse(res);
      } catch (error) {// 和微信一致解析失败不抛出错误
        // invoke(callbackId, {
        //   errMsg: 'request:fail json parse error'
        // })
        // return
      }
    }

    invoke(callbackId, {
      data: res,
      statusCode: statusCode,
      header: parseHeaders(xhr.getAllResponseHeaders()),
      errMsg: 'request:ok'
    });
  };

  xhr.onabort = function () {
    clearTimeout(timer);
    invoke(callbackId, {
      errMsg: 'request:fail abort'
    });
  };

  xhr.onerror = function () {
    clearTimeout(timer);
    invoke(callbackId, {
      errMsg: 'request:fail'
    });
  };

  xhr.send(body);
  return requestTask;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "1a33":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1b6f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f2b3");

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

      if (!Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(this._handleSubscribe)) {
        return;
      } // 纠正VUniVideo等组件命名为Video


      UniViewJSBridge[type](this.$page.id + '-' + this.$options.name.replace(/VUni([A-Z])/, '$1').toLowerCase() + '-' + id, this._handleSubscribe);
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("501c")))

/***/ }),

/***/ "1c64":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9613");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "1ef7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interceptors", function() { return interceptors; });
/* harmony import */ var uni_helpers_interceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8542");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addInterceptor", function() { return uni_helpers_interceptor__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeInterceptor", function() { return uni_helpers_interceptor__WEBPACK_IMPORTED_MODULE_0__["d"]; });



var interceptors = {
  promiseInterceptor: uni_helpers_interceptor__WEBPACK_IMPORTED_MODULE_0__[/* promiseInterceptor */ "c"]
};

/***/ }),

/***/ "1efd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// EXTERNAL MODULE: ./src/platforms/h5/helpers/get-real-path.js
var get_real_path = __webpack_require__("cb0f");

// EXTERNAL MODULE: ./src/core/view/plugins/events.js
var events = __webpack_require__("d4b6");

// CONCATENATED MODULE: ./src/core/view/mixins/base.js


/* harmony default export */ var base = ({
  methods: {
    $getRealPath: function $getRealPath(src) {
      return Object(get_real_path["a" /* default */])(src);
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
    } else if (animateTypes3.concat(animateTypes4).includes(type)) {
      var value = args[0];
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
__webpack_require__("5408"), __webpack_require__("93a5")];
requireComponents.forEach(function (components, index) {
  components.keys().forEach(function (fileName) {
    // 获取组件配置
    var componentModule = components(fileName);
    var componentConfig = componentModule.default || componentModule;
    componentConfig.mixins = componentConfig.mixins ? [].concat(base, componentConfig.mixins) : [base];
    componentConfig.mixins.push(animation);
    componentConfig.name = 'VUni' + componentConfig.name; // 全局注册组件

    external_commonjs_vue_commonjs2_vue_root_Vue_default.a.component(componentConfig.name, componentConfig);
  });
});

/***/ }),

/***/ "22ec":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canIUse", function() { return canIUse; });
var canIUse = [{
  name: 'schema',
  type: String,
  required: true
}];

/***/ }),

/***/ "23af":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "23e5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getTabBarScrollPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initRouterGuard; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a741");


function addKeepAliveInclude(componentName) {
  if (this.keepAliveInclude.indexOf(componentName) === -1) {
    // 目标页面,自动 include
    this.keepAliveInclude.push(componentName);
  }
}

var deltaIds = [];

function removeKeepAliveInclude(componentNameOrDelta) {
  if (typeof componentNameOrDelta === 'number') {
    deltaIds = this.keepAliveInclude.splice(-(componentNameOrDelta - 1)).map(function (name) {
      return parseInt(name.split('-').pop());
    });
  } else {
    var index = this.keepAliveInclude.indexOf(componentNameOrDelta);

    if (index !== -1) {
      this.keepAliveInclude.splice(index, 1);
    }
  }
}

var positionStore = Object.create(null);
function getTabBarScrollPosition(id) {
  return positionStore[id];
}

function saveTabBarScrollPosition(id) {
  positionStore[id] = {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
}

function switchTab(routes, to, from) {
  if (to && from && to.meta.isTabBar && from.meta.isTabBar) {
    // tabbar 跳 tabbar
    saveTabBarScrollPosition(from.params.__id__);
  } // 关闭非 tabBar 页面


  var pages = getCurrentPages();

  for (var i = pages.length - 1; i >= 0; i--) {
    var pageVm = pages[i];
    var meta = pageVm.$page.meta;

    if (!meta.isTabBar) {
      removeKeepAliveInclude.call(this, meta.name + '-' + pageVm.$page.id);
      Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* callPageHook */ "b"])(pageVm, 'onUnload');
    }
  }
}

function reLaunch(toName) {
  __uniConfig.reLaunch = (__uniConfig.reLaunch || 1) + 1; // 关闭所有页面

  var pages = getCurrentPages(true);

  for (var i = pages.length - 1; i >= 0; i--) {
    Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* callPageHook */ "b"])(pages[i], 'onUnload'); // 重新reLaunch至首页可能会被keepAlive，先手动强制destroy

    pages[i].$destroy();
  }

  this.keepAliveInclude = []; // 清空 positionStore

  positionStore = Object.create(null);
}

var currentPages = [];

function beforeEach(to, from, next, routes) {
  currentPages = getCurrentPages(true); // 每次 beforeEach 时获取当前currentPages，因为 afterEach 之后，获取不到上一个 page 了，导致无法调用 onUnload

  var fromId = from.params.__id__;
  var toId = to.params.__id__;
  var toName = to.meta.name + '-' + toId;

  if (toId === fromId) {
    // 相同页面阻止
    // 处理外部修改 history 导致卡在当前页面的问题
    if (to.fullPath !== from.fullPath) {
      removeKeepAliveInclude.call(this, toName);
      next();
    } else {
      next(false);
    }
  } else if (to.meta.id && to.meta.id !== toId) {
    // id 不妥，replace跳转
    next({
      path: to.path,
      replace: true
    });
  } else {
    var fromName = from.meta.name + '-' + fromId;

    switch (to.type) {
      case 'navigateTo':
        break;

      case 'redirectTo':
        // 关闭前一个页面
        removeKeepAliveInclude.call(this, fromName);

        if (from.meta) {
          if (from.meta.isQuit) {
            // 如果 redirectTo 的前一个页面是 quit 类型，则新打开的页面也是 quit
            to.meta.isQuit = true;
            to.meta.isEntry = !!from.meta.isEntry;
          }

          if (from.meta.isTabBar) {
            // 如果是 tabBar，需要更新系统组件 tabBar 内的 list 数据
            to.meta.isTabBar = true;
            to.meta.tabBarIndex = from.meta.tabBarIndex;
            var appVm = getApp().$children[0];
            appVm.$set(appVm.tabBar.list[to.meta.tabBarIndex], 'pagePath', to.meta.pagePath);
          }
        }

        break;

      case 'switchTab':
        switchTab.call(this, routes, to, from);
        break;

      case 'reLaunch':
        reLaunch.call(this, toName);
        to.meta.isQuit = true; // reLaunch后，该页面为 quit 类型

        break;

      default:
        // 后退或非 API 访问
        if (fromId && fromId > toId) {
          // back
          removeKeepAliveInclude.call(this, fromName);

          if (this.$router._$delta > 1) {
            removeKeepAliveInclude.call(this, this.$router._$delta);
          }
        }

        break;
    }

    if (to.type !== 'reLaunch' && from.meta.id) {
      // 如果不是 reLaunch，且 meta 指定了 id
      addKeepAliveInclude.call(this, fromName);
    } // if (to.type !== 'reLaunch') { // TODO 如果 reLaunch，1.keepAlive的话，无法触发页面生命周期，并刷新页面，2.不 keepAlive 的话，页面状态无法再次保留,且 routeView 的 cache 有问题


    addKeepAliveInclude.call(this, toName); // }

    if (false) {}
    /* eslint-disable no-undef */


    if (true) {
      if (to.meta && to.meta.name) {
        document.body.className = 'uni-body ' + to.meta.name;
        var nvueDirKey = 'nvue-dir-' + __uniConfig.nvue['flex-direction'];

        if (to.meta.isNVue) {
          document.body.setAttribute('nvue', '');
          document.body.setAttribute(nvueDirKey, '');
        } else {
          document.body.removeAttribute('nvue');
          document.body.removeAttribute(nvueDirKey);
        }
      }
    }

    next();
  }
}

function afterEach(to, from) {
  var fromId = from.params.__id__;
  var toId = to.params.__id__;
  var fromVm = currentPages.find(function (pageVm) {
    return pageVm.$page.id === fromId;
  }); // 使用 beforeEach 时的 pages

  switch (to.type) {
    case 'navigateTo':
      // 前一个页面触发 onHide
      fromVm && Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* callPageHook */ "b"])(fromVm, 'onHide');
      break;

    case 'redirectTo':
      // 前一个页面触发 onUnload
      fromVm && Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* callPageHook */ "b"])(fromVm, 'onUnload');
      break;

    case 'switchTab':
      if (from.meta.isTabBar) {
        // 前一个页面是 tabBar 触发 onHide，非 tabBar 页面在 beforeEach 中已触发 onUnload
        fromVm && Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* callPageHook */ "b"])(fromVm, 'onHide');
      }

      break;

    case 'reLaunch':
      break;

    default:
      if (fromId && fromId > toId) {
        // history back
        fromVm && Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* callPageHook */ "b"])(fromVm, 'onUnload');

        if (this.$router._$delta > 1) {
          deltaIds.reverse().forEach(function (deltaId) {
            var pageVm = currentPages.find(function (pageVm) {
              return pageVm.$page.id === deltaId;
            });
            pageVm && Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* callPageHook */ "b"])(pageVm, 'onUnload');
          });
        }
      }

      break;
  }

  delete this.$router._$delta;
  deltaIds.length = 0;

  if (to.type !== 'reLaunch') {
    // 因为 reLaunch 会重置 id，故不触发 onShow,switchTab 在 beforeRouteEnter 中触发
    // 直接获取所有 pages,getCurrentPages 正常情况下仅返回页面栈内，传 true 则返回所有已存在（主要是 tabBar 页面）
    var toVm = getCurrentPages(true).find(function (pageVm) {
      return pageVm.$page.id === toId;
    }); // 使用最新的 pages

    if (toVm) {
      // 目标页面若已存在，则触发 onShow
      // 延迟执行 onShow，防止与 UniServiceJSBridge.emit('onHidePopup') 冲突。
      setTimeout(function () {
        Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* callPageHook */ "b"])(toVm, 'onShow');
      }, 0);

      if (true) {
        document.title = toVm.$parent.$parent.navigationBar.titleText;
      }
    }
  }
}

function initRouterGuard(appVm, routes) {
  // 处理keepAliveInclude
  appVm.$router.beforeEach(function (to, from, next) {
    beforeEach.call(appVm, to, from, next, routes);
  }); // 处理前进时的 onUnload,onHide 和后退时的 onShow

  appVm.$router.afterEach(function (to, from) {
    afterEach.call(appVm, to, from);
  });
}

/***/ }),

/***/ "24aa":
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

/***/ "24d9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return wrapperMPEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mergeTitleNView; });
/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f2b3");
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
  if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isPlainObject */ "f"])(titleNView)) {
    if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* hasOwn */ "c"])(titleNView, 'backgroundColor')) {
      navigationBar.backgroundColor = titleNView.backgroundColor;
    }

    if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* hasOwn */ "c"])(titleNView, 'buttons')) {
      navigationBar.buttons = titleNView.buttons;
    }

    if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* hasOwn */ "c"])(titleNView, 'titleColor')) {
      navigationBar.textColor = titleNView.titleColor;
    }

    if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* hasOwn */ "c"])(titleNView, 'titleText')) {
      navigationBar.titleText = titleNView.titleText;
    }

    if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* hasOwn */ "c"])(titleNView, 'titleSize')) {
      navigationBar.titleSize = titleNView.titleSize;
    }

    if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* hasOwn */ "c"])(titleNView, 'type')) {
      navigationBar.type = titleNView.type;
    }

    if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* hasOwn */ "c"])(titleNView, 'searchInput') && _typeof(titleNView.searchInput) === 'object') {
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

/***/ }),

/***/ "250d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/input/index.vue?vue&type=template&id=6a171a59&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-input',_vm._g({},_vm.$listeners),[_c('div',{ref:"wrapper",staticClass:"uni-input-wrapper"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(!(_vm.composing || _vm.inputValue.length)),expression:"!(composing || inputValue.length)"}],ref:"placeholder",staticClass:"uni-input-placeholder",class:_vm.placeholderClass,style:(_vm.placeholderStyle)},[_vm._v(_vm._s(_vm.placeholder))]),((_vm.inputType)==='checkbox')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"input",staticClass:"uni-input-input",attrs:{"disabled":_vm.disabled,"maxlength":_vm.maxlength,"step":_vm.step,"autocomplete":"off","type":"checkbox"},domProps:{"checked":Array.isArray(_vm.inputValue)?_vm._i(_vm.inputValue,null)>-1:(_vm.inputValue)},on:{"focus":_vm._onFocus,"blur":_vm._onBlur,"input":function($event){$event.stopPropagation();return _vm._onInput($event)},"compositionstart":_vm._onComposition,"compositionend":_vm._onComposition,"keyup":function($event){$event.stopPropagation();return _vm._onKeyup($event)},"change":function($event){var $$a=_vm.inputValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.inputValue=$$a.concat([$$v]))}else{$$i>-1&&(_vm.inputValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.inputValue=$$c}}}}):((_vm.inputType)==='radio')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"input",staticClass:"uni-input-input",attrs:{"disabled":_vm.disabled,"maxlength":_vm.maxlength,"step":_vm.step,"autocomplete":"off","type":"radio"},domProps:{"checked":_vm._q(_vm.inputValue,null)},on:{"focus":_vm._onFocus,"blur":_vm._onBlur,"input":function($event){$event.stopPropagation();return _vm._onInput($event)},"compositionstart":_vm._onComposition,"compositionend":_vm._onComposition,"keyup":function($event){$event.stopPropagation();return _vm._onKeyup($event)},"change":function($event){_vm.inputValue=null}}}):_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"input",staticClass:"uni-input-input",attrs:{"disabled":_vm.disabled,"maxlength":_vm.maxlength,"step":_vm.step,"autocomplete":"off","type":_vm.inputType},domProps:{"value":(_vm.inputValue)},on:{"focus":_vm._onFocus,"blur":_vm._onBlur,"input":[function($event){if($event.target.composing){ return; }_vm.inputValue=$event.target.value},function($event){$event.stopPropagation();return _vm._onInput($event)}],"compositionstart":_vm._onComposition,"compositionend":_vm._onComposition,"keyup":function($event){$event.stopPropagation();return _vm._onKeyup($event)}}})])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/input/index.vue?vue&type=template&id=6a171a59&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__("8af1");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/input/index.vue?vue&type=script&lang=js&
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
var inputvue_type_style_index_0_lang_css_ = __webpack_require__("0f55");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var input = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "25ce":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/checkbox-group/index.vue?vue&type=template&id=6fa043c2&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-checkbox-group',_vm._g({},_vm.$listeners),[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/checkbox-group/index.vue?vue&type=template&id=6fa043c2&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__("8af1");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/checkbox-group/index.vue?vue&type=script&lang=js&
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
var checkbox_groupvue_type_style_index_0_lang_css_ = __webpack_require__("0998");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var checkbox_group = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "2604":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openDocument", function() { return openDocument; });
var openDocument = {
  filePath: {
    type: String,
    required: true
  },
  fileType: {
    type: String
  }
};

/***/ }),

/***/ "2608":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return tryCatchFramework; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return tryCatch; });
/**
 * 框架内 try-catch
 */
function tryCatchFramework(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
/**
 * 开发者 try-catch
 */

function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3ad9")["default"]))

/***/ }),

/***/ "26d3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTabBarItem", function() { return setTabBarItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTabBarStyle", function() { return setTabBarStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideTabBar", function() { return hideTabBar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showTabBar", function() { return showTabBar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideTabBarRedDot", function() { return hideTabBarRedDot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showTabBarRedDot", function() { return showTabBarRedDot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeTabBarBadge", function() { return removeTabBarBadge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTabBarBadge", function() { return setTabBarBadge; });
/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f2b3");

var setTabBarItemProps = ['text', 'iconPath', 'selectedIconPath'];
var setTabBarStyleProps = ['color', 'selectedColor', 'backgroundColor', 'borderStyle'];
var setTabBarBadgeProps = ['badge', 'redDot'];

function setTabBar(type) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var app = getApp();

  if (app) {
    var isTabBar = false;
    var pages = getCurrentPages();

    if (pages.length) {
      if (pages[pages.length - 1].$page.meta.isTabBar) {
        isTabBar = true;
      }
    } else if (app.$children[0].hasTabBar) {
      isTabBar = true;
    }

    if (!isTabBar) {
      return {
        errMsg: "".concat(type, ":fail not TabBar page")
      };
    }

    var index = args.index;
    var tabBar = app.$children[0].tabBar;

    if (index >= __uniConfig.tabBar.list.length) {
      return {
        errMsg: "".concat(type, ":fail tabbar item not found")
      };
    }

    switch (type) {
      case 'showTabBar':
        app.$children[0].hideTabBar = false;
        break;

      case 'hideTabBar':
        app.$children[0].hideTabBar = true;
        break;

      case 'setTabBarItem':
        Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* setProperties */ "g"])(tabBar.list[index], setTabBarItemProps, args);
        break;

      case 'setTabBarStyle':
        Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* setProperties */ "g"])(tabBar, setTabBarStyleProps, args);
        break;

      case 'showTabBarRedDot':
        Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* setProperties */ "g"])(tabBar.list[index], setTabBarBadgeProps, {
          badge: '',
          redDot: true
        });
        break;

      case 'setTabBarBadge':
        Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* setProperties */ "g"])(tabBar.list[index], setTabBarBadgeProps, {
          badge: args.text,
          redDot: true
        });
        break;

      case 'hideTabBarRedDot':
      case 'removeTabBarBadge':
        Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* setProperties */ "g"])(tabBar.list[index], setTabBarBadgeProps, {
          badge: '',
          redDot: false
        });
        break;
    }
  }

  return {};
}

function setTabBarItem(args) {
  return setTabBar('setTabBarItem', args);
}
function setTabBarStyle(args) {
  return setTabBar('setTabBarStyle', args);
}
function hideTabBar(args) {
  return setTabBar('hideTabBar', args);
}
function showTabBar(args) {
  return setTabBar('showTabBar', args);
}
function hideTabBarRedDot(args) {
  return setTabBar('hideTabBarRedDot', args);
}
function showTabBarRedDot(args) {
  return setTabBar('showTabBarRedDot', args);
}
function removeTabBarBadge(args) {
  return setTabBar('removeTabBarBadge', args);
}
function setTabBarBadge(args) {
  return setTabBar('setTabBarBadge', args);
}

/***/ }),

/***/ "2765":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("91ce");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "27a7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return invokeCallbackHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return wrapperUnimplemented; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return wrapper; });
/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f2b3");
/* harmony import */ var _catch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("2608");
/* harmony import */ var _promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ed1a");
/* harmony import */ var _protocol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("cc76");
/* harmony import */ var _params__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("de29");






function invokeCallbackHandlerFail(err, apiName, callbackId) {
  var errMsg = "".concat(apiName, ":fail ").concat(err);
  console.error(errMsg);

  if (callbackId === -1) {
    throw new Error(errMsg);
  }

  if (typeof callbackId === 'number') {
    invokeCallbackHandler(callbackId, {
      errMsg: errMsg
    });
  }

  return false;
}

var callbackApiParamTypes = [{
  name: 'callback',
  type: Function,
  required: true
}];

function validateParams(apiName, paramsData, callbackId) {
  var paramTypes = _protocol__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"][apiName];

  if (!paramTypes && Object(_promise__WEBPACK_IMPORTED_MODULE_2__[/* isCallbackApi */ "a"])(apiName)) {
    paramTypes = callbackApiParamTypes;
  }

  if (paramTypes) {
    if (Array.isArray(paramTypes) && Array.isArray(paramsData)) {
      var paramTypeObj = Object.create(null);
      var paramsDataObj = Object.create(null);
      var paramsDataLength = paramsData.length;
      paramTypes.forEach(function (paramType, index) {
        paramTypeObj[paramType.name] = paramType;

        if (paramsDataLength > index) {
          paramsDataObj[paramType.name] = paramsData[index];
        }
      });
      paramTypes = paramTypeObj;
      paramsData = paramsDataObj;
    }

    if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(paramTypes.beforeValidate)) {
      var err = paramTypes.beforeValidate(paramsData);

      if (err) {
        return invokeCallbackHandlerFail(err, apiName, callbackId);
      }
    }

    var keys = Object.keys(paramTypes);

    for (var i = 0; i < keys.length; i++) {
      if (keys[i] === 'beforeValidate') {
        continue;
      }

      var _err = Object(_params__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(keys[i], paramTypes, paramsData);

      if (_err) {
        return invokeCallbackHandlerFail(_err, apiName, callbackId);
      }
    }
  }

  return true;
}

var invokeCallbackId = 1;
var invokeCallbacks = {};

function createKeepAliveApiCallback(apiName, callback) {
  var callbackId = invokeCallbackId++;
  var invokeCallbackName = 'api.' + apiName + '.' + callbackId;

  var invokeCallback = function invokeCallback(res) {
    callback(res);
  };

  invokeCallbacks[callbackId] = {
    name: invokeCallbackName,
    keepAlive: true,
    callback: invokeCallback
  };
  return callbackId;
}

function createApiCallback(apiName) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var extras = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isPlainObject */ "f"])(params)) {
    return {
      params: params
    };
  }

  params = Object.assign({}, params);
  var apiCallbacks = {};

  for (var name in params) {
    var param = params[name];

    if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(param)) {
      apiCallbacks[name] = Object(_catch__WEBPACK_IMPORTED_MODULE_1__[/* tryCatch */ "a"])(param);
      delete params[name];
    }
  }

  var success = apiCallbacks.success,
      fail = apiCallbacks.fail,
      cancel = apiCallbacks.cancel,
      complete = apiCallbacks.complete;
  var hasSuccess = Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(success);
  var hasFail = Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(fail);
  var hasCancel = Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(cancel);
  var hasComplete = Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(complete);

  if (!hasSuccess && !hasFail && !hasCancel && !hasComplete) {
    // 无回调
    return {
      params: params
    };
  }

  var wrapperCallbacks = {};

  for (var _name in extras) {
    var extra = extras[_name];

    if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(extra)) {
      wrapperCallbacks[_name] = Object(_catch__WEBPACK_IMPORTED_MODULE_1__[/* tryCatchFramework */ "b"])(extra);
      delete extras[_name];
    }
  }

  var beforeSuccess = wrapperCallbacks.beforeSuccess,
      afterSuccess = wrapperCallbacks.afterSuccess,
      beforeFail = wrapperCallbacks.beforeFail,
      afterFail = wrapperCallbacks.afterFail,
      beforeCancel = wrapperCallbacks.beforeCancel,
      afterCancel = wrapperCallbacks.afterCancel,
      afterAll = wrapperCallbacks.afterAll;
  var callbackId = invokeCallbackId++;
  var invokeCallbackName = 'api.' + apiName + '.' + callbackId;

  var invokeCallback = function invokeCallback(res) {
    res.errMsg = res.errMsg || apiName + ':ok';
    var errMsg = res.errMsg;

    if (errMsg.indexOf(apiName + ':ok') === 0) {
      Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(beforeSuccess) && beforeSuccess(res);
      hasSuccess && success(res);
      Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(afterSuccess) && afterSuccess(res);
    } else if (errMsg.indexOf(apiName + ':cancel') === 0) {
      res.errMsg = res.errMsg.replace(apiName + ':cancel', apiName + ':fail cancel');
      hasFail && fail(res);
      Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(beforeCancel) && beforeCancel(res);
      hasCancel && cancel(res);
      Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(afterCancel) && afterCancel(res);
    } else if (errMsg.indexOf(apiName + ':fail') === 0) {
      Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(beforeFail) && beforeFail(res);
      hasFail && fail(res);
      Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(afterFail) && afterFail(res);
    }

    hasComplete && complete(res);
    Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(afterAll) && afterAll(res);
  };

  invokeCallbacks[callbackId] = {
    name: invokeCallbackName,
    callback: invokeCallback
  };
  return {
    params: params,
    callbackId: callbackId
  };
}

function createInvokeCallback(apiName) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var extras = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _createApiCallback = createApiCallback(apiName, params, extras),
      args = _createApiCallback.params,
      callbackId = _createApiCallback.callbackId;

  if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isPlainObject */ "f"])(args) && !validateParams(apiName, args, callbackId)) {
    return {
      params: args,
      callbackId: false
    };
  }

  return {
    params: args,
    callbackId: callbackId
  };
}

function invokeCallbackHandler(invokeCallbackId, res) {
  if (typeof invokeCallbackId === 'number') {
    var invokeCallback = invokeCallbacks[invokeCallbackId];

    if (invokeCallback) {
      if (!invokeCallback.keepAlive) {
        delete invokeCallbacks[invokeCallbackId];
      }

      return invokeCallback.callback(res);
    }
  }

  return res;
}
function wrapperUnimplemented(name) {
  return function (args) {
    console.error('API `' + name + '` is not yet implemented');
  };
}
function wrapper(name, invokeMethod, extras) {
  if (!Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(invokeMethod)) {
    return invokeMethod;
  }

  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (Object(_promise__WEBPACK_IMPORTED_MODULE_2__[/* isSyncApi */ "b"])(name)) {
      if (validateParams(name, args, -1)) {
        return invokeMethod.apply(null, args);
      }
    } else if (Object(_promise__WEBPACK_IMPORTED_MODULE_2__[/* isCallbackApi */ "a"])(name)) {
      if (validateParams(name, args, -1)) {
        return invokeMethod(createKeepAliveApiCallback(name, args[0]));
      }
    } else {
      var argsObj = {};

      if (args.length) {
        argsObj = args[0];
      }

      var _createInvokeCallback = createInvokeCallback(name, argsObj, extras),
          params = _createInvokeCallback.params,
          callbackId = _createInvokeCallback.callbackId;

      if (callbackId !== false) {
        var res;

        if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(params)) {
          res = invokeMethod(callbackId);
        } else {
          res = invokeMethod(params, callbackId);
        }

        if (res && !Object(_promise__WEBPACK_IMPORTED_MODULE_2__[/* isTaskApi */ "c"])(name)) {
          res = invokeCallbackHandler(callbackId, res);

          if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isPlainObject */ "f"])(res)) {
            res.errMsg = res.errMsg || name + ':ok';
          }
        }

        return res;
      }
    }
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3ad9")["default"]))

/***/ }),

/***/ "27ab":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/picker-view/index.vue?vue&type=script&lang=js&
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
var picker_viewvue_type_style_index_0_lang_css_ = __webpack_require__("6062");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var picker_view = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "2829":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocation", function() { return getLocation; });
/* harmony import */ var _helpers_get_jsonp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ffdc");

/**
 * wgs84坐标转Gcj02坐标
 * @param {object} coords
 * @param {Function} success
 * @param {Function} error
 */

function wgs84ToGcj02(coords, success, error) {
  /**
   * uniapp 内置key
   */
  var key = __uniConfig.qqMapKey;
  var url = "https://apis.map.qq.com/ws/coord/v1/translate?locations=".concat(coords.latitude, ",").concat(coords.longitude, "&type=1&key=").concat(key, "&output=jsonp");
  Object(_helpers_get_jsonp__WEBPACK_IMPORTED_MODULE_0__[/* getJSONP */ "a"])(url, {}, function (res) {
    if ('locations' in res && res.locations.length) {
      success({
        longitude: res.locations[0].lng,
        latitude: res.locations[0].lat
      });
    } else {
      error(res);
    }
  }, error);
}
/**
 * 获取定位信息
 * @param {*} param0
 * @param {*} callbackId
 */


function getLocation(_ref, callbackId) {
  var type = _ref.type,
      altitude = _ref.altitude;
  var _UniServiceJSBridge = UniServiceJSBridge,
      invoke = _UniServiceJSBridge.invokeCallbackHandler;

  function callback(coords) {
    invoke(callbackId, Object.assign(coords, {
      errMsg: 'getLocation:ok',
      verticalAccuracy: coords.altitudeAccuracy || 0,
      // 无专门水平精度，使用位置精度替代
      horizontalAccuracy: coords.accuracy
    }));
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var coords = position.coords;

      if (type === 'WGS84') {
        callback(coords);
      } else {
        wgs84ToGcj02(coords, callback, function (err) {
          invoke(callbackId, {
            errMsg: 'getLocation:fail ' + JSON.stringify(err)
          });
        });
      }
    }, function () {
      invoke(callbackId, {
        errMsg: 'getLocation:fail'
      });
    }, {
      enableHighAccuracy: altitude,
      timeout: 1000 * 60 * 5
    });
  } else {
    invoke(callbackId, {
      errMsg: 'getLocation:fail device nonsupport geolocation'
    });
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "2bbe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/view/index.vue?vue&type=template&id=164058a7&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.hoverClass && _vm.hoverClass !== 'none')?_c('uni-view',_vm._g({class:[_vm.hovering?_vm.hoverClass:''],on:{"touchstart":_vm._hoverTouchStart,"touchend":_vm._hoverTouchEnd,"touchcancel":_vm._hoverTouchCancel}},_vm.$listeners),[_vm._t("default")],2):_c('uni-view',_vm._g({},_vm.$listeners),[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/view/index.vue?vue&type=template&id=164058a7&

// EXTERNAL MODULE: ./src/core/view/mixins/hover.js
var hover = __webpack_require__("83a6");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/view/index.vue?vue&type=script&lang=js&
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
var viewvue_type_style_index_0_lang_css_ = __webpack_require__("e865");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var view = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "2bdd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onAccelerometerChange", function() { return onAccelerometerChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startAccelerometer", function() { return startAccelerometer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopAccelerometer", function() { return stopAccelerometer; });
var callbacks = [];
var listener;
/**
 * 监听加速度
 * @param {*} callbackId
 */

function onAccelerometerChange(callbackId) {
  callbacks.push(callbackId);

  if (!listener) {
    startAccelerometer();
  }
}
/**
 * 开始监听加速度数据
 */

function startAccelerometer() {
  var _UniServiceJSBridge = UniServiceJSBridge,
      invoke = _UniServiceJSBridge.invokeCallbackHandler;

  if (window.DeviceMotionEvent) {
    listener = function listener(event) {
      callbacks.forEach(function (callbackId) {
        var acceleration = event.acceleration || event.accelerationIncludingGravity;
        invoke(callbackId, {
          x: acceleration.x || 0,
          y: acceleration.y || 0,
          z: acceleration.z || 0,
          errMsg: 'onAccelerometerChange:ok'
        });
      });
    };

    window.addEventListener('devicemotion', listener, false);
    return {};
  } else {
    throw new Error('device nonsupport devicemotion');
  }
}
/**
 * 停止监听加速度数据
 */

function stopAccelerometer() {
  if (listener) {
    window.removeEventListener('devicemotion', listener, false);
    listener = null;
  }

  return {};
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "2ef3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge, global, UniServiceJSBridge) {/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8bbf");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/**
 * 1.导出全局对象(UniViewJSBridge,UniServiceJSBridge,uni,getApp,getCurrentPages)
 * 2.引入 Vue 插件(uniVueServicePlugin,uniVueServicePlugin)
 * 3.引入 Vue 组件
 */

global.UniViewJSBridge = {
  subscribeHandler: UniViewJSBridge.subscribeHandler
};
global.UniServiceJSBridge = {
  subscribeHandler: UniServiceJSBridge.subscribeHandler
};

var _require = __webpack_require__("b7b5"),
    uni = _require.default,
    getApp = _require.getApp,
    getCurrentPages = _require.getCurrentPages;

global.uni = uni;
global.wx = global.uni;
global.getApp = getApp;
global.getCurrentPages = getCurrentPages;
vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(__webpack_require__("4ca9").default, {
  routes: __uniRoutes
});
vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(__webpack_require__("8c15").default, {
  routes: __uniRoutes
});

__webpack_require__("442e");

__webpack_require__("8f7e");

__webpack_require__("1efd");
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("501c"), __webpack_require__("24aa"), __webpack_require__("0dd1")))

/***/ }),

/***/ "2fb0":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "3042":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "redirectTo", function() { return redirectTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigateTo", function() { return navigateTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigateBack", function() { return navigateBack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reLaunch", function() { return reLaunch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "switchTab", function() { return switchTab; });
/* harmony import */ var uni_helpers_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("85b6");


function onAppRoute(type) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      url = _ref.url,
      delta = _ref.delta,
      animationType = _ref.animationType,
      animationDuration = _ref.animationDuration,
      _ref$from = _ref.from,
      from = _ref$from === void 0 ? 'navigateBack' : _ref$from,
      detail = _ref.detail;

  var router = getApp().$router;

  switch (type) {
    case 'redirectTo':
      router.replace({
        type: type,
        path: url
      });
      break;

    case 'navigateTo':
      router.push({
        type: type,
        path: url,
        animationType: animationType,
        animationDuration: animationDuration
      });
      break;

    case 'navigateBack':
      var canBack = true;
      var pages = getCurrentPages();

      if (pages.length) {
        var page = pages[pages.length - 1];

        if (Object(uni_helpers_index__WEBPACK_IMPORTED_MODULE_0__[/* hasLifecycleHook */ "a"])(page.$options, 'onBackPress') && page.__call_hook('onBackPress', {
          from: from
        }) === true) {
          canBack = false;
        }
      }

      if (canBack) {
        if (delta > 1) {
          router._$delta = delta;
        }

        router.go(-delta, {
          animationType: animationType,
          animationDuration: animationDuration
        });
      }

      break;

    case 'reLaunch':
      router.replace({
        type: type,
        path: url
      });
      break;

    case 'switchTab':
      router.replace({
        type: type,
        path: url,
        params: {
          detail: detail
        }
      });
      break;
  }

  return {
    errMsg: type + ':ok'
  };
}

function redirectTo(args) {
  return onAppRoute('redirectTo', args);
}
function navigateTo(args) {
  return onAppRoute('navigateTo', args);
}
function navigateBack(args) {
  return onAppRoute('navigateBack', args);
}
function reLaunch(args) {
  return onAppRoute('reLaunch', args);
}
function switchTab(args) {
  return onAppRoute('switchTab', args);
}

/***/ }),

/***/ "31e2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/view/components/video/index.vue?vue&type=template&id=f38201f6&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-video',_vm._g({attrs:{"id":_vm.id,"src":_vm.src,"initial-time":_vm.initialTime,"duration":_vm.duration,"controls":_vm.controls,"danmu-list":_vm.danmuList,"danmu-btn":_vm.danmuBtn,"enable-danmu":_vm.enableDanmu,"autoplay":_vm.autoplay,"loop":_vm.loop,"muted":_vm.muted,"page-gesture":_vm.pageGesture,"direction":_vm.direction,"show-progress":_vm.showProgress,"show-fullscreen-btn":_vm.showFullscreenBtn,"show-play-btn":_vm.showPlayBtn,"show-center-play-btn":_vm.showCenterPlayBtn,"enable-progress-gesture":_vm.enableProgressGesture,"object-fit":_vm.objectFit,"poster":_vm.poster,"x5-video-player-type":_vm.x5VideoPlayerType,"x5-video-player-fullscreen":_vm.x5VideoPlayerFullscren,"x5-video-orientation":_vm.x5VideoOrientation,"x5-playsinline":_vm.x5Playsinline}},_vm.$listeners),[_c('div',{ref:"container",staticClass:"uni-video-container",class:{'uni-video-type-fullscreen':_vm.fullscreen,'uni-video-type-rotate-left':_vm.rotateType==='left','uni-video-type-rotate-right':_vm.rotateType==='right'},style:({width:_vm.fullscreen?_vm.width:'100%',height:_vm.fullscreen?_vm.height:'100%'}),on:{"click":_vm.triggerControls,"touchstart":function($event){return _vm.touchstart($event)},"touchend":function($event){return _vm.touchend($event)},"touchmove":function($event){return _vm.touchmove($event)}}},[_c('video',{ref:"video",staticClass:"uni-video-video",style:({opacity:!_vm.start?0.8:1,objectFit:_vm.objectFit}),attrs:{"loop":_vm.loop,"src":_vm.srcSync,"poster":_vm.poster,"x5-video-player-type":_vm.x5VideoPlayerType,"x5-video-player-fullscreen":_vm.x5VideoPlayerFullscren,"x5-video-orientation":_vm.x5VideoOrientation,"x5-playsinline":_vm.x5Playsinline,"webkit-playsinline":"","playsinline":""},domProps:{"muted":_vm.muted}}),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.controlsShow),expression:"controlsShow"}],staticClass:"uni-video-bar uni-video-bar-full",on:{"click":function($event){$event.stopPropagation();}}},[_c('div',{staticClass:"uni-video-controls"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showPlayBtn),expression:"showPlayBtn"}],staticClass:"uni-video-control-button",class:{'uni-video-control-button-play':!_vm.playing,'uni-video-control-button-pause':_vm.playing},on:{"click":function($event){$event.stopPropagation();return _vm.trigger($event)}}}),_c('div',{staticClass:"uni-video-current-time"},[_vm._v(_vm._s(_vm._f("getTime")(_vm.currentTime)))]),_c('div',{ref:"progress",staticClass:"uni-video-progress-container",on:{"click":function($event){$event.stopPropagation();return _vm.clickProgress($event)}}},[_c('div',{staticClass:"uni-video-progress"},[_c('div',{staticClass:"uni-video-progress-buffered",style:({width:_vm.buffered*100+'%'})}),_c('div',{ref:"ball",staticClass:"uni-video-ball",style:({left:_vm.progress+'%'})},[_c('div',{staticClass:"uni-video-inner"})])])]),_c('div',{staticClass:"uni-video-duration"},[_vm._v(_vm._s(_vm._f("getTime")((_vm.duration||_vm.durationTime))))])]),(_vm.danmuBtn)?_c('div',{staticClass:"uni-video-danmu-button",class:{'uni-video-danmu-button-active':_vm.enableDanmuSync},on:{"click":function($event){$event.stopPropagation();return _vm.triggerDanmu($event)}}},[_vm._v("弹幕")]):_vm._e(),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showFullscreenBtn),expression:"showFullscreenBtn"}],staticClass:"uni-video-fullscreen",class:{'uni-video-type-fullscreen':_vm.fullscreen},on:{"click":function($event){$event.stopPropagation();return _vm.triggerFullscreen($event)}}})]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.start&&_vm.enableDanmuSync),expression:"start&&enableDanmuSync"}],ref:"danmu",staticClass:"uni-video-danmu",staticStyle:{"z-index":"0"}}),(!_vm.start)?_c('div',{staticClass:"uni-video-cover",on:{"click":function($event){$event.stopPropagation();}}},[_c('div',{staticClass:"uni-video-cover-play-button",on:{"click":function($event){$event.stopPropagation();return _vm.play($event)}}}),_c('p',{staticClass:"uni-video-cover-duration"},[_vm._v(_vm._s(_vm._f("getTime")((_vm.duration||_vm.durationTime))))])]):_vm._e(),_c('div',{staticClass:"uni-video-toast",class:{'uni-video-toast-volume':_vm.gestureType==='volume'}},[_c('div',{staticClass:"uni-video-toast-title"},[_vm._v("音量")]),_c('svg',{staticClass:"uni-video-toast-icon",attrs:{"width":"200px","height":"200px","viewBox":"0 0 1024 1024","version":"1.1","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M475.400704 201.19552l0 621.674496q0 14.856192-10.856448 25.71264t-25.71264 10.856448-25.71264-10.856448l-190.273536-190.273536-149.704704 0q-14.856192 0-25.71264-10.856448t-10.856448-25.71264l0-219.414528q0-14.856192 10.856448-25.71264t25.71264-10.856448l149.704704 0 190.273536-190.273536q10.856448-10.856448 25.71264-10.856448t25.71264 10.856448 10.856448 25.71264zm219.414528 310.837248q0 43.425792-24.28416 80.851968t-64.2816 53.425152q-5.71392 2.85696-14.2848 2.85696-14.856192 0-25.71264-10.570752t-10.856448-25.998336q0-11.999232 6.856704-20.284416t16.570368-14.2848 19.427328-13.142016 16.570368-20.284416 6.856704-32.569344-6.856704-32.569344-16.570368-20.284416-19.427328-13.142016-16.570368-14.2848-6.856704-20.284416q0-15.427584 10.856448-25.998336t25.71264-10.570752q8.57088 0 14.2848 2.85696 39.99744 15.427584 64.2816 53.139456t24.28416 81.137664zm146.276352 0q0 87.422976-48.56832 161.41824t-128.5632 107.707392q-7.428096 2.85696-14.2848 2.85696-15.427584 0-26.284032-10.856448t-10.856448-25.71264q0-22.284288 22.284288-33.712128 31.997952-16.570368 43.425792-25.141248 42.283008-30.855168 65.995776-77.423616t23.712768-99.136512-23.712768-99.136512-65.995776-77.423616q-11.42784-8.57088-43.425792-25.141248-22.284288-11.42784-22.284288-33.712128 0-14.856192 10.856448-25.71264t25.71264-10.856448q7.428096 0 14.856192 2.85696 79.99488 33.712128 128.5632 107.707392t48.56832 161.41824zm146.276352 0q0 131.42016-72.566784 241.41312t-193.130496 161.989632q-7.428096 2.85696-14.856192 2.85696-14.856192 0-25.71264-10.856448t-10.856448-25.71264q0-20.570112 22.284288-33.712128 3.999744-2.285568 12.85632-5.999616t12.85632-5.999616q26.284032-14.2848 46.854144-29.140992 70.281216-51.996672 109.707264-129.705984t39.426048-165.132288-39.426048-165.132288-109.707264-129.705984q-20.570112-14.856192-46.854144-29.140992-3.999744-2.285568-12.85632-5.999616t-12.85632-5.999616q-22.284288-13.142016-22.284288-33.712128 0-14.856192 10.856448-25.71264t25.71264-10.856448q7.428096 0 14.856192 2.85696 120.563712 51.996672 193.130496 161.989632t72.566784 241.41312z"}})]),_c('div',{staticClass:"uni-video-toast-value"},[_c('div',{staticClass:"uni-video-toast-value-content",style:({width:_vm.volumeNew*100+'%'})},[_c('div',{staticClass:"uni-video-toast-volume-grids"},_vm._l((10),function(item,index){return _c('div',{key:index,staticClass:"uni-video-toast-volume-grids-item"})}),0)])])]),_c('div',{staticClass:"uni-video-toast",class:{'uni-video-toast-progress':_vm.gestureType=='progress'}},[_c('div',{staticClass:"uni-video-toast-title"},[_vm._v(_vm._s(_vm._f("getTime")(_vm.currentTimeNew))+" / "+_vm._s(_vm._f("getTime")(_vm.durationTime)))])])]),_c('div',{staticStyle:{"position":"absolute","top":"0","width":"100%","height":"100%","overflow":"hidden","pointer-events":"none"}},[_vm._t("default")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/view/components/video/index.vue?vue&type=template&id=f38201f6&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__("8af1");

// EXTERNAL MODULE: ./src/shared/index.js + 3 modules
var shared = __webpack_require__("f2b3");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/view/components/video/index.vue?vue&type=script&lang=js&
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
//


var passiveOptions = shared["h" /* supportsPassive */] ? {
  passive: false
} : false;
var GestureType = {
  NONE: 'none',
  STOP: 'stop',
  VOLUME: 'volume',
  PROGRESS: 'progress'
};
/* harmony default export */ var videovue_type_script_lang_js_ = ({
  name: 'Video',
  filters: {
    getTime: function getTime(time) {
      var h = Math.floor(time / 3600);
      var m = Math.floor(time % 3600 / 60);
      var s = Math.floor(time % 3600 % 60);
      h = (h < 10 ? '0' : '') + h;
      m = (m < 10 ? '0' : '') + m;
      s = (s < 10 ? '0' : '') + s;
      var str = m + ':' + s;

      if (h !== '00') {
        str = h + ':' + str;
      }

      return str;
    }
  },
  mixins: [mixins["d" /* subscriber */]],
  props: {
    id: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    duration: {
      type: [Number, String],
      default: ''
    },
    controls: {
      type: [Boolean, String],
      default: true
    },
    danmuList: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    danmuBtn: {
      type: [Boolean, String],
      default: false
    },
    enableDanmu: {
      type: [Boolean, String],
      default: false
    },
    autoplay: {
      type: [Boolean, String],
      default: false
    },
    loop: {
      type: [Boolean, String],
      default: false
    },
    muted: {
      type: [Boolean, String],
      default: false
    },
    objectFit: {
      type: String,
      default: 'contain'
    },
    poster: {
      type: String,
      default: ''
    },
    direction: {
      type: [String, Number],
      default: 360
    },
    showProgress: {
      type: Boolean,
      default: true
    },
    initialTime: {
      type: [String, Number],
      default: 0
    },
    showFullscreenBtn: {
      type: [Boolean, String],
      default: true
    },
    pageGesture: {
      type: [Boolean, String],
      default: false
    },
    enableProgressGesture: {
      type: [Boolean, String],
      default: true
    },
    showPlayBtn: {
      type: [Boolean, String],
      default: true
    },
    x5VideoPlayerType: {
      type: [Boolean, String],
      default: false
    },
    x5VideoPlayerFullscren: {
      type: [Boolean, String],
      default: false
    },
    x5VideoOrientation: {
      type: [Boolean, String],
      default: false
    },
    x5Playsinline: {
      type: [Boolean, String],
      default: false
    }
  },
  data: function data() {
    return {
      start: false,
      playing: false,
      currentTime: 0,
      durationTime: 0,
      progress: 0,
      touching: false,
      enableDanmuSync: Boolean(this.enableDanmu),
      controlsVisible: true,
      fullscreen: false,
      width: '0',
      height: '0',
      fullscreenTriggering: false,
      controlsTouching: false,
      directionSync: Number(this.direction),
      touchStartOrigin: {
        x: 0,
        y: 0
      },
      gestureType: GestureType.NONE,
      currentTimeOld: 0,
      currentTimeNew: 0,
      volumeOld: null,
      volumeNew: null,
      isIOS: false,
      buffered: 0,
      rotateType: ''
    };
  },
  computed: {
    controlsShow: function controlsShow() {
      return this.start && this.controls && this.controlsVisible;
    },
    autoHideContorls: function autoHideContorls() {
      return this.controlsShow && this.playing && !this.controlsTouching;
    },
    srcSync: function srcSync() {
      return this.$getRealPath(this.src);
    }
  },
  watch: {
    enableDanmuSync: function enableDanmuSync(val) {
      this.$emit('update:enableDanmu', val);
    },
    autoHideContorls: function autoHideContorls(val) {
      if (val) {
        this.autoHideStart();
      } else {
        this.autoHideEnd();
      }
    },
    fullscreen: function fullscreen(val) {
      var _this = this;

      var container = this.$refs.container;
      var playing = this.playing;
      this.fullscreenTriggering = true;
      container.remove();

      if (val) {
        this.resize();
        document.body.appendChild(container);
      } else {
        this.$el.appendChild(container);
      }

      this.$trigger('fullscreenchange', {}, {
        fullScreen: val
      });

      if (playing) {
        this.play();
      }

      setTimeout(function () {
        _this.fullscreenTriggering = false;
      }, 0);
    },
    direction: function direction(val) {
      this.directionSync = Number(val);
    },
    srcSync: function srcSync(val) {
      var _this2 = this;

      this.playing = false;
      this.currentTime = 0;

      if (val && this.autoplay) {
        this.$nextTick(function () {
          _this2.$refs.video.play();
        });
      }
    },
    currentTime: function currentTime() {
      this.updateProgress();
    },
    duration: function duration() {
      this.updateProgress();
    }
  },
  created: function created() {
    this.otherData = {
      danmuList: [],
      danmuIndex: {
        time: 0,
        index: -1
      },
      hideTiming: null
    };
    var danmuList = this.otherData.danmuList = JSON.parse(JSON.stringify(this.danmuList || []));
    danmuList.sort(function (a, b) {
      return (a.time || 0) - (a.time || 0);
    });
    this.width = window.innerWidth + 'px';
    this.height = window.innerHeight + 'px';
  },
  mounted: function mounted() {
    var self = this;
    var otherData = this.otherData;
    var video = this.$refs.video;
    var ball = this.$refs.ball;
    video.addEventListener('durationchange', function (event) {
      self.durationTime = video.duration;
    });
    video.addEventListener('loadedmetadata', function (event) {
      var initialTime = Number(self.initialTime) || 0;

      if (initialTime > 0) {
        video.currentTime = initialTime;
      }
    });
    video.addEventListener('progress', function (event) {
      var buffered = video.buffered;

      if (buffered.length) {
        self.buffered = buffered.end(buffered.length - 1) / video.duration;
      }
    });
    video.addEventListener('waiting', function ($event) {
      self.$trigger('waiting', $event, {});
    });
    video.addEventListener('error', function ($event) {
      self.playing = false;
      self.$trigger('error', $event, {});
    });
    video.addEventListener('play', function ($event) {
      self.start = true;
      self.playing = true;

      if (self.fullscreenTriggering) {
        return;
      }

      self.$trigger('play', $event, {});
    });
    video.addEventListener('pause', function ($event) {
      self.playing = false;

      if (self.fullscreenTriggering) {
        return;
      }

      self.$trigger('pause', $event, {});
    });
    video.addEventListener('ended', function ($event) {
      self.playing = false;
      self.$trigger('ended', $event, {});
    });
    video.addEventListener('timeupdate', function ($event) {
      var currentTime = self.currentTime = video.currentTime;
      var duration = video.duration;
      var oldDanmuIndex = otherData.danmuIndex;
      var danmuIndex = {
        time: currentTime,
        index: oldDanmuIndex.index
      };
      var danmuList = otherData.danmuList;

      if (currentTime > oldDanmuIndex.time) {
        for (var index = oldDanmuIndex.index + 1; index < danmuList.length; index++) {
          var element = danmuList[index];

          if (currentTime >= (element.time || 0)) {
            danmuIndex.index = index;

            if (self.playing && self.enableDanmuSync) {
              self.playDanmu(element);
            }
          } else {
            break;
          }
        }
      } else if (currentTime < oldDanmuIndex.time) {
        for (var _index = oldDanmuIndex.index - 1; _index > -1; _index--) {
          var _element = danmuList[_index];

          if (currentTime <= (_element.time || 0)) {
            danmuIndex.index = _index - 1;
          } else {
            break;
          }
        }
      }

      otherData.danmuIndex = danmuIndex;
      self.$trigger('timeupdate', $event, {
        currentTime: currentTime,
        duration: duration
      });
    });
    video.addEventListener('x5videoenterfullscreen', function ($event) {
      self.$trigger('fullscreenchange', $event, {
        fullScreen: true
      });
    });
    video.addEventListener('x5videoexitfullscreen', function ($event) {
      self.$trigger('fullscreenchange', $event, {
        fullScreen: false
      });
    });
    var originX;
    var originY;
    var moveOnce = true;
    var originProgress;
    ball.addEventListener('touchstart', function (event) {
      self.controlsTouching = true;
      var toucher = self.getScreenXY(event.targetTouches[0]);
      originX = toucher.pageX;
      originY = toucher.pageY;
      originProgress = self.progress;
      moveOnce = true;
      self.touching = true;
      ball.addEventListener('touchmove', touchmove, passiveOptions);
    });

    function touchmove(event) {
      var toucher = self.getScreenXY(event.targetTouches[0]);
      var pageX = toucher.pageX;
      var pageY = toucher.pageY;

      if (moveOnce && Math.abs(pageX - originX) < Math.abs(pageY - originY)) {
        touchend();
        return;
      }

      moveOnce = false;
      var w = self.$refs.progress.offsetWidth;
      var progress = originProgress + (pageX - originX) / w * 100;

      if (progress < 0) {
        progress = 0;
      } else if (progress > 100) {
        progress = 100;
      }

      self.progress = progress;
      event.preventDefault();
      event.stopPropagation();
    }

    function touchend(event) {
      self.controlsTouching = false;

      if (self.touching) {
        ball.removeEventListener('touchmove', touchmove, passiveOptions);

        if (!moveOnce) {
          event.preventDefault();
          event.stopPropagation();
          self.seek(self.$refs.video.duration * self.progress / 100);
        }

        self.touching = false;
      }
    }

    ball.addEventListener('touchend', touchend);
    ball.addEventListener('touchcancel', touchend);

    if (String(this.srcSync).length && this.autoplay) {
      video.play();
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.$refs.container.remove();
    clearTimeout(this.otherData.hideTiming);
  },
  methods: {
    _handleSubscribe: function _handleSubscribe(_ref) {
      var type = _ref.type,
          _ref$data = _ref.data,
          data = _ref$data === void 0 ? {} : _ref$data;

      switch (type) {
        case 'play':
          this.play();
          break;

        case 'pause':
          this.pause();
          break;

        case 'seek':
          this.seek(data.position);
          break;

        case 'sendDanmu':
          this.sendDanmu(data);
          break;

        case 'playbackRate':
          this.$refs.video.playbackRate = data.rate;
          break;

        case 'requestFullScreen':
          this.enterFullscreen();
          break;

        case 'exitFullScreen':
          this.leaveFullscreen();
          break;
      }
    },
    resize: function resize() {
      var w = window.innerWidth;
      var h = window.innerHeight;
      var direction = Math.abs(this.directionSync);

      if (direction === 0) {
        if (w > h) {
          this.rotateType = 'left';
        } else {
          this.rotateType = '';
        }
      } else if (direction === 90) {
        if (w > h) {
          this.rotateType = '';
        } else {
          this.rotateType = 'right';
        }
      } else {
        this.rotateType = '';
      }

      if (!this.rotateType) {
        this.width = w + 'px';
        this.height = h + 'px';
      } else {
        this.width = h + 'px';
        this.height = w + 'px';
      }
    },
    trigger: function trigger() {
      if (this.playing) {
        this.$refs.video.pause();
      } else {
        this.$refs.video.play();
      }
    },
    play: function play() {
      this.start = true;
      this.$refs.video.play();
    },
    pause: function pause() {
      this.$refs.video.pause();
    },
    seek: function seek(position) {
      position = Number(position);

      if (typeof position === 'number' && !isNaN(position)) {
        this.$refs.video.currentTime = position;
      }
    },
    clickProgress: function clickProgress(event) {
      var x = event.offsetX;
      var _progress = this.$refs.progress;
      var element = event.target;

      while (element !== _progress) {
        x += element.offsetLeft;
        element = element.parentNode;
      }

      var w = _progress.offsetWidth;
      var progress = 0;

      if (x >= 0 && x <= w) {
        progress = x / w;
        this.seek(this.$refs.video.duration * progress);
      }
    },
    triggerDanmu: function triggerDanmu() {
      this.enableDanmuSync = !this.enableDanmuSync;
    },
    playDanmu: function playDanmu(danmu) {
      var p = document.createElement('p');
      p.className = 'uni-video-danmu-item';
      p.innerText = danmu.text;
      var style = "bottom: ".concat(Math.random() * 100, "%;color: ").concat(danmu.color, ";");
      p.setAttribute('style', style);
      this.$refs.danmu.appendChild(p);
      setTimeout(function () {
        style += 'left: 0;-webkit-transform: translateX(-100%);transform: translateX(-100%);';
        p.setAttribute('style', style);
        setTimeout(function () {
          p.remove();
        }, 4000);
      }, 17);
    },
    sendDanmu: function sendDanmu(danmu) {
      var otherData = this.otherData;
      otherData.danmuList.splice(otherData.danmuIndex.index + 1, 0, {
        text: String(danmu.text),
        color: danmu.color,
        time: this.$refs.video.currentTime || 0
      });
    },
    triggerFullscreen: function triggerFullscreen() {
      this.fullscreen = !this.fullscreen;
    },
    enterFullscreen: function enterFullscreen(direction) {
      var directionSync = Number(direction);

      if (!isNaN(NaN)) {
        this.directionSync = directionSync;
      }

      this.fullscreen = true;
    },
    leaveFullscreen: function leaveFullscreen() {
      this.fullscreen = false;
    },
    triggerControls: function triggerControls() {
      this.controlsVisible = !this.controlsVisible;
    },
    touchstart: function touchstart(event) {
      var toucher = this.getScreenXY(event.targetTouches[0]);
      this.touchStartOrigin = {
        x: toucher.pageX,
        y: toucher.pageY
      };
      this.gestureType = GestureType.NONE;
      this.volumeOld = null;
      this.currentTimeOld = this.currentTimeNew = 0;
    },
    touchmove: function touchmove(event) {
      function stop() {
        event.stopPropagation();
        event.preventDefault();
      }

      if (this.fullscreen) {
        stop();
      }

      var gestureType = this.gestureType;

      if (gestureType === GestureType.STOP) {
        return;
      }

      var toucher = this.getScreenXY(event.targetTouches[0]);
      var pageX = toucher.pageX;
      var pageY = toucher.pageY;
      var origin = this.touchStartOrigin;

      if (gestureType === GestureType.PROGRESS) {
        this.changeProgress(pageX - origin.x);
      } else if (gestureType === GestureType.VOLUME) {
        this.changeVolume(pageY - origin.y);
      }

      if (gestureType !== GestureType.NONE) {
        return;
      }

      if (Math.abs(pageX - origin.x) > Math.abs(pageY - origin.y)) {
        if (!this.enableProgressGesture) {
          this.gestureType = GestureType.STOP;
          return;
        }

        this.gestureType = GestureType.PROGRESS;
        this.currentTimeOld = this.currentTimeNew = this.$refs.video.currentTime;

        if (!this.fullscreen) {
          stop();
        }
      } else {
        if (!this.pageGesture) {
          this.gestureType = GestureType.STOP;
          return;
        }

        this.gestureType = GestureType.VOLUME;
        this.volumeOld = this.$refs.video.volume;

        if (!this.fullscreen) {
          stop();
        }
      }
    },
    touchend: function touchend(event) {
      if (this.gestureType !== GestureType.NONE && this.gestureType !== GestureType.STOP) {
        event.stopPropagation();
        event.preventDefault();
      }

      if (this.gestureType === GestureType.PROGRESS && this.currentTimeOld !== this.currentTimeNew) {
        this.$refs.video.currentTime = this.currentTimeNew;
      }

      this.gestureType = GestureType.NONE;
    },
    changeProgress: function changeProgress(x) {
      var duration = this.$refs.video.duration;
      var currentTimeNew = x / 600 * duration + this.currentTimeOld;

      if (currentTimeNew < 0) {
        currentTimeNew = 0;
      } else if (currentTimeNew > duration) {
        currentTimeNew = duration;
      }

      this.currentTimeNew = currentTimeNew;
    },
    changeVolume: function changeVolume(y) {
      var valueOld = this.volumeOld;
      var value;

      if (typeof valueOld === 'number') {
        value = valueOld - y / 200;

        if (value < 0) {
          value = 0;
        } else if (value > 1) {
          value = 1;
        }

        this.$refs.video.volume = value;
        this.volumeNew = value;
      }
    },
    autoHideStart: function autoHideStart() {
      var _this3 = this;

      this.otherData.hideTiming = setTimeout(function () {
        _this3.controlsVisible = false;
      }, 3000);
    },
    autoHideEnd: function autoHideEnd() {
      var otherData = this.otherData;

      if (otherData.hideTiming) {
        clearTimeout(otherData.hideTiming);
        otherData.hideTiming = null;
      }
    },
    getScreenXY: function getScreenXY(dataOrigin) {
      var rotateType = this.rotateType;

      if (!this.fullscreen || !rotateType) {
        return dataOrigin;
      }

      var w = screen.width;
      var h = screen.height;
      var x = dataOrigin.pageX;
      var y = dataOrigin.pageY;
      var pageX;
      var pageY;

      if (rotateType === 'left') {
        pageX = h - y;
        pageY = x;
      } else {
        pageX = y;
        pageY = w - x;
      }

      return {
        pageX: pageX,
        pageY: pageY
      };
    },
    updateProgress: function updateProgress() {
      if (!this.touching) {
        this.progress = this.currentTime / this.durationTime * 100;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/platforms/h5/view/components/video/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_videovue_type_script_lang_js_ = (videovue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/platforms/h5/view/components/video/index.vue?vue&type=style&index=0&lang=css&
var videovue_type_style_index_0_lang_css_ = __webpack_require__("856e");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

// CONCATENATED MODULE: ./src/platforms/h5/view/components/video/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_videovue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var video = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "33ab":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "33ed":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return disableScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return pageScrollTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createScrollListener; });
/* harmony import */ var uni_platform_view_bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4a59");

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
    // publish
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("501c")))

/***/ }),

/***/ "347e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {/* harmony import */ var uni_mixins_scroller_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8aec");
/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("f2b3");
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


var passiveOptions = uni_shared__WEBPACK_IMPORTED_MODULE_1__[/* supportsPassive */ "h"] ? {
  passive: true
} : false;
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'ScrollView',
  mixins: [uni_mixins_scroller_index__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]],
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
    this.$refs.main.addEventListener('scroll', this.__handleScroll, uni_shared__WEBPACK_IMPORTED_MODULE_1__[/* supportsPassive */ "h"] ? {
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
    this.$refs.main.removeEventListener('scroll', this.__handleScroll, uni_shared__WEBPACK_IMPORTED_MODULE_1__[/* supportsPassive */ "h"] ? {
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3ad9")["default"]))

/***/ }),

/***/ "34b2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getImageInfo", function() { return getImageInfo; });
/* harmony import */ var uni_platform_helpers_get_real_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cb0f");


function _getServiceAddress() {
  return window.location.protocol + '//' + window.location.host;
}

function getImageInfo(_ref, callbackId) {
  var src = _ref.src;
  var _UniServiceJSBridge = UniServiceJSBridge,
      invoke = _UniServiceJSBridge.invokeCallbackHandler;
  var img = new Image();
  var realPath = Object(uni_platform_helpers_get_real_path__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(src);

  img.onload = function () {
    invoke(callbackId, {
      errMsg: 'getImageInfo:ok',
      width: img.naturalWidth,
      height: img.naturalHeight,
      path: realPath.indexOf('/') === 0 ? _getServiceAddress() + realPath : realPath
    });
  };

  img.onerror = function (e) {
    invoke(callbackId, {
      errMsg: 'getImageInfo:fail'
    });
  };

  img.src = src;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "3858":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStorage", function() { return setStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStorageSync", function() { return setStorageSync; });
var setStorage = {
  'key': {
    type: String,
    required: true
  },
  'data': {
    required: true
  }
};
var setStorageSync = [{
  name: 'key',
  type: String,
  required: true
}, {
  name: 'data',
  required: true
}];

/***/ }),

/***/ "3ad9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {var unshift = Array.prototype.unshift;

function format(args) {
  unshift.call(args, '[system]');
  return args;
}

function createLog(method) {
  return function () {
    var printLog = true;

    if (method === 'debug' && !__uniConfig.debug) {
      printLog = false;
    }

    printLog && global.console[method].apply(global.console, format(arguments));
  };
}

/* harmony default export */ __webpack_exports__["default"] = ({
  log: createLog('log'),
  info: createLog('info'),
  warn: createLog('warn'),
  debug: createLog('debug'),
  error: createLog('error')
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("24aa")))

/***/ }),

/***/ "3d1f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initSubscribe; });
/* harmony import */ var uni_helpers_callbacks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("62b5");
/* harmony import */ var _plugins_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("a741");


function initSubscribe(subscribe, _ref) {
  var getApp = _ref.getApp,
      getCurrentPages = _ref.getCurrentPages;

  function createPageEvent(eventType) {
    return function (args, pageId) {
      var pages = getCurrentPages();
      var page = pages.find(function (page) {
        return page.$page.id === pageId;
      });

      if (page) {
        Object(_plugins_util__WEBPACK_IMPORTED_MODULE_1__[/* callPageHook */ "b"])(page, eventType, args);
      } else {
        console.error("Not Found\uFF1APage[".concat(pageId, "]"));
      }
    };
  }

  var requestComponentInfoCallbacks = Object(uni_helpers_callbacks__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('requestComponentInfo');

  function onRequestComponentInfo(_ref2) {
    var reqId = _ref2.reqId,
        res = _ref2.res;
    var callback = requestComponentInfoCallbacks.pop(reqId);

    if (callback) {
      callback(res);
    }
  }

  var requestComponentObserverCallbacks = Object(uni_helpers_callbacks__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('requestComponentObserver');

  function onRequestComponentObserver(_ref3) {
    var reqId = _ref3.reqId,
        reqEnd = _ref3.reqEnd,
        res = _ref3.res;
    var callback = requestComponentObserverCallbacks.get(reqId);

    if (callback) {
      if (reqEnd) {
        requestComponentObserverCallbacks.pop(reqId);
        return;
      }

      callback(res);
    }
  }

  subscribe('onPageReady', createPageEvent('onReady'));
  subscribe('onPageScroll', createPageEvent('onPageScroll'));
  subscribe('onReachBottom', createPageEvent('onReachBottom'));
  subscribe('onRequestComponentInfo', onRequestComponentInfo);
  subscribe('onRequestComponentObserver', onRequestComponentObserver);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3ad9")["default"]))

/***/ }),

/***/ "3d64":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onNetworkStatusChange", function() { return onNetworkStatusChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNetworkType", function() { return getNetworkType; });
var _UniServiceJSBridge = UniServiceJSBridge,
    invoke = _UniServiceJSBridge.invokeCallbackHandler;
var callbackIds = [];

function _getEffectiveNetworkType() {
  var connectionType = navigator.connection.type;
  var networkType = '';

  if (~['none', 'wifi', 'unknown'].indexOf(connectionType)) {
    networkType = connectionType;
  } else {
    var effectiveType = navigator.connection.effectiveType;

    if (effectiveType === 'slow-2g') {
      effectiveType = '2g';
    }

    networkType = effectiveType;
  }

  return networkType;
}

function changeHandler() {
  var isConnected = true;

  var networkType = _getEffectiveNetworkType();

  if (networkType === 'none') {
    isConnected = false;
  }

  callbackIds.forEach(function (callbackId) {
    callbackId && invoke(callbackId, {
      errMsg: 'onNetworkStatusChange:ok',
      isConnected: isConnected,
      networkType: networkType
    });
  });
}

function onNetworkStatusChange(callbackId) {
  if (window.NetworkInformation) {
    callbackIds.push(callbackId);
    navigator.connection.onchange = changeHandler;
  } else {
    callbackId && invoke(callbackId, {
      errMsg: 'onNetworkStatusChange:fail'
    });
  }
}
function getNetworkType() {
  if (window.NetworkInformation) {
    return {
      errMsg: 'getNetworkType:ok',
      networkType: _getEffectiveNetworkType()
    };
  } else {
    return {
      errMsg: 'getNetworkType:fail'
    };
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "3da9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("33ab");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "3e8c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/resize-sensor/index.vue?vue&type=script&lang=js&
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
var resize_sensorvue_type_style_index_0_lang_css_ = __webpack_require__("64d0");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var resize_sensor = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "3f7e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1a33");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "4043":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setNavigationBarColor", function() { return setNavigationBarColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setNavigationBarTitle", function() { return setNavigationBarTitle; });
var FRONT_COLORS = ['#ffffff', '#000000'];
var setNavigationBarColor = {
  'frontColor': {
    type: String,
    required: true,
    validator: function validator(frontColor, params) {
      if (FRONT_COLORS.indexOf(frontColor) === -1) {
        return "invalid frontColor \"".concat(frontColor, "\"");
      }
    }
  },
  'backgroundColor': {
    type: String,
    required: true
  },
  'animation': {
    type: Object,
    default: function _default() {
      return {
        duration: 0,
        timingFunc: 'linear'
      };
    },
    validator: function validator() {
      var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var params = arguments.length > 1 ? arguments[1] : undefined;
      params.animation = {
        duration: animation.duration || 0,
        timingFunc: animation.timingFunc || 'linear'
      };
    }
  }
};
var setNavigationBarTitle = {
  'title': {
    type: String,
    required: true
  }
};

/***/ }),

/***/ "40ab":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "redirectTo", function() { return redirectTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reLaunch", function() { return reLaunch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigateTo", function() { return navigateTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "switchTab", function() { return switchTab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigateBack", function() { return navigateBack; });
/* harmony import */ var _get_real_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0f74");


function encodeQueryString(url) {
  if (typeof url !== 'string') {
    return url;
  }

  var index = url.indexOf('?');

  if (index === -1) {
    return url;
  }

  var query = url.substr(index + 1).trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return url;
  }

  url = url.substr(0, index);
  var params = [];
  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = parts.shift();
    var val = parts.length > 0 ? parts.join('=') : '';
    params.push(key + '=' + encodeURIComponent(val));
  });
  return params.length ? url + '?' + params.join('&') : url;
}

function createValidator(type) {
  return function validator(url, params) {
    // 格式化为绝对路径路由
    url = Object(_get_real_route__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(url);
    var pagePath = url.split('?')[0]; // 匹配路由是否存在

    var routeOptions = __uniRoutes.find(function (_ref) {
      var path = _ref.path,
          alias = _ref.alias;
      return path === pagePath || alias === pagePath;
    });

    if (!routeOptions) {
      return 'page `' + url + '` is not found';
    } // 检测不同类型跳转


    if (type === 'navigateTo' || type === 'redirectTo') {
      if (routeOptions.meta.isTabBar) {
        return "can not ".concat(type, " a tabbar page");
      }
    } else if (type === 'switchTab') {
      if (!routeOptions.meta.isTabBar) {
        return 'can not switch to no-tabBar page';
      }
    } // tabBar不允许传递参数


    if (routeOptions.meta.isTabBar) {
      url = pagePath;
    } // 首页自动格式化为`/`


    if (routeOptions.meta.isEntry) {
      url = url.replace(routeOptions.alias, '/');
    } // 参数格式化


    params.url = encodeQueryString(url);
  };
}

function createProtocol(type) {
  var extras = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.assign({
    url: {
      type: String,
      required: true,
      validator: createValidator(type)
    }
  }, extras);
}

function createAnimationProtocol(animationTypes) {
  return {
    animationType: {
      type: String,
      validator: function validator(type) {
        if (type && animationTypes.indexOf(type) === -1) {
          return '`' + type + '` is not supported for `animationType` (supported values are: `' + animationTypes.join('`|`') + '`)';
        }
      }
    },
    animationDuration: {
      type: Number
    }
  };
}

var redirectTo = createProtocol('redirectTo');
var reLaunch = createProtocol('reLaunch');
var navigateTo = createProtocol('navigateTo', createAnimationProtocol(['slide-in-right', 'slide-in-left', 'slide-in-top', 'slide-in-bottom', 'fade-in', 'zoom-out', 'zoom-fade-out', 'pop-in', 'none']));
var switchTab = createProtocol('switchTab');
var navigateBack = Object.assign({
  delta: {
    type: Number,
    validator: function validator(delta, params) {
      delta = parseInt(delta) || 1;
      params.delta = Math.min(getCurrentPages().length - 1, delta);
    }
  }
}, createAnimationProtocol(['slide-out-right', 'slide-out-left', 'slide-out-top', 'slide-out-bottom', 'fade-out', 'zoom-in', 'zoom-fade-in', 'pop-out', 'none']));

/***/ }),

/***/ "42fb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createIntersectionObserver", function() { return createIntersectionObserver; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8bbf");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uni_helpers_callbacks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("62b5");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var createIntersectionObserverCallbacks = Object(uni_helpers_callbacks__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])('requestComponentObserver');
var defaultOptions = {
  thresholds: [0],
  initialRatio: 0,
  observeAll: false
};

var MPIntersectionObserver =
/*#__PURE__*/
function () {
  function MPIntersectionObserver(pageId, options) {
    _classCallCheck(this, MPIntersectionObserver);

    this.pageId = pageId;
    this.options = Object.assign({}, defaultOptions, options);
  }

  _createClass(MPIntersectionObserver, [{
    key: "_makeRootMargin",
    value: function _makeRootMargin() {
      var margins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.options.rootMargin = ['top', 'right', 'bottom', 'left'].map(function (name) {
        return "".concat(Number(margins[name]) || 0, "px");
      }).join(' ');
    }
  }, {
    key: "relativeTo",
    value: function relativeTo(selector, margins) {
      this.options.relativeToSelector = selector;

      this._makeRootMargin(margins);

      return this;
    }
  }, {
    key: "relativeToViewport",
    value: function relativeToViewport(margins) {
      this.options.relativeToSelector = null;

      this._makeRootMargin(margins);

      return this;
    }
  }, {
    key: "observe",
    value: function observe(selector, callback) {
      if (typeof callback !== 'function') {
        return;
      }

      this.options.selector = selector;
      this.reqId = createIntersectionObserverCallbacks.push(callback);
      UniServiceJSBridge.publishHandler('requestComponentObserver', {
        reqId: this.reqId,
        options: this.options
      }, this.pageId);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      UniServiceJSBridge.publishHandler('destroyComponentObserver', {
        reqId: this.reqId
      }, this.pageId);
    }
  }]);

  return MPIntersectionObserver;
}();

function createIntersectionObserver(context, options) {
  if (!(context instanceof vue__WEBPACK_IMPORTED_MODULE_0___default.a)) {
    options = context;
    context = null;
  }

  if (context) {
    return new MPIntersectionObserver(context.$page.id, options);
  }

  var app = getApp();

  if (app.$route && app.$route.params.__id__) {
    return new MPIntersectionObserver(app.$route.params.__id__, options);
  } else {
    UniServiceJSBridge.emit('onError', 'createIntersectionObserver:fail');
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "439a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadFile", function() { return downloadFile; });
var downloadFile = {
  url: {
    type: String,
    required: true
  },
  header: {
    type: Object,
    validator: function validator(value, params) {
      params.header = value || {};
    }
  }
};

/***/ }),

/***/ "442e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8bbf");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uni_helpers_tags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5129");
/* harmony import */ var uni_helpers_tags__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uni_helpers_tags__WEBPACK_IMPORTED_MODULE_1__);
 // 使用白名单过滤（前期有一批自定义组件使用了 uni-）


var oldIsReservedTag = vue__WEBPACK_IMPORTED_MODULE_0___default.a.config.isReservedTag;

vue__WEBPACK_IMPORTED_MODULE_0___default.a.config.isReservedTag = function (tag) {
  return uni_helpers_tags__WEBPACK_IMPORTED_MODULE_1___default.a.indexOf(tag) !== -1 || oldIsReservedTag(tag);
};

vue__WEBPACK_IMPORTED_MODULE_0___default.a.config.ignoredElements = uni_helpers_tags__WEBPACK_IMPORTED_MODULE_1___default.a;
var oldGetTagNamespace = vue__WEBPACK_IMPORTED_MODULE_0___default.a.config.getTagNamespace;
var conflictTags = ['switch', 'image', 'text', 'view'];

vue__WEBPACK_IMPORTED_MODULE_0___default.a.config.getTagNamespace = function (tag) {
  if (~conflictTags.indexOf(tag)) {
    // svg 部分标签名称与 uni 标签冲突
    return false;
  }

  return oldGetTagNamespace(tag) || false;
};

vue__WEBPACK_IMPORTED_MODULE_0___default.a.config.errorHandler = function (err, vm, info) {
  UniServiceJSBridge.emit('onError', err);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "44de":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vibrateLong", function() { return vibrateLong; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vibrateShort", function() { return vibrateShort; });
var _isSupport = !!window.navigator.vibrate;

function vibrateLong() {
  if (_isSupport && window.navigator.vibrate(400)) {
    return {
      errMsg: 'vibrateLong:ok'
    };
  } else {
    return {
      errMsg: 'vibrateLong:fail'
    };
  }
}
function vibrateShort() {
  if (_isSupport && window.navigator.vibrate(15)) {
    return {
      errMsg: 'vibrateShort:ok'
    };
  } else {
    return {
      errMsg: 'vibrateShort:fail'
    };
  }
}

/***/ }),

/***/ "4509":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4656":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4871":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "488c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4a59":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return publishHandler; });
function publishHandler(event, args, pageId) {
  // h5 平台直接调用UniServiceJSBridge
  global.UniServiceJSBridge.subscribeHandler(event, args, pageId);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("24aa")))

/***/ }),

/***/ "4c68":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return requestComponentObserver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return destroyComponentObserver; });
/* harmony import */ var intersection_observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5abe");
/* harmony import */ var intersection_observer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(intersection_observer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uni_helpers_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("85b6");



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
          dataset: Object(uni_helpers_index__WEBPACK_IMPORTED_MODULE_1__[/* normalizeDataset */ "c"])(entrie.target.dataset || {}),
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("501c")))

/***/ }),

/***/ "4ca9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(console) {/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6389");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uni_helpers_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("85b6");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("abbf");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("0784");
/* harmony import */ var _lifecycle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("aa92");
/* harmony import */ var _app_router_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("23e5");







function getMinId(routes) {
  var minId = 0;
  routes.forEach(function (route) {
    if (route.meta.id) {
      minId++;
    }
  });
  return minId;
}

function getHash() {
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : decodeURI(href.slice(index + 1));
}

function getLocation() {
  var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
  var path = decodeURI(window.location.pathname);

  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }

  return (path || '/') + window.location.search + window.location.hash;
}
/**
 * Service 层 Vue 插件
 * 1.init keepAliveInclude?
 * 2.init router
 * 3.init entryRoute
 * 4.hack vue _init (app)
 * 5.use router
 */


/* harmony default export */ __webpack_exports__["default"] = ({
  install: function install(Vue) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        routes = _ref.routes;

    Object(_lifecycle__WEBPACK_IMPORTED_MODULE_4__[/* lifecycleMixin */ "a"])(Vue);
    var minId = getMinId(routes);
    var router = new vue_router__WEBPACK_IMPORTED_MODULE_0___default.a({
      id: minId,
      mode: __uniConfig.router.mode,
      base: __uniConfig.router.base,
      routes: routes,
      scrollBehavior: function scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition;
        } else {
          if (to && from && to.meta.isTabBar && from.meta.isTabBar) {
            // tabbar 跳 tabbar
            var position = Object(_app_router_guard__WEBPACK_IMPORTED_MODULE_5__[/* getTabBarScrollPosition */ "b"])(to.params.__id__);

            if (position) {
              return position;
            }
          }

          return {
            x: 0,
            y: 0
          };
        }
      }
    });
    var keepAliveInclude = []; // 需跨平台，根据用户配置 hash 或 history 来调用

    var entryRoute = router.match(__uniConfig.router.mode === 'history' ? getLocation(__uniConfig.router.base) : getHash());

    if (entryRoute.meta.name) {
      if (entryRoute.meta.id) {
        keepAliveInclude.push(entryRoute.meta.name + '-' + entryRoute.meta.id);
      } else {
        keepAliveInclude.push(entryRoute.meta.name + '-' + (minId + 1));
      }
    }
    /* eslint-disable no-undef */


    if (true) {
      if (entryRoute.meta && entryRoute.meta.name) {
        document.body.className = 'uni-body ' + entryRoute.meta.name;

        if (entryRoute.meta.isNVue) {
          var nvueDirKey = 'nvue-dir-' + __uniConfig.nvue['flex-direction'];
          document.body.setAttribute('nvue', '');
          document.body.setAttribute(nvueDirKey, '');
        }
      }
    }

    Vue.mixin({
      beforeCreate: function beforeCreate() {
        var options = this.$options;

        if (options.mpType === 'app') {
          options.data = function () {
            return {
              keepAliveInclude: keepAliveInclude
            };
          };

          var appMixin = Object(_app__WEBPACK_IMPORTED_MODULE_2__[/* createAppMixin */ "a"])(routes, entryRoute); // mixin app hooks

          Object.keys(appMixin).forEach(function (hook) {
            options[hook] = options[hook] ? [].concat(appMixin[hook], options[hook]) : [appMixin[hook]];
          }); // router

          options.router = router; // onError

          if (!Array.isArray(options.onError) || options.onError.length === 0) {
            options.onError = [function (err) {
              console.error(err);
            }];
          }
        } else if (Object(uni_helpers_index__WEBPACK_IMPORTED_MODULE_1__[/* isPage */ "b"])(this)) {
          var pageMixin = Object(_page__WEBPACK_IMPORTED_MODULE_3__[/* createPageMixin */ "a"])(); // mixin page hooks

          Object.keys(pageMixin).forEach(function (hook) {
            options[hook] = options[hook] ? [].concat(pageMixin[hook], options[hook]) : [pageMixin[hook]];
          });
        } else {
          if (this.$parent && this.$parent.__page__) {
            this.__page__ = this.$parent.__page__;
          }
        }
      }
    });
    Object.defineProperty(Vue.prototype, '$page', {
      get: function get() {
        return this.__page__;
      }
    });

    Vue.prototype.createSelectorQuery = function createSelectorQuery() {
      return uni.createSelectorQuery().in(this);
    };

    Vue.prototype.createIntersectionObserver = function createIntersectionObserver(args) {
      return uni.createIntersectionObserver(this, args);
    };

    Vue.use(vue_router__WEBPACK_IMPORTED_MODULE_0___default.a);
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3ad9")["default"]))

/***/ }),

/***/ "4da7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/text/index.vue?vue&type=script&lang=js&
var textvue_type_script_lang_js_ = __webpack_require__("4f97");

// CONCATENATED MODULE: ./src/core/view/components/text/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_textvue_type_script_lang_js_ = (textvue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./src/core/view/components/text/index.vue?vue&type=style&index=0&lang=css&
var textvue_type_style_index_0_lang_css_ = __webpack_require__("c8ed");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var components_text = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "4ebb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64ToArrayBuffer", function() { return base64ToArrayBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayBufferToBase64", function() { return arrayBufferToBase64; });
/* harmony import */ var base64_arraybuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8390");
/* harmony import */ var base64_arraybuffer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(base64_arraybuffer__WEBPACK_IMPORTED_MODULE_0__);

var base64ToArrayBuffer = base64_arraybuffer__WEBPACK_IMPORTED_MODULE_0__["decode"];
var arrayBufferToBase64 = base64_arraybuffer__WEBPACK_IMPORTED_MODULE_0__["encode"];

/***/ }),

/***/ "4ec0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge, console) {/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f2b3");
/* harmony import */ var uni_helpers_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("65a8");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("81ea");
/* harmony import */ var _popup_mixins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("f1ea");
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




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'App',
  components: _components__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"],
  mixins: _popup_mixins__WEBPACK_IMPORTED_MODULE_3__["default"],
  props: {
    keepAliveInclude: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      transitionName: 'fade',
      hideTabBar: false,
      tabBar: __uniConfig.tabBar || {}
    };
  },
  computed: {
    key: function key() {
      return this.$route.meta.name + '-' + this.$route.params.__id__ + '-' + (__uniConfig.reLaunch || 1);
    },
    hasTabBar: function hasTabBar() {
      return __uniConfig.tabBar && __uniConfig.tabBar.list && __uniConfig.tabBar.list.length;
    },
    showTabBar: function showTabBar() {
      return this.$route.meta.isTabBar && !this.hideTabBar;
    }
  },
  watch: {
    $route: function $route(newRoute, oldRoute) {
      UniServiceJSBridge.emit('onHidePopup');
    },
    hideTabBar: function hideTabBar(newVal, oldVal) {
      // TODO 不支持 css 变量时
      if (uni.canIUse('css.var')) {
        var windowBottom = !newVal ? uni_helpers_constants__WEBPACK_IMPORTED_MODULE_1__[/* TABBAR_HEIGHT */ "b"] + 'px' : '0px';
        document.documentElement.style.setProperty('--window-bottom', windowBottom);
        console.debug("uni.".concat(windowBottom ? 'showTabBar' : 'hideTabBar', "\uFF1A--window-bottom=").concat(windowBottom));
      } // 触发 resize 事件


      window.dispatchEvent(new CustomEvent('resize'));
    }
  },
  created: function created() {
    if (uni.canIUse('css.var')) {
      document.documentElement.style.setProperty('--status-bar-height', '0px');
    }
  },
  mounted: function mounted() {
    window.addEventListener('message', function (evt) {
      if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isPlainObject */ "f"])(evt.data) && evt.data.type === 'WEB_INVOKE_APPSERVICE') {
        UniServiceJSBridge.emit('onWebInvokeAppService', evt.data.data, evt.data.pageId);
      }
    });
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        UniServiceJSBridge.emit('onAppEnterForeground');
      } else {
        UniServiceJSBridge.emit('onAppEnterBackground');
      }
    });
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1"), __webpack_require__("3ad9")["default"]))

/***/ }),

/***/ "4f1c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/switch/index.vue?vue&type=template&id=4b47fc1e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-switch',_vm._g({on:{"click":_vm._onClick}},_vm.$listeners),[_c('div',{staticClass:"uni-switch-wrapper"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.type === 'switch'),expression:"type === 'switch'"}],staticClass:"uni-switch-input",class:[_vm.switchChecked ? 'uni-switch-input-checked' : ''],style:({backgroundColor: _vm.switchChecked ? _vm.color : '#DFDFDF',borderColor:_vm.switchChecked ? _vm.color : '#DFDFDF'})}),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.type === 'checkbox'),expression:"type === 'checkbox'"}],staticClass:"uni-checkbox-input",class:[_vm.switchChecked ? 'uni-checkbox-input-checked' : ''],style:({color: _vm.color})})])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/switch/index.vue?vue&type=template&id=4b47fc1e&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__("8af1");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/switch/index.vue?vue&type=script&lang=js&
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
var switchvue_type_style_index_0_lang_css_ = __webpack_require__("a5ec");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var components_switch = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "4f43":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadFile", function() { return downloadFile; });
/* harmony import */ var uni_platform_helpers_file__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e2e2");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * 下载任务
 */

var DownloadTask =
/*#__PURE__*/
function () {
  function DownloadTask(xhr) {
    _classCallCheck(this, DownloadTask);

    _defineProperty(this, "_xhr", void 0);

    _defineProperty(this, "_callbacks", []);

    this._xhr = xhr;
  }
  /**
   * 监听下载进度
   * @param {Function} callback 回调
   */


  _createClass(DownloadTask, [{
    key: "onProgressUpdate",
    value: function onProgressUpdate(callback) {
      if (typeof callback !== 'function') {
        return;
      }

      this._callbacks.push(callback);
    }
    /**
     * 停止任务
     */

  }, {
    key: "abort",
    value: function abort() {
      if (this._xhr) {
        this._xhr.abort();

        delete this._xhr;
      }
    }
  }]);

  return DownloadTask;
}();
/**
 * 下载文件
 * @param {*} param0
 * @param {string} callbackId
 * @return {DownloadTask}
 */


function downloadFile(_ref, callbackId) {
  var url = _ref.url,
      header = _ref.header;
  var timeout = __uniConfig.networkTimeout && __uniConfig.networkTimeout.downloadFile || 60 * 1000;
  var _UniServiceJSBridge = UniServiceJSBridge,
      invoke = _UniServiceJSBridge.invokeCallbackHandler;
  var timer;
  var xhr = new XMLHttpRequest();
  var downloadTask = new DownloadTask(xhr);
  xhr.open('GET', url, true);
  Object.keys(header).forEach(function (key) {
    xhr.setRequestHeader(key, header[key]);
  });
  xhr.responseType = 'blob';

  xhr.onload = function () {
    clearTimeout(timer);
    var statusCode = xhr.status;
    var blob = this.response;
    invoke(callbackId, {
      errMsg: 'downloadFile:ok',
      statusCode: statusCode,
      tempFilePath: Object(uni_platform_helpers_file__WEBPACK_IMPORTED_MODULE_0__[/* fileToUrl */ "a"])(blob)
    });
  };

  xhr.onabort = function () {
    clearTimeout(timer);
    invoke(callbackId, {
      errMsg: 'downloadFile:fail abort'
    });
  };

  xhr.onerror = function () {
    clearTimeout(timer);
    invoke(callbackId, {
      errMsg: 'downloadFile:fail'
    });
  };

  xhr.onprogress = function (event) {
    downloadTask._callbacks.forEach(function (callback) {
      var totalBytesWritten = event.loaded;
      var totalBytesExpectedToWrite = event.total;
      var progress = Math.round(totalBytesWritten / totalBytesExpectedToWrite * 100);
      callback({
        progress: progress,
        totalBytesWritten: totalBytesWritten,
        totalBytesExpectedToWrite: totalBytesExpectedToWrite
      });
    });
  };

  xhr.send();
  timer = setTimeout(function () {
    xhr.onprogress = xhr.onload = xhr.onabort = xhr.onerror = null;
    downloadTask.abort();
    invoke(callbackId, {
      errMsg: 'downloadFile:fail timeout'
    });
  }, timeout);
  return downloadTask;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "4f97":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {var SPACE_UNICODE = {
  'ensp': "\u2002",
  'emsp': "\u2003",
  'nbsp': "\xA0"
};
/* harmony default export */ __webpack_exports__["a"] = ({
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3ad9")["default"]))

/***/ }),

/***/ "4fef":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_actionSheet_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2fb0");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_actionSheet_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_actionSheet_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_actionSheet_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "500a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "501c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "off", function() { return off; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "once", function() { return once; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emit", function() { return emit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribe", function() { return subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsubscribe", function() { return unsubscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeHandler", function() { return subscribeHandler; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8bbf");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _subscribe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("8ecd");
/* harmony import */ var uni_platform_view_bridge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("4a59");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "publishHandler", function() { return uni_platform_view_bridge__WEBPACK_IMPORTED_MODULE_2__["a"]; });



var Emitter = new vue__WEBPACK_IMPORTED_MODULE_0___default.a();
var on = Emitter.$on.bind(Emitter);
var off = Emitter.$off.bind(Emitter);
var once = Emitter.$once.bind(Emitter);
var emit = Emitter.$emit.bind(Emitter);
function subscribe(event, callback) {
  return on('service.' + event, callback);
}
function unsubscribe(event, callback) {
  return off('service.' + event, callback);
}
function subscribeHandler(event, args, pageId) {
  emit('service.' + event, args, pageId);
}

Object(_subscribe__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(subscribe);

/***/ }),

/***/ "5129":
/***/ (function(module, exports) {

module.exports = ['uni-app', 'uni-tabbar', 'uni-page', 'uni-page-head', 'uni-page-wrapper', 'uni-page-body', 'uni-page-refresh', 'uni-actionsheet', 'uni-modal', 'uni-picker', 'uni-toast', 'uni-resize-sensor', 'uni-ad', 'uni-audio', 'uni-button', 'uni-camera', 'uni-canvas', 'uni-checkbox', 'uni-checkbox-group', 'uni-cover-image', 'uni-cover-view', 'uni-form', 'uni-functional-page-navigator', // 'uni-icon',
'uni-image', 'uni-input', 'uni-label', 'uni-live-player', 'uni-live-pusher', 'uni-map', 'uni-movable-area', 'uni-movable-view', 'uni-navigator', 'uni-official-account', 'uni-open-data', 'uni-picker', 'uni-picker-view', 'uni-picker-view-column', 'uni-progress', 'uni-radio', 'uni-radio-group', 'uni-rich-text', 'uni-scroll-view', 'uni-slider', 'uni-swiper', 'uni-swiper-item', 'uni-switch', 'uni-text', 'uni-textarea', 'uni-video', 'uni-view', 'uni-web-view'];

/***/ }),

/***/ "5363":
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

/***/ "53f0":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "5408":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./button/index.vue": "d3bd",
	"./canvas/index.vue": "bacd",
	"./checkbox-group/index.vue": "25ce",
	"./checkbox/index.vue": "7bb3",
	"./form/index.vue": "b34d",
	"./image/index.vue": "1082",
	"./input/index.vue": "250d",
	"./label/index.vue": "70f4",
	"./movable-area/index.vue": "c61c",
	"./movable-view/index.vue": "8842",
	"./navigator/index.vue": "17fd",
	"./picker-view-column/index.vue": "1955",
	"./picker-view/index.vue": "27ab",
	"./picker/index.vue": "c35d",
	"./progress/index.vue": "9b1f",
	"./radio-group/index.vue": "d5ec",
	"./radio/index.vue": "6491",
	"./resize-sensor/index.vue": "3e8c",
	"./rich-text/index.vue": "b705",
	"./scroll-view/index.vue": "f1ef",
	"./slider/index.vue": "9f96",
	"./swiper-item/index.vue": "9213",
	"./swiper/index.vue": "5513",
	"./switch/index.vue": "4f1c",
	"./text/index.vue": "4da7",
	"./textarea/index.vue": "5768",
	"./view/index.vue": "2bbe"
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
webpackContext.id = "5408";

/***/ }),

/***/ "5513":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/core/view/mixins/touchtrack.js
var touchtrack = __webpack_require__("ba15");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/swiper/index.vue?vue&type=script&lang=js&
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
var swipervue_type_style_index_0_lang_css_ = __webpack_require__("1c64");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var swiper = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "5676":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0950");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "5727":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d60d");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "5768":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/textarea/index.vue?vue&type=template&id=28361ab8&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-textarea',_vm._g({attrs:{"value":_vm._checkEmpty(_vm.value),"maxlength":_vm.maxlengthNumber,"placeholder":_vm._checkEmpty(_vm.placeholder),"disabled":_vm.disabled,"focus":_vm.focus,"auto-focus":_vm.autoFocus,"placeholder-class":_vm._checkEmpty(_vm.placeholderClass),"placeholder-style":_vm._checkEmpty(_vm.placeholderStyle),"auto-height":_vm.autoHeight,"cursor":_vm.cursorNumber,"selection-start":_vm.selectionStartNumber,"selection-end":_vm.selectionEndNumber}},_vm.$listeners),[_c('div',{staticClass:"uni-textarea-wrapper"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(!(_vm.composition||_vm.valueSync.length)),expression:"!(composition||valueSync.length)"}],ref:"placeholder",staticClass:"uni-textarea-placeholder",class:_vm.placeholderClass,style:(_vm.placeholderStyle)},[_vm._v(_vm._s(_vm.placeholder))]),_c('div',{staticClass:"uni-textarea-compute"},[_vm._l((_vm.valueCompute),function(item,index){return _c('div',{key:index},[_vm._v(_vm._s(item.trim() ? item : '.'))])}),_c('v-uni-resize-sensor',{ref:"sensor",on:{"resize":_vm._resize}})],2),_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.valueSync),expression:"valueSync"}],ref:"textarea",staticClass:"uni-textarea-textarea",class:{'uni-textarea-textarea-ios': _vm.isIOS},attrs:{"disabled":_vm.disabled,"maxlength":_vm.maxlengthNumber,"autofocus":_vm.autoFocus},domProps:{"value":(_vm.valueSync)},on:{"compositionstart":_vm._compositionstart,"compositionend":_vm._compositionend,"input":[function($event){if($event.target.composing){ return; }_vm.valueSync=$event.target.value},function($event){$event.stopPropagation();return _vm._input($event)}],"focus":_vm._focus,"blur":_vm._blur,"&touchstart":function($event){return _vm._touchstart($event)}}})])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/textarea/index.vue?vue&type=template&id=28361ab8&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__("8af1");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/textarea/index.vue?vue&type=script&lang=js&
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
var textareavue_type_style_index_0_lang_css_ = __webpack_require__("9400");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var components_textarea = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "580e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony import */ var _system_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bab8");
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

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'SystemChooseLocation',
  components: {
    SystemHeader: _system_header__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]
  },
  data: function data() {
    return {
      src: '',
      data: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    var key = __uniConfig.qqMapKey;
    this.src = "https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=".concat(key, "&referer=uniapp");
    window.addEventListener('message', function (event) {
      var loc = event.data;

      if (loc && loc.module === 'locationPicker') {
        _this.data = {
          name: loc.poiname,
          address: loc.poiaddress,
          latitude: loc.latlng.lat,
          longitude: loc.latlng.lng
        };
      }
    }, false);
  },
  methods: {
    _choose: function _choose() {
      if (this.data) {
        UniViewJSBridge.publishHandler('onChooseLocation', this.data);
        getApp().$router.back();
      }
    },
    _back: function _back() {
      UniViewJSBridge.publishHandler('onChooseLocation', null);
      getApp().$router.back();
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("501c")))

/***/ }),

/***/ "594d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/view/components/map/index.vue?vue&type=template&id=a133ab6e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-map',{attrs:{"id":_vm.id}},[_c('div',{ref:"map",staticStyle:{"width":"100%","height":"100%","position":"relative","overflow":"hidden"}}),_c('div',{staticStyle:{"position":"absolute","top":"0","width":"100%","height":"100%","overflow":"hidden","pointer-events":"none"}},[_vm._t("default")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/view/components/map/index.vue?vue&type=template&id=a133ab6e&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/view/components/map/index.vue?vue&type=script&lang=js&
var mapvue_type_script_lang_js_ = __webpack_require__("635e");

// CONCATENATED MODULE: ./src/platforms/h5/view/components/map/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_mapvue_type_script_lang_js_ = (mapvue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./src/platforms/h5/view/components/map/index.vue?vue&type=style&index=0&lang=css&
var mapvue_type_style_index_0_lang_css_ = __webpack_require__("3f7e");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

// CONCATENATED MODULE: ./src/platforms/h5/view/components/map/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_mapvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var map = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "5a56":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    beforeTransition: function beforeTransition() {},
    afterTransition: function afterTransition() {}
  }
});

/***/ }),

/***/ "5ab3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fcd8");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "5abe":
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

/***/ "5b1e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony import */ var uni_platform_helpers_get_real_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cb0f");
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

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'TabBar',
  props: {
    position: {
      default: 'bottom',
      validator: function validator(value) {
        return ['bottom', 'top'].indexOf(value) !== -1;
      }
    },
    color: {
      type: String,
      default: '#999'
    },
    selectedColor: {
      type: String,
      default: '#007aff'
    },
    backgroundColor: {
      type: String,
      default: '#f7f7fa'
    },
    borderStyle: {
      default: 'black',
      validator: function validator(value) {
        return ['black', 'white'].indexOf(value) !== -1;
      }
    },
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  computed: {
    borderColor: function borderColor() {
      return this.borderStyle === 'white' ? 'rgba(255, 255, 255, 0.33)' : 'rgba(0, 0, 0, 0.33)';
    }
  },
  watch: {
    '$route': function $route(to, from) {
      if (to.meta.isTabBar) {
        this.__path__ = to.path;
      }
    }
  },
  beforeCreate: function beforeCreate() {
    this.__path__ = this.$route.path;
  },
  methods: {
    _getRealPath: function _getRealPath(filePath) {
      if (filePath.indexOf('/') !== 0) {
        filePath = '/' + filePath;
      }

      return Object(uni_platform_helpers_get_real_path__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(filePath);
    },
    _switchTab: function _switchTab(_ref, index) {
      var text = _ref.text,
          pagePath = _ref.pagePath;
      var url = '/' + pagePath;

      if (url === __uniRoutes[0].alias) {
        url = '/';
      }

      var detail = {
        index: index,
        text: text,
        pagePath: pagePath
      };

      if (this.$route.path !== url) {
        this.__path__ = this.$route.path;
        uni.switchTab({
          from: 'tabBar',
          url: url,
          detail: detail
        });
      } else {
        UniServiceJSBridge.emit('onTabItemTap', detail);
      }
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "5d1d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("91b0");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "6062":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("748c");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "6144":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "61c2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./src/shared/index.js + 3 modules
var shared = __webpack_require__("f2b3");

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__("8af1");

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

/***/ "6226":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e670");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "6258":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony import */ var _mixins_transition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5a56");
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

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'Toast',
  mixins: [_mixins_transition__WEBPACK_IMPORTED_MODULE_0__["default"]],
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      default: 'success',
      validator: function validator(value) {
        return ['success', 'loading', 'none'].indexOf(value) !== -1;
      }
    },
    image: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 1500
    },
    mask: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconClass: function iconClass() {
      if (this.icon === 'success') {
        return 'uni-icon-success-no-circle';
      }

      if (this.icon === 'loading') {
        return 'uni-loading';
      }
    }
  },
  beforeUpdate: function beforeUpdate() {
    if (this.visible) {
      this.timeoutId && clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(function () {
        UniServiceJSBridge.emit('onHideToast');
      }, this.duration);
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "626d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f2b3");

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      showActionSheet: {
        visible: false
      }
    };
  },
  created: function created() {
    var _this = this;

    UniServiceJSBridge.on('onShowActionSheet', function (args, callback) {
      _this.showActionSheet = args;
      _this.onActionSheetCloseCallback = callback;
    });
    UniServiceJSBridge.on('onHidePopup', function (args) {
      _this.showActionSheet.visible = false;
    });
  },
  methods: {
    // 处理 actionSheet close 回调
    _onActionSheetClose: function _onActionSheetClose(type) {
      this.showActionSheet.visible = false;
      Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(this.onActionSheetCloseCallback) && this.onActionSheetCloseCallback(type);
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "62b5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createCallbacks; });
var callbacks = {};
function createCallbacks(namespace) {
  var scopedCallbacks = callbacks[namespace];

  if (!scopedCallbacks) {
    scopedCallbacks = {
      id: 1,
      callbacks: Object.create(null)
    };
    callbacks[namespace] = scopedCallbacks;
  }

  return {
    get: function get(id) {
      return scopedCallbacks.callbacks[id];
    },
    pop: function pop(id) {
      var callback = scopedCallbacks.callbacks[id];

      if (callback) {
        delete scopedCallbacks.callbacks[id];
      }

      return callback;
    },
    push: function push(callback) {
      var id = scopedCallbacks.id++;
      scopedCallbacks.callbacks[id] = callback;
      return id;
    }
  };
}

/***/ }),

/***/ "635e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {/* harmony import */ var uni_mixins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8af1");
/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("f2b3");
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


var maps;
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'Map',
  mixins: [uni_mixins__WEBPACK_IMPORTED_MODULE_0__[/* subscriber */ "d"]],
  props: {
    id: {
      type: String,
      default: ''
    },
    latitude: {
      type: [String, Number],
      default: 39.92
    },
    longitude: {
      type: [String, Number],
      default: 116.46
    },
    scale: {
      type: [String, Number],
      default: 16
    },
    markers: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    covers: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    includePoints: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    polyline: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    circles: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    controls: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    showLocation: {
      type: [Boolean, String],
      default: false
    }
  },
  data: function data() {
    return {
      center: {
        latitude: 116.46,
        longitude: 116.46
      },
      isMapReady: false,
      isBoundsReady: false,
      markersSync: [],
      polylineSync: [],
      circlesSync: [],
      controlsSync: []
    };
  },
  watch: {
    latitude: function latitude() {
      this.centerChange();
    },
    longitude: function longitude() {
      this.centerChange();
    },
    scale: function scale(val) {
      var _this = this;

      this.mapReady(function () {
        _this._map.setZoom(Number(val) || 16);
      });
    },
    markers: function markers(val, old) {
      var _this2 = this;

      this.mapReady(function () {
        var add = [];
        var has = [];
        var changed = [];
        var changedOption = [];
        var remove = [];
        val.forEach(function (option) {
          if (!('id' in option)) {
            add.push(option);
          } else {
            var isOld = false;

            for (var index = 0; index < old.length; index++) {
              var element = old[index];

              if (!('id' in element)) {
                old.splice(index--, 1);
                continue;
              }

              if (element.id !== option.id) {
                continue;
              }

              isOld = true;
              has.push(element.id);

              if (JSON.stringify(element) !== JSON.stringify(option)) {
                changed.push(element.id);
                changedOption.push(option);
              }

              old.splice(index--, 1);
            }

            if (!isOld) {
              add.push(option);
            }
          }
        });
        var markers = _this2.markersSync;
        markers.forEach(function (marker) {
          var id = marker.id;
          var index;

          if (has.indexOf(id) >= 0) {
            if ((index = changed.indexOf(id)) >= 0) {
              _this2.changeMarker(marker, changedOption[index]);
            }
          } else {
            remove.push(marker);
          }
        });

        _this2.removeMarkers(remove);

        _this2.createMarkers(add);
      });
    },
    polyline: function polyline(val) {
      var _this3 = this;

      this.mapReady(function () {
        _this3.createPolyline();
      });
    },
    circles: function circles() {
      var _this4 = this;

      this.mapReady(function () {
        _this4.createCircles();
      });
    },
    controls: function controls() {
      var _this5 = this;

      this.mapReady(function () {
        _this5.createControls();
      });
    },
    includePoints: function includePoints() {
      var _this6 = this;

      this.mapReady(function () {
        _this6.fitBounds(_this6.includePoints);
      });
    },
    showLocation: function showLocation(val) {
      var _this7 = this;

      this.mapReady(function () {
        _this7[val ? 'createLocation' : 'removeLocation']();
      });
    }
  },
  created: function created() {
    var latitude = this.latitude;
    var longitude = this.longitude;

    if (latitude && longitude) {
      this.center.latitude = latitude;
      this.center.longitude = longitude;
    }
  },
  mounted: function mounted() {
    var _this8 = this;

    this.loadMap(function () {
      _this8.init();
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.removeMarkers(this.markersSync);
    this.removePolyline();
    this.removeCircles();
    this.removeControls();
    this.removeLocation();
  },
  methods: {
    _handleSubscribe: function _handleSubscribe(_ref) {
      var _this9 = this;

      var type = _ref.type,
          _ref$data = _ref.data,
          data = _ref$data === void 0 ? {} : _ref$data;

      function callback(res, err) {
        res = res || {};
        res.errMsg = "".concat(type, ":").concat(err ? 'fail' + err : 'ok');
        var cb = err ? data.fail : data.success;

        if (typeof cb === 'function') {
          cb(res);
        }

        if (typeof data.complete === 'function') {
          data.complete(res);
        }
      }

      switch (type) {
        case 'getCenterLocation':
          this.mapReady(function () {
            var latitude;
            var longitude;

            var center = _this9._map.getCenter();

            latitude = center.getLat();
            longitude = center.getLng();
            callback({
              latitude: latitude,
              longitude: longitude
            });
          });
          break;

        case 'moveToLocation':
          var locationPosition = this._locationPosition;

          if (locationPosition) {
            this._map.setCenter(locationPosition);
          }

          break;

        case 'translateMarker':
          this.mapReady(function () {
            try {
              var marker = _this9.getMarker(data.markerId);

              var destination = data.destination;
              var duration = data.duration;
              var autoRotate = !!data.autoRotate;
              var rotate = Number(data.rotate) ? data.rotate : 0;
              var rotation = marker.getRotation();
              var a = marker.getPosition();
              var b = new maps.LatLng(destination.latitude, destination.longitude);
              var distance = maps.geometry.spherical.computeDistanceBetween(a, b) / 1000;
              var time = (typeof duration === 'number' ? duration : 1000) / (1000 * 60 * 60);
              var speed = distance / time;
              var movingEvent = maps.event.addListener(marker, 'moving', function (e) {
                var latLng = e.latLng;
                var label = marker.label;

                if (label) {
                  label.setPosition(latLng);
                }

                var callout = marker.callout;

                if (callout) {
                  callout.setPosition(latLng);
                }
              });
              var event = maps.event.addListener(marker, 'moveend', function (e) {
                event.remove();
                movingEvent.remove();
                marker.lastPosition = a;
                marker.setPosition(b);
                var label = marker.label;

                if (label) {
                  label.setPosition(b);
                }

                var callout = marker.callout;

                if (callout) {
                  callout.setPosition(b);
                }

                var cb = data.animationEnd;

                if (typeof cb === 'function') {
                  cb();
                }
              });
              var lastRtate = 0;

              if (autoRotate) {
                if (marker.lastPosition) {
                  lastRtate = maps.geometry.spherical.computeHeading(marker.lastPosition, a);
                }

                rotate = maps.geometry.spherical.computeHeading(a, b) - lastRtate;
              }

              marker.setRotation(rotation + rotate);
              marker.moveTo(b, speed);
            } catch (error) {
              callback(null, error);
            }
          });
          break;

        case 'includePoints':
          this.fitBounds(data.points);
          break;

        case 'getRegion':
          this.boundsReady(function () {
            var latLngBounds = _this9._map.getBounds();

            var southwest = latLngBounds.getSouthWest();
            var northeast = latLngBounds.getNorthEast();
            callback({
              southwest: {
                latitude: southwest.getLat(),
                longitude: southwest.getLng()
              },
              northeast: {
                latitude: northeast.getLat(),
                longitude: northeast.getLng()
              }
            });
          });
          break;

        case 'getScale':
          this.mapReady(function () {
            callback({
              scale: Number(_this9.scale)
            });
          });
          break;
      }
    },
    init: function init() {
      var _this10 = this;

      var center = new maps.LatLng(this.center.latitude, this.center.longitude);
      var map = this._map = new maps.Map(this.$refs.map, {
        center: center,
        zoom: Number(this.scale),
        scrollwheel: false,
        disableDoubleClickZoom: true,
        mapTypeControl: false,
        zoomControl: false,
        scaleControl: false,
        minZoom: 5,
        maxZoom: 18,
        draggable: true
      });
      var boundsChangedEvent = maps.event.addListener(map, 'bounds_changed', function (e) {
        boundsChangedEvent.remove();
        _this10.isBoundsReady = true;

        _this10.$emit('boundsready');
      });
      maps.event.addListener(map, 'click', function () {
        // TODO 编译器将 tap 转换为click
        _this10.$trigger('click', {}, {});
      });
      maps.event.addListener(map, 'dragstart', function () {
        _this10.$trigger('regionchange', {}, {
          type: 'begin'
        });
      });
      maps.event.addListener(map, 'dragend', function () {
        _this10.$trigger('regionchange', {}, {
          type: 'end'
        });
      });
      maps.event.addListener(map, 'zoom_changed', function () {
        _this10.$emit('update:scale', map.getZoom());
      });
      maps.event.addListener(map, 'center_changed', function () {
        var latitude;
        var longitude;
        var center = map.getCenter();
        latitude = center.getLat();
        longitude = center.getLng();

        _this10.$emit('update:latitude', latitude);

        _this10.$emit('update:longitude', longitude);
      });

      if (this.markers && Array.isArray(this.markers) && this.markers.length) {
        this.createMarkers(this.markers);
      }

      if (this.polyline && Array.isArray(this.polyline) && this.polyline.length) {
        this.createPolyline();
      }

      if (this.circles && Array.isArray(this.circles) && this.circles.length) {
        this.createCircles();
      }

      if (this.controls && Array.isArray(this.controls) && this.controls.length) {
        this.createControls();
      }

      if (this.showLocation) {
        this.createLocation();
      }

      if (this.includePoints && Array.isArray(this.includePoints) && this.includePoints.length) {
        this.fitBounds(this.includePoints, function () {
          map.setCenter(center);
        });
      }

      this.isMapReady = true;
      this.$emit('mapready');
    },
    centerChange: function centerChange() {
      var _this11 = this;

      var latitude = Number(this.latitude);
      var longitude = Number(this.longitude);

      if (latitude !== this.center.latitude || longitude !== this.center.longitude) {
        this.center.latitude = latitude;
        this.center.longitude = longitude;

        if (this._map) {
          this.mapReady(function () {
            _this11._map.setCenter(new maps.LatLng(latitude, longitude));
          });
        }
      }
    },
    createMarkers: function createMarkers(markerOptions) {
      var _this12 = this;

      var map = this._map;
      var markers = this.markersSync;
      markerOptions.forEach(function (option) {
        var marker = new maps.Marker({
          map: map,
          flat: true,
          autoRotation: false
        });
        marker.id = option.id;

        _this12.changeMarker(marker, option);

        maps.event.addListener(marker, 'click', function (e) {
          var callout = marker.callout;

          if (callout) {
            var div = callout.div;
            var parent = div.parentNode;

            if (!callout.alwaysVisible) {
              callout.set('visible', !callout.visible);
            }

            if (callout.visible) {
              parent.removeChild(div);
              parent.appendChild(div);
            }
          }

          Object(uni_shared__WEBPACK_IMPORTED_MODULE_1__[/* hasOwn */ "c"])(option, 'id') && _this12.$trigger('markertap', {}, {
            markerId: option.id
          });
        });
        markers.push(marker);
      });
    },
    changeMarker: function changeMarker(marker, option) {
      var self = this;
      var map = this._map;
      var title = option.title || option.name;
      var position = new maps.LatLng(option.latitude, option.longitude);
      var img = new Image();

      img.onload = function () {
        var anchor = option.anchor || {};
        var icon;
        var w;
        var h;
        var top;
        var x = anchor.x;
        var y = anchor.y;

        if (option.iconPath && (option.width || option.height)) {
          w = option.width || img.width / img.height * option.height;
          h = option.height || img.height / img.width * option.width;
        } else {
          w = img.width / 2;
          h = img.height / 2;
        }

        x = (typeof x === 'number' ? x : 0.5) * w;
        y = (typeof y === 'number' ? y : 1) * h;
        top = h - (h - y);
        icon = new maps.MarkerImage(img.src, null, null, new maps.Point(x, y), new maps.Size(w, h));
        marker.setPosition(position);
        marker.setIcon(icon);
        marker.setRotation(option.rotate || 0);
        var labelOpt = option.label || {};

        if (marker.label) {
          marker.label.setMap(null);
          delete marker.label;
        }

        var label;

        if (labelOpt.content) {
          label = new maps.Label({
            position: position,
            map: map,
            clickable: false,
            content: labelOpt.content,
            style: {
              border: 'none',
              padding: '8px',
              background: 'none',
              color: labelOpt.color,
              fontSize: (labelOpt.fontSize || 14) + 'px',
              lineHeight: (labelOpt.fontSize || 14) + 'px',
              marginLeft: labelOpt.x,
              marginTop: labelOpt.y
            }
          });
          marker.label = label;
        }

        var calloutOpt = option.callout || {};
        var callout = marker.callout;
        var calloutStyle;

        if (calloutOpt.content) {
          calloutStyle = {
            id: option.id,
            position: position,
            map: map,
            top: top,
            content: calloutOpt.content,
            color: calloutOpt.color,
            fontSize: calloutOpt.fontSize,
            borderRadius: calloutOpt.borderRadius,
            bgColor: calloutOpt.bgColor,
            padding: calloutOpt.padding,
            boxShadow: calloutOpt.boxShadow,
            display: calloutOpt.display
          };
        } else if (title) {
          calloutStyle = {
            id: option.id,
            position: position,
            map: map,
            top: top,
            content: title,
            boxShadow: '0px 0px 3px 1px rgba(0,0,0,0.5)'
          };
        }

        if (calloutStyle) {
          if (callout) {
            callout.setOption(calloutStyle);
          } else {
            callout = marker.callout = new maps.Callout(calloutStyle);

            callout.div.onclick = function ($event) {
              Object(uni_shared__WEBPACK_IMPORTED_MODULE_1__[/* hasOwn */ "c"])(option, 'id') && self.$trigger('callouttap', $event, {
                markerId: option.id
              });
              $event.stopPropagation();
              $event.preventDefault();
            };
          }
        } else {
          if (callout) {
            callout.setMap(null);
            delete marker.callout;
          }
        }
      };

      img.src = option.iconPath ? this.$getRealPath(option.iconPath) : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAABQCAYAAABFyhZTAAANDElEQVR4nNWce4hc133Hv+fc92MeuytpV5ZXll2XuvTlUBTSP1IREsdNiKGEEAgE3EBLaBtK/2hNoQTStISUosiGOqVpQ+qkIdAax1FiG+oYIxyD4xi3uKlEXSFFke3d1e5od+a+H+ec/nHvmbkzs6ud2bmjTX7wY3b3zr3nfM7vd37n8Tt3CW6DiDP3EABSd/0KAEEuXBHzrsteFTiwVOBo+amUP9PK34ZuAcD30NoboTZgceYeCaQAUEvVAKiZ0lpiiv0Lgmi/imFLF5YV2SWFR1e0fGcDQF5qVn4y1Ag/E3DFmhJSB2Dk1D2Squ0HBdT3C0JPE6oco6oKqmm7PodnGXieQ3DWIYL/iCB/UWO95zTW2wCQlpqhgJ8J/MDApUUVFFY0AFiRdvwMJ8bvCaKcUW3bUE0DimGAKMpkz2QMLEnBkhhZEHICfoHy+AkrW3seQAwgQQHPyIUr/CD1nhq4tCpFAWoCsGNt5X2MWo9Qw/p1zXGgWiZAZu8teRQhCwLwOLpEefKolb3zDIAQBXyGAnwqa09Vq4pVDQBOqrTuTmn7c9S0H9QdB6ptT/O4iSWPY2S+DxYHFzTW+5zBti8BCFBYfCprTwxcwmoALABupK48lFPri0az1dSbjWkZDiSp5yPpdn2Vh39m5evPAPABRACySaH3Ba64sA7ABtD0tdXPUqvxKd1xoJrmDAjTSx7HCDsdroj0nJO99TiAHgprZwD4fi5+S+AKrAHA5UQ7EijH/05rND9sNJsglNaEMZ3wPEfq+8i97vdstv4IFdkWBi5+S2h1n2dL2IYAXQqU449pjdYHzFaruDr3edEelVJUmK02YpCPBD454uRrf0BFtlleTlAMX7vfu9eFSp91ALR95cRfq27zA2ariXK+cOhqtprQnOZ7AmXlLIA2ABeAXtZ9cuDSlVUUfbYVKCsPq27zo1arddiMY2q2WlCd5gd95fhnALTKOmslw/7A5RcVFGNsI6ILpzNi/rnu2IdPt4caDRc5Mf4opEu/DaBR1l3dDXo3CxMUEdkRoO2UuJ+3Wy1VUbXD5tpTKVVgt9s0I85fcahLKLqhvhvf0B/KFpFjbdOnRz+pOY17f5atK1W3LWiue8KnR38fQLNkGLPyaAvI8dZl0Jcz6J82bPuwWSZW03GRQ3s4JdYqigBmoOie48CVQGUBcAO68AnTbTQUVQWE+LlQSimsRsOKSPthFG49ZmU6Aq8DsAWomwnt4+bPgSuPqunYyIX6uwzqIoqIPdSXacW6clFgB6T9Xs0wFylVDrv+UyshFIZlOSFpP1ACG1Ury5mWdGcTgJkJ/UO2ZZVPqU+EqiL9xV8GWzoGAFC2t6C/eQkkS2stR7cs+KH2OwDOo2AKUcy1hQTur28FiJVDOa0bRm283HHhPfQxhL91BsIYXmyQLIX1yktofvdJ0N5OLeVpug4G5TcY1IaCvIuCLQHAq8A6ACOCe5+qag1CSBEMZpT01L3Y/vSfgi0e2fW60HSE730/4vtPY/Erj0J/8+LMZRIAmq7rUeLe75KdTRTACoCcVvqvBsBIhXG/qumoo0Plx5Zx80/+Yk/YqvBGE53PPILsxGotZWuahkxov4bCkDoARZy5h1S3UjUAKhf0pKrWE6x2Hv5DcMedwCaFCMPEzqf+GCB05rIVVQUHOVlySQuPAzNB7lAUBbOOickv/QrSe++bGFZKtnoK0f2nZy5foRRc0Dsw2C5WANDRvWRFAIv9/juDxr/5nqlhpcTvevfM5VNKwYHFijEVAEStWFgBQIWASQkKv5hBstVTM947W/mEABDCxMCgFBXgfkpECGgAmbW8seFnqntNc+byiSDggqgYSfPIKVc/2SUgcsH57C7V3T5wZWmvO3P5QnAAPMdwnotU59KkaBkR1AGs/fTqgYG1n16dHZhzQCAea8zKz4UTEdFl/EBZjCGxXn354Pe+8tLM5TPGAPAxN5PAQioR7CdZls1u4auXYf3wB1NX1Pjv/4Rx8Y2Zy8/zHAR8reTiko9W/sAAcIWwt+oAhhBofeMrUDfWJoZVtjtof/Xvayk7TTMo4D/BSL55FJiZNPvfNE1rKZT2ulj64mehX/m/fWG169ew9IW/hHJzqx7gLIVO00slWy6B1QpsBoC5SnR1O7K3GecLSg2ZBaWziSOffwTB+x5E8MGHkB8/MXx9cwPuf3wX9gvPgeT5zOUBgBACcZKmR63of1CwycS6UFFYeCjjrhD2WhTHD7iWVUsFwBic7z8L5/vPgh1dBneL5BsJg6lcflKJ4hgKYT8iENXTBAzl8lBgYOEMALOV9IUgDB9w55AoU26sQ7mxXvtzq+KHISyavogBV4oCXNAy8cSrF9pa+EaSJmtpWk/wup2a5zmiONle0MMflpD94xLkwhUhOykrL8TlJzNo9lQvDHHYe1TTai8MYSjZd0p3zjA4LcCB4XFYXowB5EeM4HkvDDpxmh4+xYSa5hm6fuAt6cH3Sp5kV+Aye55XvpAqRCSOmv5LLwgO3U0n1V4QwFLSf9UoD0tPjSrAomphoHDrBINDI/kxM3wxTMIf7/j+ocPsp90ggBcFV5bN8LnSeHHJIs+BjAFLt45QZNNjAOyIET3a8XwvTNLD9tg9NU4zbPa8dEmPzxIipKeGpabSnYeAyxbIS2BfftnVsrWmnjzWDQPkLD98uhHlgqMbBnC19PGmnl4rAUMMDrzk1SMQo1MpXt4QAPDKG7OjZvwKy4Ov3/R/9vrzVs9DmgZPrljRCyg8NCzr7o9adwx4xMpeqTEAdqcT/nuY+M9v9rxDh5S62fMQxP7Lq27wBIoYFJd17mFwnElUGXc71CLKlgowvONnrbrhl6/2sEoJuW/JcXa59fbJzTDATuRfu7sRfgmDgCthpXXF6H1jq4OyRWRr+QC65WeiEJEet+O/7fj+thfHOKx+6ycxtjy/u2Ilf6NSISdLsq59r9zt+NKuy6EKdFS2WBeFxVNHY5sLRnr27Z0dzhi77W7MGMNb2zu8ZaTnGnq+hoE37mDgynuewdxz/VdORuTDuqUWQcxO/8tU+ZObfnDbDbzpBzBV9m/LdvraCGzfKLc6hnjLBW8F2q88NATATjaib3pxcLFzG2dim74PLw5eP9mIv4U9PHC/M5eTrPCrQ5XszzElyFac9OwN3/P8NMG8TeslMbZCf/tEIzlHSX8m5VXqlGBkCDoQ8C5BrH+Ys6GzjZaRP3YzDCHmaFnOOW6GERaM/Jyt8u0SLijrcssgNTXwLtAy9AcAsjvc7JWMxc9seP7cDHzDD8B49NSKk72OwUyqV+rEsBMDl9DVICZbNgLATjXTf96OgiudMKzdup0wxHYcvHlXM/sGxvttiCnOSk8FXIrsz8PjMxXpspOffcfz8rTG+XbCcqx5Xrri5OcUKuQGRbXssaljrcC36M/posWuuTr/+lYY1ebKnTCCq/MnFkx2HYPAKWdSQ8u+uQCPQEvX6qFwrfyuVvadnTi4uFmDa28GAXbi4Men2tl5FPN7uSiYKkjNDFxCy/4sg0d/qLqjwR5b9/04Znue0d5X4jzHehDEJxrsUYwHy6n7bVVm2WnnKNxqyLXbJn/b1fkTswSwrSiCq/OvtUy+juHl6sTjbe3AFdeW0DJqZ3e182d3kujNThxh2o7biSJ0k+ji3Qv5sxj2Ig8H7LdVmSmXUhY8VilKkB1z2Jev9zzOuZiYl3GB656XL7vsHzC85Os35qzvH9bxWorAsNsFANKjDr9saeL82hRz7fUggKWJp4/Y/CoGw1//mWVZM8nMwLdw7fxUm31zKwo7vXT/s5S9NMVWFK7ds8C+heG9NR8zROVRqeXFoxHXlhZJDBXBoi0e34yi/YehKMKiLf5JU/p7yUONV9d7xHW+aSWhhzYAV1v81SBPLm7FY8ct+rIVxwjz5I3VFn8V4w1XiytLqQ24sgEoXbvviiuu+Me9rCyEwDXP48uu+CqGZ3G1urKUWt+l28W1QwDpMVdcZsgvrIXh2D0bUQRDxUvHXHEZw8GvVleWMo+XB6sbBnIznJ1s8a+9EwQ5rxyJ4pzjbd/P72xyuc1aTQLMNMHYS2oHrri2dM0QQNI0sWnrOL8eRf3vrkcRbB3n2xY2MEiP9NM88/ivD/N6PbTq2rIv5qtt8dRaGKaccwgh8E4Y5ne2xNMYb6B+tq9umQvwyDIyKDVxddw0VfH8jTjGZhzDVMWLDQNbGGzZzNW6wPwsXM05V7OR+fEmvn09CPiNKMKyi29jYN0Ag0BVe9+Vst/7w7OKnIEFKF6pMRdtrL3VxctMMOOoi2q2r5/LnWeF5vqK90gAGyTaXTy5ZAtpXRms5jIMjcq8LQwMnywIAVgrDVwuD+9K68oZ1dxcWcrcX+IfScHKwBRWfu9H8Xn2XSm3w8LAYHfEQ5F6TVGYWM6qYsy570q5Lf+mYSRH1QFwA8AGgJsooOXe7tzl/wGchYFKtBMCwAAAAABJRU5ErkJggg==';
    },
    removeMarkers: function removeMarkers(markers) {
      for (var index = 0; index < markers.length; index++) {
        var marker = markers[index];

        if (marker.label) {
          marker.label.setMap(null);
        }

        if (marker.callout) {
          marker.callout.setMap(null);
        }

        marker.setMap(null);
        markers.splice(index--, 1);
      }
    },
    createPolyline: function createPolyline() {
      var map = this._map;
      var polyline = this.polylineSync;
      this.removePolyline();
      this.polyline.forEach(function (option) {
        var path = [];
        option.points.forEach(function (point) {
          path.push(new maps.LatLng(point.latitude, point.longitude));
        });

        if (option.borderWidth) {
          var border = new maps.Polyline({
            map: map,
            clickable: false,
            path: path,
            strokeWeight: option.width + option.borderWidth,
            strokeColor: option.borderColor,
            strokeDashStyle: option.dottedLine ? 'dash' : 'solid'
          });
          polyline.push(border);
        }

        var line = new maps.Polyline({
          map: map,
          clickable: false,
          path: path,
          strokeWeight: option.width,
          strokeColor: option.color,
          strokeDashStyle: option.dottedLine ? 'dash' : 'solid'
        });
        polyline.push(line);
      });
    },
    removePolyline: function removePolyline() {
      var polyline = this.polylineSync;
      polyline.forEach(function (line) {
        line.setMap(null);
      });
      polyline.splice(0, polyline.length);
    },
    createCircles: function createCircles() {
      var map = this._map;
      var circles = this.circlesSync;
      this.removeCircles();
      this.circles.forEach(function (option) {
        var center = new maps.LatLng(option.latitude, option.longitude);

        function getColor(color) {
          var c = color.match(/#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?/);

          if (c && c.length) {
            return maps.Color.fromHex(c[0], Number('0x' + c[1] || false) / 255);
          } else {
            return undefined;
          }
        }

        var circle = new maps.Circle({
          map: map,
          center: center,
          clickable: false,
          radius: option.radius,
          strokeWeight: option.strokeWidth,
          fillColor: getColor(option.fillColor),
          strokeColor: getColor(option.color),
          strokeDashStyle: 'solid'
        });
        circles.push(circle);
      });
    },
    removeCircles: function removeCircles() {
      var circles = this.circlesSync;
      circles.forEach(function (circle) {
        circle.setMap(null);
      });
      circles.splice(0, circles.length);
    },
    createControls: function createControls() {
      var _this13 = this;

      var _self = this;

      var map = this._map;
      var controls = this.controlsSync;
      this.removeControls();
      this.controls.forEach(function (option) {
        var position = option.position || {};
        var control = document.createElement('div');
        var img = new Image();
        control.appendChild(img);
        var style = control.style;
        style.position = 'absolute';
        style.width = 0;
        style.height = 0;

        img.onload = function () {
          if (option.position.width) {
            img.width = option.position.width;
          }

          if (option.position.height) {
            img.height = option.position.height;
          }

          var style = img.style;
          style.position = 'absolute';
          style.left = (position.left || 0) + 'px';
          style.top = (position.top || 0) + 'px';
          style.maxWidth = 'initial';
        };

        img.src = _this13.$getRealPath(option.iconPath);

        img.onclick = function ($event) {
          if (option.clickable) {
            _self.$trigger('controltap', $event, {
              controlId: option.id
            });
          }
        };

        map.controls[maps.ControlPosition.TOP_LEFT].push(control);
        controls.push(control);
      });
    },
    removeControls: function removeControls() {
      var controls = this.controlsSync;
      controls.forEach(function (control) {
        control.remove();
      });
      controls.splice(0, controls.length);
    },
    createLocation: function createLocation() {
      var _this14 = this;

      var map = this._map;
      var location = this._location;

      if (location) {
        this.removeLocation();
      }

      uni.getLocation({
        type: 'gcj02',
        success: function success(res) {
          if (location !== _this14._location) {
            return;
          }

          var position = new maps.LatLng(res.latitude, res.longitude);
          location = new maps.Marker({
            position: position,
            map: map,
            icon: new maps.MarkerImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAC01BMVEUAAAAAef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef96quGStdqStdpbnujMzMzCyM7Gyc7Ky83MzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwAef8GfP0yjfNWnOp0qOKKsdyYt9mju9aZt9mMstx1qeJYnekyjvIIfP0qivVmouaWttnMzMyat9lppOUujPQKffxhoOfNzc3Y2Njh4eHp6enu7u7y8vL19fXv7+/i4uLZ2dnOzs6auNgOf/sKff15quHR0dHx8fH9/f3////j4+N6quFdn+iywdPb29vw8PD+/v7c3NyywtLa2tr29vbS0tLd3d38/Pzf39/o6Ojc7f+q0v+HwP9rsf9dqv9Hnv9Vpv/q6urj8P+Vx/9Am/8Pgf8Iff/z8/OAvP95uf/n5+c5l//V6f+52v+y1//7+/vt7e0rkP/09PTQ0NDq9P8Whf+cy//W1tbe3t7A3v/m5ubs7OxOov/r6+vk5OQiaPjKAAAAknRSTlMACBZ9oB71/jiqywJBZATT6hBukRXv+zDCAVrkDIf4JbQsTb7eVeJLbwfa8Rh4G/OlPS/6/kxQ9/xdmZudoJxNVhng7B6wtWdzAtQOipcF1329wS44doK/BAkyP1pvgZOsrbnGXArAg34G2IsD1eMRe7bi7k5YnqFT9V0csyPedQyYD3p/Fje+hDpskq/MwpRBC6yKp2MAAAQdSURBVHja7Zn1exMxGIAPHbrhDsPdneHuNtzd3d3dIbjLh93o2o4i7TpgG1Jk0g0mMNwd/gTa5rq129reHnK5e/bk/TFNk/dJ7r5894XjGAwGg8GgTZasCpDIll1+hxw5vXLJLpEboTx5ZXbIhyzkl9fB28cqUaCgrBKFkI3CcjoUKYolihWXUSI7EihRUjaHXF52CVRKLoe8eZIdUOkyMknkRw6UlcehYAFHiXK+skgURk6Ul8OhQjFnCVRRBolKqRxQ5SzUHaqgNGSj7VCmalqJnDkoS5RF6ZCbroNvufQkUD6qEuXTdUA+3hQdqiEXVKfnUKOmK4latalJ1EEuoZZ6162HJ9x/4OChw0eOHj12/MTJU6dxG7XUu751tjNnz4ET5y9ctLZTSr0beKFLl89bpuUDrqgC1RqNWqsKuqqzNFw7e51S6u3tc+OmZUJ9kCHY6ECwOkRvab51iUrqXej2HYDQsHBjWgx3Ae7dppB6N2wEcF9jdMGDUIDGTaR2aNoM9FqjG7QmaN5CWgc/gIePjG559BigpZQOrYB/4jBfRGRUtDkmJjY6KjLCofkpD62lc2gDfMpWPIuLdwyV8XEpHgaddBZ+wBuSFcwJqSN2ovmZ/dfnOvCTxqGtwzq8SEjv4EhISn48eWgnhUP7DvDSvgzxrs6vV6+FLiro2EkCic4QKkzwJsH1KYreCp0eQhfyDl1B/w4P/xa5JVJ4U03QjbRD9x7wXlgH5IE3wmMBHXoSlugFAcI6f/AkkSi8q6HQm6xDn77wEQ8djTwSj3tqAMguRTe4ikeOQyJ4YV+KfkQl+oNW5GbY4gWOWgbwJ+kwAD6Fi90MK2ZsrIeBBCUGwRXbqJ+/iJMQliIEBhOU6AJhtlG/IpHE2bqrYQg5h6HA4yQiRqwEfkGCdTCMmMRw+IbPDCQaHCsCYAQxiZHw3TbmD/ESOHgHwShiEqPhp/gggYkSztIxxCRawy/bmEniJaJtfwiEscQkxkFgRqJESqQwwHhiEuMBp3Vm8RK/cZoHEzKXhCK2QxEPpiJe0YlKCFaKCNv/cYBNUsBRPlkJSc0U+dM7E9H0ThGJbgZT/iR7yj+VqMS06Qr4+OFm2JdCxIa8lugzkJs5K6MfxAaYPUcBpYG5khZJEkUUSb7DPCnKRfPBXj6M8FwuegoLpCgXcQszVjhbJFUJUee2hBhLoYTIcYtB57KY+opSMdVqwatSlZVj05aV//CwJLMX2DluaUcwhXm4ali2XOoLjxUrPV26zFtF4f5p0Gp310+z13BUWNvbehEXona6iAtX/zVZmtfN4WixfsNky4S6gCCVVq3RPLdfSfpv3MRRZfPoLc6Xs/5bt3EyMGzE9h07/Xft2t15z6i9+zgGg8FgMBgMBoPBYDAYDAYj8/APG67Rie8pUDsAAAAASUVORK5CYII=', null, null, new maps.Point(22, 22), new maps.Size(44, 44)),
            flat: true,
            rotation: 0
          });
          _this14._location = location;
          refreshLocation();
          uni.onCompassChange(function (res) {
            location.setRotation(res.direction);
          });
        },
        fail: function fail(e) {
          console.error(e);
        }
      });
      var self = this;

      function refreshLocation() {
        if (location !== self._location) {
          return;
        }

        setTimeout(function () {
          uni.getLocation({
            type: 'gcj02',
            success: function success(res) {
              var locationPosition = self._locationPosition = new maps.LatLng(res.latitude, res.longitude);
              location.setPosition(locationPosition);
            },
            fail: function fail(e) {
              console.error(e);
            },
            complete: function complete() {
              refreshLocation();
            }
          });
        }, 1000);
      }
    },
    removeLocation: function removeLocation() {
      var location = this._location;

      if (location) {
        location.setMap(null);
        this._location = null;
        this._locationPosition = null;
        uni.stopCompass();
      }
    },
    fitBounds: function fitBounds(points, cb) {
      var _this15 = this;

      this.boundsReady(function () {
        var map = _this15._map;
        var bounds = new maps.LatLngBounds();
        points.forEach(function (point) {
          var longitude = point.longitude;
          var latitude = point.latitude;
          var latLng = new maps.LatLng(latitude, longitude);
          bounds.extend(latLng);
        });
        map.fitBounds(bounds);

        if (typeof cb === 'function') {
          cb();
        }
      });
    },
    mapReady: function mapReady(cb) {
      if (this.isMapReady) {
        cb();
      } else {
        this.$once('mapready', function () {
          cb();
        });
      }
    },
    boundsReady: function boundsReady(cb) {
      if (this.isBoundsReady) {
        cb();
      } else {
        this.$once('boundsready', function () {
          cb();
        });
      }
    },
    getMarker: function getMarker(id) {
      var markers = this.markersSync;

      for (var index = 0; index < markers.length; index++) {
        var element = markers[index];

        if (element.id === id) {
          return element;
        }
      }
    },
    loadMap: function loadMap(callback) {
      if (maps) {
        callback();
      } else if (window.qq && window.qq.maps) {
        maps = window.qq.maps;
        callback();
      } else {
        var key = __uniConfig.qqMapKey;
        var callbackName = '_callback' + Date.now();

        window[callbackName] = function () {
          delete window[callbackName];
          maps = window.qq.maps;

          var Callout = maps.Callout = function () {
            var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            this.option = option;
            var map = option.map;
            this.position = option.position;
            this.index = 1;
            this.visible = this.alwaysVisible = option.display === 'ALWAYS';
            this.init();
            Object.defineProperty(this, 'onclick', {
              setter: function setter(callback) {
                this.div.onclick = callback;
              },
              getter: function getter() {
                return this.div.onclick;
              }
            });

            if (map) {
              this.setMap(map);
            }
          };

          Callout.prototype = new maps.Overlay();

          Callout.prototype.init = function () {
            var option = this.option;
            var div = this.div = document.createElement('div');
            var divStyle = div.style;
            divStyle.position = 'absolute';
            divStyle.whiteSpace = 'nowrap';
            divStyle.transform = 'translateX(-50%) translateY(-100%)';
            divStyle.zIndex = 1;
            divStyle.boxShadow = option.boxShadow || 'none';
            divStyle.display = this.visible ? 'block' : 'none';
            var triangle = this.triangle = document.createElement('div');
            triangle.setAttribute('style', 'position: absolute;white-space: nowrap;border-width: 4px;border-style: solid;border-color: #fff transparent transparent;border-image: initial;font-size: 12px;padding: 0px;background-color: transparent;width: 0px;height: 0px;transform: translate(-50%, 100%);left: 50%;bottom: 0;');
            this.setStyle(option);

            this.changed = function (key) {
              divStyle.display = this.visible ? 'block' : 'none';
            };

            div.appendChild(triangle);
          };

          Callout.prototype.construct = function () {
            var div = this.div;
            var panes = this.getPanes();
            panes.floatPane.appendChild(div);
          };

          Callout.prototype.draw = function () {
            var overlayProjection = this.getProjection();

            if (!this.position || !this.div || !overlayProjection) {
              return;
            }

            var pixel = overlayProjection.fromLatLngToDivPixel(this.position);
            var divStyle = this.div.style;
            divStyle.left = pixel.x + 'px';
            divStyle.top = pixel.y + 'px';
          };

          Callout.prototype.destroy = function () {
            this.div.parentNode.removeChild(this.div);
            this.div = null;
            this.triangle = null;
          };

          Callout.prototype.setOption = function (option) {
            this.option = option;
            this.setPosition(option.position);

            if (option.display === 'ALWAYS') {
              this.alwaysVisible = this.visible = true;
            } else {
              this.alwaysVisible = false;
            }

            this.setStyle(option);
          };

          Callout.prototype.setStyle = function (option) {
            var div = this.div;
            var divStyle = div.style;
            div.innerText = option.content;
            divStyle.lineHeight = (option.fontSize || 14) + 'px';
            divStyle.fontSize = (option.fontSize || 14) + 'px';
            divStyle.padding = (option.padding || 8) + 'px';
            divStyle.color = option.color || '#000';
            divStyle.borderRadius = (option.borderRadius || 0) + 'px';
            divStyle.backgroundColor = option.bgColor || '#fff';
            divStyle.marginTop = '-' + (option.top + 5) + 'px';
            this.triangle.style.borderColor = "".concat(option.bgColor || '#fff', " transparent transparent");
          };

          Callout.prototype.setPosition = function (position) {
            this.position = position;
            this.draw();
          };

          callback();
        };

        var script = document.createElement('script');
        script.src = "https://map.qq.com/api/js?v=2.exp&key=".concat(key, "&callback=").concat(callbackName, "&libraries=geometry");
        document.body.appendChild(script);
      }
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3ad9")["default"]))

/***/ }),

/***/ "6389":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6389__;

/***/ }),

/***/ "6428":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c99c");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "6491":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/radio/index.vue?vue&type=template&id=84e2ee82&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-radio',_vm._g({on:{"click":_vm._onClick}},_vm.$listeners),[_c('div',{staticClass:"uni-radio-wrapper"},[_c('div',{staticClass:"uni-radio-input",class:_vm.radioChecked ? 'uni-radio-input-checked' : '',style:(_vm.radioChecked ? _vm.checkedStyle : '')}),_vm._t("default")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/radio/index.vue?vue&type=template&id=84e2ee82&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__("8af1");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/radio/index.vue?vue&type=script&lang=js&
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
var radiovue_type_style_index_0_lang_css_ = __webpack_require__("c96e");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var components_radio = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "64d0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1047");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "6575":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openLocation", function() { return openLocation; });
/**
 * 查看位置
 * @param {*} param0
 * @param {*} callbackId
 */
function openLocation(_ref, callbackId) {
  var latitude = _ref.latitude,
      longitude = _ref.longitude,
      scale = _ref.scale,
      name = _ref.name,
      address = _ref.address;
  var _UniServiceJSBridge = UniServiceJSBridge,
      invoke = _UniServiceJSBridge.invokeCallbackHandler;
  getApp().$router.push({
    type: 'navigateTo',
    path: '/open-location',
    query: {
      latitude: latitude,
      longitude: longitude,
      scale: scale,
      name: name,
      address: address
    }
  }, function () {
    invoke(callbackId, {
      errMsg: 'openLocation:ok'
    });
  }, function () {
    invoke(callbackId, {
      errMsg: 'openLocation:fail'
    });
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "65a8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NAVBAR_HEIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TABBAR_HEIGHT; });
var NAVBAR_HEIGHT = 44;
var TABBAR_HEIGHT = 50;

/***/ }),

/***/ "6a87":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6bfe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setNavigationBarColor", function() { return setNavigationBarColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showNavigationBarLoading", function() { return showNavigationBarLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideNavigationBarLoading", function() { return hideNavigationBarLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setNavigationBarTitle", function() { return setNavigationBarTitle; });
function setNavigationBar(type, args) {
  var pages = getCurrentPages();

  if (pages.length) {
    var page = pages[pages.length - 1].$holder;

    switch (type) {
      case 'setNavigationBarColor':
        var frontColor = args.frontColor,
            backgroundColor = args.backgroundColor,
            animation = args.animation;
        var duration = animation.duration,
            timingFunc = animation.timingFunc;

        if (frontColor) {
          page.navigationBar.textColor = frontColor === '#000000' ? 'black' : 'white';
        }

        if (backgroundColor) {
          page.navigationBar.backgroundColor = backgroundColor;
        }

        page.navigationBar.duration = duration + 'ms';
        page.navigationBar.timingFunc = timingFunc;
        break;

      case 'showNavigationBarLoading':
        page.navigationBar.loading = true;
        break;

      case 'hideNavigationBarLoading':
        page.navigationBar.loading = false;
        break;

      case 'setNavigationBarTitle':
        var title = args.title;
        page.navigationBar.titleText = title;

        if (true) {
          document.title = title;
        }

        break;
    }
  }

  return {};
}

function setNavigationBarColor(args) {
  return setNavigationBar('setNavigationBarColor', args);
}
function showNavigationBarLoading() {
  return setNavigationBar('showNavigationBarLoading');
}
function hideNavigationBarLoading() {
  return setNavigationBar('hideNavigationBarLoading');
}
function setNavigationBarTitle(args) {
  return setNavigationBar('setNavigationBarTitle', args);
}

/***/ }),

/***/ "6f00":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cc83");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "6f25":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMapContext", function() { return createMapContext; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function operateMapPlayer(mapId, pageId, type, data) {
  UniServiceJSBridge.publishHandler(pageId + '-map-' + mapId, {
    mapId: mapId,
    type: type,
    data: data
  }, pageId);
}

var MapContext =
/*#__PURE__*/
function () {
  function MapContext(id, pageId) {
    _classCallCheck(this, MapContext);

    this.id = id;
    this.pageId = pageId;
  }

  _createClass(MapContext, [{
    key: "getCenterLocation",
    value: function getCenterLocation(_ref) {
      var success = _ref.success,
          fail = _ref.fail,
          complete = _ref.complete;
      operateMapPlayer(this.id, this.pageId, 'getCenterLocation', {
        success: success,
        fail: fail,
        complete: complete
      });
    }
  }, {
    key: "moveToLocation",
    value: function moveToLocation() {
      operateMapPlayer(this.id, this.pageId, 'moveToLocation');
    }
  }, {
    key: "translateMarker",
    value: function translateMarker(_ref2) {
      var markerId = _ref2.markerId,
          destination = _ref2.destination,
          autoRotate = _ref2.autoRotate,
          rotate = _ref2.rotate,
          duration = _ref2.duration,
          animationEnd = _ref2.animationEnd,
          fail = _ref2.fail;
      operateMapPlayer(this.id, this.pageId, 'translateMarker', {
        markerId: markerId,
        destination: destination,
        autoRotate: autoRotate,
        rotate: rotate,
        duration: duration,
        animationEnd: animationEnd,
        fail: fail
      });
    }
  }, {
    key: "includePoints",
    value: function includePoints(_ref3) {
      var points = _ref3.points,
          padding = _ref3.padding;
      operateMapPlayer(this.id, this.pageId, 'includePoints', {
        points: points,
        padding: padding
      });
    }
  }, {
    key: "getRegion",
    value: function getRegion(_ref4) {
      var success = _ref4.success,
          fail = _ref4.fail,
          complete = _ref4.complete;
      operateMapPlayer(this.id, this.pageId, 'getRegion', {
        success: success,
        fail: fail,
        complete: complete
      });
    }
  }, {
    key: "getScale",
    value: function getScale(_ref5) {
      var success = _ref5.success,
          fail = _ref5.fail,
          complete = _ref5.complete;
      operateMapPlayer(this.id, this.pageId, 'getScale', {
        success: success,
        fail: fail,
        complete: complete
      });
    }
  }]);

  return MapContext;
}();

function createMapContext(id, context) {
  if (context) {
    return new MapContext(id, context.$page.id);
  }

  var app = getApp();

  if (app.$route && app.$route.params.__id__) {
    return new MapContext(id, app.$route.params.__id__);
  } else {
    UniServiceJSBridge.emit('onError', 'createMapContext:fail');
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "6f45":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "70f4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/label/index.vue?vue&type=template&id=1af3bd5d&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-label',_vm._g({on:{"click":_vm._onClick}},_vm.$listeners),[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/label/index.vue?vue&type=template&id=1af3bd5d&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/label/index.vue?vue&type=script&lang=js&
var labelvue_type_script_lang_js_ = __webpack_require__("ab76");

// CONCATENATED MODULE: ./src/core/view/components/label/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_labelvue_type_script_lang_js_ = (labelvue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var label = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "72b3":
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

/***/ "748c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "74ce":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7557":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {var defaultProps = {
  visible: false,
  mode: '',
  range: [],
  rangeKey: '',
  value: '',
  disabled: false,
  start: '',
  end: '',
  fields: 'day',
  customItem: ''
};
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      showPicker: {
        visible: false
      }
    };
  },
  created: function created() {
    var _this = this;

    // 订阅 View 层的 showPicker 事件
    UniServiceJSBridge.subscribe('showPicker', function (args, pageId) {
      // 根据不同参数，渲染不同类型 picker(注意全局仅一个 picker 组件对象,每次 showPicker 需传入当前类型 picker 的完整参数)
      _this.showPicker = Object.assign(defaultProps, args, {
        pageId: pageId,
        visible: true
      });
    }); // 订阅 View 层的 hidePicker 事件

    UniServiceJSBridge.subscribe('hidePicker', function () {
      _this._onPickerClose();
    }); // 订阅页面返回跳转时触发的 uni.onHidePopup 事件，隐藏 picker

    UniServiceJSBridge.on('onHidePopup', function () {
      _this._onPickerClose();
    });
  },
  methods: {
    // 处理 Picker close 回调
    _onPickerClose: function _onPickerClose() {
      // 隐藏 picker 重置数据
      this.showPicker.visible = false;
      this.showPicker.mode = 'selector';
      this.showPicker.range = [];
      this.showPicker.value = 0;
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "763a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_picker_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1067");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_picker_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_picker_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_picker_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "7771":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/shared/index.js + 3 modules
var shared = __webpack_require__("f2b3");

// CONCATENATED MODULE: ./src/platforms/h5/helpers/can-i-use.js
/* harmony default export */ var can_i_use = ({
  'css.var': window.CSS && window.CSS.supports && window.CSS.supports('--a', 0)
});
// CONCATENATED MODULE: ./src/core/service/api/can-i-use.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canIUse", function() { return canIUse; });

 // TODO 待处理其他 API 的检测

function canIUse(schema) {
  if (Object(shared["c" /* hasOwn */])(can_i_use, schema)) {
    return can_i_use[schema];
  }

  return true;
}

/***/ }),

/***/ "77e0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge, console) {/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      showToast: {
        visible: false
      }
    };
  },
  created: function created() {
    var _this = this;

    var showType = '';

    var createOnShow = function createOnShow(type) {
      return function (args) {
        showType = type;
        setTimeout(function () {
          // 延迟一下 show 可解决窗口打开前调用 showToast 在 onHidePopup 之后触发
          _this.showToast = args;
        }, 10);
      };
    };

    UniServiceJSBridge.on('onShowToast', createOnShow('onShowToast'));
    UniServiceJSBridge.on('onShowLoading', createOnShow('onShowLoading'));

    var createOnHide = function createOnHide(type) {
      return function () {
        var warnMsg = '';

        if (type === 'onHideToast' && showType !== 'onShowToast') {
          warnMsg = '请注意 showToast 与 hideToast 必须配对使用';
        } else if (type === 'onHideLoading' && showType !== 'onShowLoading') {
          warnMsg = '请注意 showLoading 与 hideLoading 必须配对使用';
        }

        if (warnMsg) {
          return console.warn(warnMsg);
        }

        showType = '';
        setTimeout(function () {
          // 与 show 对应延迟10ms，避免快速调用 show，hide 导致无法关闭
          _this.showToast.visible = false;
        }, 10);
      };
    };

    UniServiceJSBridge.on('onHidePopup', createOnHide('onHidePopup'));
    UniServiceJSBridge.on('onHideToast', createOnHide('onHideToast'));
    UniServiceJSBridge.on('onHideLoading', createOnHide('onHideLoading'));
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1"), __webpack_require__("3ad9")["default"]))

/***/ }),

/***/ "78c8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSystemInfoSync", function() { return getSystemInfoSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSystemInfo", function() { return getSystemInfo; });
/* harmony import */ var uni_platform_helpers_get_window_offset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a470");

var ua = navigator.userAgent;
/**
 * 是否安卓设备
 */

var isAndroid = /android/i.test(ua);
/**
 * 是否iOS设备
 */

var isIOS = /iphone|ipad|ipod/i.test(ua);
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

  if (isIOS) {
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

  var _getWindowOffset = Object(uni_platform_helpers_get_window_offset__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(),
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
    model: model
  };
}
/**
 * 获取系统信息-异步
 */

function getSystemInfo() {
  return getSystemInfoSync();
}

/***/ }),

/***/ "78ff":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProvider", function() { return getProvider; });
function getProvider(_ref) {
  var service = _ref.service;
  return {
    service: service,
    provider: []
  };
}

/***/ }),

/***/ "7bb3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/checkbox/index.vue?vue&type=template&id=00a7b054&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-checkbox',_vm._g({on:{"click":_vm._onClick}},_vm.$listeners),[_c('div',{staticClass:"uni-checkbox-wrapper"},[_c('div',{staticClass:"uni-checkbox-input",class:[_vm.checkboxChecked ? 'uni-checkbox-input-checked' : ''],style:({color:_vm.color})}),_vm._t("default")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/checkbox/index.vue?vue&type=template&id=00a7b054&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__("8af1");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/checkbox/index.vue?vue&type=script&lang=js&
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
var checkboxvue_type_style_index_0_lang_css_ = __webpack_require__("f53a");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var components_checkbox = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "7c2b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6144");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "7d18":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uploadFile", function() { return uploadFile; });
/* harmony import */ var uni_platform_helpers_file__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e2e2");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * 上传任务
 */

var UploadTask =
/*#__PURE__*/
function () {
  function UploadTask(xhr, callbackId) {
    _classCallCheck(this, UploadTask);

    _defineProperty(this, "_xhr", void 0);

    _defineProperty(this, "_isAbort", void 0);

    _defineProperty(this, "_callbacks", []);

    this._xhr = xhr;
    this._callbackId = callbackId;
  }
  /**
   * 监听上传进度
   * @param callback 回调
   */


  _createClass(UploadTask, [{
    key: "onProgressUpdate",
    value: function onProgressUpdate(callback) {
      if (typeof callback !== 'function') {
        return;
      }

      this._callbacks.push(callback);
    }
    /**
     * 中断上传任务
     */

  }, {
    key: "abort",
    value: function abort() {
      this._isAbort = true;

      if (this._xhr) {
        this._xhr.abort();

        delete this._xhr;
      }
    }
  }]);

  return UploadTask;
}();
/**
 * 上传文件
 * @param {*} param0
 * @param {*} callbackId
 * @return {UploadTask}
 */


function uploadFile(_ref, callbackId) {
  var url = _ref.url,
      filePath = _ref.filePath,
      name = _ref.name,
      header = _ref.header,
      formData = _ref.formData;
  var timeout = __uniConfig.networkTimeout && __uniConfig.networkTimeout.uploadFile || 60 * 1000;
  var _UniServiceJSBridge = UniServiceJSBridge,
      invoke = _UniServiceJSBridge.invokeCallbackHandler;
  var uploadTask = new UploadTask(null, callbackId);

  function upload(file) {
    var xhr = new XMLHttpRequest();
    var form = new FormData();
    var timer;
    Object.keys(formData).forEach(function (key) {
      form.append(key, formData[key]);
    });
    form.append(name, file, file.name || "file-".concat(Date.now()));
    xhr.open('POST', url);
    Object.keys(header).forEach(function (key) {
      xhr.setRequestHeader(key, header[key]);
    });

    xhr.upload.onprogress = function (event) {
      uploadTask._callbacks.forEach(function (callback) {
        var totalBytesSent = event.loaded;
        var totalBytesExpectedToSend = event.total;
        var progress = Math.round(totalBytesSent / totalBytesExpectedToSend * 100);
        callback({
          progress: progress,
          totalBytesSent: totalBytesSent,
          totalBytesExpectedToSend: totalBytesExpectedToSend
        });
      });
    };

    xhr.onerror = function () {
      clearTimeout(timer);
      invoke(callbackId, {
        errMsg: 'uploadFile:fail'
      });
    };

    xhr.onabort = function () {
      clearTimeout(timer);
      invoke(callbackId, {
        errMsg: 'uploadFile:fail abort'
      });
    };

    xhr.onload = function () {
      clearTimeout(timer);
      var statusCode = xhr.status;
      invoke(callbackId, {
        errMsg: 'uploadFile:ok',
        statusCode: statusCode,
        data: xhr.responseText || xhr.response
      });
    };

    if (!uploadTask._isAbort) {
      timer = setTimeout(function () {
        xhr.upload.onprogress = xhr.onload = xhr.onabort = xhr.onerror = null;
        uploadTask.abort();
        invoke(callbackId, {
          errMsg: 'uploadFile:fail timeout'
        });
      }, timeout);
      xhr.send(form);
      uploadTask._xhr = xhr;
    } else {
      invoke(callbackId, {
        errMsg: 'uploadFile:fail abort'
      });
    }
  }

  Object(uni_platform_helpers_file__WEBPACK_IMPORTED_MODULE_0__[/* urlToFile */ "b"])(filePath).then(upload).catch(function () {
    setTimeout(function () {
      invoke(callbackId, {
        errMsg: 'uploadFile:fail file error'
      });
    }, 0);
  });
  return uploadTask;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "7f4e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makePhoneCall", function() { return makePhoneCall; });
function makePhoneCall(_ref) {
  var phoneNumber = _ref.phoneNumber;
  window.location.href = "tel:".concat(phoneNumber);
  return {
    errMsg: 'makePhoneCall:ok'
  };
}

/***/ }),

/***/ "81ea":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/app/tabBar.vue?vue&type=template&id=1bd3e3f9&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-tabbar',[_c('div',{staticClass:"uni-tabbar",style:({backgroundColor:_vm.backgroundColor})},[_c('div',{staticClass:"uni-tabbar-border",style:({backgroundColor:_vm.borderColor})}),_vm._l((_vm.list),function(item,index){return _c('div',{key:item.pagePath,staticClass:"uni-tabbar__item",on:{"click":function($event){return _vm._switchTab(item,index)}}},[_c('div',{staticClass:"uni-tabbar__bd"},[(item.iconPath)?_c('div',{staticClass:"uni-tabbar__icon",class:{'uni-tabbar__icon__diff':!item.text}},[_c('img',{attrs:{"src":_vm._getRealPath(_vm.$route.meta.pagePath===item.pagePath?item.selectedIconPath:item.iconPath)}})]):_vm._e(),(item.text)?_c('div',{staticClass:"uni-tabbar__label",style:({color:_vm.$route.meta.pagePath===item.pagePath?_vm.selectedColor:_vm.color,fontSize:item.iconPath?'10px':'14px'})},[_vm._v("\n          "+_vm._s(item.text)+"\n        ")]):_vm._e(),(item.redDot)?_c('div',{staticClass:"uni-tabbar__reddot",class:{'uni-tabbar__badge':!!item.badge}},[_vm._v(_vm._s(item.badge))]):_vm._e()])])})],2),_c('div',{staticClass:"uni-placeholder"})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/components/app/tabBar.vue?vue&type=template&id=1bd3e3f9&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/app/tabBar.vue?vue&type=script&lang=js&
var tabBarvue_type_script_lang_js_ = __webpack_require__("5b1e");

// CONCATENATED MODULE: ./src/platforms/h5/components/app/tabBar.vue?vue&type=script&lang=js&
 /* harmony default export */ var app_tabBarvue_type_script_lang_js_ = (tabBarvue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./src/platforms/h5/components/app/tabBar.vue?vue&type=style&index=0&lang=css&
var tabBarvue_type_style_index_0_lang_css_ = __webpack_require__("f4e0");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

// CONCATENATED MODULE: ./src/platforms/h5/components/app/tabBar.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  app_tabBarvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var tabBar = (component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/app/popup/toast.vue?vue&type=template&id=d02db872&
var toastvue_type_template_id_d02db872_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"uni-fade"}},[(_vm.visible)?_c('uni-toast',{attrs:{"data-duration":_vm.duration}},[(_vm.mask)?_c('div',{staticClass:"uni-mask",staticStyle:{"background":"transparent"},on:{"touchmove":function($event){$event.preventDefault();}}}):_vm._e(),(!_vm.image&&!_vm.iconClass)?_c('div',{staticClass:"uni-sample-toast"},[_c('p',{staticClass:"uni-simple-toast__text"},[_vm._v(_vm._s(_vm.title))])]):_c('div',{staticClass:"uni-toast"},[(_vm.image)?_c('img',{staticClass:"uni-toast__icon",attrs:{"src":_vm.image}}):_c('i',{staticClass:"uni-icon_toast",class:_vm.iconClass}),_c('p',{staticClass:"uni-toast__content"},[_vm._v(_vm._s(_vm.title))])])]):_vm._e()],1)}
var toastvue_type_template_id_d02db872_staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/components/app/popup/toast.vue?vue&type=template&id=d02db872&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/app/popup/toast.vue?vue&type=script&lang=js&
var toastvue_type_script_lang_js_ = __webpack_require__("6258");

// CONCATENATED MODULE: ./src/platforms/h5/components/app/popup/toast.vue?vue&type=script&lang=js&
 /* harmony default export */ var popup_toastvue_type_script_lang_js_ = (toastvue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./src/platforms/h5/components/app/popup/toast.vue?vue&type=style&index=0&lang=css&
var toastvue_type_style_index_0_lang_css_ = __webpack_require__("ff28");

// CONCATENATED MODULE: ./src/platforms/h5/components/app/popup/toast.vue






/* normalize component */

var toast_component = Object(componentNormalizer["a" /* default */])(
  popup_toastvue_type_script_lang_js_,
  toastvue_type_template_id_d02db872_render,
  toastvue_type_template_id_d02db872_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var toast = (toast_component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/app/popup/modal.vue?vue&type=template&id=a2794382&
var modalvue_type_template_id_a2794382_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"uni-fade"}},[_c('uni-modal',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],on:{"touchmove":function($event){$event.preventDefault();}}},[_c('div',{staticClass:"uni-mask"}),_c('div',{staticClass:"uni-modal"},[(_vm.title)?_c('div',{staticClass:"uni-modal__hd"},[_c('strong',{staticClass:"uni-modal__title"},[_vm._v(_vm._s(_vm.title))])]):_vm._e(),_c('div',{staticClass:"uni-modal__bd",on:{"touchmove":function($event){$event.stopPropagation();}}},[_vm._v(_vm._s(_vm.content))]),_c('div',{staticClass:"uni-modal__ft"},[(_vm.showCancel)?_c('div',{staticClass:"uni-modal__btn uni-modal__btn_default",style:({color:_vm.cancelColor}),on:{"click":function($event){return _vm._close('cancel')}}},[_vm._v(_vm._s(_vm.cancelText))]):_vm._e(),_c('div',{staticClass:"uni-modal__btn uni-modal__btn_primary",style:({color:_vm.confirmColor}),on:{"click":function($event){return _vm._close('confirm')}}},[_vm._v(_vm._s(_vm.confirmText))])])])])],1)}
var modalvue_type_template_id_a2794382_staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/components/app/popup/modal.vue?vue&type=template&id=a2794382&

// EXTERNAL MODULE: ./src/platforms/h5/components/app/popup/mixins/transition.js
var transition = __webpack_require__("5a56");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/app/popup/modal.vue?vue&type=script&lang=js&
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

/* harmony default export */ var modalvue_type_script_lang_js_ = ({
  name: 'Modal',
  mixins: [transition["default"]],
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    cancelColor: {
      type: String,
      default: '#000000'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    confirmColor: {
      type: String,
      default: '#007aff'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    _close: function _close(type) {
      this.$emit('close', type);
    }
  }
});
// CONCATENATED MODULE: ./src/platforms/h5/components/app/popup/modal.vue?vue&type=script&lang=js&
 /* harmony default export */ var popup_modalvue_type_script_lang_js_ = (modalvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/platforms/h5/components/app/popup/modal.vue?vue&type=style&index=0&lang=css&
var modalvue_type_style_index_0_lang_css_ = __webpack_require__("2765");

// CONCATENATED MODULE: ./src/platforms/h5/components/app/popup/modal.vue






/* normalize component */

var modal_component = Object(componentNormalizer["a" /* default */])(
  popup_modalvue_type_script_lang_js_,
  modalvue_type_template_id_a2794382_render,
  modalvue_type_template_id_a2794382_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var modal = (modal_component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/app/popup/picker.vue?vue&type=template&id=100292d8&
var pickervue_type_template_id_100292d8_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-picker',{on:{"touchmove":function($event){$event.preventDefault();}}},[_c('transition',{attrs:{"name":"uni-fade"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],staticClass:"uni-mask",on:{"click":_vm._cancel}})]),_c('div',{staticClass:"uni-picker",class:{'uni-picker-toggle':_vm.visible}},[_c('div',{staticClass:"uni-picker-header",on:{"click":function($event){$event.stopPropagation();}}},[_c('div',{staticClass:"uni-picker-action uni-picker-action-cancel",on:{"click":_vm._cancel}},[_vm._v("取消")]),_c('div',{staticClass:"uni-picker-action uni-picker-action-confirm",on:{"click":_vm._change}},[_vm._v("确定")])]),(_vm.visible)?_c('v-uni-picker-view',{staticClass:"uni-picker-content",attrs:{"value":_vm.valueArray},on:{"update:value":function($event){_vm.valueArray=$event}}},_vm._l((_vm.rangeArray),function(range,index0){return _c('v-uni-picker-view-column',{key:index0},_vm._l((range),function(item,index){return _c('div',{key:index,staticClass:"uni-picker-item"},[_vm._v(_vm._s(typeof item==='object'?item[_vm.rangeKey]||'':item)+_vm._s(_vm.units[index0]||''))])}),0)}),1):_vm._e()],1)],1)}
var pickervue_type_template_id_100292d8_staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/components/app/popup/picker.vue?vue&type=template&id=100292d8&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/app/popup/picker.vue?vue&type=script&lang=js&
var pickervue_type_script_lang_js_ = __webpack_require__("fb79");

// CONCATENATED MODULE: ./src/platforms/h5/components/app/popup/picker.vue?vue&type=script&lang=js&
 /* harmony default export */ var popup_pickervue_type_script_lang_js_ = (pickervue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./src/platforms/h5/components/app/popup/picker.vue?vue&type=style&index=0&lang=css&
var pickervue_type_style_index_0_lang_css_ = __webpack_require__("763a");

// CONCATENATED MODULE: ./src/platforms/h5/components/app/popup/picker.vue






/* normalize component */

var picker_component = Object(componentNormalizer["a" /* default */])(
  popup_pickervue_type_script_lang_js_,
  pickervue_type_template_id_100292d8_render,
  pickervue_type_template_id_100292d8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var picker = (picker_component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/app/popup/actionSheet.vue?vue&type=template&id=6f5e6268&
var actionSheetvue_type_template_id_6f5e6268_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-actionsheet',{on:{"touchmove":function($event){$event.preventDefault();}}},[_c('transition',{attrs:{"name":"uni-fade"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],staticClass:"uni-mask",on:{"click":function($event){return _vm._close(-1)}}})]),_c('div',{staticClass:"uni-actionsheet",class:{'uni-actionsheet_toggle':_vm.visible}},[_c('div',{staticClass:"uni-actionsheet__menu"},[(_vm.title)?_c('div',{staticClass:"uni-actionsheet__title"},[_vm._v(_vm._s(_vm.title))]):_vm._e(),_vm._l((_vm.itemList),function(title,index){return _c('div',{key:index,staticClass:"uni-actionsheet__cell",style:({color:_vm.itemColor}),on:{"click":function($event){return _vm._close(index)}}},[_vm._v(_vm._s(title))])})],2),_c('div',{staticClass:"uni-actionsheet__action"},[_c('div',{staticClass:"uni-actionsheet__cell",style:({color:_vm.itemColor}),on:{"click":function($event){return _vm._close(-1)}}},[_vm._v("取消")])])])],1)}
var actionSheetvue_type_template_id_6f5e6268_staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/components/app/popup/actionSheet.vue?vue&type=template&id=6f5e6268&

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/app/popup/actionSheet.vue?vue&type=script&lang=js&
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
/* harmony default export */ var actionSheetvue_type_script_lang_js_ = ({
  name: 'ActionSheet',
  props: {
    title: {
      type: String,
      default: ''
    },
    itemList: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    itemColor: {
      type: String,
      default: '#000000'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    _close: function _close(tapIndex) {
      this.$emit('close', tapIndex);
    }
  }
});
// CONCATENATED MODULE: ./src/platforms/h5/components/app/popup/actionSheet.vue?vue&type=script&lang=js&
 /* harmony default export */ var popup_actionSheetvue_type_script_lang_js_ = (actionSheetvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/platforms/h5/components/app/popup/actionSheet.vue?vue&type=style&index=0&lang=css&
var actionSheetvue_type_style_index_0_lang_css_ = __webpack_require__("4fef");

// CONCATENATED MODULE: ./src/platforms/h5/components/app/popup/actionSheet.vue






/* normalize component */

var actionSheet_component = Object(componentNormalizer["a" /* default */])(
  popup_actionSheetvue_type_script_lang_js_,
  actionSheetvue_type_template_id_6f5e6268_render,
  actionSheetvue_type_template_id_6f5e6268_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var actionSheet = (actionSheet_component.exports);
// CONCATENATED MODULE: ./src/platforms/h5/components/app/components.js





/* harmony default export */ var components = __webpack_exports__["a"] = ({
  TabBar: tabBar,
  Toast: toast,
  Modal: modal,
  Picker: picker,
  ActionSheet: actionSheet
});

/***/ }),

/***/ "8390":
/***/ (function(module, exports) {

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(){
  "use strict";

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  // Use a lookup table to find the index.
  var lookup = new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i+1)];
      encoded3 = lookup[base64.charCodeAt(i+2)];
      encoded4 = lookup[base64.charCodeAt(i+3)];

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})();


/***/ }),

/***/ "83a6":
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

/***/ "8542":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addInterceptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return removeInterceptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return wrapperReturnValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return invokeApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return promiseInterceptor; });
/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f2b3");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);

  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }

  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isPlainObject */ "f"])(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isPlainObject */ "f"])(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isPlainObject */ "f"])(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isPlainObject */ "f"])(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (_typeof(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;

  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];

    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);

      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }

      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }

  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}

function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];

      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];

  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }

  var interceptor = scopedInterceptors[method];

  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }

  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];

  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }

  return interceptor;
}

function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }

  var interceptor = getApiInterceptorHooks(method);

  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }

  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }

    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  }
};

/***/ }),

/***/ "854d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fa89");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "856e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("500a");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "85b6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hasLifecycleHook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return normalizeDataset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return upx2px; });
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

  if (true) {
    var keys = Object.keys(result);
    var len = keys.length;

    if (len) {
      // remove data-v-
      for (var i = 0; i < len; i++) {
        var key = keys[i];
        var _len = key.length;

        if (key.substr(0, 1) === 'v' && (_len === 9 || _len === 10)) {
          delete result[key];
          break;
        }
      }
    }
  }

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

/***/ "8793":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./action-sheet.js": "626d",
	"./index.js": "f1ea",
	"./modal.js": "ee4f",
	"./picker.js": "7557",
	"./toast.js": "77e0",
	"./transition.js": "5a56"
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
webpackContext.id = "8793";

/***/ }),

/***/ "8842":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/movable-view/index.vue?vue&type=template&id=16705ccc&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-movable-view',_vm._g({},_vm.$listeners),[_c('v-uni-resize-sensor',{on:{"resize":_vm.setParent}}),_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/movable-view/index.vue?vue&type=template&id=16705ccc&

// EXTERNAL MODULE: ./src/core/view/mixins/touchtrack.js
var touchtrack = __webpack_require__("ba15");

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
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/movable-view/index.vue?vue&type=script&lang=js&
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
var movable_viewvue_type_style_index_0_lang_css_ = __webpack_require__("7c2b");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var movable_view = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "893e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connectSocket", function() { return connectSocket; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendSocketMessage", function() { return sendSocketMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeSocket", function() { return closeSocket; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onSocketOpen", function() { return onSocketOpen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onSocketError", function() { return onSocketError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onSocketMessage", function() { return onSocketMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onSocketClose", function() { return onSocketClose; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var socketTask;
/**
 * SocketTask
 */

var SocketTask =
/*#__PURE__*/
function () {
  /**
   * WebSocket实例
   */

  /**
   * 构造函数
   * @param {string} url
   * @param {Array} protocols
   */
  function SocketTask(url, protocols) {
    _classCallCheck(this, SocketTask);

    _defineProperty(this, "_webSocket", void 0);

    this._webSocket = new WebSocket(url, protocols);
  }
  /**
   * 发送
   * @param {any} data
   */


  _createClass(SocketTask, [{
    key: "send",
    value: function send() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var data = options.data;
      var ws = this._webSocket;

      try {
        ws.send(data);

        this._callback(options, 'sendSocketMessage:ok');
      } catch (error) {
        this._callback(options, "sendSocketMessage:fail ".concat(error));
      }
    }
    /**
     * 关闭
     * @param {number} code
     * @param {string} reason
     */

  }, {
    key: "close",
    value: function close() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var code = options.data;
      var reason = options.data;
      var ws = this._webSocket;

      try {
        ws.close(code, reason);

        this._callback(options, 'sendSocketMessage:ok');
      } catch (error) {
        this._callback(options, "sendSocketMessage:fail ".concat(error));
      }
    }
    /**
     * 监听开启
     * @param {Function} callback
     */

  }, {
    key: "onOpen",
    value: function onOpen(callback) {
      this._on('open', callback);
    }
    /**
     * 监听关闭
     * @param {Function} callback
     */

  }, {
    key: "onClose",
    value: function onClose(callback) {
      this._on('close', callback);
    }
    /**
     * 监听错误
     * @param {Function} callback
     */

  }, {
    key: "onError",
    value: function onError(callback) {
      this._on('error', callback);
    }
    /**
     * 监听消息
     * @param {Function} callback
     */

  }, {
    key: "onMessage",
    value: function onMessage(callback) {
      this._on('message', callback);
    }
    /**
     * 监听事件
     * @param {string} eventName
     * @param {Function} callback
     */

  }, {
    key: "_on",
    value: function _on(eventName, callback) {
      this._webSocket.addEventListener(eventName, function (event) {
        if (eventName === 'message') {
          callback({
            data: event.data
          });
        } else {
          callback();
        }
      }, false);
    }
    /**
     * 通用回调处理
     */

  }, {
    key: "_callback",
    value: function _callback(_ref, errMsg) {
      var success = _ref.success,
          fail = _ref.fail,
          complete = _ref.complete;
      var data = {
        errMsg: errMsg
      };

      if (/:ok$/.test(errMsg)) {
        if (typeof success === 'function') {
          success(data);
        }
      } else {
        if (typeof fail === 'function') {
          fail(data);
        }
      }

      if (typeof complete === 'function') {
        complete(data);
      }
    }
  }]);

  return SocketTask;
}();
/**
 * 创建一个 WebSocket 连接
 * @param {any} data 数据
 * @return {SocketTask}
 */


function connectSocket(_ref2, callbackId) {
  var url = _ref2.url,
      protocols = _ref2.protocols;
  var _UniServiceJSBridge = UniServiceJSBridge,
      invoke = _UniServiceJSBridge.invokeCallbackHandler;
  socketTask = new SocketTask(url, protocols);
  setTimeout(function () {
    invoke(callbackId, {
      errMsg: 'connectSocket:ok'
    });
  }, 0);
  return socketTask;
}
/**
 * 通过 WebSocket 连接发送数据
 * @param {any} options
 * @param {string} callbackId
 */

function sendSocketMessage(options, callbackId) {
  var _UniServiceJSBridge2 = UniServiceJSBridge,
      invoke = _UniServiceJSBridge2.invokeCallbackHandler;

  if (socketTask && socketTask._webSocket.readyState === WebSocket.OPEN) {
    socketTask.send(Object.assign(options, {
      complete: function complete(res) {
        invoke(callbackId, res);
      }
    }));
  } else {
    invoke(callbackId, {
      errMsg: 'sendSocketMessage:fail WebSocket is not connected '
    });
  }
}
/**
 * 关闭WebSocket连接
 * @param {any} options
 * @param {string} callbackId
 */

function closeSocket(options, callbackId) {
  var _UniServiceJSBridge3 = UniServiceJSBridge,
      invoke = _UniServiceJSBridge3.invokeCallbackHandler;

  if (socketTask && socketTask._webSocket.readyState !== WebSocket.CLOSED) {
    socketTask.close(Object.assign(options, {
      complete: function complete(res) {
        invoke(callbackId, res);
      }
    }));
  } else {
    invoke(callbackId, {
      errMsg: 'closeSocket:fail WebSocket is not connected'
    });
  }
}
/**
 * 监听事件
 * @param {string} method
 */

function on(method) {
  var _UniServiceJSBridge4 = UniServiceJSBridge,
      invoke = _UniServiceJSBridge4.invokeCallbackHandler;
  return function (callbackId) {
    if (socketTask) {
      socketTask[method](function (res) {
        invoke(callbackId, res);
      });
    }
  };
}
/**
 * 监听WebSocket连接打开事件
 * @param {Function} cb
 */


var onSocketOpen = on('onOpen');
/**
 * 监听WebSocket错误
 * @param {Function} cb
 */

var onSocketError = on('onError');
/**
 * 监听WebSocket接受到服务器的消息事件
 * @param {Function} cb
 */

var onSocketMessage = on('onMessage');
/**
 * 监听WebSocket关闭
 * @param {Function} callback
 */

var onSocketClose = on('onClose');
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "8a36":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f2b3");

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

      if (!Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isPlainObject */ "f"])(listeners)) {
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

      if (!Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isPlainObject */ "f"])(listeners)) {
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("501c")))

/***/ }),

/***/ "8aec":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./src/core/view/mixins/scroller/Friction.js
var Friction = __webpack_require__("5363");

// EXTERNAL MODULE: ./src/core/view/mixins/scroller/Spring.js
var Spring = __webpack_require__("72b3");

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

/***/ "8af1":
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
var listeners = __webpack_require__("8a36");

// EXTERNAL MODULE: ./src/core/view/mixins/hover.js
var hover = __webpack_require__("83a6");

// EXTERNAL MODULE: ./src/core/view/mixins/subscriber.js
var subscriber = __webpack_require__("1b6f");

// CONCATENATED MODULE: ./src/core/view/mixins/index.js
/* concated harmony reexport emitter */__webpack_require__.d(__webpack_exports__, "a", function() { return emitter; });
/* concated harmony reexport listeners */__webpack_require__.d(__webpack_exports__, "c", function() { return listeners["a" /* default */]; });
/* concated harmony reexport hover */__webpack_require__.d(__webpack_exports__, "b", function() { return hover["a" /* default */]; });
/* concated harmony reexport subscriber */__webpack_require__.d(__webpack_exports__, "d", function() { return subscriber["a" /* default */]; });





/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "8c15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony import */ var uni_helpers_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("85b6");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("d4b6");
/* harmony import */ var _behaviors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("61c2");




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


/* harmony default export */ __webpack_exports__["default"] = ({
  install: function install(Vue) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        routes = _ref.routes;

    Object(_events__WEBPACK_IMPORTED_MODULE_1__[/* initEvents */ "a"])();

    Vue.prototype.$handleEvent = function ($event) {
      if ($event instanceof Event) {
        // 未处理的 event 对象 需要对 target 校正及包装
        // 查找 uniTarget
        var target = $event.target;
        var $el = this.$el;

        for (; target && target !== $el; target = target.parentNode) {
          if (target.tagName && target.tagName.indexOf('UNI-') === 0) {
            break;
          }
        }

        $event = _events__WEBPACK_IMPORTED_MODULE_1__[/* processEvent */ "b"].call(this, $event.type, $event, {}, target || $event.target, $event.currentTarget);
      }

      return $event;
    };

    Vue.mixin({
      beforeCreate: function beforeCreate() {
        var options = this.$options;

        if (options.behaviors && options.behaviors.length) {
          Object(_behaviors__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(options, this);
        }

        if (Object(uni_helpers_index__WEBPACK_IMPORTED_MODULE_0__[/* isPage */ "b"])(this)) {
          options.mounted = options.mounted ? [].concat(pageMounted, options.mounted) : [pageMounted];
        }
      }
    }); // TODO 跨平台时，View 层需要注入$page属性
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("501c")))

/***/ }),

/***/ "8ce3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chooseVideo", function() { return chooseVideo; });
/* harmony import */ var uni_platform_helpers_file__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e2e2");
/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("f2b3");


var _UniServiceJSBridge = UniServiceJSBridge,
    invoke = _UniServiceJSBridge.invokeCallbackHandler;
var videoInput = null;

var _createInput = function _createInput(options) {
  var inputEl = document.createElement('input');
  inputEl.type = 'file';
  Object(uni_shared__WEBPACK_IMPORTED_MODULE_1__[/* updateElementStyle */ "j"])(inputEl, {
    'position': 'absolute',
    'visibility': 'hidden',
    'z-index': -999,
    'width': 0,
    'height': 0,
    'top': 0,
    'left': 0
  });
  inputEl.accept = 'video/*'; // 经过测试，仅能限制只通过相机拍摄，不能限制只允许从相册选择。

  if (options.sourceType.length === 1 && options.sourceType[0] === 'camera') {
    inputEl.capture = 'camera';
  }

  return inputEl;
};

function chooseVideo(_ref, callbackId) {
  var sourceType = _ref.sourceType;

  if (videoInput) {
    document.body.removeChild(videoInput);
    videoInput = null;
  }

  videoInput = _createInput({
    sourceType: sourceType
  });
  document.body.appendChild(videoInput);
  videoInput.addEventListener('change', function (event) {
    var file = event.target.files[0];
    var filePath = Object(uni_platform_helpers_file__WEBPACK_IMPORTED_MODULE_0__[/* fileToUrl */ "a"])(file);
    var callbackResult = {
      errMsg: 'chooseVideo:ok',
      tempFilePath: filePath,
      size: file.size,
      duration: 0,
      width: 0,
      height: 0
    };
    var video = document.createElement('video');

    if (video.onloadedmetadata) {
      // 尝试获取视频的宽高信息
      video.onloadedmetadata = function () {
        callbackResult.duration = video.duration || 0;
        callbackResult.width = video.videoWidth || 0;
        callbackResult.height = video.videoHeight || 0;
        invoke(callbackId, callbackResult);
      };

      video.src = filePath;
    } else {
      invoke(callbackId, callbackResult);
    } // TODO 用户取消选择时，触发 fail，目前尚未找到合适的方法。

  });
  videoInput.click();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "8e16":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_pageHead_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a1e3");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_pageHead_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_pageHead_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_pageHead_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "8ecd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initSubscribe; });
/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f2b3");
/* harmony import */ var uni_helpers_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("85b6");
/* harmony import */ var uni_helpers_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("65a8");
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("33ed");
/* harmony import */ var _request_component_info__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("9fe6");
/* harmony import */ var _request_component_observer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("4c68");






var passiveOptions = uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* supportsPassive */ "h"] ? {
  passive: false
} : false;

function updateCssVar(vm) {
  if (uni.canIUse('css.var')) {
    var pageVm = vm.$parent.$parent;
    var windowTop = pageVm.showNavigationBar && pageVm.navigationBar.type !== 'transparent' ? uni_helpers_constants__WEBPACK_IMPORTED_MODULE_2__[/* NAVBAR_HEIGHT */ "a"] + 'px' : '0px';
    var windowBottom = getApp().$children[0].showTabBar ? uni_helpers_constants__WEBPACK_IMPORTED_MODULE_2__[/* TABBAR_HEIGHT */ "b"] + 'px' : '0px';
    var style = document.documentElement.style;
    style.setProperty('--window-top', windowTop);
    style.setProperty('--window-bottom', windowBottom);
    console.debug("".concat(vm.$page.route, "[").concat(vm.$page.id, "]\uFF1A--window-top=").concat(windowTop));
    console.debug("".concat(vm.$page.route, "[").concat(vm.$page.id, "]\uFF1A--window-bottom=").concat(windowBottom));
  }
}

function initSubscribe(subscribe) {
  subscribe('requestComponentInfo', _request_component_info__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]);
  subscribe('pageScrollTo', _scroll__WEBPACK_IMPORTED_MODULE_3__[/* pageScrollTo */ "c"]);
  subscribe('requestComponentObserver', _request_component_observer__WEBPACK_IMPORTED_MODULE_5__[/* requestComponentObserver */ "b"]);
  subscribe('destroyComponentObserver', _request_component_observer__WEBPACK_IMPORTED_MODULE_5__[/* destroyComponentObserver */ "a"]);

  if (true) {
    var scrollListener = false;
    var disableScrollListener = false;
    subscribe('onPageLoad', function (vm) {
      // 用户 onLoad 之前 update
      updateCssVar(vm);
    });
    subscribe('onPageShow', function (vm) {
      var pageVm = vm.$parent.$parent;

      if (vm._isMounted) {
        // 非首次 show 才 update（首次 show 的时候在 onPageLoad 中触发了）
        updateCssVar(vm);
      }

      if (disableScrollListener) {
        document.removeEventListener('touchmove', disableScrollListener, passiveOptions);
      }

      if (pageVm.disableScroll) {
        disableScrollListener = _scroll__WEBPACK_IMPORTED_MODULE_3__[/* disableScroll */ "b"];
        document.addEventListener('touchmove', disableScrollListener, passiveOptions);
      }

      var enablePageScroll = Object(uni_helpers_index__WEBPACK_IMPORTED_MODULE_1__[/* hasLifecycleHook */ "a"])(vm.$options, 'onPageScroll');
      var enablePageReachBottom = Object(uni_helpers_index__WEBPACK_IMPORTED_MODULE_1__[/* hasLifecycleHook */ "a"])(vm.$options, 'onReachBottom');
      var onReachBottomDistance = pageVm.onReachBottomDistance;
      var enableTransparentTitleNView = Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isPlainObject */ "f"])(pageVm.titleNView) && pageVm.titleNView.type === 'transparent';

      if (scrollListener) {
        document.removeEventListener('scroll', scrollListener);
      }

      if (enableTransparentTitleNView || enablePageScroll || enablePageReachBottom) {
        // 初始化 scroll 监听
        scrollListener = Object(_scroll__WEBPACK_IMPORTED_MODULE_3__[/* createScrollListener */ "a"])(vm.$page.id, {
          enablePageScroll: enablePageScroll,
          enablePageReachBottom: enablePageReachBottom,
          onReachBottomDistance: onReachBottomDistance,
          enableTransparentTitleNView: enableTransparentTitleNView
        });
        setTimeout(function () {
          // 避免监听太早，直接触发了 scroll
          document.addEventListener('scroll', scrollListener);
        }, 10);
      }
    });
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3ad9")["default"]))

/***/ }),

/***/ "8f7e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/app/index.vue?vue&type=template&id=3339aaa9&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-app',{class:{'uni-app--showtabbar':_vm.showTabBar}},[_c('keep-alive',{attrs:{"include":_vm.keepAliveInclude}},[_c('router-view',{key:_vm.key})],1),(_vm.hasTabBar)?_c('tab-bar',_vm._b({directives:[{name:"show",rawName:"v-show",value:(_vm.showTabBar),expression:"showTabBar"}]},'tab-bar',_vm.tabBar,false)):_vm._e(),_c('toast',_vm._b({},'toast',_vm.showToast,false)),_c('action-sheet',_vm._b({on:{"close":_vm._onActionSheetClose}},'action-sheet',_vm.showActionSheet,false)),_c('modal',_vm._b({on:{"close":_vm._onModalClose}},'modal',_vm.showModal,false)),_c('picker',_vm._b({on:{"close":_vm._onPickerClose}},'picker',_vm.showPicker,false))],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/components/app/index.vue?vue&type=template&id=3339aaa9&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/app/index.vue?vue&type=script&lang=js&
var appvue_type_script_lang_js_ = __webpack_require__("4ec0");

// CONCATENATED MODULE: ./src/platforms/h5/components/app/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_appvue_type_script_lang_js_ = (appvue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./src/platforms/h5/components/app/index.vue?vue&type=style&index=0&lang=css&
var appvue_type_style_index_0_lang_css_ = __webpack_require__("854d");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

// CONCATENATED MODULE: ./src/platforms/h5/components/app/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_appvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var app = (component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/page/index.vue?vue&type=template&id=e0849642&
var pagevue_type_template_id_e0849642_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-page',{attrs:{"data-page":_vm.$route.meta.pagePath}},[(_vm.showNavigationBar)?_c('page-head',_vm._b({},'page-head',_vm.navigationBar,false)):_vm._e(),(_vm.enablePullDownRefresh)?_c('page-refresh',{ref:"refresh",attrs:{"color":_vm.refreshOptions.color,"offset":_vm.refreshOptions.offset}}):_vm._e(),(_vm.enablePullDownRefresh)?_c('page-body',{nativeOn:{"touchstart":function($event){return _vm._touchstart($event)},"touchmove":function($event){return _vm._touchmove($event)},"touchend":function($event){return _vm._touchend($event)},"touchcancel":function($event){return _vm._touchend($event)}}},[_vm._t("page")],2):_c('page-body',[_vm._t("page")],2)],1)}
var pagevue_type_template_id_e0849642_staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/components/page/index.vue?vue&type=template&id=e0849642&

// EXTERNAL MODULE: ./src/core/helpers/index.js
var helpers = __webpack_require__("85b6");

// EXTERNAL MODULE: ./src/core/helpers/constants.js
var constants = __webpack_require__("65a8");

// EXTERNAL MODULE: ./src/core/helpers/patch.js
var patch = __webpack_require__("24d9");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/page/pageHead.vue?vue&type=template&id=c753d96a&
var pageHeadvue_type_template_id_c753d96a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-page-head',{attrs:{"uni-page-head-type":_vm.type}},[_c('div',{staticClass:"uni-page-head",class:{'uni-page-head-transparent':_vm.type==='transparent'},style:({transitionDuration:_vm.duration,transitionTimingFunction:_vm.timingFunc,backgroundColor:_vm.bgColor,color:_vm.textColor})},[_c('div',{staticClass:"uni-page-head-hd"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.backButton),expression:"backButton"}],staticClass:"uni-page-head-btn",on:{"click":_vm._back}},[_c('i',{staticClass:"uni-btn-icon",style:({color:_vm.color,fontSize:'27px'})},[_vm._v("")])]),_vm._l((_vm.btns),function(btn,index){return [(btn.float === 'left')?_c('div',{key:index,staticClass:"uni-page-head-btn",class:{'uni-page-head-btn-red-dot':btn.redDot||btn.badgeText,'uni-page-head-btn-select':btn.select},style:({backgroundColor: _vm.type==='transparent'?btn.background:'transparent',width:btn.width}),attrs:{"badge-text":btn.badgeText}},[_c('i',{staticClass:"uni-btn-icon",style:(_vm._formatBtnStyle(btn)),domProps:{"innerHTML":_vm._s(_vm._formatBtnFontText(btn))},on:{"click":function($event){return _vm._onBtnClick(index)}}})]):_vm._e()]})],2),(!_vm.searchInput)?_c('div',{staticClass:"uni-page-head-bd"},[_c('div',{staticClass:"uni-page-head__title",style:({fontSize:_vm.titleSize,opacity:_vm.type==='transparent'?0:1})},[(_vm.loading)?_c('i',{staticClass:"uni-loading"}):_vm._e(),_vm._v("\n        "+_vm._s(_vm.titleText)+"\n      ")])]):_vm._e(),(_vm.searchInput)?_c('div',{staticClass:"uni-page-head-search",style:({'border-radius':_vm.searchInput.borderRadius,'background-color':_vm.searchInput.backgroundColor})},[_c('div',{staticClass:"uni-page-head-search-placeholder",class:[("uni-page-head-search-placeholder-" + (_vm.focus || _vm.text ? 'left' : _vm.searchInput.align))],style:({color:_vm.searchInput.placeholderColor})},[_vm._v(_vm._s(_vm.text || _vm.composing ? '' : _vm.searchInput.placeholder))]),_c('v-uni-input',{ref:"input",staticClass:"uni-page-head-search-input",style:({color:_vm.searchInput.color}),attrs:{"focus":_vm.searchInput.autoFocus,"disabled":_vm.searchInput.disabled,"placeholder-style":("color:" + (_vm.searchInput.placeholderColor)),"confirm-type":"search"},on:{"focus":_vm._focus,"blur":_vm._blur,"update:value":_vm._input},model:{value:(_vm.text),callback:function ($$v) {_vm.text=$$v},expression:"text"}})],1):_vm._e(),_c('div',{staticClass:"uni-page-head-ft"},[_vm._l((_vm.btns),function(btn,index){return [(btn.float !== 'left')?_c('div',{key:index,staticClass:"uni-page-head-btn",class:{'uni-page-head-btn-red-dot':btn.redDot||btn.badgeText,'uni-page-head-btn-select':btn.select},style:({backgroundColor: _vm.type==='transparent'?btn.background:'transparent',width:btn.width}),attrs:{"badge-text":btn.badgeText}},[_c('i',{staticClass:"uni-btn-icon",style:(_vm._formatBtnStyle(btn)),domProps:{"innerHTML":_vm._s(_vm._formatBtnFontText(btn))},on:{"click":function($event){return _vm._onBtnClick(index)}}})]):_vm._e()]})],2)]),(_vm.type!=='transparent')?_c('div',{staticClass:"uni-placeholder"}):_vm._e()])}
var pageHeadvue_type_template_id_c753d96a_staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/components/page/pageHead.vue?vue&type=template&id=c753d96a&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/page/pageHead.vue?vue&type=script&lang=js&
var pageHeadvue_type_script_lang_js_ = __webpack_require__("adb0");

// CONCATENATED MODULE: ./src/platforms/h5/components/page/pageHead.vue?vue&type=script&lang=js&
 /* harmony default export */ var page_pageHeadvue_type_script_lang_js_ = (pageHeadvue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./src/platforms/h5/components/page/pageHead.vue?vue&type=style&index=0&lang=css&
var pageHeadvue_type_style_index_0_lang_css_ = __webpack_require__("8e16");

// CONCATENATED MODULE: ./src/platforms/h5/components/page/pageHead.vue






/* normalize component */

var pageHead_component = Object(componentNormalizer["a" /* default */])(
  page_pageHeadvue_type_script_lang_js_,
  pageHeadvue_type_template_id_c753d96a_render,
  pageHeadvue_type_template_id_c753d96a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var pageHead = (pageHead_component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/page/pageBody.vue?vue&type=template&id=5851aa86&
var pageBodyvue_type_template_id_5851aa86_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-page-wrapper',[_c('uni-page-body',[_vm._t("default")],2)],1)}
var pageBodyvue_type_template_id_5851aa86_staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/components/page/pageBody.vue?vue&type=template&id=5851aa86&

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/page/pageBody.vue?vue&type=script&lang=js&
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
/* harmony default export */ var pageBodyvue_type_script_lang_js_ = ({
  name: 'PageBody'
});
// CONCATENATED MODULE: ./src/platforms/h5/components/page/pageBody.vue?vue&type=script&lang=js&
 /* harmony default export */ var page_pageBodyvue_type_script_lang_js_ = (pageBodyvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/platforms/h5/components/page/pageBody.vue?vue&type=style&index=0&lang=css&
var pageBodyvue_type_style_index_0_lang_css_ = __webpack_require__("167a");

// CONCATENATED MODULE: ./src/platforms/h5/components/page/pageBody.vue






/* normalize component */

var pageBody_component = Object(componentNormalizer["a" /* default */])(
  page_pageBodyvue_type_script_lang_js_,
  pageBodyvue_type_template_id_5851aa86_render,
  pageBodyvue_type_template_id_5851aa86_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var pageBody = (pageBody_component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/page/pageRefresh.vue?vue&type=template&id=4bdd5ddb&
var pageRefreshvue_type_template_id_4bdd5ddb_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-page-refresh',[_c('div',{staticClass:"uni-page-refresh",style:({'margin-top':_vm.offset+'px'})},[_c('div',{staticClass:"uni-page-refresh-inner"},[_c('svg',{staticClass:"uni-page-refresh__icon",attrs:{"fill":_vm.color,"width":"24","height":"24","viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"}}),_c('path',{attrs:{"d":"M0 0h24v24H0z","fill":"none"}})]),_c('svg',{staticClass:"uni-page-refresh__spinner",attrs:{"width":"24","height":"24","viewBox":"25 25 50 50"}},[_c('circle',{staticClass:"uni-page-refresh__path",attrs:{"stroke":_vm.color,"cx":"50","cy":"50","r":"20","fill":"none","stroke-width":"4","stroke-miterlimit":"10"}})])])])])}
var pageRefreshvue_type_template_id_4bdd5ddb_staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/components/page/pageRefresh.vue?vue&type=template&id=4bdd5ddb&

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/page/pageRefresh.vue?vue&type=script&lang=js&
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
/* harmony default export */ var pageRefreshvue_type_script_lang_js_ = ({
  name: 'PageRefresh',
  props: {
    color: {
      type: String,
      default: '#2BD009'
    },
    offset: {
      type: Number,
      default: 0
    }
  }
});
// CONCATENATED MODULE: ./src/platforms/h5/components/page/pageRefresh.vue?vue&type=script&lang=js&
 /* harmony default export */ var page_pageRefreshvue_type_script_lang_js_ = (pageRefreshvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/platforms/h5/components/page/pageRefresh.vue?vue&type=style&index=0&lang=css&
var pageRefreshvue_type_style_index_0_lang_css_ = __webpack_require__("9b5b");

// CONCATENATED MODULE: ./src/platforms/h5/components/page/pageRefresh.vue






/* normalize component */

var pageRefresh_component = Object(componentNormalizer["a" /* default */])(
  page_pageRefreshvue_type_script_lang_js_,
  pageRefreshvue_type_template_id_4bdd5ddb_render,
  pageRefreshvue_type_template_id_4bdd5ddb_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var pageRefresh = (pageRefresh_component.exports);
// EXTERNAL MODULE: ./src/platforms/h5/components/page/pull-to-refresh.js
var pull_to_refresh = __webpack_require__("be12");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/page/index.vue?vue&type=script&lang=js&
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







/* harmony default export */ var pagevue_type_script_lang_js_ = ({
  name: 'Page',
  mpType: 'page',
  components: {
    PageHead: pageHead,
    PageBody: pageBody,
    PageRefresh: pageRefresh
  },
  mixins: [pull_to_refresh["a" /* default */]],
  props: {
    isQuit: {
      type: Boolean,
      default: false
    },
    isEntry: {
      type: Boolean,
      default: false
    },
    isTabBar: {
      type: Boolean,
      default: false
    },
    tabBarIndex: {
      type: Number,
      default: -1
    },
    navigationBarBackgroundColor: {
      type: String,
      default: '#000'
    },
    navigationBarTextStyle: {
      default: 'white',
      validator: function validator(value) {
        return ['white', 'black'].indexOf(value) !== -1;
      }
    },
    navigationBarTitleText: {
      type: String,
      default: ''
    },
    navigationStyle: {
      default: 'default',
      validator: function validator(value) {
        return ['default', 'custom'].indexOf(value) !== -1;
      }
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    backgroundTextStyle: {
      default: 'dark',
      validator: function validator(value) {
        return ['dark', 'light'].indexOf(value) !== -1;
      }
    },
    backgroundColorTop: {
      type: String,
      default: '#fff'
    },
    backgroundColorBottom: {
      type: String,
      default: '#fff'
    },
    enablePullDownRefresh: {
      type: Boolean,
      default: false
    },
    onReachBottomDistance: {
      type: Number,
      default: 50
    },
    disableScroll: {
      type: Boolean,
      default: false
    },
    titleNView: {
      type: [Boolean, Object],
      default: true
    },
    pullToRefresh: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    var navigationBar = Object(patch["a" /* mergeTitleNView */])({
      loading: false,
      backButton: !this.isQuit && !this.$route.meta.isQuit,
      // redirectTo,reLaunch时可能动态修改 meta.isQuit
      backgroundColor: this.navigationBarBackgroundColor,
      textColor: this.navigationBarTextStyle === 'black' ? '#000' : '#fff',
      titleText: this.navigationBarTitleText,
      duration: '0',
      timingFunc: ''
    }, this.titleNView);
    var showNavigationBar = this.navigationStyle === 'default' && this.titleNView;
    var refreshOptions = Object.assign({
      support: true,
      color: '#2BD009',
      style: 'circle',
      height: 70,
      range: 150,
      offset: 0
    }, this.pullToRefresh);
    var offset = Object(helpers["d" /* upx2px */])(refreshOptions.offset);

    if (showNavigationBar) {
      if (!(this.titleNView && this.titleNView.type === 'transparent')) {
        offset += constants["a" /* NAVBAR_HEIGHT */];
      }
    }

    refreshOptions.offset = offset;
    refreshOptions.height = Object(helpers["d" /* upx2px */])(refreshOptions.height);
    refreshOptions.range = Object(helpers["d" /* upx2px */])(refreshOptions.range);
    return {
      showNavigationBar: showNavigationBar,
      navigationBar: navigationBar,
      refreshOptions: refreshOptions
    };
  },
  created: function created() {
    if (true) {
      document.title = this.navigationBar.titleText;
    }
  }
});
// CONCATENATED MODULE: ./src/platforms/h5/components/page/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_pagevue_type_script_lang_js_ = (pagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/platforms/h5/components/page/index.vue?vue&type=style&index=0&lang=css&
var pagevue_type_style_index_0_lang_css_ = __webpack_require__("6226");

// CONCATENATED MODULE: ./src/platforms/h5/components/page/index.vue






/* normalize component */

var page_component = Object(componentNormalizer["a" /* default */])(
  components_pagevue_type_script_lang_js_,
  pagevue_type_template_id_e0849642_render,
  pagevue_type_template_id_e0849642_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var page = (page_component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/async-error/index.vue?vue&type=template&id=6267753a&
var async_errorvue_type_template_id_6267753a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uni-async-error",on:{"click":_vm._onClick}},[_vm._v("\n  网络不给力，点击屏幕重试\n")])}
var async_errorvue_type_template_id_6267753a_staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/components/async-error/index.vue?vue&type=template&id=6267753a&

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/async-error/index.vue?vue&type=script&lang=js&
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
/* harmony default export */ var async_errorvue_type_script_lang_js_ = ({
  name: 'AsyncError',
  methods: {
    _onClick: function _onClick() {
      // TODO 临时采用 reload
      window.location.reload();
    }
  }
});
// CONCATENATED MODULE: ./src/platforms/h5/components/async-error/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_async_errorvue_type_script_lang_js_ = (async_errorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/platforms/h5/components/async-error/index.vue?vue&type=style&index=0&lang=css&
var async_errorvue_type_style_index_0_lang_css_ = __webpack_require__("b628");

// CONCATENATED MODULE: ./src/platforms/h5/components/async-error/index.vue






/* normalize component */

var async_error_component = Object(componentNormalizer["a" /* default */])(
  components_async_errorvue_type_script_lang_js_,
  async_errorvue_type_template_id_6267753a_render,
  async_errorvue_type_template_id_6267753a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var async_error = (async_error_component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/async-loading/index.vue?vue&type=template&id=0f738c76&
var async_loadingvue_type_template_id_0f738c76_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
var async_loadingvue_type_template_id_0f738c76_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uni-async-loading"},[_c('i',{staticClass:"uni-loading"})])}]


// CONCATENATED MODULE: ./src/platforms/h5/components/async-loading/index.vue?vue&type=template&id=0f738c76&

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/async-loading/index.vue?vue&type=script&lang=js&
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
/* harmony default export */ var async_loadingvue_type_script_lang_js_ = ({
  name: 'AsyncLoading'
});
// CONCATENATED MODULE: ./src/platforms/h5/components/async-loading/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_async_loadingvue_type_script_lang_js_ = (async_loadingvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/platforms/h5/components/async-loading/index.vue?vue&type=style&index=0&lang=css&
var async_loadingvue_type_style_index_0_lang_css_ = __webpack_require__("5727");

// CONCATENATED MODULE: ./src/platforms/h5/components/async-loading/index.vue






/* normalize component */

var async_loading_component = Object(componentNormalizer["a" /* default */])(
  components_async_loadingvue_type_script_lang_js_,
  async_loadingvue_type_template_id_0f738c76_render,
  async_loadingvue_type_template_id_0f738c76_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var async_loading = (async_loading_component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/system-routes/choose-location/index.vue?vue&type=template&id=241ec427&
var choose_locationvue_type_template_id_241ec427_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uni-system-choose-location"},[_c('system-header',{attrs:{"confirm":!!_vm.data},on:{"back":_vm._back,"confirm":_vm._choose}},[_vm._v("选择位置")]),_c('div',{staticClass:"map-content"},[_c('iframe',{attrs:{"src":_vm.src,"allow":"geolocation","seamless":"","sandbox":"allow-scripts allow-same-origin allow-forms","frameborder":"0"}})])],1)}
var choose_locationvue_type_template_id_241ec427_staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/components/system-routes/choose-location/index.vue?vue&type=template&id=241ec427&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/system-routes/choose-location/index.vue?vue&type=script&lang=js&
var choose_locationvue_type_script_lang_js_ = __webpack_require__("580e");

// CONCATENATED MODULE: ./src/platforms/h5/components/system-routes/choose-location/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var system_routes_choose_locationvue_type_script_lang_js_ = (choose_locationvue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./src/platforms/h5/components/system-routes/choose-location/index.vue?vue&type=style&index=0&lang=css&
var choose_locationvue_type_style_index_0_lang_css_ = __webpack_require__("9470");

// CONCATENATED MODULE: ./src/platforms/h5/components/system-routes/choose-location/index.vue






/* normalize component */

var choose_location_component = Object(componentNormalizer["a" /* default */])(
  system_routes_choose_locationvue_type_script_lang_js_,
  choose_locationvue_type_template_id_241ec427_render,
  choose_locationvue_type_template_id_241ec427_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var choose_location = (choose_location_component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/system-routes/open-location/index.vue?vue&type=template&id=00307146&
var open_locationvue_type_template_id_00307146_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uni-system-open-location"},[_c('system-header',{on:{"back":_vm._back}},[_vm._v("位置")]),_c('div',{staticClass:"map-content"},[_c('iframe',{ref:"map",attrs:{"src":_vm.src,"allow":"geolocation","sandbox":"allow-scripts allow-same-origin allow-forms allow-top-navigation allow-modals allow-popups","frameborder":"0"},on:{"load":_vm._load}}),(_vm.isPoimarkerSrc)?_c('div',{staticClass:"actTonav",on:{"click":_vm._nav}}):_vm._e()])],1)}
var open_locationvue_type_template_id_00307146_staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/components/system-routes/open-location/index.vue?vue&type=template&id=00307146&

// EXTERNAL MODULE: ./src/platforms/h5/components/system-routes/system-header.vue + 4 modules
var system_header = __webpack_require__("bab8");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/system-routes/open-location/index.vue?vue&type=script&lang=js&
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

var key = __uniConfig.qqMapKey;
var referer = 'uniapp';
var poimarkerSrc = 'https://apis.map.qq.com/tools/poimarker';
/* harmony default export */ var open_locationvue_type_script_lang_js_ = ({
  name: 'SystemOpenLocation',
  components: {
    SystemHeader: system_header["a" /* default */]
  },
  data: function data() {
    var _this$$route$query = this.$route.query,
        latitude = _this$$route$query.latitude,
        longitude = _this$$route$query.longitude,
        scale = _this$$route$query.scale,
        name = _this$$route$query.name,
        address = _this$$route$query.address;
    return {
      latitude: latitude,
      longitude: longitude,
      scale: scale,
      name: name,
      address: address,
      src: '',
      isPoimarkerSrc: false
    };
  },
  mounted: function mounted() {
    if (this.latitude && this.longitude) {
      this.src = "".concat(poimarkerSrc, "?type=0&marker=coord:").concat(this.latitude, ",").concat(this.longitude, ";title:").concat(this.name, ";addr:").concat(this.address, ";&key=").concat(key, "&referer=").concat(referer);
    }
  },
  methods: {
    _back: function _back() {
      if (this.$refs.map.src.indexOf(poimarkerSrc) !== 0) {
        this.$refs.map.src = this.src;
      } else {
        getApp().$router.back();
      }
    },
    _load: function _load() {
      if (this.$refs.map.src.indexOf(poimarkerSrc) === 0) {
        this.isPoimarkerSrc = true;
      } else {
        this.isPoimarkerSrc = false;
      }
    },
    _nav: function _nav() {
      var url = "https://apis.map.qq.com/uri/v1/routeplan?type=drive&to=".concat(encodeURIComponent(this.name), "&tocoord=").concat(this.latitude, ",").concat(this.longitude, "&referer=").concat(referer);
      this.$refs.map.src = url;
    }
  }
});
// CONCATENATED MODULE: ./src/platforms/h5/components/system-routes/open-location/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var system_routes_open_locationvue_type_script_lang_js_ = (open_locationvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/platforms/h5/components/system-routes/open-location/index.vue?vue&type=style&index=0&lang=css&
var open_locationvue_type_style_index_0_lang_css_ = __webpack_require__("3da9");

// CONCATENATED MODULE: ./src/platforms/h5/components/system-routes/open-location/index.vue






/* normalize component */

var open_location_component = Object(componentNormalizer["a" /* default */])(
  system_routes_open_locationvue_type_script_lang_js_,
  open_locationvue_type_template_id_00307146_render,
  open_locationvue_type_template_id_00307146_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var open_location = (open_location_component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/system-routes/preview-image/index.vue?vue&type=template&id=308eb38c&
var preview_imagevue_type_template_id_308eb38c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uni-system-preview-image",on:{"click":_vm._click}},[_c('v-uni-swiper',{staticClass:"uni-swiper",attrs:{"current":_vm.index,"indicator-dots":false,"autoplay":false},on:{"update:current":function($event){_vm.index=$event}}},_vm._l((_vm.urls),function(src,index){return _c('v-uni-swiper-item',{key:index},[_c('img',{staticClass:"uni-preview-image",attrs:{"src":src}})])}),1)],1)}
var preview_imagevue_type_template_id_308eb38c_staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/components/system-routes/preview-image/index.vue?vue&type=template&id=308eb38c&

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/system-routes/preview-image/index.vue?vue&type=script&lang=js&
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
/* harmony default export */ var preview_imagevue_type_script_lang_js_ = ({
  name: 'SystemPreviewImage',
  data: function data() {
    var _this$$route$params = this.$route.params,
        urls = _this$$route$params.urls,
        current = _this$$route$params.current;
    return {
      urls: urls || [],
      current: current,
      index: 0
    };
  },
  created: function created() {
    var index = typeof this.current === 'number' ? this.current : this.urls.indexOf(this.current);
    this.index = index < 0 ? 0 : index;
  },
  methods: {
    _click: function _click() {
      getApp().$router.back();
    }
  }
});
// CONCATENATED MODULE: ./src/platforms/h5/components/system-routes/preview-image/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var system_routes_preview_imagevue_type_script_lang_js_ = (preview_imagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/platforms/h5/components/system-routes/preview-image/index.vue?vue&type=style&index=0&lang=css&
var preview_imagevue_type_style_index_0_lang_css_ = __webpack_require__("f10e");

// CONCATENATED MODULE: ./src/platforms/h5/components/system-routes/preview-image/index.vue






/* normalize component */

var preview_image_component = Object(componentNormalizer["a" /* default */])(
  system_routes_preview_imagevue_type_script_lang_js_,
  preview_imagevue_type_template_id_308eb38c_render,
  preview_imagevue_type_template_id_308eb38c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var preview_image = (preview_image_component.exports);
// CONCATENATED MODULE: ./src/platforms/h5/components/index.js








external_commonjs_vue_commonjs2_vue_root_Vue_default.a.component(app.name, app);
external_commonjs_vue_commonjs2_vue_root_Vue_default.a.component(page.name, page);
external_commonjs_vue_commonjs2_vue_root_Vue_default.a.component(async_error.name, async_error);
external_commonjs_vue_commonjs2_vue_root_Vue_default.a.component(async_loading.name, async_loading);
external_commonjs_vue_commonjs2_vue_root_Vue_default.a.component(choose_location.name, choose_location);
external_commonjs_vue_commonjs2_vue_root_Vue_default.a.component(open_location.name, open_location);
external_commonjs_vue_commonjs2_vue_root_Vue_default.a.component(preview_image.name, preview_image);

/***/ }),

/***/ "8ffa":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "90c9":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "91b0":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "91ce":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9213":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/swiper-item/index.vue?vue&type=template&id=0f3f3e84&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-swiper-item',_vm._g({},_vm.$listeners),[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/swiper-item/index.vue?vue&type=template&id=0f3f3e84&

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/swiper-item/index.vue?vue&type=script&lang=js&
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
var swiper_itemvue_type_style_index_0_lang_css_ = __webpack_require__("bfea");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var swiper_item = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "924c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAudioContext", function() { return createAudioContext; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function operateAudioPlayer(audioId, pageId, type, data) {
  UniServiceJSBridge.publishHandler(pageId + '-audio-' + audioId, {
    audioId: audioId,
    type: type,
    data: data
  }, pageId);
}

var AudioContext =
/*#__PURE__*/
function () {
  function AudioContext(id, pageId) {
    _classCallCheck(this, AudioContext);

    this.id = id;
    this.pageId = pageId;
  }

  _createClass(AudioContext, [{
    key: "setSrc",
    value: function setSrc(src) {
      operateAudioPlayer(this.id, this.pageId, 'setSrc', {
        src: src
      });
    }
  }, {
    key: "play",
    value: function play() {
      operateAudioPlayer(this.id, this.pageId, 'play');
    }
  }, {
    key: "pause",
    value: function pause() {
      operateAudioPlayer(this.id, this.pageId, 'pause');
    }
  }, {
    key: "stop",
    value: function stop() {
      operateAudioPlayer(this.id, this.pageId, 'stop');
    }
  }, {
    key: "seek",
    value: function seek(position) {
      operateAudioPlayer(this.id, this.pageId, 'seek', {
        position: position
      });
    }
  }]);

  return AudioContext;
}();

function createAudioContext(id, context) {
  if (context) {
    return new AudioContext(id, context.$page.id);
  }

  var app = getApp();

  if (app.$route && app.$route.params.__id__) {
    return new AudioContext(id, app.$route.params.__id__);
  } else {
    UniServiceJSBridge.emit('onError', 'createAudioContext:fail');
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "93a5":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./audio/index.vue": "e0b6",
	"./cover-image/index.vue": "d677",
	"./cover-view/index.vue": "c41f",
	"./map/index.vue": "594d",
	"./video/index.vue": "31e2",
	"./web-view/index.vue": "9980"
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
webpackContext.id = "93a5";

/***/ }),

/***/ "9400":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8ffa");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "944e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("aa36");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "9470":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6a87");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "9613":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "98be":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/core/helpers/apis.js
var base = ['base64ToArrayBuffer', 'arrayBufferToBase64'];
var network = ['request', 'uploadFile', 'downloadFile', 'connectSocket', 'onSocketOpen', 'onSocketError', 'sendSocketMessage', 'onSocketMessage', 'closeSocket', 'onSocketClose'];
var route = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab', 'navigateBack'];
var storage = ['setStorage', 'setStorageSync', 'getStorage', 'getStorageSync', 'getStorageInfo', 'getStorageInfoSync', 'removeStorage', 'removeStorageSync', 'clearStorage', 'clearStorageSync'];
var apis_location = ['getLocation', 'chooseLocation', 'openLocation', 'createMapContext'];
var media = ['chooseImage', 'previewImage', 'getImageInfo', 'saveImageToPhotosAlbum', 'compressImage', 'chooseMessageFile', 'getRecorderManager', 'getBackgroundAudioManager', 'createInnerAudioContext', 'chooseVideo', 'saveVideoToPhotosAlbum', 'createVideoContext', 'createCameraContext', 'createLivePlayerContext'];
var device = ['getSystemInfo', 'getSystemInfoSync', 'canIUse', 'onMemoryWarning', 'getNetworkType', 'onNetworkStatusChange', 'onAccelerometerChange', 'startAccelerometer', 'stopAccelerometer', 'onCompassChange', 'startCompass', 'stopCompass', 'onGyroscopeChange', 'startGyroscope', 'stopGyroscope', 'makePhoneCall', 'scanCode', 'setClipboardData', 'getClipboardData', 'setScreenBrightness', 'getScreenBrightness', 'setKeepScreenOn', 'onUserCaptureScreen', 'vibrateLong', 'vibrateShort', 'addPhoneContact', 'openBluetoothAdapter', 'startBluetoothDevicesDiscovery', 'onBluetoothDeviceFound', 'stopBluetoothDevicesDiscovery', 'onBluetoothAdapterStateChange', 'getConnectedBluetoothDevices', 'getBluetoothDevices', 'getBluetoothAdapterState', 'closeBluetoothAdapter', 'writeBLECharacteristicValue', 'readBLECharacteristicValue', 'onBLEConnectionStateChange', 'onBLECharacteristicValueChange', 'notifyBLECharacteristicValueChange', 'getBLEDeviceServices', 'getBLEDeviceCharacteristics', 'createBLEConnection', 'closeBLEConnection', 'onBeaconServiceChange', 'onBeaconUpdate', 'getBeacons', 'startBeaconDiscovery', 'stopBeaconDiscovery'];
var keyboard = ['hideKeyboard'];
var ui = ['showToast', 'hideToast', 'showLoading', 'hideLoading', 'showModal', 'showActionSheet', 'setNavigationBarTitle', 'setNavigationBarColor', 'showNavigationBarLoading', 'hideNavigationBarLoading', 'setTabBarItem', 'setTabBarStyle', 'hideTabBar', 'showTabBar', 'setTabBarBadge', 'removeTabBarBadge', 'showTabBarRedDot', 'hideTabBarRedDot', 'setBackgroundColor', 'setBackgroundTextStyle', 'createAnimation', 'pageScrollTo', 'onWindowResize', 'offWindowResize', 'loadFontFace', 'startPullDownRefresh', 'stopPullDownRefresh', 'createSelectorQuery', 'createIntersectionObserver'];
var apis_event = ['$emit', '$on', '$once', '$off'];
var file = ['saveFile', 'getSavedFileList', 'getSavedFileInfo', 'removeSavedFile', 'getFileInfo', 'openDocument', 'getFileSystemManager'];
var canvas = ['createOffscreenCanvas', 'createCanvasContext', 'canvasToTempFilePath', 'canvasPutImageData', 'canvasGetImageData'];
var third = ['getProvider', 'login', 'checkSession', 'getUserInfo', 'share', 'showShareMenu', 'hideShareMenu', 'requestPayment', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'requireNativePlugin', 'upx2px'];
var apis = [].concat(base, network, route, storage, apis_location, media, device, keyboard, ui, apis_event, file, canvas, third);
/* harmony default export */ var helpers_apis = (apis);
// EXTERNAL MODULE: ./src/core/helpers/api.js
var api = __webpack_require__("27a7");

// EXTERNAL MODULE: ./src/core/helpers/promise.js
var promise = __webpack_require__("ed1a");

// CONCATENATED MODULE: ./src/core/service/uni.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return uni; });
/* unused harmony export invokeMethod */



var uni_api = Object.create(null);
var uni = Object.create(null);

var baseApis = __webpack_require__("bdb1");

baseApis.keys().forEach(function (key) {
  Object.assign(uni_api, baseApis(key));
});

var platformApis = __webpack_require__("e3a7");

platformApis.keys().forEach(function (key) {
  Object.assign(uni_api, platformApis(key));
});
/* eslint-disable no-undef */

uni.version = "0.0.1";
helpers_apis.forEach(function (name) {
  if (uni_api[name]) {
    uni[name] = Object(promise["d" /* promisify */])(name, Object(api["b" /* wrapper */])(name, uni_api[name]));
  } else {
    uni[name] = Object(api["c" /* wrapperUnimplemented */])(name);
  }
});
function invokeMethod(name) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return uni_api[name].apply(uni_api, args);
}

/***/ }),

/***/ "9980":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/view/components/web-view/index.vue?vue&type=template&id=22bfa9c5&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-web-view')}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/view/components/web-view/index.vue?vue&type=template&id=22bfa9c5&

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/view/components/web-view/index.vue?vue&type=script&lang=js&
//
//
//
/* harmony default export */ var web_viewvue_type_script_lang_js_ = ({
  name: 'WebView',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  watch: {
    src: function src(val, oldVal) {
      this.iframe && (this.iframe.src = this.$getRealPath(this.src));
    }
  },
  mounted: function mounted() {
    var _this$$el$getBounding = this.$el.getBoundingClientRect(),
        top = _this$$el$getBounding.top,
        bottom = _this$$el$getBounding.bottom,
        width = _this$$el$getBounding.width,
        height = _this$$el$getBounding.height;

    this.iframe = document.createElement('iframe');
    this.iframe.style.position = 'absolute';
    this.iframe.style.display = 'block';
    this.iframe.style.border = 0;
    this.iframe.style.top = top + 'px';
    this.iframe.style.bottom = bottom + 'px';
    this.iframe.style.width = width + 'px';
    this.iframe.style.height = height + 'px';
    this.iframe.src = this.$getRealPath(this.src);
    document.body.appendChild(this.iframe);
  },
  activated: function activated() {
    this.iframe.style.display = 'block';
  },
  deactivated: function deactivated() {
    this.iframe.style.display = 'none';
  },
  beforeDestroy: function beforeDestroy() {
    document.body.removeChild(this.iframe);
  }
});
// CONCATENATED MODULE: ./src/platforms/h5/view/components/web-view/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_web_viewvue_type_script_lang_js_ = (web_viewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/platforms/h5/view/components/web-view/index.vue?vue&type=style&index=0&lang=css&
var web_viewvue_type_style_index_0_lang_css_ = __webpack_require__("c33f");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

// CONCATENATED MODULE: ./src/platforms/h5/view/components/web-view/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_web_viewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var web_view = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "9a3e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uploadFile", function() { return uploadFile; });
/* harmony import */ var uni_platform_helpers_get_real_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cb0f");

var uploadFile = {
  url: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true,
    validator: function validator(value, params) {
      params.type = Object(uni_platform_helpers_get_real_path__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(value);
    }
  },
  name: {
    type: String,
    required: true
  },
  header: {
    type: Object,
    validator: function validator(value, params) {
      params.header = value || {};
    }
  },
  formData: {
    type: Object,
    validator: function validator(value, params) {
      params.formData = value || {};
    }
  }
};

/***/ }),

/***/ "9a72":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9b1f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/progress/index.vue?vue&type=template&id=280c29f5&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-progress',_vm._g({staticClass:"uni-progress"},_vm.$listeners),[_c('div',{staticClass:"uni-progress-bar",style:(_vm.outerBarStyle)},[_c('div',{staticClass:"uni-progress-inner-bar",style:(_vm.innerBarStyle)})]),(_vm.showInfo)?[_c('p',{staticClass:"uni-progress-info"},[_vm._v(_vm._s(_vm.currentPercent)+"%")])]:_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/progress/index.vue?vue&type=template&id=280c29f5&

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/progress/index.vue?vue&type=script&lang=js&
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
var progressvue_type_style_index_0_lang_css_ = __webpack_require__("944e");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var progress = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "9b5b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_pageRefresh_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f8d2");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_pageRefresh_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_pageRefresh_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_pageRefresh_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "9c38":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onWindowResize", function() { return onWindowResize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "offWindowResize", function() { return offWindowResize; });
var callbacks = [];
var tasks = [];

function onResize() {
  tasks.push(setTimeout(function () {
    tasks.forEach(function (task) {
      return clearTimeout(task);
    });
    tasks.length = 0;
    var _UniServiceJSBridge = UniServiceJSBridge,
        invoke = _UniServiceJSBridge.invokeCallbackHandler;

    var _uni$getSystemInfoSyn = uni.getSystemInfoSync(),
        windowWidth = _uni$getSystemInfoSyn.windowWidth,
        windowHeight = _uni$getSystemInfoSyn.windowHeight,
        screenWidth = _uni$getSystemInfoSyn.screenWidth,
        screenHeight = _uni$getSystemInfoSyn.screenHeight;

    var landscape = Math.abs(window.orientation) === 90;
    var deviceOrientation = landscape ? 'landscape' : 'portrait';
    callbacks.forEach(function (callbackId) {
      invoke(callbackId, {
        deviceOrientation: deviceOrientation,
        size: {
          windowWidth: windowWidth,
          windowHeight: windowHeight,
          screenWidth: screenWidth,
          screenHeight: screenHeight
        }
      });
    });
  }, 20));
}
/**
 * 监听窗口大小变化
 * @param {*} callbackId
 */


function onWindowResize(callbackId) {
  if (!callbacks.length) {
    window.addEventListener('resize', onResize);
  }

  callbacks.push(callbackId);
}
/**
 * 取消监听窗口大小变化
 * @param {*} callbackId
 */

function offWindowResize(callbackId) {
  // 此处和微信平台一致查询不到去掉最后一个
  callbacks.splice(callbacks.indexOf(callbackId), 1);

  if (!callbacks.length) {
    window.removeEventListener('resize', onResize);
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "9e56":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "previewImage", function() { return previewImage; });
function previewImage(_ref, callbackId) {
  var urls = _ref.urls,
      current = _ref.current;
  var _UniServiceJSBridge = UniServiceJSBridge,
      invoke = _UniServiceJSBridge.invokeCallbackHandler;
  getApp().$router.push({
    type: 'navigateTo',
    path: '/preview-image',
    params: {
      urls: urls,
      current: current
    }
  }, function () {
    invoke(callbackId, {
      errMsg: 'previewImage:ok'
    });
  }, function () {
    invoke(callbackId, {
      errMsg: 'previewImage:fail'
    });
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "9eba":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageScrollTo", function() { return pageScrollTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPullDownRefreshPageId", function() { return setPullDownRefreshPageId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startPullDownRefresh", function() { return startPullDownRefresh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopPullDownRefresh", function() { return stopPullDownRefresh; });
function pageScrollTo(args) {
  var pages = getCurrentPages();

  if (pages.length) {
    UniServiceJSBridge.publishHandler('pageScrollTo', args, pages[pages.length - 1].$page.id);
  }

  return {};
}
var pageId;
function setPullDownRefreshPageId(pullDownRefreshPageId) {
  pageId = pullDownRefreshPageId;
}
function startPullDownRefresh() {
  if (pageId) {
    UniServiceJSBridge.emit(pageId + '.stopPullDownRefresh', {}, pageId);
  }

  var pages = getCurrentPages();

  if (pages.length) {
    pageId = pages[pages.length - 1].$page.id;
    UniServiceJSBridge.emit(pageId + '.startPullDownRefresh', {}, pageId);
  }

  return {};
}
function stopPullDownRefresh() {
  if (pageId) {
    UniServiceJSBridge.emit(pageId + '.stopPullDownRefresh', {}, pageId);
    pageId = null;
  } else {
    var pages = getCurrentPages();

    if (pages.length) {
      pageId = pages[pages.length - 1].$page.id;
      UniServiceJSBridge.emit(pageId + '.stopPullDownRefresh', {}, pageId);
    }
  }

  return {};
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "9f96":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/slider/index.vue?vue&type=template&id=240ac1f5&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-slider',_vm._g({ref:"uni-slider",on:{"click":_vm._onClick}},_vm.$listeners),[_c('div',{staticClass:"uni-slider-wrapper"},[_c('div',{staticClass:"uni-slider-tap-area"},[_c('div',{staticClass:"uni-slider-handle-wrapper",style:(_vm.setBgColor)},[_c('div',{ref:"uni-slider-handle",staticClass:"uni-slider-handle",style:(_vm.setBlockBg)}),_c('div',{staticClass:"uni-slider-thumb",style:(_vm.setBlockStyle)}),_c('div',{staticClass:"uni-slider-track",style:(_vm.setActiveColor)})])]),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.showValue),expression:"showValue"}],staticClass:"uni-slider-value"},[_vm._v(_vm._s(_vm.sliderValue))])]),_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/slider/index.vue?vue&type=template&id=240ac1f5&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__("8af1");

// EXTERNAL MODULE: ./src/core/view/mixins/touchtrack.js
var touchtrack = __webpack_require__("ba15");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/slider/index.vue?vue&type=script&lang=js&
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
var slidervue_type_style_index_0_lang_css_ = __webpack_require__("6428");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var slider = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "9fe6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return requestComponentInfo; });
/* harmony import */ var uni_helpers_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("85b6");
/* harmony import */ var uni_platform_helpers_get_window_offset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("a470");



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
    info.dataset = Object(uni_helpers_index__WEBPACK_IMPORTED_MODULE_0__[/* normalizeDataset */ "c"])(el.dataset || {});
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("501c")))

/***/ }),

/***/ "9fef":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAudioContext", function() { return createAudioContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createVideoContext", function() { return createVideoContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMapContext", function() { return createMapContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCanvasContext", function() { return createCanvasContext; });
var validator = [{
  name: 'id',
  type: String,
  required: true
}];
var createAudioContext = validator;
var createVideoContext = validator;
var createMapContext = validator;
var createCanvasContext = [{
  name: 'canvasId',
  type: String,
  required: true
}, {
  name: 'componentInstance',
  type: Object
}];

/***/ }),

/***/ "a041":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvasGetImageData", function() { return canvasGetImageData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvasPutImageData", function() { return canvasPutImageData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvasToTempFilePath", function() { return canvasToTempFilePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawCanvas", function() { return drawCanvas; });
function getInt(method) {
  return function (value, params) {
    if (value) {
      params[method] = Math.round(value);
    }
  };
}

var canvasGetImageData = {
  canvasId: {
    type: String,
    required: true
  },
  x: {
    type: Number,
    required: true,
    validator: getInt('x')
  },
  y: {
    type: Number,
    required: true,
    validator: getInt('y')
  },
  width: {
    type: Number,
    required: true,
    validator: getInt('width')
  },
  height: {
    type: Number,
    required: true,
    validator: getInt('height')
  }
};
var canvasPutImageData = {
  canvasId: {
    type: String,
    required: true
  },
  data: {
    type: Uint8ClampedArray,
    required: true
  },
  x: {
    type: Number,
    required: true,
    validator: getInt('x')
  },
  y: {
    type: Number,
    required: true,
    validator: getInt('y')
  },
  width: {
    type: Number,
    required: true,
    validator: getInt('width')
  },
  height: {
    type: Number,
    validator: getInt('height')
  }
};
var fileType = {
  PNG: 'png',
  JPG: 'jpeg'
};
var canvasToTempFilePath = {
  x: {
    type: Number,
    default: 0,
    validator: getInt('x')
  },
  y: {
    type: Number,
    default: 0,
    validator: getInt('y')
  },
  width: {
    type: Number,
    validator: getInt('width')
  },
  height: {
    type: Number,
    validator: getInt('height')
  },
  destWidth: {
    type: Number,
    validator: getInt('destWidth')
  },
  destHeight: {
    type: Number,
    validator: getInt('destHeight')
  },
  canvasId: {
    type: String,
    require: true
  },
  fileType: {
    type: String,
    validator: function validator(value, params) {
      value = (value || '').toUpperCase();
      params.fileType = value in fileType ? fileType[value] : fileType.PNG;
    }
  },
  quality: {
    type: Number,
    validator: function validator(value, params) {
      value = Math.floor(value);
      params.quality = value > 0 && value < 1 ? value : 1;
    }
  }
};
var drawCanvas = {
  canvasId: {
    type: String,
    require: true
  },
  actions: {
    type: Array,
    require: true
  },
  reserve: {
    type: Boolean,
    default: false
  }
};

/***/ }),

/***/ "a180":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAnimation", function() { return createAnimation; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultOption = {
  duration: 400,
  timingFunction: 'linear',
  delay: 0,
  transformOrigin: '50% 50% 0'
};

var MPAnimation =
/*#__PURE__*/
function () {
  function MPAnimation(option) {
    _classCallCheck(this, MPAnimation);

    this.actions = [];
    this.currentTransform = {};
    this.currentStepAnimates = [];
    this.option = Object.assign({}, defaultOption, option);
  }

  _createClass(MPAnimation, [{
    key: "_getOption",
    value: function _getOption(option) {
      var _option = {
        transition: Object.assign({}, this.option, option)
      };
      _option.transformOrigin = _option.transition.transformOrigin;
      delete _option.transition.transformOrigin;
      return _option;
    }
  }, {
    key: "_pushAnimates",
    value: function _pushAnimates(type, args) {
      this.currentStepAnimates.push({
        type: type,
        args: args
      });
    }
  }, {
    key: "_converType",
    value: function _converType(type) {
      return type.replace(/[A-Z]/g, function (text) {
        return "-".concat(text.toLowerCase());
      });
    }
  }, {
    key: "_getValue",
    value: function _getValue(value) {
      return typeof value === 'number' ? "".concat(value, "px") : value;
    }
  }, {
    key: "export",
    value: function _export() {
      var actions = this.actions;
      this.actions = [];
      return {
        actions: actions
      };
    }
  }, {
    key: "step",
    value: function step(option) {
      var _this = this;

      this.currentStepAnimates.forEach(function (animate) {
        if (animate.type !== 'style') {
          _this.currentTransform[animate.type] = animate;
        } else {
          _this.currentTransform["".concat(animate.type, ".").concat(animate.args[0])] = animate;
        }
      });
      this.actions.push({
        animates: Object.values(this.currentTransform),
        option: this._getOption(option)
      });
      this.currentStepAnimates = [];
      return this;
    }
  }]);

  return MPAnimation;
}();

var animateTypes1 = ['matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate', 'translate3d', 'translateX', 'translateY', 'translateZ'];
var animateTypes2 = ['opacity', 'backgroundColor'];
var animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
animateTypes1.concat(animateTypes2, animateTypes3).forEach(function (type) {
  MPAnimation.prototype[type] = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (animateTypes2.concat(animateTypes3).includes(type)) {
      this._pushAnimates('style', [this._converType(type), animateTypes3.includes(type) ? this._getValue(args[0]) : args[0]]);
    } else {
      this._pushAnimates(type, args);
    }

    return this;
  };
});
function createAnimation(option) {
  return new MPAnimation(option);
}

/***/ }),

/***/ "a1e3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "a201":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "request", function() { return request; });
var method = {
  OPTIONS: 'OPTIONS',
  GET: 'GET',
  HEAD: 'HEAD',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  TRACE: 'TRACE',
  CONNECT: 'CONNECT'
};
var dataType = {
  JSON: 'JSON'
};
var responseType = {
  TEXT: 'TEXT',
  ARRAYBUFFER: 'ARRAYBUFFER'
};
var request = {
  url: {
    type: String,
    required: true
  },
  data: {
    type: [Object, String, ArrayBuffer],
    validator: function validator(value, params) {
      params.data = value || '';
    }
  },
  header: {
    type: Object,
    validator: function validator(value, params) {
      params.header = value || {};
    }
  },
  method: {
    type: String,
    validator: function validator(value, params) {
      value = (value || '').toUpperCase();
      params.method = Object.values(method).indexOf(value) < 0 ? method.GET : value;
    }
  },
  dataType: {
    type: String,
    validator: function validator(value, params) {
      params.dataType = (value || dataType.JSON).toUpperCase();
    }
  },
  responseType: {
    type: String,
    validator: function validator(value, params) {
      value = (value || '').toUpperCase();
      params.responseType = Object.values(responseType).indexOf(value) < 0 ? responseType.TEXT : value;
    }
  }
};

/***/ }),

/***/ "a20f":
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
  canvas.style.height = canvas.height + 'px';
  canvas.style.width = canvas.width + 'px';
  canvas.width *= pixelRatio;
  canvas.height *= pixelRatio;
  canvas.getContext('2d').__hidpi__ = true;
}

/***/ }),

/***/ "a3e5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("488c");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "a470":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getWindowOffset; });
/* harmony import */ var uni_helpers_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("65a8");

function getWindowOffset() {
  if (uni.canIUse('css.var')) {
    var style = document.documentElement.style;
    return {
      top: parseInt(style.getPropertyValue('--window-top')) || 0,
      bottom: parseInt(style.getPropertyValue('--window-bottom')) || 0
    };
  }

  var top = 0;
  var bottom = 0;
  var pages = getCurrentPages();

  if (pages.length) {
    var pageVm = pages[pages.length - 1].$parent.$parent;
    top = pageVm.showNavigationBar && pageVm.navigationBar.type !== 'transparent' ? uni_helpers_constants__WEBPACK_IMPORTED_MODULE_0__[/* NAVBAR_HEIGHT */ "a"] : 0;
  }

  var app = getApp();

  if (app) {
    bottom = app.$children[0] && app.$children[0].showTabBar ? uni_helpers_constants__WEBPACK_IMPORTED_MODULE_0__[/* TABBAR_HEIGHT */ "b"] : 0;
  }

  return {
    top: top,
    bottom: bottom
  };
}

/***/ }),

/***/ "a5ec":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cee1");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "a741":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console, UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return callAppHook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return callPageHook; });
function callHook(vm, hook, params) {
  return (vm.$vm || vm).__call_hook(hook, params);
}

function callAppHook(vm, hook, params) {
  if (hook !== 'onError') {
    console.debug("App\uFF1A".concat(hook, " have been invoked") + (params ? " ".concat(JSON.stringify(params)) : ''));
  }

  return (vm.$vm || vm).__call_hook(hook, params);
}
function callPageHook(vm, hook, params) {
  // hack 一下，H5 平台通知 View 层onShow，方便 View 层来切换 scroll 事件监听
  if (true) {
    if (hook === 'onLoad') {
      vm.$mp.query = params;
      UniServiceJSBridge.publishHandler('onPageLoad', vm, vm.$page.id);
    }

    if (hook === 'onShow') {
      if (vm.$route.meta.isTabBar && vm.$route.params.detail) {
        UniServiceJSBridge.emit('onTabItemTap', vm.$route.params.detail);
      }

      UniServiceJSBridge.publishHandler('onPageShow', vm, vm.$page.id);
    }
  }

  if (hook !== 'onPageScroll') {
    console.debug("".concat(vm.$page.route, "[").concat(vm.$page.id, "]\uFF1A").concat(hook, " have been invoked"));
  }

  return callHook(vm, hook, params);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3ad9")["default"], __webpack_require__("0dd1")))

/***/ }),

/***/ "a897":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "a8fd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64ToArrayBuffer", function() { return base64ToArrayBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayBufferToBase64", function() { return arrayBufferToBase64; });
var base64ToArrayBuffer = [{
  name: 'base64',
  type: String,
  required: true
}];
var arrayBufferToBase64 = [{
  name: 'arrayBuffer',
  type: [ArrayBuffer, Uint8Array],
  required: true
}];

/***/ }),

/***/ "aa36":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "aa92":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return lifecycleMixin; });
/* @flow */
var LIFECYCLE_HOOKS = [// App
'onLaunch', 'onShow', 'onHide', 'onUniNViewMessage', 'onError', // Page
'onLoad', // 'onShow',
'onReady', // 'onHide',
'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onTabItemTap', 'onShareAppMessage', 'onResize', 'onPageScroll', 'onNavigationBarButtonTap', 'onBackPress', 'onNavigationBarSearchInputChanged', 'onNavigationBarSearchInputConfirmed', 'onNavigationBarSearchInputClicked', // Component
// 'onReady', // 兼容旧版本，应该移除该事件
'onPageShow', 'onPageHide', 'onPageResize'];
function lifecycleMixin(Vue) {
  // fixed vue-class-component
  var oldExtend = Vue.extend;

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var methods = extendOptions.methods;

    if (methods) {
      Object.keys(methods).forEach(function (methodName) {
        if (LIFECYCLE_HOOKS.indexOf(methodName) !== -1) {
          extendOptions[methodName] = methods[methodName];
          delete methods[methodName];
        }
      });
    }

    return oldExtend.call(this, extendOptions);
  };

  var strategies = Vue.config.optionMergeStrategies;
  var mergeHook = strategies.created;
  LIFECYCLE_HOOKS.forEach(function (hook) {
    strategies[hook] = mergeHook;
  });
}

/***/ }),

/***/ "ab76":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony import */ var uni_mixins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8af1");
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("501c")))

/***/ }),

/***/ "abb2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connectSocket", function() { return connectSocket; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendSocketMessage", function() { return sendSocketMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeSocket", function() { return closeSocket; });
var method = {
  OPTIONS: 'OPTIONS',
  GET: 'GET',
  HEAD: 'HEAD',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  TRACE: 'TRACE',
  CONNECT: 'CONNECT'
};
var connectSocket = {
  url: {
    type: String,
    required: true
  },
  header: {
    type: Object,
    validator: function validator(value, params) {
      params.header = value || {};
    }
  },
  method: {
    type: String,
    validator: function validator(value, params) {
      value = (value || '').toUpperCase();
      params.method = Object.values(method).indexOf(value) < 0 ? method.GET : value;
    }
  },
  protocols: {
    type: Array,
    validator: function validator(value, params) {
      params.protocols = (value || []).filter(function (str) {
        return typeof str === 'string';
      });
    }
  }
};
var sendSocketMessage = {
  data: {
    type: [String, ArrayBuffer]
  }
};
var closeSocket = {
  code: {
    type: Number
  },
  reason: {
    type: String
  }
};

/***/ }),

/***/ "abbf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createAppMixin; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a741");
/* harmony import */ var _create_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1164");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _create_app__WEBPACK_IMPORTED_MODULE_1__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _create_app__WEBPACK_IMPORTED_MODULE_1__["c"]; });




function createAppMixin(routes, entryRoute) {
  return {
    created: function AppCreated() {
      Object(_create_app__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(this, routes); // TODO

      if (!entryRoute.meta.name) {
        // PageNotFound
        UniServiceJSBridge.emit('onPageNotFound', {
          path: entryRoute.path,
          query: entryRoute.query,
          isEntryPage: true
        }); // TODO 跳转至缺省404页面
      }
    },
    beforeMount: function appBeforeMount() {
      // TODO 平台代码
      this.$el = document.getElementById('app');
    },
    mounted: function appMounted() {
      // 稍微靠后点，让 App 有机会在 mounted 事件前注册一些全局事件监听，如 UI 显示(showModal)
      var args = {
        path: this.$route.meta && this.$route.meta.pagePath,
        query: this.$route.query,
        scene: 1001
      };
      Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* callAppHook */ "a"])(this, 'onLaunch', args);
      Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* callAppHook */ "a"])(this, 'onShow', args);
    }
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "ac9d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "adb0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony import */ var uni_platform_helpers_append_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e949");
/* harmony import */ var uni_platform_helpers_get_real_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cb0f");
/* harmony import */ var _transparent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("15bb");
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



var FONTS = {
  forward: '&#xe600;',
  back: '&#xe601;',
  share: '&#xe602;',
  favorite: '&#xe604;',
  home: '&#xe605;',
  menu: '&#xe606;',
  close: '&#xe650;'
};
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'PageHead',
  mixins: [_transparent__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]],
  props: {
    backButton: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: '#000'
    },
    textColor: {
      type: String,
      default: '#fff'
    },
    titleText: {
      type: String,
      default: ''
    },
    duration: {
      type: String,
      default: '0'
    },
    timingFunc: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    titleSize: {
      type: String,
      default: '16px'
    },
    type: {
      default: 'default',
      validator: function validator(value) {
        return ['default', 'transparent'].indexOf(value) !== -1;
      }
    },
    coverage: {
      type: String,
      default: '132px'
    },
    buttons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    searchInput: {
      type: [Object, Boolean],
      default: function _default() {
        return false;
      }
    }
  },
  data: function data() {
    return {
      focus: false,
      text: '',
      composing: false
    };
  },
  computed: {
    btns: function btns() {
      var _this = this;

      var btns = [];
      var fonts = {};

      if (this.buttons.length) {
        this.buttons.forEach(function (button) {
          var btn = Object.assign({}, button);

          if (btn.fontSrc && !btn.fontFamily) {
            var fontSrc = btn.fontSrc = Object(uni_platform_helpers_get_real_path__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(btn.fontSrc);
            var fontFamily;

            if (fontSrc in fonts) {
              fontFamily = fonts[fontSrc];
            } else {
              fontFamily = "font".concat(Date.now());
              fonts[fontSrc] = fontFamily;
              var cssText = "@font-face{font-family: \"".concat(fontFamily, "\";src: url(\"").concat(fontSrc, "\") format(\"truetype\")}");
              Object(uni_platform_helpers_append_css__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(cssText, 'uni-btn-font-' + fontFamily);
            }

            btn.fontFamily = fontFamily;
          }

          btn.color = _this.type === 'transparent' ? '#fff' : btn.color || _this.textColor;
          var fontSize = btn.fontSize || (_this.type === 'transparent' || /\\u/.test(btn.text) ? '22px' : '27px');

          if (/\d$/.test(fontSize)) {
            fontSize += 'px';
          }

          btn.fontSize = fontSize;
          btn.fontWeight = btn.fontWeight || 'normal';
          btns.push(btn);
        });
      }

      return btns;
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    if (this.searchInput) {
      var input = this.$refs.input;
      input.$watch('composing', function (val) {
        _this2.composing = val;
      });

      if (this.searchInput.disabled) {
        input.$el.addEventListener('click', function () {
          UniServiceJSBridge.emit('onNavigationBarSearchInputClicked', '');
        });
      } else {
        input.$refs.input.addEventListener('keyup', function (event) {
          if (event.key.toUpperCase() === 'ENTER') {
            UniServiceJSBridge.emit('onNavigationBarSearchInputConfirmed', {
              text: _this2.text
            });
          }
        });
      }
    }
  },
  methods: {
    _back: function _back() {
      if (getCurrentPages().length === 1) {
        uni.reLaunch({
          url: '/'
        });
      } else {
        uni.navigateBack({
          from: 'backButton'
        });
      }
    },
    _onBtnClick: function _onBtnClick(index) {
      UniServiceJSBridge.emit('onNavigationBarButtonTap', Object.assign({}, this.btns[index], {
        index: index
      }));
    },
    _formatBtnFontText: function _formatBtnFontText(btn) {
      if (btn.fontSrc && btn.fontFamily) {
        return btn.text.replace("\\u", '&#x');
      } else if (FONTS[btn.type]) {
        return FONTS[btn.type];
      }

      return btn.text || '';
    },
    _formatBtnStyle: function _formatBtnStyle(btn) {
      var style = {
        color: btn.color,
        fontSize: btn.fontSize,
        fontWeight: btn.fontWeight
      };

      if (btn.fontFamily) {
        style.fontFamily = btn.fontFamily;
      }

      return style;
    },
    _focus: function _focus() {
      this.focus = true;
    },
    _blur: function _blur() {
      this.focus = false;
    },
    _input: function _input(text) {
      UniServiceJSBridge.emit('onNavigationBarSearchInputChanged', {
        text: text
      });
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "b10a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parseHtml; });
/* harmony import */ var uni_helpers_html_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("18fd");


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
  Object(uni_helpers_html_parser__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(html, {
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3ad9")["default"]))

/***/ }),

/***/ "b34d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/form/index.vue?vue&type=template&id=48fdd92d&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-form',_vm._g({},_vm.$listeners),[_c('span',[_vm._t("default")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/form/index.vue?vue&type=template&id=48fdd92d&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__("8af1");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/form/index.vue?vue&type=script&lang=js&
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
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var components_form = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "b628":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bde3");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "b705":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/rich-text/index.vue?vue&type=template&id=1603a562&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-rich-text',_vm._g({},_vm.$listeners),[_c('div')])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/rich-text/index.vue?vue&type=template&id=1603a562&

// EXTERNAL MODULE: ./src/core/view/components/rich-text/html-parser.js
var html_parser = __webpack_require__("b10a");

// EXTERNAL MODULE: ./src/shared/index.js + 3 modules
var shared = __webpack_require__("f2b3");

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
    if (!Object(shared["f" /* isPlainObject */])(node)) {
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

      if (Object(shared["f" /* isPlainObject */])(attrs)) {
        var tagAttrs = TAGS[tagName] || [];
        Object.keys(attrs).forEach(function (name) {
          var value = attrs[name];

          switch (name) {
            case 'class':
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
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/rich-text/index.vue?vue&type=script&lang=js&
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
        nodes = Object(html_parser["a" /* default */])(nodes);
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
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var rich_text = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "b7b5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony import */ var _bridge_on__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("052f");
/* harmony import */ var _bridge_subscribe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("3d1f");
/* harmony import */ var _uni__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("98be");
/* harmony import */ var _plugins_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("abbf");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getApp", function() { return _plugins_app__WEBPACK_IMPORTED_MODULE_3__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getCurrentPages", function() { return _plugins_app__WEBPACK_IMPORTED_MODULE_3__["c"]; });





Object(_bridge_on__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(UniServiceJSBridge.on, {
  getApp: _plugins_app__WEBPACK_IMPORTED_MODULE_3__[/* getApp */ "b"],
  getCurrentPages: _plugins_app__WEBPACK_IMPORTED_MODULE_3__[/* getCurrentPages */ "c"]
});
Object(_bridge_subscribe__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(UniServiceJSBridge.subscribe, {
  getApp: _plugins_app__WEBPACK_IMPORTED_MODULE_3__[/* getApp */ "b"],
  getCurrentPages: _plugins_app__WEBPACK_IMPORTED_MODULE_3__[/* getCurrentPages */ "c"]
});
/* harmony default export */ __webpack_exports__["default"] = (_uni__WEBPACK_IMPORTED_MODULE_2__[/* uni */ "a"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "b865":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return publishHandler; });
function publishHandler(event, args, pageId) {
  // h5 平台直接调用UniViewJSBridge
  global.UniViewJSBridge.subscribeHandler(event, args, pageId);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("24aa")))

/***/ }),

/***/ "b866":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getImageInfo", function() { return getImageInfo; });
/* harmony import */ var uni_platform_helpers_get_real_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cb0f");

var getImageInfo = {
  'src': {
    type: String,
    required: true,
    validator: function validator(src, params) {
      params.src = Object(uni_platform_helpers_get_real_path__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(src);
    }
  }
};

/***/ }),

/***/ "ba15":
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

/***/ "bab8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/system-routes/system-header.vue?vue&type=template&id=c6515f18&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"system-header"},[_c('div',{staticClass:"header-text"},[_vm._t("default")],2),_c('div',{staticClass:"header-btn header-back uni-btn-icon header-btn-icon",on:{"click":_vm._back}},[_vm._v("")]),(_vm.confirm)?_c('div',{staticClass:"header-btn header-confirm",on:{"click":_vm._confirm}},[_c('svg',{staticClass:"header-btn-img",attrs:{"width":"200px","height":"200.00px","viewBox":"0 0 1024 1024","version":"1.1","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M939.6960642844446 226.08613831111114c-14.635971697777777-13.725872355555557-37.719236835555556-13.070208568888889-51.445109191111115 1.6029502577777779L402.69993870222225 744.6571451733333 137.46159843555557 483.31364238222227c-14.344349013333334-14.12709944888889-37.392384-13.98030904888889-51.51948344888889 0.3640399644444444-14.12709944888889 14.30911886222222-13.945078897777778 37.392384 0.40122709333333334 51.482296319999996l291.8171704888889 287.48392106666665c0.10960327111111111 0.10960327111111111 0.2544366933333333 0.1448334222222222 0.3640399644444444 0.2544366933333333s0.1448334222222222 0.2544366933333333 0.2544366933333333 0.3640399644444444c2.293843057777778 2.1842397866666667 5.061329351111111 3.4231500799999997 7.719212373333333 4.879309937777777 1.3113264355555554 0.7652670577777777 2.43867648 1.8926159644444445 3.822419057777778 2.43867648 4.2960634311111106 1.6753664 8.846562417777779 2.548279751111111 13.361832391111111 2.548279751111111 4.769706666666666 0 9.539412195555554-0.9472864711111111 13.98030904888889-2.839903573333333 1.4933469866666664-0.6184766577777778 2.6578830222222223-1.8926159644444445 4.0416267377777775-2.6950701511111115 2.7302991644444448-1.6029502577777779 5.5702027377777785-2.9495068444444446 7.901232924444444-5.315766044444445 0.10960327111111111-0.10960327111111111 0.1448334222222222-0.2916238222222222 0.2544366933333333-0.40122709333333334 0.07241614222222222-0.10960327111111111 0.21920654222222222-0.1448334222222222 0.3268528355555555-0.2544366933333333L941.2579134577779 277.5273335466667C955.0953460622222 262.9305059555556 954.3320359822221 239.8844279466666 939.6960642844446 226.08613831111114z"}})])]):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/components/system-routes/system-header.vue?vue&type=template&id=c6515f18&

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/components/system-routes/system-header.vue?vue&type=script&lang=js&
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
/* harmony default export */ var system_headervue_type_script_lang_js_ = ({
  name: 'SystemHeader',
  props: {
    confirm: {
      type: Boolean,
      default: false
    }
  },
  created: function created() {
    if (true) {
      document.title = this.$slots.default[0].text;
    }
  },
  methods: {
    _back: function _back() {
      this.$emit('back');
    },
    _confirm: function _confirm() {
      this.$emit('confirm');
    }
  }
});
// CONCATENATED MODULE: ./src/platforms/h5/components/system-routes/system-header.vue?vue&type=script&lang=js&
 /* harmony default export */ var system_routes_system_headervue_type_script_lang_js_ = (system_headervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/platforms/h5/components/system-routes/system-header.vue?vue&type=style&index=0&lang=css&
var system_headervue_type_style_index_0_lang_css_ = __webpack_require__("0a32");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

// CONCATENATED MODULE: ./src/platforms/h5/components/system-routes/system-header.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  system_routes_system_headervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var system_header = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "bacd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/canvas/index.vue?vue&type=template&id=2e5c8284&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-canvas',_vm._g({attrs:{"canvas-id":_vm.canvasId,"disable-scroll":_vm.disableScroll}},_vm._listeners),[_c('canvas',{ref:"canvas",attrs:{"width":"300","height":"150"}}),_c('div',{staticStyle:{"position":"absolute","top":"0","left":"0","width":"100%","height":"100%","overflow":"hidden"}},[_vm._t("default")],2),_c('v-uni-resize-sensor',{ref:"sensor",on:{"resize":_vm._resize}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/canvas/index.vue?vue&type=template&id=2e5c8284&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/canvas/index.vue?vue&type=script&lang=js&
var canvasvue_type_script_lang_js_ = __webpack_require__("dc5e");

// CONCATENATED MODULE: ./src/core/view/components/canvas/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_canvasvue_type_script_lang_js_ = (canvasvue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./src/core/view/components/canvas/index.vue?vue&type=style&index=0&lang=css&
var canvasvue_type_style_index_0_lang_css_ = __webpack_require__("0741");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var canvas = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "bdb1":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./base64.js": "4ebb",
	"./can-i-use.js": "7771",
	"./interceptor.js": "1ef7",
	"./page-event.js": "9eba",
	"./storage.js": "c84e",
	"./upx2px.js": "c75f"
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
webpackContext.id = "bdb1";

/***/ }),

/***/ "bde3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "be12":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {function processDeltaY(evt, identifier, startY) {
  var touch = Array.prototype.slice.call(evt.changedTouches).filter(function (touch) {
    return touch.identifier === identifier;
  })[0];

  if (!touch) {
    return false;
  }

  evt.deltaY = touch.pageY - startY;
  return true;
} // const ratio = 2.2


var PULLING = 'pulling';
var REACHED = 'reached';
var ABORTING = 'aborting';
var REFRESHING = 'refreshing';
var RESTORING = 'restoring';
/* harmony default export */ __webpack_exports__["a"] = ({
  mounted: function mounted() {
    var _this = this;

    if (this.enablePullDownRefresh) {
      this.refreshContainerElem = this.$refs.refresh.$el;
      this.refreshControllerElem = this.refreshContainerElem.querySelector('.uni-page-refresh');
      this.refreshInnerElemStyle = this.refreshControllerElem.querySelector('.uni-page-refresh-inner').style;
      UniServiceJSBridge.on(this.$route.params.__id__ + '.startPullDownRefresh', function () {
        if (!_this.state) {
          _this.state = REFRESHING;

          _this._addClass();

          setTimeout(function () {
            _this._refreshing();
          }, 50);
        }
      });
      UniServiceJSBridge.on(this.$route.params.__id__ + '.stopPullDownRefresh', function () {
        if (_this.state === REFRESHING) {
          _this._removeClass();

          _this.state = RESTORING;

          _this._addClass();

          _this._restoring(function () {
            _this._removeClass();

            _this.state = _this.distance = _this.offset = null;
          });
        }
      });
    }
  },
  methods: {
    _touchstart: function _touchstart(evt) {
      var touch = evt.changedTouches[0];
      this.touchId = touch.identifier;
      this.startY = touch.pageY;

      if ([ABORTING, REFRESHING, RESTORING].indexOf(this.state) >= 0) {
        this.canRefresh = false;
      } else {
        this.canRefresh = true;
      }
    },
    _touchmove: function _touchmove(evt) {
      if (!this.canRefresh) {
        return;
      }

      if (!processDeltaY(evt, this.touchId, this.startY)) {
        return;
      }

      var deltaY = evt.deltaY;

      if ((document.documentElement.scrollTop || document.body.scrollTop) !== 0) {
        this.touchId = null;
        return;
      }

      if (deltaY < 0 && !this.state) {
        return;
      }

      evt.preventDefault();

      if (this.distance == null) {
        this.offset = deltaY;
        this.state = PULLING;

        this._addClass();
      }

      deltaY = deltaY - this.offset;

      if (deltaY < 0) {
        deltaY = 0;
      }

      this.distance = deltaY;
      var reached = deltaY >= this.refreshOptions.range && this.state !== REACHED;
      var pulling = deltaY < this.refreshOptions.range && this.state !== PULLING;

      if (reached || pulling) {
        this._removeClass();

        this.state = this.state === REACHED ? PULLING : REACHED;

        this._addClass();
      }

      this._pulling(deltaY);
    },
    _touchend: function _touchend(evt) {
      var _this2 = this;

      if (!processDeltaY(evt, this.touchId, this.startY)) {
        return;
      }

      if (this.state === null) {
        return;
      }

      if (this.state === PULLING) {
        this._removeClass();

        this.state = ABORTING;

        this._addClass();

        this._aborting(function () {
          _this2._removeClass();

          _this2.state = _this2.distance = _this2.offset = null;
        });
      } else if (this.state === REACHED) {
        this._removeClass();

        this.state = REFRESHING;

        this._addClass();

        this._refreshing();
      }
    },
    _toggleClass: function _toggleClass(type) {
      if (!this.state) {
        return;
      }

      var elem = this.refreshContainerElem;

      if (elem) {
        elem.classList[type]('uni-page-refresh--' + this.state);
      }
    },
    _addClass: function _addClass() {
      this._toggleClass('add');
    },
    _removeClass: function _removeClass() {
      this._toggleClass('remove');
    },
    _pulling: function _pulling(deltaY) {
      var elem = this.refreshControllerElem;

      if (!elem) {
        return;
      }

      var style = elem.style;
      var rotate = deltaY / this.refreshOptions.range;

      if (rotate > 1) {
        rotate = 1;
      } else {
        rotate = rotate * rotate * rotate;
      }

      var y = Math.round(deltaY / (this.refreshOptions.range / this.refreshOptions.height));
      var transform = y ? 'translate3d(-50%, ' + y + 'px, 0)' : 0;
      style.webkitTransform = transform;
      style.clip = 'rect(' + (45 - y) + 'px,45px,45px,-5px)';
      this.refreshInnerElemStyle.webkitTransform = 'rotate(' + 360 * rotate + 'deg)';
    },
    _aborting: function _aborting(callback) {
      var elem = this.refreshControllerElem;

      if (!elem) {
        return;
      }

      var style = elem.style;

      if (style.webkitTransform) {
        style.webkitTransition = '-webkit-transform 0.3s';
        style.webkitTransform = 'translate3d(-50%, 0, 0)';

        var abortTransitionEnd = function abortTransitionEnd() {
          timeout && clearTimeout(timeout);
          elem.removeEventListener('webkitTransitionEnd', abortTransitionEnd);
          style.webkitTransition = '';
          callback();
        };

        elem.addEventListener('webkitTransitionEnd', abortTransitionEnd);
        var timeout = setTimeout(abortTransitionEnd, 350); // 部分手机，部分情况webkitTransitionEnd不触发
      } else {
        callback();
      }
    },
    _refreshing: function _refreshing() {
      var elem = this.refreshControllerElem;

      if (!elem) {
        return;
      }

      var style = elem.style;
      style.webkitTransition = '-webkit-transform 0.2s';
      style.webkitTransform = 'translate3d(-50%, ' + this.refreshOptions.height + 'px, 0)'; // Service 执行 refresh

      UniServiceJSBridge.emit('onPullDownRefresh', {}, this.$route.params.__id__);
    },
    _restoring: function _restoring(callback) {
      var elem = this.refreshControllerElem;

      if (!elem) {
        return;
      }

      var style = elem.style;
      style.webkitTransition = '-webkit-transform 0.3s';
      style.webkitTransform += ' scale(0.01)';

      var restoreTransitionEnd = function restoreTransitionEnd() {
        timeout && clearTimeout(timeout);
        elem.removeEventListener('webkitTransitionEnd', restoreTransitionEnd);
        style.webkitTransition = '';
        style.webkitTransform = 'translate3d(-50%, 0, 0)';
        callback();
      };

      elem.addEventListener('webkitTransitionEnd', restoreTransitionEnd);
      var timeout = setTimeout(restoreTransitionEnd, 350); // 部分手机，部分情况webkitTransitionEnd不触发
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "be14":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chooseLocation", function() { return chooseLocation; });
/**
 * 选择位置
 * @param {*} callbackId
 */
function chooseLocation(options, callbackId) {
  var _UniServiceJSBridge = UniServiceJSBridge,
      invoke = _UniServiceJSBridge.invokeCallbackHandler;
  getApp().$router.push({
    type: 'navigateTo',
    path: '/choose-location'
  }, function () {
    var fn = function fn(data) {
      UniServiceJSBridge.unsubscribe('onChooseLocation', fn);

      if (data) {
        invoke(callbackId, Object.assign(data, {
          errMsg: 'chooseLocation:ok'
        }));
      } else {
        invoke(callbackId, {
          errMsg: 'chooseLocation:fail'
        });
      }
    };

    UniServiceJSBridge.subscribe('onChooseLocation', fn);
  }, function () {
    invoke(callbackId, {
      errMsg: 'chooseLocation:fail'
    });
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "bfea":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1360");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c312":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c33f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("74ce");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c35d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/picker/index.vue?vue&type=template&id=6718d5e2&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-picker',{on:{"click":function($event){$event.stopPropagation();return _vm._click($event)}}},[_c('div',[_vm._t("default")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/picker/index.vue?vue&type=template&id=6718d5e2&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/picker/index.vue?vue&type=script&lang=js&
var pickervue_type_script_lang_js_ = __webpack_require__("f11c");

// CONCATENATED MODULE: ./src/core/view/components/picker/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_pickervue_type_script_lang_js_ = (pickervue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./src/core/view/components/picker/index.vue?vue&type=style&index=0&lang=css&
var pickervue_type_style_index_0_lang_css_ = __webpack_require__("6f00");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var picker = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "c41f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/view/components/cover-view/index.vue?vue&type=template&id=637e0973&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-cover-view',_vm._g({attrs:{"scroll-top":_vm.scrollTop}},_vm.$listeners),[_c('div',{ref:"content",staticClass:"uni-cover-view"},[_vm._t("default")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/view/components/cover-view/index.vue?vue&type=template&id=637e0973&

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/view/components/cover-view/index.vue?vue&type=script&lang=js&
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
/* harmony default export */ var cover_viewvue_type_script_lang_js_ = ({
  name: 'CoverView',
  props: {
    scrollTop: {
      type: [String, Number],
      default: 0
    }
  },
  watch: {
    scrollTop: function scrollTop(val) {
      this.setScrollTop(val);
    }
  },
  mounted: function mounted() {
    this.setScrollTop(this.scrollTop);
  },
  methods: {
    setScrollTop: function setScrollTop(val) {
      var content = this.$refs.content;

      if (getComputedStyle(content).overflowY === 'scroll') {
        content.scrollTop = this._upx2pxNum(val);
      }
    },
    _upx2pxNum: function _upx2pxNum(val) {
      if (/\d+[ur]px$/i.test(val)) {
        val.replace(/\d+[ur]px$/i, function (text) {
          return uni.upx2px(parseFloat(text));
        });
      }

      return parseFloat(val) || 0;
    }
  }
});
// CONCATENATED MODULE: ./src/platforms/h5/view/components/cover-view/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_cover_viewvue_type_script_lang_js_ = (cover_viewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/platforms/h5/view/components/cover-view/index.vue?vue&type=style&index=0&lang=css&
var cover_viewvue_type_style_index_0_lang_css_ = __webpack_require__("cc5f");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

// CONCATENATED MODULE: ./src/platforms/h5/view/components/cover-view/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_cover_viewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var cover_view = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "c439":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocation", function() { return getLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openLocation", function() { return openLocation; });
var type = {
  WGS84: 'WGS84',
  GCJ02: 'GCJ02'
};
var getLocation = {
  type: {
    type: String,
    validator: function validator(value, params) {
      value = (value || '').toUpperCase();
      params.type = Object.values(type).indexOf(value) < 0 ? type.WGS84 : value;
    },
    default: type.WGS84
  },
  altitude: {
    altitude: Boolean,
    default: false
  }
};
var openLocation = {
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  scale: {
    type: Number,
    validator: function validator(value, params) {
      value = Math.floor(value);
      params.scale = value >= 5 && value <= 18 ? value : 18;
    },
    default: 18
  },
  name: {
    type: String
  },
  address: {
    type: String
  }
};

/***/ }),

/***/ "c61c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/movable-area/index.vue?vue&type=script&lang=js&
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
var movable_areavue_type_style_index_0_lang_css_ = __webpack_require__("a3e5");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var movable_area = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "c75f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "upx2px", function() { return upx2px; });
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

/***/ }),

/***/ "c84e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStorage", function() { return setStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStorageSync", function() { return setStorageSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStorage", function() { return getStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStorageSync", function() { return getStorageSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeStorage", function() { return removeStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeStorageSync", function() { return removeStorageSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearStorage", function() { return clearStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearStorageSync", function() { return clearStorageSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStorageInfo", function() { return getStorageInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStorageInfoSync", function() { return getStorageInfoSync; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function setStorage() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      key = _ref.key,
      data = _ref.data;

  var value = {
    type: _typeof(data) === 'object' ? 'object' : 'string',
    data: data
  };
  localStorage.setItem(key, JSON.stringify(value));
  var keyList = localStorage.getItem('uni-storage-keys');

  if (!keyList) {
    localStorage.setItem('uni-storage-keys', JSON.stringify([key]));
  } else {
    var keys = JSON.parse(keyList);

    if (keys.indexOf(key) < 0) {
      keys.push(key);
      localStorage.setItem('uni-storage-keys', JSON.stringify(keys));
    }
  }

  return {
    errMsg: 'setStorage:ok'
  };
}
function setStorageSync(key, data) {
  setStorage({
    key: key,
    data: data
  });
}
function getStorage() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      key = _ref2.key;

  var data = localStorage.getItem(key);
  return data ? {
    data: JSON.parse(data).data,
    errMsg: 'getStorage:ok'
  } : {
    data: '',
    errMsg: 'getStorage:fail'
  };
}
function getStorageSync(key) {
  var res = getStorage({
    key: key
  });
  return res.data;
}
function removeStorage() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      key = _ref3.key;

  var keyList = localStorage.getItem('uni-storage-keys');

  if (keyList) {
    var keys = JSON.parse(keyList);
    var index = keys.indexOf(key);
    keys.splice(index, 1);
    localStorage.setItem('uni-storage-keys', JSON.stringify(keys));
  }

  localStorage.removeItem(key);
  return {
    errMsg: 'removeStorage:ok'
  };
}
function removeStorageSync(key) {
  removeStorage({
    key: key
  });
}
function clearStorage() {
  localStorage.clear();
  return {
    errMsg: 'clearStorage:ok'
  };
}
function clearStorageSync() {
  clearStorage();
}
function getStorageInfo() {
  // TODO 暂时先不做大小的转换
  var keyList = localStorage.getItem('uni-storage-keys');
  return keyList ? {
    keys: JSON.parse(keyList),
    currentSize: 0,
    limitSize: 0,
    errMsg: 'getStorageInfo:ok'
  } : {
    keys: '',
    currentSize: 0,
    limitSize: 0,
    errMsg: 'getStorageInfo:fail'
  };
}
function getStorageInfoSync() {
  var res = getStorageInfo();
  delete res.errMsg;
  return res;
}

/***/ }),

/***/ "c8ed":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0dba");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c96e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c312");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c99c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "cb0f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getRealPath; });
/* harmony import */ var uni_helpers_get_real_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0f74");

var SCHEME_RE = /^([a-z-]+:)?\/\//i;
var BASE64_RE = /^data:[a-z-]+\/[a-z-]+;base64,/;

function addBase(filePath) {
  if (__uniConfig.router.base) {
    return __uniConfig.router.base + filePath;
  }

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


  if (SCHEME_RE.test(filePath) || BASE64_RE.test(filePath) || filePath.indexOf('blob:') === 0) {
    return filePath;
  }

  var pages = getCurrentPages();

  if (pages.length) {
    return addBase(Object(uni_helpers_get_real_route__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(pages[pages.length - 1].$page.route, filePath).substr(1));
  }

  return filePath;
}

/***/ }),

/***/ "cb41":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showModal", function() { return showModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showToast", function() { return showToast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideToast", function() { return hideToast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showLoading", function() { return showLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideLoading", function() { return hideLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showActionSheet", function() { return showActionSheet; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _UniServiceJSBridge = UniServiceJSBridge,
    emit = _UniServiceJSBridge.emit,
    invoke = _UniServiceJSBridge.invokeCallbackHandler;
function showModal(args, callbackId) {
  emit('onShowModal', args, function (type) {
    invoke(callbackId, _defineProperty({}, type, true));
  });
}
function showToast(args) {
  emit('onShowToast', args);
  return {};
}
function hideToast() {
  emit('onHideToast');
  return {};
}
function showLoading(args) {
  emit('onShowLoading', args);
  return {};
}
function hideLoading() {
  emit('onHideLoading');
  return {};
}
function showActionSheet(args, callbackId) {
  emit('onShowActionSheet', args, function (tapIndex) {
    if (tapIndex === -1) {
      invoke(callbackId, {
        errMsg: 'showActionSheet:fail cancel'
      });
    } else {
      invoke(callbackId, {
        tapIndex: tapIndex
      });
    }
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "cc5f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6f45");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "cc76":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var protocol = Object.create(null);

var modules = __webpack_require__("19c4");

modules.keys().forEach(function (key) {
  Object.assign(protocol, modules(key));
});
/* harmony default export */ __webpack_exports__["a"] = (protocol);

/***/ }),

/***/ "cc83":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "cee1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "cef5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProvider", function() { return getProvider; });
var service = {
  OAUTH: 'OAUTH',
  SHARE: 'SHARE',
  PAYMENT: 'PAYMENT',
  PUSH: 'PUSH'
};
var getProvider = {
  service: {
    type: String,
    required: true,
    validator: function validator(value, params) {
      value = (value || '').toUpperCase();

      if (value && Object.values(service).indexOf(value) < 0) {
        return 'service error';
      }
    }
  }
};

/***/ }),

/***/ "d3bd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__("8af1");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/button/index.vue?vue&type=script&lang=js&

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
var buttonvue_type_style_index_0_lang_css_ = __webpack_require__("5676");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var components_button = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "d4b6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return processEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initEvents; });
/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f2b3");
/* harmony import */ var uni_helpers_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("85b6");
/* harmony import */ var uni_helpers_patch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("24d9");
/* harmony import */ var uni_platform_helpers_get_window_offset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("a470");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






function processTarget(target, detail) {
  var res = {
    id: target.id,
    offsetLeft: target.offsetLeft,
    offsetTop: target.offsetTop,
    dataset: Object(uni_helpers_index__WEBPACK_IMPORTED_MODULE_1__[/* normalizeDataset */ "c"])(target.dataset)
  };

  if (detail) {
    Object.assign(res, detail);
  }

  return res;
}

function processTouches(touches) {
  if (touches) {
    var res = [];

    var _getWindowOffset = Object(uni_platform_helpers_get_window_offset__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(),
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
    var _getWindowOffset2 = Object(uni_platform_helpers_get_window_offset__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(),
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


  return Object(uni_helpers_patch__WEBPACK_IMPORTED_MODULE_2__[/* wrapperMPEvent */ "b"])({
    type: detail.type || name,
    timeStamp: $event.timeStamp || 0,
    detail: detail,
    target: processTarget(target, detail),
    currentTarget: processTarget(currentTarget),
    // 只处理系统事件
    touches: $event instanceof Event ? processTouches($event.touches) : $event.touches,
    changedTouches: $event instanceof Event ? processTouches($event.changedTouches) : $event.changedTouches,
    preventDefault: function preventDefault() {},
    stopPropagation: function stopPropagation() {}
  });
}
var LONGPRESS_TIMEOUT = 350;
var LONGPRESS_THRESHOLD = 10;
var passiveOptions = uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* supportsPassive */ "h"] ? {
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
    evt.target.dispatchEvent(new TouchEvent('longpress', {
      bubbles: true,
      cancelable: true,
      target: evt.target,
      currentTarget: evt.currentTarget,
      touches: evt.touches,
      changedTouches: evt.changedTouches
    }));
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

/***/ "d5bc":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d5be":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chooseImage", function() { return chooseImage; });
/* harmony import */ var uni_platform_helpers_file__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e2e2");
/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("f2b3");


var _UniServiceJSBridge = UniServiceJSBridge,
    invoke = _UniServiceJSBridge.invokeCallbackHandler;
var imageInput = null;

var _createInput = function _createInput(options) {
  var inputEl = document.createElement('input');
  inputEl.type = 'file';
  Object(uni_shared__WEBPACK_IMPORTED_MODULE_1__[/* updateElementStyle */ "j"])(inputEl, {
    'position': 'absolute',
    'visibility': 'hidden',
    'z-index': -999,
    'width': 0,
    'height': 0,
    'top': 0,
    'left': 0
  });
  inputEl.accept = 'image/*';

  if (options.count > 1) {
    inputEl.multiple = 'multiple';
  } // 经过测试，仅能限制只通过相机拍摄，不能限制只允许从相册选择。


  if (options.sourceType.length === 1 && options.sourceType[0] === 'camera') {
    inputEl.capture = 'camera';
  }

  return inputEl;
};

function chooseImage(_ref, callbackId) {
  var count = _ref.count,
      sourceType = _ref.sourceType;

  // TODO handle sizeType 尝试通过 canvas 压缩
  if (imageInput) {
    document.body.removeChild(imageInput);
    imageInput = null;
  }

  imageInput = _createInput({
    count: count,
    sourceType: sourceType
  });
  document.body.appendChild(imageInput);
  imageInput.addEventListener('change', function (event) {
    var tempFilePaths = [];
    var tempFiles = [];
    var fileCount = event.target.files.length;

    for (var i = 0; i < fileCount; i++) {
      var file = event.target.files[i];
      var filePath = Object(uni_platform_helpers_file__WEBPACK_IMPORTED_MODULE_0__[/* fileToUrl */ "a"])(file);
      tempFilePaths.push(filePath);
      tempFiles.push({
        path: filePath,
        size: file.size
      });
    }

    invoke(callbackId, {
      errMsg: 'chooseImage:ok',
      tempFilePaths: tempFilePaths,
      tempFiles: tempFiles
    }); // TODO 用户取消选择时，触发 fail，目前尚未找到合适的方法。
  });
  imageInput.click();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "d5ec":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/radio-group/index.vue?vue&type=template&id=fb6516be&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-radio-group',_vm._g({},_vm.$listeners),[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/radio-group/index.vue?vue&type=template&id=fb6516be&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__("8af1");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/radio-group/index.vue?vue&type=script&lang=js&
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
var radio_groupvue_type_style_index_0_lang_css_ = __webpack_require__("fb61");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var radio_group = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "d60d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d677":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/view/components/cover-image/index.vue?vue&type=template&id=40340608&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-cover-image',_vm._g({attrs:{"src":_vm.src}},_vm.$listeners),[_c('div',{staticClass:"uni-cover-image"},[(_vm.src)?_c('img',{attrs:{"src":_vm.$getRealPath(_vm.src)},on:{"load":_vm._load,"error":_vm._error}}):_vm._e()])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/view/components/cover-image/index.vue?vue&type=template&id=40340608&

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/view/components/cover-image/index.vue?vue&type=script&lang=js&
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
/* harmony default export */ var cover_imagevue_type_script_lang_js_ = ({
  name: 'CoverImage',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  methods: {
    _load: function _load($event) {
      this.$trigger('load', $event);
    },
    _error: function _error($event) {
      this.$trigger('error', $event);
    }
  }
});
// CONCATENATED MODULE: ./src/platforms/h5/view/components/cover-image/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_cover_imagevue_type_script_lang_js_ = (cover_imagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/platforms/h5/view/components/cover-image/index.vue?vue&type=style&index=0&lang=css&
var cover_imagevue_type_style_index_0_lang_css_ = __webpack_require__("5d1d");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

// CONCATENATED MODULE: ./src/platforms/h5/view/components/cover-image/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_cover_imagevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var cover_image = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "d68b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showModal", function() { return showModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showToast", function() { return showToast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showLoading", function() { return showLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showActionSheet", function() { return showActionSheet; });
/* harmony import */ var uni_platform_helpers_get_real_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cb0f");

var showModal = {
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  cancelColor: {
    type: String,
    default: '#000000'
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  confirmColor: {
    type: String,
    default: '#007aff'
  },
  visible: {
    type: Boolean,
    default: true
  }
};
var showToast = {
  title: {
    type: String,
    default: ''
  },
  icon: {
    default: 'success',
    validator: function validator(icon, params) {
      if (['success', 'loading', 'none'].indexOf(icon) === -1) {
        params.icon = 'success';
      }
    }
  },
  image: {
    type: String,
    default: '',
    validator: function validator(image, params) {
      if (image) {
        params.image = Object(uni_platform_helpers_get_real_path__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(image);
      }
    }
  },
  duration: {
    type: Number,
    default: 1500
  },
  mask: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: true
  }
};
var showLoading = {
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: 'loading'
  },
  duration: {
    type: Number,
    default: 100000000 // 简单处理 showLoading，直接设置个大值

  },
  mask: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: true
  }
};
var showActionSheet = {
  itemList: {
    type: Array,
    required: true,
    validator: function validator(itemList, params) {
      if (!itemList.length) {
        return 'parameter.itemList should have at least 1 item';
      }
    }
  },
  itemColor: {
    type: String,
    default: '#000000'
  },
  visible: {
    type: Boolean,
    default: true
  }
};

/***/ }),

/***/ "daa0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createVideoContext", function() { return createVideoContext; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function operateVideoPlayer(videoId, pageId, type, data) {
  UniServiceJSBridge.publishHandler(pageId + '-video-' + videoId, {
    videoId: videoId,
    type: type,
    data: data
  }, pageId);
}

var RATES = [0.5, 0.8, 1.0, 1.25, 1.5];

var VideoContext =
/*#__PURE__*/
function () {
  function VideoContext(id, pageId) {
    _classCallCheck(this, VideoContext);

    this.id = id;
    this.pageId = pageId;
  }

  _createClass(VideoContext, [{
    key: "play",
    value: function play() {
      operateVideoPlayer(this.id, this.pageId, 'play');
    }
  }, {
    key: "pause",
    value: function pause() {
      operateVideoPlayer(this.id, this.pageId, 'pause');
    }
  }, {
    key: "stop",
    value: function stop() {
      operateVideoPlayer(this.id, this.pageId, 'stop');
    }
  }, {
    key: "seek",
    value: function seek(position) {
      operateVideoPlayer(this.id, this.pageId, 'seek', {
        position: position
      });
    }
  }, {
    key: "sendDanmu",
    value: function sendDanmu() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          text = _ref.text,
          color = _ref.color;

      operateVideoPlayer(this.id, this.pageId, 'sendDanmu', {
        text: text,
        color: color
      });
    }
  }, {
    key: "playbackRate",
    value: function playbackRate(rate) {
      if (!~RATES.indexOf(rate)) {
        rate = 1.0;
      }

      operateVideoPlayer(this.id, this.pageId, 'playbackRate', {
        rate: rate
      });
    }
  }, {
    key: "requestFullScreen",
    value: function requestFullScreen() {
      operateVideoPlayer(this.id, this.pageId, 'requestFullScreen');
    }
  }, {
    key: "exitFullScreen",
    value: function exitFullScreen() {
      operateVideoPlayer(this.id, this.pageId, 'exitFullScreen');
    }
  }, {
    key: "showStatusBar",
    value: function showStatusBar() {
      operateVideoPlayer(this.id, this.pageId, 'showStatusBar');
    }
  }, {
    key: "hideStatusBar",
    value: function hideStatusBar() {
      operateVideoPlayer(this.id, this.pageId, 'hideStatusBar');
    }
  }]);

  return VideoContext;
}();

function createVideoContext(id, context) {
  if (context) {
    return new VideoContext(id, context.$page.id);
  }

  var app = getApp();

  if (app.$route && app.$route.params.__id__) {
    return new VideoContext(id, app.$route.params.__id__);
  } else {
    UniServiceJSBridge.emit('onError', 'createVideoContext:fail');
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "db18":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("08c9");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "dc5e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge, console) {/* harmony import */ var uni_mixins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8af1");
/* harmony import */ var uni_helpers_hidpi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("a20f");
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
    _resize: function _resize(_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      var canvas = this.$refs.canvas;

      if (canvas.style.width !== width + 'px' || canvas.style.height !== height + 'px') {
        canvas.width = width;
        canvas.height = height;
        Object(uni_helpers_hidpi__WEBPACK_IMPORTED_MODULE_1__[/* wrapper */ "b"])(canvas);
      }
    },
    _touchmove: function _touchmove(event) {
      event.preventDefault();
    },
    actionsChanged: function actionsChanged(_ref3) {
      var _this2 = this;

      var actions = _ref3.actions,
          reserve = _ref3.reserve,
          callbackId = _ref3.callbackId;
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
            } else if (/^data:[a-z-]+\/[a-z-]+;base64,/.test(src)) {
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
    getImageData: function getImageData(_ref4) {
      var x = _ref4.x,
          y = _ref4.y,
          width = _ref4.width,
          height = _ref4.height,
          callbackId = _ref4.callbackId;
      var imgData;
      var canvas = this.$refs.canvas;

      if (!width) {
        width = canvas.width;
      }

      if (!height) {
        height = canvas.height;
      }

      try {
        imgData = canvas.getContext('2d').getImageData(x, y, width, height);
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
          width: width,
          height: height
        }
      }, this.$page.id);
    },
    putImageData: function putImageData(_ref5) {
      var data = _ref5.data,
          x = _ref5.x,
          y = _ref5.y,
          width = _ref5.width,
          height = _ref5.height,
          callbackId = _ref5.callbackId;

      try {
        if (!height) {
          height = Math.round(data.length / 4 / width);
        }

        this.$refs.canvas.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(data), width, height), x, y);
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("501c"), __webpack_require__("3ad9")["default"]))

/***/ }),

/***/ "de29":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return validateParam; });
/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f2b3");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


function validateParam(key, paramTypes, paramsData) {
  var paramOptions = paramTypes[key];
  var absent = !Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* hasOwn */ "c"])(paramsData, key);
  var value = paramsData[key];
  var booleanIndex = getTypeIndex(Boolean, paramOptions.type);

  if (booleanIndex > -1) {
    if (absent && !Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* hasOwn */ "c"])(paramOptions, 'default')) {
      value = false;
    }
  }

  if (value === undefined) {
    if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* hasOwn */ "c"])(paramOptions, 'default')) {
      var paramDefault = paramOptions['default'];
      value = Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(paramDefault) ? paramDefault() : paramDefault;
      paramsData[key] = value; // 默认值
    }
  }

  return assertParam(paramOptions, key, value, absent, paramsData);
}

function assertParam(paramOptions, name, value, absent, paramsData) {
  if (paramOptions.required && absent) {
    return "Missing required parameter `".concat(name, "`");
  }

  if (value == null && !paramOptions.required) {
    var _validator = paramOptions.validator;

    if (_validator) {
      return _validator(value, paramsData);
    }

    return;
  }

  var type = paramOptions.type;
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
    return getInvalidTypeMessage(name, value, expectedTypes);
  }

  var validator = paramOptions.validator;

  if (validator) {
    return validator(value, paramsData);
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);

  if (simpleCheckRE.test(expectedType)) {
    var t = _typeof(value);

    valid = t === expectedType.toLowerCase();

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isPlainObject */ "f"])(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }

  return {
    valid: valid,
    expectedType: expectedType
  };
}

function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }

  return -1;
}

function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "parameter `".concat(name, "`.") + " Expected ".concat(expectedTypes.join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* toRawType */ "i"])(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += " with value ".concat(expectedValue);
  }

  message += ", got ".concat(receivedType, " ");

  if (isExplicable(receivedType)) {
    message += "with value ".concat(receivedValue, ".");
  }

  return message;
}

function styleValue(value, type) {
  if (type === 'String') {
    return "\"".concat(value, "\"");
  } else if (type === 'Number') {
    return "".concat(Number(value));
  } else {
    return "".concat(value);
  }
}

var explicitTypes = ['string', 'number', 'boolean'];

function isExplicable(value) {
  return explicitTypes.some(function (elem) {
    return value.toLowerCase() === elem;
  });
}

function isBoolean() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}

/***/ }),

/***/ "deaf":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e0b6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/view/components/audio/index.vue?vue&type=template&id=73dcb647&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-audio',_vm._g({attrs:{"id":_vm.id,"src":_vm.src,"loop":_vm.loop,"controls":_vm.controls,"poster":_vm.poster,"name":_vm.name,"author":_vm.author}},_vm.$listeners),[_c('audio',{ref:"audio",staticStyle:{"display":"none"},attrs:{"loop":_vm.loop}}),_c('div',{staticClass:"uni-audio-default"},[_c('div',{staticClass:"uni-audio-left",style:('background-image: url('+_vm.$getRealPath(_vm.poster)+');')},[_c('div',{staticClass:"uni-audio-button",class:{play:!_vm.playing,pause:_vm.playing},on:{"click":_vm.trigger}})]),_c('div',{staticClass:"uni-audio-right"},[_c('div',{staticClass:"uni-audio-time"},[_vm._v(_vm._s(_vm.currentTime))]),_c('div',{staticClass:"uni-audio-info"},[_c('div',{staticClass:"uni-audio-name"},[_vm._v(_vm._s(_vm.name))]),_c('div',{staticClass:"uni-audio-author"},[_vm._v(_vm._s(_vm.author))])])])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/platforms/h5/view/components/audio/index.vue?vue&type=template&id=73dcb647&

// EXTERNAL MODULE: ./src/core/view/mixins/index.js + 1 modules
var mixins = __webpack_require__("8af1");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/platforms/h5/view/components/audio/index.vue?vue&type=script&lang=js&
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

/* harmony default export */ var audiovue_type_script_lang_js_ = ({
  name: 'Audio',
  mixins: [mixins["d" /* subscriber */]],
  props: {
    id: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    loop: {
      type: [Boolean, String],
      default: false
    },
    controls: {
      type: [Boolean, String],
      default: false
    },
    poster: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      playing: false,
      currentTime: this.getTime(0)
    };
  },
  watch: {
    src: function src(val) {
      if (this.$refs.audio) {
        this.$refs.audio.src = this.$getRealPath(val);
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    var audio = this.$refs.audio;
    audio.addEventListener('error', function ($event) {
      _this.playing = false;

      _this.$trigger('error', $event, {});
    });
    audio.addEventListener('play', function ($event) {
      _this.playing = true;

      _this.$trigger('play', $event, {});
    });
    audio.addEventListener('pause', function ($event) {
      _this.playing = false;

      _this.$trigger('pause', $event, {});
    });
    audio.addEventListener('ended', function ($event) {
      _this.playing = false;

      _this.$trigger('ended', $event, {});
    });
    audio.addEventListener('timeupdate', function ($event) {
      var currentTime = audio.currentTime;
      _this.currentTime = _this.getTime(currentTime);
      var duration = audio.duration;

      _this.$trigger('timeupdate', $event, {
        currentTime: currentTime,
        duration: duration
      });
    });
    audio.src = this.$getRealPath(this.src);
  },
  methods: {
    _handleSubscribe: function _handleSubscribe(_ref) {
      var type = _ref.type,
          _ref$data = _ref.data,
          data = _ref$data === void 0 ? {} : _ref$data;
      var audio = this.$refs.audio;

      switch (type) {
        case 'setSrc':
          audio.src = this.$getRealPath(data.src);
          this.$emit('update:src', data.src);
          break;

        case 'play':
          audio.play();
          break;

        case 'pause':
          audio.pause();
          break;

        case 'seek':
          audio.currentTime = data.position;
          break;
      }
    },
    trigger: function trigger() {
      if (this.playing) {
        this.$refs.audio.pause();
      } else {
        this.$refs.audio.play();
      }
    },
    getTime: function getTime(time) {
      var h = Math.floor(time / 3600);
      var m = Math.floor(time % 3600 / 60);
      var s = Math.floor(time % 3600 % 60);
      h = (h < 10 ? '0' : '') + h;
      m = (m < 10 ? '0' : '') + m;
      s = (s < 10 ? '0' : '') + s;
      var str = m + ':' + s;

      if (h !== '00') {
        str = h + ':' + str;
      }

      return str;
    }
  }
});
// CONCATENATED MODULE: ./src/platforms/h5/view/components/audio/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_audiovue_type_script_lang_js_ = (audiovue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/platforms/h5/view/components/audio/index.vue?vue&type=style&index=0&lang=css&
var audiovue_type_style_index_0_lang_css_ = __webpack_require__("e38a");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

// CONCATENATED MODULE: ./src/platforms/h5/view/components/audio/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_audiovue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var audio = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "e2d4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge, console) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCanvasContext", function() { return createCanvasContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvasGetImageData", function() { return canvasGetImageData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvasPutImageData", function() { return canvasPutImageData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvasToTempFilePath", function() { return canvasToTempFilePath; });
/* harmony import */ var uni_helpers_callbacks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("62b5");
/* harmony import */ var uni_helpers_hidpi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("a20f");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var canvasEventCallbacks = Object(uni_helpers_callbacks__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('canvasEvent');
UniServiceJSBridge.subscribe('onDrawCanvas', function (_ref) {
  var callbackId = _ref.callbackId,
      data = _ref.data;
  var callback = canvasEventCallbacks.pop(callbackId);

  if (callback) {
    callback(data);
  }
});
UniServiceJSBridge.subscribe('onCanvasMethodCallback', function (_ref2) {
  var callbackId = _ref2.callbackId,
      data = _ref2.data;
  var callback = canvasEventCallbacks.pop(callbackId);

  if (callback) {
    callback(data);
  }
});

function operateCanvas(canvasId, pageId, type, data) {
  UniServiceJSBridge.publishHandler(pageId + '-canvas-' + canvasId, {
    canvasId: canvasId,
    type: type,
    data: data
  }, pageId);
}

var predefinedColor = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgrey: '#a9a9a9',
  darkgreen: '#006400',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  grey: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgrey: '#d3d3d3',
  lightgreen: '#90ee90',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32',
  transparent: '#00000000'
};

function checkColor(e) {
  var t = null;

  if ((t = /^#([0-9|A-F|a-f]{6})$/.exec(e)) != null) {
    var n = parseInt(t[1].slice(0, 2), 16);
    var o = parseInt(t[1].slice(2, 4), 16);
    var r = parseInt(t[1].slice(4), 16);
    return [n, o, r, 255];
  }

  if ((t = /^#([0-9|A-F|a-f]{3})$/.exec(e)) != null) {
    var _n = t[1].slice(0, 1);

    var _o = t[1].slice(1, 2);

    var _r = t[1].slice(2, 3);

    _n = parseInt(_n + _n, 16);
    _o = parseInt(_o + _o, 16);
    _r = parseInt(_r + _r, 16);
    return [_n, _o, _r, 255];
  }

  if ((t = /^rgb\((.+)\)$/.exec(e)) != null) {
    return t[1].split(',').map(function (e) {
      return Math.min(255, parseInt(e.trim()));
    }).concat(255);
  }

  if ((t = /^rgba\((.+)\)$/.exec(e)) != null) {
    return t[1].split(',').map(function (e, t) {
      return t === 3 ? Math.floor(255 * parseFloat(e.trim())) : Math.min(255, parseInt(e.trim()));
    });
  }

  var i = e.toLowerCase();

  if (predefinedColor.hasOwnProperty(i)) {
    t = /^#([0-9|A-F|a-f]{6,8})$/.exec(predefinedColor[i]);

    var _n2 = parseInt(t[1].slice(0, 2), 16);

    var _o2 = parseInt(t[1].slice(2, 4), 16);

    var _r2 = parseInt(t[1].slice(4, 6), 16);

    var a = parseInt(t[1].slice(6, 8), 16);
    a = a >= 0 ? a : 255;
    return [_n2, _o2, _r2, a];
  }

  console.group('非法颜色: ' + e);
  console.error('不支持颜色：' + e);
  console.groupEnd();
  return [0, 0, 0, 255];
}

function TextMetrics(width) {
  this.width = width;
}

function Pattern(image, repetition) {
  this.image = image;
  this.repetition = repetition;
}

var CanvasGradient =
/*#__PURE__*/
function () {
  function CanvasGradient(type, data) {
    _classCallCheck(this, CanvasGradient);

    this.type = type;
    this.data = data;
    this.colorStop = [];
  }

  _createClass(CanvasGradient, [{
    key: "addColorStop",
    value: function addColorStop(position, color) {
      this.colorStop.push([position, checkColor(color)]);
    }
  }]);

  return CanvasGradient;
}();

var methods1 = ['scale', 'rotate', 'translate', 'setTransform', 'transform'];
var methods2 = ['drawImage', 'fillText', 'fill', 'stroke', 'fillRect', 'strokeRect', 'clearRect', 'strokeText'];
var methods3 = ['setFillStyle', 'setTextAlign', 'setStrokeStyle', 'setGlobalAlpha', 'setShadow', 'setFontSize', 'setLineCap', 'setLineJoin', 'setLineWidth', 'setMiterLimit', 'setTextBaseline', 'setLineDash'];
var tempCanvas;

function getTempCanvas() {
  if (!tempCanvas) {
    tempCanvas = document.createElement('canvas');
  }

  return tempCanvas;
}

var CanvasContext =
/*#__PURE__*/
function () {
  function CanvasContext(id, pageId) {
    _classCallCheck(this, CanvasContext);

    this.id = id;
    this.pageId = pageId;
    this.actions = [];
    this.path = [];
    this.subpath = [];
    this.currentTransform = [];
    this.currentStepAnimates = [];
    this.drawingState = [];
    this.state = {
      lineDash: [0, 0],
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
      shadowColor: [0, 0, 0, 0],
      font: '10px sans-serif',
      fontSize: 10,
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontFamily: 'sans-serif'
    };
  }

  _createClass(CanvasContext, [{
    key: "draw",
    value: function draw() {
      var reserve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var callback = arguments.length > 1 ? arguments[1] : undefined;

      var actions = _toConsumableArray(this.actions);

      this.actions = [];
      this.path = [];
      var callbackId;

      if (typeof callback === 'function') {
        callbackId = canvasEventCallbacks.push(callback);
      }

      operateCanvas(this.id, this.pageId, 'actionsChanged', {
        actions: actions,
        reserve: reserve,
        callbackId: callbackId
      });
    }
  }, {
    key: "createLinearGradient",
    value: function createLinearGradient(x0, y0, x1, y1) {
      return new CanvasGradient('linear', [x0, y0, x1, y1]);
    }
  }, {
    key: "createCircularGradient",
    value: function createCircularGradient(x, y, r) {
      return new CanvasGradient('radial', [x, y, r]);
    }
  }, {
    key: "createPattern",
    value: function createPattern(image, repetition) {
      if (undefined === repetition) {
        console.error("Failed to execute 'createPattern' on 'CanvasContext': 2 arguments required, but only 1 present.");
      } else if (['repeat', 'repeat-x', 'repeat-y', 'no-repeat'].indexOf(repetition) < 0) {
        console.error("Failed to execute 'createPattern' on 'CanvasContext': The provided type ('" + repetition + "') is not one of 'repeat', 'no-repeat', 'repeat-x', or 'repeat-y'.");
      } else {
        return new Pattern(image, repetition);
      }
    }
  }, {
    key: "measureText",
    value: function measureText(text) {
      var c2d = getTempCanvas().getContext('2d');
      c2d.font = this.state.font;
      return new TextMetrics(c2d.measureText(text).width || 0);
    }
  }, {
    key: "save",
    value: function save() {
      this.actions.push({
        method: 'save',
        data: []
      });
      this.drawingState.push(this.state);
    }
  }, {
    key: "restore",
    value: function restore() {
      this.actions.push({
        method: 'restore',
        data: []
      });
      this.state = this.drawingState.pop() || {
        lineDash: [0, 0],
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        shadowColor: [0, 0, 0, 0],
        font: '10px sans-serif',
        fontSize: 10,
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontFamily: 'sans-serif'
      };
    }
  }, {
    key: "beginPath",
    value: function beginPath() {
      this.path = [];
      this.subpath = [];
    }
  }, {
    key: "moveTo",
    value: function moveTo(x, y) {
      this.path.push({
        method: 'moveTo',
        data: [x, y]
      });
      this.subpath = [[x, y]];
    }
  }, {
    key: "lineTo",
    value: function lineTo(x, y) {
      if (this.path.length === 0 && this.subpath.length === 0) {
        this.path.push({
          method: 'moveTo',
          data: [x, y]
        });
      } else {
        this.path.push({
          method: 'lineTo',
          data: [x, y]
        });
      }

      this.subpath.push([x, y]);
    }
  }, {
    key: "quadraticCurveTo",
    value: function quadraticCurveTo(cpx, cpy, x, y) {
      this.path.push({
        method: 'quadraticCurveTo',
        data: [cpx, cpy, x, y]
      });
      this.subpath.push([x, y]);
    }
  }, {
    key: "bezierCurveTo",
    value: function bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
      this.path.push({
        method: 'bezierCurveTo',
        data: [cp1x, cp1y, cp2x, cp2y, x, y]
      });
      this.subpath.push([x, y]);
    }
  }, {
    key: "arc",
    value: function arc(x, y, r, sAngle, eAngle) {
      var counterclockwise = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      this.path.push({
        method: 'arc',
        data: [x, y, r, sAngle, eAngle, counterclockwise]
      });
      this.subpath.push([x, y]);
    }
  }, {
    key: "rect",
    value: function rect(x, y, width, height) {
      this.path.push({
        method: 'rect',
        data: [x, y, width, height]
      });
      this.subpath = [[x, y]];
    }
  }, {
    key: "arcTo",
    value: function arcTo(x1, y1, x2, y2, radius) {
      this.path.push({
        method: 'arcTo',
        data: [x1, y1, x2, y2, radius]
      });
      this.subpath.push([x2, y2]);
    }
  }, {
    key: "clip",
    value: function clip() {
      this.actions.push({
        method: 'clip',
        data: _toConsumableArray(this.path)
      });
    }
  }, {
    key: "closePath",
    value: function closePath() {
      this.path.push({
        method: 'closePath',
        data: []
      });

      if (this.subpath.length) {
        this.subpath = [this.subpath.shift()];
      }
    }
  }, {
    key: "clearActions",
    value: function clearActions() {
      this.actions = [];
      this.path = [];
      this.subpath = [];
    }
  }, {
    key: "getActions",
    value: function getActions() {
      var actions = _toConsumableArray(this.actions);

      this.clearActions();
      return actions;
    }
  }, {
    key: "lineDashOffset",
    set: function set(value) {
      this.actions.push({
        method: 'setLineDashOffset',
        data: [value]
      });
    }
  }, {
    key: "globalCompositeOperation",
    set: function set(type) {
      this.actions.push({
        method: 'setGlobalCompositeOperation',
        data: [type]
      });
    }
  }, {
    key: "shadowBlur",
    set: function set(level) {
      this.actions.push({
        method: 'setShadowBlur',
        data: [level]
      });
    }
  }, {
    key: "shadowColor",
    set: function set(color) {
      this.actions.push({
        method: 'setShadowColor',
        data: [color]
      });
    }
  }, {
    key: "shadowOffsetX",
    set: function set(x) {
      this.actions.push({
        method: 'setShadowOffsetX',
        data: [x]
      });
    }
  }, {
    key: "shadowOffsetY",
    set: function set(y) {
      this.actions.push({
        method: 'setShadowOffsetY',
        data: [y]
      });
    }
  }, {
    key: "font",
    set: function set(value) {
      var self = this;
      this.state.font = value; // eslint-disable-next-line

      var fontFormat = value.match(/^(([\w\-]+\s)*)(\d+r?px)(\/(\d+\.?\d*(r?px)?))?\s+(.*)/);

      if (fontFormat) {
        var style = fontFormat[1].trim().split(/\s/);
        var fontSize = parseFloat(fontFormat[3]);
        var fontFamily = fontFormat[7];
        var actions = [];
        style.forEach(function (value, index) {
          if (['italic', 'oblique', 'normal'].indexOf(value) > -1) {
            actions.push({
              method: 'setFontStyle',
              data: [value]
            });
            self.state.fontStyle = value;
          } else if (['bold', 'normal'].indexOf(value) > -1) {
            actions.push({
              method: 'setFontWeight',
              data: [value]
            });
            self.state.fontWeight = value;
          } else if (index === 0) {
            actions.push({
              method: 'setFontStyle',
              data: ['normal']
            });
            self.state.fontStyle = 'normal';
          } else if (index === 1) {
            pushAction();
          }
        });

        if (style.length === 1) {
          pushAction();
        }

        style = actions.map(function (action) {
          return action.data[0];
        }).join(' ');
        this.state.fontSize = fontSize;
        this.state.fontFamily = fontFamily;
        this.actions.push({
          method: 'setFont',
          data: ["".concat(style, " ").concat(fontSize, "px ").concat(fontFamily)]
        });
      } else {
        console.warn("Failed to set 'font' on 'CanvasContext': invalid format.");
      }

      function pushAction() {
        actions.push({
          method: 'setFontWeight',
          data: ['normal']
        });
        self.state.fontWeight = 'normal';
      }
    },
    get: function get() {
      return this.state.font;
    }
  }, {
    key: "fillStyle",
    set: function set(color) {
      this.setFillStyle(color);
    }
  }, {
    key: "strokeStyle",
    set: function set(color) {
      this.setStrokeStyle(color);
    }
  }, {
    key: "globalAlpha",
    set: function set(value) {
      value = Math.floor(255 * parseFloat(value));
      this.actions.push({
        method: 'setGlobalAlpha',
        data: [value]
      });
    }
  }, {
    key: "textAlign",
    set: function set(align) {
      this.actions.push({
        method: 'setTextAlign',
        data: [align]
      });
    }
  }, {
    key: "lineCap",
    set: function set(type) {
      this.actions.push({
        method: 'setLineCap',
        data: [type]
      });
    }
  }, {
    key: "lineJoin",
    set: function set(type) {
      this.actions.push({
        method: 'setLineJoin',
        data: [type]
      });
    }
  }, {
    key: "lineWidth",
    set: function set(value) {
      this.actions.push({
        method: 'setLineWidth',
        data: [value]
      });
    }
  }, {
    key: "miterLimit",
    set: function set(value) {
      this.actions.push({
        method: 'setMiterLimit',
        data: [value]
      });
    }
  }, {
    key: "textBaseline",
    set: function set(type) {
      this.actions.push({
        method: 'setTextBaseline',
        data: [type]
      });
    }
  }]);

  return CanvasContext;
}();

[].concat(methods1, methods2).forEach(function (method) {
  function get(method) {
    switch (method) {
      case 'fill':
      case 'stroke':
        return function () {
          this.actions.push({
            method: method + 'Path',
            data: _toConsumableArray(this.path)
          });
        };

      case 'fillRect':
        return function (x, y, width, height) {
          this.actions.push({
            method: 'fillPath',
            data: [{
              method: 'rect',
              data: [x, y, width, height]
            }]
          });
        };

      case 'strokeRect':
        return function (x, y, width, height) {
          this.actions.push({
            method: 'strokePath',
            data: [{
              method: 'rect',
              data: [x, y, width, height]
            }]
          });
        };

      case 'fillText':
      case 'strokeText':
        return function (text, x, y, maxWidth) {
          var data = [text.toString(), x, y];

          if (typeof maxWidth === 'number') {
            data.push(maxWidth);
          }

          this.actions.push({
            method: method,
            data: data
          });
        };

      case 'drawImage':
        return function (imageResource, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight) {
          if (sHeight === undefined) {
            sx = dx;
            sy = dy;
            sWidth = dWidth;
            sHeight = dHeight;
            dx = undefined;
            dy = undefined;
            dWidth = undefined;
            dHeight = undefined;
          }

          var data;

          function isNumber(e) {
            return typeof e === 'number';
          }

          data = isNumber(dx) && isNumber(dy) && isNumber(dWidth) && isNumber(dHeight) ? [imageResource, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight] : isNumber(sWidth) && isNumber(sHeight) ? [imageResource, sx, sy, sWidth, sHeight] : [imageResource, sx, sy];
          this.actions.push({
            method: method,
            data: data
          });
        };

      default:
        return function () {
          for (var _len = arguments.length, data = new Array(_len), _key = 0; _key < _len; _key++) {
            data[_key] = arguments[_key];
          }

          this.actions.push({
            method: method,
            data: data
          });
        };
    }
  }

  CanvasContext.prototype[method] = get(method);
});
methods3.forEach(function (method) {
  function get(method) {
    switch (method) {
      case 'setFillStyle':
      case 'setStrokeStyle':
        return function (color) {
          if (_typeof(color) !== 'object') {
            this.actions.push({
              method: method,
              data: ['normal', checkColor(color)]
            });
          } else {
            this.actions.push({
              method: method,
              data: [color.type, color.data, color.colorStop]
            });
          }
        };

      case 'setGlobalAlpha':
        return function (alpha) {
          alpha = Math.floor(255 * parseFloat(alpha));
          this.actions.push({
            method: method,
            data: [alpha]
          });
        };

      case 'setShadow':
        return function (offsetX, offsetY, blur, color) {
          color = checkColor(color);
          this.actions.push({
            method: method,
            data: [offsetX, offsetY, blur, color]
          });
          this.state.shadowBlur = blur;
          this.state.shadowColor = color;
          this.state.shadowOffsetX = offsetX;
          this.state.shadowOffsetY = offsetY;
        };

      case 'setLineDash':
        return function (pattern, offset) {
          pattern = pattern || [0, 0];
          offset = offset || 0;
          this.actions.push({
            method: method,
            data: [pattern, offset]
          });
          this.state.lineDash = pattern;
        };

      case 'setFontSize':
        return function (fontSize) {
          this.state.font = this.state.font.replace(/\d+\.?\d*px/, fontSize + 'px');
          this.state.fontSize = fontSize;
          this.actions.push({
            method: method,
            data: [fontSize]
          });
        };

      default:
        return function () {
          for (var _len2 = arguments.length, data = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            data[_key2] = arguments[_key2];
          }

          this.actions.push({
            method: method,
            data: data
          });
        };
    }
  }

  CanvasContext.prototype[method] = get(method);
});
function createCanvasContext(id, context) {
  if (context) {
    return new CanvasContext(id, context.$page.id);
  }

  var app = getApp();

  if (app.$route && app.$route.params.__id__) {
    return new CanvasContext(id, app.$route.params.__id__);
  } else {
    UniServiceJSBridge.emit('onError', 'createCanvasContext:fail');
  }
}
var _UniServiceJSBridge = UniServiceJSBridge,
    invoke = _UniServiceJSBridge.invokeCallbackHandler;
function canvasGetImageData(_ref3, callbackId) {
  var canvasId = _ref3.canvasId,
      x = _ref3.x,
      y = _ref3.y,
      width = _ref3.width,
      height = _ref3.height;
  var pageId;
  var app = getApp();

  if (app.$route && app.$route.params.__id__) {
    pageId = app.$route.params.__id__;
  } else {
    invoke(callbackId, {
      errMsg: 'canvasGetImageData:fail'
    });
    return;
  }

  var cId = canvasEventCallbacks.push(function (data) {
    var imgData = data.data;

    if (imgData && imgData.length) {
      data.data = new Uint8ClampedArray(imgData);
    }

    invoke(callbackId, data);
  });
  operateCanvas(canvasId, pageId, 'getImageData', {
    x: x,
    y: y,
    width: width,
    height: height,
    callbackId: cId
  });
}
function canvasPutImageData(_ref4, callbackId) {
  var canvasId = _ref4.canvasId,
      data = _ref4.data,
      x = _ref4.x,
      y = _ref4.y,
      width = _ref4.width,
      height = _ref4.height;
  var pageId;
  var app = getApp();

  if (app.$route && app.$route.params.__id__) {
    pageId = app.$route.params.__id__;
  } else {
    invoke(callbackId, {
      errMsg: 'canvasPutImageData:fail'
    });
    return;
  }

  var cId = canvasEventCallbacks.push(function (data) {
    invoke(callbackId, data);
  });
  operateCanvas(canvasId, pageId, 'putImageData', {
    data: _toConsumableArray(data),
    x: x,
    y: y,
    width: width,
    height: height,
    callbackId: cId
  });
}
function canvasToTempFilePath(_ref5, callbackId) {
  var x = _ref5.x,
      y = _ref5.y,
      width = _ref5.width,
      height = _ref5.height,
      destWidth = _ref5.destWidth,
      destHeight = _ref5.destHeight,
      canvasId = _ref5.canvasId,
      fileType = _ref5.fileType,
      qualit = _ref5.qualit;

  if (typeof width !== 'undefined') {
    width *= uni_helpers_hidpi__WEBPACK_IMPORTED_MODULE_1__[/* pixelRatio */ "a"];
  }

  if (typeof height !== 'undefined') {
    height *= uni_helpers_hidpi__WEBPACK_IMPORTED_MODULE_1__[/* pixelRatio */ "a"];
  }

  var pageId;
  var app = getApp();

  if (app.$route && app.$route.params.__id__) {
    pageId = app.$route.params.__id__;
  } else {
    invoke(callbackId, {
      errMsg: 'canvasToTempFilePath:fail'
    });
    return;
  }

  var cId = canvasEventCallbacks.push(function (data) {
    var imgData = data.data;

    if (!imgData || !imgData.length) {
      invoke(callbackId, {
        errMsg: 'canvasToTempFilePath:fail'
      });
      return;
    }

    try {
      imgData = new ImageData(new Uint8ClampedArray(imgData), data.width, data.height);
    } catch (error) {
      invoke(callbackId, {
        errMsg: 'canvasToTempFilePath:fail'
      });
      return;
    }

    var canvas = getTempCanvas();
    canvas.width = data.width;
    canvas.height = data.height;
    var c2d = canvas.getContext('2d');
    c2d.putImageData(imgData, 0, 0);
    var base64 = canvas.toDataURL('image/png');
    var img = new Image();

    img.onload = function () {
      var width = canvas.width = typeof destWidth === 'number' ? destWidth : imgData.width * uni_helpers_hidpi__WEBPACK_IMPORTED_MODULE_1__[/* pixelRatio */ "a"];
      var height = canvas.height = typeof destHeight === 'number' ? destHeight : imgData.height * uni_helpers_hidpi__WEBPACK_IMPORTED_MODULE_1__[/* pixelRatio */ "a"];

      if (fileType === 'jpeg') {
        c2d.fillStyle = '#fff';
        c2d.fillRect(0, 0, width, height);
      }

      c2d.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
      base64 = canvas.toDataURL("image/".concat(fileType), qualit);
      invoke(callbackId, {
        errMsg: 'canvasToTempFilePath:ok',
        tempFilePath: base64
      });
    };

    img.src = base64;
  });
  operateCanvas(canvasId, pageId, 'getImageData', {
    x: x,
    y: y,
    width: width,
    height: height,
    callbackId: cId
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1"), __webpack_require__("3ad9")["default"]))

/***/ }),

/***/ "e2e2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return urlToFile; });
/* unused harmony export base64ToFile */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fileToUrl; });
/**
 * 暂存的文件对象
 */
var files = {};
/**
 * 从url读取File
 * @param {string} url
 * @param {Promise}
 */

function urlToFile(url) {
  var file = files[url];

  if (file) {
    return Promise.resolve(file);
  }

  if (/^data:[a-z-]+\/[a-z-]+;base64,/.test(url)) {
    return Promise.resolve(base64ToFile(url));
  }

  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';

    xhr.onload = function () {
      resolve(this.response);
    };

    xhr.onerror = reject;
    xhr.send();
  });
}
/**
 * base64转File
 * @param {string} base64
 * @return {File}
 */

function base64ToFile(base64) {
  base64 = base64.split(',');
  var type = base64[0].match(/:(.*?);/)[1];
  var str = atob(base64[1]);
  var n = str.length;
  var array = new Uint8Array(n);

  while (n--) {
    array[n] = str.charCodeAt(n);
  }

  var filename = "".concat(Date.now(), ".").concat(type.split('/')[1]);
  return new File([array], filename, {
    type: type
  });
}
/**
 * 从本地file或者blob对象创建url
 * @param {Blob|File} file
 * @return {string}
 */

function fileToUrl(file) {
  for (var key in files) {
    if (files.hasOwnProperty(key)) {
      var oldFile = files[key];

      if (oldFile === file) {
        return key;
      }
    }
  }

  var url = (window.URL || window.webkitURL).createObjectURL(file);
  files[url] = file;
  return url;
}

/***/ }),

/***/ "e38a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d5bc");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e3a7":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./context/audio.js": "924c",
	"./context/canvas.js": "e2d4",
	"./context/inner-audio.js": "f9d2",
	"./context/map.js": "6f25",
	"./context/video.js": "daa0",
	"./create-animation.js": "a180",
	"./create-intersection-observer.js": "42fb",
	"./create-selector-query.js": "ee5c",
	"./device/accelerometer.js": "2bdd",
	"./device/compass.js": "f7b4",
	"./device/get-system-info.js": "78c8",
	"./device/hide-keyboard.js": "fa1e",
	"./device/make-phone-call.js": "7f4e",
	"./device/network-info.js": "3d64",
	"./device/vibrate.js": "44de",
	"./event-bus.js": "e7c0",
	"./file/open-document.js": "e826",
	"./location.js": "2829",
	"./location/choose-location.js": "be14",
	"./location/get-location.js": "0554",
	"./location/open-location.js": "6575",
	"./media/choose-image.js": "d5be",
	"./media/choose-video.js": "8ce3",
	"./media/get-image-info.js": "34b2",
	"./media/preview-image.js": "9e56",
	"./navigation-bar.js": "6bfe",
	"./network/download-file.js": "4f43",
	"./network/request.js": "1a12",
	"./network/socket.js": "893e",
	"./network/upload-file.js": "7d18",
	"./plugins.js": "78ff",
	"./popup.js": "cb41",
	"./route.js": "3042",
	"./tab-bar.js": "26d3",
	"./window.js": "9c38"
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
webpackContext.id = "e3a7";

/***/ }),

/***/ "e670":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e7c0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$on", function() { return $on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$off", function() { return $off; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$once", function() { return $once; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$emit", function() { return $emit; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8bbf");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var Emitter = new vue__WEBPACK_IMPORTED_MODULE_0___default.a();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(Emitter, '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(Emitter, '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(Emitter, '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(Emitter, '$emit', Array.prototype.slice.call(arguments));
}

/***/ }),

/***/ "e826":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openDocument", function() { return openDocument; });
/**
 * 打开文档
 * @param {*} param0
 * @param {*} callbackId
 */
function openDocument(_ref, callbackId) {
  var filePath = _ref.filePath;
  var _UniServiceJSBridge = UniServiceJSBridge,
      invoke = _UniServiceJSBridge.invokeCallbackHandler;
  window.open(filePath);
  invoke(callbackId, {
    errMsg: 'openDocument:ok'
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "e865":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a897");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e8e6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageScrollTo", function() { return pageScrollTo; });
var pageScrollTo = {
  scrollTop: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    default: 300,
    validator: function validator(duration, params) {
      params.duration = Math.max(0, duration);
    }
  }
};

/***/ }),

/***/ "e949":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return appendCss; });
function appendCss(css, cssId) {
  var replace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var style = document.getElementById(cssId);

  if (style && replace) {
    style.parentNode.removeChild(style);
    style = null;
  }

  if (!style) {
    style = document.createElement('style');
    style.type = 'text/css';
    cssId && (style.id = cssId);
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  style.appendChild(document.createTextNode(css));
}

/***/ }),

/***/ "eaa4":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ed1a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isContextApi */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isSyncApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isCallbackApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isTaskApi; });
/* unused harmony export shouldPromise */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return promisify; });
/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f2b3");
/* harmony import */ var _interceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("8542");


var SYNC_API_RE = /^\$|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;
var CONTEXT_API_RE = /^create|Manager$/;
var TASK_APIS = ['request', 'downloadFile', 'uploadFile', 'connectSocket'];
var CALLBACK_API_RE = /^on/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}
function isTaskApi(name) {
  return TASK_APIS.indexOf(name) !== -1;
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}

function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }

  return true;
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }

  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(options.success) || Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(options.fail) || Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(options.complete)) {
      return Object(_interceptor__WEBPACK_IMPORTED_MODULE_1__[/* wrapperReturnValue */ "e"])(name, _interceptor__WEBPACK_IMPORTED_MODULE_1__[/* invokeApi */ "b"].apply(void 0, [name, api, options].concat(params)));
    }

    return Object(_interceptor__WEBPACK_IMPORTED_MODULE_1__[/* wrapperReturnValue */ "e"])(name, handlePromise(new Promise(function (resolve, reject) {
      _interceptor__WEBPACK_IMPORTED_MODULE_1__[/* invokeApi */ "b"].apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
      /* eslint-disable no-extend-native */

      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(function (value) {
            return promise.resolve(callback()).then(function () {
              return value;
            });
          }, function (reason) {
            return promise.resolve(callback()).then(function () {
              throw reason;
            });
          });
        };
      }
    })));
  };
}

/***/ }),

/***/ "ed9f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chooseVideo", function() { return chooseVideo; });
var SOURCE_TYPES = ['album', 'camera'];
var chooseVideo = {
  'sourceType': {
    type: Array,
    required: false,
    default: SOURCE_TYPES,
    validator: function validator(sourceType, params) {
      var length = sourceType.length;

      if (!length) {
        params.sourceType = SOURCE_TYPES;
      } else {
        for (var i = 0; i < length; i++) {
          if (typeof sourceType[i] !== 'string' || !~SOURCE_TYPES.indexOf(sourceType[i])) {
            params.sourceType = SOURCE_TYPES;
            break;
          }
        }
      }
    }
  }
};

/***/ }),

/***/ "edfa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4656");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "ee4f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f2b3");

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      showModal: {
        visible: false
      }
    };
  },
  created: function created() {
    var _this = this;

    UniServiceJSBridge.on('onShowModal', function (args, callback) {
      _this.showModal = args;
      _this.onModalCloseCallback = callback;
    });
    UniServiceJSBridge.on('onHidePopup', function (args) {
      _this.showModal.visible = false;
    });
  },
  methods: {
    // 处理 modal close 回调
    _onModalClose: function _onModalClose(type) {
      this.showModal.visible = false;
      Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(this.onModalCloseCallback) && this.onModalCloseCallback(type);
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "ee5c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSelectorQuery", function() { return createSelectorQuery; });
/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f2b3");
/* harmony import */ var uni_helpers_callbacks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("62b5");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var requestComponentInfoCallbacks = Object(uni_helpers_callbacks__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])('requestComponentInfo');

var NodesRef =
/*#__PURE__*/
function () {
  function NodesRef(selectorQuery, component, selector, single) {
    _classCallCheck(this, NodesRef);

    this._selectorQuery = selectorQuery;
    this._component = component;
    this._selector = selector;
    this._single = single;
  }

  _createClass(NodesRef, [{
    key: "boundingClientRect",
    value: function boundingClientRect(callback) {
      this._selectorQuery._push(this._selector, this._component, this._single, {
        id: true,
        dataset: true,
        rect: true,
        size: true
      }, callback);

      return this._selectorQuery;
    }
  }, {
    key: "fields",
    value: function fields(_fields, callback) {
      this._selectorQuery._push(this._selector, this._component, this._single, _fields, callback);

      return this._selectorQuery;
    }
  }, {
    key: "scrollOffset",
    value: function scrollOffset(callback) {
      this._selectorQuery._push(this._selector, this._component, this._single, {
        id: true,
        dataset: true,
        scrollOffset: true
      }, callback);

      return this._selectorQuery;
    }
  }]);

  return NodesRef;
}();

function requestComponentInfo(pageId, queue, callback) {
  var reqId = requestComponentInfoCallbacks.push(callback);
  UniServiceJSBridge.publishHandler('requestComponentInfo', {
    reqId: reqId,
    reqs: queue
  }, pageId);
}

var SelectorQuery =
/*#__PURE__*/
function () {
  function SelectorQuery(pageId) {
    _classCallCheck(this, SelectorQuery);

    this.pageId = pageId;
    this._queue = [];
    this._queueCb = [];
  }

  _createClass(SelectorQuery, [{
    key: "exec",
    value: function exec(callback) {
      var _this = this;

      requestComponentInfo(this.pageId, this._queue, function (res) {
        var queueCbs = _this._queueCb;
        res.forEach(function (result, index) {
          var queueCb = queueCbs[index];

          if (Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(queueCb)) {
            queueCb.call(_this, result);
          }
        });
        Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* isFn */ "e"])(callback) && callback.call(_this, res);
      });
    }
  }, {
    key: 'in',
    value: function _in(component) {
      this._component = component;
      return this;
    }
  }, {
    key: "select",
    value: function select(selector) {
      return new NodesRef(this, this._component, selector, true);
    }
  }, {
    key: "selectAll",
    value: function selectAll(selector) {
      return new NodesRef(this, this._component, selector, false);
    }
  }, {
    key: "selectViewport",
    value: function selectViewport() {
      return new NodesRef(this, 0, '', true);
    }
  }, {
    key: "_push",
    value: function _push(selector, component, single, fields, callback) {
      this._queue.push({
        component: component,
        selector: selector,
        single: single,
        fields: fields
      });

      this._queueCb.push(callback);
    }
  }]);

  return SelectorQuery;
}();

function createSelectorQuery(context) {
  if (context) {
    return new SelectorQuery(context.$page.id);
  }

  var app = getApp();

  if (app.$route && app.$route.params.__id__) {
    return new SelectorQuery(app.$route.params.__id__);
  } else {
    UniServiceJSBridge.emit('onError', 'createSelectorQuery:fail');
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "eecc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {/* harmony import */ var uni_mixins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8af1");
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
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'Navigator',
  mixins: [uni_mixins__WEBPACK_IMPORTED_MODULE_0__[/* hover */ "b"]],
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3ad9")["default"]))

/***/ }),

/***/ "f102":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makePhoneCall", function() { return makePhoneCall; });
var makePhoneCall = {
  'phoneNumber': {
    type: String,
    required: true,
    validator: function validator(phoneNumber) {
      if (!phoneNumber) {
        return "makePhoneCall:fail parameter error: parameter.phoneNumber should not be empty String;";
      }
    }
  }
};

/***/ }),

/***/ "f10e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("53f0");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "f11c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniViewJSBridge) {/* harmony import */ var uni_mixins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8af1");
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("501c")))

/***/ }),

/***/ "f1b2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chooseImage", function() { return chooseImage; });
var SIZE_TYPES = ['original', 'compressed'];
var SOURCE_TYPES = ['album', 'camera'];
var chooseImage = {
  'count': {
    type: Number,
    required: false,
    default: 9,
    validator: function validator(count, params) {
      if (count <= 0) {
        params.count = 9;
      }
    }
  },
  'sizeType': {
    type: Array,
    required: false,
    default: SIZE_TYPES,
    validator: function validator(sizeType, params) {
      // 非必传的参数，不符合预期时处理为默认值。
      var length = sizeType.length;

      if (!length) {
        params.sizeType = SIZE_TYPES;
      } else {
        for (var i = 0; i < length; i++) {
          if (typeof sizeType[i] !== 'string' || !~SIZE_TYPES.indexOf(sizeType[i])) {
            params.sizeType = SIZE_TYPES;
            break;
          }
        }
      }
    }
  },
  'sourceType': {
    type: Array,
    required: false,
    default: SOURCE_TYPES,
    validator: function validator(sourceType, params) {
      var length = sourceType.length;

      if (!length) {
        params.sourceType = SOURCE_TYPES;
      } else {
        for (var i = 0; i < length; i++) {
          if (typeof sourceType[i] !== 'string' || !~SOURCE_TYPES.indexOf(sourceType[i])) {
            params.sourceType = SOURCE_TYPES;
            break;
          }
        }
      }
    }
  }
};

/***/ }),

/***/ "f1ea":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var mixins = [];

var context = __webpack_require__("8793");

context.keys().forEach(function (key) {
  if (key !== './index.js') {
    mixins.push(context(key).default);
  }
});
/* harmony default export */ __webpack_exports__["default"] = (mixins);

/***/ }),

/***/ "f1ef":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"120ddde1-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/scroll-view/index.vue?vue&type=template&id=081194b4&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('uni-scroll-view',_vm._g({},_vm.$listeners),[_c('div',{ref:"wrap",staticClass:"uni-scroll-view"},[_c('div',{ref:"main",staticClass:"uni-scroll-view",style:({'overflow-x': _vm.scrollX?'auto':'hidden','overflow-y': _vm.scrollY?'auto':'hidden'})},[_c('div',{ref:"content"},[_vm._t("default")],2)])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/core/view/components/scroll-view/index.vue?vue&type=template&id=081194b4&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-service/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/core/view/components/scroll-view/index.vue?vue&type=script&lang=js&
var scroll_viewvue_type_script_lang_js_ = __webpack_require__("347e");

// CONCATENATED MODULE: ./src/core/view/components/scroll-view/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_scroll_viewvue_type_script_lang_js_ = (scroll_viewvue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./src/core/view/components/scroll-view/index.vue?vue&type=style&index=0&lang=css&
var scroll_viewvue_type_style_index_0_lang_css_ = __webpack_require__("5ab3");

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("0c7c");

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

/* harmony default export */ var scroll_view = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "f2b3":
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
// CONCATENATED MODULE: ./src/shared/index.js
/* concated harmony reexport supportsPassive */__webpack_require__.d(__webpack_exports__, "h", function() { return supportsPassive; });
/* concated harmony reexport isFn */__webpack_require__.d(__webpack_exports__, "e", function() { return isFn; });
/* unused concated harmony import isStr */
/* concated harmony reexport isPlainObject */__webpack_require__.d(__webpack_exports__, "f", function() { return isPlainObject; });
/* concated harmony reexport hasOwn */__webpack_require__.d(__webpack_exports__, "c", function() { return hasOwn; });
/* unused concated harmony import noop */
/* concated harmony reexport toRawType */__webpack_require__.d(__webpack_exports__, "i", function() { return toRawType; });
/* unused concated harmony import cached */
/* unused concated harmony import camelize */
/* concated harmony reexport setProperties */__webpack_require__.d(__webpack_exports__, "g", function() { return setProperties; });
/* concated harmony reexport getLen */__webpack_require__.d(__webpack_exports__, "b", function() { return getLen; });
/* concated harmony reexport formatDateTime */__webpack_require__.d(__webpack_exports__, "a", function() { return formatDateTime; });
/* concated harmony reexport updateElementStyle */__webpack_require__.d(__webpack_exports__, "j", function() { return updateElementStyle; });
/* concated harmony reexport hexToRgba */__webpack_require__.d(__webpack_exports__, "d", function() { return hexToRgba; });




/***/ }),

/***/ "f4e0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_tabBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ffdb");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_tabBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_tabBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_tabBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "f53a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4871");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "f6fd":
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

/***/ "f7b4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onCompassChange", function() { return onCompassChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startCompass", function() { return startCompass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopCompass", function() { return stopCompass; });
var callbacks = [];
var listener;
/**
 * 监听罗盘数据
 * @param {*} callbackId
 */

function onCompassChange(callbackId) {
  callbacks.push(callbackId);

  if (!listener) {
    startCompass();
  }
}
/**
 * 开始监听罗盘数据
 */

function startCompass() {
  var _UniServiceJSBridge = UniServiceJSBridge,
      invoke = _UniServiceJSBridge.invokeCallbackHandler;

  if (window.DeviceOrientationEvent) {
    listener = function listener(event) {
      var direction = 360 - event.alpha;
      callbacks.forEach(function (callbackId) {
        invoke(callbackId, {
          errMsg: 'onCompassChange:ok',
          direction: direction || 0
        });
      });
    };

    window.addEventListener('deviceorientation', listener, false);
    return {};
  } else {
    throw new Error('device nonsupport deviceorientation');
  }
}
/**
 * 停止监听罗盘数据
 */

function stopCompass() {
  if (listener) {
    window.removeEventListener('deviceorientation', listener, false);
    listener = null;
  }

  return {};
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "f7fd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ac9d");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "f8d2":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f9d2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createInnerAudioContext", function() { return createInnerAudioContext; });
/* harmony import */ var uni_platform_helpers_get_real_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cb0f");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * 可以批量设置的监听事件
 */

var innerAudioContextEventNames = ['onCanplay', 'onPlay', 'onPause', 'onStop', 'onEnded', 'onTimeUpdate', 'onError', 'onWaiting', 'onSeeking', 'onSeeked'];
var innerAudioContextOffEventNames = ['offCanplay', 'offPlay', 'offPause', 'offStop', 'offEnded', 'offTimeUpdate', 'offError', 'offWaiting', 'offSeeking', 'offSeeke'];
/**
 * 音频上下文对象
 */

var InnerAudioContext =
/*#__PURE__*/
function () {
  /**
   * 原始音频对象
   */

  /**
   * 是否暂停中
   */

  /**
   * 开始时间
   */

  /**
   * 事件监听
   */

  /**
   * 音频地址
   */

  /**
   * 音频上下文初始化
   */
  function InnerAudioContext() {
    var _this = this;

    _classCallCheck(this, InnerAudioContext);

    _defineProperty(this, "_audio", void 0);

    _defineProperty(this, "_stoping", void 0);

    _defineProperty(this, "startTime", void 0);

    _defineProperty(this, "_events", void 0);

    _defineProperty(this, "_src", void 0);

    var audio = this._audio = new Audio();
    this._stoping = false; // 和audio对象同名同效果的属性

    var propertys = ['src', 'autoplay', 'loop', 'duration', 'currentTime', 'paused', 'volume'];
    propertys.forEach(function (property) {
      Object.defineProperty(_this, property, {
        set: property === 'src' ? function (src) {
          audio.src = Object(uni_platform_helpers_get_real_path__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(src);
          _this._src = src;
          return src;
        } : function (val) {
          audio[property] = val;
          return val;
        },
        get: property === 'src' ? function () {
          return _this._src;
        } : function () {
          return audio[property];
        }
      });
    });
    this.startTime = 0;
    Object.defineProperty(this, 'obeyMuteSwitch', {
      set: function set(val) {
        return false;
      },
      get: function get() {
        return false;
      }
    });
    Object.defineProperty(this, 'buffered', {
      get: function get() {
        var buffered = audio.buffered;

        if (buffered.length) {
          return buffered.end(buffered.length - 1);
        } else {
          return 0;
        }
      }
    }); // 初始化事件监听列表

    this._events = {};
    innerAudioContextEventNames.forEach(function (eventName) {
      _this._events[eventName] = [];
    });
    audio.addEventListener('loadedmetadata', function () {
      var startTime = Number(_this.startTime) || 0;

      if (startTime > 0) {
        audio.currentTime = startTime;
      }
    }); // 和audio对象同名同效果的事件

    var eventNames = ['canplay', 'play', 'pause', 'ended', 'timeUpdate', 'error', 'waiting', 'seeking', 'seeked'];
    var stopEventNames = ['pause', 'seeking', 'seeked', 'timeUpdate'];
    eventNames.forEach(function (eventName) {
      audio.addEventListener(eventName.toLowerCase(), function () {
        // stop事件过滤
        if (_this._stoping && stopEventNames.indexOf(eventName) >= 0) {
          return;
        }

        _this._events["on".concat(eventName.substr(0, 1).toUpperCase()).concat(eventName.substr(1))].forEach(function (callback) {
          callback();
        });
      }, false);
    });
  }
  /**
   * 播放
   */


  _createClass(InnerAudioContext, [{
    key: "play",
    value: function play() {
      this._stoping = false;

      this._audio.play();
    }
    /**
     * 暂停
     */

  }, {
    key: "pause",
    value: function pause() {
      this._audio.pause();
    }
    /**
     * 停止
     */

  }, {
    key: "stop",
    value: function stop() {
      this._stoping = true;

      this._audio.pause();

      this._audio.currentTime = 0;

      this._events.onStop.forEach(function (callback) {
        callback();
      });
    }
    /**
     * 跳转到
     * @param {number} position
     */

  }, {
    key: "seek",
    value: function seek(position) {
      this._stoping = false;
      position = Number(position);

      if (typeof position === 'number' && !isNaN(position)) {
        this._audio.currentTime = position;
      }
    }
    /**
     * 销毁
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.stop();
    }
  }]);

  return InnerAudioContext;
}(); // 批量设置音频上下文事件监听方法


innerAudioContextEventNames.forEach(function (eventName) {
  InnerAudioContext.prototype[eventName] = function (callback) {
    if (typeof callback === 'function') {
      this._events[eventName].push(callback);
    }
  };
}); // 批量设置音频上下文事件取消监听方法

innerAudioContextOffEventNames.forEach(function (eventName) {
  InnerAudioContext.prototype[eventName] = function (callback) {
    var handle = this._events[eventName.replace('off', 'on')];

    var index = handle.indexOf(callback);

    if (index >= 0) {
      handle.splice(index, 1);
    }
  };
});
/**
 * 创建音频上下文
 */

function createInnerAudioContext() {
  return new InnerAudioContext();
}

/***/ }),

/***/ "fa1e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideKeyboard", function() { return hideKeyboard; });
function hideKeyboard() {
  var activeElement = document.activeElement;

  if (activeElement && (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT')) {
    activeElement.blur();
  }
}

/***/ }),

/***/ "fa89":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fae3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./lib/h5/main.js
var main = __webpack_require__("2ef3");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js




/***/ }),

/***/ "fb61":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("90c9");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "fb79":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UniServiceJSBridge) {/* harmony import */ var uni_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f2b3");
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

var mode = {
  SELECTOR: 'selector',
  MULTISELECTOR: 'multiSelector',
  TIME: 'time',
  DATE: 'date',
  REGION: 'region'
};
var fields = {
  YEAR: 'year',
  MONTH: 'month',
  DAY: 'day'
};
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'Picker',
  props: {
    pageId: {
      type: Number,
      default: 0
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
      default: mode.SELECTOR
    },
    fields: {
      type: String,
      default: fields.DAY
    },
    start: {
      type: String,
      default: function _default() {
        if (this.mode === mode.TIME) {
          return '00:00';
        }

        if (this.mode === mode.DATE) {
          var year = new Date().getFullYear() - 150;

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
          var year = new Date().getFullYear() + 150;

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
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      timeArray: [],
      dateArray: [],
      valueArray: [],
      oldValueArray: []
    };
  },
  computed: {
    rangeArray: function rangeArray() {
      var val = this.range;

      switch (this.mode) {
        case mode.SELECTOR:
          return [val];

        case mode.MULTISELECTOR:
          return val;

        case mode.TIME:
          return this.timeArray;

        case mode.DATE:
          {
            var dateArray = this.dateArray;

            switch (this.fields) {
              case fields.YEAR:
                return [dateArray[0]];

              case fields.MONTH:
                return [dateArray[0], dateArray[1]];

              case fields.DAY:
                return [dateArray[0], dateArray[1], dateArray[2]];
            }
          }
      }
    },
    startArray: function startArray() {
      var splitStr = this.mode === mode.DATE ? '-' : ':';
      var array = this.mode === mode.DATE ? this.dateArray : this.timeArray;
      var val = this.start.split(splitStr).map(function (val, i) {
        return array[i].indexOf(val);
      });

      if (val.indexOf(-1) >= 0) {
        val = array.map(function () {
          return 0;
        });
      }

      return val;
    },
    endArray: function endArray() {
      var splitStr = this.mode === mode.DATE ? '-' : ':';
      var array = this.mode === mode.DATE ? this.dateArray : this.timeArray;
      var val = this.end.split(splitStr).map(function (val, i) {
        return array[i].indexOf(val);
      });

      if (val.indexOf(-1) >= 0) {
        val = array.map(function (val) {
          return val.length - 1;
        });
      }

      return val;
    },
    units: function units() {
      switch (this.mode) {
        case mode.DATE:
          return ['年', '月', '日'];

        case mode.TIME:
          return ['时', '分'];

        default:
          return [];
      }
    }
  },
  watch: {
    valueArray: function valueArray(val) {
      var _this = this;

      if (this.mode === mode.TIME || this.mode === mode.DATE) {
        var getValue = this.mode === mode.TIME ? this._getTimeValue : this._getDateValue;
        var valueArray = this.valueArray;
        var startArray = this.startArray;
        var endArray = this.endArray;

        if (this.mode === mode.DATE) {
          var dateArray = this.dateArray;
          var max = dateArray[2].length;
          var day = dateArray[2][valueArray[2]];
          var realDay = new Date("".concat(dateArray[0][valueArray[0]], "/").concat(dateArray[1][valueArray[1]], "/").concat(day)).getDate();
          day = Number(day);

          if (realDay < day) {
            valueArray[2] -= realDay + max - day;
          }
        }

        if (getValue(valueArray) < getValue(startArray)) {
          this._cloneArray(valueArray, startArray);
        } else if (getValue(valueArray) > getValue(endArray)) {
          this._cloneArray(valueArray, endArray);
        }
      }

      val.forEach(function (value, column) {
        if (value !== _this.oldValueArray[column]) {
          _this.oldValueArray[column] = value;

          if (_this.mode === mode.MULTISELECTOR) {
            // 触发 View 层 columnchange 事件
            UniServiceJSBridge.publishHandler(_this.pageId + '-picker-columnchange', {
              column: column,
              value: value
            }, _this.pageId);
          }
        }
      });
    },
    visible: function visible(val) {
      var _this2 = this;

      if (!val) {
        this.$nextTick(function () {
          return _this2._setValue();
        });
      }
    }
  },
  created: function created() {
    this._createTime();

    this._createDate();

    this._setValue();

    this.$watch('value', this._setValue);
    this.$watch('mode', this._setValue);
  },
  methods: {
    _createTime: function _createTime() {
      var hours = [];
      var minutes = [];
      hours.splice(0, hours.length);

      for (var i = 0; i < 24; i++) {
        hours.push((i < 10 ? '0' : '') + i);
      }

      minutes.splice(0, minutes.length);

      for (var _i = 0; _i < 60; _i++) {
        minutes.push((_i < 10 ? '0' : '') + _i);
      }

      this.timeArray.push(hours, minutes);
    },
    _createDate: function _createDate() {
      var years = [];
      var year = new Date().getFullYear();

      for (var i = year - 150, end = year + 150; i <= end; i++) {
        years.push(String(i));
      }

      var months = [];

      for (var _i2 = 1; _i2 <= 12; _i2++) {
        months.push((_i2 < 10 ? '0' : '') + _i2);
      }

      var days = [];

      for (var _i3 = 1; _i3 <= 31; _i3++) {
        days.push((_i3 < 10 ? '0' : '') + _i3);
      }

      this.dateArray.push(years, months, days);
    },
    _getTimeValue: function _getTimeValue(val) {
      return val[0] * 60 + val[1];
    },
    _getDateValue: function _getDateValue(val) {
      return val[0] * 366 + (val[1] || 0) * 31 + (val[2] || 0);
    },

    /**
     * 将右侧数组值同步到左侧（交集部分）
     */
    _cloneArray: function _cloneArray(val1, val2) {
      for (var i = 0; i < val1.length && i < val2.length; i++) {
        val1[i] = val2[i];
      }
    },
    _setValue: function _setValue() {
      var _this3 = this;

      var val = this.value;
      var valueArray;

      switch (this.mode) {
        case mode.SELECTOR:
          valueArray = [val];
          break;

        case mode.MULTISELECTOR:
          valueArray = _toConsumableArray(val);
          break;

        case mode.TIME:
          // 处理默认值为当前时间
          if (this.value === 0) {
            val = Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* formatDateTime */ "a"])({
              mode: mode.TIME
            });
          }

          valueArray = val.split(':').map(function (val, i) {
            return _this3.timeArray[i].indexOf(val);
          });
          break;

        case mode.DATE:
          // 处理默认值为当前日期
          if (this.value === 0) {
            val = Object(uni_shared__WEBPACK_IMPORTED_MODULE_0__[/* formatDateTime */ "a"])({
              mode: mode.DATE
            });
          }

          valueArray = val.split('-').map(function (val, i) {
            return _this3.dateArray[i].indexOf(val);
          });
          break;
      }

      this.oldValueArray = _toConsumableArray(valueArray);
      this.valueArray = _toConsumableArray(valueArray);
    },
    _getValue: function _getValue() {
      var _this4 = this;

      var val = this.valueArray;

      switch (this.mode) {
        case mode.SELECTOR:
          return val[0];

        case mode.MULTISELECTOR:
          return val.map(function (val) {
            return val;
          });

        case mode.TIME:
          return this.valueArray.map(function (val, i) {
            return _this4.timeArray[i][val];
          }).join(':');

        case mode.DATE:
          return this.valueArray.map(function (val, i) {
            return _this4.dateArray[i][val];
          }).join('-');
      }
    },
    _change: function _change() {
      this.$emit('close'); // 触发 View 层 change 事件

      UniServiceJSBridge.publishHandler(this.pageId + '-picker-change', {
        value: this._getValue()
      }, this.pageId);
    },
    _cancel: function _cancel() {
      // 通知父组件修改 visible
      this.$emit('close'); // 触发 View 层 cancel 事件

      UniServiceJSBridge.publishHandler(this.pageId + '-picker-cancel', {}, this.pageId);
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("0dd1")))

/***/ }),

/***/ "fcd8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ff28":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_toast_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("23af");
/* harmony import */ var _node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_toast_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_toast_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_toast_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "ffdb":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ffdc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getJSONP; });
/**
 * JSONP请求
 * @param {string} url 请求的地址
 * @param {object} options 请求的参数
 * @param {Function} success 请求成功的回调
 * @param {Function} error 请求失败的回调
 */
function getJSONP(url, options, success, error) {
  var js = document.createElement('script');
  var callbackKey = options.callback || 'callback';
  var callbackName = '__callback' + Date.now();
  var timeout = options.timeout || 30000;
  var timing;

  function end() {
    clearTimeout(timing);
    delete window[callbackName];
    js.remove();
  }

  window[callbackName] = function (res) {
    if (typeof success === 'function') {
      success(res);
    }

    end();
  };

  js.onerror = function () {
    if (typeof error === 'function') {
      error();
    }

    end();
  };

  timing = setTimeout(function () {
    if (typeof error === 'function') {
      error();
    }

    end();
  }, timeout);
  js.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + callbackKey + '=' + callbackName;
  document.body.appendChild(js);
}

/***/ })

/******/ });
});