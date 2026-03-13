/**
  * @vue/compiler-sfc v3.6.0-beta.5
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") {
		for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) {
				__defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
		}
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let _vue_compiler_core = require("@vue/compiler-core");
let _vue_compiler_dom = require("@vue/compiler-dom");
_vue_compiler_dom = __toESM(_vue_compiler_dom);
let source_map_js = require("source-map-js");
let _vue_shared = require("@vue/shared");
let path = require("path");
path = __toESM(path);
let node_fs = require("node:fs");
let url = require("url");
let _vue_compiler_vapor = require("@vue/compiler-vapor");
_vue_compiler_vapor = __toESM(_vue_compiler_vapor);
let _vue_compiler_ssr = require("@vue/compiler-ssr");
_vue_compiler_ssr = __toESM(_vue_compiler_ssr);
let postcss = require("postcss");
postcss = __toESM(postcss);
let estree_walker = require("estree-walker");
let magic_string = require("magic-string");
magic_string = __toESM(magic_string);
let _babel_parser = require("@babel/parser");
let process$1 = require("process");
process$1 = __toESM(process$1);

//#region node_modules/.pnpm/hash-sum@2.0.0/node_modules/hash-sum/hash-sum.js
var require_hash_sum = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function pad(hash, len) {
		while (hash.length < len) hash = "0" + hash;
		return hash;
	}
	function fold(hash, text) {
		var i;
		var chr;
		var len;
		if (text.length === 0) return hash;
		for (i = 0, len = text.length; i < len; i++) {
			chr = text.charCodeAt(i);
			hash = (hash << 5) - hash + chr;
			hash |= 0;
		}
		return hash < 0 ? hash * -2 : hash;
	}
	function foldObject(hash, o, seen) {
		return Object.keys(o).sort().reduce(foldKey, hash);
		function foldKey(hash, key) {
			return foldValue(hash, o[key], key, seen);
		}
	}
	function foldValue(input, value, key, seen) {
		var hash = fold(fold(fold(input, key), toString(value)), typeof value);
		if (value === null) return fold(hash, "null");
		if (value === void 0) return fold(hash, "undefined");
		if (typeof value === "object" || typeof value === "function") {
			if (seen.indexOf(value) !== -1) return fold(hash, "[Circular]" + key);
			seen.push(value);
			var objHash = foldObject(hash, value, seen);
			if (!("valueOf" in value) || typeof value.valueOf !== "function") return objHash;
			try {
				return fold(objHash, String(value.valueOf()));
			} catch (err) {
				return fold(objHash, "[valueOf exception]" + (err.stack || err.message));
			}
		}
		return fold(hash, value.toString());
	}
	function toString(o) {
		return Object.prototype.toString.call(o);
	}
	function sum(o) {
		return pad(foldValue(0, o, "", []).toString(16), 8);
	}
	module.exports = sum;
}));

//#endregion
//#region packages/compiler-sfc/src/style/cssVars.ts
var import_hash_sum = /* @__PURE__ */ __toESM(require_hash_sum());
const CSS_VARS_HELPER = `useCssVars`;
function getCssVarsHelper(vapor) {
	return vapor ? `useVaporCssVars` : CSS_VARS_HELPER;
}
function genCssVarsFromList(vars, id, isProd, isSSR = false) {
	return `{\n  ${vars.map((key) => `"${isSSR ? `:--` : ``}${genVarName(id, key, isProd, isSSR)}": (${key})`).join(",\n  ")}\n}`;
}
function genVarName(id, raw, isProd, isSSR = false) {
	if (isProd) return (0, import_hash_sum.default)(id + raw).replace(/^\d/, (r) => `v${r}`);
	else return `${id}-${(0, _vue_shared.getEscapedCssVarName)(raw, isSSR)}`;
}
function normalizeExpression(exp) {
	exp = exp.trim();
	if (exp[0] === `'` && exp[exp.length - 1] === `'` || exp[0] === `"` && exp[exp.length - 1] === `"`) return exp.slice(1, -1);
	return exp;
}
const vBindRE = /v-bind\s*\(/g;
function parseCssVars(sfc) {
	const vars = [];
	sfc.styles.forEach((style) => {
		let match;
		const content = style.content.replace(/\/\*([\s\S]*?)\*\/|\/\/.*/g, "");
		while (match = vBindRE.exec(content)) {
			const start = match.index + match[0].length;
			const end = lexBinding(content, start);
			if (end !== null) {
				const variable = normalizeExpression(content.slice(start, end));
				if (!vars.includes(variable)) vars.push(variable);
			}
		}
	});
	return vars;
}
var LexerState = /* @__PURE__ */ function(LexerState) {
	LexerState[LexerState["inParens"] = 0] = "inParens";
	LexerState[LexerState["inSingleQuoteString"] = 1] = "inSingleQuoteString";
	LexerState[LexerState["inDoubleQuoteString"] = 2] = "inDoubleQuoteString";
	return LexerState;
}(LexerState || {});
function lexBinding(content, start) {
	let state = LexerState.inParens;
	let parenDepth = 0;
	for (let i = start; i < content.length; i++) {
		const char = content.charAt(i);
		switch (state) {
			case LexerState.inParens:
				if (char === `'`) state = LexerState.inSingleQuoteString;
				else if (char === `"`) state = LexerState.inDoubleQuoteString;
				else if (char === `(`) parenDepth++;
				else if (char === `)`) if (parenDepth > 0) parenDepth--;
				else return i;
				break;
			case LexerState.inSingleQuoteString:
				if (char === `'`) state = LexerState.inParens;
				break;
			case LexerState.inDoubleQuoteString:
				if (char === `"`) state = LexerState.inParens;
				break;
		}
	}
	return null;
}
const cssVarsPlugin = (opts) => {
	const { id, isProd } = opts;
	return {
		postcssPlugin: "vue-sfc-vars",
		Declaration(decl) {
			const value = decl.value;
			if (vBindRE.test(value)) {
				vBindRE.lastIndex = 0;
				let transformed = "";
				let lastIndex = 0;
				let match;
				while (match = vBindRE.exec(value)) {
					const start = match.index + match[0].length;
					const end = lexBinding(value, start);
					if (end !== null) {
						const variable = normalizeExpression(value.slice(start, end));
						transformed += value.slice(lastIndex, match.index) + `var(--${genVarName(id, variable, isProd)})`;
						lastIndex = end + 1;
					}
				}
				decl.value = transformed + value.slice(lastIndex);
			}
		}
	};
};
cssVarsPlugin.postcss = true;
function genCssVarsCode(vars, bindings, id, isProd, vapor) {
	const transformed = (0, _vue_compiler_dom.processExpression)((0, _vue_compiler_dom.createSimpleExpression)(genCssVarsFromList(vars, id, isProd), false), (0, _vue_compiler_dom.createTransformContext)((0, _vue_compiler_dom.createRoot)([]), {
		prefixIdentifiers: true,
		inline: true,
		bindingMetadata: bindings.__isScriptSetup === false ? void 0 : bindings
	}));
	const transformedString = transformed.type === 4 ? transformed.content : transformed.children.map((c) => {
		return typeof c === "string" ? c : c.content;
	}).join("");
	return `_${getCssVarsHelper(vapor)}(_ctx => (${transformedString}))`;
}
function genNormalScriptCssVarsCode(cssVars, bindings, id, isProd, defaultVar) {
	return `\nimport { ${CSS_VARS_HELPER} as _${CSS_VARS_HELPER} } from 'vue'\nconst __injectCSSVars__ = () => {\n${genCssVarsCode(cssVars, bindings, id, isProd)}}\nconst __setup__ = ${defaultVar}.setup\n${defaultVar}.setup = __setup__\n  ? (props, ctx) => { __injectCSSVars__();return __setup__(props, ctx) }\n  : __injectCSSVars__\n`;
}

//#endregion
//#region \0@oxc-project+runtime@0.111.0/helpers/checkPrivateRedeclaration.js
function _checkPrivateRedeclaration(e, t) {
	if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}

//#endregion
//#region \0@oxc-project+runtime@0.111.0/helpers/classPrivateMethodInitSpec.js
function _classPrivateMethodInitSpec(e, a) {
	_checkPrivateRedeclaration(e, a), a.add(e);
}

//#endregion
//#region \0@oxc-project+runtime@0.111.0/helpers/classPrivateFieldInitSpec.js
function _classPrivateFieldInitSpec(e, t, a) {
	_checkPrivateRedeclaration(e, t), t.set(e, a);
}

//#endregion
//#region \0@oxc-project+runtime@0.111.0/helpers/assertClassBrand.js
function _assertClassBrand(e, t, n) {
	if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw new TypeError("Private element is not present on this object");
}

//#endregion
//#region \0@oxc-project+runtime@0.111.0/helpers/classPrivateFieldGet2.js
function _classPrivateFieldGet2(s, a) {
	return s.get(_assertClassBrand(s, a));
}

//#endregion
//#region \0@oxc-project+runtime@0.111.0/helpers/classPrivateFieldSet2.js
function _classPrivateFieldSet2(s, a, r) {
	return s.set(_assertClassBrand(s, a), r), r;
}

//#endregion
//#region node_modules/.pnpm/lru-cache@10.1.0/node_modules/lru-cache/dist/esm/index.js
let _Symbol$iterator;
/**
* @module LRUCache
*/
const perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
const warned = /* @__PURE__ */ new Set();
/* c8 ignore start */
const PROCESS = typeof process === "object" && !!process ? process : {};
/* c8 ignore start */
const emitWarning = (msg, type, code, fn) => {
	typeof PROCESS.emitWarning === "function" ? PROCESS.emitWarning(msg, type, code, fn) : console.error(`[${code}] ${type}: ${msg}`);
};
let AC = globalThis.AbortController;
let AS = globalThis.AbortSignal;
/* c8 ignore start */
if (typeof AC === "undefined") {
	var _PROCESS$env;
	AS = class AbortSignal {
		constructor() {
			this._onabort = [];
			this.aborted = false;
		}
		addEventListener(_, fn) {
			this._onabort.push(fn);
		}
	};
	AC = class AbortController {
		constructor() {
			this.signal = new AS();
			warnACPolyfill();
		}
		abort(reason) {
			var _this$signal$onabort, _this$signal;
			if (this.signal.aborted) return;
			this.signal.reason = reason;
			this.signal.aborted = true;
			for (const fn of this.signal._onabort) fn(reason);
			(_this$signal$onabort = (_this$signal = this.signal).onabort) === null || _this$signal$onabort === void 0 || _this$signal$onabort.call(_this$signal, reason);
		}
	};
	let printACPolyfillWarning = ((_PROCESS$env = PROCESS.env) === null || _PROCESS$env === void 0 ? void 0 : _PROCESS$env.LRU_CACHE_IGNORE_AC_WARNING) !== "1";
	const warnACPolyfill = () => {
		if (!printACPolyfillWarning) return;
		printACPolyfillWarning = false;
		emitWarning("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", warnACPolyfill);
	};
}
/* c8 ignore stop */
const shouldWarn = (code) => !warned.has(code);
const isPosInt = (n) => n && n === Math.floor(n) && n > 0 && isFinite(n);
/* c8 ignore start */
const getUintArray = (max) => !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
/* c8 ignore stop */
var ZeroArray = class extends Array {
	constructor(size) {
		super(size);
		this.fill(0);
	}
};
var Stack = class Stack {
	static create(max) {
		const HeapCls = getUintArray(max);
		if (!HeapCls) return [];
		_constructing._ = true;
		const s = new Stack(max, HeapCls);
		_constructing._ = false;
		return s;
	}
	constructor(max, HeapCls) {
		/* c8 ignore start */
		if (!_constructing._) throw new TypeError("instantiate Stack using Stack.create(n)");
		/* c8 ignore stop */
		this.heap = new HeapCls(max);
		this.length = 0;
	}
	push(n) {
		this.heap[this.length++] = n;
	}
	pop() {
		return this.heap[--this.length];
	}
};
var _constructing = { _: false };
var _max = /* @__PURE__ */ new WeakMap();
var _maxSize = /* @__PURE__ */ new WeakMap();
var _dispose = /* @__PURE__ */ new WeakMap();
var _disposeAfter = /* @__PURE__ */ new WeakMap();
var _fetchMethod = /* @__PURE__ */ new WeakMap();
var _size = /* @__PURE__ */ new WeakMap();
var _calculatedSize = /* @__PURE__ */ new WeakMap();
var _keyMap = /* @__PURE__ */ new WeakMap();
var _keyList = /* @__PURE__ */ new WeakMap();
var _valList = /* @__PURE__ */ new WeakMap();
var _next = /* @__PURE__ */ new WeakMap();
var _prev = /* @__PURE__ */ new WeakMap();
var _head = /* @__PURE__ */ new WeakMap();
var _tail = /* @__PURE__ */ new WeakMap();
var _free = /* @__PURE__ */ new WeakMap();
var _disposed = /* @__PURE__ */ new WeakMap();
var _sizes = /* @__PURE__ */ new WeakMap();
var _starts = /* @__PURE__ */ new WeakMap();
var _ttls = /* @__PURE__ */ new WeakMap();
var _hasDispose = /* @__PURE__ */ new WeakMap();
var _hasFetchMethod = /* @__PURE__ */ new WeakMap();
var _hasDisposeAfter = /* @__PURE__ */ new WeakMap();
var _LRUCache_brand = /* @__PURE__ */ new WeakSet();
var _updateItemAge = /* @__PURE__ */ new WeakMap();
var _statusTTL = /* @__PURE__ */ new WeakMap();
var _setItemTTL = /* @__PURE__ */ new WeakMap();
var _isStale = /* @__PURE__ */ new WeakMap();
var _removeItemSize = /* @__PURE__ */ new WeakMap();
var _addItemSize = /* @__PURE__ */ new WeakMap();
var _requireSize = /* @__PURE__ */ new WeakMap();
_Symbol$iterator = Symbol.iterator;
/**
* Default export, the thing you're using this module to get.
*
* All properties from the options object (with the exception of
* {@link OptionsBase.max} and {@link OptionsBase.maxSize}) are added as
* normal public members. (`max` and `maxBase` are read-only getters.)
* Changing any of these will alter the defaults for subsequent method calls,
* but is otherwise safe.
*/
var LRUCache = class LRUCache {
	/**
	* Do not call this method unless you need to inspect the
	* inner workings of the cache.  If anything returned by this
	* object is modified in any way, strange breakage may occur.
	*
	* These fields are private for a reason!
	*
	* @internal
	*/
	static unsafeExposeInternals(c) {
		return {
			starts: _classPrivateFieldGet2(_starts, c),
			ttls: _classPrivateFieldGet2(_ttls, c),
			sizes: _classPrivateFieldGet2(_sizes, c),
			keyMap: _classPrivateFieldGet2(_keyMap, c),
			keyList: _classPrivateFieldGet2(_keyList, c),
			valList: _classPrivateFieldGet2(_valList, c),
			next: _classPrivateFieldGet2(_next, c),
			prev: _classPrivateFieldGet2(_prev, c),
			get head() {
				return _classPrivateFieldGet2(_head, c);
			},
			get tail() {
				return _classPrivateFieldGet2(_tail, c);
			},
			free: _classPrivateFieldGet2(_free, c),
			isBackgroundFetch: (p) => _assertClassBrand(_LRUCache_brand, c, _isBackgroundFetch).call(c, p),
			backgroundFetch: (k, index, options, context) => _assertClassBrand(_LRUCache_brand, c, _backgroundFetch).call(c, k, index, options, context),
			moveToTail: (index) => _assertClassBrand(_LRUCache_brand, c, _moveToTail).call(c, index),
			indexes: (options) => _assertClassBrand(_LRUCache_brand, c, _indexes).call(c, options),
			rindexes: (options) => _assertClassBrand(_LRUCache_brand, c, _rindexes).call(c, options),
			isStale: (index) => _classPrivateFieldGet2(_isStale, c).call(c, index)
		};
	}
	/**
	* {@link LRUCache.OptionsBase.max} (read-only)
	*/
	get max() {
		return _classPrivateFieldGet2(_max, this);
	}
	/**
	* {@link LRUCache.OptionsBase.maxSize} (read-only)
	*/
	get maxSize() {
		return _classPrivateFieldGet2(_maxSize, this);
	}
	/**
	* The total computed size of items in the cache (read-only)
	*/
	get calculatedSize() {
		return _classPrivateFieldGet2(_calculatedSize, this);
	}
	/**
	* The number of items stored in the cache (read-only)
	*/
	get size() {
		return _classPrivateFieldGet2(_size, this);
	}
	/**
	* {@link LRUCache.OptionsBase.fetchMethod} (read-only)
	*/
	get fetchMethod() {
		return _classPrivateFieldGet2(_fetchMethod, this);
	}
	/**
	* {@link LRUCache.OptionsBase.dispose} (read-only)
	*/
	get dispose() {
		return _classPrivateFieldGet2(_dispose, this);
	}
	/**
	* {@link LRUCache.OptionsBase.disposeAfter} (read-only)
	*/
	get disposeAfter() {
		return _classPrivateFieldGet2(_disposeAfter, this);
	}
	constructor(options) {
		_classPrivateMethodInitSpec(this, _LRUCache_brand);
		_classPrivateFieldInitSpec(this, _max, void 0);
		_classPrivateFieldInitSpec(this, _maxSize, void 0);
		_classPrivateFieldInitSpec(this, _dispose, void 0);
		_classPrivateFieldInitSpec(this, _disposeAfter, void 0);
		_classPrivateFieldInitSpec(this, _fetchMethod, void 0);
		_classPrivateFieldInitSpec(this, _size, void 0);
		_classPrivateFieldInitSpec(this, _calculatedSize, void 0);
		_classPrivateFieldInitSpec(this, _keyMap, void 0);
		_classPrivateFieldInitSpec(this, _keyList, void 0);
		_classPrivateFieldInitSpec(this, _valList, void 0);
		_classPrivateFieldInitSpec(this, _next, void 0);
		_classPrivateFieldInitSpec(this, _prev, void 0);
		_classPrivateFieldInitSpec(this, _head, void 0);
		_classPrivateFieldInitSpec(this, _tail, void 0);
		_classPrivateFieldInitSpec(this, _free, void 0);
		_classPrivateFieldInitSpec(this, _disposed, void 0);
		_classPrivateFieldInitSpec(this, _sizes, void 0);
		_classPrivateFieldInitSpec(this, _starts, void 0);
		_classPrivateFieldInitSpec(this, _ttls, void 0);
		_classPrivateFieldInitSpec(this, _hasDispose, void 0);
		_classPrivateFieldInitSpec(this, _hasFetchMethod, void 0);
		_classPrivateFieldInitSpec(this, _hasDisposeAfter, void 0);
		_classPrivateFieldInitSpec(this, _updateItemAge, () => {});
		_classPrivateFieldInitSpec(this, _statusTTL, () => {});
		_classPrivateFieldInitSpec(this, _setItemTTL, () => {});
		_classPrivateFieldInitSpec(this, _isStale, () => false);
		_classPrivateFieldInitSpec(this, _removeItemSize, (_i) => {});
		_classPrivateFieldInitSpec(this, _addItemSize, (_i, _s, _st) => {});
		_classPrivateFieldInitSpec(this, _requireSize, (_k, _v, size, sizeCalculation) => {
			if (size || sizeCalculation) throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
			return 0;
		});
		const { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort } = options;
		if (max !== 0 && !isPosInt(max)) throw new TypeError("max option must be a nonnegative integer");
		const UintArray = max ? getUintArray(max) : Array;
		if (!UintArray) throw new Error("invalid max value: " + max);
		_classPrivateFieldSet2(_max, this, max);
		_classPrivateFieldSet2(_maxSize, this, maxSize);
		this.maxEntrySize = maxEntrySize || _classPrivateFieldGet2(_maxSize, this);
		this.sizeCalculation = sizeCalculation;
		if (this.sizeCalculation) {
			if (!_classPrivateFieldGet2(_maxSize, this) && !this.maxEntrySize) throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
			if (typeof this.sizeCalculation !== "function") throw new TypeError("sizeCalculation set to non-function");
		}
		if (fetchMethod !== void 0 && typeof fetchMethod !== "function") throw new TypeError("fetchMethod must be a function if specified");
		_classPrivateFieldSet2(_fetchMethod, this, fetchMethod);
		_classPrivateFieldSet2(_hasFetchMethod, this, !!fetchMethod);
		_classPrivateFieldSet2(_keyMap, this, /* @__PURE__ */ new Map());
		_classPrivateFieldSet2(_keyList, this, new Array(max).fill(void 0));
		_classPrivateFieldSet2(_valList, this, new Array(max).fill(void 0));
		_classPrivateFieldSet2(_next, this, new UintArray(max));
		_classPrivateFieldSet2(_prev, this, new UintArray(max));
		_classPrivateFieldSet2(_head, this, 0);
		_classPrivateFieldSet2(_tail, this, 0);
		_classPrivateFieldSet2(_free, this, Stack.create(max));
		_classPrivateFieldSet2(_size, this, 0);
		_classPrivateFieldSet2(_calculatedSize, this, 0);
		if (typeof dispose === "function") _classPrivateFieldSet2(_dispose, this, dispose);
		if (typeof disposeAfter === "function") {
			_classPrivateFieldSet2(_disposeAfter, this, disposeAfter);
			_classPrivateFieldSet2(_disposed, this, []);
		} else {
			_classPrivateFieldSet2(_disposeAfter, this, void 0);
			_classPrivateFieldSet2(_disposed, this, void 0);
		}
		_classPrivateFieldSet2(_hasDispose, this, !!_classPrivateFieldGet2(_dispose, this));
		_classPrivateFieldSet2(_hasDisposeAfter, this, !!_classPrivateFieldGet2(_disposeAfter, this));
		this.noDisposeOnSet = !!noDisposeOnSet;
		this.noUpdateTTL = !!noUpdateTTL;
		this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
		this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
		this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
		this.ignoreFetchAbort = !!ignoreFetchAbort;
		if (this.maxEntrySize !== 0) {
			if (_classPrivateFieldGet2(_maxSize, this) !== 0) {
				if (!isPosInt(_classPrivateFieldGet2(_maxSize, this))) throw new TypeError("maxSize must be a positive integer if specified");
			}
			if (!isPosInt(this.maxEntrySize)) throw new TypeError("maxEntrySize must be a positive integer if specified");
			_assertClassBrand(_LRUCache_brand, this, _initializeSizeTracking).call(this);
		}
		this.allowStale = !!allowStale;
		this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
		this.updateAgeOnGet = !!updateAgeOnGet;
		this.updateAgeOnHas = !!updateAgeOnHas;
		this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
		this.ttlAutopurge = !!ttlAutopurge;
		this.ttl = ttl || 0;
		if (this.ttl) {
			if (!isPosInt(this.ttl)) throw new TypeError("ttl must be a positive integer if specified");
			_assertClassBrand(_LRUCache_brand, this, _initializeTTLTracking).call(this);
		}
		if (_classPrivateFieldGet2(_max, this) === 0 && this.ttl === 0 && _classPrivateFieldGet2(_maxSize, this) === 0) throw new TypeError("At least one of max, maxSize, or ttl is required");
		if (!this.ttlAutopurge && !_classPrivateFieldGet2(_max, this) && !_classPrivateFieldGet2(_maxSize, this)) {
			const code = "LRU_CACHE_UNBOUNDED";
			if (shouldWarn(code)) {
				warned.add(code);
				emitWarning("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", code, LRUCache);
			}
		}
	}
	/**
	* Return the remaining TTL time for a given entry key
	*/
	getRemainingTTL(key) {
		return _classPrivateFieldGet2(_keyMap, this).has(key) ? Infinity : 0;
	}
	/**
	* Return a generator yielding `[key, value]` pairs,
	* in order from most recently used to least recently used.
	*/
	*entries() {
		for (const i of _assertClassBrand(_LRUCache_brand, this, _indexes).call(this)) if (_classPrivateFieldGet2(_valList, this)[i] !== void 0 && _classPrivateFieldGet2(_keyList, this)[i] !== void 0 && !_assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, _classPrivateFieldGet2(_valList, this)[i])) yield [_classPrivateFieldGet2(_keyList, this)[i], _classPrivateFieldGet2(_valList, this)[i]];
	}
	/**
	* Inverse order version of {@link LRUCache.entries}
	*
	* Return a generator yielding `[key, value]` pairs,
	* in order from least recently used to most recently used.
	*/
	*rentries() {
		for (const i of _assertClassBrand(_LRUCache_brand, this, _rindexes).call(this)) if (_classPrivateFieldGet2(_valList, this)[i] !== void 0 && _classPrivateFieldGet2(_keyList, this)[i] !== void 0 && !_assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, _classPrivateFieldGet2(_valList, this)[i])) yield [_classPrivateFieldGet2(_keyList, this)[i], _classPrivateFieldGet2(_valList, this)[i]];
	}
	/**
	* Return a generator yielding the keys in the cache,
	* in order from most recently used to least recently used.
	*/
	*keys() {
		for (const i of _assertClassBrand(_LRUCache_brand, this, _indexes).call(this)) {
			const k = _classPrivateFieldGet2(_keyList, this)[i];
			if (k !== void 0 && !_assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, _classPrivateFieldGet2(_valList, this)[i])) yield k;
		}
	}
	/**
	* Inverse order version of {@link LRUCache.keys}
	*
	* Return a generator yielding the keys in the cache,
	* in order from least recently used to most recently used.
	*/
	*rkeys() {
		for (const i of _assertClassBrand(_LRUCache_brand, this, _rindexes).call(this)) {
			const k = _classPrivateFieldGet2(_keyList, this)[i];
			if (k !== void 0 && !_assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, _classPrivateFieldGet2(_valList, this)[i])) yield k;
		}
	}
	/**
	* Return a generator yielding the values in the cache,
	* in order from most recently used to least recently used.
	*/
	*values() {
		for (const i of _assertClassBrand(_LRUCache_brand, this, _indexes).call(this)) if (_classPrivateFieldGet2(_valList, this)[i] !== void 0 && !_assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, _classPrivateFieldGet2(_valList, this)[i])) yield _classPrivateFieldGet2(_valList, this)[i];
	}
	/**
	* Inverse order version of {@link LRUCache.values}
	*
	* Return a generator yielding the values in the cache,
	* in order from least recently used to most recently used.
	*/
	*rvalues() {
		for (const i of _assertClassBrand(_LRUCache_brand, this, _rindexes).call(this)) if (_classPrivateFieldGet2(_valList, this)[i] !== void 0 && !_assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, _classPrivateFieldGet2(_valList, this)[i])) yield _classPrivateFieldGet2(_valList, this)[i];
	}
	/**
	* Iterating over the cache itself yields the same results as
	* {@link LRUCache.entries}
	*/
	[_Symbol$iterator]() {
		return this.entries();
	}
	/**
	* Find a value for which the supplied fn method returns a truthy value,
	* similar to Array.find().  fn is called as fn(value, key, cache).
	*/
	find(fn, getOptions = {}) {
		for (const i of _assertClassBrand(_LRUCache_brand, this, _indexes).call(this)) {
			const v = _classPrivateFieldGet2(_valList, this)[i];
			const value = _assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, v) ? v.__staleWhileFetching : v;
			if (value === void 0) continue;
			if (fn(value, _classPrivateFieldGet2(_keyList, this)[i], this)) return this.get(_classPrivateFieldGet2(_keyList, this)[i], getOptions);
		}
	}
	/**
	* Call the supplied function on each item in the cache, in order from
	* most recently used to least recently used.  fn is called as
	* fn(value, key, cache).  Does not update age or recenty of use.
	* Does not iterate over stale values.
	*/
	forEach(fn, thisp = this) {
		for (const i of _assertClassBrand(_LRUCache_brand, this, _indexes).call(this)) {
			const v = _classPrivateFieldGet2(_valList, this)[i];
			const value = _assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, v) ? v.__staleWhileFetching : v;
			if (value === void 0) continue;
			fn.call(thisp, value, _classPrivateFieldGet2(_keyList, this)[i], this);
		}
	}
	/**
	* The same as {@link LRUCache.forEach} but items are iterated over in
	* reverse order.  (ie, less recently used items are iterated over first.)
	*/
	rforEach(fn, thisp = this) {
		for (const i of _assertClassBrand(_LRUCache_brand, this, _rindexes).call(this)) {
			const v = _classPrivateFieldGet2(_valList, this)[i];
			const value = _assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, v) ? v.__staleWhileFetching : v;
			if (value === void 0) continue;
			fn.call(thisp, value, _classPrivateFieldGet2(_keyList, this)[i], this);
		}
	}
	/**
	* Delete any stale entries. Returns true if anything was removed,
	* false otherwise.
	*/
	purgeStale() {
		let deleted = false;
		for (const i of _assertClassBrand(_LRUCache_brand, this, _rindexes).call(this, { allowStale: true })) if (_classPrivateFieldGet2(_isStale, this).call(this, i)) {
			this.delete(_classPrivateFieldGet2(_keyList, this)[i]);
			deleted = true;
		}
		return deleted;
	}
	/**
	* Get the extended info about a given entry, to get its value, size, and
	* TTL info simultaneously. Like {@link LRUCache#dump}, but just for a
	* single key. Always returns stale values, if their info is found in the
	* cache, so be sure to check for expired TTLs if relevant.
	*/
	info(key) {
		const i = _classPrivateFieldGet2(_keyMap, this).get(key);
		if (i === void 0) return void 0;
		const v = _classPrivateFieldGet2(_valList, this)[i];
		const value = _assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, v) ? v.__staleWhileFetching : v;
		if (value === void 0) return void 0;
		const entry = { value };
		if (_classPrivateFieldGet2(_ttls, this) && _classPrivateFieldGet2(_starts, this)) {
			const ttl = _classPrivateFieldGet2(_ttls, this)[i];
			const start = _classPrivateFieldGet2(_starts, this)[i];
			if (ttl && start) {
				entry.ttl = ttl - (perf.now() - start);
				entry.start = Date.now();
			}
		}
		if (_classPrivateFieldGet2(_sizes, this)) entry.size = _classPrivateFieldGet2(_sizes, this)[i];
		return entry;
	}
	/**
	* Return an array of [key, {@link LRUCache.Entry}] tuples which can be
	* passed to cache.load()
	*/
	dump() {
		const arr = [];
		for (const i of _assertClassBrand(_LRUCache_brand, this, _indexes).call(this, { allowStale: true })) {
			const key = _classPrivateFieldGet2(_keyList, this)[i];
			const v = _classPrivateFieldGet2(_valList, this)[i];
			const value = _assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, v) ? v.__staleWhileFetching : v;
			if (value === void 0 || key === void 0) continue;
			const entry = { value };
			if (_classPrivateFieldGet2(_ttls, this) && _classPrivateFieldGet2(_starts, this)) {
				entry.ttl = _classPrivateFieldGet2(_ttls, this)[i];
				const age = perf.now() - _classPrivateFieldGet2(_starts, this)[i];
				entry.start = Math.floor(Date.now() - age);
			}
			if (_classPrivateFieldGet2(_sizes, this)) entry.size = _classPrivateFieldGet2(_sizes, this)[i];
			arr.unshift([key, entry]);
		}
		return arr;
	}
	/**
	* Reset the cache and load in the items in entries in the order listed.
	* Note that the shape of the resulting cache may be different if the
	* same options are not used in both caches.
	*/
	load(arr) {
		this.clear();
		for (const [key, entry] of arr) {
			if (entry.start) {
				const age = Date.now() - entry.start;
				entry.start = perf.now() - age;
			}
			this.set(key, entry.value, entry);
		}
	}
	/**
	* Add a value to the cache.
	*
	* Note: if `undefined` is specified as a value, this is an alias for
	* {@link LRUCache#delete}
	*/
	set(k, v, setOptions = {}) {
		if (v === void 0) {
			this.delete(k);
			return this;
		}
		const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions;
		let { noUpdateTTL = this.noUpdateTTL } = setOptions;
		const size = _classPrivateFieldGet2(_requireSize, this).call(this, k, v, setOptions.size || 0, sizeCalculation);
		if (this.maxEntrySize && size > this.maxEntrySize) {
			if (status) {
				status.set = "miss";
				status.maxEntrySizeExceeded = true;
			}
			this.delete(k);
			return this;
		}
		let index = _classPrivateFieldGet2(_size, this) === 0 ? void 0 : _classPrivateFieldGet2(_keyMap, this).get(k);
		if (index === void 0) {
			var _this$size;
			index = _classPrivateFieldGet2(_size, this) === 0 ? _classPrivateFieldGet2(_tail, this) : _classPrivateFieldGet2(_free, this).length !== 0 ? _classPrivateFieldGet2(_free, this).pop() : _classPrivateFieldGet2(_size, this) === _classPrivateFieldGet2(_max, this) ? _assertClassBrand(_LRUCache_brand, this, _evict).call(this, false) : _classPrivateFieldGet2(_size, this);
			_classPrivateFieldGet2(_keyList, this)[index] = k;
			_classPrivateFieldGet2(_valList, this)[index] = v;
			_classPrivateFieldGet2(_keyMap, this).set(k, index);
			_classPrivateFieldGet2(_next, this)[_classPrivateFieldGet2(_tail, this)] = index;
			_classPrivateFieldGet2(_prev, this)[index] = _classPrivateFieldGet2(_tail, this);
			_classPrivateFieldSet2(_tail, this, index);
			_classPrivateFieldSet2(_size, this, (_this$size = _classPrivateFieldGet2(_size, this), _this$size++, _this$size));
			_classPrivateFieldGet2(_addItemSize, this).call(this, index, size, status);
			if (status) status.set = "add";
			noUpdateTTL = false;
		} else {
			_assertClassBrand(_LRUCache_brand, this, _moveToTail).call(this, index);
			const oldVal = _classPrivateFieldGet2(_valList, this)[index];
			if (v !== oldVal) {
				if (_classPrivateFieldGet2(_hasFetchMethod, this) && _assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, oldVal)) {
					oldVal.__abortController.abort(/* @__PURE__ */ new Error("replaced"));
					const { __staleWhileFetching: s } = oldVal;
					if (s !== void 0 && !noDisposeOnSet) {
						if (_classPrivateFieldGet2(_hasDispose, this)) {
							var _classPrivateFieldGet2$2;
							(_classPrivateFieldGet2$2 = _classPrivateFieldGet2(_dispose, this)) === null || _classPrivateFieldGet2$2 === void 0 || _classPrivateFieldGet2$2.call(this, s, k, "set");
						}
						if (_classPrivateFieldGet2(_hasDisposeAfter, this)) {
							var _classPrivateFieldGet3;
							(_classPrivateFieldGet3 = _classPrivateFieldGet2(_disposed, this)) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.push([
								s,
								k,
								"set"
							]);
						}
					}
				} else if (!noDisposeOnSet) {
					if (_classPrivateFieldGet2(_hasDispose, this)) {
						var _classPrivateFieldGet4;
						(_classPrivateFieldGet4 = _classPrivateFieldGet2(_dispose, this)) === null || _classPrivateFieldGet4 === void 0 || _classPrivateFieldGet4.call(this, oldVal, k, "set");
					}
					if (_classPrivateFieldGet2(_hasDisposeAfter, this)) {
						var _classPrivateFieldGet5;
						(_classPrivateFieldGet5 = _classPrivateFieldGet2(_disposed, this)) === null || _classPrivateFieldGet5 === void 0 || _classPrivateFieldGet5.push([
							oldVal,
							k,
							"set"
						]);
					}
				}
				_classPrivateFieldGet2(_removeItemSize, this).call(this, index);
				_classPrivateFieldGet2(_addItemSize, this).call(this, index, size, status);
				_classPrivateFieldGet2(_valList, this)[index] = v;
				if (status) {
					status.set = "replace";
					const oldValue = oldVal && _assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, oldVal) ? oldVal.__staleWhileFetching : oldVal;
					if (oldValue !== void 0) status.oldValue = oldValue;
				}
			} else if (status) status.set = "update";
		}
		if (ttl !== 0 && !_classPrivateFieldGet2(_ttls, this)) _assertClassBrand(_LRUCache_brand, this, _initializeTTLTracking).call(this);
		if (_classPrivateFieldGet2(_ttls, this)) {
			if (!noUpdateTTL) _classPrivateFieldGet2(_setItemTTL, this).call(this, index, ttl, start);
			if (status) _classPrivateFieldGet2(_statusTTL, this).call(this, status, index);
		}
		if (!noDisposeOnSet && _classPrivateFieldGet2(_hasDisposeAfter, this) && _classPrivateFieldGet2(_disposed, this)) {
			const dt = _classPrivateFieldGet2(_disposed, this);
			let task;
			while (task = dt === null || dt === void 0 ? void 0 : dt.shift()) {
				var _classPrivateFieldGet6;
				(_classPrivateFieldGet6 = _classPrivateFieldGet2(_disposeAfter, this)) === null || _classPrivateFieldGet6 === void 0 || _classPrivateFieldGet6.call(this, ...task);
			}
		}
		return this;
	}
	/**
	* Evict the least recently used item, returning its value or
	* `undefined` if cache is empty.
	*/
	pop() {
		try {
			while (_classPrivateFieldGet2(_size, this)) {
				const val = _classPrivateFieldGet2(_valList, this)[_classPrivateFieldGet2(_head, this)];
				_assertClassBrand(_LRUCache_brand, this, _evict).call(this, true);
				if (_assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, val)) {
					if (val.__staleWhileFetching) return val.__staleWhileFetching;
				} else if (val !== void 0) return val;
			}
		} finally {
			if (_classPrivateFieldGet2(_hasDisposeAfter, this) && _classPrivateFieldGet2(_disposed, this)) {
				const dt = _classPrivateFieldGet2(_disposed, this);
				let task;
				while (task = dt === null || dt === void 0 ? void 0 : dt.shift()) {
					var _classPrivateFieldGet7;
					(_classPrivateFieldGet7 = _classPrivateFieldGet2(_disposeAfter, this)) === null || _classPrivateFieldGet7 === void 0 || _classPrivateFieldGet7.call(this, ...task);
				}
			}
		}
	}
	/**
	* Check if a key is in the cache, without updating the recency of use.
	* Will return false if the item is stale, even though it is technically
	* in the cache.
	*
	* Will not update item age unless
	* {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
	*/
	has(k, hasOptions = {}) {
		const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
		const index = _classPrivateFieldGet2(_keyMap, this).get(k);
		if (index !== void 0) {
			const v = _classPrivateFieldGet2(_valList, this)[index];
			if (_assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, v) && v.__staleWhileFetching === void 0) return false;
			if (!_classPrivateFieldGet2(_isStale, this).call(this, index)) {
				if (updateAgeOnHas) _classPrivateFieldGet2(_updateItemAge, this).call(this, index);
				if (status) {
					status.has = "hit";
					_classPrivateFieldGet2(_statusTTL, this).call(this, status, index);
				}
				return true;
			} else if (status) {
				status.has = "stale";
				_classPrivateFieldGet2(_statusTTL, this).call(this, status, index);
			}
		} else if (status) status.has = "miss";
		return false;
	}
	/**
	* Like {@link LRUCache#get} but doesn't update recency or delete stale
	* items.
	*
	* Returns `undefined` if the item is stale, unless
	* {@link LRUCache.OptionsBase.allowStale} is set.
	*/
	peek(k, peekOptions = {}) {
		const { allowStale = this.allowStale } = peekOptions;
		const index = _classPrivateFieldGet2(_keyMap, this).get(k);
		if (index === void 0 || !allowStale && _classPrivateFieldGet2(_isStale, this).call(this, index)) return;
		const v = _classPrivateFieldGet2(_valList, this)[index];
		return _assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, v) ? v.__staleWhileFetching : v;
	}
	async fetch(k, fetchOptions = {}) {
		const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, ttl = this.ttl, noDisposeOnSet = this.noDisposeOnSet, size = 0, sizeCalculation = this.sizeCalculation, noUpdateTTL = this.noUpdateTTL, noDeleteOnFetchRejection = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection = this.allowStaleOnFetchRejection, ignoreFetchAbort = this.ignoreFetchAbort, allowStaleOnFetchAbort = this.allowStaleOnFetchAbort, context, forceRefresh = false, status, signal } = fetchOptions;
		if (!_classPrivateFieldGet2(_hasFetchMethod, this)) {
			if (status) status.fetch = "get";
			return this.get(k, {
				allowStale,
				updateAgeOnGet,
				noDeleteOnStaleGet,
				status
			});
		}
		const options = {
			allowStale,
			updateAgeOnGet,
			noDeleteOnStaleGet,
			ttl,
			noDisposeOnSet,
			size,
			sizeCalculation,
			noUpdateTTL,
			noDeleteOnFetchRejection,
			allowStaleOnFetchRejection,
			allowStaleOnFetchAbort,
			ignoreFetchAbort,
			status,
			signal
		};
		let index = _classPrivateFieldGet2(_keyMap, this).get(k);
		if (index === void 0) {
			if (status) status.fetch = "miss";
			const p = _assertClassBrand(_LRUCache_brand, this, _backgroundFetch).call(this, k, index, options, context);
			return p.__returned = p;
		} else {
			const v = _classPrivateFieldGet2(_valList, this)[index];
			if (_assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, v)) {
				const stale = allowStale && v.__staleWhileFetching !== void 0;
				if (status) {
					status.fetch = "inflight";
					if (stale) status.returnedStale = true;
				}
				return stale ? v.__staleWhileFetching : v.__returned = v;
			}
			const isStale = _classPrivateFieldGet2(_isStale, this).call(this, index);
			if (!forceRefresh && !isStale) {
				if (status) status.fetch = "hit";
				_assertClassBrand(_LRUCache_brand, this, _moveToTail).call(this, index);
				if (updateAgeOnGet) _classPrivateFieldGet2(_updateItemAge, this).call(this, index);
				if (status) _classPrivateFieldGet2(_statusTTL, this).call(this, status, index);
				return v;
			}
			const p = _assertClassBrand(_LRUCache_brand, this, _backgroundFetch).call(this, k, index, options, context);
			const staleVal = p.__staleWhileFetching !== void 0 && allowStale;
			if (status) {
				status.fetch = isStale ? "stale" : "refresh";
				if (staleVal && isStale) status.returnedStale = true;
			}
			return staleVal ? p.__staleWhileFetching : p.__returned = p;
		}
	}
	/**
	* Return a value from the cache. Will update the recency of the cache
	* entry found.
	*
	* If the key is not found, get() will return `undefined`.
	*/
	get(k, getOptions = {}) {
		const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status } = getOptions;
		const index = _classPrivateFieldGet2(_keyMap, this).get(k);
		if (index !== void 0) {
			const value = _classPrivateFieldGet2(_valList, this)[index];
			const fetching = _assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, value);
			if (status) _classPrivateFieldGet2(_statusTTL, this).call(this, status, index);
			if (_classPrivateFieldGet2(_isStale, this).call(this, index)) {
				if (status) status.get = "stale";
				if (!fetching) {
					if (!noDeleteOnStaleGet) this.delete(k);
					if (status && allowStale) status.returnedStale = true;
					return allowStale ? value : void 0;
				} else {
					if (status && allowStale && value.__staleWhileFetching !== void 0) status.returnedStale = true;
					return allowStale ? value.__staleWhileFetching : void 0;
				}
			} else {
				if (status) status.get = "hit";
				if (fetching) return value.__staleWhileFetching;
				_assertClassBrand(_LRUCache_brand, this, _moveToTail).call(this, index);
				if (updateAgeOnGet) _classPrivateFieldGet2(_updateItemAge, this).call(this, index);
				return value;
			}
		} else if (status) status.get = "miss";
	}
	/**
	* Deletes a key out of the cache.
	* Returns true if the key was deleted, false otherwise.
	*/
	delete(k) {
		var _classPrivateFieldGet13;
		let deleted = false;
		if (_classPrivateFieldGet2(_size, this) !== 0) {
			const index = _classPrivateFieldGet2(_keyMap, this).get(k);
			if (index !== void 0) {
				deleted = true;
				if (_classPrivateFieldGet2(_size, this) === 1) this.clear();
				else {
					var _this$size5;
					_classPrivateFieldGet2(_removeItemSize, this).call(this, index);
					const v = _classPrivateFieldGet2(_valList, this)[index];
					if (_assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, v)) v.__abortController.abort(/* @__PURE__ */ new Error("deleted"));
					else if (_classPrivateFieldGet2(_hasDispose, this) || _classPrivateFieldGet2(_hasDisposeAfter, this)) {
						if (_classPrivateFieldGet2(_hasDispose, this)) {
							var _classPrivateFieldGet11;
							(_classPrivateFieldGet11 = _classPrivateFieldGet2(_dispose, this)) === null || _classPrivateFieldGet11 === void 0 || _classPrivateFieldGet11.call(this, v, k, "delete");
						}
						if (_classPrivateFieldGet2(_hasDisposeAfter, this)) {
							var _classPrivateFieldGet12;
							(_classPrivateFieldGet12 = _classPrivateFieldGet2(_disposed, this)) === null || _classPrivateFieldGet12 === void 0 || _classPrivateFieldGet12.push([
								v,
								k,
								"delete"
							]);
						}
					}
					_classPrivateFieldGet2(_keyMap, this).delete(k);
					_classPrivateFieldGet2(_keyList, this)[index] = void 0;
					_classPrivateFieldGet2(_valList, this)[index] = void 0;
					if (index === _classPrivateFieldGet2(_tail, this)) _classPrivateFieldSet2(_tail, this, _classPrivateFieldGet2(_prev, this)[index]);
					else if (index === _classPrivateFieldGet2(_head, this)) _classPrivateFieldSet2(_head, this, _classPrivateFieldGet2(_next, this)[index]);
					else {
						const pi = _classPrivateFieldGet2(_prev, this)[index];
						_classPrivateFieldGet2(_next, this)[pi] = _classPrivateFieldGet2(_next, this)[index];
						const ni = _classPrivateFieldGet2(_next, this)[index];
						_classPrivateFieldGet2(_prev, this)[ni] = _classPrivateFieldGet2(_prev, this)[index];
					}
					_classPrivateFieldSet2(_size, this, (_this$size5 = _classPrivateFieldGet2(_size, this), _this$size5--, _this$size5));
					_classPrivateFieldGet2(_free, this).push(index);
				}
			}
		}
		if (_classPrivateFieldGet2(_hasDisposeAfter, this) && ((_classPrivateFieldGet13 = _classPrivateFieldGet2(_disposed, this)) === null || _classPrivateFieldGet13 === void 0 ? void 0 : _classPrivateFieldGet13.length)) {
			const dt = _classPrivateFieldGet2(_disposed, this);
			let task;
			while (task = dt === null || dt === void 0 ? void 0 : dt.shift()) {
				var _classPrivateFieldGet14;
				(_classPrivateFieldGet14 = _classPrivateFieldGet2(_disposeAfter, this)) === null || _classPrivateFieldGet14 === void 0 || _classPrivateFieldGet14.call(this, ...task);
			}
		}
		return deleted;
	}
	/**
	* Clear the cache entirely, throwing away all values.
	*/
	clear() {
		for (const index of _assertClassBrand(_LRUCache_brand, this, _rindexes).call(this, { allowStale: true })) {
			const v = _classPrivateFieldGet2(_valList, this)[index];
			if (_assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, v)) v.__abortController.abort(/* @__PURE__ */ new Error("deleted"));
			else {
				const k = _classPrivateFieldGet2(_keyList, this)[index];
				if (_classPrivateFieldGet2(_hasDispose, this)) {
					var _classPrivateFieldGet15;
					(_classPrivateFieldGet15 = _classPrivateFieldGet2(_dispose, this)) === null || _classPrivateFieldGet15 === void 0 || _classPrivateFieldGet15.call(this, v, k, "delete");
				}
				if (_classPrivateFieldGet2(_hasDisposeAfter, this)) {
					var _classPrivateFieldGet16;
					(_classPrivateFieldGet16 = _classPrivateFieldGet2(_disposed, this)) === null || _classPrivateFieldGet16 === void 0 || _classPrivateFieldGet16.push([
						v,
						k,
						"delete"
					]);
				}
			}
		}
		_classPrivateFieldGet2(_keyMap, this).clear();
		_classPrivateFieldGet2(_valList, this).fill(void 0);
		_classPrivateFieldGet2(_keyList, this).fill(void 0);
		if (_classPrivateFieldGet2(_ttls, this) && _classPrivateFieldGet2(_starts, this)) {
			_classPrivateFieldGet2(_ttls, this).fill(0);
			_classPrivateFieldGet2(_starts, this).fill(0);
		}
		if (_classPrivateFieldGet2(_sizes, this)) _classPrivateFieldGet2(_sizes, this).fill(0);
		_classPrivateFieldSet2(_head, this, 0);
		_classPrivateFieldSet2(_tail, this, 0);
		_classPrivateFieldGet2(_free, this).length = 0;
		_classPrivateFieldSet2(_calculatedSize, this, 0);
		_classPrivateFieldSet2(_size, this, 0);
		if (_classPrivateFieldGet2(_hasDisposeAfter, this) && _classPrivateFieldGet2(_disposed, this)) {
			const dt = _classPrivateFieldGet2(_disposed, this);
			let task;
			while (task = dt === null || dt === void 0 ? void 0 : dt.shift()) {
				var _classPrivateFieldGet17;
				(_classPrivateFieldGet17 = _classPrivateFieldGet2(_disposeAfter, this)) === null || _classPrivateFieldGet17 === void 0 || _classPrivateFieldGet17.call(this, ...task);
			}
		}
	}
};
function _initializeTTLTracking() {
	const ttls = new ZeroArray(_classPrivateFieldGet2(_max, this));
	const starts = new ZeroArray(_classPrivateFieldGet2(_max, this));
	_classPrivateFieldSet2(_ttls, this, ttls);
	_classPrivateFieldSet2(_starts, this, starts);
	_classPrivateFieldSet2(_setItemTTL, this, (index, ttl, start = perf.now()) => {
		starts[index] = ttl !== 0 ? start : 0;
		ttls[index] = ttl;
		if (ttl !== 0 && this.ttlAutopurge) {
			const t = setTimeout(() => {
				if (_classPrivateFieldGet2(_isStale, this).call(this, index)) this.delete(_classPrivateFieldGet2(_keyList, this)[index]);
			}, ttl + 1);
			/* c8 ignore start */
			if (t.unref) t.unref();
		}
	});
	_classPrivateFieldSet2(_updateItemAge, this, (index) => {
		starts[index] = ttls[index] !== 0 ? perf.now() : 0;
	});
	_classPrivateFieldSet2(_statusTTL, this, (status, index) => {
		if (ttls[index]) {
			const ttl = ttls[index];
			const start = starts[index];
			/* c8 ignore next */
			if (!ttl || !start) return;
			status.ttl = ttl;
			status.start = start;
			status.now = cachedNow || getNow();
			status.remainingTTL = ttl - (status.now - start);
		}
	});
	let cachedNow = 0;
	const getNow = () => {
		const n = perf.now();
		if (this.ttlResolution > 0) {
			cachedNow = n;
			const t = setTimeout(() => cachedNow = 0, this.ttlResolution);
			/* c8 ignore start */
			if (t.unref) t.unref();
		}
		return n;
	};
	this.getRemainingTTL = (key) => {
		const index = _classPrivateFieldGet2(_keyMap, this).get(key);
		if (index === void 0) return 0;
		const ttl = ttls[index];
		const start = starts[index];
		if (!ttl || !start) return Infinity;
		return ttl - ((cachedNow || getNow()) - start);
	};
	_classPrivateFieldSet2(_isStale, this, (index) => {
		const s = starts[index];
		const t = ttls[index];
		return !!t && !!s && (cachedNow || getNow()) - s > t;
	});
}
function _initializeSizeTracking() {
	const sizes = new ZeroArray(_classPrivateFieldGet2(_max, this));
	_classPrivateFieldSet2(_calculatedSize, this, 0);
	_classPrivateFieldSet2(_sizes, this, sizes);
	_classPrivateFieldSet2(_removeItemSize, this, (index) => {
		_classPrivateFieldSet2(_calculatedSize, this, _classPrivateFieldGet2(_calculatedSize, this) - sizes[index]);
		sizes[index] = 0;
	});
	_classPrivateFieldSet2(_requireSize, this, (k, v, size, sizeCalculation) => {
		if (_assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, v)) return 0;
		if (!isPosInt(size)) if (sizeCalculation) {
			if (typeof sizeCalculation !== "function") throw new TypeError("sizeCalculation must be a function");
			size = sizeCalculation(v, k);
			if (!isPosInt(size)) throw new TypeError("sizeCalculation return invalid (expect positive integer)");
		} else throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
		return size;
	});
	_classPrivateFieldSet2(_addItemSize, this, (index, size, status) => {
		sizes[index] = size;
		if (_classPrivateFieldGet2(_maxSize, this)) {
			const maxSize = _classPrivateFieldGet2(_maxSize, this) - sizes[index];
			while (_classPrivateFieldGet2(_calculatedSize, this) > maxSize) _assertClassBrand(_LRUCache_brand, this, _evict).call(this, true);
		}
		_classPrivateFieldSet2(_calculatedSize, this, _classPrivateFieldGet2(_calculatedSize, this) + sizes[index]);
		if (status) {
			status.entrySize = size;
			status.totalCalculatedSize = _classPrivateFieldGet2(_calculatedSize, this);
		}
	});
}
function* _indexes({ allowStale = this.allowStale } = {}) {
	if (_classPrivateFieldGet2(_size, this)) for (let i = _classPrivateFieldGet2(_tail, this);;) {
		if (!_assertClassBrand(_LRUCache_brand, this, _isValidIndex).call(this, i)) break;
		if (allowStale || !_classPrivateFieldGet2(_isStale, this).call(this, i)) yield i;
		if (i === _classPrivateFieldGet2(_head, this)) break;
		else i = _classPrivateFieldGet2(_prev, this)[i];
	}
}
function* _rindexes({ allowStale = this.allowStale } = {}) {
	if (_classPrivateFieldGet2(_size, this)) for (let i = _classPrivateFieldGet2(_head, this);;) {
		if (!_assertClassBrand(_LRUCache_brand, this, _isValidIndex).call(this, i)) break;
		if (allowStale || !_classPrivateFieldGet2(_isStale, this).call(this, i)) yield i;
		if (i === _classPrivateFieldGet2(_tail, this)) break;
		else i = _classPrivateFieldGet2(_next, this)[i];
	}
}
function _isValidIndex(index) {
	return index !== void 0 && _classPrivateFieldGet2(_keyMap, this).get(_classPrivateFieldGet2(_keyList, this)[index]) === index;
}
function _evict(free) {
	var _this$size3;
	const head = _classPrivateFieldGet2(_head, this);
	const k = _classPrivateFieldGet2(_keyList, this)[head];
	const v = _classPrivateFieldGet2(_valList, this)[head];
	if (_classPrivateFieldGet2(_hasFetchMethod, this) && _assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, v)) v.__abortController.abort(/* @__PURE__ */ new Error("evicted"));
	else if (_classPrivateFieldGet2(_hasDispose, this) || _classPrivateFieldGet2(_hasDisposeAfter, this)) {
		if (_classPrivateFieldGet2(_hasDispose, this)) {
			var _classPrivateFieldGet8;
			(_classPrivateFieldGet8 = _classPrivateFieldGet2(_dispose, this)) === null || _classPrivateFieldGet8 === void 0 || _classPrivateFieldGet8.call(this, v, k, "evict");
		}
		if (_classPrivateFieldGet2(_hasDisposeAfter, this)) {
			var _classPrivateFieldGet9;
			(_classPrivateFieldGet9 = _classPrivateFieldGet2(_disposed, this)) === null || _classPrivateFieldGet9 === void 0 || _classPrivateFieldGet9.push([
				v,
				k,
				"evict"
			]);
		}
	}
	_classPrivateFieldGet2(_removeItemSize, this).call(this, head);
	if (free) {
		_classPrivateFieldGet2(_keyList, this)[head] = void 0;
		_classPrivateFieldGet2(_valList, this)[head] = void 0;
		_classPrivateFieldGet2(_free, this).push(head);
	}
	if (_classPrivateFieldGet2(_size, this) === 1) {
		_classPrivateFieldSet2(_head, this, _classPrivateFieldSet2(_tail, this, 0));
		_classPrivateFieldGet2(_free, this).length = 0;
	} else _classPrivateFieldSet2(_head, this, _classPrivateFieldGet2(_next, this)[head]);
	_classPrivateFieldGet2(_keyMap, this).delete(k);
	_classPrivateFieldSet2(_size, this, (_this$size3 = _classPrivateFieldGet2(_size, this), _this$size3--, _this$size3));
	return head;
}
function _backgroundFetch(k, index, options, context) {
	const v = index === void 0 ? void 0 : _classPrivateFieldGet2(_valList, this)[index];
	if (_assertClassBrand(_LRUCache_brand, this, _isBackgroundFetch).call(this, v)) return v;
	const ac = new AC();
	const { signal } = options;
	signal === null || signal === void 0 || signal.addEventListener("abort", () => ac.abort(signal.reason), { signal: ac.signal });
	const fetchOpts = {
		signal: ac.signal,
		options,
		context
	};
	const cb = (v, updateCache = false) => {
		const { aborted } = ac.signal;
		const ignoreAbort = options.ignoreFetchAbort && v !== void 0;
		if (options.status) if (aborted && !updateCache) {
			options.status.fetchAborted = true;
			options.status.fetchError = ac.signal.reason;
			if (ignoreAbort) options.status.fetchAbortIgnored = true;
		} else options.status.fetchResolved = true;
		if (aborted && !ignoreAbort && !updateCache) return fetchFail(ac.signal.reason);
		const bf = p;
		if (_classPrivateFieldGet2(_valList, this)[index] === p) if (v === void 0) if (bf.__staleWhileFetching) _classPrivateFieldGet2(_valList, this)[index] = bf.__staleWhileFetching;
		else this.delete(k);
		else {
			if (options.status) options.status.fetchUpdated = true;
			this.set(k, v, fetchOpts.options);
		}
		return v;
	};
	const eb = (er) => {
		if (options.status) {
			options.status.fetchRejected = true;
			options.status.fetchError = er;
		}
		return fetchFail(er);
	};
	const fetchFail = (er) => {
		const { aborted } = ac.signal;
		const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
		const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
		const noDelete = allowStale || options.noDeleteOnFetchRejection;
		const bf = p;
		if (_classPrivateFieldGet2(_valList, this)[index] === p) {
			if (!noDelete || bf.__staleWhileFetching === void 0) this.delete(k);
			else if (!allowStaleAborted) _classPrivateFieldGet2(_valList, this)[index] = bf.__staleWhileFetching;
		}
		if (allowStale) {
			if (options.status && bf.__staleWhileFetching !== void 0) options.status.returnedStale = true;
			return bf.__staleWhileFetching;
		} else if (bf.__returned === bf) throw er;
	};
	const pcall = (res, rej) => {
		var _classPrivateFieldGet10;
		const fmp = (_classPrivateFieldGet10 = _classPrivateFieldGet2(_fetchMethod, this)) === null || _classPrivateFieldGet10 === void 0 ? void 0 : _classPrivateFieldGet10.call(this, k, v, fetchOpts);
		if (fmp && fmp instanceof Promise) fmp.then((v) => res(v === void 0 ? void 0 : v), rej);
		ac.signal.addEventListener("abort", () => {
			if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
				res(void 0);
				if (options.allowStaleOnFetchAbort) res = (v) => cb(v, true);
			}
		});
	};
	if (options.status) options.status.fetchDispatched = true;
	const p = new Promise(pcall).then(cb, eb);
	const bf = Object.assign(p, {
		__abortController: ac,
		__staleWhileFetching: v,
		__returned: void 0
	});
	if (index === void 0) {
		this.set(k, bf, {
			...fetchOpts.options,
			status: void 0
		});
		index = _classPrivateFieldGet2(_keyMap, this).get(k);
	} else _classPrivateFieldGet2(_valList, this)[index] = bf;
	return bf;
}
function _isBackgroundFetch(p) {
	if (!_classPrivateFieldGet2(_hasFetchMethod, this)) return false;
	const b = p;
	return !!b && b instanceof Promise && b.hasOwnProperty("__staleWhileFetching") && b.__abortController instanceof AC;
}
function _connect(p, n) {
	_classPrivateFieldGet2(_prev, this)[n] = p;
	_classPrivateFieldGet2(_next, this)[p] = n;
}
function _moveToTail(index) {
	if (index !== _classPrivateFieldGet2(_tail, this)) {
		if (index === _classPrivateFieldGet2(_head, this)) _classPrivateFieldSet2(_head, this, _classPrivateFieldGet2(_next, this)[index]);
		else _assertClassBrand(_LRUCache_brand, this, _connect).call(this, _classPrivateFieldGet2(_prev, this)[index], _classPrivateFieldGet2(_next, this)[index]);
		_assertClassBrand(_LRUCache_brand, this, _connect).call(this, _classPrivateFieldGet2(_tail, this), index);
		_classPrivateFieldSet2(_tail, this, index);
	}
}

//#endregion
//#region packages/compiler-sfc/src/cache.ts
function createCache(max = 500) {
	return new LRUCache({ max });
}

//#endregion
//#region packages/compiler-sfc/src/script/importUsageCheck.ts
/**
* Check if an identifier is used in the SFC's template.
* - 1.used to determine the properties that should be included in the object returned from setup()
*   when not using inline mode.
* - 2.check whether the built-in properties such as $attrs, $slots, $emit are used in the template
*/
function isUsedInTemplate(identifier, sfc) {
	return resolveTemplateUsedIdentifiers(sfc).has(identifier);
}
const templateAnalysisCache = createCache();
function resolveTemplateVModelIdentifiers(sfc) {
	return resolveTemplateAnalysisResult(sfc, false).vModelIds;
}
function resolveTemplateUsedIdentifiers(sfc) {
	return resolveTemplateAnalysisResult(sfc).usedIds;
}
function resolveTemplateAnalysisResult(sfc, collectUsedIds = true) {
	const { content, ast } = sfc.template;
	const cached = templateAnalysisCache.get(content);
	if (cached && (!collectUsedIds || cached.usedIds)) return cached;
	const ids = collectUsedIds ? /* @__PURE__ */ new Set() : void 0;
	const vModelIds = /* @__PURE__ */ new Set();
	ast.children.forEach(walk);
	function walk(node) {
		switch (node.type) {
			case 1:
				let tag = node.tag;
				if (tag.includes(".")) tag = tag.split(".")[0].trim();
				if (!_vue_compiler_dom.parserOptions.isNativeTag(tag) && !_vue_compiler_dom.parserOptions.isBuiltInComponent(tag)) {
					if (ids) {
						ids.add((0, _vue_shared.camelize)(tag));
						ids.add((0, _vue_shared.capitalize)((0, _vue_shared.camelize)(tag)));
					}
				}
				for (let i = 0; i < node.props.length; i++) {
					var _prop$value;
					const prop = node.props[i];
					if (prop.type === 7) {
						if (ids) {
							if (!(0, _vue_shared.isBuiltInDirective)(prop.name)) ids.add(`v${(0, _vue_shared.capitalize)((0, _vue_shared.camelize)(prop.name))}`);
						}
						if (prop.name === "model") {
							const exp = prop.exp;
							if (exp && exp.type === 4) {
								const expString = exp.content.trim();
								if ((0, _vue_compiler_dom.isSimpleIdentifier)(expString) && expString !== "undefined") vModelIds.add(expString);
							}
						}
						if (ids && prop.arg && !prop.arg.isStatic) extractIdentifiers$2(ids, prop.arg);
						if (ids) {
							if (prop.name === "for") extractIdentifiers$2(ids, prop.forParseResult.source);
							else if (prop.exp) extractIdentifiers$2(ids, prop.exp);
							else if (prop.name === "bind" && !prop.exp) ids.add((0, _vue_shared.camelize)(prop.arg.content));
						}
					}
					if (ids && prop.type === 6 && prop.name === "ref" && ((_prop$value = prop.value) === null || _prop$value === void 0 ? void 0 : _prop$value.content)) ids.add(prop.value.content);
				}
				node.children.forEach(walk);
				break;
			case 5:
				if (ids) extractIdentifiers$2(ids, node.content);
				break;
		}
	}
	const result = {
		usedIds: ids,
		vModelIds
	};
	templateAnalysisCache.set(content, result);
	return result;
}
function extractIdentifiers$2(ids, node) {
	if (node.ast) (0, _vue_compiler_dom.walkIdentifiers)(node.ast, (n) => ids.add(n.name));
	else if (node.ast === null) ids.add(node.content);
}

//#endregion
//#region packages/compiler-sfc/src/script/utils.ts
const UNKNOWN_TYPE = "Unknown";
function resolveObjectKey(node, computed) {
	switch (node.type) {
		case "StringLiteral":
		case "NumericLiteral": return String(node.value);
		case "Identifier": if (!computed) return node.name;
	}
}
function concatStrings(strs) {
	return strs.filter((s) => !!s).join(", ");
}
function isLiteralNode(node) {
	return node.type.endsWith("Literal");
}
function isCallOf(node, test) {
	return !!(node && test && node.type === "CallExpression" && node.callee.type === "Identifier" && (typeof test === "string" ? node.callee.name === test : test(node.callee.name)));
}
function toRuntimeTypeString(types) {
	return types.length > 1 ? `[${types.join(", ")}]` : types[0];
}
function getImportedName(specifier) {
	if (specifier.type === "ImportSpecifier") return specifier.imported.type === "Identifier" ? specifier.imported.name : specifier.imported.value;
	else if (specifier.type === "ImportNamespaceSpecifier") return "*";
	return "default";
}
function getId(node) {
	return node.type === "Identifier" ? node.name : node.type === "StringLiteral" ? node.value : null;
}
function getStringLiteralKey(node) {
	return node.computed ? node.key.type === "TemplateLiteral" && !node.key.expressions.length ? node.key.quasis.map((q) => q.value.cooked).join("") : null : node.key.type === "Identifier" ? node.key.name : node.key.type === "StringLiteral" ? node.key.value : node.key.type === "NumericLiteral" ? String(node.key.value) : null;
}
const identity = (str) => str;
const fileNameLowerCaseRegExp = /[^\u0130\u0131\u00DFa-z0-9\\/:\-_\. ]+/g;
const toLowerCase = (str) => str.toLowerCase();
function toFileNameLowerCase(x) {
	return fileNameLowerCaseRegExp.test(x) ? x.replace(fileNameLowerCaseRegExp, toLowerCase) : x;
}
/**
* We need `getCanonicalFileName` when creating ts module resolution cache,
* but TS does not expose it directly. This implementation is replicated from
* the TS source code.
*/
function createGetCanonicalFileName(useCaseSensitiveFileNames) {
	return useCaseSensitiveFileNames ? identity : toFileNameLowerCase;
}
const normalize = (path.default.posix || path.default).normalize;
const windowsSlashRE = /\\/g;
function normalizePath(p) {
	return normalize(p.replace(windowsSlashRE, "/"));
}
const joinPaths = (path.default.posix || path.default).join;
/**
* key may contain symbols
* e.g. onUpdate:modelValue -> "onUpdate:modelValue"
*/
const propNameEscapeSymbolsRE = /[ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~\-]/;
function getEscapedPropName(key) {
	return propNameEscapeSymbolsRE.test(key) ? JSON.stringify(key) : key;
}
const isJS = (...langs) => langs.some((lang) => lang === "js" || lang === "jsx");
const isTS = (...langs) => langs.some((lang) => lang === "ts" || lang === "tsx" || lang === "uts");

//#endregion
//#region packages/compiler-sfc/src/parse.ts
const DEFAULT_FILENAME = "anonymous.vue";
const parseCache$1 = createCache();
function parse(source, options = {}) {
	var _options$compiler;
	const sourceKey = (0, _vue_shared.genCacheKey)(source, {
		...options,
		compiler: { parse: (_options$compiler = options.compiler) === null || _options$compiler === void 0 ? void 0 : _options$compiler.parse }
	});
	const cache = parseCache$1.get(sourceKey);
	if (cache) return cache;
	const { sourceMap = true, filename = DEFAULT_FILENAME, sourceRoot = "", pad = false, ignoreEmpty = true, compiler = _vue_compiler_dom, templateParseOptions = {} } = options;
	const descriptor = {
		filename,
		source,
		template: null,
		script: null,
		scriptSetup: null,
		styles: [],
		customBlocks: [],
		scriptCppBlocks: [],
		cssVars: [],
		slotted: false,
		vapor: false,
		shouldForceReload: (prevImports) => hmrShouldReload(prevImports, descriptor)
	};
	const errors = [];
	const ast = compiler.parse(source, {
		parseMode: "sfc",
		prefixIdentifiers: true,
		...templateParseOptions,
		onError: (e) => {
			errors.push(e);
		}
	});
	ast.children.forEach((node) => {
		if (node.type !== 1) return;
		if (node.tag === "script") {
			const cppBlock = createCppBlock(node, options);
			if (cppBlock) {
				if (cppBlock.errors && cppBlock.errors.length > 0) {
					errors.push(...cppBlock.errors);
					delete cppBlock.errors;
					return;
				}
				descriptor.scriptCppBlocks.push(cppBlock);
				return;
			}
		}
		if (ignoreEmpty && node.tag !== "template" && isEmpty(node) && !hasAttr(node, "src")) {
			descriptor.vapor || (descriptor.vapor = hasAttr(node, "vapor"));
			return;
		}
		switch (node.tag) {
			case "template":
				if (!descriptor.template) {
					const templateBlock = descriptor.template = createBlock(node, source, false);
					descriptor.vapor || (descriptor.vapor = !!templateBlock.attrs.vapor);
					if (!templateBlock.attrs.src) templateBlock.ast = (0, _vue_compiler_core.createRoot)(node.children, source);
					if (templateBlock.attrs.functional) {
						const err = /* @__PURE__ */ new SyntaxError("<template functional> is no longer supported in Vue 3, since functional components no longer have significant performance difference from stateful ones. Just use a normal <template> instead.");
						err.loc = node.props.find((p) => p.type === 6 && p.name === "functional").loc;
						errors.push(err);
					}
				} else errors.push(createDuplicateBlockError(node));
				break;
			case "script":
				const scriptBlock = createBlock(node, source, pad);
				descriptor.vapor || (descriptor.vapor = !!scriptBlock.attrs.vapor);
				const isSetup = !!(scriptBlock.attrs.setup || scriptBlock.attrs.vapor);
				if (isSetup && !descriptor.scriptSetup) {
					descriptor.scriptSetup = scriptBlock;
					break;
				}
				if (!isSetup && !descriptor.script) {
					descriptor.script = scriptBlock;
					break;
				}
				errors.push(createDuplicateBlockError(node, isSetup));
				break;
			case "style":
				const styleBlock = createBlock(node, source, pad);
				if (styleBlock.attrs.vars) errors.push(/* @__PURE__ */ new SyntaxError("<style vars> has been replaced by a new proposal: https://github.com/vuejs/rfcs/pull/231"));
				descriptor.styles.push(styleBlock);
				break;
			default:
				descriptor.customBlocks.push(createBlock(node, source, pad));
				break;
		}
	});
	if (!descriptor.template && !descriptor.script && !descriptor.scriptSetup) {
		const err = /* @__PURE__ */ new SyntaxError(`At least one <template> or <script> is required in a single file component. `);
		err.loc = ast.loc;
		errors.push(err);
	}
	if (descriptor.scriptSetup) {
		if (descriptor.scriptSetup.src) {
			const err = /* @__PURE__ */ new SyntaxError("<script setup> cannot use the \"src\" attribute because its syntax will be ambiguous outside of the component.");
			const loc = descriptor.scriptSetup.loc;
			err.loc = {
				start: {
					...loc.start,
					column: 0
				},
				end: { ...loc.start },
				source: ""
			};
			errors.push(err);
			descriptor.scriptSetup = null;
		}
		if (descriptor.script && descriptor.script.src) {
			const err = /* @__PURE__ */ new SyntaxError("<script> cannot use the \"src\" attribute when <script setup> is also present because they must be processed together.");
			const loc = descriptor.script.loc;
			err.loc = {
				start: {
					...loc.start,
					column: 0
				},
				end: { ...loc.start },
				source: ""
			};
			errors.push(err);
			descriptor.script = null;
		}
	}
	let templateColumnOffset = 0;
	if (descriptor.template && (descriptor.template.lang === "pug" || descriptor.template.lang === "jade")) [descriptor.template.content, templateColumnOffset] = dedent(descriptor.template.content);
	if (sourceMap) {
		const genMap = (block, columnOffset = 0) => {
			if (block && !block.src) block.map = generateSourceMap(filename, source, block.content, sourceRoot, !pad || block.type === "template" ? block.loc.start.line - 1 : 0, columnOffset);
		};
		genMap(descriptor.template, templateColumnOffset);
		genMap(descriptor.script);
		descriptor.styles.forEach((s) => genMap(s));
		descriptor.customBlocks.forEach((s) => genMap(s));
	}
	descriptor.cssVars = parseCssVars(descriptor);
	const slottedRE = /(?:::v-|:)slotted\(/;
	descriptor.slotted = descriptor.styles.some((s) => s.scoped && slottedRE.test(s.content));
	if (templateParseOptions.dom2) {
		function isAppUVue() {
			if (templateParseOptions.root && descriptor.filename) return normalizePath(descriptor.filename) === normalizePath(templateParseOptions.root + "/App.uvue");
			return false;
		}
		function createDefaultScriptSetup() {
			return {
				type: "script",
				content: "",
				loc: {
					start: ast.loc.end,
					end: ast.loc.end,
					source: ""
				},
				attrs: {
					setup: true,
					vapor: true,
					lang: "uts"
				},
				setup: true,
				lang: "uts"
			};
		}
		function createDefaultTemplate() {
			return {
				type: "template",
				content: "",
				loc: {
					start: ast.loc.end,
					end: ast.loc.end,
					source: ""
				},
				attrs: {},
				ast: void 0
			};
		}
		const appUVue = isAppUVue();
		if (appUVue) descriptor.template = createDefaultTemplate();
		if (!descriptor.script && !descriptor.scriptSetup) {
			descriptor.vapor = true;
			descriptor.scriptSetup = createDefaultScriptSetup();
		}
		if (descriptor.script && !appUVue) {
			const err = /* @__PURE__ */ new SyntaxError(`蒸汽模式仅支持使用<script setup>，不支持<script>选项式`);
			const loc = descriptor.script.loc;
			err.loc = {
				start: {
					...loc.start,
					column: 0
				},
				end: { ...loc.start },
				source: ""
			};
			errors.push(err);
			descriptor.vapor = true;
			descriptor.script = null;
			descriptor.template = null;
			descriptor.scriptSetup = createDefaultScriptSetup();
		}
	}
	if (errors.length > 0 && options.templateParseOptions && options.templateParseOptions.extraOptions) {
		const extraOptions = options.templateParseOptions.extraOptions(descriptor);
		if (extraOptions.onVueTemplateCompileLog) errors.forEach((err) => {
			if (!err.customPrint) err.customPrint = () => {
				extraOptions.onVueTemplateCompileLog("error", err);
			};
		});
	}
	const result = {
		descriptor,
		errors
	};
	parseCache$1.set(sourceKey, result);
	return result;
}
function createDuplicateBlockError(node, isScriptSetup = false) {
	const err = /* @__PURE__ */ new SyntaxError(`Single file component can contain only one <${node.tag}${isScriptSetup ? ` setup` : ``}> element`);
	err.loc = node.loc;
	return err;
}
function createBlock(node, source, pad) {
	const type = node.tag;
	const loc = node.innerLoc;
	const attrs = {};
	const block = {
		type,
		content: source.slice(loc.start.offset, loc.end.offset),
		loc,
		attrs
	};
	if (pad) block.content = padContent(source, block, pad) + block.content;
	node.props.forEach((p) => {
		if (p.type === 6) {
			const name = p.name;
			attrs[name] = p.value ? p.value.content || true : true;
			if (name === "lang") block.lang = p.value && p.value.content;
			else if (name === "src") block.src = p.value && p.value.content;
			else if (type === "style") {
				if (name === "scoped") block.scoped = true;
				else if (name === "module") block.module = attrs[name];
			} else if (type === "script" && name === "setup") block.setup = attrs.setup;
		}
	});
	return block;
}
const splitRE = /\r?\n/g;
const emptyRE = /^(?:\/\/)?\s*$/;
const replaceRE = /./g;
function generateSourceMap(filename, source, generated, sourceRoot, lineOffset, columnOffset) {
	const map = new source_map_js.SourceMapGenerator({
		file: filename.replace(/\\/g, "/"),
		sourceRoot: sourceRoot.replace(/\\/g, "/")
	});
	map.setSourceContent(filename, source);
	map._sources.add(filename);
	generated.split(splitRE).forEach((line, index) => {
		if (!emptyRE.test(line)) {
			const originalLine = index + 1 + lineOffset;
			const generatedLine = index + 1;
			for (let i = 0; i < line.length; i++) if (!/\s/.test(line[i])) map._mappings.add({
				originalLine,
				originalColumn: i + columnOffset,
				generatedLine,
				generatedColumn: i,
				source: filename,
				name: null
			});
		}
	});
	return map.toJSON();
}
function padContent(content, block, pad) {
	content = content.slice(0, block.loc.start.offset);
	if (pad === "space") return content.replace(replaceRE, " ");
	else {
		const offset = content.split(splitRE).length;
		const padChar = block.type === "script" && !block.lang ? "//\n" : "\n";
		return Array(offset).join(padChar);
	}
}
function hasAttr(node, name) {
	return node.props.some((p) => p.type === 6 && p.name === name);
}
/**
* Returns true if the node has no children
* once the empty text nodes (trimmed content) have been filtered out.
*/
function isEmpty(node) {
	for (let i = 0; i < node.children.length; i++) {
		const child = node.children[i];
		if (child.type !== 2 || child.content.trim() !== "") return false;
	}
	return true;
}
/**
* Note: this comparison assumes the prev/next script are already identical,
* and only checks the special case where <script setup lang="ts"> unused import
* pruning result changes due to template changes.
*/
function hmrShouldReload(prevImports, next) {
	if (!next.scriptSetup || next.scriptSetup.lang !== "ts" && next.scriptSetup.lang !== "tsx" && next.scriptSetup.lang !== "uts") return false;
	for (const key in prevImports) if (!prevImports[key].isUsedInTemplate && isUsedInTemplate(key, next)) return true;
	return false;
}
/**
* Dedent a string.
*
* This removes any whitespace that is common to all lines in the string from
* each line in the string.
*/
function dedent(s) {
	const lines = s.split("\n");
	const minIndent = lines.reduce(function(minIndent, line) {
		var _line$match;
		if (line.trim() === "") return minIndent;
		const indent = ((_line$match = line.match(/^\s*/)) === null || _line$match === void 0 || (_line$match = _line$match[0]) === null || _line$match === void 0 ? void 0 : _line$match.length) || 0;
		return Math.min(indent, minIndent);
	}, Infinity);
	if (minIndent === 0) return [s, minIndent];
	return [lines.map(function(line) {
		return line.slice(minIndent);
	}).join("\n"), minIndent];
}
function createCppBlock({ props, loc }, options) {
	if (!props.some((p) => p.type === 6 && p.name === "lang" && p.value && p.value.content === "cpp")) return;
	let module = "";
	let src = "";
	let className = "";
	let namespace = "";
	const errors = [];
	props.forEach((p) => {
		if (p.type === 6) {
			const attrName = p.name;
			const attrValue = p.value && p.value.content;
			if (attrName === "module") module = attrValue || "";
			else if (attrName === "src") {
				var _options$templatePars;
				src = attrValue || "";
				if (options.filename && ((_options$templatePars = options.templateParseOptions) === null || _options$templatePars === void 0 ? void 0 : _options$templatePars.root)) {
					var _options$templatePars2;
					const absSrc = joinPaths(options.filename, "..", src);
					if (!(0, node_fs.existsSync)(absSrc)) {
						const err = /* @__PURE__ */ new SyntaxError(`文件不存在: ${src}`);
						err.loc = loc;
						errors.push(err);
						return;
					}
					src = normalizePath(absSrc).replace((_options$templatePars2 = options.templateParseOptions) === null || _options$templatePars2 === void 0 ? void 0 : _options$templatePars2.root, "").slice(1);
					if (!src.startsWith("uni_modules")) {
						const err = /* @__PURE__ */ new SyntaxError(`<script lang="cpp"> 的 src 比如放在 uni_modules 插件 cppsdk 目录中`);
						err.loc = loc;
						errors.push(err);
						return;
					}
				}
			} else if (attrName === "class-name") className = attrValue || "";
			else if (attrName === "namespace") namespace = attrValue || "";
		}
	});
	if (!errors.length) {
		if (!module) {
			const err = /* @__PURE__ */ new SyntaxError(`<script lang="cpp"> 必须指定 module 属性`);
			err.loc = loc;
			errors.push(err);
		}
		if (!src) {
			const err = /* @__PURE__ */ new SyntaxError(`<script lang="cpp"> 必须指定 src 属性`);
			err.loc = loc;
			errors.push(err);
		}
		if (!className) {
			const err = /* @__PURE__ */ new SyntaxError(`<script lang="cpp"> 必须指定 class-name 属性`);
			err.loc = loc;
			errors.push(err);
		}
	}
	return {
		src,
		module,
		className,
		namespace,
		errors
	};
}

//#endregion
//#region packages/compiler-sfc/src/template/templateUtils.ts
function isRelativeUrl(url$1) {
	const firstChar = url$1.charAt(0);
	return firstChar === "." || firstChar === "~" || firstChar === "@";
}
const externalRE = /^(?:https?:)?\/\//;
function isExternalUrl(url$2) {
	return externalRE.test(url$2);
}
const dataUrlRE = /^\s*data:/i;
function isDataUrl(url$3) {
	return dataUrlRE.test(url$3);
}
/**
* Parses string url into URL object.
*/
function parseUrl(url$4) {
	if (url$4.charAt(0) === "~") {
		const secondChar = url$4.charAt(1);
		url$4 = url$4.slice(secondChar === "/" ? 2 : 1);
	}
	return parseUriParts(url$4);
}
/**
* vuejs/component-compiler-utils#22 Support uri fragment in transformed require
* @param urlString - an url as a string
*/
function parseUriParts(urlString) {
	return (0, url.parse)((0, _vue_shared.isString)(urlString) ? urlString : "", false, true);
}

//#endregion
//#region packages/compiler-sfc/src/template/transformAssetUrl.ts
const defaultAssetUrlOptions = {
	base: null,
	includeAbsolute: false,
	tags: {
		video: ["src", "poster"],
		source: ["src"],
		img: ["src"],
		image: ["xlink:href", "href"],
		use: ["xlink:href", "href"]
	}
};
const normalizeOptions = (options) => {
	if (Object.keys(options).some((key) => (0, _vue_shared.isArray)(options[key]))) return {
		...defaultAssetUrlOptions,
		tags: options
	};
	return {
		...defaultAssetUrlOptions,
		...options
	};
};
const createAssetUrlTransformWithOptions = (options) => {
	return (node, context) => transformAssetUrl(node, context, options);
};
/**
* A `@vue/compiler-core` plugin that transforms relative asset urls into
* either imports or absolute urls.
*
* ``` js
* // Before
* createVNode('img', { src: './logo.png' })
*
* // After
* import _imports_0 from './logo.png'
* createVNode('img', { src: _imports_0 })
* ```
*/
const transformAssetUrl = (node, context, options = defaultAssetUrlOptions) => {
	if (node.type === 1) {
		if (!node.props.length) return;
		const tags = options.tags || defaultAssetUrlOptions.tags;
		const attrs = tags[node.tag];
		const wildCardAttrs = tags["*"];
		if (!attrs && !wildCardAttrs) return;
		const assetAttrs = (attrs || []).concat(wildCardAttrs || []);
		node.props.forEach((attr, index) => {
			if (attr.type !== 6 || !assetAttrs.includes(attr.name) || !attr.value || isExternalUrl(attr.value.content) || isDataUrl(attr.value.content) || attr.value.content[0] === "#" || !options.includeAbsolute && !isRelativeUrl(attr.value.content)) return;
			const url = parseUrl(attr.value.content);
			if (options.base && attr.value.content[0] === ".") {
				const base = parseUrl(options.base);
				const protocol = base.protocol || "";
				const host = base.host ? protocol + "//" + base.host : "";
				const basePath = base.path || "/";
				attr.value.content = host + (path.default.posix || path.default).join(basePath, url.path + (url.hash || ""));
				return;
			}
			const exp = getImportsExpressionExp(url.path, url.hash, attr.loc, context);
			node.props[index] = {
				type: 7,
				name: "bind",
				arg: (0, _vue_compiler_core.createSimpleExpression)(attr.name, true, attr.loc),
				exp,
				modifiers: [],
				loc: attr.loc
			};
		});
	}
};
function getImportsExpressionExp(path$24, hash, loc, context) {
	if (path$24) {
		let name;
		let exp;
		const existingIndex = context.imports.findIndex((i) => i.path === path$24);
		if (existingIndex > -1) {
			name = `_imports_${existingIndex}`;
			exp = context.imports[existingIndex].exp;
		} else {
			name = `_imports_${context.imports.length}`;
			exp = (0, _vue_compiler_core.createSimpleExpression)(name, false, loc, 3);
			context.imports.push({
				exp,
				path: decodeURIComponent(path$24)
			});
		}
		if (!hash) return exp;
		const hashExp = `${name} + '${hash}'`;
		const finalExp = (0, _vue_compiler_core.createSimpleExpression)(hashExp, false, loc, 3);
		if (!context.hoistStatic) return finalExp;
		const existingHoistIndex = context.hoists.findIndex((h) => {
			return h && h.type === 4 && !h.isStatic && h.content === hashExp;
		});
		if (existingHoistIndex > -1) return (0, _vue_compiler_core.createSimpleExpression)(`_hoisted_${existingHoistIndex + 1}`, false, loc, 3);
		return context.hoist(finalExp);
	} else return (0, _vue_compiler_core.createSimpleExpression)(`''`, false, loc, 3);
}

//#endregion
//#region packages/compiler-sfc/src/template/transformSrcset.ts
const srcsetTags = ["img", "source"];
const escapedSpaceCharacters = /( |\\t|\\n|\\f|\\r)+/g;
const createSrcsetTransformWithOptions = (options) => {
	return (node, context) => transformSrcset(node, context, options);
};
const transformSrcset = (node, context, options = defaultAssetUrlOptions) => {
	if (node.type === 1) {
		if (srcsetTags.includes(node.tag) && node.props.length) node.props.forEach((attr, index) => {
			if (attr.name === "srcset" && attr.type === 6) {
				if (!attr.value) return;
				const value = attr.value.content;
				if (!value) return;
				const imageCandidates = value.split(",").map((s) => {
					const [url, descriptor] = s.replace(escapedSpaceCharacters, " ").trim().split(" ", 2);
					return {
						url,
						descriptor
					};
				});
				for (let i = 0; i < imageCandidates.length; i++) {
					const { url } = imageCandidates[i];
					if (isDataUrl(url)) {
						imageCandidates[i + 1].url = url + "," + imageCandidates[i + 1].url;
						imageCandidates.splice(i, 1);
					}
				}
				const shouldProcessUrl = (url) => {
					return url && !isExternalUrl(url) && !isDataUrl(url) && (options.includeAbsolute || isRelativeUrl(url));
				};
				if (!imageCandidates.some(({ url }) => shouldProcessUrl(url))) return;
				if (options.base) {
					const base = options.base;
					const set = [];
					let needImportTransform = false;
					imageCandidates.forEach((candidate) => {
						let { url, descriptor } = candidate;
						descriptor = descriptor ? ` ${descriptor}` : ``;
						if (url[0] === ".") {
							candidate.url = (path.default.posix || path.default).join(base, url);
							set.push(candidate.url + descriptor);
						} else if (shouldProcessUrl(url)) needImportTransform = true;
						else set.push(url + descriptor);
					});
					if (!needImportTransform) {
						attr.value.content = set.join(", ");
						return;
					}
				}
				let content = "";
				imageCandidates.forEach(({ url, descriptor }, index) => {
					if (shouldProcessUrl(url)) {
						const { path: path$23 } = parseUrl(url);
						if (path$23) {
							let exp = "";
							const existingImportsIndex = context.imports.findIndex((i) => i.path === path$23);
							if (existingImportsIndex > -1) exp = `_imports_${existingImportsIndex}`;
							else {
								exp = `_imports_${context.imports.length}`;
								context.imports.push({
									exp: (0, _vue_compiler_core.createSimpleExpression)(exp, false, attr.loc, 3),
									path: path$23
								});
							}
							content += exp;
						}
					} else content += `"${url}"`;
					const isNotLast = imageCandidates.length - 1 > index;
					if (descriptor) content += ` + ' ${descriptor}${isNotLast ? ", " : ""}'${isNotLast ? " + " : ""}`;
					else if (isNotLast) content += ` + ', ' + `;
				});
				let exp = (0, _vue_compiler_core.createSimpleExpression)(content, false, attr.loc, 3);
				if (context.hoistStatic) {
					exp = context.hoist(exp);
					exp.constType = 3;
				}
				node.props[index] = {
					type: 7,
					name: "bind",
					arg: (0, _vue_compiler_core.createSimpleExpression)("srcset", true, attr.loc),
					exp,
					modifiers: [],
					loc: attr.loc
				};
			}
		});
	}
};

//#endregion
//#region node_modules/.pnpm/@vue+consolidate@1.0.0/node_modules/@vue/consolidate/lib/consolidate.js
var require_consolidate$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module dependencies.
	*/
	var fs = require("fs");
	var path$4 = require("path");
	var util = require("util");
	var join = path$4.join;
	var resolve = path$4.resolve;
	var extname = path$4.extname;
	var dirname = path$4.dirname;
	var isAbsolute = path$4.isAbsolute;
	var readCache = {};
	/**
	* Require cache.
	*/
	var cacheStore = {};
	/**
	* Require cache.
	*/
	var requires = {};
	/**
	* Clear the cache.
	*
	* @api public
	*/
	exports.clearCache = function() {
		readCache = {};
		cacheStore = {};
	};
	/**
	* Conditionally cache `compiled` template based
	* on the `options` filename and `.cache` boolean.
	*
	* @param {Object} options
	* @param {Function} compiled
	* @return {Function}
	* @api private
	*/
	function cache(options, compiled) {
		if (compiled && options.filename && options.cache) {
			delete readCache[options.filename];
			cacheStore[options.filename] = compiled;
			return compiled;
		}
		if (options.filename && options.cache) return cacheStore[options.filename];
		return compiled;
	}
	/**
	* Read `path` with `options` with
	* callback `(err, str)`. When `options.cache`
	* is true the template string will be cached.
	*
	* @param {String} options
	* @param {Function} cb
	* @api private
	*/
	function read(path$8, options, cb) {
		var str = readCache[path$8];
		if (options.cache && str && typeof str === "string") return cb(null, str);
		fs.readFile(path$8, "utf8", function(err, str) {
			if (err) return cb(err);
			str = str.replace(/^\uFEFF/, "");
			if (options.cache) readCache[path$8] = str;
			cb(null, str);
		});
	}
	/**
	* Read `path` with `options` with
	* callback `(err, str)`. When `options.cache`
	* is true the partial string will be cached.
	*
	* @param {String} options
	* @param {Function} fn
	* @api private
	*/
	function readPartials(path$9, options, cb) {
		if (!options.partials) return cb();
		var keys = Object.keys(options.partials);
		var partials = {};
		function next(index) {
			if (index === keys.length) return cb(null, partials);
			var key = keys[index];
			var partialPath = options.partials[key];
			if (partialPath === void 0 || partialPath === null || partialPath === false) return next(++index);
			var file;
			if (isAbsolute(partialPath)) if (extname(partialPath) !== "") file = partialPath;
			else file = join(partialPath + extname(path$9));
			else file = join(dirname(path$9), partialPath + extname(path$9));
			read(file, options, function(err, str) {
				if (err) return cb(err);
				partials[key] = str;
				next(++index);
			});
		}
		next(0);
	}
	/**
	* promisify
	*/
	function promisify(cb, fn) {
		return new Promise(function(resolve, reject) {
			cb = cb || function(err, html) {
				if (err) return reject(err);
				resolve(html);
			};
			fn(cb);
		});
	}
	/**
	* fromStringRenderer
	*/
	function fromStringRenderer(name) {
		return function(path$10, options, cb) {
			options.filename = path$10;
			return promisify(cb, function(cb) {
				readPartials(path$10, options, function(err, partials) {
					var opts = (requires.extend || (requires.extend = require("util")._extend))({}, options);
					opts.partials = partials;
					if (err) return cb(err);
					if (cache(opts)) exports[name].render("", opts, cb);
					else read(path$10, opts, function(err, str) {
						if (err) return cb(err);
						exports[name].render(str, opts, cb);
					});
				});
			});
		};
	}
	/**
	* velocity support.
	*/
	exports.velocityjs = fromStringRenderer("velocityjs");
	/**
	* velocity string support.
	*/
	exports.velocityjs.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.velocityjs || (requires.velocityjs = require("velocityjs"));
			try {
				options.locals = options;
				cb(null, engine.render(str, options).trimLeft());
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Liquid support.
	*/
	exports.liquid = fromStringRenderer("liquid");
	/**
	* Liquid string support.
	*/
	/**
	* Note that in order to get filters and custom tags we've had to push
	* all user-defined locals down into @locals. However, just to make things
	* backwards-compatible, any property of `options` that is left after
	* processing and removing `locals`, `meta`, `filters`, `customTags` and
	* `includeDir` will also become a local.
	*/
	function _renderTinyliquid(engine, str, options, cb) {
		var context = engine.newContext();
		var k;
		/**
		* Note that there's a bug in the library that doesn't allow us to pass
		* the locals to newContext(), hence looping through the keys:
		*/
		if (options.locals) {
			for (k in options.locals) context.setLocals(k, options.locals[k]);
			delete options.locals;
		}
		if (options.meta) {
			context.setLocals("page", options.meta);
			delete options.meta;
		}
		/**
		* Add any defined filters:
		*/
		if (options.filters) {
			for (k in options.filters) context.setFilter(k, options.filters[k]);
			delete options.filters;
		}
		/**
		* Set up a callback for the include directory:
		*/
		var includeDir = options.includeDir || process.cwd();
		context.onInclude(function(name, callback) {
			var extname = path$4.extname(name) ? "" : ".liquid";
			var filename = path$4.resolve(includeDir, name + extname);
			fs.readFile(filename, { encoding: "utf8" }, function(err, data) {
				if (err) return callback(err);
				callback(null, engine.parse(data));
			});
		});
		delete options.includeDir;
		/**
		* The custom tag functions need to have their results pushed back
		* through the parser, so set up a shim before calling the provided
		* callback:
		*/
		var compileOptions = { customTags: {} };
		if (options.customTags) {
			var tagFunctions = options.customTags;
			for (k in options.customTags) compileOptions.customTags[k] = function(context, name, body) {
				var tpl = tagFunctions[name](body.trim());
				context.astStack.push(engine.parse(tpl));
			};
			delete options.customTags;
		}
		/**
		* Now anything left in `options` becomes a local:
		*/
		for (k in options) context.setLocals(k, options[k]);
		(cache(context) || cache(context, engine.compile(str, compileOptions)))(context, cb);
	}
	exports.liquid.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.liquid;
			var Liquid;
			try {
				engine = requires.liquid = require("tinyliquid");
				_renderTinyliquid(engine, str, options, cb);
				return;
			} catch (err) {
				try {
					Liquid = requires.liquid = require("liquid-node");
					engine = new Liquid.Engine();
				} catch (err) {
					throw err;
				}
			}
			try {
				var locals = options.locals || {};
				if (options.meta) {
					locals.pages = options.meta;
					delete options.meta;
				}
				/**
				* Add any defined filters:
				*/
				if (options.filters) {
					engine.registerFilters(options.filters);
					delete options.filters;
				}
				/**
				* Set up a callback for the include directory:
				*/
				var includeDir = options.includeDir || process.cwd();
				engine.fileSystem = new Liquid.LocalFileSystem(includeDir, "liquid");
				delete options.includeDir;
				/**
				* The custom tag functions need to have their results pushed back
				* through the parser, so set up a shim before calling the provided
				* callback:
				*/
				if (options.customTags) {
					var tagFunctions = options.customTags;
					for (k in options.customTags) engine.registerTag(k, tagFunctions[k]);
					delete options.customTags;
				}
				/**
				* Now anything left in `options` becomes a local:
				*/
				for (var k in options) locals[k] = options[k];
				/**
				* Finally, execute the template:
				*/
				return engine.parseAndRender(str, locals).nodeify(function(err, result) {
					if (err) throw new Error(err);
					else return cb(null, result);
				});
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Jade support.
	*/
	exports.jade = function(path$11, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.jade;
			if (!engine) try {
				engine = requires.jade = require("jade");
			} catch (err) {
				try {
					engine = requires.jade = require("then-jade");
				} catch (otherError) {
					throw err;
				}
			}
			try {
				cb(null, (cache(options) || cache(options, engine.compileFile(path$11, options)))(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Jade string support.
	*/
	exports.jade.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.jade;
			if (!engine) try {
				engine = requires.jade = require("jade");
			} catch (err) {
				try {
					engine = requires.jade = require("then-jade");
				} catch (otherError) {
					throw err;
				}
			}
			try {
				cb(null, (cache(options) || cache(options, engine.compile(str, options)))(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Dust support.
	*/
	exports.dust = fromStringRenderer("dust");
	/**
	* Dust string support.
	*/
	exports.dust.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.dust;
			if (!engine) try {
				engine = requires.dust = require("dust");
			} catch (err) {
				try {
					engine = requires.dust = require("dustjs-helpers");
				} catch (err) {
					engine = requires.dust = require("dustjs-linkedin");
				}
			}
			var ext = "dust";
			var views = ".";
			if (options) {
				if (options.ext) ext = options.ext;
				if (options.views) views = options.views;
				if (options.settings && options.settings.views) views = options.settings.views;
			}
			if (!options || options && !options.cache) engine.cache = {};
			engine.onLoad = function(path$12, callback) {
				if (extname(path$12) === "") path$12 += "." + ext;
				if (path$12[0] !== "/") path$12 = views + "/" + path$12;
				read(path$12, options, callback);
			};
			try {
				var templateName;
				if (options.filename) templateName = options.filename.replace(new RegExp("^" + views + "/"), "").replace(new RegExp("\\." + ext), "");
				(cache(options) || cache(options, engine.compileFn(str, templateName)))(options, cb);
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Swig support.
	*/
	exports.swig = fromStringRenderer("swig");
	/**
	* Swig string support.
	*/
	exports.swig.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.swig;
			if (!engine) try {
				engine = requires.swig = require("swig");
			} catch (err) {
				try {
					engine = requires.swig = require("swig-templates");
				} catch (otherError) {
					throw err;
				}
			}
			try {
				if (options.cache === true) options.cache = "memory";
				engine.setDefaults({ cache: options.cache });
				cb(null, (cache(options) || cache(options, engine.compile(str, options)))(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Razor support.
	*/
	exports.razor = function(path$13, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.razor;
			if (!engine) try {
				engine = requires.razor = require("razor-tmpl");
			} catch (err) {
				throw err;
			}
			try {
				cb(null, (cache(options) || cache(options, (locals) => {
					console.log("Rendering razor file", path$13);
					return engine.renderFileSync(path$13, locals);
				}))(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* razor string support.
	*/
	exports.razor.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			try {
				var engine = requires.razor = require("razor-tmpl");
			} catch (err) {
				throw err;
			}
			try {
				var tf = engine.compile(str);
				cb(null, (cache(options) || cache(options, tf))(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Atpl support.
	*/
	exports.atpl = fromStringRenderer("atpl");
	/**
	* Atpl string support.
	*/
	exports.atpl.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.atpl || (requires.atpl = require("atpl"));
			try {
				cb(null, (cache(options) || cache(options, engine.compile(str, options)))(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Liquor support,
	*/
	exports.liquor = fromStringRenderer("liquor");
	/**
	* Liquor string support.
	*/
	exports.liquor.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.liquor || (requires.liquor = require("liquor"));
			try {
				cb(null, (cache(options) || cache(options, engine.compile(str, options)))(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Twig support.
	*/
	exports.twig = fromStringRenderer("twig");
	/**
	* Twig string support.
	*/
	exports.twig.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.twig || (requires.twig = require("twig").twig);
			var templateData = {
				data: str,
				allowInlineIncludes: options.allowInlineIncludes,
				namespaces: options.namespaces,
				path: options.path
			};
			try {
				cb(null, (cache(templateData) || cache(templateData, engine(templateData))).render(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* EJS support.
	*/
	exports.ejs = fromStringRenderer("ejs");
	/**
	* EJS string support.
	*/
	exports.ejs.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.ejs || (requires.ejs = require("ejs"));
			try {
				cb(null, (cache(options) || cache(options, engine.compile(str, options)))(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Eco support.
	*/
	exports.eco = fromStringRenderer("eco");
	/**
	* Eco string support.
	*/
	exports.eco.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.eco || (requires.eco = require("eco"));
			try {
				cb(null, engine.render(str, options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Jazz support.
	*/
	exports.jazz = fromStringRenderer("jazz");
	/**
	* Jazz string support.
	*/
	exports.jazz.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.jazz || (requires.jazz = require("jazz"));
			try {
				(cache(options) || cache(options, engine.compile(str, options))).eval(options, function(str) {
					cb(null, str);
				});
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* JQTPL support.
	*/
	exports.jqtpl = fromStringRenderer("jqtpl");
	/**
	* JQTPL string support.
	*/
	exports.jqtpl.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.jqtpl || (requires.jqtpl = require("jqtpl"));
			try {
				engine.template(str, str);
				cb(null, engine.tmpl(str, options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Haml support.
	*/
	exports.haml = fromStringRenderer("haml");
	/**
	* Haml string support.
	*/
	exports.haml.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.haml || (requires.haml = require("hamljs"));
			try {
				options.locals = options;
				cb(null, engine.render(str, options).trimLeft());
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Hamlet support.
	*/
	exports.hamlet = fromStringRenderer("hamlet");
	/**
	* Hamlet string support.
	*/
	exports.hamlet.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.hamlet || (requires.hamlet = require("hamlet"));
			try {
				options.locals = options;
				cb(null, engine.render(str, options).trimLeft());
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Whiskers support.
	*/
	exports.whiskers = function(path$14, options, cb) {
		return promisify(cb, function(cb) {
			(requires.whiskers || (requires.whiskers = require("whiskers"))).__express(path$14, options, cb);
		});
	};
	/**
	* Whiskers string support.
	*/
	exports.whiskers.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.whiskers || (requires.whiskers = require("whiskers"));
			try {
				cb(null, engine.render(str, options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Coffee-HAML support.
	*/
	exports["haml-coffee"] = fromStringRenderer("haml-coffee");
	/**
	* Coffee-HAML string support.
	*/
	exports["haml-coffee"].render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires["haml-coffee"] || (requires["haml-coffee"] = require("haml-coffee"));
			try {
				cb(null, (cache(options) || cache(options, engine.compile(str, options)))(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Hogan support.
	*/
	exports.hogan = fromStringRenderer("hogan");
	/**
	* Hogan string support.
	*/
	exports.hogan.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.hogan || (requires.hogan = require("hogan.js"));
			try {
				cb(null, (cache(options) || cache(options, engine.compile(str, options))).render(options, options.partials));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* templayed.js support.
	*/
	exports.templayed = fromStringRenderer("templayed");
	/**
	* templayed.js string support.
	*/
	exports.templayed.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.templayed || (requires.templayed = require("templayed"));
			try {
				cb(null, (cache(options) || cache(options, engine(str)))(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Handlebars support.
	*/
	exports.handlebars = fromStringRenderer("handlebars");
	/**
	* Handlebars string support.
	*/
	exports.handlebars.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.handlebars || (requires.handlebars = require("handlebars"));
			try {
				for (var partial in options.partials) engine.registerPartial(partial, options.partials[partial]);
				for (var helper in options.helpers) engine.registerHelper(helper, options.helpers[helper]);
				cb(null, (cache(options) || cache(options, engine.compile(str, options)))(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Underscore support.
	*/
	exports.underscore = fromStringRenderer("underscore");
	/**
	* Underscore string support.
	*/
	exports.underscore.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.underscore || (requires.underscore = require("underscore"));
			try {
				const partials = {};
				for (var partial in options.partials) partials[partial] = engine.template(options.partials[partial]);
				options.partials = partials;
				cb(null, (cache(options) || cache(options, engine.template(str, null, options)))(options).replace(/\n$/, ""));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Lodash support.
	*/
	exports.lodash = fromStringRenderer("lodash");
	/**
	* Lodash string support.
	*/
	exports.lodash.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.lodash || (requires.lodash = require("lodash"));
			try {
				cb(null, (cache(options) || cache(options, engine.template(str, options)))(options).replace(/\n$/, ""));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Pug support. (formerly Jade)
	*/
	exports.pug = function(path$15, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.pug;
			if (!engine) try {
				engine = requires.pug = require("pug");
			} catch (err) {
				try {
					engine = requires.pug = require("then-pug");
				} catch (otherError) {
					throw err;
				}
			}
			try {
				cb(null, (cache(options) || cache(options, engine.compileFile(path$15, options)))(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Pug string support.
	*/
	exports.pug.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.pug;
			if (!engine) try {
				engine = requires.pug = require("pug");
			} catch (err) {
				try {
					engine = requires.pug = require("then-pug");
				} catch (otherError) {
					throw err;
				}
			}
			try {
				cb(null, (cache(options) || cache(options, engine.compile(str, options)))(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* QEJS support.
	*/
	exports.qejs = fromStringRenderer("qejs");
	/**
	* QEJS string support.
	*/
	exports.qejs.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			try {
				(requires.qejs || (requires.qejs = require("qejs"))).render(str, options).then(function(result) {
					cb(null, result);
				}, function(err) {
					cb(err);
				}).done();
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Walrus support.
	*/
	exports.walrus = fromStringRenderer("walrus");
	/**
	* Walrus string support.
	*/
	exports.walrus.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.walrus || (requires.walrus = require("walrus"));
			try {
				cb(null, (cache(options) || cache(options, engine.parse(str))).compile(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Mustache support.
	*/
	exports.mustache = fromStringRenderer("mustache");
	/**
	* Mustache string support.
	*/
	exports.mustache.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.mustache || (requires.mustache = require("mustache"));
			try {
				cb(null, engine.render(str, options, options.partials));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Just support.
	*/
	exports.just = function(path$16, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.just;
			if (!engine) engine = requires.just = new (require("just"))();
			engine.configure({ useCache: options.cache });
			engine.render(path$16, options, cb);
		});
	};
	/**
	* Just string support.
	*/
	exports.just.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			new (require("just"))({ root: { page: str } }).render("page", options, cb);
		});
	};
	/**
	* ECT support.
	*/
	exports.ect = function(path$17, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.ect;
			if (!engine) engine = requires.ect = new (require("ect"))(options);
			engine.configure({ cache: options.cache });
			engine.render(path$17, options, cb);
		});
	};
	/**
	* ECT string support.
	*/
	exports.ect.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			new (require("ect"))({ root: { page: str } }).render("page", options, cb);
		});
	};
	/**
	* mote support.
	*/
	exports.mote = fromStringRenderer("mote");
	/**
	* mote string support.
	*/
	exports.mote.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.mote || (requires.mote = require("mote"));
			try {
				cb(null, (cache(options) || cache(options, engine.compile(str)))(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Toffee support.
	*/
	exports.toffee = function(path$18, options, cb) {
		return promisify(cb, function(cb) {
			(requires.toffee || (requires.toffee = require("toffee"))).__consolidate_engine_render(path$18, options, cb);
		});
	};
	/**
	* Toffee string support.
	*/
	exports.toffee.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.toffee || (requires.toffee = require("toffee"));
			try {
				engine.str_render(str, options, cb);
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* doT support.
	*/
	exports.dot = fromStringRenderer("dot");
	/**
	* doT string support.
	*/
	exports.dot.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.dot || (requires.dot = require("dot"));
			var extend = requires.extend || (requires.extend = require("util")._extend);
			try {
				var settings = {};
				settings = extend(settings, engine.templateSettings);
				settings = extend(settings, options ? options.dot : {});
				cb(null, (cache(options) || cache(options, engine.template(str, settings, options)))(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* bracket support.
	*/
	exports.bracket = fromStringRenderer("bracket");
	/**
	* bracket string support.
	*/
	exports.bracket.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.bracket || (requires.bracket = require("bracket-template"));
			try {
				cb(null, (cache(options) || cache(options, engine.default.compile(str, options)))(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Ractive support.
	*/
	exports.ractive = fromStringRenderer("ractive");
	/**
	* Ractive string support.
	*/
	exports.ractive.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var Engine = requires.ractive || (requires.ractive = require("ractive"));
			options.template = cache(options) || cache(options, Engine.parse(str));
			if (options.data === null || options.data === void 0) {
				options.data = (requires.extend || (requires.extend = require("util")._extend))({}, options);
				var i;
				var length;
				var properties = [
					"template",
					"filename",
					"cache",
					"partials"
				];
				for (i = 0, length = properties.length; i < length; i++) {
					var property = properties[i];
					delete options.data[property];
				}
			}
			try {
				cb(null, new Engine(options).toHTML());
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Nunjucks support.
	*/
	exports.nunjucks = fromStringRenderer("nunjucks");
	/**
	* Nunjucks string support.
	*/
	exports.nunjucks.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			try {
				var engine = options.nunjucksEnv || requires.nunjucks || (requires.nunjucks = require("nunjucks"));
				var env = engine;
				if (options.settings && options.settings.views) env = engine.configure(options.settings.views);
				else if (options.nunjucks && options.nunjucks.configure) env = engine.configure.apply(engine, options.nunjucks.configure);
				if (options.loader) env = new engine.Environment(options.loader);
				else if (options.settings && options.settings.views) env = new engine.Environment(new engine.FileSystemLoader(options.settings.views));
				else if (options.nunjucks && options.nunjucks.loader) if (typeof options.nunjucks.loader === "string") env = new engine.Environment(new engine.FileSystemLoader(options.nunjucks.loader));
				else env = new engine.Environment(new engine.FileSystemLoader(options.nunjucks.loader[0], options.nunjucks.loader[1]));
				env.renderString(str, options, cb);
			} catch (err) {
				throw cb(err);
			}
		});
	};
	/**
	* HTMLing support.
	*/
	exports.htmling = fromStringRenderer("htmling");
	/**
	* HTMLing string support.
	*/
	exports.htmling.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.htmling || (requires.htmling = require("htmling"));
			try {
				cb(null, (cache(options) || cache(options, engine.string(str))).render(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	*  Rendering function
	*/
	function requireReact(module$1, filename) {
		var compiled = (requires.babel || (requires.babel = require("babel-core"))).transformFileSync(filename, { presets: ["react"] }).code;
		return module$1._compile(compiled, filename);
	}
	exports.requireReact = requireReact;
	/**
	*  Converting a string into a node module.
	*/
	function requireReactString(src, filename) {
		var babel = requires.babel || (requires.babel = require("babel-core"));
		if (!filename) filename = "";
		var m = new module.constructor();
		filename = filename || "";
		var compiled = babel.transform(src, { presets: ["react"] }).code;
		m.paths = module.paths;
		m._compile(compiled, filename);
		return m.exports;
	}
	/**
	* A naive helper to replace {{tags}} with options.tags content
	*/
	function reactBaseTmpl(data, options) {
		var exp;
		var regex;
		for (var k in options) if (options.hasOwnProperty(k)) {
			exp = "{{" + k + "}}";
			regex = new RegExp(exp, "g");
			if (data.match(regex)) data = data.replace(regex, options[k]);
		}
		return data;
	}
	/**
	* Plates Support.
	*/
	exports.plates = fromStringRenderer("plates");
	/**
	* Plates string support.
	*/
	exports.plates.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.plates || (requires.plates = require("plates"));
			var map = options.map || void 0;
			try {
				cb(null, engine.bind(str, options, map));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	*  The main render parser for React bsaed templates
	*/
	function reactRenderer(type) {
		if (require.extensions) {
			if (!require.extensions[".jsx"]) require.extensions[".jsx"] = requireReact;
			if (!require.extensions[".react"]) require.extensions[".react"] = requireReact;
		}
		return function(str, options, cb) {
			return promisify(cb, function(cb) {
				var ReactDOM = requires.ReactDOM || (requires.ReactDOM = require("react-dom/server"));
				var react = requires.react || (requires.react = require("react"));
				var base = options.base;
				delete options.base;
				var enableCache = options.cache;
				delete options.cache;
				var isNonStatic = options.isNonStatic;
				delete options.isNonStatic;
				try {
					var Code;
					var Factory;
					var baseStr;
					var content;
					var parsed;
					if (!cache(options)) {
						if (type === "path") {
							var path$19 = resolve(str);
							delete require.cache[path$19];
							Code = require(path$19);
						} else Code = requireReactString(str);
						Factory = cache(options, react.createFactory(Code));
					} else Factory = cache(options);
					parsed = new Factory(options);
					content = isNonStatic ? ReactDOM.renderToString(parsed) : ReactDOM.renderToStaticMarkup(parsed);
					if (base) {
						baseStr = readCache[str] || fs.readFileSync(resolve(base), "utf8");
						if (enableCache) readCache[str] = baseStr;
						options.content = content;
						content = reactBaseTmpl(baseStr, options);
					}
					cb(null, content);
				} catch (err) {
					cb(err);
				}
			});
		};
	}
	/**
	* React JS Support
	*/
	exports.react = reactRenderer("path");
	/**
	* React JS string support.
	*/
	exports.react.render = reactRenderer("string");
	/**
	* ARC-templates support.
	*/
	exports["arc-templates"] = fromStringRenderer("arc-templates");
	/**
	* ARC-templates string support.
	*/
	exports["arc-templates"].render = function(str, options, cb) {
		var readFileWithOptions = util.promisify(read);
		var consolidateFileSystem = {};
		consolidateFileSystem.readFile = function(path$20) {
			return readFileWithOptions(path$20, options);
		};
		return promisify(cb, function(cb) {
			try {
				var engine = requires["arc-templates"];
				if (!engine) engine = requires["arc-templates"] = new (require("arc-templates/dist/es5"))({ filesystem: consolidateFileSystem });
				(cache(options) || cache(options, engine.compileString(str, options.filename))).then(function(func) {
					return func(options);
				}).then(function(result) {
					cb(null, result.content);
				}).catch(cb);
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Vash support
	*/
	exports.vash = fromStringRenderer("vash");
	/**
	* Vash string support
	*/
	exports.vash.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.vash || (requires.vash = require("vash"));
			try {
				if (options.helpers) for (var key in options.helpers) {
					if (!options.helpers.hasOwnProperty(key) || typeof options.helpers[key] !== "function") continue;
					engine.helpers[key] = options.helpers[key];
				}
				(cache(options) || cache(options, engine.compile(str, options)))(options, function sealLayout(err, ctx) {
					if (err) cb(err);
					ctx.finishLayout();
					cb(null, ctx.toString().replace(/\n$/, ""));
				});
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Slm support.
	*/
	exports.slm = fromStringRenderer("slm");
	/**
	* Slm string support.
	*/
	exports.slm.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.slm || (requires.slm = require("slm"));
			try {
				cb(null, (cache(options) || cache(options, engine.compile(str, options)))(options));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Marko support.
	*/
	exports.marko = function(path$21, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.marko || (requires.marko = require("marko"));
			options.writeToDisk = !!options.cache;
			try {
				(cache(options) || cache(options, engine.load(path$21, options))).renderToString(options, cb);
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Marko string support.
	*/
	exports.marko.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.marko || (requires.marko = require("marko"));
			options.writeToDisk = !!options.cache;
			options.filename = options.filename || "string.marko";
			try {
				(cache(options) || cache(options, engine.load(options.filename, str, options))).renderToString(options, cb);
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Teacup support.
	*/
	exports.teacup = function(path$22, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.teacup || (requires.teacup = require("teacup/lib/express"));
			require.extensions[".teacup"] = require.extensions[".coffee"];
			if (path$22[0] !== "/") path$22 = join(process.cwd(), path$22);
			if (!options.cache) {
				var callback = cb;
				cb = function() {
					delete require.cache[path$22];
					callback.apply(this, arguments);
				};
			}
			engine.renderFile(path$22, options, cb);
		});
	};
	/**
	* Teacup string support.
	*/
	exports.teacup.render = function(str, options, cb) {
		var coffee = require("coffee-script");
		var vm = require("vm");
		var sandbox = {
			module: { exports: {} },
			require
		};
		return promisify(cb, function(cb) {
			vm.runInNewContext(coffee.compile(str), sandbox);
			var tmpl = sandbox.module.exports;
			cb(null, tmpl(options));
		});
	};
	/**
	* Squirrelly support.
	*/
	exports.squirrelly = fromStringRenderer("squirrelly");
	/**
	* Squirrelly string support.
	*/
	exports.squirrelly.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.squirrelly || (requires.squirrelly = require("squirrelly"));
			try {
				for (var partial in options.partials) engine.definePartial(partial, options.partials[partial]);
				for (var helper in options.helpers) engine.defineHelper(helper, options.helpers[helper]);
				cb(null, (cache(options) || cache(options, engine.Compile(str, options)))(options, engine));
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* Twing support.
	*/
	exports.twing = fromStringRenderer("twing");
	/**
	* Twing string support.
	*/
	exports.twing.render = function(str, options, cb) {
		return promisify(cb, function(cb) {
			var engine = requires.twing || (requires.twing = require("twing"));
			try {
				new engine.TwingEnvironment(new engine.TwingLoaderNull()).createTemplate(str).then((twingTemplate) => {
					twingTemplate.render(options).then((rendTmpl) => {
						cb(null, cache(options) || cache(options, rendTmpl));
					});
				});
			} catch (err) {
				cb(err);
			}
		});
	};
	/**
	* expose the instance of the engine
	*/
	exports.requires = requires;
}));

//#endregion
//#region node_modules/.pnpm/@vue+consolidate@1.0.0/node_modules/@vue/consolidate/index.js
var require_consolidate = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_consolidate$1();
}));

//#endregion
//#region packages/compiler-sfc/src/warn.ts
var import_consolidate = /* @__PURE__ */ __toESM(require_consolidate());
const hasWarned = {};
function warnOnce(msg) {
	if (!(typeof process !== "undefined" && process.env.NODE_ENV === "production") && !hasWarned[msg]) {
		hasWarned[msg] = true;
		warn(msg);
	}
}
function warn(msg) {
	console.warn(`\x1b[1m\x1b[33m[@vue/compiler-sfc]\x1b[0m\x1b[33m ${msg}\x1b[0m\n`);
}

//#endregion
//#region packages/compiler-sfc/src/compileTemplate.ts
function preprocess$1({ source, filename, preprocessOptions }, preprocessor) {
	let res = "";
	let err = null;
	preprocessor.render(source, {
		filename,
		...preprocessOptions
	}, (_err, _res) => {
		if (_err) err = _err;
		res = _res;
	});
	if (err) throw err;
	return res;
}
function compileTemplate(options) {
	const { preprocessLang, preprocessCustomRequire } = options;
	const preprocessor = preprocessLang ? preprocessCustomRequire ? preprocessCustomRequire(preprocessLang) : import_consolidate.default[preprocessLang] : false;
	if (preprocessor) try {
		return doCompileTemplate({
			...options,
			source: preprocess$1(options, preprocessor),
			ast: void 0
		});
	} catch (e) {
		return {
			code: `export default function render() {}`,
			source: options.source,
			tips: [],
			errors: [e]
		};
	}
	else if (preprocessLang) return {
		code: `export default function render() {}`,
		source: options.source,
		tips: [`Component ${options.filename} uses lang ${preprocessLang} for template. Please install the language preprocessor.`],
		errors: [`Component ${options.filename} uses lang ${preprocessLang} for template, however it is not installed.`]
	};
	else return doCompileTemplate(options);
}
function doCompileTemplate({ filename, id, scoped, slotted, inMap, source, ast: inAST, ssr = false, vapor = false, ssrCssVars, isProd = false, compiler, compilerOptions = {}, transformAssetUrls }) {
	const errors = [];
	const warnings = [];
	let nodeTransforms = [];
	if ((0, _vue_shared.isObject)(transformAssetUrls)) {
		const assetOptions = normalizeOptions(transformAssetUrls);
		nodeTransforms = [createAssetUrlTransformWithOptions(assetOptions), createSrcsetTransformWithOptions(assetOptions)];
	} else if (transformAssetUrls !== false) nodeTransforms = [transformAssetUrl, transformSrcset];
	if (ssr && !ssrCssVars) warnOnce("compileTemplate is called with `ssr: true` but no corresponding `cssVars` option.");
	if (!id) {
		warnOnce(`compileTemplate now requires the \`id\` option.`);
		id = "";
	}
	const shortId = id.replace(/^data-v-/, "");
	const longId = `data-v-${shortId}`;
	const defaultCompiler = ssr ? _vue_compiler_ssr : vapor ? _vue_compiler_vapor : _vue_compiler_dom;
	compiler = compiler || defaultCompiler;
	if (compiler !== defaultCompiler) inAST = void 0;
	if (inAST === null || inAST === void 0 ? void 0 : inAST.transformed) inAST = (0, _vue_compiler_core.createRoot)((ssr ? _vue_compiler_dom : compiler).parse(inAST.source, {
		prefixIdentifiers: true,
		...compilerOptions,
		parseMode: "sfc",
		onError: (e) => errors.push(e)
	}).children.find((node) => node.type === 1 && node.tag === "template").children, inAST.source);
	let { code, ast, preamble, map, helpers } = compiler.compile(inAST || source, {
		mode: "module",
		prefixIdentifiers: true,
		hoistStatic: true,
		cacheHandlers: true,
		ssrCssVars: ssr && ssrCssVars && ssrCssVars.length ? genCssVarsFromList(ssrCssVars, shortId, isProd, true) : "",
		scopeId: scoped ? longId : void 0,
		slotted,
		sourceMap: true,
		...compilerOptions,
		hmr: !isProd,
		nodeTransforms: nodeTransforms.concat(compilerOptions.nodeTransforms || []),
		filename,
		onError: (e) => errors.push(e),
		onWarn: (w) => warnings.push(w)
	});
	if (inMap && !inAST) {
		if (map) map = mapLines(inMap, map);
		if (errors.length) patchErrors(errors, source, inMap);
		if (warnings.length && compilerOptions.onWarn) {
			patchErrors(warnings, source, inMap);
			warnings.forEach((w) => {
				var _compilerOptions$onWa;
				return (_compilerOptions$onWa = compilerOptions.onWarn) === null || _compilerOptions$onWa === void 0 ? void 0 : _compilerOptions$onWa.call(compilerOptions, w);
			});
			warnings.length = 0;
		}
	}
	return {
		code,
		ast,
		preamble,
		source,
		errors,
		tips: warnings.map((w) => {
			let msg = w.message;
			if (w.loc) msg += `\n${(0, _vue_shared.generateCodeFrame)((inAST === null || inAST === void 0 ? void 0 : inAST.source) || source, w.loc.start.offset, w.loc.end.offset)}`;
			return msg;
		}),
		map,
		helpers
	};
}
function mapLines(oldMap, newMap) {
	if (!oldMap) return newMap;
	if (!newMap) return oldMap;
	const oldMapConsumer = new source_map_js.SourceMapConsumer(oldMap);
	const newMapConsumer = new source_map_js.SourceMapConsumer(newMap);
	const mergedMapGenerator = new source_map_js.SourceMapGenerator();
	newMapConsumer.eachMapping((m) => {
		if (m.originalLine == null) return;
		const origPosInOldMap = oldMapConsumer.originalPositionFor({
			line: m.originalLine,
			column: m.originalColumn
		});
		if (origPosInOldMap.source == null) return;
		mergedMapGenerator.addMapping({
			generated: {
				line: m.generatedLine,
				column: m.generatedColumn
			},
			original: {
				line: origPosInOldMap.line,
				column: m.originalColumn
			},
			source: origPosInOldMap.source,
			name: origPosInOldMap.name
		});
	});
	const generator = mergedMapGenerator;
	oldMapConsumer.sources.forEach((sourceFile) => {
		generator._sources.add(sourceFile);
		const sourceContent = oldMapConsumer.sourceContentFor(sourceFile);
		if (sourceContent != null) mergedMapGenerator.setSourceContent(sourceFile, sourceContent);
	});
	generator._sourceRoot = oldMap.sourceRoot;
	generator._file = oldMap.file;
	return generator.toJSON();
}
function patchErrors(errors, source, inMap) {
	const originalSource = inMap.sourcesContent[0];
	const offset = originalSource.indexOf(source);
	const lineOffset = originalSource.slice(0, offset).split(/\r?\n/).length - 1;
	errors.forEach((err) => {
		if (err.loc) {
			err.loc.start.line += lineOffset;
			err.loc.start.offset += offset;
			if (err.loc.end !== err.loc.start) {
				err.loc.end.line += lineOffset;
				err.loc.end.offset += offset;
			}
		}
	});
}

//#endregion
//#region packages/compiler-sfc/src/style/pluginTrim.ts
const trimPlugin = () => {
	return {
		postcssPlugin: "vue-sfc-trim",
		Once(root) {
			root.walk(({ type, raws }) => {
				if (type === "rule" || type === "atrule") {
					if (raws.before) raws.before = "\n";
					if ("after" in raws && raws.after) raws.after = "\n";
				}
			});
		}
	};
};
trimPlugin.postcss = true;
var pluginTrim_default = trimPlugin;

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/util/unesc.js
var require_unesc = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = unesc;
	/**
	* 
	* @param {string} str 
	* @returns {[string, number]|undefined}
	*/
	function gobbleHex(str) {
		var lower = str.toLowerCase();
		var hex = "";
		var spaceTerminated = false;
		for (var i = 0; i < 6 && lower[i] !== void 0; i++) {
			var code = lower.charCodeAt(i);
			var valid = code >= 97 && code <= 102 || code >= 48 && code <= 57;
			spaceTerminated = code === 32;
			if (!valid) break;
			hex += lower[i];
		}
		if (hex.length === 0) return;
		var codePoint = parseInt(hex, 16);
		if (codePoint >= 55296 && codePoint <= 57343 || codePoint === 0 || codePoint > 1114111) return ["�", hex.length + (spaceTerminated ? 1 : 0)];
		return [String.fromCodePoint(codePoint), hex.length + (spaceTerminated ? 1 : 0)];
	}
	var CONTAINS_ESCAPE = /\\/;
	function unesc(str) {
		if (!CONTAINS_ESCAPE.test(str)) return str;
		var ret = "";
		for (var i = 0; i < str.length; i++) {
			if (str[i] === "\\") {
				var gobbled = gobbleHex(str.slice(i + 1, i + 7));
				if (gobbled !== void 0) {
					ret += gobbled[0];
					i += gobbled[1];
					continue;
				}
				if (str[i + 1] === "\\") {
					ret += "\\";
					i++;
					continue;
				}
				if (str.length === i + 1) ret += str[i];
				continue;
			}
			ret += str[i];
		}
		return ret;
	}
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/util/getProp.js
var require_getProp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = getProp;
	function getProp(obj) {
		for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) props[_key - 1] = arguments[_key];
		while (props.length > 0) {
			var prop = props.shift();
			if (!obj[prop]) return;
			obj = obj[prop];
		}
		return obj;
	}
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/util/ensureObject.js
var require_ensureObject = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = ensureObject;
	function ensureObject(obj) {
		for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) props[_key - 1] = arguments[_key];
		while (props.length > 0) {
			var prop = props.shift();
			if (!obj[prop]) obj[prop] = {};
			obj = obj[prop];
		}
	}
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/util/stripComments.js
var require_stripComments = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = stripComments;
	function stripComments(str) {
		var s = "";
		var commentStart = str.indexOf("/*");
		var lastEnd = 0;
		while (commentStart >= 0) {
			s = s + str.slice(lastEnd, commentStart);
			var commentEnd = str.indexOf("*/", commentStart + 2);
			if (commentEnd < 0) return s;
			lastEnd = commentEnd + 2;
			commentStart = str.indexOf("/*", lastEnd);
		}
		s = s + str.slice(lastEnd);
		return s;
	}
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/util/index.js
var require_util$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	exports.unesc = exports.stripComments = exports.getProp = exports.ensureObject = void 0;
	var _unesc = _interopRequireDefault(require_unesc());
	exports.unesc = _unesc["default"];
	var _getProp = _interopRequireDefault(require_getProp());
	exports.getProp = _getProp["default"];
	var _ensureObject = _interopRequireDefault(require_ensureObject());
	exports.ensureObject = _ensureObject["default"];
	var _stripComments = _interopRequireDefault(require_stripComments());
	exports.stripComments = _stripComments["default"];
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/selectors/node.js
var require_node$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _util = require_util$1();
	function _defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	function _createClass(Constructor, protoProps, staticProps) {
		if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		if (staticProps) _defineProperties(Constructor, staticProps);
		Object.defineProperty(Constructor, "prototype", { writable: false });
		return Constructor;
	}
	var cloneNode = function cloneNode(obj, parent) {
		if (typeof obj !== "object" || obj === null) return obj;
		var cloned = new obj.constructor();
		for (var i in obj) {
			if (!obj.hasOwnProperty(i)) continue;
			var value = obj[i];
			if (i === "parent" && typeof value === "object") {
				if (parent) cloned[i] = parent;
			} else if (value instanceof Array) cloned[i] = value.map(function(j) {
				return cloneNode(j, cloned);
			});
			else cloned[i] = cloneNode(value, cloned);
		}
		return cloned;
	};
	var Node = /* @__PURE__ */ function() {
		function Node(opts) {
			if (opts === void 0) opts = {};
			Object.assign(this, opts);
			this.spaces = this.spaces || {};
			this.spaces.before = this.spaces.before || "";
			this.spaces.after = this.spaces.after || "";
		}
		var _proto = Node.prototype;
		_proto.remove = function remove() {
			if (this.parent) this.parent.removeChild(this);
			this.parent = void 0;
			return this;
		};
		_proto.replaceWith = function replaceWith() {
			if (this.parent) {
				for (var index in arguments) this.parent.insertBefore(this, arguments[index]);
				this.remove();
			}
			return this;
		};
		_proto.next = function next() {
			return this.parent.at(this.parent.index(this) + 1);
		};
		_proto.prev = function prev() {
			return this.parent.at(this.parent.index(this) - 1);
		};
		_proto.clone = function clone(overrides) {
			if (overrides === void 0) overrides = {};
			var cloned = cloneNode(this);
			for (var name in overrides) cloned[name] = overrides[name];
			return cloned;
		};
		_proto.appendToPropertyAndEscape = function appendToPropertyAndEscape(name, value, valueEscaped) {
			if (!this.raws) this.raws = {};
			var originalValue = this[name];
			var originalEscaped = this.raws[name];
			this[name] = originalValue + value;
			if (originalEscaped || valueEscaped !== value) this.raws[name] = (originalEscaped || originalValue) + valueEscaped;
			else delete this.raws[name];
		};
		_proto.setPropertyAndEscape = function setPropertyAndEscape(name, value, valueEscaped) {
			if (!this.raws) this.raws = {};
			this[name] = value;
			this.raws[name] = valueEscaped;
		};
		_proto.setPropertyWithoutEscape = function setPropertyWithoutEscape(name, value) {
			this[name] = value;
			if (this.raws) delete this.raws[name];
		};
		_proto.isAtPosition = function isAtPosition(line, column) {
			if (this.source && this.source.start && this.source.end) {
				if (this.source.start.line > line) return false;
				if (this.source.end.line < line) return false;
				if (this.source.start.line === line && this.source.start.column > column) return false;
				if (this.source.end.line === line && this.source.end.column < column) return false;
				return true;
			}
		};
		_proto.stringifyProperty = function stringifyProperty(name) {
			return this.raws && this.raws[name] || this[name];
		};
		_proto.valueToString = function valueToString() {
			return String(this.stringifyProperty("value"));
		};
		_proto.toString = function toString() {
			return [
				this.rawSpaceBefore,
				this.valueToString(),
				this.rawSpaceAfter
			].join("");
		};
		_createClass(Node, [{
			key: "rawSpaceBefore",
			get: function get() {
				var rawSpace = this.raws && this.raws.spaces && this.raws.spaces.before;
				if (rawSpace === void 0) rawSpace = this.spaces && this.spaces.before;
				return rawSpace || "";
			},
			set: function set(raw) {
				(0, _util.ensureObject)(this, "raws", "spaces");
				this.raws.spaces.before = raw;
			}
		}, {
			key: "rawSpaceAfter",
			get: function get() {
				var rawSpace = this.raws && this.raws.spaces && this.raws.spaces.after;
				if (rawSpace === void 0) rawSpace = this.spaces.after;
				return rawSpace || "";
			},
			set: function set(raw) {
				(0, _util.ensureObject)(this, "raws", "spaces");
				this.raws.spaces.after = raw;
			}
		}]);
		return Node;
	}();
	exports["default"] = Node;
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/selectors/types.js
var require_types = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	exports.UNIVERSAL = exports.TAG = exports.STRING = exports.SELECTOR = exports.ROOT = exports.PSEUDO = exports.NESTING = exports.ID = exports.COMMENT = exports.COMBINATOR = exports.CLASS = exports.ATTRIBUTE = void 0;
	var TAG = "tag";
	exports.TAG = TAG;
	var STRING = "string";
	exports.STRING = STRING;
	var SELECTOR = "selector";
	exports.SELECTOR = SELECTOR;
	var ROOT = "root";
	exports.ROOT = ROOT;
	var PSEUDO = "pseudo";
	exports.PSEUDO = PSEUDO;
	var NESTING = "nesting";
	exports.NESTING = NESTING;
	var ID = "id";
	exports.ID = ID;
	var COMMENT = "comment";
	exports.COMMENT = COMMENT;
	var COMBINATOR = "combinator";
	exports.COMBINATOR = COMBINATOR;
	var CLASS = "class";
	exports.CLASS = CLASS;
	var ATTRIBUTE = "attribute";
	exports.ATTRIBUTE = ATTRIBUTE;
	var UNIVERSAL = "universal";
	exports.UNIVERSAL = UNIVERSAL;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/selectors/container.js
var require_container = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _node = _interopRequireDefault(require_node$1());
	var types = _interopRequireWildcard(require_types());
	function _getRequireWildcardCache(nodeInterop) {
		if (typeof WeakMap !== "function") return null;
		var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
		var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
		return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
			return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
		})(nodeInterop);
	}
	function _interopRequireWildcard(obj, nodeInterop) {
		if (!nodeInterop && obj && obj.__esModule) return obj;
		if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { "default": obj };
		var cache = _getRequireWildcardCache(nodeInterop);
		if (cache && cache.has(obj)) return cache.get(obj);
		var newObj = {};
		var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
			if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
			else newObj[key] = obj[key];
		}
		newObj["default"] = obj;
		if (cache) cache.set(obj, newObj);
		return newObj;
	}
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _createForOfIteratorHelperLoose(o, allowArrayLike) {
		var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
		if (it) return (it = it.call(o)).next.bind(it);
		if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
			if (it) o = it;
			var i = 0;
			return function() {
				if (i >= o.length) return { done: true };
				return {
					done: false,
					value: o[i++]
				};
			};
		}
		throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function _unsupportedIterableToArray(o, minLen) {
		if (!o) return;
		if (typeof o === "string") return _arrayLikeToArray(o, minLen);
		var n = Object.prototype.toString.call(o).slice(8, -1);
		if (n === "Object" && o.constructor) n = o.constructor.name;
		if (n === "Map" || n === "Set") return Array.from(o);
		if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}
	function _arrayLikeToArray(arr, len) {
		if (len == null || len > arr.length) len = arr.length;
		for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
		return arr2;
	}
	function _defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	function _createClass(Constructor, protoProps, staticProps) {
		if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		if (staticProps) _defineProperties(Constructor, staticProps);
		Object.defineProperty(Constructor, "prototype", { writable: false });
		return Constructor;
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	var Container = /* @__PURE__ */ function(_Node) {
		_inheritsLoose(Container, _Node);
		function Container(opts) {
			var _this = _Node.call(this, opts) || this;
			if (!_this.nodes) _this.nodes = [];
			return _this;
		}
		var _proto = Container.prototype;
		_proto.append = function append(selector) {
			selector.parent = this;
			this.nodes.push(selector);
			return this;
		};
		_proto.prepend = function prepend(selector) {
			selector.parent = this;
			this.nodes.unshift(selector);
			for (var id in this.indexes) this.indexes[id]++;
			return this;
		};
		_proto.at = function at(index) {
			return this.nodes[index];
		};
		_proto.index = function index(child) {
			if (typeof child === "number") return child;
			return this.nodes.indexOf(child);
		};
		_proto.removeChild = function removeChild(child) {
			child = this.index(child);
			this.at(child).parent = void 0;
			this.nodes.splice(child, 1);
			var index;
			for (var id in this.indexes) {
				index = this.indexes[id];
				if (index >= child) this.indexes[id] = index - 1;
			}
			return this;
		};
		_proto.removeAll = function removeAll() {
			for (var _iterator = _createForOfIteratorHelperLoose(this.nodes), _step; !(_step = _iterator()).done;) {
				var node = _step.value;
				node.parent = void 0;
			}
			this.nodes = [];
			return this;
		};
		_proto.empty = function empty() {
			return this.removeAll();
		};
		_proto.insertAfter = function insertAfter(oldNode, newNode) {
			var _this$nodes;
			newNode.parent = this;
			var oldIndex = this.index(oldNode);
			var resetNode = [];
			for (var i = 2; i < arguments.length; i++) resetNode.push(arguments[i]);
			(_this$nodes = this.nodes).splice.apply(_this$nodes, [
				oldIndex + 1,
				0,
				newNode
			].concat(resetNode));
			newNode.parent = this;
			var index;
			for (var id in this.indexes) {
				index = this.indexes[id];
				if (oldIndex < index) this.indexes[id] = index + arguments.length - 1;
			}
			return this;
		};
		_proto.insertBefore = function insertBefore(oldNode, newNode) {
			var _this$nodes2;
			newNode.parent = this;
			var oldIndex = this.index(oldNode);
			var resetNode = [];
			for (var i = 2; i < arguments.length; i++) resetNode.push(arguments[i]);
			(_this$nodes2 = this.nodes).splice.apply(_this$nodes2, [
				oldIndex,
				0,
				newNode
			].concat(resetNode));
			newNode.parent = this;
			var index;
			for (var id in this.indexes) {
				index = this.indexes[id];
				if (index >= oldIndex) this.indexes[id] = index + arguments.length - 1;
			}
			return this;
		};
		_proto._findChildAtPosition = function _findChildAtPosition(line, col) {
			var found = void 0;
			this.each(function(node) {
				if (node.atPosition) {
					var foundChild = node.atPosition(line, col);
					if (foundChild) {
						found = foundChild;
						return false;
					}
				} else if (node.isAtPosition(line, col)) {
					found = node;
					return false;
				}
			});
			return found;
		};
		_proto.atPosition = function atPosition(line, col) {
			if (this.isAtPosition(line, col)) return this._findChildAtPosition(line, col) || this;
			else return;
		};
		_proto._inferEndPosition = function _inferEndPosition() {
			if (this.last && this.last.source && this.last.source.end) {
				this.source = this.source || {};
				this.source.end = this.source.end || {};
				Object.assign(this.source.end, this.last.source.end);
			}
		};
		_proto.each = function each(callback) {
			if (!this.lastEach) this.lastEach = 0;
			if (!this.indexes) this.indexes = {};
			this.lastEach++;
			var id = this.lastEach;
			this.indexes[id] = 0;
			if (!this.length) return;
			var index, result;
			while (this.indexes[id] < this.length) {
				index = this.indexes[id];
				result = callback(this.at(index), index);
				if (result === false) break;
				this.indexes[id] += 1;
			}
			delete this.indexes[id];
			if (result === false) return false;
		};
		_proto.walk = function walk(callback) {
			return this.each(function(node, i) {
				var result = callback(node, i);
				if (result !== false && node.length) result = node.walk(callback);
				if (result === false) return false;
			});
		};
		_proto.walkAttributes = function walkAttributes(callback) {
			var _this2 = this;
			return this.walk(function(selector) {
				if (selector.type === types.ATTRIBUTE) return callback.call(_this2, selector);
			});
		};
		_proto.walkClasses = function walkClasses(callback) {
			var _this3 = this;
			return this.walk(function(selector) {
				if (selector.type === types.CLASS) return callback.call(_this3, selector);
			});
		};
		_proto.walkCombinators = function walkCombinators(callback) {
			var _this4 = this;
			return this.walk(function(selector) {
				if (selector.type === types.COMBINATOR) return callback.call(_this4, selector);
			});
		};
		_proto.walkComments = function walkComments(callback) {
			var _this5 = this;
			return this.walk(function(selector) {
				if (selector.type === types.COMMENT) return callback.call(_this5, selector);
			});
		};
		_proto.walkIds = function walkIds(callback) {
			var _this6 = this;
			return this.walk(function(selector) {
				if (selector.type === types.ID) return callback.call(_this6, selector);
			});
		};
		_proto.walkNesting = function walkNesting(callback) {
			var _this7 = this;
			return this.walk(function(selector) {
				if (selector.type === types.NESTING) return callback.call(_this7, selector);
			});
		};
		_proto.walkPseudos = function walkPseudos(callback) {
			var _this8 = this;
			return this.walk(function(selector) {
				if (selector.type === types.PSEUDO) return callback.call(_this8, selector);
			});
		};
		_proto.walkTags = function walkTags(callback) {
			var _this9 = this;
			return this.walk(function(selector) {
				if (selector.type === types.TAG) return callback.call(_this9, selector);
			});
		};
		_proto.walkUniversals = function walkUniversals(callback) {
			var _this10 = this;
			return this.walk(function(selector) {
				if (selector.type === types.UNIVERSAL) return callback.call(_this10, selector);
			});
		};
		_proto.split = function split(callback) {
			var _this11 = this;
			var current = [];
			return this.reduce(function(memo, node, index) {
				var split = callback.call(_this11, node);
				current.push(node);
				if (split) {
					memo.push(current);
					current = [];
				} else if (index === _this11.length - 1) memo.push(current);
				return memo;
			}, []);
		};
		_proto.map = function map(callback) {
			return this.nodes.map(callback);
		};
		_proto.reduce = function reduce(callback, memo) {
			return this.nodes.reduce(callback, memo);
		};
		_proto.every = function every(callback) {
			return this.nodes.every(callback);
		};
		_proto.some = function some(callback) {
			return this.nodes.some(callback);
		};
		_proto.filter = function filter(callback) {
			return this.nodes.filter(callback);
		};
		_proto.sort = function sort(callback) {
			return this.nodes.sort(callback);
		};
		_proto.toString = function toString() {
			return this.map(String).join("");
		};
		_createClass(Container, [
			{
				key: "first",
				get: function get() {
					return this.at(0);
				}
			},
			{
				key: "last",
				get: function get() {
					return this.at(this.length - 1);
				}
			},
			{
				key: "length",
				get: function get() {
					return this.nodes.length;
				}
			}
		]);
		return Container;
	}(_node["default"]);
	exports["default"] = Container;
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/selectors/root.js
var require_root = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _container = _interopRequireDefault(require_container());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	function _createClass(Constructor, protoProps, staticProps) {
		if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		if (staticProps) _defineProperties(Constructor, staticProps);
		Object.defineProperty(Constructor, "prototype", { writable: false });
		return Constructor;
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	var Root = /* @__PURE__ */ function(_Container) {
		_inheritsLoose(Root, _Container);
		function Root(opts) {
			var _this = _Container.call(this, opts) || this;
			_this.type = _types.ROOT;
			return _this;
		}
		var _proto = Root.prototype;
		_proto.toString = function toString() {
			var str = this.reduce(function(memo, selector) {
				memo.push(String(selector));
				return memo;
			}, []).join(",");
			return this.trailingComma ? str + "," : str;
		};
		_proto.error = function error(message, options) {
			if (this._error) return this._error(message, options);
			else return new Error(message);
		};
		_createClass(Root, [{
			key: "errorGenerator",
			set: function set(handler) {
				this._error = handler;
			}
		}]);
		return Root;
	}(_container["default"]);
	exports["default"] = Root;
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/selectors/selector.js
var require_selector = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _container = _interopRequireDefault(require_container());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	var Selector = /* @__PURE__ */ function(_Container) {
		_inheritsLoose(Selector, _Container);
		function Selector(opts) {
			var _this = _Container.call(this, opts) || this;
			_this.type = _types.SELECTOR;
			return _this;
		}
		return Selector;
	}(_container["default"]);
	exports["default"] = Selector;
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/cssesc@3.0.0/node_modules/cssesc/cssesc.js
/*! https://mths.be/cssesc v3.0.0 by @mathias */
var require_cssesc = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hasOwnProperty = {}.hasOwnProperty;
	var merge = function merge(options, defaults) {
		if (!options) return defaults;
		var result = {};
		for (var key in defaults) result[key] = hasOwnProperty.call(options, key) ? options[key] : defaults[key];
		return result;
	};
	var regexAnySingleEscape = /[ -,\.\/:-@\[-\^`\{-~]/;
	var regexSingleEscape = /[ -,\.\/:-@\[\]\^`\{-~]/;
	var regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;
	var cssesc = function cssesc(string, options) {
		options = merge(options, cssesc.options);
		if (options.quotes != "single" && options.quotes != "double") options.quotes = "single";
		var quote = options.quotes == "double" ? "\"" : "'";
		var isIdentifier = options.isIdentifier;
		var firstChar = string.charAt(0);
		var output = "";
		var counter = 0;
		var length = string.length;
		while (counter < length) {
			var character = string.charAt(counter++);
			var codePoint = character.charCodeAt();
			var value = void 0;
			if (codePoint < 32 || codePoint > 126) {
				if (codePoint >= 55296 && codePoint <= 56319 && counter < length) {
					var extra = string.charCodeAt(counter++);
					if ((extra & 64512) == 56320) codePoint = ((codePoint & 1023) << 10) + (extra & 1023) + 65536;
					else counter--;
				}
				value = "\\" + codePoint.toString(16).toUpperCase() + " ";
			} else if (options.escapeEverything) if (regexAnySingleEscape.test(character)) value = "\\" + character;
			else value = "\\" + codePoint.toString(16).toUpperCase() + " ";
			else if (/[\t\n\f\r\x0B]/.test(character)) value = "\\" + codePoint.toString(16).toUpperCase() + " ";
			else if (character == "\\" || !isIdentifier && (character == "\"" && quote == character || character == "'" && quote == character) || isIdentifier && regexSingleEscape.test(character)) value = "\\" + character;
			else value = character;
			output += value;
		}
		if (isIdentifier) {
			if (/^-[-\d]/.test(output)) output = "\\-" + output.slice(1);
			else if (/\d/.test(firstChar)) output = "\\3" + firstChar + " " + output.slice(1);
		}
		output = output.replace(regexExcessiveSpaces, function($0, $1, $2) {
			if ($1 && $1.length % 2) return $0;
			return ($1 || "") + $2;
		});
		if (!isIdentifier && options.wrap) return quote + output + quote;
		return output;
	};
	cssesc.options = {
		"escapeEverything": false,
		"isIdentifier": false,
		"quotes": "single",
		"wrap": false
	};
	cssesc.version = "3.0.0";
	module.exports = cssesc;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/selectors/className.js
var require_className = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _cssesc = _interopRequireDefault(require_cssesc());
	var _util = require_util$1();
	var _node = _interopRequireDefault(require_node$1());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	function _createClass(Constructor, protoProps, staticProps) {
		if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		if (staticProps) _defineProperties(Constructor, staticProps);
		Object.defineProperty(Constructor, "prototype", { writable: false });
		return Constructor;
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	var ClassName = /* @__PURE__ */ function(_Node) {
		_inheritsLoose(ClassName, _Node);
		function ClassName(opts) {
			var _this = _Node.call(this, opts) || this;
			_this.type = _types.CLASS;
			_this._constructed = true;
			return _this;
		}
		var _proto = ClassName.prototype;
		_proto.valueToString = function valueToString() {
			return "." + _Node.prototype.valueToString.call(this);
		};
		_createClass(ClassName, [{
			key: "value",
			get: function get() {
				return this._value;
			},
			set: function set(v) {
				if (this._constructed) {
					var escaped = (0, _cssesc["default"])(v, { isIdentifier: true });
					if (escaped !== v) {
						(0, _util.ensureObject)(this, "raws");
						this.raws.value = escaped;
					} else if (this.raws) delete this.raws.value;
				}
				this._value = v;
			}
		}]);
		return ClassName;
	}(_node["default"]);
	exports["default"] = ClassName;
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/selectors/comment.js
var require_comment = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _node = _interopRequireDefault(require_node$1());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	var Comment = /* @__PURE__ */ function(_Node) {
		_inheritsLoose(Comment, _Node);
		function Comment(opts) {
			var _this = _Node.call(this, opts) || this;
			_this.type = _types.COMMENT;
			return _this;
		}
		return Comment;
	}(_node["default"]);
	exports["default"] = Comment;
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/selectors/id.js
var require_id = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _node = _interopRequireDefault(require_node$1());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	var ID = /* @__PURE__ */ function(_Node) {
		_inheritsLoose(ID, _Node);
		function ID(opts) {
			var _this = _Node.call(this, opts) || this;
			_this.type = _types.ID;
			return _this;
		}
		var _proto = ID.prototype;
		_proto.valueToString = function valueToString() {
			return "#" + _Node.prototype.valueToString.call(this);
		};
		return ID;
	}(_node["default"]);
	exports["default"] = ID;
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/selectors/namespace.js
var require_namespace = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _cssesc = _interopRequireDefault(require_cssesc());
	var _util = require_util$1();
	var _node = _interopRequireDefault(require_node$1());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	function _createClass(Constructor, protoProps, staticProps) {
		if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		if (staticProps) _defineProperties(Constructor, staticProps);
		Object.defineProperty(Constructor, "prototype", { writable: false });
		return Constructor;
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	var Namespace = /* @__PURE__ */ function(_Node) {
		_inheritsLoose(Namespace, _Node);
		function Namespace() {
			return _Node.apply(this, arguments) || this;
		}
		var _proto = Namespace.prototype;
		_proto.qualifiedName = function qualifiedName(value) {
			if (this.namespace) return this.namespaceString + "|" + value;
			else return value;
		};
		_proto.valueToString = function valueToString() {
			return this.qualifiedName(_Node.prototype.valueToString.call(this));
		};
		_createClass(Namespace, [
			{
				key: "namespace",
				get: function get() {
					return this._namespace;
				},
				set: function set(namespace) {
					if (namespace === true || namespace === "*" || namespace === "&") {
						this._namespace = namespace;
						if (this.raws) delete this.raws.namespace;
						return;
					}
					var escaped = (0, _cssesc["default"])(namespace, { isIdentifier: true });
					this._namespace = namespace;
					if (escaped !== namespace) {
						(0, _util.ensureObject)(this, "raws");
						this.raws.namespace = escaped;
					} else if (this.raws) delete this.raws.namespace;
				}
			},
			{
				key: "ns",
				get: function get() {
					return this._namespace;
				},
				set: function set(namespace) {
					this.namespace = namespace;
				}
			},
			{
				key: "namespaceString",
				get: function get() {
					if (this.namespace) {
						var ns = this.stringifyProperty("namespace");
						if (ns === true) return "";
						else return ns;
					} else return "";
				}
			}
		]);
		return Namespace;
	}(_node["default"]);
	exports["default"] = Namespace;
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/selectors/tag.js
var require_tag = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _namespace = _interopRequireDefault(require_namespace());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	var Tag = /* @__PURE__ */ function(_Namespace) {
		_inheritsLoose(Tag, _Namespace);
		function Tag(opts) {
			var _this = _Namespace.call(this, opts) || this;
			_this.type = _types.TAG;
			return _this;
		}
		return Tag;
	}(_namespace["default"]);
	exports["default"] = Tag;
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/selectors/string.js
var require_string = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _node = _interopRequireDefault(require_node$1());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	var String = /* @__PURE__ */ function(_Node) {
		_inheritsLoose(String, _Node);
		function String(opts) {
			var _this = _Node.call(this, opts) || this;
			_this.type = _types.STRING;
			return _this;
		}
		return String;
	}(_node["default"]);
	exports["default"] = String;
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/selectors/pseudo.js
var require_pseudo = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _container = _interopRequireDefault(require_container());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	var Pseudo = /* @__PURE__ */ function(_Container) {
		_inheritsLoose(Pseudo, _Container);
		function Pseudo(opts) {
			var _this = _Container.call(this, opts) || this;
			_this.type = _types.PSEUDO;
			return _this;
		}
		var _proto = Pseudo.prototype;
		_proto.toString = function toString() {
			var params = this.length ? "(" + this.map(String).join(",") + ")" : "";
			return [
				this.rawSpaceBefore,
				this.stringifyProperty("value"),
				params,
				this.rawSpaceAfter
			].join("");
		};
		return Pseudo;
	}(_container["default"]);
	exports["default"] = Pseudo;
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/util-deprecate@1.0.2/node_modules/util-deprecate/node.js
var require_node = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* For Node.js, simply re-export the core `util.deprecate` function.
	*/
	module.exports = require("util").deprecate;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/selectors/attribute.js
var require_attribute = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	exports.unescapeValue = unescapeValue;
	var _cssesc = _interopRequireDefault(require_cssesc());
	var _unesc = _interopRequireDefault(require_unesc());
	var _namespace = _interopRequireDefault(require_namespace());
	var _types = require_types();
	var _CSSESC_QUOTE_OPTIONS;
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	function _createClass(Constructor, protoProps, staticProps) {
		if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		if (staticProps) _defineProperties(Constructor, staticProps);
		Object.defineProperty(Constructor, "prototype", { writable: false });
		return Constructor;
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	var deprecate = require_node();
	var WRAPPED_IN_QUOTES = /^('|")([^]*)\1$/;
	var warnOfDeprecatedValueAssignment = deprecate(function() {}, "Assigning an attribute a value containing characters that might need to be escaped is deprecated. Call attribute.setValue() instead.");
	var warnOfDeprecatedQuotedAssignment = deprecate(function() {}, "Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead.");
	var warnOfDeprecatedConstructor = deprecate(function() {}, "Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.");
	function unescapeValue(value) {
		var deprecatedUsage = false;
		var quoteMark = null;
		var unescaped = value;
		var m = unescaped.match(WRAPPED_IN_QUOTES);
		if (m) {
			quoteMark = m[1];
			unescaped = m[2];
		}
		unescaped = (0, _unesc["default"])(unescaped);
		if (unescaped !== value) deprecatedUsage = true;
		return {
			deprecatedUsage,
			unescaped,
			quoteMark
		};
	}
	function handleDeprecatedContructorOpts(opts) {
		if (opts.quoteMark !== void 0) return opts;
		if (opts.value === void 0) return opts;
		warnOfDeprecatedConstructor();
		var _unescapeValue = unescapeValue(opts.value), quoteMark = _unescapeValue.quoteMark, unescaped = _unescapeValue.unescaped;
		if (!opts.raws) opts.raws = {};
		if (opts.raws.value === void 0) opts.raws.value = opts.value;
		opts.value = unescaped;
		opts.quoteMark = quoteMark;
		return opts;
	}
	var Attribute = /* @__PURE__ */ function(_Namespace) {
		_inheritsLoose(Attribute, _Namespace);
		function Attribute(opts) {
			var _this;
			if (opts === void 0) opts = {};
			_this = _Namespace.call(this, handleDeprecatedContructorOpts(opts)) || this;
			_this.type = _types.ATTRIBUTE;
			_this.raws = _this.raws || {};
			Object.defineProperty(_this.raws, "unquoted", {
				get: deprecate(function() {
					return _this.value;
				}, "attr.raws.unquoted is deprecated. Call attr.value instead."),
				set: deprecate(function() {
					return _this.value;
				}, "Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now.")
			});
			_this._constructed = true;
			return _this;
		}
		/**
		* Returns the Attribute's value quoted such that it would be legal to use
		* in the value of a css file. The original value's quotation setting
		* used for stringification is left unchanged. See `setValue(value, options)`
		* if you want to control the quote settings of a new value for the attribute.
		*
		* You can also change the quotation used for the current value by setting quoteMark.
		*
		* Options:
		*   * quoteMark {'"' | "'" | null} - Use this value to quote the value. If this
		*     option is not set, the original value for quoteMark will be used. If
		*     indeterminate, a double quote is used. The legal values are:
		*     * `null` - the value will be unquoted and characters will be escaped as necessary.
		*     * `'` - the value will be quoted with a single quote and single quotes are escaped.
		*     * `"` - the value will be quoted with a double quote and double quotes are escaped.
		*   * preferCurrentQuoteMark {boolean} - if true, prefer the source quote mark
		*     over the quoteMark option value.
		*   * smart {boolean} - if true, will select a quote mark based on the value
		*     and the other options specified here. See the `smartQuoteMark()`
		*     method.
		**/
		var _proto = Attribute.prototype;
		_proto.getQuotedValue = function getQuotedValue(options) {
			if (options === void 0) options = {};
			var cssescopts = CSSESC_QUOTE_OPTIONS[this._determineQuoteMark(options)];
			return (0, _cssesc["default"])(this._value, cssescopts);
		};
		_proto._determineQuoteMark = function _determineQuoteMark(options) {
			return options.smart ? this.smartQuoteMark(options) : this.preferredQuoteMark(options);
		};
		_proto.setValue = function setValue(value, options) {
			if (options === void 0) options = {};
			this._value = value;
			this._quoteMark = this._determineQuoteMark(options);
			this._syncRawValue();
		};
		_proto.smartQuoteMark = function smartQuoteMark(options) {
			var v = this.value;
			var numSingleQuotes = v.replace(/[^']/g, "").length;
			var numDoubleQuotes = v.replace(/[^"]/g, "").length;
			if (numSingleQuotes + numDoubleQuotes === 0) {
				var escaped = (0, _cssesc["default"])(v, { isIdentifier: true });
				if (escaped === v) return Attribute.NO_QUOTE;
				else {
					var pref = this.preferredQuoteMark(options);
					if (pref === Attribute.NO_QUOTE) {
						var quote = this.quoteMark || options.quoteMark || Attribute.DOUBLE_QUOTE;
						var opts = CSSESC_QUOTE_OPTIONS[quote];
						if ((0, _cssesc["default"])(v, opts).length < escaped.length) return quote;
					}
					return pref;
				}
			} else if (numDoubleQuotes === numSingleQuotes) return this.preferredQuoteMark(options);
			else if (numDoubleQuotes < numSingleQuotes) return Attribute.DOUBLE_QUOTE;
			else return Attribute.SINGLE_QUOTE;
		};
		_proto.preferredQuoteMark = function preferredQuoteMark(options) {
			var quoteMark = options.preferCurrentQuoteMark ? this.quoteMark : options.quoteMark;
			if (quoteMark === void 0) quoteMark = options.preferCurrentQuoteMark ? options.quoteMark : this.quoteMark;
			if (quoteMark === void 0) quoteMark = Attribute.DOUBLE_QUOTE;
			return quoteMark;
		};
		_proto._syncRawValue = function _syncRawValue() {
			var rawValue = (0, _cssesc["default"])(this._value, CSSESC_QUOTE_OPTIONS[this.quoteMark]);
			if (rawValue === this._value) {
				if (this.raws) delete this.raws.value;
			} else this.raws.value = rawValue;
		};
		_proto._handleEscapes = function _handleEscapes(prop, value) {
			if (this._constructed) {
				var escaped = (0, _cssesc["default"])(value, { isIdentifier: true });
				if (escaped !== value) this.raws[prop] = escaped;
				else delete this.raws[prop];
			}
		};
		_proto._spacesFor = function _spacesFor(name) {
			var attrSpaces = {
				before: "",
				after: ""
			};
			var spaces = this.spaces[name] || {};
			var rawSpaces = this.raws.spaces && this.raws.spaces[name] || {};
			return Object.assign(attrSpaces, spaces, rawSpaces);
		};
		_proto._stringFor = function _stringFor(name, spaceName, concat) {
			if (spaceName === void 0) spaceName = name;
			if (concat === void 0) concat = defaultAttrConcat;
			var attrSpaces = this._spacesFor(spaceName);
			return concat(this.stringifyProperty(name), attrSpaces);
		};
		_proto.offsetOf = function offsetOf(name) {
			var count = 1;
			var attributeSpaces = this._spacesFor("attribute");
			count += attributeSpaces.before.length;
			if (name === "namespace" || name === "ns") return this.namespace ? count : -1;
			if (name === "attributeNS") return count;
			count += this.namespaceString.length;
			if (this.namespace) count += 1;
			if (name === "attribute") return count;
			count += this.stringifyProperty("attribute").length;
			count += attributeSpaces.after.length;
			var operatorSpaces = this._spacesFor("operator");
			count += operatorSpaces.before.length;
			var operator = this.stringifyProperty("operator");
			if (name === "operator") return operator ? count : -1;
			count += operator.length;
			count += operatorSpaces.after.length;
			var valueSpaces = this._spacesFor("value");
			count += valueSpaces.before.length;
			var value = this.stringifyProperty("value");
			if (name === "value") return value ? count : -1;
			count += value.length;
			count += valueSpaces.after.length;
			var insensitiveSpaces = this._spacesFor("insensitive");
			count += insensitiveSpaces.before.length;
			if (name === "insensitive") return this.insensitive ? count : -1;
			return -1;
		};
		_proto.toString = function toString() {
			var _this2 = this;
			var selector = [this.rawSpaceBefore, "["];
			selector.push(this._stringFor("qualifiedAttribute", "attribute"));
			if (this.operator && (this.value || this.value === "")) {
				selector.push(this._stringFor("operator"));
				selector.push(this._stringFor("value"));
				selector.push(this._stringFor("insensitiveFlag", "insensitive", function(attrValue, attrSpaces) {
					if (attrValue.length > 0 && !_this2.quoted && attrSpaces.before.length === 0 && !(_this2.spaces.value && _this2.spaces.value.after)) attrSpaces.before = " ";
					return defaultAttrConcat(attrValue, attrSpaces);
				}));
			}
			selector.push("]");
			selector.push(this.rawSpaceAfter);
			return selector.join("");
		};
		_createClass(Attribute, [
			{
				key: "quoted",
				get: function get() {
					var qm = this.quoteMark;
					return qm === "'" || qm === "\"";
				},
				set: function set(value) {
					warnOfDeprecatedQuotedAssignment();
				}
			},
			{
				key: "quoteMark",
				get: function get() {
					return this._quoteMark;
				},
				set: function set(quoteMark) {
					if (!this._constructed) {
						this._quoteMark = quoteMark;
						return;
					}
					if (this._quoteMark !== quoteMark) {
						this._quoteMark = quoteMark;
						this._syncRawValue();
					}
				}
			},
			{
				key: "qualifiedAttribute",
				get: function get() {
					return this.qualifiedName(this.raws.attribute || this.attribute);
				}
			},
			{
				key: "insensitiveFlag",
				get: function get() {
					return this.insensitive ? "i" : "";
				}
			},
			{
				key: "value",
				get: function get() {
					return this._value;
				},
				set: function set(v) {
					if (this._constructed) {
						var _unescapeValue2 = unescapeValue(v), deprecatedUsage = _unescapeValue2.deprecatedUsage, unescaped = _unescapeValue2.unescaped, quoteMark = _unescapeValue2.quoteMark;
						if (deprecatedUsage) warnOfDeprecatedValueAssignment();
						if (unescaped === this._value && quoteMark === this._quoteMark) return;
						this._value = unescaped;
						this._quoteMark = quoteMark;
						this._syncRawValue();
					} else this._value = v;
				}
			},
			{
				key: "insensitive",
				get: function get() {
					return this._insensitive;
				},
				set: function set(insensitive) {
					if (!insensitive) {
						this._insensitive = false;
						if (this.raws && (this.raws.insensitiveFlag === "I" || this.raws.insensitiveFlag === "i")) this.raws.insensitiveFlag = void 0;
					}
					this._insensitive = insensitive;
				}
			},
			{
				key: "attribute",
				get: function get() {
					return this._attribute;
				},
				set: function set(name) {
					this._handleEscapes("attribute", name);
					this._attribute = name;
				}
			}
		]);
		return Attribute;
	}(_namespace["default"]);
	exports["default"] = Attribute;
	Attribute.NO_QUOTE = null;
	Attribute.SINGLE_QUOTE = "'";
	Attribute.DOUBLE_QUOTE = "\"";
	var CSSESC_QUOTE_OPTIONS = (_CSSESC_QUOTE_OPTIONS = {
		"'": {
			quotes: "single",
			wrap: true
		},
		"\"": {
			quotes: "double",
			wrap: true
		}
	}, _CSSESC_QUOTE_OPTIONS[null] = { isIdentifier: true }, _CSSESC_QUOTE_OPTIONS);
	function defaultAttrConcat(attrValue, attrSpaces) {
		return "" + attrSpaces.before + attrValue + attrSpaces.after;
	}
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/selectors/universal.js
var require_universal = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _namespace = _interopRequireDefault(require_namespace());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	var Universal = /* @__PURE__ */ function(_Namespace) {
		_inheritsLoose(Universal, _Namespace);
		function Universal(opts) {
			var _this = _Namespace.call(this, opts) || this;
			_this.type = _types.UNIVERSAL;
			_this.value = "*";
			return _this;
		}
		return Universal;
	}(_namespace["default"]);
	exports["default"] = Universal;
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/selectors/combinator.js
var require_combinator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _node = _interopRequireDefault(require_node$1());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	var Combinator = /* @__PURE__ */ function(_Node) {
		_inheritsLoose(Combinator, _Node);
		function Combinator(opts) {
			var _this = _Node.call(this, opts) || this;
			_this.type = _types.COMBINATOR;
			return _this;
		}
		return Combinator;
	}(_node["default"]);
	exports["default"] = Combinator;
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/selectors/nesting.js
var require_nesting = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _node = _interopRequireDefault(require_node$1());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	var Nesting = /* @__PURE__ */ function(_Node) {
		_inheritsLoose(Nesting, _Node);
		function Nesting(opts) {
			var _this = _Node.call(this, opts) || this;
			_this.type = _types.NESTING;
			_this.value = "&";
			return _this;
		}
		return Nesting;
	}(_node["default"]);
	exports["default"] = Nesting;
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/sortAscending.js
var require_sortAscending = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = sortAscending;
	function sortAscending(list) {
		return list.sort(function(a, b) {
			return a - b;
		});
	}
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/tokenTypes.js
var require_tokenTypes = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	exports.word = exports.tilde = exports.tab = exports.str = exports.space = exports.slash = exports.singleQuote = exports.semicolon = exports.plus = exports.pipe = exports.openSquare = exports.openParenthesis = exports.newline = exports.greaterThan = exports.feed = exports.equals = exports.doubleQuote = exports.dollar = exports.cr = exports.comment = exports.comma = exports.combinator = exports.colon = exports.closeSquare = exports.closeParenthesis = exports.caret = exports.bang = exports.backslash = exports.at = exports.asterisk = exports.ampersand = void 0;
	var ampersand = 38;
	exports.ampersand = ampersand;
	var asterisk = 42;
	exports.asterisk = asterisk;
	var at = 64;
	exports.at = at;
	var comma = 44;
	exports.comma = comma;
	var colon = 58;
	exports.colon = colon;
	var semicolon = 59;
	exports.semicolon = semicolon;
	var openParenthesis = 40;
	exports.openParenthesis = openParenthesis;
	var closeParenthesis = 41;
	exports.closeParenthesis = closeParenthesis;
	var openSquare = 91;
	exports.openSquare = openSquare;
	var closeSquare = 93;
	exports.closeSquare = closeSquare;
	var dollar = 36;
	exports.dollar = dollar;
	var tilde = 126;
	exports.tilde = tilde;
	var caret = 94;
	exports.caret = caret;
	var plus = 43;
	exports.plus = plus;
	var equals = 61;
	exports.equals = equals;
	var pipe = 124;
	exports.pipe = pipe;
	var greaterThan = 62;
	exports.greaterThan = greaterThan;
	var space = 32;
	exports.space = space;
	var singleQuote = 39;
	exports.singleQuote = singleQuote;
	var doubleQuote = 34;
	exports.doubleQuote = doubleQuote;
	var slash = 47;
	exports.slash = slash;
	var bang = 33;
	exports.bang = bang;
	var backslash = 92;
	exports.backslash = backslash;
	var cr = 13;
	exports.cr = cr;
	var feed = 12;
	exports.feed = feed;
	var newline = 10;
	exports.newline = newline;
	var tab = 9;
	exports.tab = tab;
	var str = singleQuote;
	exports.str = str;
	var comment = -1;
	exports.comment = comment;
	var word = -2;
	exports.word = word;
	var combinator = -3;
	exports.combinator = combinator;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/tokenize.js
var require_tokenize = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	exports.FIELDS = void 0;
	exports["default"] = tokenize;
	var t = _interopRequireWildcard(require_tokenTypes());
	var _unescapable, _wordDelimiters;
	function _getRequireWildcardCache(nodeInterop) {
		if (typeof WeakMap !== "function") return null;
		var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
		var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
		return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
			return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
		})(nodeInterop);
	}
	function _interopRequireWildcard(obj, nodeInterop) {
		if (!nodeInterop && obj && obj.__esModule) return obj;
		if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { "default": obj };
		var cache = _getRequireWildcardCache(nodeInterop);
		if (cache && cache.has(obj)) return cache.get(obj);
		var newObj = {};
		var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
			if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
			else newObj[key] = obj[key];
		}
		newObj["default"] = obj;
		if (cache) cache.set(obj, newObj);
		return newObj;
	}
	var unescapable = (_unescapable = {}, _unescapable[t.tab] = true, _unescapable[t.newline] = true, _unescapable[t.cr] = true, _unescapable[t.feed] = true, _unescapable);
	var wordDelimiters = (_wordDelimiters = {}, _wordDelimiters[t.space] = true, _wordDelimiters[t.tab] = true, _wordDelimiters[t.newline] = true, _wordDelimiters[t.cr] = true, _wordDelimiters[t.feed] = true, _wordDelimiters[t.ampersand] = true, _wordDelimiters[t.asterisk] = true, _wordDelimiters[t.bang] = true, _wordDelimiters[t.comma] = true, _wordDelimiters[t.colon] = true, _wordDelimiters[t.semicolon] = true, _wordDelimiters[t.openParenthesis] = true, _wordDelimiters[t.closeParenthesis] = true, _wordDelimiters[t.openSquare] = true, _wordDelimiters[t.closeSquare] = true, _wordDelimiters[t.singleQuote] = true, _wordDelimiters[t.doubleQuote] = true, _wordDelimiters[t.plus] = true, _wordDelimiters[t.pipe] = true, _wordDelimiters[t.tilde] = true, _wordDelimiters[t.greaterThan] = true, _wordDelimiters[t.equals] = true, _wordDelimiters[t.dollar] = true, _wordDelimiters[t.caret] = true, _wordDelimiters[t.slash] = true, _wordDelimiters);
	var hex = {};
	var hexChars = "0123456789abcdefABCDEF";
	for (var i = 0; i < hexChars.length; i++) hex[hexChars.charCodeAt(i)] = true;
	/**
	*  Returns the last index of the bar css word
	* @param {string} css The string in which the word begins
	* @param {number} start The index into the string where word's first letter occurs
	*/
	function consumeWord(css, start) {
		var next = start;
		var code;
		do {
			code = css.charCodeAt(next);
			if (wordDelimiters[code]) return next - 1;
			else if (code === t.backslash) next = consumeEscape(css, next) + 1;
			else next++;
		} while (next < css.length);
		return next - 1;
	}
	/**
	*  Returns the last index of the escape sequence
	* @param {string} css The string in which the sequence begins
	* @param {number} start The index into the string where escape character (`\`) occurs.
	*/
	function consumeEscape(css, start) {
		var next = start;
		var code = css.charCodeAt(next + 1);
		if (unescapable[code]) {} else if (hex[code]) {
			var hexDigits = 0;
			do {
				next++;
				hexDigits++;
				code = css.charCodeAt(next + 1);
			} while (hex[code] && hexDigits < 6);
			if (hexDigits < 6 && code === t.space) next++;
		} else next++;
		return next;
	}
	var FIELDS = {
		TYPE: 0,
		START_LINE: 1,
		START_COL: 2,
		END_LINE: 3,
		END_COL: 4,
		START_POS: 5,
		END_POS: 6
	};
	exports.FIELDS = FIELDS;
	function tokenize(input) {
		var tokens = [];
		var css = input.css.valueOf();
		var length = css.length;
		var offset = -1;
		var line = 1;
		var start = 0;
		var end = 0;
		var code, content, endColumn, endLine, escaped, escapePos, last, lines, next, nextLine, nextOffset, quote, tokenType;
		function unclosed(what, fix) {
			if (input.safe) {
				css += fix;
				next = css.length - 1;
			} else throw input.error("Unclosed " + what, line, start - offset, start);
		}
		while (start < length) {
			code = css.charCodeAt(start);
			if (code === t.newline) {
				offset = start;
				line += 1;
			}
			switch (code) {
				case t.space:
				case t.tab:
				case t.newline:
				case t.cr:
				case t.feed:
					next = start;
					do {
						next += 1;
						code = css.charCodeAt(next);
						if (code === t.newline) {
							offset = next;
							line += 1;
						}
					} while (code === t.space || code === t.newline || code === t.tab || code === t.cr || code === t.feed);
					tokenType = t.space;
					endLine = line;
					endColumn = next - offset - 1;
					end = next;
					break;
				case t.plus:
				case t.greaterThan:
				case t.tilde:
				case t.pipe:
					next = start;
					do {
						next += 1;
						code = css.charCodeAt(next);
					} while (code === t.plus || code === t.greaterThan || code === t.tilde || code === t.pipe);
					tokenType = t.combinator;
					endLine = line;
					endColumn = start - offset;
					end = next;
					break;
				case t.asterisk:
				case t.ampersand:
				case t.bang:
				case t.comma:
				case t.equals:
				case t.dollar:
				case t.caret:
				case t.openSquare:
				case t.closeSquare:
				case t.colon:
				case t.semicolon:
				case t.openParenthesis:
				case t.closeParenthesis:
					next = start;
					tokenType = code;
					endLine = line;
					endColumn = start - offset;
					end = next + 1;
					break;
				case t.singleQuote:
				case t.doubleQuote:
					quote = code === t.singleQuote ? "'" : "\"";
					next = start;
					do {
						escaped = false;
						next = css.indexOf(quote, next + 1);
						if (next === -1) unclosed("quote", quote);
						escapePos = next;
						while (css.charCodeAt(escapePos - 1) === t.backslash) {
							escapePos -= 1;
							escaped = !escaped;
						}
					} while (escaped);
					tokenType = t.str;
					endLine = line;
					endColumn = start - offset;
					end = next + 1;
					break;
				default:
					if (code === t.slash && css.charCodeAt(start + 1) === t.asterisk) {
						next = css.indexOf("*/", start + 2) + 1;
						if (next === 0) unclosed("comment", "*/");
						content = css.slice(start, next + 1);
						lines = content.split("\n");
						last = lines.length - 1;
						if (last > 0) {
							nextLine = line + last;
							nextOffset = next - lines[last].length;
						} else {
							nextLine = line;
							nextOffset = offset;
						}
						tokenType = t.comment;
						line = nextLine;
						endLine = nextLine;
						endColumn = next - nextOffset;
					} else if (code === t.slash) {
						next = start;
						tokenType = code;
						endLine = line;
						endColumn = start - offset;
						end = next + 1;
					} else {
						next = consumeWord(css, start);
						tokenType = t.word;
						endLine = line;
						endColumn = next - offset;
					}
					end = next + 1;
					break;
			}
			tokens.push([
				tokenType,
				line,
				start - offset,
				endLine,
				endColumn,
				start,
				end
			]);
			if (nextOffset) {
				offset = nextOffset;
				nextOffset = null;
			}
			start = end;
		}
		return tokens;
	}
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/parser.js
var require_parser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _root = _interopRequireDefault(require_root());
	var _selector = _interopRequireDefault(require_selector());
	var _className = _interopRequireDefault(require_className());
	var _comment = _interopRequireDefault(require_comment());
	var _id = _interopRequireDefault(require_id());
	var _tag = _interopRequireDefault(require_tag());
	var _string = _interopRequireDefault(require_string());
	var _pseudo = _interopRequireDefault(require_pseudo());
	var _attribute = _interopRequireWildcard(require_attribute());
	var _universal = _interopRequireDefault(require_universal());
	var _combinator = _interopRequireDefault(require_combinator());
	var _nesting = _interopRequireDefault(require_nesting());
	var _sortAscending = _interopRequireDefault(require_sortAscending());
	var _tokenize = _interopRequireWildcard(require_tokenize());
	var tokens = _interopRequireWildcard(require_tokenTypes());
	var types = _interopRequireWildcard(require_types());
	var _util = require_util$1();
	var _WHITESPACE_TOKENS, _Object$assign;
	function _getRequireWildcardCache(nodeInterop) {
		if (typeof WeakMap !== "function") return null;
		var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
		var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
		return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
			return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
		})(nodeInterop);
	}
	function _interopRequireWildcard(obj, nodeInterop) {
		if (!nodeInterop && obj && obj.__esModule) return obj;
		if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { "default": obj };
		var cache = _getRequireWildcardCache(nodeInterop);
		if (cache && cache.has(obj)) return cache.get(obj);
		var newObj = {};
		var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
			if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
			else newObj[key] = obj[key];
		}
		newObj["default"] = obj;
		if (cache) cache.set(obj, newObj);
		return newObj;
	}
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	function _createClass(Constructor, protoProps, staticProps) {
		if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		if (staticProps) _defineProperties(Constructor, staticProps);
		Object.defineProperty(Constructor, "prototype", { writable: false });
		return Constructor;
	}
	var WHITESPACE_TOKENS = (_WHITESPACE_TOKENS = {}, _WHITESPACE_TOKENS[tokens.space] = true, _WHITESPACE_TOKENS[tokens.cr] = true, _WHITESPACE_TOKENS[tokens.feed] = true, _WHITESPACE_TOKENS[tokens.newline] = true, _WHITESPACE_TOKENS[tokens.tab] = true, _WHITESPACE_TOKENS);
	var WHITESPACE_EQUIV_TOKENS = Object.assign({}, WHITESPACE_TOKENS, (_Object$assign = {}, _Object$assign[tokens.comment] = true, _Object$assign));
	function tokenStart(token) {
		return {
			line: token[_tokenize.FIELDS.START_LINE],
			column: token[_tokenize.FIELDS.START_COL]
		};
	}
	function tokenEnd(token) {
		return {
			line: token[_tokenize.FIELDS.END_LINE],
			column: token[_tokenize.FIELDS.END_COL]
		};
	}
	function getSource(startLine, startColumn, endLine, endColumn) {
		return {
			start: {
				line: startLine,
				column: startColumn
			},
			end: {
				line: endLine,
				column: endColumn
			}
		};
	}
	function getTokenSource(token) {
		return getSource(token[_tokenize.FIELDS.START_LINE], token[_tokenize.FIELDS.START_COL], token[_tokenize.FIELDS.END_LINE], token[_tokenize.FIELDS.END_COL]);
	}
	function getTokenSourceSpan(startToken, endToken) {
		if (!startToken) return;
		return getSource(startToken[_tokenize.FIELDS.START_LINE], startToken[_tokenize.FIELDS.START_COL], endToken[_tokenize.FIELDS.END_LINE], endToken[_tokenize.FIELDS.END_COL]);
	}
	function unescapeProp(node, prop) {
		var value = node[prop];
		if (typeof value !== "string") return;
		if (value.indexOf("\\") !== -1) {
			(0, _util.ensureObject)(node, "raws");
			node[prop] = (0, _util.unesc)(value);
			if (node.raws[prop] === void 0) node.raws[prop] = value;
		}
		return node;
	}
	function indexesOf(array, item) {
		var i = -1;
		var indexes = [];
		while ((i = array.indexOf(item, i + 1)) !== -1) indexes.push(i);
		return indexes;
	}
	function uniqs() {
		var list = Array.prototype.concat.apply([], arguments);
		return list.filter(function(item, i) {
			return i === list.indexOf(item);
		});
	}
	var Parser = /* @__PURE__ */ function() {
		function Parser(rule, options) {
			if (options === void 0) options = {};
			this.rule = rule;
			this.options = Object.assign({
				lossy: false,
				safe: false
			}, options);
			this.position = 0;
			this.css = typeof this.rule === "string" ? this.rule : this.rule.selector;
			this.tokens = (0, _tokenize["default"])({
				css: this.css,
				error: this._errorGenerator(),
				safe: this.options.safe
			});
			var rootSource = getTokenSourceSpan(this.tokens[0], this.tokens[this.tokens.length - 1]);
			this.root = new _root["default"]({ source: rootSource });
			this.root.errorGenerator = this._errorGenerator();
			var selector = new _selector["default"]({
				source: { start: {
					line: 1,
					column: 1
				} },
				sourceIndex: 0
			});
			this.root.append(selector);
			this.current = selector;
			this.loop();
		}
		var _proto = Parser.prototype;
		_proto._errorGenerator = function _errorGenerator() {
			var _this = this;
			return function(message, errorOptions) {
				if (typeof _this.rule === "string") return new Error(message);
				return _this.rule.error(message, errorOptions);
			};
		};
		_proto.attribute = function attribute() {
			var attr = [];
			var startingToken = this.currToken;
			this.position++;
			while (this.position < this.tokens.length && this.currToken[_tokenize.FIELDS.TYPE] !== tokens.closeSquare) {
				attr.push(this.currToken);
				this.position++;
			}
			if (this.currToken[_tokenize.FIELDS.TYPE] !== tokens.closeSquare) return this.expected("closing square bracket", this.currToken[_tokenize.FIELDS.START_POS]);
			var len = attr.length;
			var node = {
				source: getSource(startingToken[1], startingToken[2], this.currToken[3], this.currToken[4]),
				sourceIndex: startingToken[_tokenize.FIELDS.START_POS]
			};
			if (len === 1 && !~[tokens.word].indexOf(attr[0][_tokenize.FIELDS.TYPE])) return this.expected("attribute", attr[0][_tokenize.FIELDS.START_POS]);
			var pos = 0;
			var spaceBefore = "";
			var commentBefore = "";
			var lastAdded = null;
			var spaceAfterMeaningfulToken = false;
			while (pos < len) {
				var token = attr[pos];
				var content = this.content(token);
				var next = attr[pos + 1];
				switch (token[_tokenize.FIELDS.TYPE]) {
					case tokens.space:
						spaceAfterMeaningfulToken = true;
						if (this.options.lossy) break;
						if (lastAdded) {
							(0, _util.ensureObject)(node, "spaces", lastAdded);
							var prevContent = node.spaces[lastAdded].after || "";
							node.spaces[lastAdded].after = prevContent + content;
							var existingComment = (0, _util.getProp)(node, "raws", "spaces", lastAdded, "after") || null;
							if (existingComment) node.raws.spaces[lastAdded].after = existingComment + content;
						} else {
							spaceBefore = spaceBefore + content;
							commentBefore = commentBefore + content;
						}
						break;
					case tokens.asterisk:
						if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
							node.operator = content;
							lastAdded = "operator";
						} else if ((!node.namespace || lastAdded === "namespace" && !spaceAfterMeaningfulToken) && next) {
							if (spaceBefore) {
								(0, _util.ensureObject)(node, "spaces", "attribute");
								node.spaces.attribute.before = spaceBefore;
								spaceBefore = "";
							}
							if (commentBefore) {
								(0, _util.ensureObject)(node, "raws", "spaces", "attribute");
								node.raws.spaces.attribute.before = spaceBefore;
								commentBefore = "";
							}
							node.namespace = (node.namespace || "") + content;
							if ((0, _util.getProp)(node, "raws", "namespace") || null) node.raws.namespace += content;
							lastAdded = "namespace";
						}
						spaceAfterMeaningfulToken = false;
						break;
					case tokens.dollar: if (lastAdded === "value") {
						var oldRawValue = (0, _util.getProp)(node, "raws", "value");
						node.value += "$";
						if (oldRawValue) node.raws.value = oldRawValue + "$";
						break;
					}
					case tokens.caret:
						if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
							node.operator = content;
							lastAdded = "operator";
						}
						spaceAfterMeaningfulToken = false;
						break;
					case tokens.combinator:
						if (content === "~" && next[_tokenize.FIELDS.TYPE] === tokens.equals) {
							node.operator = content;
							lastAdded = "operator";
						}
						if (content !== "|") {
							spaceAfterMeaningfulToken = false;
							break;
						}
						if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
							node.operator = content;
							lastAdded = "operator";
						} else if (!node.namespace && !node.attribute) node.namespace = true;
						spaceAfterMeaningfulToken = false;
						break;
					case tokens.word:
						if (next && this.content(next) === "|" && attr[pos + 2] && attr[pos + 2][_tokenize.FIELDS.TYPE] !== tokens.equals && !node.operator && !node.namespace) {
							node.namespace = content;
							lastAdded = "namespace";
						} else if (!node.attribute || lastAdded === "attribute" && !spaceAfterMeaningfulToken) {
							if (spaceBefore) {
								(0, _util.ensureObject)(node, "spaces", "attribute");
								node.spaces.attribute.before = spaceBefore;
								spaceBefore = "";
							}
							if (commentBefore) {
								(0, _util.ensureObject)(node, "raws", "spaces", "attribute");
								node.raws.spaces.attribute.before = commentBefore;
								commentBefore = "";
							}
							node.attribute = (node.attribute || "") + content;
							if ((0, _util.getProp)(node, "raws", "attribute") || null) node.raws.attribute += content;
							lastAdded = "attribute";
						} else if (!node.value && node.value !== "" || lastAdded === "value" && !(spaceAfterMeaningfulToken || node.quoteMark)) {
							var _unescaped = (0, _util.unesc)(content);
							var _oldRawValue = (0, _util.getProp)(node, "raws", "value") || "";
							var oldValue = node.value || "";
							node.value = oldValue + _unescaped;
							node.quoteMark = null;
							if (_unescaped !== content || _oldRawValue) {
								(0, _util.ensureObject)(node, "raws");
								node.raws.value = (_oldRawValue || oldValue) + content;
							}
							lastAdded = "value";
						} else {
							var insensitive = content === "i" || content === "I";
							if ((node.value || node.value === "") && (node.quoteMark || spaceAfterMeaningfulToken)) {
								node.insensitive = insensitive;
								if (!insensitive || content === "I") {
									(0, _util.ensureObject)(node, "raws");
									node.raws.insensitiveFlag = content;
								}
								lastAdded = "insensitive";
								if (spaceBefore) {
									(0, _util.ensureObject)(node, "spaces", "insensitive");
									node.spaces.insensitive.before = spaceBefore;
									spaceBefore = "";
								}
								if (commentBefore) {
									(0, _util.ensureObject)(node, "raws", "spaces", "insensitive");
									node.raws.spaces.insensitive.before = commentBefore;
									commentBefore = "";
								}
							} else if (node.value || node.value === "") {
								lastAdded = "value";
								node.value += content;
								if (node.raws.value) node.raws.value += content;
							}
						}
						spaceAfterMeaningfulToken = false;
						break;
					case tokens.str:
						if (!node.attribute || !node.operator) return this.error("Expected an attribute followed by an operator preceding the string.", { index: token[_tokenize.FIELDS.START_POS] });
						var _unescapeValue = (0, _attribute.unescapeValue)(content), unescaped = _unescapeValue.unescaped, quoteMark = _unescapeValue.quoteMark;
						node.value = unescaped;
						node.quoteMark = quoteMark;
						lastAdded = "value";
						(0, _util.ensureObject)(node, "raws");
						node.raws.value = content;
						spaceAfterMeaningfulToken = false;
						break;
					case tokens.equals:
						if (!node.attribute) return this.expected("attribute", token[_tokenize.FIELDS.START_POS], content);
						if (node.value) return this.error("Unexpected \"=\" found; an operator was already defined.", { index: token[_tokenize.FIELDS.START_POS] });
						node.operator = node.operator ? node.operator + content : content;
						lastAdded = "operator";
						spaceAfterMeaningfulToken = false;
						break;
					case tokens.comment:
						if (lastAdded) if (spaceAfterMeaningfulToken || next && next[_tokenize.FIELDS.TYPE] === tokens.space || lastAdded === "insensitive") {
							var lastComment = (0, _util.getProp)(node, "spaces", lastAdded, "after") || "";
							var rawLastComment = (0, _util.getProp)(node, "raws", "spaces", lastAdded, "after") || lastComment;
							(0, _util.ensureObject)(node, "raws", "spaces", lastAdded);
							node.raws.spaces[lastAdded].after = rawLastComment + content;
						} else {
							var lastValue = node[lastAdded] || "";
							var rawLastValue = (0, _util.getProp)(node, "raws", lastAdded) || lastValue;
							(0, _util.ensureObject)(node, "raws");
							node.raws[lastAdded] = rawLastValue + content;
						}
						else commentBefore = commentBefore + content;
						break;
					default: return this.error("Unexpected \"" + content + "\" found.", { index: token[_tokenize.FIELDS.START_POS] });
				}
				pos++;
			}
			unescapeProp(node, "attribute");
			unescapeProp(node, "namespace");
			this.newNode(new _attribute["default"](node));
			this.position++;
		};
		_proto.parseWhitespaceEquivalentTokens = function parseWhitespaceEquivalentTokens(stopPosition) {
			if (stopPosition < 0) stopPosition = this.tokens.length;
			var startPosition = this.position;
			var nodes = [];
			var space = "";
			var lastComment = void 0;
			do
				if (WHITESPACE_TOKENS[this.currToken[_tokenize.FIELDS.TYPE]]) {
					if (!this.options.lossy) space += this.content();
				} else if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.comment) {
					var spaces = {};
					if (space) {
						spaces.before = space;
						space = "";
					}
					lastComment = new _comment["default"]({
						value: this.content(),
						source: getTokenSource(this.currToken),
						sourceIndex: this.currToken[_tokenize.FIELDS.START_POS],
						spaces
					});
					nodes.push(lastComment);
				}
			while (++this.position < stopPosition);
			if (space) {
				if (lastComment) lastComment.spaces.after = space;
				else if (!this.options.lossy) {
					var firstToken = this.tokens[startPosition];
					var lastToken = this.tokens[this.position - 1];
					nodes.push(new _string["default"]({
						value: "",
						source: getSource(firstToken[_tokenize.FIELDS.START_LINE], firstToken[_tokenize.FIELDS.START_COL], lastToken[_tokenize.FIELDS.END_LINE], lastToken[_tokenize.FIELDS.END_COL]),
						sourceIndex: firstToken[_tokenize.FIELDS.START_POS],
						spaces: {
							before: space,
							after: ""
						}
					}));
				}
			}
			return nodes;
		};
		_proto.convertWhitespaceNodesToSpace = function convertWhitespaceNodesToSpace(nodes, requiredSpace) {
			var _this2 = this;
			if (requiredSpace === void 0) requiredSpace = false;
			var space = "";
			var rawSpace = "";
			nodes.forEach(function(n) {
				var spaceBefore = _this2.lossySpace(n.spaces.before, requiredSpace);
				var rawSpaceBefore = _this2.lossySpace(n.rawSpaceBefore, requiredSpace);
				space += spaceBefore + _this2.lossySpace(n.spaces.after, requiredSpace && spaceBefore.length === 0);
				rawSpace += spaceBefore + n.value + _this2.lossySpace(n.rawSpaceAfter, requiredSpace && rawSpaceBefore.length === 0);
			});
			if (rawSpace === space) rawSpace = void 0;
			return {
				space,
				rawSpace
			};
		};
		_proto.isNamedCombinator = function isNamedCombinator(position) {
			if (position === void 0) position = this.position;
			return this.tokens[position + 0] && this.tokens[position + 0][_tokenize.FIELDS.TYPE] === tokens.slash && this.tokens[position + 1] && this.tokens[position + 1][_tokenize.FIELDS.TYPE] === tokens.word && this.tokens[position + 2] && this.tokens[position + 2][_tokenize.FIELDS.TYPE] === tokens.slash;
		};
		_proto.namedCombinator = function namedCombinator() {
			if (this.isNamedCombinator()) {
				var nameRaw = this.content(this.tokens[this.position + 1]);
				var name = (0, _util.unesc)(nameRaw).toLowerCase();
				var raws = {};
				if (name !== nameRaw) raws.value = "/" + nameRaw + "/";
				var node = new _combinator["default"]({
					value: "/" + name + "/",
					source: getSource(this.currToken[_tokenize.FIELDS.START_LINE], this.currToken[_tokenize.FIELDS.START_COL], this.tokens[this.position + 2][_tokenize.FIELDS.END_LINE], this.tokens[this.position + 2][_tokenize.FIELDS.END_COL]),
					sourceIndex: this.currToken[_tokenize.FIELDS.START_POS],
					raws
				});
				this.position = this.position + 3;
				return node;
			} else this.unexpected();
		};
		_proto.combinator = function combinator() {
			var _this3 = this;
			if (this.content() === "|") return this.namespace();
			var nextSigTokenPos = this.locateNextMeaningfulToken(this.position);
			if (nextSigTokenPos < 0 || this.tokens[nextSigTokenPos][_tokenize.FIELDS.TYPE] === tokens.comma || this.tokens[nextSigTokenPos][_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
				var nodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);
				if (nodes.length > 0) {
					var last = this.current.last;
					if (last) {
						var _this$convertWhitespa = this.convertWhitespaceNodesToSpace(nodes), space = _this$convertWhitespa.space, rawSpace = _this$convertWhitespa.rawSpace;
						if (rawSpace !== void 0) last.rawSpaceAfter += rawSpace;
						last.spaces.after += space;
					} else nodes.forEach(function(n) {
						return _this3.newNode(n);
					});
				}
				return;
			}
			var firstToken = this.currToken;
			var spaceOrDescendantSelectorNodes = void 0;
			if (nextSigTokenPos > this.position) spaceOrDescendantSelectorNodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);
			var node;
			if (this.isNamedCombinator()) node = this.namedCombinator();
			else if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.combinator) {
				node = new _combinator["default"]({
					value: this.content(),
					source: getTokenSource(this.currToken),
					sourceIndex: this.currToken[_tokenize.FIELDS.START_POS]
				});
				this.position++;
			} else if (WHITESPACE_TOKENS[this.currToken[_tokenize.FIELDS.TYPE]]) {} else if (!spaceOrDescendantSelectorNodes) this.unexpected();
			if (node) {
				if (spaceOrDescendantSelectorNodes) {
					var _this$convertWhitespa2 = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes), _space = _this$convertWhitespa2.space, _rawSpace = _this$convertWhitespa2.rawSpace;
					node.spaces.before = _space;
					node.rawSpaceBefore = _rawSpace;
				}
			} else {
				var _this$convertWhitespa3 = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes, true), _space2 = _this$convertWhitespa3.space, _rawSpace2 = _this$convertWhitespa3.rawSpace;
				if (!_rawSpace2) _rawSpace2 = _space2;
				var spaces = {};
				var raws = { spaces: {} };
				if (_space2.endsWith(" ") && _rawSpace2.endsWith(" ")) {
					spaces.before = _space2.slice(0, _space2.length - 1);
					raws.spaces.before = _rawSpace2.slice(0, _rawSpace2.length - 1);
				} else if (_space2[0] === " " && _rawSpace2[0] === " ") {
					spaces.after = _space2.slice(1);
					raws.spaces.after = _rawSpace2.slice(1);
				} else raws.value = _rawSpace2;
				node = new _combinator["default"]({
					value: " ",
					source: getTokenSourceSpan(firstToken, this.tokens[this.position - 1]),
					sourceIndex: firstToken[_tokenize.FIELDS.START_POS],
					spaces,
					raws
				});
			}
			if (this.currToken && this.currToken[_tokenize.FIELDS.TYPE] === tokens.space) {
				node.spaces.after = this.optionalSpace(this.content());
				this.position++;
			}
			return this.newNode(node);
		};
		_proto.comma = function comma() {
			if (this.position === this.tokens.length - 1) {
				this.root.trailingComma = true;
				this.position++;
				return;
			}
			this.current._inferEndPosition();
			var selector = new _selector["default"]({
				source: { start: tokenStart(this.tokens[this.position + 1]) },
				sourceIndex: this.tokens[this.position + 1][_tokenize.FIELDS.START_POS]
			});
			this.current.parent.append(selector);
			this.current = selector;
			this.position++;
		};
		_proto.comment = function comment() {
			var current = this.currToken;
			this.newNode(new _comment["default"]({
				value: this.content(),
				source: getTokenSource(current),
				sourceIndex: current[_tokenize.FIELDS.START_POS]
			}));
			this.position++;
		};
		_proto.error = function error(message, opts) {
			throw this.root.error(message, opts);
		};
		_proto.missingBackslash = function missingBackslash() {
			return this.error("Expected a backslash preceding the semicolon.", { index: this.currToken[_tokenize.FIELDS.START_POS] });
		};
		_proto.missingParenthesis = function missingParenthesis() {
			return this.expected("opening parenthesis", this.currToken[_tokenize.FIELDS.START_POS]);
		};
		_proto.missingSquareBracket = function missingSquareBracket() {
			return this.expected("opening square bracket", this.currToken[_tokenize.FIELDS.START_POS]);
		};
		_proto.unexpected = function unexpected() {
			return this.error("Unexpected '" + this.content() + "'. Escaping special characters with \\ may help.", this.currToken[_tokenize.FIELDS.START_POS]);
		};
		_proto.unexpectedPipe = function unexpectedPipe() {
			return this.error("Unexpected '|'.", this.currToken[_tokenize.FIELDS.START_POS]);
		};
		_proto.namespace = function namespace() {
			var before = this.prevToken && this.content(this.prevToken) || true;
			if (this.nextToken[_tokenize.FIELDS.TYPE] === tokens.word) {
				this.position++;
				return this.word(before);
			} else if (this.nextToken[_tokenize.FIELDS.TYPE] === tokens.asterisk) {
				this.position++;
				return this.universal(before);
			}
			this.unexpectedPipe();
		};
		_proto.nesting = function nesting() {
			if (this.nextToken) {
				if (this.content(this.nextToken) === "|") {
					this.position++;
					return;
				}
			}
			var current = this.currToken;
			this.newNode(new _nesting["default"]({
				value: this.content(),
				source: getTokenSource(current),
				sourceIndex: current[_tokenize.FIELDS.START_POS]
			}));
			this.position++;
		};
		_proto.parentheses = function parentheses() {
			var last = this.current.last;
			var unbalanced = 1;
			this.position++;
			if (last && last.type === types.PSEUDO) {
				var selector = new _selector["default"]({
					source: { start: tokenStart(this.tokens[this.position]) },
					sourceIndex: this.tokens[this.position][_tokenize.FIELDS.START_POS]
				});
				var cache = this.current;
				last.append(selector);
				this.current = selector;
				while (this.position < this.tokens.length && unbalanced) {
					if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) unbalanced++;
					if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) unbalanced--;
					if (unbalanced) this.parse();
					else {
						this.current.source.end = tokenEnd(this.currToken);
						this.current.parent.source.end = tokenEnd(this.currToken);
						this.position++;
					}
				}
				this.current = cache;
			} else {
				var parenStart = this.currToken;
				var parenValue = "(";
				var parenEnd;
				while (this.position < this.tokens.length && unbalanced) {
					if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) unbalanced++;
					if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) unbalanced--;
					parenEnd = this.currToken;
					parenValue += this.parseParenthesisToken(this.currToken);
					this.position++;
				}
				if (last) last.appendToPropertyAndEscape("value", parenValue, parenValue);
				else this.newNode(new _string["default"]({
					value: parenValue,
					source: getSource(parenStart[_tokenize.FIELDS.START_LINE], parenStart[_tokenize.FIELDS.START_COL], parenEnd[_tokenize.FIELDS.END_LINE], parenEnd[_tokenize.FIELDS.END_COL]),
					sourceIndex: parenStart[_tokenize.FIELDS.START_POS]
				}));
			}
			if (unbalanced) return this.expected("closing parenthesis", this.currToken[_tokenize.FIELDS.START_POS]);
		};
		_proto.pseudo = function pseudo() {
			var _this4 = this;
			var pseudoStr = "";
			var startingToken = this.currToken;
			while (this.currToken && this.currToken[_tokenize.FIELDS.TYPE] === tokens.colon) {
				pseudoStr += this.content();
				this.position++;
			}
			if (!this.currToken) return this.expected(["pseudo-class", "pseudo-element"], this.position - 1);
			if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.word) this.splitWord(false, function(first, length) {
				pseudoStr += first;
				_this4.newNode(new _pseudo["default"]({
					value: pseudoStr,
					source: getTokenSourceSpan(startingToken, _this4.currToken),
					sourceIndex: startingToken[_tokenize.FIELDS.START_POS]
				}));
				if (length > 1 && _this4.nextToken && _this4.nextToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) _this4.error("Misplaced parenthesis.", { index: _this4.nextToken[_tokenize.FIELDS.START_POS] });
			});
			else return this.expected(["pseudo-class", "pseudo-element"], this.currToken[_tokenize.FIELDS.START_POS]);
		};
		_proto.space = function space() {
			var content = this.content();
			if (this.position === 0 || this.prevToken[_tokenize.FIELDS.TYPE] === tokens.comma || this.prevToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis || this.current.nodes.every(function(node) {
				return node.type === "comment";
			})) {
				this.spaces = this.optionalSpace(content);
				this.position++;
			} else if (this.position === this.tokens.length - 1 || this.nextToken[_tokenize.FIELDS.TYPE] === tokens.comma || this.nextToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
				this.current.last.spaces.after = this.optionalSpace(content);
				this.position++;
			} else this.combinator();
		};
		_proto.string = function string() {
			var current = this.currToken;
			this.newNode(new _string["default"]({
				value: this.content(),
				source: getTokenSource(current),
				sourceIndex: current[_tokenize.FIELDS.START_POS]
			}));
			this.position++;
		};
		_proto.universal = function universal(namespace) {
			var nextToken = this.nextToken;
			if (nextToken && this.content(nextToken) === "|") {
				this.position++;
				return this.namespace();
			}
			var current = this.currToken;
			this.newNode(new _universal["default"]({
				value: this.content(),
				source: getTokenSource(current),
				sourceIndex: current[_tokenize.FIELDS.START_POS]
			}), namespace);
			this.position++;
		};
		_proto.splitWord = function splitWord(namespace, firstCallback) {
			var _this5 = this;
			var nextToken = this.nextToken;
			var word = this.content();
			while (nextToken && ~[
				tokens.dollar,
				tokens.caret,
				tokens.equals,
				tokens.word
			].indexOf(nextToken[_tokenize.FIELDS.TYPE])) {
				this.position++;
				var current = this.content();
				word += current;
				if (current.lastIndexOf("\\") === current.length - 1) {
					var next = this.nextToken;
					if (next && next[_tokenize.FIELDS.TYPE] === tokens.space) {
						word += this.requiredSpace(this.content(next));
						this.position++;
					}
				}
				nextToken = this.nextToken;
			}
			var hasClass = indexesOf(word, ".").filter(function(i) {
				var escapedDot = word[i - 1] === "\\";
				var isKeyframesPercent = /^\d+\.\d+%$/.test(word);
				return !escapedDot && !isKeyframesPercent;
			});
			var hasId = indexesOf(word, "#").filter(function(i) {
				return word[i - 1] !== "\\";
			});
			var interpolations = indexesOf(word, "#{");
			if (interpolations.length) hasId = hasId.filter(function(hashIndex) {
				return !~interpolations.indexOf(hashIndex);
			});
			var indices = (0, _sortAscending["default"])(uniqs([0].concat(hasClass, hasId)));
			indices.forEach(function(ind, i) {
				var index = indices[i + 1] || word.length;
				var value = word.slice(ind, index);
				if (i === 0 && firstCallback) return firstCallback.call(_this5, value, indices.length);
				var node;
				var current = _this5.currToken;
				var sourceIndex = current[_tokenize.FIELDS.START_POS] + indices[i];
				var source = getSource(current[1], current[2] + ind, current[3], current[2] + (index - 1));
				if (~hasClass.indexOf(ind)) {
					var classNameOpts = {
						value: value.slice(1),
						source,
						sourceIndex
					};
					node = new _className["default"](unescapeProp(classNameOpts, "value"));
				} else if (~hasId.indexOf(ind)) {
					var idOpts = {
						value: value.slice(1),
						source,
						sourceIndex
					};
					node = new _id["default"](unescapeProp(idOpts, "value"));
				} else {
					var tagOpts = {
						value,
						source,
						sourceIndex
					};
					unescapeProp(tagOpts, "value");
					node = new _tag["default"](tagOpts);
				}
				_this5.newNode(node, namespace);
				namespace = null;
			});
			this.position++;
		};
		_proto.word = function word(namespace) {
			var nextToken = this.nextToken;
			if (nextToken && this.content(nextToken) === "|") {
				this.position++;
				return this.namespace();
			}
			return this.splitWord(namespace);
		};
		_proto.loop = function loop() {
			while (this.position < this.tokens.length) this.parse(true);
			this.current._inferEndPosition();
			return this.root;
		};
		_proto.parse = function parse(throwOnParenthesis) {
			switch (this.currToken[_tokenize.FIELDS.TYPE]) {
				case tokens.space:
					this.space();
					break;
				case tokens.comment:
					this.comment();
					break;
				case tokens.openParenthesis:
					this.parentheses();
					break;
				case tokens.closeParenthesis:
					if (throwOnParenthesis) this.missingParenthesis();
					break;
				case tokens.openSquare:
					this.attribute();
					break;
				case tokens.dollar:
				case tokens.caret:
				case tokens.equals:
				case tokens.word:
					this.word();
					break;
				case tokens.colon:
					this.pseudo();
					break;
				case tokens.comma:
					this.comma();
					break;
				case tokens.asterisk:
					this.universal();
					break;
				case tokens.ampersand:
					this.nesting();
					break;
				case tokens.slash:
				case tokens.combinator:
					this.combinator();
					break;
				case tokens.str:
					this.string();
					break;
				case tokens.closeSquare: this.missingSquareBracket();
				case tokens.semicolon: this.missingBackslash();
				default: this.unexpected();
			}
		};
		_proto.expected = function expected(description, index, found) {
			if (Array.isArray(description)) {
				var last = description.pop();
				description = description.join(", ") + " or " + last;
			}
			var an = /^[aeiou]/.test(description[0]) ? "an" : "a";
			if (!found) return this.error("Expected " + an + " " + description + ".", { index });
			return this.error("Expected " + an + " " + description + ", found \"" + found + "\" instead.", { index });
		};
		_proto.requiredSpace = function requiredSpace(space) {
			return this.options.lossy ? " " : space;
		};
		_proto.optionalSpace = function optionalSpace(space) {
			return this.options.lossy ? "" : space;
		};
		_proto.lossySpace = function lossySpace(space, required) {
			if (this.options.lossy) return required ? " " : "";
			else return space;
		};
		_proto.parseParenthesisToken = function parseParenthesisToken(token) {
			var content = this.content(token);
			if (token[_tokenize.FIELDS.TYPE] === tokens.space) return this.requiredSpace(content);
			else return content;
		};
		_proto.newNode = function newNode(node, namespace) {
			if (namespace) {
				if (/^ +$/.test(namespace)) {
					if (!this.options.lossy) this.spaces = (this.spaces || "") + namespace;
					namespace = true;
				}
				node.namespace = namespace;
				unescapeProp(node, "namespace");
			}
			if (this.spaces) {
				node.spaces.before = this.spaces;
				this.spaces = "";
			}
			return this.current.append(node);
		};
		_proto.content = function content(token) {
			if (token === void 0) token = this.currToken;
			return this.css.slice(token[_tokenize.FIELDS.START_POS], token[_tokenize.FIELDS.END_POS]);
		};
		/**
		* returns the index of the next non-whitespace, non-comment token.
		* returns -1 if no meaningful token is found.
		*/
		_proto.locateNextMeaningfulToken = function locateNextMeaningfulToken(startPosition) {
			if (startPosition === void 0) startPosition = this.position + 1;
			var searchPosition = startPosition;
			while (searchPosition < this.tokens.length) if (WHITESPACE_EQUIV_TOKENS[this.tokens[searchPosition][_tokenize.FIELDS.TYPE]]) {
				searchPosition++;
				continue;
			} else return searchPosition;
			return -1;
		};
		_createClass(Parser, [
			{
				key: "currToken",
				get: function get() {
					return this.tokens[this.position];
				}
			},
			{
				key: "nextToken",
				get: function get() {
					return this.tokens[this.position + 1];
				}
			},
			{
				key: "prevToken",
				get: function get() {
					return this.tokens[this.position - 1];
				}
			}
		]);
		return Parser;
	}();
	exports["default"] = Parser;
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/processor.js
var require_processor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _parser = _interopRequireDefault(require_parser());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	var Processor = /* @__PURE__ */ function() {
		function Processor(func, options) {
			this.func = func || function noop() {};
			this.funcRes = null;
			this.options = options;
		}
		var _proto = Processor.prototype;
		_proto._shouldUpdateSelector = function _shouldUpdateSelector(rule, options) {
			if (options === void 0) options = {};
			if (Object.assign({}, this.options, options).updateSelector === false) return false;
			else return typeof rule !== "string";
		};
		_proto._isLossy = function _isLossy(options) {
			if (options === void 0) options = {};
			if (Object.assign({}, this.options, options).lossless === false) return true;
			else return false;
		};
		_proto._root = function _root(rule, options) {
			if (options === void 0) options = {};
			return new _parser["default"](rule, this._parseOptions(options)).root;
		};
		_proto._parseOptions = function _parseOptions(options) {
			return { lossy: this._isLossy(options) };
		};
		_proto._run = function _run(rule, options) {
			var _this = this;
			if (options === void 0) options = {};
			return new Promise(function(resolve, reject) {
				try {
					var root = _this._root(rule, options);
					Promise.resolve(_this.func(root)).then(function(transform) {
						var string = void 0;
						if (_this._shouldUpdateSelector(rule, options)) {
							string = root.toString();
							rule.selector = string;
						}
						return {
							transform,
							root,
							string
						};
					}).then(resolve, reject);
				} catch (e) {
					reject(e);
					return;
				}
			});
		};
		_proto._runSync = function _runSync(rule, options) {
			if (options === void 0) options = {};
			var root = this._root(rule, options);
			var transform = this.func(root);
			if (transform && typeof transform.then === "function") throw new Error("Selector processor returned a promise to a synchronous call.");
			var string = void 0;
			if (options.updateSelector && typeof rule !== "string") {
				string = root.toString();
				rule.selector = string;
			}
			return {
				transform,
				root,
				string
			};
		};
		_proto.ast = function ast(rule, options) {
			return this._run(rule, options).then(function(result) {
				return result.root;
			});
		};
		_proto.astSync = function astSync(rule, options) {
			return this._runSync(rule, options).root;
		};
		_proto.transform = function transform(rule, options) {
			return this._run(rule, options).then(function(result) {
				return result.transform;
			});
		};
		_proto.transformSync = function transformSync(rule, options) {
			return this._runSync(rule, options).transform;
		};
		_proto.process = function process(rule, options) {
			return this._run(rule, options).then(function(result) {
				return result.string || result.root.toString();
			});
		};
		_proto.processSync = function processSync(rule, options) {
			var result = this._runSync(rule, options);
			return result.string || result.root.toString();
		};
		return Processor;
	}();
	exports["default"] = Processor;
	module.exports = exports.default;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/selectors/constructors.js
var require_constructors = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	exports.universal = exports.tag = exports.string = exports.selector = exports.root = exports.pseudo = exports.nesting = exports.id = exports.comment = exports.combinator = exports.className = exports.attribute = void 0;
	var _attribute = _interopRequireDefault(require_attribute());
	var _className = _interopRequireDefault(require_className());
	var _combinator = _interopRequireDefault(require_combinator());
	var _comment = _interopRequireDefault(require_comment());
	var _id = _interopRequireDefault(require_id());
	var _nesting = _interopRequireDefault(require_nesting());
	var _pseudo = _interopRequireDefault(require_pseudo());
	var _root = _interopRequireDefault(require_root());
	var _selector = _interopRequireDefault(require_selector());
	var _string = _interopRequireDefault(require_string());
	var _tag = _interopRequireDefault(require_tag());
	var _universal = _interopRequireDefault(require_universal());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	var attribute = function attribute(opts) {
		return new _attribute["default"](opts);
	};
	exports.attribute = attribute;
	var className = function className(opts) {
		return new _className["default"](opts);
	};
	exports.className = className;
	var combinator = function combinator(opts) {
		return new _combinator["default"](opts);
	};
	exports.combinator = combinator;
	var comment = function comment(opts) {
		return new _comment["default"](opts);
	};
	exports.comment = comment;
	var id = function id(opts) {
		return new _id["default"](opts);
	};
	exports.id = id;
	var nesting = function nesting(opts) {
		return new _nesting["default"](opts);
	};
	exports.nesting = nesting;
	var pseudo = function pseudo(opts) {
		return new _pseudo["default"](opts);
	};
	exports.pseudo = pseudo;
	var root = function root(opts) {
		return new _root["default"](opts);
	};
	exports.root = root;
	var selector = function selector(opts) {
		return new _selector["default"](opts);
	};
	exports.selector = selector;
	var string = function string(opts) {
		return new _string["default"](opts);
	};
	exports.string = string;
	var tag = function tag(opts) {
		return new _tag["default"](opts);
	};
	exports.tag = tag;
	var universal = function universal(opts) {
		return new _universal["default"](opts);
	};
	exports.universal = universal;
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/selectors/guards.js
var require_guards = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	exports.isComment = exports.isCombinator = exports.isClassName = exports.isAttribute = void 0;
	exports.isContainer = isContainer;
	exports.isIdentifier = void 0;
	exports.isNamespace = isNamespace;
	exports.isNesting = void 0;
	exports.isNode = isNode;
	exports.isPseudo = void 0;
	exports.isPseudoClass = isPseudoClass;
	exports.isPseudoElement = isPseudoElement;
	exports.isUniversal = exports.isTag = exports.isString = exports.isSelector = exports.isRoot = void 0;
	var _types = require_types();
	var _IS_TYPE;
	var IS_TYPE = (_IS_TYPE = {}, _IS_TYPE[_types.ATTRIBUTE] = true, _IS_TYPE[_types.CLASS] = true, _IS_TYPE[_types.COMBINATOR] = true, _IS_TYPE[_types.COMMENT] = true, _IS_TYPE[_types.ID] = true, _IS_TYPE[_types.NESTING] = true, _IS_TYPE[_types.PSEUDO] = true, _IS_TYPE[_types.ROOT] = true, _IS_TYPE[_types.SELECTOR] = true, _IS_TYPE[_types.STRING] = true, _IS_TYPE[_types.TAG] = true, _IS_TYPE[_types.UNIVERSAL] = true, _IS_TYPE);
	function isNode(node) {
		return typeof node === "object" && IS_TYPE[node.type];
	}
	function isNodeType(type, node) {
		return isNode(node) && node.type === type;
	}
	var isAttribute = isNodeType.bind(null, _types.ATTRIBUTE);
	exports.isAttribute = isAttribute;
	var isClassName = isNodeType.bind(null, _types.CLASS);
	exports.isClassName = isClassName;
	var isCombinator = isNodeType.bind(null, _types.COMBINATOR);
	exports.isCombinator = isCombinator;
	var isComment = isNodeType.bind(null, _types.COMMENT);
	exports.isComment = isComment;
	var isIdentifier = isNodeType.bind(null, _types.ID);
	exports.isIdentifier = isIdentifier;
	var isNesting = isNodeType.bind(null, _types.NESTING);
	exports.isNesting = isNesting;
	var isPseudo = isNodeType.bind(null, _types.PSEUDO);
	exports.isPseudo = isPseudo;
	var isRoot = isNodeType.bind(null, _types.ROOT);
	exports.isRoot = isRoot;
	var isSelector = isNodeType.bind(null, _types.SELECTOR);
	exports.isSelector = isSelector;
	var isString = isNodeType.bind(null, _types.STRING);
	exports.isString = isString;
	var isTag = isNodeType.bind(null, _types.TAG);
	exports.isTag = isTag;
	var isUniversal = isNodeType.bind(null, _types.UNIVERSAL);
	exports.isUniversal = isUniversal;
	function isPseudoElement(node) {
		return isPseudo(node) && node.value && (node.value.startsWith("::") || node.value.toLowerCase() === ":before" || node.value.toLowerCase() === ":after" || node.value.toLowerCase() === ":first-letter" || node.value.toLowerCase() === ":first-line");
	}
	function isPseudoClass(node) {
		return isPseudo(node) && !isPseudoElement(node);
	}
	function isContainer(node) {
		return !!(isNode(node) && node.walk);
	}
	function isNamespace(node) {
		return isAttribute(node) || isTag(node);
	}
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/selectors/index.js
var require_selectors = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	var _types = require_types();
	Object.keys(_types).forEach(function(key) {
		if (key === "default" || key === "__esModule") return;
		if (key in exports && exports[key] === _types[key]) return;
		exports[key] = _types[key];
	});
	var _constructors = require_constructors();
	Object.keys(_constructors).forEach(function(key) {
		if (key === "default" || key === "__esModule") return;
		if (key in exports && exports[key] === _constructors[key]) return;
		exports[key] = _constructors[key];
	});
	var _guards = require_guards();
	Object.keys(_guards).forEach(function(key) {
		if (key === "default" || key === "__esModule") return;
		if (key in exports && exports[key] === _guards[key]) return;
		exports[key] = _guards[key];
	});
}));

//#endregion
//#region node_modules/.pnpm/postcss-selector-parser@7.1.1/node_modules/postcss-selector-parser/dist/index.js
var require_dist = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _processor = _interopRequireDefault(require_processor());
	var selectors = _interopRequireWildcard(require_selectors());
	function _getRequireWildcardCache(nodeInterop) {
		if (typeof WeakMap !== "function") return null;
		var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
		var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
		return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
			return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
		})(nodeInterop);
	}
	function _interopRequireWildcard(obj, nodeInterop) {
		if (!nodeInterop && obj && obj.__esModule) return obj;
		if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { "default": obj };
		var cache = _getRequireWildcardCache(nodeInterop);
		if (cache && cache.has(obj)) return cache.get(obj);
		var newObj = {};
		var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
			if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
			else newObj[key] = obj[key];
		}
		newObj["default"] = obj;
		if (cache) cache.set(obj, newObj);
		return newObj;
	}
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	var parser = function parser(processor) {
		return new _processor["default"](processor);
	};
	Object.assign(parser, selectors);
	delete parser.__esModule;
	var _default = parser;
	exports["default"] = _default;
	module.exports = exports.default;
}));

//#endregion
//#region packages/compiler-sfc/src/style/pluginScoped.ts
var import_dist = /* @__PURE__ */ __toESM(require_dist());
const animationNameRE = /^(?:-\w+-)?animation-name$/;
const animationRE = /^(?:-\w+-)?animation$/;
const keyframesRE = /^(?:-\w+-)?keyframes$/;
const scopedPlugin = (id = "") => {
	const keyframes = Object.create(null);
	const shortId = id.replace(/^data-v-/, "");
	return {
		postcssPlugin: "vue-sfc-scoped",
		Rule(rule) {
			processRule(id, rule);
		},
		AtRule(node) {
			if (keyframesRE.test(node.name) && !node.params.endsWith(`-${shortId}`)) keyframes[node.params] = node.params = node.params + "-" + shortId;
		},
		OnceExit(root) {
			if (Object.keys(keyframes).length) root.walkDecls((decl) => {
				if (animationNameRE.test(decl.prop)) decl.value = decl.value.split(",").map((v) => keyframes[v.trim()] || v.trim()).join(",");
				if (animationRE.test(decl.prop)) decl.value = decl.value.split(",").map((v) => {
					const vals = v.trim().split(/\s+/);
					const i = vals.findIndex((val) => keyframes[val]);
					if (i !== -1) {
						vals.splice(i, 1, keyframes[vals[i]]);
						return vals.join(" ");
					} else return v;
				}).join(",");
			});
		}
	};
};
const processedRules = /* @__PURE__ */ new WeakSet();
function processRule(id, rule) {
	if (processedRules.has(rule) || rule.parent && rule.parent.type === "atrule" && keyframesRE.test(rule.parent.name)) return;
	processedRules.add(rule);
	let deep = false;
	let parent = rule.parent;
	while (parent && parent.type !== "root") {
		if (parent.__deep) {
			deep = true;
			break;
		}
		parent = parent.parent;
	}
	rule.selector = (0, import_dist.default)((selectorRoot) => {
		selectorRoot.each((selector) => {
			rewriteSelector(id, rule, selector, selectorRoot, deep);
		});
	}).processSync(rule.selector);
}
function rewriteSelector(id, rule, selector, selectorRoot, deep, slotted = false) {
	let node = null;
	let shouldInject = !deep;
	selector.each((n) => {
		if (n.type === "combinator" && (n.value === ">>>" || n.value === "/deep/")) {
			n.value = " ";
			n.spaces.before = n.spaces.after = "";
			warn("the >>> and /deep/ combinators have been deprecated. Use :deep() instead.");
			return false;
		}
		if (n.type === "pseudo") {
			const { value } = n;
			if (value === ":deep" || value === "::v-deep") {
				rule.__deep = true;
				if (n.nodes.length) {
					let last = n;
					n.nodes[0].each((ss) => {
						selector.insertAfter(last, ss);
						last = ss;
					});
					const prev = selector.at(selector.index(n) - 1);
					if (!prev || !isSpaceCombinator(prev)) selector.insertAfter(n, import_dist.default.combinator({ value: " " }));
					selector.removeChild(n);
				} else {
					warn(`${value} usage as a combinator has been deprecated. Use :deep(<inner-selector>) instead of ${value} <inner-selector>.`);
					const prev = selector.at(selector.index(n) - 1);
					if (prev && isSpaceCombinator(prev)) selector.removeChild(prev);
					selector.removeChild(n);
				}
				return false;
			}
			if (value === ":slotted" || value === "::v-slotted") {
				rewriteSelector(id, rule, n.nodes[0], selectorRoot, deep, true);
				let last = n;
				n.nodes[0].each((ss) => {
					selector.insertAfter(last, ss);
					last = ss;
				});
				selector.removeChild(n);
				shouldInject = false;
				return false;
			}
			if (value === ":global" || value === "::v-global") {
				selector.replaceWith(n.nodes[0]);
				return false;
			}
		}
		if (n.type === "universal") {
			const prev = selector.at(selector.index(n) - 1);
			const next = selector.at(selector.index(n) + 1);
			if (!prev) if (next) {
				if (next.type === "combinator" && next.value === " ") selector.removeChild(next);
				selector.removeChild(n);
				return;
			} else {
				node = import_dist.default.combinator({ value: "" });
				selector.insertBefore(n, node);
				selector.removeChild(n);
				return false;
			}
			if (node) return;
		}
		if (n.type !== "pseudo" && n.type !== "combinator" || n.type === "pseudo" && (n.value === ":is" || n.value === ":where") && !node) node = n;
	});
	if (rule.nodes.some((node) => node.type === "rule")) {
		const deep = rule.__deep;
		if (!deep) {
			extractAndWrapNodes(rule);
			const atruleNodes = rule.nodes.filter((node) => node.type === "atrule");
			for (const atnode of atruleNodes) extractAndWrapNodes(atnode);
		}
		shouldInject = deep;
	}
	if (node) {
		const { type, value } = node;
		if (type === "pseudo" && (value === ":is" || value === ":where")) {
			node.nodes.forEach((value) => rewriteSelector(id, rule, value, selectorRoot, deep, slotted));
			shouldInject = false;
		}
	}
	if (node) node.spaces.after = "";
	else selector.first.spaces.before = "";
	if (shouldInject) {
		const idToAdd = slotted ? id + "-s" : id;
		selector.insertAfter(node, import_dist.default.attribute({
			attribute: idToAdd,
			value: idToAdd,
			raws: {},
			quoteMark: `"`
		}));
	}
}
function isSpaceCombinator(node) {
	return node.type === "combinator" && /^\s+$/.test(node.value);
}
function extractAndWrapNodes(parentNode) {
	if (!parentNode.nodes) return;
	const nodes = parentNode.nodes.filter((node) => node.type === "decl" || node.type === "comment");
	if (nodes.length) {
		for (const node of nodes) parentNode.removeChild(node);
		const wrappedRule = new postcss.Rule({
			nodes,
			selector: "&"
		});
		parentNode.prepend(wrappedRule);
	}
}
scopedPlugin.postcss = true;
var pluginScoped_default = scopedPlugin;

//#endregion
//#region node_modules/.pnpm/source-map@0.6.1/node_modules/source-map/lib/base64.js
var require_base64 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
	/**
	* Encode an integer in the range of 0 to 63 to a single base 64 digit.
	*/
	exports.encode = function(number) {
		if (0 <= number && number < intToCharMap.length) return intToCharMap[number];
		throw new TypeError("Must be between 0 and 63: " + number);
	};
	/**
	* Decode a single base 64 character code digit to an integer. Returns -1 on
	* failure.
	*/
	exports.decode = function(charCode) {
		var bigA = 65;
		var bigZ = 90;
		var littleA = 97;
		var littleZ = 122;
		var zero = 48;
		var nine = 57;
		var plus = 43;
		var slash = 47;
		var littleOffset = 26;
		var numberOffset = 52;
		if (bigA <= charCode && charCode <= bigZ) return charCode - bigA;
		if (littleA <= charCode && charCode <= littleZ) return charCode - littleA + littleOffset;
		if (zero <= charCode && charCode <= nine) return charCode - zero + numberOffset;
		if (charCode == plus) return 62;
		if (charCode == slash) return 63;
		return -1;
	};
}));

//#endregion
//#region node_modules/.pnpm/source-map@0.6.1/node_modules/source-map/lib/base64-vlq.js
var require_base64_vlq = /* @__PURE__ */ __commonJSMin(((exports) => {
	var base64 = require_base64();
	var VLQ_BASE_SHIFT = 5;
	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
	var VLQ_BASE_MASK = VLQ_BASE - 1;
	var VLQ_CONTINUATION_BIT = VLQ_BASE;
	/**
	* Converts from a two-complement value to a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	*   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	*/
	function toVLQSigned(aValue) {
		return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
	}
	/**
	* Converts to a two-complement value from a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	*   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	*/
	function fromVLQSigned(aValue) {
		var isNegative = (aValue & 1) === 1;
		var shifted = aValue >> 1;
		return isNegative ? -shifted : shifted;
	}
	/**
	* Returns the base 64 VLQ encoded value.
	*/
	exports.encode = function base64VLQ_encode(aValue) {
		var encoded = "";
		var digit;
		var vlq = toVLQSigned(aValue);
		do {
			digit = vlq & VLQ_BASE_MASK;
			vlq >>>= VLQ_BASE_SHIFT;
			if (vlq > 0) digit |= VLQ_CONTINUATION_BIT;
			encoded += base64.encode(digit);
		} while (vlq > 0);
		return encoded;
	};
	/**
	* Decodes the next base 64 VLQ value from the given string and returns the
	* value and the rest of the string via the out parameter.
	*/
	exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
		var strLen = aStr.length;
		var result = 0;
		var shift = 0;
		var continuation, digit;
		do {
			if (aIndex >= strLen) throw new Error("Expected more digits in base 64 VLQ value.");
			digit = base64.decode(aStr.charCodeAt(aIndex++));
			if (digit === -1) throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
			continuation = !!(digit & VLQ_CONTINUATION_BIT);
			digit &= VLQ_BASE_MASK;
			result = result + (digit << shift);
			shift += VLQ_BASE_SHIFT;
		} while (continuation);
		aOutParam.value = fromVLQSigned(result);
		aOutParam.rest = aIndex;
	};
}));

//#endregion
//#region node_modules/.pnpm/source-map@0.6.1/node_modules/source-map/lib/util.js
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* This is a helper function for getting values from parameter/options
	* objects.
	*
	* @param args The object we are extracting values from
	* @param name The name of the property we are getting.
	* @param defaultValue An optional value to return if the property is missing
	* from the object. If this is not specified and the property is missing, an
	* error will be thrown.
	*/
	function getArg(aArgs, aName, aDefaultValue) {
		if (aName in aArgs) return aArgs[aName];
		else if (arguments.length === 3) return aDefaultValue;
		else throw new Error("\"" + aName + "\" is a required argument.");
	}
	exports.getArg = getArg;
	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;
	function urlParse(aUrl) {
		var match = aUrl.match(urlRegexp);
		if (!match) return null;
		return {
			scheme: match[1],
			auth: match[2],
			host: match[3],
			port: match[4],
			path: match[5]
		};
	}
	exports.urlParse = urlParse;
	function urlGenerate(aParsedUrl) {
		var url = "";
		if (aParsedUrl.scheme) url += aParsedUrl.scheme + ":";
		url += "//";
		if (aParsedUrl.auth) url += aParsedUrl.auth + "@";
		if (aParsedUrl.host) url += aParsedUrl.host;
		if (aParsedUrl.port) url += ":" + aParsedUrl.port;
		if (aParsedUrl.path) url += aParsedUrl.path;
		return url;
	}
	exports.urlGenerate = urlGenerate;
	/**
	* Normalizes a path, or the path portion of a URL:
	*
	* - Replaces consecutive slashes with one slash.
	* - Removes unnecessary '.' parts.
	* - Removes unnecessary '<dir>/..' parts.
	*
	* Based on code in the Node.js 'path' core module.
	*
	* @param aPath The path or url to normalize.
	*/
	function normalize(aPath) {
		var path = aPath;
		var url = urlParse(aPath);
		if (url) {
			if (!url.path) return aPath;
			path = url.path;
		}
		var isAbsolute = exports.isAbsolute(path);
		var parts = path.split(/\/+/);
		for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
			part = parts[i];
			if (part === ".") parts.splice(i, 1);
			else if (part === "..") up++;
			else if (up > 0) if (part === "") {
				parts.splice(i + 1, up);
				up = 0;
			} else {
				parts.splice(i, 2);
				up--;
			}
		}
		path = parts.join("/");
		if (path === "") path = isAbsolute ? "/" : ".";
		if (url) {
			url.path = path;
			return urlGenerate(url);
		}
		return path;
	}
	exports.normalize = normalize;
	/**
	* Joins two paths/URLs.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be joined with the root.
	*
	* - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	*   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	*   first.
	* - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	*   is updated with the result and aRoot is returned. Otherwise the result
	*   is returned.
	*   - If aPath is absolute, the result is aPath.
	*   - Otherwise the two paths are joined with a slash.
	* - Joining for example 'http://' and 'www.example.com' is also supported.
	*/
	function join(aRoot, aPath) {
		if (aRoot === "") aRoot = ".";
		if (aPath === "") aPath = ".";
		var aPathUrl = urlParse(aPath);
		var aRootUrl = urlParse(aRoot);
		if (aRootUrl) aRoot = aRootUrl.path || "/";
		if (aPathUrl && !aPathUrl.scheme) {
			if (aRootUrl) aPathUrl.scheme = aRootUrl.scheme;
			return urlGenerate(aPathUrl);
		}
		if (aPathUrl || aPath.match(dataUrlRegexp)) return aPath;
		if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
			aRootUrl.host = aPath;
			return urlGenerate(aRootUrl);
		}
		var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
		if (aRootUrl) {
			aRootUrl.path = joined;
			return urlGenerate(aRootUrl);
		}
		return joined;
	}
	exports.join = join;
	exports.isAbsolute = function(aPath) {
		return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
	};
	/**
	* Make a path relative to a URL or another path.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be made relative to aRoot.
	*/
	function relative(aRoot, aPath) {
		if (aRoot === "") aRoot = ".";
		aRoot = aRoot.replace(/\/$/, "");
		var level = 0;
		while (aPath.indexOf(aRoot + "/") !== 0) {
			var index = aRoot.lastIndexOf("/");
			if (index < 0) return aPath;
			aRoot = aRoot.slice(0, index);
			if (aRoot.match(/^([^\/]+:\/)?\/*$/)) return aPath;
			++level;
		}
		return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;
	var supportsNullProto = function() {
		return !("__proto__" in Object.create(null));
	}();
	function identity(s) {
		return s;
	}
	/**
	* Because behavior goes wacky when you set `__proto__` on objects, we
	* have to prefix all the strings in our set with an arbitrary character.
	*
	* See https://github.com/mozilla/source-map/pull/31 and
	* https://github.com/mozilla/source-map/issues/30
	*
	* @param String aStr
	*/
	function toSetString(aStr) {
		if (isProtoString(aStr)) return "$" + aStr;
		return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;
	function fromSetString(aStr) {
		if (isProtoString(aStr)) return aStr.slice(1);
		return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;
	function isProtoString(s) {
		if (!s) return false;
		var length = s.length;
		if (length < 9) return false;
		if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) return false;
		for (var i = length - 10; i >= 0; i--) if (s.charCodeAt(i) !== 36) return false;
		return true;
	}
	/**
	* Comparator between two mappings where the original positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same original source/line/column, but different generated
	* line and column the same. Useful when searching for a mapping with a
	* stubbed out mapping.
	*/
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
		var cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0 || onlyCompareOriginal) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;
	/**
	* Comparator between two mappings with deflated source and name indices where
	* the generated positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same generated line and column, but different
	* source/name/original line and column the same. Useful when searching for a
	* mapping with a stubbed out mapping.
	*/
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0 || onlyCompareGenerated) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
	function strcmp(aStr1, aStr2) {
		if (aStr1 === aStr2) return 0;
		if (aStr1 === null) return 1;
		if (aStr2 === null) return -1;
		if (aStr1 > aStr2) return 1;
		return -1;
	}
	/**
	* Comparator between two mappings with inflated source and name strings where
	* the generated positions are compared.
	*/
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
	/**
	* Strip any JSON XSSI avoidance prefix from the string (as documented
	* in the source maps specification), and then parse the string as
	* JSON.
	*/
	function parseSourceMapInput(str) {
		return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
	}
	exports.parseSourceMapInput = parseSourceMapInput;
	/**
	* Compute the URL of a source given the the source root, the source's
	* URL, and the source map's URL.
	*/
	function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
		sourceURL = sourceURL || "";
		if (sourceRoot) {
			if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") sourceRoot += "/";
			sourceURL = sourceRoot + sourceURL;
		}
		if (sourceMapURL) {
			var parsed = urlParse(sourceMapURL);
			if (!parsed) throw new Error("sourceMapURL could not be parsed");
			if (parsed.path) {
				var index = parsed.path.lastIndexOf("/");
				if (index >= 0) parsed.path = parsed.path.substring(0, index + 1);
			}
			sourceURL = join(urlGenerate(parsed), sourceURL);
		}
		return normalize(sourceURL);
	}
	exports.computeSourceURL = computeSourceURL;
}));

//#endregion
//#region node_modules/.pnpm/source-map@0.6.1/node_modules/source-map/lib/array-set.js
var require_array_set = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util = require_util();
	var has = Object.prototype.hasOwnProperty;
	var hasNativeMap = typeof Map !== "undefined";
	/**
	* A data structure which is a combination of an array and a set. Adding a new
	* member is O(1), testing for membership is O(1), and finding the index of an
	* element is O(1). Removing elements from the set is not supported. Only
	* strings are supported for membership.
	*/
	function ArraySet() {
		this._array = [];
		this._set = hasNativeMap ? /* @__PURE__ */ new Map() : Object.create(null);
	}
	/**
	* Static method for creating ArraySet instances from an existing array.
	*/
	ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
		var set = new ArraySet();
		for (var i = 0, len = aArray.length; i < len; i++) set.add(aArray[i], aAllowDuplicates);
		return set;
	};
	/**
	* Return how many unique items are in this ArraySet. If duplicates have been
	* added, than those do not count towards the size.
	*
	* @returns Number
	*/
	ArraySet.prototype.size = function ArraySet_size() {
		return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
	};
	/**
	* Add the given string to this set.
	*
	* @param String aStr
	*/
	ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
		var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
		var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
		var idx = this._array.length;
		if (!isDuplicate || aAllowDuplicates) this._array.push(aStr);
		if (!isDuplicate) if (hasNativeMap) this._set.set(aStr, idx);
		else this._set[sStr] = idx;
	};
	/**
	* Is the given string a member of this set?
	*
	* @param String aStr
	*/
	ArraySet.prototype.has = function ArraySet_has(aStr) {
		if (hasNativeMap) return this._set.has(aStr);
		else {
			var sStr = util.toSetString(aStr);
			return has.call(this._set, sStr);
		}
	};
	/**
	* What is the index of the given string in the array?
	*
	* @param String aStr
	*/
	ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
		if (hasNativeMap) {
			var idx = this._set.get(aStr);
			if (idx >= 0) return idx;
		} else {
			var sStr = util.toSetString(aStr);
			if (has.call(this._set, sStr)) return this._set[sStr];
		}
		throw new Error("\"" + aStr + "\" is not in the set.");
	};
	/**
	* What is the element at the given index?
	*
	* @param Number aIdx
	*/
	ArraySet.prototype.at = function ArraySet_at(aIdx) {
		if (aIdx >= 0 && aIdx < this._array.length) return this._array[aIdx];
		throw new Error("No element indexed by " + aIdx);
	};
	/**
	* Returns the array representation of this set (which has the proper indices
	* indicated by indexOf). Note that this is a copy of the internal array used
	* for storing the members so that no one can mess with internal state.
	*/
	ArraySet.prototype.toArray = function ArraySet_toArray() {
		return this._array.slice();
	};
	exports.ArraySet = ArraySet;
}));

//#endregion
//#region node_modules/.pnpm/source-map@0.6.1/node_modules/source-map/lib/mapping-list.js
var require_mapping_list = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util = require_util();
	/**
	* Determine whether mappingB is after mappingA with respect to generated
	* position.
	*/
	function generatedPositionAfter(mappingA, mappingB) {
		var lineA = mappingA.generatedLine;
		var lineB = mappingB.generatedLine;
		var columnA = mappingA.generatedColumn;
		var columnB = mappingB.generatedColumn;
		return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
	}
	/**
	* A data structure to provide a sorted view of accumulated mappings in a
	* performance conscious manner. It trades a neglibable overhead in general
	* case for a large speedup in case of mappings being added in order.
	*/
	function MappingList() {
		this._array = [];
		this._sorted = true;
		this._last = {
			generatedLine: -1,
			generatedColumn: 0
		};
	}
	/**
	* Iterate through internal items. This method takes the same arguments that
	* `Array.prototype.forEach` takes.
	*
	* NOTE: The order of the mappings is NOT guaranteed.
	*/
	MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
		this._array.forEach(aCallback, aThisArg);
	};
	/**
	* Add the given source mapping.
	*
	* @param Object aMapping
	*/
	MappingList.prototype.add = function MappingList_add(aMapping) {
		if (generatedPositionAfter(this._last, aMapping)) {
			this._last = aMapping;
			this._array.push(aMapping);
		} else {
			this._sorted = false;
			this._array.push(aMapping);
		}
	};
	/**
	* Returns the flat, sorted array of mappings. The mappings are sorted by
	* generated position.
	*
	* WARNING: This method returns internal data without copying, for
	* performance. The return value must NOT be mutated, and should be treated as
	* an immutable borrow. If you want to take ownership, you must make your own
	* copy.
	*/
	MappingList.prototype.toArray = function MappingList_toArray() {
		if (!this._sorted) {
			this._array.sort(util.compareByGeneratedPositionsInflated);
			this._sorted = true;
		}
		return this._array;
	};
	exports.MappingList = MappingList;
}));

//#endregion
//#region node_modules/.pnpm/source-map@0.6.1/node_modules/source-map/lib/source-map-generator.js
var require_source_map_generator = /* @__PURE__ */ __commonJSMin(((exports) => {
	var base64VLQ = require_base64_vlq();
	var util = require_util();
	var ArraySet = require_array_set().ArraySet;
	var MappingList = require_mapping_list().MappingList;
	/**
	* An instance of the SourceMapGenerator represents a source map which is
	* being built incrementally. You may pass an object with the following
	* properties:
	*
	*   - file: The filename of the generated source.
	*   - sourceRoot: A root for all relative URLs in this source map.
	*/
	function SourceMapGenerator(aArgs) {
		if (!aArgs) aArgs = {};
		this._file = util.getArg(aArgs, "file", null);
		this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
		this._skipValidation = util.getArg(aArgs, "skipValidation", false);
		this._sources = new ArraySet();
		this._names = new ArraySet();
		this._mappings = new MappingList();
		this._sourcesContents = null;
	}
	SourceMapGenerator.prototype._version = 3;
	/**
	* Creates a new SourceMapGenerator based on a SourceMapConsumer
	*
	* @param aSourceMapConsumer The SourceMap.
	*/
	SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
		var sourceRoot = aSourceMapConsumer.sourceRoot;
		var generator = new SourceMapGenerator({
			file: aSourceMapConsumer.file,
			sourceRoot
		});
		aSourceMapConsumer.eachMapping(function(mapping) {
			var newMapping = { generated: {
				line: mapping.generatedLine,
				column: mapping.generatedColumn
			} };
			if (mapping.source != null) {
				newMapping.source = mapping.source;
				if (sourceRoot != null) newMapping.source = util.relative(sourceRoot, newMapping.source);
				newMapping.original = {
					line: mapping.originalLine,
					column: mapping.originalColumn
				};
				if (mapping.name != null) newMapping.name = mapping.name;
			}
			generator.addMapping(newMapping);
		});
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var sourceRelative = sourceFile;
			if (sourceRoot !== null) sourceRelative = util.relative(sourceRoot, sourceFile);
			if (!generator._sources.has(sourceRelative)) generator._sources.add(sourceRelative);
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) generator.setSourceContent(sourceFile, content);
		});
		return generator;
	};
	/**
	* Add a single mapping from original source line and column to the generated
	* source's line and column for this source map being created. The mapping
	* object should have the following properties:
	*
	*   - generated: An object with the generated line and column positions.
	*   - original: An object with the original line and column positions.
	*   - source: The original source file (relative to the sourceRoot).
	*   - name: An optional original token name for this mapping.
	*/
	SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
		var generated = util.getArg(aArgs, "generated");
		var original = util.getArg(aArgs, "original", null);
		var source = util.getArg(aArgs, "source", null);
		var name = util.getArg(aArgs, "name", null);
		if (!this._skipValidation) this._validateMapping(generated, original, source, name);
		if (source != null) {
			source = String(source);
			if (!this._sources.has(source)) this._sources.add(source);
		}
		if (name != null) {
			name = String(name);
			if (!this._names.has(name)) this._names.add(name);
		}
		this._mappings.add({
			generatedLine: generated.line,
			generatedColumn: generated.column,
			originalLine: original != null && original.line,
			originalColumn: original != null && original.column,
			source,
			name
		});
	};
	/**
	* Set the source content for a source file.
	*/
	SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
		var source = aSourceFile;
		if (this._sourceRoot != null) source = util.relative(this._sourceRoot, source);
		if (aSourceContent != null) {
			if (!this._sourcesContents) this._sourcesContents = Object.create(null);
			this._sourcesContents[util.toSetString(source)] = aSourceContent;
		} else if (this._sourcesContents) {
			delete this._sourcesContents[util.toSetString(source)];
			if (Object.keys(this._sourcesContents).length === 0) this._sourcesContents = null;
		}
	};
	/**
	* Applies the mappings of a sub-source-map for a specific source file to the
	* source map being generated. Each mapping to the supplied source file is
	* rewritten using the supplied source map. Note: The resolution for the
	* resulting mappings is the minimium of this map and the supplied map.
	*
	* @param aSourceMapConsumer The source map to be applied.
	* @param aSourceFile Optional. The filename of the source file.
	*        If omitted, SourceMapConsumer's file property will be used.
	* @param aSourceMapPath Optional. The dirname of the path to the source map
	*        to be applied. If relative, it is relative to the SourceMapConsumer.
	*        This parameter is needed when the two source maps aren't in the same
	*        directory, and the source map to be applied contains relative source
	*        paths. If so, those relative source paths need to be rewritten
	*        relative to the SourceMapGenerator.
	*/
	SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
		var sourceFile = aSourceFile;
		if (aSourceFile == null) {
			if (aSourceMapConsumer.file == null) throw new Error("SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's \"file\" property. Both were omitted.");
			sourceFile = aSourceMapConsumer.file;
		}
		var sourceRoot = this._sourceRoot;
		if (sourceRoot != null) sourceFile = util.relative(sourceRoot, sourceFile);
		var newSources = new ArraySet();
		var newNames = new ArraySet();
		this._mappings.unsortedForEach(function(mapping) {
			if (mapping.source === sourceFile && mapping.originalLine != null) {
				var original = aSourceMapConsumer.originalPositionFor({
					line: mapping.originalLine,
					column: mapping.originalColumn
				});
				if (original.source != null) {
					mapping.source = original.source;
					if (aSourceMapPath != null) mapping.source = util.join(aSourceMapPath, mapping.source);
					if (sourceRoot != null) mapping.source = util.relative(sourceRoot, mapping.source);
					mapping.originalLine = original.line;
					mapping.originalColumn = original.column;
					if (original.name != null) mapping.name = original.name;
				}
			}
			var source = mapping.source;
			if (source != null && !newSources.has(source)) newSources.add(source);
			var name = mapping.name;
			if (name != null && !newNames.has(name)) newNames.add(name);
		}, this);
		this._sources = newSources;
		this._names = newNames;
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
				if (aSourceMapPath != null) sourceFile = util.join(aSourceMapPath, sourceFile);
				if (sourceRoot != null) sourceFile = util.relative(sourceRoot, sourceFile);
				this.setSourceContent(sourceFile, content);
			}
		}, this);
	};
	/**
	* A mapping can have one of the three levels of data:
	*
	*   1. Just the generated position.
	*   2. The Generated position, original position, and original source.
	*   3. Generated and original position, original source, as well as a name
	*      token.
	*
	* To maintain consistency, we validate that any new mapping being added falls
	* in to one of these categories.
	*/
	SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
		if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
		if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) return;
		else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) return;
		else throw new Error("Invalid mapping: " + JSON.stringify({
			generated: aGenerated,
			source: aSource,
			original: aOriginal,
			name: aName
		}));
	};
	/**
	* Serialize the accumulated mappings in to the stream of base 64 VLQs
	* specified by the source map format.
	*/
	SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
		var previousGeneratedColumn = 0;
		var previousGeneratedLine = 1;
		var previousOriginalColumn = 0;
		var previousOriginalLine = 0;
		var previousName = 0;
		var previousSource = 0;
		var result = "";
		var next;
		var mapping;
		var nameIdx;
		var sourceIdx;
		var mappings = this._mappings.toArray();
		for (var i = 0, len = mappings.length; i < len; i++) {
			mapping = mappings[i];
			next = "";
			if (mapping.generatedLine !== previousGeneratedLine) {
				previousGeneratedColumn = 0;
				while (mapping.generatedLine !== previousGeneratedLine) {
					next += ";";
					previousGeneratedLine++;
				}
			} else if (i > 0) {
				if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) continue;
				next += ",";
			}
			next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
			previousGeneratedColumn = mapping.generatedColumn;
			if (mapping.source != null) {
				sourceIdx = this._sources.indexOf(mapping.source);
				next += base64VLQ.encode(sourceIdx - previousSource);
				previousSource = sourceIdx;
				next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
				previousOriginalLine = mapping.originalLine - 1;
				next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
				previousOriginalColumn = mapping.originalColumn;
				if (mapping.name != null) {
					nameIdx = this._names.indexOf(mapping.name);
					next += base64VLQ.encode(nameIdx - previousName);
					previousName = nameIdx;
				}
			}
			result += next;
		}
		return result;
	};
	SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
		return aSources.map(function(source) {
			if (!this._sourcesContents) return null;
			if (aSourceRoot != null) source = util.relative(aSourceRoot, source);
			var key = util.toSetString(source);
			return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
		}, this);
	};
	/**
	* Externalize the source map.
	*/
	SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
		var map = {
			version: this._version,
			sources: this._sources.toArray(),
			names: this._names.toArray(),
			mappings: this._serializeMappings()
		};
		if (this._file != null) map.file = this._file;
		if (this._sourceRoot != null) map.sourceRoot = this._sourceRoot;
		if (this._sourcesContents) map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
		return map;
	};
	/**
	* Render the source map being generated to a string.
	*/
	SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
		return JSON.stringify(this.toJSON());
	};
	exports.SourceMapGenerator = SourceMapGenerator;
}));

//#endregion
//#region node_modules/.pnpm/source-map@0.6.1/node_modules/source-map/lib/binary-search.js
var require_binary_search = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.GREATEST_LOWER_BOUND = 1;
	exports.LEAST_UPPER_BOUND = 2;
	/**
	* Recursive implementation of binary search.
	*
	* @param aLow Indices here and lower do not contain the needle.
	* @param aHigh Indices here and higher do not contain the needle.
	* @param aNeedle The element being searched for.
	* @param aHaystack The non-empty array being searched.
	* @param aCompare Function which takes two elements and returns -1, 0, or 1.
	* @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	*     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*/
	function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
		var mid = Math.floor((aHigh - aLow) / 2) + aLow;
		var cmp = aCompare(aNeedle, aHaystack[mid], true);
		if (cmp === 0) return mid;
		else if (cmp > 0) {
			if (aHigh - mid > 1) return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
			if (aBias == exports.LEAST_UPPER_BOUND) return aHigh < aHaystack.length ? aHigh : -1;
			else return mid;
		} else {
			if (mid - aLow > 1) return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
			if (aBias == exports.LEAST_UPPER_BOUND) return mid;
			else return aLow < 0 ? -1 : aLow;
		}
	}
	/**
	* This is an implementation of binary search which will always try and return
	* the index of the closest element if there is no exact hit. This is because
	* mappings between original and generated line/col pairs are single points,
	* and there is an implicit region between each of them, so a miss just means
	* that you aren't on the very start of a region.
	*
	* @param aNeedle The element you are looking for.
	* @param aHaystack The array that is being searched.
	* @param aCompare A function which takes the needle and an element in the
	*     array and returns -1, 0, or 1 depending on whether the needle is less
	*     than, equal to, or greater than the element, respectively.
	* @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	*     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
	*/
	exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
		if (aHaystack.length === 0) return -1;
		var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
		if (index < 0) return -1;
		while (index - 1 >= 0) {
			if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) break;
			--index;
		}
		return index;
	};
}));

//#endregion
//#region node_modules/.pnpm/source-map@0.6.1/node_modules/source-map/lib/quick-sort.js
var require_quick_sort = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Swap the elements indexed by `x` and `y` in the array `ary`.
	*
	* @param {Array} ary
	*        The array.
	* @param {Number} x
	*        The index of the first item.
	* @param {Number} y
	*        The index of the second item.
	*/
	function swap(ary, x, y) {
		var temp = ary[x];
		ary[x] = ary[y];
		ary[y] = temp;
	}
	/**
	* Returns a random integer within the range `low .. high` inclusive.
	*
	* @param {Number} low
	*        The lower bound on the range.
	* @param {Number} high
	*        The upper bound on the range.
	*/
	function randomIntInRange(low, high) {
		return Math.round(low + Math.random() * (high - low));
	}
	/**
	* The Quick Sort algorithm.
	*
	* @param {Array} ary
	*        An array to sort.
	* @param {function} comparator
	*        Function to use to compare two items.
	* @param {Number} p
	*        Start index of the array
	* @param {Number} r
	*        End index of the array
	*/
	function doQuickSort(ary, comparator, p, r) {
		if (p < r) {
			var pivotIndex = randomIntInRange(p, r);
			var i = p - 1;
			swap(ary, pivotIndex, r);
			var pivot = ary[r];
			for (var j = p; j < r; j++) if (comparator(ary[j], pivot) <= 0) {
				i += 1;
				swap(ary, i, j);
			}
			swap(ary, i + 1, j);
			var q = i + 1;
			doQuickSort(ary, comparator, p, q - 1);
			doQuickSort(ary, comparator, q + 1, r);
		}
	}
	/**
	* Sort the given array in-place with the given comparator function.
	*
	* @param {Array} ary
	*        An array to sort.
	* @param {function} comparator
	*        Function to use to compare two items.
	*/
	exports.quickSort = function(ary, comparator) {
		doQuickSort(ary, comparator, 0, ary.length - 1);
	};
}));

//#endregion
//#region node_modules/.pnpm/source-map@0.6.1/node_modules/source-map/lib/source-map-consumer.js
var require_source_map_consumer = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util = require_util();
	var binarySearch = require_binary_search();
	var ArraySet = require_array_set().ArraySet;
	var base64VLQ = require_base64_vlq();
	var quickSort = require_quick_sort().quickSort;
	function SourceMapConsumer(aSourceMap, aSourceMapURL) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === "string") sourceMap = util.parseSourceMapInput(aSourceMap);
		return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
	}
	SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
		return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
	};
	/**
	* The version of the source mapping spec that we are consuming.
	*/
	SourceMapConsumer.prototype._version = 3;
	SourceMapConsumer.prototype.__generatedMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
		configurable: true,
		enumerable: true,
		get: function() {
			if (!this.__generatedMappings) this._parseMappings(this._mappings, this.sourceRoot);
			return this.__generatedMappings;
		}
	});
	SourceMapConsumer.prototype.__originalMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
		configurable: true,
		enumerable: true,
		get: function() {
			if (!this.__originalMappings) this._parseMappings(this._mappings, this.sourceRoot);
			return this.__originalMappings;
		}
	});
	SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
		var c = aStr.charAt(index);
		return c === ";" || c === ",";
	};
	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		throw new Error("Subclasses must implement _parseMappings");
	};
	SourceMapConsumer.GENERATED_ORDER = 1;
	SourceMapConsumer.ORIGINAL_ORDER = 2;
	SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
	SourceMapConsumer.LEAST_UPPER_BOUND = 2;
	/**
	* Iterate over each mapping between an original source/line/column and a
	* generated line/column in this source map.
	*
	* @param Function aCallback
	*        The function that is called with each mapping.
	* @param Object aContext
	*        Optional. If specified, this object will be the value of `this` every
	*        time that `aCallback` is called.
	* @param aOrder
	*        Either `SourceMapConsumer.GENERATED_ORDER` or
	*        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
	*        iterate over the mappings sorted by the generated file's line/column
	*        order or the original's source/line/column order, respectively. Defaults to
	*        `SourceMapConsumer.GENERATED_ORDER`.
	*/
	SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
		var context = aContext || null;
		var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
		var mappings;
		switch (order) {
			case SourceMapConsumer.GENERATED_ORDER:
				mappings = this._generatedMappings;
				break;
			case SourceMapConsumer.ORIGINAL_ORDER:
				mappings = this._originalMappings;
				break;
			default: throw new Error("Unknown order of iteration.");
		}
		var sourceRoot = this.sourceRoot;
		mappings.map(function(mapping) {
			var source = mapping.source === null ? null : this._sources.at(mapping.source);
			source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
			return {
				source,
				generatedLine: mapping.generatedLine,
				generatedColumn: mapping.generatedColumn,
				originalLine: mapping.originalLine,
				originalColumn: mapping.originalColumn,
				name: mapping.name === null ? null : this._names.at(mapping.name)
			};
		}, this).forEach(aCallback, context);
	};
	/**
	* Returns all generated line and column information for the original source,
	* line, and column provided. If no column is provided, returns all mappings
	* corresponding to a either the line we are searching for or the next
	* closest line that has any mappings. Otherwise, returns all mappings
	* corresponding to the given line and either the column we are searching for
	* or the next closest column that has any offsets.
	*
	* The only argument is an object with the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.  The line number is 1-based.
	*   - column: Optional. the column number in the original source.
	*    The column number is 0-based.
	*
	* and an array of objects is returned, each with the following properties:
	*
	*   - line: The line number in the generated source, or null.  The
	*    line number is 1-based.
	*   - column: The column number in the generated source, or null.
	*    The column number is 0-based.
	*/
	SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
		var line = util.getArg(aArgs, "line");
		var needle = {
			source: util.getArg(aArgs, "source"),
			originalLine: line,
			originalColumn: util.getArg(aArgs, "column", 0)
		};
		needle.source = this._findSourceIndex(needle.source);
		if (needle.source < 0) return [];
		var mappings = [];
		var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);
		if (index >= 0) {
			var mapping = this._originalMappings[index];
			if (aArgs.column === void 0) {
				var originalLine = mapping.originalLine;
				while (mapping && mapping.originalLine === originalLine) {
					mappings.push({
						line: util.getArg(mapping, "generatedLine", null),
						column: util.getArg(mapping, "generatedColumn", null),
						lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
					});
					mapping = this._originalMappings[++index];
				}
			} else {
				var originalColumn = mapping.originalColumn;
				while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
					mappings.push({
						line: util.getArg(mapping, "generatedLine", null),
						column: util.getArg(mapping, "generatedColumn", null),
						lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
					});
					mapping = this._originalMappings[++index];
				}
			}
		}
		return mappings;
	};
	exports.SourceMapConsumer = SourceMapConsumer;
	/**
	* A BasicSourceMapConsumer instance represents a parsed source map which we can
	* query for information about the original file positions by giving it a file
	* position in the generated source.
	*
	* The first parameter is the raw source map (either as a JSON string, or
	* already parsed to an object). According to the spec, source maps have the
	* following attributes:
	*
	*   - version: Which version of the source map spec this map is following.
	*   - sources: An array of URLs to the original source files.
	*   - names: An array of identifiers which can be referrenced by individual mappings.
	*   - sourceRoot: Optional. The URL root from which all sources are relative.
	*   - sourcesContent: Optional. An array of contents of the original source files.
	*   - mappings: A string of base64 VLQs which contain the actual mappings.
	*   - file: Optional. The generated file this source map is associated with.
	*
	* Here is an example source map, taken from the source map spec[0]:
	*
	*     {
	*       version : 3,
	*       file: "out.js",
	*       sourceRoot : "",
	*       sources: ["foo.js", "bar.js"],
	*       names: ["src", "maps", "are", "fun"],
	*       mappings: "AA,AB;;ABCDE;"
	*     }
	*
	* The second parameter, if given, is a string whose value is the URL
	* at which the source map was found.  This URL is used to compute the
	* sources array.
	*
	* [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
	*/
	function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === "string") sourceMap = util.parseSourceMapInput(aSourceMap);
		var version = util.getArg(sourceMap, "version");
		var sources = util.getArg(sourceMap, "sources");
		var names = util.getArg(sourceMap, "names", []);
		var sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
		var sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
		var mappings = util.getArg(sourceMap, "mappings");
		var file = util.getArg(sourceMap, "file", null);
		if (version != this._version) throw new Error("Unsupported version: " + version);
		if (sourceRoot) sourceRoot = util.normalize(sourceRoot);
		sources = sources.map(String).map(util.normalize).map(function(source) {
			return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
		});
		this._names = ArraySet.fromArray(names.map(String), true);
		this._sources = ArraySet.fromArray(sources, true);
		this._absoluteSources = this._sources.toArray().map(function(s) {
			return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
		});
		this.sourceRoot = sourceRoot;
		this.sourcesContent = sourcesContent;
		this._mappings = mappings;
		this._sourceMapURL = aSourceMapURL;
		this.file = file;
	}
	BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
	/**
	* Utility function to find the index of a source.  Returns -1 if not
	* found.
	*/
	BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
		var relativeSource = aSource;
		if (this.sourceRoot != null) relativeSource = util.relative(this.sourceRoot, relativeSource);
		if (this._sources.has(relativeSource)) return this._sources.indexOf(relativeSource);
		var i;
		for (i = 0; i < this._absoluteSources.length; ++i) if (this._absoluteSources[i] == aSource) return i;
		return -1;
	};
	/**
	* Create a BasicSourceMapConsumer from a SourceMapGenerator.
	*
	* @param SourceMapGenerator aSourceMap
	*        The source map that will be consumed.
	* @param String aSourceMapURL
	*        The URL at which the source map can be found (optional)
	* @returns BasicSourceMapConsumer
	*/
	BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
		var smc = Object.create(BasicSourceMapConsumer.prototype);
		var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
		var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
		smc.sourceRoot = aSourceMap._sourceRoot;
		smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
		smc.file = aSourceMap._file;
		smc._sourceMapURL = aSourceMapURL;
		smc._absoluteSources = smc._sources.toArray().map(function(s) {
			return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
		});
		var generatedMappings = aSourceMap._mappings.toArray().slice();
		var destGeneratedMappings = smc.__generatedMappings = [];
		var destOriginalMappings = smc.__originalMappings = [];
		for (var i = 0, length = generatedMappings.length; i < length; i++) {
			var srcMapping = generatedMappings[i];
			var destMapping = new Mapping();
			destMapping.generatedLine = srcMapping.generatedLine;
			destMapping.generatedColumn = srcMapping.generatedColumn;
			if (srcMapping.source) {
				destMapping.source = sources.indexOf(srcMapping.source);
				destMapping.originalLine = srcMapping.originalLine;
				destMapping.originalColumn = srcMapping.originalColumn;
				if (srcMapping.name) destMapping.name = names.indexOf(srcMapping.name);
				destOriginalMappings.push(destMapping);
			}
			destGeneratedMappings.push(destMapping);
		}
		quickSort(smc.__originalMappings, util.compareByOriginalPositions);
		return smc;
	};
	/**
	* The version of the source mapping spec that we are consuming.
	*/
	BasicSourceMapConsumer.prototype._version = 3;
	/**
	* The list of original sources.
	*/
	Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", { get: function() {
		return this._absoluteSources.slice();
	} });
	/**
	* Provide the JIT with a nice shape / hidden class.
	*/
	function Mapping() {
		this.generatedLine = 0;
		this.generatedColumn = 0;
		this.source = null;
		this.originalLine = null;
		this.originalColumn = null;
		this.name = null;
	}
	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		var generatedLine = 1;
		var previousGeneratedColumn = 0;
		var previousOriginalLine = 0;
		var previousOriginalColumn = 0;
		var previousSource = 0;
		var previousName = 0;
		var length = aStr.length;
		var index = 0;
		var cachedSegments = {};
		var temp = {};
		var originalMappings = [];
		var generatedMappings = [];
		var mapping, str, segment, end, value;
		while (index < length) if (aStr.charAt(index) === ";") {
			generatedLine++;
			index++;
			previousGeneratedColumn = 0;
		} else if (aStr.charAt(index) === ",") index++;
		else {
			mapping = new Mapping();
			mapping.generatedLine = generatedLine;
			for (end = index; end < length; end++) if (this._charIsMappingSeparator(aStr, end)) break;
			str = aStr.slice(index, end);
			segment = cachedSegments[str];
			if (segment) index += str.length;
			else {
				segment = [];
				while (index < end) {
					base64VLQ.decode(aStr, index, temp);
					value = temp.value;
					index = temp.rest;
					segment.push(value);
				}
				if (segment.length === 2) throw new Error("Found a source, but no line and column");
				if (segment.length === 3) throw new Error("Found a source and line, but no column");
				cachedSegments[str] = segment;
			}
			mapping.generatedColumn = previousGeneratedColumn + segment[0];
			previousGeneratedColumn = mapping.generatedColumn;
			if (segment.length > 1) {
				mapping.source = previousSource + segment[1];
				previousSource += segment[1];
				mapping.originalLine = previousOriginalLine + segment[2];
				previousOriginalLine = mapping.originalLine;
				mapping.originalLine += 1;
				mapping.originalColumn = previousOriginalColumn + segment[3];
				previousOriginalColumn = mapping.originalColumn;
				if (segment.length > 4) {
					mapping.name = previousName + segment[4];
					previousName += segment[4];
				}
			}
			generatedMappings.push(mapping);
			if (typeof mapping.originalLine === "number") originalMappings.push(mapping);
		}
		quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
		this.__generatedMappings = generatedMappings;
		quickSort(originalMappings, util.compareByOriginalPositions);
		this.__originalMappings = originalMappings;
	};
	/**
	* Find the mapping that best matches the hypothetical "needle" mapping that
	* we are searching for in the given "haystack" of mappings.
	*/
	BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
		if (aNeedle[aLineName] <= 0) throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
		if (aNeedle[aColumnName] < 0) throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
		return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
	};
	/**
	* Compute the last column for each generated mapping. The last column is
	* inclusive.
	*/
	BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
		for (var index = 0; index < this._generatedMappings.length; ++index) {
			var mapping = this._generatedMappings[index];
			if (index + 1 < this._generatedMappings.length) {
				var nextMapping = this._generatedMappings[index + 1];
				if (mapping.generatedLine === nextMapping.generatedLine) {
					mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
					continue;
				}
			}
			mapping.lastGeneratedColumn = Infinity;
		}
	};
	/**
	* Returns the original source, line, and column information for the generated
	* source's line and column positions provided. The only argument is an object
	* with the following properties:
	*
	*   - line: The line number in the generated source.  The line number
	*     is 1-based.
	*   - column: The column number in the generated source.  The column
	*     number is 0-based.
	*   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	*     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	*
	* and an object is returned with the following properties:
	*
	*   - source: The original source file, or null.
	*   - line: The line number in the original source, or null.  The
	*     line number is 1-based.
	*   - column: The column number in the original source, or null.  The
	*     column number is 0-based.
	*   - name: The original identifier, or null.
	*/
	BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util.getArg(aArgs, "line"),
			generatedColumn: util.getArg(aArgs, "column")
		};
		var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositionsDeflated, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
		if (index >= 0) {
			var mapping = this._generatedMappings[index];
			if (mapping.generatedLine === needle.generatedLine) {
				var source = util.getArg(mapping, "source", null);
				if (source !== null) {
					source = this._sources.at(source);
					source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
				}
				var name = util.getArg(mapping, "name", null);
				if (name !== null) name = this._names.at(name);
				return {
					source,
					line: util.getArg(mapping, "originalLine", null),
					column: util.getArg(mapping, "originalColumn", null),
					name
				};
			}
		}
		return {
			source: null,
			line: null,
			column: null,
			name: null
		};
	};
	/**
	* Return true if we have the source content for every source in the source
	* map, false otherwise.
	*/
	BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
		if (!this.sourcesContent) return false;
		return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
			return sc == null;
		});
	};
	/**
	* Returns the original source content. The only argument is the url of the
	* original source file. Returns null if no original source content is
	* available.
	*/
	BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		if (!this.sourcesContent) return null;
		var index = this._findSourceIndex(aSource);
		if (index >= 0) return this.sourcesContent[index];
		var relativeSource = aSource;
		if (this.sourceRoot != null) relativeSource = util.relative(this.sourceRoot, relativeSource);
		var url;
		if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
			var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
			if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
			if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
		}
		if (nullOnMissing) return null;
		else throw new Error("\"" + relativeSource + "\" is not in the SourceMap.");
	};
	/**
	* Returns the generated line and column information for the original source,
	* line, and column positions provided. The only argument is an object with
	* the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.  The line number
	*     is 1-based.
	*   - column: The column number in the original source.  The column
	*     number is 0-based.
	*   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	*     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	*
	* and an object is returned with the following properties:
	*
	*   - line: The line number in the generated source, or null.  The
	*     line number is 1-based.
	*   - column: The column number in the generated source, or null.
	*     The column number is 0-based.
	*/
	BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
		var source = util.getArg(aArgs, "source");
		source = this._findSourceIndex(source);
		if (source < 0) return {
			line: null,
			column: null,
			lastColumn: null
		};
		var needle = {
			source,
			originalLine: util.getArg(aArgs, "line"),
			originalColumn: util.getArg(aArgs, "column")
		};
		var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
		if (index >= 0) {
			var mapping = this._originalMappings[index];
			if (mapping.source === needle.source) return {
				line: util.getArg(mapping, "generatedLine", null),
				column: util.getArg(mapping, "generatedColumn", null),
				lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
			};
		}
		return {
			line: null,
			column: null,
			lastColumn: null
		};
	};
	exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
	/**
	* An IndexedSourceMapConsumer instance represents a parsed source map which
	* we can query for information. It differs from BasicSourceMapConsumer in
	* that it takes "indexed" source maps (i.e. ones with a "sections" field) as
	* input.
	*
	* The first parameter is a raw source map (either as a JSON string, or already
	* parsed to an object). According to the spec for indexed source maps, they
	* have the following attributes:
	*
	*   - version: Which version of the source map spec this map is following.
	*   - file: Optional. The generated file this source map is associated with.
	*   - sections: A list of section definitions.
	*
	* Each value under the "sections" field has two fields:
	*   - offset: The offset into the original specified at which this section
	*       begins to apply, defined as an object with a "line" and "column"
	*       field.
	*   - map: A source map definition. This source map could also be indexed,
	*       but doesn't have to be.
	*
	* Instead of the "map" field, it's also possible to have a "url" field
	* specifying a URL to retrieve a source map from, but that's currently
	* unsupported.
	*
	* Here's an example source map, taken from the source map spec[0], but
	* modified to omit a section which uses the "url" field.
	*
	*  {
	*    version : 3,
	*    file: "app.js",
	*    sections: [{
	*      offset: {line:100, column:10},
	*      map: {
	*        version : 3,
	*        file: "section.js",
	*        sources: ["foo.js", "bar.js"],
	*        names: ["src", "maps", "are", "fun"],
	*        mappings: "AAAA,E;;ABCDE;"
	*      }
	*    }],
	*  }
	*
	* The second parameter, if given, is a string whose value is the URL
	* at which the source map was found.  This URL is used to compute the
	* sources array.
	*
	* [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
	*/
	function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === "string") sourceMap = util.parseSourceMapInput(aSourceMap);
		var version = util.getArg(sourceMap, "version");
		var sections = util.getArg(sourceMap, "sections");
		if (version != this._version) throw new Error("Unsupported version: " + version);
		this._sources = new ArraySet();
		this._names = new ArraySet();
		var lastOffset = {
			line: -1,
			column: 0
		};
		this._sections = sections.map(function(s) {
			if (s.url) throw new Error("Support for url field in sections not implemented.");
			var offset = util.getArg(s, "offset");
			var offsetLine = util.getArg(offset, "line");
			var offsetColumn = util.getArg(offset, "column");
			if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) throw new Error("Section offsets must be ordered and non-overlapping.");
			lastOffset = offset;
			return {
				generatedOffset: {
					generatedLine: offsetLine + 1,
					generatedColumn: offsetColumn + 1
				},
				consumer: new SourceMapConsumer(util.getArg(s, "map"), aSourceMapURL)
			};
		});
	}
	IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
	/**
	* The version of the source mapping spec that we are consuming.
	*/
	IndexedSourceMapConsumer.prototype._version = 3;
	/**
	* The list of original sources.
	*/
	Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", { get: function() {
		var sources = [];
		for (var i = 0; i < this._sections.length; i++) for (var j = 0; j < this._sections[i].consumer.sources.length; j++) sources.push(this._sections[i].consumer.sources[j]);
		return sources;
	} });
	/**
	* Returns the original source, line, and column information for the generated
	* source's line and column positions provided. The only argument is an object
	* with the following properties:
	*
	*   - line: The line number in the generated source.  The line number
	*     is 1-based.
	*   - column: The column number in the generated source.  The column
	*     number is 0-based.
	*
	* and an object is returned with the following properties:
	*
	*   - source: The original source file, or null.
	*   - line: The line number in the original source, or null.  The
	*     line number is 1-based.
	*   - column: The column number in the original source, or null.  The
	*     column number is 0-based.
	*   - name: The original identifier, or null.
	*/
	IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util.getArg(aArgs, "line"),
			generatedColumn: util.getArg(aArgs, "column")
		};
		var sectionIndex = binarySearch.search(needle, this._sections, function(needle, section) {
			var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
			if (cmp) return cmp;
			return needle.generatedColumn - section.generatedOffset.generatedColumn;
		});
		var section = this._sections[sectionIndex];
		if (!section) return {
			source: null,
			line: null,
			column: null,
			name: null
		};
		return section.consumer.originalPositionFor({
			line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
			column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
			bias: aArgs.bias
		});
	};
	/**
	* Return true if we have the source content for every source in the source
	* map, false otherwise.
	*/
	IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
		return this._sections.every(function(s) {
			return s.consumer.hasContentsOfAllSources();
		});
	};
	/**
	* Returns the original source content. The only argument is the url of the
	* original source file. Returns null if no original source content is
	* available.
	*/
	IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		for (var i = 0; i < this._sections.length; i++) {
			var content = this._sections[i].consumer.sourceContentFor(aSource, true);
			if (content) return content;
		}
		if (nullOnMissing) return null;
		else throw new Error("\"" + aSource + "\" is not in the SourceMap.");
	};
	/**
	* Returns the generated line and column information for the original source,
	* line, and column positions provided. The only argument is an object with
	* the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.  The line number
	*     is 1-based.
	*   - column: The column number in the original source.  The column
	*     number is 0-based.
	*
	* and an object is returned with the following properties:
	*
	*   - line: The line number in the generated source, or null.  The
	*     line number is 1-based. 
	*   - column: The column number in the generated source, or null.
	*     The column number is 0-based.
	*/
	IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];
			if (section.consumer._findSourceIndex(util.getArg(aArgs, "source")) === -1) continue;
			var generatedPosition = section.consumer.generatedPositionFor(aArgs);
			if (generatedPosition) return {
				line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
				column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
			};
		}
		return {
			line: null,
			column: null
		};
	};
	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		this.__generatedMappings = [];
		this.__originalMappings = [];
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];
			var sectionMappings = section.consumer._generatedMappings;
			for (var j = 0; j < sectionMappings.length; j++) {
				var mapping = sectionMappings[j];
				var source = section.consumer._sources.at(mapping.source);
				source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
				this._sources.add(source);
				source = this._sources.indexOf(source);
				var name = null;
				if (mapping.name) {
					name = section.consumer._names.at(mapping.name);
					this._names.add(name);
					name = this._names.indexOf(name);
				}
				var adjustedMapping = {
					source,
					generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
					generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
					originalLine: mapping.originalLine,
					originalColumn: mapping.originalColumn,
					name
				};
				this.__generatedMappings.push(adjustedMapping);
				if (typeof adjustedMapping.originalLine === "number") this.__originalMappings.push(adjustedMapping);
			}
		}
		quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
		quickSort(this.__originalMappings, util.compareByOriginalPositions);
	};
	exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
}));

//#endregion
//#region node_modules/.pnpm/source-map@0.6.1/node_modules/source-map/lib/source-node.js
var require_source_node = /* @__PURE__ */ __commonJSMin(((exports) => {
	var SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
	var util = require_util();
	var REGEX_NEWLINE = /(\r?\n)/;
	var NEWLINE_CODE = 10;
	var isSourceNode = "$$$isSourceNode$$$";
	/**
	* SourceNodes provide a way to abstract over interpolating/concatenating
	* snippets of generated JavaScript source code while maintaining the line and
	* column information associated with the original source code.
	*
	* @param aLine The original line number.
	* @param aColumn The original column number.
	* @param aSource The original source's filename.
	* @param aChunks Optional. An array of strings which are snippets of
	*        generated JS, or other SourceNodes.
	* @param aName The original identifier.
	*/
	function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
		this.children = [];
		this.sourceContents = {};
		this.line = aLine == null ? null : aLine;
		this.column = aColumn == null ? null : aColumn;
		this.source = aSource == null ? null : aSource;
		this.name = aName == null ? null : aName;
		this[isSourceNode] = true;
		if (aChunks != null) this.add(aChunks);
	}
	/**
	* Creates a SourceNode from generated code and a SourceMapConsumer.
	*
	* @param aGeneratedCode The generated code
	* @param aSourceMapConsumer The SourceMap for the generated code
	* @param aRelativePath Optional. The path that relative sources in the
	*        SourceMapConsumer should be relative to.
	*/
	SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
		var node = new SourceNode();
		var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
		var remainingLinesIndex = 0;
		var shiftNextLine = function() {
			return getNextLine() + (getNextLine() || "");
			function getNextLine() {
				return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
			}
		};
		var lastGeneratedLine = 1, lastGeneratedColumn = 0;
		var lastMapping = null;
		aSourceMapConsumer.eachMapping(function(mapping) {
			if (lastMapping !== null) if (lastGeneratedLine < mapping.generatedLine) {
				addMappingWithCode(lastMapping, shiftNextLine());
				lastGeneratedLine++;
				lastGeneratedColumn = 0;
			} else {
				var nextLine = remainingLines[remainingLinesIndex] || "";
				var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
				remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
				lastGeneratedColumn = mapping.generatedColumn;
				addMappingWithCode(lastMapping, code);
				lastMapping = mapping;
				return;
			}
			while (lastGeneratedLine < mapping.generatedLine) {
				node.add(shiftNextLine());
				lastGeneratedLine++;
			}
			if (lastGeneratedColumn < mapping.generatedColumn) {
				var nextLine = remainingLines[remainingLinesIndex] || "";
				node.add(nextLine.substr(0, mapping.generatedColumn));
				remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
				lastGeneratedColumn = mapping.generatedColumn;
			}
			lastMapping = mapping;
		}, this);
		if (remainingLinesIndex < remainingLines.length) {
			if (lastMapping) addMappingWithCode(lastMapping, shiftNextLine());
			node.add(remainingLines.splice(remainingLinesIndex).join(""));
		}
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
				if (aRelativePath != null) sourceFile = util.join(aRelativePath, sourceFile);
				node.setSourceContent(sourceFile, content);
			}
		});
		return node;
		function addMappingWithCode(mapping, code) {
			if (mapping === null || mapping.source === void 0) node.add(code);
			else {
				var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
				node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
			}
		}
	};
	/**
	* Add a chunk of generated JS to this source node.
	*
	* @param aChunk A string snippet of generated JS code, another instance of
	*        SourceNode, or an array where each member is one of those things.
	*/
	SourceNode.prototype.add = function SourceNode_add(aChunk) {
		if (Array.isArray(aChunk)) aChunk.forEach(function(chunk) {
			this.add(chunk);
		}, this);
		else if (aChunk[isSourceNode] || typeof aChunk === "string") {
			if (aChunk) this.children.push(aChunk);
		} else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
		return this;
	};
	/**
	* Add a chunk of generated JS to the beginning of this source node.
	*
	* @param aChunk A string snippet of generated JS code, another instance of
	*        SourceNode, or an array where each member is one of those things.
	*/
	SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
		if (Array.isArray(aChunk)) for (var i = aChunk.length - 1; i >= 0; i--) this.prepend(aChunk[i]);
		else if (aChunk[isSourceNode] || typeof aChunk === "string") this.children.unshift(aChunk);
		else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
		return this;
	};
	/**
	* Walk over the tree of JS snippets in this node and its children. The
	* walking function is called once for each snippet of JS and is passed that
	* snippet and the its original associated source's line/column location.
	*
	* @param aFn The traversal function.
	*/
	SourceNode.prototype.walk = function SourceNode_walk(aFn) {
		var chunk;
		for (var i = 0, len = this.children.length; i < len; i++) {
			chunk = this.children[i];
			if (chunk[isSourceNode]) chunk.walk(aFn);
			else if (chunk !== "") aFn(chunk, {
				source: this.source,
				line: this.line,
				column: this.column,
				name: this.name
			});
		}
	};
	/**
	* Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
	* each of `this.children`.
	*
	* @param aSep The separator.
	*/
	SourceNode.prototype.join = function SourceNode_join(aSep) {
		var newChildren;
		var i;
		var len = this.children.length;
		if (len > 0) {
			newChildren = [];
			for (i = 0; i < len - 1; i++) {
				newChildren.push(this.children[i]);
				newChildren.push(aSep);
			}
			newChildren.push(this.children[i]);
			this.children = newChildren;
		}
		return this;
	};
	/**
	* Call String.prototype.replace on the very right-most source snippet. Useful
	* for trimming whitespace from the end of a source node, etc.
	*
	* @param aPattern The pattern to replace.
	* @param aReplacement The thing to replace the pattern with.
	*/
	SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
		var lastChild = this.children[this.children.length - 1];
		if (lastChild[isSourceNode]) lastChild.replaceRight(aPattern, aReplacement);
		else if (typeof lastChild === "string") this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
		else this.children.push("".replace(aPattern, aReplacement));
		return this;
	};
	/**
	* Set the source content for a source file. This will be added to the SourceMapGenerator
	* in the sourcesContent field.
	*
	* @param aSourceFile The filename of the source file
	* @param aSourceContent The content of the source file
	*/
	SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
		this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
	};
	/**
	* Walk over the tree of SourceNodes. The walking function is called for each
	* source file content and is passed the filename and source content.
	*
	* @param aFn The traversal function.
	*/
	SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
		for (var i = 0, len = this.children.length; i < len; i++) if (this.children[i][isSourceNode]) this.children[i].walkSourceContents(aFn);
		var sources = Object.keys(this.sourceContents);
		for (var i = 0, len = sources.length; i < len; i++) aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
	};
	/**
	* Return the string representation of this source node. Walks over the tree
	* and concatenates all the various snippets together to one string.
	*/
	SourceNode.prototype.toString = function SourceNode_toString() {
		var str = "";
		this.walk(function(chunk) {
			str += chunk;
		});
		return str;
	};
	/**
	* Returns the string representation of this source node along with a source
	* map.
	*/
	SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
		var generated = {
			code: "",
			line: 1,
			column: 0
		};
		var map = new SourceMapGenerator(aArgs);
		var sourceMappingActive = false;
		var lastOriginalSource = null;
		var lastOriginalLine = null;
		var lastOriginalColumn = null;
		var lastOriginalName = null;
		this.walk(function(chunk, original) {
			generated.code += chunk;
			if (original.source !== null && original.line !== null && original.column !== null) {
				if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) map.addMapping({
					source: original.source,
					original: {
						line: original.line,
						column: original.column
					},
					generated: {
						line: generated.line,
						column: generated.column
					},
					name: original.name
				});
				lastOriginalSource = original.source;
				lastOriginalLine = original.line;
				lastOriginalColumn = original.column;
				lastOriginalName = original.name;
				sourceMappingActive = true;
			} else if (sourceMappingActive) {
				map.addMapping({ generated: {
					line: generated.line,
					column: generated.column
				} });
				lastOriginalSource = null;
				sourceMappingActive = false;
			}
			for (var idx = 0, length = chunk.length; idx < length; idx++) if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
				generated.line++;
				generated.column = 0;
				if (idx + 1 === length) {
					lastOriginalSource = null;
					sourceMappingActive = false;
				} else if (sourceMappingActive) map.addMapping({
					source: original.source,
					original: {
						line: original.line,
						column: original.column
					},
					generated: {
						line: generated.line,
						column: generated.column
					},
					name: original.name
				});
			} else generated.column++;
		});
		this.walkSourceContents(function(sourceFile, sourceContent) {
			map.setSourceContent(sourceFile, sourceContent);
		});
		return {
			code: generated.code,
			map
		};
	};
	exports.SourceNode = SourceNode;
}));

//#endregion
//#region node_modules/.pnpm/source-map@0.6.1/node_modules/source-map/source-map.js
var require_source_map = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
	exports.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
	exports.SourceNode = require_source_node().SourceNode;
}));

//#endregion
//#region node_modules/.pnpm/merge-source-map@1.1.0/node_modules/merge-source-map/index.js
var require_merge_source_map = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var sourceMap = require_source_map();
	var SourceMapConsumer = sourceMap.SourceMapConsumer;
	var SourceMapGenerator = sourceMap.SourceMapGenerator;
	module.exports = merge;
	/**
	* Merge old source map and new source map and return merged.
	* If old or new source map value is falsy, return another one as it is.
	*
	* @param {object|string} [oldMap] old source map object
	* @param {object|string} [newmap] new source map object
	* @return {object|undefined} merged source map object, or undefined when both old and new source map are undefined
	*/
	function merge(oldMap, newMap) {
		if (!oldMap) return newMap;
		if (!newMap) return oldMap;
		var oldMapConsumer = new SourceMapConsumer(oldMap);
		var newMapConsumer = new SourceMapConsumer(newMap);
		var mergedMapGenerator = new SourceMapGenerator();
		newMapConsumer.eachMapping(function(m) {
			if (m.originalLine == null) return;
			var origPosInOldMap = oldMapConsumer.originalPositionFor({
				line: m.originalLine,
				column: m.originalColumn
			});
			if (origPosInOldMap.source == null) return;
			mergedMapGenerator.addMapping({
				original: {
					line: origPosInOldMap.line,
					column: origPosInOldMap.column
				},
				generated: {
					line: m.generatedLine,
					column: m.generatedColumn
				},
				source: origPosInOldMap.source,
				name: origPosInOldMap.name
			});
		});
		[oldMapConsumer, newMapConsumer].forEach(function(consumer) {
			consumer.sources.forEach(function(sourceFile) {
				mergedMapGenerator._sources.add(sourceFile);
				var sourceContent = consumer.sourceContentFor(sourceFile);
				if (sourceContent != null) mergedMapGenerator.setSourceContent(sourceFile, sourceContent);
			});
		});
		mergedMapGenerator._sourceRoot = oldMap.sourceRoot;
		mergedMapGenerator._file = oldMap.file;
		return JSON.parse(mergedMapGenerator.toString());
	}
}));

//#endregion
//#region packages/compiler-sfc/src/style/preprocessors.ts
var import_merge_source_map = /* @__PURE__ */ __toESM(require_merge_source_map());
const scss = (source, map, options, load = require) => {
	const { compileString, renderSync } = load("sass");
	const data = getSource(source, options.filename, options.additionalData);
	let css;
	let dependencies;
	let sourceMap;
	try {
		if (compileString) {
			const { pathToFileURL, fileURLToPath } = load("url");
			const result = compileString(data, {
				...options,
				url: pathToFileURL(options.filename),
				sourceMap: !!map
			});
			css = result.css;
			dependencies = result.loadedUrls.map((url) => fileURLToPath(url));
			sourceMap = map ? result.sourceMap : void 0;
		} else {
			const result = renderSync({
				...options,
				data,
				file: options.filename,
				outFile: options.filename,
				sourceMap: !!map
			});
			css = result.css.toString();
			dependencies = result.stats.includedFiles;
			sourceMap = map ? JSON.parse(result.map.toString()) : void 0;
		}
		if (map) return {
			code: css,
			errors: [],
			dependencies,
			map: (0, import_merge_source_map.default)(map, sourceMap)
		};
		return {
			code: css,
			errors: [],
			dependencies
		};
	} catch (e) {
		return {
			code: "",
			errors: [e],
			dependencies: []
		};
	}
};
const sass = (source, map, options, load) => scss(source, map, {
	...options,
	indentedSyntax: true
}, load);
const less = (source, map, options, load = require) => {
	const nodeLess = load("less");
	let result;
	let error = null;
	nodeLess.render(getSource(source, options.filename, options.additionalData), {
		...options,
		syncImport: true
	}, (err, output) => {
		error = err;
		result = output;
	});
	if (error) return {
		code: "",
		errors: [error],
		dependencies: []
	};
	const dependencies = result.imports;
	if (map) return {
		code: result.css.toString(),
		map: (0, import_merge_source_map.default)(map, result.map),
		errors: [],
		dependencies
	};
	return {
		code: result.css.toString(),
		errors: [],
		dependencies
	};
};
const styl = (source, map, options, load = require) => {
	const nodeStylus = load("stylus");
	try {
		const ref = nodeStylus(source, options);
		if (map) ref.set("sourcemap", {
			inline: false,
			comment: false
		});
		const result = ref.render();
		const dependencies = ref.deps();
		if (map) return {
			code: result,
			map: (0, import_merge_source_map.default)(map, ref.sourcemap),
			errors: [],
			dependencies
		};
		return {
			code: result,
			errors: [],
			dependencies
		};
	} catch (e) {
		return {
			code: "",
			errors: [e],
			dependencies: []
		};
	}
};
function getSource(source, filename, additionalData) {
	if (!additionalData) return source;
	if ((0, _vue_shared.isFunction)(additionalData)) return additionalData(source, filename);
	return additionalData + source;
}
const processors = {
	less,
	sass,
	scss,
	styl,
	stylus: styl
};

//#endregion
//#region node_modules/.pnpm/postcss-modules@6.0.1_postcss@8.5.6/node_modules/postcss-modules/build/fs.js
var require_fs = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getFileSystem = getFileSystem;
	exports.setFileSystem = setFileSystem;
	let fileSystem = {
		readFile: () => {
			throw Error("readFile not implemented");
		},
		writeFile: () => {
			throw Error("writeFile not implemented");
		}
	};
	function setFileSystem(fs) {
		fileSystem.readFile = fs.readFile;
		fileSystem.writeFile = fs.writeFile;
	}
	function getFileSystem() {
		return fileSystem;
	}
}));

//#endregion
//#region node_modules/.pnpm/postcss-modules@6.0.1_postcss@8.5.6/node_modules/postcss-modules/build/unquote.js
var require_unquote = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = unquote;
	const reg = /['"]/;
	function unquote(str) {
		if (!str) return "";
		if (reg.test(str.charAt(0))) str = str.substr(1);
		if (reg.test(str.charAt(str.length - 1))) str = str.substr(0, str.length - 1);
		return str;
	}
}));

//#endregion
//#region node_modules/.pnpm/icss-utils@5.1.0_postcss@8.5.6/node_modules/icss-utils/src/replaceValueSymbols.js
var require_replaceValueSymbols = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const matchValueName = /[$]?[\w-]+/g;
	const replaceValueSymbols = (value, replacements) => {
		let matches;
		while (matches = matchValueName.exec(value)) {
			const replacement = replacements[matches[0]];
			if (replacement) {
				value = value.slice(0, matches.index) + replacement + value.slice(matchValueName.lastIndex);
				matchValueName.lastIndex -= matches[0].length - replacement.length;
			}
		}
		return value;
	};
	module.exports = replaceValueSymbols;
}));

//#endregion
//#region node_modules/.pnpm/icss-utils@5.1.0_postcss@8.5.6/node_modules/icss-utils/src/replaceSymbols.js
var require_replaceSymbols = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const replaceValueSymbols = require_replaceValueSymbols();
	const replaceSymbols = (css, replacements) => {
		css.walk((node) => {
			if (node.type === "decl" && node.value) node.value = replaceValueSymbols(node.value.toString(), replacements);
			else if (node.type === "rule" && node.selector) node.selector = replaceValueSymbols(node.selector.toString(), replacements);
			else if (node.type === "atrule" && node.params) node.params = replaceValueSymbols(node.params.toString(), replacements);
		});
	};
	module.exports = replaceSymbols;
}));

//#endregion
//#region node_modules/.pnpm/icss-utils@5.1.0_postcss@8.5.6/node_modules/icss-utils/src/extractICSS.js
var require_extractICSS = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const importPattern = /^:import\(("[^"]*"|'[^']*'|[^"']+)\)$/;
	const balancedQuotes = /^("[^"]*"|'[^']*'|[^"']+)$/;
	const getDeclsObject = (rule) => {
		const object = {};
		rule.walkDecls((decl) => {
			const before = decl.raws.before ? decl.raws.before.trim() : "";
			object[before + decl.prop] = decl.value;
		});
		return object;
	};
	/**
	*
	* @param {string} css
	* @param {boolean} removeRules
	* @param {'auto' | 'rule' | 'at-rule'} mode
	*/
	const extractICSS = (css, removeRules = true, mode = "auto") => {
		const icssImports = {};
		const icssExports = {};
		function addImports(node, path) {
			const unquoted = path.replace(/'|"/g, "");
			icssImports[unquoted] = Object.assign(icssImports[unquoted] || {}, getDeclsObject(node));
			if (removeRules) node.remove();
		}
		function addExports(node) {
			Object.assign(icssExports, getDeclsObject(node));
			if (removeRules) node.remove();
		}
		css.each((node) => {
			if (node.type === "rule" && mode !== "at-rule") {
				if (node.selector.slice(0, 7) === ":import") {
					const matches = importPattern.exec(node.selector);
					if (matches) addImports(node, matches[1]);
				}
				if (node.selector === ":export") addExports(node);
			}
			if (node.type === "atrule" && mode !== "rule") {
				if (node.name === "icss-import") {
					const matches = balancedQuotes.exec(node.params);
					if (matches) addImports(node, matches[1]);
				}
				if (node.name === "icss-export") addExports(node);
			}
		});
		return {
			icssImports,
			icssExports
		};
	};
	module.exports = extractICSS;
}));

//#endregion
//#region node_modules/.pnpm/icss-utils@5.1.0_postcss@8.5.6/node_modules/icss-utils/src/createICSSRules.js
var require_createICSSRules = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const createImports = (imports, postcss, mode = "rule") => {
		return Object.keys(imports).map((path) => {
			const aliases = imports[path];
			const declarations = Object.keys(aliases).map((key) => postcss.decl({
				prop: key,
				value: aliases[key],
				raws: { before: "\n  " }
			}));
			const hasDeclarations = declarations.length > 0;
			const rule = mode === "rule" ? postcss.rule({
				selector: `:import('${path}')`,
				raws: { after: hasDeclarations ? "\n" : "" }
			}) : postcss.atRule({
				name: "icss-import",
				params: `'${path}'`,
				raws: { after: hasDeclarations ? "\n" : "" }
			});
			if (hasDeclarations) rule.append(declarations);
			return rule;
		});
	};
	const createExports = (exports$7, postcss, mode = "rule") => {
		const declarations = Object.keys(exports$7).map((key) => postcss.decl({
			prop: key,
			value: exports$7[key],
			raws: { before: "\n  " }
		}));
		if (declarations.length === 0) return [];
		const rule = mode === "rule" ? postcss.rule({
			selector: `:export`,
			raws: { after: "\n" }
		}) : postcss.atRule({
			name: "icss-export",
			raws: { after: "\n" }
		});
		rule.append(declarations);
		return [rule];
	};
	const createICSSRules = (imports, exports$8, postcss, mode) => [...createImports(imports, postcss, mode), ...createExports(exports$8, postcss, mode)];
	module.exports = createICSSRules;
}));

//#endregion
//#region node_modules/.pnpm/icss-utils@5.1.0_postcss@8.5.6/node_modules/icss-utils/src/index.js
var require_src$4 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const replaceValueSymbols = require_replaceValueSymbols();
	const replaceSymbols = require_replaceSymbols();
	const extractICSS = require_extractICSS();
	const createICSSRules = require_createICSSRules();
	module.exports = {
		replaceValueSymbols,
		replaceSymbols,
		extractICSS,
		createICSSRules
	};
}));

//#endregion
//#region node_modules/.pnpm/postcss-modules@6.0.1_postcss@8.5.6/node_modules/postcss-modules/build/Parser.js
var require_Parser = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _icssUtils = require_src$4();
	const importRegexp = /^:import\((.+)\)$/;
	var Parser = class {
		constructor(pathFetcher, trace) {
			this.pathFetcher = pathFetcher;
			this.plugin = this.plugin.bind(this);
			this.exportTokens = {};
			this.translations = {};
			this.trace = trace;
		}
		plugin() {
			const parser = this;
			return {
				postcssPlugin: "css-modules-parser",
				async OnceExit(css) {
					await Promise.all(parser.fetchAllImports(css));
					parser.linkImportedSymbols(css);
					return parser.extractExports(css);
				}
			};
		}
		fetchAllImports(css) {
			let imports = [];
			css.each((node) => {
				if (node.type == "rule" && node.selector.match(importRegexp)) imports.push(this.fetchImport(node, css.source.input.from, imports.length));
			});
			return imports;
		}
		linkImportedSymbols(css) {
			(0, _icssUtils.replaceSymbols)(css, this.translations);
		}
		extractExports(css) {
			css.each((node) => {
				if (node.type == "rule" && node.selector == ":export") this.handleExport(node);
			});
		}
		handleExport(exportNode) {
			exportNode.each((decl) => {
				if (decl.type == "decl") {
					Object.keys(this.translations).forEach((translation) => {
						decl.value = decl.value.replace(translation, this.translations[translation]);
					});
					this.exportTokens[decl.prop] = decl.value;
				}
			});
			exportNode.remove();
		}
		async fetchImport(importNode, relativeTo, depNr) {
			const file = importNode.selector.match(importRegexp)[1];
			const depTrace = this.trace + String.fromCharCode(depNr);
			const exports$6 = await this.pathFetcher(file, relativeTo, depTrace);
			try {
				importNode.each((decl) => {
					if (decl.type == "decl") this.translations[decl.prop] = exports$6[decl.value];
				});
				importNode.remove();
			} catch (err) {
				console.log(err);
			}
		}
	};
	exports.default = Parser;
}));

//#endregion
//#region node_modules/.pnpm/postcss-modules@6.0.1_postcss@8.5.6/node_modules/postcss-modules/build/saveJSON.js
var require_saveJSON = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = saveJSON;
	var _fs = require_fs();
	function saveJSON(cssFile, json) {
		return new Promise((resolve, reject) => {
			const { writeFile } = (0, _fs.getFileSystem)();
			writeFile(`${cssFile}.json`, JSON.stringify(json), (e) => e ? reject(e) : resolve(json));
		});
	}
}));

//#endregion
//#region node_modules/.pnpm/lodash.camelcase@4.3.0/node_modules/lodash.camelcase/index.js
var require_lodash_camelcase = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* lodash (Custom Build) <https://lodash.com/>
	* Build: `lodash modularize exports="npm" -o ./`
	* Copyright jQuery Foundation and other contributors <https://jquery.org/>
	* Released under MIT license <https://lodash.com/license>
	* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	*/
	/** Used as references for various `Number` constants. */
	var INFINITY = Infinity;
	/** `Object#toString` result references. */
	var symbolTag = "[object Symbol]";
	/** Used to match words composed of alphanumeric characters. */
	var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
	/** Used to match Latin Unicode letters (excluding mathematical operators). */
	var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
	/** Used to compose unicode character classes. */
	var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23", rsComboSymbolsRange = "\\u20d0-\\u20f0", rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
	/** Used to compose unicode capture groups. */
	var rsApos = "['’]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboMarksRange + rsComboSymbolsRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
	/** Used to compose unicode regexes. */
	var rsLowerMisc = "(?:" + rsLower + "|" + rsMisc + ")", rsUpperMisc = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptLowerContr = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptUpperContr = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [
		rsNonAstral,
		rsRegional,
		rsSurrPair
	].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [
		rsDingbat,
		rsRegional,
		rsSurrPair
	].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [
		rsNonAstral + rsCombo + "?",
		rsCombo,
		rsRegional,
		rsSurrPair,
		rsAstral
	].join("|") + ")";
	/** Used to match apostrophes. */
	var reApos = RegExp(rsApos, "g");
	/**
	* Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
	* [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
	*/
	var reComboMark = RegExp(rsCombo, "g");
	/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
	var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
	/** Used to match complex or compound words. */
	var reUnicodeWord = RegExp([
		rsUpper + "?" + rsLower + "+" + rsOptLowerContr + "(?=" + [
			rsBreak,
			rsUpper,
			"$"
		].join("|") + ")",
		rsUpperMisc + "+" + rsOptUpperContr + "(?=" + [
			rsBreak,
			rsUpper + rsLowerMisc,
			"$"
		].join("|") + ")",
		rsUpper + "?" + rsLowerMisc + "+" + rsOptLowerContr,
		rsUpper + "+" + rsOptUpperContr,
		rsDigits,
		rsEmoji
	].join("|"), "g");
	/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
	var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + "]");
	/** Used to detect strings that need a more robust regexp to match words. */
	var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
	/** Used to map Latin Unicode letters to basic Latin letters. */
	var deburredLetters = {
		"À": "A",
		"Á": "A",
		"Â": "A",
		"Ã": "A",
		"Ä": "A",
		"Å": "A",
		"à": "a",
		"á": "a",
		"â": "a",
		"ã": "a",
		"ä": "a",
		"å": "a",
		"Ç": "C",
		"ç": "c",
		"Ð": "D",
		"ð": "d",
		"È": "E",
		"É": "E",
		"Ê": "E",
		"Ë": "E",
		"è": "e",
		"é": "e",
		"ê": "e",
		"ë": "e",
		"Ì": "I",
		"Í": "I",
		"Î": "I",
		"Ï": "I",
		"ì": "i",
		"í": "i",
		"î": "i",
		"ï": "i",
		"Ñ": "N",
		"ñ": "n",
		"Ò": "O",
		"Ó": "O",
		"Ô": "O",
		"Õ": "O",
		"Ö": "O",
		"Ø": "O",
		"ò": "o",
		"ó": "o",
		"ô": "o",
		"õ": "o",
		"ö": "o",
		"ø": "o",
		"Ù": "U",
		"Ú": "U",
		"Û": "U",
		"Ü": "U",
		"ù": "u",
		"ú": "u",
		"û": "u",
		"ü": "u",
		"Ý": "Y",
		"ý": "y",
		"ÿ": "y",
		"Æ": "Ae",
		"æ": "ae",
		"Þ": "Th",
		"þ": "th",
		"ß": "ss",
		"Ā": "A",
		"Ă": "A",
		"Ą": "A",
		"ā": "a",
		"ă": "a",
		"ą": "a",
		"Ć": "C",
		"Ĉ": "C",
		"Ċ": "C",
		"Č": "C",
		"ć": "c",
		"ĉ": "c",
		"ċ": "c",
		"č": "c",
		"Ď": "D",
		"Đ": "D",
		"ď": "d",
		"đ": "d",
		"Ē": "E",
		"Ĕ": "E",
		"Ė": "E",
		"Ę": "E",
		"Ě": "E",
		"ē": "e",
		"ĕ": "e",
		"ė": "e",
		"ę": "e",
		"ě": "e",
		"Ĝ": "G",
		"Ğ": "G",
		"Ġ": "G",
		"Ģ": "G",
		"ĝ": "g",
		"ğ": "g",
		"ġ": "g",
		"ģ": "g",
		"Ĥ": "H",
		"Ħ": "H",
		"ĥ": "h",
		"ħ": "h",
		"Ĩ": "I",
		"Ī": "I",
		"Ĭ": "I",
		"Į": "I",
		"İ": "I",
		"ĩ": "i",
		"ī": "i",
		"ĭ": "i",
		"į": "i",
		"ı": "i",
		"Ĵ": "J",
		"ĵ": "j",
		"Ķ": "K",
		"ķ": "k",
		"ĸ": "k",
		"Ĺ": "L",
		"Ļ": "L",
		"Ľ": "L",
		"Ŀ": "L",
		"Ł": "L",
		"ĺ": "l",
		"ļ": "l",
		"ľ": "l",
		"ŀ": "l",
		"ł": "l",
		"Ń": "N",
		"Ņ": "N",
		"Ň": "N",
		"Ŋ": "N",
		"ń": "n",
		"ņ": "n",
		"ň": "n",
		"ŋ": "n",
		"Ō": "O",
		"Ŏ": "O",
		"Ő": "O",
		"ō": "o",
		"ŏ": "o",
		"ő": "o",
		"Ŕ": "R",
		"Ŗ": "R",
		"Ř": "R",
		"ŕ": "r",
		"ŗ": "r",
		"ř": "r",
		"Ś": "S",
		"Ŝ": "S",
		"Ş": "S",
		"Š": "S",
		"ś": "s",
		"ŝ": "s",
		"ş": "s",
		"š": "s",
		"Ţ": "T",
		"Ť": "T",
		"Ŧ": "T",
		"ţ": "t",
		"ť": "t",
		"ŧ": "t",
		"Ũ": "U",
		"Ū": "U",
		"Ŭ": "U",
		"Ů": "U",
		"Ű": "U",
		"Ų": "U",
		"ũ": "u",
		"ū": "u",
		"ŭ": "u",
		"ů": "u",
		"ű": "u",
		"ų": "u",
		"Ŵ": "W",
		"ŵ": "w",
		"Ŷ": "Y",
		"ŷ": "y",
		"Ÿ": "Y",
		"Ź": "Z",
		"Ż": "Z",
		"Ž": "Z",
		"ź": "z",
		"ż": "z",
		"ž": "z",
		"Ĳ": "IJ",
		"ĳ": "ij",
		"Œ": "Oe",
		"œ": "oe",
		"ŉ": "'n",
		"ſ": "ss"
	};
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
	/** Detect free variable `self`. */
	var freeSelf = typeof self == "object" && self && self.Object === Object && self;
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function("return this")();
	/**
	* A specialized version of `_.reduce` for arrays without support for
	* iteratee shorthands.
	*
	* @private
	* @param {Array} [array] The array to iterate over.
	* @param {Function} iteratee The function invoked per iteration.
	* @param {*} [accumulator] The initial value.
	* @param {boolean} [initAccum] Specify using the first element of `array` as
	*  the initial value.
	* @returns {*} Returns the accumulated value.
	*/
	function arrayReduce(array, iteratee, accumulator, initAccum) {
		var index = -1, length = array ? array.length : 0;
		if (initAccum && length) accumulator = array[++index];
		while (++index < length) accumulator = iteratee(accumulator, array[index], index, array);
		return accumulator;
	}
	/**
	* Converts an ASCII `string` to an array.
	*
	* @private
	* @param {string} string The string to convert.
	* @returns {Array} Returns the converted array.
	*/
	function asciiToArray(string) {
		return string.split("");
	}
	/**
	* Splits an ASCII `string` into an array of its words.
	*
	* @private
	* @param {string} The string to inspect.
	* @returns {Array} Returns the words of `string`.
	*/
	function asciiWords(string) {
		return string.match(reAsciiWord) || [];
	}
	/**
	* The base implementation of `_.propertyOf` without support for deep paths.
	*
	* @private
	* @param {Object} object The object to query.
	* @returns {Function} Returns the new accessor function.
	*/
	function basePropertyOf(object) {
		return function(key) {
			return object == null ? void 0 : object[key];
		};
	}
	/**
	* Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
	* letters to basic Latin letters.
	*
	* @private
	* @param {string} letter The matched letter to deburr.
	* @returns {string} Returns the deburred letter.
	*/
	var deburrLetter = basePropertyOf(deburredLetters);
	/**
	* Checks if `string` contains Unicode symbols.
	*
	* @private
	* @param {string} string The string to inspect.
	* @returns {boolean} Returns `true` if a symbol is found, else `false`.
	*/
	function hasUnicode(string) {
		return reHasUnicode.test(string);
	}
	/**
	* Checks if `string` contains a word composed of Unicode symbols.
	*
	* @private
	* @param {string} string The string to inspect.
	* @returns {boolean} Returns `true` if a word is found, else `false`.
	*/
	function hasUnicodeWord(string) {
		return reHasUnicodeWord.test(string);
	}
	/**
	* Converts `string` to an array.
	*
	* @private
	* @param {string} string The string to convert.
	* @returns {Array} Returns the converted array.
	*/
	function stringToArray(string) {
		return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
	}
	/**
	* Converts a Unicode `string` to an array.
	*
	* @private
	* @param {string} string The string to convert.
	* @returns {Array} Returns the converted array.
	*/
	function unicodeToArray(string) {
		return string.match(reUnicode) || [];
	}
	/**
	* Splits a Unicode `string` into an array of its words.
	*
	* @private
	* @param {string} The string to inspect.
	* @returns {Array} Returns the words of `string`.
	*/
	function unicodeWords(string) {
		return string.match(reUnicodeWord) || [];
	}
	/**
	* Used to resolve the
	* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	* of values.
	*/
	var objectToString = Object.prototype.toString;
	/** Built-in value references. */
	var Symbol = root.Symbol;
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
	/**
	* The base implementation of `_.slice` without an iteratee call guard.
	*
	* @private
	* @param {Array} array The array to slice.
	* @param {number} [start=0] The start position.
	* @param {number} [end=array.length] The end position.
	* @returns {Array} Returns the slice of `array`.
	*/
	function baseSlice(array, start, end) {
		var index = -1, length = array.length;
		if (start < 0) start = -start > length ? 0 : length + start;
		end = end > length ? length : end;
		if (end < 0) end += length;
		length = start > end ? 0 : end - start >>> 0;
		start >>>= 0;
		var result = Array(length);
		while (++index < length) result[index] = array[index + start];
		return result;
	}
	/**
	* The base implementation of `_.toString` which doesn't convert nullish
	* values to empty strings.
	*
	* @private
	* @param {*} value The value to process.
	* @returns {string} Returns the string.
	*/
	function baseToString(value) {
		if (typeof value == "string") return value;
		if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
		var result = value + "";
		return result == "0" && 1 / value == -INFINITY ? "-0" : result;
	}
	/**
	* Casts `array` to a slice if it's needed.
	*
	* @private
	* @param {Array} array The array to inspect.
	* @param {number} start The start position.
	* @param {number} [end=array.length] The end position.
	* @returns {Array} Returns the cast slice.
	*/
	function castSlice(array, start, end) {
		var length = array.length;
		end = end === void 0 ? length : end;
		return !start && end >= length ? array : baseSlice(array, start, end);
	}
	/**
	* Creates a function like `_.lowerFirst`.
	*
	* @private
	* @param {string} methodName The name of the `String` case method to use.
	* @returns {Function} Returns the new case function.
	*/
	function createCaseFirst(methodName) {
		return function(string) {
			string = toString(string);
			var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
			var chr = strSymbols ? strSymbols[0] : string.charAt(0);
			var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
			return chr[methodName]() + trailing;
		};
	}
	/**
	* Creates a function like `_.camelCase`.
	*
	* @private
	* @param {Function} callback The function to combine each word.
	* @returns {Function} Returns the new compounder function.
	*/
	function createCompounder(callback) {
		return function(string) {
			return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
		};
	}
	/**
	* Checks if `value` is object-like. A value is object-like if it's not `null`
	* and has a `typeof` result of "object".
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	* @example
	*
	* _.isObjectLike({});
	* // => true
	*
	* _.isObjectLike([1, 2, 3]);
	* // => true
	*
	* _.isObjectLike(_.noop);
	* // => false
	*
	* _.isObjectLike(null);
	* // => false
	*/
	function isObjectLike(value) {
		return !!value && typeof value == "object";
	}
	/**
	* Checks if `value` is classified as a `Symbol` primitive or object.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	* @example
	*
	* _.isSymbol(Symbol.iterator);
	* // => true
	*
	* _.isSymbol('abc');
	* // => false
	*/
	function isSymbol(value) {
		return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
	}
	/**
	* Converts `value` to a string. An empty string is returned for `null`
	* and `undefined` values. The sign of `-0` is preserved.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to process.
	* @returns {string} Returns the string.
	* @example
	*
	* _.toString(null);
	* // => ''
	*
	* _.toString(-0);
	* // => '-0'
	*
	* _.toString([1, 2, 3]);
	* // => '1,2,3'
	*/
	function toString(value) {
		return value == null ? "" : baseToString(value);
	}
	/**
	* Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
	*
	* @static
	* @memberOf _
	* @since 3.0.0
	* @category String
	* @param {string} [string=''] The string to convert.
	* @returns {string} Returns the camel cased string.
	* @example
	*
	* _.camelCase('Foo Bar');
	* // => 'fooBar'
	*
	* _.camelCase('--foo-bar--');
	* // => 'fooBar'
	*
	* _.camelCase('__FOO_BAR__');
	* // => 'fooBar'
	*/
	var camelCase = createCompounder(function(result, word, index) {
		word = word.toLowerCase();
		return result + (index ? capitalize(word) : word);
	});
	/**
	* Converts the first character of `string` to upper case and the remaining
	* to lower case.
	*
	* @static
	* @memberOf _
	* @since 3.0.0
	* @category String
	* @param {string} [string=''] The string to capitalize.
	* @returns {string} Returns the capitalized string.
	* @example
	*
	* _.capitalize('FRED');
	* // => 'Fred'
	*/
	function capitalize(string) {
		return upperFirst(toString(string).toLowerCase());
	}
	/**
	* Deburrs `string` by converting
	* [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	* and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
	* letters to basic Latin letters and removing
	* [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	*
	* @static
	* @memberOf _
	* @since 3.0.0
	* @category String
	* @param {string} [string=''] The string to deburr.
	* @returns {string} Returns the deburred string.
	* @example
	*
	* _.deburr('déjà vu');
	* // => 'deja vu'
	*/
	function deburr(string) {
		string = toString(string);
		return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
	}
	/**
	* Converts the first character of `string` to upper case.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category String
	* @param {string} [string=''] The string to convert.
	* @returns {string} Returns the converted string.
	* @example
	*
	* _.upperFirst('fred');
	* // => 'Fred'
	*
	* _.upperFirst('FRED');
	* // => 'FRED'
	*/
	var upperFirst = createCaseFirst("toUpperCase");
	/**
	* Splits `string` into an array of its words.
	*
	* @static
	* @memberOf _
	* @since 3.0.0
	* @category String
	* @param {string} [string=''] The string to inspect.
	* @param {RegExp|string} [pattern] The pattern to match words.
	* @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	* @returns {Array} Returns the words of `string`.
	* @example
	*
	* _.words('fred, barney, & pebbles');
	* // => ['fred', 'barney', 'pebbles']
	*
	* _.words('fred, barney, & pebbles', /[^, ]+/g);
	* // => ['fred', 'barney', '&', 'pebbles']
	*/
	function words(string, pattern, guard) {
		string = toString(string);
		pattern = guard ? void 0 : pattern;
		if (pattern === void 0) return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
		return string.match(pattern) || [];
	}
	module.exports = camelCase;
}));

//#endregion
//#region node_modules/.pnpm/postcss-modules@6.0.1_postcss@8.5.6/node_modules/postcss-modules/build/localsConvention.js
var require_localsConvention = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.makeLocalsConventionReducer = makeLocalsConventionReducer;
	var _lodash = _interopRequireDefault(require_lodash_camelcase());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function dashesCamelCase(string) {
		return string.replace(/-+(\w)/g, (_, firstLetter) => firstLetter.toUpperCase());
	}
	function makeLocalsConventionReducer(localsConvention, inputFile) {
		const isFunc = typeof localsConvention === "function";
		return (tokens, [className, value]) => {
			if (isFunc) {
				const convention = localsConvention(className, value, inputFile);
				tokens[convention] = value;
				return tokens;
			}
			switch (localsConvention) {
				case "camelCase":
					tokens[className] = value;
					tokens[(0, _lodash.default)(className)] = value;
					break;
				case "camelCaseOnly":
					tokens[(0, _lodash.default)(className)] = value;
					break;
				case "dashes":
					tokens[className] = value;
					tokens[dashesCamelCase(className)] = value;
					break;
				case "dashesOnly":
					tokens[dashesCamelCase(className)] = value;
					break;
			}
			return tokens;
		};
	}
}));

//#endregion
//#region node_modules/.pnpm/postcss-modules@6.0.1_postcss@8.5.6/node_modules/postcss-modules/build/FileSystemLoader.js
var require_FileSystemLoader = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _postcss$1 = _interopRequireDefault(require("postcss"));
	var _path = _interopRequireDefault(require("path"));
	var _Parser = _interopRequireDefault(require_Parser());
	var _fs = require_fs();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	var Core = class Core {
		constructor(plugins) {
			this.plugins = plugins || Core.defaultPlugins;
		}
		async load(sourceString, sourcePath, trace, pathFetcher) {
			const parser = new _Parser.default(pathFetcher, trace);
			const plugins = this.plugins.concat([parser.plugin()]);
			return {
				injectableSource: (await (0, _postcss$1.default)(plugins).process(sourceString, { from: sourcePath })).css,
				exportTokens: parser.exportTokens
			};
		}
	};
	const traceKeySorter = (a, b) => {
		if (a.length < b.length) return a < b.substring(0, a.length) ? -1 : 1;
		if (a.length > b.length) return a.substring(0, b.length) <= b ? -1 : 1;
		return a < b ? -1 : 1;
	};
	var FileSystemLoader = class {
		constructor(root, plugins, fileResolve) {
			if (root === "/" && process.platform === "win32") {
				const cwdDrive = process.cwd().slice(0, 3);
				if (!/^[A-Za-z]:\\$/.test(cwdDrive)) throw new Error(`Failed to obtain root from "${process.cwd()}".`);
				root = cwdDrive;
			}
			this.root = root;
			this.fileResolve = fileResolve;
			this.sources = {};
			this.traces = {};
			this.importNr = 0;
			this.core = new Core(plugins);
			this.tokensByFile = {};
			this.fs = (0, _fs.getFileSystem)();
		}
		async fetch(_newPath, relativeTo, _trace) {
			const newPath = _newPath.replace(/^["']|["']$/g, "");
			const trace = _trace || String.fromCharCode(this.importNr++);
			const useFileResolve = typeof this.fileResolve === "function";
			const fileResolvedPath = useFileResolve ? await this.fileResolve(newPath, relativeTo) : await Promise.resolve();
			if (fileResolvedPath && !_path.default.isAbsolute(fileResolvedPath)) throw new Error("The returned path from the \"fileResolve\" option must be absolute.");
			const relativeDir = _path.default.dirname(relativeTo);
			const rootRelativePath = fileResolvedPath || _path.default.resolve(relativeDir, newPath);
			let fileRelativePath = fileResolvedPath || _path.default.resolve(_path.default.resolve(this.root, relativeDir), newPath);
			if (!useFileResolve && newPath[0] !== "." && !_path.default.isAbsolute(newPath)) try {
				fileRelativePath = require.resolve(newPath);
			} catch (e) {}
			const tokens = this.tokensByFile[fileRelativePath];
			if (tokens) return tokens;
			return new Promise((resolve, reject) => {
				this.fs.readFile(fileRelativePath, "utf-8", async (err, source) => {
					if (err) reject(err);
					const { injectableSource, exportTokens } = await this.core.load(source, rootRelativePath, trace, this.fetch.bind(this));
					this.sources[fileRelativePath] = injectableSource;
					this.traces[trace] = fileRelativePath;
					this.tokensByFile[fileRelativePath] = exportTokens;
					resolve(exportTokens);
				});
			});
		}
		get finalSource() {
			const traces = this.traces;
			const sources = this.sources;
			let written = /* @__PURE__ */ new Set();
			return Object.keys(traces).sort(traceKeySorter).map((key) => {
				const filename = traces[key];
				if (written.has(filename)) return null;
				written.add(filename);
				return sources[filename];
			}).join("");
		}
	};
	exports.default = FileSystemLoader;
}));

//#endregion
//#region node_modules/.pnpm/postcss-modules-extract-imports@3.1.0_postcss@8.5.6/node_modules/postcss-modules-extract-imports/src/topologicalSort.js
var require_topologicalSort = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const PERMANENT_MARKER = 2;
	const TEMPORARY_MARKER = 1;
	function createError(node, graph) {
		const er = /* @__PURE__ */ new Error("Nondeterministic import's order");
		er.nodes = [node, graph[node].find((relatedNode) => graph[relatedNode].indexOf(node) > -1)];
		return er;
	}
	function walkGraph(node, graph, state, result, strict) {
		if (state[node] === PERMANENT_MARKER) return;
		if (state[node] === TEMPORARY_MARKER) {
			if (strict) return createError(node, graph);
			return;
		}
		state[node] = TEMPORARY_MARKER;
		const children = graph[node];
		const length = children.length;
		for (let i = 0; i < length; ++i) {
			const error = walkGraph(children[i], graph, state, result, strict);
			if (error instanceof Error) return error;
		}
		state[node] = PERMANENT_MARKER;
		result.push(node);
	}
	function topologicalSort(graph, strict) {
		const result = [];
		const state = {};
		const nodes = Object.keys(graph);
		const length = nodes.length;
		for (let i = 0; i < length; ++i) {
			const er = walkGraph(nodes[i], graph, state, result, strict);
			if (er instanceof Error) return er;
		}
		return result;
	}
	module.exports = topologicalSort;
}));

//#endregion
//#region node_modules/.pnpm/postcss-modules-extract-imports@3.1.0_postcss@8.5.6/node_modules/postcss-modules-extract-imports/src/index.js
var require_src$3 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const topologicalSort = require_topologicalSort();
	const matchImports = /^(.+?)\s+from\s+(?:"([^"]+)"|'([^']+)'|(global))$/;
	const icssImport = /^:import\((?:"([^"]+)"|'([^']+)')\)/;
	const VISITED_MARKER = 1;
	/**
	* :import('G') {}
	*
	* Rule
	*   composes: ... from 'A'
	*   composes: ... from 'B'
	
	* Rule
	*   composes: ... from 'A'
	*   composes: ... from 'A'
	*   composes: ... from 'C'
	*
	* Results in:
	*
	* graph: {
	*   G: [],
	*   A: [],
	*   B: ['A'],
	*   C: ['A'],
	* }
	*/
	function addImportToGraph(importId, parentId, graph, visited) {
		const siblingsId = parentId + "_siblings";
		const visitedId = parentId + "_" + importId;
		if (visited[visitedId] !== VISITED_MARKER) {
			if (!Array.isArray(visited[siblingsId])) visited[siblingsId] = [];
			const siblings = visited[siblingsId];
			if (Array.isArray(graph[importId])) graph[importId] = graph[importId].concat(siblings);
			else graph[importId] = siblings.slice();
			visited[visitedId] = VISITED_MARKER;
			siblings.push(importId);
		}
	}
	module.exports = (options = {}) => {
		let importIndex = 0;
		const createImportedName = typeof options.createImportedName !== "function" ? (importName) => `i__imported_${importName.replace(/\W/g, "_")}_${importIndex++}` : options.createImportedName;
		const failOnWrongOrder = options.failOnWrongOrder;
		return {
			postcssPlugin: "postcss-modules-extract-imports",
			prepare() {
				const graph = {};
				const visited = {};
				const existingImports = {};
				const importDecls = {};
				const imports = {};
				return { Once(root, postcss) {
					root.walkRules((rule) => {
						const matches = icssImport.exec(rule.selector);
						if (matches) {
							const [, doubleQuotePath, singleQuotePath] = matches;
							const importPath = doubleQuotePath || singleQuotePath;
							addImportToGraph(importPath, "root", graph, visited);
							existingImports[importPath] = rule;
						}
					});
					root.walkDecls(/^composes$/, (declaration) => {
						const multiple = declaration.value.split(",");
						const values = [];
						multiple.forEach((value) => {
							const matches = value.trim().match(matchImports);
							if (!matches) {
								values.push(value);
								return;
							}
							let tmpSymbols;
							let [, symbols, doubleQuotePath, singleQuotePath, global] = matches;
							if (global) tmpSymbols = symbols.split(/\s+/).map((s) => `global(${s})`);
							else {
								const importPath = doubleQuotePath || singleQuotePath;
								let parent = declaration.parent;
								let parentIndexes = "";
								while (parent.type !== "root") {
									parentIndexes = parent.parent.index(parent) + "_" + parentIndexes;
									parent = parent.parent;
								}
								const { selector } = declaration.parent;
								addImportToGraph(importPath, `_${parentIndexes}${selector}`, graph, visited);
								importDecls[importPath] = declaration;
								imports[importPath] = imports[importPath] || {};
								tmpSymbols = symbols.split(/\s+/).map((s) => {
									if (!imports[importPath][s]) imports[importPath][s] = createImportedName(s, importPath);
									return imports[importPath][s];
								});
							}
							values.push(tmpSymbols.join(" "));
						});
						declaration.value = values.join(", ");
					});
					const importsOrder = topologicalSort(graph, failOnWrongOrder);
					if (importsOrder instanceof Error) throw importDecls[importsOrder.nodes.find((importPath) => importDecls.hasOwnProperty(importPath))].error("Failed to resolve order of composed modules " + importsOrder.nodes.map((importPath) => "`" + importPath + "`").join(", ") + ".", {
						plugin: "postcss-modules-extract-imports",
						word: "composes"
					});
					let lastImportRule;
					importsOrder.forEach((path) => {
						const importedSymbols = imports[path];
						let rule = existingImports[path];
						if (!rule && importedSymbols) {
							rule = postcss.rule({
								selector: `:import("${path}")`,
								raws: { after: "\n" }
							});
							if (lastImportRule) root.insertAfter(lastImportRule, rule);
							else root.prepend(rule);
						}
						lastImportRule = rule;
						if (!importedSymbols) return;
						Object.keys(importedSymbols).forEach((importedSymbol) => {
							rule.append(postcss.decl({
								value: importedSymbol,
								prop: importedSymbols[importedSymbol],
								raws: { before: "\n  " }
							}));
						});
					});
				} };
			}
		};
	};
	module.exports.postcss = true;
}));

//#endregion
//#region node_modules/.pnpm/loader-utils@3.3.1/node_modules/loader-utils/lib/hash/wasm-hash.js
var require_wasm_hash = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const MAX_SHORT_STRING = Math.floor(65472 / 4) & -4;
	var WasmHash = class {
		/**
		* @param {WebAssembly.Instance} instance wasm instance
		* @param {WebAssembly.Instance[]} instancesPool pool of instances
		* @param {number} chunkSize size of data chunks passed to wasm
		* @param {number} digestSize size of digest returned by wasm
		*/
		constructor(instance, instancesPool, chunkSize, digestSize) {
			const exports$2 = instance.exports;
			exports$2.init();
			this.exports = exports$2;
			this.mem = Buffer.from(exports$2.memory.buffer, 0, 65536);
			this.buffered = 0;
			this.instancesPool = instancesPool;
			this.chunkSize = chunkSize;
			this.digestSize = digestSize;
		}
		reset() {
			this.buffered = 0;
			this.exports.init();
		}
		/**
		* @param {Buffer | string} data data
		* @param {BufferEncoding=} encoding encoding
		* @returns {this} itself
		*/
		update(data, encoding) {
			if (typeof data === "string") {
				while (data.length > MAX_SHORT_STRING) {
					this._updateWithShortString(data.slice(0, MAX_SHORT_STRING), encoding);
					data = data.slice(MAX_SHORT_STRING);
				}
				this._updateWithShortString(data, encoding);
				return this;
			}
			this._updateWithBuffer(data);
			return this;
		}
		/**
		* @param {string} data data
		* @param {BufferEncoding=} encoding encoding
		* @returns {void}
		*/
		_updateWithShortString(data, encoding) {
			const { exports: exports$3, buffered, mem, chunkSize } = this;
			let endPos;
			if (data.length < 70) if (!encoding || encoding === "utf-8" || encoding === "utf8") {
				endPos = buffered;
				for (let i = 0; i < data.length; i++) {
					const cc = data.charCodeAt(i);
					if (cc < 128) mem[endPos++] = cc;
					else if (cc < 2048) {
						mem[endPos] = cc >> 6 | 192;
						mem[endPos + 1] = cc & 63 | 128;
						endPos += 2;
					} else {
						endPos += mem.write(data.slice(i), endPos, encoding);
						break;
					}
				}
			} else if (encoding === "latin1") {
				endPos = buffered;
				for (let i = 0; i < data.length; i++) {
					const cc = data.charCodeAt(i);
					mem[endPos++] = cc;
				}
			} else endPos = buffered + mem.write(data, buffered, encoding);
			else endPos = buffered + mem.write(data, buffered, encoding);
			if (endPos < chunkSize) this.buffered = endPos;
			else {
				const l = endPos & ~(this.chunkSize - 1);
				exports$3.update(l);
				const newBuffered = endPos - l;
				this.buffered = newBuffered;
				if (newBuffered > 0) mem.copyWithin(0, l, endPos);
			}
		}
		/**
		* @param {Buffer} data data
		* @returns {void}
		*/
		_updateWithBuffer(data) {
			const { exports: exports$4, buffered, mem } = this;
			const length = data.length;
			if (buffered + length < this.chunkSize) {
				data.copy(mem, buffered, 0, length);
				this.buffered += length;
			} else {
				const l = buffered + length & ~(this.chunkSize - 1);
				if (l > 65536) {
					let i = 65536 - buffered;
					data.copy(mem, buffered, 0, i);
					exports$4.update(65536);
					const stop = l - buffered - 65536;
					while (i < stop) {
						data.copy(mem, 0, i, i + 65536);
						exports$4.update(65536);
						i += 65536;
					}
					data.copy(mem, 0, i, l - buffered);
					exports$4.update(l - buffered - i);
				} else {
					data.copy(mem, buffered, 0, l - buffered);
					exports$4.update(l);
				}
				const newBuffered = length + buffered - l;
				this.buffered = newBuffered;
				if (newBuffered > 0) data.copy(mem, 0, length - newBuffered, length);
			}
		}
		digest(type) {
			const { exports: exports$5, buffered, mem, digestSize } = this;
			exports$5.final(buffered);
			this.instancesPool.push(this);
			const hex = mem.toString("latin1", 0, digestSize);
			if (type === "hex") return hex;
			if (type === "binary" || !type) return Buffer.from(hex, "hex");
			return Buffer.from(hex, "hex").toString(type);
		}
	};
	const create = (wasmModule, instancesPool, chunkSize, digestSize) => {
		if (instancesPool.length > 0) {
			const old = instancesPool.pop();
			old.reset();
			return old;
		} else return new WasmHash(new WebAssembly.Instance(wasmModule), instancesPool, chunkSize, digestSize);
	};
	module.exports = create;
	module.exports.MAX_SHORT_STRING = MAX_SHORT_STRING;
}));

//#endregion
//#region node_modules/.pnpm/loader-utils@3.3.1/node_modules/loader-utils/lib/hash/xxhash64.js
var require_xxhash64 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const create = require_wasm_hash();
	const xxhash64 = new WebAssembly.Module(Buffer.from("AGFzbQEAAAABCAJgAX8AYAAAAwQDAQAABQMBAAEGGgV+AUIAC34BQgALfgFCAAt+AUIAC34BQgALByIEBGluaXQAAAZ1cGRhdGUAAQVmaW5hbAACBm1lbW9yeQIACrUIAzAAQtbrgu7q/Yn14AAkAELP1tO+0ser2UIkAUIAJAJC+erQ0OfJoeThACQDQgAkBAvUAQIBfwR+IABFBEAPCyMEIACtfCQEIwAhAiMBIQMjAiEEIwMhBQNAIAIgASkDAELP1tO+0ser2UJ+fEIfiUKHla+vmLbem55/fiECIAMgASkDCELP1tO+0ser2UJ+fEIfiUKHla+vmLbem55/fiEDIAQgASkDEELP1tO+0ser2UJ+fEIfiUKHla+vmLbem55/fiEEIAUgASkDGELP1tO+0ser2UJ+fEIfiUKHla+vmLbem55/fiEFIAAgAUEgaiIBSw0ACyACJAAgAyQBIAQkAiAFJAMLqwYCAX8EfiMEQgBSBH4jACICQgGJIwEiA0IHiXwjAiIEQgyJfCMDIgVCEol8IAJCz9bTvtLHq9lCfkIfiUKHla+vmLbem55/foVCh5Wvr5i23puef35CnaO16oOxjYr6AH0gA0LP1tO+0ser2UJ+Qh+JQoeVr6+Ytt6bnn9+hUKHla+vmLbem55/fkKdo7Xqg7GNivoAfSAEQs/W077Sx6vZQn5CH4lCh5Wvr5i23puef36FQoeVr6+Ytt6bnn9+Qp2jteqDsY2K+gB9IAVCz9bTvtLHq9lCfkIfiUKHla+vmLbem55/foVCh5Wvr5i23puef35CnaO16oOxjYr6AH0FQsXP2bLx5brqJwsjBCAArXx8IQIDQCABQQhqIABNBEAgAiABKQMAQs/W077Sx6vZQn5CH4lCh5Wvr5i23puef36FQhuJQoeVr6+Ytt6bnn9+Qp2jteqDsY2K+gB9IQIgAUEIaiEBDAELCyABQQRqIABNBEACfyACIAE1AgBCh5Wvr5i23puef36FQheJQs/W077Sx6vZQn5C+fPd8Zn2masWfCECIAFBBGoLIQELA0AgACABRwRAIAIgATEAAELFz9my8eW66id+hUILiUKHla+vmLbem55/fiECIAFBAWohAQwBCwtBACACIAJCIYiFQs/W077Sx6vZQn4iAiACQh2IhUL5893xmfaZqxZ+IgIgAkIgiIUiAkIgiCIDQv//A4NCIIYgA0KAgPz/D4NCEIiEIgNC/4GAgPAfg0IQhiADQoD+g4CA4D+DQgiIhCIDQo+AvIDwgcAHg0IIhiADQvCBwIeAnoD4AINCBIiEIgNChoyYsODAgYMGfEIEiEKBgoSIkKDAgAGDQid+IANCsODAgYOGjJgwhHw3AwBBCCACQv////8PgyICQv//A4NCIIYgAkKAgPz/D4NCEIiEIgJC/4GAgPAfg0IQhiACQoD+g4CA4D+DQgiIhCICQo+AvIDwgcAHg0IIhiACQvCBwIeAnoD4AINCBIiEIgJChoyYsODAgYMGfEIEiEKBgoSIkKDAgAGDQid+IAJCsODAgYOGjJgwhHw3AwAL", "base64"));
	module.exports = create.bind(null, xxhash64, [], 32, 16);
}));

//#endregion
//#region node_modules/.pnpm/loader-utils@3.3.1/node_modules/loader-utils/lib/hash/BatchedHash.js
var require_BatchedHash = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const MAX_SHORT_STRING = require_wasm_hash().MAX_SHORT_STRING;
	var BatchedHash = class {
		constructor(hash) {
			this.string = void 0;
			this.encoding = void 0;
			this.hash = hash;
		}
		/**
		* Update hash {@link https://nodejs.org/api/crypto.html#crypto_hash_update_data_inputencoding}
		* @param {string|Buffer} data data
		* @param {string=} inputEncoding data encoding
		* @returns {this} updated hash
		*/
		update(data, inputEncoding) {
			if (this.string !== void 0) {
				if (typeof data === "string" && inputEncoding === this.encoding && this.string.length + data.length < MAX_SHORT_STRING) {
					this.string += data;
					return this;
				}
				this.hash.update(this.string, this.encoding);
				this.string = void 0;
			}
			if (typeof data === "string") if (data.length < MAX_SHORT_STRING && (!inputEncoding || !inputEncoding.startsWith("ba"))) {
				this.string = data;
				this.encoding = inputEncoding;
			} else this.hash.update(data, inputEncoding);
			else this.hash.update(data);
			return this;
		}
		/**
		* Calculates the digest {@link https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding}
		* @param {string=} encoding encoding of the return value
		* @returns {string|Buffer} digest
		*/
		digest(encoding) {
			if (this.string !== void 0) this.hash.update(this.string, this.encoding);
			return this.hash.digest(encoding);
		}
	};
	module.exports = BatchedHash;
}));

//#endregion
//#region node_modules/.pnpm/loader-utils@3.3.1/node_modules/loader-utils/lib/hash/md4.js
var require_md4 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const create = require_wasm_hash();
	const md4 = new WebAssembly.Module(Buffer.from("AGFzbQEAAAABCAJgAX8AYAAAAwUEAQAAAAUDAQABBhoFfwFBAAt/AUEAC38BQQALfwFBAAt/AUEACwciBARpbml0AAAGdXBkYXRlAAIFZmluYWwAAwZtZW1vcnkCAAqFEAQmAEGBxpS6BiQBQYnXtv5+JAJB/rnrxXkkA0H2qMmBASQEQQAkAAvMCgEYfyMBIQojAiEGIwMhByMEIQgDQCAAIAVLBEAgBSgCCCINIAcgBiAFKAIEIgsgCCAHIAUoAgAiDCAKIAggBiAHIAhzcXNqakEDdyIDIAYgB3Nxc2pqQQd3IgEgAyAGc3FzampBC3chAiAFKAIUIg8gASACIAUoAhAiCSADIAEgBSgCDCIOIAYgAyACIAEgA3Nxc2pqQRN3IgQgASACc3FzampBA3ciAyACIARzcXNqakEHdyEBIAUoAiAiEiADIAEgBSgCHCIRIAQgAyAFKAIYIhAgAiAEIAEgAyAEc3FzampBC3ciAiABIANzcXNqakETdyIEIAEgAnNxc2pqQQN3IQMgBSgCLCIVIAQgAyAFKAIoIhQgAiAEIAUoAiQiEyABIAIgAyACIARzcXNqakEHdyIBIAMgBHNxc2pqQQt3IgIgASADc3FzampBE3chBCAPIBAgCSAVIBQgEyAFKAI4IhYgAiAEIAUoAjQiFyABIAIgBSgCMCIYIAMgASAEIAEgAnNxc2pqQQN3IgEgAiAEc3FzampBB3ciAiABIARzcXNqakELdyIDIAkgAiAMIAEgBSgCPCIJIAQgASADIAEgAnNxc2pqQRN3IgEgAiADcnEgAiADcXJqakGZ84nUBWpBA3ciAiABIANycSABIANxcmpqQZnzidQFakEFdyIEIAEgAnJxIAEgAnFyaiASakGZ84nUBWpBCXciAyAPIAQgCyACIBggASADIAIgBHJxIAIgBHFyampBmfOJ1AVqQQ13IgEgAyAEcnEgAyAEcXJqakGZ84nUBWpBA3ciAiABIANycSABIANxcmpqQZnzidQFakEFdyIEIAEgAnJxIAEgAnFyampBmfOJ1AVqQQl3IgMgECAEIAIgFyABIAMgAiAEcnEgAiAEcXJqakGZ84nUBWpBDXciASADIARycSADIARxcmogDWpBmfOJ1AVqQQN3IgIgASADcnEgASADcXJqakGZ84nUBWpBBXciBCABIAJycSABIAJxcmpqQZnzidQFakEJdyIDIBEgBCAOIAIgFiABIAMgAiAEcnEgAiAEcXJqakGZ84nUBWpBDXciASADIARycSADIARxcmpqQZnzidQFakEDdyICIAEgA3JxIAEgA3FyampBmfOJ1AVqQQV3IgQgASACcnEgASACcXJqakGZ84nUBWpBCXciAyAMIAIgAyAJIAEgAyACIARycSACIARxcmpqQZnzidQFakENdyIBcyAEc2pqQaHX5/YGakEDdyICIAQgASACcyADc2ogEmpBodfn9gZqQQl3IgRzIAFzampBodfn9gZqQQt3IgMgAiADIBggASADIARzIAJzampBodfn9gZqQQ93IgFzIARzaiANakGh1+f2BmpBA3ciAiAUIAQgASACcyADc2pqQaHX5/YGakEJdyIEcyABc2pqQaHX5/YGakELdyIDIAsgAiADIBYgASADIARzIAJzampBodfn9gZqQQ93IgFzIARzampBodfn9gZqQQN3IgIgEyAEIAEgAnMgA3NqakGh1+f2BmpBCXciBHMgAXNqakGh1+f2BmpBC3chAyAKIA4gAiADIBcgASADIARzIAJzampBodfn9gZqQQ93IgFzIARzampBodfn9gZqQQN3IgJqIQogBiAJIAEgESADIAIgFSAEIAEgAnMgA3NqakGh1+f2BmpBCXciBHMgAXNqakGh1+f2BmpBC3ciAyAEcyACc2pqQaHX5/YGakEPd2ohBiADIAdqIQcgBCAIaiEIIAVBQGshBQwBCwsgCiQBIAYkAiAHJAMgCCQECw0AIAAQASMAIABqJAAL/wQCA38BfiMAIABqrUIDhiEEIABByABqQUBxIgJBCGshAyAAIgFBAWohACABQYABOgAAA0AgACACSUEAIABBB3EbBEAgAEEAOgAAIABBAWohAAwBCwsDQCAAIAJJBEAgAEIANwMAIABBCGohAAwBCwsgAyAENwMAIAIQAUEAIwGtIgRC//8DgyAEQoCA/P8Pg0IQhoQiBEL/gYCA8B+DIARCgP6DgIDgP4NCCIaEIgRCj4C8gPCBwAeDQgiGIARC8IHAh4CegPgAg0IEiIQiBEKGjJiw4MCBgwZ8QgSIQoGChIiQoMCAAYNCJ34gBEKw4MCBg4aMmDCEfDcDAEEIIwKtIgRC//8DgyAEQoCA/P8Pg0IQhoQiBEL/gYCA8B+DIARCgP6DgIDgP4NCCIaEIgRCj4C8gPCBwAeDQgiGIARC8IHAh4CegPgAg0IEiIQiBEKGjJiw4MCBgwZ8QgSIQoGChIiQoMCAAYNCJ34gBEKw4MCBg4aMmDCEfDcDAEEQIwOtIgRC//8DgyAEQoCA/P8Pg0IQhoQiBEL/gYCA8B+DIARCgP6DgIDgP4NCCIaEIgRCj4C8gPCBwAeDQgiGIARC8IHAh4CegPgAg0IEiIQiBEKGjJiw4MCBgwZ8QgSIQoGChIiQoMCAAYNCJ34gBEKw4MCBg4aMmDCEfDcDAEEYIwStIgRC//8DgyAEQoCA/P8Pg0IQhoQiBEL/gYCA8B+DIARCgP6DgIDgP4NCCIaEIgRCj4C8gPCBwAeDQgiGIARC8IHAh4CegPgAg0IEiIQiBEKGjJiw4MCBgwZ8QgSIQoGChIiQoMCAAYNCJ34gBEKw4MCBg4aMmDCEfDcDAAs=", "base64"));
	module.exports = create.bind(null, md4, [], 64, 32);
}));

//#endregion
//#region node_modules/.pnpm/loader-utils@3.3.1/node_modules/loader-utils/lib/hash/BulkUpdateDecorator.js
var require_BulkUpdateDecorator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const BULK_SIZE = 2e3;
	const digestCaches = {};
	var BulkUpdateDecorator = class {
		/**
		* @param {Hash | function(): Hash} hashOrFactory function to create a hash
		* @param {string=} hashKey key for caching
		*/
		constructor(hashOrFactory, hashKey) {
			this.hashKey = hashKey;
			if (typeof hashOrFactory === "function") {
				this.hashFactory = hashOrFactory;
				this.hash = void 0;
			} else {
				this.hashFactory = void 0;
				this.hash = hashOrFactory;
			}
			this.buffer = "";
		}
		/**
		* Update hash {@link https://nodejs.org/api/crypto.html#crypto_hash_update_data_inputencoding}
		* @param {string|Buffer} data data
		* @param {string=} inputEncoding data encoding
		* @returns {this} updated hash
		*/
		update(data, inputEncoding) {
			if (inputEncoding !== void 0 || typeof data !== "string" || data.length > BULK_SIZE) {
				if (this.hash === void 0) this.hash = this.hashFactory();
				if (this.buffer.length > 0) {
					this.hash.update(this.buffer);
					this.buffer = "";
				}
				this.hash.update(data, inputEncoding);
			} else {
				this.buffer += data;
				if (this.buffer.length > BULK_SIZE) {
					if (this.hash === void 0) this.hash = this.hashFactory();
					this.hash.update(this.buffer);
					this.buffer = "";
				}
			}
			return this;
		}
		/**
		* Calculates the digest {@link https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding}
		* @param {string=} encoding encoding of the return value
		* @returns {string|Buffer} digest
		*/
		digest(encoding) {
			let digestCache;
			const buffer = this.buffer;
			if (this.hash === void 0) {
				const cacheKey = `${this.hashKey}-${encoding}`;
				digestCache = digestCaches[cacheKey];
				if (digestCache === void 0) digestCache = digestCaches[cacheKey] = /* @__PURE__ */ new Map();
				const cacheEntry = digestCache.get(buffer);
				if (cacheEntry !== void 0) return cacheEntry;
				this.hash = this.hashFactory();
			}
			if (buffer.length > 0) this.hash.update(buffer);
			const digestResult = this.hash.digest(encoding);
			if (digestCache !== void 0) digestCache.set(buffer, digestResult);
			return digestResult;
		}
	};
	module.exports = BulkUpdateDecorator;
}));

//#endregion
//#region node_modules/.pnpm/loader-utils@3.3.1/node_modules/loader-utils/lib/getHashDigest.js
var require_getHashDigest = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const baseEncodeTables = {
		26: "abcdefghijklmnopqrstuvwxyz",
		32: "123456789abcdefghjkmnpqrstuvwxyz",
		36: "0123456789abcdefghijklmnopqrstuvwxyz",
		49: "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
		52: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
		58: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
		62: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
		64: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
	};
	/**
	* @param {Uint32Array} uint32Array Treated as a long base-0x100000000 number, little endian
	* @param {number} divisor The divisor
	* @return {number} Modulo (remainder) of the division
	*/
	function divmod32(uint32Array, divisor) {
		let carry = 0;
		for (let i = uint32Array.length - 1; i >= 0; i--) {
			const value = carry * 4294967296 + uint32Array[i];
			carry = value % divisor;
			uint32Array[i] = Math.floor(value / divisor);
		}
		return carry;
	}
	function encodeBufferToBase(buffer, base, length) {
		const encodeTable = baseEncodeTables[base];
		if (!encodeTable) throw new Error("Unknown encoding base" + base);
		const limit = Math.ceil(buffer.length * 8 / Math.log2(base));
		length = Math.min(length, limit);
		const uint32Array = new Uint32Array(Math.ceil(buffer.length / 4));
		buffer.copy(Buffer.from(uint32Array.buffer));
		let output = "";
		for (let i = 0; i < length; i++) output = encodeTable[divmod32(uint32Array, base)] + output;
		return output;
	}
	let crypto = void 0;
	let createXXHash64 = void 0;
	let createMd4 = void 0;
	let BatchedHash = void 0;
	let BulkUpdateDecorator = void 0;
	function getHashDigest(buffer, algorithm, digestType, maxLength) {
		algorithm = algorithm || "xxhash64";
		maxLength = maxLength || 9999;
		let hash;
		if (algorithm === "xxhash64") {
			if (createXXHash64 === void 0) {
				createXXHash64 = require_xxhash64();
				if (BatchedHash === void 0) BatchedHash = require_BatchedHash();
			}
			hash = new BatchedHash(createXXHash64());
		} else if (algorithm === "md4") {
			if (createMd4 === void 0) {
				createMd4 = require_md4();
				if (BatchedHash === void 0) BatchedHash = require_BatchedHash();
			}
			hash = new BatchedHash(createMd4());
		} else if (algorithm === "native-md4") {
			if (typeof crypto === "undefined") {
				crypto = require("crypto");
				if (BulkUpdateDecorator === void 0) BulkUpdateDecorator = require_BulkUpdateDecorator();
			}
			hash = new BulkUpdateDecorator(() => crypto.createHash("md4"), "md4");
		} else {
			if (typeof crypto === "undefined") {
				crypto = require("crypto");
				if (BulkUpdateDecorator === void 0) BulkUpdateDecorator = require_BulkUpdateDecorator();
			}
			hash = new BulkUpdateDecorator(() => crypto.createHash(algorithm), algorithm);
		}
		hash.update(buffer);
		if (digestType === "base26" || digestType === "base32" || digestType === "base36" || digestType === "base49" || digestType === "base52" || digestType === "base58" || digestType === "base62" || digestType === "base64safe") return encodeBufferToBase(hash.digest(), digestType === "base64safe" ? 64 : digestType.substr(4), maxLength);
		return hash.digest(digestType || "hex").substr(0, maxLength);
	}
	module.exports = getHashDigest;
}));

//#endregion
//#region node_modules/.pnpm/loader-utils@3.3.1/node_modules/loader-utils/lib/interpolateName.js
var require_interpolateName = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const path$3 = require("path");
	const getHashDigest = require_getHashDigest();
	function interpolateName(loaderContext, name, options = {}) {
		let filename;
		const hasQuery = loaderContext.resourceQuery && loaderContext.resourceQuery.length > 1;
		if (typeof name === "function") filename = name(loaderContext.resourcePath, hasQuery ? loaderContext.resourceQuery : void 0);
		else filename = name || "[hash].[ext]";
		const context = options.context;
		const content = options.content;
		const regExp = options.regExp;
		let ext = "bin";
		let basename = "file";
		let directory = "";
		let folder = "";
		let query = "";
		if (loaderContext.resourcePath) {
			const parsed = path$3.parse(loaderContext.resourcePath);
			let resourcePath = loaderContext.resourcePath;
			if (parsed.ext) ext = parsed.ext.substr(1);
			if (parsed.dir) {
				basename = parsed.name;
				resourcePath = parsed.dir + path$3.sep;
			}
			if (typeof context !== "undefined") {
				directory = path$3.relative(context, resourcePath + "_").replace(/\\/g, "/").replace(/\.\.(\/)?/g, "_$1");
				directory = directory.substr(0, directory.length - 1);
			} else directory = resourcePath.replace(/\\/g, "/").replace(/\.\.(\/)?/g, "_$1");
			if (directory.length <= 1) directory = "";
			else folder = path$3.basename(directory);
		}
		if (loaderContext.resourceQuery && loaderContext.resourceQuery.length > 1) {
			query = loaderContext.resourceQuery;
			const hashIdx = query.indexOf("#");
			if (hashIdx >= 0) query = query.substr(0, hashIdx);
		}
		let url = filename;
		if (content) url = url.replace(/\[(?:([^[:\]]+):)?(?:hash|contenthash)(?::([a-z]+\d*(?:safe)?))?(?::(\d+))?\]/gi, (all, hashType, digestType, maxLength) => getHashDigest(content, hashType, digestType, parseInt(maxLength, 10)));
		url = url.replace(/\[ext\]/gi, () => ext).replace(/\[name\]/gi, () => basename).replace(/\[path\]/gi, () => directory).replace(/\[folder\]/gi, () => folder).replace(/\[query\]/gi, () => query);
		if (regExp && loaderContext.resourcePath) {
			const match = loaderContext.resourcePath.match(new RegExp(regExp));
			match && match.forEach((matched, i) => {
				url = url.replace(new RegExp("\\[" + i + "\\]", "ig"), matched);
			});
		}
		if (typeof loaderContext.options === "object" && typeof loaderContext.options.customInterpolateName === "function") url = loaderContext.options.customInterpolateName.call(loaderContext, url, name, options);
		return url;
	}
	module.exports = interpolateName;
}));

//#endregion
//#region node_modules/.pnpm/generic-names@4.0.0/node_modules/generic-names/index.js
var require_generic_names = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var interpolateName = require_interpolateName();
	var path$2 = require("path");
	/**
	* @param  {string} pattern
	* @param  {object} options
	* @param  {string} options.context
	* @param  {string} options.hashPrefix
	* @return {function}
	*/
	module.exports = function createGenerator(pattern, options) {
		options = options || {};
		var context = options && typeof options.context === "string" ? options.context : process.cwd();
		var hashPrefix = options && typeof options.hashPrefix === "string" ? options.hashPrefix : "";
		/**
		* @param  {string} localName Usually a class name
		* @param  {string} filepath  Absolute path
		* @return {string}
		*/
		return function generate(localName, filepath) {
			var name = pattern.replace(/\[local\]/gi, localName);
			return interpolateName({ resourcePath: filepath }, name, {
				content: hashPrefix + path$2.relative(context, filepath).replace(/\\/g, "/") + "\0" + localName,
				context
			}).replace(/* @__PURE__ */ new RegExp("[^a-zA-Z0-9\\-_\xA0-￿]", "g"), "-").replace(/^((-?[0-9])|--)/, "_$1");
		};
	};
}));

//#endregion
//#region node_modules/.pnpm/postcss-value-parser@4.2.0/node_modules/postcss-value-parser/lib/parse.js
var require_parse = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var openParentheses = "(".charCodeAt(0);
	var closeParentheses = ")".charCodeAt(0);
	var singleQuote = "'".charCodeAt(0);
	var doubleQuote = "\"".charCodeAt(0);
	var backslash = "\\".charCodeAt(0);
	var slash = "/".charCodeAt(0);
	var comma = ",".charCodeAt(0);
	var colon = ":".charCodeAt(0);
	var star = "*".charCodeAt(0);
	var uLower = "u".charCodeAt(0);
	var uUpper = "U".charCodeAt(0);
	var plus = "+".charCodeAt(0);
	var isUnicodeRange = /^[a-f0-9?-]+$/i;
	module.exports = function(input) {
		var tokens = [];
		var value = input;
		var next, quote, prev, token, escape, escapePos, whitespacePos, parenthesesOpenPos;
		var pos = 0;
		var code = value.charCodeAt(pos);
		var max = value.length;
		var stack = [{ nodes: tokens }];
		var balanced = 0;
		var parent;
		var name = "";
		var before = "";
		var after = "";
		while (pos < max) if (code <= 32) {
			next = pos;
			do {
				next += 1;
				code = value.charCodeAt(next);
			} while (code <= 32);
			token = value.slice(pos, next);
			prev = tokens[tokens.length - 1];
			if (code === closeParentheses && balanced) after = token;
			else if (prev && prev.type === "div") {
				prev.after = token;
				prev.sourceEndIndex += token.length;
			} else if (code === comma || code === colon || code === slash && value.charCodeAt(next + 1) !== star && (!parent || parent && parent.type === "function" && parent.value !== "calc")) before = token;
			else tokens.push({
				type: "space",
				sourceIndex: pos,
				sourceEndIndex: next,
				value: token
			});
			pos = next;
		} else if (code === singleQuote || code === doubleQuote) {
			next = pos;
			quote = code === singleQuote ? "'" : "\"";
			token = {
				type: "string",
				sourceIndex: pos,
				quote
			};
			do {
				escape = false;
				next = value.indexOf(quote, next + 1);
				if (~next) {
					escapePos = next;
					while (value.charCodeAt(escapePos - 1) === backslash) {
						escapePos -= 1;
						escape = !escape;
					}
				} else {
					value += quote;
					next = value.length - 1;
					token.unclosed = true;
				}
			} while (escape);
			token.value = value.slice(pos + 1, next);
			token.sourceEndIndex = token.unclosed ? next : next + 1;
			tokens.push(token);
			pos = next + 1;
			code = value.charCodeAt(pos);
		} else if (code === slash && value.charCodeAt(pos + 1) === star) {
			next = value.indexOf("*/", pos);
			token = {
				type: "comment",
				sourceIndex: pos,
				sourceEndIndex: next + 2
			};
			if (next === -1) {
				token.unclosed = true;
				next = value.length;
				token.sourceEndIndex = next;
			}
			token.value = value.slice(pos + 2, next);
			tokens.push(token);
			pos = next + 2;
			code = value.charCodeAt(pos);
		} else if ((code === slash || code === star) && parent && parent.type === "function" && parent.value === "calc") {
			token = value[pos];
			tokens.push({
				type: "word",
				sourceIndex: pos - before.length,
				sourceEndIndex: pos + token.length,
				value: token
			});
			pos += 1;
			code = value.charCodeAt(pos);
		} else if (code === slash || code === comma || code === colon) {
			token = value[pos];
			tokens.push({
				type: "div",
				sourceIndex: pos - before.length,
				sourceEndIndex: pos + token.length,
				value: token,
				before,
				after: ""
			});
			before = "";
			pos += 1;
			code = value.charCodeAt(pos);
		} else if (openParentheses === code) {
			next = pos;
			do {
				next += 1;
				code = value.charCodeAt(next);
			} while (code <= 32);
			parenthesesOpenPos = pos;
			token = {
				type: "function",
				sourceIndex: pos - name.length,
				value: name,
				before: value.slice(parenthesesOpenPos + 1, next)
			};
			pos = next;
			if (name === "url" && code !== singleQuote && code !== doubleQuote) {
				next -= 1;
				do {
					escape = false;
					next = value.indexOf(")", next + 1);
					if (~next) {
						escapePos = next;
						while (value.charCodeAt(escapePos - 1) === backslash) {
							escapePos -= 1;
							escape = !escape;
						}
					} else {
						value += ")";
						next = value.length - 1;
						token.unclosed = true;
					}
				} while (escape);
				whitespacePos = next;
				do {
					whitespacePos -= 1;
					code = value.charCodeAt(whitespacePos);
				} while (code <= 32);
				if (parenthesesOpenPos < whitespacePos) {
					if (pos !== whitespacePos + 1) token.nodes = [{
						type: "word",
						sourceIndex: pos,
						sourceEndIndex: whitespacePos + 1,
						value: value.slice(pos, whitespacePos + 1)
					}];
					else token.nodes = [];
					if (token.unclosed && whitespacePos + 1 !== next) {
						token.after = "";
						token.nodes.push({
							type: "space",
							sourceIndex: whitespacePos + 1,
							sourceEndIndex: next,
							value: value.slice(whitespacePos + 1, next)
						});
					} else {
						token.after = value.slice(whitespacePos + 1, next);
						token.sourceEndIndex = next;
					}
				} else {
					token.after = "";
					token.nodes = [];
				}
				pos = next + 1;
				token.sourceEndIndex = token.unclosed ? next : pos;
				code = value.charCodeAt(pos);
				tokens.push(token);
			} else {
				balanced += 1;
				token.after = "";
				token.sourceEndIndex = pos + 1;
				tokens.push(token);
				stack.push(token);
				tokens = token.nodes = [];
				parent = token;
			}
			name = "";
		} else if (closeParentheses === code && balanced) {
			pos += 1;
			code = value.charCodeAt(pos);
			parent.after = after;
			parent.sourceEndIndex += after.length;
			after = "";
			balanced -= 1;
			stack[stack.length - 1].sourceEndIndex = pos;
			stack.pop();
			parent = stack[balanced];
			tokens = parent.nodes;
		} else {
			next = pos;
			do {
				if (code === backslash) next += 1;
				next += 1;
				code = value.charCodeAt(next);
			} while (next < max && !(code <= 32 || code === singleQuote || code === doubleQuote || code === comma || code === colon || code === slash || code === openParentheses || code === star && parent && parent.type === "function" && parent.value === "calc" || code === slash && parent.type === "function" && parent.value === "calc" || code === closeParentheses && balanced));
			token = value.slice(pos, next);
			if (openParentheses === code) name = token;
			else if ((uLower === token.charCodeAt(0) || uUpper === token.charCodeAt(0)) && plus === token.charCodeAt(1) && isUnicodeRange.test(token.slice(2))) tokens.push({
				type: "unicode-range",
				sourceIndex: pos,
				sourceEndIndex: next,
				value: token
			});
			else tokens.push({
				type: "word",
				sourceIndex: pos,
				sourceEndIndex: next,
				value: token
			});
			pos = next;
		}
		for (pos = stack.length - 1; pos; pos -= 1) {
			stack[pos].unclosed = true;
			stack[pos].sourceEndIndex = value.length;
		}
		return stack[0].nodes;
	};
}));

//#endregion
//#region node_modules/.pnpm/postcss-value-parser@4.2.0/node_modules/postcss-value-parser/lib/walk.js
var require_walk = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function walk(nodes, cb, bubble) {
		var i, max, node, result;
		for (i = 0, max = nodes.length; i < max; i += 1) {
			node = nodes[i];
			if (!bubble) result = cb(node, i, nodes);
			if (result !== false && node.type === "function" && Array.isArray(node.nodes)) walk(node.nodes, cb, bubble);
			if (bubble) cb(node, i, nodes);
		}
	};
}));

//#endregion
//#region node_modules/.pnpm/postcss-value-parser@4.2.0/node_modules/postcss-value-parser/lib/stringify.js
var require_stringify = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function stringifyNode(node, custom) {
		var type = node.type;
		var value = node.value;
		var buf;
		var customResult;
		if (custom && (customResult = custom(node)) !== void 0) return customResult;
		else if (type === "word" || type === "space") return value;
		else if (type === "string") {
			buf = node.quote || "";
			return buf + value + (node.unclosed ? "" : buf);
		} else if (type === "comment") return "/*" + value + (node.unclosed ? "" : "*/");
		else if (type === "div") return (node.before || "") + value + (node.after || "");
		else if (Array.isArray(node.nodes)) {
			buf = stringify(node.nodes, custom);
			if (type !== "function") return buf;
			return value + "(" + (node.before || "") + buf + (node.after || "") + (node.unclosed ? "" : ")");
		}
		return value;
	}
	function stringify(nodes, custom) {
		var result, i;
		if (Array.isArray(nodes)) {
			result = "";
			for (i = nodes.length - 1; ~i; i -= 1) result = stringifyNode(nodes[i], custom) + result;
			return result;
		}
		return stringifyNode(nodes, custom);
	}
	module.exports = stringify;
}));

//#endregion
//#region node_modules/.pnpm/postcss-value-parser@4.2.0/node_modules/postcss-value-parser/lib/unit.js
var require_unit = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var minus = "-".charCodeAt(0);
	var plus = "+".charCodeAt(0);
	var dot = ".".charCodeAt(0);
	var exp = "e".charCodeAt(0);
	var EXP = "E".charCodeAt(0);
	function likeNumber(value) {
		var code = value.charCodeAt(0);
		var nextCode;
		if (code === plus || code === minus) {
			nextCode = value.charCodeAt(1);
			if (nextCode >= 48 && nextCode <= 57) return true;
			var nextNextCode = value.charCodeAt(2);
			if (nextCode === dot && nextNextCode >= 48 && nextNextCode <= 57) return true;
			return false;
		}
		if (code === dot) {
			nextCode = value.charCodeAt(1);
			if (nextCode >= 48 && nextCode <= 57) return true;
			return false;
		}
		if (code >= 48 && code <= 57) return true;
		return false;
	}
	module.exports = function(value) {
		var pos = 0;
		var length = value.length;
		var code;
		var nextCode;
		var nextNextCode;
		if (length === 0 || !likeNumber(value)) return false;
		code = value.charCodeAt(pos);
		if (code === plus || code === minus) pos++;
		while (pos < length) {
			code = value.charCodeAt(pos);
			if (code < 48 || code > 57) break;
			pos += 1;
		}
		code = value.charCodeAt(pos);
		nextCode = value.charCodeAt(pos + 1);
		if (code === dot && nextCode >= 48 && nextCode <= 57) {
			pos += 2;
			while (pos < length) {
				code = value.charCodeAt(pos);
				if (code < 48 || code > 57) break;
				pos += 1;
			}
		}
		code = value.charCodeAt(pos);
		nextCode = value.charCodeAt(pos + 1);
		nextNextCode = value.charCodeAt(pos + 2);
		if ((code === exp || code === EXP) && (nextCode >= 48 && nextCode <= 57 || (nextCode === plus || nextCode === minus) && nextNextCode >= 48 && nextNextCode <= 57)) {
			pos += nextCode === plus || nextCode === minus ? 3 : 2;
			while (pos < length) {
				code = value.charCodeAt(pos);
				if (code < 48 || code > 57) break;
				pos += 1;
			}
		}
		return {
			number: value.slice(0, pos),
			unit: value.slice(pos)
		};
	};
}));

//#endregion
//#region node_modules/.pnpm/postcss-value-parser@4.2.0/node_modules/postcss-value-parser/lib/index.js
var require_lib = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var parse = require_parse();
	var walk = require_walk();
	var stringify = require_stringify();
	function ValueParser(value) {
		if (this instanceof ValueParser) {
			this.nodes = parse(value);
			return this;
		}
		return new ValueParser(value);
	}
	ValueParser.prototype.toString = function() {
		return Array.isArray(this.nodes) ? stringify(this.nodes) : "";
	};
	ValueParser.prototype.walk = function(cb, bubble) {
		walk(this.nodes, cb, bubble);
		return this;
	};
	ValueParser.unit = require_unit();
	ValueParser.walk = walk;
	ValueParser.stringify = stringify;
	module.exports = ValueParser;
}));

//#endregion
//#region node_modules/.pnpm/postcss-modules-local-by-default@4.2.0_postcss@8.5.6/node_modules/postcss-modules-local-by-default/src/index.js
var require_src$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const selectorParser = require_dist();
	const valueParser = require_lib();
	const { extractICSS } = require_src$4();
	const IGNORE_FILE_MARKER = "cssmodules-pure-no-check";
	const IGNORE_NEXT_LINE_MARKER = "cssmodules-pure-ignore";
	const isSpacing = (node) => node.type === "combinator" && node.value === " ";
	const isPureCheckDisabled = (root) => {
		for (const node of root.nodes) {
			if (node.type !== "comment") return false;
			if (node.text.trim().startsWith(IGNORE_FILE_MARKER)) return true;
		}
		return false;
	};
	function getIgnoreComment(node) {
		if (!node.parent) return;
		const indexInParent = node.parent.index(node);
		for (let i = indexInParent - 1; i >= 0; i--) {
			const prevNode = node.parent.nodes[i];
			if (prevNode.type === "comment") {
				if (prevNode.text.trimStart().startsWith(IGNORE_NEXT_LINE_MARKER)) return prevNode;
			} else break;
		}
	}
	function normalizeNodeArray(nodes) {
		const array = [];
		nodes.forEach((x) => {
			if (Array.isArray(x)) normalizeNodeArray(x).forEach((item) => {
				array.push(item);
			});
			else if (x) array.push(x);
		});
		if (array.length > 0 && isSpacing(array[array.length - 1])) array.pop();
		return array;
	}
	const isPureSelectorSymbol = Symbol("is-pure-selector");
	function localizeNode(rule, mode, localAliasMap) {
		const transform = (node, context) => {
			if (context.ignoreNextSpacing && !isSpacing(node)) throw new Error("Missing whitespace after " + context.ignoreNextSpacing);
			if (context.enforceNoSpacing && isSpacing(node)) throw new Error("Missing whitespace before " + context.enforceNoSpacing);
			let newNodes;
			switch (node.type) {
				case "root": {
					let resultingGlobal;
					context.hasPureGlobals = false;
					newNodes = node.nodes.map((n) => {
						const nContext = {
							global: context.global,
							lastWasSpacing: true,
							hasLocals: false,
							explicit: false
						};
						n = transform(n, nContext);
						if (typeof resultingGlobal === "undefined") resultingGlobal = nContext.global;
						else if (resultingGlobal !== nContext.global) throw new Error("Inconsistent rule global/local result in rule \"" + node + "\" (multiple selectors must result in the same mode for the rule)");
						if (!nContext.hasLocals) context.hasPureGlobals = true;
						return n;
					});
					context.global = resultingGlobal;
					node.nodes = normalizeNodeArray(newNodes);
					break;
				}
				case "selector":
					newNodes = node.map((childNode) => transform(childNode, context));
					node = node.clone();
					node.nodes = normalizeNodeArray(newNodes);
					break;
				case "combinator":
					if (isSpacing(node)) {
						if (context.ignoreNextSpacing) {
							context.ignoreNextSpacing = false;
							context.lastWasSpacing = false;
							context.enforceNoSpacing = false;
							return null;
						}
						context.lastWasSpacing = true;
						return node;
					}
					break;
				case "pseudo": {
					let childContext;
					const isNested = !!node.length;
					const isScoped = node.value === ":local" || node.value === ":global";
					if (node.value === ":import" || node.value === ":export") context.hasLocals = true;
					else if (isNested) {
						if (isScoped) {
							if (node.nodes.length === 0) throw new Error(`${node.value}() can't be empty`);
							if (context.inside) throw new Error(`A ${node.value} is not allowed inside of a ${context.inside}(...)`);
							childContext = {
								global: node.value === ":global",
								inside: node.value,
								hasLocals: false,
								explicit: true
							};
							newNodes = node.map((childNode) => transform(childNode, childContext)).reduce((acc, next) => acc.concat(next.nodes), []);
							if (newNodes.length) {
								const { before, after } = node.spaces;
								const first = newNodes[0];
								const last = newNodes[newNodes.length - 1];
								first.spaces = {
									before,
									after: first.spaces.after
								};
								last.spaces = {
									before: last.spaces.before,
									after
								};
							}
							node = newNodes;
							break;
						} else {
							childContext = {
								global: context.global,
								inside: context.inside,
								lastWasSpacing: true,
								hasLocals: false,
								explicit: context.explicit
							};
							newNodes = node.map((childNode) => {
								const newContext = {
									...childContext,
									enforceNoSpacing: false
								};
								const result = transform(childNode, newContext);
								childContext.global = newContext.global;
								childContext.hasLocals = newContext.hasLocals;
								return result;
							});
							node = node.clone();
							node.nodes = normalizeNodeArray(newNodes);
							if (childContext.hasLocals) context.hasLocals = true;
						}
						break;
					} else if (isScoped) {
						if (context.inside) throw new Error(`A ${node.value} is not allowed inside of a ${context.inside}(...)`);
						const addBackSpacing = !!node.spaces.before;
						context.ignoreNextSpacing = context.lastWasSpacing ? node.value : false;
						context.enforceNoSpacing = context.lastWasSpacing ? false : node.value;
						context.global = node.value === ":global";
						context.explicit = true;
						return addBackSpacing ? selectorParser.combinator({ value: " " }) : null;
					}
					break;
				}
				case "id":
				case "class": {
					if (!node.value) throw new Error("Invalid class or id selector syntax");
					if (context.global) break;
					const isImportedValue = localAliasMap.has(node.value);
					const isImportedWithExplicitScope = isImportedValue && context.explicit;
					if (!isImportedValue || isImportedWithExplicitScope) {
						const innerNode = node.clone();
						innerNode.spaces = {
							before: "",
							after: ""
						};
						node = selectorParser.pseudo({
							value: ":local",
							nodes: [innerNode],
							spaces: node.spaces
						});
						context.hasLocals = true;
					}
					break;
				}
				case "nesting": if (node.value === "&") context.hasLocals = rule.parent[isPureSelectorSymbol];
			}
			context.lastWasSpacing = false;
			context.ignoreNextSpacing = false;
			context.enforceNoSpacing = false;
			return node;
		};
		const rootContext = {
			global: mode === "global",
			hasPureGlobals: false
		};
		rootContext.selector = selectorParser((root) => {
			transform(root, rootContext);
		}).processSync(rule, {
			updateSelector: false,
			lossless: true
		});
		return rootContext;
	}
	function localizeDeclNode(node, context) {
		switch (node.type) {
			case "word":
				if (context.localizeNextItem) {
					if (!context.localAliasMap.has(node.value)) {
						node.value = ":local(" + node.value + ")";
						context.localizeNextItem = false;
					}
				}
				break;
			case "function":
				if (context.options && context.options.rewriteUrl && node.value.toLowerCase() === "url") node.nodes.map((nestedNode) => {
					if (nestedNode.type !== "string" && nestedNode.type !== "word") return;
					let newUrl = context.options.rewriteUrl(context.global, nestedNode.value);
					switch (nestedNode.type) {
						case "string":
							if (nestedNode.quote === "'") newUrl = newUrl.replace(/(\\)/g, "\\$1").replace(/'/g, "\\'");
							if (nestedNode.quote === "\"") newUrl = newUrl.replace(/(\\)/g, "\\$1").replace(/"/g, "\\\"");
							break;
						case "word":
							newUrl = newUrl.replace(/("|'|\)|\\)/g, "\\$1");
							break;
					}
					nestedNode.value = newUrl;
				});
				break;
		}
		return node;
	}
	const specialKeywords = [
		"none",
		"inherit",
		"initial",
		"revert",
		"revert-layer",
		"unset"
	];
	function localizeDeclarationValues(localize, declaration, context) {
		const valueNodes = valueParser(declaration.value);
		valueNodes.walk((node, index, nodes) => {
			if (node.type === "function" && (node.value.toLowerCase() === "var" || node.value.toLowerCase() === "env")) return false;
			if (node.type === "word" && specialKeywords.includes(node.value.toLowerCase())) return;
			nodes[index] = localizeDeclNode(node, {
				options: context.options,
				global: context.global,
				localizeNextItem: localize && !context.global,
				localAliasMap: context.localAliasMap
			});
		});
		declaration.value = valueNodes.toString();
	}
	const validIdent = /^-?([a-z\u0080-\uFFFF_]|(\\[^\r\n\f])|-(?![0-9]))((\\[^\r\n\f])|[a-z\u0080-\uFFFF_0-9-])*$/i;
	const animationKeywords = {
		$normal: 1,
		$reverse: 1,
		$alternate: 1,
		"$alternate-reverse": 1,
		$forwards: 1,
		$backwards: 1,
		$both: 1,
		$infinite: 1,
		$paused: 1,
		$running: 1,
		$ease: 1,
		"$ease-in": 1,
		"$ease-out": 1,
		"$ease-in-out": 1,
		$linear: 1,
		"$step-end": 1,
		"$step-start": 1,
		$none: Infinity,
		$initial: Infinity,
		$inherit: Infinity,
		$unset: Infinity,
		$revert: Infinity,
		"$revert-layer": Infinity
	};
	function localizeDeclaration(declaration, context) {
		if (/animation(-name)?$/i.test(declaration.prop)) {
			let parsedAnimationKeywords = {};
			declaration.value = valueParser(declaration.value).walk((node) => {
				if (node.type === "div") {
					parsedAnimationKeywords = {};
					return;
				} else if (node.type === "function" && node.value.toLowerCase() === "local" && node.nodes.length === 1) {
					node.type = "word";
					node.value = node.nodes[0].value;
					return localizeDeclNode(node, {
						options: context.options,
						global: context.global,
						localizeNextItem: true,
						localAliasMap: context.localAliasMap
					});
				} else if (node.type === "function") {
					if (node.value.toLowerCase() === "global" && node.nodes.length === 1) {
						node.type = "word";
						node.value = node.nodes[0].value;
					}
					return false;
				} else if (node.type !== "word") return;
				const value = node.type === "word" ? node.value.toLowerCase() : null;
				let shouldParseAnimationName = false;
				if (value && validIdent.test(value)) if ("$" + value in animationKeywords) {
					parsedAnimationKeywords["$" + value] = "$" + value in parsedAnimationKeywords ? parsedAnimationKeywords["$" + value] + 1 : 0;
					shouldParseAnimationName = parsedAnimationKeywords["$" + value] >= animationKeywords["$" + value];
				} else shouldParseAnimationName = true;
				return localizeDeclNode(node, {
					options: context.options,
					global: context.global,
					localizeNextItem: shouldParseAnimationName && !context.global,
					localAliasMap: context.localAliasMap
				});
			}).toString();
			return;
		}
		if (/url\(/i.test(declaration.value)) return localizeDeclarationValues(false, declaration, context);
	}
	const isPureSelector = (context, rule) => {
		if (!rule.parent || rule.type === "root") return !context.hasPureGlobals;
		if (rule.type === "rule" && rule[isPureSelectorSymbol]) return rule[isPureSelectorSymbol] || isPureSelector(context, rule.parent);
		return !context.hasPureGlobals || isPureSelector(context, rule.parent);
	};
	const isNodeWithoutDeclarations = (rule) => {
		if (rule.nodes.length > 0) return !rule.nodes.every((item) => item.type === "rule" || item.type === "atrule" && !isNodeWithoutDeclarations(item));
		return true;
	};
	module.exports = (options = {}) => {
		if (options && options.mode && options.mode !== "global" && options.mode !== "local" && options.mode !== "pure") throw new Error("options.mode must be either \"global\", \"local\" or \"pure\" (default \"local\")");
		const pureMode = options && options.mode === "pure";
		const globalMode = options && options.mode === "global";
		return {
			postcssPlugin: "postcss-modules-local-by-default",
			prepare() {
				const localAliasMap = /* @__PURE__ */ new Map();
				return { Once(root) {
					const { icssImports } = extractICSS(root, false);
					const enforcePureMode = pureMode && !isPureCheckDisabled(root);
					Object.keys(icssImports).forEach((key) => {
						Object.keys(icssImports[key]).forEach((prop) => {
							localAliasMap.set(prop, icssImports[key][prop]);
						});
					});
					root.walkAtRules((atRule) => {
						if (/keyframes$/i.test(atRule.name)) {
							const globalMatch = /^\s*:global\s*\((.+)\)\s*$/.exec(atRule.params);
							const localMatch = /^\s*:local\s*\((.+)\)\s*$/.exec(atRule.params);
							let globalKeyframes = globalMode;
							if (globalMatch) {
								if (enforcePureMode) {
									const ignoreComment = getIgnoreComment(atRule);
									if (!ignoreComment) throw atRule.error("@keyframes :global(...) is not allowed in pure mode");
									else ignoreComment.remove();
								}
								atRule.params = globalMatch[1];
								globalKeyframes = true;
							} else if (localMatch) {
								atRule.params = localMatch[0];
								globalKeyframes = false;
							} else if (atRule.params && !globalMode && !localAliasMap.has(atRule.params)) atRule.params = ":local(" + atRule.params + ")";
							atRule.walkDecls((declaration) => {
								localizeDeclaration(declaration, {
									localAliasMap,
									options,
									global: globalKeyframes
								});
							});
						} else if (/scope$/i.test(atRule.name)) {
							if (atRule.params) {
								const ignoreComment = pureMode ? getIgnoreComment(atRule) : void 0;
								if (ignoreComment) ignoreComment.remove();
								atRule.params = atRule.params.split("to").map((item) => {
									const selector = item.trim().slice(1, -1).trim();
									const context = localizeNode(selector, options.mode, localAliasMap);
									context.options = options;
									context.localAliasMap = localAliasMap;
									if (enforcePureMode && context.hasPureGlobals && !ignoreComment) throw atRule.error("Selector in at-rule\"" + selector + "\" is not pure (pure selectors must contain at least one local class or id)");
									return `(${context.selector})`;
								}).join(" to ");
							}
							atRule.nodes.forEach((declaration) => {
								if (declaration.type === "decl") localizeDeclaration(declaration, {
									localAliasMap,
									options,
									global: globalMode
								});
							});
						} else if (atRule.nodes) atRule.nodes.forEach((declaration) => {
							if (declaration.type === "decl") localizeDeclaration(declaration, {
								localAliasMap,
								options,
								global: globalMode
							});
						});
					});
					root.walkRules((rule) => {
						if (rule.parent && rule.parent.type === "atrule" && /keyframes$/i.test(rule.parent.name)) return;
						const context = localizeNode(rule, options.mode, localAliasMap);
						context.options = options;
						context.localAliasMap = localAliasMap;
						const ignoreComment = enforcePureMode ? getIgnoreComment(rule) : void 0;
						const isNotPure = enforcePureMode && !isPureSelector(context, rule);
						if (isNotPure && isNodeWithoutDeclarations(rule) && !ignoreComment) throw rule.error("Selector \"" + rule.selector + "\" is not pure (pure selectors must contain at least one local class or id)");
						else if (ignoreComment) ignoreComment.remove();
						if (pureMode) rule[isPureSelectorSymbol] = !isNotPure;
						rule.selector = context.selector;
						if (rule.nodes) rule.nodes.forEach((declaration) => localizeDeclaration(declaration, context));
					});
				} };
			}
		};
	};
	module.exports.postcss = true;
}));

//#endregion
//#region node_modules/.pnpm/postcss-modules-scope@3.2.1_postcss@8.5.6/node_modules/postcss-modules-scope/src/index.js
var require_src$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const selectorParser = require_dist();
	const hasOwnProperty = Object.prototype.hasOwnProperty;
	function isNestedRule(rule) {
		if (!rule.parent || rule.parent.type === "root") return false;
		if (rule.parent.type === "rule") return true;
		return isNestedRule(rule.parent);
	}
	function getSingleLocalNamesForComposes(root, rule) {
		if (isNestedRule(rule)) throw new Error(`composition is not allowed in nested rule \n\n${rule}`);
		return root.nodes.map((node) => {
			if (node.type !== "selector" || node.nodes.length !== 1) throw new Error(`composition is only allowed when selector is single :local class name not in "${root}"`);
			node = node.nodes[0];
			if (node.type !== "pseudo" || node.value !== ":local" || node.nodes.length !== 1) throw new Error("composition is only allowed when selector is single :local class name not in \"" + root + "\", \"" + node + "\" is weird");
			node = node.first;
			if (node.type !== "selector" || node.length !== 1) throw new Error("composition is only allowed when selector is single :local class name not in \"" + root + "\", \"" + node + "\" is weird");
			node = node.first;
			if (node.type !== "class") throw new Error("composition is only allowed when selector is single :local class name not in \"" + root + "\", \"" + node + "\" is weird");
			return node.value;
		});
	}
	const unescapeRegExp = new RegExp("\\\\([\\da-f]{1,6}[\\x20\\t\\r\\n\\f]?|([\\x20\\t\\r\\n\\f])|.)", "ig");
	function unescape(str) {
		return str.replace(unescapeRegExp, (_, escaped, escapedWhitespace) => {
			const high = "0x" + escaped - 65536;
			return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
		});
	}
	const plugin = (options = {}) => {
		const generateScopedName = options && options.generateScopedName || plugin.generateScopedName;
		const generateExportEntry = options && options.generateExportEntry || plugin.generateExportEntry;
		const exportGlobals = options && options.exportGlobals;
		return {
			postcssPlugin: "postcss-modules-scope",
			Once(root, { rule }) {
				const exports$1 = Object.create(null);
				function exportScopedName(name, rawName, node) {
					const scopedName = generateScopedName(rawName ? rawName : name, root.source.input.from, root.source.input.css, node);
					const { key, value } = generateExportEntry(rawName ? rawName : name, scopedName, root.source.input.from, root.source.input.css, node);
					exports$1[key] = exports$1[key] || [];
					if (exports$1[key].indexOf(value) < 0) exports$1[key].push(value);
					return scopedName;
				}
				function localizeNode(node) {
					switch (node.type) {
						case "selector":
							node.nodes = node.map((item) => localizeNode(item));
							return node;
						case "class": return selectorParser.className({ value: exportScopedName(node.value, node.raws && node.raws.value ? node.raws.value : null, node) });
						case "id": return selectorParser.id({ value: exportScopedName(node.value, node.raws && node.raws.value ? node.raws.value : null, node) });
						case "attribute": if (node.attribute === "class" && node.operator === "=") return selectorParser.attribute({
							attribute: node.attribute,
							operator: node.operator,
							quoteMark: "'",
							value: exportScopedName(node.value, null, null)
						});
					}
					throw new Error(`${node.type} ("${node}") is not allowed in a :local block`);
				}
				function traverseNode(node) {
					switch (node.type) {
						case "pseudo": if (node.value === ":local") {
							if (node.nodes.length !== 1) throw new Error("Unexpected comma (\",\") in :local block");
							const selector = localizeNode(node.first);
							selector.first.spaces = node.spaces;
							const nextNode = node.next();
							if (nextNode && nextNode.type === "combinator" && nextNode.value === " " && /\\[A-F0-9]{1,6}$/.test(selector.last.value)) selector.last.spaces.after = " ";
							node.replaceWith(selector);
							return;
						}
						case "root":
						case "selector":
							node.each((item) => traverseNode(item));
							break;
						case "id":
						case "class":
							if (exportGlobals) exports$1[node.value] = [node.value];
							break;
					}
					return node;
				}
				const importedNames = {};
				root.walkRules(/^:import\(.+\)$/, (rule) => {
					rule.walkDecls((decl) => {
						importedNames[decl.prop] = true;
					});
				});
				root.walkRules((rule) => {
					let parsedSelector = selectorParser().astSync(rule);
					rule.selector = traverseNode(parsedSelector.clone()).toString();
					rule.walkDecls(/^(composes|compose-with)$/i, (decl) => {
						const localNames = getSingleLocalNamesForComposes(parsedSelector, decl.parent);
						decl.value.split(",").forEach((value) => {
							value.trim().split(/\s+/).forEach((className) => {
								const global = /^global\(([^)]+)\)$/.exec(className);
								if (global) localNames.forEach((exportedName) => {
									exports$1[exportedName].push(global[1]);
								});
								else if (hasOwnProperty.call(importedNames, className)) localNames.forEach((exportedName) => {
									exports$1[exportedName].push(className);
								});
								else if (hasOwnProperty.call(exports$1, className)) localNames.forEach((exportedName) => {
									exports$1[className].forEach((item) => {
										exports$1[exportedName].push(item);
									});
								});
								else throw decl.error(`referenced class name "${className}" in ${decl.prop} not found`);
							});
						});
						decl.remove();
					});
					rule.walkDecls((decl) => {
						if (!/:local\s*\((.+?)\)/.test(decl.value)) return;
						let tokens = decl.value.split(/(,|'[^']*'|"[^"]*")/);
						tokens = tokens.map((token, idx) => {
							if (idx === 0 || tokens[idx - 1] === ",") {
								let result = token;
								const localMatch = /:local\s*\((.+?)\)/.exec(token);
								if (localMatch) {
									const input = localMatch.input;
									const matchPattern = localMatch[0];
									const matchVal = localMatch[1];
									const newVal = exportScopedName(matchVal);
									result = input.replace(matchPattern, newVal);
								} else return token;
								return result;
							} else return token;
						});
						decl.value = tokens.join("");
					});
				});
				root.walkAtRules(/keyframes$/i, (atRule) => {
					const localMatch = /^\s*:local\s*\((.+?)\)\s*$/.exec(atRule.params);
					if (!localMatch) return;
					atRule.params = exportScopedName(localMatch[1]);
				});
				root.walkAtRules(/scope$/i, (atRule) => {
					if (atRule.params) atRule.params = atRule.params.split("to").map((item) => {
						const selector = item.trim().slice(1, -1).trim();
						if (!/^\s*:local\s*\((.+?)\)\s*$/.exec(selector)) return `(${selector})`;
						return `(${traverseNode(selectorParser().astSync(selector)).toString()})`;
					}).join(" to ");
				});
				const exportedNames = Object.keys(exports$1);
				if (exportedNames.length > 0) {
					const exportRule = rule({ selector: ":export" });
					exportedNames.forEach((exportedName) => exportRule.append({
						prop: exportedName,
						value: exports$1[exportedName].join(" "),
						raws: { before: "\n  " }
					}));
					root.append(exportRule);
				}
			}
		};
	};
	plugin.postcss = true;
	plugin.generateScopedName = function(name, path) {
		return `_${path.replace(/\.[^./\\]+$/, "").replace(/[\W_]+/g, "_").replace(/^_|_$/g, "")}__${name}`.trim();
	};
	plugin.generateExportEntry = function(name, scopedName) {
		return {
			key: unescape(name),
			value: unescape(scopedName)
		};
	};
	module.exports = plugin;
}));

//#endregion
//#region node_modules/.pnpm/string-hash@1.1.3/node_modules/string-hash/index.js
var require_string_hash = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function hash(str) {
		var hash = 5381, i = str.length;
		while (i) hash = hash * 33 ^ str.charCodeAt(--i);
		return hash >>> 0;
	}
	module.exports = hash;
}));

//#endregion
//#region node_modules/.pnpm/postcss-modules-values@4.0.0_postcss@8.5.6/node_modules/postcss-modules-values/src/index.js
var require_src = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const ICSSUtils = require_src$4();
	const matchImports = /^(.+?|\([\s\S]+?\))\s+from\s+("[^"]*"|'[^']*'|[\w-]+)$/;
	const matchValueDefinition = /(?:\s+|^)([\w-]+):?(.*?)$/;
	const matchImport = /^([\w-]+)(?:\s+as\s+([\w-]+))?/;
	module.exports = (options) => {
		let importIndex = 0;
		const createImportedName = options && options.createImportedName || ((importName) => `i__const_${importName.replace(/\W/g, "_")}_${importIndex++}`);
		return {
			postcssPlugin: "postcss-modules-values",
			prepare(result) {
				const importAliases = [];
				const definitions = {};
				return { Once(root, postcss) {
					root.walkAtRules(/value/i, (atRule) => {
						const matches = atRule.params.match(matchImports);
						if (matches) {
							let [, aliases, path] = matches;
							if (definitions[path]) path = definitions[path];
							const imports = aliases.replace(/^\(\s*([\s\S]+)\s*\)$/, "$1").split(/\s*,\s*/).map((alias) => {
								const tokens = matchImport.exec(alias);
								if (tokens) {
									const [, theirName, myName = theirName] = tokens;
									const importedName = createImportedName(myName);
									definitions[myName] = importedName;
									return {
										theirName,
										importedName
									};
								} else throw new Error(`@import statement "${alias}" is invalid!`);
							});
							importAliases.push({
								path,
								imports
							});
							atRule.remove();
							return;
						}
						if (atRule.params.indexOf("@value") !== -1) result.warn("Invalid value definition: " + atRule.params);
						let [, key, value] = `${atRule.params}${atRule.raws.between}`.match(matchValueDefinition);
						const normalizedValue = value.replace(/\/\*((?!\*\/).*?)\*\//g, "");
						if (normalizedValue.length === 0) {
							result.warn("Invalid value definition: " + atRule.params);
							atRule.remove();
							return;
						}
						if (!/^\s+$/.test(normalizedValue)) value = value.trim();
						definitions[key] = ICSSUtils.replaceValueSymbols(value, definitions);
						atRule.remove();
					});
					if (!Object.keys(definitions).length) return;
					ICSSUtils.replaceSymbols(root, definitions);
					const exportDeclarations = Object.keys(definitions).map((key) => postcss.decl({
						value: definitions[key],
						prop: key,
						raws: { before: "\n  " }
					}));
					if (exportDeclarations.length > 0) {
						const exportRule = postcss.rule({
							selector: ":export",
							raws: { after: "\n" }
						});
						exportRule.append(exportDeclarations);
						root.prepend(exportRule);
					}
					importAliases.reverse().forEach(({ path, imports }) => {
						const importRule = postcss.rule({
							selector: `:import(${path})`,
							raws: { after: "\n" }
						});
						imports.forEach(({ theirName, importedName }) => {
							importRule.append({
								value: theirName,
								prop: importedName,
								raws: { before: "\n  " }
							});
						});
						root.prepend(importRule);
					});
				} };
			}
		};
	};
	module.exports.postcss = true;
}));

//#endregion
//#region node_modules/.pnpm/postcss-modules@6.0.1_postcss@8.5.6/node_modules/postcss-modules/build/scoping.js
var require_scoping = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.behaviours = void 0;
	exports.getDefaultPlugins = getDefaultPlugins;
	exports.getDefaultScopeBehaviour = getDefaultScopeBehaviour;
	exports.getScopedNameGenerator = getScopedNameGenerator;
	var _postcssModulesExtractImports = _interopRequireDefault(require_src$3());
	var _genericNames = _interopRequireDefault(require_generic_names());
	var _postcssModulesLocalByDefault = _interopRequireDefault(require_src$2());
	var _postcssModulesScope = _interopRequireDefault(require_src$1());
	var _stringHash = _interopRequireDefault(require_string_hash());
	var _postcssModulesValues = _interopRequireDefault(require_src());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	const behaviours = {
		LOCAL: "local",
		GLOBAL: "global"
	};
	exports.behaviours = behaviours;
	function getDefaultPlugins({ behaviour, generateScopedName, exportGlobals }) {
		const scope = (0, _postcssModulesScope.default)({
			generateScopedName,
			exportGlobals
		});
		return {
			[behaviours.LOCAL]: [
				_postcssModulesValues.default,
				(0, _postcssModulesLocalByDefault.default)({ mode: "local" }),
				_postcssModulesExtractImports.default,
				scope
			],
			[behaviours.GLOBAL]: [
				_postcssModulesValues.default,
				(0, _postcssModulesLocalByDefault.default)({ mode: "global" }),
				_postcssModulesExtractImports.default,
				scope
			]
		}[behaviour];
	}
	function isValidBehaviour(behaviour) {
		return Object.keys(behaviours).map((key) => behaviours[key]).indexOf(behaviour) > -1;
	}
	function getDefaultScopeBehaviour(scopeBehaviour) {
		return scopeBehaviour && isValidBehaviour(scopeBehaviour) ? scopeBehaviour : behaviours.LOCAL;
	}
	function generateScopedNameDefault(name, filename, css) {
		const i = css.indexOf(`.${name}`);
		const lineNumber = css.substr(0, i).split(/[\r\n]/).length;
		return `_${name}_${(0, _stringHash.default)(css).toString(36).substr(0, 5)}_${lineNumber}`;
	}
	function getScopedNameGenerator(generateScopedName, hashPrefix) {
		const scopedNameGenerator = generateScopedName || generateScopedNameDefault;
		if (typeof scopedNameGenerator === "function") return scopedNameGenerator;
		return (0, _genericNames.default)(scopedNameGenerator, {
			context: process.cwd(),
			hashPrefix
		});
	}
}));

//#endregion
//#region node_modules/.pnpm/postcss-modules@6.0.1_postcss@8.5.6/node_modules/postcss-modules/build/pluginFactory.js
var require_pluginFactory = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.makePlugin = makePlugin;
	var _postcss = _interopRequireDefault(require("postcss"));
	var _unquote = _interopRequireDefault(require_unquote());
	var _Parser = _interopRequireDefault(require_Parser());
	var _saveJSON = _interopRequireDefault(require_saveJSON());
	var _localsConvention = require_localsConvention();
	var _FileSystemLoader = _interopRequireDefault(require_FileSystemLoader());
	var _scoping = require_scoping();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	const PLUGIN_NAME = "postcss-modules";
	function isGlobalModule(globalModules, inputFile) {
		return globalModules.some((regex) => inputFile.match(regex));
	}
	function getDefaultPluginsList(opts, inputFile) {
		const globalModulesList = opts.globalModulePaths || null;
		const exportGlobals = opts.exportGlobals || false;
		const defaultBehaviour = (0, _scoping.getDefaultScopeBehaviour)(opts.scopeBehaviour);
		const generateScopedName = (0, _scoping.getScopedNameGenerator)(opts.generateScopedName, opts.hashPrefix);
		if (globalModulesList && isGlobalModule(globalModulesList, inputFile)) return (0, _scoping.getDefaultPlugins)({
			behaviour: _scoping.behaviours.GLOBAL,
			generateScopedName,
			exportGlobals
		});
		return (0, _scoping.getDefaultPlugins)({
			behaviour: defaultBehaviour,
			generateScopedName,
			exportGlobals
		});
	}
	function getLoader(opts, plugins) {
		const root = typeof opts.root === "undefined" ? "/" : opts.root;
		return typeof opts.Loader === "function" ? new opts.Loader(root, plugins, opts.resolve) : new _FileSystemLoader.default(root, plugins, opts.resolve);
	}
	function isOurPlugin(plugin) {
		return plugin.postcssPlugin === PLUGIN_NAME;
	}
	function makePlugin(opts) {
		return {
			postcssPlugin: PLUGIN_NAME,
			async OnceExit(css, { result }) {
				const getJSON = opts.getJSON || _saveJSON.default;
				const inputFile = css.source.input.file;
				const pluginList = getDefaultPluginsList(opts, inputFile);
				const resultPluginIndex = result.processor.plugins.findIndex((plugin) => isOurPlugin(plugin));
				if (resultPluginIndex === -1) throw new Error("Plugin missing from options.");
				const loader = getLoader(opts, [...result.processor.plugins.slice(0, resultPluginIndex), ...pluginList]);
				const fetcher = async (file, relativeTo, depTrace) => {
					const unquoteFile = (0, _unquote.default)(file);
					return loader.fetch.call(loader, unquoteFile, relativeTo, depTrace);
				};
				const parser = new _Parser.default(fetcher);
				await (0, _postcss.default)([...pluginList, parser.plugin()]).process(css, { from: inputFile });
				const out = loader.finalSource;
				if (out) css.prepend(out);
				if (opts.localsConvention) {
					const reducer = (0, _localsConvention.makeLocalsConventionReducer)(opts.localsConvention, inputFile);
					parser.exportTokens = Object.entries(parser.exportTokens).reduce(reducer, {});
				}
				result.messages.push({
					type: "export",
					plugin: "postcss-modules",
					exportTokens: parser.exportTokens
				});
				return getJSON(css.source.input.file, parser.exportTokens, result.opts.to);
			}
		};
	}
}));

//#endregion
//#region node_modules/.pnpm/postcss-modules@6.0.1_postcss@8.5.6/node_modules/postcss-modules/build/index.js
var require_build = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _fs = require("fs");
	var _fs2 = require_fs();
	var _pluginFactory = require_pluginFactory();
	(0, _fs2.setFileSystem)({
		readFile: _fs.readFile,
		writeFile: _fs.writeFile
	});
	module.exports = (opts = {}) => (0, _pluginFactory.makePlugin)(opts);
	module.exports.postcss = true;
}));

//#endregion
//#region packages/compiler-sfc/src/compileStyle.ts
var import_build = /* @__PURE__ */ __toESM(require_build());
function compileStyle(options) {
	return doCompileStyle({
		...options,
		isAsync: false
	});
}
function compileStyleAsync(options) {
	return doCompileStyle({
		...options,
		isAsync: true
	});
}
function doCompileStyle(options) {
	const { filename, id, scoped = false, trim = true, isProd = false, modules = false, modulesOptions = {}, preprocessLang, postcssOptions, postcssPlugins } = options;
	const preprocessor = preprocessLang && processors[preprocessLang];
	const preProcessedSource = preprocessor && preprocess(options, preprocessor);
	const map = preProcessedSource ? preProcessedSource.map : options.inMap || options.map;
	const source = preProcessedSource ? preProcessedSource.code : options.source;
	const shortId = id.replace(/^data-v-/, "");
	const longId = `data-v-${shortId}`;
	const plugins = (postcssPlugins || []).slice();
	plugins.unshift(cssVarsPlugin({
		id: shortId,
		isProd
	}));
	if (trim) plugins.push(pluginTrim_default());
	if (scoped) plugins.push(pluginScoped_default(longId));
	let cssModules;
	if (modules) {
		if (!options.isAsync) throw new Error("[@vue/compiler-sfc] `modules` option can only be used with compileStyleAsync().");
		plugins.push((0, import_build.default)({
			...modulesOptions,
			getJSON: (_cssFileName, json) => {
				cssModules = json;
			}
		}));
	}
	const postCSSOptions = {
		...postcssOptions,
		to: filename,
		from: filename
	};
	if (map) postCSSOptions.map = {
		inline: false,
		annotation: false,
		prev: map
	};
	let result;
	let code;
	let outMap;
	const dependencies = new Set(preProcessedSource ? preProcessedSource.dependencies : []);
	dependencies.delete(filename);
	const errors = [];
	if (preProcessedSource && preProcessedSource.errors.length) errors.push(...preProcessedSource.errors);
	const recordPlainCssDependencies = (messages) => {
		messages.forEach((msg) => {
			if (msg.type === "dependency") dependencies.add(msg.file);
		});
		return dependencies;
	};
	try {
		result = (0, postcss.default)(plugins).process(source, postCSSOptions);
		if (options.isAsync) return result.then((result) => ({
			code: result.css || "",
			map: result.map && result.map.toJSON(),
			errors,
			modules: cssModules,
			rawResult: result,
			dependencies: recordPlainCssDependencies(result.messages)
		})).catch((error) => ({
			code: "",
			map: void 0,
			errors: [...errors, error],
			rawResult: void 0,
			dependencies
		}));
		recordPlainCssDependencies(result.messages);
		code = result.css;
		outMap = result.map;
	} catch (e) {
		errors.push(e);
	}
	return {
		code: code || ``,
		map: outMap && outMap.toJSON(),
		errors,
		rawResult: result,
		dependencies
	};
}
function preprocess(options, preprocessor) {
	return preprocessor(options.source, options.inMap || options.map, {
		filename: options.filename,
		...options.preprocessOptions
	}, options.preprocessCustomRequire);
}

//#endregion
//#region packages/compiler-sfc/src/script/analyzeScriptBindings.ts
/**
* Analyze bindings in normal `<script>`
* Note that `compileScriptSetup` already analyzes bindings as part of its
* compilation process so this should only be used on single `<script>` SFCs.
*/
function analyzeScriptBindings(ast) {
	for (const node of ast) if (node.type === "ExportDefaultDeclaration" && node.declaration.type === "ObjectExpression") return analyzeBindingsFromOptions(node.declaration);
	return {};
}
function analyzeBindingsFromOptions(node) {
	const bindings = {};
	Object.defineProperty(bindings, "__isScriptSetup", {
		enumerable: false,
		value: false
	});
	for (const property of node.properties) if (property.type === "ObjectProperty" && !property.computed && property.key.type === "Identifier") {
		if (property.key.name === "props") for (const key of getObjectOrArrayExpressionKeys(property.value)) bindings[key] = "props";
		else if (property.key.name === "inject") for (const key of getObjectOrArrayExpressionKeys(property.value)) bindings[key] = "options";
		else if (property.value.type === "ObjectExpression" && (property.key.name === "computed" || property.key.name === "methods")) for (const key of getObjectExpressionKeys(property.value)) bindings[key] = "options";
	} else if (property.type === "ObjectMethod" && property.key.type === "Identifier" && (property.key.name === "setup" || property.key.name === "data")) {
		for (const bodyItem of property.body.body) if (bodyItem.type === "ReturnStatement" && bodyItem.argument && bodyItem.argument.type === "ObjectExpression") for (const key of getObjectExpressionKeys(bodyItem.argument)) bindings[key] = property.key.name === "setup" ? "setup-maybe-ref" : "data";
	}
	return bindings;
}
function getObjectExpressionKeys(node) {
	const keys = [];
	for (const prop of node.properties) {
		if (prop.type === "SpreadElement") continue;
		const key = resolveObjectKey(prop.key, prop.computed);
		if (key) keys.push(String(key));
	}
	return keys;
}
function getArrayExpressionKeys(node) {
	const keys = [];
	for (const element of node.elements) if (element && element.type === "StringLiteral") keys.push(element.value);
	return keys;
}
function getObjectOrArrayExpressionKeys(value) {
	if (value.type === "ArrayExpression") return getArrayExpressionKeys(value);
	if (value.type === "ObjectExpression") return getObjectExpressionKeys(value);
	return [];
}

//#endregion
//#region packages/compiler-sfc/src/script/context.ts
var ScriptCompileContext = class {
	helper(key) {
		this.helperImports.add(key);
		return `_${key}`;
	}
	constructor(descriptor, options) {
		var _descriptor$scriptSet, _descriptor$scriptSet2;
		this.descriptor = descriptor;
		this.options = options;
		this.isCE = false;
		this.userImports = Object.create(null);
		this.hasDefinePropsCall = false;
		this.hasDefineEmitCall = false;
		this.hasDefineExposeCall = false;
		this.hasDefaultExportName = false;
		this.hasDefaultExportRender = false;
		this.hasDefineOptionsCall = false;
		this.hasDefineSlotsCall = false;
		this.hasDefineModelCall = false;
		this.propsDestructuredBindings = Object.create(null);
		this.modelDecls = Object.create(null);
		this.bindingMetadata = {};
		this.helperImports = /* @__PURE__ */ new Set();
		const { script, scriptSetup } = descriptor;
		const scriptLang = script && script.lang;
		const scriptSetupLang = scriptSetup && scriptSetup.lang;
		this.source = descriptor.source;
		this.filename = descriptor.filename;
		this.s = new magic_string.default(descriptor.source);
		this.startOffset = (_descriptor$scriptSet = descriptor.scriptSetup) === null || _descriptor$scriptSet === void 0 ? void 0 : _descriptor$scriptSet.loc.start.offset;
		this.endOffset = (_descriptor$scriptSet2 = descriptor.scriptSetup) === null || _descriptor$scriptSet2 === void 0 ? void 0 : _descriptor$scriptSet2.loc.end.offset;
		this.isJS = isJS(scriptLang, scriptSetupLang);
		this.isTS = isTS(scriptLang, scriptSetupLang);
		this.isUTS = scriptLang === "uts" || scriptSetupLang === "uts";
		const customElement = options.customElement;
		const filename = descriptor.filename;
		if (customElement) this.isCE = typeof customElement === "boolean" ? customElement : customElement(filename);
		const plugins = resolveParserPlugins(scriptLang || scriptSetupLang, options.babelParserPlugins);
		function parse(input, offset, startLine) {
			try {
				return (0, _babel_parser.parse)(input, {
					plugins,
					sourceType: "module"
				}).program;
			} catch (e) {
				if (e.loc && startLine) e.loc.line = e.loc.line + (startLine - 1);
				e.message = `[vue/compiler-sfc] ${e.message}\n\n${descriptor.filename}\n${(0, _vue_shared.generateCodeFrame)(descriptor.source, e.pos + offset, e.pos + offset + 1)}`;
				throw e;
			}
		}
		this.scriptAst = descriptor.script && parse(descriptor.script.content, descriptor.script.loc.start.offset, descriptor.script.loc.start.line);
		this.scriptSetupAst = descriptor.scriptSetup && parse(descriptor.scriptSetup.content, this.startOffset, descriptor.scriptSetup.loc.start.line);
	}
	getString(node, scriptSetup = true) {
		return (scriptSetup ? this.descriptor.scriptSetup : this.descriptor.script).content.slice(node.start, node.end);
	}
	warn(msg, node, scope) {
		warn(generateError(msg, node, this, scope));
	}
	error(msg, node, scope) {
		throw new Error(`[@vue/compiler-sfc] ${generateError(msg, node, this, scope)}`);
	}
};
function generateError(msg, node, ctx, scope) {
	const offset = scope ? scope.offset : ctx.startOffset;
	return `${msg}\n\n${(scope || ctx.descriptor).filename}\n${(0, _vue_shared.generateCodeFrame)((scope || ctx.descriptor).source, node.start + offset, node.end + offset)}`;
}
function resolveParserPlugins(lang, userPlugins, dts = false) {
	const plugins = [];
	if (!userPlugins || !userPlugins.some((p) => p === "importAssertions" || p === "importAttributes" || (0, _vue_shared.isArray)(p) && p[0] === "importAttributes")) plugins.push("importAttributes");
	if (lang === "jsx" || lang === "tsx" || lang === "mtsx") plugins.push("jsx");
	else if (userPlugins) userPlugins = userPlugins.filter((p) => p !== "jsx");
	if (lang === "uts" || lang === "ts" || lang === "mts" || lang === "tsx" || lang === "mtsx") {
		plugins.push(["typescript", { dts }], "explicitResourceManagement");
		if (!userPlugins || !userPlugins.includes("decorators")) plugins.push("decorators-legacy");
	}
	if (userPlugins) plugins.push(...userPlugins);
	return plugins;
}

//#endregion
//#region packages/compiler-sfc/src/rewriteDefault.ts
function rewriteDefault(input, as, parserPlugins) {
	const ast = (0, _babel_parser.parse)(input, {
		sourceType: "module",
		plugins: resolveParserPlugins("js", parserPlugins)
	}).program.body;
	const s = new magic_string.default(input);
	rewriteDefaultAST(ast, s, as);
	return s.toString();
}
/**
* Utility for rewriting `export default` in a script block into a variable
* declaration so that we can inject things into it
*/
function rewriteDefaultAST(ast, s, as) {
	if (!hasDefaultExport(ast)) {
		s.append(`\nconst ${as} = {}`);
		return;
	}
	ast.forEach((node) => {
		if (node.type === "ExportDefaultDeclaration") if (node.declaration.type === "ClassDeclaration" && node.declaration.id) {
			const start = node.declaration.decorators && node.declaration.decorators.length > 0 ? node.declaration.decorators[node.declaration.decorators.length - 1].end : node.start;
			s.overwrite(start, node.declaration.id.start, ` class `);
			s.append(`\nconst ${as} = ${node.declaration.id.name}`);
		} else s.overwrite(node.start, node.declaration.start, `const ${as} = `);
		else if (node.type === "ExportNamedDeclaration") {
			for (const specifier of node.specifiers) if (specifier.type === "ExportSpecifier" && specifier.exported.type === "Identifier" && specifier.exported.name === "default") {
				if (node.source) if (specifier.local.name === "default") {
					s.prepend(`import { default as __VUE_DEFAULT__ } from '${node.source.value}'\n`);
					const end = specifierEnd(s, specifier.local.end, node.end);
					s.remove(specifier.start, end);
					s.append(`\nconst ${as} = __VUE_DEFAULT__`);
					continue;
				} else {
					s.prepend(`import { ${s.slice(specifier.local.start, specifier.local.end)} as __VUE_DEFAULT__ } from '${node.source.value}'\n`);
					const end = specifierEnd(s, specifier.exported.end, node.end);
					s.remove(specifier.start, end);
					s.append(`\nconst ${as} = __VUE_DEFAULT__`);
					continue;
				}
				const end = specifierEnd(s, specifier.end, node.end);
				s.remove(specifier.start, end);
				s.append(`\nconst ${as} = ${specifier.local.name}`);
			}
		}
	});
}
function hasDefaultExport(ast) {
	for (const stmt of ast) if (stmt.type === "ExportDefaultDeclaration") return true;
	else if (stmt.type === "ExportNamedDeclaration" && stmt.specifiers.some((spec) => spec.exported.name === "default")) return true;
	return false;
}
function specifierEnd(s, end, nodeEnd) {
	let hasCommas = false;
	let oldEnd = end;
	while (end < nodeEnd) if (/\s/.test(s.slice(end, end + 1))) end++;
	else if (s.slice(end, end + 1) === ",") {
		end++;
		hasCommas = true;
		break;
	} else if (s.slice(end, end + 1) === "}") break;
	return hasCommas ? end : oldEnd;
}

//#endregion
//#region packages/compiler-sfc/src/script/normalScript.ts
const normalScriptDefaultVar = `__default__`;
function processNormalScript(ctx, scopeId) {
	const script = ctx.descriptor.script;
	if (script.lang && !ctx.isJS && !ctx.isTS && !ctx.isUTS) return script;
	try {
		let content = script.content;
		let map = script.map;
		const scriptAst = ctx.scriptAst;
		const bindings = analyzeScriptBindings(scriptAst.body);
		const { cssVars } = ctx.descriptor;
		const { genDefaultAs, isProd } = ctx.options;
		if (cssVars.length || genDefaultAs) {
			var _ctx$options$template;
			const defaultVar = genDefaultAs || normalScriptDefaultVar;
			const s = new magic_string.default(content);
			rewriteDefaultAST(scriptAst.body, s, defaultVar);
			if (ctx.isUTS) scriptAst.body.forEach((node) => {
				if (node.type === "ExportDefaultDeclaration") {
					if (node.declaration.type === "ObjectExpression") {
						s.appendLeft(node.declaration.start, ctx.descriptor.vapor ? `defineVaporSharedDataComponent(` : `defineComponent(`);
						s.appendRight(node.declaration.end, `)`);
					}
				}
			});
			content = s.toString();
			if (cssVars.length && !((_ctx$options$template = ctx.options.templateOptions) === null || _ctx$options$template === void 0 ? void 0 : _ctx$options$template.ssr)) content += genNormalScriptCssVarsCode(cssVars, bindings, scopeId, !!isProd, defaultVar);
			if (!genDefaultAs) content += `\nexport default ${defaultVar}`;
		}
		return {
			...script,
			content,
			map,
			bindings,
			scriptAst: scriptAst.body
		};
	} catch (e) {
		return script;
	}
}

//#endregion
//#region node_modules/.pnpm/balanced-match@4.0.4/node_modules/balanced-match/dist/esm/index.js
const balanced = (a, b, str) => {
	const ma = a instanceof RegExp ? maybeMatch(a, str) : a;
	const mb = b instanceof RegExp ? maybeMatch(b, str) : b;
	const r = ma !== null && mb != null && range(ma, mb, str);
	return r && {
		start: r[0],
		end: r[1],
		pre: str.slice(0, r[0]),
		body: str.slice(r[0] + ma.length, r[1]),
		post: str.slice(r[1] + mb.length)
	};
};
const maybeMatch = (reg, str) => {
	const m = str.match(reg);
	return m ? m[0] : null;
};
const range = (a, b, str) => {
	let begs, beg, left, right = void 0, result;
	let ai = str.indexOf(a);
	let bi = str.indexOf(b, ai + 1);
	let i = ai;
	if (ai >= 0 && bi > 0) {
		if (a === b) return [ai, bi];
		begs = [];
		left = str.length;
		while (i >= 0 && !result) {
			if (i === ai) {
				begs.push(i);
				ai = str.indexOf(a, i + 1);
			} else if (begs.length === 1) {
				const r = begs.pop();
				if (r !== void 0) result = [r, bi];
			} else {
				beg = begs.pop();
				if (beg !== void 0 && beg < left) {
					left = beg;
					right = bi;
				}
				bi = str.indexOf(b, i + 1);
			}
			i = ai < bi && ai >= 0 ? ai : bi;
		}
		if (begs.length && right !== void 0) result = [left, right];
	}
	return result;
};

//#endregion
//#region node_modules/.pnpm/brace-expansion@5.0.3/node_modules/brace-expansion/dist/esm/index.js
const escSlash = "\0SLASH" + Math.random() + "\0";
const escOpen = "\0OPEN" + Math.random() + "\0";
const escClose = "\0CLOSE" + Math.random() + "\0";
const escComma = "\0COMMA" + Math.random() + "\0";
const escPeriod = "\0PERIOD" + Math.random() + "\0";
const escSlashPattern = new RegExp(escSlash, "g");
const escOpenPattern = new RegExp(escOpen, "g");
const escClosePattern = new RegExp(escClose, "g");
const escCommaPattern = new RegExp(escComma, "g");
const escPeriodPattern = new RegExp(escPeriod, "g");
const slashPattern = /\\\\/g;
const openPattern = /\\{/g;
const closePattern = /\\}/g;
const commaPattern = /\\,/g;
const periodPattern = /\\./g;
const EXPANSION_MAX = 1e5;
function numeric(str) {
	return !isNaN(str) ? parseInt(str, 10) : str.charCodeAt(0);
}
function escapeBraces(str) {
	return str.replace(slashPattern, escSlash).replace(openPattern, escOpen).replace(closePattern, escClose).replace(commaPattern, escComma).replace(periodPattern, escPeriod);
}
function unescapeBraces(str) {
	return str.replace(escSlashPattern, "\\").replace(escOpenPattern, "{").replace(escClosePattern, "}").replace(escCommaPattern, ",").replace(escPeriodPattern, ".");
}
/**
* Basically just str.split(","), but handling cases
* where we have nested braced sections, which should be
* treated as individual members, like {a,{b,c},d}
*/
function parseCommaParts(str) {
	if (!str) return [""];
	const parts = [];
	const m = balanced("{", "}", str);
	if (!m) return str.split(",");
	const { pre, body, post } = m;
	const p = pre.split(",");
	p[p.length - 1] += "{" + body + "}";
	const postParts = parseCommaParts(post);
	if (post.length) {
		p[p.length - 1] += postParts.shift();
		p.push.apply(p, postParts);
	}
	parts.push.apply(parts, p);
	return parts;
}
function expand(str, options = {}) {
	if (!str) return [];
	const { max = EXPANSION_MAX } = options;
	if (str.slice(0, 2) === "{}") str = "\\{\\}" + str.slice(2);
	return expand_(escapeBraces(str), max, true).map(unescapeBraces);
}
function embrace(str) {
	return "{" + str + "}";
}
function isPadded(el) {
	return /^-?0\d/.test(el);
}
function lte(i, y) {
	return i <= y;
}
function gte(i, y) {
	return i >= y;
}
function expand_(str, max, isTop) {
	/** @type {string[]} */
	const expansions = [];
	const m = balanced("{", "}", str);
	if (!m) return [str];
	const pre = m.pre;
	const post = m.post.length ? expand_(m.post, max, false) : [""];
	if (/\$$/.test(m.pre)) for (let k = 0; k < post.length && k < max; k++) {
		const expansion = pre + "{" + m.body + "}" + post[k];
		expansions.push(expansion);
	}
	else {
		const isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
		const isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
		const isSequence = isNumericSequence || isAlphaSequence;
		const isOptions = m.body.indexOf(",") >= 0;
		if (!isSequence && !isOptions) {
			if (m.post.match(/,(?!,).*\}/)) {
				str = m.pre + "{" + m.body + escClose + m.post;
				return expand_(str, max, true);
			}
			return [str];
		}
		let n;
		if (isSequence) n = m.body.split(/\.\./);
		else {
			n = parseCommaParts(m.body);
			if (n.length === 1 && n[0] !== void 0) {
				n = expand_(n[0], max, false).map(embrace);
				/* c8 ignore start */
				if (n.length === 1) return post.map((p) => m.pre + n[0] + p);
			}
		}
		let N;
		if (isSequence && n[0] !== void 0 && n[1] !== void 0) {
			const x = numeric(n[0]);
			const y = numeric(n[1]);
			const width = Math.max(n[0].length, n[1].length);
			let incr = n.length === 3 && n[2] !== void 0 ? Math.abs(numeric(n[2])) : 1;
			let test = lte;
			if (y < x) {
				incr *= -1;
				test = gte;
			}
			const pad = n.some(isPadded);
			N = [];
			for (let i = x; test(i, y); i += incr) {
				let c;
				if (isAlphaSequence) {
					c = String.fromCharCode(i);
					if (c === "\\") c = "";
				} else {
					c = String(i);
					if (pad) {
						const need = width - c.length;
						if (need > 0) {
							const z = new Array(need + 1).join("0");
							if (i < 0) c = "-" + z + c.slice(1);
							else c = z + c;
						}
					}
				}
				N.push(c);
			}
		} else {
			N = [];
			for (let j = 0; j < n.length; j++) N.push.apply(N, expand_(n[j], max, false));
		}
		for (let j = 0; j < N.length; j++) for (let k = 0; k < post.length && expansions.length < max; k++) {
			const expansion = pre + N[j] + post[k];
			if (!isTop || isSequence || expansion) expansions.push(expansion);
		}
	}
	return expansions;
}

//#endregion
//#region node_modules/.pnpm/minimatch@10.1.3/node_modules/minimatch/dist/esm/assert-valid-pattern.js
const MAX_PATTERN_LENGTH = 1024 * 64;
const assertValidPattern = (pattern) => {
	if (typeof pattern !== "string") throw new TypeError("invalid pattern");
	if (pattern.length > MAX_PATTERN_LENGTH) throw new TypeError("pattern is too long");
};

//#endregion
//#region node_modules/.pnpm/minimatch@10.1.3/node_modules/minimatch/dist/esm/brace-expressions.js
const posixClasses = {
	"[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", true],
	"[:alpha:]": ["\\p{L}\\p{Nl}", true],
	"[:ascii:]": ["\\x00-\\x7f", false],
	"[:blank:]": ["\\p{Zs}\\t", true],
	"[:cntrl:]": ["\\p{Cc}", true],
	"[:digit:]": ["\\p{Nd}", true],
	"[:graph:]": [
		"\\p{Z}\\p{C}",
		true,
		true
	],
	"[:lower:]": ["\\p{Ll}", true],
	"[:print:]": ["\\p{C}", true],
	"[:punct:]": ["\\p{P}", true],
	"[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", true],
	"[:upper:]": ["\\p{Lu}", true],
	"[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", true],
	"[:xdigit:]": ["A-Fa-f0-9", false]
};
const braceEscape = (s) => s.replace(/[[\]\\-]/g, "\\$&");
const regexpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
const rangesToString = (ranges) => ranges.join("");
const parseClass = (glob, position) => {
	const pos = position;
	/* c8 ignore start */
	if (glob.charAt(pos) !== "[") throw new Error("not in a brace expression");
	/* c8 ignore stop */
	const ranges = [];
	const negs = [];
	let i = pos + 1;
	let sawStart = false;
	let uflag = false;
	let escaping = false;
	let negate = false;
	let endPos = pos;
	let rangeStart = "";
	WHILE: while (i < glob.length) {
		const c = glob.charAt(i);
		if ((c === "!" || c === "^") && i === pos + 1) {
			negate = true;
			i++;
			continue;
		}
		if (c === "]" && sawStart && !escaping) {
			endPos = i + 1;
			break;
		}
		sawStart = true;
		if (c === "\\") {
			if (!escaping) {
				escaping = true;
				i++;
				continue;
			}
		}
		if (c === "[" && !escaping) {
			for (const [cls, [unip, u, neg]] of Object.entries(posixClasses)) if (glob.startsWith(cls, i)) {
				if (rangeStart) return [
					"$.",
					false,
					glob.length - pos,
					true
				];
				i += cls.length;
				if (neg) negs.push(unip);
				else ranges.push(unip);
				uflag = uflag || u;
				continue WHILE;
			}
		}
		escaping = false;
		if (rangeStart) {
			if (c > rangeStart) ranges.push(braceEscape(rangeStart) + "-" + braceEscape(c));
			else if (c === rangeStart) ranges.push(braceEscape(c));
			rangeStart = "";
			i++;
			continue;
		}
		if (glob.startsWith("-]", i + 1)) {
			ranges.push(braceEscape(c + "-"));
			i += 2;
			continue;
		}
		if (glob.startsWith("-", i + 1)) {
			rangeStart = c;
			i += 2;
			continue;
		}
		ranges.push(braceEscape(c));
		i++;
	}
	if (endPos < i) return [
		"",
		false,
		0,
		false
	];
	if (!ranges.length && !negs.length) return [
		"$.",
		false,
		glob.length - pos,
		true
	];
	if (negs.length === 0 && ranges.length === 1 && /^\\?.$/.test(ranges[0]) && !negate) return [
		regexpEscape(ranges[0].length === 2 ? ranges[0].slice(-1) : ranges[0]),
		false,
		endPos - pos,
		false
	];
	const sranges = "[" + (negate ? "^" : "") + rangesToString(ranges) + "]";
	const snegs = "[" + (negate ? "" : "^") + rangesToString(negs) + "]";
	return [
		ranges.length && negs.length ? "(" + sranges + "|" + snegs + ")" : ranges.length ? sranges : snegs,
		uflag,
		endPos - pos,
		true
	];
};

//#endregion
//#region node_modules/.pnpm/minimatch@10.1.3/node_modules/minimatch/dist/esm/unescape.js
/**
* Un-escape a string that has been escaped with {@link escape}.
*
* If the {@link MinimatchOptions.windowsPathsNoEscape} option is used, then
* square-bracket escapes are removed, but not backslash escapes.
*
* For example, it will turn the string `'[*]'` into `*`, but it will not
* turn `'\\*'` into `'*'`, because `\` is a path separator in
* `windowsPathsNoEscape` mode.
*
* When `windowsPathsNoEscape` is not set, then both square-bracket escapes and
* backslash escapes are removed.
*
* Slashes (and backslashes in `windowsPathsNoEscape` mode) cannot be escaped
* or unescaped.
*
* When `magicalBraces` is not set, escapes of braces (`{` and `}`) will not be
* unescaped.
*/
const unescape = (s, { windowsPathsNoEscape = false, magicalBraces = true } = {}) => {
	if (magicalBraces) return windowsPathsNoEscape ? s.replace(/\[([^\/\\])\]/g, "$1") : s.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1");
	return windowsPathsNoEscape ? s.replace(/\[([^\/\\{}])\]/g, "$1") : s.replace(/((?!\\).|^)\[([^\/\\{}])\]/g, "$1$2").replace(/\\([^\/{}])/g, "$1");
};

//#endregion
//#region node_modules/.pnpm/minimatch@10.1.3/node_modules/minimatch/dist/esm/ast.js
var _AST;
const types = new Set([
	"!",
	"?",
	"+",
	"*",
	"@"
]);
const isExtglobType = (c) => types.has(c);
const startNoTraversal = "(?!(?:^|/)\\.\\.?(?:$|/))";
const startNoDot = "(?!\\.)";
const addPatternStart = new Set(["[", "."]);
const justDots = new Set(["..", "."]);
const reSpecials = /* @__PURE__ */ new Set("().*{}+?[]^$\\!");
const regExpEscape$1 = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
const qmark = "[^/]";
const star$1 = qmark + "*?";
const starNoEmpty = qmark + "+?";
var _root = /* @__PURE__ */ new WeakMap();
var _hasMagic2 = /* @__PURE__ */ new WeakMap();
var _uflag = /* @__PURE__ */ new WeakMap();
var _parts = /* @__PURE__ */ new WeakMap();
var _parent = /* @__PURE__ */ new WeakMap();
var _parentIndex = /* @__PURE__ */ new WeakMap();
var _negs = /* @__PURE__ */ new WeakMap();
var _filledNegs = /* @__PURE__ */ new WeakMap();
var _options = /* @__PURE__ */ new WeakMap();
var _toString = /* @__PURE__ */ new WeakMap();
var _emptyExt = /* @__PURE__ */ new WeakMap();
var _AST_brand = /* @__PURE__ */ new WeakSet();
var AST = class AST {
	constructor(type, parent, options = {}) {
		_classPrivateMethodInitSpec(this, _AST_brand);
		_classPrivateFieldInitSpec(this, _root, void 0);
		_classPrivateFieldInitSpec(this, _hasMagic2, void 0);
		_classPrivateFieldInitSpec(this, _uflag, false);
		_classPrivateFieldInitSpec(this, _parts, []);
		_classPrivateFieldInitSpec(this, _parent, void 0);
		_classPrivateFieldInitSpec(this, _parentIndex, void 0);
		_classPrivateFieldInitSpec(this, _negs, void 0);
		_classPrivateFieldInitSpec(this, _filledNegs, false);
		_classPrivateFieldInitSpec(this, _options, void 0);
		_classPrivateFieldInitSpec(this, _toString, void 0);
		_classPrivateFieldInitSpec(this, _emptyExt, false);
		this.type = type;
		if (type) _classPrivateFieldSet2(_hasMagic2, this, true);
		_classPrivateFieldSet2(_parent, this, parent);
		_classPrivateFieldSet2(_root, this, _classPrivateFieldGet2(_parent, this) ? _classPrivateFieldGet2(_root, _classPrivateFieldGet2(_parent, this)) : this);
		_classPrivateFieldSet2(_options, this, _classPrivateFieldGet2(_root, this) === this ? options : _classPrivateFieldGet2(_options, _classPrivateFieldGet2(_root, this)));
		_classPrivateFieldSet2(_negs, this, _classPrivateFieldGet2(_root, this) === this ? [] : _classPrivateFieldGet2(_negs, _classPrivateFieldGet2(_root, this)));
		if (type === "!" && !_classPrivateFieldGet2(_filledNegs, _classPrivateFieldGet2(_root, this))) _classPrivateFieldGet2(_negs, this).push(this);
		_classPrivateFieldSet2(_parentIndex, this, _classPrivateFieldGet2(_parent, this) ? _classPrivateFieldGet2(_parts, _classPrivateFieldGet2(_parent, this)).length : 0);
	}
	get hasMagic() {
		/* c8 ignore start */
		if (_classPrivateFieldGet2(_hasMagic2, this) !== void 0) return _classPrivateFieldGet2(_hasMagic2, this);
		/* c8 ignore stop */
		for (const p of _classPrivateFieldGet2(_parts, this)) {
			if (typeof p === "string") continue;
			if (p.type || p.hasMagic) return _classPrivateFieldSet2(_hasMagic2, this, true);
		}
		return _classPrivateFieldGet2(_hasMagic2, this);
	}
	toString() {
		if (_classPrivateFieldGet2(_toString, this) !== void 0) return _classPrivateFieldGet2(_toString, this);
		if (!this.type) return _classPrivateFieldSet2(_toString, this, _classPrivateFieldGet2(_parts, this).map((p) => String(p)).join(""));
		else return _classPrivateFieldSet2(_toString, this, this.type + "(" + _classPrivateFieldGet2(_parts, this).map((p) => String(p)).join("|") + ")");
	}
	push(...parts) {
		for (const p of parts) {
			if (p === "") continue;
			/* c8 ignore start */
			if (typeof p !== "string" && !(p instanceof AST && _classPrivateFieldGet2(_parent, p) === this)) throw new Error("invalid part: " + p);
			/* c8 ignore stop */
			_classPrivateFieldGet2(_parts, this).push(p);
		}
	}
	toJSON() {
		var _classPrivateFieldGet2$1;
		const ret = this.type === null ? _classPrivateFieldGet2(_parts, this).slice().map((p) => typeof p === "string" ? p : p.toJSON()) : [this.type, ..._classPrivateFieldGet2(_parts, this).map((p) => p.toJSON())];
		if (this.isStart() && !this.type) ret.unshift([]);
		if (this.isEnd() && (this === _classPrivateFieldGet2(_root, this) || _classPrivateFieldGet2(_filledNegs, _classPrivateFieldGet2(_root, this)) && ((_classPrivateFieldGet2$1 = _classPrivateFieldGet2(_parent, this)) === null || _classPrivateFieldGet2$1 === void 0 ? void 0 : _classPrivateFieldGet2$1.type) === "!")) ret.push({});
		return ret;
	}
	isStart() {
		var _classPrivateFieldGet3;
		if (_classPrivateFieldGet2(_root, this) === this) return true;
		if (!((_classPrivateFieldGet3 = _classPrivateFieldGet2(_parent, this)) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.isStart())) return false;
		if (_classPrivateFieldGet2(_parentIndex, this) === 0) return true;
		const p = _classPrivateFieldGet2(_parent, this);
		for (let i = 0; i < _classPrivateFieldGet2(_parentIndex, this); i++) {
			const pp = _classPrivateFieldGet2(_parts, p)[i];
			if (!(pp instanceof AST && pp.type === "!")) return false;
		}
		return true;
	}
	isEnd() {
		var _classPrivateFieldGet4, _classPrivateFieldGet5, _classPrivateFieldGet6;
		if (_classPrivateFieldGet2(_root, this) === this) return true;
		if (((_classPrivateFieldGet4 = _classPrivateFieldGet2(_parent, this)) === null || _classPrivateFieldGet4 === void 0 ? void 0 : _classPrivateFieldGet4.type) === "!") return true;
		if (!((_classPrivateFieldGet5 = _classPrivateFieldGet2(_parent, this)) === null || _classPrivateFieldGet5 === void 0 ? void 0 : _classPrivateFieldGet5.isEnd())) return false;
		if (!this.type) return (_classPrivateFieldGet6 = _classPrivateFieldGet2(_parent, this)) === null || _classPrivateFieldGet6 === void 0 ? void 0 : _classPrivateFieldGet6.isEnd();
		/* c8 ignore start */
		const pl = _classPrivateFieldGet2(_parent, this) ? _classPrivateFieldGet2(_parts, _classPrivateFieldGet2(_parent, this)).length : 0;
		/* c8 ignore stop */
		return _classPrivateFieldGet2(_parentIndex, this) === pl - 1;
	}
	copyIn(part) {
		if (typeof part === "string") this.push(part);
		else this.push(part.clone(this));
	}
	clone(parent) {
		const c = new AST(this.type, parent);
		for (const p of _classPrivateFieldGet2(_parts, this)) c.copyIn(p);
		return c;
	}
	static fromGlob(pattern, options = {}) {
		const ast = new AST(null, void 0, options);
		_parseAST.call(AST, pattern, ast, 0, options);
		return ast;
	}
	toMMPattern() {
		/* c8 ignore start */
		if (this !== _classPrivateFieldGet2(_root, this)) return _classPrivateFieldGet2(_root, this).toMMPattern();
		/* c8 ignore stop */
		const glob = this.toString();
		const [re, body, hasMagic, uflag] = this.toRegExpSource();
		if (!(hasMagic || _classPrivateFieldGet2(_hasMagic2, this) || _classPrivateFieldGet2(_options, this).nocase && !_classPrivateFieldGet2(_options, this).nocaseMagicOnly && glob.toUpperCase() !== glob.toLowerCase())) return body;
		const flags = (_classPrivateFieldGet2(_options, this).nocase ? "i" : "") + (uflag ? "u" : "");
		return Object.assign(new RegExp(`^${re}$`, flags), {
			_src: re,
			_glob: glob
		});
	}
	get options() {
		return _classPrivateFieldGet2(_options, this);
	}
	toRegExpSource(allowDot) {
		const dot = allowDot !== null && allowDot !== void 0 ? allowDot : !!_classPrivateFieldGet2(_options, this).dot;
		if (_classPrivateFieldGet2(_root, this) === this) _assertClassBrand(_AST_brand, this, _fillNegs).call(this);
		if (!this.type) {
			var _classPrivateFieldGet7;
			const noEmpty = this.isStart() && this.isEnd() && !_classPrivateFieldGet2(_parts, this).some((s) => typeof s !== "string");
			const src = _classPrivateFieldGet2(_parts, this).map((p) => {
				const [re, _, hasMagic, uflag] = typeof p === "string" ? _parseGlob.call(AST, p, _classPrivateFieldGet2(_hasMagic2, this), noEmpty) : p.toRegExpSource(allowDot);
				_classPrivateFieldSet2(_hasMagic2, this, _classPrivateFieldGet2(_hasMagic2, this) || hasMagic);
				_classPrivateFieldSet2(_uflag, this, _classPrivateFieldGet2(_uflag, this) || uflag);
				return re;
			}).join("");
			let start = "";
			if (this.isStart()) {
				if (typeof _classPrivateFieldGet2(_parts, this)[0] === "string") {
					if (!(_classPrivateFieldGet2(_parts, this).length === 1 && justDots.has(_classPrivateFieldGet2(_parts, this)[0]))) {
						const aps = addPatternStart;
						const needNoTrav = dot && aps.has(src.charAt(0)) || src.startsWith("\\.") && aps.has(src.charAt(2)) || src.startsWith("\\.\\.") && aps.has(src.charAt(4));
						const needNoDot = !dot && !allowDot && aps.has(src.charAt(0));
						start = needNoTrav ? startNoTraversal : needNoDot ? startNoDot : "";
					}
				}
			}
			let end = "";
			if (this.isEnd() && _classPrivateFieldGet2(_filledNegs, _classPrivateFieldGet2(_root, this)) && ((_classPrivateFieldGet7 = _classPrivateFieldGet2(_parent, this)) === null || _classPrivateFieldGet7 === void 0 ? void 0 : _classPrivateFieldGet7.type) === "!") end = "(?:$|\\/)";
			return [
				start + src + end,
				unescape(src),
				_classPrivateFieldSet2(_hasMagic2, this, !!_classPrivateFieldGet2(_hasMagic2, this)),
				_classPrivateFieldGet2(_uflag, this)
			];
		}
		const repeated = this.type === "*" || this.type === "+";
		const start = this.type === "!" ? "(?:(?!(?:" : "(?:";
		let body = _assertClassBrand(_AST_brand, this, _partsToRegExp).call(this, dot);
		if (this.isStart() && this.isEnd() && !body && this.type !== "!") {
			const s = this.toString();
			_classPrivateFieldSet2(_parts, this, [s]);
			this.type = null;
			_classPrivateFieldSet2(_hasMagic2, this, void 0);
			return [
				s,
				unescape(this.toString()),
				false,
				false
			];
		}
		let bodyDotAllowed = !repeated || allowDot || dot || false ? "" : _assertClassBrand(_AST_brand, this, _partsToRegExp).call(this, true);
		if (bodyDotAllowed === body) bodyDotAllowed = "";
		if (bodyDotAllowed) body = `(?:${body})(?:${bodyDotAllowed})*?`;
		let final = "";
		if (this.type === "!" && _classPrivateFieldGet2(_emptyExt, this)) final = (this.isStart() && !dot ? startNoDot : "") + starNoEmpty;
		else {
			const close = this.type === "!" ? "))" + (this.isStart() && !dot && !allowDot ? startNoDot : "") + star$1 + ")" : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && bodyDotAllowed ? ")" : this.type === "*" && bodyDotAllowed ? `)?` : `)${this.type}`;
			final = start + body + close;
		}
		return [
			final,
			unescape(body),
			_classPrivateFieldSet2(_hasMagic2, this, !!_classPrivateFieldGet2(_hasMagic2, this)),
			_classPrivateFieldGet2(_uflag, this)
		];
	}
};
_AST = AST;
function _fillNegs() {
	/* c8 ignore start */
	if (this !== _classPrivateFieldGet2(_root, this)) throw new Error("should only call on root");
	if (_classPrivateFieldGet2(_filledNegs, this)) return this;
	/* c8 ignore stop */
	this.toString();
	_classPrivateFieldSet2(_filledNegs, this, true);
	let n;
	while (n = _classPrivateFieldGet2(_negs, this).pop()) {
		if (n.type !== "!") continue;
		let p = n;
		let pp = _classPrivateFieldGet2(_parent, p);
		while (pp) {
			for (let i = _classPrivateFieldGet2(_parentIndex, p) + 1; !pp.type && i < _classPrivateFieldGet2(_parts, pp).length; i++) for (const part of _classPrivateFieldGet2(_parts, n)) {
				/* c8 ignore start */
				if (typeof part === "string") throw new Error("string part in extglob AST??");
				/* c8 ignore stop */
				part.copyIn(_classPrivateFieldGet2(_parts, pp)[i]);
			}
			p = pp;
			pp = _classPrivateFieldGet2(_parent, p);
		}
	}
	return this;
}
function _parseAST(str, ast, pos, opt) {
	let escaping = false;
	let inBrace = false;
	let braceStart = -1;
	let braceNeg = false;
	if (ast.type === null) {
		let i = pos;
		let acc = "";
		while (i < str.length) {
			const c = str.charAt(i++);
			if (escaping || c === "\\") {
				escaping = !escaping;
				acc += c;
				continue;
			}
			if (inBrace) {
				if (i === braceStart + 1) {
					if (c === "^" || c === "!") braceNeg = true;
				} else if (c === "]" && !(i === braceStart + 2 && braceNeg)) inBrace = false;
				acc += c;
				continue;
			} else if (c === "[") {
				inBrace = true;
				braceStart = i;
				braceNeg = false;
				acc += c;
				continue;
			}
			if (!opt.noext && isExtglobType(c) && str.charAt(i) === "(") {
				ast.push(acc);
				acc = "";
				const ext = new _AST(c, ast);
				i = _parseAST.call(_AST, str, ext, i, opt);
				ast.push(ext);
				continue;
			}
			acc += c;
		}
		ast.push(acc);
		return i;
	}
	let i = pos + 1;
	let part = new _AST(null, ast);
	const parts = [];
	let acc = "";
	while (i < str.length) {
		const c = str.charAt(i++);
		if (escaping || c === "\\") {
			escaping = !escaping;
			acc += c;
			continue;
		}
		if (inBrace) {
			if (i === braceStart + 1) {
				if (c === "^" || c === "!") braceNeg = true;
			} else if (c === "]" && !(i === braceStart + 2 && braceNeg)) inBrace = false;
			acc += c;
			continue;
		} else if (c === "[") {
			inBrace = true;
			braceStart = i;
			braceNeg = false;
			acc += c;
			continue;
		}
		if (isExtglobType(c) && str.charAt(i) === "(") {
			part.push(acc);
			acc = "";
			const ext = new _AST(c, part);
			part.push(ext);
			i = _parseAST.call(_AST, str, ext, i, opt);
			continue;
		}
		if (c === "|") {
			part.push(acc);
			acc = "";
			parts.push(part);
			part = new _AST(null, ast);
			continue;
		}
		if (c === ")") {
			if (acc === "" && _classPrivateFieldGet2(_parts, ast).length === 0) _classPrivateFieldSet2(_emptyExt, ast, true);
			part.push(acc);
			acc = "";
			ast.push(...parts, part);
			return i;
		}
		acc += c;
	}
	ast.type = null;
	_classPrivateFieldSet2(_hasMagic2, ast, void 0);
	_classPrivateFieldSet2(_parts, ast, [str.substring(pos - 1)]);
	return i;
}
function _partsToRegExp(dot) {
	return _classPrivateFieldGet2(_parts, this).map((p) => {
		/* c8 ignore start */
		if (typeof p === "string") throw new Error("string type in extglob ast??");
		/* c8 ignore stop */
		const [re, _, _hasMagic, uflag] = p.toRegExpSource(dot);
		_classPrivateFieldSet2(_uflag, this, _classPrivateFieldGet2(_uflag, this) || uflag);
		return re;
	}).filter((p) => !(this.isStart() && this.isEnd()) || !!p).join("|");
}
function _parseGlob(glob, hasMagic, noEmpty = false) {
	let escaping = false;
	let re = "";
	let uflag = false;
	for (let i = 0; i < glob.length; i++) {
		const c = glob.charAt(i);
		if (escaping) {
			escaping = false;
			re += (reSpecials.has(c) ? "\\" : "") + c;
			continue;
		}
		if (c === "\\") {
			if (i === glob.length - 1) re += "\\\\";
			else escaping = true;
			continue;
		}
		if (c === "[") {
			const [src, needUflag, consumed, magic] = parseClass(glob, i);
			if (consumed) {
				re += src;
				uflag = uflag || needUflag;
				i += consumed - 1;
				hasMagic = hasMagic || magic;
				continue;
			}
		}
		if (c === "*") {
			re += noEmpty && glob === "*" ? starNoEmpty : star$1;
			hasMagic = true;
			continue;
		}
		if (c === "?") {
			re += qmark;
			hasMagic = true;
			continue;
		}
		re += regExpEscape$1(c);
	}
	return [
		re,
		unescape(glob),
		!!hasMagic,
		uflag
	];
}

//#endregion
//#region node_modules/.pnpm/minimatch@10.1.3/node_modules/minimatch/dist/esm/escape.js
/**
* Escape all magic characters in a glob pattern.
*
* If the {@link MinimatchOptions.windowsPathsNoEscape}
* option is used, then characters are escaped by wrapping in `[]`, because
* a magic character wrapped in a character class can only be satisfied by
* that exact character.  In this mode, `\` is _not_ escaped, because it is
* not interpreted as a magic character, but instead as a path separator.
*
* If the {@link MinimatchOptions.magicalBraces} option is used,
* then braces (`{` and `}`) will be escaped.
*/
const escape = (s, { windowsPathsNoEscape = false, magicalBraces = false } = {}) => {
	if (magicalBraces) return windowsPathsNoEscape ? s.replace(/[?*()[\]{}]/g, "[$&]") : s.replace(/[?*()[\]\\{}]/g, "\\$&");
	return windowsPathsNoEscape ? s.replace(/[?*()[\]]/g, "[$&]") : s.replace(/[?*()[\]\\]/g, "\\$&");
};

//#endregion
//#region node_modules/.pnpm/minimatch@10.1.3/node_modules/minimatch/dist/esm/index.js
const minimatch = (p, pattern, options = {}) => {
	assertValidPattern(pattern);
	if (!options.nocomment && pattern.charAt(0) === "#") return false;
	return new Minimatch(pattern, options).match(p);
};
const starDotExtRE = /^\*+([^+@!?\*\[\(]*)$/;
const starDotExtTest = (ext) => (f) => !f.startsWith(".") && f.endsWith(ext);
const starDotExtTestDot = (ext) => (f) => f.endsWith(ext);
const starDotExtTestNocase = (ext) => {
	ext = ext.toLowerCase();
	return (f) => !f.startsWith(".") && f.toLowerCase().endsWith(ext);
};
const starDotExtTestNocaseDot = (ext) => {
	ext = ext.toLowerCase();
	return (f) => f.toLowerCase().endsWith(ext);
};
const starDotStarRE = /^\*+\.\*+$/;
const starDotStarTest = (f) => !f.startsWith(".") && f.includes(".");
const starDotStarTestDot = (f) => f !== "." && f !== ".." && f.includes(".");
const dotStarRE = /^\.\*+$/;
const dotStarTest = (f) => f !== "." && f !== ".." && f.startsWith(".");
const starRE = /^\*+$/;
const starTest = (f) => f.length !== 0 && !f.startsWith(".");
const starTestDot = (f) => f.length !== 0 && f !== "." && f !== "..";
const qmarksRE = /^\?+([^+@!?\*\[\(]*)?$/;
const qmarksTestNocase = ([$0, ext = ""]) => {
	const noext = qmarksTestNoExt([$0]);
	if (!ext) return noext;
	ext = ext.toLowerCase();
	return (f) => noext(f) && f.toLowerCase().endsWith(ext);
};
const qmarksTestNocaseDot = ([$0, ext = ""]) => {
	const noext = qmarksTestNoExtDot([$0]);
	if (!ext) return noext;
	ext = ext.toLowerCase();
	return (f) => noext(f) && f.toLowerCase().endsWith(ext);
};
const qmarksTestDot = ([$0, ext = ""]) => {
	const noext = qmarksTestNoExtDot([$0]);
	return !ext ? noext : (f) => noext(f) && f.endsWith(ext);
};
const qmarksTest = ([$0, ext = ""]) => {
	const noext = qmarksTestNoExt([$0]);
	return !ext ? noext : (f) => noext(f) && f.endsWith(ext);
};
const qmarksTestNoExt = ([$0]) => {
	const len = $0.length;
	return (f) => f.length === len && !f.startsWith(".");
};
const qmarksTestNoExtDot = ([$0]) => {
	const len = $0.length;
	return (f) => f.length === len && f !== "." && f !== "..";
};
/* c8 ignore start */
const defaultPlatform = typeof process === "object" && process ? typeof process.env === "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix";
const path$1 = {
	win32: { sep: "\\" },
	posix: { sep: "/" }
};
/* c8 ignore stop */
const sep = defaultPlatform === "win32" ? path$1.win32.sep : path$1.posix.sep;
minimatch.sep = sep;
const GLOBSTAR = Symbol("globstar **");
minimatch.GLOBSTAR = GLOBSTAR;
const star = "[^/]*?";
const twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
const twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
const filter = (pattern, options = {}) => (p) => minimatch(p, pattern, options);
minimatch.filter = filter;
const ext = (a, b = {}) => Object.assign({}, a, b);
const defaults = (def) => {
	if (!def || typeof def !== "object" || !Object.keys(def).length) return minimatch;
	const orig = minimatch;
	const m = (p, pattern, options = {}) => orig(p, pattern, ext(def, options));
	return Object.assign(m, {
		Minimatch: class Minimatch extends orig.Minimatch {
			constructor(pattern, options = {}) {
				super(pattern, ext(def, options));
			}
			static defaults(options) {
				return orig.defaults(ext(def, options)).Minimatch;
			}
		},
		AST: class AST extends orig.AST {
			/* c8 ignore start */
			constructor(type, parent, options = {}) {
				super(type, parent, ext(def, options));
			}
			/* c8 ignore stop */
			static fromGlob(pattern, options = {}) {
				return orig.AST.fromGlob(pattern, ext(def, options));
			}
		},
		unescape: (s, options = {}) => orig.unescape(s, ext(def, options)),
		escape: (s, options = {}) => orig.escape(s, ext(def, options)),
		filter: (pattern, options = {}) => orig.filter(pattern, ext(def, options)),
		defaults: (options) => orig.defaults(ext(def, options)),
		makeRe: (pattern, options = {}) => orig.makeRe(pattern, ext(def, options)),
		braceExpand: (pattern, options = {}) => orig.braceExpand(pattern, ext(def, options)),
		match: (list, pattern, options = {}) => orig.match(list, pattern, ext(def, options)),
		sep: orig.sep,
		GLOBSTAR
	});
};
minimatch.defaults = defaults;
const braceExpand = (pattern, options = {}) => {
	assertValidPattern(pattern);
	if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) return [pattern];
	return expand(pattern);
};
minimatch.braceExpand = braceExpand;
const makeRe = (pattern, options = {}) => new Minimatch(pattern, options).makeRe();
minimatch.makeRe = makeRe;
const match = (list, pattern, options = {}) => {
	const mm = new Minimatch(pattern, options);
	list = list.filter((f) => mm.match(f));
	if (mm.options.nonull && !list.length) list.push(pattern);
	return list;
};
minimatch.match = match;
const globMagic = /[?*]|[+@!]\(.*?\)|\[|\]/;
const regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var Minimatch = class {
	constructor(pattern, options = {}) {
		assertValidPattern(pattern);
		options = options || {};
		this.options = options;
		this.pattern = pattern;
		this.platform = options.platform || defaultPlatform;
		this.isWindows = this.platform === "win32";
		this.windowsPathsNoEscape = !!options.windowsPathsNoEscape || options.allowWindowsEscape === false;
		if (this.windowsPathsNoEscape) this.pattern = this.pattern.replace(/\\/g, "/");
		this.preserveMultipleSlashes = !!options.preserveMultipleSlashes;
		this.regexp = null;
		this.negate = false;
		this.nonegate = !!options.nonegate;
		this.comment = false;
		this.empty = false;
		this.partial = !!options.partial;
		this.nocase = !!this.options.nocase;
		this.windowsNoMagicRoot = options.windowsNoMagicRoot !== void 0 ? options.windowsNoMagicRoot : !!(this.isWindows && this.nocase);
		this.globSet = [];
		this.globParts = [];
		this.set = [];
		this.make();
	}
	hasMagic() {
		if (this.options.magicalBraces && this.set.length > 1) return true;
		for (const pattern of this.set) for (const part of pattern) if (typeof part !== "string") return true;
		return false;
	}
	debug(..._) {}
	make() {
		const pattern = this.pattern;
		const options = this.options;
		if (!options.nocomment && pattern.charAt(0) === "#") {
			this.comment = true;
			return;
		}
		if (!pattern) {
			this.empty = true;
			return;
		}
		this.parseNegate();
		this.globSet = [...new Set(this.braceExpand())];
		if (options.debug) this.debug = (...args) => console.error(...args);
		this.debug(this.pattern, this.globSet);
		const rawGlobParts = this.globSet.map((s) => this.slashSplit(s));
		this.globParts = this.preprocess(rawGlobParts);
		this.debug(this.pattern, this.globParts);
		let set = this.globParts.map((s, _, __) => {
			if (this.isWindows && this.windowsNoMagicRoot) {
				const isUNC = s[0] === "" && s[1] === "" && (s[2] === "?" || !globMagic.test(s[2])) && !globMagic.test(s[3]);
				const isDrive = /^[a-z]:/i.test(s[0]);
				if (isUNC) return [...s.slice(0, 4), ...s.slice(4).map((ss) => this.parse(ss))];
				else if (isDrive) return [s[0], ...s.slice(1).map((ss) => this.parse(ss))];
			}
			return s.map((ss) => this.parse(ss));
		});
		this.debug(this.pattern, set);
		this.set = set.filter((s) => s.indexOf(false) === -1);
		if (this.isWindows) for (let i = 0; i < this.set.length; i++) {
			const p = this.set[i];
			if (p[0] === "" && p[1] === "" && this.globParts[i][2] === "?" && typeof p[3] === "string" && /^[a-z]:$/i.test(p[3])) p[2] = "?";
		}
		this.debug(this.pattern, this.set);
	}
	preprocess(globParts) {
		if (this.options.noglobstar) {
			for (let i = 0; i < globParts.length; i++) for (let j = 0; j < globParts[i].length; j++) if (globParts[i][j] === "**") globParts[i][j] = "*";
		}
		const { optimizationLevel = 1 } = this.options;
		if (optimizationLevel >= 2) {
			globParts = this.firstPhasePreProcess(globParts);
			globParts = this.secondPhasePreProcess(globParts);
		} else if (optimizationLevel >= 1) globParts = this.levelOneOptimize(globParts);
		else globParts = this.adjascentGlobstarOptimize(globParts);
		return globParts;
	}
	adjascentGlobstarOptimize(globParts) {
		return globParts.map((parts) => {
			let gs = -1;
			while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
				let i = gs;
				while (parts[i + 1] === "**") i++;
				if (i !== gs) parts.splice(gs, i - gs);
			}
			return parts;
		});
	}
	levelOneOptimize(globParts) {
		return globParts.map((parts) => {
			parts = parts.reduce((set, part) => {
				const prev = set[set.length - 1];
				if (part === "**" && prev === "**") return set;
				if (part === "..") {
					if (prev && prev !== ".." && prev !== "." && prev !== "**") {
						set.pop();
						return set;
					}
				}
				set.push(part);
				return set;
			}, []);
			return parts.length === 0 ? [""] : parts;
		});
	}
	levelTwoFileOptimize(parts) {
		if (!Array.isArray(parts)) parts = this.slashSplit(parts);
		let didSomething = false;
		do {
			didSomething = false;
			if (!this.preserveMultipleSlashes) {
				for (let i = 1; i < parts.length - 1; i++) {
					const p = parts[i];
					if (i === 1 && p === "" && parts[0] === "") continue;
					if (p === "." || p === "") {
						didSomething = true;
						parts.splice(i, 1);
						i--;
					}
				}
				if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
					didSomething = true;
					parts.pop();
				}
			}
			let dd = 0;
			while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
				const p = parts[dd - 1];
				if (p && p !== "." && p !== ".." && p !== "**") {
					didSomething = true;
					parts.splice(dd - 1, 2);
					dd -= 2;
				}
			}
		} while (didSomething);
		return parts.length === 0 ? [""] : parts;
	}
	firstPhasePreProcess(globParts) {
		let didSomething = false;
		do {
			didSomething = false;
			for (let parts of globParts) {
				let gs = -1;
				while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
					let gss = gs;
					while (parts[gss + 1] === "**") gss++;
					if (gss > gs) parts.splice(gs + 1, gss - gs);
					let next = parts[gs + 1];
					const p = parts[gs + 2];
					const p2 = parts[gs + 3];
					if (next !== "..") continue;
					if (!p || p === "." || p === ".." || !p2 || p2 === "." || p2 === "..") continue;
					didSomething = true;
					parts.splice(gs, 1);
					const other = parts.slice(0);
					other[gs] = "**";
					globParts.push(other);
					gs--;
				}
				if (!this.preserveMultipleSlashes) {
					for (let i = 1; i < parts.length - 1; i++) {
						const p = parts[i];
						if (i === 1 && p === "" && parts[0] === "") continue;
						if (p === "." || p === "") {
							didSomething = true;
							parts.splice(i, 1);
							i--;
						}
					}
					if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
						didSomething = true;
						parts.pop();
					}
				}
				let dd = 0;
				while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
					const p = parts[dd - 1];
					if (p && p !== "." && p !== ".." && p !== "**") {
						didSomething = true;
						const splin = dd === 1 && parts[dd + 1] === "**" ? ["."] : [];
						parts.splice(dd - 1, 2, ...splin);
						if (parts.length === 0) parts.push("");
						dd -= 2;
					}
				}
			}
		} while (didSomething);
		return globParts;
	}
	secondPhasePreProcess(globParts) {
		for (let i = 0; i < globParts.length - 1; i++) for (let j = i + 1; j < globParts.length; j++) {
			const matched = this.partsMatch(globParts[i], globParts[j], !this.preserveMultipleSlashes);
			if (matched) {
				globParts[i] = [];
				globParts[j] = matched;
				break;
			}
		}
		return globParts.filter((gs) => gs.length);
	}
	partsMatch(a, b, emptyGSMatch = false) {
		let ai = 0;
		let bi = 0;
		let result = [];
		let which = "";
		while (ai < a.length && bi < b.length) if (a[ai] === b[bi]) {
			result.push(which === "b" ? b[bi] : a[ai]);
			ai++;
			bi++;
		} else if (emptyGSMatch && a[ai] === "**" && b[bi] === a[ai + 1]) {
			result.push(a[ai]);
			ai++;
		} else if (emptyGSMatch && b[bi] === "**" && a[ai] === b[bi + 1]) {
			result.push(b[bi]);
			bi++;
		} else if (a[ai] === "*" && b[bi] && (this.options.dot || !b[bi].startsWith(".")) && b[bi] !== "**") {
			if (which === "b") return false;
			which = "a";
			result.push(a[ai]);
			ai++;
			bi++;
		} else if (b[bi] === "*" && a[ai] && (this.options.dot || !a[ai].startsWith(".")) && a[ai] !== "**") {
			if (which === "a") return false;
			which = "b";
			result.push(b[bi]);
			ai++;
			bi++;
		} else return false;
		return a.length === b.length && result;
	}
	parseNegate() {
		if (this.nonegate) return;
		const pattern = this.pattern;
		let negate = false;
		let negateOffset = 0;
		for (let i = 0; i < pattern.length && pattern.charAt(i) === "!"; i++) {
			negate = !negate;
			negateOffset++;
		}
		if (negateOffset) this.pattern = pattern.slice(negateOffset);
		this.negate = negate;
	}
	matchOne(file, pattern, partial = false) {
		const options = this.options;
		if (this.isWindows) {
			const fileDrive = typeof file[0] === "string" && /^[a-z]:$/i.test(file[0]);
			const fileUNC = !fileDrive && file[0] === "" && file[1] === "" && file[2] === "?" && /^[a-z]:$/i.test(file[3]);
			const patternDrive = typeof pattern[0] === "string" && /^[a-z]:$/i.test(pattern[0]);
			const patternUNC = !patternDrive && pattern[0] === "" && pattern[1] === "" && pattern[2] === "?" && typeof pattern[3] === "string" && /^[a-z]:$/i.test(pattern[3]);
			const fdi = fileUNC ? 3 : fileDrive ? 0 : void 0;
			const pdi = patternUNC ? 3 : patternDrive ? 0 : void 0;
			if (typeof fdi === "number" && typeof pdi === "number") {
				const [fd, pd] = [file[fdi], pattern[pdi]];
				if (fd.toLowerCase() === pd.toLowerCase()) {
					pattern[pdi] = fd;
					if (pdi > fdi) pattern = pattern.slice(pdi);
					else if (fdi > pdi) file = file.slice(fdi);
				}
			}
		}
		const { optimizationLevel = 1 } = this.options;
		if (optimizationLevel >= 2) file = this.levelTwoFileOptimize(file);
		this.debug("matchOne", this, {
			file,
			pattern
		});
		this.debug("matchOne", file.length, pattern.length);
		for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
			this.debug("matchOne loop");
			var p = pattern[pi];
			var f = file[fi];
			this.debug(pattern, p, f);
			/* c8 ignore start */
			if (p === false) return false;
			/* c8 ignore stop */
			if (p === GLOBSTAR) {
				this.debug("GLOBSTAR", [
					pattern,
					p,
					f
				]);
				var fr = fi;
				var pr = pi + 1;
				if (pr === pl) {
					this.debug("** at the end");
					for (; fi < fl; fi++) if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".") return false;
					return true;
				}
				while (fr < fl) {
					var swallowee = file[fr];
					this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
					if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
						this.debug("globstar found match!", fr, fl, swallowee);
						return true;
					} else {
						if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
							this.debug("dot detected!", file, fr, pattern, pr);
							break;
						}
						this.debug("globstar swallow a segment, and continue");
						fr++;
					}
				}
				/* c8 ignore start */
				if (partial) {
					this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
					if (fr === fl) return true;
				}
				/* c8 ignore stop */
				return false;
			}
			let hit;
			if (typeof p === "string") {
				hit = f === p;
				this.debug("string match", p, f, hit);
			} else {
				hit = p.test(f);
				this.debug("pattern match", p, f, hit);
			}
			if (!hit) return false;
		}
		if (fi === fl && pi === pl) return true;
		else if (fi === fl) return partial;
		else if (pi === pl) return fi === fl - 1 && file[fi] === "";
		else throw new Error("wtf?");
		/* c8 ignore stop */
	}
	braceExpand() {
		return braceExpand(this.pattern, this.options);
	}
	parse(pattern) {
		assertValidPattern(pattern);
		const options = this.options;
		if (pattern === "**") return GLOBSTAR;
		if (pattern === "") return "";
		let m;
		let fastTest = null;
		if (m = pattern.match(starRE)) fastTest = options.dot ? starTestDot : starTest;
		else if (m = pattern.match(starDotExtRE)) fastTest = (options.nocase ? options.dot ? starDotExtTestNocaseDot : starDotExtTestNocase : options.dot ? starDotExtTestDot : starDotExtTest)(m[1]);
		else if (m = pattern.match(qmarksRE)) fastTest = (options.nocase ? options.dot ? qmarksTestNocaseDot : qmarksTestNocase : options.dot ? qmarksTestDot : qmarksTest)(m);
		else if (m = pattern.match(starDotStarRE)) fastTest = options.dot ? starDotStarTestDot : starDotStarTest;
		else if (m = pattern.match(dotStarRE)) fastTest = dotStarTest;
		const re = AST.fromGlob(pattern, this.options).toMMPattern();
		if (fastTest && typeof re === "object") Reflect.defineProperty(re, "test", { value: fastTest });
		return re;
	}
	makeRe() {
		if (this.regexp || this.regexp === false) return this.regexp;
		const set = this.set;
		if (!set.length) {
			this.regexp = false;
			return this.regexp;
		}
		const options = this.options;
		const twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
		const flags = new Set(options.nocase ? ["i"] : []);
		let re = set.map((pattern) => {
			const pp = pattern.map((p) => {
				if (p instanceof RegExp) for (const f of p.flags.split("")) flags.add(f);
				return typeof p === "string" ? regExpEscape(p) : p === GLOBSTAR ? GLOBSTAR : p._src;
			});
			pp.forEach((p, i) => {
				const next = pp[i + 1];
				const prev = pp[i - 1];
				if (p !== GLOBSTAR || prev === GLOBSTAR) return;
				if (prev === void 0) if (next !== void 0 && next !== GLOBSTAR) pp[i + 1] = "(?:\\/|" + twoStar + "\\/)?" + next;
				else pp[i] = twoStar;
				else if (next === void 0) pp[i - 1] = prev + "(?:\\/|\\/" + twoStar + ")?";
				else if (next !== GLOBSTAR) {
					pp[i - 1] = prev + "(?:\\/|\\/" + twoStar + "\\/)" + next;
					pp[i + 1] = GLOBSTAR;
				}
			});
			const filtered = pp.filter((p) => p !== GLOBSTAR);
			if (this.partial && filtered.length >= 1) {
				const prefixes = [];
				for (let i = 1; i <= filtered.length; i++) prefixes.push(filtered.slice(0, i).join("/"));
				return "(?:" + prefixes.join("|") + ")";
			}
			return filtered.join("/");
		}).join("|");
		const [open, close] = set.length > 1 ? ["(?:", ")"] : ["", ""];
		re = "^" + open + re + close + "$";
		if (this.partial) re = "^(?:\\/|" + open + re.slice(1, -1) + close + ")$";
		if (this.negate) re = "^(?!" + re + ").+$";
		try {
			this.regexp = new RegExp(re, [...flags].join(""));
		} catch (ex) {
			this.regexp = false;
		}
		/* c8 ignore stop */
		return this.regexp;
	}
	slashSplit(p) {
		if (this.preserveMultipleSlashes) return p.split("/");
		else if (this.isWindows && /^\/\/[^\/]+/.test(p)) return ["", ...p.split(/\/+/)];
		else return p.split(/\/+/);
	}
	match(f, partial = this.partial) {
		this.debug("match", f, this.pattern);
		if (this.comment) return false;
		if (this.empty) return f === "";
		if (f === "/" && partial) return true;
		const options = this.options;
		if (this.isWindows) f = f.split("\\").join("/");
		const ff = this.slashSplit(f);
		this.debug(this.pattern, "split", ff);
		const set = this.set;
		this.debug(this.pattern, "set", set);
		let filename = ff[ff.length - 1];
		if (!filename) for (let i = ff.length - 2; !filename && i >= 0; i--) filename = ff[i];
		for (let i = 0; i < set.length; i++) {
			const pattern = set[i];
			let file = ff;
			if (options.matchBase && pattern.length === 1) file = [filename];
			if (this.matchOne(file, pattern, partial)) {
				if (options.flipNegate) return true;
				return !this.negate;
			}
		}
		if (options.flipNegate) return false;
		return this.negate;
	}
	static defaults(def) {
		return minimatch.defaults(def).Minimatch;
	}
};
/* c8 ignore stop */
minimatch.AST = AST;
minimatch.Minimatch = Minimatch;
minimatch.escape = escape;
minimatch.unescape = unescape;

//#endregion
//#region packages/compiler-sfc/src/script/resolveType.ts
var TypeScope = class {
	constructor(filename, source, offset = 0, imports = Object.create(null), types = Object.create(null), declares = Object.create(null)) {
		this.filename = filename;
		this.source = source;
		this.offset = offset;
		this.imports = imports;
		this.types = types;
		this.declares = declares;
		this.isGenericScope = false;
		this.resolvedImportSources = Object.create(null);
		this.exportedTypes = Object.create(null);
		this.exportedDeclares = Object.create(null);
	}
};
/**
* Resolve arbitrary type node to a list of type elements that can be then
* mapped to runtime props or emits.
*/
function resolveTypeElements(ctx, node, scope, typeParameters) {
	const canCache = !typeParameters;
	if (canCache && node._resolvedElements) return node._resolvedElements;
	const resolved = innerResolveTypeElements(ctx, node, node._ownerScope || scope || ctxToScope(ctx), typeParameters);
	return canCache ? node._resolvedElements = resolved : resolved;
}
function innerResolveTypeElements(ctx, node, scope, typeParameters) {
	if (node.leadingComments && node.leadingComments.some((c) => c.value.includes("@vue-ignore"))) return { props: {} };
	switch (node.type) {
		case "TSTypeLiteral": return typeElementsToMap(ctx, node.members, scope, typeParameters);
		case "TSInterfaceDeclaration": return resolveInterfaceMembers(ctx, node, scope, typeParameters);
		case "TSTypeAliasDeclaration":
		case "TSTypeAnnotation":
		case "TSParenthesizedType": return resolveTypeElements(ctx, node.typeAnnotation, scope, typeParameters);
		case "TSFunctionType": return {
			props: {},
			calls: [node]
		};
		case "TSUnionType":
		case "TSIntersectionType": return mergeElements(node.types.map((t) => resolveTypeElements(ctx, t, scope, typeParameters)), node.type);
		case "TSMappedType": return resolveMappedType(ctx, node, scope, typeParameters);
		case "TSIndexedAccessType": return mergeElements(resolveIndexType(ctx, node, scope).map((t) => resolveTypeElements(ctx, t, t._ownerScope)), "TSUnionType");
		case "TSExpressionWithTypeArguments":
		case "TSTypeReference": {
			var _scope$imports$typeNa;
			const typeName = getReferenceName(node);
			if ((typeName === "ExtractPropTypes" || typeName === "ExtractPublicPropTypes") && node.typeParameters && ((_scope$imports$typeNa = scope.imports[typeName]) === null || _scope$imports$typeNa === void 0 ? void 0 : _scope$imports$typeNa.source) === "vue") return resolveExtractPropTypes(resolveTypeElements(ctx, node.typeParameters.params[0], scope, typeParameters), scope);
			const resolved = resolveTypeReference(ctx, node, scope);
			if (resolved) {
				let typeParams;
				if ((resolved.type === "TSTypeAliasDeclaration" || resolved.type === "TSInterfaceDeclaration") && resolved.typeParameters && node.typeParameters) {
					typeParams = Object.create(null);
					resolved.typeParameters.params.forEach((p, i) => {
						let param = typeParameters && typeParameters[p.name];
						if (!param) param = node.typeParameters.params[i];
						typeParams[p.name] = param;
					});
				}
				return resolveTypeElements(ctx, resolved, resolved._ownerScope, typeParams);
			} else {
				if (typeof typeName === "string") {
					if (typeParameters && typeParameters[typeName]) return resolveTypeElements(ctx, typeParameters[typeName], scope, typeParameters);
					if (SupportedBuiltinsSet.has(typeName)) return resolveBuiltin(ctx, node, typeName, scope, typeParameters);
					else if (typeName === "ReturnType" && node.typeParameters) {
						const ret = resolveReturnType(ctx, node.typeParameters.params[0], scope);
						if (ret) return resolveTypeElements(ctx, ret, scope);
					}
				}
				return ctx.error(`Unresolvable type reference or unsupported built-in utility type`, node, scope);
			}
		}
		case "TSImportType": {
			var _node$qualifier;
			if (getId(node.argument) === "vue" && ((_node$qualifier = node.qualifier) === null || _node$qualifier === void 0 ? void 0 : _node$qualifier.type) === "Identifier" && node.qualifier.name === "ExtractPropTypes" && node.typeParameters) return resolveExtractPropTypes(resolveTypeElements(ctx, node.typeParameters.params[0], scope), scope);
			const resolved = resolveTypeReference(ctx, node, importSourceToScope(ctx, node.argument, scope, node.argument.value));
			if (resolved) return resolveTypeElements(ctx, resolved, resolved._ownerScope);
			break;
		}
		case "TSTypeQuery":
			{
				const resolved = resolveTypeReference(ctx, node, scope);
				if (resolved) return resolveTypeElements(ctx, resolved, resolved._ownerScope);
			}
			break;
	}
	return ctx.error(`Unresolvable type: ${node.type}`, node, scope);
}
function typeElementsToMap(ctx, elements, scope = ctxToScope(ctx), typeParameters) {
	const res = { props: {} };
	for (const e of elements) if (e.type === "TSPropertySignature" || e.type === "TSMethodSignature") {
		if (typeParameters) {
			scope = createChildScope(scope);
			scope.isGenericScope = true;
			Object.assign(scope.types, typeParameters);
		}
		e._ownerScope = scope;
		const name = getStringLiteralKey(e);
		if (name !== null) res.props[name] = e;
		else ctx.error(`Unsupported computed key in type referenced by a macro`, e.key, scope);
	} else if (e.type === "TSCallSignatureDeclaration") (res.calls || (res.calls = [])).push(e);
	return res;
}
function mergeElements(maps, type) {
	if (maps.length === 1) return maps[0];
	const res = { props: {} };
	const { props: baseProps } = res;
	for (const { props, calls } of maps) {
		for (const key in props) if (!(0, _vue_shared.hasOwn)(baseProps, key)) baseProps[key] = props[key];
		else baseProps[key] = createProperty(baseProps[key].key, {
			type,
			types: [baseProps[key], props[key]]
		}, baseProps[key]._ownerScope, baseProps[key].optional || props[key].optional);
		if (calls) (res.calls || (res.calls = [])).push(...calls);
	}
	return res;
}
function createProperty(key, typeAnnotation, scope, optional) {
	return {
		type: "TSPropertySignature",
		key,
		kind: "get",
		optional,
		typeAnnotation: {
			type: "TSTypeAnnotation",
			typeAnnotation
		},
		_ownerScope: scope
	};
}
function resolveInterfaceMembers(ctx, node, scope, typeParameters) {
	const base = typeElementsToMap(ctx, node.body.body, node._ownerScope, typeParameters);
	if (node.extends) for (const ext of node.extends) try {
		const { props, calls } = resolveTypeElements(ctx, ext, scope);
		for (const key in props) if (!(0, _vue_shared.hasOwn)(base.props, key)) base.props[key] = props[key];
		if (calls) (base.calls || (base.calls = [])).push(...calls);
	} catch (e) {
		if (!ctx.silentOnExtendsFailure) ctx.error("Failed to resolve extends base type.\nIf this previously worked in 3.2, you can instruct the compiler to ignore this extend by adding /* @vue-ignore */ before it, for example:\n\ninterface Props extends /* @vue-ignore */ Base {}\n\nNote: both in 3.2 or with the ignore, the properties in the base type are treated as fallthrough attrs at runtime.", ext, scope);
	}
	return base;
}
function resolveMappedType(ctx, node, scope, typeParameters) {
	const res = { props: {} };
	let keys;
	if (node.nameType) {
		const { name, constraint } = node.typeParameter;
		scope = createChildScope(scope);
		Object.assign(scope.types, {
			...typeParameters,
			[name]: constraint
		});
		keys = resolveStringType(ctx, node.nameType, scope);
	} else keys = resolveStringType(ctx, node.typeParameter.constraint, scope);
	for (const key of keys) res.props[key] = createProperty({
		type: "Identifier",
		name: key
	}, node.typeAnnotation, scope, !!node.optional);
	return res;
}
function resolveIndexType(ctx, node, scope) {
	if (node.indexType.type === "TSNumberKeyword") return resolveArrayElementType(ctx, node.objectType, scope);
	const { indexType, objectType } = node;
	const types = [];
	let keys;
	let resolved;
	if (indexType.type === "TSStringKeyword") {
		resolved = resolveTypeElements(ctx, objectType, scope);
		keys = Object.keys(resolved.props);
	} else {
		keys = resolveStringType(ctx, indexType, scope);
		resolved = resolveTypeElements(ctx, objectType, scope);
	}
	for (const key of keys) {
		var _resolved$props$key;
		const targetType = (_resolved$props$key = resolved.props[key]) === null || _resolved$props$key === void 0 || (_resolved$props$key = _resolved$props$key.typeAnnotation) === null || _resolved$props$key === void 0 ? void 0 : _resolved$props$key.typeAnnotation;
		if (targetType) {
			targetType._ownerScope = resolved.props[key]._ownerScope;
			types.push(targetType);
		}
	}
	return types;
}
function resolveArrayElementType(ctx, node, scope) {
	if (node.type === "TSArrayType") return [node.elementType];
	if (node.type === "TSTupleType") return node.elementTypes.map((t) => t.type === "TSNamedTupleMember" ? t.elementType : t);
	if (node.type === "TSTypeReference") if (getReferenceName(node) === "Array" && node.typeParameters) return node.typeParameters.params;
	else {
		const resolved = resolveTypeReference(ctx, node, scope);
		if (resolved) return resolveArrayElementType(ctx, resolved, scope);
	}
	return ctx.error("Failed to resolve element type from target type", node, scope);
}
function resolveStringType(ctx, node, scope, typeParameters) {
	switch (node.type) {
		case "StringLiteral": return [node.value];
		case "TSLiteralType": return resolveStringType(ctx, node.literal, scope, typeParameters);
		case "TSUnionType": return node.types.map((t) => resolveStringType(ctx, t, scope, typeParameters)).flat();
		case "TemplateLiteral": return resolveTemplateKeys(ctx, node, scope);
		case "TSTypeReference": {
			const resolved = resolveTypeReference(ctx, node, scope);
			if (resolved) return resolveStringType(ctx, resolved, scope, typeParameters);
			if (node.typeName.type === "Identifier") {
				const name = node.typeName.name;
				if (typeParameters && typeParameters[name]) return resolveStringType(ctx, typeParameters[name], scope, typeParameters);
				const getParam = (index = 0) => resolveStringType(ctx, node.typeParameters.params[index], scope, typeParameters);
				switch (name) {
					case "Extract": return getParam(1);
					case "Exclude": {
						const excluded = getParam(1);
						return getParam().filter((s) => !excluded.includes(s));
					}
					case "Uppercase": return getParam().map((s) => s.toUpperCase());
					case "Lowercase": return getParam().map((s) => s.toLowerCase());
					case "Capitalize": return getParam().map(_vue_shared.capitalize);
					case "Uncapitalize": return getParam().map((s) => s[0].toLowerCase() + s.slice(1));
					default: ctx.error("Unsupported type when resolving index type", node.typeName, scope);
				}
			}
		}
	}
	return ctx.error("Failed to resolve index type into finite keys", node, scope);
}
function resolveTemplateKeys(ctx, node, scope) {
	if (!node.expressions.length) return [node.quasis[0].value.raw];
	const res = [];
	const e = node.expressions[0];
	const q = node.quasis[0];
	const leading = q ? q.value.raw : ``;
	const resolved = resolveStringType(ctx, e, scope);
	const restResolved = resolveTemplateKeys(ctx, {
		...node,
		expressions: node.expressions.slice(1),
		quasis: q ? node.quasis.slice(1) : node.quasis
	}, scope);
	for (const r of resolved) for (const rr of restResolved) res.push(leading + r + rr);
	return res;
}
const SupportedBuiltinsSet = new Set([
	"Partial",
	"Required",
	"Readonly",
	"Pick",
	"Omit"
]);
function resolveBuiltin(ctx, node, name, scope, typeParameters) {
	const t = resolveTypeElements(ctx, node.typeParameters.params[0], scope, typeParameters);
	switch (name) {
		case "Partial": {
			const res = {
				props: {},
				calls: t.calls
			};
			Object.keys(t.props).forEach((key) => {
				res.props[key] = {
					...t.props[key],
					optional: true
				};
			});
			return res;
		}
		case "Required": {
			const res = {
				props: {},
				calls: t.calls
			};
			Object.keys(t.props).forEach((key) => {
				res.props[key] = {
					...t.props[key],
					optional: false
				};
			});
			return res;
		}
		case "Readonly": return t;
		case "Pick": {
			const picked = resolveStringType(ctx, node.typeParameters.params[1], scope, typeParameters);
			const res = {
				props: {},
				calls: t.calls
			};
			for (const key of picked) res.props[key] = t.props[key];
			return res;
		}
		case "Omit":
			const omitted = resolveStringType(ctx, node.typeParameters.params[1], scope, typeParameters);
			const res = {
				props: {},
				calls: t.calls
			};
			for (const key in t.props) if (!omitted.includes(key)) res.props[key] = t.props[key];
			return res;
	}
}
function resolveTypeReference(ctx, node, scope, name, onlyExported = false) {
	const canCache = !(scope === null || scope === void 0 ? void 0 : scope.isGenericScope);
	if (canCache && node._resolvedReference) return node._resolvedReference;
	const resolved = innerResolveTypeReference(ctx, scope || ctxToScope(ctx), name || getReferenceName(node), node, onlyExported);
	return canCache ? node._resolvedReference = resolved : resolved;
}
function innerResolveTypeReference(ctx, scope, name, node, onlyExported) {
	if (typeof name === "string") if (scope.imports[name]) return resolveTypeFromImport(ctx, node, name, scope);
	else {
		const lookupSource = node.type === "TSTypeQuery" ? onlyExported ? scope.exportedDeclares : scope.declares : onlyExported ? scope.exportedTypes : scope.types;
		if (lookupSource[name]) return lookupSource[name];
		else {
			const globalScopes = resolveGlobalScope(ctx);
			if (globalScopes) for (const s of globalScopes) {
				const src = node.type === "TSTypeQuery" ? s.declares : s.types;
				if (src[name]) {
					(ctx.deps || (ctx.deps = /* @__PURE__ */ new Set())).add(s.filename);
					return src[name];
				}
			}
		}
	}
	else {
		let ns = innerResolveTypeReference(ctx, scope, name[0], node, onlyExported);
		if (ns) {
			if (ns.type !== "TSModuleDeclaration") ns = ns._ns;
			if (ns) return innerResolveTypeReference(ctx, moduleDeclToScope(ctx, ns, ns._ownerScope || scope), name.length > 2 ? name.slice(1) : name[name.length - 1], node, !ns.declare);
		}
	}
}
function getReferenceName(node) {
	const ref = node.type === "TSTypeReference" ? node.typeName : node.type === "TSExpressionWithTypeArguments" ? node.expression : node.type === "TSImportType" ? node.qualifier : node.exprName;
	if ((ref === null || ref === void 0 ? void 0 : ref.type) === "Identifier") return ref.name;
	else if ((ref === null || ref === void 0 ? void 0 : ref.type) === "TSQualifiedName") return qualifiedNameToPath(ref);
	else return "default";
}
function qualifiedNameToPath(node) {
	if (node.type === "Identifier") return [node.name];
	else return [...qualifiedNameToPath(node.left), node.right.name];
}
function resolveGlobalScope(ctx) {
	if (ctx.options.globalTypeFiles) {
		if (!resolveFS(ctx)) throw new Error("[vue/compiler-sfc] globalTypeFiles requires fs access.");
		return ctx.options.globalTypeFiles.map((file) => fileToScope(ctx, normalizePath(file), true));
	}
}
let ts;
let loadTS;
/**
* @private
*/
function registerTS(_loadTS) {
	loadTS = () => {
		try {
			return _loadTS();
		} catch (err) {
			if (typeof err.message === "string" && err.message.includes("Cannot find module")) throw new Error("Failed to load TypeScript, which is required for resolving imported types. Please make sure \"TypeScript\" is installed as a project dependency.");
			else throw new Error("Failed to load TypeScript for resolving imported types.");
		}
	};
}
function resolveFS(ctx) {
	if (ctx.fs) return ctx.fs;
	if (!ts && loadTS) ts = loadTS();
	const fs = ctx.options.fs || (ts === null || ts === void 0 ? void 0 : ts.sys);
	if (!fs) return;
	return ctx.fs = {
		fileExists(file) {
			if (file.endsWith(".vue.ts") && !file.endsWith(".d.vue.ts")) file = file.replace(/\.ts$/, "");
			return fs.fileExists(file);
		},
		readFile(file) {
			if (file.endsWith(".vue.ts") && !file.endsWith(".d.vue.ts")) file = file.replace(/\.ts$/, "");
			return fs.readFile(file);
		},
		realpath: fs.realpath
	};
}
function resolveTypeFromImport(ctx, node, name, scope) {
	const { source, imported } = scope.imports[name];
	return resolveTypeReference(ctx, node, importSourceToScope(ctx, node, scope, source), imported, true);
}
function importSourceToScope(ctx, node, scope, source) {
	let fs;
	try {
		fs = resolveFS(ctx);
	} catch (err) {
		return ctx.error(err.message, node, scope);
	}
	if (!fs) return ctx.error("No fs option provided to `compileScript` in non-Node environment. File system access is required for resolving imported types.", node, scope);
	let resolved = scope.resolvedImportSources[source];
	if (!resolved) {
		if (source.startsWith("..")) resolved = resolveExt((process$1.platform === "win32" ? path.join : joinPaths)((0, path.dirname)(scope.filename), source), fs);
		else if (source[0] === ".") resolved = resolveExt(joinPaths((0, path.dirname)(scope.filename), source), fs);
		else if (process$1.env.UNI_INPUT_DIR && source.startsWith("@/")) resolved = resolveExt(joinPaths(process$1.env.UNI_INPUT_DIR, source.replace("@/", "")), fs);
		else {
			if (!ts) {
				if (loadTS) ts = loadTS();
				if (!ts) return ctx.error(`Failed to resolve import source ${JSON.stringify(source)}. TypeScript is required as a peer dep for vue in order to support resolving types from module imports.`, node, scope);
			}
			resolved = resolveWithTS(scope.filename, source, ts, fs);
		}
		if (resolved) resolved = scope.resolvedImportSources[source] = normalizePath(resolved);
	}
	if (resolved) {
		(ctx.deps || (ctx.deps = /* @__PURE__ */ new Set())).add(resolved);
		return fileToScope(ctx, resolved);
	} else return ctx.error(`Failed to resolve import source ${JSON.stringify(source)}.`, node, scope);
}
function resolveExt(filename, fs) {
	filename = filename.replace(/\.js$/, "");
	const tryResolve = (filename) => {
		if (fs.fileExists(filename)) return filename;
	};
	return tryResolve(filename) || tryResolve(filename + `.ts`) || tryResolve(filename + `.tsx`) || tryResolve(filename + `.d.ts`) || tryResolve(joinPaths(filename, `index.ts`)) || tryResolve(joinPaths(filename, `index.tsx`)) || tryResolve(joinPaths(filename, `index.d.ts`));
}
const tsConfigCache = createCache();
const tsConfigRefMap = /* @__PURE__ */ new Map();
function resolveWithTS(containingFile, source, ts, fs) {
	const configPath = ts.findConfigFile(containingFile, fs.fileExists);
	let tsCompilerOptions;
	let tsResolveCache;
	if (configPath) {
		let configs;
		const normalizedConfigPath = normalizePath(configPath);
		const cached = tsConfigCache.get(normalizedConfigPath);
		if (!cached) {
			configs = loadTSConfig(configPath, ts, fs).map((config) => ({ config }));
			tsConfigCache.set(normalizedConfigPath, configs);
		} else configs = cached;
		let matchedConfig;
		if (configs.length === 1) matchedConfig = configs[0];
		else {
			const [major, minor] = ts.versionMajorMinor.split(".").map(Number);
			const getPattern = (base, p) => {
				const supportsConfigDir = major > 5 || major === 5 && minor >= 5;
				return p.startsWith("${configDir}") && supportsConfigDir ? normalizePath(p.replace("${configDir}", (0, path.dirname)(configPath))) : joinPaths(base, p);
			};
			for (const c of configs) {
				var _c$config$raw, _c$config$raw2;
				const base = normalizePath(c.config.options.pathsBasePath || (0, path.dirname)(c.config.options.configFilePath));
				const included = (_c$config$raw = c.config.raw) === null || _c$config$raw === void 0 ? void 0 : _c$config$raw.include;
				const excluded = (_c$config$raw2 = c.config.raw) === null || _c$config$raw2 === void 0 ? void 0 : _c$config$raw2.exclude;
				if (!included && (!base || containingFile.startsWith(base)) || (included === null || included === void 0 ? void 0 : included.some((p) => minimatch(containingFile, getPattern(base, p))))) {
					if (excluded && excluded.some((p) => minimatch(containingFile, getPattern(base, p)))) continue;
					matchedConfig = c;
					break;
				}
			}
			if (!matchedConfig) matchedConfig = configs[configs.length - 1];
		}
		tsCompilerOptions = matchedConfig.config.options;
		tsResolveCache = matchedConfig.cache || (matchedConfig.cache = ts.createModuleResolutionCache(process$1.cwd(), createGetCanonicalFileName(ts.sys.useCaseSensitiveFileNames), tsCompilerOptions));
	} else tsCompilerOptions = {};
	const res = ts.resolveModuleName(source, containingFile, tsCompilerOptions, fs, tsResolveCache);
	if (res.resolvedModule) {
		let filename = res.resolvedModule.resolvedFileName;
		if (filename.endsWith(".vue.ts") && !filename.endsWith(".d.vue.ts")) filename = filename.replace(/\.ts$/, "");
		return fs.realpath ? fs.realpath(filename) : filename;
	}
}
function loadTSConfig(configPath, ts, fs, visited = /* @__PURE__ */ new Set()) {
	const parseConfigHost = ts.sys;
	const config = ts.parseJsonConfigFileContent(ts.readConfigFile(configPath, fs.readFile).config, parseConfigHost, (0, path.dirname)(configPath), void 0, configPath);
	const res = [config];
	visited.add(configPath);
	if (config.projectReferences) for (const ref of config.projectReferences) {
		const refPath = ts.resolveProjectReferencePath(ref);
		if (visited.has(refPath) || !fs.fileExists(refPath)) continue;
		tsConfigRefMap.set(refPath, configPath);
		res.unshift(...loadTSConfig(refPath, ts, fs, visited));
	}
	return res;
}
const fileToScopeCache = createCache();
/**
* @private
*/
function invalidateTypeCache(filename) {
	filename = normalizePath(filename);
	fileToScopeCache.delete(filename);
	tsConfigCache.delete(filename);
	const affectedConfig = tsConfigRefMap.get(filename);
	if (affectedConfig) tsConfigCache.delete(affectedConfig);
}
function fileToScope(ctx, filename, asGlobal = false) {
	const cached = fileToScopeCache.get(filename);
	if (cached) return cached;
	const fs = resolveFS(ctx);
	const source = fs.readFile(filename) || "";
	const body = parseFile(filename, source, fs, ctx.options.babelParserPlugins);
	const scope = new TypeScope(filename, source, 0, recordImports(body));
	recordTypes(ctx, body, scope, asGlobal);
	fileToScopeCache.set(filename, scope);
	return scope;
}
function parseFile(filename, content, fs, parserPlugins) {
	const ext = (0, path.extname)(filename);
	if (ext === ".uts" || ext === ".ts" || ext === ".mts" || ext === ".tsx" || ext === ".mtsx") return (0, _babel_parser.parse)(content, {
		plugins: resolveParserPlugins(ext.slice(1), parserPlugins, /\.d\.m?ts$/.test(filename)),
		sourceType: "module"
	}).program.body;
	const isUnknownTypeSource = !/\.[cm]?[tj]sx?$/.test(filename);
	const arbitraryTypeSource = `${filename.slice(0, -ext.length)}.d${ext}.ts`;
	if (isUnknownTypeSource && fs.fileExists(arbitraryTypeSource)) return (0, _babel_parser.parse)(fs.readFile(arbitraryTypeSource), {
		plugins: resolveParserPlugins("ts", parserPlugins, true),
		sourceType: "module"
	}).program.body;
	if (ext === ".uvue" || ext === ".nvue" || ext === ".vue") {
		const { descriptor: { script, scriptSetup } } = parse(content);
		if (!script && !scriptSetup) return [];
		const scriptOffset = script ? script.loc.start.offset : Infinity;
		const scriptSetupOffset = scriptSetup ? scriptSetup.loc.start.offset : Infinity;
		const firstBlock = scriptOffset < scriptSetupOffset ? script : scriptSetup;
		const secondBlock = scriptOffset < scriptSetupOffset ? scriptSetup : script;
		let scriptContent = " ".repeat(Math.min(scriptOffset, scriptSetupOffset)) + firstBlock.content;
		if (secondBlock) scriptContent += " ".repeat(secondBlock.loc.start.offset - script.loc.end.offset) + secondBlock.content;
		const lang = (script === null || script === void 0 ? void 0 : script.lang) || (scriptSetup === null || scriptSetup === void 0 ? void 0 : scriptSetup.lang);
		return (0, _babel_parser.parse)(scriptContent, {
			plugins: resolveParserPlugins(lang, parserPlugins),
			sourceType: "module"
		}).program.body;
	}
	return [];
}
function ctxToScope(ctx) {
	if (ctx.scope) return ctx.scope;
	const body = "ast" in ctx ? ctx.ast : ctx.scriptAst ? [...ctx.scriptAst.body, ...ctx.scriptSetupAst.body] : ctx.scriptSetupAst.body;
	const scope = new TypeScope(ctx.filename, ctx.source, "startOffset" in ctx ? ctx.startOffset : 0, "userImports" in ctx ? Object.create(ctx.userImports) : recordImports(body));
	recordTypes(ctx, body, scope);
	return ctx.scope = scope;
}
function moduleDeclToScope(ctx, node, parentScope) {
	if (node._resolvedChildScope) return node._resolvedChildScope;
	const scope = createChildScope(parentScope);
	if (node.body.type === "TSModuleDeclaration") {
		const decl = node.body;
		decl._ownerScope = scope;
		const id = getId(decl.id);
		scope.types[id] = scope.exportedTypes[id] = decl;
	} else recordTypes(ctx, node.body.body, scope);
	return node._resolvedChildScope = scope;
}
function createChildScope(parentScope) {
	return new TypeScope(parentScope.filename, parentScope.source, parentScope.offset, Object.create(parentScope.imports), Object.create(parentScope.types), Object.create(parentScope.declares));
}
const importExportRE = /^Import|^Export/;
function recordTypes(ctx, body, scope, asGlobal = false) {
	const { types, declares, exportedTypes, exportedDeclares, imports } = scope;
	const isAmbient = asGlobal ? !body.some((s) => importExportRE.test(s.type)) : false;
	for (const stmt of body) if (asGlobal) {
		if (isAmbient) {
			if (stmt.declare) recordType(stmt, types, declares);
		} else if (stmt.type === "TSModuleDeclaration" && stmt.global) for (const s of stmt.body.body) if (s.type === "ExportNamedDeclaration" && s.declaration) recordType(s.declaration, types, declares);
		else recordType(s, types, declares);
	} else recordType(stmt, types, declares);
	if (!asGlobal) {
		for (const stmt of body) if (stmt.type === "ExportNamedDeclaration") {
			if (stmt.declaration) {
				recordType(stmt.declaration, types, declares);
				recordType(stmt.declaration, exportedTypes, exportedDeclares);
			} else for (const spec of stmt.specifiers) if (spec.type === "ExportSpecifier") {
				const local = spec.local.name;
				const exported = getId(spec.exported);
				if (stmt.source) {
					imports[exported] = {
						source: stmt.source.value,
						imported: local
					};
					exportedTypes[exported] = {
						type: "TSTypeReference",
						typeName: {
							type: "Identifier",
							name: local
						},
						_ownerScope: scope
					};
				} else if (types[local]) exportedTypes[exported] = types[local];
			}
		} else if (stmt.type === "ExportAllDeclaration") {
			const sourceScope = importSourceToScope(ctx, stmt.source, scope, stmt.source.value);
			Object.assign(scope.exportedTypes, sourceScope.exportedTypes);
		} else if (stmt.type === "ExportDefaultDeclaration" && stmt.declaration) {
			if (stmt.declaration.type !== "Identifier") {
				recordType(stmt.declaration, types, declares, "default");
				recordType(stmt.declaration, exportedTypes, exportedDeclares, "default");
			} else if (types[stmt.declaration.name]) exportedTypes["default"] = types[stmt.declaration.name];
		}
	}
	for (const key of Object.keys(types)) {
		const node = types[key];
		node._ownerScope = scope;
		if (node._ns) node._ns._ownerScope = scope;
	}
	for (const key of Object.keys(declares)) declares[key]._ownerScope = scope;
}
function recordType(node, types, declares, overwriteId) {
	switch (node.type) {
		case "TSInterfaceDeclaration":
		case "TSEnumDeclaration":
		case "TSModuleDeclaration": {
			if (node.type === "TSModuleDeclaration" && node.global) {
				const body = node.body;
				for (const s of body.body) if (s.type === "ExportNamedDeclaration" && s.declaration) recordType(s.declaration, types, declares);
				else recordType(s, types, declares);
				break;
			}
			const id = overwriteId || getId(node.id);
			let existing = types[id];
			if (existing) {
				if (node.type === "TSModuleDeclaration") {
					if (existing.type === "TSModuleDeclaration") mergeNamespaces(existing, node);
					else attachNamespace(existing, node);
					break;
				}
				if (existing.type === "TSModuleDeclaration") {
					types[id] = node;
					attachNamespace(node, existing);
					break;
				}
				if (existing.type !== node.type) break;
				if (node.type === "TSInterfaceDeclaration") existing.body.body.push(...node.body.body);
				else existing.members.push(...node.members);
			} else types[id] = node;
			break;
		}
		case "ClassDeclaration":
			if (overwriteId || node.id) types[overwriteId || getId(node.id)] = node;
			break;
		case "TSTypeAliasDeclaration":
			types[node.id.name] = node.typeParameters ? node : node.typeAnnotation;
			break;
		case "TSDeclareFunction":
			if (node.id) declares[node.id.name] = node;
			break;
		case "VariableDeclaration":
			if (node.declare) {
				for (const decl of node.declarations) if (decl.id.type === "Identifier" && decl.id.typeAnnotation) declares[decl.id.name] = decl.id.typeAnnotation.typeAnnotation;
			}
			break;
	}
}
function mergeNamespaces(to, from) {
	const toBody = to.body;
	const fromBody = from.body;
	if (toBody.type === "TSModuleDeclaration") if (fromBody.type === "TSModuleDeclaration") mergeNamespaces(toBody, fromBody);
	else fromBody.body.push({
		type: "ExportNamedDeclaration",
		declaration: toBody,
		exportKind: "type",
		specifiers: []
	});
	else if (fromBody.type === "TSModuleDeclaration") toBody.body.push({
		type: "ExportNamedDeclaration",
		declaration: fromBody,
		exportKind: "type",
		specifiers: []
	});
	else toBody.body.push(...fromBody.body);
}
function attachNamespace(to, ns) {
	if (!to._ns) to._ns = ns;
	else mergeNamespaces(to._ns, ns);
}
function recordImports(body) {
	const imports = Object.create(null);
	for (const s of body) recordImport(s, imports);
	return imports;
}
function recordImport(node, imports) {
	if (node.type !== "ImportDeclaration") return;
	for (const s of node.specifiers) imports[s.local.name] = {
		imported: getImportedName(s),
		source: node.source.value
	};
}
function inferRuntimeType(ctx, node, scope = node._ownerScope || ctxToScope(ctx), isKeyOf = false, typeParameters) {
	if (node.leadingComments && node.leadingComments.some((c) => c.value.includes("@vue-ignore"))) return [UNKNOWN_TYPE];
	const prevSilent = ctx.silentOnExtendsFailure;
	ctx.silentOnExtendsFailure = true;
	try {
		switch (node.type) {
			case "TSStringKeyword": return ["String"];
			case "TSNumberKeyword": return ["Number"];
			case "TSBooleanKeyword": return ["Boolean"];
			case "TSObjectKeyword": return ["Object"];
			case "TSNullKeyword": return ["null"];
			case "TSTypeLiteral":
			case "TSInterfaceDeclaration": {
				const types = /* @__PURE__ */ new Set();
				const members = node.type === "TSTypeLiteral" ? node.members : node.body.body;
				for (const m of members) if (isKeyOf) if (m.type === "TSPropertySignature" && m.key.type === "NumericLiteral") types.add("Number");
				else if (m.type === "TSIndexSignature") {
					const annotation = m.parameters[0].typeAnnotation;
					if (annotation && annotation.type !== "Noop") {
						const type = inferRuntimeType(ctx, annotation.typeAnnotation, scope)[0];
						if (type === UNKNOWN_TYPE) return [UNKNOWN_TYPE];
						types.add(type);
					}
				} else types.add("String");
				else if (m.type === "TSCallSignatureDeclaration" || m.type === "TSConstructSignatureDeclaration") types.add("Function");
				else types.add("Object");
				return types.size ? Array.from(types) : [isKeyOf ? UNKNOWN_TYPE : "Object"];
			}
			case "TSPropertySignature":
				if (node.typeAnnotation) return inferRuntimeType(ctx, node.typeAnnotation.typeAnnotation, scope);
				break;
			case "TSMethodSignature":
			case "TSFunctionType": return ["Function"];
			case "TSArrayType":
			case "TSTupleType": return ["Array"];
			case "TSLiteralType": switch (node.literal.type) {
				case "StringLiteral": return ["String"];
				case "BooleanLiteral": return ["Boolean"];
				case "NumericLiteral":
				case "BigIntLiteral": return ["Number"];
				default: return [UNKNOWN_TYPE];
			}
			case "TSTypeReference": {
				const resolved = resolveTypeReference(ctx, node, scope);
				if (resolved) {
					if (resolved.type === "TSTypeAliasDeclaration") {
						if (resolved.typeAnnotation.type === "TSFunctionType") return ["Function"];
						if (node.typeParameters) {
							const typeParams = Object.create(null);
							if (resolved.typeParameters) resolved.typeParameters.params.forEach((p, i) => {
								typeParams[p.name] = node.typeParameters.params[i];
							});
							return inferRuntimeType(ctx, resolved.typeAnnotation, resolved._ownerScope, isKeyOf, typeParams);
						}
					}
					return inferRuntimeType(ctx, resolved, resolved._ownerScope, isKeyOf);
				}
				if (node.typeName.type === "Identifier") {
					if (typeParameters && typeParameters[node.typeName.name]) return inferRuntimeType(ctx, typeParameters[node.typeName.name], scope, isKeyOf, typeParameters);
					if (isKeyOf) switch (node.typeName.name) {
						case "String":
						case "Array":
						case "ArrayLike":
						case "Parameters":
						case "ConstructorParameters":
						case "ReadonlyArray": return ["String", "Number"];
						case "Record":
						case "Partial":
						case "Required":
						case "Readonly":
							if (node.typeParameters && node.typeParameters.params[0]) return inferRuntimeType(ctx, node.typeParameters.params[0], scope, true);
							break;
						case "Pick":
						case "Extract":
							if (node.typeParameters && node.typeParameters.params[1]) return inferRuntimeType(ctx, node.typeParameters.params[1], scope);
							break;
						case "Function":
						case "Object":
						case "Set":
						case "Map":
						case "WeakSet":
						case "WeakMap":
						case "Date":
						case "Promise":
						case "Error":
						case "Uppercase":
						case "Lowercase":
						case "Capitalize":
						case "Uncapitalize":
						case "ReadonlyMap":
						case "ReadonlySet": return ["String"];
					}
					else switch (node.typeName.name) {
						case "Array":
						case "Function":
						case "Object":
						case "Set":
						case "Map":
						case "WeakSet":
						case "WeakMap":
						case "Date":
						case "Promise":
						case "Error": return [node.typeName.name];
						case "Partial":
						case "Required":
						case "Readonly":
						case "Record":
						case "Pick":
						case "Omit":
						case "InstanceType": return ["Object"];
						case "Uppercase":
						case "Lowercase":
						case "Capitalize":
						case "Uncapitalize": return ["String"];
						case "Parameters":
						case "ConstructorParameters":
						case "ReadonlyArray": return ["Array"];
						case "ReadonlyMap": return ["Map"];
						case "ReadonlySet": return ["Set"];
						case "NonNullable":
							if (node.typeParameters && node.typeParameters.params[0]) return inferRuntimeType(ctx, node.typeParameters.params[0], scope).filter((t) => t !== "null");
							break;
						case "Extract":
							if (node.typeParameters && node.typeParameters.params[1]) return inferRuntimeType(ctx, node.typeParameters.params[1], scope);
							break;
						case "Exclude":
						case "OmitThisParameter":
							if (node.typeParameters && node.typeParameters.params[0]) return inferRuntimeType(ctx, node.typeParameters.params[0], scope);
							break;
					}
				}
				break;
			}
			case "TSParenthesizedType": return inferRuntimeType(ctx, node.typeAnnotation, scope);
			case "TSUnionType": return flattenTypes(ctx, node.types, scope, isKeyOf, typeParameters);
			case "TSIntersectionType": return flattenTypes(ctx, node.types, scope, isKeyOf, typeParameters).filter((t) => t !== UNKNOWN_TYPE);
			case "TSMappedType": {
				const { typeAnnotation, typeParameter } = node;
				if (typeAnnotation && typeAnnotation.type === "TSIndexedAccessType" && typeParameter && typeParameter.constraint && typeParameters) {
					const constraint = typeParameter.constraint;
					if (constraint.type === "TSTypeOperator" && constraint.operator === "keyof" && constraint.typeAnnotation && constraint.typeAnnotation.type === "TSTypeReference" && constraint.typeAnnotation.typeName.type === "Identifier") {
						const typeName = constraint.typeAnnotation.typeName.name;
						const index = typeAnnotation.indexType;
						const obj = typeAnnotation.objectType;
						if (obj && obj.type === "TSTypeReference" && obj.typeName.type === "Identifier" && obj.typeName.name === typeName && index && index.type === "TSTypeReference" && index.typeName.type === "Identifier" && index.typeName.name === typeParameter.name) {
							const targetType = typeParameters[typeName];
							if (targetType) return inferRuntimeType(ctx, targetType, scope);
						}
					}
				}
				return [UNKNOWN_TYPE];
			}
			case "TSEnumDeclaration": return inferEnumType(node);
			case "TSSymbolKeyword": return ["Symbol"];
			case "TSIndexedAccessType": return flattenTypes(ctx, resolveIndexType(ctx, node, scope), scope, isKeyOf);
			case "ClassDeclaration": return ["Object"];
			case "TSImportType": {
				const resolved = resolveTypeReference(ctx, node, importSourceToScope(ctx, node.argument, scope, node.argument.value));
				if (resolved) return inferRuntimeType(ctx, resolved, resolved._ownerScope);
				break;
			}
			case "TSTypeQuery": {
				const id = node.exprName;
				if (id.type === "Identifier") {
					const matched = scope.declares[id.name];
					if (matched) return inferRuntimeType(ctx, matched, matched._ownerScope, isKeyOf);
				}
				break;
			}
			case "TSTypeOperator": return inferRuntimeType(ctx, node.typeAnnotation, scope, node.operator === "keyof");
			case "TSAnyKeyword":
				if (isKeyOf) return [
					"String",
					"Number",
					"Symbol"
				];
				break;
		}
	} catch (e) {} finally {
		ctx.silentOnExtendsFailure = prevSilent;
	}
	return [UNKNOWN_TYPE];
}
function flattenTypes(ctx, types, scope, isKeyOf = false, typeParameters = void 0) {
	if (types.length === 1) return inferRuntimeType(ctx, types[0], types[0]._ownerScope || scope, isKeyOf, typeParameters);
	return [...new Set([].concat(...types.map((t) => inferRuntimeType(ctx, t, t._ownerScope || scope, isKeyOf, typeParameters))))];
}
function inferEnumType(node) {
	const types = /* @__PURE__ */ new Set();
	for (const m of node.members) if (m.initializer) switch (m.initializer.type) {
		case "StringLiteral":
			types.add("String");
			break;
		case "NumericLiteral":
			types.add("Number");
			break;
	}
	return types.size ? [...types] : ["Number"];
}
/**
* support for the `ExtractPropTypes` helper - it's non-exhaustive, mostly
* tailored towards popular component libs like element-plus and antd-vue.
*/
function resolveExtractPropTypes({ props }, scope) {
	const res = { props: {} };
	for (const key in props) {
		const raw = props[key];
		res.props[key] = reverseInferType(raw.key, raw.typeAnnotation.typeAnnotation, scope);
	}
	return res;
}
function reverseInferType(key, node, scope, optional = true, checkObjectSyntax = true) {
	if (checkObjectSyntax && node.type === "TSTypeLiteral") {
		const typeType = findStaticPropertyType(node, "type");
		if (typeType) {
			const requiredType = findStaticPropertyType(node, "required");
			return reverseInferType(key, typeType, scope, requiredType && requiredType.type === "TSLiteralType" && requiredType.literal.type === "BooleanLiteral" ? !requiredType.literal.value : true, false);
		}
	} else if (node.type === "TSTypeReference" && node.typeName.type === "Identifier") {
		if (node.typeName.name.endsWith("Constructor")) return createProperty(key, ctorToType(node.typeName.name), scope, optional);
		else if (node.typeName.name === "PropType" && node.typeParameters) return createProperty(key, node.typeParameters.params[0], scope, optional);
	}
	if ((node.type === "TSTypeReference" || node.type === "TSImportType") && node.typeParameters) for (const t of node.typeParameters.params) {
		const inferred = reverseInferType(key, t, scope, optional);
		if (inferred) return inferred;
	}
	return createProperty(key, { type: `TSNullKeyword` }, scope, optional);
}
function ctorToType(ctorType) {
	const ctor = ctorType.slice(0, -11);
	switch (ctor) {
		case "String":
		case "Number":
		case "Boolean": return { type: `TS${ctor}Keyword` };
		case "Array":
		case "Function":
		case "Object":
		case "Set":
		case "Map":
		case "WeakSet":
		case "WeakMap":
		case "Date":
		case "Promise": return {
			type: "TSTypeReference",
			typeName: {
				type: "Identifier",
				name: ctor
			}
		};
	}
	return { type: `TSNullKeyword` };
}
function findStaticPropertyType(node, key) {
	const prop = node.members.find((m) => m.type === "TSPropertySignature" && getStringLiteralKey(m) === key && m.typeAnnotation);
	return prop && prop.typeAnnotation.typeAnnotation;
}
function resolveReturnType(ctx, arg, scope) {
	let resolved = arg;
	if (arg.type === "TSTypeReference" || arg.type === "TSTypeQuery" || arg.type === "TSImportType") resolved = resolveTypeReference(ctx, arg, scope);
	if (!resolved) return;
	if (resolved.type === "TSFunctionType") {
		var _resolved$typeAnnotat;
		return (_resolved$typeAnnotat = resolved.typeAnnotation) === null || _resolved$typeAnnotat === void 0 ? void 0 : _resolved$typeAnnotat.typeAnnotation;
	}
	if (resolved.type === "TSDeclareFunction") return resolved.returnType;
}
function resolveUnionType(ctx, node, scope) {
	if (node.type === "TSTypeReference") {
		const resolved = resolveTypeReference(ctx, node, scope);
		if (resolved) node = resolved;
	}
	let types;
	if (node.type === "TSUnionType") types = node.types.flatMap((node) => resolveUnionType(ctx, node, scope));
	else types = [node];
	return types;
}

//#endregion
//#region packages/compiler-sfc/src/script/defineModel.ts
const DEFINE_MODEL = "defineModel";
function processDefineModel(ctx, node, declId) {
	if (!isCallOf(node, DEFINE_MODEL)) return false;
	ctx.hasDefineModelCall = true;
	const type = node.typeParameters && node.typeParameters.params[0] || void 0;
	let modelName;
	let options;
	const arg0 = node.arguments[0] && (0, _vue_compiler_dom.unwrapTSNode)(node.arguments[0]);
	const hasName = arg0 && arg0.type === "StringLiteral";
	if (hasName) {
		modelName = arg0.value;
		options = node.arguments[1];
	} else {
		modelName = "modelValue";
		options = arg0;
	}
	if (ctx.modelDecls[modelName]) ctx.error(`duplicate model name ${JSON.stringify(modelName)}`, node);
	let optionsString = options && ctx.getString(options);
	let optionsRemoved = !options;
	const runtimeOptionNodes = [];
	if (options && options.type === "ObjectExpression" && !options.properties.some((p) => p.type === "SpreadElement" || p.computed)) {
		let removed = 0;
		for (let i = options.properties.length - 1; i >= 0; i--) {
			const p = options.properties[i];
			const next = options.properties[i + 1];
			const start = p.start;
			const end = next ? next.start : options.end - 1;
			if ((p.type === "ObjectProperty" || p.type === "ObjectMethod") && (p.key.type === "Identifier" && (p.key.name === "get" || p.key.name === "set") || p.key.type === "StringLiteral" && (p.key.value === "get" || p.key.value === "set"))) optionsString = optionsString.slice(0, start - options.start) + optionsString.slice(end - options.start);
			else {
				removed++;
				ctx.s.remove(ctx.startOffset + start, ctx.startOffset + end);
				runtimeOptionNodes.push(p);
			}
		}
		if (removed === options.properties.length) {
			optionsRemoved = true;
			ctx.s.remove(ctx.startOffset + (hasName ? arg0.end : options.start), ctx.startOffset + options.end);
		}
	}
	ctx.modelDecls[modelName] = {
		type,
		options: optionsString,
		runtimeOptionNodes,
		identifier: declId && declId.type === "Identifier" ? declId.name : void 0
	};
	ctx.bindingMetadata[modelName] = "props";
	ctx.s.overwrite(ctx.startOffset + node.callee.start, ctx.startOffset + node.callee.end, ctx.helper("useModel"));
	ctx.s.appendLeft(ctx.startOffset + (node.arguments.length ? node.arguments[0].start : node.end - 1), `__props, ` + (hasName ? `` : `${JSON.stringify(modelName)}${optionsRemoved ? `` : `, `}`));
	return true;
}
function genModelProps(ctx) {
	if (!ctx.hasDefineModelCall) return;
	const isProd = !!ctx.options.isProd;
	let modelPropsDecl = "";
	for (const [name, { type, options: runtimeOptions }] of Object.entries(ctx.modelDecls)) {
		let skipCheck = false;
		let codegenOptions = ``;
		let runtimeTypes = type && inferRuntimeType(ctx, type);
		if (runtimeTypes) {
			const hasBoolean = runtimeTypes.includes("Boolean");
			const hasFunction = runtimeTypes.includes("Function");
			if (runtimeTypes.includes(UNKNOWN_TYPE)) if (hasBoolean || hasFunction) {
				runtimeTypes = runtimeTypes.filter((t) => t !== UNKNOWN_TYPE);
				skipCheck = true;
			} else runtimeTypes = ["null"];
			if (!isProd) codegenOptions = `type: ${toRuntimeTypeString(runtimeTypes)}` + (skipCheck ? ", skipCheck: true" : "");
			else if (hasBoolean || runtimeOptions && hasFunction) codegenOptions = `type: ${toRuntimeTypeString(runtimeTypes)}`;
		}
		let decl;
		if (codegenOptions && runtimeOptions) decl = ctx.isTS || ctx.isUTS ? `{ ${codegenOptions}, ...${runtimeOptions} }` : `Object.assign({ ${codegenOptions} }, ${runtimeOptions})`;
		else if (codegenOptions) decl = `{ ${codegenOptions} }`;
		else if (runtimeOptions) decl = runtimeOptions;
		else decl = `{}`;
		modelPropsDecl += `\n    ${JSON.stringify(name)}: ${decl},`;
		const modifierPropName = JSON.stringify((0, _vue_shared.getModifierPropName)(name));
		modelPropsDecl += `\n    ${modifierPropName}: {},`;
	}
	return `{${modelPropsDecl}\n  }`;
}

//#endregion
//#region packages/compiler-sfc/src/script/defineProps.ts
const DEFINE_PROPS = "defineProps";
const WITH_DEFAULTS = "withDefaults";
function processDefineProps(ctx, node, declId, isWithDefaults = false) {
	if (!isCallOf(node, DEFINE_PROPS)) return processWithDefaults(ctx, node, declId);
	if (ctx.hasDefinePropsCall) ctx.error(`duplicate ${DEFINE_PROPS}() call`, node);
	ctx.hasDefinePropsCall = true;
	ctx.propsRuntimeDecl = node.arguments[0];
	if (ctx.propsRuntimeDecl) {
		for (const key of getObjectOrArrayExpressionKeys(ctx.propsRuntimeDecl)) if (!(key in ctx.bindingMetadata)) ctx.bindingMetadata[key] = "props";
	}
	if (node.typeParameters) {
		if (ctx.propsRuntimeDecl) ctx.error(`${DEFINE_PROPS}() cannot accept both type and non-type arguments at the same time. Use one or the other.`, node);
		ctx.propsTypeDecl = node.typeParameters.params[0];
		const { props } = resolveTypeElements(ctx, ctx.propsTypeDecl);
		if (props) {
			for (const key in props) if (!(key in ctx.bindingMetadata)) ctx.bindingMetadata[key] = "props";
		}
	}
	if (!isWithDefaults && declId && declId.type === "ObjectPattern") processPropsDestructure(ctx, declId);
	ctx.propsCall = node;
	ctx.propsDecl = declId;
	return true;
}
function processWithDefaults(ctx, node, declId) {
	if (!isCallOf(node, WITH_DEFAULTS)) return false;
	if (!processDefineProps(ctx, node.arguments[0], declId, true)) ctx.error(`${WITH_DEFAULTS}' first argument must be a ${DEFINE_PROPS} call.`, node.arguments[0] || node);
	if (ctx.propsRuntimeDecl) ctx.error(`${WITH_DEFAULTS} can only be used with type-based ${DEFINE_PROPS} declaration.`, node);
	if (declId && declId.type === "ObjectPattern") ctx.warn(`${WITH_DEFAULTS}() is unnecessary when using destructure with ${DEFINE_PROPS}().\nReactive destructure will be disabled when using withDefaults().\nPrefer using destructure default values, e.g. const { foo = 1 } = defineProps(...). `, node.callee);
	ctx.propsRuntimeDefaults = node.arguments[1];
	if (!ctx.propsRuntimeDefaults) ctx.error(`The 2nd argument of ${WITH_DEFAULTS} is required.`, node);
	ctx.propsCall = node;
	return true;
}
function genRuntimeProps(ctx) {
	let propsDecls;
	if (ctx.propsRuntimeDecl) {
		propsDecls = ctx.getString(ctx.propsRuntimeDecl).trim();
		if (ctx.propsDestructureDecl) {
			const defaults = [];
			for (const key in ctx.propsDestructuredBindings) {
				const d = genDestructuredDefaultValue(ctx, key);
				const finalKey = getEscapedPropName(key);
				if (d) defaults.push(`${finalKey}: ${d.valueString}${d.needSkipFactory ? `, __skip_${finalKey}: true` : ``}`);
			}
			if (defaults.length) propsDecls = `/*@__PURE__*/${ctx.helper(`mergeDefaults`)}(${propsDecls}, {\n  ${defaults.join(",\n  ")}\n})`;
		}
	} else if (ctx.propsTypeDecl) propsDecls = extractRuntimeProps(ctx);
	const modelsDecls = genModelProps(ctx);
	if (propsDecls && modelsDecls) return `/*@__PURE__*/${ctx.helper("mergeModels")}(${propsDecls}, ${modelsDecls})`;
	else return modelsDecls || propsDecls;
}
function extractRuntimeProps(ctx) {
	const props = resolveRuntimePropsFromType(ctx, ctx.propsTypeDecl);
	if (!props.length) return;
	const propStrings = [];
	const hasStaticDefaults = hasStaticWithDefaults(ctx);
	for (const prop of props) propStrings.push(genRuntimePropFromType(ctx, prop, hasStaticDefaults));
	let propsDecls = `{
    ${propStrings.join(",\n    ")}\n  }`;
	if (ctx.propsRuntimeDefaults && !hasStaticDefaults) propsDecls = `/*@__PURE__*/${ctx.helper("mergeDefaults")}(${propsDecls}, ${ctx.getString(ctx.propsRuntimeDefaults)})`;
	return propsDecls;
}
function resolveRuntimePropsFromType(ctx, node) {
	const props = [];
	const elements = resolveTypeElements(ctx, node);
	for (const key in elements.props) {
		const e = elements.props[key];
		let type = inferRuntimeType(ctx, e);
		let skipCheck = false;
		if (type.includes(UNKNOWN_TYPE)) if (type.includes("Boolean") || type.includes("Function")) {
			type = type.filter((t) => t !== UNKNOWN_TYPE);
			skipCheck = true;
		} else type = ["null"];
		props.push({
			key,
			required: !e.optional,
			type: type || [`null`],
			skipCheck
		});
	}
	return props;
}
function genRuntimePropFromType(ctx, { key, required, type, skipCheck }, hasStaticDefaults) {
	let defaultString;
	const destructured = genDestructuredDefaultValue(ctx, key, type);
	if (destructured) defaultString = `default: ${destructured.valueString}${destructured.needSkipFactory ? `, skipFactory: true` : ``}`;
	else if (hasStaticDefaults) {
		const prop = ctx.propsRuntimeDefaults.properties.find((node) => {
			if (node.type === "SpreadElement") return false;
			return resolveObjectKey(node.key, node.computed) === key;
		});
		if (prop) if (prop.type === "ObjectProperty") defaultString = `default: ${ctx.getString(prop.value)}`;
		else defaultString = `${prop.async ? "async " : ""}${prop.kind !== "method" ? `${prop.kind} ` : ""}default() ${ctx.getString(prop.body)}`;
	}
	const finalKey = getEscapedPropName(key);
	if (!ctx.options.isProd) return `${finalKey}: { ${concatStrings([
		`type: ${toRuntimeTypeString(type)}`,
		`required: ${required}`,
		skipCheck && "skipCheck: true",
		defaultString
	])} }`;
	else if (type.some((el) => el === "Boolean" || (!hasStaticDefaults || defaultString) && el === "Function")) return `${finalKey}: { ${concatStrings([`type: ${toRuntimeTypeString(type)}`, defaultString])} }`;
	else {
		if (ctx.isCE) if (defaultString) return `${finalKey}: ${`{ ${defaultString}, type: ${toRuntimeTypeString(type)} }`}`;
		else return `${finalKey}: {type: ${toRuntimeTypeString(type)}}`;
		return `${finalKey}: ${defaultString ? `{ ${defaultString} }` : `{}`}`;
	}
}
/**
* check defaults. If the default object is an object literal with only
* static properties, we can directly generate more optimized default
* declarations. Otherwise we will have to fallback to runtime merging.
*/
function hasStaticWithDefaults(ctx) {
	return !!(ctx.propsRuntimeDefaults && ctx.propsRuntimeDefaults.type === "ObjectExpression" && ctx.propsRuntimeDefaults.properties.every((node) => node.type !== "SpreadElement" && (!node.computed || node.key.type.endsWith("Literal"))));
}
function genDestructuredDefaultValue(ctx, key, inferredType) {
	const destructured = ctx.propsDestructuredBindings[key];
	const defaultVal = destructured && destructured.default;
	if (defaultVal) {
		const value = ctx.getString(defaultVal);
		const unwrapped = (0, _vue_compiler_dom.unwrapTSNode)(defaultVal);
		if (inferredType && inferredType.length && !inferredType.includes("null")) {
			const valueType = inferValueType(unwrapped);
			if (valueType && !inferredType.includes(valueType)) ctx.error(`Default value of prop "${key}" does not match declared type.`, unwrapped);
		}
		const needSkipFactory = !inferredType && ((0, _vue_compiler_dom.isFunctionType)(unwrapped) || unwrapped.type === "Identifier");
		return {
			valueString: !needSkipFactory && !isLiteralNode(unwrapped) && !(inferredType === null || inferredType === void 0 ? void 0 : inferredType.includes("Function")) ? `() => (${value})` : value,
			needSkipFactory
		};
	}
}
function inferValueType(node) {
	switch (node.type) {
		case "StringLiteral": return "String";
		case "NumericLiteral": return "Number";
		case "BooleanLiteral": return "Boolean";
		case "ObjectExpression": return "Object";
		case "ArrayExpression": return "Array";
		case "FunctionExpression":
		case "ArrowFunctionExpression": return "Function";
	}
}

//#endregion
//#region packages/compiler-sfc/src/script/definePropsDestructure.ts
function processPropsDestructure(ctx, declId) {
	if (ctx.options.propsDestructure === "error") ctx.error(`Props destructure is explicitly prohibited via config.`, declId);
	else if (ctx.options.propsDestructure === false) return;
	ctx.propsDestructureDecl = declId;
	const registerBinding = (key, local, defaultValue) => {
		ctx.propsDestructuredBindings[key] = {
			local,
			default: defaultValue
		};
		if (local !== key) {
			ctx.bindingMetadata[local] = "props-aliased";
			(ctx.bindingMetadata.__propsAliases || (ctx.bindingMetadata.__propsAliases = {}))[local] = key;
		}
	};
	for (const prop of declId.properties) if (prop.type === "ObjectProperty") {
		const propKey = resolveObjectKey(prop.key, prop.computed);
		if (!propKey) ctx.error(`${DEFINE_PROPS}() destructure cannot use computed key.`, prop.key);
		if (prop.value.type === "AssignmentPattern") {
			const { left, right } = prop.value;
			if (left.type !== "Identifier") ctx.error(`${DEFINE_PROPS}() destructure does not support nested patterns.`, left);
			registerBinding(propKey, left.name, right);
		} else if (prop.value.type === "Identifier") registerBinding(propKey, prop.value.name);
		else ctx.error(`${DEFINE_PROPS}() destructure does not support nested patterns.`, prop.value);
	} else {
		ctx.propsDestructureRestId = prop.argument.name;
		ctx.bindingMetadata[ctx.propsDestructureRestId] = "setup-reactive-const";
	}
}
function transformDestructuredProps(ctx, vueImportAliases) {
	if (ctx.options.propsDestructure === false) return;
	const rootScope = Object.create(null);
	const scopeStack = [rootScope];
	let currentScope = rootScope;
	const excludedIds = /* @__PURE__ */ new WeakSet();
	const parentStack = [];
	const propsLocalToPublicMap = Object.create(null);
	for (const key in ctx.propsDestructuredBindings) {
		const { local } = ctx.propsDestructuredBindings[key];
		rootScope[local] = true;
		propsLocalToPublicMap[local] = key;
	}
	function pushScope() {
		scopeStack.push(currentScope = Object.create(currentScope));
	}
	function popScope() {
		scopeStack.pop();
		currentScope = scopeStack[scopeStack.length - 1] || null;
	}
	function registerLocalBinding(id) {
		excludedIds.add(id);
		if (currentScope) currentScope[id.name] = false;
		else ctx.error("registerBinding called without active scope, something is wrong.", id);
	}
	function walkScope(node, isRoot = false) {
		for (const stmt of node.body) if (stmt.type === "VariableDeclaration") walkVariableDeclaration(stmt, isRoot);
		else if (stmt.type === "FunctionDeclaration" || stmt.type === "ClassDeclaration") {
			if (stmt.declare || !stmt.id) continue;
			registerLocalBinding(stmt.id);
		} else if (stmt.type === "ExportNamedDeclaration" && stmt.declaration && stmt.declaration.type === "VariableDeclaration") walkVariableDeclaration(stmt.declaration, isRoot);
		else if (stmt.type === "LabeledStatement" && stmt.body.type === "VariableDeclaration") walkVariableDeclaration(stmt.body, isRoot);
	}
	function walkVariableDeclaration(stmt, isRoot = false) {
		if (stmt.declare) return;
		for (const decl of stmt.declarations) {
			const isDefineProps = isRoot && decl.init && isCallOf((0, _vue_compiler_dom.unwrapTSNode)(decl.init), "defineProps");
			for (const id of (0, _vue_compiler_dom.extractIdentifiers)(decl.id)) if (isDefineProps) excludedIds.add(id);
			else registerLocalBinding(id);
		}
	}
	function rewriteId(id, parent, parentStack) {
		if (parent.type === "AssignmentExpression" && id === parent.left || parent.type === "UpdateExpression") ctx.error(`Cannot assign to destructured props as they are readonly.`, id);
		if ((0, _vue_compiler_dom.isStaticProperty)(parent) && parent.shorthand) {
			if (!parent.inPattern || (0, _vue_compiler_dom.isInDestructureAssignment)(parent, parentStack)) ctx.s.appendLeft(id.end + ctx.startOffset, `: ${(0, _vue_shared.genPropsAccessExp)(propsLocalToPublicMap[id.name])}`);
		} else ctx.s.overwrite(id.start + ctx.startOffset, id.end + ctx.startOffset, (0, _vue_shared.genPropsAccessExp)(propsLocalToPublicMap[id.name]));
	}
	function checkUsage(node, method, alias = method) {
		if (isCallOf(node, alias)) {
			const arg = (0, _vue_compiler_dom.unwrapTSNode)(node.arguments[0]);
			if (arg.type === "Identifier" && currentScope[arg.name]) ctx.error(`"${arg.name}" is a destructured prop and should not be passed directly to ${method}(). Pass a getter () => ${arg.name} instead.`, arg);
		}
	}
	const ast = ctx.scriptSetupAst;
	walkScope(ast, true);
	(0, estree_walker.walk)(ast, {
		enter(node, parent) {
			parent && parentStack.push(parent);
			if (parent && parent.type.startsWith("TS") && !_vue_compiler_dom.TS_NODE_TYPES.includes(parent.type)) return this.skip();
			checkUsage(node, "watch", vueImportAliases.watch);
			checkUsage(node, "toRef", vueImportAliases.toRef);
			if ((0, _vue_compiler_dom.isFunctionType)(node)) {
				pushScope();
				(0, _vue_compiler_dom.walkFunctionParams)(node, registerLocalBinding);
				if (node.body.type === "BlockStatement") walkScope(node.body);
				return;
			}
			if (node.type === "CatchClause") {
				pushScope();
				if (node.param && node.param.type === "Identifier") registerLocalBinding(node.param);
				walkScope(node.body);
				return;
			}
			if (node.type === "ForOfStatement" || node.type === "ForInStatement" || node.type === "ForStatement") {
				pushScope();
				const varDecl = node.type === "ForStatement" ? node.init : node.left;
				if (varDecl && varDecl.type === "VariableDeclaration") walkVariableDeclaration(varDecl);
				if (node.body.type === "BlockStatement") walkScope(node.body);
				return;
			}
			if (node.type === "BlockStatement" && !(0, _vue_compiler_dom.isFunctionType)(parent)) {
				pushScope();
				walkScope(node);
				return;
			}
			if (node.type === "Identifier") {
				if ((0, _vue_compiler_dom.isReferencedIdentifier)(node, parent, parentStack) && !excludedIds.has(node)) {
					if (currentScope[node.name]) rewriteId(node, parent, parentStack);
				}
			}
		},
		leave(node, parent) {
			parent && parentStack.pop();
			if (node.type === "BlockStatement" && !(0, _vue_compiler_dom.isFunctionType)(parent) || (0, _vue_compiler_dom.isFunctionType)(node) || node.type === "CatchClause" || node.type === "ForOfStatement" || node.type === "ForInStatement" || node.type === "ForStatement") popScope();
		}
	});
}

//#endregion
//#region packages/compiler-sfc/src/script/defineEmits.ts
const DEFINE_EMITS = "defineEmits";
function processDefineEmits(ctx, node, declId) {
	if (!isCallOf(node, DEFINE_EMITS)) return false;
	if (ctx.hasDefineEmitCall) ctx.error(`duplicate ${DEFINE_EMITS}() call`, node);
	ctx.hasDefineEmitCall = true;
	ctx.emitsRuntimeDecl = node.arguments[0];
	if (node.typeParameters) {
		if (ctx.emitsRuntimeDecl) ctx.error(`${DEFINE_EMITS}() cannot accept both type and non-type arguments at the same time. Use one or the other.`, node);
		ctx.emitsTypeDecl = node.typeParameters.params[0];
	}
	ctx.emitDecl = declId;
	return true;
}
function genRuntimeEmits(ctx) {
	let emitsDecl = "";
	if (ctx.emitsRuntimeDecl) emitsDecl = ctx.getString(ctx.emitsRuntimeDecl).trim();
	else if (ctx.emitsTypeDecl) {
		const typeDeclaredEmits = extractRuntimeEmits(ctx);
		emitsDecl = typeDeclaredEmits.size ? `[${Array.from(typeDeclaredEmits).map((k) => JSON.stringify(k)).join(", ")}]` : ``;
	}
	if (ctx.hasDefineModelCall) {
		let modelEmitsDecl = `[${Object.keys(ctx.modelDecls).map((n) => JSON.stringify(`update:${n}`)).join(", ")}]`;
		emitsDecl = emitsDecl ? `/*@__PURE__*/${ctx.helper("mergeModels")}(${emitsDecl}, ${modelEmitsDecl})` : modelEmitsDecl;
	}
	return emitsDecl;
}
function extractRuntimeEmits(ctx) {
	const emits = /* @__PURE__ */ new Set();
	const node = ctx.emitsTypeDecl;
	if (node.type === "TSFunctionType") {
		extractEventNames(ctx, node.parameters[0], emits);
		return emits;
	}
	const { props, calls } = resolveTypeElements(ctx, node);
	let hasProperty = false;
	for (const key in props) {
		emits.add(key);
		hasProperty = true;
	}
	if (calls) {
		if (hasProperty) ctx.error(`defineEmits() type cannot mixed call signature and property syntax.`, node);
		for (const call of calls) extractEventNames(ctx, call.parameters[0], emits);
	}
	return emits;
}
function extractEventNames(ctx, eventName, emits) {
	if (eventName.type === "Identifier" && eventName.typeAnnotation && eventName.typeAnnotation.type === "TSTypeAnnotation") {
		const types = resolveUnionType(ctx, eventName.typeAnnotation.typeAnnotation);
		for (const type of types) if (type.type === "TSLiteralType") {
			if (type.literal.type !== "UnaryExpression" && type.literal.type !== "TemplateLiteral") emits.add(String(type.literal.value));
		}
	}
}

//#endregion
//#region packages/compiler-sfc/src/script/defineExpose.ts
const DEFINE_EXPOSE = "defineExpose";
function processDefineExpose(ctx, node) {
	if (isCallOf(node, DEFINE_EXPOSE)) {
		if (ctx.hasDefineExposeCall) ctx.error(`duplicate ${DEFINE_EXPOSE}() call`, node);
		ctx.hasDefineExposeCall = true;
		return true;
	}
	return false;
}

//#endregion
//#region packages/compiler-sfc/src/script/defineSlots.ts
const DEFINE_SLOTS = "defineSlots";
function processDefineSlots(ctx, node, declId) {
	if (!isCallOf(node, DEFINE_SLOTS)) return false;
	if (ctx.hasDefineSlotsCall) ctx.error(`duplicate ${DEFINE_SLOTS}() call`, node);
	ctx.hasDefineSlotsCall = true;
	if (node.arguments.length > 0) ctx.error(`${DEFINE_SLOTS}() cannot accept arguments`, node);
	if (declId) ctx.s.overwrite(ctx.startOffset + node.start, ctx.startOffset + node.end, `${ctx.helper("useSlots")}()`);
	return true;
}

//#endregion
//#region packages/compiler-sfc/src/script/defineOptions.ts
const DEFINE_OPTIONS = "defineOptions";
function processDefineOptions(ctx, node) {
	if (!isCallOf(node, DEFINE_OPTIONS)) return false;
	if (ctx.hasDefineOptionsCall) ctx.error(`duplicate ${DEFINE_OPTIONS}() call`, node);
	if (node.typeParameters) ctx.error(`${DEFINE_OPTIONS}() cannot accept type arguments`, node);
	if (!node.arguments[0]) return true;
	ctx.hasDefineOptionsCall = true;
	ctx.optionsRuntimeDecl = (0, _vue_compiler_dom.unwrapTSNode)(node.arguments[0]);
	let propsOption = void 0;
	let emitsOption = void 0;
	let exposeOption = void 0;
	let slotsOption = void 0;
	let hasRootElementOption = void 0;
	if (ctx.optionsRuntimeDecl.type === "ObjectExpression") {
		for (const prop of ctx.optionsRuntimeDecl.properties) if ((prop.type === "ObjectProperty" || prop.type === "ObjectMethod") && prop.key.type === "Identifier") switch (prop.key.name) {
			case "props":
				propsOption = prop;
				break;
			case "emits":
				emitsOption = prop;
				break;
			case "expose":
				exposeOption = prop;
				break;
			case "slots":
				slotsOption = prop;
				break;
			case "name":
				if (prop.type === "ObjectProperty") {
					if (prop.value.type === "StringLiteral") ctx.rootElementTagName = prop.value.value;
				}
				break;
			case "rootElement":
				hasRootElementOption = true;
				break;
		}
	}
	if (ctx.rootElementTagName) {
		if (!hasRootElementOption) delete ctx.rootElementTagName;
	}
	if (propsOption) ctx.error(`${DEFINE_OPTIONS}() cannot be used to declare props. Use ${DEFINE_PROPS}() instead.`, propsOption);
	if (emitsOption) ctx.error(`${DEFINE_OPTIONS}() cannot be used to declare emits. Use ${DEFINE_EMITS}() instead.`, emitsOption);
	if (exposeOption) ctx.error(`${DEFINE_OPTIONS}() cannot be used to declare expose. Use ${DEFINE_EXPOSE}() instead.`, exposeOption);
	if (slotsOption) ctx.error(`${DEFINE_OPTIONS}() cannot be used to declare slots. Use ${DEFINE_SLOTS}() instead.`, slotsOption);
	return true;
}

//#endregion
//#region packages/compiler-sfc/src/script/topLevelAwait.ts
/**
* Support context-persistence between top-level await expressions:
*
* ```js
* const instance = getCurrentInstance()
* await foo()
* expect(getCurrentInstance()).toBe(instance)
* ```
*
* In the future we can potentially get rid of this when Async Context
* becomes generally available: https://github.com/tc39/proposal-async-context
*
* ```js
* // input
* await foo()
* // output
* ;(
*   ([__temp,__restore] = withAsyncContext(() => foo())),
*   await __temp,
*   __restore()
* )
*
* // input
* const a = await foo()
* // output
* const a = (
*   ([__temp, __restore] = withAsyncContext(() => foo())),
*   __temp = await __temp,
*   __restore(),
*   __temp
* )
* ```
*/
function processAwait(ctx, node, needSemi, isStatement) {
	const argumentStart = node.argument.extra && node.argument.extra.parenthesized ? node.argument.extra.parenStart : node.argument.start;
	const startOffset = ctx.startOffset;
	const argumentStr = ctx.descriptor.source.slice(argumentStart + startOffset, node.argument.end + startOffset);
	const containsNestedAwait = /\bawait\b/.test(argumentStr);
	ctx.s.overwrite(node.start + startOffset, argumentStart + startOffset, `${needSemi ? `;` : ``}(\n  ([__temp,__restore] = ${ctx.helper(`withAsyncContext`)}(${containsNestedAwait ? `async ` : ``}() => `);
	ctx.s.appendLeft(node.end + startOffset, `)),\n  ${isStatement ? `` : `__temp = `}await __temp,\n  __restore()${isStatement ? `` : `,\n  __temp`}\n)`);
}

//#endregion
//#region packages/compiler-sfc/src/compileScript.ts
const MACROS = [
	DEFINE_PROPS,
	DEFINE_EMITS,
	DEFINE_EXPOSE,
	DEFINE_OPTIONS,
	DEFINE_SLOTS,
	DEFINE_MODEL,
	WITH_DEFAULTS
];
/**
* Compile `<script setup>`
* It requires the whole SFC descriptor because we need to handle and merge
* normal `<script>` + `<script setup>` if both are present.
*/
function compileScript(sfc, options) {
	var _options$templateOpti;
	if (!options.id) warnOnce("compileScript now requires passing the `id` option.\nUpgrade your vite or vue-loader version for compatibility with the latest experimental proposals.");
	const { script, scriptSetup, source, filename } = sfc;
	const hoistStatic = options.hoistStatic !== false && !script;
	const scopeId = options.id ? options.id.replace(/^data-v-/, "") : "";
	const scriptLang = script && script.lang;
	const scriptSetupLang = scriptSetup && scriptSetup.lang;
	const vapor = sfc.vapor || options.vapor;
	const ssr = (_options$templateOpti = options.templateOptions) === null || _options$templateOpti === void 0 ? void 0 : _options$templateOpti.ssr;
	const setupPreambleLines = [];
	const isJSOrTS = isJS(scriptLang, scriptSetupLang) || isTS(scriptLang, scriptSetupLang);
	if (script && scriptSetup && scriptLang !== scriptSetupLang) throw new Error("[@vue/compiler-sfc] <script> and <script setup> must have the same language type.");
	if (!scriptSetup) {
		if (!script) throw new Error(`[@vue/compiler-sfc] SFC contains no <script> tags.`);
		if (script.lang && !isJSOrTS) return script;
		return processNormalScript(new ScriptCompileContext(sfc, options), scopeId);
	}
	if (scriptSetupLang && !isJSOrTS) return scriptSetup;
	const ctx = new ScriptCompileContext(sfc, options);
	const scriptBindings = Object.create(null);
	const setupBindings = Object.create(null);
	let defaultExport;
	let hasAwait = false;
	let hasInlinedSsrRenderFn = false;
	const startOffset = ctx.startOffset;
	const endOffset = ctx.endOffset;
	const scriptStartOffset = script && script.loc.start.offset;
	const scriptEndOffset = script && script.loc.end.offset;
	function hoistNode(node) {
		const start = node.start + startOffset;
		let end = node.end + startOffset;
		if (node.trailingComments && node.trailingComments.length > 0) end = node.trailingComments[node.trailingComments.length - 1].end + startOffset;
		while (end <= source.length) {
			if (!/\s/.test(source.charAt(end))) break;
			end++;
		}
		ctx.s.move(start, end, 0);
	}
	function registerUserImport(source, local, imported, isType, isFromSetup, needTemplateUsageCheck) {
		let isImportUsed = needTemplateUsageCheck;
		if (needTemplateUsageCheck && (ctx.isTS || ctx.isUTS) && sfc.template && !sfc.template.src && !sfc.template.lang) isImportUsed = isUsedInTemplate(local, sfc);
		ctx.userImports[local] = {
			isType,
			imported,
			local,
			source,
			isFromSetup,
			isUsedInTemplate: isImportUsed
		};
	}
	function checkInvalidScopeReference(node, method) {
		if (!node) return;
		(0, _vue_compiler_dom.walkIdentifiers)(node, (id) => {
			const binding = setupBindings[id.name];
			if (binding && binding !== "literal-const") ctx.error(`\`${method}()\` in <script setup> cannot reference locally declared variables because it will be hoisted outside of the setup() function. If your component options require initialization in the module scope, use a separate normal <script> to export the options instead.`, id);
		});
	}
	function buildDestructureElements() {
		if (!sfc.template || !sfc.template.ast) return;
		const builtins = {
			$props: {
				bindingType: "setup-reactive-const",
				setup: () => setupPreambleLines.push(`const $props = __props`)
			},
			$emit: {
				bindingType: "setup-const",
				setup: () => ctx.emitDecl ? setupPreambleLines.push(`const $emit = __emit`) : destructureElements.push("emit: $emit")
			},
			$attrs: {
				bindingType: "setup-reactive-const",
				setup: () => destructureElements.push("attrs: $attrs")
			},
			$slots: {
				bindingType: "setup-reactive-const",
				setup: () => destructureElements.push("slots: $slots")
			}
		};
		for (const [name, config] of Object.entries(builtins)) if (isUsedInTemplate(name, sfc) && !ctx.bindingMetadata[name]) {
			config.setup();
			ctx.bindingMetadata[name] = config.bindingType;
		}
	}
	const scriptAst = ctx.scriptAst;
	const scriptSetupAst = ctx.scriptSetupAst;
	const inlineMode = options.inlineTemplate;
	if (scriptAst) {
		for (const node of scriptAst.body) if (node.type === "ImportDeclaration") for (const specifier of node.specifiers) {
			const imported = getImportedName(specifier);
			registerUserImport(node.source.value, specifier.local.name, imported, node.importKind === "type" || specifier.type === "ImportSpecifier" && specifier.importKind === "type", false, !inlineMode);
		}
	}
	for (const node of scriptSetupAst.body) if (node.type === "ImportDeclaration") {
		hoistNode(node);
		let removed = 0;
		const removeSpecifier = (i) => {
			const removeLeft = i > removed;
			removed++;
			const current = node.specifiers[i];
			const next = node.specifiers[i + 1];
			ctx.s.remove(removeLeft ? node.specifiers[i - 1].end + startOffset : current.start + startOffset, next && !removeLeft ? next.start + startOffset : current.end + startOffset);
		};
		for (let i = 0; i < node.specifiers.length; i++) {
			const specifier = node.specifiers[i];
			const local = specifier.local.name;
			const imported = getImportedName(specifier);
			const source = node.source.value;
			if (vapor && ssr && specifier.type === "ImportSpecifier" && source === "vue" && imported === "defineVaporAsyncComponent") ctx.s.overwrite(specifier.start + startOffset, specifier.end + startOffset, `defineAsyncComponent as ${local}`);
			const existing = ctx.userImports[local];
			if (source === "vue" && MACROS.includes(imported)) {
				if (local === imported) warnOnce(`\`${imported}\` is a compiler macro and no longer needs to be imported.`);
				else ctx.error(`\`${imported}\` is a compiler macro and cannot be aliased to a different name.`, specifier);
				removeSpecifier(i);
			} else if (existing) if (existing.source === source && existing.imported === imported) removeSpecifier(i);
			else ctx.error(`different imports aliased to same local name.`, specifier);
			else registerUserImport(source, local, imported, node.importKind === "type" || specifier.type === "ImportSpecifier" && specifier.importKind === "type", true, !inlineMode);
		}
		if (node.specifiers.length && removed === node.specifiers.length) ctx.s.remove(node.start + startOffset, node.end + startOffset);
	}
	const vueImportAliases = {};
	for (const key in ctx.userImports) {
		const { source, imported, local } = ctx.userImports[key];
		if (source === "vue") vueImportAliases[imported] = local;
	}
	if (script && scriptAst) {
		for (const node of scriptAst.body) if (node.type === "ExportDefaultDeclaration") {
			defaultExport = node;
			let optionProperties;
			if (defaultExport.declaration.type === "ObjectExpression") optionProperties = defaultExport.declaration.properties;
			else if (defaultExport.declaration.type === "CallExpression" && defaultExport.declaration.arguments[0] && defaultExport.declaration.arguments[0].type === "ObjectExpression") optionProperties = defaultExport.declaration.arguments[0].properties;
			if (optionProperties) for (const p of optionProperties) {
				if (p.type === "ObjectProperty" && p.key.type === "Identifier" && p.key.name === "name") ctx.hasDefaultExportName = true;
				if ((p.type === "ObjectMethod" || p.type === "ObjectProperty") && p.key.type === "Identifier" && p.key.name === "render") ctx.hasDefaultExportRender = true;
			}
			const start = node.start + scriptStartOffset;
			const end = node.declaration.start + scriptStartOffset;
			ctx.s.overwrite(start, end, `const ${normalScriptDefaultVar} = `);
		} else if (node.type === "ExportNamedDeclaration") {
			const defaultSpecifier = node.specifiers.find((s) => s.exported.type === "Identifier" && s.exported.name === "default");
			if (defaultSpecifier) {
				defaultExport = node;
				if (node.specifiers.length > 1) ctx.s.remove(defaultSpecifier.start + scriptStartOffset, defaultSpecifier.end + scriptStartOffset);
				else ctx.s.remove(node.start + scriptStartOffset, node.end + scriptStartOffset);
				if (node.source) ctx.s.prepend(`import { ${defaultSpecifier.local.name} as ${normalScriptDefaultVar} } from '${node.source.value}'\n`);
				else ctx.s.appendLeft(scriptEndOffset, `\nconst ${normalScriptDefaultVar} = ${defaultSpecifier.local.name}\n`);
			}
			if (node.declaration) walkDeclaration("script", node.declaration, scriptBindings, vueImportAliases, hoistStatic);
		} else if ((node.type === "VariableDeclaration" || node.type === "FunctionDeclaration" || node.type === "ClassDeclaration" || node.type === "TSEnumDeclaration") && !node.declare) walkDeclaration("script", node, scriptBindings, vueImportAliases, hoistStatic);
		if (scriptStartOffset > startOffset) {
			if (!/\n$/.test(script.content.trim())) ctx.s.appendLeft(scriptEndOffset, `\n`);
			ctx.s.move(scriptStartOffset, scriptEndOffset, 0);
		}
	}
	for (const node of scriptSetupAst.body) {
		if (node.type === "ExpressionStatement") {
			const expr = (0, _vue_compiler_dom.unwrapTSNode)(node.expression);
			if (processDefineProps(ctx, expr) || processDefineEmits(ctx, expr) || processDefineOptions(ctx, expr) || processDefineSlots(ctx, expr)) ctx.s.remove(node.start + startOffset, node.end + startOffset);
			else if (processDefineExpose(ctx, expr)) {
				const callee = expr.callee;
				ctx.s.overwrite(callee.start + startOffset, callee.end + startOffset, "__expose");
			} else processDefineModel(ctx, expr);
		}
		if (node.type === "VariableDeclaration" && !node.declare) {
			const total = node.declarations.length;
			let left = total;
			let lastNonRemoved;
			for (let i = 0; i < total; i++) {
				const decl = node.declarations[i];
				const init = decl.init && (0, _vue_compiler_dom.unwrapTSNode)(decl.init);
				if (init) {
					if (processDefineOptions(ctx, init)) ctx.error(`${DEFINE_OPTIONS}() has no returning value, it cannot be assigned.`, node);
					const isDefineProps = processDefineProps(ctx, init, decl.id);
					if (ctx.propsDestructureRestId) setupBindings[ctx.propsDestructureRestId] = "setup-reactive-const";
					const isDefineEmits = !isDefineProps && processDefineEmits(ctx, init, decl.id);
					!isDefineEmits && (processDefineSlots(ctx, init, decl.id) || processDefineModel(ctx, init, decl.id));
					if (isDefineProps && !ctx.propsDestructureRestId && ctx.propsDestructureDecl) if (left === 1) ctx.s.remove(node.start + startOffset, node.end + startOffset);
					else {
						let start = decl.start + startOffset;
						let end = decl.end + startOffset;
						if (i === total - 1) start = node.declarations[lastNonRemoved].end + startOffset;
						else end = node.declarations[i + 1].start + startOffset;
						ctx.s.remove(start, end);
						left--;
					}
					else if (isDefineEmits) if (options.className && init.type === "CallExpression") ctx.s.overwrite(startOffset + init.callee.start, startOffset + init.callee.end, ctx.helper("defineEmits"));
					else ctx.s.overwrite(startOffset + init.start, startOffset + init.end, "__emit");
					else lastNonRemoved = i;
				}
			}
		}
		let isAllLiteral = false;
		if ((node.type === "VariableDeclaration" || node.type === "FunctionDeclaration" || node.type === "ClassDeclaration" || node.type === "TSEnumDeclaration") && !node.declare) isAllLiteral = walkDeclaration("scriptSetup", node, setupBindings, vueImportAliases, hoistStatic, !!ctx.propsDestructureDecl);
		if (hoistStatic && isAllLiteral) hoistNode(node);
		if (node.type === "VariableDeclaration" && !node.declare || node.type.endsWith("Statement")) {
			const scope = [scriptSetupAst.body];
			(0, estree_walker.walk)(node, {
				enter(child, parent) {
					if ((0, _vue_compiler_dom.isFunctionType)(child)) this.skip();
					if (child.type === "BlockStatement") scope.push(child.body);
					if (child.type === "AwaitExpression") {
						hasAwait = true;
						processAwait(ctx, child, scope[scope.length - 1].some((n, i) => {
							return (scope.length === 1 || i > 0) && n.type === "ExpressionStatement" && n.start === child.start;
						}), parent.type === "ExpressionStatement");
					}
				},
				exit(node) {
					if (node.type === "BlockStatement") scope.pop();
				}
			});
		}
		if (node.type === "ExportNamedDeclaration" && node.exportKind !== "type" || node.type === "ExportAllDeclaration" || node.type === "ExportDefaultDeclaration") ctx.error("<script setup> cannot contain ES module exports. If you are using a previous version of <script setup>, please consult the updated RFC at https://github.com/vuejs/rfcs/pull/227.", node);
		if (ctx.isTS || ctx.isUTS) {
			if (node.type.startsWith("TS") || node.type === "ExportNamedDeclaration" && node.exportKind === "type" || node.type === "VariableDeclaration" && node.declare) {
				if (node.type !== "TSEnumDeclaration") hoistNode(node);
			}
		}
	}
	if (ctx.propsDestructureDecl) transformDestructuredProps(ctx, vueImportAliases);
	checkInvalidScopeReference(ctx.propsRuntimeDecl, DEFINE_PROPS);
	checkInvalidScopeReference(ctx.propsRuntimeDefaults, DEFINE_PROPS);
	checkInvalidScopeReference(ctx.propsDestructureDecl, DEFINE_PROPS);
	checkInvalidScopeReference(ctx.emitsRuntimeDecl, DEFINE_EMITS);
	checkInvalidScopeReference(ctx.optionsRuntimeDecl, DEFINE_OPTIONS);
	for (const { runtimeOptionNodes } of Object.values(ctx.modelDecls)) for (const node of runtimeOptionNodes) checkInvalidScopeReference(node, DEFINE_MODEL);
	if (script) if (startOffset < scriptStartOffset) {
		ctx.s.remove(0, startOffset);
		ctx.s.remove(endOffset, scriptStartOffset);
		ctx.s.remove(scriptEndOffset, source.length);
	} else {
		ctx.s.remove(0, scriptStartOffset);
		ctx.s.remove(scriptEndOffset, startOffset);
		ctx.s.remove(endOffset, source.length);
	}
	else {
		ctx.s.remove(0, startOffset);
		ctx.s.remove(endOffset, source.length);
	}
	if (scriptAst) Object.assign(ctx.bindingMetadata, analyzeScriptBindings(scriptAst.body));
	for (const [key, { isType, imported, source }] of Object.entries(ctx.userImports)) {
		if (isType) continue;
		ctx.bindingMetadata[key] = imported === "*" || imported === "default" && (source.endsWith(".vue") || source.endsWith(".uvue")) || source === "vue" ? "setup-const" : "setup-maybe-ref";
	}
	for (const key in scriptBindings) ctx.bindingMetadata[key] = scriptBindings[key];
	for (const key in setupBindings) ctx.bindingMetadata[key] = setupBindings[key];
	if (sfc.template && !sfc.template.src && sfc.template.ast) {
		const vModelIds = resolveTemplateVModelIdentifiers(sfc);
		if (vModelIds.size) {
			const toDemote = /* @__PURE__ */ new Set();
			for (const id of vModelIds) if (setupBindings[id] === "setup-reactive-const") toDemote.add(id);
			if (toDemote.size) {
				for (const node of scriptSetupAst.body) if (node.type === "VariableDeclaration" && node.kind === "const" && !node.declare) {
					const demotedInDecl = [];
					for (const decl of node.declarations) if (decl.id.type === "Identifier" && toDemote.has(decl.id.name)) demotedInDecl.push(decl.id.name);
					if (demotedInDecl.length) {
						ctx.s.overwrite(node.start + startOffset, node.start + startOffset + 5, "let");
						for (const id of demotedInDecl) {
							setupBindings[id] = "setup-let";
							ctx.bindingMetadata[id] = "setup-let";
							warnOnce(`\`v-model\` cannot update a \`const\` reactive binding \`${id}\`. The compiler has transformed it to \`let\` to make the update work.`);
						}
					}
				}
			}
		}
	}
	if (sfc.cssVars.length && !ssr) {
		ctx.helperImports.add(getCssVarsHelper(vapor));
		ctx.helperImports.add("unref");
		ctx.s.prependLeft(startOffset, `\n${genCssVarsCode(sfc.cssVars, ctx.bindingMetadata, scopeId, !!options.isProd, vapor)}\n`);
	}
	let args = `__props`;
	if (ctx.propsTypeDecl) args += `: any`;
	if (ctx.propsDecl) {
		if (ctx.propsDestructureRestId) {
			ctx.s.overwrite(startOffset + ctx.propsCall.start, startOffset + ctx.propsCall.end, `${ctx.helper(`createPropsRestProxy`)}(__props, ${JSON.stringify(Object.keys(ctx.propsDestructuredBindings))})`);
			ctx.s.overwrite(startOffset + ctx.propsDestructureDecl.start, startOffset + ctx.propsDestructureDecl.end, ctx.propsDestructureRestId);
		} else if (!ctx.propsDestructureDecl) ctx.s.overwrite(startOffset + ctx.propsCall.start, startOffset + ctx.propsCall.end, "__props");
	}
	if (hasAwait) {
		const any = ctx.isTS || ctx.isUTS ? `: any` : ``;
		ctx.s.prependLeft(startOffset, `\nlet __temp${any}, __restore${any}\n`);
	}
	const destructureElements = ctx.hasDefineExposeCall || !inlineMode ? [`expose: __expose`] : [];
	if (ctx.emitDecl) destructureElements.push(`emit: __emit`);
	if (inlineMode) buildDestructureElements();
	if (destructureElements.length) args += `, { ${destructureElements.join(", ")} }`;
	let templateHash = "";
	let templateMap;
	let returned;
	const propsDecl = genRuntimeProps(ctx);
	if (!inlineMode || !sfc.template && ctx.hasDefaultExportRender) {
		const allBindings = {
			...scriptBindings,
			...setupBindings
		};
		for (const key in ctx.userImports) if (!ctx.userImports[key].isType && ctx.userImports[key].isUsedInTemplate) allBindings[key] = true;
		returned = `{ `;
		for (const key in allBindings) if (allBindings[key] === true && ctx.userImports[key].source !== "vue" && !ctx.userImports[key].source.endsWith(".vue")) returned += `get ${key}() { return ${key} }, `;
		else if (ctx.bindingMetadata[key] === "setup-let") {
			const setArg = key === "v" ? `_v` : `v`;
			returned += `get ${key}() { return ${key} }, set ${key}(${setArg}) { ${key} = ${setArg} }, `;
		} else returned += `${key}, `;
		returned = returned.replace(/, $/, "") + ` }`;
	} else if (options.componentType === "app") returned = "";
	else if (sfc.template && !sfc.template.src) {
		if (ssr) hasInlinedSsrRenderFn = true;
		if (!options.templateOptions) options.templateOptions = {};
		if (!options.templateOptions.compilerOptions) options.templateOptions.compilerOptions = {};
		const compilerOptions = options.templateOptions.compilerOptions;
		const onVueTemplateCompileLog = compilerOptions.onVueTemplateCompileLog;
		if (onVueTemplateCompileLog) {
			const onError = compilerOptions.onError;
			compilerOptions.onError = (error) => {
				if (error.errorType) error.customPrint = () => {
					onVueTemplateCompileLog("error", error);
				};
				if (onError) onError(error);
				else throw error;
			};
			const onWarn = compilerOptions.onWarn;
			compilerOptions.onWarn = (warning) => {
				if (warning.errorType) onVueTemplateCompileLog("warn", warning);
				else if (onWarn) onWarn(warning);
				else console.warn(warning.message);
			};
		}
		if (ctx.rootElementTagName) compilerOptions.rootElementTagName = ctx.rootElementTagName;
		else delete compilerOptions.rootElementTagName;
		const { code, ast, preamble, tips, errors, helpers, map } = compileTemplate({
			filename,
			ast: sfc.template.ast,
			source: sfc.template.content,
			inMap: sfc.template.map,
			...options.templateOptions,
			id: scopeId,
			scoped: sfc.styles.some((s) => s.scoped),
			isProd: options.isProd,
			ssrCssVars: sfc.cssVars,
			vapor,
			compilerOptions: {
				...options.templateOptions && options.templateOptions.compilerOptions,
				inline: true,
				isTS: ctx.isTS,
				bindingMetadata: ctx.bindingMetadata,
				isWatch: options.isWatch
			}
		});
		if (ast && ast.hash) templateHash = ast.hash;
		templateMap = map;
		if (tips.length) tips.forEach(warnOnce);
		const err = errors[0];
		if (typeof err === "string") throw new Error(err);
		else if (err) {
			if (err.loc) if (onVueTemplateCompileLog) err.customPrint = () => {
				onVueTemplateCompileLog("error", err);
			};
			else err.message += `\n\n` + sfc.filename + "\n" + (0, _vue_shared.generateCodeFrame)(source, err.loc.start.offset, err.loc.end.offset) + `\n`;
			throw err;
		}
		if (preamble) ctx.s.prepend(preamble);
		if (helpers && (helpers.has(_vue_compiler_dom.UNREF) || helpers.has("unref"))) ctx.helperImports.delete("unref");
		returned = code;
	} else returned = `() => {}`;
	if (!inlineMode && true) ctx.s.appendRight(endOffset, `\nconst __returned__ = ${returned}\nObject.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })\nreturn __returned__\n}\n\n`);
	else ctx.s.appendRight(endOffset, `\n${vapor && !ssr ? `` : `return `}${returned}\n}\n\n`);
	const genDefaultAs = options.genDefaultAs ? `const ${options.genDefaultAs} =` : `export default`;
	let runtimeOptions = ``;
	if (options.className) {
		const componentType = options.componentType;
		if (componentType === "page" || componentType === "component") {
			var _options$templateOpti2, _compilerOptions$scri, _options$templateOpti3;
			const hasScriptCpp = ((_compilerOptions$scri = (((_options$templateOpti2 = options.templateOptions) === null || _options$templateOpti2 === void 0 ? void 0 : _options$templateOpti2.compilerOptions) || {}).scriptCppBlocks) === null || _compilerOptions$scri === void 0 ? void 0 : _compilerOptions$scri.length) > 0;
			const optionsProps = [];
			if (hasScriptCpp) optionsProps.push("scriptCpp: true");
			const optionsCode = optionsProps.length ? `, { ${optionsProps.join(", ")} }` : "";
			if (componentType === "page") {
				setupPreambleLines.unshift(`const __sharedDataScope =  _useSharedDataScope(__sharedData)`);
				setupPreambleLines.unshift(`const __sharedData = _withSharedDataPage(useSharedDataPage<__SHARED_DATA_CLASS_NAME_TYPE>(_useSharedDataRenderer() == 'component' ? _useSharedDataScope() : _useSharedDataPageId(), _useSharedDataPageOptions())${optionsCode})`);
			} else if (componentType === "component") {
				setupPreambleLines.unshift(`const __sharedData = _withSharedDataComponent(useSharedDataComponent<__SHARED_DATA_CLASS_NAME_TYPE>(__sharedDataScope, _useSharedDataComponentOptions())${optionsCode})`);
				setupPreambleLines.unshift(`const __sharedDataScope =  _useSharedDataScope()`);
			}
			if (options.isWatch && templateHash) runtimeOptions += `\n  __hash: "${templateHash}",`;
			runtimeOptions += `\n  __className,`;
			runtimeOptions += `\n  __filename: '${((_options$templateOpti3 = options.templateOptions) === null || _options$templateOpti3 === void 0 ? void 0 : _options$templateOpti3.compilerOptions).relativeFilename || ""}',`;
		}
	}
	if (!ctx.hasDefaultExportName && filename && filename !== DEFAULT_FILENAME) {
		const match = filename.match(/([^/\\]+)\.\w+$/);
		if (match) runtimeOptions += `\n  __name: '${match[1]}',`;
	}
	if (hasInlinedSsrRenderFn) runtimeOptions += `\n  __ssrInlineRender: true,`;
	if (propsDecl) runtimeOptions += `\n  props: ${propsDecl},`;
	const emitsDecl = genRuntimeEmits(ctx);
	if (emitsDecl) runtimeOptions += `\n  emits: ${emitsDecl},`;
	let definedOptions = "";
	if (ctx.optionsRuntimeDecl) definedOptions = scriptSetup.content.slice(ctx.optionsRuntimeDecl.start, ctx.optionsRuntimeDecl.end).trim();
	if (!ctx.hasDefineExposeCall && !inlineMode) setupPreambleLines.push(`__expose();`);
	const setupPreamble = setupPreambleLines.length ? `  ${setupPreambleLines.join("\n  ")}\n` : "";
	if (ctx.isTS || ctx.isUTS) {
		if (ssr && vapor) runtimeOptions += `\n  __vapor: true,`;
		const def = (defaultExport ? `\n  ...${normalScriptDefaultVar},` : ``) + (definedOptions ? `\n  ...${definedOptions},` : "");
		ctx.s.prependLeft(startOffset, `\n${genDefaultAs} /*@__PURE__*/${ctx.helper(vapor && !ssr ? `defineVaporSharedDataComponent` : `defineComponent`)}({${def}${runtimeOptions}\n  ${hasAwait ? `async ` : ``}setup(${args}) {\n${setupPreamble}`);
		ctx.s.appendRight(endOffset, `})`);
	} else {
		if (vapor) runtimeOptions += `\n  __vapor: true,`;
		if (defaultExport || definedOptions) {
			ctx.s.prependLeft(startOffset, `\n${genDefaultAs} /*@__PURE__*/Object.assign(${defaultExport ? `${normalScriptDefaultVar}, ` : ""}${definedOptions ? `${definedOptions}, ` : ""}{${runtimeOptions}\n  ${hasAwait ? `async ` : ``}setup(${args}) {\n${setupPreamble}`);
			ctx.s.appendRight(endOffset, `})`);
		} else {
			ctx.s.prependLeft(startOffset, `\n${genDefaultAs} {${runtimeOptions}\n  ${hasAwait ? `async ` : ``}setup(${args}) {\n${setupPreamble}`);
			ctx.s.appendRight(endOffset, `}`);
		}
	}
	if (ctx.helperImports.size > 0) {
		var _options$templateOpti4;
		const runtimeModuleName = (_options$templateOpti4 = options.templateOptions) === null || _options$templateOpti4 === void 0 || (_options$templateOpti4 = _options$templateOpti4.compilerOptions) === null || _options$templateOpti4 === void 0 ? void 0 : _options$templateOpti4.runtimeModuleName;
		const importSrc = runtimeModuleName ? JSON.stringify(runtimeModuleName) : `'vue'`;
		ctx.s.prepend(`import { ${[...ctx.helperImports].map((h) => `${h} as _${h}`).join(", ")} } from ${importSrc}\n`);
	}
	const content = ctx.s.toString();
	let map = options.sourceMap !== false ? ctx.s.generateMap({
		source: filename,
		hires: true,
		includeContent: true
	}) : void 0;
	if (templateMap && map) {
		const offset = content.indexOf(returned);
		const templateLineOffset = content.slice(0, offset).split(/\r?\n/).length - 1;
		map = mergeSourceMaps(map, templateMap, templateLineOffset);
	}
	return {
		...scriptSetup,
		bindings: ctx.bindingMetadata,
		imports: ctx.userImports,
		content,
		map,
		scriptAst: scriptAst === null || scriptAst === void 0 ? void 0 : scriptAst.body,
		scriptSetupAst: scriptSetupAst === null || scriptSetupAst === void 0 ? void 0 : scriptSetupAst.body,
		deps: ctx.deps ? [...ctx.deps] : void 0
	};
}
function registerBinding(bindings, node, type) {
	bindings[node.name] = type;
}
function walkDeclaration(from, node, bindings, userImportAliases, hoistStatic, isPropsDestructureEnabled = false) {
	let isAllLiteral = false;
	if (node.type === "VariableDeclaration") {
		const isConst = node.kind === "const";
		isAllLiteral = isConst && node.declarations.every((decl) => decl.id.type === "Identifier" && (0, _vue_compiler_dom.isStaticNode)(decl.init));
		for (const { id, init: _init } of node.declarations) {
			const init = _init && (0, _vue_compiler_dom.unwrapTSNode)(_init);
			const isConstMacroCall = isConst && isCallOf(init, (c) => c === DEFINE_PROPS || c === DEFINE_EMITS || c === WITH_DEFAULTS || c === DEFINE_SLOTS);
			if (id.type === "Identifier") {
				let bindingType;
				const userReactiveBinding = userImportAliases["reactive"];
				if ((hoistStatic || from === "script") && (isAllLiteral || isConst && (0, _vue_compiler_dom.isStaticNode)(init))) bindingType = "literal-const";
				else if (isCallOf(init, userReactiveBinding)) bindingType = isConst ? "setup-reactive-const" : "setup-let";
				else if (isConstMacroCall || isConst && canNeverBeRef(init, userReactiveBinding)) bindingType = isCallOf(init, DEFINE_PROPS) ? "setup-reactive-const" : "setup-const";
				else if (isConst) if (isCallOf(init, (m) => m === userImportAliases["ref"] || m === userImportAliases["computed"] || m === userImportAliases["shallowRef"] || m === userImportAliases["customRef"] || m === userImportAliases["toRef"] || m === userImportAliases["useTemplateRef"] || m === DEFINE_MODEL)) bindingType = "setup-ref";
				else bindingType = "setup-maybe-ref";
				else bindingType = "setup-let";
				registerBinding(bindings, id, bindingType);
			} else {
				if (isCallOf(init, DEFINE_PROPS) && isPropsDestructureEnabled) continue;
				if (id.type === "ObjectPattern") walkObjectPattern(id, bindings, isConst, isConstMacroCall);
				else if (id.type === "ArrayPattern") walkArrayPattern(id, bindings, isConst, isConstMacroCall);
			}
		}
	} else if (node.type === "TSEnumDeclaration") {
		isAllLiteral = node.members.every((member) => !member.initializer || (0, _vue_compiler_dom.isStaticNode)(member.initializer));
		bindings[node.id.name] = isAllLiteral ? "literal-const" : "setup-const";
	} else if (node.type === "FunctionDeclaration" || node.type === "ClassDeclaration") bindings[node.id.name] = "setup-const";
	return isAllLiteral;
}
function walkObjectPattern(node, bindings, isConst, isDefineCall = false) {
	for (const p of node.properties) if (p.type === "ObjectProperty") if (p.key.type === "Identifier" && p.key === p.value) {
		const type = isDefineCall ? "setup-const" : isConst ? "setup-maybe-ref" : "setup-let";
		registerBinding(bindings, p.key, type);
	} else walkPattern(p.value, bindings, isConst, isDefineCall);
	else {
		const type = isConst ? "setup-const" : "setup-let";
		registerBinding(bindings, p.argument, type);
	}
}
function walkArrayPattern(node, bindings, isConst, isDefineCall = false) {
	for (const e of node.elements) e && walkPattern(e, bindings, isConst, isDefineCall);
}
function walkPattern(node, bindings, isConst, isDefineCall = false) {
	if (node.type === "Identifier") registerBinding(bindings, node, isDefineCall ? "setup-const" : isConst ? "setup-maybe-ref" : "setup-let");
	else if (node.type === "RestElement") {
		const type = isConst ? "setup-const" : "setup-let";
		registerBinding(bindings, node.argument, type);
	} else if (node.type === "ObjectPattern") walkObjectPattern(node, bindings, isConst);
	else if (node.type === "ArrayPattern") walkArrayPattern(node, bindings, isConst);
	else if (node.type === "AssignmentPattern") if (node.left.type === "Identifier") {
		const type = isDefineCall ? "setup-const" : isConst ? "setup-maybe-ref" : "setup-let";
		registerBinding(bindings, node.left, type);
	} else walkPattern(node.left, bindings, isConst);
}
function canNeverBeRef(node, userReactiveImport) {
	if (isCallOf(node, userReactiveImport)) return true;
	switch (node.type) {
		case "UnaryExpression":
		case "BinaryExpression":
		case "ArrayExpression":
		case "ObjectExpression":
		case "FunctionExpression":
		case "ArrowFunctionExpression":
		case "UpdateExpression":
		case "ClassExpression":
		case "TaggedTemplateExpression": return true;
		case "SequenceExpression": return canNeverBeRef(node.expressions[node.expressions.length - 1], userReactiveImport);
		default:
			if (isLiteralNode(node)) return true;
			return false;
	}
}
function mergeSourceMaps(scriptMap, templateMap, templateLineOffset) {
	const generator = new source_map_js.SourceMapGenerator();
	const addMapping = (map, lineOffset = 0) => {
		const consumer = new source_map_js.SourceMapConsumer(map);
		consumer.sources.forEach((sourceFile) => {
			generator._sources.add(sourceFile);
			const sourceContent = consumer.sourceContentFor(sourceFile);
			if (sourceContent != null) generator.setSourceContent(sourceFile, sourceContent);
		});
		consumer.eachMapping((m) => {
			if (m.originalLine == null) return;
			generator.addMapping({
				generated: {
					line: m.generatedLine + lineOffset,
					column: m.generatedColumn
				},
				original: {
					line: m.originalLine,
					column: m.originalColumn
				},
				source: m.source,
				name: m.name
			});
		});
	};
	addMapping(scriptMap);
	addMapping(templateMap, templateLineOffset);
	generator._sourceRoot = scriptMap.sourceRoot;
	generator._file = scriptMap.file;
	return generator.toJSON();
}

//#endregion
//#region packages/compiler-sfc/src/index.ts
const version = "3.6.0-beta.5";
const parseCache = parseCache$1;
const errorMessages = {
	..._vue_compiler_dom.errorMessages,
	..._vue_compiler_dom.DOMErrorMessages
};
const walk = estree_walker.walk;
/**
* @deprecated this is preserved to avoid breaking vite-plugin-vue < 5.0
* with reactivityTransform: true. The desired behavior should be silently
* ignoring the option instead of breaking.
*/
const shouldTransformRef = () => false;

//#endregion
exports.MagicString = magic_string.default;
exports.babelParse = _babel_parser.parse;
exports.compileScript = compileScript;
exports.compileStyle = compileStyle;
exports.compileStyleAsync = compileStyleAsync;
exports.compileTemplate = compileTemplate;
exports.errorMessages = errorMessages;
exports.extractIdentifiers = _vue_compiler_core.extractIdentifiers;
exports.extractRuntimeEmits = extractRuntimeEmits;
exports.extractRuntimeProps = extractRuntimeProps;
exports.generateCodeFrame = _vue_compiler_core.generateCodeFrame;
exports.inferRuntimeType = inferRuntimeType;
exports.invalidateTypeCache = invalidateTypeCache;
exports.isInDestructureAssignment = _vue_compiler_core.isInDestructureAssignment;
exports.isStaticProperty = _vue_compiler_core.isStaticProperty;
exports.parse = parse;
exports.parseCache = parseCache;
exports.registerTS = registerTS;
exports.resolveTypeElements = resolveTypeElements;
exports.rewriteDefault = rewriteDefault;
exports.rewriteDefaultAST = rewriteDefaultAST;
exports.shouldTransformRef = shouldTransformRef;
exports.version = version;
exports.walk = walk;
exports.walkIdentifiers = _vue_compiler_core.walkIdentifiers;