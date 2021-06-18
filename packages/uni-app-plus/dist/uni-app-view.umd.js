(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(require("vue")) : typeof define === "function" && define.amd ? define(["vue"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.Vue));
})(this, function(vue) {
  "use strict";
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var dist = { exports: {} };
  (function(module2, exports2) {
    !function(t, e) {
      module2.exports = e();
    }(typeof self != "undefined" ? self : commonjsGlobal, function() {
      return function(t) {
        var e = {};
        function n(r) {
          if (e[r])
            return e[r].exports;
          var o = e[r] = { i: r, l: false, exports: {} };
          return t[r].call(o.exports, o, o.exports, n), o.l = true, o.exports;
        }
        return n.m = t, n.c = e, n.d = function(t2, e2, r) {
          n.o(t2, e2) || Object.defineProperty(t2, e2, { enumerable: true, get: r });
        }, n.r = function(t2) {
          typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
        }, n.t = function(t2, e2) {
          if (1 & e2 && (t2 = n(t2)), 8 & e2)
            return t2;
          if (4 & e2 && typeof t2 == "object" && t2 && t2.__esModule)
            return t2;
          var r = Object.create(null);
          if (n.r(r), Object.defineProperty(r, "default", { enumerable: true, value: t2 }), 2 & e2 && typeof t2 != "string")
            for (var o in t2)
              n.d(r, o, function(e3) {
                return t2[e3];
              }.bind(null, o));
          return r;
        }, n.n = function(t2) {
          var e2 = t2 && t2.__esModule ? function() {
            return t2.default;
          } : function() {
            return t2;
          };
          return n.d(e2, "a", e2), e2;
        }, n.o = function(t2, e2) {
          return Object.prototype.hasOwnProperty.call(t2, e2);
        }, n.p = "", n(n.s = 1);
      }([function(t, e, n) {
        (function(t2) {
          n.d(e, "a", function() {
            return c;
          });
          const r = (t3) => {
            const e2 = Object.create(null);
            return (n2) => e2[n2] || (e2[n2] = t3(n2));
          }, u = r((t3) => t3.charAt(0).toUpperCase() + t3.slice(1)), c = r((t3) => t3 ? "on" + u(t3) : "");
        }).call(this, n(2));
      }, function(t, e, n) {
        t.exports = n(3);
      }, function(t, e) {
        var n;
        n = function() {
          return this;
        }();
        try {
          n = n || new Function("return this")();
        } catch (t2) {
          typeof window == "object" && (n = window);
        }
        t.exports = n;
      }, function(t, e, n) {
        n.r(e), n.d(e, "default", function() {
          return j;
        });
        var r = n(0), o = /-(\w)/g, i = function(t2) {
          return t2.replace(o, function(t3, e2) {
            return e2 ? e2.toUpperCase() : "";
          });
        }, u = /\B([A-Z])/g, c = function(t2) {
          return t2.replace(u, "-$1").toLowerCase();
        };
        function a(t2, e2) {
          if (t2) {
            var n2 = t2.$options[e2] || [];
            Array.isArray(n2) || (n2 = [n2]), n2.forEach(function(e3) {
              e3.call(t2);
            });
          }
        }
        function f(t2, e2) {
          return new CustomEvent(t2, { bubbles: false, cancelable: false, detail: e2.length === 1 ? e2[0] : e2 });
        }
        var s = function(t2) {
          return /function Boolean/.test(String(t2));
        }, l = function(t2) {
          return /function Number/.test(String(t2));
        };
        function p(t2, e2) {
          if (t2.nodeType === 3)
            return t2.data.trim() ? t2.data : null;
          if (t2.nodeType === 1) {
            var n2 = { attrs: d(t2), domProps: { innerHTML: t2.innerHTML } };
            return n2.attrs.slot && (n2.slot = n2.attrs.slot, delete n2.attrs.slot), e2(t2.tagName, n2);
          }
          return null;
        }
        function d(t2) {
          for (var e2 = {}, n2 = 0, r2 = t2.attributes.length; n2 < r2; n2++) {
            var o2 = t2.attributes[n2];
            e2[o2.nodeName] = o2.nodeValue;
          }
          return e2;
        }
        function y(t2) {
          return (y = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && typeof Symbol == "function" && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function b(t2, e2) {
          for (var n2 = 0; n2 < e2.length; n2++) {
            var r2 = e2[n2];
            r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t2, r2.key, r2);
          }
        }
        function v(t2, e2) {
          return !e2 || y(e2) !== "object" && typeof e2 != "function" ? h(t2) : e2;
        }
        function h(t2) {
          if (t2 === void 0)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t2;
        }
        function m(t2) {
          var e2 = typeof Map == "function" ? new Map() : void 0;
          return (m = function(t3) {
            if (t3 === null || (n2 = t3, Function.toString.call(n2).indexOf("[native code]") === -1))
              return t3;
            var n2;
            if (typeof t3 != "function")
              throw new TypeError("Super expression must either be null or a function");
            if (e2 !== void 0) {
              if (e2.has(t3))
                return e2.get(t3);
              e2.set(t3, r2);
            }
            function r2() {
              return _(t3, arguments, O(this).constructor);
            }
            return r2.prototype = Object.create(t3.prototype, { constructor: { value: r2, enumerable: false, writable: true, configurable: true } }), w(r2, t3);
          })(t2);
        }
        function _(t2, e2, n2) {
          return (_ = g() ? Reflect.construct : function(t3, e3, n3) {
            var r2 = [null];
            r2.push.apply(r2, e3);
            var o2 = new (Function.bind.apply(t3, r2))();
            return n3 && w(o2, n3.prototype), o2;
          }).apply(null, arguments);
        }
        function g() {
          if (typeof Reflect == "undefined" || !Reflect.construct)
            return false;
          if (Reflect.construct.sham)
            return false;
          if (typeof Proxy == "function")
            return true;
          try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
            })), true;
          } catch (t2) {
            return false;
          }
        }
        function w(t2, e2) {
          return (w = Object.setPrototypeOf || function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function O(t2) {
          return (O = Object.setPrototypeOf ? Object.getPrototypeOf : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        function j(t2, e2, n2, o2) {
          var u2, d2, y2, _2 = t2, j2 = false;
          var x = function(t3) {
            !function(t4, e3) {
              if (typeof e3 != "function" && e3 !== null)
                throw new TypeError("Super expression must either be null or a function");
              t4.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t4, writable: true, configurable: true } }), e3 && w(t4, e3);
            }(C, t3);
            var c2, m2, x2, A, P = (c2 = C, m2 = g(), function() {
              var t4, e3 = O(c2);
              if (m2) {
                var n3 = O(this).constructor;
                t4 = Reflect.construct(e3, arguments, n3);
              } else
                t4 = e3.apply(this, arguments);
              return v(this, t4);
            });
            function C() {
              var t4;
              !function(t5, e3) {
                if (!(t5 instanceof e3))
                  throw new TypeError("Cannot call a class as a function");
              }(this, C), (t4 = P.call(this))._wrapper = void 0, t4._component = void 0, t4._props = void 0, t4._slotChildren = void 0, t4._mounted = false;
              var r2 = t4.createEventProxies(_2.emits);
              t4._props = {}, t4._slotChildren = [];
              var o3 = h(t4);
              return t4._wrapper = e2({ render: function() {
                var t5 = Object.assign({}, o3._props, r2);
                return delete t5.dataVApp, n2(_2, t5, function() {
                  return o3._slotChildren;
                });
              }, mounted: function() {
                o3._mounted = true;
              }, unmounted: function() {
                o3._mounted = false;
              } }), new MutationObserver(function(e3) {
                for (var n3 = 0; n3 < e3.length; n3++) {
                  var r3 = e3[n3];
                  j2 && r3.type === "attributes" && r3.target === h(t4) ? r3.attributeName && t4.syncAttribute(r3.attributeName) : true;
                }
              }).observe(h(t4), { childList: true, subtree: true, characterData: true, attributes: true }), t4;
            }
            return x2 = C, (A = [{ key: "createEventProxies", value: function(t4) {
              var e3 = this, n3 = {};
              return t4 && t4.forEach(function(t5) {
                var o3 = Object(r.a)(i(t5));
                n3[o3] = function() {
                  for (var n4 = arguments.length, r2 = new Array(n4), o4 = 0; o4 < n4; o4++)
                    r2[o4] = arguments[o4];
                  e3.dispatchEvent(f(t5, r2));
                };
              }), n3;
            } }, { key: "syncAttribute", value: function(t4) {
              var e3, n3 = i(t4), r2 = void 0;
              this.hasOwnProperty(t4) ? r2 = this[t4] : this.hasAttribute(t4) && (r2 = this.getAttribute(t4)), this._props[n3] = function(t5, e4) {
                var n4 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r3 = n4.type;
                if (s(r3))
                  return t5 === "true" || t5 === "false" ? t5 === "true" : t5 === "" || t5 === e4 || t5 != null;
                if (l(r3)) {
                  var o3 = parseFloat(t5);
                  return isNaN(o3) ? t5 : o3;
                }
                return t5;
              }(r2, t4, y2[n3]), (e3 = this._component) === null || e3 === void 0 || e3.$forceUpdate();
            } }, { key: "syncSlots", value: function() {
              var t4;
              this._slotChildren = function(t5, e3) {
                for (var n3 = [], r2 = 0, o3 = t5.length; r2 < o3; r2++)
                  n3.push(p(t5[r2], e3));
                return n3;
              }(this.childNodes, n2), (t4 = this._component) === null || t4 === void 0 || t4.$forceUpdate();
            } }, { key: "syncInitialAttributes", value: function() {
              var t4, e3 = this;
              this._props = (t4 = {}, d2.forEach(function(e4) {
                t4[e4] = void 0;
              }), t4), u2.forEach(function(t5) {
                e3.syncAttribute(t5);
              });
            } }, { key: "connectedCallback", value: function() {
              this._component && this._mounted ? a(this._component, "mounted") : (j2 && this.syncInitialAttributes(), this.syncSlots(), this._component = this._wrapper.mount(this)), (o2 == null ? void 0 : o2.connectedCallback) && o2.connectedCallback.bind(this)();
            } }, { key: "disconnectedCallback", value: function() {
              a(this._component, "unmounted");
            } }]) && b(x2.prototype, A), C;
          }(m(HTMLElement));
          return function() {
            if (!j2) {
              var t3 = Array.isArray(_2.props) ? _2.props : Object.keys(_2.props || {});
              u2 = t3.map(c), d2 = t3.map(i);
              var e3 = Array.isArray(_2.props) ? {} : _2.props || {};
              y2 = d2.reduce(function(n3, r2, o3) {
                return n3[r2] = e3[t3[o3]], n3;
              }, {}), j2 = true;
            }
          }(), x;
        }
      }]).default;
    });
  })(dist);
  var wrapper = /* @__PURE__ */ getDefaultExportFromCjs(dist.exports);
  var button = "uni-button {\n  position: relative;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 14px;\n  padding-right: 14px;\n  box-sizing: border-box;\n  font-size: 18px;\n  text-align: center;\n  text-decoration: none;\n  line-height: 2.55555556;\n  border-radius: 5px;\n  -webkit-tap-highlight-color: transparent;\n  overflow: hidden;\n  color: #000000;\n  background-color: #f8f8f8;\n  cursor: pointer;\n}\n\nuni-button[hidden] {\n  display: none !important;\n}\n\nuni-button:after {\n  content: ' ';\n  width: 200%;\n  height: 200%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  transform: scale(0.5);\n  transform-origin: 0 0;\n  box-sizing: border-box;\n  border-radius: 10px;\n}\n\nuni-button[native] {\n  padding-left: 0;\n  padding-right: 0;\n}\n\nuni-button[native] .uni-button-cover-view-wrapper {\n  border: inherit;\n  border-color: inherit;\n  border-radius: inherit;\n  background-color: inherit;\n}\n\nuni-button[native] .uni-button-cover-view-inner {\n  padding-left: 14px;\n  padding-right: 14px;\n}\n\nuni-button uni-cover-view {\n  line-height: inherit;\n  white-space: inherit;\n}\n\nuni-button[type='default'] {\n  color: #000000;\n  background-color: #f8f8f8;\n}\n\nuni-button[type='primary'] {\n  color: #ffffff;\n  background-color: #007aff;\n}\n\nuni-button[type='warn'] {\n  color: #ffffff;\n  background-color: #e64340;\n}\n\nuni-button[disabled] {\n  color: rgba(255, 255, 255, 0.6);\n  cursor: not-allowed;\n}\n\nuni-button[disabled][type='default'],\nuni-button[disabled]:not([type]) {\n  color: rgba(0, 0, 0, 0.3);\n  background-color: #f7f7f7;\n}\n\nuni-button[disabled][type='primary'] {\n  background-color: rgba(0, 122, 255, 0.6);\n}\n\nuni-button[disabled][type='warn'] {\n  background-color: #ec8b89;\n}\n\nuni-button[type='primary'][plain] {\n  color: #007aff;\n  border: 1px solid #007aff;\n  background-color: transparent;\n}\n\nuni-button[type='primary'][plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\n\nuni-button[type='primary'][plain]:after {\n  border-width: 0;\n}\n\nuni-button[type='default'][plain] {\n  color: #353535;\n  border: 1px solid #353535;\n  background-color: transparent;\n}\n\nuni-button[type='default'][plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\n\nuni-button[type='default'][plain]:after {\n  border-width: 0;\n}\n\nuni-button[plain] {\n  color: #353535;\n  border: 1px solid #353535;\n  background-color: transparent;\n}\n\nuni-button[plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\n\nuni-button[plain]:after {\n  border-width: 0;\n}\n\nuni-button[plain][native] .uni-button-cover-view-inner {\n  padding: 0;\n}\n\nuni-button[type='warn'][plain] {\n  color: #e64340;\n  border: 1px solid #e64340;\n  background-color: transparent;\n}\n\nuni-button[type='warn'][plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\n\nuni-button[type='warn'][plain]:after {\n  border-width: 0;\n}\n\nuni-button[size='mini'] {\n  display: inline-block;\n  line-height: 2.3;\n  font-size: 13px;\n  padding: 0 1.34em;\n}\n\nuni-button[size='mini'][native] {\n  padding: 0;\n}\n\nuni-button[size='mini'][native] .uni-button-cover-view-inner {\n  padding: 0 1.34em;\n}\n\nuni-button[loading]:not([disabled]) {\n  cursor: progress;\n}\n\nuni-button[loading]:before {\n  content: ' ';\n  display: inline-block;\n  width: 18px;\n  height: 18px;\n  vertical-align: middle;\n  animation: uni-loading 1s steps(12, end) infinite;\n  background-size: 100%;\n}\n\nuni-button[loading][type='primary'] {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #0062cc;\n}\n\nuni-button[loading][type='primary'][plain] {\n  color: #007aff;\n  background-color: transparent;\n}\n\nuni-button[loading][type='default'] {\n  color: rgba(0, 0, 0, 0.6);\n  background-color: #dedede;\n}\n\nuni-button[loading][type='default'][plain] {\n  color: #353535;\n  background-color: transparent;\n}\n\nuni-button[loading][type='warn'] {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #ce3c39;\n}\n\nuni-button[loading][type='warn'][plain] {\n  color: #e64340;\n  background-color: transparent;\n}\n\nuni-button[loading][native]:before {\n  content: none;\n}\n\n.button-hover {\n  color: rgba(0, 0, 0, 0.6);\n  background-color: #dedede;\n}\n\n.button-hover[plain] {\n  color: rgba(53, 53, 53, 0.6);\n  border-color: rgba(53, 53, 53, 0.6);\n  background-color: transparent;\n}\n\n.button-hover[type='primary'] {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #0062cc;\n}\n\n.button-hover[type='primary'][plain] {\n  color: rgba(26, 173, 25, 0.6);\n  border-color: rgba(26, 173, 25, 0.6);\n  background-color: transparent;\n}\n\n.button-hover[type='default'] {\n  color: rgba(0, 0, 0, 0.6);\n  background-color: #dedede;\n}\n\n.button-hover[type='default'][plain] {\n  color: rgba(53, 53, 53, 0.6);\n  border-color: rgba(53, 53, 53, 0.6);\n  background-color: transparent;\n}\n\n.button-hover[type='warn'] {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #ce3c39;\n}\n\n.button-hover[type='warn'][plain] {\n  color: rgba(230, 67, 64, 0.6);\n  border-color: rgba(230, 67, 64, 0.6);\n  background-color: transparent;\n}\n";
  const extend = Object.assign;
  const isString = (val) => typeof val === "string";
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const isPlainObject = (val) => toTypeString(val) === "[object Object]";
  function getCustomDataset(el) {
    return extend({}, el.dataset, el.__uniDataset);
  }
  function normalizeTarget(el) {
    const { id, offsetTop, offsetLeft } = el;
    return {
      id,
      dataset: getCustomDataset(el),
      offsetTop,
      offsetLeft
    };
  }
  const PRIMARY_COLOR = "#007aff";
  const isObject = (val) => val !== null && typeof val === "object";
  class BaseFormatter {
    constructor() {
      this._caches = Object.create(null);
    }
    interpolate(message, values) {
      if (!values) {
        return [message];
      }
      let tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format.length) {
      let char = format[position++];
      if (char === "{") {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format[position++];
        while (char !== void 0 && char !== "}") {
          sub += char;
          char = format[position++];
        }
        const isClosed = char === "}";
        const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type });
      } else if (char === "%") {
        if (format[position] !== "{") {
          text += char;
        }
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index < tokens.length) {
      const token = tokens[index];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode === "named") {
            compiled.push(values[token.value]);
          }
          break;
      }
      index++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") !== -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") !== -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({ locale, fallbackLocale, messages, watcher, formater }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater || defaultFormatter;
      this.messages = messages || {};
      this.setLocale(locale);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      this.watchers.forEach((watcher) => {
        watcher(this.locale, oldLocale);
      });
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn) {
      const index = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index, 1);
      };
    }
    add(locale, message) {
      if (this.messages[locale]) {
        Object.assign(this.messages[locale], message);
      } else {
        this.messages[locale] = message;
      }
    }
    t(key, locale, values) {
      let message = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message[key], values).join("");
    }
  }
  function initLocaleWatcher(appVm, i18n2) {
    appVm.$i18n && appVm.$i18n.vm.$watch("locale", (newLocale) => {
      i18n2.setLocale(newLocale);
    }, {
      immediate: true
    });
  }
  function initVueI18n(locale = LOCALE_EN, messages = {}, fallbackLocale = LOCALE_EN) {
    if (typeof locale !== "string") {
      [locale, messages] = [messages, locale];
    }
    if (typeof locale !== "string") {
      locale = fallbackLocale;
    }
    const i18n2 = new I18n({
      locale: locale || fallbackLocale,
      fallbackLocale,
      messages
    });
    let t = (key, values) => {
      if (typeof getApp !== "function") {
        t = function(key2, values2) {
          return i18n2.t(key2, values2);
        };
      } else {
        const appVm = getApp().$vm;
        if (!appVm.$t || !appVm.$i18n) {
          t = function(key2, values2) {
            return i18n2.t(key2, values2);
          };
        } else {
          initLocaleWatcher(appVm, i18n2);
          t = function(key2, values2) {
            const $i18n = appVm.$i18n;
            const silentTranslationWarn = $i18n.silentTranslationWarn;
            $i18n.silentTranslationWarn = true;
            const msg = appVm.$t(key2, values2);
            $i18n.silentTranslationWarn = silentTranslationWarn;
            if (msg !== key2) {
              return msg;
            }
            return i18n2.t(key2, $i18n.locale, values2);
          };
        }
      }
      return t(key, values);
    };
    return {
      i18n: i18n2,
      t(key, values) {
        return t(key, values);
      },
      add(locale2, message) {
        return i18n2.add(locale2, message);
      },
      getLocale() {
        return i18n2.getLocale();
      },
      setLocale(newLocale) {
        return i18n2.setLocale(newLocale);
      }
    };
  }
  let i18n;
  function useI18n() {
    if (!i18n) {
      let language;
      {
        {
          language = navigator.language;
        }
      }
      i18n = initVueI18n(language);
    }
    return i18n;
  }
  const E = function() {
  };
  E.prototype = {
    on: function(name, callback, ctx) {
      var e = this.e || (this.e = {});
      (e[name] || (e[name] = [])).push({
        fn: callback,
        ctx
      });
      return this;
    },
    once: function(name, callback, ctx) {
      var self2 = this;
      function listener() {
        self2.off(name, listener);
        callback.apply(ctx, arguments);
      }
      listener._ = callback;
      return this.on(name, listener, ctx);
    },
    emit: function(name) {
      var data = [].slice.call(arguments, 1);
      var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
      var i = 0;
      var len = evtArr.length;
      for (i; i < len; i++) {
        evtArr[i].fn.apply(evtArr[i].ctx, data);
      }
      return this;
    },
    off: function(name, callback) {
      var e = this.e || (this.e = {});
      var evts = e[name];
      var liveEvents = [];
      if (evts && callback) {
        for (var i = 0, len = evts.length; i < len; i++) {
          if (evts[i].fn !== callback && evts[i].fn._ !== callback)
            liveEvents.push(evts[i]);
        }
      }
      liveEvents.length ? e[name] = liveEvents : delete e[name];
      return this;
    }
  };
  function initBridge(namespace) {
    const emitter = new E();
    return extend(emitter, {
      subscribe(event, callback) {
        emitter.on(`${namespace}.${event}`, callback);
      },
      unsubscribe(event, callback) {
        emitter.off(`${namespace}.${event}`, callback);
      },
      subscribeHandler(event, args, pageId) {
        {
          console.log(`[${namespace}][subscribeHandler][${Date.now()}]:${event}, ${JSON.stringify(args)}, ${pageId}`);
        }
        emitter.emit(`${namespace}.${event}`, args, pageId);
      }
    });
  }
  function PolySymbol(name) {
    return Symbol("[uni-app]: " + name);
  }
  function rpx2px(str) {
    if (typeof str === "string") {
      const res = parseInt(str) || 0;
      if (str.indexOf("rpx") !== -1 || str.indexOf("upx") !== -1) {
        return uni.upx2px(res);
      }
      return res;
    }
    return str;
  }
  const ICON_PATH_CANCEL = "M20.928 10.176l-4.928 4.928-4.928-4.928-0.896 0.896 4.928 4.928-4.928 4.928 0.896 0.896 4.928-4.928 4.928 4.928 0.896-0.896-4.928-4.928 4.928-4.928-0.896-0.896zM16 2.080q-3.776 0-7.040 1.888-3.136 1.856-4.992 4.992-1.888 3.264-1.888 7.040t1.888 7.040q1.856 3.136 4.992 4.992 3.264 1.888 7.040 1.888t7.040-1.888q3.136-1.856 4.992-4.992 1.888-3.264 1.888-7.040t-1.888-7.040q-1.856-3.136-4.992-4.992-3.264-1.888-7.040-1.888zM16 28.64q-3.424 0-6.4-1.728-2.848-1.664-4.512-4.512-1.728-2.976-1.728-6.4t1.728-6.4q1.664-2.848 4.512-4.512 2.976-1.728 6.4-1.728t6.4 1.728q2.848 1.664 4.512 4.512 1.728 2.976 1.728 6.4t-1.728 6.4q-1.664 2.848-4.512 4.512-2.976 1.728-6.4 1.728z";
  const ICON_PATH_CLEAR = "M16 0q-4.352 0-8.064 2.176-3.616 2.144-5.76 5.76-2.176 3.712-2.176 8.064t2.176 8.064q2.144 3.616 5.76 5.76 3.712 2.176 8.064 2.176t8.064-2.176q3.616-2.144 5.76-5.76 2.176-3.712 2.176-8.064t-2.176-8.064q-2.144-3.616-5.76-5.76-3.712-2.176-8.064-2.176zM22.688 21.408q0.32 0.32 0.304 0.752t-0.336 0.736-0.752 0.304-0.752-0.32l-5.184-5.376-5.376 5.184q-0.32 0.32-0.752 0.304t-0.736-0.336-0.304-0.752 0.32-0.752l5.376-5.184-5.184-5.376q-0.32-0.32-0.304-0.752t0.336-0.752 0.752-0.304 0.752 0.336l5.184 5.376 5.376-5.184q0.32-0.32 0.752-0.304t0.752 0.336 0.304 0.752-0.336 0.752l-5.376 5.184 5.184 5.376z";
  const ICON_PATH_DOWNLOAD = "M15.808 1.696q-3.776 0-7.072 1.984-3.2 1.888-5.088 5.152-1.952 3.392-1.952 7.36 0 3.776 1.952 7.072 1.888 3.2 5.088 5.088 3.296 1.952 7.072 1.952 3.968 0 7.36-1.952 3.264-1.888 5.152-5.088 1.984-3.296 1.984-7.072 0-4-1.984-7.36-1.888-3.264-5.152-5.152-3.36-1.984-7.36-1.984zM20.864 18.592l-3.776 4.928q-0.448 0.576-1.088 0.576t-1.088-0.576l-3.776-4.928q-0.448-0.576-0.24-0.992t0.944-0.416h2.976v-8.928q0-0.256 0.176-0.432t0.4-0.176h1.216q0.224 0 0.4 0.176t0.176 0.432v8.928h2.976q0.736 0 0.944 0.416t-0.24 0.992z";
  const ICON_PATH_INFO = "M15.808 0.128q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.176 3.776-2.176 8.16 0 4.224 2.176 7.872 2.080 3.552 5.632 5.632 3.648 2.176 7.872 2.176 4.384 0 8.16-2.176 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.416-2.176-8.16-2.112-3.616-5.728-5.728-3.744-2.176-8.16-2.176zM16.864 23.776q0 0.064-0.064 0.064h-1.568q-0.096 0-0.096-0.064l-0.256-11.328q0-0.064 0.064-0.064h2.112q0.096 0 0.064 0.064l-0.256 11.328zM16 10.88q-0.576 0-0.976-0.4t-0.4-0.96 0.4-0.96 0.976-0.4 0.976 0.4 0.4 0.96-0.4 0.96-0.976 0.4z";
  const ICON_PATH_SEARCH = "M20.928 22.688q-1.696 1.376-3.744 2.112-2.112 0.768-4.384 0.768-3.488 0-6.464-1.728-2.88-1.696-4.576-4.608-1.76-2.976-1.76-6.464t1.76-6.464q1.696-2.88 4.576-4.576 2.976-1.76 6.464-1.76t6.464 1.76q2.912 1.696 4.608 4.576 1.728 2.976 1.728 6.464 0 2.272-0.768 4.384-0.736 2.048-2.112 3.744l9.312 9.28-1.824 1.824-9.28-9.312zM12.8 23.008q2.784 0 5.184-1.376 2.304-1.376 3.68-3.68 1.376-2.4 1.376-5.184t-1.376-5.152q-1.376-2.336-3.68-3.68-2.4-1.408-5.184-1.408t-5.152 1.408q-2.336 1.344-3.68 3.68-1.408 2.368-1.408 5.152t1.408 5.184q1.344 2.304 3.68 3.68 2.368 1.376 5.152 1.376zM12.8 23.008v0z";
  const ICON_PATH_SUCCESS_NO_CIRCLE = "M1.952 18.080q-0.32-0.352-0.416-0.88t0.128-0.976l0.16-0.352q0.224-0.416 0.64-0.528t0.8 0.176l6.496 4.704q0.384 0.288 0.912 0.272t0.88-0.336l17.312-14.272q0.352-0.288 0.848-0.256t0.848 0.352l-0.416-0.416q0.32 0.352 0.32 0.816t-0.32 0.816l-18.656 18.912q-0.32 0.352-0.8 0.352t-0.8-0.32l-7.936-8.064z";
  const ICON_PATH_SUCCESS = "M15.808 0.16q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM24.832 11.328l-11.264 11.104q-0.032 0.032-0.112 0.032t-0.112-0.032l-5.216-5.376q-0.096-0.128 0-0.288l0.704-0.96q0.032-0.064 0.112-0.064t0.112 0.032l4.256 3.264q0.064 0.032 0.144 0.032t0.112-0.032l10.336-8.608q0.064-0.064 0.144-0.064t0.112 0.064l0.672 0.672q0.128 0.128 0 0.224z";
  const ICON_PATH_WAITING = "M15.84 0.096q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM23.008 21.92l-0.512 0.896q-0.096 0.128-0.224 0.064l-8-3.808q-0.096-0.064-0.16-0.128-0.128-0.096-0.128-0.288l0.512-12.096q0-0.064 0.048-0.112t0.112-0.048h1.376q0.064 0 0.112 0.048t0.048 0.112l0.448 10.848 6.304 4.256q0.064 0.064 0.080 0.128t-0.016 0.128z";
  const ICON_PATH_WARN = "M15.808 0.16q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM15.136 8.672h1.728q0.128 0 0.224 0.096t0.096 0.256l-0.384 10.24q0 0.064-0.048 0.112t-0.112 0.048h-1.248q-0.096 0-0.144-0.048t-0.048-0.112l-0.384-10.24q0-0.16 0.096-0.256t0.224-0.096zM16 23.328q-0.48 0-0.832-0.352t-0.352-0.848 0.352-0.848 0.832-0.352 0.832 0.352 0.352 0.848-0.352 0.848-0.832 0.352z";
  function createSvgIconVNode(path, color = "#000", size = 27) {
    return vue.createVNode("svg", {
      width: size,
      height: size,
      viewBox: "0 0 32 32"
    }, [
      vue.createVNode("path", {
        d: path,
        fill: color
      }, null, 8, ["d", "fill"])
    ], 8, ["width", "height"]);
  }
  function useCurrentPageId() {
    return vue.getCurrentInstance().root.proxy.$page.id;
  }
  const callbacks = {};
  function createCallbacks(namespace) {
    let scopedCallbacks = callbacks[namespace];
    if (!scopedCallbacks) {
      scopedCallbacks = {
        id: 1,
        callbacks: Object.create(null)
      };
      callbacks[namespace] = scopedCallbacks;
    }
    return {
      get(id) {
        return scopedCallbacks.callbacks[id];
      },
      pop(id) {
        const callback = scopedCallbacks.callbacks[id];
        if (callback) {
          delete scopedCallbacks.callbacks[id];
        }
        return callback;
      },
      push(callback) {
        const id = scopedCallbacks.id++;
        scopedCallbacks.callbacks[id] = callback;
        return id;
      }
    };
  }
  const ServiceJSBridge = /* @__PURE__ */ extend(initBridge("service"), {
    invokeOnCallback(name, res) {
      return UniServiceJSBridge.emit("api." + name, res);
    }
  });
  function converPx(value) {
    if (/^-?\d+[ur]px$/i.test(value)) {
      return value.replace(/(^-?\d+)[ur]px$/i, (text, num) => {
        return `${uni.upx2px(parseFloat(num))}px`;
      });
    } else if (/^-?[\d\.]+$/.test(value)) {
      return `${value}px`;
    }
    return value || "";
  }
  function converType(type) {
    return type.replace(/[A-Z]/g, (text) => {
      return `-${text.toLowerCase()}`;
    }).replace("webkit", "-webkit");
  }
  function getStyle(action) {
    const animateTypes1 = [
      "matrix",
      "matrix3d",
      "scale",
      "scale3d",
      "rotate3d",
      "skew",
      "translate",
      "translate3d"
    ];
    const animateTypes2 = [
      "scaleX",
      "scaleY",
      "scaleZ",
      "rotate",
      "rotateX",
      "rotateY",
      "rotateZ",
      "skewX",
      "skewY",
      "translateX",
      "translateY",
      "translateZ"
    ];
    const animateTypes3 = ["opacity", "background-color"];
    const animateTypes4 = ["width", "height", "left", "right", "top", "bottom"];
    const animates = action.animates;
    const option = action.option;
    const transition = option.transition;
    const style = {};
    const transform = [];
    animates.forEach((animate) => {
      let type = animate.type;
      let args = [...animate.args];
      if (animateTypes1.concat(animateTypes2).includes(type)) {
        if (type.startsWith("rotate") || type.startsWith("skew")) {
          args = args.map((value) => parseFloat(value) + "deg");
        } else if (type.startsWith("translate")) {
          args = args.map(converPx);
        }
        if (animateTypes2.indexOf(type) >= 0) {
          args.length = 1;
        }
        transform.push(`${type}(${args.join(",")})`);
      } else if (animateTypes3.concat(animateTypes4).includes(args[0])) {
        type = args[0];
        const value = args[1];
        style[type] = animateTypes4.includes(type) ? converPx(value) : value;
      }
    });
    style.transform = style.webkitTransform = transform.join(" ");
    style.transition = style.webkitTransition = Object.keys(style).map((type) => `${converType(type)} ${transition.duration}ms ${transition.timingFunction} ${transition.delay}ms`).join(",");
    style.transformOrigin = style.webkitTransformOrigin = option.transformOrigin;
    return style;
  }
  function startAnimation(context) {
    const animation2 = context.animation;
    if (!animation2 || !animation2.actions || !animation2.actions.length) {
      return;
    }
    let index = 0;
    const actions = animation2.actions;
    const length = animation2.actions.length;
    function animate() {
      const action = actions[index];
      const transition = action.option.transition;
      const style = getStyle(action);
      Object.keys(style).forEach((key) => {
        context.$el.style[key] = style[key];
      });
      index += 1;
      if (index < length) {
        setTimeout(animate, transition.duration + transition.delay);
      }
    }
    setTimeout(() => {
      animate();
    }, 0);
  }
  var animation = {
    props: ["animation"],
    watch: {
      animation: {
        deep: true,
        handler() {
          startAnimation(this);
        }
      }
    },
    mounted() {
      startAnimation(this);
    }
  };
  const defineBuiltInComponent = (options) => {
    const { props: props2, mixins } = options;
    if (!props2 || !props2.animation) {
      (mixins || (options.mixins = [])).push(animation);
    }
    return defineSystemComponent(options);
  };
  const defineSystemComponent = (options) => {
    options.compatConfig = {
      MODE: 3
    };
    return vue.defineComponent(options);
  };
  const hoverProps = {
    hoverClass: {
      type: String,
      default: "none"
    },
    hoverStopPropagation: {
      type: Boolean,
      default: false
    },
    hoverStartTime: {
      type: [Number, String],
      default: 50
    },
    hoverStayTime: {
      type: [Number, String],
      default: 400
    }
  };
  function useHover(props2) {
    const hovering = vue.ref(false);
    let hoverTouch = false;
    let hoverStartTimer;
    let hoverStayTimer;
    function hoverReset() {
      requestAnimationFrame(() => {
        clearTimeout(hoverStayTimer);
        hoverStayTimer = setTimeout(() => {
          hovering.value = false;
        }, parseInt(props2.hoverStayTime));
      });
    }
    function onTouchstartPassive(evt) {
      if (evt._hoverPropagationStopped) {
        return;
      }
      if (!props2.hoverClass || props2.hoverClass === "none" || props2.disabled) {
        return;
      }
      if (evt.touches.length > 1) {
        return;
      }
      if (props2.hoverStopPropagation) {
        evt._hoverPropagationStopped = true;
      }
      hoverTouch = true;
      hoverStartTimer = setTimeout(() => {
        hovering.value = true;
        if (!hoverTouch) {
          hoverReset();
        }
      }, parseInt(props2.hoverStartTime));
    }
    function onTouchend() {
      hoverTouch = false;
      if (hovering.value) {
        hoverReset();
      }
    }
    function onTouchcancel() {
      hoverTouch = false;
      hovering.value = false;
      clearTimeout(hoverStartTimer);
    }
    return {
      hovering,
      binding: {
        onTouchstartPassive,
        onTouchend,
        onTouchcancel
      }
    };
  }
  function useBooleanAttr(props2, keys) {
    if (isString(keys)) {
      keys = [keys];
    }
    return keys.reduce((res, key) => {
      if (props2[key]) {
        res[key] = true;
      }
      return res;
    }, Object.create(null));
  }
  function withWebEvent(fn) {
    return fn.__wwe = true, fn;
  }
  function useCustomEvent(ref, emit) {
    return (name, evt, detail) => {
      if (ref.value) {
        emit(name, normalizeCustomEvent(name, evt, ref.value, detail || {}));
      }
    };
  }
  function normalizeCustomEvent(name, domEvt, el, detail) {
    const target = normalizeTarget(el);
    return {
      type: detail.type || name,
      timeStamp: domEvt.timeStamp || 0,
      target,
      currentTarget: target,
      detail
    };
  }
  const uniFormKey = PolySymbol("uniForm");
  const uniLabelKey = PolySymbol("uniLabel");
  function useListeners(props2, listeners) {
    _addListeners(props2.id, listeners);
    vue.watch(() => props2.id, (newId, oldId) => {
      _removeListeners(oldId, listeners, true);
      _addListeners(newId, listeners, true);
    });
    vue.onUnmounted(() => {
      _removeListeners(props2.id, listeners);
    });
  }
  function _addListeners(id, listeners, watch2) {
    const pageId = useCurrentPageId();
    if (watch2 && !id) {
      return;
    }
    if (!isPlainObject(listeners)) {
      return;
    }
    Object.keys(listeners).forEach((name) => {
      if (watch2) {
        if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) {
          UniViewJSBridge.on(`uni-${name}-${pageId}-${id}`, listeners[name]);
        }
      } else {
        if (name.indexOf("uni-") === 0) {
          UniViewJSBridge.on(name, listeners[name]);
        } else if (id) {
          UniViewJSBridge.on(`uni-${name}-${pageId}-${id}`, listeners[name]);
        }
      }
    });
  }
  function _removeListeners(id, listeners, watch2) {
    const pageId = useCurrentPageId();
    if (watch2 && !id) {
      return;
    }
    if (!isPlainObject(listeners)) {
      return;
    }
    Object.keys(listeners).forEach((name) => {
      if (watch2) {
        if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) {
          UniViewJSBridge.off(`uni-${name}-${pageId}-${id}`, listeners[name]);
        }
      } else {
        if (name.indexOf("uni-") === 0) {
          UniViewJSBridge.off(name, listeners[name]);
        } else if (id) {
          UniViewJSBridge.off(`uni-${name}-${pageId}-${id}`, listeners[name]);
        }
      }
    });
  }
  var Button = /* @__PURE__ */ defineBuiltInComponent({
    name: "Button",
    props: {
      id: {
        type: String,
        default: ""
      },
      hoverClass: {
        type: String,
        default: "button-hover"
      },
      hoverStartTime: {
        type: [Number, String],
        default: 20
      },
      hoverStayTime: {
        type: [Number, String],
        default: 70
      },
      hoverStopPropagation: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      formType: {
        type: String,
        default: ""
      },
      openType: {
        type: String,
        default: ""
      },
      loading: {
        type: [Boolean, String],
        default: false
      }
    },
    setup(props2, {
      slots
    }) {
      const rootRef = vue.ref(null);
      const uniForm = vue.inject(uniFormKey, false);
      const {
        hovering,
        binding
      } = useHover(props2);
      useI18n();
      const onClick = withWebEvent((e, isLabelClick) => {
        if (props2.disabled) {
          return e.stopImmediatePropagation();
        }
        if (isLabelClick) {
          rootRef.value.click();
        }
        const formType = props2.formType;
        if (formType) {
          if (!uniForm) {
            return;
          }
          if (formType === "submit") {
            uniForm.submit();
          } else if (formType === "reset") {
            uniForm.reset();
          }
          return;
        }
      });
      const uniLabel = vue.inject(uniLabelKey, false);
      if (uniLabel) {
        uniLabel.addHandler(onClick);
        vue.onBeforeUnmount(() => {
          uniLabel.removeHandler(onClick);
        });
      }
      useListeners(props2, {
        "label-click": onClick
      });
      return () => {
        const hoverClass = props2.hoverClass;
        const booleanAttrs = useBooleanAttr(props2, "disabled");
        const loadingAttrs = useBooleanAttr(props2, "loading");
        const hasHoverClass = hoverClass && hoverClass !== "none";
        return vue.createVNode("uni-button", vue.mergeProps({
          "ref": rootRef,
          "onClick": onClick,
          "class": hasHoverClass && hovering.value ? hoverClass : ""
        }, hasHoverClass && binding, booleanAttrs, loadingAttrs), {
          default: () => [slots.default && slots.default()]
        }, 16, ["onClick", "class"]);
      };
    }
  });
  function getRealPath() {
  }
  var ResizeSensor = /* @__PURE__ */ defineBuiltInComponent({
    name: "ResizeSensor",
    props: {
      initial: {
        type: Boolean,
        default: false
      }
    },
    emits: ["resize"],
    setup(props2, {
      emit
    }) {
      const rootRef = vue.ref(null);
      const reset = useResizeSensorReset(rootRef);
      const update = useResizeSensorUpdate(rootRef, emit, reset);
      useResizeSensorLifecycle(rootRef, props2, update, reset);
      return () => vue.createVNode("uni-resize-sensor", {
        "ref": rootRef,
        "onAnimationstartOnce": update
      }, {
        default: () => [vue.createVNode("div", {
          "onScroll": update
        }, [vue.createVNode("div", null, null)], 40, ["onScroll"]), vue.createVNode("div", {
          "onScroll": update
        }, [vue.createVNode("div", null, null)], 40, ["onScroll"])],
        _: 1
      }, 8, ["onAnimationstartOnce"]);
    }
  });
  function useResizeSensorUpdate(rootRef, emit, reset) {
    const size = vue.reactive({
      width: -1,
      height: -1
    });
    vue.watch(() => extend({}, size), (value) => emit("resize", value));
    return () => {
      const {
        width,
        height
      } = rootRef.value.getBoundingClientRect();
      size.width = width;
      size.height = height;
      reset();
    };
  }
  function useResizeSensorReset(rootRef) {
    return () => {
      const {
        firstElementChild,
        lastElementChild
      } = rootRef.value;
      firstElementChild.scrollLeft = 1e5;
      firstElementChild.scrollTop = 1e5;
      lastElementChild.scrollLeft = 1e5;
      lastElementChild.scrollTop = 1e5;
    };
  }
  function useResizeSensorLifecycle(rootRef, props2, update, reset) {
    vue.onActivated(reset);
    vue.onMounted(() => {
      if (props2.initial) {
        vue.nextTick(update);
      }
      const rootEl = rootRef.value;
      if (rootEl.offsetParent !== rootEl.parentElement) {
        rootEl.parentElement.style.position = "relative";
      }
      if (!("AnimationEvent" in window)) {
        reset();
      }
    });
  }
  const INFO_COLOR = "#10aeff";
  const WARN_COLOR = "#f76260";
  const GREY_COLOR = "#b2b2b2";
  const CANCEL_COLOR = "#f43530";
  const ICONS = {
    success: {
      d: ICON_PATH_SUCCESS,
      c: PRIMARY_COLOR
    },
    success_no_circle: {
      d: ICON_PATH_SUCCESS_NO_CIRCLE,
      c: PRIMARY_COLOR
    },
    info: {
      d: ICON_PATH_INFO,
      c: INFO_COLOR
    },
    warn: {
      d: ICON_PATH_WARN,
      c: WARN_COLOR
    },
    waiting: {
      d: ICON_PATH_WAITING,
      c: INFO_COLOR
    },
    cancel: {
      d: ICON_PATH_CANCEL,
      c: CANCEL_COLOR
    },
    download: {
      d: ICON_PATH_DOWNLOAD,
      c: PRIMARY_COLOR
    },
    search: {
      d: ICON_PATH_SEARCH,
      c: GREY_COLOR
    },
    clear: {
      d: ICON_PATH_CLEAR,
      c: GREY_COLOR
    }
  };
  var Icon = /* @__PURE__ */ defineBuiltInComponent({
    name: "Icon",
    props: {
      type: {
        type: String,
        required: true,
        default: ""
      },
      size: {
        type: [String, Number],
        default: 23
      },
      color: {
        type: String,
        default: ""
      }
    },
    setup(props2) {
      const path = vue.computed(() => ICONS[props2.type]);
      return () => {
        const {
          value
        } = path;
        return vue.createVNode("uni-icon", null, {
          default: () => [value && value.d && createSvgIconVNode(value.d, props2.color || value.c, rpx2px(props2.size))]
        });
      };
    }
  });
  const props = {
    src: {
      type: String,
      default: ""
    },
    mode: {
      type: String,
      default: "scaleToFill"
    },
    lazyLoad: {
      type: [Boolean, String],
      default: false
    },
    draggable: {
      type: Boolean,
      default: true
    }
  };
  const FIX_MODES = {
    widthFix: ["width", "height"],
    heightFix: ["height", "width"]
  };
  const IMAGE_MODES = {
    aspectFit: ["center center", "contain"],
    aspectFill: ["center center", "cover"],
    widthFix: [, "100% 100%"],
    heightFix: [, "100% 100%"],
    top: ["center top"],
    bottom: ["center bottom"],
    center: ["center center"],
    left: ["left center"],
    right: ["right center"],
    "top left": ["left top"],
    "top right": ["right top"],
    "bottom left": ["left bottom"],
    "bottom right": ["right bottom"]
  };
  var Image$1 = /* @__PURE__ */ defineBuiltInComponent({
    name: "Image",
    props,
    setup(props2, {
      emit
    }) {
      const rootRef = vue.ref(null);
      const state = useImageState(rootRef, props2);
      const trigger = useCustomEvent(rootRef, emit);
      const {
        fixSize
      } = useImageSize(rootRef, props2, state);
      useImageLoader(state, {
        trigger,
        fixSize
      });
      return () => {
        const {
          mode
        } = props2;
        const {
          imgSrc,
          modeStyle
        } = state;
        return vue.createVNode("uni-image", {
          "ref": rootRef
        }, {
          default: () => [vue.createVNode("div", {
            "style": modeStyle
          }, null, 4), imgSrc ? vue.createVNode("img", {
            "src": imgSrc,
            "draggable": props2.draggable
          }, null, 8, ["src", "draggable"]) : vue.createVNode("img", null, null), FIX_MODES[mode] ? vue.createVNode(ResizeSensor, {
            "onResize": fixSize
          }, null, 8, ["onResize"]) : vue.createVNode("span", null, null)],
          _: 1
        }, 512);
      };
    }
  });
  function useImageState(rootRef, props2) {
    const imgSrc = vue.ref("");
    const modeStyleRef = vue.computed(() => {
      let size = "auto";
      let position = "";
      const opts = IMAGE_MODES[props2.mode];
      if (!opts) {
        position = "0% 0%";
        size = "100% 100%";
      } else {
        opts[0] && (position = opts[0]);
        opts[1] && (size = opts[1]);
      }
      const srcVal = imgSrc.value;
      return `background-image:${srcVal ? 'url("' + srcVal + '")' : "none"};background-position:${position};background-size:${size};background-repeat:no-repeat;`;
    });
    const state = vue.reactive({
      rootEl: rootRef,
      src: vue.computed(() => props2.src ? getRealPath(props2.src) : ""),
      origWidth: 0,
      origHeight: 0,
      origStyle: {
        width: "",
        height: ""
      },
      modeStyle: modeStyleRef,
      imgSrc
    });
    vue.onMounted(() => {
      const rootEl = rootRef.value;
      const style = rootEl.style;
      state.origWidth = Number(style.width) || 0;
      state.origHeight = Number(style.height) || 0;
    });
    return state;
  }
  function useImageLoader(state, {
    trigger,
    fixSize
  }) {
    let img;
    const setState = (width = 0, height = 0, imgSrc = "") => {
      state.origWidth = width;
      state.origHeight = height;
      state.imgSrc = imgSrc;
    };
    const loadImage = (src) => {
      if (!src) {
        resetImage();
        setState();
        return;
      }
      if (!img) {
        img = new Image();
      }
      img.onload = (evt) => {
        const {
          width,
          height
        } = img;
        setState(width, height, src);
        fixSize();
        resetImage();
        trigger("load", evt, {
          width,
          height
        });
      };
      img.onerror = (evt) => {
        setState();
        resetImage();
        trigger("error", evt, {
          errMsg: `GET ${state.src} 404 (Not Found)`
        });
      };
      img.src = src;
    };
    const resetImage = () => {
      if (img) {
        img.onload = null;
        img.onerror = null;
        img = null;
      }
    };
    vue.watch(() => state.src, (value) => loadImage(value));
    vue.onMounted(() => loadImage(state.src));
    vue.onBeforeUnmount(() => resetImage());
  }
  const isChrome = navigator.vendor === "Google Inc.";
  function fixNumber(num) {
    if (isChrome && num > 10) {
      num = Math.round(num / 2) * 2;
    }
    return num;
  }
  function useImageSize(rootRef, props2, state) {
    const fixSize = () => {
      const {
        mode
      } = props2;
      const names = FIX_MODES[mode];
      if (!names) {
        return;
      }
      const {
        origWidth,
        origHeight
      } = state;
      const ratio = origWidth && origHeight ? origWidth / origHeight : 0;
      if (!ratio) {
        return;
      }
      const rootEl = rootRef.value;
      const rect = rootEl.getBoundingClientRect();
      const value = rect[names[0]];
      if (value) {
        rootEl.style[names[1]] = fixNumber(value / ratio) + "px";
      }
    };
    const resetSize = () => {
      const {
        style
      } = rootRef.value;
      const {
        origStyle: {
          width,
          height
        }
      } = state;
      style.width = width;
      style.height = height;
    };
    vue.watch(() => props2.mode, (value, oldValue) => {
      if (FIX_MODES[oldValue]) {
        resetSize();
      }
      if (FIX_MODES[value]) {
        fixSize();
      }
    });
    return {
      fixSize,
      resetSize
    };
  }
  const canvasEventCallbacks = createCallbacks("canvasEvent");
  ServiceJSBridge.subscribe("onCanvasMethodCallback", ({ callbackId, data }) => {
    const callback = canvasEventCallbacks.pop(callbackId);
    if (callback) {
      callback(data);
    }
  });
  const getSelectedTextRangeEventCallbacks = createCallbacks("getSelectedTextRangeEvent");
  ServiceJSBridge.subscribe && ServiceJSBridge.subscribe("onGetSelectedTextRange", ({ callbackId, data }) => {
    const callback = getSelectedTextRangeEventCallbacks.pop(callbackId);
    if (callback) {
      callback(data);
    }
  });
  function _isSlot(s) {
    return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
  }
  const SPACE_UNICODE = {
    ensp: "\u2002",
    emsp: "\u2003",
    nbsp: "\xA0"
  };
  function normalizeText(text, {
    space,
    decode
  }) {
    if (space && SPACE_UNICODE[space]) {
      text = text.replace(/ /g, SPACE_UNICODE[space]);
    }
    if (!decode) {
      return text;
    }
    return text.replace(/&nbsp;/g, SPACE_UNICODE.nbsp).replace(/&ensp;/g, SPACE_UNICODE.ensp).replace(/&emsp;/g, SPACE_UNICODE.emsp).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
  }
  var Text = /* @__PURE__ */ defineBuiltInComponent({
    name: "Text",
    props: {
      selectable: {
        type: [Boolean, String],
        default: false
      },
      space: {
        type: String,
        default: ""
      },
      decode: {
        type: [Boolean, String],
        default: false
      }
    },
    setup(props2, {
      slots
    }) {
      return () => {
        let _slot;
        const children = [];
        if (slots.default) {
          slots.default().forEach((vnode) => {
            if (vnode.shapeFlag & 8) {
              const lines = vnode.children.replace(/\\n/g, "\n").split("\n");
              const len = lines.length - 1;
              lines.forEach((text, index) => {
                if (index === 0 && !text)
                  ;
                else {
                  children.push(vue.createTextVNode(normalizeText(text, {
                    space: props2.space,
                    decode: props2.decode
                  })));
                }
                if (index !== len) {
                  children.push(vue.createVNode("br"));
                }
              });
            } else {
              if (vnode.shapeFlag & 6 && vnode.type.name !== "Text") {
                console.warn("Do not nest other components in the text component, as there may be display differences on different platforms.");
              }
              children.push(vnode);
            }
          });
        }
        return vue.createVNode("uni-text", {
          "selectable": props2.selectable ? true : null
        }, _isSlot(_slot = vue.createVNode("span", null, children)) ? _slot : {
          default: () => [_slot],
          _: 1
        }, 8, ["selectable"]);
      };
    }
  });
  var View = /* @__PURE__ */ defineBuiltInComponent({
    name: "View",
    props: extend({}, hoverProps),
    setup(props2, {
      slots
    }) {
      const {
        hovering,
        binding
      } = useHover(props2);
      return () => {
        const hoverClass = props2.hoverClass;
        if (hoverClass && hoverClass !== "none") {
          return vue.createVNode("uni-view", vue.mergeProps({
            "class": hovering.value ? hoverClass : ""
          }, binding), {
            default: () => [slots.default && slots.default()]
          }, 16, ["class"]);
        }
        return vue.createVNode("uni-view", null, {
          default: () => [slots.default && slots.default()]
        });
      };
    }
  });
  const { customElements } = window;
  customElements.define("v-uni-button", wrapper(Button, vue.createApp, vue.h));
  customElements.define("v-uni-icon", wrapper(Icon, vue.createApp, vue.h));
  customElements.define("v-uni-image", wrapper(Image$1, vue.createApp, vue.h));
  customElements.define("v-uni-text", wrapper(Text, vue.createApp, vue.h));
  customElements.define("v-uni-view", wrapper(View, vue.createApp, vue.h));
});
