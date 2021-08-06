(function(factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function() {
  "use strict";
  var base = "* {\n  margin: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  -webkit-tap-highlight-color: transparent;\n}\n\nhtml,\nbody {\n  -webkit-user-select: none;\n  user-select: none;\n  width: 100%;\n}\n\nhtml {\n  height: 100%;\n  height: 100vh;\n  width: 100%;\n  width: 100vw;\n}\n\nbody {\n  overflow-x: hidden;\n  background-color: white;\n}\n\ninput[type='search']::-webkit-search-cancel-button {\n  display: none;\n}\n\n.uni-loading,\nuni-button[loading]:before {\n  background: transparent\n    url('data:image/svg+xml;base64, PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=')\n    no-repeat;\n}\n\n.uni-loading {\n  width: 20px;\n  height: 20px;\n  display: inline-block;\n  vertical-align: middle;\n  animation: uni-loading 1s steps(12, end) infinite;\n  background-size: 100%;\n}\n\n@keyframes uni-loading {\n  0% {\n    transform: rotate3d(0, 0, 1, 0deg);\n  }\n\n  100% {\n    transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n";
  var nvue = "[nvue] uni-view,\n[nvue] uni-label,\n[nvue] uni-swiper-item,\n[nvue] uni-scroll-view {\n  display: flex;\n  flex-shrink: 0;\n  flex-grow: 0;\n  flex-basis: auto;\n  align-items: stretch;\n  align-content: flex-start;\n}\n\n[nvue] uni-button {\n  margin: 0;\n}\n\n[nvue-dir-row] uni-view,\n[nvue-dir-row] uni-label,\n[nvue-dir-row] uni-swiper-item {\n  flex-direction: row;\n}\n\n[nvue-dir-column] uni-view,\n[nvue-dir-column] uni-label,\n[nvue-dir-column] uni-swiper-item {\n  flex-direction: column;\n}\n\n[nvue-dir-row-reverse] uni-view,\n[nvue-dir-row-reverse] uni-label,\n[nvue-dir-row-reverse] uni-swiper-item {\n  flex-direction: row-reverse;\n}\n\n[nvue-dir-column-reverse] uni-view,\n[nvue-dir-column-reverse] uni-label,\n[nvue-dir-column-reverse] uni-swiper-item {\n  flex-direction: column-reverse;\n}\n\n[nvue] uni-view,\n[nvue] uni-image,\n[nvue] uni-input,\n[nvue] uni-scroll-view,\n[nvue] uni-swiper,\n[nvue] uni-swiper-item,\n[nvue] uni-text,\n[nvue] uni-textarea,\n[nvue] uni-video {\n  position: relative;\n  border: 0px solid #000000;\n  box-sizing: border-box;\n}\n\n[nvue] uni-swiper-item {\n  position: absolute;\n}\n";
  var resizeSensor = "@keyframes once-show {\n  from {\n    top: 0;\n  }\n}\nuni-resize-sensor,\nuni-resize-sensor > div {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden;\n}\nuni-resize-sensor {\n  display: block;\n  z-index: -1;\n  visibility: hidden;\n  animation: once-show 1ms;\n}\nuni-resize-sensor > div > div {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\nuni-resize-sensor > div:first-child > div {\n  width: 100000px;\n  height: 100000px;\n}\nuni-resize-sensor > div:last-child > div {\n  width: 200%;\n  height: 200%;\n}\n";
  var _wks = { exports: {} };
  var _shared = { exports: {} };
  var _core = { exports: {} };
  var core$2 = _core.exports = {
    version: "2.6.12"
  };
  if (typeof __e == "number")
    __e = core$2;
  var _global = { exports: {} };
  var window$5 = _global.exports = typeof window$5 != "undefined" && window$5.Math == Math ? window$5 : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
  if (typeof __g == "number")
    __g = window$5;
  var core$1 = _core.exports;
  var window$4 = _global.exports;
  var SHARED = "__core-js_shared__";
  var store$1 = window$4[SHARED] || (window$4[SHARED] = {});
  (_shared.exports = function(key2, value) {
    return store$1[key2] || (store$1[key2] = value !== void 0 ? value : {});
  })("versions", []).push({
    version: core$1.version,
    mode: "window",
    copyright: "\xA9 2020 Denis Pushkarev (zloirock.ru)"
  });
  var id$1 = 0;
  var px = Math.random();
  var _uid = function(key2) {
    return "Symbol(".concat(key2 === void 0 ? "" : key2, ")_", (++id$1 + px).toString(36));
  };
  var store = _shared.exports("wks");
  var uid$4 = _uid;
  var Symbol$1 = _global.exports.Symbol;
  var USE_SYMBOL = typeof Symbol$1 == "function";
  var $exports = _wks.exports = function(name) {
    return store[name] || (store[name] = USE_SYMBOL && Symbol$1[name] || (USE_SYMBOL ? Symbol$1 : uid$4)("Symbol." + name));
  };
  $exports.store = store;
  var _objectDp = {};
  var _isObject = function(it) {
    return typeof it === "object" ? it !== null : typeof it === "function";
  };
  var isObject$4 = _isObject;
  var _anObject = function(it) {
    if (!isObject$4(it))
      throw TypeError(it + " is not an object!");
    return it;
  };
  var _fails = function(exec) {
    try {
      return !!exec();
    } catch (e2) {
      return true;
    }
  };
  var _descriptors = !_fails(function() {
    return Object.defineProperty({}, "a", {
      get: function() {
        return 7;
      }
    }).a != 7;
  });
  var isObject$3 = _isObject;
  var document$2 = _global.exports.document;
  var is = isObject$3(document$2) && isObject$3(document$2.createElement);
  var _domCreate = function(it) {
    return is ? document$2.createElement(it) : {};
  };
  var _ie8DomDefine = !_descriptors && !_fails(function() {
    return Object.defineProperty(_domCreate("div"), "a", {
      get: function() {
        return 7;
      }
    }).a != 7;
  });
  var isObject$2 = _isObject;
  var _toPrimitive = function(it, S) {
    if (!isObject$2(it))
      return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == "function" && !isObject$2(val = fn.call(it)))
      return val;
    if (typeof (fn = it.valueOf) == "function" && !isObject$2(val = fn.call(it)))
      return val;
    if (!S && typeof (fn = it.toString) == "function" && !isObject$2(val = fn.call(it)))
      return val;
    throw TypeError("Can't convert object to primitive value");
  };
  var anObject$2 = _anObject;
  var IE8_DOM_DEFINE = _ie8DomDefine;
  var toPrimitive = _toPrimitive;
  var dP$2 = Object.defineProperty;
  _objectDp.f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    anObject$2(O);
    P = toPrimitive(P, true);
    anObject$2(Attributes);
    if (IE8_DOM_DEFINE)
      try {
        return dP$2(O, P, Attributes);
      } catch (e2) {
      }
    if ("get" in Attributes || "set" in Attributes)
      throw TypeError("Accessors not supported!");
    if ("value" in Attributes)
      O[P] = Attributes.value;
    return O;
  };
  var _propertyDesc = function(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value
    };
  };
  var dP$1 = _objectDp;
  var createDesc = _propertyDesc;
  var _hide = _descriptors ? function(object, key2, value) {
    return dP$1.f(object, key2, createDesc(1, value));
  } : function(object, key2, value) {
    object[key2] = value;
    return object;
  };
  var UNSCOPABLES = _wks.exports("unscopables");
  var ArrayProto = Array.prototype;
  if (ArrayProto[UNSCOPABLES] == void 0)
    _hide(ArrayProto, UNSCOPABLES, {});
  var _addToUnscopables = function(key2) {
    ArrayProto[UNSCOPABLES][key2] = true;
  };
  var _iterStep = function(done, value) {
    return {
      value,
      done: !!done
    };
  };
  var _iterators = {};
  var toString = {}.toString;
  var _cof = function(it) {
    return toString.call(it).slice(8, -1);
  };
  var cof = _cof;
  var _iobject = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
    return cof(it) == "String" ? it.split("") : Object(it);
  };
  var _defined = function(it) {
    if (it == void 0)
      throw TypeError("Can't call method on  " + it);
    return it;
  };
  var IObject = _iobject;
  var defined$1 = _defined;
  var _toIobject = function(it) {
    return IObject(defined$1(it));
  };
  var _redefine = { exports: {} };
  var hasOwnProperty$2 = {}.hasOwnProperty;
  var _has = function(it, key2) {
    return hasOwnProperty$2.call(it, key2);
  };
  var _functionToString = _shared.exports("native-function-to-string", Function.toString);
  var window$3 = _global.exports;
  var hide$3 = _hide;
  var has$5 = _has;
  var SRC = _uid("src");
  var $toString = _functionToString;
  var TO_STRING = "toString";
  var TPL = ("" + $toString).split(TO_STRING);
  _core.exports.inspectSource = function(it) {
    return $toString.call(it);
  };
  (_redefine.exports = function(O, key2, val, safe) {
    var isFunction2 = typeof val == "function";
    if (isFunction2)
      has$5(val, "name") || hide$3(val, "name", key2);
    if (O[key2] === val)
      return;
    if (isFunction2)
      has$5(val, SRC) || hide$3(val, SRC, O[key2] ? "" + O[key2] : TPL.join(String(key2)));
    if (O === window$3) {
      O[key2] = val;
    } else if (!safe) {
      delete O[key2];
      hide$3(O, key2, val);
    } else if (O[key2]) {
      O[key2] = val;
    } else {
      hide$3(O, key2, val);
    }
  })(Function.prototype, TO_STRING, function toString2() {
    return typeof this == "function" && this[SRC] || $toString.call(this);
  });
  var _aFunction = function(it) {
    if (typeof it != "function")
      throw TypeError(it + " is not a function!");
    return it;
  };
  var aFunction$1 = _aFunction;
  var _ctx = function(fn, that, length) {
    aFunction$1(fn);
    if (that === void 0)
      return fn;
    switch (length) {
      case 1:
        return function(a2) {
          return fn.call(that, a2);
        };
      case 2:
        return function(a2, b) {
          return fn.call(that, a2, b);
        };
      case 3:
        return function(a2, b, c) {
          return fn.call(that, a2, b, c);
        };
    }
    return function() {
      return fn.apply(that, arguments);
    };
  };
  var window$2 = _global.exports;
  var core = _core.exports;
  var hide$2 = _hide;
  var redefine$2 = _redefine.exports;
  var ctx = _ctx;
  var PROTOTYPE$1 = "prototype";
  var $export$3 = function(type, name, source) {
    var IS_FORCED = type & $export$3.F;
    var IS_GLOBAL = type & $export$3.G;
    var IS_STATIC = type & $export$3.S;
    var IS_PROTO = type & $export$3.P;
    var IS_BIND = type & $export$3.B;
    var target = IS_GLOBAL ? window$2 : IS_STATIC ? window$2[name] || (window$2[name] = {}) : (window$2[name] || {})[PROTOTYPE$1];
    var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
    var expProto = exports[PROTOTYPE$1] || (exports[PROTOTYPE$1] = {});
    var key2, own, out2, exp;
    if (IS_GLOBAL)
      source = name;
    for (key2 in source) {
      own = !IS_FORCED && target && target[key2] !== void 0;
      out2 = (own ? target : source)[key2];
      exp = IS_BIND && own ? ctx(out2, window$2) : IS_PROTO && typeof out2 == "function" ? ctx(Function.call, out2) : out2;
      if (target)
        redefine$2(target, key2, out2, type & $export$3.U);
      if (exports[key2] != out2)
        hide$2(exports, key2, exp);
      if (IS_PROTO && expProto[key2] != out2)
        expProto[key2] = out2;
    }
  };
  window$2.core = core;
  $export$3.F = 1;
  $export$3.G = 2;
  $export$3.S = 4;
  $export$3.P = 8;
  $export$3.B = 16;
  $export$3.W = 32;
  $export$3.U = 64;
  $export$3.R = 128;
  var _export = $export$3;
  var ceil = Math.ceil;
  var floor = Math.floor;
  var _toInteger = function(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };
  var toInteger$1 = _toInteger;
  var min$1 = Math.min;
  var _toLength = function(it) {
    return it > 0 ? min$1(toInteger$1(it), 9007199254740991) : 0;
  };
  var toInteger = _toInteger;
  var max = Math.max;
  var min = Math.min;
  var _toAbsoluteIndex = function(index2, length) {
    index2 = toInteger(index2);
    return index2 < 0 ? max(index2 + length, 0) : min(index2, length);
  };
  var toIObject$3 = _toIobject;
  var toLength = _toLength;
  var toAbsoluteIndex = _toAbsoluteIndex;
  var _arrayIncludes = function(IS_INCLUDES) {
    return function($this, el, fromIndex) {
      var O = toIObject$3($this);
      var length = toLength(O.length);
      var index2 = toAbsoluteIndex(fromIndex, length);
      var value;
      if (IS_INCLUDES && el != el)
        while (length > index2) {
          value = O[index2++];
          if (value != value)
            return true;
        }
      else
        for (; length > index2; index2++) {
          if (IS_INCLUDES || index2 in O) {
            if (O[index2] === el)
              return IS_INCLUDES || index2 || 0;
          }
        }
      return !IS_INCLUDES && -1;
    };
  };
  var shared = _shared.exports("keys");
  var uid$3 = _uid;
  var _sharedKey = function(key2) {
    return shared[key2] || (shared[key2] = uid$3(key2));
  };
  var has$4 = _has;
  var toIObject$2 = _toIobject;
  var arrayIndexOf = _arrayIncludes(false);
  var IE_PROTO$2 = _sharedKey("IE_PROTO");
  var _objectKeysInternal = function(object, names) {
    var O = toIObject$2(object);
    var i2 = 0;
    var result = [];
    var key2;
    for (key2 in O) {
      if (key2 != IE_PROTO$2)
        has$4(O, key2) && result.push(key2);
    }
    while (names.length > i2) {
      if (has$4(O, key2 = names[i2++])) {
        ~arrayIndexOf(result, key2) || result.push(key2);
      }
    }
    return result;
  };
  var _enumBugKeys = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
  var $keys = _objectKeysInternal;
  var enumBugKeys$1 = _enumBugKeys;
  var _objectKeys = Object.keys || function keys(O) {
    return $keys(O, enumBugKeys$1);
  };
  var dP = _objectDp;
  var anObject$1 = _anObject;
  var getKeys$2 = _objectKeys;
  var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$1(O);
    var keys = getKeys$2(Properties);
    var length = keys.length;
    var i2 = 0;
    var P;
    while (length > i2) {
      dP.f(O, P = keys[i2++], Properties[P]);
    }
    return O;
  };
  var document$1 = _global.exports.document;
  var _html = document$1 && document$1.documentElement;
  var anObject = _anObject;
  var dPs = _objectDps;
  var enumBugKeys = _enumBugKeys;
  var IE_PROTO$1 = _sharedKey("IE_PROTO");
  var Empty = function() {
  };
  var PROTOTYPE = "prototype";
  var createDict = function() {
    var iframe = _domCreate("iframe");
    var i2 = enumBugKeys.length;
    var lt = "<";
    var gt = ">";
    var iframeDocument;
    iframe.style.display = "none";
    _html.appendChild(iframe);
    iframe.src = "javascript:";
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + "script" + gt + "document.F=Object" + lt + "/script" + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (i2--) {
      delete createDict[PROTOTYPE][enumBugKeys[i2]];
    }
    return createDict();
  };
  var _objectCreate = Object.create || function create2(O, Properties) {
    var result;
    if (O !== null) {
      Empty[PROTOTYPE] = anObject(O);
      result = new Empty();
      Empty[PROTOTYPE] = null;
      result[IE_PROTO$1] = O;
    } else
      result = createDict();
    return Properties === void 0 ? result : dPs(result, Properties);
  };
  var def$1 = _objectDp.f;
  var has$3 = _has;
  var TAG = _wks.exports("toStringTag");
  var _setToStringTag = function(it, tag, stat) {
    if (it && !has$3(it = stat ? it : it.prototype, TAG))
      def$1(it, TAG, {
        configurable: true,
        value: tag
      });
  };
  var create = _objectCreate;
  var descriptor = _propertyDesc;
  var setToStringTag$1 = _setToStringTag;
  var IteratorPrototype = {};
  _hide(IteratorPrototype, _wks.exports("iterator"), function() {
    return this;
  });
  var _iterCreate = function(Constructor, NAME2, next) {
    Constructor.prototype = create(IteratorPrototype, {
      next: descriptor(1, next)
    });
    setToStringTag$1(Constructor, NAME2 + " Iterator");
  };
  var defined = _defined;
  var _toObject = function(it) {
    return Object(defined(it));
  };
  var has$2 = _has;
  var toObject$1 = _toObject;
  var IE_PROTO = _sharedKey("IE_PROTO");
  var ObjectProto = Object.prototype;
  var _objectGpo = Object.getPrototypeOf || function(O) {
    O = toObject$1(O);
    if (has$2(O, IE_PROTO))
      return O[IE_PROTO];
    if (typeof O.constructor == "function" && O instanceof O.constructor) {
      return O.constructor.prototype;
    }
    return O instanceof Object ? ObjectProto : null;
  };
  var $export$2 = _export;
  var redefine$1 = _redefine.exports;
  var hide$1 = _hide;
  var Iterators$2 = _iterators;
  var $iterCreate = _iterCreate;
  var setToStringTag = _setToStringTag;
  var getPrototypeOf = _objectGpo;
  var ITERATOR$1 = _wks.exports("iterator");
  var BUGGY = !([].keys && "next" in [].keys());
  var FF_ITERATOR = "@@iterator";
  var KEYS = "keys";
  var VALUES$1 = "values";
  var returnThis = function() {
    return this;
  };
  var _iterDefine = function(Base, NAME2, Constructor, next, DEFAULT, IS_SET, FORCED) {
    $iterCreate(Constructor, NAME2, next);
    var getMethod = function(kind) {
      if (!BUGGY && kind in proto2)
        return proto2[kind];
      switch (kind) {
        case KEYS:
          return function keys() {
            return new Constructor(this, kind);
          };
        case VALUES$1:
          return function values() {
            return new Constructor(this, kind);
          };
      }
      return function entries2() {
        return new Constructor(this, kind);
      };
    };
    var TAG2 = NAME2 + " Iterator";
    var DEF_VALUES = DEFAULT == VALUES$1;
    var VALUES_BUG = false;
    var proto2 = Base.prototype;
    var $native = proto2[ITERATOR$1] || proto2[FF_ITERATOR] || DEFAULT && proto2[DEFAULT];
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod("entries") : void 0;
    var $anyNative = NAME2 == "Array" ? proto2.entries || $native : $native;
    var methods2, key2, IteratorPrototype2;
    if ($anyNative) {
      IteratorPrototype2 = getPrototypeOf($anyNative.call(new Base()));
      if (IteratorPrototype2 !== Object.prototype && IteratorPrototype2.next) {
        setToStringTag(IteratorPrototype2, TAG2, true);
        if (typeof IteratorPrototype2[ITERATOR$1] != "function")
          hide$1(IteratorPrototype2, ITERATOR$1, returnThis);
      }
    }
    if (DEF_VALUES && $native && $native.name !== VALUES$1) {
      VALUES_BUG = true;
      $default = function values() {
        return $native.call(this);
      };
    }
    if (BUGGY || VALUES_BUG || !proto2[ITERATOR$1]) {
      hide$1(proto2, ITERATOR$1, $default);
    }
    Iterators$2[NAME2] = $default;
    Iterators$2[TAG2] = returnThis;
    if (DEFAULT) {
      methods2 = {
        values: DEF_VALUES ? $default : getMethod(VALUES$1),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries
      };
      if (FORCED)
        for (key2 in methods2) {
          if (!(key2 in proto2))
            redefine$1(proto2, key2, methods2[key2]);
        }
      else
        $export$2($export$2.P + $export$2.F * (BUGGY || VALUES_BUG), NAME2, methods2);
    }
    return methods2;
  };
  var addToUnscopables = _addToUnscopables;
  var step = _iterStep;
  var Iterators$1 = _iterators;
  var toIObject$1 = _toIobject;
  var es6_array_iterator = _iterDefine(Array, "Array", function(iterated, kind) {
    this._t = toIObject$1(iterated);
    this._i = 0;
    this._k = kind;
  }, function() {
    var O = this._t;
    var kind = this._k;
    var index2 = this._i++;
    if (!O || index2 >= O.length) {
      this._t = void 0;
      return step(1);
    }
    if (kind == "keys")
      return step(0, index2);
    if (kind == "values")
      return step(0, O[index2]);
    return step(0, [index2, O[index2]]);
  }, "values");
  Iterators$1.Arguments = Iterators$1.Array;
  addToUnscopables("keys");
  addToUnscopables("values");
  addToUnscopables("entries");
  var $iterators = es6_array_iterator;
  var getKeys$1 = _objectKeys;
  var redefine = _redefine.exports;
  var window$1 = _global.exports;
  var hide = _hide;
  var Iterators = _iterators;
  var wks = _wks.exports;
  var ITERATOR = wks("iterator");
  var TO_STRING_TAG = wks("toStringTag");
  var ArrayValues = Iterators.Array;
  var DOMIterables = {
    CSSRuleList: true,
    CSSStyleDeclaration: false,
    CSSValueList: false,
    ClientRectList: false,
    DOMRectList: false,
    DOMStringList: false,
    DOMTokenList: true,
    DataTransferItemList: false,
    FileList: false,
    HTMLAllCollection: false,
    HTMLCollection: false,
    HTMLFormElement: false,
    HTMLSelectElement: false,
    MediaList: true,
    MimeTypeArray: false,
    NamedNodeMap: false,
    NodeList: true,
    PaintRequestList: false,
    Plugin: false,
    PluginArray: false,
    SVGLengthList: false,
    SVGNumberList: false,
    SVGPathSegList: false,
    SVGPointList: false,
    SVGStringList: false,
    SVGTransformList: false,
    SourceBufferList: false,
    StyleSheetList: true,
    TextTrackCueList: false,
    TextTrackList: false,
    TouchList: false
  };
  for (var collections = getKeys$1(DOMIterables), i = 0; i < collections.length; i++) {
    var NAME = collections[i];
    var explicit = DOMIterables[NAME];
    var Collection = window$1[NAME];
    var proto = Collection && Collection.prototype;
    var key;
    if (proto) {
      if (!proto[ITERATOR])
        hide(proto, ITERATOR, ArrayValues);
      if (!proto[TO_STRING_TAG])
        hide(proto, TO_STRING_TAG, NAME);
      Iterators[NAME] = ArrayValues;
      if (explicit)
        for (key in $iterators) {
          if (!proto[key])
            redefine(proto, key, $iterators[key], true);
        }
    }
  }
  function makeMap$1(str, expectsLowerCase) {
    var map2 = Object.create(null);
    var list2 = str.split(",");
    for (var i2 = 0; i2 < list2.length; i2++) {
      map2[list2[i2]] = true;
    }
    return expectsLowerCase ? (val) => !!map2[val.toLowerCase()] : (val) => !!map2[val];
  }
  var GLOBALS_WHITE_LISTED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt";
  var isGloballyWhitelisted = /* @__PURE__ */ makeMap$1(GLOBALS_WHITE_LISTED);
  var specialBooleanAttrs = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
  var isSpecialBooleanAttr = /* @__PURE__ */ makeMap$1(specialBooleanAttrs);
  function normalizeStyle(value) {
    if (isArray(value)) {
      var res = {};
      for (var i2 = 0; i2 < value.length; i2++) {
        var item = value[i2];
        var normalized = normalizeStyle(isString(item) ? parseStringStyle(item) : item);
        if (normalized) {
          for (var key2 in normalized) {
            res[key2] = normalized[key2];
          }
        }
      }
      return res;
    } else if (isObject$1(value)) {
      return value;
    }
  }
  var listDelimiterRE = /;(?![^(]*\))/g;
  var propertyDelimiterRE = /:(.+)/;
  function parseStringStyle(cssText) {
    var ret = {};
    cssText.split(listDelimiterRE).forEach((item) => {
      if (item) {
        var tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  function normalizeClass(value) {
    var res = "";
    if (isString(value)) {
      res = value;
    } else if (isArray(value)) {
      for (var i2 = 0; i2 < value.length; i2++) {
        var normalized = normalizeClass(value[i2]);
        if (normalized) {
          res += normalized + " ";
        }
      }
    } else if (isObject$1(value)) {
      for (var name in value) {
        if (value[name]) {
          res += name + " ";
        }
      }
    }
    return res.trim();
  }
  var EMPTY_OBJ = {};
  var EMPTY_ARR = [];
  var NOOP = () => {
  };
  var NO = () => false;
  var onRE = /^on[^a-z]/;
  var isOn = (key2) => onRE.test(key2);
  var isModelListener = (key2) => key2.startsWith("onUpdate:");
  var extend = Object.assign;
  var remove = (arr, el) => {
    var i2 = arr.indexOf(el);
    if (i2 > -1) {
      arr.splice(i2, 1);
    }
  };
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var hasOwn$1 = (val, key2) => hasOwnProperty$1.call(val, key2);
  var isArray = Array.isArray;
  var isMap = (val) => toTypeString(val) === "[object Map]";
  var isSet = (val) => toTypeString(val) === "[object Set]";
  var isFunction = (val) => typeof val === "function";
  var isString = (val) => typeof val === "string";
  var isSymbol = (val) => typeof val === "symbol";
  var isObject$1 = (val) => val !== null && typeof val === "object";
  var isPromise = (val) => {
    return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
  };
  var objectToString = Object.prototype.toString;
  var toTypeString = (value) => objectToString.call(value);
  var toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  var isPlainObject = (val) => toTypeString(val) === "[object Object]";
  var isIntegerKey = (key2) => isString(key2) && key2 !== "NaN" && key2[0] !== "-" && "" + parseInt(key2, 10) === key2;
  var isReservedProp = /* @__PURE__ */ makeMap$1(",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
  var cacheStringFunction$1 = (fn) => {
    var cache2 = Object.create(null);
    return (str) => {
      var hit = cache2[str];
      return hit || (cache2[str] = fn(str));
    };
  };
  var camelizeRE = /-(\w)/g;
  var camelize = cacheStringFunction$1((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  });
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cacheStringFunction$1((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
  var capitalize = cacheStringFunction$1((str) => str.charAt(0).toUpperCase() + str.slice(1));
  var toHandlerKey = cacheStringFunction$1((str) => str ? "on".concat(capitalize(str)) : "");
  var hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
  var invokeArrayFns = (fns, arg) => {
    for (var i2 = 0; i2 < fns.length; i2++) {
      fns[i2](arg);
    }
  };
  var def = (obj, key2, value) => {
    Object.defineProperty(obj, key2, {
      configurable: true,
      enumerable: false,
      value
    });
  };
  var toNumber = (val) => {
    var n = parseFloat(val);
    return isNaN(n) ? val : n;
  };
  var lastLogTime = 0;
  function formatLog(module, ...args) {
    var now = Date.now();
    var diff = lastLogTime ? now - lastLogTime : 0;
    lastLogTime = now;
    return "[".concat(now, "][").concat(diff, "ms][").concat(module, "]\uFF1A").concat(args.map((arg) => JSON.stringify(arg)).join(" "));
  }
  function getCustomDataset(el) {
    return extend({}, el.dataset, el.__uniDataset);
  }
  function passive(passive2) {
    return {
      passive: passive2
    };
  }
  function normalizeTarget(el) {
    var {
      id: id2,
      offsetTop,
      offsetLeft
    } = el;
    return {
      id: id2,
      dataset: getCustomDataset(el),
      offsetTop,
      offsetLeft
    };
  }
  function addFont(family, source, desc) {
    var fonts = document.fonts;
    if (fonts) {
      var fontFace = new FontFace(family, source, desc);
      return fontFace.load().then(() => {
        fonts.add(fontFace);
      });
    }
    return new Promise((resolve) => {
      var style = document.createElement("style");
      var values = [];
      if (desc) {
        var {
          style: _style,
          weight,
          stretch,
          unicodeRange,
          variant,
          featureSettings
        } = desc;
        _style && values.push("font-style:".concat(_style));
        weight && values.push("font-weight:".concat(weight));
        stretch && values.push("font-stretch:".concat(stretch));
        unicodeRange && values.push("unicode-range:".concat(unicodeRange));
        variant && values.push("font-variant:".concat(variant));
        featureSettings && values.push("font-feature-settings:".concat(featureSettings));
      }
      style.innerText = '@font-face{font-family:"'.concat(family, '";src:').concat(source, ";").concat(values.join(";"), "}");
      document.head.appendChild(style);
      resolve();
    });
  }
  function scrollTo(scrollTop, duration) {
    if (isString(scrollTop)) {
      var el = document.querySelector(scrollTop);
      if (el) {
        scrollTop = el.getBoundingClientRect().top + window.pageYOffset;
      }
    }
    if (scrollTop < 0) {
      scrollTop = 0;
    }
    var documentElement = document.documentElement;
    var {
      clientHeight,
      scrollHeight
    } = documentElement;
    scrollTop = Math.min(scrollTop, scrollHeight - clientHeight);
    if (duration === 0) {
      documentElement.scrollTop = document.body.scrollTop = scrollTop;
      return;
    }
    if (window.scrollY === scrollTop) {
      return;
    }
    var scrollTo2 = (duration2) => {
      if (duration2 <= 0) {
        window.scrollTo(0, scrollTop);
        return;
      }
      var distaince = scrollTop - window.scrollY;
      requestAnimationFrame(function() {
        window.scrollTo(0, window.scrollY + distaince / duration2 * 10);
        scrollTo2(duration2 - 10);
      });
    };
    scrollTo2(duration);
  }
  function plusReady(callback) {
    if (typeof callback !== "function") {
      return;
    }
    if (window.plus) {
      return callback();
    }
    document.addEventListener("plusready", callback);
  }
  function normalizeEventType(type, options) {
    if (options) {
      if (options.capture) {
        type += "Capture";
      }
      if (options.once) {
        type += "Once";
      }
      if (options.passive) {
        type += "Passive";
      }
    }
    return "on".concat(capitalize(camelize(type)));
  }
  var optionsModifierRE$1 = /(?:Once|Passive|Capture)$/;
  function parseEventName(name) {
    var options;
    if (optionsModifierRE$1.test(name)) {
      options = {};
      var m;
      while (m = name.match(optionsModifierRE$1)) {
        name = name.slice(0, name.length - m[0].length);
        options[m[0].toLowerCase()] = true;
      }
    }
    return [hyphenate(name.slice(2)), options];
  }
  var EventModifierFlags = {
    stop: 1,
    prevent: 1 << 1,
    self: 1 << 2
  };
  var ATTR_CLASS = "class";
  var ATTR_STYLE = "style";
  var ATTR_INNER_HTML = "innerHTML";
  var ATTR_TEXT_CONTENT = "textContent";
  var ATTR_V_SHOW = ".vShow";
  var ACTION_TYPE_PAGE_CREATE = 1;
  var ACTION_TYPE_PAGE_CREATED = 2;
  var ACTION_TYPE_CREATE = 3;
  var ACTION_TYPE_REMOVE = 5;
  var ACTION_TYPE_SET_ATTRIBUTE = 6;
  var ACTION_TYPE_REMOVE_ATTRIBUTE = 7;
  var ACTION_TYPE_ADD_EVENT = 8;
  var ACTION_TYPE_REMOVE_EVENT = 9;
  var ACTION_TYPE_SET_TEXT = 10;
  var ACTION_TYPE_PAGE_SCROLL = 15;
  var ACTION_TYPE_EVENT = 20;
  function cache(fn) {
    var cache2 = Object.create(null);
    return (str) => {
      var hit = cache2[str];
      return hit || (cache2[str] = fn(str));
    };
  }
  function cacheStringFunction(fn) {
    return cache(fn);
  }
  function once(fn, ctx2 = null) {
    var res;
    return (...args) => {
      if (fn) {
        res = fn.apply(ctx2, args);
        fn = null;
      }
      return res;
    };
  }
  function debounce(fn, delay) {
    var timeout;
    var newFn = function() {
      clearTimeout(timeout);
      var timerFn = () => fn.apply(this, arguments);
      timeout = setTimeout(timerFn, delay);
    };
    newFn.cancel = function() {
      clearTimeout(timeout);
    };
    return newFn;
  }
  var NAVBAR_HEIGHT = 44;
  var PRIMARY_COLOR = "#007aff";
  var SCHEME_RE = /^([a-z-]+:)?\/\//i;
  var DATA_RE = /^data:.*,.*/;
  var JSON_PROTOCOL = "json://";
  var ON_PAGE_SCROLL = "onPageScroll";
  var ON_REACH_BOTTOM = "onReachBottom";
  var isObject = (val) => val !== null && typeof val === "object";
  class BaseFormatter {
    constructor() {
      this._caches = Object.create(null);
    }
    interpolate(message, values) {
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }
  var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format) {
    var tokens = [];
    var position = 0;
    var text2 = "";
    while (position < format.length) {
      var char = format[position++];
      if (char === "{") {
        if (text2) {
          tokens.push({
            type: "text",
            value: text2
          });
        }
        text2 = "";
        var sub = "";
        char = format[position++];
        while (char !== void 0 && char !== "}") {
          sub += char;
          char = format[position++];
        }
        var isClosed = char === "}";
        var type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({
          value: sub,
          type
        });
      } else if (char === "%") {
        if (format[position] !== "{") {
          text2 += char;
        }
      } else {
        text2 += char;
      }
    }
    text2 && tokens.push({
      type: "text",
      value: text2
    });
    return tokens;
  }
  function compile(tokens, values) {
    var compiled = [];
    var index2 = 0;
    var mode2 = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode2 === "unknown") {
      return compiled;
    }
    while (index2 < tokens.length) {
      var token = tokens[index2];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode2 === "named") {
            compiled.push(values[token.value]);
          }
          break;
      }
      index2++;
    }
    return compiled;
  }
  var LOCALE_ZH_HANS = "zh-Hans";
  var LOCALE_ZH_HANT = "zh-Hant";
  var LOCALE_EN = "en";
  var LOCALE_FR = "fr";
  var LOCALE_ES = "es";
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasOwn = (val, key2) => hasOwnProperty.call(val, key2);
  var defaultFormatter = new BaseFormatter();
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
    var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({
      locale,
      fallbackLocale,
      messages,
      watcher,
      formater
    }) {
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
      var oldLocale = this.locale;
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
      var index2 = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index2, 1);
      };
    }
    add(locale, message) {
      if (this.messages[locale]) {
        Object.assign(this.messages[locale], message);
      } else {
        this.messages[locale] = message;
      }
    }
    t(key2, locale, values) {
      var message = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key2)) {
        console.warn("Cannot translate the value of keypath ".concat(key2, ". Use the value of keypath as default."));
        return key2;
      }
      return this.formater.interpolate(message[key2], values).join("");
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
    var i18n2 = new I18n({
      locale: locale || fallbackLocale,
      fallbackLocale,
      messages
    });
    var t2 = (key2, values) => {
      if (typeof getApp !== "function") {
        t2 = function(key3, values2) {
          return i18n2.t(key3, values2);
        };
      } else {
        var appVm = getApp().$vm;
        if (!appVm.$t || !appVm.$i18n) {
          t2 = function(key3, values2) {
            return i18n2.t(key3, values2);
          };
        } else {
          initLocaleWatcher(appVm, i18n2);
          t2 = function(key3, values2) {
            var $i18n = appVm.$i18n;
            var silentTranslationWarn = $i18n.silentTranslationWarn;
            $i18n.silentTranslationWarn = true;
            var msg = appVm.$t(key3, values2);
            $i18n.silentTranslationWarn = silentTranslationWarn;
            if (msg !== key3) {
              return msg;
            }
            return i18n2.t(key3, $i18n.locale, values2);
          };
        }
      }
      return t2(key2, values);
    };
    return {
      i18n: i18n2,
      t(key2, values) {
        return t2(key2, values);
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
  var i18n;
  function useI18n() {
    if (!i18n) {
      var language;
      {
        language = plus.os.language;
      }
      i18n = initVueI18n(language);
    }
    return i18n;
  }
  function normalizeMessages(namespace, messages) {
    return Object.keys(messages).reduce((res, name) => {
      res[namespace + name] = messages[name];
      return res;
    }, {});
  }
  var initI18nPickerMsgsOnce = /* @__PURE__ */ once(() => {
    var name = "uni.picker.";
    {
      useI18n().add(LOCALE_EN, normalizeMessages(name, {
        done: "Done",
        cancel: "Cancel"
      }));
    }
    {
      useI18n().add(LOCALE_ES, normalizeMessages(name, {
        done: "OK",
        cancel: "Cancelar"
      }));
    }
    {
      useI18n().add(LOCALE_FR, normalizeMessages(name, {
        done: "OK",
        cancel: "Annuler"
      }));
    }
    {
      useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, {
        done: "\u5B8C\u6210",
        cancel: "\u53D6\u6D88"
      }));
    }
    {
      useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, {
        done: "\u5B8C\u6210",
        cancel: "\u53D6\u6D88"
      }));
    }
  });
  var initI18nButtonMsgsOnce = /* @__PURE__ */ once(() => {
    var name = "uni.button.";
    {
      useI18n().add(LOCALE_EN, normalizeMessages(name, {
        "feedback.title": "feedback",
        "feedback.send": "send"
      }));
    }
    {
      useI18n().add(LOCALE_ES, normalizeMessages(name, {
        "feedback.title": "realimentaci\xF3n",
        "feedback.send": "enviar"
      }));
    }
    {
      useI18n().add(LOCALE_FR, normalizeMessages(name, {
        "feedback.title": "retour d'information",
        "feedback.send": "envoyer"
      }));
    }
    {
      useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, {
        "feedback.title": "\u95EE\u9898\u53CD\u9988",
        "feedback.send": "\u53D1\u9001"
      }));
    }
    {
      useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, {
        "feedback.title": "\u554F\u984C\u53CD\u994B",
        "feedback.send": "\u767C\u9001"
      }));
    }
  });
  var E = function() {
  };
  E.prototype = {
    on: function(name, callback, ctx2) {
      var e2 = this.e || (this.e = {});
      (e2[name] || (e2[name] = [])).push({
        fn: callback,
        ctx: ctx2
      });
      return this;
    },
    once: function(name, callback, ctx2) {
      var self2 = this;
      function listener() {
        self2.off(name, listener);
        callback.apply(ctx2, arguments);
      }
      listener._ = callback;
      return this.on(name, listener, ctx2);
    },
    emit: function(name) {
      var data = [].slice.call(arguments, 1);
      var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
      var i2 = 0;
      var len = evtArr.length;
      for (i2; i2 < len; i2++) {
        evtArr[i2].fn.apply(evtArr[i2].ctx, data);
      }
      return this;
    },
    off: function(name, callback) {
      var e2 = this.e || (this.e = {});
      var evts = e2[name];
      var liveEvents = [];
      if (evts && callback) {
        for (var i2 = 0, len = evts.length; i2 < len; i2++) {
          if (evts[i2].fn !== callback && evts[i2].fn._ !== callback)
            liveEvents.push(evts[i2]);
        }
      }
      liveEvents.length ? e2[name] = liveEvents : delete e2[name];
      return this;
    }
  };
  function initBridge(subscribeNamespace) {
    var emitter = new E();
    return {
      on(event, callback) {
        return emitter.on(event, callback);
      },
      once(event, callback) {
        return emitter.once(event, callback);
      },
      off(event, callback) {
        return emitter.off(event, callback);
      },
      emit(event, ...args) {
        return emitter.emit(event, ...args);
      },
      subscribe(event, callback, once2 = false) {
        emitter[once2 ? "once" : "on"]("".concat(subscribeNamespace, ".").concat(event), callback);
      },
      unsubscribe(event, callback) {
        emitter.off("".concat(subscribeNamespace, ".").concat(event), callback);
      },
      subscribeHandler(event, args, pageId) {
        emitter.emit("".concat(subscribeNamespace, ".").concat(event), args, pageId);
      }
    };
  }
  var INVOKE_VIEW_API = "invokeViewApi";
  var INVOKE_SERVICE_API = "invokeServiceApi";
  var invokeServiceMethodId = 1;
  var invokeServiceMethod = (name, args, callback) => {
    var {
      subscribe,
      publishHandler: publishHandler2
    } = UniViewJSBridge;
    var id2 = callback ? invokeServiceMethodId++ : 0;
    callback && subscribe(INVOKE_SERVICE_API + "." + id2, callback, true);
    publishHandler2(INVOKE_SERVICE_API, {
      id: id2,
      name,
      args
    });
  };
  var viewMethods = Object.create(null);
  function normalizeViewMethodName(pageId, name) {
    return pageId + "." + name;
  }
  function subscribeViewMethod(pageId, wrapper2) {
    UniViewJSBridge.subscribe(normalizeViewMethodName(pageId, INVOKE_VIEW_API), wrapper2 ? wrapper2(onInvokeViewMethod) : onInvokeViewMethod);
  }
  function registerViewMethod(pageId, name, fn) {
    name = normalizeViewMethodName(pageId, name);
    if (!viewMethods[name]) {
      viewMethods[name] = fn;
    }
  }
  function unregisterViewMethod(pageId, name) {
    name = normalizeViewMethodName(pageId, name);
    delete viewMethods[name];
  }
  function onInvokeViewMethod({
    id: id2,
    name,
    args
  }, pageId) {
    name = normalizeViewMethodName(pageId, name);
    var publish = (res) => {
      id2 && UniViewJSBridge.publishHandler(INVOKE_VIEW_API + "." + id2, res);
    };
    var handler = viewMethods[name];
    if (handler) {
      handler(args, publish);
    } else {
      publish({});
    }
  }
  var ViewJSBridge = /* @__PURE__ */ extend(initBridge("service"), {
    invokeServiceMethod
  });
  var LONGPRESS_TIMEOUT = 350;
  var LONGPRESS_THRESHOLD = 10;
  var passiveOptions$2 = passive(true);
  var longPressTimer;
  function clearLongPressTimer() {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  }
  var startPageX = 0;
  var startPageY = 0;
  function touchstart(evt) {
    clearLongPressTimer();
    if (evt.touches.length !== 1) {
      return;
    }
    var {
      pageX,
      pageY
    } = evt.touches[0];
    startPageX = pageX;
    startPageY = pageY;
    longPressTimer = setTimeout(function() {
      var customEvent = new CustomEvent("longpress", {
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
    var {
      pageX,
      pageY
    } = evt.touches[0];
    if (Math.abs(pageX - startPageX) > LONGPRESS_THRESHOLD || Math.abs(pageY - startPageY) > LONGPRESS_THRESHOLD) {
      return clearLongPressTimer();
    }
  }
  function initLongPress() {
    window.addEventListener("touchstart", touchstart, passiveOptions$2);
    window.addEventListener("touchmove", touchmove, passiveOptions$2);
    window.addEventListener("touchend", clearLongPressTimer, passiveOptions$2);
    window.addEventListener("touchcancel", clearLongPressTimer, passiveOptions$2);
  }
  function checkValue$1(value, defaultValue) {
    var newValue = Number(value);
    return isNaN(newValue) ? defaultValue : newValue;
  }
  function getWindowWidth() {
    var screenFix = /^Apple/.test(navigator.vendor) && typeof window.orientation === "number";
    var landscape = screenFix && Math.abs(window.orientation) === 90;
    var screenWidth = screenFix ? Math[landscape ? "max" : "min"](screen.width, screen.height) : screen.width;
    var windowWidth = Math.min(window.innerWidth, document.documentElement.clientWidth, screenWidth) || screenWidth;
    return windowWidth;
  }
  function useRem() {
    function updateRem() {
      var config = __uniConfig.globalStyle || {};
      var maxWidth = checkValue$1(config.rpxCalcMaxDeviceWidth, 960);
      var baseWidth = checkValue$1(config.rpxCalcBaseDeviceWidth, 375);
      var width = getWindowWidth();
      width = width <= maxWidth ? width : baseWidth;
      document.documentElement.style.fontSize = width / 23.4375 + "px";
    }
    updateRem();
    document.addEventListener("DOMContentLoaded", updateRem);
    window.addEventListener("load", updateRem);
    window.addEventListener("resize", updateRem);
  }
  function initView() {
    useRem();
    {
      initLongPress();
    }
  }
  var fails$1 = _fails;
  var _strictMethod = function(method, arg) {
    return !!method && fails$1(function() {
      arg ? method.call(null, function() {
      }, 1) : method.call(null);
    });
  };
  var $export$1 = _export;
  var aFunction = _aFunction;
  var toObject = _toObject;
  var fails = _fails;
  var $sort = [].sort;
  var test = [1, 2, 3];
  $export$1($export$1.P + $export$1.F * (fails(function() {
    test.sort(void 0);
  }) || !fails(function() {
    test.sort(null);
  }) || !_strictMethod($sort)), "Array", {
    sort: function sort(comparefn) {
      return comparefn === void 0 ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction(comparefn));
    }
  });
  var targetMap = new WeakMap();
  var effectStack = [];
  var activeEffect;
  var ITERATE_KEY = Symbol("");
  var MAP_KEY_ITERATE_KEY = Symbol("");
  function isEffect(fn) {
    return fn && fn._isEffect === true;
  }
  function effect(fn, options = EMPTY_OBJ) {
    if (isEffect(fn)) {
      fn = fn.raw;
    }
    var effect2 = createReactiveEffect(fn, options);
    if (!options.lazy) {
      effect2();
    }
    return effect2;
  }
  function stop(effect2) {
    if (effect2.active) {
      cleanup(effect2);
      if (effect2.options.onStop) {
        effect2.options.onStop();
      }
      effect2.active = false;
    }
  }
  var uid = 0;
  function createReactiveEffect(fn, options) {
    var effect2 = function reactiveEffect() {
      if (!effect2.active) {
        return fn();
      }
      if (!effectStack.includes(effect2)) {
        cleanup(effect2);
        try {
          enableTracking();
          effectStack.push(effect2);
          activeEffect = effect2;
          return fn();
        } finally {
          effectStack.pop();
          resetTracking();
          activeEffect = effectStack[effectStack.length - 1];
        }
      }
    };
    effect2.id = uid++;
    effect2.allowRecurse = !!options.allowRecurse;
    effect2._isEffect = true;
    effect2.active = true;
    effect2.raw = fn;
    effect2.deps = [];
    effect2.options = options;
    return effect2;
  }
  function cleanup(effect2) {
    var {
      deps
    } = effect2;
    if (deps.length) {
      for (var i2 = 0; i2 < deps.length; i2++) {
        deps[i2].delete(effect2);
      }
      deps.length = 0;
    }
  }
  var shouldTrack = true;
  var trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function enableTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = true;
  }
  function resetTracking() {
    var last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function track(target, type, key2) {
    if (!shouldTrack || activeEffect === void 0) {
      return;
    }
    var depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = new Map());
    }
    var dep = depsMap.get(key2);
    if (!dep) {
      depsMap.set(key2, dep = new Set());
    }
    if (!dep.has(activeEffect)) {
      dep.add(activeEffect);
      activeEffect.deps.push(dep);
    }
  }
  function trigger(target, type, key2, newValue, oldValue, oldTarget) {
    var depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    var effects = new Set();
    var add2 = (effectsToAdd) => {
      if (effectsToAdd) {
        effectsToAdd.forEach((effect2) => {
          if (effect2 !== activeEffect || effect2.allowRecurse) {
            effects.add(effect2);
          }
        });
      }
    };
    if (type === "clear") {
      depsMap.forEach(add2);
    } else if (key2 === "length" && isArray(target)) {
      depsMap.forEach((dep, key3) => {
        if (key3 === "length" || key3 >= newValue) {
          add2(dep);
        }
      });
    } else {
      if (key2 !== void 0) {
        add2(depsMap.get(key2));
      }
      switch (type) {
        case "add":
          if (!isArray(target)) {
            add2(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              add2(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key2)) {
            add2(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!isArray(target)) {
            add2(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              add2(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            add2(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
    var run = (effect2) => {
      if (effect2.options.scheduler) {
        effect2.options.scheduler(effect2);
      } else {
        effect2();
      }
    };
    effects.forEach(run);
  }
  var isNonTrackableKeys = /* @__PURE__ */ makeMap$1("__proto__,__v_isRef,__isVue");
  var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key2) => Symbol[key2]).filter(isSymbol));
  var get = /* @__PURE__ */ createGetter();
  var shallowGet = /* @__PURE__ */ createGetter(false, true);
  var readonlyGet = /* @__PURE__ */ createGetter(true);
  var arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
  function createArrayInstrumentations() {
    var instrumentations = {};
    ["includes", "indexOf", "lastIndexOf"].forEach((key2) => {
      var method = Array.prototype[key2];
      instrumentations[key2] = function(...args) {
        var arr = toRaw(this);
        for (var i2 = 0, l = this.length; i2 < l; i2++) {
          track(arr, "get", i2 + "");
        }
        var res = method.apply(arr, args);
        if (res === -1 || res === false) {
          return method.apply(arr, args.map(toRaw));
        } else {
          return res;
        }
      };
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach((key2) => {
      var method = Array.prototype[key2];
      instrumentations[key2] = function(...args) {
        pauseTracking();
        var res = method.apply(this, args);
        resetTracking();
        return res;
      };
    });
    return instrumentations;
  }
  function createGetter(isReadonly2 = false, shallow = false) {
    return function get2(target, key2, receiver) {
      if (key2 === "__v_isReactive") {
        return !isReadonly2;
      } else if (key2 === "__v_isReadonly") {
        return isReadonly2;
      } else if (key2 === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
        return target;
      }
      var targetIsArray = isArray(target);
      if (!isReadonly2 && targetIsArray && hasOwn$1(arrayInstrumentations, key2)) {
        return Reflect.get(arrayInstrumentations, key2, receiver);
      }
      var res = Reflect.get(target, key2, receiver);
      if (isSymbol(key2) ? builtInSymbols.has(key2) : isNonTrackableKeys(key2)) {
        return res;
      }
      if (!isReadonly2) {
        track(target, "get", key2);
      }
      if (shallow) {
        return res;
      }
      if (isRef(res)) {
        var shouldUnwrap = !targetIsArray || !isIntegerKey(key2);
        return shouldUnwrap ? res.value : res;
      }
      if (isObject$1(res)) {
        return isReadonly2 ? readonly(res) : reactive(res);
      }
      return res;
    };
  }
  var set = /* @__PURE__ */ createSetter();
  var shallowSet = /* @__PURE__ */ createSetter(true);
  function createSetter(shallow = false) {
    return function set2(target, key2, value, receiver) {
      var oldValue = target[key2];
      if (!shallow) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
        if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        }
      }
      var hadKey = isArray(target) && isIntegerKey(key2) ? Number(key2) < target.length : hasOwn$1(target, key2);
      var result = Reflect.set(target, key2, value, receiver);
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key2, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key2, value);
        }
      }
      return result;
    };
  }
  function deleteProperty(target, key2) {
    var hadKey = hasOwn$1(target, key2);
    target[key2];
    var result = Reflect.deleteProperty(target, key2);
    if (result && hadKey) {
      trigger(target, "delete", key2, void 0);
    }
    return result;
  }
  function has(target, key2) {
    var result = Reflect.has(target, key2);
    if (!isSymbol(key2) || !builtInSymbols.has(key2)) {
      track(target, "has", key2);
    }
    return result;
  }
  function ownKeys(target) {
    track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
  var mutableHandlers = {
    get,
    set,
    deleteProperty,
    has,
    ownKeys
  };
  var readonlyHandlers = {
    get: readonlyGet,
    set(target, key2) {
      return true;
    },
    deleteProperty(target, key2) {
      return true;
    }
  };
  var shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
    get: shallowGet,
    set: shallowSet
  });
  var toReactive = (value) => isObject$1(value) ? reactive(value) : value;
  var toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
  var toShallow = (value) => value;
  var getProto = (v2) => Reflect.getPrototypeOf(v2);
  function get$1(target, key2, isReadonly2 = false, isShallow = false) {
    target = target["__v_raw"];
    var rawTarget = toRaw(target);
    var rawKey = toRaw(key2);
    if (key2 !== rawKey) {
      !isReadonly2 && track(rawTarget, "get", key2);
    }
    !isReadonly2 && track(rawTarget, "get", rawKey);
    var {
      has: has2
    } = getProto(rawTarget);
    var wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
    if (has2.call(rawTarget, key2)) {
      return wrap(target.get(key2));
    } else if (has2.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      target.get(key2);
    }
  }
  function has$1(key2, isReadonly2 = false) {
    var target = this["__v_raw"];
    var rawTarget = toRaw(target);
    var rawKey = toRaw(key2);
    if (key2 !== rawKey) {
      !isReadonly2 && track(rawTarget, "has", key2);
    }
    !isReadonly2 && track(rawTarget, "has", rawKey);
    return key2 === rawKey ? target.has(key2) : target.has(key2) || target.has(rawKey);
  }
  function size(target, isReadonly2 = false) {
    target = target["__v_raw"];
    !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
  }
  function add(value) {
    value = toRaw(value);
    var target = toRaw(this);
    var proto2 = getProto(target);
    var hadKey = proto2.has.call(target, value);
    if (!hadKey) {
      target.add(value);
      trigger(target, "add", value, value);
    }
    return this;
  }
  function set$1(key2, value) {
    value = toRaw(value);
    var target = toRaw(this);
    var {
      has: has2,
      get: get2
    } = getProto(target);
    var hadKey = has2.call(target, key2);
    if (!hadKey) {
      key2 = toRaw(key2);
      hadKey = has2.call(target, key2);
    }
    var oldValue = get2.call(target, key2);
    target.set(key2, value);
    if (!hadKey) {
      trigger(target, "add", key2, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set", key2, value);
    }
    return this;
  }
  function deleteEntry(key2) {
    var target = toRaw(this);
    var {
      has: has2,
      get: get2
    } = getProto(target);
    var hadKey = has2.call(target, key2);
    if (!hadKey) {
      key2 = toRaw(key2);
      hadKey = has2.call(target, key2);
    }
    get2 ? get2.call(target, key2) : void 0;
    var result = target.delete(key2);
    if (hadKey) {
      trigger(target, "delete", key2, void 0);
    }
    return result;
  }
  function clear() {
    var target = toRaw(this);
    var hadItems = target.size !== 0;
    var result = target.clear();
    if (hadItems) {
      trigger(target, "clear", void 0, void 0);
    }
    return result;
  }
  function createForEach(isReadonly2, isShallow) {
    return function forEach(callback, thisArg) {
      var observed = this;
      var target = observed["__v_raw"];
      var rawTarget = toRaw(target);
      var wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key2) => {
        return callback.call(thisArg, wrap(value), wrap(key2), observed);
      });
    };
  }
  function createIterableMethod(method, isReadonly2, isShallow) {
    return function(...args) {
      var target = this["__v_raw"];
      var rawTarget = toRaw(target);
      var targetIsMap = isMap(rawTarget);
      var isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      var isKeyOnly = method === "keys" && targetIsMap;
      var innerIterator = target[method](...args);
      var wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
      return {
        next() {
          var {
            value,
            done
          } = innerIterator.next();
          return done ? {
            value,
            done
          } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        },
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      return type === "delete" ? false : this;
    };
  }
  function createInstrumentations() {
    var mutableInstrumentations2 = {
      get(key2) {
        return get$1(this, key2);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false)
    };
    var shallowInstrumentations2 = {
      get(key2) {
        return get$1(this, key2, false, true);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true)
    };
    var readonlyInstrumentations2 = {
      get(key2) {
        return get$1(this, key2, true);
      },
      get size() {
        return size(this, true);
      },
      has(key2) {
        return has$1.call(this, key2, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, false)
    };
    var shallowReadonlyInstrumentations2 = {
      get(key2) {
        return get$1(this, key2, true, true);
      },
      get size() {
        return size(this, true);
      },
      has(key2) {
        return has$1.call(this, key2, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, true)
    };
    var iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
    iteratorMethods.forEach((method) => {
      mutableInstrumentations2[method] = createIterableMethod(method, false, false);
      readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
      shallowInstrumentations2[method] = createIterableMethod(method, false, true);
      shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
    });
    return [mutableInstrumentations2, readonlyInstrumentations2, shallowInstrumentations2, shallowReadonlyInstrumentations2];
  }
  var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
  function createInstrumentationGetter(isReadonly2, shallow) {
    var instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key2, receiver) => {
      if (key2 === "__v_isReactive") {
        return !isReadonly2;
      } else if (key2 === "__v_isReadonly") {
        return isReadonly2;
      } else if (key2 === "__v_raw") {
        return target;
      }
      return Reflect.get(hasOwn$1(instrumentations, key2) && key2 in target ? instrumentations : target, key2, receiver);
    };
  }
  var mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  var shallowCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, true)
  };
  var readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  var reactiveMap = new WeakMap();
  var shallowReactiveMap = new WeakMap();
  var readonlyMap = new WeakMap();
  var shallowReadonlyMap = new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  function reactive(target) {
    if (target && target["__v_isReadonly"]) {
      return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }
  function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
  }
  function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
  }
  function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject$1(target)) {
      return target;
    }
    if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
      return target;
    }
    var existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    var targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    var proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
  }
  function isReactive(value) {
    if (isReadonly(value)) {
      return isReactive(value["__v_raw"]);
    }
    return !!(value && value["__v_isReactive"]);
  }
  function isReadonly(value) {
    return !!(value && value["__v_isReadonly"]);
  }
  function isProxy(value) {
    return isReactive(value) || isReadonly(value);
  }
  function toRaw(observed) {
    return observed && toRaw(observed["__v_raw"]) || observed;
  }
  function markRaw(value) {
    def(value, "__v_skip", true);
    return value;
  }
  var convert = (val) => isObject$1(val) ? reactive(val) : val;
  function isRef(r) {
    return Boolean(r && r.__v_isRef === true);
  }
  function ref(value) {
    return createRef(value);
  }
  function shallowRef(value) {
    return createRef(value, true);
  }
  class RefImpl {
    constructor(_rawValue, _shallow) {
      this._rawValue = _rawValue;
      this._shallow = _shallow;
      this.__v_isRef = true;
      this._value = _shallow ? _rawValue : convert(_rawValue);
    }
    get value() {
      track(toRaw(this), "get", "value");
      return this._value;
    }
    set value(newVal) {
      if (hasChanged(toRaw(newVal), this._rawValue)) {
        this._rawValue = newVal;
        this._value = this._shallow ? newVal : convert(newVal);
        trigger(toRaw(this), "set", "value", newVal);
      }
    }
  }
  function createRef(rawValue, shallow = false) {
    if (isRef(rawValue)) {
      return rawValue;
    }
    return new RefImpl(rawValue, shallow);
  }
  function unref(ref2) {
    return isRef(ref2) ? ref2.value : ref2;
  }
  var shallowUnwrapHandlers = {
    get: (target, key2, receiver) => unref(Reflect.get(target, key2, receiver)),
    set: (target, key2, value, receiver) => {
      var oldValue = target[key2];
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key2, value, receiver);
      }
    }
  };
  function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  class ComputedRefImpl {
    constructor(getter, _setter, isReadonly2) {
      this._setter = _setter;
      this._dirty = true;
      this.__v_isRef = true;
      this.effect = effect(getter, {
        lazy: true,
        scheduler: () => {
          if (!this._dirty) {
            this._dirty = true;
            trigger(toRaw(this), "set", "value");
          }
        }
      });
      this["__v_isReadonly"] = isReadonly2;
    }
    get value() {
      var self2 = toRaw(this);
      if (self2._dirty) {
        self2._value = this.effect();
        self2._dirty = false;
      }
      track(self2, "get", "value");
      return self2._value;
    }
    set value(newValue) {
      this._setter(newValue);
    }
  }
  function computed(getterOrOptions) {
    var getter;
    var setter;
    if (isFunction(getterOrOptions)) {
      getter = getterOrOptions;
      setter = NOOP;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    return new ComputedRefImpl(getter, setter, isFunction(getterOrOptions) || !getterOrOptions.set);
  }
  var stack = [];
  function warn(msg, ...args) {
    pauseTracking();
    var instance = stack.length ? stack[stack.length - 1].component : null;
    var appWarnHandler = instance && instance.appContext.config.warnHandler;
    var trace = getComponentTrace();
    if (appWarnHandler) {
      callWithErrorHandling(appWarnHandler, instance, 11, [msg + args.join(""), instance && instance.proxy, trace.map(({
        vnode
      }) => "at <".concat(formatComponentName(instance, vnode.type), ">")).join("\n"), trace]);
    } else {
      var warnArgs = ["[Vue warn]: ".concat(msg), ...args];
      if (trace.length && true) {
        warnArgs.push("\n", ...formatTrace(trace));
      }
      console.warn(...warnArgs);
    }
    resetTracking();
  }
  function getComponentTrace() {
    var currentVNode = stack[stack.length - 1];
    if (!currentVNode) {
      return [];
    }
    var normalizedStack = [];
    while (currentVNode) {
      var last = normalizedStack[0];
      if (last && last.vnode === currentVNode) {
        last.recurseCount++;
      } else {
        normalizedStack.push({
          vnode: currentVNode,
          recurseCount: 0
        });
      }
      var parentInstance = currentVNode.component && currentVNode.component.parent;
      currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
  }
  function formatTrace(trace) {
    var logs = [];
    trace.forEach((entry, i2) => {
      logs.push(...i2 === 0 ? [] : ["\n"], ...formatTraceEntry(entry));
    });
    return logs;
  }
  function formatTraceEntry({
    vnode,
    recurseCount
  }) {
    var postfix = recurseCount > 0 ? "... (".concat(recurseCount, " recursive calls)") : "";
    var isRoot = vnode.component ? vnode.component.parent == null : false;
    var open = " at <".concat(formatComponentName(vnode.component, vnode.type, isRoot));
    var close = ">" + postfix;
    return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
  }
  function formatProps(props2) {
    var res = [];
    var keys = Object.keys(props2);
    keys.slice(0, 3).forEach((key2) => {
      res.push(...formatProp(key2, props2[key2]));
    });
    if (keys.length > 3) {
      res.push(" ...");
    }
    return res;
  }
  function formatProp(key2, value, raw) {
    if (isString(value)) {
      value = JSON.stringify(value);
      return raw ? value : ["".concat(key2, "=").concat(value)];
    } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
      return raw ? value : ["".concat(key2, "=").concat(value)];
    } else if (isRef(value)) {
      value = formatProp(key2, toRaw(value.value), true);
      return raw ? value : ["".concat(key2, "=Ref<"), value, ">"];
    } else if (isFunction(value)) {
      return ["".concat(key2, "=fn").concat(value.name ? "<".concat(value.name, ">") : "")];
    } else {
      value = toRaw(value);
      return raw ? value : ["".concat(key2, "="), value];
    }
  }
  function callWithErrorHandling(fn, instance, type, args) {
    var res;
    try {
      res = args ? fn(...args) : fn();
    } catch (err) {
      handleError(err, instance, type);
    }
    return res;
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction(fn)) {
      var res = callWithErrorHandling(fn, instance, type, args);
      if (res && isPromise(res)) {
        res.catch((err) => {
          handleError(err, instance, type);
        });
      }
      return res;
    }
    var values = [];
    for (var i2 = 0; i2 < fn.length; i2++) {
      values.push(callWithAsyncErrorHandling(fn[i2], instance, type, args));
    }
    return values;
  }
  function handleError(err, instance, type, throwInDev = true) {
    var contextVNode = instance ? instance.vnode : null;
    if (instance) {
      var cur = instance.parent;
      var exposedInstance = instance.proxy;
      var errorInfo = type;
      while (cur) {
        var errorCapturedHooks = cur.ec;
        if (errorCapturedHooks) {
          for (var i2 = 0; i2 < errorCapturedHooks.length; i2++) {
            if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
              return;
            }
          }
        }
        cur = cur.parent;
      }
      var appErrorHandler = instance.appContext.config.errorHandler;
      if (appErrorHandler) {
        callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
        return;
      }
    }
    logError(err, type, contextVNode, throwInDev);
  }
  function logError(err, type, contextVNode, throwInDev = true) {
    {
      if (err instanceof Error) {
        console.error(err.message + "\n" + err.stack);
      } else {
        console.error(err);
      }
    }
  }
  var isFlushing = false;
  var isFlushPending = false;
  var queue = [];
  var flushIndex = 0;
  var pendingPreFlushCbs = [];
  var activePreFlushCbs = null;
  var preFlushIndex = 0;
  var pendingPostFlushCbs = [];
  var activePostFlushCbs = null;
  var postFlushIndex = 0;
  var resolvedPromise = Promise.resolve();
  var currentFlushPromise = null;
  var currentPreFlushParentJob = null;
  var RECURSION_LIMIT = 100;
  function nextTick(fn) {
    var p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
  }
  function findInsertionIndex(job) {
    var start = flushIndex + 1;
    var end = queue.length;
    var jobId = getId(job);
    while (start < end) {
      var middle = start + end >>> 1;
      var middleJobId = getId(queue[middle]);
      middleJobId < jobId ? start = middle + 1 : end = middle;
    }
    return start;
  }
  function queueJob(job) {
    if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
      var pos = findInsertionIndex(job);
      if (pos > -1) {
        queue.splice(pos, 0, job);
      } else {
        queue.push(job);
      }
      queueFlush();
    }
  }
  function queueFlush() {
    if (!isFlushing && !isFlushPending) {
      isFlushPending = true;
      currentFlushPromise = resolvedPromise.then(flushJobs);
    }
  }
  function invalidateJob(job) {
    var i2 = queue.indexOf(job);
    if (i2 > flushIndex) {
      queue.splice(i2, 1);
    }
  }
  function queueCb(cb, activeQueue, pendingQueue, index2) {
    if (!isArray(cb)) {
      if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index2 + 1 : index2)) {
        pendingQueue.push(cb);
      }
    } else {
      pendingQueue.push(...cb);
    }
    queueFlush();
  }
  function queuePreFlushCb(cb) {
    queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
  }
  function queuePostFlushCb(cb) {
    queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
  }
  function flushPreFlushCbs(seen, parentJob = null) {
    if (pendingPreFlushCbs.length) {
      currentPreFlushParentJob = parentJob;
      activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
      pendingPreFlushCbs.length = 0;
      for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
        activePreFlushCbs[preFlushIndex]();
      }
      activePreFlushCbs = null;
      preFlushIndex = 0;
      currentPreFlushParentJob = null;
      flushPreFlushCbs(seen, parentJob);
    }
  }
  function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
      var deduped = [...new Set(pendingPostFlushCbs)];
      pendingPostFlushCbs.length = 0;
      if (activePostFlushCbs) {
        activePostFlushCbs.push(...deduped);
        return;
      }
      activePostFlushCbs = deduped;
      activePostFlushCbs.sort((a2, b) => getId(a2) - getId(b));
      for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
        activePostFlushCbs[postFlushIndex]();
      }
      activePostFlushCbs = null;
      postFlushIndex = 0;
    }
  }
  var getId = (job) => job.id == null ? Infinity : job.id;
  function flushJobs(seen) {
    isFlushPending = false;
    isFlushing = true;
    flushPreFlushCbs(seen);
    queue.sort((a2, b) => getId(a2) - getId(b));
    try {
      for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
        var job = queue[flushIndex];
        if (job && job.active !== false) {
          if (false)
            ;
          callWithErrorHandling(job, null, 14);
        }
      }
    } finally {
      flushIndex = 0;
      queue.length = 0;
      flushPostFlushCbs();
      isFlushing = false;
      currentFlushPromise = null;
      if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
        flushJobs(seen);
      }
    }
  }
  function checkRecursiveUpdates(seen, fn) {
    if (!seen.has(fn)) {
      seen.set(fn, 1);
    } else {
      var count = seen.get(fn);
      if (count > RECURSION_LIMIT) {
        var instance = fn.ownerInstance;
        var componentName = instance && getComponentName(instance.type);
        warn("Maximum recursive updates exceeded".concat(componentName ? " in component <".concat(componentName, ">") : "", ". ") + "This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.");
        return true;
      } else {
        seen.set(fn, count + 1);
      }
    }
  }
  var globalCompatConfig = {
    MODE: 2
  };
  function getCompatConfigForKey(key2, instance) {
    var instanceConfig = instance && instance.type.compatConfig;
    if (instanceConfig && key2 in instanceConfig) {
      return instanceConfig[key2];
    }
    return globalCompatConfig[key2];
  }
  function isCompatEnabled(key2, instance, enableForBuiltIn = false) {
    if (!enableForBuiltIn && instance && instance.type.__isBuiltIn) {
      return false;
    }
    var rawMode = getCompatConfigForKey("MODE", instance) || 2;
    var val = getCompatConfigForKey(key2, instance);
    var mode2 = isFunction(rawMode) ? rawMode(instance && instance.type) : rawMode;
    if (mode2 === 2) {
      return val !== false;
    } else {
      return val === true || val === "suppress-warning";
    }
  }
  function emit$2(instance, event, ...rawArgs) {
    var props2 = instance.vnode.props || EMPTY_OBJ;
    var args = rawArgs;
    var isModelListener2 = event.startsWith("update:");
    var modelArg = isModelListener2 && event.slice(7);
    if (modelArg && modelArg in props2) {
      var modifiersKey = "".concat(modelArg === "modelValue" ? "model" : modelArg, "Modifiers");
      var {
        number,
        trim
      } = props2[modifiersKey] || EMPTY_OBJ;
      if (trim) {
        args = rawArgs.map((a2) => a2.trim());
      } else if (number) {
        args = rawArgs.map(toNumber);
      }
    }
    var handlerName;
    var handler = props2[handlerName = toHandlerKey(event)] || props2[handlerName = toHandlerKey(camelize(event))];
    if (!handler && isModelListener2) {
      handler = props2[handlerName = toHandlerKey(hyphenate(event))];
    }
    if (handler) {
      callWithAsyncErrorHandling(handler, instance, 6, args);
    }
    var onceHandler = props2[handlerName + "Once"];
    if (onceHandler) {
      if (!instance.emitted) {
        instance.emitted = {};
      } else if (instance.emitted[handlerName]) {
        return;
      }
      instance.emitted[handlerName] = true;
      callWithAsyncErrorHandling(onceHandler, instance, 6, args);
    }
  }
  function normalizeEmitsOptions(comp, appContext, asMixin = false) {
    var cache2 = appContext.emitsCache;
    var cached = cache2.get(comp);
    if (cached !== void 0) {
      return cached;
    }
    var raw = comp.emits;
    var normalized = {};
    var hasExtends = false;
    if (!isFunction(comp)) {
      var extendEmits = (raw2) => {
        var normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
        if (normalizedFromExtend) {
          hasExtends = true;
          extend(normalized, normalizedFromExtend);
        }
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendEmits);
      }
      if (comp.extends) {
        extendEmits(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendEmits);
      }
    }
    if (!raw && !hasExtends) {
      cache2.set(comp, null);
      return null;
    }
    if (isArray(raw)) {
      raw.forEach((key2) => normalized[key2] = null);
    } else {
      extend(normalized, raw);
    }
    cache2.set(comp, normalized);
    return normalized;
  }
  function isEmitListener(options, key2) {
    if (!options || !isOn(key2)) {
      return false;
    }
    key2 = key2.slice(2).replace(/Once$/, "");
    return hasOwn$1(options, key2[0].toLowerCase() + key2.slice(1)) || hasOwn$1(options, hyphenate(key2)) || hasOwn$1(options, key2);
  }
  var currentRenderingInstance = null;
  var currentScopeId = null;
  function setCurrentRenderingInstance(instance) {
    var prev = currentRenderingInstance;
    currentRenderingInstance = instance;
    currentScopeId = instance && instance.type.__scopeId || null;
    return prev;
  }
  function withCtx(fn, ctx2 = currentRenderingInstance, isNonScopedSlot) {
    if (!ctx2)
      return fn;
    if (fn._n) {
      return fn;
    }
    var renderFnWithContext = (...args) => {
      if (renderFnWithContext._d) {
        setBlockTracking(-1);
      }
      var prevInstance = setCurrentRenderingInstance(ctx2);
      var res = fn(...args);
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
      return res;
    };
    renderFnWithContext._n = true;
    renderFnWithContext._c = true;
    renderFnWithContext._d = true;
    return renderFnWithContext;
  }
  var accessedAttrs = false;
  function markAttrsAccessed() {
    accessedAttrs = true;
  }
  function renderComponentRoot(instance) {
    var {
      type: Component,
      vnode,
      proxy,
      withProxy,
      props: props2,
      propsOptions: [propsOptions],
      slots,
      attrs: attrs2,
      emit: emit2,
      render,
      renderCache,
      data,
      setupState,
      ctx: ctx2,
      inheritAttrs
    } = instance;
    var result;
    var prev = setCurrentRenderingInstance(instance);
    try {
      var fallthroughAttrs;
      if (vnode.shapeFlag & 4) {
        var proxyToUse = withProxy || proxy;
        result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props2, setupState, data, ctx2));
        fallthroughAttrs = attrs2;
      } else {
        var _render = Component;
        if (false)
          ;
        result = normalizeVNode(_render.length > 1 ? _render(props2, false ? {
          get attrs() {
            markAttrsAccessed();
            return attrs2;
          },
          slots,
          emit: emit2
        } : {
          attrs: attrs2,
          slots,
          emit: emit2
        }) : _render(props2, null));
        fallthroughAttrs = Component.props ? attrs2 : getFunctionalFallthrough(attrs2);
      }
      var root = result;
      var setRoot = void 0;
      if (false)
        ;
      if (fallthroughAttrs && inheritAttrs !== false) {
        var keys = Object.keys(fallthroughAttrs);
        var {
          shapeFlag
        } = root;
        if (keys.length) {
          if (shapeFlag & 1 || shapeFlag & 6) {
            if (propsOptions && keys.some(isModelListener)) {
              fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
            }
            root = cloneVNode(root, fallthroughAttrs);
          } else {
            var allAttrs, eventAttrs, extraAttrs, i2, l, key2;
            if (false)
              ;
          }
        }
      }
      if (false)
        ;
      if (vnode.dirs) {
        if (false)
          ;
        root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
      }
      if (vnode.transition) {
        if (false)
          ;
        root.transition = vnode.transition;
      }
      if (false)
        ;
      else {
        result = root;
      }
    } catch (err) {
      handleError(err, instance, 1);
      result = createVNode(Comment$1);
    }
    setCurrentRenderingInstance(prev);
    return result;
  }
  var getChildRoot = (vnode) => {
    var rawChildren = vnode.children;
    var dynamicChildren = vnode.dynamicChildren;
    var childRoot = filterSingleRoot(rawChildren);
    if (!childRoot) {
      return [vnode, void 0];
    }
    var index2 = rawChildren.indexOf(childRoot);
    var dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
    var setRoot = (updatedRoot) => {
      rawChildren[index2] = updatedRoot;
      if (dynamicChildren) {
        if (dynamicIndex > -1) {
          dynamicChildren[dynamicIndex] = updatedRoot;
        } else if (updatedRoot.patchFlag > 0) {
          vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
        }
      }
    };
    return [normalizeVNode(childRoot), setRoot];
  };
  function filterSingleRoot(children) {
    var singleRoot;
    for (var i2 = 0; i2 < children.length; i2++) {
      var child = children[i2];
      if (isVNode(child)) {
        if (child.type !== Comment$1 || child.children === "v-if") {
          if (singleRoot) {
            return;
          } else {
            singleRoot = child;
          }
        }
      } else {
        return;
      }
    }
    return singleRoot;
  }
  var getFunctionalFallthrough = (attrs2) => {
    var res;
    for (var key2 in attrs2) {
      if (key2 === "class" || key2 === "style" || isOn(key2)) {
        (res || (res = {}))[key2] = attrs2[key2];
      }
    }
    return res;
  };
  var filterModelListeners = (attrs2, props2) => {
    var res = {};
    for (var key2 in attrs2) {
      if (!isModelListener(key2) || !(key2.slice(9) in props2)) {
        res[key2] = attrs2[key2];
      }
    }
    return res;
  };
  var isElementRoot = (vnode) => {
    return vnode.shapeFlag & 6 || vnode.shapeFlag & 1 || vnode.type === Comment$1;
  };
  function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    var {
      props: prevProps,
      children: prevChildren,
      component
    } = prevVNode;
    var {
      props: nextProps,
      children: nextChildren,
      patchFlag
    } = nextVNode;
    var emits2 = component.emitsOptions;
    if (nextVNode.dirs || nextVNode.transition) {
      return true;
    }
    if (optimized && patchFlag >= 0) {
      if (patchFlag & 1024) {
        return true;
      }
      if (patchFlag & 16) {
        if (!prevProps) {
          return !!nextProps;
        }
        return hasPropsChanged(prevProps, nextProps, emits2);
      } else if (patchFlag & 8) {
        var dynamicProps = nextVNode.dynamicProps;
        for (var i2 = 0; i2 < dynamicProps.length; i2++) {
          var key2 = dynamicProps[i2];
          if (nextProps[key2] !== prevProps[key2] && !isEmitListener(emits2, key2)) {
            return true;
          }
        }
      }
    } else {
      if (prevChildren || nextChildren) {
        if (!nextChildren || !nextChildren.$stable) {
          return true;
        }
      }
      if (prevProps === nextProps) {
        return false;
      }
      if (!prevProps) {
        return !!nextProps;
      }
      if (!nextProps) {
        return true;
      }
      return hasPropsChanged(prevProps, nextProps, emits2);
    }
    return false;
  }
  function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    var nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) {
      return true;
    }
    for (var i2 = 0; i2 < nextKeys.length; i2++) {
      var key2 = nextKeys[i2];
      if (nextProps[key2] !== prevProps[key2] && !isEmitListener(emitsOptions, key2)) {
        return true;
      }
    }
    return false;
  }
  function updateHOCHostEl({
    vnode,
    parent
  }, el) {
    while (parent && parent.subTree === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    }
  }
  var isSuspense = (type) => type.__isSuspense;
  function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
      if (isArray(fn)) {
        suspense.effects.push(...fn);
      } else {
        suspense.effects.push(fn);
      }
    } else {
      queuePostFlushCb(fn);
    }
  }
  function provide(key2, value) {
    if (!currentInstance)
      ;
    else {
      var provides = currentInstance.provides;
      var parentProvides = currentInstance.parent && currentInstance.parent.provides;
      if (parentProvides === provides) {
        provides = currentInstance.provides = Object.create(parentProvides);
      }
      provides[key2] = value;
    }
  }
  function inject(key2, defaultValue, treatDefaultAsFactory = false) {
    var instance = currentInstance || currentRenderingInstance;
    if (instance) {
      var provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
      if (provides && key2 in provides) {
        return provides[key2];
      } else if (arguments.length > 1) {
        return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
      } else
        ;
    }
  }
  function watchEffect(effect2, options) {
    return doWatch(effect2, null, options);
  }
  var INITIAL_WATCHER_VALUE = {};
  function watch(source, cb, options) {
    return doWatch(source, cb, options);
  }
  function doWatch(source, cb, {
    immediate,
    deep,
    flush,
    onTrack,
    onTrigger
  } = EMPTY_OBJ, instance = currentInstance) {
    var getter;
    var forceTrigger = false;
    var isMultiSource = false;
    if (isRef(source)) {
      getter = () => source.value;
      forceTrigger = !!source._shallow;
    } else if (isReactive(source)) {
      getter = () => source;
      deep = true;
    } else if (isArray(source)) {
      isMultiSource = true;
      forceTrigger = source.some(isReactive);
      getter = () => source.map((s) => {
        if (isRef(s)) {
          return s.value;
        } else if (isReactive(s)) {
          return traverse(s);
        } else if (isFunction(s)) {
          return callWithErrorHandling(s, instance, 2);
        } else
          ;
      });
    } else if (isFunction(source)) {
      if (cb) {
        getter = () => callWithErrorHandling(source, instance, 2);
      } else {
        getter = () => {
          if (instance && instance.isUnmounted) {
            return;
          }
          if (cleanup2) {
            cleanup2();
          }
          return callWithAsyncErrorHandling(source, instance, 3, [onInvalidate]);
        };
      }
    } else {
      getter = NOOP;
    }
    if (cb && deep) {
      var baseGetter = getter;
      getter = () => traverse(baseGetter());
    }
    var cleanup2;
    var onInvalidate = (fn) => {
      cleanup2 = runner.options.onStop = () => {
        callWithErrorHandling(fn, instance, 4);
      };
    };
    var oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
    var job = () => {
      if (!runner.active) {
        return;
      }
      if (cb) {
        var newValue = runner();
        if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i2) => hasChanged(v2, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
          if (cleanup2) {
            cleanup2();
          }
          callWithAsyncErrorHandling(cb, instance, 3, [
            newValue,
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
            onInvalidate
          ]);
          oldValue = newValue;
        }
      } else {
        runner();
      }
    };
    job.allowRecurse = !!cb;
    var scheduler;
    if (flush === "sync") {
      scheduler = job;
    } else if (flush === "post") {
      scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
    } else {
      scheduler = () => {
        if (!instance || instance.isMounted) {
          queuePreFlushCb(job);
        } else {
          job();
        }
      };
    }
    var runner = effect(getter, {
      lazy: true,
      onTrack,
      onTrigger,
      scheduler
    });
    recordInstanceBoundEffect(runner, instance);
    if (cb) {
      if (immediate) {
        job();
      } else {
        oldValue = runner();
      }
    } else if (flush === "post") {
      queuePostRenderEffect(runner, instance && instance.suspense);
    } else {
      runner();
    }
    return () => {
      stop(runner);
      if (instance) {
        remove(instance.effects, runner);
      }
    };
  }
  function instanceWatch(source, value, options) {
    var publicThis = this.proxy;
    var getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
    var cb;
    if (isFunction(value)) {
      cb = value;
    } else {
      cb = value.handler;
      options = value;
    }
    return doWatch(getter, cb.bind(publicThis), options, this);
  }
  function createPathGetter(ctx2, path) {
    var segments = path.split(".");
    return () => {
      var cur = ctx2;
      for (var i2 = 0; i2 < segments.length && cur; i2++) {
        cur = cur[segments[i2]];
      }
      return cur;
    };
  }
  function traverse(value, seen = new Set()) {
    if (!isObject$1(value) || seen.has(value) || value["__v_skip"]) {
      return value;
    }
    seen.add(value);
    if (isRef(value)) {
      traverse(value.value, seen);
    } else if (isArray(value)) {
      for (var i2 = 0; i2 < value.length; i2++) {
        traverse(value[i2], seen);
      }
    } else if (isSet(value) || isMap(value)) {
      value.forEach((v2) => {
        traverse(v2, seen);
      });
    } else if (isPlainObject(value)) {
      for (var key2 in value) {
        traverse(value[key2], seen);
      }
    }
    return value;
  }
  function defineComponent(options) {
    return isFunction(options) ? {
      setup: options,
      name: options.name
    } : options;
  }
  var isAsyncWrapper = (i2) => !!i2.type.__asyncLoader;
  var isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
  function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a", target);
  }
  function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da", target);
  }
  function registerKeepAliveHook(hook, type, target = currentInstance) {
    var wrappedHook = hook.__wdc || (hook.__wdc = () => {
      var current2 = target;
      while (current2) {
        if (current2.isDeactivated) {
          return;
        }
        current2 = current2.parent;
      }
      hook();
    });
    injectHook(type, wrappedHook, target);
    if (target) {
      var current = target.parent;
      while (current && current.parent) {
        if (isKeepAlive(current.parent.vnode)) {
          injectToKeepAliveRoot(wrappedHook, type, target, current);
        }
        current = current.parent;
      }
    }
  }
  function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    var injected = injectHook(type, hook, keepAliveRoot, true);
    onUnmounted(() => {
      remove(keepAliveRoot[type], injected);
    }, target);
  }
  function injectHook(type, hook, target = currentInstance, prepend = false) {
    if (target) {
      var hooks = target[type] || (target[type] = []);
      var wrappedHook = hook.__weh || (hook.__weh = (...args) => {
        if (target.isUnmounted) {
          return;
        }
        pauseTracking();
        setCurrentInstance(target);
        var res = callWithAsyncErrorHandling(hook, target, type, args);
        setCurrentInstance(null);
        resetTracking();
        return res;
      });
      if (prepend) {
        hooks.unshift(wrappedHook);
      } else {
        hooks.push(wrappedHook);
      }
      return wrappedHook;
    }
  }
  var createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, hook, target);
  var onBeforeMount = createHook("bm");
  var onMounted = createHook("m");
  var onBeforeUpdate = createHook("bu");
  var onUpdated = createHook("u");
  var onBeforeUnmount = createHook("bum");
  var onUnmounted = createHook("um");
  var onServerPrefetch = createHook("sp");
  var onRenderTriggered = createHook("rtg");
  var onRenderTracked = createHook("rtc");
  function onErrorCaptured(hook, target = currentInstance) {
    injectHook("ec", hook, target);
  }
  var shouldCacheAccess = true;
  function applyOptions(instance) {
    var options = resolveMergedOptions(instance);
    var publicThis = instance.proxy;
    var ctx2 = instance.ctx;
    shouldCacheAccess = false;
    if (options.beforeCreate) {
      callHook(options.beforeCreate, instance, "bc");
    }
    var {
      data: dataOptions,
      computed: computedOptions,
      methods: methods2,
      watch: watchOptions,
      provide: provideOptions,
      inject: injectOptions,
      created,
      beforeMount,
      mounted,
      beforeUpdate,
      updated,
      activated,
      deactivated,
      beforeDestroy,
      beforeUnmount,
      destroyed,
      unmounted,
      render,
      renderTracked,
      renderTriggered,
      errorCaptured,
      serverPrefetch,
      expose,
      inheritAttrs,
      components,
      directives,
      filters
    } = options;
    var checkDuplicateProperties = null;
    if (injectOptions) {
      resolveInjections(injectOptions, ctx2, checkDuplicateProperties);
    }
    if (methods2) {
      for (var _key2 in methods2) {
        var methodHandler = methods2[_key2];
        if (isFunction(methodHandler)) {
          {
            ctx2[_key2] = methodHandler.bind(publicThis);
          }
        }
      }
    }
    if (dataOptions) {
      (function() {
        var data = dataOptions.call(publicThis, publicThis);
        if (!isObject$1(data))
          ;
        else {
          instance.data = reactive(data);
        }
      })();
    }
    shouldCacheAccess = true;
    if (computedOptions) {
      var _loop2 = function(_key42) {
        var opt = computedOptions[_key42];
        var get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
        var set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
        var c = computed$1({
          get: get2,
          set: set2
        });
        Object.defineProperty(ctx2, _key42, {
          enumerable: true,
          configurable: true,
          get: () => c.value,
          set: (v2) => c.value = v2
        });
      };
      for (var _key4 in computedOptions) {
        _loop2(_key4);
      }
    }
    if (watchOptions) {
      for (var _key5 in watchOptions) {
        createWatcher(watchOptions[_key5], ctx2, publicThis, _key5);
      }
    }
    if (provideOptions) {
      var provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key2) => {
        provide(key2, provides[key2]);
      });
    }
    if (created) {
      callHook(created, instance, "c");
    }
    function registerLifecycleHook(register2, hook) {
      if (isArray(hook)) {
        hook.forEach((_hook) => register2(_hook.bind(publicThis)));
      } else if (hook) {
        register2(hook.bind(publicThis));
      }
    }
    registerLifecycleHook(onBeforeMount, beforeMount);
    registerLifecycleHook(onMounted, mounted);
    registerLifecycleHook(onBeforeUpdate, beforeUpdate);
    registerLifecycleHook(onUpdated, updated);
    registerLifecycleHook(onActivated, activated);
    registerLifecycleHook(onDeactivated, deactivated);
    registerLifecycleHook(onErrorCaptured, errorCaptured);
    registerLifecycleHook(onRenderTracked, renderTracked);
    registerLifecycleHook(onRenderTriggered, renderTriggered);
    registerLifecycleHook(onBeforeUnmount, beforeUnmount);
    registerLifecycleHook(onUnmounted, unmounted);
    registerLifecycleHook(onServerPrefetch, serverPrefetch);
    if (isArray(expose)) {
      if (expose.length) {
        var exposed = instance.exposed || (instance.exposed = {});
        expose.forEach((key2) => {
          Object.defineProperty(exposed, key2, {
            get: () => publicThis[key2],
            set: (val) => publicThis[key2] = val
          });
        });
      } else if (!instance.exposed) {
        instance.exposed = {};
      }
    }
    if (render && instance.render === NOOP) {
      instance.render = render;
    }
    if (inheritAttrs != null) {
      instance.inheritAttrs = inheritAttrs;
    }
    if (components)
      instance.components = components;
    if (directives)
      instance.directives = directives;
  }
  function resolveInjections(injectOptions, ctx2, checkDuplicateProperties = NOOP) {
    if (isArray(injectOptions)) {
      injectOptions = normalizeInject(injectOptions);
    }
    for (var key2 in injectOptions) {
      var opt = injectOptions[key2];
      if (isObject$1(opt)) {
        if ("default" in opt) {
          ctx2[key2] = inject(opt.from || key2, opt.default, true);
        } else {
          ctx2[key2] = inject(opt.from || key2);
        }
      } else {
        ctx2[key2] = inject(opt);
      }
    }
  }
  function callHook(hook, instance, type) {
    callWithAsyncErrorHandling(isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
  }
  function createWatcher(raw, ctx2, publicThis, key2) {
    var getter = key2.includes(".") ? createPathGetter(publicThis, key2) : () => publicThis[key2];
    if (isString(raw)) {
      var handler = ctx2[raw];
      if (isFunction(handler)) {
        watch(getter, handler);
      }
    } else if (isFunction(raw)) {
      watch(getter, raw.bind(publicThis));
    } else if (isObject$1(raw)) {
      if (isArray(raw)) {
        raw.forEach((r) => createWatcher(r, ctx2, publicThis, key2));
      } else {
        var _handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx2[raw.handler];
        if (isFunction(_handler)) {
          watch(getter, _handler, raw);
        }
      }
    } else
      ;
  }
  function resolveMergedOptions(instance) {
    var base2 = instance.type;
    var {
      mixins,
      extends: extendsOptions
    } = base2;
    var {
      mixins: globalMixins,
      optionsCache: cache2,
      config: {
        optionMergeStrategies
      }
    } = instance.appContext;
    var cached = cache2.get(base2);
    var resolved;
    if (cached) {
      resolved = cached;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
      {
        resolved = base2;
      }
    } else {
      resolved = {};
      if (globalMixins.length) {
        globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
      }
      mergeOptions(resolved, base2, optionMergeStrategies);
    }
    cache2.set(base2, resolved);
    return resolved;
  }
  function mergeOptions(to, from, strats, asMixin = false) {
    var {
      mixins,
      extends: extendsOptions
    } = from;
    if (extendsOptions) {
      mergeOptions(to, extendsOptions, strats, true);
    }
    if (mixins) {
      mixins.forEach((m) => mergeOptions(to, m, strats, true));
    }
    for (var key2 in from) {
      if (asMixin && key2 === "expose")
        ;
      else {
        var strat = internalOptionMergeStrats[key2] || strats && strats[key2];
        to[key2] = strat ? strat(to[key2], from[key2]) : from[key2];
      }
    }
    return to;
  }
  var internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeObjectOptions,
    emits: mergeObjectOptions,
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    destroyed: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    watch: mergeWatchOptions,
    provide: mergeDataFn,
    inject: mergeInject
  };
  function mergeDataFn(to, from) {
    if (!from) {
      return to;
    }
    if (!to) {
      return from;
    }
    return function mergedDataFn() {
      return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
    };
  }
  function mergeInject(to, from) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
  }
  function normalizeInject(raw) {
    if (isArray(raw)) {
      var res = {};
      for (var i2 = 0; i2 < raw.length; i2++) {
        res[raw[i2]] = raw[i2];
      }
      return res;
    }
    return raw;
  }
  function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
  }
  function mergeObjectOptions(to, from) {
    return to ? extend(extend(Object.create(null), to), from) : from;
  }
  function mergeWatchOptions(to, from) {
    if (!to)
      return from;
    if (!from)
      return to;
    var merged = extend(Object.create(null), to);
    for (var key2 in from) {
      merged[key2] = mergeAsArray(to[key2], from[key2]);
    }
    return merged;
  }
  function initProps(instance, rawProps, isStateful, isSSR = false) {
    var props2 = {};
    var attrs2 = {};
    def(attrs2, InternalObjectKey, 1);
    instance.propsDefaults = Object.create(null);
    setFullProps(instance, rawProps, props2, attrs2);
    for (var key2 in instance.propsOptions[0]) {
      if (!(key2 in props2)) {
        props2[key2] = void 0;
      }
    }
    if (isStateful) {
      instance.props = isSSR ? props2 : shallowReactive(props2);
    } else {
      if (!instance.type.props) {
        instance.props = attrs2;
      } else {
        instance.props = props2;
      }
    }
    instance.attrs = attrs2;
  }
  function updateProps(instance, rawProps, rawPrevProps, optimized) {
    var {
      props: props2,
      attrs: attrs2,
      vnode: {
        patchFlag
      }
    } = instance;
    var rawCurrentProps = toRaw(props2);
    var [options] = instance.propsOptions;
    var hasAttrsChanged = false;
    if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
      if (patchFlag & 8) {
        var propsToUpdate = instance.vnode.dynamicProps;
        for (var i2 = 0; i2 < propsToUpdate.length; i2++) {
          var key2 = propsToUpdate[i2];
          var value = rawProps[key2];
          if (options) {
            if (hasOwn$1(attrs2, key2)) {
              if (value !== attrs2[key2]) {
                attrs2[key2] = value;
                hasAttrsChanged = true;
              }
            } else {
              var camelizedKey = camelize(key2);
              props2[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
            }
          } else {
            if (value !== attrs2[key2]) {
              attrs2[key2] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
    } else {
      if (setFullProps(instance, rawProps, props2, attrs2)) {
        hasAttrsChanged = true;
      }
      var kebabKey;
      for (var _key6 in rawCurrentProps) {
        if (!rawProps || !hasOwn$1(rawProps, _key6) && ((kebabKey = hyphenate(_key6)) === _key6 || !hasOwn$1(rawProps, kebabKey))) {
          if (options) {
            if (rawPrevProps && (rawPrevProps[_key6] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
              props2[_key6] = resolvePropValue(options, rawCurrentProps, _key6, void 0, instance, true);
            }
          } else {
            delete props2[_key6];
          }
        }
      }
      if (attrs2 !== rawCurrentProps) {
        for (var _key7 in attrs2) {
          if (!rawProps || !hasOwn$1(rawProps, _key7)) {
            delete attrs2[_key7];
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (hasAttrsChanged) {
      trigger(instance, "set", "$attrs");
    }
  }
  function setFullProps(instance, rawProps, props2, attrs2) {
    var [options, needCastKeys] = instance.propsOptions;
    var hasAttrsChanged = false;
    var rawCastValues;
    if (rawProps) {
      for (var key2 in rawProps) {
        if (isReservedProp(key2)) {
          continue;
        }
        var value = rawProps[key2];
        var camelKey = void 0;
        if (options && hasOwn$1(options, camelKey = camelize(key2))) {
          if (!needCastKeys || !needCastKeys.includes(camelKey)) {
            props2[camelKey] = value;
          } else {
            (rawCastValues || (rawCastValues = {}))[camelKey] = value;
          }
        } else if (!isEmitListener(instance.emitsOptions, key2)) {
          if (value !== attrs2[key2]) {
            attrs2[key2] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (needCastKeys) {
      var rawCurrentProps = toRaw(props2);
      var castValues = rawCastValues || EMPTY_OBJ;
      for (var i2 = 0; i2 < needCastKeys.length; i2++) {
        var _key8 = needCastKeys[i2];
        props2[_key8] = resolvePropValue(options, rawCurrentProps, _key8, castValues[_key8], instance, !hasOwn$1(castValues, _key8));
      }
    }
    return hasAttrsChanged;
  }
  function resolvePropValue(options, props2, key2, value, instance, isAbsent) {
    var opt = options[key2];
    if (opt != null) {
      var hasDefault = hasOwn$1(opt, "default");
      if (hasDefault && value === void 0) {
        var defaultValue = opt.default;
        if (opt.type !== Function && isFunction(defaultValue)) {
          var {
            propsDefaults
          } = instance;
          if (key2 in propsDefaults) {
            value = propsDefaults[key2];
          } else {
            setCurrentInstance(instance);
            value = propsDefaults[key2] = defaultValue.call(null, props2);
            setCurrentInstance(null);
          }
        } else {
          value = defaultValue;
        }
      }
      if (opt[0]) {
        if (isAbsent && !hasDefault) {
          value = false;
        } else if (opt[1] && (value === "" || value === hyphenate(key2))) {
          value = true;
        }
      }
    }
    return value;
  }
  function normalizePropsOptions(comp, appContext, asMixin = false) {
    var cache2 = appContext.propsCache;
    var cached = cache2.get(comp);
    if (cached) {
      return cached;
    }
    var raw = comp.props;
    var normalized = {};
    var needCastKeys = [];
    var hasExtends = false;
    if (!isFunction(comp)) {
      var extendProps = (raw2) => {
        hasExtends = true;
        var [props2, keys] = normalizePropsOptions(raw2, appContext, true);
        extend(normalized, props2);
        if (keys)
          needCastKeys.push(...keys);
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendProps);
      }
      if (comp.extends) {
        extendProps(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendProps);
      }
    }
    if (!raw && !hasExtends) {
      cache2.set(comp, EMPTY_ARR);
      return EMPTY_ARR;
    }
    if (isArray(raw)) {
      for (var i2 = 0; i2 < raw.length; i2++) {
        var normalizedKey = camelize(raw[i2]);
        if (validatePropName(normalizedKey)) {
          normalized[normalizedKey] = EMPTY_OBJ;
        }
      }
    } else if (raw) {
      for (var key2 in raw) {
        var _normalizedKey = camelize(key2);
        if (validatePropName(_normalizedKey)) {
          var opt = raw[key2];
          var prop = normalized[_normalizedKey] = isArray(opt) || isFunction(opt) ? {
            type: opt
          } : opt;
          if (prop) {
            var booleanIndex = getTypeIndex(Boolean, prop.type);
            var stringIndex = getTypeIndex(String, prop.type);
            prop[0] = booleanIndex > -1;
            prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
            if (booleanIndex > -1 || hasOwn$1(prop, "default")) {
              needCastKeys.push(_normalizedKey);
            }
          }
        }
      }
    }
    var res = [normalized, needCastKeys];
    cache2.set(comp, res);
    return res;
  }
  function validatePropName(key2) {
    if (key2[0] !== "$") {
      return true;
    }
    return false;
  }
  function getType$1(ctor) {
    var match = ctor && ctor.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : "";
  }
  function isSameType(a2, b) {
    return getType$1(a2) === getType$1(b);
  }
  function getTypeIndex(type, expectedTypes) {
    if (isArray(expectedTypes)) {
      return expectedTypes.findIndex((t2) => isSameType(t2, type));
    } else if (isFunction(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1;
    }
    return -1;
  }
  var isInternalKey = (key2) => key2[0] === "_" || key2 === "$stable";
  var normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
  var normalizeSlot = (key2, rawSlot, ctx2) => {
    var normalized = withCtx((props2) => {
      return normalizeSlotValue(rawSlot(props2));
    }, ctx2);
    normalized._c = false;
    return normalized;
  };
  var normalizeObjectSlots = (rawSlots, slots, instance) => {
    var ctx2 = rawSlots._ctx;
    for (var key2 in rawSlots) {
      if (isInternalKey(key2))
        continue;
      var value = rawSlots[key2];
      if (isFunction(value)) {
        slots[key2] = normalizeSlot(key2, value, ctx2);
      } else if (value != null) {
        (function() {
          var normalized = normalizeSlotValue(value);
          slots[key2] = () => normalized;
        })();
      }
    }
  };
  var normalizeVNodeSlots = (instance, children) => {
    var normalized = normalizeSlotValue(children);
    instance.slots.default = () => normalized;
  };
  var initSlots = (instance, children) => {
    if (instance.vnode.shapeFlag & 32) {
      var type = children._;
      if (type) {
        instance.slots = toRaw(children);
        def(children, "_", type);
      } else {
        normalizeObjectSlots(children, instance.slots = {});
      }
    } else {
      instance.slots = {};
      if (children) {
        normalizeVNodeSlots(instance, children);
      }
    }
    def(instance.slots, InternalObjectKey, 1);
  };
  var updateSlots = (instance, children, optimized) => {
    var {
      vnode,
      slots
    } = instance;
    var needDeletionCheck = true;
    var deletionComparisonTarget = EMPTY_OBJ;
    if (vnode.shapeFlag & 32) {
      var type = children._;
      if (type) {
        if (optimized && type === 1) {
          needDeletionCheck = false;
        } else {
          extend(slots, children);
          if (!optimized && type === 1) {
            delete slots._;
          }
        }
      } else {
        needDeletionCheck = !children.$stable;
        normalizeObjectSlots(children, slots);
      }
      deletionComparisonTarget = children;
    } else if (children) {
      normalizeVNodeSlots(instance, children);
      deletionComparisonTarget = {
        default: 1
      };
    }
    if (needDeletionCheck) {
      for (var key2 in slots) {
        if (!isInternalKey(key2) && !(key2 in deletionComparisonTarget)) {
          delete slots[key2];
        }
      }
    }
  };
  function withDirectives(vnode, directives) {
    var internalInstance = currentRenderingInstance;
    if (internalInstance === null) {
      return vnode;
    }
    var instance = internalInstance.proxy;
    var bindings = vnode.dirs || (vnode.dirs = []);
    for (var i2 = 0; i2 < directives.length; i2++) {
      var [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i2];
      if (isFunction(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
    return vnode;
  }
  function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    var bindings = vnode.dirs;
    var oldBindings = prevVNode && prevVNode.dirs;
    for (var i2 = 0; i2 < bindings.length; i2++) {
      var binding = bindings[i2];
      if (oldBindings) {
        binding.oldValue = oldBindings[i2].value;
      }
      var hook = binding.dir[name];
      if (hook) {
        pauseTracking();
        callWithAsyncErrorHandling(hook, instance, 8, [vnode.el, binding, vnode, prevVNode]);
        resetTracking();
      }
    }
  }
  function createAppContext() {
    return {
      app: null,
      config: {
        isNativeTag: NO,
        performance: false,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: Object.create(null),
      optionsCache: new WeakMap(),
      propsCache: new WeakMap(),
      emitsCache: new WeakMap()
    };
  }
  var uid$1 = 0;
  function createAppAPI(render, hydrate) {
    return function createApp2(rootComponent, rootProps = null) {
      if (rootProps != null && !isObject$1(rootProps)) {
        rootProps = null;
      }
      var context = createAppContext();
      var installedPlugins = new Set();
      var isMounted = false;
      var app = context.app = {
        _uid: uid$1++,
        _component: rootComponent,
        _props: rootProps,
        _container: null,
        _context: context,
        _instance: null,
        version,
        get config() {
          return context.config;
        },
        set config(v2) {
        },
        use(plugin, ...options) {
          if (installedPlugins.has(plugin))
            ;
          else if (plugin && isFunction(plugin.install)) {
            installedPlugins.add(plugin);
            plugin.install(app, ...options);
          } else if (isFunction(plugin)) {
            installedPlugins.add(plugin);
            plugin(app, ...options);
          } else
            ;
          return app;
        },
        mixin(mixin) {
          {
            if (!context.mixins.includes(mixin)) {
              context.mixins.push(mixin);
            }
          }
          return app;
        },
        component(name, component) {
          if (!component) {
            return context.components[name];
          }
          context.components[name] = component;
          return app;
        },
        directive(name, directive) {
          if (!directive) {
            return context.directives[name];
          }
          context.directives[name] = directive;
          return app;
        },
        mount(rootContainer, isHydrate, isSVG) {
          if (!isMounted) {
            var vnode = createVNode(rootComponent, rootProps);
            vnode.appContext = context;
            if (isHydrate && hydrate) {
              hydrate(vnode, rootContainer);
            } else {
              render(vnode, rootContainer, isSVG);
            }
            isMounted = true;
            app._container = rootContainer;
            rootContainer.__vue_app__ = app;
            return vnode.component.proxy;
          }
        },
        unmount() {
          if (isMounted) {
            render(null, app._container);
            delete app._container.__vue_app__;
          }
        },
        provide(key2, value) {
          context.provides[key2] = value;
          return app;
        }
      };
      return app;
    };
  }
  var prodEffectOptions = {
    scheduler: queueJob,
    allowRecurse: true
  };
  var queuePostRenderEffect = queueEffectWithSuspense;
  var setRef = (rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) => {
    if (isArray(rawRef)) {
      rawRef.forEach((r, i2) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i2] : oldRawRef), parentSuspense, vnode, isUnmount));
      return;
    }
    if (isAsyncWrapper(vnode) && !isUnmount) {
      return;
    }
    var refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
    var value = isUnmount ? null : refValue;
    var {
      i: owner,
      r: ref2
    } = rawRef;
    var oldRef = oldRawRef && oldRawRef.r;
    var refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
    var setupState = owner.setupState;
    if (oldRef != null && oldRef !== ref2) {
      if (isString(oldRef)) {
        refs[oldRef] = null;
        if (hasOwn$1(setupState, oldRef)) {
          setupState[oldRef] = null;
        }
      } else if (isRef(oldRef)) {
        oldRef.value = null;
      }
    }
    if (isString(ref2)) {
      var doSet = () => {
        {
          refs[ref2] = value;
        }
        if (hasOwn$1(setupState, ref2)) {
          setupState[ref2] = value;
        }
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else if (isRef(ref2)) {
      var _doSet = () => {
        ref2.value = value;
      };
      if (value) {
        _doSet.id = -1;
        queuePostRenderEffect(_doSet, parentSuspense);
      } else {
        _doSet();
      }
    } else if (isFunction(ref2)) {
      callWithErrorHandling(ref2, owner, 12, [value, refs]);
    } else
      ;
  };
  function createRenderer(options) {
    return baseCreateRenderer(options);
  }
  function baseCreateRenderer(options, createHydrationFns) {
    var {
      insert: hostInsert,
      remove: hostRemove,
      patchProp: hostPatchProp,
      forcePatchProp: hostForcePatchProp,
      createElement: hostCreateElement,
      createText: hostCreateText,
      createComment: hostCreateComment,
      setText: hostSetText,
      setElementText: hostSetElementText,
      parentNode: hostParentNode,
      nextSibling: hostNextSibling,
      setScopeId: hostSetScopeId = NOOP,
      cloneNode: hostCloneNode,
      insertStaticContent: hostInsertStaticContent
    } = options;
    var patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = false) => {
      if (n1 && !isSameVNodeType(n1, n2)) {
        anchor = getNextHostNode(n1);
        unmount(n1, parentComponent, parentSuspense, true);
        n1 = null;
      }
      if (n2.patchFlag === -2) {
        optimized = false;
        n2.dynamicChildren = null;
      }
      var {
        type,
        ref: ref2,
        shapeFlag
      } = n2;
      switch (type) {
        case Text$1:
          processText(n1, n2, container, anchor);
          break;
        case Comment$1:
          processCommentNode(n1, n2, container, anchor);
          break;
        case Static:
          if (n1 == null) {
            mountStaticNode(n2, container, anchor, isSVG);
          }
          break;
        case Fragment:
          processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          break;
        default:
          if (shapeFlag & 1) {
            processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (shapeFlag & 6) {
            processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (shapeFlag & 64) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
          } else if (shapeFlag & 128) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
          } else
            ;
      }
      if (ref2 != null && parentComponent) {
        setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
      }
    };
    var processText = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
      } else {
        var el = n2.el = n1.el;
        if (n2.children !== n1.children) {
          hostSetText(el, n2.children);
        }
      }
    };
    var processCommentNode = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
      } else {
        n2.el = n1.el;
      }
    };
    var mountStaticNode = (n2, container, anchor, isSVG) => {
      var nodes = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.staticCache);
      if (!n2.el) {
        n2.staticCache = nodes;
      }
      n2.el = nodes[0];
      n2.anchor = nodes[nodes.length - 1];
    };
    var moveStaticNode = ({
      el,
      anchor
    }, container, nextSibling) => {
      var next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostInsert(el, container, nextSibling);
        el = next;
      }
      hostInsert(anchor, container, nextSibling);
    };
    var removeStaticNode = ({
      el,
      anchor
    }) => {
      var next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostRemove(el);
        el = next;
      }
      hostRemove(anchor);
    };
    var processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      isSVG = isSVG || n2.type === "svg";
      if (n1 == null) {
        mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    };
    var mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      var el;
      var vnodeHook;
      var {
        type,
        props: props2,
        shapeFlag,
        transition,
        patchFlag,
        dirs
      } = vnode;
      if (vnode.el && hostCloneNode !== void 0 && patchFlag === -1) {
        el = vnode.el = hostCloneNode(vnode.el);
      } else {
        el = vnode.el = hostCreateElement(vnode.type, isSVG, props2 && props2.is, props2);
        if (shapeFlag & 8) {
          hostSetElementText(el, vnode.children);
        } else if (shapeFlag & 16) {
          mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized || !!vnode.dynamicChildren);
        }
        if (dirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "created");
        }
        if (props2) {
          for (var key2 in props2) {
            if (!isReservedProp(key2)) {
              hostPatchProp(el, key2, null, props2[key2], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
          if (vnodeHook = props2.onVnodeBeforeMount) {
            invokeVNodeHook(vnodeHook, parentComponent, vnode);
          }
        }
        setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
      }
      Object.defineProperty(el, "__vueParentComponent", {
        value: parentComponent,
        enumerable: false
      });
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      var needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
      if (needCallTransitionHooks) {
        transition.beforeEnter(el);
      }
      hostInsert(el, container, anchor);
      if ((vnodeHook = props2 && props2.onVnodeMounted) || needCallTransitionHooks || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
    };
    var setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
      if (scopeId) {
        hostSetScopeId(el, scopeId);
      }
      if (slotScopeIds) {
        for (var i2 = 0; i2 < slotScopeIds.length; i2++) {
          hostSetScopeId(el, slotScopeIds[i2]);
        }
      }
      if (parentComponent) {
        var subTree = parentComponent.subTree;
        if (vnode === subTree) {
          var parentVNode = parentComponent.vnode;
          setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
        }
      }
    };
    var mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
      for (var i2 = start; i2 < children.length; i2++) {
        var child = children[i2] = optimized ? cloneIfMounted(children[i2]) : normalizeVNode(children[i2]);
        patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    };
    var patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      var el = n2.el = n1.el;
      var {
        patchFlag,
        dynamicChildren,
        dirs
      } = n2;
      patchFlag |= n1.patchFlag & 16;
      var oldProps = n1.props || EMPTY_OBJ;
      var newProps = n2.props || EMPTY_OBJ;
      var vnodeHook;
      if (vnodeHook = newProps.onVnodeBeforeUpdate) {
        invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
      }
      if (dirs) {
        invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
      }
      if (patchFlag > 0) {
        if (patchFlag & 16) {
          patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
        } else {
          if (patchFlag & 2) {
            if (oldProps.class !== newProps.class) {
              hostPatchProp(el, "class", null, newProps.class, isSVG);
            }
          }
          if (patchFlag & 4) {
            hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
          }
          if (patchFlag & 8) {
            var propsToUpdate = n2.dynamicProps;
            for (var i2 = 0; i2 < propsToUpdate.length; i2++) {
              var key2 = propsToUpdate[i2];
              var prev = oldProps[key2];
              var next = newProps[key2];
              if (next !== prev || hostForcePatchProp && hostForcePatchProp(el, key2)) {
                hostPatchProp(el, key2, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
              }
            }
          }
        }
        if (patchFlag & 1) {
          if (n1.children !== n2.children) {
            hostSetElementText(el, n2.children);
          }
        }
      } else if (!optimized && dynamicChildren == null) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      }
      var areChildrenSVG = isSVG && n2.type !== "foreignObject";
      if (dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
      } else if (!optimized) {
        patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
      }
      if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
          dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
        }, parentSuspense);
      }
    };
    var patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
      for (var i2 = 0; i2 < newChildren.length; i2++) {
        var oldVNode = oldChildren[i2];
        var newVNode = newChildren[i2];
        var container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & 6 || oldVNode.shapeFlag & 64) ? hostParentNode(oldVNode.el) : fallbackContainer;
        patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
      }
    };
    var patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
      if (oldProps !== newProps) {
        for (var key2 in newProps) {
          if (isReservedProp(key2))
            continue;
          var next = newProps[key2];
          var prev = oldProps[key2];
          if (next !== prev || hostForcePatchProp && hostForcePatchProp(el, key2)) {
            hostPatchProp(el, key2, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if (oldProps !== EMPTY_OBJ) {
          for (var _key9 in oldProps) {
            if (!isReservedProp(_key9) && !(_key9 in newProps)) {
              hostPatchProp(el, _key9, oldProps[_key9], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
    };
    var processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      var fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
      var fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
      var {
        patchFlag,
        dynamicChildren,
        slotScopeIds: fragmentSlotScopeIds
      } = n2;
      if (dynamicChildren) {
        optimized = true;
      }
      if (fragmentSlotScopeIds) {
        slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
      }
      if (n1 == null) {
        hostInsert(fragmentStartAnchor, container, anchor);
        hostInsert(fragmentEndAnchor, container, anchor);
        mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
          patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
          if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
            traverseStaticChildren(n1, n2, true);
          }
        } else {
          patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    };
    var processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      n2.slotScopeIds = slotScopeIds;
      if (n1 == null) {
        if (n2.shapeFlag & 512) {
          parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
        } else {
          mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        }
      } else {
        updateComponent(n1, n2, optimized);
      }
    };
    var mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
      var instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
      if (isKeepAlive(initialVNode)) {
        instance.ctx.renderer = internals;
      }
      {
        setupComponent(instance);
      }
      if (instance.asyncDep) {
        parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
        if (!initialVNode.el) {
          var placeholder = instance.subTree = createVNode(Comment$1);
          processCommentNode(null, placeholder, container, anchor);
        }
        return;
      }
      setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
    };
    var updateComponent = (n1, n2, optimized) => {
      var instance = n2.component = n1.component;
      if (shouldUpdateComponent(n1, n2, optimized)) {
        if (instance.asyncDep && !instance.asyncResolved) {
          updateComponentPreRender(instance, n2, optimized);
          return;
        } else {
          instance.next = n2;
          invalidateJob(instance.update);
          instance.update();
        }
      } else {
        n2.component = n1.component;
        n2.el = n1.el;
        instance.vnode = n2;
      }
    };
    var setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
      instance.update = effect(function componentEffect() {
        if (!instance.isMounted) {
          var vnodeHook;
          var {
            el,
            props: props2
          } = initialVNode;
          var {
            bm,
            m,
            parent
          } = instance;
          if (bm) {
            invokeArrayFns(bm);
          }
          if (vnodeHook = props2 && props2.onVnodeBeforeMount) {
            invokeVNodeHook(vnodeHook, parent, initialVNode);
          }
          if (el && hydrateNode) {
            var hydrateSubTree = () => {
              instance.subTree = renderComponentRoot(instance);
              hydrateNode(el, instance.subTree, instance, parentSuspense, null);
            };
            if (isAsyncWrapper(initialVNode)) {
              initialVNode.type.__asyncLoader().then(() => !instance.isUnmounted && hydrateSubTree());
            } else {
              hydrateSubTree();
            }
          } else {
            var subTree = instance.subTree = renderComponentRoot(instance);
            patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
            initialVNode.el = subTree.el;
          }
          if (m) {
            queuePostRenderEffect(m, parentSuspense);
          }
          if (vnodeHook = props2 && props2.onVnodeMounted) {
            var scopedInitialVNode = initialVNode;
            queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
          }
          if (initialVNode.shapeFlag & 256) {
            instance.a && queuePostRenderEffect(instance.a, parentSuspense);
          }
          instance.isMounted = true;
          initialVNode = container = anchor = null;
        } else {
          var {
            next,
            bu,
            u,
            parent: _parent,
            vnode
          } = instance;
          var originNext = next;
          var _vnodeHook;
          if (next) {
            next.el = vnode.el;
            updateComponentPreRender(instance, next, optimized);
          } else {
            next = vnode;
          }
          if (bu) {
            invokeArrayFns(bu);
          }
          if (_vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
            invokeVNodeHook(_vnodeHook, _parent, next, vnode);
          }
          var nextTree = renderComponentRoot(instance);
          var prevTree = instance.subTree;
          instance.subTree = nextTree;
          patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, isSVG);
          next.el = nextTree.el;
          if (originNext === null) {
            updateHOCHostEl(instance, nextTree.el);
          }
          if (u) {
            queuePostRenderEffect(u, parentSuspense);
          }
          if (_vnodeHook = next.props && next.props.onVnodeUpdated) {
            queuePostRenderEffect(() => invokeVNodeHook(_vnodeHook, _parent, next, vnode), parentSuspense);
          }
        }
      }, prodEffectOptions);
    };
    var updateComponentPreRender = (instance, nextVNode, optimized) => {
      nextVNode.component = instance;
      var prevProps = instance.vnode.props;
      instance.vnode = nextVNode;
      instance.next = null;
      updateProps(instance, nextVNode.props, prevProps, optimized);
      updateSlots(instance, nextVNode.children, optimized);
      pauseTracking();
      flushPreFlushCbs(void 0, instance.update);
      resetTracking();
    };
    var patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
      var c1 = n1 && n1.children;
      var prevShapeFlag = n1 ? n1.shapeFlag : 0;
      var c2 = n2.children;
      var {
        patchFlag,
        shapeFlag
      } = n2;
      if (patchFlag > 0) {
        if (patchFlag & 128) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          return;
        } else if (patchFlag & 256) {
          patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          return;
        }
      }
      if (shapeFlag & 8) {
        if (prevShapeFlag & 16) {
          unmountChildren(c1, parentComponent, parentSuspense);
        }
        if (c2 !== c1) {
          hostSetElementText(container, c2);
        }
      } else {
        if (prevShapeFlag & 16) {
          if (shapeFlag & 16) {
            patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else {
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
          if (prevShapeFlag & 8) {
            hostSetElementText(container, "");
          }
          if (shapeFlag & 16) {
            mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          }
        }
      }
    };
    var patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      c1 = c1 || EMPTY_ARR;
      c2 = c2 || EMPTY_ARR;
      var oldLength = c1.length;
      var newLength = c2.length;
      var commonLength = Math.min(oldLength, newLength);
      var i2;
      for (i2 = 0; i2 < commonLength; i2++) {
        var nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
        patch(c1[i2], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
      if (oldLength > newLength) {
        unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
      } else {
        mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
      }
    };
    var patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      var i2 = 0;
      var l2 = c2.length;
      var e1 = c1.length - 1;
      var e2 = l2 - 1;
      while (i2 <= e1 && i2 <= e2) {
        var n1 = c1[i2];
        var n2 = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
        if (isSameVNodeType(n1, n2)) {
          patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          break;
        }
        i2++;
      }
      while (i2 <= e1 && i2 <= e2) {
        var _n = c1[e1];
        var _n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
        if (isSameVNodeType(_n, _n2)) {
          patch(_n, _n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          break;
        }
        e1--;
        e2--;
      }
      if (i2 > e1) {
        if (i2 <= e2) {
          var nextPos = e2 + 1;
          var anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
          while (i2 <= e2) {
            patch(null, c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            i2++;
          }
        }
      } else if (i2 > e2) {
        while (i2 <= e1) {
          unmount(c1[i2], parentComponent, parentSuspense, true);
          i2++;
        }
      } else {
        var s1 = i2;
        var s2 = i2;
        var keyToNewIndexMap = new Map();
        for (i2 = s2; i2 <= e2; i2++) {
          var nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
          if (nextChild.key != null) {
            keyToNewIndexMap.set(nextChild.key, i2);
          }
        }
        var j;
        var patched = 0;
        var toBePatched = e2 - s2 + 1;
        var moved = false;
        var maxNewIndexSoFar = 0;
        var newIndexToOldIndexMap = new Array(toBePatched);
        for (i2 = 0; i2 < toBePatched; i2++) {
          newIndexToOldIndexMap[i2] = 0;
        }
        for (i2 = s1; i2 <= e1; i2++) {
          var prevChild = c1[i2];
          if (patched >= toBePatched) {
            unmount(prevChild, parentComponent, parentSuspense, true);
            continue;
          }
          var newIndex = void 0;
          if (prevChild.key != null) {
            newIndex = keyToNewIndexMap.get(prevChild.key);
          } else {
            for (j = s2; j <= e2; j++) {
              if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                newIndex = j;
                break;
              }
            }
          }
          if (newIndex === void 0) {
            unmount(prevChild, parentComponent, parentSuspense, true);
          } else {
            newIndexToOldIndexMap[newIndex - s2] = i2 + 1;
            if (newIndex >= maxNewIndexSoFar) {
              maxNewIndexSoFar = newIndex;
            } else {
              moved = true;
            }
            patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            patched++;
          }
        }
        var increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
        j = increasingNewIndexSequence.length - 1;
        for (i2 = toBePatched - 1; i2 >= 0; i2--) {
          var nextIndex = s2 + i2;
          var _nextChild = c2[nextIndex];
          var _anchor2 = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
          if (newIndexToOldIndexMap[i2] === 0) {
            patch(null, _nextChild, container, _anchor2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (moved) {
            if (j < 0 || i2 !== increasingNewIndexSequence[j]) {
              move(_nextChild, container, _anchor2, 2);
            } else {
              j--;
            }
          }
        }
      }
    };
    var move = (vnode, container, anchor, moveType, parentSuspense = null) => {
      var {
        el,
        type,
        transition,
        children,
        shapeFlag
      } = vnode;
      if (shapeFlag & 6) {
        move(vnode.component.subTree, container, anchor, moveType);
        return;
      }
      if (shapeFlag & 128) {
        vnode.suspense.move(container, anchor, moveType);
        return;
      }
      if (shapeFlag & 64) {
        type.move(vnode, container, anchor, internals);
        return;
      }
      if (type === Fragment) {
        hostInsert(el, container, anchor);
        for (var i2 = 0; i2 < children.length; i2++) {
          move(children[i2], container, anchor, moveType);
        }
        hostInsert(vnode.anchor, container, anchor);
        return;
      }
      if (type === Static) {
        moveStaticNode(vnode, container, anchor);
        return;
      }
      var needTransition = moveType !== 2 && shapeFlag & 1 && transition;
      if (needTransition) {
        if (moveType === 0) {
          transition.beforeEnter(el);
          hostInsert(el, container, anchor);
          queuePostRenderEffect(() => transition.enter(el), parentSuspense);
        } else {
          var {
            leave,
            delayLeave,
            afterLeave
          } = transition;
          var _remove = () => hostInsert(el, container, anchor);
          var performLeave = () => {
            leave(el, () => {
              _remove();
              afterLeave && afterLeave();
            });
          };
          if (delayLeave) {
            delayLeave(el, _remove, performLeave);
          } else {
            performLeave();
          }
        }
      } else {
        hostInsert(el, container, anchor);
      }
    };
    var unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
      var {
        type,
        props: props2,
        ref: ref2,
        children,
        dynamicChildren,
        shapeFlag,
        patchFlag,
        dirs
      } = vnode;
      if (ref2 != null) {
        setRef(ref2, null, parentSuspense, vnode, true);
      }
      if (shapeFlag & 256) {
        parentComponent.ctx.deactivate(vnode);
        return;
      }
      var shouldInvokeDirs = shapeFlag & 1 && dirs;
      var vnodeHook;
      if (vnodeHook = props2 && props2.onVnodeBeforeUnmount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
      if (shapeFlag & 6) {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      } else {
        if (shapeFlag & 128) {
          vnode.suspense.unmount(parentSuspense, doRemove);
          return;
        }
        if (shouldInvokeDirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
        }
        if (shapeFlag & 64) {
          vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
        } else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
          unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
        } else if (type === Fragment && (patchFlag & 128 || patchFlag & 256) || !optimized && shapeFlag & 16) {
          unmountChildren(children, parentComponent, parentSuspense);
        }
        if (doRemove) {
          remove2(vnode);
        }
      }
      if ((vnodeHook = props2 && props2.onVnodeUnmounted) || shouldInvokeDirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
        }, parentSuspense);
      }
    };
    var remove2 = (vnode) => {
      var {
        type,
        el,
        anchor,
        transition
      } = vnode;
      if (type === Fragment) {
        removeFragment(el, anchor);
        return;
      }
      if (type === Static) {
        removeStaticNode(vnode);
        return;
      }
      var performRemove = () => {
        hostRemove(el);
        if (transition && !transition.persisted && transition.afterLeave) {
          transition.afterLeave();
        }
      };
      if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
        var {
          leave,
          delayLeave
        } = transition;
        var performLeave = () => leave(el, performRemove);
        if (delayLeave) {
          delayLeave(vnode.el, performRemove, performLeave);
        } else {
          performLeave();
        }
      } else {
        performRemove();
      }
    };
    var removeFragment = (cur, end) => {
      var next;
      while (cur !== end) {
        next = hostNextSibling(cur);
        hostRemove(cur);
        cur = next;
      }
      hostRemove(end);
    };
    var unmountComponent = (instance, parentSuspense, doRemove) => {
      var {
        bum,
        effects,
        update,
        subTree,
        um
      } = instance;
      if (bum) {
        invokeArrayFns(bum);
      }
      if (effects) {
        for (var i2 = 0; i2 < effects.length; i2++) {
          stop(effects[i2]);
        }
      }
      if (update) {
        stop(update);
        unmount(subTree, instance, parentSuspense, doRemove);
      }
      if (um) {
        queuePostRenderEffect(um, parentSuspense);
      }
      queuePostRenderEffect(() => {
        instance.isUnmounted = true;
      }, parentSuspense);
      if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
        parentSuspense.deps--;
        if (parentSuspense.deps === 0) {
          parentSuspense.resolve();
        }
      }
    };
    var unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
      for (var i2 = start; i2 < children.length; i2++) {
        unmount(children[i2], parentComponent, parentSuspense, doRemove, optimized);
      }
    };
    var getNextHostNode = (vnode) => {
      if (vnode.shapeFlag & 6) {
        return getNextHostNode(vnode.component.subTree);
      }
      if (vnode.shapeFlag & 128) {
        return vnode.suspense.next();
      }
      return hostNextSibling(vnode.anchor || vnode.el);
    };
    var render = (vnode, container, isSVG) => {
      if (vnode == null) {
        if (container._vnode) {
          unmount(container._vnode, null, null, true);
        }
      } else {
        var _p = container.__vueParent;
        patch(container._vnode || null, vnode, container, null, _p, null, isSVG);
      }
      container._vnode = vnode;
    };
    var internals = {
      p: patch,
      um: unmount,
      m: move,
      r: remove2,
      mt: mountComponent,
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      n: getNextHostNode,
      o: options
    };
    var hydrate;
    var hydrateNode;
    if (createHydrationFns) {
      [hydrate, hydrateNode] = createHydrationFns(internals);
    }
    return {
      render,
      hydrate,
      createApp: createAppAPI(render, hydrate)
    };
  }
  function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance, 7, [vnode, prevVNode]);
  }
  function traverseStaticChildren(n1, n2, shallow = false) {
    var ch1 = n1.children;
    var ch2 = n2.children;
    if (isArray(ch1) && isArray(ch2)) {
      for (var i2 = 0; i2 < ch1.length; i2++) {
        var c1 = ch1[i2];
        var c2 = ch2[i2];
        if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
          if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
            c2 = ch2[i2] = cloneIfMounted(ch2[i2]);
            c2.el = c1.el;
          }
          if (!shallow)
            traverseStaticChildren(c1, c2);
        }
      }
    }
  }
  function getSequence(arr) {
    var p2 = arr.slice();
    var result = [0];
    var i2, j, u, v2, c;
    var len = arr.length;
    for (i2 = 0; i2 < len; i2++) {
      var arrI = arr[i2];
      if (arrI !== 0) {
        j = result[result.length - 1];
        if (arr[j] < arrI) {
          p2[i2] = j;
          result.push(i2);
          continue;
        }
        u = 0;
        v2 = result.length - 1;
        while (u < v2) {
          c = (u + v2) / 2 | 0;
          if (arr[result[c]] < arrI) {
            u = c + 1;
          } else {
            v2 = c;
          }
        }
        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p2[i2] = result[u - 1];
          }
          result[u] = i2;
        }
      }
    }
    u = result.length;
    v2 = result[u - 1];
    while (u-- > 0) {
      result[u] = v2;
      v2 = p2[v2];
    }
    return result;
  }
  var isTeleport = (type) => type.__isTeleport;
  var NULL_DYNAMIC_COMPONENT = Symbol();
  var Fragment = Symbol(void 0);
  var Text$1 = Symbol(void 0);
  var Comment$1 = Symbol(void 0);
  var Static = Symbol(void 0);
  var currentBlock = null;
  var isBlockTreeEnabled = 1;
  function setBlockTracking(value) {
    isBlockTreeEnabled += value;
  }
  function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
  }
  function isSameVNodeType(n1, n2) {
    return n1.type === n2.type && n1.key === n2.key;
  }
  var InternalObjectKey = "__vInternal";
  var normalizeKey = ({
    key: key2
  }) => key2 != null ? key2 : null;
  var normalizeRef = ({
    ref: ref2
  }) => {
    return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? {
      i: currentRenderingInstance,
      r: ref2
    } : ref2 : null;
  };
  var createVNode = _createVNode;
  function _createVNode(type, props2 = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
      type = Comment$1;
    }
    if (isVNode(type)) {
      var cloned = cloneVNode(type, props2, true);
      if (children) {
        normalizeChildren(cloned, children);
      }
      return cloned;
    }
    if (isClassComponent(type)) {
      type = type.__vccOpts;
    }
    if (props2) {
      if (isProxy(props2) || InternalObjectKey in props2) {
        props2 = extend({}, props2);
      }
      var {
        class: klass,
        style
      } = props2;
      if (klass && !isString(klass)) {
        props2.class = normalizeClass(klass);
      }
      if (isObject$1(style)) {
        if (isProxy(style) && !isArray(style)) {
          style = extend({}, style);
        }
        props2.style = normalizeStyle(style);
      }
    }
    var shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction(type) ? 2 : 0;
    var vnode = {
      __v_isVNode: true,
      __v_skip: true,
      type,
      props: props2,
      key: props2 && normalizeKey(props2),
      ref: props2 && normalizeRef(props2),
      scopeId: currentScopeId,
      slotScopeIds: null,
      children: null,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetAnchor: null,
      shapeFlag,
      patchFlag,
      dynamicProps,
      dynamicChildren: null,
      appContext: null
    };
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (patchFlag > 0 || shapeFlag & 6) && patchFlag !== 32) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  function cloneVNode(vnode, extraProps, mergeRef = false) {
    var {
      props: props2,
      ref: ref2,
      patchFlag,
      children
    } = vnode;
    var mergedProps = extraProps ? mergeProps(props2 || {}, extraProps) : props2;
    var cloned = {
      __v_isVNode: true,
      __v_skip: true,
      type: vnode.type,
      props: mergedProps,
      key: mergedProps && normalizeKey(mergedProps),
      ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
      scopeId: vnode.scopeId,
      slotScopeIds: vnode.slotScopeIds,
      children,
      target: vnode.target,
      targetAnchor: vnode.targetAnchor,
      staticCount: vnode.staticCount,
      staticCache: vnode.staticCache,
      shapeFlag: vnode.shapeFlag,
      patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
      dynamicProps: vnode.dynamicProps,
      dynamicChildren: vnode.dynamicChildren,
      appContext: vnode.appContext,
      dirs: vnode.dirs,
      transition: vnode.transition,
      component: vnode.component,
      suspense: vnode.suspense,
      ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
      ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
      el: vnode.el,
      anchor: vnode.anchor
    };
    return cloned;
  }
  function createTextVNode(text2 = " ", flag = 0) {
    return createVNode(Text$1, null, text2, flag);
  }
  function normalizeVNode(child) {
    if (child == null || typeof child === "boolean") {
      return createVNode(Comment$1);
    } else if (isArray(child)) {
      return createVNode(Fragment, null, child.slice());
    } else if (typeof child === "object") {
      return cloneIfMounted(child);
    } else {
      return createVNode(Text$1, null, String(child));
    }
  }
  function cloneIfMounted(child) {
    return child.el === null ? child : cloneVNode(child);
  }
  function normalizeChildren(vnode, children) {
    var type = 0;
    var {
      shapeFlag
    } = vnode;
    if (children == null) {
      children = null;
    } else if (isArray(children)) {
      type = 16;
    } else if (typeof children === "object") {
      if (shapeFlag & 1 || shapeFlag & 64) {
        var slot = children.default;
        if (slot) {
          slot._c && (slot._d = false);
          normalizeChildren(vnode, slot());
          slot._c && (slot._d = true);
        }
        return;
      } else {
        type = 32;
        var slotFlag = children._;
        if (!slotFlag && !(InternalObjectKey in children)) {
          children._ctx = currentRenderingInstance;
        } else if (slotFlag === 3 && currentRenderingInstance) {
          if (currentRenderingInstance.slots._ === 1) {
            children._ = 1;
          } else {
            children._ = 2;
            vnode.patchFlag |= 1024;
          }
        }
      }
    } else if (isFunction(children)) {
      children = {
        default: children,
        _ctx: currentRenderingInstance
      };
      type = 32;
    } else {
      children = String(children);
      if (shapeFlag & 64) {
        type = 16;
        children = [createTextVNode(children)];
      } else {
        type = 8;
      }
    }
    vnode.children = children;
    vnode.shapeFlag |= type;
  }
  function mergeProps(...args) {
    var ret = extend({}, args[0]);
    for (var i2 = 1; i2 < args.length; i2++) {
      var toMerge = args[i2];
      for (var key2 in toMerge) {
        if (key2 === "class") {
          if (ret.class !== toMerge.class) {
            ret.class = normalizeClass([ret.class, toMerge.class]);
          }
        } else if (key2 === "style") {
          ret.style = normalizeStyle([ret.style, toMerge.style]);
        } else if (isOn(key2)) {
          var existing = ret[key2];
          var incoming = toMerge[key2];
          if (existing !== incoming) {
            ret[key2] = existing ? [].concat(existing, incoming) : incoming;
          }
        } else if (key2 !== "") {
          ret[key2] = toMerge[key2];
        }
      }
    }
    return ret;
  }
  var getPublicInstance = (i2) => {
    if (!i2)
      return null;
    if (isStatefulComponent(i2))
      return getExposeProxy(i2) || i2.proxy;
    return getPublicInstance(i2.parent);
  };
  var publicPropertiesMap = extend(Object.create(null), {
    $: (i2) => i2,
    $el: (i2) => i2.vnode.el,
    $data: (i2) => i2.data,
    $props: (i2) => i2.props,
    $attrs: (i2) => i2.attrs,
    $slots: (i2) => i2.slots,
    $refs: (i2) => i2.refs,
    $parent: (i2) => getPublicInstance(i2.parent),
    $root: (i2) => getPublicInstance(i2.root),
    $emit: (i2) => i2.emit,
    $options: (i2) => resolveMergedOptions(i2),
    $forceUpdate: (i2) => () => queueJob(i2.update),
    $nextTick: (i2) => nextTick.bind(i2.proxy),
    $watch: (i2) => instanceWatch.bind(i2)
  });
  var PublicInstanceProxyHandlers = {
    get({
      _: instance
    }, key2) {
      var {
        ctx: ctx2,
        setupState,
        data,
        props: props2,
        accessCache,
        type,
        appContext
      } = instance;
      var normalizedProps;
      if (key2[0] !== "$") {
        var n = accessCache[key2];
        if (n !== void 0) {
          switch (n) {
            case 0:
              return setupState[key2];
            case 1:
              return data[key2];
            case 3:
              return ctx2[key2];
            case 2:
              return props2[key2];
          }
        } else if (setupState !== EMPTY_OBJ && hasOwn$1(setupState, key2)) {
          accessCache[key2] = 0;
          return setupState[key2];
        } else if (data !== EMPTY_OBJ && hasOwn$1(data, key2)) {
          accessCache[key2] = 1;
          return data[key2];
        } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn$1(normalizedProps, key2)) {
          accessCache[key2] = 2;
          return props2[key2];
        } else if (ctx2 !== EMPTY_OBJ && hasOwn$1(ctx2, key2)) {
          accessCache[key2] = 3;
          return ctx2[key2];
        } else if (shouldCacheAccess) {
          accessCache[key2] = 4;
        }
      }
      var publicGetter = publicPropertiesMap[key2];
      var cssModule, globalProperties;
      if (publicGetter) {
        if (key2 === "$attrs") {
          track(instance, "get", key2);
        }
        return publicGetter(instance);
      } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key2])) {
        return cssModule;
      } else if (ctx2 !== EMPTY_OBJ && hasOwn$1(ctx2, key2)) {
        accessCache[key2] = 3;
        return ctx2[key2];
      } else if (globalProperties = appContext.config.globalProperties, hasOwn$1(globalProperties, key2)) {
        {
          return globalProperties[key2];
        }
      } else
        ;
    },
    set({
      _: instance
    }, key2, value) {
      var {
        data,
        setupState,
        ctx: ctx2
      } = instance;
      if (setupState !== EMPTY_OBJ && hasOwn$1(setupState, key2)) {
        setupState[key2] = value;
      } else if (data !== EMPTY_OBJ && hasOwn$1(data, key2)) {
        data[key2] = value;
      } else if (hasOwn$1(instance.props, key2)) {
        return false;
      }
      if (key2[0] === "$" && key2.slice(1) in instance) {
        return false;
      } else {
        {
          ctx2[key2] = value;
        }
      }
      return true;
    },
    has({
      _: {
        data,
        setupState,
        accessCache,
        ctx: ctx2,
        appContext,
        propsOptions
      }
    }, key2) {
      var normalizedProps;
      return accessCache[key2] !== void 0 || data !== EMPTY_OBJ && hasOwn$1(data, key2) || setupState !== EMPTY_OBJ && hasOwn$1(setupState, key2) || (normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key2) || hasOwn$1(ctx2, key2) || hasOwn$1(publicPropertiesMap, key2) || hasOwn$1(appContext.config.globalProperties, key2);
    }
  };
  var RuntimeCompiledPublicInstanceProxyHandlers = extend({}, PublicInstanceProxyHandlers, {
    get(target, key2) {
      if (key2 === Symbol.unscopables) {
        return;
      }
      return PublicInstanceProxyHandlers.get(target, key2, target);
    },
    has(_, key2) {
      var has2 = key2[0] !== "_" && !isGloballyWhitelisted(key2);
      return has2;
    }
  });
  var emptyAppContext = createAppContext();
  var uid$2 = 0;
  function createComponentInstance(vnode, parent, suspense) {
    var type = vnode.type;
    var appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    var instance = {
      uid: uid$2++,
      vnode,
      type,
      parent,
      appContext,
      root: null,
      next: null,
      subTree: null,
      update: null,
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      effects: null,
      provides: parent ? parent.provides : Object.create(appContext.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: normalizePropsOptions(type, appContext),
      emitsOptions: normalizeEmitsOptions(type, appContext),
      emit: null,
      emitted: null,
      propsDefaults: EMPTY_OBJ,
      inheritAttrs: type.inheritAttrs,
      ctx: EMPTY_OBJ,
      data: EMPTY_OBJ,
      props: EMPTY_OBJ,
      attrs: EMPTY_OBJ,
      slots: EMPTY_OBJ,
      refs: EMPTY_OBJ,
      setupState: EMPTY_OBJ,
      setupContext: null,
      suspense,
      suspenseId: suspense ? suspense.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
    {
      instance.ctx = {
        _: instance
      };
    }
    instance.root = parent ? parent.root : instance;
    instance.emit = emit$2.bind(null, instance);
    return instance;
  }
  var currentInstance = null;
  var getCurrentInstance = () => currentInstance || currentRenderingInstance;
  var setCurrentInstance = (instance) => {
    currentInstance = instance;
  };
  function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4;
  }
  var isInSSRComponentSetup = false;
  function setupComponent(instance, isSSR = false) {
    isInSSRComponentSetup = isSSR;
    var {
      props: props2,
      children
    } = instance.vnode;
    var isStateful = isStatefulComponent(instance);
    initProps(instance, props2, isStateful, isSSR);
    initSlots(instance, children);
    var setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
    isInSSRComponentSetup = false;
    return setupResult;
  }
  function setupStatefulComponent(instance, isSSR) {
    var Component = instance.type;
    instance.accessCache = Object.create(null);
    instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
    var {
      setup
    } = Component;
    if (setup) {
      var setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
      currentInstance = instance;
      pauseTracking();
      var setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
      resetTracking();
      currentInstance = null;
      if (isPromise(setupResult)) {
        var unsetInstance = () => {
          currentInstance = null;
        };
        setupResult.then(unsetInstance, unsetInstance);
        if (isSSR) {
          return setupResult.then((resolvedResult) => {
            handleSetupResult(instance, resolvedResult);
          }).catch((e2) => {
            handleError(e2, instance, 0);
          });
        } else {
          instance.asyncDep = setupResult;
        }
      } else {
        handleSetupResult(instance, setupResult);
      }
    } else {
      finishComponentSetup(instance);
    }
  }
  function handleSetupResult(instance, setupResult, isSSR) {
    if (isFunction(setupResult)) {
      {
        instance.render = setupResult;
      }
    } else if (isObject$1(setupResult)) {
      instance.setupState = proxyRefs(setupResult);
    } else
      ;
    finishComponentSetup(instance);
  }
  function finishComponentSetup(instance, isSSR, skipOptions) {
    var Component = instance.type;
    if (!instance.render) {
      instance.render = Component.render || NOOP;
      if (instance.render._rc) {
        instance.withProxy = new Proxy(instance.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
      }
    }
    {
      currentInstance = instance;
      pauseTracking();
      applyOptions(instance);
      resetTracking();
      currentInstance = null;
    }
  }
  function createSetupContext(instance) {
    var expose = (exposed) => {
      instance.exposed = exposed || {};
    };
    {
      return {
        attrs: instance.attrs,
        slots: instance.slots,
        emit: instance.emit,
        expose
      };
    }
  }
  function getExposeProxy(instance) {
    if (instance.exposed) {
      return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get(target, key2) {
          if (key2 in target) {
            return target[key2];
          } else if (key2 in publicPropertiesMap) {
            return publicPropertiesMap[key2](instance);
          }
        }
      }));
    }
  }
  function recordInstanceBoundEffect(effect2, instance = currentInstance) {
    if (instance) {
      (instance.effects || (instance.effects = [])).push(effect2);
    }
  }
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
  function getComponentName(Component) {
    return isFunction(Component) ? Component.displayName || Component.name : Component.name;
  }
  function formatComponentName(instance, Component, isRoot = false) {
    var name = getComponentName(Component);
    if (!name && Component.__file) {
      var match = Component.__file.match(/([^/\\]+)\.\w+$/);
      if (match) {
        name = match[1];
      }
    }
    if (!name && instance && instance.parent) {
      var inferFromRegistry = (registry) => {
        for (var key2 in registry) {
          if (registry[key2] === Component) {
            return key2;
          }
        }
      };
      name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? "App" : "Anonymous";
  }
  function isClassComponent(value) {
    return isFunction(value) && "__vccOpts" in value;
  }
  function computed$1(getterOrOptions) {
    var c = computed(getterOrOptions);
    recordInstanceBoundEffect(c.effect);
    return c;
  }
  function h(type, propsOrChildren, children) {
    var l = arguments.length;
    if (l === 2) {
      if (isObject$1(propsOrChildren) && !isArray(propsOrChildren)) {
        if (isVNode(propsOrChildren)) {
          return createVNode(type, null, [propsOrChildren]);
        }
        return createVNode(type, propsOrChildren);
      } else {
        return createVNode(type, null, propsOrChildren);
      }
    } else {
      if (l > 3) {
        children = Array.prototype.slice.call(arguments, 2);
      } else if (l === 3 && isVNode(children)) {
        children = [children];
      }
      return createVNode(type, propsOrChildren, children);
    }
  }
  var version = "3.1.4";
  var svgNS = "http://www.w3.org/2000/svg";
  var doc = typeof document !== "undefined" ? document : null;
  var nodeOps = {
    insert: (child, parent, anchor) => {
      parent.insertBefore(child, anchor || null);
    },
    remove: (child) => {
      var parent = child.parentNode;
      if (parent) {
        parent.removeChild(child);
      }
    },
    createElement: (tag, isSVG, is2, props2) => {
      var el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is2 ? {
        is: is2
      } : void 0);
      if (tag === "select" && props2 && props2.multiple != null) {
        el.setAttribute("multiple", props2.multiple);
      }
      return el;
    },
    createText: (text2) => doc.createTextNode(text2),
    createComment: (text2) => doc.createComment(text2),
    setText: (node, text2) => {
      node.nodeValue = text2;
    },
    setElementText: (el, text2) => {
      el.textContent = text2;
    },
    parentNode: (node) => node.parentNode,
    nextSibling: (node) => node.nextSibling,
    querySelector: (selector) => doc.querySelector(selector),
    setScopeId(el, id2) {
      el.setAttribute(id2, "");
    },
    cloneNode(el) {
      var cloned = el.cloneNode(true);
      if ("_value" in el) {
        cloned._value = el._value;
      }
      return cloned;
    },
    insertStaticContent(content, parent, anchor, isSVG, cached) {
      if (cached) {
        var _first;
        var _last;
        var i2 = 0;
        var l = cached.length;
        for (; i2 < l; i2++) {
          var node = cached[i2].cloneNode(true);
          if (i2 === 0)
            _first = node;
          if (i2 === l - 1)
            _last = node;
          parent.insertBefore(node, anchor);
        }
        return [_first, _last];
      }
      var before = anchor ? anchor.previousSibling : parent.lastChild;
      if (anchor) {
        var insertionPoint;
        var usingTempInsertionPoint = false;
        if (anchor instanceof Element) {
          insertionPoint = anchor;
        } else {
          usingTempInsertionPoint = true;
          insertionPoint = isSVG ? doc.createElementNS(svgNS, "g") : doc.createElement("div");
          parent.insertBefore(insertionPoint, anchor);
        }
        insertionPoint.insertAdjacentHTML("beforebegin", content);
        if (usingTempInsertionPoint) {
          parent.removeChild(insertionPoint);
        }
      } else {
        parent.insertAdjacentHTML("beforeend", content);
      }
      var first = before ? before.nextSibling : parent.firstChild;
      var last = anchor ? anchor.previousSibling : parent.lastChild;
      var ret = [];
      while (first) {
        ret.push(first);
        if (first === last)
          break;
        first = first.nextSibling;
      }
      return ret;
    }
  };
  function patchClass$1(el, value, isSVG) {
    if (value == null) {
      value = "";
    }
    if (isSVG) {
      el.setAttribute("class", value);
    } else {
      var transitionClasses = el._vtc;
      if (transitionClasses) {
        value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
      }
      el.className = value;
    }
  }
  function patchStyle$1(el, prev, next) {
    var style = el.style;
    if (!next) {
      el.removeAttribute("style");
    } else if (isString(next)) {
      if (prev !== next) {
        var current = style.display;
        style.cssText = normalizeRpx(next);
        if ("_vod" in el) {
          style.display = current;
        }
      }
    } else {
      for (var key2 in next) {
        setStyle$1(style, key2, next[key2]);
      }
      if (prev && !isString(prev)) {
        for (var _key10 in prev) {
          if (next[_key10] == null) {
            setStyle$1(style, _key10, "");
          }
        }
      }
    }
  }
  var importantRE$1 = /\s*!important$/;
  function setStyle$1(style, name, val) {
    if (isArray(val)) {
      val.forEach((v2) => setStyle$1(style, name, v2));
    } else {
      val = normalizeRpx(val);
      if (name.startsWith("--")) {
        style.setProperty(name, val);
      } else {
        var prefixed = autoPrefix$1(style, name);
        if (importantRE$1.test(val)) {
          style.setProperty(hyphenate(prefixed), val.replace(importantRE$1, ""), "important");
        } else {
          style[prefixed] = val;
        }
      }
    }
  }
  var prefixes$1 = ["Webkit", "Moz", "ms"];
  var prefixCache$1 = {};
  function autoPrefix$1(style, rawName) {
    var cached = prefixCache$1[rawName];
    if (cached) {
      return cached;
    }
    var name = camelize(rawName);
    if (name !== "filter" && name in style) {
      return prefixCache$1[rawName] = name;
    }
    name = capitalize(name);
    for (var i2 = 0; i2 < prefixes$1.length; i2++) {
      var prefixed = prefixes$1[i2] + name;
      if (prefixed in style) {
        return prefixCache$1[rawName] = prefixed;
      }
    }
    return rawName;
  }
  var rpxRE = /\b([+-]?\d+(\.\d+)?)[r|u]px\b/g;
  var normalizeRpx = (val) => {
    if (typeof rpx2px !== "function") {
      return val;
    }
    if (isString(val)) {
      return val.replace(rpxRE, (a2, b) => {
        return rpx2px(b) + "px";
      });
    }
    return val;
  };
  var xlinkNS = "http://www.w3.org/1999/xlink";
  function patchAttr(el, key2, value, isSVG, instance) {
    if (isSVG && key2.startsWith("xlink:")) {
      if (value == null) {
        el.removeAttributeNS(xlinkNS, key2.slice(6, key2.length));
      } else {
        el.setAttributeNS(xlinkNS, key2, value);
      }
    } else {
      var _isBoolean = isSpecialBooleanAttr(key2);
      if (value == null || _isBoolean && value === false) {
        el.removeAttribute(key2);
      } else {
        el.setAttribute(key2, _isBoolean ? "" : value);
      }
    }
  }
  function patchDOMProp(el, key2, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
    if (key2 === "innerHTML" || key2 === "textContent") {
      if (prevChildren) {
        unmountChildren(prevChildren, parentComponent, parentSuspense);
      }
      el[key2] = value == null ? "" : value;
      return;
    }
    if (key2 === "value" && el.tagName !== "PROGRESS") {
      el._value = value;
      var newValue = value == null ? "" : value;
      if (el.value !== newValue) {
        el.value = newValue;
      }
      if (value == null) {
        el.removeAttribute(key2);
      }
      return;
    }
    if (value === "" || value == null) {
      var type = typeof el[key2];
      if (value === "" && type === "boolean") {
        el[key2] = true;
        return;
      } else if (value == null && type === "string") {
        el[key2] = "";
        el.removeAttribute(key2);
        return;
      } else if (type === "number") {
        el[key2] = 0;
        el.removeAttribute(key2);
        return;
      }
    }
    try {
      el[key2] = value;
    } catch (e2) {
    }
  }
  var _getNow = Date.now;
  var skipTimestampCheck = false;
  if (typeof window !== "undefined") {
    if (_getNow() > document.createEvent("Event").timeStamp) {
      _getNow = () => performance.now();
    }
    var ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
    skipTimestampCheck = !!(ffMatch && Number(ffMatch[1]) <= 53);
  }
  var cachedNow = 0;
  var p$1 = Promise.resolve();
  var reset = () => {
    cachedNow = 0;
  };
  var getNow = () => cachedNow || (p$1.then(reset), cachedNow = _getNow());
  function addEventListener$1(el, event, handler, options) {
    el.addEventListener(event, handler, options);
  }
  function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
  }
  function patchEvent$1(el, rawName, prevValue, nextValue, instance = null) {
    var invokers = el._vei || (el._vei = {});
    var existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
      existingInvoker.value = nextValue;
    } else {
      var [name, options] = parseName(rawName);
      if (nextValue) {
        var invoker = invokers[rawName] = createInvoker$1(nextValue, instance);
        addEventListener$1(el, name, invoker, options);
      } else if (existingInvoker) {
        removeEventListener(el, name, existingInvoker, options);
        invokers[rawName] = void 0;
      }
    }
  }
  var optionsModifierRE = /(?:Once|Passive|Capture)$/;
  function parseName(name) {
    var options;
    if (optionsModifierRE.test(name)) {
      options = {};
      var m;
      while (m = name.match(optionsModifierRE)) {
        name = name.slice(0, name.length - m[0].length);
        options[m[0].toLowerCase()] = true;
      }
    }
    return [hyphenate(name.slice(2)), options];
  }
  function createInvoker$1(initialValue, instance) {
    var invoker = (e2) => {
      var timeStamp = e2.timeStamp || _getNow();
      if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
        callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, invoker.value), instance, 5, [e2]);
      }
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
  }
  function patchStopImmediatePropagation(e2, value) {
    if (isArray(value)) {
      var originalStop = e2.stopImmediatePropagation;
      e2.stopImmediatePropagation = () => {
        originalStop.call(e2);
        e2._stopped = true;
      };
      return value.map((fn) => (e3) => !e3._stopped && fn(e3));
    } else {
      return value;
    }
  }
  var nativeOnRE = /^on[a-z]/;
  var forcePatchProp = (_, key2) => key2 === "value";
  var patchProp = (el, key2, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
    switch (key2) {
      case "class":
        patchClass$1(el, nextValue, isSVG);
        break;
      case "style":
        patchStyle$1(el, prevValue, nextValue);
        break;
      default:
        if (isOn(key2)) {
          if (!isModelListener(key2)) {
            patchEvent$1(el, key2, prevValue, nextValue, parentComponent);
          }
        } else if (shouldSetAsProp(el, key2, nextValue, isSVG)) {
          patchDOMProp(el, key2, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
        } else {
          if (key2 === "true-value") {
            el._trueValue = nextValue;
          } else if (key2 === "false-value") {
            el._falseValue = nextValue;
          }
          patchAttr(el, key2, nextValue, isSVG);
        }
        break;
    }
  };
  function shouldSetAsProp(el, key2, value, isSVG) {
    if (isSVG) {
      if (key2 === "innerHTML") {
        return true;
      }
      if (key2 in el && nativeOnRE.test(key2) && isFunction(value)) {
        return true;
      }
      return false;
    }
    if (key2 === "spellcheck" || key2 === "draggable") {
      return false;
    }
    if (key2 === "form") {
      return false;
    }
    if (key2 === "list" && el.tagName === "INPUT") {
      return false;
    }
    if (key2 === "type" && el.tagName === "TEXTAREA") {
      return false;
    }
    if (nativeOnRE.test(key2) && isString(value)) {
      return false;
    }
    return key2 in el;
  }
  var systemModifiers = ["ctrl", "shift", "alt", "meta"];
  var modifierGuards = {
    stop: (e2) => e2.stopPropagation(),
    prevent: (e2) => e2.preventDefault(),
    self: (e2) => e2.target !== e2.currentTarget,
    ctrl: (e2) => !e2.ctrlKey,
    shift: (e2) => !e2.shiftKey,
    alt: (e2) => !e2.altKey,
    meta: (e2) => !e2.metaKey,
    left: (e2) => "button" in e2 && e2.button !== 0,
    middle: (e2) => "button" in e2 && e2.button !== 1,
    right: (e2) => "button" in e2 && e2.button !== 2,
    exact: (e2, modifiers) => systemModifiers.some((m) => e2["".concat(m, "Key")] && !modifiers.includes(m))
  };
  var withModifiers = (fn, modifiers) => {
    return (event, ...args) => {
      for (var i2 = 0; i2 < modifiers.length; i2++) {
        var guard = modifierGuards[modifiers[i2]];
        if (guard && guard(event, modifiers))
          return;
      }
      return fn(event, ...args);
    };
  };
  var vShow = {
    beforeMount(el, {
      value
    }, {
      transition
    }) {
      el._vod = el.style.display === "none" ? "" : el.style.display;
      if (transition && value) {
        transition.beforeEnter(el);
      } else {
        setDisplay(el, value);
      }
    },
    mounted(el, {
      value
    }, {
      transition
    }) {
      if (transition && value) {
        transition.enter(el);
      }
    },
    updated(el, {
      value,
      oldValue
    }, {
      transition
    }) {
      if (!value === !oldValue)
        return;
      if (transition) {
        if (value) {
          transition.beforeEnter(el);
          setDisplay(el, true);
          transition.enter(el);
        } else {
          transition.leave(el, () => {
            setDisplay(el, false);
          });
        }
      } else {
        setDisplay(el, value);
      }
    },
    beforeUnmount(el, {
      value
    }) {
      setDisplay(el, value);
    }
  };
  function setDisplay(el, value) {
    el.style.display = value ? el._vod : "none";
  }
  var rendererOptions = extend({
    patchProp,
    forcePatchProp
  }, nodeOps);
  var renderer;
  function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }
  var createApp = (...args) => {
    var app = ensureRenderer().createApp(...args);
    var {
      mount
    } = app;
    app.mount = (containerOrSelector) => {
      var container = normalizeContainer(containerOrSelector);
      if (!container)
        return;
      var component = app._component;
      if (!isFunction(component) && !component.render && !component.template) {
        component.template = container.innerHTML;
      }
      container.innerHTML = "";
      var proxy = mount(container, false, container instanceof SVGElement);
      if (container instanceof Element) {
        container.removeAttribute("v-cloak");
        container.setAttribute("data-v-app", "");
      }
      return proxy;
    };
    return app;
  };
  function normalizeContainer(container) {
    if (isString(container)) {
      var res = document.querySelector(container);
      return res;
    }
    return container;
  }
  var attrs = ["top", "left", "right", "bottom"];
  var inited$1;
  var elementComputedStyle = {};
  var support;
  function getSupport() {
    if (!("CSS" in window) || typeof CSS.supports != "function") {
      support = "";
    } else if (CSS.supports("top: env(safe-area-inset-top)")) {
      support = "env";
    } else if (CSS.supports("top: constant(safe-area-inset-top)")) {
      support = "constant";
    } else {
      support = "";
    }
    return support;
  }
  function init() {
    support = typeof support === "string" ? support : getSupport();
    if (!support) {
      attrs.forEach(function(attr2) {
        elementComputedStyle[attr2] = 0;
      });
      return;
    }
    function setStyle2(el, style) {
      var elStyle = el.style;
      Object.keys(style).forEach(function(key2) {
        var val = style[key2];
        elStyle[key2] = val;
      });
    }
    var cbs = [];
    function parentReady(callback) {
      if (callback) {
        cbs.push(callback);
      } else {
        cbs.forEach(function(cb) {
          cb();
        });
      }
    }
    var passiveEvents = false;
    try {
      var opts = Object.defineProperty({}, "passive", {
        get: function() {
          passiveEvents = {
            passive: true
          };
        }
      });
      window.addEventListener("test", null, opts);
    } catch (e2) {
    }
    function addChild(parent, attr2) {
      var a1 = document.createElement("div");
      var a2 = document.createElement("div");
      var a1Children = document.createElement("div");
      var a2Children = document.createElement("div");
      var W = 100;
      var MAX = 1e4;
      var aStyle = {
        position: "absolute",
        width: W + "px",
        height: "200px",
        boxSizing: "border-box",
        overflow: "hidden",
        paddingBottom: support + "(safe-area-inset-" + attr2 + ")"
      };
      setStyle2(a1, aStyle);
      setStyle2(a2, aStyle);
      setStyle2(a1Children, {
        transition: "0s",
        animation: "none",
        width: "400px",
        height: "400px"
      });
      setStyle2(a2Children, {
        transition: "0s",
        animation: "none",
        width: "250%",
        height: "250%"
      });
      a1.appendChild(a1Children);
      a2.appendChild(a2Children);
      parent.appendChild(a1);
      parent.appendChild(a2);
      parentReady(function() {
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
          attrChange(attr2);
        }
        a1.addEventListener("scroll", onScroll, passiveEvents);
        a2.addEventListener("scroll", onScroll, passiveEvents);
      });
      var computedStyle = getComputedStyle(a1);
      Object.defineProperty(elementComputedStyle, attr2, {
        configurable: true,
        get: function() {
          return parseFloat(computedStyle.paddingBottom);
        }
      });
    }
    var parentDiv = document.createElement("div");
    setStyle2(parentDiv, {
      position: "absolute",
      left: "0",
      top: "0",
      width: "0",
      height: "0",
      zIndex: "-1",
      overflow: "hidden",
      visibility: "hidden"
    });
    attrs.forEach(function(key2) {
      addChild(parentDiv, key2);
    });
    document.body.appendChild(parentDiv);
    parentReady();
    inited$1 = true;
  }
  function getAttr(attr2) {
    if (!inited$1) {
      init();
    }
    return elementComputedStyle[attr2];
  }
  var changeAttrs = [];
  function attrChange(attr2) {
    if (!changeAttrs.length) {
      setTimeout(function() {
        var style = {};
        changeAttrs.forEach(function(attr3) {
          style[attr3] = elementComputedStyle[attr3];
        });
        changeAttrs.length = 0;
        callbacks$1.forEach(function(callback) {
          callback(style);
        });
      }, 0);
    }
    changeAttrs.push(attr2);
  }
  var callbacks$1 = [];
  function onChange(callback) {
    if (!getSupport()) {
      return;
    }
    if (!inited$1) {
      init();
    }
    if (typeof callback === "function") {
      callbacks$1.push(callback);
    }
  }
  function offChange(callback) {
    var index2 = callbacks$1.indexOf(callback);
    if (index2 >= 0) {
      callbacks$1.splice(index2, 1);
    }
  }
  var safeAreaInsets = {
    get support() {
      return (typeof support === "string" ? support : getSupport()).length != 0;
    },
    get top() {
      return getAttr("top");
    },
    get left() {
      return getAttr("left");
    },
    get right() {
      return getAttr("right");
    },
    get bottom() {
      return getAttr("bottom");
    },
    onChange,
    offChange
  };
  var out = safeAreaInsets;
  var onEventPrevent = /* @__PURE__ */ withModifiers(() => {
  }, ["prevent"]);
  function getWindowOffset() {
    var style = document.documentElement.style;
    var top = parseInt(style.getPropertyValue("--window-top"));
    var bottom = parseInt(style.getPropertyValue("--window-bottom"));
    var left = parseInt(style.getPropertyValue("--window-left"));
    var right = parseInt(style.getPropertyValue("--window-right"));
    return {
      top: top ? top + out.top : 0,
      bottom: bottom ? bottom + out.bottom : 0,
      left: left ? left + out.left : 0,
      right: right ? right + out.right : 0
    };
  }
  function updateCssVar(cssVars) {
    var style = document.documentElement.style;
    Object.keys(cssVars).forEach((name) => {
      style.setProperty(name, cssVars[name]);
    });
  }
  function PolySymbol(name) {
    return Symbol("[uni-app]: " + name);
  }
  function hasRpx(str) {
    str = str + "";
    return str.indexOf("rpx") !== -1 || str.indexOf("upx") !== -1;
  }
  function rpx2px$1(str, replace = false) {
    if (replace) {
      return rpx2pxWithReplace(str);
    }
    if (typeof str === "string") {
      var res = parseInt(str) || 0;
      if (hasRpx(str)) {
        return uni.upx2px(res);
      }
      return res;
    }
    return str;
  }
  function rpx2pxWithReplace(str) {
    if (!hasRpx(str)) {
      return str;
    }
    return str.replace(/(\d+(\.\d+)?)[ru]px/g, (_a, b) => {
      return uni.upx2px(parseFloat(b)) + "px";
    });
  }
  var ICON_PATH_CANCEL = "M20.928 10.176l-4.928 4.928-4.928-4.928-0.896 0.896 4.928 4.928-4.928 4.928 0.896 0.896 4.928-4.928 4.928 4.928 0.896-0.896-4.928-4.928 4.928-4.928-0.896-0.896zM16 2.080q-3.776 0-7.040 1.888-3.136 1.856-4.992 4.992-1.888 3.264-1.888 7.040t1.888 7.040q1.856 3.136 4.992 4.992 3.264 1.888 7.040 1.888t7.040-1.888q3.136-1.856 4.992-4.992 1.888-3.264 1.888-7.040t-1.888-7.040q-1.856-3.136-4.992-4.992-3.264-1.888-7.040-1.888zM16 28.64q-3.424 0-6.4-1.728-2.848-1.664-4.512-4.512-1.728-2.976-1.728-6.4t1.728-6.4q1.664-2.848 4.512-4.512 2.976-1.728 6.4-1.728t6.4 1.728q2.848 1.664 4.512 4.512 1.728 2.976 1.728 6.4t-1.728 6.4q-1.664 2.848-4.512 4.512-2.976 1.728-6.4 1.728z";
  var ICON_PATH_CLEAR = "M16 0q-4.352 0-8.064 2.176-3.616 2.144-5.76 5.76-2.176 3.712-2.176 8.064t2.176 8.064q2.144 3.616 5.76 5.76 3.712 2.176 8.064 2.176t8.064-2.176q3.616-2.144 5.76-5.76 2.176-3.712 2.176-8.064t-2.176-8.064q-2.144-3.616-5.76-5.76-3.712-2.176-8.064-2.176zM22.688 21.408q0.32 0.32 0.304 0.752t-0.336 0.736-0.752 0.304-0.752-0.32l-5.184-5.376-5.376 5.184q-0.32 0.32-0.752 0.304t-0.736-0.336-0.304-0.752 0.32-0.752l5.376-5.184-5.184-5.376q-0.32-0.32-0.304-0.752t0.336-0.752 0.752-0.304 0.752 0.336l5.184 5.376 5.376-5.184q0.32-0.32 0.752-0.304t0.752 0.336 0.304 0.752-0.336 0.752l-5.376 5.184 5.184 5.376z";
  var ICON_PATH_DOWNLOAD = "M15.808 1.696q-3.776 0-7.072 1.984-3.2 1.888-5.088 5.152-1.952 3.392-1.952 7.36 0 3.776 1.952 7.072 1.888 3.2 5.088 5.088 3.296 1.952 7.072 1.952 3.968 0 7.36-1.952 3.264-1.888 5.152-5.088 1.984-3.296 1.984-7.072 0-4-1.984-7.36-1.888-3.264-5.152-5.152-3.36-1.984-7.36-1.984zM20.864 18.592l-3.776 4.928q-0.448 0.576-1.088 0.576t-1.088-0.576l-3.776-4.928q-0.448-0.576-0.24-0.992t0.944-0.416h2.976v-8.928q0-0.256 0.176-0.432t0.4-0.176h1.216q0.224 0 0.4 0.176t0.176 0.432v8.928h2.976q0.736 0 0.944 0.416t-0.24 0.992z";
  var ICON_PATH_INFO = "M15.808 0.128q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.176 3.776-2.176 8.16 0 4.224 2.176 7.872 2.080 3.552 5.632 5.632 3.648 2.176 7.872 2.176 4.384 0 8.16-2.176 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.416-2.176-8.16-2.112-3.616-5.728-5.728-3.744-2.176-8.16-2.176zM16.864 23.776q0 0.064-0.064 0.064h-1.568q-0.096 0-0.096-0.064l-0.256-11.328q0-0.064 0.064-0.064h2.112q0.096 0 0.064 0.064l-0.256 11.328zM16 10.88q-0.576 0-0.976-0.4t-0.4-0.96 0.4-0.96 0.976-0.4 0.976 0.4 0.4 0.96-0.4 0.96-0.976 0.4z";
  var ICON_PATH_SEARCH = "M20.928 22.688q-1.696 1.376-3.744 2.112-2.112 0.768-4.384 0.768-3.488 0-6.464-1.728-2.88-1.696-4.576-4.608-1.76-2.976-1.76-6.464t1.76-6.464q1.696-2.88 4.576-4.576 2.976-1.76 6.464-1.76t6.464 1.76q2.912 1.696 4.608 4.576 1.728 2.976 1.728 6.464 0 2.272-0.768 4.384-0.736 2.048-2.112 3.744l9.312 9.28-1.824 1.824-9.28-9.312zM12.8 23.008q2.784 0 5.184-1.376 2.304-1.376 3.68-3.68 1.376-2.4 1.376-5.184t-1.376-5.152q-1.376-2.336-3.68-3.68-2.4-1.408-5.184-1.408t-5.152 1.408q-2.336 1.344-3.68 3.68-1.408 2.368-1.408 5.152t1.408 5.184q1.344 2.304 3.68 3.68 2.368 1.376 5.152 1.376zM12.8 23.008v0z";
  var ICON_PATH_SUCCESS_NO_CIRCLE = "M1.952 18.080q-0.32-0.352-0.416-0.88t0.128-0.976l0.16-0.352q0.224-0.416 0.64-0.528t0.8 0.176l6.496 4.704q0.384 0.288 0.912 0.272t0.88-0.336l17.312-14.272q0.352-0.288 0.848-0.256t0.848 0.352l-0.416-0.416q0.32 0.352 0.32 0.816t-0.32 0.816l-18.656 18.912q-0.32 0.352-0.8 0.352t-0.8-0.32l-7.936-8.064z";
  var ICON_PATH_SUCCESS = "M15.808 0.16q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM24.832 11.328l-11.264 11.104q-0.032 0.032-0.112 0.032t-0.112-0.032l-5.216-5.376q-0.096-0.128 0-0.288l0.704-0.96q0.032-0.064 0.112-0.064t0.112 0.032l4.256 3.264q0.064 0.032 0.144 0.032t0.112-0.032l10.336-8.608q0.064-0.064 0.144-0.064t0.112 0.064l0.672 0.672q0.128 0.128 0 0.224z";
  var ICON_PATH_WAITING = "M15.84 0.096q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM23.008 21.92l-0.512 0.896q-0.096 0.128-0.224 0.064l-8-3.808q-0.096-0.064-0.16-0.128-0.128-0.096-0.128-0.288l0.512-12.096q0-0.064 0.048-0.112t0.112-0.048h1.376q0.064 0 0.112 0.048t0.048 0.112l0.448 10.848 6.304 4.256q0.064 0.064 0.080 0.128t-0.016 0.128z";
  var ICON_PATH_WARN = "M15.808 0.16q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM15.136 8.672h1.728q0.128 0 0.224 0.096t0.096 0.256l-0.384 10.24q0 0.064-0.048 0.112t-0.112 0.048h-1.248q-0.096 0-0.144-0.048t-0.048-0.112l-0.384-10.24q0-0.16 0.096-0.256t0.224-0.096zM16 23.328q-0.48 0-0.832-0.352t-0.352-0.848 0.352-0.848 0.832-0.352 0.832 0.352 0.352 0.848-0.352 0.848-0.832 0.352z";
  function createSvgIconVNode(path, color = "#000", size2 = 27) {
    return createVNode("svg", {
      width: size2,
      height: size2,
      viewBox: "0 0 32 32"
    }, [createVNode("path", {
      d: path,
      fill: color
    }, null, 8, ["d", "fill"])], 8, ["width", "height"]);
  }
  function useCurrentPageId() {
    {
      return getCurrentPageId();
    }
  }
  function getCurrentPage() {
    {
      return window.__PAGE_INFO__;
    }
  }
  function getCurrentPageId() {
    {
      if (!window.__id__) {
        window.__id__ = plus.webview.currentWebview().id;
      }
      return parseInt(window.__id__);
    }
  }
  function disableScrollListener(evt) {
    evt.preventDefault();
  }
  var testReachBottomTimer;
  var lastScrollHeight = 0;
  function createScrollListener({
    onPageScroll,
    onReachBottom,
    onReachBottomDistance
  }) {
    var ticking = false;
    var hasReachBottom = false;
    var reachBottomLocking = true;
    var isReachBottom = () => {
      var {
        scrollHeight
      } = document.documentElement;
      var windowHeight = window.innerHeight;
      var scrollY = window.scrollY;
      var isBottom = scrollY > 0 && scrollHeight > windowHeight && scrollY + windowHeight + onReachBottomDistance >= scrollHeight;
      var heightChanged = Math.abs(scrollHeight - lastScrollHeight) > onReachBottomDistance;
      if (isBottom && (!hasReachBottom || heightChanged)) {
        lastScrollHeight = scrollHeight;
        hasReachBottom = true;
        return true;
      }
      if (!isBottom && hasReachBottom) {
        hasReachBottom = false;
      }
      return false;
    };
    var trigger2 = () => {
      onPageScroll && onPageScroll(window.pageYOffset);
      function testReachBottom() {
        if (isReachBottom()) {
          onReachBottom && onReachBottom();
          reachBottomLocking = false;
          setTimeout(function() {
            reachBottomLocking = true;
          }, 350);
          return true;
        }
      }
      if (onReachBottom && reachBottomLocking) {
        if (testReachBottom())
          ;
        else {
          testReachBottomTimer = setTimeout(testReachBottom, 300);
        }
      }
      ticking = false;
    };
    return function onScroll() {
      clearTimeout(testReachBottomTimer);
      if (!ticking) {
        requestAnimationFrame(trigger2);
      }
      ticking = true;
    };
  }
  function getRealRoute(fromRoute, toRoute) {
    if (toRoute.indexOf("/") === 0) {
      return toRoute;
    }
    if (toRoute.indexOf("./") === 0) {
      return getRealRoute(fromRoute, toRoute.substr(2));
    }
    var toRouteArray = toRoute.split("/");
    var toRouteLength = toRouteArray.length;
    var i2 = 0;
    for (; i2 < toRouteLength && toRouteArray[i2] === ".."; i2++) {
    }
    toRouteArray.splice(0, i2);
    toRoute = toRouteArray.join("/");
    var fromRouteArray = fromRoute.length > 0 ? fromRoute.split("/") : [];
    fromRouteArray.splice(fromRouteArray.length - i2 - 1, i2 + 1);
    return "/" + fromRouteArray.concat(toRouteArray).join("/");
  }
  var isClickEvent = (val) => val.type === "click";
  function $nne(evt) {
    var {
      currentTarget
    } = evt;
    if (!(evt instanceof Event) || !(currentTarget instanceof HTMLElement)) {
      return evt;
    }
    if (currentTarget.tagName.indexOf("UNI-") !== 0) {
      return evt;
    }
    var res = createNativeEvent(evt);
    if (isClickEvent(evt)) {
      normalizeClickEvent(res, evt);
    } else if (evt instanceof TouchEvent) {
      var {
        top
      } = getWindowOffset();
      res.touches = normalizeTouchEvent(evt.touches, top);
      res.changedTouches = normalizeTouchEvent(evt.changedTouches, top);
    }
    return res;
  }
  function findUniTarget(target) {
    while (target && target.tagName.indexOf("UNI-") !== 0) {
      target = target.parentElement;
    }
    return target;
  }
  function createNativeEvent(evt) {
    var {
      type,
      timeStamp,
      target,
      currentTarget
    } = evt;
    var event = {
      type,
      timeStamp,
      target: normalizeTarget(findUniTarget(target)),
      detail: {},
      currentTarget: normalizeTarget(currentTarget)
    };
    if (evt._stopped) {
      event._stopped = true;
    }
    if (evt.type.startsWith("touch")) {
      event.touches = evt.touches;
      event.changedTouches = evt.changedTouches;
    }
    return event;
  }
  function normalizeClickEvent(evt, mouseEvt) {
    var {
      x,
      y
    } = mouseEvt;
    var {
      top
    } = getWindowOffset();
    evt.detail = {
      x,
      y: y - top
    };
    evt.touches = evt.changedTouches = [createTouchEvent(mouseEvt)];
  }
  function createTouchEvent(evt) {
    return {
      force: 1,
      identifier: 0,
      clientX: evt.clientX,
      clientY: evt.clientY,
      pageX: evt.pageX,
      pageY: evt.pageY
    };
  }
  function normalizeTouchEvent(touches, top) {
    var res = [];
    for (var i2 = 0; i2 < touches.length; i2++) {
      var {
        identifier,
        pageX,
        pageY,
        clientX,
        clientY,
        force
      } = touches[i2];
      res.push({
        identifier,
        pageX,
        pageY: pageY - top,
        clientX,
        clientY: clientY - top,
        force: force || 0
      });
    }
    return res;
  }
  var VD_SYNC = "vdSync";
  var APP_SERVICE_ID = "__uniapp__service";
  var ON_WEBVIEW_READY = "onWebviewReady";
  var ACTION_TYPE_DICT = 0;
  var WEBVIEW_INSERTED = "webviewInserted";
  var WEBVIEW_REMOVED = "webviewRemoved";
  var WEBVIEW_ID_PREFIX = "webviewId";
  var UniViewJSBridge$1 = /* @__PURE__ */ extend(ViewJSBridge, {
    publishHandler
  });
  function publishHandler(event, args = {}) {
    var pageId = getCurrentPageId() + "";
    {
      console.log("[".concat(Date.now(), "][View]: ") + pageId + " " + event + " " + JSON.stringify(args));
    }
    plus.webview.postMessageToUniNView({
      type: "subscribeHandler",
      args: {
        type: event,
        data: args,
        pageId
      }
    }, APP_SERVICE_ID);
  }
  function validateProtocolFail(name, msg) {
    console.warn("".concat(name, ": ").concat(msg));
  }
  function validateProtocol(name, data, protocol, onFail) {
    if (!onFail) {
      onFail = validateProtocolFail;
    }
    for (var key2 in protocol) {
      var errMsg = validateProp(key2, data[key2], protocol[key2], !hasOwn$1(data, key2));
      if (isString(errMsg)) {
        onFail(name, errMsg);
      }
    }
  }
  function validateProtocols(name, args, protocol, onFail) {
    if (!protocol) {
      return;
    }
    if (!isArray(protocol)) {
      return validateProtocol(name, args[0] || Object.create(null), protocol, onFail);
    }
    var len = protocol.length;
    var argsLen = args.length;
    for (var i2 = 0; i2 < len; i2++) {
      var opts = protocol[i2];
      var data = Object.create(null);
      if (argsLen > i2) {
        data[opts.name] = args[i2];
      }
      validateProtocol(name, data, {
        [opts.name]: opts
      }, onFail);
    }
  }
  function validateProp(name, value, prop, isAbsent) {
    if (!isPlainObject(prop)) {
      prop = {
        type: prop
      };
    }
    var {
      type,
      required,
      validator
    } = prop;
    if (required && isAbsent) {
      return 'Missing required args: "' + name + '"';
    }
    if (value == null && !required) {
      return;
    }
    if (type != null) {
      var isValid = false;
      var types = isArray(type) ? type : [type];
      var expectedTypes = [];
      for (var i2 = 0; i2 < types.length && !isValid; i2++) {
        var {
          valid,
          expectedType
        } = assertType(value, types[i2]);
        expectedTypes.push(expectedType || "");
        isValid = valid;
      }
      if (!isValid) {
        return getInvalidTypeMessage(name, value, expectedTypes);
      }
    }
    if (validator) {
      return validator(value);
    }
  }
  var isSimpleType = /* @__PURE__ */ makeMap$1("String,Number,Boolean,Function,Symbol");
  function assertType(value, type) {
    var valid;
    var expectedType = getType(type);
    if (isSimpleType(expectedType)) {
      var t2 = typeof value;
      valid = t2 === expectedType.toLowerCase();
      if (!valid && t2 === "object") {
        valid = value instanceof type;
      }
    } else if (expectedType === "Object") {
      valid = isObject$1(value);
    } else if (expectedType === "Array") {
      valid = isArray(value);
    } else {
      {
        valid = value instanceof type || toRawType(value) === getType(type);
      }
    }
    return {
      valid,
      expectedType
    };
  }
  function getInvalidTypeMessage(name, value, expectedTypes) {
    var message = 'Invalid args: type check failed for args "'.concat(name, '". Expected ').concat(expectedTypes.map(capitalize).join(", "));
    var expectedType = expectedTypes[0];
    var receivedType = toRawType(value);
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
  function getType(ctor) {
    var match = ctor && ctor.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : "";
  }
  function styleValue(value, type) {
    if (type === "String") {
      return '"'.concat(value, '"');
    } else if (type === "Number") {
      return "".concat(Number(value));
    } else {
      return "".concat(value);
    }
  }
  function isExplicable(type) {
    var explicitTypes = ["string", "number", "boolean"];
    return explicitTypes.some((elem) => type.toLowerCase() === elem);
  }
  function isBoolean(...args) {
    return args.some((elem) => elem.toLowerCase() === "boolean");
  }
  function formatApiArgs(args, options) {
    var params = args[0];
    if (!options || !isPlainObject(options.formatArgs) && isPlainObject(params)) {
      return;
    }
    var formatArgs = options.formatArgs;
    var keys = Object.keys(formatArgs);
    for (var i2 = 0; i2 < keys.length; i2++) {
      var name = keys[i2];
      var formatterOrDefaultValue = formatArgs[name];
      if (isFunction(formatterOrDefaultValue)) {
        var errMsg = formatterOrDefaultValue(args[0][name], params);
        if (isString(errMsg)) {
          return errMsg;
        }
      } else {
        if (!hasOwn$1(params, name)) {
          params[name] = formatterOrDefaultValue;
        }
      }
    }
  }
  function beforeInvokeApi(name, args, protocol, options) {
    {
      validateProtocols(name, args, protocol);
    }
    if (options && options.beforeInvoke) {
      var errMsg2 = options.beforeInvoke(args);
      if (isString(errMsg2)) {
        return errMsg2;
      }
    }
    var errMsg = formatApiArgs(args, options);
    if (errMsg) {
      return errMsg;
    }
  }
  function wrapperSyncApi(name, fn, protocol, options) {
    return (...args) => {
      var errMsg = beforeInvokeApi(name, args, protocol, options);
      if (errMsg) {
        throw new Error(errMsg);
      }
      return fn.apply(null, args);
    };
  }
  function defineSyncApi(name, fn, protocol, options) {
    return wrapperSyncApi(name, fn, protocol, options);
  }
  function getBaseSystemInfo() {
    if (typeof __SYSTEM_INFO__ !== "undefined") {
      return window.__SYSTEM_INFO__;
    }
    var {
      resolutionWidth
    } = plus.screen.getCurrentSize();
    return {
      platform: (plus.os.name || "").toLowerCase(),
      pixelRatio: plus.screen.scale,
      windowWidth: Math.round(resolutionWidth)
    };
  }
  function getRealPath(filepath) {
    if (filepath.indexOf("//") === 0) {
      return "https:" + filepath;
    }
    if (SCHEME_RE.test(filepath) || DATA_RE.test(filepath)) {
      return filepath;
    }
    if (isSystemURL(filepath)) {
      return "file://" + normalizeLocalPath(filepath);
    }
    var wwwPath = "file://" + normalizeLocalPath("_www");
    if (filepath.indexOf("/") === 0) {
      if (filepath.startsWith("/storage/") || filepath.includes("/Containers/Data/Application/")) {
        return "file://" + filepath;
      }
      return wwwPath + filepath;
    }
    if (filepath.indexOf("../") === 0 || filepath.indexOf("./") === 0) {
      if (typeof __id__ === "string") {
        return wwwPath + getRealRoute("/" + __id__, filepath);
      } else {
        var page = getCurrentPage();
        if (page) {
          return wwwPath + getRealRoute("/" + page.route, filepath);
        }
      }
    }
    return filepath;
  }
  var normalizeLocalPath = cacheStringFunction((filepath) => {
    return plus.io.convertLocalFileSystemURL(filepath).replace(/^\/?apps\//, "/android_asset/apps/").replace(/\/$/, "");
  });
  function isSystemURL(filepath) {
    if (filepath.indexOf("_www") === 0 || filepath.indexOf("_doc") === 0 || filepath.indexOf("_documents") === 0 || filepath.indexOf("_downloads") === 0) {
      return true;
    }
    return false;
  }
  function saveImage(base64, dirname, callback) {
  }
  function getSameOriginUrl(url) {
    return Promise.resolve(url);
  }
  var API_UPX2PX = "upx2px";
  var Upx2pxProtocol = [{
    name: "upx",
    type: [Number, String],
    required: true
  }];
  var EPS = 1e-4;
  var BASE_DEVICE_WIDTH = 750;
  var isIOS = false;
  var deviceWidth = 0;
  var deviceDPR = 0;
  function checkDeviceWidth() {
    var {
      platform,
      pixelRatio: pixelRatio2,
      windowWidth
    } = getBaseSystemInfo();
    deviceWidth = windowWidth;
    deviceDPR = pixelRatio2;
    isIOS = platform === "ios";
  }
  function checkValue(value, defaultValue) {
    var newValue = Number(value);
    return isNaN(newValue) ? defaultValue : newValue;
  }
  var upx2px = /* @__PURE__ */ defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
    if (deviceWidth === 0) {
      checkDeviceWidth();
    }
    number = Number(number);
    if (number === 0) {
      return 0;
    }
    var width = newDeviceWidth || deviceWidth;
    {
      var config = __uniConfig.globalStyle || {};
      var maxWidth = checkValue(config.rpxCalcMaxDeviceWidth, 960);
      var baseWidth = checkValue(config.rpxCalcBaseDeviceWidth, 375);
      width = width <= maxWidth ? width : baseWidth;
    }
    var result = number / BASE_DEVICE_WIDTH * width;
    if (result < 0) {
      result = -result;
    }
    result = Math.floor(result + EPS);
    if (result === 0) {
      if (deviceDPR === 1 || !isIOS) {
        result = 1;
      } else {
        result = 0.5;
      }
    }
    return number < 0 ? -result : result;
  }, Upx2pxProtocol);
  var _objectPie = {};
  _objectPie.f = {}.propertyIsEnumerable;
  var DESCRIPTORS = _descriptors;
  var getKeys = _objectKeys;
  var toIObject = _toIobject;
  var isEnum = _objectPie.f;
  var _objectToArray = function(isEntries) {
    return function(it) {
      var O = toIObject(it);
      var keys = getKeys(O);
      var length = keys.length;
      var i2 = 0;
      var result = [];
      var key2;
      while (length > i2) {
        key2 = keys[i2++];
        if (!DESCRIPTORS || isEnum.call(O, key2)) {
          result.push(isEntries ? [key2, O[key2]] : O[key2]);
        }
      }
      return result;
    };
  };
  var $export = _export;
  var $values = _objectToArray(false);
  $export($export.S, "Object", {
    values: function values(it) {
      return $values(it);
    }
  });
  var API_LOAD_FONT_FACE = "loadFontFace";
  var API_PAGE_SCROLL_TO = "pageScrollTo";
  var initIntersectionObserverPolyfill = function() {
    if (typeof window !== "object") {
      return;
    }
    if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
      if (!("isIntersecting" in window.IntersectionObserverEntry.prototype)) {
        Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
          get: function() {
            return this.intersectionRatio > 0;
          }
        });
      }
      return;
    }
    function getFrameElement(doc2) {
      try {
        return doc2.defaultView && doc2.defaultView.frameElement || null;
      } catch (e2) {
        return null;
      }
    }
    var document2 = function(startDoc) {
      var doc2 = startDoc;
      var frame = getFrameElement(doc2);
      while (frame) {
        doc2 = frame.ownerDocument;
        frame = getFrameElement(doc2);
      }
      return doc2;
    }(window.document);
    var registry = [];
    var crossOriginUpdater = null;
    var crossOriginRect = null;
    function IntersectionObserverEntry(entry) {
      this.time = entry.time;
      this.target = entry.target;
      this.rootBounds = ensureDOMRect(entry.rootBounds);
      this.boundingClientRect = ensureDOMRect(entry.boundingClientRect);
      this.intersectionRect = ensureDOMRect(entry.intersectionRect || getEmptyRect());
      this.isIntersecting = !!entry.intersectionRect;
      var targetRect = this.boundingClientRect;
      var targetArea = targetRect.width * targetRect.height;
      var intersectionRect = this.intersectionRect;
      var intersectionArea = intersectionRect.width * intersectionRect.height;
      if (targetArea) {
        this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
      } else {
        this.intersectionRatio = this.isIntersecting ? 1 : 0;
      }
    }
    function IntersectionObserver2(callback, opt_options) {
      var options = opt_options || {};
      if (typeof callback != "function") {
        throw new Error("callback must be a function");
      }
      if (options.root && options.root.nodeType != 1 && options.root.nodeType != 9) {
        throw new Error("root must be a Document or Element");
      }
      this._checkForIntersections = throttle2(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);
      this._callback = callback;
      this._observationTargets = [];
      this._queuedEntries = [];
      this._rootMarginValues = this._parseRootMargin(options.rootMargin);
      this.thresholds = this._initThresholds(options.threshold);
      this.root = options.root || null;
      this.rootMargin = this._rootMarginValues.map(function(margin) {
        return margin.value + margin.unit;
      }).join(" ");
      this._monitoringDocuments = [];
      this._monitoringUnsubscribes = [];
    }
    IntersectionObserver2.prototype.THROTTLE_TIMEOUT = 100;
    IntersectionObserver2.prototype.POLL_INTERVAL = null;
    IntersectionObserver2.prototype.USE_MUTATION_OBSERVER = true;
    IntersectionObserver2._setupCrossOriginUpdater = function() {
      if (!crossOriginUpdater) {
        crossOriginUpdater = function(boundingClientRect, intersectionRect) {
          if (!boundingClientRect || !intersectionRect) {
            crossOriginRect = getEmptyRect();
          } else {
            crossOriginRect = convertFromParentRect(boundingClientRect, intersectionRect);
          }
          registry.forEach(function(observer) {
            observer._checkForIntersections();
          });
        };
      }
      return crossOriginUpdater;
    };
    IntersectionObserver2._resetCrossOriginUpdater = function() {
      crossOriginUpdater = null;
      crossOriginRect = null;
    };
    IntersectionObserver2.prototype.observe = function(target) {
      var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
        return item.element == target;
      });
      if (isTargetAlreadyObserved) {
        return;
      }
      if (!(target && target.nodeType == 1)) {
        throw new Error("target must be an Element");
      }
      this._registerInstance();
      this._observationTargets.push({
        element: target,
        entry: null
      });
      this._monitorIntersections(target.ownerDocument);
      this._checkForIntersections();
    };
    IntersectionObserver2.prototype.unobserve = function(target) {
      this._observationTargets = this._observationTargets.filter(function(item) {
        return item.element != target;
      });
      this._unmonitorIntersections(target.ownerDocument);
      if (this._observationTargets.length == 0) {
        this._unregisterInstance();
      }
    };
    IntersectionObserver2.prototype.disconnect = function() {
      this._observationTargets = [];
      this._unmonitorAllIntersections();
      this._unregisterInstance();
    };
    IntersectionObserver2.prototype.takeRecords = function() {
      var records = this._queuedEntries.slice();
      this._queuedEntries = [];
      return records;
    };
    IntersectionObserver2.prototype._initThresholds = function(opt_threshold) {
      var threshold = opt_threshold || [0];
      if (!Array.isArray(threshold))
        threshold = [threshold];
      return threshold.sort().filter(function(t2, i2, a2) {
        if (typeof t2 != "number" || isNaN(t2) || t2 < 0 || t2 > 1) {
          throw new Error("threshold must be a number between 0 and 1 inclusively");
        }
        return t2 !== a2[i2 - 1];
      });
    };
    IntersectionObserver2.prototype._parseRootMargin = function(opt_rootMargin) {
      var marginString = opt_rootMargin || "0px";
      var margins = marginString.split(/\s+/).map(function(margin) {
        var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
        if (!parts) {
          throw new Error("rootMargin must be specified in pixels or percent");
        }
        return {
          value: parseFloat(parts[1]),
          unit: parts[2]
        };
      });
      margins[1] = margins[1] || margins[0];
      margins[2] = margins[2] || margins[0];
      margins[3] = margins[3] || margins[1];
      return margins;
    };
    IntersectionObserver2.prototype._monitorIntersections = function(doc2) {
      var win = doc2.defaultView;
      if (!win) {
        return;
      }
      if (this._monitoringDocuments.indexOf(doc2) != -1) {
        return;
      }
      var callback = this._checkForIntersections;
      var monitoringInterval = null;
      var domObserver = null;
      if (this.POLL_INTERVAL) {
        monitoringInterval = win.setInterval(callback, this.POLL_INTERVAL);
      } else {
        addEvent(win, "resize", callback, true);
        addEvent(doc2, "scroll", callback, true);
        if (this.USE_MUTATION_OBSERVER && "MutationObserver" in win) {
          domObserver = new win.MutationObserver(callback);
          domObserver.observe(doc2, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
          });
        }
      }
      this._monitoringDocuments.push(doc2);
      this._monitoringUnsubscribes.push(function() {
        var win2 = doc2.defaultView;
        if (win2) {
          if (monitoringInterval) {
            win2.clearInterval(monitoringInterval);
          }
          removeEvent(win2, "resize", callback, true);
        }
        removeEvent(doc2, "scroll", callback, true);
        if (domObserver) {
          domObserver.disconnect();
        }
      });
      var rootDoc = this.root && (this.root.ownerDocument || this.root) || document2;
      if (doc2 != rootDoc) {
        var frame = getFrameElement(doc2);
        if (frame) {
          this._monitorIntersections(frame.ownerDocument);
        }
      }
    };
    IntersectionObserver2.prototype._unmonitorIntersections = function(doc2) {
      var index2 = this._monitoringDocuments.indexOf(doc2);
      if (index2 == -1) {
        return;
      }
      var rootDoc = this.root && (this.root.ownerDocument || this.root) || document2;
      var hasDependentTargets = this._observationTargets.some(function(item) {
        var itemDoc = item.element.ownerDocument;
        if (itemDoc == doc2) {
          return true;
        }
        while (itemDoc && itemDoc != rootDoc) {
          var frame2 = getFrameElement(itemDoc);
          itemDoc = frame2 && frame2.ownerDocument;
          if (itemDoc == doc2) {
            return true;
          }
        }
        return false;
      });
      if (hasDependentTargets) {
        return;
      }
      var unsubscribe = this._monitoringUnsubscribes[index2];
      this._monitoringDocuments.splice(index2, 1);
      this._monitoringUnsubscribes.splice(index2, 1);
      unsubscribe();
      if (doc2 != rootDoc) {
        var frame = getFrameElement(doc2);
        if (frame) {
          this._unmonitorIntersections(frame.ownerDocument);
        }
      }
    };
    IntersectionObserver2.prototype._unmonitorAllIntersections = function() {
      var unsubscribes = this._monitoringUnsubscribes.slice(0);
      this._monitoringDocuments.length = 0;
      this._monitoringUnsubscribes.length = 0;
      for (var i2 = 0; i2 < unsubscribes.length; i2++) {
        unsubscribes[i2]();
      }
    };
    IntersectionObserver2.prototype._checkForIntersections = function() {
      if (!this.root && crossOriginUpdater && !crossOriginRect) {
        return;
      }
      var rootIsInDom = this._rootIsInDom();
      var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();
      this._observationTargets.forEach(function(item) {
        var target = item.element;
        var targetRect = getBoundingClientRect(target);
        var rootContainsTarget = this._rootContainsTarget(target);
        var oldEntry = item.entry;
        var intersectionRect = rootIsInDom && rootContainsTarget && this._computeTargetAndRootIntersection(target, targetRect, rootRect);
        var rootBounds = null;
        if (!this._rootContainsTarget(target)) {
          rootBounds = getEmptyRect();
        } else if (!crossOriginUpdater || this.root) {
          rootBounds = rootRect;
        }
        var newEntry = item.entry = new IntersectionObserverEntry({
          time: now(),
          target,
          boundingClientRect: targetRect,
          rootBounds,
          intersectionRect
        });
        if (!oldEntry) {
          this._queuedEntries.push(newEntry);
        } else if (rootIsInDom && rootContainsTarget) {
          if (this._hasCrossedThreshold(oldEntry, newEntry)) {
            this._queuedEntries.push(newEntry);
          }
        } else {
          if (oldEntry && oldEntry.isIntersecting) {
            this._queuedEntries.push(newEntry);
          }
        }
      }, this);
      if (this._queuedEntries.length) {
        this._callback(this.takeRecords(), this);
      }
    };
    IntersectionObserver2.prototype._computeTargetAndRootIntersection = function(target, targetRect, rootRect) {
      if (window.getComputedStyle(target).display == "none")
        return;
      var intersectionRect = targetRect;
      var parent = getParentNode(target);
      var atRoot = false;
      while (!atRoot && parent) {
        var parentRect = null;
        var parentComputedStyle = parent.nodeType == 1 ? window.getComputedStyle(parent) : {};
        if (parentComputedStyle.display == "none")
          return null;
        if (parent == this.root || parent.nodeType == 9) {
          atRoot = true;
          if (parent == this.root || parent == document2) {
            if (crossOriginUpdater && !this.root) {
              if (!crossOriginRect || crossOriginRect.width == 0 && crossOriginRect.height == 0) {
                parent = null;
                parentRect = null;
                intersectionRect = null;
              } else {
                parentRect = crossOriginRect;
              }
            } else {
              parentRect = rootRect;
            }
          } else {
            var frame = getParentNode(parent);
            var frameRect = frame && getBoundingClientRect(frame);
            var frameIntersect = frame && this._computeTargetAndRootIntersection(frame, frameRect, rootRect);
            if (frameRect && frameIntersect) {
              parent = frame;
              parentRect = convertFromParentRect(frameRect, frameIntersect);
            } else {
              parent = null;
              intersectionRect = null;
            }
          }
        } else {
          var doc2 = parent.ownerDocument;
          if (parent != doc2.body && parent != doc2.documentElement && parentComputedStyle.overflow != "visible") {
            parentRect = getBoundingClientRect(parent);
          }
        }
        if (parentRect) {
          intersectionRect = computeRectIntersection(parentRect, intersectionRect);
        }
        if (!intersectionRect)
          break;
        parent = parent && getParentNode(parent);
      }
      return intersectionRect;
    };
    IntersectionObserver2.prototype._getRootRect = function() {
      var rootRect;
      if (this.root && !isDoc(this.root)) {
        rootRect = getBoundingClientRect(this.root);
      } else {
        var doc2 = isDoc(this.root) ? this.root : document2;
        var html = doc2.documentElement;
        var body = doc2.body;
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
    IntersectionObserver2.prototype._expandRectByRootMargin = function(rect) {
      var margins = this._rootMarginValues.map(function(margin, i2) {
        return margin.unit == "px" ? margin.value : margin.value * (i2 % 2 ? rect.width : rect.height) / 100;
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
    IntersectionObserver2.prototype._hasCrossedThreshold = function(oldEntry, newEntry) {
      var oldRatio = oldEntry && oldEntry.isIntersecting ? oldEntry.intersectionRatio || 0 : -1;
      var newRatio = newEntry.isIntersecting ? newEntry.intersectionRatio || 0 : -1;
      if (oldRatio === newRatio)
        return;
      for (var i2 = 0; i2 < this.thresholds.length; i2++) {
        var threshold = this.thresholds[i2];
        if (threshold == oldRatio || threshold == newRatio || threshold < oldRatio !== threshold < newRatio) {
          return true;
        }
      }
    };
    IntersectionObserver2.prototype._rootIsInDom = function() {
      return !this.root || containsDeep(document2, this.root);
    };
    IntersectionObserver2.prototype._rootContainsTarget = function(target) {
      var rootDoc = this.root && (this.root.ownerDocument || this.root) || document2;
      return containsDeep(rootDoc, target) && (!this.root || rootDoc == target.ownerDocument);
    };
    IntersectionObserver2.prototype._registerInstance = function() {
      if (registry.indexOf(this) < 0) {
        registry.push(this);
      }
    };
    IntersectionObserver2.prototype._unregisterInstance = function() {
      var index2 = registry.indexOf(this);
      if (index2 != -1)
        registry.splice(index2, 1);
    };
    function now() {
      return window.performance && performance.now && performance.now();
    }
    function throttle2(fn, timeout) {
      var timer = null;
      return function() {
        if (!timer) {
          timer = setTimeout(function() {
            fn();
            timer = null;
          }, timeout);
        }
      };
    }
    function addEvent(node, event, fn, opt_useCapture) {
      if (typeof node.addEventListener == "function") {
        node.addEventListener(event, fn, opt_useCapture || false);
      } else if (typeof node.attachEvent == "function") {
        node.attachEvent("on" + event, fn);
      }
    }
    function removeEvent(node, event, fn, opt_useCapture) {
      if (typeof node.removeEventListener == "function") {
        node.removeEventListener(event, fn, opt_useCapture || false);
      } else if (typeof node.detatchEvent == "function") {
        node.detatchEvent("on" + event, fn);
      }
    }
    function computeRectIntersection(rect1, rect2) {
      var top = Math.max(rect1.top, rect2.top);
      var bottom = Math.min(rect1.bottom, rect2.bottom);
      var left = Math.max(rect1.left, rect2.left);
      var right = Math.min(rect1.right, rect2.right);
      var width = right - left;
      var height = bottom - top;
      return width >= 0 && height >= 0 && {
        top,
        bottom,
        left,
        right,
        width,
        height
      } || null;
    }
    function getBoundingClientRect(el) {
      var rect;
      try {
        rect = el.getBoundingClientRect();
      } catch (err) {
      }
      if (!rect)
        return getEmptyRect();
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
    function ensureDOMRect(rect) {
      if (!rect || "x" in rect) {
        return rect;
      }
      return {
        top: rect.top,
        y: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        x: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height
      };
    }
    function convertFromParentRect(parentBoundingRect, parentIntersectionRect) {
      var top = parentIntersectionRect.top - parentBoundingRect.top;
      var left = parentIntersectionRect.left - parentBoundingRect.left;
      return {
        top,
        left,
        height: parentIntersectionRect.height,
        width: parentIntersectionRect.width,
        bottom: top + parentIntersectionRect.height,
        right: left + parentIntersectionRect.width
      };
    }
    function containsDeep(parent, child) {
      var node = child;
      while (node) {
        if (node == parent)
          return true;
        node = getParentNode(node);
      }
      return false;
    }
    function getParentNode(node) {
      var parent = node.parentNode;
      if (node.nodeType == 9 && node != document2) {
        return getFrameElement(node);
      }
      if (parent && parent.assignedSlot) {
        parent = parent.assignedSlot.parentNode;
      }
      if (parent && parent.nodeType == 11 && parent.host) {
        return parent.host;
      }
      return parent;
    }
    function isDoc(node) {
      return node && node.nodeType === 9;
    }
    window.IntersectionObserver = IntersectionObserver2;
    window.IntersectionObserverEntry = IntersectionObserverEntry;
  };
  function normalizeRect(rect) {
    var {
      bottom,
      height,
      left,
      right,
      top,
      width
    } = rect || {};
    return {
      bottom,
      height,
      left,
      right,
      top,
      width
    };
  }
  function requestComponentObserver($el, options, callback) {
    initIntersectionObserverPolyfill();
    var root = options.relativeToSelector ? $el.querySelector(options.relativeToSelector) : null;
    var intersectionObserver = new IntersectionObserver((entries2) => {
      entries2.forEach((entrie) => {
        callback({
          intersectionRatio: entrie.intersectionRatio,
          intersectionRect: normalizeRect(entrie.intersectionRect),
          boundingClientRect: normalizeRect(entrie.boundingClientRect),
          relativeRect: normalizeRect(entrie.rootBounds),
          time: Date.now(),
          dataset: getCustomDataset(entrie.target),
          id: entrie.target.id
        });
      });
    }, {
      root,
      rootMargin: options.rootMargin,
      threshold: options.thresholds
    });
    if (options.observeAll) {
      intersectionObserver.USE_MUTATION_OBSERVER = true;
      var nodeList = $el.querySelectorAll(options.selector);
      for (var i2 = 0; i2 < nodeList.length; i2++) {
        intersectionObserver.observe(nodeList[i2]);
      }
    } else {
      intersectionObserver.USE_MUTATION_OBSERVER = false;
      var el = $el.querySelector(options.selector);
      if (!el) {
        console.warn("Node ".concat(options.selector, " is not found. Intersection observer will not trigger."));
      } else {
        intersectionObserver.observe(el);
      }
    }
    return intersectionObserver;
  }
  function navigateTo(args) {
    UniViewJSBridge.invokeServiceMethod("navigateTo", args);
  }
  function navigateBack(args) {
    UniViewJSBridge.invokeServiceMethod("navigateBack", args);
  }
  function reLaunch(args) {
    UniViewJSBridge.invokeServiceMethod("reLaunch", args);
  }
  function redirectTo(args) {
    UniViewJSBridge.invokeServiceMethod("redirectTo", args);
  }
  function switchTab(args) {
    UniViewJSBridge.invokeServiceMethod("switchTab", args);
  }
  var uni$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    upx2px,
    navigateTo,
    navigateBack,
    reLaunch,
    redirectTo,
    switchTab
  });
  function preventDoubleTap() {
    if (String(navigator.vendor).indexOf("Apple") === 0) {
      var firstEvent = null;
      var timeout;
      document.documentElement.addEventListener("click", (event) => {
        var TIME_MAX = 450;
        var PAGE_MAX = 44;
        clearTimeout(timeout);
        if (firstEvent && Math.abs(event.pageX - firstEvent.pageX) <= PAGE_MAX && Math.abs(event.pageY - firstEvent.pageY) <= PAGE_MAX && event.timeStamp - firstEvent.timeStamp <= TIME_MAX) {
          event.preventDefault();
        }
        firstEvent = event;
        timeout = setTimeout(() => {
          firstEvent = null;
        }, TIME_MAX);
      });
    }
  }
  function createGetDict(dict) {
    if (!dict.length) {
      return (v2) => v2;
    }
    var getDict = (value, includeValue = true) => {
      if (typeof value === "number") {
        return dict[value];
      }
      var res = {};
      value.forEach(([n, v2]) => {
        if (includeValue) {
          res[getDict(n)] = getDict(v2);
        } else {
          res[getDict(n)] = v2;
        }
      });
      return res;
    };
    return getDict;
  }
  function decodeNodeJson(getDict, nodeJson) {
    if (!nodeJson) {
      return;
    }
    if (nodeJson.a) {
      nodeJson.a = getDict(nodeJson.a);
    }
    if (nodeJson.e) {
      nodeJson.e = getDict(nodeJson.e, false);
    }
    if (nodeJson.s) {
      nodeJson.s = getDict(nodeJson.s);
    }
    if (nodeJson.t) {
      nodeJson.t = getDict(nodeJson.t);
    }
    return nodeJson;
  }
  class UniNode {
    constructor(id2, tag, parentNodeId, element) {
      this.isMounted = false;
      this.isUnmounted = false;
      this.id = id2;
      this.tag = tag;
      this.pid = parentNodeId;
      if (element) {
        this.$ = element;
      }
    }
    init(nodeJson) {
      if (hasOwn$1(nodeJson, "t")) {
        this.$.textContent = nodeJson.t;
      }
    }
    setText(text2) {
      this.$.textContent = text2;
    }
    insert(parentNodeId, refNodeId) {
      var node = this.$;
      var parentNode = $(parentNodeId);
      if (refNodeId === -1) {
        parentNode.appendChild(node);
      } else {
        parentNode.insertBefore(node, $(refNodeId).$);
      }
      this.isMounted = true;
    }
    remove() {
      var {
        $: $2
      } = this;
      $2.parentNode.removeChild($2);
      this.isUnmounted = true;
      removeElement(this.id);
    }
    appendChild(node) {
      return this.$.appendChild(node);
    }
    insertBefore(newChild, refChild) {
      return this.$.insertBefore(newChild, refChild);
    }
  }
  function patchClass(el, clazz) {
    el.className = clazz;
  }
  function patchStyle(el, value) {
    var style = el.style;
    if (isString(value)) {
      if (value === "") {
        el.removeAttribute("style");
      } else {
        style.cssText = rpx2px$1(value, true);
      }
    } else {
      for (var key2 in value) {
        setStyle(style, key2, value[key2]);
      }
    }
  }
  var importantRE = /\s*!important$/;
  function setStyle(style, name, val) {
    if (isArray(val)) {
      val.forEach((v2) => setStyle(style, name, v2));
    } else {
      val = rpx2px$1(val, true);
      if (name.startsWith("--")) {
        style.setProperty(name, val);
      } else {
        var prefixed = autoPrefix(style, name);
        if (importantRE.test(val)) {
          style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
        } else {
          style[prefixed] = val;
        }
      }
    }
  }
  var prefixes = ["Webkit"];
  var prefixCache = {};
  function autoPrefix(style, rawName) {
    var cached = prefixCache[rawName];
    if (cached) {
      return cached;
    }
    var name = camelize(rawName);
    if (name !== "filter" && name in style) {
      return prefixCache[rawName] = name;
    }
    name = capitalize(name);
    for (var i2 = 0; i2 < prefixes.length; i2++) {
      var prefixed = prefixes[i2] + name;
      if (prefixed in style) {
        return prefixCache[rawName] = prefixed;
      }
    }
    return rawName;
  }
  function patchEvent(el, name, flag) {
    var [type, options] = parseEventName(name);
    if (flag === -1) {
      var listener = el.__listeners[type];
      if (listener) {
        el.removeEventListener(type, listener);
      } else {
        console.error(formatLog("tag", el.tagName, el.__id, "event[" + type + "] not found"));
      }
    } else {
      if (el.__listeners[type]) {
        {
          console.error(formatLog("tag", el.tagName, el.__id, "event[" + type + "] already registered"));
        }
        return;
      }
      el.__listeners[type] = createInvoker(el.__id, flag, options);
      el.addEventListener(type, el.__listeners[type], options);
    }
  }
  function createInvoker(id2, flag, options) {
    var invoker = (evt) => {
      var event = $nne(evt);
      event.type = normalizeEventType(evt.type, options);
      UniViewJSBridge.publishHandler(VD_SYNC, [[ACTION_TYPE_EVENT, id2, event]]);
    };
    if (!flag) {
      return invoker;
    }
    return withModifiers(invoker, resolveModifier(flag));
  }
  function resolveModifier(flag) {
    var modifiers = [];
    if (flag & EventModifierFlags.prevent) {
      modifiers.push("prevent");
    }
    if (flag & EventModifierFlags.self) {
      modifiers.push("self");
    }
    if (flag & EventModifierFlags.stop) {
      modifiers.push("stop");
    }
    return modifiers;
  }
  var postActionJobs = new Set();
  function queuePostActionJob(job) {
    postActionJobs.add(job);
  }
  function flushPostActionJobs() {
    {
      console.log(formatLog("flushPostActionJobs", postActionJobs.size));
    }
    try {
      postActionJobs.forEach((fn) => fn());
    } finally {
      postActionJobs.clear();
    }
  }
  var JSON_PROTOCOL_LEN = JSON_PROTOCOL.length;
  function decodeAttr(value) {
    if (isString(value) && value.indexOf(JSON_PROTOCOL) === 0) {
      value = JSON.parse(value.substr(JSON_PROTOCOL_LEN));
    }
    return value;
  }
  function patchVShow(el, value) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    el.style.display = value ? el._vod : "none";
  }
  class UniElement extends UniNode {
    constructor(id2, element, parentNodeId, refNodeId, nodeJson, propNames = []) {
      super(id2, element.tagName, parentNodeId, element);
      this.$props = reactive({});
      this.$.__id = id2;
      this.$.__listeners = Object.create(null);
      this.$propNames = propNames;
      this._update = this.update.bind(this);
      this.init(nodeJson);
      this.insert(parentNodeId, refNodeId);
    }
    init(nodeJson) {
      if (hasOwn$1(nodeJson, "a")) {
        this.setAttrs(nodeJson.a);
      }
      if (hasOwn$1(nodeJson, "s")) {
        this.setAttr("style", nodeJson.s);
      }
      if (hasOwn$1(nodeJson, "e")) {
        this.addEvents(nodeJson.e);
      }
      super.init(nodeJson);
      watch(this.$props, () => {
        queuePostActionJob(this._update);
      }, {
        flush: "sync"
      });
      this.update(true);
    }
    setAttrs(attrs2) {
      Object.keys(attrs2).forEach((name) => {
        this.setAttr(name, attrs2[name]);
      });
    }
    addEvents(events) {
      Object.keys(events).forEach((name) => {
        this.addEvent(name, events[name]);
      });
    }
    addEvent(name, value) {
      patchEvent(this.$, name, value);
    }
    removeEvent(name) {
      patchEvent(this.$, name, -1);
    }
    setAttr(name, value) {
      if (name === ATTR_CLASS) {
        patchClass(this.$, value);
      } else if (name === ATTR_STYLE) {
        patchStyle(this.$, value);
      } else if (name === ATTR_V_SHOW) {
        patchVShow(this.$, value);
      } else if (name === ATTR_INNER_HTML) {
        this.$.innerHTML = value;
      } else if (name === ATTR_TEXT_CONTENT) {
        this.setText(value);
      } else {
        this.setAttribute(name, value);
      }
    }
    removeAttr(name) {
      if (name === ATTR_CLASS) {
        patchClass(this.$, "");
      } else if (name === ATTR_STYLE) {
        patchStyle(this.$, "");
      } else {
        this.removeAttribute(name);
      }
    }
    setAttribute(name, value) {
      value = decodeAttr(value);
      if (this.$propNames.indexOf(name) !== -1) {
        this.$props[name] = value;
      } else {
        this.$.setAttribute(name, value);
      }
    }
    removeAttribute(name) {
      if (this.$propNames.indexOf(name) !== -1) {
        delete this.$props[name];
      } else {
        this.$.removeAttribute(name);
      }
    }
    update(isMounted = false) {
    }
  }
  class UniComment extends UniNode {
    constructor(id2, parentNodeId, refNodeId) {
      super(id2, "#comment", parentNodeId, document.createComment(""));
      this.insert(parentNodeId, refNodeId);
    }
  }
  var text$1 = "uni-text[selectable] {\n  cursor: auto;\n  -webkit-user-select: text;\n          user-select: text;\n}\n";
  function throttle(fn, wait) {
    var last = 0;
    var timeout;
    var waitCallback;
    var newFn = function(...arg) {
      var now = Date.now();
      clearTimeout(timeout);
      waitCallback = () => {
        waitCallback = null;
        last = now;
        fn.apply(this, arg);
      };
      if (now - last < wait) {
        timeout = setTimeout(waitCallback, wait - (now - last));
        return;
      }
      waitCallback();
    };
    newFn.cancel = function() {
      clearTimeout(timeout);
      waitCallback = null;
    };
    newFn.flush = function() {
      clearTimeout(timeout);
      waitCallback && waitCallback();
    };
    return newFn;
  }
  function converPx(value) {
    if (/^-?\d+[ur]px$/i.test(value)) {
      return value.replace(/(^-?\d+)[ur]px$/i, (text2, num) => {
        return "".concat(uni.upx2px(parseFloat(num)), "px");
      });
    } else if (/^-?[\d\.]+$/.test(value)) {
      return "".concat(value, "px");
    }
    return value || "";
  }
  function converType(type) {
    return type.replace(/[A-Z]/g, (text2) => {
      return "-".concat(text2.toLowerCase());
    }).replace("webkit", "-webkit");
  }
  function getStyle(action) {
    var animateTypes1 = ["matrix", "matrix3d", "scale", "scale3d", "rotate3d", "skew", "translate", "translate3d"];
    var animateTypes2 = ["scaleX", "scaleY", "scaleZ", "rotate", "rotateX", "rotateY", "rotateZ", "skewX", "skewY", "translateX", "translateY", "translateZ"];
    var animateTypes3 = ["opacity", "background-color"];
    var animateTypes4 = ["width", "height", "left", "right", "top", "bottom"];
    var animates = action.animates;
    var option = action.option;
    var transition = option.transition;
    var style = {};
    var transform = [];
    animates.forEach((animate) => {
      var type = animate.type;
      var args = [...animate.args];
      if (animateTypes1.concat(animateTypes2).includes(type)) {
        if (type.startsWith("rotate") || type.startsWith("skew")) {
          args = args.map((value2) => parseFloat(value2) + "deg");
        } else if (type.startsWith("translate")) {
          args = args.map(converPx);
        }
        if (animateTypes2.indexOf(type) >= 0) {
          args.length = 1;
        }
        transform.push("".concat(type, "(").concat(args.join(","), ")"));
      } else if (animateTypes3.concat(animateTypes4).includes(args[0])) {
        type = args[0];
        var value = args[1];
        style[type] = animateTypes4.includes(type) ? converPx(value) : value;
      }
    });
    style.transform = style.webkitTransform = transform.join(" ");
    style.transition = style.webkitTransition = Object.keys(style).map((type) => "".concat(converType(type), " ").concat(transition.duration, "ms ").concat(transition.timingFunction, " ").concat(transition.delay, "ms")).join(",");
    style.transformOrigin = style.webkitTransformOrigin = option.transformOrigin;
    return style;
  }
  function startAnimation(context) {
    var animation2 = context.animation;
    if (!animation2 || !animation2.actions || !animation2.actions.length) {
      return;
    }
    var index2 = 0;
    var actions = animation2.actions;
    var length = animation2.actions.length;
    function animate() {
      var action = actions[index2];
      var transition = action.option.transition;
      var style = getStyle(action);
      Object.keys(style).forEach((key2) => {
        context.$el.style[key2] = style[key2];
      });
      index2 += 1;
      if (index2 < length) {
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
  var defineBuiltInComponent = (options) => {
    var {
      props: props2,
      mixins
    } = options;
    if (!props2 || !props2.animation) {
      (mixins || (options.mixins = [])).push(animation);
    }
    return defineSystemComponent(options);
  };
  var defineSystemComponent = (options) => {
    options.compatConfig = {
      MODE: 3
    };
    return defineComponent(options);
  };
  var hoverProps = {
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
    var hovering = ref(false);
    var hoverTouch = false;
    var hoverStartTimer;
    var hoverStayTimer;
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
    return keys.reduce((res, key2) => {
      if (props2[key2]) {
        res[key2] = true;
      }
      return res;
    }, Object.create(null));
  }
  function withWebEvent(fn) {
    return fn.__wwe = true, fn;
  }
  function useCustomEvent(ref2, emit2) {
    return (name, evt, detail) => {
      if (ref2.value) {
        emit2(name, normalizeCustomEvent(name, evt, ref2.value, detail || {}));
      }
    };
  }
  function useNativeEvent(emit2) {
    return (name, evt) => {
      emit2(name, createNativeEvent(evt));
    };
  }
  function normalizeCustomEvent(name, domEvt, el, detail) {
    var target = normalizeTarget(el);
    return {
      type: detail.type || name,
      timeStamp: domEvt.timeStamp || 0,
      target,
      currentTarget: target,
      detail
    };
  }
  var uniFormKey = PolySymbol("uniForm");
  var Form = /* @__PURE__ */ defineBuiltInComponent({
    name: "Form",
    emits: ["submit", "reset"],
    setup(_props, {
      slots,
      emit: emit2
    }) {
      var rootRef = ref(null);
      provideForm(useCustomEvent(rootRef, emit2));
      return () => createVNode("uni-form", {
        "ref": rootRef
      }, {
        default: () => [createVNode("span", null, [slots.default && slots.default()])]
      }, 512);
    }
  });
  function provideForm(trigger2) {
    var fields2 = [];
    provide(uniFormKey, {
      addField(field) {
        fields2.push(field);
      },
      removeField(field) {
        fields2.splice(fields2.indexOf(field), 1);
      },
      submit(evt) {
        trigger2("submit", evt, {
          value: fields2.reduce((res, field) => {
            if (field.submit) {
              var [name, value] = field.submit();
              name && (res[name] = value);
            }
            return res;
          }, Object.create(null))
        });
      },
      reset(evt) {
        fields2.forEach((field) => field.reset && field.reset());
        trigger2("reset", evt);
      }
    });
    return fields2;
  }
  var uniLabelKey = PolySymbol("uniLabel");
  var props$r = {
    for: {
      type: String,
      default: ""
    }
  };
  var Label = /* @__PURE__ */ defineBuiltInComponent({
    name: "Label",
    props: props$r,
    setup(props2, {
      slots
    }) {
      var pageId = useCurrentPageId();
      var handlers = useProvideLabel();
      var pointer = computed$1(() => props2.for || slots.default && slots.default.length);
      var _onClick = withWebEvent(($event) => {
        var EventTarget = $event.target;
        var stopPropagation = /^uni-(checkbox|radio|switch)-/.test(EventTarget.className);
        if (!stopPropagation) {
          stopPropagation = /^uni-(checkbox|radio|switch|button)$|^(svg|path)$/i.test(EventTarget.tagName);
        }
        if (stopPropagation) {
          return;
        }
        if (props2.for) {
          UniViewJSBridge.emit("uni-label-click-" + pageId + "-" + props2.for, $event, true);
        } else {
          handlers.length && handlers[0]($event, true);
        }
      });
      return () => createVNode("uni-label", {
        "class": {
          "uni-label-pointer": pointer
        },
        "onClick": _onClick
      }, {
        default: () => [slots.default && slots.default()]
      }, 8, ["class", "onClick"]);
    }
  });
  function useProvideLabel() {
    var handlers = [];
    provide(uniLabelKey, {
      addHandler(handler) {
        handlers.push(handler);
      },
      removeHandler(handler) {
        handlers.splice(handlers.indexOf(handler), 1);
      }
    });
    return handlers;
  }
  function useListeners$1(props2, listeners) {
    _addListeners(props2.id, listeners);
    watch(() => props2.id, (newId, oldId) => {
      _removeListeners(oldId, listeners, true);
      _addListeners(newId, listeners, true);
    });
    onUnmounted(() => {
      _removeListeners(props2.id, listeners);
    });
  }
  function _addListeners(id2, listeners, watch2) {
    var pageId = useCurrentPageId();
    if (watch2 && !id2) {
      return;
    }
    if (!isPlainObject(listeners)) {
      return;
    }
    Object.keys(listeners).forEach((name) => {
      if (watch2) {
        if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) {
          UniViewJSBridge.on("uni-".concat(name, "-").concat(pageId, "-").concat(id2), listeners[name]);
        }
      } else {
        if (name.indexOf("uni-") === 0) {
          UniViewJSBridge.on(name, listeners[name]);
        } else if (id2) {
          UniViewJSBridge.on("uni-".concat(name, "-").concat(pageId, "-").concat(id2), listeners[name]);
        }
      }
    });
  }
  function _removeListeners(id2, listeners, watch2) {
    var pageId = useCurrentPageId();
    if (watch2 && !id2) {
      return;
    }
    if (!isPlainObject(listeners)) {
      return;
    }
    Object.keys(listeners).forEach((name) => {
      if (watch2) {
        if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) {
          UniViewJSBridge.off("uni-".concat(name, "-").concat(pageId, "-").concat(id2), listeners[name]);
        }
      } else {
        if (name.indexOf("uni-") === 0) {
          UniViewJSBridge.off(name, listeners[name]);
        } else if (id2) {
          UniViewJSBridge.off("uni-".concat(name, "-").concat(pageId, "-").concat(id2), listeners[name]);
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
      var rootRef = ref(null);
      {
        initI18nButtonMsgsOnce();
      }
      var uniForm = inject(uniFormKey, false);
      var {
        hovering,
        binding
      } = useHover(props2);
      var {
        t: t2
      } = useI18n();
      var onClick = withWebEvent((e2, isLabelClick) => {
        if (props2.disabled) {
          return e2.stopImmediatePropagation();
        }
        if (isLabelClick) {
          rootRef.value.click();
        }
        var formType = props2.formType;
        if (formType) {
          if (!uniForm) {
            return;
          }
          if (formType === "submit") {
            uniForm.submit(e2);
          } else if (formType === "reset") {
            uniForm.reset(e2);
          }
          return;
        }
        if (props2.openType === "feedback") {
          openFeedback(t2("uni.button.feedback.title"), t2("uni.button.feedback.send"));
        }
      });
      var uniLabel = inject(uniLabelKey, false);
      if (uniLabel) {
        uniLabel.addHandler(onClick);
        onBeforeUnmount(() => {
          uniLabel.removeHandler(onClick);
        });
      }
      useListeners$1(props2, {
        "label-click": onClick
      });
      return () => {
        var hoverClass = props2.hoverClass;
        var booleanAttrs = useBooleanAttr(props2, "disabled");
        var loadingAttrs = useBooleanAttr(props2, "loading");
        var hasHoverClass = hoverClass && hoverClass !== "none";
        return createVNode("uni-button", mergeProps({
          "ref": rootRef,
          "onClick": onClick,
          "class": hasHoverClass && hovering.value ? hoverClass : ""
        }, hasHoverClass && binding, booleanAttrs, loadingAttrs), {
          default: () => [slots.default && slots.default()]
        }, 16, ["onClick", "class"]);
      };
    }
  });
  function openFeedback(titleText, sendText) {
    var feedback = plus.webview.create("https://service.dcloud.net.cn/uniapp/feedback.html", "feedback", {
      titleNView: {
        titleText,
        autoBackButton: true,
        backgroundColor: "#F7F7F7",
        titleColor: "#007aff",
        buttons: [{
          text: sendText,
          color: "#007aff",
          fontSize: "16px",
          fontWeight: "bold",
          onclick: function() {
            feedback.evalJS('typeof mui !== "undefined" && mui.trigger(document.getElementById("submit"),"tap")');
          }
        }]
      }
    });
    feedback.show("slide-in-right");
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
      emit: emit2
    }) {
      var rootRef = ref(null);
      var reset2 = useResizeSensorReset(rootRef);
      var update = useResizeSensorUpdate(rootRef, emit2, reset2);
      useResizeSensorLifecycle(rootRef, props2, update, reset2);
      return () => createVNode("uni-resize-sensor", {
        "ref": rootRef,
        "onAnimationstartOnce": update
      }, {
        default: () => [createVNode("div", {
          "onScroll": update
        }, [createVNode("div", null, null)], 40, ["onScroll"]), createVNode("div", {
          "onScroll": update
        }, [createVNode("div", null, null)], 40, ["onScroll"])],
        _: 1
      }, 8, ["onAnimationstartOnce"]);
    }
  });
  function useResizeSensorUpdate(rootRef, emit2, reset2) {
    var size2 = reactive({
      width: -1,
      height: -1
    });
    watch(() => extend({}, size2), (value) => emit2("resize", value));
    return () => {
      var rootEl = rootRef.value;
      size2.width = rootEl.offsetWidth;
      size2.height = rootEl.offsetHeight;
      reset2();
    };
  }
  function useResizeSensorReset(rootRef) {
    return () => {
      var {
        firstElementChild,
        lastElementChild
      } = rootRef.value;
      firstElementChild.scrollLeft = 1e5;
      firstElementChild.scrollTop = 1e5;
      lastElementChild.scrollLeft = 1e5;
      lastElementChild.scrollTop = 1e5;
    };
  }
  function useResizeSensorLifecycle(rootRef, props2, update, reset2) {
    onActivated(reset2);
    onMounted(() => {
      if (props2.initial) {
        nextTick(update);
      }
      var rootEl = rootRef.value;
      if (rootEl.offsetParent !== rootEl.parentElement) {
        rootEl.parentElement.style.position = "relative";
      }
      if (!("AnimationEvent" in window)) {
        reset2();
      }
    });
  }
  var pixelRatio = /* @__PURE__ */ function() {
    var canvas2 = document.createElement("canvas");
    canvas2.height = canvas2.width = 0;
    var context = canvas2.getContext("2d");
    var backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
  }();
  function wrapper(canvas2) {
    canvas2.width = canvas2.offsetWidth * pixelRatio;
    canvas2.height = canvas2.offsetHeight * pixelRatio;
    canvas2.getContext("2d").__hidpi__ = true;
  }
  var isHidpi = false;
  function initHidpi() {
    if (isHidpi) {
      return;
    }
    isHidpi = true;
    var forEach = function(obj, func) {
      for (var key2 in obj) {
        if (hasOwn$1(obj, key2)) {
          func(obj[key2], key2);
        }
      }
    };
    var ratioArgs = {
      fillRect: "all",
      clearRect: "all",
      strokeRect: "all",
      moveTo: "all",
      lineTo: "all",
      arc: [0, 1, 2],
      arcTo: "all",
      bezierCurveTo: "all",
      isPointinPath: "all",
      isPointinStroke: "all",
      quadraticCurveTo: "all",
      rect: "all",
      translate: "all",
      createRadialGradient: "all",
      createLinearGradient: "all",
      setTransform: [4, 5]
    };
    var proto2 = CanvasRenderingContext2D.prototype;
    proto2.drawImageByCanvas = function(_super) {
      return function(canvas2, srcx, srcy, srcw, srch, desx, desy, desw, desh, isScale) {
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
        _super.call(this, canvas2, srcx, srcy, srcw, srch, desx, desy, desw, desh);
      };
    }(proto2.drawImage);
    if (pixelRatio !== 1) {
      forEach(ratioArgs, function(value, key2) {
        proto2[key2] = function(_super) {
          return function() {
            if (!this.__hidpi__) {
              return _super.apply(this, arguments);
            }
            var args = Array.prototype.slice.call(arguments);
            if (value === "all") {
              args = args.map(function(a2) {
                return a2 * pixelRatio;
              });
            } else if (Array.isArray(value)) {
              for (var i2 = 0; i2 < value.length; i2++) {
                args[value[i2]] *= pixelRatio;
              }
            }
            return _super.apply(this, args);
          };
        }(proto2[key2]);
      });
      proto2.stroke = function(_super) {
        return function() {
          if (!this.__hidpi__) {
            return _super.apply(this, arguments);
          }
          this.lineWidth *= pixelRatio;
          _super.apply(this, arguments);
          this.lineWidth /= pixelRatio;
        };
      }(proto2.stroke);
      proto2.fillText = function(_super) {
        return function() {
          if (!this.__hidpi__) {
            return _super.apply(this, arguments);
          }
          var args = Array.prototype.slice.call(arguments);
          args[1] *= pixelRatio;
          args[2] *= pixelRatio;
          var font2 = this.font;
          this.font = font2.replace(/(\d+\.?\d*)(px|em|rem|pt)/g, function(w, m, u) {
            return m * pixelRatio + u;
          });
          _super.apply(this, args);
          this.font = font2;
        };
      }(proto2.fillText);
      proto2.strokeText = function(_super) {
        return function() {
          if (!this.__hidpi__) {
            return _super.apply(this, arguments);
          }
          var args = Array.prototype.slice.call(arguments);
          args[1] *= pixelRatio;
          args[2] *= pixelRatio;
          var font2 = this.font;
          this.font = font2.replace(/(\d+\.?\d*)(px|em|rem|pt)/g, function(w, m, u) {
            return m * pixelRatio + u;
          });
          _super.apply(this, args);
          this.font = font2;
        };
      }(proto2.strokeText);
      proto2.drawImage = function(_super) {
        return function() {
          if (!this.__hidpi__) {
            return _super.apply(this, arguments);
          }
          this.scale(pixelRatio, pixelRatio);
          _super.apply(this, arguments);
          this.scale(1 / pixelRatio, 1 / pixelRatio);
        };
      }(proto2.drawImage);
    }
  }
  var initHidpiOnce = /* @__PURE__ */ once(() => {
    return initHidpi();
  });
  function $getRealPath(src) {
    return src ? getRealPath(src) : src;
  }
  function resolveColor(color) {
    color = color.slice(0);
    color[3] = color[3] / 255;
    return "rgba(" + color.join(",") + ")";
  }
  function processTouches(target, touches) {
    var eventTarget = target;
    return Array.from(touches).map((touch) => {
      var boundingClientRect = eventTarget.getBoundingClientRect();
      return {
        identifier: touch.identifier,
        x: touch.clientX - boundingClientRect.left,
        y: touch.clientY - boundingClientRect.top
      };
    });
  }
  var tempCanvas;
  function getTempCanvas(width = 0, height = 0) {
    if (!tempCanvas) {
      tempCanvas = document.createElement("canvas");
    }
    tempCanvas.width = width;
    tempCanvas.height = height;
    return tempCanvas;
  }
  var props$q = {
    canvasId: {
      type: String,
      default: ""
    },
    disableScroll: {
      type: [Boolean, String],
      default: false
    }
  };
  var Canvas = /* @__PURE__ */ defineBuiltInComponent({
    inheritAttrs: false,
    name: "Canvas",
    compatConfig: {
      MODE: 3
    },
    props: props$q,
    computed: {
      id() {
        return this.canvasId;
      }
    },
    setup(props2, {
      emit: emit2,
      slots
    }) {
      initHidpiOnce();
      var canvas2 = ref(null);
      var sensor = ref(null);
      var actionsWaiting = ref(false);
      var trigger2 = useNativeEvent(emit2);
      var {
        $attrs,
        $excludeAttrs,
        $listeners
      } = useAttrs({
        excludeListeners: true
      });
      var {
        _listeners
      } = useListeners(props2, $listeners, trigger2);
      var {
        _handleSubscribe,
        _resize
      } = useMethods(canvas2, actionsWaiting);
      useSubscribe(_handleSubscribe, useContextInfo(props2.canvasId), true);
      onMounted(() => {
        _resize();
      });
      return () => {
        var {
          canvasId,
          disableScroll
        } = props2;
        return createVNode("uni-canvas", mergeProps({
          "canvas-id": canvasId,
          "disable-scroll": disableScroll
        }, $attrs.value, $excludeAttrs.value, _listeners.value), {
          default: () => [createVNode("canvas", {
            "ref": canvas2,
            "class": "uni-canvas-canvas",
            "width": "300",
            "height": "150"
          }, null, 512), createVNode("div", {
            "style": "position: absolute;top: 0;left: 0;width: 100%;height: 100%;overflow: hidden;"
          }, [slots.default && slots.default()]), createVNode(ResizeSensor, {
            "ref": sensor,
            "onResize": _resize
          }, null, 8, ["onResize"])],
          _: 1
        }, 16, ["canvas-id", "disable-scroll"]);
      };
    }
  });
  function useListeners(props2, Listeners, trigger2) {
    var _listeners = computed$1(() => {
      var events = ["onTouchstart", "onTouchmove", "onTouchend"];
      var _$listeners = Listeners.value;
      var $listeners = extend({}, (() => {
        var obj = {};
        for (var key2 in _$listeners) {
          if (Object.prototype.hasOwnProperty.call(_$listeners, key2)) {
            var event = _$listeners[key2];
            obj[key2] = event;
          }
        }
        return obj;
      })());
      events.forEach((event) => {
        var existing = $listeners[event];
        var eventHandler = [];
        if (existing) {
          eventHandler.push(withWebEvent(($event) => {
            trigger2(event.replace("on", "").toLocaleLowerCase(), extend({}, (() => {
              var obj = {};
              for (var key2 in $event) {
                obj[key2] = $event[key2];
              }
              return obj;
            })(), {
              touches: processTouches($event.currentTarget, $event.touches),
              changedTouches: processTouches($event.currentTarget, $event.changedTouches)
            }));
          }));
        }
        if (props2.disableScroll && event === "onTouchmove") {
          eventHandler.push(onEventPrevent);
        }
        $listeners[event] = eventHandler;
      });
      return $listeners;
    });
    return {
      _listeners
    };
  }
  function useMethods(canvasRef, actionsWaiting) {
    var _actionsDefer = [];
    var _images = {};
    function _resize() {
      var canvas2 = canvasRef.value;
      if (canvas2.width > 0 && canvas2.height > 0) {
        var context = canvas2.getContext("2d");
        var imageData = context.getImageData(0, 0, canvas2.width, canvas2.height);
        wrapper(canvas2);
        context.putImageData(imageData, 0, 0);
      } else {
        wrapper(canvas2);
      }
    }
    function actionsChanged({
      actions,
      reserve
    }, resolve) {
      if (!actions) {
        return;
      }
      if (actionsWaiting.value) {
        _actionsDefer.push([actions, reserve]);
        return;
      }
      var canvas2 = canvasRef.value;
      var c2d = canvas2.getContext("2d");
      if (!reserve) {
        c2d.fillStyle = "#000000";
        c2d.strokeStyle = "#000000";
        c2d.shadowColor = "#000000";
        c2d.shadowBlur = 0;
        c2d.shadowOffsetX = 0;
        c2d.shadowOffsetY = 0;
        c2d.setTransform(1, 0, 0, 1, 0, 0);
        c2d.clearRect(0, 0, canvas2.width, canvas2.height);
      }
      preloadImage(actions);
      var _loop = function(index3) {
        var action = actions[index3];
        var method = action.method;
        var data = action.data;
        if (/^set/.test(method) && method !== "setTransform") {
          var method1 = method[3].toLowerCase() + method.slice(4);
          var color;
          if (method1 === "fillStyle" || method1 === "strokeStyle") {
            if (data[0] === "normal") {
              color = resolveColor(data[1]);
            } else if (data[0] === "linear") {
              var LinearGradient = c2d.createLinearGradient(...data[1]);
              data[2].forEach(function(data2) {
                var offset = data2[0];
                var color2 = resolveColor(data2[1]);
                LinearGradient.addColorStop(offset, color2);
              });
              color = LinearGradient;
            } else if (data[0] === "radial") {
              var x = data[1][0];
              var y = data[1][1];
              var r = data[1][2];
              var _LinearGradient = c2d.createRadialGradient(x, y, 0, x, y, r);
              data[2].forEach(function(data2) {
                var offset = data2[0];
                var color2 = resolveColor(data2[1]);
                _LinearGradient.addColorStop(offset, color2);
              });
              color = _LinearGradient;
            } else if (data[0] === "pattern") {
              var loaded = checkImageLoaded(data[1], actions.slice(index3 + 1), resolve, function(image2) {
                if (image2) {
                  c2d[method1] = c2d.createPattern(image2, data[2]);
                }
              });
              if (!loaded) {
                return "break";
              }
              return "continue";
            }
            c2d[method1] = color;
          } else if (method1 === "globalAlpha") {
            c2d[method1] = Number(data[0]) / 255;
          } else if (method1 === "shadow") {
            _ = ["shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor"];
            data.forEach(function(color_, method_) {
              c2d[_[method_]] = _[method_] === "shadowColor" ? resolveColor(color_) : color_;
            });
          } else if (method1 === "fontSize") {
            var font2 = c2d.__font__ || c2d.font;
            c2d.__font__ = c2d.font = font2.replace(/\d+\.?\d*px/, data[0] + "px");
          } else if (method1 === "lineDash") {
            c2d.setLineDash(data[0]);
            c2d.lineDashOffset = data[1] || 0;
          } else if (method1 === "textBaseline") {
            if (data[0] === "normal") {
              data[0] = "alphabetic";
            }
            c2d[method1] = data[0];
          } else if (method1 === "font") {
            c2d.__font__ = c2d.font = data[0];
          } else {
            c2d[method1] = data[0];
          }
        } else if (method === "fillPath" || method === "strokePath") {
          method = method.replace(/Path/, "");
          c2d.beginPath();
          data.forEach(function(data_) {
            c2d[data_.method].apply(c2d, data_.data);
          });
          c2d[method]();
        } else if (method === "fillText") {
          c2d.fillText.apply(c2d, data);
        } else if (method === "drawImage") {
          A = function() {
            var dataArray = [...data];
            var url = dataArray[0];
            var otherData = dataArray.slice(1);
            _images = _images || {};
            if (checkImageLoaded(url, actions.slice(index3 + 1), resolve, function(image2) {
              if (image2) {
                c2d.drawImage.apply(c2d, [image2].concat([...otherData.slice(4, 8)], [...otherData.slice(0, 4)]));
              }
            }))
              return "break";
          }();
          if (A === "break") {
            return "break";
          }
        } else {
          if (method === "clip") {
            data.forEach(function(data_) {
              c2d[data_.method].apply(c2d, data_.data);
            });
            c2d.clip();
          } else {
            c2d[method].apply(c2d, data);
          }
        }
      };
      for (var index2 = 0; index2 < actions.length; index2++) {
        var _;
        var A;
        var _ret = _loop(index2);
        if (_ret === "break")
          break;
        if (_ret === "continue")
          continue;
      }
      if (!actionsWaiting.value) {
        resolve({
          errMsg: "drawCanvas:ok"
        });
      }
    }
    function preloadImage(actions) {
      actions.forEach(function(action) {
        var method = action.method;
        var data = action.data;
        var src = "";
        if (method === "drawImage") {
          src = data[0];
          src = $getRealPath(src);
          data[0] = src;
        } else if (method === "setFillStyle" && data[0] === "pattern") {
          src = data[1];
          src = $getRealPath(src);
          data[1] = src;
        }
        if (src && !_images[src]) {
          loadImage();
        }
        function loadImage() {
          var image2 = _images[src] = new Image();
          image2.onload = function() {
            image2.ready = true;
          };
          if (navigator.vendor === "Google Inc.") {
            if (src.indexOf("file://") === 0) {
              image2.crossOrigin = "anonymous";
            }
            image2.src = src;
            return;
          }
          getSameOriginUrl(src).then((src2) => {
            image2.src = src2;
          }).catch(() => {
            image2.src = src;
          });
        }
      });
    }
    function checkImageLoaded(src, actions, resolve, fn) {
      var image2 = _images[src];
      if (image2.ready) {
        fn(image2);
        return true;
      } else {
        _actionsDefer.unshift([actions, true]);
        actionsWaiting.value = true;
        image2.onload = function() {
          image2.ready = true;
          fn(image2);
          actionsWaiting.value = false;
          var actions2 = _actionsDefer.slice(0);
          _actionsDefer = [];
          for (var action = actions2.shift(); action; ) {
            actionsChanged({
              actions: action[0],
              reserve: action[1]
            }, resolve);
            action = actions2.shift();
          }
        };
        return false;
      }
    }
    function getImageData({
      x = 0,
      y = 0,
      width,
      height,
      destWidth,
      destHeight,
      hidpi = true,
      dataType,
      quality = 1,
      type = "png"
    }, resolve) {
      var canvas2 = canvasRef.value;
      var data;
      var maxWidth = canvas2.offsetWidth - x;
      width = width ? Math.min(width, maxWidth) : maxWidth;
      var maxHeight = canvas2.offsetHeight - y;
      height = height ? Math.min(height, maxHeight) : maxHeight;
      if (!hidpi) {
        if (!destWidth && !destHeight) {
          destWidth = Math.round(width * pixelRatio);
          destHeight = Math.round(height * pixelRatio);
        } else if (!destWidth) {
          destWidth = Math.round(width / height * destHeight);
        } else if (!destHeight) {
          destHeight = Math.round(height / width * destWidth);
        }
      } else {
        destWidth = width;
        destHeight = height;
      }
      var newCanvas = getTempCanvas(destWidth, destHeight);
      var context = newCanvas.getContext("2d");
      if (type === "jpeg" || type === "jpg") {
        type = "jpeg";
        context.fillStyle = "#fff";
        context.fillRect(0, 0, destWidth, destHeight);
      }
      context.__hidpi__ = true;
      context.drawImageByCanvas(canvas2, x, y, width, height, 0, 0, destWidth, destHeight, false);
      var result;
      try {
        var compressed;
        if (dataType === "base64") {
          data = newCanvas.toDataURL("image/".concat(type), quality);
        } else {
          var imgData = context.getImageData(0, 0, destWidth, destHeight);
          if (true) {
            var pako = require("pako");
            data = pako.deflateRaw(imgData.data, {
              to: "string"
            });
            compressed = true;
          }
        }
        result = {
          data,
          compressed,
          width: destWidth,
          height: destHeight
        };
      } catch (error) {
        result = {
          errMsg: "canvasGetImageData:fail ".concat(error)
        };
      }
      newCanvas.height = newCanvas.width = 0;
      context.__hidpi__ = false;
      if (!resolve) {
        return result;
      } else {
        resolve(result);
      }
    }
    function putImageData({
      data,
      x,
      y,
      width,
      height,
      compressed
    }, resolve) {
      try {
        if (!height) {
          height = Math.round(data.length / 4 / width);
        }
        var canvas2 = getTempCanvas(width, height);
        var context = canvas2.getContext("2d");
        if (compressed) {
          var pako = require("pako");
          data = pako.inflateRaw(data);
        }
        context.putImageData(new ImageData(new Uint8ClampedArray(data), width, height), 0, 0);
        canvasRef.value.getContext("2d").drawImage(canvas2, x, y, width, height);
        canvas2.height = canvas2.width = 0;
      } catch (error) {
        resolve({
          errMsg: "canvasPutImageData:fail"
        });
        return;
      }
      resolve({
        errMsg: "canvasPutImageData:ok"
      });
    }
    function toTempFilePath({
      x = 0,
      y = 0,
      width,
      height,
      destWidth,
      destHeight,
      fileType,
      quality,
      dirname
    }, resolve) {
      var res = getImageData({
        x,
        y,
        width,
        height,
        destWidth,
        destHeight,
        hidpi: false,
        dataType: "base64",
        type: fileType,
        quality
      });
      if (!res.data || !res.data.length) {
        resolve({
          errMsg: res.errMsg.replace("canvasPutImageData", "toTempFilePath")
        });
        return;
      }
      saveImage(res.data);
    }
    var methods2 = {
      actionsChanged,
      getImageData,
      putImageData,
      toTempFilePath
    };
    function _handleSubscribe(type, data, resolve) {
      var method = methods2[type];
      if (type.indexOf("_") !== 0 && typeof method === "function") {
        method(data, resolve);
      }
    }
    return extend(methods2, {
      _resize,
      _handleSubscribe
    });
  }
  var uniCheckGroupKey = PolySymbol("uniCheckGroup");
  var props$p = {
    name: {
      type: String,
      default: ""
    }
  };
  var CheckboxGroup = /* @__PURE__ */ defineBuiltInComponent({
    name: "CheckboxGroup",
    props: props$p,
    emits: ["change"],
    setup(props2, {
      emit: emit2,
      slots
    }) {
      var rootRef = ref(null);
      var trigger2 = useCustomEvent(rootRef, emit2);
      useProvideCheckGroup(props2, trigger2);
      return () => {
        return createVNode("uni-checkbox-group", {
          "ref": rootRef
        }, {
          default: () => [slots.default && slots.default()]
        }, 512);
      };
    }
  });
  function useProvideCheckGroup(props2, trigger2) {
    var fields2 = [];
    var getFieldsValue = () => fields2.reduce((res, field) => {
      if (field.value.checkboxChecked) {
        res.push(field.value.value);
      }
      return res;
    }, new Array());
    provide(uniCheckGroupKey, {
      addField(field) {
        fields2.push(field);
      },
      removeField(field) {
        fields2.splice(fields2.indexOf(field), 1);
      },
      checkboxChange($event) {
        trigger2("change", $event, {
          value: getFieldsValue()
        });
      }
    });
    var uniForm = inject(uniFormKey, false);
    if (uniForm) {
      uniForm.addField({
        submit: () => {
          var data = ["", null];
          if (props2.name !== "") {
            data[0] = props2.name;
            data[1] = getFieldsValue();
          }
          return data;
        }
      });
    }
    return getFieldsValue;
  }
  var props$o = {
    checked: {
      type: [Boolean, String],
      default: false
    },
    id: {
      type: String,
      default: ""
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: "#007aff"
    },
    value: {
      type: String,
      default: ""
    }
  };
  var Checkbox = /* @__PURE__ */ defineBuiltInComponent({
    name: "Checkbox",
    props: props$o,
    setup(props2, {
      slots
    }) {
      var checkboxChecked = ref(props2.checked);
      var checkboxValue = ref(props2.value);
      watch([() => props2.checked, () => props2.value], ([newChecked, newModelValue]) => {
        checkboxChecked.value = newChecked;
        checkboxValue.value = newModelValue;
      });
      var reset2 = () => {
        checkboxChecked.value = false;
      };
      var {
        uniCheckGroup,
        uniLabel
      } = useCheckboxInject(checkboxChecked, checkboxValue, reset2);
      var _onClick = ($event) => {
        if (props2.disabled) {
          return;
        }
        checkboxChecked.value = !checkboxChecked.value;
        uniCheckGroup && uniCheckGroup.checkboxChange($event);
      };
      if (!!uniLabel) {
        uniLabel.addHandler(_onClick);
        onBeforeUnmount(() => {
          uniLabel.removeHandler(_onClick);
        });
      }
      useListeners$1(props2, {
        "label-click": _onClick
      });
      return () => {
        var {
          booleanAttrs
        } = useBooleanAttr(props2, "disabled");
        return createVNode("uni-checkbox", mergeProps(booleanAttrs, {
          "onClick": _onClick
        }), {
          default: () => [createVNode("div", {
            "class": "uni-checkbox-wrapper"
          }, [createVNode("div", {
            "class": ["uni-checkbox-input", {
              "uni-checkbox-input-disabled": props2.disabled
            }]
          }, [checkboxChecked.value ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props2.color, 22) : ""], 2), slots.default && slots.default()])]
        }, 16, ["onClick"]);
      };
    }
  });
  function useCheckboxInject(checkboxChecked, checkboxValue, reset2) {
    var field = computed$1(() => ({
      checkboxChecked: Boolean(checkboxChecked.value),
      value: checkboxValue.value
    }));
    var formField = {
      reset: reset2
    };
    var uniCheckGroup = inject(uniCheckGroupKey, false);
    if (!!uniCheckGroup) {
      uniCheckGroup.addField(field);
    }
    var uniForm = inject(uniFormKey, false);
    if (!!uniForm) {
      uniForm.addField(formField);
    }
    var uniLabel = inject(uniLabelKey, false);
    onBeforeUnmount(() => {
      uniCheckGroup && uniCheckGroup.removeField(field);
      uniForm && uniForm.removeField(formField);
    });
    return {
      uniCheckGroup,
      uniForm,
      uniLabel
    };
  }
  var resetTimer;
  var isAndroid;
  var osVersion;
  var keyboardHeight;
  var keyboardChangeCallback;
  var webviewStyle;
  {
    plusReady(() => {
      isAndroid = plus.os.name === "Android";
      osVersion = plus.os.version || "";
    });
    document.addEventListener("keyboardchange", function(event) {
      keyboardHeight = event.height;
      keyboardChangeCallback && keyboardChangeCallback();
    }, false);
  }
  function iosHideKeyboard() {
  }
  function setSoftinputTemporary(props2, el, reset2) {
    plusReady(() => {
      var MODE_ADJUSTRESIZE = "adjustResize";
      var MODE_ADJUSTPAN = "adjustPan";
      var MODE_NOTHING = "nothing";
      var currentWebview = plus.webview.currentWebview();
      var style = webviewStyle || currentWebview.getStyle() || {};
      var options = {
        mode: reset2 || style.softinputMode === MODE_ADJUSTRESIZE ? MODE_ADJUSTRESIZE : props2.adjustPosition ? MODE_ADJUSTPAN : MODE_NOTHING,
        position: {
          top: 0,
          height: 0
        }
      };
      if (options.mode === MODE_ADJUSTPAN) {
        var rect = el.getBoundingClientRect();
        options.position.top = rect.top;
        options.position.height = rect.height + (Number(props2.cursorSpacing) || 0);
      }
      currentWebview.setSoftinputTemporary(options);
    });
  }
  function setSoftinputNavBar(props2, state) {
    if (props2.showConfirmBar === "auto") {
      delete state.softinputNavBar;
      return;
    }
    plusReady(() => {
      var currentWebview = plus.webview.currentWebview();
      var {
        softinputNavBar
      } = currentWebview.getStyle() || {};
      var showConfirmBar = softinputNavBar !== "none";
      if (showConfirmBar !== props2.showConfirmBar) {
        state.softinputNavBar = softinputNavBar || "auto";
        currentWebview.setStyle({
          softinputNavBar: props2.showConfirmBar ? "auto" : "none"
        });
      } else {
        delete state.softinputNavBar;
      }
    });
  }
  function resetSoftinputNavBar(state) {
    var softinputNavBar = state.softinputNavBar;
    if (softinputNavBar) {
      plusReady(() => {
        var currentWebview = plus.webview.currentWebview();
        currentWebview.setStyle({
          softinputNavBar
        });
      });
    }
  }
  var props$n = {
    cursorSpacing: {
      type: [Number, String],
      default: 0
    },
    showConfirmBar: {
      type: [Boolean, String],
      default: "auto"
    },
    adjustPosition: {
      type: [Boolean, String],
      default: true
    },
    autoBlur: {
      type: [Boolean, String],
      default: false
    }
  };
  var emit$1 = ["keyboardheightchange"];
  function useKeyboard(props2, elRef, trigger2) {
    var state = {};
    function initKeyboard(el) {
      var focus;
      var keyboardChange = () => {
        trigger2("keyboardheightchange", {}, {
          height: keyboardHeight,
          duration: 0.25
        });
        if (focus && keyboardHeight === 0) {
          setSoftinputTemporary(props2, el);
        }
        if (props2.autoBlur && focus && keyboardHeight === 0 && (isAndroid || parseInt(osVersion) >= 13)) {
          document.activeElement.blur();
        }
      };
      el.addEventListener("focus", () => {
        focus = true;
        clearTimeout(resetTimer);
        document.addEventListener("click", iosHideKeyboard, false);
        {
          keyboardChangeCallback = keyboardChange;
          if (keyboardHeight) {
            trigger2("keyboardheightchange", {}, {
              height: keyboardHeight,
              duration: 0
            });
          }
          setSoftinputNavBar(props2, state);
          setSoftinputTemporary(props2, el);
        }
      });
      {
        if (isAndroid) {
          el.addEventListener("click", () => {
            if (!props2.disabled && !props2.readOnly && focus && keyboardHeight === 0) {
              setSoftinputTemporary(props2, el);
            }
          });
        }
        if (!isAndroid) {
          if (parseInt(osVersion) < 12) {
            el.addEventListener("touchstart", () => {
              if (!props2.disabled && !props2.readOnly && !focus) {
                setSoftinputTemporary(props2, el);
              }
            });
          }
          if (parseFloat(osVersion) >= 14.6 && !webviewStyle) {
            plusReady(() => {
              var currentWebview = plus.webview.currentWebview();
              webviewStyle = currentWebview.getStyle() || {};
            });
          }
        }
      }
      var onKeyboardHide = () => {
        document.removeEventListener("click", iosHideKeyboard, false);
        {
          keyboardChangeCallback = null;
          if (keyboardHeight) {
            trigger2("keyboardheightchange", {}, {
              height: 0,
              duration: 0
            });
          }
          resetSoftinputNavBar(state);
          if (isAndroid) {
            resetTimer = setTimeout(() => {
              setSoftinputTemporary(props2, el, true);
            }, 300);
          }
        }
        if (String(navigator.vendor).indexOf("Apple") === 0) {
          document.documentElement.scrollTo(document.documentElement.scrollLeft, document.documentElement.scrollTop);
        }
      };
      el.addEventListener("blur", () => {
        el.blur();
        focus = false;
        onKeyboardHide();
      });
    }
    watch(() => elRef.value, (el) => initKeyboard(el));
  }
  var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
  var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
  var attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
  var empty = /* @__PURE__ */ makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
  var block = /* @__PURE__ */ makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");
  var inline = /* @__PURE__ */ makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");
  var closeSelf = /* @__PURE__ */ makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
  var fillAttrs = /* @__PURE__ */ makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");
  var special = /* @__PURE__ */ makeMap("script,style");
  function HTMLParser(html, handler) {
    var index2;
    var chars;
    var match;
    var stack2 = [];
    var last = html;
    stack2.last = function() {
      return this[this.length - 1];
    };
    while (html) {
      chars = true;
      if (!stack2.last() || !special[stack2.last()]) {
        if (html.indexOf("<!--") == 0) {
          index2 = html.indexOf("-->");
          if (index2 >= 0) {
            if (handler.comment) {
              handler.comment(html.substring(4, index2));
            }
            html = html.substring(index2 + 3);
            chars = false;
          }
        } else if (html.indexOf("</") == 0) {
          match = html.match(endTag);
          if (match) {
            html = html.substring(match[0].length);
            match[0].replace(endTag, parseEndTag);
            chars = false;
          }
        } else if (html.indexOf("<") == 0) {
          match = html.match(startTag);
          if (match) {
            html = html.substring(match[0].length);
            match[0].replace(startTag, parseStartTag);
            chars = false;
          }
        }
        if (chars) {
          index2 = html.indexOf("<");
          var text2 = index2 < 0 ? html : html.substring(0, index2);
          html = index2 < 0 ? "" : html.substring(index2);
          if (handler.chars) {
            handler.chars(text2);
          }
        }
      } else {
        html = html.replace(new RegExp("([\\s\\S]*?)</" + stack2.last() + "[^>]*>"), function(all, text3) {
          text3 = text3.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
          if (handler.chars) {
            handler.chars(text3);
          }
          return "";
        });
        parseEndTag("", stack2.last());
      }
      if (html == last) {
        throw "Parse Error: " + html;
      }
      last = html;
    }
    parseEndTag();
    function parseStartTag(tag, tagName, rest, unary) {
      tagName = tagName.toLowerCase();
      if (block[tagName]) {
        while (stack2.last() && inline[stack2.last()]) {
          parseEndTag("", stack2.last());
        }
      }
      if (closeSelf[tagName] && stack2.last() == tagName) {
        parseEndTag("", tagName);
      }
      unary = empty[tagName] || !!unary;
      if (!unary) {
        stack2.push(tagName);
      }
      if (handler.start) {
        var attrs2 = [];
        rest.replace(attr, function(match2, name) {
          var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";
          attrs2.push({
            name,
            value,
            escaped: value.replace(/(^|[^\\])"/g, '$1\\"')
          });
        });
        if (handler.start) {
          handler.start(tagName, attrs2, unary);
        }
      }
    }
    function parseEndTag(tag, tagName) {
      if (!tagName) {
        var pos = 0;
      } else {
        for (var pos = stack2.length - 1; pos >= 0; pos--) {
          if (stack2[pos] == tagName) {
            break;
          }
        }
      }
      if (pos >= 0) {
        for (var i2 = stack2.length - 1; i2 >= pos; i2--) {
          if (handler.end) {
            handler.end(stack2[i2]);
          }
        }
        stack2.length = pos;
      }
    }
  }
  function makeMap(str) {
    var obj = {};
    var items = str.split(",");
    for (var i2 = 0; i2 < items.length; i2++) {
      obj[items[i2]] = true;
    }
    return obj;
  }
  var scripts = {};
  function loadScript(globalName, src, callback) {
    var globalObject = typeof globalName === "string" ? window[globalName] : globalName;
    if (globalObject) {
      callback();
      return;
    }
    var callbacks2 = scripts[src];
    if (!callbacks2) {
      callbacks2 = scripts[src] = [];
      var script = document.createElement("script");
      script.src = src;
      document.body.appendChild(script);
      script.onload = function() {
        callbacks2.forEach((callback2) => callback2());
        delete scripts[src];
      };
    }
    callbacks2.push(callback);
  }
  function divider(Quill) {
    var BlockEmbed = Quill.import("blots/block/embed");
    class Divider extends BlockEmbed {
    }
    Divider.blotName = "divider";
    Divider.tagName = "HR";
    return {
      "formats/divider": Divider
    };
  }
  function ins(Quill) {
    var Inline = Quill.import("blots/inline");
    class Ins extends Inline {
    }
    Ins.blotName = "ins";
    Ins.tagName = "INS";
    return {
      "formats/ins": Ins
    };
  }
  function align(Quill) {
    var {
      Scope,
      Attributor
    } = Quill.import("parchment");
    var config = {
      scope: Scope.BLOCK,
      whitelist: ["left", "right", "center", "justify"]
    };
    var AlignStyle = new Attributor.Style("align", "text-align", config);
    return {
      "formats/align": AlignStyle
    };
  }
  function direction(Quill) {
    var {
      Scope,
      Attributor
    } = Quill.import("parchment");
    var config = {
      scope: Scope.BLOCK,
      whitelist: ["rtl"]
    };
    var DirectionStyle = new Attributor.Style("direction", "direction", config);
    return {
      "formats/direction": DirectionStyle
    };
  }
  function list(Quill) {
    var Parchment = Quill.import("parchment");
    var Container = Quill.import("blots/container");
    var ListItem = Quill.import("formats/list/item");
    class List extends Container {
      static create(value) {
        var tagName = value === "ordered" ? "OL" : "UL";
        var node = super.create(tagName);
        if (value === "checked" || value === "unchecked") {
          node.setAttribute("data-checked", value === "checked");
        }
        return node;
      }
      static formats(domNode) {
        if (domNode.tagName === "OL")
          return "ordered";
        if (domNode.tagName === "UL") {
          if (domNode.hasAttribute("data-checked")) {
            return domNode.getAttribute("data-checked") === "true" ? "checked" : "unchecked";
          } else {
            return "bullet";
          }
        }
        return void 0;
      }
      constructor(domNode) {
        super(domNode);
        var listEventHandler = (e2) => {
          if (e2.target.parentNode !== domNode)
            return;
          var format = this.statics.formats(domNode);
          var blot = Parchment.find(e2.target);
          if (format === "checked") {
            blot.format("list", "unchecked");
          } else if (format === "unchecked") {
            blot.format("list", "checked");
          }
        };
        domNode.addEventListener("click", listEventHandler);
      }
      format(name, value) {
        if (this.children.length > 0) {
          this.children.tail.format(name, value);
        }
      }
      formats() {
        return {
          [this.statics.blotName]: this.statics.formats(this.domNode)
        };
      }
      insertBefore(blot, ref2) {
        if (blot instanceof ListItem) {
          super.insertBefore(blot, ref2);
        } else {
          var index2 = ref2 == null ? this.length() : ref2.offset(this);
          var after = this.split(index2);
          after.parent.insertBefore(blot, after);
        }
      }
      optimize(context) {
        super.optimize(context);
        var next = this.next;
        if (next != null && next.prev === this && next.statics.blotName === this.statics.blotName && next.domNode.tagName === this.domNode.tagName && next.domNode.getAttribute("data-checked") === this.domNode.getAttribute("data-checked")) {
          next.moveChildren(this);
          next.remove();
        }
      }
      replace(target) {
        if (target.statics.blotName !== this.statics.blotName) {
          var item = Parchment.create(this.statics.defaultChild);
          target.moveChildren(item);
          this.appendChild(item);
        }
        super.replace(target);
      }
    }
    List.blotName = "list";
    List.scope = Parchment.Scope.BLOCK_BLOT;
    List.tagName = ["OL", "UL"];
    List.defaultChild = "list-item";
    List.allowedChildren = [ListItem];
    return {
      "formats/list": List
    };
  }
  function background(Quill) {
    var {
      Scope
    } = Quill.import("parchment");
    var BackgroundStyle = Quill.import("formats/background");
    var BackgroundColorStyle = new BackgroundStyle.constructor("backgroundColor", "background-color", {
      scope: Scope.INLINE
    });
    return {
      "formats/backgroundColor": BackgroundColorStyle
    };
  }
  function box(Quill) {
    var {
      Scope,
      Attributor
    } = Quill.import("parchment");
    var config = {
      scope: Scope.BLOCK
    };
    var margin = ["margin", "marginTop", "marginBottom", "marginLeft", "marginRight"];
    var padding = ["padding", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight"];
    var result = {};
    margin.concat(padding).forEach((name) => {
      result["formats/".concat(name)] = new Attributor.Style(name, hyphenate(name), config);
    });
    return result;
  }
  function font(Quill) {
    var {
      Scope,
      Attributor
    } = Quill.import("parchment");
    var config = {
      scope: Scope.INLINE
    };
    var font2 = ["font", "fontSize", "fontStyle", "fontVariant", "fontWeight", "fontFamily"];
    var result = {};
    font2.forEach((name) => {
      result["formats/".concat(name)] = new Attributor.Style(name, hyphenate(name), config);
    });
    return result;
  }
  function text(Quill) {
    var {
      Scope,
      Attributor
    } = Quill.import("parchment");
    var text2 = [{
      name: "lineHeight",
      scope: Scope.BLOCK
    }, {
      name: "letterSpacing",
      scope: Scope.INLINE
    }, {
      name: "textDecoration",
      scope: Scope.INLINE
    }, {
      name: "textIndent",
      scope: Scope.BLOCK
    }];
    var result = {};
    text2.forEach(({
      name,
      scope
    }) => {
      result["formats/".concat(name)] = new Attributor.Style(name, hyphenate(name), {
        scope
      });
    });
    return result;
  }
  function image$1(Quill) {
    var Image2 = Quill.import("formats/image");
    var ATTRIBUTES = ["alt", "height", "width", "data-custom", "class", "data-local"];
    Image2.sanitize = (url) => url;
    Image2.formats = function formats(domNode) {
      return ATTRIBUTES.reduce(function(formats2, attribute) {
        if (domNode.hasAttribute(attribute)) {
          formats2[attribute] = domNode.getAttribute(attribute);
        }
        return formats2;
      }, {});
    };
    var format = Image2.prototype.format;
    Image2.prototype.format = function(name, value) {
      if (ATTRIBUTES.indexOf(name) > -1) {
        if (value) {
          this.domNode.setAttribute(name, value);
        } else {
          this.domNode.removeAttribute(name);
        }
      } else {
        format.call(this, name, value);
      }
    };
  }
  function register(Quill) {
    var formats = {
      divider,
      ins,
      align,
      direction,
      list,
      background,
      box,
      font,
      text,
      image: image$1
    };
    var options = {};
    Object.values(formats).forEach((value) => extend(options, value(Quill)));
    Quill.register(options, true);
  }
  function useQuill(props2, rootRef, trigger2) {
    var quillReady;
    var skipMatcher;
    var quill;
    var textChanging = false;
    watch(() => props2.readOnly, (value) => {
      if (quillReady) {
        quill.enable(!value);
        if (!value) {
          quill.blur();
        }
      }
    });
    watch(() => props2.placeholder, (value) => {
      if (quillReady) {
        quill.root.setAttribute("data-placeholder", value);
      }
    });
    function html2delta(html) {
      var tags = ["span", "strong", "b", "ins", "em", "i", "u", "a", "del", "s", "sub", "sup", "img", "div", "p", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "ol", "ul", "li", "br"];
      var content = "";
      var disable;
      HTMLParser(html, {
        start: function(tag, attrs2, unary) {
          if (!tags.includes(tag)) {
            disable = !unary;
            return;
          }
          disable = false;
          var arrts = attrs2.map(({
            name,
            value
          }) => "".concat(name, '="').concat(value, '"')).join(" ");
          var start = "<".concat(tag, " ").concat(arrts, " ").concat(unary ? "/" : "", ">");
          content += start;
        },
        end: function(tag) {
          if (!disable) {
            content += "</".concat(tag, ">");
          }
        },
        chars: function(text2) {
          if (!disable) {
            content += text2;
          }
        }
      });
      skipMatcher = true;
      var delta = quill.clipboard.convert(content);
      skipMatcher = false;
      return delta;
    }
    function getContents() {
      var html = quill.root.innerHTML;
      var text2 = quill.getText();
      var delta = quill.getContents();
      return {
        html,
        text: text2,
        delta
      };
    }
    var oldStatus = {};
    function updateStatus(range) {
      var status = range ? quill.getFormat(range) : {};
      var keys = Object.keys(status);
      if (keys.length !== Object.keys(oldStatus).length || keys.find((key2) => status[key2] !== oldStatus[key2])) {
        oldStatus = status;
        trigger2("statuschange", {}, status);
      }
    }
    function initQuill(imageResizeModules) {
      var Quill = window.Quill;
      register(Quill);
      var options = {
        toolbar: false,
        readOnly: props2.readOnly,
        placeholder: props2.placeholder
      };
      if (imageResizeModules.length) {
        Quill.register("modules/ImageResize", window.ImageResize.default);
        options.modules = {
          ImageResize: {
            modules: imageResizeModules
          }
        };
      }
      var rootEl = rootRef.value;
      quill = new Quill(rootEl, options);
      var $el = quill.root;
      var events = ["focus", "blur", "input"];
      events.forEach((name) => {
        $el.addEventListener(name, ($event) => {
          if (name === "input") {
            $event.stopPropagation();
          } else {
            trigger2(name, $event, getContents());
          }
        });
      });
      quill.on("text-change", () => {
        if (!textChanging) {
          trigger2("input", {}, getContents());
        }
      });
      quill.on("selection-change", updateStatus);
      quill.on("scroll-optimize", () => {
        var range = quill.selection.getRange()[0];
        updateStatus(range);
      });
      quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
        if (skipMatcher) {
          return delta;
        }
        if (delta.ops) {
          delta.ops = delta.ops.filter(({
            insert
          }) => typeof insert === "string").map(({
            insert
          }) => ({
            insert
          }));
        }
        return delta;
      });
      quillReady = true;
      trigger2("ready", {}, {});
    }
    onMounted(() => {
      var imageResizeModules = [];
      if (props2.showImgSize) {
        imageResizeModules.push("DisplaySize");
      }
      if (props2.showImgToolbar) {
        imageResizeModules.push("Toolbar");
      }
      if (props2.showImgResize) {
        imageResizeModules.push("Resize");
      }
      var quillSrc = "./__uniappquill.js";
      loadScript(window.Quill, quillSrc, () => {
        if (imageResizeModules.length) {
          var imageResizeSrc = "./__uniappquillimageresize.js";
          loadScript(window.ImageResize, imageResizeSrc, () => {
            initQuill(imageResizeModules);
          });
        } else {
          initQuill(imageResizeModules);
        }
      });
    });
    var id2 = useContextInfo();
    useSubscribe((type, data, resolve) => {
      var {
        options,
        callbackId
      } = data;
      var res;
      var range;
      var errMsg;
      if (quillReady) {
        var Quill = window.Quill;
        switch (type) {
          case "format":
            {
              var {
                name = "",
                value = false
              } = options;
              range = quill.getSelection(true);
              var format = quill.getFormat(range)[name] || false;
              if (["bold", "italic", "underline", "strike", "ins"].includes(name)) {
                value = !format;
              } else if (name === "direction") {
                value = value === "rtl" && format ? false : value;
                var align2 = quill.getFormat(range).align;
                if (value === "rtl" && !align2) {
                  quill.format("align", "right", "user");
                } else if (!value && align2 === "right") {
                  quill.format("align", false, "user");
                }
              } else if (name === "indent") {
                var rtl = quill.getFormat(range).direction === "rtl";
                value = value === "+1";
                if (rtl) {
                  value = !value;
                }
                value = value ? "+1" : "-1";
              } else {
                if (name === "list") {
                  value = value === "check" ? "unchecked" : value;
                  format = format === "checked" ? "unchecked" : format;
                }
                value = format && format !== (value || false) || !format && value ? value : !format;
              }
              quill.format(name, value, "user");
            }
            break;
          case "insertDivider":
            range = quill.getSelection(true);
            quill.insertText(range.index, "\n", "user");
            quill.insertEmbed(range.index + 1, "divider", true, "user");
            quill.setSelection(range.index + 2, 0, "silent");
            break;
          case "insertImage":
            {
              range = quill.getSelection(true);
              var {
                src = "",
                alt = "",
                width = "",
                height = "",
                extClass = "",
                data: data2 = {}
              } = options;
              var path = getRealPath(src);
              quill.insertEmbed(range.index, "image", path, "user");
              var local = /^(file|blob):/.test(path) ? path : false;
              textChanging = true;
              quill.formatText(range.index, 1, "data-local", local);
              quill.formatText(range.index, 1, "alt", alt);
              quill.formatText(range.index, 1, "width", width);
              quill.formatText(range.index, 1, "height", height);
              quill.formatText(range.index, 1, "class", extClass);
              textChanging = false;
              quill.formatText(range.index, 1, "data-custom", Object.keys(data2).map((key2) => "".concat(key2, "=").concat(data2[key2])).join("&"));
              quill.setSelection(range.index + 1, 0, "silent");
            }
            break;
          case "insertText":
            {
              range = quill.getSelection(true);
              var {
                text: text2 = ""
              } = options;
              quill.insertText(range.index, text2, "user");
              quill.setSelection(range.index + text2.length, 0, "silent");
            }
            break;
          case "setContents":
            {
              var {
                delta,
                html
              } = options;
              if (typeof delta === "object") {
                quill.setContents(delta, "silent");
              } else if (typeof html === "string") {
                quill.setContents(html2delta(html), "silent");
              } else {
                errMsg = "contents is missing";
              }
            }
            break;
          case "getContents":
            res = getContents();
            break;
          case "clear":
            quill.setText("");
            break;
          case "removeFormat":
            {
              range = quill.getSelection(true);
              var parchment = Quill.import("parchment");
              if (range.length) {
                quill.removeFormat(range.index, range.length, "user");
              } else {
                Object.keys(quill.getFormat(range)).forEach((key2) => {
                  if (parchment.query(key2, parchment.Scope.INLINE)) {
                    quill.format(key2, false);
                  }
                });
              }
            }
            break;
          case "undo":
            quill.history.undo();
            break;
          case "redo":
            quill.history.redo();
            break;
          case "blur":
            quill.blur();
            break;
          case "getSelectionText":
            range = quill.selection.savedRange;
            res = {
              text: ""
            };
            if (range && range.length !== 0) {
              res.text = quill.getText(range.index, range.length);
            }
            break;
          case "scrollIntoView":
            quill.scrollIntoView();
            break;
        }
        updateStatus(range);
      } else {
        errMsg = "not ready";
      }
      if (callbackId) {
        resolve({
          callbackId,
          data: extend({}, res, {
            errMsg: "".concat(type, ":").concat(errMsg ? "fail " + errMsg : "ok")
          })
        });
      }
    }, id2, true);
  }
  var props$m = /* @__PURE__ */ extend({}, props$n, {
    id: {
      type: String,
      default: ""
    },
    readOnly: {
      type: [Boolean, String],
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    showImgSize: {
      type: [Boolean, String],
      default: false
    },
    showImgToolbar: {
      type: [Boolean, String],
      default: false
    },
    showImgResize: {
      type: [Boolean, String],
      default: false
    }
  });
  var Editor = /* @__PURE__ */ defineBuiltInComponent({
    name: "Editor",
    props: props$m,
    emit: ["ready", "focus", "blur", "input", "statuschange", ...emit$1],
    setup(props2, {
      emit: emit2
    }) {
      var rootRef = ref(null);
      var trigger2 = useCustomEvent(rootRef, emit2);
      useQuill(props2, rootRef, trigger2);
      useKeyboard(props2, rootRef, trigger2);
      return () => {
        return createVNode("uni-editor", {
          "ref": rootRef,
          "id": props2.id,
          "class": "ql-container"
        }, null, 8, ["id"]);
      };
    }
  });
  var INFO_COLOR = "#10aeff";
  var WARN_COLOR = "#f76260";
  var GREY_COLOR = "#b2b2b2";
  var CANCEL_COLOR = "#f43530";
  var ICONS = {
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
      var path = computed$1(() => ICONS[props2.type]);
      return () => {
        var {
          value
        } = path;
        return createVNode("uni-icon", null, {
          default: () => [value && value.d && createSvgIconVNode(value.d, props2.color || value.c, rpx2px$1(props2.size))]
        });
      };
    }
  });
  var props$l = {
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
  var FIX_MODES = {
    widthFix: ["offsetWidth", "height"],
    heightFix: ["offsetHeight", "width"]
  };
  var IMAGE_MODES = {
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
    props: props$l,
    setup(props2, {
      emit: emit2
    }) {
      var rootRef = ref(null);
      var state = useImageState(rootRef, props2);
      var trigger2 = useCustomEvent(rootRef, emit2);
      var {
        fixSize
      } = useImageSize(rootRef, props2, state);
      useImageLoader(state, {
        trigger: trigger2,
        fixSize
      });
      return () => {
        var {
          mode: mode2
        } = props2;
        var {
          imgSrc,
          modeStyle
        } = state;
        return createVNode("uni-image", {
          "ref": rootRef
        }, {
          default: () => [createVNode("div", {
            "style": modeStyle
          }, null, 4), imgSrc ? createVNode("img", {
            "src": imgSrc,
            "draggable": props2.draggable
          }, null, 8, ["src", "draggable"]) : createVNode("img", null, null), FIX_MODES[mode2] ? createVNode(ResizeSensor, {
            "onResize": fixSize
          }, null, 8, ["onResize"]) : createVNode("span", null, null)],
          _: 1
        }, 512);
      };
    }
  });
  function useImageState(rootRef, props2) {
    var imgSrc = ref("");
    var modeStyleRef = computed$1(() => {
      var size2 = "auto";
      var position = "";
      var opts = IMAGE_MODES[props2.mode];
      if (!opts) {
        position = "0% 0%";
        size2 = "100% 100%";
      } else {
        opts[0] && (position = opts[0]);
        opts[1] && (size2 = opts[1]);
      }
      var srcVal = imgSrc.value;
      return "background-image:".concat(srcVal ? 'url("' + srcVal + '")' : "none", ";background-position:").concat(position, ";background-size:").concat(size2, ";background-repeat:no-repeat;");
    });
    var state = reactive({
      rootEl: rootRef,
      src: computed$1(() => props2.src ? getRealPath(props2.src) : ""),
      origWidth: 0,
      origHeight: 0,
      origStyle: {
        width: "",
        height: ""
      },
      modeStyle: modeStyleRef,
      imgSrc
    });
    onMounted(() => {
      var rootEl = rootRef.value;
      var style = rootEl.style;
      state.origWidth = Number(style.width) || 0;
      state.origHeight = Number(style.height) || 0;
    });
    return state;
  }
  function useImageLoader(state, {
    trigger: trigger2,
    fixSize
  }) {
    var img;
    var setState = (width = 0, height = 0, imgSrc = "") => {
      state.origWidth = width;
      state.origHeight = height;
      state.imgSrc = imgSrc;
    };
    var loadImage = (src) => {
      if (!src) {
        resetImage();
        setState();
        return;
      }
      if (!img) {
        img = new Image();
      }
      img.onload = (evt) => {
        var {
          width,
          height
        } = img;
        setState(width, height, src);
        fixSize();
        resetImage();
        trigger2("load", evt, {
          width,
          height
        });
      };
      img.onerror = (evt) => {
        setState();
        resetImage();
        trigger2("error", evt, {
          errMsg: "GET ".concat(state.src, " 404 (Not Found)")
        });
      };
      img.src = src;
    };
    var resetImage = () => {
      if (img) {
        img.onload = null;
        img.onerror = null;
        img = null;
      }
    };
    watch(() => state.src, (value) => loadImage(value));
    onMounted(() => loadImage(state.src));
    onBeforeUnmount(() => resetImage());
  }
  var isChrome = navigator.vendor === "Google Inc.";
  function fixNumber(num) {
    if (isChrome && num > 10) {
      num = Math.round(num / 2) * 2;
    }
    return num;
  }
  function useImageSize(rootRef, props2, state) {
    var fixSize = () => {
      var {
        mode: mode2
      } = props2;
      var names = FIX_MODES[mode2];
      if (!names) {
        return;
      }
      var {
        origWidth,
        origHeight
      } = state;
      var ratio = origWidth && origHeight ? origWidth / origHeight : 0;
      if (!ratio) {
        return;
      }
      var rootEl = rootRef.value;
      var value = rootEl[names[0]];
      if (value) {
        rootEl.style[names[1]] = fixNumber(value / ratio) + "px";
      }
      {
        window.dispatchEvent(new CustomEvent("updateview"));
      }
    };
    var resetSize = () => {
      var {
        style
      } = rootRef.value;
      var {
        origStyle: {
          width,
          height
        }
      } = state;
      style.width = width;
      style.height = height;
    };
    watch(() => props2.mode, (value, oldValue) => {
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
  var passiveOptions$1 = passive(true);
  var states = [];
  var userInteract = 0;
  var inited;
  function addInteractListener(vm) {
    if (!inited) {
      var eventNames = ["touchstart", "touchmove", "touchend", "mousedown", "mouseup"];
      eventNames.forEach((eventName) => {
        document.addEventListener(eventName, function() {
          states.forEach((vm2) => {
            vm2.userAction = true;
            userInteract++;
            setTimeout(() => {
              userInteract--;
              if (!userInteract) {
                vm2.userAction = false;
              }
            }, 0);
          });
        }, passiveOptions$1);
      });
      inited = true;
    }
    states.push(vm);
  }
  function removeInteractListener(vm) {
    var index2 = states.indexOf(vm);
    if (index2 >= 0) {
      states.splice(index2, 1);
    }
  }
  function useUserAction() {
    var state = reactive({
      userAction: false
    });
    onMounted(() => {
      addInteractListener(state);
    });
    onBeforeUnmount(() => {
      removeInteractListener(state);
    });
    return {
      state
    };
  }
  function useScopedAttrs() {
    var state = reactive({
      attrs: {}
    });
    onMounted(() => {
      var instance = getCurrentInstance();
      while (instance) {
        var scopeId = instance.type.__scopeId;
        if (scopeId) {
          state.attrs[scopeId] = "";
        }
        instance = instance.proxy && instance.proxy.$mpType === "page" ? null : instance.parent;
      }
    });
    return {
      state
    };
  }
  function useFormField(nameKey, value) {
    var uniForm = inject(uniFormKey, false);
    if (!uniForm) {
      return;
    }
    var instance = getCurrentInstance();
    var ctx2 = {
      submit() {
        var proxy = instance.proxy;
        return [proxy[nameKey], typeof value === "string" ? proxy[value] : value.value];
      },
      reset() {
        if (typeof value === "string") {
          instance.proxy[value] = "";
        } else {
          value.value = "";
        }
      }
    };
    uniForm.addField(ctx2);
    onBeforeUnmount(() => {
      uniForm.removeField(ctx2);
    });
  }
  function getSelectedTextRange(_, resolve) {
    var activeElement = document.activeElement;
    if (!activeElement) {
      return resolve({});
    }
    var data = {};
    if (["input", "textarea"].includes(activeElement.tagName.toLowerCase())) {
      data.start = activeElement.selectionStart;
      data.end = activeElement.selectionEnd;
    }
    resolve(data);
  }
  var UniViewJSBridgeSubscribe = function() {
    registerViewMethod(getCurrentPageId(), "getSelectedTextRange", getSelectedTextRange);
  };
  var FOCUS_DELAY = 200;
  var startTime;
  function getValueString(value) {
    return value === null ? "" : String(value);
  }
  var props$k = /* @__PURE__ */ extend({}, {
    name: {
      type: String,
      default: ""
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    value: {
      type: [String, Number],
      default: ""
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    autoFocus: {
      type: [Boolean, String],
      default: false
    },
    focus: {
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
    },
    type: {
      type: String,
      default: "text"
    },
    password: {
      type: [Boolean, String],
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    placeholderStyle: {
      type: String,
      default: ""
    },
    placeholderClass: {
      type: String,
      default: ""
    },
    maxlength: {
      type: [Number, String],
      default: 140
    },
    confirmType: {
      type: String,
      default: "done"
    }
  }, props$n);
  var emit = ["input", "focus", "blur", "update:value", "update:modelValue", "update:focus", ...emit$1];
  function useBase(props2, rootRef, emit2) {
    var fieldRef = ref(null);
    var trigger2 = useCustomEvent(rootRef, emit2);
    var selectionStart = computed$1(() => {
      var selectionStart2 = Number(props2.selectionStart);
      return isNaN(selectionStart2) ? -1 : selectionStart2;
    });
    var selectionEnd = computed$1(() => {
      var selectionEnd2 = Number(props2.selectionEnd);
      return isNaN(selectionEnd2) ? -1 : selectionEnd2;
    });
    var cursor = computed$1(() => {
      var cursor2 = Number(props2.cursor);
      return isNaN(cursor2) ? -1 : cursor2;
    });
    var maxlength = computed$1(() => {
      var maxlength2 = Number(props2.maxlength);
      return isNaN(maxlength2) ? 140 : maxlength2;
    });
    var value = getValueString(props2.modelValue) || getValueString(props2.value);
    var state = reactive({
      value,
      valueOrigin: value,
      maxlength,
      focus: props2.focus,
      composing: false,
      selectionStart,
      selectionEnd,
      cursor
    });
    watch(() => state.focus, (val) => emit2("update:focus", val));
    watch(() => state.maxlength, (val) => state.value = state.value.slice(0, val));
    return {
      fieldRef,
      state,
      trigger: trigger2
    };
  }
  function useValueSync(props2, state, emit2, trigger2) {
    var valueChangeFn = debounce((val) => {
      state.value = getValueString(val);
    }, 100);
    watch(() => props2.modelValue, valueChangeFn);
    watch(() => props2.value, valueChangeFn);
    var triggerInputFn = throttle((event, detail) => {
      valueChangeFn.cancel();
      emit2("update:modelValue", detail.value);
      emit2("update:value", detail.value);
      trigger2("input", event, detail);
    }, 100);
    var triggerInput = (event, detail, force) => {
      valueChangeFn.cancel();
      triggerInputFn(event, detail);
      if (force) {
        triggerInputFn.flush();
      }
    };
    onBeforeMount(() => {
      valueChangeFn.cancel();
      triggerInputFn.cancel();
    });
    return {
      trigger: trigger2,
      triggerInput
    };
  }
  function useAutoFocus(props2, fieldRef) {
    var {
      state: userActionState
    } = useUserAction();
    var needFocus = computed$1(() => props2.autoFocus || props2.focus);
    function focus() {
      if (!needFocus.value) {
        return;
      }
      var field = fieldRef.value;
      if (!field || !("plus" in window)) {
        setTimeout(focus, 100);
        return;
      }
      {
        var timeout = FOCUS_DELAY - (Date.now() - startTime);
        if (timeout > 0) {
          setTimeout(focus, timeout);
          return;
        }
        field.focus();
        if (!userActionState.userAction) {
          plus.key.showSoftKeybord();
        }
      }
    }
    function blur() {
      var field = fieldRef.value;
      if (field) {
        field.blur();
      }
    }
    watch(() => props2.focus, (value) => {
      if (value) {
        focus();
      } else {
        blur();
      }
    });
    onMounted(() => {
      startTime = startTime || Date.now();
      if (needFocus.value) {
        nextTick(focus);
      }
    });
  }
  function useEvent(fieldRef, state, trigger2, triggerInput, beforeInput) {
    function checkSelection() {
      var field = fieldRef.value;
      if (field && state.focus && state.selectionStart > -1 && state.selectionEnd > -1) {
        field.selectionStart = state.selectionStart;
        field.selectionEnd = state.selectionEnd;
      }
    }
    function checkCursor() {
      var field = fieldRef.value;
      if (field && state.focus && state.selectionStart < 0 && state.selectionEnd < 0 && state.cursor > -1) {
        field.selectionEnd = field.selectionStart = state.cursor;
      }
    }
    function initField() {
      var field = fieldRef.value;
      var onFocus = function(event) {
        state.focus = true;
        trigger2("focus", event, {
          value: state.value
        });
        checkSelection();
        checkCursor();
      };
      var onInput = function(event, force) {
        event.stopPropagation();
        if (typeof beforeInput === "function" && beforeInput(event, state) === false) {
          return;
        }
        state.value = field.value;
        if (!state.composing) {
          triggerInput(event, {
            value: field.value,
            cursor: field.selectionEnd
          }, force);
        }
      };
      var onBlur = function(event) {
        if (state.composing) {
          state.composing = false;
          onInput(event, true);
        }
        state.focus = false;
        trigger2("blur", event, {
          value: state.value,
          cursor: event.target.selectionEnd
        });
      };
      field.addEventListener("change", (event) => event.stopPropagation());
      field.addEventListener("focus", onFocus);
      field.addEventListener("blur", onBlur);
      field.addEventListener("input", onInput);
      field.addEventListener("compositionstart", (event) => {
        event.stopPropagation();
        state.composing = true;
      });
      field.addEventListener("compositionend", (event) => {
        event.stopPropagation();
        if (state.composing) {
          state.composing = false;
          onInput(event);
        }
      });
    }
    watch([() => state.selectionStart, () => state.selectionEnd], checkSelection);
    watch(() => state.cursor, checkCursor);
    watch(() => fieldRef.value, initField);
  }
  function useField(props2, rootRef, emit2, beforeInput) {
    UniViewJSBridgeSubscribe();
    var {
      fieldRef,
      state,
      trigger: trigger2
    } = useBase(props2, rootRef, emit2);
    var {
      triggerInput
    } = useValueSync(props2, state, emit2, trigger2);
    useAutoFocus(props2, fieldRef);
    useKeyboard(props2, fieldRef, trigger2);
    var {
      state: scopedAttrsState
    } = useScopedAttrs();
    useFormField("name", state);
    useEvent(fieldRef, state, trigger2, triggerInput, beforeInput);
    var fixDisabledColor = String(navigator.vendor).indexOf("Apple") === 0 && CSS.supports("image-orientation:from-image");
    return {
      fieldRef,
      state,
      scopedAttrsState,
      fixDisabledColor,
      trigger: trigger2
    };
  }
  var props$j = /* @__PURE__ */ extend({}, props$k, {
    placeholderClass: {
      type: String,
      default: "input-placeholder"
    },
    textContentType: {
      type: String,
      default: ""
    }
  });
  var Input = /* @__PURE__ */ defineBuiltInComponent({
    name: "Input",
    props: props$j,
    emits: ["confirm", ...emit],
    setup(props2, {
      emit: emit2
    }) {
      var INPUT_TYPES = ["text", "number", "idcard", "digit", "password", "tel"];
      var AUTOCOMPLETES = ["off", "one-time-code"];
      var type = computed$1(() => {
        var type2 = "";
        switch (props2.type) {
          case "text":
            if (props2.confirmType === "search") {
              type2 = "search";
            }
            break;
          case "idcard":
            type2 = "text";
            break;
          case "digit":
            type2 = "number";
            break;
          default:
            type2 = ~INPUT_TYPES.includes(props2.type) ? props2.type : "text";
            break;
        }
        return props2.password ? "password" : type2;
      });
      var autocomplete = computed$1(() => {
        var camelizeIndex = AUTOCOMPLETES.indexOf(props2.textContentType);
        var kebabCaseIndex = AUTOCOMPLETES.indexOf(hyphenate(props2.textContentType));
        var index2 = camelizeIndex !== -1 ? camelizeIndex : kebabCaseIndex !== -1 ? kebabCaseIndex : 0;
        return AUTOCOMPLETES[index2];
      });
      var cache2 = ref("");
      var resetCache;
      var rootRef = ref(null);
      var {
        fieldRef,
        state,
        scopedAttrsState,
        fixDisabledColor,
        trigger: trigger2
      } = useField(props2, rootRef, emit2, (event, state2) => {
        var input2 = event.target;
        if (type.value === "number") {
          if (resetCache) {
            input2.removeEventListener("blur", resetCache);
            resetCache = null;
          }
          if (input2.validity && !input2.validity.valid) {
            if (!cache2.value && event.data === "-" || cache2.value[0] === "-" && event.inputType === "deleteContentBackward") {
              cache2.value = "-";
              state2.value = "";
              resetCache = () => {
                cache2.value = input2.value = "";
              };
              input2.addEventListener("blur", resetCache);
              return false;
            }
            cache2.value = state2.value = input2.value = cache2.value === "-" ? "" : cache2.value;
            return false;
          } else {
            cache2.value = input2.value;
          }
          var maxlength = state2.maxlength;
          if (maxlength > 0 && input2.value.length > maxlength) {
            input2.value = input2.value.slice(0, maxlength);
            state2.value = input2.value;
            return false;
          }
        }
      });
      var NUMBER_TYPES = ["number", "digit"];
      var step2 = computed$1(() => NUMBER_TYPES.includes(props2.type) ? "0.000000000000000001" : "");
      function onKeyUpEnter(event) {
        if (event.key !== "Enter") {
          return;
        }
        event.stopPropagation();
        trigger2("confirm", event, {
          value: event.target.value
        });
      }
      return () => {
        var inputNode = props2.disabled && fixDisabledColor ? createVNode("input", {
          "ref": fieldRef,
          "value": state.value,
          "tabindex": "-1",
          "readonly": !!props2.disabled,
          "type": type.value,
          "maxlength": state.maxlength,
          "step": step2.value,
          "class": "uni-input-input",
          "onFocus": (event) => event.target.blur()
        }, null, 40, ["value", "readonly", "type", "maxlength", "step", "onFocus"]) : createVNode("input", {
          "ref": fieldRef,
          "value": state.value,
          "disabled": !!props2.disabled,
          "type": type.value,
          "maxlength": state.maxlength,
          "step": step2.value,
          "enterkeyhint": props2.confirmType,
          "pattern": props2.type === "number" ? "[0-9]*" : void 0,
          "class": "uni-input-input",
          "autocomplete": autocomplete.value,
          "onKeyup": onKeyUpEnter
        }, null, 40, ["value", "disabled", "type", "maxlength", "step", "enterkeyhint", "pattern", "autocomplete", "onKeyup"]);
        return createVNode("uni-input", {
          "ref": rootRef
        }, {
          default: () => [createVNode("div", {
            "class": "uni-input-wrapper"
          }, [withDirectives(createVNode("div", mergeProps(scopedAttrsState.attrs, {
            "style": props2.placeholderStyle,
            "class": ["uni-input-placeholder", props2.placeholderClass]
          }), [props2.placeholder], 16), [[vShow, !(state.value.length || cache2.value === "-")]]), props2.confirmType === "search" ? createVNode("form", {
            "action": "",
            "onSubmit": (event) => event.preventDefault(),
            "class": "uni-input-form"
          }, [inputNode], 40, ["onSubmit"]) : inputNode])]
        }, 512);
      };
    }
  });
  function entries(obj) {
    return Object.keys(obj).map((key2) => [key2, obj[key2]]);
  }
  var DEFAULT_EXCLUDE_KEYS = ["class", "style"];
  var LISTENER_PREFIX = /^on[A-Z]+/;
  var useAttrs = (params = {}) => {
    var {
      excludeListeners = false,
      excludeKeys = []
    } = params;
    var instance = getCurrentInstance();
    var attrs2 = shallowRef({});
    var listeners = shallowRef({});
    var excludeAttrs = shallowRef({});
    var allExcludeKeys = excludeKeys.concat(DEFAULT_EXCLUDE_KEYS);
    instance.attrs = reactive(instance.attrs);
    watchEffect(() => {
      var res = entries(instance.attrs).reduce((acc, [key2, val]) => {
        if (allExcludeKeys.includes(key2)) {
          acc.exclude[key2] = val;
        } else if (LISTENER_PREFIX.test(key2)) {
          if (!excludeListeners) {
            acc.attrs[key2] = val;
          }
          acc.listeners[key2] = val;
        } else {
          acc.attrs[key2] = val;
        }
        return acc;
      }, {
        exclude: {},
        attrs: {},
        listeners: {}
      });
      attrs2.value = res.attrs;
      listeners.value = res.listeners;
      excludeAttrs.value = res.exclude;
    });
    return {
      $attrs: attrs2,
      $listeners: listeners,
      $excludeAttrs: excludeAttrs
    };
  };
  var webview$2;
  var pullToRefreshStyle;
  function initScrollBounce() {
    {
      plusReady(() => {
        if (!webview$2) {
          webview$2 = plus.webview.currentWebview();
        }
        if (!pullToRefreshStyle) {
          pullToRefreshStyle = (webview$2.getStyle() || {}).pullToRefresh || {};
        }
      });
    }
  }
  function disableScrollBounce({
    disable
  }) {
    {
      if (pullToRefreshStyle && pullToRefreshStyle.support) {
        webview$2.setPullToRefresh(Object.assign({}, pullToRefreshStyle, {
          support: !disable
        }));
      }
    }
  }
  function flatVNode(nodes) {
    var array = [];
    if (Array.isArray(nodes)) {
      nodes.forEach((vnode) => {
        if (isVNode(vnode)) {
          if (vnode.type === Fragment) {
            array.push(...flatVNode(vnode.children));
          } else {
            array.push(vnode);
          }
        } else if (Array.isArray(vnode)) {
          array.push(...flatVNode(vnode));
        }
      });
    }
    return array;
  }
  function useRebuild(callback) {
    var instance = getCurrentInstance();
    instance.rebuild = callback;
  }
  var props$i = {
    scaleArea: {
      type: Boolean,
      default: false
    }
  };
  var MovableArea = /* @__PURE__ */ defineBuiltInComponent({
    inheritAttrs: false,
    name: "MovableArea",
    props: props$i,
    setup(props2, {
      slots
    }) {
      var rootRef = ref(null);
      var _isMounted = ref(false);
      var {
        setContexts,
        events: movableAreaEvents
      } = useMovableAreaState(props2, rootRef);
      var {
        $listeners,
        $attrs,
        $excludeAttrs
      } = useAttrs();
      var _listeners = $listeners.value;
      var events = ["onTouchstart", "onTouchmove", "onTouchend"];
      events.forEach((event) => {
        var existing = _listeners[event];
        var ours = movableAreaEvents["_".concat(event)];
        _listeners[event] = existing ? [].concat(existing, ours) : ours;
      });
      onMounted(() => {
        movableAreaEvents._resize();
        initScrollBounce();
        _isMounted.value = true;
      });
      var movableViewItems = [];
      var originMovableViewContexts = [];
      function updateMovableViewContexts() {
        var contexts = [];
        var _loop = function(index3) {
          var movableViewItem = movableViewItems[index3];
          if (!(movableViewItem instanceof Element)) {
            movableViewItem = movableViewItem.el;
          }
          var movableViewContext = originMovableViewContexts.find((context) => movableViewItem === context.rootRef.value);
          if (movableViewContext) {
            contexts.push(markRaw(movableViewContext));
          }
        };
        for (var index2 = 0; index2 < movableViewItems.length; index2++) {
          _loop(index2);
        }
        setContexts(contexts);
      }
      {
        useRebuild(() => {
          movableViewItems = rootRef.value.children;
          updateMovableViewContexts();
        });
      }
      var addMovableViewContext = (movableViewContext) => {
        originMovableViewContexts.push(movableViewContext);
        updateMovableViewContexts();
      };
      var removeMovableViewContext = (movableViewContext) => {
        var index2 = originMovableViewContexts.indexOf(movableViewContext);
        if (index2 >= 0) {
          originMovableViewContexts.splice(index2, 1);
          updateMovableViewContexts();
        }
      };
      provide("_isMounted", _isMounted);
      provide("movableAreaRootRef", rootRef);
      provide("addMovableViewContext", addMovableViewContext);
      provide("removeMovableViewContext", removeMovableViewContext);
      return () => {
        slots.default && slots.default();
        return createVNode("uni-movable-area", mergeProps({
          "ref": rootRef
        }, $attrs.value, $excludeAttrs.value, _listeners), {
          default: () => [createVNode(ResizeSensor, {
            "onReize": movableAreaEvents._resize
          }, null, 8, ["onReize"]), movableViewItems],
          _: 2
        }, 16);
      };
    }
  });
  function calc(e2) {
    return Math.sqrt(e2.x * e2.x + e2.y * e2.y);
  }
  function useMovableAreaState(props2, rootRef) {
    var width = ref(0);
    var height = ref(0);
    var gapV = reactive({
      x: null,
      y: null
    });
    var pinchStartLen = ref(null);
    var _scaleMovableView = null;
    var movableViewContexts = [];
    function _updateScale(e2) {
      if (e2 && e2 !== 1) {
        if (props2.scaleArea) {
          movableViewContexts.forEach(function(item) {
            item._setScale(e2);
          });
        } else {
          if (_scaleMovableView) {
            _scaleMovableView._setScale(e2);
          }
        }
      }
    }
    function _find(target, items = movableViewContexts) {
      var root = rootRef.value;
      function get2(node) {
        for (var i2 = 0; i2 < items.length; i2++) {
          var item = items[i2];
          if (node === item.rootRef.value) {
            return item;
          }
        }
        if (node === root || node === document.body || node === document) {
          return null;
        }
        return get2(node.parentNode);
      }
      return get2(target);
    }
    var _onTouchstart = withWebEvent((t2) => {
      disableScrollBounce({
        disable: true
      });
      var i2 = t2.touches;
      if (i2) {
        if (i2.length > 1) {
          var r = {
            x: i2[1].pageX - i2[0].pageX,
            y: i2[1].pageY - i2[0].pageY
          };
          pinchStartLen.value = calc(r);
          gapV.x = r.x;
          gapV.y = r.y;
          if (!props2.scaleArea) {
            var touch0 = _find(i2[0].target);
            var touch1 = _find(i2[1].target);
            _scaleMovableView = touch0 && touch0 === touch1 ? touch0 : null;
          }
        }
      }
    });
    var _onTouchmove = withWebEvent((t2) => {
      var n = t2.touches;
      if (n) {
        if (n.length > 1) {
          t2.preventDefault();
          var i2 = {
            x: n[1].pageX - n[0].pageX,
            y: n[1].pageY - n[0].pageY
          };
          if (gapV.x !== null && pinchStartLen.value && pinchStartLen.value > 0) {
            var r = calc(i2) / pinchStartLen.value;
            _updateScale(r);
          }
          gapV.x = i2.x;
          gapV.y = i2.y;
        }
      }
    });
    var _onTouchend = withWebEvent((e2) => {
      disableScrollBounce({
        disable: false
      });
      var t2 = e2.touches;
      if (!(t2 && t2.length)) {
        if (e2.changedTouches) {
          gapV.x = 0;
          gapV.y = 0;
          pinchStartLen.value = null;
          if (props2.scaleArea) {
            movableViewContexts.forEach(function(item) {
              item._endScale();
            });
          } else {
            if (_scaleMovableView) {
              _scaleMovableView._endScale();
            }
          }
        }
      }
    });
    function _resize() {
      _getWH();
      movableViewContexts.forEach(function(item, index2) {
        item.setParent();
      });
    }
    function _getWH() {
      var style = window.getComputedStyle(rootRef.value);
      var rect = rootRef.value.getBoundingClientRect();
      width.value = rect.width - ["Left", "Right"].reduce(function(all, item) {
        var LEFT = "border" + item + "Width";
        var RIGHT = "padding" + item;
        return all + parseFloat(style[LEFT]) + parseFloat(style[RIGHT]);
      }, 0);
      height.value = rect.height - ["Top", "Bottom"].reduce(function(all, item) {
        var TOP = "border" + item + "Width";
        var BOTTOM = "padding" + item;
        return all + parseFloat(style[TOP]) + parseFloat(style[BOTTOM]);
      }, 0);
    }
    provide("movableAreaWidth", width);
    provide("movableAreaHeight", height);
    return {
      setContexts(contexts) {
        movableViewContexts = contexts;
      },
      events: {
        _onTouchstart,
        _onTouchmove,
        _onTouchend,
        _resize
      }
    };
  }
  var addListenerToElement = function(element, type, callback, capture) {
    element.addEventListener(type, ($event) => {
      if (typeof callback === "function") {
        if (callback($event) === false) {
          if (typeof $event.cancelable !== "undefined" ? $event.cancelable : true) {
            $event.preventDefault();
          }
          $event.stopPropagation();
        }
      }
    }, {
      passive: false
    });
  };
  var __mouseMoveEventListener;
  var __mouseUpEventListener;
  function useTouchtrack(element, method, useCancel) {
    onBeforeUnmount(() => {
      document.removeEventListener("mousemove", __mouseMoveEventListener);
      document.removeEventListener("mouseup", __mouseUpEventListener);
    });
    var x0 = 0;
    var y0 = 0;
    var x1 = 0;
    var y1 = 0;
    var fn = function($event, state, x, y) {
      if (method({
        target: $event.target,
        currentTarget: $event.currentTarget,
        preventDefault: $event.preventDefault.bind($event),
        stopPropagation: $event.stopPropagation.bind($event),
        touches: $event.touches,
        changedTouches: $event.changedTouches,
        detail: {
          state,
          x,
          y,
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
    var hasTouchStart;
    var hasMouseDown;
    addListenerToElement(element, "touchstart", function($event) {
      hasTouchStart = true;
      if ($event.touches.length === 1 && !$eventOld) {
        $eventOld = $event;
        x0 = x1 = $event.touches[0].pageX;
        y0 = y1 = $event.touches[0].pageY;
        return fn($event, "start", x0, y0);
      }
    });
    addListenerToElement(element, "mousedown", function($event) {
      hasMouseDown = true;
      if (!hasTouchStart && !$eventOld) {
        $eventOld = $event;
        x0 = x1 = $event.pageX;
        y0 = y1 = $event.pageY;
        return fn($event, "start", x0, y0);
      }
    });
    addListenerToElement(element, "touchmove", function($event) {
      if ($event.touches.length === 1 && $eventOld) {
        var res = fn($event, "move", $event.touches[0].pageX, $event.touches[0].pageY);
        x1 = $event.touches[0].pageX;
        y1 = $event.touches[0].pageY;
        return res;
      }
    });
    var mouseMoveEventListener = __mouseMoveEventListener = function($event) {
      if (!hasTouchStart && hasMouseDown && $eventOld) {
        var res = fn($event, "move", $event.pageX, $event.pageY);
        x1 = $event.pageX;
        y1 = $event.pageY;
        return res;
      }
    };
    document.addEventListener("mousemove", mouseMoveEventListener);
    addListenerToElement(element, "touchend", function($event) {
      if ($event.touches.length === 0 && $eventOld) {
        hasTouchStart = false;
        $eventOld = null;
        return fn($event, "end", $event.changedTouches[0].pageX, $event.changedTouches[0].pageY);
      }
    });
    var mouseUpEventListener = __mouseUpEventListener = function($event) {
      hasMouseDown = false;
      if (!hasTouchStart && $eventOld) {
        $eventOld = null;
        return fn($event, "end", $event.pageX, $event.pageY);
      }
    };
    document.addEventListener("mouseup", mouseUpEventListener);
    addListenerToElement(element, "touchcancel", function($event) {
      if ($eventOld) {
        hasTouchStart = false;
        var $eventTemp = $eventOld;
        $eventOld = null;
        return fn($event, useCancel ? "cancel" : "end", $eventTemp.touches[0].pageX, $eventTemp.touches[0].pageY);
      }
    });
  }
  function e(e2, t2, n) {
    return e2 > t2 - n && e2 < t2 + n;
  }
  function t(t2, n) {
    return e(t2, 0, n);
  }
  function Decline() {
  }
  Decline.prototype.x = function(e2) {
    return Math.sqrt(e2);
  };
  function Friction$1(e2, t2) {
    this._m = e2;
    this._f = 1e3 * t2;
    this._startTime = 0;
    this._v = 0;
  }
  Friction$1.prototype.setV = function(x, y) {
    var n = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
    this._x_v = x;
    this._y_v = y;
    this._x_a = -this._f * this._x_v / n;
    this._y_a = -this._f * this._y_v / n;
    this._t = Math.abs(x / this._x_a) || Math.abs(y / this._y_a);
    this._lastDt = null;
    this._startTime = new Date().getTime();
  };
  Friction$1.prototype.setS = function(x, y) {
    this._x_s = x;
    this._y_s = y;
  };
  Friction$1.prototype.s = function(t2) {
    if (t2 === void 0) {
      t2 = (new Date().getTime() - this._startTime) / 1e3;
    }
    if (t2 > this._t) {
      t2 = this._t;
      this._lastDt = t2;
    }
    var x = this._x_v * t2 + 0.5 * this._x_a * Math.pow(t2, 2) + this._x_s;
    var y = this._y_v * t2 + 0.5 * this._y_a * Math.pow(t2, 2) + this._y_s;
    if (this._x_a > 0 && x < this._endPositionX || this._x_a < 0 && x > this._endPositionX) {
      x = this._endPositionX;
    }
    if (this._y_a > 0 && y < this._endPositionY || this._y_a < 0 && y > this._endPositionY) {
      y = this._endPositionY;
    }
    return {
      x,
      y
    };
  };
  Friction$1.prototype.ds = function(t2) {
    if (t2 === void 0) {
      t2 = (new Date().getTime() - this._startTime) / 1e3;
    }
    if (t2 > this._t) {
      t2 = this._t;
    }
    return {
      dx: this._x_v + this._x_a * t2,
      dy: this._y_v + this._y_a * t2
    };
  };
  Friction$1.prototype.delta = function() {
    return {
      x: -1.5 * Math.pow(this._x_v, 2) / this._x_a || 0,
      y: -1.5 * Math.pow(this._y_v, 2) / this._y_a || 0
    };
  };
  Friction$1.prototype.dt = function() {
    return -this._x_v / this._x_a;
  };
  Friction$1.prototype.done = function() {
    var t2 = e(this.s().x, this._endPositionX) || e(this.s().y, this._endPositionY) || this._lastDt === this._t;
    this._lastDt = null;
    return t2;
  };
  Friction$1.prototype.setEnd = function(x, y) {
    this._endPositionX = x;
    this._endPositionY = y;
  };
  Friction$1.prototype.reconfigure = function(m, f2) {
    this._m = m;
    this._f = 1e3 * f2;
  };
  function Spring$1(m, k, c) {
    this._m = m;
    this._k = k;
    this._c = c;
    this._solution = null;
    this._endPosition = 0;
    this._startTime = 0;
  }
  Spring$1.prototype._solve = function(e2, t2) {
    var n = this._c;
    var i2 = this._m;
    var r = this._k;
    var o2 = n * n - 4 * i2 * r;
    if (o2 === 0) {
      var a2 = -n / (2 * i2);
      var s = e2;
      var l = t2 / (a2 * e2);
      return {
        x: function(e3) {
          return (s + l * e3) * Math.pow(Math.E, a2 * e3);
        },
        dx: function(e3) {
          var t3 = Math.pow(Math.E, a2 * e3);
          return a2 * (s + l * e3) * t3 + l * t3;
        }
      };
    }
    if (o2 > 0) {
      var c = (-n - Math.sqrt(o2)) / (2 * i2);
      var u = (-n + Math.sqrt(o2)) / (2 * i2);
      var d = (t2 - c * e2) / (u - c);
      var h2 = e2 - d;
      return {
        x: function(e3) {
          var t3;
          var n2;
          if (e3 === this._t) {
            t3 = this._powER1T;
            n2 = this._powER2T;
          }
          this._t = e3;
          if (!t3) {
            t3 = this._powER1T = Math.pow(Math.E, c * e3);
          }
          if (!n2) {
            n2 = this._powER2T = Math.pow(Math.E, u * e3);
          }
          return h2 * t3 + d * n2;
        },
        dx: function(e3) {
          var t3;
          var n2;
          if (e3 === this._t) {
            t3 = this._powER1T;
            n2 = this._powER2T;
          }
          this._t = e3;
          if (!t3) {
            t3 = this._powER1T = Math.pow(Math.E, c * e3);
          }
          if (!n2) {
            n2 = this._powER2T = Math.pow(Math.E, u * e3);
          }
          return h2 * c * t3 + d * u * n2;
        }
      };
    }
    var p2 = Math.sqrt(4 * i2 * r - n * n) / (2 * i2);
    var f2 = -n / 2 * i2;
    var v2 = e2;
    var g2 = (t2 - f2 * e2) / p2;
    return {
      x: function(e3) {
        return Math.pow(Math.E, f2 * e3) * (v2 * Math.cos(p2 * e3) + g2 * Math.sin(p2 * e3));
      },
      dx: function(e3) {
        var t3 = Math.pow(Math.E, f2 * e3);
        var n2 = Math.cos(p2 * e3);
        var i3 = Math.sin(p2 * e3);
        return t3 * (g2 * p2 * n2 - v2 * p2 * i3) + f2 * t3 * (g2 * i3 + v2 * n2);
      }
    };
  };
  Spring$1.prototype.x = function(e2) {
    if (e2 === void 0) {
      e2 = (new Date().getTime() - this._startTime) / 1e3;
    }
    return this._solution ? this._endPosition + this._solution.x(e2) : 0;
  };
  Spring$1.prototype.dx = function(e2) {
    if (e2 === void 0) {
      e2 = (new Date().getTime() - this._startTime) / 1e3;
    }
    return this._solution ? this._solution.dx(e2) : 0;
  };
  Spring$1.prototype.setEnd = function(e2, n, i2) {
    if (!i2) {
      i2 = new Date().getTime();
    }
    if (e2 !== this._endPosition || !t(n, 0.1)) {
      n = n || 0;
      var r = this._endPosition;
      if (this._solution) {
        if (t(n, 0.1)) {
          n = this._solution.dx((i2 - this._startTime) / 1e3);
        }
        r = this._solution.x((i2 - this._startTime) / 1e3);
        if (t(n, 0.1)) {
          n = 0;
        }
        if (t(r, 0.1)) {
          r = 0;
        }
        r += this._endPosition;
      }
      if (!(this._solution && t(r - e2, 0.1) && t(n, 0.1))) {
        this._endPosition = e2;
        this._solution = this._solve(r - this._endPosition, n);
        this._startTime = i2;
      }
    }
  };
  Spring$1.prototype.snap = function(e2) {
    this._startTime = new Date().getTime();
    this._endPosition = e2;
    this._solution = {
      x: function() {
        return 0;
      },
      dx: function() {
        return 0;
      }
    };
  };
  Spring$1.prototype.done = function(n) {
    if (!n) {
      n = new Date().getTime();
    }
    return e(this.x(), this._endPosition, 0.1) && t(this.dx(), 0.1);
  };
  Spring$1.prototype.reconfigure = function(m, t2, c) {
    this._m = m;
    this._k = t2;
    this._c = c;
    if (!this.done()) {
      this._solution = this._solve(this.x() - this._endPosition, this.dx());
      this._startTime = new Date().getTime();
    }
  };
  Spring$1.prototype.springConstant = function() {
    return this._k;
  };
  Spring$1.prototype.damping = function() {
    return this._c;
  };
  Spring$1.prototype.configuration = function() {
    function e2(e3, t3) {
      e3.reconfigure(1, t3, e3.damping());
    }
    function t2(e3, t3) {
      e3.reconfigure(1, e3.springConstant(), t3);
    }
    return [{
      label: "Spring Constant",
      read: this.springConstant.bind(this),
      write: e2.bind(this, this),
      min: 100,
      max: 1e3
    }, {
      label: "Damping",
      read: this.damping.bind(this),
      write: t2.bind(this, this),
      min: 1,
      max: 500
    }];
  };
  function STD(e2, t2, n) {
    this._springX = new Spring$1(e2, t2, n);
    this._springY = new Spring$1(e2, t2, n);
    this._springScale = new Spring$1(e2, t2, n);
    this._startTime = 0;
  }
  STD.prototype.setEnd = function(e2, t2, n, i2) {
    var r = new Date().getTime();
    this._springX.setEnd(e2, i2, r);
    this._springY.setEnd(t2, i2, r);
    this._springScale.setEnd(n, i2, r);
    this._startTime = r;
  };
  STD.prototype.x = function() {
    var e2 = (new Date().getTime() - this._startTime) / 1e3;
    return {
      x: this._springX.x(e2),
      y: this._springY.x(e2),
      scale: this._springScale.x(e2)
    };
  };
  STD.prototype.done = function() {
    var e2 = new Date().getTime();
    return this._springX.done(e2) && this._springY.done(e2) && this._springScale.done(e2);
  };
  STD.prototype.reconfigure = function(e2, t2, n) {
    this._springX.reconfigure(e2, t2, n);
    this._springY.reconfigure(e2, t2, n);
    this._springScale.reconfigure(e2, t2, n);
  };
  var props$h = {
    direction: {
      type: String,
      default: "none"
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
  };
  var MovableView = /* @__PURE__ */ defineBuiltInComponent({
    name: "MovableView",
    props: props$h,
    emits: ["change", "scale"],
    setup(props2, {
      slots,
      emit: emit2
    }) {
      var rootRef = ref(null);
      var trigger2 = useCustomEvent(rootRef, emit2);
      var {
        setParent
      } = useMovableViewState(props2, trigger2, rootRef);
      return () => {
        return createVNode("uni-movable-view", {
          "ref": rootRef
        }, {
          default: () => [createVNode(ResizeSensor, {
            "onResize": setParent
          }, null, 8, ["onResize"]), slots.default && slots.default()],
          _: 1
        }, 512);
      };
    }
  });
  var requesting = false;
  function _requestAnimationFrame(e2) {
    if (!requesting) {
      requesting = true;
      requestAnimationFrame(function() {
        e2();
        requesting = false;
      });
    }
  }
  function p(t2, n) {
    if (t2 === n) {
      return 0;
    }
    var i2 = t2.offsetLeft;
    return t2.offsetParent ? i2 += p(t2.offsetParent, n) : 0;
  }
  function f(t2, n) {
    if (t2 === n) {
      return 0;
    }
    var i2 = t2.offsetTop;
    return t2.offsetParent ? i2 += f(t2.offsetParent, n) : 0;
  }
  function v(a2, b) {
    return +((1e3 * a2 - 1e3 * b) / 1e3).toFixed(1);
  }
  function g(friction, execute, endCallback) {
    var record = {
      id: 0,
      cancelled: false
    };
    var cancel = function(record2) {
      if (record2 && record2.id) {
        cancelAnimationFrame(record2.id);
      }
      if (record2) {
        record2.cancelled = true;
      }
    };
    function fn(record2, friction2, execute2, endCallback2) {
      if (!record2 || !record2.cancelled) {
        execute2(friction2);
        var isDone = friction2.done();
        if (!isDone) {
          if (!record2.cancelled) {
            record2.id = requestAnimationFrame(fn.bind(null, record2, friction2, execute2, endCallback2));
          }
        }
        if (isDone && endCallback2) {
          endCallback2(friction2);
        }
      }
    }
    fn(record, friction, execute, endCallback);
    return {
      cancel: cancel.bind(null, record),
      model: friction
    };
  }
  function _getPx(val) {
    if (/\d+[ur]px$/i.test(val)) {
      return uni.upx2px(parseFloat(val));
    }
    return Number(val) || 0;
  }
  function useMovableViewState(props2, trigger2, rootRef) {
    var movableAreaWidth = inject("movableAreaWidth", ref(0));
    var movableAreaHeight = inject("movableAreaHeight", ref(0));
    var _isMounted = inject("_isMounted", ref(false));
    var movableAreaRootRef = inject("movableAreaRootRef");
    var addMovableViewContext = inject("addMovableViewContext", () => {
    });
    var removeMovableViewContext = inject("removeMovableViewContext", () => {
    });
    var xSync = ref(_getPx(props2.x));
    var ySync = ref(_getPx(props2.y));
    var scaleValueSync = ref(Number(props2.scaleValue) || 1);
    var width = ref(0);
    var height = ref(0);
    var minX = ref(0);
    var minY = ref(0);
    var maxX = ref(0);
    var maxY = ref(0);
    var _SFA = null;
    var _FA = null;
    var _offset = {
      x: 0,
      y: 0
    };
    var _scaleOffset = {
      x: 0,
      y: 0
    };
    var _scale = 1;
    var _oldScale = 1;
    var _translateX = 0;
    var _translateY = 0;
    var _isScaling = false;
    var _isTouching = false;
    var __baseX;
    var __baseY;
    var _checkCanMove = null;
    var _firstMoveDirection = null;
    var _declineX = new Decline();
    var _declineY = new Decline();
    var __touchInfo = {
      historyX: [0, 0],
      historyY: [0, 0],
      historyT: [0, 0]
    };
    var dampingNumber = computed$1(() => {
      var val = Number(props2.damping);
      return isNaN(val) ? 20 : val;
    });
    var frictionNumber = computed$1(() => {
      var val = Number(props2.friction);
      return isNaN(val) || val <= 0 ? 2 : val;
    });
    var scaleMinNumber = computed$1(() => {
      var val = Number(props2.scaleMin);
      return isNaN(val) ? 0.5 : val;
    });
    var scaleMaxNumber = computed$1(() => {
      var val = Number(props2.scaleMax);
      return isNaN(val) ? 10 : val;
    });
    var xMove = computed$1(() => props2.direction === "all" || props2.direction === "horizontal");
    var yMove = computed$1(() => props2.direction === "all" || props2.direction === "vertical");
    var _STD = new STD(1, 9 * Math.pow(dampingNumber.value, 2) / 40, dampingNumber.value);
    var _friction = new Friction$1(1, frictionNumber.value);
    watch(() => props2.x, (val) => {
      xSync.value = _getPx(val);
    });
    watch(() => props2.y, (val) => {
      ySync.value = _getPx(val);
    });
    watch(xSync, (val) => {
      _setX(val);
    });
    watch(ySync, (val) => {
      _setY(val);
    });
    watch(() => props2.scaleValue, (val) => {
      scaleValueSync.value = Number(val) || 0;
    });
    watch(scaleValueSync, (val) => {
      _setScaleValue(val);
    });
    watch(scaleMinNumber, () => {
      _setScaleMinOrMax();
    });
    watch(scaleMaxNumber, () => {
      _setScaleMinOrMax();
    });
    function FAandSFACancel() {
      if (_FA) {
        _FA.cancel();
      }
      if (_SFA) {
        _SFA.cancel();
      }
    }
    function _setX(val) {
      if (xMove.value) {
        if (val + _scaleOffset.x === _translateX) {
          return _translateX;
        } else {
          if (_SFA) {
            _SFA.cancel();
          }
          _animationTo(val + _scaleOffset.x, ySync.value + _scaleOffset.y, _scale);
        }
      }
      return val;
    }
    function _setY(val) {
      if (yMove.value) {
        if (val + _scaleOffset.y === _translateY) {
          return _translateY;
        } else {
          if (_SFA) {
            _SFA.cancel();
          }
          _animationTo(xSync.value + _scaleOffset.x, val + _scaleOffset.y, _scale);
        }
      }
      return val;
    }
    function _setScaleMinOrMax() {
      if (!props2.scale) {
        return false;
      }
      _updateScale(_scale, true);
      _updateOldScale(_scale);
    }
    function _setScaleValue(scale) {
      if (!props2.scale) {
        return false;
      }
      scale = _adjustScale(scale);
      _updateScale(scale, true);
      _updateOldScale(scale);
      return scale;
    }
    function __handleTouchStart() {
      if (!_isScaling) {
        if (!props2.disabled) {
          disableScrollBounce({
            disable: true
          });
          FAandSFACancel();
          __touchInfo.historyX = [0, 0];
          __touchInfo.historyY = [0, 0];
          __touchInfo.historyT = [0, 0];
          if (xMove.value) {
            __baseX = _translateX;
          }
          if (yMove.value) {
            __baseY = _translateY;
          }
          rootRef.value.style.willChange = "transform";
          _checkCanMove = null;
          _firstMoveDirection = null;
          _isTouching = true;
        }
      }
    }
    function __handleTouchMove(event) {
      if (!_isScaling && !props2.disabled && _isTouching) {
        var x = _translateX;
        var y = _translateY;
        if (_firstMoveDirection === null) {
          _firstMoveDirection = Math.abs(event.detail.dx / event.detail.dy) > 1 ? "htouchmove" : "vtouchmove";
        }
        if (xMove.value) {
          x = event.detail.dx + __baseX;
          __touchInfo.historyX.shift();
          __touchInfo.historyX.push(x);
          if (!yMove.value && _checkCanMove === null) {
            _checkCanMove = Math.abs(event.detail.dx / event.detail.dy) < 1;
          }
        }
        if (yMove.value) {
          y = event.detail.dy + __baseY;
          __touchInfo.historyY.shift();
          __touchInfo.historyY.push(y);
          if (!xMove.value && _checkCanMove === null) {
            _checkCanMove = Math.abs(event.detail.dy / event.detail.dx) < 1;
          }
        }
        __touchInfo.historyT.shift();
        __touchInfo.historyT.push(event.detail.timeStamp);
        if (!_checkCanMove) {
          event.preventDefault();
          var source = "touch";
          if (x < minX.value) {
            if (props2.outOfBounds) {
              source = "touch-out-of-bounds";
              x = minX.value - _declineX.x(minX.value - x);
            } else {
              x = minX.value;
            }
          } else if (x > maxX.value) {
            if (props2.outOfBounds) {
              source = "touch-out-of-bounds";
              x = maxX.value + _declineX.x(x - maxX.value);
            } else {
              x = maxX.value;
            }
          }
          if (y < minY.value) {
            if (props2.outOfBounds) {
              source = "touch-out-of-bounds";
              y = minY.value - _declineY.x(minY.value - y);
            } else {
              y = minY.value;
            }
          } else {
            if (y > maxY.value) {
              if (props2.outOfBounds) {
                source = "touch-out-of-bounds";
                y = maxY.value + _declineY.x(y - maxY.value);
              } else {
                y = maxY.value;
              }
            }
          }
          _requestAnimationFrame(function() {
            _setTransform(x, y, _scale, source);
          });
        }
      }
    }
    function __handleTouchEnd() {
      if (!_isScaling && !props2.disabled && _isTouching) {
        disableScrollBounce({
          disable: false
        });
        rootRef.value.style.willChange = "auto";
        _isTouching = false;
        if (!_checkCanMove && !_revise("out-of-bounds") && props2.inertia) {
          var xv = 1e3 * (__touchInfo.historyX[1] - __touchInfo.historyX[0]) / (__touchInfo.historyT[1] - __touchInfo.historyT[0]);
          var yv = 1e3 * (__touchInfo.historyY[1] - __touchInfo.historyY[0]) / (__touchInfo.historyT[1] - __touchInfo.historyT[0]);
          _friction.setV(xv, yv);
          _friction.setS(_translateX, _translateY);
          var x0 = _friction.delta().x;
          var y0 = _friction.delta().y;
          var x = x0 + _translateX;
          var y = y0 + _translateY;
          if (x < minX.value) {
            x = minX.value;
            y = _translateY + (minX.value - _translateX) * y0 / x0;
          } else {
            if (x > maxX.value) {
              x = maxX.value;
              y = _translateY + (maxX.value - _translateX) * y0 / x0;
            }
          }
          if (y < minY.value) {
            y = minY.value;
            x = _translateX + (minY.value - _translateY) * x0 / y0;
          } else {
            if (y > maxY.value) {
              y = maxY.value;
              x = _translateX + (maxY.value - _translateY) * x0 / y0;
            }
          }
          _friction.setEnd(x, y);
          _FA = g(_friction, function() {
            var t2 = _friction.s();
            var x2 = t2.x;
            var y2 = t2.y;
            _setTransform(x2, y2, _scale, "friction");
          }, function() {
            _FA.cancel();
          });
        }
      }
      if (!props2.outOfBounds && !props2.inertia) {
        FAandSFACancel();
      }
    }
    function _getLimitXY(x, y) {
      var outOfBounds = false;
      if (x > maxX.value) {
        x = maxX.value;
        outOfBounds = true;
      } else {
        if (x < minX.value) {
          x = minX.value;
          outOfBounds = true;
        }
      }
      if (y > maxY.value) {
        y = maxY.value;
        outOfBounds = true;
      } else {
        if (y < minY.value) {
          y = minY.value;
          outOfBounds = true;
        }
      }
      return {
        x,
        y,
        outOfBounds
      };
    }
    function _updateOffset() {
      _offset.x = p(rootRef.value, movableAreaRootRef.value);
      _offset.y = f(rootRef.value, movableAreaRootRef.value);
    }
    function _updateWH(scale) {
      scale = scale || _scale;
      scale = _adjustScale(scale);
      var rect = rootRef.value.getBoundingClientRect();
      height.value = rect.height / _scale;
      width.value = rect.width / _scale;
      var _height = height.value * scale;
      var _width = width.value * scale;
      _scaleOffset.x = (_width - width.value) / 2;
      _scaleOffset.y = (_height - height.value) / 2;
    }
    function _updateBoundary() {
      var x = 0 - _offset.x + _scaleOffset.x;
      var _width = movableAreaWidth.value - width.value - _offset.x - _scaleOffset.x;
      minX.value = Math.min(x, _width);
      maxX.value = Math.max(x, _width);
      var y = 0 - _offset.y + _scaleOffset.y;
      var _height = movableAreaHeight.value - height.value - _offset.y - _scaleOffset.y;
      minY.value = Math.min(y, _height);
      maxY.value = Math.max(y, _height);
    }
    function _beginScale() {
      _isScaling = true;
    }
    function _updateScale(scale, animat) {
      if (props2.scale) {
        scale = _adjustScale(scale);
        _updateWH(scale);
        _updateBoundary();
        var limitXY = _getLimitXY(_translateX, _translateY);
        var x = limitXY.x;
        var y = limitXY.y;
        if (animat) {
          _animationTo(x, y, scale, "", true, true);
        } else {
          _requestAnimationFrame(function() {
            _setTransform(x, y, scale, "", true, true);
          });
        }
      }
    }
    function _updateOldScale(scale) {
      _oldScale = scale;
    }
    function _adjustScale(scale) {
      scale = Math.max(0.5, scaleMinNumber.value, scale);
      scale = Math.min(10, scaleMaxNumber.value, scale);
      return scale;
    }
    function _animationTo(x, y, scale, source, r, o2) {
      FAandSFACancel();
      if (!xMove.value) {
        x = _translateX;
      }
      if (!yMove.value) {
        y = _translateY;
      }
      if (!props2.scale) {
        scale = _scale;
      }
      var limitXY = _getLimitXY(x, y);
      x = limitXY.x;
      y = limitXY.y;
      if (!props2.animation) {
        _setTransform(x, y, scale, source, r, o2);
        return;
      }
      _STD._springX._solution = null;
      _STD._springY._solution = null;
      _STD._springScale._solution = null;
      _STD._springX._endPosition = _translateX;
      _STD._springY._endPosition = _translateY;
      _STD._springScale._endPosition = _scale;
      _STD.setEnd(x, y, scale, 1);
      _SFA = g(_STD, function() {
        var data = _STD.x();
        var x2 = data.x;
        var y2 = data.y;
        var scale2 = data.scale;
        _setTransform(x2, y2, scale2, source, r, o2);
      }, function() {
        _SFA.cancel();
      });
    }
    function _revise(source) {
      var limitXY = _getLimitXY(_translateX, _translateY);
      var x = limitXY.x;
      var y = limitXY.y;
      var outOfBounds = limitXY.outOfBounds;
      if (outOfBounds) {
        _animationTo(x, y, _scale, source);
      }
      return outOfBounds;
    }
    function _setTransform(x, y, scale, source = "", r, o2) {
      if (!(x !== null && x.toString() !== "NaN" && typeof x === "number")) {
        x = _translateX || 0;
      }
      if (!(y !== null && y.toString() !== "NaN" && typeof y === "number")) {
        y = _translateY || 0;
      }
      x = Number(x.toFixed(1));
      y = Number(y.toFixed(1));
      scale = Number(scale.toFixed(1));
      if (!(_translateX === x && _translateY === y)) {
        if (!r) {
          trigger2("change", {}, {
            x: v(x, _scaleOffset.x),
            y: v(y, _scaleOffset.y),
            source
          });
        }
      }
      if (!props2.scale) {
        scale = _scale;
      }
      scale = _adjustScale(scale);
      scale = +scale.toFixed(3);
      if (o2 && scale !== _scale) {
        trigger2("scale", {}, {
          x,
          y,
          scale
        });
      }
      var transform = "translateX(" + x + "px) translateY(" + y + "px) translateZ(0px) scale(" + scale + ")";
      rootRef.value.style.transform = transform;
      rootRef.value.style.webkitTransform = transform;
      _translateX = x;
      _translateY = y;
      _scale = scale;
    }
    function setParent() {
      if (!_isMounted.value) {
        return;
      }
      FAandSFACancel();
      var scale = props2.scale ? scaleValueSync.value : 1;
      _updateOffset();
      _updateWH(scale);
      _updateBoundary();
      _translateX = xSync.value + _scaleOffset.x;
      _translateY = ySync.value + _scaleOffset.y;
      var limitXY = _getLimitXY(_translateX, _translateY);
      var x = limitXY.x;
      var y = limitXY.y;
      _setTransform(x, y, scale, "", true);
      _updateOldScale(scale);
    }
    function _endScale() {
      _isScaling = false;
      _updateOldScale(_scale);
    }
    function _setScale(scale) {
      if (scale) {
        scale = _oldScale * scale;
        _beginScale();
        _updateScale(scale);
      }
    }
    onMounted(() => {
      useTouchtrack(rootRef.value, (event) => {
        switch (event.detail.state) {
          case "start":
            __handleTouchStart();
            break;
          case "move":
            __handleTouchMove(event);
            break;
          case "end":
            __handleTouchEnd();
        }
      });
      setParent();
      _friction.reconfigure(1, frictionNumber.value);
      _STD.reconfigure(1, 9 * Math.pow(dampingNumber.value, 2) / 40, dampingNumber.value);
      rootRef.value.style.transformOrigin = "center";
      initScrollBounce();
      var context = {
        rootRef,
        setParent,
        _endScale,
        _setScale
      };
      addMovableViewContext(context);
      onUnmounted(() => {
        removeMovableViewContext(context);
      });
    });
    onUnmounted(() => {
      FAandSFACancel();
    });
    return {
      setParent
    };
  }
  var OPEN_TYPES = ["navigate", "redirect", "switchTab", "reLaunch", "navigateBack"];
  var props$g = {
    hoverClass: {
      type: String,
      default: "navigator-hover"
    },
    url: {
      type: String,
      default: ""
    },
    openType: {
      type: String,
      default: "navigate",
      validator(value) {
        return Boolean(~OPEN_TYPES.indexOf(value));
      }
    },
    delta: {
      type: Number,
      default: 1
    },
    hoverStartTime: {
      type: [Number, String],
      default: 50
    },
    hoverStayTime: {
      type: [Number, String],
      default: 600
    },
    exists: {
      type: String,
      default: ""
    },
    hoverStopPropagation: {
      type: Boolean,
      default: false
    }
  };
  var Navigator = /* @__PURE__ */ defineBuiltInComponent({
    name: "Navigator",
    compatConfig: {
      MODE: 3
    },
    props: props$g,
    setup(props2, {
      slots
    }) {
      var {
        hovering,
        binding
      } = useHover(props2);
      function onClick($event) {
        if (props2.openType !== "navigateBack" && !props2.url) {
          console.error("<navigator/> should have url attribute when using navigateTo, redirectTo, reLaunch or switchTab");
          return;
        }
        switch (props2.openType) {
          case "navigate":
            uni.navigateTo({
              url: props2.url
            });
            break;
          case "redirect":
            uni.redirectTo({
              url: props2.url,
              exists: props2.exists
            });
            break;
          case "switchTab":
            uni.switchTab({
              url: props2.url
            });
            break;
          case "reLaunch":
            uni.reLaunch({
              url: props2.url
            });
            break;
          case "navigateBack":
            uni.navigateBack({
              delta: props2.delta
            });
            break;
        }
      }
      return () => {
        var {
          hoverClass
        } = props2;
        var hasHoverClass = props2.hoverClass && props2.hoverClass !== "none";
        return createVNode("uni-navigator", mergeProps({
          "class": hasHoverClass && hovering.value ? hoverClass : ""
        }, hasHoverClass && binding, {
          "onClick": onClick
        }), {
          default: () => [slots.default && slots.default()]
        }, 16, ["class", "onClick"]);
      };
    }
  });
  var props$f = {
    value: {
      type: Array,
      default() {
        return [];
      },
      validator: function(val) {
        return Array.isArray(val) && val.filter((val2) => typeof val2 === "number").length === val.length;
      }
    },
    indicatorStyle: {
      type: String,
      default: ""
    },
    indicatorClass: {
      type: String,
      default: ""
    },
    maskStyle: {
      type: String,
      default: ""
    },
    maskClass: {
      type: String,
      default: ""
    }
  };
  function useState$1(props2) {
    var value = reactive([...props2.value]);
    var state = reactive({
      value,
      height: 34
    });
    watch(() => props2.value, (val, oldVal) => {
      if (val === oldVal || val.length !== oldVal.length || val.findIndex((item, index2) => item !== oldVal[index2]) >= 0) {
        state.value.length = val.length;
        val.forEach((val2, index2) => {
          if (val2 !== state.value[index2]) {
            state.value.splice(index2, 1, val2);
          }
        });
      }
    });
    return state;
  }
  var PickerView = /* @__PURE__ */ defineBuiltInComponent({
    name: "PickerView",
    props: props$f,
    emits: ["change", "pickstart", "pickend", "update:value"],
    setup(props2, {
      slots,
      emit: emit2
    }) {
      var rootRef = ref(null);
      var wrapperRef = ref(null);
      var trigger2 = useCustomEvent(rootRef, emit2);
      var state = useState$1(props2);
      var resizeSensorRef = ref(null);
      var onMountedCallback = () => {
        var resizeSensor2 = resizeSensorRef.value;
        state.height = resizeSensor2.$el.offsetHeight;
      };
      var columnsRef = ref([]);
      function getItemIndex(vnode) {
        var columnVNodes = columnsRef.value;
        if (columnVNodes instanceof HTMLCollection) {
          return Array.prototype.indexOf.call(columnVNodes, vnode.el);
        }
        return columnVNodes.indexOf(vnode);
      }
      var getPickerViewColumn = function(columnInstance) {
        var ref2 = computed$1({
          get() {
            var index2 = getItemIndex(columnInstance.vnode);
            return state.value[index2] || 0;
          },
          set(current) {
            var index2 = getItemIndex(columnInstance.vnode);
            if (index2 < 0) {
              return;
            }
            var oldCurrent = state.value[index2];
            if (oldCurrent !== current) {
              state.value.splice(index2, 1, current);
              var value = state.value.map((val) => val);
              emit2("update:value", value);
              trigger2("change", {}, {
                value
              });
            }
          }
        });
        return ref2;
      };
      provide("getPickerViewColumn", getPickerViewColumn);
      provide("pickerViewProps", props2);
      provide("pickerViewState", state);
      {
        useRebuild(() => {
          onMountedCallback();
          columnsRef.value = wrapperRef.value.children;
        });
      }
      return () => {
        var defaultSlots = slots.default && slots.default();
        return createVNode("uni-picker-view", {
          "ref": rootRef
        }, {
          default: () => [createVNode(ResizeSensor, {
            "ref": resizeSensorRef,
            "onResize": ({
              height
            }) => state.height = height
          }, null, 8, ["onResize"]), createVNode("div", {
            "ref": wrapperRef,
            "class": "uni-picker-view-wrapper"
          }, [defaultSlots], 512)],
          _: 2
        }, 512);
      };
    }
  });
  class Friction {
    constructor(drag) {
      this._drag = drag;
      this._dragLog = Math.log(drag);
      this._x = 0;
      this._v = 0;
      this._startTime = 0;
    }
    set(x, v2) {
      this._x = x;
      this._v = v2;
      this._startTime = new Date().getTime();
    }
    setVelocityByEnd(e2) {
      this._v = (e2 - this._x) * this._dragLog / (Math.pow(this._drag, 100) - 1);
    }
    x(e2) {
      if (e2 === void 0) {
        e2 = (new Date().getTime() - this._startTime) / 1e3;
      }
      var t2 = e2 === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e2);
      this._dt = e2;
      return this._x + this._v * t2 / this._dragLog - this._v / this._dragLog;
    }
    dx(e2) {
      if (e2 === void 0) {
        e2 = (new Date().getTime() - this._startTime) / 1e3;
      }
      var t2 = e2 === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e2);
      this._dt = e2;
      return this._v * t2;
    }
    done() {
      return Math.abs(this.dx()) < 3;
    }
    reconfigure(e2) {
      var t2 = this.x();
      var n = this.dx();
      this._drag = e2;
      this._dragLog = Math.log(e2);
      this.set(t2, n);
    }
    configuration() {
      var e2 = this;
      return [{
        label: "Friction",
        read: function() {
          return e2._drag;
        },
        write: function(t2) {
          e2.reconfigure(t2);
        },
        min: 1e-3,
        max: 0.1,
        step: 1e-3
      }];
    }
  }
  function o(e2, t2, n) {
    return e2 > t2 - n && e2 < t2 + n;
  }
  function a(e2, t2) {
    return o(e2, 0, t2);
  }
  class Spring {
    constructor(m, k, c) {
      this._m = m;
      this._k = k;
      this._c = c;
      this._solution = null;
      this._endPosition = 0;
      this._startTime = 0;
    }
    _solve(e2, t2) {
      var n = this._c;
      var i2 = this._m;
      var r = this._k;
      var o2 = n * n - 4 * i2 * r;
      if (o2 === 0) {
        var a3 = -n / (2 * i2);
        var s2 = e2;
        var l2 = t2 / (a3 * e2);
        return {
          x: function(e22) {
            return (s2 + l2 * e22) * Math.pow(Math.E, a3 * e22);
          },
          dx: function(e22) {
            var t22 = Math.pow(Math.E, a3 * e22);
            return a3 * (s2 + l2 * e22) * t22 + l2 * t22;
          }
        };
      }
      if (o2 > 0) {
        var c = (-n - Math.sqrt(o2)) / (2 * i2);
        var u = (-n + Math.sqrt(o2)) / (2 * i2);
        var _l = (t2 - c * e2) / (u - c);
        var _s = e2 - _l;
        return {
          x: function(e22) {
            var t22;
            var n2;
            if (e22 === this._t) {
              t22 = this._powER1T;
              n2 = this._powER2T;
            }
            this._t = e22;
            if (!t22) {
              t22 = this._powER1T = Math.pow(Math.E, c * e22);
            }
            if (!n2) {
              n2 = this._powER2T = Math.pow(Math.E, u * e22);
            }
            return _s * t22 + _l * n2;
          },
          dx: function(e22) {
            var t22;
            var n2;
            if (e22 === this._t) {
              t22 = this._powER1T;
              n2 = this._powER2T;
            }
            this._t = e22;
            if (!t22) {
              t22 = this._powER1T = Math.pow(Math.E, c * e22);
            }
            if (!n2) {
              n2 = this._powER2T = Math.pow(Math.E, u * e22);
            }
            return _s * c * t22 + _l * u * n2;
          }
        };
      }
      var d = Math.sqrt(4 * i2 * r - n * n) / (2 * i2);
      var a2 = -n / 2 * i2;
      var s = e2;
      var l = (t2 - a2 * e2) / d;
      return {
        x: function(e22) {
          return Math.pow(Math.E, a2 * e22) * (s * Math.cos(d * e22) + l * Math.sin(d * e22));
        },
        dx: function(e22) {
          var t22 = Math.pow(Math.E, a2 * e22);
          var n2 = Math.cos(d * e22);
          var i22 = Math.sin(d * e22);
          return t22 * (l * d * n2 - s * d * i22) + a2 * t22 * (l * i22 + s * n2);
        }
      };
    }
    x(e2) {
      if (e2 === void 0) {
        e2 = (new Date().getTime() - this._startTime) / 1e3;
      }
      return this._solution ? this._endPosition + this._solution.x(e2) : 0;
    }
    dx(e2) {
      if (e2 === void 0) {
        e2 = (new Date().getTime() - this._startTime) / 1e3;
      }
      return this._solution ? this._solution.dx(e2) : 0;
    }
    setEnd(e2, t2, n) {
      if (!n) {
        n = new Date().getTime();
      }
      if (e2 !== this._endPosition || !a(t2, 0.4)) {
        t2 = t2 || 0;
        var i2 = this._endPosition;
        if (this._solution) {
          if (a(t2, 0.4)) {
            t2 = this._solution.dx((n - this._startTime) / 1e3);
          }
          i2 = this._solution.x((n - this._startTime) / 1e3);
          if (a(t2, 0.4)) {
            t2 = 0;
          }
          if (a(i2, 0.4)) {
            i2 = 0;
          }
          i2 += this._endPosition;
        }
        if (!(this._solution && a(i2 - e2, 0.4) && a(t2, 0.4))) {
          this._endPosition = e2;
          this._solution = this._solve(i2 - this._endPosition, t2);
          this._startTime = n;
        }
      }
    }
    snap(e2) {
      this._startTime = new Date().getTime();
      this._endPosition = e2;
      this._solution = {
        x: function() {
          return 0;
        },
        dx: function() {
          return 0;
        }
      };
    }
    done(e2) {
      if (!e2) {
        e2 = new Date().getTime();
      }
      return o(this.x(), this._endPosition, 0.4) && a(this.dx(), 0.4);
    }
    reconfigure(e2, t2, n) {
      this._m = e2;
      this._k = t2;
      this._c = n;
      if (!this.done()) {
        this._solution = this._solve(this.x() - this._endPosition, this.dx());
        this._startTime = new Date().getTime();
      }
    }
    springConstant() {
      return this._k;
    }
    damping() {
      return this._c;
    }
    configuration() {
      function e2(e22, t22) {
        e22.reconfigure(1, t22, e22.damping());
      }
      function t2(e22, t22) {
        e22.reconfigure(1, e22.springConstant(), t22);
      }
      return [{
        label: "Spring Constant",
        read: this.springConstant.bind(this),
        write: e2.bind(this, this),
        min: 100,
        max: 1e3
      }, {
        label: "Damping",
        read: this.damping.bind(this),
        write: t2.bind(this, this),
        min: 1,
        max: 500
      }];
    }
  }
  class Scroll {
    constructor(extent, friction, spring) {
      this._extent = extent;
      this._friction = friction || new Friction(0.01);
      this._spring = spring || new Spring(1, 90, 20);
      this._startTime = 0;
      this._springing = false;
      this._springOffset = 0;
    }
    snap(e2, t2) {
      this._springOffset = 0;
      this._springing = true;
      this._spring.snap(e2);
      this._spring.setEnd(t2);
    }
    set(e2, t2) {
      this._friction.set(e2, t2);
      if (e2 > 0 && t2 >= 0) {
        this._springOffset = 0;
        this._springing = true;
        this._spring.snap(e2);
        this._spring.setEnd(0);
      } else {
        if (e2 < -this._extent && t2 <= 0) {
          this._springOffset = 0;
          this._springing = true;
          this._spring.snap(e2);
          this._spring.setEnd(-this._extent);
        } else {
          this._springing = false;
        }
      }
      this._startTime = new Date().getTime();
    }
    x(e2) {
      if (!this._startTime) {
        return 0;
      }
      if (!e2) {
        e2 = (new Date().getTime() - this._startTime) / 1e3;
      }
      if (this._springing) {
        return this._spring.x() + this._springOffset;
      }
      var t2 = this._friction.x(e2);
      var n = this.dx(e2);
      if (t2 > 0 && n >= 0 || t2 < -this._extent && n <= 0) {
        this._springing = true;
        this._spring.setEnd(0, n);
        if (t2 < -this._extent) {
          this._springOffset = -this._extent;
        } else {
          this._springOffset = 0;
        }
        t2 = this._spring.x() + this._springOffset;
      }
      return t2;
    }
    dx(e2) {
      var t2;
      if (this._lastTime === e2) {
        t2 = this._lastDx;
      } else {
        t2 = this._springing ? this._spring.dx(e2) : this._friction.dx(e2);
      }
      this._lastTime = e2;
      this._lastDx = t2;
      return t2;
    }
    done() {
      return this._springing ? this._spring.done() : this._friction.done();
    }
    setVelocityByEnd(e2) {
      this._friction.setVelocityByEnd(e2);
    }
    configuration() {
      var e2 = this._friction.configuration();
      e2.push.apply(e2, this._spring.configuration());
      return e2;
    }
  }
  function createAnimation(scroll, onScroll, onEnd) {
    var state = {
      id: 0,
      cancelled: false
    };
    function startAnimation2(state2, scroll2, onScroll2, onEnd2) {
      if (!state2 || !state2.cancelled) {
        onScroll2(scroll2);
        var isDone = scroll2.done();
        if (!isDone) {
          if (!state2.cancelled) {
            state2.id = requestAnimationFrame(startAnimation2.bind(null, state2, scroll2, onScroll2, onEnd2));
          }
        }
        if (isDone && onEnd2) {
          onEnd2(scroll2);
        }
      }
    }
    function cancel(state2) {
      if (state2 && state2.id) {
        cancelAnimationFrame(state2.id);
      }
      if (state2) {
        state2.cancelled = true;
      }
    }
    startAnimation2(state, scroll, onScroll, onEnd);
    return {
      cancel: cancel.bind(null, state),
      model: scroll
    };
  }
  class Scroller {
    constructor(element, options) {
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
    onTouchStart() {
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
    }
    onTouchMove(x, y) {
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
    }
    onTouchEnd(x, y, o2) {
      if (this._enableSnap && this._position > -this._extent && this._position < 0) {
        if (this._enableY && (Math.abs(y) < this._itemSize && Math.abs(o2.y) < 300 || Math.abs(o2.y) < 150)) {
          this.snap();
          return;
        }
        if (this._enableX && (Math.abs(x) < this._itemSize && Math.abs(o2.x) < 300 || Math.abs(o2.x) < 150)) {
          this.snap();
          return;
        }
      }
      if (this._enableX) {
        this._scroll.set(this._position, o2.x);
      } else if (this._enableY) {
        this._scroll.set(this._position, o2.y);
      }
      var c;
      if (this._enableSnap) {
        var s = this._scroll._friction.x(100);
        var l = s % this._itemSize;
        c = Math.abs(l) > this._itemSize / 2 ? s - (this._itemSize - Math.abs(l)) : s - l;
        if (c <= 0 && c >= -this._extent) {
          this._scroll.setVelocityByEnd(c);
        }
      }
      this._lastTime = Date.now();
      this._lastDelay = 0;
      this._scrolling = true;
      this._lastChangePos = this._position;
      this._lastIdx = Math.floor(Math.abs(this._position / this._itemSize));
      this._animation = createAnimation(this._scroll, () => {
        var e2 = Date.now();
        var i2 = (e2 - this._scroll._startTime) / 1e3;
        var r = this._scroll.x(i2);
        this._position = r;
        this.updatePosition();
        var o22 = this._scroll.dx(i2);
        if (this._shouldDispatchScrollEvent && e2 - this._lastTime > this._lastDelay) {
          this.dispatchScroll();
          this._lastDelay = Math.abs(2e3 / o22);
          this._lastTime = e2;
        }
      }, () => {
        if (this._enableSnap) {
          if (c <= 0 && c >= -this._extent) {
            this._position = c;
            this.updatePosition();
          }
          if (typeof this._options.onSnap === "function") {
            this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize));
          }
        }
        if (this._shouldDispatchScrollEvent) {
          this.dispatchScroll();
        }
        this._scrolling = false;
      });
    }
    onTransitionEnd() {
      this._element.style.webkitTransition = "";
      this._element.style.transition = "";
      this._element.removeEventListener("transitionend", this._onTransitionEnd);
      if (this._snapping) {
        this._snapping = false;
      }
      this.dispatchScroll();
    }
    snap() {
      var itemSize = this._itemSize;
      var position = this._position % itemSize;
      var i2 = Math.abs(position) > this._itemSize / 2 ? this._position - (itemSize - Math.abs(position)) : this._position - position;
      if (this._position !== i2) {
        this._snapping = true;
        this.scrollTo(-i2);
        if (typeof this._options.onSnap === "function") {
          this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize));
        }
      }
    }
    scrollTo(position, time) {
      if (this._animation) {
        this._animation.cancel();
        this._scrolling = false;
      }
      if (typeof position === "number") {
        this._position = -position;
      }
      if (this._position < -this._extent) {
        this._position = -this._extent;
      } else {
        if (this._position > 0) {
          this._position = 0;
        }
      }
      var transition = "transform " + (time || 0.2) + "s ease-out";
      this._element.style.webkitTransition = "-webkit-" + transition;
      this._element.style.transition = transition;
      this.updatePosition();
      this._element.addEventListener("transitionend", this._onTransitionEnd);
    }
    dispatchScroll() {
      if (typeof this._options.onScroll === "function" && Math.round(Number(this._lastPos)) !== Math.round(this._position)) {
        this._lastPos = this._position;
        var event = {
          target: {
            scrollLeft: this._enableX ? -this._position : 0,
            scrollTop: this._enableY ? -this._position : 0,
            scrollHeight: this._scrollHeight || this._element.offsetHeight,
            scrollWidth: this._scrollWidth || this._element.offsetWidth,
            offsetHeight: this._element.parentElement.offsetHeight,
            offsetWidth: this._element.parentElement.offsetWidth
          }
        };
        this._options.onScroll(event);
      }
    }
    update(height, scrollHeight, itemSize) {
      var extent = 0;
      var position = this._position;
      if (this._enableX) {
        extent = this._element.childNodes.length ? (scrollHeight || this._element.offsetWidth) - this._element.parentElement.offsetWidth : 0;
        this._scrollWidth = scrollHeight;
      } else {
        extent = this._element.childNodes.length ? (scrollHeight || this._element.offsetHeight) - this._element.parentElement.offsetHeight : 0;
        this._scrollHeight = scrollHeight;
      }
      if (typeof height === "number") {
        this._position = -height;
      }
      if (this._position < -extent) {
        this._position = -extent;
      } else {
        if (this._position > 0) {
          this._position = 0;
        }
      }
      this._itemSize = itemSize || this._itemSize;
      this.updatePosition();
      if (position !== this._position) {
        this.dispatchScroll();
        if (typeof this._options.onSnap === "function") {
          this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize));
        }
      }
      this._extent = extent;
      this._scroll._extent = extent;
    }
    updatePosition() {
      var transform = "";
      if (this._enableX) {
        transform = "translateX(" + this._position + "px) translateZ(0)";
      } else {
        if (this._enableY) {
          transform = "translateY(" + this._position + "px) translateZ(0)";
        }
      }
      this._element.style.webkitTransform = transform;
      this._element.style.transform = transform;
    }
    isScrolling() {
      return this._scrolling || this._snapping;
    }
  }
  function useScroller(element, options) {
    var touchInfo = {
      trackingID: -1,
      maxDy: 0,
      maxDx: 0
    };
    var scroller = new Scroller(element, options);
    function findDelta(event) {
      var touchtrackEvent = event;
      var mouseEvent = event;
      return touchtrackEvent.detail.state === "move" || touchtrackEvent.detail.state === "end" ? {
        x: touchtrackEvent.detail.dx,
        y: touchtrackEvent.detail.dy
      } : {
        x: mouseEvent.screenX - touchInfo.x,
        y: mouseEvent.screenY - touchInfo.y
      };
    }
    function handleTouchStart(event) {
      var touchtrackEvent = event;
      var mouseEvent = event;
      if (touchtrackEvent.detail.state === "start") {
        touchInfo.trackingID = "touch";
        touchInfo.x = touchtrackEvent.detail.x;
        touchInfo.y = touchtrackEvent.detail.y;
      } else {
        touchInfo.trackingID = "mouse";
        touchInfo.x = mouseEvent.screenX;
        touchInfo.y = mouseEvent.screenY;
      }
      touchInfo.maxDx = 0;
      touchInfo.maxDy = 0;
      touchInfo.historyX = [0];
      touchInfo.historyY = [0];
      touchInfo.historyTime = [touchtrackEvent.detail.timeStamp || mouseEvent.timeStamp];
      touchInfo.listener = scroller;
      if (scroller.onTouchStart) {
        scroller.onTouchStart();
      }
      event.preventDefault();
    }
    function handleTouchMove(event) {
      var touchtrackEvent = event;
      var mouseEvent = event;
      if (touchInfo.trackingID !== -1) {
        event.preventDefault();
        var delta = findDelta(event);
        if (delta) {
          for (touchInfo.maxDy = Math.max(touchInfo.maxDy, Math.abs(delta.y)), touchInfo.maxDx = Math.max(touchInfo.maxDx, Math.abs(delta.x)), touchInfo.historyX.push(delta.x), touchInfo.historyY.push(delta.y), touchInfo.historyTime.push(touchtrackEvent.detail.timeStamp || mouseEvent.timeStamp); touchInfo.historyTime.length > 10; ) {
            touchInfo.historyTime.shift();
            touchInfo.historyX.shift();
            touchInfo.historyY.shift();
          }
          if (touchInfo.listener && touchInfo.listener.onTouchMove) {
            touchInfo.listener.onTouchMove(delta.x, delta.y);
          }
        }
      }
    }
    function handleTouchEnd(event) {
      if (touchInfo.trackingID !== -1) {
        event.preventDefault();
        var delta = findDelta(event);
        if (delta) {
          var listener = touchInfo.listener;
          touchInfo.trackingID = -1;
          touchInfo.listener = null;
          var length = touchInfo.historyTime.length;
          var o2 = {
            x: 0,
            y: 0
          };
          if (length > 2) {
            for (var i2 = touchInfo.historyTime.length - 1, time1 = touchInfo.historyTime[i2], x = touchInfo.historyX[i2], y = touchInfo.historyY[i2]; i2 > 0; ) {
              i2--;
              var time0 = touchInfo.historyTime[i2];
              var time = time1 - time0;
              if (time > 30 && time < 50) {
                o2.x = (x - touchInfo.historyX[i2]) / (time / 1e3);
                o2.y = (y - touchInfo.historyY[i2]) / (time / 1e3);
                break;
              }
            }
          }
          touchInfo.historyTime = [];
          touchInfo.historyX = [];
          touchInfo.historyY = [];
          if (listener && listener.onTouchEnd) {
            listener.onTouchEnd(delta.x, delta.y, o2);
          }
        }
      }
    }
    return {
      scroller,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd
    };
  }
  var scopedIndex = 0;
  function useScopedClass(indicatorHeightRef) {
    var className = "uni-picker-view-content-".concat(scopedIndex++);
    function updateStyle() {
      var style = document.createElement("style");
      style.innerText = ".uni-picker-view-content.".concat(className, ">*{height: ").concat(indicatorHeightRef.value, "px;overflow: hidden;}");
      document.head.appendChild(style);
    }
    watch(() => indicatorHeightRef.value, updateStyle);
    return className;
  }
  function useCustomClick(dom) {
    var MAX_MOVE = 20;
    var x = 0;
    var y = 0;
    dom.addEventListener("touchstart", (event) => {
      var info = event.changedTouches[0];
      x = info.clientX;
      y = info.clientY;
    });
    dom.addEventListener("touchend", (event) => {
      var info = event.changedTouches[0];
      if (Math.abs(info.clientX - x) < MAX_MOVE && Math.abs(info.clientY - y) < MAX_MOVE) {
        var options = {
          bubbles: true,
          cancelable: true,
          target: event.target,
          currentTarget: event.currentTarget
        };
        var customClick = new CustomEvent("click", options);
        var props2 = ["screenX", "screenY", "clientX", "clientY", "pageX", "pageY"];
        props2.forEach((key2) => {
          customClick[key2] = info[key2];
        });
        event.target.dispatchEvent(customClick);
      }
    });
  }
  var PickerViewColumn = /* @__PURE__ */ defineBuiltInComponent({
    name: "PickerViewColumn",
    setup(props2, {
      slots,
      emit: emit2
    }) {
      var rootRef = ref(null);
      var contentRef = ref(null);
      var getPickerViewColumn = inject("getPickerViewColumn");
      var instance = getCurrentInstance();
      var currentRef = getPickerViewColumn ? getPickerViewColumn(instance) : ref(0);
      var pickerViewProps = inject("pickerViewProps");
      var pickerViewState = inject("pickerViewState");
      var indicatorHeight = ref(34);
      var resizeSensorRef = ref(null);
      var initIndicatorHeight = () => {
        var resizeSensor2 = resizeSensorRef.value;
        indicatorHeight.value = resizeSensor2.$el.offsetHeight;
      };
      var maskSize = computed$1(() => (pickerViewState.height - indicatorHeight.value) / 2);
      var {
        state: scopedAttrsState
      } = useScopedAttrs();
      var className = useScopedClass(indicatorHeight);
      var scroller;
      var state = reactive({
        current: currentRef.value,
        length: 0
      });
      var updatesScrollerRequest;
      function updatesScroller() {
        if (scroller && !updatesScrollerRequest) {
          updatesScrollerRequest = true;
          nextTick(() => {
            updatesScrollerRequest = false;
            var current = Math.min(state.current, state.length - 1);
            current = Math.max(current, 0);
            scroller.update(current * indicatorHeight.value, void 0, indicatorHeight.value);
          });
        }
      }
      watch(() => currentRef.value, (current) => {
        if (current !== state.current) {
          state.current = current;
          updatesScroller();
        }
      });
      watch(() => state.current, (current) => currentRef.value = current);
      watch([() => indicatorHeight.value, () => state.length, () => pickerViewState.height], updatesScroller);
      var oldDeltaY = 0;
      function handleWheel(event) {
        var deltaY = oldDeltaY + event.deltaY;
        if (Math.abs(deltaY) > 10) {
          oldDeltaY = 0;
          var current = Math.min(state.current + (deltaY < 0 ? -1 : 1), state.length - 1);
          state.current = current = Math.max(current, 0);
          scroller.scrollTo(current * indicatorHeight.value);
        } else {
          oldDeltaY = deltaY;
        }
        event.preventDefault();
      }
      function handleTap({
        clientY
      }) {
        var el = rootRef.value;
        if (!scroller.isScrolling()) {
          var rect = el.getBoundingClientRect();
          var r = clientY - rect.top - pickerViewState.height / 2;
          var o2 = indicatorHeight.value / 2;
          if (!(Math.abs(r) <= o2)) {
            var a2 = Math.ceil((Math.abs(r) - o2) / indicatorHeight.value);
            var s = r < 0 ? -a2 : a2;
            var current = Math.min(state.current + s, state.length - 1);
            state.current = current = Math.max(current, 0);
            scroller.scrollTo(current * indicatorHeight.value);
          }
        }
      }
      var initScroller = () => {
        var el = rootRef.value;
        var content = contentRef.value;
        var {
          scroller: scrollerOrigin,
          handleTouchStart,
          handleTouchMove,
          handleTouchEnd
        } = useScroller(content, {
          enableY: true,
          enableX: false,
          enableSnap: true,
          itemSize: indicatorHeight.value,
          friction: new Friction(1e-4),
          spring: new Spring(2, 90, 20),
          onSnap: (index2) => {
            if (!isNaN(index2) && index2 !== state.current) {
              state.current = index2;
            }
          }
        });
        scroller = scrollerOrigin;
        useTouchtrack(el, (e2) => {
          switch (e2.detail.state) {
            case "start":
              handleTouchStart(e2);
              disableScrollBounce({
                disable: true
              });
              break;
            case "move":
              handleTouchMove(e2);
              break;
            case "end":
            case "cancel":
              handleTouchEnd(e2);
              disableScrollBounce({
                disable: false
              });
          }
        }, true);
        useCustomClick(el);
        initScrollBounce();
        updatesScroller();
      };
      {
        useRebuild(() => {
          state.length = contentRef.value.children.length;
          initIndicatorHeight();
          initScroller();
        });
      }
      return () => {
        var defaultSlots = slots.default && slots.default();
        var padding = "".concat(maskSize.value, "px 0");
        return createVNode("uni-picker-view-column", {
          "ref": rootRef
        }, {
          default: () => [createVNode("div", {
            "onWheel": handleWheel,
            "onClick": handleTap,
            "class": "uni-picker-view-group"
          }, [createVNode("div", mergeProps(scopedAttrsState.attrs, {
            "class": ["uni-picker-view-mask", pickerViewProps.maskClass],
            "style": "background-size: 100% ".concat(maskSize.value, "px;").concat(pickerViewProps.maskStyle)
          }), null, 16), createVNode("div", mergeProps(scopedAttrsState.attrs, {
            "class": ["uni-picker-view-indicator", pickerViewProps.indicatorClass],
            "style": pickerViewProps.indicatorStyle
          }), [createVNode(ResizeSensor, {
            "ref": resizeSensorRef,
            "onResize": ({
              height
            }) => indicatorHeight.value = height
          }, null, 8, ["onResize"])], 16), createVNode("div", {
            "ref": contentRef,
            "class": ["uni-picker-view-content", className],
            "style": {
              padding
            }
          }, [defaultSlots], 6)], 40, ["onWheel", "onClick"])]
        }, 512);
      };
    }
  });
  var VALUES = {
    activeColor: PRIMARY_COLOR,
    backgroundColor: "#EBEBEB",
    activeMode: "backwards"
  };
  var props$e = {
    percent: {
      type: [Number, String],
      default: 0,
      validator(value) {
        return !isNaN(parseFloat(value));
      }
    },
    showInfo: {
      type: [Boolean, String],
      default: false
    },
    strokeWidth: {
      type: [Number, String],
      default: 6,
      validator(value) {
        return !isNaN(parseFloat(value));
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
    },
    duration: {
      type: [Number, String],
      default: 30,
      validator(value) {
        return !isNaN(parseFloat(value));
      }
    }
  };
  var Progress = /* @__PURE__ */ defineBuiltInComponent({
    name: "Progress",
    props: props$e,
    setup(props2) {
      var state = useProgressState(props2);
      _activeAnimation(state, props2);
      watch(() => state.realPercent, (newValue, oldValue) => {
        state.strokeTimer && clearInterval(state.strokeTimer);
        state.lastPercent = oldValue || 0;
        _activeAnimation(state, props2);
      });
      return () => {
        var {
          showInfo
        } = props2;
        var {
          outerBarStyle,
          innerBarStyle,
          currentPercent
        } = state;
        return createVNode("uni-progress", {
          "class": "uni-progress"
        }, {
          default: () => [createVNode("div", {
            "style": outerBarStyle,
            "class": "uni-progress-bar"
          }, [createVNode("div", {
            "style": innerBarStyle,
            "class": "uni-progress-inner-bar"
          }, null, 4)], 4), showInfo ? createVNode("p", {
            "class": "uni-progress-info"
          }, [currentPercent + "%"]) : ""],
          _: 1
        });
      };
    }
  });
  function useProgressState(props2) {
    var currentPercent = ref(0);
    var outerBarStyle = computed$1(() => "background-color: ".concat(props2.backgroundColor, "; height: ").concat(props2.strokeWidth, "px;"));
    var innerBarStyle = computed$1(() => {
      var backgroundColor = props2.color !== VALUES.activeColor && props2.activeColor === VALUES.activeColor ? props2.color : props2.activeColor;
      return "width: ".concat(currentPercent.value, "%;background-color: ").concat(backgroundColor);
    });
    var realPercent = computed$1(() => {
      var realValue = parseFloat(props2.percent);
      realValue < 0 && (realValue = 0);
      realValue > 100 && (realValue = 100);
      return realValue;
    });
    var state = reactive({
      outerBarStyle,
      innerBarStyle,
      realPercent,
      currentPercent,
      strokeTimer: 0,
      lastPercent: 0
    });
    return state;
  }
  function _activeAnimation(state, props2) {
    if (props2.active) {
      state.currentPercent = props2.activeMode === VALUES.activeMode ? 0 : state.lastPercent;
      state.strokeTimer = setInterval(() => {
        if (state.currentPercent + 1 > state.realPercent) {
          state.currentPercent = state.realPercent;
          state.strokeTimer && clearInterval(state.strokeTimer);
        } else {
          state.currentPercent += 1;
        }
      }, parseFloat(props2.duration));
    } else {
      state.currentPercent = state.realPercent;
    }
  }
  var uniRadioGroupKey = PolySymbol("uniCheckGroup");
  var props$d = {
    name: {
      type: String,
      default: ""
    }
  };
  var RadioGroup = /* @__PURE__ */ defineBuiltInComponent({
    name: "RadioGroup",
    props: props$d,
    setup(props2, {
      emit: emit2,
      slots
    }) {
      var rootRef = ref(null);
      var trigger2 = useCustomEvent(rootRef, emit2);
      useProvideRadioGroup(props2, trigger2);
      return () => {
        return createVNode("uni-radio-group", {
          "ref": rootRef
        }, {
          default: () => [slots.default && slots.default()]
        }, 512);
      };
    }
  });
  function useProvideRadioGroup(props2, trigger2) {
    var fields2 = [];
    onMounted(() => {
      _resetRadioGroupValue(fields2.length - 1);
    });
    var getFieldsValue = () => {
      var _fields$find;
      return (_fields$find = fields2.find((field) => field.value.radioChecked)) === null || _fields$find === void 0 ? void 0 : _fields$find.value.value;
    };
    provide(uniRadioGroupKey, {
      addField(field) {
        fields2.push(field);
      },
      removeField(field) {
        fields2.splice(fields2.indexOf(field), 1);
      },
      radioChange($event, field) {
        var index2 = fields2.indexOf(field);
        _resetRadioGroupValue(index2, true);
        trigger2("change", $event, {
          value: getFieldsValue()
        });
      }
    });
    var uniForm = inject(uniFormKey, false);
    var formField = {
      submit: () => {
        var data = ["", null];
        if (props2.name !== "") {
          data[0] = props2.name;
          data[1] = getFieldsValue();
        }
        return data;
      }
    };
    if (uniForm) {
      uniForm.addField(formField);
      onBeforeUnmount(() => {
        uniForm.removeField(formField);
      });
    }
    function setFieldChecked(field, radioChecked) {
      field.value = {
        radioChecked,
        value: field.value.value
      };
    }
    function _resetRadioGroupValue(key2, change) {
      fields2.forEach((value, index2) => {
        if (index2 === key2) {
          return;
        }
        if (change) {
          setFieldChecked(fields2[index2], false);
        } else {
          fields2.forEach((v2, i2) => {
            if (index2 >= i2) {
              return;
            }
            if (fields2[i2].value.radioChecked) {
              setFieldChecked(fields2[index2], false);
            }
          });
        }
      });
    }
    return fields2;
  }
  var props$c = {
    checked: {
      type: [Boolean, String],
      default: false
    },
    id: {
      type: String,
      default: ""
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: "#007aff"
    },
    value: {
      type: String,
      default: ""
    }
  };
  var Radio = /* @__PURE__ */ defineBuiltInComponent({
    name: "Radio",
    props: props$c,
    setup(props2, {
      slots
    }) {
      var radioChecked = ref(props2.checked);
      var radioValue = ref(props2.value);
      var checkedStyle = computed$1(() => "background-color: ".concat(props2.color, ";border-color: ").concat(props2.color, ";"));
      watch([() => props2.checked, () => props2.value], ([newChecked, newModelValue]) => {
        radioChecked.value = newChecked;
        radioValue.value = newModelValue;
      });
      var reset2 = () => {
        radioChecked.value = false;
      };
      var {
        uniCheckGroup,
        uniLabel,
        field
      } = useRadioInject(radioChecked, radioValue, reset2);
      var _onClick = ($event) => {
        if (props2.disabled) {
          return;
        }
        radioChecked.value = true;
        uniCheckGroup && uniCheckGroup.radioChange($event, field);
      };
      if (!!uniLabel) {
        uniLabel.addHandler(_onClick);
        onBeforeUnmount(() => {
          uniLabel.removeHandler(_onClick);
        });
      }
      useListeners$1(props2, {
        "label-click": _onClick
      });
      return () => {
        var {
          booleanAttrs
        } = useBooleanAttr(props2, "disabled");
        return createVNode("uni-radio", mergeProps(booleanAttrs, {
          "onClick": _onClick
        }), {
          default: () => [createVNode("div", {
            "class": "uni-radio-wrapper"
          }, [createVNode("div", {
            "class": ["uni-radio-input", {
              "uni-radio-input-disabled": props2.disabled
            }],
            "style": radioChecked.value ? checkedStyle.value : ""
          }, [radioChecked.value ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, "#fff", 18) : ""], 6), slots.default && slots.default()])]
        }, 16, ["onClick"]);
      };
    }
  });
  function useRadioInject(radioChecked, radioValue, reset2) {
    var field = computed$1({
      get: () => ({
        radioChecked: Boolean(radioChecked.value),
        value: radioValue.value
      }),
      set: ({
        radioChecked: checked
      }) => {
        radioChecked.value = checked;
      }
    });
    var formField = {
      reset: reset2
    };
    var uniCheckGroup = inject(uniRadioGroupKey, false);
    if (!!uniCheckGroup) {
      uniCheckGroup.addField(field);
    }
    var uniForm = inject(uniFormKey, false);
    if (!!uniForm) {
      uniForm.addField(formField);
    }
    var uniLabel = inject(uniLabelKey, false);
    onBeforeUnmount(() => {
      uniCheckGroup && uniCheckGroup.removeField(field);
      uniForm && uniForm.removeField(formField);
    });
    return {
      uniCheckGroup,
      uniForm,
      uniLabel,
      field
    };
  }
  function removeDOCTYPE(html) {
    return html.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*>\n/, "").replace(/<!DOCTYPE.*>\n/, "");
  }
  function parseAttrs(attrs2) {
    return attrs2.reduce(function(pre, attr2) {
      var value = attr2.value;
      var name = attr2.name;
      if (value.match(/ /) && name !== "style") {
        value = value.split(" ");
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
      node: "root",
      children: []
    };
    HTMLParser(html, {
      start: function(tag, attrs2, unary) {
        var node = {
          name: tag
        };
        if (attrs2.length !== 0) {
          node.attrs = parseAttrs(attrs2);
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
      end: function(tag) {
        var node = stacks.shift();
        if (node.name !== tag)
          console.error("invalid state: mismatch end tag");
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
      chars: function(text2) {
        var node = {
          type: "text",
          text: text2
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
      comment: function(text2) {
        var node = {
          node: "comment",
          text: text2
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
  var TAGS = {
    a: "",
    abbr: "",
    b: "",
    blockquote: "",
    br: "",
    code: "",
    col: ["span", "width"],
    colgroup: ["span", "width"],
    dd: "",
    del: "",
    div: "",
    dl: "",
    dt: "",
    em: "",
    fieldset: "",
    h1: "",
    h2: "",
    h3: "",
    h4: "",
    h5: "",
    h6: "",
    hr: "",
    i: "",
    img: ["alt", "src", "height", "width"],
    ins: "",
    label: "",
    legend: "",
    li: "",
    ol: ["start", "type"],
    p: "",
    q: "",
    span: "",
    strong: "",
    sub: "",
    sup: "",
    table: ["width"],
    tbody: "",
    td: ["colspan", "rowspan", "height", "width"],
    tfoot: "",
    th: ["colspan", "rowspan", "height", "width"],
    thead: "",
    tr: "",
    ul: ""
  };
  var CHARS = {
    amp: "&",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
    apos: "'"
  };
  function decodeEntities(htmlString) {
    return htmlString.replace(/&(([a-zA-Z]+)|(#x{0,1}[\da-zA-Z]+));/gi, function(match, stage) {
      if (hasOwn$1(CHARS, stage) && CHARS[stage]) {
        return CHARS[stage];
      }
      if (/^#[0-9]{1,4}$/.test(stage)) {
        return String.fromCharCode(stage.slice(1));
      }
      if (/^#x[0-9a-f]{1,4}$/i.test(stage)) {
        return String.fromCharCode("0" + stage.slice(1));
      }
      var wrap = document.createElement("div");
      wrap.innerHTML = match;
      return wrap.innerText || wrap.textContent;
    });
  }
  function parseNodes(nodes, parentNode) {
    nodes.forEach(function(node) {
      if (!isPlainObject(node)) {
        return;
      }
      if (!hasOwn$1(node, "type") || node.type === "node") {
        if (!(typeof node.name === "string" && node.name)) {
          return;
        }
        var tagName = node.name.toLowerCase();
        if (!hasOwn$1(TAGS, tagName)) {
          return;
        }
        var elem = document.createElement(tagName);
        if (!elem) {
          return;
        }
        var attrs2 = node.attrs;
        if (isPlainObject(attrs2)) {
          var tagAttrs = TAGS[tagName] || [];
          Object.keys(attrs2).forEach(function(name) {
            var value = attrs2[name];
            switch (name) {
              case "class":
                Array.isArray(value) && (value = value.join(" "));
              case "style":
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
        if (node.type === "text" && typeof node.text === "string" && node.text !== "") {
          parentNode.appendChild(document.createTextNode(decodeEntities(node.text)));
        }
      }
    });
    return parentNode;
  }
  var props$b = {
    nodes: {
      type: [Array, String],
      default: function() {
        return [];
      }
    }
  };
  var RichText = /* @__PURE__ */ defineBuiltInComponent({
    name: "RichText",
    compatConfig: {
      MODE: 3
    },
    props: props$b,
    setup(props2) {
      var rootRef = ref(null);
      function _renderNodes(nodes) {
        if (typeof nodes === "string") {
          nodes = parseHtml(nodes);
        }
        var nodeList = parseNodes(nodes, document.createDocumentFragment());
        rootRef.value.firstElementChild.innerHTML = "";
        rootRef.value.firstElementChild.appendChild(nodeList);
      }
      watch(() => props2.nodes, (value) => {
        _renderNodes(value);
      });
      onMounted(() => {
        _renderNodes(props2.nodes);
      });
      return () => {
        return createVNode("uni-rich-text", {
          "ref": rootRef
        }, {
          default: () => [createVNode("div", null, null)]
        }, 512);
      };
    }
  });
  var passiveOptions = passive(true);
  var props$a = {
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
      default: ""
    },
    scrollWithAnimation: {
      type: [Boolean, String],
      default: false
    },
    enableBackToTop: {
      type: [Boolean, String],
      default: false
    },
    refresherEnabled: {
      type: [Boolean, String],
      default: false
    },
    refresherThreshold: {
      type: Number,
      default: 45
    },
    refresherDefaultStyle: {
      type: String,
      default: "back"
    },
    refresherBackground: {
      type: String,
      default: "#fff"
    },
    refresherTriggered: {
      type: [Boolean, String],
      default: false
    }
  };
  var ScrollView = /* @__PURE__ */ defineBuiltInComponent({
    name: "ScrollView",
    compatConfig: {
      MODE: 3
    },
    props: props$a,
    emits: ["scroll", "scrolltoupper", "scrolltolower", "refresherrefresh", "refresherrestore", "refresherpulling", "refresherabort", "update:refresherTriggered"],
    setup(props2, {
      emit: emit2,
      slots
    }) {
      var rootRef = ref(null);
      var main = ref(null);
      var wrap = ref(null);
      var content = ref(null);
      var refresherinner = ref(null);
      var trigger2 = useCustomEvent(rootRef, emit2);
      var {
        state,
        scrollTopNumber,
        scrollLeftNumber
      } = useScrollViewState(props2);
      useScrollViewLoader(props2, state, scrollTopNumber, scrollLeftNumber, trigger2, rootRef, main, content, emit2);
      var mainStyle = computed$1(() => {
        var style = "";
        props2.scrollX ? style += "overflow-x:auto;" : style += "overflow-x:hidden;";
        props2.scrollY ? style += "overflow-y:auto;" : style += "overflow-y:hidden;";
        return style;
      });
      return () => {
        var {
          refresherEnabled,
          refresherBackground,
          refresherDefaultStyle
        } = props2;
        var {
          refresherHeight,
          refreshState,
          refreshRotate
        } = state;
        return createVNode("uni-scroll-view", {
          "ref": rootRef
        }, {
          default: () => [createVNode("div", {
            "ref": wrap,
            "class": "uni-scroll-view"
          }, [createVNode("div", {
            "ref": main,
            "style": mainStyle.value,
            "class": "uni-scroll-view"
          }, [createVNode("div", {
            "ref": content,
            "class": "uni-scroll-view-content"
          }, [refresherEnabled ? createVNode("div", {
            "ref": refresherinner,
            "style": {
              backgroundColor: refresherBackground,
              height: refresherHeight + "px"
            },
            "class": "uni-scroll-view-refresher"
          }, [refresherDefaultStyle !== "none" ? createVNode("div", {
            "class": "uni-scroll-view-refresh"
          }, [createVNode("div", {
            "class": "uni-scroll-view-refresh-inner"
          }, [refreshState == "pulling" ? createVNode("svg", {
            "key": "refresh__icon",
            "style": {
              transform: "rotate(" + refreshRotate + "deg)"
            },
            "fill": "#2BD009",
            "class": "uni-scroll-view-refresh__icon",
            "width": "24",
            "height": "24",
            "viewBox": "0 0 24 24"
          }, [createVNode("path", {
            "d": "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
          }, null), createVNode("path", {
            "d": "M0 0h24v24H0z",
            "fill": "none"
          }, null)], 4) : null, refreshState == "refreshing" ? createVNode("svg", {
            "key": "refresh__spinner",
            "class": "uni-scroll-view-refresh__spinner",
            "width": "24",
            "height": "24",
            "viewBox": "25 25 50 50"
          }, [createVNode("circle", {
            "cx": "50",
            "cy": "50",
            "r": "20",
            "fill": "none",
            "style": "color: #2bd009",
            "stroke-width": "3"
          }, null)]) : null])]) : null, refresherDefaultStyle == "none" ? slots.refresher && slots.refresher() : null], 4) : null, slots.default && slots.default()], 512)], 4)], 512)]
        }, 512);
      };
    }
  });
  function useScrollViewState(props2) {
    var scrollTopNumber = computed$1(() => {
      return Number(props2.scrollTop) || 0;
    });
    var scrollLeftNumber = computed$1(() => {
      return Number(props2.scrollLeft) || 0;
    });
    var state = reactive({
      lastScrollTop: scrollTopNumber.value,
      lastScrollLeft: scrollLeftNumber.value,
      lastScrollToUpperTime: 0,
      lastScrollToLowerTime: 0,
      refresherHeight: 0,
      refreshRotate: 0,
      refreshState: ""
    });
    return {
      state,
      scrollTopNumber,
      scrollLeftNumber
    };
  }
  function useScrollViewLoader(props2, state, scrollTopNumber, scrollLeftNumber, trigger2, rootRef, main, content, emit2) {
    var _lastScrollTime = 0;
    var beforeRefreshing = false;
    var toUpperNumber = 0;
    var triggerAbort = false;
    var __transitionEnd = () => {
    };
    var upperThresholdNumber = computed$1(() => {
      var val = Number(props2.upperThreshold);
      return isNaN(val) ? 50 : val;
    });
    var lowerThresholdNumber = computed$1(() => {
      var val = Number(props2.lowerThreshold);
      return isNaN(val) ? 50 : val;
    });
    function scrollTo2(scrollToValue, direction2) {
      var container = main.value;
      var transformValue = 0;
      var transform = "";
      scrollToValue < 0 ? scrollToValue = 0 : direction2 === "x" && scrollToValue > container.scrollWidth - container.offsetWidth ? scrollToValue = container.scrollWidth - container.offsetWidth : direction2 === "y" && scrollToValue > container.scrollHeight - container.offsetHeight && (scrollToValue = container.scrollHeight - container.offsetHeight);
      direction2 === "x" ? transformValue = container.scrollLeft - scrollToValue : direction2 === "y" && (transformValue = container.scrollTop - scrollToValue);
      if (transformValue === 0)
        return;
      var _content = content.value;
      _content.style.transition = "transform .3s ease-out";
      _content.style.webkitTransition = "-webkit-transform .3s ease-out";
      if (direction2 === "x") {
        transform = "translateX(" + transformValue + "px) translateZ(0)";
      } else {
        direction2 === "y" && (transform = "translateY(" + transformValue + "px) translateZ(0)");
      }
      _content.removeEventListener("transitionend", __transitionEnd);
      _content.removeEventListener("webkitTransitionEnd", __transitionEnd);
      __transitionEnd = () => _transitionEnd(scrollToValue, direction2);
      _content.addEventListener("transitionend", __transitionEnd);
      _content.addEventListener("webkitTransitionEnd", __transitionEnd);
      if (direction2 === "x") {
        container.style.overflowX = "hidden";
      } else if (direction2 === "y") {
        container.style.overflowY = "hidden";
      }
      _content.style.transform = transform;
      _content.style.webkitTransform = transform;
    }
    function _handleScroll($event) {
      if ($event.timeStamp - _lastScrollTime > 20) {
        _lastScrollTime = $event.timeStamp;
        var target = $event.target;
        trigger2("scroll", $event, {
          scrollLeft: target.scrollLeft,
          scrollTop: target.scrollTop,
          scrollHeight: target.scrollHeight,
          scrollWidth: target.scrollWidth,
          deltaX: state.lastScrollLeft - target.scrollLeft,
          deltaY: state.lastScrollTop - target.scrollTop
        });
        if (props2.scrollY) {
          if (target.scrollTop <= upperThresholdNumber.value && state.lastScrollTop - target.scrollTop > 0 && $event.timeStamp - state.lastScrollToUpperTime > 200) {
            trigger2("scrolltoupper", $event, {
              direction: "top"
            });
            state.lastScrollToUpperTime = $event.timeStamp;
          }
          if (target.scrollTop + target.offsetHeight + lowerThresholdNumber.value >= target.scrollHeight && state.lastScrollTop - target.scrollTop < 0 && $event.timeStamp - state.lastScrollToLowerTime > 200) {
            trigger2("scrolltolower", $event, {
              direction: "bottom"
            });
            state.lastScrollToLowerTime = $event.timeStamp;
          }
        }
        if (props2.scrollX) {
          if (target.scrollLeft <= upperThresholdNumber.value && state.lastScrollLeft - target.scrollLeft > 0 && $event.timeStamp - state.lastScrollToUpperTime > 200) {
            trigger2("scrolltoupper", $event, {
              direction: "left"
            });
            state.lastScrollToUpperTime = $event.timeStamp;
          }
          if (target.scrollLeft + target.offsetWidth + lowerThresholdNumber.value >= target.scrollWidth && state.lastScrollLeft - target.scrollLeft < 0 && $event.timeStamp - state.lastScrollToLowerTime > 200) {
            trigger2("scrolltolower", $event, {
              direction: "right"
            });
            state.lastScrollToLowerTime = $event.timeStamp;
          }
        }
        state.lastScrollTop = target.scrollTop;
        state.lastScrollLeft = target.scrollLeft;
      }
    }
    function _scrollTopChanged(val) {
      if (props2.scrollY) {
        {
          if (props2.scrollWithAnimation) {
            scrollTo2(val, "y");
          } else {
            main.value.scrollTop = val;
          }
        }
      }
    }
    function _scrollLeftChanged(val) {
      if (props2.scrollX) {
        {
          if (props2.scrollWithAnimation) {
            scrollTo2(val, "x");
          } else {
            main.value.scrollLeft = val;
          }
        }
      }
    }
    function _scrollIntoViewChanged(val) {
      if (val) {
        if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(val)) {
          console.error("id error: scroll-into-view=".concat(val));
          return;
        }
        var element = rootRef.value.querySelector("#" + val);
        if (element) {
          var mainRect = main.value.getBoundingClientRect();
          var elRect = element.getBoundingClientRect();
          if (props2.scrollX) {
            var left = elRect.left - mainRect.left;
            var scrollLeft = main.value.scrollLeft;
            var x = scrollLeft + left;
            if (props2.scrollWithAnimation) {
              scrollTo2(x, "x");
            } else {
              main.value.scrollLeft = x;
            }
          }
          if (props2.scrollY) {
            var top = elRect.top - mainRect.top;
            var scrollTop = main.value.scrollTop;
            var y = scrollTop + top;
            if (props2.scrollWithAnimation) {
              scrollTo2(y, "y");
            } else {
              main.value.scrollTop = y;
            }
          }
        }
      }
    }
    function _transitionEnd(val, direction2) {
      content.value.style.transition = "";
      content.value.style.webkitTransition = "";
      content.value.style.transform = "";
      content.value.style.webkitTransform = "";
      var _main = main.value;
      if (direction2 === "x") {
        _main.style.overflowX = props2.scrollX ? "auto" : "hidden";
        _main.scrollLeft = val;
      } else if (direction2 === "y") {
        _main.style.overflowY = props2.scrollY ? "auto" : "hidden";
        _main.scrollTop = val;
      }
      content.value.removeEventListener("transitionend", __transitionEnd);
      content.value.removeEventListener("webkitTransitionEnd", __transitionEnd);
    }
    function _setRefreshState(_state) {
      switch (_state) {
        case "refreshing":
          state.refresherHeight = props2.refresherThreshold;
          if (!beforeRefreshing) {
            beforeRefreshing = true;
            trigger2("refresherrefresh", {}, {});
            emit2("update:refresherTriggered", true);
          }
          break;
        case "restore":
        case "refresherabort":
          beforeRefreshing = false;
          state.refresherHeight = toUpperNumber = 0;
          if (_state === "restore") {
            triggerAbort = false;
            trigger2("refresherrestore", {}, {});
          }
          if (_state === "refresherabort" && triggerAbort) {
            triggerAbort = false;
            trigger2("refresherabort", {}, {});
          }
          break;
      }
      state.refreshState = _state;
    }
    onMounted(() => {
      _scrollTopChanged(scrollTopNumber.value);
      _scrollLeftChanged(scrollLeftNumber.value);
      _scrollIntoViewChanged(props2.scrollIntoView);
      var __handleScroll = function(event) {
        event.stopPropagation();
        _handleScroll(event);
      };
      var touchStart = {
        x: 0,
        y: 0
      };
      var needStop = null;
      var __handleTouchMove = function(event) {
        var x = event.touches[0].pageX;
        var y = event.touches[0].pageY;
        var _main = main.value;
        if (Math.abs(x - touchStart.x) > Math.abs(y - touchStart.y)) {
          if (props2.scrollX) {
            if (_main.scrollLeft === 0 && x > touchStart.x) {
              needStop = false;
              return;
            } else if (_main.scrollWidth === _main.offsetWidth + _main.scrollLeft && x < touchStart.x) {
              needStop = false;
              return;
            }
            needStop = true;
          } else {
            needStop = false;
          }
        } else {
          if (props2.scrollY) {
            if (_main.scrollTop === 0 && y > touchStart.y) {
              needStop = false;
              if (props2.refresherEnabled && event.cancelable !== false)
                event.preventDefault();
            } else if (_main.scrollHeight === _main.offsetHeight + _main.scrollTop && y < touchStart.y) {
              needStop = false;
              return;
            } else {
              needStop = true;
            }
          } else {
            needStop = false;
          }
        }
        if (needStop) {
          event.stopPropagation();
        }
        if (_main.scrollTop === 0 && event.touches.length === 1) {
          state.refreshState = "pulling";
        }
        if (props2.refresherEnabled && state.refreshState === "pulling") {
          var dy = y - touchStart.y;
          if (toUpperNumber === 0) {
            toUpperNumber = y;
          }
          if (!beforeRefreshing) {
            state.refresherHeight = y - toUpperNumber;
            if (state.refresherHeight > 0) {
              triggerAbort = true;
              trigger2("refresherpulling", event, {
                deltaY: dy
              });
            }
          } else {
            state.refresherHeight = dy + props2.refresherThreshold;
            triggerAbort = false;
          }
          var route = state.refresherHeight / props2.refresherThreshold;
          state.refreshRotate = (route > 1 ? 1 : route) * 360;
        }
      };
      var __handleTouchStart = function(event) {
        if (event.touches.length === 1) {
          disableScrollBounce({
            disable: true
          });
          touchStart = {
            x: event.touches[0].pageX,
            y: event.touches[0].pageY
          };
        }
      };
      var __handleTouchEnd = function(event) {
        touchStart = {
          x: 0,
          y: 0
        };
        disableScrollBounce({
          disable: false
        });
        if (state.refresherHeight >= props2.refresherThreshold) {
          _setRefreshState("refreshing");
        } else {
          _setRefreshState("refresherabort");
        }
      };
      main.value.addEventListener("touchstart", __handleTouchStart, passiveOptions);
      main.value.addEventListener("touchmove", __handleTouchMove);
      main.value.addEventListener("scroll", __handleScroll, passiveOptions);
      main.value.addEventListener("touchend", __handleTouchEnd, passiveOptions);
      initScrollBounce();
      onBeforeUnmount(() => {
        main.value.removeEventListener("touchstart", __handleTouchStart);
        main.value.removeEventListener("touchmove", __handleTouchMove);
        main.value.removeEventListener("scroll", __handleScroll);
        main.value.removeEventListener("touchend", __handleTouchEnd);
      });
    });
    onActivated(() => {
      props2.scrollY && (main.value.scrollTop = state.lastScrollTop);
      props2.scrollX && (main.value.scrollLeft = state.lastScrollLeft);
    });
    watch(scrollTopNumber, (val) => {
      _scrollTopChanged(val);
    });
    watch(scrollLeftNumber, (val) => {
      _scrollLeftChanged(val);
    });
    watch(() => props2.scrollIntoView, (val) => {
      _scrollIntoViewChanged(val);
    });
    watch(() => props2.refresherTriggered, (val) => {
      if (val === true) {
        _setRefreshState("refreshing");
      } else if (val === false) {
        _setRefreshState("restore");
      }
    });
  }
  var props$9 = {
    name: {
      type: String,
      default: ""
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
      default: "#e9e9e9"
    },
    backgroundColor: {
      type: String,
      default: "#e9e9e9"
    },
    activeColor: {
      type: String,
      default: "#007aff"
    },
    selectedColor: {
      type: String,
      default: "#007aff"
    },
    blockColor: {
      type: String,
      default: "#ffffff"
    },
    blockSize: {
      type: [Number, String],
      default: 28
    },
    showValue: {
      type: [Boolean, String],
      default: false
    }
  };
  var Slider = /* @__PURE__ */ defineBuiltInComponent({
    name: "Slider",
    props: props$9,
    emits: ["changing", "change"],
    setup(props2, {
      emit: emit2
    }) {
      var sliderRef = ref(null);
      var sliderValueRef = ref(null);
      var sliderHandleRef = ref(null);
      var sliderValue = ref(Number(props2.value));
      watch(() => props2.value, (val) => {
        sliderValue.value = Number(val);
      });
      var trigger2 = useCustomEvent(sliderRef, emit2);
      var state = useSliderState(props2, sliderValue);
      var {
        _onClick,
        _onTrack
      } = useSliderLoader(props2, sliderValue, sliderRef, sliderValueRef, trigger2);
      onMounted(() => {
        useTouchtrack(sliderHandleRef.value, _onTrack);
      });
      return () => {
        var {
          setBgColor,
          setBlockBg,
          setActiveColor,
          setBlockStyle
        } = state;
        return createVNode("uni-slider", {
          "ref": sliderRef,
          "onClick": withWebEvent(_onClick)
        }, {
          default: () => [createVNode("div", {
            "class": "uni-slider-wrapper"
          }, [createVNode("div", {
            "class": "uni-slider-tap-area"
          }, [createVNode("div", {
            "style": setBgColor.value,
            "class": "uni-slider-handle-wrapper"
          }, [createVNode("div", {
            "ref": sliderHandleRef,
            "style": setBlockBg.value,
            "class": "uni-slider-handle"
          }, null, 4), createVNode("div", {
            "style": setBlockStyle.value,
            "class": "uni-slider-thumb"
          }, null, 4), createVNode("div", {
            "style": setActiveColor.value,
            "class": "uni-slider-track"
          }, null, 4)], 4)]), withDirectives(createVNode("span", {
            "ref": sliderValueRef,
            "class": "uni-slider-value"
          }, [sliderValue.value], 512), [[vShow, props2.showValue]])]), createVNode("slot", null, null)],
          _: 1
        }, 8, ["onClick"]);
      };
    }
  });
  function useSliderState(props2, sliderValue) {
    var _getValueWidth = () => {
      var max2 = Number(props2.max);
      var min2 = Number(props2.min);
      return 100 * (sliderValue.value - min2) / (max2 - min2) + "%";
    };
    var _getBgColor = () => {
      return props2.backgroundColor !== "#e9e9e9" ? props2.backgroundColor : props2.color !== "#007aff" ? props2.color : "#007aff";
    };
    var _getActiveColor = () => {
      return props2.activeColor !== "#007aff" ? props2.activeColor : props2.selectedColor !== "#e9e9e9" ? props2.selectedColor : "#e9e9e9";
    };
    var state = {
      setBgColor: computed$1(() => ({
        backgroundColor: _getBgColor()
      })),
      setBlockBg: computed$1(() => ({
        left: _getValueWidth()
      })),
      setActiveColor: computed$1(() => ({
        backgroundColor: _getActiveColor(),
        width: _getValueWidth()
      })),
      setBlockStyle: computed$1(() => ({
        width: props2.blockSize + "px",
        height: props2.blockSize + "px",
        marginLeft: -props2.blockSize / 2 + "px",
        marginTop: -props2.blockSize / 2 + "px",
        left: _getValueWidth(),
        backgroundColor: props2.blockColor
      }))
    };
    return state;
  }
  function useSliderLoader(props2, sliderValue, sliderRef, sliderValueRef, trigger2) {
    var _onClick = ($event) => {
      if (props2.disabled) {
        return;
      }
      _onUserChangedValue($event);
      trigger2("change", $event, {
        value: sliderValue.value
      });
    };
    var _filterValue = (e2) => {
      var max2 = Number(props2.max);
      var min2 = Number(props2.min);
      var step2 = Number(props2.step);
      return e2 < min2 ? min2 : e2 > max2 ? max2 : computeController.mul.call(Math.round((e2 - min2) / step2), step2) + min2;
    };
    var _onUserChangedValue = (e2) => {
      var max2 = Number(props2.max);
      var min2 = Number(props2.min);
      var sliderRightBox = sliderValueRef.value;
      var sliderRightBoxLeft = getComputedStyle(sliderRightBox, null).marginLeft;
      var sliderRightBoxWidth = sliderRightBox.offsetWidth;
      sliderRightBoxWidth = sliderRightBoxWidth + parseInt(sliderRightBoxLeft);
      var slider2 = sliderRef.value;
      var offsetWidth = slider2.offsetWidth - (props2.showValue ? sliderRightBoxWidth : 0);
      var boxLeft = slider2.getBoundingClientRect().left;
      var value = (e2.x - boxLeft) * (max2 - min2) / offsetWidth + min2;
      sliderValue.value = _filterValue(value);
    };
    var _onTrack = (e2) => {
      if (!props2.disabled) {
        return e2.detail.state === "move" ? (_onUserChangedValue({
          x: e2.detail.x
        }), trigger2("changing", e2, {
          value: sliderValue.value
        }), false) : e2.detail.state === "end" && trigger2("change", e2, {
          value: sliderValue.value
        });
      }
    };
    var uniForm = inject(uniFormKey, false);
    if (!!uniForm) {
      var field = {
        reset: () => sliderValue.value = Number(props2.min),
        submit: () => {
          var data = ["", null];
          if (props2.name !== "") {
            data[0] = props2.name;
            data[1] = sliderValue.value;
          }
          return data;
        }
      };
      uniForm.addField(field);
      onBeforeUnmount(() => {
        uniForm.removeField(field);
      });
    }
    return {
      _onClick,
      _onTrack
    };
  }
  var computeController = {
    mul: function(arg) {
      var m = 0;
      var s1 = this.toString();
      var s2 = arg.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e2) {
      }
      try {
        m += s2.split(".")[1].length;
      } catch (e2) {
      }
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    }
  };
  var props$8 = {
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
      default: ""
    },
    indicatorActiveColor: {
      type: String,
      default: ""
    },
    previousMargin: {
      type: String,
      default: ""
    },
    nextMargin: {
      type: String,
      default: ""
    },
    currentItemId: {
      type: String,
      default: ""
    },
    skipHiddenItemLayout: {
      type: [Boolean, String],
      default: false
    },
    displayMultipleItems: {
      type: [Number, String],
      default: 1
    },
    disableTouch: {
      type: [Boolean, String],
      default: false
    }
  };
  function useState(props2) {
    var interval = computed$1(() => {
      var interval2 = Number(props2.interval);
      return isNaN(interval2) ? 5e3 : interval2;
    });
    var duration = computed$1(() => {
      var duration2 = Number(props2.duration);
      return isNaN(duration2) ? 500 : duration2;
    });
    var displayMultipleItems = computed$1(() => {
      var displayMultipleItems2 = Math.round(props2.displayMultipleItems);
      return isNaN(displayMultipleItems2) ? 1 : displayMultipleItems2;
    });
    var state = reactive({
      interval,
      duration,
      displayMultipleItems,
      current: Math.round(props2.current) || 0,
      currentItemId: props2.currentItemId,
      userTracking: false
    });
    return state;
  }
  function useLayout(props2, state, swiperContexts, slideFrameRef, emit2, trigger2) {
    function cancelSchedule() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }
    var timer = null;
    var invalid = true;
    var viewportPosition = 0;
    var viewportMoveRatio = 1;
    var animating = null;
    var requestedAnimation = false;
    var contentTrackViewport = 0;
    var transitionStart;
    var currentChangeSource = "";
    var animationFrame;
    var circularEnabled = computed$1(() => props2.circular && swiperContexts.value.length > state.displayMultipleItems);
    function checkCircularLayout(index2) {
      if (!invalid) {
        for (var items = swiperContexts.value, n = items.length, i2 = index2 + state.displayMultipleItems, r = 0; r < n; r++) {
          var item = items[r];
          var s = Math.floor(index2 / n) * n + r;
          var l = s + n;
          var c = s - n;
          var u = Math.max(index2 - (s + 1), s - i2, 0);
          var d = Math.max(index2 - (l + 1), l - i2, 0);
          var h2 = Math.max(index2 - (c + 1), c - i2, 0);
          var p2 = Math.min(u, d, h2);
          var position = [s, l, c][[u, d, h2].indexOf(p2)];
          item.updatePosition(position, props2.vertical);
        }
      }
    }
    function updateViewport(index2) {
      if (!(Math.floor(2 * viewportPosition) === Math.floor(2 * index2) && Math.ceil(2 * viewportPosition) === Math.ceil(2 * index2))) {
        if (circularEnabled.value) {
          checkCircularLayout(index2);
        }
      }
      var x = props2.vertical ? "0" : 100 * -index2 * viewportMoveRatio + "%";
      var y = props2.vertical ? 100 * -index2 * viewportMoveRatio + "%" : "0";
      var transform = "translate(" + x + ", " + y + ") translateZ(0)";
      var slideFrame = slideFrameRef.value;
      if (slideFrame) {
        slideFrame.style.webkitTransform = transform;
        slideFrame.style.transform = transform;
      }
      viewportPosition = index2;
      if (!transitionStart) {
        if (index2 % 1 === 0) {
          return;
        }
        transitionStart = index2;
      }
      index2 -= Math.floor(transitionStart);
      var items = swiperContexts.value;
      if (index2 <= -(items.length - 1)) {
        index2 += items.length;
      } else if (index2 >= items.length) {
        index2 -= items.length;
      }
      index2 = transitionStart % 1 > 0.5 || transitionStart < 0 ? index2 - 1 : index2;
      trigger2("transition", {}, {
        dx: props2.vertical ? 0 : index2 * slideFrame.offsetWidth,
        dy: props2.vertical ? index2 * slideFrame.offsetHeight : 0
      });
    }
    function endViewportAnimation() {
      if (animating) {
        updateViewport(animating.toPos);
        animating = null;
      }
    }
    function normalizeCurrentValue(current) {
      var length = swiperContexts.value.length;
      if (!length) {
        return -1;
      }
      var index2 = (Math.round(current) % length + length) % length;
      if (circularEnabled.value) {
        if (length <= state.displayMultipleItems) {
          return 0;
        }
      } else if (index2 > length - state.displayMultipleItems) {
        return length - state.displayMultipleItems;
      }
      return index2;
    }
    function cancelViewportAnimation() {
      animating = null;
    }
    function animateFrameFuncProto() {
      if (!animating) {
        requestedAnimation = false;
        return;
      }
      var _animating = animating;
      var toPos = _animating.toPos;
      var acc = _animating.acc;
      var endTime = _animating.endTime;
      var source = _animating.source;
      var time = endTime - Date.now();
      if (time <= 0) {
        updateViewport(toPos);
        animating = null;
        requestedAnimation = false;
        transitionStart = null;
        var item = swiperContexts.value[state.current];
        if (item) {
          var currentItemId = item.getItemId();
          trigger2("animationfinish", {}, {
            current: state.current,
            currentItemId,
            source
          });
        }
        return;
      }
      var s = acc * time * time / 2;
      var l = toPos + s;
      updateViewport(l);
      animationFrame = requestAnimationFrame(animateFrameFuncProto);
    }
    function animateViewport(current, source, n) {
      cancelViewportAnimation();
      var duration = state.duration;
      var length = swiperContexts.value.length;
      var position = viewportPosition;
      if (circularEnabled.value) {
        if (n < 0) {
          for (; position < current; ) {
            position += length;
          }
          for (; position - length > current; ) {
            position -= length;
          }
        } else if (n > 0) {
          for (; position > current; ) {
            position -= length;
          }
          for (; position + length < current; ) {
            position += length;
          }
        } else {
          for (; position + length < current; ) {
            position += length;
          }
          for (; position - length > current; ) {
            position -= length;
          }
          if (position + length - current < current - position) {
            position += length;
          }
        }
      }
      animating = {
        toPos: current,
        acc: 2 * (position - current) / (duration * duration),
        endTime: Date.now() + duration,
        source
      };
      if (!requestedAnimation) {
        requestedAnimation = true;
        animationFrame = requestAnimationFrame(animateFrameFuncProto);
      }
    }
    function scheduleAutoplay() {
      cancelSchedule();
      var items = swiperContexts.value;
      var callback = function() {
        timer = null;
        currentChangeSource = "autoplay";
        if (circularEnabled.value) {
          state.current = normalizeCurrentValue(state.current + 1);
        } else {
          state.current = state.current + state.displayMultipleItems < items.length ? state.current + 1 : 0;
        }
        animateViewport(state.current, "autoplay", circularEnabled.value ? 1 : 0);
        timer = setTimeout(callback, state.interval);
      };
      if (!(invalid || items.length <= state.displayMultipleItems)) {
        timer = setTimeout(callback, state.interval);
      }
    }
    function resetLayout() {
      cancelSchedule();
      endViewportAnimation();
      var items = swiperContexts.value;
      for (var i2 = 0; i2 < items.length; i2++) {
        items[i2].updatePosition(i2, props2.vertical);
      }
      viewportMoveRatio = 1;
      var slideFrameEl = slideFrameRef.value;
      if (state.displayMultipleItems === 1 && items.length) {
        var itemRect = items[0].getBoundingClientRect();
        var slideFrameRect = slideFrameEl.getBoundingClientRect();
        viewportMoveRatio = itemRect.width / slideFrameRect.width;
        if (!(viewportMoveRatio > 0 && viewportMoveRatio < 1)) {
          viewportMoveRatio = 1;
        }
      }
      var position = viewportPosition;
      viewportPosition = -2;
      var current = state.current;
      if (current >= 0) {
        invalid = false;
        if (state.userTracking) {
          updateViewport(position + current - contentTrackViewport);
          contentTrackViewport = current;
        } else {
          updateViewport(current);
          if (props2.autoplay) {
            scheduleAutoplay();
          }
        }
      } else {
        invalid = true;
        updateViewport(-state.displayMultipleItems - 1);
      }
    }
    watch([() => props2.current, () => props2.currentItemId, () => [...swiperContexts.value]], () => {
      var current = -1;
      if (props2.currentItemId) {
        for (var i2 = 0, items = swiperContexts.value; i2 < items.length; i2++) {
          var itemId = items[i2].getItemId();
          if (itemId === props2.currentItemId) {
            current = i2;
            break;
          }
        }
      }
      if (current < 0) {
        current = Math.round(props2.current) || 0;
      }
      current = current < 0 ? 0 : current;
      if (state.current !== current) {
        currentChangeSource = "";
        state.current = current;
      }
    });
    watch([() => props2.vertical, () => circularEnabled.value, () => state.displayMultipleItems, () => [...swiperContexts.value]], resetLayout);
    watch(() => state.interval, () => {
      if (timer) {
        cancelSchedule();
        scheduleAutoplay();
      }
    });
    function currentChanged(current, history) {
      var source = currentChangeSource;
      currentChangeSource = "";
      var items = swiperContexts.value;
      if (!source) {
        var length = items.length;
        animateViewport(current, "", circularEnabled.value && history + (length - current) % length > length / 2 ? 1 : 0);
      }
      var item = items[current];
      if (item) {
        var currentItemId = state.currentItemId = item.getItemId();
        trigger2("change", {}, {
          current: state.current,
          currentItemId,
          source
        });
      }
    }
    watch(() => state.current, (val, oldVal) => {
      currentChanged(val, oldVal);
      emit2("update:current", val);
    });
    watch(() => state.currentItemId, (val) => {
      emit2("update:currentItemId", val);
    });
    function inintAutoplay(enable) {
      if (enable) {
        scheduleAutoplay();
      } else {
        cancelSchedule();
      }
    }
    watch(() => props2.autoplay && !state.userTracking, inintAutoplay);
    inintAutoplay(props2.autoplay && !state.userTracking);
    onMounted(() => {
      var userDirectionChecked = false;
      var contentTrackSpeed = 0;
      var contentTrackT = 0;
      function handleTrackStart() {
        cancelSchedule();
        contentTrackViewport = viewportPosition;
        contentTrackSpeed = 0;
        contentTrackT = Date.now();
        cancelViewportAnimation();
      }
      function handleTrackMove(data) {
        var oldContentTrackT = contentTrackT;
        contentTrackT = Date.now();
        var length = swiperContexts.value.length;
        var other = length - state.displayMultipleItems;
        function calc2(val) {
          return 0.5 - 0.25 / (val + 0.5);
        }
        function move(oldVal, newVal) {
          var val = contentTrackViewport + oldVal;
          contentTrackSpeed = 0.6 * contentTrackSpeed + 0.4 * newVal;
          if (!circularEnabled.value) {
            if (val < 0 || val > other) {
              if (val < 0) {
                val = -calc2(-val);
              } else {
                if (val > other) {
                  val = other + calc2(val - other);
                }
              }
              contentTrackSpeed = 0;
            }
          }
          updateViewport(val);
        }
        var time = contentTrackT - oldContentTrackT || 1;
        var slideFrameEl = slideFrameRef.value;
        if (props2.vertical) {
          move(-data.dy / slideFrameEl.offsetHeight, -data.ddy / time);
        } else {
          move(-data.dx / slideFrameEl.offsetWidth, -data.ddx / time);
        }
      }
      function handleTrackEnd(isCancel) {
        state.userTracking = false;
        var t2 = contentTrackSpeed / Math.abs(contentTrackSpeed);
        var n = 0;
        if (!isCancel && Math.abs(contentTrackSpeed) > 0.2) {
          n = 0.5 * t2;
        }
        var current = normalizeCurrentValue(viewportPosition + n);
        if (isCancel) {
          updateViewport(contentTrackViewport);
        } else {
          currentChangeSource = "touch";
          state.current = current;
          animateViewport(current, "touch", n !== 0 ? n : current === 0 && circularEnabled.value && viewportPosition >= 1 ? 1 : 0);
        }
      }
      useTouchtrack(slideFrameRef.value, (event) => {
        if (props2.disableTouch) {
          return;
        }
        if (!invalid) {
          if (event.detail.state === "start") {
            state.userTracking = true;
            userDirectionChecked = false;
            return handleTrackStart();
          }
          if (event.detail.state === "end") {
            return handleTrackEnd(false);
          }
          if (event.detail.state === "cancel") {
            return handleTrackEnd(true);
          }
          if (state.userTracking) {
            if (!userDirectionChecked) {
              userDirectionChecked = true;
              var t2 = Math.abs(event.detail.dx);
              var n = Math.abs(event.detail.dy);
              if (t2 >= n && props2.vertical) {
                state.userTracking = false;
              } else {
                if (t2 <= n && !props2.vertical) {
                  state.userTracking = false;
                }
              }
              if (!state.userTracking) {
                if (props2.autoplay) {
                  scheduleAutoplay();
                }
                return;
              }
            }
            handleTrackMove(event.detail);
            return false;
          }
        }
      });
    });
    onUnmounted(() => {
      cancelSchedule();
      cancelAnimationFrame(animationFrame);
    });
    function onSwiperDotClick(index2) {
      animateViewport(state.current = index2, currentChangeSource = "click", circularEnabled.value ? 1 : 0);
    }
    return {
      onSwiperDotClick
    };
  }
  var Swiper = /* @__PURE__ */ defineBuiltInComponent({
    name: "Swiper",
    props: props$8,
    emits: ["change", "transition", "animationfinish", "update:current", "update:currentItemId"],
    setup(props2, {
      slots,
      emit: emit2
    }) {
      var rootRef = ref(null);
      var trigger2 = useCustomEvent(rootRef, emit2);
      var slidesWrapperRef = ref(null);
      var slideFrameRef = ref(null);
      var state = useState(props2);
      var slidesStyle = computed$1(() => {
        var style = {};
        if (props2.nextMargin || props2.previousMargin) {
          style = props2.vertical ? {
            left: 0,
            right: 0,
            top: rpx2px$1(props2.previousMargin, true),
            bottom: rpx2px$1(props2.nextMargin, true)
          } : {
            top: 0,
            bottom: 0,
            left: rpx2px$1(props2.previousMargin, true),
            right: rpx2px$1(props2.nextMargin, true)
          };
        }
        return style;
      });
      var slideFrameStyle = computed$1(() => {
        var value = Math.abs(100 / state.displayMultipleItems) + "%";
        return {
          width: props2.vertical ? "100%" : value,
          height: !props2.vertical ? "100%" : value
        };
      });
      var swiperItems = [];
      var originSwiperContexts = [];
      var swiperContexts = ref([]);
      function updateSwiperContexts() {
        var contexts = [];
        var _loop = function(index3) {
          var swiperItem2 = swiperItems[index3];
          if (!(swiperItem2 instanceof Element)) {
            swiperItem2 = swiperItem2.el;
          }
          var swiperContext = originSwiperContexts.find((context) => swiperItem2 === context.rootRef.value);
          if (swiperContext) {
            contexts.push(markRaw(swiperContext));
          }
        };
        for (var index2 = 0; index2 < swiperItems.length; index2++) {
          _loop(index2);
        }
        swiperContexts.value = contexts;
      }
      {
        useRebuild(() => {
          swiperItems = slideFrameRef.value.children;
          updateSwiperContexts();
        });
      }
      var addSwiperContext = function(swiperContext) {
        originSwiperContexts.push(swiperContext);
        updateSwiperContexts();
      };
      provide("addSwiperContext", addSwiperContext);
      var removeSwiperContext = function(swiperContext) {
        var index2 = originSwiperContexts.indexOf(swiperContext);
        if (index2 >= 0) {
          originSwiperContexts.splice(index2, 1);
          updateSwiperContexts();
        }
      };
      provide("removeSwiperContext", removeSwiperContext);
      var {
        onSwiperDotClick
      } = useLayout(props2, state, swiperContexts, slideFrameRef, emit2, trigger2);
      return () => {
        var defaultSlots = slots.default && slots.default();
        swiperItems = flatVNode(defaultSlots);
        return createVNode("uni-swiper", {
          "ref": rootRef
        }, {
          default: () => [createVNode("div", {
            "ref": slidesWrapperRef,
            "class": "uni-swiper-wrapper"
          }, [createVNode("div", {
            "class": "uni-swiper-slides",
            "style": slidesStyle.value
          }, [createVNode("div", {
            "ref": slideFrameRef,
            "class": "uni-swiper-slide-frame",
            "style": slideFrameStyle.value
          }, [defaultSlots], 4)], 4), props2.indicatorDots && createVNode("div", {
            "class": ["uni-swiper-dots", props2.vertical ? "uni-swiper-dots-vertical" : "uni-swiper-dots-horizontal"]
          }, [swiperContexts.value.map((_, index2, array) => createVNode("div", {
            "onClick": () => onSwiperDotClick(index2),
            "class": {
              "uni-swiper-dot": true,
              "uni-swiper-dot-active": index2 < state.current + state.displayMultipleItems && index2 >= state.current || index2 < state.current + state.displayMultipleItems - array.length
            },
            "style": {
              background: index2 === state.current ? props2.indicatorActiveColor : props2.indicatorColor
            }
          }, null, 14, ["onClick"]))], 2)], 512)]
        }, 512);
      };
    }
  });
  var props$7 = {
    itemId: {
      type: String,
      default: ""
    }
  };
  var SwiperItem = /* @__PURE__ */ defineBuiltInComponent({
    name: "SwiperItem",
    props: props$7,
    setup(props2, {
      slots
    }) {
      var rootRef = ref(null);
      var context = {
        rootRef,
        getItemId() {
          return props2.itemId;
        },
        getBoundingClientRect() {
          var el = rootRef.value;
          return el.getBoundingClientRect();
        },
        updatePosition(position, vertical) {
          var x = vertical ? "0" : 100 * position + "%";
          var y = vertical ? 100 * position + "%" : "0";
          var rootEl = rootRef.value;
          var value = "translate(".concat(x, ",").concat(y, ") translateZ(0)");
          if (rootEl) {
            rootEl.style.webkitTransform = value;
            rootEl.style.transform = value;
          }
        }
      };
      onMounted(() => {
        var addSwiperContext = inject("addSwiperContext");
        if (addSwiperContext) {
          addSwiperContext(context);
        }
      });
      onUnmounted(() => {
        var removeSwiperContext = inject("removeSwiperContext");
        if (removeSwiperContext) {
          removeSwiperContext(context);
        }
      });
      return () => {
        return createVNode("uni-swiper-item", {
          "ref": rootRef,
          "style": {
            position: "absolute",
            width: "100%",
            height: "100%"
          }
        }, {
          default: () => [slots.default && slots.default()]
        }, 512);
      };
    }
  });
  var props$6 = {
    name: {
      type: String,
      default: ""
    },
    checked: {
      type: [Boolean, String],
      default: false
    },
    type: {
      type: String,
      default: "switch"
    },
    id: {
      type: String,
      default: ""
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: "#007aff"
    }
  };
  var Switch = /* @__PURE__ */ defineBuiltInComponent({
    name: "Switch",
    props: props$6,
    emits: ["change"],
    setup(props2, {
      emit: emit2
    }) {
      var rootRef = ref(null);
      var switchChecked = ref(props2.checked);
      var uniLabel = useSwitchInject(props2, switchChecked);
      var trigger2 = useCustomEvent(rootRef, emit2);
      watch(() => props2.checked, (val) => {
        switchChecked.value = val;
      });
      var _onClick = ($event) => {
        if (props2.disabled) {
          return;
        }
        switchChecked.value = !switchChecked.value;
        trigger2("change", $event, {
          value: switchChecked.value
        });
      };
      if (!!uniLabel) {
        uniLabel.addHandler(_onClick);
        onBeforeUnmount(() => {
          uniLabel.removeHandler(_onClick);
        });
      }
      useListeners$1(props2, {
        "label-click": _onClick
      });
      return () => {
        var {
          color,
          type
        } = props2;
        var {
          booleanAttrs
        } = useBooleanAttr(props2, "disabled");
        return createVNode("uni-switch", mergeProps({
          "ref": rootRef
        }, booleanAttrs, {
          "onClick": _onClick
        }), {
          default: () => [createVNode("div", {
            "class": "uni-switch-wrapper"
          }, [withDirectives(createVNode("div", {
            "class": ["uni-switch-input", [switchChecked.value ? "uni-switch-input-checked" : ""]],
            "style": {
              backgroundColor: switchChecked.value ? color : "#DFDFDF",
              borderColor: switchChecked.value ? color : "#DFDFDF"
            }
          }, null, 6), [[vShow, type === "switch"]]), withDirectives(createVNode("div", {
            "class": "uni-checkbox-input"
          }, [switchChecked.value ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props2.color, 22) : ""], 512), [[vShow, type === "checkbox"]])])]
        }, 16, ["onClick"]);
      };
    }
  });
  function useSwitchInject(props2, switchChecked) {
    var uniForm = inject(uniFormKey, false);
    var uniLabel = inject(uniLabelKey, false);
    var formField = {
      submit: () => {
        var data = ["", null];
        if (props2.name) {
          data[0] = props2.name;
          data[1] = switchChecked.value;
        }
        return data;
      },
      reset: () => {
        switchChecked.value = false;
      }
    };
    if (!!uniForm) {
      uniForm.addField(formField);
      onUnmounted(() => {
        uniForm.removeField(formField);
      });
    }
    return uniLabel;
  }
  var SPACE_UNICODE = {
    ensp: "\u2002",
    emsp: "\u2003",
    nbsp: "\xA0"
  };
  function parseText(text2, options) {
    return text2.replace(/\\n/g, "\n").split("\n").map((text22) => {
      return normalizeText(text22, options);
    });
  }
  function normalizeText(text2, {
    space,
    decode
  }) {
    if (!text2) {
      return text2;
    }
    if (space && SPACE_UNICODE[space]) {
      text2 = text2.replace(/ /g, SPACE_UNICODE[space]);
    }
    if (!decode) {
      return text2;
    }
    return text2.replace(/&nbsp;/g, SPACE_UNICODE.nbsp).replace(/&ensp;/g, SPACE_UNICODE.ensp).replace(/&emsp;/g, SPACE_UNICODE.emsp).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
  }
  var props$5 = /* @__PURE__ */ extend({}, props$k, {
    placeholderClass: {
      type: String,
      default: "input-placeholder"
    },
    autoHeight: {
      type: [Boolean, String],
      default: false
    },
    confirmType: {
      type: String,
      default: ""
    }
  });
  var fixMargin = false;
  function setFixMargin() {
    var DARK_TEST_STRING = "(prefers-color-scheme: dark)";
    fixMargin = String(navigator.platform).indexOf("iP") === 0 && String(navigator.vendor).indexOf("Apple") === 0 && window.matchMedia(DARK_TEST_STRING).media !== DARK_TEST_STRING;
  }
  var Textarea = /* @__PURE__ */ defineBuiltInComponent({
    name: "Textarea",
    props: props$5,
    emit: ["confirm", "linechange", ...emit],
    setup(props2, {
      emit: emit2
    }) {
      var rootRef = ref(null);
      var {
        fieldRef,
        state,
        scopedAttrsState,
        fixDisabledColor,
        trigger: trigger2
      } = useField(props2, rootRef, emit2);
      var valueCompute = computed$1(() => state.value.split("\n"));
      var isDone = computed$1(() => ["done", "go", "next", "search", "send"].includes(props2.confirmType));
      var heightRef = ref(0);
      var lineRef = ref(null);
      watch(() => heightRef.value, (height) => {
        var el = rootRef.value;
        var lineEl = lineRef.value;
        var lineHeight = parseFloat(getComputedStyle(el).lineHeight);
        if (isNaN(lineHeight)) {
          lineHeight = lineEl.offsetHeight;
        }
        var lineCount = Math.round(height / lineHeight);
        trigger2("linechange", {}, {
          height,
          heightRpx: 750 / window.innerWidth * height,
          lineCount
        });
        if (props2.autoHeight) {
          el.style.height = height + "px";
        }
      });
      function onResize({
        height
      }) {
        heightRef.value = height;
      }
      function confirm(event) {
        trigger2("confirm", event, {
          value: state.value
        });
      }
      function onKeyDownEnter(event) {
        if (event.key !== "Enter") {
          return;
        }
        if (isDone.value) {
          event.preventDefault();
        }
      }
      function onKeyUpEnter(event) {
        if (event.key !== "Enter") {
          return;
        }
        if (isDone.value) {
          confirm(event);
          var textarea2 = event.target;
          textarea2.blur();
        }
      }
      {
        setFixMargin();
      }
      return () => {
        var textareaNode = props2.disabled && fixDisabledColor ? createVNode("textarea", {
          "ref": fieldRef,
          "value": state.value,
          "tabindex": "-1",
          "readonly": !!props2.disabled,
          "maxlength": state.maxlength,
          "class": {
            "uni-textarea-textarea": true,
            "uni-textarea-textarea-fix-margin": fixMargin
          },
          "style": {
            overflowY: props2.autoHeight ? "hidden" : "auto"
          },
          "onFocus": (event) => event.target.blur()
        }, null, 46, ["value", "readonly", "maxlength", "onFocus"]) : createVNode("textarea", {
          "ref": fieldRef,
          "value": state.value,
          "disabled": !!props2.disabled,
          "maxlength": state.maxlength,
          "enterkeyhint": props2.confirmType,
          "class": {
            "uni-textarea-textarea": true,
            "uni-textarea-textarea-fix-margin": fixMargin
          },
          "style": {
            overflowY: props2.autoHeight ? "hidden" : "auto"
          },
          "onKeydown": onKeyDownEnter,
          "onKeyup": onKeyUpEnter
        }, null, 46, ["value", "disabled", "maxlength", "enterkeyhint", "onKeydown", "onKeyup"]);
        return createVNode("uni-textarea", {
          "ref": rootRef
        }, {
          default: () => [createVNode("div", {
            "class": "uni-textarea-wrapper"
          }, [withDirectives(createVNode("div", mergeProps(scopedAttrsState.attrs, {
            "style": props2.placeholderStyle,
            "class": ["uni-textarea-placeholder", props2.placeholderClass]
          }), [props2.placeholder], 16), [[vShow, !state.value.length]]), createVNode("div", {
            "ref": lineRef,
            "class": "uni-textarea-line"
          }, [" "], 512), createVNode("div", {
            "class": "uni-textarea-compute"
          }, [valueCompute.value.map((item) => createVNode("div", null, [item.trim() ? item : "."])), createVNode(ResizeSensor, {
            "initial": true,
            "onResize": onResize
          }, null, 8, ["initial", "onResize"])]), props2.confirmType === "search" ? createVNode("form", {
            "action": "",
            "onSubmit": () => false,
            "class": "uni-input-form"
          }, [textareaNode], 40, ["onSubmit"]) : textareaNode])]
        }, 512);
      };
    }
  });
  /* @__PURE__ */ defineBuiltInComponent({
    name: "View",
    props: extend({}, hoverProps),
    setup(props2, {
      slots
    }) {
      var {
        hovering,
        binding
      } = useHover(props2);
      return () => {
        var hoverClass = props2.hoverClass;
        if (hoverClass && hoverClass !== "none") {
          return createVNode("uni-view", mergeProps({
            "class": hovering.value ? hoverClass : ""
          }, binding), {
            default: () => [slots.default && slots.default()]
          }, 16, ["class"]);
        }
        return createVNode("uni-view", null, {
          default: () => [slots.default && slots.default()]
        });
      };
    }
  });
  function normalizeEvent(vm, id2) {
    if (!id2) {
      id2 = vm.id;
    }
    if (!id2) {
      return;
    }
    return vm.$options.name.toLowerCase() + "." + id2;
  }
  function addSubscribe(name, callback, pageId) {
    if (!name) {
      return;
    }
    registerViewMethod(pageId || getCurrentPageId(), name, ({
      type,
      data
    }, resolve) => {
      callback(type, data, resolve);
    });
  }
  function removeSubscribe(name) {
    if (!name) {
      return;
    }
    unregisterViewMethod(getCurrentPageId(), name);
  }
  function useSubscribe(callback, name, multiple, pageId) {
    var instance = getCurrentInstance();
    var vm = instance.proxy;
    onMounted(() => {
      addSubscribe(name || normalizeEvent(vm), callback, pageId);
      if (multiple || !name) {
        watch(() => vm.id, (value, oldValue) => {
          addSubscribe(normalizeEvent(vm, value), callback, pageId);
          removeSubscribe(oldValue && normalizeEvent(vm, oldValue));
        });
      }
    });
    onBeforeUnmount(() => {
      removeSubscribe(name || normalizeEvent(vm));
    });
  }
  var index = 0;
  function useContextInfo(_id) {
    var page = useCurrentPageId();
    var instance = getCurrentInstance();
    var vm = instance.proxy;
    var type = vm.$options.name.toLowerCase();
    var id2 = _id || vm.id || "context".concat(index++);
    onMounted(() => {
      var el = vm.$el;
      el.__uniContextInfo = {
        id: id2,
        type,
        page
      };
    });
    return "".concat(type, ".").concat(id2);
  }
  function getContextInfo(el) {
    return el.__uniContextInfo;
  }
  class UniAnimationElement extends UniElement {
    constructor(id2, element, parentNodeId, refNodeId, nodeJson, propNames = []) {
      super(id2, element, parentNodeId, refNodeId, nodeJson, [...animation.props, ...propNames]);
    }
    call(fn) {
      var context = {
        animation: this.$props.animation,
        $el: this.$
      };
      fn.call(context);
    }
    setAttribute(name, value) {
      if (name === "animation") {
        this.$animate = true;
      }
      return super.setAttribute(name, value);
    }
    update(isMounted = false) {
      if (!this.$animate) {
        return;
      }
      if (isMounted) {
        return this.call(animation.mounted);
      }
      if (this.$animate) {
        this.$animate = false;
        this.call(animation.watch.animation.handler);
      }
    }
  }
  var PROP_NAMES_HOVER$1 = ["space", "decode"];
  class UniTextElement extends UniAnimationElement {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, document.createElement("uni-text"), parentNodeId, refNodeId, nodeJson, PROP_NAMES_HOVER$1);
      this._text = "";
    }
    init(nodeJson) {
      this._text = nodeJson.t || "";
      super.init(nodeJson);
    }
    setText(text2) {
      this._text = text2;
      this.update();
    }
    update(isMounted = false) {
      var {
        $props: {
          space,
          decode
        }
      } = this;
      this.$.innerHTML = parseText(this._text, {
        space,
        decode
      }).join("<br>");
      super.update(isMounted);
    }
  }
  class UniTextNode extends UniNode {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "#text", parentNodeId, document.createTextNode(""));
      this.init(nodeJson);
      this.insert(parentNodeId, refNodeId);
    }
  }
  var view = "uni-view {\n  display: block;\n}\nuni-view[hidden] {\n  display: none;\n}\n";
  var PROP_NAMES_HOVER = ["hover-class", "hover-stop-propagation", "hover-start-time", "hover-stay-time"];
  class UniHoverElement extends UniAnimationElement {
    constructor(id2, element, parentNodeId, refNodeId, nodeJson, propNames = []) {
      super(id2, element, parentNodeId, refNodeId, nodeJson, [...PROP_NAMES_HOVER, ...propNames]);
    }
    update(isMounted = false) {
      var hoverClass = this.$props["hover-class"];
      if (hoverClass && hoverClass !== "none") {
        if (!this._hover) {
          this._hover = new Hover(this.$, this.$props);
        }
        this._hover.addEvent();
      } else {
        if (this._hover) {
          this._hover.removeEvent();
        }
      }
      super.update(isMounted);
    }
  }
  class Hover {
    constructor($2, props2) {
      this._listening = false;
      this._hovering = false;
      this._hoverTouch = false;
      this.$ = $2;
      this.props = props2;
      this.__hoverTouchStart = this._hoverTouchStart.bind(this);
      this.__hoverTouchEnd = this._hoverTouchEnd.bind(this);
      this.__hoverTouchCancel = this._hoverTouchCancel.bind(this);
    }
    get hovering() {
      return this._hovering;
    }
    set hovering(hovering) {
      this._hovering = hovering;
      var hoverClass = this.props["hover-class"];
      if (hovering) {
        this.$.classList.add(hoverClass);
      } else {
        this.$.classList.remove(hoverClass);
      }
    }
    addEvent() {
      if (this._listening) {
        return;
      }
      {
        console.log(formatLog(this.$.tagName, "Hover", "addEventListener", this.props["hover-class"]));
      }
      this._listening = true;
      this.$.addEventListener("touchstart", this.__hoverTouchStart);
      this.$.addEventListener("touchend", this.__hoverTouchEnd);
      this.$.addEventListener("touchcancel", this.__hoverTouchCancel);
    }
    removeEvent() {
      if (!this._listening) {
        return;
      }
      {
        console.log(formatLog(this.$.tagName, "Hover", "removeEventListener"));
      }
      this._listening = false;
      this.$.removeEventListener("touchstart", this.__hoverTouchStart);
      this.$.removeEventListener("touchend", this.__hoverTouchEnd);
      this.$.removeEventListener("touchcancel", this.__hoverTouchCancel);
    }
    _hoverTouchStart(evt) {
      if (evt._hoverPropagationStopped) {
        return;
      }
      var hoverClass = this.props["hover-class"];
      if (!hoverClass || hoverClass === "none" || this.$.disabled) {
        return;
      }
      if (evt.touches.length > 1) {
        return;
      }
      if (this.props["hover-stop-propagation"]) {
        evt._hoverPropagationStopped = true;
      }
      this._hoverTouch = true;
      this._hoverStartTimer = setTimeout(() => {
        this.hovering = true;
        if (!this._hoverTouch) {
          this._hoverReset();
        }
      }, this.props["hover-start-time"]);
    }
    _hoverTouchEnd() {
      this._hoverTouch = false;
      if (this.hovering) {
        this._hoverReset();
      }
    }
    _hoverReset() {
      requestAnimationFrame(() => {
        clearTimeout(this._hoverStayTimer);
        this._hoverStayTimer = setTimeout(() => {
          this.hovering = false;
        }, this.props["hover-stay-time"]);
      });
    }
    _hoverTouchCancel() {
      this._hoverTouch = false;
      this.hovering = false;
      clearTimeout(this._hoverStartTimer);
    }
  }
  class UniViewElement extends UniHoverElement {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, document.createElement("uni-view"), parentNodeId, refNodeId, nodeJson);
    }
  }
  function getStatusbarHeight() {
    return plus.navigator.isImmersedStatusbar() ? Math.round(plus.os.name === "iOS" ? plus.navigator.getSafeAreaInsets().top : plus.navigator.getStatusbarHeight()) : 0;
  }
  function getNavigationBarHeight() {
    var webview2 = plus.webview.currentWebview();
    var style = webview2.getStyle();
    var titleNView = style && style.titleNView;
    if (titleNView && titleNView.type === "default") {
      return NAVBAR_HEIGHT + getStatusbarHeight();
    }
    return 0;
  }
  var onDrawKey = Symbol("onDraw");
  function getFixed($el) {
    var fixed;
    while ($el) {
      var style = getComputedStyle($el);
      var transform = style.transform || style.webkitTransform;
      fixed = transform && transform !== "none" ? false : fixed;
      fixed = style.position === "fixed" ? true : fixed;
      $el = $el.parentElement;
    }
    return fixed;
  }
  function useNativeAttrs(props2, ignore) {
    return computed$1(() => {
      var object = {};
      Object.keys(props2).forEach((key2) => {
        if (ignore && ignore.includes(key2)) {
          return;
        }
        var val = props2[key2];
        val = key2 === "src" ? getRealPath(val) : val;
        object[key2.replace(/[A-Z]/g, (str) => "-" + str.toLowerCase())] = val;
      });
      return object;
    });
  }
  function useNative(rootRef) {
    var position = reactive({
      top: "0px",
      left: "0px",
      width: "0px",
      height: "0px",
      position: "static"
    });
    var hidden = ref(false);
    function updatePosition() {
      var el = rootRef.value;
      var rect = el.getBoundingClientRect();
      var keys = ["width", "height"];
      hidden.value = rect.width === 0 || rect.height === 0;
      if (!hidden.value) {
        position.position = getFixed(el) ? "absolute" : "static";
        keys.push("top", "left");
      }
      keys.forEach((key2) => {
        var val = rect[key2];
        val = key2 === "top" ? val + (position.position === "static" ? document.documentElement.scrollTop || document.body.scrollTop || 0 : getNavigationBarHeight()) : val;
        position[key2] = val + "px";
      });
    }
    var request = null;
    function requestPositionUpdate() {
      if (request) {
        cancelAnimationFrame(request);
      }
      request = requestAnimationFrame(() => {
        request = null;
        updatePosition();
      });
    }
    window.addEventListener("updateview", requestPositionUpdate);
    var onDrawCallbacks = [];
    var onSelfReadyCallbacks = [];
    function onSelfReady(callback) {
      if (onSelfReadyCallbacks) {
        onSelfReadyCallbacks.push(callback);
      } else {
        callback();
      }
    }
    function onParentReady(callback) {
      var onDraw2 = inject(onDrawKey);
      var newCallback = (parentPosition) => {
        callback(parentPosition);
        onDrawCallbacks.forEach((callback2) => callback2(position));
        onDrawCallbacks = null;
      };
      onSelfReady(() => {
        if (onDraw2) {
          onDraw2(newCallback);
        } else {
          newCallback({
            top: "0px",
            left: "0px",
            width: Number.MAX_SAFE_INTEGER + "px",
            height: Number.MAX_SAFE_INTEGER + "px",
            position: "static"
          });
        }
      });
    }
    var onDraw = function(callback) {
      if (onDrawCallbacks) {
        onDrawCallbacks.push(callback);
      } else {
        callback(position);
      }
    };
    provide(onDrawKey, onDraw);
    onMounted(() => {
      updatePosition();
      onSelfReadyCallbacks.forEach((callback) => callback());
      onSelfReadyCallbacks = null;
    });
    return {
      position,
      hidden,
      onParentReady
    };
  }
  var Ad = /* @__PURE__ */ defineBuiltInComponent({
    name: "Ad",
    props: {
      adpid: {
        type: [Number, String],
        default: ""
      },
      data: {
        type: Object,
        default: null
      },
      dataCount: {
        type: Number,
        default: 5
      },
      channel: {
        type: String,
        default: ""
      }
    },
    setup(props2, {
      emit: emit2
    }) {
      var rootRef = ref(null);
      var containerRef = ref(null);
      var trigger2 = useCustomEvent(rootRef, emit2);
      var attrs2 = useNativeAttrs(props2, ["id"]);
      var {
        position,
        onParentReady
      } = useNative(containerRef);
      var adView;
      onParentReady(() => {
        adView = plus.ad.createAdView(Object.assign({}, attrs2.value, position));
        plus.webview.currentWebview().append(adView);
        adView.setDislikeListener((data) => {
          containerRef.value.style.height = "0";
          window.dispatchEvent(new CustomEvent("updateview"));
          trigger2("close", {}, data);
        });
        adView.setRenderingListener((data) => {
          if (data.result === 0) {
            containerRef.value.style.height = data.height + "px";
            window.dispatchEvent(new CustomEvent("updateview"));
          } else {
            trigger2("error", {}, {
              errCode: data.result
            });
          }
        });
        adView.setAdClickedListener(() => {
          trigger2("adclicked", {}, {});
        });
        watch(() => position, (position2) => adView.setStyle(position2), {
          deep: true
        });
        watch(() => props2.adpid, (val) => {
          if (val) {
            loadData();
          }
        });
        watch(() => props2.data, (val) => {
          if (val) {
            adView.renderingBind(val);
          }
        });
        function loadData() {
          var args = {
            adpid: props2.adpid,
            width: position.width,
            count: props2.dataCount
          };
          if (props2.channel !== void 0) {
            args.ext = {
              channel: props2.channel
            };
          }
          UniViewJSBridge.invokeServiceMethod("getAdData", args, ({
            code,
            data,
            message
          }) => {
            if (code === 0) {
              adView.renderingBind(data);
            } else {
              trigger2("error", {}, {
                errMsg: message
              });
            }
          });
        }
        if (props2.adpid) {
          loadData();
        }
      });
      onBeforeUnmount(() => {
        if (adView) {
          adView.close();
        }
      });
      return () => {
        return createVNode("uni-ad", {
          "ref": rootRef
        }, {
          default: () => [createVNode("div", {
            "ref": containerRef,
            "class": "uni-ad-container"
          }, null, 512)]
        }, 512);
      };
    }
  });
  class UniComponent extends UniNode {
    constructor(id2, tag, component, parentNodeId, refNodeId, nodeJson, selector) {
      super(id2, tag, parentNodeId);
      var container = document.createElement("div");
      container.__vueParent = getVueParent(this);
      this.$props = reactive({});
      this.init(nodeJson);
      this.$app = createApp(createWrapper(component, this.$props));
      this.$app.mount(container);
      this.$ = container.firstElementChild;
      if (selector) {
        this.$holder = this.$.querySelector(selector);
        {
          if (!this.$holder) {
            console.error(formatLog(tag, "holder", selector, this.$));
          }
        }
      }
      if (hasOwn$1(nodeJson, "t")) {
        this.setText(nodeJson.t || "");
      }
      if (nodeJson.a && hasOwn$1(nodeJson.a, ATTR_V_SHOW)) {
        patchVShow(this.$, nodeJson.a[ATTR_V_SHOW]);
      }
      this.insert(parentNodeId, refNodeId);
      flushPostFlushCbs();
    }
    init(nodeJson) {
      var {
        a: a2,
        e: e2
      } = nodeJson;
      if (a2) {
        Object.keys(a2).forEach((n) => {
          this.setAttr(n, a2[n]);
        });
      }
      if (hasOwn$1(nodeJson, "s")) {
        this.setAttr("style", nodeJson.s);
      }
      if (e2) {
        Object.keys(e2).forEach((n) => {
          this.addEvent(n, e2[n]);
        });
      }
    }
    setText(text2) {
      (this.$holder || this.$).textContent = text2;
    }
    addEvent(name, value) {
      var decoded = name;
      this.$props[decoded] = createInvoker(this.id, value, parseEventName(decoded)[1]);
    }
    removeEvent(name) {
      this.$props[name] = null;
    }
    setAttr(name, value) {
      if (name === ATTR_V_SHOW) {
        if (this.$) {
          patchVShow(this.$, value);
        }
      } else if (name === ATTR_STYLE) {
        var newStyle = decodeAttr(value);
        var oldStyle = this.$props.style;
        if (isPlainObject(newStyle) && isPlainObject(oldStyle)) {
          Object.keys(newStyle).forEach((n) => {
            oldStyle[n] = newStyle[n];
          });
        } else {
          this.$props.style = newStyle;
        }
      } else {
        this.$props[name] = decodeAttr(value);
      }
    }
    removeAttr(name) {
      this.$props[name] = null;
    }
    remove() {
      this.isUnmounted = true;
      this.$app.unmount();
      removeElement(this.id);
    }
    appendChild(node) {
      return (this.$holder || this.$).appendChild(node);
    }
    insertBefore(newChild, refChild) {
      return (this.$holder || this.$).insertBefore(newChild, refChild);
    }
  }
  class UniContainerComponent extends UniComponent {
    constructor(id2, tag, component, parentNodeId, refNodeId, nodeJson, selector) {
      super(id2, tag, component, parentNodeId, refNodeId, nodeJson, selector);
    }
    getRebuildFn() {
      if (!this._rebuild) {
        this._rebuild = this.rebuild.bind(this);
      }
      return this._rebuild;
    }
    setText(text2) {
      queuePostActionJob(this.getRebuildFn());
      return super.setText(text2);
    }
    appendChild(node) {
      queuePostActionJob(this.getRebuildFn());
      return super.appendChild(node);
    }
    insertBefore(newChild, refChild) {
      queuePostActionJob(this.getRebuildFn());
      return super.insertBefore(newChild, refChild);
    }
    rebuild() {
      {
        console.log(formatLog("rebuild", this.id, this.tag));
      }
      var vm = this.$.__vueParentComponent;
      if (vm.rebuild) {
        vm.rebuild();
      }
    }
  }
  function getVueParent(node) {
    while (node && node.pid > 0) {
      node = $(node.pid);
      if (node) {
        var {
          __vueParentComponent
        } = node.$;
        if (__vueParentComponent) {
          return __vueParentComponent;
        }
      }
    }
    return null;
  }
  function setHolderText(holder, clazz, text2) {
    holder.childNodes.forEach((childNode) => {
      if (childNode instanceof Element) {
        if (childNode.className.indexOf(clazz) === -1) {
          holder.removeChild(childNode);
        }
      } else {
        holder.removeChild(childNode);
      }
    });
    holder.appendChild(document.createTextNode(text2));
  }
  class UniAd extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-ad", Ad, parentNodeId, refNodeId, nodeJson);
    }
  }
  var button = "uni-button {\n  position: relative;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 14px;\n  padding-right: 14px;\n  box-sizing: border-box;\n  font-size: 18px;\n  text-align: center;\n  text-decoration: none;\n  line-height: 2.55555556;\n  border-radius: 5px;\n  -webkit-tap-highlight-color: transparent;\n  overflow: hidden;\n  color: #000000;\n  background-color: #f8f8f8;\n  cursor: pointer;\n}\n\nuni-button[hidden] {\n  display: none !important;\n}\n\nuni-button:after {\n  content: ' ';\n  width: 200%;\n  height: 200%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  transform: scale(0.5);\n  transform-origin: 0 0;\n  box-sizing: border-box;\n  border-radius: 10px;\n}\n\nuni-button[native] {\n  padding-left: 0;\n  padding-right: 0;\n}\n\nuni-button[native] .uni-button-cover-view-wrapper {\n  border: inherit;\n  border-color: inherit;\n  border-radius: inherit;\n  background-color: inherit;\n}\n\nuni-button[native] .uni-button-cover-view-inner {\n  padding-left: 14px;\n  padding-right: 14px;\n}\n\nuni-button uni-cover-view {\n  line-height: inherit;\n  white-space: inherit;\n}\n\nuni-button[type='default'] {\n  color: #000000;\n  background-color: #f8f8f8;\n}\n\nuni-button[type='primary'] {\n  color: #ffffff;\n  background-color: #007aff;\n}\n\nuni-button[type='warn'] {\n  color: #ffffff;\n  background-color: #e64340;\n}\n\nuni-button[disabled] {\n  color: rgba(255, 255, 255, 0.6);\n  cursor: not-allowed;\n}\n\nuni-button[disabled][type='default'],\nuni-button[disabled]:not([type]) {\n  color: rgba(0, 0, 0, 0.3);\n  background-color: #f7f7f7;\n}\n\nuni-button[disabled][type='primary'] {\n  background-color: rgba(0, 122, 255, 0.6);\n}\n\nuni-button[disabled][type='warn'] {\n  background-color: #ec8b89;\n}\n\nuni-button[type='primary'][plain] {\n  color: #007aff;\n  border: 1px solid #007aff;\n  background-color: transparent;\n}\n\nuni-button[type='primary'][plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\n\nuni-button[type='primary'][plain]:after {\n  border-width: 0;\n}\n\nuni-button[type='default'][plain] {\n  color: #353535;\n  border: 1px solid #353535;\n  background-color: transparent;\n}\n\nuni-button[type='default'][plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\n\nuni-button[type='default'][plain]:after {\n  border-width: 0;\n}\n\nuni-button[plain] {\n  color: #353535;\n  border: 1px solid #353535;\n  background-color: transparent;\n}\n\nuni-button[plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\n\nuni-button[plain]:after {\n  border-width: 0;\n}\n\nuni-button[plain][native] .uni-button-cover-view-inner {\n  padding: 0;\n}\n\nuni-button[type='warn'][plain] {\n  color: #e64340;\n  border: 1px solid #e64340;\n  background-color: transparent;\n}\n\nuni-button[type='warn'][plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\n\nuni-button[type='warn'][plain]:after {\n  border-width: 0;\n}\n\nuni-button[size='mini'] {\n  display: inline-block;\n  line-height: 2.3;\n  font-size: 13px;\n  padding: 0 1.34em;\n}\n\nuni-button[size='mini'][native] {\n  padding: 0;\n}\n\nuni-button[size='mini'][native] .uni-button-cover-view-inner {\n  padding: 0 1.34em;\n}\n\nuni-button[loading]:not([disabled]) {\n  cursor: progress;\n}\n\nuni-button[loading]:before {\n  content: ' ';\n  display: inline-block;\n  width: 18px;\n  height: 18px;\n  vertical-align: middle;\n  animation: uni-loading 1s steps(12, end) infinite;\n  background-size: 100%;\n}\n\nuni-button[loading][type='primary'] {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #0062cc;\n}\n\nuni-button[loading][type='primary'][plain] {\n  color: #007aff;\n  background-color: transparent;\n}\n\nuni-button[loading][type='default'] {\n  color: rgba(0, 0, 0, 0.6);\n  background-color: #dedede;\n}\n\nuni-button[loading][type='default'][plain] {\n  color: #353535;\n  background-color: transparent;\n}\n\nuni-button[loading][type='warn'] {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #ce3c39;\n}\n\nuni-button[loading][type='warn'][plain] {\n  color: #e64340;\n  background-color: transparent;\n}\n\nuni-button[loading][native]:before {\n  content: none;\n}\n\n.button-hover {\n  color: rgba(0, 0, 0, 0.6);\n  background-color: #dedede;\n}\n\n.button-hover[plain] {\n  color: rgba(53, 53, 53, 0.6);\n  border-color: rgba(53, 53, 53, 0.6);\n  background-color: transparent;\n}\n\n.button-hover[type='primary'] {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #0062cc;\n}\n\n.button-hover[type='primary'][plain] {\n  color: rgba(26, 173, 25, 0.6);\n  border-color: rgba(26, 173, 25, 0.6);\n  background-color: transparent;\n}\n\n.button-hover[type='default'] {\n  color: rgba(0, 0, 0, 0.6);\n  background-color: #dedede;\n}\n\n.button-hover[type='default'][plain] {\n  color: rgba(53, 53, 53, 0.6);\n  border-color: rgba(53, 53, 53, 0.6);\n  background-color: transparent;\n}\n\n.button-hover[type='warn'] {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #ce3c39;\n}\n\n.button-hover[type='warn'][plain] {\n  color: rgba(230, 67, 64, 0.6);\n  border-color: rgba(230, 67, 64, 0.6);\n  background-color: transparent;\n}\n";
  class UniButton extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-button", Button, parentNodeId, refNodeId, nodeJson);
    }
  }
  class UniTodoNode extends UniNode {
    constructor(id2, tag, parentNodeId, refNodeId) {
      super(id2, tag, parentNodeId);
      this.insert(parentNodeId, refNodeId);
    }
  }
  class UniCamera extends UniTodoNode {
    constructor(id2, parentNodeId, refNodeId) {
      super(id2, "uni-camera", parentNodeId, refNodeId);
    }
  }
  var canvas = "uni-canvas {\n  width: 300px;\n  height: 150px;\n  display: block;\n  position: relative;\n}\n\nuni-canvas > .uni-canvas-canvas {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n";
  class UniCanvas extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-canvas", Canvas, parentNodeId, refNodeId, nodeJson, "uni-canvas > div");
    }
  }
  var checkbox = "uni-checkbox {\n  -webkit-tap-highlight-color: transparent;\n  display: inline-block;\n  cursor: pointer;\n}\n\nuni-checkbox[hidden] {\n  display: none;\n}\n\nuni-checkbox[disabled] {\n  cursor: not-allowed;\n}\n\n.uni-checkbox-wrapper {\n  display: inline-flex;\n  align-items: center;\n  vertical-align: middle;\n}\n\n.uni-checkbox-input {\n  margin-right: 5px;\n  -webkit-appearance: none;\n          appearance: none;\n  outline: 0;\n  border: 1px solid #d1d1d1;\n  background-color: #ffffff;\n  border-radius: 3px;\n  width: 22px;\n  height: 22px;\n  position: relative;\n}\n\n.uni-checkbox-input svg {\n  color: #007aff;\n  font-size: 22px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -48%) scale(0.73);\n}\n\nuni-checkbox:not([disabled]) .uni-checkbox-input:hover {\n  border-color: #007aff;\n}\n\n.uni-checkbox-input.uni-checkbox-input-disabled {\n  background-color: #e1e1e1;\n}\n\n.uni-checkbox-input.uni-checkbox-input-disabled:before {\n  color: #adadad;\n}\n\nuni-checkbox-group {\n  display: block;\n}\n";
  class UniCheckbox extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-checkbox", Checkbox, parentNodeId, refNodeId, nodeJson, ".uni-checkbox-wrapper");
    }
    setText(text2) {
      setHolderText(this.$holder, "uni-checkbox-input", text2);
    }
  }
  var checkboxGroup = "uni-checkbox-group {\n  display: block;\n}\n\nuni-checkbox-group[hidden] {\n  display: none;\n}\n";
  class UniCheckboxGroup extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-checkbox-group", CheckboxGroup, parentNodeId, refNodeId, nodeJson);
    }
  }
  var coverImage = "uni-cover-image {\n  display: block;\n  line-height: 1.2;\n  overflow: hidden;\n  height: 100%;\n  width: 100%;\n  pointer-events: auto;\n}\n\nuni-cover-image[hidden] {\n  display: none;\n}\n\nuni-cover-image .uni-cover-image {\n  width: 100%;\n  height: 100%;\n}\n";
  var id = 0;
  function useCover(rootRef, trigger2, content) {
    var {
      position,
      hidden,
      onParentReady
    } = useNative(rootRef);
    var cover;
    onParentReady((parentPosition) => {
      var viewPosition = computed$1(() => {
        var object = {};
        for (var key2 in position) {
          var val = position[key2];
          var valNumber = parseFloat(val);
          var parentValNumber = parseFloat(parentPosition[key2]);
          if (key2 === "top" || key2 === "left") {
            val = Math.max(valNumber, parentValNumber) + "px";
          } else if (key2 === "width" || key2 === "height") {
            var base2 = key2 === "width" ? "left" : "top";
            var parentStart = parseFloat(parentPosition[base2]);
            var viewStart = parseFloat(position[base2]);
            var diff1 = Math.max(parentStart - viewStart, 0);
            var diff2 = Math.max(viewStart + valNumber - (parentStart + parentValNumber), 0);
            val = Math.max(valNumber - diff1 - diff2, 0) + "px";
          }
          object[key2] = val;
        }
        return object;
      });
      var baseStyle = ["borderRadius", "borderColor", "borderWidth", "backgroundColor"];
      var textStyle = ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "color", "textAlign", "lineHeight", "fontSize", "fontWeight", "textOverflow", "whiteSpace"];
      var imageStyle = [];
      var textAlign = {
        start: "left",
        end: "right"
      };
      function updateStyle(style2) {
        var computedStyle = getComputedStyle(rootRef.value);
        baseStyle.concat(textStyle, imageStyle).forEach((key2) => {
          style2[key2] = computedStyle[key2];
        });
        return style2;
      }
      var style = reactive(updateStyle({}));
      var request = null;
      function requestStyleUpdate() {
        if (request) {
          cancelAnimationFrame(request);
        }
        request = requestAnimationFrame(() => {
          request = null;
          updateStyle(style);
        });
      }
      window.addEventListener("updateview", requestStyleUpdate);
      function getTagPosition() {
        var position2 = {};
        for (var key2 in position2) {
          var val = position2[key2];
          if (key2 === "top" || key2 === "left") {
            val = Math.min(parseFloat(val) - parseFloat(parentPosition[key2]), 0) + "px";
          }
          position2[key2] = val;
        }
        return position2;
      }
      var tags = computed$1(() => {
        var position2 = getTagPosition();
        var tags2 = [{
          tag: "rect",
          position: position2,
          rectStyles: {
            color: style.backgroundColor,
            radius: style.borderRadius,
            borderColor: style.borderColor,
            borderWidth: style.borderWidth
          }
        }];
        if ("src" in content) {
          if (content.src) {
            tags2.push({
              tag: "img",
              position: position2,
              src: content.src
            });
          }
        } else {
          var lineSpacing = parseFloat(style.lineHeight) - parseFloat(style.fontSize);
          var width = parseFloat(position2.width) - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
          width = width < 0 ? 0 : width;
          var height = parseFloat(position2.height) - parseFloat(style.paddingTop) - lineSpacing / 2 - parseFloat(style.paddingBottom);
          height = height < 0 ? 0 : height;
          tags2.push({
            tag: "font",
            position: {
              top: "".concat(parseFloat(position2.top) + parseFloat(style.paddingTop) + lineSpacing / 2, "px"),
              left: "".concat(parseFloat(position2.left) + parseFloat(style.paddingLeft), "px"),
              width: "".concat(width, "px"),
              height: "".concat(height, "px")
            },
            textStyles: {
              align: textAlign[style.textAlign] || style.textAlign,
              color: style.color,
              decoration: "none",
              lineSpacing: "".concat(lineSpacing, "px"),
              margin: "0px",
              overflow: style.textOverflow,
              size: style.fontSize,
              verticalAlign: "top",
              weight: style.fontWeight,
              whiteSpace: style.whiteSpace
            },
            text: content.text
          });
        }
        return tags2;
      });
      cover = new plus.nativeObj.View("cover-".concat(Date.now(), "-").concat(id++), viewPosition.value, tags.value);
      {
        console.log(formatLog("Cover", cover.id, viewPosition.value, tags.value));
      }
      plus.webview.currentWebview().append(cover);
      if (hidden.value) {
        cover.hide();
      }
      cover.addEventListener("click", () => {
        trigger2("click", {}, {});
      });
      watch(() => hidden.value, (val) => {
        cover[val ? "hide" : "show"]();
      });
      watch(() => viewPosition.value, (val) => {
        cover.setStyle(val);
      }, {
        deep: true
      });
      watch(() => tags.value, () => {
        cover.reset();
        cover.draw(tags.value);
      }, {
        deep: true
      });
    });
    onBeforeUnmount(() => {
      if (cover) {
        cover.close();
      }
    });
  }
  var TEMP_PATH = "_doc/uniapp_temp/";
  var props$4 = {
    src: {
      type: String,
      default: ""
    },
    autoSize: {
      type: [Boolean, String],
      default: false
    }
  };
  function useImageLoad(props2, content, trigger2) {
    var style = ref("");
    var downloaTask;
    function loadImage() {
      content.src = "";
      style.value = props2.autoSize ? "width:0;height:0;" : "";
      var realPath = props2.src ? getRealPath(props2.src) : "";
      if (realPath.indexOf("http://") === 0 || realPath.indexOf("https://") === 0) {
        downloaTask = plus.downloader.createDownload(realPath, {
          filename: TEMP_PATH + "/download/"
        }, (task, status) => {
          if (status === 200) {
            getImageInfo(task.filename);
          } else {
            trigger2("error", {}, {
              errMsg: "error"
            });
          }
        });
        downloaTask.start();
      } else if (realPath) {
        getImageInfo(realPath);
      }
    }
    function getImageInfo(src) {
      content.src = src;
      plus.io.getImageInfo({
        src,
        success: ({
          width,
          height
        }) => {
          if (props2.autoSize) {
            style.value = "width:".concat(width, "px;height:").concat(height, "px;");
            window.dispatchEvent(new CustomEvent("updateview"));
          }
          trigger2("load", {}, {
            width,
            height
          });
        },
        fail: () => {
          trigger2("error", {}, {
            errMsg: "error"
          });
        }
      });
    }
    if (props2.src) {
      loadImage();
    }
    watch(() => props2.src, loadImage);
    onBeforeUnmount(() => {
      if (downloaTask) {
        downloaTask.abort();
      }
    });
    return style;
  }
  var CoverImage = /* @__PURE__ */ defineBuiltInComponent({
    name: "CoverImage",
    props: props$4,
    emits: ["click", "load", "error"],
    setup(props2, {
      emit: emit2
    }) {
      var rootRef = ref(null);
      var trigger2 = useCustomEvent(rootRef, emit2);
      var content = reactive({
        src: ""
      });
      var style = useImageLoad(props2, content, trigger2);
      useCover(rootRef, trigger2, content);
      return () => {
        return createVNode("uni-cover-image", {
          "ref": rootRef,
          "style": style.value
        }, {
          default: () => [createVNode("div", {
            "class": "uni-cover-image"
          }, null)]
        }, 8, ["style"]);
      };
    }
  });
  class UniCoverImage extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-cover-image", CoverImage, parentNodeId, refNodeId, nodeJson);
    }
  }
  var coverView = "uni-cover-view {\n  display: block;\n  line-height: 1.2;\n  overflow: hidden;\n  white-space: nowrap;\n  pointer-events: auto;\n}\n\nuni-cover-view[hidden] {\n  display: none;\n}\n\nuni-cover-view .uni-cover-view {\n  width: 100%;\n  height: 100%;\n}\n";
  var CoverView = /* @__PURE__ */ defineBuiltInComponent({
    name: "CoverView",
    emits: ["click"],
    setup(_, {
      emit: emit2
    }) {
      var rootRef = ref(null);
      var textRef = ref(null);
      var trigger2 = useCustomEvent(rootRef, emit2);
      var content = reactive({
        text: ""
      });
      useCover(rootRef, trigger2, content);
      useRebuild(() => {
        var node = textRef.value.childNodes[0];
        content.text = node && node instanceof Text ? node.textContent : "";
      });
      return () => {
        return createVNode("uni-cover-view", {
          "ref": rootRef
        }, {
          default: () => [createVNode("div", {
            "ref": textRef,
            "class": "uni-cover-view"
          }, null, 512)]
        }, 512);
      };
    }
  });
  class UniCoverView extends UniContainerComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-cover-view", CoverView, parentNodeId, refNodeId, nodeJson, ".uni-cover-view");
    }
  }
  var editor = ".ql-container {\n  display: block;\n  position: relative;\n  box-sizing: border-box;\n  -webkit-user-select: text;\n          user-select: text;\n  outline: none;\n  overflow: hidden;\n  width: 100%;\n  height: 200px;\n  min-height: 200px;\n}\n.ql-container[hidden] {\n  display: none;\n}\n.ql-container .ql-editor {\n  position: relative;\n  font-size: inherit;\n  line-height: inherit;\n  font-family: inherit;\n  min-height: inherit;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  -webkit-overflow-scrolling: touch;\n}\n.ql-container .ql-editor::-webkit-scrollbar {\n  width: 0 !important;\n}\n.ql-container .ql-editor.scroll-disabled {\n  overflow: hidden;\n}\n.ql-container .ql-image-overlay {\n  display: flex;\n  position: absolute;\n  box-sizing: border-box;\n  border: 1px dashed #ccc;\n  justify-content: center;\n  align-items: center;\n  -webkit-user-select: none;\n          user-select: none;\n}\n.ql-container .ql-image-overlay .ql-image-size {\n  position: absolute;\n  padding: 4px 8px;\n  text-align: center;\n  background-color: #fff;\n  color: #888;\n  border: 1px solid #ccc;\n  box-sizing: border-box;\n  opacity: 0.8;\n  right: 4px;\n  top: 4px;\n  font-size: 12px;\n  display: inline-block;\n  width: auto;\n}\n.ql-container .ql-image-overlay .ql-image-toolbar {\n  position: relative;\n  text-align: center;\n  box-sizing: border-box;\n  background: #000;\n  border-radius: 5px;\n  color: #fff;\n  font-size: 0;\n  min-height: 24px;\n  z-index: 100;\n}\n.ql-container .ql-image-overlay .ql-image-toolbar span {\n  display: inline-block;\n  cursor: pointer;\n  padding: 5px;\n  font-size: 12px;\n  border-right: 1px solid #fff;\n}\n.ql-container .ql-image-overlay .ql-image-toolbar span:last-child {\n  border-right: 0;\n}\n.ql-container .ql-image-overlay .ql-image-toolbar span.triangle-up {\n  padding: 0;\n  position: absolute;\n  top: -12px;\n  left: 50%;\n  transform: translatex(-50%);\n  width: 0;\n  height: 0;\n  border-width: 6px;\n  border-style: solid;\n  border-color: transparent transparent black transparent;\n}\n.ql-container .ql-image-overlay .ql-image-handle {\n  position: absolute;\n  height: 12px;\n  width: 12px;\n  border-radius: 50%;\n  border: 1px solid #ccc;\n  box-sizing: border-box;\n  background: #fff;\n}\n.ql-container img {\n  display: inline-block;\n  max-width: 100%;\n}\n.ql-clipboard p {\n  margin: 0;\n  padding: 0;\n}\n.ql-editor {\n  box-sizing: border-box;\n  height: 100%;\n  outline: none;\n  overflow-y: auto;\n  tab-size: 4;\n  -moz-tab-size: 4;\n  text-align: left;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\n.ql-editor > * {\n  cursor: text;\n}\n.ql-editor p,\n.ql-editor ol,\n.ql-editor ul,\n.ql-editor pre,\n.ql-editor blockquote,\n.ql-editor h1,\n.ql-editor h2,\n.ql-editor h3,\n.ql-editor h4,\n.ql-editor h5,\n.ql-editor h6 {\n  margin: 0;\n  padding: 0;\n  counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol > li,\n.ql-editor ul > li {\n  list-style-type: none;\n}\n.ql-editor ul > li::before {\n  content: '\\2022';\n}\n.ql-editor ul[data-checked=true],\n.ql-editor ul[data-checked=false] {\n  pointer-events: none;\n}\n.ql-editor ul[data-checked=true] > li *,\n.ql-editor ul[data-checked=false] > li * {\n  pointer-events: all;\n}\n.ql-editor ul[data-checked=true] > li::before,\n.ql-editor ul[data-checked=false] > li::before {\n  color: #777;\n  cursor: pointer;\n  pointer-events: all;\n}\n.ql-editor ul[data-checked=true] > li::before {\n  content: '\\2611';\n}\n.ql-editor ul[data-checked=false] > li::before {\n  content: '\\2610';\n}\n.ql-editor li::before {\n  display: inline-block;\n  white-space: nowrap;\n  width: 2em;\n}\n.ql-editor ol li {\n  counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n  counter-increment: list-0;\n}\n.ql-editor ol li:before {\n  content: counter(list-0, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-1 {\n  counter-increment: list-1;\n}\n.ql-editor ol li.ql-indent-1:before {\n  content: counter(list-1, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-1 {\n  counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-2 {\n  counter-increment: list-2;\n}\n.ql-editor ol li.ql-indent-2:before {\n  content: counter(list-2, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-2 {\n  counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-3 {\n  counter-increment: list-3;\n}\n.ql-editor ol li.ql-indent-3:before {\n  content: counter(list-3, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-3 {\n  counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-4 {\n  counter-increment: list-4;\n}\n.ql-editor ol li.ql-indent-4:before {\n  content: counter(list-4, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-4 {\n  counter-reset: list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-5 {\n  counter-increment: list-5;\n}\n.ql-editor ol li.ql-indent-5:before {\n  content: counter(list-5, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-5 {\n  counter-reset: list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-6 {\n  counter-increment: list-6;\n}\n.ql-editor ol li.ql-indent-6:before {\n  content: counter(list-6, decimal) '. ';\n}\n.ql-editor ol li.ql-indent-6 {\n  counter-reset: list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-7 {\n  counter-increment: list-7;\n}\n.ql-editor ol li.ql-indent-7:before {\n  content: counter(list-7, lower-alpha) '. ';\n}\n.ql-editor ol li.ql-indent-7 {\n  counter-reset: list-8 list-9;\n}\n.ql-editor ol li.ql-indent-8 {\n  counter-increment: list-8;\n}\n.ql-editor ol li.ql-indent-8:before {\n  content: counter(list-8, lower-roman) '. ';\n}\n.ql-editor ol li.ql-indent-8 {\n  counter-reset: list-9;\n}\n.ql-editor ol li.ql-indent-9 {\n  counter-increment: list-9;\n}\n.ql-editor ol li.ql-indent-9:before {\n  content: counter(list-9, decimal) '. ';\n}\n.ql-editor .ql-indent-1:not(.ql-direction-rtl) {\n  padding-left: 2em;\n}\n.ql-editor li.ql-indent-1:not(.ql-direction-rtl) {\n  padding-left: 2em;\n}\n.ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {\n  padding-right: 2em;\n}\n.ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {\n  padding-right: 2em;\n}\n.ql-editor .ql-indent-2:not(.ql-direction-rtl) {\n  padding-left: 4em;\n}\n.ql-editor li.ql-indent-2:not(.ql-direction-rtl) {\n  padding-left: 4em;\n}\n.ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {\n  padding-right: 4em;\n}\n.ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {\n  padding-right: 4em;\n}\n.ql-editor .ql-indent-3:not(.ql-direction-rtl) {\n  padding-left: 6em;\n}\n.ql-editor li.ql-indent-3:not(.ql-direction-rtl) {\n  padding-left: 6em;\n}\n.ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {\n  padding-right: 6em;\n}\n.ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {\n  padding-right: 6em;\n}\n.ql-editor .ql-indent-4:not(.ql-direction-rtl) {\n  padding-left: 8em;\n}\n.ql-editor li.ql-indent-4:not(.ql-direction-rtl) {\n  padding-left: 8em;\n}\n.ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {\n  padding-right: 8em;\n}\n.ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {\n  padding-right: 8em;\n}\n.ql-editor .ql-indent-5:not(.ql-direction-rtl) {\n  padding-left: 10em;\n}\n.ql-editor li.ql-indent-5:not(.ql-direction-rtl) {\n  padding-left: 10em;\n}\n.ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {\n  padding-right: 10em;\n}\n.ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {\n  padding-right: 10em;\n}\n.ql-editor .ql-indent-6:not(.ql-direction-rtl) {\n  padding-left: 12em;\n}\n.ql-editor li.ql-indent-6:not(.ql-direction-rtl) {\n  padding-left: 12em;\n}\n.ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {\n  padding-right: 12em;\n}\n.ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {\n  padding-right: 12em;\n}\n.ql-editor .ql-indent-7:not(.ql-direction-rtl) {\n  padding-left: 14em;\n}\n.ql-editor li.ql-indent-7:not(.ql-direction-rtl) {\n  padding-left: 14em;\n}\n.ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {\n  padding-right: 14em;\n}\n.ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {\n  padding-right: 14em;\n}\n.ql-editor .ql-indent-8:not(.ql-direction-rtl) {\n  padding-left: 16em;\n}\n.ql-editor li.ql-indent-8:not(.ql-direction-rtl) {\n  padding-left: 16em;\n}\n.ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {\n  padding-right: 16em;\n}\n.ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {\n  padding-right: 16em;\n}\n.ql-editor .ql-indent-9:not(.ql-direction-rtl) {\n  padding-left: 18em;\n}\n.ql-editor li.ql-indent-9:not(.ql-direction-rtl) {\n  padding-left: 18em;\n}\n.ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {\n  padding-right: 18em;\n}\n.ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {\n  padding-right: 18em;\n}\n.ql-editor .ql-direction-rtl {\n  direction: rtl;\n  text-align: inherit;\n}\n.ql-editor .ql-align-center {\n  text-align: center;\n}\n.ql-editor .ql-align-justify {\n  text-align: justify;\n}\n.ql-editor .ql-align-right {\n  text-align: right;\n}\n.ql-editor.ql-blank::before {\n  color: rgba(0, 0, 0, 0.6);\n  content: attr(data-placeholder);\n  font-style: italic;\n  pointer-events: none;\n  position: absolute;\n}\n.ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {\n  pointer-events: none;\n}\n.ql-clipboard {\n  left: -100000px;\n  height: 1px;\n  overflow-y: hidden;\n  position: absolute;\n  top: 50%;\n}\n";
  class UniEditor extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-editor", Editor, parentNodeId, refNodeId, nodeJson);
    }
  }
  var form = "";
  class UniForm extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-form", Form, parentNodeId, refNodeId, nodeJson, "span");
    }
  }
  class UniFunctionalPageNavigator extends UniTodoNode {
    constructor(id2, parentNodeId, refNodeId) {
      super(id2, "uni-functional-page-navigator", parentNodeId, refNodeId);
    }
  }
  var icon = "uni-icon {\n  display: inline-block;\n  font-size: 0;\n  box-sizing: border-box;\n}\n\nuni-icon[hidden] {\n  display: none;\n}\n";
  class UniIcon extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-icon", Icon, parentNodeId, refNodeId, nodeJson);
    }
  }
  var image = "uni-image {\n  width: 320px;\n  height: 240px;\n  display: inline-block;\n  overflow: hidden;\n  position: relative;\n}\n\nuni-image[hidden] {\n  display: none;\n}\n\nuni-image > div {\n  width: 100%;\n  height: 100%;\n}\n\nuni-image > img {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n          user-select: none;\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n}\n\nuni-image > .uni-image-will-change {\n  will-change: transform;\n}\n";
  class UniImage extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-image", Image$1, parentNodeId, refNodeId, nodeJson);
    }
  }
  var input = "uni-input {\n  display: block;\n  font-size: 16px;\n  line-height: 1.4em;\n  height: 1.4em;\n  min-height: 1.4em;\n  overflow: hidden;\n}\n\nuni-input[hidden] {\n  display: none;\n}\n\n.uni-input-wrapper,\n.uni-input-placeholder,\n.uni-input-form,\n.uni-input-input {\n  outline: none;\n  border: none;\n  padding: 0;\n  margin: 0;\n  text-decoration: inherit;\n}\n\n.uni-input-wrapper,\n.uni-input-form {\n  display: flex;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.uni-input-placeholder,\n.uni-input-input {\n  width: 100%;\n}\n\n.uni-input-placeholder {\n  position: absolute;\n  top: auto !important;\n  left: 0;\n  color: gray;\n  overflow: hidden;\n  text-overflow: clip;\n  white-space: pre;\n  word-break: keep-all;\n  pointer-events: none;\n  line-height: inherit;\n}\n\n.uni-input-input {\n  position: relative;\n  display: block;\n  height: 100%;\n  background: none;\n  color: inherit;\n  opacity: 1;\n  font: inherit;\n  line-height: inherit;\n  letter-spacing: inherit;\n  text-align: inherit;\n  text-indent: inherit;\n  text-transform: inherit;\n  text-shadow: inherit;\n}\n\n.uni-input-input[type='search']::-webkit-search-cancel-button {\n  display: none;\n}\n\n.uni-input-input::-webkit-outer-spin-button,\n.uni-input-input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n          appearance: none;\n  margin: 0;\n}\n\n.uni-input-input[type='number'] {\n  -moz-appearance: textfield;\n}\n\n.uni-input-input:disabled {\n  /* \u7528\u4E8E\u91CD\u7F6EiOS14\u4EE5\u4E0B\u7981\u7528\u72B6\u6001\u6587\u5B57\u989C\u8272 */\n  -webkit-text-fill-color: currentcolor;\n}\n";
  class UniInput extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-input", Input, parentNodeId, refNodeId, nodeJson);
    }
  }
  var label = ".uni-label-pointer {\n  cursor: pointer;\n}\n";
  class UniLabel extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-label", Label, parentNodeId, refNodeId, nodeJson);
    }
  }
  class UniLivePlayer extends UniTodoNode {
    constructor(id2, parentNodeId, refNodeId) {
      super(id2, "uni-live-player", parentNodeId, refNodeId);
    }
  }
  class UniLivePusher extends UniTodoNode {
    constructor(id2, parentNodeId, refNodeId) {
      super(id2, "uni-live-pusher", parentNodeId, refNodeId);
    }
  }
  var map = "uni-map {\n  width: 300px;\n  height: 225px;\n  display: inline-block;\n  line-height: 0;\n  overflow: hidden;\n  position: relative;\n}\n\nuni-map[hidden] {\n  display: none;\n}\n\n.uni-map-container {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  background-color: black;\n}\n\n.uni-map-slot {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  pointer-events: none;\n}";
  var convertCoordinates = (lng, lat, callback) => {
    callback({
      coord: {
        latitude: lat,
        longitude: lng
      }
    });
  };
  function parseHex(color) {
    if (color.indexOf("#") !== 0) {
      return {
        color,
        opacity: 1
      };
    }
    var opacity = color.substr(7, 2);
    return {
      color: color.substr(0, 7),
      opacity: opacity ? Number("0x" + opacity) / 255 : 1
    };
  }
  var props$3 = {
    id: {
      type: String,
      default: ""
    },
    latitude: {
      type: [Number, String],
      default: ""
    },
    longitude: {
      type: [Number, String],
      default: ""
    },
    scale: {
      type: [String, Number],
      default: 16
    },
    markers: {
      type: Array,
      default() {
        return [];
      }
    },
    polyline: {
      type: Array,
      default() {
        return [];
      }
    },
    circles: {
      type: Array,
      default() {
        return [];
      }
    },
    controls: {
      type: Array,
      default() {
        return [];
      }
    }
  };
  var Map$1 = /* @__PURE__ */ defineBuiltInComponent({
    name: "Map",
    props: props$3,
    emits: ["click", "regionchange", "controltap", "markertap", "callouttap"],
    setup(props2, {
      emit: emit2
    }) {
      var rootRef = ref(null);
      var trigger2 = useCustomEvent(rootRef, emit2);
      var containerRef = ref(null);
      var attrs2 = useNativeAttrs(props2, ["id"]);
      var {
        position,
        hidden,
        onParentReady
      } = useNative(containerRef);
      var map2;
      var {
        _addMarkers,
        _addMapLines,
        _addMapCircles,
        _setMap
      } = useMapMethods(props2, trigger2);
      onParentReady(() => {
        map2 = extend(plus.maps.create(getCurrentPageId() + "-map-" + (props2.id || Date.now()), Object.assign({}, attrs2.value, position, (() => {
          if (props2.latitude && props2.longitude) {
            return {
              center: new plus.maps.Point(Number(props2.longitude), Number(props2.latitude))
            };
          }
        })())), {
          __markers__: [],
          __lines__: [],
          __circles__: []
        });
        map2.setZoom(parseInt(String(props2.scale)));
        plus.webview.currentWebview().append(map2);
        if (hidden.value) {
          map2.hide();
        }
        map2.onclick = (e2) => {
          trigger2("click", {}, e2);
        };
        map2.onstatuschanged = (e2) => {
          trigger2("regionchange", {}, {});
        };
        _setMap(map2);
        _addMarkers(props2.markers);
        _addMapLines(props2.polyline);
        _addMapCircles(props2.circles);
        watch(() => attrs2.value, (attrs3) => map2 && map2.setStyles(attrs3), {
          deep: true
        });
        watch(() => position, (position2) => map2 && map2.setStyles(position2), {
          deep: true
        });
        watch(hidden, (val) => {
          map2 && map2[val ? "hide" : "show"]();
        });
        watch(() => props2.scale, (val) => {
          map2 && map2.setZoom(parseInt(String(val)));
        });
        watch([() => props2.latitude, () => props2.longitude], ([latitude, longitude]) => {
          map2 && map2.setStyles({
            center: new plus.maps.Point(Number(latitude), Number(longitude))
          });
        });
        watch(() => props2.markers, (val) => {
          _addMarkers(val, true);
        }, {
          deep: true
        });
        watch(() => props2.polyline, (val) => {
          _addMapLines(val);
        }, {
          deep: true
        });
        watch(() => props2.circles, (val) => {
          _addMapCircles(val);
        }, {
          deep: true
        });
      });
      var mapControls = computed$1(() => props2.controls.map((control) => {
        var position2 = {
          position: "absolute"
        };
        ["top", "left", "width", "height"].forEach((key2) => {
          if (control.position[key2]) {
            position2[key2] = control.position[key2] + "px";
          }
        });
        return {
          id: control.id,
          iconPath: getRealPath(control.iconPath),
          position: position2,
          clickable: control.clickable
        };
      }));
      onBeforeUnmount(() => {
        if (map2) {
          map2.close();
          _setMap(null);
        }
      });
      return () => {
        return createVNode("uni-map", {
          "ref": rootRef,
          "id": props2.id
        }, {
          default: () => [createVNode("div", {
            "ref": containerRef,
            "class": "uni-map-container"
          }, null, 512), mapControls.value.map((control, index2) => createVNode(CoverImage, {
            "key": index2,
            "src": control.iconPath,
            "style": control.position,
            "auto-size": true,
            "onClick": () => control.clickable && trigger2("controltap", {}, {
              controlId: control.id
            })
          }, null, 8, ["src", "style", "auto-size", "onClick"])), createVNode("div", {
            "class": "uni-map-slot"
          }, null)],
          _: 1
        }, 8, ["id"]);
      };
    }
  });
  function useMapMethods(props2, trigger2) {
    var map2;
    function moveToLocation(resolve, {
      longitude,
      latitude
    } = {}) {
      if (!map2)
        return;
      map2.setCenter(new plus.maps.Point(Number(longitude || props2.longitude), Number(latitude || props2.latitude)));
      resolve({
        errMsg: "moveToLocation:ok"
      });
    }
    function getCenterLocation(resolve) {
      if (!map2)
        return;
      map2.getCurrentCenter((state, point) => {
        resolve({
          longitude: point.getLng(),
          latitude: point.getLat(),
          errMsg: "getCenterLocation:ok"
        });
      });
    }
    function getRegion(resolve) {
      if (!map2)
        return;
      var rect = map2.getBounds();
      resolve({
        southwest: rect.getSouthWest(),
        northeast: rect.getNorthEast(),
        errMsg: "getRegion:ok"
      });
    }
    function getScale(resolve) {
      if (!map2)
        return;
      resolve({
        scale: map2.getZoom(),
        errMsg: "getScale:ok"
      });
    }
    function _addMarker(marker) {
      if (!map2)
        return;
      var {
        id: id2,
        latitude,
        longitude,
        iconPath,
        callout,
        label: label2
      } = marker;
      convertCoordinates(longitude, latitude, (res) => {
        var _map2;
        var {
          latitude: latitude2,
          longitude: longitude2
        } = res.coord;
        var nativeMarker = new plus.maps.Marker(new plus.maps.Point(longitude2, latitude2));
        if (iconPath) {
          nativeMarker.setIcon(getRealPath(iconPath));
        }
        if (label2 && label2.content) {
          nativeMarker.setLabel(label2.content);
        }
        var nativeBubble = void 0;
        if (callout && callout.content) {
          nativeBubble = new plus.maps.Bubble(callout.content);
        }
        if (nativeBubble) {
          nativeMarker.setBubble(nativeBubble);
        }
        if (id2 || id2 === 0) {
          nativeMarker.onclick = (e2) => {
            trigger2("markertap", {}, {
              markerId: id2
            });
          };
          if (nativeBubble) {
            nativeBubble.onclick = () => {
              trigger2("callouttap", {}, {
                markerId: id2
              });
            };
          }
        }
        (_map2 = map2) === null || _map2 === void 0 ? void 0 : _map2.addOverlay(nativeMarker);
        map2.__markers__.push(nativeMarker);
      });
    }
    function _clearMarkers() {
      if (!map2)
        return;
      var markers = map2.__markers__;
      markers.forEach((marker) => {
        var _map3;
        (_map3 = map2) === null || _map3 === void 0 ? void 0 : _map3.removeOverlay(marker);
      });
      map2.__markers__ = [];
    }
    function _addMarkers(markers, clear2) {
      if (clear2) {
        _clearMarkers();
      }
      markers.forEach((marker) => {
        _addMarker(marker);
      });
    }
    function _addMapLines(lines) {
      if (!map2)
        return;
      if (map2.__lines__.length > 0) {
        map2.__lines__.forEach((circle) => {
          var _map4;
          (_map4 = map2) === null || _map4 === void 0 ? void 0 : _map4.removeOverlay(circle);
        });
        map2.__lines__ = [];
      }
      lines.forEach((line) => {
        var _map5;
        var {
          color,
          width
        } = line;
        var points = line.points.map((point) => new plus.maps.Point(point.longitude, point.latitude));
        var polyline = new plus.maps.Polyline(points);
        if (color) {
          var strokeStyle = parseHex(color);
          polyline.setStrokeColor(strokeStyle.color);
          polyline.setStrokeOpacity(strokeStyle.opacity);
        }
        if (width) {
          polyline.setLineWidth(width);
        }
        (_map5 = map2) === null || _map5 === void 0 ? void 0 : _map5.addOverlay(polyline);
        map2.__lines__.push(polyline);
      });
    }
    function _addMapCircles(circles) {
      if (!map2)
        return;
      if (map2.__circles__.length > 0) {
        map2.__circles__.forEach((circle) => {
          var _map6;
          (_map6 = map2) === null || _map6 === void 0 ? void 0 : _map6.removeOverlay(circle);
        });
        map2.__circles__ = [];
      }
      circles.forEach((circle) => {
        var _map7;
        var {
          latitude,
          longitude,
          color,
          fillColor,
          radius,
          strokeWidth
        } = circle;
        var nativeCircle = new plus.maps.Circle(new plus.maps.Point(longitude, latitude), radius);
        if (color) {
          var strokeStyle = parseHex(color);
          nativeCircle.setStrokeColor(strokeStyle.color);
          nativeCircle.setStrokeOpacity(strokeStyle.opacity);
        }
        if (fillColor) {
          var fillStyle = parseHex(fillColor);
          nativeCircle.setFillColor(fillStyle.color);
          nativeCircle.setFillOpacity(fillStyle.opacity);
        }
        if (strokeWidth) {
          nativeCircle.setLineWidth(strokeWidth);
        }
        (_map7 = map2) === null || _map7 === void 0 ? void 0 : _map7.addOverlay(nativeCircle);
        map2.__circles__.push(nativeCircle);
      });
    }
    var methods2 = {
      moveToLocation,
      getCenterLocation,
      getRegion,
      getScale
    };
    useSubscribe((type, data, resolve) => {
      methods2[type] && methods2[type](resolve, data);
    }, useContextInfo(), true);
    return {
      _addMarkers,
      _addMapLines,
      _addMapCircles,
      _setMap(_map) {
        map2 = _map;
      }
    };
  }
  class UniMap extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-map", Map$1, parentNodeId, refNodeId, nodeJson, ".uni-map-slot");
    }
  }
  var movableArea = "uni-movable-area {\n  display: block;\n  position: relative;\n  width: 10px;\n  height: 10px;\n}\n\nuni-movable-area[hidden] {\n  display: none;\n}\n";
  class UniMovableArea extends UniContainerComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-movable-area", MovableArea, parentNodeId, refNodeId, nodeJson);
    }
  }
  var movableView = "uni-movable-view {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  top: 0px;\n  left: 0px;\n  position: absolute;\n  cursor: grab;\n}\n\nuni-movable-view[hidden] {\n  display: none;\n}\n";
  class UniMovableView extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-movable-view", MovableView, parentNodeId, refNodeId, nodeJson);
    }
  }
  var navigator$1 = "uni-navigator {\n  height: auto;\n  width: auto;\n  display: block;\n  cursor: pointer;\n}\n\nuni-navigator[hidden] {\n  display: none;\n}\n\n.navigator-hover {\n  background-color: rgba(0, 0, 0, 0.1);\n  opacity: 0.7;\n}\n";
  class UniNavigator extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-navigator", Navigator, parentNodeId, refNodeId, nodeJson);
    }
  }
  class UniOfficialAccount extends UniTodoNode {
    constructor(id2, parentNodeId, refNodeId) {
      super(id2, "uni-official-account", parentNodeId, refNodeId);
    }
  }
  class UniOpenData extends UniTodoNode {
    constructor(id2, parentNodeId, refNodeId) {
      super(id2, "uni-open-data", parentNodeId, refNodeId);
    }
  }
  var plus_;
  var weex_;
  var BroadcastChannel_;
  function getRuntime() {
    return typeof window === "object" && typeof navigator === "object" && typeof document === "object" ? "webview" : "v8";
  }
  function getPageId() {
    return plus_.webview.currentWebview().id;
  }
  var channel;
  var globalEvent;
  var callbacks = {};
  function onPlusMessage(res) {
    var message = res.data && res.data.__message;
    if (!message || !message.__page) {
      return;
    }
    var pageId = message.__page;
    var callback = callbacks[pageId];
    callback && callback(message);
    if (!message.keep) {
      delete callbacks[pageId];
    }
  }
  function addEventListener(pageId, callback) {
    if (getRuntime() === "v8") {
      if (BroadcastChannel_) {
        channel && channel.close();
        channel = new BroadcastChannel_(getPageId());
        channel.onmessage = onPlusMessage;
      } else if (!globalEvent) {
        globalEvent = weex_.requireModule("globalEvent");
        globalEvent.addEventListener("plusMessage", onPlusMessage);
      }
    } else {
      window.__plusMessage = onPlusMessage;
    }
    callbacks[pageId] = callback;
  }
  class Page {
    constructor(webview2) {
      this.webview = webview2;
    }
    sendMessage(data) {
      var message = JSON.parse(JSON.stringify({
        __message: {
          data
        }
      }));
      var id2 = this.webview.id;
      if (BroadcastChannel_) {
        var channel2 = new BroadcastChannel_(id2);
        channel2.postMessage(message);
      } else {
        plus_.webview.postMessageToUniNView && plus_.webview.postMessageToUniNView(message, id2);
      }
    }
    close() {
      this.webview.close();
    }
  }
  function showPage({
    context = {},
    url,
    data = {},
    style = {},
    onMessage,
    onClose
  }) {
    plus_ = context.plus || plus;
    weex_ = context.weex || (typeof weex === "object" ? weex : null);
    BroadcastChannel_ = context.BroadcastChannel || (typeof BroadcastChannel === "object" ? BroadcastChannel : null);
    var titleNView = {
      autoBackButton: true,
      titleSize: "17px"
    };
    var pageId = "page".concat(Date.now());
    style = extend({}, style);
    if (style.titleNView !== false && style.titleNView !== "none") {
      style.titleNView = extend(titleNView, style.titleNView);
    }
    var defaultStyle = {
      top: 0,
      bottom: 0,
      usingComponents: {},
      popGesture: "close",
      scrollIndicator: "none",
      animationType: "pop-in",
      animationDuration: 200,
      uniNView: {
        path: "".concat(typeof process === "object" && process.env && {}.VUE_APP_TEMPLATE_PATH || "", "/").concat(url, ".js"),
        defaultFontSize: plus_.screen.resolutionWidth / 20,
        viewport: plus_.screen.resolutionWidth
      }
    };
    style = extend(defaultStyle, style);
    var page = plus_.webview.create("", pageId, style, {
      extras: {
        from: getPageId(),
        runtime: getRuntime(),
        data,
        useGlobalEvent: !BroadcastChannel_
      }
    });
    page.addEventListener("close", onClose);
    addEventListener(pageId, (message) => {
      if (typeof onMessage === "function") {
        onMessage(message.data);
      }
      if (!message.keep) {
        page.close("auto");
      }
    });
    page.show(style.animationType, style.animationDuration);
    return new Page(page);
  }
  var mode = {
    SELECTOR: "selector",
    MULTISELECTOR: "multiSelector",
    TIME: "time",
    DATE: "date"
  };
  var fields = {
    YEAR: "year",
    MONTH: "month",
    DAY: "day"
  };
  function padLeft(num) {
    return num > 9 ? num : "0".concat(num);
  }
  function getDate(str, _mode) {
    str = String(str || "");
    var date = new Date();
    if (_mode === mode.TIME) {
      var strs = str.split(":");
      if (strs.length === 2) {
        date.setHours(parseInt(strs[0]), parseInt(strs[1]));
      }
    } else {
      var _strs = str.split("-");
      if (_strs.length === 3) {
        date.setFullYear(parseInt(_strs[0]), parseInt(String(parseFloat(_strs[1]) - 1)), parseInt(_strs[2]));
      }
    }
    return date;
  }
  function getDefaultStartValue(props2) {
    if (props2.mode === mode.TIME) {
      return "00:00";
    }
    if (props2.mode === mode.DATE) {
      var year = new Date().getFullYear() - 100;
      switch (props2.fields) {
        case fields.YEAR:
          return year;
        case fields.MONTH:
          return year + "-01";
        default:
          return year + "-01-01";
      }
    }
    return "";
  }
  function getDefaultEndValue(props2) {
    if (props2.mode === mode.TIME) {
      return "23:59";
    }
    if (props2.mode === mode.DATE) {
      var year = new Date().getFullYear() + 100;
      switch (props2.fields) {
        case fields.YEAR:
          return year;
        case fields.MONTH:
          return year + "-12";
        default:
          return year + "-12-31";
      }
    }
    return "";
  }
  var props$2 = {
    name: {
      type: String,
      default: ""
    },
    range: {
      type: Array,
      default() {
        return [];
      }
    },
    rangeKey: {
      type: String,
      default: ""
    },
    value: {
      type: [Number, String, Array],
      default: 0
    },
    mode: {
      type: String,
      default: mode.SELECTOR,
      validator(val) {
        return Object.values(mode).indexOf(val) >= 0;
      }
    },
    fields: {
      type: String,
      default: ""
    },
    start: {
      type: String,
      default: getDefaultStartValue
    },
    end: {
      type: String,
      default: getDefaultEndValue
    },
    disabled: {
      type: [Boolean, String],
      default: false
    }
  };
  var Picker = /* @__PURE__ */ defineBuiltInComponent({
    name: "Picker",
    props: props$2,
    emits: ["change", "cancel", "columnchange"],
    setup(props2, {
      emit: emit2
    }) {
      initI18nPickerMsgsOnce();
      var {
        t: t2,
        getLocale
      } = useI18n();
      var rootRef = ref(null);
      var trigger2 = useCustomEvent(rootRef, emit2);
      var valueSync = ref(null);
      var page = ref(null);
      var _setValueSync = () => {
        var val = props2.value;
        switch (props2.mode) {
          case mode.MULTISELECTOR:
            {
              if (!Array.isArray(val)) {
                val = [];
              }
              if (!Array.isArray(valueSync.value)) {
                valueSync.value = [];
              }
              var length = valueSync.value.length = Math.max(val.length, props2.range.length);
              for (var index2 = 0; index2 < length; index2++) {
                var val0 = Number(val[index2]);
                var val1 = Number(valueSync.value[index2]);
                var val2 = isNaN(val0) ? isNaN(val1) ? 0 : val1 : val0;
                valueSync.value.splice(index2, 1, val2 < 0 ? 0 : val2);
              }
            }
            break;
          case mode.TIME:
          case mode.DATE:
            valueSync.value = String(val);
            break;
          default: {
            var _valueSync = Number(val);
            valueSync.value = _valueSync < 0 ? 0 : _valueSync;
            break;
          }
        }
      };
      var _updatePicker = (data) => {
        page.value && page.value.sendMessage(data);
      };
      var _showWeexPicker = (data) => {
        var res = {
          event: "cancel"
        };
        page.value = showPage({
          url: "__uniapppicker",
          data,
          style: {
            titleNView: false,
            animationType: "none",
            animationDuration: 0,
            background: "rgba(0,0,0,0)",
            popGesture: "none"
          },
          onMessage: (message) => {
            var event = message.event;
            if (event === "created") {
              _updatePicker(data);
              return;
            }
            if (event === "columnchange") {
              delete message.event;
              trigger2(event, {}, message);
              return;
            }
            res = message;
          },
          onClose: () => {
            page.value = null;
            var event = res.event;
            delete res.event;
            event && trigger2(event, {}, res);
          }
        });
      };
      var _showNativePicker = (data, popover) => {
        plus.nativeUI[props2.mode === mode.TIME ? "pickTime" : "pickDate"]((res) => {
          var date = res.date;
          trigger2("change", {}, {
            value: props2.mode === mode.TIME ? "".concat(padLeft(date.getHours()), ":").concat(padLeft(date.getMinutes())) : "".concat(date.getFullYear(), "-").concat(padLeft(date.getMonth() + 1), "-").concat(padLeft(date.getDate()))
          });
        }, () => {
          trigger2("cancel", {}, {});
        }, props2.mode === mode.TIME ? {
          time: getDate(props2.value, mode.TIME),
          popover
        } : {
          date: getDate(props2.value, mode.DATE),
          minDate: getDate(props2.start, mode.DATE),
          maxDate: getDate(props2.end, mode.DATE),
          popover
        });
      };
      var _showPicker = (data, popover) => {
        if ((data.mode === mode.TIME || data.mode === mode.DATE) && !data.fields) {
          _showNativePicker(data, popover);
        } else {
          data.fields = Object.values(fields).includes(data.fields) ? data.fields : fields.DAY;
          _showWeexPicker(data);
        }
      };
      var _show = (event) => {
        if (props2.disabled) {
          return;
        }
        var eventTarget = event.currentTarget;
        var rect = eventTarget.getBoundingClientRect();
        _showPicker(Object.assign({}, props2, {
          value: valueSync.value,
          locale: getLocale(),
          messages: {
            done: t2("uni.picker.done"),
            cancel: t2("uni.picker.cancel")
          }
        }), {
          top: rect.top + getNavigationBarHeight(),
          left: rect.left,
          width: rect.width,
          height: rect.height
        });
      };
      var uniForm = inject(uniFormKey, false);
      var formField = {
        submit: () => [props2.name, valueSync.value],
        reset: () => {
          switch (props2.mode) {
            case mode.SELECTOR:
              valueSync.value = 0;
              break;
            case mode.MULTISELECTOR:
              Array.isArray(props2.value) && (valueSync.value = props2.value.map((val) => 0));
              break;
            case mode.DATE:
            case mode.TIME:
              valueSync.value = "";
              break;
          }
        }
      };
      if (uniForm) {
        uniForm.addField(formField);
        onBeforeUnmount(() => uniForm.removeField(formField));
      }
      Object.keys(props2).forEach((key2) => {
        if (key2 !== "name") {
          watch(() => props2[key2], (val) => {
            var data = {};
            data[key2] = val;
            _updatePicker(data);
          }, {
            deep: true
          });
        }
      });
      watch(() => props2.value, _setValueSync, {
        deep: true
      });
      _setValueSync();
      return () => createVNode("uni-picker", {
        "ref": rootRef,
        "onClick": _show
      }, {
        default: () => [createVNode("slot", null, null)]
      }, 8, ["onClick"]);
    }
  });
  class UniPicker extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-picker", Picker, parentNodeId, refNodeId, nodeJson);
    }
  }
  var pickerView = "uni-picker-view {\n  display: block;\n}\n\n.uni-picker-view-wrapper {\n  display: flex;\n  position: relative;\n  overflow: hidden;\n  height: 100%;\n}\n\nuni-picker-view[hidden] {\n  display: none;\n}\n";
  class UniPickerView extends UniContainerComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-picker-view", PickerView, parentNodeId, refNodeId, nodeJson, ".uni-picker-view-wrapper");
    }
  }
  var pickerViewColumn = "uni-picker-view-column {\n  flex: 1;\n  position: relative;\n  height: 100%;\n  overflow: hidden;\n}\n\nuni-picker-view-column[hidden] {\n  display: none;\n}\n\n.uni-picker-view-group {\n  height: 100%;\n  overflow: hidden;\n}\n\n.uni-picker-view-mask {\n  transform: translateZ(0);\n}\n\n.uni-picker-view-indicator,\n.uni-picker-view-mask {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  z-index: 3;\n  pointer-events: none;\n}\n\n.uni-picker-view-mask {\n  top: 0;\n  height: 100%;\n  margin: 0 auto;\n  background: linear-gradient(\n      180deg,\n      hsla(0, 0%, 100%, 0.95),\n      hsla(0, 0%, 100%, 0.6)\n    ),\n    linear-gradient(0deg, hsla(0, 0%, 100%, 0.95), hsla(0, 0%, 100%, 0.6));\n  background-position: top, bottom;\n  background-size: 100% 102px;\n  background-repeat: no-repeat;\n}\n\n.uni-picker-view-indicator {\n  height: 34px;\n  /* top: 102px; */\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.uni-picker-view-content {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  will-change: transform;\n  padding: 102px 0;\n  cursor: pointer;\n}\n\n.uni-picker-view-content > * {\n  height: 34px;\n  overflow: hidden;\n}\n\n.uni-picker-view-indicator:after,\n.uni-picker-view-indicator:before {\n  content: ' ';\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: 1px;\n  color: #e5e5e5;\n}\n\n.uni-picker-view-indicator:before {\n  top: 0;\n  border-top: 1px solid #e5e5e5;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n}\n\n.uni-picker-view-indicator:after {\n  bottom: 0;\n  border-bottom: 1px solid #e5e5e5;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n}\n\n.uni-picker-view-indicator:after,\n.uni-picker-view-indicator:before {\n  content: ' ';\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: 1px;\n  color: #e5e5e5;\n}\n";
  class UniPickerViewColumn extends UniContainerComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-picker-view-column", PickerViewColumn, parentNodeId, refNodeId, nodeJson, ".uni-picker-view-content");
    }
  }
  var progress = "uni-progress {\n  display: flex;\n  align-items: center;\n}\n\nuni-progress[hidden] {\n  display: none;\n}\n\n.uni-progress-bar {\n  flex: 1;\n}\n\n.uni-progress-inner-bar {\n  width: 0;\n  height: 100%;\n}\n\n.uni-progress-info {\n  margin-top: 0;\n  margin-bottom: 0;\n  min-width: 2em;\n  margin-left: 15px;\n  font-size: 16px;\n}\n";
  class UniProgress extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-progress", Progress, parentNodeId, refNodeId, nodeJson);
    }
  }
  var radio = "uni-radio {\n  -webkit-tap-highlight-color: transparent;\n  display: inline-block;\n  cursor: pointer;\n}\n\nuni-radio[hidden] {\n  display: none;\n}\n\nuni-radio[disabled] {\n  cursor: not-allowed;\n}\n\n.uni-radio-wrapper {\n  display: inline-flex;\n  align-items: center;\n  vertical-align: middle;\n}\n\n.uni-radio-input {\n  -webkit-appearance: none;\n          appearance: none;\n  margin-right: 5px;\n  outline: 0;\n  border: 1px solid #d1d1d1;\n  background-color: #ffffff;\n  border-radius: 50%;\n  width: 22px;\n  height: 22px;\n  position: relative;\n}\n\nuni-radio:not([disabled]) .uni-radio-input:hover {\n  border-color: #007aff;\n}\n\n.uni-radio-input svg {\n  color: #ffffff;\n  font-size: 18px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -48%) scale(0.73);\n}\n\n.uni-radio-input.uni-radio-input-disabled {\n  background-color: #e1e1e1;\n  border-color: #d1d1d1;\n}\n\n.uni-radio-input.uni-radio-input-disabled:before {\n  color: #adadad;\n}\n";
  class UniRadio extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-radio", Radio, parentNodeId, refNodeId, nodeJson, ".uni-radio-wrapper");
    }
    setText(text2) {
      setHolderText(this.$holder, "uni-radio-input", text2);
    }
  }
  var radioGroup = "uni-radio-group {\n  display: block;\n}\nuni-radio-group[hidden] {\n  display: none;\n}\n";
  class UniRadioGroup extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-radio-group", RadioGroup, parentNodeId, refNodeId, nodeJson);
    }
  }
  var richText = "";
  class UniRichText extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-rich-text", RichText, parentNodeId, refNodeId, nodeJson);
    }
  }
  var scrollView = "uni-scroll-view {\n  display: block;\n  width: 100%;\n}\n\nuni-scroll-view[hidden] {\n  display: none;\n}\n\n.uni-scroll-view {\n  position: relative;\n  -webkit-overflow-scrolling: touch;\n  width: 100%;\n  /* display: flex; \u65F6\u5728\u5B89\u5353\u4E0B\u4F1A\u5BFC\u81F4scrollWidth\u548CoffsetWidth\u4E00\u6837 */\n  height: 100%;\n  max-height: inherit;\n}\n\n.uni-scroll-view-content {\n  width: 100%;\n  height: 100%;\n}\n\n.uni-scroll-view-refresher {\n  position: relative;\n  overflow: hidden;\n}\n\n.uni-scroll-view-refresh {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n\n.uni-scroll-view-refresh-inner {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background-color: #fff;\n  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),\n    0 1px 4px rgba(0, 0, 0, 0.117647);\n}\n\n.uni-scroll-view-refresh__spinner {\n  transform-origin: center center;\n  animation: uni-scroll-view-refresh-rotate 2s linear infinite;\n}\n\n.uni-scroll-view-refresh__spinner > circle {\n  stroke: currentColor;\n  stroke-linecap: round;\n  animation: uni-scroll-view-refresh-dash 2s linear infinite;\n}\n\n@keyframes uni-scroll-view-refresh-rotate {\n  0% {\n    transform: rotate(0deg);\n  }\n\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes uni-scroll-view-refresh-dash {\n  0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n  }\n\n  50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35px;\n  }\n\n  100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124px;\n  }\n}\n";
  class UniScrollView extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-scroll-view", ScrollView, parentNodeId, refNodeId, nodeJson, ".uni-scroll-view-content");
    }
    setText(text2) {
      setHolderText(this.$holder, "uni-scroll-view-refresher", text2);
    }
  }
  var slider = "uni-slider {\n  margin: 10px 18px;\n  padding: 0;\n  display: block;\n}\n\nuni-slider[hidden] {\n  display: none;\n}\n\nuni-slider .uni-slider-wrapper {\n  display: flex;\n  align-items: center;\n  min-height: 16px;\n}\n\nuni-slider .uni-slider-tap-area {\n  flex: 1;\n  padding: 8px 0;\n}\n\nuni-slider .uni-slider-handle-wrapper {\n  position: relative;\n  height: 2px;\n  border-radius: 5px;\n  background-color: #e9e9e9;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n  -webkit-tap-highlight-color: transparent;\n}\n\nuni-slider .uni-slider-track {\n  height: 100%;\n  border-radius: 6px;\n  background-color: #007aff;\n  transition: background-color 0.3s ease;\n}\n\nuni-slider .uni-slider-handle,\nuni-slider .uni-slider-thumb {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  cursor: pointer;\n  border-radius: 50%;\n  transition: border-color 0.3s ease;\n}\n\nuni-slider .uni-slider-handle {\n  width: 28px;\n  height: 28px;\n  margin-top: -14px;\n  margin-left: -14px;\n  background-color: transparent;\n  z-index: 3;\n  cursor: grab;\n}\n\nuni-slider .uni-slider-thumb {\n  z-index: 2;\n  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);\n}\n\nuni-slider .uni-slider-step {\n  position: absolute;\n  width: 100%;\n  height: 2px;\n  background: transparent;\n  z-index: 1;\n}\n\nuni-slider .uni-slider-value {\n  width: 3ch;\n  color: #888;\n  font-size: 14px;\n  margin-left: 1em;\n}\n\nuni-slider .uni-slider-disabled .uni-slider-track {\n  background-color: #ccc;\n}\n\nuni-slider .uni-slider-disabled .uni-slider-thumb {\n  background-color: #fff;\n  border-color: #ccc;\n}\n";
  class UniSlider extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-slider", Slider, parentNodeId, refNodeId, nodeJson);
    }
  }
  var swiper = "uni-swiper {\n  display: block;\n  height: 150px;\n}\n\nuni-swiper[hidden] {\n  display: none;\n}\n\n.uni-swiper-wrapper {\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  transform: translateZ(0);\n}\n\n.uni-swiper-slides {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n}\n\n.uni-swiper-slide-frame {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  will-change: transform;\n}\n\n.uni-swiper-dots {\n  position: absolute;\n  font-size: 0;\n}\n\n.uni-swiper-dots-horizontal {\n  left: 50%;\n  bottom: 10px;\n  text-align: center;\n  white-space: nowrap;\n  transform: translate(-50%, 0);\n}\n\n.uni-swiper-dots-horizontal .uni-swiper-dot {\n  margin-right: 8px;\n}\n\n.uni-swiper-dots-horizontal .uni-swiper-dot:last-child {\n  margin-right: 0;\n}\n\n.uni-swiper-dots-vertical {\n  right: 10px;\n  top: 50%;\n  text-align: right;\n  transform: translate(0, -50%);\n}\n\n.uni-swiper-dots-vertical .uni-swiper-dot {\n  display: block;\n  margin-bottom: 9px;\n}\n\n.uni-swiper-dots-vertical .uni-swiper-dot:last-child {\n  margin-bottom: 0;\n}\n\n.uni-swiper-dot {\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  cursor: pointer;\n  transition-property: background-color;\n  transition-timing-function: ease;\n  background: rgba(0, 0, 0, 0.3);\n  border-radius: 50%;\n}\n\n.uni-swiper-dot-active {\n  background-color: #000000;\n}\n";
  class UniSwiper extends UniContainerComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-swiper", Swiper, parentNodeId, refNodeId, nodeJson, ".uni-swiper-slide-frame");
    }
  }
  var swiperItem = "uni-swiper-item {\n  display: block;\n  overflow: hidden;\n  will-change: transform;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  cursor: grab;\n}\n\nuni-swiper-item[hidden] {\n  display: none;\n}\n";
  class UniSwiperItem extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-swiper-item", SwiperItem, parentNodeId, refNodeId, nodeJson);
    }
  }
  var _switch = "uni-switch {\n  -webkit-tap-highlight-color: transparent;\n  display: inline-block;\n  cursor: pointer;\n}\n\nuni-switch[hidden] {\n  display: none;\n}\n\nuni-switch[disabled] {\n  cursor: not-allowed;\n}\n\n.uni-switch-wrapper {\n  display: inline-flex;\n  align-items: center;\n  vertical-align: middle;\n}\n\n.uni-switch-input {\n  -webkit-appearance: none;\n          appearance: none;\n  position: relative;\n  width: 52px;\n  height: 32px;\n  margin-right: 5px;\n  border: 1px solid #dfdfdf;\n  outline: 0;\n  border-radius: 16px;\n  box-sizing: border-box;\n  background-color: #dfdfdf;\n  transition: background-color 0.1s, border 0.1s;\n}\n\nuni-switch[disabled] .uni-switch-input {\n  opacity: 0.7;\n}\n\n.uni-switch-input:before {\n  content: ' ';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 50px;\n  height: 30px;\n  border-radius: 15px;\n  background-color: #fdfdfd;\n  transition: transform 0.3s;\n}\n\n.uni-switch-input:after {\n  content: ' ';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  background-color: #ffffff;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\n  transition: transform 0.3s;\n}\n\n.uni-switch-input.uni-switch-input-checked {\n  border-color: #007aff;\n  background-color: #007aff;\n}\n\n.uni-switch-input.uni-switch-input-checked:before {\n  transform: scale(0);\n}\n\n.uni-switch-input.uni-switch-input-checked:after {\n  transform: translateX(20px);\n}\n\nuni-switch .uni-checkbox-input {\n  margin-right: 5px;\n  -webkit-appearance: none;\n          appearance: none;\n  outline: 0;\n  border: 1px solid #d1d1d1;\n  background-color: #ffffff;\n  border-radius: 3px;\n  width: 22px;\n  height: 22px;\n  position: relative;\n  color: #007aff;\n}\n\nuni-switch:not([disabled]) .uni-checkbox-input:hover {\n  border-color: #007aff;\n}\n\nuni-switch .uni-checkbox-input svg {\n  color: inherit;\n  font-size: 22px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -48%) scale(0.73);\n}\n\n.uni-checkbox-input.uni-checkbox-input-disabled {\n  background-color: #e1e1e1;\n}\n\n.uni-checkbox-input.uni-checkbox-input-disabled:before {\n  color: #adadad;\n}\n";
  class UniSwitch extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-switch", Switch, parentNodeId, refNodeId, nodeJson);
    }
  }
  var textarea = "uni-textarea {\n  width: 300px;\n  height: 150px;\n  display: block;\n  position: relative;\n  font-size: 16px;\n  line-height: normal;\n  white-space: pre-wrap;\n  word-break: break-all;\n  box-sizing: content-box !important;\n}\nuni-textarea[hidden] {\n  display: none;\n}\n.uni-textarea-wrapper,\n.uni-textarea-placeholder,\n.uni-textarea-line,\n.uni-textarea-compute,\n.uni-textarea-textarea {\n  outline: none;\n  border: none;\n  padding: 0;\n  margin: 0;\n  text-decoration: inherit;\n}\n.uni-textarea-wrapper {\n  display: block;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  min-height: inherit;\n}\n.uni-textarea-placeholder,\n.uni-textarea-line,\n.uni-textarea-compute,\n.uni-textarea-textarea {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  white-space: inherit;\n  word-break: inherit;\n}\n.uni-textarea-placeholder {\n  color: grey;\n  overflow: hidden;\n}\n.uni-textarea-line,\n.uni-textarea-compute {\n  visibility: hidden;\n  height: auto;\n}\n.uni-textarea-line {\n  width: 1em;\n}\n.uni-textarea-textarea {\n  resize: none;\n  background: none;\n  color: inherit;\n  opacity: 1;\n  font: inherit;\n  line-height: inherit;\n  letter-spacing: inherit;\n  text-align: inherit;\n  text-indent: inherit;\n  text-transform: inherit;\n  text-shadow: inherit;\n}\n/* \u7528\u4E8E\u89E3\u51B3 iOS textarea \u5185\u90E8\u9ED8\u8BA4\u8FB9\u8DDD */\n.uni-textarea-textarea-fix-margin {\n  width: auto;\n  right: 0;\n  margin: 0 -3px;\n}\n.uni-textarea-textarea:disabled {\n  /* \u7528\u4E8E\u91CD\u7F6EiOS14\u4EE5\u4E0B\u7981\u7528\u72B6\u6001\u6587\u5B57\u989C\u8272 */\n  -webkit-text-fill-color: currentcolor;\n}\n";
  class UniTextarea extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-textarea", Textarea, parentNodeId, refNodeId, nodeJson);
    }
  }
  var video = "uni-video {\n  width: 300px;\n  height: 225px;\n  display: inline-block;\n  line-height: 0;\n  overflow: hidden;\n  position: relative;\n}\n\nuni-video[hidden] {\n  display: none;\n}\n\n.uni-video-container {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  background-color: black;\n}\n\n.uni-video-slot {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  pointer-events: none;\n}\n";
  var props$1 = {
    id: {
      type: String,
      default: ""
    },
    src: {
      type: String,
      default: ""
    },
    duration: {
      type: [Number, String],
      default: ""
    },
    controls: {
      type: [Boolean, String],
      default: true
    },
    danmuList: {
      type: Array,
      default() {
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
      default: "contain"
    },
    poster: {
      type: String,
      default: ""
    },
    direction: {
      type: [String, Number],
      default: ""
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
    enablePlayGesture: {
      type: [Boolean, String],
      default: true
    },
    showCenterPlayBtn: {
      type: [Boolean, String],
      default: true
    },
    showLoading: {
      type: [Boolean, String],
      default: true
    },
    codec: {
      type: String,
      default: "hardware"
    },
    httpCache: {
      type: [Boolean, String],
      default: false
    },
    playStrategy: {
      type: [Number, String],
      default: 0
    },
    header: {
      type: Object,
      default() {
        return {};
      }
    },
    advanced: {
      type: Array,
      default() {
        return [];
      }
    }
  };
  var emits = ["play", "pause", "ended", "timeupdate", "fullscreenchange", "fullscreenclick", "waiting", "error"];
  var methods = ["play", "pause", "stop", "seek", "sendDanmu", "playbackRate", "requestFullScreen", "exitFullScreen"];
  var Video = /* @__PURE__ */ defineBuiltInComponent({
    name: "Video",
    props: props$1,
    emits,
    setup(props2, {
      emit: emit2
    }) {
      var rootRef = ref(null);
      var trigger2 = useCustomEvent(rootRef, emit2);
      var containerRef = ref(null);
      var attrs2 = useNativeAttrs(props2, ["id"]);
      var {
        position,
        hidden,
        onParentReady
      } = useNative(containerRef);
      var video2;
      onParentReady(() => {
        video2 = plus.video.createVideoPlayer("video" + Date.now(), Object.assign({}, attrs2.value, position));
        plus.webview.currentWebview().append(video2);
        if (hidden.value) {
          video2.hide();
        }
        emits.forEach((key2) => {
          video2.addEventListener(key2, (event) => {
            trigger2(key2, {}, event.detail);
          });
        });
        watch(() => attrs2.value, (attrs3) => video2.setStyles(attrs3), {
          deep: true
        });
        watch(() => position, (position2) => video2.setStyles(position2), {
          deep: true
        });
        watch(() => hidden.value, (val) => {
          video2[val ? "hide" : "show"]();
          if (!val) {
            video2.setStyles(position);
          }
        });
      });
      var id2 = useContextInfo();
      useSubscribe((type, data) => {
        if (methods.includes(type)) {
          var options;
          switch (type) {
            case "seek":
              options = data.position;
              break;
            case "sendDanmu":
              options = data;
              break;
            case "playbackRate":
              options = data.rate;
              break;
          }
          if (video2) {
            video2[type](options);
          }
        }
      }, id2, true);
      onBeforeUnmount(() => {
        if (video2) {
          video2.close();
        }
      });
      return () => {
        return createVNode("uni-video", {
          "ref": rootRef,
          "id": props2.id
        }, {
          default: () => [createVNode("div", {
            "ref": containerRef,
            "class": "uni-video-container"
          }, null, 512), createVNode("div", {
            "class": "uni-video-slot"
          }, null)],
          _: 1
        }, 8, ["id"]);
      };
    }
  });
  class UniVideo extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-video", Video, parentNodeId, refNodeId, nodeJson, ".uni-video-slot");
    }
  }
  var webview$1 = "uni-web-view {\n  display: inline-block;\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n}\n";
  var props = {
    src: {
      type: String,
      default: ""
    },
    webviewStyles: {
      type: Object,
      default() {
        return {};
      }
    }
  };
  var webview;
  var insertHTMLWebView = ({
    htmlId,
    src,
    webviewStyles
  }) => {
    var parentWebview = plus.webview.currentWebview();
    var styles = extend(webviewStyles, {
      "uni-app": "none",
      isUniH5: true
    });
    var parentTitleNView = parentWebview.getTitleNView();
    if (parentTitleNView) {
      var defaultTop = NAVBAR_HEIGHT + parseFloat(styles.top || "0");
      if (plus.navigator.isImmersedStatusbar()) {
        defaultTop += getStatusbarHeight();
      }
      styles.top = String(defaultTop);
      styles.bottom = styles.bottom || "0";
    }
    webview = plus.webview.create(src, htmlId, styles);
    if (parentTitleNView) {
      webview.addEventListener("titleUpdate", function() {
        var _webview;
        var title = (_webview = webview) === null || _webview === void 0 ? void 0 : _webview.getTitle();
        parentWebview.setStyle({
          titleNView: {
            titleText: !title || title === "null" ? " " : title
          }
        });
      });
    }
    plus.webview.currentWebview().append(webview);
  };
  var removeHTMLWebView = () => {
    var _webview2;
    plus.webview.currentWebview().remove(webview);
    (_webview2 = webview) === null || _webview2 === void 0 ? void 0 : _webview2.close("none");
    webview = null;
  };
  var WebView = /* @__PURE__ */ defineBuiltInComponent({
    name: "WebView",
    props,
    setup(props2) {
      var pageId = getCurrentPageId();
      var containerRef = ref(null);
      var {
        position,
        hidden,
        onParentReady
      } = useNative(containerRef);
      var webviewStyles = computed$1(() => props2.webviewStyles);
      onParentReady(() => {
        var _webview3;
        var htmlId = ref(WEBVIEW_ID_PREFIX + pageId);
        insertHTMLWebView({
          htmlId: htmlId.value,
          src: getRealPath(props2.src),
          webviewStyles: webviewStyles.value
        });
        UniViewJSBridge.publishHandler(WEBVIEW_INSERTED, {}, pageId);
        if (hidden.value)
          (_webview3 = webview) === null || _webview3 === void 0 ? void 0 : _webview3.hide();
      });
      onBeforeUnmount(() => {
        removeHTMLWebView();
        UniViewJSBridge.publishHandler(WEBVIEW_REMOVED, {}, pageId);
      });
      watch(() => props2.src, (val) => {
        var _webview5;
        var realPath = getRealPath(val) || "";
        if (!realPath) {
          return;
        }
        if (/^(http|https):\/\//.test(realPath) && props2.webviewStyles.progress) {
          var _webview4;
          (_webview4 = webview) === null || _webview4 === void 0 ? void 0 : _webview4.setStyle({
            progress: {
              color: props2.webviewStyles.progress.color
            }
          });
        }
        (_webview5 = webview) === null || _webview5 === void 0 ? void 0 : _webview5.loadURL(realPath);
      });
      watch(webviewStyles, (webviewStyles2) => {
        var _webview6;
        (_webview6 = webview) === null || _webview6 === void 0 ? void 0 : _webview6.setStyle(webviewStyles2);
      });
      watch(hidden, (val) => {
        webview && webview[val ? "hide" : "show"]();
      });
      return () => createVNode("uni-web-view", {
        "ref": containerRef
      }, null, 512);
    }
  });
  class UniWebView extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-web-view", WebView, parentNodeId, refNodeId, nodeJson);
    }
  }
  var BuiltInComponents = {
    "#text": UniTextNode,
    "#comment": UniComment,
    VIEW: UniViewElement,
    IMAGE: UniImage,
    TEXT: UniTextElement,
    NAVIGATOR: UniNavigator,
    FORM: UniForm,
    BUTTON: UniButton,
    INPUT: UniInput,
    LABEL: UniLabel,
    RADIO: UniRadio,
    CHECKBOX: UniCheckbox,
    "CHECKBOX-GROUP": UniCheckboxGroup,
    AD: UniAd,
    CAMERA: UniCamera,
    CANVAS: UniCanvas,
    "COVER-IMAGE": UniCoverImage,
    "COVER-VIEW": UniCoverView,
    EDITOR: UniEditor,
    "FUNCTIONAL-PAGE-NAVIGATOR": UniFunctionalPageNavigator,
    ICON: UniIcon,
    "RADIO-GROUP": UniRadioGroup,
    "LIVE-PLAYER": UniLivePlayer,
    "LIVE-PUSHER": UniLivePusher,
    MAP: UniMap,
    "MOVABLE-AREA": UniMovableArea,
    "MOVABLE-VIEW": UniMovableView,
    "OFFICIAL-ACCOUNT": UniOfficialAccount,
    "OPEN-DATA": UniOpenData,
    PICKER: UniPicker,
    "PICKER-VIEW": UniPickerView,
    "PICKER-VIEW-COLUMN": UniPickerViewColumn,
    PROGRESS: UniProgress,
    "RICH-TEXT": UniRichText,
    "SCROLL-VIEW": UniScrollView,
    SLIDER: UniSlider,
    SWIPER: UniSwiper,
    "SWIPER-ITEM": UniSwiperItem,
    SWITCH: UniSwitch,
    TEXTAREA: UniTextarea,
    VIDEO: UniVideo,
    "WEB-VIEW": UniWebView
  };
  function createWrapper(component, props2) {
    return () => h(component, props2);
  }
  var elements = new Map();
  function $(id2) {
    return elements.get(id2);
  }
  function removeElement(id2) {
    {
      console.log(formatLog("Remove", id2, elements.size - 1));
    }
    return elements.delete(id2);
  }
  function createElement(id2, tag, parentNodeId, refNodeId, nodeJson = {}) {
    var element;
    if (id2 === 0) {
      element = new UniNode(id2, tag, parentNodeId, document.createElement(tag));
    } else {
      var Component = BuiltInComponents[tag];
      if (Component) {
        element = new Component(id2, parentNodeId, refNodeId, nodeJson);
      } else {
        element = new UniElement(id2, document.createElement(tag), parentNodeId, refNodeId, nodeJson);
      }
    }
    elements.set(id2, element);
    return element;
  }
  var pageReadyCallbacks = [];
  var isPageReady = false;
  function onPageReady(callback) {
    if (isPageReady) {
      return callback();
    }
    pageReadyCallbacks.push(callback);
  }
  function setPageReady() {
    {
      console.log(formatLog("setPageReady", pageReadyCallbacks.length));
    }
    isPageReady = true;
    pageReadyCallbacks.forEach((fn) => fn());
    pageReadyCallbacks.length = 0;
  }
  function onPageCreated() {
  }
  function onPageCreate({
    css,
    route,
    platform,
    pixelRatio: pixelRatio2,
    windowWidth,
    disableScroll,
    statusbarHeight,
    windowTop,
    windowBottom
  }) {
    initPageInfo(route);
    initSystemInfo(platform, pixelRatio2, windowWidth);
    initPageElement();
    var pageId = plus.webview.currentWebview().id;
    window.__id__ = pageId;
    document.title = "".concat(route, "[").concat(pageId, "]");
    initCssVar(statusbarHeight, windowTop, windowBottom);
    if (disableScroll) {
      document.addEventListener("touchmove", disableScrollListener);
    }
    if (css) {
      initPageCss(route);
    } else {
      setPageReady();
    }
  }
  function initPageInfo(route) {
    window.__PAGE_INFO__ = {
      route
    };
  }
  function initSystemInfo(platform, pixelRatio2, windowWidth) {
    window.__SYSTEM_INFO__ = {
      platform,
      pixelRatio: pixelRatio2,
      windowWidth
    };
  }
  function initPageElement() {
    createElement(0, "div", -1, -1).$ = document.getElementById("app");
  }
  function initPageCss(route) {
    {
      console.log(formatLog("initPageCss", route + ".css"));
    }
    var element = document.createElement("link");
    element.type = "text/css";
    element.rel = "stylesheet";
    element.href = route + ".css";
    element.onload = setPageReady;
    element.onerror = setPageReady;
    document.head.appendChild(element);
  }
  function initCssVar(statusbarHeight, windowTop, windowBottom) {
    var cssVars = {
      "--window-left": "0px",
      "--window-right": "0px",
      "--window-top": windowTop + "px",
      "--window-bottom": windowBottom + "px",
      "--status-bar-height": statusbarHeight + "px"
    };
    {
      console.log(formatLog("initCssVar", cssVars));
    }
    updateCssVar(cssVars);
  }
  var isPageScrollInited = false;
  function initPageScroll(onReachBottomDistance) {
    if (isPageScrollInited) {
      return;
    }
    isPageScrollInited = true;
    var opts = {
      onReachBottomDistance,
      onPageScroll(scrollTop) {
        UniViewJSBridge.publishHandler(ON_PAGE_SCROLL, {
          scrollTop
        });
      },
      onReachBottom() {
        UniViewJSBridge.publishHandler(ON_REACH_BOTTOM);
      }
    };
    requestAnimationFrame(() => document.addEventListener("scroll", createScrollListener(opts)));
  }
  function pageScrollTo({
    scrollTop,
    selector,
    duration
  }, publish) {
    scrollTo(selector || scrollTop || 0, duration);
    publish();
  }
  function onVdSync(actions) {
    {
      console.log(formatLog("onVdSync", actions));
    }
    var firstAction = actions[0];
    if (firstAction[0] === ACTION_TYPE_PAGE_CREATE) {
      onPageCreateSync(firstAction);
    } else {
      onPageReady(() => onPageUpdateSync(actions));
    }
  }
  function onPageCreateSync(action) {
    return onPageCreate(action[1]);
  }
  function onPageUpdateSync(actions) {
    var dictAction = actions[0];
    var getDict = createGetDict(dictAction[0] === ACTION_TYPE_DICT ? dictAction[1] : []);
    actions.forEach((action) => {
      switch (action[0]) {
        case ACTION_TYPE_PAGE_CREATE:
          return onPageCreate(action[1]);
        case ACTION_TYPE_PAGE_CREATED:
          return onPageCreated();
        case ACTION_TYPE_CREATE:
          return createElement(action[1], getDict(action[2]), action[3], action[4], decodeNodeJson(getDict, action[5]));
        case ACTION_TYPE_REMOVE:
          return $(action[1]).remove();
        case ACTION_TYPE_SET_ATTRIBUTE:
          return $(action[1]).setAttr(getDict(action[2]), getDict(action[3]));
        case ACTION_TYPE_REMOVE_ATTRIBUTE:
          return $(action[1]).removeAttr(getDict(action[2]));
        case ACTION_TYPE_ADD_EVENT:
          return $(action[1]).addEvent(getDict(action[2]), action[3]);
        case ACTION_TYPE_REMOVE_EVENT:
          return $(action[1]).removeEvent(getDict(action[2]));
        case ACTION_TYPE_SET_TEXT:
          return $(action[1]).setText(getDict(action[2]));
        case ACTION_TYPE_PAGE_SCROLL:
          return initPageScroll(action[1]);
      }
    });
    flushPostActionJobs();
  }
  function initSubscribeHandlers() {
    var {
      subscribe
    } = UniViewJSBridge;
    subscribe(VD_SYNC, onVdSync);
  }
  function findElem(vm) {
    {
      return window.__$__(vm).$;
    }
  }
  function getRootInfo(fields2) {
    var info = {};
    if (fields2.id) {
      info.id = "";
    }
    if (fields2.dataset) {
      info.dataset = {};
    }
    if (fields2.rect) {
      info.left = 0;
      info.right = 0;
      info.top = 0;
      info.bottom = 0;
    }
    if (fields2.size) {
      info.width = document.documentElement.clientWidth;
      info.height = document.documentElement.clientHeight;
    }
    if (fields2.scrollOffset) {
      var documentElement = document.documentElement;
      var body = document.body;
      info.scrollLeft = documentElement.scrollLeft || body.scrollLeft || 0;
      info.scrollTop = documentElement.scrollTop || body.scrollTop || 0;
      info.scrollHeight = documentElement.scrollHeight || body.scrollHeight || 0;
      info.scrollWidth = documentElement.scrollWidth || body.scrollWidth || 0;
    }
    return info;
  }
  function getNodeInfo(el, fields2) {
    var info = {};
    var {
      top
    } = getWindowOffset();
    if (fields2.id) {
      info.id = el.id;
    }
    if (fields2.dataset) {
      info.dataset = getCustomDataset(el);
    }
    if (fields2.rect || fields2.size) {
      var rect = el.getBoundingClientRect();
      if (fields2.rect) {
        info.left = rect.left;
        info.right = rect.right;
        info.top = rect.top - top;
        info.bottom = rect.bottom - top;
      }
      if (fields2.size) {
        info.width = rect.width;
        info.height = rect.height;
      }
    }
    if (Array.isArray(fields2.properties)) {
      fields2.properties.forEach((prop) => {
        prop = prop.replace(/-([a-z])/g, function(e2, t2) {
          return t2.toUpperCase();
        });
      });
    }
    if (fields2.scrollOffset) {
      if (el.tagName === "UNI-SCROLL-VIEW") {
        var scroll = el.children[0].children[0];
        info.scrollLeft = scroll.scrollLeft;
        info.scrollTop = scroll.scrollTop;
        info.scrollHeight = scroll.scrollHeight;
        info.scrollWidth = scroll.scrollWidth;
      } else {
        info.scrollLeft = 0;
        info.scrollTop = 0;
        info.scrollHeight = 0;
        info.scrollWidth = 0;
      }
    }
    if (Array.isArray(fields2.computedStyle)) {
      var sytle = getComputedStyle(el);
      fields2.computedStyle.forEach((name) => {
        info[name] = sytle[name];
      });
    }
    if (fields2.context) {
      info.contextInfo = getContextInfo(el);
    }
    return info;
  }
  function findElm(component, pageVm2) {
    if (!component) {
      return pageVm2.$el;
    }
    {
      return window.__$__(component).$;
    }
  }
  function matches(element, selectors) {
    var matches2 = element.matches || element.matchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector || function(selectors2) {
      var matches3 = this.parentElement.querySelectorAll(selectors2);
      var i2 = matches3.length;
      while (--i2 >= 0 && matches3.item(i2) !== this) {
      }
      return i2 > -1;
    };
    return matches2.call(element, selectors);
  }
  function getNodesInfo(pageVm2, component, selector, single, fields2) {
    var selfElement = findElm(component, pageVm2);
    var parentElement = selfElement.parentElement;
    if (!parentElement) {
      return single ? null : [];
    }
    var {
      nodeType
    } = selfElement;
    var maybeFragment = nodeType === 3 || nodeType === 8;
    if (single) {
      var node = maybeFragment ? parentElement.querySelector(selector) : matches(selfElement, selector) ? selfElement : selfElement.querySelector(selector);
      if (node) {
        return getNodeInfo(node, fields2);
      }
      return null;
    } else {
      var infos = [];
      var nodeList = (maybeFragment ? parentElement : selfElement).querySelectorAll(selector);
      if (nodeList && nodeList.length) {
        [].forEach.call(nodeList, (node2) => {
          infos.push(getNodeInfo(node2, fields2));
        });
      }
      if (!maybeFragment && matches(selfElement, selector)) {
        infos.unshift(getNodeInfo(selfElement, fields2));
      }
      return infos;
    }
  }
  function requestComponentInfo(page, reqs, callback) {
    var result = [];
    reqs.forEach(({
      component,
      selector,
      single,
      fields: fields2
    }) => {
      if (component === null) {
        result.push(getRootInfo(fields2));
      } else {
        result.push(getNodesInfo(page, component, selector, single, fields2));
      }
    });
    callback(result);
  }
  function addIntersectionObserver({
    reqId,
    component,
    options,
    callback
  }, _pageId) {
    var $el = findElem(component);
    ($el.__io || ($el.__io = {}))[reqId] = requestComponentObserver($el, options, callback);
  }
  function removeIntersectionObserver({
    reqId,
    component
  }, _pageId) {
    var $el = findElem(component);
    var intersectionObserver = $el.__io && $el.__io[reqId];
    if (intersectionObserver) {
      intersectionObserver.disconnect();
      delete $el.__io[reqId];
    }
  }
  function loadFontFace({
    family,
    source,
    desc
  }, publish) {
    addFont(family, source, desc).then(() => {
      publish();
    }).catch((err) => {
      publish(err.toString());
    });
  }
  var pageVm = {
    $el: document.body
  };
  function initViewMethods() {
    var pageId = getCurrentPageId();
    subscribeViewMethod(pageId, (fn) => {
      return (...args) => {
        onPageReady(() => {
          fn.apply(null, args);
        });
      };
    });
    registerViewMethod(pageId, "requestComponentInfo", (args, publish) => {
      requestComponentInfo(pageVm, args.reqs, publish);
    });
    registerViewMethod(pageId, "addIntersectionObserver", (args) => {
      addIntersectionObserver(extend({}, args, {
        callback(res) {
          UniViewJSBridge.publishHandler(args.eventName, res);
        }
      }));
    });
    registerViewMethod(pageId, "removeIntersectionObserver", (args) => {
      removeIntersectionObserver(args);
    });
    registerViewMethod(pageId, API_PAGE_SCROLL_TO, pageScrollTo);
    registerViewMethod(pageId, API_LOAD_FONT_FACE, loadFontFace);
  }
  window.uni = uni$1;
  window.UniViewJSBridge = UniViewJSBridge$1;
  window.rpx2px = upx2px;
  window.__$__ = $;
  function onWebviewReady() {
    initView();
    initViewMethods();
    initSubscribeHandlers();
    preventDoubleTap();
    UniViewJSBridge$1.publishHandler(ON_WEBVIEW_READY);
  }
  if (typeof plus !== "undefined") {
    onWebviewReady();
  } else {
    document.addEventListener("plusready", onWebviewReady);
  }
});
