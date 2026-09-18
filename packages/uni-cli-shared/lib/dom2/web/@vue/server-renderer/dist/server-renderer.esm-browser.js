/**
  * @vue/server-renderer v3.6.0-rc.8
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
//#region packages/shared/src/makeMap.ts
/**
* Make a map and return a function for checking if a key
* is in that map.
* IMPORTANT: all calls of this function must be prefixed with
* \/\*#\_\_PURE\_\_\*\/
* So that they can be tree-shaken if necessary.
*/
/*@__NO_SIDE_EFFECTS__*/
function makeMap(str) {
	const map = Object.create(null);
	for (const key of str.split(",")) map[key] = 1;
	return (val) => val in map;
}
//#endregion
//#region packages/shared/src/general.ts
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {};
/**
* Always return false.
*/
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
	const i = arr.indexOf(el);
	if (i > -1) arr.splice(i, 1);
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => toTypeString(val) === "[object Date]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
	return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
	return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /*@__PURE__*/ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
const isBuiltInTag = /*#__PURE__*/ makeMap("slot,component");
const isBuiltInDirective = /*@__PURE__*/ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
	const cache = Object.create(null);
	return ((str) => {
		return cache[str] || (cache[str] = fn(str));
	});
};
const camelizeRE = /-(\w)/g;
const camelizeReplacer = (_, c) => c ? c.toUpperCase() : "";
/**
* @private
*/
const camelize = cacheStringFunction((str) => str.replace(camelizeRE, camelizeReplacer));
const hyphenateRE = /\B([A-Z])/g;
/**
* @private
*/
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
/**
* @private
*/
const capitalize = cacheStringFunction((str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
* @private
*/
const toHandlerKey = cacheStringFunction((str) => {
	return str ? `on${capitalize(str)}` : ``;
});
/**
* #13070 When v-model and v-model:model directives are used together,
* they will generate the same modelModifiers prop,
* so a `$` suffix is added to avoid conflicts.
* @private
*/
const getModifierPropName = (name) => {
	return `${name === "modelValue" || name === "model-value" ? "model" : name}Modifiers${name === "model" ? "$" : ""}`;
};
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, ...arg) => {
	for (let i = 0; i < fns.length; i++) fns[i](...arg);
};
const def = (obj, key, value, writable = false) => {
	Object.defineProperty(obj, key, {
		configurable: true,
		enumerable: false,
		writable,
		value
	});
};
/**
* "123-foo" will be parsed to 123
* This is used for the .number modifier in v-model
*/
const looseToNumber = (val) => {
	const n = parseFloat(val);
	return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
	return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function canSetValueDirectly(tagName) {
	return tagName !== "PROGRESS" && !tagName.includes("-");
}
//#endregion
//#region packages/shared/src/normalizeProp.ts
function normalizeStyle(value) {
	if (isArray(value)) {
		const res = {};
		for (let i = 0; i < value.length; i++) {
			const item = value[i];
			const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
			if (normalized) for (const key in normalized) res[key] = normalized[key];
		}
		return res;
	} else if (isString(value) || isObject(value)) return value;
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
	const ret = {};
	cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
		if (item) {
			const tmp = item.split(propertyDelimiterRE);
			tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
		}
	});
	return ret;
}
function stringifyStyle(styles) {
	if (!styles) return "";
	if (isString(styles)) return styles;
	let ret = "";
	for (const key in styles) {
		const value = styles[key];
		if (isString(value) || typeof value === "number") {
			const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
			ret += `${normalizedKey}:${value};`;
		}
	}
	return ret;
}
function normalizeClass(value) {
	let res = "";
	if (isString(value)) res = value;
	else if (isArray(value)) for (let i = 0; i < value.length; i++) {
		const normalized = normalizeClass(value[i]);
		if (normalized) res += normalized + " ";
	}
	else if (isObject(value)) {
		for (const name in value) if (value[name]) res += name + " ";
	}
	return res.trim();
}
//#endregion
//#region packages/shared/src/domTagConfig.ts
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const MATH_TAGS = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics";
const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
/**
* Compiler only.
* Do NOT use in runtime code paths unless behind `__DEV__` flag.
*/
const isHTMLTag = /*@__PURE__*/ makeMap(HTML_TAGS);
/**
* Compiler only.
* Do NOT use in runtime code paths unless behind `__DEV__` flag.
*/
const isSVGTag = /*@__PURE__*/ makeMap(SVG_TAGS);
/**
* Compiler only.
* Do NOT use in runtime code paths unless behind `__DEV__` flag.
*/
const isMathMLTag = /*@__PURE__*/ makeMap(MATH_TAGS);
/**
* Compiler only.
* Do NOT use in runtime code paths unless behind `__DEV__` flag.
*/
const isVoidTag = /*@__PURE__*/ makeMap(VOID_TAGS);
//#endregion
//#region packages/shared/src/domAttrConfig.ts
/**
* On the client we only need to offer special cases for boolean attributes that
* have different names from their corresponding dom properties:
* - itemscope -> N/A
* - allowfullscreen -> allowFullscreen
* - formnovalidate -> formNoValidate
* - ismap -> isMap
* - nomodule -> noModule
* - novalidate -> noValidate
* - readonly -> readOnly
*/
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /*@__PURE__*/ makeMap(specialBooleanAttrs);
/**
* The full list is needed during SSR to produce the correct initial markup.
*/
const isBooleanAttr = /*@__PURE__*/ makeMap(specialBooleanAttrs + ",async,autofocus,autoplay,controls,default,defer,disabled,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
/**
* Boolean attributes should be included if the value is truthy or ''.
* e.g. `<select multiple>` compiles to `{ multiple: '' }`
*/
function includeBooleanAttr(value) {
	return !!value || value === "";
}
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u000d\u0020]/;
const attrValidationCache = {};
function isSSRSafeAttrName(name) {
	if (attrValidationCache.hasOwnProperty(name)) return attrValidationCache[name];
	const isUnsafe = unsafeAttrCharRE.test(name);
	if (isUnsafe) console.error(`unsafe attribute name: ${name}`);
	return attrValidationCache[name] = !isUnsafe;
}
const propsToAttrMap = {
	acceptCharset: "accept-charset",
	className: "class",
	htmlFor: "for",
	httpEquiv: "http-equiv"
};
/**
* Shared between server-renderer and runtime-core hydration logic
*/
function isRenderableAttrValue(value) {
	if (value == null) return false;
	const type = typeof value;
	return type === "string" || type === "number" || type === "boolean";
}
function shouldSetAsAttr(tagName, key) {
	if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") return true;
	if (key === "form") return true;
	if (key === "list" && tagName === "INPUT") return true;
	if (key === "type" && tagName === "TEXTAREA") return true;
	if ((key === "width" || key === "height") && (tagName === "IMG" || tagName === "VIDEO" || tagName === "CANVAS" || tagName === "SOURCE")) return true;
	if (key === "sandbox" && tagName === "IFRAME") return true;
	return false;
}
//#endregion
//#region packages/shared/src/escapeHtml.ts
const escapeRE = /["'&<>]/;
function escapeHtml(string) {
	const str = "" + string;
	const match = escapeRE.exec(str);
	if (!match) return str;
	let html = "";
	let escaped;
	let index;
	let lastIndex = 0;
	for (index = match.index; index < str.length; index++) {
		switch (str.charCodeAt(index)) {
			case 34:
				escaped = "&quot;";
				break;
			case 38:
				escaped = "&amp;";
				break;
			case 39:
				escaped = "&#39;";
				break;
			case 60:
				escaped = "&lt;";
				break;
			case 62:
				escaped = "&gt;";
				break;
			default: continue;
		}
		if (lastIndex !== index) html += str.slice(lastIndex, index);
		lastIndex = index + 1;
		html += escaped;
	}
	return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
}
const commentStripRE = /^(?:-?>)+|<!--|-->|--!>|<!-$/g;
function escapeHtmlComment(src) {
	let prev;
	do {
		prev = src;
		src = src.replace(commentStripRE, "");
	} while (src !== prev);
	return src;
}
//#endregion
//#region packages/shared/src/looseEqual.ts
function looseCompareArrays(a, b) {
	if (a.length !== b.length) return false;
	let equal = true;
	for (let i = 0; equal && i < a.length; i++) equal = looseEqual(a[i], b[i]);
	return equal;
}
function looseCompareCollections(a, b) {
	if (a.size !== b.size) return false;
	const candidates = Array.from(b);
	const matched = new Uint8Array(candidates.length);
	for (const item of a) {
		let index = -1;
		for (let i = 0; i < candidates.length; i++) if (!matched[i] && looseEqual(item, candidates[i])) {
			index = i;
			break;
		}
		if (index < 0) return false;
		matched[index] = 1;
	}
	return true;
}
function looseEqual(a, b) {
	if (a === b) return true;
	let aValidType = isDate(a);
	let bValidType = isDate(b);
	if (aValidType || bValidType) return aValidType && bValidType ? a.getTime() === b.getTime() : false;
	aValidType = isSymbol(a);
	bValidType = isSymbol(b);
	if (aValidType || bValidType) return a === b;
	aValidType = isArray(a);
	bValidType = isArray(b);
	if (aValidType || bValidType) return aValidType && bValidType ? looseCompareArrays(a, b) : false;
	aValidType = isObject(a);
	bValidType = isObject(b);
	if (aValidType || bValidType) {
		if (!aValidType || !bValidType) return false;
		aValidType = isMap(a);
		bValidType = isMap(b);
		if (aValidType || bValidType) return aValidType && bValidType ? looseCompareCollections(a, b) : false;
		aValidType = isSet(a);
		bValidType = isSet(b);
		if (aValidType || bValidType) return aValidType && bValidType ? looseCompareCollections(a, b) : false;
		if (Object.keys(a).length !== Object.keys(b).length) return false;
		for (const key in a) {
			const aHasKey = a.hasOwnProperty(key);
			const bHasKey = b.hasOwnProperty(key);
			if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) return false;
		}
	}
	return String(a) === String(b);
}
function looseIndexOf(arr, val) {
	return arr.findIndex((item) => looseEqual(item, val));
}
//#endregion
//#region packages/shared/src/toDisplayString.ts
const isRef$1 = (val) => {
	return !!(val && val["__v_isRef"] === true);
};
/**
* For converting {{ interpolation }} values to displayed strings.
* @private
*/
const toDisplayString = (val) => {
	switch (typeof val) {
		case "string": return val;
		case "object": if (val) {
			if (isRef$1(val)) return toDisplayString(val.value);
			else if (isArray(val) || val.toString === objectToString || !isFunction(val.toString)) return JSON.stringify(val, replacer, 2);
		}
		default: return val == null ? "" : String(val);
	}
};
const replacer = (_key, val) => {
	if (isRef$1(val)) return replacer(_key, val.value);
	else if (isMap(val)) return { [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val], i) => {
		entries[stringifySymbol(key, i) + " =>"] = val;
		return entries;
	}, {}) };
	else if (isSet(val)) return { [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v)) };
	else if (isSymbol(val)) return stringifySymbol(val);
	else if (isObject(val) && !isArray(val) && !isPlainObject(val)) return String(val);
	return val;
};
const stringifySymbol = (v, i = "") => {
	var _description;
	return isSymbol(v) ? `Symbol(${(_description = v.description) !== null && _description !== void 0 ? _description : i})` : v;
};
//#endregion
//#region packages/shared/src/text.ts
function normalizeUniText(value) {
	if (value.indexOf("\\") === -1) return value;
	let result = "";
	let escaped = false;
	for (const char of value) if (escaped) {
		result += char === "n" ? "\n" : char === "\\" ? "\\" : "\\" + char;
		escaped = false;
	} else if (char === "\\") escaped = true;
	else result += char;
	return result;
}
//#endregion
//#region packages/shared/src/subSequence.ts
function getSequence(arr) {
	const p = arr.slice();
	const result = [0];
	let i, j, u, v, c;
	const len = arr.length;
	for (i = 0; i < len; i++) {
		const arrI = arr[i];
		if (arrI !== 0) {
			j = result[result.length - 1];
			if (arr[j] < arrI) {
				p[i] = j;
				result.push(i);
				continue;
			}
			u = 0;
			v = result.length - 1;
			while (u < v) {
				c = u + v >> 1;
				if (arr[result[c]] < arrI) u = c + 1;
				else v = c;
			}
			if (arrI < arr[result[u]]) {
				if (u > 0) p[i] = result[u - 1];
				result[u] = i;
			}
		}
	}
	u = result.length;
	v = result[u - 1];
	while (u-- > 0) {
		result[u] = v;
		v = p[v];
	}
	return result;
}
//#endregion
//#region packages/shared/src/cssVars.ts
/**
* Normalize CSS var value created by `v-bind` in `<style>` block
* See https://github.com/vuejs/core/pull/12461#issuecomment-2495804664
*/
function normalizeCssVarValue(value) {
	if (value == null) return "initial";
	if (typeof value === "string") return value === "" ? " " : value;
	if (typeof value !== "number" || !Number.isFinite(value)) console.warn("[Vue warn] Invalid value used for CSS binding. Expected a string or a finite number but received:", value);
	return String(value);
}
//#endregion
//#region packages/reactivity/src/debug.ts
const triggerEventInfos = [];
function onTrack(sub, debugInfo) {
	if (sub.onTrack) sub.onTrack(extend({ effect: sub }, debugInfo));
}
function onTrigger(sub) {
	if (sub.onTrigger) {
		const debugInfo = triggerEventInfos[triggerEventInfos.length - 1];
		sub.onTrigger(extend({ effect: sub }, debugInfo));
	}
}
function setupOnTrigger(target) {
	Object.defineProperty(target.prototype, "onTrigger", {
		get() {
			return this._onTrigger;
		},
		set(val) {
			if (val && !this._onTrigger) setupFlagsHandler(this);
			this._onTrigger = val;
		}
	});
}
function setupFlagsHandler(target) {
	target._flags = target.flags;
	Object.defineProperty(target, "flags", {
		get() {
			return target._flags;
		},
		set(value) {
			if (!(target._flags & 48) && !!(value & 48)) onTrigger(this);
			target._flags = value;
		}
	});
}
//#endregion
//#region packages/reactivity/src/warning.ts
function warn$2(msg, ...args) {
	console.warn(`[Vue warn] ${msg}`, ...args);
}
//#endregion
//#region packages/reactivity/src/system.ts
const notifyBuffer = [];
let batchDepth = 0;
let activeSub = void 0;
let runDepth = 0;
function incRunDepth() {
	++runDepth;
}
function decRunDepth() {
	--runDepth;
}
let globalVersion = 0;
let notifyIndex = 0;
let notifyBufferLength = 0;
function setActiveSub(sub) {
	try {
		return activeSub;
	} finally {
		activeSub = sub;
	}
}
function startBatch() {
	++batchDepth;
}
function endBatch() {
	if (!--batchDepth && notifyBufferLength) flush();
}
function link(dep, sub) {
	const prevDep = sub.depsTail;
	if (prevDep !== void 0 && prevDep.dep === dep) return;
	const nextDep = prevDep !== void 0 ? prevDep.nextDep : sub.deps;
	if (nextDep !== void 0 && nextDep.dep === dep) {
		nextDep.version = globalVersion;
		sub.depsTail = nextDep;
		return;
	}
	const prevSub = dep.subsTail;
	if (prevSub !== void 0 && prevSub.version === globalVersion && prevSub.sub === sub) return;
	const newLink = sub.depsTail = dep.subsTail = {
		version: globalVersion,
		dep,
		sub,
		prevDep,
		nextDep,
		prevSub,
		nextSub: void 0
	};
	if (nextDep !== void 0) nextDep.prevDep = newLink;
	if (prevDep !== void 0) prevDep.nextDep = newLink;
	else sub.deps = newLink;
	if (prevSub !== void 0) prevSub.nextSub = newLink;
	else dep.subs = newLink;
}
function unlink(link, sub = link.sub) {
	const dep = link.dep;
	const prevDep = link.prevDep;
	const nextDep = link.nextDep;
	const nextSub = link.nextSub;
	const prevSub = link.prevSub;
	if (nextDep !== void 0) nextDep.prevDep = prevDep;
	else sub.depsTail = prevDep;
	if (prevDep !== void 0) prevDep.nextDep = nextDep;
	else sub.deps = nextDep;
	if (nextSub !== void 0) nextSub.prevSub = prevSub;
	else dep.subsTail = prevSub;
	if (prevSub !== void 0) prevSub.nextSub = nextSub;
	else if ((dep.subs = nextSub) === void 0) {
		let toRemove = dep.deps;
		if (toRemove !== void 0) {
			do
				toRemove = unlink(toRemove, dep);
			while (toRemove !== void 0);
			dep.flags |= 16;
		}
	}
	return nextDep;
}
function propagate(link) {
	let next = link.nextSub;
	let stack;
	top: do {
		const sub = link.sub;
		let flags = sub.flags;
		if (flags & 3) {
			if (!(flags & 60)) {
				sub.flags = flags | 32;
				if (runDepth) sub.flags |= 8;
			} else if (!(flags & 12)) flags = 0;
			else if (!(flags & 4)) sub.flags = flags & -9 | 32;
			else if (!(flags & 48) && isValidLink(link, sub)) {
				sub.flags = flags | 40;
				flags &= 1;
			} else flags = 0;
			if (flags & 2) notifyBuffer[notifyBufferLength++] = sub;
			if (flags & 1) {
				const subSubs = sub.subs;
				if (subSubs !== void 0) {
					link = subSubs;
					if (subSubs.nextSub !== void 0) {
						stack = {
							value: next,
							prev: stack
						};
						next = link.nextSub;
					}
					continue;
				}
			}
		}
		if ((link = next) !== void 0) {
			next = link.nextSub;
			continue;
		}
		while (stack !== void 0) {
			link = stack.value;
			stack = stack.prev;
			if (link !== void 0) {
				next = link.nextSub;
				continue top;
			}
		}
		break;
	} while (true);
}
function startTracking(sub) {
	++globalVersion;
	sub.depsTail = void 0;
	sub.flags = sub.flags & -57 | 4;
	return setActiveSub(sub);
}
function endTracking(sub, prevSub) {
	if (activeSub !== sub) warn$2("Active effect was not restored correctly - this is likely a Vue internal bug.");
	activeSub = prevSub;
	const depsTail = sub.depsTail;
	let toRemove = depsTail !== void 0 ? depsTail.nextDep : sub.deps;
	while (toRemove !== void 0) toRemove = unlink(toRemove, sub);
	sub.flags &= -5;
}
function flush() {
	while (notifyIndex < notifyBufferLength) {
		const effect = notifyBuffer[notifyIndex];
		notifyBuffer[notifyIndex++] = void 0;
		effect.notify();
	}
	notifyIndex = 0;
	notifyBufferLength = 0;
}
function checkDirty(link, sub) {
	let stack;
	let checkDepth = 0;
	top: do {
		const dep = link.dep;
		const depFlags = dep.flags;
		let dirty = false;
		if (sub.flags & 16) dirty = true;
		else if ((depFlags & 17) === 17) {
			const subs = dep.subs;
			if (dep.update()) {
				if (subs.nextSub !== void 0) shallowPropagate(subs);
				dirty = true;
			}
		} else if ((depFlags & 33) === 33) {
			stack = {
				value: link,
				prev: stack
			};
			link = dep.deps;
			sub = dep;
			++checkDepth;
			continue;
		}
		if (!dirty && link.nextDep !== void 0) {
			link = link.nextDep;
			continue;
		}
		while (checkDepth) {
			--checkDepth;
			link = stack.value;
			stack = stack.prev;
			if (dirty) {
				const subs = sub.subs;
				if (sub.update()) {
					if (subs.nextSub !== void 0) shallowPropagate(subs);
					sub = link.sub;
					continue;
				}
			} else sub.flags &= -33;
			sub = link.sub;
			if (link.nextDep !== void 0) {
				link = link.nextDep;
				continue top;
			}
			dirty = false;
		}
		return dirty && !!sub.flags;
	} while (true);
}
function shallowPropagate(link) {
	do {
		const sub = link.sub;
		const nextSub = link.nextSub;
		const subFlags = sub.flags;
		if ((subFlags & 48) === 32) sub.flags = subFlags | 16;
		link = nextSub;
	} while (link !== void 0);
}
function isValidLink(checkLink, sub) {
	let link = sub.depsTail;
	while (link !== void 0) {
		if (link === checkLink) return true;
		link = link.prevDep;
	}
	return false;
}
//#endregion
//#region packages/reactivity/src/dep.ts
var Dep = class {
	constructor(map, key) {
		this.map = map;
		this.key = key;
		this._subs = void 0;
		this.subsTail = void 0;
		this.flags = 0;
	}
	get subs() {
		return this._subs;
	}
	set subs(value) {
		this._subs = value;
		if (value === void 0) this.map.delete(this.key);
	}
};
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol("Object iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map keys iterate");
const ARRAY_ITERATE_KEY = Symbol("Array iterate");
/**
* Tracks access to a reactive property.
*
* This will check which effect is running at the moment and record it as dep
* which records all effects that depend on the reactive property.
*
* @param target - Object holding the reactive property.
* @param type - Defines the type of access to the reactive property.
* @param key - Identifier of the reactive property to track.
*/
function track(target, type, key) {
	if (activeSub !== void 0) {
		let depsMap = targetMap.get(target);
		if (!depsMap) targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
		let dep = depsMap.get(key);
		if (!dep) depsMap.set(key, dep = new Dep(depsMap, key));
		onTrack(activeSub, {
			target,
			type,
			key
		});
		link(dep, activeSub);
	}
}
/**
* Finds all deps associated with the target (or a specific property) and
* triggers the effects stored within.
*
* @param target - The reactive object.
* @param type - Defines the type of the operation that needs to trigger effects.
* @param key - Can be used to target a specific reactive property in the target object.
*/
function trigger(target, type, key, newValue, oldValue, oldTarget) {
	const depsMap = targetMap.get(target);
	if (!depsMap) return;
	const run = (dep) => {
		if (dep !== void 0 && dep.subs !== void 0) {
			triggerEventInfos.push({
				target,
				type,
				key,
				newValue,
				oldValue,
				oldTarget
			});
			propagate(dep.subs);
			shallowPropagate(dep.subs);
			triggerEventInfos.pop();
		}
	};
	startBatch();
	if (type === "clear") depsMap.forEach(run);
	else {
		const targetIsArray = isArray(target);
		const isArrayIndex = targetIsArray && isIntegerKey(key);
		if (targetIsArray && key === "length") {
			const newLength = Number(newValue);
			depsMap.forEach((dep, key) => {
				if (key === "length" || key === ARRAY_ITERATE_KEY || !isSymbol(key) && key >= newLength) run(dep);
			});
		} else {
			if (key !== void 0 || depsMap.has(void 0)) run(depsMap.get(key));
			if (isArrayIndex) run(depsMap.get(ARRAY_ITERATE_KEY));
			switch (type) {
				case "add":
					if (!targetIsArray) {
						run(depsMap.get(ITERATE_KEY));
						if (isMap(target)) run(depsMap.get(MAP_KEY_ITERATE_KEY));
					} else if (isArrayIndex) run(depsMap.get("length"));
					break;
				case "delete":
					if (!targetIsArray) {
						run(depsMap.get(ITERATE_KEY));
						if (isMap(target)) run(depsMap.get(MAP_KEY_ITERATE_KEY));
					}
					break;
				case "set": if (isMap(target)) run(depsMap.get(ITERATE_KEY));
			}
		}
	}
	endBatch();
}
//#endregion
//#region packages/reactivity/src/arrayInstrumentations.ts
/**
* Track array iteration and return:
* - if input is reactive: a cloned raw array with reactive values
* - if input is non-reactive or shallowReactive: the original raw array
*/
function reactiveReadArray(array) {
	const raw = /* @__PURE__ */ toRaw(array);
	if (raw === array) return raw;
	track(raw, "iterate", ARRAY_ITERATE_KEY);
	return /* @__PURE__ */ isShallow(array) ? raw : raw.map(toReactive);
}
/**
* Track array iteration and return raw array
*/
function shallowReadArray(arr) {
	track(arr = /* @__PURE__ */ toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
	return arr;
}
function toWrapped(target, item) {
	if (/* @__PURE__ */ isReadonly(target)) return /* @__PURE__ */ isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
	return toReactive(item);
}
const arrayInstrumentations = {
	__proto__: null,
	[Symbol.iterator]() {
		return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
	},
	concat(...args) {
		return reactiveReadArray(this).concat(...args.map((x) => isArray(x) ? reactiveReadArray(x) : x));
	},
	entries() {
		return iterator(this, "entries", (value) => {
			value[1] = toWrapped(this, value[1]);
			return value;
		});
	},
	every(fn, thisArg) {
		return apply(this, "every", fn, thisArg, void 0, arguments);
	},
	filter(fn, thisArg) {
		return apply(this, "filter", fn, thisArg, (v) => v.map((item) => toWrapped(this, item)), arguments);
	},
	find(fn, thisArg) {
		return apply(this, "find", fn, thisArg, (item) => toWrapped(this, item), arguments);
	},
	findIndex(fn, thisArg) {
		return apply(this, "findIndex", fn, thisArg, void 0, arguments);
	},
	findLast(fn, thisArg) {
		return apply(this, "findLast", fn, thisArg, (item) => toWrapped(this, item), arguments);
	},
	findLastIndex(fn, thisArg) {
		return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
	},
	forEach(fn, thisArg) {
		return apply(this, "forEach", fn, thisArg, void 0, arguments);
	},
	includes(...args) {
		return searchProxy(this, "includes", args);
	},
	indexOf(...args) {
		return searchProxy(this, "indexOf", args);
	},
	join(separator) {
		return reactiveReadArray(this).join(separator);
	},
	lastIndexOf(...args) {
		return searchProxy(this, "lastIndexOf", args);
	},
	map(fn, thisArg) {
		return apply(this, "map", fn, thisArg, void 0, arguments);
	},
	pop() {
		return noTracking(this, "pop");
	},
	push(...args) {
		return noTracking(this, "push", args);
	},
	reduce(fn, ...args) {
		return reduce(this, "reduce", fn, args);
	},
	reduceRight(fn, ...args) {
		return reduce(this, "reduceRight", fn, args);
	},
	shift() {
		return noTracking(this, "shift");
	},
	some(fn, thisArg) {
		return apply(this, "some", fn, thisArg, void 0, arguments);
	},
	splice(...args) {
		return noTracking(this, "splice", args);
	},
	toReversed() {
		return reactiveReadArray(this).toReversed();
	},
	toSorted(comparer) {
		return reactiveReadArray(this).toSorted(comparer);
	},
	toSpliced(...args) {
		return reactiveReadArray(this).toSpliced(...args);
	},
	unshift(...args) {
		return noTracking(this, "unshift", args);
	},
	values() {
		return iterator(this, "values", (item) => toWrapped(this, item));
	}
};
function iterator(self, method, wrapValue) {
	const arr = shallowReadArray(self);
	const iter = arr[method]();
	if (arr !== self && !/* @__PURE__ */ isShallow(self)) {
		iter._next = iter.next;
		iter.next = () => {
			const result = iter._next();
			if (!result.done) result.value = wrapValue(result.value);
			return result;
		};
	}
	return iter;
}
const arrayProto = Array.prototype;
function apply(self, method, fn, thisArg, wrappedRetFn, args) {
	const arr = shallowReadArray(self);
	const needsWrap = arr !== self && !/* @__PURE__ */ isShallow(self);
	const methodFn = arr[method];
	if (methodFn !== arrayProto[method]) {
		const result = methodFn.apply(self, args);
		return needsWrap ? toReactive(result) : result;
	}
	let wrappedFn = fn;
	if (arr !== self) {
		if (needsWrap) wrappedFn = function(item, index) {
			return fn.call(this, toWrapped(self, item), index, self);
		};
		else if (fn.length > 2) wrappedFn = function(item, index) {
			return fn.call(this, item, index, self);
		};
	}
	const result = methodFn.call(arr, wrappedFn, thisArg);
	return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self, method, fn, args) {
	const arr = shallowReadArray(self);
	const needsWrap = arr !== self && !/* @__PURE__ */ isShallow(self);
	let wrappedFn = fn;
	let wrapInitialAccumulator = false;
	if (arr !== self) {
		if (needsWrap) {
			wrapInitialAccumulator = args.length === 0;
			wrappedFn = function(acc, item, index) {
				if (wrapInitialAccumulator) {
					wrapInitialAccumulator = false;
					acc = toWrapped(self, acc);
				}
				return fn.call(this, acc, toWrapped(self, item), index, self);
			};
		} else if (fn.length > 3) wrappedFn = function(acc, item, index) {
			return fn.call(this, acc, item, index, self);
		};
	}
	const result = arr[method](wrappedFn, ...args);
	return wrapInitialAccumulator ? toWrapped(self, result) : result;
}
function searchProxy(self, method, args) {
	const arr = /* @__PURE__ */ toRaw(self);
	track(arr, "iterate", ARRAY_ITERATE_KEY);
	const res = arr[method](...args);
	if ((res === -1 || res === false) && /* @__PURE__ */ isProxy(args[0])) {
		args[0] = /* @__PURE__ */ toRaw(args[0]);
		return arr[method](...args);
	}
	return res;
}
function noTracking(self, method, args = []) {
	startBatch();
	const prevSub = setActiveSub();
	const res = (/* @__PURE__ */ toRaw(self))[method].apply(self, args);
	setActiveSub(prevSub);
	endBatch();
	return res;
}
//#endregion
//#region packages/reactivity/src/baseHandlers.ts
const isNonTrackableKeys = /*@__PURE__*/ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(/*@__PURE__*/ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol));
function hasOwnProperty(key) {
	if (!isSymbol(key)) key = String(key);
	const obj = /* @__PURE__ */ toRaw(this);
	track(obj, "has", key);
	return obj.hasOwnProperty(key);
}
var BaseReactiveHandler = class {
	constructor(_isReadonly = false, _isShallow = false) {
		this._isReadonly = _isReadonly;
		this._isShallow = _isShallow;
	}
	get(target, key, receiver) {
		if (key === "__v_skip") return target["__v_skip"];
		const isReadonly = this._isReadonly, isShallow = this._isShallow;
		if (key === "__v_isReactive") return !isReadonly;
		else if (key === "__v_isReadonly") return isReadonly;
		else if (key === "__v_isShallow") return isShallow;
		else if (key === "__v_raw") {
			if (receiver === (isReadonly ? isShallow ? shallowReadonlyMap : readonlyMap : isShallow ? shallowReactiveMap : reactiveMap).get(target) || Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) return target;
			return;
		}
		const targetIsArray = isArray(target);
		if (!isReadonly) {
			let fn;
			if (targetIsArray && (fn = arrayInstrumentations[key])) return fn;
			if (key === "hasOwnProperty") return hasOwnProperty;
		}
		const wasRef = /* @__PURE__ */ isRef(target);
		const res = Reflect.get(target, key, wasRef ? target : receiver);
		if (wasRef && key !== "value") return res;
		if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) return res;
		if (!isReadonly) track(target, "get", key);
		if (isShallow) return res;
		if (/* @__PURE__ */ isRef(res)) {
			const value = targetIsArray && isIntegerKey(key) ? res : res.value;
			return isReadonly && isObject(value) ? /* @__PURE__ */ readonly(value) : value;
		}
		if (isObject(res)) return isReadonly ? /* @__PURE__ */ readonly(res) : /* @__PURE__ */ reactive(res);
		return res;
	}
};
var MutableReactiveHandler = class extends BaseReactiveHandler {
	constructor(isShallow = false) {
		super(false, isShallow);
	}
	set(target, key, value, receiver) {
		let oldValue = target[key];
		const isArrayWithIntegerKey = isArray(target) && isIntegerKey(key);
		if (!this._isShallow) {
			const isOldValueReadonly = /* @__PURE__ */ isReadonly(oldValue);
			if (!/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
				oldValue = /* @__PURE__ */ toRaw(oldValue);
				value = /* @__PURE__ */ toRaw(value);
			}
			if (!isArrayWithIntegerKey && /* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
				if (isOldValueReadonly) {
					warn$2(`Set operation on key "${String(key)}" failed: target is readonly.`, target[key]);
					return true;
				} else {
					oldValue.value = value;
					return true;
				}
			}
		}
		const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
		const result = Reflect.set(target, key, value, /* @__PURE__ */ isRef(target) ? target : receiver);
		if (target === /* @__PURE__ */ toRaw(receiver) && result) {
			if (!hadKey) trigger(target, "add", key, value);
			else if (hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
		}
		return result;
	}
	deleteProperty(target, key) {
		const hadKey = hasOwn(target, key);
		const oldValue = target[key];
		const result = Reflect.deleteProperty(target, key);
		if (result && hadKey) trigger(target, "delete", key, void 0, oldValue);
		return result;
	}
	has(target, key) {
		const result = Reflect.has(target, key);
		if (!isSymbol(key) || !builtInSymbols.has(key)) track(target, "has", key);
		return result;
	}
	ownKeys(target) {
		track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
		return Reflect.ownKeys(target);
	}
};
var ReadonlyReactiveHandler = class extends BaseReactiveHandler {
	constructor(isShallow = false) {
		super(true, isShallow);
	}
	set(target, key) {
		warn$2(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
		return true;
	}
	deleteProperty(target, key) {
		warn$2(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
		return true;
	}
};
const mutableHandlers = /*@__PURE__*/ new MutableReactiveHandler();
const readonlyHandlers = /*@__PURE__*/ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /*@__PURE__*/ new MutableReactiveHandler(true);
const shallowReadonlyHandlers = /*@__PURE__*/ new ReadonlyReactiveHandler(true);
//#endregion
//#region packages/reactivity/src/collectionHandlers.ts
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly, isShallow) {
	return function(...args) {
		const target = this["__v_raw"];
		const rawTarget = /* @__PURE__ */ toRaw(target);
		const targetIsMap = isMap(rawTarget);
		const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
		const isKeyOnly = method === "keys" && targetIsMap;
		const innerIterator = target[method](...args);
		const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
		!isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
		return extend(Object.create(innerIterator), { next() {
			const { value, done } = innerIterator.next();
			return done ? {
				value,
				done
			} : {
				value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
				done
			};
		} });
	};
}
function createReadonlyMethod(type) {
	return function(...args) {
		{
			const key = args[0] ? `on key "${args[0]}" ` : ``;
			warn$2(`${capitalize(type)} operation ${key}failed: target is readonly.`, /* @__PURE__ */ toRaw(this));
		}
		return type === "delete" ? false : type === "clear" ? void 0 : this;
	};
}
function createInstrumentations(readonly, shallow) {
	const instrumentations = {
		get(key) {
			const target = this["__v_raw"];
			const rawTarget = /* @__PURE__ */ toRaw(target);
			const rawKey = /* @__PURE__ */ toRaw(key);
			if (!readonly) {
				if (hasChanged(key, rawKey)) track(rawTarget, "get", key);
				track(rawTarget, "get", rawKey);
			}
			const { has } = getProto(rawTarget);
			const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
			if (has.call(rawTarget, key)) return wrap(target.get(key));
			else if (has.call(rawTarget, rawKey)) return wrap(target.get(rawKey));
			else if (target !== rawTarget) target.get(key);
		},
		get size() {
			const target = this["__v_raw"];
			!readonly && track(/* @__PURE__ */ toRaw(target), "iterate", ITERATE_KEY);
			return target.size;
		},
		has(key) {
			const target = this["__v_raw"];
			const rawTarget = /* @__PURE__ */ toRaw(target);
			const rawKey = /* @__PURE__ */ toRaw(key);
			if (!readonly) {
				if (hasChanged(key, rawKey)) track(rawTarget, "has", key);
				track(rawTarget, "has", rawKey);
			}
			return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
		},
		forEach(callback, thisArg) {
			const observed = this;
			const target = observed["__v_raw"];
			const rawTarget = /* @__PURE__ */ toRaw(target);
			const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
			!readonly && track(rawTarget, "iterate", ITERATE_KEY);
			return target.forEach((value, key) => {
				return callback.call(thisArg, wrap(value), wrap(key), observed);
			});
		}
	};
	extend(instrumentations, readonly ? {
		add: createReadonlyMethod("add"),
		set: createReadonlyMethod("set"),
		delete: createReadonlyMethod("delete"),
		clear: createReadonlyMethod("clear")
	} : {
		add(value) {
			const target = /* @__PURE__ */ toRaw(this);
			const proto = getProto(target);
			const rawValue = /* @__PURE__ */ toRaw(value);
			const valueToAdd = !shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value) ? rawValue : value;
			if (!(proto.has.call(target, valueToAdd) || hasChanged(value, valueToAdd) && proto.has.call(target, value) || hasChanged(rawValue, valueToAdd) && proto.has.call(target, rawValue))) {
				target.add(valueToAdd);
				trigger(target, "add", valueToAdd, valueToAdd);
			}
			return this;
		},
		set(key, value) {
			if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) value = /* @__PURE__ */ toRaw(value);
			const target = /* @__PURE__ */ toRaw(this);
			const { has, get } = getProto(target);
			let hadKey = has.call(target, key);
			if (!hadKey) {
				key = /* @__PURE__ */ toRaw(key);
				hadKey = has.call(target, key);
			} else checkIdentityKeys(target, has, key);
			const oldValue = get.call(target, key);
			target.set(key, value);
			if (!hadKey) trigger(target, "add", key, value);
			else if (hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
			return this;
		},
		delete(key) {
			const target = /* @__PURE__ */ toRaw(this);
			const { has, get } = getProto(target);
			let hadKey = has.call(target, key);
			if (!hadKey) {
				key = /* @__PURE__ */ toRaw(key);
				hadKey = has.call(target, key);
			} else checkIdentityKeys(target, has, key);
			const oldValue = get ? get.call(target, key) : void 0;
			const result = target.delete(key);
			if (hadKey) trigger(target, "delete", key, void 0, oldValue);
			return result;
		},
		clear() {
			const target = /* @__PURE__ */ toRaw(this);
			const hadItems = target.size !== 0;
			const oldTarget = isMap(target) ? new Map(target) : new Set(target);
			const result = target.clear();
			if (hadItems) trigger(target, "clear", void 0, void 0, oldTarget);
			return result;
		}
	});
	[
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((method) => {
		instrumentations[method] = createIterableMethod(method, readonly, shallow);
	});
	return instrumentations;
}
function createInstrumentationGetter(isReadonly, shallow) {
	const instrumentations = createInstrumentations(isReadonly, shallow);
	return (target, key, receiver) => {
		if (key === "__v_isReactive") return !isReadonly;
		else if (key === "__v_isReadonly") return isReadonly;
		else if (key === "__v_raw") return target;
		return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
	};
}
const mutableCollectionHandlers = { get: /*@__PURE__*/ createInstrumentationGetter(false, false) };
const shallowCollectionHandlers = { get: /*@__PURE__*/ createInstrumentationGetter(false, true) };
const readonlyCollectionHandlers = { get: /*@__PURE__*/ createInstrumentationGetter(true, false) };
const shallowReadonlyCollectionHandlers = { get: /*@__PURE__*/ createInstrumentationGetter(true, true) };
function checkIdentityKeys(target, has, key) {
	const rawKey = /* @__PURE__ */ toRaw(key);
	if (rawKey !== key && has.call(target, rawKey)) {
		const type = toRawType(target);
		warn$2(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
	}
}
//#endregion
//#region packages/reactivity/src/reactive.ts
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
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
/*@__NO_SIDE_EFFECTS__*/
function reactive(target) {
	if (/* @__PURE__ */ isReadonly(target)) return target;
	return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
/**
* Shallow version of {@link reactive}.
*
* Unlike {@link reactive}, there is no deep conversion: only root-level
* properties are reactive for a shallow reactive object. Property values are
* stored and exposed as-is - this also means properties with ref values will
* not be automatically unwrapped.
*
* @example
* ```js
* const state = shallowReactive({
*   foo: 1,
*   nested: {
*     bar: 2
*   }
* })
*
* // mutating state's own properties is reactive
* state.foo++
*
* // ...but does not convert nested objects
* isReactive(state.nested) // false
*
* // NOT reactive
* state.nested.bar++
* ```
*
* @param target - The source object.
* @see {@link https://vuejs.org/api/reactivity-advanced.html#shallowreactive}
*/
/*@__NO_SIDE_EFFECTS__*/
function shallowReactive(target) {
	return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
/**
* Takes an object (reactive or plain) or a ref and returns a readonly proxy to
* the original.
*
* A readonly proxy is deep: any nested property accessed will be readonly as
* well. It also has the same ref-unwrapping behavior as {@link reactive},
* except the unwrapped values will also be made readonly.
*
* @example
* ```js
* const original = reactive({ count: 0 })
*
* const copy = readonly(original)
*
* watchEffect(() => {
*   // works for reactivity tracking
*   console.log(copy.count)
* })
*
* // mutating original will trigger watchers relying on the copy
* original.count++
*
* // mutating the copy will fail and result in a warning
* copy.count++ // warning!
* ```
*
* @param target - The source object.
* @see {@link https://vuejs.org/api/reactivity-core.html#readonly}
*/
/*@__NO_SIDE_EFFECTS__*/
function readonly(target) {
	return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
/**
* Shallow version of {@link readonly}.
*
* Unlike {@link readonly}, there is no deep conversion: only root-level
* properties are made readonly. Property values are stored and exposed as-is -
* this also means properties with ref values will not be automatically
* unwrapped.
*
* @example
* ```js
* const state = shallowReadonly({
*   foo: 1,
*   nested: {
*     bar: 2
*   }
* })
*
* // mutating state's own properties will fail
* state.foo++
*
* // ...but works on nested objects
* isReadonly(state.nested) // false
*
* // works
* state.nested.bar++
* ```
*
* @param target - The source object.
* @see {@link https://vuejs.org/api/reactivity-advanced.html#shallowreadonly}
*/
/*@__NO_SIDE_EFFECTS__*/
function shallowReadonly(target) {
	return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
	if (!isObject(target)) {
		warn$2(`value cannot be made ${isReadonly ? "readonly" : "reactive"}: ${String(target)}`);
		return target;
	}
	if (target["__v_raw"] && !(isReadonly && target["__v_isReactive"])) return target;
	if (target["__v_skip"] || !Object.isExtensible(target)) return target;
	const existingProxy = proxyMap.get(target);
	if (existingProxy) return existingProxy;
	const targetType = targetTypeMap(toRawType(target));
	if (targetType === 0) return target;
	const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
	proxyMap.set(target, proxy);
	return proxy;
}
/**
* Checks if an object is a proxy created by {@link reactive} or
* {@link shallowReactive} (or {@link ref} in some cases).
*
* @example
* ```js
* isReactive(reactive({}))            // => true
* isReactive(readonly(reactive({})))  // => true
* isReactive(ref({}).value)           // => true
* isReactive(readonly(ref({})).value) // => true
* isReactive(ref(true))               // => false
* isReactive(shallowRef({}).value)    // => false
* isReactive(shallowReactive({}))     // => true
* ```
*
* @param value - The value to check.
* @see {@link https://vuejs.org/api/reactivity-utilities.html#isreactive}
*/
/*@__NO_SIDE_EFFECTS__*/
function isReactive(value) {
	if (/* @__PURE__ */ isReadonly(value)) return /* @__PURE__ */ isReactive(value["__v_raw"]);
	return !!(value && value["__v_isReactive"]);
}
/**
* Checks whether the passed value is a readonly object. The properties of a
* readonly object can change, but they can't be assigned directly via the
* passed object.
*
* The proxies created by {@link readonly} and {@link shallowReadonly} are
* both considered readonly, as is a computed ref without a set function.
*
* @param value - The value to check.
* @see {@link https://vuejs.org/api/reactivity-utilities.html#isreadonly}
*/
/*@__NO_SIDE_EFFECTS__*/
function isReadonly(value) {
	return !!(value && value["__v_isReadonly"]);
}
/*@__NO_SIDE_EFFECTS__*/
function isShallow(value) {
	return !!(value && value["__v_isShallow"]);
}
/**
* Checks if an object is a proxy created by {@link reactive},
* {@link readonly}, {@link shallowReactive} or {@link shallowReadonly}.
*
* @param value - The value to check.
* @see {@link https://vuejs.org/api/reactivity-utilities.html#isproxy}
*/
/*@__NO_SIDE_EFFECTS__*/
function isProxy(value) {
	return value ? !!value["__v_raw"] : false;
}
/**
* Returns the raw, original object of a Vue-created proxy.
*
* `toRaw()` can return the original object from proxies created by
* {@link reactive}, {@link readonly}, {@link shallowReactive} or
* {@link shallowReadonly}.
*
* This is an escape hatch that can be used to temporarily read without
* incurring proxy access / tracking overhead or write without triggering
* changes. It is **not** recommended to hold a persistent reference to the
* original object. Use with caution.
*
* @example
* ```js
* const foo = {}
* const reactiveFoo = reactive(foo)
*
* console.log(toRaw(reactiveFoo) === foo) // true
* ```
*
* @param observed - The object for which the "raw" value is requested.
* @see {@link https://vuejs.org/api/reactivity-advanced.html#toraw}
*/
/*@__NO_SIDE_EFFECTS__*/
function toRaw(observed) {
	const raw = observed && observed["__v_raw"];
	return raw ? /* @__PURE__ */ toRaw(raw) : observed;
}
/**
* Marks an object so that it will never be converted to a proxy. Returns the
* object itself.
*
* @example
* ```js
* const foo = markRaw({})
* console.log(isReactive(reactive(foo))) // false
*
* // also works when nested inside other reactive objects
* const bar = reactive({ foo })
* console.log(isReactive(bar.foo)) // false
* ```
*
* **Warning:** `markRaw()` together with the shallow APIs such as
* {@link shallowReactive} allow you to selectively opt-out of the default
* deep reactive/readonly conversion and embed raw, non-proxied objects in your
* state graph.
*
* @param value - The object to be marked as "raw".
* @see {@link https://vuejs.org/api/reactivity-advanced.html#markraw}
*/
function markRaw(value) {
	if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) def(value, "__v_skip", true);
	return value;
}
/**
* Returns a reactive proxy of the given value (if possible).
*
* If the given value is not an object, the original value itself is returned.
*
* @param value - The value for which a reactive proxy shall be created.
*/
const toReactive = (value) => isObject(value) ? /* @__PURE__ */ reactive(value) : value;
/**
* Returns a readonly proxy of the given value (if possible).
*
* If the given value is not an object, the original value itself is returned.
*
* @param value - The value for which a readonly proxy shall be created.
*/
const toReadonly = (value) => isObject(value) ? /* @__PURE__ */ readonly(value) : value;
//#endregion
//#region packages/reactivity/src/ref.ts
/*@__NO_SIDE_EFFECTS__*/
function isRef(r) {
	return r ? r["__v_isRef"] === true : false;
}
/**
* Returns the inner value if the argument is a ref, otherwise return the
* argument itself. This is a sugar function for
* `val = isRef(val) ? val.value : val`.
*
* @example
* ```js
* function useFoo(x: number | Ref<number>) {
*   const unwrapped = unref(x)
*   // unwrapped is guaranteed to be number now
* }
* ```
*
* @param ref - Ref or plain value to be converted into the plain value.
* @see {@link https://vuejs.org/api/reactivity-utilities.html#unref}
*/
function unref(ref) {
	return /* @__PURE__ */ isRef(ref) ? ref.value : ref;
}
const shallowUnwrapHandlers = {
	get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
	set: (target, key, value, receiver) => {
		const oldValue = target[key];
		if (/* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
			oldValue.value = value;
			return true;
		} else return Reflect.set(target, key, value, receiver);
	}
};
/**
* Returns a proxy for the given object that shallowly unwraps properties that
* are refs. If the object already is reactive, it's returned as-is. If not, a
* new reactive proxy is created.
*
* @param objectWithRefs - Either an already-reactive object or a simple object
* that contains refs.
*/
function proxyRefs(objectWithRefs) {
	return /* @__PURE__ */ isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
//#endregion
//#region packages/reactivity/src/effect.ts
var ReactiveEffect = class {
	fn() {}
	constructor(fn) {
		this.deps = void 0;
		this.depsTail = void 0;
		this.subs = void 0;
		this.subsTail = void 0;
		this.flags = 18;
		this.cleanups = [];
		this.cleanupsLength = 0;
		if (fn !== void 0) this.fn = fn;
		if (activeEffectScope) link(this, activeEffectScope);
	}
	get active() {
		return !(this.flags & 1024);
	}
	pause() {
		this.flags |= 256;
	}
	resume() {
		if ((this.flags &= -257) & 48) this.notify();
	}
	notify() {
		if (!(this.flags & 256) && this.dirty) this.run();
	}
	run() {
		if (!this.active) return this.fn();
		cleanup(this);
		const prevSub = startTracking(this);
		incRunDepth();
		try {
			return this.fn();
		} finally {
			decRunDepth();
			endTracking(this, prevSub);
			const flags = this.flags;
			if ((flags & 136) === 136) {
				this.flags = flags & -9;
				this.notify();
			}
		}
	}
	stop() {
		if (!this.active) return;
		this.flags = 1024;
		let dep = this.deps;
		while (dep !== void 0) dep = unlink(dep, this);
		const sub = this.subs;
		if (sub !== void 0) unlink(sub);
		cleanup(this);
	}
	get dirty() {
		const flags = this.flags;
		if (flags & 16) return true;
		if (flags & 32) {
			if (checkDirty(this.deps, this)) {
				this.flags = flags | 16;
				return true;
			} else this.flags = flags & -33;
		}
		return false;
	}
};
setupOnTrigger(ReactiveEffect);
function cleanup(sub) {
	const l = sub.cleanupsLength;
	if (l) {
		for (let i = 0; i < l; i++) sub.cleanups[i]();
		sub.cleanupsLength = 0;
	}
}
//#endregion
//#region packages/reactivity/src/effectScope.ts
let activeEffectScope;
var EffectScope = class {
	constructor(detached = false) {
		this.deps = void 0;
		this.depsTail = void 0;
		this.subs = void 0;
		this.subsTail = void 0;
		this.flags = 0;
		this.cleanups = [];
		this.cleanupsLength = 0;
		if (!detached && activeEffectScope) link(this, activeEffectScope);
	}
	get active() {
		return !(this.flags & 1024);
	}
	pause() {
		if (!(this.flags & 256)) {
			this.flags |= 256;
			for (let link = this.deps; link !== void 0; link = link.nextDep) {
				const dep = link.dep;
				if ("pause" in dep) dep.pause();
			}
		}
	}
	/**
	* Resumes the effect scope, including all child scopes and effects.
	*/
	resume() {
		const flags = this.flags;
		if (flags & 256) {
			this.flags = flags & -257;
			for (let link = this.deps; link !== void 0; link = link.nextDep) {
				const dep = link.dep;
				if ("resume" in dep) dep.resume();
			}
		}
	}
	run(fn) {
		const prevScope = activeEffectScope;
		try {
			activeEffectScope = this;
			return fn();
		} finally {
			activeEffectScope = prevScope;
		}
	}
	stop() {
		if (!this.active) return;
		this.flags = 1024;
		this.reset();
		const sub = this.subs;
		if (sub !== void 0) unlink(sub);
	}
	/**
	* @internal
	*/
	reset() {
		let dep = this.deps;
		while (dep !== void 0) {
			const node = dep.dep;
			if ("stop" in node) {
				dep = dep.nextDep;
				node.stop();
			} else dep = unlink(dep, this);
		}
		cleanup(this);
	}
};
function setCurrentScope(scope) {
	try {
		return activeEffectScope;
	} finally {
		activeEffectScope = scope;
	}
}
//#endregion
//#region packages/reactivity/src/computed.ts
/**
* @private exported by @vue/reactivity for Vue core use, but not exported from
* the main vue package
*/
var ComputedRefImpl = class {
	get effect() {
		return this;
	}
	get dep() {
		return this;
	}
	/**
	* @internal
	* for backwards compat
	*/
	get _dirty() {
		const flags = this.flags;
		if (flags & 16) return true;
		if (flags & 32) {
			if (checkDirty(this.deps, this)) {
				this.flags = flags | 16;
				return true;
			} else this.flags = flags & -33;
		}
		return false;
	}
	/**
	* @internal
	* for backwards compat
	*/
	set _dirty(v) {
		if (v) this.flags |= 16;
		else this.flags &= -49;
	}
	constructor(fn, setter) {
		this.fn = fn;
		this.setter = setter;
		this._value = void 0;
		this.subs = void 0;
		this.subsTail = void 0;
		this.deps = void 0;
		this.depsTail = void 0;
		this.flags = 17;
		this.__v_isRef = true;
		this["__v_isReadonly"] = !setter;
	}
	get value() {
		const flags = this.flags;
		if (flags & 16 || flags & 32 && checkDirty(this.deps, this)) {
			if (this.update()) {
				const subs = this.subs;
				if (subs !== void 0) shallowPropagate(subs);
			}
		} else if (flags & 32) this.flags = flags & -33;
		if (activeSub !== void 0) {
			onTrack(activeSub, {
				target: this,
				type: "get",
				key: "value"
			});
			link(this, activeSub);
		} else if (activeEffectScope !== void 0) link(this, activeEffectScope);
		return this._value;
	}
	set value(newValue) {
		if (this.setter) this.setter(newValue);
		else warn$2("Write operation failed: computed value is readonly");
	}
	update() {
		const prevSub = startTracking(this);
		try {
			const oldValue = this._value;
			const newValue = this.fn(oldValue);
			if (hasChanged(oldValue, newValue)) {
				this._value = newValue;
				return true;
			}
			return false;
		} finally {
			endTracking(this, prevSub);
		}
	}
};
setupOnTrigger(ComputedRefImpl);
/*@__NO_SIDE_EFFECTS__*/
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
	let getter;
	let setter;
	if (isFunction(getterOrOptions)) getter = getterOrOptions;
	else {
		getter = getterOrOptions.get;
		setter = getterOrOptions.set;
	}
	const cRef = new ComputedRefImpl(getter, setter);
	if (debugOptions && !isSSR) {
		cRef.onTrack = debugOptions.onTrack;
		cRef.onTrigger = debugOptions.onTrigger;
	}
	return cRef;
}
//#endregion
//#region packages/reactivity/src/watch.ts
const INITIAL_WATCHER_VALUE = {};
let activeWatcher = void 0;
/**
* Registers a cleanup callback on the current active effect. This
* registered cleanup callback will be invoked right before the
* associated effect re-runs.
*
* @param cleanupFn - The callback function to attach to the effect's cleanup.
* @param failSilently - if `true`, will not throw warning when called without
* an active effect.
* @param owner - The effect that this cleanup function should be attached to.
* By default, the current active effect.
*/
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
	if (owner) {
		const { call } = owner.options;
		if (call) owner.cleanups[owner.cleanupsLength++] = () => call(cleanupFn, 4);
		else owner.cleanups[owner.cleanupsLength++] = cleanupFn;
	} else if (!failSilently) warn$2("onWatcherCleanup() was called when there was no active watcher to associate with.");
}
var WatcherEffect = class extends ReactiveEffect {
	constructor(source, cb, options = EMPTY_OBJ) {
		const { deep, once, call, onWarn } = options;
		let getter;
		let forceTrigger = false;
		let isMultiSource = false;
		if (/* @__PURE__ */ isRef(source)) {
			getter = () => source.value;
			forceTrigger = /* @__PURE__ */ isShallow(source);
		} else if (/* @__PURE__ */ isReactive(source)) {
			getter = () => reactiveGetter(source, deep);
			forceTrigger = true;
		} else if (isArray(source)) {
			isMultiSource = true;
			forceTrigger = source.some((s) => /* @__PURE__ */ isReactive(s) || /* @__PURE__ */ isShallow(s));
			getter = () => source.map((s) => {
				if (/* @__PURE__ */ isRef(s)) return s.value;
				else if (/* @__PURE__ */ isReactive(s)) return reactiveGetter(s, deep);
				else if (isFunction(s)) return call ? call(s, 2) : s();
				else warnInvalidSource(s, onWarn);
			});
		} else if (isFunction(source)) {
			if (cb) getter = call ? () => call(source, 2) : source;
			else getter = () => {
				if (this.cleanupsLength) {
					const prevSub = setActiveSub();
					try {
						cleanup(this);
					} finally {
						setActiveSub(prevSub);
					}
				}
				const currentEffect = activeWatcher;
				activeWatcher = this;
				try {
					return call ? call(source, 3, [this.boundCleanup]) : source(this.boundCleanup);
				} finally {
					activeWatcher = currentEffect;
				}
			};
		} else {
			getter = NOOP;
			warnInvalidSource(source, onWarn);
		}
		if (cb && deep) {
			const baseGetter = getter;
			const depth = deep === true ? Infinity : deep;
			getter = () => traverse(baseGetter(), depth);
		}
		super(getter);
		this.cb = cb;
		this.options = options;
		this.boundCleanup = (fn) => onWatcherCleanup(fn, false, this);
		this.forceTrigger = forceTrigger;
		this.isMultiSource = isMultiSource;
		if (once && cb) {
			const _cb = cb;
			cb = (...args) => {
				const res = _cb(...args);
				this.stop();
				return res;
			};
		}
		this.cb = cb;
		this.oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
		this.onTrack = options.onTrack;
		this.onTrigger = options.onTrigger;
	}
	run(initialRun = false) {
		const oldValue = this.oldValue;
		const newValue = this.oldValue = super.run();
		if (!this.cb) return;
		const { immediate, deep, call } = this.options;
		if (initialRun && !immediate) return;
		if (initialRun || deep || this.forceTrigger || (this.isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
			cleanup(this);
			const currentWatcher = activeWatcher;
			activeWatcher = this;
			try {
				const args = [
					newValue,
					oldValue === INITIAL_WATCHER_VALUE ? void 0 : this.isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
					this.boundCleanup
				];
				call ? call(this.cb, 3, args) : this.cb(...args);
			} finally {
				activeWatcher = currentWatcher;
			}
		}
	}
};
function reactiveGetter(source, deep) {
	if (deep) return source;
	if (/* @__PURE__ */ isShallow(source) || deep === false || deep === 0) return traverse(source, 1);
	return traverse(source);
}
function warnInvalidSource(s, onWarn) {
	(onWarn || warn$2)(`Invalid watch source: `, s, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
}
function traverse(value, depth = Infinity, seen) {
	if (depth <= 0 || !isObject(value) || value["__v_skip"]) return value;
	seen = seen || /* @__PURE__ */ new Map();
	if ((seen.get(value) || 0) >= depth) return value;
	seen.set(value, depth);
	depth--;
	if (/* @__PURE__ */ isRef(value)) traverse(value.value, depth, seen);
	else if (isArray(value)) for (let i = 0; i < value.length; i++) traverse(value[i], depth, seen);
	else if (isSet(value) || isMap(value)) value.forEach((v) => {
		traverse(v, depth, seen);
	});
	else if (isPlainObject(value)) {
		for (const key in value) traverse(value[key], depth, seen);
		for (const key of Object.getOwnPropertySymbols(value)) if (Object.prototype.propertyIsEnumerable.call(value, key)) traverse(value[key], depth, seen);
	}
	return value;
}
//#endregion
//#region packages/runtime-core/src/warning.ts
const stack = [];
/**
* @internal
*/
function pushWarningContext$1(ctx) {
	stack.push(ctx);
}
/**
* @internal
*/
function popWarningContext$1() {
	stack.pop();
}
let isWarning = false;
function warn$1(msg, ...args) {
	if (isWarning) return;
	isWarning = true;
	const prevSub = setActiveSub();
	const entry = stack.length ? stack[stack.length - 1] : null;
	const instance = isVNode$2(entry) ? entry.component : entry;
	const appWarnHandler = instance && instance.appContext.config.warnHandler;
	const trace = getComponentTrace();
	if (appWarnHandler) callWithErrorHandling(appWarnHandler, instance, 11, [
		msg + args.map((a) => {
			const toString = a.toString;
			return toString == null ? JSON.stringify(a) : toString.call(a);
		}).join(""),
		instance && instance.proxy || instance,
		trace.map(({ ctx }) => `at <${formatComponentName(instance, ctx.type)}>`).join("\n"),
		trace
	]);
	else {
		const warnArgs = [`[Vue warn]: ${msg}`, ...args];
		if (trace.length && true)
 /* v8 ignore next 2 */
		warnArgs.push(`\n`, ...formatTrace(trace));
		console.warn(...warnArgs);
	}
	setActiveSub(prevSub);
	isWarning = false;
}
function getComponentTrace() {
	let currentCtx = stack[stack.length - 1];
	if (!currentCtx) return [];
	const normalizedStack = [];
	while (currentCtx) {
		const last = normalizedStack[0];
		if (last && last.ctx === currentCtx) last.recurseCount++;
		else normalizedStack.push({
			ctx: currentCtx,
			recurseCount: 0
		});
		if (isVNode$2(currentCtx)) {
			const parent = currentCtx.component && currentCtx.component.parent;
			currentCtx = parent && parent.vnode || parent;
		} else currentCtx = currentCtx.parent;
	}
	return normalizedStack;
}
/* v8 ignore start */
function formatTrace(trace) {
	const logs = [];
	trace.forEach((entry, i) => {
		logs.push(...i === 0 ? [] : [`\n`], ...formatTraceEntry(entry));
	});
	return logs;
}
function formatTraceEntry({ ctx, recurseCount }) {
	const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
	const instance = isVNode$2(ctx) ? ctx.component : ctx;
	const isRoot = instance ? instance.parent == null : false;
	const open = ` at <${formatComponentName(instance, ctx.type, isRoot)}`;
	const close = `>` + postfix;
	return ctx.props ? [
		open,
		...formatProps(ctx.props),
		close
	] : [open + close];
}
function formatProps(props) {
	const res = [];
	const keys = Object.keys(props);
	keys.slice(0, 3).forEach((key) => {
		res.push(...formatProp(key, props[key]));
	});
	if (keys.length > 3) res.push(` ...`);
	return res;
}
function formatProp(key, value, raw) {
	if (isString(value)) {
		value = JSON.stringify(value);
		return raw ? value : [`${key}=${value}`];
	} else if (typeof value === "number" || typeof value === "boolean" || value == null) return raw ? value : [`${key}=${value}`];
	else if (/* @__PURE__ */ isRef(value)) {
		value = formatProp(key, /* @__PURE__ */ toRaw(value.value), true);
		return raw ? value : [
			`${key}=Ref<`,
			value,
			`>`
		];
	} else if (isFunction(value)) return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
	else {
		value = /* @__PURE__ */ toRaw(value);
		return raw ? value : [`${key}=`, value];
	}
}
/* v8 ignore stop */
//#endregion
//#region packages/runtime-core/src/errorHandling.ts
const ErrorTypeStrings = {
	["sp"]: "serverPrefetch hook",
	["bc"]: "beforeCreate hook",
	["c"]: "created hook",
	["bm"]: "beforeMount hook",
	["m"]: "mounted hook",
	["bu"]: "beforeUpdate hook",
	["u"]: "updated",
	["bum"]: "beforeUnmount hook",
	["um"]: "unmounted hook",
	["a"]: "activated hook",
	["da"]: "deactivated hook",
	["ba"]: "beforeActivate hook",
	["bda"]: "beforeDeactivate hook",
	["ec"]: "errorCaptured hook",
	["rtc"]: "renderTracked hook",
	["rtg"]: "renderTriggered hook",
	[0]: "setup function",
	[1]: "render function",
	[2]: "watcher getter",
	[3]: "watcher callback",
	[4]: "watcher cleanup function",
	[5]: "native event handler",
	[6]: "component event handler",
	[7]: "vnode hook",
	[8]: "directive hook",
	[9]: "transition hook",
	[10]: "app errorHandler",
	[11]: "app warnHandler",
	[12]: "ref function",
	[13]: "async component loader",
	[14]: "scheduler flush",
	[15]: "component update",
	[16]: "app unmount cleanup function"
};
function callWithErrorHandling(fn, instance, type, args) {
	try {
		return args ? fn(...args) : fn();
	} catch (err) {
		handleError(err, instance, type);
	}
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
	if (isFunction(fn)) {
		const res = callWithErrorHandling(fn, instance, type, args);
		if (res && isPromise(res)) res.catch((err) => {
			handleError(err, instance, type);
		});
		return res;
	}
	if (isArray(fn)) {
		const values = [];
		for (let i = 0; i < fn.length; i++) values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
		return values;
	} else warn$1(`Invalid value type passed to callWithAsyncErrorHandling(): ${typeof fn}`);
}
function handleError(err, instance, type, throwInDev = true) {
	const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
	if (instance) {
		let cur = instance.parent;
		const exposedInstance = instance.proxy || instance;
		const errorInfo = ErrorTypeStrings[type];
		while (cur) {
			const errorCapturedHooks = cur.ec;
			if (errorCapturedHooks) {
				for (let i = 0; i < errorCapturedHooks.length; i++) if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) return;
			}
			cur = cur.parent;
		}
		if (errorHandler) {
			const prevSub = setActiveSub();
			callWithErrorHandling(errorHandler, null, 10, [
				err,
				exposedInstance,
				errorInfo
			]);
			setActiveSub(prevSub);
			return;
		}
	}
	logError(err, type, instance, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, instance, throwInDev = true, throwInProd = false) {
	{
		const info = ErrorTypeStrings[type];
		if (instance) pushWarningContext$1(instance);
		warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
		if (instance) popWarningContext$1();
		if (throwInDev) throw err;
		else console.error(err);
	}
}
//#endregion
//#region packages/runtime-core/src/scheduler.ts
const jobs = [];
let postJobs = [];
let activePostJobs = null;
let currentFlushPromise = null;
let jobsLength = 0;
let flushIndex = 0;
let postFlushIndex = 0;
const resolvedPromise = /*@__PURE__*/ Promise.resolve();
const RECURSION_LIMIT = 100;
function nextTick(fn) {
	const p = currentFlushPromise || resolvedPromise;
	return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
function findInsertionIndex(order, queue, start, end) {
	while (start < end) {
		const middle = start + end >>> 1;
		if (queue[middle].order <= order) start = middle + 1;
		else end = middle;
	}
	return start;
}
/**
* @internal for runtime-vapor only
*/
function queueJob(job, id, isPre = false, order = 0) {
	if (queueJobWorker(job, id === void 0 ? isPre ? -2 : Infinity : isPre ? id * 2 : order ? id * 2 + 1 + order / (order + 1) : id * 2 + 1, jobs, jobsLength, flushIndex)) {
		jobsLength++;
		queueFlush();
	}
}
function queueJobWorker(job, order, queue, length, flushIndex) {
	const flags = job.flags;
	if (!(flags & 1)) {
		job.flags = flags | 1;
		job.order = order;
		if (flushIndex === length || order >= queue[length - 1].order) queue[length] = job;
		else queue.splice(findInsertionIndex(order, queue, flushIndex, length), 0, job);
		return true;
	}
	return false;
}
const doFlushJobs = () => {
	try {
		flushJobs();
	} catch (e) {
		currentFlushPromise = null;
		if (jobsLength || postJobs.length) queueFlush();
		throw e;
	}
};
function queueFlush() {
	if (!currentFlushPromise) currentFlushPromise = resolvedPromise.then(doFlushJobs);
}
function queuePostFlushCb(jobs, id = Infinity) {
	if (!isArray(jobs)) {
		if (activePostJobs && id === -1) activePostJobs.splice(postFlushIndex, 0, jobs);
		else queueJobWorker(jobs, id, postJobs, postJobs.length, 0);
	} else for (let i = 0; i < jobs.length; i++) queueJobWorker(jobs[i], id, postJobs, postJobs.length, 0);
	queueFlush();
}
function flushPreFlushCbs(instance, seen) {
	seen = seen || /* @__PURE__ */ new Map();
	for (let i = flushIndex; i < jobsLength; i++) {
		const cb = jobs[i];
		if (cb.order & 1 || cb.order === Infinity) continue;
		if (instance && cb.order !== instance.uid * 2) continue;
		if (checkRecursiveUpdates(seen, cb)) continue;
		jobs.splice(i, 1);
		i--;
		jobsLength--;
		if (cb.flags & 2) cb.flags &= -2;
		try {
			cb();
		} finally {
			if (!(cb.flags & 2)) cb.flags &= -2;
		}
	}
}
function flushPostFlushCbs(seen) {
	if (postJobs.length) {
		if (activePostJobs) {
			for (let i = 0; i < postJobs.length; i++) activePostJobs.push(postJobs[i]);
			postJobs.length = 0;
			return;
		}
		activePostJobs = postJobs;
		postJobs = [];
		seen = seen || /* @__PURE__ */ new Map();
		try {
			while (postFlushIndex < activePostJobs.length) {
				const cb = activePostJobs[postFlushIndex++];
				if (checkRecursiveUpdates(seen, cb)) continue;
				if (cb.flags & 2) cb.flags &= -2;
				if (!(cb.flags & 4)) try {
					cb();
				} finally {
					if (!(cb.flags & 2)) cb.flags &= -2;
				}
			}
		} finally {
			while (postFlushIndex < activePostJobs.length) activePostJobs[postFlushIndex++].flags &= -2;
			activePostJobs = null;
			postFlushIndex = 0;
		}
	}
}
let isFlushing = false;
/**
* @internal
*/
function flushOnAppMount(instance) {
	if (!isFlushing) {
		isFlushing = true;
		try {
			flushPreFlushCbs(instance);
			flushPostFlushCbs();
		} finally {
			isFlushing = false;
		}
	}
}
function flushJobs(seen) {
	seen || (seen = /* @__PURE__ */ new Map());
	try {
		while (flushIndex < jobsLength) {
			const job = jobs[flushIndex];
			jobs[flushIndex++] = void 0;
			if (!(job.flags & 4)) {
				if (checkRecursiveUpdates(seen, job)) continue;
				if (job.flags & 2) job.flags &= -2;
				try {
					job();
				} catch (err) {
					handleError(err, job.i, job.i ? 15 : 14);
				} finally {
					if (!(job.flags & 2)) job.flags &= -2;
				}
			}
		}
	} finally {
		while (flushIndex < jobsLength) {
			jobs[flushIndex].flags &= -2;
			jobs[flushIndex++] = void 0;
		}
		flushIndex = 0;
		jobsLength = 0;
		jobs.length = 0;
		flushPostFlushCbs(seen);
		if (jobsLength || postJobs.length) flushJobs(seen);
		else currentFlushPromise = null;
	}
}
function checkRecursiveUpdates(seen, fn) {
	const count = seen.get(fn) || 0;
	if (count > RECURSION_LIMIT) {
		const instance = fn.i;
		const componentName = instance && getComponentName(instance.type);
		handleError(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`, null, 10);
		return true;
	}
	seen.set(fn, count + 1);
	return false;
}
//#endregion
//#region packages/runtime-core/src/hmr.ts
let isHmrUpdating = false;
const setHmrUpdating = (v) => {
	try {
		return isHmrUpdating;
	} finally {
		isHmrUpdating = v;
	}
};
const hmrDirtyComponents = /* @__PURE__ */ new Map();
const hmrDirtyComponentsMode = /* @__PURE__ */ new Map();
getGlobalThis().__VUE_HMR_RUNTIME__ = {
	createRecord: tryWrap(createRecord),
	rerender: tryWrap(rerender),
	reload: tryWrap(reload)
};
function runWithHmrUpdating(fn) {
	isHmrUpdating = true;
	let done = false;
	try {
		fn();
		done = true;
	} finally {
		if (done) nextTick(() => {
			isHmrUpdating = false;
		});
		else isHmrUpdating = false;
	}
}
const map = /* @__PURE__ */ new Map();
function registerHMR(instance) {
	const id = instance.type.__hmrId;
	let record = map.get(id);
	if (!record) {
		createRecord(id, instance.type);
		record = map.get(id);
	}
	record.instances.add(instance);
}
function unregisterHMR(instance) {
	map.get(instance.type.__hmrId).instances.delete(instance);
}
function createRecord(id, initialDef) {
	if (map.has(id)) return false;
	map.set(id, {
		initialDef: normalizeClassComponent(initialDef),
		instances: /* @__PURE__ */ new Set()
	});
	return true;
}
function normalizeClassComponent(component) {
	return isClassComponent(component) ? component.__vccOpts : component;
}
function hasDirtyAncestor(instance, dirtyInstances) {
	let parent = instance.parent;
	while (parent) {
		if (dirtyInstances.has(parent)) return true;
		parent = parent.parent;
	}
	return false;
}
function rerender(id, newRender) {
	const record = map.get(id);
	if (!record) return;
	record.initialDef.render = newRender;
	[...record.instances].forEach((instance) => {
		if (newRender) {
			instance.render = newRender;
			normalizeClassComponent(instance.type).render = newRender;
		}
		runWithHmrUpdating(() => {
			if (instance.vapor) {
				if (!instance.isUnmounted) instance.hmrRerender();
			} else {
				const i = instance;
				if (!(i.effect.flags & 1024)) {
					i.renderCache = [];
					i.effect.run();
				}
			}
		});
	});
}
function reload(id, newComp) {
	const record = map.get(id);
	if (!record) return;
	newComp = normalizeClassComponent(newComp);
	const isVapor = record.initialDef.__vapor;
	updateComponentDef(record.initialDef, newComp);
	const instances = [...record.instances];
	if (isVapor && newComp.__vapor && !instances.some((instance) => instance.parent && !instance.parent.vapor) && !instances.some((i) => i.ceReload)) {
		for (const instance of instances) if (instance.root && instance.root.ce && instance !== instance.root) instance.root.ce._removeChildStyle(instance.type);
		const dirtyInstances = new Set(instances);
		const rerenderedParents = /* @__PURE__ */ new Set();
		runWithHmrUpdating(() => {
			for (const instance of instances) {
				const parent = instance.parent;
				if (parent) {
					if (!hasDirtyAncestor(instance, dirtyInstances) && !rerenderedParents.has(parent)) {
						rerenderedParents.add(parent);
						parent.hmrRerender();
					}
				} else instance.hmrReload(newComp);
			}
		});
	} else {
		const parentUpdates = /* @__PURE__ */ new Map();
		const dirtyInstanceSet = new Set(instances);
		for (const instance of instances) {
			const oldComp = normalizeClassComponent(instance.type);
			let dirtyInstances = hmrDirtyComponents.get(oldComp);
			if (!dirtyInstances) {
				if (oldComp !== record.initialDef) updateComponentDef(oldComp, newComp);
				hmrDirtyComponents.set(oldComp, dirtyInstances = /* @__PURE__ */ new Set());
			}
			dirtyInstances.add(instance);
			hmrDirtyComponentsMode.set(oldComp, !!isVapor);
			instance.appContext.propsCache.delete(instance.type);
			instance.appContext.emitsCache.delete(instance.type);
			instance.appContext.optionsCache.delete(instance.type);
			if (instance.ceReload) {
				dirtyInstances.add(instance);
				instance.ceReload(newComp.styles);
				dirtyInstances.delete(instance);
			} else if (instance.parent) {
				const parent = instance.parent;
				if (!hasDirtyAncestor(instance, dirtyInstanceSet)) {
					let updates = parentUpdates.get(parent);
					if (!updates) parentUpdates.set(parent, updates = []);
					updates.push([instance, dirtyInstances]);
				}
			} else if (instance.appContext.reload) instance.appContext.reload();
			else if (typeof window !== "undefined") window.location.reload();
			else console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
			if (instance.root.ce && instance !== instance.root) instance.root.ce._removeChildStyle(oldComp);
		}
		parentUpdates.forEach((updates, parent) => {
			queueJob(() => {
				try {
					runWithHmrUpdating(() => {
						if (parent.vapor) parent.hmrRerender();
						else {
							const i = parent;
							if (!(i.effect.flags & 1024)) {
								i.renderCache = [];
								i.effect.run();
							}
						}
					});
				} finally {
					updates.forEach(([instance, dirtyInstances]) => {
						dirtyInstances.delete(instance);
					});
				}
			});
		});
	}
	queuePostFlushCb(() => {
		hmrDirtyComponents.clear();
		hmrDirtyComponentsMode.clear();
	});
}
function updateComponentDef(oldComp, newComp) {
	extend(oldComp, newComp);
	for (const key in oldComp) if (key !== "__file" && !(key in newComp)) delete oldComp[key];
}
function tryWrap(fn) {
	return (id, arg) => {
		try {
			return fn(id, arg);
		} catch (e) {
			console.error(e);
			console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
		}
	};
}
//#endregion
//#region packages/runtime-core/src/devtools.ts
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
	if (devtools) devtools.emit(event, ...args);
	else if (!devtoolsNotInstalled) buffer.push({
		event,
		args
	});
}
function setDevtoolsHook(hook, target) {
	var _window$navigator;
	devtools = hook;
	if (devtools) {
		devtools.enabled = true;
		buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
		buffer = [];
	} else if (typeof window !== "undefined" && window.HTMLElement && !((_window$navigator = window.navigator) === null || _window$navigator === void 0 || (_window$navigator = _window$navigator.userAgent) === null || _window$navigator === void 0 ? void 0 : _window$navigator.includes("jsdom"))) {
		(target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((newHook) => {
			setDevtoolsHook(newHook, target);
		});
		setTimeout(() => {
			if (!devtools) {
				target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
				devtoolsNotInstalled = true;
				buffer = [];
			}
		}, 3e3);
	} else {
		devtoolsNotInstalled = true;
		buffer = [];
	}
}
function devtoolsInitApp(app, version) {
	emit$1("app:init", app, version, {
		Fragment,
		Text,
		Comment,
		Static
	});
}
function devtoolsUnmountApp(app) {
	emit$1("app:unmount", app);
}
const devtoolsComponentAdded = /*@__PURE__*/ createDevtoolsComponentHook("component:added");
const devtoolsComponentUpdated = /*@__PURE__*/ createDevtoolsComponentHook("component:updated");
const _devtoolsComponentRemoved = /*@__PURE__*/ createDevtoolsComponentHook("component:removed");
const devtoolsComponentRemoved = (component) => {
	if (devtools && typeof devtools.cleanupBuffer === "function" && !devtools.cleanupBuffer(component)) _devtoolsComponentRemoved(component);
};
/*@__NO_SIDE_EFFECTS__*/
function createDevtoolsComponentHook(hook) {
	return (component) => {
		emit$1(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : void 0, component);
	};
}
const devtoolsPerfStart = /*@__PURE__*/ createDevtoolsPerformanceHook("perf:start");
const devtoolsPerfEnd = /*@__PURE__*/ createDevtoolsPerformanceHook("perf:end");
function createDevtoolsPerformanceHook(hook) {
	return (component, type, time) => {
		emit$1(hook, component.appContext.app, component.uid, component, type, time);
	};
}
function devtoolsComponentEmit(component, event, params) {
	emit$1("component:emit", component.appContext.app, component, event, params);
}
//#endregion
//#region packages/runtime-core/src/componentRenderContext.ts
/**
* mark the current rendering instance for asset resolution (e.g.
* resolveComponent, resolveDirective) during render
*/
let currentRenderingInstance = null;
let currentScopeId = null;
/**
* Note: rendering calls maybe nested. The function returns the parent rendering
* instance if present, which should be restored after the render is done:
*
* ```js
* const prev = setCurrentRenderingInstance(i)
* // ...render
* setCurrentRenderingInstance(prev)
* ```
*/
function setCurrentRenderingInstance$1(instance) {
	const prev = currentRenderingInstance;
	currentRenderingInstance = instance;
	currentScopeId = instance && instance.type.__scopeId || null;
	return prev;
}
/**
* Wrap a slot function to memoize current rendering instance
* @private compiler helper
*/
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
	if (!ctx) return fn;
	if (fn._n) return fn;
	const renderFnWithContext = (...args) => {
		if (renderFnWithContext._d) setBlockTracking(-1);
		const prevInstance = setCurrentRenderingInstance$1(ctx);
		const prevStackSize = blockStack.length;
		let res;
		try {
			res = fn(...args);
		} finally {
			for (let i = blockStack.length; i > prevStackSize; i--) closeBlock();
			setCurrentRenderingInstance$1(prevInstance);
			if (renderFnWithContext._d) setBlockTracking(1);
		}
		devtoolsComponentUpdated(ctx);
		return res;
	};
	renderFnWithContext._n = true;
	renderFnWithContext._c = true;
	renderFnWithContext._d = true;
	return renderFnWithContext;
}
//#endregion
//#region packages/runtime-core/src/directives.ts
function validateDirectiveName(name) {
	if (isBuiltInDirective(name)) warn$1("Do not use built-in directive ids as custom directive id: " + name);
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
	const bindings = vnode.dirs;
	const oldBindings = prevVNode && prevVNode.dirs;
	for (let i = 0; i < bindings.length; i++) {
		const binding = bindings[i];
		if (oldBindings) binding.oldValue = oldBindings[i].value;
		let hook = binding.dir[name];
		if (hook) {
			const prevSub = setActiveSub();
			callWithAsyncErrorHandling(hook, instance, 8, [
				vnode.el,
				binding,
				vnode,
				prevVNode
			]);
			setActiveSub(prevSub);
		}
	}
}
//#endregion
//#region packages/runtime-core/src/apiInject.ts
function provide(key, value) {
	if (!currentInstance || currentInstance.isMounted && !isHmrUpdating) warn$1(`provide() can only be used inside setup().`);
	if (currentInstance) {
		let provides = currentInstance.provides;
		const parentProvides = currentInstance.parent && currentInstance.parent.provides;
		if (parentProvides === provides) provides = currentInstance.provides = Object.create(parentProvides);
		provides[key] = value;
	}
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
	const instance = getCurrentGenericInstance();
	if (instance || currentApp) {
		let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.appContext && instance.appContext.provides : instance.parent.provides : void 0;
		if (provides && key in provides) return provides[key];
		else if (arguments.length > 1) return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
		else warn$1(`injection "${String(key)}" not found.`);
	} else warn$1(`inject() can only be used inside setup() or functional components.`);
}
//#endregion
//#region packages/runtime-core/src/helpers/useSsrContext.ts
const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
	{
		const ctx = inject(ssrContextKey);
		if (!ctx) warn$1("Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.");
		return ctx;
	}
};
//#endregion
//#region packages/runtime-core/src/apiWatch.ts
function watch(source, cb, options) {
	if (!isFunction(cb)) warn$1("`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature.");
	return doWatch(source, cb, options);
}
var RenderWatcherEffect = class extends WatcherEffect {
	constructor(instance, source, cb, options, flush) {
		super(source, cb, options);
		this.flush = flush;
		const job = () => {
			if (this.dirty) this.run();
		};
		if (cb) {
			this.flags |= 128;
			job.flags |= 2;
		}
		if (instance) job.i = instance;
		this.job = job;
	}
	notify() {
		if (!(this.flags & 256)) {
			const flush = this.flush;
			const job = this.job;
			if (flush === "post") queuePostRenderEffect(job, void 0, job.i ? job.i.suspense : null);
			else if (flush === "pre") queueJob(job, job.i ? job.i.uid : void 0, true);
			else job();
		}
	}
};
function doWatch(source, cb, options = EMPTY_OBJ) {
	const { immediate, deep, flush = "pre", once } = options;
	if (!cb) {
		if (immediate !== void 0) warn$1("watch() \"immediate\" option is only respected when using the watch(source, callback, options?) signature.");
		if (deep !== void 0) warn$1("watch() \"deep\" option is only respected when using the watch(source, callback, options?) signature.");
		if (once !== void 0) warn$1("watch() \"once\" option is only respected when using the watch(source, callback, options?) signature.");
	}
	const baseWatchOptions = extend({}, options);
	baseWatchOptions.onWarn = warn$1;
	const runsImmediately = cb && immediate || !cb && flush !== "post";
	let ssrCleanup;
	if (isInSSRComponentSetup) {
		if (flush === "sync") {
			const ctx = useSSRContext();
			ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
		} else if (!runsImmediately) {
			const watchStopHandle = () => {};
			watchStopHandle.stop = NOOP;
			watchStopHandle.resume = NOOP;
			watchStopHandle.pause = NOOP;
			return watchStopHandle;
		}
	}
	const instance = currentInstance;
	baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
	const effect = new RenderWatcherEffect(instance, source, cb, baseWatchOptions, flush);
	if (cb) effect.run(true);
	else if (flush === "post") queuePostRenderEffect(effect.job, void 0, instance && instance.suspense);
	else effect.run(true);
	const stop = effect.stop.bind(effect);
	stop.pause = effect.pause.bind(effect);
	stop.resume = effect.resume.bind(effect);
	stop.stop = stop;
	if (isInSSRComponentSetup) {
		if (ssrCleanup) ssrCleanup.push(stop);
		else if (runsImmediately) stop();
	}
	return stop;
}
function instanceWatch(source, value, options) {
	const publicThis = this.proxy;
	const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
	let cb;
	if (isFunction(value)) cb = value;
	else {
		cb = value.handler;
		options = value;
	}
	const prev = setCurrentInstance(this);
	const res = doWatch(getter, cb.bind(publicThis), options);
	restoreCurrentInstance(prev);
	return res;
}
function createPathGetter(ctx, path) {
	const segments = path.split(".");
	return () => {
		let cur = ctx;
		for (let i = 0; i < segments.length && cur; i++) cur = cur[segments[i]];
		return cur;
	};
}
//#endregion
//#region packages/runtime-core/src/components/Teleport.ts
const TeleportEndKey = Symbol("_vte");
const isTeleport = (type) => type.__isTeleport;
//#endregion
//#region packages/runtime-core/src/components/BaseTransition.ts
const leaveCbKey = Symbol("_leaveCb");
function findNonCommentChild(children) {
	let child = children[0];
	if (children.length > 1) {
		let hasFound = false;
		for (const c of children) if (c.type !== Comment) {
			if (hasFound) {
				warn$1("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
				break;
			}
			child = c;
			hasFound = true;
		}
	}
	return child;
}
function getInnerChild(vnode) {
	if (!isKeepAlive(vnode)) {
		if (isTeleport(vnode.type) && vnode.children) return findNonCommentChild(vnode.children);
		return vnode;
	}
	if (vnode.component) return vnode.component.subTree;
	const { shapeFlag, children } = vnode;
	if (children) {
		if (shapeFlag & 16) return children[0];
		if (shapeFlag & 32 && isFunction(children.default)) return children.default();
	}
}
function setTransitionHooks(vnode, hooks) {
	if (vnode.shapeFlag & 6 && vnode.component) {
		vnode.transition = hooks;
		if (isVaporComponent(vnode.type)) getVaporInterface(vnode.component, vnode).setTransitionHooks(vnode.component, hooks);
		else {
			const subTree = vnode.component.subTree;
			return setTransitionHooks(isTeleport(subTree.type) ? getInnerChild(subTree) || subTree : subTree, hooks);
		}
	} else if (vnode.shapeFlag & 128) {
		const contentHooks = vnode.ssContent.transition = hooks.clone(vnode.ssContent);
		const fallbackHooks = vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
		return vnode.suspense && vnode.suspense.activeBranch === vnode.ssFallback ? fallbackHooks : contentHooks;
	} else vnode.transition = hooks;
	return hooks;
}
//#endregion
//#region packages/runtime-core/src/helpers/useId.ts
/**
* There are 3 types of async boundaries:
* - async components
* - components with async setup()
* - components with serverPrefetch
*/
function markAsyncBoundary(instance) {
	instance.ids = [
		instance.ids[0] + instance.ids[2]++ + "-",
		0,
		0
	];
}
//#endregion
//#region packages/runtime-core/src/helpers/useTemplateRef.ts
const knownTemplateRefs = /* @__PURE__ */ new WeakSet();
function isTemplateRefKey(refs, key) {
	let desc;
	return !!((desc = Object.getOwnPropertyDescriptor(refs, key)) && !desc.configurable);
}
//#endregion
//#region packages/runtime-core/src/rendererTemplateRef.ts
const pendingSetRefMap = /* @__PURE__ */ new WeakMap();
/**
* Function for handling a template ref
*/
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
	if (isArray(rawRef)) {
		rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
		return;
	}
	if (isAsyncWrapper(vnode) && !isUnmount) {
		if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
		return;
	}
	const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
	const value = isUnmount ? null : refValue;
	const { i: owner, r: ref } = rawRef;
	if (!owner) {
		warn$1("Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.");
		return;
	}
	const oldRef = oldRawRef && oldRawRef.r;
	const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
	const setupState = owner.setupState;
	const canSetSetupRef = createCanSetSetupRefChecker(setupState, refs);
	const canSetRef = (ref, key) => {
		if (knownTemplateRefs.has(ref)) return false;
		if (key && isTemplateRefKey(refs, key)) return false;
		return true;
	};
	if (oldRef != null && oldRef !== ref) {
		invalidatePendingSetRef(oldRawRef);
		if (isString(oldRef)) {
			refs[oldRef] = null;
			if (canSetSetupRef(oldRef)) setupState[oldRef] = null;
		} else if (/* @__PURE__ */ isRef(oldRef)) {
			const oldRawRefAtom = oldRawRef;
			if (canSetRef(oldRef, oldRawRefAtom.k)) oldRef.value = null;
			if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
		}
	}
	if (isFunction(ref)) callWithErrorHandling(ref, owner, 12, [value, refs]);
	else {
		const _isString = isString(ref);
		const _isRef = /* @__PURE__ */ isRef(ref);
		if (_isString || _isRef) {
			const doSet = () => {
				if (rawRef.f) {
					const existing = _isString ? canSetSetupRef(ref) ? setupState[ref] : refs[ref] : canSetRef(ref) || !rawRef.k ? ref.value : refs[rawRef.k];
					if (isUnmount) isArray(existing) && remove(existing, refValue);
					else if (!isArray(existing)) {
						if (_isString) {
							refs[ref] = [refValue];
							if (canSetSetupRef(ref)) setupState[ref] = refs[ref];
						} else {
							const newVal = [refValue];
							if (canSetRef(ref, rawRef.k)) ref.value = newVal;
							if (rawRef.k) refs[rawRef.k] = newVal;
						}
					} else if (!existing.includes(refValue)) existing.push(refValue);
				} else if (_isString) {
					refs[ref] = value;
					if (canSetSetupRef(ref)) setupState[ref] = value;
				} else if (_isRef) {
					if (canSetRef(ref, rawRef.k)) ref.value = value;
					if (rawRef.k) refs[rawRef.k] = value;
				} else warn$1("Invalid template ref type:", ref, `(${typeof ref})`);
			};
			if (value) {
				const job = () => {
					doSet();
					pendingSetRefMap.delete(rawRef);
				};
				pendingSetRefMap.set(rawRef, job);
				queuePostRenderEffect(job, -1, parentSuspense);
			} else {
				invalidatePendingSetRef(rawRef);
				doSet();
			}
		} else warn$1("Invalid template ref type:", ref, `(${typeof ref})`);
	}
}
function createCanSetSetupRefChecker(setupState, refs) {
	const rawSetupState = /* @__PURE__ */ toRaw(setupState);
	return setupState === void 0 || setupState === EMPTY_OBJ ? NO : (key) => {
		if (hasOwn(rawSetupState, key) && !/* @__PURE__ */ isRef(rawSetupState[key])) warn$1(`Template ref "${key}" used on a non-ref value. It will not work in the production build.`);
		if (knownTemplateRefs.has(rawSetupState[key])) return false;
		if (isTemplateRefKey(refs, key)) return false;
		return hasOwn(rawSetupState, key);
	};
}
function invalidatePendingSetRef(rawRef) {
	const pendingSetRef = pendingSetRefMap.get(rawRef);
	if (pendingSetRef) {
		pendingSetRef.flags |= 4;
		pendingSetRefMap.delete(rawRef);
	}
}
//#endregion
//#region packages/runtime-core/src/apiAsyncComponent.ts
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
//#endregion
//#region packages/runtime-core/src/components/KeepAlive.ts
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
	registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
	registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = getCurrentGenericInstance()) {
	const wrappedHook = hook.__wdc || (hook.__wdc = () => {
		let current = target;
		while (current) {
			if (current.isDeactivated) return;
			current = current.parent;
		}
		return hook();
	});
	injectHook(type, wrappedHook, target);
	if (target) {
		let current = target.parent;
		while (current && current.parent) {
			let parent = current.parent;
			if (isKeepAlive(parent.vapor ? parent : parent.vnode)) injectToKeepAliveRoot(wrappedHook, type, target, current);
			current = current.parent;
		}
	}
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
	const injected = injectHook(type, hook, keepAliveRoot, true);
	onUnmounted(() => {
		remove(keepAliveRoot[type], injected);
	}, target);
}
function invokeKeepAliveHooks(hooks) {
	for (let i = 0; i < hooks.length; i++) {
		const hook = hooks[i];
		if (!hook.__called) {
			hook();
			hook.__called = true;
		}
	}
}
//#endregion
//#region packages/runtime-core/src/apiLifecycle.ts
function injectHook(type, hook, target = currentInstance, prepend = false) {
	if (target) {
		const hooks = target[type] || (target[type] = []);
		const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
			const prevSub = setActiveSub();
			const prev = setCurrentInstance(target);
			try {
				return callWithAsyncErrorHandling(hook, target, type, args);
			} finally {
				restoreCurrentInstance(prev);
				setActiveSub(prevSub);
			}
		});
		if (prepend) hooks.unshift(wrappedHook);
		else hooks.push(wrappedHook);
		return wrappedHook;
	} else warn$1(`${toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ""))} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
}
const createHook = /* @__NO_SIDE_EFFECTS__ */ (lifecycle) => (hook, target = currentInstance) => {
	if (!isInSSRComponentSetup || lifecycle === "sp") injectHook(lifecycle, (...args) => hook(...args), target);
};
const onBeforeMount = /* @__PURE__ */ createHook("bm");
const onMounted = /* @__PURE__ */ createHook("m");
const onBeforeUpdate = /* @__PURE__ */ createHook("bu");
const onUpdated = /* @__PURE__ */ createHook("u");
const onBeforeUnmount = /* @__PURE__ */ createHook("bum");
const onUnmounted = /* @__PURE__ */ createHook("um");
const onServerPrefetch = /* @__PURE__ */ createHook("sp");
const onRenderTriggered = /* @__PURE__ */ createHook("rtg");
const onRenderTracked = /* @__PURE__ */ createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
	injectHook("ec", hook, target);
}
//#endregion
//#region packages/runtime-core/src/helpers/resolveAssets.ts
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
//#endregion
//#region packages/runtime-core/src/helpers/renderSlot.ts
function ensureValidVNode$1(vnodes) {
	return vnodes.some((child) => {
		if (!isVNode$2(child)) return true;
		if (child.type === Comment) return false;
		if (child.type === Fragment && !ensureValidVNode$1(child.children)) return false;
		return true;
	}) ? vnodes : null;
}
//#endregion
//#region packages/runtime-core/src/componentPublicInstance.ts
/**
* #2437 In Vue 3, functional components do not have a public instance proxy but
* they exist in the internal parent chain. For code that relies on traversing
* public $parent chains, skip functional ones and go to the parent instead.
*/
const getPublicInstance = (i) => {
	if (!i || i.vapor) return null;
	if (isStatefulComponent(i)) return getComponentPublicInstance(i);
	return getPublicInstance(i.parent);
};
const resolveDevRootEl = (vnode) => {
	let found = false;
	while (true) {
		if (vnode.patchFlag > 0 && vnode.patchFlag & 2048) {
			const root = filterSingleRoot(vnode.children);
			if (!root) return;
			vnode = root;
			found = true;
			continue;
		}
		const component = vnode.component;
		if (component && component.subTree) {
			vnode = component.subTree;
			continue;
		}
		const suspense = vnode.suspense;
		if (suspense && suspense.activeBranch) {
			vnode = suspense.activeBranch;
			continue;
		}
		return found ? vnode.el : void 0;
	}
};
const getDevRootFragmentEl = (i) => {
	const el = i.subTree && resolveDevRootEl(i.subTree);
	return el === void 0 ? i.vnode.el : el;
};
let publicPropertiesMap;
const getPublicPropertiesMap = () => {
	if (!publicPropertiesMap) publicPropertiesMap = extend(Object.create(null), {
		$: (i) => i,
		$el: (i) => getDevRootFragmentEl(i),
		$data: (i) => i.data,
		$props: (i) => /* @__PURE__ */ shallowReadonly(i.props),
		$attrs: (i) => /* @__PURE__ */ shallowReadonly(i.attrs),
		$slots: (i) => /* @__PURE__ */ shallowReadonly(i.slots),
		$refs: (i) => /* @__PURE__ */ shallowReadonly(i.refs),
		$parent: (i) => getPublicInstance(i.parent),
		$root: (i) => getPublicInstance(i.root),
		$host: (i) => i.ce,
		$emit: (i) => i.emit,
		$options: (i) => resolveMergedOptions(i),
		$forceUpdate: (i) => i.f || (i.f = () => {
			queueJob(i.update);
		}),
		$nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
		$watch: (i) => instanceWatch.bind(i)
	});
	return publicPropertiesMap;
};
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
	get({ _: instance }, key) {
		if (key === "__v_skip") return true;
		const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
		if (key === "__isVue") return true;
		if (key[0] !== "$") {
			const n = accessCache[key];
			if (n !== void 0) switch (n) {
				case 1: return setupState[key];
				case 2: return data[key];
				case 4: return ctx[key];
				case 3: return props[key];
			}
			else if (hasSetupBinding(setupState, key)) {
				accessCache[key] = 1;
				return setupState[key];
			} else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
				accessCache[key] = 2;
				return data[key];
			} else if (hasOwn(props, key)) {
				accessCache[key] = 3;
				return props[key];
			} else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
				accessCache[key] = 4;
				return ctx[key];
			} else if (shouldCacheAccess) accessCache[key] = 0;
		}
		const publicGetter = getPublicPropertiesMap()[key];
		let cssModule, globalProperties;
		if (publicGetter) {
			if (key === "$attrs") {
				track(instance.attrs, "get", "");
				markAttrsAccessed();
			} else if (key === "$slots") track(instance, "get", key);
			return publicGetter(instance);
		} else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) return cssModule;
		else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
			accessCache[key] = 4;
			return ctx[key];
		} else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) return globalProperties[key];
		else if (currentRenderingInstance && (!isString(key) || key.indexOf("__v") !== 0)) {
			if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) warn$1(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
			else if (instance === currentRenderingInstance) warn$1(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
		}
	},
	set({ _: instance }, key, value) {
		const { data, setupState, ctx } = instance;
		if (hasSetupBinding(setupState, key)) {
			setupState[key] = value;
			return true;
		} else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
			warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
			return false;
		} else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
			data[key] = value;
			return true;
		} else if (hasOwn(instance.props, key)) {
			warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
			return false;
		}
		if (key[0] === "$" && key.slice(1) in instance) {
			warn$1(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`);
			return false;
		} else if (key in instance.appContext.config.globalProperties) Object.defineProperty(ctx, key, {
			enumerable: true,
			configurable: true,
			value
		});
		else ctx[key] = value;
		return true;
	},
	has({ _: { data, setupState, accessCache, ctx, appContext, props, type } }, key) {
		let cssModules;
		return !!(accessCache[key] || data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || hasOwn(props, key) || hasOwn(ctx, key) || hasOwn(getPublicPropertiesMap(), key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
	},
	defineProperty(target, key, descriptor) {
		if (descriptor.get != null) target._.accessCache[key] = 0;
		else if (hasOwn(descriptor, "value")) this.set(target, key, descriptor.value, null);
		return Reflect.defineProperty(target, key, descriptor);
	}
};
PublicInstanceProxyHandlers.ownKeys = (target) => {
	warn$1("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.");
	return Reflect.ownKeys(target);
};
function createDevRenderContext(instance) {
	const target = {};
	Object.defineProperty(target, `_`, {
		configurable: true,
		enumerable: false,
		get: () => instance
	});
	Object.keys(getPublicPropertiesMap()).forEach((key) => {
		Object.defineProperty(target, key, {
			configurable: true,
			enumerable: false,
			get: () => getPublicPropertiesMap()[key](instance),
			set: NOOP
		});
	});
	return target;
}
function exposePropsOnRenderContext(instance) {
	const { ctx, propsOptions: [propsOptions] } = instance;
	if (propsOptions) Object.keys(propsOptions).forEach((key) => {
		Object.defineProperty(ctx, key, {
			enumerable: true,
			configurable: true,
			get: () => instance.props[key],
			set: NOOP
		});
	});
}
function exposeSetupStateOnRenderContext(instance) {
	const { ctx, setupState } = instance;
	Object.keys(/* @__PURE__ */ toRaw(setupState)).forEach((key) => {
		if (!setupState.__isScriptSetup) {
			if (isReservedPrefix(key[0])) {
				warn$1(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
				return;
			}
			Object.defineProperty(ctx, key, {
				enumerable: true,
				configurable: true,
				get: () => setupState[key],
				set: NOOP
			});
		}
	});
}
//#endregion
//#region packages/runtime-core/src/apiSetupHelpers.ts
/**
* @internal
*/
function normalizePropsOrEmits(props) {
	return isArray(props) ? props.reduce((normalized, p) => (normalized[p] = null, normalized), {}) : props;
}
//#endregion
//#region packages/runtime-core/src/componentOptions.ts
function createDuplicateChecker() {
	const cache = Object.create(null);
	return (type, key) => {
		if (cache[key]) warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
		else cache[key] = type;
	};
}
let shouldCacheAccess = true;
function applyOptions(instance) {
	const options = resolveMergedOptions(instance);
	const publicThis = instance.proxy;
	const ctx = instance.ctx;
	shouldCacheAccess = false;
	if (options.beforeCreate) callHook(options.beforeCreate, instance, "bc");
	const { data: dataOptions, computed: computedOptions, methods, watch: watchOptions, provide: provideOptions, inject: injectOptions, created, beforeMount, mounted, beforeUpdate, updated, activated, deactivated, beforeDestroy, beforeUnmount, destroyed, unmounted, render, renderTracked, renderTriggered, errorCaptured, serverPrefetch, expose, inheritAttrs, components, directives, filters } = options;
	const checkDuplicateProperties = createDuplicateChecker();
	{
		const [propsOptions] = instance.propsOptions;
		if (propsOptions) for (const key in propsOptions) checkDuplicateProperties("Props", key);
	}
	if (injectOptions) resolveInjections(injectOptions, ctx, checkDuplicateProperties);
	if (methods) for (const key in methods) {
		const methodHandler = methods[key];
		if (isFunction(methodHandler)) {
			Object.defineProperty(ctx, key, {
				value: methodHandler.bind(publicThis),
				configurable: true,
				enumerable: true,
				writable: true
			});
			checkDuplicateProperties("Methods", key);
		} else warn$1(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
	}
	if (dataOptions) {
		if (!isFunction(dataOptions)) warn$1("The data option must be a function. Plain object usage is no longer supported.");
		const data = dataOptions.call(publicThis, publicThis);
		if (isPromise(data)) warn$1("data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.");
		if (!isObject(data)) warn$1(`data() should return an object.`);
		else {
			instance.data = /* @__PURE__ */ reactive(data);
			for (const key in data) {
				checkDuplicateProperties("Data", key);
				if (!isReservedPrefix(key[0])) Object.defineProperty(ctx, key, {
					configurable: true,
					enumerable: true,
					get: () => data[key],
					set: NOOP
				});
			}
		}
	}
	shouldCacheAccess = true;
	if (computedOptions) for (const key in computedOptions) {
		const opt = computedOptions[key];
		const get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
		if (get === NOOP) warn$1(`Computed property "${key}" has no getter.`);
		const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
			warn$1(`Write operation failed: computed property "${key}" is readonly.`);
		};
		const c = computed({
			get,
			set
		});
		Object.defineProperty(ctx, key, {
			enumerable: true,
			configurable: true,
			get: () => c.value,
			set: (v) => c.value = v
		});
		checkDuplicateProperties("Computed", key);
	}
	if (watchOptions) for (const key in watchOptions) createWatcher(watchOptions[key], ctx, publicThis, key);
	if (provideOptions) {
		const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
		Reflect.ownKeys(provides).forEach((key) => {
			provide(key, provides[key]);
		});
	}
	if (created) callHook(created, instance, "c");
	function registerLifecycleHook(register, hook) {
		if (isArray(hook)) hook.forEach((_hook) => register(_hook.bind(publicThis)));
		else if (hook) register(hook.bind(publicThis));
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
			const exposed = instance.exposed || (instance.exposed = {});
			expose.forEach((key) => {
				Object.defineProperty(exposed, key, {
					get: () => publicThis[key],
					set: (val) => publicThis[key] = val,
					enumerable: true
				});
			});
		} else if (!instance.exposed) instance.exposed = {};
	}
	if (render && instance.render === NOOP) instance.render = render;
	if (inheritAttrs != null) instance.inheritAttrs = inheritAttrs;
	if (components) instance.components = components;
	if (directives) instance.directives = directives;
	if (serverPrefetch) markAsyncBoundary(instance);
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
	if (isArray(injectOptions)) injectOptions = normalizeInject(injectOptions);
	for (const key in injectOptions) {
		const opt = injectOptions[key];
		let injected;
		if (isObject(opt)) {
			if ("default" in opt) injected = inject(opt.from || key, opt.default, true);
			else injected = inject(opt.from || key);
		} else injected = inject(opt);
		if (/* @__PURE__ */ isRef(injected)) Object.defineProperty(ctx, key, {
			enumerable: true,
			configurable: true,
			get: () => injected.value,
			set: (v) => injected.value = v
		});
		else ctx[key] = injected;
		checkDuplicateProperties("Inject", key);
	}
}
function callHook(hook, instance, type) {
	callWithAsyncErrorHandling(isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
	let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
	if (isString(raw)) {
		const handler = ctx[raw];
		if (isFunction(handler)) watch(getter, handler);
		else warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
	} else if (isFunction(raw)) watch(getter, raw.bind(publicThis));
	else if (isObject(raw)) {
		if (isArray(raw)) raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
		else {
			const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
			if (isFunction(handler)) watch(getter, handler, raw);
			else warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
		}
	} else warn$1(`Invalid watch option: "${key}"`, raw);
}
/**
* Resolve merged options and cache it on the component.
* This is done only once per-component since the merging does not involve
* instances.
*/
function resolveMergedOptions(instance) {
	const base = instance.type;
	const { mixins, extends: extendsOptions } = base;
	const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
	const cached = cache.get(base);
	let resolved;
	if (cached) resolved = cached;
	else if (!globalMixins.length && !mixins && !extendsOptions) resolved = base;
	else {
		resolved = {};
		if (globalMixins.length) globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
		mergeOptions(resolved, base, optionMergeStrategies);
	}
	if (isObject(base)) cache.set(base, resolved);
	return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
	const { mixins, extends: extendsOptions } = from;
	if (extendsOptions) mergeOptions(to, extendsOptions, strats, true);
	if (mixins) mixins.forEach((m) => mergeOptions(to, m, strats, true));
	for (const key in from) if (asMixin && key === "expose") warn$1("\"expose\" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.");
	else {
		const strat = internalOptionMergeStrats[key] || strats && strats[key];
		to[key] = strat ? strat(to[key], from[key]) : from[key];
	}
	return to;
}
const internalOptionMergeStrats = {
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
		const res = {};
		for (let i = 0; i < raw.length; i++) res[raw[i]] = raw[i];
		return res;
	}
	return raw;
}
function mergeAsArray(to, from) {
	return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
	return to ? extend(Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
	if (to) {
		if (isArray(to) && isArray(from)) return [.../* @__PURE__ */ new Set([...to, ...from])];
		return extend(Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(from !== null && from !== void 0 ? from : {}));
	} else return from;
}
function mergeWatchOptions(to, from) {
	if (!to) return from;
	if (!from) return to;
	const merged = extend(Object.create(null), to);
	for (const key in from) merged[key] = mergeAsArray(to[key], from[key]);
	return merged;
}
//#endregion
//#region packages/runtime-core/src/apiCreateApp.ts
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
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
let uid$1 = 0;
/**
* @internal
*/
function createAppAPI(mount, unmount, getPublicInstance, render) {
	return function createApp(rootComponent, rootProps = null) {
		if (!isFunction(rootComponent)) rootComponent = extend({}, rootComponent);
		if (rootProps != null && !isObject(rootProps)) {
			warn$1(`root props passed to app.mount() must be an object.`);
			rootProps = null;
		}
		const context = createAppContext();
		const installedPlugins = /* @__PURE__ */ new WeakSet();
		const pluginCleanupFns = [];
		let isMounted = false;
		const app = context.app = {
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
				warn$1(`app.config cannot be replaced. Modify individual options instead.`);
			},
			use(plugin, ...options) {
				if (installedPlugins.has(plugin)) warn$1(`Plugin has already been applied to target app.`);
				else if (plugin && isFunction(plugin.install)) {
					installedPlugins.add(plugin);
					plugin.install(app, ...options);
				} else if (isFunction(plugin)) {
					installedPlugins.add(plugin);
					plugin(app, ...options);
				} else warn$1("A plugin must either be a function or an object with an \"install\" function.");
				return app;
			},
			mixin(mixin) {
				if (!context.mixins.includes(mixin)) context.mixins.push(mixin);
				else warn$1("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
				return app;
			},
			component(name, component) {
				validateComponentName(name, context.config);
				if (!component) return context.components[name];
				if (context.components[name]) warn$1(`Component "${name}" has already been registered in target app.`);
				context.components[name] = component;
				return app;
			},
			directive(name, directive) {
				validateDirectiveName(name);
				if (!directive) return context.directives[name];
				if (context.directives[name]) warn$1(`Directive "${name}" has already been registered in target app.`);
				context.directives[name] = directive;
				return app;
			},
			mount(rootContainer, isHydrate, namespace) {
				if (!isMounted) {
					if (rootContainer.__vue_app__) warn$1("There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first.");
					const instance = mount(app, rootContainer, isHydrate, namespace);
					app._instance = instance;
					devtoolsInitApp(app, version);
					isMounted = true;
					app._container = rootContainer;
					rootContainer.__vue_app__ = app;
					return getPublicInstance(instance);
				} else warn$1("App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`");
			},
			onUnmount(cleanupFn) {
				if (typeof cleanupFn !== "function") warn$1(`Expected function as first argument to app.onUnmount(), but got ${typeof cleanupFn}`);
				pluginCleanupFns.push(cleanupFn);
			},
			unmount() {
				if (isMounted) {
					callWithAsyncErrorHandling(pluginCleanupFns, app._instance, 16);
					unmount(app);
					app._instance = null;
					devtoolsUnmountApp(app);
					delete app._container.__vue_app__;
				} else warn$1(`Cannot unmount an app that is not mounted.`);
			},
			provide(key, value) {
				if (key in context.provides) {
					if (hasOwn(context.provides, key)) warn$1(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
					else warn$1(`App already provides property with key "${String(key)}" inherited from its parent element. It will be overwritten with the new value.`);
				}
				context.provides[key] = value;
				return app;
			},
			runWithContext(fn) {
				const lastApp = currentApp;
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
/**
* @internal Used to identify the current app when using `inject()` within
* `app.runWithContext()`.
*/
let currentApp = null;
//#endregion
//#region packages/runtime-core/src/helpers/useModel.ts
const getModelModifiers = (props, modelName, getter) => {
	return getter(props, getModifierPropName(modelName)) || getter(props, `${camelize(modelName)}Modifiers`) || getter(props, `${hyphenate(modelName)}Modifiers`);
};
//#endregion
//#region packages/runtime-core/src/componentEmits.ts
function emit(instance, event, ...rawArgs) {
	return baseEmit(instance, instance.vnode.props || EMPTY_OBJ, defaultPropGetter, event, ...rawArgs);
}
/**
* @internal for vapor only
*/
function baseEmit(instance, props, getter, event, ...rawArgs) {
	if (instance.isUnmounted) return;
	{
		const { emitsOptions, propsOptions } = instance;
		if (emitsOptions) {
			if (!(event in emitsOptions) && true) {
				if (!propsOptions || !propsOptions[0] || !(toHandlerKey(camelize(event)) in propsOptions[0])) warn$1(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(camelize(event))}" prop.`);
			} else {
				const validator = emitsOptions[event];
				if (isFunction(validator)) {
					if (!validator(...rawArgs)) warn$1(`Invalid event arguments: event validation failed for event "${event}".`);
				}
			}
		}
	}
	let args = rawArgs;
	const isModelListener = event.startsWith("update:");
	const modifiers = isModelListener && getModelModifiers(props, event.slice(7), getter);
	if (modifiers) {
		if (modifiers.trim) args = rawArgs.map((a) => isString(a) ? a.trim() : a);
		if (modifiers.number) args = args.map(looseToNumber);
	}
	devtoolsComponentEmit(instance, event, args);
	{
		const lowerCaseEvent = event.toLowerCase();
		if (lowerCaseEvent !== event && getter(props, toHandlerKey(lowerCaseEvent))) warn$1(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
	}
	let handlerName;
	let handler = getter(props, handlerName = toHandlerKey(event)) || getter(props, handlerName = toHandlerKey(camelize(event)));
	if (!handler && isModelListener) handler = getter(props, handlerName = toHandlerKey(hyphenate(event)));
	if (handler) callWithAsyncErrorHandling(handler, instance, 6, args);
	const onceHandler = getter(props, handlerName + `Once`);
	if (onceHandler) {
		if (!instance.emitted) instance.emitted = {};
		else if (instance.emitted[handlerName]) return;
		instance.emitted[handlerName] = true;
		callWithAsyncErrorHandling(onceHandler, instance, 6, args);
	}
}
function defaultPropGetter(props, key) {
	return props[key];
}
const mixinEmitsCache = /* @__PURE__ */ new WeakMap();
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
	const cache = asMixin ? mixinEmitsCache : appContext.emitsCache;
	const cached = cache.get(comp);
	if (cached !== void 0) return cached;
	const raw = comp.emits;
	let normalized = {};
	let hasExtends = false;
	if (!isFunction(comp)) {
		const extendEmits = (raw) => {
			const normalizedFromExtend = normalizeEmitsOptions(raw, appContext, true);
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
		if (isObject(comp)) cache.set(comp, null);
		return null;
	}
	if (isArray(raw)) raw.forEach((key) => normalized[key] = null);
	else extend(normalized, raw);
	if (isObject(comp)) cache.set(comp, normalized);
	return normalized;
}
/**
* Check if an incoming prop key is a declared emit event listener.
* e.g. With `emits: { click: null }`, props named `onClick` and `onclick` are
* both considered matched listeners.
*
* @internal for vapor only
*/
function isEmitListener(options, key) {
	if (!options || !isOn(key)) return false;
	key = key.slice(2);
	key = key === "Once" ? key : key.replace(/Once$/, "");
	return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
//#endregion
//#region packages/runtime-core/src/componentRenderUtils.ts
/**
* dev only flag to track whether $attrs was used during render.
* If $attrs was used during render then the warning for failed attrs
* fallthrough can be suppressed.
*/
let accessedAttrs = false;
function markAttrsAccessed() {
	accessedAttrs = true;
}
function renderComponentRoot$1(instance) {
	const { type: Component, vnode, proxy, withProxy, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, props, data, setupState, ctx, inheritAttrs } = instance;
	const prev = setCurrentRenderingInstance$1(instance);
	let result;
	let fallthroughAttrs;
	accessedAttrs = false;
	try {
		if (vnode.shapeFlag & 4) {
			const proxyToUse = withProxy || proxy;
			const thisProxy = setupState.__isScriptSetup ? new Proxy(proxyToUse, { get(target, key, receiver) {
				warn$1(`Property '${String(key)}' was accessed via 'this'. Avoid using 'this' in templates.`);
				return Reflect.get(target, key, receiver);
			} }) : proxyToUse;
			result = normalizeVNode$1(render.call(thisProxy, proxyToUse, renderCache, /* @__PURE__ */ shallowReadonly(props), setupState, data, ctx));
			fallthroughAttrs = attrs;
		} else {
			const render = Component;
			if (attrs === props) markAttrsAccessed();
			result = normalizeVNode$1(render.length > 1 ? render(/* @__PURE__ */ shallowReadonly(props), {
				get attrs() {
					markAttrsAccessed();
					return /* @__PURE__ */ shallowReadonly(attrs);
				},
				slots,
				emit
			}) : render(/* @__PURE__ */ shallowReadonly(props), null));
			fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
		}
	} catch (err) {
		blockStack.length = 0;
		handleError(err, instance, 1);
		result = createVNode(Comment);
	}
	let root = result;
	let setRoot = void 0;
	if (result.patchFlag > 0 && result.patchFlag & 2048) [root, setRoot] = getChildRoot(result);
	if (fallthroughAttrs && inheritAttrs !== false) {
		const keys = Object.keys(fallthroughAttrs);
		const { shapeFlag } = root;
		if (keys.length) {
			if (shapeFlag & 7) {
				if (propsOptions && keys.some(isModelListener)) fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
				root = cloneVNode(root, fallthroughAttrs, false, true);
			} else if (!accessedAttrs && root.type !== Comment) warnExtraneousAttributes(attrs);
		}
	}
	if (vnode.dirs) {
		if (!isElementRoot(root)) warn$1("Runtime directive used on component with non-element root node. The directives will not function as intended.");
		root = cloneVNode(root, null, false, true);
		root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
	}
	if (vnode.transition) {
		const child = isTeleport(root.type) ? getInnerChild(root) || root : root;
		if (!isElementRoot(child)) warn$1("Component inside <Transition> renders non-element root node that cannot be animated.");
		setTransitionHooks(child, vnode.transition);
	}
	if (setRoot) setRoot(root);
	else result = root;
	setCurrentRenderingInstance$1(prev);
	return result;
}
/**
* dev only
* In dev mode, template root level comments are rendered, which turns the
* template into a fragment root, but we need to locate the single element
* root for attrs and scope id processing.
*/
const getChildRoot = (vnode) => {
	const rawChildren = vnode.children;
	const dynamicChildren = vnode.dynamicChildren;
	const childRoot = filterSingleRoot(rawChildren, false);
	if (!childRoot) return [vnode, void 0];
	else if (childRoot.patchFlag > 0 && childRoot.patchFlag & 2048) return getChildRoot(childRoot);
	const index = rawChildren.indexOf(childRoot);
	const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
	const setRoot = (updatedRoot) => {
		rawChildren[index] = updatedRoot;
		if (dynamicChildren) {
			if (dynamicIndex > -1) dynamicChildren[dynamicIndex] = updatedRoot;
			else if (updatedRoot.patchFlag > 0) vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
		}
	};
	return [normalizeVNode$1(childRoot), setRoot];
};
/**
* Dev only
*/
function warnExtraneousAttributes(attrs) {
	const allAttrs = Object.keys(attrs);
	const eventAttrs = [];
	const extraAttrs = [];
	for (let i = 0, l = allAttrs.length; i < l; i++) {
		const key = allAttrs[i];
		if (isOn(key)) {
			if (!isModelListener(key)) eventAttrs.push(key[2].toLowerCase() + key.slice(3));
		} else extraAttrs.push(key);
	}
	if (extraAttrs.length) warn$1(`Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`);
	if (eventAttrs.length) warn$1(`Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
}
function filterSingleRoot(children, recurse = true) {
	let singleRoot;
	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		if (isVNode$2(child)) {
			if (child.type !== Comment || child.children === "v-if") {
				if (singleRoot) return;
				else {
					singleRoot = child;
					if (recurse && singleRoot.patchFlag > 0 && singleRoot.patchFlag & 2048) return filterSingleRoot(singleRoot.children);
				}
			}
		} else return;
	}
	return singleRoot;
}
const isFunctionalFallthroughKey = (key) => key === "class" || key === "style" || isOn(key);
const getFunctionalFallthrough = (attrs) => {
	let res;
	for (const key in attrs) if (isFunctionalFallthroughKey(key)) (res || (res = {}))[key] = attrs[key];
	return res;
};
const filterModelListeners = (attrs, props) => {
	const res = {};
	for (const key in attrs) if (!isModelListener(key) || !(key.slice(9) in props)) res[key] = attrs[key];
	return res;
};
const isElementRoot = (vnode) => {
	return vnode.shapeFlag & 7 || vnode.type === Comment;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
	const { props: prevProps, children: prevChildren, component } = prevVNode;
	const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
	const emits = component.emitsOptions;
	if ((prevChildren || nextChildren) && isHmrUpdating) return true;
	if (nextVNode.dirs || nextVNode.transition) return true;
	if (optimized && patchFlag >= 0) {
		if (patchFlag & 1024) return true;
		if (patchFlag & 16) {
			if (!prevProps) return !!nextProps;
			return hasPropsChanged(prevProps, nextProps, emits);
		} else if (patchFlag & 8) {
			const dynamicProps = nextVNode.dynamicProps;
			for (let i = 0; i < dynamicProps.length; i++) {
				const key = dynamicProps[i];
				if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emits, key)) return true;
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
	const nextKeys = Object.keys(nextProps);
	if (nextKeys.length !== Object.keys(prevProps).length) return true;
	for (let i = 0; i < nextKeys.length; i++) {
		const key = nextKeys[i];
		if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emitsOptions, key)) return true;
	}
	return false;
}
function hasPropValueChanged(nextProps, prevProps, key) {
	const nextProp = nextProps[key];
	const prevProp = prevProps[key];
	if (key === "style" && isObject(nextProp) && isObject(prevProp)) return !looseEqual(nextProp, prevProp);
	return nextProp !== prevProp;
}
function updateHOCHostEl({ vnode, parent, suspense }, el) {
	while (parent && !parent.vapor) {
		const root = parent.subTree;
		if (root.suspense && root.suspense.activeBranch === vnode) {
			root.suspense.vnode.el = root.el = el;
			vnode = root;
		}
		if (root === vnode) {
			(vnode = parent.vnode).el = el;
			parent = parent.parent;
		} else break;
	}
	if (suspense && suspense.activeBranch === vnode) suspense.vnode.el = el;
}
//#endregion
//#region packages/runtime-core/src/internalObject.ts
/**
* Used during vnode props/slots normalization to check if the vnode props/slots
* are the internal attrs / slots object of a component via
* `Object.getPrototypeOf`. This is more performant than defining a
* non-enumerable property. (one of the optimizations done for ssr-benchmark)
*/
const internalObjectProto = {};
const createInternalObject = () => Object.create(internalObjectProto);
const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
//#endregion
//#region packages/runtime-core/src/componentProps.ts
function initProps(instance, rawProps, isStateful, isSSR = false) {
	const props = instance.props = {};
	const attrs = createInternalObject();
	instance.propsDefaults = Object.create(null);
	setFullProps(instance, rawProps, props, attrs);
	for (const key in instance.propsOptions[0]) if (!(key in props)) props[key] = void 0;
	validateProps(rawProps || {}, props, instance.propsOptions[0]);
	if (isStateful) instance.props = isSSR ? props : /* @__PURE__ */ shallowReactive(props);
	else if (!instance.type.props) instance.props = attrs;
	else instance.props = props;
	instance.attrs = attrs;
}
function isInHmrContext(instance) {
	while (instance) {
		if (instance.type.__hmrId) return true;
		instance = instance.parent;
	}
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
	const { props, attrs, vnode: { patchFlag } } = instance;
	const rawCurrentProps = /* @__PURE__ */ toRaw(props);
	const [options] = instance.propsOptions;
	let hasAttrsChanged = false;
	if (!isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
		if (patchFlag & 8) {
			const propsToUpdate = instance.vnode.dynamicProps;
			for (let i = 0; i < propsToUpdate.length; i++) {
				let key = propsToUpdate[i];
				if (isEmitListener(instance.emitsOptions, key)) continue;
				const value = rawProps[key];
				if (options) {
					if (hasOwn(attrs, key)) {
						if (value !== attrs[key]) {
							attrs[key] = value;
							hasAttrsChanged = true;
						}
					} else {
						const camelizedKey = camelize(key);
						props[camelizedKey] = resolvePropValue(options, camelizedKey, value, instance, baseResolveDefault);
					}
				} else if (value !== attrs[key]) {
					attrs[key] = value;
					hasAttrsChanged = true;
				}
			}
		}
	} else {
		if (setFullProps(instance, rawProps, props, attrs)) hasAttrsChanged = true;
		let kebabKey;
		for (const key in rawCurrentProps) if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
			if (options) {
				if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) props[key] = resolvePropValue(options, key, void 0, instance, baseResolveDefault, true);
			} else delete props[key];
		}
		if (attrs !== rawCurrentProps) {
			for (const key in attrs) if (!rawProps || !hasOwn(rawProps, key) && true) {
				delete attrs[key];
				hasAttrsChanged = true;
			}
		}
	}
	if (hasAttrsChanged) trigger(instance.attrs, "set", "");
	validateProps(rawProps || {}, props, instance.propsOptions[0]);
}
function setFullProps(instance, rawProps, props, attrs) {
	const [options, needCastKeys] = instance.propsOptions;
	let hasAttrsChanged = false;
	let rawCastValues;
	if (rawProps) for (let key in rawProps) {
		if (isReservedProp(key)) continue;
		const value = rawProps[key];
		let camelKey;
		if (options && hasOwn(options, camelKey = camelize(key))) {
			if (!needCastKeys || !needCastKeys.includes(camelKey)) props[camelKey] = value;
			else (rawCastValues || (rawCastValues = {}))[camelKey] = value;
		} else if (!isEmitListener(instance.emitsOptions, key)) {
			if (!(key in attrs) || value !== attrs[key]) {
				attrs[key] = value;
				hasAttrsChanged = true;
			}
		}
	}
	if (needCastKeys) {
		const castValues = rawCastValues || EMPTY_OBJ;
		for (let i = 0; i < needCastKeys.length; i++) {
			const key = needCastKeys[i];
			props[key] = resolvePropValue(options, key, castValues[key], instance, baseResolveDefault, !hasOwn(castValues, key));
		}
	}
	return hasAttrsChanged;
}
/**
* @internal for runtime-vapor
*/
function resolvePropValue(options, key, value, instance, resolveDefault, isAbsent = false) {
	const opt = options[key];
	if (opt != null) {
		const hasDefault = hasOwn(opt, "default");
		if (hasDefault && value === void 0) {
			const defaultValue = opt.default;
			if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
				const cachedDefaults = instance.propsDefaults || (instance.propsDefaults = {});
				if (hasOwn(cachedDefaults, key)) value = cachedDefaults[key];
				else value = cachedDefaults[key] = resolveDefault(defaultValue, instance, key);
			} else value = defaultValue;
			if (instance.ce) instance.ce._setProp(key, value);
		}
		if (opt[0]) {
			if (isAbsent && !hasDefault) value = false;
			else if (opt[1] && (value === "" || value === hyphenate(key))) value = true;
		}
	}
	return value;
}
/**
* runtime-dom-specific default resolving logic
*/
function baseResolveDefault(factory, instance, key) {
	let value;
	const prev = setCurrentInstance(instance);
	const props = /* @__PURE__ */ toRaw(instance.props);
	value = factory.call(null, props);
	restoreCurrentInstance(prev);
	return value;
}
const mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin = false) {
	const cache = asMixin ? mixinPropsCache : appContext.propsCache;
	const cached = cache.get(comp);
	if (cached) return cached;
	const raw = comp.props;
	const normalized = {};
	const needCastKeys = [];
	let hasExtends = false;
	if (!isFunction(comp)) {
		const extendProps = (raw) => {
			hasExtends = true;
			const [props, keys] = normalizePropsOptions(raw, appContext, true);
			extend(normalized, props);
			if (keys) needCastKeys.push(...keys);
		};
		if (!asMixin && appContext.mixins.length) appContext.mixins.forEach(extendProps);
		if (comp.extends) extendProps(comp.extends);
		if (comp.mixins) comp.mixins.forEach(extendProps);
	}
	if (!raw && !hasExtends) {
		if (isObject(comp)) cache.set(comp, EMPTY_ARR);
		return EMPTY_ARR;
	}
	baseNormalizePropsOptions(raw, normalized, needCastKeys);
	const res = [normalized, needCastKeys];
	if (isObject(comp)) cache.set(comp, res);
	return res;
}
/**
* @internal for runtime-vapor only
*/
function baseNormalizePropsOptions(raw, normalized, needCastKeys) {
	if (isArray(raw)) for (let i = 0; i < raw.length; i++) {
		if (!isString(raw[i])) warn$1(`props must be strings when using array syntax.`, raw[i]);
		const normalizedKey = camelize(raw[i]);
		if (validatePropName(normalizedKey)) normalized[normalizedKey] = EMPTY_OBJ;
	}
	else if (raw) {
		if (!isObject(raw)) warn$1(`invalid props options`, raw);
		for (const key in raw) {
			const normalizedKey = camelize(key);
			if (validatePropName(normalizedKey)) {
				const opt = raw[key];
				const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
				const propType = prop.type;
				let shouldCast = false;
				let shouldCastTrue = true;
				if (isArray(propType)) for (let index = 0; index < propType.length; ++index) {
					const type = propType[index];
					const typeName = isFunction(type) && type.name;
					if (typeName === "Boolean") {
						shouldCast = true;
						break;
					} else if (typeName === "String") shouldCastTrue = false;
				}
				else shouldCast = isFunction(propType) && propType.name === "Boolean";
				prop[0] = shouldCast;
				prop[1] = shouldCastTrue;
				if (shouldCast || hasOwn(prop, "default")) needCastKeys.push(normalizedKey);
			}
		}
	}
}
function validatePropName(key) {
	if (key[0] !== "$" && !isReservedProp(key)) return true;
	else warn$1(`Invalid prop name: "${key}" is a reserved property.`);
	return false;
}
function getType(ctor) {
	if (ctor === null) return "null";
	if (typeof ctor === "function") return ctor.name || "";
	else if (typeof ctor === "object") return ctor.constructor && ctor.constructor.name || "";
	return "";
}
/**
* dev only
* @internal
*/
function validateProps(rawProps, resolvedProps, options) {
	resolvedProps = /* @__PURE__ */ toRaw(resolvedProps);
	const camelizePropsKey = Object.keys(rawProps).map((key) => camelize(key));
	for (const key in options) {
		const opt = options[key];
		if (opt != null) validateProp(key, resolvedProps[key], opt, resolvedProps, !camelizePropsKey.includes(key));
	}
}
/**
* dev only
*/
function validateProp(key, value, propOptions, resolvedProps, isAbsent) {
	const { type, required, validator, skipCheck } = propOptions;
	if (required && isAbsent) {
		warn$1("Missing required prop: \"" + key + "\"");
		return;
	}
	if (value == null && !required) return;
	if (type != null && type !== true && !skipCheck) {
		let isValid = false;
		const types = isArray(type) ? type : [type];
		const expectedTypes = [];
		for (let i = 0; i < types.length && !isValid; i++) {
			const { valid, expectedType } = assertType(value, types[i]);
			expectedTypes.push(expectedType || "");
			isValid = valid;
		}
		if (!isValid) {
			warn$1(getInvalidTypeMessage(key, value, expectedTypes));
			return;
		}
	}
	if (validator && !validator(value, /* @__PURE__ */ shallowReadonly(resolvedProps))) warn$1("Invalid prop: custom validator check failed for prop \"" + key + "\".");
}
const isSimpleType = /*@__PURE__*/ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
/**
* dev only
*/
function assertType(value, type) {
	let valid;
	const expectedType = getType(type);
	if (expectedType === "null") valid = value === null;
	else if (isSimpleType(expectedType)) {
		const t = typeof value;
		valid = t === expectedType.toLowerCase();
		if (!valid && t === "object") valid = value instanceof type;
	} else if (expectedType === "Object") valid = isObject(value);
	else if (expectedType === "Array") valid = isArray(value);
	else valid = value instanceof type;
	return {
		valid,
		expectedType
	};
}
/**
* dev only
*/
function getInvalidTypeMessage(name, value, expectedTypes) {
	if (expectedTypes.length === 0) return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
	let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
	const expectedType = expectedTypes[0];
	const receivedType = toRawType(value);
	const expectedValue = styleValue(value, expectedType);
	const receivedValue = styleValue(value, receivedType);
	if (expectedTypes.length === 1 && isExplicable(expectedType) && isCoercible(expectedType, receivedType)) message += ` with value ${expectedValue}`;
	message += `, got ${receivedType} `;
	if (isExplicable(receivedType)) message += `with value ${receivedValue}.`;
	return message;
}
/**
* dev only
*/
function styleValue(value, type) {
	if (isSymbol(value)) return value.toString();
	else if (type === "String") return `"${value}"`;
	else if (type === "Number") return `${Number(value)}`;
	else return `${value}`;
}
/**
* dev only
*/
function isExplicable(type) {
	return [
		"string",
		"number",
		"boolean"
	].some((elem) => type.toLowerCase() === elem);
}
/**
* dev only
*/
function isCoercible(...args) {
	return args.every((elem) => {
		const value = elem.toLowerCase();
		return value !== "boolean" && value !== "symbol";
	});
}
//#endregion
//#region packages/runtime-core/src/componentSlots.ts
const isInternalKey = (key) => key === "_" || key === "_ctx" || key === "$stable";
const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode$1) : [normalizeVNode$1(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
	if (rawSlot._n) return rawSlot;
	const normalized = withCtx((...args) => {
		if (currentInstance && !currentInstance.vapor && !(ctx === null && currentRenderingInstance) && !(ctx && ctx.root !== currentInstance.root)) warn$1(`Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`);
		return normalizeSlotValue(rawSlot(...args));
	}, ctx);
	normalized._c = false;
	return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
	const ctx = rawSlots._ctx;
	for (const key in rawSlots) {
		if (isInternalKey(key)) continue;
		const value = rawSlots[key];
		if (isFunction(value)) slots[key] = normalizeSlot(key, value, ctx);
		else if (value != null) {
			warn$1(`Non-function value encountered for slot "${key}". Prefer function slots for better performance.`);
			const normalized = normalizeSlotValue(value);
			slots[key] = () => normalized;
		}
	}
};
const normalizeVNodeSlots = (instance, children) => {
	if (!isKeepAlive(instance.vnode) && true) warn$1("Non-function value encountered for default slot. Prefer function slots for better performance.");
	const normalized = normalizeSlotValue(children);
	instance.slots.default = () => normalized;
};
const assignSlots = (slots, children, optimized) => {
	for (const key in children) if (optimized || !isInternalKey(key)) slots[key] = children[key];
};
const initSlots = (instance, children, optimized) => {
	const slots = instance.slots = createInternalObject();
	if (instance.vnode.shapeFlag & 32) {
		const type = children._;
		if (type) {
			assignSlots(slots, children, optimized);
			if (optimized) def(slots, "_", type, true);
		} else normalizeObjectSlots(children, slots, instance);
	} else if (children) normalizeVNodeSlots(instance, children);
};
const updateSlots = (instance, children, optimized) => {
	const { vnode, slots } = instance;
	let needDeletionCheck = true;
	let deletionComparisonTarget = EMPTY_OBJ;
	if (vnode.shapeFlag & 32) {
		const type = children._;
		if (type) {
			if (isHmrUpdating) {
				assignSlots(slots, children, optimized);
				trigger(instance, "set", "$slots");
			} else if (optimized && type === 1) needDeletionCheck = false;
			else assignSlots(slots, children, optimized);
		} else {
			needDeletionCheck = !children.$stable;
			normalizeObjectSlots(children, slots, instance);
		}
		deletionComparisonTarget = children;
	} else if (children) {
		normalizeVNodeSlots(instance, children);
		deletionComparisonTarget = { default: 1 };
	}
	if (needDeletionCheck) {
		for (const key in slots) if (!isInternalKey(key) && deletionComparisonTarget[key] == null) delete slots[key];
	}
};
//#endregion
//#region packages/runtime-core/src/profiling.ts
let supported;
let perf;
let cachedNow$1 = 0;
const p$1 = /*@__PURE__*/ Promise.resolve();
const getNow$1 = () => cachedNow$1 || (p$1.then(() => cachedNow$1 = 0), cachedNow$1 = isSupported() ? perf.now() : Date.now());
/**
* @internal
*/
function startMeasure(instance, type) {
	if (instance.appContext.config.performance && isSupported()) perf.mark(`vue-${type}-${instance.uid}`);
	devtoolsPerfStart(instance, type, getNow$1());
}
/**
* @internal
*/
function endMeasure(instance, type) {
	if (instance.appContext.config.performance && isSupported()) {
		const startTag = `vue-${type}-${instance.uid}`;
		const endTag = startTag + `:end`;
		const measureName = `<${formatComponentName(instance, instance.type)}> ${type}`;
		perf.mark(endTag);
		perf.measure(measureName, startTag, endTag);
		perf.clearMeasures(measureName);
		perf.clearMarks(startTag);
		perf.clearMarks(endTag);
	}
	devtoolsPerfEnd(instance, type, getNow$1());
}
function isSupported() {
	if (supported !== void 0) return supported;
	if (typeof window !== "undefined" && window.performance) {
		supported = true;
		perf = window.performance;
	} else supported = false;
	return supported;
}
//#endregion
//#region packages/runtime-core/src/renderer.ts
const queuePostRenderEffect = queueEffectWithSuspense;
/**
* The createRenderer function accepts two generic arguments:
* HostNode and HostElement, corresponding to Node and Element types in the
* host environment. For example, for runtime-dom, HostNode would be the DOM
* `Node` interface and HostElement would be the DOM `Element` interface.
*
* Custom renderers can pass in the platform specific types like this:
*
* ``` js
* const { render, createApp } = createRenderer<Node, Element>({
*   patchProp,
*   ...nodeOps
* })
* ```
*/
function createRenderer(options) {
	return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
	const target = getGlobalThis();
	target.__VUE__ = true;
	setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
	const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options;
	const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren) => {
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
		const { type, ref, shapeFlag } = n2;
		switch (type) {
			case Text:
				processText(n1, n2, container, anchor);
				break;
			case Comment:
				processCommentNode(n1, n2, container, anchor);
				break;
			case Static:
				if (n1 == null) mountStaticNode(n2, container, anchor, namespace);
				else patchStaticNode(n1, n2, container, namespace);
				break;
			case Fragment:
				processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				break;
			case VaporSlot:
				getVaporInterface(parentComponent, n2).slot(n1, n2, container, anchor, parentComponent, parentSuspense, slotScopeIds);
				break;
			default: if (shapeFlag & 1) processElement(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else if (shapeFlag & 6) processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else if (shapeFlag & 64) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
			else if (shapeFlag & 128) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
			else warn$1("Invalid VNode type:", type, `(${typeof type})`);
		}
		if (ref != null && parentComponent) setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
		else if (ref == null && n1 && n1.ref != null) setRef(n1.ref, null, parentSuspense, n1, true);
	};
	const processText = (n1, n2, container, anchor) => {
		if (n1 == null) hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
		else {
			const el = n2.el = n1.el;
			if (n2.children !== n1.children) hostSetText(el, n2.children);
		}
	};
	const processCommentNode = (n1, n2, container, anchor) => {
		if (n1 == null) hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
		else n2.el = n1.el;
	};
	const mountStaticNode = (n2, container, anchor, namespace) => {
		[n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace, n2.el, n2.anchor);
	};
	/**
	* Dev / HMR only
	*/
	const patchStaticNode = (n1, n2, container, namespace) => {
		if (n2.children !== n1.children) {
			const anchor = hostNextSibling(n1.anchor);
			removeStaticNode(n1);
			[n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace);
		} else {
			n2.el = n1.el;
			n2.anchor = n1.anchor;
		}
	};
	const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
		let next;
		while (el && el !== anchor) {
			next = hostNextSibling(el);
			hostInsert(el, container, nextSibling);
			el = next;
		}
		hostInsert(anchor, container, nextSibling);
	};
	const removeStaticNode = ({ el, anchor }) => {
		let next;
		while (el && el !== anchor) {
			next = hostNextSibling(el);
			hostRemove(el);
			el = next;
		}
		hostRemove(anchor);
	};
	const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		if (n2.type === "svg") namespace = "svg";
		else if (n2.type === "math") namespace = "mathml";
		if (n1 == null) mountElement(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		else {
			const customElement = n1.el && n1.el._isVueCE ? n1.el : null;
			try {
				if (customElement) customElement._beginPatch();
				patchElement(n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			} finally {
				if (customElement) customElement._endPatch();
			}
		}
	};
	const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		let el;
		let vnodeHook;
		const { props, shapeFlag, transition, dirs } = vnode;
		el = vnode.el = hostCreateElement(vnode.type, namespace, props && props.is, props);
		if (shapeFlag & 8) hostSetElementText(el, vnode.children);
		else if (shapeFlag & 16) mountChildren(vnode.children, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(vnode, namespace), slotScopeIds, optimized);
		if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "created");
		setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
		if (props) {
			for (const key in props) if (key !== "value" && !isReservedProp(key)) hostPatchProp(el, key, null, props[key], namespace, parentComponent);
			/**
			* Special case for setting value on DOM elements:
			* - it can be order-sensitive (e.g. should be set *after* min/max, #2325, #4024)
			* - it needs to be forced (#1471)
			* #2353 proposes adding another renderer option to configure this, but
			* the properties affects are so finite it is worth special casing it
			* here to reduce the complexity. (Special casing it also should not
			* affect non-DOM renderers)
			*/
			if ("value" in props) hostPatchProp(el, "value", null, props.value, namespace);
			if (vnodeHook = props.onVnodeBeforeMount) invokeVNodeHook(vnodeHook, parentComponent, vnode);
		}
		def(el, "__vnode", vnode, true);
		def(el, "__vueParentComponent", parentComponent, true);
		if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
		if (transition) performTransitionEnter(el, transition, () => hostInsert(el, container, anchor), parentSuspense);
		else hostInsert(el, container, anchor);
		if ((vnodeHook = props && props.onVnodeMounted) || dirs) {
			const isHmr = isHmrUpdating;
			queuePostRenderEffect(() => {
				let prev;
				prev = setHmrUpdating(isHmr);
				try {
					vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
					dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
				} finally {
					setHmrUpdating(prev);
				}
			}, void 0, parentSuspense);
		}
	};
	const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
		if (scopeId) hostSetScopeId(el, scopeId);
		if (slotScopeIds) for (let i = 0; i < slotScopeIds.length; i++) hostSetScopeId(el, slotScopeIds[i]);
		const inheritedScopeIds = getInheritedScopeIds(vnode, parentComponent);
		for (let i = 0; i < inheritedScopeIds.length; i++) hostSetScopeId(el, inheritedScopeIds[i]);
	};
	const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
		for (let i = start; i < children.length; i++) {
			const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode$1(children[i]);
			patch(null, child, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		}
	};
	const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		const el = n2.el = n1.el;
		el.__vnode = n2;
		let { patchFlag, dynamicChildren, dirs } = n2;
		patchFlag |= n1.patchFlag & 16;
		const oldProps = n1.props || EMPTY_OBJ;
		const newProps = n2.props || EMPTY_OBJ;
		let vnodeHook;
		parentComponent && toggleRecurse(parentComponent, false);
		if (vnodeHook = newProps.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
		if (n2.ibu) n2.ibu();
		if (dirs) invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
		parentComponent && toggleRecurse(parentComponent, true);
		if (isHmrUpdating || dynamicChildren && (!n1.dynamicChildren || n1.dynamicChildren.length !== dynamicChildren.length)) {
			patchFlag = 0;
			optimized = false;
			dynamicChildren = null;
		}
		if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) hostSetElementText(el, "");
		if (dynamicChildren) {
			patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds);
			traverseStaticChildren(n1, n2);
		} else if (!optimized) patchChildren(n1, n2, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds, false);
		if (patchFlag > 0) {
			if (patchFlag & 16) patchProps(el, oldProps, newProps, parentComponent, namespace);
			else {
				if (patchFlag & 2) {
					if (oldProps.class !== newProps.class) hostPatchProp(el, "class", null, newProps.class, namespace);
				}
				if (patchFlag & 4) hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
				if (patchFlag & 8) {
					const propsToUpdate = n2.dynamicProps;
					for (let i = 0; i < propsToUpdate.length; i++) {
						const key = propsToUpdate[i];
						const prev = oldProps[key];
						const next = newProps[key];
						if (next !== prev || key === "value") hostPatchProp(el, key, prev, next, namespace, parentComponent);
					}
				}
			}
			if (patchFlag & 1) {
				if (n1.children !== n2.children) hostSetElementText(el, n2.children);
			}
		} else if (!optimized && dynamicChildren == null) patchProps(el, oldProps, newProps, parentComponent, namespace);
		if ((vnodeHook = newProps.onVnodeUpdated) || dirs || n2.iu) queuePostRenderEffect(() => {
			vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
			n2.iu && n2.iu();
			dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
		}, void 0, parentSuspense);
	};
	const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
		for (let i = 0; i < newChildren.length; i++) {
			const oldVNode = oldChildren[i];
			const newVNode = newChildren[i];
			const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & 198) ? hostParentNode(oldVNode.el) : fallbackContainer;
			patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, true);
		}
	};
	const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
		if (oldProps !== newProps) {
			if (oldProps !== EMPTY_OBJ) {
				for (const key in oldProps) if (!isReservedProp(key) && !(key in newProps)) hostPatchProp(el, key, oldProps[key], null, namespace, parentComponent);
			}
			for (const key in newProps) {
				if (isReservedProp(key)) continue;
				const next = newProps[key];
				const prev = oldProps[key];
				if (next !== prev && key !== "value") hostPatchProp(el, key, prev, next, namespace, parentComponent);
			}
			if ("value" in newProps) hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
		}
	};
	const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
		const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
		let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
		if (isHmrUpdating || patchFlag & 2048) {
			patchFlag = 0;
			optimized = false;
			dynamicChildren = null;
		}
		if (fragmentSlotScopeIds) slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
		if (n1 == null) {
			hostInsert(fragmentStartAnchor, container, anchor);
			hostInsert(fragmentEndAnchor, container, anchor);
			mountChildren(n2.children || [], container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		} else if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren && n1.dynamicChildren.length === dynamicChildren.length) {
			patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, namespace, slotScopeIds);
			traverseStaticChildren(n1, n2);
		} else patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
	};
	const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		n2.slotScopeIds = slotScopeIds;
		if (n2.type.__vapor) {
			if (n1 == null) {
				if (n2.shapeFlag & 512) getVaporInterface(parentComponent, n2).activate(n2, container, anchor, parentComponent, parentSuspense);
				else {
					const vnodeBeforeMountHook = !isAsyncWrapper(n2) && n2.props && n2.props.onVnodeBeforeMount;
					getVaporInterface(parentComponent, n2).mount(n2, container, anchor, parentComponent, parentSuspense, () => {
						if (n2.dirs) {
							invokeDirectiveHook(n2, null, parentComponent, "created");
							invokeDirectiveHook(n2, null, parentComponent, "beforeMount");
						}
					}, () => {
						if (vnodeBeforeMountHook) invokeVNodeHook(vnodeBeforeMountHook, parentComponent, n2);
					});
					if (n2.dirs) queuePostRenderEffect(() => invokeDirectiveHook(n2, null, parentComponent, "mounted"), void 0, parentSuspense);
					const vnodeMountedHook = !isAsyncWrapper(n2) && n2.props && n2.props.onVnodeMounted;
					if (vnodeMountedHook) {
						const scopedVNode = n2;
						queuePostRenderEffect(() => invokeVNodeHook(vnodeMountedHook, parentComponent, scopedVNode), void 0, parentSuspense);
					}
				}
			} else {
				const shouldUpdate = shouldUpdateComponent(n1, n2, optimized);
				getVaporInterface(parentComponent, n2).update(n1, n2, shouldUpdate, () => {
					if (n2.dirs) invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
				}, () => {
					const vnodeBeforeUpdateHook = n2.props && n2.props.onVnodeBeforeUpdate;
					if (vnodeBeforeUpdateHook) invokeVNodeHook(vnodeBeforeUpdateHook, parentComponent, n2, n1);
					if (n2.ibu) n2.ibu();
				});
				const vnodeUpdatedHook = n2.props && n2.props.onVnodeUpdated;
				if (shouldUpdate && (vnodeUpdatedHook || n2.dirs || n2.iu)) queuePostRenderEffect(() => {
					n2.dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
					vnodeUpdatedHook && invokeVNodeHook(vnodeUpdatedHook, parentComponent, n2, n1);
					n2.iu && n2.iu();
				}, void 0, parentSuspense);
			}
		} else if (n1 == null) {
			if (n2.shapeFlag & 512) parentComponent.ctx.activate(n2, container, anchor, namespace, optimized);
			else mountComponent(n2, container, anchor, parentComponent, parentSuspense, namespace, optimized);
		} else updateComponent(n1, n2, optimized);
	};
	const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
		const instance = initialVNode.component = createComponentInstance$1(initialVNode, parentComponent, parentSuspense);
		if (instance.type.__hmrId) registerHMR(instance);
		pushWarningContext$1(initialVNode);
		startMeasure(instance, `mount`);
		if (isKeepAlive(initialVNode)) instance.ctx.renderer = internals;
		startMeasure(instance, `init`);
		setupComponent$1(instance, false, optimized);
		endMeasure(instance, `init`);
		if (isHmrUpdating) initialVNode.el = null;
		if (instance.asyncDep) {
			if (parentSuspense) {
				const hydratedEl = instance.vnode.el;
				parentSuspense.registerDep(instance, (setupResult) => {
					const { vnode } = instance;
					pushWarningContext$1(vnode);
					handleSetupResult(instance, setupResult, false);
					if (hydratedEl) vnode.el = hydratedEl;
					const placeholder = !hydratedEl && instance.subTree.el;
					setupRenderEffect(instance, vnode, hostParentNode(hydratedEl || instance.subTree.el), hydratedEl ? null : getNextHostNode(instance.subTree), parentSuspense, namespace, optimized);
					if (placeholder) {
						vnode.placeholder = null;
						hostRemove(placeholder);
					}
					updateHOCHostEl(instance, vnode.el);
					popWarningContext$1();
				});
			}
			if (!initialVNode.el) {
				const placeholder = instance.subTree = createVNode(Comment);
				processCommentNode(null, placeholder, container, anchor);
				initialVNode.placeholder = placeholder.el;
			}
		} else setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized);
		popWarningContext$1();
		endMeasure(instance, `mount`);
	};
	const updateComponent = (n1, n2, optimized) => {
		const instance = n2.component = n1.component;
		if (shouldUpdateComponent(n1, n2, optimized)) {
			if (instance.asyncDep && !instance.asyncResolved) {
				pushWarningContext$1(n2);
				updateComponentPreRender(instance, n2, optimized);
				popWarningContext$1();
				return;
			} else {
				instance.next = n2;
				instance.effect.run();
			}
		} else {
			n2.el = n1.el;
			instance.vnode = n2;
		}
	};
	class SetupRenderEffect extends ReactiveEffect {
		constructor(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) {
			const prevScope = setCurrentScope(instance.scope);
			super();
			this.instance = instance;
			this.initialVNode = initialVNode;
			this.container = container;
			this.anchor = anchor;
			this.parentSuspense = parentSuspense;
			this.namespace = namespace;
			this.optimized = optimized;
			setCurrentScope(prevScope);
			this.job = instance.job = () => {
				if (this.dirty) this.run();
			};
			this.job.i = instance;
			this.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
			this.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
		}
		notify() {
			if (!(this.flags & 256)) {
				const job = this.job;
				queueJob(job, job.i.uid);
			}
		}
		fn() {
			const { instance, initialVNode, container, anchor, parentSuspense, namespace, optimized } = this;
			if (!instance.isMounted) {
				let vnodeHook;
				const { el, props } = initialVNode;
				const { bm, parent, root, type } = instance;
				const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
				toggleRecurse(instance, false);
				if (bm) invokeArrayFns(bm);
				if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) invokeVNodeHook(vnodeHook, parent, initialVNode);
				toggleRecurse(instance, true);
				if (el && hydrateNode) {
					const hydrateSubTree = () => {
						startMeasure(instance, `render`);
						instance.subTree = renderComponentRoot$1(instance);
						endMeasure(instance, `render`);
						startMeasure(instance, `hydrate`);
						hydrateNode(el, instance.subTree, instance, parentSuspense, null);
						endMeasure(instance, `hydrate`);
					};
					if (isAsyncWrapperVNode && type.__asyncHydrate) type.__asyncHydrate(el, instance, hydrateSubTree);
					else hydrateSubTree();
				} else {
					if (root.ce && root.ce._hasShadowRoot()) root.ce._injectChildStyle(type, instance.parent ? instance.parent.type : void 0);
					startMeasure(instance, `render`);
					const subTree = instance.subTree = renderComponentRoot$1(instance);
					endMeasure(instance, `render`);
					startMeasure(instance, `patch`);
					patch(null, subTree, container, anchor, instance, parentSuspense, namespace);
					endMeasure(instance, `patch`);
					initialVNode.el = subTree.el;
				}
				if (instance.m) queuePostRenderEffect(instance.m, void 0, parentSuspense);
				if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
					const scopedInitialVNode = initialVNode;
					queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), void 0, parentSuspense);
				}
				if (initialVNode.shapeFlag & 256 || parent && parent.vnode && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
					instance.ba && invokeKeepAliveHooks(instance.ba);
					instance.a && queuePostRenderEffect(instance.a, void 0, parentSuspense);
				}
				instance.isMounted = true;
				devtoolsComponentAdded(instance);
				this.initialVNode = this.container = this.anchor = null;
			} else {
				let { next, bu, u, parent, vnode } = instance;
				{
					const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
					if (nonHydratedAsyncRoot) {
						if (next) {
							next.el = vnode.el;
							updateComponentPreRender(instance, next, optimized);
						}
						nonHydratedAsyncRoot.asyncDep.then(() => {
							queuePostRenderEffect(() => {
								if (!instance.isUnmounted) instance.update();
							}, void 0, parentSuspense);
						});
						return;
					}
				}
				let originNext = next;
				let vnodeHook;
				pushWarningContext$1(next || instance.vnode);
				toggleRecurse(instance, false);
				if (next) {
					next.el = vnode.el;
					updateComponentPreRender(instance, next, optimized);
				} else next = vnode;
				if (bu) invokeArrayFns(bu);
				if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parent, next, vnode);
				if (next.ibu) next.ibu();
				toggleRecurse(instance, true);
				startMeasure(instance, `render`);
				const nextTree = renderComponentRoot$1(instance);
				endMeasure(instance, `render`);
				const prevTree = instance.subTree;
				instance.subTree = nextTree;
				startMeasure(instance, `patch`);
				patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, namespace);
				endMeasure(instance, `patch`);
				next.el = nextTree.el;
				if (originNext === null) updateHOCHostEl(instance, nextTree.el);
				if (u) queuePostRenderEffect(u, void 0, parentSuspense);
				if ((vnodeHook = next.props && next.props.onVnodeUpdated) || next.iu) queuePostRenderEffect(() => {
					vnodeHook && invokeVNodeHook(vnodeHook, parent, next, vnode);
					next.iu && next.iu();
				}, void 0, parentSuspense);
				devtoolsComponentUpdated(instance);
				popWarningContext$1();
			}
		}
	}
	const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
		const effect = instance.effect = new SetupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized);
		instance.update = effect.run.bind(effect);
		toggleRecurse(instance, true);
		effect.run();
	};
	const updateComponentPreRender = (instance, nextVNode, optimized) => {
		nextVNode.component = instance;
		const prevProps = instance.vnode.props;
		instance.vnode = nextVNode;
		instance.next = null;
		updateProps(instance, nextVNode.props, prevProps, optimized);
		updateSlots(instance, nextVNode.children, optimized);
		const prevSub = setActiveSub();
		flushPreFlushCbs(instance);
		setActiveSub(prevSub);
	};
	const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
		const c1 = n1 && n1.children;
		const prevShapeFlag = n1 ? n1.shapeFlag : 0;
		const c2 = n2.children;
		const { patchFlag, shapeFlag } = n2;
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
		} else if (prevShapeFlag & 16) {
			if (shapeFlag & 16) patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else unmountChildren(c1, parentComponent, parentSuspense, true);
		} else {
			if (prevShapeFlag & 8) hostSetElementText(container, "");
			if (shapeFlag & 16) mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		}
	};
	const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		c1 = c1 || EMPTY_ARR;
		c2 = c2 || EMPTY_ARR;
		const oldLength = c1.length;
		const newLength = c2.length;
		const commonLength = Math.min(oldLength, newLength);
		let i;
		for (i = 0; i < commonLength; i++) {
			const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode$1(c2[i]);
			patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		}
		if (oldLength > newLength) unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
		else mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, commonLength);
	};
	const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		let i = 0;
		const l2 = c2.length;
		let e1 = c1.length - 1;
		let e2 = l2 - 1;
		while (i <= e1 && i <= e2) {
			const n1 = c1[i];
			const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode$1(c2[i]);
			if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else break;
			i++;
		}
		while (i <= e1 && i <= e2) {
			const n1 = c1[e1];
			const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode$1(c2[e2]);
			if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else break;
			e1--;
			e2--;
		}
		if (i > e1) {
			if (i <= e2) {
				const nextPos = e2 + 1;
				const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
				while (i <= e2) {
					patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode$1(c2[i]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
					i++;
				}
			}
		} else if (i > e2) while (i <= e1) {
			unmount(c1[i], parentComponent, parentSuspense, true);
			i++;
		}
		else {
			const s1 = i;
			const s2 = i;
			const keyToNewIndexMap = /* @__PURE__ */ new Map();
			for (i = s2; i <= e2; i++) {
				const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode$1(c2[i]);
				if (nextChild.key != null) {
					if (keyToNewIndexMap.has(nextChild.key)) warn$1(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
					keyToNewIndexMap.set(nextChild.key, i);
				}
			}
			let j;
			let patched = 0;
			const toBePatched = e2 - s2 + 1;
			let moved = false;
			let maxNewIndexSoFar = 0;
			const newIndexToOldIndexMap = new Array(toBePatched);
			for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
			for (i = s1; i <= e1; i++) {
				const prevChild = c1[i];
				if (patched >= toBePatched) {
					unmount(prevChild, parentComponent, parentSuspense, true);
					continue;
				}
				let newIndex;
				if (prevChild.key != null) newIndex = keyToNewIndexMap.get(prevChild.key);
				else for (j = s2; j <= e2; j++) if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
					newIndex = j;
					break;
				}
				if (newIndex === void 0) unmount(prevChild, parentComponent, parentSuspense, true);
				else {
					newIndexToOldIndexMap[newIndex - s2] = i + 1;
					if (newIndex >= maxNewIndexSoFar) maxNewIndexSoFar = newIndex;
					else moved = true;
					patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
					patched++;
				}
			}
			const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
			j = increasingNewIndexSequence.length - 1;
			for (i = toBePatched - 1; i >= 0; i--) {
				const nextIndex = s2 + i;
				const nextChild = c2[nextIndex];
				const anchorVNode = c2[nextIndex + 1];
				const anchor = nextIndex + 1 < l2 ? anchorVNode.el || resolveAsyncComponentPlaceholder(anchorVNode) : parentAnchor;
				if (newIndexToOldIndexMap[i] === 0) patch(null, nextChild, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				else if (moved) {
					if (j < 0 || i !== increasingNewIndexSequence[j]) move(nextChild, container, anchor, 2, parentComponent);
					else j--;
				}
			}
		}
	};
	const move = (vnode, container, anchor, moveType, parentComponent, parentSuspense = null) => {
		const { el, type, transition, children, shapeFlag } = vnode;
		if (isVaporComponent(type) || type === VaporSlot) {
			getVaporInterface(parentComponent, vnode).move(vnode, container, anchor, moveType, parentSuspense);
			return;
		}
		if (shapeFlag & 6) {
			move(vnode.component.subTree, container, anchor, moveType, parentComponent);
			return;
		}
		if (shapeFlag & 128) {
			vnode.suspense.move(container, anchor, moveType);
			return;
		}
		if (shapeFlag & 64) {
			type.move(vnode, container, anchor, internals, parentComponent);
			return;
		}
		if (type === Fragment) {
			hostInsert(el, container, anchor);
			for (let i = 0; i < children.length; i++) move(children[i], container, anchor, moveType, parentComponent);
			hostInsert(vnode.anchor, container, anchor);
			return;
		}
		if (type === Static) {
			moveStaticNode(vnode, container, anchor);
			return;
		}
		if (moveType !== 2 && shapeFlag & 1 && transition) {
			if (moveType === 0) performTransitionEnter(el, transition, () => hostInsert(el, container, anchor), parentSuspense, true);
			else performTransitionLeave(el, transition, () => {
				if (vnode.ctx.isUnmounted) hostRemove(el);
				else hostInsert(el, container, anchor);
			}, true, true);
		} else hostInsert(el, container, anchor);
	};
	const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
		const { type, props, ref, children, dynamicChildren, shapeFlag, patchFlag, dirs, cacheIndex, memo } = vnode;
		if (patchFlag === -2) optimized = false;
		if (ref != null) {
			const prevSub = setActiveSub();
			setRef(ref, null, parentSuspense, vnode, true);
			setActiveSub(prevSub);
		}
		if (cacheIndex != null) parentComponent.renderCache[cacheIndex] = void 0;
		if (shapeFlag & 256) {
			if (isVaporComponent(vnode.type)) getVaporInterface(parentComponent, vnode).deactivate(vnode, parentComponent.ctx.getStorageContainer(), parentSuspense);
			else parentComponent.ctx.deactivate(vnode);
			return;
		}
		const shouldInvokeDirs = shapeFlag & 1 && dirs;
		const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
		let vnodeHook;
		if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) invokeVNodeHook(vnodeHook, parentComponent, vnode);
		if (shapeFlag & 6) {
			if (isVaporComponent(type)) {
				if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
				getVaporInterface(parentComponent, vnode).unmount(vnode, doRemove, parentSuspense);
				if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || dirs) queuePostRenderEffect(() => {
					dirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
					vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
				}, void 0, parentSuspense);
				return;
			} else unmountComponent(vnode.component, parentSuspense, doRemove);
		} else {
			if (shapeFlag & 128) {
				vnode.suspense.unmount(parentSuspense, doRemove);
				return;
			}
			if (shouldInvokeDirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
			if (shapeFlag & 64) vnode.type.remove(vnode, parentComponent, parentSuspense, internals, doRemove);
			else if (dynamicChildren && !dynamicChildren.hasOnce && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
			else if (type === Fragment && patchFlag & 384 || !optimized && shapeFlag & 16) unmountChildren(children, parentComponent, parentSuspense);
			if (type === VaporSlot) {
				getVaporInterface(parentComponent, vnode).unmount(vnode, doRemove, parentSuspense);
				return;
			}
			if (doRemove) remove(vnode);
		}
		const shouldInvalidateMemo = memo != null && cacheIndex == null;
		if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs || shouldInvalidateMemo) queuePostRenderEffect(() => {
			vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
			shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
			if (shouldInvalidateMemo) vnode.el = null;
		}, void 0, parentSuspense);
	};
	const remove = (vnode) => {
		const { type, el, anchor, transition } = vnode;
		if (type === Fragment) {
			if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) vnode.children.forEach((child) => {
				if (child.type === Comment) hostRemove(child.el);
				else remove(child);
			});
			else removeFragment(el, anchor);
			return;
		}
		if (type === Static) {
			removeStaticNode(vnode);
			return;
		}
		if (transition) performTransitionLeave(el, transition, () => hostRemove(el), !!(vnode.shapeFlag & 1));
		else hostRemove(el);
	};
	const removeFragment = (cur, end) => {
		let next;
		while (cur !== end) {
			next = hostNextSibling(cur);
			hostRemove(cur);
			cur = next;
		}
		hostRemove(end);
	};
	const unmountComponent = (instance, parentSuspense, doRemove) => {
		if (instance.type.__hmrId) unregisterHMR(instance);
		const { bum, scope, effect, subTree, um, m, a } = instance;
		invalidateMount(m);
		invalidateMount(a);
		if (bum) invokeArrayFns(bum);
		scope.stop();
		if (effect) {
			effect.stop();
			unmount(subTree, instance, parentSuspense, doRemove);
		} else if (doRemove && subTree && instance.vnode.el) remove(subTree);
		if (um) queuePostRenderEffect(um, void 0, parentSuspense);
		queuePostRenderEffect(() => instance.isUnmounted = true, void 0, parentSuspense);
		devtoolsComponentRemoved(instance);
	};
	const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
		for (let i = start; i < children.length; i++) unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
	};
	const getNextHostNode = (vnode) => {
		if (vnode.shapeFlag & 6) {
			if (isVaporComponent(vnode.type)) return hostNextSibling(vnode.anchor);
			return getNextHostNode(vnode.component.subTree);
		}
		if (vnode.shapeFlag & 128) return vnode.suspense.next();
		const el = hostNextSibling(vnode.anchor || vnode.el);
		const teleportEnd = el && el[TeleportEndKey];
		return teleportEnd ? hostNextSibling(teleportEnd) : el;
	};
	const render = (vnode, container, namespace) => {
		let instance;
		if (vnode == null) {
			if (container._vnode) {
				unmount(container._vnode, null, null, true);
				instance = container._vnode.component;
			}
		} else patch(container._vnode || null, vnode, container, null, null, null, namespace);
		container._vnode = vnode;
		flushOnAppMount(instance);
	};
	const internals = {
		p: patch,
		um: unmount,
		m: move,
		r: remove,
		mt: mountComponent,
		umt: unmountComponent,
		mc: mountChildren,
		pc: patchChildren,
		pbc: patchBlockChildren,
		n: getNextHostNode,
		o: options
	};
	let hydrate;
	let hydrateNode;
	if (createHydrationFns) [hydrate, hydrateNode] = createHydrationFns(internals);
	const mountApp = (app, container, isHydrate, namespace) => {
		const vnode = app._ceVNode || createVNode(app._component, app._props);
		vnode.appContext = app._context;
		if (namespace === true) namespace = "svg";
		else if (namespace === false) namespace = void 0;
		app._context.reload = () => {
			const cloned = cloneVNode(vnode);
			cloned.el = null;
			render(cloned, container, namespace);
		};
		if (isHydrate && hydrate) hydrate(vnode, container);
		else render(vnode, container, namespace);
		return vnode.component;
	};
	const unmountApp = (app) => {
		render(null, app._container);
	};
	return {
		render,
		hydrate,
		hydrateNode,
		internals,
		createApp: createAppAPI(mountApp, unmountApp, getComponentPublicInstance, render)
	};
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
	return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect, job, vapor }, allowed) {
	if (!vapor) {
		if (allowed) {
			effect.flags |= 128;
			job.flags |= 2;
		} else {
			effect.flags &= -129;
			job.flags &= -3;
		}
	}
}
function needTransition(parentSuspense, transition) {
	return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
/**
* #1156
* When a component is HMR-enabled, we need to make sure that all static nodes
* inside a block also inherit the DOM element from the previous tree so that
* HMR updates (which are full updates) can retrieve the element for patching.
*
* #2080
* Inside keyed `template` fragment static children, if a fragment is moved,
* the children will always be moved. Therefore, in order to ensure correct move
* position, el should be inherited from previous nodes.
*/
function traverseStaticChildren(n1, n2, shallow = false) {
	const ch1 = n1.children;
	const ch2 = n2.children;
	if (isArray(ch1) && isArray(ch2)) for (let i = 0; i < ch1.length; i++) {
		const c1 = ch1[i];
		let c2 = ch2[i];
		if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
			if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
				c2 = ch2[i] = cloneIfMounted(ch2[i]);
				c2.el = c1.el;
			}
			if (!shallow && c2.patchFlag !== -2) traverseStaticChildren(c1, c2);
		}
		if (c2.type === Text) {
			if (c2.patchFlag === -1) c2 = ch2[i] = cloneIfMounted(c2);
			c2.el = c1.el;
		}
		if (c2.type === Comment && !c2.el) c2.el = c1.el;
		c2.el && (c2.el.__vnode = c2);
	}
}
function locateNonHydratedAsyncRoot(instance) {
	const subComponent = instance.subTree && instance.subTree.component;
	if (subComponent) {
		if (subComponent.asyncDep && !subComponent.asyncResolved) return subComponent;
		else return locateNonHydratedAsyncRoot(subComponent);
	}
}
function invalidateMount(hooks) {
	if (hooks) for (let i = 0; i < hooks.length; i++) hooks[i].flags |= 4;
}
function performTransitionEnter(el, transition, insert, parentSuspense, force = false) {
	if (force && transition.persisted && !el[leaveCbKey]) {
		insert();
		return;
	}
	if (force || needTransition(parentSuspense, transition)) {
		transition.beforeEnter(el);
		insert();
		queuePostRenderEffect(() => transition.enter(el), void 0, parentSuspense);
	} else insert();
}
function performTransitionLeave(el, transition, remove, isElement = true, force = false) {
	const performRemove = () => {
		remove();
		if (transition && (force || !transition.persisted) && transition.afterLeave) transition.afterLeave();
	};
	if (force || isElement && transition && !transition.persisted) {
		const { leave, delayLeave } = transition;
		const performLeave = () => {
			const wasLeaving = el._isLeaving || !!el[leaveCbKey];
			if (el._isLeaving && force) el[leaveCbKey](true);
			if (force && transition.persisted && !wasLeaving) remove();
			else leave(el, performRemove);
		};
		if (delayLeave) delayLeave(el, performRemove, performLeave);
		else performLeave();
	} else performRemove();
}
function getVaporInterface(instance, vnode) {
	const ctx = instance ? instance.appContext : vnode.appContext;
	const res = ctx && ctx.vapor;
	if (!res) warn$1("Vapor component found in vdom tree but vapor-in-vdom interop was not installed. Make sure to install it:\n```\nimport { vaporInteropPlugin } from 'vue'\napp.use(vaporInteropPlugin)\n```");
	return res;
}
function isVaporComponent(type) {
	if (isHmrUpdating && hmrDirtyComponentsMode.has(type)) return hmrDirtyComponentsMode.get(type);
	return type.__vapor;
}
/**
* shared between vdom and vapor
*/
function getInheritedScopeIds(vnode, parentComponent, includeVaporRootIds = true) {
	const inheritedScopeIds = [];
	let currentParent = parentComponent;
	let currentVNode = vnode;
	while (currentParent) {
		let subTree = currentParent.subTree;
		if (!subTree) break;
		if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) subTree = filterSingleRoot(subTree.children) || subTree;
		if (currentVNode === subTree || isSuspense(subTree.type) && (subTree.ssContent === currentVNode || subTree.ssFallback === currentVNode)) {
			const parentVNode = currentParent.vnode;
			if (parentVNode.scopeId) inheritedScopeIds.push(parentVNode.scopeId);
			if (parentVNode.slotScopeIds) inheritedScopeIds.push(...parentVNode.slotScopeIds);
			currentVNode = parentVNode;
			currentParent = currentParent.parent;
		} else break;
	}
	const vaporScopeIds = includeVaporRootIds && currentVNode.vaporScopeIds;
	if (vaporScopeIds) inheritedScopeIds.push(...vaporScopeIds);
	return inheritedScopeIds;
}
function resolveAsyncComponentPlaceholder(anchorVnode) {
	if (anchorVnode.placeholder) return anchorVnode.placeholder;
	const instance = anchorVnode.component;
	if (instance) return resolveAsyncComponentPlaceholder(instance.subTree);
	return null;
}
//#endregion
//#region packages/runtime-core/src/components/Suspense.ts
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, id, suspense) {
	if (suspense && suspense.pendingBranch) {
		if (isArray(fn)) suspense.effects.push(...fn);
		else suspense.effects.push(fn);
	} else queuePostFlushCb(fn, id);
}
//#endregion
//#region packages/runtime-core/src/vnode.ts
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
const VaporSlot = Symbol.for("v-vps");
const blockStack = [];
let currentBlock = null;
function closeBlock() {
	blockStack.pop();
	currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
/**
* Block tracking sometimes needs to be disabled, for example during the
* creation of a tree that needs to be cached by v-once. The compiler generates
* code like this:
*
* ``` js
* _cache[1] || (
*   setBlockTracking(-1, true),
*   _cache[1] = createVNode(...),
*   setBlockTracking(1),
*   _cache[1]
* )
* ```
*
* @private
*/
function setBlockTracking(value, inVOnce = false) {
	isBlockTreeEnabled += value;
	if (value < 0 && currentBlock && inVOnce) currentBlock.hasOnce = true;
}
function isVNode$2(value) {
	return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
	if (n2.shapeFlag & 6 && n1.component) {
		const dirtyInstances = hmrDirtyComponents.get(n2.type);
		if (dirtyInstances && dirtyInstances.has(n1.component)) {
			n1.shapeFlag &= -257;
			n2.shapeFlag &= -513;
			return false;
		}
	}
	return n1.type === n2.type && n1.key === n2.key;
}
const createVNodeWithArgsTransform = (...args) => {
	return _createVNode(...args);
};
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref, ref_key, ref_for }, i = currentRenderingInstance) => {
	if (typeof ref === "number") ref = "" + ref;
	return ref != null ? isString(ref) || /* @__PURE__ */ isRef(ref) || isFunction(ref) ? {
		i,
		r: ref,
		k: ref_key,
		f: !!ref_for
	} : ref : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
	const vnode = {
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
		targetStart: null,
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
	if (vnode.key !== vnode.key) warn$1(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
	if (props && vnode.shapeFlag & 1) {
		const overwritingProp = props.innerHTML != null ? "innerHTML" : props.textContent != null ? "textContent" : null;
		if (overwritingProp && hasContentChildren(vnode.children)) warn$1(`The \`${overwritingProp}\` prop on <${vnode.type}> will override its children. Remove either the \`${overwritingProp}\` prop or the children.`);
	}
	if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) currentBlock.push(vnode);
	return vnode;
}
/**
* dev only
* Whether children would actually render something. Empty text and empty
* arrays are ignored, mirroring the compiler's `node.children.length` check
* for `v-html` / `v-text`.
*/
function hasContentChildren(children) {
	if (isString(children)) return children !== "";
	if (isArray(children)) return children.length > 0;
	return false;
}
const createVNode = createVNodeWithArgsTransform;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
	if (!type || type === NULL_DYNAMIC_COMPONENT) {
		if (!type) warn$1(`Invalid vnode type when creating vnode: ${type}.`);
		type = Comment;
	}
	if (isVNode$2(type)) {
		const cloned = cloneVNode(type, props, true);
		if (children) normalizeChildren(cloned, children);
		if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
			if (cloned.shapeFlag & 6) currentBlock[currentBlock.indexOf(type)] = cloned;
			else currentBlock.push(cloned);
		}
		cloned.patchFlag = -2;
		return cloned;
	}
	if (isClassComponent(type)) type = type.__vccOpts;
	if (props) {
		props = guardReactiveProps(props);
		let { class: klass, style } = props;
		if (klass && !isString(klass)) props.class = normalizeClass(klass);
		if (isObject(style)) {
			if (/* @__PURE__ */ isProxy(style) && !isArray(style)) style = extend({}, style);
			props.style = normalizeStyle(style);
		}
	}
	const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
	if (shapeFlag & 4 && /* @__PURE__ */ isProxy(type)) {
		type = /* @__PURE__ */ toRaw(type);
		warn$1("Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `\nComponent that was made reactive: `, type);
	}
	return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
	if (!props) return null;
	return /* @__PURE__ */ isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
	const { props, ref, patchFlag, children, transition } = vnode;
	const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
	const cloned = {
		__v_isVNode: true,
		__v_skip: true,
		type: vnode.type,
		props: mergedProps,
		key: mergedProps && normalizeKey(mergedProps),
		ref: extraProps && extraProps.ref ? mergeRef && ref ? isArray(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref,
		scopeId: vnode.scopeId,
		slotScopeIds: vnode.slotScopeIds,
		children: patchFlag === -1 && isArray(children) ? children.map(deepCloneVNode) : children,
		target: vnode.target,
		targetStart: vnode.targetStart,
		targetAnchor: vnode.targetAnchor,
		staticCount: vnode.staticCount,
		shapeFlag: vnode.shapeFlag,
		patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
		dynamicProps: vnode.dynamicProps,
		dynamicChildren: vnode.dynamicChildren,
		appContext: vnode.appContext,
		dirs: vnode.dirs,
		transition,
		component: vnode.component,
		suspense: vnode.suspense,
		ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
		ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
		placeholder: vnode.placeholder,
		el: vnode.el,
		anchor: vnode.anchor,
		ctx: vnode.ctx,
		ce: vnode.ce,
		vi: vnode.vi,
		vs: cloneVaporSlotMeta(vnode),
		vb: vnode.vb,
		ibu: vnode.ibu,
		iu: vnode.iu
	};
	if (transition && cloneTransition) setTransitionHooks(cloned, transition.clone(cloned));
	return cloned;
}
function cloneVaporSlotMeta(vnode) {
	const vaporSlot = vnode.vs;
	if (!vaporSlot) return vaporSlot;
	const cloned = {
		slot: vaporSlot.slot,
		fallback: vaporSlot.fallback,
		outletFallback: vaporSlot.outletFallback
	};
	if (vnode.el) {
		cloned.state = vaporSlot.state;
		cloned.ref = vaporSlot.ref;
		cloned.scope = vaporSlot.scope;
	}
	return cloned;
}
/**
* Dev only, for HMR of hoisted vnodes reused in v-for
* https://github.com/vitejs/vite/issues/2022
*/
function deepCloneVNode(vnode) {
	const cloned = cloneVNode(vnode);
	if (isArray(vnode.children)) cloned.children = vnode.children.map(deepCloneVNode);
	return cloned;
}
/**
* @private
*/
function createTextVNode(text = " ", flag = 0) {
	return createVNode(Text, null, text, flag);
}
function normalizeVNode$1(child) {
	if (child == null || typeof child === "boolean") return createVNode(Comment);
	else if (isArray(child)) return createVNode(Fragment, null, child.slice());
	else if (isVNode$2(child)) return cloneIfMounted(child);
	else return createVNode(Text, null, String(child));
}
function cloneIfMounted(child) {
	return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
	let type = 0;
	const { shapeFlag } = vnode;
	if (children == null) children = null;
	else if (isArray(children)) type = 16;
	else if (typeof children === "object") {
		if (shapeFlag & 65) {
			const slot = children.default;
			if (slot) {
				slot._c && (slot._d = false);
				normalizeChildren(vnode, slot());
				slot._c && (slot._d = true);
			}
			return;
		} else {
			type = 32;
			const slotFlag = children._;
			if (!slotFlag && !isInternalObject(children)) children._ctx = currentRenderingInstance;
			else if (slotFlag === 3 && currentRenderingInstance) {
				if (currentRenderingInstance.slots._ === 1) children._ = 1;
				else {
					children._ = 2;
					vnode.patchFlag |= 1024;
				}
			}
		}
	} else if (isFunction(children)) {
		if (shapeFlag & 65) {
			normalizeChildren(vnode, { default: children });
			return;
		}
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
function mergeProps(...args) {
	const ret = {};
	for (let i = 0; i < args.length; i++) {
		const toMerge = args[i];
		for (const key in toMerge) if (key === "class") {
			if (ret.class !== toMerge.class) ret.class = normalizeClass([ret.class, toMerge.class]);
		} else if (key === "style") ret.style = normalizeStyle([ret.style, toMerge.style]);
		else if (isOn(key)) {
			const existing = ret[key];
			const incoming = toMerge[key];
			if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) ret[key] = existing ? [].concat(existing, incoming) : incoming;
			else if (incoming == null && existing == null && !isModelListener(key)) ret[key] = incoming;
		} else if (key !== "") ret[key] = toMerge[key];
	}
	return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
	callWithAsyncErrorHandling(hook, instance, 7, [vnode, prevVNode]);
}
//#endregion
//#region packages/runtime-core/src/componentCurrentInstance.ts
/**
* @internal
*/
let currentInstance = null;
/**
* @internal
*/
const getCurrentGenericInstance = () => currentInstance || currentRenderingInstance;
let isInSSRComponentSetup = false;
let setInSSRSetupState;
/**
* @internal
*/
let simpleSetCurrentInstance;
{
	const g = getGlobalThis();
	const registerGlobalSetter = (key, setter) => {
		let setters;
		if (!(setters = g[key])) setters = g[key] = [];
		setters.push(setter);
		return (v) => {
			if (setters.length > 1) setters.forEach((set) => set(v));
			else setters[0](v);
		};
	};
	simpleSetCurrentInstance = registerGlobalSetter(`__VUE_INSTANCE_SETTERS__`, (v) => currentInstance = v);
	setInSSRSetupState = registerGlobalSetter(`__VUE_SSR_SETTERS__`, (v) => isInSSRComponentSetup = v);
}
const setCurrentInstance = (instance, scope = instance !== null ? instance.scope : void 0) => {
	try {
		return [currentInstance, setCurrentScope(scope)];
	} finally {
		simpleSetCurrentInstance(instance);
	}
};
/**
* Restores a snapshot returned by {@link setCurrentInstance}. Unlike calling
* `setCurrentInstance(...prev)`, an `undefined` saved scope is restored
* verbatim instead of re-triggering the `instance.scope` default.
* @internal
*/
const restoreCurrentInstance = (prev) => {
	setCurrentScope(prev[1]);
	simpleSetCurrentInstance(prev[0]);
};
//#endregion
//#region packages/runtime-core/src/component.ts
const emptyAppContext = /*@__PURE__*/ createAppContext();
let uid = 0;
function createComponentInstance$1(vnode, parent, suspense) {
	const type = vnode.type;
	const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
	const instance = {
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
		job: null,
		scope: new EffectScope(true),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: parent ? parent.provides : Object.create(appContext.provides),
		ids: parent ? parent.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: normalizePropsOptions(type, appContext),
		emitsOptions: normalizeEmitsOptions(type, appContext),
		emit: null,
		emitted: null,
		propsDefaults: null,
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
		bda: null,
		ba: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	instance.ctx = createDevRenderContext(instance);
	instance.root = parent ? parent.root : instance;
	instance.emit = emit.bind(null, instance);
	if (vnode.ce) vnode.ce(instance);
	return instance;
}
/**
* @internal
*/
function validateComponentName(name, { isNativeTag }) {
	if (isBuiltInTag(name) || isNativeTag(name)) warn$1("Do not use built-in or reserved HTML elements as component id: " + name);
}
function isStatefulComponent(instance) {
	return instance.vnode.shapeFlag & 4;
}
function setupComponent$1(instance, isSSR = false, optimized = false) {
	isSSR && setInSSRSetupState(isSSR);
	const { props, children, vi } = instance.vnode;
	const isStateful = isStatefulComponent(instance);
	if (vi) vi(instance);
	else {
		initProps(instance, props, isStateful, isSSR);
		initSlots(instance, children, optimized || isSSR);
	}
	const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
	isSSR && setInSSRSetupState(false);
	return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
	const Component = instance.type;
	if (Component.name) validateComponentName(Component.name, instance.appContext.config);
	if (Component.components) {
		const names = Object.keys(Component.components);
		for (let i = 0; i < names.length; i++) validateComponentName(names[i], instance.appContext.config);
	}
	if (Component.directives) {
		const names = Object.keys(Component.directives);
		for (let i = 0; i < names.length; i++) validateDirectiveName(names[i]);
	}
	if (Component.compilerOptions && isRuntimeOnly()) warn$1("\"compilerOptions\" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.");
	instance.accessCache = Object.create(null);
	instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
	exposePropsOnRenderContext(instance);
	const { setup } = Component;
	if (setup) {
		const prevSub = setActiveSub();
		const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
		const prev = setCurrentInstance(instance);
		const setupResult = callWithErrorHandling(setup, instance, 0, [/* @__PURE__ */ shallowReadonly(instance.props), setupContext]);
		const isAsyncSetup = isPromise(setupResult);
		setActiveSub(prevSub);
		restoreCurrentInstance(prev);
		if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) markAsyncBoundary(instance);
		if (isAsyncSetup) {
			const unsetCurrentInstance = () => {
				setCurrentInstance(null, void 0);
			};
			setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
			if (isSSR) return setupResult.then((resolvedResult) => {
				setInSSRSetupState(true);
				try {
					handleSetupResult(instance, resolvedResult, isSSR);
				} finally {
					setInSSRSetupState(false);
				}
			}).catch((e) => {
				handleError(e, instance, 0);
			});
			else {
				instance.asyncDep = setupResult;
				if (!instance.suspense) warn$1(`Component <${formatComponentName(instance, Component)}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
			}
		} else handleSetupResult(instance, setupResult, isSSR);
	} else finishComponentSetup(instance, isSSR);
}
function handleSetupResult(instance, setupResult, isSSR) {
	if (isFunction(setupResult)) {
		if (instance.type.__ssrInlineRender) instance.ssrRender = setupResult;
		else instance.render = setupResult;
	} else if (isObject(setupResult)) {
		if (isVNode$2(setupResult)) warn$1("setup() should not return VNodes directly - return a render function instead.");
		instance.devtoolsRawSetupState = setupResult;
		instance.setupState = proxyRefs(setupResult);
		exposeSetupStateOnRenderContext(instance);
	} else if (setupResult !== void 0) warn$1(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
	finishComponentSetup(instance, isSSR);
}
const isRuntimeOnly = () => true;
function finishComponentSetup(instance, isSSR, skipOptions) {
	const Component = instance.type;
	if (!instance.render) instance.render = Component.render || NOOP;
	{
		const prevInstance = setCurrentInstance(instance);
		const prevSub = setActiveSub();
		try {
			applyOptions(instance);
		} finally {
			setActiveSub(prevSub);
			restoreCurrentInstance(prevInstance);
		}
	}
	if (!Component.render && instance.render === NOOP && !isSSR) {
		if (Component.template)
 /* v8 ignore start */
		warn$1("Component provided template option but runtime compilation is not supported in this build of Vue. Use \"vue.esm-browser.js\" instead.");
		else warn$1(`Component is missing template or render function: `, Component);
	}
}
const attrsProxyHandlers = {
	get(target, key) {
		markAttrsAccessed();
		track(target, "get", "");
		return target[key];
	},
	set() {
		warn$1(`setupContext.attrs is readonly.`);
		return false;
	},
	deleteProperty() {
		warn$1(`setupContext.attrs is readonly.`);
		return false;
	}
};
/**
* Dev-only
*/
function getSlotsProxy(instance) {
	return new Proxy(instance.slots, { get(target, key) {
		track(instance, "get", "$slots");
		return target[key];
	} });
}
function createSetupContext(instance) {
	{
		let attrsProxy;
		let slotsProxy;
		return Object.freeze({
			get attrs() {
				return attrsProxy || (attrsProxy = new Proxy(instance.attrs, attrsProxyHandlers));
			},
			get slots() {
				return slotsProxy || (slotsProxy = getSlotsProxy(instance));
			},
			get emit() {
				return (event, ...args) => instance.emit(event, ...args);
			},
			expose: (exposed) => expose(instance, exposed)
		});
	}
}
/**
* @internal
*/
function expose(instance, exposed) {
	if (instance.exposed) warn$1(`expose() should be called only once per setup().`);
	if (exposed != null) {
		let exposedType = typeof exposed;
		if (exposedType === "object") {
			if (isArray(exposed)) exposedType = "array";
			else if (/* @__PURE__ */ isRef(exposed)) exposedType = "ref";
		}
		if (exposedType !== "object") warn$1(`expose() should be passed a plain object, received ${exposedType}.`);
	}
	instance.exposed = exposed || {};
}
function getComponentPublicInstance(instance) {
	if (instance.exposed) return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
		get(target, key) {
			if (key in target) return target[key];
			else {
				const publicPropertiesMap = getPublicPropertiesMap();
				if (key in publicPropertiesMap) return publicPropertiesMap[key](instance);
			}
		},
		has(target, key) {
			const publicPropertiesMap = getPublicPropertiesMap();
			return key in target || key in publicPropertiesMap;
		}
	}));
	else return instance.proxy;
}
const classifyRE = /(?:^|[-_])\w/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
	return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
	let name = getComponentName(Component);
	if (!name && Component.__file) {
		const match = Component.__file.match(/([^/\\]+)\.\w+$/);
		if (match) name = match[1];
	}
	if (!name && instance) {
		const inferFromRegistry = (registry) => {
			for (const key in registry) if (registry[key] === Component) return key;
		};
		name = inferFromRegistry(instance.components) || instance.parent && inferFromRegistry(instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
	}
	return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
	return isFunction(value) && "__vccOpts" in value;
}
//#endregion
//#region packages/runtime-core/src/apiComputed.ts
const computed = (getterOrOptions, debugOptions) => {
	return /* @__PURE__ */ computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
//#endregion
//#region packages/runtime-core/src/index.ts
const version = "3.6.0-rc.8";
const warn = warn$1;
/**
* SSR utils for \@vue/server-renderer. Only exposed in ssr-possible builds.
* @internal
*/
const ssrUtils = {
	createComponentInstance: createComponentInstance$1,
	setupComponent: setupComponent$1,
	renderComponentRoot: renderComponentRoot$1,
	setCurrentRenderingInstance: setCurrentRenderingInstance$1,
	isVNode: isVNode$2,
	normalizeVNode: normalizeVNode$1,
	getComponentPublicInstance,
	ensureValidVNode: ensureValidVNode$1,
	pushWarningContext: pushWarningContext$1,
	popWarningContext: popWarningContext$1
};
//#endregion
//#region packages/runtime-dom/src/nodeOps.ts
let policy = void 0;
const tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) try {
	policy = /*@__PURE__*/ tt.createPolicy("vue", { createHTML: (val) => val });
} catch (e) {
	warn(`Error creating trusted types policy: ${e}`);
}
const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
const svgNS = "http://www.w3.org/2000/svg";
const mathmlNS = "http://www.w3.org/1998/Math/MathML";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /*@__PURE__*/ doc.createElement("template");
const nodeOps = {
	insert: (child, parent, anchor) => {
		parent.insertBefore(child, anchor || null);
	},
	remove: (child) => {
		const parent = child.parentNode;
		if (parent) parent.removeChild(child);
	},
	createElement: (tag, namespace, is, props) => {
		const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
		if (tag === "select" && props && props.multiple != null) el.setAttribute("multiple", props.multiple);
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
	setScopeId(el, id) {
		el.setAttribute(id, "");
	},
	insertStaticContent(content, parent, anchor, namespace, start, end) {
		const before = anchor ? anchor.previousSibling : parent.lastChild;
		if (start && (start === end || start.nextSibling)) while (true) {
			parent.insertBefore(start.cloneNode(true), anchor);
			if (start === end || !(start = start.nextSibling)) break;
		}
		else {
			templateContainer.innerHTML = unsafeToTrustedHTML(namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content);
			const template = templateContainer.content;
			if (namespace === "svg" || namespace === "mathml") {
				const wrapper = template.firstChild;
				while (wrapper.firstChild) template.appendChild(wrapper.firstChild);
				template.removeChild(wrapper);
			}
			parent.insertBefore(template, anchor);
		}
		return [before ? before.nextSibling : parent.firstChild, anchor ? anchor.previousSibling : parent.lastChild];
	}
};
//#endregion
//#region packages/runtime-dom/src/components/Transition.ts
const vtcKey = Symbol("_vtc");
//#endregion
//#region packages/runtime-dom/src/modules/class.ts
function patchClass(el, value, isSVG) {
	const transitionClasses = el[vtcKey];
	if (transitionClasses) value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
	if (value == null) el.removeAttribute("class");
	else if (isSVG) el.setAttribute("class", value);
	else el.className = value;
}
//#endregion
//#region packages/runtime-dom/src/directives/vShow.ts
const vShowOriginalDisplay = Symbol("_vod");
const vShowHidden = Symbol("_vsh");
const vShow = {
	name: "show",
	beforeMount(el, { value }, { transition }) {
		el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
		if (transition && value) transition.beforeEnter(el);
		else setDisplay(el, value);
	},
	mounted(el, { value }, { transition }) {
		if (transition && value) transition.enter(el);
	},
	updated(el, { value, oldValue }, { transition }) {
		if (!value === !oldValue) return;
		if (transition) {
			if (value) {
				transition.beforeEnter(el);
				setDisplay(el, true);
				transition.enter(el);
			} else transition.leave(el, () => {
				setDisplay(el, false);
			});
		} else setDisplay(el, value);
	},
	beforeUnmount(el, { value }) {
		setDisplay(el, value);
	}
};
function setDisplay(el, value) {
	el.style.display = value ? el[vShowOriginalDisplay] : "none";
	el[vShowHidden] = !value;
}
function initVShowForSSR() {
	vShow.getSSRProps = ({ value }) => {
		if (!value) return { style: { display: "none" } };
	};
}
//#endregion
//#region packages/runtime-dom/src/helpers/useCssVars.ts
const CSS_VAR_TEXT = Symbol("CSS_VAR_TEXT");
//#endregion
//#region packages/runtime-dom/src/modules/style.ts
const displayRE = /(?:^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
	const style = el.style;
	const isCssString = isString(next);
	let hasControlledDisplay = false;
	if (next && !isCssString) {
		if (prev) {
			if (!isString(prev)) {
				for (const key in prev) if (next[key] == null) setStyle(style, key, "");
			} else for (const prevStyle of prev.split(";")) {
				const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
				if (next[key] == null) setStyle(style, key, "");
			}
		}
		for (const key in next) {
			if (key === "display") hasControlledDisplay = true;
			const value = next[key];
			if (value != null) {
				if (!shouldPreserveTextareaResizeStyle(el, key, !isString(prev) && prev ? prev[key] : void 0, value)) setStyle(style, key, value);
			} else setStyle(style, key, "");
		}
	} else if (isCssString) {
		if (prev !== next) {
			const cssVarText = style[CSS_VAR_TEXT];
			if (cssVarText) next += ";" + cssVarText;
			style.cssText = next;
			hasControlledDisplay = displayRE.test(next);
		}
	} else if (prev) el.removeAttribute("style");
	if (vShowOriginalDisplay in el) {
		el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
		if (el[vShowHidden]) style.display = "none";
	}
}
const semicolonRE = /[^\\];\s*$/;
const importantRE = /\s*!important$/;
function setStyle(style, name, rawVal) {
	if (isArray(rawVal)) rawVal.forEach((v) => setStyle(style, name, v));
	else {
		const val = rawVal == null ? "" : String(rawVal);
		if (semicolonRE.test(val)) warn(`Unexpected semicolon at the end of '${name}' style value: '${val}'`);
		if (name.startsWith("--")) {
			if (importantRE.test(val)) style.setProperty(name, val.replace(importantRE, ""), "important");
			else style.setProperty(name, val);
		} else {
			const prefixed = autoPrefix(style, name);
			if (importantRE.test(val)) style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
			else style[prefixed] = val;
		}
	}
}
const prefixes = [
	"Webkit",
	"Moz",
	"ms"
];
const prefixCache = {};
function autoPrefix(style, rawName) {
	const cached = prefixCache[rawName];
	if (cached) return cached;
	let name = camelize(rawName);
	if (name !== "filter" && name in style) return prefixCache[rawName] = name;
	name = capitalize(name);
	for (let i = 0; i < prefixes.length; i++) {
		const prefixed = prefixes[i] + name;
		if (prefixed in style) return prefixCache[rawName] = prefixed;
	}
	return rawName;
}
/**
* Browsers update textarea width/height directly during native resize.
* Only special-case this common textarea path for now; other resize scenarios
* still follow normal vnode style patching.
*/
function shouldPreserveTextareaResizeStyle(el, key, prev, next) {
	return el.tagName === "TEXTAREA" && (key === "width" || key === "height") && isString(next) && prev === next;
}
//#endregion
//#region packages/runtime-dom/src/modules/attrs.ts
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
	if (isSVG && key.startsWith("xlink:")) {
		if (value == null) el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
		else el.setAttributeNS(xlinkNS, key, value);
	} else if (value == null || isBoolean && !includeBooleanAttr(value)) el.removeAttribute(key);
	else el.setAttribute(key, isBoolean ? "" : isSymbol(value) ? String(value) : value);
}
//#endregion
//#region packages/runtime-dom/src/modules/props.ts
function patchDOMProp(el, key, value, parentComponent, attrName) {
	if (key === "innerHTML" || key === "textContent") {
		if (value != null) el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
		return;
	}
	const tag = el.tagName;
	if (key === "value" && canSetValueDirectly(tag)) {
		const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
		const newValue = value == null ? el.type === "checkbox" ? "on" : "" : String(value);
		if (oldValue !== newValue || !("_value" in el)) el.value = newValue;
		if (value == null) el.removeAttribute(key);
		el._value = value;
		return;
	}
	let needRemove = false;
	if (value === "" || value == null) {
		const type = typeof el[key];
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
		el[key] = value;
	} catch (e) {
		if (!needRemove) warn(`Failed setting prop "${key}" on <${tag.toLowerCase()}>: value ${value} is invalid.`, e);
	}
	needRemove && el.removeAttribute(attrName || key);
}
//#endregion
//#region packages/runtime-dom/src/modules/events.ts
function addEventListener(el, event, handler, options) {
	el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
	el.removeEventListener(event, handler, options);
}
const veiKey = Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
	const invokers = el[veiKey] || (el[veiKey] = {});
	const existingInvoker = invokers[rawName];
	if (nextValue && existingInvoker) existingInvoker.value = sanitizeEventValue(nextValue, rawName);
	else {
		const [name, options] = parseEventName(rawName);
		if (nextValue) addEventListener(el, name, invokers[rawName] = createInvoker(sanitizeEventValue(nextValue, rawName), instance), options);
		else if (existingInvoker) {
			removeEventListener(el, name, existingInvoker, options);
			invokers[rawName] = void 0;
		}
	}
}
const optionsModifierRE = /(Once|Passive|Capture)$/;
const optionsModifierEventRE = /^on:?(?:Once|Passive|Capture)$/;
function parseEventName(name) {
	let options;
	let m;
	while ((m = name.match(optionsModifierRE)) && !optionsModifierEventRE.test(name)) {
		if (!options) options = {};
		name = name.slice(0, name.length - m[1].length);
		options[m[1].toLowerCase()] = true;
	}
	return [name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2)), options];
}
let cachedNow = 0;
const p = /*@__PURE__*/ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
	const invoker = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= invoker.attached) return;
		const value = invoker.value;
		if (isArray(value)) {
			const originalStop = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				originalStop.call(e);
				e._stopped = true;
			};
			const handlers = value.slice();
			const args = [e];
			for (let i = 0; i < handlers.length; i++) {
				if (e._stopped) break;
				const handler = handlers[i];
				if (handler) callWithAsyncErrorHandling(handler, instance, 5, args);
			}
		} else callWithAsyncErrorHandling(value, instance, 5, [e]);
	};
	invoker.value = initialValue;
	invoker.attached = getNow();
	return invoker;
}
function sanitizeEventValue(value, propName) {
	if (isFunction(value) || isArray(value)) return value;
	warn(`Wrong type passed as event handler to ${propName} - did you forget @ or : in front of your prop?\nExpected function or array of functions, received type ${typeof value}.`);
	return NOOP;
}
//#endregion
//#region packages/runtime-dom/src/patchProp.ts
const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
	const isSVG = namespace === "svg";
	if (key === "class") patchClass(el, nextValue, isSVG);
	else if (key === "style") patchStyle(el, prevValue, nextValue);
	else if (isOn(key)) {
		if (!isModelListener(key)) patchEvent(el, key, prevValue, nextValue, parentComponent);
	} else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
		patchDOMProp(el, key, nextValue, parentComponent);
		if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
	} else if (el._isVueCE && (shouldSetAsPropForVueCE(el, key) || el._def.__asyncLoader && (/[A-Z]/.test(key) || !isString(nextValue)))) patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
	else {
		if (key === "true-value") el._trueValue = nextValue;
		else if (key === "false-value") el._falseValue = nextValue;
		patchAttr(el, key, nextValue, isSVG, parentComponent);
	}
};
function shouldSetAsProp(el, key, value, isSVG) {
	if (isSVG) {
		if (key === "innerHTML" || key === "textContent") return true;
		if (key in el && isNativeOn(key) && isFunction(value)) return true;
		return false;
	}
	if (shouldSetAsAttr(el.tagName, key)) return false;
	if (isNativeOn(key) && isString(value)) return false;
	return key in el;
}
function shouldSetAsPropForVueCE(el, key) {
	const props = el._def.props;
	if (!props) return false;
	const camelKey = camelize(key);
	return Array.isArray(props) ? props.some((prop) => camelize(prop) === camelKey) : Object.keys(props).some((prop) => camelize(prop) === camelKey);
}
//#endregion
//#region packages/runtime-dom/src/directives/vModel.ts
const getModelAssigner = (vnode) => {
	const fn = vnode.props["onUpdate:modelValue"] || false;
	return isArray(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e) {
	e.target.composing = true;
}
function onCompositionEnd(e) {
	const target = e.target;
	if (target.composing) {
		target.composing = false;
		target.dispatchEvent(new Event("input"));
	}
}
const assignKey = Symbol("_assign");
const initialValueKey = Symbol("_initialValue");
const vModelText = {
	created(el, { modifiers: { lazy, trim, number } }, vnode) {
		if (el.parentNode) {
			if (el.type === "text") el[initialValueKey] = el.defaultValue.replace(/[\r\n]/g, "");
			else if (el.type === "textarea") el[initialValueKey] = el.defaultValue.replace(/\r\n?/g, "\n");
		}
		el[assignKey] = getModelAssigner(vnode);
		vModelTextInit(el, trim, number || !!(vnode.props && vnode.props.type === "number"), lazy);
	},
	mounted(el, { value, modifiers: { trim, number } }) {
		const newValue = value == null ? "" : value;
		const initialValue = el[initialValueKey];
		delete el[initialValueKey];
		if (initialValue !== void 0 && (el.type === "text" || el.type === "textarea") && el.value !== initialValue) el[assignKey](castValue(el.value, trim, number));
		else el.value = newValue;
	},
	beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim, number } }, vnode) {
		el[assignKey] = getModelAssigner(vnode);
		vModelTextUpdate(el, oldValue, value, trim, number, lazy);
	}
};
function castValue(value, trim, number) {
	if (trim) value = value.trim();
	if (number) value = looseToNumber(value);
	return value;
}
/**
* @internal
*/
const vModelTextInit = (el, trim, number, lazy, set) => {
	addEventListener(el, lazy ? "change" : "input", (e) => {
		if (e.target.composing) return;
		(set || el[assignKey])(castValue(el.value, trim, number || el.type === "number"));
	});
	if (trim || number) addEventListener(el, "change", () => {
		el.value = castValue(el.value, trim, number || el.type === "number");
	});
	if (!lazy) {
		addEventListener(el, "compositionstart", onCompositionStart);
		addEventListener(el, "compositionend", onCompositionEnd);
		addEventListener(el, "change", onCompositionEnd);
	}
};
/**
* @internal
*/
const vModelTextUpdate = (el, oldValue, value, trim, number, lazy) => {
	if (el.composing) return;
	const elValue = (number || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
	const newValue = value == null ? "" : value;
	if (elValue === newValue) return;
	const rootNode = el.getRootNode();
	if ((rootNode instanceof Document || rootNode instanceof ShadowRoot) && rootNode.activeElement === el && el.type !== "range") {
		if (lazy && value === oldValue) return;
		if (trim && el.value.trim() === newValue) return;
	}
	el.value = newValue;
};
const vModelCheckbox = {
	deep: true,
	created(el, _, vnode) {
		el[assignKey] = getModelAssigner(vnode);
		vModelCheckboxInit(el);
	},
	mounted(el, binding, vnode) {
		vModelCheckboxUpdate(el, binding.oldValue, binding.value, vnode.props.value);
	},
	beforeUpdate(el, binding, vnode) {
		el[assignKey] = getModelAssigner(vnode);
		vModelCheckboxUpdate(el, binding.oldValue, binding.value, vnode.props.value);
	}
};
/**
* @internal
*/
const vModelCheckboxInit = (el, set) => {
	addEventListener(el, "change", () => {
		const assign = set || el[assignKey];
		const modelValue = el._modelValue;
		const elementValue = getValue(el);
		const checked = el.checked;
		if (isArray(modelValue)) {
			const index = looseIndexOf(modelValue, elementValue);
			const found = index !== -1;
			if (checked && !found) assign(modelValue.concat(elementValue));
			else if (!checked && found) {
				const filtered = [...modelValue];
				filtered.splice(index, 1);
				assign(filtered);
			}
		} else if (isSet(modelValue)) {
			const cloned = new Set(modelValue);
			if (checked) cloned.add(elementValue);
			else cloned.delete(elementValue);
			assign(cloned);
		} else assign(getCheckboxValue(el, checked));
	});
};
/**
* @internal
*/
const vModelCheckboxUpdate = (el, oldValue, value, rawValue = getValue(el)) => {
	el._modelValue = value;
	let checked;
	if (isArray(value)) checked = looseIndexOf(value, rawValue) > -1;
	else if (isSet(value)) checked = value.has(rawValue);
	else {
		if (value === oldValue) return;
		checked = looseEqual(value, getCheckboxValue(el, true));
	}
	if (el.checked !== checked) el.checked = checked;
};
const vModelRadio = {
	created(el, { value }, vnode) {
		el.checked = looseEqual(value, vnode.props.value);
		el[assignKey] = getModelAssigner(vnode);
		addEventListener(el, "change", () => {
			el[assignKey](getValue(el));
		});
	},
	beforeUpdate(el, { value, oldValue }, vnode) {
		el[assignKey] = getModelAssigner(vnode);
		if (value !== oldValue) el.checked = looseEqual(value, vnode.props.value);
	}
};
const vModelSelect = {
	deep: true,
	created(el, { value, modifiers: { number } }, vnode) {
		vModelSelectInit(el, value, number);
		el[assignKey] = getModelAssigner(vnode);
	},
	mounted(el, { value }) {
		vModelSetSelected(el, value);
	},
	beforeUpdate(el, { value }, vnode) {
		el._modelValue = value;
		el[assignKey] = getModelAssigner(vnode);
	},
	updated(el, { value }) {
		vModelSetSelected(el, value);
	}
};
/**
* @internal
*/
const vModelSelectInit = (el, value, number, set) => {
	el._modelValue = value;
	addEventListener(el, "change", () => {
		const selectedVal = Array.prototype.filter.call(el.options, (o) => o.selected).map((o) => number ? looseToNumber(getValue(o)) : getValue(o));
		const multiple = el.multiple;
		const assignedValue = multiple ? isSet(el._modelValue) ? new Set(selectedVal) : selectedVal : selectedVal[0];
		const pending = el._pendingValue = [multiple, multiple ? isArray(assignedValue) ? selectedVal.slice() : selectedVal : assignedValue];
		try {
			(set || el[assignKey])(assignedValue);
		} finally {
			nextTick(() => {
				if (el._pendingValue === pending) el._pendingValue = void 0;
			});
		}
	});
};
function isSameSelectValue(value, assignedValue, multiple) {
	if (!multiple) return looseEqual(value, assignedValue);
	if (isArray(value)) return looseEqual(value, assignedValue);
	if (isSet(value)) {
		if (value.size !== assignedValue.length) return false;
		for (const item of assignedValue) if (!value.has(item)) return false;
		return true;
	}
	return false;
}
/**
* @internal
*/
const vModelSetSelected = (el, value) => {
	el._modelValue = value;
	const pending = el._pendingValue;
	el._pendingValue = void 0;
	if (pending && pending[0] === el.multiple && isSameSelectValue(value, pending[1], pending[0])) return;
	setSelected(el, value);
};
function setSelected(el, value) {
	const isMultiple = el.multiple;
	const isArrayValue = isArray(value);
	if (isMultiple && !isArrayValue && !isSet(value)) {
		warn(`<select multiple v-model> expects an Array or Set value for its binding, but got ${Object.prototype.toString.call(value).slice(8, -1)}.`);
		return;
	}
	for (let i = 0, l = el.options.length; i < l; i++) {
		const option = el.options[i];
		const optionValue = getValue(option);
		if (isMultiple) {
			if (isArrayValue) {
				const optionType = typeof optionValue;
				if (optionType === "string" || optionType === "number") option.selected = value.some((v) => String(v) === String(optionValue));
				else option.selected = looseIndexOf(value, optionValue) > -1;
			} else option.selected = value.has(optionValue);
		} else if (looseEqual(getValue(option), value)) {
			if (el.selectedIndex !== i) el.selectedIndex = i;
			return;
		}
	}
	if (!isMultiple && el.selectedIndex !== -1) el.selectedIndex = -1;
}
/**
* @internal retrieve raw value set via :value bindings
*/
function getValue(el) {
	return "_value" in el ? el._value : el.value;
}
function getCheckboxValue(el, checked) {
	const key = checked ? "_trueValue" : "_falseValue";
	if (key in el) return el[key];
	const attr = checked ? "true-value" : "false-value";
	if (el.hasAttribute(attr)) return el.getAttribute(attr);
	return checked;
}
const vModelDynamic = {
	created(el, binding, vnode) {
		callModelHook(el, binding, vnode, null, "created");
	},
	mounted(el, binding, vnode) {
		callModelHook(el, binding, vnode, null, "mounted");
	},
	beforeUpdate(el, binding, vnode, prevVNode) {
		callModelHook(el, binding, vnode, prevVNode, "beforeUpdate");
	},
	updated(el, binding, vnode, prevVNode) {
		callModelHook(el, binding, vnode, prevVNode, "updated");
	}
};
function resolveDynamicModel(tagName, type) {
	switch (tagName) {
		case "SELECT": return vModelSelect;
		case "TEXTAREA": return vModelText;
		default: switch (type) {
			case "checkbox": return vModelCheckbox;
			case "radio": return vModelRadio;
			default: return vModelText;
		}
	}
}
function callModelHook(el, binding, vnode, prevVNode, hook) {
	const fn = resolveDynamicModel(el.tagName, vnode.props && vnode.props.type)[hook];
	fn && fn(el, binding, vnode, prevVNode);
}
function initVModelForSSR() {
	vModelText.getSSRProps = ({ value }) => ({ value });
	vModelRadio.getSSRProps = ({ value }, vnode) => {
		if (vnode.props && looseEqual(vnode.props.value, value)) return { checked: true };
	};
	vModelCheckbox.getSSRProps = ({ value }, vnode) => {
		if (isArray(value)) {
			if (vnode.props && looseIndexOf(value, vnode.props.value) > -1) return { checked: true };
		} else if (isSet(value)) {
			if (vnode.props && value.has(vnode.props.value)) return { checked: true };
		} else if (value) return { checked: true };
	};
	vModelDynamic.getSSRProps = (binding, vnode) => {
		if (typeof vnode.type !== "string") return;
		const modelToUse = resolveDynamicModel(vnode.type.toUpperCase(), vnode.props && vnode.props.type);
		if (modelToUse.getSSRProps) return modelToUse.getSSRProps(binding, vnode);
	};
}
//#endregion
//#region packages/runtime-dom/src/index.ts
const rendererOptions = /*@__PURE__*/ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
	return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = ((...args) => {
	const app = ensureRenderer().createApp(...args);
	injectNativeTagCheck(app);
	injectCompilerOptionsCheck(app);
	const { mount } = app;
	app.mount = (containerOrSelector) => {
		const container = normalizeContainer(containerOrSelector);
		if (!container) return;
		const component = app._component;
		if (!isFunction(component) && !component.render && !component.template) component.template = container.innerHTML;
		if (container.nodeType === 1) container.textContent = "";
		const proxy = mount(container, false, resolveRootNamespace(container));
		if (container instanceof Element) {
			container.removeAttribute("v-cloak");
			container.setAttribute("data-v-app", "");
		}
		return proxy;
	};
	return app;
});
function resolveRootNamespace(container) {
	if (container instanceof SVGElement) return "svg";
	if (typeof MathMLElement === "function" && container instanceof MathMLElement) return "mathml";
}
function injectNativeTagCheck(app) {
	Object.defineProperty(app.config, "isNativeTag", {
		value: (tag) => isHTMLTag(tag) || isSVGTag(tag) || isMathMLTag(tag),
		writable: false
	});
}
function injectCompilerOptionsCheck(app) {
	if (isRuntimeOnly()) {
		const isCustomElement = app.config.isCustomElement;
		Object.defineProperty(app.config, "isCustomElement", {
			get() {
				return isCustomElement;
			},
			set() {
				warn("The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead.");
			}
		});
		const compilerOptions = app.config.compilerOptions;
		const msg = "The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka \"full build\"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader's `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc";
		Object.defineProperty(app.config, "compilerOptions", {
			get() {
				warn(msg);
				return compilerOptions;
			},
			set() {
				warn(msg);
			}
		});
	}
}
/**
* @internal
*/
function normalizeContainer(container) {
	if (isString(container)) {
		const res = document.querySelector(container);
		if (!res) warn(`Failed to mount app: mount target selector "${container}" returned null.`);
		return res;
	}
	if (window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") warn(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
	return container;
}
let ssrDirectiveInitialized = false;
/**
* @internal
*/
const initDirectivesForSSR = () => {
	if (!ssrDirectiveInitialized) {
		ssrDirectiveInitialized = true;
		initVModelForSSR();
		initVShowForSSR();
	}
};
//#endregion
//#region packages/server-renderer/src/helpers/ssrRenderAttrs.ts
const shouldIgnoreProp = /*@__PURE__*/ makeMap(`,key,ref,innerHTML,textContent,ref_key,ref_for`);
function ssrRenderAttrs(props, tag) {
	let ret = "";
	for (let key in props) {
		if (shouldIgnoreProp(key) || isOn(key) || tag === "textarea" && key === "value" || key.startsWith(".")) continue;
		const value = props[key];
		if (key.startsWith("^")) key = key.slice(1);
		if (key === "class") ret += ` class="${ssrRenderClass(value)}"`;
		else if (key === "style") ret += ` style="${ssrRenderStyle(value)}"`;
		else if (key === "className") {
			if (value != null) ret += ` class="${escapeHtml(String(value))}"`;
		} else ret += ssrRenderDynamicAttr(key, value, tag);
	}
	return ret;
}
function ssrRenderDynamicAttr(key, value, tag) {
	if (!isRenderableAttrValue(value)) return ``;
	const attrKey = tag && (tag.indexOf("-") > 0 || isSVGTag(tag)) ? key : propsToAttrMap[key] || key.toLowerCase();
	if (isBooleanAttr(attrKey) || attrKey === "hidden" && (typeof value === "boolean" || typeof value === "number")) return includeBooleanAttr(value) ? ` ${attrKey}` : ``;
	else if (isSSRSafeAttrName(attrKey)) return value === "" ? ` ${attrKey}` : ` ${attrKey}="${escapeHtml(value)}"`;
	else {
		console.warn(`[@vue/server-renderer] Skipped rendering unsafe attribute name: ${attrKey}`);
		return ``;
	}
}
function ssrRenderAttr(key, value) {
	if (!isRenderableAttrValue(value)) return ``;
	return ` ${key}="${escapeHtml(value)}"`;
}
function ssrRenderClass(raw) {
	return escapeHtml(normalizeClass(raw));
}
function ssrRenderStyle(raw) {
	if (!raw) return "";
	if (isString(raw)) return escapeHtml(stringifyStyle(raw));
	return escapeHtml(stringifyStyle(normalizeStyle(ssrResetCssVars(raw))));
}
function ssrResetCssVars(raw) {
	if (!isArray(raw) && isObject(raw)) {
		const res = {};
		for (const key in raw) if (key.startsWith(":--")) res[key.slice(1)] = normalizeCssVarValue(raw[key]);
		else res[key] = raw[key];
		return res;
	}
	return raw;
}
//#endregion
//#region packages/server-renderer/src/helpers/ssrRenderComponent.ts
function ssrRenderComponent(comp, props = null, children = null, parentComponent = null, slotScopeId) {
	if (isString(comp)) {
		const { getBuffer, push } = createBuffer();
		renderVNode(push, createVNode(comp, props, children), parentComponent, slotScopeId);
		return getBuffer();
	}
	return renderComponentVNode(createVNode(comp, props, children), parentComponent, slotScopeId);
}
//#endregion
//#region packages/server-renderer/src/helpers/ssrRenderSlot.ts
const { ensureValidVNode } = ssrUtils;
function ssrRenderSlot(slots, slotName, slotProps, fallbackRenderFn, push, parentComponent, slotScopeId, textMode = false) {
	push(`<!--[-->`);
	ssrRenderSlotInner(slots, slotName, slotProps, fallbackRenderFn, push, parentComponent, slotScopeId, void 0, textMode);
	push(`<!--]-->`);
}
function ssrRenderSlotInner(slots, slotName, slotProps, fallbackRenderFn, push, parentComponent, slotScopeId, transition, textMode = false) {
	const slotFn = slots[slotName];
	if (slotFn) {
		const slotBuffer = [];
		const bufferedPush = (item) => {
			slotBuffer.push(item);
		};
		const ret = slotFn(slotProps || {}, bufferedPush, parentComponent, slotScopeId ? " " + slotScopeId : "");
		if (textMode && canNormalizeTextSlotBuffer(slotBuffer)) for (let i = 0; i < slotBuffer.length; i++) slotBuffer[i] = normalizeUniText(slotBuffer[i]);
		if (isArray(ret)) {
			const validSlotContent = ensureValidVNode(ret);
			if (validSlotContent) renderVNodeChildren(push, validSlotContent, parentComponent, slotScopeId);
			else if (fallbackRenderFn) fallbackRenderFn();
			else if (transition) push(`<!---->`);
		} else {
			let isEmptySlot = true;
			if (transition) isEmptySlot = false;
			else for (let i = 0; i < slotBuffer.length; i++) if (!isComment(slotBuffer[i])) {
				isEmptySlot = false;
				break;
			}
			if (isEmptySlot) {
				if (fallbackRenderFn) fallbackRenderFn();
			} else {
				let start = 0;
				let end = slotBuffer.length;
				if (transition && slotBuffer[0] === "<!--[-->" && slotBuffer[end - 1] === "<!--]-->") {
					start++;
					end--;
				}
				if (start < end) for (let i = start; i < end; i++) push(slotBuffer[i]);
				else if (transition) push(`<!---->`);
			}
		}
	} else if (fallbackRenderFn) fallbackRenderFn();
	else if (transition) push(`<!---->`);
}
function canNormalizeTextSlotBuffer(buffer) {
	return buffer.length > 0 && buffer.every((item) => typeof item === "string" && !/<\/?[A-Za-z][^>]*>/.test(item));
}
const commentTestRE = /^<!--[\s\S]*-->$/;
const commentRE = /<!--[^]*?-->/gm;
function isComment(item) {
	if (typeof item !== "string" || !commentTestRE.test(item)) return false;
	if (item.length <= 8) return true;
	return !item.replace(commentRE, "").trim();
}
//#endregion
//#region packages/server-renderer/src/helpers/ssrRenderTeleport.ts
function ssrRenderTeleport(parentPush, contentRenderFn, target, disabled, parentComponent) {
	parentPush("<!--teleport start-->");
	const context = parentComponent.appContext.provides[ssrContextKey];
	const teleportBuffers = context.__teleportBuffers || (context.__teleportBuffers = {});
	const targetBuffer = teleportBuffers[target] || (teleportBuffers[target] = []);
	const bufferIndex = targetBuffer.length;
	let teleportContent;
	if (disabled) {
		contentRenderFn(parentPush);
		teleportContent = `<!--teleport start anchor--><!--teleport anchor-->`;
	} else {
		const { getBuffer, push } = createBuffer();
		push(`<!--teleport start anchor-->`);
		contentRenderFn(push);
		push(`<!--teleport anchor-->`);
		teleportContent = getBuffer();
	}
	targetBuffer.splice(bufferIndex, 0, teleportContent);
	if (isPromise(teleportContent) || isArray(teleportContent) && teleportContent.hasAsync) targetBuffer.hasAsync = true;
	parentPush("<!--teleport end-->");
}
//#endregion
//#region packages/server-renderer/src/helpers/ssrInterpolate.ts
function ssrInterpolate(value, uniText = false) {
	if (!uniText) return escapeHtml(toDisplayString(value));
	return escapeHtml(normalizeUniText(toDisplayString(value)));
}
//#endregion
//#region packages/server-renderer/src/helpers/ssrRenderList.ts
function ssrRenderList(source, renderItem) {
	if (isArray(source) || isString(source)) for (let i = 0, l = source.length; i < l; i++) renderItem(source[i], i);
	else if (typeof source === "number") {
		if (!Number.isInteger(source) || source < 0) {
			warn(`The v-for range expects a positive integer value but got ${source}.`);
			return;
		}
		for (let i = 0; i < source; i++) renderItem(i + 1, i);
	} else if (isObject(source)) {
		if (source[Symbol.iterator]) {
			let i = 0;
			for (const item of source) renderItem(item, i++);
		} else {
			const keys = Object.keys(source);
			for (let i = 0, l = keys.length; i < l; i++) {
				const key = keys[i];
				renderItem(source[key], key, i);
			}
		}
	}
}
//#endregion
//#region packages/server-renderer/src/helpers/ssrRenderSuspense.ts
function ssrRenderSuspense(push, { default: renderContent }) {
	if (renderContent) renderContent();
	else push(`<!---->`);
}
//#endregion
//#region packages/server-renderer/src/helpers/ssrGetDirectiveProps.ts
function ssrGetDirectiveProps(instance, dir, value, arg, modifiers = {}) {
	if (typeof dir !== "function" && dir.getSSRProps) return dir.getSSRProps({
		dir,
		instance: ssrUtils.getComponentPublicInstance(instance.$),
		value,
		oldValue: void 0,
		arg,
		modifiers
	}, null) || {};
	return {};
}
//#endregion
//#region packages/server-renderer/src/helpers/ssrVModelHelpers.ts
const ssrLooseEqual = looseEqual;
function ssrLooseContain(arr, value) {
	return looseIndexOf(arr, value) > -1;
}
function ssrRenderDynamicModel(type, model, value) {
	switch (type) {
		case "radio": return looseEqual(model, value) ? " checked" : "";
		case "checkbox": return (isArray(model) ? ssrLooseContain(model, value) : model) ? " checked" : "";
		default: return ssrRenderAttr("value", model);
	}
}
function ssrGetDynamicModelProps(existingProps = {}, model) {
	const { type, value } = existingProps;
	switch (type) {
		case "radio": return looseEqual(model, value) ? { checked: true } : null;
		case "checkbox": return (isArray(model) ? ssrLooseContain(model, value) : model) ? { checked: true } : null;
		default: return { value: model };
	}
}
//#endregion
//#region packages/server-renderer/src/helpers/ssrCompile.ts
function ssrCompile(template, instance) {
	throw new Error("On-the-fly template compilation is not supported in the ESM build of @vue/server-renderer. All templates must be pre-compiled into render functions.");
}
//#endregion
//#region packages/server-renderer/src/render.ts
const { createComponentInstance, setCurrentRenderingInstance, setupComponent, renderComponentRoot, normalizeVNode, pushWarningContext, popWarningContext } = ssrUtils;
function cleanupContext(context) {
	let firstError;
	if (context.__watcherHandles) {
		for (const unwatch of context.__watcherHandles) try {
			unwatch();
		} catch (err) {
			if (firstError === void 0) firstError = err;
		}
		context.__watcherHandles.length = 0;
	}
	if (context.__instanceScopes) {
		for (const scope of context.__instanceScopes) try {
			scope.stop();
		} catch (err) {
			if (firstError === void 0) firstError = err;
		}
		context.__instanceScopes.length = 0;
	}
	if (firstError !== void 0) throw firstError;
}
function createBuffer() {
	let appendable = false;
	const buffer = [];
	return {
		getBuffer() {
			return buffer;
		},
		push(item) {
			const isStringItem = isString(item);
			if (appendable && isStringItem) {
				buffer[buffer.length - 1] += item;
				return;
			}
			buffer.push(item);
			appendable = isStringItem;
			if (isPromise(item) || isArray(item) && item.hasAsync) buffer.hasAsync = true;
		}
	};
}
function renderComponentVNode(vnode, parentComponent = null, slotScopeId) {
	const instance = vnode.component = createComponentInstance(vnode, parentComponent, null);
	const context = instance.appContext.provides[ssrContextKey];
	if (context) (context.__instanceScopes || (context.__instanceScopes = [])).push(instance.scope);
	pushWarningContext(vnode);
	const res = setupComponent(instance, true);
	popWarningContext();
	const hasAsyncSetup = isPromise(res);
	let prefetches = instance.sp;
	if (hasAsyncSetup || prefetches) return Promise.resolve(res).then(() => {
		if (hasAsyncSetup) prefetches = instance.sp;
		if (prefetches) return Promise.all(prefetches.map((prefetch) => prefetch.call(instance.proxy)));
	}).catch(NOOP).then(() => renderComponentSubTree(instance, slotScopeId));
	else try {
		return renderComponentSubTree(instance, slotScopeId);
	} catch (err) {
		return Promise.reject(err);
	}
}
function renderComponentSubTree(instance, slotScopeId) {
	pushWarningContext(instance.vnode);
	const comp = instance.type;
	const { getBuffer, push } = createBuffer();
	if (isFunction(comp)) {
		let root = renderComponentRoot(instance);
		if (!comp.props) {
			for (const key in instance.attrs) if (key.startsWith(`data-v-`)) (root.props || (root.props = {}))[key] = ``;
		}
		renderVNode(push, instance.subTree = root, instance, slotScopeId);
	} else {
		if ((!instance.render || instance.render === NOOP) && !instance.ssrRender && !comp.ssrRender && isString(comp.template)) comp.ssrRender = ssrCompile(comp.template, instance);
		const ssrRender = instance.ssrRender || comp.ssrRender;
		if (ssrRender) {
			let attrs = instance.inheritAttrs !== false ? instance.attrs : void 0;
			let hasCloned = false;
			let cur = instance;
			while (true) {
				const scopeId = cur.vnode.scopeId;
				if (scopeId) {
					if (!hasCloned) {
						attrs = { ...attrs };
						hasCloned = true;
					}
					attrs[scopeId] = "";
				}
				const parent = cur.parent;
				if (parent && parent.subTree && parent.subTree === cur.vnode) cur = parent;
				else break;
			}
			if (slotScopeId) {
				if (!hasCloned) attrs = { ...attrs };
				const slotScopeIdList = slotScopeId.trim().split(" ");
				for (let i = 0; i < slotScopeIdList.length; i++) attrs[slotScopeIdList[i]] = "";
			}
			const prev = setCurrentRenderingInstance(instance);
			try {
				ssrRender(instance.proxy, push, instance, attrs, instance.props, instance.setupState, instance.data, instance.ctx);
			} catch (err) {
				handleError(err, instance, 1);
			} finally {
				setCurrentRenderingInstance(prev);
			}
		} else if (instance.render && instance.render !== NOOP) renderVNode(push, instance.subTree = renderComponentRoot(instance), instance, slotScopeId);
		else {
			const componentName = comp.name || comp.__file || `<Anonymous>`;
			warn(`Component ${componentName} is missing template or render function.`);
			push(`<!---->`);
		}
	}
	popWarningContext();
	return getBuffer();
}
function renderVNode(push, vnode, parentComponent, slotScopeId) {
	const { type, shapeFlag, children, dirs, props } = vnode;
	if (dirs) vnode.props = applySSRDirectives(vnode, props, dirs);
	switch (type) {
		case Text:
			push(escapeHtml(children));
			break;
		case Comment:
			push(children ? `<!--${escapeHtmlComment(children)}-->` : `<!---->`);
			break;
		case Static:
			push(children);
			break;
		case Fragment:
			if (vnode.slotScopeIds) slotScopeId = (slotScopeId ? slotScopeId + " " : "") + vnode.slotScopeIds.join(" ");
			push(`<!--[-->`);
			renderVNodeChildren(push, children, parentComponent, slotScopeId);
			push(`<!--]-->`);
			break;
		default: if (shapeFlag & 1) renderElementVNode(push, vnode, parentComponent, slotScopeId);
		else if (shapeFlag & 6) push(renderComponentVNode(vnode, parentComponent, slotScopeId));
		else if (shapeFlag & 64) renderTeleportVNode(push, vnode, parentComponent, slotScopeId);
		else if (shapeFlag & 128) renderVNode(push, vnode.ssContent, parentComponent, slotScopeId);
		else warn("[@vue/server-renderer] Invalid VNode type:", type, `(${typeof type})`);
	}
}
function renderVNodeChildren(push, children, parentComponent, slotScopeId) {
	for (let i = 0; i < children.length; i++) renderVNode(push, normalizeVNode(children[i]), parentComponent, slotScopeId);
}
function renderElementVNode(push, vnode, parentComponent, slotScopeId) {
	const tag = vnode.type;
	let { props, children, shapeFlag, scopeId } = vnode;
	let openTag = `<${tag}`;
	if (props) openTag += ssrRenderAttrs(props, tag);
	const renderedScopeIds = [];
	const appendScopeId = (id) => {
		if (id && (!props || !hasOwn(props, id)) && !renderedScopeIds.includes(id)) {
			openTag += ` ${id}`;
			renderedScopeIds.push(id);
		}
	};
	if (scopeId) appendScopeId(scopeId);
	let curParent = parentComponent;
	let curVnode = vnode;
	while (curParent && curVnode === curParent.subTree) {
		curVnode = curParent.vnode;
		if (curVnode.scopeId) appendScopeId(curVnode.scopeId);
		curParent = curParent.parent;
	}
	if (slotScopeId) {
		const slotScopeIdList = slotScopeId.trim().split(" ");
		for (let i = 0; i < slotScopeIdList.length; i++) appendScopeId(slotScopeIdList[i]);
	}
	push(openTag + `>`);
	if (!isVoidTag(tag)) {
		let hasChildrenOverride = false;
		if (props) {
			if (props.innerHTML) {
				hasChildrenOverride = true;
				push(props.innerHTML);
			} else if (props.textContent) {
				hasChildrenOverride = true;
				push(escapeHtml(props.textContent));
			} else if (tag === "textarea" && props.value) {
				hasChildrenOverride = true;
				push(escapeHtml(props.value));
			}
		}
		if (!hasChildrenOverride) {
			if (shapeFlag & 8) push(escapeHtml(children));
			else if (shapeFlag & 16) renderVNodeChildren(push, children, parentComponent, slotScopeId);
		}
		push(`</${tag}>`);
	}
}
function applySSRDirectives(vnode, rawProps, dirs) {
	const toMerge = [];
	for (let i = 0; i < dirs.length; i++) {
		const binding = dirs[i];
		const { dir: { getSSRProps } } = binding;
		if (getSSRProps) {
			const props = getSSRProps(binding, vnode);
			if (props) toMerge.push(props);
		}
	}
	return mergeProps(rawProps || {}, ...toMerge);
}
function renderTeleportVNode(push, vnode, parentComponent, slotScopeId) {
	const target = vnode.props && vnode.props.to;
	const disabled = vnode.props && vnode.props.disabled;
	if (!target) {
		if (!disabled) warn(`[@vue/server-renderer] Teleport is missing target prop.`);
		return [];
	}
	if (!isString(target)) {
		warn(`[@vue/server-renderer] Teleport target must be a query selector string.`);
		return [];
	}
	ssrRenderTeleport(push, (push) => {
		renderVNodeChildren(push, vnode.children, parentComponent, slotScopeId);
	}, target, disabled || disabled === "", parentComponent);
}
//#endregion
//#region packages/server-renderer/src/renderToString.ts
const { isVNode: isVNode$1 } = ssrUtils;
function nestedUnrollBuffer(buffer, parentRet, startIndex) {
	if (!buffer.hasAsync) return parentRet + unrollBufferSync$1(buffer);
	let ret = parentRet;
	for (let i = startIndex; i < buffer.length; i += 1) {
		const item = buffer[i];
		if (isString(item)) {
			ret += item;
			continue;
		}
		if (isPromise(item)) return item.then((nestedItem) => {
			buffer[i] = nestedItem;
			return nestedUnrollBuffer(buffer, ret, i);
		});
		const result = nestedUnrollBuffer(item, ret, 0);
		if (isPromise(result)) return result.then((nestedItem) => {
			buffer[i] = nestedItem;
			return nestedUnrollBuffer(buffer, "", i);
		});
		ret = result;
	}
	return ret;
}
function unrollBuffer$1(buffer) {
	return nestedUnrollBuffer(buffer, "", 0);
}
function unrollBufferSync$1(buffer) {
	let ret = "";
	for (let i = 0; i < buffer.length; i++) {
		let item = buffer[i];
		if (isString(item)) ret += item;
		else ret += unrollBufferSync$1(item);
	}
	return ret;
}
async function renderToString(input, context = {}) {
	if (isVNode$1(input)) return renderToString(createApp({ render: () => input }), context);
	const vnode = createVNode(input._component, input._props);
	vnode.appContext = input._context;
	input.provide(ssrContextKey, context);
	try {
		const result = await unrollBuffer$1(await renderComponentVNode(vnode));
		await resolveTeleports(context);
		return result;
	} finally {
		cleanupContext(context);
	}
}
async function resolveTeleports(context) {
	if (context.__teleportBuffers) {
		context.teleports = context.teleports || {};
		for (const key in context.__teleportBuffers) context.teleports[key] = await unrollBuffer$1(context.__teleportBuffers[key]);
	}
}
//#endregion
//#region packages/server-renderer/src/renderToStream.ts
const { isVNode } = ssrUtils;
async function unrollBuffer(buffer, stream) {
	if (buffer.hasAsync) for (let i = 0; i < buffer.length; i++) {
		let item = buffer[i];
		if (isPromise(item)) item = await item;
		if (isString(item)) stream.push(item);
		else await unrollBuffer(item, stream);
	}
	else unrollBufferSync(buffer, stream);
}
function unrollBufferSync(buffer, stream) {
	for (let i = 0; i < buffer.length; i++) {
		const item = buffer[i];
		if (isString(item)) stream.push(item);
		else unrollBufferSync(item, stream);
	}
}
function renderToSimpleStream(input, context, stream) {
	if (isVNode(input)) return renderToSimpleStream(createApp({ render: () => input }), context, stream);
	const vnode = createVNode(input._component, input._props);
	vnode.appContext = input._context;
	input.provide(ssrContextKey, context);
	let cleaned = false;
	const finalize = () => {
		if (cleaned) return;
		cleaned = true;
		cleanupContext(context);
	};
	Promise.resolve().then(() => renderComponentVNode(vnode)).then((buffer) => unrollBuffer(buffer, stream)).then(() => resolveTeleports(context)).then(() => {
		finalize();
		return stream.push(null);
	}).catch((error) => {
		try {
			finalize();
		} catch {}
		stream.destroy(error);
	});
	return stream;
}
/**
* @deprecated
*/
function renderToStream(input, context = {}) {
	console.warn(`[@vue/server-renderer] renderToStream is deprecated - use renderToNodeStream instead.`);
	return renderToNodeStream(input, context);
}
function renderToNodeStream(input, context = {}) {
	throw new Error("ESM build of renderToStream() does not support renderToNodeStream(). Use pipeToNodeWritable() with an existing Node.js Writable stream instance instead.");
}
function pipeToNodeWritable(input, context = {}, writable) {
	renderToSimpleStream(input, context, {
		push(content) {
			if (content != null) writable.write(content);
			else writable.end();
		},
		destroy(err) {
			writable.destroy(err);
		}
	});
}
function renderToWebStream(input, context = {}) {
	if (typeof ReadableStream !== "function") throw new Error("ReadableStream constructor is not available in the global scope. If the target environment does support web streams, consider using pipeToWebWritable() with an existing WritableStream instance instead.");
	const encoder = new TextEncoder();
	let cancelled = false;
	return new ReadableStream({
		start(controller) {
			renderToSimpleStream(input, context, {
				push(content) {
					if (cancelled) return;
					if (content != null) controller.enqueue(encoder.encode(content));
					else controller.close();
				},
				destroy(err) {
					controller.error(err);
				}
			});
		},
		cancel() {
			cancelled = true;
		}
	});
}
function pipeToWebWritable(input, context = {}, writable) {
	const writer = writable.getWriter();
	const encoder = new TextEncoder();
	let hasReady = false;
	try {
		hasReady = isPromise(writer.ready);
	} catch (e) {}
	renderToSimpleStream(input, context, {
		async push(content) {
			if (hasReady) await writer.ready;
			if (content != null) return writer.write(encoder.encode(content));
			else return writer.close();
		},
		destroy(err) {
			console.log(err);
			writer.close();
		}
	});
}
//#endregion
//#region packages/server-renderer/src/index.ts
initDirectivesForSSR();
//#endregion
export { pipeToNodeWritable, pipeToWebWritable, renderToNodeStream, renderToSimpleStream, renderToStream, renderToString, renderToWebStream, ssrGetDirectiveProps, ssrGetDynamicModelProps, includeBooleanAttr as ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderDynamicAttr, ssrRenderDynamicModel, ssrRenderList, ssrRenderSlot, ssrRenderSlotInner, ssrRenderStyle, ssrRenderSuspense, ssrRenderTeleport, renderVNode as ssrRenderVNode };
