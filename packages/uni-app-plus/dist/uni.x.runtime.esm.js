import { normalizeStyles, addLeadingSlash, invokeArrayFns, LINEFEED, parseQuery, ON_UNHANDLE_REJECTION, ON_PAGE_NOT_FOUND, ON_ERROR, ON_SHOW, ON_HIDE, EventChannel, once, ON_LAUNCH, ON_UNLOAD, ON_READY, parseUrl, ON_BACK_PRESS } from "@dcloudio/uni-shared";
import { extend, isString, isPlainObject, isFunction, isArray, isPromise, hasOwn, capitalize } from "@vue/shared";
import { createVNode, render, injectHook, getCurrentInstance, defineComponent, computed, ref, watch, onMounted, resolveComponent } from "vue";
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
var $export$1 = function(type, name, source) {
  var IS_FORCED = type & $export$1.F;
  var IS_GLOBAL = type & $export$1.G;
  var IS_STATIC = type & $export$1.S;
  var IS_PROTO = type & $export$1.P;
  var IS_BIND = type & $export$1.B;
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
      redefine$2(target, key, out, type & $export$1.U);
    if (exports[key] != out)
      hide$2(exports, key, exp);
    if (IS_PROTO && expProto[key] != out)
      expProto[key] = out;
  }
};
global$1.core = core;
$export$1.F = 1;
$export$1.G = 2;
$export$1.S = 4;
$export$1.P = 8;
$export$1.B = 16;
$export$1.W = 32;
$export$1.U = 64;
$export$1.R = 128;
var _export = $export$1;
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
var toIObject$2 = _toIobject;
var toLength = _toLength;
var toAbsoluteIndex = _toAbsoluteIndex;
var _arrayIncludes = function(IS_INCLUDES) {
  return function($this, el, fromIndex) {
    var O = toIObject$2($this);
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
var toIObject$1 = _toIobject;
var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO$2 = _sharedKey("IE_PROTO");
var _objectKeysInternal = function(object, names) {
  var O = toIObject$1(object);
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
var getKeys$1 = _objectKeys;
var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$1(O);
  var keys2 = getKeys$1(Properties);
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
var $export = _export;
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
    return function entries() {
      return new Constructor(this, kind);
    };
  };
  var TAG2 = NAME + " Iterator";
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR$1] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod("entries") : void 0;
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
      entries: $entries
    };
    if (FORCED)
      for (key in methods) {
        if (!(key in proto))
          redefine$1(proto, key, methods[key]);
      }
    else
      $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
var addToUnscopables = _addToUnscopables;
var step = _iterStep;
var Iterators$1 = _iterators;
var toIObject = _toIobject;
var es6_array_iterator = _iterDefine(Array, "Array", function(iterated, kind) {
  this._t = toIObject(iterated);
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
var getKeys = _objectKeys;
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
for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
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
var NavigateToOptions = /* @__PURE__ */ createRouteOptions(API_NAVIGATE_TO);
var RedirectToOptions = /* @__PURE__ */ createRouteOptions(API_REDIRECT_TO);
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
var nativeApp;
function getNativeApp() {
  return nativeApp;
}
function registerApp(appVm, app) {
  nativeApp = app;
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
var ON_POP_GESTURE = "onPopGesture";
function parsePageStyle(route) {
  var keys2 = ["navigationBarTitleText", "navigationBarBackgroundColor", "navigationBarTextStyle", "navigationStyle"];
  var style = /* @__PURE__ */ new Map();
  var routeMeta = route.meta;
  keys2.forEach((key) => {
    if (key in routeMeta) {
      style.set(key, routeMeta[key]);
    }
  });
  if (style.size && style.get("navigationBarTextStyle") !== "custom" && !routeMeta.isQuit) {
    style.set("navigationBarAutoBackButton", true);
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
  var nativePage = getNativeApp().pageManager.createPage(url, id2.toString(), pageStyle);
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
  var _uni$hideToast, _uni, _uni$hideLoading, _uni2;
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
  (_uni$hideToast = (_uni = uni).hideToast) === null || _uni$hideToast === void 0 ? void 0 : _uni$hideToast.call(_uni);
  (_uni$hideLoading = (_uni2 = uni).hideLoading) === null || _uni$hideLoading === void 0 ? void 0 : _uni$hideLoading.call(_uni2);
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
  if (hasOwn(methods, name + "ByJs")) {
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
  requireUTSPlugin
}, Symbol.toStringTag, { value: "Module" });
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
var SLIDER_TRACK_HEIGHT = 2;
var SLIDER_THUMB_SHADOW = 4;
var SLIDER_VALUE_WIDTH = 39;
var SLIDER_VALUE_FONT_SIZE = 14;
var SLIDER_BLOCK_SIZE_MIN_VALUE = 12;
var SLIDER_BLOCK_SIZE_MAX_VALUE = 28;
class UniSliderElement extends UniFormControlElement {
  constructor(data, pageNode) {
    super(data, pageNode);
    _defineProperty(this, "_initialValue", 0);
    _defineProperty(this, "_value", 0);
    _defineProperty(this, "onValueChanged", (value) => {
    });
  }
  get value() {
    return this._value;
  }
  set value(value) {
    if (this._value == value) {
      return;
    }
    this._value = value;
    this.onValueChanged(value);
  }
  reset() {
    this.value = this._initialValue;
  }
}
class SliderChangeEventDetail {
  constructor(value) {
    _defineProperty(this, "value", 0);
    this.value = value;
  }
}
class SliderChangeEvent extends CustomEvent {
  constructor(value) {
    super("change", {
      detail: new SliderChangeEventDetail(value)
    });
  }
}
const slider = /* @__PURE__ */ defineBuiltInComponent({
  name: "Slider",
  rootElement: {
    name: "uni-slider-element",
    // @ts-expect-error not web element
    class: UniSliderElement
  },
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "#888888"
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
      type: Number,
      default: SLIDER_BLOCK_SIZE_MAX_VALUE
    },
    showValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ["change", "changing"],
  setup(props, _ref) {
    var {
      emit
    } = _ref;
    var $data = {
      $sliderElement: null,
      $sliderWidth: 0,
      $sliderTrackWidth: 0,
      $sliderOffsetX: 0,
      $touchStartFlag: false,
      $drawContext: null
    };
    function _onTouchStart(e) {
      if (!props.disabled && e.changedTouches.length === 1 && !$data.$touchStartFlag) {
        if (props.showValue == true && e.changedTouches[0].screenX > $data.$sliderOffsetX + $data.$sliderTrackWidth + internalBlockSize.value / 2) {
          return;
        }
        $data.$touchStartFlag = true;
      }
    }
    function _onTouchMove(e) {
      if (!props.disabled && e.changedTouches.length === 1 && $data.$touchStartFlag) {
        _onTrackInputChange(e.changedTouches[0].screenX);
        emit("changing", new SliderChangeEvent($data.$sliderElement.value));
      }
    }
    function _onTouchEnd(e) {
      if (!props.disabled && $data.$touchStartFlag) {
        $data.$touchStartFlag = false;
        _onTrackInputChange(e.changedTouches[0].screenX);
        emit("change", new SliderChangeEvent($data.$sliderElement.value));
      }
    }
    function _onTrackInputChange(x) {
      var px2 = x - $data.$sliderOffsetX;
      if (px2 < 0) {
        px2 = 0;
      }
      if (px2 > $data.$sliderTrackWidth) {
        px2 = $data.$sliderTrackWidth;
      }
      var percentage = px2 / $data.$sliderTrackWidth;
      var value = props.min + (props.max - props.min) * percentage;
      if (percentage > 0 && percentage < 1) {
        value -= value % props.step;
      }
      if (Number.isInteger(props.step)) {
        $data.$sliderElement.value = parseInt(value + "");
      } else {
        var step_pair = props.step.toString().split(".");
        $data.$sliderElement.value = parseFloat(value.toFixed(step_pair[1].length));
        var value_pair = $data.$sliderElement.value.toString().split(".");
        if (value_pair.length > 1 && parseInt(value_pair[1]) == 0) {
          $data.$sliderElement.value = parseInt(value_pair[0]);
        }
      }
    }
    function _onLayout() {
      var _$data$$sliderElement, _$data$$sliderElement2;
      $data.$sliderWidth = (_$data$$sliderElement = $data.$sliderElement) === null || _$data$$sliderElement === void 0 ? void 0 : _$data$$sliderElement.offsetWidth;
      $data.$sliderOffsetX = ((_$data$$sliderElement2 = $data.$sliderElement) === null || _$data$$sliderElement2 === void 0 ? void 0 : _$data$$sliderElement2.offsetLeft) + internalBlockSize.value / 2;
      $data.$sliderTrackWidth = $data.$sliderWidth - internalBlockSize.value;
      if (props.showValue) {
        $data.$sliderTrackWidth -= SLIDER_VALUE_WIDTH;
      }
    }
    function _onRender() {
      var drawContext = $data.$drawContext;
      drawContext.reset();
      var radius = internalBlockSize.value / 2;
      var center_y = SLIDER_THUMB_SHADOW + radius;
      var value_width = $data.$sliderTrackWidth * _getValuePercentage();
      var thumb_center_x = value_width + radius;
      var line_bg_x = thumb_center_x + radius;
      var line_bg_w = $data.$sliderTrackWidth - line_bg_x + internalBlockSize.value;
      if (line_bg_w > 0) {
        drawContext.fillStyle = props.backgroundColor;
        drawContext.fillRect(line_bg_x, center_y, line_bg_w, SLIDER_TRACK_HEIGHT);
      }
      if (thumb_center_x > radius) {
        drawContext.fillStyle = props.activeColor;
        drawContext.fillRect(0, center_y, value_width, SLIDER_TRACK_HEIGHT);
      }
      drawContext.fillStyle = props.blockColor;
      drawContext.arc(thumb_center_x, center_y, radius, 0, 2 * Math.PI);
      drawContext.fill();
      drawContext.lineWidth = 1;
      for (var i = 0; i < SLIDER_THUMB_SHADOW; i++) {
        drawContext.strokeStyle = "rgba(100,100,100,0.0".concat(4 - i, ")");
        drawContext.beginPath();
        drawContext.arc(thumb_center_x, center_y, radius + i, 0, 2 * Math.PI);
        drawContext.stroke();
      }
      if (props.showValue) {
        drawContext.font = SLIDER_VALUE_FONT_SIZE + "px";
        drawContext.fillStyle = props.color;
        drawContext.fillText($data.$sliderElement.value.toString(), $data.$sliderTrackWidth + internalBlockSize.value + 3, center_y + SLIDER_VALUE_FONT_SIZE / 2 - 1);
      }
      drawContext.update();
    }
    function _getValuePercentage() {
      var value = $data.$sliderElement.value;
      if (value < props.min) {
        value = props.min;
      }
      if (value > props.max) {
        value = props.max;
      }
      return (value - props.min) / (props.max - props.min);
    }
    var internalBlockSize = computed(() => {
      return Math.min(Math.max(props.blockSize, SLIDER_BLOCK_SIZE_MIN_VALUE), SLIDER_BLOCK_SIZE_MAX_VALUE);
    });
    var sliderHeight = computed(() => {
      return internalBlockSize.value + SLIDER_THUMB_SHADOW * 2 + "px";
    });
    var sliderRef = ref(null);
    watch(() => {
      return props.value;
    }, (newVal) => {
      $data.$sliderElement.value = newVal;
    });
    onMounted(() => {
      var instance = getCurrentInstance();
      instance.$waitNativeRender(() => {
        $data.$sliderElement = sliderRef.value;
        $data.$sliderElement._initialValue = props.value;
        $data.$sliderElement._value = props.value;
        $data.$sliderElement.onValueChanged = (value) => {
          _onRender();
        };
        $data.$drawContext = $data.$sliderElement.getDrawableContext();
        _onLayout();
        _onRender();
      });
      watch(() => [props.showValue, props.blockSize], () => {
        _onLayout();
        _onRender();
      });
      watch(() => [props.disabled, props.color, props.backgroundColor, props.activeColor, props.selectedColor, props.blockColor], () => {
        _onRender();
      });
    });
    return () => {
      return createVNode(resolveComponent("uni-slider-element"), {
        "ref": sliderRef,
        "style": {
          height: sliderHeight.value
        },
        "onTouchstart": _onTouchStart,
        "onTouchmove": _onTouchMove,
        "onTouchend": _onTouchEnd
      }, null, 8, ["style", "onTouchstart", "onTouchmove", "onTouchend"]);
    };
  }
});
const slider$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SliderChangeEvent,
  UniSliderElement,
  default: slider
}, Symbol.toStringTag, { value: "Module" });
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
var styleList = {
  ub: {
    position: "relative",
    "text-align": "center",
    "padding-left": "14px",
    "padding-right": "14px",
    "overflow-x": "hidden",
    "overflow-y": "hidden",
    color: "rgb(0, 0, 0)",
    "background-color": "rgb(248, 248, 248)",
    "border-top-left-radius": "5px",
    "border-top-right-radius": "5px",
    "border-bottom-right-radius": "5px",
    "border-bottom-left-radius": "5px",
    "border-top-style": "solid",
    "border-right-style": "solid",
    "border-bottom-style": "solid",
    "border-left-style": "solid",
    "border-top-width": "0.5px",
    "border-right-width": "0.5px",
    "border-bottom-width": "0.5px",
    "border-left-width": "0.5px",
    "border-top-color": "rgba(0, 0, 0, 0.2)",
    "border-right-color": "rgba(0, 0, 0, 0.2)",
    "border-bottom-color": "rgba(0, 0, 0, 0.2)",
    "border-left-color": "rgba(0, 0, 0, 0.2)",
    "font-size": "18px",
    "line-height": "46px"
    // 'line-height': 2.55556,
  },
  ["ub-default"]: {
    color: "rgb(0, 0, 0)",
    "background-color": "rgb(248, 248, 248)"
  },
  ["ub-primary"]: {
    color: "rgb(255, 255, 255)",
    "background-color": "rgb(0, 122, 255)"
  },
  ["ub-warn"]: {
    color: "rgb(255, 255, 255)",
    "background-color": "rgb(230, 67, 64)"
  },
  ["ub-default-plain"]: {
    color: "rgb(53, 53, 53)",
    "border-top-color": "rgb(53, 53, 53)",
    "border-right-color": "rgb(53, 53, 53)",
    "border-bottom-color": "rgb(53, 53, 53)",
    "border-left-color": "rgb(53, 53, 53)",
    "background-color": "rgba(0, 0, 0, 0)",
    "border-top-width": "1px",
    "border-right-width": "1px",
    "border-bottom-width": "1px",
    "border-left-width": "1px"
  },
  ["ub-primary-plain"]: {
    color: "rgb(0, 122, 255)",
    "border-top-color": "rgb(0, 122, 255)",
    "border-right-color": "rgb(0, 122, 255)",
    "border-bottom-color": "rgb(0, 122, 255)",
    "border-left-color": "rgb(0, 122, 255)",
    "background-color": "rgba(0, 0, 0, 0)",
    "border-top-width": "1px",
    "border-right-width": "1px",
    "border-bottom-width": "1px",
    "border-left-width": "1px"
  },
  ["ub-warn-plain"]: {
    color: "rgb(230, 67, 64)",
    "border-top-color": "rgb(230, 67, 64)",
    "border-right-color": "rgb(230, 67, 64)",
    "border-bottom-color": "rgb(230, 67, 64)",
    "border-left-color": "rgb(230, 67, 64)",
    "background-color": "rgba(0, 0, 0, 0)",
    "border-top-width": "1px",
    "border-right-width": "1px",
    "border-bottom-width": "1px",
    "border-left-width": "1px"
  },
  ["ub-default-disabled"]: {
    color: "rgba(0, 0, 0, 0.3)",
    "background-color": "rgb(247, 247, 247)"
  },
  ["ub-primary-disabled"]: {
    color: "rgba(255, 255, 255, 0.6)",
    "background-color": "rgba(0, 122, 255, 0.6)"
  },
  ["ub-warn-disabled"]: {
    color: "rgba(255, 255, 255, 0.6)",
    "background-color": "rgb(236, 139, 137)"
  },
  ["ub-default-disabled-plain"]: {
    color: "rgba(0, 0, 0, 0.2)",
    "border-top-color": "rgba(0, 0, 0, 0.2)",
    "border-right-color": "rgba(0, 0, 0, 0.2)",
    "border-bottom-color": "rgba(0, 0, 0, 0.2)",
    "border-left-color": "rgba(0, 0, 0, 0.2)",
    "background-color": "rgba(0, 0, 0, 0)",
    "border-top-width": "1px",
    "border-right-width": "1px",
    "border-bottom-width": "1px",
    "border-left-width": "1px"
  },
  ["ub-primary-disabled-plain"]: {
    color: "rgba(0, 0, 0, 0.2)",
    "border-top-color": "rgba(0, 0, 0, 0.2)",
    "border-right-color": "rgba(0, 0, 0, 0.2)",
    "border-bottom-color": "rgba(0, 0, 0, 0.2)",
    "border-left-color": "rgba(0, 0, 0, 0.2)",
    "background-color": "rgba(0, 0, 0, 0)",
    "border-top-width": "1px",
    "border-right-width": "1px",
    "border-bottom-width": "1px",
    "border-left-width": "1px"
  },
  ["ub-warn-disabled-plain"]: {
    color: "rgba(0, 0, 0, 0.2)",
    "border-top-color": "rgba(0, 0, 0, 0.2)",
    "border-right-color": "rgba(0, 0, 0, 0.2)",
    "border-bottom-color": "rgba(0, 0, 0, 0.2)",
    "border-left-color": "rgba(0, 0, 0, 0.2)",
    "background-color": "rgba(0, 0, 0, 0)",
    "border-top-width": "1px",
    "border-right-width": "1px",
    "border-bottom-width": "1px",
    "border-left-width": "1px"
  },
  ["ub-mini"]: {
    "padding-top": "0px",
    "padding-bottom": "0px",
    "padding-right": "17.5px",
    "padding-left": "17.5px",
    // 'line-height': '2.3',
    "line-height": "30px",
    "font-size": "13px"
  }
};
var hoverStyles = /* @__PURE__ */ new Map([["default", /* @__PURE__ */ new Map([["color", "rgba(0, 0, 0, 0.6)"], ["backgroundColor", "#dedede"]])], ["primary", /* @__PURE__ */ new Map([["color", "rgba(255, 255, 255, 0.6)"], ["backgroundColor", "#0062cc"]])], ["warn", /* @__PURE__ */ new Map([["color", "rgba(255, 255, 255, 0.6)"], ["backgroundColor", "#ce3c39"]])], ["default-plain", /* @__PURE__ */ new Map([["color", "rgba(53, 53, 53, 0.6)"], ["borderColor", "rgba(53, 53, 53, 0.6)"], ["backgroundColor", "rgba(0, 0, 0, 0)"]])], ["primary-plain", /* @__PURE__ */ new Map([["color", "rgba(0, 122, 255, 0.6)"], ["borderColor", "rgba(0, 122, 255, 0.6)"], ["backgroundColor", "rgba(0, 0, 0, 0)"]])], ["warn-plain", /* @__PURE__ */ new Map([["color", "rgba(230, 67, 64, 0.6)"], ["borderColor", "rgba(230, 67, 64, 0.6)"], ["backgroundColor", "rgba(0, 0, 0, 0)"]])]]);
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
    parent.$callMethod(eventName, ...do_not_transform_spread);
  }
}
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
  emits: ["click"],
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
    console.log($hoverStartTimer, $hoverStayTimer);
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
      var styles = $buttonEl.ext.get("styles");
      if (styles != null) {
        var style = styles[cl];
        if (style != null) {
          Object.keys(style).forEach((key) => {
            $hoverClassStyle.set(key, style[key]);
          });
        }
      }
    }
    onMounted(() => {
      var instance = getCurrentInstance();
      if (instance) {
        instance.$waitNativeRender(() => {
          var _instance$proxy;
          $buttonEl = (_instance$proxy = instance.proxy) === null || _instance$proxy === void 0 ? void 0 : _instance$proxy.$el;
          parseHoverClass();
        });
      }
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
    }
    function touchmove(event) {
      if (props.disabled || props.hoverClass == "none") {
        return;
      }
    }
    function _onClick($event) {
      if (props.disabled) {
        return;
      }
      emit("click", $event);
      if (FORM_TYPES.indexOf(props.formType) > -1) {
        var _instance$parent;
        var instance = getCurrentInstance();
        var ctx2 = instance === null || instance === void 0 ? void 0 : (_instance$parent = instance.parent) === null || _instance$parent === void 0 ? void 0 : _instance$parent.proxy;
        $dispatch(ctx2, "Form", props.formType);
      }
    }
    var styleText = computed(() => {
      var classList = btnCls.value.split(" ");
      var basicStyle = Object.assign({}, styleList.ub);
      classList.forEach((cl) => {
        var style = styleList[cl];
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
const components = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: button$1,
  Slider: slider$1
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
