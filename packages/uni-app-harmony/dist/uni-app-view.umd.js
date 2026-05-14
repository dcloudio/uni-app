(function(factory) {
	typeof define === "function" && define.amd ? define([], factory) : factory();
})(function() {
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __esmMin = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
	var __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
	var __export = (all, symbols) => {
		let target = {};
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
		if (symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
		return target;
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i$1 = 0, n = keys.length, key$1; i$1 < n; i$1++) {
			key$1 = keys[i$1];
			if (!__hasOwnProp.call(to, key$1) && key$1 !== except) __defProp(to, key$1, {
				get: ((k) => from[k]).bind(null, key$1),
				enumerable: !(desc = __getOwnPropDesc(from, key$1)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	var require__core = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var core$3 = module.exports = { version: "2.6.12" };
		if (typeof __e == "number") __e = core$3;
	}));
	var require__global = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var global$5 = module.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
		if (typeof __g == "number") __g = global$5;
	}));
	var require__library = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = false;
	}));
	var require__shared = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var core$2 = require__core();
		var global$4 = require__global();
		var SHARED = "__core-js_shared__";
		var store$1 = global$4[SHARED] || (global$4[SHARED] = {});
		(module.exports = function(key$1, value) {
			return store$1[key$1] || (store$1[key$1] = value !== void 0 ? value : {});
		})("versions", []).push({
			version: core$2.version,
			mode: require__library() ? "pure" : "global",
			copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
		});
	}));
	var require__uid = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var id = 0;
		var px = Math.random();
		module.exports = function(key$1) {
			return "Symbol(".concat(key$1 === void 0 ? "" : key$1, ")_", (++id + px).toString(36));
		};
	}));
	var require__wks = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var store = require__shared()("wks");
		var uid$3 = require__uid();
		var Symbol$1 = require__global().Symbol;
		var USE_SYMBOL = typeof Symbol$1 == "function";
		var $exports = module.exports = function(name) {
			return store[name] || (store[name] = USE_SYMBOL && Symbol$1[name] || (USE_SYMBOL ? Symbol$1 : uid$3)("Symbol." + name));
		};
		$exports.store = store;
	}));
	var require__is_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = function(it) {
			return typeof it === "object" ? it !== null : typeof it === "function";
		};
	}));
	var require__an_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isObject$5 = require__is_object();
		module.exports = function(it) {
			if (!isObject$5(it)) throw TypeError(it + " is not an object!");
			return it;
		};
	}));
	var require__fails = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = function(exec) {
			try {
				return !!exec();
			} catch (e$1) {
				return true;
			}
		};
	}));
	var require__descriptors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = !require__fails()(function() {
			return Object.defineProperty({}, "a", { get: function() {
				return 7;
			} }).a != 7;
		});
	}));
	var require__dom_create = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isObject$4 = require__is_object();
		var document$2 = require__global().document;
		var is = isObject$4(document$2) && isObject$4(document$2.createElement);
		module.exports = function(it) {
			return is ? document$2.createElement(it) : {};
		};
	}));
	var require__ie8_dom_define = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = !require__descriptors() && !require__fails()(function() {
			return Object.defineProperty(require__dom_create()("div"), "a", { get: function() {
				return 7;
			} }).a != 7;
		});
	}));
	var require__to_primitive = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isObject$3 = require__is_object();
		module.exports = function(it, S) {
			if (!isObject$3(it)) return it;
			var fn, val;
			if (S && typeof (fn = it.toString) == "function" && !isObject$3(val = fn.call(it))) return val;
			if (typeof (fn = it.valueOf) == "function" && !isObject$3(val = fn.call(it))) return val;
			if (!S && typeof (fn = it.toString) == "function" && !isObject$3(val = fn.call(it))) return val;
			throw TypeError("Can't convert object to primitive value");
		};
	}));
	var require__object_dp = /* @__PURE__ */ __commonJSMin(((exports) => {
		var anObject$4 = require__an_object();
		var IE8_DOM_DEFINE = require__ie8_dom_define();
		var toPrimitive = require__to_primitive();
		var dP$2 = Object.defineProperty;
		exports.f = require__descriptors() ? Object.defineProperty : function defineProperty(O, P, Attributes) {
			anObject$4(O);
			P = toPrimitive(P, true);
			anObject$4(Attributes);
			if (IE8_DOM_DEFINE) try {
				return dP$2(O, P, Attributes);
			} catch (e$1) {}
			if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
			if ("value" in Attributes) O[P] = Attributes.value;
			return O;
		};
	}));
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
	var require__hide = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var dP$1 = require__object_dp();
		var createDesc = require__property_desc();
		module.exports = require__descriptors() ? function(object, key$1, value) {
			return dP$1.f(object, key$1, createDesc(1, value));
		} : function(object, key$1, value) {
			object[key$1] = value;
			return object;
		};
	}));
	var require__add_to_unscopables = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var UNSCOPABLES = require__wks()("unscopables");
		var ArrayProto = Array.prototype;
		if (ArrayProto[UNSCOPABLES] == void 0) require__hide()(ArrayProto, UNSCOPABLES, {});
		module.exports = function(key$1) {
			ArrayProto[UNSCOPABLES][key$1] = true;
		};
	}));
	var require__iter_step = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = function(done, value) {
			return {
				value,
				done: !!done
			};
		};
	}));
	var require__iterators = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = {};
	}));
	var require__cof = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var toString$2 = {}.toString;
		module.exports = function(it) {
			return toString$2.call(it).slice(8, -1);
		};
	}));
	var require__iobject = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var cof = require__cof();
		module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
			return cof(it) == "String" ? it.split("") : Object(it);
		};
	}));
	var require__defined = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = function(it) {
			if (it == void 0) throw TypeError("Can't call method on  " + it);
			return it;
		};
	}));
	var require__to_iobject = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var IObject = require__iobject();
		var defined$1 = require__defined();
		module.exports = function(it) {
			return IObject(defined$1(it));
		};
	}));
	var require__has = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var hasOwnProperty$3 = {}.hasOwnProperty;
		module.exports = function(it, key$1) {
			return hasOwnProperty$3.call(it, key$1);
		};
	}));
	var require__function_to_string = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = require__shared()("native-function-to-string", Function.toString);
	}));
	var require__redefine = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var global$3 = require__global();
		var hide$3 = require__hide();
		var has$4 = require__has();
		var SRC = require__uid()("src");
		var $toString = require__function_to_string();
		var TO_STRING = "toString";
		var TPL = ("" + $toString).split(TO_STRING);
		require__core().inspectSource = function(it) {
			return $toString.call(it);
		};
		(module.exports = function(O, key$1, val, safe) {
			var isFunction$1 = typeof val == "function";
			if (isFunction$1) has$4(val, "name") || hide$3(val, "name", key$1);
			if (O[key$1] === val) return;
			if (isFunction$1) has$4(val, SRC) || hide$3(val, SRC, O[key$1] ? "" + O[key$1] : TPL.join(String(key$1)));
			if (O === global$3) O[key$1] = val;
			else if (!safe) {
				delete O[key$1];
				hide$3(O, key$1, val);
			} else if (O[key$1]) O[key$1] = val;
			else hide$3(O, key$1, val);
		})(Function.prototype, TO_STRING, function toString$3() {
			return typeof this == "function" && this[SRC] || $toString.call(this);
		});
	}));
	var require__a_function = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = function(it) {
			if (typeof it != "function") throw TypeError(it + " is not a function!");
			return it;
		};
	}));
	var require__ctx = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var aFunction$3 = require__a_function();
		module.exports = function(fn, that, length) {
			aFunction$3(fn);
			if (that === void 0) return fn;
			switch (length) {
				case 1: return function(a$1) {
					return fn.call(that, a$1);
				};
				case 2: return function(a$1, b) {
					return fn.call(that, a$1, b);
				};
				case 3: return function(a$1, b, c$1) {
					return fn.call(that, a$1, b, c$1);
				};
			}
			return function() {
				return fn.apply(that, arguments);
			};
		};
	}));
	var require__export = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var global$2 = require__global();
		var core$1 = require__core();
		var hide$2 = require__hide();
		var redefine$2 = require__redefine();
		var ctx = require__ctx();
		var PROTOTYPE$1 = "prototype";
		var $export$4 = function(type, name, source) {
			var IS_FORCED = type & $export$4.F;
			var IS_GLOBAL = type & $export$4.G;
			var IS_STATIC = type & $export$4.S;
			var IS_PROTO = type & $export$4.P;
			var IS_BIND = type & $export$4.B;
			var target = IS_GLOBAL ? global$2 : IS_STATIC ? global$2[name] || (global$2[name] = {}) : (global$2[name] || {})[PROTOTYPE$1];
			var exports$1 = IS_GLOBAL ? core$1 : core$1[name] || (core$1[name] = {});
			var expProto = exports$1[PROTOTYPE$1] || (exports$1[PROTOTYPE$1] = {});
			var key$1, own, out, exp;
			if (IS_GLOBAL) source = name;
			for (key$1 in source) {
				own = !IS_FORCED && target && target[key$1] !== void 0;
				out = (own ? target : source)[key$1];
				exp = IS_BIND && own ? ctx(out, global$2) : IS_PROTO && typeof out == "function" ? ctx(Function.call, out) : out;
				if (target) redefine$2(target, key$1, out, type & $export$4.U);
				if (exports$1[key$1] != out) hide$2(exports$1, key$1, exp);
				if (IS_PROTO && expProto[key$1] != out) expProto[key$1] = out;
			}
		};
		global$2.core = core$1;
		$export$4.F = 1;
		$export$4.G = 2;
		$export$4.S = 4;
		$export$4.P = 8;
		$export$4.B = 16;
		$export$4.W = 32;
		$export$4.U = 64;
		$export$4.R = 128;
		module.exports = $export$4;
	}));
	var require__to_integer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var ceil = Math.ceil;
		var floor = Math.floor;
		module.exports = function(it) {
			return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
		};
	}));
	var require__to_length = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var toInteger$1 = require__to_integer();
		var min$1 = Math.min;
		module.exports = function(it) {
			return it > 0 ? min$1(toInteger$1(it), 9007199254740991) : 0;
		};
	}));
	var require__to_absolute_index = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var toInteger = require__to_integer();
		var max = Math.max;
		var min = Math.min;
		module.exports = function(index$3, length) {
			index$3 = toInteger(index$3);
			return index$3 < 0 ? max(index$3 + length, 0) : min(index$3, length);
		};
	}));
	var require__array_includes = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var toIObject$3 = require__to_iobject();
		var toLength = require__to_length();
		var toAbsoluteIndex = require__to_absolute_index();
		module.exports = function(IS_INCLUDES) {
			return function($this, el, fromIndex) {
				var O = toIObject$3($this);
				var length = toLength(O.length);
				var index$3 = toAbsoluteIndex(fromIndex, length);
				var value;
				if (IS_INCLUDES && el != el) while (length > index$3) {
					value = O[index$3++];
					if (value != value) return true;
				}
				else for (; length > index$3; index$3++) if (IS_INCLUDES || index$3 in O) {
					if (O[index$3] === el) return IS_INCLUDES || index$3 || 0;
				}
				return !IS_INCLUDES && -1;
			};
		};
	}));
	var require__shared_key = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var shared = require__shared()("keys");
		var uid$2 = require__uid();
		module.exports = function(key$1) {
			return shared[key$1] || (shared[key$1] = uid$2(key$1));
		};
	}));
	var require__object_keys_internal = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var has$3 = require__has();
		var toIObject$2 = require__to_iobject();
		var arrayIndexOf = require__array_includes()(false);
		var IE_PROTO$2 = require__shared_key()("IE_PROTO");
		module.exports = function(object, names) {
			var O = toIObject$2(object);
			var i$1 = 0;
			var result = [];
			var key$1;
			for (key$1 in O) if (key$1 != IE_PROTO$2) has$3(O, key$1) && result.push(key$1);
			while (names.length > i$1) if (has$3(O, key$1 = names[i$1++])) ~arrayIndexOf(result, key$1) || result.push(key$1);
			return result;
		};
	}));
	var require__enum_bug_keys = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
	}));
	var require__object_keys = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var $keys = require__object_keys_internal();
		var enumBugKeys$1 = require__enum_bug_keys();
		module.exports = Object.keys || function keys(O) {
			return $keys(O, enumBugKeys$1);
		};
	}));
	var require__object_dps = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var dP = require__object_dp();
		var anObject$3 = require__an_object();
		var getKeys$2 = require__object_keys();
		module.exports = require__descriptors() ? Object.defineProperties : function defineProperties(O, Properties) {
			anObject$3(O);
			var keys = getKeys$2(Properties);
			var length = keys.length;
			var i$1 = 0;
			var P;
			while (length > i$1) dP.f(O, P = keys[i$1++], Properties[P]);
			return O;
		};
	}));
	var require__html = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var document$1 = require__global().document;
		module.exports = document$1 && document$1.documentElement;
	}));
	var require__object_create = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var anObject$2 = require__an_object();
		var dPs = require__object_dps();
		var enumBugKeys = require__enum_bug_keys();
		var IE_PROTO$1 = require__shared_key()("IE_PROTO");
		var Empty = function() {};
		var PROTOTYPE = "prototype";
		var createDict = function() {
			var iframe = require__dom_create()("iframe");
			var i$1 = enumBugKeys.length;
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
			while (i$1--) delete createDict[PROTOTYPE][enumBugKeys[i$1]];
			return createDict();
		};
		module.exports = Object.create || function create$1(O, Properties) {
			var result;
			if (O !== null) {
				Empty[PROTOTYPE] = anObject$2(O);
				result = new Empty();
				Empty[PROTOTYPE] = null;
				result[IE_PROTO$1] = O;
			} else result = createDict();
			return Properties === void 0 ? result : dPs(result, Properties);
		};
	}));
	var require__set_to_string_tag = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var def$1 = require__object_dp().f;
		var has$2 = require__has();
		var TAG = require__wks()("toStringTag");
		module.exports = function(it, tag, stat) {
			if (it && !has$2(it = stat ? it : it.prototype, TAG)) def$1(it, TAG, {
				configurable: true,
				value: tag
			});
		};
	}));
	var require__iter_create = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var create = require__object_create();
		var descriptor = require__property_desc();
		var setToStringTag$1 = require__set_to_string_tag();
		var IteratorPrototype = {};
		require__hide()(IteratorPrototype, require__wks()("iterator"), function() {
			return this;
		});
		module.exports = function(Constructor, NAME$2, next) {
			Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
			setToStringTag$1(Constructor, NAME$2 + " Iterator");
		};
	}));
	var require__to_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var defined = require__defined();
		module.exports = function(it) {
			return Object(defined(it));
		};
	}));
	var require__object_gpo = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var has$1 = require__has();
		var toObject$1 = require__to_object();
		var IE_PROTO = require__shared_key()("IE_PROTO");
		var ObjectProto = Object.prototype;
		module.exports = Object.getPrototypeOf || function(O) {
			O = toObject$1(O);
			if (has$1(O, IE_PROTO)) return O[IE_PROTO];
			if (typeof O.constructor == "function" && O instanceof O.constructor) return O.constructor.prototype;
			return O instanceof Object ? ObjectProto : null;
		};
	}));
	var require__iter_define = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		init_web_dom_iterable();
		var LIBRARY = require__library();
		var $export$3 = require__export();
		var redefine$1 = require__redefine();
		var hide$1 = require__hide();
		var Iterators$2 = require__iterators();
		var $iterCreate = require__iter_create();
		var setToStringTag = require__set_to_string_tag();
		var getPrototypeOf = require__object_gpo();
		var ITERATOR$1 = require__wks()("iterator");
		var BUGGY = !([].keys && "next" in [].keys());
		var FF_ITERATOR = "@@iterator";
		var KEYS = "keys";
		var VALUES = "values";
		var returnThis = function() {
			return this;
		};
		module.exports = function(Base, NAME$2, Constructor, next, DEFAULT, IS_SET, FORCED) {
			$iterCreate(Constructor, NAME$2, next);
			var getMethod = function(kind) {
				if (!BUGGY && kind in proto$1) return proto$1[kind];
				switch (kind) {
					case KEYS: return function keys() {
						return new Constructor(this, kind);
					};
					case VALUES: return function values() {
						return new Constructor(this, kind);
					};
				}
				return function entries$1() {
					return new Constructor(this, kind);
				};
			};
			var TAG$1 = NAME$2 + " Iterator";
			var DEF_VALUES = DEFAULT == VALUES;
			var VALUES_BUG = false;
			var proto$1 = Base.prototype;
			var $native = proto$1[ITERATOR$1] || proto$1[FF_ITERATOR] || DEFAULT && proto$1[DEFAULT];
			var $default = $native || getMethod(DEFAULT);
			var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod("entries") : void 0;
			var $anyNative = NAME$2 == "Array" ? proto$1.entries || $native : $native;
			var methods, key$1, IteratorPrototype$1;
			if ($anyNative) {
				IteratorPrototype$1 = getPrototypeOf($anyNative.call(new Base()));
				if (IteratorPrototype$1 !== Object.prototype && IteratorPrototype$1.next) {
					setToStringTag(IteratorPrototype$1, TAG$1, true);
					if (!LIBRARY && typeof IteratorPrototype$1[ITERATOR$1] != "function") hide$1(IteratorPrototype$1, ITERATOR$1, returnThis);
				}
			}
			if (DEF_VALUES && $native && $native.name !== VALUES) {
				VALUES_BUG = true;
				$default = function values() {
					return $native.call(this);
				};
			}
			if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto$1[ITERATOR$1])) hide$1(proto$1, ITERATOR$1, $default);
			Iterators$2[NAME$2] = $default;
			Iterators$2[TAG$1] = returnThis;
			if (DEFAULT) {
				methods = {
					values: DEF_VALUES ? $default : getMethod(VALUES),
					keys: IS_SET ? $default : getMethod(KEYS),
					entries: $entries
				};
				if (FORCED) {
					for (key$1 in methods) if (!(key$1 in proto$1)) redefine$1(proto$1, key$1, methods[key$1]);
				} else $export$3($export$3.P + $export$3.F * (BUGGY || VALUES_BUG), NAME$2, methods);
			}
			return methods;
		};
	}));
	var require_es6_array_iterator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var addToUnscopables = require__add_to_unscopables();
		var step = require__iter_step();
		var Iterators$1 = require__iterators();
		var toIObject$1 = require__to_iobject();
		module.exports = require__iter_define()(Array, "Array", function(iterated, kind) {
			this._t = toIObject$1(iterated);
			this._i = 0;
			this._k = kind;
		}, function() {
			var O = this._t;
			var kind = this._k;
			var index$3 = this._i++;
			if (!O || index$3 >= O.length) {
				this._t = void 0;
				return step(1);
			}
			if (kind == "keys") return step(0, index$3);
			if (kind == "values") return step(0, O[index$3]);
			return step(0, [index$3, O[index$3]]);
		}, "values");
		Iterators$1.Arguments = Iterators$1.Array;
		addToUnscopables("keys");
		addToUnscopables("values");
		addToUnscopables("entries");
	}));
	var $iterators, getKeys$1, redefine, global$1, hide, Iterators, wks, ITERATOR, TO_STRING_TAG, ArrayValues, DOMIterables, collections, i, NAME$1, explicit, Collection, proto, key;
	var init_web_dom_iterable = __esmMin((() => {
		$iterators = require_es6_array_iterator();
		getKeys$1 = require__object_keys();
		redefine = require__redefine();
		global$1 = require__global();
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
		for (collections = getKeys$1(DOMIterables), i = 0; i < collections.length; i++) {
			NAME$1 = collections[i];
			explicit = DOMIterables[NAME$1];
			Collection = global$1[NAME$1];
			proto = Collection && Collection.prototype;
			if (proto) {
				if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
				if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME$1);
				Iterators[NAME$1] = ArrayValues;
				if (explicit) {
					for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
				}
			}
		}
	}));
	init_web_dom_iterable();
	/**
	* @vue/shared v3.4.21
	* (c) 2018-present Yuxi (Evan) You and Vue contributors
	* @license MIT
	**/
	function makeMap$1(str, expectsLowerCase) {
		var set$1 = new Set(str.split(","));
		return expectsLowerCase ? (val) => set$1.has(val.toLowerCase()) : (val) => set$1.has(val);
	}
	var EMPTY_OBJ = {};
	var EMPTY_ARR = [];
	var NOOP = () => {};
	var NO = () => false;
	var isOn = (key$1) => key$1.charCodeAt(0) === 111 && key$1.charCodeAt(1) === 110 && (key$1.charCodeAt(2) > 122 || key$1.charCodeAt(2) < 97);
	var isModelListener = (key$1) => key$1.startsWith("onUpdate:");
	var extend = Object.assign;
	var remove = (arr, el) => {
		var i$1 = arr.indexOf(el);
		if (i$1 > -1) arr.splice(i$1, 1);
	};
	var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
	var hasOwn = (val, key$1) => hasOwnProperty$2.call(val, key$1);
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
	var isIntegerKey = (key$1) => isString(key$1) && key$1 !== "NaN" && key$1[0] !== "-" && "" + parseInt(key$1, 10) === key$1;
	var isReservedProp = /* @__PURE__ */ makeMap$1(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
	var cacheStringFunction$1 = (fn) => {
		var cache$1 = /* @__PURE__ */ Object.create(null);
		return (str) => {
			return cache$1[str] || (cache$1[str] = fn(str));
		};
	};
	var camelizeRE = /-(\w)/g;
	var camelize = cacheStringFunction$1((str) => {
		return str.replace(camelizeRE, (_, c$1) => c$1 ? c$1.toUpperCase() : "");
	});
	var hyphenateRE = /\B([A-Z])/g;
	var hyphenate = cacheStringFunction$1((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
	var capitalize = cacheStringFunction$1((str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	});
	var toHandlerKey = cacheStringFunction$1((str) => {
		return str ? "on".concat(capitalize(str)) : "";
	});
	var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
	var invokeArrayFns = (fns, arg) => {
		for (var i$1 = 0; i$1 < fns.length; i$1++) fns[i$1](arg);
	};
	var def = (obj, key$1, value) => {
		Object.defineProperty(obj, key$1, {
			configurable: true,
			enumerable: false,
			value
		});
	};
	var looseToNumber = (val) => {
		var n = parseFloat(val);
		return isNaN(n) ? val : n;
	};
	var toNumber = (val) => {
		var n = isString(val) ? Number(val) : NaN;
		return isNaN(n) ? val : n;
	};
	var _globalThis;
	var getGlobalThis = () => {
		return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof window !== "undefined" ? window : {});
	};
	function normalizeStyle(value) {
		if (isArray(value)) {
			var res = {};
			for (var i$1 = 0; i$1 < value.length; i$1++) {
				var item = value[i$1];
				var normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
				if (normalized) for (var key$1 in normalized) res[key$1] = normalized[key$1];
			}
			return res;
		} else if (isString(value) || isObject$1(value)) return value;
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
		if (!styles || isString(styles)) return ret;
		for (var key$1 in styles) {
			var value = styles[key$1];
			var normalizedKey = key$1.startsWith("--") ? key$1 : hyphenate(key$1);
			if (isString(value) || typeof value === "number") ret += "".concat(normalizedKey, ":").concat(value, ";");
		}
		return ret;
	}
	function normalizeClass(value) {
		var res = "";
		if (isString(value)) res = value;
		else if (isArray(value)) for (var i$1 = 0; i$1 < value.length; i$1++) {
			var normalized = normalizeClass(value[i$1]);
			if (normalized) res += normalized + " ";
		}
		else if (isObject$1(value)) {
			for (var name in value) if (value[name]) res += name + " ";
		}
		return res.trim();
	}
	var specialBooleanAttrs = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
	var isSpecialBooleanAttr = /* @__PURE__ */ makeMap$1(specialBooleanAttrs);
	specialBooleanAttrs + "";
	function includeBooleanAttr(value) {
		return !!value || value === "";
	}
	init_web_dom_iterable();
	var BUILT_IN_TAG_NAMES = [
		"ad",
		"ad-content-page",
		"ad-draw",
		"audio",
		"button",
		"camera",
		"canvas",
		"checkbox",
		"checkbox-group",
		"cover-image",
		"cover-view",
		"editor",
		"form",
		"functional-page-navigator",
		"icon",
		"image",
		"input",
		"label",
		"live-player",
		"live-pusher",
		"map",
		"movable-area",
		"movable-view",
		"navigator",
		"official-account",
		"open-data",
		"picker",
		"picker-view",
		"picker-view-column",
		"progress",
		"radio",
		"radio-group",
		"rich-text",
		"scroll-view",
		"slider",
		"swiper",
		"swiper-item",
		"switch",
		"text",
		"textarea",
		"video",
		"view",
		"web-view",
		"location-picker",
		"location-view"
	];
	BUILT_IN_TAG_NAMES.map((tag) => "uni-" + tag);
	[
		"app",
		"layout",
		"content",
		"main",
		"top-window",
		"left-window",
		"right-window",
		"tabbar",
		"page",
		"page-head",
		"page-wrapper",
		"page-body",
		"page-refresh",
		"actionsheet",
		"modal",
		"toast",
		"resize-sensor",
		"shadow-root"
	].map((tag) => "uni-" + tag);
	[
		"page-container",
		"list-view",
		"list-item",
		"sticky-section",
		"sticky-header",
		"cloud-db-element",
		"loading-element",
		"loading"
	].map((tag) => "uni-" + tag);
	[
		"list-view",
		"list-item",
		"sticky-section",
		"sticky-header",
		"cloud-db-element",
		"loading-element"
	].map((tag) => "uni-" + tag);
	[...BUILT_IN_TAG_NAMES];
	["list-item"].map((tag) => "uni-" + tag);
	var NVUE_CUSTOM_COMPONENTS = [
		"ad",
		"ad-draw",
		"button",
		"checkbox-group",
		"checkbox",
		"form",
		"icon",
		"label",
		"movable-area",
		"movable-view",
		"navigator",
		"picker",
		"progress",
		"radio-group",
		"radio",
		"rich-text",
		"swiper-item",
		"swiper",
		"switch",
		"slider",
		"picker-view",
		"picker-view-column"
	];
	var UVUE_BUILT_IN_EASY_COMPONENTS = [
		"map",
		"camera",
		"live-player",
		"live-pusher",
		"loading",
		"web-view",
		"rich-text",
		"page-container",
		"editor",
		"video"
	];
	[...NVUE_CUSTOM_COMPONENTS, ...UVUE_BUILT_IN_EASY_COMPONENTS];
	var PRIMARY_COLOR = "#007aff";
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
	function formatLog(module$1) {
		var now = Date.now();
		var diff = lastLogTime ? now - lastLogTime : 0;
		lastLogTime = now;
		for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) args[_key2 - 1] = arguments[_key2];
		return "[".concat(now, "][").concat(diff, "ms][").concat(module$1, "]：").concat(args.map((arg) => JSON.stringify(arg)).join(" "));
	}
	function cache(fn) {
		var cache$1 = Object.create(null);
		return (str) => {
			return cache$1[str] || (cache$1[str] = fn(str));
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
		var ctx$1 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
		var res;
		return function() {
			if (fn) {
				for (var _len2 = arguments.length, args = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) args[_key3] = arguments[_key3];
				res = fn.apply(ctx$1, args);
				fn = null;
			}
			return res;
		};
	}
	function getValueByDataPath(obj, path) {
		if (!isString(path)) return;
		path = path.replace(/\[(\d+)\]/g, ".$1");
		var parts = path.split(".");
		var key$1 = parts[0];
		if (!obj) obj = {};
		if (parts.length === 1) return obj[key$1];
		return getValueByDataPath(obj[key$1], parts.slice(1).join("."));
	}
	function formatKey(key$1) {
		return camelize(key$1.substring(5));
	}
	var initCustomDatasetOnce = /* @__PURE__ */ once((isBuiltInElement$1) => {
		isBuiltInElement$1 = isBuiltInElement$1 || ((el) => el.tagName.startsWith("UNI-"));
		var prototype = HTMLElement.prototype;
		var setAttribute = prototype.setAttribute;
		prototype.setAttribute = function(key$1, value) {
			if (key$1.startsWith("data-") && isBuiltInElement$1(this)) {
				var dataset = this.__uniDataset || (this.__uniDataset = {});
				dataset[formatKey(key$1)] = value;
			}
			if (!/^\d/.test(key$1)) setAttribute.call(this, key$1, value);
		};
		var removeAttribute = prototype.removeAttribute;
		prototype.removeAttribute = function(key$1) {
			if (this.__uniDataset && key$1.startsWith("data-") && isBuiltInElement$1(this)) delete this.__uniDataset[formatKey(key$1)];
			removeAttribute.call(this, key$1);
		};
	});
	function getCustomDataset(el) {
		return extend({}, el.dataset, el.__uniDataset);
	}
	var unitRE = new RegExp("\"[^\"]+\"|'[^']+'|url\\([^)]+\\)|(\\d*\\.?\\d+)[r|u]px", "g");
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
	function createRpx2Unit(unit$1, unitRatio$1, unitPrecision$1) {
		return (val) => val.replace(unitRE, (m, $1) => {
			if (!$1) return m;
			if (unitRatio$1 === 1) return "".concat($1).concat(unit$1);
			var value = toFixed(parseFloat($1) * unitRatio$1, unitPrecision$1);
			return value === 0 ? "0" : "".concat(value).concat(unit$1);
		});
	}
	function passive(passive$1) {
		return { passive: passive$1 };
	}
	function normalizeTarget(el) {
		var { id: id$1, offsetTop, offsetLeft } = el;
		return {
			id: id$1,
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
				var { style: _style, weight, stretch, unicodeRange, variant, featureSettings } = desc;
				_style && values.push("font-style:".concat(_style));
				weight && values.push("font-weight:".concat(weight));
				stretch && values.push("font-stretch:".concat(stretch));
				unicodeRange && values.push("unicode-range:".concat(unicodeRange));
				variant && values.push("font-variant:".concat(variant));
				featureSettings && values.push("font-feature-settings:".concat(featureSettings));
			}
			style.innerText = "@font-face{font-family:\"".concat(family, "\";src:").concat(source, ";").concat(values.join(";"), "}");
			document.head.appendChild(style);
			resolve();
		});
	}
	function scrollTo(scrollTop, duration, isH5) {
		if (isString(scrollTop)) {
			var el = document.querySelector(scrollTop);
			if (el) {
				var { top } = el.getBoundingClientRect();
				scrollTop = top + window.pageYOffset;
				var pageHeader = document.querySelector("uni-page-head");
				if (pageHeader) scrollTop -= pageHeader.offsetHeight;
			}
		}
		if (scrollTop < 0) scrollTop = 0;
		var documentElement = document.documentElement;
		var { clientHeight, scrollHeight } = documentElement;
		scrollTop = Math.min(scrollTop, scrollHeight - clientHeight);
		if (duration === 0) {
			documentElement.scrollTop = document.body.scrollTop = scrollTop;
			return;
		}
		if (window.scrollY === scrollTop) return;
		var scrollTo$1 = (duration$1) => {
			if (duration$1 <= 0) {
				window.scrollTo(0, scrollTop);
				return;
			}
			var distaince = scrollTop - window.scrollY;
			requestAnimationFrame(function() {
				window.scrollTo(0, window.scrollY + distaince / duration$1 * 10);
				scrollTo$1(duration$1 - 10);
			});
		};
		scrollTo$1(duration);
	}
	function plusReady(callback) {
		if (!isFunction(callback)) return;
		if (window.plus) return callback();
		document.addEventListener("plusready", callback);
	}
	function normalizeEventType(type, options) {
		if (options) {
			if (options.capture) type += "Capture";
			if (options.once) type += "Once";
			if (options.passive) type += "Passive";
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
			prevent: 2,
			self: 4
		};
	})();
	var ATTR_V_SHOW = ".vShow";
	var ATTR_CHANGE_PREFIX = "change:";
	function debounce(fn, delay, _ref2) {
		var { clearTimeout: clearTimeout$1, setTimeout: setTimeout$1 } = _ref2;
		var timeout;
		var newFn = function() {
			clearTimeout$1(timeout);
			var timerFn = () => fn.apply(this, arguments);
			timeout = setTimeout$1(timerFn, delay);
		};
		newFn.cancel = function() {
			clearTimeout$1(timeout);
		};
		return newFn;
	}
	once((app, createErrorHandler) => {
		return createErrorHandler(app);
	});
	var E = function() {};
	E.prototype = {
		_id: 1,
		on: function(name, callback, ctx$1) {
			var e$1 = this.e || (this.e = {});
			(e$1[name] || (e$1[name] = [])).push({
				fn: callback,
				ctx: ctx$1,
				_id: this._id
			});
			return this._id++;
		},
		once: function(name, callback, ctx$1) {
			var self$1 = this;
			function listener() {
				self$1.off(name, listener);
				callback.apply(ctx$1, arguments);
			}
			listener._ = callback;
			return this.on(name, listener, ctx$1);
		},
		emit: function(name) {
			var data = [].slice.call(arguments, 1);
			var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
			var i$1 = 0;
			var len = evtArr.length;
			for (; i$1 < len; i$1++) evtArr[i$1].fn.apply(evtArr[i$1].ctx, data);
			return this;
		},
		off: function(name, event) {
			var e$1 = this.e || (this.e = {});
			var evts = e$1[name];
			var liveEvents = [];
			if (evts && event) {
				for (var i$1 = evts.length - 1; i$1 >= 0; i$1--) if (evts[i$1].fn === event || evts[i$1].fn._ === event || evts[i$1]._id === event) {
					evts.splice(i$1, 1);
					break;
				}
				liveEvents = evts;
			}
			liveEvents.length ? e$1[name] = liveEvents : delete e$1[name];
			return this;
		}
	};
	init_web_dom_iterable();
	var isObject$2 = (val) => val !== null && typeof val === "object";
	var defaultDelimiters = ["{", "}"];
	var BaseFormatter = class {
		constructor() {
			this._caches = Object.create(null);
		}
		interpolate(message, values) {
			var delimiters = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultDelimiters;
			if (!values) return [message];
			var tokens = this._caches[message];
			if (!tokens) {
				tokens = parse(message, delimiters);
				this._caches[message] = tokens;
			}
			return compile$1(tokens, values);
		}
	};
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
				if (text) tokens.push({
					type: "text",
					value: text
				});
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
			} else text += char;
		}
		text && tokens.push({
			type: "text",
			value: text
		});
		return tokens;
	}
	function compile$1(tokens, values) {
		var compiled = [];
		var index$3 = 0;
		var mode$1 = Array.isArray(values) ? "list" : isObject$2(values) ? "named" : "unknown";
		if (mode$1 === "unknown") return compiled;
		while (index$3 < tokens.length) {
			var token = tokens[index$3];
			switch (token.type) {
				case "text":
					compiled.push(token.value);
					break;
				case "list":
					compiled.push(values[parseInt(token.value, 10)]);
					break;
				case "named":
					if (mode$1 === "named") compiled.push(values[token.value]);
					break;
				case "unknown": break;
			}
			index$3++;
		}
		return compiled;
	}
	var LOCALE_ZH_HANS = "zh-Hans";
	var LOCALE_ZH_HANT = "zh-Hant";
	var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
	var hasOwn$1 = (val, key$1) => hasOwnProperty$1.call(val, key$1);
	var defaultFormatter = new BaseFormatter();
	function include(str, parts) {
		return !!parts.find((part) => str.indexOf(part) !== -1);
	}
	function startsWith(str, parts) {
		return parts.find((part) => str.indexOf(part) === 0);
	}
	function normalizeLocale(locale, messages) {
		if (!locale) return;
		locale = locale.trim().replace(/_/g, "-");
		if (messages && messages[locale]) return locale;
		locale = locale.toLowerCase();
		if (locale === "chinese") return LOCALE_ZH_HANS;
		if (locale.indexOf("zh") === 0) {
			if (locale.indexOf("-hans") > -1) return LOCALE_ZH_HANS;
			if (locale.indexOf("-hant") > -1) return LOCALE_ZH_HANT;
			if (include(locale, [
				"-tw",
				"-hk",
				"-mo",
				"-cht"
			])) return LOCALE_ZH_HANT;
			return LOCALE_ZH_HANS;
		}
		var locales = [
			"en",
			"fr",
			"es"
		];
		if (messages && Object.keys(messages).length > 0) locales = Object.keys(messages);
		var lang = startsWith(locale, locales);
		if (lang) return lang;
	}
	var I18n = class {
		constructor(_ref2) {
			var { locale, fallbackLocale, messages, watcher, formater } = _ref2;
			this.locale = "en";
			this.fallbackLocale = "en";
			this.message = {};
			this.messages = {};
			this.watchers = [];
			if (fallbackLocale) this.fallbackLocale = fallbackLocale;
			this.formater = formater || defaultFormatter;
			this.messages = messages || {};
			this.setLocale(locale || "en");
			if (watcher) this.watchLocale(watcher);
		}
		setLocale(locale) {
			var oldLocale = this.locale;
			this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
			if (!this.messages[this.locale]) this.messages[this.locale] = {};
			this.message = this.messages[this.locale];
			if (oldLocale !== this.locale) this.watchers.forEach((watcher) => {
				watcher(this.locale, oldLocale);
			});
		}
		getLocale() {
			return this.locale;
		}
		watchLocale(fn) {
			var index$3 = this.watchers.push(fn) - 1;
			return () => {
				this.watchers.splice(index$3, 1);
			};
		}
		add(locale, message) {
			var override = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
			var curMessages = this.messages[locale];
			if (curMessages) if (override) Object.assign(curMessages, message);
			else Object.keys(message).forEach((key$1) => {
				if (!hasOwn$1(curMessages, key$1)) curMessages[key$1] = message[key$1];
			});
			else this.messages[locale] = message;
		}
		f(message, values, delimiters) {
			return this.formater.interpolate(message, values, delimiters).join("");
		}
		t(key$1, locale, values) {
			var message = this.message;
			if (typeof locale === "string") {
				locale = normalizeLocale(locale, this.messages);
				locale && (message = this.messages[locale]);
			} else values = locale;
			if (!hasOwn$1(message, key$1)) {
				console.warn("Cannot translate the value of keypath ".concat(key$1, ". Use the value of keypath as default."));
				return key$1;
			}
			return this.formater.interpolate(message[key$1], values).join("");
		}
	};
	function watchAppLocale(appVm, i18n$1) {
		if (appVm.$watchLocale) appVm.$watchLocale((newLocale) => {
			i18n$1.setLocale(newLocale);
		});
		else appVm.$watch(() => appVm.$locale, (newLocale) => {
			i18n$1.setLocale(newLocale);
		});
	}
	function getDefaultLocale() {
		if (typeof uni !== "undefined" && uni.getLocale) return uni.getLocale();
		if (typeof window !== "undefined" && window.getLocale) return window.getLocale();
		return "en";
	}
	function initVueI18n(locale) {
		var messages = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		var fallbackLocale = arguments.length > 2 ? arguments[2] : void 0;
		var watcher = arguments.length > 3 ? arguments[3] : void 0;
		if (typeof locale !== "string") {
			var options = [messages, locale];
			locale = options[0];
			messages = options[1];
		}
		if (typeof locale !== "string") locale = getDefaultLocale();
		if (typeof fallbackLocale !== "string") fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || "en";
		var i18n$1 = new I18n({
			locale,
			fallbackLocale,
			messages,
			watcher
		});
		var t$1 = (key$1, values) => {
			if (typeof getApp !== "function") t$1 = function(key$2, values$1) {
				return i18n$1.t(key$2, values$1);
			};
			else {
				var isWatchedAppLocale = false;
				t$1 = function(key$2, values$1) {
					var appVm = getApp().$vm;
					if (appVm) {
						appVm.$locale;
						if (!isWatchedAppLocale) {
							isWatchedAppLocale = true;
							watchAppLocale(appVm, i18n$1);
						}
					}
					return i18n$1.t(key$2, values$1);
				};
			}
			return t$1(key$1, values);
		};
		return {
			i18n: i18n$1,
			f(message, values, delimiters) {
				return i18n$1.f(message, values, delimiters);
			},
			t(key$1, values) {
				return t$1(key$1, values);
			},
			add(locale$1, message) {
				var override = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
				return i18n$1.add(locale$1, message, override);
			},
			watch(fn) {
				return i18n$1.watchLocale(fn);
			},
			getLocale() {
				return i18n$1.getLocale();
			},
			setLocale(newLocale) {
				return i18n$1.setLocale(newLocale);
			}
		};
	}
	var isEnableLocale = /* @__PURE__ */ once(() => typeof __uniConfig !== "undefined" && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length);
	var i18n;
	function useI18n() {
		if (!i18n) {
			var locale;
			if (typeof getApp === "function") locale = weex.requireModule("plus").getLanguage();
			else locale = plus.webview.currentWebview().getStyle().locale;
			i18n = initVueI18n(locale);
			if (isEnableLocale()) {
				var localeKeys = Object.keys(__uniConfig.locales || {});
				if (localeKeys.length) localeKeys.forEach((locale$1) => i18n.add(locale$1, __uniConfig.locales[locale$1]));
				i18n.setLocale(locale);
			}
		}
		return i18n;
	}
	function normalizeMessages(module$1, keys, values) {
		return keys.reduce((res, name, index$3) => {
			res[module$1 + name] = values[index$3];
			return res;
		}, {});
	}
	var initI18nVideoMsgsOnce = /* @__PURE__ */ once(() => {
		var name = "uni.video.";
		var keys = ["danmu", "volume"];
		useI18n().add("en", normalizeMessages(name, keys, ["Danmu", "Volume"]), false);
		useI18n().add("es", normalizeMessages(name, keys, ["Danmu", "Volumen"]), false);
		useI18n().add("fr", normalizeMessages(name, keys, ["Danmu", "Le Volume"]), false);
		useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, ["弹幕", "音量"]), false);
		useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, ["彈幕", "音量"]), false);
	});
	var initI18nChooseLocationMsgsOnce = /* @__PURE__ */ once(() => {
		var name = "uni.chooseLocation.";
		var keys = ["search", "cancel"];
		useI18n().add("en", normalizeMessages(name, keys, ["Find Place", "Cancel"]), false);
		useI18n().add("es", normalizeMessages(name, keys, ["Encontrar", "Cancelar"]), false);
		useI18n().add("fr", normalizeMessages(name, keys, ["Trouve", "Annuler"]), false);
		useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, ["搜索地点", "取消"]), false);
		useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, ["搜索地點", "取消"]), false);
	});
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
			emit(event) {
				for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
				return emitter.emit(event, ...args);
			},
			subscribe(event, callback) {
				emitter[(arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false) ? "once" : "on"]("".concat(subscribeNamespace, ".").concat(event), callback);
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
		var { subscribe, publishHandler: publishHandler$1 } = UniViewJSBridge;
		var id$1 = callback ? invokeServiceMethodId++ : 0;
		callback && subscribe("invokeServiceApi." + id$1, callback, true);
		publishHandler$1(INVOKE_SERVICE_API, {
			id: id$1,
			name,
			args
		});
	};
	var viewMethods = Object.create(null);
	function normalizeViewMethodName(pageId, name) {
		return pageId + "." + name;
	}
	function subscribeViewMethod(pageId, wrapper$1) {
		UniViewJSBridge.subscribe(normalizeViewMethodName(pageId, INVOKE_VIEW_API), wrapper$1 ? wrapper$1(onInvokeViewMethod) : onInvokeViewMethod);
	}
	function registerViewMethod(pageId, name, fn) {
		name = normalizeViewMethodName(pageId, name);
		if (!viewMethods[name]) viewMethods[name] = fn;
	}
	function unregisterViewMethod(pageId, name) {
		name = normalizeViewMethodName(pageId, name);
		delete viewMethods[name];
	}
	function onInvokeViewMethod(_ref, pageId) {
		var { id: id$1, name, args } = _ref;
		name = normalizeViewMethodName(pageId, name);
		var publish = (res) => {
			id$1 && UniViewJSBridge.publishHandler("invokeViewApi." + id$1, res);
		};
		var handler = viewMethods[name];
		if (handler) handler(args, publish);
		else publish({});
	}
	var ViewJSBridge = /* @__PURE__ */ extend(/* @__PURE__ */ initBridge("service"), { invokeServiceMethod });
	var LONGPRESS_TIMEOUT = 350;
	var LONGPRESS_THRESHOLD = 10;
	var passiveOptions$2 = /* @__PURE__ */ passive(true);
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
		if (evt.touches.length !== 1) return;
		var { pageX, pageY } = evt.touches[0];
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
		if (!longPressTimer) return;
		if (evt.touches.length !== 1) return clearLongPressTimer();
		var { pageX, pageY } = evt.touches[0];
		if (Math.abs(pageX - startPageX) > LONGPRESS_THRESHOLD || Math.abs(pageY - startPageY) > LONGPRESS_THRESHOLD) return clearLongPressTimer();
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
	var isApple$1 = () => /^Apple/.test(navigator.vendor);
	function getWindowWidth() {
		var isApple$2 = /^Apple/.test(navigator.vendor);
		isApple$2 && window.matchMedia("(orientation:landscape)").matches ? Math.max(screen.width, screen.height) : screen.width;
		return isApple$2 ? plus.webview.currentWebview().getStyle().width : Math.min(window.innerWidth, document.documentElement.clientWidth);
	}
	function useRem() {
		var config = __uniConfig.globalStyle || {};
		var maxWidth$1 = checkValue$1(config.rpxCalcMaxDeviceWidth, 960);
		var baseWidth$1 = checkValue$1(config.rpxCalcBaseDeviceWidth, 375);
		function updateRem() {
			var width = getWindowWidth();
			width = width <= maxWidth$1 ? width : baseWidth$1;
			document.documentElement.style.fontSize = width / 23.4375 + "px";
		}
		updateRem();
		document.addEventListener("DOMContentLoaded", updateRem);
		window.addEventListener("load", updateRem);
		window.addEventListener("resize", updateRem);
		if (isApple$1()) window.addEventListener("orientationchange", () => {
			updateRem();
			setTimeout(updateRem, 50);
		});
	}
	var require__strict_method = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var fails$1 = require__fails();
		module.exports = function(method, arg) {
			return !!method && fails$1(function() {
				arg ? method.call(null, function() {}, 1) : method.call(null);
			});
		};
	}));
	var $export$2 = require__export();
	var aFunction$2 = require__a_function();
	var toObject = require__to_object();
	var fails = require__fails();
	var $sort = [].sort;
	var test = [
		1,
		2,
		3
	];
	$export$2($export$2.P + $export$2.F * (fails(function() {
		test.sort(void 0);
	}) || !fails(function() {
		test.sort(null);
	}) || !require__strict_method()($sort)), "Array", { sort: function sort(comparefn) {
		return comparefn === void 0 ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction$2(comparefn));
	} });
	/**
	* @dcloudio/uni-app-view-vue v3.4.21
	* (c) 2018-present Yuxi (Evan) You and Vue contributors
	* @license MIT
	**/
	init_web_dom_iterable();
	var activeEffectScope;
	var EffectScope = class {
		constructor() {
			var detached = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
			this.detached = detached;
			this._active = true;
			this.effects = [];
			this.cleanups = [];
			this.parent = activeEffectScope;
			if (!detached && activeEffectScope) this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
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
		on() {
			activeEffectScope = this;
		}
		off() {
			activeEffectScope = this.parent;
		}
		stop(fromParent) {
			if (this._active) {
				var i$1, l;
				for (i$1 = 0, l = this.effects.length; i$1 < l; i$1++) this.effects[i$1].stop();
				for (i$1 = 0, l = this.cleanups.length; i$1 < l; i$1++) this.cleanups[i$1]();
				if (this.scopes) for (i$1 = 0, l = this.scopes.length; i$1 < l; i$1++) this.scopes[i$1].stop(true);
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
	};
	function recordEffectScope(effect) {
		var scope = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : activeEffectScope;
		if (scope && scope.active) scope.effects.push(effect);
	}
	function getCurrentScope() {
		return activeEffectScope;
	}
	var activeEffect;
	var ReactiveEffect = class {
		constructor(fn, trigger$1, scheduler, scope) {
			this.fn = fn;
			this.trigger = trigger$1;
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
				for (var i$1 = 0; i$1 < this._depsLength; i$1++) {
					var dep = this.deps[i$1];
					if (dep.computed) {
						triggerComputed(dep.computed);
						if (this._dirtyLevel >= 4) break;
					}
				}
				if (this._dirtyLevel === 1) this._dirtyLevel = 0;
				resetTracking();
			}
			return this._dirtyLevel >= 4;
		}
		set dirty(v$1) {
			this._dirtyLevel = v$1 ? 4 : 0;
		}
		run() {
			this._dirtyLevel = 0;
			if (!this.active) return this.fn();
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
				(_a = this.onStop) == null || _a.call(this);
				this.active = false;
			}
		}
	};
	function triggerComputed(computed$2) {
		return computed$2.value;
	}
	function preCleanupEffect(effect2) {
		effect2._trackId++;
		effect2._depsLength = 0;
	}
	function postCleanupEffect(effect2) {
		if (effect2.deps.length > effect2._depsLength) {
			for (var i$1 = effect2._depsLength; i$1 < effect2.deps.length; i$1++) cleanupDepEffect(effect2.deps[i$1], effect2);
			effect2.deps.length = effect2._depsLength;
		}
	}
	function cleanupDepEffect(dep, effect2) {
		var trackId = dep.get(effect2);
		if (trackId !== void 0 && effect2._trackId !== trackId) {
			dep.delete(effect2);
			if (dep.size === 0) dep.cleanup();
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
		while (!pauseScheduleStack && queueEffectSchedulers.length) queueEffectSchedulers.shift()();
	}
	function trackEffect(effect2, dep, debuggerEventExtraInfo) {
		if (dep.get(effect2) !== effect2._trackId) {
			dep.set(effect2, effect2._trackId);
			var oldDep = effect2.deps[effect2._depsLength];
			if (oldDep !== dep) {
				if (oldDep) cleanupDepEffect(oldDep, effect2);
				effect2.deps[effect2._depsLength++] = dep;
			} else effect2._depsLength++;
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
					if (effect2.scheduler) queueEffectSchedulers.push(effect2.scheduler);
				}
			}
		}
		resetScheduling();
	}
	var createDep = (cleanup, computed$2) => {
		var dep = /* @__PURE__ */ new Map();
		dep.cleanup = cleanup;
		dep.computed = computed$2;
		return dep;
	};
	var targetMap = /* @__PURE__ */ new WeakMap();
	var ITERATE_KEY = Symbol("");
	var MAP_KEY_ITERATE_KEY = Symbol("");
	function track(target, type, key$1) {
		if (shouldTrack && activeEffect) {
			var depsMap = targetMap.get(target);
			if (!depsMap) targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
			var dep = depsMap.get(key$1);
			if (!dep) depsMap.set(key$1, dep = createDep(() => depsMap.delete(key$1)));
			trackEffect(activeEffect, dep, void 0);
		}
	}
	function trigger(target, type, key$1, newValue, oldValue, oldTarget) {
		var depsMap = targetMap.get(target);
		if (!depsMap) return;
		var deps = [];
		if (type === "clear") deps = [...depsMap.values()];
		else if (key$1 === "length" && isArray(target)) {
			var newLength = Number(newValue);
			depsMap.forEach((dep$1, key2) => {
				if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) deps.push(dep$1);
			});
		} else {
			if (key$1 !== void 0) deps.push(depsMap.get(key$1));
			switch (type) {
				case "add":
					if (!isArray(target)) {
						deps.push(depsMap.get(ITERATE_KEY));
						if (isMap(target)) deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
					} else if (isIntegerKey(key$1)) deps.push(depsMap.get("length"));
					break;
				case "delete":
					if (!isArray(target)) {
						deps.push(depsMap.get(ITERATE_KEY));
						if (isMap(target)) deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
					}
					break;
				case "set":
					if (isMap(target)) deps.push(depsMap.get(ITERATE_KEY));
					break;
			}
		}
		pauseScheduling();
		for (var dep of deps) if (dep) triggerEffects(dep, 4, void 0);
		resetScheduling();
	}
	var isNonTrackableKeys = /* @__PURE__ */ makeMap$1("__proto__,__v_isRef,__isVue");
	var builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key$1) => key$1 !== "arguments" && key$1 !== "caller").map((key$1) => Symbol[key$1]).filter(isSymbol));
	var arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
	function createArrayInstrumentations() {
		var instrumentations = {};
		[
			"includes",
			"indexOf",
			"lastIndexOf"
		].forEach((key$1) => {
			instrumentations[key$1] = function() {
				var arr = toRaw(this);
				for (var i$1 = 0, l = this.length; i$1 < l; i$1++) track(arr, "get", i$1 + "");
				for (var _len2 = arguments.length, args = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) args[_key3] = arguments[_key3];
				var res = arr[key$1](...args);
				if (res === -1 || res === false) return arr[key$1](...args.map(toRaw));
				else return res;
			};
		});
		[
			"push",
			"pop",
			"shift",
			"unshift",
			"splice"
		].forEach((key$1) => {
			instrumentations[key$1] = function() {
				pauseTracking();
				pauseScheduling();
				for (var _len3 = arguments.length, args = new Array(_len3), _key4 = 0; _key4 < _len3; _key4++) args[_key4] = arguments[_key4];
				var res = toRaw(this)[key$1].apply(this, args);
				resetScheduling();
				resetTracking();
				return res;
			};
		});
		return instrumentations;
	}
	function hasOwnProperty(key$1) {
		var obj = toRaw(this);
		track(obj, "has", key$1);
		return obj.hasOwnProperty(key$1);
	}
	var BaseReactiveHandler = class {
		constructor() {
			var _isReadonly = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
			var _isShallow = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
			this._isReadonly = _isReadonly;
			this._isShallow = _isShallow;
		}
		get(target, key$1, receiver) {
			var isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
			if (key$1 === "__v_isReactive") return !isReadonly2;
			else if (key$1 === "__v_isReadonly") return isReadonly2;
			else if (key$1 === "__v_isShallow") return isShallow2;
			else if (key$1 === "__v_raw") {
				if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) return target;
				return;
			}
			var targetIsArray = isArray(target);
			if (!isReadonly2) {
				if (targetIsArray && hasOwn(arrayInstrumentations, key$1)) return Reflect.get(arrayInstrumentations, key$1, receiver);
				if (key$1 === "hasOwnProperty") return hasOwnProperty;
			}
			var res = Reflect.get(target, key$1, receiver);
			if (isSymbol(key$1) ? builtInSymbols.has(key$1) : isNonTrackableKeys(key$1)) return res;
			if (!isReadonly2) track(target, "get", key$1);
			if (isShallow2) return res;
			if (isRef(res)) return targetIsArray && isIntegerKey(key$1) ? res : res.value;
			if (isObject$1(res)) return isReadonly2 ? readonly(res) : reactive(res);
			return res;
		}
	};
	var MutableReactiveHandler = class extends BaseReactiveHandler {
		constructor() {
			var isShallow2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
			super(false, isShallow2);
		}
		set(target, key$1, value, receiver) {
			var oldValue = target[key$1];
			if (!this._isShallow) {
				var isOldValueReadonly = isReadonly(oldValue);
				if (!isShallow(value) && !isReadonly(value)) {
					oldValue = toRaw(oldValue);
					value = toRaw(value);
				}
				if (!isArray(target) && isRef(oldValue) && !isRef(value)) if (isOldValueReadonly) return false;
				else {
					oldValue.value = value;
					return true;
				}
			}
			var hadKey = isArray(target) && isIntegerKey(key$1) ? Number(key$1) < target.length : hasOwn(target, key$1);
			var result = Reflect.set(target, key$1, value, receiver);
			if (target === toRaw(receiver)) {
				if (!hadKey) trigger(target, "add", key$1, value);
				else if (hasChanged(value, oldValue)) trigger(target, "set", key$1, value, oldValue);
			}
			return result;
		}
		deleteProperty(target, key$1) {
			var hadKey = hasOwn(target, key$1);
			var oldValue = target[key$1];
			var result = Reflect.deleteProperty(target, key$1);
			if (result && hadKey) trigger(target, "delete", key$1, void 0, oldValue);
			return result;
		}
		has(target, key$1) {
			var result = Reflect.has(target, key$1);
			if (!isSymbol(key$1) || !builtInSymbols.has(key$1)) track(target, "has", key$1);
			return result;
		}
		ownKeys(target) {
			track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
			return Reflect.ownKeys(target);
		}
	};
	var ReadonlyReactiveHandler = class extends BaseReactiveHandler {
		constructor() {
			var isShallow2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
			super(true, isShallow2);
		}
		set(target, key$1) {
			return true;
		}
		deleteProperty(target, key$1) {
			return true;
		}
	};
	var mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
	var readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
	var shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
	var toShallow = (value) => value;
	var getProto = (v$1) => Reflect.getPrototypeOf(v$1);
	function get(target, key$1) {
		var isReadonly$1 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
		var isShallow$1 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
		target = target["__v_raw"];
		var rawTarget = toRaw(target);
		var rawKey = toRaw(key$1);
		if (!isReadonly$1) {
			if (hasChanged(key$1, rawKey)) track(rawTarget, "get", key$1);
			track(rawTarget, "get", rawKey);
		}
		var { has: has2 } = getProto(rawTarget);
		var wrap = isShallow$1 ? toShallow : isReadonly$1 ? toReadonly : toReactive;
		if (has2.call(rawTarget, key$1)) return wrap(target.get(key$1));
		else if (has2.call(rawTarget, rawKey)) return wrap(target.get(rawKey));
		else if (target !== rawTarget) target.get(key$1);
	}
	function has(key$1) {
		var isReadonly$1 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
		var target = this["__v_raw"];
		var rawTarget = toRaw(target);
		var rawKey = toRaw(key$1);
		if (!isReadonly$1) {
			if (hasChanged(key$1, rawKey)) track(rawTarget, "has", key$1);
			track(rawTarget, "has", rawKey);
		}
		return key$1 === rawKey ? target.has(key$1) : target.has(key$1) || target.has(rawKey);
	}
	function size(target) {
		var isReadonly$1 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
		target = target["__v_raw"];
		!isReadonly$1 && track(toRaw(target), "iterate", ITERATE_KEY);
		return Reflect.get(target, "size", target);
	}
	function add(value) {
		value = toRaw(value);
		var target = toRaw(this);
		if (!getProto(target).has.call(target, value)) {
			target.add(value);
			trigger(target, "add", value, value);
		}
		return this;
	}
	function set(key$1, value) {
		value = toRaw(value);
		var target = toRaw(this);
		var { has: has2, get: get2 } = getProto(target);
		var hadKey = has2.call(target, key$1);
		if (!hadKey) {
			key$1 = toRaw(key$1);
			hadKey = has2.call(target, key$1);
		}
		var oldValue = get2.call(target, key$1);
		target.set(key$1, value);
		if (!hadKey) trigger(target, "add", key$1, value);
		else if (hasChanged(value, oldValue)) trigger(target, "set", key$1, value, oldValue);
		return this;
	}
	function deleteEntry(key$1) {
		var target = toRaw(this);
		var { has: has2, get: get2 } = getProto(target);
		var hadKey = has2.call(target, key$1);
		if (!hadKey) {
			key$1 = toRaw(key$1);
			hadKey = has2.call(target, key$1);
		}
		var oldValue = get2 ? get2.call(target, key$1) : void 0;
		var result = target.delete(key$1);
		if (hadKey) trigger(target, "delete", key$1, void 0, oldValue);
		return result;
	}
	function clear() {
		var target = toRaw(this);
		var hadItems = target.size !== 0;
		var oldTarget = void 0;
		var result = target.clear();
		if (hadItems) trigger(target, "clear", void 0, void 0, oldTarget);
		return result;
	}
	function createForEach(isReadonly$1, isShallow$1) {
		return function forEach(callback, thisArg) {
			var observed = this;
			var target = observed["__v_raw"];
			var rawTarget = toRaw(target);
			var wrap = isShallow$1 ? toShallow : isReadonly$1 ? toReadonly : toReactive;
			!isReadonly$1 && track(rawTarget, "iterate", ITERATE_KEY);
			return target.forEach((value, key$1) => {
				return callback.call(thisArg, wrap(value), wrap(key$1), observed);
			});
		};
	}
	function createIterableMethod(method, isReadonly$1, isShallow$1) {
		return function() {
			var target = this["__v_raw"];
			var rawTarget = toRaw(target);
			var targetIsMap = isMap(rawTarget);
			var isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
			var isKeyOnly = method === "keys" && targetIsMap;
			var innerIterator = target[method](...arguments);
			var wrap = isShallow$1 ? toShallow : isReadonly$1 ? toReadonly : toReactive;
			!isReadonly$1 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
			return {
				next() {
					var { value, done } = innerIterator.next();
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
		return function() {
			return type === "delete" ? false : type === "clear" ? void 0 : this;
		};
	}
	function createInstrumentations() {
		var mutableInstrumentations2 = {
			get(key$1) {
				return get(this, key$1);
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
			get(key$1) {
				return get(this, key$1, false, true);
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
			get(key$1) {
				return get(this, key$1, true);
			},
			get size() {
				return size(this, true);
			},
			has(key$1) {
				return has.call(this, key$1, true);
			},
			add: createReadonlyMethod("add"),
			set: createReadonlyMethod("set"),
			delete: createReadonlyMethod("delete"),
			clear: createReadonlyMethod("clear"),
			forEach: createForEach(true, false)
		};
		var shallowReadonlyInstrumentations2 = {
			get(key$1) {
				return get(this, key$1, true, true);
			},
			get size() {
				return size(this, true);
			},
			has(key$1) {
				return has.call(this, key$1, true);
			},
			add: createReadonlyMethod("add"),
			set: createReadonlyMethod("set"),
			delete: createReadonlyMethod("delete"),
			clear: createReadonlyMethod("clear"),
			forEach: createForEach(true, true)
		};
		[
			"keys",
			"values",
			"entries",
			Symbol.iterator
		].forEach((method) => {
			mutableInstrumentations2[method] = createIterableMethod(method, false, false);
			readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
			shallowInstrumentations2[method] = createIterableMethod(method, false, true);
			shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
		});
		return [
			mutableInstrumentations2,
			readonlyInstrumentations2,
			shallowInstrumentations2,
			shallowReadonlyInstrumentations2
		];
	}
	var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
	function createInstrumentationGetter(isReadonly$1, shallow) {
		var instrumentations = shallow ? isReadonly$1 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly$1 ? readonlyInstrumentations : mutableInstrumentations;
		return (target, key$1, receiver) => {
			if (key$1 === "__v_isReactive") return !isReadonly$1;
			else if (key$1 === "__v_isReadonly") return isReadonly$1;
			else if (key$1 === "__v_raw") return target;
			return Reflect.get(hasOwn(instrumentations, key$1) && key$1 in target ? instrumentations : target, key$1, receiver);
		};
	}
	var mutableCollectionHandlers = { get: /* @__PURE__ */ createInstrumentationGetter(false, false) };
	var shallowCollectionHandlers = { get: /* @__PURE__ */ createInstrumentationGetter(false, true) };
	var readonlyCollectionHandlers = { get: /* @__PURE__ */ createInstrumentationGetter(true, false) };
	var reactiveMap = /* @__PURE__ */ new WeakMap();
	var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
	var readonlyMap = /* @__PURE__ */ new WeakMap();
	var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
	function targetTypeMap(rawType) {
		switch (rawType) {
			case "Object":
			case "Array": return 1;
			case "Map":
			case "Set":
			case "WeakMap":
			case "WeakSet": return 2;
			default: return 0;
		}
	}
	function getTargetType(value) {
		return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
	}
	function reactive(target) {
		if (isReadonly(target)) return target;
		return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
	}
	function shallowReactive(target) {
		return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
	}
	function readonly(target) {
		return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
	}
	function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
		if (!isObject$1(target)) return target;
		if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) return target;
		var existingProxy = proxyMap.get(target);
		if (existingProxy) return existingProxy;
		var targetType = getTargetType(target);
		if (targetType === 0) return target;
		var proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
		proxyMap.set(target, proxy);
		return proxy;
	}
	function isReactive(value) {
		if (isReadonly(value)) return isReactive(value["__v_raw"]);
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
		if (Object.isExtensible(value)) def(value, "__v_skip", true);
		return value;
	}
	var toReactive = (value) => isObject$1(value) ? reactive(value) : value;
	var toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
	var ComputedRefImpl = class {
		constructor(getter, _setter, isReadonly$1, isSSR) {
			this.getter = getter;
			this._setter = _setter;
			this.dep = void 0;
			this.__v_isRef = true;
			this["__v_isReadonly"] = false;
			this.effect = new ReactiveEffect(() => getter(this._value), () => triggerRefValue(this, this.effect._dirtyLevel === 2 ? 2 : 3));
			this.effect.computed = this;
			this.effect.active = this._cacheable = !isSSR;
			this["__v_isReadonly"] = isReadonly$1;
		}
		get value() {
			var self$1 = toRaw(this);
			if ((!self$1._cacheable || self$1.effect.dirty) && hasChanged(self$1._value, self$1._value = self$1.effect.run())) triggerRefValue(self$1, 4);
			trackRefValue(self$1);
			if (self$1.effect._dirtyLevel >= 2) triggerRefValue(self$1, 2);
			return self$1._value;
		}
		set value(newValue) {
			this._setter(newValue);
		}
		get _dirty() {
			return this.effect.dirty;
		}
		set _dirty(v$1) {
			this.effect.dirty = v$1;
		}
	};
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
		return new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
	}
	function trackRefValue(ref2) {
		var _a;
		if (shouldTrack && activeEffect) {
			ref2 = toRaw(ref2);
			trackEffect(activeEffect, (_a = ref2.dep) != null ? _a : ref2.dep = createDep(() => ref2.dep = void 0, ref2 instanceof ComputedRefImpl ? ref2 : void 0), void 0);
		}
	}
	function triggerRefValue(ref2) {
		var dirtyLevel = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 4;
		arguments.length > 2 && arguments[2];
		ref2 = toRaw(ref2);
		var dep = ref2.dep;
		if (dep) triggerEffects(dep, dirtyLevel, void 0);
	}
	function isRef(r) {
		return !!(r && r.__v_isRef === true);
	}
	function ref(value) {
		return createRef(value, false);
	}
	function shallowRef(value) {
		return createRef(value, true);
	}
	function createRef(rawValue, shallow) {
		if (isRef(rawValue)) return rawValue;
		return new RefImpl(rawValue, shallow);
	}
	var RefImpl = class {
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
	};
	function unref(ref2) {
		return isRef(ref2) ? ref2.value : ref2;
	}
	var shallowUnwrapHandlers = {
		get: (target, key$1, receiver) => unref(Reflect.get(target, key$1, receiver)),
		set: (target, key$1, value, receiver) => {
			var oldValue = target[key$1];
			if (isRef(oldValue) && !isRef(value)) {
				oldValue.value = value;
				return true;
			} else return Reflect.set(target, key$1, value, receiver);
		}
	};
	function proxyRefs(objectWithRefs) {
		return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
	}
	function callWithErrorHandling(fn, instance, type, args) {
		try {
			return args ? fn(...args) : fn();
		} catch (err$1) {
			handleError(err$1, instance, type);
		}
	}
	function callWithAsyncErrorHandling(fn, instance, type, args) {
		if (isFunction(fn)) {
			var res = callWithErrorHandling(fn, instance, type, args);
			if (res && isPromise(res)) res.catch((err$1) => {
				handleError(err$1, instance, type);
			});
			return res;
		}
		var values = [];
		for (var i$1 = 0; i$1 < fn.length; i$1++) values.push(callWithAsyncErrorHandling(fn[i$1], instance, type, args));
		return values;
	}
	function handleError(err$1, instance, type) {
		var throwInDev = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
		var contextVNode = instance ? instance.vnode : null;
		if (instance) {
			var cur = instance.parent;
			var exposedInstance = instance.proxy;
			var errorInfo = "https://vuejs.org/error-reference/#runtime-".concat(type);
			while (cur) {
				var errorCapturedHooks = cur.ec;
				if (errorCapturedHooks) {
					for (var i$1 = 0; i$1 < errorCapturedHooks.length; i$1++) if (errorCapturedHooks[i$1](err$1, exposedInstance, errorInfo) === false) return;
				}
				cur = cur.parent;
			}
			var appErrorHandler = instance.appContext.config.errorHandler;
			if (appErrorHandler) {
				callWithErrorHandling(appErrorHandler, null, 10, [
					err$1,
					exposedInstance,
					errorInfo
				]);
				return;
			}
		}
		logError(err$1, type, contextVNode, throwInDev);
	}
	function logError(err$1, type, contextVNode) {
		arguments.length > 3 && arguments[3] !== void 0 && arguments[3];
		if (err$1 instanceof Error) console.error(err$1.message + "\n" + err$1.stack);
		else console.error(err$1);
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
		var p$2 = currentFlushPromise || resolvedPromise;
		return fn ? p$2.then(this ? fn.bind(this) : fn) : p$2;
	}
	function findInsertionIndex(id$1) {
		var start = flushIndex + 1;
		var end = queue.length;
		while (start < end) {
			var middle = start + end >>> 1;
			var middleJob = queue[middle];
			var middleJobId = getId(middleJob);
			if (middleJobId < id$1 || middleJobId === id$1 && middleJob.pre) start = middle + 1;
			else end = middle;
		}
		return start;
	}
	function queueJob(job) {
		if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
			if (job.id == null) queue.push(job);
			else queue.splice(findInsertionIndex(job.id), 0, job);
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
		var i$1 = queue.indexOf(job);
		if (i$1 > flushIndex) queue.splice(i$1, 1);
	}
	function queuePostFlushCb(cb) {
		if (!isArray(cb)) {
			if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) pendingPostFlushCbs.push(cb);
		} else pendingPostFlushCbs.push(...cb);
		queueFlush();
	}
	function flushPreFlushCbs(instance, seen) {
		var i$1 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : isFlushing ? flushIndex + 1 : 0;
		for (; i$1 < queue.length; i$1++) {
			var cb = queue[i$1];
			if (cb && cb.pre) {
				if (instance && cb.id !== instance.uid) continue;
				queue.splice(i$1, 1);
				i$1--;
				cb();
			}
		}
	}
	function flushPostFlushCbs(seen) {
		if (pendingPostFlushCbs.length) {
			var deduped = [...new Set(pendingPostFlushCbs)].sort((a$1, b) => getId(a$1) - getId(b));
			pendingPostFlushCbs.length = 0;
			if (activePostFlushCbs) {
				activePostFlushCbs.push(...deduped);
				return;
			}
			activePostFlushCbs = deduped;
			for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) activePostFlushCbs[postFlushIndex]();
			activePostFlushCbs = null;
			postFlushIndex = 0;
		}
	}
	var getId = (job) => job.id == null ? Infinity : job.id;
	var comparator = (a$1, b) => {
		var diff = getId(a$1) - getId(b);
		if (diff === 0) {
			if (a$1.pre && !b.pre) return -1;
			if (b.pre && !a$1.pre) return 1;
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
				if (job && job.active !== false) callWithErrorHandling(job, null, 14);
			}
		} finally {
			flushIndex = 0;
			queue.length = 0;
			flushPostFlushCbs(seen);
			isFlushing = false;
			currentFlushPromise = null;
			if (queue.length || pendingPostFlushCbs.length) flushJobs(seen);
		}
	}
	function emit$2(instance, event) {
		if (instance.isUnmounted) return;
		var props$30 = instance.vnode.props || EMPTY_OBJ;
		for (var _len6 = arguments.length, rawArgs = new Array(_len6 > 2 ? _len6 - 2 : 0), _key7 = 2; _key7 < _len6; _key7++) rawArgs[_key7 - 2] = arguments[_key7];
		var args = rawArgs;
		var isModelListener$1 = event.startsWith("update:");
		var modelArg = isModelListener$1 && event.slice(7);
		if (modelArg && modelArg in props$30) {
			var { number, trim } = props$30["".concat(modelArg === "modelValue" ? "model" : modelArg, "Modifiers")] || EMPTY_OBJ;
			if (trim) args = rawArgs.map((a$1) => isString(a$1) ? a$1.trim() : a$1);
			if (number) args = rawArgs.map(looseToNumber);
		}
		var handlerName;
		var handler = props$30[handlerName = toHandlerKey(event)] || props$30[handlerName = toHandlerKey(camelize(event))];
		if (!handler && isModelListener$1) handler = props$30[handlerName = toHandlerKey(hyphenate(event))];
		if (handler) callWithAsyncErrorHandling(handler, instance, 6, args);
		var onceHandler = props$30[handlerName + "Once"];
		if (onceHandler) {
			if (!instance.emitted) instance.emitted = {};
			else if (instance.emitted[handlerName]) return;
			instance.emitted[handlerName] = true;
			callWithAsyncErrorHandling(onceHandler, instance, 6, args);
		}
	}
	function normalizeEmitsOptions(comp, appContext) {
		var asMixin = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
		var cache$1 = appContext.emitsCache;
		var cached = cache$1.get(comp);
		if (cached !== void 0) return cached;
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
			if (!asMixin && appContext.mixins.length) appContext.mixins.forEach(extendEmits);
			if (comp.extends) extendEmits(comp.extends);
			if (comp.mixins) comp.mixins.forEach(extendEmits);
		}
		if (!raw && !hasExtends) {
			if (isObject$1(comp)) cache$1.set(comp, null);
			return null;
		}
		if (isArray(raw)) raw.forEach((key$1) => normalized[key$1] = null);
		else extend(normalized, raw);
		if (isObject$1(comp)) cache$1.set(comp, normalized);
		return normalized;
	}
	function isEmitListener(options, key$1) {
		if (!options || !isOn(key$1)) return false;
		key$1 = key$1.slice(2).replace(/Once$/, "");
		return hasOwn(options, key$1[0].toLowerCase() + key$1.slice(1)) || hasOwn(options, hyphenate(key$1)) || hasOwn(options, key$1);
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
		var ctx$1 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : currentRenderingInstance;
		arguments.length > 2 && arguments[2];
		if (!ctx$1) return fn;
		if (fn._n) return fn;
		var renderFnWithContext = function() {
			if (renderFnWithContext._d) setBlockTracking(-1);
			var prevInstance = setCurrentRenderingInstance(ctx$1);
			var res;
			try {
				res = fn(...arguments);
			} finally {
				setCurrentRenderingInstance(prevInstance);
				if (renderFnWithContext._d) setBlockTracking(1);
			}
			return res;
		};
		renderFnWithContext._n = true;
		renderFnWithContext._c = true;
		renderFnWithContext._d = true;
		return renderFnWithContext;
	}
	function renderComponentRoot(instance) {
		var { type: Component, vnode, proxy, withProxy, props: props$30, propsOptions: [propsOptions], slots, attrs: attrs$1, emit: emit$3, render, renderCache, data, setupState, ctx: ctx$1, inheritAttrs } = instance;
		var result;
		var fallthroughAttrs;
		var prev = setCurrentRenderingInstance(instance);
		try {
			if (vnode.shapeFlag & 4) {
				var proxyToUse = withProxy || proxy;
				var thisProxy = proxyToUse;
				result = normalizeVNode(render.call(thisProxy, proxyToUse, renderCache, props$30, setupState, data, ctx$1));
				fallthroughAttrs = attrs$1;
			} else {
				var render2 = Component;
				result = normalizeVNode(render2.length > 1 ? render2(props$30, {
					attrs: attrs$1,
					slots,
					emit: emit$3
				}) : render2(props$30, null));
				fallthroughAttrs = Component.props ? attrs$1 : getFunctionalFallthrough(attrs$1);
			}
		} catch (err$1) {
			blockStack.length = 0;
			handleError(err$1, instance, 1);
			result = createVNode(Comment);
		}
		var root = result;
		if (fallthroughAttrs && inheritAttrs !== false) {
			var keys = Object.keys(fallthroughAttrs);
			var { shapeFlag } = root;
			if (keys.length) {
				if (shapeFlag & 7) {
					if (propsOptions && keys.some(isModelListener)) fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
					root = cloneVNode(root, fallthroughAttrs);
				}
			}
		}
		if (vnode.dirs) {
			root = cloneVNode(root);
			root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
		}
		if (vnode.transition) root.transition = vnode.transition;
		result = root;
		setCurrentRenderingInstance(prev);
		return result;
	}
	var getFunctionalFallthrough = (attrs$1) => {
		var res;
		for (var key$1 in attrs$1) if (key$1 === "class" || key$1 === "style" || isOn(key$1)) (res || (res = {}))[key$1] = attrs$1[key$1];
		return res;
	};
	var filterModelListeners = (attrs$1, props$30) => {
		var res = {};
		for (var key$1 in attrs$1) if (!isModelListener(key$1) || !(key$1.slice(9) in props$30)) res[key$1] = attrs$1[key$1];
		return res;
	};
	function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
		var { props: prevProps, children: prevChildren, component } = prevVNode;
		var { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
		var emits = component.emitsOptions;
		if (nextVNode.dirs || nextVNode.transition) return true;
		if (optimized && patchFlag >= 0) {
			if (patchFlag & 1024) return true;
			if (patchFlag & 16) {
				if (!prevProps) return !!nextProps;
				return hasPropsChanged(prevProps, nextProps, emits);
			} else if (patchFlag & 8) {
				var dynamicProps = nextVNode.dynamicProps;
				for (var i$1 = 0; i$1 < dynamicProps.length; i$1++) {
					var key$1 = dynamicProps[i$1];
					if (nextProps[key$1] !== prevProps[key$1] && !isEmitListener(emits, key$1)) return true;
				}
			}
		} else {
			if (prevChildren || nextChildren) {
				if (!nextChildren || !nextChildren.$stable) return true;
			}
			if (prevProps === nextProps) return false;
			if (!prevProps) return !!nextProps;
			if (!nextProps) return true;
			return hasPropsChanged(prevProps, nextProps, emits);
		}
		return false;
	}
	function hasPropsChanged(prevProps, nextProps, emitsOptions) {
		var nextKeys = Object.keys(nextProps);
		if (nextKeys.length !== Object.keys(prevProps).length) return true;
		for (var i$1 = 0; i$1 < nextKeys.length; i$1++) {
			var key$1 = nextKeys[i$1];
			if (nextProps[key$1] !== prevProps[key$1] && !isEmitListener(emitsOptions, key$1)) return true;
		}
		return false;
	}
	function updateHOCHostEl(_ref4, el) {
		var { vnode, parent } = _ref4;
		while (parent) {
			var root = parent.subTree;
			if (root.suspense && root.suspense.activeBranch === vnode) root.el = vnode.el;
			if (root === vnode) {
				(vnode = parent.vnode).el = el;
				parent = parent.parent;
			} else break;
		}
	}
	var NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
	var isSuspense = (type) => type.__isSuspense;
	function queueEffectWithSuspense(fn, suspense) {
		if (suspense && suspense.pendingBranch) if (isArray(fn)) suspense.effects.push(...fn);
		else suspense.effects.push(fn);
		else queuePostFlushCb(fn);
	}
	var ssrContextKey = Symbol.for("v-scx");
	var useSSRContext = () => {
		var ctx$1 = inject(ssrContextKey);
		if (!ctx$1) {}
		return ctx$1;
	};
	function watchEffect(effect, options) {
		return doWatch(effect, null, options);
	}
	var INITIAL_WATCHER_VALUE = {};
	function watch(source, cb, options) {
		return doWatch(source, cb, options);
	}
	function doWatch(source, cb) {
		var { immediate, deep, flush, once: once$1, onTrack, onTrigger } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : EMPTY_OBJ;
		if (cb && once$1) {
			var _cb = cb;
			cb = function() {
				_cb(...arguments);
				unwatch();
			};
		}
		var instance = currentInstance;
		var reactiveGetter = (source2) => deep === true ? source2 : traverse(source2, deep === false ? 1 : void 0);
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
				if (isRef(s)) return s.value;
				else if (isReactive(s)) return reactiveGetter(s);
				else if (isFunction(s)) return callWithErrorHandling(s, instance, 2);
			});
		} else if (isFunction(source)) if (cb) getter = () => callWithErrorHandling(source, instance, 2);
		else getter = () => {
			if (cleanup) cleanup();
			return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
		};
		else getter = NOOP;
		if (cb && deep) {
			var baseGetter = getter;
			getter = () => traverse(baseGetter());
		}
		var cleanup;
		var onCleanup = (fn) => {
			cleanup = effect.onStop = () => {
				callWithErrorHandling(fn, instance, 4);
				cleanup = effect.onStop = void 0;
			};
		};
		var ssrCleanup;
		if (isInSSRComponentSetup) {
			onCleanup = NOOP;
			if (!cb) getter();
			else if (immediate) callWithAsyncErrorHandling(cb, instance, 3, [
				getter(),
				isMultiSource ? [] : void 0,
				onCleanup
			]);
			if (flush === "sync") {
				var ctx$1 = useSSRContext();
				ssrCleanup = ctx$1.__watcherHandles || (ctx$1.__watcherHandles = []);
			} else return NOOP;
		}
		var oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
		var job = () => {
			if (!effect.active || !effect.dirty) return;
			if (cb) {
				var newValue = effect.run();
				if (deep || forceTrigger || (isMultiSource ? newValue.some((v$1, i$1) => hasChanged(v$1, oldValue[i$1])) : hasChanged(newValue, oldValue)) || false) {
					if (cleanup) cleanup();
					callWithAsyncErrorHandling(cb, instance, 3, [
						newValue,
						oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
						onCleanup
					]);
					oldValue = newValue;
				}
			} else effect.run();
		};
		job.allowRecurse = !!cb;
		var scheduler;
		if (flush === "sync") scheduler = job;
		else if (flush === "post") scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
		else {
			job.pre = true;
			if (instance) job.id = instance.uid;
			scheduler = () => queueJob(job);
		}
		var effect = new ReactiveEffect(getter, NOOP, scheduler);
		var scope = getCurrentScope();
		var unwatch = () => {
			effect.stop();
			if (scope) remove(scope.effects, effect);
		};
		if (cb) if (immediate) job();
		else oldValue = effect.run();
		else if (flush === "post") queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
		else effect.run();
		if (ssrCleanup) ssrCleanup.push(unwatch);
		return unwatch;
	}
	function instanceWatch(source, value, options) {
		var publicThis = this.proxy;
		var getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
		var cb;
		if (isFunction(value)) cb = value;
		else {
			cb = value.handler;
			options = value;
		}
		var reset = setCurrentInstance(this);
		var res = doWatch(getter, cb.bind(publicThis), options);
		reset();
		return res;
	}
	function createPathGetter(ctx$1, path) {
		var segments = path.split(".");
		return () => {
			var cur = ctx$1;
			for (var i$1 = 0; i$1 < segments.length && cur; i$1++) cur = cur[segments[i$1]];
			return cur;
		};
	}
	function traverse(value, depth) {
		var currentDepth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
		var seen = arguments.length > 3 ? arguments[3] : void 0;
		if (!isObject$1(value) || value["__v_skip"]) return value;
		if (depth && depth > 0) {
			if (currentDepth >= depth) return value;
			currentDepth++;
		}
		seen = seen || /* @__PURE__ */ new Set();
		if (seen.has(value)) return value;
		seen.add(value);
		if (isRef(value)) traverse(value.value, depth, currentDepth, seen);
		else if (isArray(value)) for (var i$1 = 0; i$1 < value.length; i$1++) traverse(value[i$1], depth, currentDepth, seen);
		else if (isSet(value) || isMap(value)) value.forEach((v$1) => {
			traverse(v$1, depth, currentDepth, seen);
		});
		else if (isPlainObject(value)) for (var key$1 in value) traverse(value[key$1], depth, currentDepth, seen);
		return value;
	}
	function withDirectives(vnode, directives) {
		if (currentRenderingInstance === null) return vnode;
		var instance = getExposeProxy(currentRenderingInstance) || currentRenderingInstance.proxy;
		var bindings = vnode.dirs || (vnode.dirs = []);
		for (var i$1 = 0; i$1 < directives.length; i$1++) {
			var [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i$1];
			if (dir) {
				if (isFunction(dir)) dir = {
					mounted: dir,
					updated: dir
				};
				if (dir.deep) traverse(value);
				bindings.push({
					dir,
					instance,
					value,
					oldValue: void 0,
					arg,
					modifiers
				});
			}
		}
		return vnode;
	}
	function invokeDirectiveHook(vnode, prevVNode, instance, name) {
		var bindings = vnode.dirs;
		var oldBindings = prevVNode && prevVNode.dirs;
		for (var i$1 = 0; i$1 < bindings.length; i$1++) {
			var binding = bindings[i$1];
			if (oldBindings) binding.oldValue = oldBindings[i$1].value;
			var hook = binding.dir[name];
			if (hook) {
				pauseTracking();
				callWithAsyncErrorHandling(hook, instance, 8, [
					vnode.el,
					binding,
					vnode,
					prevVNode
				]);
				resetTracking();
			}
		}
	}
	var leaveCbKey = Symbol("_leaveCb");
	var enterCbKey$1 = Symbol("_enterCb");
	function useTransitionState() {
		var state = {
			isMounted: false,
			isLeaving: false,
			isUnmounting: false,
			leavingVNodes: /* @__PURE__ */ new Map()
		};
		onMounted(() => {
			state.isMounted = true;
		});
		onBeforeUnmount(() => {
			state.isUnmounting = true;
		});
		return state;
	}
	var TransitionHookValidator = [Function, Array];
	var BaseTransitionPropsValidators = {
		mode: String,
		appear: Boolean,
		persisted: Boolean,
		onBeforeEnter: TransitionHookValidator,
		onEnter: TransitionHookValidator,
		onAfterEnter: TransitionHookValidator,
		onEnterCancelled: TransitionHookValidator,
		onBeforeLeave: TransitionHookValidator,
		onLeave: TransitionHookValidator,
		onAfterLeave: TransitionHookValidator,
		onLeaveCancelled: TransitionHookValidator,
		onBeforeAppear: TransitionHookValidator,
		onAppear: TransitionHookValidator,
		onAfterAppear: TransitionHookValidator,
		onAppearCancelled: TransitionHookValidator
	};
	var BaseTransition = {
		name: "BaseTransition",
		props: BaseTransitionPropsValidators,
		setup(props$30, _ref6) {
			var { slots } = _ref6;
			var instance = getCurrentInstance();
			var state = useTransitionState();
			return () => {
				var children = slots.default && getTransitionRawChildren(slots.default(), true);
				if (!children || !children.length) return;
				var child = children[0];
				if (children.length > 1) {
					for (var c$1 of children) if (c$1.type !== Comment) {
						child = c$1;
						break;
					}
				}
				var rawProps = toRaw(props$30);
				var { mode: mode$1 } = rawProps;
				if (state.isLeaving) return emptyPlaceholder(child);
				var innerChild = getKeepAliveChild(child);
				if (!innerChild) return emptyPlaceholder(child);
				var enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
				setTransitionHooks(innerChild, enterHooks);
				var oldChild = instance.subTree;
				var oldInnerChild = oldChild && getKeepAliveChild(oldChild);
				if (oldInnerChild && oldInnerChild.type !== Comment && !isSameVNodeType(innerChild, oldInnerChild)) {
					var leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
					setTransitionHooks(oldInnerChild, leavingHooks);
					if (mode$1 === "out-in") {
						state.isLeaving = true;
						leavingHooks.afterLeave = () => {
							state.isLeaving = false;
							if (instance.update.active !== false) {
								instance.effect.dirty = true;
								instance.update();
							}
						};
						return emptyPlaceholder(child);
					} else if (mode$1 === "in-out" && innerChild.type !== Comment) leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
						var leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
						leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
						el[leaveCbKey] = () => {
							earlyRemove();
							el[leaveCbKey] = void 0;
							delete enterHooks.delayedLeave;
						};
						enterHooks.delayedLeave = delayedLeave;
					};
				}
				return child;
			};
		}
	};
	function getLeavingNodesForType(state, vnode) {
		var { leavingVNodes } = state;
		var leavingVNodesCache = leavingVNodes.get(vnode.type);
		if (!leavingVNodesCache) {
			leavingVNodesCache = /* @__PURE__ */ Object.create(null);
			leavingVNodes.set(vnode.type, leavingVNodesCache);
		}
		return leavingVNodesCache;
	}
	function resolveTransitionHooks(vnode, props$30, state, instance) {
		var { appear, mode: mode$1, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props$30;
		var key$1 = String(vnode.key);
		var leavingVNodesCache = getLeavingNodesForType(state, vnode);
		var callHook$2 = (hook, args) => {
			hook && callWithAsyncErrorHandling(hook, instance, 9, args);
		};
		var callAsyncHook = (hook, args) => {
			var done = args[1];
			callHook$2(hook, args);
			if (isArray(hook)) {
				if (hook.every((hook2) => hook2.length <= 1)) done();
			} else if (hook.length <= 1) done();
		};
		var hooks = {
			mode: mode$1,
			persisted,
			beforeEnter(el) {
				var hook = onBeforeEnter;
				if (!state.isMounted) if (appear) hook = onBeforeAppear || onBeforeEnter;
				else return;
				if (el[leaveCbKey]) el[leaveCbKey](true);
				var leavingVNode = leavingVNodesCache[key$1];
				if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) leavingVNode.el[leaveCbKey]();
				callHook$2(hook, [el]);
			},
			enter(el) {
				var hook = onEnter;
				var afterHook = onAfterEnter;
				var cancelHook = onEnterCancelled;
				if (!state.isMounted) if (appear) {
					hook = onAppear || onEnter;
					afterHook = onAfterAppear || onAfterEnter;
					cancelHook = onAppearCancelled || onEnterCancelled;
				} else return;
				var called = false;
				var done = el[enterCbKey$1] = (cancelled) => {
					if (called) return;
					called = true;
					if (cancelled) callHook$2(cancelHook, [el]);
					else callHook$2(afterHook, [el]);
					if (hooks.delayedLeave) hooks.delayedLeave();
					el[enterCbKey$1] = void 0;
				};
				if (hook) callAsyncHook(hook, [el, done]);
				else done();
			},
			leave(el, remove$1) {
				var key2 = String(vnode.key);
				if (el[enterCbKey$1]) el[enterCbKey$1](true);
				if (state.isUnmounting) return remove$1();
				callHook$2(onBeforeLeave, [el]);
				var called = false;
				var done = el[leaveCbKey] = (cancelled) => {
					if (called) return;
					called = true;
					remove$1();
					if (cancelled) callHook$2(onLeaveCancelled, [el]);
					else callHook$2(onAfterLeave, [el]);
					el[leaveCbKey] = void 0;
					if (leavingVNodesCache[key2] === vnode) delete leavingVNodesCache[key2];
				};
				leavingVNodesCache[key2] = vnode;
				if (onLeave) callAsyncHook(onLeave, [el, done]);
				else done();
			},
			clone(vnode2) {
				return resolveTransitionHooks(vnode2, props$30, state, instance);
			}
		};
		return hooks;
	}
	function emptyPlaceholder(vnode) {
		if (isKeepAlive(vnode)) {
			vnode = cloneVNode(vnode);
			vnode.children = null;
			return vnode;
		}
	}
	function getKeepAliveChild(vnode) {
		return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
	}
	function setTransitionHooks(vnode, hooks) {
		if (vnode.shapeFlag & 6 && vnode.component) setTransitionHooks(vnode.component.subTree, hooks);
		else if (vnode.shapeFlag & 128) {
			vnode.ssContent.transition = hooks.clone(vnode.ssContent);
			vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
		} else vnode.transition = hooks;
	}
	function getTransitionRawChildren(children) {
		var keepComment = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
		var parentKey = arguments.length > 2 ? arguments[2] : void 0;
		var ret = [];
		var keyedFragmentCount = 0;
		for (var i$1 = 0; i$1 < children.length; i$1++) {
			var child = children[i$1];
			var key$1 = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i$1);
			if (child.type === Fragment) {
				if (child.patchFlag & 128) keyedFragmentCount++;
				ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key$1));
			} else if (keepComment || child.type !== Comment) ret.push(key$1 != null ? cloneVNode(child, { key: key$1 }) : child);
		}
		if (keyedFragmentCount > 1) for (var _i = 0; _i < ret.length; _i++) ret[_i].patchFlag = -2;
		return ret;
	}
	/* @__NO_SIDE_EFFECTS__ */
	function defineComponent(options, extraOptions) {
		return isFunction(options) ? /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))() : options;
	}
	var isAsyncWrapper = (i$1) => !!i$1.type.__asyncLoader;
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
			var current$1 = target;
			while (current$1) {
				if (current$1.isDeactivated) return;
				current$1 = current$1.parent;
			}
			return hook();
		});
		injectHook(type, wrappedHook, target);
		if (target) {
			var current = target.parent;
			while (current && current.parent) {
				if (isKeepAlive(current.parent.vnode)) injectToKeepAliveRoot(wrappedHook, type, target, current);
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
	function injectHook(type, hook) {
		var target = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : currentInstance;
		var prepend = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
		if (target) {
			var hooks = target[type] || (target[type] = []);
			var wrappedHook = hook.__weh || (hook.__weh = function() {
				if (target.isUnmounted) return;
				pauseTracking();
				var reset = setCurrentInstance(target);
				for (var _len7 = arguments.length, args = new Array(_len7), _key8 = 0; _key8 < _len7; _key8++) args[_key8] = arguments[_key8];
				var res = callWithAsyncErrorHandling(hook, target, type, args);
				reset();
				resetTracking();
				return res;
			});
			if (prepend) hooks.unshift(wrappedHook);
			else hooks.push(wrappedHook);
			return wrappedHook;
		}
	}
	var createHook = (lifecycle) => function(hook) {
		var target = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : currentInstance;
		return (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, function() {
			return hook(...arguments);
		}, target);
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
		injectHook("ec", hook, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : currentInstance);
	}
	var getPublicInstance = (i$1) => {
		if (!i$1) return null;
		if (isStatefulComponent(i$1)) return getExposeProxy(i$1) || i$1.proxy;
		return getPublicInstance(i$1.parent);
	};
	var publicPropertiesMap = /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
		$: (i$1) => i$1,
		$el: (i$1) => i$1.vnode.el,
		$data: (i$1) => i$1.data,
		$props: (i$1) => i$1.props,
		$attrs: (i$1) => i$1.attrs,
		$slots: (i$1) => i$1.slots,
		$refs: (i$1) => i$1.refs,
		$parent: (i$1) => getPublicInstance(i$1.parent),
		$root: (i$1) => getPublicInstance(i$1.root),
		$emit: (i$1) => i$1.emit,
		$options: (i$1) => resolveMergedOptions(i$1),
		$forceUpdate: (i$1) => i$1.f || (i$1.f = () => {
			i$1.effect.dirty = true;
			queueJob(i$1.update);
		}),
		$nextTick: (i$1) => i$1.n || (i$1.n = nextTick.bind(i$1.proxy)),
		$watch: (i$1) => instanceWatch.bind(i$1)
	});
	var hasSetupBinding = (state, key$1) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key$1);
	var PublicInstanceProxyHandlers = {
		get(_ref9, key$1) {
			var { _: instance } = _ref9;
			var { ctx: ctx$1, setupState, data, props: props$30, accessCache, type, appContext } = instance;
			var normalizedProps;
			if (key$1[0] !== "$") {
				var n = accessCache[key$1];
				if (n !== void 0) switch (n) {
					case 1: return setupState[key$1];
					case 2: return data[key$1];
					case 4: return ctx$1[key$1];
					case 3: return props$30[key$1];
				}
				else if (hasSetupBinding(setupState, key$1)) {
					accessCache[key$1] = 1;
					return setupState[key$1];
				} else if (data !== EMPTY_OBJ && hasOwn(data, key$1)) {
					accessCache[key$1] = 2;
					return data[key$1];
				} else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key$1)) {
					accessCache[key$1] = 3;
					return props$30[key$1];
				} else if (ctx$1 !== EMPTY_OBJ && hasOwn(ctx$1, key$1)) {
					accessCache[key$1] = 4;
					return ctx$1[key$1];
				} else if (shouldCacheAccess) accessCache[key$1] = 0;
			}
			var publicGetter = publicPropertiesMap[key$1];
			var cssModule, globalProperties;
			if (publicGetter) {
				if (key$1 === "$attrs") track(instance, "get", key$1);
				return publicGetter(instance);
			} else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key$1])) return cssModule;
			else if (ctx$1 !== EMPTY_OBJ && hasOwn(ctx$1, key$1)) {
				accessCache[key$1] = 4;
				return ctx$1[key$1];
			} else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key$1)) return globalProperties[key$1];
		},
		set(_ref10, key$1, value) {
			var { _: instance } = _ref10;
			var { data, setupState, ctx: ctx$1 } = instance;
			if (hasSetupBinding(setupState, key$1)) {
				setupState[key$1] = value;
				return true;
			} else if (data !== EMPTY_OBJ && hasOwn(data, key$1)) {
				data[key$1] = value;
				return true;
			} else if (hasOwn(instance.props, key$1)) return false;
			if (key$1[0] === "$" && key$1.slice(1) in instance) return false;
			else ctx$1[key$1] = value;
			return true;
		},
		has(_ref11, key$1) {
			var { _: { data, setupState, accessCache, ctx: ctx$1, appContext, propsOptions } } = _ref11;
			var normalizedProps;
			return !!accessCache[key$1] || data !== EMPTY_OBJ && hasOwn(data, key$1) || hasSetupBinding(setupState, key$1) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key$1) || hasOwn(ctx$1, key$1) || hasOwn(publicPropertiesMap, key$1) || hasOwn(appContext.config.globalProperties, key$1);
		},
		defineProperty(target, key$1, descriptor$1) {
			if (descriptor$1.get != null) target._.accessCache[key$1] = 0;
			else if (hasOwn(descriptor$1, "value")) this.set(target, key$1, descriptor$1.value, null);
			return Reflect.defineProperty(target, key$1, descriptor$1);
		}
	};
	function normalizePropsOrEmits(props$30) {
		return isArray(props$30) ? props$30.reduce((normalized, p$2) => (normalized[p$2] = null, normalized), {}) : props$30;
	}
	var shouldCacheAccess = true;
	function applyOptions(instance) {
		var options = resolveMergedOptions(instance);
		var publicThis = instance.proxy;
		var ctx$1 = instance.ctx;
		shouldCacheAccess = false;
		if (options.beforeCreate) callHook$1(options.beforeCreate, instance, "bc");
		var { data: dataOptions, computed: computedOptions, methods, watch: watchOptions, provide: provideOptions, inject: injectOptions, created, beforeMount, mounted, beforeUpdate, updated, activated, deactivated, beforeDestroy, beforeUnmount, destroyed, unmounted, render, renderTracked, renderTriggered, errorCaptured, serverPrefetch, expose, inheritAttrs, components, directives, filters } = options;
		var checkDuplicateProperties = null;
		if (injectOptions) resolveInjections(injectOptions, ctx$1, checkDuplicateProperties);
		if (methods) for (var _key9 in methods) {
			var methodHandler = methods[_key9];
			if (isFunction(methodHandler)) ctx$1[_key9] = methodHandler.bind(publicThis);
		}
		if (dataOptions) (function() {
			var data = dataOptions.call(publicThis, publicThis);
			if (!isObject$1(data)) {} else instance.data = reactive(data);
		})();
		shouldCacheAccess = true;
		if (computedOptions) {
			var _loop4 = function(_key11$1) {
				var opt = computedOptions[_key11$1];
				var c$1 = computed({
					get: isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP,
					set: !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP
				});
				Object.defineProperty(ctx$1, _key11$1, {
					enumerable: true,
					configurable: true,
					get: () => c$1.value,
					set: (v$1) => c$1.value = v$1
				});
			};
			for (var _key11 in computedOptions) _loop4(_key11);
		}
		if (watchOptions) for (var _key12 in watchOptions) createWatcher(watchOptions[_key12], ctx$1, publicThis, _key12);
		if (provideOptions) {
			var provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
			Reflect.ownKeys(provides).forEach((key$1) => {
				provide(key$1, provides[key$1]);
			});
		}
		if (created) callHook$1(created, instance, "c");
		function registerLifecycleHook(register$1, hook) {
			if (isArray(hook)) hook.forEach((_hook) => register$1(_hook.bind(publicThis)));
			else if (hook) register$1(hook.bind(publicThis));
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
				expose.forEach((key$1) => {
					Object.defineProperty(exposed, key$1, {
						get: () => publicThis[key$1],
						set: (val) => publicThis[key$1] = val
					});
				});
			} else if (!instance.exposed) instance.exposed = {};
		}
		if (render && instance.render === NOOP) instance.render = render;
		if (inheritAttrs != null) instance.inheritAttrs = inheritAttrs;
		if (components) instance.components = components;
		if (directives) instance.directives = directives;
	}
	function resolveInjections(injectOptions, ctx$1) {
		arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
		if (isArray(injectOptions)) injectOptions = normalizeInject(injectOptions);
		var _loop5 = function(key$2) {
			var opt = injectOptions[key$2];
			var injected = void 0;
			if (isObject$1(opt)) if ("default" in opt) injected = inject(opt.from || key$2, opt.default, true);
			else injected = inject(opt.from || key$2);
			else injected = inject(opt);
			if (isRef(injected)) Object.defineProperty(ctx$1, key$2, {
				enumerable: true,
				configurable: true,
				get: () => injected.value,
				set: (v$1) => injected.value = v$1
			});
			else ctx$1[key$2] = injected;
		};
		for (var key$1 in injectOptions) _loop5(key$1);
	}
	function callHook$1(hook, instance, type) {
		callWithAsyncErrorHandling(isArray(hook) ? hook.map((h$1) => h$1.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
	}
	function createWatcher(raw, ctx$1, publicThis, key$1) {
		var getter = key$1.includes(".") ? createPathGetter(publicThis, key$1) : () => publicThis[key$1];
		if (isString(raw)) {
			var handler = ctx$1[raw];
			if (isFunction(handler)) watch(getter, handler);
		} else if (isFunction(raw)) watch(getter, raw.bind(publicThis));
		else if (isObject$1(raw)) if (isArray(raw)) raw.forEach((r) => createWatcher(r, ctx$1, publicThis, key$1));
		else {
			var _handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx$1[raw.handler];
			if (isFunction(_handler)) watch(getter, _handler, raw);
		}
	}
	function resolveMergedOptions(instance) {
		var base = instance.type;
		var { mixins, extends: extendsOptions } = base;
		var { mixins: globalMixins, optionsCache: cache$1, config: { optionMergeStrategies } } = instance.appContext;
		var cached = cache$1.get(base);
		var resolved;
		if (cached) resolved = cached;
		else if (!globalMixins.length && !mixins && !extendsOptions) resolved = base;
		else {
			resolved = {};
			if (globalMixins.length) globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
			mergeOptions(resolved, base, optionMergeStrategies);
		}
		if (isObject$1(base)) cache$1.set(base, resolved);
		return resolved;
	}
	function mergeOptions(to, from, strats) {
		var asMixin = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
		var { mixins, extends: extendsOptions } = from;
		if (extendsOptions) mergeOptions(to, extendsOptions, strats, true);
		if (mixins) mixins.forEach((m) => mergeOptions(to, m, strats, true));
		for (var key$1 in from) if (asMixin && key$1 === "expose") {} else {
			var strat = internalOptionMergeStrats[key$1] || strats && strats[key$1];
			to[key$1] = strat ? strat(to[key$1], from[key$1]) : from[key$1];
		}
		return to;
	}
	var internalOptionMergeStrats = {
		data: mergeDataFn,
		props: mergeEmitsOrPropsOptions,
		emits: mergeEmitsOrPropsOptions,
		methods: mergeObjectOptions,
		computed: mergeObjectOptions,
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
		components: mergeObjectOptions,
		directives: mergeObjectOptions,
		watch: mergeWatchOptions,
		provide: mergeDataFn,
		inject: mergeInject
	};
	function mergeDataFn(to, from) {
		if (!from) return to;
		if (!to) return from;
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
			for (var i$1 = 0; i$1 < raw.length; i$1++) res[raw[i$1]] = raw[i$1];
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
			if (isArray(to) && isArray(from)) return [.../* @__PURE__ */ new Set([...to, ...from])];
			return extend(/* @__PURE__ */ Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(from != null ? from : {}));
		} else return from;
	}
	function mergeWatchOptions(to, from) {
		if (!to) return from;
		if (!from) return to;
		var merged = extend(/* @__PURE__ */ Object.create(null), to);
		for (var key$1 in from) merged[key$1] = mergeAsArray(to[key$1], from[key$1]);
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
	function createAppAPI(render, hydrate) {
		return function createApp$1(rootComponent) {
			var rootProps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
			if (!isFunction(rootComponent)) rootComponent = extend({}, rootComponent);
			if (rootProps != null && !isObject$1(rootProps)) rootProps = null;
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
				set config(v$1) {},
				use(plugin) {
					for (var _len8 = arguments.length, options = new Array(_len8 > 1 ? _len8 - 1 : 0), _key13 = 1; _key13 < _len8; _key13++) options[_key13 - 1] = arguments[_key13];
					if (installedPlugins.has(plugin)) {} else if (plugin && isFunction(plugin.install)) {
						installedPlugins.add(plugin);
						plugin.install(app, ...options);
					} else if (isFunction(plugin)) {
						installedPlugins.add(plugin);
						plugin(app, ...options);
					}
					return app;
				},
				mixin(mixin) {
					if (!context.mixins.includes(mixin)) context.mixins.push(mixin);
					return app;
				},
				component(name, component) {
					if (!component) return context.components[name];
					context.components[name] = component;
					return app;
				},
				directive(name, directive) {
					if (!directive) return context.directives[name];
					context.directives[name] = directive;
					return app;
				},
				mount(rootContainer, isHydrate, namespace) {
					if (!isMounted) {
						var vnode = createVNode(rootComponent, rootProps);
						vnode.appContext = context;
						if (namespace === true) namespace = "svg";
						else if (namespace === false) namespace = void 0;
						if (isHydrate && hydrate) hydrate(vnode, rootContainer);
						else render(vnode, rootContainer, namespace);
						isMounted = true;
						app._container = rootContainer;
						rootContainer.__vue_app__ = app;
						return getExposeProxy(vnode.component) || vnode.component.proxy;
					}
				},
				unmount() {
					if (isMounted) {
						render(null, app._container);
						delete app._container.__vue_app__;
					}
				},
				provide(key$1, value) {
					context.provides[key$1] = value;
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
	function provide(key$1, value) {
		if (!currentInstance) {} else {
			var provides = currentInstance.provides;
			var parentProvides = currentInstance.parent && currentInstance.parent.provides;
			if (parentProvides === provides) provides = currentInstance.provides = Object.create(parentProvides);
			provides[key$1] = value;
		}
	}
	function inject(key$1, defaultValue) {
		var treatDefaultAsFactory = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
		var instance = currentInstance || currentRenderingInstance;
		if (instance || currentApp) {
			var provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
			if (provides && key$1 in provides) return provides[key$1];
			else if (arguments.length > 1) return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
		}
	}
	function initProps(instance, rawProps, isStateful) {
		var isSSR = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
		var props$30 = {};
		var attrs$1 = {};
		def(attrs$1, InternalObjectKey, 1);
		instance.propsDefaults = /* @__PURE__ */ Object.create(null);
		setFullProps(instance, rawProps, props$30, attrs$1);
		for (var key$1 in instance.propsOptions[0]) if (!(key$1 in props$30)) props$30[key$1] = void 0;
		if (isStateful) instance.props = isSSR ? props$30 : shallowReactive(props$30);
		else if (!instance.type.props) instance.props = attrs$1;
		else instance.props = props$30;
		instance.attrs = attrs$1;
	}
	function updateProps(instance, rawProps, rawPrevProps, optimized) {
		var { props: props$30, attrs: attrs$1, vnode: { patchFlag } } = instance;
		var rawCurrentProps = toRaw(props$30);
		var [options] = instance.propsOptions;
		var hasAttrsChanged = false;
		if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
			if (patchFlag & 8) {
				var propsToUpdate = instance.vnode.dynamicProps;
				for (var i$1 = 0; i$1 < propsToUpdate.length; i$1++) {
					var key$1 = propsToUpdate[i$1];
					if (isEmitListener(instance.emitsOptions, key$1)) continue;
					var value = rawProps[key$1];
					if (options) if (hasOwn(attrs$1, key$1)) {
						if (value !== attrs$1[key$1]) {
							attrs$1[key$1] = value;
							hasAttrsChanged = true;
						}
					} else {
						var camelizedKey = camelize(key$1);
						props$30[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
					}
					else if (value !== attrs$1[key$1]) {
						attrs$1[key$1] = value;
						hasAttrsChanged = true;
					}
				}
			}
		} else {
			if (setFullProps(instance, rawProps, props$30, attrs$1)) hasAttrsChanged = true;
			var kebabKey;
			for (var _key14 in rawCurrentProps) if (!rawProps || !hasOwn(rawProps, _key14) && ((kebabKey = hyphenate(_key14)) === _key14 || !hasOwn(rawProps, kebabKey))) if (options) {
				if (rawPrevProps && (rawPrevProps[_key14] !== void 0 || rawPrevProps[kebabKey] !== void 0)) props$30[_key14] = resolvePropValue(options, rawCurrentProps, _key14, void 0, instance, true);
			} else delete props$30[_key14];
			if (attrs$1 !== rawCurrentProps) {
				for (var _key15 in attrs$1) if (!rawProps || !hasOwn(rawProps, _key15) && true) {
					delete attrs$1[_key15];
					hasAttrsChanged = true;
				}
			}
		}
		if (hasAttrsChanged) trigger(instance, "set", "$attrs");
	}
	function setFullProps(instance, rawProps, props$30, attrs$1) {
		var [options, needCastKeys] = instance.propsOptions;
		var hasAttrsChanged = false;
		var rawCastValues;
		if (rawProps) for (var key$1 in rawProps) {
			if (isReservedProp(key$1)) continue;
			var value = rawProps[key$1];
			var camelKey = void 0;
			if (options && hasOwn(options, camelKey = camelize(key$1))) if (!needCastKeys || !needCastKeys.includes(camelKey)) props$30[camelKey] = value;
			else (rawCastValues || (rawCastValues = {}))[camelKey] = value;
			else if (!isEmitListener(instance.emitsOptions, key$1)) {
				if (!(key$1 in attrs$1) || value !== attrs$1[key$1]) {
					attrs$1[key$1] = value;
					hasAttrsChanged = true;
				}
			}
		}
		if (needCastKeys) {
			var rawCurrentProps = toRaw(props$30);
			var castValues = rawCastValues || EMPTY_OBJ;
			for (var i$1 = 0; i$1 < needCastKeys.length; i$1++) {
				var _key16 = needCastKeys[i$1];
				props$30[_key16] = resolvePropValue(options, rawCurrentProps, _key16, castValues[_key16], instance, !hasOwn(castValues, _key16));
			}
		}
		return hasAttrsChanged;
	}
	function resolvePropValue(options, props$30, key$1, value, instance, isAbsent) {
		var opt = options[key$1];
		if (opt != null) {
			var hasDefault = hasOwn(opt, "default");
			if (hasDefault && value === void 0) {
				var defaultValue = opt.default;
				if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
					var { propsDefaults } = instance;
					if (key$1 in propsDefaults) value = propsDefaults[key$1];
					else {
						var reset = setCurrentInstance(instance);
						value = propsDefaults[key$1] = defaultValue.call(null, props$30);
						reset();
					}
				} else value = defaultValue;
			}
			if (opt[0]) {
				if (isAbsent && !hasDefault) value = false;
				else if (opt[1] && (value === "" || value === hyphenate(key$1))) value = true;
			}
		}
		return value;
	}
	function normalizePropsOptions(comp, appContext) {
		var asMixin = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
		var cache$1 = appContext.propsCache;
		var cached = cache$1.get(comp);
		if (cached) return cached;
		var raw = comp.props;
		var normalized = {};
		var needCastKeys = [];
		var hasExtends = false;
		if (!isFunction(comp)) {
			var extendProps = (raw2) => {
				hasExtends = true;
				var [props$30, keys] = normalizePropsOptions(raw2, appContext, true);
				extend(normalized, props$30);
				if (keys) needCastKeys.push(...keys);
			};
			if (!asMixin && appContext.mixins.length) appContext.mixins.forEach(extendProps);
			if (comp.extends) extendProps(comp.extends);
			if (comp.mixins) comp.mixins.forEach(extendProps);
		}
		if (!raw && !hasExtends) {
			if (isObject$1(comp)) cache$1.set(comp, EMPTY_ARR);
			return EMPTY_ARR;
		}
		if (isArray(raw)) for (var i$1 = 0; i$1 < raw.length; i$1++) {
			var normalizedKey = camelize(raw[i$1]);
			if (validatePropName(normalizedKey)) normalized[normalizedKey] = EMPTY_OBJ;
		}
		else if (raw) for (var key$1 in raw) {
			var _normalizedKey = camelize(key$1);
			if (validatePropName(_normalizedKey)) {
				var opt = raw[key$1];
				var prop = normalized[_normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
				if (prop) {
					var booleanIndex = getTypeIndex(Boolean, prop.type);
					var stringIndex = getTypeIndex(String, prop.type);
					prop[0] = booleanIndex > -1;
					prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
					if (booleanIndex > -1 || hasOwn(prop, "default")) needCastKeys.push(_normalizedKey);
				}
			}
		}
		var res = [normalized, needCastKeys];
		if (isObject$1(comp)) cache$1.set(comp, res);
		return res;
	}
	function validatePropName(key$1) {
		if (key$1[0] !== "$" && !isReservedProp(key$1)) return true;
		return false;
	}
	function getType(ctor) {
		if (ctor === null) return "null";
		if (typeof ctor === "function") return ctor.name || "";
		else if (typeof ctor === "object") return ctor.constructor && ctor.constructor.name || "";
		return "";
	}
	function isSameType(a$1, b) {
		return getType(a$1) === getType(b);
	}
	function getTypeIndex(type, expectedTypes) {
		if (isArray(expectedTypes)) return expectedTypes.findIndex((t$1) => isSameType(t$1, type));
		else if (isFunction(expectedTypes)) return isSameType(expectedTypes, type) ? 0 : -1;
		return -1;
	}
	var isInternalKey = (key$1) => key$1[0] === "_" || key$1 === "$stable";
	var normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
	var normalizeSlot = (key$1, rawSlot, ctx$1) => {
		if (rawSlot._n) return rawSlot;
		var normalized = withCtx(function() {
			return normalizeSlotValue(rawSlot(...arguments));
		}, ctx$1);
		normalized._c = false;
		return normalized;
	};
	var normalizeObjectSlots = (rawSlots, slots, instance) => {
		var ctx$1 = rawSlots._ctx;
		for (var key$1 in rawSlots) {
			if (isInternalKey(key$1)) continue;
			var value = rawSlots[key$1];
			if (isFunction(value)) slots[key$1] = normalizeSlot(key$1, value, ctx$1);
			else if (value != null) (function() {
				var normalized = normalizeSlotValue(value);
				slots[key$1] = () => normalized;
			})();
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
			} else normalizeObjectSlots(children, instance.slots = {});
		} else {
			instance.slots = {};
			if (children) normalizeVNodeSlots(instance, children);
		}
		def(instance.slots, InternalObjectKey, 1);
	};
	var updateSlots = (instance, children, optimized) => {
		var { vnode, slots } = instance;
		var needDeletionCheck = true;
		var deletionComparisonTarget = EMPTY_OBJ;
		if (vnode.shapeFlag & 32) {
			var type = children._;
			if (type) if (optimized && type === 1) needDeletionCheck = false;
			else {
				extend(slots, children);
				if (!optimized && type === 1) delete slots._;
			}
			else {
				needDeletionCheck = !children.$stable;
				normalizeObjectSlots(children, slots);
			}
			deletionComparisonTarget = children;
		} else if (children) {
			normalizeVNodeSlots(instance, children);
			deletionComparisonTarget = { default: 1 };
		}
		if (needDeletionCheck) {
			for (var key$1 in slots) if (!isInternalKey(key$1) && deletionComparisonTarget[key$1] == null) delete slots[key$1];
		}
	};
	function setRef(rawRef, oldRawRef, parentSuspense, vnode) {
		var isUnmount = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
		if (isArray(rawRef)) {
			rawRef.forEach((r, i$1) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i$1] : oldRawRef), parentSuspense, vnode, isUnmount));
			return;
		}
		if (isAsyncWrapper(vnode) && !isUnmount) return;
		var refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
		var value = isUnmount ? null : refValue;
		var { i: owner, r: ref$1 } = rawRef;
		var oldRef = oldRawRef && oldRawRef.r;
		var refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
		var setupState = owner.setupState;
		if (oldRef != null && oldRef !== ref$1) {
			if (isString(oldRef)) {
				refs[oldRef] = null;
				if (hasOwn(setupState, oldRef)) setupState[oldRef] = null;
			} else if (isRef(oldRef)) oldRef.value = null;
		}
		if (isFunction(ref$1)) callWithErrorHandling(ref$1, owner, 12, [value, refs]);
		else {
			var _isString = isString(ref$1);
			var _isRef = isRef(ref$1);
			if (_isString || _isRef) {
				var doSet = () => {
					if (rawRef.f) {
						var existing = _isString ? hasOwn(setupState, ref$1) ? setupState[ref$1] : refs[ref$1] : ref$1.value;
						if (isUnmount) isArray(existing) && remove(existing, refValue);
						else if (!isArray(existing)) if (_isString) {
							refs[ref$1] = [refValue];
							if (hasOwn(setupState, ref$1)) setupState[ref$1] = refs[ref$1];
						} else {
							ref$1.value = [refValue];
							if (rawRef.k) refs[rawRef.k] = ref$1.value;
						}
						else if (!existing.includes(refValue)) existing.push(refValue);
					} else if (_isString) {
						refs[ref$1] = value;
						if (hasOwn(setupState, ref$1)) setupState[ref$1] = value;
					} else if (_isRef) {
						ref$1.value = value;
						if (rawRef.k) refs[rawRef.k] = value;
					}
				};
				if (value) {
					doSet.id = -1;
					queuePostRenderEffect(doSet, parentSuspense);
				} else doSet();
			}
		}
	}
	function initFeatureFlags() {}
	var queuePostRenderEffect = queueEffectWithSuspense;
	function createRenderer(options) {
		return baseCreateRenderer(options);
	}
	function baseCreateRenderer(options, createHydrationFns) {
		initFeatureFlags();
		var target = getGlobalThis();
		target.__VUE__ = true;
		var { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options;
		var patch = function(n1, n2, container) {
			var anchor = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
			var parentComponent = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
			var parentSuspense = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : null;
			var namespace = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : void 0;
			var slotScopeIds = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : null;
			var optimized = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : !!n2.dynamicChildren;
			if (n1 === n2) return;
			if (n1 && !isSameVNodeType(n1, n2)) {
				anchor = getNextHostNode(n1);
				unmount(n1, parentComponent, parentSuspense, true);
				n1 = null;
			}
			if (n2.patchFlag === -2) {
				optimized = false;
				n2.dynamicChildren = null;
			}
			var { type, ref: ref$1, shapeFlag } = n2;
			switch (type) {
				case Text:
					processText(n1, n2, container, anchor);
					break;
				case Comment:
					processCommentNode(n1, n2, container, anchor);
					break;
				case Static:
					if (n1 == null) mountStaticNode(n2, container, anchor, namespace);
					break;
				case Fragment:
					processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
					break;
				default: if (shapeFlag & 1) processElement(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				else if (shapeFlag & 6) processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				else if (shapeFlag & 64) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
				else if (shapeFlag & 128) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
			}
			if (ref$1 != null && parentComponent) setRef(ref$1, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
		};
		var processText = (n1, n2, container, anchor) => {
			if (n1 == null) hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
			else {
				var el = n2.el = n1.el;
				if (n2.children !== n1.children) hostSetText(el, n2.children);
			}
		};
		var processCommentNode = (n1, n2, container, anchor) => {
			if (n1 == null) hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
			else n2.el = n1.el;
		};
		var mountStaticNode = (n2, container, anchor, namespace) => {
			[n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace, n2.el, n2.anchor);
		};
		var moveStaticNode = (_ref12, container, nextSibling) => {
			var { el, anchor } = _ref12;
			var next;
			while (el && el !== anchor) {
				next = hostNextSibling(el);
				hostInsert(el, container, nextSibling);
				el = next;
			}
			hostInsert(anchor, container, nextSibling);
		};
		var removeStaticNode = (_ref13) => {
			var { el, anchor } = _ref13;
			var next;
			while (el && el !== anchor) {
				next = hostNextSibling(el);
				hostRemove(el);
				el = next;
			}
			hostRemove(anchor);
		};
		var processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			if (n2.type === "svg") namespace = "svg";
			else if (n2.type === "math") namespace = "mathml";
			if (n1 == null) mountElement(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else patchElement(n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		};
		var mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			var el;
			var vnodeHook;
			var { props: props$30, shapeFlag, transition, dirs } = vnode;
			el = vnode.el = hostCreateElement(vnode.type, namespace, props$30 && props$30.is, props$30);
			if (shapeFlag & 8) hostSetElementText(el, vnode.children);
			else if (shapeFlag & 16) mountChildren(vnode.children, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(vnode, namespace), slotScopeIds, optimized);
			if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "created");
			setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
			if (props$30) {
				for (var key$1 in props$30) if (key$1 !== "value" && !isReservedProp(key$1)) hostPatchProp(el, key$1, null, props$30[key$1], namespace, vnode.children, parentComponent, parentSuspense, unmountChildren);
				if ("value" in props$30) hostPatchProp(el, "value", null, props$30.value, namespace);
				if (vnodeHook = props$30.onVnodeBeforeMount) invokeVNodeHook(vnodeHook, parentComponent, vnode);
			}
			Object.defineProperty(el, "__vueParentComponent", {
				value: parentComponent,
				enumerable: false
			});
			if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
			var needCallTransitionHooks = needTransition(parentSuspense, transition);
			if (needCallTransitionHooks) transition.beforeEnter(el);
			hostInsert(el, container, anchor);
			if ((vnodeHook = props$30 && props$30.onVnodeMounted) || needCallTransitionHooks || dirs) queuePostRenderEffect(() => {
				vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
				needCallTransitionHooks && transition.enter(el);
				dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
			}, parentSuspense);
		};
		var setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
			if (scopeId) hostSetScopeId(el, scopeId);
			if (slotScopeIds) for (var i$1 = 0; i$1 < slotScopeIds.length; i$1++) hostSetScopeId(el, slotScopeIds[i$1]);
			if (parentComponent) {
				if (vnode === parentComponent.subTree) {
					var parentVNode = parentComponent.vnode;
					setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
				}
			}
		};
		var mountChildren = function(children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) {
			for (var i$1 = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : 0; i$1 < children.length; i$1++) patch(null, children[i$1] = optimized ? cloneIfMounted(children[i$1]) : normalizeVNode(children[i$1]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		};
		var patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			var el = n2.el = n1.el;
			var { patchFlag, dynamicChildren, dirs } = n2;
			patchFlag |= n1.patchFlag & 16;
			var oldProps = n1.props || EMPTY_OBJ;
			var newProps = n2.props || EMPTY_OBJ;
			var vnodeHook;
			parentComponent && toggleRecurse(parentComponent, false);
			if (vnodeHook = newProps.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
			if (dirs) invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
			parentComponent && toggleRecurse(parentComponent, true);
			if (dynamicChildren) patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds);
			else if (!optimized) patchChildren(n1, n2, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds, false);
			if (patchFlag > 0) {
				if (patchFlag & 16) patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, namespace);
				else {
					if (patchFlag & 2) {
						if (oldProps.class !== newProps.class) hostPatchProp(el, "class", null, newProps.class, namespace);
					}
					if (patchFlag & 4) hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
					if (patchFlag & 8) {
						var propsToUpdate = n2.dynamicProps;
						for (var i$1 = 0; i$1 < propsToUpdate.length; i$1++) {
							var key$1 = propsToUpdate[i$1];
							var prev = oldProps[key$1];
							var next = newProps[key$1];
							if (next !== prev || key$1 === "value") hostPatchProp(el, key$1, prev, next, namespace, n1.children, parentComponent, parentSuspense, unmountChildren);
						}
					}
				}
				if (patchFlag & 1) {
					if (n1.children !== n2.children) hostSetElementText(el, n2.children);
				}
			} else if (!optimized && dynamicChildren == null) patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, namespace);
			if ((vnodeHook = newProps.onVnodeUpdated) || dirs) queuePostRenderEffect(() => {
				vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
				dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
			}, parentSuspense);
		};
		var patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
			for (var i$1 = 0; i$1 < newChildren.length; i$1++) {
				var oldVNode = oldChildren[i$1];
				var newVNode = newChildren[i$1];
				patch(oldVNode, newVNode, oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & 70) ? hostParentNode(oldVNode.el) : fallbackContainer, null, parentComponent, parentSuspense, namespace, slotScopeIds, true);
			}
		};
		var patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, namespace) => {
			if (oldProps !== newProps) {
				if (oldProps !== EMPTY_OBJ) {
					for (var key$1 in oldProps) if (!isReservedProp(key$1) && !(key$1 in newProps)) hostPatchProp(el, key$1, oldProps[key$1], null, namespace, vnode.children, parentComponent, parentSuspense, unmountChildren);
				}
				for (var _key18 in newProps) {
					if (isReservedProp(_key18)) continue;
					var next = newProps[_key18];
					var prev = oldProps[_key18];
					if (next !== prev && _key18 !== "value") hostPatchProp(el, _key18, prev, next, namespace, vnode.children, parentComponent, parentSuspense, unmountChildren);
				}
				if ("value" in newProps) hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
			}
		};
		var processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			var fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
			var fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
			var { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
			if (fragmentSlotScopeIds) slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
			if (n1 == null) {
				hostInsert(fragmentStartAnchor, container, anchor);
				hostInsert(fragmentEndAnchor, container, anchor);
				mountChildren(n2.children || [], container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			} else if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
				patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, namespace, slotScopeIds);
				if (n2.key != null || parentComponent && n2 === parentComponent.subTree) traverseStaticChildren(n1, n2, true);
			} else patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		};
		var processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			n2.slotScopeIds = slotScopeIds;
			if (n1 == null) if (n2.shapeFlag & 512) parentComponent.ctx.activate(n2, container, anchor, namespace, optimized);
			else mountComponent(n2, container, anchor, parentComponent, parentSuspense, namespace, optimized);
			else updateComponent(n1, n2, optimized);
		};
		var mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
			var instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
			if (isKeepAlive(initialVNode)) instance.ctx.renderer = internals;
			setupComponent(instance);
			if (instance.asyncDep) {
				parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
				if (!initialVNode.el) processCommentNode(null, instance.subTree = createVNode(Comment), container, anchor);
			} else setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized);
		};
		var updateComponent = (n1, n2, optimized) => {
			var instance = n2.component = n1.component;
			if (shouldUpdateComponent(n1, n2, optimized)) if (instance.asyncDep && !instance.asyncResolved) {
				updateComponentPreRender(instance, n2, optimized);
				return;
			} else {
				instance.next = n2;
				invalidateJob(instance.update);
				instance.effect.dirty = true;
				instance.update();
			}
			else {
				n2.el = n1.el;
				instance.vnode = n2;
			}
		};
		var setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
			var componentUpdateFn = () => {
				if (!instance.isMounted) {
					var vnodeHook;
					var { el, props: props$30 } = initialVNode;
					var { bm, m, parent } = instance;
					var isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
					toggleRecurse(instance, false);
					if (bm) invokeArrayFns(bm);
					if (!isAsyncWrapperVNode && (vnodeHook = props$30 && props$30.onVnodeBeforeMount)) invokeVNodeHook(vnodeHook, parent, initialVNode);
					toggleRecurse(instance, true);
					if (el && hydrateNode) {
						var hydrateSubTree = () => {
							instance.subTree = renderComponentRoot(instance);
							hydrateNode(el, instance.subTree, instance, parentSuspense, null);
						};
						if (isAsyncWrapperVNode) initialVNode.type.__asyncLoader().then(() => !instance.isUnmounted && hydrateSubTree());
						else hydrateSubTree();
					} else {
						var subTree = instance.subTree = renderComponentRoot(instance);
						patch(null, subTree, container, anchor, instance, parentSuspense, namespace);
						initialVNode.el = subTree.el;
					}
					if (m) queuePostRenderEffect(m, parentSuspense);
					if (!isAsyncWrapperVNode && (vnodeHook = props$30 && props$30.onVnodeMounted)) {
						var scopedInitialVNode = initialVNode;
						queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
					}
					if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) instance.a && queuePostRenderEffect(instance.a, parentSuspense);
					instance.isMounted = true;
					initialVNode = container = anchor = null;
				} else {
					var { next, bu, u, parent: _parent, vnode } = instance;
					var nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
					if (nonHydratedAsyncRoot) {
						if (next) {
							next.el = vnode.el;
							updateComponentPreRender(instance, next, optimized);
						}
						nonHydratedAsyncRoot.asyncDep.then(() => {
							if (!instance.isUnmounted) componentUpdateFn();
						});
						return;
					}
					var originNext = next;
					var _vnodeHook;
					toggleRecurse(instance, false);
					if (next) {
						next.el = vnode.el;
						updateComponentPreRender(instance, next, optimized);
					} else next = vnode;
					if (bu) invokeArrayFns(bu);
					if (_vnodeHook = next.props && next.props.onVnodeBeforeUpdate) invokeVNodeHook(_vnodeHook, _parent, next, vnode);
					toggleRecurse(instance, true);
					var nextTree = renderComponentRoot(instance);
					var prevTree = instance.subTree;
					instance.subTree = nextTree;
					patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, namespace);
					next.el = nextTree.el;
					if (originNext === null) updateHOCHostEl(instance, nextTree.el);
					if (u) queuePostRenderEffect(u, parentSuspense);
					if (_vnodeHook = next.props && next.props.onVnodeUpdated) queuePostRenderEffect(() => invokeVNodeHook(_vnodeHook, _parent, next, vnode), parentSuspense);
				}
			};
			var effect = instance.effect = new ReactiveEffect(componentUpdateFn, NOOP, () => queueJob(update), instance.scope);
			var update = instance.update = () => {
				if (effect.dirty) effect.run();
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
			var { patchFlag, shapeFlag } = n2;
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
				if (prevShapeFlag & 16) unmountChildren(c1, parentComponent, parentSuspense);
				if (c2 !== c1) hostSetElementText(container, c2);
			} else if (prevShapeFlag & 16) if (shapeFlag & 16) patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else unmountChildren(c1, parentComponent, parentSuspense, true);
			else {
				if (prevShapeFlag & 8) hostSetElementText(container, "");
				if (shapeFlag & 16) mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			}
		};
		var patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			c1 = c1 || EMPTY_ARR;
			c2 = c2 || EMPTY_ARR;
			var oldLength = c1.length;
			var newLength = c2.length;
			var commonLength = Math.min(oldLength, newLength);
			var i$1;
			for (i$1 = 0; i$1 < commonLength; i$1++) {
				var nextChild = c2[i$1] = optimized ? cloneIfMounted(c2[i$1]) : normalizeVNode(c2[i$1]);
				patch(c1[i$1], nextChild, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			}
			if (oldLength > newLength) unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
			else mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, commonLength);
		};
		var patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			var i$1 = 0;
			var l2 = c2.length;
			var e1 = c1.length - 1;
			var e2 = l2 - 1;
			while (i$1 <= e1 && i$1 <= e2) {
				var n1 = c1[i$1];
				var n2 = c2[i$1] = optimized ? cloneIfMounted(c2[i$1]) : normalizeVNode(c2[i$1]);
				if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				else break;
				i$1++;
			}
			while (i$1 <= e1 && i$1 <= e2) {
				var _n = c1[e1];
				var _n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
				if (isSameVNodeType(_n, _n2)) patch(_n, _n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				else break;
				e1--;
				e2--;
			}
			if (i$1 > e1) {
				if (i$1 <= e2) {
					var nextPos = e2 + 1;
					var anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
					while (i$1 <= e2) {
						patch(null, c2[i$1] = optimized ? cloneIfMounted(c2[i$1]) : normalizeVNode(c2[i$1]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
						i$1++;
					}
				}
			} else if (i$1 > e2) while (i$1 <= e1) {
				unmount(c1[i$1], parentComponent, parentSuspense, true);
				i$1++;
			}
			else {
				var s1 = i$1;
				var s2 = i$1;
				var keyToNewIndexMap = /* @__PURE__ */ new Map();
				for (i$1 = s2; i$1 <= e2; i$1++) {
					var nextChild = c2[i$1] = optimized ? cloneIfMounted(c2[i$1]) : normalizeVNode(c2[i$1]);
					if (nextChild.key != null) keyToNewIndexMap.set(nextChild.key, i$1);
				}
				var j;
				var patched = 0;
				var toBePatched = e2 - s2 + 1;
				var moved = false;
				var maxNewIndexSoFar = 0;
				var newIndexToOldIndexMap = new Array(toBePatched);
				for (i$1 = 0; i$1 < toBePatched; i$1++) newIndexToOldIndexMap[i$1] = 0;
				for (i$1 = s1; i$1 <= e1; i$1++) {
					var prevChild = c1[i$1];
					if (patched >= toBePatched) {
						unmount(prevChild, parentComponent, parentSuspense, true);
						continue;
					}
					var newIndex = void 0;
					if (prevChild.key != null) newIndex = keyToNewIndexMap.get(prevChild.key);
					else for (j = s2; j <= e2; j++) if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
						newIndex = j;
						break;
					}
					if (newIndex === void 0) unmount(prevChild, parentComponent, parentSuspense, true);
					else {
						newIndexToOldIndexMap[newIndex - s2] = i$1 + 1;
						if (newIndex >= maxNewIndexSoFar) maxNewIndexSoFar = newIndex;
						else moved = true;
						patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
						patched++;
					}
				}
				var increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
				j = increasingNewIndexSequence.length - 1;
				for (i$1 = toBePatched - 1; i$1 >= 0; i$1--) {
					var nextIndex = s2 + i$1;
					var _nextChild = c2[nextIndex];
					var _anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
					if (newIndexToOldIndexMap[i$1] === 0) patch(null, _nextChild, container, _anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
					else if (moved) if (j < 0 || i$1 !== increasingNewIndexSequence[j]) move(_nextChild, container, _anchor, 2);
					else j--;
				}
			}
		};
		var move = function(vnode, container, anchor, moveType) {
			var parentSuspense = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
			var { el, type, transition, children, shapeFlag } = vnode;
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
				for (var i$1 = 0; i$1 < children.length; i$1++) move(children[i$1], container, anchor, moveType);
				hostInsert(vnode.anchor, container, anchor);
				return;
			}
			if (type === Static) {
				moveStaticNode(vnode, container, anchor);
				return;
			}
			if (moveType !== 2 && shapeFlag & 1 && transition) if (moveType === 0) {
				transition.beforeEnter(el);
				hostInsert(el, container, anchor);
				queuePostRenderEffect(() => transition.enter(el), parentSuspense);
			} else {
				var { leave, delayLeave, afterLeave } = transition;
				var remove2 = () => hostInsert(el, container, anchor);
				var performLeave = () => {
					leave(el, () => {
						remove2();
						afterLeave && afterLeave();
					});
				};
				if (delayLeave) delayLeave(el, remove2, performLeave);
				else performLeave();
			}
			else hostInsert(el, container, anchor);
		};
		var unmount = function(vnode, parentComponent, parentSuspense) {
			var doRemove = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
			var optimized = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
			var { type, props: props$30, ref: ref$1, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
			if (ref$1 != null) setRef(ref$1, null, parentSuspense, vnode, true);
			if (shapeFlag & 256) {
				parentComponent.ctx.deactivate(vnode);
				return;
			}
			var shouldInvokeDirs = shapeFlag & 1 && dirs;
			var shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
			var vnodeHook;
			if (shouldInvokeVnodeHook && (vnodeHook = props$30 && props$30.onVnodeBeforeUnmount)) invokeVNodeHook(vnodeHook, parentComponent, vnode);
			if (shapeFlag & 6) unmountComponent(vnode.component, parentSuspense, doRemove);
			else {
				if (shapeFlag & 128) {
					vnode.suspense.unmount(parentSuspense, doRemove);
					return;
				}
				if (shouldInvokeDirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
				if (shapeFlag & 64) vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
				else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
				else if (type === Fragment && patchFlag & 384 || !optimized && shapeFlag & 16) unmountChildren(children, parentComponent, parentSuspense);
				if (doRemove) remove$1(vnode);
			}
			if (shouldInvokeVnodeHook && (vnodeHook = props$30 && props$30.onVnodeUnmounted) || shouldInvokeDirs) queuePostRenderEffect(() => {
				vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
				shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
			}, parentSuspense);
		};
		var remove$1 = (vnode) => {
			var { type, el, anchor, transition } = vnode;
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
				if (transition && !transition.persisted && transition.afterLeave) transition.afterLeave();
			};
			if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
				var { leave, delayLeave } = transition;
				var performLeave = () => leave(el, performRemove);
				if (delayLeave) delayLeave(vnode.el, performRemove, performLeave);
				else performLeave();
			} else performRemove();
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
			var { bum, scope, update, subTree, um } = instance;
			if (bum) invokeArrayFns(bum);
			scope.stop();
			if (update) {
				update.active = false;
				unmount(subTree, instance, parentSuspense, doRemove);
			}
			if (um) queuePostRenderEffect(um, parentSuspense);
			queuePostRenderEffect(() => {
				instance.isUnmounted = true;
			}, parentSuspense);
			if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
				parentSuspense.deps--;
				if (parentSuspense.deps === 0) parentSuspense.resolve();
			}
		};
		var unmountChildren = function(children, parentComponent, parentSuspense) {
			var doRemove = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
			var optimized = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
			for (var i$1 = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0; i$1 < children.length; i$1++) unmount(children[i$1], parentComponent, parentSuspense, doRemove, optimized);
		};
		var getNextHostNode = (vnode) => {
			if (vnode.shapeFlag & 6) return getNextHostNode(vnode.component.subTree);
			if (vnode.shapeFlag & 128) return vnode.suspense.next();
			return hostNextSibling(vnode.anchor || vnode.el);
		};
		var isFlushing$1 = false;
		var render = (vnode, container, namespace) => {
			if (vnode == null) {
				if (container._vnode) unmount(container._vnode, null, null, true);
			} else {
				var _p = container.__vueParent;
				patch(container._vnode || null, vnode, container, null, _p, null, namespace);
			}
			if (!isFlushing$1) {
				isFlushing$1 = true;
				flushPreFlushCbs();
				isFlushing$1 = false;
			}
			container._vnode = vnode;
		};
		var internals = {
			p: patch,
			um: unmount,
			m: move,
			r: remove$1,
			mt: mountComponent,
			mc: mountChildren,
			pc: patchChildren,
			pbc: patchBlockChildren,
			n: getNextHostNode,
			o: options
		};
		var hydrate;
		var hydrateNode;
		if (createHydrationFns) [hydrate, hydrateNode] = createHydrationFns(internals);
		return {
			render,
			hydrate,
			createApp: createAppAPI(render, hydrate)
		};
	}
	function resolveChildrenNamespace(_ref14, currentNamespace) {
		var { type, props: props$30 } = _ref14;
		return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props$30 && props$30.encoding && props$30.encoding.includes("html") ? void 0 : currentNamespace;
	}
	function toggleRecurse(_ref15, allowed) {
		var { effect, update } = _ref15;
		effect.allowRecurse = update.allowRecurse = allowed;
	}
	function needTransition(parentSuspense, transition) {
		return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
	}
	function traverseStaticChildren(n1, n2) {
		var shallow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
		var ch1 = n1.children;
		var ch2 = n2.children;
		if (isArray(ch1) && isArray(ch2)) for (var i$1 = 0; i$1 < ch1.length; i$1++) {
			var c1 = ch1[i$1];
			var c2 = ch2[i$1];
			if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
				if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
					c2 = ch2[i$1] = cloneIfMounted(ch2[i$1]);
					c2.el = c1.el;
				}
				if (!shallow) traverseStaticChildren(c1, c2);
			}
			if (c2.type === Text) c2.el = c1.el;
		}
	}
	function getSequence(arr) {
		var p$2 = arr.slice();
		var result = [0];
		var i$1, j, u, v$1, c$1;
		var len = arr.length;
		for (i$1 = 0; i$1 < len; i$1++) {
			var arrI = arr[i$1];
			if (arrI !== 0) {
				j = result[result.length - 1];
				if (arr[j] < arrI) {
					p$2[i$1] = j;
					result.push(i$1);
					continue;
				}
				u = 0;
				v$1 = result.length - 1;
				while (u < v$1) {
					c$1 = u + v$1 >> 1;
					if (arr[result[c$1]] < arrI) u = c$1 + 1;
					else v$1 = c$1;
				}
				if (arrI < arr[result[u]]) {
					if (u > 0) p$2[i$1] = result[u - 1];
					result[u] = i$1;
				}
			}
		}
		u = result.length;
		v$1 = result[u - 1];
		while (u-- > 0) {
			result[u] = v$1;
			v$1 = p$2[v$1];
		}
		return result;
	}
	function locateNonHydratedAsyncRoot(instance) {
		var subComponent = instance.subTree.component;
		if (subComponent) if (subComponent.asyncDep && !subComponent.asyncResolved) return subComponent;
		else return locateNonHydratedAsyncRoot(subComponent);
	}
	var isTeleport = (type) => type.__isTeleport;
	var Fragment = Symbol.for("v-fgt");
	var Text = Symbol.for("v-txt");
	var Comment = Symbol.for("v-cmt");
	var Static = Symbol.for("v-stc");
	var blockStack = [];
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
		var { key: key$1 } = _ref19;
		return key$1 != null ? key$1 : null;
	};
	var normalizeRef = (_ref20) => {
		var { ref: ref$1, ref_key, ref_for } = _ref20;
		if (typeof ref$1 === "number") ref$1 = "" + ref$1;
		return ref$1 != null ? isString(ref$1) || isRef(ref$1) || isFunction(ref$1) ? {
			i: currentRenderingInstance,
			r: ref$1,
			k: ref_key,
			f: !!ref_for
		} : ref$1 : null;
	};
	function createBaseVNode(type) {
		var props$30 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
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
			props: props$30,
			key: props$30 && normalizeKey(props$30),
			ref: props$30 && normalizeRef(props$30),
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
			if (shapeFlag & 128) type.normalize(vnode);
		} else if (children) vnode.shapeFlag |= isString(children) ? 8 : 16;
		if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) currentBlock.push(vnode);
		return vnode;
	}
	var createVNode = _createVNode;
	function _createVNode(type) {
		var props$30 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
		var children = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
		var patchFlag = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
		var dynamicProps = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
		var isBlockNode = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : false;
		if (!type || type === NULL_DYNAMIC_COMPONENT) type = Comment;
		if (isVNode(type)) {
			var cloned = cloneVNode(type, props$30, true);
			if (children) normalizeChildren(cloned, children);
			if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) if (cloned.shapeFlag & 6) currentBlock[currentBlock.indexOf(type)] = cloned;
			else currentBlock.push(cloned);
			cloned.patchFlag |= -2;
			return cloned;
		}
		if (isClassComponent(type)) type = type.__vccOpts;
		if (props$30) {
			props$30 = guardReactiveProps(props$30);
			var { class: klass, style } = props$30;
			if (klass && !isString(klass)) props$30.class = normalizeClass(klass);
			if (isObject$1(style)) {
				if (isProxy(style) && !isArray(style)) style = extend({}, style);
				props$30.style = normalizeStyle(style);
			}
		}
		var shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction(type) ? 2 : 0;
		return createBaseVNode(type, props$30, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
	}
	function guardReactiveProps(props$30) {
		if (!props$30) return null;
		return isProxy(props$30) || InternalObjectKey in props$30 ? extend({}, props$30) : props$30;
	}
	function cloneVNode(vnode, extraProps) {
		var mergeRef = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
		var { props: props$30, ref: ref$1, patchFlag, children } = vnode;
		var mergedProps = extraProps ? mergeProps(props$30 || {}, extraProps) : props$30;
		return {
			__v_isVNode: true,
			__v_skip: true,
			type: vnode.type,
			props: mergedProps,
			key: mergedProps && normalizeKey(mergedProps),
			ref: extraProps && extraProps.ref ? mergeRef && ref$1 ? isArray(ref$1) ? ref$1.concat(normalizeRef(extraProps)) : [ref$1, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref$1,
			scopeId: vnode.scopeId,
			slotScopeIds: vnode.slotScopeIds,
			children,
			target: vnode.target,
			targetAnchor: vnode.targetAnchor,
			staticCount: vnode.staticCount,
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
			anchor: vnode.anchor,
			ctx: vnode.ctx,
			ce: vnode.ce
		};
	}
	function createTextVNode() {
		return createVNode(Text, null, arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : " ", arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0);
	}
	function normalizeVNode(child) {
		if (child == null || typeof child === "boolean") return createVNode(Comment);
		else if (isArray(child)) return createVNode(Fragment, null, child.slice());
		else if (typeof child === "object") return cloneIfMounted(child);
		else return createVNode(Text, null, String(child));
	}
	function cloneIfMounted(child) {
		return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
	}
	function normalizeChildren(vnode, children) {
		var type = 0;
		var { shapeFlag } = vnode;
		if (children == null) children = null;
		else if (isArray(children)) type = 16;
		else if (typeof children === "object") if (shapeFlag & 65) {
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
			if (!slotFlag && !(InternalObjectKey in children)) children._ctx = currentRenderingInstance;
			else if (slotFlag === 3 && currentRenderingInstance) if (currentRenderingInstance.slots._ === 1) children._ = 1;
			else {
				children._ = 2;
				vnode.patchFlag |= 1024;
			}
		}
		else if (isFunction(children)) {
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
			} else type = 8;
		}
		vnode.children = children;
		vnode.shapeFlag |= type;
	}
	function mergeProps() {
		var ret = {};
		for (var i$1 = 0; i$1 < arguments.length; i$1++) {
			var toMerge = i$1 < 0 || arguments.length <= i$1 ? void 0 : arguments[i$1];
			for (var key$1 in toMerge) if (key$1 === "class") {
				if (ret.class !== toMerge.class) ret.class = normalizeClass([ret.class, toMerge.class]);
			} else if (key$1 === "style") ret.style = normalizeStyle([ret.style, toMerge.style]);
			else if (isOn(key$1)) {
				var existing = ret[key$1];
				var incoming = toMerge[key$1];
				if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) ret[key$1] = existing ? [].concat(existing, incoming) : incoming;
			} else if (key$1 !== "") ret[key$1] = toMerge[key$1];
		}
		return ret;
	}
	function invokeVNodeHook(hook, instance, vnode) {
		callWithAsyncErrorHandling(hook, instance, 7, [vnode, arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null]);
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
			next: null,
			subTree: null,
			effect: null,
			update: null,
			scope: new EffectScope(true),
			render: null,
			proxy: null,
			exposed: null,
			exposeProxy: null,
			withProxy: null,
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
			attrsProxy: null,
			slotsProxy: null,
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
		instance.ctx = { _: instance };
		instance.root = parent ? parent.root : instance;
		instance.emit = emit$2.bind(null, instance);
		if (vnode.ce) vnode.ce(instance);
		return instance;
	}
	var currentInstance = null;
	var getCurrentInstance = () => currentInstance || currentRenderingInstance;
	var internalSetCurrentInstance;
	var setInSSRSetupState;
	var g$1 = getGlobalThis();
	var registerGlobalSetter = (key$1, setter) => {
		var setters;
		if (!(setters = g$1[key$1])) setters = g$1[key$1] = [];
		setters.push(setter);
		return (v$1) => {
			if (setters.length > 1) setters.forEach((set$1) => set$1(v$1));
			else setters[0](v$1);
		};
	};
	internalSetCurrentInstance = registerGlobalSetter("__VUE_INSTANCE_SETTERS__", (v$1) => currentInstance = v$1);
	setInSSRSetupState = registerGlobalSetter("__VUE_SSR_SETTERS__", (v$1) => isInSSRComponentSetup = v$1);
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
		var { props: props$30, children } = instance.vnode;
		var isStateful = isStatefulComponent(instance);
		initProps(instance, props$30, isStateful, isSSR);
		initSlots(instance, children);
		var setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
		isSSR && setInSSRSetupState(false);
		return setupResult;
	}
	function setupStatefulComponent(instance, isSSR) {
		var Component = instance.type;
		instance.accessCache = /* @__PURE__ */ Object.create(null);
		instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
		var { setup } = Component;
		if (setup) {
			var setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
			var reset = setCurrentInstance(instance);
			pauseTracking();
			var setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
			resetTracking();
			reset();
			if (isPromise(setupResult)) {
				setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
				if (isSSR) return setupResult.then((resolvedResult) => {
					handleSetupResult(instance, resolvedResult, isSSR);
				}).catch((e$1) => {
					handleError(e$1, instance, 0);
				});
				else instance.asyncDep = setupResult;
			} else handleSetupResult(instance, setupResult, isSSR);
		} else finishComponentSetup(instance, isSSR);
	}
	function handleSetupResult(instance, setupResult, isSSR) {
		if (isFunction(setupResult)) if (instance.type.__ssrInlineRender) instance.ssrRender = setupResult;
		else instance.render = setupResult;
		else if (isObject$1(setupResult)) instance.setupState = proxyRefs(setupResult);
		finishComponentSetup(instance, isSSR);
	}
	var compile;
	var installWithProxy;
	function finishComponentSetup(instance, isSSR, skipOptions) {
		var Component = instance.type;
		if (!instance.render) {
			if (!isSSR && compile && !Component.render) {
				var template = Component.template || resolveMergedOptions(instance).template;
				if (template) {
					var { isCustomElement, compilerOptions } = instance.appContext.config;
					var { delimiters, compilerOptions: componentCompilerOptions } = Component;
					Component.render = compile(template, extend(extend({
						isCustomElement,
						delimiters
					}, compilerOptions), componentCompilerOptions));
				}
			}
			instance.render = Component.render || NOOP;
			if (installWithProxy) installWithProxy(instance);
		}
		var reset = setCurrentInstance(instance);
		pauseTracking();
		try {
			applyOptions(instance);
		} finally {
			resetTracking();
			reset();
		}
	}
	function getAttrsProxy(instance) {
		return instance.attrsProxy || (instance.attrsProxy = new Proxy(instance.attrs, { get(target, key$1) {
			track(instance, "get", "$attrs");
			return target[key$1];
		} }));
	}
	function createSetupContext(instance) {
		var expose = (exposed) => {
			instance.exposed = exposed || {};
		};
		return {
			get attrs() {
				return getAttrsProxy(instance);
			},
			slots: instance.slots,
			emit: instance.emit,
			expose
		};
	}
	function getExposeProxy(instance) {
		if (instance.exposed) return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
			get(target, key$1) {
				if (key$1 in target) return target[key$1];
				else if (key$1 in publicPropertiesMap) return publicPropertiesMap[key$1](instance);
			},
			has(target, key$1) {
				return key$1 in target || key$1 in publicPropertiesMap;
			}
		}));
	}
	function isClassComponent(value) {
		return isFunction(value) && "__vccOpts" in value;
	}
	var computed = (getterOrOptions, debugOptions) => {
		return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
	};
	function h(type, propsOrChildren, children) {
		var l = arguments.length;
		if (l === 2) if (isObject$1(propsOrChildren) && !isArray(propsOrChildren)) {
			if (isVNode(propsOrChildren)) return createVNode(type, null, [propsOrChildren]);
			return createVNode(type, propsOrChildren);
		} else return createVNode(type, null, propsOrChildren);
		else {
			if (l > 3) children = Array.prototype.slice.call(arguments, 2);
			else if (l === 3 && isVNode(children)) children = [children];
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
			if (parent) parent.removeChild(child);
		},
		createElement: (tag, namespace, is$1, props$30) => {
			var el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : doc.createElement(tag, is$1 ? { is: is$1 } : void 0);
			if (tag === "select" && props$30 && props$30.multiple != null) el.setAttribute("multiple", props$30.multiple);
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
		setScopeId(el, id$1) {
			el.setAttribute(id$1, "");
		},
		insertStaticContent(content, parent, anchor, namespace, start, end) {
			var before = anchor ? anchor.previousSibling : parent.lastChild;
			if (start && (start === end || start.nextSibling)) while (true) {
				parent.insertBefore(start.cloneNode(true), anchor);
				if (start === end || !(start = start.nextSibling)) break;
			}
			else {
				templateContainer.innerHTML = namespace === "svg" ? "<svg>".concat(content, "</svg>") : namespace === "mathml" ? "<math>".concat(content, "</math>") : content;
				var template = templateContainer.content;
				if (namespace === "svg" || namespace === "mathml") {
					var wrapper$1 = template.firstChild;
					while (wrapper$1.firstChild) template.appendChild(wrapper$1.firstChild);
					template.removeChild(wrapper$1);
				}
				parent.insertBefore(template, anchor);
			}
			return [before ? before.nextSibling : parent.firstChild, anchor ? anchor.previousSibling : parent.lastChild];
		}
	};
	var TRANSITION = "transition";
	var ANIMATION = "animation";
	var vtcKey = Symbol("_vtc");
	var Transition = (props$30, _ref22) => {
		var { slots } = _ref22;
		return h(BaseTransition, resolveTransitionProps(props$30), slots);
	};
	Transition.displayName = "Transition";
	var DOMTransitionPropsValidators = {
		name: String,
		type: String,
		css: {
			type: Boolean,
			default: true
		},
		duration: [
			String,
			Number,
			Object
		],
		enterFromClass: String,
		enterActiveClass: String,
		enterToClass: String,
		appearFromClass: String,
		appearActiveClass: String,
		appearToClass: String,
		leaveFromClass: String,
		leaveActiveClass: String,
		leaveToClass: String
	};
	var TransitionPropsValidators = Transition.props = /* @__PURE__ */ extend({}, BaseTransitionPropsValidators, DOMTransitionPropsValidators);
	var callHook = function(hook) {
		var args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
		if (isArray(hook)) hook.forEach((h2) => h2(...args));
		else if (hook) hook(...args);
	};
	var hasExplicitCallback = (hook) => {
		return hook ? isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
	};
	function resolveTransitionProps(rawProps) {
		var baseProps = {};
		for (var key$1 in rawProps) if (!(key$1 in DOMTransitionPropsValidators)) baseProps[key$1] = rawProps[key$1];
		if (rawProps.css === false) return baseProps;
		var { name = "v", type, duration, enterFromClass = "".concat(name, "-enter-from"), enterActiveClass = "".concat(name, "-enter-active"), enterToClass = "".concat(name, "-enter-to"), appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = "".concat(name, "-leave-from"), leaveActiveClass = "".concat(name, "-leave-active"), leaveToClass = "".concat(name, "-leave-to") } = rawProps;
		var durations = normalizeDuration(duration);
		var enterDuration = durations && durations[0];
		var leaveDuration = durations && durations[1];
		var { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
		var finishEnter = (el, isAppear, done) => {
			removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
			removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
			done && done();
		};
		var finishLeave = (el, done) => {
			el._isLeaving = false;
			removeTransitionClass(el, leaveFromClass);
			removeTransitionClass(el, leaveToClass);
			removeTransitionClass(el, leaveActiveClass);
			done && done();
		};
		var makeEnterHook = (isAppear) => {
			return (el, done) => {
				var hook = isAppear ? onAppear : onEnter;
				var resolve = () => finishEnter(el, isAppear, done);
				callHook(hook, [el, resolve]);
				nextFrame(() => {
					removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
					addTransitionClass(el, isAppear ? appearToClass : enterToClass);
					if (!hasExplicitCallback(hook)) whenTransitionEnds(el, type, enterDuration, resolve);
				});
			};
		};
		return extend(baseProps, {
			onBeforeEnter(el) {
				callHook(onBeforeEnter, [el]);
				addTransitionClass(el, enterFromClass);
				addTransitionClass(el, enterActiveClass);
			},
			onBeforeAppear(el) {
				callHook(onBeforeAppear, [el]);
				addTransitionClass(el, appearFromClass);
				addTransitionClass(el, appearActiveClass);
			},
			onEnter: makeEnterHook(false),
			onAppear: makeEnterHook(true),
			onLeave(el, done) {
				el._isLeaving = true;
				var resolve = () => finishLeave(el, done);
				addTransitionClass(el, leaveFromClass);
				forceReflow();
				addTransitionClass(el, leaveActiveClass);
				nextFrame(() => {
					if (!el._isLeaving) return;
					removeTransitionClass(el, leaveFromClass);
					addTransitionClass(el, leaveToClass);
					if (!hasExplicitCallback(onLeave)) whenTransitionEnds(el, type, leaveDuration, resolve);
				});
				callHook(onLeave, [el, resolve]);
			},
			onEnterCancelled(el) {
				finishEnter(el, false);
				callHook(onEnterCancelled, [el]);
			},
			onAppearCancelled(el) {
				finishEnter(el, true);
				callHook(onAppearCancelled, [el]);
			},
			onLeaveCancelled(el) {
				finishLeave(el);
				callHook(onLeaveCancelled, [el]);
			}
		});
	}
	function normalizeDuration(duration) {
		if (duration == null) return null;
		else if (isObject$1(duration)) return [NumberOf(duration.enter), NumberOf(duration.leave)];
		else {
			var n = NumberOf(duration);
			return [n, n];
		}
	}
	function NumberOf(val) {
		return toNumber(val);
	}
	function addTransitionClass(el, cls) {
		cls.split(/\s+/).forEach((c$1) => c$1 && el.classList.add(c$1));
		(el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
	}
	function removeTransitionClass(el, cls) {
		cls.split(/\s+/).forEach((c$1) => c$1 && el.classList.remove(c$1));
		var _vtc = el[vtcKey];
		if (_vtc) {
			_vtc.delete(cls);
			if (!_vtc.size) el[vtcKey] = void 0;
		}
	}
	function nextFrame(cb) {
		requestAnimationFrame(() => {
			requestAnimationFrame(cb);
		});
	}
	var endId = 0;
	function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
		var id$1 = el._endId = ++endId;
		var resolveIfNotStale = () => {
			if (id$1 === el._endId) resolve();
		};
		if (explicitTimeout) return setTimeout(resolveIfNotStale, explicitTimeout);
		var { type, timeout, propCount } = getTransitionInfo(el, expectedType);
		if (!type) return resolve();
		var endEvent = type + "end";
		var ended = 0;
		var end = () => {
			el.removeEventListener(endEvent, onEnd);
			resolveIfNotStale();
		};
		var onEnd = (e$1) => {
			if (e$1.target === el && ++ended >= propCount) end();
		};
		setTimeout(() => {
			if (ended < propCount) end();
		}, timeout + 1);
		el.addEventListener(endEvent, onEnd);
	}
	function getTransitionInfo(el, expectedType) {
		var styles = window.getComputedStyle(el);
		var getStyleProperties = (key$1) => (styles[key$1] || "").split(", ");
		var transitionDelays = getStyleProperties("".concat(TRANSITION, "Delay"));
		var transitionDurations = getStyleProperties("".concat(TRANSITION, "Duration"));
		var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
		var animationDelays = getStyleProperties("".concat(ANIMATION, "Delay"));
		var animationDurations = getStyleProperties("".concat(ANIMATION, "Duration"));
		var animationTimeout = getTimeout(animationDelays, animationDurations);
		var type = null;
		var timeout = 0;
		var propCount = 0;
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
			type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
			propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
		}
		var hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(getStyleProperties("".concat(TRANSITION, "Property")).toString());
		return {
			type,
			timeout,
			propCount,
			hasTransform
		};
	}
	function getTimeout(delays, durations) {
		while (delays.length < durations.length) delays = delays.concat(delays);
		return Math.max(...durations.map((d, i$1) => toMs(d) + toMs(delays[i$1])));
	}
	function toMs(s) {
		if (s === "auto") return 0;
		return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
	}
	function forceReflow() {
		return document.body.offsetHeight;
	}
	function patchClass$1(el, value, isSVG) {
		var transitionClasses = el[vtcKey];
		if (transitionClasses) value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
		if (value == null) el.removeAttribute("class");
		else if (isSVG) el.setAttribute("class", value);
		else el.className = value;
	}
	var vShowOriginalDisplay = Symbol("_vod");
	var vShowHidden = Symbol("_vsh");
	var vShow = {
		beforeMount(el, _ref23, _ref24) {
			var { value } = _ref23;
			var { transition } = _ref24;
			el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
			if (transition && value) transition.beforeEnter(el);
			else setDisplay(el, value);
		},
		mounted(el, _ref25, _ref26) {
			var { value } = _ref25;
			var { transition } = _ref26;
			if (transition && value) transition.enter(el);
		},
		updated(el, _ref27, _ref28) {
			var { value, oldValue } = _ref27;
			var { transition } = _ref28;
			if (!value === !oldValue) return;
			if (transition) if (value) {
				transition.beforeEnter(el);
				setDisplay(el, true);
				transition.enter(el);
			} else transition.leave(el, () => {
				setDisplay(el, false);
			});
			else setDisplay(el, value);
		},
		beforeUnmount(el, _ref29) {
			var { value } = _ref29;
			setDisplay(el, value);
		}
	};
	function setDisplay(el, value) {
		el.style.display = value ? el[vShowOriginalDisplay] : "none";
		el[vShowHidden] = !value;
	}
	var CSS_VAR_TEXT = Symbol("");
	var displayRE = /(^|;)\s*display\s*:/;
	function patchStyle$1(el, prev, next) {
		var style = el.style;
		var isCssString = isString(next);
		var hasControlledDisplay = false;
		if (next && !isCssString) {
			if (prev) if (!isString(prev)) {
				for (var key$1 in prev) if (next[key$1] == null) setStyle$1(style, key$1, "");
			} else for (var prevStyle of prev.split(";")) {
				var _key21 = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
				if (next[_key21] == null) setStyle$1(style, _key21, "");
			}
			for (var _key22 in next) {
				if (_key22 === "display") hasControlledDisplay = true;
				setStyle$1(style, _key22, next[_key22]);
			}
		} else if (isCssString) {
			if (prev !== next) {
				var cssVarText = style[CSS_VAR_TEXT];
				if (cssVarText) next += ";" + cssVarText;
				style.cssText = normalizeStyleValue(next);
				hasControlledDisplay = displayRE.test(next);
			}
		} else if (prev) el.removeAttribute("style");
		if (vShowOriginalDisplay in el) {
			el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
			if (el[vShowHidden]) style.display = "none";
		}
	}
	var importantRE$1 = /\s*!important$/;
	function setStyle$1(style, name, val) {
		if (isArray(val)) val.forEach((v$1) => setStyle$1(style, name, v$1));
		else {
			if (val == null) val = "";
			val = normalizeStyleValue(val);
			if (name.startsWith("--")) style.setProperty(name, val);
			else {
				var prefixed = normalizeStyleName(style, name);
				if (importantRE$1.test(val)) style.setProperty(hyphenate(prefixed), val.replace(importantRE$1, ""), "important");
				else style[prefixed] = val;
			}
		}
	}
	var xlinkNS = "http://www.w3.org/1999/xlink";
	function patchAttr(el, key$1, value, isSVG, instance) {
		if (isSVG && key$1.startsWith("xlink:")) if (value == null) el.removeAttributeNS(xlinkNS, key$1.slice(6, key$1.length));
		else el.setAttributeNS(xlinkNS, key$1, value);
		else {
			var _isBoolean = isSpecialBooleanAttr(key$1);
			if (value == null || _isBoolean && !includeBooleanAttr(value)) el.removeAttribute(key$1);
			else el.setAttribute(key$1, _isBoolean ? "" : value);
		}
	}
	function patchDOMProp(el, key$1, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
		if (key$1 === "innerHTML" || key$1 === "textContent") {
			if (prevChildren) unmountChildren(prevChildren, parentComponent, parentSuspense);
			el[key$1] = value == null ? "" : value;
			return;
		}
		var tag = el.tagName;
		if (key$1 === "value" && tag !== "PROGRESS" && !tag.includes("-")) {
			var oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
			var newValue = value == null ? "" : value;
			if (oldValue !== newValue || !("_value" in el)) el.value = newValue;
			if (value == null) el.removeAttribute(key$1);
			el._value = value;
			return;
		}
		var needRemove = false;
		if (value === "" || value == null) {
			var type = typeof el[key$1];
			if (type === "boolean") value = includeBooleanAttr(value);
			else if (value == null && type === "string") {
				value = "";
				needRemove = true;
			} else if (type === "number") {
				value = 0;
				needRemove = true;
			}
		}
		try {
			el[key$1] = value;
		} catch (e$1) {}
		needRemove && el.removeAttribute(key$1);
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
		if (nextValue && existingInvoker) existingInvoker.value = nextValue;
		else {
			var [name, options] = parseName(rawName);
			if (nextValue) addEventListener(el, name, invokers[rawName] = createInvoker$1(nextValue, instance), options);
			else if (existingInvoker) {
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
		return [name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2)), options];
	}
	var cachedNow = 0;
	var p$1 = /* @__PURE__ */ Promise.resolve();
	var getNow = () => cachedNow || (p$1.then(() => cachedNow = 0), cachedNow = Date.now());
	function createInvoker$1(initialValue, instance) {
		var invoker = (e$1) => {
			if (!e$1._vts) e$1._vts = Date.now();
			else if (e$1._vts <= invoker.attached) return;
			callWithAsyncErrorHandling(patchStopImmediatePropagation(e$1, invoker.value), instance, 5, [e$1]);
		};
		invoker.value = initialValue;
		invoker.attached = getNow();
		return invoker;
	}
	function patchStopImmediatePropagation(e$1, value) {
		if (isArray(value)) {
			var originalStop = e$1.stopImmediatePropagation;
			e$1.stopImmediatePropagation = () => {
				originalStop.call(e$1);
				e$1._stopped = true;
			};
			return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
		} else return value;
	}
	var isNativeOn = (key$1) => key$1.charCodeAt(0) === 111 && key$1.charCodeAt(1) === 110 && key$1.charCodeAt(2) > 96 && key$1.charCodeAt(2) < 123;
	var patchProp = (el, key$1, prevValue, nextValue, namespace, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
		var isSVG = namespace === "svg";
		if (key$1 === "class") patchClass$1(el, nextValue, isSVG);
		else if (key$1 === "style") patchStyle$1(el, prevValue, nextValue);
		else if (isOn(key$1)) {
			if (!isModelListener(key$1)) patchEvent$1(el, key$1, prevValue, nextValue, parentComponent);
		} else if (key$1[0] === "." ? (key$1 = key$1.slice(1), true) : key$1[0] === "^" ? (key$1 = key$1.slice(1), false) : shouldSetAsProp(el, key$1, nextValue, isSVG)) patchDOMProp(el, key$1, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
		else {
			if (key$1 === "true-value") el._trueValue = nextValue;
			else if (key$1 === "false-value") el._falseValue = nextValue;
			patchAttr(el, key$1, nextValue, isSVG);
		}
	};
	function shouldSetAsProp(el, key$1, value, isSVG) {
		if (isSVG) {
			if (key$1 === "innerHTML" || key$1 === "textContent") return true;
			if (key$1 in el && isNativeOn(key$1) && isFunction(value)) return true;
			return false;
		}
		if (key$1 === "spellcheck" || key$1 === "draggable" || key$1 === "translate") return false;
		if (key$1 === "form") return false;
		if (key$1 === "list" && el.tagName === "INPUT") return false;
		if (key$1 === "type" && el.tagName === "TEXTAREA") return false;
		if (key$1 === "width" || key$1 === "height") {
			var tag = el.tagName;
			if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") return false;
		}
		if (isNativeOn(key$1) && isString(value)) return false;
		return key$1 in el;
	}
	var positionMap = /* @__PURE__ */ new WeakMap();
	var newPositionMap = /* @__PURE__ */ new WeakMap();
	var moveCbKey = Symbol("_moveCb");
	var enterCbKey = Symbol("_enterCb");
	({
		name: "TransitionGroup",
		props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
			tag: String,
			moveClass: String
		}),
		setup(props$30, _ref31) {
			var { slots } = _ref31;
			var instance = getCurrentInstance();
			var state = useTransitionState();
			var prevChildren;
			var children;
			onUpdated(() => {
				if (!prevChildren.length) return;
				var moveClass = props$30.moveClass || "".concat(props$30.name || "v", "-move");
				if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) return;
				prevChildren.forEach(callPendingCbs);
				prevChildren.forEach(recordPosition);
				var movedChildren = prevChildren.filter(applyTranslation);
				forceReflow();
				movedChildren.forEach((c$1) => {
					var el = c$1.el;
					var style = el.style;
					addTransitionClass(el, moveClass);
					style.transform = style.webkitTransform = style.transitionDuration = "";
					var cb = el[moveCbKey] = (e$1) => {
						if (e$1 && e$1.target !== el) return;
						if (!e$1 || /transform$/.test(e$1.propertyName)) {
							el.removeEventListener("transitionend", cb);
							el[moveCbKey] = null;
							removeTransitionClass(el, moveClass);
						}
					};
					el.addEventListener("transitionend", cb);
				});
			});
			return () => {
				var rawProps = toRaw(props$30);
				var cssTransitionProps = resolveTransitionProps(rawProps);
				var tag = rawProps.tag || Fragment;
				prevChildren = children;
				children = slots.default ? getTransitionRawChildren(slots.default()) : [];
				for (var i$1 = 0; i$1 < children.length; i$1++) {
					var child = children[i$1];
					if (child.key != null) setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
				}
				if (prevChildren) for (var _i5 = 0; _i5 < prevChildren.length; _i5++) {
					var _child = prevChildren[_i5];
					setTransitionHooks(_child, resolveTransitionHooks(_child, cssTransitionProps, state, instance));
					positionMap.set(_child, _child.el.getBoundingClientRect());
				}
				return createVNode(tag, null, children);
			};
		}
	}).props;
	function callPendingCbs(c$1) {
		var el = c$1.el;
		if (el[moveCbKey]) el[moveCbKey]();
		if (el[enterCbKey]) el[enterCbKey]();
	}
	function recordPosition(c$1) {
		newPositionMap.set(c$1, c$1.el.getBoundingClientRect());
	}
	function applyTranslation(c$1) {
		var oldPos = positionMap.get(c$1);
		var newPos = newPositionMap.get(c$1);
		var dx = oldPos.left - newPos.left;
		var dy = oldPos.top - newPos.top;
		if (dx || dy) {
			var s = c$1.el.style;
			s.transform = s.webkitTransform = "translate(".concat(dx, "px,").concat(dy, "px)");
			s.transitionDuration = "0s";
			return c$1;
		}
	}
	function hasCSSTransform(el, root, moveClass) {
		var clone = el.cloneNode();
		var _vtc = el[vtcKey];
		if (_vtc) _vtc.forEach((cls) => {
			cls.split(/\s+/).forEach((c$1) => c$1 && clone.classList.remove(c$1));
		});
		moveClass.split(/\s+/).forEach((c$1) => c$1 && clone.classList.add(c$1));
		clone.style.display = "none";
		var container = root.nodeType === 1 ? root : root.parentNode;
		container.appendChild(clone);
		var { hasTransform } = getTransitionInfo(clone);
		container.removeChild(clone);
		return hasTransform;
	}
	var systemModifiers = [
		"ctrl",
		"shift",
		"alt",
		"meta"
	];
	var modifierGuards = {
		stop: (e$1) => e$1.stopPropagation(),
		prevent: (e$1) => e$1.preventDefault(),
		self: (e$1) => e$1.target !== e$1.currentTarget,
		ctrl: (e$1) => !e$1.ctrlKey,
		shift: (e$1) => !e$1.shiftKey,
		alt: (e$1) => !e$1.altKey,
		meta: (e$1) => !e$1.metaKey,
		left: (e$1) => "button" in e$1 && e$1.button !== 0,
		middle: (e$1) => "button" in e$1 && e$1.button !== 1,
		right: (e$1) => "button" in e$1 && e$1.button !== 2,
		exact: (e$1, modifiers) => systemModifiers.some((m) => e$1["".concat(m, "Key")] && !modifiers.includes(m))
	};
	var withModifiers = (fn, modifiers) => {
		var cache$1 = fn._withMods || (fn._withMods = {});
		var cacheKey = modifiers.join(".");
		return cache$1[cacheKey] || (cache$1[cacheKey] = function(event) {
			for (var i$1 = 0; i$1 < modifiers.length; i$1++) {
				var guard = modifierGuards[modifiers[i$1]];
				if (guard && guard(event, modifiers)) return;
			}
			for (var _len13 = arguments.length, args = new Array(_len13 > 1 ? _len13 - 1 : 0), _key25 = 1; _key25 < _len13; _key25++) args[_key25 - 1] = arguments[_key25];
			return fn(event, ...args);
		});
	};
	var rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
	var renderer;
	function ensureRenderer() {
		return renderer || (renderer = createRenderer(rendererOptions));
	}
	var createApp = function() {
		var app = ensureRenderer().createApp(...arguments);
		var { mount } = app;
		app.mount = (containerOrSelector) => {
			var container = normalizeContainer(containerOrSelector);
			if (!container) return;
			var component = app._component;
			if (!isFunction(component) && !component.render && !component.template) component.template = container.innerHTML;
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
		if (container instanceof SVGElement) return "svg";
		if (typeof MathMLElement === "function" && container instanceof MathMLElement) return "mathml";
	}
	function normalizeContainer(container) {
		if (isString(container)) return document.querySelector(container);
		return container;
	}
	var require_out = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var attrs = [
			"top",
			"left",
			"right",
			"bottom"
		];
		var inited$1;
		var elementComputedStyle = {};
		var support;
		function getSupport() {
			if (!("CSS" in window) || typeof CSS.supports != "function") support = "";
			else if (CSS.supports("top: env(safe-area-inset-top)")) support = "env";
			else if (CSS.supports("top: constant(safe-area-inset-top)")) support = "constant";
			else support = "";
			return support;
		}
		function init() {
			support = typeof support === "string" ? support : getSupport();
			if (!support) {
				attrs.forEach(function(attr$1) {
					elementComputedStyle[attr$1] = 0;
				});
				return;
			}
			function setStyle$2(el, style) {
				var elStyle = el.style;
				Object.keys(style).forEach(function(key$1) {
					elStyle[key$1] = style[key$1];
				});
			}
			var cbs = [];
			function parentReady(callback) {
				if (callback) cbs.push(callback);
				else cbs.forEach(function(cb) {
					cb();
				});
			}
			var passiveEvents = false;
			try {
				var opts = Object.defineProperty({}, "passive", { get: function() {
					passiveEvents = { passive: true };
				} });
				window.addEventListener("test", null, opts);
			} catch (e$1) {}
			function addChild(parent, attr$1) {
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
					paddingBottom: support + "(safe-area-inset-" + attr$1 + ")"
				};
				setStyle$2(a1, aStyle);
				setStyle$2(a2, aStyle);
				setStyle$2(a1Children, {
					transition: "0s",
					animation: "none",
					width: "400px",
					height: "400px"
				});
				setStyle$2(a2Children, {
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
						if (this.scrollTop === (this === a1 ? a1LastScrollTop : a2LastScrollTop)) return;
						a1.scrollTop = a2.scrollTop = MAX;
						a1LastScrollTop = a1.scrollTop;
						a2LastScrollTop = a2.scrollTop;
						attrChange(attr$1);
					}
					a1.addEventListener("scroll", onScroll, passiveEvents);
					a2.addEventListener("scroll", onScroll, passiveEvents);
				});
				var computedStyle = getComputedStyle(a1);
				Object.defineProperty(elementComputedStyle, attr$1, {
					configurable: true,
					get: function() {
						return parseFloat(computedStyle.paddingBottom);
					}
				});
			}
			var parentDiv = document.createElement("div");
			setStyle$2(parentDiv, {
				position: "absolute",
				left: "0",
				top: "0",
				width: "0",
				height: "0",
				zIndex: "-1",
				overflow: "hidden",
				visibility: "hidden"
			});
			attrs.forEach(function(key$1) {
				addChild(parentDiv, key$1);
			});
			document.body.appendChild(parentDiv);
			parentReady();
			inited$1 = true;
		}
		function getAttr(attr$1) {
			if (!inited$1) init();
			return elementComputedStyle[attr$1];
		}
		var changeAttrs = [];
		function attrChange(attr$1) {
			if (!changeAttrs.length) setTimeout(function() {
				var style = {};
				changeAttrs.forEach(function(attr$2) {
					style[attr$2] = elementComputedStyle[attr$2];
				});
				changeAttrs.length = 0;
				callbacks.forEach(function(callback) {
					callback(style);
				});
			}, 0);
			changeAttrs.push(attr$1);
		}
		var callbacks = [];
		function onChange(callback) {
			if (!getSupport()) return;
			if (!inited$1) init();
			if (typeof callback === "function") callbacks.push(callback);
		}
		function offChange(callback) {
			var index$3 = callbacks.indexOf(callback);
			if (index$3 >= 0) callbacks.splice(index$3, 1);
		}
		module.exports = {
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
	}));
	init_web_dom_iterable();
	var import_out = /* @__PURE__ */ __toESM(require_out());
	var onEventPrevent = /* @__PURE__ */ withModifiers(() => {}, ["prevent"]);
	function getWindowOffsetCssVar(style, name) {
		return parseInt((style.getPropertyValue(name).match(/\d+/) || ["0"])[0]);
	}
	function getWindowTop() {
		var style = document.documentElement.style;
		var top = getWindowOffsetCssVar(style, "--window-top");
		return top ? top + import_out.default.top : 0;
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
			bottom: bottom ? bottom + import_out.default.bottom : 0,
			left: left ? left + import_out.default.left : 0,
			right: right ? right + import_out.default.right : 0,
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
	function hasRpx(str) {
		str = str + "";
		return str.indexOf("rpx") !== -1 || str.indexOf("upx") !== -1;
	}
	function rpx2px(str) {
		if (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false) return rpx2pxWithReplace(str);
		if (isString(str)) {
			var res = parseInt(str) || 0;
			if (hasRpx(str)) return uni.upx2px(res);
			return res;
		}
		return str;
	}
	function rpx2pxWithReplace(str) {
		if (!hasRpx(str)) return str;
		return str.replace(/(\d+(\.\d+)?)[ru]px/g, (_a, b) => {
			return uni.upx2px(parseFloat(b)) + "px";
		});
	}
	function isBuiltInElement(target) {
		return target.tagName.indexOf("UNI-") === 0;
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
	var ICON_PATH_BACK = "M21.781 7.844l-9.063 8.594 9.063 8.594q0.25 0.25 0.25 0.609t-0.25 0.578q-0.25 0.25-0.578 0.25t-0.578-0.25l-9.625-9.125q-0.156-0.125-0.203-0.297t-0.047-0.359q0-0.156 0.047-0.328t0.203-0.297l9.625-9.125q0.25-0.25 0.578-0.25t0.578 0.25q0.25 0.219 0.25 0.578t-0.25 0.578z";
	var ICON_PATH_CLOSE = "M17.25 16.156l7.375-7.313q0.281-0.281 0.281-0.641t-0.281-0.641q-0.25-0.25-0.625-0.25t-0.625 0.25l-7.375 7.344-7.313-7.344q-0.25-0.25-0.625-0.25t-0.625 0.25q-0.281 0.25-0.281 0.625t0.281 0.625l7.313 7.344-7.375 7.344q-0.281 0.25-0.281 0.625t0.281 0.625q0.125 0.125 0.281 0.188t0.344 0.063q0.156 0 0.328-0.063t0.297-0.188l7.375-7.344 7.375 7.406q0.125 0.156 0.297 0.219t0.328 0.063q0.188 0 0.344-0.078t0.281-0.203q0.281-0.25 0.281-0.609t-0.281-0.641l-7.375-7.406z";
	var ICON_PATH_CONFIRM = "M31.562 4.9966666659375q0.435 0.399 0.435 0.87 0.036 0.58-0.399 0.98l-18.61 19.917q-0.145 0.145-0.327 0.217-0.073 0.037-0.145 0.11-0.254 0.035-0.472 0.035-0.29 0-0.544-0.036l-0.145-0.072q-0.109-0.073-0.217-0.182l-0.11-0.072L0.363 16.2786666659375q-0.327-0.399-0.363-0.907 0-0.544 0.363-1.016 0.435-0.326 0.961-0.362 0.527-0.036 0.962 0.362l9.722 9.542L29.712 5.0326666659375q0.399-0.363 0.943-0.363 0.544-0.036 0.907 0.327z";
	function createSvgIconVNode(path) {
		var color = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "#000";
		var size$1 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 27;
		return createVNode("svg", {
			width: size$1,
			height: size$1,
			viewBox: "0 0 32 32"
		}, [createVNode("path", {
			d: path,
			fill: color
		}, null, 8, ["d", "fill"])], 8, ["width", "height"]);
	}
	function useCurrentPageId() {
		return getCurrentPageId();
	}
	function getCurrentPage() {
		return window.__PAGE_INFO__;
	}
	function getCurrentPageId() {
		if (!window.__id__) window.__id__ = plus.webview.currentWebview().id;
		return parseInt(window.__id__);
	}
	function disableScrollListener(evt) {
		evt.preventDefault();
	}
	var testReachBottomTimer;
	var lastScrollHeight = 0;
	function createScrollListener(_ref) {
		var { onPageScroll, onReachBottom, onReachBottomDistance } = _ref;
		var ticking = false;
		var hasReachBottom = false;
		var reachBottomLocking = true;
		var isReachBottom = () => {
			var { scrollHeight } = document.documentElement;
			var windowHeight = window.innerHeight;
			var scrollY = window.scrollY;
			var isBottom = scrollY > 0 && scrollHeight > windowHeight && scrollY + windowHeight + onReachBottomDistance >= scrollHeight;
			var heightChanged = Math.abs(scrollHeight - lastScrollHeight) > onReachBottomDistance;
			if (isBottom && (!hasReachBottom || heightChanged)) {
				lastScrollHeight = scrollHeight;
				hasReachBottom = true;
				return true;
			}
			if (!isBottom && hasReachBottom) hasReachBottom = false;
			return false;
		};
		var trigger$1 = () => {
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
			if (onReachBottom && reachBottomLocking) if (testReachBottom()) {} else testReachBottomTimer = setTimeout(testReachBottom, 300);
			ticking = false;
		};
		return function onScroll() {
			clearTimeout(testReachBottomTimer);
			if (!ticking) requestAnimationFrame(trigger$1);
			ticking = true;
		};
	}
	function getRealRoute(fromRoute, toRoute) {
		if (toRoute.indexOf("/") === 0) return toRoute;
		if (toRoute.indexOf("./") === 0) return getRealRoute(fromRoute, toRoute.slice(2));
		var toRouteArray = toRoute.split("/");
		var toRouteLength = toRouteArray.length;
		var i$1 = 0;
		for (; i$1 < toRouteLength && toRouteArray[i$1] === ".."; i$1++);
		toRouteArray.splice(0, i$1);
		toRoute = toRouteArray.join("/");
		var fromRouteArray = fromRoute.length > 0 ? fromRoute.split("/") : [];
		fromRouteArray.splice(fromRouteArray.length - i$1 - 1, i$1 + 1);
		return addLeadingSlash(fromRouteArray.concat(toRouteArray).join("/"));
	}
	function initView() {
		useRem();
		initCustomDatasetOnce(isBuiltInElement);
		initLongPress();
	}
	var ComponentDescriptor = class {
		constructor(vm) {
			this.$bindClass = false;
			this.$bindStyle = false;
			this.$vm = vm;
			this.$el = vm.$el;
			if (this.$el.getAttribute) {
				this.$bindClass = !!this.$el.getAttribute("class");
				this.$bindStyle = !!this.$el.getAttribute("style");
			}
		}
		selectComponent(selector) {
			if (!this.$el || !selector) return;
			var wxsVm = getWxsVm(this.$el.querySelector(selector));
			if (!wxsVm) return;
			return createComponentDescriptor(wxsVm, false);
		}
		selectAllComponents(selector) {
			if (!this.$el || !selector) return [];
			var descriptors = [];
			var els = this.$el.querySelectorAll(selector);
			for (var i$1 = 0; i$1 < els.length; i$1++) {
				var wxsVm = getWxsVm(els[i$1]);
				if (wxsVm) descriptors.push(createComponentDescriptor(wxsVm, false));
			}
			return descriptors;
		}
		forceUpdate(type) {
			if (type === "class") if (this.$bindClass) {
				this.$el.__wxsClassChanged = true;
				this.$vm.$forceUpdate();
			} else this.updateWxsClass();
			else if (type === "style") if (this.$bindStyle) {
				this.$el.__wxsStyleChanged = true;
				this.$vm.$forceUpdate();
			} else this.updateWxsStyle();
		}
		updateWxsClass() {
			var { __wxsAddClass } = this.$el;
			if (__wxsAddClass.length) this.$el.className = __wxsAddClass.join(" ");
		}
		updateWxsStyle() {
			var { __wxsStyle } = this.$el;
			if (__wxsStyle) this.$el.setAttribute("style", stringifyStyle(__wxsStyle));
		}
		setStyle(style) {
			if (!this.$el || !style) return this;
			if (isString(style)) style = parseStringStyle(style);
			if (isPlainObject(style)) {
				this.$el.__wxsStyle = style;
				this.forceUpdate("style");
			}
			return this;
		}
		addClass(clazz) {
			if (!this.$el || !clazz) return this;
			var __wxsAddClass = this.$el.__wxsAddClass || (this.$el.__wxsAddClass = []);
			if (__wxsAddClass.indexOf(clazz) === -1) {
				__wxsAddClass.push(clazz);
				this.forceUpdate("class");
			}
			return this;
		}
		removeClass(clazz) {
			if (!this.$el || !clazz) return this;
			var { __wxsAddClass } = this.$el;
			if (__wxsAddClass) {
				var index$3 = __wxsAddClass.indexOf(clazz);
				if (index$3 > -1) __wxsAddClass.splice(index$3, 1);
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
			if (isFunction(func)) func(JSON.parse(JSON.stringify(args)));
			else if (this.$vm.ownerId) UniViewJSBridge.publishHandler(ON_WXS_INVOKE_CALL_METHOD, {
				nodeId: this.$el.__id,
				ownerId: this.$vm.ownerId,
				method: funcName,
				args
			});
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
				if (names && names.length) return names.reduce((res, n) => {
					res[n] = styles[n];
					return res;
				}, {});
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
	};
	function createComponentDescriptor(vm) {
		arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
		if (vm && vm.$el) {
			if (!vm.$el.__wxsComponentDescriptor) vm.$el.__wxsComponentDescriptor = new ComponentDescriptor(vm);
			return vm.$el.__wxsComponentDescriptor;
		}
	}
	function getComponentDescriptor(instance, isOwnerInstance) {
		return createComponentDescriptor(instance, isOwnerInstance);
	}
	function getWxsVm(el) {
		if (!el) return;
		return createComponentDescriptorVm(el);
	}
	function createComponentDescriptorVm(el) {
		return el.__wxsVm || (el.__wxsVm = {
			ownerId: el.__ownerId,
			$el: el,
			$emit() {},
			$forceUpdate() {
				var { __wxsStyle, __wxsAddClass, __wxsRemoveClass, __wxsStyleChanged, __wxsClassChanged } = el;
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
		var { currentTarget } = evt;
		if (!(evt instanceof Event) || !(currentTarget instanceof HTMLElement)) return [evt];
		var res = createNativeEvent(evt, !isBuiltInElement(currentTarget));
		if (isClickEvent(evt)) normalizeClickEvent(res, evt);
		else if (isMouseEvent(evt)) normalizeMouseEvent(res, evt);
		else if (isTouchEvent(evt)) {
			var top = getWindowTop();
			res.touches = normalizeTouchEvent(evt.touches, top);
			res.changedTouches = normalizeTouchEvent(evt.changedTouches, top);
		} else if (isKeyboardEvent(evt)) ["key", "code"].forEach((key$1) => {
			Object.defineProperty(res, key$1, { get() {
				return evt[key$1];
			} });
		});
		return [res];
	}
	function findUniTarget(target) {
		while (!isBuiltInElement(target)) target = target.parentElement;
		return target;
	}
	function createNativeEvent(evt) {
		var htmlElement = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
		var { type, timeStamp, target, currentTarget } = evt;
		var event = {
			type,
			timeStamp,
			target: normalizeTarget(htmlElement ? target : findUniTarget(target)),
			detail: {},
			currentTarget: normalizeTarget(currentTarget)
		};
		if (evt instanceof CustomEvent && isPlainObject(evt.detail)) event.detail = evt.detail;
		if (evt._stopped) event._stopped = true;
		if (evt.type.startsWith("touch")) {
			event.touches = evt.touches;
			event.changedTouches = evt.changedTouches;
		}
		return event;
	}
	function normalizeClickEvent(evt, mouseEvt) {
		var { x, y } = mouseEvt;
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
		for (var i$1 = 0; i$1 < touches.length; i$1++) {
			var { identifier, pageX, pageY, clientX, clientY, force } = touches[i$1];
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
		for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
		if (uni.__log__) uni.__log__(type, filename, ...args);
		else console[type].apply(console, [...args, filename]);
	}
	var VD_SYNC = "vdSync";
	var APP_SERVICE_ID = "__uniapp__service";
	var ON_WEBVIEW_READY = "onWebviewReady";
	var WEBVIEW_INSERTED = "webviewInserted";
	var WEBVIEW_REMOVED = "webviewRemoved";
	var API_SET_LOCALE = "setLocale";
	var UniViewJSBridge$1 = /* @__PURE__ */ extend(ViewJSBridge, { publishHandler });
	function publishHandler(event) {
		var args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		var pageId = getCurrentPageId() + "";
		plus.webview.postMessageToUniNView({
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
		if (!options || !options.formatArgs || !isPlainObject(options.formatArgs) && isPlainObject(params)) return;
		var formatArgs = options.formatArgs;
		var keys = Object.keys(formatArgs);
		for (var i$1 = 0; i$1 < keys.length; i$1++) {
			var name = keys[i$1];
			var formatterOrDefaultValue = formatArgs[name];
			if (isFunction(formatterOrDefaultValue)) {
				var errMsg = formatterOrDefaultValue(args[0][name], params);
				if (isString(errMsg)) return errMsg;
			} else if (!hasOwn(params, name)) params[name] = formatterOrDefaultValue;
		}
	}
	function beforeInvokeApi(name, args, protocol, options) {
		if (options && options.beforeInvoke) {
			var _errMsg = options.beforeInvoke(args);
			if (isString(_errMsg)) return _errMsg;
		}
		var errMsg = formatApiArgs(args, options);
		if (errMsg) return errMsg;
	}
	function wrapperSyncApi(name, fn, protocol, options) {
		return function() {
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			var errMsg = beforeInvokeApi(name, args, protocol, options);
			if (errMsg) throw new Error(errMsg);
			return fn.apply(null, args);
		};
	}
	function defineSyncApi(name, fn, protocol, options) {
		return wrapperSyncApi(name, fn, void 0, options);
	}
	function getBaseSystemInfo() {
		if (typeof __SYSTEM_INFO__ !== "undefined") return window.__SYSTEM_INFO__;
		return {
			platform: "harmonyos",
			pixelRatio: vp2px(1),
			windowWidth: lpx2px(720)
		};
	}
	var require_common = /* @__PURE__ */ __commonJSMin(((exports) => {
		var TYPED_OK = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
		function _has(obj, key$1) {
			return Object.prototype.hasOwnProperty.call(obj, key$1);
		}
		exports.assign = function(obj) {
			var sources = Array.prototype.slice.call(arguments, 1);
			while (sources.length) {
				var source = sources.shift();
				if (!source) continue;
				if (typeof source !== "object") throw new TypeError(source + "must be non-object");
				for (var p$2 in source) if (_has(source, p$2)) obj[p$2] = source[p$2];
			}
			return obj;
		};
		exports.shrinkBuf = function(buf, size$1) {
			if (buf.length === size$1) return buf;
			if (buf.subarray) return buf.subarray(0, size$1);
			buf.length = size$1;
			return buf;
		};
		var fnTyped = {
			arraySet: function(dest, src, src_offs, len, dest_offs) {
				if (src.subarray && dest.subarray) {
					dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
					return;
				}
				for (var i$1 = 0; i$1 < len; i$1++) dest[dest_offs + i$1] = src[src_offs + i$1];
			},
			flattenChunks: function(chunks) {
				var i$1, l, len = 0, pos, chunk, result;
				for (i$1 = 0, l = chunks.length; i$1 < l; i$1++) len += chunks[i$1].length;
				result = new Uint8Array(len);
				pos = 0;
				for (i$1 = 0, l = chunks.length; i$1 < l; i$1++) {
					chunk = chunks[i$1];
					result.set(chunk, pos);
					pos += chunk.length;
				}
				return result;
			}
		};
		var fnUntyped = {
			arraySet: function(dest, src, src_offs, len, dest_offs) {
				for (var i$1 = 0; i$1 < len; i$1++) dest[dest_offs + i$1] = src[src_offs + i$1];
			},
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
	}));
	var require_trees = /* @__PURE__ */ __commonJSMin(((exports) => {
		var utils$6 = require_common();
		var Z_FIXED$1 = 4;
		var Z_BINARY = 0;
		var Z_TEXT = 1;
		var Z_UNKNOWN$1 = 2;
		function zero$1(buf) {
			var len = buf.length;
			while (--len >= 0) buf[len] = 0;
		}
		var STORED_BLOCK = 0;
		var STATIC_TREES = 1;
		var DYN_TREES = 2;
		var MIN_MATCH$1 = 3;
		var MAX_MATCH$1 = 258;
		var LENGTH_CODES = 29;
		var LITERALS = 256;
		var L_CODES$1 = LITERALS + 1 + LENGTH_CODES;
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
		var extra_lbits = [
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			1,
			1,
			1,
			1,
			2,
			2,
			2,
			2,
			3,
			3,
			3,
			3,
			4,
			4,
			4,
			4,
			5,
			5,
			5,
			5,
			0
		];
		var extra_dbits = [
			0,
			0,
			0,
			0,
			1,
			1,
			2,
			2,
			3,
			3,
			4,
			4,
			5,
			5,
			6,
			6,
			7,
			7,
			8,
			8,
			9,
			9,
			10,
			10,
			11,
			11,
			12,
			12,
			13,
			13
		];
		var extra_blbits = [
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			2,
			3,
			7
		];
		var bl_order = [
			16,
			17,
			18,
			0,
			8,
			7,
			9,
			6,
			10,
			5,
			11,
			4,
			12,
			3,
			13,
			2,
			14,
			1,
			15
		];
		var DIST_CODE_LEN = 512;
		var static_ltree = new Array((L_CODES$1 + 2) * 2);
		zero$1(static_ltree);
		var static_dtree = new Array(D_CODES$1 * 2);
		zero$1(static_dtree);
		var _dist_code = new Array(DIST_CODE_LEN);
		zero$1(_dist_code);
		var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
		zero$1(_length_code);
		var base_length = new Array(LENGTH_CODES);
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
		function send_code(s, c$1, tree) {
			send_bits(s, tree[c$1 * 2], tree[c$1 * 2 + 1]);
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
			var h$1;
			var n, m;
			var bits;
			var xbits;
			var f$1;
			var overflow = 0;
			for (bits = 0; bits <= MAX_BITS$1; bits++) s.bl_count[bits] = 0;
			tree[s.heap[s.heap_max] * 2 + 1] = 0;
			for (h$1 = s.heap_max + 1; h$1 < HEAP_SIZE$1; h$1++) {
				n = s.heap[h$1];
				bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
				if (bits > max_length) {
					bits = max_length;
					overflow++;
				}
				tree[n * 2 + 1] = bits;
				if (n > max_code) continue;
				s.bl_count[bits]++;
				xbits = 0;
				if (n >= base) xbits = extra[n - base];
				f$1 = tree[n * 2];
				s.opt_len += f$1 * (bits + xbits);
				if (has_stree) s.static_len += f$1 * (stree[n * 2 + 1] + xbits);
			}
			if (overflow === 0) return;
			do {
				bits = max_length - 1;
				while (s.bl_count[bits] === 0) bits--;
				s.bl_count[bits]--;
				s.bl_count[bits + 1] += 2;
				s.bl_count[max_length]--;
				overflow -= 2;
			} while (overflow > 0);
			for (bits = max_length; bits !== 0; bits--) {
				n = s.bl_count[bits];
				while (n !== 0) {
					m = s.heap[--h$1];
					if (m > max_code) continue;
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
			for (bits = 1; bits <= MAX_BITS$1; bits++) next_code[bits] = code = code + bl_count[bits - 1] << 1;
			for (n = 0; n <= max_code; n++) {
				var len = tree[n * 2 + 1];
				if (len === 0) continue;
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
			for (code = 0; code < LENGTH_CODES - 1; code++) {
				base_length[code] = length;
				for (n = 0; n < 1 << extra_lbits[code]; n++) _length_code[length++] = code;
			}
			_length_code[length - 1] = code;
			dist = 0;
			for (code = 0; code < 16; code++) {
				base_dist[code] = dist;
				for (n = 0; n < 1 << extra_dbits[code]; n++) _dist_code[dist++] = code;
			}
			dist >>= 7;
			for (; code < D_CODES$1; code++) {
				base_dist[code] = dist << 7;
				for (n = 0; n < 1 << extra_dbits[code] - 7; n++) _dist_code[256 + dist++] = code;
			}
			for (bits = 0; bits <= MAX_BITS$1; bits++) bl_count[bits] = 0;
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
			static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES$1, MAX_BITS$1);
			static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
			static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);
		}
		function init_block(s) {
			var n;
			for (n = 0; n < L_CODES$1; n++) s.dyn_ltree[n * 2] = 0;
			for (n = 0; n < D_CODES$1; n++) s.dyn_dtree[n * 2] = 0;
			for (n = 0; n < BL_CODES$1; n++) s.bl_tree[n * 2] = 0;
			s.dyn_ltree[END_BLOCK * 2] = 1;
			s.opt_len = s.static_len = 0;
			s.last_lit = s.matches = 0;
		}
		function bi_windup(s) {
			if (s.bi_valid > 8) put_short(s, s.bi_buf);
			else if (s.bi_valid > 0) s.pending_buf[s.pending++] = s.bi_buf;
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
			var v$1 = s.heap[k];
			var j = k << 1;
			while (j <= s.heap_len) {
				if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) j++;
				if (smaller(tree, v$1, s.heap[j], s.depth)) break;
				s.heap[k] = s.heap[j];
				k = j;
				j <<= 1;
			}
			s.heap[k] = v$1;
		}
		function compress_block(s, ltree, dtree) {
			var dist;
			var lc;
			var lx = 0;
			var code;
			var extra;
			if (s.last_lit !== 0) do {
				dist = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1];
				lc = s.pending_buf[s.l_buf + lx];
				lx++;
				if (dist === 0) send_code(s, lc, ltree);
				else {
					code = _length_code[lc];
					send_code(s, code + LITERALS + 1, ltree);
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
			for (n = 0; n < elems; n++) if (tree[n * 2] !== 0) {
				s.heap[++s.heap_len] = max_code = n;
				s.depth[n] = 0;
			} else tree[n * 2 + 1] = 0;
			while (s.heap_len < 2) {
				node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
				tree[node * 2] = 1;
				s.depth[node] = 0;
				s.opt_len--;
				if (has_stree) s.static_len -= stree[node * 2 + 1];
			}
			desc.max_code = max_code;
			for (n = s.heap_len >> 1; n >= 1; n--) pqdownheap(s, tree, n);
			node = elems;
			do {
				n = s.heap[1];
				s.heap[1] = s.heap[s.heap_len--];
				pqdownheap(s, tree, 1);
				m = s.heap[1];
				s.heap[--s.heap_max] = n;
				s.heap[--s.heap_max] = m;
				tree[node * 2] = tree[n * 2] + tree[m * 2];
				s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
				tree[n * 2 + 1] = tree[m * 2 + 1] = node;
				s.heap[1] = node++;
				pqdownheap(s, tree, 1);
			} while (s.heap_len >= 2);
			s.heap[--s.heap_max] = s.heap[1];
			gen_bitlen(s, desc);
			gen_codes(tree, max_code, s.bl_count);
		}
		function scan_tree(s, tree, max_code) {
			var n;
			var prevlen = -1;
			var curlen;
			var nextlen = tree[1];
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
				if (++count < max_count && curlen === nextlen) continue;
				else if (count < min_count) s.bl_tree[curlen * 2] += count;
				else if (curlen !== 0) {
					if (curlen !== prevlen) s.bl_tree[curlen * 2]++;
					s.bl_tree[REP_3_6 * 2]++;
				} else if (count <= 10) s.bl_tree[REPZ_3_10 * 2]++;
				else s.bl_tree[REPZ_11_138 * 2]++;
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
			var nextlen = tree[1];
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
				if (++count < max_count && curlen === nextlen) continue;
				else if (count < min_count) do
					send_code(s, curlen, s.bl_tree);
				while (--count !== 0);
				else if (curlen !== 0) {
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
			for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) break;
			s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
			return max_blindex;
		}
		function send_all_trees(s, lcodes, dcodes, blcodes) {
			var rank$1;
			send_bits(s, lcodes - 257, 5);
			send_bits(s, dcodes - 1, 5);
			send_bits(s, blcodes - 4, 4);
			for (rank$1 = 0; rank$1 < blcodes; rank$1++) send_bits(s, s.bl_tree[bl_order[rank$1] * 2 + 1], 3);
			send_tree(s, s.dyn_ltree, lcodes - 1);
			send_tree(s, s.dyn_dtree, dcodes - 1);
		}
		function detect_data_type(s) {
			var black_mask = 4093624447;
			var n;
			for (n = 0; n <= 31; n++, black_mask >>>= 1) if (black_mask & 1 && s.dyn_ltree[n * 2] !== 0) return Z_BINARY;
			if (s.dyn_ltree[18] !== 0 || s.dyn_ltree[20] !== 0 || s.dyn_ltree[26] !== 0) return Z_TEXT;
			for (n = 32; n < LITERALS; n++) if (s.dyn_ltree[n * 2] !== 0) return Z_TEXT;
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
				if (s.strm.data_type === Z_UNKNOWN$1) s.strm.data_type = detect_data_type(s);
				build_tree(s, s.l_desc);
				build_tree(s, s.d_desc);
				max_blindex = build_bl_tree(s);
				opt_lenb = s.opt_len + 3 + 7 >>> 3;
				static_lenb = s.static_len + 3 + 7 >>> 3;
				if (static_lenb <= opt_lenb) opt_lenb = static_lenb;
			} else opt_lenb = static_lenb = stored_len + 5;
			if (stored_len + 4 <= opt_lenb && buf !== -1) _tr_stored_block(s, buf, stored_len, last);
			else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {
				send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
				compress_block(s, static_ltree, static_dtree);
			} else {
				send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
				send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
				compress_block(s, s.dyn_ltree, s.dyn_dtree);
			}
			init_block(s);
			if (last) bi_windup(s);
		}
		function _tr_tally(s, dist, lc) {
			s.pending_buf[s.d_buf + s.last_lit * 2] = dist >>> 8 & 255;
			s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 255;
			s.pending_buf[s.l_buf + s.last_lit] = lc & 255;
			s.last_lit++;
			if (dist === 0) s.dyn_ltree[lc * 2]++;
			else {
				s.matches++;
				dist--;
				s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]++;
				s.dyn_dtree[d_code(dist) * 2]++;
			}
			return s.last_lit === s.lit_bufsize - 1;
		}
		exports._tr_init = _tr_init;
		exports._tr_stored_block = _tr_stored_block;
		exports._tr_flush_block = _tr_flush_block;
		exports._tr_tally = _tr_tally;
		exports._tr_align = _tr_align;
	}));
	var require_adler32 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
		module.exports = adler32$2;
	}));
	var require_crc32 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		function makeTable() {
			var c$1, table = [];
			for (var n = 0; n < 256; n++) {
				c$1 = n;
				for (var k = 0; k < 8; k++) c$1 = c$1 & 1 ? 3988292384 ^ c$1 >>> 1 : c$1 >>> 1;
				table[n] = c$1;
			}
			return table;
		}
		var crcTable = makeTable();
		function crc32$2(crc, buf, len, pos) {
			var t$1 = crcTable, end = pos + len;
			crc ^= -1;
			for (var i$1 = pos; i$1 < end; i$1++) crc = crc >>> 8 ^ t$1[(crc ^ buf[i$1]) & 255];
			return crc ^ -1;
		}
		module.exports = crc32$2;
	}));
	var require_messages = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = {
			2: "need dictionary",
			1: "stream end",
			0: "",
			"-1": "file error",
			"-2": "stream error",
			"-3": "data error",
			"-4": "insufficient memory",
			"-5": "buffer error",
			"-6": "incompatible version"
		};
	}));
	var require_deflate$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
		var utils$5 = require_common();
		var trees = require_trees();
		var adler32$1 = require_adler32();
		var crc32$1 = require_crc32();
		var msg$2 = require_messages();
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
		var MAX_WBITS = 15;
		var DEF_MEM_LEVEL = 8;
		var L_CODES = 286;
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
		function rank(f$1) {
			return (f$1 << 1) - (f$1 > 4 ? 9 : 0);
		}
		function zero(buf) {
			var len = buf.length;
			while (--len >= 0) buf[len] = 0;
		}
		function flush_pending(strm) {
			var s = strm.state;
			var len = s.pending;
			if (len > strm.avail_out) len = strm.avail_out;
			if (len === 0) return;
			utils$5.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
			strm.next_out += len;
			s.pending_out += len;
			strm.total_out += len;
			strm.avail_out -= len;
			s.pending -= len;
			if (s.pending === 0) s.pending_out = 0;
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
		function read_buf(strm, buf, start, size$1) {
			var len = strm.avail_in;
			if (len > size$1) len = size$1;
			if (len === 0) return 0;
			strm.avail_in -= len;
			utils$5.arraySet(buf, strm.input, strm.next_in, len, start);
			if (strm.state.wrap === 1) strm.adler = adler32$1(strm.adler, buf, len, start);
			else if (strm.state.wrap === 2) strm.adler = crc32$1(strm.adler, buf, len, start);
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
			if (s.prev_length >= s.good_match) chain_length >>= 2;
			if (nice_match > s.lookahead) nice_match = s.lookahead;
			do {
				match = cur_match;
				if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) continue;
				scan += 2;
				match++;
				do				;
while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
				len = MAX_MATCH - (strend - scan);
				scan = strend - MAX_MATCH;
				if (len > best_len) {
					s.match_start = cur_match;
					best_len = len;
					if (len >= nice_match) break;
					scan_end1 = _win[scan + best_len - 1];
					scan_end = _win[scan + best_len];
				}
			} while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
			if (best_len <= s.lookahead) return best_len;
			return s.lookahead;
		}
		function fill_window(s) {
			var _w_size = s.w_size;
			var p$2, n, m, more, str;
			do {
				more = s.window_size - s.lookahead - s.strstart;
				if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
					utils$5.arraySet(s.window, s.window, _w_size, _w_size, 0);
					s.match_start -= _w_size;
					s.strstart -= _w_size;
					s.block_start -= _w_size;
					n = s.hash_size;
					p$2 = n;
					do {
						m = s.head[--p$2];
						s.head[p$2] = m >= _w_size ? m - _w_size : 0;
					} while (--n);
					n = _w_size;
					p$2 = n;
					do {
						m = s.prev[--p$2];
						s.prev[p$2] = m >= _w_size ? m - _w_size : 0;
					} while (--n);
					more += _w_size;
				}
				if (s.strm.avail_in === 0) break;
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
						if (s.lookahead + s.insert < MIN_MATCH) break;
					}
				}
			} while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
		}
		function deflate_stored(s, flush) {
			var max_block_size = 65535;
			if (max_block_size > s.pending_buf_size - 5) max_block_size = s.pending_buf_size - 5;
			for (;;) {
				if (s.lookahead <= 1) {
					fill_window(s);
					if (s.lookahead === 0 && flush === Z_NO_FLUSH$1) return BS_NEED_MORE;
					if (s.lookahead === 0) break;
				}
				s.strstart += s.lookahead;
				s.lookahead = 0;
				var max_start = s.block_start + max_block_size;
				if (s.strstart === 0 || s.strstart >= max_start) {
					s.lookahead = s.strstart - max_start;
					s.strstart = max_start;
					flush_block_only(s, false);
					if (s.strm.avail_out === 0) return BS_NEED_MORE;
				}
				if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
					flush_block_only(s, false);
					if (s.strm.avail_out === 0) return BS_NEED_MORE;
				}
			}
			s.insert = 0;
			if (flush === Z_FINISH$2) {
				flush_block_only(s, true);
				if (s.strm.avail_out === 0) return BS_FINISH_STARTED;
				return BS_FINISH_DONE;
			}
			if (s.strstart > s.block_start) {
				flush_block_only(s, false);
				if (s.strm.avail_out === 0) return BS_NEED_MORE;
			}
			return BS_NEED_MORE;
		}
		function deflate_fast(s, flush) {
			var hash_head;
			var bflush;
			for (;;) {
				if (s.lookahead < MIN_LOOKAHEAD) {
					fill_window(s);
					if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$1) return BS_NEED_MORE;
					if (s.lookahead === 0) break;
				}
				hash_head = 0;
				if (s.lookahead >= MIN_MATCH) {
					s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
					hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
					s.head[s.ins_h] = s.strstart;
				}
				if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) s.match_length = longest_match(s, hash_head);
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
					if (s.strm.avail_out === 0) return BS_NEED_MORE;
				}
			}
			s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
			if (flush === Z_FINISH$2) {
				flush_block_only(s, true);
				if (s.strm.avail_out === 0) return BS_FINISH_STARTED;
				return BS_FINISH_DONE;
			}
			if (s.last_lit) {
				flush_block_only(s, false);
				if (s.strm.avail_out === 0) return BS_NEED_MORE;
			}
			return BS_BLOCK_DONE;
		}
		function deflate_slow(s, flush) {
			var hash_head;
			var bflush;
			var max_insert;
			for (;;) {
				if (s.lookahead < MIN_LOOKAHEAD) {
					fill_window(s);
					if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$1) return BS_NEED_MORE;
					if (s.lookahead === 0) break;
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
					if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) s.match_length = MIN_MATCH - 1;
				}
				if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
					max_insert = s.strstart + s.lookahead - MIN_MATCH;
					bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
					s.lookahead -= s.prev_length - 1;
					s.prev_length -= 2;
					do
						if (++s.strstart <= max_insert) {
							s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
							hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
							s.head[s.ins_h] = s.strstart;
						}
					while (--s.prev_length !== 0);
					s.match_available = 0;
					s.match_length = MIN_MATCH - 1;
					s.strstart++;
					if (bflush) {
						flush_block_only(s, false);
						if (s.strm.avail_out === 0) return BS_NEED_MORE;
					}
				} else if (s.match_available) {
					bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
					if (bflush) flush_block_only(s, false);
					s.strstart++;
					s.lookahead--;
					if (s.strm.avail_out === 0) return BS_NEED_MORE;
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
				if (s.strm.avail_out === 0) return BS_FINISH_STARTED;
				return BS_FINISH_DONE;
			}
			if (s.last_lit) {
				flush_block_only(s, false);
				if (s.strm.avail_out === 0) return BS_NEED_MORE;
			}
			return BS_BLOCK_DONE;
		}
		function deflate_rle(s, flush) {
			var bflush;
			var prev;
			var scan, strend;
			var _win = s.window;
			for (;;) {
				if (s.lookahead <= MAX_MATCH) {
					fill_window(s);
					if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$1) return BS_NEED_MORE;
					if (s.lookahead === 0) break;
				}
				s.match_length = 0;
				if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
					scan = s.strstart - 1;
					prev = _win[scan];
					if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
						strend = s.strstart + MAX_MATCH;
						do						;
while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
						s.match_length = MAX_MATCH - (strend - scan);
						if (s.match_length > s.lookahead) s.match_length = s.lookahead;
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
					if (s.strm.avail_out === 0) return BS_NEED_MORE;
				}
			}
			s.insert = 0;
			if (flush === Z_FINISH$2) {
				flush_block_only(s, true);
				if (s.strm.avail_out === 0) return BS_FINISH_STARTED;
				return BS_FINISH_DONE;
			}
			if (s.last_lit) {
				flush_block_only(s, false);
				if (s.strm.avail_out === 0) return BS_NEED_MORE;
			}
			return BS_BLOCK_DONE;
		}
		function deflate_huff(s, flush) {
			var bflush;
			for (;;) {
				if (s.lookahead === 0) {
					fill_window(s);
					if (s.lookahead === 0) {
						if (flush === Z_NO_FLUSH$1) return BS_NEED_MORE;
						break;
					}
				}
				s.match_length = 0;
				bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
				s.lookahead--;
				s.strstart++;
				if (bflush) {
					flush_block_only(s, false);
					if (s.strm.avail_out === 0) return BS_NEED_MORE;
				}
			}
			s.insert = 0;
			if (flush === Z_FINISH$2) {
				flush_block_only(s, true);
				if (s.strm.avail_out === 0) return BS_FINISH_STARTED;
				return BS_FINISH_DONE;
			}
			if (s.last_lit) {
				flush_block_only(s, false);
				if (s.strm.avail_out === 0) return BS_NEED_MORE;
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
		var configuration_table = [
			new Config(0, 0, 0, 0, deflate_stored),
			new Config(4, 4, 8, 4, deflate_fast),
			new Config(4, 5, 16, 8, deflate_fast),
			new Config(4, 6, 32, 32, deflate_fast),
			new Config(4, 4, 16, 16, deflate_slow),
			new Config(8, 16, 32, 32, deflate_slow),
			new Config(8, 16, 128, 128, deflate_slow),
			new Config(8, 32, 128, 256, deflate_slow),
			new Config(32, 128, 258, 1024, deflate_slow),
			new Config(32, 258, 258, 4096, deflate_slow)
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
			if (!strm || !strm.state) return err(strm, Z_STREAM_ERROR$1);
			strm.total_in = strm.total_out = 0;
			strm.data_type = Z_UNKNOWN;
			s = strm.state;
			s.pending = 0;
			s.pending_out = 0;
			if (s.wrap < 0) s.wrap = -s.wrap;
			s.status = s.wrap ? INIT_STATE : BUSY_STATE;
			strm.adler = s.wrap === 2 ? 0 : 1;
			s.last_flush = Z_NO_FLUSH$1;
			trees._tr_init(s);
			return Z_OK$2;
		}
		function deflateReset(strm) {
			var ret = deflateResetKeep(strm);
			if (ret === Z_OK$2) lm_init(strm.state);
			return ret;
		}
		function deflateSetHeader(strm, head) {
			if (!strm || !strm.state) return Z_STREAM_ERROR$1;
			if (strm.state.wrap !== 2) return Z_STREAM_ERROR$1;
			strm.state.gzhead = head;
			return Z_OK$2;
		}
		function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
			if (!strm) return Z_STREAM_ERROR$1;
			var wrap = 1;
			if (level === Z_DEFAULT_COMPRESSION$1) level = 6;
			if (windowBits < 0) {
				wrap = 0;
				windowBits = -windowBits;
			} else if (windowBits > 15) {
				wrap = 2;
				windowBits -= 16;
			}
			if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED) return err(strm, Z_STREAM_ERROR$1);
			if (windowBits === 8) windowBits = 9;
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
			s.l_buf = 3 * s.lit_bufsize;
			s.level = level;
			s.strategy = strategy;
			s.method = method;
			return deflateReset(strm);
		}
		function deflateInit(strm, level) {
			return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
		}
		function deflate$2(strm, flush) {
			var old_flush, s;
			var beg, val;
			if (!strm || !strm.state || flush > Z_BLOCK$1 || flush < 0) return strm ? err(strm, Z_STREAM_ERROR$1) : Z_STREAM_ERROR$1;
			s = strm.state;
			if (!strm.output || !strm.input && strm.avail_in !== 0 || s.status === FINISH_STATE && flush !== Z_FINISH$2) return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$1);
			s.strm = strm;
			old_flush = s.last_flush;
			s.last_flush = flush;
			if (s.status === INIT_STATE) if (s.wrap === 2) {
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
					if (s.gzhead.hcrc) strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending, 0);
					s.gzindex = 0;
					s.status = EXTRA_STATE;
				}
			} else {
				var header = Z_DEFLATED$2 + (s.w_bits - 8 << 4) << 8;
				var level_flags = -1;
				if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) level_flags = 0;
				else if (s.level < 6) level_flags = 1;
				else if (s.level === 6) level_flags = 2;
				else level_flags = 3;
				header |= level_flags << 6;
				if (s.strstart !== 0) header |= PRESET_DICT;
				header += 31 - header % 31;
				s.status = BUSY_STATE;
				putShortMSB(s, header);
				if (s.strstart !== 0) {
					putShortMSB(s, strm.adler >>> 16);
					putShortMSB(s, strm.adler & 65535);
				}
				strm.adler = 1;
			}
			if (s.status === EXTRA_STATE) if (s.gzhead.extra) {
				beg = s.pending;
				while (s.gzindex < (s.gzhead.extra.length & 65535)) {
					if (s.pending === s.pending_buf_size) {
						if (s.gzhead.hcrc && s.pending > beg) strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
						flush_pending(strm);
						beg = s.pending;
						if (s.pending === s.pending_buf_size) break;
					}
					put_byte(s, s.gzhead.extra[s.gzindex] & 255);
					s.gzindex++;
				}
				if (s.gzhead.hcrc && s.pending > beg) strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
				if (s.gzindex === s.gzhead.extra.length) {
					s.gzindex = 0;
					s.status = NAME_STATE;
				}
			} else s.status = NAME_STATE;
			if (s.status === NAME_STATE) if (s.gzhead.name) {
				beg = s.pending;
				do {
					if (s.pending === s.pending_buf_size) {
						if (s.gzhead.hcrc && s.pending > beg) strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
						flush_pending(strm);
						beg = s.pending;
						if (s.pending === s.pending_buf_size) {
							val = 1;
							break;
						}
					}
					if (s.gzindex < s.gzhead.name.length) val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
					else val = 0;
					put_byte(s, val);
				} while (val !== 0);
				if (s.gzhead.hcrc && s.pending > beg) strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
				if (val === 0) {
					s.gzindex = 0;
					s.status = COMMENT_STATE;
				}
			} else s.status = COMMENT_STATE;
			if (s.status === COMMENT_STATE) if (s.gzhead.comment) {
				beg = s.pending;
				do {
					if (s.pending === s.pending_buf_size) {
						if (s.gzhead.hcrc && s.pending > beg) strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
						flush_pending(strm);
						beg = s.pending;
						if (s.pending === s.pending_buf_size) {
							val = 1;
							break;
						}
					}
					if (s.gzindex < s.gzhead.comment.length) val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
					else val = 0;
					put_byte(s, val);
				} while (val !== 0);
				if (s.gzhead.hcrc && s.pending > beg) strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
				if (val === 0) s.status = HCRC_STATE;
			} else s.status = HCRC_STATE;
			if (s.status === HCRC_STATE) if (s.gzhead.hcrc) {
				if (s.pending + 2 > s.pending_buf_size) flush_pending(strm);
				if (s.pending + 2 <= s.pending_buf_size) {
					put_byte(s, strm.adler & 255);
					put_byte(s, strm.adler >> 8 & 255);
					strm.adler = 0;
					s.status = BUSY_STATE;
				}
			} else s.status = BUSY_STATE;
			if (s.pending !== 0) {
				flush_pending(strm);
				if (strm.avail_out === 0) {
					s.last_flush = -1;
					return Z_OK$2;
				}
			} else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH$2) return err(strm, Z_BUF_ERROR$1);
			if (s.status === FINISH_STATE && strm.avail_in !== 0) return err(strm, Z_BUF_ERROR$1);
			if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH$1 && s.status !== FINISH_STATE) {
				var bstate = s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
				if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) s.status = FINISH_STATE;
				if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
					if (strm.avail_out === 0) s.last_flush = -1;
					return Z_OK$2;
				}
				if (bstate === BS_BLOCK_DONE) {
					if (flush === Z_PARTIAL_FLUSH) trees._tr_align(s);
					else if (flush !== Z_BLOCK$1) {
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
			if (flush !== Z_FINISH$2) return Z_OK$2;
			if (s.wrap <= 0) return Z_STREAM_END$2;
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
			if (s.wrap > 0) s.wrap = -s.wrap;
			return s.pending !== 0 ? Z_OK$2 : Z_STREAM_END$2;
		}
		function deflateEnd(strm) {
			var status;
			if (!strm || !strm.state) return Z_STREAM_ERROR$1;
			status = strm.state.status;
			if (status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE) return err(strm, Z_STREAM_ERROR$1);
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
			if (!strm || !strm.state) return Z_STREAM_ERROR$1;
			s = strm.state;
			wrap = s.wrap;
			if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) return Z_STREAM_ERROR$1;
			if (wrap === 1) strm.adler = adler32$1(strm.adler, dictionary, dictLength, 0);
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
		exports.deflateInit = deflateInit;
		exports.deflateInit2 = deflateInit2;
		exports.deflateReset = deflateReset;
		exports.deflateResetKeep = deflateResetKeep;
		exports.deflateSetHeader = deflateSetHeader;
		exports.deflate = deflate$2;
		exports.deflateEnd = deflateEnd;
		exports.deflateSetDictionary = deflateSetDictionary;
		exports.deflateInfo = "pako deflate (from Nodeca project)";
	}));
	var require_strings = /* @__PURE__ */ __commonJSMin(((exports) => {
		var utils$4 = require_common();
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
		for (var q = 0; q < 256; q++) _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
		_utf8len[254] = _utf8len[254] = 1;
		exports.string2buf = function(str) {
			var buf, c$1, c2, m_pos, i$1, str_len = str.length, buf_len = 0;
			for (m_pos = 0; m_pos < str_len; m_pos++) {
				c$1 = str.charCodeAt(m_pos);
				if ((c$1 & 64512) === 55296 && m_pos + 1 < str_len) {
					c2 = str.charCodeAt(m_pos + 1);
					if ((c2 & 64512) === 56320) {
						c$1 = 65536 + (c$1 - 55296 << 10) + (c2 - 56320);
						m_pos++;
					}
				}
				buf_len += c$1 < 128 ? 1 : c$1 < 2048 ? 2 : c$1 < 65536 ? 3 : 4;
			}
			buf = new utils$4.Buf8(buf_len);
			for (i$1 = 0, m_pos = 0; i$1 < buf_len; m_pos++) {
				c$1 = str.charCodeAt(m_pos);
				if ((c$1 & 64512) === 55296 && m_pos + 1 < str_len) {
					c2 = str.charCodeAt(m_pos + 1);
					if ((c2 & 64512) === 56320) {
						c$1 = 65536 + (c$1 - 55296 << 10) + (c2 - 56320);
						m_pos++;
					}
				}
				if (c$1 < 128) buf[i$1++] = c$1;
				else if (c$1 < 2048) {
					buf[i$1++] = 192 | c$1 >>> 6;
					buf[i$1++] = 128 | c$1 & 63;
				} else if (c$1 < 65536) {
					buf[i$1++] = 224 | c$1 >>> 12;
					buf[i$1++] = 128 | c$1 >>> 6 & 63;
					buf[i$1++] = 128 | c$1 & 63;
				} else {
					buf[i$1++] = 240 | c$1 >>> 18;
					buf[i$1++] = 128 | c$1 >>> 12 & 63;
					buf[i$1++] = 128 | c$1 >>> 6 & 63;
					buf[i$1++] = 128 | c$1 & 63;
				}
			}
			return buf;
		};
		function buf2binstring(buf, len) {
			if (len < 65534) {
				if (buf.subarray && STR_APPLY_UIA_OK || !buf.subarray && STR_APPLY_OK) return String.fromCharCode.apply(null, utils$4.shrinkBuf(buf, len));
			}
			var result = "";
			for (var i$1 = 0; i$1 < len; i$1++) result += String.fromCharCode(buf[i$1]);
			return result;
		}
		exports.buf2binstring = function(buf) {
			return buf2binstring(buf, buf.length);
		};
		exports.binstring2buf = function(str) {
			var buf = new utils$4.Buf8(str.length);
			for (var i$1 = 0, len = buf.length; i$1 < len; i$1++) buf[i$1] = str.charCodeAt(i$1);
			return buf;
		};
		exports.buf2string = function(buf, max$1) {
			var i$1, out, c$1, c_len;
			var len = max$1 || buf.length;
			var utf16buf = new Array(len * 2);
			for (out = 0, i$1 = 0; i$1 < len;) {
				c$1 = buf[i$1++];
				if (c$1 < 128) {
					utf16buf[out++] = c$1;
					continue;
				}
				c_len = _utf8len[c$1];
				if (c_len > 4) {
					utf16buf[out++] = 65533;
					i$1 += c_len - 1;
					continue;
				}
				c$1 &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
				while (c_len > 1 && i$1 < len) {
					c$1 = c$1 << 6 | buf[i$1++] & 63;
					c_len--;
				}
				if (c_len > 1) {
					utf16buf[out++] = 65533;
					continue;
				}
				if (c$1 < 65536) utf16buf[out++] = c$1;
				else {
					c$1 -= 65536;
					utf16buf[out++] = 55296 | c$1 >> 10 & 1023;
					utf16buf[out++] = 56320 | c$1 & 1023;
				}
			}
			return buf2binstring(utf16buf, out);
		};
		exports.utf8border = function(buf, max$1) {
			var pos;
			max$1 = max$1 || buf.length;
			if (max$1 > buf.length) max$1 = buf.length;
			pos = max$1 - 1;
			while (pos >= 0 && (buf[pos] & 192) === 128) pos--;
			if (pos < 0) return max$1;
			if (pos === 0) return max$1;
			return pos + _utf8len[buf[pos]] > max$1 ? pos : max$1;
		};
	}));
	var require_zstream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
		module.exports = ZStream$2;
	}));
	var require_deflate = /* @__PURE__ */ __commonJSMin(((exports) => {
		var zlib_deflate = require_deflate$1();
		var utils$3 = require_common();
		var strings$1 = require_strings();
		var msg$1 = require_messages();
		var ZStream$1 = require_zstream();
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
			if (!(this instanceof Deflate)) return new Deflate(options);
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
			if (opt.raw && opt.windowBits > 0) opt.windowBits = -opt.windowBits;
			else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) opt.windowBits += 16;
			this.err = 0;
			this.msg = "";
			this.ended = false;
			this.chunks = [];
			this.strm = new ZStream$1();
			this.strm.avail_out = 0;
			var status = zlib_deflate.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy);
			if (status !== Z_OK$1) throw new Error(msg$1[status]);
			if (opt.header) zlib_deflate.deflateSetHeader(this.strm, opt.header);
			if (opt.dictionary) {
				var dict;
				if (typeof opt.dictionary === "string") dict = strings$1.string2buf(opt.dictionary);
				else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") dict = new Uint8Array(opt.dictionary);
				else dict = opt.dictionary;
				status = zlib_deflate.deflateSetDictionary(this.strm, dict);
				if (status !== Z_OK$1) throw new Error(msg$1[status]);
				this._dict_set = true;
			}
		}
		Deflate.prototype.push = function(data, mode$1) {
			var strm = this.strm;
			var chunkSize = this.options.chunkSize;
			var status, _mode;
			if (this.ended) return false;
			_mode = mode$1 === ~~mode$1 ? mode$1 : mode$1 === true ? Z_FINISH$1 : Z_NO_FLUSH;
			if (typeof data === "string") strm.input = strings$1.string2buf(data);
			else if (toString$1.call(data) === "[object ArrayBuffer]") strm.input = new Uint8Array(data);
			else strm.input = data;
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
				if (strm.avail_out === 0 || strm.avail_in === 0 && (_mode === Z_FINISH$1 || _mode === Z_SYNC_FLUSH)) if (this.options.to === "string") this.onData(strings$1.buf2binstring(utils$3.shrinkBuf(strm.output, strm.next_out)));
				else this.onData(utils$3.shrinkBuf(strm.output, strm.next_out));
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
			if (status === Z_OK$1) if (this.options.to === "string") this.result = this.chunks.join("");
			else this.result = utils$3.flattenChunks(this.chunks);
			this.chunks = [];
			this.err = status;
			this.msg = this.strm.msg;
		};
		function deflate$1(input, options) {
			var deflator = new Deflate(options);
			deflator.push(input, true);
			if (deflator.err) throw deflator.msg || msg$1[deflator.err];
			return deflator.result;
		}
		function deflateRaw$2(input, options) {
			options = options || {};
			options.raw = true;
			return deflate$1(input, options);
		}
		function gzip(input, options) {
			options = options || {};
			options.gzip = true;
			return deflate$1(input, options);
		}
		exports.Deflate = Deflate;
		exports.deflate = deflate$1;
		exports.deflateRaw = deflateRaw$2;
		exports.gzip = gzip;
	}));
	var require_inffast = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var BAD$1 = 30;
		var TYPE$1 = 12;
		module.exports = function inflate_fast$1(strm, start) {
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
			top: do {
				if (bits < 15) {
					hold += input[_in++] << bits;
					bits += 8;
					hold += input[_in++] << bits;
					bits += 8;
				}
				here = lcode[hold & lmask];
				dolen: for (;;) {
					op = here >>> 24;
					hold >>>= op;
					bits -= op;
					op = here >>> 16 & 255;
					if (op === 0) output[_out++] = here & 65535;
					else if (op & 16) {
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
						dodist: for (;;) {
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
											do
												output[_out++] = s_window[from++];
											while (--op);
											from = _out - dist;
											from_source = output;
										}
									} else if (wnext < op) {
										from += wsize + wnext - op;
										op -= wnext;
										if (op < len) {
											len -= op;
											do
												output[_out++] = s_window[from++];
											while (--op);
											from = 0;
											if (wnext < len) {
												op = wnext;
												len -= op;
												do
													output[_out++] = s_window[from++];
												while (--op);
												from = _out - dist;
												from_source = output;
											}
										}
									} else {
										from += wnext - op;
										if (op < len) {
											len -= op;
											do
												output[_out++] = s_window[from++];
											while (--op);
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
										if (len > 1) output[_out++] = from_source[from++];
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
										if (len > 1) output[_out++] = output[from++];
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
		};
	}));
	var require_inftrees = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var utils$2 = require_common();
		var MAXBITS = 15;
		var ENOUGH_LENS$1 = 852;
		var ENOUGH_DISTS$1 = 592;
		var CODES$1 = 0;
		var LENS$1 = 1;
		var DISTS$1 = 2;
		var lbase = [
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
		module.exports = function inflate_table$1(type, lens, lens_index, codes, table, table_index, work, opts) {
			var bits = opts.bits;
			var len = 0;
			var sym = 0;
			var min$2 = 0, max$1 = 0;
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
			for (len = 0; len <= MAXBITS; len++) count[len] = 0;
			for (sym = 0; sym < codes; sym++) count[lens[lens_index + sym]]++;
			root = bits;
			for (max$1 = MAXBITS; max$1 >= 1; max$1--) if (count[max$1] !== 0) break;
			if (root > max$1) root = max$1;
			if (max$1 === 0) {
				table[table_index++] = 20971520;
				table[table_index++] = 20971520;
				opts.bits = 1;
				return 0;
			}
			for (min$2 = 1; min$2 < max$1; min$2++) if (count[min$2] !== 0) break;
			if (root < min$2) root = min$2;
			left = 1;
			for (len = 1; len <= MAXBITS; len++) {
				left <<= 1;
				left -= count[len];
				if (left < 0) return -1;
			}
			if (left > 0 && (type === CODES$1 || max$1 !== 1)) return -1;
			offs[1] = 0;
			for (len = 1; len < MAXBITS; len++) offs[len + 1] = offs[len] + count[len];
			for (sym = 0; sym < codes; sym++) if (lens[lens_index + sym] !== 0) work[offs[lens[lens_index + sym]]++] = sym;
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
			len = min$2;
			next = table_index;
			curr = root;
			drop = 0;
			low = -1;
			used = 1 << root;
			mask = used - 1;
			if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) return 1;
			for (;;) {
				here_bits = len - drop;
				if (work[sym] < end) {
					here_op = 0;
					here_val = work[sym];
				} else if (work[sym] > end) {
					here_op = extra[extra_index + work[sym]];
					here_val = base[base_index + work[sym]];
				} else {
					here_op = 96;
					here_val = 0;
				}
				incr = 1 << len - drop;
				fill = 1 << curr;
				min$2 = fill;
				do {
					fill -= incr;
					table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
				} while (fill !== 0);
				incr = 1 << len - 1;
				while (huff & incr) incr >>= 1;
				if (incr !== 0) {
					huff &= incr - 1;
					huff += incr;
				} else huff = 0;
				sym++;
				if (--count[len] === 0) {
					if (len === max$1) break;
					len = lens[lens_index + work[sym]];
				}
				if (len > root && (huff & mask) !== low) {
					if (drop === 0) drop = root;
					next += min$2;
					curr = len - drop;
					left = 1 << curr;
					while (curr + drop < max$1) {
						left -= count[curr + drop];
						if (left <= 0) break;
						curr++;
						left <<= 1;
					}
					used += 1 << curr;
					if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) return 1;
					low = huff & mask;
					table[low] = root << 24 | curr << 16 | next - table_index | 0;
				}
			}
			if (huff !== 0) table[next + huff] = len - drop << 24 | 4194304;
			opts.bits = root;
			return 0;
		};
	}));
	var require_inflate$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
		var utils$1 = require_common();
		var adler32 = require_adler32();
		var crc32 = require_crc32();
		var inflate_fast = require_inffast();
		var inflate_table = require_inftrees();
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
		var DEF_WBITS = 15;
		function zswap32(q$1) {
			return (q$1 >>> 24 & 255) + (q$1 >>> 8 & 65280) + ((q$1 & 65280) << 8) + ((q$1 & 255) << 24);
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
			if (!strm || !strm.state) return Z_STREAM_ERROR;
			state = strm.state;
			strm.total_in = strm.total_out = state.total = 0;
			strm.msg = "";
			if (state.wrap) strm.adler = state.wrap & 1;
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
			if (!strm || !strm.state) return Z_STREAM_ERROR;
			state = strm.state;
			state.wsize = 0;
			state.whave = 0;
			state.wnext = 0;
			return inflateResetKeep(strm);
		}
		function inflateReset2(strm, windowBits) {
			var wrap;
			var state;
			if (!strm || !strm.state) return Z_STREAM_ERROR;
			state = strm.state;
			if (windowBits < 0) {
				wrap = 0;
				windowBits = -windowBits;
			} else {
				wrap = (windowBits >> 4) + 1;
				if (windowBits < 48) windowBits &= 15;
			}
			if (windowBits && (windowBits < 8 || windowBits > 15)) return Z_STREAM_ERROR;
			if (state.window !== null && state.wbits !== windowBits) state.window = null;
			state.wrap = wrap;
			state.wbits = windowBits;
			return inflateReset(strm);
		}
		function inflateInit2(strm, windowBits) {
			var ret;
			var state;
			if (!strm) return Z_STREAM_ERROR;
			state = new InflateState();
			strm.state = state;
			state.window = null;
			ret = inflateReset2(strm, windowBits);
			if (ret !== Z_OK) strm.state = null;
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
				while (sym < 144) state.lens[sym++] = 8;
				while (sym < 256) state.lens[sym++] = 9;
				while (sym < 280) state.lens[sym++] = 7;
				while (sym < 288) state.lens[sym++] = 8;
				inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
				sym = 0;
				while (sym < 32) state.lens[sym++] = 5;
				inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
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
				if (dist > copy) dist = copy;
				utils$1.arraySet(state.window, src, end - copy, dist, state.wnext);
				copy -= dist;
				if (copy) {
					utils$1.arraySet(state.window, src, end - copy, copy, 0);
					state.wnext = copy;
					state.whave = state.wsize;
				} else {
					state.wnext += dist;
					if (state.wnext === state.wsize) state.wnext = 0;
					if (state.whave < state.wsize) state.whave += dist;
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
			var order = [
				16,
				17,
				18,
				0,
				8,
				7,
				9,
				6,
				10,
				5,
				11,
				4,
				12,
				3,
				13,
				2,
				14,
				1,
				15
			];
			if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) return Z_STREAM_ERROR;
			state = strm.state;
			if (state.mode === TYPE) state.mode = TYPEDO;
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
			inf_leave: for (;;) switch (state.mode) {
				case HEAD:
					if (state.wrap === 0) {
						state.mode = TYPEDO;
						break;
					}
					while (bits < 16) {
						if (have === 0) break inf_leave;
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
					if (state.head) state.head.done = false;
					if (!(state.wrap & 1) || (((hold & 255) << 8) + (hold >> 8)) % 31) {
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
					if (state.wbits === 0) state.wbits = len;
					else if (len > state.wbits) {
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
						if (have === 0) break inf_leave;
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
					if (state.head) state.head.text = hold >> 8 & 1;
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
						if (have === 0) break inf_leave;
						have--;
						hold += input[next++] << bits;
						bits += 8;
					}
					if (state.head) state.head.time = hold;
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
						if (have === 0) break inf_leave;
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
							if (have === 0) break inf_leave;
							have--;
							hold += input[next++] << bits;
							bits += 8;
						}
						state.length = hold;
						if (state.head) state.head.extra_len = hold;
						if (state.flags & 512) {
							hbuf[0] = hold & 255;
							hbuf[1] = hold >>> 8 & 255;
							state.check = crc32(state.check, hbuf, 2, 0);
						}
						hold = 0;
						bits = 0;
					} else if (state.head) state.head.extra = null;
					state.mode = EXTRA;
				case EXTRA:
					if (state.flags & 1024) {
						copy = state.length;
						if (copy > have) copy = have;
						if (copy) {
							if (state.head) {
								len = state.head.extra_len - state.length;
								if (!state.head.extra) state.head.extra = new Array(state.head.extra_len);
								utils$1.arraySet(state.head.extra, input, next, copy, len);
							}
							if (state.flags & 512) state.check = crc32(state.check, input, copy, next);
							have -= copy;
							next += copy;
							state.length -= copy;
						}
						if (state.length) break inf_leave;
					}
					state.length = 0;
					state.mode = NAME;
				case NAME:
					if (state.flags & 2048) {
						if (have === 0) break inf_leave;
						copy = 0;
						do {
							len = input[next + copy++];
							if (state.head && len && state.length < 65536) state.head.name += String.fromCharCode(len);
						} while (len && copy < have);
						if (state.flags & 512) state.check = crc32(state.check, input, copy, next);
						have -= copy;
						next += copy;
						if (len) break inf_leave;
					} else if (state.head) state.head.name = null;
					state.length = 0;
					state.mode = COMMENT;
				case COMMENT:
					if (state.flags & 4096) {
						if (have === 0) break inf_leave;
						copy = 0;
						do {
							len = input[next + copy++];
							if (state.head && len && state.length < 65536) state.head.comment += String.fromCharCode(len);
						} while (len && copy < have);
						if (state.flags & 512) state.check = crc32(state.check, input, copy, next);
						have -= copy;
						next += copy;
						if (len) break inf_leave;
					} else if (state.head) state.head.comment = null;
					state.mode = HCRC;
				case HCRC:
					if (state.flags & 512) {
						while (bits < 16) {
							if (have === 0) break inf_leave;
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
						if (have === 0) break inf_leave;
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
				case TYPE: if (flush === Z_BLOCK || flush === Z_TREES) break inf_leave;
				case TYPEDO:
					if (state.last) {
						hold >>>= bits & 7;
						bits -= bits & 7;
						state.mode = CHECK;
						break;
					}
					while (bits < 3) {
						if (have === 0) break inf_leave;
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
						if (have === 0) break inf_leave;
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
					if (flush === Z_TREES) break inf_leave;
				case COPY_: state.mode = COPY;
				case COPY:
					copy = state.length;
					if (copy) {
						if (copy > have) copy = have;
						if (copy > left) copy = left;
						if (copy === 0) break inf_leave;
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
						if (have === 0) break inf_leave;
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
							if (have === 0) break inf_leave;
							have--;
							hold += input[next++] << bits;
							bits += 8;
						}
						state.lens[order[state.have++]] = hold & 7;
						hold >>>= 3;
						bits -= 3;
					}
					while (state.have < 19) state.lens[order[state.have++]] = 0;
					state.lencode = state.lendyn;
					state.lenbits = 7;
					opts = { bits: state.lenbits };
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
						for (;;) {
							here = state.lencode[hold & (1 << state.lenbits) - 1];
							here_bits = here >>> 24;
							here_op = here >>> 16 & 255;
							here_val = here & 65535;
							if (here_bits <= bits) break;
							if (have === 0) break inf_leave;
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
									if (have === 0) break inf_leave;
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
									if (have === 0) break inf_leave;
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
									if (have === 0) break inf_leave;
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
							while (copy--) state.lens[state.have++] = len;
						}
					}
					if (state.mode === BAD) break;
					if (state.lens[256] === 0) {
						strm.msg = "invalid code -- missing end-of-block";
						state.mode = BAD;
						break;
					}
					state.lenbits = 9;
					opts = { bits: state.lenbits };
					ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
					state.lenbits = opts.bits;
					if (ret) {
						strm.msg = "invalid literal/lengths set";
						state.mode = BAD;
						break;
					}
					state.distbits = 6;
					state.distcode = state.distdyn;
					opts = { bits: state.distbits };
					ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
					state.distbits = opts.bits;
					if (ret) {
						strm.msg = "invalid distances set";
						state.mode = BAD;
						break;
					}
					state.mode = LEN_;
					if (flush === Z_TREES) break inf_leave;
				case LEN_: state.mode = LEN;
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
						if (state.mode === TYPE) state.back = -1;
						break;
					}
					state.back = 0;
					for (;;) {
						here = state.lencode[hold & (1 << state.lenbits) - 1];
						here_bits = here >>> 24;
						here_op = here >>> 16 & 255;
						here_val = here & 65535;
						if (here_bits <= bits) break;
						if (have === 0) break inf_leave;
						have--;
						hold += input[next++] << bits;
						bits += 8;
					}
					if (here_op && (here_op & 240) === 0) {
						last_bits = here_bits;
						last_op = here_op;
						last_val = here_val;
						for (;;) {
							here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
							here_bits = here >>> 24;
							here_op = here >>> 16 & 255;
							here_val = here & 65535;
							if (last_bits + here_bits <= bits) break;
							if (have === 0) break inf_leave;
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
							if (have === 0) break inf_leave;
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
					for (;;) {
						here = state.distcode[hold & (1 << state.distbits) - 1];
						here_bits = here >>> 24;
						here_op = here >>> 16 & 255;
						here_val = here & 65535;
						if (here_bits <= bits) break;
						if (have === 0) break inf_leave;
						have--;
						hold += input[next++] << bits;
						bits += 8;
					}
					if ((here_op & 240) === 0) {
						last_bits = here_bits;
						last_op = here_op;
						last_val = here_val;
						for (;;) {
							here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
							here_bits = here >>> 24;
							here_op = here >>> 16 & 255;
							here_val = here & 65535;
							if (last_bits + here_bits <= bits) break;
							if (have === 0) break inf_leave;
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
							if (have === 0) break inf_leave;
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
					if (left === 0) break inf_leave;
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
						} else from = state.wnext - copy;
						if (copy > state.length) copy = state.length;
						from_source = state.window;
					} else {
						from_source = output;
						from = put - state.offset;
						copy = state.length;
					}
					if (copy > left) copy = left;
					left -= copy;
					state.length -= copy;
					do
						output[put++] = from_source[from++];
					while (--copy);
					if (state.length === 0) state.mode = LEN;
					break;
				case LIT:
					if (left === 0) break inf_leave;
					output[put++] = state.length;
					left--;
					state.mode = LEN;
					break;
				case CHECK:
					if (state.wrap) {
						while (bits < 32) {
							if (have === 0) break inf_leave;
							have--;
							hold |= input[next++] << bits;
							bits += 8;
						}
						_out -= left;
						strm.total_out += _out;
						state.total += _out;
						if (_out) strm.adler = state.check = state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out);
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
							if (have === 0) break inf_leave;
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
				case MEM: return Z_MEM_ERROR;
				case SYNC:
				default: return Z_STREAM_ERROR;
			}
			strm.next_out = put;
			strm.avail_out = left;
			strm.next_in = next;
			strm.avail_in = have;
			state.hold = hold;
			state.bits = bits;
			if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH)) {
				if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
					state.mode = MEM;
					return Z_MEM_ERROR;
				}
			}
			_in -= strm.avail_in;
			_out -= strm.avail_out;
			strm.total_in += _in;
			strm.total_out += _out;
			state.total += _out;
			if (state.wrap && _out) strm.adler = state.check = state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out);
			strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
			if ((_in === 0 && _out === 0 || flush === Z_FINISH) && ret === Z_OK) ret = Z_BUF_ERROR;
			return ret;
		}
		function inflateEnd(strm) {
			if (!strm || !strm.state) return Z_STREAM_ERROR;
			var state = strm.state;
			if (state.window) state.window = null;
			strm.state = null;
			return Z_OK;
		}
		function inflateGetHeader(strm, head) {
			var state;
			if (!strm || !strm.state) return Z_STREAM_ERROR;
			state = strm.state;
			if ((state.wrap & 2) === 0) return Z_STREAM_ERROR;
			state.head = head;
			head.done = false;
			return Z_OK;
		}
		function inflateSetDictionary(strm, dictionary) {
			var dictLength = dictionary.length;
			var state;
			var dictid;
			var ret;
			if (!strm || !strm.state) return Z_STREAM_ERROR;
			state = strm.state;
			if (state.wrap !== 0 && state.mode !== DICT) return Z_STREAM_ERROR;
			if (state.mode === DICT) {
				dictid = 1;
				dictid = adler32(dictid, dictionary, dictLength, 0);
				if (dictid !== state.check) return Z_DATA_ERROR;
			}
			ret = updatewindow(strm, dictionary, dictLength, dictLength);
			if (ret) {
				state.mode = MEM;
				return Z_MEM_ERROR;
			}
			state.havedict = 1;
			return Z_OK;
		}
		exports.inflateReset = inflateReset;
		exports.inflateReset2 = inflateReset2;
		exports.inflateResetKeep = inflateResetKeep;
		exports.inflateInit = inflateInit;
		exports.inflateInit2 = inflateInit2;
		exports.inflate = inflate$2;
		exports.inflateEnd = inflateEnd;
		exports.inflateGetHeader = inflateGetHeader;
		exports.inflateSetDictionary = inflateSetDictionary;
		exports.inflateInfo = "pako inflate (from Nodeca project)";
	}));
	var require_constants = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = {
			Z_NO_FLUSH: 0,
			Z_PARTIAL_FLUSH: 1,
			Z_SYNC_FLUSH: 2,
			Z_FULL_FLUSH: 3,
			Z_FINISH: 4,
			Z_BLOCK: 5,
			Z_TREES: 6,
			Z_OK: 0,
			Z_STREAM_END: 1,
			Z_NEED_DICT: 2,
			Z_ERRNO: -1,
			Z_STREAM_ERROR: -2,
			Z_DATA_ERROR: -3,
			Z_BUF_ERROR: -5,
			Z_NO_COMPRESSION: 0,
			Z_BEST_SPEED: 1,
			Z_BEST_COMPRESSION: 9,
			Z_DEFAULT_COMPRESSION: -1,
			Z_FILTERED: 1,
			Z_HUFFMAN_ONLY: 2,
			Z_RLE: 3,
			Z_FIXED: 4,
			Z_DEFAULT_STRATEGY: 0,
			Z_BINARY: 0,
			Z_TEXT: 1,
			Z_UNKNOWN: 2,
			Z_DEFLATED: 8
		};
	}));
	var require_gzheader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
		module.exports = GZheader$1;
	}));
	var require_inflate = /* @__PURE__ */ __commonJSMin(((exports) => {
		var zlib_inflate = require_inflate$1();
		var utils = require_common();
		var strings = require_strings();
		var c = require_constants();
		var msg = require_messages();
		var ZStream = require_zstream();
		var GZheader = require_gzheader();
		var toString = Object.prototype.toString;
		function Inflate(options) {
			if (!(this instanceof Inflate)) return new Inflate(options);
			this.options = utils.assign({
				chunkSize: 16384,
				windowBits: 0,
				to: ""
			}, options || {});
			var opt = this.options;
			if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
				opt.windowBits = -opt.windowBits;
				if (opt.windowBits === 0) opt.windowBits = -15;
			}
			if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) opt.windowBits += 32;
			if (opt.windowBits > 15 && opt.windowBits < 48) {
				if ((opt.windowBits & 15) === 0) opt.windowBits |= 15;
			}
			this.err = 0;
			this.msg = "";
			this.ended = false;
			this.chunks = [];
			this.strm = new ZStream();
			this.strm.avail_out = 0;
			var status = zlib_inflate.inflateInit2(this.strm, opt.windowBits);
			if (status !== c.Z_OK) throw new Error(msg[status]);
			this.header = new GZheader();
			zlib_inflate.inflateGetHeader(this.strm, this.header);
			if (opt.dictionary) {
				if (typeof opt.dictionary === "string") opt.dictionary = strings.string2buf(opt.dictionary);
				else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") opt.dictionary = new Uint8Array(opt.dictionary);
				if (opt.raw) {
					status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
					if (status !== c.Z_OK) throw new Error(msg[status]);
				}
			}
		}
		Inflate.prototype.push = function(data, mode$1) {
			var strm = this.strm;
			var chunkSize = this.options.chunkSize;
			var dictionary = this.options.dictionary;
			var status, _mode;
			var next_out_utf8, tail, utf8str;
			var allowBufError = false;
			if (this.ended) return false;
			_mode = mode$1 === ~~mode$1 ? mode$1 : mode$1 === true ? c.Z_FINISH : c.Z_NO_FLUSH;
			if (typeof data === "string") strm.input = strings.binstring2buf(data);
			else if (toString.call(data) === "[object ArrayBuffer]") strm.input = new Uint8Array(data);
			else strm.input = data;
			strm.next_in = 0;
			strm.avail_in = strm.input.length;
			do {
				if (strm.avail_out === 0) {
					strm.output = new utils.Buf8(chunkSize);
					strm.next_out = 0;
					strm.avail_out = chunkSize;
				}
				status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);
				if (status === c.Z_NEED_DICT && dictionary) status = zlib_inflate.inflateSetDictionary(this.strm, dictionary);
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
					if (strm.avail_out === 0 || status === c.Z_STREAM_END || strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH)) if (this.options.to === "string") {
						next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
						tail = strm.next_out - next_out_utf8;
						utf8str = strings.buf2string(strm.output, next_out_utf8);
						strm.next_out = tail;
						strm.avail_out = chunkSize - tail;
						if (tail) utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0);
						this.onData(utf8str);
					} else this.onData(utils.shrinkBuf(strm.output, strm.next_out));
				}
				if (strm.avail_in === 0 && strm.avail_out === 0) allowBufError = true;
			} while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);
			if (status === c.Z_STREAM_END) _mode = c.Z_FINISH;
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
			if (status === c.Z_OK) if (this.options.to === "string") this.result = this.chunks.join("");
			else this.result = utils.flattenChunks(this.chunks);
			this.chunks = [];
			this.err = status;
			this.msg = this.strm.msg;
		};
		function inflate$1(input, options) {
			var inflator = new Inflate(options);
			inflator.push(input, true);
			if (inflator.err) throw inflator.msg || msg[inflator.err];
			return inflator.result;
		}
		function inflateRaw$2(input, options) {
			options = options || {};
			options.raw = true;
			return inflate$1(input, options);
		}
		exports.Inflate = Inflate;
		exports.inflate = inflate$1;
		exports.inflateRaw = inflateRaw$2;
		exports.ungzip = inflate$1;
	}));
	var import_pako = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
		var assign = require_common().assign;
		var deflate = require_deflate();
		var inflate = require_inflate();
		var constants = require_constants();
		var pako = {};
		assign(pako, deflate, inflate, constants);
		module.exports = pako;
	})))();
	function saveImage(dataURL, dirname, callback) {
		UniViewJSBridge.invokeServiceMethod("base64ToTempFilePath", {
			dataURL,
			dirname
		}, (res) => {
			if (res.message) callback(res);
			else if (res.tempFilePath) callback(null, res.tempFilePath);
		});
	}
	function invokeHarmonyChannel(method, args) {
		return harmonyChannel.invokeSync(method, args ? args.map((arg) => JSON.stringify(arg)) : void 0);
	}
	function getSameOriginUrl(url) {
		return Promise.resolve(invokeHarmonyChannel("getSameOriginUrl", [url]));
	}
	function getRealPath(filepath) {
		if (filepath.indexOf("//") === 0) return "https:" + filepath;
		if (SCHEME_RE.test(filepath) || DATA_RE.test(filepath)) return filepath;
		if (isSystemURL(filepath)) return "file:/" + normalizeLocalPath(filepath);
		var href = location.href;
		var wwwPath = href.substring(0, href.lastIndexOf("/"));
		if (filepath.indexOf("/") === 0) {
			if (filepath.startsWith("/data/storage/")) return "file://" + filepath;
			return wwwPath + filepath;
		}
		if (filepath.indexOf("../") === 0 || filepath.indexOf("./") === 0) if (typeof __id__ === "string") return wwwPath + getRealRoute(addLeadingSlash(__id__), filepath);
		else {
			var page = getCurrentPage();
			if (page) return wwwPath + getRealRoute(addLeadingSlash(page.route), filepath);
		}
		return filepath;
	}
	var normalizeLocalPath = cacheStringFunction((filepath) => {
		return plus.io.convertLocalFileSystemURL(filepath).replace(/\/$/, "");
	});
	function isSystemURL(filepath) {
		if (filepath.indexOf("_www") === 0 || filepath.indexOf("_doc") === 0 || filepath.indexOf("_documents") === 0 || filepath.indexOf("_downloads") === 0) return true;
		return false;
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
	var maxWidth = 960;
	var baseWidth = 375;
	var includeWidth = 750;
	function checkDeviceWidth() {
		var windowWidth, pixelRatio$1, platform;
		var { windowWidth: w, pixelRatio: p$2, platform: pf } = getBaseSystemInfo();
		windowWidth = w;
		pixelRatio$1 = p$2;
		platform = pf;
		deviceWidth = windowWidth;
		deviceDPR = pixelRatio$1;
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
			checkMaxWidth();
		}
		number = Number(number);
		if (number === 0) return 0;
		var width = newDeviceWidth || deviceWidth;
		width = number === includeWidth || width <= maxWidth ? width : baseWidth;
		var result = number / BASE_DEVICE_WIDTH * width;
		if (result < 0) result = -result;
		result = Math.floor(result + EPS);
		if (result === 0) if (deviceDPR === 1 || !isIOS) result = 1;
		else result = .5;
		return number < 0 ? -result : result;
	}, Upx2pxProtocol);
	var require__object_pie = /* @__PURE__ */ __commonJSMin(((exports) => {
		exports.f = {}.propertyIsEnumerable;
	}));
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
				var i$1 = 0;
				var result = [];
				var key$1;
				while (length > i$1) {
					key$1 = keys[i$1++];
					if (!DESCRIPTORS || isEnum.call(O, key$1)) result.push(isEntries ? [key$1, O[key$1]] : O[key$1]);
				}
				return result;
			};
		};
	}));
	var $export$1 = require__export();
	var $values = require__object_to_array()(false);
	$export$1($export$1.S, "Object", { values: function values(it) {
		return $values(it);
	} });
	var API_SET_PAGE_META = "setPageMeta";
	var API_LOAD_FONT_FACE = "loadFontFace";
	var API_PAGE_SCROLL_TO = "pageScrollTo";
	var initIntersectionObserverPolyfill = function() {
		"use strict";
		if (typeof window !== "object") return;
		if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
			if (!("isIntersecting" in window.IntersectionObserverEntry.prototype)) Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", { get: function() {
				return this.intersectionRatio > 0;
			} });
			return;
		}
		function getFrameElement(doc$1) {
			try {
				return doc$1.defaultView && doc$1.defaultView.frameElement || null;
			} catch (e$1) {
				return null;
			}
		}
		var document$3 = function(startDoc) {
			var doc$1 = startDoc;
			var frame = getFrameElement(doc$1);
			while (frame) {
				doc$1 = frame.ownerDocument;
				frame = getFrameElement(doc$1);
			}
			return doc$1;
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
			if (targetArea) this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
			else this.intersectionRatio = this.isIntersecting ? 1 : 0;
		}
		function IntersectionObserver$1(callback, opt_options) {
			var options = opt_options || {};
			if (typeof callback != "function") throw new Error("callback must be a function");
			if (options.root && options.root.nodeType != 1 && options.root.nodeType != 9) throw new Error("root must be a Document or Element");
			this._checkForIntersections = throttle$1(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);
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
		IntersectionObserver$1.prototype.THROTTLE_TIMEOUT = 100;
		IntersectionObserver$1.prototype.POLL_INTERVAL = null;
		IntersectionObserver$1.prototype.USE_MUTATION_OBSERVER = true;
		IntersectionObserver$1._setupCrossOriginUpdater = function() {
			if (!crossOriginUpdater) crossOriginUpdater = function(boundingClientRect, intersectionRect) {
				if (!boundingClientRect || !intersectionRect) crossOriginRect = getEmptyRect();
				else crossOriginRect = convertFromParentRect(boundingClientRect, intersectionRect);
				registry.forEach(function(observer) {
					observer._checkForIntersections();
				});
			};
			return crossOriginUpdater;
		};
		IntersectionObserver$1._resetCrossOriginUpdater = function() {
			crossOriginUpdater = null;
			crossOriginRect = null;
		};
		IntersectionObserver$1.prototype.observe = function(target) {
			if (this._observationTargets.some(function(item) {
				return item.element == target;
			})) return;
			if (!(target && target.nodeType == 1)) throw new Error("target must be an Element");
			this._registerInstance();
			this._observationTargets.push({
				element: target,
				entry: null
			});
			this._monitorIntersections(target.ownerDocument);
			this._checkForIntersections();
		};
		IntersectionObserver$1.prototype.unobserve = function(target) {
			this._observationTargets = this._observationTargets.filter(function(item) {
				return item.element != target;
			});
			this._unmonitorIntersections(target.ownerDocument);
			if (this._observationTargets.length == 0) this._unregisterInstance();
		};
		IntersectionObserver$1.prototype.disconnect = function() {
			this._observationTargets = [];
			this._unmonitorAllIntersections();
			this._unregisterInstance();
		};
		IntersectionObserver$1.prototype.takeRecords = function() {
			var records = this._queuedEntries.slice();
			this._queuedEntries = [];
			return records;
		};
		IntersectionObserver$1.prototype._initThresholds = function(opt_threshold) {
			var threshold = opt_threshold || [0];
			if (!Array.isArray(threshold)) threshold = [threshold];
			return threshold.sort().filter(function(t$1, i$1, a$1) {
				if (typeof t$1 != "number" || isNaN(t$1) || t$1 < 0 || t$1 > 1) throw new Error("threshold must be a number between 0 and 1 inclusively");
				return t$1 !== a$1[i$1 - 1];
			});
		};
		IntersectionObserver$1.prototype._parseRootMargin = function(opt_rootMargin) {
			var margins = (opt_rootMargin || "0px").split(/\s+/).map(function(margin) {
				var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
				if (!parts) throw new Error("rootMargin must be specified in pixels or percent");
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
		IntersectionObserver$1.prototype._monitorIntersections = function(doc$1) {
			var win = doc$1.defaultView;
			if (!win) return;
			if (this._monitoringDocuments.indexOf(doc$1) != -1) return;
			var callback = this._checkForIntersections;
			var monitoringInterval = null;
			var domObserver = null;
			if (this.POLL_INTERVAL) monitoringInterval = win.setInterval(callback, this.POLL_INTERVAL);
			else {
				addEvent(win, "resize", callback, true);
				addEvent(doc$1, "scroll", callback, true);
				if (this.USE_MUTATION_OBSERVER && "MutationObserver" in win) {
					domObserver = new win.MutationObserver(callback);
					domObserver.observe(doc$1, {
						attributes: true,
						childList: true,
						characterData: true,
						subtree: true
					});
				}
			}
			this._monitoringDocuments.push(doc$1);
			this._monitoringUnsubscribes.push(function() {
				var win$1 = doc$1.defaultView;
				if (win$1) {
					if (monitoringInterval) win$1.clearInterval(monitoringInterval);
					removeEvent(win$1, "resize", callback, true);
				}
				removeEvent(doc$1, "scroll", callback, true);
				if (domObserver) domObserver.disconnect();
			});
			if (doc$1 != (this.root && (this.root.ownerDocument || this.root) || document$3)) {
				var frame = getFrameElement(doc$1);
				if (frame) this._monitorIntersections(frame.ownerDocument);
			}
		};
		IntersectionObserver$1.prototype._unmonitorIntersections = function(doc$1) {
			var index$3 = this._monitoringDocuments.indexOf(doc$1);
			if (index$3 == -1) return;
			var rootDoc = this.root && (this.root.ownerDocument || this.root) || document$3;
			if (this._observationTargets.some(function(item) {
				var itemDoc = item.element.ownerDocument;
				if (itemDoc == doc$1) return true;
				while (itemDoc && itemDoc != rootDoc) {
					var frame$1 = getFrameElement(itemDoc);
					itemDoc = frame$1 && frame$1.ownerDocument;
					if (itemDoc == doc$1) return true;
				}
				return false;
			})) return;
			var unsubscribe = this._monitoringUnsubscribes[index$3];
			this._monitoringDocuments.splice(index$3, 1);
			this._monitoringUnsubscribes.splice(index$3, 1);
			unsubscribe();
			if (doc$1 != rootDoc) {
				var frame = getFrameElement(doc$1);
				if (frame) this._unmonitorIntersections(frame.ownerDocument);
			}
		};
		IntersectionObserver$1.prototype._unmonitorAllIntersections = function() {
			var unsubscribes = this._monitoringUnsubscribes.slice(0);
			this._monitoringDocuments.length = 0;
			this._monitoringUnsubscribes.length = 0;
			for (var i$1 = 0; i$1 < unsubscribes.length; i$1++) unsubscribes[i$1]();
		};
		IntersectionObserver$1.prototype._checkForIntersections = function() {
			if (!this.root && crossOriginUpdater && !crossOriginRect) return;
			var rootIsInDom = this._rootIsInDom();
			var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();
			this._observationTargets.forEach(function(item) {
				var target = item.element;
				var targetRect = getBoundingClientRect(target);
				var rootContainsTarget = this._rootContainsTarget(target);
				var oldEntry = item.entry;
				var intersectionRect = rootIsInDom && rootContainsTarget && this._computeTargetAndRootIntersection(target, targetRect, rootRect);
				var rootBounds = null;
				if (!this._rootContainsTarget(target)) rootBounds = getEmptyRect();
				else if (!crossOriginUpdater || this.root) rootBounds = rootRect;
				var newEntry = item.entry = new IntersectionObserverEntry({
					time: now(),
					target,
					boundingClientRect: targetRect,
					rootBounds,
					intersectionRect
				});
				if (!oldEntry) this._queuedEntries.push(newEntry);
				else if (rootIsInDom && rootContainsTarget) {
					if (this._hasCrossedThreshold(oldEntry, newEntry)) this._queuedEntries.push(newEntry);
				} else if (oldEntry && oldEntry.isIntersecting) this._queuedEntries.push(newEntry);
			}, this);
			if (this._queuedEntries.length) this._callback(this.takeRecords(), this);
		};
		IntersectionObserver$1.prototype._computeTargetAndRootIntersection = function(target, targetRect, rootRect) {
			if (window.getComputedStyle(target).display == "none") return;
			var intersectionRect = targetRect;
			var parent = getParentNode(target);
			var atRoot = false;
			while (!atRoot && parent) {
				var parentRect = null;
				var parentComputedStyle = parent.nodeType == 1 ? window.getComputedStyle(parent) : {};
				if (parentComputedStyle.display == "none") return null;
				if (parent == this.root || parent.nodeType == 9) {
					atRoot = true;
					if (parent == this.root || parent == document$3) if (crossOriginUpdater && !this.root) if (!crossOriginRect || crossOriginRect.width == 0 && crossOriginRect.height == 0) {
						parent = null;
						parentRect = null;
						intersectionRect = null;
					} else parentRect = crossOriginRect;
					else parentRect = rootRect;
					else {
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
					var doc$1 = parent.ownerDocument;
					if (parent != doc$1.body && parent != doc$1.documentElement && parentComputedStyle.overflow != "visible") parentRect = getBoundingClientRect(parent);
				}
				if (parentRect) intersectionRect = computeRectIntersection(parentRect, intersectionRect);
				if (!intersectionRect) break;
				parent = parent && getParentNode(parent);
			}
			return intersectionRect;
		};
		IntersectionObserver$1.prototype._getRootRect = function() {
			var rootRect;
			if (this.root && !isDoc(this.root)) rootRect = getBoundingClientRect(this.root);
			else {
				var doc$1 = isDoc(this.root) ? this.root : document$3;
				var html = doc$1.documentElement;
				var body = doc$1.body;
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
		IntersectionObserver$1.prototype._expandRectByRootMargin = function(rect) {
			var margins = this._rootMarginValues.map(function(margin, i$1) {
				return margin.unit == "px" ? margin.value : margin.value * (i$1 % 2 ? rect.width : rect.height) / 100;
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
		IntersectionObserver$1.prototype._hasCrossedThreshold = function(oldEntry, newEntry) {
			var oldRatio = oldEntry && oldEntry.isIntersecting ? oldEntry.intersectionRatio || 0 : -1;
			var newRatio = newEntry.isIntersecting ? newEntry.intersectionRatio || 0 : -1;
			if (oldRatio === newRatio) return;
			for (var i$1 = 0; i$1 < this.thresholds.length; i$1++) {
				var threshold = this.thresholds[i$1];
				if (threshold == oldRatio || threshold == newRatio || threshold < oldRatio !== threshold < newRatio) return true;
			}
		};
		IntersectionObserver$1.prototype._rootIsInDom = function() {
			return !this.root || containsDeep(document$3, this.root);
		};
		IntersectionObserver$1.prototype._rootContainsTarget = function(target) {
			var rootDoc = this.root && (this.root.ownerDocument || this.root) || document$3;
			return containsDeep(rootDoc, target) && (!this.root || rootDoc == target.ownerDocument);
		};
		IntersectionObserver$1.prototype._registerInstance = function() {
			if (registry.indexOf(this) < 0) registry.push(this);
		};
		IntersectionObserver$1.prototype._unregisterInstance = function() {
			var index$3 = registry.indexOf(this);
			if (index$3 != -1) registry.splice(index$3, 1);
		};
		function now() {
			return window.performance && performance.now && performance.now();
		}
		function throttle$1(fn, timeout) {
			var timer = null;
			return function() {
				if (!timer) timer = setTimeout(function() {
					fn();
					timer = null;
				}, timeout);
			};
		}
		function addEvent(node, event, fn, opt_useCapture) {
			if (typeof node.addEventListener == "function") node.addEventListener(event, fn, opt_useCapture || false);
			else if (typeof node.attachEvent == "function") node.attachEvent("on" + event, fn);
		}
		function removeEvent(node, event, fn, opt_useCapture) {
			if (typeof node.removeEventListener == "function") node.removeEventListener(event, fn, opt_useCapture || false);
			else if (typeof node.detatchEvent == "function") node.detatchEvent("on" + event, fn);
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
			} catch (err$1) {}
			if (!rect) return getEmptyRect();
			if (!(rect.width && rect.height)) rect = {
				top: rect.top,
				right: rect.right,
				bottom: rect.bottom,
				left: rect.left,
				width: rect.right - rect.left,
				height: rect.bottom - rect.top
			};
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
			if (!rect || "x" in rect) return rect;
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
				if (node == parent) return true;
				node = getParentNode(node);
			}
			return false;
		}
		function getParentNode(node) {
			var parent = node.parentNode;
			if (node.nodeType == 9 && node != document$3) return getFrameElement(node);
			if (parent && parent.assignedSlot) parent = parent.assignedSlot.parentNode;
			if (parent && parent.nodeType == 11 && parent.host) return parent.host;
			return parent;
		}
		function isDoc(node) {
			return node && node.nodeType === 9;
		}
		window.IntersectionObserver = IntersectionObserver$1;
		window.IntersectionObserverEntry = IntersectionObserverEntry;
	};
	function normalizeRect(rect) {
		var { bottom, height, left, right, top, width } = rect || {};
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
		var { intersectionRatio, boundingClientRect: { height: overAllHeight, width: overAllWidth }, intersectionRect: { height: intersectionHeight, width: intersectionWidth } } = entrie;
		if (intersectionRatio !== 0) return intersectionRatio;
		return intersectionHeight === overAllHeight ? intersectionWidth / overAllWidth : intersectionHeight / overAllHeight;
	}
	function requestComponentObserver($el, options, callback) {
		initIntersectionObserverPolyfill();
		var root = options.relativeToSelector ? $el.querySelector(options.relativeToSelector) : null;
		var intersectionObserver = new IntersectionObserver((entries$1) => {
			entries$1.forEach((entrie) => {
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
			for (var i$1 = 0; i$1 < nodeList.length; i$1++) intersectionObserver.observe(nodeList[i$1]);
		} else {
			intersectionObserver.USE_MUTATION_OBSERVER = false;
			var el = $el.matches(options.selector) ? $el : $el.querySelector(options.selector);
			if (!el) console.warn("Node ".concat(options.selector, " is not found. Intersection observer will not trigger."));
			else intersectionObserver.observe(el);
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
	var api_exports = /* @__PURE__ */ __export({
		navigateBack: () => navigateBack,
		navigateTo: () => navigateTo,
		reLaunch: () => reLaunch,
		redirectTo: () => redirectTo,
		switchTab: () => switchTab,
		upx2px: () => upx2px
	}, 1);
	init_web_dom_iterable();
	function createGetDict(dict) {
		if (!dict.length) return (v$1) => v$1;
		var getDict = function(value) {
			var includeValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
			if (typeof value === "number") return dict[value];
			var res = {};
			value.forEach((_ref) => {
				var [n, v$1] = _ref;
				if (includeValue) res[getDict(n)] = getDict(v$1);
				else res[getDict(n)] = v$1;
			});
			return res;
		};
		return getDict;
	}
	function decodeNodeJson(getDict, nodeJson) {
		if (!nodeJson) return;
		if (hasOwn(nodeJson, "a")) nodeJson.a = getDict(nodeJson.a);
		if (hasOwn(nodeJson, "e")) nodeJson.e = getDict(nodeJson.e, false);
		if (hasOwn(nodeJson, "w")) nodeJson.w = getWxsEventDict(nodeJson.w, getDict);
		if (hasOwn(nodeJson, "s")) nodeJson.s = getDict(nodeJson.s);
		if (hasOwn(nodeJson, "t")) nodeJson.t = getDict(nodeJson.t);
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
	init_web_dom_iterable();
	var elements = /* @__PURE__ */ new Map();
	function $(id$1) {
		return elements.get(id$1);
	}
	function getElement(id$1) {
		return elements.get(id$1);
	}
	function setElement(id$1, element) {
		elements.set(id$1, element);
	}
	function removeElement(id$1) {
		return elements.delete(id$1);
	}
	init_web_dom_iterable();
	function createActionJob(fn, priority) {
		return fn.priority = priority, fn;
	}
	var postActionJobs = /* @__PURE__ */ new Set();
	function queuePostActionJob(job, priority) {
		postActionJobs.add(createActionJob(job, priority));
	}
	function flushPostActionJobs() {
		try {
			[...postActionJobs].sort((a$1, b) => a$1.priority - b.priority).forEach((fn) => fn());
		} finally {
			postActionJobs.clear();
		}
	}
	init_web_dom_iterable();
	function getViewModule(moduleId, ownerEl) {
		var __wxsModules = window["__" + WXS_MODULES];
		var module$1 = __wxsModules && __wxsModules[moduleId];
		if (module$1) return module$1;
		if (ownerEl && ownerEl.__renderjsInstances) return ownerEl.__renderjsInstances[moduleId];
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
		return invokeWxsMethod(ownerEl, moduleId, moduleName, methodName, [wrapperWxsEvent(event, el), getComponentDescriptor(createComponentDescriptorVm(ownerEl), false)]);
	}
	function resolveOwnerEl(el, ownerId) {
		if (el.__ownerId === ownerId) return el;
		var parentElement = el.parentElement;
		while (parentElement) {
			if (parentElement.__ownerId === ownerId) return parentElement;
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
		return invokeWxsMethod(ownerEl, moduleId, moduleName, methodName, [
			newValue,
			oldValue,
			getComponentDescriptor(createComponentDescriptorVm(ownerEl), false),
			getComponentDescriptor(createComponentDescriptorVm(el), false)
		]);
	}
	function invokeWxsMethod(ownerEl, moduleId, moduleName, methodName, args) {
		var module$1 = getViewModule(moduleId, ownerEl);
		if (!module$1) return console.error(formatLog("wxs", "module " + moduleName + " not found"));
		var method = module$1[methodName];
		if (!isFunction(method)) return console.error(moduleName + "." + methodName + " is not a function");
		return method.apply(module$1, args);
	}
	function getWxsProp(ownerEl, moduleId, dataPath) {
		var module$1 = getViewModule(moduleId, ownerEl);
		if (!module$1) return console.error(formatLog("wxs", "module " + dataPath + " not found"));
		return getValueByDataPath(module$1, dataPath.slice(dataPath.indexOf(".") + 1));
	}
	function createWxsPropsInvoker(node, wxsInvoker, value) {
		var oldValue = value;
		return (newValue) => {
			try {
				invokeWxsProps(wxsInvoker, node.$, newValue, oldValue);
			} catch (e$1) {
				console.error(e$1);
			}
			oldValue = newValue;
		};
	}
	function wrapperWxsEvent(event, el) {
		var vm = createComponentDescriptorVm(el);
		Object.defineProperty(event, "instance", { get() {
			return getComponentDescriptor(vm, false);
		} });
		return event;
	}
	function initRenderjs(node, moduleIds) {
		Object.keys(moduleIds).forEach((name) => {
			initRenderjsModule(node, moduleIds[name]);
		});
	}
	function destroyRenderjs(node) {
		var { __renderjsInstances } = node.$;
		if (!__renderjsInstances) return;
		Object.keys(__renderjsInstances).forEach((id$1) => {
			__renderjsInstances[id$1].$.appContext.app.unmount();
		});
	}
	function initRenderjsModule(node, moduleId) {
		var options = getRenderjsModule(moduleId);
		if (!options) return;
		var el = node.$;
		(el.__renderjsInstances || (el.__renderjsInstances = {}))[moduleId] = createRenderjsInstance(el, options);
	}
	function getRenderjsModule(moduleId) {
		var __renderjsModules = window["__" + RENDERJS_MODULES];
		var module$1 = __renderjsModules && __renderjsModules[moduleId];
		if (!module$1) return console.error(formatLog("renderjs", moduleId + " not found"));
		return module$1;
	}
	function createRenderjsInstance(el, options) {
		options = options.default || options;
		options.render = () => {};
		return createApp(options).mixin({ mounted() {
			this.$ownerInstance = getComponentDescriptor(createComponentDescriptorVm(el), false);
		} }).mount(document.createElement("div"));
	}
	var JSON_PROTOCOL_LEN = JSON_PROTOCOL.length;
	function decodeAttr(value, el) {
		if (!isString(value)) return value;
		if (value.indexOf("json://") === 0) value = JSON.parse(value.slice(JSON_PROTOCOL_LEN));
		else if (value.indexOf("wxs://") === 0) value = invokeWxs(el, value);
		return value;
	}
	function isCssVar(name) {
		return name.indexOf("--") === 0;
	}
	function isUniComponent(el) {
		return !!el.addWxsEvent;
	}
	init_web_dom_iterable();
	var UniNode = class {
		constructor(id$1, tag, parentNodeId, element) {
			this.isMounted = false;
			this.isUnmounted = false;
			this.$hasWxsProps = false;
			this.$children = [];
			this.id = id$1;
			this.tag = tag;
			this.pid = parentNodeId;
			if (element) this.$ = element;
			this.$wxsProps = /* @__PURE__ */ new Map();
			var parent = this.$parent = getElement(parentNodeId);
			if (parent) parent.appendUniChild(this);
		}
		init(nodeJson) {
			arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
			if (hasOwn(nodeJson, "t")) this.$.textContent = nodeJson.t;
		}
		setText(text) {
			this.$.textContent = text;
			this.updateView();
		}
		insert(parentNodeId, refNodeId, nodeJson) {
			if (nodeJson) this.init(nodeJson, false);
			var node = this.$;
			var parentNode = $(parentNodeId);
			if (refNodeId === -1) parentNode.appendChild(node);
			else parentNode.insertBefore(node, $(refNodeId).$);
			this.isMounted = true;
		}
		remove() {
			this.removeUniParent();
			var { $: $$1 } = this;
			$$1.parentNode.removeChild($$1);
			this.isUnmounted = true;
			removeElement(this.id);
			destroyRenderjs(this);
			this.removeUniChildren();
			this.updateView();
		}
		appendChild(node) {
			var ref$1 = this.$.appendChild(node);
			this.updateView(true);
			return ref$1;
		}
		insertBefore(newChild, refChild) {
			var ref$1 = this.$.insertBefore(newChild, refChild);
			this.updateView(true);
			return ref$1;
		}
		appendUniChild(node) {
			this.$children.push(node);
		}
		removeUniChild(node) {
			var index$3 = this.$children.indexOf(node);
			if (index$3 >= 0) this.$children.splice(index$3, 1);
		}
		removeUniParent() {
			var { $parent } = this;
			if ($parent) {
				$parent.removeUniChild(this);
				this.$parent = void 0;
			}
		}
		removeUniChildren() {
			for (var i$1 = this.$children.length - 1; i$1 >= 0; i$1--) this.$children[i$1].remove();
			this.$children.length = 0;
		}
		setWxsProps(attrs$1) {
			Object.keys(attrs$1).forEach((name) => {
				if (name.indexOf("change:") === 0) {
					var propName = name.replace(ATTR_CHANGE_PREFIX, "");
					var value = decodeAttr(attrs$1[propName]);
					var invoker = createWxsPropsInvoker(this, attrs$1[name], value);
					queuePostActionJob(() => invoker(value), 4);
					this.$wxsProps.set(name, invoker);
					delete attrs$1[name];
					delete attrs$1[propName];
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
		addWxsEvent(name, wxsEvent, flag) {}
		wxsPropsInvoke(name, value) {
			var isNextTick = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
			var wxsPropsInvoker = this.$hasWxsProps && this.$wxsProps.get("change:" + name);
			if (wxsPropsInvoker) return queuePostActionJob(() => isNextTick ? nextTick(() => wxsPropsInvoker(value)) : wxsPropsInvoker(value), 4), true;
		}
		updateView(isMounted) {
			if (this.isMounted || isMounted) window.dispatchEvent(new CustomEvent("updateview"));
		}
	};
	function patchClass(el, clazz) {
		var { __wxsAddClass, __wxsRemoveClass } = el;
		if (__wxsRemoveClass && __wxsRemoveClass.length) {
			clazz = clazz.split(/\s+/).filter((v$1) => __wxsRemoveClass.indexOf(v$1) === -1).join(" ");
			__wxsRemoveClass.length = 0;
		}
		if (__wxsAddClass && __wxsAddClass.length) clazz = clazz + " " + __wxsAddClass.join(" ");
		el.className = clazz;
	}
	function normalizeStyleValue$1(val) {
		return normalizeUrl(normalizeRpx(val));
	}
	var urlRE = /url\(\s*'?"?([a-zA-Z0-9\.\-\_\/]+\.(jpg|gif|png))"?'?\s*\)/;
	var normalizeUrl = (val) => {
		if (isString(val) && val.indexOf("url(") !== -1) {
			var matches$1 = val.match(urlRE);
			if (matches$1 && matches$1.length === 3) val = val.replace(matches$1[1], getRealPath(matches$1[1]));
		}
		return val;
	};
	var { unit, unitRatio, unitPrecision } = defaultRpx2Unit;
	var rpx2Unit$1 = createRpx2Unit(unit, unitRatio, unitPrecision);
	var normalizeRpx = (val) => {
		if (isString(val)) return rpx2Unit$1(val);
		return val;
	};
	var prefixes = ["Webkit"];
	var prefixCache = {};
	function normalizeStyleName$1(style, rawName) {
		var cached = prefixCache[rawName];
		if (cached) return cached;
		var name = camelize(rawName);
		if (name !== "filter" && name in style) return prefixCache[rawName] = name;
		name = capitalize(name);
		for (var i$1 = 0; i$1 < prefixes.length; i$1++) {
			var prefixed = prefixes[i$1] + name;
			if (prefixed in style) return prefixCache[rawName] = prefixed;
		}
		return rawName;
	}
	function patchStyle(el, value) {
		var style = el.style;
		if (isString(value)) if (value === "") el.removeAttribute("style");
		else style.cssText = normalizeStyleValue$1(value);
		else for (var key$1 in value) setStyle(style, key$1, value[key$1]);
		var { __wxsStyle } = el;
		if (__wxsStyle) for (var _key in __wxsStyle) setStyle(style, _key, __wxsStyle[_key]);
	}
	var importantRE = /\s*!important$/;
	function setStyle(style, name, val) {
		if (isArray(val)) val.forEach((v$1) => setStyle(style, name, v$1));
		else {
			val = normalizeStyleValue$1(val);
			if (name.startsWith("--")) style.setProperty(name, val);
			else {
				var prefixed = normalizeStyleName$1(style, name);
				if (importantRE.test(val)) style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
				else style[prefixed] = val;
			}
		}
	}
	init_web_dom_iterable();
	function removeEventListener(el, type) {
		var listener = el.__listeners[type];
		if (listener) el.removeEventListener(type, listener);
	}
	function isEventListenerExists(el, type) {
		if (el.__listeners[type]) return true;
	}
	function patchEvent(el, name, flag) {
		var [type, options] = parseEventName(name);
		if (flag === -1) removeEventListener(el, type);
		else if (!isEventListenerExists(el, type)) el.addEventListener(type, el.__listeners[type] = createInvoker(el.__id, flag, options), options);
	}
	function createInvoker(id$1, flag, options) {
		var invoker = (evt) => {
			var [event] = $nne(evt);
			event.type = normalizeEventType(evt.type, options);
			UniViewJSBridge.publishHandler(VD_SYNC, [[
				20,
				id$1,
				event
			]]);
		};
		if (!flag) return invoker;
		return withModifiers(invoker, resolveModifier(flag));
	}
	function resolveModifier(flag) {
		var modifiers = [];
		if (flag & EventModifierFlags.prevent) modifiers.push("prevent");
		if (flag & EventModifierFlags.self) modifiers.push("self");
		if (flag & EventModifierFlags.stop) modifiers.push("stop");
		return modifiers;
	}
	function patchWxsEvent(el, name, wxsEvent, flag) {
		var [type, options] = parseEventName(name);
		if (flag === -1) removeEventListener(el, type);
		else if (!isEventListenerExists(el, type)) el.addEventListener(type, el.__listeners[type] = createWxsEventInvoker(el, wxsEvent, flag), options);
	}
	function createWxsEventInvoker(el, wxsEvent, flag) {
		var invoker = (evt) => {
			invokeWxsEvent(isUniComponent(el) ? el.$ : el, wxsEvent, $nne(evt)[0]);
		};
		if (!flag) return invoker;
		return withModifiers(invoker, resolveModifier(flag));
	}
	function patchVShow(el, value) {
		el._vod = el.style.display === "none" ? "" : el.style.display;
		el.style.display = value ? el._vod : "none";
	}
	var UniElement = class extends UniNode {
		constructor(id$1, element, parentNodeId, refNodeId, nodeJson) {
			var propNames = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [];
			super(id$1, element.tagName, parentNodeId, element);
			this.$props = reactive({});
			this.$.__id = id$1;
			this.$.__listeners = Object.create(null);
			this.$propNames = propNames;
			this._update = this.update.bind(this);
			this.init(nodeJson);
			this.insert(parentNodeId, refNodeId);
		}
		init(nodeJson) {
			var isCreate = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
			if (hasOwn(nodeJson, "a")) this.setAttrs(nodeJson.a);
			if (hasOwn(nodeJson, "s")) this.setAttr("style", nodeJson.s);
			if (hasOwn(nodeJson, "e")) this.addEvents(nodeJson.e);
			if (hasOwn(nodeJson, "w")) this.addWxsEvents(nodeJson.w);
			super.init(nodeJson);
			if (isCreate) {
				watch(this.$props, () => {
					queuePostActionJob(this._update, 1);
				}, { flush: "sync" });
				this.update(true);
			}
		}
		setAttrs(attrs$1) {
			this.setWxsProps(attrs$1);
			Object.keys(attrs$1).forEach((name) => {
				this.setAttr(name, attrs$1[name]);
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
			if (name === "class") patchClass(this.$, value);
			else if (name === "style") patchStyle(this.$, value);
			else if (name === ".vShow") patchVShow(this.$, value);
			else if (name === ".vOwnerId") this.$.__ownerId = value;
			else if (name === ".vRenderjs") queuePostActionJob(() => initRenderjs(this, value), 3);
			else if (name === "innerHTML") this.$.innerHTML = value;
			else if (name === "textContent") this.setText(value);
			else this.setAttribute(name, value);
			this.updateView();
		}
		removeAttr(name) {
			if (name === "class") patchClass(this.$, "");
			else if (name === "style") patchStyle(this.$, "");
			else this.removeAttribute(name);
			this.updateView();
		}
		setAttribute(name, value) {
			value = decodeAttr(value, this.$);
			if (this.$propNames.indexOf(name) !== -1) this.$props[name] = value;
			else if (isCssVar(name)) this.$.style.setProperty(name, normalizeStyleValue$1(value));
			else if (!this.wxsPropsInvoke(name, value)) this.$.setAttribute(name, value);
		}
		removeAttribute(name) {
			if (this.$propNames.indexOf(name) !== -1) delete this.$props[name];
			else if (isCssVar(name)) this.$.style.removeProperty(name);
			else this.$.removeAttribute(name);
		}
		update() {
			arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
		}
	};
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
				if (type.startsWith("rotate") || type.startsWith("skew")) args = args.map((value$1) => parseFloat(value$1) + "deg");
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
		var index$3 = 0;
		var actions = animation.actions;
		var length = animation.actions.length;
		function animate() {
			var action = actions[index$3];
			var transition = action.option.transition;
			var style = getStyle(action);
			Object.keys(style).forEach((key$1) => {
				context.$el.style[key$1] = style[key$1];
			});
			index$3 += 1;
			if (index$3 < length) setTimeout(animate, transition.duration + transition.delay);
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
	var defineBuiltInComponent = (options) => {
		options.__reserved = true;
		var { props: props$30, mixins } = options;
		if (!props$30 || !props$30.animation) (mixins || (options.mixins = [])).push(animation_default);
		return defineSystemComponent(options);
	};
	var defineSystemComponent = (options) => {
		options.__reserved = true;
		options.compatConfig = { MODE: 3 };
		return /* @__PURE__ */ defineComponent(options);
	};
	function withWebEvent(fn) {
		return fn.__wwe = true, fn;
	}
	function useCustomEvent(ref$1, emit$3) {
		return (name, evt, detail) => {
			if (ref$1.value) emit$3(name, normalizeCustomEvent(name, evt, ref$1.value, detail || {}));
		};
	}
	function useNativeEvent(emit$3) {
		return (name, evt) => {
			emit$3(name, createNativeEvent(evt));
		};
	}
	function normalizeCustomEvent(name, domEvt, el, detail) {
		var target = normalizeTarget(el);
		return {
			type: domEvt.__evName || detail.type || name,
			timeStamp: domEvt.timeStamp || 0,
			target,
			currentTarget: target,
			detail
		};
	}
	function useHover(props$30) {
		var hovering = ref(false);
		var hoverTouch = false;
		var hoverStartTimer;
		var hoverStayTimer;
		function hoverReset() {
			requestAnimationFrame(() => {
				clearTimeout(hoverStayTimer);
				hoverStayTimer = setTimeout(() => {
					hovering.value = false;
				}, parseInt(props$30.hoverStayTime));
			});
		}
		function onTouchstartPassive(evt) {
			if (evt.touches.length > 1) return;
			handleHoverStart(evt);
		}
		function onMousedown(evt) {
			if (hoverTouch) return;
			handleHoverStart(evt);
			window.addEventListener("mouseup", handlePCHoverEnd);
		}
		function handleHoverStart(evt) {
			if (evt._hoverPropagationStopped) return;
			if (!props$30.hoverClass || props$30.hoverClass === "none" || props$30.disabled) return;
			if (props$30.hoverStopPropagation) evt._hoverPropagationStopped = true;
			hoverTouch = true;
			hoverStartTimer = setTimeout(() => {
				hovering.value = true;
				if (!hoverTouch) hoverReset();
			}, parseInt(props$30.hoverStartTime));
		}
		function onTouchend() {
			handleHoverEnd();
		}
		function onMouseup() {
			if (!hoverTouch) return;
			handlePCHoverEnd();
		}
		function handleHoverEnd() {
			hoverTouch = false;
			if (hovering.value) hoverReset();
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
	function useBooleanAttr(props$30, keys) {
		if (isString(keys)) keys = [keys];
		return keys.reduce((res, key$1) => {
			if (props$30[key$1]) res[key$1] = true;
			return res;
		}, Object.create(null));
	}
	createRpx2Unit(defaultRpx2Unit.unit, defaultRpx2Unit.unitRatio, defaultRpx2Unit.unitPrecision);
	init_web_dom_iterable();
	var uniFormKey = PolySymbol("uf");
	var form_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "Form",
		emits: ["submit", "reset"],
		setup(_props, _ref) {
			var { slots, emit: emit$3 } = _ref;
			var rootRef = ref(null);
			provideForm(useCustomEvent(rootRef, emit$3));
			return () => createVNode("uni-form", { "ref": rootRef }, [createVNode("span", null, [slots.default && slots.default()])], 512);
		}
	});
	function provideForm(trigger$1) {
		var fields$1 = [];
		provide(uniFormKey, {
			addField(field) {
				fields$1.push(field);
			},
			removeField(field) {
				fields$1.splice(fields$1.indexOf(field), 1);
			},
			submit(evt) {
				trigger$1("submit", evt, { value: fields$1.reduce((res, field) => {
					if (field.submit) {
						var [name, value] = field.submit();
						name && (res[name] = value);
					}
					return res;
				}, Object.create(null)) });
			},
			reset(evt) {
				fields$1.forEach((field) => field.reset && field.reset());
				trigger$1("reset", evt);
			}
		});
		return fields$1;
	}
	var labelProps = { for: {
		type: String,
		default: ""
	} };
	var uniLabelKey = PolySymbol("ul");
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
	var label_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "Label",
		props: labelProps,
		setup(props$30, _ref) {
			var { slots } = _ref;
			var rootRef = ref(null);
			var pageId = useCurrentPageId();
			var handlers = useProvideLabel();
			var pointer = computed(() => props$30.for || slots.default && slots.default.length);
			var _onClick = withWebEvent(($event) => {
				var EventTarget = $event.target;
				var stopPropagation = /^uni-(checkbox|radio|switch)-/.test(EventTarget.className);
				if (!stopPropagation) stopPropagation = /^uni-(checkbox|radio|switch|button)$|^(svg|path)$/i.test(EventTarget.tagName);
				if (stopPropagation) return;
				if (props$30.for) UniViewJSBridge.emit("uni-label-click-" + pageId + "-" + props$30.for, $event, true);
				else handlers.length && handlers[0]($event, true);
			});
			return () => createVNode("uni-label", {
				"ref": rootRef,
				"class": { "uni-label-pointer": pointer },
				"onClick": _onClick
			}, [slots.default && slots.default()], 10, ["onClick"]);
		}
	});
	function useListeners(props$30, listeners$1) {
		_addListeners(props$30.id, listeners$1);
		watch(() => props$30.id, (newId, oldId) => {
			_removeListeners(oldId, listeners$1, true);
			_addListeners(newId, listeners$1, true);
		});
		onUnmounted(() => {
			_removeListeners(props$30.id, listeners$1);
		});
	}
	function _addListeners(id$1, listeners$1, watch$1) {
		var pageId = useCurrentPageId();
		if (watch$1 && !id$1) return;
		if (!isPlainObject(listeners$1)) return;
		Object.keys(listeners$1).forEach((name) => {
			if (watch$1) {
				if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) UniViewJSBridge.on("uni-".concat(name, "-").concat(pageId, "-").concat(id$1), listeners$1[name]);
			} else if (name.indexOf("uni-") === 0) UniViewJSBridge.on(name, listeners$1[name]);
			else if (id$1) UniViewJSBridge.on("uni-".concat(name, "-").concat(pageId, "-").concat(id$1), listeners$1[name]);
		});
	}
	function _removeListeners(id$1, listeners$1, watch$1) {
		var pageId = useCurrentPageId();
		if (watch$1 && !id$1) return;
		if (!isPlainObject(listeners$1)) return;
		Object.keys(listeners$1).forEach((name) => {
			if (watch$1) {
				if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) UniViewJSBridge.off("uni-".concat(name, "-").concat(pageId, "-").concat(id$1), listeners$1[name]);
			} else if (name.indexOf("uni-") === 0) UniViewJSBridge.off(name, listeners$1[name]);
			else if (id$1) UniViewJSBridge.off("uni-".concat(name, "-").concat(pageId, "-").concat(id$1), listeners$1[name]);
		});
	}
	var button_default = /* @__PURE__ */ defineBuiltInComponent({
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
			},
			plain: {
				type: [Boolean, String],
				default: false
			}
		},
		setup(props$30, _ref) {
			var { slots } = _ref;
			var rootRef = ref(null);
			var uniForm = inject(uniFormKey, false);
			var { hovering, binding } = useHover(props$30);
			var { t: t$1 } = /* @__PURE__ */ useI18n();
			var onClick = withWebEvent((e$1, isLabelClick) => {
				if (props$30.disabled) return e$1.stopImmediatePropagation();
				if (isLabelClick) rootRef.value.click();
				var formType = props$30.formType;
				if (formType) {
					if (!uniForm) return;
					if (formType === "submit") uniForm.submit(e$1);
					else if (formType === "reset") uniForm.reset(e$1);
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
			useListeners(props$30, { "label-click": onClick });
			return () => {
				var hoverClass = props$30.hoverClass;
				var booleanAttrs = useBooleanAttr(props$30, "disabled");
				var loadingAttrs = useBooleanAttr(props$30, "loading");
				var plainAttrs = useBooleanAttr(props$30, "plain");
				var hasHoverClass = hoverClass && hoverClass !== "none";
				return createVNode("uni-button", mergeProps({
					"ref": rootRef,
					"onClick": onClick,
					"id": props$30.id,
					"class": hasHoverClass && hovering.value ? hoverClass : ""
				}, hasHoverClass && binding, booleanAttrs, loadingAttrs, plainAttrs), [slots.default && slots.default()], 16, ["onClick", "id"]);
			};
		}
	});
	var resize_sensor_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "ResizeSensor",
		props: { initial: {
			type: Boolean,
			default: false
		} },
		emits: ["resize"],
		setup(props$30, _ref) {
			var { emit: emit$3 } = _ref;
			var rootRef = ref(null);
			var reset = useResizeSensorReset(rootRef);
			var update = useResizeSensorUpdate(rootRef, emit$3, reset);
			useResizeSensorLifecycle(rootRef, props$30, update, reset);
			return () => createVNode("uni-resize-sensor", {
				"ref": rootRef,
				"onAnimationstartOnce": update
			}, [createVNode("div", { "onScroll": update }, [createVNode("div", null, null)], 40, ["onScroll"]), createVNode("div", { "onScroll": update }, [createVNode("div", null, null)], 40, ["onScroll"])], 40, ["onAnimationstartOnce"]);
		}
	});
	function useResizeSensorUpdate(rootRef, emit$3, reset) {
		var size$1 = reactive({
			width: -1,
			height: -1
		});
		watch(() => extend({}, size$1), (value) => emit$3("resize", value));
		return () => {
			var rootEl = rootRef.value;
			if (!rootEl) return;
			var rect = rootEl.getBoundingClientRect();
			size$1.width = rect.width;
			size$1.height = rect.height;
			reset();
		};
	}
	function useResizeSensorReset(rootRef) {
		return () => {
			var { firstElementChild, lastElementChild } = rootRef.value;
			firstElementChild.scrollLeft = 1e5;
			firstElementChild.scrollTop = 1e5;
			lastElementChild.scrollLeft = 1e5;
			lastElementChild.scrollTop = 1e5;
		};
	}
	function useResizeSensorLifecycle(rootRef, props$30, update, reset) {
		onActivated(reset);
		onMounted(() => {
			if (props$30.initial) nextTick(update);
			var rootEl = rootRef.value;
			if (rootEl.offsetParent !== rootEl.parentElement) rootEl.parentElement.style.position = "relative";
			if (!("AnimationEvent" in window)) reset();
		});
	}
	var pixelRatio = /* @__PURE__ */ function() {
		var canvas = document.createElement("canvas");
		canvas.height = canvas.width = 0;
		var context = canvas.getContext("2d");
		var backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
		return (window.devicePixelRatio || 1) / backingStore;
	}();
	function wrapper(canvas) {
		var hidpi = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
		var pixel_ratio = hidpi ? pixelRatio : 1;
		canvas.width = canvas.offsetWidth * pixel_ratio;
		canvas.height = canvas.offsetHeight * pixel_ratio;
		canvas.getContext("2d").__hidpi__ = hidpi;
	}
	var isHidpi = false;
	function initHidpi() {
		if (isHidpi) return;
		isHidpi = true;
		var forEach = function(obj, func) {
			for (var key$1 in obj) if (hasOwn(obj, key$1)) func(obj[key$1], key$1);
		};
		var ratioArgs = {
			fillRect: "all",
			clearRect: "all",
			strokeRect: "all",
			moveTo: "all",
			lineTo: "all",
			arc: [
				0,
				1,
				2
			],
			arcTo: "all",
			bezierCurveTo: "all",
			isPointinPath: "all",
			isPointinStroke: "all",
			quadraticCurveTo: "all",
			rect: "all",
			translate: "all",
			createRadialGradient: "all",
			createLinearGradient: "all",
			transform: [4, 5],
			setTransform: [4, 5]
		};
		var proto$1 = CanvasRenderingContext2D.prototype;
		proto$1.drawImageByCanvas = function(_super) {
			return function(canvas, srcx, srcy, srcw, srch, desx, desy, desw, desh, isScale) {
				if (!this.__hidpi__) return _super.apply(this, arguments);
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
		}(proto$1.drawImage);
		if (pixelRatio !== 1) {
			forEach(ratioArgs, function(value, key$1) {
				proto$1[key$1] = function(_super) {
					return function() {
						if (!this.__hidpi__) return _super.apply(this, arguments);
						var args = Array.prototype.slice.call(arguments);
						if (value === "all") args = args.map(function(a$1) {
							return a$1 * pixelRatio;
						});
						else if (Array.isArray(value)) for (var i$1 = 0; i$1 < value.length; i$1++) args[value[i$1]] *= pixelRatio;
						return _super.apply(this, args);
					};
				}(proto$1[key$1]);
			});
			proto$1.stroke = function(_super) {
				return function() {
					if (!this.__hidpi__) return _super.apply(this, arguments);
					this.lineWidth *= pixelRatio;
					_super.apply(this, arguments);
					this.lineWidth /= pixelRatio;
				};
			}(proto$1.stroke);
			proto$1.fillText = function(_super) {
				return function() {
					if (!this.__hidpi__) return _super.apply(this, arguments);
					var args = Array.prototype.slice.call(arguments);
					args[1] *= pixelRatio;
					args[2] *= pixelRatio;
					if (args[3] && typeof args[3] === "number") args[3] *= pixelRatio;
					var font = this.__font__ || this.font;
					this.font = font.replace(/(\d+\.?\d*)(px|em|rem|pt)/g, function(w, m, u) {
						return m * pixelRatio + u;
					});
					_super.apply(this, args);
					this.font = font;
				};
			}(proto$1.fillText);
			proto$1.strokeText = function(_super) {
				return function() {
					if (!this.__hidpi__) return _super.apply(this, arguments);
					var args = Array.prototype.slice.call(arguments);
					args[1] *= pixelRatio;
					args[2] *= pixelRatio;
					if (args[3] && typeof args[3] === "number") args[3] *= pixelRatio;
					var font = this.__font__ || this.font;
					this.font = font.replace(/(\d+\.?\d*)(px|em|rem|pt)/g, function(w, m, u) {
						return m * pixelRatio + u;
					});
					_super.apply(this, args);
					this.font = font;
				};
			}(proto$1.strokeText);
			proto$1.drawImage = function(_super) {
				return function() {
					if (!this.__hidpi__) return _super.apply(this, arguments);
					this.scale(pixelRatio, pixelRatio);
					_super.apply(this, arguments);
					this.scale(1 / pixelRatio, 1 / pixelRatio);
				};
			}(proto$1.drawImage);
		}
	}
	init_web_dom_iterable();
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
	function processTouches(rect, touches) {
		Array.from(touches).forEach((touch) => {
			touch.x = touch.clientX - rect.left;
			touch.y = touch.clientY - rect.top;
		});
	}
	var tempCanvas;
	function getTempCanvas() {
		var width = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
		var height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
		if (!tempCanvas) tempCanvas = document.createElement("canvas");
		tempCanvas.width = width;
		tempCanvas.height = height;
		return tempCanvas;
	}
	var canvas_default = /* @__PURE__ */ defineBuiltInComponent({
		inheritAttrs: false,
		name: "Canvas",
		compatConfig: { MODE: 3 },
		props: {
			canvasId: {
				type: String,
				default: ""
			},
			disableScroll: {
				type: [Boolean, String],
				default: false
			},
			hidpi: {
				type: Boolean,
				default: true
			}
		},
		computed: { id() {
			return this.canvasId;
		} },
		setup(props$30, _ref) {
			var { emit: emit$3, slots } = _ref;
			initHidpiOnce();
			var rootRef = ref(null);
			var canvas = ref(null);
			var sensor = ref(null);
			var actionsWaiting = ref(false);
			var trigger$1 = useNativeEvent(emit$3);
			var { $attrs, $excludeAttrs, $listeners } = useAttrs({ excludeListeners: true });
			var { _listeners } = useListeners$1(props$30, $listeners, trigger$1);
			var { _handleSubscribe, _resize } = useMethods$1(props$30, canvas, actionsWaiting);
			useSubscribe(_handleSubscribe, useContextInfo(props$30.canvasId), true);
			onMounted(() => {
				_resize();
			});
			return () => {
				var { canvasId, disableScroll } = props$30;
				return createVNode("uni-canvas", mergeProps({
					"ref": rootRef,
					"canvas-id": canvasId,
					"disable-scroll": disableScroll
				}, $attrs.value, $excludeAttrs.value, _listeners.value), [
					createVNode("canvas", {
						"ref": canvas,
						"class": "uni-canvas-canvas",
						"width": "300",
						"height": "150"
					}, null, 512),
					createVNode("div", { "style": "position: absolute;top: 0;left: 0;width: 100%;height: 100%;overflow: hidden;" }, [slots.default && slots.default()]),
					createVNode(resize_sensor_default, {
						"ref": sensor,
						"onResize": _resize
					}, null, 8, ["onResize"])
				], 16, ["canvas-id", "disable-scroll"]);
			};
		}
	});
	function useListeners$1(props$30, Listeners, trigger$1) {
		return { _listeners: computed(() => {
			var events = [
				"onTouchstart",
				"onTouchmove",
				"onTouchend"
			];
			var _$listeners = Listeners.value;
			var $listeners = extend({}, (() => {
				var obj = {};
				for (var key$1 in _$listeners) if (hasOwn(_$listeners, key$1)) obj[key$1] = _$listeners[key$1];
				return obj;
			})());
			events.forEach((event) => {
				var existing = $listeners[event];
				var eventHandler = [];
				if (existing) eventHandler.push(withWebEvent(($event) => {
					var rect = $event.currentTarget.getBoundingClientRect();
					processTouches(rect, $event.touches);
					processTouches(rect, $event.changedTouches);
					trigger$1(event.replace("on", "").toLocaleLowerCase(), $event);
				}));
				if (props$30.disableScroll && event === "onTouchmove") eventHandler.push(onEventPrevent);
				$listeners[event] = eventHandler;
			});
			return $listeners;
		}) };
	}
	function useMethods$1(props$30, canvasRef, actionsWaiting) {
		var _actionsDefer = [];
		var _images = {};
		var _pixelRatio = computed(() => props$30.hidpi ? pixelRatio : 1);
		function _resize(size$1) {
			var canvas = canvasRef.value;
			if (!(!size$1 || canvas.width !== Math.floor(size$1.width * _pixelRatio.value) || canvas.height !== Math.floor(size$1.height * _pixelRatio.value))) return;
			if (canvas.width > 0 && canvas.height > 0) {
				var context = canvas.getContext("2d");
				var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
				wrapper(canvas, props$30.hidpi);
				context.putImageData(imageData, 0, 0);
			} else wrapper(canvas, props$30.hidpi);
		}
		function actionsChanged(_ref2, resolve) {
			var { actions, reserve } = _ref2;
			if (!actions) return;
			if (actionsWaiting.value) {
				_actionsDefer.push([actions, reserve]);
				return;
			}
			var canvas = canvasRef.value;
			var c2d = canvas.getContext("2d");
			if (!reserve) {
				c2d.fillStyle = "#000000";
				c2d.strokeStyle = "#000000";
				c2d.shadowColor = "#000000";
				c2d.shadowBlur = 0;
				c2d.shadowOffsetX = 0;
				c2d.shadowOffsetY = 0;
				c2d.setTransform(1, 0, 0, 1, 0, 0);
				c2d.clearRect(0, 0, canvas.width, canvas.height);
			}
			preloadImage(actions);
			var _loop = function(index$4) {
				var action = actions[index$4];
				var method = action.method;
				var data = action.data;
				var actionType = data[0];
				if (/^set/.test(method) && method !== "setTransform") {
					var method1 = method[3].toLowerCase() + method.slice(4);
					var color;
					if (method1 === "fillStyle" || method1 === "strokeStyle") {
						if (actionType === "normal") color = resolveColor(data[1]);
						else if (actionType === "linear") {
							var LinearGradient = c2d.createLinearGradient(...data[1]);
							data[2].forEach(function(data2) {
								var offset = data2[0];
								var color$1 = resolveColor(data2[1]);
								LinearGradient.addColorStop(offset, color$1);
							});
							color = LinearGradient;
						} else if (actionType === "radial") {
							var _data = data[1];
							var x = _data[0];
							var y = _data[1];
							var r = _data[2];
							var _LinearGradient = c2d.createRadialGradient(x, y, 0, x, y, r);
							data[2].forEach(function(data2) {
								var offset = data2[0];
								var color$1 = resolveColor(data2[1]);
								_LinearGradient.addColorStop(offset, color$1);
							});
							color = _LinearGradient;
						} else if (actionType === "pattern") {
							if (!checkImageLoaded(data[1], actions.slice(index$4 + 1), resolve, function(image) {
								if (image) c2d[method1] = c2d.createPattern(image, data[2]);
							})) return "break";
							return "continue";
						}
						c2d[method1] = color;
					} else if (method1 === "globalAlpha") c2d[method1] = Number(actionType) / 255;
					else if (method1 === "shadow") {
						var shadowArray = [
							"shadowOffsetX",
							"shadowOffsetY",
							"shadowBlur",
							"shadowColor"
						];
						data.forEach(function(color_, method_) {
							c2d[shadowArray[method_]] = shadowArray[method_] === "shadowColor" ? resolveColor(color_) : color_;
						});
					} else if (method1 === "fontSize") c2d.__font__ = c2d.font = (c2d.__font__ || c2d.font).replace(/\d+\.?\d*px/, actionType + "px");
					else if (method1 === "lineDash") {
						c2d.setLineDash(actionType);
						c2d.lineDashOffset = data[1] || 0;
					} else if (method1 === "textBaseline") {
						if (actionType === "normal") data[0] = "alphabetic";
						c2d[method1] = actionType;
					} else if (method1 === "font") c2d.__font__ = c2d.font = actionType;
					else c2d[method1] = actionType;
				} else if (method === "fillPath" || method === "strokePath") {
					method = method.replace(/Path/, "");
					c2d.beginPath();
					data.forEach(function(data_) {
						c2d[data_.method].apply(c2d, data_.data);
					});
					c2d[method]();
				} else if (method === "fillText") c2d.fillText.apply(c2d, data);
				else if (method === "drawImage") {
					if (function() {
						var dataArray = [...data];
						var url = dataArray[0];
						var otherData = dataArray.slice(1);
						_images = _images || {};
						if (!checkImageLoaded(url, actions.slice(index$4 + 1), resolve, function(image) {
							if (image) c2d.drawImage.apply(c2d, [image].concat([...otherData.slice(4, 8)], [...otherData.slice(0, 4)]));
						})) return "break";
					}() === "break") return "break";
				} else if (method === "clip") {
					data.forEach(function(data_) {
						c2d[data_.method].apply(c2d, data_.data);
					});
					c2d.clip();
				} else c2d[method].apply(c2d, data);
			};
			for (var index$3 = 0; index$3 < actions.length; index$3++) {
				var _ret = _loop(index$3);
				if (_ret === "break") break;
				if (_ret === "continue") continue;
			}
			if (!actionsWaiting.value) resolve({ errMsg: "drawCanvas:ok" });
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
				if (src && !_images[src]) loadImage();
				function loadImage() {
					var image = _images[src] = new Image();
					image.onload = function() {
						image.ready = true;
					};
					getSameOriginUrl(src).then((src$1) => {
						image.src = src$1;
					}).catch(() => {
						image.src = src;
					});
				}
			});
		}
		function checkImageLoaded(src, actions, resolve, fn) {
			var image = _images[src];
			if (image.ready) {
				fn(image);
				return true;
			} else {
				_actionsDefer.unshift([actions, true]);
				actionsWaiting.value = true;
				image.onload = function() {
					image.ready = true;
					fn(image);
					actionsWaiting.value = false;
					var actions$1 = _actionsDefer.slice(0);
					_actionsDefer = [];
					for (var action = actions$1.shift(); action;) {
						actionsChanged({
							actions: action[0],
							reserve: action[1]
						}, resolve);
						action = actions$1.shift();
					}
				};
				return false;
			}
		}
		function getImageData(_ref3, resolve) {
			var { x = 0, y = 0, width, height, destWidth, destHeight, hidpi = true, dataType, quality = 1, type = "png" } = _ref3;
			var canvas = canvasRef.value;
			var data;
			var maxWidth$1 = canvas.offsetWidth - x;
			width = width ? Math.min(width, maxWidth$1) : maxWidth$1;
			var maxHeight = canvas.offsetHeight - y;
			height = height ? Math.min(height, maxHeight) : maxHeight;
			if (!hidpi) {
				if (!destWidth && !destHeight) {
					destWidth = Math.round(width * _pixelRatio.value);
					destHeight = Math.round(height * _pixelRatio.value);
				} else if (!destWidth) {
					if (!destHeight) destHeight = Math.round(height * _pixelRatio.value);
					destWidth = Math.round(width / height * destHeight);
				} else if (!destHeight) destHeight = Math.round(height / width * destWidth);
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
			context.drawImageByCanvas(canvas, x, y, width, height, 0, 0, destWidth, destHeight, false);
			var result;
			try {
				var compressed;
				if (dataType === "base64") data = newCanvas.toDataURL("image/".concat(type), quality);
				else {
					data = (0, import_pako.deflateRaw)(context.getImageData(0, 0, destWidth, destHeight).data, { to: "string" });
					compressed = true;
				}
				result = {
					data,
					compressed,
					width: destWidth,
					height: destHeight
				};
			} catch (error) {
				result = { errMsg: "canvasGetImageData:fail ".concat(error) };
			}
			newCanvas.height = newCanvas.width = 0;
			context.__hidpi__ = false;
			if (!resolve) return result;
			else resolve(result);
		}
		function putImageData(_ref4, resolve) {
			var { data, x, y, width, height, compressed } = _ref4;
			try {
				if (compressed) data = (0, import_pako.inflateRaw)(data);
				if (!height) height = Math.round(data.length / 4 / width);
				var canvas = getTempCanvas(width, height);
				canvas.getContext("2d").putImageData(new ImageData(new Uint8ClampedArray(data), width, height), 0, 0);
				canvasRef.value.getContext("2d").drawImage(canvas, x, y, width, height);
				canvas.height = canvas.width = 0;
			} catch (error) {
				resolve({ errMsg: "canvasPutImageData:fail" });
				return;
			}
			resolve({ errMsg: "canvasPutImageData:ok" });
		}
		function toTempFilePath(_ref5, resolve) {
			var { x = 0, y = 0, width, height, destWidth, destHeight, fileType, quality, dirname } = _ref5;
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
			if (res.errMsg) {
				resolve({ errMsg: res.errMsg.replace("canvasPutImageData", "toTempFilePath") });
				return;
			}
			saveImage(res.data, dirname, (error, tempFilePath) => {
				var errMsg = "toTempFilePath:".concat(error ? "fail" : "ok");
				if (error) errMsg += " ".concat(error.message);
				resolve({
					errMsg,
					tempFilePath
				});
			});
		}
		var methods = {
			actionsChanged,
			getImageData,
			putImageData,
			toTempFilePath
		};
		function _handleSubscribe(type, data, resolve) {
			var method = methods[type];
			if (type.indexOf("_") !== 0 && isFunction(method)) method(data, resolve);
		}
		return extend(methods, {
			_resize,
			_handleSubscribe
		});
	}
	var uniCheckGroupKey = PolySymbol("ucg");
	var checkbox_group_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "CheckboxGroup",
		props: { name: {
			type: String,
			default: ""
		} },
		emits: ["change"],
		setup(props$30, _ref) {
			var { emit: emit$3, slots } = _ref;
			var rootRef = ref(null);
			useProvideCheckGroup(props$30, useCustomEvent(rootRef, emit$3));
			return () => {
				return createVNode("uni-checkbox-group", { "ref": rootRef }, [slots.default && slots.default()], 512);
			};
		}
	});
	function useProvideCheckGroup(props$30, trigger$1) {
		var fields$1 = [];
		var getFieldsValue = () => fields$1.reduce((res, field) => {
			if (field.value.checkboxChecked) res.push(field.value.value);
			return res;
		}, new Array());
		provide(uniCheckGroupKey, {
			addField(field) {
				fields$1.push(field);
			},
			removeField(field) {
				fields$1.splice(fields$1.indexOf(field), 1);
			},
			checkboxChange($event) {
				trigger$1("change", $event, { value: getFieldsValue() });
			}
		});
		var uniForm = inject(uniFormKey, false);
		if (uniForm) uniForm.addField({ submit: () => {
			var data = ["", null];
			if (props$30.name !== "") {
				data[0] = props$30.name;
				data[1] = getFieldsValue();
			}
			return data;
		} });
		return getFieldsValue;
	}
	init_web_dom_iterable();
	var checkbox_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "Checkbox",
		props: {
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
			value: {
				type: String,
				default: ""
			},
			color: {
				type: String,
				default: "#007aff"
			},
			backgroundColor: {
				type: String,
				default: ""
			},
			borderColor: {
				type: String,
				default: ""
			},
			activeBackgroundColor: {
				type: String,
				default: ""
			},
			activeBorderColor: {
				type: String,
				default: ""
			},
			iconColor: {
				type: String,
				default: ""
			},
			foreColor: {
				type: String,
				default: ""
			}
		},
		setup(props$30, _ref) {
			var { slots } = _ref;
			var rootRef = ref(null);
			var checkboxChecked = ref(props$30.checked);
			var checkboxCheckedBool = computed(() => {
				return checkboxChecked.value === "true" || checkboxChecked.value === true;
			});
			var checkboxValue = ref(props$30.value);
			function getCheckBoxStyle(checked) {
				if (props$30.disabled) return {
					backgroundColor: "#E1E1E1",
					borderColor: "#D1D1D1"
				};
				var style = {};
				if (checked) {
					if (props$30.activeBorderColor) style.borderColor = props$30.activeBorderColor;
					if (props$30.activeBackgroundColor) style.backgroundColor = props$30.activeBackgroundColor;
				} else {
					if (props$30.borderColor) style.borderColor = props$30.borderColor;
					if (props$30.backgroundColor) style.backgroundColor = props$30.backgroundColor;
				}
				return style;
			}
			var checkboxStyle = computed(() => {
				return getCheckBoxStyle(checkboxCheckedBool.value);
			});
			watch([() => props$30.checked, () => props$30.value], (_ref2) => {
				var [newChecked, newModelValue] = _ref2;
				checkboxChecked.value = newChecked;
				checkboxValue.value = newModelValue;
			});
			var reset = () => {
				checkboxChecked.value = false;
			};
			var { uniCheckGroup, uniLabel } = useCheckboxInject(checkboxChecked, checkboxValue, reset);
			var _onClick = ($event) => {
				if (props$30.disabled) return;
				checkboxChecked.value = !checkboxChecked.value;
				uniCheckGroup && uniCheckGroup.checkboxChange($event);
				$event.stopPropagation();
			};
			if (!!uniLabel) {
				uniLabel.addHandler(_onClick);
				onBeforeUnmount(() => {
					uniLabel.removeHandler(_onClick);
				});
			}
			useListeners(props$30, { "label-click": _onClick });
			return () => {
				var booleanAttrs = useBooleanAttr(props$30, "disabled");
				var realCheckValue = checkboxChecked.value;
				return createVNode("uni-checkbox", mergeProps(booleanAttrs, {
					"id": props$30.id,
					"onClick": _onClick,
					"ref": rootRef
				}), [createVNode("div", {
					"class": "uni-checkbox-wrapper",
					"style": { "--HOVER-BD-COLOR": props$30.activeBorderColor }
				}, [createVNode("div", {
					"class": ["uni-checkbox-input", { "uni-checkbox-input-disabled": props$30.disabled }],
					"style": checkboxStyle.value
				}, [realCheckValue ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props$30.disabled ? "#ADADAD" : props$30.foreColor || props$30.iconColor || props$30.color, 22) : ""], 6), slots.default && slots.default()], 4)], 16, ["id", "onClick"]);
			};
		}
	});
	function useCheckboxInject(checkboxChecked, checkboxValue, reset) {
		var field = computed(() => ({
			checkboxChecked: Boolean(checkboxChecked.value),
			value: checkboxValue.value
		}));
		var formField = { reset };
		var uniCheckGroup = inject(uniCheckGroupKey, false);
		if (!!uniCheckGroup) uniCheckGroup.addField(field);
		var uniForm = inject(uniFormKey, false);
		if (!!uniForm) uniForm.addField(formField);
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
	plusReady(() => {
		isAndroid = false;
		osVersion = "";
	});
	document.addEventListener("keyboardchange", function(event) {
		keyboardHeight = event.height;
		keyboardChangeCallback && keyboardChangeCallback();
	}, false);
	function iosHideKeyboard() {}
	function setSoftinputTemporary(props$30, el, reset) {
		plusReady(() => {
			var MODE_ADJUSTRESIZE = "adjustResize";
			var MODE_ADJUSTPAN = "adjustPan";
			var MODE_NOTHING = "nothing";
			var currentWebview = plus.webview.currentWebview();
			var style = webviewStyle || currentWebview.getStyle() || {};
			var options = {
				mode: reset || style.softinputMode === MODE_ADJUSTRESIZE ? MODE_ADJUSTRESIZE : props$30.adjustPosition ? MODE_ADJUSTPAN : MODE_NOTHING,
				position: {
					top: 0,
					height: 0
				}
			};
			if (options.mode === MODE_ADJUSTPAN) {
				var rect = el.getBoundingClientRect();
				options.position.top = rect.top;
				options.position.height = rect.height + (Number(props$30.cursorSpacing) || 0);
			}
			currentWebview.setSoftinputTemporary(options);
		});
	}
	function setSoftinputNavBar(props$30, state) {
		if (props$30.showConfirmBar === "auto") {
			delete state.softinputNavBar;
			return;
		}
		plusReady(() => {
			var currentWebview = plus.webview.currentWebview();
			var { softinputNavBar } = currentWebview.getStyle() || {};
			if (softinputNavBar !== "none" !== props$30.showConfirmBar) {
				state.softinputNavBar = softinputNavBar || "auto";
				currentWebview.setStyle({ softinputNavBar: props$30.showConfirmBar ? "auto" : "none" });
			} else delete state.softinputNavBar;
		});
	}
	function resetSoftinputNavBar(state) {
		var softinputNavBar = state.softinputNavBar;
		if (softinputNavBar) plusReady(() => {
			plus.webview.currentWebview().setStyle({ softinputNavBar });
		});
	}
	var props$24 = {
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
	function useKeyboard(props$30, elRef, trigger$1) {
		var state = {};
		function initKeyboard(el) {
			var focus;
			var isApple$2 = computed(() => String(navigator.vendor).indexOf("Apple") === 0);
			var keyboardChange = () => {
				trigger$1("keyboardheightchange", {}, {
					height: keyboardHeight,
					duration: .25
				});
				if (focus && keyboardHeight === 0) setSoftinputTemporary(props$30, el);
				if (props$30.autoBlur && focus && keyboardHeight === 0 && (isAndroid || parseInt(osVersion) >= 13)) document.activeElement.blur();
			};
			el.addEventListener("focus", () => {
				focus = true;
				clearTimeout(resetTimer);
				document.addEventListener("click", iosHideKeyboard, false);
				keyboardChangeCallback = keyboardChange;
				if (keyboardHeight) trigger$1("keyboardheightchange", {}, {
					height: keyboardHeight,
					duration: 0
				});
				setSoftinputNavBar(props$30, state);
				setSoftinputTemporary(props$30, el);
			});
			if (isAndroid) el.addEventListener("click", () => {
				if (!props$30.disabled && !props$30.readOnly && focus && keyboardHeight === 0) setSoftinputTemporary(props$30, el);
			});
			if (!isAndroid) {
				if (parseInt(osVersion) < 12) el.addEventListener("touchstart", () => {
					if (!props$30.disabled && !props$30.readOnly && !focus) setSoftinputTemporary(props$30, el);
				});
				if (parseFloat(osVersion) >= 14.6 && !webviewStyle) plusReady(() => {
					webviewStyle = plus.webview.currentWebview().getStyle() || {};
				});
			}
			var onKeyboardHide = () => {
				document.removeEventListener("click", iosHideKeyboard, false);
				keyboardChangeCallback = null;
				if (keyboardHeight) trigger$1("keyboardheightchange", {}, {
					height: 0,
					duration: 0
				});
				resetSoftinputNavBar(state);
				if (isAndroid) resetTimer = setTimeout(() => {
					setSoftinputTemporary(props$30, el, true);
				}, 300);
				if (isApple$2.value) document.documentElement.scrollTo(document.documentElement.scrollLeft, document.documentElement.scrollTop);
			};
			el.addEventListener("blur", () => {
				if (isApple$2.value) el.blur();
				focus = false;
				onKeyboardHide();
			});
		}
		watch(() => elRef.value, (el) => el && initKeyboard(el));
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
		var index$3;
		var chars;
		var match;
		var stack = [];
		var last = html;
		stack.last = function() {
			return this[this.length - 1];
		};
		while (html) {
			chars = true;
			if (!stack.last() || !special[stack.last()]) {
				if (html.indexOf("<!--") == 0) {
					index$3 = html.indexOf("-->");
					if (index$3 >= 0) {
						if (handler.comment) handler.comment(html.substring(4, index$3));
						html = html.substring(index$3 + 3);
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
					index$3 = html.indexOf("<");
					var text = index$3 < 0 ? html : html.substring(0, index$3);
					html = index$3 < 0 ? "" : html.substring(index$3);
					if (handler.chars) handler.chars(text);
				}
			} else {
				html = html.replace(/* @__PURE__ */ new RegExp("([\\s\\S]*?)</" + stack.last() + "[^>]*>"), function(all, text$1) {
					text$1 = text$1.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
					if (handler.chars) handler.chars(text$1);
					return "";
				});
				parseEndTag("", stack.last());
			}
			if (html == last) throw "Parse Error: " + html;
			last = html;
		}
		parseEndTag();
		function parseStartTag(tag, tagName, rest, unary) {
			tagName = tagName.toLowerCase();
			if (block[tagName]) while (stack.last() && inline[stack.last()]) parseEndTag("", stack.last());
			if (closeSelf[tagName] && stack.last() == tagName) parseEndTag("", tagName);
			unary = empty[tagName] || !!unary;
			if (!unary) stack.push(tagName);
			if (handler.start) {
				var attrs$1 = [];
				rest.replace(attr, function(match$1, name) {
					var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";
					attrs$1.push({
						name,
						value,
						escaped: value.replace(/(^|[^\\])"/g, "$1\\\"")
					});
				});
				if (handler.start) handler.start(tagName, attrs$1, unary);
			}
		}
		function parseEndTag(tag, tagName) {
			if (!tagName) var pos = 0;
			else for (var pos = stack.length - 1; pos >= 0; pos--) if (stack[pos] == tagName) break;
			if (pos >= 0) {
				for (var i$1 = stack.length - 1; i$1 >= pos; i$1--) if (handler.end) handler.end(stack[i$1]);
				stack.length = pos;
			}
		}
	}
	function makeMap(str) {
		var obj = {};
		var items = str.split(",");
		for (var i$1 = 0; i$1 < items.length; i$1++) obj[items[i$1]] = true;
		return obj;
	}
	var scripts = {};
	function loadScript(globalName, src, callback) {
		if (isString(globalName) ? window[globalName] : globalName) {
			callback();
			return;
		}
		var callbacks$1 = scripts[src];
		if (!callbacks$1) {
			callbacks$1 = scripts[src] = [];
			var script = document.createElement("script");
			script.src = src;
			document.body.appendChild(script);
			script.onload = function() {
				callbacks$1.forEach((callback$1) => callback$1());
				delete scripts[src];
			};
		}
		callbacks$1.push(callback);
	}
	function divider_default(Quill) {
		var BlockEmbed = Quill.import("blots/block/embed");
		class Divider extends BlockEmbed {}
		Divider.blotName = "divider";
		Divider.tagName = "HR";
		return { "formats/divider": Divider };
	}
	function ins_default(Quill) {
		var Inline = Quill.import("blots/inline");
		class Ins extends Inline {}
		Ins.blotName = "ins";
		Ins.tagName = "INS";
		return { "formats/ins": Ins };
	}
	function align_default(Quill) {
		var { Scope, Attributor } = Quill.import("parchment");
		var config = {
			scope: Scope.BLOCK,
			whitelist: [
				"left",
				"right",
				"center",
				"justify"
			]
		};
		var AlignStyle = new Attributor.Style("align", "text-align", config);
		return { "formats/align": AlignStyle };
	}
	function direction_default(Quill) {
		var { Scope, Attributor } = Quill.import("parchment");
		var config = {
			scope: Scope.BLOCK,
			whitelist: ["rtl"]
		};
		var DirectionStyle = new Attributor.Style("direction", "direction", config);
		return { "formats/direction": DirectionStyle };
	}
	function list_default(Quill) {
		var Parchment = Quill.import("parchment");
		var Container = Quill.import("blots/container");
		var ListItem = Quill.import("formats/list/item");
		class List extends Container {
			static create(value) {
				var tagName = value === "ordered" ? "OL" : "UL";
				var node = super.create(tagName);
				if (value === "checked" || value === "unchecked") node.setAttribute("data-checked", value === "checked");
				return node;
			}
			static formats(domNode) {
				if (domNode.tagName === "OL") return "ordered";
				if (domNode.tagName === "UL") if (domNode.hasAttribute("data-checked")) return domNode.getAttribute("data-checked") === "true" ? "checked" : "unchecked";
				else return "bullet";
			}
			constructor(domNode) {
				super(domNode);
				var listEventHandler = (e$1) => {
					if (e$1.target.parentNode !== domNode) return;
					var format = this.statics.formats(domNode);
					var blot = Parchment.find(e$1.target);
					if (format === "checked") blot.format("list", "unchecked");
					else if (format === "unchecked") blot.format("list", "checked");
				};
				domNode.addEventListener("click", listEventHandler);
			}
			format(name, value) {
				if (this.children.length > 0) this.children.tail.format(name, value);
			}
			formats() {
				return { [this.statics.blotName]: this.statics.formats(this.domNode) };
			}
			insertBefore(blot, ref$1) {
				if (blot instanceof ListItem) super.insertBefore(blot, ref$1);
				else {
					var index$3 = ref$1 == null ? this.length() : ref$1.offset(this);
					var after = this.split(index$3);
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
		return { "formats/list": List };
	}
	function background_default(Quill) {
		var { Scope } = Quill.import("parchment");
		var BackgroundColorStyle = new (Quill.import("formats/background")).constructor("backgroundColor", "background-color", { scope: Scope.INLINE });
		return { "formats/backgroundColor": BackgroundColorStyle };
	}
	function box_default(Quill) {
		var { Scope, Attributor } = Quill.import("parchment");
		var config = { scope: Scope.BLOCK };
		var margin = [
			"margin",
			"marginTop",
			"marginBottom",
			"marginLeft",
			"marginRight"
		];
		var padding = [
			"padding",
			"paddingTop",
			"paddingBottom",
			"paddingLeft",
			"paddingRight"
		];
		var result = {};
		margin.concat(padding).forEach((name) => {
			result["formats/".concat(name)] = new Attributor.Style(name, hyphenate(name), config);
		});
		return result;
	}
	function font_default(Quill) {
		var { Scope, Attributor } = Quill.import("parchment");
		var config = { scope: Scope.INLINE };
		var font = [
			"font",
			"fontSize",
			"fontStyle",
			"fontVariant",
			"fontWeight",
			"fontFamily"
		];
		var result = {};
		font.forEach((name) => {
			result["formats/".concat(name)] = new Attributor.Style(name, hyphenate(name), config);
		});
		return result;
	}
	function text_default(Quill) {
		var { Scope, Attributor } = Quill.import("parchment");
		var text = [
			{
				name: "lineHeight",
				scope: Scope.BLOCK
			},
			{
				name: "letterSpacing",
				scope: Scope.INLINE
			},
			{
				name: "textDecoration",
				scope: Scope.INLINE
			},
			{
				name: "textIndent",
				scope: Scope.BLOCK
			}
		];
		var result = {};
		text.forEach((_ref) => {
			var { name, scope } = _ref;
			result["formats/".concat(name)] = new Attributor.Style(name, hyphenate(name), { scope });
		});
		return result;
	}
	function image_default$1(Quill) {
		var Image$1 = Quill.import("formats/image");
		var ATTRIBUTES = [
			"alt",
			"height",
			"width",
			"data-custom",
			"class",
			"data-local"
		];
		Image$1.sanitize = (url) => url ? getRealPath(url) : url;
		Image$1.formats = function formats(domNode) {
			return ATTRIBUTES.reduce(function(formats$1, attribute) {
				if (domNode.hasAttribute(attribute)) formats$1[attribute] = domNode.getAttribute(attribute);
				return formats$1;
			}, {});
		};
		var format = Image$1.prototype.format;
		Image$1.prototype.format = function(name, value) {
			if (ATTRIBUTES.indexOf(name) > -1) if (value) this.domNode.setAttribute(name, value);
			else this.domNode.removeAttribute(name);
			else format.call(this, name, value);
		};
	}
	function link_default(Quill) {
		var Link = Quill.import("formats/link");
		Link.sanitize = (url) => {
			var anchor = document.createElement("a");
			anchor.href = url;
			var protocol = anchor.href.slice(0, anchor.href.indexOf(":"));
			return Link.PROTOCOL_WHITELIST.concat("file").indexOf(protocol) > -1 ? url : Link.SANITIZED_URL;
		};
	}
	var SupportStyleList = [
		"color",
		"background",
		"padding",
		"radius"
	];
	var MentionStyleMap = {
		color: "color",
		background: "background",
		padding: "padding",
		radius: "border-radius"
	};
	function getMentionStyleValue(node, styleKey) {
		var cssName = MentionStyleMap[styleKey];
		if (!cssName) return "";
		return node.style.getPropertyValue(cssName).trim();
	}
	var isApple = /^Apple/.test(navigator.vendor);
	function mention_default(Quill) {
		var Embed = Quill.import("blots/embed");
		class MentionBlot extends Embed {
			static create(data) {
				var node = super.create();
				var id$1 = data.id == null ? "" : data.id;
				var name = data.name == null ? "" : data.name;
				if (!isApple) node.setAttribute("contenteditable", "false");
				node.setAttribute("data-id", id$1);
				node.setAttribute("data-name", name);
				var style = "";
				if (isApple) style += "-webkit-user-select: none;";
				SupportStyleList.forEach((item) => {
					var styleName = MentionStyleMap[item] || item;
					if (data[item]) style += "".concat(hyphenate(styleName), ": ").concat(data[item], ";");
				});
				if (style) node.setAttribute("style", style);
				node.innerText = "@".concat(name);
				return node;
			}
			static value(node) {
				var value = {
					id: node.dataset.id == null ? "" : node.dataset.id,
					name: node.dataset.name == null ? "" : node.dataset.name
				};
				SupportStyleList.forEach((item) => {
					var styleValue = getMentionStyleValue(node, item);
					if (styleValue) value[item] = styleValue;
				});
				return value;
			}
		}
		MentionBlot.blotName = "mention";
		MentionBlot.tagName = "span";
		MentionBlot.className = "mention";
		return { "formats/mention": MentionBlot };
	}
	function register(Quill) {
		var formats = {
			divider: divider_default,
			ins: ins_default,
			align: align_default,
			direction: direction_default,
			list: list_default,
			background: background_default,
			box: box_default,
			font: font_default,
			text: text_default,
			image: image_default$1,
			link: link_default,
			mention: mention_default
		};
		var options = {};
		Object.values(formats).forEach((value) => extend(options, value(Quill)));
		Quill.register(options, true);
	}
	init_web_dom_iterable();
	function useQuill(props$30, rootRef, trigger$1) {
		var quillReady;
		var skipMatcher;
		var quill;
		watch(() => props$30.readOnly, (value) => {
			if (quillReady) {
				quill.enable(!value);
				if (value) quill.blur();
			}
		});
		watch(() => props$30.placeholder, (value) => {
			if (quillReady) setPlaceHolder(value);
		});
		watch(() => props$30.type, (value) => {
			if (quillReady) setInputMode(value);
		});
		function html2delta(html) {
			var tags = [
				"span",
				"strong",
				"b",
				"ins",
				"em",
				"i",
				"u",
				"a",
				"del",
				"s",
				"sub",
				"sup",
				"img",
				"div",
				"p",
				"h1",
				"h2",
				"h3",
				"h4",
				"h5",
				"h6",
				"hr",
				"ol",
				"ul",
				"li",
				"br",
				"blockquote",
				"pre",
				"code"
			];
			var content = "";
			var disable;
			HTMLParser(html, {
				start: function(tag, attrs$1, unary) {
					if (!tags.includes(tag)) {
						disable = !unary;
						return;
					}
					disable = false;
					var arrts = attrs$1.map((_ref) => {
						var { name, value } = _ref;
						return "".concat(name, "=\"").concat(value, "\"");
					}).join(" ");
					var start = "<".concat(tag, " ").concat(arrts, " ").concat(unary ? "/" : "", ">");
					content += start;
				},
				end: function(tag) {
					if (!disable) content += "</".concat(tag, ">");
				},
				chars: function(text) {
					if (!disable) content += text;
				}
			});
			skipMatcher = true;
			var delta = quill.clipboard.convert(content);
			skipMatcher = false;
			return delta;
		}
		function getContents() {
			return {
				html: quill.root.innerHTML,
				text: quill.getText(),
				delta: quill.getContents()
			};
		}
		function setPlaceHolder(placeholder) {
			var placeHolderAttrName = "data-placeholder";
			var QuillRoot = quill.root;
			QuillRoot.getAttribute(placeHolderAttrName) !== placeholder && QuillRoot.setAttribute(placeHolderAttrName, placeholder);
		}
		function setInputMode(type) {
			var QuillRoot = quill.root;
			if (type === "none") QuillRoot.setAttribute("inputmode", "none");
			else QuillRoot.removeAttribute("inputmode");
		}
		var oldStatus = {};
		function updateStatus(range) {
			var status = range ? quill.getFormat(range) : {};
			var keys = Object.keys(status);
			if (keys.length !== Object.keys(oldStatus).length || keys.find((key$1) => status[key$1] !== oldStatus[key$1])) {
				oldStatus = status;
				trigger$1("statuschange", {}, status);
			}
		}
		function fixCursor() {
			var _leaf$statics;
			var range = quill.getSelection();
			if (!range) return;
			var [leaf] = quill.getLeaf(range.index - 1);
			if ((leaf === null || leaf === void 0 || (_leaf$statics = leaf.statics) === null || _leaf$statics === void 0 ? void 0 : _leaf$statics.blotName) === "mention") quill.setSelection(range.index, 0, "silent");
		}
		function textChangeHandler() {
			fixCursor();
			trigger$1("input", {}, getContents());
		}
		function initQuill(imageResizeModules) {
			var Quill = window.Quill;
			register(Quill);
			var options = {
				toolbar: false,
				readOnly: props$30.readOnly,
				placeholder: props$30.placeholder
			};
			if (imageResizeModules.length) {
				Quill.register("modules/ImageResize", window.ImageResize.default);
				options.modules = {
					syntax: true,
					ImageResize: { modules: imageResizeModules }
				};
			}
			var rootEl = rootRef.value;
			quill = new Quill(rootEl, options);
			setInputMode(props$30.type);
			var $el = quill.root;
			[
				"focus",
				"blur",
				"input"
			].forEach((name) => {
				$el.addEventListener(name, ($event) => {
					var contents = getContents();
					if (name === "input") {
						if (getBaseSystemInfo().platform === "ios") {
							var regExpContent = (contents.html.match(/<span [\s\S]*>([\s\S]*)<\/span>/) || [])[1];
							setPlaceHolder(regExpContent && regExpContent.replace(/\s/g, "") ? "" : props$30.placeholder);
						}
						$event.stopPropagation();
					} else trigger$1(name, $event, contents);
				});
			});
			quill.on("text-change", textChangeHandler);
			quill.on("selection-change", updateStatus);
			quill.on("scroll-optimize", () => {
				var range = quill.selection.getRange()[0];
				updateStatus(range);
			});
			quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
				if (skipMatcher) return delta;
				if (delta.ops) delta.ops = delta.ops.filter((_ref2) => {
					var { insert } = _ref2;
					return isString(insert);
				}).map((_ref3) => {
					var { insert } = _ref3;
					return { insert };
				});
				return delta;
			});
			quillReady = true;
			trigger$1("ready", {}, {});
		}
		useSubscribe((type, data, resolve) => {
			var { options, callbackId } = data;
			var res;
			var range;
			var errMsg;
			if (quillReady) {
				var Quill = window.Quill;
				switch (type) {
					case "format":
						var { name = "", value = false } = options;
						range = quill.getSelection(true);
						if (!name) break;
						var format = quill.getFormat(range)[name] || false;
						if ([
							"bold",
							"italic",
							"underline",
							"strike",
							"ins"
						].includes(name)) value = !format;
						else if (name === "direction") {
							value = value === "rtl" && format ? false : value;
							var align = quill.getFormat(range).align;
							if (value === "rtl" && !align) quill.format("align", "right", "user");
							else if (!value && align === "right") quill.format("align", false, "user");
						} else if (name === "indent") {
							var rtl = quill.getFormat(range).direction === "rtl";
							value = value === "+1";
							if (rtl) value = !value;
							value = value ? "+1" : "-1";
						} else {
							if (name === "list") {
								value = value === "check" ? "unchecked" : value;
								format = format === "checked" ? "unchecked" : format;
							}
							value = format && format !== (value || false) || !format && value ? value : !format;
						}
						quill.format(name, value, "user");
						break;
					case "insertDivider":
						range = quill.getSelection(true);
						quill.insertText(range.index, "\n", "user");
						quill.insertEmbed(range.index + 1, "divider", true, "user");
						quill.setSelection(range.index + 2, 0, "silent");
						break;
					case "insertMention":
						range = quill.getSelection(true);
						var mentionData = extend({
							id: "",
							name: ""
						}, options);
						quill.insertEmbed(range.index, "mention", mentionData, "user");
						quill.setSelection(range.index + 1, 0);
						break;
					case "insertImage":
						range = quill.getSelection(true);
						var { src = "", alt = "", width = "", height = "", extClass = "", data: _data = {} } = options;
						var path = getRealPath(src);
						quill.insertEmbed(range.index, "image", path, "silent");
						var local = /^(file|blob):/.test(path) ? path : false;
						quill.formatText(range.index, 1, "data-local", local, "silent");
						quill.formatText(range.index, 1, "alt", alt, "silent");
						quill.formatText(range.index, 1, "width", width, "silent");
						quill.formatText(range.index, 1, "height", height, "silent");
						quill.formatText(range.index, 1, "class", extClass, "silent");
						quill.formatText(range.index, 1, "data-custom", Object.keys(_data).map((key$1) => "".concat(key$1, "=").concat(_data[key$1])).join("&"), "silent");
						quill.setSelection(range.index + 1, 0, "silent");
						quill.scrollIntoView();
						setTimeout(() => {
							textChangeHandler();
						}, 1e3);
						break;
					case "insertText":
						range = quill.getSelection(true);
						var { text = "" } = options;
						quill.insertText(range.index, text, "user");
						quill.setSelection(range.index + text.length, 0, "silent");
						break;
					case "insertLink":
						range = quill.getSelection(true);
						var { text: _text = "", href = "" } = options;
						if (!href) break;
						if (range.length > 0) quill.format("link", href, "user");
						else {
							var linkText = _text || href;
							quill.insertText(range.index, linkText, "link", href, "user");
							quill.setSelection(range.index + linkText.length, 0, "silent");
						}
						break;
					case "setContents":
						var { delta, html } = options;
						if (typeof delta === "object") quill.setContents(delta, "silent");
						else if (isString(html)) quill.setContents(html2delta(html), "silent");
						else errMsg = "contents is missing";
						break;
					case "getContents":
						res = getContents();
						break;
					case "clear":
						quill.setText("");
						break;
					case "removeFormat":
						range = quill.getSelection(true);
						var parchment = Quill.import("parchment");
						if (range.length) quill.removeFormat(range.index, range.length, "user");
						else Object.keys(quill.getFormat(range)).forEach((key$1) => {
							if (parchment.query(key$1, parchment.Scope.INLINE)) quill.format(key$1, false);
						});
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
						res = { text: "" };
						if (range && range.length !== 0) res.text = quill.getText(range.index, range.length);
						break;
					case "scrollIntoView":
						quill.scrollIntoView();
						break;
					default: break;
				}
				updateStatus(range);
			} else errMsg = "not ready";
			if (callbackId) resolve({
				callbackId,
				data: extend({}, res, { errMsg: "".concat(type, ":").concat(errMsg ? "fail " + errMsg : "ok") })
			});
		}, useContextInfo(), true);
		onMounted(() => {
			var imageResizeModules = [];
			if (props$30.showImgSize) imageResizeModules.push("DisplaySize");
			if (props$30.showImgToolbar) imageResizeModules.push("Toolbar");
			if (props$30.showImgResize) imageResizeModules.push("Resize");
			var quillSrc = "./__uniappquill.js";
			loadScript("hljs", "./__uniappquillhighlight.js", () => {
				loadScript(window.Quill, quillSrc, () => {
					if (imageResizeModules.length) loadScript(window.ImageResize, "./__uniappquillimageresize.js", () => {
						initQuill(imageResizeModules);
					});
					else initQuill(imageResizeModules);
				});
			});
		});
	}
	var editor_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "Editor",
		props: /* @__PURE__ */ extend({}, props$24, {
			id: {
				type: String,
				default: ""
			},
			readOnly: {
				type: [Boolean, String],
				default: false
			},
			type: {
				type: String,
				default: ""
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
		}),
		emit: [
			"ready",
			"focus",
			"blur",
			"input",
			"statuschange",
			...emit$1
		],
		setup(props$30, _ref) {
			var { emit: emit$3 } = _ref;
			var rootRef = ref(null);
			var trigger$1 = useCustomEvent(rootRef, emit$3);
			useQuill(props$30, rootRef, trigger$1);
			useKeyboard(props$30, rootRef, trigger$1);
			return () => {
				return createVNode("uni-editor", {
					"ref": rootRef,
					"id": props$30.id,
					"class": "ql-container"
				}, null, 8, ["id"]);
			};
		}
	});
	var INFO_COLOR = "#10aeff";
	var WARN_COLOR = "#f76260";
	var GREY_COLOR = "#b2b2b2";
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
			c: "#f43530"
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
	var icon_default = /* @__PURE__ */ defineBuiltInComponent({
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
		setup(props$30) {
			var rootRef = ref(null);
			var path = computed(() => ICONS[props$30.type]);
			return () => {
				var { value } = path;
				return createVNode("uni-icon", { "ref": rootRef }, [value && value.d && createSvgIconVNode(value.d, props$30.color || value.c, rpx2px(props$30.size))], 512);
			};
		}
	});
	var props$25 = {
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
			default: false
		}
	};
	var FIX_MODES = {
		widthFix: [
			"offsetWidth",
			"height",
			(value, ratio) => value / ratio
		],
		heightFix: [
			"offsetHeight",
			"width",
			(value, ratio) => value * ratio
		]
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
	var image_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "Image",
		props: props$25,
		setup(props$30, _ref) {
			var { emit: emit$3 } = _ref;
			var rootRef = ref(null);
			var state = useImageState(rootRef, props$30);
			var trigger$1 = useCustomEvent(rootRef, emit$3);
			var { fixSize } = useImageSize(rootRef, props$30, state);
			useImageLoader(state, props$30, rootRef, fixSize, trigger$1);
			return () => {
				return createVNode("uni-image", { "ref": rootRef }, [createVNode("div", { "style": state.modeStyle }, null, 4), FIX_MODES[props$30.mode] ? createVNode(resize_sensor_default, { "onResize": fixSize }, null, 8, ["onResize"]) : createVNode("span", null, null)], 512);
			};
		}
	});
	function useImageState(rootRef, props$30) {
		var imgSrc = ref("");
		var modeStyleRef = computed(() => {
			var size$1 = "auto";
			var position = "";
			var opts = IMAGE_MODES[props$30.mode];
			if (!opts) {
				position = "0% 0%";
				size$1 = "100% 100%";
			} else {
				opts[0] && (position = opts[0]);
				opts[1] && (size$1 = opts[1]);
			}
			return "background-image:".concat(imgSrc.value ? "url(\"" + imgSrc.value + "\")" : "none", ";background-position:").concat(position, ";background-size:").concat(size$1, ";");
		});
		var state = reactive({
			rootEl: rootRef,
			src: computed(() => props$30.src ? getRealPath(props$30.src) : ""),
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
			state.origWidth = rootEl.clientWidth || 0;
			state.origHeight = rootEl.clientHeight || 0;
		});
		return state;
	}
	function useImageLoader(state, props$30, rootRef, fixSize, trigger$1) {
		var img;
		var draggableImg;
		var setState = function() {
			var width = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
			var height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
			var imgSrc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
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
			img = img || new Image();
			img.onload = (evt) => {
				var { width, height } = img;
				setState(width, height, src);
				nextTick(() => {
					fixSize();
				});
				img.draggable = props$30.draggable;
				if (draggableImg) draggableImg.remove();
				draggableImg = img;
				rootRef.value.appendChild(img);
				resetImage();
				trigger$1("load", evt, {
					width,
					height
				});
			};
			img.onerror = (evt) => {
				setState();
				resetImage();
				trigger$1("error", evt, { errMsg: "GET ".concat(state.src, " 404 (Not Found)") });
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
		watch(() => state.imgSrc, (value) => {
			if (!value && draggableImg) {
				draggableImg.remove();
				draggableImg = null;
			}
		});
		onMounted(() => loadImage(state.src));
		onBeforeUnmount(() => resetImage());
	}
	var isChrome = navigator.vendor === "Google Inc.";
	function fixNumber(num) {
		if (isChrome && num > 10) num = Math.round(num / 2) * 2;
		return num;
	}
	function useImageSize(rootRef, props$30, state) {
		var fixSize = () => {
			var { mode: mode$1 } = props$30;
			var names = FIX_MODES[mode$1];
			if (!names) return;
			var { origWidth, origHeight } = state;
			var ratio = origWidth && origHeight ? origWidth / origHeight : 0;
			if (!ratio) return;
			var rootEl = rootRef.value;
			var value = rootEl[names[0]];
			if (value) rootEl.style[names[1]] = fixNumber(names[2](value, ratio)) + "px";
			window.dispatchEvent(new CustomEvent("updateview"));
		};
		var resetSize = () => {
			var { style } = rootRef.value;
			var { origStyle: { width, height } } = state;
			style.width = width;
			style.height = height;
		};
		watch(() => props$30.mode, (value, oldValue) => {
			if (FIX_MODES[oldValue]) resetSize();
			if (FIX_MODES[value]) fixSize();
		});
		return {
			fixSize,
			resetSize
		};
	}
	function throttle(fn, wait) {
		var last = 0;
		var timeout;
		var waitCallback;
		var newFn = function() {
			for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) arg[_key] = arguments[_key];
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
	var passiveOptions$1 = /* @__PURE__ */ passive(true);
	var states = [];
	var userInteract = 0;
	var inited = false;
	var setUserAction = (userAction) => states.forEach((vm) => vm.userAction = userAction);
	function addInteractListener() {
		var vm = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : { userAction: false };
		if (!inited) {
			[
				"touchstart",
				"touchmove",
				"touchend",
				"mousedown",
				"mouseup"
			].forEach((eventName) => {
				document.addEventListener(eventName, function() {
					!userInteract && setUserAction(true);
					userInteract++;
					setTimeout(() => {
						!--userInteract && setUserAction(false);
					}, 0);
				}, passiveOptions$1);
			});
			inited = true;
		}
		states.push(vm);
	}
	function removeInteractListener(vm) {
		var index$3 = states.indexOf(vm);
		if (index$3 >= 0) states.splice(index$3, 1);
	}
	function useUserAction() {
		var state = reactive({ userAction: false });
		onMounted(() => {
			addInteractListener(state);
		});
		onBeforeUnmount(() => {
			removeInteractListener(state);
		});
		return { state };
	}
	function useScopedAttrs() {
		var state = reactive({ attrs: {} });
		onMounted(() => {
			var instance = getCurrentInstance();
			while (instance) {
				var scopeId = instance.type.__scopeId;
				if (scopeId) state.attrs[scopeId] = "";
				instance = instance.proxy && instance.proxy.$mpType === "page" ? null : instance.parent;
			}
		});
		return { state };
	}
	function useFormField(nameKey, value) {
		var uniForm = inject(uniFormKey, false);
		if (!uniForm) return;
		var instance = getCurrentInstance();
		var ctx$1 = {
			submit() {
				var proxy = instance.proxy;
				return [proxy[nameKey], isString(value) ? proxy[value] : value.value];
			},
			reset() {
				if (isString(value)) instance.proxy[value] = "";
				else value.value = "";
			}
		};
		uniForm.addField(ctx$1);
		onBeforeUnmount(() => {
			uniForm.removeField(ctx$1);
		});
	}
	function getSelectedTextRange(_, resolve) {
		var activeElement = document.activeElement;
		if (!activeElement) return resolve({});
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
	function getValueString(value, type, maxlength) {
		if (type === "number" && isNaN(Number(value))) value = "";
		var valueStr = value === null || value === void 0 ? "" : String(value);
		if (maxlength == void 0) return valueStr;
		return valueStr.slice(0, maxlength);
	}
	var INPUT_MODES = [
		"none",
		"text",
		"decimal",
		"numeric",
		"tel",
		"search",
		"email",
		"url"
	];
	var props$13 = /* @__PURE__ */ extend({}, {
		name: {
			type: String,
			default: ""
		},
		modelValue: { type: [String, Number] },
		value: { type: [String, Number] },
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
		},
		confirmHold: {
			type: Boolean,
			default: false
		},
		ignoreCompositionEvent: {
			type: Boolean,
			default: true
		},
		step: {
			type: String,
			default: "0.000000000000000001"
		},
		inputmode: {
			type: String,
			default: void 0,
			validator: (value) => !!~INPUT_MODES.indexOf(value)
		},
		cursorColor: {
			type: String,
			default: ""
		}
	}, props$24);
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
	function useBase(props$30, rootRef, emit$3) {
		var fieldRef = ref(null);
		var trigger$1 = useCustomEvent(rootRef, emit$3);
		var selectionStart = computed(() => {
			var selectionStart$1 = Number(props$30.selectionStart);
			return isNaN(selectionStart$1) ? -1 : selectionStart$1;
		});
		var selectionEnd = computed(() => {
			var selectionEnd$1 = Number(props$30.selectionEnd);
			return isNaN(selectionEnd$1) ? -1 : selectionEnd$1;
		});
		var cursor = computed(() => {
			var cursor$1 = Number(props$30.cursor);
			return isNaN(cursor$1) ? -1 : cursor$1;
		});
		var maxlength = computed(() => {
			var maxlength$1 = Number(props$30.maxlength);
			return isNaN(maxlength$1) ? 140 : maxlength$1;
		});
		var value = "";
		value = getValueString(props$30.modelValue, props$30.type) || getValueString(props$30.value, props$30.type);
		var state = reactive({
			value,
			valueOrigin: value,
			maxlength,
			focus: props$30.focus,
			composing: false,
			selectionStart,
			selectionEnd,
			cursor
		});
		watch(() => state.focus, (val) => emit$3("update:focus", val));
		watch(() => state.maxlength, (val) => state.value = state.value.slice(0, val), { immediate: false });
		return {
			fieldRef,
			state,
			trigger: trigger$1
		};
	}
	function useValueSync(props$30, state, emit$3, trigger$1, fieldRef) {
		var lastUserInputValue = null;
		var valueChangeFn = null;
		valueChangeFn = debounce((val) => {
			var fieldElement = fieldRef.value;
			var newValue = getValueString(val, props$30.type);
			if (fieldElement && document.activeElement === fieldElement && newValue === lastUserInputValue) return;
			state.value = newValue;
		}, 100, {
			setTimeout,
			clearTimeout
		});
		watch(() => props$30.modelValue, valueChangeFn);
		watch(() => props$30.value, valueChangeFn);
		var triggerInputFn = throttle((event, detail) => {
			valueChangeFn.cancel();
			emit$3("update:modelValue", detail.value);
			emit$3("update:value", detail.value);
			trigger$1("input", event, detail);
		}, 100);
		var triggerInput = (event, detail, force) => {
			valueChangeFn.cancel();
			lastUserInputValue = detail.value;
			triggerInputFn(event, detail);
			if (force) triggerInputFn.flush();
		};
		onBeforeMount(() => {
			valueChangeFn.cancel();
			triggerInputFn.cancel();
		});
		return {
			trigger: trigger$1,
			triggerInput
		};
	}
	function useAutoFocus(props$30, fieldRef) {
		var { state: userActionState } = useUserAction();
		var needFocus = computed(() => props$30.autoFocus || props$30.focus);
		function focus() {
			if (!needFocus.value) return;
			var field = fieldRef.value;
			if (!field || !("plus" in window)) {
				setTimeout(focus, 100);
				return;
			}
			var timeout = FOCUS_DELAY - (Date.now() - startTime);
			if (timeout > 0) {
				setTimeout(focus, timeout);
				return;
			}
			var isInputModeEnabled = props$30.inputmode !== "none";
			if (!userActionState.userAction && isInputModeEnabled) {
				plus.key.showSoftKeybord();
				setTimeout(() => {
					field.focus();
				}, 100);
			} else field.focus();
		}
		function blur() {
			var field = fieldRef.value;
			if (field) field.blur();
		}
		watch(() => props$30.focus, (value) => {
			if (value) focus();
			else blur();
		});
		onMounted(() => {
			startTime = startTime || Date.now();
			if (needFocus.value) nextTick(focus);
		});
	}
	function useEvent(fieldRef, state, props$30, trigger$1, triggerInput, beforeInput) {
		function checkSelection() {
			var field = fieldRef.value;
			if (field && state.focus && state.selectionStart > -1 && state.selectionEnd > -1 && field.type !== "number") {
				field.selectionStart = state.selectionStart;
				field.selectionEnd = state.selectionEnd;
			}
		}
		function checkCursor() {
			var field = fieldRef.value;
			if (field && state.focus && state.selectionStart < 0 && state.selectionEnd < 0 && state.cursor > -1 && field.type !== "number") field.selectionEnd = field.selectionStart = state.cursor;
		}
		function getFieldSelectionEnd(field) {
			if (field.type === "number") return null;
			else return field.selectionEnd;
		}
		function initField() {
			var field = fieldRef.value;
			if (!field) return;
			var onFocus = function(event) {
				state.focus = true;
				trigger$1("focus", event, { value: state.value });
				checkSelection();
				checkCursor();
			};
			var onInput = function(event, force) {
				event.stopPropagation();
				if (isFunction(beforeInput) && beforeInput(event, state) === false) return;
				state.value = field.value;
				if (!state.composing || !props$30.ignoreCompositionEvent) triggerInput(event, {
					value: field.value,
					cursor: getFieldSelectionEnd(field)
				}, force);
			};
			var onBlur = function(event) {
				if (state.composing) {
					state.composing = false;
					onInput(event, true);
				}
				state.focus = false;
				trigger$1("blur", event, {
					value: state.value,
					cursor: getFieldSelectionEnd(event.target)
				});
			};
			field.addEventListener("change", (event) => event.stopPropagation());
			field.addEventListener("focus", onFocus);
			field.addEventListener("blur", onBlur);
			field.addEventListener("input", onInput);
			field.addEventListener("compositionstart", (event) => {
				event.stopPropagation();
				state.composing = true;
				_onComposition(event);
			});
			field.addEventListener("compositionend", (event) => {
				event.stopPropagation();
				if (state.composing) {
					state.composing = false;
					onInput(event);
				}
				_onComposition(event);
			});
			field.addEventListener("compositionupdate", _onComposition);
			function _onComposition(event) {
				if (!props$30.ignoreCompositionEvent) trigger$1(event.type, event, { value: event.data });
			}
		}
		watch([() => state.selectionStart, () => state.selectionEnd], checkSelection);
		watch(() => state.cursor, checkCursor);
		watch(() => fieldRef.value, initField);
	}
	function useField(props$30, rootRef, emit$3, beforeInput) {
		UniViewJSBridgeSubscribe();
		var { fieldRef, state, trigger: trigger$1 } = useBase(props$30, rootRef, emit$3);
		var { triggerInput } = useValueSync(props$30, state, emit$3, trigger$1, fieldRef);
		useAutoFocus(props$30, fieldRef);
		useKeyboard(props$30, fieldRef, trigger$1);
		var { state: scopedAttrsState } = useScopedAttrs();
		useFormField("name", state);
		useEvent(fieldRef, state, props$30, trigger$1, triggerInput, beforeInput);
		return {
			fieldRef,
			state,
			scopedAttrsState,
			fixDisabledColor: String(navigator.vendor).indexOf("Apple") === 0 && CSS.supports("image-orientation:from-image"),
			trigger: trigger$1
		};
	}
	var resolveDigitDecimalPointDeleteContentBackward = once(() => {
		return false;
	});
	function resolveDigitDecimalPoint(event, cache$1, state, input, resetCache) {
		if (cache$1.value) {
			if (event.data === ".") {
				if (cache$1.value.slice(-1) === ".") {
					state.value = input.value = cache$1.value = cache$1.value.slice(0, -1);
					return false;
				}
				if (cache$1.value && !cache$1.value.includes(".") && cache$1.value === input.value) {
					cache$1.value += ".";
					if (resetCache) {
						resetCache.fn = () => {
							state.value = input.value = cache$1.value = cache$1.value.slice(0, -1);
							input.removeEventListener("blur", resetCache.fn);
						};
						input.addEventListener("blur", resetCache.fn);
					}
					return false;
				}
			} else if (event.inputType === "deleteContentBackward") {
				if (resolveDigitDecimalPointDeleteContentBackward()) {
					if (cache$1.value.slice(-2, -1) === ".") {
						cache$1.value = state.value = input.value = cache$1.value.slice(0, -2);
						return true;
					}
				}
			}
		}
	}
	var props$23 = /* @__PURE__ */ extend({}, props$13, {
		placeholderClass: {
			type: String,
			default: "input-placeholder"
		},
		textContentType: {
			type: String,
			default: ""
		}
	});
	function isPaste(event) {
		return event.inputType === "insertFromPaste";
	}
	function useCache(props$30, type) {
		if (type.value === "number") {
			var value = typeof props$30.modelValue === "undefined" ? props$30.value : props$30.modelValue;
			var cache$1 = ref(typeof value !== "undefined" && value !== null ? value.toLocaleString() : "");
			watch(() => props$30.modelValue, (value$1) => {
				cache$1.value = typeof value$1 !== "undefined" && value$1 !== null ? value$1.toLocaleString() : "";
			});
			watch(() => props$30.value, (value$1) => {
				cache$1.value = typeof value$1 !== "undefined" && value$1 !== null ? value$1.toLocaleString() : "";
			});
			return cache$1;
		} else return ref("");
	}
	var input_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "Input",
		props: props$23,
		emits: ["confirm", ...emit],
		setup(props$30, _ref) {
			var { emit: emit$3, expose } = _ref;
			var INPUT_TYPES = [
				"text",
				"number",
				"idcard",
				"digit",
				"password",
				"tel"
			];
			var AUTOCOMPLETES = ["off", "one-time-code"];
			var type = computed(() => {
				var type$1 = "";
				switch (props$30.type) {
					case "text":
						type$1 = "text";
						if (props$30.confirmType === "search") type$1 = "search";
						break;
					case "idcard":
						type$1 = "text";
						break;
					case "digit":
						type$1 = "number";
						break;
					case "none":
						type$1 = "text";
						break;
					default:
						type$1 = INPUT_TYPES.includes(props$30.type) ? props$30.type : "text";
						break;
				}
				return props$30.password ? "password" : type$1;
			});
			var autocomplete = computed(() => {
				var camelizeIndex = AUTOCOMPLETES.indexOf(props$30.textContentType);
				var kebabCaseIndex = AUTOCOMPLETES.indexOf(hyphenate(props$30.textContentType));
				return AUTOCOMPLETES[camelizeIndex !== -1 ? camelizeIndex : kebabCaseIndex !== -1 ? kebabCaseIndex : 0];
			});
			var inputmode = computed(() => {
				if (props$30.inputmode !== void 0) return props$30.inputmode;
				if (INPUT_MODES.includes(props$30.type)) return props$30.type;
				return {
					number: "numeric",
					digit: "decimal",
					idcard: "text"
				}[props$30.type];
			});
			var cache$1 = useCache(props$30, type);
			var resetCache = { fn: null };
			var rootRef = ref(null);
			var { fieldRef, state, scopedAttrsState, fixDisabledColor, trigger: trigger$1 } = useField(props$30, rootRef, emit$3, (event, state$1) => {
				var input = event.target;
				if (type.value === "number") {
					if (resetCache.fn) {
						input.removeEventListener("blur", resetCache.fn);
						resetCache.fn = null;
					}
					if (input.validity && !input.validity.valid) {
						if ((!cache$1.value || !input.value) && event.data === "-" || cache$1.value[0] === "-" && event.inputType === "deleteContentBackward") {
							cache$1.value = "-";
							state$1.value = "";
							resetCache.fn = () => {
								cache$1.value = input.value = "";
							};
							input.addEventListener("blur", resetCache.fn);
							return false;
						}
						var res = resolveDigitDecimalPoint(event, cache$1, state$1, input, resetCache);
						if (typeof res === "boolean") return res;
						cache$1.value = state$1.value = input.value = cache$1.value === "-" ? "" : cache$1.value;
						return false;
					} else {
						var _res = resolveDigitDecimalPoint(event, cache$1, state$1, input, resetCache);
						if (typeof _res === "boolean") return _res;
						cache$1.value = input.value;
					}
					if (state$1.maxlength > 0 && input.value.length > state$1.maxlength && !isPaste(event)) {
						input.value = cache$1.value = state$1.value;
						return false;
					}
				}
			});
			watch(() => state.value, (value) => {
				if (props$30.type === "number" && !(cache$1.value === "-" && value === "")) cache$1.value = value.toString();
			});
			watch(() => props$30.maxlength, (length) => {
				length = parseInt(length, 10);
				var realValue = state.value.slice(0, length);
				realValue !== state.value && (state.value = realValue);
			});
			var NUMBER_TYPES = ["number", "digit"];
			var step$1 = computed(() => NUMBER_TYPES.includes(props$30.type) ? props$30.step : "");
			function onKeyUpEnter(event) {
				if (event.key !== "Enter") return;
				var input = event.target;
				event.stopPropagation();
				trigger$1("confirm", event, { value: input.value });
				!props$30.confirmHold && input.blur();
			}
			expose({ $triggerInput: (detail) => {
				emit$3("update:modelValue", detail.value);
				emit$3("update:value", detail.value);
				state.value = detail.value;
			} });
			return () => {
				var inputNode = props$30.disabled && fixDisabledColor ? createVNode("input", {
					"key": "disabled-input",
					"ref": fieldRef,
					"value": state.value,
					"tabindex": "-1",
					"readonly": !!props$30.disabled,
					"type": type.value,
					"maxlength": state.maxlength,
					"step": step$1.value,
					"class": "uni-input-input",
					"style": props$30.cursorColor ? { caretColor: props$30.cursorColor } : {},
					"inputmode": inputmode.value,
					"onFocus": (event) => event.target.blur()
				}, null, 44, [
					"value",
					"readonly",
					"type",
					"maxlength",
					"step",
					"inputmode",
					"onFocus"
				]) : createVNode("input", {
					"key": "input",
					"ref": fieldRef,
					"value": state.value,
					"onInput": withModifiers((event) => {
						var value = event.target.value.toString();
						if (type.value === "number" && state.maxlength > 0 && value.length > state.maxlength) {
							if (isPaste(event)) state.value = value.slice(0, state.maxlength);
							return;
						}
						if (value.length === 0 && event.inputType === "insertText" && event.data === ".") return;
						state.value = value;
					}, ["stop"]),
					"disabled": !!props$30.disabled,
					"type": type.value,
					"maxlength": state.maxlength,
					"step": step$1.value,
					"enterkeyhint": props$30.confirmType,
					"pattern": props$30.type === "number" ? "[0-9]*" : void 0,
					"class": "uni-input-input",
					"style": props$30.cursorColor ? { caretColor: props$30.cursorColor } : {},
					"autocomplete": autocomplete.value,
					"onKeyup": onKeyUpEnter,
					"inputmode": inputmode.value
				}, null, 44, [
					"value",
					"onInput",
					"disabled",
					"type",
					"maxlength",
					"step",
					"enterkeyhint",
					"pattern",
					"autocomplete",
					"onKeyup",
					"inputmode"
				]);
				return createVNode("uni-input", { "ref": rootRef }, [createVNode("div", { "class": "uni-input-wrapper" }, [withDirectives(createVNode("div", mergeProps(scopedAttrsState.attrs, {
					"style": props$30.placeholderStyle,
					"class": ["uni-input-placeholder", props$30.placeholderClass]
				}), [props$30.placeholder], 16), [[vShow, !(state.value.length || cache$1.value === "-" || cache$1.value.includes("."))]]), props$30.confirmType === "search" ? createVNode("form", {
					"action": "",
					"onSubmit": (event) => event.preventDefault(),
					"class": "uni-input-form"
				}, [inputNode], 40, ["onSubmit"]) : inputNode])], 512);
			};
		}
	});
	init_web_dom_iterable();
	function entries(obj) {
		return Object.keys(obj).map((key$1) => [key$1, obj[key$1]]);
	}
	var DEFAULT_EXCLUDE_KEYS = ["class", "style"];
	var LISTENER_PREFIX = /^on[A-Z]+/;
	var useAttrs = function() {
		var { excludeListeners = false, excludeKeys = [] } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		var instance = getCurrentInstance();
		var attrs$1 = shallowRef({});
		var listeners$1 = shallowRef({});
		var excludeAttrs = shallowRef({});
		var allExcludeKeys = excludeKeys.concat(DEFAULT_EXCLUDE_KEYS);
		instance.attrs = reactive(instance.attrs);
		watchEffect(() => {
			var res = entries(instance.attrs).reduce((acc, _ref) => {
				var [key$1, val] = _ref;
				if (allExcludeKeys.includes(key$1)) acc.exclude[key$1] = val;
				else if (LISTENER_PREFIX.test(key$1)) {
					if (!excludeListeners) acc.attrs[key$1] = val;
					acc.listeners[key$1] = val;
				} else acc.attrs[key$1] = val;
				return acc;
			}, {
				exclude: {},
				attrs: {},
				listeners: {}
			});
			attrs$1.value = res.attrs;
			listeners$1.value = res.listeners;
			excludeAttrs.value = res.exclude;
		});
		return {
			$attrs: attrs$1,
			$listeners: listeners$1,
			$excludeAttrs: excludeAttrs
		};
	};
	var webview;
	var pullToRefreshStyle;
	function initScrollBounce() {
		plusReady(() => {
			if (!webview) webview = plus.webview.currentWebview();
			if (!pullToRefreshStyle) pullToRefreshStyle = (webview.getStyle() || {}).pullToRefresh || {};
		});
	}
	function disableScrollBounce(_ref) {
		var { disable } = _ref;
		if (pullToRefreshStyle && pullToRefreshStyle.support) webview.setPullToRefresh(Object.assign({}, pullToRefreshStyle, { support: !disable }));
	}
	function useRebuild(callback) {
		var instance = getCurrentInstance();
		instance.rebuild = callback;
	}
	var movable_area_default = /* @__PURE__ */ defineBuiltInComponent({
		inheritAttrs: false,
		name: "MovableArea",
		props: { scaleArea: {
			type: Boolean,
			default: false
		} },
		setup(props$30, _ref) {
			var { slots } = _ref;
			var rootRef = ref(null);
			var _isMounted = ref(false);
			var { setContexts, events: movableAreaEvents } = useMovableAreaState(props$30, rootRef);
			var { $listeners, $attrs, $excludeAttrs } = useAttrs();
			var _listeners = $listeners.value;
			[
				"onTouchstart",
				"onTouchmove",
				"onTouchend"
			].forEach((event) => {
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
				var _loop = function(index$4) {
					var movableViewItem = movableViewItems[index$4];
					if (!(movableViewItem instanceof Element)) movableViewItem = movableViewItem.el;
					var movableViewContext = originMovableViewContexts.find((context) => movableViewItem === context.rootRef.value);
					if (movableViewContext) contexts.push(markRaw(movableViewContext));
				};
				for (var index$3 = 0; index$3 < movableViewItems.length; index$3++) _loop(index$3);
				setContexts(contexts);
			}
			useRebuild(() => {
				if (rootRef.value) movableViewItems = rootRef.value.children;
				updateMovableViewContexts();
			});
			var addMovableViewContext = (movableViewContext) => {
				originMovableViewContexts.push(movableViewContext);
				updateMovableViewContexts();
			};
			var removeMovableViewContext = (movableViewContext) => {
				var index$3 = originMovableViewContexts.indexOf(movableViewContext);
				if (index$3 >= 0) {
					originMovableViewContexts.splice(index$3, 1);
					updateMovableViewContexts();
				}
			};
			provide("_isMounted", _isMounted);
			provide("movableAreaRootRef", rootRef);
			provide("addMovableViewContext", addMovableViewContext);
			provide("removeMovableViewContext", removeMovableViewContext);
			return () => {
				slots.default && slots.default();
				return createVNode("uni-movable-area", mergeProps({ "ref": rootRef }, $attrs.value, $excludeAttrs.value, _listeners), [createVNode(resize_sensor_default, { "onResize": movableAreaEvents._resize }, null, 8, ["onResize"]), movableViewItems], 16);
			};
		}
	});
	function calc(e$1) {
		return Math.sqrt(e$1.x * e$1.x + e$1.y * e$1.y);
	}
	function useMovableAreaState(props$30, rootRef) {
		var width = ref(0);
		var height = ref(0);
		var gapV = reactive({
			x: null,
			y: null
		});
		var pinchStartLen = ref(null);
		var _scaleMovableView = null;
		var movableViewContexts = [];
		function _updateScale(e$1) {
			if (e$1 && e$1 !== 1) {
				if (props$30.scaleArea) movableViewContexts.forEach(function(item) {
					item._setScale(e$1);
				});
				else if (_scaleMovableView) _scaleMovableView._setScale(e$1);
			}
		}
		function _find(target) {
			var items = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : movableViewContexts;
			var root = rootRef.value;
			function get$1(node) {
				for (var i$1 = 0; i$1 < items.length; i$1++) {
					var item = items[i$1];
					if (node === item.rootRef.value) return item;
				}
				if (node === root || node === document.body || node === document) return null;
				return get$1(node.parentNode);
			}
			return get$1(target);
		}
		var _onTouchstart = withWebEvent((t$1) => {
			disableScrollBounce({ disable: true });
			var i$1 = t$1.touches;
			if (i$1) {
				if (i$1.length > 1) {
					var r = {
						x: i$1[1].pageX - i$1[0].pageX,
						y: i$1[1].pageY - i$1[0].pageY
					};
					pinchStartLen.value = calc(r);
					gapV.x = r.x;
					gapV.y = r.y;
					if (!props$30.scaleArea) {
						var touch0 = _find(i$1[0].target);
						var touch1 = _find(i$1[1].target);
						_scaleMovableView = touch0 && touch0 === touch1 ? touch0 : null;
					}
				}
			}
		});
		var _onTouchmove = withWebEvent((t$1) => {
			var n = t$1.touches;
			if (n) {
				if (n.length > 1) {
					t$1.preventDefault();
					var i$1 = {
						x: n[1].pageX - n[0].pageX,
						y: n[1].pageY - n[0].pageY
					};
					if (gapV.x !== null && pinchStartLen.value && pinchStartLen.value > 0) _updateScale(calc(i$1) / pinchStartLen.value);
					gapV.x = i$1.x;
					gapV.y = i$1.y;
				}
			}
		});
		var _onTouchend = withWebEvent((e$1) => {
			disableScrollBounce({ disable: false });
			var t$1 = e$1.touches;
			if (!(t$1 && t$1.length)) {
				if (e$1.changedTouches) {
					gapV.x = 0;
					gapV.y = 0;
					pinchStartLen.value = null;
					if (props$30.scaleArea) movableViewContexts.forEach(function(item) {
						item._endScale();
					});
					else if (_scaleMovableView) _scaleMovableView._endScale();
				}
			}
		});
		function _resize() {
			_getWH();
			movableViewContexts.forEach(function(item, index$3) {
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
			if (isFunction(callback)) {
				if (callback($event) === false) {
					if (typeof $event.cancelable !== "undefined" ? $event.cancelable : true) $event.preventDefault();
					$event.stopPropagation();
				}
			}
		}, { passive: false });
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
				cancelable: $event.cancelable,
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
			}) === false) return false;
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
	function e(e$1, t$1, n) {
		return e$1 > t$1 - n && e$1 < t$1 + n;
	}
	function t(t$1, n) {
		return e(t$1, 0, n);
	}
	function Decline() {}
	Decline.prototype.x = function(e$1) {
		return Math.sqrt(e$1);
	};
	function Friction$1(e$1, t$1) {
		this._m = e$1;
		this._f = 1e3 * t$1;
		this._startTime = 0;
		this._v = 0;
	}
	Friction$1.prototype.setV = function(x, y) {
		var n = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), .5);
		this._x_v = x;
		this._y_v = y;
		this._x_a = -this._f * this._x_v / n;
		this._y_a = -this._f * this._y_v / n;
		this._t = Math.abs(x / this._x_a) || Math.abs(y / this._y_a);
		this._lastDt = null;
		this._startTime = (/* @__PURE__ */ new Date()).getTime();
	};
	Friction$1.prototype.setS = function(x, y) {
		this._x_s = x;
		this._y_s = y;
	};
	Friction$1.prototype.s = function(t$1) {
		if (void 0 === t$1) t$1 = (/* @__PURE__ */ (/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
		if (t$1 > this._t) {
			t$1 = this._t;
			this._lastDt = t$1;
		}
		var x = this._x_v * t$1 + .5 * this._x_a * Math.pow(t$1, 2) + this._x_s;
		var y = this._y_v * t$1 + .5 * this._y_a * Math.pow(t$1, 2) + this._y_s;
		if (this._x_a > 0 && x < this._endPositionX || this._x_a < 0 && x > this._endPositionX) x = this._endPositionX;
		if (this._y_a > 0 && y < this._endPositionY || this._y_a < 0 && y > this._endPositionY) y = this._endPositionY;
		return {
			x,
			y
		};
	};
	Friction$1.prototype.ds = function(t$1) {
		if (void 0 === t$1) t$1 = (/* @__PURE__ */ (/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
		if (t$1 > this._t) t$1 = this._t;
		return {
			dx: this._x_v + this._x_a * t$1,
			dy: this._y_v + this._y_a * t$1
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
		var t$1 = e(this.s().x, this._endPositionX) || e(this.s().y, this._endPositionY) || this._lastDt === this._t;
		this._lastDt = null;
		return t$1;
	};
	Friction$1.prototype.setEnd = function(x, y) {
		this._endPositionX = x;
		this._endPositionY = y;
	};
	Friction$1.prototype.reconfigure = function(m, f$1) {
		this._m = m;
		this._f = 1e3 * f$1;
	};
	function Spring$1(m, k, c$1) {
		this._m = m;
		this._k = k;
		this._c = c$1;
		this._solution = null;
		this._endPosition = 0;
		this._startTime = 0;
	}
	Spring$1.prototype._solve = function(e$1, t$1) {
		var n = this._c;
		var i$1 = this._m;
		var r = this._k;
		var o$1 = n * n - 4 * i$1 * r;
		if (o$1 === 0) {
			var a$1 = -n / (2 * i$1);
			var s = e$1;
			var l = t$1 / (a$1 * e$1);
			return {
				x: function(e$2) {
					return (s + l * e$2) * Math.pow(Math.E, a$1 * e$2);
				},
				dx: function(e$2) {
					var t$2 = Math.pow(Math.E, a$1 * e$2);
					return a$1 * (s + l * e$2) * t$2 + l * t$2;
				}
			};
		}
		if (o$1 > 0) {
			var c$1 = (-n - Math.sqrt(o$1)) / (2 * i$1);
			var u = (-n + Math.sqrt(o$1)) / (2 * i$1);
			var d = (t$1 - c$1 * e$1) / (u - c$1);
			var h$1 = e$1 - d;
			return {
				x: function(e$2) {
					var t$2;
					var n$1;
					if (e$2 === this._t) {
						t$2 = this._powER1T;
						n$1 = this._powER2T;
					}
					this._t = e$2;
					if (!t$2) t$2 = this._powER1T = Math.pow(Math.E, c$1 * e$2);
					if (!n$1) n$1 = this._powER2T = Math.pow(Math.E, u * e$2);
					return h$1 * t$2 + d * n$1;
				},
				dx: function(e$2) {
					var t$2;
					var n$1;
					if (e$2 === this._t) {
						t$2 = this._powER1T;
						n$1 = this._powER2T;
					}
					this._t = e$2;
					if (!t$2) t$2 = this._powER1T = Math.pow(Math.E, c$1 * e$2);
					if (!n$1) n$1 = this._powER2T = Math.pow(Math.E, u * e$2);
					return h$1 * c$1 * t$2 + d * u * n$1;
				}
			};
		}
		var p$2 = Math.sqrt(4 * i$1 * r - n * n) / (2 * i$1);
		var f$1 = -n / 2 * i$1;
		var v$1 = e$1;
		var g$2 = (t$1 - f$1 * e$1) / p$2;
		return {
			x: function(e$2) {
				return Math.pow(Math.E, f$1 * e$2) * (v$1 * Math.cos(p$2 * e$2) + g$2 * Math.sin(p$2 * e$2));
			},
			dx: function(e$2) {
				var t$2 = Math.pow(Math.E, f$1 * e$2);
				var n$1 = Math.cos(p$2 * e$2);
				var i$2 = Math.sin(p$2 * e$2);
				return t$2 * (g$2 * p$2 * n$1 - v$1 * p$2 * i$2) + f$1 * t$2 * (g$2 * i$2 + v$1 * n$1);
			}
		};
	};
	Spring$1.prototype.x = function(e$1) {
		if (void 0 === e$1) e$1 = (/* @__PURE__ */ (/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
		return this._solution ? this._endPosition + this._solution.x(e$1) : 0;
	};
	Spring$1.prototype.dx = function(e$1) {
		if (void 0 === e$1) e$1 = (/* @__PURE__ */ (/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
		return this._solution ? this._solution.dx(e$1) : 0;
	};
	Spring$1.prototype.setEnd = function(e$1, n, i$1) {
		if (!i$1) i$1 = (/* @__PURE__ */ new Date()).getTime();
		if (e$1 !== this._endPosition || !t(n, .1)) {
			n = n || 0;
			var r = this._endPosition;
			if (this._solution) {
				if (t(n, .1)) n = this._solution.dx((i$1 - this._startTime) / 1e3);
				r = this._solution.x((i$1 - this._startTime) / 1e3);
				if (t(n, .1)) n = 0;
				if (t(r, .1)) r = 0;
				r += this._endPosition;
			}
			if (!(this._solution && t(r - e$1, .1) && t(n, .1))) {
				this._endPosition = e$1;
				this._solution = this._solve(r - this._endPosition, n);
				this._startTime = i$1;
			}
		}
	};
	Spring$1.prototype.snap = function(e$1) {
		this._startTime = (/* @__PURE__ */ new Date()).getTime();
		this._endPosition = e$1;
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
		if (!n) n = (/* @__PURE__ */ new Date()).getTime();
		return e(this.x(), this._endPosition, .1) && t(this.dx(), .1);
	};
	Spring$1.prototype.reconfigure = function(m, t$1, c$1) {
		this._m = m;
		this._k = t$1;
		this._c = c$1;
		if (!this.done()) {
			this._solution = this._solve(this.x() - this._endPosition, this.dx());
			this._startTime = (/* @__PURE__ */ new Date()).getTime();
		}
	};
	Spring$1.prototype.springConstant = function() {
		return this._k;
	};
	Spring$1.prototype.damping = function() {
		return this._c;
	};
	Spring$1.prototype.configuration = function() {
		function e$1(e$2, t$2) {
			e$2.reconfigure(1, t$2, e$2.damping());
		}
		function t$1(e$2, t$2) {
			e$2.reconfigure(1, e$2.springConstant(), t$2);
		}
		return [{
			label: "Spring Constant",
			read: this.springConstant.bind(this),
			write: e$1.bind(this, this),
			min: 100,
			max: 1e3
		}, {
			label: "Damping",
			read: this.damping.bind(this),
			write: t$1.bind(this, this),
			min: 1,
			max: 500
		}];
	};
	function STD(e$1, t$1, n) {
		this._springX = new Spring$1(e$1, t$1, n);
		this._springY = new Spring$1(e$1, t$1, n);
		this._springScale = new Spring$1(e$1, t$1, n);
		this._startTime = 0;
	}
	STD.prototype.setEnd = function(e$1, t$1, n, i$1) {
		var r = (/* @__PURE__ */ new Date()).getTime();
		this._springX.setEnd(e$1, i$1, r);
		this._springY.setEnd(t$1, i$1, r);
		this._springScale.setEnd(n, i$1, r);
		this._startTime = r;
	};
	STD.prototype.x = function() {
		var e$1 = (/* @__PURE__ */ (/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
		return {
			x: this._springX.x(e$1),
			y: this._springY.x(e$1),
			scale: this._springScale.x(e$1)
		};
	};
	STD.prototype.done = function() {
		var e$1 = (/* @__PURE__ */ new Date()).getTime();
		return this._springX.done(e$1) && this._springY.done(e$1) && this._springScale.done(e$1);
	};
	STD.prototype.reconfigure = function(e$1, t$1, n) {
		this._springX.reconfigure(e$1, t$1, n);
		this._springY.reconfigure(e$1, t$1, n);
		this._springScale.reconfigure(e$1, t$1, n);
	};
	var movableViewProps = {
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
			default: .1
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
	function v(a$1, b) {
		return +((1e3 * a$1 - 1e3 * b) / 1e3).toFixed(1);
	}
	var movable_view_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "MovableView",
		props: movableViewProps,
		emits: ["change", "scale"],
		setup(props$30, _ref) {
			var { slots, emit: emit$3 } = _ref;
			var rootRef = ref(null);
			var { setParent } = useMovableViewState(props$30, useCustomEvent(rootRef, emit$3), rootRef);
			return () => {
				return createVNode("uni-movable-view", { "ref": rootRef }, [createVNode(resize_sensor_default, { "onResize": setParent }, null, 8, ["onResize"]), slots.default && slots.default()], 512);
			};
		}
	});
	var requesting = false;
	function _requestAnimationFrame(e$1) {
		if (!requesting) {
			requesting = true;
			requestAnimationFrame(function() {
				e$1();
				requesting = false;
			});
		}
	}
	function p(t$1, n) {
		if (t$1 === n) return 0;
		var i$1 = t$1.offsetLeft;
		return t$1.offsetParent ? i$1 += p(t$1.offsetParent, n) : 0;
	}
	function f(t$1, n) {
		if (t$1 === n) return 0;
		var i$1 = t$1.offsetTop;
		return t$1.offsetParent ? i$1 += f(t$1.offsetParent, n) : 0;
	}
	function g(friction, execute, endCallback) {
		var record = {
			id: 0,
			cancelled: false
		};
		var cancel = function(record$1) {
			if (record$1 && record$1.id) cancelAnimationFrame(record$1.id);
			if (record$1) record$1.cancelled = true;
		};
		function fn(record$1, friction$1, execute$1, endCallback$1) {
			if (!record$1 || !record$1.cancelled) {
				execute$1(friction$1);
				var isDone = friction$1.done();
				if (!isDone) {
					if (!record$1.cancelled) record$1.id = requestAnimationFrame(fn.bind(null, record$1, friction$1, execute$1, endCallback$1));
				}
				if (isDone && endCallback$1) endCallback$1(friction$1);
			}
		}
		fn(record, friction, execute, endCallback);
		return {
			cancel: cancel.bind(null, record),
			model: friction
		};
	}
	function _getPx(val) {
		if (/\d+[ur]px$/i.test(val)) return uni.upx2px(parseFloat(val));
		return Number(val) || 0;
	}
	function useMovableViewLayout(rootRef, _scale, _adjustScale) {
		var movableAreaWidth = inject("movableAreaWidth", ref(0));
		var movableAreaHeight = inject("movableAreaHeight", ref(0));
		var movableAreaRootRef = inject("movableAreaRootRef");
		var _offset = {
			x: 0,
			y: 0
		};
		var _scaleOffset = {
			x: 0,
			y: 0
		};
		var width = ref(0);
		var height = ref(0);
		var minX = ref(0);
		var minY = ref(0);
		var maxX = ref(0);
		var maxY = ref(0);
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
		function _updateOffset() {
			_offset.x = p(rootRef.value, movableAreaRootRef.value);
			_offset.y = f(rootRef.value, movableAreaRootRef.value);
		}
		function _updateWH(scale) {
			scale = scale || _scale.value;
			scale = _adjustScale(scale);
			var rect = rootRef.value.getBoundingClientRect();
			height.value = rect.height / _scale.value;
			width.value = rect.width / _scale.value;
			var _height = height.value * scale;
			_scaleOffset.x = (width.value * scale - width.value) / 2;
			_scaleOffset.y = (_height - height.value) / 2;
		}
		return {
			_updateBoundary,
			_updateOffset,
			_updateWH,
			_scaleOffset,
			minX,
			minY,
			maxX,
			maxY
		};
	}
	function useMovableViewTransform(rootRef, props$30, _scaleOffset, _scale, maxX, maxY, minX, minY, _translateX, _translateY, _SFA, _FA, _adjustScale, trigger$1) {
		var dampingNumber = computed(() => {
			var val = Number(props$30.damping);
			return isNaN(val) ? 20 : val;
		});
		var xMove = computed(() => props$30.direction === "all" || props$30.direction === "horizontal");
		var yMove = computed(() => props$30.direction === "all" || props$30.direction === "vertical");
		var xSync = ref(_getPx(props$30.x));
		var ySync = ref(_getPx(props$30.y));
		watch(() => props$30.x, (val) => {
			xSync.value = _getPx(val);
		});
		watch(() => props$30.y, (val) => {
			ySync.value = _getPx(val);
		});
		watch(xSync, (val) => {
			_setX(val);
		});
		watch(ySync, (val) => {
			_setY(val);
		});
		var _STD = new STD(1, 9 * Math.pow(dampingNumber.value, 2) / 40, dampingNumber.value);
		function _getLimitXY(x, y) {
			var outOfBounds = false;
			if (x > maxX.value) {
				x = maxX.value;
				outOfBounds = true;
			} else if (x < minX.value) {
				x = minX.value;
				outOfBounds = true;
			}
			if (y > maxY.value) {
				y = maxY.value;
				outOfBounds = true;
			} else if (y < minY.value) {
				y = minY.value;
				outOfBounds = true;
			}
			return {
				x,
				y,
				outOfBounds
			};
		}
		function FAandSFACancel() {
			if (_FA) _FA.cancel();
			if (_SFA) _SFA.cancel();
		}
		function _animationTo(x, y, scale, source, r, o$1) {
			FAandSFACancel();
			if (!xMove.value) x = _translateX.value;
			if (!yMove.value) y = _translateY.value;
			if (!props$30.scale) scale = _scale.value;
			var limitXY = _getLimitXY(x, y);
			x = limitXY.x;
			y = limitXY.y;
			if (!props$30.animation) {
				_setTransform(x, y, scale, source, r, o$1);
				return;
			}
			_STD._springX._solution = null;
			_STD._springY._solution = null;
			_STD._springScale._solution = null;
			_STD._springX._endPosition = _translateX.value;
			_STD._springY._endPosition = _translateY.value;
			_STD._springScale._endPosition = _scale.value;
			_STD.setEnd(x, y, scale, 1);
			_SFA = g(_STD, function() {
				var data = _STD.x();
				var x$1 = data.x;
				var y$1 = data.y;
				var scale$1 = data.scale;
				_setTransform(x$1, y$1, scale$1, source, r, o$1);
			}, function() {
				_SFA.cancel();
			});
		}
		function _setTransform(x, y, scale) {
			var source = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "";
			var r = arguments.length > 4 ? arguments[4] : void 0;
			var o$1 = arguments.length > 5 ? arguments[5] : void 0;
			if (!(x !== null && x.toString() !== "NaN" && typeof x === "number")) x = _translateX.value || 0;
			if (!(y !== null && y.toString() !== "NaN" && typeof y === "number")) y = _translateY.value || 0;
			x = Number(x.toFixed(1));
			y = Number(y.toFixed(1));
			scale = Number(scale.toFixed(1));
			if (!(_translateX.value === x && _translateY.value === y)) {
				if (!r) trigger$1("change", {}, {
					x: v(x, _scaleOffset.x),
					y: v(y, _scaleOffset.y),
					source
				});
			}
			if (!props$30.scale) scale = _scale.value;
			scale = _adjustScale(scale);
			scale = +scale.toFixed(3);
			if (o$1 && scale !== _scale.value) trigger$1("scale", {}, {
				x,
				y,
				scale
			});
			var transform = "translateX(" + x + "px) translateY(" + y + "px) translateZ(0px) scale(" + scale + ")";
			if (rootRef.value) {
				rootRef.value.style.transform = transform;
				rootRef.value.style.webkitTransform = transform;
				_translateX.value = x;
				_translateY.value = y;
				_scale.value = scale;
			}
		}
		function _revise(source) {
			var limitXY = _getLimitXY(_translateX.value, _translateY.value);
			var x = limitXY.x;
			var y = limitXY.y;
			var outOfBounds = limitXY.outOfBounds;
			if (outOfBounds) _animationTo(x, y, _scale.value, source);
			return outOfBounds;
		}
		function _setX(val) {
			if (xMove.value) if (val + _scaleOffset.x === _translateX.value) return _translateX;
			else {
				if (_SFA) _SFA.cancel();
				_animationTo(val + _scaleOffset.x, ySync.value + _scaleOffset.y, _scale.value);
			}
			return val;
		}
		function _setY(val) {
			if (yMove.value) if (val + _scaleOffset.y === _translateY.value) return _translateY;
			else {
				if (_SFA) _SFA.cancel();
				_animationTo(xSync.value + _scaleOffset.x, val + _scaleOffset.y, _scale.value);
			}
			return val;
		}
		return {
			FAandSFACancel,
			_getLimitXY,
			_animationTo,
			_setTransform,
			_revise,
			dampingNumber,
			xMove,
			yMove,
			xSync,
			ySync,
			_STD
		};
	}
	function useMovableViewInit(props$30, rootRef, trigger$1, _scale, _oldScale, _isScaling, _translateX, _translateY, _SFA, _FA) {
		var scaleMinNumber = computed(() => {
			var val = Number(props$30.scaleMin);
			return isNaN(val) ? .1 : val;
		});
		var scaleMaxNumber = computed(() => {
			var val = Number(props$30.scaleMax);
			return isNaN(val) ? 10 : val;
		});
		var scaleValueSync = ref(Number(props$30.scaleValue) || 1);
		watch(scaleValueSync, (val) => {
			_setScaleValue(val);
		});
		watch(scaleMinNumber, () => {
			_setScaleMinOrMax();
		});
		watch(scaleMaxNumber, () => {
			_setScaleMinOrMax();
		});
		watch(() => props$30.scaleValue, (val) => {
			scaleValueSync.value = Number(val) || 0;
		});
		var { _updateBoundary, _updateOffset, _updateWH, _scaleOffset, minX, minY, maxX, maxY } = useMovableViewLayout(rootRef, _scale, _adjustScale);
		var { FAandSFACancel, _getLimitXY, _animationTo, _setTransform, _revise, dampingNumber, xMove, yMove, xSync, ySync, _STD } = useMovableViewTransform(rootRef, props$30, _scaleOffset, _scale, maxX, maxY, minX, minY, _translateX, _translateY, _SFA, _FA, _adjustScale, trigger$1);
		function _updateScale(scale, animat) {
			if (props$30.scale) {
				scale = _adjustScale(scale);
				_updateWH(scale);
				_updateBoundary();
				var limitXY = _getLimitXY(_translateX.value, _translateY.value);
				var x = limitXY.x;
				var y = limitXY.y;
				if (animat) _animationTo(x, y, scale, "", true, true);
				else _requestAnimationFrame(function() {
					_setTransform(x, y, scale, "", true, true);
				});
			}
		}
		function _beginScale() {
			_isScaling.value = true;
		}
		function _updateOldScale(scale) {
			_oldScale.value = scale;
		}
		function _adjustScale(scale) {
			scale = Math.max(.1, scaleMinNumber.value, scale);
			scale = Math.min(10, scaleMaxNumber.value, scale);
			return scale;
		}
		function _setScaleMinOrMax() {
			if (!props$30.scale) return false;
			_updateScale(_scale.value, true);
			_updateOldScale(_scale.value);
		}
		function _setScaleValue(scale) {
			if (!props$30.scale) return false;
			scale = _adjustScale(scale);
			_updateScale(scale, true);
			_updateOldScale(scale);
			return scale;
		}
		function _endScale() {
			_isScaling.value = false;
			_updateOldScale(_scale.value);
		}
		function _setScale(scale) {
			if (scale) {
				scale = _oldScale.value * scale;
				_beginScale();
				_updateScale(scale);
			}
		}
		return {
			_updateOldScale,
			_endScale,
			_setScale,
			scaleValueSync,
			_updateBoundary,
			_updateOffset,
			_updateWH,
			_scaleOffset,
			minX,
			minY,
			maxX,
			maxY,
			FAandSFACancel,
			_getLimitXY,
			_animationTo,
			_setTransform,
			_revise,
			dampingNumber,
			xMove,
			yMove,
			xSync,
			ySync,
			_STD
		};
	}
	function useMovableViewState(props$30, trigger$1, rootRef) {
		var _isMounted = inject("_isMounted", ref(false));
		var addMovableViewContext = inject("addMovableViewContext", () => {});
		var removeMovableViewContext = inject("removeMovableViewContext", () => {});
		var _scale = ref(1);
		var _oldScale = ref(1);
		var _isScaling = ref(false);
		var _translateX = ref(0);
		var _translateY = ref(0);
		var _SFA = null;
		var _FA = null;
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
		var frictionNumber = computed(() => {
			var val = Number(props$30.friction);
			return isNaN(val) || val <= 0 ? 2 : val;
		});
		var _friction = new Friction$1(1, frictionNumber.value);
		watch(() => props$30.disabled, () => {
			__handleTouchStart();
		});
		var { _updateOldScale, _endScale, _setScale, scaleValueSync, _updateBoundary, _updateOffset, _updateWH, _scaleOffset, minX, minY, maxX, maxY, FAandSFACancel, _getLimitXY, _setTransform, _revise, dampingNumber, xMove, yMove, xSync, ySync, _STD } = useMovableViewInit(props$30, rootRef, trigger$1, _scale, _oldScale, _isScaling, _translateX, _translateY, _SFA, _FA);
		function __handleTouchStart() {
			if (!_isScaling.value) {
				if (!props$30.disabled) {
					disableScrollBounce({ disable: true });
					FAandSFACancel();
					__touchInfo.historyX = [0, 0];
					__touchInfo.historyY = [0, 0];
					__touchInfo.historyT = [0, 0];
					if (xMove.value) __baseX = _translateX.value;
					if (yMove.value) __baseY = _translateY.value;
					rootRef.value.style.willChange = "transform";
					_checkCanMove = null;
					_firstMoveDirection = null;
					_isTouching = true;
				}
			}
		}
		function __handleTouchMove(event) {
			if (!_isScaling.value && !props$30.disabled && _isTouching) {
				var x = _translateX.value;
				var y = _translateY.value;
				if (_firstMoveDirection === null) _firstMoveDirection = Math.abs(event.detail.dx / event.detail.dy) > 1 ? "htouchmove" : "vtouchmove";
				if (xMove.value) {
					x = event.detail.dx + __baseX;
					__touchInfo.historyX.shift();
					__touchInfo.historyX.push(x);
					if (!yMove.value && _checkCanMove === null) _checkCanMove = Math.abs(event.detail.dx / event.detail.dy) < 1;
				}
				if (yMove.value) {
					y = event.detail.dy + __baseY;
					__touchInfo.historyY.shift();
					__touchInfo.historyY.push(y);
					if (!xMove.value && _checkCanMove === null) _checkCanMove = Math.abs(event.detail.dy / event.detail.dx) < 1;
				}
				__touchInfo.historyT.shift();
				__touchInfo.historyT.push(event.detail.timeStamp);
				if (!_checkCanMove) {
					event.preventDefault();
					var source = "touch";
					if (x < minX.value) if (props$30.outOfBounds) {
						source = "touch-out-of-bounds";
						x = minX.value - _declineX.x(minX.value - x);
					} else x = minX.value;
					else if (x > maxX.value) if (props$30.outOfBounds) {
						source = "touch-out-of-bounds";
						x = maxX.value + _declineX.x(x - maxX.value);
					} else x = maxX.value;
					if (y < minY.value) if (props$30.outOfBounds) {
						source = "touch-out-of-bounds";
						y = minY.value - _declineY.x(minY.value - y);
					} else y = minY.value;
					else if (y > maxY.value) if (props$30.outOfBounds) {
						source = "touch-out-of-bounds";
						y = maxY.value + _declineY.x(y - maxY.value);
					} else y = maxY.value;
					_requestAnimationFrame(function() {
						_setTransform(x, y, _scale.value, source);
					});
				}
			}
		}
		function __handleTouchEnd() {
			if (!_isScaling.value && !props$30.disabled && _isTouching) {
				disableScrollBounce({ disable: false });
				rootRef.value.style.willChange = "auto";
				_isTouching = false;
				if (!_checkCanMove && !_revise("out-of-bounds") && props$30.inertia) {
					var xv = 1e3 * (__touchInfo.historyX[1] - __touchInfo.historyX[0]) / (__touchInfo.historyT[1] - __touchInfo.historyT[0]);
					var yv = 1e3 * (__touchInfo.historyY[1] - __touchInfo.historyY[0]) / (__touchInfo.historyT[1] - __touchInfo.historyT[0]);
					var __translateX = _translateX.value;
					var __translateY = _translateY.value;
					_friction.setV(xv, yv);
					_friction.setS(__translateX, __translateY);
					var x0 = _friction.delta().x;
					var y0 = _friction.delta().y;
					var x = x0 + __translateX;
					var y = y0 + __translateY;
					if (x < minX.value) {
						x = minX.value;
						y = __translateY + (minX.value - __translateX) * y0 / x0;
					} else if (x > maxX.value) {
						x = maxX.value;
						y = __translateY + (maxX.value - __translateX) * y0 / x0;
					}
					if (y < minY.value) {
						y = minY.value;
						x = __translateX + (minY.value - __translateY) * x0 / y0;
					} else if (y > maxY.value) {
						y = maxY.value;
						x = __translateX + (maxY.value - __translateY) * x0 / y0;
					}
					_friction.setEnd(x, y);
					_FA = g(_friction, function() {
						var t$1 = _friction.s();
						var x$1 = t$1.x;
						var y$1 = t$1.y;
						_setTransform(x$1, y$1, _scale.value, "friction");
					}, function() {
						_FA.cancel();
					});
				}
			}
			if (!props$30.outOfBounds && !props$30.inertia) FAandSFACancel();
		}
		function setParent() {
			if (!_isMounted.value) return;
			FAandSFACancel();
			var scale = props$30.scale ? scaleValueSync.value : 1;
			_updateOffset();
			_updateWH(scale);
			_updateBoundary();
			var limitXY = _getLimitXY(xSync.value + _scaleOffset.x, ySync.value + _scaleOffset.y);
			var x = limitXY.x;
			var y = limitXY.y;
			_setTransform(x, y, scale, "", true);
			_updateOldScale(scale);
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
					case "end": __handleTouchEnd();
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
		return { setParent };
	}
	var OPEN_TYPES = [
		"navigate",
		"redirect",
		"switchTab",
		"reLaunch",
		"navigateBack"
	];
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
	var navigatorProps = {
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
		},
		animationType: {
			type: String,
			default: "",
			validator(value) {
				return !value || ANIMATION_IN.concat(ANIMATION_OUT).includes(value);
			}
		},
		animationDuration: {
			type: [String, Number],
			default: 300
		}
	};
	function createNavigatorOnClick(props$30) {
		return () => {
			if (props$30.openType !== "navigateBack" && !props$30.url) {
				console.error("<navigator/> should have url attribute when using navigateTo, redirectTo, reLaunch or switchTab");
				return;
			}
			var animationDuration = parseInt(props$30.animationDuration);
			var onFail = void 0;
			switch (props$30.openType) {
				case "navigate":
					uni.navigateTo({
						url: props$30.url,
						animationType: props$30.animationType || "pop-in",
						animationDuration,
						fail: onFail
					});
					break;
				case "redirect":
					uni.redirectTo({
						url: props$30.url,
						exists: props$30.exists,
						fail: onFail
					});
					break;
				case "switchTab":
					uni.switchTab({
						url: props$30.url,
						fail: onFail
					});
					break;
				case "reLaunch":
					uni.reLaunch({
						url: props$30.url,
						fail: onFail
					});
					break;
				case "navigateBack":
					uni.navigateBack({
						delta: props$30.delta,
						animationType: props$30.animationType || "pop-out",
						animationDuration,
						fail: onFail
					});
					break;
				default: break;
			}
		};
	}
	var navigator_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "Navigator",
		inheritAttrs: false,
		compatConfig: { MODE: 3 },
		props: /* @__PURE__ */ extend({}, navigatorProps, { renderLink: {
			type: Boolean,
			default: true
		} }),
		setup(props$30, _ref) {
			var { slots } = _ref;
			var rootRef = ref(null);
			var vm = getCurrentInstance();
			var __scopeId = vm && vm.vnode.scopeId || "";
			var { hovering, binding } = useHover(props$30);
			var onClick = createNavigatorOnClick(props$30);
			return () => {
				var { hoverClass, url } = props$30;
				var hasHoverClass = props$30.hoverClass && props$30.hoverClass !== "none";
				var innerNode = props$30.renderLink ? createVNode("a", {
					"class": "navigator-wrap",
					"href": url,
					"onClick": onEventPrevent,
					"onMousedown": onEventPrevent
				}, [slots.default && slots.default()], 40, [
					"href",
					"onClick",
					"onMousedown"
				]) : slots.default && slots.default();
				return createVNode("uni-navigator", mergeProps({
					"class": hasHoverClass && hovering.value ? hoverClass : "",
					"ref": rootRef
				}, hasHoverClass && binding, vm ? vm.attrs : {}, { [__scopeId]: "" }, { "onClick": onClick }), [innerNode], 16, ["onClick"]);
			};
		}
	});
	var pickerViewProps = {
		value: {
			type: Array,
			default() {
				return [];
			},
			validator: function(val) {
				return isArray(val) && val.filter((val$1) => typeof val$1 === "number").length === val.length;
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
	function useState$3(props$30) {
		var state = reactive({
			value: reactive([...props$30.value]),
			height: 34
		});
		watch(() => props$30.value, (val, oldVal) => {
			if (val === oldVal || val.length !== oldVal.length || val.findIndex((item, index$3) => item !== oldVal[index$3]) >= 0) {
				state.value.length = val.length;
				val.forEach((val$1, index$3) => {
					if (val$1 !== state.value[index$3]) state.value.splice(index$3, 1, val$1);
				});
			}
		});
		return state;
	}
	var picker_view_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "PickerView",
		props: pickerViewProps,
		emits: [
			"change",
			"pickstart",
			"pickend",
			"update:value"
		],
		setup(props$30, _ref) {
			var { slots, emit: emit$3 } = _ref;
			var rootRef = ref(null);
			var wrapperRef = ref(null);
			var trigger$1 = useCustomEvent(rootRef, emit$3);
			var state = useState$3(props$30);
			var resizeSensorRef = ref(null);
			var onMountedCallback = () => {
				var resizeSensor = resizeSensorRef.value;
				resizeSensor && (state.height = resizeSensor.$el.offsetHeight);
			};
			var ColumnsPreRef = ref([]);
			var columnsRef = ref([]);
			function getItemIndex(vnode) {
				var columnVNodes = columnsRef.value;
				if (columnVNodes instanceof HTMLCollection) return Array.prototype.indexOf.call(columnVNodes, vnode.el);
				else columnVNodes = columnVNodes.filter((vnode$1) => vnode$1.type !== Comment);
				var index$3 = columnVNodes.indexOf(vnode);
				return index$3 !== -1 ? index$3 : ColumnsPreRef.value.indexOf(vnode);
			}
			var getPickerViewColumn = function(columnInstance) {
				return computed({
					get() {
						var index$3 = getItemIndex(columnInstance.vnode);
						return state.value[index$3] || 0;
					},
					set(current) {
						var index$3 = getItemIndex(columnInstance.vnode);
						if (index$3 < 0) return;
						if (state.value[index$3] !== current) {
							state.value[index$3] = current;
							var value = state.value.map((val) => val);
							emit$3("update:value", value);
							trigger$1("change", {}, { value });
						}
					}
				});
			};
			provide("getPickerViewColumn", getPickerViewColumn);
			provide("pickerViewProps", props$30);
			provide("pickerViewState", state);
			useRebuild(() => {
				onMountedCallback();
				wrapperRef.value && (columnsRef.value = wrapperRef.value.children);
			});
			return () => {
				var defaultSlots = slots.default && slots.default();
				return createVNode("uni-picker-view", { "ref": rootRef }, [createVNode(resize_sensor_default, {
					"ref": resizeSensorRef,
					"onResize": (_ref2) => {
						var { height } = _ref2;
						return state.height = height;
					}
				}, null, 8, ["onResize"]), createVNode("div", {
					"ref": wrapperRef,
					"class": "uni-picker-view-wrapper"
				}, [defaultSlots], 512)], 512);
			};
		}
	});
	var Friction = class {
		constructor(drag) {
			this._drag = drag;
			this._dragLog = Math.log(drag);
			this._x = 0;
			this._v = 0;
			this._startTime = 0;
		}
		set(x, v$1) {
			this._x = x;
			this._v = v$1;
			this._startTime = (/* @__PURE__ */ new Date()).getTime();
		}
		setVelocityByEnd(e$1) {
			this._v = (e$1 - this._x) * this._dragLog / (Math.pow(this._drag, 100) - 1);
		}
		x(e$1) {
			if (e$1 === void 0) e$1 = (/* @__PURE__ */ (/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
			var t$1 = e$1 === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e$1);
			this._dt = e$1;
			return this._x + this._v * t$1 / this._dragLog - this._v / this._dragLog;
		}
		dx(e$1) {
			if (e$1 === void 0) e$1 = (/* @__PURE__ */ (/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
			var t$1 = e$1 === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e$1);
			this._dt = e$1;
			return this._v * t$1;
		}
		done() {
			return Math.abs(this.dx()) < 3;
		}
		reconfigure(e$1) {
			var t$1 = this.x();
			var n = this.dx();
			this._drag = e$1;
			this._dragLog = Math.log(e$1);
			this.set(t$1, n);
		}
		configuration() {
			var e$1 = this;
			return [{
				label: "Friction",
				read: function() {
					return e$1._drag;
				},
				write: function(t$1) {
					e$1.reconfigure(t$1);
				},
				min: .001,
				max: .1,
				step: .001
			}];
		}
	};
	function o(e$1, t$1, n) {
		return e$1 > t$1 - n && e$1 < t$1 + n;
	}
	function a(e$1, t$1) {
		return o(e$1, 0, t$1);
	}
	var Spring = class {
		constructor(m, k, c$1) {
			this._m = m;
			this._k = k;
			this._c = c$1;
			this._solution = null;
			this._endPosition = 0;
			this._startTime = 0;
		}
		_solve(e$1, t$1) {
			var n = this._c;
			var i$1 = this._m;
			var r = this._k;
			var o$1 = n * n - 4 * i$1 * r;
			if (o$1 === 0) {
				var _a = -n / (2 * i$1);
				var _s = e$1;
				var _l = t$1 / (_a * e$1);
				return {
					x: function(e$2) {
						return (_s + _l * e$2) * Math.pow(Math.E, _a * e$2);
					},
					dx: function(e$2) {
						var t$2 = Math.pow(Math.E, _a * e$2);
						return _a * (_s + _l * e$2) * t$2 + _l * t$2;
					}
				};
			}
			if (o$1 > 0) {
				var c$1 = (-n - Math.sqrt(o$1)) / (2 * i$1);
				var u = (-n + Math.sqrt(o$1)) / (2 * i$1);
				var _l2 = (t$1 - c$1 * e$1) / (u - c$1);
				var _s2 = e$1 - _l2;
				return {
					x: function(e$2) {
						var t$2;
						var n$1;
						if (e$2 === this._t) {
							t$2 = this._powER1T;
							n$1 = this._powER2T;
						}
						this._t = e$2;
						if (!t$2) t$2 = this._powER1T = Math.pow(Math.E, c$1 * e$2);
						if (!n$1) n$1 = this._powER2T = Math.pow(Math.E, u * e$2);
						return _s2 * t$2 + _l2 * n$1;
					},
					dx: function(e$2) {
						var t$2;
						var n$1;
						if (e$2 === this._t) {
							t$2 = this._powER1T;
							n$1 = this._powER2T;
						}
						this._t = e$2;
						if (!t$2) t$2 = this._powER1T = Math.pow(Math.E, c$1 * e$2);
						if (!n$1) n$1 = this._powER2T = Math.pow(Math.E, u * e$2);
						return _s2 * c$1 * t$2 + _l2 * u * n$1;
					}
				};
			}
			var d = Math.sqrt(4 * i$1 * r - n * n) / (2 * i$1);
			var a$1 = -n / 2 * i$1;
			var s = e$1;
			var l = (t$1 - a$1 * e$1) / d;
			return {
				x: function(e$2) {
					return Math.pow(Math.E, a$1 * e$2) * (s * Math.cos(d * e$2) + l * Math.sin(d * e$2));
				},
				dx: function(e$2) {
					var t$2 = Math.pow(Math.E, a$1 * e$2);
					var n$1 = Math.cos(d * e$2);
					var i$2 = Math.sin(d * e$2);
					return t$2 * (l * d * n$1 - s * d * i$2) + a$1 * t$2 * (l * i$2 + s * n$1);
				}
			};
		}
		x(e$1) {
			if (e$1 === void 0) e$1 = (/* @__PURE__ */ (/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
			return this._solution ? this._endPosition + this._solution.x(e$1) : 0;
		}
		dx(e$1) {
			if (e$1 === void 0) e$1 = (/* @__PURE__ */ (/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
			return this._solution ? this._solution.dx(e$1) : 0;
		}
		setEnd(e$1, t$1, n) {
			if (!n) n = (/* @__PURE__ */ new Date()).getTime();
			if (e$1 !== this._endPosition || !a(t$1, .4)) {
				t$1 = t$1 || 0;
				var i$1 = this._endPosition;
				if (this._solution) {
					if (a(t$1, .4)) t$1 = this._solution.dx((n - this._startTime) / 1e3);
					i$1 = this._solution.x((n - this._startTime) / 1e3);
					if (a(t$1, .4)) t$1 = 0;
					if (a(i$1, .4)) i$1 = 0;
					i$1 += this._endPosition;
				}
				if (!(this._solution && a(i$1 - e$1, .4) && a(t$1, .4))) {
					this._endPosition = e$1;
					this._solution = this._solve(i$1 - this._endPosition, t$1);
					this._startTime = n;
				}
			}
		}
		snap(e$1) {
			this._startTime = (/* @__PURE__ */ new Date()).getTime();
			this._endPosition = e$1;
			this._solution = {
				x: function() {
					return 0;
				},
				dx: function() {
					return 0;
				}
			};
		}
		done(e$1) {
			if (!e$1) e$1 = (/* @__PURE__ */ new Date()).getTime();
			return o(this.x(), this._endPosition, .4) && a(this.dx(), .4);
		}
		reconfigure(e$1, t$1, n) {
			this._m = e$1;
			this._k = t$1;
			this._c = n;
			if (!this.done()) {
				this._solution = this._solve(this.x() - this._endPosition, this.dx());
				this._startTime = (/* @__PURE__ */ new Date()).getTime();
			}
		}
		springConstant() {
			return this._k;
		}
		damping() {
			return this._c;
		}
		configuration() {
			function e$1(e$2, t$2) {
				e$2.reconfigure(1, t$2, e$2.damping());
			}
			function t$1(e$2, t$2) {
				e$2.reconfigure(1, e$2.springConstant(), t$2);
			}
			return [{
				label: "Spring Constant",
				read: this.springConstant.bind(this),
				write: e$1.bind(this, this),
				min: 100,
				max: 1e3
			}, {
				label: "Damping",
				read: this.damping.bind(this),
				write: t$1.bind(this, this),
				min: 1,
				max: 500
			}];
		}
	};
	var Scroll = class {
		constructor(extent, friction, spring) {
			this._extent = extent;
			this._friction = friction || new Friction(.01);
			this._spring = spring || new Spring(1, 90, 20);
			this._startTime = 0;
			this._springing = false;
			this._springOffset = 0;
		}
		snap(e$1, t$1) {
			this._springOffset = 0;
			this._springing = true;
			this._spring.snap(e$1);
			this._spring.setEnd(t$1);
		}
		set(e$1, t$1) {
			this._friction.set(e$1, t$1);
			if (e$1 > 0 && t$1 >= 0) {
				this._springOffset = 0;
				this._springing = true;
				this._spring.snap(e$1);
				this._spring.setEnd(0);
			} else if (e$1 < -this._extent && t$1 <= 0) {
				this._springOffset = 0;
				this._springing = true;
				this._spring.snap(e$1);
				this._spring.setEnd(-this._extent);
			} else this._springing = false;
			this._startTime = (/* @__PURE__ */ new Date()).getTime();
		}
		x(e$1) {
			if (!this._startTime) return 0;
			if (!e$1) e$1 = (/* @__PURE__ */ (/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
			if (this._springing) return this._spring.x() + this._springOffset;
			var t$1 = this._friction.x(e$1);
			var n = this.dx(e$1);
			if (t$1 > 0 && n >= 0 || t$1 < -this._extent && n <= 0) {
				this._springing = true;
				this._spring.setEnd(0, n);
				if (t$1 < -this._extent) this._springOffset = -this._extent;
				else this._springOffset = 0;
				t$1 = this._spring.x() + this._springOffset;
			}
			return t$1;
		}
		dx(e$1) {
			var t$1;
			if (this._lastTime === e$1) t$1 = this._lastDx;
			else t$1 = this._springing ? this._spring.dx(e$1) : this._friction.dx(e$1);
			this._lastTime = e$1;
			this._lastDx = t$1;
			return t$1;
		}
		done() {
			return this._springing ? this._spring.done() : this._friction.done();
		}
		setVelocityByEnd(e$1) {
			this._friction.setVelocityByEnd(e$1);
		}
		configuration() {
			var e$1 = this._friction.configuration();
			e$1.push.apply(e$1, this._spring.configuration());
			return e$1;
		}
	};
	function calculateSnapIndex(position, itemSize) {
		return Math.round(Math.abs(position) / itemSize);
	}
	function createAnimation(scroll, onScroll, onEnd) {
		var state = {
			id: 0,
			cancelled: false
		};
		function startAnimation$1(state$1, scroll$1, onScroll$1, onEnd$1) {
			if (!state$1 || !state$1.cancelled) {
				onScroll$1(scroll$1);
				var isDone = scroll$1.done();
				if (!isDone) {
					if (!state$1.cancelled) state$1.id = requestAnimationFrame(startAnimation$1.bind(null, state$1, scroll$1, onScroll$1, onEnd$1));
				}
				if (isDone && onEnd$1) onEnd$1(scroll$1);
			}
		}
		function cancel(state$1) {
			if (state$1 && state$1.id) cancelAnimationFrame(state$1.id);
			if (state$1) state$1.cancelled = true;
		}
		startAnimation$1(state, scroll, onScroll, onEnd);
		return {
			cancel: cancel.bind(null, state),
			model: scroll
		};
	}
	var Scroller = class {
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
			if (this._startPosition > 0) this._startPosition /= .5;
			else if (this._startPosition < -this._extent) this._startPosition = (this._startPosition + this._extent) / .5 - this._extent;
			if (this._animation) {
				this._animation.cancel();
				this._scrolling = false;
			}
			this.updatePosition();
		}
		onTouchMove(x, y) {
			var startPosition = this._startPosition;
			if (this._enableX) startPosition += x;
			else if (this._enableY) startPosition += y;
			if (startPosition > 0) startPosition *= .5;
			else if (startPosition < -this._extent) startPosition = .5 * (startPosition + this._extent) - this._extent;
			this._position = startPosition;
			this.updatePosition();
			this.dispatchScroll();
		}
		onTouchEnd(x, y, o$1) {
			if (this._enableSnap && this._position > -this._extent && this._position < 0) {
				if (this._enableY && (Math.abs(y) < this._itemSize && Math.abs(o$1.y) < 300 || Math.abs(o$1.y) < 150)) {
					this.snap();
					return;
				}
				if (this._enableX && (Math.abs(x) < this._itemSize && Math.abs(o$1.x) < 300 || Math.abs(o$1.x) < 150)) {
					this.snap();
					return;
				}
			}
			if (this._enableX) this._scroll.set(this._position, o$1.x);
			else if (this._enableY) this._scroll.set(this._position, o$1.y);
			var c$1;
			if (this._enableSnap) {
				var s = this._scroll._friction.x(100);
				var l = s % this._itemSize;
				c$1 = Math.abs(l) > this._itemSize / 2 ? s - (this._itemSize - Math.abs(l)) : s - l;
				if (c$1 <= 0 && c$1 >= -this._extent) this._scroll.setVelocityByEnd(c$1);
			}
			this._lastTime = Date.now();
			this._lastDelay = 0;
			this._scrolling = true;
			this._lastChangePos = this._position;
			this._lastIdx = calculateSnapIndex(this._position, this._itemSize);
			this._animation = createAnimation(this._scroll, () => {
				var e$1 = Date.now();
				var i$1 = (e$1 - this._scroll._startTime) / 1e3;
				this._position = this._scroll.x(i$1);
				this.updatePosition();
				var o$2 = this._scroll.dx(i$1);
				if (this._shouldDispatchScrollEvent && e$1 - this._lastTime > this._lastDelay) {
					this.dispatchScroll();
					this._lastDelay = Math.abs(2e3 / o$2);
					this._lastTime = e$1;
				}
			}, () => {
				if (this._enableSnap) {
					if (c$1 <= 0 && c$1 >= -this._extent) {
						this._position = c$1;
						this.updatePosition();
					}
					if (isFunction(this._options.onSnap)) this._options.onSnap(calculateSnapIndex(this._position, this._itemSize));
				}
				if (this._shouldDispatchScrollEvent) this.dispatchScroll();
				this._scrolling = false;
			});
		}
		onTransitionEnd() {
			this._element.style.webkitTransition = "";
			this._element.style.transition = "";
			this._element.removeEventListener("transitionend", this._onTransitionEnd);
			if (this._snapping) this._snapping = false;
			this.dispatchScroll();
		}
		snap() {
			var itemSize = this._itemSize;
			var position = this._position % itemSize;
			var i$1 = Math.abs(position) > this._itemSize / 2 ? this._position - (itemSize - Math.abs(position)) : this._position - position;
			if (this._position !== i$1) {
				this._snapping = true;
				this.scrollTo(-i$1);
				if (isFunction(this._options.onSnap)) this._options.onSnap(Math.round(Math.abs(this._position) / this._itemSize));
			}
		}
		scrollTo(position, time) {
			if (this._animation) {
				this._animation.cancel();
				this._scrolling = false;
			}
			if (typeof position === "number") this._position = -position;
			if (this._position < -this._extent) this._position = -this._extent;
			else if (this._position > 0) this._position = 0;
			var transition = "transform " + (time || .2) + "s ease-out";
			this._element.style.webkitTransition = "-webkit-" + transition;
			this._element.style.transition = transition;
			this.updatePosition();
			this._element.addEventListener("transitionend", this._onTransitionEnd);
		}
		dispatchScroll() {
			if (isFunction(this._options.onScroll) && Math.round(Number(this._lastPos)) !== Math.round(this._position)) {
				this._lastPos = this._position;
				var event = { target: {
					scrollLeft: this._enableX ? -this._position : 0,
					scrollTop: this._enableY ? -this._position : 0,
					scrollHeight: this._scrollHeight || this._element.offsetHeight,
					scrollWidth: this._scrollWidth || this._element.offsetWidth,
					offsetHeight: this._element.parentElement.offsetHeight,
					offsetWidth: this._element.parentElement.offsetWidth
				} };
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
			if (typeof height === "number") this._position = -height;
			if (this._position < -extent) this._position = -extent;
			else if (this._position > 0) this._position = 0;
			this._itemSize = itemSize || this._itemSize;
			this.updatePosition();
			if (position !== this._position) {
				this.dispatchScroll();
				if (isFunction(this._options.onSnap)) this._options.onSnap(Math.round(Math.abs(this._position) / this._itemSize));
			}
			this._extent = extent;
			this._scroll._extent = extent;
		}
		updatePosition() {
			var transform = "";
			if (this._enableX) transform = "translateX(" + this._position + "px) translateZ(0)";
			else if (this._enableY) transform = "translateY(" + this._position + "px) translateZ(0)";
			this._element.style.webkitTransform = transform;
			this._element.style.transform = transform;
		}
		isScrolling() {
			return this._scrolling || this._snapping;
		}
	};
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
			if (scroller.onTouchStart) scroller.onTouchStart();
			if (typeof event.cancelable !== "boolean" || event.cancelable) event.preventDefault();
		}
		function handleTouchMove(event) {
			var touchtrackEvent = event;
			var mouseEvent = event;
			if (touchInfo.trackingID !== -1) {
				if (typeof event.cancelable !== "boolean" || event.cancelable) event.preventDefault();
				var delta = findDelta(event);
				if (delta) {
					for (touchInfo.maxDy = Math.max(touchInfo.maxDy, Math.abs(delta.y)), touchInfo.maxDx = Math.max(touchInfo.maxDx, Math.abs(delta.x)), touchInfo.historyX.push(delta.x), touchInfo.historyY.push(delta.y), touchInfo.historyTime.push(touchtrackEvent.detail.timeStamp || mouseEvent.timeStamp); touchInfo.historyTime.length > 10;) {
						touchInfo.historyTime.shift();
						touchInfo.historyX.shift();
						touchInfo.historyY.shift();
					}
					if (touchInfo.listener && touchInfo.listener.onTouchMove) touchInfo.listener.onTouchMove(delta.x, delta.y);
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
					var o$1 = {
						x: 0,
						y: 0
					};
					if (length > 2) for (var i$1 = touchInfo.historyTime.length - 1, time1 = touchInfo.historyTime[i$1], x = touchInfo.historyX[i$1], y = touchInfo.historyY[i$1]; i$1 > 0;) {
						i$1--;
						var time = time1 - touchInfo.historyTime[i$1];
						if (time > 30 && time < 50) {
							o$1.x = (x - touchInfo.historyX[i$1]) / (time / 1e3);
							o$1.y = (y - touchInfo.historyY[i$1]) / (time / 1e3);
							break;
						}
					}
					touchInfo.historyTime = [];
					touchInfo.historyX = [];
					touchInfo.historyY = [];
					if (listener && listener.onTouchEnd) listener.onTouchEnd(delta.x, delta.y, o$1);
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
				[
					"screenX",
					"screenY",
					"clientX",
					"clientY",
					"pageX",
					"pageY"
				].forEach((key$1) => {
					customClick[key$1] = info[key$1];
				});
				event.target.dispatchEvent(customClick);
			}
		});
	}
	var picker_view_column_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "PickerViewColumn",
		setup(props$30, _ref) {
			var { slots, emit: emit$3 } = _ref;
			var rootRef = ref(null);
			var contentRef = ref(null);
			var getPickerViewColumn = inject("getPickerViewColumn");
			var instance = getCurrentInstance();
			var currentRef = getPickerViewColumn ? getPickerViewColumn(instance) : ref(0);
			var pickerViewProps$1 = inject("pickerViewProps");
			var pickerViewState = inject("pickerViewState");
			var indicatorHeight = ref(34);
			var resizeSensorRef = ref(null);
			var initIndicatorHeight = () => {
				indicatorHeight.value = resizeSensorRef.value.$el.getBoundingClientRect().height;
			};
			var maskSize = computed(() => (pickerViewState.height - indicatorHeight.value) / 2);
			var { state: scopedAttrsState } = useScopedAttrs();
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
			watch([
				() => indicatorHeight.value,
				() => state.length,
				() => pickerViewState.height
			], updatesScroller);
			var oldDeltaY = 0;
			function handleWheel(event) {
				var deltaY = oldDeltaY + event.deltaY;
				if (Math.abs(deltaY) > 10) {
					oldDeltaY = 0;
					var current = Math.min(state.current + (deltaY < 0 ? -1 : 1), state.length - 1);
					state.current = current = Math.max(current, 0);
					scroller.scrollTo(current * indicatorHeight.value);
				} else oldDeltaY = deltaY;
				event.preventDefault();
			}
			function handleTap(_ref2) {
				var { clientY } = _ref2;
				var el = rootRef.value;
				if (!scroller.isScrolling()) {
					var r = clientY - el.getBoundingClientRect().top - pickerViewState.height / 2;
					var o$1 = indicatorHeight.value / 2;
					if (!(Math.abs(r) <= o$1)) {
						var a$1 = Math.ceil((Math.abs(r) - o$1) / indicatorHeight.value);
						var s = r < 0 ? -a$1 : a$1;
						var current = Math.min(state.current + s, state.length - 1);
						state.current = current = Math.max(current, 0);
						scroller.scrollTo(current * indicatorHeight.value);
					}
				}
			}
			var initScroller = () => {
				var el = rootRef.value;
				var content = contentRef.value;
				var { scroller: scrollerOrigin, handleTouchStart, handleTouchMove, handleTouchEnd } = useScroller(content, {
					enableY: true,
					enableX: false,
					enableSnap: true,
					itemSize: indicatorHeight.value,
					friction: new Friction(1e-4),
					spring: new Spring(2, 90, 20),
					onSnap: (index$3) => {
						if (!isNaN(index$3) && index$3 !== state.current) state.current = index$3;
					}
				});
				scroller = scrollerOrigin;
				useTouchtrack(el, (e$1) => {
					switch (e$1.detail.state) {
						case "start":
							handleTouchStart(e$1);
							disableScrollBounce({ disable: true });
							break;
						case "move":
							handleTouchMove(e$1);
							e$1.stopPropagation();
							break;
						case "end":
						case "cancel":
							handleTouchEnd(e$1);
							disableScrollBounce({ disable: false });
					}
				}, true);
				useCustomClick(el);
				initScrollBounce();
				updatesScroller();
			};
			var isMounted = false;
			useRebuild(() => {
				contentRef.value && (state.length = contentRef.value.children.length);
				if (!isMounted) {
					isMounted = true;
					initIndicatorHeight();
					initScroller();
				}
			});
			return () => {
				var defaultSlots = slots.default && slots.default();
				var padding = "".concat(maskSize.value, "px 0");
				return createVNode("uni-picker-view-column", { "ref": rootRef }, [createVNode("div", {
					"onWheel": handleWheel,
					"onClick": handleTap,
					"class": "uni-picker-view-group"
				}, [
					createVNode("div", mergeProps(scopedAttrsState.attrs, {
						"class": ["uni-picker-view-mask", pickerViewProps$1.maskClass],
						"style": "background-size: 100% ".concat(maskSize.value, "px;").concat(pickerViewProps$1.maskStyle)
					}), null, 16),
					createVNode("div", mergeProps(scopedAttrsState.attrs, {
						"class": ["uni-picker-view-indicator", pickerViewProps$1.indicatorClass],
						"style": pickerViewProps$1.indicatorStyle
					}), [createVNode(resize_sensor_default, {
						"ref": resizeSensorRef,
						"onResize": (_ref3) => {
							var { height } = _ref3;
							return indicatorHeight.value = height;
						}
					}, null, 8, ["onResize"])], 16),
					createVNode("div", {
						"ref": contentRef,
						"class": ["uni-picker-view-content"],
						"style": {
							padding,
							"--picker-view-column-indicator-height": "".concat(indicatorHeight.value, "px")
						}
					}, [defaultSlots], 4)
				], 40, ["onWheel", "onClick"])], 512);
			};
		}
	});
	var FONT_SIZE = 16;
	var PROGRESS_VALUES = {
		activeColor: PRIMARY_COLOR,
		backgroundColor: "#EBEBEB",
		activeMode: "backwards"
	};
	var progress_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "Progress",
		props: {
			percent: {
				type: [Number, String],
				default: 0,
				validator(value) {
					return !isNaN(parseFloat(value));
				}
			},
			fontSize: {
				type: [String, Number],
				default: FONT_SIZE
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
				default: PROGRESS_VALUES.activeColor
			},
			activeColor: {
				type: String,
				default: PROGRESS_VALUES.activeColor
			},
			backgroundColor: {
				type: String,
				default: PROGRESS_VALUES.backgroundColor
			},
			active: {
				type: [Boolean, String],
				default: false
			},
			activeMode: {
				type: String,
				default: PROGRESS_VALUES.activeMode
			},
			duration: {
				type: [Number, String],
				default: 30,
				validator(value) {
					return !isNaN(parseFloat(value));
				}
			},
			borderRadius: {
				type: [Number, String],
				default: 0
			}
		},
		setup(props$30) {
			var rootRef = ref(null);
			var state = useProgressState(props$30);
			_activeAnimation(state, props$30);
			watch(() => state.realPercent, (newValue, oldValue) => {
				state.strokeTimer && clearInterval(state.strokeTimer);
				state.lastPercent = oldValue || 0;
				_activeAnimation(state, props$30);
			});
			return () => {
				var { showInfo } = props$30;
				var { outerBarStyle, innerBarStyle, currentPercent } = state;
				return createVNode("uni-progress", {
					"class": "uni-progress",
					"ref": rootRef
				}, [createVNode("div", {
					"style": outerBarStyle,
					"class": "uni-progress-bar"
				}, [createVNode("div", {
					"style": innerBarStyle,
					"class": "uni-progress-inner-bar"
				}, null, 4)], 4), showInfo ? createVNode("p", { "class": "uni-progress-info" }, [currentPercent + "%"]) : ""], 512);
			};
		}
	});
	function useProgressState(props$30) {
		var currentPercent = ref(0);
		return reactive({
			outerBarStyle: computed(() => "background-color: ".concat(props$30.backgroundColor, "; height: ").concat(rpx2px(props$30.strokeWidth), "px;")),
			innerBarStyle: computed(() => {
				var backgroundColor = props$30.color !== PROGRESS_VALUES.activeColor && props$30.activeColor === PROGRESS_VALUES.activeColor ? props$30.color : props$30.activeColor;
				return "width: ".concat(currentPercent.value, "%;background-color: ").concat(backgroundColor);
			}),
			realPercent: computed(() => {
				if (typeof props$30.percent === "string" && !/^-?\d*\.?\d*$/.test(props$30.percent)) return 0;
				var realValue = parseFloat(props$30.percent);
				if (Number.isNaN(realValue) || realValue < 0) realValue = 0;
				else if (realValue > 100) realValue = 100;
				return realValue;
			}),
			currentPercent,
			strokeTimer: 0,
			lastPercent: 0
		});
	}
	function _activeAnimation(state, props$30) {
		if (props$30.active) {
			state.currentPercent = props$30.activeMode === PROGRESS_VALUES.activeMode ? 0 : state.lastPercent;
			state.strokeTimer = setInterval(() => {
				if (state.currentPercent + 1 > state.realPercent) {
					state.currentPercent = state.realPercent;
					state.strokeTimer && clearInterval(state.strokeTimer);
				} else state.currentPercent += 1;
			}, parseFloat(props$30.duration));
		} else state.currentPercent = state.realPercent;
	}
	var uniRadioGroupKey = PolySymbol("ucg");
	var radio_group_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "RadioGroup",
		props: { name: {
			type: String,
			default: ""
		} },
		setup(props$30, _ref) {
			var { emit: emit$3, slots } = _ref;
			var rootRef = ref(null);
			useProvideRadioGroup(props$30, useCustomEvent(rootRef, emit$3));
			return () => {
				return createVNode("uni-radio-group", { "ref": rootRef }, [slots.default && slots.default()], 512);
			};
		}
	});
	function useProvideRadioGroup(props$30, trigger$1) {
		var fields$1 = [];
		onMounted(() => {
			_resetRadioGroupValue(fields$1.length - 1);
		});
		var getFieldsValue = () => {
			var _fields$find;
			return (_fields$find = fields$1.find((field) => field.value.radioChecked)) === null || _fields$find === void 0 ? void 0 : _fields$find.value.value;
		};
		provide(uniRadioGroupKey, {
			addField(field) {
				fields$1.push(field);
			},
			removeField(field) {
				fields$1.splice(fields$1.indexOf(field), 1);
			},
			radioChange($event, field) {
				_resetRadioGroupValue(fields$1.indexOf(field), true);
				trigger$1("change", $event, { value: getFieldsValue() });
			}
		});
		var uniForm = inject(uniFormKey, false);
		var formField = { submit: () => {
			var data = ["", null];
			if (props$30.name !== "") {
				data[0] = props$30.name;
				data[1] = getFieldsValue();
			}
			return data;
		} };
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
		function _resetRadioGroupValue(key$1, change) {
			fields$1.forEach((value, index$3) => {
				if (index$3 === key$1) return;
				if (change) setFieldChecked(fields$1[index$3], false);
				else fields$1.forEach((v$1, i$1) => {
					if (index$3 >= i$1) return;
					if (fields$1[i$1].value.radioChecked) setFieldChecked(fields$1[index$3], false);
				});
			});
		}
		return fields$1;
	}
	init_web_dom_iterable();
	var radio_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "Radio",
		props: {
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
			value: {
				type: String,
				default: ""
			},
			color: {
				type: String,
				default: "#007aff"
			},
			backgroundColor: {
				type: String,
				default: ""
			},
			borderColor: {
				type: String,
				default: ""
			},
			activeBackgroundColor: {
				type: String,
				default: ""
			},
			activeBorderColor: {
				type: String,
				default: ""
			},
			iconColor: {
				type: String,
				default: "#ffffff"
			}
		},
		setup(props$30, _ref) {
			var { slots } = _ref;
			var rootRef = ref(null);
			var radioChecked = ref(props$30.checked);
			var radioValue = ref(props$30.value);
			function getRadioStyle(checked) {
				if (props$30.disabled) return {
					backgroundColor: "#E1E1E1",
					borderColor: "#D1D1D1"
				};
				var style = {};
				if (radioChecked.value) {
					style.backgroundColor = props$30.activeBackgroundColor || props$30.color;
					style.borderColor = props$30.activeBorderColor || style.backgroundColor;
				} else {
					if (props$30.borderColor) style.borderColor = props$30.borderColor;
					if (props$30.backgroundColor) style.backgroundColor = props$30.backgroundColor;
				}
				return style;
			}
			var radioStyle = computed(() => {
				return getRadioStyle(radioChecked.value);
			});
			watch([() => props$30.checked, () => props$30.value], (_ref2) => {
				var [newChecked, newModelValue] = _ref2;
				radioChecked.value = newChecked;
				radioValue.value = newModelValue;
			});
			var reset = () => {
				radioChecked.value = false;
			};
			var { uniCheckGroup, uniLabel, field } = useRadioInject(radioChecked, radioValue, reset);
			var _onClick = ($event) => {
				if (props$30.disabled || radioChecked.value) return;
				radioChecked.value = true;
				uniCheckGroup && uniCheckGroup.radioChange($event, field);
				$event.stopPropagation();
			};
			if (!!uniLabel) {
				uniLabel.addHandler(_onClick);
				onBeforeUnmount(() => {
					uniLabel.removeHandler(_onClick);
				});
			}
			useListeners(props$30, { "label-click": _onClick });
			return () => {
				var booleanAttrs = useBooleanAttr(props$30, "disabled");
				var realCheckValue = radioChecked.value;
				return createVNode("uni-radio", mergeProps(booleanAttrs, {
					"id": props$30.id,
					"onClick": _onClick,
					"ref": rootRef
				}), [createVNode("div", {
					"class": "uni-radio-wrapper",
					"style": { "--HOVER-BD-COLOR": !radioChecked.value ? props$30.activeBorderColor : radioStyle.value.borderColor }
				}, [createVNode("div", {
					"class": ["uni-radio-input", { "uni-radio-input-disabled": props$30.disabled }],
					"style": radioStyle.value
				}, [realCheckValue ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props$30.disabled ? "#ADADAD" : props$30.iconColor, 18) : ""], 6), slots.default && slots.default()], 4)], 16, ["id", "onClick"]);
			};
		}
	});
	function useRadioInject(radioChecked, radioValue, reset) {
		var field = computed({
			get: () => ({
				radioChecked: Boolean(radioChecked.value),
				value: radioValue.value
			}),
			set: (_ref3) => {
				var { radioChecked: checked } = _ref3;
				radioChecked.value = checked;
			}
		});
		var formField = { reset };
		var uniCheckGroup = inject(uniRadioGroupKey, false);
		if (!!uniCheckGroup) uniCheckGroup.addField(field);
		var uniForm = inject(uniFormKey, false);
		if (!!uniForm) uniForm.addField(formField);
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
	var TAGS = {
		a: "",
		abbr: "",
		address: "",
		article: "",
		aside: "",
		b: "",
		bdi: "",
		bdo: ["dir"],
		big: "",
		blockquote: "",
		br: "",
		caption: "",
		center: "",
		cite: "",
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
		font: "",
		footer: "",
		h1: "",
		h2: "",
		h3: "",
		h4: "",
		h5: "",
		h6: "",
		header: "",
		hr: "",
		i: "",
		img: [
			"alt",
			"src",
			"height",
			"width"
		],
		ins: "",
		label: "",
		legend: "",
		li: "",
		mark: "",
		nav: "",
		ol: ["start", "type"],
		p: "",
		pre: "",
		q: "",
		rt: "",
		ruby: "",
		s: "",
		section: "",
		small: "",
		span: "",
		strong: "",
		sub: "",
		sup: "",
		table: ["width"],
		tbody: "",
		td: [
			"colspan",
			"height",
			"rowspan",
			"width"
		],
		tfoot: "",
		th: [
			"colspan",
			"height",
			"rowspan",
			"width"
		],
		thead: "",
		tr: [
			"colspan",
			"height",
			"rowspan",
			"width"
		],
		tt: "",
		u: "",
		ul: ""
	};
	var CHARS = {
		amp: "&",
		gt: ">",
		lt: "<",
		nbsp: " ",
		quot: "\"",
		apos: "'",
		ldquo: "“",
		rdquo: "”",
		yen: "￥",
		radic: "√",
		lceil: "⌈",
		rceil: "⌉",
		lfloor: "⌊",
		rfloor: "⌋",
		hellip: "…"
	};
	function decodeEntities(htmlString) {
		return htmlString.replace(/&(([a-zA-Z]+)|(#x{0,1}[\da-zA-Z]+));/gi, function(match, stage) {
			if (hasOwn(CHARS, stage) && CHARS[stage]) return CHARS[stage];
			if (/^#[0-9]{1,4}$/.test(stage)) return String.fromCharCode(stage.slice(1));
			if (/^#x[0-9a-f]{1,4}$/i.test(stage)) return String.fromCharCode(Number("0" + stage.slice(1)));
			return match;
		});
	}
	function processClickEvent(node, triggerItemClick) {
		if (node.name && ["a", "img"].includes(node.name) && triggerItemClick) return { onClickCapture: (e$1) => {
			triggerItemClick(e$1, { node });
			e$1.stopPropagation();
			e$1.preventDefault();
			e$1.returnValue = false;
		} };
	}
	function normalizeValue(tagName, name, value) {
		if (tagName === "img" && name === "src" && isString(value)) return getRealPath(value);
		return value;
	}
	function normalizeAttrs(tagName, attrs$1) {
		if (!isPlainObject(attrs$1)) return;
		var tagAttrs = TAGS[tagName] || [];
		var normalizedAttrs = {};
		Object.keys(attrs$1).forEach((name) => {
			if (name === "class" || name === "style" || tagAttrs.includes(name)) normalizedAttrs[name] = normalizeValue(tagName, name, attrs$1[name]);
		});
		return normalizedAttrs;
	}
	var nodeList2VNode = (scopeId, triggerItemClick, nodeList) => {
		if (!nodeList || Array.isArray(nodeList) && !nodeList.length) return [];
		return nodeList.map((node) => {
			if (!isPlainObject(node)) return;
			if (!hasOwn(node, "type") || node.type === "node") {
				if (!isString(node.name) || !node.name) return;
				var tagName = node.name.toLowerCase();
				if (!hasOwn(TAGS, tagName)) return;
				var nodeProps = extend({ [scopeId]: "" }, processClickEvent(node, triggerItemClick), normalizeAttrs(tagName, node.attrs));
				return h(node.name, nodeProps, nodeList2VNode(scopeId, triggerItemClick, node.children));
			}
			if (node.type === "text" && isString(node.text) && node.text !== "") return createTextVNode(decodeEntities(node.text || ""));
		});
	};
	function removeDOCTYPE(html) {
		return html.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*>\n/, "").replace(/<!DOCTYPE.*>\n/, "");
	}
	function parseAttrs(attrs$1) {
		return attrs$1.reduce(function(pre, attr$1) {
			var value = attr$1.value;
			var name = attr$1.name;
			if (value.match(/ /) && ["style", "src"].indexOf(name) === -1) value = value.split(" ");
			if (pre[name]) if (Array.isArray(pre[name])) pre[name].push(value);
			else pre[name] = [pre[name], value];
			else pre[name] = value;
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
			start: function(tag, attrs$1, unary) {
				var node = { name: tag };
				if (attrs$1.length !== 0) node.attrs = parseAttrs(attrs$1);
				if (unary) {
					var parent = stacks[0] || results;
					if (!parent.children) parent.children = [];
					parent.children.push(node);
				} else stacks.unshift(node);
			},
			end: function(tag) {
				var node = stacks.shift();
				if (node.name !== tag) console.error("invalid state: mismatch end tag");
				if (stacks.length === 0) results.children.push(node);
				else {
					var parent = stacks[0];
					if (!parent.children) parent.children = [];
					parent.children.push(node);
				}
			},
			chars: function(text) {
				var node = {
					type: "text",
					text
				};
				if (stacks.length === 0) results.children.push(node);
				else {
					var parent = stacks[0];
					if (!parent.children) parent.children = [];
					parent.children.push(node);
				}
			},
			comment: function(text) {
				var node = {
					node: "comment",
					text
				};
				var parent = stacks[0];
				if (parent) {
					if (!parent.children) parent.children = [];
					parent.children.push(node);
				}
			}
		});
		return results.children;
	}
	var rich_text_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "RichText",
		compatConfig: { MODE: 3 },
		props: { nodes: {
			type: [Array, String],
			default: function() {
				return [];
			}
		} },
		emits: ["itemclick"],
		setup(props$30, _ref) {
			var { emit: emit$3 } = _ref;
			var vm = getCurrentInstance();
			var scopeId = vm && vm.vnode.scopeId || "";
			var rootRef = ref(null);
			var _vnode = shallowRef([]);
			var trigger$1 = useCustomEvent(rootRef, emit$3);
			function triggerItemClick(e$1) {
				trigger$1("itemclick", e$1, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {});
			}
			function renderVNode() {
				var nodeList = props$30.nodes;
				if (isString(nodeList)) nodeList = parseHtml(props$30.nodes);
				_vnode.value = nodeList2VNode(scopeId, triggerItemClick, nodeList);
			}
			watch(() => props$30.nodes, renderVNode, {
				immediate: true,
				deep: true
			});
			return () => h("uni-rich-text", { ref: rootRef }, h("div", {}, _vnode.value));
		}
	});
	var refresher_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "Refresher",
		props: {
			refreshState: {
				type: String,
				default: ""
			},
			refresherHeight: {
				type: Number,
				default: 0
			},
			refresherThreshold: {
				type: Number,
				default: 45
			},
			refresherDefaultStyle: {
				type: String,
				default: "black"
			},
			refresherBackground: {
				type: String,
				default: "#fff"
			}
		},
		setup(props$30, _ref) {
			var { slots } = _ref;
			var rootRef = ref(null);
			var rootStyle = computed(() => {
				var style = { backgroundColor: props$30.refresherBackground };
				switch (props$30.refreshState) {
					case "pulling":
						style.height = props$30.refresherHeight + "px";
						break;
					case "refreshing":
						style.height = props$30.refresherThreshold + "px";
						style.transition = "height 0.3s";
						break;
					case "":
					case "refresherabort":
					case "restore":
						style.height = "0px";
						style.transition = "height 0.3s";
						break;
					default: break;
				}
				return style;
			});
			var refreshRotate = computed(() => {
				var route = props$30.refresherHeight / props$30.refresherThreshold;
				return (route > 1 ? 1 : route) * 360;
			});
			return () => {
				var { refreshState, refresherDefaultStyle, refresherThreshold } = props$30;
				return createVNode("div", {
					"ref": rootRef,
					"style": rootStyle.value,
					"class": "uni-scroll-view-refresher"
				}, [refresherDefaultStyle !== "none" ? createVNode("div", { "class": "uni-scroll-view-refresh" }, [createVNode("div", { "class": "uni-scroll-view-refresh-inner" }, [refreshState == "pulling" ? createVNode("svg", {
					"key": "refresh__icon",
					"style": { transform: "rotate(" + refreshRotate.value + "deg)" },
					"fill": "#2BD009",
					"class": "uni-scroll-view-refresh__icon",
					"width": "24",
					"height": "24",
					"viewBox": "0 0 24 24"
				}, [createVNode("path", { "d": "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" }, null), createVNode("path", {
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
				}, null)]) : null])]) : null, refresherDefaultStyle === "none" ? createVNode("div", {
					"class": "uni-scroll-view-refresher-container",
					"style": { height: "".concat(refresherThreshold, "px") }
				}, [slots.default && slots.default()], 4) : null], 4);
			};
		}
	});
	var passiveOptions = /* @__PURE__ */ passive(true);
	var scroll_view_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "ScrollView",
		compatConfig: { MODE: 3 },
		props: {
			direction: {
				type: [String],
				default: "vertical"
			},
			scrollX: {
				type: [Boolean, String],
				default: false
			},
			scrollY: {
				type: [Boolean, String],
				default: false
			},
			showScrollbar: {
				type: [Boolean, String],
				default: true
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
				default: "black"
			},
			refresherBackground: {
				type: String,
				default: "#fff"
			},
			refresherTriggered: {
				type: [Boolean, String],
				default: false
			}
		},
		emits: [
			"scroll",
			"scrolltoupper",
			"scrolltolower",
			"refresherrefresh",
			"refresherrestore",
			"refresherpulling",
			"refresherabort",
			"update:refresherTriggered"
		],
		setup(props$30, _ref) {
			var { emit: emit$3, slots, expose } = _ref;
			var rootRef = ref(null);
			var main = ref(null);
			var wrap = ref(null);
			var content = ref(null);
			var trigger$1 = useCustomEvent(rootRef, emit$3);
			var { state, scrollTopNumber, scrollLeftNumber } = useScrollViewState(props$30);
			var { realScrollX, realScrollY, _scrollLeftChanged, _scrollTopChanged } = useScrollViewLoader(props$30, state, scrollTopNumber, scrollLeftNumber, trigger$1, rootRef, main, content, emit$3);
			var mainStyle = computed(() => {
				var style = "";
				realScrollX.value ? style += "overflow-x:auto;" : style += "overflow-x:hidden;";
				realScrollY.value ? style += "overflow-y:auto;" : style += "overflow-y:hidden;";
				return style;
			});
			var scrollBarClassName = computed(() => {
				var className = "uni-scroll-view";
				if (props$30.showScrollbar === false) className += " uni-scroll-view-scrollbar-hidden";
				return className;
			});
			expose({ $getMain() {
				return main.value;
			} });
			return () => {
				var { refresherEnabled, refresherBackground, refresherDefaultStyle, refresherThreshold } = props$30;
				var { refresherHeight, refreshState } = state;
				return createVNode("uni-scroll-view", { "ref": rootRef }, [createVNode("div", {
					"ref": wrap,
					"class": "uni-scroll-view"
				}, [createVNode("div", {
					"ref": main,
					"style": mainStyle.value,
					"class": scrollBarClassName.value
				}, [refresherEnabled ? createVNode(refresher_default, {
					"refreshState": refreshState,
					"refresherHeight": refresherHeight,
					"refresherThreshold": refresherThreshold,
					"refresherDefaultStyle": refresherDefaultStyle,
					"refresherBackground": refresherBackground
				}, { default: () => [refresherDefaultStyle == "none" ? slots.refresher && slots.refresher() : null] }, 8, [
					"refreshState",
					"refresherHeight",
					"refresherThreshold",
					"refresherDefaultStyle",
					"refresherBackground"
				]) : null, createVNode("div", {
					"ref": content,
					"class": "uni-scroll-view-content"
				}, [slots.default && slots.default()], 512)], 6)], 512)], 512);
			};
		}
	});
	function useScrollViewState(props$30) {
		var scrollTopNumber = computed(() => {
			return Number(props$30.scrollTop) || 0;
		});
		var scrollLeftNumber = computed(() => {
			return Number(props$30.scrollLeft) || 0;
		});
		return {
			state: reactive({
				lastScrollTop: scrollTopNumber.value,
				lastScrollLeft: scrollLeftNumber.value,
				lastScrollToUpperTime: 0,
				lastScrollToLowerTime: 0,
				refresherHeight: 0,
				refreshState: ""
			}),
			scrollTopNumber,
			scrollLeftNumber
		};
	}
	function useScrollViewLoader(props$30, state, scrollTopNumber, scrollLeftNumber, trigger$1, rootRef, main, content, emit$3) {
		var _innerSetScrollTop = false;
		var _innerSetScrollLeft = false;
		var beforeRefreshing = false;
		var toUpperNumber = 0;
		var triggerAbort = false;
		var __transitionEnd = () => {};
		var realScrollX = computed(() => {
			return props$30.scrollX;
		});
		var realScrollY = computed(() => {
			return props$30.scrollY;
		});
		var upperThresholdNumber = computed(() => {
			var val = Number(props$30.upperThreshold);
			return isNaN(val) ? 50 : val;
		});
		var lowerThresholdNumber = computed(() => {
			var val = Number(props$30.lowerThreshold);
			return isNaN(val) ? 50 : val;
		});
		function scrollTo$1(scrollToValue, direction) {
			var container = main.value;
			var transformValue = 0;
			var transform = "";
			scrollToValue < 0 ? scrollToValue = 0 : direction === "x" && scrollToValue > container.scrollWidth - container.offsetWidth ? scrollToValue = container.scrollWidth - container.offsetWidth : direction === "y" && scrollToValue > container.scrollHeight - container.offsetHeight && (scrollToValue = container.scrollHeight - container.offsetHeight);
			direction === "x" ? transformValue = container.scrollLeft - scrollToValue : direction === "y" && (transformValue = container.scrollTop - scrollToValue);
			if (transformValue === 0) return;
			var _content = content.value;
			_content.style.transition = "transform .3s ease-out";
			_content.style.webkitTransition = "-webkit-transform .3s ease-out";
			if (direction === "x") transform = "translateX(" + transformValue + "px) translateZ(0)";
			else direction === "y" && (transform = "translateY(" + transformValue + "px) translateZ(0)");
			_content.removeEventListener("transitionend", __transitionEnd);
			_content.removeEventListener("webkitTransitionEnd", __transitionEnd);
			__transitionEnd = () => _transitionEnd(scrollToValue, direction);
			_content.addEventListener("transitionend", __transitionEnd);
			_content.addEventListener("webkitTransitionEnd", __transitionEnd);
			if (direction === "x") container.style.overflowX = "hidden";
			else if (direction === "y") container.style.overflowY = "hidden";
			_content.style.transform = transform;
			_content.style.webkitTransform = transform;
		}
		function _handleScroll($event) {
			var target = $event.target;
			trigger$1("scroll", $event, {
				scrollLeft: target.scrollLeft,
				scrollTop: target.scrollTop,
				scrollHeight: target.scrollHeight,
				scrollWidth: target.scrollWidth,
				deltaX: state.lastScrollLeft - target.scrollLeft,
				deltaY: state.lastScrollTop - target.scrollTop
			});
			if (realScrollY.value) {
				if (target.scrollTop <= upperThresholdNumber.value && state.lastScrollTop - target.scrollTop > 0 && $event.timeStamp - state.lastScrollToUpperTime > 200) {
					trigger$1("scrolltoupper", $event, { direction: "top" });
					state.lastScrollToUpperTime = $event.timeStamp;
				}
				if (target.scrollTop + target.offsetHeight + lowerThresholdNumber.value >= target.scrollHeight && state.lastScrollTop - target.scrollTop < 0 && $event.timeStamp - state.lastScrollToLowerTime > 200) {
					trigger$1("scrolltolower", $event, { direction: "bottom" });
					state.lastScrollToLowerTime = $event.timeStamp;
				}
			}
			if (realScrollX.value) {
				if (target.scrollLeft <= upperThresholdNumber.value && state.lastScrollLeft - target.scrollLeft > 0 && $event.timeStamp - state.lastScrollToUpperTime > 200) {
					trigger$1("scrolltoupper", $event, { direction: "left" });
					state.lastScrollToUpperTime = $event.timeStamp;
				}
				if (target.scrollLeft + target.offsetWidth + lowerThresholdNumber.value >= target.scrollWidth && state.lastScrollLeft - target.scrollLeft < 0 && $event.timeStamp - state.lastScrollToLowerTime > 200) {
					trigger$1("scrolltolower", $event, { direction: "right" });
					state.lastScrollToLowerTime = $event.timeStamp;
				}
			}
			state.lastScrollTop = target.scrollTop;
			state.lastScrollLeft = target.scrollLeft;
		}
		function _scrollTopChanged(val) {
			if (realScrollY.value) if (_innerSetScrollTop) _innerSetScrollTop = false;
			else if (props$30.scrollWithAnimation) scrollTo$1(val, "y");
			else main.value.scrollTop = val;
		}
		function _scrollLeftChanged(val) {
			if (realScrollX.value) if (_innerSetScrollLeft) _innerSetScrollLeft = false;
			else if (props$30.scrollWithAnimation) scrollTo$1(val, "x");
			else main.value.scrollLeft = val;
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
					if (realScrollX.value) {
						var left = elRect.left - mainRect.left;
						var x = main.value.scrollLeft + left;
						if (props$30.scrollWithAnimation) scrollTo$1(x, "x");
						else main.value.scrollLeft = x;
					}
					if (realScrollY.value) {
						var top = elRect.top - mainRect.top;
						var y = main.value.scrollTop + top;
						if (props$30.scrollWithAnimation) scrollTo$1(y, "y");
						else main.value.scrollTop = y;
					}
				}
			}
		}
		function _transitionEnd(val, direction) {
			content.value.style.transition = "";
			content.value.style.webkitTransition = "";
			content.value.style.transform = "";
			content.value.style.webkitTransform = "";
			var _main = main.value;
			if (direction === "x") {
				_main.style.overflowX = realScrollX.value ? "auto" : "hidden";
				_main.scrollLeft = val;
			} else if (direction === "y") {
				_main.style.overflowY = realScrollY.value ? "auto" : "hidden";
				_main.scrollTop = val;
			}
			content.value.removeEventListener("transitionend", __transitionEnd);
			content.value.removeEventListener("webkitTransitionEnd", __transitionEnd);
		}
		function _setRefreshState(_state) {
			if (!props$30.refresherEnabled) return;
			switch (_state) {
				case "refreshing":
					state.refresherHeight = props$30.refresherThreshold;
					if (!beforeRefreshing) {
						beforeRefreshing = true;
						trigger$1("refresherpulling", {}, {
							deltaY: state.refresherHeight,
							dy: state.refresherHeight
						});
						trigger$1("refresherrefresh", {}, { dy: touchEnd.y - touchStart.y });
						emit$3("update:refresherTriggered", true);
					}
					break;
				case "restore":
				case "refresherabort":
					beforeRefreshing = false;
					state.refresherHeight = toUpperNumber = 0;
					if (_state === "restore") {
						triggerAbort = false;
						trigger$1("refresherrestore", {}, { dy: touchEnd.y - touchStart.y });
					}
					if (_state === "refresherabort" && triggerAbort) {
						triggerAbort = false;
						trigger$1("refresherabort", {}, { dy: touchEnd.y - touchStart.y });
					}
					break;
			}
			state.refreshState = _state;
		}
		var touchStart = {
			x: 0,
			y: 0
		};
		var touchEnd = {
			x: 0,
			y: props$30.refresherThreshold
		};
		onMounted(() => {
			nextTick(() => {
				_scrollTopChanged(scrollTopNumber.value);
				_scrollLeftChanged(scrollLeftNumber.value);
			});
			_scrollIntoViewChanged(props$30.scrollIntoView);
			var __handleScroll = function(event) {
				event.preventDefault();
				event.stopPropagation();
				_handleScroll(event);
			};
			var needStop = null;
			var __handleTouchMove = function(event) {
				if (touchStart === null) return;
				var x = event.touches[0].pageX;
				var y = event.touches[0].pageY;
				var _main = main.value;
				if (Math.abs(x - touchStart.x) > Math.abs(y - touchStart.y)) if (realScrollX.value) {
					if (_main.scrollLeft === 0 && x > touchStart.x) {
						needStop = false;
						return;
					} else if (_main.scrollWidth === _main.offsetWidth + _main.scrollLeft && x < touchStart.x) {
						needStop = false;
						return;
					}
					needStop = true;
				} else needStop = false;
				else if (realScrollY.value) if (_main.scrollTop === 0 && y > touchStart.y) {
					needStop = false;
					if (props$30.refresherEnabled && event.cancelable !== false) event.preventDefault();
				} else if (_main.scrollHeight === _main.offsetHeight + _main.scrollTop && y < touchStart.y) {
					needStop = false;
					return;
				} else needStop = true;
				else needStop = false;
				if (needStop) event.stopPropagation();
				if (_main.scrollTop === 0 && event.touches.length === 1) _setRefreshState("pulling");
				if (props$30.refresherEnabled && state.refreshState === "pulling") {
					var dy = y - touchStart.y;
					if (toUpperNumber === 0) toUpperNumber = y;
					if (!beforeRefreshing) {
						state.refresherHeight = y - toUpperNumber;
						if (state.refresherHeight > 0) {
							triggerAbort = true;
							trigger$1("refresherpulling", event, {
								deltaY: dy,
								dy
							});
						}
					} else {
						state.refresherHeight = dy + props$30.refresherThreshold;
						triggerAbort = false;
					}
				}
			};
			var __handleTouchStart = function(event) {
				if (event.touches.length === 1) {
					disableScrollBounce({ disable: true });
					touchStart = {
						x: event.touches[0].pageX,
						y: event.touches[0].pageY
					};
				}
			};
			var __handleTouchEnd = function(event) {
				touchEnd = {
					x: event.changedTouches[0].pageX,
					y: event.changedTouches[0].pageY
				};
				disableScrollBounce({ disable: false });
				if (state.refresherHeight >= props$30.refresherThreshold) _setRefreshState("refreshing");
				else _setRefreshState("refresherabort");
				touchStart = {
					x: 0,
					y: 0
				};
				touchEnd = {
					x: 0,
					y: props$30.refresherThreshold
				};
			};
			main.value.addEventListener("touchstart", __handleTouchStart, passiveOptions);
			main.value.addEventListener("touchmove", __handleTouchMove, passive(false));
			main.value.addEventListener("scroll", __handleScroll, passive(false));
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
			realScrollY.value && (main.value.scrollTop = state.lastScrollTop);
			realScrollX.value && (main.value.scrollLeft = state.lastScrollLeft);
		});
		watch(scrollTopNumber, (val) => {
			_scrollTopChanged(val);
		});
		watch(scrollLeftNumber, (val) => {
			_scrollLeftChanged(val);
		});
		watch(() => props$30.scrollIntoView, (val) => {
			_scrollIntoViewChanged(val);
		});
		watch(() => props$30.refresherTriggered, (val) => {
			if (val === true) _setRefreshState("refreshing");
			else if (val === false) _setRefreshState("restore");
		});
		return {
			realScrollX,
			realScrollY,
			_scrollTopChanged,
			_scrollLeftChanged
		};
	}
	var slider_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "Slider",
		props: {
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
		},
		emits: ["changing", "change"],
		setup(props$30, _ref) {
			var { emit: emit$3 } = _ref;
			var sliderRef = ref(null);
			var sliderValueRef = ref(null);
			var sliderHandleRef = ref(null);
			var sliderValue = ref(Number(props$30.value));
			if (sliderValue.value < Number(props$30.min)) sliderValue.value = Number(props$30.min);
			if (sliderValue.value > Number(props$30.max)) sliderValue.value = Number(props$30.max);
			watch(() => props$30.value, (val) => {
				sliderValue.value = Number(val);
			});
			var trigger$1 = useCustomEvent(sliderRef, emit$3);
			var state = useSliderState(props$30, sliderValue);
			var { _onClick, _onTrack } = useSliderLoader(props$30, sliderValue, sliderRef, sliderValueRef, trigger$1);
			onMounted(() => {
				useTouchtrack(sliderHandleRef.value, _onTrack);
			});
			return () => {
				var { setBgColor, setBlockBg, setActiveColor, setBlockStyle } = state;
				return createVNode("uni-slider", {
					"ref": sliderRef,
					"onClick": withWebEvent(_onClick)
				}, [createVNode("div", { "class": "uni-slider-wrapper" }, [createVNode("div", { "class": "uni-slider-tap-area" }, [createVNode("div", {
					"style": setBgColor.value,
					"class": "uni-slider-handle-wrapper"
				}, [
					createVNode("div", {
						"ref": sliderHandleRef,
						"style": setBlockBg.value,
						"class": "uni-slider-handle"
					}, null, 4),
					createVNode("div", {
						"style": setBlockStyle.value,
						"class": "uni-slider-thumb"
					}, null, 4),
					createVNode("div", {
						"style": setActiveColor.value,
						"class": "uni-slider-track"
					}, null, 4)
				], 4)]), withDirectives(createVNode("span", {
					"ref": sliderValueRef,
					"class": "uni-slider-value"
				}, [sliderValue.value], 512), [[vShow, props$30.showValue]])])], 8, ["onClick"]);
			};
		}
	});
	var getValueWidth = (value, min$2, max$1) => {
		max$1 = Number(max$1);
		min$2 = Number(min$2);
		return 100 * (value - min$2) / (max$1 - min$2) + "%";
	};
	function useSliderState(props$30, sliderValue) {
		var _getValueWidth = () => {
			return getValueWidth(sliderValue.value, props$30.min, props$30.max);
		};
		var _getBgColor = () => {
			return props$30.backgroundColor !== "#e9e9e9" ? props$30.backgroundColor : props$30.color !== "#007aff" ? props$30.color : "#007aff";
		};
		var _getActiveColor = () => {
			return props$30.activeColor !== "#007aff" ? props$30.activeColor : props$30.selectedColor !== "#e9e9e9" ? props$30.selectedColor : "#e9e9e9";
		};
		return {
			setBgColor: computed(() => ({ backgroundColor: _getBgColor() })),
			setBlockBg: computed(() => ({ left: _getValueWidth() })),
			setActiveColor: computed(() => ({
				backgroundColor: _getActiveColor(),
				width: _getValueWidth()
			})),
			setBlockStyle: computed(() => ({
				width: props$30.blockSize + "px",
				height: props$30.blockSize + "px",
				marginLeft: -props$30.blockSize / 2 + "px",
				marginTop: -props$30.blockSize / 2 + "px",
				left: _getValueWidth(),
				backgroundColor: props$30.blockColor
			}))
		};
	}
	function useSliderLoader(props$30, sliderValue, sliderRef, sliderValueRef, trigger$1) {
		var truthStep = computed(() => {
			var step$1 = Number(props$30.step);
			if (isNaN(step$1)) return 1;
			return step$1;
		});
		var _onClick = ($event) => {
			if (props$30.disabled) return;
			_onUserChangedValue($event);
			trigger$1("change", $event, { value: sliderValue.value });
		};
		var _filterValue = (min$2, step$1, value) => {
			return Math.round((value - min$2) / step$1) * step$1 + min$2;
		};
		var _onUserChangedValue = (e$1) => {
			var max$1 = Number(props$30.max);
			var min$2 = Number(props$30.min);
			var sliderRightBox = sliderValueRef.value;
			var sliderRightBoxLeft = getComputedStyle(sliderRightBox, null).marginLeft;
			var sliderRightBoxWidth = sliderRightBox.offsetWidth;
			sliderRightBoxWidth = sliderRightBoxWidth + parseInt(sliderRightBoxLeft);
			var slider = sliderRef.value;
			var offsetWidth = slider.offsetWidth - (props$30.showValue ? sliderRightBoxWidth : 0);
			var boxLeft = slider.getBoundingClientRect().left;
			var proportion = (e$1.x - boxLeft) / offsetWidth;
			var stepDecimal = (truthStep.value + "").split(".")[1];
			sliderValue.value = parseFloat(_filterValue(min$2, truthStep.value, lerp(min$2, max$1, proportion)).toFixed(stepDecimal ? stepDecimal.length : 0));
		};
		var _onTrack = (e$1) => {
			if (!props$30.disabled) return e$1.detail.state === "move" ? (_onUserChangedValue({ x: e$1.detail.x }), trigger$1("changing", e$1, { value: sliderValue.value }), !1) : e$1.detail.state === "end" && trigger$1("change", e$1, { value: sliderValue.value });
		};
		var uniForm = inject(uniFormKey, false);
		if (!!uniForm) {
			var field = {
				reset: () => sliderValue.value = Number(props$30.min),
				submit: () => {
					var data = ["", null];
					if (props$30.name !== "") {
						data[0] = props$30.name;
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
	function lerp(min$2, max$1, t$1) {
		t$1 = Math.min(1, Math.max(0, t$1));
		return min$2 * (1 - t$1) + max$1 * t$1;
	}
	var props$17 = {
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
		},
		navigation: {
			type: [Boolean, String],
			default: false
		},
		navigationColor: {
			type: String,
			default: "#fff"
		},
		navigationActiveColor: {
			type: String,
			default: "rgba(53, 53, 53, 0.6)"
		}
	};
	function useState$2(props$30) {
		return reactive({
			interval: computed(() => {
				var interval = Number(props$30.interval);
				return isNaN(interval) ? 5e3 : interval;
			}),
			duration: computed(() => {
				var duration = Number(props$30.duration);
				return isNaN(duration) ? 500 : duration;
			}),
			displayMultipleItems: computed(() => {
				var displayMultipleItems = Math.round(props$30.displayMultipleItems);
				return isNaN(displayMultipleItems) ? 1 : displayMultipleItems;
			}),
			current: Math.round(props$30.current) || 0,
			currentItemId: props$30.currentItemId,
			userTracking: false
		});
	}
	function useLayout(props$30, state, swiperContexts, slideFrameRef, emit$3, trigger$1) {
		var _ws$getStyle;
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
		var swiperEnabled = computed(() => swiperContexts.value.length > state.displayMultipleItems);
		var circularEnabled = computed(() => props$30.circular && swiperEnabled.value);
		function checkCircularLayout(index$3) {
			if (!invalid) for (var items = swiperContexts.value, n = items.length, i$1 = index$3 + state.displayMultipleItems, r = 0; r < n; r++) {
				var item = items[r];
				var s = Math.floor(index$3 / n) * n + r;
				var l = s + n;
				var c$1 = s - n;
				var u = Math.max(index$3 - (s + 1), s - i$1, 0);
				var d = Math.max(index$3 - (l + 1), l - i$1, 0);
				var h$1 = Math.max(index$3 - (c$1 + 1), c$1 - i$1, 0);
				var p$2 = Math.min(u, d, h$1);
				var position = [
					s,
					l,
					c$1
				][[
					u,
					d,
					h$1
				].indexOf(p$2)];
				item.updatePosition(position, props$30.vertical);
			}
		}
		function updateViewport(index$3) {
			if (!(Math.floor(2 * viewportPosition) === Math.floor(2 * index$3) && Math.ceil(2 * viewportPosition) === Math.ceil(2 * index$3))) {
				if (circularEnabled.value) checkCircularLayout(index$3);
			}
			var x = props$30.vertical ? "0" : 100 * -index$3 * viewportMoveRatio + "%";
			var y = props$30.vertical ? 100 * -index$3 * viewportMoveRatio + "%" : "0";
			var transform = "translate(" + x + ", " + y + ") translateZ(0)";
			var slideFrame = slideFrameRef.value;
			if (slideFrame) {
				slideFrame.style.webkitTransform = transform;
				slideFrame.style.transform = transform;
			}
			viewportPosition = index$3;
			if (!transitionStart) {
				if (index$3 % 1 === 0) return;
				transitionStart = index$3;
			}
			index$3 -= Math.floor(transitionStart);
			var items = swiperContexts.value;
			if (index$3 <= -(items.length - 1)) index$3 += items.length;
			else if (index$3 >= items.length) index$3 -= items.length;
			index$3 = transitionStart % 1 > .5 || transitionStart < 0 ? index$3 - 1 : index$3;
			trigger$1("transition", {}, {
				dx: props$30.vertical ? 0 : index$3 * slideFrame.offsetWidth,
				dy: props$30.vertical ? index$3 * slideFrame.offsetHeight : 0
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
			if (!length) return -1;
			var index$3 = (Math.round(current) % length + length) % length;
			if (circularEnabled.value) {
				if (length <= state.displayMultipleItems) return 0;
			} else if (index$3 > length - state.displayMultipleItems) return length - state.displayMultipleItems;
			return index$3;
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
					trigger$1("animationfinish", {}, {
						current: state.current,
						currentItemId,
						source
					});
				}
				return;
			}
			updateViewport(toPos + acc * time * time / 2);
			animationFrame = requestAnimationFrame(animateFrameFuncProto);
		}
		function animateViewport(current, source, n) {
			cancelViewportAnimation();
			var duration = state.duration;
			var length = swiperContexts.value.length;
			var position = viewportPosition;
			if (circularEnabled.value) if (n < 0) {
				for (; position < current;) position += length;
				for (; position - length > current;) position -= length;
			} else if (n > 0) {
				for (; position > current;) position -= length;
				for (; position + length < current;) position += length;
				if (position + length - current < current - position) position += length;
			} else {
				for (; position + length < current;) position += length;
				for (; position - length > current;) position -= length;
				if (position + length - current < current - position) position += length;
			}
			else if (source === "click") current = current + state.displayMultipleItems - 1 < length ? current : 0;
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
				if (circularEnabled.value) state.current = normalizeCurrentValue(state.current + 1);
				else state.current = state.current + state.displayMultipleItems < items.length ? state.current + 1 : 0;
				animateViewport(state.current, "autoplay", circularEnabled.value ? 1 : 0);
				timer = setTimeout(callback, state.interval);
			};
			if (!(invalid || items.length <= state.displayMultipleItems)) timer = setTimeout(callback, state.interval);
		}
		function resetLayout() {
			cancelSchedule();
			endViewportAnimation();
			var items = swiperContexts.value;
			for (var i$1 = 0; i$1 < items.length; i$1++) items[i$1].updatePosition(i$1, props$30.vertical);
			viewportMoveRatio = 1;
			var slideFrameEl = slideFrameRef.value;
			if (state.displayMultipleItems === 1 && items.length) {
				var itemRect = items[0].getBoundingClientRect();
				var slideFrameRect = slideFrameEl.getBoundingClientRect();
				viewportMoveRatio = itemRect.width / slideFrameRect.width;
				if (!(viewportMoveRatio > 0 && viewportMoveRatio < 1)) viewportMoveRatio = 1;
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
					if (props$30.autoplay) scheduleAutoplay();
				}
			} else {
				invalid = true;
				updateViewport(-state.displayMultipleItems - 1);
			}
		}
		watch([
			() => props$30.current,
			() => props$30.currentItemId,
			() => [...swiperContexts.value]
		], () => {
			var current = -1;
			if (props$30.currentItemId) {
				for (var i$1 = 0, items = swiperContexts.value; i$1 < items.length; i$1++) if (items[i$1].getItemId() === props$30.currentItemId) {
					current = i$1;
					break;
				}
			}
			if (current < 0) current = Math.round(props$30.current) || 0;
			current = current < 0 ? 0 : current;
			if (state.current !== current) {
				currentChangeSource = "";
				state.current = current;
			}
		});
		watch([
			() => props$30.vertical,
			() => circularEnabled.value,
			() => state.displayMultipleItems,
			() => [...swiperContexts.value]
		], resetLayout);
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
				trigger$1("change", {}, {
					current: state.current,
					currentItemId,
					source
				});
			}
		}
		watch(() => state.current, (val, oldVal) => {
			currentChanged(val, oldVal);
			emit$3("update:current", val);
		});
		watch(() => state.currentItemId, (val) => {
			emit$3("update:currentItemId", val);
		});
		function inintAutoplay(enable) {
			if (enable) scheduleAutoplay();
			else cancelSchedule();
		}
		watch(() => props$30.autoplay && !state.userTracking, inintAutoplay);
		inintAutoplay(props$30.autoplay && !state.userTracking);
		var debouncedTrackEndFallback = null;
		var TRACK_END_FALLBACK_DELAY = 1e3;
		var isIOS$1 = false;
		var ws = plus.webview.currentWebview();
		var style = ws && ((_ws$getStyle = ws.getStyle()) === null || _ws$getStyle === void 0 || (_ws$getStyle = _ws$getStyle.pullToRefresh) === null || _ws$getStyle === void 0 ? void 0 : _ws$getStyle.style);
		onMounted(() => {
			var userDirectionChecked = false;
			var contentTrackSpeed = 0;
			var contentTrackT = 0;
			function handleTrackStart() {
				var _debouncedTrackEndFal;
				cancelSchedule();
				(_debouncedTrackEndFal = debouncedTrackEndFallback) === null || _debouncedTrackEndFal === void 0 || _debouncedTrackEndFal.cancel();
				contentTrackViewport = viewportPosition;
				contentTrackSpeed = 0;
				contentTrackT = Date.now();
				cancelViewportAnimation();
			}
			function handleTrackMove(data) {
				var oldContentTrackT = contentTrackT;
				contentTrackT = Date.now();
				var other = swiperContexts.value.length - state.displayMultipleItems;
				function calc$1(val) {
					return .5 - .25 / (val + .5);
				}
				function move(oldVal, newVal) {
					var val = contentTrackViewport + oldVal;
					contentTrackSpeed = .6 * contentTrackSpeed + .4 * newVal;
					if (!circularEnabled.value) {
						if (val < 0 || val > other) {
							if (val < 0) val = -calc$1(-val);
							else if (val > other) val = other + calc$1(val - other);
							contentTrackSpeed = 0;
						}
					}
					updateViewport(val);
				}
				var time = contentTrackT - oldContentTrackT || 1;
				var slideFrameEl = slideFrameRef.value;
				if (props$30.vertical) move(-data.dy / slideFrameEl.offsetHeight, -data.ddy / time);
				else move(-data.dx / slideFrameEl.offsetWidth, -data.ddx / time);
			}
			function handleTrackEnd(isCancel) {
				var _debouncedTrackEndFal2;
				(_debouncedTrackEndFal2 = debouncedTrackEndFallback) === null || _debouncedTrackEndFal2 === void 0 || _debouncedTrackEndFal2.cancel();
				state.userTracking = false;
				var t$1 = contentTrackSpeed / Math.abs(contentTrackSpeed);
				var n = 0;
				if (!isCancel && Math.abs(contentTrackSpeed) > .2) n = .5 * t$1;
				var current = normalizeCurrentValue(viewportPosition + n);
				if (isCancel) animateViewport(state.current, "", 0);
				else {
					currentChangeSource = "touch";
					state.current = current;
					animateViewport(current, "touch", n !== 0 ? n : current === 0 && circularEnabled.value && viewportPosition >= 1 ? 1 : 0);
				}
			}
			useTouchtrack(slideFrameRef.value, (event) => {
				if (props$30.disableTouch) return;
				if (!invalid) {
					if (event.detail.state === "start") {
						state.userTracking = true;
						userDirectionChecked = false;
						return handleTrackStart();
					}
					if (event.detail.state === "end") return handleTrackEnd(false);
					if (event.detail.state === "cancel") return handleTrackEnd(true);
					if (state.userTracking) {
						if (!userDirectionChecked) {
							userDirectionChecked = true;
							var t$1 = Math.abs(event.detail.dx);
							var n = Math.abs(event.detail.dy);
							if (t$1 >= n && props$30.vertical) state.userTracking = false;
							else if (t$1 <= n && !props$30.vertical) state.userTracking = false;
							if (!state.userTracking) {
								if (props$30.autoplay) scheduleAutoplay();
								return;
							}
						}
						handleTrackMove(event.detail);
						if (isIOS$1 && style === "circle") {
							if (!debouncedTrackEndFallback) debouncedTrackEndFallback = debounce(() => {
								if (state.userTracking) handleTrackEnd(true);
							}, TRACK_END_FALLBACK_DELAY, {
								setTimeout,
								clearTimeout
							});
							debouncedTrackEndFallback();
						}
						return false;
					}
				}
			}, true);
		});
		onUnmounted(() => {
			cancelSchedule();
			cancelAnimationFrame(animationFrame);
		});
		function onSwiperDotClick(index$3) {
			animateViewport(state.current = index$3, currentChangeSource = "click", circularEnabled.value ? 1 : 0);
		}
		return {
			onSwiperDotClick,
			circularEnabled,
			swiperEnabled
		};
	}
	var swiper_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "Swiper",
		props: props$17,
		emits: [
			"change",
			"transition",
			"animationfinish",
			"update:current",
			"update:currentItemId"
		],
		setup(props$30, _ref) {
			var { slots, emit: emit$3 } = _ref;
			var rootRef = ref(null);
			var trigger$1 = useCustomEvent(rootRef, emit$3);
			var slidesWrapperRef = ref(null);
			var slideFrameRef = ref(null);
			var state = useState$2(props$30);
			var slidesStyle = computed(() => {
				var style = {};
				if (props$30.nextMargin || props$30.previousMargin) style = props$30.vertical ? {
					left: 0,
					right: 0,
					top: rpx2px(props$30.previousMargin, true),
					bottom: rpx2px(props$30.nextMargin, true)
				} : {
					top: 0,
					bottom: 0,
					left: rpx2px(props$30.previousMargin, true),
					right: rpx2px(props$30.nextMargin, true)
				};
				return style;
			});
			var slideFrameStyle = computed(() => {
				var value = Math.abs(100 / state.displayMultipleItems) + "%";
				return {
					width: props$30.vertical ? "100%" : value,
					height: !props$30.vertical ? "100%" : value
				};
			});
			var swiperItems = [];
			var originSwiperContexts = [];
			var swiperContexts = ref([]);
			function updateSwiperContexts() {
				var contexts = [];
				var _loop = function(index$4) {
					var swiperItem = swiperItems[index$4];
					if (!(swiperItem instanceof Element)) swiperItem = swiperItem.el;
					var swiperContext = originSwiperContexts.find((context) => swiperItem === context.rootRef.value);
					if (swiperContext) contexts.push(markRaw(swiperContext));
				};
				for (var index$3 = 0; index$3 < swiperItems.length; index$3++) _loop(index$3);
				swiperContexts.value = contexts;
			}
			useRebuild(() => {
				if (slideFrameRef.value && slideFrameRef.value.children) swiperItems = slideFrameRef.value.children;
				updateSwiperContexts();
			});
			var addSwiperContext = function(swiperContext) {
				originSwiperContexts.push(swiperContext);
				updateSwiperContexts();
			};
			provide("addSwiperContext", addSwiperContext);
			var removeSwiperContext = function(swiperContext) {
				var index$3 = originSwiperContexts.indexOf(swiperContext);
				if (index$3 >= 0) {
					originSwiperContexts.splice(index$3, 1);
					updateSwiperContexts();
				}
			};
			provide("removeSwiperContext", removeSwiperContext);
			var { onSwiperDotClick, circularEnabled, swiperEnabled } = useLayout(props$30, state, swiperContexts, slideFrameRef, emit$3, trigger$1);
			var createNavigationTsx = () => null;
			return () => {
				var defaultSlots = slots.default && slots.default();
				return createVNode("uni-swiper", { "ref": rootRef }, [createVNode("div", {
					"ref": slidesWrapperRef,
					"class": "uni-swiper-wrapper"
				}, [
					createVNode("div", {
						"class": "uni-swiper-slides",
						"style": slidesStyle.value
					}, [createVNode("div", {
						"ref": slideFrameRef,
						"class": "uni-swiper-slide-frame",
						"style": slideFrameStyle.value
					}, [defaultSlots], 4)], 4),
					props$30.indicatorDots && createVNode("div", { "class": ["uni-swiper-dots", props$30.vertical ? "uni-swiper-dots-vertical" : "uni-swiper-dots-horizontal"] }, [swiperContexts.value.map((_, index$3, array) => createVNode("div", {
						"onClick": () => onSwiperDotClick(index$3),
						"class": {
							"uni-swiper-dot": true,
							"uni-swiper-dot-active": index$3 < state.current + state.displayMultipleItems && index$3 >= state.current || index$3 < state.current + state.displayMultipleItems - array.length
						},
						"style": { background: index$3 === state.current ? props$30.indicatorActiveColor : props$30.indicatorColor }
					}, null, 14, ["onClick"]))], 2),
					createNavigationTsx()
				], 512)], 512);
			};
		}
	});
	var swiper_item_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "SwiperItem",
		props: { itemId: {
			type: String,
			default: ""
		} },
		setup(props$30, _ref) {
			var { slots } = _ref;
			var rootRef = ref(null);
			var context = {
				rootRef,
				getItemId() {
					return props$30.itemId;
				},
				getBoundingClientRect() {
					return rootRef.value.getBoundingClientRect();
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
				if (addSwiperContext) addSwiperContext(context);
			});
			onUnmounted(() => {
				var removeSwiperContext = inject("removeSwiperContext");
				if (removeSwiperContext) removeSwiperContext(context);
			});
			return () => {
				return createVNode("uni-swiper-item", {
					"ref": rootRef,
					"style": {
						position: "absolute",
						width: "100%",
						height: "100%"
					}
				}, [slots.default && slots.default()], 512);
			};
		}
	});
	var switch_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "Switch",
		props: {
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
				default: ""
			}
		},
		emits: ["change"],
		setup(props$30, _ref) {
			var { emit: emit$3 } = _ref;
			var rootRef = ref(null);
			var switchChecked = ref(props$30.checked);
			var uniLabel = useSwitchInject(props$30, switchChecked);
			var trigger$1 = useCustomEvent(rootRef, emit$3);
			watch(() => props$30.checked, (val) => {
				switchChecked.value = val;
			});
			var _onClick = ($event) => {
				if (props$30.disabled) return;
				switchChecked.value = !switchChecked.value;
				trigger$1("change", $event, { value: switchChecked.value });
			};
			if (!!uniLabel) {
				uniLabel.addHandler(_onClick);
				onBeforeUnmount(() => {
					uniLabel.removeHandler(_onClick);
				});
			}
			useListeners(props$30, { "label-click": _onClick });
			return () => {
				var { color, type } = props$30;
				var booleanAttrs = useBooleanAttr(props$30, "disabled");
				var switchInputStyle = {};
				if (color && switchChecked.value) {
					switchInputStyle["backgroundColor"] = color;
					switchInputStyle["borderColor"] = color;
				}
				var realCheckValue = switchChecked.value;
				return createVNode("uni-switch", mergeProps({
					"id": props$30.id,
					"ref": rootRef
				}, booleanAttrs, { "onClick": _onClick }), [createVNode("div", { "class": "uni-switch-wrapper" }, [withDirectives(createVNode("div", {
					"class": ["uni-switch-input", [switchChecked.value ? "uni-switch-input-checked" : ""]],
					"style": switchInputStyle
				}, null, 6), [[vShow, type === "switch"]]), withDirectives(createVNode("div", { "class": "uni-checkbox-input" }, [realCheckValue ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props$30.color, 22) : ""], 512), [[vShow, type === "checkbox"]])])], 16, ["id", "onClick"]);
			};
		}
	});
	function useSwitchInject(props$30, switchChecked) {
		var uniForm = inject(uniFormKey, false);
		var uniLabel = inject(uniLabelKey, false);
		var formField = {
			submit: () => {
				var data = ["", null];
				if (props$30.name) {
					data[0] = props$30.name;
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
	init_web_dom_iterable();
	var SPACE_UNICODE = {
		ensp: " ",
		emsp: " ",
		nbsp: "\xA0"
	};
	function normalizeText(text, _ref) {
		var { space, decode } = _ref;
		var result = "";
		var isEscape = false;
		for (var char of text) {
			if (space && SPACE_UNICODE[space] && char === " ") char = SPACE_UNICODE[space];
			if (isEscape) {
				if (char === "n") result += "\n";
				else if (char === "\\") result += "\\";
				else result += "\\" + char;
				isEscape = false;
			} else if (char === "\\") isEscape = true;
			else result += char;
		}
		if (!decode) return result;
		return result.replace(/&nbsp;/g, SPACE_UNICODE.nbsp).replace(/&ensp;/g, SPACE_UNICODE.ensp).replace(/&emsp;/g, SPACE_UNICODE.emsp).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&apos;/g, "'");
	}
	function parseText(text, options) {
		return normalizeText(text, options).split("\n");
	}
	function _OverloadYield(e$1, d) {
		this.v = e$1, this.k = d;
	}
	function asyncGeneratorStep(n, t$1, e$1, r, o$1, a$1, c$1) {
		try {
			var i$1 = n[a$1](c$1), u = i$1.value;
		} catch (n$1) {
			e$1(n$1);
			return;
		}
		i$1.done ? t$1(u) : Promise.resolve(u).then(r, o$1);
	}
	function _asyncToGenerator(n) {
		return function() {
			var t$1 = this, e$1 = arguments;
			return new Promise(function(r, o$1) {
				var a$1 = n.apply(t$1, e$1);
				function _next(n$1) {
					asyncGeneratorStep(a$1, r, o$1, _next, _throw, "next", n$1);
				}
				function _throw(n$1) {
					asyncGeneratorStep(a$1, r, o$1, _next, _throw, "throw", n$1);
				}
				_next(void 0);
			});
		};
	}
	function _defineProperty(e$1, r, t$1) {
		return (r = _toPropertyKey(r)) in e$1 ? Object.defineProperty(e$1, r, {
			value: t$1,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e$1[r] = t$1, e$1;
	}
	function ownKeys(e$1, r) {
		var t$1 = Object.keys(e$1);
		if (Object.getOwnPropertySymbols) {
			var o$1 = Object.getOwnPropertySymbols(e$1);
			r && (o$1 = o$1.filter(function(r$1) {
				return Object.getOwnPropertyDescriptor(e$1, r$1).enumerable;
			})), t$1.push.apply(t$1, o$1);
		}
		return t$1;
	}
	function _objectSpread2(e$1) {
		for (var r = 1; r < arguments.length; r++) {
			var t$1 = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t$1), !0).forEach(function(r$1) {
				_defineProperty(e$1, r$1, t$1[r$1]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e$1, Object.getOwnPropertyDescriptors(t$1)) : ownKeys(Object(t$1)).forEach(function(r$1) {
				Object.defineProperty(e$1, r$1, Object.getOwnPropertyDescriptor(t$1, r$1));
			});
		}
		return e$1;
	}
	function _toPrimitive(t$1, r) {
		if ("object" != typeof t$1 || !t$1) return t$1;
		var e$1 = t$1[Symbol.toPrimitive];
		if (void 0 !== e$1) {
			var i$1 = e$1.call(t$1, r || "default");
			if ("object" != typeof i$1) return i$1;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t$1);
	}
	function _toPropertyKey(t$1) {
		var i$1 = _toPrimitive(t$1, "string");
		return "symbol" == typeof i$1 ? i$1 : i$1 + "";
	}
	function AsyncGenerator(e$1) {
		var r, t$1;
		function resume(r$1, t$2) {
			try {
				var n = e$1[r$1](t$2), o$1 = n.value, u = o$1 instanceof _OverloadYield;
				Promise.resolve(u ? o$1.v : o$1).then(function(t$3) {
					if (u) {
						var i$1 = "return" === r$1 ? "return" : "next";
						if (!o$1.k || t$3.done) return resume(i$1, t$3);
						t$3 = e$1[i$1](t$3).value;
					}
					settle(n.done ? "return" : "normal", t$3);
				}, function(e$2) {
					resume("throw", e$2);
				});
			} catch (e$2) {
				settle("throw", e$2);
			}
		}
		function settle(e$2, n) {
			switch (e$2) {
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
			(r = r.next) ? resume(r.key, r.arg) : t$1 = null;
		}
		this._invoke = function(e$2, n) {
			return new Promise(function(o$1, u) {
				var i$1 = {
					key: e$2,
					arg: n,
					resolve: o$1,
					reject: u,
					next: null
				};
				t$1 ? t$1 = t$1.next = i$1 : (r = t$1 = i$1, resume(e$2, n));
			});
		}, "function" != typeof e$1.return && (this.return = void 0);
	}
	AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
		return this;
	}, AsyncGenerator.prototype.next = function(e$1) {
		return this._invoke("next", e$1);
	}, AsyncGenerator.prototype.throw = function(e$1) {
		return this._invoke("throw", e$1);
	}, AsyncGenerator.prototype.return = function(e$1) {
		return this._invoke("return", e$1);
	};
	var props$14 = /* @__PURE__ */ extend({}, props$13, {
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
			default: "return",
			validator(val) {
				return ConfirmTypes.concat("return").includes(val);
			}
		}
	});
	var fixMargin = false;
	var ConfirmTypes = [
		"done",
		"go",
		"next",
		"search",
		"send"
	];
	function setFixMargin() {
		var DARK_TEST_STRING = "(prefers-color-scheme: dark)";
		fixMargin = String(navigator.platform).indexOf("iP") === 0 && String(navigator.vendor).indexOf("Apple") === 0 && window.matchMedia(DARK_TEST_STRING).media !== DARK_TEST_STRING;
	}
	var textarea_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "Textarea",
		props: props$14,
		emits: [
			"confirm",
			"change",
			"linechange",
			...emit
		],
		setup(props$30, _ref) {
			var { emit: emit$3, expose } = _ref;
			var rootRef = ref(null);
			var wrapperRef = ref(null);
			var { fieldRef, state, scopedAttrsState, fixDisabledColor, trigger: trigger$1 } = useField(props$30, rootRef, emit$3);
			var valueCompute = computed(() => state.value.split("\n"));
			var isDone = computed(() => ConfirmTypes.includes(props$30.confirmType));
			var heightRef = ref(0);
			var lineRef = ref(null);
			watch(() => heightRef.value, (height) => {
				var el = rootRef.value;
				var lineEl = lineRef.value;
				var wrapper$1 = wrapperRef.value;
				var lineHeight = parseFloat(getComputedStyle(el).lineHeight);
				if (isNaN(lineHeight)) lineHeight = lineEl.offsetHeight;
				var lineCount = Math.round(height / lineHeight);
				trigger$1("linechange", {}, {
					height,
					heightRpx: 750 / window.innerWidth * height,
					lineCount
				});
				if (props$30.autoHeight) wrapper$1.style.height = height + "px";
			});
			function onResize(_ref2) {
				var { height } = _ref2;
				heightRef.value = height;
			}
			function onChange$1(event) {}
			function confirm(event) {
				trigger$1("confirm", event, { value: state.value });
			}
			function onKeyDownEnter(event) {
				if (event.key !== "Enter") return;
				if (isDone.value) event.preventDefault();
			}
			function onKeyUpEnter(event) {
				if (event.key !== "Enter") return;
				if (isDone.value) {
					confirm(event);
					var textarea = event.target;
					!props$30.confirmHold && textarea.blur();
				}
			}
			setFixMargin();
			expose({ $triggerInput: (detail) => {
				emit$3("update:modelValue", detail.value);
				emit$3("update:value", detail.value);
				state.value = detail.value;
			} });
			return () => {
				var textareaNode = props$30.disabled && fixDisabledColor ? createVNode("textarea", {
					"key": "disabled-textarea",
					"ref": fieldRef,
					"value": state.value,
					"tabindex": "-1",
					"readonly": !!props$30.disabled,
					"maxlength": state.maxlength,
					"class": {
						"uni-textarea-textarea": true,
						"uni-textarea-textarea-fix-margin": fixMargin
					},
					"style": _objectSpread2({ overflowY: props$30.autoHeight ? "hidden" : "auto" }, props$30.cursorColor && { caretColor: props$30.cursorColor }),
					"onFocus": (event) => event.target.blur()
				}, null, 46, [
					"value",
					"readonly",
					"maxlength",
					"onFocus"
				]) : createVNode("textarea", {
					"key": "textarea",
					"ref": fieldRef,
					"value": state.value,
					"disabled": !!props$30.disabled,
					"maxlength": state.maxlength,
					"enterkeyhint": props$30.confirmType,
					"inputmode": props$30.inputmode,
					"class": {
						"uni-textarea-textarea": true,
						"uni-textarea-textarea-fix-margin": fixMargin
					},
					"style": _objectSpread2({ overflowY: props$30.autoHeight ? "hidden" : "auto" }, props$30.cursorColor && { caretColor: props$30.cursorColor }),
					"onKeydown": onKeyDownEnter,
					"onKeyup": onKeyUpEnter,
					"onChange": onChange$1
				}, null, 46, [
					"value",
					"disabled",
					"maxlength",
					"enterkeyhint",
					"inputmode",
					"onKeydown",
					"onKeyup",
					"onChange"
				]);
				return createVNode("uni-textarea", {
					"ref": rootRef,
					"auto-height": props$30.autoHeight
				}, [createVNode("div", {
					"ref": wrapperRef,
					"class": "uni-textarea-wrapper"
				}, [
					withDirectives(createVNode("div", mergeProps(scopedAttrsState.attrs, {
						"style": props$30.placeholderStyle,
						"class": ["uni-textarea-placeholder", props$30.placeholderClass]
					}), [props$30.placeholder], 16), [[vShow, !state.value.length]]),
					createVNode("div", {
						"ref": lineRef,
						"class": "uni-textarea-line"
					}, [" "], 512),
					createVNode("div", { "class": {
						"uni-textarea-compute": true,
						"uni-textarea-compute-auto-height": props$30.autoHeight
					} }, [valueCompute.value.map((item) => createVNode("div", null, [item.trim() ? item : "."])), createVNode(resize_sensor_default, {
						"initial": true,
						"onResize": onResize
					}, null, 8, ["initial", "onResize"])], 2),
					props$30.confirmType === "search" ? createVNode("form", {
						"action": "",
						"onSubmit": () => false,
						"class": "uni-input-form"
					}, [textareaNode], 40, ["onSubmit"]) : textareaNode
				], 512)], 8, ["auto-height"]);
			};
		}
	});
	function normalizeEvent(vm, id$1) {
		if (!id$1) id$1 = vm.id;
		if (!id$1) return;
		return vm.$options.name.toLowerCase() + "." + id$1;
	}
	function addSubscribe(name, callback, pageId) {
		if (!name) return;
		registerViewMethod(pageId || getCurrentPageId(), name, (_ref, resolve) => {
			var { type, data } = _ref;
			callback(type, data, resolve);
		});
	}
	function removeSubscribe(name, pageId) {
		if (!name) return;
		unregisterViewMethod(pageId || getCurrentPageId(), name);
	}
	function useSubscribe(callback, name, multiple, pageId) {
		var vm = getCurrentInstance().proxy;
		pageId = pageId == null ? useCurrentPageId() : pageId;
		onMounted(() => {
			addSubscribe(name || normalizeEvent(vm), callback, pageId);
			if (multiple || !name) watch(() => vm.id, (value, oldValue) => {
				addSubscribe(normalizeEvent(vm, value), callback, pageId);
				removeSubscribe(oldValue && normalizeEvent(vm, oldValue));
			});
		});
		onBeforeUnmount(() => {
			removeSubscribe(name || normalizeEvent(vm), pageId);
		});
	}
	var index$2 = 0;
	function useContextInfo(_id) {
		var page = useCurrentPageId();
		var vm = getCurrentInstance().proxy;
		var type = vm.$options.name.toLowerCase();
		var id$1 = _id || vm.id || "context".concat(index$2++);
		onMounted(() => {
			var el = vm.$el;
			el.__uniContextInfo = {
				id: id$1,
				type,
				page
			};
		});
		return "".concat(type, ".").concat(id$1);
	}
	function getContextInfo(el) {
		return el.__uniContextInfo;
	}
	var UniTextNode = class extends UniNode {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "#text", parentNodeId, document.createTextNode(""));
			this._text = "";
			this.init(nodeJson);
			this.insert(parentNodeId, refNodeId);
		}
		init(nodeJson) {
			var isCreate = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
			this._text = nodeJson.t || "";
			if (isCreate) this.update();
		}
		setText(text) {
			this._text = text;
			this.update();
			this.updateView();
		}
		update() {
			var { space, decode } = this.$parent && this.$parent.$props || {};
			this.$.textContent = parseText(this._text, {
				space,
				decode
			}).join("\n");
		}
	};
	var UniComment = class extends UniNode {
		constructor(id$1, parentNodeId, refNodeId) {
			super(id$1, "#comment", parentNodeId, document.createComment(""));
			this.insert(parentNodeId, refNodeId);
		}
	};
	var UniAnimationElement = class extends UniElement {
		constructor(id$1, element, parentNodeId, refNodeId, nodeJson) {
			var propNames = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [];
			super(id$1, element, parentNodeId, refNodeId, nodeJson, [...animation_default.props, ...propNames]);
		}
		call(fn) {
			var context = {
				animation: this.$props.animation,
				$el: this.$
			};
			fn.call(context);
		}
		setAttribute(name, value) {
			if (name === "animation") this.$animate = true;
			return super.setAttribute(name, value);
		}
		update() {
			var isMounted = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
			if (!this.$animate) return;
			if (isMounted) return this.call(animation_default.mounted);
			if (this.$animate) {
				this.$animate = false;
				this.call(animation_default.watch.animation.handler);
			}
		}
	};
	var PROP_NAMES_HOVER$1 = [
		"hover-class",
		"hover-stop-propagation",
		"hover-start-time",
		"hover-stay-time"
	];
	var UniHoverElement = class extends UniAnimationElement {
		constructor(id$1, element, parentNodeId, refNodeId, nodeJson) {
			var propNames = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [];
			super(id$1, element, parentNodeId, refNodeId, nodeJson, [...PROP_NAMES_HOVER$1, ...propNames]);
		}
		update() {
			var isMounted = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
			var hoverClass = this.$props["hover-class"];
			if (hoverClass && hoverClass !== "none") {
				if (!this._hover) this._hover = new Hover(this.$, this.$props);
				this._hover.addEvent();
			} else if (this._hover) this._hover.removeEvent();
			super.update(isMounted);
		}
	};
	var Hover = class {
		constructor($$1, props$30) {
			this._listening = false;
			this._hovering = false;
			this._hoverTouch = false;
			this.$ = $$1;
			this.props = props$30;
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
			if (hovering) this.$.classList.add.apply(ClassList, hoverClass);
			else this.$.classList.remove.apply(ClassList, hoverClass);
		}
		addEvent() {
			if (this._listening) return;
			this._listening = true;
			this.$.addEventListener("touchstart", this.__hoverTouchStart);
			this.$.addEventListener("touchend", this.__hoverTouchEnd);
			this.$.addEventListener("touchcancel", this.__hoverTouchCancel);
		}
		removeEvent() {
			if (!this._listening) return;
			this._listening = false;
			this.$.removeEventListener("touchstart", this.__hoverTouchStart);
			this.$.removeEventListener("touchend", this.__hoverTouchEnd);
			this.$.removeEventListener("touchcancel", this.__hoverTouchCancel);
		}
		_hoverTouchStart(evt) {
			if (evt._hoverPropagationStopped) return;
			var hoverClass = this.props["hover-class"];
			if (!hoverClass || hoverClass === "none" || this.$.disabled) return;
			if (evt.touches.length > 1) return;
			if (this.props["hover-stop-propagation"]) evt._hoverPropagationStopped = true;
			this._hoverTouch = true;
			this._hoverStartTimer = setTimeout(() => {
				this.hovering = true;
				if (!this._hoverTouch) this._hoverReset();
			}, this.props["hover-start-time"]);
		}
		_hoverTouchEnd() {
			this._hoverTouch = false;
			if (this.hovering) this._hoverReset();
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
	};
	var UniViewElement = class extends UniHoverElement {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, document.createElement("uni-view"), parentNodeId, refNodeId, nodeJson);
		}
	};
	function createWrapper(component, props$30) {
		return () => h(component, props$30);
	}
	var UniComponent = class extends UniNode {
		constructor(id$1, tag, component, parentNodeId, refNodeId, nodeJson, selector) {
			super(id$1, tag, parentNodeId);
			var container = document.createElement("div");
			container.__vueParent = getVueParent(this);
			this.$props = reactive({});
			this.init(nodeJson);
			this.$app = createApp(createWrapper(component, this.$props));
			this.$app.mount(container);
			this.$ = container.firstElementChild;
			this.$.__id = id$1;
			if (selector) this.$holder = this.$.querySelector(selector);
			if (hasOwn(nodeJson, "t")) this.setText(nodeJson.t || "");
			if (nodeJson.a && hasOwn(nodeJson.a, ".vShow")) patchVShow(this.$, nodeJson.a[ATTR_V_SHOW]);
			this.insert(parentNodeId, refNodeId);
			flushPostFlushCbs();
		}
		init(nodeJson) {
			arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
			var { a: a$1, e: e$1, w } = nodeJson;
			if (a$1) {
				this.setWxsProps(a$1);
				Object.keys(a$1).forEach((n) => {
					this.setAttr(n, a$1[n]);
				});
			}
			if (hasOwn(nodeJson, "s")) this.setAttr("style", nodeJson.s);
			if (e$1) Object.keys(e$1).forEach((n) => {
				this.addEvent(n, e$1[n]);
			});
			if (w) this.addWxsEvents(nodeJson.w);
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
			if (name === ".vShow") {
				if (this.$) patchVShow(this.$, value);
			} else if (name === ".vOwnerId") this.$.__ownerId = value;
			else if (name === ".vRenderjs") queuePostActionJob(() => initRenderjs(this, value), 3);
			else if (name === "style") {
				var newStyle = decodeAttr(value, this.$ || $(this.pid).$);
				var oldStyle = this.$props.style;
				if (isPlainObject(newStyle) && isPlainObject(oldStyle)) Object.keys(newStyle).forEach((n) => {
					oldStyle[n] = newStyle[n];
				});
				else this.$props.style = newStyle;
			} else if (isCssVar(name)) this.$.style.setProperty(name, normalizeStyleValue$1(value));
			else {
				value = decodeAttr(value, this.$ || $(this.pid).$);
				if (!this.wxsPropsInvoke(name, value, true)) this.$props[name] = value;
			}
			this.updateView();
		}
		removeAttr(name) {
			if (isCssVar(name)) this.$.style.removeProperty(name);
			else this.$props[name] = null;
			this.updateView();
		}
		remove() {
			this.removeUniParent();
			this.isUnmounted = true;
			this.$app.unmount();
			removeElement(this.id);
			this.removeUniChildren();
			flushPostFlushCbs();
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
	};
	var UniContainerComponent = class extends UniComponent {
		constructor(id$1, tag, component, parentNodeId, refNodeId, nodeJson, selector) {
			super(id$1, tag, component, parentNodeId, refNodeId, nodeJson, selector);
		}
		getRebuildFn() {
			if (!this._rebuild) this._rebuild = this.rebuild.bind(this);
			return this._rebuild;
		}
		setText(text) {
			queuePostActionJob(this.getRebuildFn(), 2);
			return super.setText(text);
		}
		appendChild(node) {
			queuePostActionJob(this.getRebuildFn(), 2);
			return super.appendChild(node);
		}
		insertBefore(newChild, refChild) {
			queuePostActionJob(this.getRebuildFn(), 2);
			return super.insertBefore(newChild, refChild);
		}
		removeUniChild(node) {
			queuePostActionJob(this.getRebuildFn(), 2);
			return super.removeUniChild(node);
		}
		rebuild() {
			var vm = this.$.__vueParentComponent;
			if (vm.rebuild) vm.rebuild();
		}
	};
	function getVueParent(node) {
		while (node && node.pid > 0) {
			node = $(node.pid);
			if (node) {
				var { __vueParentComponent } = node.$;
				if (__vueParentComponent) return __vueParentComponent;
			}
		}
		return null;
	}
	function setHolderText(holder, clazz, text) {
		holder.childNodes.forEach((childNode) => {
			if (childNode instanceof Element) {
				if (childNode.className.indexOf(clazz) === -1) holder.removeChild(childNode);
			} else holder.removeChild(childNode);
		});
		holder.appendChild(document.createTextNode(text));
	}
	var vModelNames = ["value", "modelValue"];
	function initVModel(props$30) {
		vModelNames.forEach((name) => {
			if (hasOwn(props$30, name)) {
				var event = "onUpdate:" + name;
				if (!hasOwn(props$30, event)) props$30[event] = (v$1) => props$30[name] = v$1;
			}
		});
	}
	var UniButton = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-button", button_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var UniImage = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-image", image_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var PROP_NAMES_HOVER = ["space", "decode"];
	var UniTextElement = class extends UniAnimationElement {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, document.createElement("uni-text"), parentNodeId, refNodeId, nodeJson, PROP_NAMES_HOVER);
			this._text = "";
		}
		init(nodeJson) {
			this._text = nodeJson.t || "";
			super.init(nodeJson);
		}
		setText(text) {
			this._text = text;
			this.update();
			this.updateView();
		}
		update() {
			var isMounted = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
			var { $props: { space, decode } } = this;
			this.$.textContent = parseText(this._text, {
				space,
				decode
			}).join("\n");
			super.update(isMounted);
		}
	};
	var UniNavigator = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-navigator", navigator_default, parentNodeId, refNodeId, nodeJson, "uni-navigator");
		}
	};
	var UniRichText = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-rich-text", rich_text_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var UniProgress = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-progress", progress_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var UniLabel = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-label", label_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var UniCheckboxGroup = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-checkbox-group", checkbox_group_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var UniCheckbox = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-checkbox", checkbox_default, parentNodeId, refNodeId, nodeJson, ".uni-checkbox-wrapper");
		}
		setText(text) {
			setHolderText(this.$holder, "uni-checkbox-input", text);
		}
	};
	var UniRadio = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-radio", radio_default, parentNodeId, refNodeId, nodeJson, ".uni-radio-wrapper");
		}
		setText(text) {
			setHolderText(this.$holder, "uni-radio-input", text);
		}
	};
	var UniRadioGroup = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-radio-group", radio_group_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var UniSlider = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-slider", slider_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var UniSwitch = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-switch", switch_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var UniInput = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-input", input_default, parentNodeId, refNodeId, nodeJson);
		}
		init(nodeJson) {
			super.init(nodeJson);
			initVModel(this.$props);
		}
	};
	var UniTextarea = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-textarea", textarea_default, parentNodeId, refNodeId, nodeJson);
		}
		init(nodeJson) {
			super.init(nodeJson);
			initVModel(this.$props);
		}
	};
	var UniForm = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-form", form_default, parentNodeId, refNodeId, nodeJson, "span");
		}
	};
	var UniEditor = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-editor", editor_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var UniPickerView = class extends UniContainerComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-picker-view", picker_view_default, parentNodeId, refNodeId, nodeJson, ".uni-picker-view-wrapper");
		}
	};
	var UniPickerViewColumn = class extends UniContainerComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-picker-view-column", picker_view_column_default, parentNodeId, refNodeId, nodeJson, ".uni-picker-view-content");
		}
	};
	var UniScrollView = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-scroll-view", scroll_view_default, parentNodeId, refNodeId, nodeJson, ".uni-scroll-view-content");
		}
		setText(text) {
			setHolderText(this.$holder, "uni-scroll-view-refresher", text);
		}
	};
	var UniSwiper = class extends UniContainerComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-swiper", swiper_default, parentNodeId, refNodeId, nodeJson, ".uni-swiper-slide-frame");
		}
	};
	var UniSwiperItem = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-swiper-item", swiper_item_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var UniMovableArea = class extends UniContainerComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-movable-area", movable_area_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var UniMovableView = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-movable-view", movable_view_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var UniIcon = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-icon", icon_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var plus_default = {
		webview: {
			currentWebview() {
				return extend({
					getStyle: () => {
						return extend({}, invokeHarmonyChannel("getStyle"));
					},
					setSoftinputTemporary(options) {
						invokeHarmonyChannel("setSoftinputTemporary", [options]);
					},
					setPullToRefresh(options) {
						invokeHarmonyChannel("setPullToRefresh", [options]);
					},
					setStyle(options) {
						invokeHarmonyChannel("setStyle", [options]);
					}
				}, invokeHarmonyChannel("currentWebview"));
			},
			postMessageToUniNView(data, id$1) {
				invokeHarmonyChannel("postMessageToUniNView", [data, id$1]);
			}
		},
		io: { convertLocalFileSystemURL(filepath) {
			return invokeHarmonyChannel("convertLocalFileSystemURL", [filepath]);
		} },
		key: {
			hideSoftKeybord() {
				invokeHarmonyChannel("hideSoftKeybord");
			},
			showSoftKeybord() {
				invokeHarmonyChannel("showSoftKeybord");
			}
		}
	};
	var props$12 = {
		tag: {
			type: String,
			default: ""
		},
		options: {
			type: Object,
			default() {
				return {};
			}
		},
		methods: {
			type: Array,
			default() {
				return [];
			}
		}
	};
	var index$1 = 0;
	var embed_default = /* @__PURE__ */ defineBuiltInComponent({
		props: props$12,
		setup(props$30, _ref) {
			var { expose, attrs: attrs$1 } = _ref;
			var elId = String(index$1++);
			var elRef = ref(null);
			var visibility = ref(0);
			var intersectionObserver = new IntersectionObserver((entries$1) => {
				visibility.value = entries$1[0].intersectionRatio > 0 ? 0 : 2;
			});
			onMounted(() => {
				intersectionObserver.observe(elRef.value);
			});
			onBeforeUnmount(() => {
				intersectionObserver.disconnect();
			});
			var src = computed(() => {
				var on = [];
				var options = Object.assign({}, props$30.options, {
					on,
					visibility: visibility.value
				});
				Object.keys(attrs$1).forEach((key$1) => {
					if (/^on[A-Z]/.test(key$1)) on.push(key$1.slice(2).toLowerCase());
				});
				return "".concat(elId, "#").concat(encodeURIComponent(JSON.stringify(options)));
			});
			var srcValue = src.value;
			watch(src, (srcValue$1) => {
				invokeHarmonyChannel("onNativeEmbedLifecycleChange", [srcValue$1]);
			});
			var exposed = { elId };
			props$30.methods.forEach((method) => {
				exposed[method] = function() {
					for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
					return invokeHarmonyChannel("invokeNativeEmbed", [
						elId,
						method,
						args
					]);
				};
			});
			expose(exposed);
			return () => createVNode("embed", mergeProps({
				"ref": elRef,
				"el-id": elId,
				"type": "native/".concat(props$30.tag),
				"src": srcValue
			}, attrs$1), null, 16, [
				"el-id",
				"type",
				"src"
			]);
		}
	});
	var HarmonyNativeMethodMap = {
		evalJS: "runJavaScript",
		back: "backward",
		forward: "forward",
		reload: "refresh",
		stop: "stop",
		canBack: "accessBackward",
		canForward: "accessForward",
		loadData: "loadData",
		getContentHeight: "getPageHeight",
		clear: "removeCache",
		loadUrl: "loadUrl"
	};
	function useMethods(embedRef) {
		var MethodList = [
			"evalJS",
			"back",
			"forward",
			"reload",
			"stop",
			"canBack",
			"canForward",
			"loadData",
			"getContentHeight",
			"clear",
			"loadUrl"
		];
		var methods = {};
		var _loop = function(i$2) {
			var methodName = MethodList[i$2];
			methods[methodName] = function(data, resolve) {
				var embed = embedRef.value;
				switch (methodName) {
					case "evalJS": return resolve(embed["runJavaScript"]((data || {}).jsCode || ""));
					case "loadUrl":
						resolve(embed[HarmonyNativeMethodMap[methodName]](data.url, data.headers));
						break;
					case "loadData":
						var _data$encoding;
						var _data = data.data;
						if (((_data$encoding = data.encoding) === null || _data$encoding === void 0 ? void 0 : _data$encoding.toLowerCase()) !== "base64") _data = _data.replace(/#/g, "%23");
						resolve(embed[HarmonyNativeMethodMap[methodName]](_data, data.mimeType, data.encoding, data.baseUrl));
						break;
					case "clear":
						resolve(embed[HarmonyNativeMethodMap[methodName]](data.clearRom));
						break;
					default:
						resolve(embed[HarmonyNativeMethodMap[methodName]]());
						break;
				}
			};
		};
		for (var i$1 = 0; i$1 < MethodList.length; i$1++) _loop(i$1);
		function _handleSubscribe(type, data, resolve) {
			var method = methods[type];
			if (type.indexOf("_") !== 0 && isFunction(method)) method(data, resolve);
		}
		return extend(methods, { _handleSubscribe });
	}
	var web_view_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "WebView",
		props: {
			id: {
				type: String,
				default: ""
			},
			src: {
				type: String,
				default: ""
			},
			updateTitle: {
				type: Boolean,
				default: true
			},
			fullscreen: {
				type: Boolean,
				default: true
			},
			webviewStyles: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		setup(props$30) {
			var embedRef = ref(null);
			var pageId = getCurrentPageId();
			var { _handleSubscribe } = useMethods(embedRef);
			useSubscribe(_handleSubscribe, useContextInfo(props$30.id), true);
			onMounted(() => {
				UniViewJSBridge.publishHandler(WEBVIEW_INSERTED, {}, pageId);
			});
			onBeforeUnmount(() => {
				UniViewJSBridge.publishHandler(WEBVIEW_REMOVED, {}, pageId);
			});
			return () => createVNode("uni-web-view", {
				"id": props$30.id,
				"class": props$30.fullscreen ? "uni-webview--fullscreen" : ""
			}, [createVNode(embed_default, {
				"ref": embedRef,
				"tag": "webview",
				"options": {
					src: getRealPath(props$30.src),
					updateTitle: props$30.updateTitle,
					webviewStyles: props$30.webviewStyles
				},
				"methods": [
					"runJavaScript",
					"backward",
					"forward",
					"refresh",
					"stop",
					"accessBackward",
					"accessForward",
					"loadData",
					"getPageHeight",
					"removeCache",
					"loadUrl"
				],
				"style": "width:100%;height:100%"
			}, null, 8, ["options"])], 10, ["id"]);
		}
	});
	var UniWebView = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-web-view", web_view_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var UniCanvas = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-canvas", canvas_default, parentNodeId, refNodeId, nodeJson, "uni-canvas > div");
		}
	};
	function formatTime(val) {
		val = val > 0 && val < Infinity ? val : 0;
		var h$1 = Math.floor(val / 3600);
		var m = Math.floor(val % 3600 / 60);
		var s = Math.floor(val % 3600 % 60);
		var hStr = (h$1 < 10 ? "0" : "") + h$1;
		var mStr = (m < 10 ? "0" : "") + m;
		var sStr = (s < 10 ? "0" : "") + s;
		var str = mStr + ":" + sStr;
		if (hStr !== "00") str = hStr + ":" + str;
		return str;
	}
	function useGesture(props$30, videoState, videoRef, fullscreenState) {
		var state = reactive({
			seeking: false,
			gestureType: "none",
			volumeOld: 0,
			volumeNew: 0,
			currentTimeOld: 0,
			currentTimeNew: 0,
			toastThin: false
		});
		var touchStartOrigin = {
			x: 0,
			y: 0
		};
		var changeToastThinTimer = null;
		var changeToastThin = () => {
			if (state.gestureType !== "none" && changeToastThinTimer != null) return;
			changeToastThinTimer = setTimeout(() => {
				state.toastThin = true;
			}, 500);
		};
		var showToastTimer = void 0;
		function changeShowToast() {
			if (showToastTimer != void 0) return;
			showToastTimer = setTimeout(() => {
				state.toastThin = false;
				showToastTimer = void 0;
			}, 1e3);
		}
		function clearChangeShowToast() {
			clearTimeout(showToastTimer);
			showToastTimer = void 0;
		}
		function onTouchstart(event) {
			var toucher = event.targetTouches[0];
			touchStartOrigin.x = toucher.pageX;
			touchStartOrigin.y = toucher.pageY;
			state.gestureType = "none";
			state.volumeOld = 0;
		}
		function onTouchmove(event) {
			function stop() {
				event.stopPropagation();
				event.preventDefault();
			}
			if (fullscreenState.fullscreen) stop();
			var gestureType = state.gestureType;
			if (gestureType === "stop") return;
			var toucher = event.targetTouches[0];
			var pageX = toucher.pageX;
			var pageY = toucher.pageY;
			var origin = touchStartOrigin;
			var video = videoRef.value;
			if (gestureType === "progress") {
				changeProgress(pageX - origin.x);
				state.seeking = true;
			} else if (gestureType === "volume") changeVolume(pageY - origin.y);
			if (gestureType !== "none") return;
			if (Math.abs(pageX - origin.x) > Math.abs(pageY - origin.y)) {
				if (!props$30.enableProgressGesture) {
					state.gestureType = "stop";
					return;
				}
				state.gestureType = "progress";
				state.currentTimeOld = state.currentTimeNew = video.currentTime;
				if (!fullscreenState.fullscreen) stop();
			} else {
				if (!props$30.pageGesture && !props$30.vslideGesture) {
					state.gestureType = "stop";
					return;
				}
				changeToastThin();
				state.gestureType = "volume";
				state.volumeOld = video.volume;
				if (!fullscreenState.fullscreen) stop();
			}
		}
		function onTouchend(event) {
			var video = videoRef.value;
			if (state.gestureType !== "none" && state.gestureType !== "stop") {
				event.stopPropagation();
				event.preventDefault();
			}
			if (state.gestureType === "progress" && state.currentTimeOld !== state.currentTimeNew) video.currentTime = state.currentTimeNew;
			state.gestureType = "none";
		}
		function changeProgress(x) {
			var duration = videoState.currentDuration;
			var currentTimeNew = x / 600 * duration + state.currentTimeOld;
			if (currentTimeNew < 0) currentTimeNew = 0;
			else if (currentTimeNew > duration) currentTimeNew = duration;
			state.currentTimeNew = currentTimeNew;
		}
		function changeVolume(y) {
			var video = videoRef.value;
			var valueOld = state.volumeOld;
			var value;
			if (typeof valueOld === "number") {
				value = valueOld - y / 200;
				if (value < 0) value = 0;
				else if (value > 1) value = 1;
				clearChangeShowToast();
				changeShowToast();
				video.volume = value;
				state.volumeNew = value;
			}
		}
		return {
			state,
			onTouchstart,
			onTouchmove,
			onTouchend
		};
	}
	function useFullscreen(trigger$1, containerRef, videoRef, userActionState, rootRef) {
		var state = reactive({ fullscreen: false });
		var isSafari = /^Apple/.test(navigator.vendor);
		function onFullscreenChange($event, webkit) {
			if (webkit && document.fullscreenEnabled) return;
			emitFullscreenChange(!!(document.fullscreenElement || document.webkitFullscreenElement));
		}
		function emitFullscreenChange(val) {
			state.fullscreen = val;
			trigger$1("fullscreenchange", {}, {
				fullScreen: val,
				direction: "vertical"
			});
		}
		function toggleFullscreen(val) {
			var root = rootRef.value;
			var container = containerRef.value;
			var video = videoRef.value;
			var mockFullScreen;
			if (val) if ((document.fullscreenEnabled || document.webkitFullscreenEnabled) && (!isSafari || userActionState.userAction)) container[document.fullscreenEnabled ? "requestFullscreen" : "webkitRequestFullscreen"]();
			else if (video.webkitEnterFullScreen) video.webkitEnterFullScreen();
			else {
				mockFullScreen = true;
				container.remove();
				container.classList.add("uni-video-type-fullscreen");
				document.body.appendChild(container);
			}
			else if (document.fullscreenEnabled || document.webkitFullscreenEnabled) {
				if (document.fullscreenElement) document.exitFullscreen();
				else if (document.webkitFullscreenElement) document.webkitExitFullscreen();
			} else if (video.webkitExitFullScreen) video.webkitExitFullScreen();
			else {
				mockFullScreen = true;
				container.remove();
				container.classList.remove("uni-video-type-fullscreen");
				root.appendChild(container);
			}
			if (mockFullScreen) emitFullscreenChange(val);
		}
		function requestFullScreen() {
			toggleFullscreen(true);
		}
		function exitFullScreen() {
			toggleFullscreen(false);
		}
		onBeforeUnmount(exitFullScreen);
		return {
			state,
			onFullscreenChange,
			emitFullscreenChange,
			toggleFullscreen,
			requestFullScreen,
			exitFullScreen
		};
	}
	function useVideo(props$30, attrs$1, trigger$1) {
		var videoRef = ref(null);
		var src = computed(() => getRealPath(props$30.src));
		var muted = computed(() => props$30.muted === "true" || props$30.muted === true);
		var state = reactive({
			start: false,
			src,
			playing: false,
			currentTime: 0,
			duration: 0,
			currentDuration: 0,
			progress: 0,
			buffered: 0,
			muted,
			pauseUpdatingCurrentTime: false
		});
		watch(() => src.value, () => {
			state.playing = false;
			state.currentTime = 0;
		});
		watch(() => state.buffered, (buffered) => {
			trigger$1("progress", {}, { buffered });
		});
		watch(() => muted.value, (muted$1) => {
			var video = videoRef.value;
			video.muted = muted$1;
		});
		watch([() => state.duration, () => props$30.duration], () => {
			var _duration = Number(props$30.duration);
			isNaN(_duration) && (_duration = 0);
			state.currentDuration = _duration > 0 ? _duration : state.duration;
		});
		function onDurationChange(_ref) {
			var { target } = _ref;
			state.duration = target.duration;
		}
		function onLoadedMetadata($event) {
			var initialTime = Number(props$30.initialTime) || 0;
			var video = $event.target;
			if (initialTime > 0) video.currentTime = initialTime;
			trigger$1("loadedmetadata", $event, {
				width: video.videoWidth,
				height: video.videoHeight,
				duration: video.duration
			});
			onProgress($event);
		}
		function onProgress($event) {
			var video = $event.target;
			var buffered = video.buffered;
			if (buffered.length) state.buffered = buffered.end(buffered.length - 1) / video.duration * 100;
		}
		function onWaiting($event) {
			trigger$1("waiting", $event, {});
		}
		function onVideoError($event) {
			state.playing = false;
			trigger$1("error", $event, {});
		}
		function onPlay($event) {
			state.start = true;
			state.playing = true;
			trigger$1("play", $event, {});
		}
		function onPause($event) {
			state.playing = false;
			trigger$1("pause", $event, {});
		}
		function onEnded($event) {
			state.playing = false;
			trigger$1("ended", $event, {});
		}
		function onTimeUpdate($event) {
			var video = $event.target;
			if (!state.pauseUpdatingCurrentTime) state.currentTime = video.currentTime;
			var currentTime = video.currentTime;
			trigger$1("timeupdate", $event, {
				currentTime,
				duration: video.duration
			});
		}
		function toggle() {
			var video = videoRef.value;
			if (state.playing) video.pause();
			else video.play();
		}
		function play() {
			var video = videoRef.value;
			state.start = true;
			video.play();
		}
		function pause() {
			videoRef.value.pause();
		}
		function seek(position) {
			var video = videoRef.value;
			position = Number(position);
			if (typeof position === "number" && !isNaN(position)) video.currentTime = position;
		}
		function stop() {
			seek(0);
			pause();
		}
		function playbackRate(rate) {
			var video = videoRef.value;
			video.playbackRate = rate;
		}
		return {
			videoRef,
			state,
			play,
			pause,
			stop,
			seek,
			playbackRate,
			toggle,
			onDurationChange,
			onLoadedMetadata,
			onProgress,
			onWaiting,
			onVideoError,
			onPlay,
			onPause,
			onEnded,
			onTimeUpdate
		};
	}
	function useControls(props$30, videoState, seek, seeking) {
		var progressRef = ref(null);
		var ballRef = ref(null);
		var centerPlayBtnShow = computed(() => props$30.showCenterPlayBtn && !videoState.start);
		var controlsVisible = ref(true);
		var state = reactive({
			seeking: false,
			touching: false,
			controlsTouching: false,
			centerPlayBtnShow,
			controlsShow: computed(() => !centerPlayBtnShow.value && props$30.controls && controlsVisible.value),
			controlsVisible
		});
		function clickProgress(event) {
			var $progress = progressRef.value;
			var element = event.target;
			var x = event.offsetX;
			while (element && element !== $progress) {
				x += element.offsetLeft;
				element = element.parentNode;
			}
			var w = $progress.offsetWidth;
			var progress = 0;
			if (x >= 0 && x <= w) {
				progress = x / w;
				seek(videoState.currentDuration * progress);
			}
		}
		function toggleControls() {
			state.controlsVisible = !state.controlsVisible;
		}
		var hideTiming;
		function autoHideStart() {
			hideTiming = setTimeout(() => {
				state.controlsVisible = false;
			}, 3e3);
		}
		function autoHideEnd() {
			if (hideTiming) {
				clearTimeout(hideTiming);
				hideTiming = null;
			}
		}
		onBeforeUnmount(() => {
			if (hideTiming) clearTimeout(hideTiming);
		});
		watch(() => state.controlsShow && videoState.playing && !state.controlsTouching, (val) => {
			if (val) autoHideStart();
			else autoHideEnd();
		});
		onMounted(() => {
			var passiveOptions$3 = passive(false);
			var originX;
			var originY;
			var moveOnce = true;
			var originProgress;
			var ball = ballRef.value;
			function touchmove$1(event) {
				var toucher = event.targetTouches[0];
				var pageX = toucher.pageX;
				var pageY = toucher.pageY;
				if (moveOnce && Math.abs(pageX - originX) < Math.abs(pageY - originY)) {
					touchend(event);
					return;
				}
				moveOnce = false;
				var w = progressRef.value.offsetWidth;
				var progress = originProgress + (pageX - originX) / w * 100;
				if (progress < 0) progress = 0;
				else if (progress > 100) progress = 100;
				videoState.progress = progress;
				seeking === null || seeking === void 0 || seeking(videoState.currentDuration * progress / 100);
				state.seeking = true;
				event.preventDefault();
				event.stopPropagation();
			}
			function touchend(event) {
				state.controlsTouching = false;
				if (state.touching) {
					ball.removeEventListener("touchmove", touchmove$1, passiveOptions$3);
					if (!moveOnce) {
						event.preventDefault();
						event.stopPropagation();
						seek(videoState.currentDuration * videoState.progress / 100);
					}
					state.touching = false;
				}
			}
			ball.addEventListener("touchstart", (event) => {
				state.controlsTouching = true;
				var toucher = event.targetTouches[0];
				originX = toucher.pageX;
				originY = toucher.pageY;
				originProgress = videoState.progress;
				moveOnce = true;
				state.touching = true;
				ball.addEventListener("touchmove", touchmove$1, passiveOptions$3);
			});
			ball.addEventListener("touchend", touchend);
			ball.addEventListener("touchcancel", touchend);
		});
		return {
			state,
			progressRef,
			ballRef,
			clickProgress,
			toggleControls,
			autoHideStart,
			autoHideEnd
		};
	}
	function useDanmu(props$30, videoState) {
		var danmuRef = ref(null);
		var state = reactive({ enable: Boolean(props$30.enableDanmu) });
		var danmuIndex = {
			time: 0,
			index: -1
		};
		var danmuList = isArray(props$30.danmuList) ? JSON.parse(JSON.stringify(props$30.danmuList)) : [];
		danmuList.sort(function(a$1, b) {
			return (a$1.time || 0) - (b.time || 0);
		});
		function toggleDanmu() {
			state.enable = !state.enable;
		}
		function updateDanmu(event) {
			var currentTime = event.target.currentTime;
			var oldDanmuIndex = danmuIndex;
			var newDanmuIndex = {
				time: currentTime,
				index: oldDanmuIndex.index
			};
			if (currentTime > oldDanmuIndex.time) for (var index$3 = oldDanmuIndex.index + 1; index$3 < danmuList.length; index$3++) {
				var element = danmuList[index$3];
				if (currentTime >= (element.time || 0)) {
					newDanmuIndex.index = index$3;
					if (videoState.playing && state.enable) playDanmu(element);
				} else break;
			}
			else if (currentTime < oldDanmuIndex.time) for (var _index = oldDanmuIndex.index - 1; _index > -1; _index--) if (currentTime <= (danmuList[_index].time || 0)) newDanmuIndex.index = _index - 1;
			else break;
			danmuIndex = newDanmuIndex;
		}
		function playDanmu(danmu) {
			var p$2 = document.createElement("p");
			p$2.className = "uni-video-danmu-item";
			p$2.innerText = danmu.text;
			var style = "bottom: ".concat(Math.random() * 100, "%;color: ").concat(danmu.color, ";");
			p$2.setAttribute("style", style);
			danmuRef.value.appendChild(p$2);
			setTimeout(function() {
				style += "left: 0;-webkit-transform: translateX(-100%);transform: translateX(-100%);";
				p$2.setAttribute("style", style);
				setTimeout(function() {
					p$2.remove();
				}, 4e3);
			}, 17);
		}
		function sendDanmu(danmu) {
			danmuList.splice(danmuIndex.index + 1, 0, {
				text: String(danmu.text),
				color: danmu.color,
				time: videoState.currentTime || 0
			});
		}
		return {
			state,
			danmuRef,
			updateDanmu,
			toggleDanmu,
			sendDanmu
		};
	}
	function useContext(play, pause, stop, seek, sendDanmu, playbackRate, requestFullScreen, exitFullScreen) {
		var methods = {
			play,
			stop,
			pause,
			seek,
			sendDanmu,
			playbackRate,
			requestFullScreen,
			exitFullScreen
		};
		useSubscribe((type, data) => {
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
			if (type in methods) methods[type](options);
		}, useContextInfo(), true);
	}
	function useProgressing(videoState, gestureState, controlsState, autoHideEnd, autoHideStart) {
		var progressing = computed(() => gestureState.gestureType === "progress" || controlsState.touching);
		watch(progressing, (val) => {
			videoState.pauseUpdatingCurrentTime = val;
			controlsState.controlsTouching = val;
			if (gestureState.gestureType === "progress" && val) controlsState.controlsVisible = val;
		});
		watch([() => videoState.currentTime, () => videoState.currentDuration], () => {
			if (videoState.currentDuration > 0) videoState.progress = videoState.currentTime / videoState.currentDuration * 100;
			else videoState.progress = 0;
			videoState.progress > 100 && (videoState.progress = 100);
		}, { immediate: true });
		watch(() => gestureState.currentTimeNew, (currentTimeNew) => {
			videoState.currentTime = currentTimeNew;
		});
		return progressing;
	}
	var video_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "Video",
		props: {
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
			vslideGesture: {
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
			showCenterPlayBtn: {
				type: [Boolean, String],
				default: true
			}
		},
		emits: [
			"fullscreenchange",
			"progress",
			"loadedmetadata",
			"waiting",
			"error",
			"play",
			"pause",
			"ended",
			"timeupdate"
		],
		setup(props$30, _ref2) {
			var { emit: emit$3, attrs: attrs$1, slots } = _ref2;
			var rootRef = ref(null);
			var containerRef = ref(null);
			var trigger$1 = useCustomEvent(rootRef, emit$3);
			var { state: userActionState } = useUserAction();
			var { $attrs: videoAttrs } = useAttrs({ excludeListeners: true });
			initI18nVideoMsgsOnce();
			var { videoRef, state: videoState, play, pause, stop, seek, playbackRate, toggle, onDurationChange, onLoadedMetadata, onProgress, onWaiting, onVideoError, onPlay, onPause, onEnded, onTimeUpdate } = useVideo(props$30, attrs$1, trigger$1);
			var { state: danmuState, danmuRef, updateDanmu, toggleDanmu, sendDanmu } = useDanmu(props$30, videoState);
			var { state: fullscreenState, onFullscreenChange, emitFullscreenChange, toggleFullscreen, requestFullScreen, exitFullScreen } = useFullscreen(trigger$1, containerRef, videoRef, userActionState, rootRef);
			var { state: gestureState, onTouchstart, onTouchend, onTouchmove } = useGesture(props$30, videoState, videoRef, fullscreenState);
			var { state: controlsState, progressRef, ballRef, clickProgress, toggleControls, autoHideEnd, autoHideStart } = useControls(props$30, videoState, seek, (currentTimeNew) => {
				gestureState.currentTimeNew = currentTimeNew;
			});
			useContext(play, pause, stop, seek, sendDanmu, playbackRate, requestFullScreen, exitFullScreen);
			var progressing = useProgressing(videoState, gestureState, controlsState, autoHideEnd, autoHideStart);
			return () => {
				return createVNode("uni-video", {
					"ref": rootRef,
					"id": props$30.id,
					"onClick": toggleControls
				}, [createVNode("div", {
					"ref": containerRef,
					"class": "uni-video-container",
					"onTouchstart": onTouchstart,
					"onTouchend": onTouchend,
					"onTouchmove": onTouchmove,
					"onFullscreenchange": withModifiers(onFullscreenChange, ["stop"]),
					"onWebkitfullscreenchange": withModifiers(($event) => onFullscreenChange($event, true), ["stop"])
				}, [
					createVNode("video", mergeProps({
						"ref": videoRef,
						"style": { "object-fit": props$30.objectFit },
						"muted": !!props$30.muted,
						"loop": !!props$30.loop,
						"src": videoState.src,
						"poster": props$30.poster,
						"autoplay": !!props$30.autoplay
					}, videoAttrs.value, {
						"class": {
							"uni-video-video": true,
							"uni-video-video-fullscreen": fullscreenState.fullscreen
						},
						"webkit-playsinline": true,
						"playsinline": true,
						"onDurationchange": onDurationChange,
						"onLoadedmetadata": onLoadedMetadata,
						"onProgress": onProgress,
						"onWaiting": onWaiting,
						"onError": onVideoError,
						"onPlay": onPlay,
						"onPause": onPause,
						"onEnded": onEnded,
						"onTimeupdate": (event) => {
							onTimeUpdate(event);
							updateDanmu(event);
						},
						"onWebkitbeginfullscreen": () => emitFullscreenChange(true),
						"onX5videoenterfullscreen": () => emitFullscreenChange(true),
						"onWebkitendfullscreen": () => emitFullscreenChange(false),
						"onX5videoexitfullscreen": () => emitFullscreenChange(false)
					}), null, 16, [
						"muted",
						"loop",
						"src",
						"poster",
						"autoplay",
						"webkit-playsinline",
						"playsinline",
						"onDurationchange",
						"onLoadedmetadata",
						"onProgress",
						"onWaiting",
						"onError",
						"onPlay",
						"onPause",
						"onEnded",
						"onTimeupdate",
						"onWebkitbeginfullscreen",
						"onX5videoenterfullscreen",
						"onWebkitendfullscreen",
						"onX5videoexitfullscreen"
					]),
					withDirectives(createVNode("div", {
						"class": "uni-video-bar uni-video-bar-full",
						"onClick": withModifiers(() => {}, ["stop"])
					}, [
						createVNode("div", { "class": "uni-video-controls" }, [
							withDirectives(createVNode("div", {
								"class": {
									"uni-video-icon": true,
									"uni-video-control-button": true,
									"uni-video-control-button-play": !videoState.playing,
									"uni-video-control-button-pause": videoState.playing
								},
								"onClick": withModifiers(toggle, ["stop"])
							}, null, 10, ["onClick"]), [[vShow, props$30.showPlayBtn]]),
							withDirectives(createVNode("div", { "class": "uni-video-current-time" }, [formatTime(videoState.currentTime)], 512), [[vShow, props$30.showProgress]]),
							withDirectives(createVNode("div", {
								"ref": progressRef,
								"class": "uni-video-progress-container",
								"onClick": withModifiers(clickProgress, ["stop"])
							}, [createVNode("div", { "class": {
								"uni-video-progress": true,
								"uni-video-progress-progressing": progressing.value
							} }, [
								createVNode("div", {
									"style": {
										width: videoState.buffered - videoState.progress + "%",
										left: videoState.progress + "%"
									},
									"class": "uni-video-progress-buffered"
								}, null, 4),
								createVNode("div", {
									"style": { width: videoState.progress + "%" },
									"class": "uni-video-progress-played"
								}, null, 4),
								createVNode("div", {
									"ref": ballRef,
									"style": { left: videoState.progress + "%" },
									"class": {
										"uni-video-ball": true,
										"uni-video-ball-progressing": progressing.value
									}
								}, [createVNode("div", { "class": "uni-video-inner" }, null)], 6)
							], 2)], 8, ["onClick"]), [[vShow, props$30.showProgress]]),
							withDirectives(createVNode("div", { "class": "uni-video-duration" }, [formatTime(videoState.currentDuration)], 512), [[vShow, props$30.showProgress]])
						]),
						withDirectives(createVNode("div", {
							"class": {
								"uni-video-icon": true,
								"uni-video-danmu-button": true,
								"uni-video-danmu-button-active": danmuState.enable
							},
							"onClick": withModifiers(toggleDanmu, ["stop"])
						}, null, 10, ["onClick"]), [[vShow, props$30.danmuBtn]]),
						withDirectives(createVNode("div", {
							"class": {
								"uni-video-icon": true,
								"uni-video-fullscreen": true,
								"uni-video-type-fullscreen": fullscreenState.fullscreen
							},
							"onClick": withModifiers(() => toggleFullscreen(!fullscreenState.fullscreen), ["stop"])
						}, null, 10, ["onClick"]), [[vShow, props$30.showFullscreenBtn]])
					], 8, ["onClick"]), [[vShow, controlsState.controlsShow]]),
					withDirectives(createVNode("div", {
						"ref": danmuRef,
						"style": "z-index: 0;",
						"class": "uni-video-danmu"
					}, null, 512), [[vShow, videoState.start && danmuState.enable]]),
					controlsState.centerPlayBtnShow && createVNode("div", {
						"class": "uni-video-cover",
						"onClick": withModifiers(() => {}, ["stop"])
					}, [createVNode("div", {
						"class": "uni-video-cover-play-button uni-video-icon",
						"onClick": withModifiers(play, ["stop"])
					}, null, 8, ["onClick"])], 8, ["onClick"]),
					createVNode("div", { "class": "uni-video-loading" }, [gestureState.gestureType === "volume" ? createVNode("div", {
						"class": {
							"uni-video-toast-container": true,
							"uni-video-toast-container-thin": gestureState.toastThin
						},
						"style": { marginTop: "5px" }
					}, [!gestureState.toastThin && gestureState.volumeNew > 0 && gestureState.gestureType === "volume" ? createVNode("text", { "class": "uni-video-icon uni-video-toast-icon" }, [""]) : !gestureState.toastThin && createVNode("text", { "class": "uni-video-icon uni-video-toast-icon" }, [""]), createVNode("div", {
						"class": "uni-video-toast-draw",
						"style": { width: "".concat(gestureState.volumeNew * 100, "%") }
					}, null, 4)], 2) : null]),
					createVNode("div", { "class": {
						"uni-video-toast": true,
						"uni-video-toast-progress": progressing.value
					} }, [createVNode("div", { "class": "uni-video-toast-title" }, [
						createVNode("span", { "class": "uni-video-toast-title-current-time" }, [formatTime(gestureState.currentTimeNew)]),
						" / ",
						formatTime(videoState.currentDuration)
					])], 2),
					createVNode("div", { "class": "uni-video-slots" }, [slots.default && slots.default()])
				], 40, [
					"onTouchstart",
					"onTouchend",
					"onTouchmove",
					"onFullscreenchange",
					"onWebkitfullscreenchange"
				])], 8, ["id", "onClick"]);
			};
		}
	});
	var UniVideo = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-video", video_default, parentNodeId, refNodeId, nodeJson, ".uni-video-slots");
		}
	};
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
	function getDefaultStartValue(props$30) {
		if (props$30.mode === mode.TIME) return "00:00";
		if (props$30.mode === mode.DATE) {
			var year = (/* @__PURE__ */ new Date()).getFullYear() - 100;
			switch (props$30.fields) {
				case fields.YEAR: return year + "";
				case fields.MONTH: return year + "-01";
				default: return year + "-01-01";
			}
		}
		return "";
	}
	function getDefaultEndValue(props$30) {
		if (props$30.mode === mode.TIME) return "23:59";
		if (props$30.mode === mode.DATE) {
			var year = (/* @__PURE__ */ new Date()).getFullYear() + 100;
			switch (props$30.fields) {
				case fields.YEAR: return year + "";
				case fields.MONTH: return year + "-12";
				default: return year + "-12-31";
			}
		}
		return "";
	}
	var picker_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "Picker",
		props: {
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
				type: [
					Number,
					String,
					Array
				],
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
		},
		emits: [
			"change",
			"cancel",
			"columnchange"
		],
		setup(props$30, _ref) {
			var { emit: emit$3 } = _ref;
			var rootRef = ref(null);
			var embedRef = ref(null);
			var trigger$1 = useCustomEvent(rootRef, emit$3);
			function onClick() {
				embedRef.value.show();
			}
			function onCancel(event) {
				trigger$1("cancel", event, event.detail);
			}
			function onColumnchange(event) {
				trigger$1("columnchange", event, event.detail);
			}
			function onChange$1(event) {
				trigger$1("change", event, event.detail);
			}
			if (props$30.mode === mode.MULTISELECTOR) watch(() => props$30.range, (range) => {
				embedRef.value.updateRange(range);
			});
			return () => createVNode("uni-picker", { "ref": rootRef }, [createVNode(embed_default, {
				"ref": embedRef,
				"tag": "picker",
				"options": props$30,
				"methods": ["show", "updateRange"],
				"onChange": onChange$1,
				"onColumnchange": onColumnchange,
				"onCancel": onCancel
			}, null, 8, [
				"options",
				"onChange",
				"onColumnchange",
				"onCancel"
			]), createVNode("div", {
				"onClick": onClick,
				"class": "uni-picker-slot"
			}, null, 8, ["onClick"])], 512);
		}
	});
	var UniPicker = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-picker", picker_default, parentNodeId, refNodeId, nodeJson, ".uni-picker-slot");
		}
	};
	(/* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = {};
	})))();
	var index = 0;
	function getJSONP(url, options, success, error) {
		var js = document.createElement("script");
		var callbackKey = options.callback || "callback";
		var callbackName = "__uni_jsonp_callback_" + index++;
		var timeout = options.timeout || 3e4;
		var timing;
		function end() {
			clearTimeout(timing);
			delete window[callbackName];
			js.remove();
		}
		window[callbackName] = (res) => {
			if (isFunction(success)) success(res);
			end();
		};
		js.onerror = () => {
			if (isFunction(error)) error();
			end();
		};
		timing = setTimeout(function() {
			if (isFunction(error)) error();
			end();
		}, timeout);
		js.src = url + (url.indexOf("?") >= 0 ? "&" : "?") + callbackKey + "=" + callbackName;
		document.body.appendChild(js);
	}
	function createCallout(maps$1) {
		function onAdd() {
			var div = this.div;
			this.getPanes().floatPane.appendChild(div);
		}
		function onRemove() {
			var parentNode = this.div.parentNode;
			if (parentNode) parentNode.removeChild(this.div);
		}
		function createAMapText() {
			var option = this.option;
			this.Text = new maps$1.Text({
				text: option.content,
				anchor: "bottom-center",
				offset: new maps$1.Pixel(0, option.offsetY - 16),
				style: {
					padding: (option.padding || 8) + "px",
					"line-height": (option.fontSize || 14) + "px",
					"border-radius": (option.borderRadius || 0) + "px",
					"border-color": "".concat(option.bgColor || "#fff", " transparent transparent"),
					"background-color": option.bgColor || "#fff",
					"box-shadow": "0 2px 6px 0 rgba(114, 124, 245, .5)",
					"text-align": "center",
					"font-size": (option.fontSize || 14) + "px",
					color: option.color || "#000"
				},
				position: option.position
			});
			(maps$1.event || maps$1.Event).addListener(this.Text, "click", () => {
				this.callback();
			});
			this.Text.setMap(option.map);
		}
		function createBMapText() {}
		function removeAMapText() {
			if (this.Text) this.option.map.remove(this.Text);
		}
		function removeBMapText() {
			if (this.Text) this.option.map.remove(this.Text);
		}
		class Callout {
			set onclick(callback) {
				this.div.onclick = callback;
			}
			get onclick() {
				return this.div.onclick;
			}
			constructor() {
				var option = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				this.createAMapText = createAMapText;
				this.removeAMapText = removeAMapText;
				this.createBMapText = createBMapText;
				this.removeBMapText = removeBMapText;
				this.onAdd = onAdd;
				this.construct = onAdd;
				this.onRemove = onRemove;
				this.destroy = onRemove;
				this.option = option || {};
				var visible = this.visible = this.alwaysVisible = option.display === "ALWAYS";
				if (getIsAMap()) {
					this.callback = callback;
					if (this.visible) this.createAMapText();
				} else if (getIsBMap()) {
					if (this.visible) this.createBMapText();
				} else {
					var map = option.map;
					this.position = option.position;
					this.index = 1;
					var div = this.div = document.createElement("div");
					var divStyle = div.style;
					divStyle.position = "absolute";
					divStyle.whiteSpace = "nowrap";
					divStyle.transform = "translateX(-50%) translateY(-100%)";
					divStyle.zIndex = "1";
					divStyle.boxShadow = option.boxShadow || "none";
					divStyle.display = visible ? "block" : "none";
					var triangle = this.triangle = document.createElement("div");
					triangle.setAttribute("style", "position: absolute;white-space: nowrap;border-width: 4px;border-style: solid;border-color: #fff transparent transparent;border-image: initial;font-size: 12px;padding: 0px;background-color: transparent;width: 0px;height: 0px;transform: translate(-50%, 100%);left: 50%;bottom: 0;");
					this.setStyle(option);
					div.appendChild(triangle);
					if (map) this.setMap(map);
				}
			}
			setOption(option) {
				this.option = option;
				if (option.display === "ALWAYS") this.alwaysVisible = this.visible = true;
				else this.alwaysVisible = false;
				if (getIsAMap()) {
					if (this.visible) this.createAMapText();
				} else if (getIsBMap()) {
					if (this.visible) this.createBMapText();
				} else {
					this.setPosition(option.position);
					this.setStyle(option);
				}
			}
			setStyle(option) {
				var div = this.div;
				var divStyle = div.style;
				div.innerText = option.content || "";
				divStyle.lineHeight = (option.fontSize || 14) + "px";
				divStyle.fontSize = (option.fontSize || 14) + "px";
				divStyle.padding = (option.padding || 8) + "px";
				divStyle.color = option.color || "#000";
				divStyle.borderRadius = (option.borderRadius || 0) + "px";
				divStyle.backgroundColor = option.bgColor || "#fff";
				divStyle.marginTop = "-" + ((option.top || 0) + 5) + "px";
				this.triangle.style.borderColor = "".concat(option.bgColor || "#fff", " transparent transparent");
			}
			setPosition(position) {
				this.position = position;
				this.draw();
			}
			draw() {
				var overlayProjection = this.getProjection();
				if (!this.position || !this.div || !overlayProjection) return;
				var pixel = overlayProjection.fromLatLngToDivPixel(this.position);
				var divStyle = this.div.style;
				divStyle.left = pixel.x + "px";
				divStyle.top = pixel.y + "px";
			}
			changed() {
				var divStyle = this.div.style;
				divStyle.display = this.visible ? "block" : "none";
			}
		}
		if (!getIsAMap() && !getIsBMap()) {
			var overlay = new (maps$1.OverlayView || maps$1.Overlay)();
			Callout.prototype.setMap = overlay.setMap;
			Callout.prototype.getMap = overlay.getMap;
			Callout.prototype.getPanes = overlay.getPanes;
			Callout.prototype.getProjection = overlay.getProjection;
			Callout.prototype.map_changed = overlay.map_changed;
			Callout.prototype.set = overlay.set;
			Callout.prototype.get = overlay.get;
			Callout.prototype.setOptions = overlay.setValues;
			Callout.prototype.bindTo = overlay.bindTo;
			Callout.prototype.bindsTo = overlay.bindsTo;
			Callout.prototype.notify = overlay.notify;
			Callout.prototype.setValues = overlay.setValues;
			Callout.prototype.unbind = overlay.unbind;
			Callout.prototype.unbindAll = overlay.unbindAll;
			Callout.prototype.addListener = overlay.addListener;
		}
		return Callout;
	}
	var maps;
	var callbacksMap = {};
	var GOOGLE_MAP_CALLBACKNAME = "__map_callback__";
	function loadMaps(_x, _x2) {
		return _loadMaps.apply(this, arguments);
	}
	function _loadMaps() {
		_loadMaps = _asyncToGenerator(function* (libraries, callback) {
			var mapInfo$1 = yield getMapInfo();
			if (!mapInfo$1.key) {
				console.error("Map key not configured.");
				return;
			}
			var callbacks$1 = callbacksMap[mapInfo$1.type] = callbacksMap[mapInfo$1.type] || [];
			if (maps) callback(maps);
			else if (window[mapInfo$1.type] && window[mapInfo$1.type].maps) {
				maps = getIsAMap() || getIsBMap() ? window[mapInfo$1.type] : window[mapInfo$1.type].maps;
				maps.Callout = maps.Callout || createCallout(maps);
				callback(maps);
			} else if (callbacks$1.length) callbacks$1.push(callback);
			else {
				callbacks$1.push(callback);
				var globalExt = window;
				var callbackName = GOOGLE_MAP_CALLBACKNAME + mapInfo$1.type;
				globalExt[callbackName] = function() {
					delete globalExt[callbackName];
					maps = getIsAMap() || getIsBMap() ? window[mapInfo$1.type] : window[mapInfo$1.type].maps;
					maps.Callout = createCallout(maps);
					callbacks$1.forEach((callback$1) => callback$1(maps));
					callbacks$1.length = 0;
				};
				if (getIsAMap()) handleAMapSecurityPolicy(mapInfo$1);
				var script = document.createElement("script");
				var src = getScriptBaseUrl(mapInfo$1.type);
				if (mapInfo$1.type === MapType.QQ) libraries.push("geometry");
				if (libraries.length) src += "libraries=".concat(libraries.join("%2C"), "&");
				if (mapInfo$1.type === MapType.BMAP) script.src = "".concat(src, "ak=").concat(mapInfo$1.key, "&callback=").concat(callbackName);
				else script.src = "".concat(src, "key=").concat(mapInfo$1.key, "&callback=").concat(callbackName);
				script.onerror = function() {
					console.error("Map load failed.");
				};
				document.body.appendChild(script);
			}
		});
		return _loadMaps.apply(this, arguments);
	}
	var getScriptBaseUrl = (mapType) => {
		return {
			qq: "https://map.qq.com/api/js?v=2.exp&",
			google: "https://maps.googleapis.com/maps/api/js?",
			AMap: "https://webapi.amap.com/maps?v=2.0&",
			BMapGL: "https://api.map.baidu.com/api?type=webgl&v=1.0&"
		}[mapType];
	};
	function handleAMapSecurityPolicy(mapInfo$1) {
		window._AMapSecurityConfig = {
			securityJsCode: mapInfo$1.securityJsCode || "",
			serviceHost: mapInfo$1.serviceHost || ""
		};
	}
	var ICON_PATH_LOCTAION = "M13.3334375 16 q0.033125 1.1334375 0.783125 1.8834375 q0.75 0.75 1.8834375 0.75 q1.1334375 0 1.8834375 -0.75 q0.75 -0.75 0.75 -1.8834375 q0 -1.1334375 -0.75 -1.8834375 q-0.75 -0.75 -1.8834375 -0.75 q-1.1334375 0 -1.8834375 0.75 q-0.75 0.75 -0.783125 1.8834375 ZM30.9334375 14.9334375 l-1.1334375 0 q-0.5 -5.2 -4.0165625 -8.716875 q-3.516875 -3.5165625 -8.716875 -4.0165625 l0 -1.1334375 q0 -0.4665625 -0.3 -0.7665625 q-0.3 -0.3 -0.7665625 -0.3 q-0.4665625 0 -0.7665625 0.3 q-0.3 0.3 -0.3 0.7665625 l0 1.1334375 q-5.2 0.5 -8.716875 4.0165625 q-3.5165625 3.516875 -4.0165625 8.716875 l-1.1334375 0 q-0.4665625 0 -0.7665625 0.3 q-0.3 0.3 -0.3 0.7665625 q0 0.4665625 0.3 0.7665625 q0.3 0.3 0.7665625 0.3 l1.1334375 0 q0.5 5.2 4.0165625 8.716875 q3.516875 3.5165625 8.716875 4.0165625 l0 1.1334375 q0 0.4665625 0.3 0.7665625 q0.3 0.3 0.7665625 0.3 q0.4665625 0 0.7665625 -0.3 q0.3 -0.3 0.3 -0.7665625 l0 -1.1334375 q5.2 -0.5 8.716875 -4.0165625 q3.5165625 -3.516875 4.0165625 -8.716875 l1.1334375 0 q0.4665625 0 0.7665625 -0.3 q0.3 -0.3 0.3 -0.7665625 q0 -0.4665625 -0.3 -0.7665625 q-0.3 -0.3 -0.7665625 -0.3 ZM17.0665625 27.6665625 l0 -2.0665625 q0 -0.4665625 -0.3 -0.7665625 q-0.3 -0.3 -0.7665625 -0.3 q-0.4665625 0 -0.7665625 0.3 q-0.3 0.3 -0.3 0.7665625 l0 2.0665625 q-4.3 -0.4665625 -7.216875 -3.383125 q-2.916875 -2.916875 -3.3834375 -7.216875 l2.0665625 0 q0.4665625 0 0.7665625 -0.3 q0.3 -0.3 0.3 -0.7665625 q0 -0.4665625 -0.3 -0.7665625 q-0.3 -0.3 -0.7665625 -0.3 l-2.0665625 0 q0.4665625 -4.3 3.3834375 -7.216875 q2.9165625 -2.916875 7.216875 -3.3834375 l0 2.0665625 q0 0.4665625 0.3 0.7665625 q0.3 0.3 0.7665625 0.3 q0.4665625 0 0.7665625 -0.3 q0.3 -0.3 0.3 -0.7665625 l0 -2.0665625 q4.3 0.4665625 7.216875 3.3834375 q2.9165625 2.9165625 3.383125 7.216875 l-2.0665625 0 q-0.4665625 0 -0.7665625 0.3 q-0.3 0.3 -0.3 0.7665625 q0 0.4665625 0.3 0.7665625 q0.3 0.3 0.7665625 0.3 l2.0665625 0 q-0.4665625 4.3 -3.383125 7.216875 q-2.916875 2.9165625 -7.216875 3.383125 Z";
	var ICON_PATH_ORIGIN = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAC01BMVEUAAAAAef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef96quGStdqStdpbnujMzMzCyM7Gyc7Ky83MzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwAef8GfP0yjfNWnOp0qOKKsdyYt9mju9aZt9mMstx1qeJYnekyjvIIfP0qivVmouaWttnMzMyat9lppOUujPQKffxhoOfNzc3Y2Njh4eHp6enu7u7y8vL19fXv7+/i4uLZ2dnOzs6auNgOf/sKff15quHR0dHx8fH9/f3////j4+N6quFdn+iywdPb29vw8PD+/v7c3NyywtLa2tr29vbS0tLd3d38/Pzf39/o6Ojc7f+q0v+HwP9rsf9dqv9Hnv9Vpv/q6urj8P+Vx/9Am/8Pgf8Iff/z8/OAvP95uf/n5+c5l//V6f+52v+y1//7+/vt7e0rkP/09PTQ0NDq9P8Whf+cy//W1tbe3t7A3v/m5ubs7OxOov/r6+vk5OQiaPjKAAAAknRSTlMACBZ9oB71/jiqywJBZATT6hBukRXv+zDCAVrkDIf4JbQsTb7eVeJLbwfa8Rh4G/OlPS/6/kxQ9/xdmZudoJxNVhng7B6wtWdzAtQOipcF1329wS44doK/BAkyP1pvgZOsrbnGXArAg34G2IsD1eMRe7bi7k5YnqFT9V0csyPedQyYD3p/Fje+hDpskq/MwpRBC6yKp2MAAAQdSURBVHja7Zn1exMxGIAPHbrhDsPdneHuNtzd3d3dIbjLh93o2o4i7TpgG1Jk0g0mMNwd/gTa5rq129reHnK5e/bk/TFNk/dJ7r5894XjGAwGg8GgTZasCpDIll1+hxw5vXLJLpEboTx5ZXbIhyzkl9fB28cqUaCgrBKFkI3CcjoUKYolihWXUSI7EihRUjaHXF52CVRKLoe8eZIdUOkyMknkRw6UlcehYAFHiXK+skgURk6Ul8OhQjFnCVRRBolKqRxQ5SzUHaqgNGSj7VCmalqJnDkoS5RF6ZCbroNvufQkUD6qEuXTdUA+3hQdqiEXVKfnUKOmK4latalJ1EEuoZZ6162HJ9x/4OChw0eOHj12/MTJU6dxG7XUu751tjNnz4ET5y9ctLZTSr0beKFLl89bpuUDrqgC1RqNWqsKuqqzNFw7e51S6u3tc+OmZUJ9kCHY6ECwOkRvab51iUrqXej2HYDQsHBjWgx3Ae7dppB6N2wEcF9jdMGDUIDGTaR2aNoM9FqjG7QmaN5CWgc/gIePjG559BigpZQOrYB/4jBfRGRUtDkmJjY6KjLCofkpD62lc2gDfMpWPIuLdwyV8XEpHgaddBZ+wBuSFcwJqSN2ovmZ/dfnOvCTxqGtwzq8SEjv4EhISn48eWgnhUP7DvDSvgzxrs6vV6+FLiro2EkCic4QKkzwJsH1KYreCp0eQhfyDl1B/w4P/xa5JVJ4U03QjbRD9x7wXlgH5IE3wmMBHXoSlugFAcI6f/AkkSi8q6HQm6xDn77wEQ8djTwSj3tqAMguRTe4ikeOQyJ4YV+KfkQl+oNW5GbY4gWOWgbwJ+kwAD6Fi90MK2ZsrIeBBCUGwRXbqJ+/iJMQliIEBhOU6AJhtlG/IpHE2bqrYQg5h6HA4yQiRqwEfkGCdTCMmMRw+IbPDCQaHCsCYAQxiZHw3TbmD/ESOHgHwShiEqPhp/gggYkSztIxxCRawy/bmEniJaJtfwiEscQkxkFgRqJESqQwwHhiEuMBp3Vm8RK/cZoHEzKXhCK2QxEPpiJe0YlKCFaKCNv/cYBNUsBRPlkJSc0U+dM7E9H0ThGJbgZT/iR7yj+VqMS06Qr4+OFm2JdCxIa8lugzkJs5K6MfxAaYPUcBpYG5khZJEkUUSb7DPCnKRfPBXj6M8FwuegoLpCgXcQszVjhbJFUJUee2hBhLoYTIcYtB57KY+opSMdVqwatSlZVj05aV//CwJLMX2DluaUcwhXm4ali2XOoLjxUrPV26zFtF4f5p0Gp310+z13BUWNvbehEXona6iAtX/zVZmtfN4WixfsNky4S6gCCVVq3RPLdfSfpv3MRRZfPoLc6Xs/5bt3EyMGzE9h07/Xft2t15z6i9+zgGg8FgMBgMBoPBYDAYDAYj8/APG67Rie8pUDsAAAAASUVORK5CYII=";
	var ICON_PATH_TARGET = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAACcCAMAAAC3Fl5oAAAB3VBMVEVMaXH/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/EhL/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/Dw//AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/GRn/NTX/Dw//Fhb/AAD/AAD/AAD/GRn/GRn/Y2P/AAD/AAD/ExP/Ghr/AAD/AAD/MzP/GRn/AAD/Hh7/AAD/RUX/AAD/AAD/AAD/AAD/AAD/AAD/Dg7/AAD/HR3/Dw//FRX/SUn/AAD/////kJD/DQ3/Zmb/+/v/wMD/mJj/6en/vb3/1NT//Pz/ODj/+fn/3Nz/nJz/j4//9/f/7e3/9vb/7Oz/2Nj/x8f/Ozv/+Pj/3d3/nZ3/2dn//f3/6Oj/2tr/v7//09P/vr7/mZn/l5cdSvP3AAAAe3RSTlMAAhLiZgTb/vztB/JMRhlp6lQW86g8mQ4KFPs3UCH5U8huwlesWtTYGI7RsdVeJGfTW5rxnutLsvXWF8vQNdo6qQbuz7D4hgVIx2xtw8GC1TtZaIw0i84P98tU0/fsj7PKaAgiZZxeVfo8Z52eg1P0nESrENnjXVPUgw/uuSmDAAADsUlEQVR42u3aZ3cTRxgF4GtbYleSLdnGcsENG2ODjbExEHrvhAQCIb1Bem+QdkeuuFMNBBJIfmuOckzZI8/srHYmH3Lm+QNXK632LTvQ03Tu/IWeU/tTGTKT2n+q58L5c00wpXJd47DHEt5w47pKxLbhdLdPKb/7dBYxVLxw1GcI/2h1BcpzKNFHLX2JQ4gumaiitqpEEhEdOMJI9h5AFC3feYzI+7IF2tpSLEOqDXpObPRYFm/jCWho/4Ble7MdoT7fzhhq9yHEz28wltU1UPrJZ0wd66HwicfYvEFIfePTAP8tSLTupBHvtGJFH9bSkNrNWEHzERrT34xSH9Ogr1CijkbVAUH1KRqVqkdQAw07iIAaGlcTqI+/0LjeJJ5J0IIEnkpXMdzs4sTtW9dnZq7fuj2xOMtwVWk88RHDjBYejYvnjD8qjOpfQsUqhvj7oSjxcJIhVj3pyKqpNjYvVjQ/RrXq5YABKi3MCYm5BSrtWO5v11DlmlC4RpU1WRS9SJU7QukOVbpQ9JLu549+Dd0AUOlTbkGEuk85vxLAK5QbuytC3R2j3HoAjZSbFxrmKTcCoJdSk0LLJKV6gSaPMqNTQsvUKGW8JrxKqUWhaZFSeWyh1LTQNE2pHF6mzOy40DQ+S5mLimJcENoKlOnBWsr8KbRNUGYt5LXgd6HtD3lNQIoyN4S2G5RJIUOZm0LbTcqsBqVmhLYZSlkPsP4VWf+Rrd+m1v9o9h8Vv5p42C1R5qL1x7WRglOgVN52yfwNOBu76P+lLPoYidu23KPciIHGa07ZeIW1jvcNtI7q5vexCPGYCmf+m/Y9a3sAwQ5bI9T7ukPgPcn9GToEao+xk1OixJT+GIsvNAbx6eAgPq0xiF+KtkpYKhRXCQ8eFFcJhSWGu3rZ8jJkCM8kz9K4TUnrC6mAgzTsB9tLwQ2W15qfosQ2GrQNpZr7aczbzVjBZsvLcaC1g0bsbIVEnU8DOr6H1KDH2LwtUBi0/JII6Dxm9zUXkH+XMWzfh1Dte1i2Pe3QkC77Zel7aehpO8wyHG6Dtt0NjKxhN6I4uSli/TqJiJJDUQ4NDCURXTrXRy1XcumyD24M+AzhD1RXIIZsl/LoyZmurJHDM7s8lvB2FQ/PmPJ6PseAXP5HGMYAAC7ABbgAF+ACXIALcAEuwAW4ABfgAlyAC3ABLsAFuID/d8Cx4NEt8/byOf0wLnis8zjMq9/Kp7bWw4JOj8u8TlhRl+G/Mp2wpOX48GffvvZ1CyL4B53LAS6zb08EAAAAAElFTkSuQmCC";
	var MapType = /* @__PURE__ */ function(MapType$1) {
		MapType$1["QQ"] = "qq";
		MapType$1["GOOGLE"] = "google";
		MapType$1["AMAP"] = "AMap";
		MapType$1["BMAP"] = "BMapGL";
		MapType$1["UNKNOWN"] = "";
		return MapType$1;
	}({});
	var mapInfo = null;
	function parseMapInfo(mapConfig) {
		if (mapConfig.bMapKey) return {
			type: MapType.BMAP,
			key: mapConfig.bMapKey
		};
		if (mapConfig.qqMapKey) return {
			type: MapType.QQ,
			key: mapConfig.qqMapKey
		};
		if (mapConfig.googleMapKey) return {
			type: MapType.GOOGLE,
			key: mapConfig.googleMapKey
		};
		if (mapConfig.aMapKey) return {
			type: MapType.AMAP,
			key: mapConfig.aMapKey,
			securityJsCode: mapConfig.aMapSecurityJsCode,
			serviceHost: mapConfig.aMapServiceHost
		};
		return {
			type: MapType.UNKNOWN,
			key: ""
		};
	}
	function getMapInfo() {
		return _getMapInfo.apply(this, arguments);
	}
	function _getMapInfo() {
		_getMapInfo = _asyncToGenerator(function* () {
			if (mapInfo) return mapInfo;
			return new Promise((resolve) => {
				UniViewJSBridge.invokeServiceMethod("getMapConfig", {}, (res) => {
					mapInfo = parseMapInfo(res);
					resolve(mapInfo);
				});
			});
		});
		return _getMapInfo.apply(this, arguments);
	}
	var IS_AMAP = false;
	var hasGetIsAMap = false;
	var getIsAMap = () => {
		if (hasGetIsAMap) return IS_AMAP;
		else {
			var _mapInfo;
			hasGetIsAMap = true;
			return IS_AMAP = ((_mapInfo = mapInfo) === null || _mapInfo === void 0 ? void 0 : _mapInfo.type) === MapType.AMAP;
		}
	};
	var getIsBMap = () => {
		var _mapInfo2;
		return ((_mapInfo2 = mapInfo) === null || _mapInfo2 === void 0 ? void 0 : _mapInfo2.type) === MapType.BMAP;
	};
	var props$8 = {
		id: {
			type: [Number, String],
			default: ""
		},
		latitude: {
			type: [Number, String],
			require: true
		},
		longitude: {
			type: [Number, String],
			require: true
		},
		title: {
			type: String,
			default: ""
		},
		iconPath: {
			type: String,
			require: true
		},
		rotate: {
			type: [Number, String],
			default: 0
		},
		alpha: {
			type: [Number, String],
			default: 1
		},
		width: {
			type: [Number, String],
			default: ""
		},
		height: {
			type: [Number, String],
			default: ""
		},
		callout: {
			type: Object,
			default: null
		},
		label: {
			type: Object,
			default: null
		},
		anchor: {
			type: Object,
			default: null
		},
		clusterId: {
			type: [Number, String],
			default: ""
		},
		customCallout: {
			type: Object,
			default: null
		},
		ariaLabel: {
			type: String,
			default: ""
		}
	};
	function useMarkerLabelStyle(id$1) {
		var className = "uni-map-marker-label-" + id$1;
		var styleEl = document.createElement("style");
		styleEl.id = className;
		document.head.appendChild(styleEl);
		onUnmounted(() => {
			styleEl.remove();
		});
		return function updateMarkerLabelStyle(style) {
			var newStyle = Object.assign({}, style, {
				position: "absolute",
				top: "70px",
				borderStyle: "solid"
			});
			var div = document.createElement("div");
			Object.keys(newStyle).forEach((key$1) => {
				div.style[key$1] = newStyle[key$1] || "";
			});
			styleEl.innerText = ".".concat(className, "{").concat(div.getAttribute("style"), "}");
			return className;
		};
	}
	var MapMarker_default = /* @__PURE__ */ defineSystemComponent({
		name: "MapMarker",
		props: props$8,
		setup(props$30) {
			var id$1 = String(!isNaN(Number(props$30.id)) ? props$30.id : "");
			var onMapReady = inject("onMapReady");
			var updateMarkerLabelStyle = useMarkerLabelStyle(id$1);
			var marker;
			function removeMarker() {
				if (marker) {
					if (marker.label && "setMap" in marker.label) marker.label.setMap(null);
					if (marker.callout) removeMarkerCallout(marker.callout);
					marker.setMap(null);
				}
			}
			function removeMarkerCallout(callout) {
				if (getIsAMap()) callout.removeAMapText();
				else callout.setMap(null);
			}
			onMapReady((map, maps$1, trigger$1) => {
				function updateMarker(option) {
					var title = option.title;
					var position;
					if (getIsAMap()) position = new maps$1.LngLat(option.longitude, option.latitude);
					else if (getIsBMap()) position = new maps$1.Point(option.longitude, option.latitude);
					else position = new maps$1.LatLng(option.latitude, option.longitude);
					var img = new Image();
					var imgHeight = 0;
					img.onload = /* @__PURE__ */ _asyncToGenerator(function* () {
						var anchor = option.anchor || {};
						var icon;
						var w;
						var h$1;
						var top;
						var x = typeof anchor.x === "number" ? anchor.x : .5;
						var y = typeof anchor.y === "number" ? anchor.y : 1;
						if (option.iconPath && (option.width || option.height)) {
							w = option.width || img.width / img.height * option.height;
							h$1 = option.height || img.height / img.width * option.width;
						} else {
							w = img.width / 2;
							h$1 = img.height / 2;
						}
						imgHeight = h$1;
						top = h$1 - (h$1 - y * h$1);
						if ("MarkerImage" in maps$1) icon = new maps$1.MarkerImage(img.src, null, null, new maps$1.Point(x * w, y * h$1), new maps$1.Size(w, h$1));
						else if ("Icon" in maps$1) icon = new maps$1.Icon({
							image: img.src,
							size: new maps$1.Size(w, h$1),
							imageSize: new maps$1.Size(w, h$1),
							imageOffset: new maps$1.Pixel(x * w, y * h$1)
						});
						else icon = {
							url: img.src,
							anchor: new maps$1.Point(x, y),
							size: new maps$1.Size(w, h$1)
						};
						if (getIsBMap()) {
							marker = new maps$1.Marker(new maps$1.Point(position.lng, position.lat));
							map.addOverlay(marker);
						} else {
							marker.setPosition(position);
							marker.setIcon(icon);
						}
						if ("setRotation" in marker) marker.setRotation(option.rotate || 0);
						var labelOpt = option.label || {};
						if ("label" in marker) {
							marker.label.setMap(null);
							delete marker.label;
						}
						var label;
						if (labelOpt.content) {
							var labelStyle = {
								borderColor: labelOpt.borderColor,
								borderWidth: (Number(labelOpt.borderWidth) || 0) + "px",
								padding: (Number(labelOpt.padding) || 0) + "px",
								borderRadius: (Number(labelOpt.borderRadius) || 0) + "px",
								backgroundColor: labelOpt.bgColor,
								color: labelOpt.color,
								fontSize: (labelOpt.fontSize || 14) + "px",
								lineHeight: (labelOpt.fontSize || 14) + "px",
								marginLeft: (Number(labelOpt.anchorX || labelOpt.x) || 0) + "px",
								marginTop: (Number(labelOpt.anchorY || labelOpt.y) || 0) + "px"
							};
							if ("Label" in maps$1) {
								label = new maps$1.Label({
									position,
									map,
									clickable: false,
									content: labelOpt.content,
									style: labelStyle
								});
								marker.label = label;
							} else if ("setLabel" in marker) if (getIsAMap()) {
								var content = "<div style=\"\n                  margin-left:".concat(labelStyle.marginLeft, ";\n                  margin-top:").concat(labelStyle.marginTop, ";\n                  padding:").concat(labelStyle.padding, ";\n                  background-color:").concat(labelStyle.backgroundColor, ";\n                  border-radius:").concat(labelStyle.borderRadius, ";\n                  line-height:").concat(labelStyle.lineHeight, ";\n                  color:").concat(labelStyle.color, ";\n                  font-size:").concat(labelStyle.fontSize, ";\n\n                  \">\n                  ").concat(labelOpt.content, "\n                <div>");
								marker.setLabel({
									content,
									direction: "bottom-right"
								});
							} else {
								var className = updateMarkerLabelStyle(labelStyle);
								marker.setLabel({
									text: labelOpt.content,
									color: labelStyle.color,
									fontSize: labelStyle.fontSize,
									className
								});
							}
						}
						var calloutOpt = option.callout || {};
						var callout = marker.callout;
						var calloutStyle;
						if (calloutOpt.content || title) {
							if (getIsAMap() && calloutOpt.content) calloutOpt.content = calloutOpt.content.replaceAll("\n", "<br/>");
							var boxShadow = "0px 0px 3px 1px rgba(0,0,0,0.5)";
							var offsetY = -imgHeight / 2;
							if (option.width || option.height) offsetY += 14 - imgHeight / 2;
							calloutStyle = calloutOpt.content ? {
								position,
								map,
								top,
								offsetY,
								content: calloutOpt.content,
								color: calloutOpt.color,
								fontSize: calloutOpt.fontSize,
								borderRadius: calloutOpt.borderRadius,
								bgColor: calloutOpt.bgColor,
								padding: calloutOpt.padding,
								boxShadow: calloutOpt.boxShadow || boxShadow,
								display: calloutOpt.display
							} : {
								position,
								map,
								top,
								offsetY,
								content: title,
								boxShadow
							};
							if (callout) callout.setOption(calloutStyle);
							else if (getIsAMap()) {
								var callback = (id$2) => {
									if (id$2 !== "") trigger$1("callouttap", {}, { markerId: Number(id$2) });
								};
								callout = marker.callout = new maps$1.Callout(calloutStyle, callback);
							} else {
								callout = marker.callout = new maps$1.Callout(calloutStyle);
								callout.div.onclick = function($event) {
									if (id$1 !== "") trigger$1("callouttap", $event, { markerId: Number(id$1) });
									$event.stopPropagation();
									$event.preventDefault();
								};
								if ((yield getMapInfo()).type === MapType.GOOGLE) {
									callout.div.ontouchstart = function($event) {
										$event.stopPropagation();
									};
									callout.div.onpointerdown = function($event) {
										$event.stopPropagation();
									};
								}
							}
						} else if (callout) {
							removeMarkerCallout(callout);
							delete marker.callout;
						}
					});
					if (option.iconPath) img.src = getRealPath(option.iconPath);
					else console.error("Marker.iconPath is required.");
				}
				function addMarker(props$31) {
					if (!getIsBMap()) marker = new maps$1.Marker({
						map,
						flat: true,
						autoRotation: false
					});
					updateMarker(props$31);
					var MapsEvent = maps$1.event || maps$1.Event;
					if (getIsBMap()) {} else MapsEvent.addListener(marker, "click", () => {
						var callout = marker.callout;
						if (callout && !callout.alwaysVisible) if (getIsAMap()) {
							callout.visible = !callout.visible;
							if (callout.visible) marker.callout.createAMapText();
							else marker.callout.removeAMapText();
						} else {
							callout.set("visible", !callout.visible);
							if (callout.visible) {
								var div = callout.div;
								var parent = div.parentNode;
								parent.removeChild(div);
								parent.appendChild(div);
							}
						}
						if (id$1) trigger$1("markertap", {}, {
							markerId: Number(id$1),
							latitude: props$31.latitude,
							longitude: props$31.longitude
						});
					});
				}
				addMarker(props$30);
				watch(props$30, updateMarker);
			});
			if (id$1) {
				var addMapChidlContext = inject("addMapChidlContext");
				var removeMapChidlContext = inject("removeMapChidlContext");
				var context = {
					id: id$1,
					translate(data) {
						onMapReady((map, maps$1, trigger$1) => {
							var destination = data.destination;
							var duration = data.duration;
							var autoRotate = !!data.autoRotate;
							var rotate = Number(data.rotate) || 0;
							var rotation = 0;
							if ("getRotation" in marker) rotation = marker.getRotation();
							var a$1 = marker.getPosition();
							var b = new maps$1.LatLng(destination.latitude, destination.longitude);
							var speed = maps$1.geometry.spherical.computeDistanceBetween(a$1, b) / 1e3 / ((typeof duration === "number" ? duration : 1e3) / (1e3 * 60 * 60));
							var MapsEvent = maps$1.event || maps$1.Event;
							var movingEvent = MapsEvent.addListener(marker, "moving", (e$1) => {
								var latLng = e$1.latLng;
								var label = marker.label;
								if (label) label.setPosition(latLng);
								var callout = marker.callout;
								if (callout) callout.setPosition(latLng);
							});
							var event = MapsEvent.addListener(marker, "moveend", () => {
								event.remove();
								movingEvent.remove();
								marker.lastPosition = a$1;
								marker.setPosition(b);
								var label = marker.label;
								if (label) label.setPosition(b);
								var callout = marker.callout;
								if (callout) callout.setPosition(b);
								var cb = data.animationEnd;
								if (isFunction(cb)) cb();
							});
							var lastRtate = 0;
							if (autoRotate) {
								if (marker.lastPosition) lastRtate = maps$1.geometry.spherical.computeHeading(marker.lastPosition, a$1);
								rotate = maps$1.geometry.spherical.computeHeading(a$1, b) - lastRtate;
							}
							if ("setRotation" in marker) marker.setRotation(rotation + rotate);
							if ("moveTo" in marker) marker.moveTo(b, speed);
							else {
								marker.setPosition(b);
								MapsEvent.trigger(marker, "moveend", {});
							}
						});
					}
				};
				addMapChidlContext(context);
				onUnmounted(() => removeMapChidlContext(context));
			}
			onUnmounted(removeMarker);
			return () => {
				return null;
			};
		}
	});
	init_web_dom_iterable();
	function hexToRgba(hex) {
		if (!hex) return {
			r: 0,
			g: 0,
			b: 0,
			a: 0
		};
		var tmpHex = hex.slice(1);
		var tmpHexLen = tmpHex.length;
		if (![
			3,
			4,
			6,
			8
		].includes(tmpHexLen)) return {
			r: 0,
			g: 0,
			b: 0,
			a: 0
		};
		if (tmpHexLen === 3 || tmpHexLen === 4) tmpHex = tmpHex.replace(/(\w{1})/g, "$1$1");
		var [sr, sg, sb, sa] = tmpHex.match(/(\w{2})/g);
		var r = parseInt(sr, 16), g$2 = parseInt(sg, 16), b = parseInt(sb, 16);
		if (!sa) return {
			r,
			g: g$2,
			b,
			a: 1
		};
		return {
			r,
			g: g$2,
			b,
			a: ("0x100".concat(sa) - 65536) / 255
		};
	}
	var MapPolyline_default = /* @__PURE__ */ defineSystemComponent({
		name: "MapPolyline",
		props: {
			points: {
				type: Array,
				require: true
			},
			color: {
				type: String,
				default: "#000000"
			},
			width: {
				type: [Number, String],
				default: ""
			},
			dottedLine: {
				type: [Boolean, String],
				default: false
			},
			arrowLine: {
				type: [Boolean, String],
				default: false
			},
			arrowIconPath: {
				type: String,
				default: ""
			},
			borderColor: {
				type: String,
				default: "#000000"
			},
			borderWidth: {
				type: [Number, String],
				default: ""
			},
			colorList: {
				type: Array,
				default() {
					return [];
				}
			},
			level: {
				type: String,
				default: ""
			}
		},
		setup(props$30) {
			var onMapReady = inject("onMapReady");
			var polyline;
			var polylineBorder;
			function removePolyline() {
				if (polyline) polyline.setMap(null);
				if (polylineBorder) polylineBorder.setMap(null);
			}
			onMapReady((map, maps$1) => {
				function updatePolyline(option) {
					removePolyline();
					addPolyline(option);
				}
				function addPolyline(option) {
					var path = [];
					option.points.forEach((point) => {
						var pointPosition;
						if (getIsAMap()) pointPosition = [point.longitude, point.latitude];
						else if (getIsBMap()) pointPosition = new maps$1.Point(point.longitude, point.latitude);
						else pointPosition = new maps$1.LatLng(point.latitude, point.longitude);
						path.push(pointPosition);
					});
					var strokeWeight = Number(option.width) || 1;
					var { r: sr, g: sg, b: sb, a: sa } = hexToRgba(option.color);
					var { r: br, g: bg, b: bb, a: ba } = hexToRgba(option.borderColor);
					var polylineOptions = {
						map,
						clickable: false,
						path,
						strokeWeight,
						strokeColor: option.color || void 0,
						strokeDashStyle: option.dottedLine ? "dash" : "solid"
					};
					var borderWidth = Number(option.borderWidth) || 0;
					var polylineBorderOptions = {
						map,
						clickable: false,
						path,
						strokeWeight: strokeWeight + borderWidth * 2,
						strokeColor: option.borderColor || void 0,
						strokeDashStyle: option.dottedLine ? "dash" : "solid"
					};
					if ("Color" in maps$1) {
						polylineOptions.strokeColor = new maps$1.Color(sr, sg, sb, sa);
						polylineBorderOptions.strokeColor = new maps$1.Color(br, bg, bb, ba);
					} else {
						polylineOptions.strokeColor = "rgb(".concat(sr, ", ").concat(sg, ", ").concat(sb, ")");
						polylineOptions.strokeOpacity = sa;
						polylineBorderOptions.strokeColor = "rgb(".concat(br, ", ").concat(bg, ", ").concat(bb, ")");
						polylineBorderOptions.strokeOpacity = ba;
					}
					if (borderWidth) polylineBorder = new maps$1.Polyline(polylineBorderOptions);
					if (getIsBMap()) {
						polyline = new maps$1.Polyline(polylineOptions.path, polylineOptions);
						map.addOverlay(polyline);
					} else polyline = new maps$1.Polyline(polylineOptions);
				}
				addPolyline(props$30);
				watch(props$30, updatePolyline);
			});
			onUnmounted(removePolyline);
			return () => {
				return null;
			};
		}
	});
	var MapCircle_default = /* @__PURE__ */ defineSystemComponent({
		name: "MapCircle",
		props: {
			latitude: {
				type: [Number, String],
				require: true
			},
			longitude: {
				type: [Number, String],
				require: true
			},
			color: {
				type: String,
				default: "#000000"
			},
			fillColor: {
				type: String,
				default: "#00000000"
			},
			radius: {
				type: [Number, String],
				require: true
			},
			strokeWidth: {
				type: [Number, String],
				default: ""
			},
			level: {
				type: String,
				default: ""
			}
		},
		setup(props$30) {
			var onMapReady = inject("onMapReady");
			var circle;
			function removeCircle() {
				if (circle) circle.setMap(null);
			}
			onMapReady((map, maps$1) => {
				function updateCircle(option) {
					removeCircle();
					addCircle(option);
				}
				function addCircle(option) {
					var circleOptions = {
						map,
						center: getIsAMap() || getIsBMap() ? [option.longitude, option.latitude] : new maps$1.LatLng(option.latitude, option.longitude),
						clickable: false,
						radius: option.radius,
						strokeWeight: Number(option.strokeWidth) || 1,
						strokeDashStyle: "solid"
					};
					if (getIsBMap()) {
						circleOptions.strokeColor = option.color;
						circleOptions.fillColor = option.fillColor || "#000";
						circleOptions.fillOpacity = 1;
					} else {
						var { r: fr, g: fg, b: fb, a: fa } = hexToRgba(option.fillColor);
						var { r: sr, g: sg, b: sb, a: sa } = hexToRgba(option.color);
						if ("Color" in maps$1) {
							circleOptions.fillColor = new maps$1.Color(fr, fg, fb, fa);
							circleOptions.strokeColor = new maps$1.Color(sr, sg, sb, sa);
						} else {
							circleOptions.fillColor = "rgb(".concat(fr, ", ").concat(fg, ", ").concat(fb, ")");
							circleOptions.fillOpacity = fa;
							circleOptions.strokeColor = "rgb(".concat(sr, ", ").concat(sg, ", ").concat(sb, ")");
							circleOptions.strokeOpacity = sa;
						}
					}
					if (getIsBMap()) {
						var pt = new maps$1.Point(circleOptions.center[0], circleOptions.center[1]);
						circle = new maps$1.Circle(pt, circleOptions.radius, circleOptions);
						map.addOverlay(circle);
					} else {
						circle = new maps$1.Circle(circleOptions);
						if (getIsAMap()) map.add(circle);
					}
				}
				addCircle(props$30);
				watch(props$30, updateCircle);
			});
			onUnmounted(removeCircle);
			return () => {
				return null;
			};
		}
	});
	var MapControl_default = /* @__PURE__ */ defineSystemComponent({
		name: "MapControl",
		props: {
			id: {
				type: [Number, String],
				default: ""
			},
			position: {
				type: Object,
				required: true
			},
			iconPath: {
				type: String,
				required: true
			},
			clickable: {
				type: [Boolean, String],
				default: ""
			},
			trigger: {
				type: Function,
				required: true
			}
		},
		setup(props$30) {
			var imgPath = computed(() => getRealPath(props$30.iconPath));
			var positionStyle = computed(() => {
				var positionStyle$1 = "top:".concat(props$30.position.top || 0, "px;left:").concat(props$30.position.left || 0, "px;");
				if (props$30.position.width) positionStyle$1 += "width:".concat(props$30.position.width, "px;");
				if (props$30.position.height) positionStyle$1 += "height:".concat(props$30.position.height, "px;");
				return positionStyle$1;
			});
			var handleClick = ($event) => {
				if (props$30.clickable) props$30.trigger("controltap", $event, { controlId: props$30.id });
			};
			return () => {
				return createVNode("div", { "class": "uni-map-control" }, [createVNode("img", {
					"src": imgPath.value,
					"style": positionStyle.value,
					"class": "uni-map-control-icon",
					"onClick": handleClick
				}, null, 12, ["src", "onClick"])]);
			};
		}
	});
	var require__species_constructor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var anObject$1 = require__an_object();
		var aFunction$1 = require__a_function();
		var SPECIES = require__wks()("species");
		module.exports = function(O, D) {
			var C = anObject$1(O).constructor;
			var S;
			return C === void 0 || (S = anObject$1(C)[SPECIES]) == void 0 ? D : aFunction$1(S);
		};
	}));
	var require__new_promise_capability = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var aFunction = require__a_function();
		function PromiseCapability(C) {
			var resolve, reject;
			this.promise = new C(function($$resolve, $$reject) {
				if (resolve !== void 0 || reject !== void 0) throw TypeError("Bad Promise constructor");
				resolve = $$resolve;
				reject = $$reject;
			});
			this.resolve = aFunction(resolve);
			this.reject = aFunction(reject);
		}
		module.exports.f = function(C) {
			return new PromiseCapability(C);
		};
	}));
	var require__promise_resolve = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var anObject = require__an_object();
		var isObject = require__is_object();
		var newPromiseCapability = require__new_promise_capability();
		module.exports = function(C, x) {
			anObject(C);
			if (isObject(x) && x.constructor === C) return x;
			var promiseCapability = newPromiseCapability.f(C);
			var resolve = promiseCapability.resolve;
			resolve(x);
			return promiseCapability.promise;
		};
	}));
	var $export = require__export();
	var core = require__core();
	var global = require__global();
	var speciesConstructor = require__species_constructor();
	var promiseResolve = require__promise_resolve();
	$export($export.P + $export.R, "Promise", { "finally": function(onFinally) {
		var C = speciesConstructor(this, core.Promise || global.Promise);
		var isFunction$1 = typeof onFinally == "function";
		return this.then(isFunction$1 ? function(x) {
			return promiseResolve(C, onFinally()).then(function() {
				return x;
			});
		} : onFinally, isFunction$1 ? function(e$1) {
			return promiseResolve(C, onFinally()).then(function() {
				throw e$1;
			});
		} : onFinally);
	} });
	function getLocation() {
		var args = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		return new Promise((resolve, reject) => {
			UniViewJSBridge.invokeServiceMethod("getLocation", args, (res) => {
				if (res.latitude && res.longitude) resolve(res);
				else reject(res && res.errMsg || "getLocation:fail");
			});
		});
	}
	var CONTEXT_ID = "MAP_LOCATION";
	var MapLocation_default = /* @__PURE__ */ defineSystemComponent({
		name: "MapLocation",
		setup() {
			var state = reactive({
				latitude: 0,
				longitude: 0,
				rotate: 0
			});
			{
				var onMapReady = inject("onMapReady");
				var timer;
				function updateLocation() {
					getLocation({
						type: "gcj02",
						isHighAccuracy: true
					}).then((res) => {
						state.latitude = res.latitude;
						state.longitude = res.longitude;
					}).finally(() => {
						timer = setTimeout(updateLocation, 3e4);
					});
				}
				function removeLocation() {
					if (timer) clearTimeout(timer);
				}
				onMapReady(updateLocation);
				onUnmounted(removeLocation);
				var addMapChidlContext = inject("addMapChidlContext");
				var removeMapChidlContext = inject("removeMapChidlContext");
				var context = {
					id: CONTEXT_ID,
					state
				};
				addMapChidlContext(context);
				onUnmounted(() => removeMapChidlContext(context));
			}
			return () => {
				return state.latitude ? createVNode(MapMarker_default, mergeProps({
					"anchor": {
						x: .5,
						y: .5
					},
					"width": "44",
					"height": "44",
					"iconPath": ICON_PATH_ORIGIN
				}, state), null, 16, ["iconPath"]) : null;
			};
		}
	});
	var map_polygon_default = /* @__PURE__ */ defineSystemComponent({
		name: "MapPolygon",
		props: {
			dashArray: {
				type: Array,
				default: () => [0, 0]
			},
			points: {
				type: Array,
				required: true
			},
			strokeWidth: {
				type: Number,
				default: 1
			},
			strokeColor: {
				type: String,
				default: "#000000"
			},
			fillColor: {
				type: String,
				default: "#00000000"
			},
			zIndex: {
				type: Number,
				default: 0
			}
		},
		setup(props$30) {
			var polygonIns;
			inject("onMapReady")((map, maps$1, trigger$1) => {
				function drawPolygon() {
					var { points, strokeWidth, strokeColor, dashArray, fillColor, zIndex } = props$30;
					var path = points.map((item) => {
						var { latitude, longitude } = item;
						if (getIsAMap()) return [longitude, latitude];
						else if (getIsBMap()) return new maps$1.Point(longitude, latitude);
						else return new maps$1.LatLng(latitude, longitude);
					});
					var { r: fcR, g: fcG, b: fcB, a: fcA } = hexToRgba(fillColor);
					var { r: scR, g: scG, b: scB, a: scA } = hexToRgba(strokeColor);
					var polygonOptions = {
						clickable: true,
						cursor: "crosshair",
						editable: false,
						map,
						fillColor: "",
						path,
						strokeColor: "",
						strokeDashStyle: dashArray.some((item) => item > 0) ? "dash" : "solid",
						strokeWeight: strokeWidth,
						visible: true,
						zIndex
					};
					if (maps$1.Color) {
						polygonOptions.fillColor = new maps$1.Color(fcR, fcG, fcB, fcA);
						polygonOptions.strokeColor = new maps$1.Color(scR, scG, scB, scA);
					} else {
						polygonOptions.fillColor = "rgb(".concat(fcR, ", ").concat(fcG, ", ").concat(fcB, ")");
						polygonOptions.fillOpacity = fcA;
						polygonOptions.strokeColor = "rgb(".concat(scR, ", ").concat(scG, ", ").concat(scB, ")");
						polygonOptions.strokeOpacity = scA;
					}
					if (polygonIns) {
						polygonIns.setOptions(polygonOptions);
						return;
					}
					if (getIsBMap()) {
						polygonIns = new maps$1.Polygon(polygonOptions.path, polygonOptions);
						map.addOverlay(polygonIns);
					} else polygonIns = new maps$1.Polygon(polygonOptions);
				}
				drawPolygon();
				watch(props$30, drawPolygon);
			});
			onUnmounted(() => {
				polygonIns.setMap(null);
			});
			return () => null;
		}
	});
	init_web_dom_iterable();
	var props$4 = {
		id: {
			type: String,
			default: ""
		},
		latitude: {
			type: [String, Number],
			default: 0
		},
		longitude: {
			type: [String, Number],
			default: 0
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
		includePoints: {
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
		},
		showLocation: {
			type: [Boolean, String],
			default: false
		},
		libraries: {
			type: Array,
			default() {
				return [];
			}
		},
		polygons: {
			type: Array,
			default: () => []
		}
	};
	function getPoints(points) {
		var newPoints = [];
		if (isArray(points)) points.forEach((point) => {
			if (point && point.latitude && point.longitude) newPoints.push({
				latitude: point.latitude,
				longitude: point.longitude
			});
		});
		return newPoints;
	}
	function getAMapPosition(maps$1, latitude, longitude) {
		return new maps$1.LngLat(longitude, latitude);
	}
	function getBMapPosition(maps$1, latitude, longitude) {
		return new maps$1.Point(longitude, latitude);
	}
	function getGoogleOrQQMapPosition(maps$1, latitude, longitude) {
		return new maps$1.LatLng(latitude, longitude);
	}
	function getMapPosition(maps$1, latitude, longitude) {
		if (getIsBMap()) return getBMapPosition(maps$1, latitude, longitude);
		else if (getIsAMap()) return getAMapPosition(maps$1, latitude, longitude);
		else return getGoogleOrQQMapPosition(maps$1, latitude, longitude);
	}
	function getLat(latLng) {
		if ("getLat" in latLng) return latLng.getLat();
		else {
			if (getIsBMap()) return latLng.lat;
			return latLng.lat();
		}
	}
	function getLng(latLng) {
		if ("getLng" in latLng) return latLng.getLng();
		else {
			if (getIsBMap()) return latLng.lng;
			return latLng.lng();
		}
	}
	function useMap(props$30, rootRef, emit$3) {
		var trigger$1 = useCustomEvent(rootRef, emit$3);
		var mapRef = ref(null);
		var maps$1;
		var map;
		var state = reactive({
			latitude: Number(props$30.latitude),
			longitude: Number(props$30.longitude),
			includePoints: getPoints(props$30.includePoints)
		});
		var onMapReadyCallbacks = [];
		var isMapReady;
		function onMapReady(callback) {
			if (isMapReady) callback(map, maps$1, trigger$1);
			else onMapReadyCallbacks.push(callback);
		}
		function emitMapReady() {
			isMapReady = true;
			onMapReadyCallbacks.forEach((callback) => callback(map, maps$1, trigger$1));
			onMapReadyCallbacks.length = 0;
		}
		var isBoundsReady;
		var onBoundsReadyCallbacks = [];
		function onBoundsReady(callback) {
			if (isBoundsReady) callback();
			else onMapReadyCallbacks.push(callback);
		}
		var contexts = {};
		function addMapChidlContext(context) {
			contexts[context.id] = context;
		}
		function removeMapChidlContext(context) {
			delete contexts[context.id];
		}
		watch([() => props$30.latitude, () => props$30.longitude], (_ref) => {
			var [latitudeVlaue, longitudeVlaue] = _ref;
			var latitude = Number(latitudeVlaue);
			var longitude = Number(longitudeVlaue);
			if (latitude !== state.latitude || longitude !== state.longitude) {
				state.latitude = latitude;
				state.longitude = longitude;
				if (map) {
					var centerPosition = getMapPosition(maps$1, state.latitude, state.longitude);
					map.setCenter(centerPosition);
				}
			}
		});
		watch(() => props$30.includePoints, (points) => {
			state.includePoints = getPoints(points);
			if (isBoundsReady) updateBounds();
		}, { deep: true });
		function emitBoundsReady() {
			isBoundsReady = true;
			onBoundsReadyCallbacks.forEach((callback) => callback());
			onBoundsReadyCallbacks.length = 0;
		}
		function getMapInfo$1() {
			var center = map.getCenter();
			return {
				scale: map.getZoom(),
				centerLocation: {
					latitude: getLat(center),
					longitude: getLng(center)
				}
			};
		}
		function updateCenter() {
			var centerPosition = getMapPosition(maps$1, state.latitude, state.longitude);
			map.setCenter(centerPosition);
		}
		function updateBounds() {
			if (getIsAMap()) {
				var points = [];
				state.includePoints.forEach((point) => {
					points.push([point.longitude, point.latitude]);
				});
				var bounds = new maps$1.Bounds(...points);
				map.setBounds(bounds);
			} else if (getIsBMap()) {} else {
				var _bounds = new maps$1.LatLngBounds();
				state.includePoints.forEach((_ref2) => {
					var { latitude, longitude } = _ref2;
					var latLng = new maps$1.LatLng(latitude, longitude);
					_bounds.extend(latLng);
				});
				map.fitBounds(_bounds);
			}
		}
		function initMap() {
			var mapEl = mapRef.value;
			var center = getMapPosition(maps$1, state.latitude, state.longitude);
			var event = maps$1.event || maps$1.Event;
			var map$1 = new maps$1.Map(mapEl, {
				center,
				zoom: Number(props$30.scale),
				disableDoubleClickZoom: true,
				mapTypeControl: false,
				zoomControl: false,
				scaleControl: false,
				panControl: false,
				fullscreenControl: false,
				streetViewControl: false,
				keyboardShortcuts: false,
				minZoom: 5,
				maxZoom: 18,
				draggable: true
			});
			if (getIsBMap()) {
				map$1.centerAndZoom(center, Number(props$30.scale));
				map$1.enableScrollWheelZoom();
				map$1._printLog && map$1._printLog("uniapp");
			}
			watch(() => props$30.scale, (scale) => {
				map$1.setZoom(Number(scale) || 16);
			});
			onBoundsReady(() => {
				if (state.includePoints.length) {
					updateBounds();
					updateCenter();
				}
			});
			if (getIsBMap()) {
				map$1.addEventListener("click", () => {
					trigger$1("tap", {}, {});
					trigger$1("click", {}, {});
				});
				map$1.addEventListener("dragstart", () => {
					trigger$1("regionchange", { __evName: "regionchange" }, {
						type: "begin",
						causedBy: "gesture"
					});
				});
				map$1.addEventListener("dragend", () => {
					trigger$1("regionchange", { __evName: "regionchange" }, extend({
						type: "end",
						causedBy: "drag"
					}, getMapInfo$1()));
				});
			} else {
				var boundsChangedEvent = event.addListener(map$1, "bounds_changed", () => {
					boundsChangedEvent.remove();
					emitBoundsReady();
				});
				event.addListener(map$1, "click", () => {
					trigger$1("tap", {}, {});
					trigger$1("click", {}, {});
				});
				event.addListener(map$1, "dragstart", () => {
					trigger$1("regionchange", { __evName: "regionchange" }, {
						type: "begin",
						causedBy: "gesture"
					});
				});
				event.addListener(map$1, "dragend", () => {
					trigger$1("regionchange", { __evName: "regionchange" }, extend({
						type: "end",
						causedBy: "drag"
					}, getMapInfo$1()));
				});
				var zoomChangedCallback = () => {
					emit$3("update:scale", map$1.getZoom());
					trigger$1("regionchange", { __evName: "regionchange" }, extend({
						type: "end",
						causedBy: "scale"
					}, getMapInfo$1()));
				};
				event.addListener(map$1, "zoom_changed", zoomChangedCallback);
				event.addListener(map$1, "zoomend", zoomChangedCallback);
				event.addListener(map$1, "center_changed", () => {
					var center$1 = map$1.getCenter();
					var latitude = getLat(center$1);
					var longitude = getLng(center$1);
					emit$3("update:latitude", latitude);
					emit$3("update:longitude", longitude);
				});
			}
			return map$1;
		}
		try {
			useSubscribe(function(type) {
				var data = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				var resolve = arguments.length > 2 ? arguments[2] : void 0;
				switch (type) {
					case "getCenterLocation":
						onMapReady(() => {
							var center = map.getCenter();
							resolve({
								latitude: getLat(center),
								longitude: getLng(center),
								errMsg: "".concat(type, ":ok")
							});
						});
						break;
					case "moveToLocation":
						var latitude = Number(data.latitude);
						var longitude = Number(data.longitude);
						if (!latitude || !longitude) {
							var context = contexts[CONTEXT_ID];
							if (context) {
								latitude = context.state.latitude;
								longitude = context.state.longitude;
							}
						}
						if (latitude && longitude) {
							state.latitude = latitude;
							state.longitude = longitude;
							if (map) {
								var centerPosition = getMapPosition(maps$1, latitude, longitude);
								map.setCenter(centerPosition);
							}
							onMapReady(() => {
								resolve({ errMsg: "".concat(type, ":ok") });
							});
						} else resolve({ errMsg: "".concat(type, ":fail") });
						break;
					case "translateMarker":
						onMapReady(() => {
							var context$1 = contexts[data.markerId];
							if (context$1) {
								try {
									context$1.translate(data);
								} catch (error) {
									resolve({ errMsg: "".concat(type, ":fail ").concat(error.message) });
									return;
								}
								resolve({ errMsg: "".concat(type, ":ok") });
							} else resolve({ errMsg: "".concat(type, ":fail not found") });
						});
						break;
					case "includePoints":
						state.includePoints = getPoints(data.includePoints);
						if (isBoundsReady || getIsAMap()) updateBounds();
						onBoundsReady(() => {
							resolve({ errMsg: "".concat(type, ":ok") });
						});
						break;
					case "getRegion":
						onBoundsReady(() => {
							var latLngBounds = map.getBounds();
							var southwest = latLngBounds.getSouthWest();
							var northeast = latLngBounds.getNorthEast();
							resolve({
								southwest: {
									latitude: getLat(southwest),
									longitude: getLng(southwest)
								},
								northeast: {
									latitude: getLat(northeast),
									longitude: getLng(northeast)
								},
								errMsg: "".concat(type, ":ok")
							});
						});
						break;
					case "getScale":
						onMapReady(() => {
							resolve({
								scale: map.getZoom(),
								errMsg: "".concat(type, ":ok")
							});
						});
						break;
				}
			}, useContextInfo(), true);
		} catch (error) {}
		onMounted(() => {
			loadMaps(props$30.libraries, (result) => {
				maps$1 = result;
				map = initMap();
				emitMapReady();
				trigger$1("updated", {}, {});
			});
		});
		provide("onMapReady", onMapReady);
		provide("addMapChidlContext", addMapChidlContext);
		provide("removeMapChidlContext", removeMapChidlContext);
		return {
			state,
			mapRef,
			trigger: trigger$1
		};
	}
	var map_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "Map",
		props: props$4,
		emits: [
			"markertap",
			"labeltap",
			"callouttap",
			"controltap",
			"regionchange",
			"tap",
			"click",
			"updated",
			"update:scale",
			"update:latitude",
			"update:longitude"
		],
		setup(props$30, _ref3) {
			var { emit: emit$3, slots } = _ref3;
			var rootRef = ref(null);
			var { mapRef, trigger: trigger$1 } = useMap(props$30, rootRef, emit$3);
			return () => {
				return createVNode("uni-map", {
					"ref": rootRef,
					"id": props$30.id
				}, [
					createVNode("div", {
						"ref": mapRef,
						"style": "width: 100%; height: 100%; position: relative; overflow: hidden"
					}, null, 512),
					props$30.markers.map((item) => createVNode(MapMarker_default, mergeProps({ "key": item.id }, item), null, 16)),
					props$30.polyline.map((item) => createVNode(MapPolyline_default, item, null, 16)),
					props$30.circles.map((item) => createVNode(MapCircle_default, item, null, 16)),
					props$30.controls.map((item) => createVNode(MapControl_default, mergeProps(item, { "trigger": trigger$1 }), null, 16, ["trigger"])),
					props$30.showLocation && createVNode(MapLocation_default, null, null),
					props$30.polygons.map((item) => createVNode(map_polygon_default, item, null, 16)),
					createVNode("div", { "style": "position: absolute;top: 0;width: 100%;height: 100%;overflow: hidden;pointer-events: none;" }, [slots.default && slots.default()])
				], 8, ["id"]);
			};
		}
	});
	var UniMap = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-map", map_default, parentNodeId, refNodeId, nodeJson, ".uni-map-slot");
		}
	};
	function _isSlot(s) {
		return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
	}
	var props$3 = {
		latitude: { type: Number },
		longitude: { type: Number },
		keyword: {
			type: String,
			default: ""
		}
	};
	function distance(distance$1) {
		if (distance$1 > 100) return "".concat(distance$1 > 1e3 ? (distance$1 / 1e3).toFixed(1) + "k" : distance$1.toFixed(0), "m | ");
		else if (distance$1 > 0) return "<100m | ";
		else return "";
	}
	function useState$1(props$30) {
		var state = reactive({
			latitude: 0,
			longitude: 0,
			keyword: "",
			searching: false
		});
		if (props$30.keyword) {
			state.keyword = props$30.keyword;
			state.searching = true;
		}
		function updatePosition() {
			if (props$30.latitude && props$30.longitude) {
				state.latitude = props$30.latitude;
				state.longitude = props$30.longitude;
			}
		}
		watch([() => props$30.latitude, () => props$30.longitude], updatePosition);
		updatePosition();
		return state;
	}
	function useList(state) {
		var list = reactive([]);
		var selectedIndexRef = ref(-1);
		var listState = reactive({
			loading: true,
			pageSize: 20,
			pageIndex: 1,
			hasNextPage: true,
			nextPage: null,
			selectedIndex: selectedIndexRef,
			selected: computed(() => list[selectedIndexRef.value])
		});
		var boundaryRef = computed(() => "nearby(".concat(state.latitude, ",").concat(state.longitude, ",1000,1)"));
		function pushData(array) {
			array.forEach((item) => {
				list.push({
					name: item.title || item.name,
					address: item.address,
					distance: item._distance || item.distance,
					latitude: item.location.lat,
					longitude: item.location.lng
				});
			});
		}
		function getList() {
			return _getList.apply(this, arguments);
		}
		function _getList() {
			_getList = _asyncToGenerator(function* () {
				listState.loading = true;
				var mapInfo$1 = yield getMapInfo();
				if (mapInfo$1.type === MapType.GOOGLE) {
					if (listState.pageIndex > 1 && listState.nextPage) {
						listState.nextPage();
						return;
					}
					new google.maps.places.PlacesService(document.createElement("div"))[state.keyword ? "textSearch" : "nearbySearch"]({
						location: {
							lat: state.latitude,
							lng: state.longitude
						},
						query: state.keyword,
						radius: 5e3
					}, (results, state$1, page) => {
						listState.loading = false;
						if (results && results.length) results.forEach((item) => {
							list.push({
								name: item.name || "",
								address: item.vicinity || item.formatted_address || "",
								distance: 0,
								latitude: item.geometry.location.lat(),
								longitude: item.geometry.location.lng()
							});
						});
						if (page) if (!page.hasNextPage) listState.hasNextPage = false;
						else listState.nextPage = () => {
							page.nextPage();
						};
					});
				} else if (mapInfo$1.type === MapType.QQ) getJSONP(state.keyword ? "https://apis.map.qq.com/ws/place/v1/search?output=jsonp&key=".concat(mapInfo$1.key, "&boundary=").concat(boundaryRef.value, "&keyword=").concat(state.keyword, "&page_size=").concat(listState.pageSize, "&page_index=").concat(listState.pageIndex) : "https://apis.map.qq.com/ws/geocoder/v1/?output=jsonp&key=".concat(mapInfo$1.key, "&location=").concat(state.latitude, ",").concat(state.longitude, "&get_poi=1&poi_options=page_size=").concat(listState.pageSize, ";page_index=").concat(listState.pageIndex), { callback: "callback" }, (res) => {
					listState.loading = false;
					if (state.keyword && "data" in res && res.data.length) pushData(res.data);
					else if ("result" in res) {
						var result = res.result;
						if (result.pois) pushData(result.pois);
					}
					if (list.length === listState.pageSize * listState.pageIndex) listState.hasNextPage = false;
				}, () => {
					listState.loading = false;
				});
				else if (mapInfo$1.type === MapType.AMAP) window.AMap.plugin("AMap.PlaceSearch", function() {
					var placeSearch = new window.AMap.PlaceSearch({
						city: "全国",
						pageSize: 10,
						pageIndex: listState.pageIndex
					});
					var keyword = state.keyword || "";
					var radius = state.keyword ? 5e4 : 5e3;
					placeSearch.searchNearBy(keyword, [state.longitude, state.latitude], radius, function(status, result) {
						if (status === "error") console.error(result);
						else if (status === "no_data") listState.hasNextPage = false;
						else pushData(result.poiList.pois);
					});
					listState.loading = false;
				});
			});
			return _getList.apply(this, arguments);
		}
		function loadMore() {
			if (!listState.loading && listState.hasNextPage) {
				listState.pageIndex++;
				getList();
			}
		}
		function reset() {
			listState.selectedIndex = -1;
			listState.pageIndex = 1;
			listState.hasNextPage = true;
			listState.nextPage = null;
			list.splice(0, list.length);
		}
		return {
			listState,
			list,
			loadMore,
			reset,
			getList
		};
	}
	var LoctaionPicker_default = /* @__PURE__ */ defineSystemComponent({
		name: "LoctaionPicker",
		props: props$3,
		emits: ["close"],
		setup(props$30, _ref) {
			var { emit: emit$3 } = _ref;
			var rootRef = ref(null);
			var trigger$1 = useCustomEvent(rootRef, emit$3);
			initI18nChooseLocationMsgsOnce();
			var { t: t$1 } = useI18n();
			var state = useState$1(props$30);
			var { list, listState, loadMore, reset, getList } = useList(state);
			var search = debounce(() => {
				reset();
				if (state.keyword) getList();
			}, 1e3, {
				setTimeout,
				clearTimeout
			});
			watch(() => state.searching, (val) => {
				reset();
				if (!val) getList();
			});
			function onInput(event) {
				state.keyword = event.detail.value;
				search();
			}
			function onChoose(e$1) {
				if (!listState.selected) return;
				var event = new CustomEvent("close", { detail: extend({}, listState.selected) });
				trigger$1("close", event, event.detail);
			}
			function onBack(e$1) {
				var event = new CustomEvent("close", { detail: {} });
				trigger$1("close", event, event.detail);
			}
			function onRegionChange(event) {
				var centerLocation = event.detail.centerLocation;
				if (centerLocation) move(centerLocation);
			}
			function moveToLocation() {
				getLocation({
					type: "gcj02",
					isHighAccuracy: true
				}).then((_ref2) => {
					var { latitude, longitude } = _ref2;
					move({
						latitude,
						longitude
					});
				});
			}
			function move(_ref3) {
				var { latitude, longitude } = _ref3;
				state.latitude = latitude;
				state.longitude = longitude;
				reset();
				getList();
			}
			if (!state.latitude || !state.longitude) moveToLocation();
			return () => {
				var content = list.map((item, index$3) => {
					return createVNode("div", {
						"key": index$3,
						"class": {
							"list-item": true,
							selected: listState.selectedIndex === index$3
						},
						"onClick": () => {
							listState.selectedIndex = index$3;
							state.latitude = item.latitude;
							state.longitude = item.longitude;
						}
					}, [
						createSvgIconVNode(ICON_PATH_CONFIRM, "#007aff", 24),
						createVNode("div", { "class": "list-item-title" }, [item.name]),
						createVNode("div", { "class": "list-item-detail" }, [distance(item.distance), item.address])
					], 10, ["onClick"]);
				});
				if (listState.loading) content.unshift(createVNode("div", { "class": "list-loading" }, [createVNode("i", { "class": "uni-loading" }, null)]));
				return createVNode("div", {
					"class": "uni-system-choose-location",
					"ref": rootRef
				}, [
					createVNode(map_default, {
						"latitude": state.latitude,
						"longitude": state.longitude,
						"class": "map",
						"show-location": true,
						"libraries": ["places"],
						"onUpdated": getList,
						"onRegionchange": onRegionChange
					}, {
						default: () => [createVNode("div", {
							"class": "map-location",
							"style": "background-image: url(\"".concat(ICON_PATH_TARGET, "\")")
						}, null, 4), createVNode("div", {
							"class": "map-move",
							"onClick": moveToLocation
						}, [createSvgIconVNode(ICON_PATH_LOCTAION, "#000000", 24)], 8, ["onClick"])],
						_: 1
					}, 8, [
						"latitude",
						"longitude",
						"show-location",
						"onUpdated",
						"onRegionchange"
					]),
					createVNode("div", { "class": "nav" }, [createVNode("div", {
						"class": "nav-btn back",
						"onClick": onBack
					}, [createSvgIconVNode(ICON_PATH_CLOSE, "#ffffff", 26)], 8, ["onClick"]), createVNode("div", {
						"class": {
							"nav-btn": true,
							confirm: true,
							disable: !listState.selected
						},
						"onClick": onChoose
					}, [createSvgIconVNode(ICON_PATH_CONFIRM, "#ffffff", 26)], 10, ["onClick"])]),
					createVNode("div", { "class": "menu" }, [createVNode("div", { "class": "search" }, [createVNode(input_default, {
						"value": state.keyword,
						"class": "search-input",
						"placeholder": t$1("uni.chooseLocation.search"),
						"onFocus": () => state.searching = true,
						"onInput": onInput
					}, null, 8, [
						"value",
						"placeholder",
						"onFocus",
						"onInput"
					]), state.searching && createVNode("div", {
						"class": "search-btn",
						"onClick": () => {
							state.searching = false;
							state.keyword = "";
						}
					}, [t$1("uni.chooseLocation.cancel")], 8, ["onClick"])]), createVNode(scroll_view_default, {
						"scroll-y": true,
						"class": "list",
						"onScrolltolower": loadMore
					}, _isSlot(content) ? content : {
						default: () => [content],
						_: 2
					}, 8, ["scroll-y", "onScrolltolower"])])
				], 512);
			};
		}
	});
	var UniLocationPicker = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-location-picker", LoctaionPicker_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var ICON_PATH_NAV = "M28 17c-6.49396875 0-12.13721875 2.57040625-15 6.34840625V5.4105l6.29859375 6.29859375c0.387875 0.387875 1.02259375 0.387875 1.4105 0 0.387875-0.387875 0.387875-1.02259375 0-1.4105L12.77853125 2.36803125a0.9978125 0.9978125 0 0 0-0.0694375-0.077125c-0.1944375-0.1944375-0.45090625-0.291375-0.70721875-0.290875l-0.00184375-0.0000625-0.00184375 0.0000625c-0.2563125-0.0005-0.51278125 0.09640625-0.70721875 0.290875a0.9978125 0.9978125 0 0 0-0.0694375 0.077125l-7.930625 7.9305625c-0.387875 0.387875-0.387875 1.02259375 0 1.4105 0.387875 0.387875 1.02259375 0.387875 1.4105 0L11 5.4105V29c0 0.55 0.45 1 1 1s1-0.45 1-1c0-5.52284375 6.71571875-10 15-10 0.55228125 0 1-0.44771875 1-1 0-0.55228125-0.44771875-1-1-1z";
	var props$2 = {
		latitude: { type: Number },
		longitude: { type: Number },
		scale: {
			type: Number,
			default: 18
		},
		name: {
			type: String,
			default: ""
		},
		address: {
			type: String,
			default: ""
		},
		showNav: {
			type: Boolean,
			default: false
		}
	};
	function useState(props$30) {
		var state = reactive({
			center: {
				latitude: 0,
				longitude: 0
			},
			marker: {
				id: 1,
				latitude: 0,
				longitude: 0,
				iconPath: ICON_PATH_TARGET,
				width: 32,
				height: 52
			},
			location: {
				id: 2,
				latitude: 0,
				longitude: 0,
				iconPath: ICON_PATH_ORIGIN,
				width: 44,
				height: 44
			}
		});
		function updatePosition() {
			if (props$30.latitude && props$30.longitude) {
				state.center.latitude = props$30.latitude;
				state.center.longitude = props$30.longitude;
				state.marker.latitude = props$30.latitude;
				state.marker.longitude = props$30.longitude;
			}
		}
		watch([() => props$30.latitude, () => props$30.longitude], updatePosition);
		updatePosition();
		return state;
	}
	var LocationView_default = /* @__PURE__ */ defineSystemComponent({
		name: "LocationView",
		props: props$2,
		emits: ["close", "navChange"],
		setup(props$30, _ref) {
			var { emit: emit$3 } = _ref;
			var rootRef = ref(null);
			var trigger$1 = useCustomEvent(rootRef, emit$3);
			var state = useState(props$30);
			getLocation({
				type: "gcj02",
				isHighAccuracy: true
			}).then((_ref2) => {
				var { latitude, longitude } = _ref2;
				state.location.latitude = latitude;
				state.location.longitude = longitude;
			});
			function onRegionChange(event) {
				var centerLocation = event.detail.centerLocation;
				if (centerLocation) {
					state.center.latitude = centerLocation.latitude;
					state.center.longitude = centerLocation.longitude;
				}
			}
			var navUrl = ref("");
			function nav() {
				return _nav.apply(this, arguments);
			}
			function _nav() {
				_nav = _asyncToGenerator(function* () {
					var mapInfo$1 = yield getMapInfo();
					var url = "";
					if (mapInfo$1.type === MapType.GOOGLE) {
						var origin = state.location.latitude ? "&origin=".concat(state.location.latitude, "%2C").concat(state.location.longitude) : "";
						url = "https://www.google.com/maps/dir/?api=1".concat(origin, "&destination=").concat(props$30.latitude, "%2C").concat(props$30.longitude);
					} else if (mapInfo$1.type === MapType.QQ) {
						var fromcoord = state.location.latitude ? "&fromcoord=".concat(state.location.latitude, "%2C").concat(state.location.longitude, "&from=").concat(encodeURIComponent("我的位置")) : "";
						url = "https://apis.map.qq.com/uri/v1/routeplan?type=drive".concat(fromcoord, "&tocoord=").concat(props$30.latitude, "%2C").concat(props$30.longitude, "&to=").concat(encodeURIComponent(props$30.name || "目的地"), "&ref=").concat(mapInfo$1.key);
					} else if (mapInfo$1.type === MapType.AMAP) {
						var from = state.location.latitude ? "from=".concat(state.location.longitude, ",").concat(state.location.latitude, ",").concat(encodeURIComponent("我的位置"), "&") : "";
						url = "https://uri.amap.com/navigation?".concat(from, "to=").concat(props$30.longitude, ",").concat(props$30.latitude, ",").concat(encodeURIComponent(props$30.name || "目的地"));
					}
					navUrl.value = url;
					navChange(true);
				});
				return _nav.apply(this, arguments);
			}
			function navChange(showNav) {
				trigger$1("navChange", new CustomEvent("navChange", {}), { showNav });
			}
			function back(e$1) {
				var event = new CustomEvent("close", {});
				trigger$1("close", event, event.detail);
			}
			function backNav() {
				navChange(false);
				navUrl.value = "";
			}
			function setCenter(_ref3) {
				var { latitude, longitude } = _ref3;
				state.center.latitude = latitude;
				state.center.longitude = longitude;
			}
			return () => {
				return createVNode("div", {
					"class": "uni-system-open-location",
					"ref": rootRef
				}, [
					createVNode(map_default, {
						"latitude": state.center.latitude,
						"longitude": state.center.longitude,
						"class": "map",
						"markers": [state.marker, state.location],
						"onRegionchange": onRegionChange
					}, { default: () => [createVNode("div", {
						"class": "map-move",
						"onClick": () => setCenter(state.location)
					}, [createSvgIconVNode(ICON_PATH_LOCTAION, "#000000", 24)], 8, ["onClick"])] }, 8, [
						"latitude",
						"longitude",
						"markers",
						"onRegionchange"
					]),
					createVNode("div", { "class": "info" }, [
						createVNode("div", {
							"class": "name",
							"onClick": () => setCenter(state.marker)
						}, [props$30.name], 8, ["onClick"]),
						createVNode("div", {
							"class": "address",
							"onClick": () => setCenter(state.marker)
						}, [props$30.address], 8, ["onClick"]),
						createVNode("div", {
							"class": "nav",
							"onClick": nav
						}, [createSvgIconVNode(ICON_PATH_NAV, "#ffffff", 26)], 8, ["onClick"])
					]),
					createVNode("div", {
						"class": "nav-btn-back",
						"onClick": back
					}, [createSvgIconVNode(ICON_PATH_BACK, "#ffffff", 26)], 8, ["onClick"]),
					withDirectives(createVNode("div", { "class": "nav-view" }, [
						createVNode("div", { "class": "nav-view-top-placeholder" }, null),
						createVNode("iframe", {
							"class": "nav-view-frame",
							"src": navUrl.value,
							"frameborder": "0",
							"allow": "geolocation"
						}, null, 8, ["src"]),
						createVNode("div", {
							"class": "nav-btn-back",
							"onClick": backNav
						}, [createSvgIconVNode(ICON_PATH_BACK, "#ffffff", 26)], 8, ["onClick"])
					], 512), [[vShow, props$30.showNav]])
				], 512);
			};
		}
	});
	var UniLocationView = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-location-view", LocationView_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var cover_image_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "CoverImage",
		compatConfig: { MODE: 3 },
		props: { src: {
			type: String,
			default: ""
		} },
		emits: ["load", "error"],
		setup(props$30, _ref) {
			var { emit: emit$3 } = _ref;
			var root = ref(null);
			var trigger$1 = useCustomEvent(root, emit$3);
			function load($event) {
				trigger$1("load", $event);
			}
			function error($event) {
				trigger$1("error", $event);
			}
			return () => {
				var { src } = props$30;
				return createVNode("uni-cover-image", {
					"ref": root,
					"src": src
				}, [createVNode("div", { "class": "uni-cover-image" }, [src ? createVNode("img", {
					"src": getRealPath(src),
					"onLoad": load,
					"onError": error
				}, null, 40, [
					"src",
					"onLoad",
					"onError"
				]) : null])], 8, ["src"]);
			};
		}
	});
	var UniCoverImage = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-cover-image", cover_image_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var cover_view_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "CoverView",
		compatConfig: { MODE: 3 },
		props: { scrollTop: {
			type: [String, Number],
			default: 0
		} },
		setup(props$30, _ref) {
			var { slots } = _ref;
			var root = ref(null);
			var content = ref(null);
			watch(() => props$30.scrollTop, (val) => {
				setScrollTop(val);
			});
			function setScrollTop(val) {
				var _content = content.value;
				if (getComputedStyle(_content).overflowY === "scroll") _content.scrollTop = _upx2pxNum(val);
			}
			function _upx2pxNum(val) {
				var _val = String(val);
				if (/\d+[ur]px$/i.test(_val)) _val.replace(/\d+[ur]px$/i, (text) => {
					return String(uni.upx2px(parseFloat(text)));
				});
				return parseFloat(_val) || 0;
			}
			onMounted(() => {
				setScrollTop(props$30.scrollTop);
			});
			return () => {
				return createVNode("uni-cover-view", {
					"scroll-top": props$30.scrollTop,
					"ref": root
				}, [createVNode("div", {
					"ref": content,
					"class": "uni-cover-view"
				}, [slots.default && slots.default()], 512)], 8, ["scroll-top"]);
			};
		}
	});
	var UniCoverView = class extends UniContainerComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-cover-view", cover_view_default, parentNodeId, refNodeId, nodeJson, ".uni-cover-view");
		}
	};
	var UniLivePlayer = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-live-player", video_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var ad_default = /* @__PURE__ */ defineBuiltInComponent({
		name: "Ad",
		props: {
			adpid: {
				type: String,
				default: ""
			},
			disabled: {
				type: [Boolean, String],
				default: false
			}
		},
		emits: [
			"load",
			"close",
			"error"
		],
		setup(props$30, _ref) {
			var { emit: emit$3 } = _ref;
			var rootRef = ref(null);
			var embedRef = ref(null);
			var trigger$1 = useCustomEvent(rootRef, emit$3);
			function onLoad(event) {
				trigger$1("load", event, event.detail);
			}
			function onClose(event) {
				trigger$1("close", event, event.detail);
			}
			function onError(event) {
				trigger$1("error", event, event.detail);
			}
			function onResize(event) {}
			return () => createVNode("uni-ad", { "ref": rootRef }, [createVNode(embed_default, {
				"ref": embedRef,
				"tag": "ad",
				"options": props$30,
				"onLoad": onLoad,
				"onClose": onClose,
				"onError": onError,
				"onResize": onResize
			}, null, 8, [
				"options",
				"onLoad",
				"onClose",
				"onError",
				"onResize"
			])], 512);
		}
	});
	var UniAd = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-ad", ad_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var UniEmbed = class extends UniComponent {
		constructor(id$1, parentNodeId, refNodeId, nodeJson) {
			super(id$1, "uni-embed", embed_default, parentNodeId, refNodeId, nodeJson);
		}
	};
	var BuiltInComponents = {
		"#text": UniTextNode,
		"#comment": UniComment,
		VIEW: UniViewElement,
		BUTTON: UniButton,
		IMAGE: UniImage,
		TEXT: UniTextElement,
		NAVIGATOR: UniNavigator,
		"RICH-TEXT": UniRichText,
		PROGRESS: UniProgress,
		LABEL: UniLabel,
		CHECKBOX: UniCheckbox,
		"CHECKBOX-GROUP": UniCheckboxGroup,
		RADIO: UniRadio,
		"RADIO-GROUP": UniRadioGroup,
		SLIDER: UniSlider,
		SWITCH: UniSwitch,
		INPUT: UniInput,
		TEXTAREA: UniTextarea,
		FORM: UniForm,
		EDITOR: UniEditor,
		"PICKER-VIEW": UniPickerView,
		"PICKER-VIEW-COLUMN": UniPickerViewColumn,
		"SCROLL-VIEW": UniScrollView,
		SWIPER: UniSwiper,
		"SWIPER-ITEM": UniSwiperItem,
		"MOVABLE-AREA": UniMovableArea,
		"MOVABLE-VIEW": UniMovableView,
		ICON: UniIcon,
		"WEB-VIEW": UniWebView,
		CANVAS: UniCanvas,
		VIDEO: UniVideo,
		PICKER: UniPicker,
		AD: UniAd,
		MAP: UniMap,
		"LOCATION-PICKER": UniLocationPicker,
		"LOCATION-VIEW": UniLocationView,
		"COVER-IMAGE": UniCoverImage,
		"COVER-VIEW": UniCoverView,
		"LIVE-PLAYER": UniLivePlayer,
		EMBED: UniEmbed
	};
	function createElement(id$1, tag, parentNodeId, refNodeId) {
		var nodeJson = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {};
		var element;
		if (id$1 === 0) element = new UniNode(id$1, tag, parentNodeId, document.createElement(tag));
		else {
			var Component = BuiltInComponents[tag];
			if (Component) element = new Component(id$1, parentNodeId, refNodeId, nodeJson);
			else element = new UniElement(id$1, document.createElement(tag), parentNodeId, refNodeId, nodeJson);
		}
		setElement(id$1, element);
		return element;
	}
	var pageReadyCallbacks = [];
	var isPageReady = false;
	function onPageReady(callback) {
		if (isPageReady) return callback();
		pageReadyCallbacks.push(callback);
	}
	function setPageReady() {
		isPageReady = true;
		pageReadyCallbacks.forEach((fn) => {
			try {
				fn();
			} catch (e$1) {
				console.error(e$1);
			}
		});
		pageReadyCallbacks.length = 0;
	}
	function onPageCreated() {}
	function onPageCreate(_ref) {
		var { css, route, platform, pixelRatio: pixelRatio$1, windowWidth, disableScroll, statusbarHeight, windowTop, windowBottom, nvueFlexDirection } = _ref;
		initPageInfo(route);
		initSystemInfo(platform, pixelRatio$1, windowWidth);
		initPageElement();
		var pageId = plus.webview.currentWebview().id;
		window.__id__ = pageId;
		document.title = "".concat(route, "[").concat(pageId, "]");
		initCssVar(statusbarHeight, windowTop, windowBottom);
		if (disableScroll) document.addEventListener("touchmove", disableScrollListener);
		if (nvueFlexDirection) initPageNVueCss(nvueFlexDirection);
		if (css) initPageCss(route);
		else setPageReady();
	}
	function initPageInfo(route) {
		window.__PAGE_INFO__ = { route };
	}
	function initSystemInfo(platform, pixelRatio$1, windowWidth) {
		window.__SYSTEM_INFO__ = {
			platform,
			pixelRatio: pixelRatio$1,
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
		updateCssVar({
			"--window-left": "0px",
			"--window-right": "0px",
			"--window-top": windowTop + "px",
			"--window-bottom": windowBottom + "px",
			"--status-bar-height": statusbarHeight + "px"
		});
	}
	var isPageScrollInited = false;
	function initPageScroll(onReachBottomDistance) {
		if (isPageScrollInited) return;
		isPageScrollInited = true;
		var opts = {
			onReachBottomDistance,
			onPageScroll(scrollTop) {
				UniViewJSBridge.publishHandler(ON_PAGE_SCROLL, { scrollTop });
			},
			onReachBottom() {
				UniViewJSBridge.publishHandler(ON_REACH_BOTTOM);
			}
		};
		requestAnimationFrame(() => document.addEventListener("scroll", createScrollListener(opts)));
	}
	function pageScrollTo(_ref2, publish) {
		var { scrollTop, selector, duration } = _ref2;
		scrollTo(selector || scrollTop || 0, duration);
		publish();
	}
	function initPageNVueCss(nvueFlexDirection) {
		var element = document.createElement("style");
		element.innerHTML = nvueCss(nvueFlexDirection);
		document.head.appendChild(element);
	}
	function nvueCss(nvueFlexDirection) {
		return "\nuni-view,\nuni-label,\nuni-swiper-item,\nuni-scroll-view {\n  display: flex;\n  flex-shrink: 0;\n  flex-grow: 0;\n  flex-basis: auto;\n  align-items: stretch;\n  align-content: flex-start;\n}\n\nuni-button {\n  margin: 0;\n}\n\nuni-view,\nuni-label,\nuni-swiper-item {\n  flex-direction: ".concat(nvueFlexDirection, ";\n}\n\nuni-view,\nuni-image,\nuni-input,\nuni-scroll-view,\nuni-swiper,\nuni-swiper-item,\nuni-text,\nuni-textarea,\nuni-video {\n  position: relative;\n  border: 0px solid #000000;\n  box-sizing: border-box;\n}\n\nuni-swiper-item {\n  position: absolute;\n}\n");
	}
	function onVdSync(actions) {
		var firstAction = actions[0];
		if (firstAction[0] === 1) onPageCreateSync(firstAction);
		else onPageReady(() => onPageUpdateSync(actions));
	}
	function onPageCreateSync(action) {
		return onPageCreate(action[1]);
	}
	function onPageUpdateSync(actions) {
		var dictAction = actions[0];
		var getDict = createGetDict(dictAction[0] === 0 ? dictAction[1] : []);
		actions.forEach((action) => {
			switch (action[0]) {
				case 1: return onPageCreate(action[1]);
				case 2: return /* @__PURE__ */ onPageCreated();
				case 3:
					var parentNodeId = action[3];
					return createElement(action[1], getDict(action[2]), parentNodeId === -1 ? 0 : parentNodeId, action[4], decodeNodeJson(getDict, action[5]));
				case 4: return $(action[1]).insert(action[2], action[3], decodeNodeJson(getDict, action[4]));
				case 5: return $(action[1]).remove();
				case 6: return $(action[1]).setAttr(getDict(action[2]), getDict(action[3]));
				case 7: return $(action[1]).removeAttr(getDict(action[2]));
				case 8: return $(action[1]).addEvent(getDict(action[2]), action[3]);
				case 12: return $(action[1]).addWxsEvent(getDict(action[2]), getDict(action[3]), action[4]);
				case 9: return $(action[1]).removeEvent(getDict(action[2]));
				case 10: return $(action[1]).setText(getDict(action[2]));
				case 15: return initPageScroll(action[1]);
			}
		});
		flushPostActionJobs();
	}
	function initSubscribeHandlers() {
		var { subscribe } = UniViewJSBridge;
		subscribe(VD_SYNC, onVdSync);
		subscribe(API_SET_LOCALE, (local) => useI18n().setLocale(local));
		subscribe(ON_WEBVIEW_READY, onWebviewReady$1);
	}
	function onWebviewReady$1() {
		UniViewJSBridge.publishHandler(ON_WEBVIEW_READY);
	}
	function findElem(vm) {
		return window.__$__(vm).$;
	}
	function getRootInfo(fields$1) {
		var info = {};
		if (fields$1.id) info.id = "";
		if (fields$1.dataset) info.dataset = {};
		if (fields$1.rect) {
			info.left = 0;
			info.right = 0;
			info.top = 0;
			info.bottom = 0;
		}
		if (fields$1.size) {
			info.width = document.documentElement.clientWidth;
			info.height = document.documentElement.clientHeight;
		}
		if (fields$1.scrollOffset) {
			var documentElement = document.documentElement;
			var body = document.body;
			info.scrollLeft = documentElement.scrollLeft || body.scrollLeft || 0;
			info.scrollTop = documentElement.scrollTop || body.scrollTop || 0;
			info.scrollHeight = documentElement.scrollHeight || body.scrollHeight || 0;
			info.scrollWidth = documentElement.scrollWidth || body.scrollWidth || 0;
		}
		return info;
	}
	function getNodeInfo(el, fields$1) {
		var info = {};
		var { top, topWindowHeight } = getWindowOffset();
		if (fields$1.node) {
			var tagName = el.tagName.split("-")[1] || el.tagName;
			if (tagName) info.node = el.querySelector(tagName);
		}
		if (fields$1.id) info.id = el.id;
		if (fields$1.dataset) info.dataset = getCustomDataset(el);
		if (fields$1.rect || fields$1.size) {
			var rect = el.getBoundingClientRect();
			if (fields$1.rect) {
				info.left = rect.left;
				info.right = rect.right;
				info.top = rect.top - top - topWindowHeight;
				info.bottom = rect.bottom - top - topWindowHeight;
			}
			if (fields$1.size) {
				info.width = rect.width;
				info.height = rect.height;
			}
		}
		if (isArray(fields$1.properties)) fields$1.properties.forEach((prop) => {
			prop = prop.replace(/-([a-z])/g, function(e$1, t$1) {
				return t$1.toUpperCase();
			});
		});
		if (fields$1.scrollOffset) if (el.tagName === "UNI-SCROLL-VIEW" || false) {
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
		if (isArray(fields$1.computedStyle)) {
			var sytle = getComputedStyle(el);
			fields$1.computedStyle.forEach((name) => {
				info[name] = sytle[name];
			});
		}
		if (fields$1.context) info.contextInfo = getContextInfo(el);
		return info;
	}
	function findElm(component, pageVm$1) {
		if (!component) return pageVm$1.$el;
		return window.__$__(component).$;
	}
	function matches(element, selectors) {
		return (element.matches || element.matchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector || function(selectors$1) {
			var matches$1 = this.parentElement.querySelectorAll(selectors$1);
			var i$1 = matches$1.length;
			while (--i$1 >= 0 && matches$1.item(i$1) !== this);
			return i$1 > -1;
		}).call(element, selectors);
	}
	function getNodesInfo(pageVm$1, component, selector, single, fields$1) {
		var selfElement = findElm(component, pageVm$1);
		var parentElement = selfElement.parentElement;
		if (!parentElement) return single ? null : [];
		var { nodeType } = selfElement;
		var maybeFragment = nodeType === 3 || nodeType === 8;
		if (single) {
			var node = maybeFragment ? parentElement.querySelector(selector) : matches(selfElement, selector) ? selfElement : selfElement.querySelector(selector);
			if (node) return getNodeInfo(node, fields$1);
			return null;
		} else {
			var infos = [];
			var nodeList = (maybeFragment ? parentElement : selfElement).querySelectorAll(selector);
			if (nodeList && nodeList.length) [].forEach.call(nodeList, (node$1) => {
				infos.push(getNodeInfo(node$1, fields$1));
			});
			if (!maybeFragment && matches(selfElement, selector)) infos.unshift(getNodeInfo(selfElement, fields$1));
			return infos;
		}
	}
	function requestComponentInfo(page, reqs, callback) {
		var result = [];
		reqs.forEach((_ref) => {
			var { component, selector, single, fields: fields$1 } = _ref;
			if (component === null) result.push(getRootInfo(fields$1));
			else result.push(getNodesInfo(page, component, selector, single, fields$1));
		});
		callback(result);
	}
	function setCurrentPageMeta(_page, _ref) {
		var { pageStyle, rootFontSize } = _ref;
		if (pageStyle) (document.querySelector("uni-page-body") || document.body).setAttribute("style", pageStyle);
		if (rootFontSize && document.documentElement.style.fontSize !== rootFontSize) document.documentElement.style.fontSize = rootFontSize;
	}
	function addIntersectionObserver(_ref, _pageId) {
		var { reqId, component, options, callback } = _ref;
		var $el = findElem(component);
		($el.__io || ($el.__io = {}))[reqId] = requestComponentObserver($el, options, callback);
	}
	function removeIntersectionObserver(_ref2, _pageId) {
		var { reqId, component } = _ref2;
		var $el = findElem(component);
		var intersectionObserver = $el.__io && $el.__io[reqId];
		if (intersectionObserver) {
			intersectionObserver.disconnect();
			delete $el.__io[reqId];
		}
	}
	init_web_dom_iterable();
	var mediaQueryObservers = {};
	var listeners = {};
	function handleMediaQueryStr($props) {
		var mediaQueryArr = [];
		for (var item of [
			"width",
			"minWidth",
			"maxWidth",
			"height",
			"minHeight",
			"maxHeight",
			"orientation"
		]) {
			if (item !== "orientation" && $props[item] && Number($props[item] >= 0)) mediaQueryArr.push("(".concat(humpToLine(item), ": ").concat(Number($props[item]), "px)"));
			if (item === "orientation" && $props[item]) mediaQueryArr.push("(".concat(humpToLine(item), ": ").concat($props[item], ")"));
		}
		return mediaQueryArr.join(" and ");
	}
	function humpToLine(name) {
		return name.replace(/([A-Z])/g, "-$1").toLowerCase();
	}
	function addMediaQueryObserver(_ref, _pageId) {
		var { reqId, component, options, callback } = _ref;
		var mediaQueryObserver = mediaQueryObservers[reqId] = window.matchMedia(handleMediaQueryStr(options));
		var listener = listeners[reqId] = (observer) => callback(observer.matches);
		listener(mediaQueryObserver);
		mediaQueryObserver.addListener(listener);
	}
	function removeMediaQueryObserver(_ref2, _pageId) {
		var { reqId, component } = _ref2;
		var listener = listeners[reqId];
		var mediaQueryObserver = mediaQueryObservers[reqId];
		if (mediaQueryObserver) {
			mediaQueryObserver.removeListener(listener);
			delete listeners[reqId];
			delete mediaQueryObservers[reqId];
		}
	}
	function loadFontFace(_ref, publish) {
		var { family, source, desc } = _ref;
		if (source.startsWith("url(\"") || source.startsWith("url('")) source = "url('".concat(getRealPath(source.substring(5, source.length - 2)), "')");
		else if (source.startsWith("url(")) source = "url('".concat(getRealPath(source.substring(4, source.length - 1)), "')");
		else source = getRealPath(source);
		addFont(family, source, desc).then(() => {
			publish();
		}).catch((err$1) => {
			publish(err$1.toString());
		});
	}
	var pageVm = { $el: document.body };
	function initViewMethods() {
		var pageId = getCurrentPageId();
		subscribeViewMethod(pageId, (fn) => {
			return function() {
				for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
				onPageReady(() => {
					fn.apply(null, args);
				});
			};
		});
		registerViewMethod(pageId, "requestComponentInfo", (args, publish) => {
			requestComponentInfo(pageVm, args.reqs, publish);
		});
		registerViewMethod(pageId, "addIntersectionObserver", (args) => {
			addIntersectionObserver(extend({}, args, { callback(res) {
				UniViewJSBridge.publishHandler(args.eventName, res);
			} }));
		});
		registerViewMethod(pageId, "removeIntersectionObserver", (args) => {
			removeIntersectionObserver(args);
		});
		registerViewMethod(pageId, "addMediaQueryObserver", (args) => {
			addMediaQueryObserver(extend({}, args, { callback(res) {
				UniViewJSBridge.publishHandler(args.eventName, res);
			} }));
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
	window.plus = plus_default;
	window.uni = api_exports;
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
	if (typeof plus_default !== "undefined") onWebviewReady();
	else document.addEventListener("plusready", onWebviewReady);
});
