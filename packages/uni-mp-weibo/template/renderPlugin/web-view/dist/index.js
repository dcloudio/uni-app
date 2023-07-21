/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "../../../../../../Desktop/my-uniaap-repo/demo-project/weibo-uni-app-demo/renderPlugin/web-view/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../../../../Desktop/my-uniaap-repo/demo-project/weibo-uni-app-demo/renderPlugin/web-view/src/index.js":
/*!*******************************************************************************************************************!*\
  !*** /Users/zhangmeng8/Desktop/my-uniaap-repo/demo-project/weibo-uni-app-demo/renderPlugin/web-view/src/index.js ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WebviewElement; });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var WebviewElement = /*#__PURE__*/function (_window$Component) {
  _inherits(WebviewElement, _window$Component);

  var _super = _createSuper(WebviewElement);

  function WebviewElement() {
    _classCallCheck(this, WebviewElement);

    return _super.apply(this, arguments);
  }

  _createClass(WebviewElement, [{
    key: "render",
    value: function render() {
      var _this = this;

      var el = document.createElement('iframe-container');
      this.iframe = document.createElement('iframe');
      el.appendChild(this.iframe);
      this.hasLoad = false;
      this.iframe.addEventListener('load', function () {
        _this.hasLoad = true;

        if (_this.mountedQueue && _this.mountedQueue.length) {
          _this.mountedQueue.map(function (b) {
            return b();
          });

          _this.mountedQueue.splice(0, 100000);
        }
      });

      this.messageCallback = function (e) {
        if (e.source === _this.iframe.contentWindow) {
          _this.dispatch(_this.iframe, 'message', {
            detail: {
              data: e.data
            }
          });
        }
      };

      this.iframe_class = '';
      return el;
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(name, value) {
      var _this2 = this;

      if (name === 'src') {
        this.iframe.setAttribute('src', value);

        _get(_getPrototypeOf(WebviewElement.prototype), "setAttribute", this).call(this, name, value);
      } else if (name === 'data') {
        this.doOnLoad(function () {
          _this2.iframe.contentWindow.postMessage(value, '*');
        });
      } else {
        this.iframe.setAttribute(name, value);
      }

      if (name === 'class') {
        this.iframe_class = value;
      }
    }
  }, {
    key: "removeAttribute",
    value: function removeAttribute(name) {
      if (name === 'src') {
        _get(_getPrototypeOf(WebviewElement.prototype), "removeAttribute", this).call(this, name);
      } else {
        this.iframe.removeAttribute(name);
      }

      if (name === 'class') {
        this.iframe_class = '';
      }
    }
  }, {
    key: "setStyle",
    value: function setStyle(name, value) {
      // this.iframe.setStyle(name, value)
      if (name in this.iframe.style) {
        this.iframe.style[name] = value;
      } else {
        console.error("setStyle ".concat(name, ": ").concat(value, " for web-view is not support"));
      }
    }
  }, {
    key: "setClass",
    value: function setClass(name, value) {
      // this.iframe.setClass(name, value)
      var classNames = this.iframe_class ? "".concat(this.iframe_class, " ").concat(value) : "".concat(value);
      this.iframe.setAttribute('class', classNames);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(type, listener, options) {
      if (type === 'iframeSrcChange') {
        _get(_getPrototypeOf(WebviewElement.prototype), "addEventListener", this).call(this, type, listener, options);
      } else {
        this.iframe.addEventListener(type, listener, options);
      }

      if (type === 'message') {
        window.addEventListener('message', this.messageCallback, false);
      }
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(type) {
      if (type === 'iframeSrcChange') {
        _get(_getPrototypeOf(WebviewElement.prototype), "removeEventListener", this).call(this, type);
      } else {
        this.iframe.removeEventListener(type);
      }

      if (type === 'message') {
        window.removeEventListener('message', this.messageCallback);
      }
    }
  }, {
    key: "unMounted",
    value: function unMounted() {
      window.removeEventListener('message', this.messageCallback);
    }
  }, {
    key: "doOnLoad",
    value: function doOnLoad(blk) {
      this.mountedQueue = this.mountedQueue || [];

      if (this.hasLoad) {
        blk();
      } else {
        this.mountedQueue.push(blk);
      }
    }
  }]);

  return WebviewElement;
}(window.Component); // 默认注册iframe



window.ComponentManager.registerComponents({
  'wbx-web-view': WebviewElement
});

/***/ })

/******/ });