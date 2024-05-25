(function(factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function() {
  "use strict";
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var _wks = { exports: {} };
  var _shared = { exports: {} };
  var _core = { exports: {} };
  var core$2 = _core.exports = {
    version: "2.6.12"
  };
  if (typeof __e == "number")
    __e = core$2;
  var _coreExports = _core.exports;
  var _global = { exports: {} };
  var global$4 = _global.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
  if (typeof __g == "number")
    __g = global$4;
  var _globalExports = _global.exports;
  var core$1 = _coreExports;
  var global$3 = _globalExports;
  var SHARED = "__core-js_shared__";
  var store$1 = global$3[SHARED] || (global$3[SHARED] = {});
  (_shared.exports = function(key2, value) {
    return store$1[key2] || (store$1[key2] = value !== void 0 ? value : {});
  })("versions", []).push({
    version: core$1.version,
    mode: "global",
    copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
  });
  var _sharedExports = _shared.exports;
  var id = 0;
  var px = Math.random();
  var _uid = function(key2) {
    return "Symbol(".concat(key2 === void 0 ? "" : key2, ")_", (++id + px).toString(36));
  };
  var store = _sharedExports("wks");
  var uid$3 = _uid;
  var Symbol$1 = _globalExports.Symbol;
  var USE_SYMBOL = typeof Symbol$1 == "function";
  var $exports = _wks.exports = function(name) {
    return store[name] || (store[name] = USE_SYMBOL && Symbol$1[name] || (USE_SYMBOL ? Symbol$1 : uid$3)("Symbol." + name));
  };
  $exports.store = store;
  var _wksExports = _wks.exports;
  var _objectDp = {};
  var _isObject = function(it) {
    return typeof it === "object" ? it !== null : typeof it === "function";
  };
  var isObject$3 = _isObject;
  var _anObject = function(it) {
    if (!isObject$3(it))
      throw TypeError(it + " is not an object!");
    return it;
  };
  var _fails = function(exec) {
    try {
      return !!exec();
    } catch (e) {
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
  var _domCreate;
  var hasRequired_domCreate;
  function require_domCreate() {
    if (hasRequired_domCreate)
      return _domCreate;
    hasRequired_domCreate = 1;
    var isObject2 = _isObject;
    var document2 = _globalExports.document;
    var is = isObject2(document2) && isObject2(document2.createElement);
    _domCreate = function(it) {
      return is ? document2.createElement(it) : {};
    };
    return _domCreate;
  }
  var _ie8DomDefine = !_descriptors && !_fails(function() {
    return Object.defineProperty(require_domCreate()("div"), "a", {
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
      } catch (e) {
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
  var UNSCOPABLES = _wksExports("unscopables");
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
  var toString$2 = {}.toString;
  var _cof = function(it) {
    return toString$2.call(it).slice(8, -1);
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
  var hasOwnProperty$3 = {}.hasOwnProperty;
  var _has = function(it, key2) {
    return hasOwnProperty$3.call(it, key2);
  };
  var _functionToString = _sharedExports("native-function-to-string", Function.toString);
  var global$2 = _globalExports;
  var hide$3 = _hide;
  var has$4 = _has;
  var SRC = _uid("src");
  var $toString = _functionToString;
  var TO_STRING = "toString";
  var TPL = ("" + $toString).split(TO_STRING);
  _coreExports.inspectSource = function(it) {
    return $toString.call(it);
  };
  (_redefine.exports = function(O, key2, val, safe) {
    var isFunction2 = typeof val == "function";
    if (isFunction2)
      has$4(val, "name") || hide$3(val, "name", key2);
    if (O[key2] === val)
      return;
    if (isFunction2)
      has$4(val, SRC) || hide$3(val, SRC, O[key2] ? "" + O[key2] : TPL.join(String(key2)));
    if (O === global$2) {
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
  var _redefineExports = _redefine.exports;
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
        return function(a) {
          return fn.call(that, a);
        };
      case 2:
        return function(a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function(a, b, c2) {
          return fn.call(that, a, b, c2);
        };
    }
    return function() {
      return fn.apply(that, arguments);
    };
  };
  var global$1 = _globalExports;
  var core = _coreExports;
  var hide$2 = _hide;
  var redefine$2 = _redefineExports;
  var ctx = _ctx;
  var PROTOTYPE$1 = "prototype";
  var $export$3 = function(type, name, source) {
    var IS_FORCED = type & $export$3.F;
    var IS_GLOBAL = type & $export$3.G;
    var IS_STATIC = type & $export$3.S;
    var IS_PROTO = type & $export$3.P;
    var IS_BIND = type & $export$3.B;
    var target = IS_GLOBAL ? global$1 : IS_STATIC ? global$1[name] || (global$1[name] = {}) : (global$1[name] || {})[PROTOTYPE$1];
    var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
    var expProto = exports[PROTOTYPE$1] || (exports[PROTOTYPE$1] = {});
    var key2, own, out2, exp;
    if (IS_GLOBAL)
      source = name;
    for (key2 in source) {
      own = !IS_FORCED && target && target[key2] !== void 0;
      out2 = (own ? target : source)[key2];
      exp = IS_BIND && own ? ctx(out2, global$1) : IS_PROTO && typeof out2 == "function" ? ctx(Function.call, out2) : out2;
      if (target)
        redefine$2(target, key2, out2, type & $export$3.U);
      if (exports[key2] != out2)
        hide$2(exports, key2, exp);
      if (IS_PROTO && expProto[key2] != out2)
        expProto[key2] = out2;
    }
  };
  global$1.core = core;
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
  var _toAbsoluteIndex = function(index, length) {
    index = toInteger(index);
    return index < 0 ? max(index + length, 0) : min(index, length);
  };
  var toIObject$3 = _toIobject;
  var toLength = _toLength;
  var toAbsoluteIndex = _toAbsoluteIndex;
  var _arrayIncludes = function(IS_INCLUDES) {
    return function($this, el, fromIndex) {
      var O = toIObject$3($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      if (IS_INCLUDES && el != el)
        while (length > index) {
          value = O[index++];
          if (value != value)
            return true;
        }
      else
        for (; length > index; index++) {
          if (IS_INCLUDES || index in O) {
            if (O[index] === el)
              return IS_INCLUDES || index || 0;
          }
        }
      return !IS_INCLUDES && -1;
    };
  };
  var shared = _sharedExports("keys");
  var uid$2 = _uid;
  var _sharedKey = function(key2) {
    return shared[key2] || (shared[key2] = uid$2(key2));
  };
  var has$3 = _has;
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
        has$3(O, key2) && result.push(key2);
    }
    while (names.length > i2) {
      if (has$3(O, key2 = names[i2++])) {
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
  var _html;
  var hasRequired_html;
  function require_html() {
    if (hasRequired_html)
      return _html;
    hasRequired_html = 1;
    var document2 = _globalExports.document;
    _html = document2 && document2.documentElement;
    return _html;
  }
  var anObject = _anObject;
  var dPs = _objectDps;
  var enumBugKeys = _enumBugKeys;
  var IE_PROTO$1 = _sharedKey("IE_PROTO");
  var Empty = function() {
  };
  var PROTOTYPE = "prototype";
  var createDict = function() {
    var iframe = require_domCreate()("iframe");
    var i2 = enumBugKeys.length;
    var lt = "<";
    var gt = ">";
    var iframeDocument;
    iframe.style.display = "none";
    require_html().appendChild(iframe);
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
  var has$2 = _has;
  var TAG = _wksExports("toStringTag");
  var _setToStringTag = function(it, tag, stat) {
    if (it && !has$2(it = stat ? it : it.prototype, TAG))
      def$1(it, TAG, {
        configurable: true,
        value: tag
      });
  };
  var create = _objectCreate;
  var descriptor = _propertyDesc;
  var setToStringTag$1 = _setToStringTag;
  var IteratorPrototype = {};
  _hide(IteratorPrototype, _wksExports("iterator"), function() {
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
  var has$1 = _has;
  var toObject$1 = _toObject;
  var IE_PROTO = _sharedKey("IE_PROTO");
  var ObjectProto = Object.prototype;
  var _objectGpo = Object.getPrototypeOf || function(O) {
    O = toObject$1(O);
    if (has$1(O, IE_PROTO))
      return O[IE_PROTO];
    if (typeof O.constructor == "function" && O instanceof O.constructor) {
      return O.constructor.prototype;
    }
    return O instanceof Object ? ObjectProto : null;
  };
  var $export$2 = _export;
  var redefine$1 = _redefineExports;
  var hide$1 = _hide;
  var Iterators$2 = _iterators;
  var $iterCreate = _iterCreate;
  var setToStringTag = _setToStringTag;
  var getPrototypeOf = _objectGpo;
  var ITERATOR$1 = _wksExports("iterator");
  var BUGGY = !([].keys && "next" in [].keys());
  var FF_ITERATOR = "@@iterator";
  var KEYS = "keys";
  var VALUES = "values";
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
        case VALUES:
          return function values() {
            return new Constructor(this, kind);
          };
      }
      return function entries() {
        return new Constructor(this, kind);
      };
    };
    var TAG2 = NAME2 + " Iterator";
    var DEF_VALUES = DEFAULT == VALUES;
    var VALUES_BUG = false;
    var proto2 = Base.prototype;
    var $native = proto2[ITERATOR$1] || proto2[FF_ITERATOR] || DEFAULT && proto2[DEFAULT];
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod("entries") : void 0;
    var $anyNative = NAME2 == "Array" ? proto2.entries || $native : $native;
    var methods, key2, IteratorPrototype2;
    if ($anyNative) {
      IteratorPrototype2 = getPrototypeOf($anyNative.call(new Base()));
      if (IteratorPrototype2 !== Object.prototype && IteratorPrototype2.next) {
        setToStringTag(IteratorPrototype2, TAG2, true);
        if (typeof IteratorPrototype2[ITERATOR$1] != "function")
          hide$1(IteratorPrototype2, ITERATOR$1, returnThis);
      }
    }
    if (DEF_VALUES && $native && $native.name !== VALUES) {
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
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries
      };
      if (FORCED)
        for (key2 in methods) {
          if (!(key2 in proto2))
            redefine$1(proto2, key2, methods[key2]);
        }
      else
        $export$2($export$2.P + $export$2.F * (BUGGY || VALUES_BUG), NAME2, methods);
    }
    return methods;
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
    var index = this._i++;
    if (!O || index >= O.length) {
      this._t = void 0;
      return step(1);
    }
    if (kind == "keys")
      return step(0, index);
    if (kind == "values")
      return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, "values");
  Iterators$1.Arguments = Iterators$1.Array;
  addToUnscopables("keys");
  addToUnscopables("values");
  addToUnscopables("entries");
  var $iterators = es6_array_iterator;
  var getKeys$1 = _objectKeys;
  var redefine = _redefineExports;
  var global = _globalExports;
  var hide = _hide;
  var Iterators = _iterators;
  var wks = _wksExports;
  var ITERATOR = wks("iterator");
  var TO_STRING_TAG = wks("toStringTag");
  var ArrayValues = Iterators.Array;
  var DOMIterables = {
    CSSRuleList: true,
    // TODO: Not spec compliant, should be false.
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
    // TODO: Not spec compliant, should be false.
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
    // TODO: Not spec compliant, should be false.
    TextTrackCueList: false,
    TextTrackList: false,
    TouchList: false
  };
  for (var collections = getKeys$1(DOMIterables), i = 0; i < collections.length; i++) {
    var NAME$1 = collections[i];
    var explicit = DOMIterables[NAME$1];
    var Collection = global[NAME$1];
    var proto = Collection && Collection.prototype;
    var key;
    if (proto) {
      if (!proto[ITERATOR])
        hide(proto, ITERATOR, ArrayValues);
      if (!proto[TO_STRING_TAG])
        hide(proto, TO_STRING_TAG, NAME$1);
      Iterators[NAME$1] = ArrayValues;
      if (explicit) {
        for (key in $iterators) {
          if (!proto[key])
            redefine(proto, key, $iterators[key], true);
        }
      }
    }
  }
  /**
  * @vue/shared v3.4.21
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  function makeMap(str, expectsLowerCase) {
    var set2 = new Set(str.split(","));
    return expectsLowerCase ? (val) => set2.has(val.toLowerCase()) : (val) => set2.has(val);
  }
  var EMPTY_OBJ = {};
  var EMPTY_ARR = [];
  var NOOP = () => {
  };
  var NO = () => false;
  var isOn = (key2) => key2.charCodeAt(0) === 111 && key2.charCodeAt(1) === 110 && // uppercase letter
  (key2.charCodeAt(2) > 122 || key2.charCodeAt(2) < 97);
  var isModelListener = (key2) => key2.startsWith("onUpdate:");
  var extend = Object.assign;
  var remove = (arr, el) => {
    var i2 = arr.indexOf(el);
    if (i2 > -1) {
      arr.splice(i2, 1);
    }
  };
  var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
  var hasOwn$1 = (val, key2) => hasOwnProperty$2.call(val, key2);
  var isArray = Array.isArray;
  var isMap = (val) => toTypeString(val) === "[object Map]";
  var isSet = (val) => toTypeString(val) === "[object Set]";
  var isFunction = (val) => typeof val === "function";
  var isString = (val) => typeof val === "string";
  var isSymbol = (val) => typeof val === "symbol";
  var isObject$1 = (val) => val !== null && typeof val === "object";
  var isPromise = (val) => {
    return (isObject$1(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
  };
  var objectToString = Object.prototype.toString;
  var toTypeString = (value) => objectToString.call(value);
  var toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  var isPlainObject = (val) => toTypeString(val) === "[object Object]";
  var isIntegerKey = (key2) => isString(key2) && key2 !== "NaN" && key2[0] !== "-" && "" + parseInt(key2, 10) === key2;
  var isReservedProp = /* @__PURE__ */ makeMap(
    // the leading comma is intentional so empty string "" is also included
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  );
  var cacheStringFunction$1 = (fn) => {
    var cache2 = /* @__PURE__ */ Object.create(null);
    return (str) => {
      var hit = cache2[str];
      return hit || (cache2[str] = fn(str));
    };
  };
  var camelizeRE = /-(\w)/g;
  var camelize = cacheStringFunction$1((str) => {
    return str.replace(camelizeRE, (_, c2) => c2 ? c2.toUpperCase() : "");
  });
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cacheStringFunction$1((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
  var capitalize = cacheStringFunction$1((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  var toHandlerKey = cacheStringFunction$1((str) => {
    var s = str ? "on".concat(capitalize(str)) : "";
    return s;
  });
  var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
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
  var looseToNumber = (val) => {
    var n = parseFloat(val);
    return isNaN(n) ? val : n;
  };
  var _globalThis;
  var getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof window !== "undefined" ? window : {});
  };
  function normalizeStyle(value) {
    if (isArray(value)) {
      var res = {};
      for (var i2 = 0; i2 < value.length; i2++) {
        var item = value[i2];
        var normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) {
          for (var key2 in normalized) {
            res[key2] = normalized[key2];
          }
        }
      }
      return res;
    } else if (isString(value) || isObject$1(value)) {
      return value;
    }
  }
  var listDelimiterRE = /;(?![^(]*\))/g;
  var propertyDelimiterRE = /:([^]+)/;
  var styleCommentRE = /\/\*[^]*?\*\//g;
  function parseStringStyle(cssText) {
    var ret = {};
    cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
      if (item) {
        var tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  function stringifyStyle(styles) {
    var ret = "";
    if (!styles || isString(styles)) {
      return ret;
    }
    for (var key2 in styles) {
      var value = styles[key2];
      var normalizedKey = key2.startsWith("--") ? key2 : hyphenate(key2);
      if (isString(value) || typeof value === "number") {
        ret += "".concat(normalizedKey, ":").concat(value, ";");
      }
    }
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
  var specialBooleanAttrs = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
  var isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
  function includeBooleanAttr(value) {
    return !!value || value === "";
  }
  var _strictMethod;
  var hasRequired_strictMethod;
  function require_strictMethod() {
    if (hasRequired_strictMethod)
      return _strictMethod;
    hasRequired_strictMethod = 1;
    var fails2 = _fails;
    _strictMethod = function(method, arg) {
      return !!method && fails2(function() {
        arg ? method.call(null, function() {
        }, 1) : method.call(null);
      });
    };
    return _strictMethod;
  }
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
  }) || !require_strictMethod()($sort)), "Array", {
    // 22.1.3.25 Array.prototype.sort(comparefn)
    sort: function sort(comparefn) {
      return comparefn === void 0 ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction(comparefn));
    }
  });
  var LINEFEED = "\n";
  var SCHEME_RE = /^([a-z-]+:)?\/\//i;
  var DATA_RE = /^data:.*,.*/;
  var WXS_PROTOCOL = "wxs://";
  var JSON_PROTOCOL = "json://";
  var WXS_MODULES = "wxsModules";
  var RENDERJS_MODULES = "renderjsModules";
  var ON_PAGE_SCROLL = "onPageScroll";
  var ON_REACH_BOTTOM = "onReachBottom";
  var ON_WXS_INVOKE_CALL_METHOD = "onWxsInvokeCallMethod";
  var lastLogTime = 0;
  function formatLog(module) {
    var now = Date.now();
    var diff = lastLogTime ? now - lastLogTime : 0;
    lastLogTime = now;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return "[".concat(now, "][").concat(diff, "ms][").concat(module, "]：").concat(args.map((arg) => JSON.stringify(arg)).join(" "));
  }
  function cache(fn) {
    var cache2 = /* @__PURE__ */ Object.create(null);
    return (str) => {
      var hit = cache2[str];
      return hit || (cache2[str] = fn(str));
    };
  }
  function cacheStringFunction(fn) {
    return cache(fn);
  }
  function hasLeadingSlash(str) {
    return str.indexOf("/") === 0;
  }
  function addLeadingSlash(str) {
    return hasLeadingSlash(str) ? str : "/" + str;
  }
  function once(fn) {
    var ctx2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    var res;
    return function() {
      if (fn) {
        for (var _len2 = arguments.length, args = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
          args[_key3] = arguments[_key3];
        }
        res = fn.apply(ctx2, args);
        fn = null;
      }
      return res;
    };
  }
  function getValueByDataPath(obj, path) {
    if (!isString(path)) {
      return;
    }
    path = path.replace(/\[(\d+)\]/g, ".$1");
    var parts = path.split(".");
    var key2 = parts[0];
    if (!obj) {
      obj = {};
    }
    if (parts.length === 1) {
      return obj[key2];
    }
    return getValueByDataPath(obj[key2], parts.slice(1).join("."));
  }
  function formatKey(key2) {
    return camelize(key2.substring(5));
  }
  var initCustomDatasetOnce = /* @__PURE__ */ once(() => {
    var prototype = HTMLElement.prototype;
    var setAttribute = prototype.setAttribute;
    prototype.setAttribute = function(key2, value) {
      if (key2.startsWith("data-") && this.tagName.startsWith("UNI-")) {
        var dataset = this.__uniDataset || (this.__uniDataset = {});
        dataset[formatKey(key2)] = value;
      }
      setAttribute.call(this, key2, value);
    };
    var removeAttribute = prototype.removeAttribute;
    prototype.removeAttribute = function(key2) {
      if (this.__uniDataset && key2.startsWith("data-") && this.tagName.startsWith("UNI-")) {
        delete this.__uniDataset[formatKey(key2)];
      }
      removeAttribute.call(this, key2);
    };
  });
  function getCustomDataset(el) {
    return extend({}, el.dataset, el.__uniDataset);
  }
  var unitRE = new RegExp(`"[^"]+"|'[^']+'|url\\([^)]+\\)|(\\d*\\.?\\d+)[r|u]px`, "g");
  function toFixed(number, precision) {
    var multiplier = Math.pow(10, precision + 1);
    var wholeNumber = Math.floor(number * multiplier);
    return Math.round(wholeNumber / 10) * 10 / multiplier;
  }
  var defaultRpx2Unit = {
    unit: "rem",
    unitRatio: 10 / 320,
    unitPrecision: 5
  };
  function createRpx2Unit(unit2, unitRatio2, unitPrecision2) {
    return (val) => val.replace(unitRE, (m, $1) => {
      if (!$1) {
        return m;
      }
      if (unitRatio2 === 1) {
        return "".concat($1).concat(unit2);
      }
      var value = toFixed(parseFloat($1) * unitRatio2, unitPrecision2);
      return value === 0 ? "0" : "".concat(value).concat(unit2);
    });
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
        fonts.add && fonts.add(fontFace);
      });
    }
    return new Promise((resolve) => {
      var style = document.createElement("style");
      var values = [];
      if (desc) {
        var {
          style: style2,
          weight,
          stretch,
          unicodeRange,
          variant,
          featureSettings
        } = desc;
        style2 && values.push("font-style:".concat(style2));
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
  function scrollTo(scrollTop, duration, isH5) {
    if (isString(scrollTop)) {
      var el = document.querySelector(scrollTop);
      if (el) {
        var {
          top
        } = el.getBoundingClientRect();
        scrollTop = top + window.pageYOffset;
        var pageHeader = document.querySelector("uni-page-head");
        if (pageHeader) {
          scrollTop -= pageHeader.offsetHeight;
        }
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
    if (!isFunction(callback)) {
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
  var EventModifierFlags = /* @__PURE__ */ (() => {
    return {
      stop: 1,
      prevent: 1 << 1,
      self: 1 << 2
    };
  })();
  var ATTR_CLASS = "class";
  var ATTR_STYLE = "style";
  var ATTR_INNER_HTML = "innerHTML";
  var ATTR_TEXT_CONTENT = "textContent";
  var ATTR_V_SHOW = ".vShow";
  var ATTR_V_OWNER_ID = ".vOwnerId";
  var ATTR_V_RENDERJS = ".vRenderjs";
  var ATTR_CHANGE_PREFIX = "change:";
  var ACTION_TYPE_PAGE_CREATE = 1;
  var ACTION_TYPE_PAGE_CREATED = 2;
  var ACTION_TYPE_CREATE = 3;
  var ACTION_TYPE_INSERT = 4;
  var ACTION_TYPE_REMOVE = 5;
  var ACTION_TYPE_SET_ATTRIBUTE = 6;
  var ACTION_TYPE_REMOVE_ATTRIBUTE = 7;
  var ACTION_TYPE_ADD_EVENT = 8;
  var ACTION_TYPE_REMOVE_EVENT = 9;
  var ACTION_TYPE_SET_TEXT = 10;
  var ACTION_TYPE_ADD_WXS_EVENT = 12;
  var ACTION_TYPE_PAGE_SCROLL = 15;
  var ACTION_TYPE_EVENT = 20;
  var E = function() {
  };
  E.prototype = {
    on: function(name, callback, ctx2) {
      var e = this.e || (this.e = {});
      (e[name] || (e[name] = [])).push({
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
      var e = this.e || (this.e = {});
      var evts = e[name];
      var liveEvents = [];
      if (evts && callback) {
        for (var i2 = evts.length - 1; i2 >= 0; i2--) {
          if (evts[i2].fn === callback || evts[i2].fn._ === callback) {
            evts.splice(i2, 1);
            break;
          }
        }
        liveEvents = evts;
      }
      liveEvents.length ? e[name] = liveEvents : delete e[name];
      return this;
    }
  };
  var E$1 = E;
  var isObject = (val) => val !== null && typeof val === "object";
  var defaultDelimiters = ["{", "}"];
  class BaseFormatter {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile$1(tokens, values);
    }
  }
  var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format, _ref) {
    var [startDelimiter, endDelimiter] = _ref;
    var tokens = [];
    var position = 0;
    var text = "";
    while (position < format.length) {
      var char = format[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({
            type: "text",
            value: text
          });
        }
        text = "";
        var sub = "";
        char = format[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format[position++];
        }
        var isClosed = char === endDelimiter;
        var type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({
          value: sub,
          type
        });
      } else {
        text += char;
      }
    }
    text && tokens.push({
      type: "text",
      value: text
    });
    return tokens;
  }
  function compile$1(tokens, values) {
    var compiled = [];
    var index = 0;
    var mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index < tokens.length) {
      var token = tokens[index];
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
  var LOCALE_ZH_HANS = "zh-Hans";
  var LOCALE_ZH_HANT = "zh-Hant";
  var LOCALE_EN = "en";
  var LOCALE_FR = "fr";
  var LOCALE_ES = "es";
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var hasOwn = (val, key2) => hasOwnProperty$1.call(val, key2);
  var defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages2) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages2 && messages2[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    var locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
    if (messages2 && Object.keys(messages2).length > 0) {
      locales = Object.keys(messages2);
    }
    var lang = startsWith(locale, locales);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor(_ref2) {
      var {
        locale,
        fallbackLocale,
        messages: messages2,
        watcher,
        formater: formater2
      } = _ref2;
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater2 || defaultFormatter;
      this.messages = messages2 || {};
      this.setLocale(locale || LOCALE_EN);
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
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn) {
      var index = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index, 1);
      };
    }
    add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach((key2) => {
            if (!hasOwn(curMessages, key2)) {
              curMessages[key2] = message[key2];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
    f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join("");
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
  function watchAppLocale(appVm, i18n2) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n2.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n2.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof window !== "undefined" && window.getLocale) {
      return window.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale) {
    var messages2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var fallbackLocale = arguments.length > 2 ? arguments[2] : void 0;
    var watcher = arguments.length > 3 ? arguments[3] : void 0;
    if (typeof locale !== "string") {
      var options = [messages2, locale];
      locale = options[0];
      messages2 = options[1];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    var i18n2 = new I18n({
      locale,
      fallbackLocale,
      messages: messages2,
      watcher
    });
    var t = (key2, values) => {
      if (typeof getApp !== "function") {
        t = function(key22, values2) {
          return i18n2.t(key22, values2);
        };
      } else {
        var isWatchedAppLocale = false;
        t = function(key22, values2) {
          var appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n2);
            }
          }
          return i18n2.t(key22, values2);
        };
      }
      return t(key2, values);
    };
    return {
      i18n: i18n2,
      f(message, values, delimiters) {
        return i18n2.f(message, values, delimiters);
      },
      t(key2, values) {
        return t(key2, values);
      },
      add(locale2, message) {
        var override = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
        return i18n2.add(locale2, message, override);
      },
      watch(fn) {
        return i18n2.watchLocale(fn);
      },
      getLocale() {
        return i18n2.getLocale();
      },
      setLocale(newLocale) {
        return i18n2.setLocale(newLocale);
      }
    };
  }
  var isEnableLocale = /* @__PURE__ */ once(() => typeof __uniConfig !== "undefined" && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length);
  var i18n;
  function useI18n() {
    if (!i18n) {
      var locale;
      {
        if (typeof getApp === "function") {
          locale = weex.requireModule("plus").getLanguage();
        } else {
          locale = plus.webview.currentWebview().getStyle().locale;
        }
      }
      i18n = initVueI18n(locale);
      if (isEnableLocale()) {
        var localeKeys = Object.keys(__uniConfig.locales || {});
        if (localeKeys.length) {
          localeKeys.forEach((locale2) => i18n.add(locale2, __uniConfig.locales[locale2]));
        }
        i18n.setLocale(locale);
      }
    }
    return i18n;
  }
  var initI18nButtonMsgsOnce = /* @__PURE__ */ once(() => {
  });
  function initBridge(subscribeNamespace) {
    var emitter = new E$1();
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
      emit(event) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return emitter.emit(event, ...args);
      },
      subscribe(event, callback) {
        var once2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
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
  var viewMethods = /* @__PURE__ */ Object.create(null);
  function normalizeViewMethodName(pageId, name) {
    return pageId + "." + name;
  }
  function subscribeViewMethod(pageId, wrapper) {
    UniViewJSBridge.subscribe(normalizeViewMethodName(pageId, INVOKE_VIEW_API), wrapper ? wrapper(onInvokeViewMethod) : onInvokeViewMethod);
  }
  function registerViewMethod(pageId, name, fn) {
    name = normalizeViewMethodName(pageId, name);
    if (!viewMethods[name]) {
      viewMethods[name] = fn;
    }
  }
  function onInvokeViewMethod(_ref, pageId) {
    var {
      id: id2,
      name,
      args
    } = _ref;
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
  var ViewJSBridge = /* @__PURE__ */ extend(/* @__PURE__ */ initBridge("service"), {
    invokeServiceMethod
  });
  var LONGPRESS_TIMEOUT = 350;
  var LONGPRESS_THRESHOLD = 10;
  var passiveOptions = /* @__PURE__ */ passive(true);
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
        // @ts-expect-error
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
    window.addEventListener("touchstart", touchstart, passiveOptions);
    window.addEventListener("touchmove", touchmove, passiveOptions);
    window.addEventListener("touchend", clearLongPressTimer, passiveOptions);
    window.addEventListener("touchcancel", clearLongPressTimer, passiveOptions);
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
    var config = __uniConfig.globalStyle || {};
    var maxWidth2 = checkValue$1(config.rpxCalcMaxDeviceWidth, 960);
    var baseWidth2 = checkValue$1(config.rpxCalcBaseDeviceWidth, 375);
    function updateRem() {
      var width = getWindowWidth();
      width = width <= maxWidth2 ? width : baseWidth2;
      document.documentElement.style.fontSize = width / 23.4375 + "px";
    }
    updateRem();
    document.addEventListener("DOMContentLoaded", updateRem);
    window.addEventListener("load", updateRem);
    window.addEventListener("resize", updateRem);
  }
  function initView() {
    useRem();
    initCustomDatasetOnce();
    {
      initLongPress();
    }
  }
  var activeEffectScope;
  class EffectScope {
    constructor() {
      var detached = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      this.detached = detached;
      this._active = true;
      this.effects = [];
      this.cleanups = [];
      this.parent = activeEffectScope;
      if (!detached && activeEffectScope) {
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
      }
    }
    get active() {
      return this._active;
    }
    run(fn) {
      if (this._active) {
        var currentEffectScope = activeEffectScope;
        try {
          activeEffectScope = this;
          return fn();
        } finally {
          activeEffectScope = currentEffectScope;
        }
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    on() {
      activeEffectScope = this;
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    off() {
      activeEffectScope = this.parent;
    }
    stop(fromParent) {
      if (this._active) {
        var i2, l;
        for (i2 = 0, l = this.effects.length; i2 < l; i2++) {
          this.effects[i2].stop();
        }
        for (i2 = 0, l = this.cleanups.length; i2 < l; i2++) {
          this.cleanups[i2]();
        }
        if (this.scopes) {
          for (i2 = 0, l = this.scopes.length; i2 < l; i2++) {
            this.scopes[i2].stop(true);
          }
        }
        if (!this.detached && this.parent && !fromParent) {
          var last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.parent = void 0;
        this._active = false;
      }
    }
  }
  function recordEffectScope(effect2) {
    var scope = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : activeEffectScope;
    if (scope && scope.active) {
      scope.effects.push(effect2);
    }
  }
  function getCurrentScope() {
    return activeEffectScope;
  }
  var activeEffect;
  class ReactiveEffect {
    constructor(fn, trigger2, scheduler, scope) {
      this.fn = fn;
      this.trigger = trigger2;
      this.scheduler = scheduler;
      this.active = true;
      this.deps = [];
      this._dirtyLevel = 4;
      this._trackId = 0;
      this._runnings = 0;
      this._shouldSchedule = false;
      this._depsLength = 0;
      recordEffectScope(this, scope);
    }
    get dirty() {
      if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
        this._dirtyLevel = 1;
        pauseTracking();
        for (var i2 = 0; i2 < this._depsLength; i2++) {
          var dep = this.deps[i2];
          if (dep.computed) {
            triggerComputed(dep.computed);
            if (this._dirtyLevel >= 4) {
              break;
            }
          }
        }
        if (this._dirtyLevel === 1) {
          this._dirtyLevel = 0;
        }
        resetTracking();
      }
      return this._dirtyLevel >= 4;
    }
    set dirty(v) {
      this._dirtyLevel = v ? 4 : 0;
    }
    run() {
      this._dirtyLevel = 0;
      if (!this.active) {
        return this.fn();
      }
      var lastShouldTrack = shouldTrack;
      var lastEffect = activeEffect;
      try {
        shouldTrack = true;
        activeEffect = this;
        this._runnings++;
        preCleanupEffect(this);
        return this.fn();
      } finally {
        postCleanupEffect(this);
        this._runnings--;
        activeEffect = lastEffect;
        shouldTrack = lastShouldTrack;
      }
    }
    stop() {
      var _a;
      if (this.active) {
        preCleanupEffect(this);
        postCleanupEffect(this);
        (_a = this.onStop) == null ? void 0 : _a.call(this);
        this.active = false;
      }
    }
  }
  function triggerComputed(computed2) {
    return computed2.value;
  }
  function preCleanupEffect(effect2) {
    effect2._trackId++;
    effect2._depsLength = 0;
  }
  function postCleanupEffect(effect2) {
    if (effect2.deps.length > effect2._depsLength) {
      for (var i2 = effect2._depsLength; i2 < effect2.deps.length; i2++) {
        cleanupDepEffect(effect2.deps[i2], effect2);
      }
      effect2.deps.length = effect2._depsLength;
    }
  }
  function cleanupDepEffect(dep, effect2) {
    var trackId = dep.get(effect2);
    if (trackId !== void 0 && effect2._trackId !== trackId) {
      dep.delete(effect2);
      if (dep.size === 0) {
        dep.cleanup();
      }
    }
  }
  var shouldTrack = true;
  var pauseScheduleStack = 0;
  var trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function resetTracking() {
    var last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function pauseScheduling() {
    pauseScheduleStack++;
  }
  function resetScheduling() {
    pauseScheduleStack--;
    while (!pauseScheduleStack && queueEffectSchedulers.length) {
      queueEffectSchedulers.shift()();
    }
  }
  function trackEffect(effect2, dep, debuggerEventExtraInfo) {
    if (dep.get(effect2) !== effect2._trackId) {
      dep.set(effect2, effect2._trackId);
      var oldDep = effect2.deps[effect2._depsLength];
      if (oldDep !== dep) {
        if (oldDep) {
          cleanupDepEffect(oldDep, effect2);
        }
        effect2.deps[effect2._depsLength++] = dep;
      } else {
        effect2._depsLength++;
      }
    }
  }
  var queueEffectSchedulers = [];
  function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
    pauseScheduling();
    for (var effect2 of dep.keys()) {
      var tracking = void 0;
      if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
        effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
        effect2._dirtyLevel = dirtyLevel;
      }
      if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
        effect2.trigger();
        if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
          effect2._shouldSchedule = false;
          if (effect2.scheduler) {
            queueEffectSchedulers.push(effect2.scheduler);
          }
        }
      }
    }
    resetScheduling();
  }
  var createDep = (cleanup, computed2) => {
    var dep = /* @__PURE__ */ new Map();
    dep.cleanup = cleanup;
    dep.computed = computed2;
    return dep;
  };
  var targetMap = /* @__PURE__ */ new WeakMap();
  var ITERATE_KEY = Symbol("");
  var MAP_KEY_ITERATE_KEY = Symbol("");
  function track(target, type, key2) {
    if (shouldTrack && activeEffect) {
      var depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
      }
      var dep = depsMap.get(key2);
      if (!dep) {
        depsMap.set(key2, dep = createDep(() => depsMap.delete(key2)));
      }
      trackEffect(activeEffect, dep);
    }
  }
  function trigger(target, type, key2, newValue, oldValue, oldTarget) {
    var depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    var deps = [];
    if (type === "clear") {
      deps = [...depsMap.values()];
    } else if (key2 === "length" && isArray(target)) {
      var newLength = Number(newValue);
      depsMap.forEach((dep2, key22) => {
        if (key22 === "length" || !isSymbol(key22) && key22 >= newLength) {
          deps.push(dep2);
        }
      });
    } else {
      if (key2 !== void 0) {
        deps.push(depsMap.get(key2));
      }
      switch (type) {
        case "add":
          if (!isArray(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key2)) {
            deps.push(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!isArray(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
    pauseScheduling();
    for (var dep of deps) {
      if (dep) {
        triggerEffects(dep, 4);
      }
    }
    resetScheduling();
  }
  var isNonTrackableKeys = /* @__PURE__ */ makeMap("__proto__,__v_isRef,__isVue");
  var builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key2) => key2 !== "arguments" && key2 !== "caller").map((key2) => Symbol[key2]).filter(isSymbol));
  var arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
  function createArrayInstrumentations() {
    var instrumentations = {};
    ["includes", "indexOf", "lastIndexOf"].forEach((key2) => {
      instrumentations[key2] = function() {
        var arr = toRaw(this);
        for (var i2 = 0, l = this.length; i2 < l; i2++) {
          track(arr, "get", i2 + "");
        }
        for (var _len2 = arguments.length, args = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
          args[_key3] = arguments[_key3];
        }
        var res = arr[key2](...args);
        if (res === -1 || res === false) {
          return arr[key2](...args.map(toRaw));
        } else {
          return res;
        }
      };
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach((key2) => {
      instrumentations[key2] = function() {
        pauseTracking();
        pauseScheduling();
        for (var _len3 = arguments.length, args = new Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
          args[_key4] = arguments[_key4];
        }
        var res = toRaw(this)[key2].apply(this, args);
        resetScheduling();
        resetTracking();
        return res;
      };
    });
    return instrumentations;
  }
  function hasOwnProperty(key2) {
    var obj = toRaw(this);
    track(obj, "has", key2);
    return obj.hasOwnProperty(key2);
  }
  class BaseReactiveHandler {
    constructor() {
      var _isReadonly = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      var _isShallow = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      this._isReadonly = _isReadonly;
      this._isShallow = _isShallow;
    }
    get(target, key2, receiver) {
      var isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
      if (key2 === "__v_isReactive") {
        return !isReadonly2;
      } else if (key2 === "__v_isReadonly") {
        return isReadonly2;
      } else if (key2 === "__v_isShallow") {
        return isShallow2;
      } else if (key2 === "__v_raw") {
        if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
        // this means the reciever is a user proxy of the reactive proxy
        Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
          return target;
        }
        return;
      }
      var targetIsArray = isArray(target);
      if (!isReadonly2) {
        if (targetIsArray && hasOwn$1(arrayInstrumentations, key2)) {
          return Reflect.get(arrayInstrumentations, key2, receiver);
        }
        if (key2 === "hasOwnProperty") {
          return hasOwnProperty;
        }
      }
      var res = Reflect.get(target, key2, receiver);
      if (isSymbol(key2) ? builtInSymbols.has(key2) : isNonTrackableKeys(key2)) {
        return res;
      }
      if (!isReadonly2) {
        track(target, "get", key2);
      }
      if (isShallow2) {
        return res;
      }
      if (isRef(res)) {
        return targetIsArray && isIntegerKey(key2) ? res : res.value;
      }
      if (isObject$1(res)) {
        return isReadonly2 ? readonly(res) : reactive(res);
      }
      return res;
    }
  }
  class MutableReactiveHandler extends BaseReactiveHandler {
    constructor() {
      var isShallow2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      super(false, isShallow2);
    }
    set(target, key2, value, receiver) {
      var oldValue = target[key2];
      if (!this._isShallow) {
        var isOldValueReadonly = isReadonly(oldValue);
        if (!isShallow(value) && !isReadonly(value)) {
          oldValue = toRaw(oldValue);
          value = toRaw(value);
        }
        if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
          if (isOldValueReadonly) {
            return false;
          } else {
            oldValue.value = value;
            return true;
          }
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
    }
    deleteProperty(target, key2) {
      var hadKey = hasOwn$1(target, key2);
      target[key2];
      var result = Reflect.deleteProperty(target, key2);
      if (result && hadKey) {
        trigger(target, "delete", key2, void 0);
      }
      return result;
    }
    has(target, key2) {
      var result = Reflect.has(target, key2);
      if (!isSymbol(key2) || !builtInSymbols.has(key2)) {
        track(target, "has", key2);
      }
      return result;
    }
    ownKeys(target) {
      track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
      return Reflect.ownKeys(target);
    }
  }
  class ReadonlyReactiveHandler extends BaseReactiveHandler {
    constructor() {
      var isShallow2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      super(true, isShallow2);
    }
    set(target, key2) {
      return true;
    }
    deleteProperty(target, key2) {
      return true;
    }
  }
  var mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
  var readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
  var shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
  var toShallow = (value) => value;
  var getProto = (v) => Reflect.getPrototypeOf(v);
  function get(target, key2) {
    var isReadonly2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    var isShallow2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
    target = target["__v_raw"];
    var rawTarget = toRaw(target);
    var rawKey = toRaw(key2);
    if (!isReadonly2) {
      if (hasChanged(key2, rawKey)) {
        track(rawTarget, "get", key2);
      }
      track(rawTarget, "get", rawKey);
    }
    var {
      has: has2
    } = getProto(rawTarget);
    var wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    if (has2.call(rawTarget, key2)) {
      return wrap(target.get(key2));
    } else if (has2.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      target.get(key2);
    }
  }
  function has(key2) {
    var isReadonly2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var target = this["__v_raw"];
    var rawTarget = toRaw(target);
    var rawKey = toRaw(key2);
    if (!isReadonly2) {
      if (hasChanged(key2, rawKey)) {
        track(rawTarget, "has", key2);
      }
      track(rawTarget, "has", rawKey);
    }
    return key2 === rawKey ? target.has(key2) : target.has(key2) || target.has(rawKey);
  }
  function size(target) {
    var isReadonly2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
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
  function set(key2, value) {
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
  function createForEach(isReadonly2, isShallow2) {
    return function forEach(callback, thisArg) {
      var observed = this;
      var target = observed["__v_raw"];
      var rawTarget = toRaw(target);
      var wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key2) => {
        return callback.call(thisArg, wrap(value), wrap(key2), observed);
      });
    };
  }
  function createIterableMethod(method, isReadonly2, isShallow2) {
    return function() {
      var target = this["__v_raw"];
      var rawTarget = toRaw(target);
      var targetIsMap = isMap(rawTarget);
      var isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      var isKeyOnly = method === "keys" && targetIsMap;
      var innerIterator = target[method](...arguments);
      var wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
      return {
        // iterator protocol
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
        // iterable protocol
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function createReadonlyMethod(type) {
    return function() {
      return type === "delete" ? false : type === "clear" ? void 0 : this;
    };
  }
  function createInstrumentations() {
    var mutableInstrumentations2 = {
      get(key2) {
        return get(this, key2);
      },
      get size() {
        return size(this);
      },
      has,
      add,
      set,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false)
    };
    var shallowInstrumentations2 = {
      get(key2) {
        return get(this, key2, false, true);
      },
      get size() {
        return size(this);
      },
      has,
      add,
      set,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true)
    };
    var readonlyInstrumentations2 = {
      get(key2) {
        return get(this, key2, true);
      },
      get size() {
        return size(this, true);
      },
      has(key2) {
        return has.call(this, key2, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, false)
    };
    var shallowReadonlyInstrumentations2 = {
      get(key2) {
        return get(this, key2, true, true);
      },
      get size() {
        return size(this, true);
      },
      has(key2) {
        return has.call(this, key2, true);
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
  var reactiveMap = /* @__PURE__ */ new WeakMap();
  var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  var readonlyMap = /* @__PURE__ */ new WeakMap();
  var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
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
    if (isReadonly(target)) {
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
  function isShallow(value) {
    return !!(value && value["__v_isShallow"]);
  }
  function isProxy(value) {
    return isReactive(value) || isReadonly(value);
  }
  function toRaw(observed) {
    var raw = observed && observed["__v_raw"];
    return raw ? toRaw(raw) : observed;
  }
  function markRaw(value) {
    if (Object.isExtensible(value)) {
      def(value, "__v_skip", true);
    }
    return value;
  }
  var toReactive = (value) => isObject$1(value) ? reactive(value) : value;
  var toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
  class ComputedRefImpl {
    constructor(getter, _setter, isReadonly2, isSSR) {
      this.getter = getter;
      this._setter = _setter;
      this.dep = void 0;
      this.__v_isRef = true;
      this["__v_isReadonly"] = false;
      this.effect = new ReactiveEffect(() => getter(this._value), () => triggerRefValue(this, this.effect._dirtyLevel === 2 ? 2 : 3));
      this.effect.computed = this;
      this.effect.active = this._cacheable = !isSSR;
      this["__v_isReadonly"] = isReadonly2;
    }
    get value() {
      var self2 = toRaw(this);
      if ((!self2._cacheable || self2.effect.dirty) && hasChanged(self2._value, self2._value = self2.effect.run())) {
        triggerRefValue(self2, 4);
      }
      trackRefValue(self2);
      if (self2.effect._dirtyLevel >= 2) {
        triggerRefValue(self2, 2);
      }
      return self2._value;
    }
    set value(newValue) {
      this._setter(newValue);
    }
    // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
    get _dirty() {
      return this.effect.dirty;
    }
    set _dirty(v) {
      this.effect.dirty = v;
    }
    // #endregion
  }
  function computed$1(getterOrOptions, debugOptions) {
    var isSSR = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    var getter;
    var setter;
    var onlyGetter = isFunction(getterOrOptions);
    if (onlyGetter) {
      getter = getterOrOptions;
      setter = NOOP;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    var cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
    return cRef;
  }
  function trackRefValue(ref2) {
    var _a;
    if (shouldTrack && activeEffect) {
      ref2 = toRaw(ref2);
      trackEffect(activeEffect, (_a = ref2.dep) != null ? _a : ref2.dep = createDep(() => ref2.dep = void 0, ref2 instanceof ComputedRefImpl ? ref2 : void 0));
    }
  }
  function triggerRefValue(ref2) {
    var dirtyLevel = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 4;
    ref2 = toRaw(ref2);
    var dep = ref2.dep;
    if (dep) {
      triggerEffects(dep, dirtyLevel);
    }
  }
  function isRef(r) {
    return !!(r && r.__v_isRef === true);
  }
  function ref(value) {
    return createRef(value, false);
  }
  function createRef(rawValue, shallow) {
    if (isRef(rawValue)) {
      return rawValue;
    }
    return new RefImpl(rawValue, shallow);
  }
  class RefImpl {
    constructor(value, __v_isShallow) {
      this.__v_isShallow = __v_isShallow;
      this.dep = void 0;
      this.__v_isRef = true;
      this._rawValue = __v_isShallow ? value : toRaw(value);
      this._value = __v_isShallow ? value : toReactive(value);
    }
    get value() {
      trackRefValue(this);
      return this._value;
    }
    set value(newVal) {
      var useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
      newVal = useDirectValue ? newVal : toRaw(newVal);
      if (hasChanged(newVal, this._rawValue)) {
        this._rawValue = newVal;
        this._value = useDirectValue ? newVal : toReactive(newVal);
        triggerRefValue(this, 4, newVal);
      }
    }
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
  var stack = [];
  function warn$1(msg2) {
    pauseTracking();
    var instance = stack.length ? stack[stack.length - 1].component : null;
    var appWarnHandler = instance && instance.appContext.config.warnHandler;
    var trace = getComponentTrace();
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key5 = 1; _key5 < _len4; _key5++) {
      args[_key5 - 1] = arguments[_key5];
    }
    if (appWarnHandler) {
      callWithErrorHandling(appWarnHandler, instance, 11, [msg2 + args.map((a) => {
        var _a, _b;
        return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
      }).join(""), instance && instance.proxy, trace.map((_ref) => {
        var {
          vnode
        } = _ref;
        return "at <".concat(formatComponentName(instance, vnode.type), ">");
      }).join("\n"), trace]);
    } else {
      var warnArgs = ["[Vue warn]: ".concat(msg2), ...args];
      if (trace.length && // avoid spamming console during tests
      true) {
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
  function formatTraceEntry(_ref2) {
    var {
      vnode,
      recurseCount
    } = _ref2;
    var postfix = recurseCount > 0 ? "... (".concat(recurseCount, " recursive calls)") : "";
    var isRoot = vnode.component ? vnode.component.parent == null : false;
    var open = " at <".concat(formatComponentName(vnode.component, vnode.type, isRoot));
    var close = ">" + postfix;
    return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
  }
  function formatProps(props) {
    var res = [];
    var keys = Object.keys(props);
    keys.slice(0, 3).forEach((key2) => {
      res.push(...formatProp(key2, props[key2]));
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
    try {
      return args ? fn(...args) : fn();
    } catch (err2) {
      handleError(err2, instance, type);
    }
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction(fn)) {
      var res = callWithErrorHandling(fn, instance, type, args);
      if (res && isPromise(res)) {
        res.catch((err2) => {
          handleError(err2, instance, type);
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
  function handleError(err2, instance, type) {
    instance ? instance.vnode : null;
    if (instance) {
      var cur = instance.parent;
      var exposedInstance = instance.proxy;
      var errorInfo = "https://vuejs.org/error-reference/#runtime-".concat(type);
      while (cur) {
        var errorCapturedHooks = cur.ec;
        if (errorCapturedHooks) {
          for (var i2 = 0; i2 < errorCapturedHooks.length; i2++) {
            if (errorCapturedHooks[i2](err2, exposedInstance, errorInfo) === false) {
              return;
            }
          }
        }
        cur = cur.parent;
      }
      var appErrorHandler = instance.appContext.config.errorHandler;
      if (appErrorHandler) {
        callWithErrorHandling(appErrorHandler, null, 10, [err2, exposedInstance, errorInfo]);
        return;
      }
    }
    logError(err2);
  }
  function logError(err2, type, contextVNode) {
    {
      if (err2 instanceof Error) {
        console.error(err2.message + "\n" + err2.stack);
      } else {
        console.error(err2);
      }
    }
  }
  var isFlushing = false;
  var isFlushPending = false;
  var queue = [];
  var flushIndex = 0;
  var pendingPostFlushCbs = [];
  var activePostFlushCbs = null;
  var postFlushIndex = 0;
  var resolvedPromise = /* @__PURE__ */ Promise.resolve();
  var currentFlushPromise = null;
  function nextTick(fn) {
    var p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
  }
  function findInsertionIndex(id2) {
    var start = flushIndex + 1;
    var end = queue.length;
    while (start < end) {
      var middle = start + end >>> 1;
      var middleJob = queue[middle];
      var middleJobId = getId(middleJob);
      if (middleJobId < id2 || middleJobId === id2 && middleJob.pre) {
        start = middle + 1;
      } else {
        end = middle;
      }
    }
    return start;
  }
  function queueJob(job) {
    if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
      if (job.id == null) {
        queue.push(job);
      } else {
        queue.splice(findInsertionIndex(job.id), 0, job);
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
  function queuePostFlushCb(cb) {
    if (!isArray(cb)) {
      if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
        pendingPostFlushCbs.push(cb);
      }
    } else {
      pendingPostFlushCbs.push(...cb);
    }
    queueFlush();
  }
  function flushPreFlushCbs(instance, seen) {
    var i2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : isFlushing ? flushIndex + 1 : 0;
    for (; i2 < queue.length; i2++) {
      var cb = queue[i2];
      if (cb && cb.pre) {
        if (instance && cb.id !== instance.uid) {
          continue;
        }
        queue.splice(i2, 1);
        i2--;
        cb();
      }
    }
  }
  function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
      var deduped = [...new Set(pendingPostFlushCbs)].sort((a, b) => getId(a) - getId(b));
      pendingPostFlushCbs.length = 0;
      if (activePostFlushCbs) {
        activePostFlushCbs.push(...deduped);
        return;
      }
      activePostFlushCbs = deduped;
      for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
        activePostFlushCbs[postFlushIndex]();
      }
      activePostFlushCbs = null;
      postFlushIndex = 0;
    }
  }
  var getId = (job) => job.id == null ? Infinity : job.id;
  var comparator = (a, b) => {
    var diff = getId(a) - getId(b);
    if (diff === 0) {
      if (a.pre && !b.pre)
        return -1;
      if (b.pre && !a.pre)
        return 1;
    }
    return diff;
  };
  function flushJobs(seen) {
    isFlushPending = false;
    isFlushing = true;
    queue.sort(comparator);
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
      if (queue.length || pendingPostFlushCbs.length) {
        flushJobs();
      }
    }
  }
  function emit(instance, event) {
    if (instance.isUnmounted)
      return;
    var props = instance.vnode.props || EMPTY_OBJ;
    for (var _len6 = arguments.length, rawArgs = new Array(_len6 > 2 ? _len6 - 2 : 0), _key7 = 2; _key7 < _len6; _key7++) {
      rawArgs[_key7 - 2] = arguments[_key7];
    }
    var args = rawArgs;
    var isModelListener2 = event.startsWith("update:");
    var modelArg = isModelListener2 && event.slice(7);
    if (modelArg && modelArg in props) {
      var modifiersKey = "".concat(modelArg === "modelValue" ? "model" : modelArg, "Modifiers");
      var {
        number,
        trim
      } = props[modifiersKey] || EMPTY_OBJ;
      if (trim) {
        args = rawArgs.map((a) => isString(a) ? a.trim() : a);
      }
      if (number) {
        args = rawArgs.map(looseToNumber);
      }
    }
    var handlerName;
    var handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
    props[handlerName = toHandlerKey(camelize(event))];
    if (!handler && isModelListener2) {
      handler = props[handlerName = toHandlerKey(hyphenate(event))];
    }
    if (handler) {
      callWithAsyncErrorHandling(handler, instance, 6, args);
    }
    var onceHandler = props[handlerName + "Once"];
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
  function normalizeEmitsOptions(comp, appContext) {
    var asMixin = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
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
      if (isObject$1(comp)) {
        cache2.set(comp, null);
      }
      return null;
    }
    if (isArray(raw)) {
      raw.forEach((key2) => normalized[key2] = null);
    } else {
      extend(normalized, raw);
    }
    if (isObject$1(comp)) {
      cache2.set(comp, normalized);
    }
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
  function withCtx(fn) {
    var ctx2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : currentRenderingInstance;
    if (!ctx2)
      return fn;
    if (fn._n) {
      return fn;
    }
    var renderFnWithContext = function() {
      if (renderFnWithContext._d) {
        setBlockTracking(-1);
      }
      var prevInstance = setCurrentRenderingInstance(ctx2);
      var res;
      try {
        res = fn(...arguments);
      } finally {
        setCurrentRenderingInstance(prevInstance);
        if (renderFnWithContext._d) {
          setBlockTracking(1);
        }
      }
      return res;
    };
    renderFnWithContext._n = true;
    renderFnWithContext._c = true;
    renderFnWithContext._d = true;
    return renderFnWithContext;
  }
  function markAttrsAccessed() {
  }
  function renderComponentRoot(instance) {
    var {
      type: Component,
      vnode,
      proxy,
      withProxy,
      props,
      propsOptions: [propsOptions],
      slots,
      attrs: attrs2,
      emit: emit2,
      render: render2,
      renderCache,
      data,
      setupState,
      ctx: ctx2,
      inheritAttrs
    } = instance;
    var result;
    var fallthroughAttrs;
    var prev = setCurrentRenderingInstance(instance);
    try {
      if (vnode.shapeFlag & 4) {
        var proxyToUse = withProxy || proxy;
        var thisProxy = false ? new Proxy(proxyToUse, {
          get(target, key2, receiver) {
            warn$1("Property '".concat(String(key2), "' was accessed via 'this'. Avoid using 'this' in templates."));
            return Reflect.get(target, key2, receiver);
          }
        }) : proxyToUse;
        result = normalizeVNode(render2.call(thisProxy, proxyToUse, renderCache, props, setupState, data, ctx2));
        fallthroughAttrs = attrs2;
      } else {
        var render22 = Component;
        if (false)
          ;
        result = normalizeVNode(render22.length > 1 ? render22(props, false ? {
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
        }) : render22(
          props,
          null
          /* we know it doesn't need it */
        ));
        fallthroughAttrs = Component.props ? attrs2 : getFunctionalFallthrough(attrs2);
      }
    } catch (err2) {
      handleError(err2, instance, 1);
      result = createVNode(Comment);
    }
    var root = result;
    if (fallthroughAttrs && inheritAttrs !== false) {
      var keys = Object.keys(fallthroughAttrs);
      var {
        shapeFlag
      } = root;
      if (keys.length) {
        if (shapeFlag & (1 | 6)) {
          if (propsOptions && keys.some(isModelListener)) {
            fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
          }
          root = cloneVNode(root, fallthroughAttrs);
        }
      }
    }
    if (vnode.dirs) {
      root = cloneVNode(root);
      root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
    }
    if (vnode.transition) {
      root.transition = vnode.transition;
    }
    {
      result = root;
    }
    setCurrentRenderingInstance(prev);
    return result;
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
  var filterModelListeners = (attrs2, props) => {
    var res = {};
    for (var key2 in attrs2) {
      if (!isModelListener(key2) || !(key2.slice(9) in props)) {
        res[key2] = attrs2[key2];
      }
    }
    return res;
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
    var emits = component.emitsOptions;
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
        return hasPropsChanged(prevProps, nextProps, emits);
      } else if (patchFlag & 8) {
        var dynamicProps = nextVNode.dynamicProps;
        for (var i2 = 0; i2 < dynamicProps.length; i2++) {
          var key2 = dynamicProps[i2];
          if (nextProps[key2] !== prevProps[key2] && !isEmitListener(emits, key2)) {
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
      return hasPropsChanged(prevProps, nextProps, emits);
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
  function updateHOCHostEl(_ref4, el) {
    var {
      vnode,
      parent
    } = _ref4;
    while (parent) {
      var root = parent.subTree;
      if (root.suspense && root.suspense.activeBranch === vnode) {
        root.el = vnode.el;
      }
      if (root === vnode) {
        (vnode = parent.vnode).el = el;
        parent = parent.parent;
      } else {
        break;
      }
    }
  }
  var NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
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
  var ssrContextKey = Symbol.for("v-scx");
  var useSSRContext = () => {
    {
      var ctx2 = inject(ssrContextKey);
      return ctx2;
    }
  };
  var INITIAL_WATCHER_VALUE = {};
  function watch(source, cb, options) {
    return doWatch(source, cb, options);
  }
  function doWatch(source, cb) {
    var {
      immediate,
      deep,
      flush,
      once: once2,
      onTrack,
      onTrigger
    } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : EMPTY_OBJ;
    if (cb && once2) {
      var _cb = cb;
      cb = function() {
        _cb(...arguments);
        unwatch();
      };
    }
    var instance = currentInstance;
    var reactiveGetter = (source2) => deep === true ? source2 : (
      // for deep: false, only traverse root-level properties
      traverse(source2, deep === false ? 1 : void 0)
    );
    var getter;
    var forceTrigger = false;
    var isMultiSource = false;
    if (isRef(source)) {
      getter = () => source.value;
      forceTrigger = isShallow(source);
    } else if (isReactive(source)) {
      getter = () => reactiveGetter(source);
      forceTrigger = true;
    } else if (isArray(source)) {
      isMultiSource = true;
      forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
      getter = () => source.map((s) => {
        if (isRef(s)) {
          return s.value;
        } else if (isReactive(s)) {
          return reactiveGetter(s);
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
          if (cleanup) {
            cleanup();
          }
          return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
        };
      }
    } else {
      getter = NOOP;
    }
    if (cb && deep) {
      var baseGetter = getter;
      getter = () => traverse(baseGetter());
    }
    var cleanup;
    var onCleanup = (fn) => {
      cleanup = effect2.onStop = () => {
        callWithErrorHandling(fn, instance, 4);
        cleanup = effect2.onStop = void 0;
      };
    };
    var ssrCleanup;
    if (isInSSRComponentSetup) {
      onCleanup = NOOP;
      if (!cb) {
        getter();
      } else if (immediate) {
        callWithAsyncErrorHandling(cb, instance, 3, [getter(), isMultiSource ? [] : void 0, onCleanup]);
      }
      if (flush === "sync") {
        var ctx2 = useSSRContext();
        ssrCleanup = ctx2.__watcherHandles || (ctx2.__watcherHandles = []);
      } else {
        return NOOP;
      }
    }
    var oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
    var job = () => {
      if (!effect2.active || !effect2.dirty) {
        return;
      }
      if (cb) {
        var newValue = effect2.run();
        if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i2) => hasChanged(v, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
          if (cleanup) {
            cleanup();
          }
          callWithAsyncErrorHandling(cb, instance, 3, [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            onCleanup
          ]);
          oldValue = newValue;
        }
      } else {
        effect2.run();
      }
    };
    job.allowRecurse = !!cb;
    var scheduler;
    if (flush === "sync") {
      scheduler = job;
    } else if (flush === "post") {
      scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
    } else {
      job.pre = true;
      if (instance)
        job.id = instance.uid;
      scheduler = () => queueJob(job);
    }
    var effect2 = new ReactiveEffect(getter, NOOP, scheduler);
    var scope = getCurrentScope();
    var unwatch = () => {
      effect2.stop();
      if (scope) {
        remove(scope.effects, effect2);
      }
    };
    if (cb) {
      if (immediate) {
        job();
      } else {
        oldValue = effect2.run();
      }
    } else if (flush === "post") {
      queuePostRenderEffect(effect2.run.bind(effect2), instance && instance.suspense);
    } else {
      effect2.run();
    }
    if (ssrCleanup)
      ssrCleanup.push(unwatch);
    return unwatch;
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
    var reset = setCurrentInstance(this);
    var res = doWatch(getter, cb.bind(publicThis), options);
    reset();
    return res;
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
  function traverse(value, depth) {
    var currentDepth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    var seen = arguments.length > 3 ? arguments[3] : void 0;
    if (!isObject$1(value) || value["__v_skip"]) {
      return value;
    }
    if (depth && depth > 0) {
      if (currentDepth >= depth) {
        return value;
      }
      currentDepth++;
    }
    seen = seen || /* @__PURE__ */ new Set();
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    if (isRef(value)) {
      traverse(value.value, depth, currentDepth, seen);
    } else if (isArray(value)) {
      for (var i2 = 0; i2 < value.length; i2++) {
        traverse(value[i2], depth, currentDepth, seen);
      }
    } else if (isSet(value) || isMap(value)) {
      value.forEach((v) => {
        traverse(v, depth, currentDepth, seen);
      });
    } else if (isPlainObject(value)) {
      for (var key2 in value) {
        traverse(value[key2], depth, currentDepth, seen);
      }
    }
    return value;
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
  /*! #__NO_SIDE_EFFECTS__ */
  // @__NO_SIDE_EFFECTS__
  function defineComponent(options, extraOptions) {
    return isFunction(options) ? (
      // #8326: extend call and options.name access are considered side-effects
      // by Rollup, so we have to wrap it in a pure-annotated IIFE.
      /* @__PURE__ */ (() => extend({
        name: options.name
      }, extraOptions, {
        setup: options
      }))()
    ) : options;
  }
  var isAsyncWrapper = (i2) => !!i2.type.__asyncLoader;
  var isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
  function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a", target);
  }
  function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da", target);
  }
  function registerKeepAliveHook(hook, type) {
    var target = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : currentInstance;
    var wrappedHook = hook.__wdc || (hook.__wdc = () => {
      var current2 = target;
      while (current2) {
        if (current2.isDeactivated) {
          return;
        }
        current2 = current2.parent;
      }
      return hook();
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
    var injected = injectHook(
      type,
      hook,
      keepAliveRoot,
      true
      /* prepend */
    );
    onUnmounted(() => {
      remove(keepAliveRoot[type], injected);
    }, target);
  }
  function injectHook(type, hook) {
    var target = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : currentInstance;
    var prepend = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
    if (target) {
      var hooks = target[type] || (target[type] = []);
      var wrappedHook = hook.__weh || (hook.__weh = function() {
        if (target.isUnmounted) {
          return;
        }
        pauseTracking();
        var reset = setCurrentInstance(target);
        for (var _len7 = arguments.length, args = new Array(_len7), _key8 = 0; _key8 < _len7; _key8++) {
          args[_key8] = arguments[_key8];
        }
        var res = callWithAsyncErrorHandling(hook, target, type, args);
        reset();
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
  var createHook = (lifecycle) => function(hook) {
    var target = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : currentInstance;
    return (
      // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
      (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, function() {
        return hook(...arguments);
      }, target)
    );
  };
  var onBeforeMount = createHook("bm");
  var onMounted = createHook("m");
  var onBeforeUpdate = createHook("bu");
  var onUpdated = createHook("u");
  var onBeforeUnmount = createHook("bum");
  var onUnmounted = createHook("um");
  var onServerPrefetch = createHook("sp");
  var onRenderTriggered = createHook("rtg");
  var onRenderTracked = createHook("rtc");
  function onErrorCaptured(hook) {
    var target = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : currentInstance;
    injectHook("ec", hook, target);
  }
  var getPublicInstance = (i2) => {
    if (!i2)
      return null;
    if (isStatefulComponent(i2))
      return getExposeProxy(i2) || i2.proxy;
    return getPublicInstance(i2.parent);
  };
  var publicPropertiesMap = (
    // Move PURE marker to new line to workaround compiler discarding it
    // due to type annotation
    /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
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
      $forceUpdate: (i2) => i2.f || (i2.f = () => {
        i2.effect.dirty = true;
        queueJob(i2.update);
      }),
      $nextTick: (i2) => i2.n || (i2.n = nextTick.bind(i2.proxy)),
      $watch: (i2) => instanceWatch.bind(i2)
    })
  );
  var hasSetupBinding = (state, key2) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn$1(state, key2);
  var PublicInstanceProxyHandlers = {
    get(_ref9, key2) {
      var {
        _: instance
      } = _ref9;
      var {
        ctx: ctx2,
        setupState,
        data,
        props,
        accessCache,
        type,
        appContext
      } = instance;
      var normalizedProps;
      if (key2[0] !== "$") {
        var n = accessCache[key2];
        if (n !== void 0) {
          switch (n) {
            case 1:
              return setupState[key2];
            case 2:
              return data[key2];
            case 4:
              return ctx2[key2];
            case 3:
              return props[key2];
          }
        } else if (hasSetupBinding(setupState, key2)) {
          accessCache[key2] = 1;
          return setupState[key2];
        } else if (data !== EMPTY_OBJ && hasOwn$1(data, key2)) {
          accessCache[key2] = 2;
          return data[key2];
        } else if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (normalizedProps = instance.propsOptions[0]) && hasOwn$1(normalizedProps, key2)
        ) {
          accessCache[key2] = 3;
          return props[key2];
        } else if (ctx2 !== EMPTY_OBJ && hasOwn$1(ctx2, key2)) {
          accessCache[key2] = 4;
          return ctx2[key2];
        } else if (shouldCacheAccess) {
          accessCache[key2] = 0;
        }
      }
      var publicGetter = publicPropertiesMap[key2];
      var cssModule, globalProperties;
      if (publicGetter) {
        if (key2 === "$attrs") {
          track(instance, "get", key2);
        }
        return publicGetter(instance);
      } else if (
        // css module (injected by vue-loader)
        (cssModule = type.__cssModules) && (cssModule = cssModule[key2])
      ) {
        return cssModule;
      } else if (ctx2 !== EMPTY_OBJ && hasOwn$1(ctx2, key2)) {
        accessCache[key2] = 4;
        return ctx2[key2];
      } else if (
        // global properties
        globalProperties = appContext.config.globalProperties, hasOwn$1(globalProperties, key2)
      ) {
        {
          return globalProperties[key2];
        }
      } else
        ;
    },
    set(_ref10, key2, value) {
      var {
        _: instance
      } = _ref10;
      var {
        data,
        setupState,
        ctx: ctx2
      } = instance;
      if (hasSetupBinding(setupState, key2)) {
        setupState[key2] = value;
        return true;
      } else if (data !== EMPTY_OBJ && hasOwn$1(data, key2)) {
        data[key2] = value;
        return true;
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
    has(_ref11, key2) {
      var {
        _: {
          data,
          setupState,
          accessCache,
          ctx: ctx2,
          appContext,
          propsOptions
        }
      } = _ref11;
      var normalizedProps;
      return !!accessCache[key2] || data !== EMPTY_OBJ && hasOwn$1(data, key2) || hasSetupBinding(setupState, key2) || (normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key2) || hasOwn$1(ctx2, key2) || hasOwn$1(publicPropertiesMap, key2) || hasOwn$1(appContext.config.globalProperties, key2);
    },
    defineProperty(target, key2, descriptor2) {
      if (descriptor2.get != null) {
        target._.accessCache[key2] = 0;
      } else if (hasOwn$1(descriptor2, "value")) {
        this.set(target, key2, descriptor2.value, null);
      }
      return Reflect.defineProperty(target, key2, descriptor2);
    }
  };
  function normalizePropsOrEmits(props) {
    return isArray(props) ? props.reduce((normalized, p2) => (normalized[p2] = null, normalized), {}) : props;
  }
  var shouldCacheAccess = true;
  function applyOptions(instance) {
    var options = resolveMergedOptions(instance);
    var publicThis = instance.proxy;
    var ctx2 = instance.ctx;
    shouldCacheAccess = false;
    if (options.beforeCreate) {
      callHook$1(options.beforeCreate, instance, "bc");
    }
    var {
      // state
      data: dataOptions,
      computed: computedOptions,
      methods,
      watch: watchOptions,
      provide: provideOptions,
      inject: injectOptions,
      // lifecycle
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
      render: render2,
      renderTracked,
      renderTriggered,
      errorCaptured,
      serverPrefetch,
      // public API
      expose,
      inheritAttrs,
      // assets
      components,
      directives,
      filters
    } = options;
    if (injectOptions) {
      resolveInjections(injectOptions, ctx2);
    }
    if (methods) {
      for (var _key9 in methods) {
        var methodHandler = methods[_key9];
        if (isFunction(methodHandler)) {
          {
            ctx2[_key9] = methodHandler.bind(publicThis);
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
      var _loop4 = function(_key112) {
        var opt = computedOptions[_key112];
        var get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
        var set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
        var c2 = computed({
          get: get2,
          set: set2
        });
        Object.defineProperty(ctx2, _key112, {
          enumerable: true,
          configurable: true,
          get: () => c2.value,
          set: (v) => c2.value = v
        });
      };
      for (var _key11 in computedOptions) {
        _loop4(_key11);
      }
    }
    if (watchOptions) {
      for (var _key12 in watchOptions) {
        createWatcher(watchOptions[_key12], ctx2, publicThis, _key12);
      }
    }
    if (provideOptions) {
      var provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key2) => {
        provide(key2, provides[key2]);
      });
    }
    if (created) {
      callHook$1(created, instance, "c");
    }
    function registerLifecycleHook(register, hook) {
      if (isArray(hook)) {
        hook.forEach((_hook) => register(_hook.bind(publicThis)));
      } else if (hook) {
        register(hook.bind(publicThis));
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
    if (render2 && instance.render === NOOP) {
      instance.render = render2;
    }
    if (inheritAttrs != null) {
      instance.inheritAttrs = inheritAttrs;
    }
    if (components)
      instance.components = components;
    if (directives)
      instance.directives = directives;
  }
  function resolveInjections(injectOptions, ctx2) {
    if (isArray(injectOptions)) {
      injectOptions = normalizeInject(injectOptions);
    }
    var _loop5 = function(key3) {
      var opt = injectOptions[key3];
      var injected = void 0;
      if (isObject$1(opt)) {
        if ("default" in opt) {
          injected = inject(opt.from || key3, opt.default, true);
        } else {
          injected = inject(opt.from || key3);
        }
      } else {
        injected = inject(opt);
      }
      if (isRef(injected)) {
        Object.defineProperty(ctx2, key3, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        ctx2[key3] = injected;
      }
    };
    for (var key2 in injectOptions) {
      _loop5(key2);
    }
  }
  function callHook$1(hook, instance, type) {
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
    var base = instance.type;
    var {
      mixins,
      extends: extendsOptions
    } = base;
    var {
      mixins: globalMixins,
      optionsCache: cache2,
      config: {
        optionMergeStrategies
      }
    } = instance.appContext;
    var cached = cache2.get(base);
    var resolved;
    if (cached) {
      resolved = cached;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
      {
        resolved = base;
      }
    } else {
      resolved = {};
      if (globalMixins.length) {
        globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
      }
      mergeOptions(resolved, base, optionMergeStrategies);
    }
    if (isObject$1(base)) {
      cache2.set(base, resolved);
    }
    return resolved;
  }
  function mergeOptions(to, from, strats) {
    var asMixin = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
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
    props: mergeEmitsOrPropsOptions,
    emits: mergeEmitsOrPropsOptions,
    // objects
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    // lifecycle
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    // assets
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    // watch
    watch: mergeWatchOptions,
    // provide / inject
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
    return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
  }
  function mergeEmitsOrPropsOptions(to, from) {
    if (to) {
      if (isArray(to) && isArray(from)) {
        return [.../* @__PURE__ */ new Set([...to, ...from])];
      }
      return extend(/* @__PURE__ */ Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(from != null ? from : {}));
    } else {
      return from;
    }
  }
  function mergeWatchOptions(to, from) {
    if (!to)
      return from;
    if (!from)
      return to;
    var merged = extend(/* @__PURE__ */ Object.create(null), to);
    for (var key2 in from) {
      merged[key2] = mergeAsArray(to[key2], from[key2]);
    }
    return merged;
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
      provides: /* @__PURE__ */ Object.create(null),
      optionsCache: /* @__PURE__ */ new WeakMap(),
      propsCache: /* @__PURE__ */ new WeakMap(),
      emitsCache: /* @__PURE__ */ new WeakMap()
    };
  }
  var uid$1 = 0;
  function createAppAPI(render2, hydrate2) {
    return function createApp2(rootComponent) {
      var rootProps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      if (!isFunction(rootComponent)) {
        rootComponent = extend({}, rootComponent);
      }
      if (rootProps != null && !isObject$1(rootProps)) {
        rootProps = null;
      }
      var context = createAppContext();
      var installedPlugins = /* @__PURE__ */ new WeakSet();
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
        set config(v) {
        },
        use(plugin) {
          for (var _len8 = arguments.length, options = new Array(_len8 > 1 ? _len8 - 1 : 0), _key13 = 1; _key13 < _len8; _key13++) {
            options[_key13 - 1] = arguments[_key13];
          }
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
        mount(rootContainer, isHydrate, namespace) {
          if (!isMounted) {
            var vnode = createVNode(rootComponent, rootProps);
            vnode.appContext = context;
            if (namespace === true) {
              namespace = "svg";
            } else if (namespace === false) {
              namespace = void 0;
            }
            if (isHydrate && hydrate2) {
              hydrate2(vnode, rootContainer);
            } else {
              render2(vnode, rootContainer, namespace);
            }
            isMounted = true;
            app._container = rootContainer;
            rootContainer.__vue_app__ = app;
            return getExposeProxy(vnode.component) || vnode.component.proxy;
          }
        },
        unmount() {
          if (isMounted) {
            render2(null, app._container);
            delete app._container.__vue_app__;
          }
        },
        provide(key2, value) {
          context.provides[key2] = value;
          return app;
        },
        runWithContext(fn) {
          var lastApp = currentApp;
          currentApp = app;
          try {
            return fn();
          } finally {
            currentApp = lastApp;
          }
        }
      };
      return app;
    };
  }
  var currentApp = null;
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
  function inject(key2, defaultValue) {
    var treatDefaultAsFactory = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    var instance = currentInstance || currentRenderingInstance;
    if (instance || currentApp) {
      var provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
      if (provides && key2 in provides) {
        return provides[key2];
      } else if (arguments.length > 1) {
        return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
      } else
        ;
    }
  }
  function initProps(instance, rawProps, isStateful) {
    var isSSR = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
    var props = {};
    var attrs2 = {};
    def(attrs2, InternalObjectKey, 1);
    instance.propsDefaults = /* @__PURE__ */ Object.create(null);
    setFullProps(instance, rawProps, props, attrs2);
    for (var key2 in instance.propsOptions[0]) {
      if (!(key2 in props)) {
        props[key2] = void 0;
      }
    }
    if (isStateful) {
      instance.props = isSSR ? props : shallowReactive(props);
    } else {
      if (!instance.type.props) {
        instance.props = attrs2;
      } else {
        instance.props = props;
      }
    }
    instance.attrs = attrs2;
  }
  function updateProps(instance, rawProps, rawPrevProps, optimized) {
    var {
      props,
      attrs: attrs2,
      vnode: {
        patchFlag
      }
    } = instance;
    var rawCurrentProps = toRaw(props);
    var [options] = instance.propsOptions;
    var hasAttrsChanged = false;
    if (
      // always force full diff in dev
      // - #1942 if hmr is enabled with sfc component
      // - vite#872 non-sfc component used by sfc component
      (optimized || patchFlag > 0) && !(patchFlag & 16)
    ) {
      if (patchFlag & 8) {
        var propsToUpdate = instance.vnode.dynamicProps;
        for (var i2 = 0; i2 < propsToUpdate.length; i2++) {
          var key2 = propsToUpdate[i2];
          if (isEmitListener(instance.emitsOptions, key2)) {
            continue;
          }
          var value = rawProps[key2];
          if (options) {
            if (hasOwn$1(attrs2, key2)) {
              if (value !== attrs2[key2]) {
                attrs2[key2] = value;
                hasAttrsChanged = true;
              }
            } else {
              var camelizedKey = camelize(key2);
              props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
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
      if (setFullProps(instance, rawProps, props, attrs2)) {
        hasAttrsChanged = true;
      }
      var kebabKey;
      for (var _key14 in rawCurrentProps) {
        if (!rawProps || // for camelCase
        !hasOwn$1(rawProps, _key14) && // it's possible the original props was passed in as kebab-case
        // and converted to camelCase (#955)
        ((kebabKey = hyphenate(_key14)) === _key14 || !hasOwn$1(rawProps, kebabKey))) {
          if (options) {
            if (rawPrevProps && // for camelCase
            (rawPrevProps[_key14] !== void 0 || // for kebab-case
            rawPrevProps[kebabKey] !== void 0)) {
              props[_key14] = resolvePropValue(options, rawCurrentProps, _key14, void 0, instance, true);
            }
          } else {
            delete props[_key14];
          }
        }
      }
      if (attrs2 !== rawCurrentProps) {
        for (var _key15 in attrs2) {
          if (!rawProps || !hasOwn$1(rawProps, _key15) && true) {
            delete attrs2[_key15];
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (hasAttrsChanged) {
      trigger(instance, "set", "$attrs");
    }
  }
  function setFullProps(instance, rawProps, props, attrs2) {
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
            props[camelKey] = value;
          } else {
            (rawCastValues || (rawCastValues = {}))[camelKey] = value;
          }
        } else if (!isEmitListener(instance.emitsOptions, key2)) {
          if (!(key2 in attrs2) || value !== attrs2[key2]) {
            attrs2[key2] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (needCastKeys) {
      var rawCurrentProps = toRaw(props);
      var castValues = rawCastValues || EMPTY_OBJ;
      for (var i2 = 0; i2 < needCastKeys.length; i2++) {
        var _key16 = needCastKeys[i2];
        props[_key16] = resolvePropValue(options, rawCurrentProps, _key16, castValues[_key16], instance, !hasOwn$1(castValues, _key16));
      }
    }
    return hasAttrsChanged;
  }
  function resolvePropValue(options, props, key2, value, instance, isAbsent) {
    var opt = options[key2];
    if (opt != null) {
      var hasDefault = hasOwn$1(opt, "default");
      if (hasDefault && value === void 0) {
        var defaultValue = opt.default;
        if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
          var {
            propsDefaults
          } = instance;
          if (key2 in propsDefaults) {
            value = propsDefaults[key2];
          } else {
            var reset = setCurrentInstance(instance);
            value = propsDefaults[key2] = defaultValue.call(null, props);
            reset();
          }
        } else {
          value = defaultValue;
        }
      }
      if (opt[
        0
        /* shouldCast */
      ]) {
        if (isAbsent && !hasDefault) {
          value = false;
        } else if (opt[
          1
          /* shouldCastTrue */
        ] && (value === "" || value === hyphenate(key2))) {
          value = true;
        }
      }
    }
    return value;
  }
  function normalizePropsOptions(comp, appContext) {
    var asMixin = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
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
        var [props, keys] = normalizePropsOptions(raw2, appContext, true);
        extend(normalized, props);
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
      if (isObject$1(comp)) {
        cache2.set(comp, EMPTY_ARR);
      }
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
          } : extend({}, opt);
          if (prop) {
            var booleanIndex = getTypeIndex(Boolean, prop.type);
            var stringIndex = getTypeIndex(String, prop.type);
            prop[
              0
              /* shouldCast */
            ] = booleanIndex > -1;
            prop[
              1
              /* shouldCastTrue */
            ] = stringIndex < 0 || booleanIndex < stringIndex;
            if (booleanIndex > -1 || hasOwn$1(prop, "default")) {
              needCastKeys.push(_normalizedKey);
            }
          }
        }
      }
    }
    var res = [normalized, needCastKeys];
    if (isObject$1(comp)) {
      cache2.set(comp, res);
    }
    return res;
  }
  function validatePropName(key2) {
    if (key2[0] !== "$" && !isReservedProp(key2)) {
      return true;
    }
    return false;
  }
  function getType(ctor) {
    if (ctor === null) {
      return "null";
    }
    if (typeof ctor === "function") {
      return ctor.name || "";
    } else if (typeof ctor === "object") {
      var name = ctor.constructor && ctor.constructor.name;
      return name || "";
    }
    return "";
  }
  function isSameType(a, b) {
    return getType(a) === getType(b);
  }
  function getTypeIndex(type, expectedTypes) {
    if (isArray(expectedTypes)) {
      return expectedTypes.findIndex((t) => isSameType(t, type));
    } else if (isFunction(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1;
    }
    return -1;
  }
  var isInternalKey = (key2) => key2[0] === "_" || key2 === "$stable";
  var normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
  var normalizeSlot = (key2, rawSlot, ctx2) => {
    if (rawSlot._n) {
      return rawSlot;
    }
    var normalized = withCtx(function() {
      if (false)
        ;
      return normalizeSlotValue(rawSlot(...arguments));
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
        if (!isInternalKey(key2) && deletionComparisonTarget[key2] == null) {
          delete slots[key2];
        }
      }
    }
  };
  function setRef(rawRef, oldRawRef, parentSuspense, vnode) {
    var isUnmount = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
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
    if (isFunction(ref2)) {
      callWithErrorHandling(ref2, owner, 12, [value, refs]);
    } else {
      var _isString = isString(ref2);
      var _isRef = isRef(ref2);
      if (_isString || _isRef) {
        var doSet = () => {
          if (rawRef.f) {
            var existing = _isString ? hasOwn$1(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
            if (isUnmount) {
              isArray(existing) && remove(existing, refValue);
            } else {
              if (!isArray(existing)) {
                if (_isString) {
                  refs[ref2] = [refValue];
                  if (hasOwn$1(setupState, ref2)) {
                    setupState[ref2] = refs[ref2];
                  }
                } else {
                  ref2.value = [refValue];
                  if (rawRef.k)
                    refs[rawRef.k] = ref2.value;
                }
              } else if (!existing.includes(refValue)) {
                existing.push(refValue);
              }
            }
          } else if (_isString) {
            refs[ref2] = value;
            if (hasOwn$1(setupState, ref2)) {
              setupState[ref2] = value;
            }
          } else if (_isRef) {
            ref2.value = value;
            if (rawRef.k)
              refs[rawRef.k] = value;
          } else
            ;
        };
        if (value) {
          doSet.id = -1;
          queuePostRenderEffect(doSet, parentSuspense);
        } else {
          doSet();
        }
      }
    }
  }
  var queuePostRenderEffect = queueEffectWithSuspense;
  function createRenderer(options) {
    return baseCreateRenderer(options);
  }
  function baseCreateRenderer(options, createHydrationFns) {
    var target = getGlobalThis();
    target.__VUE__ = true;
    var {
      insert: hostInsert,
      remove: hostRemove,
      patchProp: hostPatchProp,
      createElement: hostCreateElement,
      createText: hostCreateText,
      createComment: hostCreateComment,
      setText: hostSetText,
      setElementText: hostSetElementText,
      parentNode: hostParentNode,
      nextSibling: hostNextSibling,
      setScopeId: hostSetScopeId = NOOP,
      insertStaticContent: hostInsertStaticContent
    } = options;
    var patch = function(n1, n2, container) {
      var anchor = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      var parentComponent = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
      var parentSuspense = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : null;
      var namespace = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : void 0;
      var slotScopeIds = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : null;
      var optimized = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : !!n2.dynamicChildren;
      if (n1 === n2) {
        return;
      }
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
        case Text:
          processText(n1, n2, container, anchor);
          break;
        case Comment:
          processCommentNode(n1, n2, container, anchor);
          break;
        case Static:
          if (n1 == null) {
            mountStaticNode(n2, container, anchor, namespace);
          }
          break;
        case Fragment:
          processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          break;
        default:
          if (shapeFlag & 1) {
            processElement(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          } else if (shapeFlag & 6) {
            processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          } else if (shapeFlag & 64) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
          } else if (shapeFlag & 128) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
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
    var mountStaticNode = (n2, container, anchor, namespace) => {
      [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace, n2.el, n2.anchor);
    };
    var moveStaticNode = (_ref12, container, nextSibling) => {
      var {
        el,
        anchor
      } = _ref12;
      var next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostInsert(el, container, nextSibling);
        el = next;
      }
      hostInsert(anchor, container, nextSibling);
    };
    var removeStaticNode = (_ref13) => {
      var {
        el,
        anchor
      } = _ref13;
      var next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostRemove(el);
        el = next;
      }
      hostRemove(anchor);
    };
    var processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      if (n2.type === "svg") {
        namespace = "svg";
      } else if (n2.type === "math") {
        namespace = "mathml";
      }
      if (n1 == null) {
        mountElement(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
      } else {
        patchElement(n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
      }
    };
    var mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      var el;
      var vnodeHook;
      var {
        props,
        shapeFlag,
        transition,
        dirs
      } = vnode;
      el = vnode.el = hostCreateElement(vnode.type, namespace, props && props.is, props);
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(vnode.children, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(vnode, namespace), slotScopeIds, optimized);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
      if (props) {
        for (var key2 in props) {
          if (key2 !== "value" && !isReservedProp(key2)) {
            hostPatchProp(el, key2, null, props[key2], namespace, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value, namespace);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      Object.defineProperty(el, "__vueParentComponent", {
        value: parentComponent,
        enumerable: false
      });
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      var needCallTransitionHooks = needTransition(parentSuspense, transition);
      if (needCallTransitionHooks) {
        transition.beforeEnter(el);
      }
      hostInsert(el, container, anchor);
      if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
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
    var mountChildren = function(children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) {
      var start = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : 0;
      for (var i2 = start; i2 < children.length; i2++) {
        var child = children[i2] = optimized ? cloneIfMounted(children[i2]) : normalizeVNode(children[i2]);
        patch(null, child, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
      }
    };
    var patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
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
      parentComponent && toggleRecurse(parentComponent, false);
      if (vnodeHook = newProps.onVnodeBeforeUpdate) {
        invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
      }
      if (dirs) {
        invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
      }
      parentComponent && toggleRecurse(parentComponent, true);
      if (dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds);
      } else if (!optimized) {
        patchChildren(n1, n2, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds, false);
      }
      if (patchFlag > 0) {
        if (patchFlag & 16) {
          patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, namespace);
        } else {
          if (patchFlag & 2) {
            if (oldProps.class !== newProps.class) {
              hostPatchProp(el, "class", null, newProps.class, namespace);
            }
          }
          if (patchFlag & 4) {
            hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
          }
          if (patchFlag & 8) {
            var propsToUpdate = n2.dynamicProps;
            for (var i2 = 0; i2 < propsToUpdate.length; i2++) {
              var key2 = propsToUpdate[i2];
              var prev = oldProps[key2];
              var next = newProps[key2];
              if (next !== prev || key2 === "value") {
                hostPatchProp(el, key2, prev, next, namespace, n1.children, parentComponent, parentSuspense, unmountChildren);
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
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, namespace);
      }
      if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
          dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
        }, parentSuspense);
      }
    };
    var patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
      for (var i2 = 0; i2 < newChildren.length; i2++) {
        var oldVNode = oldChildren[i2];
        var newVNode = newChildren[i2];
        var container = (
          // oldVNode may be an errored async setup() component inside Suspense
          // which will not have a mounted element
          oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
          // of the Fragment itself so it can move its children.
          (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
          // which also requires the correct parent container
          !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
          oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
            // In other cases, the parent container is not actually used so we
            // just pass the block element here to avoid a DOM parentNode call.
            fallbackContainer
          )
        );
        patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, true);
      }
    };
    var patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, namespace) => {
      if (oldProps !== newProps) {
        if (oldProps !== EMPTY_OBJ) {
          for (var key2 in oldProps) {
            if (!isReservedProp(key2) && !(key2 in newProps)) {
              hostPatchProp(el, key2, oldProps[key2], null, namespace, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
        for (var _key18 in newProps) {
          if (isReservedProp(_key18))
            continue;
          var next = newProps[_key18];
          var prev = oldProps[_key18];
          if (next !== prev && _key18 !== "value") {
            hostPatchProp(el, _key18, prev, next, namespace, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if ("value" in newProps) {
          hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
        }
      }
    };
    var processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      var fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
      var fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
      var {
        patchFlag,
        dynamicChildren,
        slotScopeIds: fragmentSlotScopeIds
      } = n2;
      if (fragmentSlotScopeIds) {
        slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
      }
      if (n1 == null) {
        hostInsert(fragmentStartAnchor, container, anchor);
        hostInsert(fragmentEndAnchor, container, anchor);
        mountChildren(
          // #10007
          // such fragment like `<></>` will be compiled into
          // a fragment which doesn't have a children.
          // In this case fallback to an empty array
          n2.children || [],
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
        // of renderSlot() with no valid children
        n1.dynamicChildren) {
          patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, namespace, slotScopeIds);
          if (
            // #2080 if the stable fragment has a key, it's a <template v-for> that may
            //  get moved around. Make sure all root level vnodes inherit el.
            // #2134 or if it's a component root, it may also get moved around
            // as the component is being moved.
            n2.key != null || parentComponent && n2 === parentComponent.subTree
          ) {
            traverseStaticChildren(
              n1,
              n2,
              true
              /* shallow */
            );
          }
        } else {
          patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        }
      }
    };
    var processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      n2.slotScopeIds = slotScopeIds;
      if (n1 == null) {
        if (n2.shapeFlag & 512) {
          parentComponent.ctx.activate(n2, container, anchor, namespace, optimized);
        } else {
          mountComponent(n2, container, anchor, parentComponent, parentSuspense, namespace, optimized);
        }
      } else {
        updateComponent(n1, n2, optimized);
      }
    };
    var mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
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
          var placeholder = instance.subTree = createVNode(Comment);
          processCommentNode(null, placeholder, container, anchor);
        }
      } else {
        setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized);
      }
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
          instance.effect.dirty = true;
          instance.update();
        }
      } else {
        n2.el = n1.el;
        instance.vnode = n2;
      }
    };
    var setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
      var componentUpdateFn = () => {
        if (!instance.isMounted) {
          var vnodeHook;
          var {
            el,
            props
          } = initialVNode;
          var {
            bm,
            m,
            parent
          } = instance;
          var isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
          toggleRecurse(instance, false);
          if (bm) {
            invokeArrayFns(bm);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
            invokeVNodeHook(vnodeHook, parent, initialVNode);
          }
          toggleRecurse(instance, true);
          if (el && hydrateNode) {
            var hydrateSubTree = () => {
              instance.subTree = renderComponentRoot(instance);
              hydrateNode(el, instance.subTree, instance, parentSuspense, null);
            };
            if (isAsyncWrapperVNode) {
              initialVNode.type.__asyncLoader().then(
                // note: we are moving the render call into an async callback,
                // which means it won't track dependencies - but it's ok because
                // a server-rendered async wrapper is already in resolved state
                // and it will never need to change.
                () => !instance.isUnmounted && hydrateSubTree()
              );
            } else {
              hydrateSubTree();
            }
          } else {
            var subTree = instance.subTree = renderComponentRoot(instance);
            patch(null, subTree, container, anchor, instance, parentSuspense, namespace);
            initialVNode.el = subTree.el;
          }
          if (m) {
            queuePostRenderEffect(m, parentSuspense);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
            var scopedInitialVNode = initialVNode;
            queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
          }
          if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
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
          {
            var nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
            if (nonHydratedAsyncRoot) {
              if (next) {
                next.el = vnode.el;
                updateComponentPreRender(instance, next, optimized);
              }
              nonHydratedAsyncRoot.asyncDep.then(() => {
                if (!instance.isUnmounted) {
                  componentUpdateFn();
                }
              });
              return;
            }
          }
          var originNext = next;
          var _vnodeHook;
          toggleRecurse(instance, false);
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
          toggleRecurse(instance, true);
          var nextTree = renderComponentRoot(instance);
          var prevTree = instance.subTree;
          instance.subTree = nextTree;
          patch(
            prevTree,
            nextTree,
            // parent may have changed if it's in a teleport
            hostParentNode(prevTree.el),
            // anchor may have changed if it's in a fragment
            getNextHostNode(prevTree),
            instance,
            parentSuspense,
            namespace
          );
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
      };
      var effect2 = instance.effect = new ReactiveEffect(
        componentUpdateFn,
        NOOP,
        () => queueJob(update),
        instance.scope
        // track it in component's effect scope
      );
      var update = instance.update = () => {
        if (effect2.dirty) {
          effect2.run();
        }
      };
      update.id = instance.uid;
      toggleRecurse(instance, true);
      update();
    };
    var updateComponentPreRender = (instance, nextVNode, optimized) => {
      nextVNode.component = instance;
      var prevProps = instance.vnode.props;
      instance.vnode = nextVNode;
      instance.next = null;
      updateProps(instance, nextVNode.props, prevProps, optimized);
      updateSlots(instance, nextVNode.children, optimized);
      pauseTracking();
      flushPreFlushCbs(instance);
      resetTracking();
    };
    var patchChildren = function(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds) {
      var optimized = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : false;
      var c1 = n1 && n1.children;
      var prevShapeFlag = n1 ? n1.shapeFlag : 0;
      var c2 = n2.children;
      var {
        patchFlag,
        shapeFlag
      } = n2;
      if (patchFlag > 0) {
        if (patchFlag & 128) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          return;
        } else if (patchFlag & 256) {
          patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
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
            patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          } else {
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
          if (prevShapeFlag & 8) {
            hostSetElementText(container, "");
          }
          if (shapeFlag & 16) {
            mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          }
        }
      }
    };
    var patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      c1 = c1 || EMPTY_ARR;
      c2 = c2 || EMPTY_ARR;
      var oldLength = c1.length;
      var newLength = c2.length;
      var commonLength = Math.min(oldLength, newLength);
      var i2;
      for (i2 = 0; i2 < commonLength; i2++) {
        var nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
        patch(c1[i2], nextChild, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
      }
      if (oldLength > newLength) {
        unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
      } else {
        mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, commonLength);
      }
    };
    var patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      var i2 = 0;
      var l2 = c2.length;
      var e1 = c1.length - 1;
      var e2 = l2 - 1;
      while (i2 <= e1 && i2 <= e2) {
        var n1 = c1[i2];
        var n2 = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
        if (isSameVNodeType(n1, n2)) {
          patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        } else {
          break;
        }
        i2++;
      }
      while (i2 <= e1 && i2 <= e2) {
        var _n = c1[e1];
        var _n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
        if (isSameVNodeType(_n, _n2)) {
          patch(_n, _n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
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
            patch(null, c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
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
        var keyToNewIndexMap = /* @__PURE__ */ new Map();
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
            patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
            patched++;
          }
        }
        var increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
        j = increasingNewIndexSequence.length - 1;
        for (i2 = toBePatched - 1; i2 >= 0; i2--) {
          var nextIndex = s2 + i2;
          var _nextChild = c2[nextIndex];
          var _anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
          if (newIndexToOldIndexMap[i2] === 0) {
            patch(null, _nextChild, container, _anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          } else if (moved) {
            if (j < 0 || i2 !== increasingNewIndexSequence[j]) {
              move(_nextChild, container, _anchor, 2);
            } else {
              j--;
            }
          }
        }
      }
    };
    var move = function(vnode, container, anchor, moveType) {
      var parentSuspense = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
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
      var needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
      if (needTransition2) {
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
          var remove22 = () => hostInsert(el, container, anchor);
          var performLeave = () => {
            leave(el, () => {
              remove22();
              afterLeave && afterLeave();
            });
          };
          if (delayLeave) {
            delayLeave(el, remove22, performLeave);
          } else {
            performLeave();
          }
        }
      } else {
        hostInsert(el, container, anchor);
      }
    };
    var unmount = function(vnode, parentComponent, parentSuspense) {
      var doRemove = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
      var optimized = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
      var {
        type,
        props,
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
      var shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
      var vnodeHook;
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
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
        } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
        (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
          unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
        } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
          unmountChildren(children, parentComponent, parentSuspense);
        }
        if (doRemove) {
          remove2(vnode);
        }
      }
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
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
        {
          removeFragment(el, anchor);
        }
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
        scope,
        update,
        subTree,
        um
      } = instance;
      if (bum) {
        invokeArrayFns(bum);
      }
      scope.stop();
      if (update) {
        update.active = false;
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
    var unmountChildren = function(children, parentComponent, parentSuspense) {
      var doRemove = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
      var optimized = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
      var start = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
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
    var isFlushing2 = false;
    var render2 = (vnode, container, namespace) => {
      if (vnode == null) {
        if (container._vnode) {
          unmount(container._vnode, null, null, true);
        }
      } else {
        var p2 = container.__vueParent;
        patch(container._vnode || null, vnode, container, null, p2, null, namespace);
      }
      if (!isFlushing2) {
        isFlushing2 = true;
        flushPreFlushCbs();
        isFlushing2 = false;
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
    var hydrate2;
    var hydrateNode;
    if (createHydrationFns) {
      [hydrate2, hydrateNode] = createHydrationFns(internals);
    }
    return {
      render: render2,
      hydrate: hydrate2,
      createApp: createAppAPI(render2, hydrate2)
    };
  }
  function resolveChildrenNamespace(_ref14, currentNamespace) {
    var {
      type,
      props
    } = _ref14;
    return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
  }
  function toggleRecurse(_ref15, allowed) {
    var {
      effect: effect2,
      update
    } = _ref15;
    effect2.allowRecurse = update.allowRecurse = allowed;
  }
  function needTransition(parentSuspense, transition) {
    return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
  }
  function traverseStaticChildren(n1, n2) {
    var shallow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
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
        if (c2.type === Text) {
          c2.el = c1.el;
        }
      }
    }
  }
  function getSequence(arr) {
    var p2 = arr.slice();
    var result = [0];
    var i2, j, u, v, c2;
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
        v = result.length - 1;
        while (u < v) {
          c2 = u + v >> 1;
          if (arr[result[c2]] < arrI) {
            u = c2 + 1;
          } else {
            v = c2;
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
    v = result[u - 1];
    while (u-- > 0) {
      result[u] = v;
      v = p2[v];
    }
    return result;
  }
  function locateNonHydratedAsyncRoot(instance) {
    var subComponent = instance.subTree.component;
    if (subComponent) {
      if (subComponent.asyncDep && !subComponent.asyncResolved) {
        return subComponent;
      } else {
        return locateNonHydratedAsyncRoot(subComponent);
      }
    }
  }
  var isTeleport = (type) => type.__isTeleport;
  var Fragment = Symbol.for("v-fgt");
  var Text = Symbol.for("v-txt");
  var Comment = Symbol.for("v-cmt");
  var Static = Symbol.for("v-stc");
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
  var normalizeKey = (_ref19) => {
    var {
      key: key2
    } = _ref19;
    return key2 != null ? key2 : null;
  };
  var normalizeRef = (_ref20) => {
    var {
      ref: ref2,
      ref_key,
      ref_for
    } = _ref20;
    if (typeof ref2 === "number") {
      ref2 = "" + ref2;
    }
    return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? {
      i: currentRenderingInstance,
      r: ref2,
      k: ref_key,
      f: !!ref_for
    } : ref2 : null;
  };
  function createBaseVNode(type) {
    var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    var children = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    var patchFlag = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    var dynamicProps = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
    var shapeFlag = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : type === Fragment ? 0 : 1;
    var isBlockNode = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : false;
    var needFullChildrenNormalization = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : false;
    var vnode = {
      __v_isVNode: true,
      __v_skip: true,
      type,
      props,
      key: props && normalizeKey(props),
      ref: props && normalizeRef(props),
      scopeId: currentScopeId,
      slotScopeIds: null,
      children,
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
      staticCount: 0,
      shapeFlag,
      patchFlag,
      dynamicProps,
      dynamicChildren: null,
      appContext: null,
      ctx: currentRenderingInstance
    };
    if (needFullChildrenNormalization) {
      normalizeChildren(vnode, children);
      if (shapeFlag & 128) {
        type.normalize(vnode);
      }
    } else if (children) {
      vnode.shapeFlag |= isString(children) ? 8 : 16;
    }
    if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
    !isBlockNode && // has current parent block
    currentBlock && // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    vnode.patchFlag !== 32) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  var createVNode = _createVNode;
  function _createVNode(type) {
    var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    var children = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    var patchFlag = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    var dynamicProps = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
    var isBlockNode = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : false;
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
      type = Comment;
    }
    if (isVNode(type)) {
      var cloned = cloneVNode(
        type,
        props,
        true
        /* mergeRef: true */
      );
      if (children) {
        normalizeChildren(cloned, children);
      }
      if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
        if (cloned.shapeFlag & 6) {
          currentBlock[currentBlock.indexOf(type)] = cloned;
        } else {
          currentBlock.push(cloned);
        }
      }
      cloned.patchFlag |= -2;
      return cloned;
    }
    if (isClassComponent(type)) {
      type = type.__vccOpts;
    }
    if (props) {
      props = guardReactiveProps(props);
      var {
        class: klass,
        style
      } = props;
      if (klass && !isString(klass)) {
        props.class = normalizeClass(klass);
      }
      if (isObject$1(style)) {
        if (isProxy(style) && !isArray(style)) {
          style = extend({}, style);
        }
        props.style = normalizeStyle(style);
      }
    }
    var shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction(type) ? 2 : 0;
    return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
  }
  function guardReactiveProps(props) {
    if (!props)
      return null;
    return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
  }
  function cloneVNode(vnode, extraProps) {
    var mergeRef = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    var {
      props,
      ref: ref2,
      patchFlag,
      children
    } = vnode;
    var mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    var cloned = {
      __v_isVNode: true,
      __v_skip: true,
      type: vnode.type,
      props: mergedProps,
      key: mergedProps && normalizeKey(mergedProps),
      ref: extraProps && extraProps.ref ? (
        // #2078 in the case of <component :is="vnode" ref="extra"/>
        // if the vnode itself already has a ref, cloneVNode will need to merge
        // the refs so the single vnode can be set on multiple refs
        mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)
      ) : ref2,
      scopeId: vnode.scopeId,
      slotScopeIds: vnode.slotScopeIds,
      children,
      target: vnode.target,
      targetAnchor: vnode.targetAnchor,
      staticCount: vnode.staticCount,
      shapeFlag: vnode.shapeFlag,
      // if the vnode is cloned with extra props, we can no longer assume its
      // existing patch flag to be reliable and need to add the FULL_PROPS flag.
      // note: preserve flag for fragments since they use the flag for children
      // fast paths only.
      patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
      dynamicProps: vnode.dynamicProps,
      dynamicChildren: vnode.dynamicChildren,
      appContext: vnode.appContext,
      dirs: vnode.dirs,
      transition: vnode.transition,
      // These should technically only be non-null on mounted VNodes. However,
      // they *should* be copied for kept-alive vnodes. So we just always copy
      // them since them being non-null during a mount doesn't affect the logic as
      // they will simply be overwritten.
      component: vnode.component,
      suspense: vnode.suspense,
      ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
      ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
      el: vnode.el,
      anchor: vnode.anchor,
      ctx: vnode.ctx,
      ce: vnode.ce
    };
    return cloned;
  }
  function createTextVNode() {
    var text = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : " ";
    var flag = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return createVNode(Text, null, text, flag);
  }
  function normalizeVNode(child) {
    if (child == null || typeof child === "boolean") {
      return createVNode(Comment);
    } else if (isArray(child)) {
      return createVNode(
        Fragment,
        null,
        // #3666, avoid reference pollution when reusing vnode
        child.slice()
      );
    } else if (typeof child === "object") {
      return cloneIfMounted(child);
    } else {
      return createVNode(Text, null, String(child));
    }
  }
  function cloneIfMounted(child) {
    return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
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
      if (shapeFlag & (1 | 64)) {
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
  function mergeProps() {
    var ret = {};
    for (var i2 = 0; i2 < arguments.length; i2++) {
      var toMerge = i2 < 0 || arguments.length <= i2 ? void 0 : arguments[i2];
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
          if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
            ret[key2] = existing ? [].concat(existing, incoming) : incoming;
          }
        } else if (key2 !== "") {
          ret[key2] = toMerge[key2];
        }
      }
    }
    return ret;
  }
  function invokeVNodeHook(hook, instance, vnode) {
    var prevVNode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
    callWithAsyncErrorHandling(hook, instance, 7, [vnode, prevVNode]);
  }
  var emptyAppContext = createAppContext();
  var uid = 0;
  function createComponentInstance(vnode, parent, suspense) {
    var type = vnode.type;
    var appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    var instance = {
      uid: uid++,
      vnode,
      type,
      parent,
      appContext,
      root: null,
      // to be immediately set
      next: null,
      subTree: null,
      // will be set synchronously right after creation
      effect: null,
      update: null,
      // will be set synchronously right after creation
      scope: new EffectScope(
        true
        /* detached */
      ),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: parent ? parent.provides : Object.create(appContext.provides),
      accessCache: null,
      renderCache: [],
      // local resolved assets
      components: null,
      directives: null,
      // resolved props and emits options
      propsOptions: normalizePropsOptions(type, appContext),
      emitsOptions: normalizeEmitsOptions(type, appContext),
      // emit
      emit: null,
      // to be set immediately
      emitted: null,
      // props default value
      propsDefaults: EMPTY_OBJ,
      // inheritAttrs
      inheritAttrs: type.inheritAttrs,
      // state
      ctx: EMPTY_OBJ,
      data: EMPTY_OBJ,
      props: EMPTY_OBJ,
      attrs: EMPTY_OBJ,
      slots: EMPTY_OBJ,
      refs: EMPTY_OBJ,
      setupState: EMPTY_OBJ,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      // suspense related
      suspense,
      suspenseId: suspense ? suspense.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      // lifecycle hooks
      // not using enums here because it results in computed properties
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
    instance.emit = emit.bind(null, instance);
    if (vnode.ce) {
      vnode.ce(instance);
    }
    return instance;
  }
  var currentInstance = null;
  var internalSetCurrentInstance;
  var setInSSRSetupState;
  {
    var g = getGlobalThis();
    var registerGlobalSetter = (key2, setter) => {
      var setters;
      if (!(setters = g[key2]))
        setters = g[key2] = [];
      setters.push(setter);
      return (v) => {
        if (setters.length > 1)
          setters.forEach((set2) => set2(v));
        else
          setters[0](v);
      };
    };
    internalSetCurrentInstance = registerGlobalSetter("__VUE_INSTANCE_SETTERS__", (v) => currentInstance = v);
    setInSSRSetupState = registerGlobalSetter("__VUE_SSR_SETTERS__", (v) => isInSSRComponentSetup = v);
  }
  var setCurrentInstance = (instance) => {
    var prev = currentInstance;
    internalSetCurrentInstance(instance);
    instance.scope.on();
    return () => {
      instance.scope.off();
      internalSetCurrentInstance(prev);
    };
  };
  var unsetCurrentInstance = () => {
    currentInstance && currentInstance.scope.off();
    internalSetCurrentInstance(null);
  };
  function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4;
  }
  var isInSSRComponentSetup = false;
  function setupComponent(instance) {
    var isSSR = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    isSSR && setInSSRSetupState(isSSR);
    var {
      props,
      children
    } = instance.vnode;
    var isStateful = isStatefulComponent(instance);
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children);
    var setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
    isSSR && setInSSRSetupState(false);
    return setupResult;
  }
  function setupStatefulComponent(instance, isSSR) {
    var Component = instance.type;
    instance.accessCache = /* @__PURE__ */ Object.create(null);
    instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
    var {
      setup
    } = Component;
    if (setup) {
      var setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
      var reset = setCurrentInstance(instance);
      pauseTracking();
      var setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
      resetTracking();
      reset();
      if (isPromise(setupResult)) {
        setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
        if (isSSR) {
          return setupResult.then((resolvedResult) => {
            handleSetupResult(instance, resolvedResult, isSSR);
          }).catch((e) => {
            handleError(e, instance, 0);
          });
        } else {
          instance.asyncDep = setupResult;
        }
      } else {
        handleSetupResult(instance, setupResult, isSSR);
      }
    } else {
      finishComponentSetup(instance, isSSR);
    }
  }
  function handleSetupResult(instance, setupResult, isSSR) {
    if (isFunction(setupResult)) {
      if (instance.type.__ssrInlineRender) {
        instance.ssrRender = setupResult;
      } else {
        instance.render = setupResult;
      }
    } else if (isObject$1(setupResult)) {
      instance.setupState = proxyRefs(setupResult);
    } else
      ;
    finishComponentSetup(instance, isSSR);
  }
  var compile;
  function finishComponentSetup(instance, isSSR, skipOptions) {
    var Component = instance.type;
    if (!instance.render) {
      if (!isSSR && compile && !Component.render) {
        var template = Component.template || resolveMergedOptions(instance).template;
        if (template) {
          var {
            isCustomElement,
            compilerOptions
          } = instance.appContext.config;
          var {
            delimiters,
            compilerOptions: componentCompilerOptions
          } = Component;
          var finalCompilerOptions = extend(extend({
            isCustomElement,
            delimiters
          }, compilerOptions), componentCompilerOptions);
          Component.render = compile(template, finalCompilerOptions);
        }
      }
      instance.render = Component.render || NOOP;
    }
    {
      var reset = setCurrentInstance(instance);
      pauseTracking();
      try {
        applyOptions(instance);
      } finally {
        resetTracking();
        reset();
      }
    }
  }
  function getAttrsProxy(instance) {
    return instance.attrsProxy || (instance.attrsProxy = new Proxy(instance.attrs, {
      get(target, key2) {
        track(instance, "get", "$attrs");
        return target[key2];
      }
    }));
  }
  function createSetupContext(instance) {
    var expose = (exposed) => {
      instance.exposed = exposed || {};
    };
    {
      return {
        get attrs() {
          return getAttrsProxy(instance);
        },
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
        },
        has(target, key2) {
          return key2 in target || key2 in publicPropertiesMap;
        }
      }));
    }
  }
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
  function getComponentName(Component) {
    var includeInferred = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
  }
  function formatComponentName(instance, Component) {
    var isRoot = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
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
  var computed = (getterOrOptions, debugOptions) => {
    var c2 = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
    return c2;
  };
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
  var version = "3.4.21";
  var svgNS = "http://www.w3.org/2000/svg";
  var mathmlNS = "http://www.w3.org/1998/Math/MathML";
  var doc = typeof document !== "undefined" ? document : null;
  var templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
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
    createElement: (tag, namespace, is, props) => {
      var el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : doc.createElement(tag, is ? {
        is
      } : void 0);
      if (tag === "select" && props && props.multiple != null) {
        el.setAttribute("multiple", props.multiple);
      }
      return el;
    },
    createText: (text) => doc.createTextNode(text),
    createComment: (text) => doc.createComment(text),
    setText: (node, text) => {
      node.nodeValue = text;
    },
    setElementText: (el, text) => {
      el.textContent = text;
    },
    parentNode: (node) => node.parentNode,
    nextSibling: (node) => node.nextSibling,
    querySelector: (selector) => doc.querySelector(selector),
    setScopeId(el, id2) {
      el.setAttribute(id2, "");
    },
    // __UNSAFE__
    // Reason: innerHTML.
    // Static content here can only come from compiled templates.
    // As long as the user only uses trusted templates, this is safe.
    insertStaticContent(content, parent, anchor, namespace, start, end) {
      var before = anchor ? anchor.previousSibling : parent.lastChild;
      if (start && (start === end || start.nextSibling)) {
        while (true) {
          parent.insertBefore(start.cloneNode(true), anchor);
          if (start === end || !(start = start.nextSibling))
            break;
        }
      } else {
        templateContainer.innerHTML = namespace === "svg" ? "<svg>".concat(content, "</svg>") : namespace === "mathml" ? "<math>".concat(content, "</math>") : content;
        var template = templateContainer.content;
        if (namespace === "svg" || namespace === "mathml") {
          var wrapper = template.firstChild;
          while (wrapper.firstChild) {
            template.appendChild(wrapper.firstChild);
          }
          template.removeChild(wrapper);
        }
        parent.insertBefore(template, anchor);
      }
      return [
        // first
        before ? before.nextSibling : parent.firstChild,
        // last
        anchor ? anchor.previousSibling : parent.lastChild
      ];
    }
  };
  var vtcKey = Symbol("_vtc");
  function patchClass$1(el, value, isSVG) {
    var transitionClasses = el[vtcKey];
    if (transitionClasses) {
      value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
    }
    if (value == null) {
      el.removeAttribute("class");
    } else if (isSVG) {
      el.setAttribute("class", value);
    } else {
      el.className = value;
    }
  }
  var vShowOriginalDisplay = Symbol("_vod");
  var vShowHidden = Symbol("_vsh");
  var CSS_VAR_TEXT = Symbol("");
  var displayRE = /(^|;)\s*display\s*:/;
  function patchStyle$1(el, prev, next) {
    var style = el.style;
    var isCssString = isString(next);
    var hasControlledDisplay = false;
    if (next && !isCssString) {
      if (prev) {
        if (!isString(prev)) {
          for (var key2 in prev) {
            if (next[key2] == null) {
              setStyle$1(style, key2, "");
            }
          }
        } else {
          for (var prevStyle of prev.split(";")) {
            var _key21 = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
            if (next[_key21] == null) {
              setStyle$1(style, _key21, "");
            }
          }
        }
      }
      for (var _key22 in next) {
        if (_key22 === "display") {
          hasControlledDisplay = true;
        }
        setStyle$1(style, _key22, next[_key22]);
      }
    } else {
      if (isCssString) {
        if (prev !== next) {
          var cssVarText = style[CSS_VAR_TEXT];
          if (cssVarText) {
            next += ";" + cssVarText;
          }
          style.cssText = normalizeStyleValue(next);
          hasControlledDisplay = displayRE.test(next);
        }
      } else if (prev) {
        el.removeAttribute("style");
      }
    }
    if (vShowOriginalDisplay in el) {
      el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
      if (el[vShowHidden]) {
        style.display = "none";
      }
    }
  }
  var importantRE$1 = /\s*!important$/;
  function setStyle$1(style, name, val) {
    if (isArray(val)) {
      val.forEach((v) => setStyle$1(style, name, v));
    } else {
      if (val == null)
        val = "";
      val = normalizeStyleValue(val);
      if (name.startsWith("--")) {
        style.setProperty(name, val);
      } else {
        var prefixed = normalizeStyleName(style, name);
        if (importantRE$1.test(val)) {
          style.setProperty(hyphenate(prefixed), val.replace(importantRE$1, ""), "important");
        } else {
          style[prefixed] = val;
        }
      }
    }
  }
  var xlinkNS = "http://www.w3.org/1999/xlink";
  function patchAttr(el, key2, value, isSVG, instance) {
    if (isSVG && key2.startsWith("xlink:")) {
      if (value == null) {
        el.removeAttributeNS(xlinkNS, key2.slice(6, key2.length));
      } else {
        el.setAttributeNS(xlinkNS, key2, value);
      }
    } else {
      var isBoolean2 = isSpecialBooleanAttr(key2);
      if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
        el.removeAttribute(key2);
      } else {
        el.setAttribute(key2, isBoolean2 ? "" : value);
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
    var tag = el.tagName;
    if (key2 === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
    !tag.includes("-")) {
      var oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
      var newValue = value == null ? "" : value;
      if (oldValue !== newValue || !("_value" in el)) {
        el.value = newValue;
      }
      if (value == null) {
        el.removeAttribute(key2);
      }
      el._value = value;
      return;
    }
    var needRemove = false;
    if (value === "" || value == null) {
      var type = typeof el[key2];
      if (type === "boolean") {
        value = includeBooleanAttr(value);
      } else if (value == null && type === "string") {
        value = "";
        needRemove = true;
      } else if (type === "number") {
        value = 0;
        needRemove = true;
      }
    }
    try {
      el[key2] = value;
    } catch (e) {
    }
    needRemove && el.removeAttribute(key2);
  }
  function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options);
  }
  function removeEventListener$1(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
  }
  var veiKey = Symbol("_vei");
  function patchEvent$1(el, rawName, prevValue, nextValue) {
    var instance = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
    var invokers = el[veiKey] || (el[veiKey] = {});
    var existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
      existingInvoker.value = nextValue;
    } else {
      var [name, options] = parseName(rawName);
      if (nextValue) {
        var invoker = invokers[rawName] = createInvoker$1(nextValue, instance);
        addEventListener(el, name, invoker, options);
      } else if (existingInvoker) {
        removeEventListener$1(el, name, existingInvoker, options);
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
    var event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
    return [event, options];
  }
  var cachedNow = 0;
  var p = /* @__PURE__ */ Promise.resolve();
  var getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
  function createInvoker$1(initialValue, instance) {
    var invoker = (e) => {
      if (!e._vts) {
        e._vts = Date.now();
      } else if (e._vts <= invoker.attached) {
        return;
      }
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
  }
  function patchStopImmediatePropagation(e, value) {
    if (isArray(value)) {
      var originalStop = e.stopImmediatePropagation;
      e.stopImmediatePropagation = () => {
        originalStop.call(e);
        e._stopped = true;
      };
      return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
    } else {
      return value;
    }
  }
  var isNativeOn = (key2) => key2.charCodeAt(0) === 111 && key2.charCodeAt(1) === 110 && // lowercase letter
  key2.charCodeAt(2) > 96 && key2.charCodeAt(2) < 123;
  var patchProp = (el, key2, prevValue, nextValue, namespace, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
    var isSVG = namespace === "svg";
    if (key2 === "class") {
      patchClass$1(el, nextValue, isSVG);
    } else if (key2 === "style") {
      patchStyle$1(el, prevValue, nextValue);
    } else if (isOn(key2)) {
      if (!isModelListener(key2)) {
        patchEvent$1(el, key2, prevValue, nextValue, parentComponent);
      }
    } else if (key2[0] === "." ? (key2 = key2.slice(1), true) : key2[0] === "^" ? (key2 = key2.slice(1), false) : shouldSetAsProp(el, key2, nextValue, isSVG)) {
      patchDOMProp(el, key2, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
    } else {
      if (key2 === "true-value") {
        el._trueValue = nextValue;
      } else if (key2 === "false-value") {
        el._falseValue = nextValue;
      }
      patchAttr(el, key2, nextValue, isSVG);
    }
  };
  function shouldSetAsProp(el, key2, value, isSVG) {
    if (isSVG) {
      if (key2 === "innerHTML" || key2 === "textContent") {
        return true;
      }
      if (key2 in el && isNativeOn(key2) && isFunction(value)) {
        return true;
      }
      return false;
    }
    if (key2 === "spellcheck" || key2 === "draggable" || key2 === "translate") {
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
    if (key2 === "width" || key2 === "height") {
      var tag = el.tagName;
      if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
        return false;
      }
    }
    if (isNativeOn(key2) && isString(value)) {
      return false;
    }
    return key2 in el;
  }
  var systemModifiers = ["ctrl", "shift", "alt", "meta"];
  var modifierGuards = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, modifiers) => systemModifiers.some((m) => e["".concat(m, "Key")] && !modifiers.includes(m))
  };
  var withModifiers = (fn, modifiers) => {
    var cache2 = fn._withMods || (fn._withMods = {});
    var cacheKey = modifiers.join(".");
    return cache2[cacheKey] || (cache2[cacheKey] = function(event) {
      for (var i2 = 0; i2 < modifiers.length; i2++) {
        var guard = modifierGuards[modifiers[i2]];
        if (guard && guard(event, modifiers))
          return;
      }
      for (var _len13 = arguments.length, args = new Array(_len13 > 1 ? _len13 - 1 : 0), _key25 = 1; _key25 < _len13; _key25++) {
        args[_key25 - 1] = arguments[_key25];
      }
      return fn(event, ...args);
    });
  };
  var rendererOptions = /* @__PURE__ */ extend({
    patchProp
  }, nodeOps);
  var renderer;
  function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }
  var createApp = function() {
    var app = ensureRenderer().createApp(...arguments);
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
      var proxy = mount(container, false, resolveRootNamespace(container));
      if (container instanceof Element) {
        container.removeAttribute("v-cloak");
        container.setAttribute("data-v-app", "");
      }
      return proxy;
    };
    return app;
  };
  function resolveRootNamespace(container) {
    if (container instanceof SVGElement) {
      return "svg";
    }
    if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
      return "mathml";
    }
  }
  function normalizeContainer(container) {
    if (isString(container)) {
      var res = document.querySelector(container);
      return res;
    }
    return container;
  }
  var attrs = ["top", "left", "right", "bottom"];
  var inited;
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
      attrs.forEach(function(attr) {
        elementComputedStyle[attr] = 0;
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
    } catch (e) {
    }
    function addChild(parent, attr) {
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
        paddingBottom: support + "(safe-area-inset-" + attr + ")"
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
          attrChange(attr);
        }
        a1.addEventListener("scroll", onScroll, passiveEvents);
        a2.addEventListener("scroll", onScroll, passiveEvents);
      });
      var computedStyle = getComputedStyle(a1);
      Object.defineProperty(elementComputedStyle, attr, {
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
      setTimeout(function() {
        var style = {};
        changeAttrs.forEach(function(attr2) {
          style[attr2] = elementComputedStyle[attr2];
        });
        changeAttrs.length = 0;
        callbacks.forEach(function(callback) {
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
    if (typeof callback === "function") {
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
  const safeAreaInsets$1 = /* @__PURE__ */ getDefaultExportFromCjs(out);
  function getWindowOffsetCssVar(style, name) {
    return parseInt((style.getPropertyValue(name).match(/\d+/) || ["0"])[0]);
  }
  function getWindowTop() {
    var style = document.documentElement.style;
    var top = getWindowOffsetCssVar(style, "--window-top");
    return top ? top + safeAreaInsets$1.top : 0;
  }
  function getWindowOffset() {
    var style = document.documentElement.style;
    var top = getWindowTop();
    var bottom = getWindowOffsetCssVar(style, "--window-bottom");
    var left = getWindowOffsetCssVar(style, "--window-left");
    var right = getWindowOffsetCssVar(style, "--window-right");
    var topWindowHeight = getWindowOffsetCssVar(style, "--top-window-height");
    return {
      top,
      bottom: bottom ? bottom + safeAreaInsets$1.bottom : 0,
      left: left ? left + safeAreaInsets$1.left : 0,
      right: right ? right + safeAreaInsets$1.right : 0,
      topWindowHeight: topWindowHeight || 0
    };
  }
  function updateCssVar(cssVars) {
    var style = document.documentElement.style;
    Object.keys(cssVars).forEach((name) => {
      style.setProperty(name, cssVars[name]);
    });
  }
  function PolySymbol(name) {
    return Symbol(name);
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
  function createScrollListener(_ref) {
    var {
      onPageScroll,
      onReachBottom,
      onReachBottomDistance
    } = _ref;
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
      return getRealRoute(fromRoute, toRoute.slice(2));
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
    return addLeadingSlash(fromRouteArray.concat(toRouteArray).join("/"));
  }
  class ComponentDescriptor {
    constructor(vm) {
      this.$bindClass = false;
      this.$bindStyle = false;
      this.$vm = vm;
      {
        this.$el = vm.$el;
      }
      if (this.$el.getAttribute) {
        this.$bindClass = !!this.$el.getAttribute("class");
        this.$bindStyle = !!this.$el.getAttribute("style");
      }
    }
    selectComponent(selector) {
      if (!this.$el || !selector) {
        return;
      }
      var wxsVm = getWxsVm(this.$el.querySelector(selector));
      if (!wxsVm) {
        return;
      }
      return createComponentDescriptor(wxsVm);
    }
    selectAllComponents(selector) {
      if (!this.$el || !selector) {
        return [];
      }
      var descriptors = [];
      var els = this.$el.querySelectorAll(selector);
      for (var i2 = 0; i2 < els.length; i2++) {
        var wxsVm = getWxsVm(els[i2]);
        if (wxsVm) {
          descriptors.push(createComponentDescriptor(wxsVm));
        }
      }
      return descriptors;
    }
    forceUpdate(type) {
      if (type === "class") {
        if (this.$bindClass) {
          this.$el.__wxsClassChanged = true;
          this.$vm.$forceUpdate();
        } else {
          this.updateWxsClass();
        }
      } else if (type === "style") {
        if (this.$bindStyle) {
          this.$el.__wxsStyleChanged = true;
          this.$vm.$forceUpdate();
        } else {
          this.updateWxsStyle();
        }
      }
    }
    updateWxsClass() {
      var {
        __wxsAddClass
      } = this.$el;
      if (__wxsAddClass.length) {
        this.$el.className = __wxsAddClass.join(" ");
      }
    }
    updateWxsStyle() {
      var {
        __wxsStyle
      } = this.$el;
      if (__wxsStyle) {
        this.$el.setAttribute("style", stringifyStyle(__wxsStyle));
      }
    }
    setStyle(style) {
      if (!this.$el || !style) {
        return this;
      }
      if (isString(style)) {
        style = parseStringStyle(style);
      }
      if (isPlainObject(style)) {
        this.$el.__wxsStyle = style;
        this.forceUpdate("style");
      }
      return this;
    }
    addClass(clazz) {
      if (!this.$el || !clazz) {
        return this;
      }
      var __wxsAddClass = this.$el.__wxsAddClass || (this.$el.__wxsAddClass = []);
      if (__wxsAddClass.indexOf(clazz) === -1) {
        __wxsAddClass.push(clazz);
        this.forceUpdate("class");
      }
      return this;
    }
    removeClass(clazz) {
      if (!this.$el || !clazz) {
        return this;
      }
      var {
        __wxsAddClass
      } = this.$el;
      if (__wxsAddClass) {
        var index = __wxsAddClass.indexOf(clazz);
        if (index > -1) {
          __wxsAddClass.splice(index, 1);
        }
      }
      var __wxsRemoveClass = this.$el.__wxsRemoveClass || (this.$el.__wxsRemoveClass = []);
      if (__wxsRemoveClass.indexOf(clazz) === -1) {
        __wxsRemoveClass.push(clazz);
        this.forceUpdate("class");
      }
      return this;
    }
    hasClass(cls) {
      return this.$el && this.$el.classList.contains(cls);
    }
    getDataset() {
      return this.$el && this.$el.dataset;
    }
    callMethod(funcName) {
      var args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var func = this.$vm[funcName];
      if (isFunction(func)) {
        func(JSON.parse(JSON.stringify(args)));
      } else if (this.$vm.ownerId) {
        UniViewJSBridge.publishHandler(ON_WXS_INVOKE_CALL_METHOD, {
          nodeId: this.$el.__id,
          ownerId: this.$vm.ownerId,
          method: funcName,
          args
        });
      }
    }
    requestAnimationFrame(callback) {
      return window.requestAnimationFrame(callback);
    }
    getState() {
      return this.$el && (this.$el.__wxsState || (this.$el.__wxsState = {}));
    }
    triggerEvent(eventName) {
      var detail = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this.$vm.$emit(eventName, detail), this;
    }
    getComputedStyle(names) {
      if (this.$el) {
        var styles = window.getComputedStyle(this.$el);
        if (names && names.length) {
          return names.reduce((res, n) => {
            res[n] = styles[n];
            return res;
          }, {});
        }
        return styles;
      }
      return {};
    }
    setTimeout(handler, timeout) {
      return window.setTimeout(handler, timeout);
    }
    clearTimeout(handle) {
      return window.clearTimeout(handle);
    }
    getBoundingClientRect() {
      return this.$el.getBoundingClientRect();
    }
  }
  function createComponentDescriptor(vm) {
    if (vm && vm.$el) {
      if (!vm.$el.__wxsComponentDescriptor) {
        vm.$el.__wxsComponentDescriptor = new ComponentDescriptor(vm);
      }
      return vm.$el.__wxsComponentDescriptor;
    }
  }
  function getComponentDescriptor(instance, isOwnerInstance) {
    return createComponentDescriptor(instance);
  }
  function getWxsVm(el) {
    if (!el) {
      return;
    }
    {
      return createComponentDescriptorVm(el);
    }
  }
  function createComponentDescriptorVm(el) {
    return el.__wxsVm || (el.__wxsVm = {
      ownerId: el.__ownerId,
      $el: el,
      $emit() {
      },
      $forceUpdate() {
        var {
          __wxsStyle,
          __wxsAddClass,
          __wxsRemoveClass,
          __wxsStyleChanged,
          __wxsClassChanged
        } = el;
        var updateClass;
        var updateStyle;
        if (__wxsStyleChanged) {
          el.__wxsStyleChanged = false;
          __wxsStyle && (updateStyle = () => {
            Object.keys(__wxsStyle).forEach((n) => {
              el.style[n] = __wxsStyle[n];
            });
          });
        }
        if (__wxsClassChanged) {
          el.__wxsClassChanged = false;
          updateClass = () => {
            __wxsRemoveClass && __wxsRemoveClass.forEach((clazz) => {
              el.classList.remove(clazz);
            });
            __wxsAddClass && __wxsAddClass.forEach((clazz) => {
              el.classList.add(clazz);
            });
          };
        }
        requestAnimationFrame(() => {
          updateClass && updateClass();
          updateStyle && updateStyle();
        });
      }
    });
  }
  var isKeyboardEvent = (val) => !val.type.indexOf("key") && val instanceof KeyboardEvent;
  var isClickEvent = (val) => val.type === "click";
  var isMouseEvent = (val) => val.type.indexOf("mouse") === 0 || ["contextmenu"].includes(val.type);
  var isTouchEvent = (val) => typeof TouchEvent !== "undefined" && val instanceof TouchEvent || val.type.indexOf("touch") === 0 || ["longpress"].indexOf(val.type) >= 0;
  function $nne(evt, eventValue, instance) {
    var {
      currentTarget
    } = evt;
    if (!(evt instanceof Event) || !(currentTarget instanceof HTMLElement)) {
      return [evt];
    }
    var isHTMLTarget = currentTarget.tagName.indexOf("UNI-") !== 0;
    var res = createNativeEvent(evt, isHTMLTarget);
    if (isClickEvent(evt)) {
      normalizeClickEvent(res, evt);
    } else if (isMouseEvent(evt)) {
      normalizeMouseEvent(res, evt);
    } else if (isTouchEvent(evt)) {
      var top = getWindowTop();
      res.touches = normalizeTouchEvent(evt.touches, top);
      res.changedTouches = normalizeTouchEvent(evt.changedTouches, top);
    } else if (isKeyboardEvent(evt)) {
      var proxyKeys = ["key", "code"];
      proxyKeys.forEach((key2) => {
        Object.defineProperty(res, key2, {
          get() {
            return evt[key2];
          }
        });
      });
    }
    return [res];
  }
  function findUniTarget(target) {
    while (target && target.tagName.indexOf("UNI-") !== 0) {
      target = target.parentElement;
    }
    return target;
  }
  function createNativeEvent(evt) {
    var htmlElement = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var {
      type,
      timeStamp,
      target,
      currentTarget
    } = evt;
    var realTarget, realCurrentTarget;
    realTarget = normalizeTarget(htmlElement ? target : findUniTarget(target));
    realCurrentTarget = normalizeTarget(currentTarget);
    var event = {
      type,
      timeStamp,
      target: realTarget,
      detail: {},
      currentTarget: realCurrentTarget
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
    var top = getWindowTop();
    evt.detail = {
      x,
      y: y - top
    };
    evt.touches = evt.changedTouches = [createTouchEvent(mouseEvt, top)];
  }
  function normalizeMouseEvent(evt, mouseEvt) {
    var top = getWindowTop();
    evt.pageX = mouseEvt.pageX;
    evt.pageY = mouseEvt.pageY - top;
    evt.clientX = mouseEvt.clientX;
    evt.clientY = mouseEvt.clientY - top;
    evt.touches = evt.changedTouches = [createTouchEvent(mouseEvt, top)];
  }
  function createTouchEvent(evt, top) {
    return {
      force: 1,
      identifier: 0,
      clientX: evt.clientX,
      clientY: evt.clientY - top,
      pageX: evt.pageX,
      pageY: evt.pageY - top
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
  function formatAppLog(type, filename) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  var VD_SYNC = "vdSync";
  var APP_SERVICE_ID = "__uniapp__service";
  var ON_WEBVIEW_READY = "onWebviewReady";
  var ACTION_TYPE_DICT = 0;
  var API_SET_LOCALE = "setLocale";
  var UniViewJSBridge$1 = /* @__PURE__ */ extend(ViewJSBridge, {
    publishHandler
  });
  function publishHandler(event) {
    var args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var pageId = getCurrentPageId() + "";
    var webview = plus.webview;
    webview.postMessageToUniNView({
      type: "subscribeHandler",
      args: {
        type: event,
        data: args,
        pageId
      }
    }, APP_SERVICE_ID);
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
    return function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var errMsg = beforeInvokeApi(name, args, protocol, options);
      if (errMsg) {
        throw new Error(errMsg);
      }
      return fn.apply(null, args);
    };
  }
  function defineSyncApi(name, fn, protocol, options) {
    return wrapperSyncApi(name, fn, void 0, options);
  }
  function getBaseSystemInfo() {
    return {
      platform: "harmony",
      pixelRatio: vp2px(1),
      windowWidth: lpx2px(720)
      // TODO designWidth可配置
    };
  }
  var common = {};
  (function(exports) {
    var TYPED_OK = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
    function _has2(obj, key2) {
      return Object.prototype.hasOwnProperty.call(obj, key2);
    }
    exports.assign = function(obj) {
      var sources = Array.prototype.slice.call(arguments, 1);
      while (sources.length) {
        var source = sources.shift();
        if (!source) {
          continue;
        }
        if (typeof source !== "object") {
          throw new TypeError(source + "must be non-object");
        }
        for (var p2 in source) {
          if (_has2(source, p2)) {
            obj[p2] = source[p2];
          }
        }
      }
      return obj;
    };
    exports.shrinkBuf = function(buf, size2) {
      if (buf.length === size2) {
        return buf;
      }
      if (buf.subarray) {
        return buf.subarray(0, size2);
      }
      buf.length = size2;
      return buf;
    };
    var fnTyped = {
      arraySet: function(dest, src, src_offs, len, dest_offs) {
        if (src.subarray && dest.subarray) {
          dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
          return;
        }
        for (var i2 = 0; i2 < len; i2++) {
          dest[dest_offs + i2] = src[src_offs + i2];
        }
      },
      // Join array of chunks to single array.
      flattenChunks: function(chunks) {
        var i2, l, len, pos, chunk, result;
        len = 0;
        for (i2 = 0, l = chunks.length; i2 < l; i2++) {
          len += chunks[i2].length;
        }
        result = new Uint8Array(len);
        pos = 0;
        for (i2 = 0, l = chunks.length; i2 < l; i2++) {
          chunk = chunks[i2];
          result.set(chunk, pos);
          pos += chunk.length;
        }
        return result;
      }
    };
    var fnUntyped = {
      arraySet: function(dest, src, src_offs, len, dest_offs) {
        for (var i2 = 0; i2 < len; i2++) {
          dest[dest_offs + i2] = src[src_offs + i2];
        }
      },
      // Join array of chunks to single array.
      flattenChunks: function(chunks) {
        return [].concat.apply([], chunks);
      }
    };
    exports.setTyped = function(on) {
      if (on) {
        exports.Buf8 = Uint8Array;
        exports.Buf16 = Uint16Array;
        exports.Buf32 = Int32Array;
        exports.assign(exports, fnTyped);
      } else {
        exports.Buf8 = Array;
        exports.Buf16 = Array;
        exports.Buf32 = Array;
        exports.assign(exports, fnUntyped);
      }
    };
    exports.setTyped(TYPED_OK);
  })(common);
  var deflate$4 = {};
  var deflate$3 = {};
  var trees$1 = {};
  var utils$6 = common;
  var Z_FIXED$1 = 4;
  var Z_BINARY = 0;
  var Z_TEXT = 1;
  var Z_UNKNOWN$1 = 2;
  function zero$1(buf) {
    var len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  }
  var STORED_BLOCK = 0;
  var STATIC_TREES = 1;
  var DYN_TREES = 2;
  var MIN_MATCH$1 = 3;
  var MAX_MATCH$1 = 258;
  var LENGTH_CODES$1 = 29;
  var LITERALS$1 = 256;
  var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
  var D_CODES$1 = 30;
  var BL_CODES$1 = 19;
  var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
  var MAX_BITS$1 = 15;
  var Buf_size = 16;
  var MAX_BL_BITS = 7;
  var END_BLOCK = 256;
  var REP_3_6 = 16;
  var REPZ_3_10 = 17;
  var REPZ_11_138 = 18;
  var extra_lbits = (
    /* extra bits for each length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
  );
  var extra_dbits = (
    /* extra bits for each distance code */
    [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
  );
  var extra_blbits = (
    /* extra bits for each bit length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
  );
  var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
  var DIST_CODE_LEN = 512;
  var static_ltree = new Array((L_CODES$1 + 2) * 2);
  zero$1(static_ltree);
  var static_dtree = new Array(D_CODES$1 * 2);
  zero$1(static_dtree);
  var _dist_code = new Array(DIST_CODE_LEN);
  zero$1(_dist_code);
  var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
  zero$1(_length_code);
  var base_length = new Array(LENGTH_CODES$1);
  zero$1(base_length);
  var base_dist = new Array(D_CODES$1);
  zero$1(base_dist);
  function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
    this.static_tree = static_tree;
    this.extra_bits = extra_bits;
    this.extra_base = extra_base;
    this.elems = elems;
    this.max_length = max_length;
    this.has_stree = static_tree && static_tree.length;
  }
  var static_l_desc;
  var static_d_desc;
  var static_bl_desc;
  function TreeDesc(dyn_tree, stat_desc) {
    this.dyn_tree = dyn_tree;
    this.max_code = 0;
    this.stat_desc = stat_desc;
  }
  function d_code(dist) {
    return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
  }
  function put_short(s, w) {
    s.pending_buf[s.pending++] = w & 255;
    s.pending_buf[s.pending++] = w >>> 8 & 255;
  }
  function send_bits(s, value, length) {
    if (s.bi_valid > Buf_size - length) {
      s.bi_buf |= value << s.bi_valid & 65535;
      put_short(s, s.bi_buf);
      s.bi_buf = value >> Buf_size - s.bi_valid;
      s.bi_valid += length - Buf_size;
    } else {
      s.bi_buf |= value << s.bi_valid & 65535;
      s.bi_valid += length;
    }
  }
  function send_code(s, c2, tree) {
    send_bits(
      s,
      tree[c2 * 2],
      tree[c2 * 2 + 1]
      /*.Len*/
    );
  }
  function bi_reverse(code, len) {
    var res = 0;
    do {
      res |= code & 1;
      code >>>= 1;
      res <<= 1;
    } while (--len > 0);
    return res >>> 1;
  }
  function bi_flush(s) {
    if (s.bi_valid === 16) {
      put_short(s, s.bi_buf);
      s.bi_buf = 0;
      s.bi_valid = 0;
    } else if (s.bi_valid >= 8) {
      s.pending_buf[s.pending++] = s.bi_buf & 255;
      s.bi_buf >>= 8;
      s.bi_valid -= 8;
    }
  }
  function gen_bitlen(s, desc) {
    var tree = desc.dyn_tree;
    var max_code = desc.max_code;
    var stree = desc.stat_desc.static_tree;
    var has_stree = desc.stat_desc.has_stree;
    var extra = desc.stat_desc.extra_bits;
    var base = desc.stat_desc.extra_base;
    var max_length = desc.stat_desc.max_length;
    var h2;
    var n, m;
    var bits;
    var xbits;
    var f;
    var overflow = 0;
    for (bits = 0; bits <= MAX_BITS$1; bits++) {
      s.bl_count[bits] = 0;
    }
    tree[s.heap[s.heap_max] * 2 + 1] = 0;
    for (h2 = s.heap_max + 1; h2 < HEAP_SIZE$1; h2++) {
      n = s.heap[h2];
      bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
      if (bits > max_length) {
        bits = max_length;
        overflow++;
      }
      tree[n * 2 + 1] = bits;
      if (n > max_code) {
        continue;
      }
      s.bl_count[bits]++;
      xbits = 0;
      if (n >= base) {
        xbits = extra[n - base];
      }
      f = tree[n * 2];
      s.opt_len += f * (bits + xbits);
      if (has_stree) {
        s.static_len += f * (stree[n * 2 + 1] + xbits);
      }
    }
    if (overflow === 0) {
      return;
    }
    do {
      bits = max_length - 1;
      while (s.bl_count[bits] === 0) {
        bits--;
      }
      s.bl_count[bits]--;
      s.bl_count[bits + 1] += 2;
      s.bl_count[max_length]--;
      overflow -= 2;
    } while (overflow > 0);
    for (bits = max_length; bits !== 0; bits--) {
      n = s.bl_count[bits];
      while (n !== 0) {
        m = s.heap[--h2];
        if (m > max_code) {
          continue;
        }
        if (tree[m * 2 + 1] !== bits) {
          s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
          tree[m * 2 + 1] = bits;
        }
        n--;
      }
    }
  }
  function gen_codes(tree, max_code, bl_count) {
    var next_code = new Array(MAX_BITS$1 + 1);
    var code = 0;
    var bits;
    var n;
    for (bits = 1; bits <= MAX_BITS$1; bits++) {
      next_code[bits] = code = code + bl_count[bits - 1] << 1;
    }
    for (n = 0; n <= max_code; n++) {
      var len = tree[n * 2 + 1];
      if (len === 0) {
        continue;
      }
      tree[n * 2] = bi_reverse(next_code[len]++, len);
    }
  }
  function tr_static_init() {
    var n;
    var bits;
    var length;
    var code;
    var dist;
    var bl_count = new Array(MAX_BITS$1 + 1);
    length = 0;
    for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
      base_length[code] = length;
      for (n = 0; n < 1 << extra_lbits[code]; n++) {
        _length_code[length++] = code;
      }
    }
    _length_code[length - 1] = code;
    dist = 0;
    for (code = 0; code < 16; code++) {
      base_dist[code] = dist;
      for (n = 0; n < 1 << extra_dbits[code]; n++) {
        _dist_code[dist++] = code;
      }
    }
    dist >>= 7;
    for (; code < D_CODES$1; code++) {
      base_dist[code] = dist << 7;
      for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
        _dist_code[256 + dist++] = code;
      }
    }
    for (bits = 0; bits <= MAX_BITS$1; bits++) {
      bl_count[bits] = 0;
    }
    n = 0;
    while (n <= 143) {
      static_ltree[n * 2 + 1] = 8;
      n++;
      bl_count[8]++;
    }
    while (n <= 255) {
      static_ltree[n * 2 + 1] = 9;
      n++;
      bl_count[9]++;
    }
    while (n <= 279) {
      static_ltree[n * 2 + 1] = 7;
      n++;
      bl_count[7]++;
    }
    while (n <= 287) {
      static_ltree[n * 2 + 1] = 8;
      n++;
      bl_count[8]++;
    }
    gen_codes(static_ltree, L_CODES$1 + 1, bl_count);
    for (n = 0; n < D_CODES$1; n++) {
      static_dtree[n * 2 + 1] = 5;
      static_dtree[n * 2] = bi_reverse(n, 5);
    }
    static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
    static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
    static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);
  }
  function init_block(s) {
    var n;
    for (n = 0; n < L_CODES$1; n++) {
      s.dyn_ltree[n * 2] = 0;
    }
    for (n = 0; n < D_CODES$1; n++) {
      s.dyn_dtree[n * 2] = 0;
    }
    for (n = 0; n < BL_CODES$1; n++) {
      s.bl_tree[n * 2] = 0;
    }
    s.dyn_ltree[END_BLOCK * 2] = 1;
    s.opt_len = s.static_len = 0;
    s.last_lit = s.matches = 0;
  }
  function bi_windup(s) {
    if (s.bi_valid > 8) {
      put_short(s, s.bi_buf);
    } else if (s.bi_valid > 0) {
      s.pending_buf[s.pending++] = s.bi_buf;
    }
    s.bi_buf = 0;
    s.bi_valid = 0;
  }
  function copy_block(s, buf, len, header) {
    bi_windup(s);
    if (header) {
      put_short(s, len);
      put_short(s, ~len);
    }
    utils$6.arraySet(s.pending_buf, s.window, buf, len, s.pending);
    s.pending += len;
  }
  function smaller(tree, n, m, depth) {
    var _n2 = n * 2;
    var _m2 = m * 2;
    return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
  }
  function pqdownheap(s, tree, k) {
    var v = s.heap[k];
    var j = k << 1;
    while (j <= s.heap_len) {
      if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
        j++;
      }
      if (smaller(tree, v, s.heap[j], s.depth)) {
        break;
      }
      s.heap[k] = s.heap[j];
      k = j;
      j <<= 1;
    }
    s.heap[k] = v;
  }
  function compress_block(s, ltree, dtree) {
    var dist;
    var lc;
    var lx = 0;
    var code;
    var extra;
    if (s.last_lit !== 0) {
      do {
        dist = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1];
        lc = s.pending_buf[s.l_buf + lx];
        lx++;
        if (dist === 0) {
          send_code(s, lc, ltree);
        } else {
          code = _length_code[lc];
          send_code(s, code + LITERALS$1 + 1, ltree);
          extra = extra_lbits[code];
          if (extra !== 0) {
            lc -= base_length[code];
            send_bits(s, lc, extra);
          }
          dist--;
          code = d_code(dist);
          send_code(s, code, dtree);
          extra = extra_dbits[code];
          if (extra !== 0) {
            dist -= base_dist[code];
            send_bits(s, dist, extra);
          }
        }
      } while (lx < s.last_lit);
    }
    send_code(s, END_BLOCK, ltree);
  }
  function build_tree(s, desc) {
    var tree = desc.dyn_tree;
    var stree = desc.stat_desc.static_tree;
    var has_stree = desc.stat_desc.has_stree;
    var elems = desc.stat_desc.elems;
    var n, m;
    var max_code = -1;
    var node;
    s.heap_len = 0;
    s.heap_max = HEAP_SIZE$1;
    for (n = 0; n < elems; n++) {
      if (tree[n * 2] !== 0) {
        s.heap[++s.heap_len] = max_code = n;
        s.depth[n] = 0;
      } else {
        tree[n * 2 + 1] = 0;
      }
    }
    while (s.heap_len < 2) {
      node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
      tree[node * 2] = 1;
      s.depth[node] = 0;
      s.opt_len--;
      if (has_stree) {
        s.static_len -= stree[node * 2 + 1];
      }
    }
    desc.max_code = max_code;
    for (n = s.heap_len >> 1; n >= 1; n--) {
      pqdownheap(s, tree, n);
    }
    node = elems;
    do {
      n = s.heap[
        1
        /*SMALLEST*/
      ];
      s.heap[
        1
        /*SMALLEST*/
      ] = s.heap[s.heap_len--];
      pqdownheap(
        s,
        tree,
        1
        /*SMALLEST*/
      );
      m = s.heap[
        1
        /*SMALLEST*/
      ];
      s.heap[--s.heap_max] = n;
      s.heap[--s.heap_max] = m;
      tree[node * 2] = tree[n * 2] + tree[m * 2];
      s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
      tree[n * 2 + 1] = tree[m * 2 + 1] = node;
      s.heap[
        1
        /*SMALLEST*/
      ] = node++;
      pqdownheap(
        s,
        tree,
        1
        /*SMALLEST*/
      );
    } while (s.heap_len >= 2);
    s.heap[--s.heap_max] = s.heap[
      1
      /*SMALLEST*/
    ];
    gen_bitlen(s, desc);
    gen_codes(tree, max_code, s.bl_count);
  }
  function scan_tree(s, tree, max_code) {
    var n;
    var prevlen = -1;
    var curlen;
    var nextlen = tree[0 * 2 + 1];
    var count = 0;
    var max_count = 7;
    var min_count = 4;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    tree[(max_code + 1) * 2 + 1] = 65535;
    for (n = 0; n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1];
      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        s.bl_tree[curlen * 2] += count;
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          s.bl_tree[curlen * 2]++;
        }
        s.bl_tree[REP_3_6 * 2]++;
      } else if (count <= 10) {
        s.bl_tree[REPZ_3_10 * 2]++;
      } else {
        s.bl_tree[REPZ_11_138 * 2]++;
      }
      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  }
  function send_tree(s, tree, max_code) {
    var n;
    var prevlen = -1;
    var curlen;
    var nextlen = tree[0 * 2 + 1];
    var count = 0;
    var max_count = 7;
    var min_count = 4;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    for (n = 0; n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1];
      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        do {
          send_code(s, curlen, s.bl_tree);
        } while (--count !== 0);
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          send_code(s, curlen, s.bl_tree);
          count--;
        }
        send_code(s, REP_3_6, s.bl_tree);
        send_bits(s, count - 3, 2);
      } else if (count <= 10) {
        send_code(s, REPZ_3_10, s.bl_tree);
        send_bits(s, count - 3, 3);
      } else {
        send_code(s, REPZ_11_138, s.bl_tree);
        send_bits(s, count - 11, 7);
      }
      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  }
  function build_bl_tree(s) {
    var max_blindex;
    scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
    scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
    build_tree(s, s.bl_desc);
    for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
      if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
        break;
      }
    }
    s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
    return max_blindex;
  }
  function send_all_trees(s, lcodes, dcodes, blcodes) {
    var rank2;
    send_bits(s, lcodes - 257, 5);
    send_bits(s, dcodes - 1, 5);
    send_bits(s, blcodes - 4, 4);
    for (rank2 = 0; rank2 < blcodes; rank2++) {
      send_bits(s, s.bl_tree[bl_order[rank2] * 2 + 1], 3);
    }
    send_tree(s, s.dyn_ltree, lcodes - 1);
    send_tree(s, s.dyn_dtree, dcodes - 1);
  }
  function detect_data_type(s) {
    var black_mask = 4093624447;
    var n;
    for (n = 0; n <= 31; n++, black_mask >>>= 1) {
      if (black_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
        return Z_BINARY;
      }
    }
    if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
      return Z_TEXT;
    }
    for (n = 32; n < LITERALS$1; n++) {
      if (s.dyn_ltree[n * 2] !== 0) {
        return Z_TEXT;
      }
    }
    return Z_BINARY;
  }
  var static_init_done = false;
  function _tr_init(s) {
    if (!static_init_done) {
      tr_static_init();
      static_init_done = true;
    }
    s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
    s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
    s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
    s.bi_buf = 0;
    s.bi_valid = 0;
    init_block(s);
  }
  function _tr_stored_block(s, buf, stored_len, last) {
    send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
    copy_block(s, buf, stored_len, true);
  }
  function _tr_align(s) {
    send_bits(s, STATIC_TREES << 1, 3);
    send_code(s, END_BLOCK, static_ltree);
    bi_flush(s);
  }
  function _tr_flush_block(s, buf, stored_len, last) {
    var opt_lenb, static_lenb;
    var max_blindex = 0;
    if (s.level > 0) {
      if (s.strm.data_type === Z_UNKNOWN$1) {
        s.strm.data_type = detect_data_type(s);
      }
      build_tree(s, s.l_desc);
      build_tree(s, s.d_desc);
      max_blindex = build_bl_tree(s);
      opt_lenb = s.opt_len + 3 + 7 >>> 3;
      static_lenb = s.static_len + 3 + 7 >>> 3;
      if (static_lenb <= opt_lenb) {
        opt_lenb = static_lenb;
      }
    } else {
      opt_lenb = static_lenb = stored_len + 5;
    }
    if (stored_len + 4 <= opt_lenb && buf !== -1) {
      _tr_stored_block(s, buf, stored_len, last);
    } else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {
      send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
      compress_block(s, static_ltree, static_dtree);
    } else {
      send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
      send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
      compress_block(s, s.dyn_ltree, s.dyn_dtree);
    }
    init_block(s);
    if (last) {
      bi_windup(s);
    }
  }
  function _tr_tally(s, dist, lc) {
    s.pending_buf[s.d_buf + s.last_lit * 2] = dist >>> 8 & 255;
    s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 255;
    s.pending_buf[s.l_buf + s.last_lit] = lc & 255;
    s.last_lit++;
    if (dist === 0) {
      s.dyn_ltree[lc * 2]++;
    } else {
      s.matches++;
      dist--;
      s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]++;
      s.dyn_dtree[d_code(dist) * 2]++;
    }
    return s.last_lit === s.lit_bufsize - 1;
  }
  trees$1._tr_init = _tr_init;
  trees$1._tr_stored_block = _tr_stored_block;
  trees$1._tr_flush_block = _tr_flush_block;
  trees$1._tr_tally = _tr_tally;
  trees$1._tr_align = _tr_align;
  function adler32$2(adler, buf, len, pos) {
    var s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
    while (len !== 0) {
      n = len > 2e3 ? 2e3 : len;
      len -= n;
      do {
        s1 = s1 + buf[pos++] | 0;
        s2 = s2 + s1 | 0;
      } while (--n);
      s1 %= 65521;
      s2 %= 65521;
    }
    return s1 | s2 << 16 | 0;
  }
  var adler32_1 = adler32$2;
  function makeTable() {
    var c2, table = [];
    for (var n = 0; n < 256; n++) {
      c2 = n;
      for (var k = 0; k < 8; k++) {
        c2 = c2 & 1 ? 3988292384 ^ c2 >>> 1 : c2 >>> 1;
      }
      table[n] = c2;
    }
    return table;
  }
  var crcTable = makeTable();
  function crc32$2(crc, buf, len, pos) {
    var t = crcTable, end = pos + len;
    crc ^= -1;
    for (var i2 = pos; i2 < end; i2++) {
      crc = crc >>> 8 ^ t[(crc ^ buf[i2]) & 255];
    }
    return crc ^ -1;
  }
  var crc32_1 = crc32$2;
  var messages = {
    2: "need dictionary",
    /* Z_NEED_DICT       2  */
    1: "stream end",
    /* Z_STREAM_END      1  */
    0: "",
    /* Z_OK              0  */
    "-1": "file error",
    /* Z_ERRNO         (-1) */
    "-2": "stream error",
    /* Z_STREAM_ERROR  (-2) */
    "-3": "data error",
    /* Z_DATA_ERROR    (-3) */
    "-4": "insufficient memory",
    /* Z_MEM_ERROR     (-4) */
    "-5": "buffer error",
    /* Z_BUF_ERROR     (-5) */
    "-6": "incompatible version"
    /* Z_VERSION_ERROR (-6) */
  };
  var utils$5 = common;
  var trees = trees$1;
  var adler32$1 = adler32_1;
  var crc32$1 = crc32_1;
  var msg$2 = messages;
  var Z_NO_FLUSH$1 = 0;
  var Z_PARTIAL_FLUSH = 1;
  var Z_FULL_FLUSH = 3;
  var Z_FINISH$2 = 4;
  var Z_BLOCK$1 = 5;
  var Z_OK$2 = 0;
  var Z_STREAM_END$2 = 1;
  var Z_STREAM_ERROR$1 = -2;
  var Z_DATA_ERROR$1 = -3;
  var Z_BUF_ERROR$1 = -5;
  var Z_DEFAULT_COMPRESSION$1 = -1;
  var Z_FILTERED = 1;
  var Z_HUFFMAN_ONLY = 2;
  var Z_RLE = 3;
  var Z_FIXED = 4;
  var Z_DEFAULT_STRATEGY$1 = 0;
  var Z_UNKNOWN = 2;
  var Z_DEFLATED$2 = 8;
  var MAX_MEM_LEVEL = 9;
  var MAX_WBITS$1 = 15;
  var DEF_MEM_LEVEL = 8;
  var LENGTH_CODES = 29;
  var LITERALS = 256;
  var L_CODES = LITERALS + 1 + LENGTH_CODES;
  var D_CODES = 30;
  var BL_CODES = 19;
  var HEAP_SIZE = 2 * L_CODES + 1;
  var MAX_BITS = 15;
  var MIN_MATCH = 3;
  var MAX_MATCH = 258;
  var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
  var PRESET_DICT = 32;
  var INIT_STATE = 42;
  var EXTRA_STATE = 69;
  var NAME_STATE = 73;
  var COMMENT_STATE = 91;
  var HCRC_STATE = 103;
  var BUSY_STATE = 113;
  var FINISH_STATE = 666;
  var BS_NEED_MORE = 1;
  var BS_BLOCK_DONE = 2;
  var BS_FINISH_STARTED = 3;
  var BS_FINISH_DONE = 4;
  var OS_CODE = 3;
  function err(strm, errorCode) {
    strm.msg = msg$2[errorCode];
    return errorCode;
  }
  function rank(f) {
    return (f << 1) - (f > 4 ? 9 : 0);
  }
  function zero(buf) {
    var len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  }
  function flush_pending(strm) {
    var s = strm.state;
    var len = s.pending;
    if (len > strm.avail_out) {
      len = strm.avail_out;
    }
    if (len === 0) {
      return;
    }
    utils$5.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
    strm.next_out += len;
    s.pending_out += len;
    strm.total_out += len;
    strm.avail_out -= len;
    s.pending -= len;
    if (s.pending === 0) {
      s.pending_out = 0;
    }
  }
  function flush_block_only(s, last) {
    trees._tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
    s.block_start = s.strstart;
    flush_pending(s.strm);
  }
  function put_byte(s, b) {
    s.pending_buf[s.pending++] = b;
  }
  function putShortMSB(s, b) {
    s.pending_buf[s.pending++] = b >>> 8 & 255;
    s.pending_buf[s.pending++] = b & 255;
  }
  function read_buf(strm, buf, start, size2) {
    var len = strm.avail_in;
    if (len > size2) {
      len = size2;
    }
    if (len === 0) {
      return 0;
    }
    strm.avail_in -= len;
    utils$5.arraySet(buf, strm.input, strm.next_in, len, start);
    if (strm.state.wrap === 1) {
      strm.adler = adler32$1(strm.adler, buf, len, start);
    } else if (strm.state.wrap === 2) {
      strm.adler = crc32$1(strm.adler, buf, len, start);
    }
    strm.next_in += len;
    strm.total_in += len;
    return len;
  }
  function longest_match(s, cur_match) {
    var chain_length = s.max_chain_length;
    var scan = s.strstart;
    var match;
    var len;
    var best_len = s.prev_length;
    var nice_match = s.nice_match;
    var limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
    var _win = s.window;
    var wmask = s.w_mask;
    var prev = s.prev;
    var strend = s.strstart + MAX_MATCH;
    var scan_end1 = _win[scan + best_len - 1];
    var scan_end = _win[scan + best_len];
    if (s.prev_length >= s.good_match) {
      chain_length >>= 2;
    }
    if (nice_match > s.lookahead) {
      nice_match = s.lookahead;
    }
    do {
      match = cur_match;
      if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
        continue;
      }
      scan += 2;
      match++;
      do {
      } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
      len = MAX_MATCH - (strend - scan);
      scan = strend - MAX_MATCH;
      if (len > best_len) {
        s.match_start = cur_match;
        best_len = len;
        if (len >= nice_match) {
          break;
        }
        scan_end1 = _win[scan + best_len - 1];
        scan_end = _win[scan + best_len];
      }
    } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
    if (best_len <= s.lookahead) {
      return best_len;
    }
    return s.lookahead;
  }
  function fill_window(s) {
    var _w_size = s.w_size;
    var p2, n, m, more, str;
    do {
      more = s.window_size - s.lookahead - s.strstart;
      if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
        utils$5.arraySet(s.window, s.window, _w_size, _w_size, 0);
        s.match_start -= _w_size;
        s.strstart -= _w_size;
        s.block_start -= _w_size;
        n = s.hash_size;
        p2 = n;
        do {
          m = s.head[--p2];
          s.head[p2] = m >= _w_size ? m - _w_size : 0;
        } while (--n);
        n = _w_size;
        p2 = n;
        do {
          m = s.prev[--p2];
          s.prev[p2] = m >= _w_size ? m - _w_size : 0;
        } while (--n);
        more += _w_size;
      }
      if (s.strm.avail_in === 0) {
        break;
      }
      n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
      s.lookahead += n;
      if (s.lookahead + s.insert >= MIN_MATCH) {
        str = s.strstart - s.insert;
        s.ins_h = s.window[str];
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + 1]) & s.hash_mask;
        while (s.insert) {
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
          s.prev[str & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = str;
          str++;
          s.insert--;
          if (s.lookahead + s.insert < MIN_MATCH) {
            break;
          }
        }
      }
    } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
  }
  function deflate_stored(s, flush) {
    var max_block_size = 65535;
    if (max_block_size > s.pending_buf_size - 5) {
      max_block_size = s.pending_buf_size - 5;
    }
    for (; ; ) {
      if (s.lookahead <= 1) {
        fill_window(s);
        if (s.lookahead === 0 && flush === Z_NO_FLUSH$1) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      s.strstart += s.lookahead;
      s.lookahead = 0;
      var max_start = s.block_start + max_block_size;
      if (s.strstart === 0 || s.strstart >= max_start) {
        s.lookahead = s.strstart - max_start;
        s.strstart = max_start;
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH$2) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.strstart > s.block_start) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_NEED_MORE;
  }
  function deflate_fast(s, flush) {
    var hash_head;
    var bflush;
    for (; ; ) {
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$1) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      hash_head = 0;
      if (s.lookahead >= MIN_MATCH) {
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
      }
      if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
        s.match_length = longest_match(s, hash_head);
      }
      if (s.match_length >= MIN_MATCH) {
        bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
        s.lookahead -= s.match_length;
        if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
          s.match_length--;
          do {
            s.strstart++;
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          } while (--s.match_length !== 0);
          s.strstart++;
        } else {
          s.strstart += s.match_length;
          s.match_length = 0;
          s.ins_h = s.window[s.strstart];
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 1]) & s.hash_mask;
        }
      } else {
        bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
    if (flush === Z_FINISH$2) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function deflate_slow(s, flush) {
    var hash_head;
    var bflush;
    var max_insert;
    for (; ; ) {
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$1) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      hash_head = 0;
      if (s.lookahead >= MIN_MATCH) {
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
      }
      s.prev_length = s.match_length;
      s.prev_match = s.match_start;
      s.match_length = MIN_MATCH - 1;
      if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
        s.match_length = longest_match(s, hash_head);
        if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
          s.match_length = MIN_MATCH - 1;
        }
      }
      if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
        max_insert = s.strstart + s.lookahead - MIN_MATCH;
        bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
        s.lookahead -= s.prev_length - 1;
        s.prev_length -= 2;
        do {
          if (++s.strstart <= max_insert) {
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          }
        } while (--s.prev_length !== 0);
        s.match_available = 0;
        s.match_length = MIN_MATCH - 1;
        s.strstart++;
        if (bflush) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
      } else if (s.match_available) {
        bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
        if (bflush) {
          flush_block_only(s, false);
        }
        s.strstart++;
        s.lookahead--;
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      } else {
        s.match_available = 1;
        s.strstart++;
        s.lookahead--;
      }
    }
    if (s.match_available) {
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
      s.match_available = 0;
    }
    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
    if (flush === Z_FINISH$2) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function deflate_rle(s, flush) {
    var bflush;
    var prev;
    var scan, strend;
    var _win = s.window;
    for (; ; ) {
      if (s.lookahead <= MAX_MATCH) {
        fill_window(s);
        if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$1) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      s.match_length = 0;
      if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
        scan = s.strstart - 1;
        prev = _win[scan];
        if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
          strend = s.strstart + MAX_MATCH;
          do {
          } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
          s.match_length = MAX_MATCH - (strend - scan);
          if (s.match_length > s.lookahead) {
            s.match_length = s.lookahead;
          }
        }
      }
      if (s.match_length >= MIN_MATCH) {
        bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);
        s.lookahead -= s.match_length;
        s.strstart += s.match_length;
        s.match_length = 0;
      } else {
        bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH$2) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function deflate_huff(s, flush) {
    var bflush;
    for (; ; ) {
      if (s.lookahead === 0) {
        fill_window(s);
        if (s.lookahead === 0) {
          if (flush === Z_NO_FLUSH$1) {
            return BS_NEED_MORE;
          }
          break;
        }
      }
      s.match_length = 0;
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH$2) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.last_lit) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  }
  function Config(good_length, max_lazy, nice_length, max_chain, func) {
    this.good_length = good_length;
    this.max_lazy = max_lazy;
    this.nice_length = nice_length;
    this.max_chain = max_chain;
    this.func = func;
  }
  var configuration_table;
  configuration_table = [
    /*      good lazy nice chain */
    new Config(0, 0, 0, 0, deflate_stored),
    /* 0 store only */
    new Config(4, 4, 8, 4, deflate_fast),
    /* 1 max speed, no lazy matches */
    new Config(4, 5, 16, 8, deflate_fast),
    /* 2 */
    new Config(4, 6, 32, 32, deflate_fast),
    /* 3 */
    new Config(4, 4, 16, 16, deflate_slow),
    /* 4 lazy matches */
    new Config(8, 16, 32, 32, deflate_slow),
    /* 5 */
    new Config(8, 16, 128, 128, deflate_slow),
    /* 6 */
    new Config(8, 32, 128, 256, deflate_slow),
    /* 7 */
    new Config(32, 128, 258, 1024, deflate_slow),
    /* 8 */
    new Config(32, 258, 258, 4096, deflate_slow)
    /* 9 max compression */
  ];
  function lm_init(s) {
    s.window_size = 2 * s.w_size;
    zero(s.head);
    s.max_lazy_match = configuration_table[s.level].max_lazy;
    s.good_match = configuration_table[s.level].good_length;
    s.nice_match = configuration_table[s.level].nice_length;
    s.max_chain_length = configuration_table[s.level].max_chain;
    s.strstart = 0;
    s.block_start = 0;
    s.lookahead = 0;
    s.insert = 0;
    s.match_length = s.prev_length = MIN_MATCH - 1;
    s.match_available = 0;
    s.ins_h = 0;
  }
  function DeflateState() {
    this.strm = null;
    this.status = 0;
    this.pending_buf = null;
    this.pending_buf_size = 0;
    this.pending_out = 0;
    this.pending = 0;
    this.wrap = 0;
    this.gzhead = null;
    this.gzindex = 0;
    this.method = Z_DEFLATED$2;
    this.last_flush = -1;
    this.w_size = 0;
    this.w_bits = 0;
    this.w_mask = 0;
    this.window = null;
    this.window_size = 0;
    this.prev = null;
    this.head = null;
    this.ins_h = 0;
    this.hash_size = 0;
    this.hash_bits = 0;
    this.hash_mask = 0;
    this.hash_shift = 0;
    this.block_start = 0;
    this.match_length = 0;
    this.prev_match = 0;
    this.match_available = 0;
    this.strstart = 0;
    this.match_start = 0;
    this.lookahead = 0;
    this.prev_length = 0;
    this.max_chain_length = 0;
    this.max_lazy_match = 0;
    this.level = 0;
    this.strategy = 0;
    this.good_match = 0;
    this.nice_match = 0;
    this.dyn_ltree = new utils$5.Buf16(HEAP_SIZE * 2);
    this.dyn_dtree = new utils$5.Buf16((2 * D_CODES + 1) * 2);
    this.bl_tree = new utils$5.Buf16((2 * BL_CODES + 1) * 2);
    zero(this.dyn_ltree);
    zero(this.dyn_dtree);
    zero(this.bl_tree);
    this.l_desc = null;
    this.d_desc = null;
    this.bl_desc = null;
    this.bl_count = new utils$5.Buf16(MAX_BITS + 1);
    this.heap = new utils$5.Buf16(2 * L_CODES + 1);
    zero(this.heap);
    this.heap_len = 0;
    this.heap_max = 0;
    this.depth = new utils$5.Buf16(2 * L_CODES + 1);
    zero(this.depth);
    this.l_buf = 0;
    this.lit_bufsize = 0;
    this.last_lit = 0;
    this.d_buf = 0;
    this.opt_len = 0;
    this.static_len = 0;
    this.matches = 0;
    this.insert = 0;
    this.bi_buf = 0;
    this.bi_valid = 0;
  }
  function deflateResetKeep(strm) {
    var s;
    if (!strm || !strm.state) {
      return err(strm, Z_STREAM_ERROR$1);
    }
    strm.total_in = strm.total_out = 0;
    strm.data_type = Z_UNKNOWN;
    s = strm.state;
    s.pending = 0;
    s.pending_out = 0;
    if (s.wrap < 0) {
      s.wrap = -s.wrap;
    }
    s.status = s.wrap ? INIT_STATE : BUSY_STATE;
    strm.adler = s.wrap === 2 ? 0 : 1;
    s.last_flush = Z_NO_FLUSH$1;
    trees._tr_init(s);
    return Z_OK$2;
  }
  function deflateReset(strm) {
    var ret = deflateResetKeep(strm);
    if (ret === Z_OK$2) {
      lm_init(strm.state);
    }
    return ret;
  }
  function deflateSetHeader(strm, head) {
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$1;
    }
    if (strm.state.wrap !== 2) {
      return Z_STREAM_ERROR$1;
    }
    strm.state.gzhead = head;
    return Z_OK$2;
  }
  function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
    if (!strm) {
      return Z_STREAM_ERROR$1;
    }
    var wrap = 1;
    if (level === Z_DEFAULT_COMPRESSION$1) {
      level = 6;
    }
    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    } else if (windowBits > 15) {
      wrap = 2;
      windowBits -= 16;
    }
    if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED) {
      return err(strm, Z_STREAM_ERROR$1);
    }
    if (windowBits === 8) {
      windowBits = 9;
    }
    var s = new DeflateState();
    strm.state = s;
    s.strm = strm;
    s.wrap = wrap;
    s.gzhead = null;
    s.w_bits = windowBits;
    s.w_size = 1 << s.w_bits;
    s.w_mask = s.w_size - 1;
    s.hash_bits = memLevel + 7;
    s.hash_size = 1 << s.hash_bits;
    s.hash_mask = s.hash_size - 1;
    s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
    s.window = new utils$5.Buf8(s.w_size * 2);
    s.head = new utils$5.Buf16(s.hash_size);
    s.prev = new utils$5.Buf16(s.w_size);
    s.lit_bufsize = 1 << memLevel + 6;
    s.pending_buf_size = s.lit_bufsize * 4;
    s.pending_buf = new utils$5.Buf8(s.pending_buf_size);
    s.d_buf = 1 * s.lit_bufsize;
    s.l_buf = (1 + 2) * s.lit_bufsize;
    s.level = level;
    s.strategy = strategy;
    s.method = method;
    return deflateReset(strm);
  }
  function deflateInit(strm, level) {
    return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
  }
  function deflate$2(strm, flush) {
    var old_flush, s;
    var beg, val;
    if (!strm || !strm.state || flush > Z_BLOCK$1 || flush < 0) {
      return strm ? err(strm, Z_STREAM_ERROR$1) : Z_STREAM_ERROR$1;
    }
    s = strm.state;
    if (!strm.output || !strm.input && strm.avail_in !== 0 || s.status === FINISH_STATE && flush !== Z_FINISH$2) {
      return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$1);
    }
    s.strm = strm;
    old_flush = s.last_flush;
    s.last_flush = flush;
    if (s.status === INIT_STATE) {
      if (s.wrap === 2) {
        strm.adler = 0;
        put_byte(s, 31);
        put_byte(s, 139);
        put_byte(s, 8);
        if (!s.gzhead) {
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
          put_byte(s, OS_CODE);
          s.status = BUSY_STATE;
        } else {
          put_byte(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16));
          put_byte(s, s.gzhead.time & 255);
          put_byte(s, s.gzhead.time >> 8 & 255);
          put_byte(s, s.gzhead.time >> 16 & 255);
          put_byte(s, s.gzhead.time >> 24 & 255);
          put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
          put_byte(s, s.gzhead.os & 255);
          if (s.gzhead.extra && s.gzhead.extra.length) {
            put_byte(s, s.gzhead.extra.length & 255);
            put_byte(s, s.gzhead.extra.length >> 8 & 255);
          }
          if (s.gzhead.hcrc) {
            strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending, 0);
          }
          s.gzindex = 0;
          s.status = EXTRA_STATE;
        }
      } else {
        var header = Z_DEFLATED$2 + (s.w_bits - 8 << 4) << 8;
        var level_flags = -1;
        if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
          level_flags = 0;
        } else if (s.level < 6) {
          level_flags = 1;
        } else if (s.level === 6) {
          level_flags = 2;
        } else {
          level_flags = 3;
        }
        header |= level_flags << 6;
        if (s.strstart !== 0) {
          header |= PRESET_DICT;
        }
        header += 31 - header % 31;
        s.status = BUSY_STATE;
        putShortMSB(s, header);
        if (s.strstart !== 0) {
          putShortMSB(s, strm.adler >>> 16);
          putShortMSB(s, strm.adler & 65535);
        }
        strm.adler = 1;
      }
    }
    if (s.status === EXTRA_STATE) {
      if (s.gzhead.extra) {
        beg = s.pending;
        while (s.gzindex < (s.gzhead.extra.length & 65535)) {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              break;
            }
          }
          put_byte(s, s.gzhead.extra[s.gzindex] & 255);
          s.gzindex++;
        }
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (s.gzindex === s.gzhead.extra.length) {
          s.gzindex = 0;
          s.status = NAME_STATE;
        }
      } else {
        s.status = NAME_STATE;
      }
    }
    if (s.status === NAME_STATE) {
      if (s.gzhead.name) {
        beg = s.pending;
        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          }
          if (s.gzindex < s.gzhead.name.length) {
            val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (val === 0) {
          s.gzindex = 0;
          s.status = COMMENT_STATE;
        }
      } else {
        s.status = COMMENT_STATE;
      }
    }
    if (s.status === COMMENT_STATE) {
      if (s.gzhead.comment) {
        beg = s.pending;
        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            beg = s.pending;
            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          }
          if (s.gzindex < s.gzhead.comment.length) {
            val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        if (val === 0) {
          s.status = HCRC_STATE;
        }
      } else {
        s.status = HCRC_STATE;
      }
    }
    if (s.status === HCRC_STATE) {
      if (s.gzhead.hcrc) {
        if (s.pending + 2 > s.pending_buf_size) {
          flush_pending(strm);
        }
        if (s.pending + 2 <= s.pending_buf_size) {
          put_byte(s, strm.adler & 255);
          put_byte(s, strm.adler >> 8 & 255);
          strm.adler = 0;
          s.status = BUSY_STATE;
        }
      } else {
        s.status = BUSY_STATE;
      }
    }
    if (s.pending !== 0) {
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        return Z_OK$2;
      }
    } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH$2) {
      return err(strm, Z_BUF_ERROR$1);
    }
    if (s.status === FINISH_STATE && strm.avail_in !== 0) {
      return err(strm, Z_BUF_ERROR$1);
    }
    if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH$1 && s.status !== FINISH_STATE) {
      var bstate = s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
      if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
        s.status = FINISH_STATE;
      }
      if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
        if (strm.avail_out === 0) {
          s.last_flush = -1;
        }
        return Z_OK$2;
      }
      if (bstate === BS_BLOCK_DONE) {
        if (flush === Z_PARTIAL_FLUSH) {
          trees._tr_align(s);
        } else if (flush !== Z_BLOCK$1) {
          trees._tr_stored_block(s, 0, 0, false);
          if (flush === Z_FULL_FLUSH) {
            zero(s.head);
            if (s.lookahead === 0) {
              s.strstart = 0;
              s.block_start = 0;
              s.insert = 0;
            }
          }
        }
        flush_pending(strm);
        if (strm.avail_out === 0) {
          s.last_flush = -1;
          return Z_OK$2;
        }
      }
    }
    if (flush !== Z_FINISH$2) {
      return Z_OK$2;
    }
    if (s.wrap <= 0) {
      return Z_STREAM_END$2;
    }
    if (s.wrap === 2) {
      put_byte(s, strm.adler & 255);
      put_byte(s, strm.adler >> 8 & 255);
      put_byte(s, strm.adler >> 16 & 255);
      put_byte(s, strm.adler >> 24 & 255);
      put_byte(s, strm.total_in & 255);
      put_byte(s, strm.total_in >> 8 & 255);
      put_byte(s, strm.total_in >> 16 & 255);
      put_byte(s, strm.total_in >> 24 & 255);
    } else {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 65535);
    }
    flush_pending(strm);
    if (s.wrap > 0) {
      s.wrap = -s.wrap;
    }
    return s.pending !== 0 ? Z_OK$2 : Z_STREAM_END$2;
  }
  function deflateEnd(strm) {
    var status;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$1;
    }
    status = strm.state.status;
    if (status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE) {
      return err(strm, Z_STREAM_ERROR$1);
    }
    strm.state = null;
    return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$1) : Z_OK$2;
  }
  function deflateSetDictionary(strm, dictionary) {
    var dictLength = dictionary.length;
    var s;
    var str, n;
    var wrap;
    var avail;
    var next;
    var input;
    var tmpDict;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$1;
    }
    s = strm.state;
    wrap = s.wrap;
    if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
      return Z_STREAM_ERROR$1;
    }
    if (wrap === 1) {
      strm.adler = adler32$1(strm.adler, dictionary, dictLength, 0);
    }
    s.wrap = 0;
    if (dictLength >= s.w_size) {
      if (wrap === 0) {
        zero(s.head);
        s.strstart = 0;
        s.block_start = 0;
        s.insert = 0;
      }
      tmpDict = new utils$5.Buf8(s.w_size);
      utils$5.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
      dictionary = tmpDict;
      dictLength = s.w_size;
    }
    avail = strm.avail_in;
    next = strm.next_in;
    input = strm.input;
    strm.avail_in = dictLength;
    strm.next_in = 0;
    strm.input = dictionary;
    fill_window(s);
    while (s.lookahead >= MIN_MATCH) {
      str = s.strstart;
      n = s.lookahead - (MIN_MATCH - 1);
      do {
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
      } while (--n);
      s.strstart = str;
      s.lookahead = MIN_MATCH - 1;
      fill_window(s);
    }
    s.strstart += s.lookahead;
    s.block_start = s.strstart;
    s.insert = s.lookahead;
    s.lookahead = 0;
    s.match_length = s.prev_length = MIN_MATCH - 1;
    s.match_available = 0;
    strm.next_in = next;
    strm.input = input;
    strm.avail_in = avail;
    s.wrap = wrap;
    return Z_OK$2;
  }
  deflate$3.deflateInit = deflateInit;
  deflate$3.deflateInit2 = deflateInit2;
  deflate$3.deflateReset = deflateReset;
  deflate$3.deflateResetKeep = deflateResetKeep;
  deflate$3.deflateSetHeader = deflateSetHeader;
  deflate$3.deflate = deflate$2;
  deflate$3.deflateEnd = deflateEnd;
  deflate$3.deflateSetDictionary = deflateSetDictionary;
  deflate$3.deflateInfo = "pako deflate (from Nodeca project)";
  var strings$2 = {};
  var utils$4 = common;
  var STR_APPLY_OK = true;
  var STR_APPLY_UIA_OK = true;
  try {
    String.fromCharCode.apply(null, [0]);
  } catch (__) {
    STR_APPLY_OK = false;
  }
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch (__) {
    STR_APPLY_UIA_OK = false;
  }
  var _utf8len = new utils$4.Buf8(256);
  for (var q = 0; q < 256; q++) {
    _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
  }
  _utf8len[254] = _utf8len[254] = 1;
  strings$2.string2buf = function(str) {
    var buf, c2, c22, m_pos, i2, str_len = str.length, buf_len = 0;
    for (m_pos = 0; m_pos < str_len; m_pos++) {
      c2 = str.charCodeAt(m_pos);
      if ((c2 & 64512) === 55296 && m_pos + 1 < str_len) {
        c22 = str.charCodeAt(m_pos + 1);
        if ((c22 & 64512) === 56320) {
          c2 = 65536 + (c2 - 55296 << 10) + (c22 - 56320);
          m_pos++;
        }
      }
      buf_len += c2 < 128 ? 1 : c2 < 2048 ? 2 : c2 < 65536 ? 3 : 4;
    }
    buf = new utils$4.Buf8(buf_len);
    for (i2 = 0, m_pos = 0; i2 < buf_len; m_pos++) {
      c2 = str.charCodeAt(m_pos);
      if ((c2 & 64512) === 55296 && m_pos + 1 < str_len) {
        c22 = str.charCodeAt(m_pos + 1);
        if ((c22 & 64512) === 56320) {
          c2 = 65536 + (c2 - 55296 << 10) + (c22 - 56320);
          m_pos++;
        }
      }
      if (c2 < 128) {
        buf[i2++] = c2;
      } else if (c2 < 2048) {
        buf[i2++] = 192 | c2 >>> 6;
        buf[i2++] = 128 | c2 & 63;
      } else if (c2 < 65536) {
        buf[i2++] = 224 | c2 >>> 12;
        buf[i2++] = 128 | c2 >>> 6 & 63;
        buf[i2++] = 128 | c2 & 63;
      } else {
        buf[i2++] = 240 | c2 >>> 18;
        buf[i2++] = 128 | c2 >>> 12 & 63;
        buf[i2++] = 128 | c2 >>> 6 & 63;
        buf[i2++] = 128 | c2 & 63;
      }
    }
    return buf;
  };
  function buf2binstring(buf, len) {
    if (len < 65534) {
      if (buf.subarray && STR_APPLY_UIA_OK || !buf.subarray && STR_APPLY_OK) {
        return String.fromCharCode.apply(null, utils$4.shrinkBuf(buf, len));
      }
    }
    var result = "";
    for (var i2 = 0; i2 < len; i2++) {
      result += String.fromCharCode(buf[i2]);
    }
    return result;
  }
  strings$2.buf2binstring = function(buf) {
    return buf2binstring(buf, buf.length);
  };
  strings$2.binstring2buf = function(str) {
    var buf = new utils$4.Buf8(str.length);
    for (var i2 = 0, len = buf.length; i2 < len; i2++) {
      buf[i2] = str.charCodeAt(i2);
    }
    return buf;
  };
  strings$2.buf2string = function(buf, max2) {
    var i2, out2, c2, c_len;
    var len = max2 || buf.length;
    var utf16buf = new Array(len * 2);
    for (out2 = 0, i2 = 0; i2 < len; ) {
      c2 = buf[i2++];
      if (c2 < 128) {
        utf16buf[out2++] = c2;
        continue;
      }
      c_len = _utf8len[c2];
      if (c_len > 4) {
        utf16buf[out2++] = 65533;
        i2 += c_len - 1;
        continue;
      }
      c2 &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
      while (c_len > 1 && i2 < len) {
        c2 = c2 << 6 | buf[i2++] & 63;
        c_len--;
      }
      if (c_len > 1) {
        utf16buf[out2++] = 65533;
        continue;
      }
      if (c2 < 65536) {
        utf16buf[out2++] = c2;
      } else {
        c2 -= 65536;
        utf16buf[out2++] = 55296 | c2 >> 10 & 1023;
        utf16buf[out2++] = 56320 | c2 & 1023;
      }
    }
    return buf2binstring(utf16buf, out2);
  };
  strings$2.utf8border = function(buf, max2) {
    var pos;
    max2 = max2 || buf.length;
    if (max2 > buf.length) {
      max2 = buf.length;
    }
    pos = max2 - 1;
    while (pos >= 0 && (buf[pos] & 192) === 128) {
      pos--;
    }
    if (pos < 0) {
      return max2;
    }
    if (pos === 0) {
      return max2;
    }
    return pos + _utf8len[buf[pos]] > max2 ? pos : max2;
  };
  function ZStream$2() {
    this.input = null;
    this.next_in = 0;
    this.avail_in = 0;
    this.total_in = 0;
    this.output = null;
    this.next_out = 0;
    this.avail_out = 0;
    this.total_out = 0;
    this.msg = "";
    this.state = null;
    this.data_type = 2;
    this.adler = 0;
  }
  var zstream = ZStream$2;
  var zlib_deflate = deflate$3;
  var utils$3 = common;
  var strings$1 = strings$2;
  var msg$1 = messages;
  var ZStream$1 = zstream;
  var toString$1 = Object.prototype.toString;
  var Z_NO_FLUSH = 0;
  var Z_FINISH$1 = 4;
  var Z_OK$1 = 0;
  var Z_STREAM_END$1 = 1;
  var Z_SYNC_FLUSH = 2;
  var Z_DEFAULT_COMPRESSION = -1;
  var Z_DEFAULT_STRATEGY = 0;
  var Z_DEFLATED$1 = 8;
  function Deflate(options) {
    if (!(this instanceof Deflate))
      return new Deflate(options);
    this.options = utils$3.assign({
      level: Z_DEFAULT_COMPRESSION,
      method: Z_DEFLATED$1,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: Z_DEFAULT_STRATEGY,
      to: ""
    }, options || {});
    var opt = this.options;
    if (opt.raw && opt.windowBits > 0) {
      opt.windowBits = -opt.windowBits;
    } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
      opt.windowBits += 16;
    }
    this.err = 0;
    this.msg = "";
    this.ended = false;
    this.chunks = [];
    this.strm = new ZStream$1();
    this.strm.avail_out = 0;
    var status = zlib_deflate.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy);
    if (status !== Z_OK$1) {
      throw new Error(msg$1[status]);
    }
    if (opt.header) {
      zlib_deflate.deflateSetHeader(this.strm, opt.header);
    }
    if (opt.dictionary) {
      var dict;
      if (typeof opt.dictionary === "string") {
        dict = strings$1.string2buf(opt.dictionary);
      } else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") {
        dict = new Uint8Array(opt.dictionary);
      } else {
        dict = opt.dictionary;
      }
      status = zlib_deflate.deflateSetDictionary(this.strm, dict);
      if (status !== Z_OK$1) {
        throw new Error(msg$1[status]);
      }
      this._dict_set = true;
    }
  }
  Deflate.prototype.push = function(data, mode) {
    var strm = this.strm;
    var chunkSize = this.options.chunkSize;
    var status, _mode;
    if (this.ended) {
      return false;
    }
    _mode = mode === ~~mode ? mode : mode === true ? Z_FINISH$1 : Z_NO_FLUSH;
    if (typeof data === "string") {
      strm.input = strings$1.string2buf(data);
    } else if (toString$1.call(data) === "[object ArrayBuffer]") {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data;
    }
    strm.next_in = 0;
    strm.avail_in = strm.input.length;
    do {
      if (strm.avail_out === 0) {
        strm.output = new utils$3.Buf8(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      }
      status = zlib_deflate.deflate(strm, _mode);
      if (status !== Z_STREAM_END$1 && status !== Z_OK$1) {
        this.onEnd(status);
        this.ended = true;
        return false;
      }
      if (strm.avail_out === 0 || strm.avail_in === 0 && (_mode === Z_FINISH$1 || _mode === Z_SYNC_FLUSH)) {
        if (this.options.to === "string") {
          this.onData(strings$1.buf2binstring(utils$3.shrinkBuf(strm.output, strm.next_out)));
        } else {
          this.onData(utils$3.shrinkBuf(strm.output, strm.next_out));
        }
      }
    } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END$1);
    if (_mode === Z_FINISH$1) {
      status = zlib_deflate.deflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === Z_OK$1;
    }
    if (_mode === Z_SYNC_FLUSH) {
      this.onEnd(Z_OK$1);
      strm.avail_out = 0;
      return true;
    }
    return true;
  };
  Deflate.prototype.onData = function(chunk) {
    this.chunks.push(chunk);
  };
  Deflate.prototype.onEnd = function(status) {
    if (status === Z_OK$1) {
      if (this.options.to === "string") {
        this.result = this.chunks.join("");
      } else {
        this.result = utils$3.flattenChunks(this.chunks);
      }
    }
    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  };
  function deflate$1(input, options) {
    var deflator = new Deflate(options);
    deflator.push(input, true);
    if (deflator.err) {
      throw deflator.msg || msg$1[deflator.err];
    }
    return deflator.result;
  }
  function deflateRaw(input, options) {
    options = options || {};
    options.raw = true;
    return deflate$1(input, options);
  }
  function gzip(input, options) {
    options = options || {};
    options.gzip = true;
    return deflate$1(input, options);
  }
  deflate$4.Deflate = Deflate;
  deflate$4.deflate = deflate$1;
  deflate$4.deflateRaw = deflateRaw;
  deflate$4.gzip = gzip;
  var inflate$4 = {};
  var inflate$3 = {};
  var BAD$1 = 30;
  var TYPE$1 = 12;
  var inffast = function inflate_fast2(strm, start) {
    var state;
    var _in;
    var last;
    var _out;
    var beg;
    var end;
    var dmax;
    var wsize;
    var whave;
    var wnext;
    var s_window;
    var hold;
    var bits;
    var lcode;
    var dcode;
    var lmask;
    var dmask;
    var here;
    var op;
    var len;
    var dist;
    var from;
    var from_source;
    var input, output;
    state = strm.state;
    _in = strm.next_in;
    input = strm.input;
    last = _in + (strm.avail_in - 5);
    _out = strm.next_out;
    output = strm.output;
    beg = _out - (start - strm.avail_out);
    end = _out + (strm.avail_out - 257);
    dmax = state.dmax;
    wsize = state.wsize;
    whave = state.whave;
    wnext = state.wnext;
    s_window = state.window;
    hold = state.hold;
    bits = state.bits;
    lcode = state.lencode;
    dcode = state.distcode;
    lmask = (1 << state.lenbits) - 1;
    dmask = (1 << state.distbits) - 1;
    top:
      do {
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = lcode[hold & lmask];
        dolen:
          for (; ; ) {
            op = here >>> 24;
            hold >>>= op;
            bits -= op;
            op = here >>> 16 & 255;
            if (op === 0) {
              output[_out++] = here & 65535;
            } else if (op & 16) {
              len = here & 65535;
              op &= 15;
              if (op) {
                if (bits < op) {
                  hold += input[_in++] << bits;
                  bits += 8;
                }
                len += hold & (1 << op) - 1;
                hold >>>= op;
                bits -= op;
              }
              if (bits < 15) {
                hold += input[_in++] << bits;
                bits += 8;
                hold += input[_in++] << bits;
                bits += 8;
              }
              here = dcode[hold & dmask];
              dodist:
                for (; ; ) {
                  op = here >>> 24;
                  hold >>>= op;
                  bits -= op;
                  op = here >>> 16 & 255;
                  if (op & 16) {
                    dist = here & 65535;
                    op &= 15;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                      if (bits < op) {
                        hold += input[_in++] << bits;
                        bits += 8;
                      }
                    }
                    dist += hold & (1 << op) - 1;
                    if (dist > dmax) {
                      strm.msg = "invalid distance too far back";
                      state.mode = BAD$1;
                      break top;
                    }
                    hold >>>= op;
                    bits -= op;
                    op = _out - beg;
                    if (dist > op) {
                      op = dist - op;
                      if (op > whave) {
                        if (state.sane) {
                          strm.msg = "invalid distance too far back";
                          state.mode = BAD$1;
                          break top;
                        }
                      }
                      from = 0;
                      from_source = s_window;
                      if (wnext === 0) {
                        from += wsize - op;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      } else if (wnext < op) {
                        from += wsize + wnext - op;
                        op -= wnext;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = 0;
                          if (wnext < len) {
                            op = wnext;
                            len -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = _out - dist;
                            from_source = output;
                          }
                        }
                      } else {
                        from += wnext - op;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      }
                      while (len > 2) {
                        output[_out++] = from_source[from++];
                        output[_out++] = from_source[from++];
                        output[_out++] = from_source[from++];
                        len -= 3;
                      }
                      if (len) {
                        output[_out++] = from_source[from++];
                        if (len > 1) {
                          output[_out++] = from_source[from++];
                        }
                      }
                    } else {
                      from = _out - dist;
                      do {
                        output[_out++] = output[from++];
                        output[_out++] = output[from++];
                        output[_out++] = output[from++];
                        len -= 3;
                      } while (len > 2);
                      if (len) {
                        output[_out++] = output[from++];
                        if (len > 1) {
                          output[_out++] = output[from++];
                        }
                      }
                    }
                  } else if ((op & 64) === 0) {
                    here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                    continue dodist;
                  } else {
                    strm.msg = "invalid distance code";
                    state.mode = BAD$1;
                    break top;
                  }
                  break;
                }
            } else if ((op & 64) === 0) {
              here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
              continue dolen;
            } else if (op & 32) {
              state.mode = TYPE$1;
              break top;
            } else {
              strm.msg = "invalid literal/length code";
              state.mode = BAD$1;
              break top;
            }
            break;
          }
      } while (_in < last && _out < end);
    len = bits >> 3;
    _in -= len;
    bits -= len << 3;
    hold &= (1 << bits) - 1;
    strm.next_in = _in;
    strm.next_out = _out;
    strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
    strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
    state.hold = hold;
    state.bits = bits;
    return;
  };
  var utils$2 = common;
  var MAXBITS = 15;
  var ENOUGH_LENS$1 = 852;
  var ENOUGH_DISTS$1 = 592;
  var CODES$1 = 0;
  var LENS$1 = 1;
  var DISTS$1 = 2;
  var lbase = [
    /* Length codes 257..285 base */
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    13,
    15,
    17,
    19,
    23,
    27,
    31,
    35,
    43,
    51,
    59,
    67,
    83,
    99,
    115,
    131,
    163,
    195,
    227,
    258,
    0,
    0
  ];
  var lext = [
    /* Length codes 257..285 extra */
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    16,
    72,
    78
  ];
  var dbase = [
    /* Distance codes 0..29 base */
    1,
    2,
    3,
    4,
    5,
    7,
    9,
    13,
    17,
    25,
    33,
    49,
    65,
    97,
    129,
    193,
    257,
    385,
    513,
    769,
    1025,
    1537,
    2049,
    3073,
    4097,
    6145,
    8193,
    12289,
    16385,
    24577,
    0,
    0
  ];
  var dext = [
    /* Distance codes 0..29 extra */
    16,
    16,
    16,
    16,
    17,
    17,
    18,
    18,
    19,
    19,
    20,
    20,
    21,
    21,
    22,
    22,
    23,
    23,
    24,
    24,
    25,
    25,
    26,
    26,
    27,
    27,
    28,
    28,
    29,
    29,
    64,
    64
  ];
  var inftrees = function inflate_table2(type, lens, lens_index, codes, table, table_index, work, opts) {
    var bits = opts.bits;
    var len = 0;
    var sym = 0;
    var min2 = 0, max2 = 0;
    var root = 0;
    var curr = 0;
    var drop = 0;
    var left = 0;
    var used = 0;
    var huff = 0;
    var incr;
    var fill;
    var low;
    var mask;
    var next;
    var base = null;
    var base_index = 0;
    var end;
    var count = new utils$2.Buf16(MAXBITS + 1);
    var offs = new utils$2.Buf16(MAXBITS + 1);
    var extra = null;
    var extra_index = 0;
    var here_bits, here_op, here_val;
    for (len = 0; len <= MAXBITS; len++) {
      count[len] = 0;
    }
    for (sym = 0; sym < codes; sym++) {
      count[lens[lens_index + sym]]++;
    }
    root = bits;
    for (max2 = MAXBITS; max2 >= 1; max2--) {
      if (count[max2] !== 0) {
        break;
      }
    }
    if (root > max2) {
      root = max2;
    }
    if (max2 === 0) {
      table[table_index++] = 1 << 24 | 64 << 16 | 0;
      table[table_index++] = 1 << 24 | 64 << 16 | 0;
      opts.bits = 1;
      return 0;
    }
    for (min2 = 1; min2 < max2; min2++) {
      if (count[min2] !== 0) {
        break;
      }
    }
    if (root < min2) {
      root = min2;
    }
    left = 1;
    for (len = 1; len <= MAXBITS; len++) {
      left <<= 1;
      left -= count[len];
      if (left < 0) {
        return -1;
      }
    }
    if (left > 0 && (type === CODES$1 || max2 !== 1)) {
      return -1;
    }
    offs[1] = 0;
    for (len = 1; len < MAXBITS; len++) {
      offs[len + 1] = offs[len] + count[len];
    }
    for (sym = 0; sym < codes; sym++) {
      if (lens[lens_index + sym] !== 0) {
        work[offs[lens[lens_index + sym]]++] = sym;
      }
    }
    if (type === CODES$1) {
      base = extra = work;
      end = 19;
    } else if (type === LENS$1) {
      base = lbase;
      base_index -= 257;
      extra = lext;
      extra_index -= 257;
      end = 256;
    } else {
      base = dbase;
      extra = dext;
      end = -1;
    }
    huff = 0;
    sym = 0;
    len = min2;
    next = table_index;
    curr = root;
    drop = 0;
    low = -1;
    used = 1 << root;
    mask = used - 1;
    if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
      return 1;
    }
    for (; ; ) {
      here_bits = len - drop;
      if (work[sym] < end) {
        here_op = 0;
        here_val = work[sym];
      } else if (work[sym] > end) {
        here_op = extra[extra_index + work[sym]];
        here_val = base[base_index + work[sym]];
      } else {
        here_op = 32 + 64;
        here_val = 0;
      }
      incr = 1 << len - drop;
      fill = 1 << curr;
      min2 = fill;
      do {
        fill -= incr;
        table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
      } while (fill !== 0);
      incr = 1 << len - 1;
      while (huff & incr) {
        incr >>= 1;
      }
      if (incr !== 0) {
        huff &= incr - 1;
        huff += incr;
      } else {
        huff = 0;
      }
      sym++;
      if (--count[len] === 0) {
        if (len === max2) {
          break;
        }
        len = lens[lens_index + work[sym]];
      }
      if (len > root && (huff & mask) !== low) {
        if (drop === 0) {
          drop = root;
        }
        next += min2;
        curr = len - drop;
        left = 1 << curr;
        while (curr + drop < max2) {
          left -= count[curr + drop];
          if (left <= 0) {
            break;
          }
          curr++;
          left <<= 1;
        }
        used += 1 << curr;
        if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
          return 1;
        }
        low = huff & mask;
        table[low] = root << 24 | curr << 16 | next - table_index | 0;
      }
    }
    if (huff !== 0) {
      table[next + huff] = len - drop << 24 | 64 << 16 | 0;
    }
    opts.bits = root;
    return 0;
  };
  var utils$1 = common;
  var adler32 = adler32_1;
  var crc32 = crc32_1;
  var inflate_fast = inffast;
  var inflate_table = inftrees;
  var CODES = 0;
  var LENS = 1;
  var DISTS = 2;
  var Z_FINISH = 4;
  var Z_BLOCK = 5;
  var Z_TREES = 6;
  var Z_OK = 0;
  var Z_STREAM_END = 1;
  var Z_NEED_DICT = 2;
  var Z_STREAM_ERROR = -2;
  var Z_DATA_ERROR = -3;
  var Z_MEM_ERROR = -4;
  var Z_BUF_ERROR = -5;
  var Z_DEFLATED = 8;
  var HEAD = 1;
  var FLAGS = 2;
  var TIME = 3;
  var OS = 4;
  var EXLEN = 5;
  var EXTRA = 6;
  var NAME = 7;
  var COMMENT = 8;
  var HCRC = 9;
  var DICTID = 10;
  var DICT = 11;
  var TYPE = 12;
  var TYPEDO = 13;
  var STORED = 14;
  var COPY_ = 15;
  var COPY = 16;
  var TABLE = 17;
  var LENLENS = 18;
  var CODELENS = 19;
  var LEN_ = 20;
  var LEN = 21;
  var LENEXT = 22;
  var DIST = 23;
  var DISTEXT = 24;
  var MATCH = 25;
  var LIT = 26;
  var CHECK = 27;
  var LENGTH = 28;
  var DONE = 29;
  var BAD = 30;
  var MEM = 31;
  var SYNC = 32;
  var ENOUGH_LENS = 852;
  var ENOUGH_DISTS = 592;
  var MAX_WBITS = 15;
  var DEF_WBITS = MAX_WBITS;
  function zswap32(q2) {
    return (q2 >>> 24 & 255) + (q2 >>> 8 & 65280) + ((q2 & 65280) << 8) + ((q2 & 255) << 24);
  }
  function InflateState() {
    this.mode = 0;
    this.last = false;
    this.wrap = 0;
    this.havedict = false;
    this.flags = 0;
    this.dmax = 0;
    this.check = 0;
    this.total = 0;
    this.head = null;
    this.wbits = 0;
    this.wsize = 0;
    this.whave = 0;
    this.wnext = 0;
    this.window = null;
    this.hold = 0;
    this.bits = 0;
    this.length = 0;
    this.offset = 0;
    this.extra = 0;
    this.lencode = null;
    this.distcode = null;
    this.lenbits = 0;
    this.distbits = 0;
    this.ncode = 0;
    this.nlen = 0;
    this.ndist = 0;
    this.have = 0;
    this.next = null;
    this.lens = new utils$1.Buf16(320);
    this.work = new utils$1.Buf16(288);
    this.lendyn = null;
    this.distdyn = null;
    this.sane = 0;
    this.back = 0;
    this.was = 0;
  }
  function inflateResetKeep(strm) {
    var state;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    strm.total_in = strm.total_out = state.total = 0;
    strm.msg = "";
    if (state.wrap) {
      strm.adler = state.wrap & 1;
    }
    state.mode = HEAD;
    state.last = 0;
    state.havedict = 0;
    state.dmax = 32768;
    state.head = null;
    state.hold = 0;
    state.bits = 0;
    state.lencode = state.lendyn = new utils$1.Buf32(ENOUGH_LENS);
    state.distcode = state.distdyn = new utils$1.Buf32(ENOUGH_DISTS);
    state.sane = 1;
    state.back = -1;
    return Z_OK;
  }
  function inflateReset(strm) {
    var state;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    state.wsize = 0;
    state.whave = 0;
    state.wnext = 0;
    return inflateResetKeep(strm);
  }
  function inflateReset2(strm, windowBits) {
    var wrap;
    var state;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    } else {
      wrap = (windowBits >> 4) + 1;
      if (windowBits < 48) {
        windowBits &= 15;
      }
    }
    if (windowBits && (windowBits < 8 || windowBits > 15)) {
      return Z_STREAM_ERROR;
    }
    if (state.window !== null && state.wbits !== windowBits) {
      state.window = null;
    }
    state.wrap = wrap;
    state.wbits = windowBits;
    return inflateReset(strm);
  }
  function inflateInit2(strm, windowBits) {
    var ret;
    var state;
    if (!strm) {
      return Z_STREAM_ERROR;
    }
    state = new InflateState();
    strm.state = state;
    state.window = null;
    ret = inflateReset2(strm, windowBits);
    if (ret !== Z_OK) {
      strm.state = null;
    }
    return ret;
  }
  function inflateInit(strm) {
    return inflateInit2(strm, DEF_WBITS);
  }
  var virgin = true;
  var lenfix, distfix;
  function fixedtables(state) {
    if (virgin) {
      var sym;
      lenfix = new utils$1.Buf32(512);
      distfix = new utils$1.Buf32(32);
      sym = 0;
      while (sym < 144) {
        state.lens[sym++] = 8;
      }
      while (sym < 256) {
        state.lens[sym++] = 9;
      }
      while (sym < 280) {
        state.lens[sym++] = 7;
      }
      while (sym < 288) {
        state.lens[sym++] = 8;
      }
      inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, {
        bits: 9
      });
      sym = 0;
      while (sym < 32) {
        state.lens[sym++] = 5;
      }
      inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, {
        bits: 5
      });
      virgin = false;
    }
    state.lencode = lenfix;
    state.lenbits = 9;
    state.distcode = distfix;
    state.distbits = 5;
  }
  function updatewindow(strm, src, end, copy) {
    var dist;
    var state = strm.state;
    if (state.window === null) {
      state.wsize = 1 << state.wbits;
      state.wnext = 0;
      state.whave = 0;
      state.window = new utils$1.Buf8(state.wsize);
    }
    if (copy >= state.wsize) {
      utils$1.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
      state.wnext = 0;
      state.whave = state.wsize;
    } else {
      dist = state.wsize - state.wnext;
      if (dist > copy) {
        dist = copy;
      }
      utils$1.arraySet(state.window, src, end - copy, dist, state.wnext);
      copy -= dist;
      if (copy) {
        utils$1.arraySet(state.window, src, end - copy, copy, 0);
        state.wnext = copy;
        state.whave = state.wsize;
      } else {
        state.wnext += dist;
        if (state.wnext === state.wsize) {
          state.wnext = 0;
        }
        if (state.whave < state.wsize) {
          state.whave += dist;
        }
      }
    }
    return 0;
  }
  function inflate$2(strm, flush) {
    var state;
    var input, output;
    var next;
    var put;
    var have, left;
    var hold;
    var bits;
    var _in, _out;
    var copy;
    var from;
    var from_source;
    var here = 0;
    var here_bits, here_op, here_val;
    var last_bits, last_op, last_val;
    var len;
    var ret;
    var hbuf = new utils$1.Buf8(4);
    var opts;
    var n;
    var order = (
      /* permutation of code lengths */
      [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
    );
    if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    if (state.mode === TYPE) {
      state.mode = TYPEDO;
    }
    put = strm.next_out;
    output = strm.output;
    left = strm.avail_out;
    next = strm.next_in;
    input = strm.input;
    have = strm.avail_in;
    hold = state.hold;
    bits = state.bits;
    _in = have;
    _out = left;
    ret = Z_OK;
    inf_leave:
      for (; ; ) {
        switch (state.mode) {
          case HEAD:
            if (state.wrap === 0) {
              state.mode = TYPEDO;
              break;
            }
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 2 && hold === 35615) {
              state.check = 0;
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32(state.check, hbuf, 2, 0);
              hold = 0;
              bits = 0;
              state.mode = FLAGS;
              break;
            }
            state.flags = 0;
            if (state.head) {
              state.head.done = false;
            }
            if (!(state.wrap & 1) || /* check if zlib header allowed */
            (((hold & 255) << 8) + (hold >> 8)) % 31) {
              strm.msg = "incorrect header check";
              state.mode = BAD;
              break;
            }
            if ((hold & 15) !== Z_DEFLATED) {
              strm.msg = "unknown compression method";
              state.mode = BAD;
              break;
            }
            hold >>>= 4;
            bits -= 4;
            len = (hold & 15) + 8;
            if (state.wbits === 0) {
              state.wbits = len;
            } else if (len > state.wbits) {
              strm.msg = "invalid window size";
              state.mode = BAD;
              break;
            }
            state.dmax = 1 << len;
            strm.adler = state.check = 1;
            state.mode = hold & 512 ? DICTID : TYPE;
            hold = 0;
            bits = 0;
            break;
          case FLAGS:
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.flags = hold;
            if ((state.flags & 255) !== Z_DEFLATED) {
              strm.msg = "unknown compression method";
              state.mode = BAD;
              break;
            }
            if (state.flags & 57344) {
              strm.msg = "unknown header flags set";
              state.mode = BAD;
              break;
            }
            if (state.head) {
              state.head.text = hold >> 8 & 1;
            }
            if (state.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
            state.mode = TIME;
          case TIME:
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.head) {
              state.head.time = hold;
            }
            if (state.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              hbuf[2] = hold >>> 16 & 255;
              hbuf[3] = hold >>> 24 & 255;
              state.check = crc32(state.check, hbuf, 4, 0);
            }
            hold = 0;
            bits = 0;
            state.mode = OS;
          case OS:
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.head) {
              state.head.xflags = hold & 255;
              state.head.os = hold >> 8;
            }
            if (state.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
            state.mode = EXLEN;
          case EXLEN:
            if (state.flags & 1024) {
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.length = hold;
              if (state.head) {
                state.head.extra_len = hold;
              }
              if (state.flags & 512) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state.check = crc32(state.check, hbuf, 2, 0);
              }
              hold = 0;
              bits = 0;
            } else if (state.head) {
              state.head.extra = null;
            }
            state.mode = EXTRA;
          case EXTRA:
            if (state.flags & 1024) {
              copy = state.length;
              if (copy > have) {
                copy = have;
              }
              if (copy) {
                if (state.head) {
                  len = state.head.extra_len - state.length;
                  if (!state.head.extra) {
                    state.head.extra = new Array(state.head.extra_len);
                  }
                  utils$1.arraySet(
                    state.head.extra,
                    input,
                    next,
                    // extra field is limited to 65536 bytes
                    // - no need for additional size check
                    copy,
                    /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                    len
                  );
                }
                if (state.flags & 512) {
                  state.check = crc32(state.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                state.length -= copy;
              }
              if (state.length) {
                break inf_leave;
              }
            }
            state.length = 0;
            state.mode = NAME;
          case NAME:
            if (state.flags & 2048) {
              if (have === 0) {
                break inf_leave;
              }
              copy = 0;
              do {
                len = input[next + copy++];
                if (state.head && len && state.length < 65536) {
                  state.head.name += String.fromCharCode(len);
                }
              } while (len && copy < have);
              if (state.flags & 512) {
                state.check = crc32(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) {
                break inf_leave;
              }
            } else if (state.head) {
              state.head.name = null;
            }
            state.length = 0;
            state.mode = COMMENT;
          case COMMENT:
            if (state.flags & 4096) {
              if (have === 0) {
                break inf_leave;
              }
              copy = 0;
              do {
                len = input[next + copy++];
                if (state.head && len && state.length < 65536) {
                  state.head.comment += String.fromCharCode(len);
                }
              } while (len && copy < have);
              if (state.flags & 512) {
                state.check = crc32(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) {
                break inf_leave;
              }
            } else if (state.head) {
              state.head.comment = null;
            }
            state.mode = HCRC;
          case HCRC:
            if (state.flags & 512) {
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (hold !== (state.check & 65535)) {
                strm.msg = "header crc mismatch";
                state.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            if (state.head) {
              state.head.hcrc = state.flags >> 9 & 1;
              state.head.done = true;
            }
            strm.adler = state.check = 0;
            state.mode = TYPE;
            break;
          case DICTID:
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            strm.adler = state.check = zswap32(hold);
            hold = 0;
            bits = 0;
            state.mode = DICT;
          case DICT:
            if (state.havedict === 0) {
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state.hold = hold;
              state.bits = bits;
              return Z_NEED_DICT;
            }
            strm.adler = state.check = 1;
            state.mode = TYPE;
          case TYPE:
            if (flush === Z_BLOCK || flush === Z_TREES) {
              break inf_leave;
            }
          case TYPEDO:
            if (state.last) {
              hold >>>= bits & 7;
              bits -= bits & 7;
              state.mode = CHECK;
              break;
            }
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.last = hold & 1;
            hold >>>= 1;
            bits -= 1;
            switch (hold & 3) {
              case 0:
                state.mode = STORED;
                break;
              case 1:
                fixedtables(state);
                state.mode = LEN_;
                if (flush === Z_TREES) {
                  hold >>>= 2;
                  bits -= 2;
                  break inf_leave;
                }
                break;
              case 2:
                state.mode = TABLE;
                break;
              case 3:
                strm.msg = "invalid block type";
                state.mode = BAD;
            }
            hold >>>= 2;
            bits -= 2;
            break;
          case STORED:
            hold >>>= bits & 7;
            bits -= bits & 7;
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
              strm.msg = "invalid stored block lengths";
              state.mode = BAD;
              break;
            }
            state.length = hold & 65535;
            hold = 0;
            bits = 0;
            state.mode = COPY_;
            if (flush === Z_TREES) {
              break inf_leave;
            }
          case COPY_:
            state.mode = COPY;
          case COPY:
            copy = state.length;
            if (copy) {
              if (copy > have) {
                copy = have;
              }
              if (copy > left) {
                copy = left;
              }
              if (copy === 0) {
                break inf_leave;
              }
              utils$1.arraySet(output, input, next, copy, put);
              have -= copy;
              next += copy;
              left -= copy;
              put += copy;
              state.length -= copy;
              break;
            }
            state.mode = TYPE;
            break;
          case TABLE:
            while (bits < 14) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.nlen = (hold & 31) + 257;
            hold >>>= 5;
            bits -= 5;
            state.ndist = (hold & 31) + 1;
            hold >>>= 5;
            bits -= 5;
            state.ncode = (hold & 15) + 4;
            hold >>>= 4;
            bits -= 4;
            if (state.nlen > 286 || state.ndist > 30) {
              strm.msg = "too many length or distance symbols";
              state.mode = BAD;
              break;
            }
            state.have = 0;
            state.mode = LENLENS;
          case LENLENS:
            while (state.have < state.ncode) {
              while (bits < 3) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.lens[order[state.have++]] = hold & 7;
              hold >>>= 3;
              bits -= 3;
            }
            while (state.have < 19) {
              state.lens[order[state.have++]] = 0;
            }
            state.lencode = state.lendyn;
            state.lenbits = 7;
            opts = {
              bits: state.lenbits
            };
            ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
            state.lenbits = opts.bits;
            if (ret) {
              strm.msg = "invalid code lengths set";
              state.mode = BAD;
              break;
            }
            state.have = 0;
            state.mode = CODELENS;
          case CODELENS:
            while (state.have < state.nlen + state.ndist) {
              for (; ; ) {
                here = state.lencode[hold & (1 << state.lenbits) - 1];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (here_val < 16) {
                hold >>>= here_bits;
                bits -= here_bits;
                state.lens[state.have++] = here_val;
              } else {
                if (here_val === 16) {
                  n = here_bits + 2;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  if (state.have === 0) {
                    strm.msg = "invalid bit length repeat";
                    state.mode = BAD;
                    break;
                  }
                  len = state.lens[state.have - 1];
                  copy = 3 + (hold & 3);
                  hold >>>= 2;
                  bits -= 2;
                } else if (here_val === 17) {
                  n = here_bits + 3;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  len = 0;
                  copy = 3 + (hold & 7);
                  hold >>>= 3;
                  bits -= 3;
                } else {
                  n = here_bits + 7;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  len = 0;
                  copy = 11 + (hold & 127);
                  hold >>>= 7;
                  bits -= 7;
                }
                if (state.have + copy > state.nlen + state.ndist) {
                  strm.msg = "invalid bit length repeat";
                  state.mode = BAD;
                  break;
                }
                while (copy--) {
                  state.lens[state.have++] = len;
                }
              }
            }
            if (state.mode === BAD) {
              break;
            }
            if (state.lens[256] === 0) {
              strm.msg = "invalid code -- missing end-of-block";
              state.mode = BAD;
              break;
            }
            state.lenbits = 9;
            opts = {
              bits: state.lenbits
            };
            ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
            state.lenbits = opts.bits;
            if (ret) {
              strm.msg = "invalid literal/lengths set";
              state.mode = BAD;
              break;
            }
            state.distbits = 6;
            state.distcode = state.distdyn;
            opts = {
              bits: state.distbits
            };
            ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
            state.distbits = opts.bits;
            if (ret) {
              strm.msg = "invalid distances set";
              state.mode = BAD;
              break;
            }
            state.mode = LEN_;
            if (flush === Z_TREES) {
              break inf_leave;
            }
          case LEN_:
            state.mode = LEN;
          case LEN:
            if (have >= 6 && left >= 258) {
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state.hold = hold;
              state.bits = bits;
              inflate_fast(strm, _out);
              put = strm.next_out;
              output = strm.output;
              left = strm.avail_out;
              next = strm.next_in;
              input = strm.input;
              have = strm.avail_in;
              hold = state.hold;
              bits = state.bits;
              if (state.mode === TYPE) {
                state.back = -1;
              }
              break;
            }
            state.back = 0;
            for (; ; ) {
              here = state.lencode[hold & (1 << state.lenbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (here_op && (here_op & 240) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (; ; ) {
                here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (last_bits + here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              hold >>>= last_bits;
              bits -= last_bits;
              state.back += last_bits;
            }
            hold >>>= here_bits;
            bits -= here_bits;
            state.back += here_bits;
            state.length = here_val;
            if (here_op === 0) {
              state.mode = LIT;
              break;
            }
            if (here_op & 32) {
              state.back = -1;
              state.mode = TYPE;
              break;
            }
            if (here_op & 64) {
              strm.msg = "invalid literal/length code";
              state.mode = BAD;
              break;
            }
            state.extra = here_op & 15;
            state.mode = LENEXT;
          case LENEXT:
            if (state.extra) {
              n = state.extra;
              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.length += hold & (1 << state.extra) - 1;
              hold >>>= state.extra;
              bits -= state.extra;
              state.back += state.extra;
            }
            state.was = state.length;
            state.mode = DIST;
          case DIST:
            for (; ; ) {
              here = state.distcode[hold & (1 << state.distbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if ((here_op & 240) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (; ; ) {
                here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (last_bits + here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              hold >>>= last_bits;
              bits -= last_bits;
              state.back += last_bits;
            }
            hold >>>= here_bits;
            bits -= here_bits;
            state.back += here_bits;
            if (here_op & 64) {
              strm.msg = "invalid distance code";
              state.mode = BAD;
              break;
            }
            state.offset = here_val;
            state.extra = here_op & 15;
            state.mode = DISTEXT;
          case DISTEXT:
            if (state.extra) {
              n = state.extra;
              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.offset += hold & (1 << state.extra) - 1;
              hold >>>= state.extra;
              bits -= state.extra;
              state.back += state.extra;
            }
            if (state.offset > state.dmax) {
              strm.msg = "invalid distance too far back";
              state.mode = BAD;
              break;
            }
            state.mode = MATCH;
          case MATCH:
            if (left === 0) {
              break inf_leave;
            }
            copy = _out - left;
            if (state.offset > copy) {
              copy = state.offset - copy;
              if (copy > state.whave) {
                if (state.sane) {
                  strm.msg = "invalid distance too far back";
                  state.mode = BAD;
                  break;
                }
              }
              if (copy > state.wnext) {
                copy -= state.wnext;
                from = state.wsize - copy;
              } else {
                from = state.wnext - copy;
              }
              if (copy > state.length) {
                copy = state.length;
              }
              from_source = state.window;
            } else {
              from_source = output;
              from = put - state.offset;
              copy = state.length;
            }
            if (copy > left) {
              copy = left;
            }
            left -= copy;
            state.length -= copy;
            do {
              output[put++] = from_source[from++];
            } while (--copy);
            if (state.length === 0) {
              state.mode = LEN;
            }
            break;
          case LIT:
            if (left === 0) {
              break inf_leave;
            }
            output[put++] = state.length;
            left--;
            state.mode = LEN;
            break;
          case CHECK:
            if (state.wrap) {
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold |= input[next++] << bits;
                bits += 8;
              }
              _out -= left;
              strm.total_out += _out;
              state.total += _out;
              if (_out) {
                strm.adler = state.check = /*UPDATE(state.check, put - _out, _out);*/
                state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out);
              }
              _out = left;
              if ((state.flags ? hold : zswap32(hold)) !== state.check) {
                strm.msg = "incorrect data check";
                state.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            state.mode = LENGTH;
          case LENGTH:
            if (state.wrap && state.flags) {
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (hold !== (state.total & 4294967295)) {
                strm.msg = "incorrect length check";
                state.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            state.mode = DONE;
          case DONE:
            ret = Z_STREAM_END;
            break inf_leave;
          case BAD:
            ret = Z_DATA_ERROR;
            break inf_leave;
          case MEM:
            return Z_MEM_ERROR;
          case SYNC:
          default:
            return Z_STREAM_ERROR;
        }
      }
    strm.next_out = put;
    strm.avail_out = left;
    strm.next_in = next;
    strm.avail_in = have;
    state.hold = hold;
    state.bits = bits;
    if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH)) {
      if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out))
        ;
    }
    _in -= strm.avail_in;
    _out -= strm.avail_out;
    strm.total_in += _in;
    strm.total_out += _out;
    state.total += _out;
    if (state.wrap && _out) {
      strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out);
    }
    strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
    if ((_in === 0 && _out === 0 || flush === Z_FINISH) && ret === Z_OK) {
      ret = Z_BUF_ERROR;
    }
    return ret;
  }
  function inflateEnd(strm) {
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    var state = strm.state;
    if (state.window) {
      state.window = null;
    }
    strm.state = null;
    return Z_OK;
  }
  function inflateGetHeader(strm, head) {
    var state;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    if ((state.wrap & 2) === 0) {
      return Z_STREAM_ERROR;
    }
    state.head = head;
    head.done = false;
    return Z_OK;
  }
  function inflateSetDictionary(strm, dictionary) {
    var dictLength = dictionary.length;
    var state;
    var dictid;
    var ret;
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR;
    }
    state = strm.state;
    if (state.wrap !== 0 && state.mode !== DICT) {
      return Z_STREAM_ERROR;
    }
    if (state.mode === DICT) {
      dictid = 1;
      dictid = adler32(dictid, dictionary, dictLength, 0);
      if (dictid !== state.check) {
        return Z_DATA_ERROR;
      }
    }
    ret = updatewindow(strm, dictionary, dictLength, dictLength);
    if (ret) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
    state.havedict = 1;
    return Z_OK;
  }
  inflate$3.inflateReset = inflateReset;
  inflate$3.inflateReset2 = inflateReset2;
  inflate$3.inflateResetKeep = inflateResetKeep;
  inflate$3.inflateInit = inflateInit;
  inflate$3.inflateInit2 = inflateInit2;
  inflate$3.inflate = inflate$2;
  inflate$3.inflateEnd = inflateEnd;
  inflate$3.inflateGetHeader = inflateGetHeader;
  inflate$3.inflateSetDictionary = inflateSetDictionary;
  inflate$3.inflateInfo = "pako inflate (from Nodeca project)";
  var constants$1 = {
    /* Allowed flush values; see deflate() and inflate() below for details */
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    /* Return codes for the compression/decompression functions. Negative values
    * are errors, positive values are used for special but normal events.
    */
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    //Z_MEM_ERROR:     -4,
    Z_BUF_ERROR: -5,
    //Z_VERSION_ERROR: -6,
    /* compression levels */
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    /* Possible values of the data_type field (though see inflate()) */
    Z_BINARY: 0,
    Z_TEXT: 1,
    //Z_ASCII:                1, // = Z_TEXT (deprecated)
    Z_UNKNOWN: 2,
    /* The deflate compression method */
    Z_DEFLATED: 8
    //Z_NULL:                 null // Use -1 or null inline, depending on var type
  };
  function GZheader$1() {
    this.text = 0;
    this.time = 0;
    this.xflags = 0;
    this.os = 0;
    this.extra = null;
    this.extra_len = 0;
    this.name = "";
    this.comment = "";
    this.hcrc = 0;
    this.done = false;
  }
  var gzheader = GZheader$1;
  var zlib_inflate = inflate$3;
  var utils = common;
  var strings = strings$2;
  var c = constants$1;
  var msg = messages;
  var ZStream = zstream;
  var GZheader = gzheader;
  var toString = Object.prototype.toString;
  function Inflate(options) {
    if (!(this instanceof Inflate))
      return new Inflate(options);
    this.options = utils.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ""
    }, options || {});
    var opt = this.options;
    if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
      opt.windowBits = -opt.windowBits;
      if (opt.windowBits === 0) {
        opt.windowBits = -15;
      }
    }
    if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
      opt.windowBits += 32;
    }
    if (opt.windowBits > 15 && opt.windowBits < 48) {
      if ((opt.windowBits & 15) === 0) {
        opt.windowBits |= 15;
      }
    }
    this.err = 0;
    this.msg = "";
    this.ended = false;
    this.chunks = [];
    this.strm = new ZStream();
    this.strm.avail_out = 0;
    var status = zlib_inflate.inflateInit2(this.strm, opt.windowBits);
    if (status !== c.Z_OK) {
      throw new Error(msg[status]);
    }
    this.header = new GZheader();
    zlib_inflate.inflateGetHeader(this.strm, this.header);
    if (opt.dictionary) {
      if (typeof opt.dictionary === "string") {
        opt.dictionary = strings.string2buf(opt.dictionary);
      } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
        opt.dictionary = new Uint8Array(opt.dictionary);
      }
      if (opt.raw) {
        status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
        if (status !== c.Z_OK) {
          throw new Error(msg[status]);
        }
      }
    }
  }
  Inflate.prototype.push = function(data, mode) {
    var strm = this.strm;
    var chunkSize = this.options.chunkSize;
    var dictionary = this.options.dictionary;
    var status, _mode;
    var next_out_utf8, tail, utf8str;
    var allowBufError = false;
    if (this.ended) {
      return false;
    }
    _mode = mode === ~~mode ? mode : mode === true ? c.Z_FINISH : c.Z_NO_FLUSH;
    if (typeof data === "string") {
      strm.input = strings.binstring2buf(data);
    } else if (toString.call(data) === "[object ArrayBuffer]") {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data;
    }
    strm.next_in = 0;
    strm.avail_in = strm.input.length;
    do {
      if (strm.avail_out === 0) {
        strm.output = new utils.Buf8(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      }
      status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);
      if (status === c.Z_NEED_DICT && dictionary) {
        status = zlib_inflate.inflateSetDictionary(this.strm, dictionary);
      }
      if (status === c.Z_BUF_ERROR && allowBufError === true) {
        status = c.Z_OK;
        allowBufError = false;
      }
      if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
        this.onEnd(status);
        this.ended = true;
        return false;
      }
      if (strm.next_out) {
        if (strm.avail_out === 0 || status === c.Z_STREAM_END || strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH)) {
          if (this.options.to === "string") {
            next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
            tail = strm.next_out - next_out_utf8;
            utf8str = strings.buf2string(strm.output, next_out_utf8);
            strm.next_out = tail;
            strm.avail_out = chunkSize - tail;
            if (tail) {
              utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0);
            }
            this.onData(utf8str);
          } else {
            this.onData(utils.shrinkBuf(strm.output, strm.next_out));
          }
        }
      }
      if (strm.avail_in === 0 && strm.avail_out === 0) {
        allowBufError = true;
      }
    } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);
    if (status === c.Z_STREAM_END) {
      _mode = c.Z_FINISH;
    }
    if (_mode === c.Z_FINISH) {
      status = zlib_inflate.inflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === c.Z_OK;
    }
    if (_mode === c.Z_SYNC_FLUSH) {
      this.onEnd(c.Z_OK);
      strm.avail_out = 0;
      return true;
    }
    return true;
  };
  Inflate.prototype.onData = function(chunk) {
    this.chunks.push(chunk);
  };
  Inflate.prototype.onEnd = function(status) {
    if (status === c.Z_OK) {
      if (this.options.to === "string") {
        this.result = this.chunks.join("");
      } else {
        this.result = utils.flattenChunks(this.chunks);
      }
    }
    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  };
  function inflate$1(input, options) {
    var inflator = new Inflate(options);
    inflator.push(input, true);
    if (inflator.err) {
      throw inflator.msg || msg[inflator.err];
    }
    return inflator.result;
  }
  function inflateRaw(input, options) {
    options = options || {};
    options.raw = true;
    return inflate$1(input, options);
  }
  inflate$4.Inflate = Inflate;
  inflate$4.inflate = inflate$1;
  inflate$4.inflateRaw = inflateRaw;
  inflate$4.ungzip = inflate$1;
  var assign = common.assign;
  var deflate = deflate$4;
  var inflate = inflate$4;
  var constants = constants$1;
  var pako = {};
  assign(pako, deflate, inflate, constants);
  var API_UPX2PX = "upx2px";
  var EPS = 1e-4;
  var BASE_DEVICE_WIDTH = 750;
  var isIOS = false;
  var deviceWidth = 0;
  var deviceDPR = 0;
  var maxWidth = 960;
  var baseWidth = 375;
  var includeWidth = 750;
  function checkDeviceWidth() {
    var {
      platform,
      pixelRatio,
      windowWidth
    } = getBaseSystemInfo();
    deviceWidth = windowWidth;
    deviceDPR = pixelRatio;
    isIOS = platform === "ios";
  }
  function checkValue(value, defaultValue) {
    var newValue = Number(value);
    return isNaN(newValue) ? defaultValue : newValue;
  }
  function checkMaxWidth() {
    var config = __uniConfig.globalStyle || {};
    maxWidth = checkValue(config.rpxCalcMaxDeviceWidth, 960);
    baseWidth = checkValue(config.rpxCalcBaseDeviceWidth, 375);
    includeWidth = checkValue(config.rpxCalcBaseDeviceWidth, 750);
  }
  var upx2px = /* @__PURE__ */ defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
    if (deviceWidth === 0) {
      checkDeviceWidth();
      {
        checkMaxWidth();
      }
    }
    number = Number(number);
    if (number === 0) {
      return 0;
    }
    var width = newDeviceWidth || deviceWidth;
    {
      width = number === includeWidth || width <= maxWidth ? width : baseWidth;
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
  });
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
  var API_SET_PAGE_META = "setPageMeta";
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
      } catch (e) {
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
      this._checkForIntersections = throttle(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);
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
      return threshold.sort().filter(function(t, i2, a) {
        if (typeof t != "number" || isNaN(t) || t < 0 || t > 1) {
          throw new Error("threshold must be a number between 0 and 1 inclusively");
        }
        return t !== a[i2 - 1];
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
      var index = this._monitoringDocuments.indexOf(doc2);
      if (index == -1) {
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
      var unsubscribe = this._monitoringUnsubscribes[index];
      this._monitoringDocuments.splice(index, 1);
      this._monitoringUnsubscribes.splice(index, 1);
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
        if (parent == this.root || parent.nodeType == /* DOCUMENT */
        9) {
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
      var index = registry.indexOf(this);
      if (index != -1)
        registry.splice(index, 1);
    };
    function now() {
      return window.performance && performance.now && performance.now();
    }
    function throttle(fn, timeout) {
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
      } catch (err2) {
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
      if (node.nodeType == /* DOCUMENT */
      9 && node != document2) {
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
  function rectifyIntersectionRatio(entrie) {
    var {
      intersectionRatio,
      boundingClientRect: {
        height: overAllHeight,
        width: overAllWidth
      },
      intersectionRect: {
        height: intersectionHeight,
        width: intersectionWidth
      }
    } = entrie;
    if (intersectionRatio !== 0)
      return intersectionRatio;
    return intersectionHeight === overAllHeight ? intersectionWidth / overAllWidth : intersectionHeight / overAllHeight;
  }
  function requestComponentObserver($el, options, callback) {
    initIntersectionObserverPolyfill();
    var root = options.relativeToSelector ? $el.querySelector(options.relativeToSelector) : null;
    var intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entrie) => {
        callback({
          intersectionRatio: rectifyIntersectionRatio(entrie),
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
  const uni$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    navigateBack,
    navigateTo,
    reLaunch,
    redirectTo,
    switchTab,
    upx2px
  }, Symbol.toStringTag, { value: "Module" }));
  function createGetDict(dict) {
    if (!dict.length) {
      return (v) => v;
    }
    var getDict = function(value) {
      var includeValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      if (typeof value === "number") {
        return dict[value];
      }
      var res = {};
      value.forEach((_ref) => {
        var [n, v] = _ref;
        if (includeValue) {
          res[getDict(n)] = getDict(v);
        } else {
          res[getDict(n)] = v;
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
    if (hasOwn$1(nodeJson, "a")) {
      nodeJson.a = getDict(nodeJson.a);
    }
    if (hasOwn$1(nodeJson, "e")) {
      nodeJson.e = getDict(nodeJson.e, false);
    }
    if (hasOwn$1(nodeJson, "w")) {
      nodeJson.w = getWxsEventDict(nodeJson.w, getDict);
    }
    if (hasOwn$1(nodeJson, "s")) {
      nodeJson.s = getDict(nodeJson.s);
    }
    if (hasOwn$1(nodeJson, "t")) {
      nodeJson.t = getDict(nodeJson.t);
    }
    return nodeJson;
  }
  function getWxsEventDict(w, getDict) {
    var res = {};
    w.forEach((_ref4) => {
      var [name, [wxsEvent, flag]] = _ref4;
      res[getDict(name)] = [getDict(wxsEvent), flag];
    });
    return res;
  }
  var elements = /* @__PURE__ */ new Map();
  function $(id2) {
    return elements.get(id2);
  }
  function getElement(id2) {
    return elements.get(id2);
  }
  function setElement(id2, element) {
    elements.set(id2, element);
  }
  function removeElement(id2) {
    return elements.delete(id2);
  }
  function createActionJob(fn, priority) {
    return fn.priority = priority, fn;
  }
  var postActionJobs = /* @__PURE__ */ new Set();
  var JOB_PRIORITY_UPDATE = 1;
  var JOB_PRIORITY_RENDERJS = 3;
  var JOB_PRIORITY_WXS_PROPS = 4;
  function queuePostActionJob(job, priority) {
    postActionJobs.add(createActionJob(job, priority));
  }
  function flushPostActionJobs() {
    try {
      ;
      [...postActionJobs].sort((a, b) => a.priority - b.priority).forEach((fn) => fn());
    } finally {
      postActionJobs.clear();
    }
  }
  function getViewModule(moduleId, ownerEl) {
    var __wxsModules = window["__" + WXS_MODULES];
    var module = __wxsModules && __wxsModules[moduleId];
    if (module) {
      return module;
    }
    if (ownerEl && ownerEl.__renderjsInstances) {
      return ownerEl.__renderjsInstances[moduleId];
    }
  }
  var WXS_PROTOCOL_LEN = WXS_PROTOCOL.length;
  function invokeWxs(el, wxsStr, invokerArgs) {
    var [ownerId, moduleId, invoker, args] = parseWxs(wxsStr);
    var ownerEl = resolveOwnerEl(el, ownerId);
    if (isArray(invokerArgs) || isArray(args)) {
      var [moduleName, methodName] = invoker.split(".");
      return invokeWxsMethod(ownerEl, moduleId, moduleName, methodName, invokerArgs || args);
    }
    return getWxsProp(ownerEl, moduleId, invoker);
  }
  function invokeWxsEvent(el, wxsStr, event) {
    var [ownerId, moduleId, invoker] = parseWxs(wxsStr);
    var [moduleName, methodName] = invoker.split(".");
    var ownerEl = resolveOwnerEl(el, ownerId);
    return invokeWxsMethod(ownerEl, moduleId, moduleName, methodName, [wrapperWxsEvent(event, el), getComponentDescriptor(createComponentDescriptorVm(ownerEl))]);
  }
  function resolveOwnerEl(el, ownerId) {
    if (el.__ownerId === ownerId) {
      return el;
    }
    var parentElement = el.parentElement;
    while (parentElement) {
      if (parentElement.__ownerId === ownerId) {
        return parentElement;
      }
      parentElement = parentElement.parentElement;
    }
    return el;
  }
  function parseWxs(wxsStr) {
    return JSON.parse(wxsStr.slice(WXS_PROTOCOL_LEN));
  }
  function invokeWxsProps(wxsStr, el, newValue, oldValue) {
    var [ownerId, moduleId, invoker] = parseWxs(wxsStr);
    var ownerEl = resolveOwnerEl(el, ownerId);
    var [moduleName, methodName] = invoker.split(".");
    return invokeWxsMethod(ownerEl, moduleId, moduleName, methodName, [newValue, oldValue, getComponentDescriptor(createComponentDescriptorVm(ownerEl)), getComponentDescriptor(createComponentDescriptorVm(el))]);
  }
  function invokeWxsMethod(ownerEl, moduleId, moduleName, methodName, args) {
    var module = getViewModule(moduleId, ownerEl);
    if (!module) {
      return console.error(formatLog("wxs", "module " + moduleName + " not found"));
    }
    var method = module[methodName];
    if (!isFunction(method)) {
      return console.error(moduleName + "." + methodName + " is not a function");
    }
    return method.apply(module, args);
  }
  function getWxsProp(ownerEl, moduleId, dataPath) {
    var module = getViewModule(moduleId, ownerEl);
    if (!module) {
      return console.error(formatLog("wxs", "module " + dataPath + " not found"));
    }
    return getValueByDataPath(module, dataPath.slice(dataPath.indexOf(".") + 1));
  }
  function createWxsPropsInvoker(node, wxsInvoker, value) {
    var oldValue = value;
    return (newValue) => {
      try {
        invokeWxsProps(wxsInvoker, node.$, newValue, oldValue);
      } catch (e) {
        console.error(e);
      }
      oldValue = newValue;
    };
  }
  function wrapperWxsEvent(event, el) {
    var vm = createComponentDescriptorVm(el);
    Object.defineProperty(event, "instance", {
      get() {
        return getComponentDescriptor(vm);
      }
    });
    return event;
  }
  function initRenderjs(node, moduleIds) {
    Object.keys(moduleIds).forEach((name) => {
      initRenderjsModule(node, moduleIds[name]);
    });
  }
  function destroyRenderjs(node) {
    var {
      __renderjsInstances
    } = node.$;
    if (!__renderjsInstances) {
      return;
    }
    Object.keys(__renderjsInstances).forEach((id2) => {
      __renderjsInstances[id2].$.appContext.app.unmount();
    });
  }
  function initRenderjsModule(node, moduleId) {
    var options = getRenderjsModule(moduleId);
    if (!options) {
      return;
    }
    var el = node.$;
    (el.__renderjsInstances || (el.__renderjsInstances = {}))[moduleId] = createRenderjsInstance(el, options);
  }
  function getRenderjsModule(moduleId) {
    var __renderjsModules = window["__" + RENDERJS_MODULES];
    var module = __renderjsModules && __renderjsModules[moduleId];
    if (!module) {
      return console.error(formatLog("renderjs", moduleId + " not found"));
    }
    return module;
  }
  function createRenderjsInstance(el, options) {
    options = options.default || options;
    options.render = () => {
    };
    return createApp(options).mixin({
      mounted() {
        this.$ownerInstance = getComponentDescriptor(createComponentDescriptorVm(el));
      }
    }).mount(document.createElement("div"));
  }
  var JSON_PROTOCOL_LEN = JSON_PROTOCOL.length;
  function decodeAttr(value, el) {
    if (!isString(value)) {
      return value;
    }
    if (value.indexOf(JSON_PROTOCOL) === 0) {
      value = JSON.parse(value.slice(JSON_PROTOCOL_LEN));
    } else if (value.indexOf(WXS_PROTOCOL) === 0) {
      value = invokeWxs(el, value);
    }
    return value;
  }
  function isCssVar(name) {
    return name.indexOf("--") === 0;
  }
  function isUniComponent(el) {
    return !!el.addWxsEvent;
  }
  class UniNode {
    constructor(id2, tag, parentNodeId, element) {
      this.isMounted = false;
      this.isUnmounted = false;
      this.$hasWxsProps = false;
      this.$children = [];
      this.id = id2;
      this.tag = tag;
      this.pid = parentNodeId;
      if (element) {
        this.$ = element;
      }
      this.$wxsProps = /* @__PURE__ */ new Map();
      var parent = this.$parent = getElement(parentNodeId);
      if (parent) {
        parent.appendUniChild(this);
      }
    }
    init(nodeJson) {
      if (hasOwn$1(nodeJson, "t")) {
        this.$.textContent = nodeJson.t;
      }
    }
    setText(text) {
      this.$.textContent = text;
      this.updateView();
    }
    insert(parentNodeId, refNodeId, nodeJson) {
      if (nodeJson) {
        this.init(nodeJson, false);
      }
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
      this.removeUniParent();
      var {
        $: $2
      } = this;
      $2.parentNode.removeChild($2);
      this.isUnmounted = true;
      removeElement(this.id);
      destroyRenderjs(this);
      this.removeUniChildren();
      this.updateView();
    }
    appendChild(node) {
      var ref2 = this.$.appendChild(node);
      this.updateView(true);
      return ref2;
    }
    insertBefore(newChild, refChild) {
      var ref2 = this.$.insertBefore(newChild, refChild);
      this.updateView(true);
      return ref2;
    }
    appendUniChild(node) {
      this.$children.push(node);
    }
    removeUniChild(node) {
      var index = this.$children.indexOf(node);
      if (index >= 0) {
        this.$children.splice(index, 1);
      }
    }
    removeUniParent() {
      var {
        $parent
      } = this;
      if ($parent) {
        $parent.removeUniChild(this);
        this.$parent = void 0;
      }
    }
    removeUniChildren() {
      this.$children.forEach((node) => node.remove());
      this.$children.length = 0;
    }
    setWxsProps(attrs2) {
      Object.keys(attrs2).forEach((name) => {
        if (name.indexOf(ATTR_CHANGE_PREFIX) === 0) {
          var propName = name.replace(ATTR_CHANGE_PREFIX, "");
          var value = decodeAttr(attrs2[propName]);
          var invoker = createWxsPropsInvoker(this, attrs2[name], value);
          queuePostActionJob(() => invoker(value), JOB_PRIORITY_WXS_PROPS);
          this.$wxsProps.set(name, invoker);
          delete attrs2[name];
          delete attrs2[propName];
          this.$hasWxsProps = true;
        }
      });
    }
    addWxsEvents(events) {
      Object.keys(events).forEach((name) => {
        var [wxsEvent, flag] = events[name];
        this.addWxsEvent(name, wxsEvent, flag);
      });
    }
    addWxsEvent(name, wxsEvent, flag) {
    }
    wxsPropsInvoke(name, value) {
      var isNextTick = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      var wxsPropsInvoker = this.$hasWxsProps && this.$wxsProps.get(ATTR_CHANGE_PREFIX + name);
      if (wxsPropsInvoker) {
        return (
          // 等待其他属性先更新，因为开发者可能在invoker中获取当前节点的最新属性信息
          // vue组件中的change:props需要nextTick后执行，普通element，队列后执行
          queuePostActionJob(() => isNextTick ? nextTick(() => wxsPropsInvoker(value)) : wxsPropsInvoker(value), JOB_PRIORITY_WXS_PROPS), true
        );
      }
    }
    updateView(isMounted) {
      if (this.isMounted || isMounted) {
        window.dispatchEvent(new CustomEvent("updateview"));
      }
    }
  }
  function patchClass(el, clazz) {
    var {
      __wxsAddClass,
      __wxsRemoveClass
    } = el;
    if (__wxsRemoveClass && __wxsRemoveClass.length) {
      clazz = clazz.split(/\s+/).filter((v) => __wxsRemoveClass.indexOf(v) === -1).join(" ");
      __wxsRemoveClass.length = 0;
    }
    if (__wxsAddClass && __wxsAddClass.length) {
      clazz = clazz + " " + __wxsAddClass.join(" ");
    }
    el.className = clazz;
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
      if (filepath.startsWith("/storage/") || filepath.startsWith("/sdcard/") || filepath.includes("/Containers/Data/Application/")) {
        return "file://" + filepath;
      }
      return wwwPath + filepath;
    }
    if (filepath.indexOf("../") === 0 || filepath.indexOf("./") === 0) {
      if (typeof __id__ === "string") {
        return wwwPath + getRealRoute(addLeadingSlash(__id__), filepath);
      } else {
        var page = getCurrentPage();
        if (page) {
          return wwwPath + getRealRoute(addLeadingSlash(page.route), filepath);
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
  function normalizeStyleValue$1(val) {
    return normalizeUrl(normalizeRpx(val));
  }
  var urlRE = /url\(\s*'?"?([a-zA-Z0-9\.\-\_\/]+\.(jpg|gif|png))"?'?\s*\)/;
  var normalizeUrl = (val) => {
    if (isString(val) && val.indexOf("url(") !== -1) {
      var matches2 = val.match(urlRE);
      if (matches2 && matches2.length === 3) {
        val = val.replace(matches2[1], getRealPath(matches2[1]));
      }
    }
    return val;
  };
  var {
    unit,
    unitRatio,
    unitPrecision
  } = defaultRpx2Unit;
  var rpx2Unit = createRpx2Unit(unit, unitRatio, unitPrecision);
  var normalizeRpx = (val) => {
    if (isString(val)) {
      return rpx2Unit(val);
    }
    return val;
  };
  var prefixes = [
    "Webkit"
    /*, 'Moz', 'ms'*/
  ];
  var prefixCache = {};
  function normalizeStyleName$1(style, rawName) {
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
  function patchStyle(el, value) {
    var style = el.style;
    if (isString(value)) {
      if (value === "") {
        el.removeAttribute("style");
      } else {
        style.cssText = normalizeStyleValue$1(value);
      }
    } else {
      for (var key2 in value) {
        setStyle(style, key2, value[key2]);
      }
    }
    var {
      __wxsStyle
    } = el;
    if (__wxsStyle) {
      for (var _key in __wxsStyle) {
        setStyle(style, _key, __wxsStyle[_key]);
      }
    }
  }
  var importantRE = /\s*!important$/;
  function setStyle(style, name, val) {
    if (isArray(val)) {
      val.forEach((v) => setStyle(style, name, v));
    } else {
      val = normalizeStyleValue$1(val);
      if (name.startsWith("--")) {
        style.setProperty(name, val);
      } else {
        var prefixed = normalizeStyleName$1(style, name);
        if (importantRE.test(val)) {
          style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
        } else {
          style[prefixed] = val;
        }
      }
    }
  }
  function removeEventListener(el, type) {
    var listener = el.__listeners[type];
    if (listener) {
      el.removeEventListener(type, listener);
    }
  }
  function isEventListenerExists(el, type) {
    if (el.__listeners[type]) {
      return true;
    }
  }
  function patchEvent(el, name, flag) {
    var [type, options] = parseEventName(name);
    if (flag === -1) {
      removeEventListener(el, type);
    } else {
      if (!isEventListenerExists(el, type)) {
        el.addEventListener(type, el.__listeners[type] = createInvoker(el.__id, flag, options), options);
      }
    }
  }
  function createInvoker(id2, flag, options) {
    var invoker = (evt) => {
      var [event] = $nne(evt);
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
  function patchWxsEvent(el, name, wxsEvent, flag) {
    var [type, options] = parseEventName(name);
    if (flag === -1) {
      removeEventListener(el, type);
    } else {
      if (!isEventListenerExists(el, type)) {
        el.addEventListener(type, el.__listeners[type] = createWxsEventInvoker(el, wxsEvent, flag), options);
      }
    }
  }
  function createWxsEventInvoker(el, wxsEvent, flag) {
    var invoker = (evt) => {
      invokeWxsEvent(isUniComponent(el) ? el.$ : el, wxsEvent, $nne(evt)[0]);
    };
    if (!flag) {
      return invoker;
    }
    return withModifiers(invoker, resolveModifier(flag));
  }
  function patchVShow(el, value) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    el.style.display = value ? el._vod : "none";
  }
  class UniElement extends UniNode {
    constructor(id2, element, parentNodeId, refNodeId, nodeJson) {
      var propNames = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [];
      super(id2, element.tagName, parentNodeId, element);
      this.$props = reactive({});
      this.$.__id = id2;
      this.$.__listeners = /* @__PURE__ */ Object.create(null);
      this.$propNames = propNames;
      this._update = this.update.bind(this);
      this.init(nodeJson);
      this.insert(parentNodeId, refNodeId);
    }
    init(nodeJson) {
      var isCreate = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      if (hasOwn$1(nodeJson, "a")) {
        this.setAttrs(nodeJson.a);
      }
      if (hasOwn$1(nodeJson, "s")) {
        this.setAttr("style", nodeJson.s);
      }
      if (hasOwn$1(nodeJson, "e")) {
        this.addEvents(nodeJson.e);
      }
      if (hasOwn$1(nodeJson, "w")) {
        this.addWxsEvents(nodeJson.w);
      }
      super.init(nodeJson);
      if (isCreate) {
        watch(this.$props, () => {
          queuePostActionJob(this._update, JOB_PRIORITY_UPDATE);
        }, {
          flush: "sync"
        });
        this.update(true);
      }
    }
    setAttrs(attrs2) {
      this.setWxsProps(attrs2);
      Object.keys(attrs2).forEach((name) => {
        this.setAttr(name, attrs2[name]);
      });
    }
    addEvents(events) {
      Object.keys(events).forEach((name) => {
        this.addEvent(name, events[name]);
      });
    }
    addWxsEvent(name, wxsEvent, flag) {
      patchWxsEvent(this.$, name, wxsEvent, flag);
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
      } else if (name === ATTR_V_OWNER_ID) {
        this.$.__ownerId = value;
      } else if (name === ATTR_V_RENDERJS) {
        queuePostActionJob(() => initRenderjs(this, value), JOB_PRIORITY_RENDERJS);
      } else if (name === ATTR_INNER_HTML) {
        this.$.innerHTML = value;
      } else if (name === ATTR_TEXT_CONTENT) {
        this.setText(value);
      } else {
        this.setAttribute(name, value);
      }
      this.updateView();
    }
    removeAttr(name) {
      if (name === ATTR_CLASS) {
        patchClass(this.$, "");
      } else if (name === ATTR_STYLE) {
        patchStyle(this.$, "");
      } else {
        this.removeAttribute(name);
      }
      this.updateView();
    }
    setAttribute(name, value) {
      value = decodeAttr(value, this.$);
      if (this.$propNames.indexOf(name) !== -1) {
        this.$props[name] = value;
      } else if (isCssVar(name)) {
        this.$.style.setProperty(name, normalizeStyleValue$1(value));
      } else {
        if (!this.wxsPropsInvoke(name, value)) {
          this.$.setAttribute(name, value);
        }
      }
    }
    removeAttribute(name) {
      if (this.$propNames.indexOf(name) !== -1) {
        delete this.$props[name];
      } else if (isCssVar(name)) {
        this.$.style.removeProperty(name);
      } else {
        this.$.removeAttribute(name);
      }
    }
    update() {
    }
  }
  function converPx(value) {
    if (/^-?\d+[ur]px$/i.test(value)) {
      return value.replace(/(^-?\d+)[ur]px$/i, (text, num) => {
        return "".concat(uni.upx2px(parseFloat(num)), "px");
      });
    } else if (/^-?[\d\.]+$/.test(value)) {
      return "".concat(value, "px");
    }
    return value || "";
  }
  function converType(type) {
    return type.replace(/[A-Z]/g, (text) => {
      return "-".concat(text.toLowerCase());
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
    var index = 0;
    var actions = animation2.actions;
    var length = animation2.actions.length;
    function animate() {
      var action = actions[index];
      var transition = action.option.transition;
      var style = getStyle(action);
      Object.keys(style).forEach((key2) => {
        context.$el.style[key2] = style[key2];
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
  const animation = {
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
    options.__reserved = true;
    var {
      props,
      mixins
    } = options;
    if (!props || !props.animation) {
      (mixins || (options.mixins = [])).push(animation);
    }
    return defineSystemComponent(options);
  };
  var defineSystemComponent = (options) => {
    options.__reserved = true;
    options.compatConfig = {
      MODE: 3
      // 标记为vue3
    };
    return /* @__PURE__ */ defineComponent(options);
  };
  function withWebEvent(fn) {
    return fn.__wwe = true, fn;
  }
  function useHover(props) {
    var hovering = ref(false);
    var hoverTouch = false;
    var hoverStartTimer;
    var hoverStayTimer;
    function hoverReset() {
      requestAnimationFrame(() => {
        clearTimeout(hoverStayTimer);
        hoverStayTimer = setTimeout(() => {
          hovering.value = false;
        }, parseInt(props.hoverStayTime));
      });
    }
    function onTouchstartPassive(evt) {
      if (evt.touches.length > 1) {
        return;
      }
      handleHoverStart(evt);
    }
    function onMousedown(evt) {
      if (hoverTouch) {
        return;
      }
      handleHoverStart(evt);
      window.addEventListener("mouseup", handlePCHoverEnd);
    }
    function handleHoverStart(evt) {
      if (evt._hoverPropagationStopped) {
        return;
      }
      if (!props.hoverClass || props.hoverClass === "none" || props.disabled) {
        return;
      }
      if (props.hoverStopPropagation) {
        evt._hoverPropagationStopped = true;
      }
      hoverTouch = true;
      hoverStartTimer = setTimeout(() => {
        hovering.value = true;
        if (!hoverTouch) {
          hoverReset();
        }
      }, parseInt(props.hoverStartTime));
    }
    function onTouchend() {
      handleHoverEnd();
    }
    function onMouseup() {
      if (!hoverTouch) {
        return;
      }
      handlePCHoverEnd();
    }
    function handleHoverEnd() {
      hoverTouch = false;
      if (hovering.value) {
        hoverReset();
      }
    }
    function handlePCHoverEnd() {
      handleHoverEnd();
      window.removeEventListener("mouseup", handlePCHoverEnd);
    }
    function onTouchcancel() {
      hoverTouch = false;
      hovering.value = false;
      clearTimeout(hoverStartTimer);
    }
    return {
      hovering,
      binding: {
        onTouchstartPassive: withWebEvent(onTouchstartPassive),
        onMousedown: withWebEvent(onMousedown),
        onTouchend: withWebEvent(onTouchend),
        onMouseup: withWebEvent(onMouseup),
        onTouchcancel: withWebEvent(onTouchcancel)
      }
    };
  }
  function useBooleanAttr(props, keys) {
    if (isString(keys)) {
      keys = [keys];
    }
    return keys.reduce((res, key2) => {
      if (props[key2]) {
        res[key2] = true;
      }
      return res;
    }, /* @__PURE__ */ Object.create(null));
  }
  var uniFormKey = PolySymbol("uf");
  var uniLabelKey = PolySymbol("ul");
  function useListeners(props, listeners2) {
    _addListeners(props.id, listeners2);
    watch(() => props.id, (newId, oldId) => {
      _removeListeners(oldId, listeners2, true);
      _addListeners(newId, listeners2, true);
    });
    onUnmounted(() => {
      _removeListeners(props.id, listeners2);
    });
  }
  function _addListeners(id2, listeners2, watch2) {
    var pageId = useCurrentPageId();
    if (watch2 && !id2) {
      return;
    }
    if (!isPlainObject(listeners2)) {
      return;
    }
    Object.keys(listeners2).forEach((name) => {
      if (watch2) {
        if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) {
          UniViewJSBridge.on("uni-".concat(name, "-").concat(pageId, "-").concat(id2), listeners2[name]);
        }
      } else {
        if (name.indexOf("uni-") === 0) {
          UniViewJSBridge.on(name, listeners2[name]);
        } else if (id2) {
          UniViewJSBridge.on("uni-".concat(name, "-").concat(pageId, "-").concat(id2), listeners2[name]);
        }
      }
    });
  }
  function _removeListeners(id2, listeners2, watch2) {
    var pageId = useCurrentPageId();
    if (watch2 && !id2) {
      return;
    }
    if (!isPlainObject(listeners2)) {
      return;
    }
    Object.keys(listeners2).forEach((name) => {
      if (watch2) {
        if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) {
          UniViewJSBridge.off("uni-".concat(name, "-").concat(pageId, "-").concat(id2), listeners2[name]);
        }
      } else {
        if (name.indexOf("uni-") === 0) {
          UniViewJSBridge.off(name, listeners2[name]);
        } else if (id2) {
          UniViewJSBridge.off("uni-".concat(name, "-").concat(pageId, "-").concat(id2), listeners2[name]);
        }
      }
    });
  }
  var buttonProps = {
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
    },
    plain: {
      type: [Boolean, String],
      default: false
    }
  };
  const Button = /* @__PURE__ */ defineBuiltInComponent({
    name: "Button",
    props: buttonProps,
    setup(props, _ref) {
      var {
        slots
      } = _ref;
      var rootRef = ref(null);
      {
        initI18nButtonMsgsOnce();
      }
      var uniForm = inject(uniFormKey, false);
      var {
        hovering,
        binding
      } = useHover(props);
      var onClick = withWebEvent((e, isLabelClick) => {
        if (props.disabled) {
          return e.stopImmediatePropagation();
        }
        if (isLabelClick) {
          rootRef.value.click();
        }
        var formType = props.formType;
        if (formType) {
          if (!uniForm) {
            return;
          }
          if (formType === "submit") {
            uniForm.submit(e);
          } else if (formType === "reset") {
            uniForm.reset(e);
          }
          return;
        }
      });
      var uniLabel = inject(uniLabelKey, false);
      if (uniLabel) {
        uniLabel.addHandler(onClick);
        onBeforeUnmount(() => {
          uniLabel.removeHandler(onClick);
        });
      }
      useListeners(props, {
        "label-click": onClick
      });
      return () => {
        var hoverClass = props.hoverClass;
        var booleanAttrs = useBooleanAttr(props, "disabled");
        var loadingAttrs = useBooleanAttr(props, "loading");
        var plainAttrs = useBooleanAttr(props, "plain");
        var hasHoverClass = hoverClass && hoverClass !== "none";
        return createVNode("uni-button", mergeProps({
          "ref": rootRef,
          "onClick": onClick,
          "id": props.id,
          "class": hasHoverClass && hovering.value ? hoverClass : ""
        }, hasHoverClass && binding, booleanAttrs, loadingAttrs, plainAttrs), [slots.default && slots.default()], 16, ["onClick", "id"]);
      };
    }
  });
  {
    plusReady(() => {
    });
    document.addEventListener("keyboardchange", function(event) {
      event.height;
    }, false);
  }
  var SPACE_UNICODE = {
    ensp: " ",
    emsp: " ",
    nbsp: " "
  };
  function normalizeText(text, _ref) {
    var {
      space,
      decode
    } = _ref;
    var result = "";
    var isEscape = false;
    for (var char of text) {
      if (space && SPACE_UNICODE[space] && char === " ") {
        char = SPACE_UNICODE[space];
      }
      if (isEscape) {
        if (char === "n") {
          result += LINEFEED;
        } else if (char === "\\") {
          result += "\\";
        } else {
          result += "\\" + char;
        }
        isEscape = false;
      } else {
        if (char === "\\") {
          isEscape = true;
        } else {
          result += char;
        }
      }
    }
    if (!decode) {
      return result;
    }
    return result.replace(/&nbsp;/g, SPACE_UNICODE.nbsp).replace(/&ensp;/g, SPACE_UNICODE.ensp).replace(/&emsp;/g, SPACE_UNICODE.emsp).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
  }
  function parseText(text, options) {
    return normalizeText(text, options).split(LINEFEED);
  }
  function getContextInfo(el) {
    return el.__uniContextInfo;
  }
  class UniTextNode extends UniNode {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "#text", parentNodeId, document.createTextNode(""));
      this._text = "";
      this.init(nodeJson);
      this.insert(parentNodeId, refNodeId);
    }
    init(nodeJson) {
      var isCreate = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      this._text = nodeJson.t || "";
      if (isCreate) {
        this.update();
      }
    }
    setText(text) {
      this._text = text;
      this.update();
      this.updateView();
    }
    update() {
      var {
        space,
        decode
      } = this.$parent && this.$parent.$props || {};
      this.$.textContent = parseText(this._text, {
        space,
        decode
      }).join(LINEFEED);
    }
  }
  class UniComment extends UniNode {
    constructor(id2, parentNodeId, refNodeId) {
      super(id2, "#comment", parentNodeId, document.createComment(""));
      this.insert(parentNodeId, refNodeId);
    }
  }
  class UniAnimationElement extends UniElement {
    constructor(id2, element, parentNodeId, refNodeId, nodeJson) {
      var propNames = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [];
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
    update() {
      var isMounted = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
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
  var PROP_NAMES_HOVER = ["hover-class", "hover-stop-propagation", "hover-start-time", "hover-stay-time"];
  class UniHoverElement extends UniAnimationElement {
    constructor(id2, element, parentNodeId, refNodeId, nodeJson) {
      var propNames = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [];
      super(id2, element, parentNodeId, refNodeId, nodeJson, [...PROP_NAMES_HOVER, ...propNames]);
    }
    update() {
      var isMounted = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
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
    constructor($2, props) {
      this._listening = false;
      this._hovering = false;
      this._hoverTouch = false;
      this.$ = $2;
      this.props = props;
      this.__hoverTouchStart = this._hoverTouchStart.bind(this);
      this.__hoverTouchEnd = this._hoverTouchEnd.bind(this);
      this.__hoverTouchCancel = this._hoverTouchCancel.bind(this);
    }
    get hovering() {
      return this._hovering;
    }
    set hovering(hovering) {
      this._hovering = hovering;
      var hoverClass = this.props["hover-class"].split(" ").filter(Boolean);
      var ClassList = this.$.classList;
      if (hovering) {
        this.$.classList.add.apply(ClassList, hoverClass);
      } else {
        this.$.classList.remove.apply(ClassList, hoverClass);
      }
    }
    addEvent() {
      if (this._listening) {
        return;
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
  function createWrapper(component, props) {
    return () => h(component, props);
  }
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
      this.$.__id = id2;
      if (selector) {
        this.$holder = this.$.querySelector(selector);
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
        a,
        e,
        w
      } = nodeJson;
      if (a) {
        this.setWxsProps(a);
        Object.keys(a).forEach((n) => {
          this.setAttr(n, a[n]);
        });
      }
      if (hasOwn$1(nodeJson, "s")) {
        this.setAttr("style", nodeJson.s);
      }
      if (e) {
        Object.keys(e).forEach((n) => {
          this.addEvent(n, e[n]);
        });
      }
      if (w) {
        this.addWxsEvents(nodeJson.w);
      }
    }
    setText(text) {
      (this.$holder || this.$).textContent = text;
      this.updateView();
    }
    addWxsEvent(name, wxsEvent, flag) {
      this.$props[name] = createWxsEventInvoker(this, wxsEvent, flag);
    }
    addEvent(name, value) {
      this.$props[name] = createInvoker(this.id, value, parseEventName(name)[1]);
    }
    removeEvent(name) {
      this.$props[name] = null;
    }
    setAttr(name, value) {
      if (name === ATTR_V_SHOW) {
        if (this.$) {
          patchVShow(this.$, value);
        }
      } else if (name === ATTR_V_OWNER_ID) {
        this.$.__ownerId = value;
      } else if (name === ATTR_V_RENDERJS) {
        queuePostActionJob(() => initRenderjs(this, value), JOB_PRIORITY_RENDERJS);
      } else if (name === ATTR_STYLE) {
        var newStyle = decodeAttr(value, this.$ || $(this.pid).$);
        var oldStyle = this.$props.style;
        if (isPlainObject(newStyle) && isPlainObject(oldStyle)) {
          Object.keys(newStyle).forEach((n) => {
            oldStyle[n] = newStyle[n];
          });
        } else {
          this.$props.style = newStyle;
        }
      } else if (isCssVar(name)) {
        this.$.style.setProperty(name, normalizeStyleValue$1(value));
      } else {
        value = decodeAttr(value, this.$ || $(this.pid).$);
        if (!this.wxsPropsInvoke(name, value, true)) {
          this.$props[name] = value;
        }
      }
      this.updateView();
    }
    removeAttr(name) {
      if (isCssVar(name)) {
        this.$.style.removeProperty(name);
      } else {
        this.$props[name] = null;
      }
      this.updateView();
    }
    remove() {
      this.removeUniParent();
      this.isUnmounted = true;
      this.$app.unmount();
      removeElement(this.id);
      this.removeUniChildren();
      this.updateView();
    }
    appendChild(node) {
      var res = (this.$holder || this.$).appendChild(node);
      this.updateView(true);
      return res;
    }
    insertBefore(newChild, refChild) {
      var res = (this.$holder || this.$).insertBefore(newChild, refChild);
      this.updateView(true);
      return res;
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
  class UniButton extends UniComponent {
    constructor(id2, parentNodeId, refNodeId, nodeJson) {
      super(id2, "uni-button", Button, parentNodeId, refNodeId, nodeJson);
    }
  }
  var BuiltInComponents = {
    "#text": UniTextNode,
    "#comment": UniComment,
    VIEW: UniViewElement,
    BUTTON: UniButton
  };
  function pageScrollTo(_ref2, publish) {
    var {
      scrollTop,
      selector,
      duration
    } = _ref2;
    scrollTo(selector || scrollTop || 0, duration);
    publish();
  }
  function createElement(id2, tag, parentNodeId, refNodeId) {
    var nodeJson = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {};
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
    setElement(id2, element);
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
    isPageReady = true;
    pageReadyCallbacks.forEach((fn) => {
      try {
        fn();
      } catch (e) {
        console.error(e);
      }
    });
    pageReadyCallbacks.length = 0;
  }
  function onPageCreated() {
  }
  function onPageCreate(_ref) {
    var {
      css,
      route,
      platform,
      pixelRatio,
      windowWidth,
      disableScroll,
      // 因为组合式API的提供，不再在create时初始化，而是在监听后，主动通知
      // onPageScroll,
      // onPageReachBottom,
      // onReachBottomDistance,
      statusbarHeight,
      windowTop,
      windowBottom
    } = _ref;
    initPageInfo(route);
    initSystemInfo(platform, pixelRatio, windowWidth);
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
  function initSystemInfo(platform, pixelRatio, windowWidth) {
    window.__SYSTEM_INFO__ = {
      platform,
      pixelRatio,
      windowWidth
    };
  }
  function initPageElement() {
    createElement(0, "div", -1, -1).$ = document.getElementById("app");
  }
  function initPageCss(route) {
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
  function onVdSync(actions) {
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
          var parentNodeId = action[3];
          return createElement(
            action[1],
            getDict(action[2]),
            // 部分性能低的手机，createAction 与 insertAction 是分开的，导致根节点 parentNodeId 为 -1
            parentNodeId === -1 ? 0 : parentNodeId,
            action[4],
            decodeNodeJson(getDict, action[5])
          );
        case ACTION_TYPE_INSERT:
          return $(action[1]).insert(action[2], action[3], decodeNodeJson(getDict, action[4]));
        case ACTION_TYPE_REMOVE:
          return $(action[1]).remove();
        case ACTION_TYPE_SET_ATTRIBUTE:
          return $(action[1]).setAttr(getDict(action[2]), getDict(action[3]));
        case ACTION_TYPE_REMOVE_ATTRIBUTE:
          return $(action[1]).removeAttr(getDict(action[2]));
        case ACTION_TYPE_ADD_EVENT:
          return $(action[1]).addEvent(getDict(action[2]), action[3]);
        case ACTION_TYPE_ADD_WXS_EVENT:
          return $(action[1]).addWxsEvent(getDict(action[2]), getDict(action[3]), action[4]);
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
    subscribe(API_SET_LOCALE, (local) => useI18n().setLocale(local));
    subscribe(ON_WEBVIEW_READY, onWebviewReady$1);
  }
  function onWebviewReady$1() {
    UniViewJSBridge.publishHandler(ON_WEBVIEW_READY);
  }
  function findElem(vm) {
    {
      return window.__$__(vm).$;
    }
  }
  function getRootInfo(fields) {
    var info = {};
    if (fields.id) {
      info.id = "";
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
      var documentElement = document.documentElement;
      var body = document.body;
      info.scrollLeft = documentElement.scrollLeft || body.scrollLeft || 0;
      info.scrollTop = documentElement.scrollTop || body.scrollTop || 0;
      info.scrollHeight = documentElement.scrollHeight || body.scrollHeight || 0;
      info.scrollWidth = documentElement.scrollWidth || body.scrollWidth || 0;
    }
    return info;
  }
  function getNodeInfo(el, fields) {
    var info = {};
    var {
      top,
      topWindowHeight
    } = getWindowOffset();
    if (fields.node) {
      var tagName = el.tagName.split("-")[1];
      if (tagName) {
        info.node = el.querySelector(tagName);
      }
    }
    if (fields.id) {
      info.id = el.id;
    }
    if (fields.dataset) {
      info.dataset = getCustomDataset(el);
    }
    if (fields.rect || fields.size) {
      var rect = el.getBoundingClientRect();
      if (fields.rect) {
        info.left = rect.left;
        info.right = rect.right;
        info.top = rect.top - top - topWindowHeight;
        info.bottom = rect.bottom - top - topWindowHeight;
      }
      if (fields.size) {
        info.width = rect.width;
        info.height = rect.height;
      }
    }
    if (isArray(fields.properties)) {
      fields.properties.forEach((prop) => {
        prop = prop.replace(/-([a-z])/g, function(e, t) {
          return t.toUpperCase();
        });
      });
    }
    if (fields.scrollOffset) {
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
    if (isArray(fields.computedStyle)) {
      var sytle = getComputedStyle(el);
      fields.computedStyle.forEach((name) => {
        info[name] = sytle[name];
      });
    }
    if (fields.context) {
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
  function getNodesInfo(pageVm2, component, selector, single, fields) {
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
        return getNodeInfo(node, fields);
      }
      return null;
    } else {
      var infos = [];
      var nodeList = (maybeFragment ? parentElement : selfElement).querySelectorAll(selector);
      if (nodeList && nodeList.length) {
        [].forEach.call(nodeList, (node2) => {
          infos.push(getNodeInfo(node2, fields));
        });
      }
      if (!maybeFragment && matches(selfElement, selector)) {
        infos.unshift(getNodeInfo(selfElement, fields));
      }
      return infos;
    }
  }
  function requestComponentInfo(page, reqs, callback) {
    var result = [];
    reqs.forEach((_ref) => {
      var {
        component,
        selector,
        single,
        fields
      } = _ref;
      if (component === null) {
        result.push(getRootInfo(fields));
      } else {
        result.push(getNodesInfo(page, component, selector, single, fields));
      }
    });
    callback(result);
  }
  function setCurrentPageMeta(_page, _ref) {
    var {
      pageStyle,
      rootFontSize
    } = _ref;
    if (pageStyle) {
      var pageElm = document.querySelector("uni-page-body") || document.body;
      pageElm.setAttribute("style", pageStyle);
    }
    if (rootFontSize && document.documentElement.style.fontSize !== rootFontSize) {
      document.documentElement.style.fontSize = rootFontSize;
    }
  }
  function addIntersectionObserver(_ref, _pageId) {
    var {
      reqId,
      component,
      options,
      callback
    } = _ref;
    var $el = findElem(component);
    ($el.__io || ($el.__io = {}))[reqId] = requestComponentObserver($el, options, callback);
  }
  function removeIntersectionObserver(_ref2, _pageId) {
    var {
      reqId,
      component
    } = _ref2;
    var $el = findElem(component);
    var intersectionObserver = $el.__io && $el.__io[reqId];
    if (intersectionObserver) {
      intersectionObserver.disconnect();
      delete $el.__io[reqId];
    }
  }
  var mediaQueryObservers = {};
  var listeners = {};
  function handleMediaQueryStr($props) {
    var mediaQueryArr = [];
    var propsMenu = ["width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "orientation"];
    for (var item of propsMenu) {
      if (item !== "orientation" && $props[item] && Number($props[item] >= 0)) {
        mediaQueryArr.push("(".concat(humpToLine(item), ": ").concat(Number($props[item]), "px)"));
      }
      if (item === "orientation" && $props[item]) {
        mediaQueryArr.push("(".concat(humpToLine(item), ": ").concat($props[item], ")"));
      }
    }
    var mediaQueryStr = mediaQueryArr.join(" and ");
    return mediaQueryStr;
  }
  function humpToLine(name) {
    return name.replace(/([A-Z])/g, "-$1").toLowerCase();
  }
  function addMediaQueryObserver(_ref, _pageId) {
    var {
      reqId,
      component,
      options,
      callback
    } = _ref;
    var mediaQueryObserver = mediaQueryObservers[reqId] = window.matchMedia(handleMediaQueryStr(options));
    var listener = listeners[reqId] = (observer) => callback(observer.matches);
    listener(mediaQueryObserver);
    mediaQueryObserver.addListener(listener);
  }
  function removeMediaQueryObserver(_ref2, _pageId) {
    var {
      reqId,
      component
    } = _ref2;
    var listener = listeners[reqId];
    var mediaQueryObserver = mediaQueryObservers[reqId];
    if (mediaQueryObserver) {
      mediaQueryObserver.removeListener(listener);
      delete listeners[reqId];
      delete mediaQueryObservers[reqId];
    }
  }
  function loadFontFace(_ref, publish) {
    var {
      family,
      source,
      desc
    } = _ref;
    addFont(family, source, desc).then(() => {
      publish();
    }).catch((err2) => {
      publish(err2.toString());
    });
  }
  var pageVm = {
    $el: document.body
  };
  function initViewMethods() {
    var pageId = getCurrentPageId();
    subscribeViewMethod(pageId, (fn) => {
      return function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
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
    registerViewMethod(pageId, "addMediaQueryObserver", (args) => {
      addMediaQueryObserver(extend({}, args, {
        callback(res) {
          UniViewJSBridge.publishHandler(args.eventName, res);
        }
      }));
    });
    registerViewMethod(pageId, "removeMediaQueryObserver", (args) => {
      removeMediaQueryObserver(args);
    });
    registerViewMethod(pageId, API_PAGE_SCROLL_TO, pageScrollTo);
    registerViewMethod(pageId, API_LOAD_FONT_FACE, loadFontFace);
    registerViewMethod(pageId, API_SET_PAGE_META, (args) => {
      setCurrentPageMeta(null, args);
    });
  }
  const plus$1 = {
    webview: {
      currentWebview() {
        return extend({}, nativeChannel.invokeSync("currentWebview"));
      },
      postMessageToUniNView(data, id2) {
        nativeChannel.invokeSync("postMessageToUniNView", {
          data,
          id: id2
        });
      }
    }
  };
  window.plus = plus$1;
  window.uni = uni$1;
  window.UniViewJSBridge = UniViewJSBridge$1;
  window.rpx2px = upx2px;
  window.normalizeStyleName = normalizeStyleName$1;
  window.normalizeStyleValue = normalizeStyleValue$1;
  window.__$__ = $;
  window.__f__ = formatAppLog;
  function onWebviewReady() {
    initView();
    initViewMethods();
    initSubscribeHandlers();
    UniViewJSBridge$1.publishHandler(ON_WEBVIEW_READY);
  }
  if (typeof plus$1 !== "undefined") {
    onWebviewReady();
  } else {
    document.addEventListener("plusready", onWebviewReady);
  }
});
