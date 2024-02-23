import { normalizeStyles, addLeadingSlash, invokeArrayFns, LINEFEED, SCHEME_RE, DATA_RE, cacheStringFunction, parseQuery, ON_UNHANDLE_REJECTION, ON_PAGE_NOT_FOUND, ON_ERROR, ON_SHOW, ON_HIDE, removeLeadingSlash, getLen, EventChannel, once, ON_UNLOAD, ON_READY, parseUrl, ON_BACK_PRESS, ON_LAUNCH } from "@dcloudio/uni-shared";
import { extend, isString, isPlainObject, isFunction, isArray, isPromise, hasOwn, capitalize } from "@vue/shared";
import { createVNode, render, injectHook, getCurrentInstance, defineComponent, computed, onMounted, resolveComponent, isInSSRComponentSetup, ref, watchEffect, camelize, onUnmounted, reactive, watch, withDirectives, resolveDirective } from "vue";
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
(_shared.exports = function(key, value) {
  return store$1[key] || (store$1[key] = value !== void 0 ? value : {});
})("versions", []).push({
  version: core$1.version,
  mode: "global",
  copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
});
var _sharedExports = _shared.exports;
var id$1 = 0;
var px = Math.random();
var _uid = function(key) {
  return "Symbol(".concat(key === void 0 ? "" : key, ")_", (++id$1 + px).toString(36));
};
var store = _sharedExports("wks");
var uid$1 = _uid;
var Symbol$1 = _globalExports.Symbol;
var USE_SYMBOL = typeof Symbol$1 == "function";
var $exports = _wks.exports = function(name) {
  return store[name] || (store[name] = USE_SYMBOL && Symbol$1[name] || (USE_SYMBOL ? Symbol$1 : uid$1)("Symbol." + name));
};
$exports.store = store;
var _wksExports = _wks.exports;
var _objectDp = {};
var _isObject = function(it) {
  return typeof it === "object" ? it !== null : typeof it === "function";
};
var isObject$1 = _isObject;
var _anObject = function(it) {
  if (!isObject$1(it))
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
  var document = _globalExports.document;
  var is = isObject2(document) && isObject2(document.createElement);
  _domCreate = function(it) {
    return is ? document.createElement(it) : {};
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
var isObject = _isObject;
var _toPrimitive$1 = function(it, S) {
  if (!isObject(it))
    return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it)))
    return val;
  if (typeof (fn = it.valueOf) == "function" && !isObject(val = fn.call(it)))
    return val;
  if (!S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it)))
    return val;
  throw TypeError("Can't convert object to primitive value");
};
var anObject$2 = _anObject;
var IE8_DOM_DEFINE = _ie8DomDefine;
var toPrimitive = _toPrimitive$1;
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
var _hide = _descriptors ? function(object, key, value) {
  return dP$1.f(object, key, createDesc(1, value));
} : function(object, key, value) {
  object[key] = value;
  return object;
};
var UNSCOPABLES = _wksExports("unscopables");
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == void 0)
  _hide(ArrayProto, UNSCOPABLES, {});
var _addToUnscopables = function(key) {
  ArrayProto[UNSCOPABLES][key] = true;
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
var hasOwnProperty = {}.hasOwnProperty;
var _has = function(it, key) {
  return hasOwnProperty.call(it, key);
};
var _functionToString = _sharedExports("native-function-to-string", Function.toString);
var global$2 = _globalExports;
var hide$3 = _hide;
var has$3 = _has;
var SRC = _uid("src");
var $toString = _functionToString;
var TO_STRING = "toString";
var TPL = ("" + $toString).split(TO_STRING);
_coreExports.inspectSource = function(it) {
  return $toString.call(it);
};
(_redefine.exports = function(O, key, val, safe) {
  var isFunction2 = typeof val == "function";
  if (isFunction2)
    has$3(val, "name") || hide$3(val, "name", key);
  if (O[key] === val)
    return;
  if (isFunction2)
    has$3(val, SRC) || hide$3(val, SRC, O[key] ? "" + O[key] : TPL.join(String(key)));
  if (O === global$2) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide$3(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide$3(O, key, val);
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
var aFunction = _aFunction;
var _ctx = function(fn, that, length) {
  aFunction(fn);
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
      return function(a, b, c) {
        return fn.call(that, a, b, c);
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
var $export$2 = function(type, name, source) {
  var IS_FORCED = type & $export$2.F;
  var IS_GLOBAL = type & $export$2.G;
  var IS_STATIC = type & $export$2.S;
  var IS_PROTO = type & $export$2.P;
  var IS_BIND = type & $export$2.B;
  var target = IS_GLOBAL ? global$1 : IS_STATIC ? global$1[name] || (global$1[name] = {}) : (global$1[name] || {})[PROTOTYPE$1];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE$1] || (exports[PROTOTYPE$1] = {});
  var key, own, out, exp;
  if (IS_GLOBAL)
    source = name;
  for (key in source) {
    own = !IS_FORCED && target && target[key] !== void 0;
    out = (own ? target : source)[key];
    exp = IS_BIND && own ? ctx(out, global$1) : IS_PROTO && typeof out == "function" ? ctx(Function.call, out) : out;
    if (target)
      redefine$2(target, key, out, type & $export$2.U);
    if (exports[key] != out)
      hide$2(exports, key, exp);
    if (IS_PROTO && expProto[key] != out)
      expProto[key] = out;
  }
};
global$1.core = core;
$export$2.F = 1;
$export$2.G = 2;
$export$2.S = 4;
$export$2.P = 8;
$export$2.B = 16;
$export$2.W = 32;
$export$2.U = 64;
$export$2.R = 128;
var _export = $export$2;
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
var shared = _sharedExports("keys");
var uid = _uid;
var _sharedKey = function(key) {
  return shared[key] || (shared[key] = uid(key));
};
var has$2 = _has;
var toIObject$2 = _toIobject;
var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO$2 = _sharedKey("IE_PROTO");
var _objectKeysInternal = function(object, names) {
  var O = toIObject$2(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) {
    if (key != IE_PROTO$2)
      has$2(O, key) && result.push(key);
  }
  while (names.length > i) {
    if (has$2(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
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
  var keys2 = getKeys$2(Properties);
  var length = keys2.length;
  var i = 0;
  var P;
  while (length > i) {
    dP.f(O, P = keys2[i++], Properties[P]);
  }
  return O;
};
var _html;
var hasRequired_html;
function require_html() {
  if (hasRequired_html)
    return _html;
  hasRequired_html = 1;
  var document = _globalExports.document;
  _html = document && document.documentElement;
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
  var i = enumBugKeys.length;
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
  while (i--) {
    delete createDict[PROTOTYPE][enumBugKeys[i]];
  }
  return createDict();
};
var _objectCreate = Object.create || function create(O, Properties) {
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
var def = _objectDp.f;
var has$1 = _has;
var TAG = _wksExports("toStringTag");
var _setToStringTag = function(it, tag, stat) {
  if (it && !has$1(it = stat ? it : it.prototype, TAG))
    def(it, TAG, {
      configurable: true,
      value: tag
    });
};
var create2 = _objectCreate;
var descriptor = _propertyDesc;
var setToStringTag$1 = _setToStringTag;
var IteratorPrototype = {};
_hide(IteratorPrototype, _wksExports("iterator"), function() {
  return this;
});
var _iterCreate = function(Constructor, NAME, next) {
  Constructor.prototype = create2(IteratorPrototype, {
    next: descriptor(1, next)
  });
  setToStringTag$1(Constructor, NAME + " Iterator");
};
var defined = _defined;
var _toObject = function(it) {
  return Object(defined(it));
};
var has = _has;
var toObject = _toObject;
var IE_PROTO = _sharedKey("IE_PROTO");
var ObjectProto = Object.prototype;
var _objectGpo = Object.getPrototypeOf || function(O) {
  O = toObject(O);
  if (has(O, IE_PROTO))
    return O[IE_PROTO];
  if (typeof O.constructor == "function" && O instanceof O.constructor) {
    return O.constructor.prototype;
  }
  return O instanceof Object ? ObjectProto : null;
};
var $export$1 = _export;
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
var _iterDefine = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind) {
    if (!BUGGY && kind in proto)
      return proto[kind];
    switch (kind) {
      case KEYS:
        return function keys2() {
          return new Constructor(this, kind);
        };
      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }
    return function entries2() {
      return new Constructor(this, kind);
    };
  };
  var TAG2 = NAME + " Iterator";
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR$1] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries2 = DEFAULT ? !DEF_VALUES ? $default : getMethod("entries") : void 0;
  var $anyNative = NAME == "Array" ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype2;
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
  if (BUGGY || VALUES_BUG || !proto[ITERATOR$1]) {
    hide$1(proto, ITERATOR$1, $default);
  }
  Iterators$2[NAME] = $default;
  Iterators$2[TAG2] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries2
    };
    if (FORCED)
      for (key in methods) {
        if (!(key in proto))
          redefine$1(proto, key, methods[key]);
      }
    else
      $export$1($export$1.P + $export$1.F * (BUGGY || VALUES_BUG), NAME, methods);
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
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
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
function getCurrentPage() {
  var pages2 = getCurrentPages();
  var len = pages2.length;
  if (len) {
    return pages2[len - 1];
  }
}
function getCurrentPageMeta() {
  var page = getCurrentPage();
  if (page) {
    return page.$page.meta;
  }
}
function getCurrentPageVm() {
  var page = getCurrentPage();
  if (page) {
    return page.$vm;
  }
}
var PAGE_META_KEYS = ["navigationBar", "pullToRefresh"];
function initGlobalStyle() {
  return JSON.parse(JSON.stringify(__uniConfig.globalStyle || {}));
}
function initRouteMeta(pageMeta, id2) {
  var globalStyle = initGlobalStyle();
  var res = extend({
    id: id2
  }, globalStyle, pageMeta);
  PAGE_META_KEYS.forEach((name) => {
    res[name] = extend({}, globalStyle[name], pageMeta[name]);
  });
  var {
    navigationBar
  } = res;
  navigationBar.titleText && navigationBar.titleImage && (navigationBar.titleText = "");
  return res;
}
function initPageInternalInstance(openType, url, pageQuery, meta, eventChannel, themeMode) {
  var {
    id: id2,
    route
  } = meta;
  var titleColor = normalizeStyles(meta.navigationBar, __uniConfig.themeConfig, themeMode).titleColor;
  return {
    id: id2,
    path: addLeadingSlash(route),
    route,
    fullPath: url,
    options: pageQuery,
    meta,
    openType,
    eventChannel,
    statusBarStyle: titleColor === "#ffffff" ? "light" : "dark"
  };
}
function invokeHook(vm, name, args) {
  if (isString(vm)) {
    args = name;
    name = vm;
    vm = getCurrentPageVm();
  } else if (typeof vm === "number") {
    var page = getCurrentPages().find((page2) => page2.$page.id === vm);
    if (page) {
      vm = page.$vm;
    } else {
      vm = getCurrentPageVm();
    }
  }
  if (!vm) {
    return;
  }
  {
    if (vm.__call_hook) {
      return vm.__call_hook(name, args);
    }
  }
  var hooks = vm.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
function normalizeRoute(toRoute) {
  if (toRoute.indexOf("/") === 0) {
    return toRoute;
  }
  var fromRoute = "";
  var pages2 = getCurrentPages();
  if (pages2.length) {
    fromRoute = pages2[pages2.length - 1].$page.route;
  }
  return getRealRoute(fromRoute, toRoute);
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
  var i = 0;
  for (; i < toRouteLength && toRouteArray[i] === ".."; i++) {
  }
  toRouteArray.splice(0, i);
  toRoute = toRouteArray.join("/");
  var fromRouteArray = fromRoute.length > 0 ? fromRoute.split("/") : [];
  fromRouteArray.splice(fromRouteArray.length - i - 1, i + 1);
  return addLeadingSlash(fromRouteArray.concat(toRouteArray).join("/"));
}
function getRouteOptions(path) {
  var alias = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  if (alias) {
    return __uniRoutes.find((route) => route.path === path || route.alias === path);
  }
  return __uniRoutes.find((route) => route.path === path);
}
function getRouteMeta(path) {
  var routeOptions = getRouteOptions(path);
  if (routeOptions) {
    return routeOptions.meta;
  }
}
function initPageVm(pageVm, page) {
  pageVm.route = page.route;
  pageVm.$vm = pageVm;
  pageVm.$page = page;
  pageVm.$mpType = "page";
  if (page.meta.isTabBar) {
    pageVm.$.__isTabBar = true;
    pageVm.$.__isActive = true;
  }
}
function createLaunchOptions() {
  return {
    path: "",
    query: {},
    scene: 1001,
    referrerInfo: {
      appId: "",
      extraData: {}
    }
  };
}
function defineGlobalData(app, defaultGlobalData) {
  var options = app.$options || {};
  options.globalData = extend(options.globalData || {}, defaultGlobalData);
  Object.defineProperty(app, "globalData", {
    get() {
      return options.globalData;
    },
    set(newGlobalData) {
      options.globalData = newGlobalData;
    }
  });
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      console.error(e);
    }
  };
}
var invokeCallbackId = 1;
var invokeCallbacks = {};
function addInvokeCallback(id2, name, callback) {
  var keepAlive = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  invokeCallbacks[id2] = {
    name,
    keepAlive,
    callback
  };
  return id2;
}
function invokeCallback(id2, res, extras) {
  if (typeof id2 === "number") {
    var opts = invokeCallbacks[id2];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id2];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
var API_SUCCESS = "success";
var API_FAIL = "fail";
var API_COMPLETE = "complete";
function getApiCallbacks(args) {
  var apiCallbacks = {};
  for (var name in args) {
    var fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg$1(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name) {
  var args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var {
    beforeAll,
    beforeSuccess
  } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (!isPlainObject(args)) {
    args = {};
  }
  var {
    success,
    fail,
    complete
  } = getApiCallbacks(args);
  var hasSuccess = isFunction(success);
  var hasFail = isFunction(fail);
  var hasComplete = isFunction(complete);
  var callbackId2 = invokeCallbackId++;
  addInvokeCallback(callbackId2, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg$1(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId2;
}
var HOOK_SUCCESS = "success";
var HOOK_FAIL = "fail";
var HOOK_COMPLETE = "complete";
var globalInterceptors = {};
var scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data) {
    return hook(data, params) || data;
  };
}
function queue(hooks, data, params) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      var res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    var hooks = interceptors[name];
    if (!isArray(hooks)) {
      return;
    }
    var oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue(hooks, res, options).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method), options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify(name, fn) {
  return function() {
    var args = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
      invokeApi(name, fn, extend(args, {
        success: resolve,
        fail: reject
      }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  var params = args[0];
  if (!options || !isPlainObject(options.formatArgs) && isPlainObject(params)) {
    return;
  }
  var formatArgs = options.formatArgs;
  var keys2 = Object.keys(formatArgs);
  for (var i = 0; i < keys2.length; i++) {
    var name = keys2[i];
    var formatterOrDefaultValue = formatArgs[name];
    if (isFunction(formatterOrDefaultValue)) {
      var errMsg = formatterOrDefaultValue(args[0][name], params);
      if (isString(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function invokeSuccess(id2, name, res) {
  var result = {
    errMsg: name + ":ok"
  };
  return invokeCallback(id2, extend(res || {}, result));
}
function invokeFail(id2, name, errMsg) {
  var errRes = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
  var apiErrMsg = name + ":fail" + (errMsg ? " " + errMsg : "");
  delete errRes.errCode;
  return invokeCallback(id2, typeof UniError !== "undefined" ? typeof errRes.errCode !== "undefined" ? new UniError(name, errRes.errCode, apiErrMsg) : new UniError(apiErrMsg, errRes) : extend({
    errMsg: apiErrMsg
  }, errRes));
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
function normalizeErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    console.error(errMsg.message + LINEFEED + errMsg.stack);
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    var id2 = createAsyncApiCallback(name, args, options);
    var errMsg = beforeInvokeApi(name, [args], protocol, options);
    if (errMsg) {
      return invokeFail(id2, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id2, name, res),
      reject: (errMsg2, errRes) => invokeFail(id2, name, normalizeErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify(name, wrapperAsyncApi(name, fn, void 0, options));
}
function getRealPath$1(filepath) {
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
var vueApp;
function getVueApp() {
  return vueApp;
}
function initVueApp(appVm) {
  var internalInstance = appVm.$;
  Object.defineProperty(internalInstance.ctx, "$children", {
    get() {
      return getAllPages().map((page) => page.$vm);
    }
  });
  var appContext = internalInstance.appContext;
  vueApp = extend(appContext.app, {
    mountPage(pageComponent, pageProps, pageContainer) {
      var vnode = createVNode(pageComponent, pageProps);
      vnode.appContext = appContext;
      vnode.__page_container__ = pageContainer;
      render(vnode, pageContainer);
      var publicThis = vnode.component.proxy;
      publicThis.__page_container__ = pageContainer;
      return publicThis;
    },
    unmountPage: (pageInstance) => {
      var {
        __page_container__
      } = pageInstance;
      if (__page_container__) {
        __page_container__.isUnmounted = true;
        render(null, __page_container__);
      }
    }
  });
}
var pages = [];
function addCurrentPage(page) {
  var $page = page.$page;
  if (!$page.meta.isNVue) {
    return pages.push(page);
  }
  var index2 = pages.findIndex((p) => p.$page.id === page.$page.id);
  if (index2 > -1) {
    pages.splice(index2, 1, page);
  } else {
    pages.push(page);
  }
}
function getAllPages() {
  return pages;
}
function getCurrentPages$1() {
  var curPages = [];
  pages.forEach((page) => {
    if (page.$.__isTabBar) {
      if (page.$.__isActive) {
        curPages.push(page);
      }
    } else {
      curPages.push(page);
    }
  });
  return curPages;
}
function removePage(curPage) {
  var index2 = pages.findIndex((page) => page === curPage);
  if (index2 === -1) {
    return;
  }
  if (!curPage.$page.meta.isNVue) {
    getVueApp().unmountPage(curPage);
  }
  pages.splice(index2, 1);
}
function backbuttonListener() {
  uni.navigateBack({
    from: "backbutton",
    success() {
    }
    // 传入空方法，避免返回Promise，因为onBackPress可能导致fail
  });
}
var enterOptions = /* @__PURE__ */ createLaunchOptions();
var launchOptions = /* @__PURE__ */ createLaunchOptions();
function initLaunchOptions(_ref2) {
  var {
    path,
    query,
    referrerInfo
  } = _ref2;
  extend(launchOptions, {
    path,
    query: query ? parseQuery(query) : {},
    referrerInfo: referrerInfo || {},
    // TODO uni-app x
    channel: void 0,
    launcher: void 0
  });
  extend(enterOptions, launchOptions);
  return extend({}, launchOptions);
}
var _objectPie = {};
_objectPie.f = {}.propertyIsEnumerable;
var DESCRIPTORS = _descriptors;
var getKeys = _objectKeys;
var toIObject = _toIobject;
var isEnum = _objectPie.f;
var _objectToArray = function(isEntries) {
  return function(it) {
    var O = toIObject(it);
    var keys2 = getKeys(O);
    var length = keys2.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys2[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};
var appHooks = {
  [ON_UNHANDLE_REJECTION]: [],
  [ON_PAGE_NOT_FOUND]: [],
  [ON_ERROR]: [],
  [ON_SHOW]: [],
  [ON_HIDE]: []
};
function injectAppHooks(appInstance) {
  Object.keys(appHooks).forEach((type) => {
    appHooks[type].forEach((hook) => {
      injectHook(type, hook, appInstance);
    });
  });
}
function encodeQueryString(url) {
  if (!isString(url)) {
    return url;
  }
  var index2 = url.indexOf("?");
  if (index2 === -1) {
    return url;
  }
  var query = url.slice(index2 + 1).trim().replace(/^(\?|#|&)/, "");
  if (!query) {
    return url;
  }
  url = url.slice(0, index2);
  var params = [];
  query.split("&").forEach((param) => {
    var parts = param.replace(/\+/g, " ").split("=");
    var key = parts.shift();
    var val = parts.length > 0 ? parts.join("=") : "";
    params.push(key + "=" + encodeURIComponent(val));
  });
  return params.length ? url + "?" + params.join("&") : url;
}
var ANIMATION_IN = ["slide-in-right", "slide-in-left", "slide-in-top", "slide-in-bottom", "fade-in", "zoom-out", "zoom-fade-out", "pop-in", "none"];
var ANIMATION_OUT = ["slide-out-right", "slide-out-left", "slide-out-top", "slide-out-bottom", "fade-out", "zoom-in", "zoom-fade-in", "pop-out", "none"];
var BaseRouteProtocol = {
  url: {
    type: String,
    required: true
  }
};
var API_NAVIGATE_TO = "navigateTo";
var API_REDIRECT_TO = "redirectTo";
var API_SWITCH_TAB = "switchTab";
var API_NAVIGATE_BACK = "navigateBack";
var API_PRELOAD_PAGE = "preloadPage";
var API_UN_PRELOAD_PAGE = "unPreloadPage";
var NavigateToProtocol = /* @__PURE__ */ extend({}, BaseRouteProtocol, createAnimationProtocol(ANIMATION_IN));
var NavigateBackProtocol = /* @__PURE__ */ extend({
  delta: {
    type: Number
  }
}, createAnimationProtocol(ANIMATION_OUT));
var RedirectToProtocol = BaseRouteProtocol;
var SwitchTabProtocol = BaseRouteProtocol;
var NavigateToOptions = /* @__PURE__ */ createRouteOptions(API_NAVIGATE_TO);
var RedirectToOptions = /* @__PURE__ */ createRouteOptions(API_REDIRECT_TO);
var SwitchTabOptions = /* @__PURE__ */ createRouteOptions(API_SWITCH_TAB);
var NavigateBackOptions = {
  formatArgs: {
    delta(value, params) {
      value = parseInt(value + "") || 1;
      params.delta = Math.min(getCurrentPages().length - 1, value);
    }
  }
};
function createAnimationProtocol(animationTypes) {
  return {
    animationType: {
      type: String,
      validator(type) {
        if (type && animationTypes.indexOf(type) === -1) {
          return "`" + type + "` is not supported for `animationType` (supported values are: `" + animationTypes.join("`|`") + "`)";
        }
      }
    },
    animationDuration: {
      type: Number
    }
  };
}
var navigatorLock;
function beforeRoute() {
  navigatorLock = "";
}
function createRouteOptions(type) {
  return {
    formatArgs: {
      url: createNormalizeUrl(type)
    },
    beforeAll: beforeRoute
  };
}
function createNormalizeUrl(type) {
  return function normalizeUrl(url, params) {
    if (!url) {
      return 'Missing required args: "url"';
    }
    url = normalizeRoute(url);
    var pagePath = url.split("?")[0];
    var routeOptions = getRouteOptions(pagePath, true);
    if (!routeOptions) {
      return "page `" + url + "` is not found";
    }
    if (type === API_NAVIGATE_TO || type === API_REDIRECT_TO) {
      if (routeOptions.meta.isTabBar) {
        return "can not ".concat(type, " a tabbar page");
      }
    } else if (type === API_SWITCH_TAB) {
      if (!routeOptions.meta.isTabBar) {
        return "can not switch to no-tabBar page";
      }
    }
    if ((type === API_SWITCH_TAB || type === API_PRELOAD_PAGE) && routeOptions.meta.isTabBar && params.openType !== "appLaunch") {
      url = pagePath;
    }
    if (routeOptions.meta.isEntry) {
      url = url.replace(routeOptions.alias, "/");
    }
    params.url = encodeQueryString(url);
    if (type === API_UN_PRELOAD_PAGE) {
      return;
    } else if (type === API_PRELOAD_PAGE) {
      {
        if (!routeOptions.meta.isNVue) {
          return "can not preload vue page";
        }
      }
      if (routeOptions.meta.isTabBar) {
        var pages2 = getCurrentPages();
        var tabBarPagePath = routeOptions.path.slice(1);
        if (pages2.find((page) => page.route === tabBarPagePath)) {
          return "tabBar page `" + tabBarPagePath + "` already exists";
        }
      }
      return;
    }
    if (navigatorLock === url && params.openType !== "appLaunch") {
      return "".concat(navigatorLock, " locked");
    }
    if (__uniConfig.ready) {
      navigatorLock = url;
    }
  };
}
var IndexProtocol = {
  index: {
    type: Number,
    required: true
  }
};
var IndexOptions = {
  beforeInvoke() {
    var pageMeta = getCurrentPageMeta();
    if (pageMeta && !pageMeta.isTabBar) {
      return "not TabBar page";
    }
  },
  formatArgs: {
    index(value) {
      if (!__uniConfig.tabBar.list[value]) {
        return "tabbar item not found";
      }
    }
  }
};
var API_SET_TAB_BAR_ITEM = "setTabBarItem";
var SetTabBarItemProtocol = /* @__PURE__ */ extend({
  text: String,
  iconPath: String,
  selectedIconPath: String,
  pagePath: String
}, IndexProtocol);
var SetTabBarItemOptions = {
  beforeInvoke: IndexOptions.beforeInvoke,
  formatArgs: /* @__PURE__ */ extend({
    pagePath(value, params) {
      if (value) {
        params.pagePath = removeLeadingSlash(value);
      }
    }
  }, IndexOptions.formatArgs)
};
var API_SET_TAB_BAR_STYLE = "setTabBarStyle";
var SetTabBarStyleProtocol = {
  color: String,
  selectedColor: String,
  backgroundColor: String,
  backgroundImage: String,
  backgroundRepeat: String,
  borderStyle: String
};
var GRADIENT_RE = /^(linear|radial)-gradient\(.+?\);?$/;
var SetTabBarStyleOptions = {
  beforeInvoke: IndexOptions.beforeInvoke,
  formatArgs: {
    backgroundImage(value, params) {
      if (value && !GRADIENT_RE.test(value)) {
        params.backgroundImage = getRealPath$1(value);
      }
    },
    borderStyle(value, params) {
      if (value) {
        params.borderStyle = value === "white" ? "white" : "black";
      }
    }
  }
};
var API_HIDE_TAB_BAR = "hideTabBar";
var API_SHOW_TAB_BAR = "showTabBar";
var API_HIDE_TAB_BAR_RED_DOT = "hideTabBarRedDot";
var HideTabBarRedDotProtocol = IndexProtocol;
var HideTabBarRedDotOptions = IndexOptions;
var API_SHOW_TAB_BAR_RED_DOT = "showTabBarRedDot";
var ShowTabBarRedDotProtocol = IndexProtocol;
var ShowTabBarRedDotOptions = IndexOptions;
var API_REMOVE_TAB_BAR_BADGE = "removeTabBarBadge";
var RemoveTabBarBadgeProtocol = IndexProtocol;
var RemoveTabBarBadgeOptions = IndexOptions;
var API_SET_TAB_BAR_BADGE = "setTabBarBadge";
var SetTabBarBadgeProtocol = /* @__PURE__ */ extend({
  text: {
    type: String,
    required: true
  }
}, IndexProtocol);
var SetTabBarBadgeOptions = {
  beforeInvoke: IndexOptions.beforeInvoke,
  formatArgs: /* @__PURE__ */ extend({
    text(value, params) {
      if (getLen(value) >= 4) {
        params.text = "...";
      }
    }
  }, IndexOptions.formatArgs)
};
var ANI_SHOW = "pop-in";
var ANI_DURATION = 300;
var ANI_CLOSE = "pop-out";
function showWebview(nPage, animationType, animationDuration, showCallback, delay) {
  nPage.startRender();
  nPage.show(/* @__PURE__ */ new Map([["animationType", animationType], ["animationDuration", animationDuration]]), showCallback);
}
function closeWebview(nPage, animationType, animationDuration, callback) {
  var options = /* @__PURE__ */ new Map([["animationType", animationType]]);
  if (typeof animationDuration === "number") {
    options.set("animationDuration", animationDuration);
  }
  nPage.close(options, callback);
}
var id = 1;
function getWebviewId() {
  return id;
}
function genWebviewId() {
  return id++;
}
function initRouteOptions(path, openType) {
  var routeOptions = JSON.parse(JSON.stringify(getRouteOptions(path)));
  routeOptions.meta = initRouteMeta(routeOptions.meta);
  if (openType !== "preloadPage" && !__uniConfig.realEntryPagePath && (openType === "reLaunch" || getCurrentPages().length === 0)) {
    routeOptions.meta.isQuit = true;
  } else if (!routeOptions.meta.isTabBar) {
    routeOptions.meta.isQuit = false;
  }
  return routeOptions;
}
var nativeApp;
function getNativeApp() {
  return nativeApp;
}
function setNativeApp(app) {
  nativeApp = app;
}
function getPageManager() {
  return nativeApp.pageManager;
}
function setupPage(component) {
  var oldSetup = component.setup;
  component.inheritAttrs = false;
  component.setup = (_, ctx2) => {
    var {
      attrs: {
        __pageId,
        __pagePath,
        __pageQuery,
        __pageInstance
      }
    } = ctx2;
    var instance = getCurrentInstance();
    var pageVm = instance.proxy;
    initPageVm(pageVm, __pageInstance);
    addCurrentPage(initScope(__pageId, pageVm, __pageInstance));
    if (oldSetup) {
      return oldSetup(__pageQuery, ctx2);
    }
  };
  return component;
}
function initScope(pageId, vm, pageInstance) {
  {
    vm.$getAppPage = function() {
      return getNativeApp().pageManager.findPageById(pageId + "");
    };
  }
  vm.getOpenerEventChannel = () => {
    if (!pageInstance.eventChannel) {
      pageInstance.eventChannel = new EventChannel(pageId);
    }
    return pageInstance.eventChannel;
  };
  return vm;
}
function isVuePageAsyncComponent(component) {
  return isFunction(component);
}
var pagesMap = /* @__PURE__ */ new Map();
function definePage(pagePath, asyncComponent) {
  pagesMap.set(pagePath, once(createFactory(asyncComponent)));
}
function createFactory(component) {
  return () => {
    if (isVuePageAsyncComponent(component)) {
      return component().then((component2) => setupPage(component2));
    }
    return setupPage(component);
  };
}
var ON_POP_GESTURE = "onPopGesture";
function parsePageStyle(route) {
  var style = /* @__PURE__ */ new Map();
  var routeMeta = route.meta;
  var routeKeys = ["id", "route", "i18n", "isQuit", "isEntry", "isTabBar", "tabBarIndex", "tabBarText", "windowTop", "topWindow", "leftWindow", "rightWindow", "eventChannel"];
  var navKeys = ["navigationBarTitleText", "navigationBarBackgroundColor", "navigationBarTextStyle", "navigationStyle"];
  Object.keys(routeMeta).forEach((key) => {
    if (!routeKeys.includes(key) && !navKeys.includes(key)) {
      style.set(key, routeMeta[key]);
    }
  });
  var navigationBar = {};
  navKeys.forEach((key) => {
    if (key in routeMeta) {
      navigationBar[key] = routeMeta[key];
    }
  });
  if (Object.keys(navigationBar).length) {
    style.set("navigationBar", navigationBar);
    if (navigationBar.navigationBarTextStyle !== "custom" && !routeMeta.isQuit) {
      navigationBar["navigationBarAutoBackButton"] = true;
    }
  }
  return style;
}
function registerPage(_ref) {
  var {
    url,
    path,
    query,
    openType,
    webview,
    nvuePageVm,
    eventChannel
  } = _ref;
  var id2 = genWebviewId();
  var routeOptions = initRouteOptions(path, openType);
  var pageStyle = parsePageStyle(routeOptions);
  var nativePage = getPageManager().createPage(url, id2.toString(), pageStyle);
  routeOptions.meta.id = parseInt(nativePage.pageId);
  var route = path.slice(1);
  var pageInstance = initPageInternalInstance(
    openType,
    url,
    query,
    routeOptions.meta,
    eventChannel,
    // TODO ThemeMode
    "light"
  );
  var page = createVuePage(id2, route, query, pageInstance, {}, nativePage);
  nativePage.addPageEventListener(ON_POP_GESTURE, function(e) {
    uni.navigateBack({
      from: "popGesture",
      fail(e2) {
        if (e2.errMsg.endsWith("cancel")) {
          nativePage.show();
        }
      }
    });
  });
  nativePage.addPageEventListener(ON_UNLOAD, (_) => {
    invokeHook(page, ON_UNLOAD);
  });
  nativePage.addPageEventListener(ON_READY, (_) => {
    invokeHook(page, ON_READY);
  });
  return nativePage;
}
function createVuePage(__pageId, __pagePath, __pageQuery, __pageInstance, pageOptions, nativePage) {
  var pageNode = nativePage.document.body;
  var app = getVueApp();
  var component = pagesMap.get(__pagePath)();
  var mountPage = (component2) => app.mountPage(
    component2,
    {
      __pageId,
      __pagePath,
      __pageQuery,
      __pageInstance
    },
    // @ts-ignore
    pageNode
  );
  if (isPromise(component)) {
    return component.then((component2) => mountPage(component2));
  }
  return mountPage(component);
}
var $navigateTo = (args, _ref) => {
  var {
    resolve,
    reject
  } = _ref;
  var {
    url,
    events,
    animationType,
    animationDuration
  } = args;
  var {
    path,
    query
  } = parseUrl(url);
  var [aniType, aniDuration] = initAnimation(path, animationType, animationDuration);
  _navigateTo({
    url,
    path,
    query,
    events,
    aniType,
    aniDuration
  }).then(resolve).catch(reject);
};
var navigateTo = /* @__PURE__ */ defineAsyncApi(API_NAVIGATE_TO, $navigateTo, NavigateToProtocol, NavigateToOptions);
function _navigateTo(_ref2) {
  var {
    url,
    path,
    query,
    events,
    aniType,
    aniDuration
  } = _ref2;
  invokeHook(ON_HIDE);
  var eventChannel = new EventChannel(getWebviewId() + 1, events);
  return new Promise((resolve) => {
    showWebview(registerPage({
      url,
      path,
      query,
      openType: "navigateTo",
      eventChannel
    }), aniType, aniDuration, () => {
      resolve({
        eventChannel
      });
    });
  });
}
function initAnimation(path, animationType, animationDuration) {
  if (!getCurrentPage()) {
    return ["none", 0];
  }
  var {
    globalStyle
  } = __uniConfig;
  var meta = getRouteMeta(path);
  return [animationType || meta.animationType || globalStyle.animationType || ANI_SHOW, animationDuration || meta.animationDuration || globalStyle.animationDuration || ANI_DURATION];
}
var navigateBack = /* @__PURE__ */ defineAsyncApi(API_NAVIGATE_BACK, (args, _ref) => {
  var {
    resolve,
    reject
  } = _ref;
  var page = getCurrentPage();
  if (!page) {
    return reject("getCurrentPages is empty");
  }
  if (invokeHook(page, ON_BACK_PRESS, {
    from: args.from || "navigateBack"
  })) {
    return reject("cancel");
  }
  try {
    uni.hideToast();
    uni.hideLoading();
  } catch (error) {
    console.warn(error);
  }
  if (page.$page.meta.isQuit)
    ;
  else {
    var {
      delta,
      animationType,
      animationDuration
    } = args;
    back(delta, animationType, animationDuration);
  }
  return resolve();
}, NavigateBackProtocol, NavigateBackOptions);
function back(delta, animationType, animationDuration) {
  var pages2 = getCurrentPages();
  var len = pages2.length;
  var currentPage = pages2[len - 1];
  if (delta > 1) {
    pages2.slice(len - delta, len - 1).reverse().forEach((deltaPage) => {
      closeWebview(getNativeApp().pageManager.findPageById(deltaPage.$page.id + ""), "none", 0);
    });
  }
  var backPage = function(webview2) {
    if (animationType) {
      animationDuration = animationDuration || ANI_DURATION;
    } else {
      if (currentPage.$page.openType === "redirectTo") {
        animationType = ANI_CLOSE;
        animationDuration = ANI_DURATION;
      } else {
        animationType = "auto";
      }
    }
    closeWebview(webview2, animationType, animationDuration, () => {
      pages2.slice(len - delta, len).forEach((page) => removePage(page));
      invokeHook(ON_SHOW);
    });
  };
  var webview = getNativeApp().pageManager.findPageById(currentPage.$page.id + "");
  backPage(webview);
}
var redirectTo = /* @__PURE__ */ defineAsyncApi(API_REDIRECT_TO, (_ref, _ref2) => {
  var {
    url
  } = _ref;
  var {
    resolve,
    reject
  } = _ref2;
  var {
    path,
    query
  } = parseUrl(url);
  _redirectTo({
    url,
    path,
    query
  }).then(resolve).catch(reject);
}, RedirectToProtocol, RedirectToOptions);
function _redirectTo(_ref3) {
  var {
    url,
    path,
    query
  } = _ref3;
  var lastPage = getCurrentPage();
  lastPage && removePage(lastPage);
  return new Promise((resolve) => {
    showWebview(registerPage({
      url,
      path,
      query,
      openType: "redirectTo"
    }), "none", 0, () => {
      if (lastPage) {
        var nPage = getNativeApp().pageManager.findPageById(lastPage.$page.id + "");
        nPage.close(/* @__PURE__ */ new Map([["animationType", "none"]]));
      }
      resolve(void 0);
    });
  });
}
function hasLeadingSlash(str) {
  return str.indexOf("/") == 0;
}
function getRealPath(path) {
  var fix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  if (hasLeadingSlash(path)) {
    return path;
  }
  if (fix && path.indexOf(".") !== 0) {
    return "/" + path;
  }
  var currentPage = getCurrentPage();
  var currentPath = !currentPage ? "/" : parseUrl(currentPage.route).path;
  var currentPathArray = currentPath.split("/");
  var pathArray = path.split("/");
  var resultArray = [];
  for (var index2 = 0; index2 < pathArray.length; index2++) {
    var element = pathArray[index2];
    if (element == "..") {
      currentPathArray.pop();
    } else if (element != ".") {
      resultArray.push(element);
    }
  }
  return addLeadingSlash(currentPathArray.concat(resultArray).join("/"));
}
var tabBar0 = null;
var selected0 = -1;
var tabs = /* @__PURE__ */ new Map();
var BORDER_COLORS = /* @__PURE__ */ new Map([["white", "rgba(255, 255, 255, 0.33)"], ["black", "rgba(0, 0, 0, 0.33)"]]);
function getBorderStyle(borderStyle) {
  var value = BORDER_COLORS.get(borderStyle);
  return value !== null && value !== void 0 ? value : borderStyle;
}
function fixBorderStyle(tabBarConfig) {
  var borderStyle = tabBarConfig.get("borderStyle");
  if (!isString(borderStyle)) {
    borderStyle = "black";
  }
  tabBarConfig.set("borderStyle", getBorderStyle(borderStyle));
}
function getTabList() {
  var tabConfig = __uniConfig.tabBar ? /* @__PURE__ */ new Map() : null;
  if (__uniConfig.tabBar) {
    for (var key in __uniConfig.tabBar) {
      tabConfig.set(key, __uniConfig.tabBar[key]);
    }
  }
  if (tabConfig === null) {
    return null;
  }
  var list = tabConfig.get("list");
  return list;
}
function init() {
  var list = getTabList();
  var style = /* @__PURE__ */ new Map();
  style.set("navigationStyle", "custom");
  var page = getPageManager().createPage("tabBar", "tabBar", style);
  var document = page.createDocument(new NodeData("root", "view", /* @__PURE__ */ new Map(), /* @__PURE__ */ new Map([["flex", "1"]])));
  var tabParent = document.createElement(new NodeData("tabs", "tabs", /* @__PURE__ */ new Map(), /* @__PURE__ */ new Map([["overflow", "hidden"], ["flex", "1"]])));
  document.appendChild(tabParent);
  tabBar0 = document.getRealDomNodeById("tabs");
  var tabBarConfig = /* @__PURE__ */ new Map();
  for (var key in __uniConfig.tabBar) {
    tabBarConfig.set(key, __uniConfig.tabBar[key]);
  }
  fixBorderStyle(tabBarConfig);
  tabBar0.initTabBar(tabBarConfig);
  tabBar0.addEventListener("tabBarItemTap", function(event) {
    var index2 = event.index;
    if (index2 !== selected0) {
      var item = list[index2];
      var path = item.pagePath;
      if (isString(path)) {
        switchSelect(index2, path);
      }
    }
  });
  page.startRender();
  page.show(null);
}
function getTabBar() {
  return tabBar0;
}
function getTabIndex(path) {
  var list = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getTabList();
  var selected = -1;
  if (list && list.length !== 0) {
    for (var index2 = 0; index2 < list.length; index2++) {
      var page = list[index2];
      var pagePath = page.pagePath;
      if (isString(pagePath) && getRealPath(pagePath, true) == getRealPath(path, true)) {
        selected = index2;
        break;
      }
    }
  }
  return selected;
}
var currentPageRoute = null;
function findPageRoute(path) {
  return __uniRoutes.find((route) => route.path === path);
}
function createTab(path, query) {
  currentPageRoute = findPageRoute(path);
  showWebview(registerPage({
    url: path,
    path,
    query,
    openType: "switchTab"
  }), "none", 0);
  var page = getCurrentPage();
  currentPageRoute = null;
  tabBar0.appendItem(page.$page.id.toString());
  return page;
}
function findTabPage(path) {
  var _tabs$get;
  var page = (_tabs$get = tabs.get(path)) !== null && _tabs$get !== void 0 ? _tabs$get : null;
  if (page !== null) {
    var pages2 = getAllPages();
    var index2 = pages2.indexOf(page);
    if (index2 !== pages2.length - 1) {
      pages2.splice(index2, 1);
      pages2.push(page);
    }
  }
  return page;
}
function isTabPage(page) {
  if (page.$route === currentPageRoute) {
    return true;
  }
  var has2 = false;
  tabs.forEach((value, key) => {
    if (value === page) {
      has2 = true;
    }
  });
  return has2;
}
class TabPageInfo {
  constructor(page, isFirst) {
    this.page = page;
    this.isFirst = isFirst;
  }
}
function getTabPage(path) {
  var query = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var page = findTabPage(path);
  var isFirst = false;
  if (page === null) {
    isFirst = true;
    page = createTab(path, query);
    tabs.set(path, page);
  }
  return new TabPageInfo(page, isFirst);
}
function switchSelect(selected, path) {
  var query = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var shouldShow = false;
  if (tabBar0 === null) {
    init();
  }
  var currentPage = getCurrentPage();
  var pageInfo = getTabPage(getRealPath(path, true), query);
  var page = pageInfo.page;
  if (currentPage !== page) {
    shouldShow = true;
    if (currentPage && isTabPage(currentPage)) {
      invokeHook(currentPage, ON_HIDE);
    }
  }
  tabBar0.switchSelect(page.$page.id.toString(), selected);
  if (shouldShow) {
    invokeHook(page, ON_SHOW);
  }
  selected0 = selected;
}
var $switchTab = (args, _ref) => {
  var {
    resolve,
    reject
  } = _ref;
  var {
    url
  } = args;
  var {
    path,
    query
  } = parseUrl(url);
  _switchTab({
    url,
    path,
    query
  }).then(resolve).catch(reject);
};
var switchTab = /* @__PURE__ */ defineAsyncApi(API_SWITCH_TAB, $switchTab, SwitchTabProtocol, SwitchTabOptions);
function _switchTab(_ref2) {
  var {
    url,
    path,
    query
  } = _ref2;
  var selected = getTabIndex(path);
  if (selected == -1) {
    return Promise.reject("tab ".concat(path, " not found"));
  }
  var pages2 = getCurrentPages();
  setTimeout(() => {
    switchSelect(selected, path, query);
  }, 0);
  for (var index2 = pages2.length - 1; index2 >= 0; index2--) {
    var page = pages2[index2];
    if (isTabPage(page)) {
      break;
    }
    var nPage = getNativeApp().pageManager.findPageById(page.$page.id + "");
    nPage.close(/* @__PURE__ */ new Map([["animationType", "none"]]));
  }
  return Promise.resolve();
}
var setTabBarBadge = /* @__PURE__ */ defineAsyncApi(API_SET_TAB_BAR_BADGE, (_ref, _ref2) => {
  var {
    index: index2,
    text
  } = _ref;
  var {
    resolve,
    reject
  } = _ref2;
  var tabBar = getTabBar();
  if (tabBar === null) {
    reject("tabBar is not exist");
    return;
  }
  tabBar.setTabBarBadge(/* @__PURE__ */ new Map([["index", index2], ["text", text]]));
  resolve();
}, SetTabBarBadgeProtocol, SetTabBarBadgeOptions);
var removeTabBarBadge = /* @__PURE__ */ defineAsyncApi(API_REMOVE_TAB_BAR_BADGE, (_ref, _ref2) => {
  var {
    index: index2
  } = _ref;
  var {
    resolve,
    reject
  } = _ref2;
  var tabBar = getTabBar();
  if (tabBar === null) {
    reject("tabBar is not exist");
    return;
  }
  tabBar.removeTabBarBadge(/* @__PURE__ */ new Map([["index", index2]]));
  resolve();
}, RemoveTabBarBadgeProtocol, RemoveTabBarBadgeOptions);
var setTabBarItem = /* @__PURE__ */ defineAsyncApi(API_SET_TAB_BAR_ITEM, (_ref, _ref2) => {
  var {
    index: index2,
    text,
    iconPath,
    selectedIconPath,
    pagePath,
    visible,
    iconfont
  } = _ref;
  var {
    resolve,
    reject
  } = _ref2;
  var tabBar = getTabBar();
  if (tabBar === null) {
    reject("tabBar is not exist");
    return;
  }
  var item = /* @__PURE__ */ new Map([["index", index2], ["text", text], ["iconPath", iconPath], ["selectedIconPath", selectedIconPath], ["pagePath", pagePath], ["visible", visible]]);
  if (!!iconfont) {
    var iconfontOptions = iconfont;
    var _iconfont = /* @__PURE__ */ new Map([["text", iconfontOptions.text], ["selectedText", iconfontOptions.selectedText], ["fontSize", iconfontOptions.fontSize], ["color", iconfontOptions.color], ["selectedColor", iconfontOptions.selectedColor]]);
    item.set("iconfont", _iconfont);
  }
  tabBar.setTabBarItem(item);
  resolve();
}, SetTabBarItemProtocol, SetTabBarItemOptions);
var setTabBarStyle = /* @__PURE__ */ defineAsyncApi(API_SET_TAB_BAR_STYLE, (options, _ref) => {
  var {
    resolve,
    reject
  } = _ref;
  var tabBar = getTabBar();
  if (tabBar === null) {
    reject("tabBar is not exist");
    return;
  }
  var style = /* @__PURE__ */ new Map([["color", options.color], ["selectedColor", options.selectedColor], ["backgroundColor", options.backgroundColor], ["backgroundImage", options.backgroundImage], ["backgroundRepeat", options.backgroundRepeat]]);
  if (isString(options.borderStyle)) {
    style.set("borderStyle", getBorderStyle(options.borderStyle));
  }
  if (!!options.midButton) {
    var midButtonOptions = options.midButton;
    var midButton = /* @__PURE__ */ new Map([["width", midButtonOptions.width], ["height", midButtonOptions.height], ["iconPath", midButtonOptions.iconPath], ["text", midButtonOptions.text], ["iconPath", midButtonOptions.iconPath], ["iconWidth", midButtonOptions.iconWidth], ["backgroundImage", midButtonOptions.backgroundImage]]);
    if (!!midButtonOptions.iconfont) {
      var iconfontOptions = midButtonOptions.iconfont;
      var iconfont = /* @__PURE__ */ new Map([["text", iconfontOptions.text], ["selectedText", iconfontOptions.selectedText], ["fontSize", iconfontOptions.fontSize], ["color", iconfontOptions.color], ["selectedColor", iconfontOptions.selectedColor]]);
      midButton.set("iconfont", iconfont);
    }
    style.set("midButton", midButton);
  }
  tabBar.setTabBarStyle(style);
  resolve();
}, SetTabBarStyleProtocol, SetTabBarStyleOptions);
var hideTabBar = /* @__PURE__ */ defineAsyncApi(API_HIDE_TAB_BAR, (options, _ref) => {
  var {
    resolve,
    reject
  } = _ref;
  var tabBar = getTabBar();
  if (tabBar === null) {
    reject("tabBar is not exist");
    return;
  }
  tabBar.hideTabBar(/* @__PURE__ */ new Map([["animation", options === null || options === void 0 ? void 0 : options.animation]]));
  resolve();
});
var showTabBar = /* @__PURE__ */ defineAsyncApi(API_SHOW_TAB_BAR, (args, _ref) => {
  var {
    resolve,
    reject
  } = _ref;
  var tabBar = getTabBar();
  var animation2 = args && args.animation;
  if (tabBar === null) {
    reject("tabBar is not exist");
    return;
  }
  tabBar.showTabBar(/* @__PURE__ */ new Map([["animation", animation2]]));
  resolve();
});
var showTabBarRedDot = /* @__PURE__ */ defineAsyncApi(API_SHOW_TAB_BAR_RED_DOT, (_ref, _ref2) => {
  var {
    index: index2
  } = _ref;
  var {
    resolve,
    reject
  } = _ref2;
  var tabBar = getTabBar();
  if (tabBar === null) {
    reject("tabBar is not exist");
    return;
  }
  tabBar.showTabBarRedDot(/* @__PURE__ */ new Map([["index", index2]]));
  resolve();
}, ShowTabBarRedDotProtocol, ShowTabBarRedDotOptions);
var hideTabBarRedDot = /* @__PURE__ */ defineAsyncApi(API_HIDE_TAB_BAR_RED_DOT, (_ref, _ref2) => {
  var {
    index: index2
  } = _ref;
  var {
    resolve,
    reject
  } = _ref2;
  var tabBar = getTabBar();
  if (tabBar === null) {
    reject("tabBar is not exist");
    return;
  }
  tabBar.hideTabBarRedDot(/* @__PURE__ */ new Map([["index", index2]]));
  resolve();
}, HideTabBarRedDotProtocol, HideTabBarRedDotOptions);
var callbackId = 1;
var proxy;
var callbacks = {};
function normalizeArg(arg) {
  if (typeof arg === "function") {
    var oldId = Object.keys(callbacks).find((id22) => callbacks[id22] === arg);
    var id2 = oldId ? parseInt(oldId) : callbackId++;
    callbacks[id2] = arg;
    return id2;
  } else if (isPlainObject(arg)) {
    Object.keys(arg).forEach((name) => {
      arg[name] = normalizeArg(arg[name]);
    });
  }
  return arg;
}
function initUTSInstanceMethod(async, opts, instanceId, proxy2) {
  return initProxyFunction(async, opts, instanceId, proxy2);
}
function getProxy() {
  if (!proxy) {
    {
      proxy = {
        invokeSync(args, callback) {
          return nativeChannel.invokeSync("APP-SERVICE", args, callback);
        },
        invokeAsync(args, callback) {
          return nativeChannel.invokeAsync("APP-SERVICE", args, callback);
        }
      };
    }
  }
  return proxy;
}
function resolveSyncResult(args, res, returnOptions, instanceId, proxy2) {
  if (!res) {
    throw new Error("返回值为：" + JSON.stringify(res) + "；请求参数为：" + JSON.stringify(args));
  }
  if (isString(res)) {
    try {
      res = JSON.parse(res);
    } catch (e) {
      throw new Error("JSON.parse(".concat(res, "): ") + e);
    }
  }
  if (res.errMsg) {
    throw new Error(res.errMsg);
  }
  if (returnOptions) {
    if (returnOptions.type === "interface" && typeof res.params === "number") {
      if (!res.params) {
        return null;
      }
      if (res.params === instanceId && proxy2) {
        return proxy2;
      }
      if (interfaceDefines[returnOptions.options]) {
        var ProxyClass = initUTSProxyClass(extend({
          instanceId: res.params
        }, interfaceDefines[returnOptions.options]));
        return new ProxyClass();
      }
    }
  }
  return res.params;
}
function invokePropGetter(args) {
  if (args.errMsg) {
    throw new Error(args.errMsg);
  }
  delete args.errMsg;
  return resolveSyncResult(args, getProxy().invokeSync(args, () => {
  }));
}
function initProxyFunction(async, _ref, instanceId, proxy2) {
  var {
    moduleName,
    moduleType,
    package: pkg,
    class: cls,
    name: propOrMethod,
    method,
    companion,
    params: methodParams,
    return: returnOptions,
    errMsg
  } = _ref;
  var invokeCallback2 = (_ref2) => {
    var {
      id: id2,
      name,
      params,
      keepAlive
    } = _ref2;
    var callback = callbacks[id2];
    if (callback) {
      callback(...params);
      if (!keepAlive) {
        delete callbacks[id2];
      }
    } else {
      console.error("".concat(pkg).concat(cls, ".").concat(propOrMethod, " ").concat(name, " is not found"));
    }
  };
  var baseArgs = instanceId ? {
    moduleName,
    moduleType,
    id: instanceId,
    name: propOrMethod,
    method: methodParams
  } : {
    moduleName,
    moduleType,
    package: pkg,
    class: cls,
    name: method || propOrMethod,
    companion,
    method: methodParams
  };
  return function() {
    if (errMsg) {
      throw new Error(errMsg);
    }
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var invokeArgs = extend({}, baseArgs, {
      params: args.map((arg) => normalizeArg(arg))
    });
    if (async) {
      return new Promise((resolve, reject) => {
        getProxy().invokeAsync(invokeArgs, (res) => {
          if (res.type !== "return") {
            invokeCallback2(res);
          } else {
            if (res.errMsg) {
              reject(res.errMsg);
            } else {
              resolve(res.params);
            }
          }
        });
      });
    }
    return resolveSyncResult(invokeArgs, getProxy().invokeSync(invokeArgs, invokeCallback2), returnOptions, instanceId, proxy2);
  };
}
function initUTSStaticMethod(async, opts) {
  if (opts.main && !opts.method) {
    if (isUTSiOS()) {
      opts.method = "s_" + opts.name;
    }
  }
  return initProxyFunction(async, opts, 0);
}
var initUTSProxyFunction = initUTSStaticMethod;
function parseClassMethodName(name, methods) {
  if (typeof name === "string" && hasOwn(methods, name + "ByJs")) {
    return name + "ByJs";
  }
  return name;
}
function isUndefined(value) {
  return typeof value === "undefined";
}
function isProxyInterfaceOptions(options) {
  return !isUndefined(options.instanceId);
}
function initUTSProxyClass(options) {
  var {
    moduleName,
    moduleType,
    package: pkg,
    class: cls,
    methods,
    props,
    errMsg
  } = options;
  var baseOptions = {
    moduleName,
    moduleType,
    package: pkg,
    class: cls,
    errMsg
  };
  var instanceId;
  var constructorParams = [];
  var staticMethods = {};
  var staticProps = [];
  var isProxyInterface = false;
  if (isProxyInterfaceOptions(options)) {
    isProxyInterface = true;
    instanceId = options.instanceId;
  } else {
    constructorParams = options.constructor.params;
    staticMethods = options.staticMethods;
    staticProps = options.staticProps;
  }
  if (isUTSiOS()) {
    if (constructorParams.find((p) => p.type === "UTSCallback" || p.type.indexOf("JSONObject") > 0)) {
      constructorParams.push({
        name: "_byJs",
        type: "boolean"
      });
    }
  }
  var ProxyClass = class UTSClass {
    constructor() {
      this.__instanceId = 0;
      if (errMsg) {
        throw new Error(errMsg);
      }
      var target = {};
      if (!isProxyInterface) {
        for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          params[_key2] = arguments[_key2];
        }
        this.__instanceId = initProxyFunction(false, extend({
          name: "constructor",
          params: constructorParams
        }, baseOptions), 0).apply(null, params);
      } else if (typeof instanceId === "number") {
        this.__instanceId = instanceId;
      }
      if (!this.__instanceId) {
        throw new Error("new ".concat(cls, " is failed"));
      }
      var instance = this;
      var proxy2 = new Proxy(instance, {
        get(_, name) {
          if (name === "__v_skip") {
            return true;
          }
          if (!target[name]) {
            name = parseClassMethodName(name, methods);
            if (hasOwn(methods, name)) {
              var {
                async,
                params: params2,
                return: returnOptions
              } = methods[name];
              target[name] = initUTSInstanceMethod(!!async, extend({
                name,
                params: params2,
                return: returnOptions
              }, baseOptions), instance.__instanceId, proxy2);
            } else if (props.includes(name)) {
              return invokePropGetter({
                moduleName,
                moduleType,
                id: instance.__instanceId,
                name,
                errMsg
              });
            }
          }
          return target[name];
        }
      });
      return proxy2;
    }
  };
  var staticMethodCache = {};
  return new Proxy(ProxyClass, {
    get(target, name, receiver) {
      name = parseClassMethodName(name, staticMethods);
      if (hasOwn(staticMethods, name)) {
        if (!staticMethodCache[name]) {
          var {
            async,
            params,
            return: returnOptions
          } = staticMethods[name];
          staticMethodCache[name] = initUTSStaticMethod(!!async, extend({
            name,
            companion: true,
            params,
            return: returnOptions
          }, baseOptions));
        }
        return staticMethodCache[name];
      }
      if (staticProps.includes(name)) {
        return invokePropGetter(extend({
          name,
          companion: true
        }, baseOptions));
      }
      return Reflect.get(target, name, receiver);
    }
  });
}
function isUTSAndroid() {
  {
    return false;
  }
}
function isUTSiOS() {
  return !isUTSAndroid();
}
function initUTSPackageName(name, is_uni_modules) {
  if (isUTSAndroid()) {
    return "uts.sdk." + (is_uni_modules ? "modules." : "") + name;
  }
  return "";
}
function initUTSIndexClassName(moduleName, is_uni_modules) {
  return initUTSClassName(moduleName, isUTSAndroid() ? "IndexKt" : "IndexSwift", is_uni_modules);
}
function initUTSClassName(moduleName, className, is_uni_modules) {
  if (isUTSAndroid()) {
    return className;
  }
  return "UTSSDK" + (is_uni_modules ? "Modules" : "") + capitalize(moduleName) + capitalize(className);
}
var interfaceDefines = {};
function registerUTSInterface(name, define) {
  interfaceDefines[name] = define;
}
var pluginDefines = {};
function registerUTSPlugin(name, define) {
  pluginDefines[name] = define;
}
function requireUTSPlugin(name) {
  var define = pluginDefines[name];
  if (!define) {
    console.error("".concat(name, " is not found"));
  }
  return define;
}
const uni$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hideTabBar,
  hideTabBarRedDot,
  initUTSClassName,
  initUTSIndexClassName,
  initUTSPackageName,
  initUTSProxyClass,
  initUTSProxyFunction,
  navigateBack,
  navigateTo,
  redirectTo,
  registerUTSInterface,
  registerUTSPlugin,
  removeTabBarBadge,
  requireUTSPlugin,
  setTabBarBadge,
  setTabBarItem,
  setTabBarStyle,
  showTabBar,
  showTabBarRedDot,
  switchTab
}, Symbol.toStringTag, { value: "Module" });
function initGlobalEvent(app) {
  app.addKeyEventListener("onBackButton", () => {
    backbuttonListener();
    return true;
  });
}
function initAppLaunch(appVm) {
  injectAppHooks(appVm.$);
  var {
    entryPagePath,
    entryPageQuery,
    referrerInfo
  } = __uniConfig;
  var args = initLaunchOptions({
    path: entryPagePath,
    query: entryPageQuery,
    referrerInfo
  });
  invokeHook(appVm, ON_LAUNCH, args);
  invokeHook(appVm, ON_SHOW, args);
}
var isLaunchWebviewReady = false;
function subscribeWebviewReady(_data, pageId) {
  var isLaunchWebview = pageId === "1";
  if (isLaunchWebview && isLaunchWebviewReady) {
    return;
  }
  if (isLaunchWebview) {
    isLaunchWebviewReady = true;
  }
  isLaunchWebview && onLaunchWebviewReady();
}
function onLaunchWebviewReady() {
  var entryPagePath = addLeadingSlash(__uniConfig.entryPagePath);
  var routeOptions = getRouteOptions(entryPagePath);
  var args = {
    url: entryPagePath + (__uniConfig.entryPageQuery || ""),
    openType: "appLaunch"
  };
  var handler = {
    resolve() {
    },
    reject() {
    }
  };
  if (routeOptions.meta.isTabBar) {
    return $switchTab(args, handler);
  }
  return $navigateTo(args, handler);
}
function initSubscribeHandlers() {
  subscribeWebviewReady({}, "1");
}
function initOn(app) {
  app.addEventListener(ON_SHOW, function(event) {
    var page = getCurrentPage();
    invokeHook(getApp(), ON_SHOW, {
      path: __uniConfig.entryPagePath
    });
    if (page) {
      invokeHook(page, ON_SHOW);
    }
  });
  app.addEventListener(ON_HIDE, function() {
    var page = getCurrentPage();
    invokeHook(getApp(), ON_HIDE);
    if (page) {
      invokeHook(page, ON_HIDE);
    }
  });
}
function initService(app) {
  initOn(app);
}
var appCtx;
var defaultApp = {
  globalData: {}
};
function initAppVm(appVm) {
  appVm.$vm = appVm;
  appVm.$mpType = "app";
}
function getApp$1() {
  var {
    allowDefault = false
  } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  if (appCtx) {
    return appCtx;
  }
  if (allowDefault) {
    return defaultApp;
  }
  console.error("[warn]: getApp() failed. Learn more: https://uniapp.dcloud.io/collocation/frame/window?id=getapp.");
}
function registerApp(appVm, app) {
  setNativeApp(app);
  initVueApp(appVm);
  appCtx = appVm;
  initAppVm(appCtx);
  extend(appCtx, defaultApp);
  defineGlobalData(appCtx, defaultApp.globalData);
  initService(app);
  initGlobalEvent(app);
  initSubscribeHandlers();
  initAppLaunch(appVm);
  __uniConfig.ready = true;
}
var $export = _export;
var $entries = _objectToArray(true);
$export($export.S, "Object", {
  entries: function entries(it) {
    return $entries(it);
  }
});
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
  var index2 = 0;
  var actions = animation2.actions;
  var length = animation2.actions.length;
  function animate() {
    var action = actions[index2];
    var transition = action.option.transition;
    var style = getStyle(action);
    Object.keys(style).forEach((key) => {
      context.$el.style[key] = style[key];
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
  {
    var rootElement = options.rootElement;
    if (rootElement) {
      customElements.define(rootElement.name, rootElement.class, rootElement.options);
    }
  }
  return defineSystemComponent(options);
};
var defineSystemComponent = (options) => {
  options.__reserved = true;
  options.compatConfig = {
    MODE: 3
    // 标记为vue3
  };
  return defineComponent(options);
};
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function $dispatch(context, componentName, eventName) {
  var _parent, _parent$$options;
  var parent = context.$parent;
  var name = (_parent = parent) === null || _parent === void 0 ? void 0 : (_parent$$options = _parent.$options) === null || _parent$$options === void 0 ? void 0 : _parent$$options.name;
  while (parent != null && (name == null || componentName != name)) {
    parent = parent.$parent;
    if (parent != null) {
      var _parent2, _parent2$$options;
      name = (_parent2 = parent) === null || _parent2 === void 0 ? void 0 : (_parent2$$options = _parent2.$options) === null || _parent2$$options === void 0 ? void 0 : _parent2$$options.name;
    }
  }
  if (parent != null) {
    for (var _len = arguments.length, do_not_transform_spread = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      do_not_transform_spread[_key - 3] = arguments[_key];
    }
    parent[eventName](...do_not_transform_spread);
  }
}
var BUTTON_COMPONENT_NAME = "Button";
var UNI_BUTTON_ELEMENT_NAME = "uni-button-element";
var buttonProps = {
  hoverClass: {
    type: String,
    default: "button-hover"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: "default"
  },
  size: {
    type: String,
    default: "default"
  },
  plain: {
    type: Boolean,
    default: false
  },
  // TODO: loading
  loading: {
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
  openType: {
    type: String,
    default: ""
  },
  formType: {
    type: String,
    default: ""
  }
};
class UniButtonElement extends UniTextElementImpl {
  // constructor(data: INodeData) {
  //   super()
  //   // super(data)
  // }
}
var hoverStyles = /* @__PURE__ */ new Map([["default", /* @__PURE__ */ new Map([["color", "rgba(0, 0, 0, 0.6)"], ["backgroundColor", "#dedede"]])], ["primary", /* @__PURE__ */ new Map([["color", "rgba(255, 255, 255, 0.6)"], ["backgroundColor", "#0062cc"]])], ["warn", /* @__PURE__ */ new Map([["color", "rgba(255, 255, 255, 0.6)"], ["backgroundColor", "#ce3c39"]])], ["default-plain", /* @__PURE__ */ new Map([["color", "rgba(53, 53, 53, 0.6)"], ["borderColor", "rgba(53, 53, 53, 0.6)"], ["backgroundColor", "rgba(0, 0, 0, 0)"]])], ["primary-plain", /* @__PURE__ */ new Map([["color", "rgba(0, 122, 255, 0.6)"], ["borderColor", "rgba(0, 122, 255, 0.6)"], ["backgroundColor", "rgba(0, 0, 0, 0)"]])], ["warn-plain", /* @__PURE__ */ new Map([["color", "rgba(230, 67, 64, 0.6)"], ["borderColor", "rgba(230, 67, 64, 0.6)"], ["backgroundColor", "rgba(0, 0, 0, 0)"]])]]);
var _style_0$1$1 = {
  ub: {
    "": {
      position: "relative",
      textAlign: "center",
      paddingLeft: "14px",
      paddingRight: "14px",
      overflow: "hidden",
      color: "#000000",
      backgroundColor: "#f8f8f8",
      borderRadius: "5px",
      borderStyle: "solid",
      borderWidth: "0.5px",
      borderColor: "rgba(0, 0, 0, 0.2)",
      fontSize: "18px",
      lineHeight: "2.55555556"
    }
  },
  "ub-default": {
    "": {
      color: "#000000",
      backgroundColor: "#f8f8f8"
    }
  },
  "ub-primary": {
    "": {
      color: "#ffffff",
      backgroundColor: "#007aff"
    }
  },
  "ub-warn": {
    "": {
      color: "#ffffff",
      backgroundColor: "#e64340"
    }
  },
  "ub-default-plain": {
    "": {
      color: "#353535",
      borderColor: "#353535",
      backgroundColor: "rgba(0, 0, 0, 0)",
      borderWidth: "1px"
    }
  },
  "ub-primary-plain": {
    "": {
      color: "#007aff",
      borderColor: "#007aff",
      backgroundColor: "rgba(0, 0, 0, 0)",
      borderWidth: "1px"
    }
  },
  "ub-warn-plain": {
    "": {
      color: "#e64340",
      borderColor: "#e64340",
      backgroundColor: "rgba(0, 0, 0, 0)",
      borderWidth: "1px"
    }
  },
  "ub-default-disabled": {
    "": {
      color: "rgba(0, 0, 0, 0.3)",
      backgroundColor: "#f7f7f7"
    }
  },
  "ub-primary-disabled": {
    "": {
      color: "rgba(255, 255, 255, 0.6)",
      backgroundColor: "rgba(0, 122, 255, 0.6)"
    }
  },
  "ub-warn-disabled": {
    "": {
      color: "rgba(255, 255, 255, 0.6)",
      backgroundColor: "#ec8b89"
    }
  },
  "ub-default-disabled-plain": {
    "": {
      color: "rgba(0, 0, 0, 0.2)",
      borderColor: "rgba(0, 0, 0, 0.2)",
      backgroundColor: "rgba(0, 0, 0, 0)",
      borderWidth: "1px"
    }
  },
  "ub-primary-disabled-plain": {
    "": {
      color: "rgba(0, 0, 0, 0.2)",
      borderColor: "rgba(0, 0, 0, 0.2)",
      backgroundColor: "rgba(0, 0, 0, 0)",
      borderWidth: "1px"
    }
  },
  "ub-warn-disabled-plain": {
    "": {
      color: "rgba(0, 0, 0, 0.2)",
      borderColor: "rgba(0, 0, 0, 0.2)",
      backgroundColor: "rgba(0, 0, 0, 0)",
      borderWidth: "1px"
    }
  },
  "ub-mini": {
    "": {
      paddingTop: "0",
      paddingBottom: "0",
      paddingRight: "17.5px",
      paddingLeft: "17.5px",
      lineHeight: "2.3",
      fontSize: "13px"
    }
  }
};
var styleList$1 = _style_0$1$1;
var FORM_TYPES = ["submit", "reset"];
const button = /* @__PURE__ */ defineBuiltInComponent({
  name: BUTTON_COMPONENT_NAME,
  rootElement: {
    name: UNI_BUTTON_ELEMENT_NAME,
    // @ts-expect-error not web element
    class: UniButtonElement
  },
  // styles: buttonStyle,
  props: buttonProps,
  // emits: ['click'],
  setup(props, _ref) {
    var {
      emit,
      slots
    } = _ref;
    var $buttonEl = null;
    var $originHoverStyle = /* @__PURE__ */ new Map();
    var $hoverStyle = /* @__PURE__ */ new Map();
    var $hoverClassStyle = /* @__PURE__ */ new Map();
    var $hoverStartTimer = null;
    var $hoverStayTimer = null;
    var $hoverTouch = false;
    var $hovering = false;
    var instance;
    var btnCls = computed(() => {
      var cl = "ub-" + props.type;
      if (props.disabled) {
        cl += "-disabled";
      }
      if (props.plain) {
        cl += "-plain";
      }
      if (props.size == "mini") {
        cl += " ub-mini";
      }
      return cl;
    });
    function parseHoverClass() {
      var cl = props.hoverClass;
      if (cl == "button-hover" || cl.length == 0) {
        return;
      }
      var styles2 = $buttonEl.ext.get("styles");
      if (styles2 != null) {
        var _styles$cl;
        var style = (_styles$cl = styles2[cl]) !== null && _styles$cl !== void 0 ? _styles$cl : {};
        style = new Map(Object.entries(style));
        if (style != null) {
          style.forEach((val) => {
            val = new Map(Object.entries(val));
            $hoverClassStyle = val;
          });
        }
      }
    }
    onMounted(() => {
      var _instance;
      instance = getCurrentInstance();
      (_instance = instance) === null || _instance === void 0 ? void 0 : _instance.$waitNativeRender(() => {
        var _instance$proxy;
        if (!instance)
          return;
        $buttonEl = (_instance$proxy = instance.proxy) === null || _instance$proxy === void 0 ? void 0 : _instance$proxy.$el;
        parseHoverClass();
      });
    });
    function setHoverStyle() {
      var hoverStyle;
      if (props.hoverClass == "button-hover") {
        var _hoverStyles$get;
        var plain = props.plain ? "-plain" : "";
        hoverStyle = (_hoverStyles$get = hoverStyles.get(props.type + plain)) !== null && _hoverStyles$get !== void 0 ? _hoverStyles$get : hoverStyles.get("default");
      } else {
        hoverStyle = $hoverClassStyle;
      }
      var currentStyle = $buttonEl.style;
      $hoverStyle = /* @__PURE__ */ new Map();
      $originHoverStyle = /* @__PURE__ */ new Map();
      hoverStyle.forEach((val, key) => {
        $hoverStyle.set(key, val);
        $originHoverStyle.set(key, currentStyle.getPropertyValue(key));
      });
    }
    function clearHoverStyle() {
      var hoverStyle = $hoverStyle;
      var currentStyle = $buttonEl.style;
      hoverStyle.forEach((val, key) => {
        currentStyle.getPropertyValue(key);
        if (currentStyle.getPropertyValue(key) != val) {
          hoverStyle.set(key, currentStyle.getPropertyValue(key));
        } else {
          hoverStyle.set(key, $originHoverStyle.get(key));
        }
      });
    }
    function updateStyle() {
      if ($hoverStyle.size == 0) {
        return;
      }
      var style = /* @__PURE__ */ new Map();
      $hoverStyle.forEach((val, key) => {
        style.set(key, val);
      });
      $buttonEl.updateStyle(style);
    }
    function touchstart() {
      if (props.disabled || props.hoverClass == "none" || $hovering) {
        return;
      }
      $hoverTouch = true;
      setHoverStyle();
      $hoverStartTimer = setTimeout(() => {
        $hovering = true;
        updateStyle();
        if (!$hoverTouch) {
          touchend();
        }
      }, props.hoverStartTime);
    }
    function touchend() {
      $hoverTouch = false;
      if ($hovering) {
        clearTimeout($hoverStayTimer);
        $hoverStayTimer = setTimeout(() => {
          $hovering = false;
          clearHoverStyle();
          updateStyle();
        }, props.hoverStayTime);
      }
    }
    function touchcancel() {
      $hoverTouch = false;
      $hovering = false;
      clearHoverStyle();
      updateStyle();
      clearTimeout($hoverStartTimer);
    }
    function touchmove(event) {
      if (props.disabled || props.hoverClass == "none") {
        return;
      }
      var {
        clientX,
        clientY
      } = event.touches[0];
      var {
        height,
        width,
        left,
        top
      } = $buttonEl.getBoundingClientRect();
      var isMovedOutside = clientX < left || clientX > left + width || clientY < top || clientY > top + height;
      if (isMovedOutside) {
        touchcancel();
      }
    }
    function _onClick($event) {
      if (props.disabled) {
        return;
      }
      if (FORM_TYPES.indexOf(props.formType) > -1) {
        var _instance2;
        var ctx2 = (_instance2 = instance) === null || _instance2 === void 0 ? void 0 : _instance2.proxy;
        $dispatch(ctx2, "Form", props.formType);
      }
    }
    var styleText = computed(() => {
      var classList = btnCls.value.split(" ");
      var basicStyle = Object.assign({}, styleList$1["ub"][""]);
      classList.forEach((cl) => {
        var _styleList$cl$, _styleList$cl;
        var style = (_styleList$cl$ = (_styleList$cl = styleList$1[cl]) === null || _styleList$cl === void 0 ? void 0 : _styleList$cl[""]) !== null && _styleList$cl$ !== void 0 ? _styleList$cl$ : {};
        if (style) {
          Object.assign(basicStyle, style);
        }
      });
      return basicStyle;
    });
    return () => {
      return createVNode(resolveComponent("uni-button-element"), {
        "class": "ub",
        "style": styleText.value,
        "onTouchstart": touchstart,
        "onTouchend": touchend,
        "onTouchcancel": touchcancel,
        "onTouchmove": touchmove,
        "onClick": _onClick
      }, {
        default: () => {
          var _slots$default;
          return [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)];
        }
      }, 8, ["style", "onTouchstart", "onTouchend", "onTouchcancel", "onTouchmove", "onClick"]);
    };
  }
});
const button$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: button
}, Symbol.toStringTag, { value: "Module" });
var CHECKBOX_NAME = "Checkbox";
var CHECKBOX_ROOT_ELEMENT = "uni-checkbox-element";
class UniCheckboxElement extends UniElementImpl {
}
var checkboxProps = {
  checked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  value: {
    type: [Object, String],
    default: ""
  },
  // 图标颜色
  color: {
    type: String,
    default: "#007aff"
  },
  // 默认的背景颜色
  backgroundColor: {
    type: String,
    default: "#ffffff"
  },
  // 默认的边框颜色
  borderColor: {
    type: String,
    default: "#d1d1d1"
  },
  // 选中时的背景颜色
  activeBackgroundColor: {
    type: String,
    default: "#ffffff"
  },
  // 选中时的边框颜色
  activeBorderColor: {
    type: String,
    default: "#d1d1d1"
  },
  // 图标颜色,同color,优先级大于color
  iconColor: {
    type: String,
    default: ""
  }
};
var styles = {
  ["uni-checkbox"]: {
    "flex-direction": "row",
    "align-items": "center"
  },
  ["uni-checkbox-input"]: {
    "justify-content": "center",
    "align-items": "center",
    position: "relative",
    "border-top-width": "1px",
    "border-right-width": "1px",
    "border-bottom-width": "1px",
    "border-left-width": "1px",
    "border-top-style": "solid",
    "border-right-style": "solid",
    "border-bottom-style": "solid",
    "border-left-style": "solid",
    "border-top-left-radius": "3px",
    "border-top-right-radius": "3px",
    "border-bottom-right-radius": "3px",
    "border-bottom-left-radius": "3px",
    width: "22px",
    height: "22px",
    "margin-right": "5px",
    "box-sizing": "content-box"
  },
  ["uni-icon"]: {
    "font-family": "uniappx_components",
    "font-size": "16px"
  }
};
var createHook = (lifecycle) => function(hook) {
  var target = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstance();
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
var onUnload = /* @__PURE__ */ createHook(ON_UNLOAD);
const checkbox = /* @__PURE__ */ defineBuiltInComponent({
  name: CHECKBOX_NAME,
  rootElement: {
    name: CHECKBOX_ROOT_ELEMENT,
    // @ts-expect-error not web element
    class: UniCheckboxElement
  },
  props: checkboxProps,
  emits: ["click"],
  setup(props, _ref) {
    var {
      emit,
      slots
    } = _ref;
    var icon = "";
    var instance = getCurrentInstance();
    var checkboxChecked = ref(props.checked);
    var checkboxValue = ref("");
    var setCheckboxChecked = (checked) => {
      checkboxChecked.value = checked;
    };
    watchEffect(() => {
      checkboxChecked.value = props.checked;
    });
    watchEffect(() => {
      checkboxValue.value = props.value.toString();
    });
    var iconStyle = computed(() => {
      if (props.disabled) {
        return Object.assign({}, styles["uni-icon"]);
      }
      var color = props.iconColor.length > 0 ? props.iconColor : props.color;
      return Object.assign({}, styles["uni-icon"], {
        color
      });
    });
    var checkInputStyle = computed(() => {
      var style = checkboxChecked.value ? checkedStyle.value : uncheckedStyle.value;
      return Object.assign({}, styles["uni-checkbox-input"], style);
    });
    var checkedStyle = computed(() => {
      if (props.disabled) {
        return {
          backgroundColor: "#e1e1e1",
          borderColor: "#d1d1d1"
        };
      }
      return {
        backgroundColor: props.activeBackgroundColor,
        borderColor: props.activeBorderColor
      };
    });
    var uncheckedStyle = computed(() => {
      if (props.disabled) {
        return {
          backgroundColor: "#e1e1e1",
          borderColor: "#d1d1d1"
        };
      }
      return {
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor
      };
    });
    onMounted(() => {
      var ctx2 = instance === null || instance === void 0 ? void 0 : instance.proxy;
      $dispatch(ctx2, "CheckboxGroup", "_checkboxGroupUpdateHandler", {
        setCheckboxChecked,
        name: checkboxValue.value,
        checked: checkboxChecked.value
      }, "add");
    });
    onUnload(() => {
      var ctx2 = instance === null || instance === void 0 ? void 0 : instance.proxy;
      $dispatch(ctx2, "CheckboxGroup", "_checkboxGroupUpdateHandler", {
        setCheckboxChecked,
        name: checkboxValue.value,
        checked: checkboxChecked.value
      }, "remove");
    });
    var _onClick = ($event) => {
      if (props.disabled)
        return;
      emit("click", $event);
      checkboxChecked.value = !checkboxChecked.value;
      var ctx2 = instance === null || instance === void 0 ? void 0 : instance.proxy;
      $dispatch(ctx2, "CheckboxGroup", "_changeHandler", {
        name: checkboxValue.value,
        checked: checkboxChecked.value,
        setCheckboxChecked
      });
    };
    return () => {
      return createVNode(resolveComponent("uni-checkbox-element"), {
        "dataUncType": "uni-checkbox",
        "onClick": _onClick,
        "class": "uni-checkbox",
        "style": styles["uni-checkbox"]
      }, {
        default: () => {
          var _slots$default;
          return [createVNode("view", {
            "class": "uni-checkbox-input",
            "style": checkInputStyle.value
          }, [checkboxChecked.value ? createVNode("text", {
            "class": "uni-icon",
            "style": iconStyle.value
          }, [icon], 4) : null], 4), (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)];
        },
        _: 2
      }, 8, ["onClick", "style"]);
    };
  }
});
const checkbox$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: checkbox
}, Symbol.toStringTag, { value: "Module" });
var CHECKBOX_GROUP_NAME = "CheckboxGroup";
var CHECKBOX_GROUP_ROOT_ELEMENT = "uni-checkbox-group-element";
var checkboxGroupProps = {
  name: {
    type: String,
    default: ""
  }
};
class UniCheckboxGroupElement extends UniFormControlElement {
  constructor(data, pageNode) {
    super(data, pageNode);
    this._initialValue = [];
    this._getAttribute = (key) => {
      return null;
    };
    this._getValue = () => {
      return this._initialValue;
    };
    this._setValue = (value) => {
    };
  }
  get value() {
    return this._getValue();
  }
  set value(value) {
    this._setValue(value);
  }
  getAttribute(key) {
    var value = this._getAttribute(key);
    if (value != null) {
      return value;
    }
    return super.getAttribute(key);
  }
  reset() {
    this.value = this._initialValue.slice(0);
  }
}
class UniCheckboxGroupChangeEventDetail {
  constructor(value) {
    this.value = value;
  }
}
class UniCheckboxGroupChangeEvent extends CustomEvent {
  constructor(value) {
    super("change", {
      detail: new UniCheckboxGroupChangeEventDetail(value)
    });
  }
}
const checkboxGroup = /* @__PURE__ */ defineBuiltInComponent({
  name: CHECKBOX_GROUP_NAME,
  rootElement: {
    name: CHECKBOX_GROUP_ROOT_ELEMENT,
    // @ts-expect-error not web element
    class: UniCheckboxGroupElement
  },
  props: checkboxGroupProps,
  emits: ["change"],
  setup(props, _ref) {
    var {
      emit,
      expose,
      slots
    } = _ref;
    var $checkboxList = ref([]);
    var uniCheckboxGroupElementRef = ref();
    var instance = getCurrentInstance();
    var _checkboxGroupUpdateHandler = (info, type) => {
      if (type == "add") {
        $checkboxList.value.push(info);
      } else {
        var index2 = $checkboxList.value.findIndex((i) => i.name === info.name);
        if (index2 !== -1) {
          $checkboxList.value.splice(index2, 1);
        }
      }
    };
    var _changeHandler = (info) => {
      $checkboxList.value.forEach((i) => {
        if (i.name === info.name) {
          i.checked = info.checked;
        }
      });
      emit("change", new UniCheckboxGroupChangeEvent(_getValue()));
    };
    var _getValue = () => {
      var valueArray = [];
      $checkboxList.value.forEach((info) => {
        if (info.checked) {
          valueArray.push(info.name);
        }
      });
      return valueArray;
    };
    var _setValue = (valueArray) => {
      $checkboxList.value.forEach((info) => {
        info.setCheckboxChecked(valueArray.includes(info.name));
      });
    };
    onMounted(() => {
      instance === null || instance === void 0 ? void 0 : instance.$waitNativeRender(() => {
        if (!instance)
          return;
        if (!uniCheckboxGroupElementRef.value)
          return;
        uniCheckboxGroupElementRef.value._getValue = _getValue;
        uniCheckboxGroupElementRef.value._setValue = _setValue;
        uniCheckboxGroupElementRef.value._initialValue = _getValue();
        uniCheckboxGroupElementRef.value._getAttribute = (key) => {
          var _props$keyString$toSt, _props$keyString;
          var keyString = camelize(key);
          return props[keyString] !== null ? (_props$keyString$toSt = (_props$keyString = props[keyString]) === null || _props$keyString === void 0 ? void 0 : _props$keyString.toString()) !== null && _props$keyString$toSt !== void 0 ? _props$keyString$toSt : null : null;
        };
        var ctx2 = instance.proxy;
        $dispatch(ctx2, "Form", "formControlUpdate", uniCheckboxGroupElementRef.value, "add");
      });
    });
    onUnmounted(() => {
      var ctx2 = instance === null || instance === void 0 ? void 0 : instance.proxy;
      $dispatch(ctx2, "Form", "formControlUpdate", uniCheckboxGroupElementRef.value, "remove");
    });
    expose({
      _checkboxGroupUpdateHandler,
      _changeHandler,
      _getValue,
      _setValue
    });
    return () => {
      return createVNode(resolveComponent("uni-checkbox-group-element"), {
        "ref": uniCheckboxGroupElementRef
      }, {
        default: () => {
          var _slots$default;
          return [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)];
        }
      }, 512);
    };
  }
});
const checkboxGroup$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: checkboxGroup
}, Symbol.toStringTag, { value: "Module" });
var RADIO_NAME = "Radio";
var RADIO_ROOT_ELEMENT = "uni-radio-element";
class UniRadioElement extends UniElementImpl {
  constructor() {
    super(...arguments);
    this._getAttribute = (key) => {
      return null;
    };
  }
}
var radioProps = {
  checked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  value: {
    type: [Object, String],
    default: ""
  },
  // 选中时的背景颜色
  color: {
    type: String,
    default: "#007AFF"
  },
  // 默认的背景颜色
  backgroundColor: {
    type: String,
    default: "#ffffff"
  },
  // 默认的边框颜色
  borderColor: {
    type: String,
    default: "#d1d1d1"
  },
  // 选中时的背景颜色,同color,优先级大于color
  activeBackgroundColor: {
    type: String,
    default: ""
  },
  // 选中时的边框颜色，默认为选中时的背景颜色
  activeBorderColor: {
    type: String,
    default: ""
  },
  // 图标颜色
  iconColor: {
    type: String,
    default: "#ffffff"
  }
};
var _style_0$1 = {
  "uni-radio": {
    "": {
      flexDirection: "row",
      alignItems: "center"
    }
  },
  "uni-radio-input": {
    "": {
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "5px",
      borderStyle: "solid",
      borderWidth: "1px",
      borderRadius: "50px",
      width: "22px",
      height: "22px",
      boxSizing: "content-box"
    }
  },
  "uni-radio-input-icon": {
    "": {
      fontFamily: "uniappx_components",
      fontSize: "14px"
    }
  }
};
var styleList = _style_0$1;
const radio = /* @__PURE__ */ defineBuiltInComponent({
  name: RADIO_NAME,
  rootElement: {
    name: RADIO_ROOT_ELEMENT,
    // @ts-expect-error not web element
    class: UniRadioElement
  },
  props: radioProps,
  styles: styleList,
  setup(props, _ref) {
    var {
      slots,
      expose
    } = _ref;
    var uniRadioElementRef = ref();
    var styleUniRadio = computed(() => styleList["uni-radio"][""]);
    var styleUniRadioInput = computed(() => {
      return Object.assign({}, styleList["uni-radio-input"][""], radioChecked.value ? checkedStyle.value : uncheckedStyle.value);
    });
    var styleUniRadioInputIcon = computed(() => {
      return Object.assign({}, styleList["uni-radio-input-icon"][""], iconStyle.value);
    });
    var checkedStyle = computed(() => {
      if (props.disabled) {
        return {
          backgroundColor: "#e1e1e1",
          borderColor: "#d1d1d1"
        };
      }
      var backgroundColor = props.activeBackgroundColor.length > 0 ? props.activeBackgroundColor : props.color;
      var borderColor = props.activeBorderColor.length > 0 ? props.activeBorderColor : backgroundColor;
      return {
        backgroundColor,
        borderColor
      };
    });
    var uncheckedStyle = computed(() => {
      if (props.disabled) {
        return {
          backgroundColor: "#e1e1e1",
          borderColor: "#d1d1d1"
        };
      }
      return {
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor
      };
    });
    var iconStyle = computed(() => {
      return {
        color: props.disabled ? "#adadad" : props.iconColor
      };
    });
    var icon = "";
    var radioChecked = ref(props.checked);
    var radioValue = ref(props.value.toString());
    watchEffect(() => {
      radioChecked.value = props.checked;
    });
    var setRadioChecked = (value) => {
      radioChecked.value = value;
    };
    watchEffect(() => {
      radioValue.value = props.value.toString();
    });
    expose({
      radioValue
    });
    var instance = getCurrentInstance();
    onMounted(() => {
      instance === null || instance === void 0 ? void 0 : instance.$waitNativeRender(() => {
        if (instance === null)
          return;
        uniRadioElementRef.value._getAttribute = (key) => {
          return null;
        };
      });
      var ctx2 = instance === null || instance === void 0 ? void 0 : instance.proxy;
      $dispatch(ctx2, "RadioGroup", "_radioGroupUpdateHandler", {
        name: radioValue.value,
        checked: radioChecked.value,
        setRadioChecked
      }, "add");
    });
    onUnmounted(() => {
      var ctx2 = instance === null || instance === void 0 ? void 0 : instance.proxy;
      $dispatch(ctx2, "RadioGroup", "_radioGroupUpdateHandler", {
        name: radioValue.value,
        checked: radioChecked.value,
        setRadioChecked
      }, "remove");
    });
    var _onClick = () => {
      if (props.disabled || radioChecked.value)
        return;
      radioChecked.value = !radioChecked.value;
      var ctx2 = instance === null || instance === void 0 ? void 0 : instance.proxy;
      $dispatch(
        ctx2,
        "RadioGroup",
        "_changeHandler",
        // more info
        {
          name: radioValue.value,
          checked: radioChecked.value,
          setRadioChecked
        }
      );
    };
    return () => {
      return createVNode(resolveComponent("uni-radio-element"), {
        "dataUncType": "uni-radio",
        "class": "uni-radio",
        "style": styleUniRadio.value,
        "ref": uniRadioElementRef,
        "onClick": _onClick
      }, {
        default: () => {
          var _slots$default;
          return [createVNode("view", {
            "class": "uni-radio-input",
            "style": styleUniRadioInput.value
          }, [radioChecked.value ? createVNode("text", {
            "class": "uni-radio-input-icon",
            "style": styleUniRadioInputIcon.value
          }, [icon], 4) : null], 4), (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)];
        },
        _: 2
      }, 8, ["style", "onClick"]);
    };
  }
});
const radio$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: radio
}, Symbol.toStringTag, { value: "Module" });
var RADIOGROUP_NAME = "RadioGroup";
var RADIOGROUP_ROOT_ELEMENT = "uni-radio-group-element";
var RadioProps = {
  name: {
    type: String,
    default: ""
  }
};
class UniRadioGroupElement extends UniFormControlElement {
  constructor(data, pageNode) {
    super(data, pageNode);
    this._initialValue = "";
    this._getAttribute = (key) => {
      return null;
    };
    this._getValue = () => {
      return this._initialValue;
    };
    this._setValue = (value) => {
    };
  }
  getAttribute(key) {
    var value = this._getAttribute(key);
    if (value != null) {
      return value;
    }
    return super.getAttribute(key);
  }
  get value() {
    return this._getValue();
  }
  set value(value) {
    this._setValue(value);
  }
  reset() {
    this.value = this._initialValue;
  }
}
class UniRadioGroupChangeEventDetail {
  constructor(value) {
    this.value = value;
  }
}
class UniRadioGroupChangeEvent extends CustomEvent {
  constructor(value) {
    super("change", {
      detail: new UniRadioGroupChangeEventDetail(value)
    });
  }
}
const radioGroup = /* @__PURE__ */ defineBuiltInComponent({
  name: RADIOGROUP_NAME,
  rootElement: {
    name: RADIOGROUP_ROOT_ELEMENT,
    // @ts-expect-error not web element
    class: UniRadioGroupElement
  },
  props: RadioProps,
  emits: ["change"],
  setup(props, _ref) {
    var {
      emit,
      slots,
      expose
    } = _ref;
    var $radioList = ref([]);
    var uniRadioGroupElementRef = ref();
    var instance = getCurrentInstance();
    var _radioGroupUpdateHandler = (info, type) => {
      if (type == "add") {
        $radioList.value.push(info);
      } else {
        var index2 = $radioList.value.findIndex((i) => i.name == info.name);
        if (index2 !== -1) {
          $radioList.value.splice(index2, 1);
        }
      }
    };
    var _changeHandler = (data) => {
      _setValue(data.name);
      emit("change", new UniRadioGroupChangeEvent(data.name));
    };
    var _getValue = () => {
      var value = "";
      $radioList.value.forEach((info) => {
        if (info.checked) {
          value = info.name;
        }
      });
      return value;
    };
    var _setValue = (name) => {
      $radioList.value.forEach((info) => {
        if (info.name == name) {
          info.checked = true;
          info.setRadioChecked(true);
        } else {
          info.checked = false;
          info.setRadioChecked(false);
        }
      });
    };
    onMounted(() => {
      instance === null || instance === void 0 ? void 0 : instance.$waitNativeRender(() => {
        if (!instance)
          return;
        if (!uniRadioGroupElementRef.value)
          return;
        uniRadioGroupElementRef.value._getValue = _getValue;
        uniRadioGroupElementRef.value._setValue = _setValue;
        uniRadioGroupElementRef.value._initialValue = _getValue();
        uniRadioGroupElementRef.value._getAttribute = (key) => {
          var _props$keyString$toSt, _props$keyString;
          var keyString = camelize(key);
          return props[keyString] !== null ? (_props$keyString$toSt = (_props$keyString = props[keyString]) === null || _props$keyString === void 0 ? void 0 : _props$keyString.toString()) !== null && _props$keyString$toSt !== void 0 ? _props$keyString$toSt : null : null;
        };
        var ctx2 = instance === null || instance === void 0 ? void 0 : instance.proxy;
        $dispatch(ctx2, "Form", "formControlUpdate", uniRadioGroupElementRef.value, "add");
      });
    });
    onUnmounted(() => {
      var ctx2 = instance === null || instance === void 0 ? void 0 : instance.proxy;
      $dispatch(ctx2, "Form", "formControlUpdate", uniRadioGroupElementRef.value, "remove");
    });
    expose({
      _radioGroupUpdateHandler,
      _getValue,
      _setValue,
      _changeHandler
    });
    return () => {
      return createVNode(resolveComponent("uni-radio-group-element"), {
        "ref": uniRadioGroupElementRef
      }, {
        default: () => {
          var _slots$default;
          return [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)];
        }
      }, 512);
    };
  }
});
const radioGroup$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: radioGroup
}, Symbol.toStringTag, { value: "Module" });
class UniNavigatorElement extends UniElementImpl {
  constructor(data, pageNode) {
    super(data);
    this._getAttribute = (key) => {
      return null;
    };
  }
}
var navigatorProps = {
  url: {
    type: String,
    default: ""
  },
  openType: {
    type: String,
    default: "navigate"
  },
  delta: {
    type: Number,
    default: 1
  },
  animationType: {
    type: String,
    default: ""
  },
  animationDuration: {
    type: Number,
    default: 300
  },
  hoverClass: {
    type: String,
    default: "navigator-hover"
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
    default: 600
  }
};
const navigator = /* @__PURE__ */ defineBuiltInComponent({
  name: "Navigator",
  rootElement: {
    name: "uni-navigator-element",
    // @ts-expect-error not web element
    class: UniNavigatorElement
  },
  props: navigatorProps,
  emits: ["click"],
  setup(props, _ref) {
    var {
      emit,
      slots
    } = _ref;
    var $uniNavigatorElement = ref();
    var instance = getCurrentInstance();
    onMounted(() => {
      instance === null || instance === void 0 ? void 0 : instance.$waitNativeRender(() => {
        if (!instance)
          return;
        $uniNavigatorElement.value._getAttribute = (key) => {
          var _props$keyString$toSt, _props$keyString;
          var keyString = camelize(key);
          return props[keyString] !== null ? (_props$keyString$toSt = (_props$keyString = props[keyString]) === null || _props$keyString === void 0 ? void 0 : _props$keyString.toString()) !== null && _props$keyString$toSt !== void 0 ? _props$keyString$toSt : null : null;
        };
      });
    });
    var _onClick = ($event) => {
      var url = props.url;
      emit("click", $event);
      var animationDuration = props.animationDuration;
      switch (props.openType) {
        case "navigate":
          uni.navigateTo({
            url,
            animationType: props.animationType.length > 0 ? props.animationType : "pop-in",
            animationDuration
          });
          break;
        case "redirect":
          uni.redirectTo({
            url
          });
          break;
        case "switchTab":
          uni.switchTab({
            url
          });
          break;
        case "reLaunch":
          uni.reLaunch({
            url
          });
          break;
        case "navigateBack":
          uni.navigateBack({
            delta: props.delta,
            animationType: props.animationType.length > 0 ? props.animationType : "pop-out",
            animationDuration
          });
          break;
        default:
          console.log("<navigator/> openType attribute invalid");
          break;
      }
    };
    return () => {
      return createVNode(resolveComponent("uni-navigator-element"), {
        "ref": $uniNavigatorElement,
        "onClick": _onClick,
        "hoverClass": props.hoverClass,
        "hoverStopPropagation": props.hoverStopPropagation,
        "hoverStartTime": props.hoverStartTime,
        "hoverStayTime": props.hoverStayTime
      }, {
        default: () => {
          var _slots$default;
          return [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)];
        }
      }, 8, ["onClick", "hoverClass", "hoverStopPropagation", "hoverStartTime", "hoverStayTime"]);
    };
  }
});
const navigator$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: navigator
}, Symbol.toStringTag, { value: "Module" });
var BACKGROUND_COLOR = "#EBEBEB";
var PRIMARY_COLOR = "#007AFF";
var ANIMATE_INTERVAL_DEFAULT = 30;
var FONT_SIZE = 16;
var STROKE_WIDTH = 6;
class UniProgressActiveendEventDetail {
  constructor(value) {
    this.curPercent = value;
  }
}
class UniProgressActiveendEvent extends CustomEvent {
  constructor(value) {
    super("activeend", {
      detail: new UniProgressActiveendEventDetail(value)
    });
  }
}
class UniProgressElement extends UniElementImpl {
  constructor(data, pageNode) {
    super();
    this._getAttribute = (key) => {
      return null;
    };
  }
  getAttribute(key) {
    var value = this._getAttribute(key);
    if (value != null) {
      return value;
    }
    return super.getAttribute(key);
  }
}
var progressProps = {
  percent: {
    type: Number,
    default: 0
  },
  showInfo: {
    type: Boolean,
    default: false
  },
  borderRadius: {
    type: Number,
    default: 0
  },
  fontSize: {
    type: Number,
    default: FONT_SIZE
  },
  strokeWidth: {
    type: Number,
    default: STROKE_WIDTH
  },
  active: {
    type: Boolean,
    default: false
  },
  activeColor: {
    type: String,
    default: PRIMARY_COLOR
  },
  activeMode: {
    type: String,
    default: "backwards"
  },
  backgroundColor: {
    type: String,
    default: BACKGROUND_COLOR
  },
  duration: {
    type: Number,
    default: ANIMATE_INTERVAL_DEFAULT
  }
};
var _style = {
  "uni-progress": {
    "": {
      flexDirection: "row",
      alignItems: "center"
    }
  },
  "uni-progress-bar": {
    "": {
      flex: "1",
      overflow: "hidden"
    }
  },
  "uni-progress-info": {
    "": {
      marginLeft: "15px"
    }
  }
};
const progress = /* @__PURE__ */ defineBuiltInComponent({
  name: "Progress",
  rootElement: {
    name: "uni-progress-element",
    // @ts-expect-error not web element
    class: UniProgressElement
  },
  emit: ["activeend"],
  props: progressProps,
  setup(props, _ref) {
    var {
      emit,
      slots
    } = _ref;
    var data = reactive({
      $uniProgressElement: null,
      curPercent: 0,
      _timerId: 0,
      _lastPercent: 0
    });
    var textStr = "".concat(data.curPercent, "%");
    var instance = getCurrentInstance();
    var styleUniProgress = computed(() => _style["uni-progress"]);
    var styleUniProgressBar = computed(() => _style["uni-progress-bar"]);
    var barStyle = computed(() => {
      var style = {
        height: "".concat(props.strokeWidth, "px"),
        borderRadius: "".concat(props.borderRadius, "px"),
        backgroundColor: props.backgroundColor
      };
      return Object.assign({}, styleUniProgressBar.value[""], style);
    });
    var innerBarStyle = computed(() => {
      var style = {
        width: "".concat(data.curPercent, "%"),
        height: "".concat(props.strokeWidth, "px"),
        backgroundColor: "".concat(props.activeColor)
      };
      return Object.assign({}, style);
    });
    var textStyle = computed(() => {
      var fontSize = props.fontSize;
      var style = {
        fontSize: "".concat(fontSize, "px"),
        minWidth: "".concat(fontSize * 2, "px")
      };
      return Object.assign({}, style);
    });
    var finalPercent = computed(() => {
      var percent = props.percent;
      if (percent > 100)
        percent = 100;
      if (percent < 0)
        percent = 0;
      return percent;
    });
    watch(() => finalPercent.value, (_, oldVal) => {
      data._lastPercent = oldVal;
      clearTimer();
      _animate();
    });
    var _animate = () => {
      var percent = finalPercent.value;
      if (!props.active) {
        data.curPercent = percent;
        return;
      }
      data.curPercent = props.activeMode === "forwards" ? data._lastPercent : 0;
      data._timerId = setInterval(() => {
        if (percent <= data.curPercent + 1) {
          clearTimer();
          data.curPercent = percent;
          emit("activeend", new UniProgressActiveendEvent(percent));
        } else {
          ++data.curPercent;
        }
      }, props.duration);
    };
    var clearTimer = () => {
      clearInterval(data._timerId);
    };
    onMounted(() => {
      instance === null || instance === void 0 ? void 0 : instance.$waitNativeRender(() => {
        var _instance$proxy;
        if (!instance)
          return;
        data.$uniProgressElement = (_instance$proxy = instance.proxy) === null || _instance$proxy === void 0 ? void 0 : _instance$proxy.$el;
        data.$uniProgressElement._getAttribute = (key) => {
          var _props$keyString$toSt, _props$keyString;
          var keyString = camelize(key);
          return props[keyString] !== null ? (_props$keyString$toSt = (_props$keyString = props[keyString]) === null || _props$keyString === void 0 ? void 0 : _props$keyString.toString()) !== null && _props$keyString$toSt !== void 0 ? _props$keyString$toSt : null : null;
        };
      });
    });
    onUnmounted(() => {
      clearTimer();
    });
    return () => {
      return createVNode(resolveComponent("uni-progress-element"), {
        "class": "uni-progress",
        "style": styleUniProgress
      }, {
        default: () => [createVNode("view", {
          "class": "uni-progress-bar",
          "style": barStyle.value
        }, [createVNode("view", {
          "class": "uni-progress-inner-bar",
          "style": innerBarStyle.value
        }, null, 4)], 4), withDirectives(createVNode("text", {
          "class": "uni-progress-info",
          "style": textStyle.value
        }, [textStr], 4), [[resolveDirective("if"), "showInfo"]])],
        _: 2
      }, 8, ["style"]);
    };
  }
});
const progress$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: progress
}, Symbol.toStringTag, { value: "Module" });
class UniFormElement extends UniElementImpl {
  constructor(data, pageNode) {
    super(data, pageNode);
    _defineProperty(this, "_getAttribute", (key) => {
      return null;
    });
  }
}
class UniFormSubmitEventDetail {
  constructor(value) {
    _defineProperty(this, "value", {});
    this.value = value;
  }
}
class UniFormResetEventDetail {
}
class UniFormSubmitEvent extends CustomEvent {
  constructor(value) {
    super("change", {
      detail: new UniFormSubmitEventDetail(value)
    });
  }
}
class UniFormResetEvent extends CustomEvent {
  constructor() {
    super("change", {
      detail: new UniFormResetEventDetail()
    });
  }
}
const form = /* @__PURE__ */ defineBuiltInComponent({
  name: "Form",
  rootElement: {
    name: "uni-form-element",
    // @ts-expect-error not web element
    class: UniFormElement
  },
  emits: ["submit", "reset"],
  setup(_ref, _ref2) {
    var {
      emit,
      slots,
      expose
    } = _ref2;
    var formRef = ref(null);
    var instance;
    function setFormControlsData(formData) {
      var controls = [];
      findFormControls(instance.subTree, controls);
      controls.forEach((control, _) => {
        setFormData(formData, control.name, control.value);
      });
    }
    function setFormData(formData, name, value) {
      formData[name] = value;
    }
    function findFormControls(vNode, controls) {
      if (!Array.isArray(vNode.children)) {
        return;
      }
      var vNodes = vNode.children;
      vNodes.forEach((node) => {
        if (node.el instanceof UniFormControlElement) {
          var control = node.el;
          if (control.name.length > 0) {
            controls.push(control);
          }
        } else if (node.component != null)
          ;
        else {
          findFormControls(node, controls);
        }
      });
    }
    function submit() {
      var form_data_out = {};
      setFormControlsData(form_data_out);
      emit("submit", new UniFormSubmitEvent(form_data_out));
    }
    function reset() {
      var controls = [];
      findFormControls(instance.subTree, controls);
      controls.forEach((control, _) => {
        control.reset();
      });
      emit("reset", new UniFormResetEvent());
    }
    onMounted(() => {
      instance = getCurrentInstance();
      instance.$waitNativeRender(() => {
      });
    });
    expose({
      submit,
      reset
    });
    return () => {
      return createVNode(resolveComponent("uni-form-element"), {
        "ref": formRef
      }, {
        default: () => {
          var _slots$default;
          return [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)];
        }
      }, 512);
    };
  }
});
const form$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  UniFormElement,
  UniFormResetEvent,
  UniFormSubmitEvent,
  default: form
}, Symbol.toStringTag, { value: "Module" });
const components = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: button$1,
  Checkbox: checkbox$1,
  CheckboxGroup: checkboxGroup$1,
  Form: form$1,
  Navigator: navigator$1,
  Progress: progress$1,
  Radio: radio$1,
  RadioGroup: radioGroup$1
}, Symbol.toStringTag, { value: "Module" });
const index = {
  uni: uni$1,
  getApp: getApp$1,
  getCurrentPages: getCurrentPages$1,
  __definePage: definePage,
  __registerApp: registerApp,
  components
};
export {
  index as default
};
