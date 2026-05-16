import { Emitter, EventChannel, ON_BACK_PRESS, ON_ERROR, ON_EXIT, ON_HIDE, ON_LAST_PAGE_BACK_PRESS, ON_LAUNCH, ON_PAGE_NOT_FOUND, ON_PAGE_SCROLL, ON_PULL_DOWN_REFRESH, ON_REACH_BOTTOM, ON_READY, ON_RESIZE, ON_SHOW, ON_UNHANDLE_REJECTION, ON_UNLOAD, PRIMARY_COLOR, UTSJSONObject, addLeadingSlash, cacheStringFunction, createRpx2Unit, defaultRpx2Unit, getLen, invokeArrayFns, invokeArrayFnsWithResults, normalizeStyles, once, parseQuery, parseUrl, plusReady, removeLeadingSlash } from "@dcloudio/uni-shared";
import { camelize, capitalize, extend, hasOwn, invokeArrayFns as invokeArrayFns$1, isArray, isFunction, isPlainObject, isPromise, isString, remove, toRawType, toTypeString } from "@vue/shared";
import { Fragment, camelize as camelize$1, computed, createCommentVNode, createElementBlock, createElementVNode, createMountPage, createVNode, defineComponent, getCurrentGenericInstance, getCurrentInstance, injectHook, isInSSRComponentSetup, nextTick, normalizeClass, normalizeStyle, onBeforeUnmount, onMounted, onUnmounted, openBlock, reactive, ref, renderSlot, unmountPage, watch, watchEffect, withModifiers } from "vue";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __esmMin = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_core.js
var require__core = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var core = module.exports = { version: "2.6.12" };
	if (typeof __e == "number") __e = core;
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_global.js
var require__global = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var global = module.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
	if (typeof __g == "number") __g = global;
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_library.js
var require__library = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = false;
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_shared.js
var require__shared = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var core = require__core();
	var global = require__global();
	var SHARED = "__core-js_shared__";
	var store = global[SHARED] || (global[SHARED] = {});
	(module.exports = function(key, value) {
		return store[key] || (store[key] = value !== void 0 ? value : {});
	})("versions", []).push({
		version: core.version,
		mode: require__library() ? "pure" : "global",
		copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_uid.js
var require__uid = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var id = 0;
	var px = Math.random();
	module.exports = function(key) {
		return "Symbol(".concat(key === void 0 ? "" : key, ")_", (++id + px).toString(36));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_wks.js
var require__wks = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var store = require__shared()("wks");
	var uid = require__uid();
	var Symbol = require__global().Symbol;
	var USE_SYMBOL = typeof Symbol == "function";
	var $exports = module.exports = function(name) {
		return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)("Symbol." + name));
	};
	$exports.store = store;
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_is-object.js
var require__is_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(it) {
		return typeof it === "object" ? it !== null : typeof it === "function";
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_an-object.js
var require__an_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isObject = require__is_object();
	module.exports = function(it) {
		if (!isObject(it)) throw TypeError(it + " is not an object!");
		return it;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_fails.js
var require__fails = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(exec) {
		try {
			return !!exec();
		} catch (e) {
			return true;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_descriptors.js
var require__descriptors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = !require__fails()(function() {
		return Object.defineProperty({}, "a", { get: function() {
			return 7;
		} }).a != 7;
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_dom-create.js
var require__dom_create = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isObject = require__is_object();
	var document = require__global().document;
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function(it) {
		return is ? document.createElement(it) : {};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_ie8-dom-define.js
var require__ie8_dom_define = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = !require__descriptors() && !require__fails()(function() {
		return Object.defineProperty(require__dom_create()("div"), "a", { get: function() {
			return 7;
		} }).a != 7;
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_to-primitive.js
var require__to_primitive = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isObject = require__is_object();
	module.exports = function(it, S) {
		if (!isObject(it)) return it;
		var fn, val;
		if (S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it))) return val;
		if (typeof (fn = it.valueOf) == "function" && !isObject(val = fn.call(it))) return val;
		if (!S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it))) return val;
		throw TypeError("Can't convert object to primitive value");
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_object-dp.js
var require__object_dp = /* @__PURE__ */ __commonJSMin(((exports) => {
	var anObject = require__an_object();
	var IE8_DOM_DEFINE = require__ie8_dom_define();
	var toPrimitive = require__to_primitive();
	var dP = Object.defineProperty;
	exports.f = require__descriptors() ? Object.defineProperty : function defineProperty(O, P, Attributes) {
		anObject(O);
		P = toPrimitive(P, true);
		anObject(Attributes);
		if (IE8_DOM_DEFINE) try {
			return dP(O, P, Attributes);
		} catch (e) {}
		if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
		if ("value" in Attributes) O[P] = Attributes.value;
		return O;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_property-desc.js
var require__property_desc = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(bitmap, value) {
		return {
			enumerable: !(bitmap & 1),
			configurable: !(bitmap & 2),
			writable: !(bitmap & 4),
			value
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_hide.js
var require__hide = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var dP = require__object_dp();
	var createDesc = require__property_desc();
	module.exports = require__descriptors() ? function(object, key, value) {
		return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value) {
		object[key] = value;
		return object;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_add-to-unscopables.js
var require__add_to_unscopables = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var UNSCOPABLES = require__wks()("unscopables");
	var ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == void 0) require__hide()(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key) {
		ArrayProto[UNSCOPABLES][key] = true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_iter-step.js
var require__iter_step = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(done, value) {
		return {
			value,
			done: !!done
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_iterators.js
var require__iterators = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_cof.js
var require__cof = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toString = {}.toString;
	module.exports = function(it) {
		return toString.call(it).slice(8, -1);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_iobject.js
var require__iobject = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var cof = require__cof();
	module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
		return cof(it) == "String" ? it.split("") : Object(it);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_defined.js
var require__defined = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(it) {
		if (it == void 0) throw TypeError("Can't call method on  " + it);
		return it;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_to-iobject.js
var require__to_iobject = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var IObject = require__iobject();
	var defined = require__defined();
	module.exports = function(it) {
		return IObject(defined(it));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_has.js
var require__has = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key) {
		return hasOwnProperty.call(it, key);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_function-to-string.js
var require__function_to_string = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require__shared()("native-function-to-string", Function.toString);
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_redefine.js
var require__redefine = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var global = require__global();
	var hide = require__hide();
	var has = require__has();
	var SRC = require__uid()("src");
	var $toString = require__function_to_string();
	var TO_STRING = "toString";
	var TPL = ("" + $toString).split(TO_STRING);
	require__core().inspectSource = function(it) {
		return $toString.call(it);
	};
	(module.exports = function(O, key, val, safe) {
		var isFunction = typeof val == "function";
		if (isFunction) has(val, "name") || hide(val, "name", key);
		if (O[key] === val) return;
		if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? "" + O[key] : TPL.join(String(key)));
		if (O === global) O[key] = val;
		else if (!safe) {
			delete O[key];
			hide(O, key, val);
		} else if (O[key]) O[key] = val;
		else hide(O, key, val);
	})(Function.prototype, TO_STRING, function toString() {
		return typeof this == "function" && this[SRC] || $toString.call(this);
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_a-function.js
var require__a_function = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(it) {
		if (typeof it != "function") throw TypeError(it + " is not a function!");
		return it;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_ctx.js
var require__ctx = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var aFunction = require__a_function();
	module.exports = function(fn, that, length) {
		aFunction(fn);
		if (that === void 0) return fn;
		switch (length) {
			case 1: return function(a) {
				return fn.call(that, a);
			};
			case 2: return function(a, b) {
				return fn.call(that, a, b);
			};
			case 3: return function(a, b, c) {
				return fn.call(that, a, b, c);
			};
		}
		return function() {
			return fn.apply(that, arguments);
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_export.js
var require__export = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var global = require__global();
	var core = require__core();
	var hide = require__hide();
	var redefine = require__redefine();
	var ctx = require__ctx();
	var PROTOTYPE = "prototype";
	var $export = function(type, name, source) {
		var IS_FORCED = type & $export.F;
		var IS_GLOBAL = type & $export.G;
		var IS_STATIC = type & $export.S;
		var IS_PROTO = type & $export.P;
		var IS_BIND = type & $export.B;
		var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
		var exports$1 = IS_GLOBAL ? core : core[name] || (core[name] = {});
		var expProto = exports$1[PROTOTYPE] || (exports$1[PROTOTYPE] = {});
		var key, own, out, exp;
		if (IS_GLOBAL) source = name;
		for (key in source) {
			own = !IS_FORCED && target && target[key] !== void 0;
			out = (own ? target : source)[key];
			exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == "function" ? ctx(Function.call, out) : out;
			if (target) redefine(target, key, out, type & $export.U);
			if (exports$1[key] != out) hide(exports$1, key, exp);
			if (IS_PROTO && expProto[key] != out) expProto[key] = out;
		}
	};
	global.core = core;
	$export.F = 1;
	$export.G = 2;
	$export.S = 4;
	$export.P = 8;
	$export.B = 16;
	$export.W = 32;
	$export.U = 64;
	$export.R = 128;
	module.exports = $export;
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_to-integer.js
var require__to_integer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function(it) {
		return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_to-length.js
var require__to_length = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toInteger = require__to_integer();
	var min = Math.min;
	module.exports = function(it) {
		return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_to-absolute-index.js
var require__to_absolute_index = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toInteger = require__to_integer();
	var max = Math.max;
	var min = Math.min;
	module.exports = function(index, length) {
		index = toInteger(index);
		return index < 0 ? max(index + length, 0) : min(index, length);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_array-includes.js
var require__array_includes = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toIObject = require__to_iobject();
	var toLength = require__to_length();
	var toAbsoluteIndex = require__to_absolute_index();
	module.exports = function(IS_INCLUDES) {
		return function($this, el, fromIndex) {
			var O = toIObject($this);
			var length = toLength(O.length);
			var index = toAbsoluteIndex(fromIndex, length);
			var value;
			if (IS_INCLUDES && el != el) while (length > index) {
				value = O[index++];
				if (value != value) return true;
			}
			else for (; length > index; index++) if (IS_INCLUDES || index in O) {
				if (O[index] === el) return IS_INCLUDES || index || 0;
			}
			return !IS_INCLUDES && -1;
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_shared-key.js
var require__shared_key = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var shared = require__shared()("keys");
	var uid = require__uid();
	module.exports = function(key) {
		return shared[key] || (shared[key] = uid(key));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_object-keys-internal.js
var require__object_keys_internal = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var has = require__has();
	var toIObject = require__to_iobject();
	var arrayIndexOf = require__array_includes()(false);
	var IE_PROTO = require__shared_key()("IE_PROTO");
	module.exports = function(object, names) {
		var O = toIObject(object);
		var i = 0;
		var result = [];
		var key;
		for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
		while (names.length > i) if (has(O, key = names[i++])) ~arrayIndexOf(result, key) || result.push(key);
		return result;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_enum-bug-keys.js
var require__enum_bug_keys = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_object-keys.js
var require__object_keys = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $keys = require__object_keys_internal();
	var enumBugKeys = require__enum_bug_keys();
	module.exports = Object.keys || function keys(O) {
		return $keys(O, enumBugKeys);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_object-dps.js
var require__object_dps = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var dP = require__object_dp();
	var anObject = require__an_object();
	var getKeys = require__object_keys();
	module.exports = require__descriptors() ? Object.defineProperties : function defineProperties(O, Properties) {
		anObject(O);
		var keys = getKeys(Properties);
		var length = keys.length;
		var i = 0;
		var P;
		while (length > i) dP.f(O, P = keys[i++], Properties[P]);
		return O;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_html.js
var require__html = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var document = require__global().document;
	module.exports = document && document.documentElement;
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_object-create.js
var require__object_create = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var anObject = require__an_object();
	var dPs = require__object_dps();
	var enumBugKeys = require__enum_bug_keys();
	var IE_PROTO = require__shared_key()("IE_PROTO");
	var Empty = function() {};
	var PROTOTYPE = "prototype";
	var createDict = function() {
		var iframe = require__dom_create()("iframe");
		var i = enumBugKeys.length;
		var lt = "<";
		var gt = ">";
		var iframeDocument;
		iframe.style.display = "none";
		require__html().appendChild(iframe);
		iframe.src = "javascript:";
		iframeDocument = iframe.contentWindow.document;
		iframeDocument.open();
		iframeDocument.write(lt + "script" + gt + "document.F=Object" + lt + "/script" + gt);
		iframeDocument.close();
		createDict = iframeDocument.F;
		while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
		return createDict();
	};
	module.exports = Object.create || function create(O, Properties) {
		var result;
		if (O !== null) {
			Empty[PROTOTYPE] = anObject(O);
			result = new Empty();
			Empty[PROTOTYPE] = null;
			result[IE_PROTO] = O;
		} else result = createDict();
		return Properties === void 0 ? result : dPs(result, Properties);
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_set-to-string-tag.js
var require__set_to_string_tag = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var def = require__object_dp().f;
	var has = require__has();
	var TAG = require__wks()("toStringTag");
	module.exports = function(it, tag, stat) {
		if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
			configurable: true,
			value: tag
		});
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_iter-create.js
var require__iter_create = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var create = require__object_create();
	var descriptor = require__property_desc();
	var setToStringTag = require__set_to_string_tag();
	var IteratorPrototype = {};
	require__hide()(IteratorPrototype, require__wks()("iterator"), function() {
		return this;
	});
	module.exports = function(Constructor, NAME, next) {
		Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
		setToStringTag(Constructor, NAME + " Iterator");
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_to-object.js
var require__to_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var defined = require__defined();
	module.exports = function(it) {
		return Object(defined(it));
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_object-gpo.js
var require__object_gpo = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var has = require__has();
	var toObject = require__to_object();
	var IE_PROTO = require__shared_key()("IE_PROTO");
	var ObjectProto = Object.prototype;
	module.exports = Object.getPrototypeOf || function(O) {
		O = toObject(O);
		if (has(O, IE_PROTO)) return O[IE_PROTO];
		if (typeof O.constructor == "function" && O instanceof O.constructor) return O.constructor.prototype;
		return O instanceof Object ? ObjectProto : null;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_iter-define.js
var require__iter_define = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	init_web_dom_iterable();
	var LIBRARY = require__library();
	var $export = require__export();
	var redefine = require__redefine();
	var hide = require__hide();
	var Iterators = require__iterators();
	var $iterCreate = require__iter_create();
	var setToStringTag = require__set_to_string_tag();
	var getPrototypeOf = require__object_gpo();
	var ITERATOR = require__wks()("iterator");
	var BUGGY = !([].keys && "next" in [].keys());
	var FF_ITERATOR = "@@iterator";
	var KEYS = "keys";
	var VALUES = "values";
	var returnThis = function() {
		return this;
	};
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
		$iterCreate(Constructor, NAME, next);
		var getMethod = function(kind) {
			if (!BUGGY && kind in proto) return proto[kind];
			switch (kind) {
				case KEYS: return function keys() {
					return new Constructor(this, kind);
				};
				case VALUES: return function values() {
					return new Constructor(this, kind);
				};
			}
			return function entries() {
				return new Constructor(this, kind);
			};
		};
		var TAG = NAME + " Iterator";
		var DEF_VALUES = DEFAULT == VALUES;
		var VALUES_BUG = false;
		var proto = Base.prototype;
		var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
		var $default = $native || getMethod(DEFAULT);
		var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod("entries") : void 0;
		var $anyNative = NAME == "Array" ? proto.entries || $native : $native;
		var methods, key, IteratorPrototype;
		if ($anyNative) {
			IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
			if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
				setToStringTag(IteratorPrototype, TAG, true);
				if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != "function") hide(IteratorPrototype, ITERATOR, returnThis);
			}
		}
		if (DEF_VALUES && $native && $native.name !== VALUES) {
			VALUES_BUG = true;
			$default = function values() {
				return $native.call(this);
			};
		}
		if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) hide(proto, ITERATOR, $default);
		Iterators[NAME] = $default;
		Iterators[TAG] = returnThis;
		if (DEFAULT) {
			methods = {
				values: DEF_VALUES ? $default : getMethod(VALUES),
				keys: IS_SET ? $default : getMethod(KEYS),
				entries: $entries
			};
			if (FORCED) {
				for (key in methods) if (!(key in proto)) redefine(proto, key, methods[key]);
			} else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
		}
		return methods;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/es6.array.iterator.js
var require_es6_array_iterator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var addToUnscopables = require__add_to_unscopables();
	var step = require__iter_step();
	var Iterators = require__iterators();
	var toIObject = require__to_iobject();
	module.exports = require__iter_define()(Array, "Array", function(iterated, kind) {
		this._t = toIObject(iterated);
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
		if (kind == "keys") return step(0, index);
		if (kind == "values") return step(0, O[index]);
		return step(0, [index, O[index]]);
	}, "values");
	Iterators.Arguments = Iterators.Array;
	addToUnscopables("keys");
	addToUnscopables("values");
	addToUnscopables("entries");
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/web.dom.iterable.js
var $iterators, getKeys, redefine, global, hide, Iterators, wks, ITERATOR, TO_STRING_TAG, ArrayValues, DOMIterables, collections, i, NAME, explicit, Collection, proto, key;
var init_web_dom_iterable = __esmMin((() => {
	$iterators = require_es6_array_iterator();
	getKeys = require__object_keys();
	redefine = require__redefine();
	global = require__global();
	hide = require__hide();
	Iterators = require__iterators();
	wks = require__wks();
	ITERATOR = wks("iterator");
	TO_STRING_TAG = wks("toStringTag");
	ArrayValues = Iterators.Array;
	DOMIterables = {
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
	for (collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
		NAME = collections[i];
		explicit = DOMIterables[NAME];
		Collection = global[NAME];
		proto = Collection && Collection.prototype;
		if (proto) {
			if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
			if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
			Iterators[NAME] = ArrayValues;
			if (explicit) {
				for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
			}
		}
	}
}));
//#endregion
//#region ../uni-core/src/helpers/util.ts
function PolySymbol(name) {
	return Symbol(name);
}
function get$pageByPage(page) {
	return page.vm.$basePage;
}
function getCurrentPage() {
	var pages = getCurrentPages();
	var len = pages.length;
	if (len) return pages[len - 1];
}
function getCurrentPageMeta() {
	var _getCurrentPage;
	var $page = (_getCurrentPage = getCurrentPage()) === null || _getCurrentPage === void 0 || (_getCurrentPage = _getCurrentPage.vm) === null || _getCurrentPage === void 0 ? void 0 : _getCurrentPage.$basePage;
	if ($page) return $page.meta;
}
function getCurrentPageVm() {
	var _getCurrentPage3;
	var page = (_getCurrentPage3 = getCurrentPage()) === null || _getCurrentPage3 === void 0 ? void 0 : _getCurrentPage3.vm;
	if (page) return page.$vm;
}
var PAGE_META_KEYS = ["navigationBar", "pullToRefresh"];
function initGlobalStyle() {
	return JSON.parse(JSON.stringify(__uniConfig.globalStyle || {}));
}
function initRouteMeta(pageMeta, id) {
	var globalStyle = initGlobalStyle();
	var res = extend({ id }, globalStyle, pageMeta);
	PAGE_META_KEYS.forEach((name) => {
		res[name] = extend({}, globalStyle[name], pageMeta[name]);
	});
	var { navigationBar } = res;
	navigationBar.titleText && navigationBar.titleImage && (navigationBar.titleText = "");
	return res;
}
function initPageInternalInstance(openType, url, pageQuery, meta, eventChannel, themeMode) {
	var { id, route } = meta;
	var titleColor = normalizeStyles(meta.navigationBar, __uniConfig.themeConfig, themeMode).titleColor;
	return {
		id,
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
//#endregion
//#region ../uni-core/src/helpers/hook.ts
function invokeHook(vm, name, args) {
	if (isString(vm)) {
		args = name;
		name = vm;
		vm = getCurrentPageVm();
	} else if (typeof vm === "number") {
		var page = getCurrentPages().find((page) => get$pageByPage(page).id === vm);
		if (page) vm = page.$vm;
		else vm = getCurrentPageVm();
	}
	if (!vm) return;
	if (vm.__call_hook) return vm.__call_hook(name, args);
	var hooks = vm.$[name];
	if (name === ON_BACK_PRESS) return hooks && invokeArrayFnsWithResults(hooks, args).some((ret) => ret === true);
	return hooks && invokeArrayFns(hooks, args);
}
//#endregion
//#region ../uni-core/src/helpers/route.ts
function normalizeRoute(toRoute) {
	if (toRoute.indexOf("/") === 0 || toRoute.indexOf("uni:") === 0) return toRoute;
	var fromRoute = "";
	var pages = getCurrentPages();
	if (pages.length) fromRoute = get$pageByPage(pages[pages.length - 1]).route;
	return getRealRoute(fromRoute, toRoute);
}
function getRealRoute(fromRoute, toRoute) {
	if (toRoute.indexOf("/") === 0) return toRoute;
	if (toRoute.indexOf("./") === 0) return getRealRoute(fromRoute, toRoute.slice(2));
	var toRouteArray = toRoute.split("/");
	var toRouteLength = toRouteArray.length;
	var i = 0;
	for (; i < toRouteLength && toRouteArray[i] === ".."; i++);
	toRouteArray.splice(0, i);
	toRoute = toRouteArray.join("/");
	var fromRouteArray = fromRoute.length > 0 ? fromRoute.split("/") : [];
	fromRouteArray.splice(fromRouteArray.length - i - 1, i + 1);
	return addLeadingSlash(fromRouteArray.concat(toRouteArray).join("/"));
}
function getRouteOptions(path) {
	if (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false) return __uniRoutes.find((route) => route.path === path || route.alias === path);
	return __uniRoutes.find((route) => route.path === path);
}
function getRouteMeta(path) {
	var routeOptions = getRouteOptions(path);
	if (routeOptions) return routeOptions.meta;
}
//#endregion
//#region ../uni-core/src/helpers/dialogPage.ts
var SYSTEM_DIALOG_PAGE_PATH_STARTER = "uni:";
var SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH = "uni:actionSheet";
function isSystemDialogPage(page) {
	return page.route.startsWith(SYSTEM_DIALOG_PAGE_PATH_STARTER);
}
function isSystemActionSheetDialogPage(page) {
	return page.route.startsWith(SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH);
}
function dialogPageTriggerParentHide(dialogPage) {
	dialogPageTriggerParentLifeCycle(dialogPage, ON_HIDE);
}
function dialogPageTriggerParentShow(dialogPage) {
	dialogPageTriggerParentLifeCycle(dialogPage, ON_SHOW, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0);
}
function dialogPageTriggerParentLifeCycle(dialogPage, lifeCycle) {
	var triggerParentHideDialogPageNum = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
	if (!dialogPage.$triggerParentHide) return;
	var pages = getCurrentPages();
	var currentPage = pages[pages.length - 1];
	if (!currentPage) return;
	var parentPage = dialogPage.getParentPage();
	if (!parentPage) return;
	if (parentPage !== currentPage) return;
	var dialogPages = currentPage.getDialogPages();
	for (var i = 0; i < dialogPages.length; i++) if (!!dialogPages[i].$triggerParentHide) {
		triggerParentHideDialogPageNum++;
		if (triggerParentHideDialogPageNum > 1) return;
	}
	if (triggerParentHideDialogPageNum <= 1) {
		var systemDialogPages = getSystemDialogPages(parentPage);
		for (var _i = 0; _i < systemDialogPages.length; _i++) if (!!systemDialogPages[_i].$triggerParentHide) {
			triggerParentHideDialogPageNum++;
			if (triggerParentHideDialogPageNum > 1) return;
		}
	}
	invokeHook(currentPage.vm, lifeCycle);
}
function getSystemDialogPages(parentPage) {
	if (!parentPage) return [];
	return typeof parentPage.__$$getSystemDialogPages === "undefined" ? parentPage.$getSystemDialogPages() : parentPage.__$$getSystemDialogPages();
}
function dialogPageTriggerPrevDialogPageLifeCycle(parentPage, lifeCycle) {
	if (!parentPage) return;
	var pages = getCurrentPages();
	var currentPage = pages[pages.length - 1];
	if (!currentPage || parentPage !== currentPage) return;
	var prevDialogPage = getLastDialogPage(currentPage);
	prevDialogPage && invokeHook(prevDialogPage.vm, lifeCycle);
}
function getLastDialogPage(parentPage) {
	var _lastSystemDialogPage, _lastDialogPage$vm;
	if (!parentPage) return null;
	var dialogPages = parentPage.getDialogPages();
	var systemDialogPages = getSystemDialogPages(parentPage);
	var lastSystemDialogPage = systemDialogPages[systemDialogPages.length - 1];
	var lastDialogPage = dialogPages[dialogPages.length - 1];
	if (!lastDialogPage) return lastSystemDialogPage;
	if (!lastSystemDialogPage) return lastDialogPage;
	return (((_lastSystemDialogPage = lastSystemDialogPage.vm) === null || _lastSystemDialogPage === void 0 || (_lastSystemDialogPage = _lastSystemDialogPage.$basePage) === null || _lastSystemDialogPage === void 0 ? void 0 : _lastSystemDialogPage.id) || Number.MAX_SAFE_INTEGER) > (((_lastDialogPage$vm = lastDialogPage.vm) === null || _lastDialogPage$vm === void 0 || (_lastDialogPage$vm = _lastDialogPage$vm.$basePage) === null || _lastDialogPage$vm === void 0 ? void 0 : _lastDialogPage$vm.id) || Number.MAX_SAFE_INTEGER) ? lastSystemDialogPage : lastDialogPage;
}
function invokeLastDialogPageHookByUniPage(parentPage, hook) {
	var lastDialogPage = getLastDialogPage(parentPage);
	if (lastDialogPage) invokeHook(lastDialogPage.vm, hook);
}
//#endregion
//#region ../uni-core/src/service/init/index.ts
init_web_dom_iterable();
function initPageVm(pageVm, page) {
	pageVm.route = page.route;
	pageVm.$vm = pageVm;
	pageVm.$basePage = page;
	pageVm.$mpType = "page";
	pageVm.$fontFamilySet = /* @__PURE__ */ new Set();
	if (page.meta.isTabBar) {
		pageVm.$.__isTabBar = true;
		pageVm.$.__isActive = true;
	}
}
//#endregion
//#region ../uni-core/src/service/utils.ts
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
//#endregion
//#region ../uni-api/src/helpers/api/catch.ts
function tryCatch(fn) {
	return function() {
		try {
			return fn.apply(fn, arguments);
		} catch (e) {
			console.error(e);
		}
	};
}
//#endregion
//#region ../uni-api/src/helpers/api/callback.ts
var invokeCallbackId = 1;
var invokeCallbacks = {};
function addInvokeCallback(id, name, callback) {
	invokeCallbacks[id] = {
		name,
		keepAlive: arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false,
		callback
	};
	return id;
}
function invokeCallback(id, res, extras) {
	if (typeof id === "number") {
		var opts = invokeCallbacks[id];
		if (opts) {
			if (!opts.keepAlive) delete invokeCallbacks[id];
			return opts.callback(res, extras);
		}
	}
	return res;
}
function findInvokeCallbackByName(name) {
	for (var key in invokeCallbacks) if (invokeCallbacks[key].name === name) return true;
	return false;
}
function removeKeepAliveApiCallback(name, callback) {
	for (var key in invokeCallbacks) {
		var item = invokeCallbacks[key];
		if (item.callback === callback && item.name === name) delete invokeCallbacks[key];
	}
}
function offKeepAliveApiCallback(name) {
	UniServiceJSBridge.off("api." + name);
}
function onKeepAliveApiCallback(name) {
	UniServiceJSBridge.on("api." + name, (res) => {
		for (var key in invokeCallbacks) {
			var opts = invokeCallbacks[key];
			if (opts.name === name) opts.callback(res);
		}
	});
}
function createKeepAliveApiCallback(name, callback) {
	return addInvokeCallback(invokeCallbackId++, name, callback, true);
}
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
function normalizeErrMsg(errMsg, name) {
	if (!errMsg || errMsg.indexOf(":fail") === -1) return name + ":ok";
	return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name) {
	var args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
	var { beforeAll, beforeSuccess } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
	if (!isPlainObject(args)) args = {};
	var { success, fail, complete } = getApiCallbacks(args);
	var hasSuccess = isFunction(success);
	var hasFail = isFunction(fail);
	var hasComplete = isFunction(complete);
	var callbackId = invokeCallbackId++;
	addInvokeCallback(callbackId, name, (res) => {
		res = res || {};
		res.errMsg = normalizeErrMsg(res.errMsg, name);
		isFunction(beforeAll) && beforeAll(res);
		if (res.errMsg === name + ":ok") {
			isFunction(beforeSuccess) && beforeSuccess(res, args);
			hasSuccess && success(res);
		} else hasFail && fail(res);
		hasComplete && complete(res);
	});
	return callbackId;
}
//#endregion
//#region ../uni-api/src/helpers/interceptor.ts
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
		if (promise) promise = Promise.resolve(wrapperHook(hook, params));
		else {
			var res = hook(data, params);
			if (isPromise(res)) promise = Promise.resolve(res);
			if (res === false) return {
				then() {},
				catch() {}
			};
		}
	}
	return promise || {
		then(callback) {
			return callback(data);
		},
		catch() {}
	};
}
function wrapperOptions(interceptors) {
	var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
	[
		HOOK_SUCCESS,
		HOOK_FAIL,
		HOOK_COMPLETE
	].forEach((name) => {
		var hooks = interceptors[name];
		if (!isArray(hooks)) return;
		var oldCallback = options[name];
		options[name] = function callbackInterceptor(res) {
			queue(hooks, res, options).then((res) => {
				return isFunction(oldCallback) && oldCallback(res) || res;
			});
		};
	});
	return options;
}
function wrapperReturnValue(method, returnValue) {
	var returnValueHooks = [];
	if (isArray(globalInterceptors.returnValue)) returnValueHooks.push(...globalInterceptors.returnValue);
	var interceptor = scopedInterceptors[method];
	if (interceptor && isArray(interceptor.returnValue)) returnValueHooks.push(...interceptor.returnValue);
	returnValueHooks.forEach((hook) => {
		returnValue = hook(returnValue) || returnValue;
	});
	return returnValue;
}
function getApiInterceptorHooks(method) {
	var interceptor = Object.create(null);
	Object.keys(globalInterceptors).forEach((hook) => {
		if (hook !== "returnValue") interceptor[hook] = globalInterceptors[hook].slice();
	});
	var scopedInterceptor = scopedInterceptors[method];
	if (scopedInterceptor) Object.keys(scopedInterceptor).forEach((hook) => {
		if (hook !== "returnValue") interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
	});
	return interceptor;
}
function invokeApi(method, api, options, params) {
	var interceptor = getApiInterceptorHooks(method);
	if (interceptor && Object.keys(interceptor).length) if (isArray(interceptor.invoke)) return queue(interceptor.invoke, options).then((options) => {
		return api(wrapperOptions(getApiInterceptorHooks(method), options), ...params);
	});
	else return api(wrapperOptions(interceptor, options), ...params);
	return api(options, ...params);
}
//#endregion
//#region ../uni-api/src/helpers/api/promise.ts
function hasCallback(args) {
	if (isPlainObject(args) && [
		"success",
		"fail",
		"complete"
	].find((cb) => isFunction(args[cb]))) return true;
	return false;
}
function handlePromise(promise) {
	return promise;
}
function promisify(name, fn) {
	return function() {
		var args = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) rest[_key - 1] = arguments[_key];
		if (hasCallback(args)) return wrapperReturnValue(name, invokeApi(name, fn, extend({}, args), rest));
		return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
			invokeApi(name, fn, extend({}, args, {
				success: resolve,
				fail: reject
			}), rest);
		})));
	};
}
//#endregion
//#region ../uni-api/src/helpers/api/index.ts
function formatApiArgs(args, options) {
	var params = args[0];
	if (!options || !options.formatArgs || !isPlainObject(options.formatArgs) && isPlainObject(params)) return;
	var formatArgs = options.formatArgs;
	var keys = Object.keys(formatArgs);
	for (var i = 0; i < keys.length; i++) {
		var name = keys[i];
		var formatterOrDefaultValue = formatArgs[name];
		if (isFunction(formatterOrDefaultValue)) {
			var errMsg = formatterOrDefaultValue(args[0][name], params);
			if (isString(errMsg)) return errMsg;
		} else if (!hasOwn(params, name)) params[name] = formatterOrDefaultValue;
	}
}
function invokeSuccess(id, name, res) {
	var result = { errMsg: name + ":ok" };
	result.errSubject = name;
	return invokeCallback(id, extend(res || {}, result));
}
function invokeFail(id, name, errMsg) {
	var errRes = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
	var errMsgPrefix = name + ":fail";
	var apiErrMsg = "";
	if (!errMsg) apiErrMsg = errMsgPrefix;
	else if (errMsg.indexOf(errMsgPrefix) === 0) apiErrMsg = errMsg;
	else apiErrMsg = errMsgPrefix + " " + errMsg;
	var res = extend({ errMsg: apiErrMsg }, errRes);
	if (typeof UniError !== "undefined") res = typeof errRes.errCode !== "undefined" ? new UniError(name, errRes.errCode, apiErrMsg) : new UniError(apiErrMsg, errRes);
	return invokeCallback(id, res);
}
function beforeInvokeApi(name, args, protocol, options) {
	if (options && options.beforeInvoke) {
		var _errMsg = options.beforeInvoke(args);
		if (isString(_errMsg)) return _errMsg;
	}
	var errMsg = formatApiArgs(args, options);
	if (errMsg) return errMsg;
}
function checkCallback(callback) {
	if (!isFunction(callback)) throw new Error("Invalid args: type check failed for args \"callback\". Expected Function");
}
function wrapperOnApi(name, fn, options) {
	return (callback) => {
		checkCallback(callback);
		var errMsg = beforeInvokeApi(name, [callback], void 0, options);
		if (errMsg) throw new Error(errMsg);
		var isFirstInvokeOnApi = !findInvokeCallbackByName(name);
		createKeepAliveApiCallback(name, callback);
		if (isFirstInvokeOnApi) {
			onKeepAliveApiCallback(name);
			fn();
		}
	};
}
function wrapperOffApi(name, fn, options) {
	return (callback) => {
		checkCallback(callback);
		var errMsg = beforeInvokeApi(name, [callback], void 0, options);
		if (errMsg) throw new Error(errMsg);
		name = name.replace("off", "on");
		removeKeepAliveApiCallback(name, callback);
		if (!findInvokeCallbackByName(name)) {
			offKeepAliveApiCallback(name);
			fn();
		}
	};
}
function parseErrMsg(errMsg) {
	if (!errMsg || isString(errMsg)) return errMsg;
	if (errMsg.stack) return errMsg.message;
	return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
	return (args) => {
		var id = createAsyncApiCallback(name, args, options);
		var errMsg = beforeInvokeApi(name, [args], protocol, options);
		if (errMsg) return invokeFail(id, name, errMsg);
		return fn(args, {
			resolve: (res) => invokeSuccess(id, name, res),
			reject: (errMsg, errRes) => invokeFail(id, name, parseErrMsg(errMsg), errRes)
		});
	};
}
function wrapperSyncApi(name, fn, protocol, options) {
	return function() {
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		var errMsg = beforeInvokeApi(name, args, protocol, options);
		if (errMsg) throw new Error(errMsg);
		return fn.apply(null, args);
	};
}
function wrapperAsyncApi(name, fn, protocol, options) {
	return wrapperTaskApi(name, fn, protocol, options);
}
function defineOnApi(name, fn, options) {
	return wrapperOnApi(name, fn, options);
}
function defineOffApi(name, fn, options) {
	return wrapperOffApi(name, fn, options);
}
function defineTaskApi(name, fn, protocol, options) {
	return promisify(name, wrapperTaskApi(name, fn, void 0, options));
}
function defineSyncApi(name, fn, protocol, options) {
	return wrapperSyncApi(name, fn, void 0, options);
}
function defineAsyncApi(name, fn, protocol, options) {
	return promisify(name, wrapperAsyncApi(name, fn, void 0, options));
}
//#endregion
//#region src/service/framework/app/vueApp.ts
var vueApp;
function getVueApp() {
	return vueApp;
}
function initVueApp(appVm) {
	var internalInstance = appVm.$;
	Object.defineProperty(internalInstance.ctx, "$children", { get() {
		return getAllPages().map((page) => page.$vm);
	} });
	var appContext = internalInstance.appContext;
	var mountPage = createMountPage(appContext);
	vueApp = extend(appContext.app, {
		mountPage(pageComponent, pageProps, pageContainer) {
			return mountPage(pageComponent, pageProps, pageContainer);
		},
		unmountPage: (pageInstance) => {
			unmountPage(pageInstance);
		}
	});
}
//#endregion
//#region src/service/framework/page/getCurrentPages.ts
function getPage$BasePage(page) {
	return page.$basePage;
}
var pages = [];
function addCurrentPage(page) {
	var $page = getPage$BasePage(page);
	if (!$page.meta.isNVue) return pages.push(page);
	var index = pages.findIndex((p) => getPage$BasePage(p).id === $page.id);
	if (index > -1) pages.splice(index, 1, page);
	else pages.push(page);
}
function getAllPages() {
	return pages;
}
function getCurrentPages$1() {
	return getCurrentBasePages().map((page) => page.$page);
}
function getCurrentBasePages() {
	var curPages = [];
	pages.forEach((page) => {
		if (page.$.__isTabBar) {
			if (page.$.__isActive) curPages.push(page);
		} else curPages.push(page);
	});
	return curPages;
}
function removePage(curPage) {
	var index = pages.findIndex((page) => page === curPage);
	if (index === -1) return;
	if (!getPage$BasePage(curPage).meta.isNVue) getVueApp().unmountPage(curPage);
	pages.splice(index, 1);
	var ins = curPage;
	if (ins.$.page) {
		ins.$.page.vm = null;
		ins.$.page = null;
	}
}
cacheStringFunction((filepath) => {
	return plus.io.convertLocalFileSystemURL(filepath).replace(/^\/?apps\//, "/android_asset/apps/").replace(/\/$/, "");
});
//#endregion
//#region src/service/framework/app/utils.ts
function backbuttonListener() {
	uni.navigateBack({
		from: "backbutton",
		success() {}
	});
}
var enterOptions$1 = /* @__PURE__ */ createLaunchOptions();
var launchOptions$1 = /* @__PURE__ */ createLaunchOptions();
function getLaunchOptions() {
	return extend({}, launchOptions$1);
}
function initLaunchOptions(_ref2) {
	var { path, query, referrerInfo, appScheme, appLink } = _ref2;
	extend(launchOptions$1, {
		path,
		query: query ? parseQuery(query) : {},
		referrerInfo: referrerInfo || {},
		channel: void 0,
		launcher: void 0,
		appScheme,
		appLink
	});
	launchOptions$1.query = new UTSJSONObject(launchOptions$1.query);
	extend(enterOptions$1, launchOptions$1);
	return enterOptions$1;
}
//#endregion
//#region src/x/constants.ts
var ON_BACK_BUTTON = "onBackButton";
var ON_POP_GESTURE = "onPopGesture";
var OPEN_DIALOG_PAGE = "openDialogPage";
//#endregion
//#region src/x/framework/page/dialogPage.ts
var homeDialogPages = [];
var homeSystemDialogPages = [];
var currentNormalDialogPage = null;
function setCurrentNormalDialogPage(value) {
	currentNormalDialogPage = value;
}
function getCurrentNormalDialogPage() {
	return currentNormalDialogPage;
}
var currentSystemDialogPage = null;
function setCurrentSystemDialogPage(value) {
	currentSystemDialogPage = value;
}
function getCurrentSystemDialogPage() {
	return currentSystemDialogPage;
}
//#endregion
//#region src/x/framework/page/setup.ts
function setupXPage(instance, pageInstance, pageVm, pageId, pagePath) {
	instance.$dialogPages = ref([]);
	var uniPage;
	if (pageInstance.openType === "openDialogPage") if (pagePath.startsWith("uni:")) {
		uniPage = getCurrentSystemDialogPage();
		setCurrentSystemDialogPage(null);
	} else {
		uniPage = getCurrentNormalDialogPage();
		setCurrentNormalDialogPage(null);
	}
	else uniPage = new UniNormalPageImpl();
	pageVm.$.page = uniPage;
	uniPage.route = pageVm.$basePage.route;
	uniPage.optionsByJS = pageVm.$basePage.options;
	Object.defineProperty(uniPage, "options", { get: function() {
		return new UTSJSONObject(pageVm.$basePage.options);
	} });
	uniPage.vm = pageVm;
	uniPage.$vm = pageVm;
	if (getPage$BasePage(pageVm).openType !== "openDialogPage") addCurrentPageWithInitScope(pageId, pageVm, pageInstance);
}
//#endregion
//#region src/x/framework/app/app.ts
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
//#endregion
//#region src/x/api/ui/loadFontFace.ts
function removeUrlWrap(source) {
	if (source.startsWith("url(")) {
		if (source.split("format(").length > 1) source = source.split("format(")[0].trim();
		source = source.substring(4, source.length - 1);
	}
	if (source.startsWith("\"") || source.startsWith("'")) source = source.substring(1, source.length - 1);
	return source;
}
function getLoadFontFaceOptions(options, res) {
	return {
		family: options.family,
		source: options.source,
		success: (_) => {
			res.resolve(null);
		},
		fail: (error) => {
			res.reject(error.errMsg, error.errCode);
		}
	};
}
/**
* uni.loadFontFace
* 注意：iOS 目前不支持页面级别的加载，功能实际不生效。
* 只支持全局加载
*/
var loadFontFace = /* @__PURE__ */ defineAsyncApi(API_LOAD_FONT_FACE, (options, res) => {
	options.source = removeUrlWrap(options.source);
	if (options.global === true) {
		var app = getNativeApp();
		var fontInfo = getLoadFontFaceOptions(options, res);
		app.loadFontFace(fontInfo);
	} else {
		var page = getCurrentPage().vm;
		if (!page) {
			res.reject("page is not ready", 99);
			return;
		}
		if (page.$fontFamilySet.has(options.family)) return;
		page.$fontFamilySet.add(options.family);
		var _fontInfo = getLoadFontFaceOptions(options, res);
		page.$nativePage.loadFontFace(_fontInfo);
	}
}, LoadFontFaceProtocol);
//#endregion
//#region src/x/framework/utils.ts
/**
* 解析 css 中的 @font-face 规则，并加载字体
* todo: 目前 ios 中的样式后续可能会调整为 map
* @param styles 用户自定义样式
* @param global 是否全局生效
*/
function loadFontFaceByStyles(styles, global) {
	styles = Array.isArray(styles) ? styles : [styles];
	var fontFaceStyle = [];
	styles.forEach((style) => {
		if (style["@FONT-FACE"]) fontFaceStyle.push(...style["@FONT-FACE"]);
	});
	if (fontFaceStyle.length === 0) return;
	fontFaceStyle.forEach((style) => {
		var fontFamily = style["fontFamily"];
		var fontWeight = style["fontWeight"];
		var fontStyle = style["fontStyle"];
		var fontVariant = style["fontVariant"];
		var src = style["src"];
		if (fontFamily != null && src != null) loadFontFace({
			global,
			family: fontFamily,
			source: src,
			desc: {
				style: fontStyle,
				weight: fontWeight,
				variant: fontVariant
			}
		});
		else console.warn("loadFontFace: fail, font-family or src is null");
	});
}
//#endregion
//#region src/x/framework/app/initComponentInstance.ts
function initNativePage(vm) {
	var instance = vm.$;
	if (instance.type.mpType === "app") return;
	var pageId = instance.root.attrs.__pageId;
	vm.$nativePage = getNativeApp().pageManager.findPageById(pageId + "");
	if (vm.$page) vm.$page.__nativePageId = vm.$nativePage.pageId;
}
function initFontFace(vm) {
	var _vm$$options$styles;
	if (vm.$.type.mpType === "app") return;
	loadFontFaceByStyles((_vm$$options$styles = vm.$options.styles) !== null && _vm$$options$styles !== void 0 ? _vm$$options$styles : [], false);
}
function initComponentInstance(app) {
	app.config.uniX = {
		beforeSetupPage,
		initNativePage,
		initFontFace
	};
	!app.vapor && app.mixin({
		beforeCreate() {
			initNativePage(this);
		},
		beforeMount() {
			initFontFace(this);
		}
	});
}
//#endregion
//#region src/service/framework/page/setup.ts
var beforeSetupPage = (props, ctx) => {
	var { attrs: { __pageId, __pagePath, __pageInstance } } = ctx;
	var instance = getCurrentGenericInstance();
	var pageVm = instance.proxy;
	initPageVm(pageVm, __pageInstance);
	setupXPage(instance, __pageInstance, pageVm, __pageId, __pagePath);
	initNativePage(pageVm);
};
function setupPage(component) {
	if (!component.__vapor) {
		var oldSetup = component.setup;
		component.inheritAttrs = false;
		component.setup = (props, ctx) => {
			beforeSetupPage(props, ctx);
			if (oldSetup) return oldSetup(props, ctx);
		};
	}
	return component;
}
function initScope(pageId, vm, pageInstance) {
	Object.defineProperty(vm, "$viewToTempFilePath", { get() {
		return vm.$nativePage.viewToTempFilePath.bind(vm.$nativePage);
	} });
	Object.defineProperty(vm, "$getPageStyle", { get() {
		return vm.$nativePage.getPageStyle.bind(vm.$nativePage);
	} });
	Object.defineProperty(vm, "$setPageStyle", { get() {
		return vm.$nativePage.setPageStyle.bind(vm.$nativePage);
	} });
	vm.getOpenerEventChannel = () => {
		if (!pageInstance.eventChannel) pageInstance.eventChannel = new EventChannel(pageId);
		return pageInstance.eventChannel;
	};
	return vm;
}
function addCurrentPageWithInitScope(pageId, pageVm, pageInstance) {
	addCurrentPage(initScope(pageId, pageVm, pageInstance));
}
//#endregion
//#region src/service/framework/page/define.ts
init_web_dom_iterable();
function isVuePageAsyncComponent(component) {
	return isFunction(component);
}
var pagesMap = /* @__PURE__ */ new Map();
function definePage(pagePath, asyncComponent) {
	pagesMap.set(pagePath, once(createPageFactory(asyncComponent)));
}
function createPageFactory(component) {
	return () => {
		if (isVuePageAsyncComponent(component)) return component().then((component) => setupPage(clonedPageComponent(component.default || component)));
		return setupPage(clonedPageComponent(component));
	};
}
function clonedPageComponent(component) {
	return extend({}, component);
}
//#endregion
//#region src/service/framework/page/routeOptions.ts
function initRouteOptions(path, openType) {
	var routeOptions = JSON.parse(JSON.stringify(getRouteOptions(path)));
	routeOptions.meta = initRouteMeta(routeOptions.meta);
	if (openType !== "preloadPage" && !__uniConfig.realEntryPagePath && (openType === "reLaunch" || getCurrentPages().length === 0)) routeOptions.meta.isQuit = true;
	else if (!routeOptions.meta.isTabBar) routeOptions.meta.isQuit = false;
	return routeOptions;
}
//#endregion
//#region src/service/framework/webview/utils.ts
var id = 1;
function getWebviewId() {
	return id;
}
function genWebviewId() {
	return id++;
}
function resetWebviewId() {
	id = 1;
}
//#endregion
//#region src/service/constants.ts
var downgrade = false;
var ANI_SHOW = downgrade ? "slide-in-right" : "pop-in";
var ANI_CLOSE = downgrade ? "slide-out-right" : "pop-out";
//#endregion
//#region src/x/framework/route/index.ts
function hasLeadingSlash(str) {
	return str.indexOf("/") == 0;
}
function getRealPath(path) {
	var fix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
	if (hasLeadingSlash(path)) return path;
	if (fix && path.indexOf(".") !== 0) return "/" + path;
	var currentPage = getCurrentPage().vm;
	var currentPathArray = (!currentPage ? "/" : parseUrl(currentPage.route).path).split("/");
	var pathArray = path.split("/");
	var resultArray = [];
	for (var index = 0; index < pathArray.length; index++) {
		var element = pathArray[index];
		if (element == "..") currentPathArray.pop();
		else if (element != ".") resultArray.push(element);
	}
	return addLeadingSlash(currentPathArray.concat(resultArray).join("/"));
}
var systemRoutes = [];
function registerSystemRoute(route, page) {
	var meta = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
	if (systemRoutes.find((r) => r.path === route)) return;
	systemRoutes.push({
		path: route,
		meta: extend({
			isQuit: false,
			isEntry: false,
			route,
			navigationBar: {}
		}, meta)
	});
	definePage(route, page);
}
//#endregion
//#region ../uni-api/src/protocols/base/interceptor.ts
var API_ADD_INTERCEPTOR = "addInterceptor";
var API_REMOVE_INTERCEPTOR = "removeInterceptor";
var AddInterceptorProtocol = [{
	name: "method",
	type: [String, Object],
	required: true
}];
var RemoveInterceptorProtocol = AddInterceptorProtocol;
//#endregion
//#region ../uni-api/src/service/base/interceptor.ts
function mergeInterceptorHook(interceptors, interceptor) {
	Object.keys(interceptor).forEach((hook) => {
		if (isFunction(interceptor[hook])) interceptors[hook] = mergeHook(interceptors[hook], interceptor[hook]);
	});
}
function removeInterceptorHook(interceptors, interceptor) {
	if (!interceptors || !interceptor) return;
	Object.keys(interceptor).forEach((name) => {
		var hooks = interceptors[name];
		var hook = interceptor[name];
		if (isArray(hooks) && isFunction(hook)) remove(hooks, hook);
	});
}
function mergeHook(parentVal, childVal) {
	var res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
	var res = [];
	for (var i = 0; i < hooks.length; i++) if (res.indexOf(hooks[i]) === -1) res.push(hooks[i]);
	return res;
}
var addInterceptor = /* @__PURE__ */ defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
	if (isString(method) && isPlainObject(interceptor)) mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
	else if (isPlainObject(method)) mergeInterceptorHook(globalInterceptors, method);
}, AddInterceptorProtocol);
var removeInterceptor = /* @__PURE__ */ defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
	if (isString(method)) if (isPlainObject(interceptor)) removeInterceptorHook(scopedInterceptors[method], interceptor);
	else delete scopedInterceptors[method];
	else if (isPlainObject(method)) removeInterceptorHook(globalInterceptors, method);
}, RemoveInterceptorProtocol);
//#endregion
//#region ../uni-api/src/protocols/base/eventBus.ts
var OnProtocol = [{
	name: "event",
	type: String,
	required: true
}, {
	name: "callback",
	type: Function,
	required: true
}];
var API_ONCE = "$once";
var OnceProtocol = OnProtocol;
var API_OFF = "$off";
var OffProtocol = [{
	name: "event",
	type: [String, Array]
}, {
	name: "callback",
	type: [Function, Number]
}];
var API_EMIT = "$emit";
var EmitProtocol = [{
	name: "event",
	type: String,
	required: true
}];
//#endregion
//#region ../uni-api/src/service/base/eventBus.ts
var EventBus = class {
	constructor() {
		this.$emitter = new Emitter();
	}
	on(name, callback) {
		return this.$emitter.on(name, callback);
	}
	once(name, callback) {
		return this.$emitter.once(name, callback);
	}
	off(name, callback) {
		if (!name) {
			this.$emitter.e = {};
			return;
		}
		this.$emitter.off(name, callback);
	}
	emit(name) {
		for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
		this.$emitter.emit(name, ...args);
	}
};
var eventBus = new EventBus();
var $on = /* @__PURE__ */ defineSyncApi("$on", (name, callback) => {
	return eventBus.on(name, callback);
}, OnProtocol);
var $once = /* @__PURE__ */ defineSyncApi(API_ONCE, (name, callback) => {
	return eventBus.once(name, callback);
}, OnceProtocol);
var $off = /* @__PURE__ */ defineSyncApi(API_OFF, (name, callback) => {
	if (!isArray(name)) name = name ? [name] : [];
	name.forEach((n) => {
		eventBus.off(n, callback);
		if (typeof __uniappx__nativeEventBus !== "undefined") __uniappx__nativeEventBus.off(n, callback);
	});
}, OffProtocol);
var $emit = /* @__PURE__ */ defineSyncApi(API_EMIT, function(name) {
	for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
	eventBus.emit(name, ...args);
}, EmitProtocol);
//#endregion
//#region ../uni-api/src/service/base/__f__.ts
function __f__(type, filename) {
	for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
	if (filename) args.push(filename);
	console[type].apply(console, args);
}
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_object-pie.js
var require__object_pie = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.f = {}.propertyIsEnumerable;
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/_object-to-array.js
var require__object_to_array = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var DESCRIPTORS = require__descriptors();
	var getKeys = require__object_keys();
	var toIObject = require__to_iobject();
	var isEnum = require__object_pie().f;
	module.exports = function(isEntries) {
		return function(it) {
			var O = toIObject(it);
			var keys = getKeys(O);
			var length = keys.length;
			var i = 0;
			var result = [];
			var key;
			while (length > i) {
				key = keys[i++];
				if (!DESCRIPTORS || isEnum.call(O, key)) result.push(isEntries ? [key, O[key]] : O[key]);
			}
			return result;
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/core-js@2.6.12/node_modules/core-js/modules/es7.object.values.js
var $export = require__export();
var $values = require__object_to_array()(false);
$export($export.S, "Object", { values: function values(it) {
	return $values(it);
} });
//#endregion
//#region ../uni-api/src/service/lifecycle/app.ts
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
//#endregion
//#region ../uni-api/src/protocols/route/encodeQueryString.ts
function encodeQueryString(url) {
	if (!isString(url)) return url;
	var index = url.indexOf("?");
	if (index === -1) return url;
	var query = url.slice(index + 1).trim().replace(/^(\?|#|&)/, "");
	if (!query) return url;
	url = url.slice(0, index);
	var params = [];
	query.split("&").forEach((param) => {
		var parts = param.replace(/\+/g, " ").split("=");
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join("=") : "";
		params.push(key + "=" + encodeURIComponent(val));
	});
	return params.length ? url + "?" + params.join("&") : url;
}
//#endregion
//#region ../uni-api/src/protocols/route/route.ts
var ANIMATION_IN = [
	"slide-in-right",
	"slide-in-left",
	"slide-in-top",
	"slide-in-bottom",
	"fade-in",
	"zoom-out",
	"zoom-fade-out",
	"pop-in",
	"none"
];
var ANIMATION_OUT = [
	"slide-out-right",
	"slide-out-left",
	"slide-out-top",
	"slide-out-bottom",
	"fade-out",
	"zoom-in",
	"zoom-fade-in",
	"pop-out",
	"none"
];
var BaseRouteProtocol = { url: {
	type: String,
	required: true
} };
var API_NAVIGATE_TO = "navigateTo";
var API_REDIRECT_TO = "redirectTo";
var API_RE_LAUNCH = "reLaunch";
var API_SWITCH_TAB = "switchTab";
var API_NAVIGATE_BACK = "navigateBack";
var NavigateToProtocol = /* @__PURE__ */ extend({}, BaseRouteProtocol, createAnimationProtocol(ANIMATION_IN));
var NavigateBackProtocol = /* @__PURE__ */ extend({ delta: { type: Number } }, createAnimationProtocol(ANIMATION_OUT));
var RedirectToProtocol = BaseRouteProtocol;
var ReLaunchProtocol = BaseRouteProtocol;
var SwitchTabProtocol = BaseRouteProtocol;
var NavigateToOptions = /* @__PURE__ */ createRouteOptions(API_NAVIGATE_TO);
var RedirectToOptions = /* @__PURE__ */ createRouteOptions(API_REDIRECT_TO);
var ReLaunchOptions = /* @__PURE__ */ createRouteOptions(API_RE_LAUNCH);
var SwitchTabOptions = /* @__PURE__ */ createRouteOptions(API_SWITCH_TAB);
var NavigateBackOptions = { formatArgs: { delta(value, params) {
	value = parseInt(value + "") || 1;
	params.delta = Math.min(getCurrentPages().length - 1, value);
} } };
function createAnimationProtocol(animationTypes) {
	return {
		animationType: {
			type: String,
			validator(type) {
				if (type && animationTypes.indexOf(type) === -1) return "`" + type + "` is not supported for `animationType` (supported values are: `" + animationTypes.join("`|`") + "`)";
			}
		},
		animationDuration: { type: Number }
	};
}
var navigatorLock;
function beforeRoute() {
	navigatorLock = "";
}
function createRouteOptions(type) {
	return {
		formatArgs: { url: createNormalizeUrl(type) },
		beforeAll: beforeRoute
	};
}
function createNormalizeUrl(type) {
	return function normalizeUrl(url, params) {
		if (!url) return "Missing required args: \"url\"";
		url = normalizeRoute(url);
		var pagePath = url.split("?")[0];
		var routeOptions = getRouteOptions(pagePath, true);
		if (!routeOptions) return "page `" + url + "` is not found";
		if (type === "navigateTo" || type === "redirectTo") {
			if (routeOptions.meta.isTabBar) return "can not ".concat(type, " a tabbar page");
		} else if (type === "switchTab") {
			if (!routeOptions.meta.isTabBar) return "can not switch to no-tabBar page";
		}
		if ((type === "switchTab" || type === "preloadPage") && routeOptions.meta.isTabBar && params.openType !== "appLaunch") url = pagePath;
		if (routeOptions.meta.isEntry) url = url.replace(routeOptions.alias, "/");
		params.url = encodeQueryString(url);
		if (type === "unPreloadPage") return;
		else if (type === "preloadPage") {
			if (!routeOptions.meta.isNVue) return "can not preload vue page";
			if (routeOptions.meta.isTabBar) {
				var pages = getCurrentPages();
				var tabBarPagePath = routeOptions.path.slice(1);
				if (pages.find((page) => page.route === tabBarPagePath)) return "tabBar page `" + tabBarPagePath + "` already exists";
			}
			return;
		}
		if (navigatorLock === url && params.openType !== "appLaunch") return "".concat(navigatorLock, " locked");
		if (__uniConfig.ready) navigatorLock = url;
	};
}
//#endregion
//#region ../uni-api/src/protocols/ui/loadFontFace.ts
var API_LOAD_FONT_FACE = "loadFontFace";
var LoadFontFaceProtocol = {
	family: {
		type: String,
		required: true
	},
	source: {
		type: String,
		required: true
	},
	desc: Object
};
//#endregion
//#region ../uni-api/src/protocols/ui/navigationBar.ts
var FRONT_COLORS = ["#ffffff", "#000000"];
var API_SET_NAVIGATION_BAR_COLOR = "setNavigationBarColor";
var SetNavigationBarColorOptions = { formatArgs: { animation(animation, params) {
	if (!animation) animation = {
		duration: 0,
		timingFunc: "linear"
	};
	params.animation = {
		duration: animation.duration || 0,
		timingFunc: animation.timingFunc || "linear"
	};
} } };
var SetNavigationBarColorProtocol = {
	frontColor: {
		type: String,
		required: true,
		validator(frontColor) {
			if (FRONT_COLORS.indexOf(frontColor) === -1) return "invalid frontColor \"".concat(frontColor, "\"");
		}
	},
	backgroundColor: {
		type: String,
		required: true
	},
	animation: Object
};
var API_SET_NAVIGATION_BAR_TITLE = "setNavigationBarTitle";
var SetNavigationBarTitleProtocol = { title: {
	type: String,
	required: true
} };
//#endregion
//#region ../uni-api/src/protocols/ui/pageScrollTo.ts
var API_PAGE_SCROLL_TO = "pageScrollTo";
var PageScrollToProtocol = {
	scrollTop: Number,
	selector: String,
	duration: Number
};
var PageScrollToOptions = { formatArgs: { duration: 300 } };
//#endregion
//#region ../uni-api/src/protocols/ui/startPullDownRefresh.ts
var API_START_PULL_DOWN_REFRESH = "startPullDownRefresh";
//#endregion
//#region ../uni-api/src/protocols/ui/stopPullDownRefresh.ts
var API_STOP_PULL_DOWN_REFRESH = "stopPullDownRefresh";
//#endregion
//#region ../uni-api/src/protocols/ui/tabBar.ts
var IndexProtocol = { index: {
	type: Number,
	required: true
} };
var IndexOptions = {
	beforeInvoke() {
		var pageMeta = getCurrentPageMeta();
		if (pageMeta && !pageMeta.isTabBar) return "not TabBar page";
	},
	formatArgs: { index(value) {
		if (!__uniConfig.tabBar.list[value]) return "tabbar item not found";
	} }
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
	formatArgs: /* @__PURE__ */ extend({ pagePath(value, params) {
		if (value) params.pagePath = removeLeadingSlash(value);
	} }, IndexOptions.formatArgs)
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
var SetTabBarStyleOptions = {
	beforeInvoke: IndexOptions.beforeInvoke,
	formatArgs: {
		backgroundImage(value, params) {
			params.backgroundImage = value;
		},
		borderStyle(value, params) {
			if (value) params.borderStyle = value === "white" ? "white" : "black";
		}
	}
};
var API_HIDE_TAB_BAR = "hideTabBar";
var HideTabBarProtocol = { animation: Boolean };
var API_SHOW_TAB_BAR = "showTabBar";
var ShowTabBarProtocol = HideTabBarProtocol;
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
var SetTabBarBadgeProtocol = /* @__PURE__ */ extend({ text: {
	type: String,
	required: true
} }, IndexProtocol);
var SetTabBarBadgeOptions = {
	beforeInvoke: IndexOptions.beforeInvoke,
	formatArgs: /* @__PURE__ */ extend({ text(value, params) {
		if (getLen(value) >= 4) params.text = "...";
	} }, IndexOptions.formatArgs)
};
//#endregion
//#region src/x/api/route/webview.ts
init_web_dom_iterable();
function showWebview(nPage, animationType, animationDuration, showCallback) {
	nPage.show(new Map([["animationType", animationType], ["animationDuration", animationDuration]]), showCallback);
}
function closeWebview(nPage, animationType, animationDuration, callback) {
	var options = new Map([["animationType", animationType]]);
	if (typeof animationDuration === "number") options.set("animationDuration", animationDuration);
	nPage.close(options, callback);
}
//#endregion
//#region src/x/api/route/performance.ts
var beforeRouteHooks = [];
var afterRouteHooks = [];
var pageReadyHooks = [];
function onBeforeRoute(hook) {
	beforeRouteHooks.push(hook);
}
function onAfterRoute(hook) {
	afterRouteHooks.push(hook);
}
function onPageReady(hook) {
	pageReadyHooks.push(hook);
}
function invokeBeforeRouteHooks(type) {
	invokeArrayFns$1(beforeRouteHooks, type);
}
function invokeAfterRouteHooks(type) {
	invokeArrayFns$1(afterRouteHooks, type);
}
function invokePageReadyHooks(page) {
	invokeArrayFns$1(pageReadyHooks, page);
}
//#endregion
//#region src/x/framework/app/utils.ts
init_web_dom_iterable();
var BORDER_COLORS = new Map([["white", "rgba(255, 255, 255, 0.33)"], ["black", "rgba(0, 0, 0, 0.33)"]]);
function getBorderStyle(borderStyle) {
	var value = BORDER_COLORS.get(borderStyle);
	if (borderStyle && !value) console.warn("4.23 版本起，在 pages.json 设置 tabbar borderStyle、在 uni.setTabBarStyle 设置 borderStyle 时仅支持 white/black，推荐使用 borderColor 自定义颜色。");
	return value || BORDER_COLORS.get("black");
}
function fixBorderStyle(tabBarConfig) {
	var borderStyle = tabBarConfig.get("borderStyle");
	var borderColor = tabBarConfig.get("borderColor");
	var isBorderColorFilled = isString(borderColor);
	borderStyle = getBorderStyle(borderStyle);
	if (isBorderColorFilled) borderStyle = borderColor;
	tabBarConfig.set("borderStyle", borderStyle);
	tabBarConfig.delete("borderColor");
}
function parseRedirectInfo(app) {
	var _redirectInfo$get, _redirectInfo$get2, _redirectInfo$get3, _redirectInfo$get4, _redirectInfo$get5;
	var redirectInfo = app.getRedirectInfo();
	var path = (_redirectInfo$get = redirectInfo.get("path")) !== null && _redirectInfo$get !== void 0 ? _redirectInfo$get : "";
	var query = (_redirectInfo$get2 = redirectInfo.get("query")) !== null && _redirectInfo$get2 !== void 0 ? _redirectInfo$get2 : "";
	var userAction = (_redirectInfo$get3 = redirectInfo.get("userAction")) !== null && _redirectInfo$get3 !== void 0 ? _redirectInfo$get3 : false;
	var appScheme = (_redirectInfo$get4 = redirectInfo.get("appScheme")) !== null && _redirectInfo$get4 !== void 0 ? _redirectInfo$get4 : "";
	var appLink = (_redirectInfo$get5 = redirectInfo.get("appLink")) !== null && _redirectInfo$get5 !== void 0 ? _redirectInfo$get5 : "";
	var referrerInfo = {
		appId: app.appid,
		extraData: {}
	};
	return {
		path: path || "",
		query: query ? "?" + query : "",
		referrerInfo,
		userAction,
		appScheme,
		appLink
	};
}
//#endregion
//#region src/x/framework/app/tabBar.ts
init_web_dom_iterable();
var onTabBarMidButtonTapCallback = [];
var tabBar0 = null;
var selected0 = -1;
var tabs = /* @__PURE__ */ new Map();
function getTabList() {
	var tabConfig = __uniConfig.tabBar ? /* @__PURE__ */ new Map() : null;
	if (__uniConfig.tabBar) for (var key in __uniConfig.tabBar) tabConfig.set(key, __uniConfig.tabBar[key]);
	if (tabConfig === null) return null;
	return tabConfig.get("list");
}
function init() {
	var _uniConfig$globalSty, _uniConfig$globalSty2;
	var list = getTabList();
	var style = /* @__PURE__ */ new Map();
	style.set("navigationStyle", "custom");
	style.set("pageOrientation", (_uniConfig$globalSty = (_uniConfig$globalSty2 = __uniConfig.globalStyle) === null || _uniConfig$globalSty2 === void 0 ? void 0 : _uniConfig$globalSty2.pageOrientation) !== null && _uniConfig$globalSty !== void 0 ? _uniConfig$globalSty : "portrait");
	var page = getPageManager().createPage("tabBar", "tabBar_".concat(Date.now()), style);
	var document = page.createDocument(new NodeData("root", "view", /* @__PURE__ */ new Map(), new Map([["flex", "1"]])));
	var tabParent = document.createElement(new NodeData("tabs", "tabs", /* @__PURE__ */ new Map(), new Map([["overflow", "hidden"], ["flex", "1"]])));
	document.appendChild(tabParent);
	tabBar0 = document.getRealDomNodeById("tabs");
	var _tabBarConfig = extend({}, __uniConfig.tabBar);
	normalizeTabBarStyles(_tabBarConfig, __uniConfig.themeConfig, getAppThemeFallbackOS());
	var tabBarConfig = /* @__PURE__ */ new Map();
	for (var key in _tabBarConfig) tabBarConfig.set(key, _tabBarConfig[key]);
	fixBorderStyle(tabBarConfig);
	tabBar0.initTabBar(tabBarConfig);
	tabBar0.addEventListener("tabBarItemTap", function(event) {
		var index = event.index;
		if (index !== selected0) {
			var path = list[index].pagePath;
			if (isString(path) && findPageRoute(getRealPath(path, true))) uni.switchTab({ url: getRealPath(path, true) });
			else console.error("switchTab: pagePath not found");
		}
	});
	tabBar0.addEventListener("tabBarMidButtonTap", function(event) {
		onTabBarMidButtonTapCallback.forEach((callback) => {
			if (typeof callback === "function") callback();
		});
	});
	page.startRender();
	page.show(null);
}
function clearTabBarStatus() {
	tabBar0 = null;
	selected0 = -1;
	tabs.clear();
}
function removeTabBarPage(page) {
	var pagePath = getRealPath(page.route, true);
	if (tabs.get(pagePath) === page) {
		tabs.delete(pagePath);
		if (getTabIndex(pagePath) === selected0) selected0 = -1;
	}
}
function getTabBar() {
	return tabBar0;
}
function getTabIndex(path) {
	var list = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getTabList();
	var selected = -1;
	if (list && list.length !== 0) for (var index = 0; index < list.length; index++) {
		var pagePath = list[index].pagePath;
		if (isString(pagePath) && getRealPath(pagePath, true) == getRealPath(path, true)) {
			selected = index;
			break;
		}
	}
	return selected;
}
function findPageRoute(path) {
	return __uniRoutes.find((route) => route.path === path);
}
function createTab(path, query, callback) {
	registerPage({
		url: path,
		path,
		query,
		openType: "switchTab",
		onRegistered() {
			var page = getCurrentPage().vm;
			tabBar0.appendItem(page.$basePage.id.toString());
			callback(page);
		}
	});
}
function findTabPage(path) {
	var _tabs$get;
	var page = (_tabs$get = tabs.get(path)) !== null && _tabs$get !== void 0 ? _tabs$get : null;
	var pages = getAllPages();
	pages.forEach((item) => item.$.__isActive = item === page);
	if (page !== null) {
		var index = pages.indexOf(page);
		if (index !== pages.length - 1) {
			pages.splice(index, 1);
			pages.push(page);
		}
	}
	return page;
}
function isTabPage(page) {
	var has = false;
	tabs.forEach((value, key) => {
		if (value === page) has = true;
	});
	return has;
}
var TabPageInfo = class {
	constructor(page, isFirst) {
		this.page = page;
		this.isFirst = isFirst;
	}
};
function getTabPage(path) {
	var query = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
	var rebuild = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
	var callback = arguments.length > 3 ? arguments[3] : void 0;
	var page = findTabPage(path);
	var isFirst = false;
	if (page === null || rebuild) {
		isFirst = true;
		createTab(path, query, (page) => {
			tabs.set(path, page);
			callback(new TabPageInfo(page, isFirst));
		});
	} else callback(new TabPageInfo(page, isFirst));
}
/**
* switchSelect 切换 tab
*/
function switchSelect(selected, path) {
	var _getCurrentPage;
	var query = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
	var rebuild = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
	var callback = arguments.length > 4 ? arguments[4] : void 0;
	var shouldShow = false;
	if (tabBar0 === null) init();
	var currentPage = (_getCurrentPage = getCurrentPage()) === null || _getCurrentPage === void 0 ? void 0 : _getCurrentPage.vm;
	var type = currentPage == null ? "appLaunch" : "switchTab";
	invokeBeforeRouteHooks(type);
	getTabPage(getRealPath(path, true), query, rebuild, (pageInfo) => {
		callback === null || callback === void 0 || callback();
		var page = pageInfo.page;
		if (currentPage !== page) {
			shouldShow = true;
			if (currentPage && isTabPage(currentPage)) invokeHook(currentPage, ON_HIDE);
		}
		tabBar0.switchSelect(page.$basePage.id.toString(), selected);
		if (shouldShow) invokeHook(page, ON_SHOW);
		selected0 = selected;
		invokeAfterRouteHooks(type);
	});
}
//#endregion
//#region src/x/framework/theme.ts
init_web_dom_iterable();
var APP_THEME_AUTO = "auto";
function getAppThemeFallbackOS() {
	var fallbackOSTheme = "light";
	try {
		var appTheme = uni.getAppBaseInfo().appTheme;
		fallbackOSTheme = appTheme;
		if (appTheme === APP_THEME_AUTO) fallbackOSTheme = uni.getDeviceInfo().osTheme;
		return fallbackOSTheme;
	} catch (e) {
		console.error(e);
		return fallbackOSTheme;
	}
}
var appThemeChangeCallbackId = -1;
function clearAppThemeChangeCallbackId() {
	appThemeChangeCallbackId = -1;
}
function registerThemeChange(callback) {
	try {
		if (appThemeChangeCallbackId !== -1) {
			uni.offAppThemeChange(appThemeChangeCallbackId);
			clearAppThemeChangeCallbackId();
		}
		appThemeChangeCallbackId = uni.onAppThemeChange(function(res1) {
			var appThemeMode = res1["appTheme"];
			callback(appThemeMode);
		});
	} catch (e) {}
}
var onThemeChange = function(themeMode) {
	var handlePage = () => {
		getAllPages().forEach((page) => {
			var style = parsePageStyle(initRouteOptions(page.$basePage.path, ""));
			page.$page.setPageStyle(new UTSJSONObject(style));
		});
	};
	handlePage();
	var handleTabBar = () => {
		var tabBar = getTabBar();
		if (tabBar !== null) {
			var tabBarConfig = __uniConfig.getTabBarConfig();
			normalizeTabBarStyles(tabBarConfig, __uniConfig.themeConfig, themeMode);
			var tabBarStyle = /* @__PURE__ */ new Map();
			Object.keys(tabBarConfig).forEach((key) => {
				var value = tabBarConfig[key];
				if (isString(value)) tabBarStyle.set(key, value);
				else if (isArray(value)) {
					var valueAsArray = value;
					var index = 0;
					valueAsArray.forEach((item) => {
						var tabBarItemMap = /* @__PURE__ */ new Map();
						tabBarItemMap.set("index", index);
						Object.keys(item).forEach((tabBarItemkey) => {
							if (item[tabBarItemkey] != null) tabBarItemMap.set(tabBarItemkey, item[tabBarItemkey]);
						});
						tabBar.setTabBarItem(tabBarItemMap);
						index++;
					});
				}
			});
			fixBorderStyle(tabBarStyle);
			tabBar.setTabBarStyle(tabBarStyle);
		}
	};
	handleTabBar();
};
function normalizePageStyles(pageStyle, themeConfig, themeMode) {
	var themeMap = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig[themeMode];
	if (!themeMap) return;
	normalizeStyles$1(pageStyle, themeMap);
}
function normalizeStyles$1(style, themeMap) {
	Object.keys(style).forEach((key) => {
		var value = style[key];
		if (isString(value)) {
			var valueAsString = value;
			if (valueAsString.startsWith("@")) {
				var configValue = themeMap[valueAsString.slice(1)];
				if (configValue != null) style[key] = configValue;
			}
		} else if (isArray(value)) value.forEach((item) => {
			normalizeStyles$1(item, themeMap);
		});
		else if (isPlainObject(value)) normalizeStyles$1(value, themeMap);
	});
}
function normalizeTabBarStyles(tabBar, themeConfig, themeMode) {
	if (!themeConfig) return;
	var themeMap = themeConfig[themeMode];
	if (themeMap == null) return;
	normalizeStyles$1(tabBar, themeMap);
}
function useTheme() {
	registerThemeChange(onThemeChange);
}
//#endregion
//#region src/x/statusBar.ts
function setStatusBarStyle() {
	var page;
	var currentPage = getCurrentPage();
	var dialogPages = currentPage === null || currentPage === void 0 ? void 0 : currentPage.getDialogPages();
	var systemDialogPages = getSystemDialogPages(currentPage);
	if (systemDialogPages !== null && systemDialogPages !== void 0 && systemDialogPages.length && dialogPages !== null && dialogPages !== void 0 && dialogPages.length) {
		var lastSystemDialogPage = systemDialogPages[systemDialogPages.length - 1];
		var lastDialogPage = dialogPages[dialogPages.length - 1];
		page = Number(lastSystemDialogPage.__nativePageId) > Number(lastDialogPage.__nativePageId) ? lastSystemDialogPage.vm : lastDialogPage.vm;
	} else if (dialogPages !== null && dialogPages !== void 0 && dialogPages.length) page = dialogPages[dialogPages.length - 1].vm;
	else if (systemDialogPages !== null && systemDialogPages !== void 0 && systemDialogPages.length) page = systemDialogPages[systemDialogPages.length - 1].vm;
	else page = currentPage === null || currentPage === void 0 ? void 0 : currentPage.vm;
	if (page) page.$nativePage.applyStatusBarStyle();
}
//#endregion
//#region src/x/api/route/closeNativeDialogPage.ts
function closeNativeDialogPage(dialogPage, animationType, animationDuration, callback) {
	var _dialogPage$vm;
	var webview = getNativeApp().pageManager.findPageById(((_dialogPage$vm = dialogPage.vm) === null || _dialogPage$vm === void 0 ? void 0 : _dialogPage$vm.$basePage.id) + "");
	if (webview) closeWebview(webview, animationType || "none", animationDuration || 0, () => {
		getVueApp().unmountPage(dialogPage.vm);
		setStatusBarStyle();
		callback === null || callback === void 0 || callback();
	});
}
//#endregion
//#region src/x/api/route/closeDialogPage.ts
var closeDialogPage = (options) => {
	var _options$success, _options$complete;
	var currentPages = getCurrentPages();
	var currentPage = currentPages[currentPages.length - 1];
	if (!currentPage) {
		triggerFailCallback$1(options, "currentPage is null");
		return;
	}
	if ((options === null || options === void 0 ? void 0 : options.animationType) === "pop-out") options.animationType = "none";
	if (options !== null && options !== void 0 && options.dialogPage) {
		var dialogPage = options === null || options === void 0 ? void 0 : options.dialogPage;
		if (!(dialogPage instanceof UniDialogPageImpl)) {
			triggerFailCallback$1(options, "dialogPage is not a valid page");
			return;
		}
		var parentPage = dialogPage.getParentPage();
		if (!isSystemDialogPage(dialogPage)) if (parentPage && (isTabPage(parentPage.vm) || currentPages.indexOf(parentPage) !== -1)) {
			var parentDialogPages = parentPage.getDialogPages();
			var index = parentDialogPages.indexOf(dialogPage);
			closeNativeDialogPage(dialogPage, (options === null || options === void 0 ? void 0 : options.animationType) || "auto", (options === null || options === void 0 ? void 0 : options.animationDuration) || 300);
			parentDialogPages.splice(index, 1);
			if (index === parentDialogPages.length) dialogPageTriggerPrevDialogPageLifeCycle(parentPage, ON_SHOW);
		} else {
			triggerFailCallback$1(options, "dialogPage is not a valid page");
			return;
		}
		else {
			var systemDialogPages = getSystemDialogPages(parentPage);
			if (systemDialogPages) {
				var _index = systemDialogPages.indexOf(dialogPage);
				if (_index > -1) {
					closeNativeDialogPage(dialogPage, (options === null || options === void 0 ? void 0 : options.animationType) || "auto", (options === null || options === void 0 ? void 0 : options.animationDuration) || 300);
					systemDialogPages.splice(_index, 1);
					if (_index === systemDialogPages.length) dialogPageTriggerPrevDialogPageLifeCycle(parentPage, ON_SHOW);
				} else triggerFailCallback$1(options, "dialogPage is not a valid page");
			}
			return;
		}
	} else {
		var dialogPages = currentPage.getDialogPages();
		for (var i = dialogPages.length - 1; i >= 0; i--) {
			closeNativeDialogPage(dialogPages[i], (options === null || options === void 0 ? void 0 : options.animationType) || "auto", (options === null || options === void 0 ? void 0 : options.animationDuration) || 300);
			if (i > 0) invokeHook(dialogPages[i - 1].$vm, ON_SHOW);
			dialogPages[i] = null;
		}
		dialogPages.length = 0;
	}
	var successOptions = { errMsg: "closeDialogPage: ok" };
	options === null || options === void 0 || (_options$success = options.success) === null || _options$success === void 0 || _options$success.call(options, successOptions);
	options === null || options === void 0 || (_options$complete = options.complete) === null || _options$complete === void 0 || _options$complete.call(options, successOptions);
};
function triggerFailCallback$1(options, errMsg) {
	var _options$fail, _options$complete2;
	var failOptions = new UniError("uni-openDialogPage", 4, "openDialogPage: fail, ".concat(errMsg));
	options === null || options === void 0 || (_options$fail = options.fail) === null || _options$fail === void 0 || _options$fail.call(options, failOptions);
	options === null || options === void 0 || (_options$complete2 = options.complete) === null || _options$complete2 === void 0 || _options$complete2.call(options, failOptions);
}
//#endregion
//#region src/x/framework/page/register.ts
init_web_dom_iterable();
function parsePageStyle(route) {
	var style = /* @__PURE__ */ new Map();
	var routeMeta = route.meta;
	var routeKeys = [
		"id",
		"route",
		"i18n",
		"isQuit",
		"isEntry",
		"isTabBar",
		"tabBarIndex",
		"tabBarText",
		"windowTop",
		"topWindow",
		"leftWindow",
		"rightWindow",
		"eventChannel",
		"navigationBar"
	];
	var navKeys = [
		"navigationBarTitleText",
		"navigationBarBackgroundColor",
		"navigationBarTextStyle",
		"navigationStyle"
	];
	normalizePageStyles(routeMeta, __uniConfig.themeConfig, getAppThemeFallbackOS());
	Object.keys(routeMeta).forEach((key) => {
		if (!routeKeys.includes(key) && !navKeys.includes(key)) style.set(key, routeMeta[key]);
	});
	var navigationBar = {};
	navKeys.forEach((key) => {
		if (key in routeMeta) navigationBar[key] = routeMeta[key];
	});
	if (Object.keys(navigationBar).length > 0) {
		if (navigationBar.navigationBarTextStyle !== "custom" && !routeMeta.isQuit && routeMeta.route !== __uniConfig.realEntryPagePath) style.set("navigationBarAutoBackButton", true);
		Object.keys(navigationBar).forEach((key) => {
			style.set(key, navigationBar[key]);
		});
	}
	return style;
}
function registerPage(_ref, onCreated) {
	var { url, path, query, openType, webview, nvuePageVm, eventChannel, onRegistered } = _ref;
	var delay = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
	var id = genWebviewId();
	var routeOptions = initRouteOptions(path, openType);
	var pageStyle = parsePageStyle(routeOptions);
	if (openType === "reLaunch") pageStyle.set("disableSwipeBack", true);
	var nativePage = getPageManager().createPage(url, id.toString(), pageStyle);
	if (onCreated) onCreated(nativePage);
	routeOptions.meta.id = parseInt(nativePage.pageId);
	var route = path.slice(1);
	var pageInstance = initPageInternalInstance(openType, url, query, routeOptions.meta, eventChannel, "light");
	function handleHomeDialogPages(homePage, sourceDialogPages, targetDialogPages) {
		sourceDialogPages.forEach((dialogPage) => {
			dialogPage.getParentPage = () => homePage;
			targetDialogPages.push(dialogPage);
		});
		sourceDialogPages.length = 0;
	}
	function fn() {
		createVuePage(id, route, query, pageInstance, {}, nativePage).then((pageComponentPublicInstance) => {
			var pages = getCurrentPages();
			if (pages.length === 1) {
				var homePage = pages[0];
				var sourceDialogPages = [];
				var targetDialogPages = [];
				if (homeDialogPages.length) {
					sourceDialogPages = homeDialogPages;
					targetDialogPages = homePage.getDialogPages();
				}
				if (homeSystemDialogPages.length) {
					sourceDialogPages = homeSystemDialogPages;
					targetDialogPages = getSystemDialogPages(homePage);
				}
				handleHomeDialogPages(homePage, sourceDialogPages, targetDialogPages);
			}
			nativePage.addPageEventListener(ON_POP_GESTURE, function(e) {
				uni.navigateBack({
					from: "popGesture",
					fail(e) {
						if (e.errMsg.endsWith("cancel")) nativePage.show();
					}
				});
			});
			nativePage.addPageEventListener(ON_UNLOAD, (_) => {
				invokeHook(pageComponentPublicInstance, ON_UNLOAD);
			});
			nativePage.addPageEventListener(ON_READY, (_) => {
				invokePageReadyHooks(pageComponentPublicInstance);
				invokeHook(pageComponentPublicInstance, ON_READY);
			});
			nativePage.addPageEventListener(ON_PAGE_SCROLL, (arg) => {
				invokeHook(pageComponentPublicInstance, ON_PAGE_SCROLL, { scrollTop: arg.scrollTop });
			});
			nativePage.addPageEventListener(ON_PULL_DOWN_REFRESH, (_) => {
				invokeHook(pageComponentPublicInstance, ON_PULL_DOWN_REFRESH);
			});
			nativePage.addPageEventListener(ON_REACH_BOTTOM, (_) => {
				invokeHook(pageComponentPublicInstance, ON_REACH_BOTTOM);
			});
			nativePage.addPageEventListener(ON_RESIZE, (arg) => {
				invokeHook(pageComponentPublicInstance, ON_RESIZE, {
					deviceOrientation: arg.deviceOrientation,
					size: {
						windowWidth: arg.size.windowWidth,
						windowHeight: arg.size.windowHeight,
						screenWidth: arg.size.screenWidth,
						screenHeight: arg.size.screenHeight
					}
				});
			});
			nativePage.startRender();
			onRegistered === null || onRegistered === void 0 || onRegistered(nativePage);
		});
	}
	if (delay) setTimeout(fn, delay);
	else fn();
	return nativePage;
}
function registerDialogPage(_ref2, dialogPage, onCreated) {
	var _uniRoutes$find;
	var { url, path, query, openType, eventChannel, onRegistered } = _ref2;
	var delay = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
	var id = genWebviewId();
	var routeOptions = initRouteOptions(path, openType);
	var pageStyle = parsePageStyle(routeOptions);
	var routePageMeta = (_uniRoutes$find = __uniRoutes.find((route) => route.path === path)) === null || _uniRoutes$find === void 0 ? void 0 : _uniRoutes$find.meta;
	if (!(routePageMeta !== null && routePageMeta !== void 0 && routePageMeta.navigationStyle)) pageStyle.set("navigationStyle", "custom");
	if (!(routePageMeta !== null && routePageMeta !== void 0 && routePageMeta.backgroundColorContent)) pageStyle.set("backgroundColorContent", "transparent");
	if (typeof pageStyle.get("disableSwipeBack") !== "boolean") pageStyle.set("disableSwipeBack", true);
	var parentPage = dialogPage.getParentPage();
	var pageManager = getPageManager();
	var createDialogPage = pageManager.createDialogPage.bind(pageManager);
	var nativePage = createDialogPage.length === 6 ? createDialogPage(url, id.toString(), pageStyle, parentPage === null || parentPage === void 0 ? void 0 : parentPage.getNativePage()) : createDialogPage(parentPage ? parentPage.__nativePageId : "", id.toString(), url, pageStyle);
	if (onCreated) onCreated(nativePage);
	routeOptions.meta.id = parseInt(nativePage.pageId);
	var route = path.startsWith("uni:") ? path : path.slice(1);
	var pageInstance = initPageInternalInstance(openType, url, query, routeOptions.meta, eventChannel, "light");
	function fn() {
		createVuePage(id, route, query, pageInstance, {}, nativePage).then((pageComponentPublicInstance) => {
			nativePage.addPageEventListener(ON_POP_GESTURE, function(e) {
				closeDialogPage({ dialogPage });
			});
			nativePage.addPageEventListener(ON_UNLOAD, (_) => {
				invokeHook(pageComponentPublicInstance, ON_UNLOAD);
				dialogPageTriggerParentShow(dialogPage, isSystemDialogPage(dialogPage) ? 1 : 0);
			});
			nativePage.addPageEventListener(ON_READY, (_) => {
				invokePageReadyHooks(pageComponentPublicInstance);
				invokeHook(pageComponentPublicInstance, ON_READY);
			});
			nativePage.addPageEventListener(ON_PAGE_SCROLL, (arg) => {
				invokeHook(pageComponentPublicInstance, ON_PAGE_SCROLL, arg);
			});
			nativePage.addPageEventListener(ON_PULL_DOWN_REFRESH, (_) => {
				invokeHook(pageComponentPublicInstance, ON_PULL_DOWN_REFRESH);
			});
			nativePage.addPageEventListener(ON_REACH_BOTTOM, (_) => {
				invokeHook(pageComponentPublicInstance, ON_REACH_BOTTOM);
			});
			nativePage.addPageEventListener(ON_RESIZE, (arg) => {
				invokeHook(pageComponentPublicInstance, ON_RESIZE, {
					deviceOrientation: arg.deviceOrientation,
					size: {
						windowWidth: arg.size.windowWidth,
						windowHeight: arg.size.windowHeight,
						screenWidth: arg.size.screenWidth,
						screenHeight: arg.size.screenHeight
					}
				});
			});
			nativePage.startRender();
		});
	}
	if (delay) setTimeout(fn, delay);
	else fn();
	return nativePage;
}
function createVuePage(__pageId, __pagePath, __pageQuery, __pageInstance, pageOptions, nativePage) {
	var pageNode = nativePage.document.body;
	var app = getVueApp();
	var component = pagesMap.get(__pagePath)();
	var mountPage = (component) => app.mountPage(component, extend({
		__pageId,
		__pagePath,
		__pageQuery,
		__pageInstance
	}, __pageQuery), pageNode);
	if (isPromise(component)) return component.then((component) => mountPage(component)).catch((err) => {
		console.error(err);
		throw err;
	});
	return { then(fn) {
		return fn(mountPage(component));
	} };
}
//#endregion
//#region src/x/framework/app/initEntry.ts
var isInitEntryPage = false;
function initEntry(app) {
	if (isInitEntryPage) return;
	isInitEntryPage = true;
	var entryPagePath;
	var entryPageQuery;
	if (app.getRedirectInfo().size > 0) {
		var { path, query } = parseRedirectInfo(app);
		if (path) {
			entryPagePath = path;
			entryPageQuery = query;
		}
	}
	if (!entryPagePath || entryPagePath === __uniConfig.entryPagePath) {
		if (entryPageQuery) __uniConfig.entryPageQuery = entryPageQuery;
		return;
	}
	var routeOptions = getRouteOptions(addLeadingSlash(entryPagePath));
	if (!routeOptions) return;
	if (!routeOptions.meta.isTabBar) __uniConfig.realEntryPagePath = __uniConfig.realEntryPagePath || __uniConfig.entryPagePath;
	__uniConfig.entryPagePath = entryPagePath;
	__uniConfig.entryPageQuery = entryPageQuery;
}
//#endregion
//#region src/x/framework/app/initGlobalEvent.ts
function initGlobalEvent(app) {
	app.addKeyEventListener(ON_BACK_BUTTON, () => {
		var currentPage = getCurrentPage();
		if (currentPage) {
			var lastDialogPage = getLastDialogPage(currentPage);
			if (lastDialogPage) {
				handleDialogPageBack(lastDialogPage);
				return true;
			}
		}
		backbuttonListener();
		return true;
	});
}
function handleDialogPageBack(dialogPage) {
	if (invokeHook(dialogPage.vm, ON_BACK_PRESS, { from: "navigateBack" }) !== true) closeDialogPage({
		dialogPage,
		animationType: "auto"
	});
}
//#endregion
//#region src/x/api/base/getLaunchOptionsSync.ts
/**
* uni.getLaunchOptionsSync()
* 获取本次启动时的参数。返回值与App.onLaunch的回调参数一致 onLaunch(res)
* 通过通用链接打开返回 appLink
* 通过 appSchema打开返回 appScheme
* onHide - onShow 信息清除
*/
var API_GET_LAUNCH_OPTIONS_SYNC = "getLaunchOptionsSync";
var launchOptions = {
	path: "",
	appScheme: null,
	appLink: null
};
var setLaunchOptionsSync = function(options) {
	launchOptions = options;
};
var getLaunchOptionsSync = /* @__PURE__ */ defineSyncApi(API_GET_LAUNCH_OPTIONS_SYNC, () => {
	var baseInfo = getLaunchOptions();
	return Object.assign({}, baseInfo, launchOptions);
});
//#endregion
//#region src/x/api/base/getEnterOptionsSync.ts
var API_GET_ENTER_OPTIONS_SYNC = "getEnterOptionsSync";
var enterOptions = {
	path: "",
	appScheme: null,
	appLink: null
};
var setEnterOptionsSync = function(options) {
	enterOptions = options;
};
var getEnterOptionsSync = /* @__PURE__ */ defineSyncApi(API_GET_ENTER_OPTIONS_SYNC, () => {
	var baseInfo = getLaunchOptions();
	return Object.assign({}, baseInfo, enterOptions);
});
//#endregion
//#region src/x/framework/app/initAppLaunch.ts
function initAppLaunch(appVm) {
	var _app$getLaunchOptions;
	injectAppHooks(appVm.$);
	var { entryPagePath, entryPageQuery, referrerInfo } = __uniConfig;
	var args = initLaunchOptions({
		path: entryPagePath,
		query: entryPageQuery,
		referrerInfo
	});
	var schemaLink = (_app$getLaunchOptions = getNativeApp().getLaunchOptionsSync()) !== null && _app$getLaunchOptions !== void 0 ? _app$getLaunchOptions : {
		appScheme: "",
		appLink: ""
	};
	var launchOption = extend({}, args, {
		appScheme: schemaLink.appScheme == null ? null : schemaLink.appScheme.length === 0 ? null : schemaLink.appScheme,
		appLink: schemaLink.appLink == null ? null : schemaLink.appLink.length === 0 ? null : schemaLink.appLink
	});
	setLaunchOptionsSync(launchOption);
	invokeHook(appVm, ON_LAUNCH, launchOption);
	var showOption = extend({}, launchOption);
	setEnterOptionsSync(showOption);
	invokeHook(appVm, ON_SHOW, showOption);
	var appStyle = appVm.$options.styles;
	if (appStyle) loadFontFaceByStyles(appStyle, true);
	useTheme();
}
//#endregion
//#region src/x/framework/app/initAppError.ts
function initAppError(appVm, nativeApp) {
	nativeApp.addEventListener(ON_ERROR, function(errorEvent) {
		invokeHook(appVm, ON_ERROR, errorEvent.error);
	});
}
//#endregion
//#region src/x/api/route/redirectTo.ts
var redirectTo = /* @__PURE__ */ defineAsyncApi(API_REDIRECT_TO, (_ref, _ref2) => {
	var { url } = _ref;
	var { resolve, reject } = _ref2;
	var { path, query } = parseUrl(url);
	if (!entryPageState.isReady) {
		redirectToPagesBeforeEntryPages.push({
			args: {
				url,
				path,
				query
			},
			handler: {
				resolve,
				reject
			}
		});
		return;
	}
	_redirectTo({
		url,
		path,
		query
	}).then(resolve).catch(reject);
}, RedirectToProtocol, RedirectToOptions);
function _redirectTo(_ref3) {
	var { url, path, query } = _ref3;
	return new Promise((resolve) => {
		setTimeout(() => {
			var lastPage = getCurrentPage().vm;
			var isRegistered = false;
			var isShown = false;
			function callback() {
				if (!(isRegistered && isShown)) return;
				if (lastPage) removePages(lastPage);
				resolve(void 0);
				setStatusBarStyle();
			}
			invokeAfterRouteHooks(API_REDIRECT_TO);
			showWebview(registerPage({
				url,
				path,
				query,
				openType: isTabPage(lastPage) || getAllPages().length === 1 ? "reLaunch" : "redirectTo",
				onRegistered() {
					isRegistered = true;
					callback();
				}
			}), "none", 0, () => {
				isShown = true;
				callback();
			});
			invokeBeforeRouteHooks(API_REDIRECT_TO);
		}, 0);
	});
}
function removePages(currentPage) {
	if (isTabPage(currentPage)) getAllPages().slice(0, -1).forEach((page) => {
		closePage(page, "none");
	});
	else closePage(currentPage, "none");
}
//#endregion
//#region src/x/api/route/reLaunch.ts
var $reLaunch = (_ref, _ref2) => {
	var { url } = _ref;
	var { resolve, reject } = _ref2;
	var { path, query } = parseUrl(url);
	if (!entryPageState.isReady) {
		reLaunchPagesBeforeEntryPages.push({
			args: { url },
			handler: {
				resolve,
				reject
			}
		});
		return;
	}
	_reLaunch({
		url,
		path,
		query
	}).then(resolve).catch(reject);
};
function _reLaunch(_ref3) {
	var { url, path, query } = _ref3;
	return new Promise((resolve) => {
		setTimeout(() => {
			var pages = getAllPages().slice(0);
			var selected = getTabIndex(path);
			var isRegistered = false;
			var isShown = false;
			function callback() {
				if (!isRegistered || !isShown) return;
				pages.forEach((page) => closePage(page, "none"));
				pages.length = 0;
				resolve(void 0);
				setStatusBarStyle();
			}
			if (selected === -1) showWebview(registerPage({
				url,
				path,
				query,
				openType: "reLaunch",
				onRegistered() {
					isRegistered = true;
					callback();
				}
			}), "none", 0, () => {
				isShown = true;
				callback();
			});
			else {
				isRegistered = true;
				isShown = true;
				switchSelect(selected, path, query, true, callback);
			}
		}, 0);
	});
}
var reLaunch = /* @__PURE__ */ defineAsyncApi(API_RE_LAUNCH, $reLaunch, ReLaunchProtocol, ReLaunchOptions);
//#endregion
//#region src/x/api/route/utils.ts
function closePage(page, animationType, animationDuration) {
	if (page.$page) clearDialogPages(page.$page);
	var nativePage = page.$nativePage;
	nativePage && closeWebview(nativePage, animationType, animationDuration);
	removePage(page);
	removeTabBarPage(page);
}
function updateEntryPageIsReady(path) {
	if (!getCurrentPage() && path === addLeadingSlash(__uniConfig.entryPagePath)) entryPageState.isReady = true;
}
function handleBeforeEntryPageRoutes() {
	if (entryPageState.handledBeforeEntryPageRoutes) return;
	entryPageState.handledBeforeEntryPageRoutes = true;
	var navigateToPages = [...navigateToPagesBeforeEntryPages];
	navigateToPagesBeforeEntryPages.length = 0;
	navigateToPages.forEach((_ref) => {
		var { args, handler } = _ref;
		return $navigateTo(args, handler);
	});
	var switchTabPages = [...switchTabPagesBeforeEntryPages];
	switchTabPagesBeforeEntryPages.length = 0;
	switchTabPages.forEach((_ref2) => {
		var { args, handler } = _ref2;
		return $switchTab(args, handler);
	});
	var redirectToPages = [...redirectToPagesBeforeEntryPages];
	redirectToPagesBeforeEntryPages.length = 0;
	redirectToPages.forEach((_ref3) => {
		var { args, handler } = _ref3;
		return _redirectTo(args).then(handler.resolve).catch(handler.reject);
	});
	var reLaunchPages = [...reLaunchPagesBeforeEntryPages];
	reLaunchPagesBeforeEntryPages.length = 0;
	reLaunchPages.forEach((_ref4) => {
		var { args, handler } = _ref4;
		return $reLaunch(args, handler);
	});
}
function closePreSystemDialogPage(dialogPages, type) {
	var targetSystemDialogPages = dialogPages.filter((page) => page.route.startsWith(type));
	if (targetSystemDialogPages.length > 1) setTimeout(() => {
		closeNativeDialogPage(targetSystemDialogPages[0]);
		dialogPages.splice(dialogPages.indexOf(targetSystemDialogPages[0]), 1);
	}, 150);
}
function clearDialogPages(uniPage) {
	var dialogPages = uniPage.getDialogPages();
	for (var i = dialogPages.length - 1; i >= 0; i--) {
		closeNativeDialogPage(dialogPages[i]);
		if (i > 0) invokeHook(dialogPages[i - 1].vm, ON_SHOW);
	}
	var systemDialogPages = getSystemDialogPages(uniPage);
	for (var _i = 0; _i < systemDialogPages.length; _i++) closeNativeDialogPage(systemDialogPages[_i]);
	systemDialogPages.length = 0;
}
//#endregion
//#region src/x/api/route/switchTab.ts
var $switchTab = (args, _ref) => {
	var { resolve, reject } = _ref;
	var { url } = args;
	var { path, query } = parseUrl(url);
	updateEntryPageIsReady(path);
	if (!entryPageState.isReady) {
		switchTabPagesBeforeEntryPages.push({
			args,
			handler: {
				resolve,
				reject
			}
		});
		return;
	}
	_switchTab({
		url,
		path,
		query
	}).then(resolve).catch(reject);
	handleBeforeEntryPageRoutes();
};
var switchTab = /* @__PURE__ */ defineAsyncApi(API_SWITCH_TAB, $switchTab, SwitchTabProtocol, SwitchTabOptions);
function _switchTab(_ref2) {
	var { url, path, query } = _ref2;
	var selected = getTabIndex(path);
	if (selected == -1) return Promise.reject("tab ".concat(path, " not found"));
	var pages = getCurrentBasePages();
	return new Promise((resolve) => {
		setTimeout(() => {
			switchSelect(selected, path, query);
			for (var index = pages.length - 1; index >= 0; index--) {
				var page = pages[index];
				if (isTabPage(page)) break;
				closePage(page, "none");
			}
			resolve(void 0);
		}, 0);
	});
}
//#endregion
//#region src/x/framework/app/subscriber/webviewReady.ts
var isLaunchWebviewReady = false;
function subscribeWebviewReady(_data, pageId) {
	var isLaunchWebview = pageId === "1";
	if (isLaunchWebview && isLaunchWebviewReady) return;
	if (isLaunchWebview) isLaunchWebviewReady = true;
	isLaunchWebview && onLaunchWebviewReady();
}
function onLaunchWebviewReady() {
	var _routeOptions;
	var entryPagePath = addLeadingSlash(__uniConfig.entryPagePath);
	var routeOptions = getRouteOptions(entryPagePath);
	if (!routeOptions) if (__uniRoutes.length > 0) {
		entryPagePath = __uniRoutes[0].path;
		routeOptions = getRouteOptions(addLeadingSlash(entryPagePath));
	} else {
		console.error("未匹配到路由，请检查配置");
		return;
	}
	var args = {
		url: entryPagePath + (__uniConfig.entryPageQuery || ""),
		openType: "appLaunch"
	};
	var handler = {
		resolve() {},
		reject() {}
	};
	if ((_routeOptions = routeOptions) !== null && _routeOptions !== void 0 && (_routeOptions = _routeOptions.meta) !== null && _routeOptions !== void 0 && _routeOptions.isTabBar) return $switchTab(args, handler);
	return $navigateTo(args, handler);
}
function clearWebviewReady() {
	isLaunchWebviewReady = false;
}
//#endregion
//#region src/x/framework/app/subscriber/index.ts
function initSubscribeHandlers() {
	subscribeWebviewReady({}, "1");
}
//#endregion
//#region \0rollupPluginBabelHelpers.js
function _OverloadYield(e, d) {
	this.v = e, this.k = d;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
	try {
		var i = n[a](c), u = i.value;
	} catch (n) {
		e(n);
		return;
	}
	i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
	return function() {
		var t = this, e = arguments;
		return new Promise(function(r, o) {
			var a = n.apply(t, e);
			function _next(n) {
				asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
			}
			function _throw(n) {
				asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
			}
			_next(void 0);
		});
	};
}
function _defineProperty(e, r, t) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
function _toPrimitive(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function AsyncGenerator(e) {
	var r, t;
	function resume(r, t) {
		try {
			var n = e[r](t), o = n.value, u = o instanceof _OverloadYield;
			Promise.resolve(u ? o.v : o).then(function(t) {
				if (u) {
					var i = "return" === r ? "return" : "next";
					if (!o.k || t.done) return resume(i, t);
					t = e[i](t).value;
				}
				settle(n.done ? "return" : "normal", t);
			}, function(e) {
				resume("throw", e);
			});
		} catch (e) {
			settle("throw", e);
		}
	}
	function settle(e, n) {
		switch (e) {
			case "return":
				r.resolve({
					value: n,
					done: !0
				});
				break;
			case "throw":
				r.reject(n);
				break;
			default: r.resolve({
				value: n,
				done: !1
			});
		}
		(r = r.next) ? resume(r.key, r.arg) : t = null;
	}
	this._invoke = function(e, n) {
		return new Promise(function(o, u) {
			var i = {
				key: e,
				arg: n,
				resolve: o,
				reject: u,
				next: null
			};
			t ? t = t.next = i : (r = t = i, resume(e, n));
		});
	}, "function" != typeof e.return && (this.return = void 0);
}
AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, AsyncGenerator.prototype.next = function(e) {
	return this._invoke("next", e);
}, AsyncGenerator.prototype.throw = function(e) {
	return this._invoke("throw", e);
}, AsyncGenerator.prototype.return = function(e) {
	return this._invoke("return", e);
};
//#endregion
//#region src/x/framework/app/initService.ts
function initOn(app, unregisterApp) {
	app.addEventListener(ON_SHOW, /* @__PURE__ */ function() {
		var _ref = _asyncToGenerator(function* (event) {
			var _getCurrentPage;
			var app = getNativeApp();
			var MAX_TIMEOUT = 200;
			function getNewIntent() {
				return new Promise((resolve, reject) => {
					var callbackWrapper = null;
					var handleNewIntent = (newIntent) => {
						var _newIntent$appScheme, _newIntent$appLink;
						clearTimeout(timeout);
						app.removeEventListener("onNewIntent", callbackWrapper);
						resolve({
							appScheme: (_newIntent$appScheme = newIntent.appScheme) !== null && _newIntent$appScheme !== void 0 ? _newIntent$appScheme : null,
							appLink: (_newIntent$appLink = newIntent.appLink) !== null && _newIntent$appLink !== void 0 ? _newIntent$appLink : null
						});
					};
					callbackWrapper = app.addEventListener("onNewIntent", handleNewIntent);
					var timeout = setTimeout(() => {
						app.removeEventListener("onNewIntent", callbackWrapper);
						resolve({
							appScheme: null,
							appLink: null
						});
					}, MAX_TIMEOUT);
				});
			}
			var schemaLink = yield getNewIntent();
			var showOptions = extend({ path: __uniConfig.entryPagePath }, schemaLink);
			setEnterOptionsSync(showOptions);
			var page = (_getCurrentPage = getCurrentPage()) === null || _getCurrentPage === void 0 ? void 0 : _getCurrentPage.vm;
			invokeHook(getApp().vm, ON_SHOW, showOptions);
			if (page) invokeHook(page, ON_SHOW);
		});
		return function(_x) {
			return _ref.apply(this, arguments);
		};
	}());
	app.addEventListener(ON_HIDE, function() {
		var _getCurrentPage2;
		var page = (_getCurrentPage2 = getCurrentPage()) === null || _getCurrentPage2 === void 0 ? void 0 : _getCurrentPage2.vm;
		invokeHook(getApp().vm, ON_HIDE);
		if (page) invokeHook(page, ON_HIDE);
	});
	app.addEventListener(ON_EXIT, function() {
		var appInstance = getApp().vm;
		getAllPages().slice(0).forEach((page) => closePage(page, "none"));
		clearTabBarStatus();
		clearWebviewReady();
		resetWebviewId();
		invokeHook(appInstance, ON_EXIT);
		unregisterApp();
	});
}
function initService(app, unregisterApp) {
	initOn(app, unregisterApp);
}
//#endregion
//#region src/x/framework/app/index.ts
init_web_dom_iterable();
var appCtx;
var entryPageState = {
	isReady: false,
	handledBeforeEntryPageRoutes: false
};
var navigateToPagesBeforeEntryPages = [];
var switchTabPagesBeforeEntryPages = [];
var redirectToPagesBeforeEntryPages = [];
var reLaunchPagesBeforeEntryPages = [];
function initAppVm(appVm) {
	appVm.$vm = appVm;
	appVm.$mpType = "app";
}
function initUniApp(uniApp) {
	uniApp.vm = appCtx;
	uniApp.$vm = appCtx;
	Object.defineProperty(uniApp, "globalData", { get: () => {
		return appCtx.globalData || {};
	} });
}
/**
* registerApp
* @param appVm
* @param nativeApp
*/
function registerApp(appVm, nativeApp, uniApp) {
	setNativeApp(nativeApp);
	initVueApp(appVm);
	appCtx = appVm;
	initAppVm(appCtx);
	initUniApp(uniApp);
	var defaultApp = { globalData: {} };
	extend(appCtx, defaultApp);
	defineGlobalData(appCtx, defaultApp.globalData);
	initService(nativeApp, unregisterApp);
	initEntry(nativeApp);
	initEntryPagePath(nativeApp);
	initGlobalEvent(nativeApp);
	initAppLaunch(appVm);
	initAppError(appVm, nativeApp);
	initSubscribeHandlers();
	__uniConfig.ready = true;
}
function unregisterApp() {
	appCtx.$.appContext.app.unmount();
	appCtx = void 0;
	setNativeApp(void 0);
	__uniConfig.ready = false;
}
function initApp(app) {
	initComponentInstance(app);
}
function initEntryPagePath(app) {
	var debugInfo = app.getRedirectInfo().get("debug");
	if (debugInfo) {
		var url = debugInfo.get("url");
		if (url && url != __uniConfig.entryPagePath) {
			__uniConfig.realEntryPagePath = __uniConfig.entryPagePath;
			var [path, query] = url.split("?");
			__uniConfig.entryPagePath = path;
			if (query) __uniConfig.entryPageQuery = "?".concat(query);
			return;
		}
	}
	if (__uniConfig.conditionUrl) {
		__uniConfig.realEntryPagePath = __uniConfig.entryPagePath;
		var [_path, _query] = __uniConfig.conditionUrl.split("?");
		__uniConfig.entryPagePath = _path;
		if (_query) __uniConfig.entryPageQuery = "?".concat(_query);
	}
}
//#endregion
//#region src/x/api/route/navigateTo.ts
init_web_dom_iterable();
var $navigateTo = (args, _ref) => {
	var { resolve, reject } = _ref;
	var { url, events, animationType, animationDuration } = args;
	var { path, query } = parseUrl(url);
	var [aniType, aniDuration] = initAnimation$1(path, animationType, animationDuration);
	updateEntryPageIsReady(path);
	if (!entryPageState.isReady) {
		navigateToPagesBeforeEntryPages.push({
			args,
			handler: {
				resolve,
				reject
			}
		});
		return;
	}
	_navigateTo({
		url,
		path,
		query,
		events,
		aniType,
		aniDuration
	}).then(resolve).catch(reject);
	handleBeforeEntryPageRoutes();
};
var navigateTo = /* @__PURE__ */ defineAsyncApi(API_NAVIGATE_TO, $navigateTo, NavigateToProtocol, NavigateToOptions);
function _navigateTo(_ref2) {
	var _getCurrentPage;
	var { url, path, query, events, aniType, aniDuration } = _ref2;
	var currentPage = (_getCurrentPage = getCurrentPage()) === null || _getCurrentPage === void 0 ? void 0 : _getCurrentPage.vm;
	var currentRouteType = currentPage == null ? "appLaunch" : API_NAVIGATE_TO;
	invokeBeforeRouteHooks(currentRouteType);
	invokeHook(ON_HIDE);
	currentPage && invokeLastDialogPageHookByUniPage(currentPage.$page, ON_HIDE);
	var eventChannel = new EventChannel(getWebviewId() + 1, events);
	return new Promise((resolve) => {
		setTimeout(() => {
			var noAnimation = aniType === "none" || aniDuration === 0;
			function callback(page) {
				showWebview(page, aniType, aniDuration, () => {
					invokeAfterRouteHooks(currentRouteType);
					resolve({ eventChannel });
					setStatusBarStyle();
				});
			}
			registerPage({
				url,
				path,
				query,
				openType: "navigateTo",
				eventChannel,
				onRegistered(page) {
					if (noAnimation) callback(page);
				}
			}, noAnimation ? void 0 : callback, noAnimation ? 0 : 1);
		}, 0);
	});
}
function initAnimation$1(path, animationType, animationDuration) {
	if (!getCurrentPage()) return ["none", 0];
	var { globalStyle } = __uniConfig;
	var meta = getRouteMeta(path);
	return [animationType || meta.animationType || globalStyle.animationType || ANI_SHOW, animationDuration || meta.animationDuration || globalStyle.animationDuration || 300];
}
//#endregion
//#region src/x/api/route/direct.ts
function isDirectPage(page) {
	var _getCurrentPages$;
	return !!__uniConfig.realEntryPagePath && ((_getCurrentPages$ = getCurrentPages$1()[0]) === null || _getCurrentPages$ === void 0 ? void 0 : _getCurrentPages$.vm) === page;
}
function reLaunchEntryPage() {
	var _uniConfig$entryPage;
	__uniConfig.entryPagePath = __uniConfig.realEntryPagePath;
	__uniConfig.realEntryPagePath = "";
	reLaunch({ url: (_uniConfig$entryPage = __uniConfig.entryPagePath) !== null && _uniConfig$entryPage !== void 0 && _uniConfig$entryPage.startsWith("/") ? __uniConfig.entryPagePath : "/" + __uniConfig.entryPagePath });
}
//#endregion
//#region src/x/api/route/navigateBack.ts
var navigateBack = /* @__PURE__ */ defineAsyncApi(API_NAVIGATE_BACK, (args, _ref) => {
	var { resolve, reject } = _ref;
	var page = getCurrentPage().vm;
	if (!page) return reject("getCurrentPages is empty");
	if (args.from !== "popGesture") {
		var onBackPressRes = invokeHook(page, ON_BACK_PRESS, { from: args.from || "navigateBack" });
		if (onBackPressRes !== true) {
			var dialogPages = page.$page.getDialogPages();
			if (dialogPages.length > 0) {
				var dialogPage = dialogPages[dialogPages.length - 1];
				onBackPressRes = invokeHook(dialogPage.$vm, ON_BACK_PRESS, { from: args.from || "navigateBack" });
			}
		}
		if (onBackPressRes === true) return reject("cancel");
	}
	try {
		uni.hideToast();
		uni.hideLoading();
	} catch (error) {
		console.warn(error);
	}
	if (getPage$BasePage(page).meta.isQuit) invokeHook(getApp().vm, ON_LAST_PAGE_BACK_PRESS);
	else if (isDirectPage(page)) return reLaunchEntryPage();
	else {
		var { delta, animationType, animationDuration } = args;
		back(delta, animationType, animationDuration);
	}
	return resolve();
}, NavigateBackProtocol, NavigateBackOptions);
function back(delta, animationType, animationDuration) {
	var pages = getCurrentBasePages();
	var len = pages.length;
	var currentPage = pages[len - 1];
	if (delta > 1) pages.slice(len - delta, len - 1).reverse().forEach((deltaPage) => {
		clearDialogPages(deltaPage.$page);
		var webview = getNativeApp().pageManager.findPageById(deltaPage.$basePage.id + "");
		if (webview) closeWebview(webview, "none", 0);
	});
	var backPage = function(webview) {
		if (animationType) animationDuration = animationDuration || 300;
		else if (currentPage.$basePage.openType === "redirectTo") {
			animationType = ANI_CLOSE;
			animationDuration = 300;
		} else animationType = "auto";
		closeWebview(webview, animationType, animationDuration, () => {
			pages.slice(len - delta, len).forEach((page) => removePage(page));
			invokeHook(ON_SHOW);
			invokeLastDialogPageHookByUniPage(getCurrentPage(), ON_SHOW);
			setStatusBarStyle();
		});
	};
	var webview = getNativeApp().pageManager.findPageById(currentPage.$basePage.id + "");
	clearDialogPages(currentPage.$page);
	webview && backPage(webview);
}
//#endregion
//#region src/x/api/route/openDialogPage.ts
init_web_dom_iterable();
var openDialogPage = (options) => {
	var _options$success, _options$complete;
	var { url, animationType, animationDuration } = options;
	if (!options.url) {
		triggerFailCallback(options, "url is required");
		return null;
	}
	var { path, query } = parseUrl(url);
	path = normalizeRoute(path);
	var errMsg = createNormalizeUrl("navigateTo")(url, {});
	if (errMsg) {
		triggerFailCallback(options, errMsg);
		return null;
	}
	var parentPage = options.parentPage || null;
	var currentPages = getCurrentPages();
	if (parentPage) {
		if (currentPages.indexOf(parentPage) === -1) {
			triggerFailCallback(options, "parentPage is not a valid page");
			return null;
		}
	}
	if (currentPages.length && !parentPage) parentPage = currentPages[currentPages.length - 1];
	var dialogPage = new UniDialogPageImpl();
	dialogPage.route = path;
	dialogPage.getParentPage = () => parentPage;
	dialogPage.$component = null;
	dialogPage.$disableEscBack = false;
	dialogPage.$triggerParentHide = !!options.triggerParentHide;
	var systemDialog = isSystemDialogPage(dialogPage);
	if (!systemDialog) {
		if (!parentPage) homeDialogPages.push(dialogPage);
		else {
			var dialogPages = parentPage.getDialogPages();
			dialogPageTriggerPrevDialogPageLifeCycle(parentPage, ON_HIDE);
			dialogPages.push(dialogPage);
		}
		setCurrentNormalDialogPage(dialogPage);
	} else {
		var targetSystemDialogPages = [];
		if (!parentPage) targetSystemDialogPages = homeSystemDialogPages;
		else {
			dialogPageTriggerPrevDialogPageLifeCycle(parentPage, ON_HIDE);
			targetSystemDialogPages = getSystemDialogPages(parentPage);
		}
		targetSystemDialogPages.push(dialogPage);
		if (isSystemActionSheetDialogPage(dialogPage)) closePreSystemDialogPage(targetSystemDialogPages, SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH);
		setCurrentSystemDialogPage(dialogPage);
	}
	var [aniType, aniDuration] = initAnimation(path, animationType, animationDuration);
	var noAnimation = aniType === "none" || aniDuration === 0;
	function callback(page) {
		showWebview(page, aniType, aniDuration, () => {
			beforeRoute();
			dialogPageTriggerParentHide(dialogPage);
		});
	}
	var page = registerDialogPage({
		url,
		path,
		query,
		openType: OPEN_DIALOG_PAGE
	}, dialogPage, noAnimation ? void 0 : callback, noAnimation ? 0 : 1);
	if (systemDialog) dialogPage.__nativeType = "systemDialog";
	if (noAnimation) callback(page);
	var successOptions = { errMsg: "openDialogPage:ok" };
	(_options$success = options.success) === null || _options$success === void 0 || _options$success.call(options, successOptions);
	(_options$complete = options.complete) === null || _options$complete === void 0 || _options$complete.call(options, successOptions);
	return dialogPage;
};
function triggerFailCallback(options, errMsg) {
	var _options$fail, _options$complete2;
	var failOptions = new UniError("uni-openDialogPage", 4, "openDialogPage: fail, ".concat(errMsg));
	(_options$fail = options.fail) === null || _options$fail === void 0 || _options$fail.call(options, failOptions);
	(_options$complete2 = options.complete) === null || _options$complete2 === void 0 || _options$complete2.call(options, failOptions);
}
function initAnimation(path, animationType, animationDuration) {
	if (!getCurrentPage()) return ["none", 0];
	var { globalStyle } = __uniConfig;
	var meta = getRouteMeta(path);
	var _animationType = animationType || meta.animationType || globalStyle.animationType || ANI_SHOW;
	if (_animationType == "pop-in") _animationType = "none";
	return [_animationType, animationDuration || meta.animationDuration || globalStyle.animationDuration || 300];
}
//#endregion
//#region src/x/api/tabBar/setTabBarBadge.ts
init_web_dom_iterable();
var setTabBarBadge = /* @__PURE__ */ defineAsyncApi(API_SET_TAB_BAR_BADGE, (_ref, _ref2) => {
	var { index, text } = _ref;
	var { resolve, reject } = _ref2;
	var tabBar = getTabBar();
	if (tabBar === null) {
		reject("tabBar is not exist");
		return;
	}
	tabBar.setTabBarBadge(new Map([["index", index], ["text", text]]));
	resolve();
}, SetTabBarBadgeProtocol, SetTabBarBadgeOptions);
//#endregion
//#region src/x/api/tabBar/removeTabBarBadge.ts
init_web_dom_iterable();
var removeTabBarBadge = /* @__PURE__ */ defineAsyncApi(API_REMOVE_TAB_BAR_BADGE, (_ref, _ref2) => {
	var { index } = _ref;
	var { resolve, reject } = _ref2;
	var tabBar = getTabBar();
	if (tabBar === null) {
		reject("tabBar is not exist");
		return;
	}
	tabBar.removeTabBarBadge(new Map([["index", index]]));
	resolve();
}, RemoveTabBarBadgeProtocol, RemoveTabBarBadgeOptions);
//#endregion
//#region src/x/api/tabBar/setTabBarItem.ts
init_web_dom_iterable();
var setTabBarItem = /* @__PURE__ */ defineAsyncApi(API_SET_TAB_BAR_ITEM, (_ref, _ref2) => {
	var { index, text, iconPath, selectedIconPath, pagePath, visible, iconfont } = _ref;
	var { resolve, reject } = _ref2;
	var tabBar = getTabBar();
	if (tabBar === null) {
		reject("tabBar is not exist");
		return;
	}
	var item = /* @__PURE__ */ new Map();
	item.set("index", index);
	if (typeof text === "string") item.set("text", text);
	if (typeof iconPath === "string") item.set("iconPath", iconPath);
	if (typeof selectedIconPath === "string") item.set("selectedIconPath", selectedIconPath);
	if (typeof pagePath === "string") item.set("pagePath", pagePath);
	if (typeof visible === "boolean") item.set("visible", visible);
	if (iconfont != null) {
		var iconfontOptions = iconfont;
		var _iconfont = new Map([
			["text", iconfontOptions.text],
			["selectedText", iconfontOptions.selectedText],
			["fontSize", iconfontOptions.fontSize],
			["color", iconfontOptions.color],
			["selectedColor", iconfontOptions.selectedColor]
		]);
		item.set("iconfont", _iconfont);
	}
	tabBar.setTabBarItem(item);
	resolve();
}, SetTabBarItemProtocol, SetTabBarItemOptions);
//#endregion
//#region src/x/api/tabBar/setTabBarStyle.ts
init_web_dom_iterable();
var setTabBarStyle = /* @__PURE__ */ defineAsyncApi(API_SET_TAB_BAR_STYLE, (options, _ref) => {
	var { resolve, reject } = _ref;
	var tabBar = getTabBar();
	if (tabBar === null) {
		reject("tabBar is not exist");
		return;
	}
	var style = new Map([
		["color", options.color],
		["selectedColor", options.selectedColor],
		["backgroundColor", options.backgroundColor],
		["backgroundImage", options.backgroundImage],
		["backgroundRepeat", options.backgroundRepeat],
		["borderStyle", options.borderStyle],
		["borderColor", options.borderColor]
	]);
	if (!!options.midButton) {
		var midButtonOptions = options.midButton;
		var midButton = new Map([
			["width", midButtonOptions.width],
			["height", midButtonOptions.height],
			["iconPath", midButtonOptions.iconPath],
			["text", midButtonOptions.text],
			["iconPath", midButtonOptions.iconPath],
			["iconWidth", midButtonOptions.iconWidth],
			["backgroundImage", midButtonOptions.backgroundImage]
		]);
		if (!!midButtonOptions.iconfont) {
			var iconfontOptions = midButtonOptions.iconfont;
			var iconfont = new Map([
				["text", iconfontOptions.text],
				["selectedText", iconfontOptions.selectedText],
				["fontSize", iconfontOptions.fontSize],
				["color", iconfontOptions.color],
				["selectedColor", iconfontOptions.selectedColor]
			]);
			midButton.set("iconfont", iconfont);
		}
		style.set("midButton", midButton);
	}
	fixBorderStyle(style);
	tabBar.setTabBarStyle(style);
	resolve();
}, SetTabBarStyleProtocol, SetTabBarStyleOptions);
//#endregion
//#region src/x/api/tabBar/hideTabBar.ts
init_web_dom_iterable();
var hideTabBar = /* @__PURE__ */ defineAsyncApi(API_HIDE_TAB_BAR, (options, _ref) => {
	var { resolve, reject } = _ref;
	var tabBar = getTabBar();
	if (tabBar === null) {
		reject("tabBar is not exist");
		return;
	}
	tabBar.hideTabBar(new Map([["animation", options === null || options === void 0 ? void 0 : options.animation]]));
	resolve();
}, HideTabBarProtocol);
//#endregion
//#region src/x/api/tabBar/showTabBar.ts
init_web_dom_iterable();
var showTabBar = /* @__PURE__ */ defineAsyncApi(API_SHOW_TAB_BAR, (args, _ref) => {
	var { resolve, reject } = _ref;
	var tabBar = getTabBar();
	var animation = args && args.animation;
	if (tabBar === null) {
		reject("tabBar is not exist");
		return;
	}
	tabBar.showTabBar(new Map([["animation", animation]]));
	resolve();
}, ShowTabBarProtocol);
//#endregion
//#region src/x/api/tabBar/showTabBarRedDot.ts
init_web_dom_iterable();
var showTabBarRedDot = /* @__PURE__ */ defineAsyncApi(API_SHOW_TAB_BAR_RED_DOT, (_ref, _ref2) => {
	var { index } = _ref;
	var { resolve, reject } = _ref2;
	var tabBar = getTabBar();
	if (tabBar === null) {
		reject("tabBar is not exist");
		return;
	}
	tabBar.showTabBarRedDot(new Map([["index", index]]));
	resolve();
}, ShowTabBarRedDotProtocol, ShowTabBarRedDotOptions);
//#endregion
//#region src/x/api/tabBar/hideTabBarRedDot.ts
init_web_dom_iterable();
var hideTabBarRedDot = /* @__PURE__ */ defineAsyncApi(API_HIDE_TAB_BAR_RED_DOT, (_ref, _ref2) => {
	var { index } = _ref;
	var { resolve, reject } = _ref2;
	var tabBar = getTabBar();
	if (tabBar === null) {
		reject("tabBar is not exist");
		return;
	}
	tabBar.hideTabBarRedDot(new Map([["index", index]]));
	resolve();
}, HideTabBarRedDotProtocol, HideTabBarRedDotOptions);
//#endregion
//#region src/x/api/tabBar/onTabBarMidButtonTap.ts
var onTabBarMidButtonTap = (cb) => {
	onTabBarMidButtonTapCallback.push(cb);
};
//#endregion
//#region src/x/api/navigationBar/setNavigationBarColor.ts
init_web_dom_iterable();
var setNavigationBarColor = /* @__PURE__ */ defineAsyncApi(API_SET_NAVIGATION_BAR_COLOR, (_ref, _ref2) => {
	var { frontColor, backgroundColor } = _ref;
	var { resolve, reject } = _ref2;
	var page = getCurrentPage();
	if (!page) return reject("getCurrentPages is empty");
	page.vm.$nativePage.updateStyle(new Map([["navigationBarTextStyle", frontColor == "#000000" ? "black" : "white"], ["navigationBarBackgroundColor", backgroundColor]]));
	resolve();
}, SetNavigationBarColorProtocol, SetNavigationBarColorOptions);
//#endregion
//#region src/x/api/navigationBar/setNavigationBarTitle.ts
init_web_dom_iterable();
var setNavigationBarTitle = /* @__PURE__ */ defineAsyncApi(API_SET_NAVIGATION_BAR_TITLE, (options, _ref) => {
	var { resolve, reject } = _ref;
	var page = getCurrentPage().vm;
	if (page == null) {
		reject("page is not ready");
		return;
	}
	page.$nativePage.updateStyle(new Map([["navigationBarTitleText", options.title]]));
	resolve();
}, SetNavigationBarTitleProtocol);
//#endregion
//#region src/x/api/dom/getElementById.ts
var getElementById = /* @__PURE__ */ defineSyncApi("getElementById", (id) => {
	var page = getCurrentPage();
	if (page == null) return null;
	return page.getElementById(id);
});
//#endregion
//#region src/x/api/dom/createSelectorQuery.ts
function isVueComponent(comp) {
	var has$instance = typeof comp.$ === "object";
	var has$el = typeof comp.$el === "object";
	return has$instance && has$el;
}
var NodesRefImpl = class {
	constructor(selectorQuery, component, selector, single) {
		this._selectorQuery = selectorQuery;
		this._component = component;
		this._selector = selector;
		this._single = single;
	}
	boundingClientRect(callback) {
		if (callback === null || typeof callback === "function") {
			this._selectorQuery._push(this._selector, this._component, this._single, {
				id: true,
				dataset: true,
				rect: true,
				size: true
			}, callback);
			return this._selectorQuery;
		} else return this.boundingClientRect(null);
	}
	fields(fields, callback) {
		this._selectorQuery._push(this._selector, this._component, this._single, fields, callback);
		return this._selectorQuery;
	}
	scrollOffset(callback) {
		this._selectorQuery._push(this._selector, this._component, this._single, {
			id: true,
			dataset: true,
			scrollOffset: true
		}, callback);
		return this._selectorQuery;
	}
	context(callback) {
		this._selectorQuery._push(this._selector, this._component, this._single, { context: true }, callback);
		return this._selectorQuery;
	}
	/**
	* fields({node:true})
	*/
	node(_callback) {
		this._selectorQuery._push(this._selector, this._component, this._single, { node: true }, _callback);
		return this._selectorQuery;
	}
};
var SelectorQueryImpl = class {
	constructor(component) {
		this._component = null;
		this._component = component;
		this._queue = [];
		this._queueCb = [];
	}
	exec(callback) {
		var _this$_component2;
		(_this$_component2 = this._component) === null || _this$_component2 === void 0 || (_this$_component2 = _this$_component2.$) === null || _this$_component2 === void 0 || _this$_component2.$waitNativeRender(() => {
			requestComponentInfo(this._component, this._queue, (res) => {
				var queueCbs = this._queueCb;
				res.forEach((info, _index) => {
					var queueCb = queueCbs[_index];
					if (isFunction(queueCb)) queueCb(info);
				});
				if (callback && isFunction(callback)) callback(res);
			});
		});
		return this._nodesRef;
	}
	in(component) {
		if (component && isVueComponent(component)) this._component = component;
		return this;
	}
	select(selector) {
		this._nodesRef = new NodesRefImpl(this, this._component, selector, true);
		return this._nodesRef;
	}
	selectAll(selector) {
		this._nodesRef = new NodesRefImpl(this, this._component, selector, false);
		return this._nodesRef;
	}
	selectViewport() {
		this._nodesRef = new NodesRefImpl(this, null, "", true);
		return this._nodesRef;
	}
	_push(selector, component, single, fields, callback) {
		this._queue.push({
			component,
			selector,
			single,
			fields
		});
		this._queueCb.push(callback);
	}
};
/**
* QuerySelectorHelper
*/
var QuerySelectorHelper = class QuerySelectorHelper {
	constructor(element, vnode, fields) {
		this._element = element;
		this._commentStartVNode = vnode;
		this._fields = fields;
	}
	/**
	* entry
	*/
	static queryElement(element, selector, all, vnode, fields) {
		return new QuerySelectorHelper(element, vnode, fields).query(selector, all);
	}
	/**
	* 执行查询
	* @param selector 选择器
	* @param all 是否查询所有 selectAll
	* @returns
	*/
	query(selector, all) {
		if (this._element.nodeName == "#comment") return this.queryFragment(this._element, selector, all);
		else return all ? this.querySelectorAll(this._element, selector) : this.querySelector(this._element, selector);
	}
	queryFragment(el, selector, all) {
		var current = el.nextSibling;
		if (current == null) return null;
		if (all) {
			var result1 = [];
			while (true) {
				var queryResult = this.querySelectorAll(current, selector);
				if (queryResult != null) result1.push(...queryResult);
				current = current.nextSibling;
				if (current == null || this._commentStartVNode.anchor == current) break;
			}
			return result1;
		} else {
			var result2 = null;
			while (true) {
				result2 = this.querySelector(current, selector);
				current = current.nextSibling;
				if (result2 != null || current == null || this._commentStartVNode.anchor == current) break;
			}
			return result2;
		}
	}
	querySelector(element, selector) {
		var element2 = this.querySelf(element, selector);
		if (element2 == null) element2 = element.querySelector(selector);
		if (element2 != null) return this.getNodeInfo(element2);
		return null;
	}
	querySelectorAll(element, selector) {
		var nodesInfoArray = [];
		if (this.querySelf(element, selector) != null) nodesInfoArray.push(this.getNodeInfo(element));
		var findNodes = element.querySelectorAll(selector);
		findNodes === null || findNodes === void 0 || findNodes.forEach((el) => {
			nodesInfoArray.push(this.getNodeInfo(el));
		});
		return nodesInfoArray;
	}
	querySelf(element, selector) {
		if (element == null || selector.length < 2) return null;
		var selectorType = selector.charAt(0);
		var selectorName = selector.slice(1);
		if (selectorType == "." && element.classList.includes(selectorName)) return element;
		if (selectorType == "#" && element.getAttribute("id") == selectorName) return element;
		if (selector.toUpperCase() == element.nodeName.toUpperCase()) return element;
		return null;
	}
	/**
	* 查询元素信息
	* @param element
	* @returns
	*/
	getNodeInfo(element) {
		var _element$getAttribute;
		if (this._fields.node == true) {
			var _nodeInfo = { node: element };
			if (this._fields.size == true) {
				var _rect = element.getBoundingClientRect();
				_nodeInfo.width = _rect.width;
				_nodeInfo.height = _rect.height;
			}
			return _nodeInfo;
		}
		var rect = element.getBoundingClientRect();
		return {
			id: (_element$getAttribute = element.getAttribute("id")) === null || _element$getAttribute === void 0 ? void 0 : _element$getAttribute.toString(),
			dataset: null,
			left: rect.left,
			top: rect.top,
			right: rect.right,
			bottom: rect.bottom,
			width: rect.width,
			height: rect.height
		};
	}
};
/**
* requestComponentInfo
* @param vueComponent
* @param queue
* @param callback
*/
function requestComponentInfo(vueComponent, queue, callback) {
	var result = [];
	var el = vueComponent === null || vueComponent === void 0 ? void 0 : vueComponent.$el;
	if (el != null) queue.forEach((item) => {
		var queryResult = QuerySelectorHelper.queryElement(el, item.selector, !item.single, vueComponent === null || vueComponent === void 0 ? void 0 : vueComponent.$.subTree, item.fields);
		if (queryResult != null) result.push(queryResult);
	});
	callback(result);
}
/**
* createSelectorQuery
*/
var createSelectorQuery = function() {
	var instance = getCurrentPage().vm;
	return new SelectorQueryImpl(instance);
};
//#endregion
//#region src/x/api/dom/createCanvasContextAsync.ts
var CanvasContextImpl = class {
	constructor(element) {
		this._element = element;
	}
	getContext(contextType) {
		return this._element.getContext(contextType);
	}
	toBlob(callback, type, quality) {
		throw new Error("Method not implemented.");
	}
	toDataURL(type, quality) {
		return this._element.toDataURL(type, quality);
	}
	createImage() {
		return new Image();
	}
	createPath2D() {
		return new Path2D();
	}
	requestAnimationFrame(callback) {
		return requestAnimationFrame(callback);
	}
	cancelAnimationFrame(taskId) {
		cancelAnimationFrame(taskId);
	}
};
var createCanvasContextAsync = /* @__PURE__ */ defineAsyncApi("createCanvasContextAsync", (options, _ref) => {
	var _options$component;
	var { resolve, reject } = _ref;
	if (getCurrentPage().vm == null) return null;
	createSelectorQuery().in((_options$component = options.component) !== null && _options$component !== void 0 ? _options$component : null).select("#" + options.id).fields({ node: true }, (ret) => {
		var node = ret.node;
		if (node != null) resolve(new CanvasContextImpl(node));
		else reject(new UniError("uni-createCanvasContextAsync", -1, "canvas id invalid.").errMsg);
	}).exec();
});
//#endregion
//#region src/x/api/ui/pageScrollTo.ts
function queryElementTop(component, selector) {
	var _component$$el;
	var scrollNode = (_component$$el = component.$el) === null || _component$$el === void 0 ? void 0 : _component$$el.querySelector(selector);
	if (scrollNode != null) return scrollNode.getBoundingClientRect().top;
	return null;
}
var pageScrollTo = /* @__PURE__ */ defineAsyncApi(API_PAGE_SCROLL_TO, (options, res) => {
	var currentPage = getCurrentPage().vm;
	var scrollViewNode = currentPage === null || currentPage === void 0 ? void 0 : currentPage.$el;
	if (scrollViewNode == null || scrollViewNode.tagName != "SCROLL-VIEW") {
		res.reject("selector invalid");
		return;
	}
	var top = options.scrollTop;
	if (!!options.selector) {
		top = queryElementTop(currentPage, options.selector);
		if (top != null) {
			var currentScrollTop = scrollViewNode.scrollTop;
			top += currentScrollTop;
		}
	}
	if (top == null || top < 0) {
		res.reject("top or selector invalid");
		return;
	}
	if (options.offsetTop != null) top += options.offsetTop;
	scrollViewNode.scrollTop = top;
	res.resolve();
}, PageScrollToProtocol, PageScrollToOptions);
//#endregion
//#region src/x/api/ui/startPullDownRefresh.ts
var startPullDownRefresh = /* @__PURE__ */ defineAsyncApi(API_START_PULL_DOWN_REFRESH, (_options, res) => {
	var page = getCurrentPage().vm;
	if (page === null) {
		res.reject("page is not ready");
		return;
	}
	page.$nativePage.startPullDownRefresh({
		success: res.resolve,
		fail: (err) => {
			res.reject(err.errMsg, err);
		}
	});
});
//#endregion
//#region src/x/api/ui/stopPullDownRefresh.ts
var stopPullDownRefresh = /* @__PURE__ */ defineAsyncApi(API_STOP_PULL_DOWN_REFRESH, (_args, res) => {
	var page = getCurrentPage().vm;
	if (page === null) {
		res.reject("page is not ready");
		return;
	}
	page.$nativePage.stopPullDownRefresh();
	res.resolve();
});
//#endregion
//#region src/x/api/base/env.ts
var env = {
	USER_DATA_PATH: "unifile://usr/",
	CACHE_PATH: "unifile://cache/",
	SANDBOX_PATH: "unifile://sandbox/",
	TEMP_PATH: "unifile://temp/",
	ANDROID_INTERNAL_SANDBOX_PATH: "unifile://androidInternalSandbox/"
};
//#endregion
//#region src/x/api/performance/index.ts
var _PerformanceEntryStatus;
var APP_LAUNCH = "appLaunch";
var PERFORMANCE_BUFFER_SIZE = 30;
var ENTRY_TYPE_RENDER = "render";
var ENTRY_TYPE_NAVIGATION = "navigation";
var RENDER_TYPE_FIRST_LAYOUT = "firstLayout";
var RENDER_TYPE_FIRST_RENDER = "firstRender";
var PerformanceEntryStatus = class PerformanceEntryStatus {
	get state() {
		return this._state;
	}
	set state(state) {
		this._state = state;
		if (this._state == PerformanceEntryStatus.STATE_BEFORE) this.executeBefore();
		else if (this._state == PerformanceEntryStatus.STATE_AFTER) this.executeAfter();
		else if (this._state == PerformanceEntryStatus.STATE_READY) this.executeReady();
	}
	get entryData() {
		return this._entryData;
	}
	constructor(entryType, name) {
		this._state = PerformanceEntryStatus.STATE_EMPTY;
		this._entryData = {
			entryType,
			name,
			duration: 0,
			startTime: 0
		};
	}
	executeBefore() {
		var _getCurrentPage;
		var page = (_getCurrentPage = getCurrentPage()) === null || _getCurrentPage === void 0 ? void 0 : _getCurrentPage.vm;
		if (page != null) this._entryData.referrerPath = page.route;
	}
	executeAfter() {
		var _getCurrentPage2;
		var page = (_getCurrentPage2 = getCurrentPage()) === null || _getCurrentPage2 === void 0 ? void 0 : _getCurrentPage2.vm;
		if (page != null) {
			this._entryData.pageId = parseInt(page.$nativePage.pageId);
			this._entryData.path = page.route;
		}
	}
	executeReady() {}
	getCurrentInnerPage() {
		var _getCurrentPage3;
		var currentPage = (_getCurrentPage3 = getCurrentPage()) === null || _getCurrentPage3 === void 0 ? void 0 : _getCurrentPage3.vm;
		if (currentPage == null) return null;
		return currentPage.$nativePage;
	}
};
_PerformanceEntryStatus = PerformanceEntryStatus;
_PerformanceEntryStatus.STATE_EMPTY = 0;
_PerformanceEntryStatus.STATE_BEFORE = 1;
_PerformanceEntryStatus.STATE_AFTER = 2;
_PerformanceEntryStatus.STATE_READY = 3;
var PerformanceEntryStatusLayout = class extends PerformanceEntryStatus {
	constructor() {
		super(ENTRY_TYPE_RENDER, RENDER_TYPE_FIRST_LAYOUT);
	}
	executeAfter() {
		super.executeAfter();
		this._entryData.startTime = Date.now();
	}
	executeReady() {
		super.executeReady();
		var innerPage = super.getCurrentInnerPage();
		if (innerPage != null) this._entryData.duration = innerPage.getFirstPageLayoutDuration();
	}
};
var PerformanceEntryStatusRender = class extends PerformanceEntryStatus {
	constructor() {
		super(ENTRY_TYPE_RENDER, RENDER_TYPE_FIRST_RENDER);
	}
	executeAfter() {
		super.executeAfter();
		this._entryData.startTime = Date.now();
	}
	executeReady() {
		super.executeReady();
		var innerPage = super.getCurrentInnerPage();
		if (innerPage != null) this._entryData.duration = innerPage.getFirstPageRenderDuration();
	}
};
var PerformanceEntryStatusNavigation = class extends PerformanceEntryStatus {
	constructor(name, navigationType) {
		super(ENTRY_TYPE_NAVIGATION, name);
		this._entryData.navigationType = navigationType;
	}
	executeBefore() {
		super.executeBefore();
		this._entryData.startTime = Date.now();
	}
	executeReady() {
		if (super.getCurrentInnerPage() != null) {
			this._entryData.duration = Date.now() - this._entryData.startTime;
			if (this._entryData.name == APP_LAUNCH) this._entryData.duration += getNativeApp().getAppStartDuration();
		}
	}
};
var PerformanceEntryQueue = class extends Array {
	constructor() {
		super(...arguments);
		this._queueSize = PERFORMANCE_BUFFER_SIZE;
	}
	get queueSize() {
		return this._queueSize;
	}
	set queueSize(value) {
		this._queueSize = value;
		if (this.length > value) this.dequeue(this.length - value);
	}
	push() {
		return this.enqueue(...arguments);
	}
	enqueue() {
		if (this.length > this._queueSize - 1) this.shift();
		return super.push(...arguments);
	}
	dequeue() {
		var count = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
		this.splice(0, count);
	}
};
var PerformanceObserverEntryListImpl = class {
	constructor() {
		this._queue = new PerformanceEntryQueue();
	}
	push() {
		this._queue.push(...arguments);
	}
	getEntries() {
		return this._queue;
	}
	getEntriesByType(entryType) {
		return this._queue.filter((entry) => entry.entryType == entryType);
	}
	getEntriesByName(name, entryType) {
		return this._queue.filter((entry) => entry.entryType == entryType && entry.name == name);
	}
	clear() {
		this._queue.length = 0;
	}
	get bufferSize() {
		return this._queue.queueSize;
	}
	set bufferSize(size) {
		this._queue.queueSize = size;
	}
};
var PerformanceObserverImpl = class {
	constructor(performance, callback) {
		this._entryTypes = [];
		this._callback = null;
		this._entryList = new PerformanceObserverEntryListImpl();
		this._owner = performance;
		this._callback = callback;
	}
	observe(options) {
		if ((options === null || options === void 0 ? void 0 : options.entryTypes) != null) {
			this._entryTypes.length = 0;
			this._entryTypes.push(...options.entryTypes);
		}
		if (this._entryTypes.length > 0) this._owner.connect(this);
		else this.disconnect();
	}
	disconnect() {
		this._entryList.clear();
		this._owner.disconnect(this);
	}
	dispatchCallback() {
		var _this$_callback;
		(_this$_callback = this._callback) === null || _this$_callback === void 0 || _this$_callback.call(this, this._entryList);
	}
	get entryTypes() {
		return this._entryTypes;
	}
	get entryList() {
		return this._entryList;
	}
};
var PerformanceProvider = class {
	constructor() {
		this._entryStatus = [];
	}
	get entryStatus() {
		return this._entryStatus;
	}
	onBefore(type) {
		if (type == APP_LAUNCH || type == "switchTab" || type == "navigateTo" || type == "redirectTo" || type == "navigateBack") this._pushEntryStatus(ENTRY_TYPE_NAVIGATION, this._navigationToName(type), type);
		if (type == APP_LAUNCH || type == "navigateTo" || type == "redirectTo") {
			this._pushEntryStatus(ENTRY_TYPE_RENDER, RENDER_TYPE_FIRST_LAYOUT, type);
			this._pushEntryStatus(ENTRY_TYPE_RENDER, RENDER_TYPE_FIRST_RENDER, type);
		}
		this._forwardState();
	}
	onAfter(type) {
		this._forwardState();
	}
	onReady() {
		this._forwardState();
	}
	removeAllStatus() {
		this._entryStatus.length = 0;
	}
	_pushEntryStatus(entryType, name, navigationType) {
		var entry = null;
		if (entryType == ENTRY_TYPE_NAVIGATION) entry = new PerformanceEntryStatusNavigation(name, navigationType);
		else if (entryType == ENTRY_TYPE_RENDER) {
			if (name == RENDER_TYPE_FIRST_LAYOUT) entry = new PerformanceEntryStatusLayout();
			else if (name == RENDER_TYPE_FIRST_RENDER) entry = new PerformanceEntryStatusRender();
		}
		if (entry != null) this._entryStatus.push(entry);
	}
	_forwardState() {
		this._entryStatus.forEach((entry) => {
			entry.state += 1;
		});
	}
	_navigationToName(type) {
		if (type == APP_LAUNCH) return APP_LAUNCH;
		return "route";
	}
};
var PerformanceAllocate = class {
	constructor(allEntryList, observerList) {
		this._allEntryList = allEntryList;
		this._observerList = observerList;
	}
	pushEntryStatus(status) {
		this.pushAllEntryData(status);
		this.pushObserverList(status);
	}
	pushAllEntryData(status) {
		status.forEach((entryStatus) => {
			this._allEntryList.push(entryStatus.entryData);
		});
	}
	pushObserverList(status) {
		this._observerList.forEach((observer) => {
			var entryList = observer.entryList;
			entryList.clear();
			status.forEach((entryStatus) => {
				var entryData = entryStatus.entryData;
				if (observer.entryTypes.includes(entryData.entryType)) entryList.push(entryData);
			});
			observer.dispatchCallback();
		});
	}
};
var PerformanceImpl = class {
	constructor() {
		this._allEntryList = new PerformanceObserverEntryListImpl();
		this._observerList = [];
		this._provider = new PerformanceProvider();
		this._allocate = new PerformanceAllocate(this._allEntryList, this._observerList);
		onBeforeRoute((type) => {
			this._provider.onBefore(type);
		});
		onAfterRoute((type) => {
			this._provider.onAfter(type);
			if (type == "navigateBack") this.dispatchObserver();
		});
		onPageReady((page) => {
			this.dispatchObserver();
		});
	}
	dispatchObserver() {
		this._provider.onReady();
		this._allocate.pushEntryStatus(this._provider.entryStatus);
		this._provider.removeAllStatus();
	}
	createObserver(callback) {
		return new PerformanceObserverImpl(this, callback);
	}
	connect(observer) {
		if (this._observerList.indexOf(observer) < 0) this._observerList.push(observer);
	}
	disconnect(observer) {
		var index = this._observerList.indexOf(observer);
		if (index >= 0) this._observerList.splice(index, 1);
	}
	getEntries() {
		return this._allEntryList.getEntries();
	}
	getEntriesByType(entryType) {
		return this._allEntryList.getEntriesByType(entryType);
	}
	getEntriesByName(name, entryType) {
		return this._allEntryList.getEntriesByName(name, entryType);
	}
	setBufferSize(size) {
		this._allEntryList.bufferSize = size;
	}
};
var getPerformance = function() {
	return new PerformanceImpl();
};
//#endregion
//#region src/service/api/plugin/uts.ts
var callbackId = 1;
var proxy;
var keepAliveCallbacks = {};
function isUniElement(obj) {
	return obj && typeof obj.getNodeId === "function" && obj.pageId;
}
function isComponentPublicInstance(instance) {
	return instance && instance.$ && instance.$.proxy === instance;
}
function parseElement(obj) {
	if (isUniElement(obj)) return obj;
}
function serializeComponentPublicInstance(obj) {
	if (obj.$el) return serializeUniElement(obj.$el, "ComponentPublicInstance");
	else return {
		__type__: "ComponentPublicInstance",
		pageId: "",
		nodeId: ""
	};
}
function serializeArrayBuffer(obj) {
	if (typeof ArrayBufferWrapper !== "undefined") return {
		__type__: "ArrayBuffer",
		value: new ArrayBufferWrapper(obj)
	};
	return {
		__type__: "ArrayBuffer",
		value: obj
	};
}
function serializeUniElement(el, type) {
	var nodeId = "";
	var pageId = "";
	if (el && el.getNodeId) {
		pageId = el.pageId;
		nodeId = el.getNodeId();
	}
	return {
		__type__: type,
		pageId,
		nodeId
	};
}
function toRaw(observed) {
	var raw = observed && observed.__v_raw;
	return raw ? toRaw(raw) : observed;
}
function normalizeArg(arg, callbacks, keepAlive, context) {
	arg = toRaw(arg);
	var isVaporAndroid = false;
	if (typeof arg === "function") {
		var id;
		if (keepAlive) {
			var oldId = Object.keys(callbacks).find((id) => callbacks[id] === arg);
			id = oldId ? parseInt(oldId) : callbackId++;
			callbacks[id] = arg;
		} else {
			id = callbackId++;
			callbacks[id] = arg;
		}
		return id;
	} else if (isArray(arg)) {
		context.depth++;
		return arg.map((item) => normalizeArg(item, callbacks, keepAlive, context));
	} else if (arg instanceof ArrayBuffer) {
		if (isVaporAndroid) {
			context.nested = true;
			return arg;
		}
		if (context.depth > 0) context.nested = true;
		return serializeArrayBuffer(arg);
	} else if (isPlainObject(arg) || isUniElement(arg)) {
		var uniElement = parseElement(arg);
		if (uniElement) {
			if (context.depth > 0 || isVaporAndroid) context.nested = true;
			return serializeUniElement(uniElement, "UniElement");
		} else if (isComponentPublicInstance(arg)) {
			if (context.depth > 0 || isVaporAndroid) context.nested = true;
			return serializeComponentPublicInstance(arg);
		} else {
			var newArg = {};
			Object.keys(arg).forEach((name) => {
				context.depth++;
				newArg[name] = normalizeArg(arg[name], callbacks, keepAlive, context);
			});
			return newArg;
		}
	}
	return arg;
}
function initUTSInstanceMethod(async, opts, instanceId, proxy) {
	return initProxyFunction("method", async, opts, instanceId, proxy);
}
function getProxy() {
	if (!proxy) proxy = {
		invokeSync(args, callback) {
			return nativeChannel.invokeSync("APP-SERVICE", args, callback);
		},
		invokeAsync(args, callback) {
			return nativeChannel.invokeAsync("APP-SERVICE", args, callback);
		}
	};
	return proxy;
}
function resolveSyncResult(args, res, returnOptions, instanceId, proxy) {
	if (!res) throw new Error("返回值为：" + JSON.stringify(res) + "；请求参数为：" + JSON.stringify(args));
	if (isString(res)) try {
		res = JSON.parse(res);
	} catch (e) {
		throw new Error("JSON.parse(".concat(res, "): ") + e);
	}
	if (res.errMsg) throw new Error(res.errMsg);
	if (returnOptions) {
		if (returnOptions.type === "interface" && typeof res.params === "number") {
			if (!res.params) return null;
			if (res.params === instanceId && proxy) return proxy;
			if (interfaceDefines[returnOptions.options]) return new (initUTSProxyClass(extend({ instanceId: res.params }, interfaceDefines[returnOptions.options])))();
		}
	}
	return res.params;
}
function invokePropGetter(args) {
	if (args.errMsg) throw new Error(args.errMsg);
	delete args.errMsg;
	return resolveSyncResult(args, getProxy().invokeSync(args, () => {}));
}
function initProxyFunction(type, async, _ref, instanceId, proxy) {
	var { moduleName, moduleType, package: pkg, class: cls, name: methodName, method, companion, keepAlive, params: methodParams, return: returnOptions, errMsg } = _ref;
	if (!keepAlive) keepAlive = (methodName.indexOf("on") === 0 || methodName.indexOf("off") === 0) && methodParams.length === 1 && methodParams[0].type === "UTSCallback";
	var baseArgs = instanceId ? {
		moduleName,
		moduleType,
		id: instanceId,
		type,
		name: methodName,
		method: methodParams,
		nested: false,
		keepAlive
	} : {
		moduleName,
		moduleType,
		package: pkg,
		class: cls,
		name: method || methodName,
		type,
		companion,
		method: methodParams,
		nested: false,
		keepAlive
	};
	return function() {
		if (errMsg) throw new Error(errMsg);
		var callbacks = keepAlive ? keepAliveCallbacks : {};
		var invokeCallback = (_ref2) => {
			var { id, name, params } = _ref2;
			var callback = callbacks[id];
			if (callback) {
				callback(...params);
				if (!keepAlive) delete callbacks[id];
			} else console.error("uts插件[".concat(moduleName, "] ").concat(pkg).concat(cls, ".").concat(methodName.replace("ByJs", ""), " ").concat(name, "回调函数已释放，不能再次执行，参考文档：https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html#keepalive"));
		};
		var context = {
			depth: 0,
			nested: false
		};
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		var invokeArgs = extend({}, baseArgs, { params: args.map((arg) => normalizeArg(arg, callbacks, keepAlive, context)) });
		invokeArgs.nested = context.nested;
		if (async) return new Promise((resolve, reject) => {
			getProxy().invokeAsync(invokeArgs, (res) => {
				if (res.type !== "return") invokeCallback(res);
				else if (res.errMsg) reject(res.errMsg);
				else resolve(res.params);
			});
		});
		return resolveSyncResult(invokeArgs, getProxy().invokeSync(invokeArgs, invokeCallback), returnOptions, instanceId, proxy);
	};
}
function initUTSStaticMethod(async, opts) {
	if (opts.main && !opts.method) {
		if (isUTSiOS()) opts.method = "s_" + opts.name;
	}
	return initProxyFunction("method", async, opts, 0);
}
var initUTSProxyFunction = initUTSStaticMethod;
function parseClassMethodName(name, methods) {
	if (typeof name === "string" && hasOwn(methods, name + "ByJs")) return name + "ByJs";
	return name;
}
function isUndefined(value) {
	return typeof value === "undefined";
}
function isProxyInterfaceOptions(options) {
	return !isUndefined(options.instanceId);
}
function parseClassPropertySetter(name) {
	return "__$set" + capitalize(name);
}
function initUTSProxyClass(options) {
	var { moduleName, moduleType, package: pkg, class: cls, methods, props, setters, errMsg } = options;
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
	var staticSetters = {};
	var isProxyInterface = false;
	if (isProxyInterfaceOptions(options)) {
		isProxyInterface = true;
		instanceId = options.instanceId;
	} else {
		constructorParams = options.constructor.params;
		staticMethods = options.staticMethods;
		staticProps = options.staticProps;
		staticSetters = options.staticSetters;
	}
	if (isUTSiOS()) {
		if (constructorParams.find((p) => p.type === "UTSCallback" || p.type.indexOf("JSONObject") > 0)) constructorParams.push({
			name: "_byJs",
			type: "boolean"
		});
	}
	var ProxyClass = class UTSClass {
		constructor() {
			this.__instanceId = 0;
			if (errMsg) throw new Error(errMsg);
			var target = {};
			if (!isProxyInterface) {
				for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) params[_key2] = arguments[_key2];
				this.__instanceId = initProxyFunction("constructor", false, extend({
					name: "constructor",
					keepAlive: false,
					params: constructorParams
				}, baseOptions), 0).apply(null, params);
			} else if (typeof instanceId === "number") this.__instanceId = instanceId;
			if (!this.__instanceId) throw new Error("new ".concat(cls, " is failed"));
			var instance = this;
			var proxy = new Proxy(instance, {
				get(_, name) {
					if (name === "__v_skip") return true;
					if (!target[name]) {
						name = parseClassMethodName(name, methods);
						if (hasOwn(methods, name)) {
							var { async, keepAlive, params: _params, return: returnOptions } = methods[name];
							target[name] = initUTSInstanceMethod(!!async, extend({
								name,
								keepAlive,
								params: _params,
								return: returnOptions
							}, baseOptions), instance.__instanceId, proxy);
						} else if (props.includes(name)) return invokePropGetter({
							moduleName,
							moduleType,
							id: instance.__instanceId,
							type: "getter",
							keepAlive: false,
							nested: false,
							name,
							errMsg
						});
					}
					return target[name];
				},
				set(_, name, newValue) {
					if (props.includes(name)) {
						var setter = parseClassPropertySetter(name);
						if (!target[setter]) {
							var param = setters[name];
							if (param) target[setter] = initProxyFunction("setter", false, extend({
								name,
								keepAlive: false,
								params: [param]
							}, baseOptions), instance.__instanceId, proxy);
						}
						target[parseClassPropertySetter(name)](newValue);
						return true;
					}
					return false;
				}
			});
			return Object.freeze(proxy);
		}
	};
	var staticPropSetterCache = {};
	var staticMethodCache = {};
	return Object.freeze(new Proxy(ProxyClass, {
		get(target, name, receiver) {
			name = parseClassMethodName(name, staticMethods);
			if (hasOwn(staticMethods, name)) {
				if (!staticMethodCache[name]) {
					var { async, keepAlive, params, return: returnOptions } = staticMethods[name];
					staticMethodCache[name] = initUTSStaticMethod(!!async, extend({
						name,
						companion: true,
						keepAlive,
						params,
						return: returnOptions
					}, baseOptions));
				}
				return staticMethodCache[name];
			}
			if (staticProps.includes(name)) return invokePropGetter(extend({
				name,
				companion: true,
				type: "getter"
			}, baseOptions));
			return Reflect.get(target, name, receiver);
		},
		set(_, name, newValue) {
			if (staticProps.includes(name)) {
				var setter = parseClassPropertySetter(name);
				if (!staticPropSetterCache[setter]) {
					var param = staticSetters[name];
					if (param) staticPropSetterCache[setter] = initProxyFunction("setter", false, extend({
						name,
						keepAlive: false,
						params: [param]
					}, baseOptions), 0);
				}
				staticPropSetterCache[parseClassPropertySetter(name)](newValue);
				return true;
			}
			return false;
		}
	}));
}
function isUTSAndroid() {
	if (typeof nativeChannel === "object" && nativeChannel && nativeChannel.os === "android") return true;
	return false;
}
function isUTSiOS() {
	return !isUTSAndroid();
}
function initUTSPackageName(name, is_uni_modules) {
	if (isUTSAndroid()) return "uts.sdk." + (is_uni_modules ? "modules." : "") + name;
	return "";
}
function initUTSIndexClassName(moduleName, is_uni_modules) {
	return initUTSClassName(moduleName, isUTSAndroid() ? "IndexKt" : "IndexSwift", is_uni_modules);
}
function initUTSClassName(moduleName, className, is_uni_modules) {
	if (isUTSAndroid()) return className;
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
	var silent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
	var define = pluginDefines[name];
	if (!define) {
		if (!silent) console.error("".concat(name, " is not found"));
	}
	return define;
}
//#endregion
//#region src/service/api/plugin/log.ts
function __log__(type, filename) {
	for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
	var res = normalizeLog(type, filename, args);
	res && console[type](res);
}
function isDebugMode() {
	return typeof __channelId__ === "string" && __channelId__;
}
function jsonStringifyReplacer(k, p) {
	switch (toRawType(p)) {
		case "Function": return "function() { [native code] }";
		default: return p;
	}
}
function normalizeLog(type, filename, args) {
	if (isDebugMode()) {
		args.push(filename.replace("at ", "uni-app:///"));
		return console[type].apply(console, args);
	}
	return args.map(function(v) {
		var type = toTypeString(v).toLowerCase();
		if ([
			"[object object]",
			"[object array]",
			"[object module]"
		].indexOf(type) !== -1) try {
			v = "---BEGIN:JSON---" + JSON.stringify(v, jsonStringifyReplacer) + "---END:JSON---";
		} catch (e) {
			v = type;
		}
		else if (v === null) v = "---NULL---";
		else if (v === void 0) v = "---UNDEFINED---";
		else {
			var vType = toRawType(v).toUpperCase();
			if (vType === "NUMBER" || vType === "BOOLEAN") v = "---BEGIN:" + vType + "---" + v + "---END:" + vType + "---";
			else v = String(v);
		}
		return v;
	}).join("---COMMA---") + " " + filename;
}
//#endregion
//#region src/x/api/index.ts
var api_exports = /* @__PURE__ */ __exportAll({
	$emit: () => $emit,
	$off: () => $off,
	$on: () => $on,
	$once: () => $once,
	__f__: () => __f__,
	__log__: () => __log__,
	addInterceptor: () => addInterceptor,
	closeDialogPage: () => closeDialogPage,
	createCanvasContextAsync: () => createCanvasContextAsync,
	createSelectorQuery: () => createSelectorQuery,
	env: () => env,
	getElementById: () => getElementById,
	getEnterOptionsSync: () => getEnterOptionsSync,
	getLaunchOptionsSync: () => getLaunchOptionsSync,
	getPerformance: () => getPerformance,
	hideTabBar: () => hideTabBar,
	hideTabBarRedDot: () => hideTabBarRedDot,
	initUTSClassName: () => initUTSClassName,
	initUTSIndexClassName: () => initUTSIndexClassName,
	initUTSPackageName: () => initUTSPackageName,
	initUTSProxyClass: () => initUTSProxyClass,
	initUTSProxyFunction: () => initUTSProxyFunction,
	loadFontFace: () => loadFontFace,
	navigateBack: () => navigateBack,
	navigateTo: () => navigateTo,
	onTabBarMidButtonTap: () => onTabBarMidButtonTap,
	openDialogPage: () => openDialogPage,
	pageScrollTo: () => pageScrollTo,
	reLaunch: () => reLaunch,
	redirectTo: () => redirectTo,
	registerUTSInterface: () => registerUTSInterface,
	registerUTSPlugin: () => registerUTSPlugin,
	removeInterceptor: () => removeInterceptor,
	removeTabBarBadge: () => removeTabBarBadge,
	requireUTSPlugin: () => requireUTSPlugin,
	setNavigationBarColor: () => setNavigationBarColor,
	setNavigationBarTitle: () => setNavigationBarTitle,
	setTabBarBadge: () => setTabBarBadge,
	setTabBarItem: () => setTabBarItem,
	setTabBarStyle: () => setTabBarStyle,
	showTabBar: () => showTabBar,
	showTabBarRedDot: () => showTabBarRedDot,
	startPullDownRefresh: () => startPullDownRefresh,
	stopPullDownRefresh: () => stopPullDownRefresh,
	switchTab: () => switchTab
});
//#endregion
//#region ../uni-components/src/helpers/animation.ts
function converPx(value) {
	if (/^-?\d+[ur]px$/i.test(value)) return value.replace(/(^-?\d+)[ur]px$/i, (text, num) => {
		return "".concat(uni.upx2px(parseFloat(num)), "px");
	});
	else if (/^-?[\d\.]+$/.test(value)) return "".concat(value, "px");
	return value || "";
}
function converType(type) {
	return type.replace(/[A-Z]/g, (text) => {
		return "-".concat(text.toLowerCase());
	}).replace("webkit", "-webkit");
}
function getStyle(action) {
	var animateTypes1 = [
		"matrix",
		"matrix3d",
		"scale",
		"scale3d",
		"rotate3d",
		"skew",
		"translate",
		"translate3d"
	];
	var animateTypes2 = [
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
	var animateTypes3 = ["opacity", "background-color"];
	var animateTypes4 = [
		"width",
		"height",
		"left",
		"right",
		"top",
		"bottom"
	];
	var animates = action.animates;
	var option = action.option;
	var transition = option.transition;
	var style = {};
	var transform = [];
	animates.forEach((animate) => {
		var type = animate.type;
		var args = [...animate.args];
		if (animateTypes1.concat(animateTypes2).includes(type)) {
			if (type.startsWith("rotate") || type.startsWith("skew")) args = args.map((value) => parseFloat(value) + "deg");
			else if (type.startsWith("translate")) args = args.map(converPx);
			if (animateTypes2.indexOf(type) >= 0) args.length = 1;
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
	var animation = context.animation;
	if (!animation || !animation.actions || !animation.actions.length) return;
	var index = 0;
	var actions = animation.actions;
	var length = animation.actions.length;
	function animate() {
		var action = actions[index];
		var transition = action.option.transition;
		var style = getStyle(action);
		Object.keys(style).forEach((key) => {
			context.$el.style[key] = style[key];
		});
		index += 1;
		if (index < length) setTimeout(animate, transition.duration + transition.delay);
	}
	setTimeout(() => {
		animate();
	}, 0);
}
var animation_default = {
	props: ["animation"],
	watch: { animation: {
		deep: true,
		handler() {
			startAnimation(this);
		}
	} },
	mounted() {
		startAnimation(this);
	}
};
//#endregion
//#region ../uni-components/src/helpers/component.ts
/**
* 内置组件（对外，比如view）
* @param options
* @returns
*/
var defineBuiltInComponent = (options) => {
	options.__reserved = true;
	var { props, mixins } = options;
	if (!props || !props.animation) (mixins || (options.mixins = [])).push(animation_default);
	var rootElement = options.rootElement;
	if (rootElement) customElements.define(rootElement.name, rootElement.class, rootElement.options);
	return defineSystemComponent(options);
};
/**
* 系统组件（不对外，比如App,Page等）
* @param options
* @returns
*/
var defineSystemComponent = (options) => {
	options.__reserved = true;
	options.compatConfig = { MODE: 3 };
	return defineComponent(options);
};
//#endregion
//#region ../uni-components/src/helpers/UniElement.ts
var rpx2Unit = createRpx2Unit(defaultRpx2Unit.unit, defaultRpx2Unit.unitRatio, defaultRpx2Unit.unitPrecision);
function transformRpx(value) {
	if (/(-?(?:\d+\.)?\d+)[ur]px/gi.test(value)) return value.replace(/(-?(?:\d+\.)?\d+)[ur]px/gi, (text, num) => {
		return rpx2Unit(num + "rpx");
	});
	return value;
}
var UniElement = class extends HTMLElement {
	constructor() {
		super();
		this._props = {};
		this.__isUniElement = true;
	}
	attachVmProps(props) {
		this._props = props;
	}
	getAttribute(qualifiedName) {
		var name = camelize(qualifiedName);
		var attr = name in this._props ? this._props[name] + "" : super.getAttribute(qualifiedName);
		return attr === void 0 ? null : attr;
	}
	getPage() {
		var _this$__vnode;
		return ((_this$__vnode = this.__vnode) === null || _this$__vnode === void 0 || (_this$__vnode = _this$__vnode.ctx) === null || _this$__vnode === void 0 ? void 0 : _this$__vnode.page) || null;
	}
	get uniPage() {
		return this.getPage();
	}
	getBoundingClientRectAsync(callback) {
		if (callback) {
			var domRect = this.getBoundingClientRect();
			try {
				var _callback$success;
				(_callback$success = callback.success) === null || _callback$success === void 0 || _callback$success.call(callback, domRect);
			} catch (error) {
				console.error(error);
			}
			try {
				var _callback$complete;
				(_callback$complete = callback.complete) === null || _callback$complete === void 0 || _callback$complete.call(callback, domRect);
			} catch (error) {
				console.error(error);
			}
			return;
		}
		return new Promise((resolve, reject) => {
			resolve(this.getBoundingClientRect());
		});
	}
	get style() {
		var originalStyle = super.style;
		if (originalStyle.__patchRpx__) return originalStyle;
		originalStyle.__patchRpx__ = true;
		var originalSetProperty = originalStyle.setProperty.bind(originalStyle);
		super.style.setProperty = function(property, value, priority) {
			return originalSetProperty(property, value ? transformRpx(value + "") : value, priority || void 0);
		};
		return super.style;
	}
	get tagName() {
		return super.tagName.replace(/^UNI-/, "");
	}
	get nodeName() {
		return super.nodeName.replace(/^UNI-/, "");
	}
};
//#endregion
//#region ../uni-components/src/vue/form/index.tsx
init_web_dom_iterable();
PolySymbol("uf");
PolySymbol("ul");
PolySymbol("ucg");
//#endregion
//#region ../uni-components/src/vue/checkbox/index.tsx
init_web_dom_iterable();
var keyboardChangeCallback;
plusReady(() => {
	plus.os.name;
	plus.os.version;
});
document.addEventListener("keyboardchange", function(event) {
	event.height;
	keyboardChangeCallback && keyboardChangeCallback();
}, false);
var emit$1 = ["keyboardheightchange"];
/^Apple/.test(navigator.vendor);
//#endregion
//#region ../uni-components/src/vue/editor/quill/index.ts
init_web_dom_iterable();
[...emit$1];
navigator.vendor;
var emit = [
	"input",
	"focus",
	"blur",
	"update:value",
	"update:modelValue",
	"update:focus",
	"compositionstart",
	"compositionupdate",
	"compositionend",
	...emit$1
];
once(() => {
	var osVersion = plus.os.version;
	return plus.os.name === "iOS" && !!osVersion && parseInt(osVersion) >= 16 && parseFloat(osVersion) < 17.2;
});
[...emit];
//#endregion
//#region ../uni-components/src/helpers/useAttrs.ts
init_web_dom_iterable();
//#endregion
//#region ../uni-components/src/components/movable-view/utils.js
function e(e, t, n) {
	return e > t - n && e < t + n;
}
function t(t, n) {
	return e(t, 0, n);
}
function Decline() {}
Decline.prototype.x = function(e) {
	return Math.sqrt(e);
};
function Friction(e, t) {
	this._m = e;
	this._f = 1e3 * t;
	this._startTime = 0;
	this._v = 0;
}
Friction.prototype.setV = function(x, y) {
	var n = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), .5);
	this._x_v = x;
	this._y_v = y;
	this._x_a = -this._f * this._x_v / n;
	this._y_a = -this._f * this._y_v / n;
	this._t = Math.abs(x / this._x_a) || Math.abs(y / this._y_a);
	this._lastDt = null;
	this._startTime = (/* @__PURE__ */ new Date()).getTime();
};
Friction.prototype.setS = function(x, y) {
	this._x_s = x;
	this._y_s = y;
};
Friction.prototype.s = function(t) {
	if (void 0 === t) t = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
	if (t > this._t) {
		t = this._t;
		this._lastDt = t;
	}
	var x = this._x_v * t + .5 * this._x_a * Math.pow(t, 2) + this._x_s;
	var y = this._y_v * t + .5 * this._y_a * Math.pow(t, 2) + this._y_s;
	if (this._x_a > 0 && x < this._endPositionX || this._x_a < 0 && x > this._endPositionX) x = this._endPositionX;
	if (this._y_a > 0 && y < this._endPositionY || this._y_a < 0 && y > this._endPositionY) y = this._endPositionY;
	return {
		x,
		y
	};
};
Friction.prototype.ds = function(t) {
	if (void 0 === t) t = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
	if (t > this._t) t = this._t;
	return {
		dx: this._x_v + this._x_a * t,
		dy: this._y_v + this._y_a * t
	};
};
Friction.prototype.delta = function() {
	return {
		x: -1.5 * Math.pow(this._x_v, 2) / this._x_a || 0,
		y: -1.5 * Math.pow(this._y_v, 2) / this._y_a || 0
	};
};
Friction.prototype.dt = function() {
	return -this._x_v / this._x_a;
};
Friction.prototype.done = function() {
	var t = e(this.s().x, this._endPositionX) || e(this.s().y, this._endPositionY) || this._lastDt === this._t;
	this._lastDt = null;
	return t;
};
Friction.prototype.setEnd = function(x, y) {
	this._endPositionX = x;
	this._endPositionY = y;
};
Friction.prototype.reconfigure = function(m, f) {
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
Spring.prototype._solve = function(e, t) {
	var n = this._c;
	var i = this._m;
	var r = this._k;
	var o = n * n - 4 * i * r;
	if (o === 0) {
		var a = -n / (2 * i);
		var s = e;
		var l = t / (a * e);
		return {
			x: function(e) {
				return (s + l * e) * Math.pow(Math.E, a * e);
			},
			dx: function(e) {
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
			x: function(e) {
				var t;
				var n;
				if (e === this._t) {
					t = this._powER1T;
					n = this._powER2T;
				}
				this._t = e;
				if (!t) t = this._powER1T = Math.pow(Math.E, c * e);
				if (!n) n = this._powER2T = Math.pow(Math.E, u * e);
				return h * t + d * n;
			},
			dx: function(e) {
				var t;
				var n;
				if (e === this._t) {
					t = this._powER1T;
					n = this._powER2T;
				}
				this._t = e;
				if (!t) t = this._powER1T = Math.pow(Math.E, c * e);
				if (!n) n = this._powER2T = Math.pow(Math.E, u * e);
				return h * c * t + d * u * n;
			}
		};
	}
	var p = Math.sqrt(4 * i * r - n * n) / (2 * i);
	var f = -n / 2 * i;
	var v = e;
	var g = (t - f * e) / p;
	return {
		x: function(e) {
			return Math.pow(Math.E, f * e) * (v * Math.cos(p * e) + g * Math.sin(p * e));
		},
		dx: function(e) {
			var t = Math.pow(Math.E, f * e);
			var n = Math.cos(p * e);
			var i = Math.sin(p * e);
			return t * (g * p * n - v * p * i) + f * t * (g * i + v * n);
		}
	};
};
Spring.prototype.x = function(e) {
	if (void 0 === e) e = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
	return this._solution ? this._endPosition + this._solution.x(e) : 0;
};
Spring.prototype.dx = function(e) {
	if (void 0 === e) e = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
	return this._solution ? this._solution.dx(e) : 0;
};
Spring.prototype.setEnd = function(e, n, i) {
	if (!i) i = (/* @__PURE__ */ new Date()).getTime();
	if (e !== this._endPosition || !t(n, .1)) {
		n = n || 0;
		var r = this._endPosition;
		if (this._solution) {
			if (t(n, .1)) n = this._solution.dx((i - this._startTime) / 1e3);
			r = this._solution.x((i - this._startTime) / 1e3);
			if (t(n, .1)) n = 0;
			if (t(r, .1)) r = 0;
			r += this._endPosition;
		}
		if (!(this._solution && t(r - e, .1) && t(n, .1))) {
			this._endPosition = e;
			this._solution = this._solve(r - this._endPosition, n);
			this._startTime = i;
		}
	}
};
Spring.prototype.snap = function(e) {
	this._startTime = (/* @__PURE__ */ new Date()).getTime();
	this._endPosition = e;
	this._solution = {
		x: function() {
			return 0;
		},
		dx: function() {
			return 0;
		}
	};
};
Spring.prototype.done = function(n) {
	if (!n) n = (/* @__PURE__ */ new Date()).getTime();
	return e(this.x(), this._endPosition, .1) && t(this.dx(), .1);
};
Spring.prototype.reconfigure = function(m, t, c) {
	this._m = m;
	this._k = t;
	this._c = c;
	if (!this.done()) {
		this._solution = this._solve(this.x() - this._endPosition, this.dx());
		this._startTime = (/* @__PURE__ */ new Date()).getTime();
	}
};
Spring.prototype.springConstant = function() {
	return this._k;
};
Spring.prototype.damping = function() {
	return this._c;
};
Spring.prototype.configuration = function() {
	function e(e, t) {
		e.reconfigure(1, t, e.damping());
	}
	function t(e, t) {
		e.reconfigure(1, e.springConstant(), t);
	}
	return [{
		label: "Spring Constant",
		read: this.springConstant.bind(this),
		write: e.bind(this, this),
		min: 100,
		max: 1e3
	}, {
		label: "Damping",
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
STD.prototype.setEnd = function(e, t, n, i) {
	var r = (/* @__PURE__ */ new Date()).getTime();
	this._springX.setEnd(e, i, r);
	this._springY.setEnd(t, i, r);
	this._springScale.setEnd(n, i, r);
	this._startTime = r;
};
STD.prototype.x = function() {
	var e = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
	return {
		x: this._springX.x(e),
		y: this._springY.x(e),
		scale: this._springScale.x(e)
	};
};
STD.prototype.done = function() {
	var e = (/* @__PURE__ */ new Date()).getTime();
	return this._springX.done(e) && this._springY.done(e) && this._springScale.done(e);
};
STD.prototype.reconfigure = function(e, t, n) {
	this._springX.reconfigure(e, t, n);
	this._springY.reconfigure(e, t, n);
	this._springScale.reconfigure(e, t, n);
};
//#endregion
//#region ../uni-components/src/vue/picker-view/index.tsx
init_web_dom_iterable();
var PROGRESS_VALUES = {
	activeColor: PRIMARY_COLOR,
	backgroundColor: "#EBEBEB",
	activeMode: "backwards"
};
PROGRESS_VALUES.activeColor, PROGRESS_VALUES.activeColor, PROGRESS_VALUES.backgroundColor, PROGRESS_VALUES.activeMode;
PolySymbol("ucg");
//#endregion
//#region ../uni-components/src/vue/radio/index-x.tsx
init_web_dom_iterable();
//#endregion
//#region ../uni-components/src/helpers/text.ts
init_web_dom_iterable();
[...emit];
//#endregion
//#region ../uni-app/dist/uni-app.es.js
var createLifeCycleHook = function(lifecycle) {
	arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
	return function(hook) {
		var target = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstance();
		!isInSSRComponentSetup && injectHook(lifecycle, hook, target);
	};
};
var onBackPress = /* @__PURE__ */ createLifeCycleHook(ON_BACK_PRESS, 2);
//#endregion
//#region ../uni-components/src/vue/page-container/element.ts
var UniPageContainerElement = class extends UniElement {};
//#endregion
//#region ../uni-components/src/vue/page-container/index.vue?vue&type=script&setup=true&lang.ts
var MAX_SLIDER_DISTANCE = 100;
var MIN_SLIDER_VELOCITY = .3;
_objectSpread2(_objectSpread2({}, {
	name: "page-container",
	rootElement: {
		name: "uni-page-container",
		class: UniPageContainerElement
	}
}), {}, {
	__name: "index",
	props: {
		show: {
			type: Boolean,
			default: false
		},
		duration: {
			default: 300,
			type: Number
		},
		zIndex: {
			default: 100,
			type: Number
		},
		overlay: {
			type: Boolean,
			default: true
		},
		round: {
			type: Boolean,
			default: false
		},
		position: {
			default: "bottom",
			type: String
		},
		customStyle: {
			default: "",
			type: String
		},
		overlayStyle: {
			default: "",
			type: String
		},
		closeOnSlideDown: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		"beforeenter",
		"enter",
		"afterenter",
		"beforeleave",
		"leave",
		"afterleave",
		"clickoverlay"
	],
	setup(__props, _ref) {
		var { emit: __emit } = _ref;
		var props = __props;
		var emits = __emit;
		var showPageContainer = ref(false);
		var isAnimating = ref(false);
		var transitionTimer = ref(null);
		var isEntered = ref(false);
		var touchStartX = 0;
		var touchStartY = 0;
		var touchStartTime = 0;
		var isDragging = false;
		var translateValue = ref(0);
		var overlayStyleMap = computed(() => {
			var styleObj = {
				"z-index": props.zIndex,
				"transition-duration": props.duration + "ms"
			};
			if (isEntered.value) {
				styleObj["opacity"] = "1";
				styleObj["pointer-events"] = "auto";
			}
			return styleObj;
		});
		var innerStyleMap = computed(() => {
			var styleObj = {
				"z-index": props.zIndex + 1,
				"transition-duration": props.duration + "ms"
			};
			if (translateValue.value != 0 && isDragging) {
				var transformValue = "";
				switch (props.position) {
					case "bottom":
					case "top":
						transformValue = "translateY(".concat(translateValue.value, "px)");
						break;
					case "left":
					case "right":
						transformValue = "translateX(".concat(translateValue.value, "px)");
						break;
				}
				if (transformValue != "") {
					styleObj["transform"] = transformValue;
					styleObj["transition"] = "none";
				}
			} else if (translateValue.value != 0 && !isDragging) styleObj["transition"] = "transform ".concat(props.duration, "ms ease");
			return styleObj;
		});
		var popupClasses = computed(() => {
			var classes = [];
			if (props.position != null) classes.push("uni-page-container-popup-".concat(props.position));
			if (props.round) classes.push("uni-page-container-popup-round");
			if (isEntered.value) classes.push("uni-page-container-popup-enter");
			return classes;
		});
		function clearTransitionTimer() {
			if (transitionTimer.value != null) {
				clearTimeout(transitionTimer.value);
				transitionTimer.value = null;
			}
		}
		function onAnimationEnd(type) {
			isAnimating.value = false;
			clearTransitionTimer();
			if (type == "enter") emits("afterenter");
			else if (type == "leave") {
				showPageContainer.value = false;
				emits("afterleave");
			}
		}
		function listenTransitionEnd(type) {
			clearTransitionTimer();
			transitionTimer.value = setTimeout(() => {
				onAnimationEnd(type);
			}, props.duration);
		}
		function resetDragState() {
			isDragging = false;
			translateValue.value = 0;
		}
		function openContainer() {
			emits("beforeenter");
			showPageContainer.value = true;
			isEntered.value = false;
			resetDragState();
			nextTick(() => {
				emits("enter");
				isAnimating.value = true;
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						isEntered.value = true;
						listenTransitionEnd("enter");
					});
				});
			});
		}
		function closeContainer() {
			if (isAnimating.value) return;
			emits("beforeleave");
			isAnimating.value = true;
			nextTick(() => {
				isEntered.value = false;
				emits("leave");
				listenTransitionEnd("leave");
			});
		}
		watch(() => props.show, (newVal) => {
			if (newVal && !showPageContainer.value) openContainer();
			else if (!newVal && showPageContainer.value) closeContainer();
		});
		function onClickOverlay(event) {
			if (isAnimating.value) return;
			emits("clickoverlay", event);
			nextTick(() => {
				closeContainer();
			});
		}
		function onTouchStart(e) {
			if (!props.closeOnSlideDown) return;
			if (e.touches.length > 0) {
				var { clientX, clientY } = e.touches[0];
				touchStartX = clientX;
				touchStartY = clientY;
				touchStartTime = Date.now();
				isDragging = false;
			}
		}
		function onTouchMove(e) {
			if (!props.closeOnSlideDown) {
				e.preventDefault();
				e.stopPropagation();
				return;
			}
			if (e.touches.length > 0) {
				var { clientX, clientY } = e.touches[0];
				var deltaX = clientX - touchStartX;
				var deltaY = clientY - touchStartY;
				var shouldDrag = false;
				var dragValue = 0;
				switch (props.position) {
					case "bottom":
						if (deltaY > 0) {
							shouldDrag = true;
							dragValue = deltaY;
						}
						break;
					case "top":
						if (deltaY < 0) {
							shouldDrag = true;
							dragValue = deltaY;
						}
						break;
					case "left":
						if (deltaX < 0) {
							shouldDrag = true;
							dragValue = deltaX;
						}
						break;
					case "right":
						if (deltaX > 0) {
							shouldDrag = true;
							dragValue = deltaX;
						}
						break;
				}
				if (shouldDrag) {
					isDragging = true;
					translateValue.value = dragValue;
					e.preventDefault();
					e.stopPropagation();
				}
			}
		}
		function onTouchEnd() {
			if (!props.closeOnSlideDown) return;
			if (isDragging) {
				var deltaTime = Date.now() - touchStartTime;
				var velocity = Math.abs(translateValue.value) / deltaTime;
				if (Math.abs(translateValue.value) > MAX_SLIDER_DISTANCE || velocity > MIN_SLIDER_VELOCITY) {
					resetDragState();
					closeContainer();
				} else resetDragState();
			}
		}
		function onTouchCancel() {
			if (!props.closeOnSlideDown) return;
			if (isDragging) resetDragState();
		}
		onBackPress(() => {
			if (showPageContainer.value) {
				closeContainer();
				return true;
			}
			return false;
		});
		onMounted(() => {
			if (props.show) openContainer();
		});
		onBeforeUnmount(() => {
			clearTransitionTimer();
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [_ctx.overlay && showPageContainer.value ? (openBlock(), createElementBlock("view", {
				key: 0,
				class: "uni-page-container-overlay",
				style: normalizeStyle([overlayStyleMap.value, _ctx.overlayStyle]),
				onClick: onClickOverlay,
				onTouchmove: _cache[0] || (_cache[0] = withModifiers(() => {}, ["prevent", "stop"]))
			}, null, 36)) : createCommentVNode("", true), showPageContainer.value ? (openBlock(), createElementBlock("view", {
				key: 1,
				class: normalizeClass(["uni-page-container-popup", popupClasses.value]),
				style: normalizeStyle([innerStyleMap.value, _ctx.customStyle]),
				onTouchstart: onTouchStart,
				onTouchmove: onTouchMove,
				onTouchend: onTouchEnd,
				onTouchcancel: onTouchCancel
			}, [renderSlot(_ctx.$slots, "default")], 38)) : createCommentVNode("", true)], 64);
		};
	}
});
//#endregion
//#region ../uni-components/src/vue/loading/element.ts
var UniVueElement = class extends HTMLElement {};
var UniLoadingElement = class extends UniVueElement {};
//#endregion
//#region ../uni-components/src/vue/loading/useLoadingStyle.ts
function useLoadingStyle(targetElement, bold) {
	var loadingSize = ref("16px");
	var loadingBorderWidth = ref("1px");
	var loadingBorderRadius = ref("8px");
	var observer = null;
	var calculateLoadingWidth = (element, bold) => {
		var { width, height } = element.getBoundingClientRect();
		var coefficient = bold ? 2 : 1;
		var minSide = Math.min(width, height);
		var calculatedWidth = minSide / 16 * coefficient;
		loadingSize.value = "".concat(minSide, "px");
		loadingBorderWidth.value = "".concat(calculatedWidth, "px");
		loadingBorderRadius.value = "".concat(minSide / 2, "px");
	};
	var setupObserver = (cb) => {
		var el = targetElement.value;
		if (!el) return;
		observer = new ResizeObserver((entries) => {
			cb(el);
		});
		observer.observe(el);
	};
	onMounted(() => {
		setupObserver((el) => {
			calculateLoadingWidth(el, bold.value);
		});
		watchEffect(() => {
			var _bold = bold.value;
			var el = targetElement.value;
			if (el !== null) calculateLoadingWidth(el, _bold);
		});
	});
	onUnmounted(() => {
		if (observer) observer.disconnect();
	});
	return {
		size: loadingSize,
		borderWidth: loadingBorderWidth,
		borderRadius: loadingBorderRadius
	};
}
_objectSpread2(_objectSpread2({}, {
	name: "loading",
	rootElement: {
		name: "uni-loading-element",
		class: UniLoadingElement
	}
}), {}, {
	__name: "index-x",
	props: {
		paused: {
			type: Boolean,
			default: false
		},
		bold: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		var props = __props;
		var LoadingRef = ref(null);
		var loadingStyle = reactive(useLoadingStyle(LoadingRef, computed(() => props.bold)));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("view", {
				class: "__uni_loading_container__",
				ref_key: "LoadingRef",
				ref: LoadingRef,
				style: { "display": "flex" }
			}, [createElementVNode("view", {
				class: normalizeClass(["__uni-loading__ __loading-4-3__", { "__uni-loading__paused": props.paused }]),
				style: normalizeStyle([{ "box-sizing": "border-box" }, {
					width: loadingStyle.size,
					height: loadingStyle.size,
					borderWidth: loadingStyle.borderWidth
				}])
			}, null, 6)], 512);
		};
	}
});
//#endregion
//#region src/x/components/navigator/model.ts
var UniNavigatorElement = class extends UniElementImpl {
	constructor(data, pageNode) {
		super(data, pageNode);
		this.tagName = "NAVIGATOR";
		this.nodeName = this.tagName;
		this._getAttribute = (key) => {
			return null;
		};
	}
	getAnyAttribute(key) {
		var value = this._getAttribute(key);
		if (value != null) return value;
		return super.getAnyAttribute(key);
	}
};
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
//#endregion
//#region src/x/components/navigator/navigator.tsx
var navigator_exports = /* @__PURE__ */ __exportAll({
	UniNavigatorElement: () => UniNavigatorElement,
	default: () => navigator_default
});
var navigator_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Navigator",
	rootElement: {
		name: "uni-navigator-element",
		class: UniNavigatorElement
	},
	props: navigatorProps,
	emits: ["click"],
	setup(props, _ref) {
		var { emit, slots } = _ref;
		var $uniNavigatorElement = ref();
		var instance = getCurrentInstance();
		onMounted(() => {
			instance === null || instance === void 0 || instance.$waitNativeRender(() => {
				if (!instance) return;
				$uniNavigatorElement.value._getAttribute = (key) => {
					var _props$keyString$toSt, _props$keyString;
					var keyString = camelize$1(key);
					return props[keyString] !== null ? (_props$keyString$toSt = (_props$keyString = props[keyString]) === null || _props$keyString === void 0 ? void 0 : _props$keyString.toString()) !== null && _props$keyString$toSt !== void 0 ? _props$keyString$toSt : null : null;
				};
			});
		});
		var _onClick = ($event) => {
			var url = props.url;
			emit("click", $event);
			var animationDuration = props.animationDuration;
			var onFail = (res) => {
				console.error(res.errMsg);
			};
			switch (props.openType) {
				case "navigate":
					uni.navigateTo({
						url,
						animationType: props.animationType.length > 0 ? props.animationType : "pop-in",
						animationDuration,
						fail: onFail
					});
					break;
				case "redirect":
					uni.redirectTo({
						url,
						fail: onFail
					});
					break;
				case "switchTab":
					uni.switchTab({
						url,
						fail: onFail
					});
					break;
				case "reLaunch":
					uni.reLaunch({
						url,
						fail: onFail
					});
					break;
				case "navigateBack":
					uni.navigateBack({
						delta: props.delta,
						animationType: props.animationType.length > 0 ? props.animationType : "pop-out",
						animationDuration,
						fail: onFail
					});
					break;
				default:
					console.log("<navigator/> openType attribute invalid");
					break;
			}
		};
		return () => {
			return createVNode("uni-navigator-element", {
				"ref": $uniNavigatorElement,
				"onClick": _onClick,
				"hoverClass": props.hoverClass,
				"hoverStopPropagation": props.hoverStopPropagation,
				"hoverStartTime": props.hoverStartTime,
				"hoverStayTime": props.hoverStayTime
			}, [renderSlot(slots, "default")], 8, [
				"onClick",
				"hoverClass",
				"hoverStopPropagation",
				"hoverStartTime",
				"hoverStayTime"
			]);
		};
	}
});
//#endregion
//#region src/x/components/index.ts
var components_exports = /* @__PURE__ */ __exportAll({ Navigator: () => navigator_exports });
//#endregion
export { definePage as __definePage, registerApp as __registerApp, registerSystemRoute as __registerSystemRoute, systemRoutes as __uniSystemRoutes, components_exports as components, defineAsyncApi, defineOffApi, defineOnApi, defineSyncApi, defineTaskApi, getCurrentPages$1 as getCurrentPages, initApp, api_exports as uni };
